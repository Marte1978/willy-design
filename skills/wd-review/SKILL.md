---
name: wd-review
description: Sub-skill #6 del pipeline willy-design. Auditoría autónoma del sitio antes de deployar. Usa Playwright MCP para capturar screenshots de cada ruta a 3 viewports (375 / 768 / 1440 px), luego pasa cada captura por un rubric de 7 dimensiones × 25 sub-dimensiones (jerarquía, contraste, tipografía, espaciado, mobile-first, brand-cohesion, conversión). Si score <8/10, identifica los 3 peores problemas y los arregla automáticamente, itera hasta score ≥8. Genera reporte HTML con screenshots anotados. Activa después de wd-build y antes de wd-ship. También invocable solo con `--review-only [URL]` para auditar sitios existentes.
---

# wd-review — Design review autónomo

> Sub-skill #6 del pipeline. Sustituye el "5 dimensiones subjetivas" de huashu con un rubric concreto + Playwright real.

## Inputs

- Path al sitio (carpeta local con `index.html` o URL desplegada)
- O `--review-only [URL]` para auditar sitios existentes

## Pipeline interno

```
1. Levantar sitio local (python -m http.server 8000)
2. Playwright MCP: capture 375 / 768 / 1440 px de cada ruta
3. Para cada screenshot:
   - Análisis de las 7 dimensiones
   - Score parcial 0-10
4. Score total = promedio ponderado
5. Si <8: identificar top-3 problemas, sugerir + aplicar fixes, repetir
6. Si ≥8: emitir reporte HTML
7. Si después de 3 iteraciones <8: emitir reporte con CRÍTICO + pasar al humano
```

## Rubric 7×25

### D1. Jerarquía visual (peso 18%)

- [ ] H1 es lo más prominente above-the-fold
- [ ] Escalado tipográfico claro (h1 > h2 > h3 > body)
- [ ] CTA primario destaca sobre el resto (color + tamaño + posición)
- [ ] No hay 2+ elementos compitiendo por atención en mismo viewport

### D2. Contraste y legibilidad (peso 15%)

- [ ] Body text contraste ≥7:1 (AAA) sobre background
- [ ] Botones primary contraste fg/bg ≥4.5:1 (AA)
- [ ] Texto sobre imágenes con overlay/scrim suficiente
- [ ] Tamaño body ≥16px

### D3. Tipografía (peso 12%)

- [ ] Máximo 2 familias de fuente
- [ ] Line-height: 1.2-1.4 display · 1.5-1.7 body
- [ ] Tracking ajustado en headings (-0.02em)
- [ ] Line-length 50-75 caracteres en párrafos largos

### D4. Espaciado (peso 12%)

- [ ] Ritmo vertical consistente (variable --space-section)
- [ ] Padding cards consistente
- [ ] Gap entre items uniforme
- [ ] Margins respiran (no apretado)

### D5. Mobile-first (peso 18%)

- [ ] Hero legible sin zoom en 375px
- [ ] CTAs reach-zone (min 48px touch target)
- [ ] Sticky CTA mobile presente
- [ ] No horizontal scroll
- [ ] Imágenes WebP responsivas (srcset)

### D6. Brand cohesion (peso 10%)

- [ ] Paleta consistente con familia DESIGN.md
- [ ] Tipografía consistente con familia
- [ ] Microcopy en español RD natural (no traducción literal)
- [ ] Imágenes coherentes con el rubro (no stock genérico)
- [ ] Tono consistente (profesional/cercano/aspiracional según brief)

### D7. Conversión (peso 15%)

- [ ] CTA primario above-the-fold
- [ ] CTA repetido al menos 3 veces en el sitio
- [ ] WhatsApp visible/accesible en cada viewport
- [ ] Prueba social ANTES del precio
- [ ] FAQ después del precio
- [ ] Urgencia/escasez sutil pero visible
- [ ] Compliance footer presente (Ley 172-13)

## Score interpretation

| Score | Acción |
|---|---|
| 9.0+ | Listo para deploy. Champion-level. |
| 8.0-8.9 | Listo para deploy con 1-2 sugerencias menores. |
| 7.0-7.9 | NO deployar. Iterar fixes. |
| <7.0 | Requiere replanteo. Pasar al humano (Willy). |

## Cómo aplicar fixes auto

Para cada problema identificado con score <7 en una dimensión:

1. **Identifica la causa exacta** (qué elemento, qué CSS)
2. **Genera el fix mínimo** — el cambio más pequeño que sube el score
3. **Aplícalo** al HTML/CSS
4. **Re-screenshot** y re-score

Ejemplos:
- "Body text contraste 4.2:1 sobre bg cream" → cambiar `--color-muted` de `#999999` a `#6b7280`
- "CTA primary tamaño 14px en mobile" → subir a `text-base` (16px) min
- "FAQ antes del precio" → reordenar secciones en HTML
- "WhatsApp solo en hero, no en otras secciones" → agregar sticky-mobile + flotante

## Reporte HTML output

Genera `review-report.html` con:

```html
<!DOCTYPE html>
<html><head><title>wd-review — [cliente]</title>...</head>
<body>
  <h1>Review · [cliente]</h1>
  <p>Score: <strong>8.4/10</strong> ✓</p>

  <table>
    <tr><th>D</th><th>Dimensión</th><th>Score</th></tr>
    <tr><td>1</td><td>Jerarquía</td><td>9</td></tr>
    <tr><td>2</td><td>Contraste</td><td>8</td></tr>
    ...
  </table>

  <section>
    <h2>Screenshots con anotaciones</h2>
    <div class="grid">
      <figure><img src="375-hero.png"><figcaption>375px hero</figcaption></figure>
      <figure><img src="768-hero.png"><figcaption>768px hero</figcaption></figure>
      <figure><img src="1440-hero.png"><figcaption>1440px hero</figcaption></figure>
    </div>
  </section>

  <section>
    <h2>Issues identificados</h2>
    <ul>
      <li><strong>[FIXED]</strong> Contraste body 4.2 → 7.1 (D2)</li>
      <li><strong>[FIXED]</strong> Mobile CTA 14px → 16px (D5)</li>
    </ul>
  </section>

  <p>Iteraciones: 2 · Tiempo: 4 min · Listo para wd-ship.</p>
</body></html>
```

## Integración con Playwright MCP

Si `playwright-expert` skill está disponible y MCP server activo:

```
1. mcp__playwright__browser_navigate({url: "http://localhost:8000"})
2. Para cada viewport: 375, 768, 1440
   - mcp__playwright__browser_resize({width, height: 800})
   - mcp__playwright__browser_take_screenshot()
3. Capturar HTML interactivo:
   - clicks en CTAs (verificar funcionalidad)
   - scroll completo (verificar no horizontal)
4. Capturar console errors (debe ser 0)
5. Capturar performance metrics (LCP, CLS, FID)
```

Si MCP NO está disponible: fallback a `python verify.py` con Playwright Python.

## Fallback sin Playwright

Si no hay Playwright disponible, hacer review heurístico:
- Lectura de HTML con análisis textual (jerarquía H1/H2/H3)
- Verificación de tokens CSS (contraste calculado)
- Conteo de CTAs / WhatsApp / compliance
- Score sin screenshots — marcar reporte como "sin captura visual"

## Anti-patrones

- ❌ Saltarse review por "es solo una landing pequeña" — siempre review
- ❌ Iterar más de 3 veces sin avisar al humano
- ❌ Aceptar score <8 "porque ya está bien" — el rubric es objetivo
- ❌ Screenshot solo desktop — los 3 viewports siempre

## Output

```
✅ Review listo: [path/review-report.html]

Score final: 8.6/10
Iteraciones: 2
Issues fixed: 4
Issues remaining: 1 menor (D6 brand cohesion: stock photo en sección 7)

Próximo: wd-ship para deploy.
```
