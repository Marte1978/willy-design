# Familia · restaurante-rd

> Restaurantes, comida criolla, fonda gourmet, dark kitchen, cafetería, food truck en RD.

## Contexto

Audiencia 25-55, decisión rápida (¿dónde comemos hoy?), busca menú + ubicación + delivery + reseñas. Mobile-first ABSOLUTO — el 90% del tráfico es móvil mirando "comida cerca de mí" o "[plato] [zona]".

Tono: cálido, apetitoso, con personalidad del lugar. Cero corporativo.

## Paleta

```css
--color-bg: #fdfcf6;             /* crema cálida */
--color-surface: #ffffff;
--color-surface-2: #f5f1e8;
--color-ink: #1f1611;            /* marrón oscuro casi negro */
--color-ink-2: #44372d;
--color-muted: #6b5d52;
--color-line: rgba(31, 22, 17, 0.1);

--color-primary: #be123c;        /* rojo plato fuerte / wine */
--color-primary-fg: #ffffff;
--color-primary-soft: rgba(190, 18, 60, 0.08);

--color-accent: #f59e0b;         /* mostaza / curry / mango */
--color-accent-fg: #1f1611;
```

Variantes:
- Comida criolla / fonda: rojo wine + amarillo plátano `#fbbf24`
- Italiana / pizzería: verde basílico `#16a34a` + rojo tomate `#dc2626` + crema
- Café / bistro: marrón espresso `#451a03` + crema + dorado
- Pollo / parrilla: rojo brasa + amarillo + carbón `#1f2937`
- Mariscos: turquesa `#0891b2` + cream + coral `#fb7185`
- Cafetería / desayuno: terracotta `#c2410c` + cream + verde menta

## Tipografía

- **Display**: Playfair Display (700-900) — serif elegante para nombres de platos
- **Body**: Inter (400-500)
- O alternativa: Bricolage Grotesque para feel moderno-criollo
- Tamaños generosos en mobile (los menús se leen rápido)

## Patrones visuales

### Top bar
- Horarios + delivery zones + WhatsApp pedidos
- "🟢 Abierto ahora · Cierra a las 11pm" (real-time si posible)

### Header
- Logo grande/protagonista (es marca emocional)
- Nav: Menú · Reservar · Delivery · Eventos · Contacto
- CTA primary: "Reservar mesa" o "Pedir ahora" según modelo

### Hero
- IMAGEN dominante de plato estrella en alta calidad (la imagen ES el sitio)
- Título: nombre del restaurante + 1 línea diferenciador
  - "La Tablita — Comida criolla con sabor de antaño"
- Subtítulo: ubicación + horario + reseña Google
- CTAs: "Ver menú" + "Reservar mesa" o "Pedir delivery"

### Menú visual
- Cards con foto del plato + nombre + descripción + precio
- Categorías filtrables: Entradas · Platos fuertes · Mariscos · Postres · Bebidas
- Mostrar precio en RD$ como default
- Tags: 🌶 picante · 🌱 vegetariano · 🍷 maridaje sugerido
- "Plato del día" o "Recomendado del chef" destacados

### Galería
- Grid de fotos: platos · ambiente · staff · eventos
- Lightbox con foto grande
- 12-20 fotos típicamente

### Sobre el restaurante
- Historia breve (chef, origen, especialidad)
- Foto del chef o el dueño
- Filosofía culinaria

### Reseñas
- Google reviews integradas (usando Place ID)
- 4.5+ estrellas si las tienes
- Quotes destacados de clientes

### Reservar
- Form simple: nombre · teléfono · cantidad personas · fecha · hora · ocasión especial
- O integración con OpenTable / similar (no para RD usual)
- Confirmación por WhatsApp

### Delivery
- Lista de plataformas: PedidosYa · Uber Eats · iFood · directo WhatsApp
- Zonas de entrega + tiempo estimado + costo

### Eventos privados
- Si aplica: cumpleaños, aniversarios, empresariales
- Capacidad + paquetes desde
- CTA "Cotizar evento"

### Ubicación
- Mapa Google con marker
- Dirección · cómo llegar · parking
- Foto de la fachada para reconocer al llegar
- Transporte público accesible

### FAQ
- Reservas necesarias?
- Llevan delivery a [zona]?
- Hay menú vegano/vegetariano?
- Aceptan tarjeta?
- Tienen kids menu?
- Hay valet parking?

### Footer
- Datos · redes · horario · WhatsApp · email
- Logos plataformas delivery
- Política de cancelación de reserva
- RNC

## Microcopy aprobado

- ✓ "Auténtico" si lo es (origen verificable)
- ✓ "Hecho en casa" / "Receta de la abuela"
- ✓ "Reservar mesa" / "Pedir ahora"
- ✗ "El mejor restaurante de RD" sin pruebas
- ✗ Descripciones tipo Yelp gringo ("perfectly cooked..., divine..., transcendent")
- ✓ Spanish RD natural: "criollo de verdad", "como en casa", "buena sazón"

## Imágenes

- Fotografía profesional MANDATORIA — comida MAL fotografiada mata el sitio
- Iluminación natural / golden hour
- Platos servidos como en restaurante real (no "styled")
- Detalles: ingredientes frescos, manos del chef, ambiente del local
- Resoluciones: hero 1920×1080, plato 1200×900, gallery 1080×1080

## Schema.org

```json
{
  "@type": "Restaurant",
  "name": "...",
  "image": "...",
  "address": { ... },
  "telephone": "...",
  "openingHours": "...",
  "servesCuisine": ["Dominican", "Caribbean"],
  "priceRange": "$$",
  "menu": "[URL al menú]",
  "acceptsReservations": "True"
}
```

## Bloques drop-in obligatorios

- `whatsapp` (CRÍTICO — pedidos por WhatsApp es el estándar RD)
- `rd-map` (sin esto el sitio no sirve)
- Form reserva
- (NO Polar — pago en restaurante o delivery)

## Compliance

- Política de privacidad (datos de reservas)
- Términos cancelación de reserva
- RNC visible si emite facturas

## Performance budget

- Hero LCP <2.5s — la imagen del plato es prioritaria
- Imágenes WebP responsive
- Lazy load galería
- JS <60KB

## Casos referencia

- (Próximos clientes WebFactoryRD)
- Inspiración: notable.com.do · adriantropical.com · viva.do

## Patrones por sub-rubro

### Comida criolla / fonda
- Énfasis en "auténtico" y "tradición familiar"
- Foto de la dueña o chef en cocina
- Menú largo con platos típicos

### Pizzería / italiana
- Hero con la pizza estrella
- "Hornoo de leña" si aplica
- Maridaje con vinos italianos

### Mariscos
- Hero con plato de mariscos
- Énfasis en "frescos del día"
- Fotos del mercado de pescado origen

### Café / bistro
- Hero con taza de café o detalle de barista
- Énfasis en grano, origen, método
- Menu desayunos visible
