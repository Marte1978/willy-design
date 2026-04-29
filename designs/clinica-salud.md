# Familia · clinica-salud

> Clínicas, dentistas, fisioterapeutas, ginecólogos, ópticas, nutricionistas, psicólogos en RD.

## Contexto

Audiencia 25-65, busca AGENDAR cita rápido o resolver duda urgente. Trust signals = registros profesionales (cédula INTEC), años de experiencia, fotos del consultorio real, antes/después solo si es estética.

Tono: profesional + humano. Cero corporativo gringo. Cero promesas médicas.

## Paleta

```css
--color-bg: #ffffff;
--color-surface: #f8fafc;
--color-surface-2: #f1f5f9;
--color-ink: #0f172a;
--color-ink-2: #334155;
--color-muted: #64748b;
--color-line: rgba(15, 23, 42, 0.08);

--color-primary: #0e7490;        /* teal medical (calmante, no demasiado azul) */
--color-primary-fg: #ffffff;
--color-primary-soft: rgba(14, 116, 144, 0.08);

--color-accent: #f59e0b;         /* amber para "agenda hoy" */
--color-accent-fg: #1c1c1c;

--color-success: #16a34a;        /* "tu cita está confirmada" */
--color-danger: #dc2626;         /* alertas urgencia médica */
```

Variantes:
- Estética / dermatología: rose `#e11d48` + cream
- Pediatría: light blue `#60a5fa` + amarillo cálido
- Cardiología / interno: teal calmante (default)
- Dental: white + accent celeste suave `#0284c7`
- Salud mental / psicología: lavender `#7c3aed` + cream

## Tipografía

- **Display**: Plus Jakarta Sans (700) — limpia, accesible
- **Body**: Inter (400-500)
- Tamaños generosos (audiencia 50+ existe)
- Body NUNCA <16px

## Patrones visuales

### Top bar
- Teléfono emergencia (si aplica) + horarios + WhatsApp directo
- Sticky en mobile

### Header
- Logo + especialidad
- Nav: Servicios · Equipo · Pacientes · Contacto
- CTA primary: "Agendar cita" → form o WhatsApp

### Hero
- Imagen: foto del doctor/equipo o consultorio real (NO stock médico genérico)
- Título: especialidad + nombre del profesional
  - "Tu salud bucal en manos expertas — Dra. Ana López"
- Subtítulo: 1 línea con calificación + experiencia + ubicación
- 2 CTAs: "Agendar cita" + WhatsApp
- Trust bar inline: "✓ Cédula profesional · ✓ 15 años de experiencia · ✓ Ubicación céntrica"

### Servicios
- Grid de cards o lista organizada por categoría
- Por servicio: nombre · 1 línea descripción · precio "desde RD$X" si aplica · CTA "Más info"
- Iconografía médica minimal Lucide

### Sobre el doctor / equipo
- Foto profesional del doctor (NO stock)
- Bio: cédula INTEC, especialidad, hospital de origen, años, casos atendidos
- Filosofía / approach a 1 párrafo

### Antes / Después (solo estética)
- Slider o split-image
- Disclaimer: "Resultados pueden variar según paciente"
- Solo con consentimiento del paciente

### Testimonios
- Foto + nombre + edad + tratamiento
- Quote en italic, centrado en card
- Reseñas Google integradas si tiene calificación 4.5+

### Proceso de cita
- 4 pasos: 1) Agendar online o WhatsApp · 2) Llegar 10 min antes · 3) Consulta · 4) Plan de tratamiento
- Ilustración o íconos por paso

### Ubicación + parking
- Mapa con marker
- "Estacionamiento gratuito disponible"
- Edificio reconocible / cómo encontrarlo
- Acceso transporte público

### FAQ
- Cubrir: seguros médicos aceptados, primera cita, cobertura ARS, urgencias, niños, política cancelación

### Footer
- Datos completos
- ARS aceptadas (logos)
- Cédula profesional + RNC del consultorio
- Redes
- Horario de atención
- Mapa de localización

## Microcopy aprobado

- ✓ "Agendar cita" / "Reservar cita"
- ✓ "Resultados pueden variar"
- ✓ "Consulta médica con la Dra. X"
- ✗ "Cura definitiva" / "Sin riesgo" / "100% efectivo"
- ✗ "El mejor doctor de RD" sin pruebas
- ✗ Lenguaje sensacionalista
- ✓ Tutea ("tu salud", "agenda tu cita") — más cercano

## Imágenes

- Foto del doctor en su consultorio
- Equipo del consultorio en acción (con permiso de paciente)
- Edificio / fachada
- NO stock médico gringo (mujer rubia con bata sonriendo a iPad)
- Resoluciones: hero 1920×1080, equipo 800×800

## Schema.org

```json
{
  "@type": "Dentist",  // o "Physician", "MedicalBusiness"
  "name": "...",
  "address": { ... },
  "telephone": "...",
  "openingHours": "...",
  "medicalSpecialty": "..."
}
```

## Bloques drop-in obligatorios

- `whatsapp` (CTA primary y secundario)
- `rd-map` (ubicación física crítica)
- Form de cita (nombre · teléfono · mensaje · fecha preferida)
- (Polar opcional para servicios estéticos prepay)

## Compliance

- Cédula profesional del doctor visible
- RNC del consultorio
- "Esta página no sustituye consulta médica"
- En estética: "Resultados varían por paciente. Consulta evaluación previa."
- Política Privacidad (Ley 172-13) + datos médicos sensibles

## Performance budget

- LCP <2.5s
- Imagen del doctor optimizada (es la LCP típica)
- JS <80KB

## Casos referencia

- (Próximos clientes WebFactoryRD)
- Inspiración: clinicacharles.do · clínicas-rd top 10 Google

## Patrones específicos por sub-rubro

### Dental
- Hero con sonrisa (paciente real con permiso o doctor)
- Servicios típicos: limpieza · ortodoncia · blanqueamiento · implantes · estética
- Antes/después en estética dental

### Estética / Dermatología
- Galería antes/después MUY importante
- Disclaimer explícito en cada caso
- Consulta inicial gratis CTA

### Pediatría
- Tono cálido + colorido (palette light blue + amarillo)
- Foto de niños (con permiso)
- Énfasis en "ambiente amigable, sin trauma"

### Salud mental
- Tono SUAVE — sin urgencia, sin presión
- Línea de crisis 809-200-1202 visible
- Confidencialidad destacada
- Modalidades: presencial / online
