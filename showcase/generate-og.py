# -*- coding: utf-8 -*-
"""Generate 1200x630 OG image for willy-design showcase."""
import sys
from pathlib import Path
from PIL import Image, ImageDraw, ImageFont, ImageFilter

sys.stdout.reconfigure(encoding='utf-8')

W, H = 1200, 630
BG = (250, 250, 247)
INK = (11, 18, 32)
INK2 = (26, 34, 51)
MUTED = (107, 114, 128)
ACCENT = (212, 165, 116)
ACCENT2 = (176, 141, 87)

FONT_BOLD = "C:/Windows/Fonts/arialbd.ttf"
FONT_REG = "C:/Windows/Fonts/arial.ttf"

img = Image.new("RGB", (W, H), BG)
d = ImageDraw.Draw(img, "RGBA")

# Subtle grid
for x in range(0, W, 32):
    d.line([(x, 0), (x, H)], fill=(11, 18, 32, 8), width=1)
for y in range(0, H, 32):
    d.line([(0, y), (W, y)], fill=(11, 18, 32, 8), width=1)

# Logo wd
d.rounded_rectangle((52, 48, 100, 96), radius=12, fill=INK)
font_logo = ImageFont.truetype(FONT_BOLD, 22)
bbox = d.textbbox((0, 0), "wd", font=font_logo)
tw, th = bbox[2] - bbox[0], bbox[3] - bbox[1]
d.text((52 + (48 - tw) / 2, 48 + (48 - th) / 2 - 3), "wd", fill=BG, font=font_logo)

font_brand = ImageFont.truetype(FONT_BOLD, 22)
font_brand_sub = ImageFont.truetype(FONT_REG, 14)
d.text((114, 50), "willy-design", fill=INK, font=font_brand)
d.text((114, 78), "por WebFactoryRD", fill=MUTED, font=font_brand_sub)

# Tag
font_tag = ImageFont.truetype(FONT_BOLD, 14)
tag = "v1.0  ·  MIT  ·  OPEN SOURCE"
bbox = d.textbbox((0, 0), tag, font=font_tag)
tw = bbox[2] - bbox[0]
d.rounded_rectangle((52, 158, 52 + tw + 32, 196), radius=20, fill=(212, 165, 116, 35), outline=(212, 165, 116, 130), width=2)
d.text((68, 169), tag, fill=ACCENT2, font=font_tag)

# Headline
font_h1 = ImageFont.truetype(FONT_BOLD, 72)
d.text((52, 226), "Pipeline de diseño", fill=INK, font=font_h1)
d.text((52, 312), "para landings RD.", fill=ACCENT2, font=font_h1)

# Subtitle
font_sub = ImageFont.truetype(FONT_REG, 22)
d.text((52, 410), "7 sub-skills atomizadas  ·  12 familias visuales  ·  Polar + WhatsApp", fill=INK2, font=font_sub)
d.text((52, 442), "drop-in  ·  Performance budget  ·  Compliance Ley 172-13 RD", fill=INK2, font=font_sub)

# Stack chips
font_chip = ImageFont.truetype(FONT_BOLD, 14)
chips = ["Tailwind v4", "shadcn/ui", "Playwright", "Polar", "Vercel"]
x = 52
y = 530
for chip in chips:
    bbox = d.textbbox((0, 0), chip, font=font_chip)
    cw = bbox[2] - bbox[0]
    d.rounded_rectangle((x, y, x + cw + 24, y + 36), radius=18, fill=(11, 18, 32, 8), outline=(11, 18, 32, 25), width=1)
    d.text((x + 12, y + 10), chip, fill=INK, font=font_chip)
    x += cw + 36

# Right side decoration: 7 circles representing 7 sub-skills
cx = 980
cy = 280
radius = 36
labels = ["1", "2", "3", "4", "5", "6", "7"]
font_num = ImageFont.truetype(FONT_BOLD, 22)

# Stack vertically with slight offset
for i, label in enumerate(labels):
    yc = cy + (i - 3) * 50
    if i == 4:  # wd-build (5th, central)
        d.ellipse((cx - radius, yc - radius, cx + radius, yc + radius), fill=ACCENT)
        d.text((cx - 7, yc - 13), label, fill=INK, font=font_num)
    else:
        d.ellipse((cx - radius, yc - radius, cx + radius, yc + radius), fill=INK, outline=ACCENT, width=2)
        d.text((cx - 7, yc - 13), label, fill=BG, font=font_num)
    # Connector line
    if i < 6:
        d.line([(cx, yc + radius), (cx, yc + 50 - radius)], fill=(176, 141, 87, 100), width=2)

# Label
font_label = ImageFont.truetype(FONT_BOLD, 18)
d.text((cx - 50, cy + 4 * 50 + 30), "wd-1...7", fill=ACCENT2, font=font_label)
font_label_small = ImageFont.truetype(FONT_REG, 14)
d.text((cx - 60, cy + 4 * 50 + 60), "atomizadas", fill=MUTED, font=font_label_small)

out = Path(r"C:/Users/willy/productos/willy-design/showcase/og.png")
img.save(out, "PNG", optimize=True)
print(f"saved {out}  size={img.size}  bytes={out.stat().st_size}")
