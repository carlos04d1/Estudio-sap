---
title: "Estándar de formato — Notas de lección Skill Builder"
aliases:
  - "Estandar de formato"
  - "Formato Skill Builder"
  - "Plantilla de lección"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - formato
  - referencia
status: referencia
fuente: "Decisión de estudio — estandarizar Skill Builder antes de abrir un curso nuevo (27/10/2026)"
---

# Estándar de formato — Notas de lección Skill Builder

> [!abstract] Para qué sirve
> Fija **una sola forma** para todas las notas de lección de Skill Builder.
>
> **Canon:** [[AWS Organizations and IAM Identity Center]] (módulo *Designing a Multi-Account Architecture*).
> Si esta guía y ese archivo difieren, gana el archivo. La plantilla para copiar está en
> `Skill Builder/opencode/` → [[_Plantilla de lección]].

> [!info] Alcance
> Aplica a **lecciones**, **demos** y **activities**. No aplica a los **índices de módulo** (tienen mapa,
> checklist y pendientes propios), a los **Review acumulativos** de dominio ni a los **Knowledge Checks**, que
> son otro género y se normalizan aparte.

---

## Esqueleto canónico

```
frontmatter: title · aliases · tags · status · fuente
# Título
[!abstract] Qué es este archivo
[!quote] La idea que ordena todo            ← opcional, pero casi siempre vale

## Resumen en una frase

## 1. …  ## 2. …  ## 3. …                    ← cuerpo conceptual, numerado
### Subconcepto                             ← SIN número

## N. Último concepto del cuerpo

## N+1. Traducción del contenido              ← siempre acá, nunca antes del examen
[!info] Sección de referencia (opcional)
### N+1.1 Video principal (transcripción)
### N+1.2 Lectura: …
### N+1.3 Demo: …

## N+2. Cierre conceptual                    ← cuadro “quién hace qué”, opcional
## N+3. Para el examen (SAP-C02)
[!important] Lo que hay que retener
[!warning] Trampa clásica del examen

## Relacionado                                ← sin número, sin emoji
```

---

## Reglas

1. **Orden fijo:** cuerpo → **Traducción** → **Cierre conceptual** (si suma) → **Examen** → **Relacionado**.
   La traducción nunca va después del examen.
2. **Se numeran** el cuerpo, la Traducción, el cierre y el examen. `Resumen en una frase` y `Relacionado`
   van **sin número**.
3. **Las subsecciones no se numeran:** `### Qué son`, `### Permisos efectivos = IAM ∩ SCP`. Nada de `### 3.1`.
4. **Examen en dos callouts:** `[!important] Lo que hay que retener` (lista de 10 puntos como máximo) y
   `[!warning] Trampa clásica del examen` (un escenario, no una lista de trampas).
5. **Traducción con su callout de entrada:** `[!info] Sección de referencia (opcional)`, que dice qué se
   estudia y para qué sirve la traducción.
6. **Relacionado** cierra con tres cosas: el vínculo al índice del módulo marcado *(índice del módulo)*, los
   vínculos laterales con su razón, y la línea `Siguiente paso del módulo: **…**`.
7. **`fuente` corta:** módulo y plataforma, sin el título de la lección (ya está en `title`).
8. **Nombres de servicios en inglés**, explicación en español. Cifras, límites y períodos **literales**.
9. **Lo que no está en la fuente** va en `[!note] Ampliación (no está en la fuente)` o
   `[!note] JSON reconstruido`.
10. **Nada se borra.** Lo que se corrige o amplía se anota en el registro de integración de la nota.

---

## Estados (`status`)

| `status` | Cuándo |
| --- | --- |
| `activo` | **Lección** cargada y enlazada. Es el estado normal de una nota de lección |
| `en-curso` | **Índice** de un módulo que todavía no cerró |
| `completo` | **Índice** de un módulo cerrado |
| `completado` | **Activity** o **Knowledge Check** resuelto |
| `vivo` | **Review acumulativo** de dominio |
| `referencia` | Guía, estándar, plantilla o COMPACT |

> [!warning] Vocabulario retirado
> `consolidado` no se usa más: describe un estado que no distingue nada. Las notas que lo tienen pasan a
> `activo` cuando se migren. `completo` queda reservado para índices de módulo.

---

## Excepciones que no rompen el estándar

- **Registro de integración.** Opcional. Si la nota tiene discrepancias que registrar, va como **anexo al
  final, después de `## Relacionado`**, con el título `## Registro de integración` (sin número, sin emoji).
  No interrumpe el camino de estudio: cuerpo → traducción → examen → relacionado.
- **Lecciones sin Knowledge Check.** No se inventa un self-check para “completar” la estructura.
- **Notas que ya tienen tabla de trampas.** La tabla se conserva tal cual dentro del callout
  `[!warning] Trampas típicas`; no se reescribe como escenario único.
- **Notas cortas** (una demo, un overview). Pueden tener menos secciones, pero conservan el orden y los dos
  callouts del examen.
- **Índices de módulo, Review y Knowledge Checks.** No se les aplica este esqueleto.

---

## Checklist por nota

- [ ] `status: activo` (o el que corresponda según la tabla).
- [ ] `fuente` corta: módulo + plataforma.
- [ ] `[!abstract]` y `[!quote]` después del `# Título`.
- [ ] Traducción **antes** del examen, con su callout `[!info]`.
- [ ] Subsecciones `###` **sin** número.
- [ ] Examen con `[!important]` + `[!warning]`; sin `### 10.1/10.2/10.3`.
- [ ] `## Relacionado` sin número, sin emoji, con índice y siguiente paso.
- [ ] Registro, si existe, después de `Relacionado`.
- [ ] Links internos con `#` cuando apuntan a un heading.
- [ ] Diff contra el backup: no se perdió texto.

---

## Qué cambiar en las notas ya escritas

| Deriva actual | Se convierte en |
| --- | --- |
| `## 10. Registro de integración` | Anexo `## Registro de integración` al final |
| `## 🔗 Relacionado` | `## Relacionado` |
| `### 10.1 A qué tareas responde` | Se elimina el rótulo; la tabla queda dentro del examen |
| `### 3.1 …` en el cuerpo | `### …` |
| Examen antes de Traducción | Traducción primero |
| `status: consolidado` | `status: activo` |
