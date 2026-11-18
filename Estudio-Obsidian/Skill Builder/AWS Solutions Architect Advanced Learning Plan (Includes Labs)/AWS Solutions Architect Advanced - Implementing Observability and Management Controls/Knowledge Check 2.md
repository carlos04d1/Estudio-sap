---
title: "Knowledge Check 2"
aliases:
  - "Knowledge Check de costos"
  - "Knowledge Check del módulo (costos)"
  - "Evaluación de costos"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - evaluacion
  - costos
  - finops
status: completado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Knowledge Check (cierre de costos)"
---

# Knowledge Check 2

> [!abstract] Qué es este archivo
> **Segundo Knowledge Check del módulo** (el primero fue [[Knowledge Check]], tras [[Cloud Governance Pillars]]).
> Este evalúa el **bloque de costos**: [[Cloud Cost Management]], [[Cost Management Tools]] y
> [[Cost Optimization]].
>
> Son **2 escenarios × “elegir 3”**, sin conceptos nuevos. La lógica es la misma de todo el módulo:
> **elegir la combinación que cubre varias capas** y descartar las opciones con **un anti-patrón**.
>
> **Resultado:** el intento se rindió con **2/2** y ambas preguntas quedaron **“Correct!”**. Las **rationales**
> que devolvió la plataforma **no corresponden a estas preguntas** (hablan de S3 Glacier, Storage Gateway y
> Snowball): se transcriben literalmente y se marcan como **defecto de la fuente** en §1.3 y §2.3.

> [!tip] Cómo usarla
> Tapá la tabla de respuestas, contestá, y después leé el análisis. Fijate sobre todo en **los verbos**:
> *proactive*, *prevent*, *before the bill*. Las opciones correctas **anticipan**; las incorrectas **reaccionan**
> tarde o **sobrecomprometen**.

---

## 🎯 Respuestas confirmadas

| # | Escenario | Respuesta |
| --- | --- | --- |
| **1** | Enterprise: presupuesto trimestral vs. costos variables | **A, B, E** ✅ |
| **2** | E-commerce multi-equipo y multi-región: picos no detectados | **B, C, D** ✅ |

> [!success] Resultado del intento
> **26/10/2026 — 2 de 2 correctas** en Skill Builder, con **“Correct!”** en ambas.
> Las combinaciones elegidas coinciden con las que analiza esta nota.
>
> ⚠️ Las **rationales oficiales no son coherentes con las preguntas** (describen clases de S3, Storage Gateway y
> Snowball). El resultado **sí** es válido; las explicaciones se conservan literales en §1.3 y §2.3 y **no se usan**
> para justificar las respuestas.

---

## 1. Enterprise: adaptar el proceso financiero

> **Pregunta:** un cliente enterprise pasa de on-premises a AWS y **le cuesta su proceso de presupuesto
> trimestral**. Al CFO le preocupa **el costo mensual variable** frente al **modelo de costo fijo** tradicional.
> ¿Cómo ayudarlo a **adaptar sus procesos financieros** al gasto en la nube? **(elegir 3)**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A. Organizations con linked accounts para billing por departamento + Cost Explorer para forecasting + revisiones semanales** | ✅ | **Estructura de cuentas** que refleja la organización, **pronóstico** con Cost Explorer y **cadencia semanal** acorde a un gasto que cambia mes a mes |
| **B. Cost anomaly detection + pay-as-you-go para workloads variables + RI/Savings Plans para workloads estables** | ✅ | **Detección automática** + **modelo de consumo** para lo variable + **compromiso** solo donde el uso es **estable** |
| **C. Revisiones mensuales + RI para el 90 % de los workloads + TCO detallado por departamento** | ❌ | El **90 % en RI** es **sobrecompromiso**: si el uso cambia, pagás capacidad que no usás. Los otros dos componentes son buenos, pero la opción **no se salva** |
| **D. Ciclos trimestrales con 20 % de buffer + chargeback por tagging + aprobación gerencial al exceder el forecast** | ❌ | **Mantiene el ciclo trimestral**, que es exactamente lo que hay que cambiar. El **buffer** no reemplaza la **cadencia** |
| **E. Billing alarms con notificaciones automáticas + cost allocation tags + AWS Budgets para monitoreo proactivo** | ✅ | **Alertas**, **asignación** y **presupuestos**: las tres capas de **visibilidad proactiva** |
| **F. Cuentas dedicadas por cost center + cuotas estrictas según uso histórico + procesos de billing separados para OpEx y CapEx** | ❌ | Las **cuotas por historia** no siguen la demanda y **OpEx/CapEx separados** perpetúa el modelo equivocado: en la nube el gasto es **operativo y variable** |

> [!important] El eje de la pregunta
> No es “cómo gastar menos”: es **cómo cambiar el proceso**. La nube exige **ciclos más cortos** (semanal, no
> trimestral), **pronóstico continuo**, **asignación por tags** y **respuesta automática**. Todo lo que **fije el
> gasto a un pronóstico anual** es el anti-patrón.

### 1.1 Conceptos que confirma

| Concepto | Detalle |
| --- | --- |
| **Linked accounts / Organizations** | Permiten **billing por departamento** y **consolidated billing** |
| **Cost Explorer** | **Pronóstico** y análisis de tendencia |
| **Cost allocation tags** | Traducen gasto a **departamentos y proyectos** |
| **AWS Budgets** | **Monitoreo proactivo** con umbrales |
| **Billing alarms** | Alerta sobre **cargo estimado** (no solo sobre presupuesto) |
| **Anomaly detection** | Detecta **desvío** sin umbral definido |
| **RI / Savings Plans** | Solo para **uso estable**; no para todo el parque |

> [!note] Ampliación (no está en la fuente)
> **CloudWatch billing alarms** son una alarma sobre la métrica **EstimatedCharges**, que vive **solo en
> us-east-1**. Es distinta de **AWS Budgets**: la alarma es un **umbral simple de cargo**; Budgets permite
> **cost/usage/RI/SP**, **acciones** y **pronóstico**. En el examen, si piden **“alerta simple de factura”**,
> alcanza con la alarma; si piden **“control proactivo con acciones”**, es **Budgets**.

### 1.2 Por qué A, B y E se complementan

```
A  estructura + forecast + cadencia   →  mirar el futuro
B  pricing correcto + detección       →  pagar lo justo
E  alarmas + tags + budgets           →  enterarse a tiempo
```

Las tres cubren **dimensiones distintas**: **organización**, **modelo de compra** y **control operativo**. Las
incorrectas fallan en **una** de esas dimensiones y arrastran a las otras.

### 1.3 Rationales oficiales (no coinciden con la pregunta)

La plataforma devolvió **dos rationales** para esta pregunta:

> **Rationale 1:** *“S3 Glacier Deep Archive está diseñado para **archivado de datos de largo plazo** al **menor
> costo**, ideal para datos a los que **rara vez se accede** y que **toleran tiempos de recuperación de 12 a 48
> horas**.”*
>
> **Rationale 2:** *“S3 Standard está diseñado para **datos de acceso frecuente** y tiene **costos más altos** en
> comparación con Glacier Deep Archive.”*

> [!warning] Defecto de la fuente
> **Ninguna de las dos** explica por qué **A, B y E** son correctas. Hablan de **clases de almacenamiento de S3**,
> un tema que **no aparece en las opciones** de esta pregunta. Parecen **rationales de otra pregunta** (probablemente
> del bloque de storage de [[Cost Optimization]]).
>
> **Cómo lo traté:** se transcriben **literales** para no perder la fuente, pero **no se presentan como
> justificación**. El análisis válido es el de §1.1 y §1.2, construido sobre las opciones y las lecciones del
> módulo.

> [!note] Ampliación (no está en la fuente)
> Para referencia: **Glacier Deep Archive** es la clase **más barata** de S3, con recuperación estándar de **12
> horas** (y hasta **48 h** en las opciones más lentas). **S3 Standard** es para acceso frecuente y **cuesta más
> por GB almacenado**. Eso es correcto **como dato aislado**, pero **irrelevante** para esta pregunta de proceso
> financiero.

---

## 2. E-commerce: estrategia proactiva multi-equipo y multi-región

> **Pregunta:** un cliente de **e-commerce** tiene **varios equipos de desarrollo** desplegando en **tres
> regiones**. El mes pasado tuvo **picos de costo inesperados** que **no se detectaron hasta la factura mensual**.
> Diseñá una **estrategia proactiva** con herramientas de AWS para **prevenir** esa situación. **(elegir 3)**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A.** Dashboards de Cost Explorer por equipo + revisiones semanales + tagging detallado con **chequeos manuales** de compliance | ❌ | Los **chequeos manuales** no son **proactivos** ni escalan a **tres regiones y varios equipos** |
| **B. Reportes custom de Cost Explorer por equipo/proyecto + Budget Actions con respuesta automática + métricas de CloudWatch para utilización** | ✅ | **Visibilidad segmentada**, **respuesta automática** y **uso real** monitoreado |
| **C. Organizations para consolidated billing + CUR para análisis detallado + tag policies automatizadas** | ✅ | **Estructura**, **detalle** y **estandarización automática** del tagging: la base para que los reportes sean confiables |
| **D. Budgets con umbrales 50/75/90 % + Cost Anomaly Detection con EventBridge + Cost Explorer para seguimiento diario** | ✅ | **Umbrales tempranos**, **detección de anomalías** y **seguimiento diario**: exactamente lo que faltaba cuando el pico llegó con la factura |
| **E.** Cuentas separadas por equipo con alertas individuales + CloudWatch + revisiones **mensuales** de optimización | ❌ | **Mensual** es el mismo tiempo de reacción que falló. La detección tiene que ser **antes** de la factura |
| **F.** IAM estricto + estimaciones de costo por deployment + Organizations consolidated billing **sin controles automatizados** | ❌ | La propia opción dice **“without automated controls”**: previene creación, pero **no detecta** un pico que ya está ocurriendo |

> [!important] El eje de la pregunta
> *“No se detectaron hasta la factura mensual”* es el requisito disfrazado: la solución tiene que **detectar y
> actuar antes del cierre**. Todo lo que dependa de **revisión manual**, **cadencia mensual** o **ausencia de
> automatización** queda fuera, por más razonable que suene.

### 2.1 Las tres capas de la estrategia

| Capa | Opción | Qué aporta |
| --- | --- | --- |
| **Datos confiables** | **C** | **Organizations** + **CUR** + **tag policies** |
| **Visibilidad y acción** | **B** | Reportes por equipo + **Budget Actions** + **CloudWatch** |
| **Detección temprana** | **D** | **Budgets 50/75/90** + **Anomaly Detection** + **EventBridge** |

> [!tip] Por qué no alcanza con “tener Cost Explorer”
> Cost Explorer **muestra**; no **avisa** ni **actúa**. La cadena proactiva es
> **medir (CUR/Cost Explorer) → alertar (Budgets/Anomaly) → actuar (Budget Actions/EventBridge)**.

### 2.2 Qué hace cada servicio en este escenario

| Servicio | Rol |
| --- | --- |
| **AWS Organizations** | **Consolidated billing** y gobierno multi-cuenta |
| **AWS Cost and Usage Report** | Detalle para **atribuir** el gasto a equipo/proyecto/región |
| **Cost Explorer** | **Reportes custom** y seguimiento **diario** |
| **AWS Budgets** | **Umbrales 50/75/90 %** por equipo/proyecto |
| **Budget Actions** | **Respuesta automática** (IAM/SCP/EC2-RDS) al exceder |
| **Cost Anomaly Detection** | **ML** que detecta picos **sin umbral** definido |
| **Amazon EventBridge** | **Enruta** la anomalía a **Lambda/SNS** para remediar o notificar |
| **Amazon CloudWatch** | **Métricas de utilización** para explicar el pico |
| **Tag policies** | **Estandarizan** el tagging en las tres regiones |

> [!note] Ampliación (no está en la fuente)
> La integración **Cost Anomaly Detection → EventBridge** permite reaccionar **automáticamente** (por ejemplo,
> invocar una **Lambda** que notifique a Slack o frene un pipeline). La lección de [[Cost Optimization]] describe
> la detección y las suscripciones, pero **no** detalla el enrutamiento por EventBridge: eso aparece en la opción
> **D** y es correcto en AWS.

### 2.3 Rationales oficiales (no coinciden con la pregunta)

La plataforma devolvió **tres rationales** para esta pregunta:

> **Rationale 1:** *“**Storage Gateway** es un **servicio de almacenamiento híbrido** que da **acceso on-premises**
> a almacenamiento en la nube **prácticamente ilimitado**, pero **no mueve datos automáticamente entre tiers**.”*
>
> **Rationale 2:** *“**Snowball** es una **solución de transporte de datos a escala de petabytes** que usa
> **dispositivos seguros** para mover grandes volúmenes de datos **hacia y desde AWS**.”*
>
> **Rationale 3:** *“**S3 Intelligent-Tiering** mueve **automáticamente** datos entre **dos access tiers** según
> **patrones de acceso cambiantes**, optimizando costos de almacenamiento.”*

> [!warning] Defecto de la fuente
> Las tres rationales son **correctas como definiciones** y **completamente ajenas** a la pregunta: no mencionan
> **Budgets**, **Cost Anomaly Detection**, **EventBridge**, **CUR**, **Organizations** ni **tag policies**.
> Parecen pertenecer a una pregunta de **storage híbrido / transferencia de datos** de otro módulo.
>
> **Cómo lo traté:** se transcriben **literales**, sin borrarlas, y se marcan como **no aplicables**. La
> justificación de **B, C y D** sigue siendo la de §2.1 y §2.2.

> [!note] Ampliación (no está en la fuente)
> Los tres datos son útiles para el examen **por separado**: **Storage Gateway** = híbrido con acceso on-premises;
> **Snowball** = transferencia física a escala de **petabytes**; **S3 Intelligent-Tiering** = movimiento
> automático entre tiers por patrón de acceso. Pero **ninguno** responde “cómo detectar un pico de costo antes de
> la factura”.

---

## 3. Lo que enseñan las dos preguntas

### 3.1 La estructura común

| Pregunta | Capa 1 | Capa 2 | Capa 3 |
| --- | --- | --- | --- |
| **1 — Enterprise** | **Estructura** (Organizations, linked accounts) | **Modelo de compra** (pay-as-you-go + RI/SP donde corresponde) | **Control** (tags, Budgets, alarmas, revisión semanal) |
| **2 — E-commerce** | **Datos** (CUR, tag policies, Organizations) | **Visibilidad** (Cost Explorer, CloudWatch) | **Detección y acción** (Budgets, Anomaly Detection, EventBridge, Budget Actions) |

> **Regla de examen:** si el enunciado describe **un síntoma de proceso** (“no lo vimos hasta la factura”,
> “presupuesto trimestral”), la respuesta correcta **cambia el proceso**: **cadencia más corta + automatización +
> asignación**.

### 3.2 Anti-patrones que aparecen

| Anti-patrón | Por qué está mal |
| --- | --- |
| **RI para el 90 % de los workloads** | Sobrecompromiso: el uso variable queda pagado y ocioso |
| **Mantener ciclos trimestrales** | Es el problema que se quiere resolver |
| **Buffer del 20 % como solución** | Un colchón no reemplaza **visibilidad ni cadencia** |
| **Cuotas basadas en uso histórico** | La demanda nueva no respeta la historia |
| **Separar OpEx y CapEx** | En la nube el gasto es **operativo y variable** |
| **Chequeos manuales de tagging** | No escalan ni son proactivos |
| **Revisiones mensuales** | Llegan **después** del pico |
| **Consolidated billing “sin controles automatizados”** | Factura junta, pero **no detecta** nada |
| **Solo IAM/estimaciones** | Previene creación, no detecta **desvío** |

### 3.3 Checklist

- [ ] Puedo explicar por qué **90 % en RI** es un anti-patrón aun cuando las RI sean una buena herramienta.
- [ ] Distingo **RI/Savings Plans** (compromiso para uso estable) de **pay-as-you-go** (flexibilidad).
- [ ] Sé por qué **trimestral** y **mensual** son demasiado lentos para un gasto variable.
- [ ] Puedo nombrar **tres capas** de una estrategia proactiva: **datos · visibilidad · acción**.
- [ ] Distingo **Budgets** (umbral definido) de **Cost Anomaly Detection** (sin umbral).
- [ ] Sé qué agrega **EventBridge** a una detección de anomalías.
- [ ] Reconozco **“manual”**, **“mensual”** y **“sin automatización”** como señales de distractor.
- [ ] Puedo explicar por qué **tag policies** son prerequisito de reportes confiables.

---

## 4. Traducción del contenido

### 4.1 Introducción

Usá este **knowledge check** para **repasar conceptos de este módulo**. Tus resultados podrían **identificar
temas para revisar más a fondo**.

### 4.2 Pregunta 1

Tu **cliente enterprise** está **pasando de on-premises a AWS** y **le cuesta su proceso actual de presupuesto
trimestral**. Al **CFO** le preocupa el **costo mensual variable** frente a su **modelo tradicional de costo
fijo**. ¿Cómo **ayudarías a la organización a adaptar sus procesos financieros** al gasto en la nube?
**(Elegí 3.)**

**A.** Configurar **AWS Organizations con linked accounts** para **billing a nivel de departamento**, implementar
**Cost Explorer** para **pronóstico de gasto** y establecer **revisiones semanales de costos**.

**B.** Configurar **detección automática de anomalías de costos**, usar **pay-as-you-go** para **workloads
variables** e implementar **RI/Savings Plans** para **workloads estables**.

**C.** Implementar **revisiones mensuales de costos con los líderes de departamento**, comprar **Reserved
Instances para el 90 % de los workloads** y crear **reportes TCO detallados** comparando on-premises con nube
**por departamento**.

**D.** Configurar **ciclos de presupuesto trimestrales con 20 % de buffer** para costos variables, implementar
**chargeback mediante tagging detallado** y **requerir aprobación gerencial** para recursos que **excedan el
gasto pronosticado**.

**E.** Crear **billing alarms con notificaciones automáticas**, implementar **cost allocation tags** y usar
**AWS Budgets** para **monitoreo proactivo**.

**F.** Crear **cuentas dedicadas de AWS por cost center**, implementar **cuotas estrictas de recursos basadas en
uso histórico** y mantener **procesos de billing separados** para **gastos OpEx y CapEx**.

### 4.3 Pregunta 2

Tu **cliente de e-commerce** tiene **múltiples equipos de desarrollo** desplegando recursos en **tres regiones de
AWS**. El mes pasado experimentaron **picos de costo inesperados** que **no se detectaron hasta que llegó la
factura mensual**. Diseñá una **estrategia proactiva de gestión de costos** con herramientas de AWS que **evite
esa situación**. **(Elegí 3.)**

**A.** Configurar **dashboards de Cost Explorer por equipo**, implementar **revisiones semanales de costos con los
líderes de equipo** y configurar **tagging detallado de recursos con chequeos manuales de compliance**.

**B.** Crear **reportes custom de Cost Explorer por equipo/proyecto**, configurar **Budget Actions para respuesta
automática** y usar **métricas de CloudWatch** para **seguimiento de utilización de recursos**.

**C.** Configurar **AWS Organizations para consolidated billing**, usar **AWS Cost and Usage Reports** para
**análisis detallado** e implementar **tag policies automatizadas**.

**D.** Implementar **AWS Budgets con umbrales de alerta al 50 %, 75 % y 90 %**, usar **Cost Anomaly Detection con
integración de EventBridge** y configurar **Cost Explorer para seguimiento diario**.

**E.** Crear **cuentas de AWS separadas por equipo de desarrollo** con **alertas de billing individuales**, usar
**métricas de CloudWatch** para **monitoreo de recursos** y **programar revisiones mensuales de optimización de
costos**.

**F.** Implementar **políticas IAM estrictas para creación de recursos**, **requerir estimaciones de costo para
todos los deployments** y usar **AWS Organizations para consolidated billing sin controles automatizados**.

---

## 5. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Knowledge Check de cierre del bloque de costos: 2 escenarios × “elegir 3” | Nota completa con análisis y respuestas propuestas |
| 26/10/2026 | **Resultado: 2/2** + **“Correct!”** en ambas + **5 rationales oficiales** (desalineadas) | Bloque de resultado, §1.3 y §2.3 |

**Pendiente:**

- [x] **Registrar el resultado del intento** → **2/2 (26/10/2026)**.
- [x] **Confirmar las rationales oficiales** → llegaron, pero **no corresponden a estas preguntas** (defecto de la
      plataforma registrado en §1.3 y §2.3).
- [ ] **Confirmar si el módulo cierra** con este Knowledge Check o si quedan lecciones/lab.

**Decisiones de transcripción:**

- **Nombre del archivo:** el módulo ya tiene un `Knowledge Check.md` ([[Knowledge Check]]). Para **no
  sobrescribirlo**, este se guarda como **`Knowledge Check 2`**, con el alias **“Knowledge Check de costos”**.
- “**linked accounts**” se conserva: es la fórmula de la fuente (hoy se asocia a **cuentas miembro** de
  Organizations).
- “**SecurityHub**”, “**Cost Explorer**”, “**Reserved Instances**” y “**Savings Plans**” se normalizaron a sus
  nombres de servicio.
- Las opciones **no se corrigen**: los anti-patrones se conservan tal como aparecen.
- Las **rationales desalineadas** se transcriben **literales** (no se borran ni se “arreglan”), con una advertencia
  explícita de que **no explican** las opciones correctas de estas preguntas.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Knowledge Check]] — primer check del módulo (3/3)
- [[Cloud Cost Management]] — marco de costos, 4 etapas y 7 pasos
- [[Cost Management Tools]] — Cost Explorer, CUR, Budgets y tagging
- [[Cost Optimization]] — los 5 pilares
- [[Governance at Scale]] — budget por capas y enforcement
- [[Establishing Guardrails]] — controls preventivos
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[Guia AWS]] — pesos y tareas oficiales
