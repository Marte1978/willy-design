---
name: wd-deck
description: Sub-skill del pipeline willy-design para construir presentaciones HTML 1920×1080 que se pueden exportar a PPTX, PDF o presentar directamente en navegador. Genera deck.html con sistema de slides nativo (paginación CSS + keyboard nav) y un script export.mjs basado en pptxgenjs (no scrape de DOM, generación nativa desde JSON estructurado). Soporta speaker notes, transitions, code blocks, image slides, quote slides, charts. Activa cuando Willy diga "haz un deck para [propósito]", "presentación para [reunión]", "slides para [pitch]", "exporta a PPTX". Para clientes pagos en RD: pitch deck de venta WebFactoryRD, presentaciones internas de proyecto, training material. Stack: HTML estático + reveal-style nav nativa, pptxgenjs MIT-licensed.
---

# wd-deck — Decks 1920×1080 con export PPTX/PDF

> Sub-skill del pipeline willy-design para presentaciones. Genera HTML que sirve a la vez como deck en vivo (proyectable, navegable con flechas) y como source-of-truth para exportar a PPTX/PDF.

## Cuándo usar

- Pitch deck de WebFactoryRD a cliente nuevo
- Presentación interna de un proyecto/feature
- Training material para clientes (tutorial visual)
- Webinar / charla técnica
- Slide deck que el cliente quiera reutilizar en PowerPoint

## Cuándo NO usar

- Documento extenso para leer (usa Markdown / Notion)
- Reporte ejecutivo de 1 página (usa diseño editorial con `wd-build`)
- Newsletter o email (usa `wd-email` v2)

## Inputs

- Brief del propósito: ¿qué se está presentando? ¿a quién? ¿en qué formato (pitch / training / webinar)?
- Contenido por slide (puede venir en bullet points crudos)
- Marca / familia DESIGN.md a usar (de wd-tokens si ya está corrido)

## Output

```
[workspace]/
├── deck.html              # vista en vivo, navegación con flechas
├── deck.json              # source of truth estructurado
├── tokens.css             # de wd-tokens (paleta + tipografía)
├── slides/                # imágenes opcionales por slide
└── export.mjs             # script de export a PPTX
```

## Estructura JSON (deck.json)

```json
{
  "meta": {
    "title": "WebFactoryRD · Pitch deck Q2 2026",
    "subtitle": "Servicios de creación de páginas web profesionales",
    "author": "Willy Tirado",
    "ratio": "16:9",
    "width": 1920,
    "height": 1080
  },
  "theme": {
    "primary": "#0b1220",
    "accent": "#d4a574",
    "bg": "#fafaf7",
    "ink": "#0b1220",
    "fontDisplay": "Plus Jakarta Sans",
    "fontBody": "Inter"
  },
  "slides": [
    {
      "id": "1",
      "type": "cover",
      "eyebrow": "WebFactoryRD",
      "title": "Páginas web profesionales\\nen 24 horas",
      "subtitle": "Para negocios que necesitan vender hoy.",
      "footer": "Willy Tirado · webfactoryrd.com"
    },
    {
      "id": "2",
      "type": "section",
      "label": "01",
      "title": "El problema",
      "subtitle": "Por qué tu negocio está perdiendo clientes hoy."
    },
    {
      "id": "3",
      "type": "bullets",
      "title": "Sin web profesional, pierdes:",
      "items": [
        { "icon": "✗", "text": "Confianza ante clientes que comparan opciones" },
        { "icon": "✗", "text": "Visibilidad en Google fuera de redes sociales" },
        { "icon": "✗", "text": "Independencia del algoritmo de Instagram" },
        { "icon": "✗", "text": "Vitrina abierta 24/7 sin tu intervención manual" }
      ]
    },
    {
      "id": "4",
      "type": "metric",
      "value": "78%",
      "label": "del tráfico en RD viene de móvil",
      "source": "Statcounter 2025"
    },
    {
      "id": "5",
      "type": "image",
      "src": "slides/hero-mockup.jpg",
      "caption": "Diseño moderno + adaptado a celular + dominio .com incluido"
    },
    {
      "id": "6",
      "type": "two-columns",
      "title": "Lo que recibes",
      "left": {
        "heading": "Diseño",
        "items": ["Hero personalizado", "8-12 secciones", "Móvil-first", "Microcopia en español"]
      },
      "right": {
        "heading": "Infraestructura",
        "items": ["Dominio .com 1 año", "Hosting 1 año", "SSL + CDN", "Soporte WhatsApp"]
      }
    },
    {
      "id": "7",
      "type": "quote",
      "text": "Mi web profesional estuvo lista en 24 horas como prometieron. Aumenté las consultas por WhatsApp 40% en el primer mes.",
      "author": "Carmen Lucía",
      "role": "Directora · Centro Estético Pichardo"
    },
    {
      "id": "8",
      "type": "code",
      "title": "Stack técnico",
      "language": "yaml",
      "code": "framework: Next.js 16 (App Router)\\ndeploy: Vercel + Cloudflare DNS\\nperformance: LCP <2.5s · A11y >90"
    },
    {
      "id": "9",
      "type": "pricing",
      "title": "Inversión",
      "tiers": [
        { "name": "Esencial", "price": "US$200", "highlight": false, "items": ["Landing 1 página", "Dominio + hosting 1 año", "WhatsApp + formulario"] },
        { "name": "Profesional", "price": "US$500", "highlight": true, "items": ["Sitio 5 páginas", "Blog + SEO", "Chat IA opcional", "3 meses soporte"] },
        { "name": "Premium", "price": "US$1,200", "highlight": false, "items": ["Sitio + e-commerce", "Integración pagos Polar", "12 meses soporte", "Reportes mensuales"] }
      ]
    },
    {
      "id": "10",
      "type": "cta",
      "title": "Listos para empezar.",
      "subtitle": "Te entregamos tu sitio en 24 horas.",
      "ctaText": "Iniciar mi proyecto · US$100",
      "ctaUrl": "https://web24.webfactoryrd.com",
      "secondary": "WhatsApp: +1 809 812 0157"
    }
  ]
}
```

## Tipos de slide soportados

| Tipo | Uso típico |
|---|---|
| `cover` | Slide de apertura · branding + título grande + subtítulo |
| `section` | Divisor de sección · número grande + título |
| `bullets` | Lista de puntos · título + items con icono |
| `metric` | Métrica destacada · número grande + label + fuente |
| `image` | Slide de imagen full-width · imagen + caption opcional |
| `two-columns` | Comparativa · título + 2 columnas con heading + items |
| `quote` | Testimonio · quote grande + autor + cargo |
| `code` | Bloque de código · título + lang + code |
| `pricing` | Tiers de precio · 2-3 tiers con highlight |
| `cta` | Cierre · título + subtítulo + CTA primario + secundario |

## Generación del deck.html

`wd-deck` produce HTML estático con:
- Cada slide en una `<section class="slide">` con dimensiones 1920×1080
- CSS `transform: scale()` para auto-fit a la ventana del navegador
- Navegación con teclado: ←/→ entre slides · Esc para overview · F para fullscreen
- Speaker notes ocultas (opcional, mostrar con tecla S)
- Aspect-ratio fijo, no responsive (es un deck, no una landing)

## Export a PPTX

El script `export.mjs` toma `deck.json` y genera `deck.pptx` usando [`pptxgenjs`](https://github.com/gitbrent/PptxGenJS) (MIT, npm ~3MB):

```bash
npx pptxgenjs deck.json deck.pptx
# o
node scripts/wd-deck-export.mjs deck.json deck.pptx
```

**Por qué pptxgenjs en lugar de scrape DOM**: la generación es nativa desde estructura, los layouts son editables en PowerPoint después (texto seleccionable, no imágenes flatten), el archivo final es <500KB típico. Scrape de HTML→PPTX produce archivos pesados con texto como imagen.

## Export a PDF

Para PDF, usa Playwright MCP (ya disponible en stack):

```javascript
const browser = await chromium.launch();
const page = await browser.newPage({ viewport: { width: 1920, height: 1080 } });
await page.goto(`file://${path.resolve('deck.html')}?print`);
await page.pdf({ path: 'deck.pdf', width: '1920px', height: '1080px', printBackground: true });
```

El query param `?print` activa estilos específicos para PDF (un slide por página, sin nav UI).

## Patrones de copy para decks RD

### Pitch deck a cliente nuevo
- Slide 1: cover con tu marca + claim
- Slide 2-3: problema del cliente (no del mercado abstracto — ESPECÍFICO al cliente)
- Slide 4-6: tu solución con ejemplos visuales
- Slide 7-8: prueba (casos similares atendidos en RD)
- Slide 9: pricing transparente
- Slide 10: CTA + próximos pasos

### Training material para cliente
- Slide 1: cover con título de la sesión
- Slide 2: agenda (3-5 puntos)
- Slide 3-N: contenido didáctico (1 idea por slide, NO densos)
- Slide N+1: resumen / takeaways
- Slide última: cómo seguir + recursos

### Webinar / charla técnica
- Slide 1: cover con tu nombre + tópico
- Slide 2: hook (pregunta provocadora o stat sorprendente)
- Slide 3: tesis principal
- Slide 4-N: argumentos con código/ejemplos
- Slide última: preguntas + dónde encontrarte

## Anti-patrones

- ❌ Slides densos con +50 palabras — usa imagen + 1 frase
- ❌ Bullet points anidados (a/b/c) — colapsa en 1 nivel
- ❌ Animaciones por slide (fly-in, bounce) — distrae, usa SOLO transitions discretas
- ❌ Stock photos genéricos — usa diagramas custom o capturas reales
- ❌ Usar fuente del sistema sin definir — siempre via tokens

## Output al terminar

```
✅ Deck listo

Slides: N · Ratio 16:9 (1920×1080)
Archivos:
- deck.html (vista en vivo)
- deck.json (source of truth)
- deck.pptx (export PowerPoint)
- deck.pdf (opcional)

Para presentar:
- Abre deck.html en Chrome/Brave fullscreen (F11)
- Navega con ←/→
- Esc para overview · S para speaker notes

Para editar después en PowerPoint:
- Abre deck.pptx — texto editable
- Las imágenes son referencias a slides/

Próximo: comparte la URL del deck.html (Vercel) o adjunta el .pptx.
```
