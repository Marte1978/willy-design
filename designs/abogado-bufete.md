# Familia · abogado-bufete

> Abogados, bufetes, notarios, asesores legales en RD.

## Contexto

Audiencia 30-65, busca CONFIANZA y CREDIBILIDAD por encima de todo. Decisiones de alto stakes (divorcios, herencias, sociedades, inmigración). Compara entre 3-5 opciones, valida en LinkedIn, llama por teléfono ANTES de WhatsApp.

Tono: formal, sereno, autoridad sin arrogancia. Cero startup-y. Cero gradients morados.

## Paleta

```css
--color-bg: #ffffff;
--color-surface: #fafaf9;
--color-surface-2: #f5f5f4;
--color-ink: #1c1917;            /* casi negro tinta */
--color-ink-2: #44403c;
--color-muted: #78716c;
--color-line: rgba(28, 25, 23, 0.1);

--color-primary: #1e3a8a;        /* navy clásico abogado */
--color-primary-fg: #ffffff;
--color-primary-soft: rgba(30, 58, 138, 0.08);

--color-accent: #92400e;         /* burgundy/wine — gravitas */
--color-accent-fg: #ffffff;

--color-success: #166534;
```

Variantes:
- Bufete corporativo grande: navy + accent dorado mate `#854d0e`
- Abogado individual joven: ink + accent burgundy
- Notaría: navy + accent gris piedra `#44403c`
- Inmigración: navy + accent verde forestal (esperanza)

## Tipografía

- **Display**: Lora (serif clásica) o Source Serif 4 (700)
- **Body**: Inter (400-500)
- Display weight 600-700, NO ultra bold
- Tracking display: -0.01em (sutil)
- Body NUNCA <16px (audiencia mayor existe)

## Patrones visuales

### Top bar
- Teléfono directo + WhatsApp + "Consulta inicial gratis" si aplica
- Cédula RNC + Registro CARD (Colegio de Abogados RD)

### Header
- Logo del bufete (clásico, NO startup)
- Nav: Áreas de práctica · Equipo · Casos · Recursos · Contacto
- CTA primary: "Agendar consulta"

### Hero
- Imagen: foto profesional del abogado (saco, fondo neutro) o foto del despacho
- Título: NOMBRE PROPIO + área de práctica
  - "Marco Reyes — Abogado especialista en Derecho de Familia"
- Subtítulo: 1 línea con experiencia + casos atendidos + ubicación
- 2 CTAs: "Agendar consulta" + WhatsApp
- Trust bar: "20 años · 500+ casos · Cédula CARD #XXXX"

### Áreas de práctica
- Lista o grid con icono + nombre + 2-3 servicios típicos
- Áreas comunes: Derecho de Familia · Inmobiliario · Mercantil · Laboral · Penal · Inmigración
- "Más información" → página dedicada por área

### Sobre el abogado
- Bio formal:
  - Estudios (universidad, posgrados)
  - Cédula profesional CARD
  - Idiomas (español, inglés, otros)
  - Áreas de especialización
  - Publicaciones / cargos en colegios profesionales
  - Membresía a asociaciones (CARD, etc.)
- Foto profesional B&N o color sobrio

### Casos / Logros
- Casos relevantes (ANONIMIZADOS — confidencialidad)
- "Recientemente representé a una familia en proceso de herencia, logrando..."
- NO mencionar nombres ni montos exactos sin permiso

### Proceso de contratación
- 4 pasos: 1) Consulta inicial · 2) Evaluación + propuesta · 3) Firma de contrato · 4) Inicio del caso
- Honorarios: "Cotizamos transparentemente según complejidad. Primera consulta es gratis / RD$X."

### Testimonios
- Solo con permiso del cliente
- Iniciales o nombre completo según preferencia
- Foto opcional
- Énfasis en proceso y comunicación, no resultados específicos

### Recursos / Blog
- Artículos legales tipo "¿Qué hacer cuando..."
- Construye autoridad
- SEO importante

### Contacto
- Form: nombre, email, teléfono, área legal, descripción del caso, urgencia
- Disclaimer: "El envío de este formulario NO constituye relación abogado-cliente"
- Mapa de la oficina + horarios

### Footer
- Sólido y completo
- Datos del bufete + RNC + Cédula CARD
- Política Privacidad + Términos
- Aviso: "El contenido de este sitio es informativo. Para asesoría específica consulte un abogado."

## Microcopy aprobado

- ✓ "Asesoría legal personalizada"
- ✓ "Cada caso es único"
- ✓ "Consulta inicial sin compromiso"
- ✓ "Confidencialidad garantizada"
- ✗ "Ganamos el 95% de los casos" (peligroso ético + verificación)
- ✗ "Garantizamos resultado" (CARD prohíbe)
- ✗ Tono casual / startup
- ✓ Usted (no tutea — formal con audiencia legal)

## Imágenes

- Foto profesional del abogado (saco/blazer, fondo neutro)
- Foto del despacho (escritorio, libros, biblioteca legal)
- Edificio / oficina exterior
- Tonos sobrios — NO sonrisas dental ad
- Resoluciones: hero 1920×1080, perfil 800×800, despacho 1600×1067

## Schema.org

```json
{
  "@type": "Attorney",
  "name": "...",
  "address": { ... },
  "telephone": "...",
  "openingHours": "...",
  "areaServed": "República Dominicana",
  "memberOf": {
    "@type": "ProfessionalService",
    "name": "Colegio de Abogados de la República Dominicana (CARD)"
  }
}
```

## Bloques drop-in obligatorios

- `whatsapp` (CTA secundario, NO primary — los abogados prefieren llamada formal)
- `rd-map` (oficina física)
- Form contacto formal
- (NO Polar — abogados cobran por contrato/transferencia, NO checkout instantáneo)

## Compliance

- Cédula CARD visible
- RNC del bufete
- Disclaimer "no constituye relación abogado-cliente" en form
- Política Privacidad reforzada (datos legales sensibles)
- Términos servicios (cuando se contratan)

## Performance budget

- Audiencia paciente — LCP <3s aceptable
- JS <100KB
- Imágenes optimizadas pero alta calidad

## Casos referencia

- (Próximos clientes WebFactoryRD)
- Inspiración: pellerano-herrera.com · headrick.com.do · obras del CARD

## Patrones por sub-rubro

### Bufete corporativo grande
- Equipo destacado (varios abogados)
- Casos M&A, sociedades, regulatorio
- Idioma inglés disponible
- Énfasis en clientes corporativos

### Abogado individual / Boutique
- Foto del abogado prominente
- 1-3 áreas de práctica
- Bio personal + filosofía
- "Atención personalizada"

### Notaría
- Servicios: actos auténticos, poderes, donaciones, compraventas
- Costos referenciales si la regulación lo permite
- Ubicación + horario CRÍTICOS

### Inmigración
- Países / visas atendidos: USA, Canadá, España, Schengen
- Procesos comunes: residencia, ciudadanía, reunificación familiar
- Idioma inglés mandatorio
