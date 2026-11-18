# Estudio SAP-C02 — AWS Certified Solutions Architect Professional

> **Nota sobre el nombre de la carpeta:** el nombre `Estudio-SAP-C02` hace referencia al
> **código de examen SAP-C02 de AWS**, no al examen de SAP S/4HANA. Todo el contenido de
> esta carpeta es sobre AWS.

---

## ¿Qué es esto?

Este repositorio es un **espacio de estudio personal para el examen de certificación
AWS Certified Solutions Architect – Professional (SAP-C02)**.

Su finalidad es estudiar **de forma completa y sistemática todos los temas que aparecen en la
guía de examen oficial de AWS**, organizada como una **bóveda de Obsidian** para poder
estudiar con enlaces entre notas, mapas mentales y seguimiento de progreso.

No es un curso ni una guía de estudio con contenido original: es un **espacio de trabajo
para romper la guía oficial en temas, estudiar cada uno y anotar lo aprendido**.

---

## Estructura

```
Estudio-SAP-C02/
├── README.md                  ← Este archivo (punto de entrada)
└── Estudio-Obsidian/          ← La bóveda de Obsidian
    ├── Guia AWS.md            ← Guía de examen oficial SAP-C02 (traducida y maquetada en MD)
    ├── informacion base/      ← Material de referencia transversal
    │   └── Definicion servicios.md
    │                          ← Los ~150 servicios del alcance, con su distinción clave
    └── .obsidian/             ← Configuración de la bóveda
```

Para estudiar hay que abrir la carpeta `Estudio-Obsidian` como bóveda en
[Obsidian](https://obsidian.md). Las notas que se creen ahí son notas de estudio
propias y quedan enlazadas entre sí con `[[nombre de la nota]]`.

### Qué hay en `informacion base`

`Definicion servicios.md` es el catálogo de los servicios AWS dentro del alcance del
examen, agrupados en las 19 categorías de la guía oficial. Cada servicio tiene una
definición de una línea y, sobre todo, una **columna de distinción clave** frente a
los servicios parecidos: es exactamente el tipo de pregunta que hace el examen
(*"estos dos servicios se parecen en X, ¿cuál elijo?"*).

---

## Contenido de estudio: los 4 dominios del examen

El examen SAP-C02 evalúa el diseño de soluciones de AWS optimizadas basadas en el
**Marco de AWS Well-Architected**. Se divide en 4 dominios de contenido:

| Dominio | Descripción | Peso |
|---|---|---|
| **1** | Diseño de soluciones para la complejidad organizacional | **26 %** |
| **2** | Diseño para nuevas soluciones | **29 %** |
| **3** | Mejora continua para las soluciones existentes | **25 %** |
| **4** | Aceleración de la migración y la modernización de las cargas de trabajo | **20 %** |

### Dominio 1 — Diseño para la complejidad organizacional (26 %)
- 1.1 Diseñar estrategias de conectividad de redes
- 1.2 Prescribir controles de seguridad
- 1.3 Diseñar arquitecturas fiables y resistentes
- 1.4 Diseñar un entorno de AWS de varias cuentas
- 1.5 Determinar las estrategias de optimización de costos y visibilidad

### Dominio 2 — Diseño para nuevas soluciones (29 %)
- 2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales
- 2.2 Diseñar una solución para garantizar la continuidad de actividades
- 2.3 Determinar los controles de seguridad en función de los requisitos
- 2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad
- 2.5 Diseñar una solución para cumplir con los objetivos de rendimiento
- 2.6 Determinar una estrategia de optimización de costos para cumplir las metas

### Dominio 3 — Mejora continua de soluciones existentes (25 %)
- 3.1 Estrategia para mejorar la excelencia operativa general
- 3.2 Estrategia para mejorar la seguridad
- 3.3 Estrategia para mejorar el rendimiento
- 3.4 Estrategia para mejorar la fiabilidad
- 3.5 Identificar oportunidades de optimización de costos

### Dominio 4 — Migración y modernización de cargas de trabajo (20 %)
- 4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración
- 4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes
- 4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes
- 4.4 Determinar oportunidades de modernización y mejoras

### Temas complementarios que también cubre la guía
- **Temas emergentes**, incluido el diseño de controles de seguridad y de **IA responsable**
- **Referencias de servicios** AWS agrupadas por categoría: análisis, integración de
  aplicaciones, blockchain, aplicaciones empresariales, administración financiera,
  computación, contenedores, bases de datos, herramientas para desarrolladores,
  computación para usuarios finales, frontend web y móvil, IoT, machine learning,
  servicios multimedia, administración y gobernanza, migración y transferencia,
  redes y entrega de contenido, seguridad e identidad, almacenamiento
- **Servicios de AWS fuera del alcance** del examen (tecnologías de juegos, etc.)
- **Tecnologías y conceptos** transversalmente evaluados

---

## Datos del examen

| Aspecto | Detalle |
|---|---|
| Código | **SAP-C02** |
| Nombre | AWS Certified Solutions Architect – Professional |
| Preguntas con puntaje | **65** |
| Preguntas sin puntaje | **10** |
| Escala de puntaje | 100 a 1000 |
| Puntaje mínimo para aprobar | **750** |
| Modelo de calificación | **Compensatorio**: no hay que aprobar cada dominio, solo el examen general |
| Tipos de pregunta | Opción múltiple (1 correcta de 4) y respuesta múltiple (2+ correctas de 5+) |
| Penalización por adivinar | **Ninguna**; las preguntas sin responder se cuentan como incorrectas |
| Experiencia requerida | 2+ años diseñando e implementando soluciones en AWS |
| Fuera de alcance | Frontend móvil, metodología de 12 factores, conocimiento profundo de SO |

> [!note] Duración del examen
> La guía oficial incluida en `Estudio-Obsidian/Guia AWS.md` **no indica la duración**, así
> que no se documenta aquí. Confirmarlo en la página oficial del examen antes del día de la
> prueba.

---

## Cómo estudiar con este repositorio

1. **Abrir la bóveda**
   Instalar Obsidian → *Abrir bóveda como repositorio* → seleccionar `Estudio-Obsidian`.

2. **Leer la fuente**
   `Guia AWS.md` es el documento normativo. Todo lo que se estudia debe poder
   rastrearse hasta un dominio, una tarea o un servicio listado ahí.

3. **Usar `informacion base` como referencia**
   [[Definicion servicios]] ya está hecho: los ~150 servicios del alcance, con la
   distinción clave frente a los parecidos. No hay que reescribirlo por tarea; cada
   nota de dominio enlaza a la sección que corresponda.

4. **Crear una nota por tarea**
   Una nota por cada tarea (1.1 … 4.4), con enlaces `[[Dominio 1 - Red]]` entre ellas.
   En cada nota: lo que se sabe, los servicios AWS involucrados (enlazando a
   `[[Definicion servicios]]`), y las decisiones de diseño (*trade-offs*) que el examen
   suele preguntar.

5. **Usar el grafo de Obsidian**
   Los enlaces `[[...]]` conectan servicios, dominios y tareas. El *Graph View*
   muestra huecos temáticos: un nodo aislado suele ser un tema sin estudiar.

6. **Consolidar al final**
   Los temas emergentes (IA responsable), las referencias de servicios y la
   lista de servicios fuera de alcance conviene tenerlas como notas propias
   enlazadas a los dominios donde aparecen.

7. **Repasar con preguntas**
   El examen evalúa *razonamiento de diseño* más que memorización de la guía:
   la pregunta presenta un escenario y hay que elegir la opción que mejor
   optimiza contra el Well-Architected Framework.

---

## Convenciones sugeridas para las notas

- **Prefijos numéricos** para controlar el orden de estudio: `01-`, `02-`, …
- **Etiquetas** por tipo: `#tarea`, `#servicio`, `#concepto`, `#examen`
- **Etiquetas** por dominio: `#d1`, `#d2`, `#d3`, `#d4`
- **Estado**: `#pendiente` / `#en-estudio` / `#revisado`
- Citas a la guía con número de línea o con el nombre de la tarea, para poder
  volver al texto original.

---

## Fuente

- Guía oficial: *AWS Certified Solutions Architect – Professional Exam Guide (SAP-C02)*
  — Copyright © 2026 Amazon Web Services, Inc. and/or its affiliates.
  Traducción al español incluida en `Estudio-Obsidian/Guia AWS.md`.
- Marco de referencia: [AWS Well-Architected Framework](https://aws.amazon.com/architecture/well-architected/).

---

## Aviso

Material de estudio personal con fines educativos. La guía de examen es propiedad de
Amazon Web Services. No hay relación ni afiliación con AWS ni con SAP.