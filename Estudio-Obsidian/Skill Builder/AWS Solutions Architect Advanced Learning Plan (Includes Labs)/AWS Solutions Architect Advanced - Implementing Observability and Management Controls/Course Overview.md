---
title: "Course Overview"
aliases:
  - "Descripción del curso"
  - "Resumen del curso"
  - "Course summary"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - observabilidad
  - gestion-de-costos
  - overview
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Course Overview"
---

# Course Overview

> [!abstract] Qué es este archivo
> **Presentación del curso**: qué promete enseñar, con qué servicios, a quién apunta y qué prerequisitos pide.
> No es una lección técnica: es el **contrato** del curso y sirve para mapearlo al examen antes de empezar.

> [!success] Discrepancia resuelta con la lección 01
> El *Course summary* y los *Course Objectives* hablan de **gestión de costos y governance**
> (Organizations, Control Tower, **Cost Explorer**, **Budgets**, **Config**, tags de asignación de costos,
> **CUR**, jerarquías de facturación), no de **observabilidad**.
>
> Al principio quedó marcado como posible overview de otro módulo. La lección [[Governance at Scale]] **confirma**
> que el curso arranca exactamente por ahí: **account management · security and compliance automation · budget and
> cost management**. Así que el overview **sí corresponde a este curso**; la parte de **observabilidad** que
> anuncia el título llegará en lecciones posteriores.
>
> El contenido se transcribió **tal como llegó**, sin adaptarlo, y la nota queda como **válida**.

> [!info] En una frase
> El curso se presenta como una formación de **control financiero y de políticas** sobre AWS multi-cuenta:
> asignar costos, presupuestar, reportar y **hacer cumplir políticas** de forma automatizada.

---

## 1. Qué promete el curso

El resumen define el objetivo así: dar a profesionales de IT y arquitectos de nube los conocimientos y las
**habilidades prácticas** para implementar **estrategias de gestión de costos y governance** en entornos AWS,
diseñando, desplegando y manteniendo **controles financieros y políticas organizacionales** en múltiples cuentas
y entornos.

| Pieza | Qué incluye según el overview |
| --- | --- |
| **Formato** | Instrucción grabada por módulo + contenido **multimedia e interactivo** que la complementa |
| **Evaluación** | **Knowledge Checks** y **evaluaciones cortas** para medir y reforzar el conocimiento |
| **Foco** | Costos + governance: controles financieros y políticas organizacionales |
| **Alcance** | **Múltiples cuentas y entornos** (no una sola cuenta) |
| **Resultado esperado** | Una solución de cost management + governance alineada a los requisitos de la organización, con **control financiero** y **cumplimiento de políticas** |

---

## 2. Los cuatro objetivos declarados

| # | Objetivo | Verbo clave | Qué implica |
| --- | --- | --- | --- |
| **1** | Diseñar e implementar una **estrategia de cost management** con servicios nativos para **optimizar el uso de recursos** y mantener control financiero multi-cuenta | *optimizar* | Uso eficiente + control, no solo “ver la factura” |
| **2** | Desarrollar y desplegar **políticas organizacionales** con herramientas de governance para **hacer cumplir** estándares de compliance y seguridad | *hacer cumplir* | Política **aplicada**, no documentada |
| **3** | Crear y administrar un **marco de facturación multi-cuenta** para **asignar costos**, fijar **presupuestos** y **monitorear el gasto** por departamento o proyecto | *asignar* | Atribución del gasto a un dueño |
| **4** | Diseñar e implementar **arquitecturas optimizadas en costos** en cómputo, almacenamiento, bases de datos y redes, **manteniendo** rendimiento y fiabilidad | *optimizar sin degradar* | El costo no puede romper los requisitos |

> [!important] La tensión que define el curso
> El objetivo 4 dice explícitamente **“while maintaining performance and reliability requirements”**.
> En el examen, una opción “más barata” que degrada rendimiento o fiabilidad **no es una optimización**: es un
> anti-patrón. La optimización de costos siempre se evalúa **contra** un requisito no funcional.

---

## 3. Servicios que el overview nombra

| Servicio | Rol que le asigna el texto |
| --- | --- |
| **AWS Organizations** | Base de la organización multi-cuenta y de las políticas |
| **AWS Control Tower** | Governance y baseline sobre esa organización |
| **AWS Cost Explorer** | Análisis del gasto |
| **AWS Budgets** | Presupuestos y monitoreo |
| **AWS Config** | Evaluación de cumplimiento de la configuración |

**Temas enumerados:** implementar **tags de asignación de costos automatizados**, crear **reportes de costo y uso
personalizados** (custom cost and usage reports), diseñar **jerarquías de facturación** y establecer **controles de
políticas automatizados**.

> [!note] Ampliación (no está en la fuente)
> El overview nombra **5 servicios** y **4 temas**, pero no entra en detalle. Los nombres “custom cost and usage
> reports” y “billing hierarchies” corresponden, en AWS, a **AWS Cost and Usage Report (CUR)** y a la jerarquía
> **management account → member accounts** con **consolidated billing**. Lo dejo anotado como interpretación, no
> como contenido de la fuente.

---

## 4. A quién apunta y qué pide antes

| Campo | Contenido literal |
| --- | --- |
| **Audiencia** | Un **solutions architect** con **2 o más años** en el rol |
| **Prerequisito 1** | Haber tomado (o entender) el **Solutions Architect – Associate learning plan**, o haber aprobado la certificación **Associate** |
| **Prerequisito 2** | Poder **evaluar requisitos** de aplicaciones en la nube y **hacer recomendaciones arquitectónicas** para desplegar en AWS |
| **Prerequisito 3** | **2 o más años** de experiencia **usando servicios AWS** para diseñar e implementar soluciones |

> Nada de esto es un examen de admisión: es una **declaración de nivel**. Si algo del prerequisito no está firme
> (por ejemplo, evaluación de requisitos), conviene reforzarlo con las notas de tarea del dominio.

---

## 5. Traducción del contenido

### Course summary

Este curso incluye instrucción grabada en cada módulo, además de contenido multimedia e interactivo que complementa
las entregas grabadas. Se proporcionan *Knowledge Checks* y evaluaciones cortas para ayudar a evaluar y reforzar el
conocimiento actual y el posterior a la capacitación.

Este curso brinda a los profesionales de IT y a los arquitectos de nube los conocimientos y las habilidades
prácticas necesarios para implementar estrategias efectivas de **gestión de costos y governance** en entornos de
AWS. Aprenderás a diseñar, desplegar y mantener **controles financieros** y **políticas organizacionales** en
múltiples cuentas y entornos de AWS.

A lo largo del curso, explorarás servicios clave de AWS, entre ellos **AWS Organizations**, **AWS Control Tower**,
**AWS Cost Explorer**, **AWS Budgets** y **AWS Config**. Los temas cubiertos incluyen la implementación de **tags
de asignación de costos automatizados**, la creación de **reportes de costos y uso personalizados**, el diseño de
**jerarquías de facturación** y el establecimiento de **controles de políticas automatizados**. Al finalizar el
curso, tendrás el conocimiento para implementar una solución de gestión de costos y governance que se alinee con
los requisitos de la organización, manteniendo el control financiero y el cumplimiento de políticas en toda la
infraestructura de AWS.

### Course details — Course Objectives

En este curso, aprenderás a:

- Diseñar e implementar una estrategia de gestión de costos de AWS usando servicios nativos para optimizar la
  utilización de recursos y mantener el control financiero en múltiples cuentas y entornos.
- Desarrollar y desplegar políticas organizacionales usando las herramientas de governance de AWS para hacer
  cumplir estándares de cumplimiento y seguridad en toda la infraestructura de AWS de la empresa.
- Crear y administrar un marco de facturación multi-cuenta para asignar costos de manera efectiva, establecer
  presupuestos y monitorear el gasto en los distintos departamentos o proyectos dentro de la organización.
- Diseñar e implementar arquitecturas optimizadas en costos en servicios de cómputo, almacenamiento, bases de
  datos y redes, manteniendo los requisitos de rendimiento y fiabilidad.

### Intended Audience

Este curso está destinado a:

- Un *solutions architect* que se encuentre en el rol desde hace **2 o más años**.

### Prerequisites

Recomendamos que los asistentes a este curso tengan los siguientes prerequisitos:

- Haber tomado o entender la información del *learning plan* de **Solutions Architect – Associate**, o haber
  aprobado el examen de certificación **Solutions Architect – Associate**.
- La capacidad de evaluar requisitos de aplicaciones en la nube y hacer recomendaciones arquitectónicas para el
  despliegue de aplicaciones en AWS.
- **2 o más años** de experiencia en el uso de servicios de AWS para diseñar e implementar soluciones en la nube.

---

## 6. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza el overview con [[Guia AWS]]. No está en la fuente.

| Objetivo del curso | Tarea del examen | Dominio |
| --- | --- | --- |
| Estrategia de cost management y **visibilidad** | **1.5** Determinar las estrategias de optimización de costos y visibilidad | D1 (26 %) |
| **Políticas organizacionales** que hacen cumplir estándares | **1.2** Prescribir controles de seguridad · **2.3** Controles según requisitos | D1 / D2 |
| **Marco de facturación multi-cuenta**, presupuestos, atribución | **1.5** + **1.4** (entorno multi-cuenta) | D1 |
| Arquitecturas **optimizadas** sin degradar rendimiento/fiabilidad | **2.6** (costos) · **2.5** (rendimiento) · **2.4** (fiabilidad) · **3.5** (oportunidades) | D2 / D3 |

**Trampas típicas que este overview anticipa:**

1. **“Más barato” no es “optimizado”** si rompe rendimiento o fiabilidad → el objetivo 4 lo dice literal.
2. **Governance ≠ documentación**: el verbo es *enforce*. En el examen, una política que depende de que cada equipo
   la respete es un distractor.
3. **Asignar costos exige tags**, y los tags exigen un mecanismo **automatizado** (el overview habla de *automated*
   cost allocation tags, no de tags puestos a mano).
4. **Multi-cuenta es el supuesto**, no la excepción: presupuestos, reportes y jerarquías se diseñan a nivel
   organización, no cuenta por cuenta.
5. **Ver ≠ controlar**: Cost Explorer y Budgets **informan**; las SCPs y Config **aplican**. Confundir las dos
   capas es el error clásico de las preguntas de costos.

---

## 7. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | **Course Overview** completo (summary, objectives, audience, prerequisites) | Nota completa; alerta de **discrepancia título/contenido** |
| 26/10/2026 | **Lección 01 — Governance at Scale**: el curso arranca por account management, compliance automation y costos | **Discrepancia resuelta**: el overview corresponde a este curso; la observabilidad llega en lecciones posteriores |

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[COMPACT - Estado del estudio]] — método y estado general
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — la tarea que cubren los objetivos 1 y 3
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]] — políticas y enforcement
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — el marco multi-cuenta que el curso da por sentado
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]] · [[3.5 Identificar oportunidades de optimización de costos]]
- [[Guia AWS]] — pesos y tareas oficiales
- [[Definicion servicios]] — definiciones de los servicios nombrados
