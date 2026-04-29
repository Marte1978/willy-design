---
name: wd-ia
description: Information architecture sub-skill del pipeline willy-design. Toma el brief.md de wd-brief y produce ia.md con la lista ordenada de 8-14 secciones del sitio, jerarquía de headlines (H1/H2/H3), micro-copy de cada CTA, decisión de qué bloques drop-in usar (Polar/WhatsApp/RDPrice/RDMap), y mapa de funnel (atención → interés → deseo → acción). Activa este skill después de wd-brief y antes de wd-tokens. NO inventes secciones genéricas como "About Us" en español ("Sobre Nosotros") — usa nombres específicos al rubro y al hook elegido.
---

# wd-ia — Information Architecture

> Sub-skill #3 del pipeline `willy-design`. Define qué secciones tiene el sitio, en qué orden, con qué CTA.

## Inputs requeridos

- `brief-grill.md` (de wd-grill)
- `brief.md` (de wd-brief)

## Lo que produce

`ia.md` con:

### 1. Lista ordenada de secciones (8-14)

Cada sección con:
- Tipo (hero, problema, solución, beneficios, oferta, etc.)
- H1/H2 propuesto
- Sub-copy
- CTA si aplica
- Bloques drop-in usados

```markdown
## Estructura

### 1. Top bar / Urgencia
- **Tipo**: bar superior
- **Copy**: "🔥 [Promesa o urgencia real]"
- **Posición**: sticky-top siempre visible
- **Block**: ninguno

### 2. Header
- **Tipo**: navegación
- **Logo**: [nombre cliente]
- **CTA derecha**: WhatsApp (verde, animado)
- **Block**: `whatsapp` mini

### 3. Hero
- **Tipo**: hero principal
- **H1**: "[Promesa central del brief]"
- **Sub**: "[1 frase complemento + prueba]"
- **CTA primario**: "[del brief]"
- **CTA secundario**: WhatsApp
- **Visual**: [hero image / mockup / video]
- **Block**: `whatsapp` + (`polar` si pago directo)

### 4. Problema / Pain
- **Tipo**: PAS section
- **H2**: "[Pain del avatar reformulado como pregunta]"
- **Cards**: 3-4 dolores del brief
- **CTA**: ninguno (genera tensión)

### 5. Solución
- **Tipo**: introducción al producto
- **H2**: "[Cómo lo resolvemos]"
- **Sub**: "[Mecanismo único]"
- **Visual**: foto producto / mockup / before-after

### 6. Beneficios / Lo que incluye
- **Tipo**: grid de features
- **H2**: "Lo que recibes"
- **Items**: cards con icono + título + 1 línea
- **Cantidad**: 6-8 items max

### 7. Proceso (si aplica)
- **Tipo**: timeline o pasos numerados
- **H2**: "Cómo funciona"
- **Items**: 3-5 pasos

### 8. Prueba social
- **Tipo**: testimonios
- **H2**: "[Quote-driven en español RD]"
- **Items**: 3-6 testimonios reales del brief
- **Visual**: foto + nombre + ciudad

### 9. Oferta / Precio
- **Tipo**: pricing card
- **H2**: "[Precio claro + condiciones]"
- **Componentes**:
  - Precio total destacado
  - Lista de incluye
  - Estructura de pago
  - CTA principal
- **Block**: `polar` o `whatsapp` o `rd-price` según P6

### 10. FAQ
- **Tipo**: accordion
- **H2**: "Preguntas frecuentes"
- **Items**: 6-12 preguntas que vienen del brief o del rubro

### 11. CTA final
- **Tipo**: closing
- **H2**: "[Repite la promesa o usa urgencia]"
- **CTA primario**: misma del hero
- **CTA secundario**: WhatsApp

### 12. Footer
- **Tipo**: footer simple
- **Items**: WhatsApp · email · ubicación · redes · privacidad · términos
- **Compliance**: link a Política Privacidad (Ley 172-13 RD)
```

### 2. Mapa de funnel

```markdown
## Funnel

| Sección | Etapa | Objetivo |
|---|---|---|
| 1-3 | Atención | Captura interés en <5 segundos |
| 4-5 | Interés | Genera tensión + ofrece alivio |
| 6-7 | Deseo | Construye anhelo del resultado |
| 8 | Confianza | Reduce riesgo percibido |
| 9-10 | Decisión | Cierra objeciones |
| 11-12 | Acción | Cierra el clic |
```

### 3. Jerarquía tipográfica

```markdown
## Jerarquía

- H1 (hero): 56-72px desktop · 40-48px mobile · weight 800
- H2 (secciones): 32-40px desktop · 28-32px mobile · weight 700
- H3 (cards): 18-22px · weight 600
- Body large (lede): 18-20px · weight 400
- Body: 15-16px · weight 400
- Micro (tags, captions): 12-13px · weight 600 uppercase

Ratio: 1.25 (golden) o 1.333 (mayor third) — escoger UNA y mantener.
```

### 4. Decisión de bloques drop-in

```markdown
## Bloques

- ☑ `whatsapp` — siempre (sticky-bottom mobile + flotante desktop + en CTAs)
- ☑/☐ `polar` — [SÍ si P6 incluye polar]
- ☑/☐ `rd-price` — [SÍ si pricing en RD$ + USD$]
- ☑/☐ `rd-map` — [SÍ si negocio tiene local físico]
- ☑/☐ `telegram` — [SÍ si webhook de Polar va a Telegram]
```

### 5. Decisión de FAQ

Genera la lista de preguntas. NO copies de un sitio similar — derívalas del brief.

```markdown
## FAQ propuesto

1. ¿[Pregunta sobre el producto]?
2. ¿[Pregunta sobre precio/pago]?
3. ¿[Pregunta sobre plazo/entrega]?
4. ¿[Pregunta sobre garantía/devolución]?
5. ¿[Pregunta sobre soporte/cambios]?
6. ¿[Pregunta sobre alternativas/comparativa]?
7. ¿[Pregunta sobre rubro-específica]?
8. ¿[Pregunta sobre rubro-específica]?
```

## Reglas de orden

1. **Hero antes de cualquier otra cosa** — siempre.
2. **Problema antes de solución** — PAS framework. Genera tensión, después alivia.
3. **Prueba ANTES del precio** — la confianza desbloquea la oferta.
4. **FAQ después del precio** — cierra objeciones residuales.
5. **CTA final OBLIGATORIO** — repetir la oferta antes del footer.
6. **Footer con compliance RD** — link a privacidad/términos siempre.

## Reglas por rubro

- **Salud**: agregar sección "Aviso médico" en footer (no sustituye consejo médico).
- **Inmobiliaria**: agregar "Promesa de venta sujeta a verificación legal de propiedad".
- **Suplementos**: agregar disclaimer "Estos productos no están destinados a diagnosticar, tratar, curar..."
- **Legal-financiero**: agregar registro INDOTEL si vende a distancia + cédula profesional del abogado.
- **Restaurante**: agregar horarios + Google Maps + delivery zones.
- **Cooperativas**: agregar "Regulada por IDECOOP" + número de registro.

## Anti-patrones

- ❌ "Sobre Nosotros" como sección — siempre nombrar específico ("Quién está detrás de [marca]")
- ❌ Sección "Servicios" genérica — divide en categorías o productos
- ❌ Más de 14 secciones — agotador, baja conversión
- ❌ Menos de 8 secciones — falta tensión + prueba + cierre
- ❌ Hero sin CTA visible — el visitante NO sabe qué hacer

## Output al terminar

```
✅ IA listo: [path/ia.md]

Estructura: 12 secciones · funnel completo
CTAs: 4 primarios + 3 WhatsApp
Bloques: [lista usados]

Próximo: wd-tokens para paleta + tipografía.
```
