#!/usr/bin/env bash
# willy-design · wd-video assemble
# -----------------------------------------------------------------------------
# Convierte una secuencia de frames PNG en un MP4 H.264 (+ audio opcional)
# y opcionalmente genera un GIF palette-optimized o una versión vertical.
#
# Uso:
#   bash wd-video-assemble.sh <frames-dir> [--fps 25] [--interpolate 60]
#                             [--bgm path] [--voice path] [--gif] [--vertical]
#                             [--out output.mp4]
#
# Pipeline:
#   1. PNG sequence → MP4 H.264 base
#   2. Si --interpolate: 25fps → Nfps con minterpolate (mci+aobmc)
#   3. Si --bgm: overlay BGM con fade in 0.3s + fade out 1s
#   4. Si --voice: overlay voz off en mix 30/70 con BGM
#   5. Si --gif: genera palette-optimized GIF
#   6. Si --vertical: crop a 1080×1920 desde el centro
#
# Requiere: ffmpeg, ffprobe.
#
# Licencia: MIT — willy-design / WebFactoryRD

set -euo pipefail

FRAMES_DIR=""
FPS=25
INTERPOLATE=""
BGM=""
VOICE=""
WANT_GIF=false
WANT_VERTICAL=false
OUTPUT="output.mp4"

while [ $# -gt 0 ]; do
  case "$1" in
    --fps)         FPS="$2"; shift 2 ;;
    --interpolate) INTERPOLATE="$2"; shift 2 ;;
    --bgm)         BGM="$2"; shift 2 ;;
    --voice)       VOICE="$2"; shift 2 ;;
    --gif)         WANT_GIF=true; shift ;;
    --vertical)    WANT_VERTICAL=true; shift ;;
    --out)         OUTPUT="$2"; shift 2 ;;
    *)             FRAMES_DIR="$1"; shift ;;
  esac
done

if [ -z "$FRAMES_DIR" ] || [ ! -d "$FRAMES_DIR" ]; then
  echo "Usage: wd-video-assemble.sh <frames-dir> [--fps N] [--interpolate N] [--bgm path] [--voice path] [--gif] [--vertical] [--out path]" >&2
  exit 1
fi

OUT_DIR="$(dirname "$OUTPUT")"
[ "$OUT_DIR" = "." ] || mkdir -p "$OUT_DIR"

TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

# ── 1) Frames PNG → MP4 base (H.264 + yuv420p para compatibilidad universal)
echo "▸ Step 1/N: Encoding frames @ ${FPS}fps"
ffmpeg -y -loglevel error -framerate "$FPS" \
  -i "$FRAMES_DIR/%04d.png" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow \
  "$TMP/raw.mp4"

# ── 2) Interpolación a fps target (smooth motion)
if [ -n "$INTERPOLATE" ]; then
  echo "▸ Step 2/N: Interpolating to ${INTERPOLATE}fps"
  ffmpeg -y -loglevel error -i "$TMP/raw.mp4" \
    -vf "minterpolate=fps=${INTERPOLATE}:mi_mode=mci:mc_mode=aobmc:vsbmf=1" \
    -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow \
    "$TMP/smooth.mp4"
  CURRENT="$TMP/smooth.mp4"
else
  CURRENT="$TMP/raw.mp4"
fi

# ── Duración del video (para fades)
DURATION=$(ffprobe -v error -show_entries format=duration -of default=noprint_wrappers=1:nokey=1 "$CURRENT")
FADE_OUT_START=$(awk "BEGIN { d = $DURATION - 1; if (d < 0) d = 0; print d }")

# ── 3+4) Audio: BGM + voz off
if [ -n "$BGM" ] && [ -f "$BGM" ]; then
  if [ -n "$VOICE" ] && [ -f "$VOICE" ]; then
    echo "▸ Step 3/N: Mixing BGM + voiceover"
    ffmpeg -y -loglevel error -i "$CURRENT" -i "$BGM" -i "$VOICE" \
      -filter_complex "[1:a]atrim=0:${DURATION},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.3,afade=t=out:st=${FADE_OUT_START}:d=1,volume=0.3[bgm];[2:a]atrim=0:${DURATION},asetpts=PTS-STARTPTS[voi];[bgm][voi]amix=inputs=2:duration=longest[a]" \
      -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest \
      "$OUTPUT"
  else
    echo "▸ Step 3/N: Mixing BGM"
    ffmpeg -y -loglevel error -i "$CURRENT" -i "$BGM" \
      -filter_complex "[1:a]atrim=0:${DURATION},asetpts=PTS-STARTPTS,afade=t=in:st=0:d=0.3,afade=t=out:st=${FADE_OUT_START}:d=1[a]" \
      -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest \
      "$OUTPUT"
  fi
else
  cp "$CURRENT" "$OUTPUT"
fi

SIZE=$(du -h "$OUTPUT" | cut -f1)
echo "✓ MP4: $OUTPUT (${SIZE}, ${DURATION}s)"

# ── 5) GIF palette-optimized
if [ "$WANT_GIF" = true ]; then
  GIF_OUT="${OUTPUT%.mp4}.gif"
  echo "▸ Step N/N: Generating GIF"
  ffmpeg -y -loglevel error -i "$OUTPUT" \
    -vf "fps=15,scale=720:-1:flags=lanczos,palettegen=stats_mode=diff" \
    "$TMP/palette.png"
  ffmpeg -y -loglevel error -i "$OUTPUT" -i "$TMP/palette.png" \
    -filter_complex "fps=15,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse=dither=bayer:bayer_scale=4" \
    "$GIF_OUT"
  GIF_SIZE=$(du -h "$GIF_OUT" | cut -f1)
  echo "✓ GIF: $GIF_OUT (${GIF_SIZE})"
fi

# ── 6) Vertical reframe 1080×1920
if [ "$WANT_VERTICAL" = true ]; then
  V_OUT="${OUTPUT%.mp4}-vertical.mp4"
  echo "▸ Step N/N: Reframing to 1080×1920"
  ffmpeg -y -loglevel error -i "$OUTPUT" \
    -vf "scale=-1:1920,crop=1080:1920" \
    -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow -c:a aac -b:a 192k \
    "$V_OUT"
  V_SIZE=$(du -h "$V_OUT" | cut -f1)
  echo "✓ Vertical: $V_OUT (${V_SIZE})"
fi

echo "✓ wd-video assemble complete"
