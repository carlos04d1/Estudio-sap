---
title: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls"
aliases:
  - "Implementing Observability and Management Controls"
  - "Índice Observability"
  - "Módulo Observability"
  - "Observabilidad y controles de administración"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - observabilidad
  - indice
  - dominio-3
status: completo
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Implementing Observability and Management Controls

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> El **título** apunta a la **Tarea 3.1 — Determinar una estrategia para mejorar la excelencia operativa general**
> del SAP-C02 (D3, 25 %): *soluciones de supervisión y registro*, *alertas y corrección automática*,
> *administración de la configuración* y *automatización*. El módulo arrancó por **gobernanza y costos**
> (**1.5**, **1.2 / 2.3**, **1.4**), desde la lección 06 entró de lleno en **observabilidad**
> (**Config, GuardDuty, Security Hub**), **las lecciones 09–16 vuelven a costos** (**1.5**, **2.6 / 3.5**) —el
> marco de **cloud financial management**, las **herramientas**, los **cinco pilares** y la **arquitectura de
> compute, red, storage y bases de datos**— y **las lecciones 17–20 cierran el bloque de observabilidad** que da
> nombre al módulo (**3.1**): los **tres pilares**, el **tracing distribuido**, el **monitoreo sintético con
> SLOs** y la **operación centralizada multi-cuenta**. La lección 12 es el **Knowledge Check de cierre** del
> bloque de costos.
>
> **Módulo cerrado el 26/10/2026**: **20 sesiones**, **21 archivos**, **~9.009 líneas**, **0 links rotos**.

> [!info] Mapeo del examen
> El **Course Overview** describe un curso de **gestión de costos y governance**; la lección 01
> ([[Governance at Scale]]) lo confirma y la 09 ([[Cloud Cost Management]]) lo cierra desde el marco de FinOps.
> El módulo cubre **1.5** (costos, tagging y visibilidad), **1.2 / 2.3** (controles y enforcement),
> **1.4** (entorno multi-cuenta), **2.6 / 3.5** (optimización de costos) y **3.1** (observabilidad y excelencia
> operativa).

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como ✅ solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 📌 Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | **Course Overview** | Objetivos, servicios, audiencia y prerequisitos | 🔵 consolidado (26/10) | [[Course Overview]] |
| 02 | **Governance at Scale** | Los 3 focos: cuentas, seguridad/compliance automatizada, presupuesto y costos | 🔵 consolidado (26/10) | [[Governance at Scale]] |
| 03 | **Establishing Guardrails** | Preventive vs detective, guidance, SCP y Config, ejemplos y anatomía | 🔵 consolidado (26/10) | [[Establishing Guardrails]] |
| 04 | **Management Controls** | AWS Service Catalog: productos, portafolios, constraints, Account Factory, hub-and-spoke | 🔵 consolidado (26/10) | [[Management Controls]] |
| 05 | **Demonstration: AWS Service Catalog** | Demo: portfolios, template, sharing, lanzar VPC + EC2 como end user | 🔵 consolidado (26/10) | [[Demonstration - AWS Service Catalog]] |
| 06 | **Detective Controls** | Config, Systems Manager, GuardDuty y Security Hub; detección, alertas y remediación | 🔵 consolidado (26/10) | [[Detective Controls]] |
| 07 | **Cloud Governance Pillars** | Inventory & configuration management + configuration compliance management | 🔵 consolidado (26/10) | [[Cloud Governance Pillars]] |
| 08 | **Knowledge Check** | 3 escenarios × 3 respuestas: Service Catalog, cifrado+detección, rendimiento+costos | ✅ **3/3** (26/10) | [[Knowledge Check]] |
| 09 | **Cloud Cost Management** | Consumo tradicional vs nube, 4 áreas a adaptar, gestión vs optimización, 4 etapas y 7 pasos | 🔵 consolidado (26/10) | [[Cloud Cost Management]] |
| 10 | **Cost Management Tools** | 3 categorías, Cost Explorer, CUR, Budgets + actions, tagging y tag policies | 🔵 consolidado (26/10) | [[Cost Management Tools]] |
| 11 | **Cost Optimization** | 5 pilares: rightsize, elasticity, pricing, storage y mejora continua; anomalías y TCO | 🔵 consolidado (26/10) | [[Cost Optimization]] |
| 12 | **Knowledge Check 2** | 2 escenarios: adaptar el proceso financiero y detección proactiva multi-región | ✅ **2/2** (26/10) | [[Knowledge Check 2]] |
| 13 | **Architecting for Cost - Compute** | Familias EC2, generación/tamaño, rightsizing, EC2 Fleet, Auto Scaling y scaling | 🔵 consolidado (26/10) | [[Architecting for Cost - Compute]] |
| 14 | **Architecting for Cost - Networking** | Data transfer por AZ/Región/VPC, S3, ELB/LCU, Elastic IP y C5n | 🔵 consolidado (26/10) | [[Architecting for Cost - Networking]] |
| 15 | **Architecting for Cost - Storage** | Portafolio de storage, tipos EBS, snapshots/DLM, S3 classes y self-check | 🔵 consolidado (26/10) | [[Architecting for Cost - Storage]] |
| 16 | **Architecting for Cost - Databases** | DynamoDB global tables, ElastiCache, Redshift, reservas y caso numérico | 🔵 consolidado (26/10) | [[Architecting for Cost - Databases]] |
| 17 | **Designing Observability Solutions** | 3 pilares, métricas/EMF, Logs Insights, anomalías, composite alarms y ciclo cerrado | 🔵 consolidado (26/10) | [[Designing Observability Solutions]] |
| 18 | **Distributed Tracing for Microservices** | X-Ray, SDK vs. ADOT, trace map, investigación y sampling | 🔵 consolidado (26/10) | [[Distributed Tracing for Microservices]] |
| 19 | **Synthetic Monitoring and Service-Level Objectives** | Canaries, RUM, Application Signals, SLO, error budget y burn rate | 🔵 consolidado (26/10) | [[Synthetic Monitoring and Service-Level Objectives]] |
| 20 | **Multi-Account Observability** | Monitoring account + OAM, subscription filters vs. export a S3, Container Insights y diseño a escala | 🔵 consolidado (26/10) | [[Multi-Account Observability]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 📐 Reglas del módulo

Las mismas del curso anterior, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, períodos de retención, nombres exactos de servicios.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

---

## 🗂️ Qué cubre cada sesión

### 01 — Course Overview
- **Formato**: instrucción grabada por módulo + multimedia/interactivo + **Knowledge Checks** y evaluaciones cortas.
- **Foco declarado**: **gestión de costos y governance** en entornos **multi-cuenta**.
- **Servicios nombrados**: **Organizations**, **Control Tower**, **Cost Explorer**, **Budgets**, **Config**.
- **Temas**: tags de asignación de costos automatizados · reportes de costo y uso personalizados · jerarquías de
  facturación · controles de políticas automatizados.
- **4 objetivos**: estrategia de costos · políticas organizacionales que **hacen cumplir** · marco de facturación
  multi-cuenta · arquitecturas optimizadas **sin degradar** rendimiento ni fiabilidad.
- **Audiencia/prerequisitos**: solutions architect con **2+ años**; Associate learning plan o certificación; 2+ años
  usando AWS.

### 02 — Governance at Scale
- **3 focos**: **account management** · **security and compliance automation** · **budget and cost management**.
- **Account management**: **policy automation** (IAM users/groups/roles) + **identity federation** (IAM Identity
  Center, OpenID, AD; con **CloudTrail** se rastrea la actividad entre cuentas) + **account automation**
  (templates de despliegue que generan cuentas).
- **SSO**: **10 cuentas ≠ 10 credenciales**; acceso **por rol**, no por cuenta individual.
- **Security automation**: las reglas se establecen y se **aplican solas**; desvío → **notificación** →
  **remediación automática**. *“If I'm not enforcing the rules, the rules are just a suggestion.”*
- **Policy enforcement** sobre **Regions**, **servicios** y **configuraciones de recursos** (HIPAA, FedRAMP,
  PCI DSS); ejemplo: un bucket **S3** sin permisos **no se aprovisiona**.
- **Jerarquía**: cuenta principal (billing/support) → OUs (como carpetas) → equipos → grupos → cuentas.
- **Herencia de guardrails**: se definen en cualquier nivel y **bajan** a todos los inferiores; **nunca suben**.
- **Budget**: plan por capas (**$1.000.000** → operaciones **3/4** → proyectos), alertas al **20/30/50/80 %**,
  corte al techo y restricción por tipo de recurso (**T3 micro** sí, cómputo grande no).
- **Enforcement de costos**: restringir por precio · **throttling** de provisioning · **apagar/terminar/
  desaprovisionar** **después de archivar** configuraciones y datos.

### 03 — Establishing Guardrails
- **Definición**: regla de alto nivel que da gobernanza **continua** en todo el entorno, **multi-cuenta y
  multi-región**.
- **Preventive**: **SCP** (parte de Organizations) · estados **enforced / not turned on** · **todas las regiones** ·
  impide la acción.
- **Detective**: **regla de AWS Config + función Lambda** · estados **clear / in violation / not turned on** ·
  **solo regiones soportadas por Control Tower** · alerta por **dashboard**; **no remedia sola**.
- **Guidance** (eje independiente del tipo): **mandatory** (siempre) · **strongly recommended** (best practices
  Well-Architected / multi-cuenta) · **elective** (acciones comúnmente restringidas).
- **Defaults de landing zone nueva**: **todas las mandatory ON**; recommended y elective **OFF**.
- **SCP** — 7 elementos: `Version` · `Statement` · `Sid` (opcional) · `Effect` · `Action` · `Resource` ·
  `Condition`.
- **Config rule** — 7 elementos: `Parameters` · `Resources` · logical identifier · resource type ·
  `ConfigRuleName` (función `Sub`) · `Source` · `Scope`.
- **Una SCP puede cubrir varias mandatory** → aparece repetida en la referencia.
- **Ejemplos**: borrar S3 sin MFA (preventive) · S3 creado sin versioning (detective, elective) · EBS-optimized ·
  RDP/SSH · log archive · CloudTrail → CloudWatch Logs · IAM sin MFA.

### 04 — Management Controls
- **Management controls** = herramientas que **estandarizan el despliegue**, **hacen cumplir compliance** y
  mantienen la **eficiencia operativa**; el SA debe **balancear agilidad y control**.
- **Caso Grace**: con acceso total no sabe qué SO, AMI, volumen, VPC ni puertos elegir → tiempo perdido, sin
  enforcement, misconfiguración, breach y gasto fuera de presupuesto.
- **Service Catalog**: un solo lugar para **recursos preaprobados agrupados como productos**; sostiene el paso de
  **provision** de governance at scale.
- **7 términos**: **product** · **portfolio** (colección **con configuración** y audiencia) · **permissions** ·
  **CloudFormation template** · **constraints** · **provisioned product** (**stack**) · **versioning**
  (la versión nueva llega **automáticamente** a los usuarios actuales).
- **Usuarios**: **administrators** (templates, constraints, roles IAM, otorgan acceso **sin** acceso a los
  servicios de base) vs **end users** (lanzan productos desde la consola).
- **Workflow**: autorizar templates → productos → portfolios + tags → asignar IAM → el usuario elige **versión**,
  configura parámetros y Service Catalog + CloudFormation despliegan; **Lambda** para snapshots y start/stop/resize.
- **Account Factory**: producto de Service Catalog en el portfolio **AWS Control Tower Account Factory**;
  **network baseline** (subredes, **CIDR**, regiones) invisible al usuario; **OU nueva** actualiza el template.
- **Recomendado**: **Enroll account**, no lanzar el producto a mano.
- **Hub-and-spoke**: **local launch constraints** + **sharing de Organizations**; hub = cuenta primaria de
  Control Tower, spokes = cuentas de usuario.
- **Knowledge Check**: **A. Portfolio**.

### 05 — Demonstration: AWS Service Catalog
- **Branding** del console personalizable (negocio ficticio **Kitty Cat Store**).
- **Dos portafolios**: **Linux applications** (EC2 Linux, EC2 + Apache, EC2 + NGINX, **VPC propia**) y
  **Windows applications** (no se abre en la demo).
- El producto **es un template de CloudFormation**: código, **parameters, labels, tags y resources** a la vista.
- **Access**: el portafolio está **compartido con el usuario developer**.
- **Admin** crea y mantiene; **end user** solo **consume** — el menú del developer está **recortado**.
- **Lanzamiento 1**: `dev-vpc` (versión **1.0**, parámetros, ~1–2 min).
- **Lanzamiento 2**: `dev-linux` (EC2) **dentro del VPC** recién creado → el VPC aparece como opción.
- **Verificación** en la consola **EC2**: el host aparece creado.
- Cierre: **structured and controlled** self-service.

### 06 — Detective Controls
- **Detective** = **registrar, evaluar y alertar**; a diferencia del preventivo, **no impide**: documenta y permite investigar.
- **4 aspectos**: **monitor · audit · act · operate**.
- **Mapa de servicios**: Control Tower + Organizations · CloudFormation + Service Catalog · **CloudWatch** (observabilidad) · **CloudTrail/Config/Systems Manager/Security Hub/GuardDuty** (operación centralizada).
- **AWS Config**: nativo **agentless**, descubre recursos, **historial completo**, evalúa con **Config rules**, alerta por **SNS + CloudWatch events**; **auto-remediation**; corre sobre **Organizations** con **vista agregada**; integra **ITSM (ServiceNow)**.
- **Systems Manager**: **UI unificada**, agrupa recursos **por aplicación** (EC2/S3/RDS), automatiza tareas, **acorta detección y resolución**, **ejecuta remediación** disparada por Config/Security Hub/GuardDuty.
- **GuardDuty**: **ML + anomalías + threat intel** (CrowdStrike, Proofpoint); fuentes **CloudTrail + VPC Flow Logs + DNS logs** (los **DNS logs solo los ve GuardDuty**); detecta **criptominería, credenciales comprometidas, C2, IPs maliciosas**; **multi-cuenta** con administrator account + **EventBridge**; **sin agentes ni appliances**.
- **Security Hub**: **centro de compliance y seguridad**; corre chequeos con **AWS best practices + open standards**, **agrega findings** de cuentas y de **terceros**, correlaciona y prioriza; envía a **ticketing/chat/email** o **remedia vía EventBridge + Lambda**.
- **Diferencia clave**: **GuardDuty detecta amenazas** · **Security Hub agrega y correlaciona** (y **acepta logs de terceros**).
- **Pendiente**: las secciones **SSM governance** y **Security Hub governance** venían como flashcards sin texto.

### 07 — Cloud Governance Pillars
- **Pilar 1 — Inventory and configuration management**: inventario **en tiempo real**, **snapshot** de configuración, **relaciones** (AWS y on-prem), **historial de configuración**, consulta por **AMI** (`AMI-234314`).
- **Pilar 2 — Configuration compliance management**: políticas de **best practices + requisitos regulatorios** (**NIST, PCI, HIPAA**), chequeo **inmediatamente después del cambio** y **notificación en tiempo real**.
- **Usos**: auditoría, investigación de brechas, detección de **EC2 sin parchear**, agrupación para **actuar**.
- **Discrepancia**: la introducción nombra **cinco pilares** (security, cost, operations, performance, compliance); el video desarrolla **dos**. No son listas equivalentes.

### 08 — Knowledge Check
- **3 escenarios × “elegir 3”**, todos con la misma lógica: cubrir **las tres capas**.
- **1 — Service Catalog**: **A, C, D** (shared portfolio + Organizations + **TagOptions** · multi-región + **launch constraints** + notificaciones · jerarquía + constraints por entorno + CloudFormation + versiones).
- **2 — Fintech**: **A, C, E** (Config + Flow Logs/Athena + Security Hub · **KMS** + GuardDuty + EventBridge · anomalías + **GuardDuty + Macie** + Systems Manager).
- **3 — E-commerce**: **B, C, D** (predictive scaling + DynamoDB on-demand + Budgets actions · ALB target tracking + **S3 Intelligent-Tiering** + **Compute Optimizer** · multi-AZ + **CloudFront** + Cost Explorer).
- **Anti-patrones**: Admin para todos · catálogo por cuenta · compartir sin constraints · revisión manual · single-AZ al máximo · sobreaprovisionar.

### 09 — Cloud Cost Management
- **Escenario**: el **operations manager** pregunta cómo cambian sus procesos de costos al pasar de **on-premises** a nube.
- **Analogía**: restaurante que **compra meses antes** (tradicional) vs **proveedores flexibles** (nube).
- **Modelo tradicional**: **IT pide → finanzas aprueba/compra → operaciones instala**; **capital a largo plazo**, ciclos largos, **long pole dependencies** que frenan la innovación.
- **Modelo nube**: ciclos cortos; **costo de falla eliminado** (terminar recursos está a **clics/API calls**); el equipo pasa de **builder** a **operator y owner** (asume procurement y deployment).
- **4 áreas a adaptar**: **traceability** (chargeback/showback o reporte regular) · **oversight** (descentralizar + cost-consciousness en el diseño, salir de monolitos) · **forecasting** (ML + predictive analytics, entender drivers) · **control** (account strategy + partnership finanzas/ingeniería + inversión en personas, procesos y tecnología).
- **Cost management** = **ver** (visibilidad para mantener bajo control) · **cost optimization** = **actuar** (valor de negocio al **menor precio posible**). Caso retail: menos costo **y** mejor rendimiento.
- **4 decisiones**: quién aprovisiona · qué pricing conviene · qué servicios encajan · cómo cambian los costos al crecer.
- **4 etapas**: **investigation and design** (tagging, soporte, visibilidad; impacto por **años**) · **implementation and testing** (los costos **suben** y está bien; monitorear, budgets, probar demanda) · **production and growth** (patrones reales; caso **e-commerce** con auto scaling) · **operational** (revisión regular, rightsizing, compromisos de largo plazo).
- **7 pasos**: **ownership · partnership · cost allocation and enablement · cost visibility · cost optimization · cost forecasting · education**; cada uno se apoya en el anterior.
- **Cierre**: el video anuncia las **herramientas concretas de AWS** para la próxima lección; no las desarrolla.

### 10 — Cost Management Tools
- **3 categorías**: **reporting and alerting** (Cost Explorer, CUR, Budgets, CloudWatch) · **controls** (Organizations, IAM, Service Catalog) · **governance** (Config, Control Tower, Well-Architected Tool, Trusted Advisor, License Manager, CodeGuru Profiler).
- **Cost Explorer**: visualizar/entender/gestionar en el tiempo; **hasta 24 h** para usuarios nuevos; reportes con **gráficos y tablas**; **purchase recommendations** (RI, Savings Plans) y **optimización** (instancias ociosas, storage a tier más barato); caso empresa de tecnología que sigue el gasto por equipo **sin frenar innovación**.
- **CUR**: detalle, **actualiza a lo largo del día**, se guarda en **S3**, análisis propio.
- **Budgets**: **hasta 3 veces/día**, **8–12 h** entre updates; rastrea **unblended costs, suscripciones, reembolsos y RI**; **6 tipos** (cost · usage · RI utilization · RI coverage · SP utilization · SP coverage); **20.000** budgets por cuenta/management account; **62 budget days** gratis (= 2 budgets/mes); **$0,02** por budget day extra; **consolidated billing** reparte los 62.
- **Budget actions**: umbral **actual o pronosticado**; **IAM policy · SCP · EC2/RDS**; **5 umbrales × 10 acciones**; **automático o approval** (approval es default); notificación siempre; **IAM/SCP se resetean** por período, **EC2/RDS no**.
- **Tagging**: **key + value**, key única por recurso con un solo valor; **AWS generated** vs **user-defined**, se **activan por separado**; aparecen en **Cost Explorer** y **cost allocation report CSV**; demora **~1 día**; **minúsculas + guiones**; caso **empresa de medios: −15 %** identificando recursos sin tag sin usar.
- **Tag policies** (Organizations): a **toda la org, OUs o cuentas**; definen **keys, capitalización y valores**; reporte **cross-account y cross-Region**; enforcement **opcional** contra **cambios** no compliant (el transcript dice “prevenir creación”: impreciso, §9.2).
- **Self-check**: *“¿qué herramienta aplica políticas dinámicamente para impactar el gasto?”* → **D. AWS Budgets**. Sin rationale oficial.

### 11 — Cost Optimization
- **5 pilares** (orden de la lectura): **rightsize · elasticity · pricing model · storage · measure/monitor/improve**; el transcript los nombra en otro orden.
- **Rightsizing**: **al menos mensual**; elegir la instancia más barata que cumpla, revisar **CPU/RAM/storage/red**, eliminar ociosos, **scheduling**; **Compute Optimizer** (ML, EC2/ASG, what-if); **Instance Scheduler** (**hasta 70 %**, EC2 + RDS); **29 m5.large ($2.032,32/mes)** vs. **59 t3.medium ($1.791,71/mes)**; **c5.large $0,085/h** vs. **c4.large $0,1/h**; CPU **83 % → 57 %**.
- **Elasticidad**: **AWS Auto Scaling** (EC2/Spot Fleet, ECS, DynamoDB, Aurora Replicas; recomendaciones performance/costo/balance); ociosos: **Cost Explorer Resource Optimization**, **Instance Scheduler**, **Operations Conductor**; **RDS stop** (Trusted Advisor **7 días sin conexiones**), **Redshift pause** (**7 días + < 5 % CPU en 99 %**), **DynamoDB** con **ConsumedRead/WriteCapacityUnits**.
- **Pricing**: **Spot hasta 90 %** (si tolera interrupciones); **Savings Plans hasta 72 %** en **EC2/Fargate/Lambda**, **1 o 3 años**, **$/hora**, compra desde cualquier cuenta y aplica primero a la dueña; **Compute SP** (flexible) vs. **EC2 Instance SP** (familia + Región, más descuento); caso financiero con mezcla.
- **Storage**: **EFS/FSx** file · **EBS/instance store** block · **S3/Glacier** object; S3 según acceso (+ retrieval fee); **Standard** frecuente · **Intelligent-Tiering** impredecible · **lifecycle** para envejecer; **4 escenarios** de **1.000 objetos × 1 GB** (sin respuesta en la fuente: la tabla está en imagen faltante).
- **Mejora continua**: caso **image processing** freemium (**m4.large 1.000/h**, SLA paid **10 min**, **2.000 TXN/h**, free **$0,0001**, paid **6 instancias → $0,0006**), evolución a **Lambda** y **híbrido**; **Cost Anomaly Detection** (ML multi-capa, **sin thresholds**, picos y aumentos; immediate / daily **>$100** / weekly **>$1.000**); **TCO**: lift-and-shift → rightsizing/elasticity → managed/serverless → mejora continua; e-commerce **−45 %** con SP + Spot + lifecycle.
- **Self-check**: *“ML multicapa que aprende el patrón y no requiere umbrales”* → **B. Cost Anomaly Detection**. Sin rationale oficial.

### 12 — Knowledge Check 2
- **2 escenarios × “elegir 3”** sobre el bloque de costos. **Resultado: 2/2 (26/10/2026)**, ambas **“Correct!”**.
- **1 — Enterprise (presupuesto trimestral vs. costo variable)**: **A, B, E**.
  **A** Organizations + billing por departamento + **Cost Explorer** + revisión **semanal** ·
  **B** anomaly detection + **pay-as-you-go** para variable + **RI/SP** para estable ·
  **E** billing alarms + **cost allocation tags** + **Budgets**.
- **Distractores Q1**: **RI al 90 %** (sobrecompromiso) · **ciclos trimestrales** · **cuotas por uso histórico** y
  **OpEx/CapEx separados**.
- **2 — E-commerce (picos no vistos hasta la factura)**: **B, C, D**.
  **B** reportes custom + **Budget Actions** + **CloudWatch** ·
  **C** **Organizations** + **CUR** + **tag policies** ·
  **D** **Budgets 50/75/90** + **Anomaly Detection + EventBridge** + **Cost Explorer diario**.
- **Distractores Q2**: **chequeos manuales** · revisiones **mensuales** · **“sin controles automatizados”** ·
  solo IAM/estimaciones.
- **Anti-patrones**: fijar el gasto a un pronóstico anual, buffer como solución, confiar en la factura, manual,
  mensual.
- **Defecto de la plataforma**: las **rationales** devueltas **no corresponden** a las preguntas (hablan de
  **S3 Glacier / Standard**, **Storage Gateway**, **Snowball** e **Intelligent-Tiering**). Se conservan literales
  en la nota, marcadas como no aplicables; el **resultado 2/2 sí es válido**.

### 13 — Architecting for Cost - Compute
- **5 familias**: **general purpose** (balance, web) · **compute optimized** (compute-bound, transcoding, HPC/ML) · **memory optimized** (DB, caché, analytics) · **accelerated** (GPU, ML, HPC, autónomos) · **storage optimized** (secuencial, NoSQL, OpenSearch).
- **Última generación**: **menor precio/hora** + **mejor performance** → menos instancias; **elegir bien al inicio** evita overhead de migración.
- **Sizing**: benchmark; en ASG, **instancias más chicas** ajustan mejor a la demanda; capacidad **lineal** por tamaño.
- **Rightsizing**: **Compute Optimizer** (EC2, EBS, ECS/Fargate, licencias, Lambda; findings + what-if) vs. **Cost Explorer** (downsize/terminate, tipo recomendado, ahorro mensual/anual).
- **Estados**: **stopped** no cobra uso ni transfer, **pero EBS sí**; **health check fallido/trabado** puede costar → **EC2 auto recovery** o **EventBridge + Lambda** para terminar.
- **EC2 Fleet**: **una API** para tipos/AZ/modelos; target capacity + distribución + cores/memoria; lanza **combinación de menor precio**.
- **Auto Scaling**: launch template, **overrides**, **weights**, base On-Demand, **prioridad de RI/SP**; **On-Demand = prioritized**; **Spot = capacity-optimized** (menos interrupciones) o **lowest price** (**N pools**, 4×4=16, N=2 → 8); **10 best practices**.
- **Elasticidad**: **AWS Auto Scaling** (multi-servicio, solo **target tracking**, no crea ASG) vs. **EC2 Auto Scaling** (grupos EC2, **scheduled/step**).
- **Scaling**: default fijo · **scheduled** (patrones predecibles) · **target tracking** (demanda variable) · **predictive** (ML, patrones) · **Instance Scheduler** (**EC2/RDS**, workflow CFN→CloudWatch→Lambda→DynamoDB, **hasta 70 %**).
- **Self-check**: *“¿qué servicios dan rightsizing recommendations desde ahorro?”* → **A. Cost Explorer** y **C. Compute Optimizer**. Sin rationale oficial.

### 14 — Architecting for Cost - Networking
- **Modelo**: el cargo depende de **dirección** (in/out), **origen** y **destino**; **entrar a AWS desde internet es gratis**, **salir cuesta**.
- **Dentro de AZ**: **gratis con IPv4 privada** entre **EC2, RDS, Redshift, ElastiCache y ENIs**; **IPv4/IPv6 públicas se cobran en cada dirección**; **PrivateLink** cobra aparte.
- **Entre AZs**: **gratis** para **S3, S3 Glacier, DynamoDB, SES, SQS, Kinesis, ECR, SNS y SimpleDB**; **otros servicios $0,01/GB out + $0,01/GB in**.
- **Entre Regiones**: **solo out**, **precio de internet**, **varía por Región de origen** (ej. **$0,02 out / $0 in**).
- **VPC peering**: **misma AZ gratis** · **distintas AZ $0,01/GB por sentido ($0,02 total)** · **distintas Regiones = out de la Región origen**.
- **S3**: **egress escalonado por GB según Región**, **sin costo de entrada**; **Transfer Acceleration** **extra por GB** según **edge location**.
- **ELB**: **ALB** hora + **LCU (4 dimensiones: new connections/s, active connections/min, GB, rule evaluations)** · **NLB** hora + **LCU-hora (3)** · **CLB** hora + **GB**; **se cobra solo la dimensión más alta**. Ejemplo: **1 × 20 LCU × $0,008 × 730 h = $116,80/mes** (*pricing as of March 2023*).
- **Elastic IP**: **sin cargo** si está **asociada a una instancia running y es la única**; **con cargo** si hay **más de una** o **no está asociada**. La regla de la fuente está **desactualizada** frente al pricing actual de IPv4 pública (registrado).
- **C5n**: red **25 → 100 Gbps**, **+33 % memoria** vs. C5, **6 tamaños** (**2/4/8/16/36/72 vCPU**), **On-Demand/RI/Spot/Dedicated**.
- **Self-check**: *“¿qué tiene cargo por data transfer in?”* → **D. entre servicios de la misma AZ usando IPv4 pública**. Sin rationale oficial.

### 15 — Architecting for Cost - Storage
- **5 categorías**: **objeto (S3)** · **archivo (EFS, FSx Windows, FSx Lustre)** · **bloque (EBS)** · **backup (AWS Backup)** · **transferencia/edge (Storage Gateway, DataSync ×10, Transfer Family SFTP/FTPS/FTP, Snowmobile exabytes)**.
- **EBS**: **sc1** (frío/secuencial/costo) · **st1** (throughput: EMR, ETL, DWH, logs) · **gp2/gp3** (**3 IOPS/GB**, burst **3.000**, boot/DB chica/dev-test) · **io1/io2** (hasta **64.000 IOPS** y **1.000 MB/s**).
- **Snapshots**: **block-level a S3**, redundantes en **dos facilities**; **primero completo**, **siguientes solo deltas**; se cobra **espacio consumido** (sin bloques vacíos).
- **DLM**: automatiza **creación, retención y borrado** → protege, cumple auditoría y **baja costos**; con **EventBridge + CloudTrail** es solución completa **sin costo** (los snapshots sí se cobran).
- **Elección**: **> 80.000 IOPS** o **< 1 ms** → **I4i**; **< 80.000** y **single-digit ms** → **gp2/gp3 (costo)** vs. **io (performance)**; **secuencial > 2.375 MiB/s** → **D3**; **≤ 2.375** → **st1 (performance)** vs. **sc1 (costo)**.
- **Elastic volumes**: cambiar tamaño/tipo/performance **sin detach ni reboot**; **modificar no cuesta**; se cobra la **nueva config** desde que corre.
- **S3**: objeto **hasta 5 TB**, key del desarrollador, **REST/SOAP**; clases **Standard · Intelligent-Tiering · Standard-IA · One Zone-IA · Glacier IR · Glacier Flexible (ex Glacier) · Deep Archive**.
- **Intelligent-Tiering**: **managed**, **3 tiers**, mueve por **último acceso** en un **schedule**, **sin overhead**. **Lifecycle**: **reglas manuales**, **control granular**, **sin fee**. Video **1:18**.
- **Self-check**: *“¿qué describe los snapshots EBS?”* → **A** (point-in-time en S3) y **B** (incrementales). **C/D/E** falsas. Sin rationale oficial.

### 16 — Architecting for Cost - Databases
- **DynamoDB global tables**: **réplicas en varias Regiones**, **mismo nombre y primary key**, **escritura en cualquiera**, **replicación automática**; ideal para **usuarios dispersos**.
- **Pricing**: por **millón de replicated write request units**, **según Región**, más **storage**, **backups** y **data transfer out**. Ejemplo: **29 GB**, **4 M reads + 4 M writes**, réplicas en **Oregon/Singapore/London** → **$61.838/mes** (*May 2023*, separador ambiguo).
- **ElastiCache**: **key-value** con **TTL en segundos**, **Redis** o **Memcached**; **hit** = dato vigente; **miss** = no está o expiró → **base** y **réplica a todos los nodos**; el ahorro es **reducir la capacidad de la base**.
- **Redshift**: **serverless** aprovisiona **en segundos** (variable); **provisioned** para **cargas predecibles**.
- **Reservas**: **1 o 3 años** y **No / Partial / All upfront**; en **RDS/Aurora/Redshift** **No upfront solo 1 año**; **ElastiCache Reserved Node** admite **1–3 años** en las **3** formas y se aplica **primero**.
- **DynamoDB**: **Provisioned Capacity** vs. **Reserved Capacity** (**upfront + hourly por RCU/WCU**); el **exceso** se cobra **estándar**.
- **Caso**: EC2 **c7g.large** $52,93 + S3 (**2.300 GB** + **200 GB**) $70,90 + RDS **db.m6g.large MySQL 20 GB** $113,26 = **$237,09/mes** / **$2.845,08/año**.
- **Con RI 1 año partial**: RDS **$36,17/mes** + **$406 upfront** → **$160/mes** / **$2.326/año** = **18 % menos**; mejor aún **3 años all upfront**.
- **Self-check**: *“¿qué opciones de pago reducen/eliminan el costo mensual?”* → **A. Partial**, **C. All upfront**, **E. 1- y 3-year**. **B** (capacity reservation) y **D** (Spot) no aplican. Sin rationale oficial; opciones incompletas (falta **No upfront**).

### 17 — Designing Observability Solutions
- **3 pilares**: **metrics** (cuánto/qué tan rápido; **CloudWatch**) · **logs** (qué pasó; **CloudWatch Logs**) · **traces** (dónde se fue el tiempo; **X-Ray**). **Ninguno solo alcanza**.
- **Standard metrics**: automáticas, **sin config**, **1 o 5 min** (**EC2**: CPU/red/disco; **ALB**: requests, latencia, errores HTTP). **Custom**: **PutMetricData**, **agent** o **EMF**, hasta **1 s**.
- **EMF**: **JSON** con métricas + contexto → CloudWatch **extrae** → **alarmas/dashboards/anomalías**; **sin PutMetricData** aparte; **una sola salida**.
- **Logs Insights**: **query language** purpose-built, **sin índices ni schema**, **auto-descubre JSON**, **glob** para no estructurados; **costo = volumen escaneado**; se puede **guardar y programar** como **Contributor Insights**.
- **Anomaly detection**: **ML**, **hasta 2 semanas** (se puede habilitar antes), estacionalidad **hourly/daily/weekly**, **banda dinámica**; se **adjunta a alarma**. Brilla con patrones **predecibles por hora** (3 AM vs. 3 PM).
- **Composite alarms**: **AND/OR/NOT** sobre **child alarms**; evita la **cascada** de alertas; **action suppression** en downstream. Ej.: **payment latency AND payment errors → “Payment Service Degraded” → SNS**.
- **Ciclo cerrado**: **métrica → alarma → SNS → Lambda/SSM runbook → remediación (scale out, restart, isolate) → alarma de seguimiento**; **reduce MTTR**.
- **5 key takeaways**: los 3 pilares · EMF · Logs Insights sin índices · anomalías para estacionalidad · composite alarms para ruido. **Sin Knowledge Check**.
- **Pendiente anunciado**: la fuente dice que **la próxima lección cubre tracing en detalle**.

### 18 — Distributed Tracing for Microservices
- **Traza** = **camino end-to-end** de **un request**, unido por **trace ID**; **segment** por **servicio**, **subsegment** por **llamada downstream**; metadata con **HTTP status** y errores.
- **X-Ray SDK**: **Java, Python, Node.js, .NET, Go, Ruby**; captura **incoming**, **HTTP saliente** y **llamadas SDK**; **Lambda/API Gateway** se habilitan **con un setting**; formato **propio**.
- **ADOT**: **OpenTelemetry** con **SDKs, agentes y collectors** soportados por AWS; **vendor-neutral**; exporta a **X-Ray, CloudWatch o third-party**; **instrumentar una vez**.
- **Trace map**: **nodos** = servicios, **aristas** = llamadas; muestra **latencia**, **errores (amarillo)**, **faults (rojo)**, **volumen por grosor** y **dependencias** (DynamoDB, S3, HTTP externos).
- **Investigación**: **mapa → nodo → histograma → traza**; **P99 outliers ≠ lentitud uniforme**; el subsegment dice **si el tiempo se fue en DB, downstream o lógica propia**.
- **Sampling**: **reservoir** (**1/s** default, mínimo garantizado) + **fixed rate** (**5 %** default, adicional); **reglas con prioridad** por **servicio/método/path/atributos**.
- **Tasa alta**: **críticos, payment, auth, deployments nuevos**, P99 preciso; **costo y overhead**. **Tasa baja**: **health checks, static, batch**; **pierde intermitentes y precisión**.
- **4 key takeaways**; **sin Knowledge Check**. Repaso propio en §6.1 (marcado).

### 19 — Synthetic Monitoring and Service-Level Objectives
- **Synthetics**: **canaries** = scripts **programados** que **simulan** requests; corren **sin usuarios**; reportan **availability + latency**; falla → **alarma**. **Heartbeat** (URLs críticas, up/down, status, screenshots) vs. **API** (body, headers, status; detecta **200 con datos malos**).
- **RUM**: **snippet JavaScript**, **sesiones reales** en **near real time**; **page load por fase** (**DNS, connection, first byte, content**), **errores JS**, **navegación/duración**, **Core Web Vitals**.
- **Synthetics vs. RUM**: **controlado/constante/baseline** vs. **real/diverso/impacto**; RUM **no tiene datos sin usuarios**.
- **Application Signals**: descubre servicios **automáticamente**, **Java/Python/Node.js**, **infra-level**, **latency/availability/error rate** por **servicio y operación**; **service map**; provee **SLIs** para SLOs.
- **SLO**: **SLI** (ej. **% requests < 300 ms**) + **attainment goal** (ej. **99,9 %**) + **evaluation window** (**28 o 7 días** rolling).
- **Error budget**: **0,1 % de 28 días ≈ 40 min** con 99,9 %. **Burn rate 1** = se agota al final; **2** = a la mitad; alertas **antes** del breach; **alto/corto** = incidente, **lento/largo** = crónico.
- **Ejemplo**: **30 días = 43.200 min**, **99 % = 42.768 healthy**, **130 unhealthy** (budget implícito **432**; quedan **302**, cálculo propio).
- **4 key takeaways**; **sin Knowledge Check**. Repaso propio en §8.1.

### 20 — Multi-Account Observability
- **Dos roles**: **monitoring account** (cuenta central de operaciones, consulta métricas/logs/trazas de todas las vinculadas **como si fueran propias**) y **source accounts** (workloads que **autorizan** vía **Observability Access Manager**).
- **Límites**: **5** monitoring accounts por source · **100.000** source accounts por monitoring.
- **Subscription filter**: adjunto a un **log group**, entrega **near real time** a **Kinesis Data Stream**, **Kinesis Data Firehose** o **Lambda**; eventos **Base64-encoded** y **comprimidos**.
- **Streaming**: stream centralizado → **consumidor** en la central logging account → **OpenSearch Service / S3**; para **alertas, SIEM y analítica en tiempo real**.
- **Batch archival**: **export task** (**log group + rango de tiempo + bucket S3**); **compliance (7 años)**, **Intelligent-Tiering/Glacier** y **Athena**.
- **Container Insights** (**ECS y EKS**), **tres niveles**: **cluster** (reserva/utilización de CPU y memoria, tasks/nodes) · **servicio** (CPU/memoria, task count, deployment status) · **task/contenedor** (**enhanced observability**: CPU, memoria, red y storage por contenedor).
- **Cuatro decisiones de diseño**: monitoring accounts **alineadas a la org** (por Organization, ambiente o unidad) · filtros **a nivel de cuenta** por patrón · **pipelines separados** operación vs. compliance · **cost allocation tags** porque Container Insights **se cobra como custom metrics**.
- **4 key takeaways**; **sin Knowledge Check**. Repaso propio en §5.1.

---

## ✅ Checklist: lo que tenés que poder explicar

- [ ] Los **4 objetivos** del curso y qué verbo define cada uno (*optimizar*, *hacer cumplir*, *asignar*,
      *optimizar sin degradar*).
- [ ] Por qué **“más barato” no equivale a “optimizado”** si rompe rendimiento o fiabilidad.
- [ ] La diferencia entre **informar** (Cost Explorer, Budgets) y **aplicar** (SCPs, Config).
- [ ] Qué rol cumplen **Organizations** y **Control Tower** como base del marco multi-cuenta.
- [ ] Qué prerequisitos de experiencia declara el curso y cuáles son el piso real.
- [ ] Los **3 focos** de governance at scale y qué pregunta responde cada uno.
- [ ] Los **3 mecanismos** de account management (policy automation, identity federation, account automation).
- [ ] Por qué **SSO** y por qué el acceso se otorga **por rol** y no por cuenta.
- [ ] **Cómo se hereda un guardrail**: hacia abajo, nunca hacia arriba, y qué pasa si se define en un nivel medio.
- [ ] Por qué **una regla sin enforcement es una sugerencia**.
- [ ] Las **3 acciones** de budget enforcement y en qué **orden** se archivan los datos.
- [ ] Por qué la gobernanza **no** es lo contrario de la agilidad.
- [ ] Los **estados** de una guardrail preventive y de una detective (y por qué no se mezclan).
- [ ] En qué **regiones** aplica cada tipo.
- [ ] Por qué **guidance** y **tipo** son ejes **independientes**.
- [ ] Qué se activa por default en una **landing zone nueva**.
- [ ] Los **7 elementos** de una SCP y los **7** de una regla de Config.
- [ ] Por qué **una SCP** puede representar **varias** guardrails mandatory.
- [ ] Por qué una guardrail detective **no** alcanza para cumplir compliance.
- [ ] **Product vs portfolio vs provisioned product** sin dudar.
- [ ] Por qué el **end user** no necesita permisos de EC2/RDS.
- [ ] Qué limitan los **constraints** y para qué se usan.
- [ ] Qué pasa con los usuarios actuales cuando se **versiona** un producto.
- [ ] Cómo **Account Factory** crea la cuenta con **network baseline** y qué pasa al agregar una **OU**.
- [ ] Por qué se recomienda **Enroll account** y no lanzar el producto a mano.
- [ ] Qué es **hub-and-spoke** y qué habilitan los **local launch constraints**.
- [ ] Cómo distingue la consola a un **end user** de un **administrador** (y qué implica en permisos).
- [ ] Por qué el producto es un **template de CloudFormation** y qué parte controla el usuario.
- [ ] Cómo se **componen** dos productos del catálogo (VPC → instancia).
- [ ] Qué detecta **Config** y qué **no** detecta.
- [ ] Por qué los **DNS logs** son exclusivos de **GuardDuty**.
- [ ] **GuardDuty vs Security Hub** en una frase.
- [ ] Cómo **Security Hub** dispara una remediación (EventBridge + Lambda).
- [ ] Qué rol cumple **Systems Manager** cuando otro servicio detecta un problema.
- [ ] El ciclo completo: **definir → monitorear → detectar → notificar → actuar**.
- [ ] La diferencia entre **inventario** y **compliance** (describir vs evaluar).
- [ ] Qué tres cosas guarda el **pilar 1** (inventario, snapshot, historial) y para qué sirve cada una.
- [ ] Por qué el **historial de configuración** es la evidencia de auditoría.
- [ ] Qué significa “en tiempo real” en el pilar 2 (chequeo tras el cambio + notificación).
- [ ] Que los **cinco pilares** de la introducción no son los **dos** del video.
- [ ] Por qué **TagOptions** y **launch constraints** cubren cosas distintas.
- [ ] Las **tres capas** de la pregunta de fintech (cifrar / detectar / responder).
- [ ] Por qué **“comprar todas las RI”** es un anti-patrón de elasticidad.
- [ ] Por qué **Budgets con acciones** no es lo mismo que **Budgets que avisa**.
- [ ] Por qué en la nube el **costo de falla** se elimina para finanzas.
- [ ] Qué significa que el equipo pase de **builder** a **operator y owner**.
- [ ] Las **4 áreas** a adaptar y qué pregunta responde cada una.
- [ ] **Chargeback vs showback** en una frase.
- [ ] Por qué **oversight** incluye **descentralizar**, no solo controlar.
- [ ] La diferencia entre **cost management** (ver) y **cost optimization** (actuar).
- [ ] Por qué **etapa 1** condiciona los costos **por años**.
- [ ] Por qué en **implementation and testing** el costo **sube** y no es una alarma.
- [ ] Qué dato habilita la etapa de **producción** que no existe antes.
- [ ] Las **4 etapas** y los **7 pasos** (y por qué no son la misma lista).
- [ ] El **orden** de los 7 pasos y qué pasa si se optimiza sin asignación ni visibilidad.
- [ ] Las **3 categorías** de herramientas y un servicio de cada una.
- [ ] Qué recomienda **Cost Explorer** además de mostrar el gasto.
- [ ] Cuánto tardan los datos de **Cost Explorer** la primera vez.
- [ ] Cuándo usar **CUR** en lugar de Cost Explorer.
- [ ] Los **6 tipos** de budget (y **utilization vs. coverage**).
- [ ] La **franquicia de 62 budget days** y el costo por día extra.
- [ ] Los **3 tipos** de budget action y la regla de **reseteo**.
- [ ] Por qué **approval** es el default y qué implica.
- [ ] Los **dos tipos** de cost allocation tags y cómo se activan.
- [ ] Qué hace falta para que un tag **aparezca en el reporte**.
- [ ] La **diferencia** entre tag policy y una política que exige tags al crear.
- [ ] Por qué el caso de la empresa de medios ahorró **15 %** (y qué enseña).
- [ ] El **mapeo por verbo**: visualizar / analizar / alertar / actuar / imponer / recomendar.
- [ ] Los **5 pilares** y cuál ataca cada síntoma.
- [ ] Por qué rightsizing es **mensual** y no único.
- [ ] Qué recomienda **Compute Optimizer** y en qué se diferencia de **Cost Explorer**.
- [ ] El ahorro de **Instance Scheduler** y su alcance.
- [ ] **RDS stop vs. Redshift pause** y el **doble criterio** de Redshift.
- [ ] **Compute SP vs. EC2 Instance SP** (flexibilidad vs. descuento).
- [ ] El **orden de aplicación** de un Savings Plan en la Organization.
- [ ] **Standard vs. Standard-IA vs. Intelligent-Tiering vs. lifecycle**.
- [ ] Las **tres etapas** del caso image processing y qué mejora cada una.
- [ ] Por qué **Cost Anomaly Detection** no necesita umbrales.
- [ ] La progresión de **TCO** y por qué managed/serverless lo reduce.
- [ ] Por qué **RI al 90 %** es anti-patrón aunque las RI sean válidas.
- [ ] Qué cambia cuando el presupuesto pasa de **trimestral** a **semanal**.
- [ ] Las **tres capas** de una estrategia proactiva: datos · visibilidad · acción.
- [ ] **Budgets** (umbral definido) vs. **Anomaly Detection** (sin umbral).
- [ ] Qué agrega **EventBridge** a la detección de anomalías.
- [ ] Por qué **“manual”**, **“mensual”** y **“sin automatización”** son señales de distractor.
- [ ] Que el **Knowledge Check 2** cerró en **2/2** y que sus **rationales venían desalineadas**.
- [ ] Las **5 familias** de EC2 y un workload de cada una.
- [ ] Los **dos beneficios** de la última generación.
- [ ] Por qué **instancias más chicas** ajustan mejor en un ASG.
- [ ] **Compute Optimizer vs. Cost Explorer** (configuración vs. ahorro).
- [ ] Qué sigue cobrando con una instancia **stopped**.
- [ ] Las **dos remediaciones** para instancias trabadas.
- [ ] Qué hace **EC2 Fleet** en **una sola API**.
- [ ] **Prioritized vs. capacity-optimized vs. lowest price**.
- [ ] **AWS Auto Scaling vs. EC2 Auto Scaling** (alcance y políticas).
- [ ] **Scheduled vs. target tracking vs. predictive**.
- [ ] El **workflow** de **Instance Scheduler** y su ahorro.
- [ ] Las **tres variables** del costo de transferencia (dirección, origen, destino).
- [ ] Qué es **gratis** dentro de una AZ y con qué condición (IPv4 **privada**).
- [ ] Por qué una **IP pública** cobra **en ambos sentidos**.
- [ ] Los **cinco** servicios free intra-AZ y los **nueve** free cross-AZ.
- [ ] El costo **$0,01 + $0,01** entre AZs y el **$0,02 out / $0 in** entre Regiones.
- [ ] Las **tres reglas** de VPC peering (misma AZ, distintas AZ, distintas Regiones).
- [ ] Qué incluye **S3 Transfer Acceleration** en el precio.
- [ ] Las **4 dimensiones** de LCU de ALB y las **3** de NLB.
- [ ] Por qué se cobra **solo la dimensión más alta**.
- [ ] El cálculo **20 LCU × $0,008 × 730 h** y qué **no** incluye.
- [ ] Las **tres condiciones** para que una EIP no cobre.
- [ ] Los **seis tamaños** de C5n y su rango de red.
- [ ] Las **cinco categorías** de storage y un servicio de cada una.
- [ ] Los **cuatro tipos** de volumen EBS y su métrica (IOPS vs. throughput).
- [ ] Los **dos umbrales**: **80.000 IOPS** y **2.375 MiB/s**.
- [ ] Por qué **gp2 y gp3 no son iguales**.
- [ ] Que el **primer snapshot es completo** y el resto **incremental**.
- [ ] Dónde se guardan los snapshots y qué implica para **restaurar en otra AZ**.
- [ ] Qué automatiza **DLM** y qué **no** cobra.
- [ ] Las **tres condiciones** de resize sin downtime y el costo de modificar.
- [ ] Las **siete** storage classes y su eje (frecuencia/latencia).
- [ ] **Intelligent-Tiering vs. Lifecycle** (managed vs. reglas).
- [ ] Cómo funciona una **DynamoDB global table** y qué significa “escribir en cualquier réplica”.
- [ ] Qué mueve el precio de una **global table**.
- [ ] **Cache hit vs. cache miss** y qué hace ElastiCache en el miss.
- [ ] En qué unidad se expresa el **TTL**.
- [ ] Por qué el ahorro de ElastiCache es **reducir la base**, no “tener caché”.
- [ ] **Redshift serverless vs. provisioned** por tipo de carga.
- [ ] Las **tres formas de pago** y la restricción de **No upfront** en RDS.
- [ ] **Reserved Node** de ElastiCache y su orden de aplicación.
- [ ] **Reserved Capacity** de DynamoDB y qué pasa con el **exceso**.
- [ ] El **caso**: **$237,09 → $160/mes**, **$2.326/año**, **18 %**, y por qué el mensual no incluye el upfront.
- [ ] Los **tres pilares** y la pregunta que responde cada uno.
- [ ] Por qué **ningún pilar solo** alcanza.
- [ ] La diferencia entre **standard y custom metrics** (configuración y resolución).
- [ ] Los **tres pasos** del **embedded metric format**.
- [ ] Qué **no** requiere Logs Insights (índices/schema) y qué **sí** cuesta (datos escaneados).
- [ ] Las **4** consultas típicas de Logs Insights.
- [ ] **Anomaly detection**: historia usada, estacionalidades y banda.
- [ ] Cuándo **no** conviene anomaly detection.
- [ ] **Composite alarm**: lógica, child alarms y **action suppression**.
- [ ] El **ciclo cerrado** de 5 pasos y por qué la **alarma de seguimiento** es clave.
- [ ] **Segment vs. subsegment**.
- [ ] **X-Ray SDK vs. ADOT**: lenguajes, formato y destinos.
- [ ] Cuándo **Lambda/API Gateway** no requieren cambios de código.
- [ ] Qué muestra un **trace map** y por qué **no** es un diagrama estático.
- [ ] El flujo **mapa → nodo → histograma → traza**.
- [ ] **P99 outliers** vs. **lentitud uniforme**.
- [ ] **Reservoir** y **fixed rate** con sus **defaults**.
- [ ] Cómo se combinan reservoir y fixed rate.
- [ ] Qué endpoints merecen **tasa alta** y cuáles **tasa baja**.
- [ ] Qué es un **canary** y por qué es **proactivo**.
- [ ] **Heartbeat vs. API canary** y el caso del **200 con datos malos**.
- [ ] Qué mide **RUM** y por qué **no** reemplaza a Synthetics.
- [ ] El **desglose por fase** del page load.
- [ ] Qué aporta **Application Signals** y en qué runtimes.
- [ ] Los **tres componentes** de un SLO.
- [ ] **SLI vs. SLO vs. SLA**.
- [ ] Calcular el **error budget** de **99,9 % en 28 días**.
- [ ] **Burn rate 1 vs. 2** y por qué alerta antes.
- [ ] El **ejemplo de 30 días** (43.200 / 42.768 / 130).
- [ ] Quién **autoriza** en OAM y qué dirección tiene el permiso.
- [ ] Los **límites**: **5** monitoring accounts por source y **100.000** source accounts por monitoring.
- [ ] Por qué la monitoring account ve los datos **“como si fueran propios”** y qué **no** puede hacer.
- [ ] Los **tres destinos** de un **subscription filter** y el **encoding** de los eventos.
- [ ] **Real-time streaming vs. batch archival** por **latencia, usuario y pregunta** que responde.
- [ ] Qué especifica un **export task**.
- [ ] La **imprecisión** de “export on a scheduled basis”.
- [ ] Los **tres niveles** de **Container Insights** y qué responde cada uno.
- [ ] Qué agrega la **enhanced observability**.
- [ ] Las **cuatro decisiones** de diseño multi-cuenta.
- [ ] Por qué el **account-level subscription filter** escala y el filtro por log group no.
- [ ] Por qué hay que **taggear** Container Insights.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| — | *(sin dudas abiertas)* | — | — |

---

## ⏳ Pendiente del módulo

- [x] Cargar la **lección 01** ([[Course Overview]]).
- [x] **Discrepancia resuelta**: la lección [[Governance at Scale]] confirma que el curso arranca por
      governance/costos; el overview corresponde a este módulo.
- [x] Cargar **Governance at Scale** ([[Governance at Scale]]).
- [x] Cargar **Establishing Guardrails** ([[Establishing Guardrails]]).
- [x] Cargar **Management Controls** ([[Management Controls]]).
- [x] Cargar **Demonstration: AWS Service Catalog** ([[Demonstration - AWS Service Catalog]]).
- [x] Cargar **Detective Controls** ([[Detective Controls]]).
- [x] Cargar **Cloud Governance Pillars** ([[Cloud Governance Pillars]]).
- [x] Cargar el **Knowledge Check** del módulo ([[Knowledge Check]]).
- [x] **Knowledge Check rendido: 3/3 (26/10/2026)** — las tres rationales oficiales están en la nota.
- [x] Cargar **Cloud Cost Management** ([[Cloud Cost Management]]).
- [x] Cargar **Cost Management Tools** ([[Cost Management Tools]]).
- [x] Cargar **Cost Optimization** ([[Cost Optimization]]).
- [x] Cargar el **Knowledge Check 2** ([[Knowledge Check 2]]).
- [x] **Knowledge Check 2 rendido: 2/2 (26/10/2026)** — *rationales oficiales desalineadas, registradas*.
- [x] Cargar **Architecting for Cost - Compute** ([[Architecting for Cost - Compute]]).
- [x] Cargar **Architecting for Cost - Networking** ([[Architecting for Cost - Networking]]).
- [x] Cargar **Architecting for Cost - Storage** ([[Architecting for Cost - Storage]]).
- [x] Cargar **Architecting for Cost - Databases** ([[Architecting for Cost - Databases]]).
- [x] Cargar **Designing Observability Solutions** ([[Designing Observability Solutions]]).
- [x] Cargar **Distributed Tracing for Microservices** ([[Distributed Tracing for Microservices]]).
- [x] Cargar **Synthetic Monitoring and Service-Level Objectives** ([[Synthetic Monitoring and Service-Level Objectives]]).
- [x] Cargar **Multi-Account Observability** ([[Multi-Account Observability]]).
- [ ] **Completar** las secciones *Systems Manager governance* y *Security Hub governance* (llegaron como flashcards sin texto).
- [x] **Definir el tamaño del módulo**: **20 sesiones** ([[Course Overview]] + 19 lecciones), **21 archivos**, **~9.007 líneas**.
- [ ] Revisar si el learning plan trae **labs** para este módulo.
- [x] **Módulo cerrado el 26/10/2026** — **0 links rotos** en los 21 archivos. Quedan abiertas solo las dos secciones de governance que nunca llegaron como texto; **no bloquean el cierre**.

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — módulo anterior (cerrado)
- [[Course Overview]] — presentación y objetivos del curso
- [[Governance at Scale]] — los tres focos y la herencia de guardrails
- [[Establishing Guardrails]] — preventive vs detective, guidance, SCP y Config
- [[Management Controls]] — AWS Service Catalog, portfolios, constraints y Account Factory
- [[Demonstration - AWS Service Catalog]] — la demo en pantalla del flujo de autoservicio
- [[Detective Controls]] — Config, Systems Manager, GuardDuty y Security Hub
- [[Cloud Governance Pillars]] — inventario/configuración y compliance de configuración
- [[Knowledge Check]] — evaluación del módulo con respuestas y anti-patrones
- [[Knowledge Check 2]] — cierre del bloque de costos: 2/2 y anti-patrones
- [[Architecting for Cost - Compute]] — familias EC2, rightsizing, Fleet y Auto Scaling
- [[Architecting for Cost - Networking]] — data transfer por AZ/Región/VPC, LCU y Elastic IP
- [[Architecting for Cost - Storage]] — EBS, snapshots, S3 classes y lifecycle
- [[Architecting for Cost - Databases]] — global tables, caché, reservas y caso numérico
- [[Designing Observability Solutions]] — los 3 pilares, EMF, Logs Insights y composite alarms
- [[Distributed Tracing for Microservices]] — X-Ray, ADOT, trace map y sampling
- [[Synthetic Monitoring and Service-Level Objectives]] — canaries, RUM, SLO y error budgets
- [[Multi-Account Observability]] — OAM, subscription filters, Container Insights y diseño a escala
- [[Cloud Cost Management]] — consumo tradicional vs nube, 4 áreas, 4 etapas y 7 pasos
- [[Cost Management Tools]] — Cost Explorer, CUR, Budgets + actions, tagging y tag policies
- [[Cost Optimization]] — los 5 pilares, rightsizing, elasticidad, pricing, storage y anomalías
- [[3.1 Estrategia para mejorar la excelencia operativa general]] — la tarea del examen que este módulo cubre
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]] — logging, monitoreo y controles
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] · [[3.5 Identificar oportunidades de optimización de costos]] — el eje de costos
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- [[Definicion servicios]] — definiciones de los servicios mencionados
