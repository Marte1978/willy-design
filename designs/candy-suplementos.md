# Familia · candy-suplementos

> Suplementos health, e-commerce de productos naturales, marca propia tipo Candy/HGW.

## Contexto

Audiencia femenina mayoría 28-55, busca solución natural a dolor crónico (quistes, fibromas, hormonas, peso), compra emocional, valida con testimonios, paga con tarjeta o contra-entrega.

Permitido copy emocional fuerte (regla de Willy: catálogos propios sí, clientes externos no).

## Paleta

```css
--color-bg: #fafaf7;             /* off-white cálido */
--color-surface: #ffffff;
--color-surface-2: #f5f5f0;
--color-ink: #1a1a1a;            /* casi negro pero no puro */
--color-ink-2: #3d3d3d;
--color-muted: #6b6b6b;
--color-line: rgba(26, 26, 26, 0.08);

--color-primary: #047857;        /* verde botánico */
--color-primary-fg: #ffffff;
--color-primary-soft: rgba(4, 120, 87, 0.1);

--color-accent: #c2410c;         /* terracota — natural */
--color-accent-fg: #ffffff;

--color-danger: #dc2626;         /* alertas precio sube */
--color-success: #059669;
```

Variantes válidas:
- Femenina-cuidado (quistes, hormonas): primary verde + accent rosa-tierra `#be7c8d`
- Energía (pre-workout, vitaminas): primary verde + accent ámbar `#f59e0b`
- Nocturno (descanso, stress): primary indigo `#3730a3` + accent crema `#fef3c7`

## Tipografía

- **Display**: Plus Jakarta Sans (700-800)
- **Body**: Inter (400-500)
- Letter-spacing display: -0.02em
- Line-height display: 1.05

## Patrones visuales

### Hero
- Imagen producto botella + lifestyle (mujer joven sonriendo, no ultra-modelo)
- Título: emocional + específico ("¿Llevas años con cólicos paralizantes?")
- Subtítulo: dolor del avatar + promesa
- 2 CTAs: WhatsApp verde primary + "Pagar contra entrega" secondary
- Badge "AHORRA RD$X" rojo en imagen
- Precio: tachado original + actual destacado

### Sección PAS (Pain · Agitation · Solution)
- Pain: lista 4 dolores con ✗ rojo
- Agitation: tarjeta con borde rojo claro, fondo `#fef2f2`
- Solution: "Lo que sí funciona" con ✓ verde

### Antes / Después
- Grid 2 columnas: antes (rojo) / después (verde)
- Solo claims verificables, NUNCA "cura"

### Ingredientes
- Cards horizontales con ícono planta + nombre + 1 línea beneficio
- Iconografía: emojis sutiles 🌿 o SVG botánicos custom

### Timeline de resultados
- Vertical con conector gris claro
- Numeración 1-4: día 1 / semana 1 / mes 1 / 90 días
- Solo claims que se pueden defender legalmente

### Testimonios
- Foto real (no stock) o avatar inicial si privacidad
- Nombre + ciudad RD ("Carmen Lucía, Santiago")
- 5 estrellas amber
- Quote en italic
- Badge "✓ Verificado" pequeño

### Pricing card
- Fondo gradient ink → ink-2 con texto cream
- Precio grande, ahorro destacado
- Lista incluye con ✓ verdes
- 2 CTAs prominentes
- Microcopy "Pagas seguro · Recibes en 2-3 días · Devolución 7 días"

### FAQ
- Accordion con `<details>`
- Pregunta bold, respuesta humana (NO corporativa)
- Cubrir: ingredientes, alergias, tiempo de efecto, devolución, embarazo, interacciones

### Footer
- Disclaimer médico OBLIGATORIO: "Estos productos no han sido evaluados por la FDA. No están destinados a diagnosticar, tratar, curar o prevenir ninguna enfermedad. Consulta a tu médico antes de usar si estás embarazada, lactando o tomas medicamentos."

## Microcopy aprobado

- ✓ "Reduce" / "Alivia" / "Apoya" / "Equilibra"
- ✗ "Cura" / "Elimina permanentemente" / "Sin efectos secundarios garantizados"
- ✓ "Resultados visibles desde la X semana"
- ✗ "Resultados garantizados en X días"
- ✓ "Fórmula natural con [ingredientes]"
- ✗ "Único en el mercado" sin pruebas

## Imágenes

- Producto frasco/empaque sobre fondo lifestyle (cocina, baño, mesa de noche)
- Mujeres sonriendo en situaciones cotidianas (no modelo de revista)
- Fotos verticales 3:4 para mobile-first
- Resoluciones: hero 1080×1620, lifestyle 800×1200, product 800×800

## Schema.org

```json
{
  "@type": "Product",
  "name": "...",
  "image": "...",
  "description": "...",
  "brand": { "@type": "Brand", "name": "..." },
  "offers": {
    "@type": "Offer",
    "price": "...",
    "priceCurrency": "DOP",
    "availability": "https://schema.org/InStock"
  },
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "5.0",
    "reviewCount": "..."
  }
}
```

## Bloques drop-in obligatorios

- `whatsapp` (CTA primario, sticky mobile, flotante desktop)
- `polar` o `rd-price` según pago
- (No mapas, productos físicos no tienen ubicación física obvia)

## Compliance

- Disclaimer médico en footer y cerca del precio
- Lista completa de ingredientes accesible
- Política de devolución clara (mínimo 7 días en RD)

## Casos referencia (sitios reales del catálogo Willy)

- quistes-noche.webfactoryrd.com
- quistes-protector.webfactoryrd.com
- prostatap.webfactoryrd.com
- diabetes.webfactoryrd.com
