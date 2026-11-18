---
title: "Cloud Governance Pillars"
aliases:
  - "Cloud governance pillars"
  - "Pilares de la gobernanza"
  - "Inventory and configuration management"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - governance
  - config
  - observabilidad
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Cloud Governance Pillars"
---

# Cloud Governance Pillars

> [!abstract] Qué es este archivo
> Lección corta (3:00) que **ordena conceptualmente** lo que ya vimos en [[Detective Controls]]: la gobernanza se
> apoya en **pilares**, y cada pilar responde **un conjunto distinto de preguntas**.
>
> El video desarrolla **dos**: **inventory and configuration management** y **configuration compliance
> management**. El texto introductorio nombra **cinco** (security, cost management, operations, performance,
> compliance) — la diferencia está marcada en §5.

> [!quote] La idea que hay que retener
> **Primero sabés qué tenés y cómo está configurado. Después verificás que siga así.**
> Inventario y compliance no son lo mismo: uno **describe**, el otro **evalúa contra una regla**.

---

## Resumen en una frase

> Un marco de gobernanza efectivo mantiene **inventario en tiempo real** y **configuraciones actuales e
> históricas** (pilar 1), y luego **define políticas y alerta en tiempo real cuando un recurso las viola**
> (pilar 2), dando información precisa para decidir y reduciendo errores de configuración.

---

## 1. Los dos pilares que desarrolla la lección

| # | Pilar | Pregunta central | Qué aporta |
| --- | --- | --- | --- |
| **1** | **Inventory and configuration management** | **¿Qué tengo y cómo está configurado?** | Inventario en **tiempo real** + configuración **actual e histórica** |
| **2** | **Configuration compliance management** | **¿Sigue cumpliendo las reglas?** | Políticas de **best practices y requisitos regulatorios** + **alertas en tiempo real** ante violación |

> [!important] El orden importa
> La lección lo dice explícito: *“after the configuration is properly set up and tracked, you should make sure
> that it stays that way.”*
> Sin inventario y línea base **no hay** contra qué comparar. Compliance **depende** del pilar 1.

---

## 2. Pilar 1 — Inventory and configuration management

**Qué mantiene:** un **inventario en tiempo real** de los recursos de la nube **y** la información de sus
**configuraciones actuales e históricas**.

### 2.1 Las cinco preguntas del pilar

| Pregunta | Etiqueta de la lectura | Para qué sirve |
| --- | --- | --- |
| **¿Qué hay disponible ahora en mi inventario?** | **Real-time resource inventory** | Saber qué existe, sin esperar un relevamiento manual |
| **¿Cuál es el último estado de configuración de mis recursos?** | **Configuration snapshot** | Ej.: la **foto de configuración de una instancia EC2** |
| **¿Qué relación existe entre mis recursos?** | **Resource relationships** | Vínculos **dentro de AWS y también on-premises** |
| **¿Qué cambios de configuración ocurrieron en mi workload crítico en un período?** | **Configuration history** | *“Auditors love this”* — historial para auditoría |
| **¿Qué instancias EC2 se construyeron con una AMI determinada?** | Consulta por imagen | Ej.: **`AMI-234314`** — rastrear propagación de una imagen |

> [!tip] Por qué la pregunta de la AMI es tan potente
> Si aparece una **AMI vulnerable**, la pregunta “¿qué instancias corren esa AMI?” pasa de curiosidad a
> **respuesta a incidente**. El inventario **con atributos** permite ese corte en segundos.

### 2.2 Para qué sirve toda esa información

| Uso | Detalle |
| --- | --- |
| **Auditorías** | El **historial de configuración** es la evidencia |
| **Investigación de brechas** | Reconstruir **qué cambió y cuándo** |
| **Detección de instancias sin parchear** | Un sistema de inventario y compliance puede detectar **qué EC2 online tienen vulnerabilidades porque no se parchearon** |
| **Acción a escala** | **Agrupar lógicamente** los recursos permite **actuar** sobre ellos, no solo listarlos |

---

## 3. Pilar 2 — Configuration compliance management

**Qué hace:** permite **definir políticas** alrededor de **best practices** y **requisitos regulatorios** para los
recursos, y **alertar en tiempo real** cuando un recurso **posiblemente viola** esa política.

### 3.1 Las cuatro preguntas del pilar

| Pregunta | Etiqueta de la lectura | Detalle |
| --- | --- | --- |
| **¿Mis recursos siguen bien configurados** después del despliegue? | **Best-practice configuration checks** | Contra **best practices o frameworks** específicos |
| **¿Cumplen los requisitos regulatorios?** | Compliance regulatorio | Ej.: **NIST**, **PCI**, **HIPAA** |
| **¿Cómo aseguro el compliance?** | **Checking for policy violations immediately after a configuration change** | Verificación **inmediatamente después** del cambio |
| **¿Cómo me entero en tiempo real** si un recurso sale de compliance? | **Real-time compliance change notifications** | Notificación **en tiempo real** |

> [!important] “En tiempo real” aparece dos veces
> No es un adjetivo decorativo: la verificación ocurre **inmediatamente después del cambio** y la notificación es
> **en tiempo real**. Un escaneo diario **no cumple** este requisito.

### 3.2 Qué aporta un marco efectivo

1. **Sostener las iniciativas de gobernanza** con **información de configuración precisa**, para que los
   responsables de decidir la tengan **en tiempo real**.
2. **Minimizar** los problemas de **calidad y compliance** causados por configuraciones **incorrectas o
   inexactas** — incluso **antes del despliegue**.

> [!note] Ampliación (no está en la fuente)
> “Antes del despliegue” es el puente al control **preventivo**: la verificación previa se implementa con
> **proactive controls** de Control Tower (CloudFormation hooks) o con **checks en el pipeline**. La lección no
> nombra esos mecanismos; solo fija el objetivo.

---

## 4. Cómo se complementan

```
                    ┌──────────────────────────────┐
                    │  INVENTARIO + CONFIGURACIÓN  │
                    │  qué existe · cómo está      │
                    │  snapshot · historial        │
                    └──────────────┬───────────────┘
                                   │ línea base
                                   ▼
                    ┌──────────────────────────────┐
                    │  COMPLIANCE DE CONFIGURACIÓN │
                    │  regla · evaluación · alerta │
                    └──────────────┬───────────────┘
                                   │ violación
                                   ▼
                         notificación en tiempo real
```

| Pregunta | Pilar |
| --- | --- |
| ¿Qué tengo? | **Inventario** |
| ¿Cómo está configurado? | **Inventario** |
| ¿Cómo estaba antes? | **Inventario** (historial) |
| ¿Cumple la regla? | **Compliance** |
| ¿Me avisa si deja de cumplir? | **Compliance** |

### 4.1 Servicios que los implementan

> [!note] Ampliación (no está en la fuente)
> La lección **no nombra servicios**: describe capacidades. El mapeo a AWS, para estudiar:

| Capacidad | Servicio |
| --- | --- |
| Inventario de recursos y **snapshots** de configuración | **AWS Config** (resource inventory, configuration items) |
| **Relaciones** entre recursos | **AWS Config** (relationships) |
| **Historial** de cambios de configuración | **AWS Config** (configuration history) |
| **Compliance** contra reglas y frameworks | **AWS Config rules** / **conformance packs** |
| **Alertas en tiempo real** | **Amazon SNS** y **Amazon EventBridge** (la lección anterior confirma SNS + CloudWatch events) |
| Inventario de **software y parches** en instancias | **AWS Systems Manager Inventory** y **Patch Manager** |
| Agrupación lógica para actuar | **Resource Groups** y **Tag Editor** |

---

## 5. Discrepancia de la fuente (importante)

| Texto | Dice |
| --- | --- |
| **Introducción** | Los pilares son **security, cost management, operations, performance y compliance** (cinco) |
| **Transcript y lectura** | *“Two important pillars that form the foundation”*: **inventory and configuration management** y **configuration compliance management** |

**Cómo lo traté:** la nota desarrolla **los dos que la lección explica**, y deja registrada la lista de cinco como
**marco general** que la introducción menciona. No se inventó contenido para los otros tres.

> [!warning] Ojo con esto en el examen
> Si la pregunta cita **“los cinco pilares”** del marco de gobernanza, la lista es **security · cost management ·
> operations · performance · compliance**. Los **dos pilares del video** son otra cosa: son las **capacidades de
> inventario y compliance** que los sostienen. No son listas equivalentes.

### 5.1 Otra diferencia menor

El transcript dice **“AMI 234 145”** y la lectura dice **`AMI-234314`**. Se transcriben ambos; el formato válido de
AMI es el de la lectura (`ami-` + hexadecimal). Queda anotado en el registro.

---

## 6. Traducción del contenido

### 6.1 Introducción

Una **gobernanza de nube efectiva** se construye sobre **pilares clave** que proveen el marco para **administrar
y optimizar** tu entorno de AWS **a escala**. Estos pilares —**security, cost management, operations, performance
y compliance**— forman la base de una **estrategia de nube bien arquitectada**.

Para los Solutions Architects, entender **cómo interactúan** estos pilares e implementar los **controles
apropiados** para cada uno es importante para mantener la **excelencia operativa** mientras se cumplen los
objetivos del negocio. Explorarás cómo estos pilares de gobernanza **trabajan juntos** para crear un **marco
integral** que asegure que tu organización pueda operar de forma **eficiente, segura y rentable** en la nube,
manteniendo el **cumplimiento de los requisitos regulatorios**.

### 6.2 Transcript (duración: 3 minutos)

Ahora, en esta sección vamos a discutir **dos pilares importantes** que forman la **base de un marco efectivo de
gobernanza de nube**.

El **primer pilar** es **inventory and configuration management**. Un sistema efectivo debería mantener un
**inventario en tiempo real** de tus recursos de nube, además de información sobre las **configuraciones actuales
e históricas**.

Ahora, después de que la configuración está **correctamente establecida y rastreada**, deberías asegurarte de que
**se mantenga así**. Ahí es donde entra el **configuration compliance management**: provee una forma de **definir
políticas** alrededor de **best practices** y **requisitos regulatorios** para tus recursos de nube de AWS. Pero
además **te alerta en tiempo real** cuando un recurso **posiblemente viola** esa política.

Ahora, desde el pilar de **inventory and configuration management**, querés mirar **responder algunas de estas
preguntas**. Pensá en **qué recursos están disponibles actualmente**. Recordá: **inventario y monitoreo de recursos
en tiempo real**. **¿Cuál es el último estado de configuración de mis recursos?** Cosas como **snapshots de
configuración de mi instancia EC2**. **¿Cuál es mi relación con los recursos existentes**, tanto en AWS como quizá
**on-premises**? Así que, **¿cuál es esa relación entre recursos?** **¿Qué cambios de configuración ocurrieron en
mi workload crítico en un período específico?** Pensá esto desde una **perspectiva de historial de
configuración**. **A los auditores les encanta esto.** **¿Qué instancias de Amazon EC2 pueden estar construidas
sobre una determinada AMI**, por ejemplo **AMI 234 145**? Toda esta información es valiosa **durante las
auditorías**, pero también cuando pensamos en **cómo investigar posibles brechas de seguridad**.

Ahora, cuando pensamos en **sistemas de inventario y compliance**, **cómo podemos detectar qué instancias EC2
online podrían tener vulnerabilidades de seguridad porque no han sido parcheadas**. Acá es, otra vez, donde
pensamos en **agrupar lógicamente esos recursos** y poder **tomar acción**.

Ahora, para el pilar de **configuration compliance management**, mirás **responder otras preguntas**:
**¿mis recursos siguen configurados correctamente** contra **best practices o frameworks específicos** después del
despliegue? **¿Mis recursos cumplen con requisitos regulatorios** como **NIST**, **PCI** o **HIPAA**? Ahora, una
**muy importante para la mayoría de los clientes**: **¿cómo aseguro el compliance?**, **¿cómo podría recibir
notificaciones en tiempo real** si ciertos recursos **se vuelven no compliant**?

Pero quiero que pienses **cuán efectivo debería ser un marco de gobernanza**. Cosas como **sostener las iniciativas
de gobernanza proveyendo información de configuración precisa** para **asistir realmente a nuestros tomadores de
decisión en tiempo real**. También **minimizar la cantidad de problemas de calidad y compliance causados por
configuraciones incorrectas o inexactas de recursos**, **incluso antes del despliegue**.

### 6.3 Pilares clave de una gobernanza efectiva

El **primer pilar** de un marco de gobernanza efectivo es **inventory and configuration management**. Un sistema
efectivo mantiene un **inventario en tiempo real** de los recursos de nube y **información sobre las
configuraciones actuales e históricas**.

Después de que la configuración está **correctamente establecida y rastreada**, debés asegurarte de que **se
mantenga así**. Y también debés **verificar que siga siendo compliant**. Ahí es donde entra el **configuration
compliance management**: provee una forma de **definir políticas** alrededor de **best practices** y **requisitos
regulatorios** para los recursos de nube. Luego **alerta a los clientes en tiempo real** cuando **cualquier
recurso viola** las políticas.

**Cada pilar responde a un conjunto distinto de preguntas.**

#### Inventory and configuration management

Para el pilar de **inventory and configuration management**, los clientes responden preguntas como:

- **¿Qué hay actualmente en mi inventario?** (**Real-time resource inventory**)
- **¿Cuál es el último estado de configuración de mis recursos?** (**Configuration snapshot**)
- **¿Qué relaciones existen entre mis recursos?** (**Resource relationships**)
- **¿Qué cambios de configuración ocurrieron en mi workload crítico en un período específico?**
  (**Configuration history**)
- **¿Qué instancias EC2 están construidas sobre una determinada imagen de máquina?** (por ejemplo,
  **`AMI-234314`**)

Esta información es **valiosa durante las auditorías** y para **investigar brechas de seguridad**. Por ejemplo, un
sistema de **inventario y compliance** puede **detectar qué instancias EC2 online podrían tener vulnerabilidades
de seguridad porque no han sido parcheadas**.

#### Configuration compliance management

Para el pilar de **configuration compliance management**, los clientes responden preguntas como:

- **¿Mis recursos siguen configurados correctamente?** (**Best-practice configuration checks**)
- **¿Mis recursos cumplen con los requisitos regulatorios?** (por ejemplo, **PCI** o **HIPAA**)
- **¿Cómo aseguro el compliance?** (**Checking for policy violations immediately after a configuration change**)
- **¿Cómo puedo recibir notificaciones en tiempo real si ciertos recursos salen de compliance?**
  (**Real-time compliance change notifications**)

Para resumir, un **marco de gobernanza efectivo** **sostiene las iniciativas de gobernanza proveyendo información
de configuración precisa** para asistir en la **toma de decisiones**. También **minimiza la cantidad de problemas
de calidad y compliance causados por configuraciones incorrectas o inexactas**.

---

## 7. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 7.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Inventario, historial y relaciones** | **1.2** Prescribir controles de seguridad · **1.4** Entorno multi-cuenta |
| **Compliance de configuración y alertas** | **1.2** · **2.3** Controles según requisitos |
| **Visibilidad y reporte para decisores** | **1.5** Estrategias de visibilidad |
| **Operación continua y detección** | **3.1** Excelencia operativa · **3.2** Mejorar la seguridad |

### 7.2 Diez puntos para llevarse

1. **Dos pilares**: **inventory & configuration** y **configuration compliance**.
2. **Inventario = tiempo real**; **historial = pasado**; **snapshot = estado actual**.
3. **Relaciones** incluyen recursos **on-premises**, no solo dentro de AWS.
4. **Historial de configuración** es la evidencia que piden las **auditorías**.
5. La pregunta por **AMI** sirve para **rastrear propagación** y responder incidentes.
6. **Detección de instancias sin parchear** es un caso de uso del pilar de inventario **más** compliance.
7. **Compliance** se define con **best practices + requisitos regulatorios** (**NIST**, **PCI**, **HIPAA**).
8. La verificación ocurre **inmediatamente después del cambio**; la notificación es **en tiempo real**.
9. Un marco efectivo **minimiza errores incluso antes del despliegue**.
10. **Inventario describe; compliance evalúa.** No se sustituyen.

### 7.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Inventario y compliance son lo mismo” | Uno **describe** el estado; el otro **lo compara con una regla** |
| “El historial es opcional” | Es lo que hace posible la **auditoría** y la **investigación de brechas** |
| “Un escaneo periódico cumple ‘tiempo real’” | La lección exige **verificación tras el cambio** y **notificación en tiempo real** |
| “El inventario solo cubre AWS” | Incluye **relaciones con recursos on-premises** |
| “Compliance empieza después del despliegue” | El marco también busca **minimizar errores antes** |
| “Los cinco pilares del intro son los dos del video” | Son **listas distintas**: cinco del marco general, dos de esta lección |
| “Saber qué AMI corre una instancia es solo inventario” | Es inventario **con propósito de auditoría e incident response** |

> [!note] Ampliación (no está en la fuente)
> En el examen, cuando el requisito es **“saber qué cambió y demostrarlo”**, la respuesta combina **AWS Config**
> (historial de configuración) con **CloudTrail** (historial de llamadas API). Son dos historiales distintos:
> **estado del recurso** vs. **acción del usuario**.

---

## 8. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción (5 pilares) + transcript (3:00) + lectura de los 2 pilares + preguntas guía | Nota completa (secciones 1–7) |

**Discrepancias registradas (no corregidas en la traducción):**

1. **Cinco pilares en la introducción** vs. **dos pilares en el video/lectura**. Se desarrollan los dos; la lista
   de cinco queda como marco general (§5).
2. **AMI**: transcript *“AMI 234 145”* vs. lectura **`AMI-234314`**. Se transcriben ambos.

**Decisiones de transcripción:**

- La lectura **repite** el texto del transcript casi palabra por palabra: en la traducción se conservaron **ambas
  versiones** porque la lectura agrega las **etiquetas entre paréntesis** (snapshot, relationships, history), que
  son las que se usan en el examen.
- El video **no trae Knowledge Check**.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Detective Controls]] — Config, GuardDuty, Security Hub y Systems Manager en detalle
- [[Establishing Guardrails]] — preventive vs. detective
- [[Governance at Scale]] — los tres focos y la herencia
- [[Course Overview]] — objetivos del curso
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]]
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales
