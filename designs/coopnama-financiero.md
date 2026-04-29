# Familia · coopnama-financiero

> Cooperativas de ahorro y crédito, seguros, financieros, asesoría profesional B2C en RD.

## Contexto

Audiencia 30-65, empleados públicos / docentes / pensionados, busca CONFIANZA antes que velocidad. Decisiones largas, comparativas, consulta familiar. Trust signals son #1: registro IDECOOP, número de asociados, años en operación, transparencia de tasas.

Tono: formal pero cercano. Tutea solo si la cooperativa lo hace en sus canales actuales.

## Paleta

```css
--color-bg: #ffffff;
--color-surface: #f9fafb;
--color-surface-2: #f3f4f6;
--color-ink: #0f172a;            /* navy oscuro */
--color-ink-2: #1e293b;
--color-muted: #64748b;
--color-line: rgba(15, 23, 42, 0.1);

--color-primary: #1e3a8a;        /* azul confianza profundo */
--color-primary-fg: #ffffff;
--color-primary-soft: rgba(30, 58, 138, 0.08);

--color-accent: #b45309;         /* dorado tierra (NO amarillo) */
--color-accent-fg: #ffffff;

--color-success: #15803d;        /* verde para "aprobado", "ahorro" */
--color-info: #0369a1;
```

Variantes:
- COOPNAMA / militares / docentes: navy + accent dorado
- Cooperativas femeninas / agrícolas: verde forestal `#15803d` + accent crema
- Seguros funerarios: navy más oscuro + accent gris-plata `#94a3b8`

## Tipografía

- **Display**: Lexend (700) — diseñada para legibilidad financiera
- **Body**: Inter (400-500)
- Tamaños conservadores (no headlines megamonstruosos)
- Line-height body: 1.7 (más espacioso para lectura larga)

## Patrones visuales

### Top bar
- Indicador de seguridad: 🔒 "Sitio oficial · SSL verificado"
- Número de asociados: "+18,500 asociados activos"

### Header
- Logo + slogan
- Nav con: Productos · Beneficios · Asociarse · Asociado · Contacto
- CTA primary: "Soy asociado" o "Solicitar préstamo"

### Hero
- Imagen: foto real de asociados / familia / contexto local RD (NO stock corporativo gringo)
- Título: claim concreto y verificable ("La cooperativa de los docentes desde 1985")
- Subtítulo: 3 stats inline (años · asociados · activos)
- CTA primary: "Calcular mi préstamo" (calculadora interactiva embebida)
- CTA secondary: WhatsApp

### Stats / trust bar
- Cards horizontales: años · asociados · activos · sucursales
- Números grandes, label pequeño debajo
- Fondo neutro, sin gradients

### Productos
- Grid de cards con icono + nombre + 1 línea + tasa "desde X%"
- Productos típicos: Préstamo personal · Préstamo vehículo · Préstamo vivienda · Ahorro programado · Tarjeta cooperativa
- CTA en cada card: "Ver detalles"

### Calculadora de préstamo
- Inputs: monto · plazo · cuota mensual estimada
- Cálculo en cliente sin backend
- Microcopy: "Cálculo referencial. Aprobación sujeta a evaluación crediticia."

### Beneficios asociado
- Lista 6-10 con ✓ azules
- Específicos: "Tasas preferenciales", "Préstamo express en 24h", "Bono navideño"

### Proceso para asociarse
- 4-5 pasos claros
- Documentos requeridos: cédula, copia de cheque o constancia de trabajo, foto

### Testimonios
- Foto real asociado + nombre + cargo / ocupación + cooperativa años de membresía
- Quote en italic, sin emojis
- 3 max para no saturar

### FAQ
- Cubrir: requisitos, tasas, plazos, mora, retiro de membresía, pago anticipado, IDECOOP

### Footer
- Datos completos: dirección física + teléfono + email + WhatsApp + horario
- Logos: IDECOOP, FEDOPAP, AIRAC (asociaciones cooperativas)
- Compliance: registro IDECOOP, RNC, número asociado total

## Microcopy aprobado

- ✓ "Tasa desde X%" + asterisco con condiciones
- ✓ "Aprobación sujeta a evaluación"
- ✓ "Atendemos a docentes/empleados públicos/[específico]"
- ✗ "Préstamo aprobado garantizado" sin condiciones
- ✗ "La mejor cooperativa de RD" sin pruebas
- ✗ Tono jovial / startup-ish — esto NO es Stripe

## Imágenes

- Asociados reales (con permiso) o fotos de eventos de la cooperativa
- Edificios de sucursales reales
- NO stock corporativo gringo (mujer rubia con tablet sonriendo)
- Resoluciones: hero 1920×800, cards 800×600

## Schema.org

```json
{
  "@type": "FinancialService",
  "name": "...",
  "address": { "@type": "PostalAddress", ... },
  "telephone": "...",
  "openingHours": "..."
}
```

## Bloques drop-in obligatorios

- `whatsapp` (CTA secundario para consultas)
- `rd-map` (sucursal principal)
- (NO Polar — cooperativas RD usan transferencia bancaria, no checkout)

## Compliance

- Logo IDECOOP en footer (regulador)
- Número RNC visible
- Política de Privacidad (Ley 172-13)
- Términos de uso del préstamo (cuando se ofrece)
- Tasa Anual Efectiva (TAE) cuando se promociona préstamo

## Performance budget

Más relajado que landings de pago — las cooperativas se visitan desde casa, conexión razonable. Aún así LCP <3s, JS <120KB.

## Casos referencia

- Cooperativa COOPNAMA — `victor.webfactoryrd.com` (formulario precalificación, mismo cluster)
