---
title: "AWS Solutions Architect Advanced - Operational Resilience"
aliases:
  - "Operational Resilience"
  - "Índice Operational Resilience"
  - "Módulo de resiliencia operativa"
  - "Resiliencia operativa"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - resilience
  - resiliencia
  - indice
status: en-curso
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) - AWS Skill Builder"
---

# AWS Solutions Architect Advanced - Operational Resilience

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> **Estado (29/10/2026):** módulo **abierto**, **10 lecciones cargadas** (01-10). Sesión de casos prácticos *BuildingBlocks* completada:
> **BuildingBlocks Videos** analizando dos escenarios reales: (1) Base de datos e-commerce con RPO $< 1\text{ s}$ y RTO $< 2\text{ min}$ resuelta con **Aurora Global Database** (descartando scripts manuales y AWS DMS), y (2) Carga de trabajo con RTO $< 4\text{ h}$ y RPO $< 15\text{ min}$ optimizada en costo mediante **Warm Standby** (descartando el sobrecosto de Active-Active y el riesgo de tiempo de Pilot Light).

> [!info] Mapeo del examen
> **Confirmado con las lecciones 01 a 10.** El temario ataca directamente:
> * **2.2 - Diseñar una solución para garantizar la continuidad de actividades** (capstone integral: RTO/RPO predecibles con S3 RTC, AWS Backup multi-región, Restore Testing, preservación del Glue Data Catalog, Aurora Global Database con RTO $< 1\text{ min}$ y selección de Warm Standby vs Pilot Light).
> * **2.4 - Diseñar una estrategia para cumplir con los requisitos de fiabilidad** (resiliencia de almacenamiento en S3, tolerancia a desastres regionales, replicación dedicada de storage en Aurora y pruebas no destructivas).
> * **1.4 - Diseñar un entorno de AWS de varias cuentas** (Backup Policies en AWS Organizations con separación de funciones).
> * **1.2 / 2.3 - Prescribir y determinar controles de seguridad** (cifrado en reposo con KMS CMKs en bóvedas A y B, inmutabilidad WORM, auditoría con CloudTrail/Config/Backup Audit Manager).
> * **1.5 / 2.6 - Optimización de costos** (trade-offs de almacenamiento y cómputo: descartar resultados transitorios de Athena, seleccionar Warm Standby frente al 200% de Active-Active, y autolimpieza de recursos temporales).
> * **2.5 / 3.1 - Rendimiento y excelencia operativa** (coordinación de ventanas de backup vía Resource Scheduling para no degradar jobs de Glue ETL ni consultas Athena; automatización administrada sin scripts artesanales).

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **"Para el examen" + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como 🟢 solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 🗺️ Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | Course Overview | Un objetivo y cinco casilleros: protección, DR, performance, SLA/KPI | 🔵 | [[Course Overview - Operational Resilience]] |
| 02 | Gathering the Customer Requirements | Caso Data Lake S3: mito tradicional, RTO/RPO y seis requisitos | 🔵 | [[Gathering the Customer Requirements - Resilience]] |
| 03 | Building a Data Protection Strategy | Marco de protección en 5 capas, RPO vs RTO, 11-9s, KMS/CloudHSM y DRS | 🔵 | [[Building a Data Protection Strategy]] |
| 04 | Disaster Recovery | Backup vs DR, las 4 estrategias (Pilot Light vs Warm Standby), RTO/RPO y costos | 🔵 | [[Disaster Recovery]] |
| 05 | Disaster Recovery Strategies | AWS Backup: Backup Plans, asignación por Tags, PITR, Audit Manager y restore EFS | 🔵 | [[Disaster Recovery Strategies]] |
| 06 | AWS Systems Manager | Gestión híbrida sin puertos inbound, Automation (runbooks/cuotas) y Patch Manager | 🔵 | [[AWS Systems Manager]] |
| 07 | AWS Service Level Agreements | 4 componentes de SLAs, disponibilidad compuesta, créditos de servicio y shared responsibility | 🔵 | [[AWS Service Level Agreements]] |
| 08 | Key Performance Indicators | SLA vs SLO vs KPI, baselines/thresholds, CloudWatch, X-Ray y Synthetics | 🔵 | [[Key Performance Indicators]] |
| 09 | Finished Architecture | Capstone Data Lake: AWS Backup multi-región, S3 RTC, Restore Testing y Organizations | 🔵 | [[Finished Architecture - Resilience]] |
| 10 | BuildingBlocks Videos | Dos casos: Aurora Global DB (RPO < 1s/RTO < 2m) y Warm Standby (RTO < 4h/RPO < 15m) | 🔵 | [[BuildingBlocks Videos - Resilience]] |

Estados: ⬜ sin cargar · 🔵 resumen cargado · 🟣 consolidado y enlazado · 🟢 repasado con preguntas.

> [!note] Pendiente de la numeración total
> La tabla se llena **en el mismo movimiento** que cada nota. Las lecciones 01 a 10 **no declaran** cuántas sesiones
> tiene el módulo en total: habitualmente culmina con la *Activity: Architecture Challenge* (lección 11).

---

## 📐 Reglas del módulo

Las mismas de los módulos anteriores, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, algoritmos, nombres exactos de servicios y políticas.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

**Formato de cada nota:** [[_Plantilla de lección]] + [[_Estandar de formato]].

---

## 📚 Qué cubre cada sesión

### 01 — Course Overview
- **Formato**: página de texto con **Course details** y resumen general.
- **Compromiso**: un objetivo único para diseñar e implementar entornos enterprise-grade priorizando seguridad, resiliencia y excelencia operativa, cumpliendo SLAs y KPIs.
- **Servicios adelantados**: KMS, Config, AWS Backup, Elastic Disaster Recovery (DRS) y replicación de BDs.

### 02 — Gathering the Customer Requirements
- **Formato**: video de 4 min 01 s (Melissa Coger-Huezo) + flashcard prompt interactivo.
- **El caso**: institución financiera replantea la resiliencia de su BI infrastructure con un data lake en Amazon S3, ingesta heterogénea (sensores, socios, manual) y analítica con AWS Glue y Amazon Athena.
- **El cambio de paradigma**: desafía el mito de que "los data lakes no se respaldan porque se pueden recrear"; a escala de petabytes y bajo SLOs estrictos, el tiempo y costo de re-ejecución viola el RTO y el RPO.
- **Los seis requisitos**: backup escalable, protección multinivel (*tiering*), automatización, inmutabilidad (WORM), pistas de auditoría completas y optimización de costos.
- **La trampa**: confiar en re-ejecutar jobs de Glue como mecanismo de DR cuando las fuentes de ingesta son efímeras o el RTO es de pocas horas.

### 03 — Building a Data Protection Strategy
- **Formato**: video de 4 min 57 s + lectura profunda + estrategia de 7 pasos.
- **Conceptos**: mitigación de la complejidad on-premise mediante la nube; definición técnica de RPO (frecuencia/pérdida de datos) y RTO (tiempo total de caída incluyendo cómputo); 5 capas de protección (AWS Backup, S3 11 nueves en $\ge 3$ AZs, KMS/CloudHSM FIPS 140-2 Level 3, Custom Key Stores, AWS DRS, CloudTrail/Config/CloudWatch); clasificación dinámica de datos y data fusion.
- **La trampa**: creer que el RTO termina al restaurar el almacenamiento; debe incluir la inicialización y reconexión del cómputo y la red. O implementar código custom para CloudHSM en lugar de Custom Key Stores integrados con KMS.

### 04 — Disaster Recovery
- **Formato**: video de 7 min 35 s + lectura comparativa + 4 marcadores de estrategia.
- **Conceptos**: Backup (restaura datos, horas/días) vs Disaster Recovery (recupera la app y el estado completo, minutos/segundos); espectro de las cuatro estrategias de DR: Backup & Restore (sin cómputo en destino, horas/días), Pilot Light (cómputo creado pero APAGADO, 15–60 min, cero costo de cómputo en AWS), Warm Standby (cómputo ENCENDIDO a escala reducida, minutos, corre tráfico mínimo), Hot Standby (duplicado 1:1 activo-pasivo o activo-activo en tiempo real).
- **La trampa**: confundir Pilot Light (instancias apagadas) con Warm Standby (instancias encendidas y corriendo a escala reducida).

### 05 — Disaster Recovery Strategies
- **Formato**: video de 8 min 59 s + guía de 8 pasos + reglas de restauración y auditoría.
- **Conceptos**: marco de 6 preguntas de diseño de backup; plano de control centralizado con AWS Backup; Backup Plans creados desde plantilla, cero o JSON; asignación por Tags; ventanas start/complete within; PITR para S3/DynamoDB; Windows VSS para consistencia de aplicaciones en EC2; observabilidad con CloudWatch, EventBridge, CloudTrail y AWS Backup Audit Manager; regla de no-sobreescritura al restaurar (crea nuevo recurso); restauración de elementos en Amazon EFS preservando la jerarquía completa.
- **La trampa**: asumir que la restauración sobreescribe producción (siempre crea recurso nuevo) o montar instancias intermedias con rsync para EFS en vez de usar la restauración jerárquica nativa a directorio raíz.

### 06 — AWS Systems Manager
- **Formato**: lectura profunda + arquitectura de 6 componentes + cuotas de Automation + mecánica de Patch Manager.
- **Conceptos**: arquitectura de control centralizado de SSM; comunicación saliente HTTPS/443 del SSM Agent (cero puertos de entrada SSH 22 / RDP 3389); soporte híbrido con Activation Code; Parameter Store con KMS; Runbooks de Automation (YAML/JSON, 20 acciones, cuotas de 100 concurrentes, cola de 5.000, 25 rate control); Patch Manager con custom patch baselines, auto-approval delay, soporte multi-cuenta/región vía Organizations, y exportación de compliance a S3 en CSV; limitación de Windows Server a aplicaciones de Microsoft.
- **La trampa**: abrir puertos 22/3389 o crear bastiones cuando Session Manager y SSM Agent resuelven el acceso de forma segura sin IP pública; o esperar que Patch Manager actualice software de terceros en Windows Server.

### 07 — AWS Service Level Agreements
- **Formato**: lectura profunda + análisis contractual de SLAs + fórmulas de disponibilidad.
- **Conceptos**: los 4 componentes de los SLAs (Service Commitment, Measurement Period, Service Credits, Exclusions); tipos de acuerdos (Customer, Service, Multi-level); ley de disponibilidad compuesta: las dependencias en serie multiplican sus SLAs reduciendo la disponibilidad total por debajo del eslabón más débil, mientras que dependencias en paralelo la aumentan; escala estándar de Service Credits (10% entre 99% y 99.9%, 25% entre 95% y 99%, 100% bajo 95%); protocolo de reclamo antes del 2º ciclo de facturación con asunto "SLA Credit Request" (mínimo $1 USD, no reembolsable en efectivo); exclusión de servicios gratuitos; modelo de responsabilidad compartida para resiliencia (resiliencia DE la nube vs EN la nube).
- **La trampa**: calcular la disponibilidad de un sistema en serie promediando los SLAs individuales en lugar de multiplicarlos; o asumir que un SLA de AWS compensa pérdidas comerciales en efectivo en vez de emitir créditos para facturas futuras.

### 08 — Key Performance Indicators
- **Formato**: lectura profunda + comparativa SLA/SLO/KPI + arquitectura CloudWatch/X-Ray + flujo en 6 pasos.
- **Conceptos**: la tríada de gestión: SLAs (compromiso contractual externo), SLOs (metas internas de fiabilidad con Error Budgets) y KPIs (métricas técnicas internas: latencia, error rates, throughput); baselines históricas y umbrales (thresholds) sin falsos positivos; observabilidad profunda: CloudWatch (Container Insights en EKS/ECS, Logs Insights, Custom Metrics EMF), AWS X-Ray (Service Map, rastreo de dependencias y latencia en microservicios, CloudWatch ServiceLens); flujo de integración en 6 pasos con instrumentación ADOT y monitoreo sintético continuo 24/7 con CloudWatch Synthetics canaries.
- **La trampa**: confiar únicamente en métricas pasivas de infraestructura (CPU/memoria) cuando la degradación de experiencia de usuario o cuellos de botella en microservicios exigen trazabilidad distribuida (X-Ray) y canarios sintéticos activos (Synthetics).

### 09 — Finished Architecture
- **Formato**: video de 5 min 31 s (Melissa Coger-Huezo) + arquitectura recap + análisis de trade-offs.
- **Conceptos**: arquitectura final integrada para el Data Lake financiero; AWS Backup centralizado con Backup Policies en AWS Organizations (separación de funciones); discriminación de datos por Tags (respaldo de datos crudos, transformados y Glue Data Catalog; exclusión explícita de Athena Query Results por trade-off de costos); dos bóvedas de backup multi-región (Región A y B) cifradas con KMS CMK; replicación de S3 con S3 Replication Time Control (S3 RTC) garantizando 99.9% en < 15 min para cumplir SLOs; AWS Backup Restore Testing con validación automática y destrucción limpia de recursos temporales (auto-cleanup); coordinación de ventanas con Glue ETL mediante Resource Scheduling; auditoría con AWS Backup Audit Manager, Config y CloudWatch dashboards.
- **La trampa**: usar replicación estándar de S3 sin RTC cuando el negocio exige un RPO de 15 minutos con respaldo de SLA; o respaldar resultados de Athena en lugar de asegurar el Glue Data Catalog.

### 10 — BuildingBlocks Videos
- **Formato**: 2 videos técnicos (Melissa y Joe, 2 min 34 s y 2 min 54 s) + matrices comparativas de decisión.
- **Caso 1 (Base de Datos E-commerce)**: carrito de compras en Aurora MySQL con requisitos de RPO $< 1\text{ s}$ (cero pérdida de datos) y RTO $< 2\text{ min}$ ante desastre regional. Se comparan réplicas multi-región con scripts custom (frágiles, lentos), AWS DMS (diseñado para migraciones/CDC, no para failover de alta disponibilidad) y **Amazon Aurora Global Database** (replicación dedicada a nivel del cluster volume de storage, sin impacto en la instancia primaria, failover en $< 1\text{ min}$, RPO $= 0$ planificado / sub-segundo no planificado).
- **Caso 2 (Estrategia de DR Óptima)**: aplicación empresarial con RTO $< 4\text{ horas}$ y RPO $< 15\text{ minutos}$ con restricción estricta de presupuesto. Trade-offs analizados: Active-Active (costo prohibitivo del 200% y egress masivo), Pilot Light (cómputo apagado; levantar instancias, restaurar snapshots y escalar puede superar las 4 horas) y **Warm Standby** (punto dulce exacto: base de datos replicando continuamente para RPO $< 15\text{ min}$, flota mínima encendida para verificar health y escalar en minutos con Auto Scaling).
- **La trampa**: elegir AWS DMS para failover automatizado de bases de datos de producción; o recomendar Active-Active cuando el RTO tolerado es de 4 horas y el presupuesto es una restricción clave.

---

## ✅ Checklist: lo que tenés que poder explicar

- [ ] Por qué el enfoque tradicional de *“no respaldar el data lake porque se recrea del origen”* fracasa ante petabytes y RTOs estrictos.
- [ ] Los **seis requisitos** de arquitectura para resiliencia de data lakes (escalable, multinivel, automatizado, inmutable, auditable, optimizado en costo).
- [ ] La diferencia entre **RTO** (tiempo para restaurar la operatividad de Athena/Glue/cómputo) y **RPO** (pérdida máxima tolerable de datos ingeridos).
- [ ] Las **cinco capas** de una estrategia de protección de datos en AWS (Backup, Cifrado, DR, Monitoreo, Clasificación).
- [ ] Las diferencias fundamentales entre **Backup** (guardar datos) y **Disaster Recovery** (recuperar la aplicación y el estado del sistema).
- [ ] Las **cuatro estrategias de DR** (Backup & Restore, Pilot Light, Warm Standby, Hot Standby) ordenadas por RTO/RPO y costo.
- [ ] El estado del cómputo (EC2) en destino para **Pilot Light** (creado pero *switched-off*, cero costo de cómputo) vs **Warm Standby** (*running* a escala mínima).
- [ ] Las **seis preguntas clave** para definir una estrategia de backup en AWS.
- [ ] Los componentes de un **Backup Plan** y sus 3 formas de creación (Template, Scratch, JSON).
- [ ] El soporte de **Continuous Backup / PITR** para Amazon S3 y Amazon DynamoDB en AWS Backup.
- [ ] La función de **Windows VSS** en backups consistentes de Amazon EC2.
- [ ] Cómo **AWS Backup Audit Manager** genera reportes formales de conformidad para auditores.
- [ ] La regla de no-destrucción al restaurar y la preservación jerárquica en **Amazon EFS**.
- [ ] Por qué el **SSM Agent** no requiere puertos de entrada (*inbound*) abiertos ni IPs públicas.
- [ ] Cómo se gestionan servidores locales y VMs en Systems Manager mediante códigos de activación híbrida.
- [ ] Las **cuotas de Systems Manager Automation** (100 concurrentes, 5.000 en cola, 25 rate control).
- [ ] La función del *auto-approval delay* en los **Custom Patch Baselines** de Patch Manager.
- [ ] La limitación de parches de aplicaciones en **Windows Server** (solo software de Microsoft).
- [ ] El formato de exportación de reportes de cumplimiento de Patch Manager hacia Amazon S3 (**CSV**).
- [ ] Los **cuatro componentes estándar** de un SLA de AWS (Compromiso, Período, Créditos, Exclusiones).
- [ ] El cálculo matemático de la **disponibilidad compuesta** en arquitecturas en serie vs. en paralelo.
- [ ] La escala escalonada de **Service Credits** de AWS (10%, 25%, 100%) y sus umbrales de uptime mensual.
- [ ] El procedimiento y plazo formal de reclamación de créditos (antes del fin del **segundo ciclo de facturación**).
- [ ] La división de la resiliencia en el **Modelo de Responsabilidad Compartida** (de la nube vs. en la nube).
- [ ] Las diferencias conceptuales entre **SLA** (externo/contractual), **SLO** (meta técnica interna con Error Budget) y **KPI** (métrica de rendimiento).
- [ ] La definición y utilidad de **Baselines** (patrones históricos) y **Thresholds** (umbrales de alerta).
- [ ] Cómo evitar la fatiga de alertas mediante **CloudWatch Anomaly Detection**.
- [ ] El rol de **Container Insights** para monitorear clústeres y pods en Amazon EKS y ECS.
- [ ] Cómo **AWS X-Ray Service Map** y **CloudWatch ServiceLens** aíslan cuellos de botella de latencia en microservicios.
- [ ] El uso de **CloudWatch Synthetics Canaries** para probar endpoints y APIs proactivamente sin tráfico real de usuarios.
- [ ] Cómo las **Backup Policies en AWS Organizations** garantizan gobernanza y separación de funciones a escala multi-cuenta.
- [ ] La garantía técnica y SLA de **S3 Replication Time Control (S3 RTC)** (99.9% en $< 15$ min).
- [ ] El mecanismo de **AWS Backup Restore Testing** y su función de autolimpieza (*auto-cleanup*) de recursos temporales.
- [ ] Por qué se respalda el **AWS Glue Data Catalog** y se excluyen los **resultados de consultas de Amazon Athena**.
- [ ] Cómo **Resource Scheduling** en AWS Backup previene colisiones de I/O con los procesos de ETL de Glue.
- [ ] Por qué **AWS DMS** no es una solución de Disaster Recovery o failover automatizado.
- [ ] La ventaja de **Amazon Aurora Global Database** sobre las réplicas tradicionales con scripts custom (replicación a nivel de storage vs réplica lógica en motor).
- [ ] El comportamiento del RPO en **Aurora Global Database** (RPO $= 0$ en failovers planificados / sub-segundo en no planificados) y RTO $< 1$ minuto.
- [ ] El criterio de selección de DR para **RTO $< 4$ horas y RPO $< 15$ minutos**: por qué **Warm Standby** supera tanto a Pilot Light como a Active-Active en balance costo/recuperación.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| 1 | **Propuestas de las flashcards de la Lección 02**: el scraper no capturó el reverso de las tarjetas con las propuestas de Melissa para cada requisito. | **Cerrada** ✅ | Resuelto en [[Finished Architecture - Resilience]]: Melissa confirmó Backup con Organizations, S3 RTC, KMS CMK, Restore Testing y exclusión de Athena results. |

---

## 📌 Pendiente del módulo

- [x] Cargar la **lección 01** y anotar sus **objetivos** en este índice ([[Course Overview - Operational Resilience]]).
- [x] Cargar la **lección 02** y registrar el caso del Data Lake ([[Gathering the Customer Requirements - Resilience]]).
- [x] Cargar la **lección 03** y consolidar el marco de protección en 5 capas ([[Building a Data Protection Strategy]]).
- [x] Cargar la **lección 04** y estructurar el espectro de las 4 estrategias de DR ([[Disaster Recovery]]).
- [x] Cargar la **lección 05** y profundizar en la arquitectura técnica de AWS Backup ([[Disaster Recovery Strategies]]).
- [x] Cargar la **lección 06** y detallar la gobernanza híbrida y parches con AWS Systems Manager ([[AWS Systems Manager]]).
- [x] Cargar la **lección 07** y desglosar el marco contractual y técnico de los SLAs ([[AWS Service Level Agreements]]).
- [x] Cargar la **lección 08** y estructurar la medición de KPIs, baselines y observabilidad profunda ([[Key Performance Indicators]]).
- [x] Cargar la **lección 09** y consolidar la arquitectura final capstone ([[Finished Architecture - Resilience]]).
- [x] Cargar la **lección 10** e integrar los dos casos de BuildingBlocks ([[BuildingBlocks Videos - Resilience]]).
- [ ] Cargar la **lección 11** (Activity: Architecture Challenge) cuando esté disponible.
- [ ] **Contar las lecciones del módulo** cuando la fuente lo permita (no se deduce antes).
- [ ] **Confirmar el mapeo** de tareas (2.2 / 1.3 / 2.5 / 3.1 / 3.3 / 1.4 / 1.5) con las lecciones de servicio.
- [ ] Revisar si el learning plan trae **labs** para este módulo.
- [ ] Cerrar el módulo: checklist consolidado, mapa de progreso final y **quiz integrador**.

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[Course Overview - Operational Resilience]] — lección 01 del módulo
- [[Gathering the Customer Requirements - Resilience]] — lección 02 del módulo
- [[Building a Data Protection Strategy]] — lección 03 del módulo
- [[Disaster Recovery]] — lección 04 del módulo
- [[Disaster Recovery Strategies]] — lección 05 del módulo
- [[AWS Systems Manager]] — lección 06 del módulo
- [[AWS Service Level Agreements]] — lección 07 del módulo
- [[Key Performance Indicators]] — lección 08 del módulo
- [[Finished Architecture - Resilience]] — lección 09 (capstone del módulo)
- [[BuildingBlocks Videos - Resilience]] — lección 10 (discusiones técnicas de arquitectura)
- [[BuildingBlocks Videos]] — BuildingBlocks del módulo Multi-Account
- [[BuildingBlocks Videos - Networking]] — BuildingBlocks del módulo de Redes Avanzadas
- [[BuildingBlocks Videos - Security]] — BuildingBlocks del módulo de Seguridad
- [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] — módulo anterior: la **conectividad**
  híbrida que este módulo va a poner a prueba en términos de **resiliencia**
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — monitoreo,
  **SLO** y detección: la otra mitad de la operación
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — la red **dentro** de AWS
- [[AWS Solutions Architect Advanced - Securing Networks and Data]] — los controles que la continuidad debe
  preservar
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — cuentas y gobierno donde corre
  el **DR**
- [[2.2 Diseñar una solución para garantizar la continuidad de actividades]] — continuidad, SLAs y DR
- [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]] — fiabilidad, tolerancia a fallas y disponibilidad compuesta
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — Backup Policies en AWS Organizations
- [[1.2 Prescribir controles de seguridad]] — cifrado KMS CMK y bóvedas
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — costos en DR y exclusión de Athena results
- [[3.1 Estrategia para mejorar la excelencia operativa general]] — excelencia operativa y observabilidad
- [[3.3 Estrategia para mejorar el rendimiento]] — optimización de latencia y cuellos de botella
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — SLAs de rendimiento y latencia
