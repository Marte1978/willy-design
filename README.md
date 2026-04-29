# willy-design

> **Pipeline atomizado de diseño para landings y sitios comerciales en República Dominicana.**
> Skill open-source de [WebFactoryRD](https://webfactoryrd.com) — 7 sub-skills + 12 familias visuales RD-específicas + bloques drop-in para Polar/WhatsApp/RD$.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Made in RD](https://img.shields.io/badge/Made%20in-Rep%C3%BAblica%20Dominicana-blue)](https://webfactoryrd.com)

---

## ¿Qué es?

`willy-design` es un set de skills para [Claude Code](https://claude.com/claude-code) que permite a una agencia digital crear landings y sitios comerciales **en producción** sin importar plantillas genéricas, sin pelear con generadores de IA "creativos" que sacan diseños de SaaS gringo, y sin perder horas configurando deploy + Polar + WhatsApp + DNS cada vez.

El skill está optimizado para el mercado dominicano: el copy es en español RD natural, los precios van en RD$ y US$, los pagos por Polar / contra-entrega / WhatsApp, los mapas de Google centrados en RD, y la performance medida en 4G antillano (no en fibra de Bay Area).

## Pipeline 7 fases

```
willy-design (orquestador)
   ├── wd-grill   ── 6 preguntas determinísticas pre-flight
   ├── wd-brief   ── avatar + dolor + promesa + prueba + oferta
   ├── wd-ia      ── information architecture (8-14 secciones)
   ├── wd-tokens  ── design tokens Tailwind v4 @theme
   ├── wd-build   ── HTML/JSX + Tailwind + bloques drop-in
   ├── wd-review  ── Playwright MCP + rubric 7×25 + iteración
   └── wd-ship    ── Vercel deploy + DNS + Polar webhook + Telegram
```

Cada sub-skill es invocable independientemente. El orquestador las encadena automáticamente.

## 12 familias visuales RD-específicas

Cada familia trae paleta, tipografía, patrones de copy, layout, microcopy aprobado, compliance del rubro y schema.org correcto.

**v1 (incluidas):**
- `candy-suplementos` — e-commerce health, copy emocional permitido
- `coopnama-financiero` — cooperativas, seguros, B2C financiero
- `capcana-luxury` — inmobiliaria luxury caribe
- `clinica-salud` — médicos, dentistas, fisioterapeutas
- `restaurante-rd` — comida criolla, bistró, café
- `abogado-bufete` — abogados, notarios, asesoría legal

**v2 (roadmap):**
- `colmadon-moderno` · `iglesia-comunidad` · `taller-mecanico` · `gimnasio-fitness` · `seguros-rd` · `educacion-cursos`

## Bloques drop-in

Snippets HTML reutilizables, configurados con tu stack:

- **`whatsapp/`** — botón CTA + sticky-mobile + flotante, con mensaje pre-rellenado y tracking GA4/Meta
- **`polar/`** — checkout Polar con price display + trust badges + tracking
- **`rd-price/`** — toggle DOP/USD con preferencia persistente
- **`rd-map/`** — Google Maps embed + dirección + "Cómo llegar"
- **`telegram/polar-webhook.js`** — Vercel serverless que verifica firma Polar y notifica a tu Telegram

## Diferenciadores vs `huashu-design`

| | huashu-design | **willy-design** |
|---|---|---|
| Estructura | 1 SKILL.md monolítico | 7 sub-skills atomizadas + orquestador |
| Trigger | keywords difusos | Question form determinístico (6 preguntas) |
| Review | "5 dimensiones" subjetivas | Playwright MCP + rubric 7×25 + iteración auto |
| Familias | 20 filosofías genéricas (Pentagram/Hara) | 12 familias RD-específicas con compliance |
| Pagos | sin integración | Polar + WhatsApp drop-in plug-and-play |
| Compliance | sin | Ley 172-13 RD + INDOTEL + IDECOOP + CARD por rubro |
| Performance | sin gate | Lighthouse budget enforced (LCP <2.5s en 4G) |
| Licencia | Personal Use (花生) | **MIT** — uso comercial libre |

## Instalación

```bash
git clone https://github.com/Marte1978/willy-design.git
cp -r skills/* ~/.claude/skills/
cp -r designs ~/.claude/skills/willy-design/
cp -r blocks ~/.claude/skills/willy-design/
cp -r rubrics ~/.claude/skills/willy-design/
```

Reabre Claude Code. Las skills se auto-detectan.

## Uso básico

```
/willy-design hazme una landing para "Clínica Dental Sonrisa Plus"
```

Esto activa el pipeline completo. Si ya tienes parte del brief listo, salta directo al sub-skill que toque:

```
/wd-brief                  # consolidar brief
/wd-tokens                 # solo regenerar paleta
/wd-review --review-only https://misitio.com    # auditar sitio existente
```

## Stack técnico

- **CSS**: Tailwind v4 con `@theme` tokens (sin config.js)
- **Components**: shadcn/ui base · Untitled UI React selectivo
- **Browser automation**: Playwright MCP (vía `playwright-expert`)
- **Image-to-HTML**: Vision nativo de Claude Opus 4.7
- **Video** (cuando aplica): Remotion v3.1 (vía `/new-client-video`)
- **Email** (v2): MJML 4.x cross-client
- **Deploy**: Vercel + Cloudflare DNS
- **Pagos**: Polar (org-token-based)

## Performance budget

Cada sitio generado por `wd-build` se valida contra `rubrics/performance-budget.json` antes de deploy:

- JS ≤ 100KB · CSS ≤ 50KB · Document ≤ 80KB
- Imágenes ≤ 800KB total · WebP/AVIF responsive
- LCP ≤ 2.5s · CLS ≤ 0.1 · TBT ≤ 200ms
- A11y ≥ 90 (Lighthouse)

Si no pasa, `wd-review` itera hasta arreglarlo.

## Inspiración + atribución

Patrones inspirados en (código y texto 100% originales):

- [`alchaincyf/huashu-design`](https://github.com/alchaincyf/huashu-design) — concepto de HTML como medio de diseño
- [`julianoczkowski/designer-skills`](https://github.com/julianoczkowski/designer-skills) — pipeline atomizado
- [`rohitg00/awesome-claude-design`](https://github.com/rohitg00/awesome-claude-design) — DESIGN.md por familia estética
- [`framix-team/skill-email-html-mjml`](https://github.com/framix-team/skill-email-html-mjml) — patrón de email cross-client (v2)
- [`anthropics/skills`](https://github.com/anthropics/skills) — convenciones oficiales

## Contribuir

Pull requests bienvenidos. Especialmente:
- Nuevas familias DESIGN.md (sigue el formato de las 6 incluidas)
- Bloques drop-in adicionales (Azul.do, Stripe, Mailerlite, etc.)
- Mejoras al rubric 7×25 con datos reales de auditorías
- Traducciones del README a inglés/portugués

## Soporte

- **Issues**: usa GitHub Issues para bugs
- **Discusiones**: GitHub Discussions para ideas y casos de uso
- **WebFactoryRD**: [webfactoryrd.com](https://webfactoryrd.com) · [+1 809 812 0157](https://wa.me/18098120157)

## Licencia

MIT — ver [LICENSE](LICENSE).

Hecho en 🇩🇴 por [Willy Tirado / WebFactoryRD](https://webfactoryrd.com).
