---
name: wd-video
description: Sub-skill del pipeline willy-design para convertir animaciones HTML/CSS/JS en videos MP4 y GIFs optimizados. Captura frames con Playwright (no Puppeteer) y los compone con ffmpeg. Soporta 25fps base + interpolación a 60fps, palette-optimized GIF, BGM library con fade automático, voz off opcional via ElevenLabs (si secrets/elevenlabs.token está disponible). Activa cuando Willy diga "anima esto", "exporta a MP4", "haz un video del [diseño]", "crea un reel/short", "convierte HTML a video". Pensado para ad-creatives, demos de producto, openings de webinar, contenido vertical TikTok/Reels (1080×1920) y horizontal YouTube/web (1920×1080). Stack: Playwright MCP + ffmpeg + scripts MIT propios.
---

# wd-video — HTML animado → MP4/GIF

> Sub-skill del pipeline willy-design para producción de video desde HTML. Reemplaza la dependencia de Remotion para casos simples (1 escena, animación CSS/JS).

## Cuándo usar

- Ad-creative corto (15-30s) para Meta/TikTok
- Demo de feature de producto en formato video
- Opening/intro de webinar
- Reel/Short vertical 1080×1920
- Loop de animación para hero de landing
- Conversión de un mock estático a animación viva

## Cuándo NO usar

- Video con múltiples escenas + cuts → usa Remotion vía `/new-client-video` (Fravas v3.1)
- Video con narración larga + voz off compleja → Remotion + ElevenLabs
- Video largo (>90s) con timeline narrativo → Remotion

## Inputs

- HTML animado (animaciones CSS keyframes, transitions, JS Canvas, Web Animations API)
- Configuración de export: resolución, fps, duración, audio opcional

## Output

```
[workspace]/
├── source.html             # HTML animado (entrada)
├── frames/                 # PNGs por frame (temporal, .gitignored)
├── audio/
│   ├── bgm.mp3             # opcional
│   └── voiceover.mp3       # opcional
└── video/
    ├── output.mp4          # MP4 H.264 final
    ├── output.gif          # GIF palette-optimized opcional
    └── output-vertical.mp4 # 1080×1920 si Willy pidió reel
```

## Configuración (video.config.json)

```json
{
  "source": "source.html",
  "duration": 15,
  "fps": 25,
  "interpolated_fps": 60,
  "viewport": { "width": 1920, "height": 1080 },
  "format": ["mp4", "gif"],
  "vertical": false,
  "audio": {
    "bgm": "bgm-tech",
    "fade_in": 0.3,
    "fade_out": 1.0,
    "volume": 0.6
  },
  "out_dir": "video"
}
```

## Pipeline interno

```
1. wd-video config-detect    → leer video.config.json o sacar defaults del HTML
2. wd-video frame-capture    → Playwright headless captura frame-by-frame
3. wd-video assemble          → ffmpeg convierte PNG → MP4 H.264 + AAC
4. wd-video interpolate       → ffmpeg minterpolate 25→60 fps (opcional)
5. wd-video gif               → ffmpeg palette-optimized GIF (opcional)
6. wd-video audio-mix         → ffmpeg overlay BGM + voz-off (opcional)
7. wd-video vertical          → reframe + crop a 1080×1920 (opcional)
```

## Captura de frames (Playwright)

`scripts/wd-video-capture.mjs` (incluido en willy-design/scripts/) toma un HTML local y captura N = duration * fps frames PNG:

```bash
node scripts/wd-video-capture.mjs --source source.html --duration 15 --fps 25 --out frames/
```

El script:
1. Levanta Chromium headless con viewport configurado
2. Inyecta un controlador de tiempo determinístico (page.evaluate seteando `Date.now` y `performance.now`)
3. Para cada frame: `page.evaluate(t => seek(t))` + `page.screenshot()`
4. Es deterministic — produce el mismo MP4 dado el mismo HTML

Esto es CRÍTICO para CSS animations time-based — sin tiempo determinístico el video sale con jitter.

## Assemble + audio + interpolación (ffmpeg)

`scripts/wd-video-assemble.sh` corre la cadena ffmpeg:

```bash
# 1. PNG → MP4 H.264 (25fps base)
ffmpeg -y -framerate 25 -i frames/%04d.png \
  -c:v libx264 -pix_fmt yuv420p -crf 18 -preset slow \
  video/raw.mp4

# 2. Interpolar a 60fps (smooth motion)
ffmpeg -y -i video/raw.mp4 \
  -vf "minterpolate=fps=60:mi_mode=mci:mc_mode=aobmc:vsbmf=1" \
  -c:v libx264 -pix_fmt yuv420p -crf 18 \
  video/smooth.mp4

# 3. Overlay BGM con fade
ffmpeg -y -i video/smooth.mp4 -i audio/bgm.mp3 \
  -filter_complex "[1:a]atrim=0:${DURATION},afade=t=in:st=0:d=0.3,afade=t=out:st=$((DURATION-1)):d=1[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k -shortest \
  video/output.mp4

# 4. GIF palette-optimized (opcional)
ffmpeg -y -i video/output.mp4 -vf "fps=15,scale=720:-1:flags=lanczos,palettegen" -y palette.png
ffmpeg -y -i video/output.mp4 -i palette.png -filter_complex "fps=15,scale=720:-1:flags=lanczos[x];[x][1:v]paletteuse" video/output.gif
```

## BGM library

Si Willy ya tiene la BGM library de huashu en `~/.claude/skills/huashu-design/assets/`, podemos referenciarla. Si no, willy-design provee bibliografía de moods con audio CC0:

| Mood | Mood ID | Uso típico |
|---|---|---|
| Tech | `bgm-tech` | Product demo · keynote vibe |
| Ad | `bgm-ad` | Social media ad · build + drop |
| Educational | `bgm-edu` | Training · tutorial cálido |
| Tutorial | `bgm-tut` | Voiceover-friendly lo-fi |
| Cinematic | `bgm-cinema` | Hero animation épica |
| Caribbean | `bgm-caribe` | Restaurantes RD · turismo |

NOTA: las bibliotecas de audio que vienen con huashu-design tienen licencia personal-use. **Para uso comercial, willy-design solo referencia paths a archivos que el usuario provea** (en `audio/bgm.mp3` del workspace). NO incluimos audio propietario en el repo MIT.

## Vertical reframe (TikTok / Reels)

Para reels 1080×1920 desde un master 1920×1080:

```bash
ffmpeg -y -i video/output.mp4 \
  -vf "scale=-1:1920,crop=1080:1920" \
  -c:v libx264 -pix_fmt yuv420p \
  video/output-vertical.mp4
```

Crop centrado por default. Para crop con encuadre custom (ej. dejar el sujeto a la izquierda), usar `crop=1080:1920:0:0` con offset.

## Voz off (opcional, requiere ElevenLabs)

Si `secrets/elevenlabs.token` existe, podemos generar voz-off:

```bash
node scripts/wd-video-voice.mjs --text "..." --voice "Kate Serene Narrator Pro" --out audio/voiceover.mp3
```

Voces validadas para español RD (de memoria de Willy):
- Brian (americano cálido multilingual)
- Pena Amell (latam masculina cálida)
- Oscar (latam masculina narrativa)
- Kate Serene Narrator Pro (latam femenina serena — la del video Gnosis)
- Aurelio (mexicano viejo, gentle)

Después overlay en el ffmpeg pipeline:
```bash
ffmpeg -y -i video/with-bgm.mp4 -i audio/voiceover.mp3 \
  -filter_complex "[0:a][1:a]amix=inputs=2:duration=first:weights=0.3 1.0[a]" \
  -map 0:v -map "[a]" -c:v copy -c:a aac -b:a 192k \
  video/final.mp4
```

## Patrones de animación HTML

### Hero animado simple (CSS keyframes)
```css
@keyframes heroIn {
  0% { opacity: 0; transform: translateY(40px); }
  100% { opacity: 1; transform: translateY(0); }
}
.hero { animation: heroIn 1.2s cubic-bezier(0.4, 0, 0.2, 1) forwards; }
```

### Texto con typing effect
JS con `Intl.Segmenter` para texto correctamente segmentado (acentos, emojis):
```js
const text = "Tu web profesional en 24h";
const segments = [...new Intl.Segmenter('es', { granularity: 'grapheme' }).segment(text)];
let i = 0;
const id = setInterval(() => {
  el.textContent = segments.slice(0, i++).map(s => s.segment).join('');
  if (i > segments.length) clearInterval(id);
}, 60);
```

### Counter animado (números subiendo)
```js
function animate(target, duration = 2000) {
  const start = performance.now();
  const tick = (now) => {
    const t = Math.min((now - start) / duration, 1);
    el.textContent = Math.floor(t * target).toLocaleString();
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
```

### Particles / fondo dinámico
Canvas con bucle requestAnimationFrame. Mantener < 200 partículas para que el frame-capture no se relentice.

## Reglas anti-jitter (críticas)

1. **NO usar `Date.now()` o `Math.random()` sin seed** en animaciones — el frame-capture inyecta tiempo determinístico, pero `Math.random` queda inestable. Usa un seed fijo (`mulberry32(seed)`).
2. **Animaciones CSS con `forwards` fill-mode** — sin esto el último frame "salta" al estado inicial.
3. **Imágenes WebP/AVIF lazy=eager para hero** — si la imagen carga en frame 12 en lugar de frame 0, hay flicker.
4. **Web fonts pre-loaded** — sin esto los primeros frames muestran fallback Arial.

## Anti-patrones

- ❌ Video > 30s con este pipeline — usa Remotion
- ❌ Múltiples escenas con cuts duros — usa Remotion timeline
- ❌ Audio complejo (multiples capas, ducking, side-chain) — usa DAW
- ❌ Texto pesado / dialogo largo — usa Remotion subtitle layer

## Output al terminar

```
✅ Video listo

Archivos:
- video/output.mp4 (1920×1080 60fps · X.X MB · X seg)
- video/output.gif (720×... · X.X MB)
- video/output-vertical.mp4 (1080×1920 · X.X MB) [si vertical=true]

Para WhatsApp/Reels: usa output-vertical.mp4
Para YouTube/web: usa output.mp4
Para preview rápido: usa output.gif

Próximo: subir a redes (manual de Willy) o servir desde tu CDN.
```

## Integración con otras skills

- `/new-client-video` — pipeline Remotion completo para clientes (multi-escena). Usa wd-video solo para escenas individuales o cuando el HTML viene de wd-build.
- `wd-deck` — exporta deck a PDF/PPTX. NO genera video. Si quieres deck animado a video, usa wd-video sobre el deck.html.
- `wd-build` — genera el HTML que wd-video después convierte. Pipeline natural: build → video.
