---
title: "Course Overview - Securing Networks and Data"
aliases:
  - "Course Overview (Securing Networks and Data)"
  - "Overview del curso"
  - "Resumen del curso"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - overview
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Course Overview - Securing Networks and Data

> [!abstract] Qué es este archivo
> Primera lección del módulo. **No enseña ningún servicio**: es el **mapa del curso** —qué promete, con qué
> servicios lo hace, a quién apunta y qué asume—.
>
> Sirve para saber **qué esperar** y para ubicar cada lección futura en uno de los **cuatro bloques** que declara.

> [!quote] La idea que ordena todo
> **La seguridad no se resuelve con un servicio: se resuelve en capas.** El curso se ordena por **dónde actúa
> cada control** —red, detección, criptografía y claves—, no por orden alfabético de servicios.

---

## Resumen en una frase

> Cuatro objetivos y cuatro capas: **Firewall Manager + Network Firewall** para la red, **GuardDuty + Security
> Hub** para detección y compliance, **criptografía** como fundamento y **KMS** para cifrar.

---

## 1. Qué promete el curso

**El diagnóstico de partida:** en entornos cloud complejos, **asegurar cargas enterprise requiere un enfoque
multi-capa**.

| Lo que declara la fuente | Qué significa en la práctica |
| --- | --- |
| **Diseñar e implementar soluciones de seguridad integrales** | No alcanza con un control aislado: hay que cubrir **varias capas** |
| **Escala enterprise** | El diseño tiene que funcionar en **despliegues grandes**, no en una VPC de laboratorio |
| **Controles en múltiples cuentas** | La unidad de diseño es la **organización**, no la cuenta suelta |
| **Detección avanzada de amenazas** | Hay que **ver** lo que pasa, no solo bloquear |
| **Protección de datos en cada capa** | El dato se protege **en tránsito, en reposo y en el acceso** |
| **Compliance exigente + agilidad** | Cumplir **sin** congelar la operación |

---

## 2. Los cuatro objetivos son el mapa del curso

**Los objetivos no son un temario suelto: agrupan el curso en cuatro bloques.**

| # | Bloque | Servicios / tema | Qué se espera que hagas |
| --- | --- | --- | --- |
| 1 | **Seguridad de red a escala** | **AWS Firewall Manager** + **AWS Network Firewall** | Diseñar e implementar protección **en múltiples cuentas y VPC** |
| 2 | **Monitoreo y compliance** | **Amazon GuardDuty** + **AWS Security Hub** | Arquitecturar **detección y cumplimiento** en **varias cuentas y regiones** |
| 3 | **Criptografía** | **Conceptos** | Explicar **cómo funciona** la criptografía |
| 4 | **Cifrado de datos** | **AWS KMS** | Usar KMS para **cifrar tus datos** |

> [!important] Cómo se lee el mapa
> Los bloques **1 y 2 son de operación** (prevenir y detectar a escala). Los bloques **3 y 4 son de fundamento**
> (entender el cifrado y aplicarlo con una llave administrada). Si una lección futura no entra en ninguno,
> conviene revisar de qué está hablando.

> [!note] Ampliación (no está en la fuente)
> El orden del curso **no** es el orden de la tabla: primero aparece la seguridad de red, después el monitoreo, y
> el **fundamento criptográfico** queda al final. Eso es una decisión pedagógica, no una jerarquía de importancia:
> **sin entender las claves, KMS es memorizar nombres**.

---

## 3. A quién apunta y qué asume

| | Detalle de la fuente |
| --- | --- |
| **Audiencia** | Un **solutions architect** que lleva **2 o más años** en el rol |
| **Prerrequisito 1** | Haber tomado o **entender el learning plan de Solutions Architect – Associate**, o haber **aprobado** ese examen |
| **Prerrequisito 2** | **Evaluar requisitos** de aplicaciones cloud y **hacer recomendaciones** de arquitectura para desplegarlas en AWS |
| **Prerrequisito 3** | **Dos o más años** de experiencia **usando servicios de AWS** para **diseñar e implementar** soluciones cloud |

> [!warning] Dos “dos años” distintos
> La **audiencia** pide **2+ años en el rol** de solutions architect; el **prerrequisito** pide **2+ años usando
> servicios de AWS**. No es el mismo requisito y la fuente los enuncia por separado.

---

## 4. Cómo está armado

**Según la fuente, el curso incluye:**

- **Instrucción grabada**.
- **Contenido multimedia e interactivo**.
- **Un activity challenge** para **evaluar y reforzar** el conocimiento **antes y después** de la formación.

> [!note] Lo que este overview **no** trae
> No hay definiciones de servicio, ni demo, ni knowledge check, ni diagramas. Es una página de encuadre: **no se
> estudia como contenido**, se usa para **ubicarse**.

---

## 5. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 4** y se cierra con la **7**.
> Usala solo si (a) algo de arriba te quedó dudoso, o (b) querés chequear el texto exacto de un objetivo.

### 5.1 Course summary

Este curso incluye **instrucción grabada**, así como **contenido multimedia e interactivo**. Se provee **un
activity challenge** para **ayudarte a evaluar y reforzar tu conocimiento actual y posterior a la formación**.

En los **entornos cloud complejos de hoy**, **asegurar cargas de trabajo enterprise requiere un enfoque
multi-capa**. Este curso **explora cómo diseñar e implementar soluciones de seguridad integrales** para
**despliegues de AWS a gran escala**.

Vas a aprender **cómo arquitecturar controles de seguridad en múltiples cuentas de AWS**, **implementar
mecanismos avanzados de detección de amenazas** y **garantizar la protección de datos en cada capa de tu
aplicación**. A través de **escenarios y ejemplos del mundo real**, vas a **desarrollar las habilidades
necesarias para construir arquitecturas de seguridad resilientes** que **cumplan requisitos de compliance
estrictos** y, al mismo tiempo, **habiliten agilidad de negocio**.

### 5.2 Course details — Course Objectives

En este curso, vas a aprender a:

- **Diseñar e implementar soluciones de seguridad de red a escala enterprise** usando **AWS Firewall Manager** y
  **AWS Network Firewall** para **proteger cargas de trabajo en múltiples cuentas y VPC**.
- **Arquitecturar soluciones de monitoreo de seguridad y compliance** usando **Amazon GuardDuty** y **Security
  Hub** para **proteger cargas enterprise** y **mantener el cumplimiento en múltiples cuentas y regiones de
  AWS**.
- **Explicar los conceptos básicos de criptografía y cómo funciona**.
- **Usar AWS Key Management System (AWS KMS)** para **ayudar a cifrar tus datos**.

### 5.3 Intended Audience

Este curso está destinado a:

- **Un solutions architect que lleva actualmente 2 o más años en el rol.**

### 5.4 Prerequisites

Recomendamos que quienes tomen este curso tengan los siguientes prerrequisitos:

- **Haber tomado o entender la información del learning plan de Solutions Architect – Associate**, o **haber
  aprobado el examen de certificación Solutions Architect – Associate**.
- **La capacidad de evaluar requisitos de aplicaciones cloud** y **hacer recomendaciones de arquitectura** para
  el **despliegue de aplicaciones en AWS**.
- **Dos o más años de experiencia usando servicios de AWS** para **diseñar e implementar soluciones cloud**.

---

## 6. Cómo leer el módulo

| Si la lección habla de… | Pertenece al bloque… |
| --- | --- |
| Políticas de firewall **centralizadas** en muchas cuentas | **1. Firewall Manager** |
| Inspección de tráfico **dentro de la VPC** | **1. Network Firewall** |
| **Hallazgos** de amenazas en varias cuentas | **2. GuardDuty** |
| **Postura de seguridad y compliance** agregada | **2. Security Hub** |
| **Cómo funciona** el cifrado, algoritmos, claves | **3. Criptografía** |
| **Crear y usar** una clave para cifrar datos | **4. KMS** |

**El hilo que las une:** los cuatro bloques responden a la misma pregunta desde lugares distintos — **quién entra,
qué pasa, cómo se protege el dato y con qué llave**.

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. El curso se organiza en **cuatro objetivos**: red, monitoreo/compliance, criptografía y KMS.
> 2. **Firewall Manager + Network Firewall** = seguridad de red **a escala**, en **múltiples cuentas y VPC**.
> 3. **GuardDuty + Security Hub** = **detección y compliance** en **múltiples cuentas y regiones**.
> 4. La **criptografía** se estudia como **fundamento**, no como servicio.
> 5. **KMS** es el servicio para **cifrar datos**; la fuente lo llama “Key Management **System**”.
> 6. El enfoque del curso es **multi-capa** y **multi-cuenta**: esa es la expectativa de diseño.
> 7. **Compliance** y **agilidad** se presentan como objetivos **simultáneos**, no como un trade-off.
> 8. Hay un **activity challenge** de evaluación **antes y después** de la formación.

> [!warning] Trampa clásica del examen
> Este overview **no tiene contenido evaluable**: no hay escenarios ni distractores. La trampa real empieza en
> las lecciones de servicio. Lo único que conviene fijar acá es el **mapa**: si una pregunta mezcla
> **Network Firewall** con **Security Hub**, ya sabés que está cruzando dos bloques distintos.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — el módulo anterior: la red
  que este curso **asegura**
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — detección,
  governance y costos vistos desde operaciones
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — cuentas, OUs y **SCPs**
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[Gathering the Customer Requirements - Security]] — el caso que estos cuatro
  bloques tienen que resolver

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 01 completa: resumen, objetivos, audiencia y prerrequisitos | Nota completa (secciones 1–7) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La fuente escribe “AWS Key Management System (AWS KMS)”**. El nombre del servicio es **AWS Key Management
   Service**. Se transcribe literal en §5.2 y se usa el nombre correcto en el cuerpo.
2. **El archivo original se llama `Course Overview.md`**, igual que el del módulo *Implementing Observability and
   Management Controls*. Se agregó el sufijo **`- Securing Networks and Data`** para evitar ambigüedad de
   wikilinks.
3. **No hay imágenes ni diagramas** en la lección.
4. **No hay video ni knowledge check**: es una página de texto.
5. **La fuente no enumera las lecciones** del curso: los cuatro bloques de §2 son **mi lectura de los cuatro
   objetivos**, no un temario oficial.
6. **La fuente no da duración** del curso ni de las lecciones.

**Decisiones de transcripción:**

- Se conservan **Firewall Manager**, **Network Firewall**, **GuardDuty**, **Security Hub**, **KMS**,
  **multi-capa**, **compliance** y **activity challenge**.
- Las **cifras** se transcriben literales: **2 o más años** (dos veces, con significados distintos: rol y uso de
  AWS).
- Los **cuatro objetivos** se transcriben completos, porque son el **contrato del curso**.
