#!/usr/bin/env node
/**
 * willy-design · wd-deck export
 * ---------------------------------------------------------------------------
 * Toma un deck.json estructurado y produce un archivo .pptx editable usando
 * pptxgenjs. Layouts nativos PowerPoint — texto seleccionable, no imágenes.
 *
 * Uso:
 *   node wd-deck-export.mjs <deck.json> [out.pptx]
 *
 * Requiere:
 *   npm install pptxgenjs
 *
 * Licencia: MIT — willy-design / WebFactoryRD
 */

import fs from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

async function main() {
  const [, , inputPath, outputPath] = process.argv;
  if (!inputPath) {
    console.error("Usage: wd-deck-export.mjs <deck.json> [out.pptx]");
    process.exit(1);
  }

  const PptxGenJS = (await import("pptxgenjs")).default;
  const raw = await fs.readFile(inputPath, "utf8");
  const deck = JSON.parse(raw);

  const pres = new PptxGenJS();
  pres.layout = "LAYOUT_WIDE"; // 13.333 × 7.5 inches → 16:9 nativo
  pres.title = deck.meta?.title ?? "willy-design deck";
  pres.author = deck.meta?.author ?? "WebFactoryRD";
  pres.company = "WebFactoryRD";

  const theme = deck.theme ?? {};
  const C = {
    bg: theme.bg ?? "FAFAF7",
    ink: theme.ink ?? "0B1220",
    accent: theme.accent ?? "D4A574",
    primary: theme.primary ?? "0B1220",
    muted: "6B7280",
  };
  const F = {
    display: theme.fontDisplay ?? "Plus Jakarta Sans",
    body: theme.fontBody ?? "Inter",
  };

  for (const s of deck.slides ?? []) {
    const slide = pres.addSlide();
    slide.background = { color: stripHash(C.bg) };

    switch (s.type) {
      case "cover":
        renderCover(slide, s, C, F);
        break;
      case "section":
        renderSection(slide, s, C, F);
        break;
      case "bullets":
        renderBullets(slide, s, C, F);
        break;
      case "metric":
        renderMetric(slide, s, C, F);
        break;
      case "image":
        renderImage(slide, s, C, F, path.dirname(inputPath));
        break;
      case "two-columns":
        renderTwoColumns(slide, s, C, F);
        break;
      case "quote":
        renderQuote(slide, s, C, F);
        break;
      case "code":
        renderCode(slide, s, C, F);
        break;
      case "pricing":
        renderPricing(slide, s, C, F);
        break;
      case "cta":
        renderCta(slide, s, C, F);
        break;
      default:
        slide.addText(`[unknown slide type: ${s.type}]`, {
          x: 0.5, y: 3.5, w: 12.3, h: 0.5,
          fontFace: F.body, fontSize: 16, color: stripHash(C.muted),
        });
    }

    if (s.notes) slide.addNotes(s.notes);
  }

  const out = outputPath ?? inputPath.replace(/\.json$/i, ".pptx");
  await pres.writeFile({ fileName: out });
  console.log(`✓ ${out}`);
}

function stripHash(hex) { return String(hex).replace(/^#/, ""); }

function renderCover(slide, s, C, F) {
  if (s.eyebrow) slide.addText(s.eyebrow.toUpperCase(), {
    x: 0.7, y: 0.7, w: 12, h: 0.5,
    fontFace: F.body, fontSize: 14, bold: true, color: stripHash(C.accent),
    charSpacing: 4,
  });
  slide.addText(String(s.title ?? "").replace(/\\n/g, "\n"), {
    x: 0.7, y: 2.0, w: 12, h: 3.0,
    fontFace: F.display, fontSize: 64, bold: true, color: stripHash(C.ink),
    paraSpaceAfter: 0,
  });
  if (s.subtitle) slide.addText(s.subtitle, {
    x: 0.7, y: 5.4, w: 12, h: 0.8,
    fontFace: F.body, fontSize: 22, color: stripHash(C.muted),
  });
  if (s.footer) slide.addText(s.footer, {
    x: 0.7, y: 6.8, w: 12, h: 0.4,
    fontFace: F.body, fontSize: 12, color: stripHash(C.muted),
  });
}

function renderSection(slide, s, C, F) {
  if (s.label) slide.addText(s.label, {
    x: 0.7, y: 0.5, w: 12, h: 1.5,
    fontFace: F.display, fontSize: 120, bold: true, color: stripHash(C.accent),
    align: "left",
  });
  slide.addText(String(s.title ?? "").replace(/\\n/g, "\n"), {
    x: 0.7, y: 3.5, w: 12, h: 1.5,
    fontFace: F.display, fontSize: 56, bold: true, color: stripHash(C.ink),
  });
  if (s.subtitle) slide.addText(s.subtitle, {
    x: 0.7, y: 5.2, w: 12, h: 0.8,
    fontFace: F.body, fontSize: 22, color: stripHash(C.muted),
  });
}

function renderBullets(slide, s, C, F) {
  slide.addText(s.title ?? "", {
    x: 0.7, y: 0.7, w: 12, h: 1.0,
    fontFace: F.display, fontSize: 40, bold: true, color: stripHash(C.ink),
  });
  const items = (s.items ?? []).slice(0, 6);
  items.forEach((it, i) => {
    const y = 2.2 + i * 0.85;
    if (it.icon) slide.addText(it.icon, {
      x: 0.7, y, w: 0.6, h: 0.7,
      fontFace: F.display, fontSize: 28, bold: true, color: stripHash(C.accent),
    });
    slide.addText(it.text ?? "", {
      x: 1.4, y, w: 11.3, h: 0.7,
      fontFace: F.body, fontSize: 22, color: stripHash(C.ink),
      valign: "middle",
    });
  });
}

function renderMetric(slide, s, C, F) {
  slide.addText(String(s.value ?? ""), {
    x: 0.7, y: 1.5, w: 12, h: 3.5,
    fontFace: F.display, fontSize: 220, bold: true, color: stripHash(C.accent),
    align: "center",
  });
  if (s.label) slide.addText(s.label, {
    x: 0.7, y: 5.2, w: 12, h: 1,
    fontFace: F.body, fontSize: 28, color: stripHash(C.ink),
    align: "center",
  });
  if (s.source) slide.addText(`Fuente: ${s.source}`, {
    x: 0.7, y: 6.5, w: 12, h: 0.5,
    fontFace: F.body, fontSize: 12, italic: true, color: stripHash(C.muted),
    align: "center",
  });
}

function renderImage(slide, s, C, F, baseDir) {
  if (s.src) {
    const absPath = path.isAbsolute(s.src) ? s.src : path.join(baseDir, s.src);
    try {
      slide.addImage({
        path: absPath,
        x: 0.5, y: 0.5, w: 12.33, h: 6.0,
        sizing: { type: "contain", w: 12.33, h: 6.0 },
      });
    } catch (e) {
      slide.addText(`[imagen no encontrada: ${s.src}]`, {
        x: 0.5, y: 3.5, w: 12.33, h: 0.5,
        fontFace: F.body, fontSize: 14, color: stripHash(C.muted), align: "center",
      });
    }
  }
  if (s.caption) slide.addText(s.caption, {
    x: 0.5, y: 6.7, w: 12.33, h: 0.6,
    fontFace: F.body, fontSize: 14, italic: true, color: stripHash(C.muted),
    align: "center",
  });
}

function renderTwoColumns(slide, s, C, F) {
  if (s.title) slide.addText(s.title, {
    x: 0.7, y: 0.6, w: 12, h: 0.9,
    fontFace: F.display, fontSize: 36, bold: true, color: stripHash(C.ink),
  });
  const renderCol = (col, x) => {
    if (!col) return;
    if (col.heading) slide.addText(col.heading.toUpperCase(), {
      x, y: 1.9, w: 5.8, h: 0.5,
      fontFace: F.body, fontSize: 14, bold: true, color: stripHash(C.accent),
      charSpacing: 3,
    });
    (col.items ?? []).slice(0, 6).forEach((it, i) => {
      slide.addText(`• ${it}`, {
        x, y: 2.6 + i * 0.7, w: 5.8, h: 0.6,
        fontFace: F.body, fontSize: 18, color: stripHash(C.ink),
      });
    });
  };
  renderCol(s.left, 0.7);
  renderCol(s.right, 6.85);
}

function renderQuote(slide, s, C, F) {
  slide.addText(`"${s.text ?? ""}"`, {
    x: 1.0, y: 1.5, w: 11.3, h: 3.5,
    fontFace: F.display, fontSize: 36, italic: true, color: stripHash(C.ink),
    valign: "middle",
  });
  if (s.author) slide.addText(`— ${s.author}`, {
    x: 1.0, y: 5.5, w: 11.3, h: 0.6,
    fontFace: F.body, fontSize: 18, bold: true, color: stripHash(C.ink),
  });
  if (s.role) slide.addText(s.role, {
    x: 1.0, y: 6.1, w: 11.3, h: 0.5,
    fontFace: F.body, fontSize: 14, color: stripHash(C.muted),
  });
}

function renderCode(slide, s, C, F) {
  if (s.title) slide.addText(s.title, {
    x: 0.7, y: 0.6, w: 12, h: 0.9,
    fontFace: F.display, fontSize: 32, bold: true, color: stripHash(C.ink),
  });
  slide.addShape("rect", {
    x: 0.7, y: 1.7, w: 12, h: 5,
    fill: { color: "0B1220" },
    line: { color: "0B1220" },
  });
  slide.addText(String(s.code ?? "").replace(/\\n/g, "\n"), {
    x: 1.0, y: 1.9, w: 11.5, h: 4.6,
    fontFace: "Consolas", fontSize: 16, color: "E5E7EB",
  });
  if (s.language) slide.addText(s.language, {
    x: 11.0, y: 1.8, w: 1.5, h: 0.4,
    fontFace: "Consolas", fontSize: 11, color: stripHash(C.accent),
    align: "right",
  });
}

function renderPricing(slide, s, C, F) {
  if (s.title) slide.addText(s.title, {
    x: 0.7, y: 0.6, w: 12, h: 0.9,
    fontFace: F.display, fontSize: 36, bold: true, color: stripHash(C.ink),
    align: "center",
  });
  const tiers = (s.tiers ?? []).slice(0, 3);
  const cardW = 3.8, gap = 0.3;
  const totalW = cardW * tiers.length + gap * (tiers.length - 1);
  const startX = (13.33 - totalW) / 2;

  tiers.forEach((tier, i) => {
    const x = startX + i * (cardW + gap);
    const fill = tier.highlight ? stripHash(C.ink) : "FFFFFF";
    const fg = tier.highlight ? "FFFFFF" : stripHash(C.ink);
    const accent = tier.highlight ? stripHash(C.accent) : stripHash(C.accent);

    slide.addShape("roundRect", {
      x, y: 2.0, w: cardW, h: 4.8,
      fill: { color: fill },
      line: { color: tier.highlight ? stripHash(C.accent) : "E5E7EB", width: 1 },
      rectRadius: 0.15,
    });
    slide.addText((tier.name ?? "").toUpperCase(), {
      x: x + 0.2, y: 2.3, w: cardW - 0.4, h: 0.4,
      fontFace: F.body, fontSize: 12, bold: true, color: accent, charSpacing: 3,
      align: "center",
    });
    slide.addText(tier.price ?? "", {
      x: x + 0.2, y: 2.85, w: cardW - 0.4, h: 1,
      fontFace: F.display, fontSize: 36, bold: true, color: fg,
      align: "center",
    });
    (tier.items ?? []).slice(0, 5).forEach((item, j) => {
      slide.addText(`✓  ${item}`, {
        x: x + 0.3, y: 4.0 + j * 0.45, w: cardW - 0.5, h: 0.4,
        fontFace: F.body, fontSize: 13, color: fg,
      });
    });
  });
}

function renderCta(slide, s, C, F) {
  slide.addText(String(s.title ?? "").replace(/\\n/g, "\n"), {
    x: 0.7, y: 1.8, w: 12, h: 1.8,
    fontFace: F.display, fontSize: 56, bold: true, color: stripHash(C.ink),
    align: "center",
  });
  if (s.subtitle) slide.addText(s.subtitle, {
    x: 0.7, y: 3.8, w: 12, h: 0.8,
    fontFace: F.body, fontSize: 24, color: stripHash(C.muted),
    align: "center",
  });
  if (s.ctaText) {
    slide.addShape("roundRect", {
      x: 4.65, y: 5.0, w: 4, h: 0.9,
      fill: { color: stripHash(C.accent) },
      line: { color: stripHash(C.accent) },
      rectRadius: 0.15,
    });
    slide.addText(s.ctaText, {
      x: 4.65, y: 5.0, w: 4, h: 0.9,
      fontFace: F.body, fontSize: 18, bold: true, color: stripHash(C.ink),
      align: "center", valign: "middle",
      hyperlink: s.ctaUrl ? { url: s.ctaUrl } : undefined,
    });
  }
  if (s.secondary) slide.addText(s.secondary, {
    x: 0.7, y: 6.3, w: 12, h: 0.5,
    fontFace: F.body, fontSize: 14, color: stripHash(C.muted),
    align: "center",
  });
}

main().catch((e) => { console.error(e); process.exit(1); });
