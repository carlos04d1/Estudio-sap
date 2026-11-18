---
title: "Synthetic Monitoring and Service-Level Objectives"
aliases:
  - "Synthetic Monitoring and SLOs"
  - "Monitoreo sintético y SLO"
  - "CloudWatch Synthetics"
  - "CloudWatch RUM"
  - "Application Signals"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - observabilidad
  - cloudwatch
  - slo
  - synthetics
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Synthetic Monitoring and Service-Level Objectives"
---

# Synthetic Monitoring and Service-Level Objectives

> [!abstract] Qué es este archivo
> Tercera y última lección del bloque de observabilidad. Las dos anteriores miraban **desde adentro** (métricas,
> logs, trazas); esta mira **desde el usuario** y **desde el compromiso**.
>
> Cubre **CloudWatch Synthetics** (canaries heartbeat y API), **CloudWatch RUM**, la comparación entre ambos,
> **Application Signals**, la anatomía de un **SLO** (SLI + attainment goal + evaluation window) y el mecanismo de
> **error budget + burn rate alerts**.

> [!quote] La idea que hay que retener
> **Un sistema puede estar “sano” por dentro y roto para el usuario.**
> La lección lo abre así: *“un servicio puede parecer saludable desde la perspectiva de infraestructura mientras
> los usuarios experimentan cargas lentas, transacciones fallidas o funcionalidad degradada”*. El **monitoreo
> sintético** y el **real user monitoring** cubren **ese hueco**.

---

## Resumen en una frase

> **Synthetics** simula usuarios **antes** de que lleguen, **RUM** mide a los usuarios **reales**, y **Application
> Signals** convierte todo eso en **SLIs** para evaluar **SLOs**, con **error budgets** y **burn rate alerts** que
> avisan **antes** de incumplir.

---

## 1. CloudWatch Synthetics

### 1.1 Qué es un canary

| Aspecto | Detalle |
| --- | --- |
| **Qué es** | **Scripts configurables** que corren **en un schedule** para **probar endpoints y workflows** |
| **Diferencia clave** | **Monitoreo proactivo**: **simula requests antes** de que lleguen los usuarios, en lugar de **reaccionar** después de un problema real |
| **Intervalo** | **Definido** (por ejemplo, **cada minuto** o **cada cinco minutos**) |
| **Qué reporta** | **Availability** y **latency** a **CloudWatch metrics** |
| **Qué dispara** | Ante una **falla**, una **alarma de CloudWatch** |
| **Beneficio** | El **on-call se entera por el canary**, **no por el reclamo de un usuario** |

> [!important] Proactivo ≠ más rápido que el usuario
> El canary **no evita** la falla: **la detecta antes** de que el usuario la reporte. La diferencia práctica es
> **quién avisa primero** y **cuánto tarda el MTTR** en arrancar.

### 1.2 Tipos de canary

| Tipo | Qué hace | Qué valida |
| --- | --- | --- |
| **Heartbeat monitoring** | **Requests HTTP** a **una o más URLs** y **chequea respuestas esperadas** | **Availability** (up/down), **latency**, **HTTP status codes**; puede **capturar screenshots** para **comparación visual en el tiempo** |
| **API monitoring** | **Llamadas API estructuradas** | **Response body**, **headers** y **status codes**; puede **autenticarse**, **enviar test payloads** y **verificar que los datos devueltos coincidan** con lo esperado |

**Heartbeat — cuándo:** verificar que **URLs críticas sigan alcanzables**: **login pages**, **checkout flows**,
**API health endpoints** y **cualquier URL de la que dependan los clientes**. Un heartbeat al **payment API cada
minuto** avisa **de inmediato** si el endpoint deja de responder, **antes de que lleguen los tickets de soporte**.

**API — cuándo:** cuando **la disponibilidad sola no alcanza**. Un servicio puede devolver **HTTP 200** y aun así
**datos incorrectos**. Los API canaries detectan **errores de lógica**, **fallas de integración** y **problemas de
calidad de datos** que un chequeo de disponibilidad **no ve**.

> [!important] La diferencia que se pregunta
> **Heartbeat** responde **“¿está arriba?”**. **API** responde **“¿está haciendo lo correcto?”**.
> Si el enunciado menciona **200 con datos erróneos** o **validar el body**, la respuesta es **API canary**.

> [!note] Ampliación (no está en la fuente)
> Los canaries de Synthetics pueden ser **UI canaries** (navegan con un browser headless) además de **API y
> heartbeat**. La lección **no menciona** los UI canaries; solo los **screenshots** de comparación visual.

---

## 2. CloudWatch RUM

**Qué es:** **Real User Monitoring**. Recolecta **datos del lado del cliente** de **sesiones reales de usuario**
en **near real time**.

**Cómo se instala:** se agrega un **snippet de JavaScript** a la **aplicación web**; RUM **captura datos de
performance** mientras los **usuarios reales interactúan** con las páginas.

### 2.1 Qué recolecta

| Dato | Detalle |
| --- | --- |
| **Page load times** | Desglosados por **fase de carga**: **DNS**, **connection**, **first byte**, **content load** |
| **Client-side errors** | **Excepciones de JavaScript** y **requests de red fallidos** |
| **User behavior** | **Rutas de navegación** y **duración de sesión** |
| **Web vitals** | Indicadores de performance como **Core Web Vitals** |

> [!important] Por qué el desglose por fase importa
> “La página tarda 4 s” **no dice nada accionable**. **DNS**, **conexión**, **TTFB** y **carga de contenido**
> apuntan a **causas distintas** (DNS mal configurado, red, backend lento, assets pesados). RUM **separa** esas
> fases.

> [!note] Ampliación (no está en la fuente)
> **RUM** mide **usuarios reales**, así que **no genera tráfico propio** ni garantiza cobertura: si **nadie** usa
> la aplicación a las 3 AM, **no hay datos**. Ese hueco lo cubre **Synthetics**.

---

## 3. Synthetics vs. RUM

| Criterio | **CloudWatch Synthetics** | **CloudWatch RUM** |
| --- | --- | --- |
| **Origen del dato** | **Simula** requests **desde fuera** de la aplicación | **Sesiones reales** de usuario |
| **Schedule** | **Fijo y continuo** | **Continuo, atado al tráfico real** |
| **Sin usuarios** | **Corre igual** (noches, bajo tráfico) | **No hay datos** si no hay sesiones |
| **Condiciones** | **Consistentes y repetibles** | **Diversas**: **móviles, browsers viejos, redes lentas, latencia geográfica** |
| **Mejor para** | **Detectar caídas de inmediato**, **baseline de SLA de disponibilidad**, **probar desde varias ubicaciones**, **verificar salud antes de un deploy** | **Entender el impacto real**, **diagnosticar performance de frontend**, **identificar qué segmentos sufren**, **medir performance real contra los SLOs** |

> [!important] Se complementan, no compiten
> **Synthetics** da **condiciones controladas** (útil para **comparar** y para **SLO de disponibilidad**).
> **RUM** da **la verdad de la experiencia** (útil para **impacto** y para **SLO de experiencia**). Un problema
> **solo de dispositivos viejos** no lo ve un canary; una **caída a las 3 AM** no la ve RUM.

---

## 4. CloudWatch Application Signals

**Qué hace:** **descubre automáticamente** los servicios que corren en la aplicación y **calcula métricas de salud
operativa** **sin instrumentación manual**.

| Aspecto | Detalle |
| --- | --- |
| **Runtimes soportados** | **Java**, **Python**, **Node.js** |
| **Nivel de instrumentación** | **A nivel de infraestructura** |
| **Qué recolecta** | **Latency**, **availability** y **error rate** por **servicio y operación** |
| **Service map** | Muestra **dependencias** e **indicadores de salud** |
| **Drill-down** | **Request volume**, **latency percentiles** y **error rates** por servicio |
| **Propósito principal** | **Soportar SLOs**: provee los **SLIs** que se evalúan contra los **targets de confiabilidad** |

> [!important] El puente entre infraestructura y compromiso
> Application Signals no es “otro dashboard”: su razón de ser es **generar los SLIs** con los que se mide un
> **SLO**. Sin SLIs confiables, el SLO es **una intención**.

> [!note] Ampliación (no está en la fuente)
> La **instrumentación a nivel de infraestructura** implica que **no se agrega código de trazas a mano**, pero
> **sí** se necesita **habilitar** el servicio y **contar con los agentes/permisos** correspondientes. La fuente lo
> presenta como **automático** en los runtimes soportados.

---

## 5. Service-level objectives (SLO)

**Definición:** un **SLO** define un **target de confiabilidad** para un **servicio u operación** específicos.
Responde: **“¿qué nivel de performance nos comprometemos a entregar?”**.

### 5.1 Los tres componentes

| Componente | Qué es | Ejemplo literal |
| --- | --- | --- |
| **Service-level indicator (SLI)** | **La métrica que se mide** | **Porcentaje de requests que completan en menos de 300 ms**, o **porcentaje de requests con respuesta exitosa** |
| **Attainment goal** | **Porcentaje target** de **tiempo o requests** que **debe cumplir el umbral del SLI** | **99,9 %** significa que **99,9 % de los requests** debe cumplir el umbral **dentro de la ventana** |
| **Evaluation window** | **Período** sobre el que se calcula el **attainment** | Típicamente **rolling de 28 días** o **7 días** |

> [!important] SLI, SLO y SLA no son sinónimos
> **SLI** = **la medición** (“% de requests < 300 ms”). **SLO** = **el target interno** (“99,9 % en 28 días”).
> **SLA** = **el contrato con el cliente**, con **consecuencias** si se incumple. La lección **no define SLA**; se
> aclara acá como ampliación.

> [!note] Ampliación (no está en la fuente)
> La fuente dice que la ventana es **“typically rolling 28-day or 7-day”**. En la práctica los SLOs pueden usar
> **ventanas rolling o calendar**, y la elección cambia **cómo se consume** el error budget (una ventana rolling
> **nunca “resetea”** del todo).

---

## 6. Error budgets y burn rate alerts

### 6.1 Error budget

**Definición:** la **cantidad permitida de falta de confiabilidad** dentro de la **evaluation window**.

**Ejemplo literal:** con **attainment goal 99,9 %** sobre **28 días**, queda **0,1 %** de esa ventana —
**aproximadamente 40 minutos** — como **error budget**.

> **Verificación propia:** 0,1 % de 28 días = **0,001 × 28 × 24 × 60 = 40,32 minutos**. Coincide con el
> “approximately 40 minutes” de la fuente.

### 6.2 Burn rate

| Concepto | Detalle |
| --- | --- |
| **Qué mide** | **Qué tan rápido** se consume el error budget **relativo a la ventana** |
| **Burn rate = 1** | Se consume **exactamente al ritmo** que **agotaría el budget al final** de la ventana |
| **Burn rate = 2** | Se agotaría en **la mitad del tiempo** |
| **Quién lo calcula** | **Application Signals** rastrea el consumo y **genera burn rate alerts** |

### 6.3 Por qué las alertas de burn rate son mejores que el umbral simple

| Situación | Qué indica |
| --- | --- |
| **Burn rate alto en poco tiempo** | **Incidente significativo en curso** |
| **Burn rate lento en mucho tiempo** | **Problema crónico de confiabilidad** que hay que atender **antes de que cierre la ventana** |

**Ventaja:** las **burn rate alerts disparan antes** que un simple **incumplimiento del umbral de attainment**.

> [!important] La lógica del burn rate
> Un SLO de **99,9 %** puede **parecer holgado** hasta que se ve **la velocidad** a la que se consume. **Burn
> rate** convierte “cuánto queda” en **“cuánto va a durar”**. Es la diferencia entre **mirar el tanque** y **mirar
> el consumo**.

### 6.4 El ejemplo de la figura

| Dato | Valor |
| --- | --- |
| **Intervalo** | **30 días** |
| **Período** | **1 minuto** |
| **Períodos totales** | **43.200** |
| **Attainment goal** | **99 %** |
| **Períodos que deben ser healthy** | **42.768** (**99 % de 43.200**) |
| **Períodos unhealthy hasta ahora** | **130** |
| **Presupuesto de error implícito** | **432 períodos** (**1 % de 43.200**) |

**La figura:** una **barra de error budget** para una ventana de **30 días**, partida en **consumido (naranja)** y
**restante (verde)**, con el **attainment goal de 99 %** etiquetado.

> [!note] Ampliación (no está en la fuente)
> El ejemplo dice **130 unhealthy** y **no** compara contra los **432** permitidos. Con **99 %**, quedan **302
> períodos** de margen (**432 − 130**), es decir, **consume ~30 % del budget**. El cálculo es propio; la fuente
> solo da **43.200**, **42.768** y **130**.

---

## 7. Cómo encaja todo

| Capacidad | Qué aporta |
| --- | --- |
| **CloudWatch Synthetics** | **Detecta problemas antes que los usuarios** y da **mediciones baseline consistentes** para los **SLIs** |
| **CloudWatch RUM** | Muestra **el impacto real en usuarios** y **expone problemas que los tests sintéticos no anticipan** |
| **Application Signals** | **Sigue el attainment del SLO** y **alerta cuando el error budget está en riesgo**, conectando **salud de infraestructura** con **compromisos de confiabilidad de cara al usuario** |

> [!important] El orden mental
> **Synthetics** = **¿está disponible y responde bien?** · **RUM** = **¿cómo lo vive el usuario?** ·
> **Application Signals + SLO** = **¿estamos cumpliendo lo prometido y a qué velocidad lo estamos perdiendo?**

---

## 8. Key takeaways (literales)

1. Los **canaries prueban endpoints de forma proactiva** en un **schedule**. Usá **heartbeat canaries** para
   **chequeos de disponibilidad** y **API canaries** para **validación de respuestas**.
2. **CloudWatch RUM** captura **datos de sesiones reales**, reflejando **la diversidad real de experiencia** entre
   **dispositivos, browsers y condiciones de red**.
3. **Application Signals** **descubre servicios automáticamente** y provee los **SLIs** necesarios para **evaluar
   los targets de confiabilidad**.
4. Los **SLOs** definen un **target de confiabilidad** con un **SLI**, un **attainment goal** y una **evaluation
   window**. Los **error budgets** y las **burn rate alerts** dan **aviso temprano antes** de que se **incumpla**
   el SLO.

> [!note] La lección no trae Knowledge Check
> Cierra con **cuatro key takeaways**, sin self-check ni rationale.

### 8.1 Repaso propio (no está en la fuente)

> [!note] Ampliación (no está en la fuente)
> Cinco preguntas de control:

| # | Pregunta | Respuesta |
| --- | --- | --- |
| **1** | ¿Qué canary usarías para detectar **200 con datos incorrectos**? | **API canary** |
| **2** | ¿Qué monitoreo **no** sirve a las 3 AM sin usuarios? | **RUM** (necesita sesiones reales) |
| **3** | ¿Cuáles son los **tres componentes** de un SLO? | **SLI**, **attainment goal**, **evaluation window** |
| **4** | ¿Qué significa **burn rate = 2**? | Se agota el budget en **la mitad** de la ventana |
| **5** | ¿Qué servicio genera los **SLIs** automáticamente? | **Application Signals** |

---

## 9. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 9.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Synthetics y canaries** | **3.1** Excelencia operativa · **1.3 / 2.4** confiabilidad |
| **RUM y experiencia real** | **3.1** |
| **Application Signals y SLIs** | **3.1** · **1.3 / 2.4** |
| **SLO, error budget y burn rate** | **3.1** · **1.3 / 2.4** |
| **Alertas tempranas** | **3.1** · **2.3** controles |

### 9.2 Diez puntos para llevarse

1. **Canary** = **script programado** que **simula** requests; corre **aunque no haya usuarios**.
2. **Heartbeat** = **disponibilidad** de URLs críticas; **latency**, **status codes** y **screenshots**.
3. **API canary** = **valida body, headers y status**; detecta **200 con datos malos**.
4. **RUM** = **JavaScript snippet**; **sesiones reales**; **page load por fase** (**DNS, connection, TTFB,
   content**), **errores JS**, **navegación**, **Core Web Vitals**.
5. **Synthetics vs. RUM**: **controlado y constante** vs. **real y diverso**.
6. **Application Signals**: **Java, Python, Node.js**, **infra-level**, **service map** y **SLIs** por
   **operación**.
7. **SLO** = **SLI + attainment goal + evaluation window**.
8. **Error budget** = **100 % − attainment goal**; **99,9 % en 28 días ≈ 40 min**.
9. **Burn rate 1** = se agota **al final**; **2** = **a la mitad**; las alertas **llegan antes** del breach.
10. **Ejemplo**: **30 días = 43.200 min**; **99 % = 42.768 healthy**; **130 unhealthy**.

### 9.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Los canaries necesitan tráfico real” | **Simulan** requests; corren **sin usuarios** |
| “Heartbeat valida el body” | Valida **disponibilidad**; el body es del **API canary** |
| “HTTP 200 = todo bien” | Puede devolver **datos incorrectos**; hace falta **API canary** |
| “RUM funciona sin usuarios” | Necesita **sesiones reales** |
| “RUM mide infraestructura” | Mide **cliente**: page load, errores JS, web vitals |
| “Application Signals requiere instrumentar a mano” | **Descubre automáticamente** en runtimes soportados |
| “Un SLO es el SLA” | El **SLA** es **contrato**; el **SLO** es **target interno** |
| “El SLO es solo un porcentaje” | Necesita **SLI + goal + ventana** |
| “El error budget de 99,9 % son 40 horas” | Son **~40 minutos** en **28 días** |
| “Burn rate 2 agota al final” | Agota en **la mitad** del tiempo |
| “La alerta de attainment es lo más temprano” | **Burn rate** avisa **antes** |

> [!note] Ampliación (no está en la fuente)
> Tres atajos:
> **“¿Está arriba?”** → **heartbeat canary** ·
> **“¿Devuelve lo correcto?”** → **API canary** ·
> **“¿Cómo lo vive el usuario?”** → **RUM** ·
> **“¿Cumplimos el compromiso?”** → **SLO + error budget + burn rate**.

---

## 10. Traducción del contenido

### 10.1 Pruebas proactivas con CloudWatch Synthetics

**Monitorear métricas y logs de infraestructura** te dice **qué están haciendo tus sistemas**. **Medir lo que
experimentan tus usuarios** requiere **un enfoque distinto**. Un servicio puede **parecer saludable desde la
perspectiva de infraestructura** mientras los usuarios **encuentran cargas lentas de página, transacciones
fallidas o funcionalidad degradada**. El **monitoreo sintético** y el **real user monitoring** **cierran esa
brecha**.

**CloudWatch Synthetics** te permite crear **canaries** —**scripts configurables que corren en un schedule** para
**probar tus endpoints y workflows**. A diferencia del **monitoreo reactivo** que **dispara después** de que un
**usuario real encuentra un problema**, los canaries **simulan requests de forma proactiva antes** de que lleguen
los usuarios.

Un **canary** corre en un **intervalo definido** (por ejemplo, **cada minuto** o **cada cinco minutos**) y
**reporta resultados de availability y latency** a **métricas de CloudWatch**. Cuando un canary **detecta una
falla**, **dispara una alarma de CloudWatch**. Tu **equipo on-call se entera de un problema por un canary** en
lugar de **por el reclamo de un usuario**.

**Heartbeat monitoring**

Un **heartbeat canary** hace **requests HTTP** a **una o más URLs** y **chequea respuestas esperadas**. Registra
**availability** (**up o down**), **latency** y **HTTP status codes**. También puede **capturar screenshots de
páginas web** para **comparación visual en el tiempo**.

Usá **heartbeat monitoring** para **verificar que URLs críticas sigan siendo alcanzables**: **login pages**,
**checkout flows**, **API health endpoints** y **cualquier URL de la que dependan los clientes**. Un **heartbeat
canary para tu payment API con intervalos de un minuto** te dice **de inmediato** si **el endpoint deja de
responder**, **antes de que lleguen los tickets de soporte**.

**API monitoring**

Un **API canary** hace **llamadas API estructuradas** y **valida el response body, los headers y los status
codes**. Puede **autenticarse con tu API**, **enviar test payloads** y **verificar que los datos devueltos
coincidan con los valores esperados**.

Usá **API monitoring** cuando **la disponibilidad sola es insuficiente**. Un servicio puede **devolver HTTP 200**
y **devolver datos incorrectos**. Los **API canaries** atrapan **errores de lógica**, **fallas de integración** y
**problemas de calidad de datos** que **un chequeo simple de disponibilidad no ve**.

### 10.2 CloudWatch RUM

**CloudWatch RUM (Real User Monitoring)** recolecta **datos del lado del cliente** de **sesiones reales de
usuario** en **near real time**. Agregás un **snippet de JavaScript** a tu **aplicación web** y **CloudWatch RUM
captura datos de performance** mientras **los usuarios reales interactúan** con tus páginas.

**CloudWatch RUM recolecta:**

- **Page load times** desglosados por **fase de carga** (**DNS**, **connection**, **first byte**, **content
  load**).
- **Client-side errors**, incluidas **excepciones de JavaScript** y **requests de red fallidos**.
- **User behavior**, incluidas **rutas de navegación** y **duración de sesión**.
- **Web vitals**, como **indicadores de performance Core Web Vitals**.

### 10.3 Comparar monitoreo sintético y real user monitoring

**CloudWatch Synthetics (Synthetic Monitoring)**

**Simula requests desde fuera** de tu aplicación en un **schedule fijo**. Corre **continuamente incluso cuando no
hay usuarios reales**, útil para **detectar problemas de noche o en períodos de bajo tráfico**. Genera
**condiciones de test consistentes y repetibles**.

**Mejor para:** **detectar caídas de inmediato**, **establecer baselines de SLA de disponibilidad**, **probar desde
múltiples ubicaciones geográficas**, **verificar la salud del endpoint antes de los deployments**.

**CloudWatch RUM (Real User Monitoring)**

**Captura datos de sesiones reales** a través de **browsers, dispositivos y condiciones de red reales**. Refleja
**la verdadera diversidad de experiencia** que encuentran tus usuarios: **dispositivos móviles, browsers viejos,
conexiones lentas, latencia geográfica**.

**Mejor para:** **entender el impacto real en el usuario**, **diagnosticar problemas de performance de frontend**,
**identificar qué segmentos de usuarios experimentan problemas**, **medir performance real contra los SLOs**.

### 10.4 Application Signals

**CloudWatch Application Signals** **descubre automáticamente los servicios** que corren en tu aplicación y
**calcula métricas de salud operativa** **sin requerir instrumentación manual**. **Instrumenta runtimes
soportados** (**Java, Python, Node.js**) **a nivel de infraestructura**, recolectando **datos de latency,
availability y error rate** para **cada servicio y operación**.

**Application Signals** muestra estos datos en un **service map** que muestra **dependencias e indicadores de
salud**. **Drilleás en cualquier servicio** para ver su **request volume**, **latency percentiles** y **error
rates**.

El **propósito principal de Application Signals** es **soportar service-level objectives**. Provee los
**service-level indicators (SLIs)** que **evaluás contra tus reliability targets**.

### 10.5 Service-level objectives

Un **service-level objective (SLO)** define un **reliability target** para un **servicio u operación**
específicos. Responde la pregunta: **“¿qué nivel de performance nos comprometemos a entregar?”**.

Un **SLO** tiene **tres componentes**:

- **Service-level indicator (SLI):** **la métrica que medís**. Por ejemplo: **el porcentaje de requests que
  completan en menos de 300 milisegundos**, o **el porcentaje de requests que devuelven una respuesta exitosa**.
- **Attainment goal:** **el porcentaje target de tiempo o requests** que **debe cumplir el umbral del SLI**. Por
  ejemplo, un **attainment goal de 99,9 %** significa que **99,9 % de los requests debe cumplir el umbral dentro
  de la evaluation window**.
- **Evaluation window:** **el período de tiempo** sobre el cual se **calcula el attainment** —**típicamente una
  ventana rolling de 28 días o de 7 días**.

### 10.6 Error budgets y burn rate alerts

Un **error budget** es **la cantidad permitida de falta de confiabilidad** dentro de tu **evaluation window**. Si
tu **attainment goal es 99,9 %** sobre **28 días**, tenés **0,1 %** de esa ventana —**aproximadamente 40
minutos**— disponibles como **error budget**.

**Application Signals** **rastrea el consumo del error budget** y **genera burn rate alerts**. Un **burn rate**
mide **qué tan rápido se está consumiendo el error budget** **relativo a la ventana**. Un **burn rate de 1**
significa que **estás consumiendo el budget exactamente al ritmo que lo agotaría al final** de la ventana. Un
**burn rate de 2** significa que **agotarás el budget en la mitad del tiempo**.

Las **burn rate alerts disparan antes** que un **simple incumplimiento del umbral de attainment**. Un **burn rate
alto durante un período corto** indica **un incidente significativo en curso**. Un **burn rate lento durante un
período largo** indica **un problema crónico de confiabilidad** que **necesita atención antes de que la ventana
se cierre**.

**La figura** ilustra los conceptos de **attainment y error budget** para un goal con **intervalo de 30 días**,
**períodos de 1 minuto** y un **attainment goal de 99 %**. **30 días incluyen 43.200 períodos de 1 minuto**. **99 %
de 43.200 es 42.768**, así que **42.768 minutos durante el mes deben ser healthy** para que **el SLO se cumpla**.
**Hasta ahora, en el intervalo actual, 130 de los períodos de 1 minuto fueron unhealthy**.

### 10.7 Putting it together

Estas **tres capacidades** trabajan **juntas** para darte **una imagen completa de la experiencia de usuario**:

- **CloudWatch Synthetics** **detecta problemas antes que los usuarios** y provee **mediciones baseline
  consistentes** para tus **SLIs**.
- **CloudWatch RUM** muestra **el impacto real en los usuarios** y **expone problemas que los tests sintéticos
  pueden no anticipar**.
- **Application Signals** **sigue el attainment del SLO** y **alerta cuando los error budgets están en riesgo**,
  **conectando la salud de infraestructura** con **compromisos de confiabilidad de cara al usuario**.

### 10.8 Key takeaways

Repasá los **puntos clave**:

- Los **canaries prueban endpoints proactivamente** en un **schedule**. Usá **heartbeat canaries** para
  **chequeos de disponibilidad** y **API canaries** para **validación de respuestas**.
- **CloudWatch RUM** captura **datos de sesiones reales**, reflejando **la diversidad real de experiencia** entre
  **dispositivos, browsers y condiciones de red**.
- **Application Signals** **descubre servicios automáticamente** y provee los **SLIs** necesarios para **evaluar
  tus reliability targets**.
- Los **SLOs** definen un **reliability target** con un **SLI**, un **attainment goal** y una **evaluation
  window**. Los **error budgets** y las **burn rate alerts** dan **aviso temprano antes** de que **se incumpla**
  un **SLO**.

---

## 11. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: Synthetics, RUM, Application Signals, SLO, error budget y burn rate | Nota completa (secciones 1–10) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La lección no trae Knowledge Check.** Cierra con **cuatro key takeaways**; no hay rationale oficial. El
   **repaso de §8.1 es propio**.
2. **SLO vs. SLA.** La fuente **no define SLA** ni distingue **SLO interno** de **compromiso contractual**. Se
   agrega la distinción como **ampliación** en §5.1.
3. **Ventana “typically 28-day or 7-day”.** Es una **simplificación**: existen ventanas **rolling** y
   **calendar**. Se transcribe literal y se aclara en §5.1.
4. **Application Signals “sin instrumentación manual”.** Se transcribe, pero **requiere habilitación y
   permisos**; se aclara en §4 (ampliación).
5. **El ejemplo de la figura no cierra el cálculo.** Da **43.200** períodos, **42.768** healthy y **130**
   unhealthy, pero **no** calcula el **budget restante** (**432 permitidos − 130 consumidos = 302**). El cálculo es
   **propio** y está marcado en §6.4.
6. **“Burn rate alerts fire earlier”.** Es correcto como **concepto**, pero depende de **umbrales configurados**;
   la fuente no da **ventanas ni multiplicadores** de burn rate.
7. **Canaries tipo UI.** La lección menciona **screenshots** pero **no** los **UI canaries**; se agrega como
   ampliación en §1.2.
8. **Imágenes no disponibles.** La lectura referencia **una** captura (`A3D8PFAVSN.png`) que **no está en el
   vault**.

**Decisiones de transcripción:**

- Se conservan **canary**, **heartbeat**, **API canary**, **RUM**, **near real time**, **web vitals**,
  **Application Signals**, **service map**, **SLI**, **attainment goal**, **evaluation window**,
  **error budget** y **burn rate**.
- Los **números** se transcriben literales: **1 minuto**, **5 minutos**, **300 ms**, **99,9 %**, **28 días**,
  **~40 minutos**, **30 días**, **43.200**, **42.768**, **130**, **99 %**, **burn rate 1 y 2**.
- Los **runtimes** se conservan exactos: **Java**, **Python**, **Node.js**.
- **No se agregaron** tarifas, cuotas ni multiplicadores de burn rate que la fuente no da.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Distributed Tracing for Microservices]] — lección anterior: X-Ray, ADOT y sampling
- [[Designing Observability Solutions]] — tres pilares, EMF, Logs Insights y composite alarms
- [[Detective Controls]] — Config, GuardDuty y Security Hub
- [[3.1 Estrategia para mejorar la excelencia operativa general]] — la tarea principal de este bloque
- [[1.3 Diseñar arquitecturas fiables y resistentes]] · [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
