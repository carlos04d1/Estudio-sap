---
title: "Knowledge Check"
aliases:
  - "Knowledge Check del módulo"
  - "Check your knowledge"
  - "Evaluación del módulo"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - evaluacion
  - governance
  - observabilidad
status: completado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Knowledge Check"
---

# Knowledge Check

> [!abstract] Qué es este archivo
> **Evaluación del módulo**: 3 preguntas de escenario, cada una pide **elegir 3**. No introduce conceptos nuevos:
> combina [[Management Controls]] (Service Catalog), [[Detective Controls]] (Config, GuardDuty, Security Hub,
> Systems Manager) y [[Cloud Governance Pillars]] (compliance y costos).
>
> Acá están las **respuestas**, el **porqué de cada opción** y el **patrón** que hay detrás de cada distractor.

> [!tip] Cómo usarla
> Tapá la tabla de respuestas, contestá, y después leé el análisis. Las tres preguntas usan la misma lógica:
> **elegir la combinación que cubre las tres capas** (prevención / detección / respuesta, o rendimiento / costo /
> operación). Los distractores siempre son **una sola capa** o un **anti-patrón**.

> [!success] Resultado del intento
> **26/10/2026 — 3 de 3 correctas** en Skill Builder, con **“Correct!”** en las tres.
> Las tres combinaciones elegidas coinciden con el análisis de esta nota.
> Las **rationales oficiales** de la plataforma quedaron transcritas en cada sección (§1.2, §2.2 y §3.2).

---

## 🎯 Respuestas rápidas

| # | Escenario | Respuesta |
| --- | --- | --- |
| **1** | Adquisiciones: estandarizar despliegue **sin quitar autonomía** (Service Catalog) | **A, C, D** |
| **2** | Fintech: cifrado en reposo y tránsito + detección inmediata de brechas | **A, C, E** |
| **3** | E-commerce: rendimiento en picos **y** control de costos | **B, C, D** |

---

## 1. Service Catalog a escala

> **Pregunta:** la empresa adquirió varias firmas pequeñas y necesita **despliegue estandarizado** permitiendo
> **autonomía** de los equipos en sus cuentas de AWS. ¿Cómo implementar Service Catalog para lograr ese balance?
> **(elegir 3)**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A. Shared portfolio + sharing con Organizations + TagOptions** | ✅ | **Un** portafolio aprobado, compartido por **Organizations** a las cuentas, y **TagOptions** para tagging consistente. Estandariza sin centralizar el consumo |
| **B. Admin access a todos para crear productos y portafolios** | ❌ | Destruye la estandarización: cualquiera publica lo que quiera. Es el anti-patrón de gobernanza |
| **C. Portafolios multi-región + launch constraints con roles IAM + notificaciones de updates** | ✅ | **Multi-región** cubre la dispersión geográfica; **launch constraints** limitan cómo se lanza; las **notificaciones** mantienen informados a los equipos sin quitarles autonomía |
| **D. Portafolios jerárquicos + constraints por entorno + CloudFormation + control de versiones** | ✅ | **Jerarquía** (dev/staging/prod) con **constraints específicos**; templates en **CloudFormation**; **versionado** de productos |
| **E. Un Service Catalog separado por cuenta, sin gestión central** | ❌ | Es exactamente lo que hay que evitar: **N catálogos** que divergen |
| **F. Compartir todos los portafolios con todas las OUs, sin constraints** | ❌ | “Todo para todos” no es autonomía: es **ausencia de gobernanza** |

> [!important] El eje de la pregunta
> **Autonomía ≠ ausencia de control.** Se comparte **un catálogo aprobado**, con **constraints por entorno** y
> **tagging estandarizado**. La autonomía está en **cuándo y qué producto** lanzan, no en **qué pueden publicar**.

### 1.1 Conceptos que confirma

| Concepto | Detalle |
| --- | --- |
| **Portfolio sharing** | Se comparte con cuentas/OUs vía **AWS Organizations** (lo mismo que el **hub-and-spoke** de [[Management Controls]]) |
| **TagOptions** | Biblioteca de tags estandarizados de Service Catalog; asegura **tagging consistente** para reportes y costos |
| **Launch constraints** | Definen **cómo** se lanza el producto, con **rol IAM** que ejecuta el despliegue |
| **Constraints por entorno** | Permiten que **prod** tenga límites más estrictos que **dev** |
| **Versioning** | Los productos evolucionan sin romper a los usuarios actuales |

> [!note] Ampliación (no está en la fuente)
> **TagOptions** no apareció en [[Management Controls]] (ahí se habló de **tags en el portfolio**). Es una feature
> real de Service Catalog: una **biblioteca de tags** que el administrador define y el usuario elige al lanzar, para
> que el tagging no dependa de la memoria de cada equipo.

### 1.2 Rationale oficial

> ¡Buen trabajo! Demostraste entender la implementación de **Service Catalog a escala empresarial**. Lo que hiciste
> bien:
> - **Usar portafolios compartidos** para estandarizar entre cuentas.
> - **Implementar controles de acceso adecuados** mediante **launch constraints**.
> - **Mantener la gobernanza** con **TagOptions** y **control de versiones**.
> - **Aprovechar AWS Organizations** para compartir portafolios de forma eficiente.

**Lo que confirma la plataforma:** las tres correctas no son rasgos sueltos, son **cuatro mecanismos de
gobernanza** que actúan juntos: **shared portfolio** (estandarización), **launch constraints** (control),
**TagOptions + versiones** (consistencia en el tiempo) y **Organizations** (distribución).

---

## 2. Fintech: cifrado + detección de brechas

> **Pregunta:** cliente de **servicios financieros** con **datos sensibles**. Necesita **cifrado en reposo y en
> tránsito** y **detección y reporte inmediatos** de posibles brechas. **(elegir 3)**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A. Config rules de cifrado + VPC Flow Logs con Athena + remediación automática con Security Hub** | ✅ | **Config** verifica el cifrado; **Flow Logs + Athena** analiza el tráfico; **Security Hub** centraliza y dispara **remediación** |
| **B. Confiar en cifrado de S3 + revisión manual de logs en CloudTrail** | ❌ | **Manual** no es “inmediato”; CloudTrail solo no detecta comportamiento malicioso |
| **C. KMS + GuardDuty + Security Hub con respuestas automáticas por EventBridge** | ✅ | **KMS** cubre el cifrado; **GuardDuty** detecta amenazas; **EventBridge** automatiza la respuesta |
| **D. Alarmas básicas de CloudWatch + confiar en los security groups** | ❌ | Un SG **no** detecta una brecha; las alarmas básicas no cubren compliance de cifrado |
| **E. CloudWatch anomaly detection + GuardDuty con integración Macie + respuesta automática con Systems Manager** | ✅ | **Anomalías** de acceso, **Macie** para datos sensibles en S3, **SSM** ejecuta la remediación |
| **F. Solo controles preventivos con políticas IAM y cifrado** | ❌ | Sin **detección** no hay “brechas detectadas y reportadas”; el enunciado pide ambas cosas |

> [!important] El patrón de las tres correctas
> Cada una cubre **tres capas distintas**:
> **cifrado** (KMS / Config) → **detección** (GuardDuty / Macie / Flow Logs) → **respuesta** (Security Hub /
> EventBridge / Systems Manager).
> Las incorrectas cubren **una sola capa** o dependen de **procesos manuales**.

### 2.1 Qué aporta cada servicio

| Servicio | Rol en el escenario |
| --- | --- |
| **AWS KMS** | Cifrado de datos **en reposo** con claves administradas |
| **TLS / cifrado en tránsito** | Requisito del enunciado; se implementa en los endpoints (no aparece nombrado en las opciones) |
| **AWS Config rules** | Verifican que el cifrado esté **habilitado** y que no se desvíe |
| **VPC Flow Logs + Athena** | Analizan el **tráfico de red** y permiten consultas forenses |
| **GuardDuty** | Detecta **comportamiento malicioso** (credenciales comprometidas, C2, criptominería) |
| **Amazon Macie** | Descubre **datos sensibles** en S3 |
| **Security Hub** | **Agrega y prioriza** findings; dispara respuestas |
| **EventBridge / Systems Manager** | Ejecutan la **respuesta automatizada** |
| **CloudTrail** | Registro de **API calls** para auditoría |

> [!warning] Ojo con la opción B
> **Cifrar S3 y revisar CloudTrail a mano** cumple el “cifrado” pero **falla en “inmediatamente detectado y
> reportado”**. En el examen, *manual* es señal de distractor cuando el requisito dice **real-time**.

### 2.2 Rationale oficial

> ¡Excelente trabajo! Demostraste un **sólido entendimiento de la arquitectura de seguridad en capas**. Fortalezas
> de tu enfoque:
> - **Combinar controles preventivos y detectivos** para una seguridad integral.
> - **Implementar respuestas automatizadas** en lugar de procesos manuales.
> - **Usar servicios integrados** que trabajan juntos (**GuardDuty**, **Security Hub**, **EventBridge**).
> - **Incorporar detección y respuesta en tiempo real**.

**Lo que confirma la plataforma:** la palabra que decide es **“multi-layered”**. Una sola capa —por más fuerte que
sea— **no cumple** el enunciado; la respuesta válida **combina** prevención, detección y respuesta.

---

## 3. E-commerce: picos de demanda + costos

> **Pregunta:** cliente de **e-commerce** con crecimiento rápido, preocupado por **rendimiento en temporada alta**
> y por **controlar costos**. **(elegir 3)**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A. Sobreaprovisionar y comprar todas las RI por adelantado** | ❌ | Capacidad ociosa **todo el año** para un pico estacional: costo alto y rigidez |
| **B. Predictive auto scaling + DynamoDB on-demand + Budgets con acciones automáticas** | ✅ | **Predictive scaling** anticipa el pico; **on-demand** paga por uso; **Budgets actions** frena el gasto |
| **C. ALB con target tracking + S3 Intelligent-Tiering + Compute Optimizer** | ✅ | **Target tracking** mantiene la métrica objetivo; **Intelligent-Tiering** baja costo de storage; **Compute Optimizer** recomienda el tamaño correcto |
| **D. ASG multi-AZ + CloudFront caching + Cost Explorer para rightsizing** | ✅ | **Multi-AZ** da disponibilidad; **CloudFront** absorbe tráfico; **Cost Explorer** identifica qué redimensionar |
| **E. Solo on-demand + escalado manual por horario** | ❌ | Manual y basado en reloj, no en demanda: no aguanta picos impredecibles |
| **F. Single-AZ con capacidad máxima siempre encendida** | ❌ | Doble error: **sin alta disponibilidad** y **pagando el máximo** todo el tiempo |

> [!important] El patrón
> **Elasticidad + visibilidad de costo + recomendación.** Las tres correctas combinan:
> **escalar según demanda** (predictive / target tracking), **pagar por uso donde conviene** (on-demand,
> Intelligent-Tiering) y **medir/actuar** (Compute Optimizer, Cost Explorer, Budgets actions).
> Las incorrectas eligen **capacidad fija** o **escalado manual**.

### 3.1 Por qué “comprar todas las RI” es una trampa

Las **Reserved Instances** son un descuento por **compromiso**, no una estrategia de elasticidad. Comprarlas
**todas por adelantado** para un pico estacional deja capacidad pagada y sin usar el resto del año. La respuesta
correcta usa **elasticidad** y reserva **solo la línea base** (eso último es ampliación, no está en las opciones).

### 3.2 Rationale oficial

> ¡Bien hecho! **Balanceaste prioridades en competencia** dentro de la gobernanza de nube. Fortalezas:
> - **Implementar automatización** tanto para **rendimiento** como para **optimización de costos**.
> - **Usar servicios nativos de AWS** para escalado inteligente y administración de recursos.
> - **Incorporar monitoreo y optimización proactivos**.
> - **Considerar las necesidades inmediatas y la eficiencia a largo plazo**.

**Lo que confirma la plataforma:** el criterio no es “la opción más barata” ni “la más rápida”, sino la que
**resuelve los dos objetivos a la vez** con **automatización y servicios nativos**.

---

## 4. Lo que enseñan las tres preguntas

### 4.1 La estructura común

| Pregunta | Capa 1 | Capa 2 | Capa 3 |
| --- | --- | --- | --- |
| **1 — Service Catalog** | **Estandarizar** (shared portfolio, templates) | **Controlar** (constraints, roles, tagging) | **Escalar** (sharing, versiones, multi-región) |
| **2 — Fintech** | **Cifrar** (KMS, Config) | **Detectar** (GuardDuty, Macie, Flow Logs) | **Responder** (Security Hub, EventBridge, SSM) |
| **3 — E-commerce** | **Escalar** (predictive, target tracking) | **Optimizar** (on-demand, Intelligent-Tiering, CloudFront) | **Medir y actuar** (Compute Optimizer, Cost Explorer, Budgets) |

> **Regla de examen:** si el enunciado pide **dos objetivos** (ej.: rendimiento **y** costo; cifrado **y**
> detección), la respuesta correcta tiene que tocar **ambos**. Las opciones que solo cubren uno son el distractor.

### 4.2 Anti-patrones que aparecen

| Anti-patrón | Por qué está mal |
| --- | --- |
| **Admin para todos** | Sin gobernanza: cualquiera publica productos |
| **Un catálogo por cuenta** | Divergencia y trabajo duplicado |
| **Compartir todo sin constraints** | Autonomía sin límites = riesgo |
| **Revisión manual de logs** | No es detección inmediata |
| **Confiar solo en security groups** | No detecta brechas |
| **Solo controles preventivos** | No hay detección ni reporte |
| **Sobreaprovisionar / todo RI** | Costo fijo para demanda variable |
| **Escalado manual por horario** | No sigue la demanda real |
| **Single-AZ al máximo** | Falla disponibilidad y costo a la vez |

### 4.3 Checklist

- [ ] Puedo explicar por qué **TagOptions** y **launch constraints** no son lo mismo.
- [ ] Sé qué capa cubre **Config**, cuál **GuardDuty** y cuál **Security Hub**.
- [ ] Puedo nombrar **tres servicios** que detecten datos sensibles o comportamiento anómalo.
- [ ] Distingo **elasticidad** de **capacidad reservada**.
- [ ] Sé por qué **Budgets con acciones** es distinto de **Budgets que solo avisa**.
- [ ] Reconozco el patrón “**manual = distractor**” cuando el requisito es tiempo real.

---

## 5. Traducción del contenido

### 5.1 Check your knowledge

Ahora es momento de un **Knowledge Check** rápido. Usá la información de este módulo para responder las
siguientes preguntas basadas en escenarios.

### 5.2 Pregunta 1

Tu empresa **adquirió recientemente varias firmas más pequeñas** y necesitás asegurar un **despliegue
estandarizado de recursos** permitiendo que los equipos **mantengan autonomía** en sus cuentas de AWS. Como
**Solutions Architect líder**, ¿cómo implementarías **AWS Service Catalog** para lograr ese balance? **(Elegí 3.)**

**A.** Crear un **portafolio compartido** con productos aprobados, usar **AWS Organizations** para compartirlo
entre cuentas e implementar **TagOptions** para un tagging consistente de recursos.

**B.** Dar a **todos los equipos acceso de Admin** a Service Catalog para que creen sus propios productos y
portafolios.

**C.** Diseñar portafolios con **productos multi-región**, implementar **launch constraints** usando **roles IAM**
y configurar **notificaciones** de actualizaciones de productos.

**D.** Configurar **portafolios jerárquicos** con **constraints específicos por entorno**, usar **AWS
CloudFormation** para mantener los templates e implementar **control de versiones**.

**E.** Crear **Service Catalogs separados en cada cuenta**, sin administración central.

**F.** **Compartir todos los portafolios con todas las OUs** sin constraints ni controles de gobernanza.

### 5.3 Pregunta 2

Estás diseñando una solución para un cliente de **servicios financieros** que procesa **datos sensibles de
clientes**. Necesitan asegurar que **todos los datos estén cifrados en reposo y en tránsito**, y que cualquier
**posible brecha de datos sea detectada y reportada inmediatamente**. ¿Cómo procedés? **(Elegí 3.)**

**A.** Desplegar **reglas de AWS Config** para compliance de cifrado, **VPC Flow Logs** con análisis en **Athena**
y **remediación automatizada con Security Hub**.

**B.** Confiar en el **cifrado de S3** y en la **revisión manual de logs** a través de **CloudTrail**.

**C.** Implementar **cifrado con KMS**, **GuardDuty** para detección de amenazas y **Security Hub** con
**respuestas automatizadas por EventBridge**.

**D.** Usar **alarmas básicas de CloudWatch** y confiar en los **security groups de VPC** como protección
principal.

**E.** Usar **detección de anomalías de CloudWatch**, **GuardDuty con integración de Macie** y **respuesta
automatizada a incidentes a través de Systems Manager**.

**F.** Implementar **solo controles preventivos** mediante **políticas IAM y cifrado**.

### 5.4 Pregunta 3

Tu cliente de **e-commerce** está experimentando **crecimiento rápido** y le preocupa **mantener el rendimiento
durante las temporadas altas de compras** y, al mismo tiempo, **controlar los costos**. ¿Cómo procedés?
**(Elegí 3.)**

**A.** **Sobreaprovisionar** recursos y comprar **todas las instancias reservadas por adelantado**.

**B.** Implementar **predictive auto scaling**, usar **DynamoDB on-demand** y configurar **AWS Budgets con
acciones automáticas**.

**C.** Desplegar **Application Load Balancer con target tracking**, usar **S3 Intelligent-Tiering** e implementar
**recomendaciones de Compute Optimizer**.

**D.** Configurar **Auto Scaling Groups multi-AZ**, implementar **caching con CloudFront** y usar **AWS Cost
Explorer** para **rightsizing**.

**E.** Usar **solo instancias on-demand** con **escalado manual** basado en **horarios**.

**F.** Implementar despliegues **single-AZ** con **capacidad máxima siempre encendida**.

---

## 6. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Knowledge Check del módulo: 3 preguntas de escenario × “elegir 3” | Nota completa con respuestas y análisis |
| 26/10/2026 | **Resultado: 3/3** + las tres **rationales oficiales** de la plataforma | Bloque de resultado y §1.2, §2.2, §3.2 |

**Pendiente:**

- [x] Registrar el **resultado del intento** → **3/3 (26/10/2026)**.
- [ ] Confirmar si el módulo tiene más lecciones o si el Knowledge Check es el cierre.

**Decisiones de transcripción:**

- Los enunciados y opciones se tradujeron **completos**, porque son la fuente del ejercicio.
- “**SecurityHub**” → **AWS Security Hub**.
- La opción **B** de la pregunta 1 (Admin para todos) y la **E** (catálogo por cuenta) se conservan como
  distractores: **no** se “corrigen”.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Management Controls]] — portfolios, constraints, sharing, TagOptions en contexto
- [[Detective Controls]] — Config, GuardDuty, Security Hub, Systems Manager
- [[Cloud Governance Pillars]] — inventario, compliance y visibilidad
- [[Establishing Guardrails]] — preventive vs. detective
- [[Governance at Scale]] — los tres focos
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] · [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales
