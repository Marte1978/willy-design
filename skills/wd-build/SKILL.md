---
name: wd-build
description: Sub-skill #5 del pipeline willy-design. Escribe el HTML/JSX scaffold del sitio usando los tokens.css de wd-tokens, la estructura de ia.md de wd-ia, los textos del brief.md de wd-brief, y los patrones visuales de la familia DESIGN.md elegida. Inyecta los bloques drop-in (Polar/WhatsApp/RDPrice/RDMap/Telegram). Genera HTML semántico con accesibilidad WCAG 2.1 AA, microinteracciones (scroll reveal, hover, transitions) sin librerías pesadas, meta tags SEO + OG dinámico. Activa después de wd-tokens y antes de wd-review. Output: index.html para sitios estáticos o app/page.tsx para Next.js.
---

# wd-build — Construir HTML/JSX

> Sub-skill #5 del pipeline. Escribe el código real.

## Inputs

- `brief.md` (textos)
- `ia.md` (estructura)
- `tokens.css` (variables)
- `designs/[familia].md` (patrones visuales)
- Workspace del cliente con assets (logo, fotos)

## Decisión: ¿HTML estático o Next.js?

| Caso | Stack |
|---|---|
| Landing simple 1 página · sin backend · sin auth | **HTML estático + Tailwind v4 CDN** |
| Multi-página · blog · contacto persistente | **HTML estático + GitLab Pages CI** |
| App con auth · catálogo dinámico · backend | **Next.js 16 App Router + Vercel** |
| Cliente quiere editar contenido sin tocar código | **Next.js + Sanity / EmDash CMS** |

Default para landings comerciales WebFactoryRD: **HTML estático** (más rápido, más barato, mantenible).

## Estructura del archivo `index.html`

```html
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>[H1 + cliente]</title>
  <meta name="description" content="[2 frases del brief]">
  <meta name="theme-color" content="[primary del tokens]">

  <!-- OG -->
  <meta property="og:type" content="website">
  <meta property="og:url" content="https://[subdomain].webfactoryrd.com">
  <meta property="og:title" content="[título corto]">
  <meta property="og:description" content="[del brief]">
  <meta property="og:image" content="/og.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:locale" content="es_DO">
  <meta name="twitter:card" content="summary_large_image">

  <!-- Fonts -->
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="[Google Fonts URL]" rel="stylesheet">

  <!-- Tailwind v4 -->
  <script src="https://cdn.tailwindcss.com"></script>
  <link rel="stylesheet" href="tokens.css">

  <!-- Schema.org -->
  <script type="application/ld+json">
  {
    "@context": "https://schema.org",
    "@type": "[según rubro: LocalBusiness, Service, Product, ...]",
    "name": "[cliente]",
    ...
  }
  </script>
</head>
<body>
  <!-- 1. Top bar urgencia -->
  <!-- 2. Header -->
  <!-- 3. Hero -->
  ... cada sección del ia.md ...
  <!-- 12. Footer -->

  <!-- WhatsApp flotante (fixed) -->
  <!-- Sticky mobile CTA -->

  <script>
    /* Scroll reveal observer */
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.1 });
    document.querySelectorAll('.scroll-reveal').forEach(el => obs.observe(el));
  </script>
</body>
</html>
```

## Microinteracciones obligatorias

1. **Scroll reveal** en cada sección (IntersectionObserver, no librería)
2. **Hover lift** en cards (`transition: transform .25s ease`)
3. **CTA pulse** en botón WhatsApp principal (animación CSS keyframe)
4. **FAQ accordion** con `<details><summary>` nativo + chevron rotate
5. **Sticky header** con backdrop blur al scrollear
6. **Sticky mobile CTA** abajo (solo móvil)
7. **Smooth scroll** en anclas internas

NO uses GSAP, Framer Motion, Lottie ni librerías de animación para landings simples — todo en CSS + IntersectionObserver. Performance budget primero.

## Inyección de bloques drop-in

Lee `~/.claude/skills/willy-design/blocks/[nombre]/snippet.html` (o el path equivalente) y mete el bloque donde corresponda.

Bloques disponibles:
- `blocks/polar/snippet.html` — botón checkout Polar
- `blocks/whatsapp/snippet.html` — botón WhatsApp + flotante + sticky mobile
- `blocks/rd-price/snippet.html` — toggle DOP/USD
- `blocks/rd-map/snippet.html` — Google Maps embed RD
- `blocks/telegram/notify.js` — webhook serverless

## Reglas de copy en HTML

- **Texto en español RD natural** — no traducción literal
- **Microcopy en cada CTA** — debajo del botón, 1 línea: "Pagas seguro con tarjeta · Te llega confirmación en 2 min"
- **NO Lorem ipsum** — si no hay copy real, pídelo a Willy ANTES de buildear
- **Imágenes con alt descriptivo** — accesibilidad + SEO
- **NO `aria-label="button"`** — usa label semántico

## Performance budget enforcement

Después de generar el HTML, verifica:
- Tamaño total HTML < 80KB
- Total bytes (HTML + CSS + JS inline) < 200KB excluyendo imágenes
- 0 librerías JS externas en página crítica (defer para opcionales)
- Imágenes con `loading="lazy"` excepto la del hero (LCP)

Si no cumple, optimiza ANTES de pasar a wd-review.

## Schema.org por rubro

| Rubro | @type |
|---|---|
| Salud | `MedicalBusiness` o `Dentist` o `Physician` |
| Restaurante | `Restaurant` (con `servesCuisine`, `priceRange`) |
| Inmobiliaria | `RealEstateAgent` |
| Suplementos | `Product` + `Review` |
| Servicios técnicos | `LocalBusiness` |
| Legal | `Attorney` |
| Cooperativa | `FinancialService` |
| Educación | `EducationalOrganization` |

## Compliance footer (Ley 172-13 RD)

Footer obligatorio con:
- Link a `/privacidad.html` (Política de Privacidad - Ley 172-13)
- Link a `/terminos.html` (Términos y Condiciones)
- Cédula RNC del cliente si vende a distancia
- Si cobra USD: nota "Precios en USD se cargan en RD$ a tasa del día"

## Output

```
✅ Build listo: [path/index.html]

Tamaño: X KB
Imágenes: X (hero priority, resto lazy)
Schema.org: [@type]
Compliance: privacidad + términos OK

Próximo: wd-review para auditoría.
```

## Anti-patrones

- ❌ HTML divs anidados sin razón — usa elementos semánticos (`<section>`, `<article>`, `<header>`)
- ❌ Inline styles cuando hay CSS file — todo en tokens.css
- ❌ Bloques drop-in re-escritos cada vez — siempre import del archivo
- ❌ Framework JS para 1 landing simple — vanilla está bien
- ❌ Hero pesado (>500KB) — siempre WebP + responsive `srcset`
