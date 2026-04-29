# Rubric · Design Review 7×25

> Sistema de evaluación objetivo del sub-skill `wd-review`. Reemplaza las "5 dimensiones subjetivas" de huashu-design con 7 dimensiones × 25 sub-criterios verificables.

## Cómo se calcula

Cada sub-criterio es **PASS / FAIL / N/A** (binario). Score por dimensión = % de PASS sobre criterios aplicables × 10. Score total = promedio ponderado de las 7 dimensiones.

| Dim | Peso | Tema |
|---|---|---|
| D1 | 18% | Jerarquía visual |
| D2 | 15% | Contraste y legibilidad |
| D3 | 12% | Tipografía |
| D4 | 12% | Espaciado |
| D5 | 18% | Mobile-first |
| D6 | 10% | Brand cohesion |
| D7 | 15% | Conversión |

**Threshold de deploy: ≥8.0/10** — sino itera.

---

## D1. Jerarquía visual (18%)

1. [ ] H1 visible above-the-fold sin scroll en 1440px
2. [ ] Solo 1 H1 por página
3. [ ] Escala tipográfica claramente diferenciada (h1 ≥1.5× h2 ≥1.4× h3)
4. [ ] CTA primary destaca sobre secundario (color + tamaño + posición)
5. [ ] Cada sección tiene 1 elemento dominante (no 2+ peleando)

## D2. Contraste y legibilidad (15%)

6. [ ] Body text contraste ≥7:1 (AAA) sobre background
7. [ ] CTAs primary fg/bg contraste ≥4.5:1 (AA)
8. [ ] Texto sobre imágenes con scrim/overlay suficiente
9. [ ] Tamaño body ≥16px (computed)

## D3. Tipografía (12%)

10. [ ] Máximo 2 familias de fuente cargadas
11. [ ] Line-height razonable: 1.05-1.4 display · 1.5-1.7 body
12. [ ] Tracking ajustado en headings grandes (-0.02em)
13. [ ] Line-length 50-75 caracteres en párrafos largos

## D4. Espaciado (12%)

14. [ ] Padding/gap usa tokens (--space-*) consistentemente
15. [ ] Ritmo vertical entre secciones consistente
16. [ ] Cards con padding similar (no algunas apretadas, otras sueltas)

## D5. Mobile-first (18%)

17. [ ] Hero legible sin zoom en 375px
18. [ ] Touch targets mínimo 44×44px (Apple HIG) — preferible 48px
19. [ ] No horizontal scroll en 320px
20. [ ] Sticky CTA mobile presente
21. [ ] Imágenes con `srcset` responsive

## D6. Brand cohesion (10%)

22. [ ] Paleta consistente con familia DESIGN.md elegida
23. [ ] Microcopy en español RD natural (no traducción literal)

## D7. Conversión (15%)

24. [ ] CTA primario above-the-fold + visible en cada viewport
25. [ ] Compliance footer (privacidad + términos) presente

---

## Notas de aplicación

- **N/A**: si un criterio NO aplica (ej: criterio 18 "touch targets" si solo hay vista desktop), no cuenta para el score.
- **PASS heurístico vs medido**: D2 (contraste) DEBE ser medido con tool real (browser DevTools o axe-core). NO heurístico.
- **Iteración auto**: el skill `wd-review` debe identificar QUÉ criterios fallan y aplicar fix mínimo (ver SKILL.md).

## Comparación con otras frameworks

| Framework | Dimensiones | Sub-criterios | Notas |
|---|---|---|---|
| huashu 5-D | 5 | ~25 | Subjetivo, sin medición |
| **willy-design 7×25** | 7 | 25 | Binario, medible |
| UICrit (arxiv 2407.08850) | 8 | ~40 | Más completo, más overhead |
| WCAG 2.1 AA | (no diseño) | ~50 | Accesibilidad solo |
| Anthropic Skills 2.0 evals | 5+ | dinámico | LLM-as-judge |

Nuestro 7×25 es el sweet spot: cubre lo crítico, es ejecutable en 2 minutos por sitio, accionable.

## Output JSON estructurado

```json
{
  "score": 8.4,
  "dimensions": {
    "D1": { "name": "Jerarquía", "score": 9, "passed": 4, "total": 5, "weight": 0.18 },
    "D2": { "name": "Contraste", "score": 7, "passed": 3, "total": 4, "weight": 0.15, "issues": ["body 5.8:1 sobre cream — falló 7:1"] },
    "D3": { "name": "Tipografía", "score": 10, "passed": 4, "total": 4, "weight": 0.12 },
    "D4": { "name": "Espaciado", "score": 9, "passed": 3, "total": 3, "weight": 0.12 },
    "D5": { "name": "Mobile", "score": 8, "passed": 4, "total": 5, "weight": 0.18 },
    "D6": { "name": "Brand", "score": 10, "passed": 2, "total": 2, "weight": 0.10 },
    "D7": { "name": "Conversión", "score": 7, "passed": 1, "total": 2, "weight": 0.15 }
  },
  "ready_to_ship": true,
  "iterations": 2,
  "fixes_applied": [
    "D2: --color-muted #999 → #6b7280 (contraste 7.1:1)",
    "D5: hero CTA mobile 14px → 16px"
  ]
}
```
