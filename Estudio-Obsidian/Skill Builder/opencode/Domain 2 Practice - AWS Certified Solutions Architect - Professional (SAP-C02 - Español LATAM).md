---
title: "Domain 2 Practice: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)"
aliases:
  - "Domain 2 Practice"
  - "Practica D2"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - practica
status: activo
fuente: "Práctica del Dominio 2 de AWS Skill Builder (SAP-C02, español LATAM)"
---

# Domain 2 Practice: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)

> [!abstract] Qué es este archivo
> Banco de **práctica** del Dominio 2. Acá viven los intentos, las preguntas falladas y el motivo del error.
> El contenido **se estudia** en [[Domain 2 Review]]; acá solo se **pone a prueba**.
>
> Regla de oro: **primero se responde, después se abre la respuesta**. Si leés la explicación antes de
> elegir, el intento no cuenta.

> [!warning] Reglas de uso
> 1. **Un intento = una fila** en [[#📊 Registro de intentos]]. Sin fecha y sin puntaje, no sirve de nada.
> 2. **Cada pregunta fallada se carga entera** en su tarea, con el motivo real del error (no "me confundí").
> 3. **Cada pregunta se mapea a una tarea** (2.1 a 2.6). Si no sabés a qué tarea pertenece, es una señal de alarma.
> 4. **Los errores se agrupan por patrón**, no por pregunta: si fallás tres veces lo mismo, el problema es el criterio, no la pregunta.
> 5. **La práctica cierra dudas** del Review, no las abre: si aparece una duda nueva, se registra en [[Domain 2 Review#❓ Dudas abiertas]].
> 6. **La confianza se actualiza** en el Review solo cuando acá demostrás que podés responder.

---

## 📊 Registro de intentos

| # | Fecha | Origen | Preguntas | Aciertos | % | Tareas flojas |
| --- | --- | --- | --- | --- | --- | --- |
| — | *(pendiente primer intento)* | — | — | — | — | — |

---

## ✅ Cobertura por tarea

| Tarea | Preguntas hechas | Aciertos | % | Estado |
| --- | --- | --- | --- | --- |
| 2.1 Estrategia de implementación | 0 | 0 | — | ⬜ |
| 2.2 Continuidad de actividades | 0 | 0 | — | ⬜ |
| 2.3 Controles de seguridad | 0 | 0 | — | ⬜ |
| 2.4 Fiabilidad | 0 | 0 | — | ⬜ |
| 2.5 Rendimiento | 0 | 0 | — | ⬜ |
| 2.6 Optimización de costos | 0 | 0 | — | ⬜ |

Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.

---

## 📘 Explicaciones oficiales vistas

> Preguntas que el curso explica paso a paso. **No son intentos**: no entran al registro ni al porcentaje,
> pero sí marcan qué servicios hay que dominar.

| # | Tarea | Pregunta | Servicios que refuerza | Estado |
| --- | --- | --- | --- | --- |
| P01 | 2.1 | Beta parcial con CloudFront, solo sesiones nuevas | **Lambda@Edge**, CloudFront, Route 53 (ponderado, descartado) | 🟡 vista |
| P02 | 2.2 | Replicar datos existentes y nuevos a otra región | **S3 Batch Replication**, S3 Replication, Inventory, Batch Operations, Athena (descartado) | 🟡 vista |
| P03 | 2.5 | Latencia mínima global con CloudFront (Elija DOS) | **TTL alto**, **orígenes cercanos + Route 53 por latencia**, Price Class (descartado) | 🟡 vista |

---

## 🧩 Patrones de pregunta detectados

> No son errores: son **formas de preguntar** que se repiten. Detectarlas ahorra tiempo y evita caer en el
> distractor "de manual".

| Patrón | Cómo se detecta | Cómo se responde | Visto en |
| --- | --- | --- | --- |
| **Dos mitades en un mismo enunciado** | "datos existentes **y** nuevos", "sesiones nuevas **y** en curso", "Elija DOS" | Buscar la opción que cubra **cada** mitad; el distractor fuerte cubre **solo una** | P01 · P02 · P03 |
| **"Menor esfuerzo operativo" / "mayor eficiencia"** | Adjetivo comparativo al final del enunciado | Descartar lo que exige **limpieza o pasos manuales** después (borrar una distribución, reconfigurar pesos, repetir lotes) | P01 · P02 |
| **Servicio "de manual" que no cumple el matiz** | La opción suena a la respuesta obvia del tema | Preguntarse **qué no hace** ese servicio: replicación S3 no copia el histórico; Route 53 ponderado no distingue sesiones | P01 · P02 |
| **Optimizar el camino rápido y olvidar el lento** | El escenario ya trae la tecnología (CloudFront) y pregunta por latencia | Resolver **hits y misses**: TTL alto para acertar más, orígenes cercanos para el fallo | P03 |

---

## ❓ Preguntas

### 2.1 — Estrategia de implementación

#### P01 — Tarea 2.1 · Beta con CloudFront y Lambda@Edge

> **Enunciado:** sitio web detrás de una distribución de **CloudFront** con **dos servidores de origen**. Se implementó una **versión beta** en uno de los orígenes. Se quiere dirigir **automáticamente un pequeño porcentaje de sesiones nuevas** a la versión nueva, **sin** mandar a la nueva a los clientes que ya están operando en la versión original, que deben poder **terminar sus operaciones**. **Menor esfuerzo operativo**.
>
> **A:** función **Lambda@Edge** que inspecciona **cookies** para saber si la sesión es nueva; para sesiones nuevas reescribe la URL para un pequeño porcentaje; para sesiones en curso, fija el origen según la cookie.
> **B:** actualizar la página de inicio para que el cliente **elija** la versión.
> **C:** segunda distribución de CloudFront para el origen beta + **política de enrutamiento ponderado de Route 53** entre las dos distribuciones.
> **D:** dos funciones Lambda@Edge y código en el sitio web para **llamarlas**.

- **Correcta:** **A**
- **Por qué gana:** Lambda@Edge corre **en el borde** y puede decidir **por sesión**, no por porcentaje ciego: distingue sesión nueva de sesión en curso leyendo la cookie, manda un % pequeño de las nuevas al origen beta y **deja intactas** las existentes. Es automático y no requiere desmontar nada después.
- **Por qué fallan las otras:**
  - **B** — la elección es del usuario → **no es automático**.
  - **C** — el ponderado de Route 53 **no distingue sesiones nuevas de existentes**; además al terminar la beta hay que **eliminar la distribución y reconfigurar los pesos** → **más esfuerzo operativo**.
  - **D** — **el sitio web no puede invocar Lambda@Edge**: esas funciones se disparan por eventos de CloudFront, no desde el navegador.
- **Requisitos que había que tachar:** automático · pequeño porcentaje · **solo sesiones nuevas** · sesiones en curso terminan en el origen original · menor esfuerzo operativo.
- **Trampa:** creer que "repartir tráfico" = Route 53 ponderado. Acá el requisito es **conciencia de sesión**, y eso se resuelve en el borde.
- **Se refuerza en:** [[Domain 2 Review#S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa]]

<details><summary>Respuesta y explicación completas</summary>

La pregunta se resuelve en tres pasos: (1) la beta vive en **un solo origen** detrás de CloudFront; (2) hay que separar **sesión nueva** de **sesión en curso**; (3) el criterio de desempate es **menor esfuerzo operativo**.

**A** es la única que cumple las tres. Lambda@Edge permite ejecutar código en la ubicación perimetral de CloudFront: se inspecciona la cookie, se detecta la sesión nueva, se reescribe la URL para un porcentaje pequeño y, para las sesiones ya iniciadas, se fija el origen según el valor de la cookie. Nada se interrumpe.

**C** es la distractor más fuerte porque suena a "canary release": sí manda una porción del tráfico al origen beta y es automático, pero **no tiene forma de saber si la sesión es nueva** y agrega trabajo de limpieza posterior.

</details>

### 2.2 — Continuidad de actividades

#### P02 — Tarea 2.2 · Replicar datos existentes y nuevos entre regiones

> **Enunciado:** una empresa tiene una gran cantidad de datos en un bucket de **S3** y una auditoría exige **replicar todos los datos existentes y los nuevos** hacia un segundo bucket **en otra región**. ¿Qué solución cumple con **la mayor eficiencia operativa**?
>
> **A:** **S3 Inventory** frecuente + **S3 Batch Operations** para replicar los objetos al segundo bucket.
> **B:** configurar **S3 Replication** del bucket original al segundo, usando **Replication Time Control**.
> **C:** **Amazon Athena** para inventariar los objetos + **Batch Operations** para replicarlos.
> **D:** **S3 Batch Replication** para los objetos **existentes** y, al terminar, configurar **replicación** para los objetos **nuevos**.

- **Correcta:** **D**
- **Por qué gana:** cubre las **dos mitades** del requisito. **Batch Replication** copia lo que ya estaba; la **replicación de S3** copia lo que se agregue después. Al ser automatizado, es lo más **eficiente en términos operativos**.
- **Por qué fallan las otras:**
  - **A** — Inventory + Batch Operations funciona, pero **ejecutarlo varias veces vuelve a replicar objetos ya replicados** → ineficiente operativamente.
  - **B** — la replicación de S3 **solo copia objetos nuevos**; **no replica los existentes** que ya estaban en el bucket, y **Replication Time Control no cambia ese comportamiento**.
  - **C** — **Athena consulta datos almacenados en S3, pero no puede generar una lista de objetos de un bucket**; sin inventario, Batch Operations no tiene qué copiar.
- **Requisitos que había que tachar:** datos **existentes** + datos **nuevos** · otra región · **mayor eficiencia operativa**.
- **Trampa:** creer que "configurar replicación" alcanza. La replicación de S3 **arranca desde el momento en que se habilita**: lo previo queda afuera.
- **Se refuerza en:** [[Domain 2 Review#S03 — Tarea 2.2: solución para garantizar la continuidad de actividades]]

<details><summary>Respuesta y explicación completas</summary>

El enunciado tiene dos requisitos que se resuelven con **dos mecanismos distintos**, y ahí está toda la pregunta:

1. **Datos existentes** → **S3 Batch Replication**, que copia objetos que ya están en el bucket (y sirve también para reintentar objetos que fallaron).
2. **Datos nuevos** → **replicación de S3** configurada en el bucket.

**B** es el distractor natural porque suena a "lo correcto de manual", pero deja los datos históricos sin replicar. **A** y **C** fallan en el inventario: Inventory sirve para listar, pero repetir el proceso duplica trabajo; Athena no puede listar objetos de un bucket.

</details>

### 2.3 — Controles de seguridad

*(sin preguntas cargadas)*

### 2.4 — Fiabilidad

*(sin preguntas cargadas)*

### 2.5 — Rendimiento

#### P03 — Tarea 2.5 · Latencia mínima global con CloudFront (Elija DOS)

> **Enunciado:** sitio web de **fotografía** con **visitantes mundiales**, tráfico creciendo 12 meses y **demoras al visualizar las imágenes**. Se quiere configurar **CloudFront** para distribuir las fotos con **latencia mínima**. ¿Qué **dos** acciones lo logran?
>
> **A:** TTL mínimo y máximo en **cero**.
> **B:** TTL mínimo y máximo en un **valor alto**.
> **C:** reenviar **todos los encabezados, cookies y cadenas de consulta** al origen.
> **D:** **servidores de origen adicionales** geográficamente más cerca + **enrutamiento por latencia en Route 53**.
> **E:** **Price Class 100** en la distribución.

- **Correctas:** **B y D**
- **Por qué ganan:**
  - **B** — más TTL = **más tiempo en caché** = más *cache hits*, entregas más cortas y menos carga en el origen.
  - **D** — CloudFront sirve los *hits* desde la ubicación perimetral más cercana; en los **fallos de caché** la solicitud va al origen, y ahí **Route 53 por latencia** elige el origen con mejor tiempo de respuesta. Orígenes más cercanos al solicitante también reducen el tiempo de respuesta.
- **Por qué fallan las otras:**
  - **A** — **TTL cero impide cachear**: cada solicitud se vuelve una recuperación de origen y **aumenta** el tiempo de entrega.
  - **C** — reenviar todo **evita el caché** y no mejora la latencia.
  - **E** — **Price Class 100 no incluye ubicaciones perimetrales con cobertura global**, y el sitio tiene visitantes globales.
- **Requisitos que había que tachar:** visitantes **globales** · latencia **mínima** · usar **CloudFront** · **dos** acciones.
- **Trampa:** pensar solo en los *cache hits*. Los **fallos de caché** también cuentan: por eso una de las dos respuestas es sobre **orígenes + Route 53**, no sobre CloudFront.
- **Se refuerza en:** [[Domain 2 Review#S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento]]

> [!note] Nota de transcripción
> El video anuncia "**seis opciones**" y describe **cinco (A–E)**. Falta una en el audio; no la invento.
> Las correctas confirmadas son **B y D**.

<details><summary>Respuesta y explicación completas</summary>

La latencia puede venir de varias causas: distancia entre el contenido y el usuario, alojamiento mal dimensionado, ancho de banda insuficiente o imágenes sin optimizar. El enunciado ya acota el camino: **CloudFront** y **visitantes globales**.

Con CloudFront, el rendimiento se juega en dos frentes:

1. **Acertar más en caché** → TTL alto (**B**). TTL cero convierte cada visita en una ida al origen.
2. **Hacer más rápido el fallo de caché** → orígenes geográficamente cercanos + **Route 53 con enrutamiento por latencia** (**D**).

**E** es el distractor de costo: bajar la clase de precio reduce ubicaciones perimetrales, justo lo contrario de lo que necesita una audiencia mundial.

</details>

### 2.6 — Optimización de costos

*(sin preguntas cargadas)*

---

## 🧨 Patrones de error

> Se completa cuando hay al menos dos fallos con la misma causa. La corrección se enlaza al punto del
> Review que la resuelve; si no existe, se agrega allí primero.

| Patrón | Causa real | Corrección (dónde se arregla) | Veces |
| --- | --- | --- | --- |
| *(vacío)* | — | — | — |

---

## 🔓 Dudas que la práctica debe cerrar

| # | Duda (en el Review) | Qué la cerraría | Estado |
| --- | --- | --- | --- |
| 1 | Caso Redshift: snapshots entre regiones vs replicación (RPO 24 h / RTO 1 h) | Una pregunta de 2.2 o la explicación oficial | ⏳ |
| 2 | Qué capa OSI aporta cada servicio de seguridad | Pregunta de 2.3 | ⏳ |
| 3 | Motores de BD que admiten cada tipo Multi-AZ | Pregunta de 2.4 | ⏳ |
| 4 | Familias de instancias EC2 y sus casos de uso | Pregunta de 2.5 | ⏳ |
| 5 | Clases de almacenamiento S3 y elección por acceso | Pregunta de 2.6 | ⏳ |

---

## 🕒 Registro de cambios

| Fecha | Cambio |
| --- | --- |
| 2026-10-21 | Creación del banco de práctica del Dominio 2 (registro de intentos, cobertura por tarea, patrones de error y plantilla). |
| 2026-10-21 | **P01** cargada (2.1): beta parcial por sesión con Lambda@Edge; se agrega el bloque de explicaciones oficiales. |
| 2026-10-21 | **P02** cargada (2.2): replicación de datos existentes + nuevos con S3 Batch Replication + S3 Replication. |
| 2026-10-21 | **P03** cargada (2.5): latencia mínima global con CloudFront (TTL alto + orígenes cercanos con Route 53 por latencia). Se anota que la transcripción anuncia seis opciones y describe cinco. |
| 2026-10-21 | Se agrega la sección **Patrones de pregunta detectados** con 4 patrones recurrentes (dos mitades, menor esfuerzo operativo, servicio "de manual", hits y misses). |

---

## 📋 Plantilla de pregunta (no borrar)

> Se copia dentro de la tarea correspondiente. La respuesta va plegada para poder reintentar sin spoiler.

```markdown
### P01 — Tarea 2.x · Tema corto

> **Enunciado:** …
>
> **A:** … · **B:** … · **C:** … · **D:** …

- **Mi respuesta:** _ · **Correcta:** _ · **Resultado:** ✅ / ❌
- **Por qué la correcta gana:** …
- **Por qué fallan las otras:** A … / B … / C …
- **Servicio o trampa que me faltaba:** …
- **Se corrige en:** [[Domain 2 Review#Sxx — …]]

<details><summary>Respuesta y explicación</summary>

… 

</details>
```

---

## 🔗 Navegación

- Contenido teórico del dominio → [[Domain 2 Review]]
- Guía oficial y pesos → [[Guia AWS]]
- Catálogo de servicios → [[Definicion servicios]]
- Banco general de preguntas → [[preguntas-v1-manual]]
