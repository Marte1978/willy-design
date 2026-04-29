---
name: wd-grill
description: Question form pre-flight determinístico para proyectos de diseño WebFactoryRD. Saca las 6 respuestas obligatorias antes de escribir código (rubro, audiencia, ticket, tono, hook, pago). Sin estas respuestas el pipeline willy-design NO arranca — esto evita generic AI slop. Activa wd-grill cuando vayas a empezar un proyecto de landing/sitio para un cliente y aún no tienes claridad sobre estas 6 dimensiones, o cuando el usuario diga "vamos a empezar con [cliente]" sin más contexto.
---

# wd-grill — Brief en 6 preguntas

> Sub-skill #1 del pipeline `willy-design`. Convierte un brief difuso en 6 respuestas concretas.

## Por qué existe

La causa #1 de "generic AI design" es que el agente arranca a escribir sin tener claridad sobre 6 cosas básicas. Este skill las saca en una conversación corta y determinística.

**Si Willy ya proporcionó las 6 respuestas en el primer mensaje → este skill se salta.**

## Las 6 preguntas

### P1. Rubro

> "¿Qué tipo de negocio es?"

Opciones cerradas (escoge la más cercana):
- `salud` — clínica, dentista, fisioterapeuta, ginecólogo, óptica
- `inmobiliaria` — corredor, desarrolladora, alquiler vacacional Cap Cana
- `restaurante` — comida criolla, fonda gourmet, dark kitchen, cafetería
- `suplementos` — productos health, e-commerce de suplementos
- `servicios-tecnicos` — taller mecánico, electricista, plomero, AC
- `legal-financiero` — abogado, notario, cooperativa, seguros
- `belleza-fitness` — salón, spa, gimnasio, entrenador personal
- `educacion` — academia, instituto, tutor, capacitación
- `eventos` — wedding planner, decorador, fotógrafo
- `otro` → pide especificar

### P2. Audiencia

> "¿A quién le vendes principalmente?"

- `local-rd` — clientes en RD (Santo Domingo / Santiago / interior)
- `diaspora-us` — dominicanos en USA (NYC, Boston, Miami)
- `mixto` — locales + diáspora
- `latam` — más allá de RD
- `internacional` — turistas, expats

Sub-pregunta si `local-rd`: **¿Capital, interior, o nacional?**

### P3. Ticket promedio

> "¿Cuánto cobra el cliente típicamente por venta?"

- `< RD$2K` — productos de bajo precio, alta rotación
- `RD$2K-10K` — servicios profesionales mid-tier
- `RD$10K-50K` — servicios premium o productos high-ticket
- `USD$200-1K` — servicios profesionales internacionales
- `USD$1K+` — premium real estate, consultoría B2B

### P4. Tono

> "¿Cómo quieres que suene el sitio?"

- `profesional` — formal, conservador (abogados, doctores, B2B)
- `cercano` — cálido, accesible, tutea (servicios al hogar, salud familiar)
- `aspiracional` — premium, status (luxury real estate, cosmética, fitness)
- `urgente` — pressure-driven, oferta limitada (suplementos, oferta lanzamiento)
- `comunidad` — religioso, ONG, iglesia (warm + serif + colores tierra)

### P5. Hero hook

> "¿Cómo abrimos? ¿Cuál es el ángulo del headline?"

- `urgencia` — "Solo 5 cupos esta semana"
- `autoridad` — "20 años atendiendo familias dominicanas"
- `social-proof` — "+2,500 clientes en RD"
- `antes-despues` — "Pasa de [pain] a [resultado]"
- `pregunta-dolor` — "¿Cansado de [problema]?"
- `garantia` — "Si no funciona, te devolvemos el dinero"
- `precio-irresistible` — "Tu web profesional por solo US$200"

### P6. Método de pago

> "¿Cómo cobra el cliente?"

- `polar-usd` — Polar checkout (USD, internacional, tarjeta crédito/débito)
- `polar-split` — Polar con 2 pagos (50% inicio + 50% entrega)
- `azul-dop` — Azul.do en pesos dominicanos
- `stripe` — Stripe internacional
- `transferencia` — solo transferencia bancaria local
- `whatsapp-only` — sin checkout, todo cierre por WhatsApp
- `contra-entrega` — pago al recibir (productos físicos)

## Output

Después de las 6 respuestas, escribe `brief-grill.md` en el workspace del cliente:

```markdown
# wd-grill output — [cliente]

> Generado: [YYYY-MM-DD HH:MM]

| # | Pregunta | Respuesta |
|---|---|---|
| 1 | Rubro | [valor] |
| 2 | Audiencia | [valor + sub-pregunta si aplica] |
| 3 | Ticket | [valor] |
| 4 | Tono | [valor] |
| 5 | Hero hook | [valor] |
| 6 | Pago | [valor] |

## Familia DESIGN.md sugerida

→ `[familia.md]` (basada en P1)

## Bloques drop-in que necesitas

- WhatsApp CTA: SÍ (todos)
- Polar checkout: [SÍ/NO según P6]
- DOP/USD toggle: [SÍ si P3 incluye RD$/USD]
- Google Maps RD: [SÍ si P1 es física: restaurante, salud, taller]
- Telegram notify: [SÍ si P6 es polar-*]

## Próximo paso

→ `wd-brief` con este archivo como input
```

## Cómo conducir la conversación

1. **No preguntes las 6 a la vez** — abruma. Pregunta en bloques de 2-3.
2. **Si el usuario duda, ofrece tu opinión** — "Para [contexto], yo iría con `aspiracional`. ¿Va?"
3. **Si Willy ya respondió implícitamente, no preguntes** — extrae de contexto.
4. **Si el usuario dice "tú decides", úsalo como green-light para llenar tú las que sean obvias** y solo pregunta las críticas.
5. **Validación cruzada al final** — antes de escribir el archivo, recap rápido: "OK, voy a buildear: [resumen 1 línea]. ¿Confirmamos?"

## Anti-patrones

❌ Hacer una entrevista de 30 preguntas — son SOLO 6
❌ Preguntar tecnicismos al cliente final — el cliente NO sabe qué es "stack" o "subdominio"
❌ Preguntar antes de leer el contexto — si las respuestas están ya en la conversación, NO preguntes

## Ejemplo de uso

```
Usuario: "Hazme una landing para Restaurante La Piña Loca"

Claude: [activa wd-grill]
"Tengo el cliente. 6 cosas rápidas para no escribir genérico:

1. RUBRO — restaurante, ya está. ✓
2. AUDIENCIA — ¿clientes locales en Santo Domingo, o turistas/diáspora también?
3. TICKET — ¿plato promedio? RD$500-1000? RD$1500+?

(Cuando me digas estas 2, te tiro las 3 últimas)"

Usuario: "Locales SD. Ticket 1200 promedio."

Claude:
"4. TONO — ¿formal/profesional, o cercano (tutea, criollo)?
5. HERO HOOK — ¿abrimos con autoridad ('15 años en SD'), social proof, o el plato estrella?
6. PAGO — ¿Polar internacional, transferencia local, o solo WhatsApp para reservar?"

Usuario: "cercano. autoridad. WhatsApp."

Claude: [escribe brief-grill.md]
"Listo. Brief locked:
- Rubro: restaurante · audiencia local SD · ticket RD$1200 · tono cercano · hook autoridad · cierre WhatsApp.
- Familia DESIGN.md: restaurante-rd
- Próximo paso: wd-brief para sacar el avatar del cliente final, dolores y promesa.

¿Sigo?"
```

## Relación con otras skills

- **Anterior**: `/research` o `/client-brief` (si existe). Si Willy hizo /research del cliente, los datos están en `clientes/[slug]/research.md`.
- **Siguiente**: `wd-brief` — toma este output como input.
- **Sin esto**: ningún sub-skill posterior arranca. Es gate obligatorio.
