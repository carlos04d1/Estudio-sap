---
title: "Course Overview - Operational Resilience"
aliases:
  - "Course Overview (Operational Resilience)"
  - "Overview del curso de resiliencia operativa"
  - "Resumen del curso de resiliencia operativa"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - resilience
  - overview
  - dominio-2
status: activo
fuente: "AWS Solutions Architect Advanced - Operational Resilience (AWS Skill Builder)"
---

# Course Overview - Operational Resilience

> [!abstract] Qué es este archivo
> Primera lección del módulo. **No enseña ningún servicio**: es el **mapa del curso** —qué promete, con qué
> servicios lo hace, a quién apunta y qué asume—.
>
> Sirve para saber **qué esperar**: el módulo se juega en **protección de datos**, **disaster recovery** y
> **performance**, con **RTO** y **RPO** como unidad de medida y **SLA / KPI** como criterio de aceptación.

> [!quote] La idea que ordena todo
> **Resiliencia no es “que no se caiga”: es saber cuánto tarda en volver y cuánto dato se pierde.** Todo el módulo
> se mide con dos relojes: **RTO** (cuánto tarda) y **RPO** (cuánto dato).

---

## Resumen en una frase

> Un objetivo único y ancho —**proteger, recuperar y rendir**— sostenido por tres familias de servicios:
> **KMS y Config** para **proteger y cumplir**, **Backup y Elastic Disaster Recovery** para **volver**, y la
> **replicación de bases de datos** para **no perder**, todo medido contra **SLA y KPI**.

---

## 1. Qué promete el curso

**El encuadre de la fuente:** curso de **arquitectura avanzada** enfocado en **construir entornos cloud
enterprise-grade** que **priorizan seguridad, resiliencia y excelencia operativa**.

| Lo que declara la fuente | Qué significa en la práctica |
| --- | --- |
| **Entornos cloud enterprise-grade** | No es “levantar servicios”: es un entorno con **estándar de operación** |
| **Prioriza security, resilience y operational excellence** | **Tres ejes** de diseño; el **nombre del módulo** cubre solo uno |
| **Estrategias avanzadas de protección de datos** | La protección se diseña **como estrategia**, no se agrega al final |
| **Servicios “como” KMS, Config y controles automatizados** | El **“like”** de la fuente indica **lista abierta**: son **ejemplos**, no el temario |
| **DR: planificación e implementación** | Dos tiempos distintos: **el plan** y **la ejecución** |
| **Cumplir RTO y RPO específicos** | Los objetivos de recuperación se expresan en **dos métricas**, no en intenciones |

> [!important] El contraste que hay que ver
> El **resumen** nombra **cinco servicios**; el **objetivo** —más abajo— **no nombra ninguno**. El temario real
> del módulo está en el **resumen**, no en el objetivo.

---

## 2. El objetivo único, desarmado

**Literal de la fuente:** *“Design and implement a comprehensive AWS environment that ensures data protection,
disaster recovery, and performance optimization while meeting service level agreements and key performance
indicators.”*

**Es una sola frase y contiene cuatro compromisos:**

| Fragmento | Qué compromete |
| --- | --- |
| **Design *and* implement** | No alcanza con el **diseño**: el curso llega hasta **implementar** |
| **A comprehensive AWS environment** | Alcance **total**, no un servicio suelto |
| **Data protection · disaster recovery · performance optimization** | **Tres resultados** que hay que sostener **a la vez** |
| **Meeting SLAs and KPIs** | El criterio de aceptación es **medible**, no “funciona” |

> [!note] Ampliación (no está en la fuente)
> La fuente nombra **RTO** y **RPO** pero **no los define**. Para estudiar:
> **RTO** (*Recovery Time Objective*) = **tiempo máximo aceptable** para volver a operar;
> **RPO** (*Recovery Point Objective*) = **cantidad máxima de datos** —medida en tiempo— que se acepta **perder**.
> Un **backup cada 24 h** no cumple un **RPO de 15 minutos**, por más rápida que sea la restauración.

> [!warning] Un objetivo ancho no es un objetivo vago
> La frase es **amplia a propósito**: el módulo no promete “un servicio”, promete un **entorno** que cumple
> **tres resultados** y **dos métricas**. Si una lección futura no encaja en ninguno de esos cinco casilleros, hay
> que revisar la lectura.

**Comparación con el módulo anterior:** el de **Optimizing Hybrid Architectures** declaraba **ocho objetivos**
numerados; este declara **uno**. No es un recorte de contenido: es un **cambio de formato** de la fuente que se
registra en el **Registro de integración**.

---

## 3. Los servicios que nombra

**La fuente los menciona en el resumen, en dos tandas: primero protección, después recuperación.**

| Servicio / pieza | Cómo aparece en la fuente | El problema que toca |
| --- | --- | --- |
| **AWS KMS** | *“para **gestión de claves de cifrado**”* | **Cifrado** y custodia de llaves |
| **AWS Config** | *“para **monitoreo de cumplimiento**”* | **Cumplimiento** y deriva de configuración |
| **Controles de seguridad automatizados** | *“y **controles de seguridad automatizados**”* (**sin** nombrar servicio) | **Prevención y respuesta** sin intervención manual |
| **AWS Backup** | *“incluyendo el uso de **AWS Backup**”* | **Respaldo** centralizado |
| **Elastic Disaster Recovery** | *“**Elastic Disaster Recovery**”* | **Recuperación** de cargas ante desastre |
| **Métodos de replicación de bases de datos** | *“y **métodos de replicación de bases de datos**”* | **Pérdida de datos** acotada (**RPO**) |

> [!warning] La fuente los nombra, no los explica
> No hay definiciones, cuotas, precios, topologías ni regiones en esta página. **Lo que cada servicio hace se
> estudia en su lección.** Acá solo se fija **para qué está invitado al módulo**.

> [!note] Dos detalles de redacción (lectura propia)
> - **“Database replication *methods*”** está en **plural** y **sin servicio**: la fuente **no** se compromete con
>   **RDS**, **Aurora** ni **DMS**. Cualquier nombre concreto que aparezca después **viene de otra lección**.
> - **“Automated security controls”** tampoco trae servicio: puede ser **Config rules**, **Security Hub**,
>   **GuardDuty** o **Inspector**. La fuente **no lo dice** y acá **no se adivina**.

---

## 4. A quién apunta y qué asume

| | Detalle de la fuente |
| --- | --- |
| **Audiencia** | Un **solutions architect** que lleva **2 o más años** en el rol |
| **Prerrequisito 1** | Haber tomado o **entender el learning plan de Solutions Architect – Associate**, o haber **aprobado** ese examen |
| **Prerrequisito 2** | **Evaluar requisitos** de aplicaciones cloud y **hacer recomendaciones** de arquitectura para desplegarlas en AWS |
| **Prerrequisito 3** | **Dos o más años** de experiencia **usando servicios de AWS** para **diseñar e implementar** soluciones cloud |

> [!warning] Otra vez, dos “dos años” distintos
> La **audiencia** pide **2+ años en el rol**; el **prerrequisito** pide **2+ años usando servicios de AWS**.
> La fuente los enuncia por separado y **no son intercambiables**.

---

## 5. Cómo está armado

**Según la fuente, el curso incluye:**

- **Instrucción grabada**.
- **Contenido multimedia e interactivo**.
- **Un activity challenge** para **evaluar y reforzar** el conocimiento **actual y posterior a la formación**.

> [!note] Lo que este overview **no** trae
> Sin definiciones de servicio, **sin demo, sin knowledge check, sin diagramas y sin duración**. Es una página de
> encuadre: **no se estudia como contenido**, se usa para **ubicarse**.

> [!important] El activity challenge vuelve al final
> La fuente lo anuncia acá y lo describe como **evaluación de conocimiento previo y posterior**. En el módulo
> anterior ese lugar lo ocupó la **lección 13** (*Activity: Architecture Challenge*): el patrón se repite.

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, o (b) querés el texto exacto de un objetivo.

### 6.1 Course summary

Este curso incluye **instrucción grabada**, así como **contenido multimedia e interactivo**. Se provee **un
activity challenge** para **ayudarte a evaluar y reforzar tu conocimiento actual y posterior a la formación**.

Este curso de **arquitectura avanzada** se enfoca en **construir entornos cloud de nivel empresarial** que
**priorizan la seguridad, la resiliencia y la excelencia operativa**. Vas a aprender a **diseñar e implementar
infraestructuras de AWS robustas**, incorporando **estrategias avanzadas de protección de datos** usando
**servicios como AWS KMS** para la **gestión de claves de cifrado**, **AWS Config** para el **monitoreo de
cumplimiento** y **controles de seguridad automatizados**.

El curso cubre la **planificación e implementación de disaster recovery**, incluyendo el uso de **AWS Backup**,
**Elastic Disaster Recovery** y **métodos de replicación de bases de datos** para **cumplir objetivos específicos
de Recovery Time Objective (RTO) y Recovery Point Objective (RPO)**.

### 6.2 Course details — Course Objectives

En este curso, vas a aprender a:

- **Diseñar e implementar un entorno de AWS integral** que **asegure la protección de datos**, el **disaster
  recovery** y la **optimización del rendimiento**, **cumpliendo al mismo tiempo los acuerdos de nivel de servicio
  y los indicadores clave de rendimiento**.

### 6.3 Intended Audience

Este curso está destinado a:

- **Un solutions architect que lleva actualmente 2 o más años en el rol.**

### 6.4 Prerequisites

Recomendamos que quienes tomen este curso tengan los siguientes prerrequisitos:

- **Haber tomado o entender la información del learning plan de Solutions Architect – Associate**, o **haber
  aprobado el examen de certificación Solutions Architect – Associate**.
- **La capacidad de evaluar requisitos de aplicaciones cloud** y **hacer recomendaciones de arquitectura** para
  el **despliegue de aplicaciones en AWS**.
- **Dos o más años de experiencia usando servicios de AWS** para **diseñar e implementar soluciones cloud**.

---

## 7. El mapa del módulo (cierre)

| Necesidad | Pieza que la fuente nombra | Pregunta que responde |
| --- | --- | --- |
| **Cifrar** y custodiar llaves | **AWS KMS** | ¿Quién tiene la llave? |
| **Demostrar cumplimiento** | **AWS Config** | ¿Sigue la configuración como estaba aprobada? |
| **No depender de una persona** | **Controles automatizados** | ¿Quién corrige cuando nadie mira? |
| **Volver atrás** | **AWS Backup** | ¿De dónde restauro? |
| **Recuperar la operación** | **Elastic Disaster Recovery** | ¿Cuánto tarda en volver? (**RTO**) |
| **No perder el dato** | **Replicación de bases de datos** | ¿Cuánto dato se pierde? (**RPO**) |
| **Aceptar el resultado** | **SLA y KPI** | ¿Cómo se mide que cumplió? |

**El hilo que los une:** las siete filas responden a **una** pregunta de arquitectura — **¿qué pasa cuando algo
falla, y cómo lo demuestro?**. La seguridad entra porque **un DR sin cifrado ni cumplimiento no es aceptable** en
un entorno enterprise-grade.

> [!note] Lectura propia (no está en la fuente)
> La fuente **no agrupa** estos servicios ni **enumera lecciones**. La tabla ordena **lo que el resumen dice**, sin
> agregar servicios ni cifras. Si el módulo toma otro eje —por ejemplo, **solo DR**—, esta tabla se corrige y se
> registra.

> [!warning] Lo que el overview **no** dice
> **Cuántas lecciones** tiene el módulo, **cuánto dura**, **en qué Regiones** se implementa, **qué RTO y RPO**
> concretos son aceptables, **cuánto cuesta** y **si hay labs**. Nada de eso se puede responder con esta página.

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. El módulo se llama **Operational Resilience** y su resumen prioriza **tres ejes**: **seguridad**,
>    **resiliencia** y **excelencia operativa**.
> 2. El objetivo es **uno solo** y contiene **cuatro compromisos**: **protección de datos**, **DR**,
>    **optimización de rendimiento** y **cumplir SLA/KPI**.
> 3. **“Servicios como”** = **lista abierta**: **KMS**, **Config** y los **controles automatizados** son
>    **ejemplos**, no todo el temario.
> 4. **AWS KMS** aparece por **gestión de claves de cifrado**; **AWS Config** por **monitoreo de cumplimiento**.
> 5. El **DR** se estudia en **dos tiempos**: **planificación** e **implementación**.
> 6. Las únicas métricas que nombra el overview son **RTO** y **RPO**; **no trae números** para ninguna.
> 7. **AWS Backup**, **Elastic Disaster Recovery** y la **replicación de bases de datos** son **tres piezas
>    distintas** de la recuperación, no sinónimos.
> 8. El criterio de aceptación es **cumplir SLA y KPI**: “funciona” no alcanza.
> 9. **Audiencia y prerrequisitos** son los del nivel *Advanced*: **2+ años en el rol** y **2+ años con AWS**,
>    por separado.
> 10. El overview **no enumera lecciones ni da duración**: el alcance se deduce del **resumen**, no de un temario.

> [!warning] Trampa clásica del examen
> Escenario: *“la empresa exige un **RPO de 15 minutos** y el equipo propone **aumentar la frecuencia de los
> backups**”*. La respuesta **no** es solo frecuencia: el **RPO** se cubre con **replicación** o **DR continuo**,
> y el **RTO** con **recuperación automatizada**. *Lectura propia:* la fuente nombra las piezas (**Backup**,
> **Elastic Disaster Recovery**, **replicación**) pero **no las compara**; esa comparación hay que construirla en
> las lecciones de servicio.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Operational Resilience]] *(índice del módulo)*
- [[Course Overview - Optimizing Hybrid Architectures]] — el overview anterior: **ocho objetivos** contra
  **uno solo** acá, mismo formato de página
- [[Course Overview - Securing Networks and Data]] — el overview de seguridad: cifrado y controles
- [[AWS KMS]] — la pieza de **gestión de claves** que este módulo anuncia
- [[Cloud Governance Pillars]] — control de **cumplimiento** y **AWS Config** en el módulo de observabilidad
- [[1.2 Prescribir controles de seguridad]] — los controles que el módulo da por sabidos
- [[1.3 Diseñar arquitecturas fiables y resistentes]] — el marco de **fiabilidad**
- [[2.2 Diseñar una solución para garantizar la continuidad de actividades]] — el corazón del **DR**
- [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]] — **RTO / RPO** en el examen
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — la parte de **performance**
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: **pendiente** — la lección 02 todavía no llegó

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 29/10/2026 | Lección 01 completa: **Course summary**, **Course Objectives** (uno), **Intended Audience** y **Prerequisites** | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **El módulo declara un solo objetivo** y **muy amplio**; el módulo anterior declaraba **ocho** numerados. No
   se desglosa en objetivos oficiales: el desglose de §2 es **lectura propia** de una sola frase.
2. **Los servicios no están en los objetivos**: **KMS**, **Config**, **AWS Backup**, **Elastic Disaster
   Recovery** y la **replicación de bases de datos** aparecen **solo en el resumen**. El temario real está en el
   resumen; el objetivo no los menciona.
3. **No hay número de lecciones, duración ni regiones**: la fuente **no lo declara**. Queda como **duda abierta**
   en el índice.
4. **“RTO” y “RPO” se nombran sin definición ni cifras**: la ampliación de §2 es **externa a la fuente**.
5. **“Database replication methods”** está en **plural** y **sin servicio nombrado**; no se traduce a un producto
   concreto.
6. **“Automated security controls”** no identifica servicio: se deja como **categoría**, sin adivinar.
7. **La fuente usa `****Course Objectives****`** (cuatro asteriscos) y `####` para los títulos. Es un
   **artefacto de formato**; se traduce como negrita normal.
8. **El archivo original se llama `Course Overview.md`**, igual que los de otros módulos. Se agregó el sufijo
   **`- Operational Resilience`** para evitar ambigüedad de wikilinks.
9. **No hay imágenes, video ni knowledge check**: es una página de texto. El **activity challenge** se anuncia
   pero **no se describe**.
10. **El nombre del módulo (“Operational Resilience”) cubre uno de los tres ejes** que declara el resumen
    (**security**, **resilience**, **operational excellence**): no se corrige ni se interpreta el alcance.

**Decisiones de transcripción:**

- Se conservan **AWS KMS**, **AWS Config**, **AWS Backup**, **Elastic Disaster Recovery**, **Recovery Time
  Objective (RTO)**, **Recovery Point Objective (RPO)**, **service level agreements**, **key performance
  indicators**, **enterprise-grade**, **disaster recovery**, **on-premises** (cuando aparezca) y **activity
  challenge**.
- Las **cifras** se transcriben literales: **2 o más años** (dos veces, con significados distintos: rol y uso de
  AWS) y **un** objective.
- **“Métodos de replicación de bases de datos”** se conserva en **plural** y **genérico**, porque la fuente no
  nombra servicio.
- La expresión **“servicios como”** se mantiene como **lista abierta** y se marca en §3 y §8 para que no se lea
  como temario cerrado.
