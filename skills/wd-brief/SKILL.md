---
name: wd-brief
description: Convierte el output de wd-grill en un brief comercial completo (avatar de cliente final, dolores, promesa, prueba, oferta exacta, prohibido decir). Sub-skill #2 del pipeline willy-design. Activa cuando ya tienes brief-grill.md de wd-grill listo y necesitas profundizar antes de generar IA / tokens / código. NO uses este skill para clientes B2B internacionales o productos SaaS — usa product-marketing-context para esos casos. Usa este skill solo para landings comerciales de servicios/productos en mercado RD/LATAM.
---

# wd-brief — Brief comercial completo

> Sub-skill #2 del pipeline `willy-design`. Eleva el output de wd-grill a un brief de venta accionable.

## Inputs

- `brief-grill.md` (output de wd-grill, requerido)
- Si existe: `research.md` del cliente (output de `/research` previo)
- Si existe: research firecrawl del sitio actual del cliente

## Lo que produce

Archivo `brief.md` con 6 secciones obligatorias:

### 1. Avatar de cliente final

NO el cliente que paga la web (Willy / la agencia), sino el cliente DEL cliente.

```markdown
## Avatar

- **Nombre típico**: [María, 38 años]
- **Ocupación / Rol**: [empleada bancaria · 2 hijos · vive en San Cristóbal]
- **Ingreso aproximado**: [RD$30K-60K/mes]
- **Hábitos**: [usa WhatsApp todo el día · revisa redes en pausas · busca en Google ocasional]
- **Dispositivo principal**: [iPhone 13 / Samsung A14 — celular medio-alto, datos prepago]
- **Punto de entrada típico**: [link de WhatsApp compartido por amiga, o búsqueda Google "[servicio] cerca de mí"]
- **Decisión de compra**: [emocional + comparativa precio · busca testimonios · consulta con esposo / familia]
```

### 2. Top 3 dolores

Ordenados por intensidad. Cada uno con la frase EXACTA que el avatar diría.

```markdown
## Dolores

### 1. [Dolor primario — 1 línea]
> "Llevo años con [problema] y nadie me ha dado una solución real."

### 2. [Dolor secundario]
> "Me da vergüenza preguntar / no sé por dónde empezar."

### 3. [Dolor de fondo]
> "Cada mes pierdo dinero / clientes / tranquilidad por esto."
```

### 3. Promesa central (1 línea)

UNA sola promesa. Específica, verificable, sin exagerar.

```markdown
## Promesa

> [Resultado concreto] en [plazo concreto] desde [precio concreto].

Ejemplos:
- "Tu página web profesional lista en 24 horas por solo US$200"
- "Reduce dolor menstrual y cólicos en 30 días — natural, sin pastillas"
- "Compra tu apartamento en Cap Cana con financiamiento del 80% — lo gestiono en 7 días"
```

### 4. 3 elementos de prueba

Específicos y verificables. NUNCA inventar.

```markdown
## Prueba

1. **[Tipo]**: [evidencia concreta]
   Ejemplos:
   - Testimonio: "Quiero gastar mi vida con la persona que me dió mi confianza" — María Sánchez, Higüey
   - Caso: 200 cooperativistas de COOPNAMA atendidos en 2025
   - Data: 4.8/5 en 87 reseñas Google
   - Autoridad: 15 años de experiencia · Cédula profesional INTEC #1234
   - Físico: foto del local · video testimonial · captura de pantalla

2. ...

3. ...
```

### 5. Oferta exacta

Lista todos los componentes del paquete + condiciones.

```markdown
## Oferta

- **Producto/Servicio principal**: [nombre]
- **Precio total**: [moneda exacta]
- **Pagos**: [estructura — split, contra-entrega, recurring, etc.]
- **Incluye**:
  - Item 1
  - Item 2
  - Item 3
- **NO incluye** (gestión expectativas):
  - Item A
  - Item B
- **Plazos**:
  - Inicio: [trigger]
  - Entrega: [plazo desde el inicio]
  - Garantía: [duración + condiciones]
- **Urgencia / Escasez**:
  - [Cupos limitados, oferta lanzamiento, fecha límite — solo si es REAL]
- **CTA primario**: [texto del botón principal]
- **CTA secundario**: [texto del botón backup]
```

### 6. Prohibido decir

Lista negra de palabras / promesas que NO se usan en este sitio.

```markdown
## Prohibido decir

- ❌ Cura / Garantía absoluta de salud → "alivio", "mejoría", "resultados"
- ❌ Mejor del país / único en RD (sin pruebas) → claims específicos verificables
- ❌ "Empower your business" / "Transform your X" → copy genérico
- ❌ Lorem ipsum / placeholder
- ❌ [Reglas específicas del rubro / cliente]
```

Para suplementos: NUNCA decir "cura" — solo "alivia", "ayuda", "apoya". Para abogados: NUNCA prometer resultados específicos del caso. Para inmobiliaria: declarar "promesa de venta no garantiza".

## Cómo construir el brief

1. **Lee el output de wd-grill** primero.
2. **Lee research.md si existe** (datos del cliente, competencia, mercado).
3. **Pregunta al usuario solo lo que falta** — NO repreguntes lo que ya está en wd-grill.
4. **Para el avatar**, usa research si tienes datos demográficos. Si no, pregunta a Willy: "¿quién es el cliente típico del cliente?".
5. **Para los dolores**, si Willy conoce el rubro, pídele "dame las 3 frases exactas que dirían los clientes molestos". Si no, infiere del rubro.
6. **Para la prueba**, exige al menos 1 elemento verificable. Si NADA es verificable, ALERTA: "no podemos lanzar sin algo demostrable — ¿qué tienes?"
7. **Para la oferta**, no inventes precio — viene de wd-grill o el usuario.
8. **Para prohibido decir**, aplica reglas universales + las del rubro.

## Anti-patrones

- ❌ Avatar tipo "Sarah, 25-45, urban professional" — eso es genérico marketing 2010. Avatar dominicano específico.
- ❌ Promesa con "best", "premium", "ultimate" — adjetivos no son promesa. Resultado en plazo es promesa.
- ❌ Prueba inventada — si el cliente no tiene testimonios reales, escribe en el brief "PENDIENTE: Willy debe pedir 3 testimonios al cliente antes del build".
- ❌ Saltarse "prohibido decir" — esta sección es la que protege legalmente al cliente y al copy del cringe.

## Output handoff

Al terminar, recap:

```
✅ Brief listo: [path/brief.md]

Avatar: [1 línea]
Promesa: [1 línea]
Oferta: [1 línea]

Próximo: wd-ia para definir secciones del sitio.
```

## Casos especiales por rubro

- **Salud**: avatar incluye "tipo de seguro médico" si aplica.
- **Inmobiliaria**: avatar incluye "rango presupuesto" + "plazo de búsqueda".
- **Restaurante**: avatar incluye "ocasión típica" (cumpleaños, aniversario, after-work).
- **Cooperativas**: avatar incluye "grado de relación con la cooperativa" (asociado nuevo / activo / pasivo).
- **Suplementos**: avatar incluye "intentos previos fallidos" (qué probó antes).
