# Familia · capcana-luxury

> Inmobiliaria luxury caribe (Cap Cana, Punta Cana, Cabarete, Las Terrenas), turismo high-end, hotelería boutique, marca de aspiración premium.

## Contexto

Audiencia 35-65 con poder adquisitivo, mayoría diáspora US/Europa o residentes RD top tier. Buscan estatus, exclusividad, ubicación, renta vacacional rentable. Decisiones largas, recorridos múltiples antes de cerrar.

Tono: aspiracional, sereno, sofisticado. Nada cargado, nada ruidoso. Espacio en blanco abundante. Imágenes hablan más que el texto.

## Paleta

```css
--color-bg: #fdfcf8;             /* crema casi blanco */
--color-surface: #ffffff;
--color-surface-2: #f5f2ec;
--color-ink: #1c1c1c;            /* casi negro pero suave */
--color-ink-2: #44403c;
--color-muted: #78716c;
--color-line: rgba(28, 28, 28, 0.1);

--color-primary: #1c1c1c;        /* el ink ES el primary — minimal */
--color-primary-fg: #fdfcf8;

--color-accent: #b08d57;         /* dorado champán (NO oro brillante) */
--color-accent-fg: #1c1c1c;

--color-success: #4d7c0f;        /* verde oliva */
```

Variantes:
- Beach property: ink + accent turquesa apagado `#0e7490` + cream
- Urban Punta Cana villas: ink puro + accent oro champán
- Cabarete (surf, boutique): ink + accent terracota `#b45309`
- Casas de campo / golf: ink + accent verde oliva profundo

## Tipografía

- **Display**: Cormorant Garamond (300-500) — serif clásica luxury
- **Body**: Inter (300-400) o Mont Real Display
- Display weight ligero (300-400), NO bold heavy
- Letter-spacing display: -0.01em (sutil)
- Line-height display: 1.1
- Tamaños grandes pero ligeros

## Patrones visuales

### Header
- Logo monograma o wordmark serif fino
- Nav minimal: Propiedades · Servicios · Equipo · Contacto
- CTA discreto: "Agendar visita" (no botón gigante)
- Background transparent que se vuelve sólido al scroll

### Hero
- Imagen full-width 100vh con video loop de la propiedad / drone shot del area
- Texto centrado o bottom-left, MUY pocas palabras
- Título: nombre de la propiedad o claim de marca, NO promesa-de-venta
- Sub: dirección abreviada + sq ft / m² + 1 dato clave (vista al mar / golf course / etc.)
- 1 solo CTA: "Ver propiedad" o "Solicitar tour"

### Galería
- Grid editorial Mason (3 columnas desktop, 2 tablet, 1 mobile)
- Imágenes alta calidad sin overlay de texto
- Lightbox al click
- 12-30 imágenes por propiedad

### Especificaciones
- Tabla horizontal limpia con bordes finos
- Cap rate, m², habitaciones, baños, año construcción, mantenimiento HOA
- Iconografía minimal lineal (Lucide, weight 1)

### Ubicación
- Mapa interactivo (custom Leaflet o Google Maps con estilos retro)
- Lista de amenidades cercanas con distancia: "Marina · 5 min · Aeropuerto Punta Cana · 18 min"
- Foto satelital de la zona

### Servicios incluidos (si aplicable)
- Concierge, mantenimiento, gestión de renta, seguridad
- Iconografía minimal
- 1 línea por servicio

### Equipo
- Foto profesional B&N o color desaturado
- Nombre · cargo · 1 línea bio · email + WhatsApp directo
- 3-4 personas max (NO equipo de 30)

### Sección de prestigio
- Awards / press mentions: "Featured in Architectural Digest, Wall Street Journal"
- Sin gritar — discreto, pequeño, en B&N

### Contacto
- Form simple: nombre, email, mensaje, idioma preferido
- WhatsApp + teléfono internacional
- Horario en zona horaria local + español/inglés
- Mapa de la oficina

### Footer
- Sólido, calmo, mucho espacio
- Logo · contacto · redes · privacy
- Compliance broker license RD

## Microcopy aprobado

- ✓ Inglés/español dual (la audiencia es bilingüe)
- ✓ "Property", "Residence", "Estate" en lugar de "casa"/"propiedad"
- ✓ Datos concretos: "Direct ocean view · 4,200 sq ft · 5 BR / 6 BA"
- ✗ "Best deal in Cap Cana" — luxury no compite por precio
- ✗ "Hurry, only 2 left!" — luxury no genera urgencia
- ✗ Iconos emoji (🏖️🌴) — usar SVG minimal

## Imágenes

- Fotografía profesional MANDATORIA — no stock
- Drone shots, golden hour, blue hour
- Interiores a 35mm con luz natural
- Ratio 3:2 horizontal para hero, 4:5 para portrait
- Resoluciones: hero 2560×1440, gallery 1920×1280

## Animaciones

- Parallax sutil en hero (no agresivo)
- Fade-in lento de imágenes al scroll (700ms+ ease-out)
- Cursor custom con círculo en hover de propiedades
- Transiciones page-to-page suaves (sin saltos)

## Schema.org

```json
{
  "@type": "RealEstateAgent",
  "name": "...",
  "address": { ... },
  "areaServed": ["Cap Cana", "Punta Cana", "Bávaro"]
}
```

Por propiedad:
```json
{
  "@type": "Residence",
  "address": { ... },
  "numberOfRooms": ...,
  "floorSize": "..."
}
```

## Bloques drop-in obligatorios

- `whatsapp` (más discreto que en otras familias — CTA secundario)
- `rd-map` (custom-styled minimal)
- Form contact directo
- (NO Polar — luxury inmobiliario NO se cierra online)

## Compliance

- Broker license RD número
- "Promesa de venta sujeta a verificación legal de propiedad"
- Tasa de cambio actualizada si precios en USD
- Política de Privacidad en español + inglés

## Performance budget

Imágenes pueden ser pesadas (luxury vende con foto), pero:
- Lazy load todo excepto hero
- WebP/AVIF responsive `srcset`
- LCP target: <3s en 4G (más permisivo que retail)
- CLS: <0.1 (CRÍTICO — la galería no debe brincar)

## Casos referencia

- (Pendiente — primer cliente luxury de WebFactoryRD)
- Inspiración: sothebysrealty.com · luxuryrealestate.com · capcanagateway.com
