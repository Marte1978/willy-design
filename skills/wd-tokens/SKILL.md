---
name: wd-tokens
description: Genera design tokens (paleta, tipografía, escala spacing/radius/shadow, motion) en formato Tailwind v4 @theme CSS custom properties para el proyecto willy-design. Toma la familia DESIGN.md elegida (de wd-grill o wd-ia), aplica ajustes según brand-info del cliente (logo color extracción, ajustes específicos), y produce tokens.css listo para inyectar en wd-build. Sub-skill #4 del pipeline. Activa después de wd-ia y antes de wd-build. Genera SIEMPRE un dark mode complementario aunque el sitio se entregue en light.
---

# wd-tokens — Design tokens Tailwind v4

> Sub-skill #4 del pipeline. Convierte la familia visual elegida + brand info en CSS variables listas para Tailwind v4.

## Inputs

- `brief-grill.md` (familia DESIGN.md sugerida)
- `brief.md` (brand info: nombre, logo, colores existentes)
- `ia.md` (jerarquía tipográfica)
- Familia DESIGN.md correspondiente (`designs/[familia].md`)
- Si existe: logo del cliente como imagen → extraer colores

## Output

Archivo `tokens.css` (o `app/globals.css` si Next.js):

```css
/* ============================================================
   willy-design tokens — [cliente]
   Familia: [familia.md]
   Generado: [YYYY-MM-DD]
   ============================================================ */

@import "tailwindcss";

@theme {
  /* === Colors === */
  --color-bg: #fbf9f4;
  --color-surface: #ffffff;
  --color-surface-2: #f5f3ee;
  --color-ink: #0b1220;
  --color-ink-2: #1a2233;
  --color-muted: #6b7280;
  --color-line: rgba(15, 23, 42, 0.08);

  --color-primary: #047857;          /* del brand */
  --color-primary-fg: #ffffff;
  --color-primary-soft: rgba(4, 120, 87, 0.1);

  --color-accent: #f59e0b;            /* call-out, badges */
  --color-accent-fg: #0b1220;

  --color-danger: #dc2626;
  --color-success: #16a34a;
  --color-info: #0284c7;

  --color-wa: #25D366;                /* WhatsApp green — siempre */
  --color-wa-2: #1ebe57;

  /* === Typography === */
  --font-display: "Plus Jakarta Sans", system-ui, sans-serif;
  --font-body: "Inter", system-ui, sans-serif;
  --font-mono: "JetBrains Mono", monospace;

  --text-h1: clamp(2.5rem, 6vw, 4.5rem);
  --text-h2: clamp(2rem, 4vw, 2.75rem);
  --text-h3: clamp(1.25rem, 2vw, 1.5rem);
  --text-lede: clamp(1.125rem, 2vw, 1.375rem);
  --text-body: 1rem;
  --text-small: 0.875rem;
  --text-micro: 0.75rem;

  --leading-display: 1.05;
  --leading-body: 1.6;
  --tracking-display: -0.02em;
  --tracking-eyebrow: 0.12em;

  /* === Spacing === */
  --space-xs: 0.25rem;
  --space-sm: 0.5rem;
  --space-md: 1rem;
  --space-lg: 1.5rem;
  --space-xl: 2.5rem;
  --space-2xl: 4rem;
  --space-3xl: 6rem;
  --space-section: clamp(4rem, 8vw, 7rem);

  /* === Radius === */
  --radius-sm: 0.5rem;
  --radius-md: 0.75rem;
  --radius-lg: 1rem;
  --radius-xl: 1.5rem;
  --radius-2xl: 2rem;
  --radius-full: 999rem;

  /* === Shadows === */
  --shadow-sm: 0 1px 2px rgba(11, 18, 32, 0.05);
  --shadow-md: 0 4px 12px rgba(11, 18, 32, 0.08);
  --shadow-lg: 0 12px 32px rgba(11, 18, 32, 0.10);
  --shadow-xl: 0 24px 60px rgba(11, 18, 32, 0.14);
  --shadow-glow: 0 0 0 6px var(--color-primary-soft);

  /* === Motion === */
  --ease-out-expo: cubic-bezier(0.16, 1, 0.3, 1);
  --ease-spring: cubic-bezier(0.34, 1.56, 0.64, 1);
  --ease-smooth: cubic-bezier(0.4, 0, 0.2, 1);

  --motion-fast: 150ms;
  --motion-base: 250ms;
  --motion-slow: 400ms;
  --motion-slower: 700ms;
}

/* === Dark mode (auto + opt-in via [data-theme=dark]) === */
@media (prefers-color-scheme: dark) {
  :root:not([data-theme=light]) {
    --color-bg: #0b1220;
    --color-surface: #15151a;
    --color-surface-2: #1f1f26;
    --color-ink: #f5f5f7;
    --color-ink-2: #d1d1d6;
    --color-muted: #8b8b94;
    --color-line: rgba(255, 255, 255, 0.08);
  }
}

[data-theme=dark] {
  --color-bg: #0b1220;
  --color-surface: #15151a;
  --color-surface-2: #1f1f26;
  --color-ink: #f5f5f7;
  --color-ink-2: #d1d1d6;
  --color-muted: #8b8b94;
  --color-line: rgba(255, 255, 255, 0.08);
}

/* === Utilities globales === */
html { scroll-behavior: smooth; }
body { background: var(--color-bg); color: var(--color-ink); font-family: var(--font-body); }
h1, h2, h3, .display { font-family: var(--font-display); letter-spacing: var(--tracking-display); }

.eyebrow {
  font-family: var(--font-mono);
  font-size: var(--text-micro);
  text-transform: uppercase;
  letter-spacing: var(--tracking-eyebrow);
  color: var(--color-accent);
}

.section { padding-block: var(--space-section); }

/* === Reduced motion === */
@media (prefers-reduced-motion: reduce) {
  *, *::before, *::after {
    animation-duration: 0.01ms !important;
    animation-iteration-count: 1 !important;
    transition-duration: 0.01ms !important;
    scroll-behavior: auto !important;
  }
}
```

## Cómo derivar la paleta

1. **Si el cliente trae logo:** extrae 2-3 colores dominantes con `Read` de la imagen + análisis cromático.
2. **Si NO hay logo o brand:** usa la paleta default de la familia DESIGN.md.
3. **Validación de contraste obligatoria:**
   - `--color-ink` sobre `--color-bg` debe pasar WCAG AAA (7:1)
   - `--color-primary-fg` sobre `--color-primary` debe pasar AA (4.5:1)
   - `--color-muted` sobre `--color-bg` debe pasar AA Large (3:1) — si no, usa `--color-ink-2` en su lugar.

## Cómo elegir tipografía

| Familia DESIGN.md | Display recommend | Body |
|---|---|---|
| candy-suplementos | Plus Jakarta Sans | Inter |
| coopnama-financiero | Lexend | Inter |
| capcana-luxury | Cormorant Garamond | Inter |
| clinica-salud | Plus Jakarta Sans | Inter |
| restaurante-rd | Playfair Display | Inter |
| abogado-bufete | Lora | Inter |
| colmadon-moderno | Bricolage Grotesque | Inter |
| iglesia-comunidad | Source Serif 4 | Inter |
| taller-mecanico | Bebas Neue | Inter |
| gimnasio-fitness | Anton | Inter |
| seguros-rd | Inter | Inter (mismo, conservador) |
| educacion-cursos | Plus Jakarta Sans | Inter |

**Inter es default body siempre** — performance + RD-ready (latín extendido).

## Reglas de generación

- **NO inventes colores random** — siempre derivados de la familia o del brand del cliente.
- **NO uses gradientes morado→rosa** salvo que sea suplementos/feminine wellness y la familia lo dicte.
- **SIEMPRE genera dark mode** — incluso si el sitio se entrega en light.
- **SIEMPRE incluye reduced-motion** — accesibilidad no negociable.
- **Performance:** Google Fonts con `display=swap` + `preconnect`. NO uses webfonts de Adobe Fonts (lentos en RD).

## Output handoff

```
✅ Tokens listos: [path/tokens.css]

Familia: [familia]
Paleta: [primary + accent en hex]
Tipografía: [display + body]
Contraste: AAA en ink/bg, AA en primary/fg
Dark mode: incluido

Próximo: wd-build para escribir HTML/JSX.
```

## Anti-patrones

- ❌ Generar 50 tokens y usar 5 — keep it lean.
- ❌ Hardcodear colores en componentes en lugar de usar tokens.
- ❌ Saltarse contraste — fail rápido en wd-review.
- ❌ Tipografía "trendy" sin fallback — siempre system-ui como fallback en font-family.
