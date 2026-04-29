#!/usr/bin/env node
/**
 * willy-design · wd-video frame capture
 * ---------------------------------------------------------------------------
 * Captura frames de un HTML animado usando Playwright headless.
 *
 * Uso:
 *   node wd-video-capture.mjs --source source.html --duration 15 --fps 25 --out frames/
 *
 * Args:
 *   --source <path>     HTML local con animación (file:// se construye automáticamente)
 *   --duration <sec>    Duración total en segundos (default 10)
 *   --fps <n>           Frames por segundo a capturar (default 25)
 *   --width <px>        Viewport width (default 1920)
 *   --height <px>       Viewport height (default 1080)
 *   --out <dir>         Directorio de salida (default frames/)
 *   --warmup <ms>       Espera antes de empezar a capturar (default 500ms)
 *
 * Inyecta tiempo determinístico — Date.now() y performance.now() devuelven
 * el tiempo simulado del frame, no el real. Esto garantiza video idempotente.
 *
 * Requiere: npm install playwright
 *
 * Licencia: MIT — willy-design / WebFactoryRD
 */

import fs from "node:fs/promises";
import path from "node:path";
import url from "node:url";
import { chromium } from "playwright";

function parseArgs(argv) {
  const args = { duration: 10, fps: 25, width: 1920, height: 1080, out: "frames", warmup: 500 };
  for (let i = 2; i < argv.length; i += 2) {
    const key = argv[i].replace(/^--/, "");
    const val = argv[i + 1];
    args[key] = ["duration", "fps", "width", "height", "warmup"].includes(key)
      ? Number(val) : val;
  }
  return args;
}

async function main() {
  const a = parseArgs(process.argv);
  if (!a.source) {
    console.error("Usage: wd-video-capture.mjs --source <html> [--duration --fps --width --height --out --warmup]");
    process.exit(1);
  }

  const sourcePath = path.resolve(a.source);
  const outDir = path.resolve(a.out);
  await fs.mkdir(outDir, { recursive: true });

  const totalFrames = Math.round(a.duration * a.fps);
  const frameDuration = 1000 / a.fps;

  console.log(`▸ Capturing ${totalFrames} frames @ ${a.fps}fps · ${a.width}×${a.height} → ${outDir}`);

  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: a.width, height: a.height },
    deviceScaleFactor: 1,
  });
  const page = await context.newPage();

  // Determinismo: stub Date.now y performance.now ANTES de cargar el HTML
  await page.addInitScript(() => {
    let __t = 0;
    Date.now = () => __t;
    performance.now = () => __t;
    Math.random = (() => {
      let seed = 0xdeadbeef;
      return () => {
        seed = (seed ^ (seed >>> 16)) * 0x85ebca6b >>> 0;
        seed = (seed ^ (seed >>> 13)) * 0xc2b2ae35 >>> 0;
        seed = (seed ^ (seed >>> 16)) >>> 0;
        return seed / 2 ** 32;
      };
    })();
    window.__seekTime = (t) => { __t = t; };
  });

  await page.goto(url.pathToFileURL(sourcePath).href, { waitUntil: "networkidle" });
  await page.waitForTimeout(a.warmup);

  for (let i = 0; i < totalFrames; i++) {
    const t = i * frameDuration;
    await page.evaluate((t) => window.__seekTime(t), t);
    // wait two RAF ticks to settle CSS animations + paint
    await page.evaluate(() => new Promise(r => requestAnimationFrame(() => requestAnimationFrame(r))));
    const filePath = path.join(outDir, `${String(i).padStart(4, "0")}.png`);
    await page.screenshot({ path: filePath, fullPage: false });
    if (i % 25 === 0) process.stdout.write(`\r  frame ${i + 1}/${totalFrames}`);
  }
  process.stdout.write(`\r  frame ${totalFrames}/${totalFrames} ✓\n`);

  await browser.close();
  console.log(`✓ ${totalFrames} frames in ${outDir}`);
}

main().catch((e) => { console.error(e); process.exit(1); });
