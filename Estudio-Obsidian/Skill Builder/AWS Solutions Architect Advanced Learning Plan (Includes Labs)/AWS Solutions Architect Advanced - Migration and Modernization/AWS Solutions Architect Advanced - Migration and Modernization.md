---
title: "AWS Solutions Architect Advanced — Migration and Modernization"
aliases:
  - "Migration and Modernization"
  - "Índice Migration and Modernization"
  - "Módulo de migración y modernización"
  - "Migración y modernización"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - migration
  - modernization
  - migracion
  - modernizacion
  - indice
  - dominio-4
status: completo
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Migration and Modernization

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> **Estado (29/10/2026):** módulo **completo**, **17 lecciones cargadas** (01-17).
> Se consolidó la hoja de ruta, el caso de Utilities, la preparación (*Assess*), el proceso y las 7 Rs (*Mobilize*),
> las herramientas de infraestructura (**Control Tower** y **DataSync** en Lección 05), la visión agéntica (**AWS Transform Overview**),
> la inmersión en **AWS Transform for VMware**, el motor troncal de Rehost (**AWS Application Migration Service - MGN**),
> la transferencia masiva de almacenamiento con **AWS DataSync** (Lección 09), la migración de bases de datos
> con **AWS DMS** y **AWS SCT** (Lección 10), la visión estratégica de **Modernize the Enterprise** (Lección 11),
> la progresión en cuatro fases de **Before and After Modernization** (Lección 12), la contenedorización con **Using Containers to Modernize**
> y **AWS App2Container** (Lección 13), el paradigma serverless en **Use Serverless Architectures** (Lección 14),
> el capstone de arquitectura en **Finished Architecture - Migration** (Lección 15), los debates técnicos
> avanzados de **BuildingBlocks Videos - Migration** (Lección 16), y la evaluación integradora de cierre
> **Activity: Architecture Challenge — Migration** (Lección 17), resolviendo el caso de **AnyCompany Cookies**
> a través de 6 Knowledge Checks centrados en sincronización global con **AWS DataSync** y VPC Endpoints privados,
> descubrimiento profundo con **AWS Transform** y su IA agéntica, y continuidad del negocio mediante **AWS DMS y SCT**.

> [!info] Mapeo del examen
> El eje central del módulo es el **Dominio 4: Aceleración de la migración y la modernización de las cargas de trabajo (20 % del examen SAP-C02)**.
>
> **Tareas directas del Dominio 4:**
> * **4.1 — Seleccionar las cargas de trabajo y los procesos existentes para una posible migración** (análisis de cartera, dependencias entre servidores, evaluación técnica y económica con AWS Application Discovery Service, Migration Evaluator y Migration Hub).
> * **4.2 — Determinar el enfoque de migración óptimo para las cargas de trabajo existentes** (estrategia de las 7 Rs: Rehost, Replatform, Refactor/Rearchitect, Repurchase, Relocate, Retain, Retire; herramientas de transferencia como AWS Application Migration Service [MGN], AWS Database Migration Service [DMS], AWS DataSync y AWS Snow Family).
> * **4.3 — Determinar una nueva arquitectura para las cargas de trabajo existentes** (desacoplamiento de componentes, adopción de servicios administrados, contenedores en ECS/EKS, computación sin servidor con AWS Lambda y migración de almacenamiento).
> * **4.4 — Determinar oportunidades de modernización y mejoras** (herramientas de aceleración como AWS App2Container, AWS Microservice Extractor for .NET, modernización de bases de datos heterogéneas con AWS Schema Conversion Tool [SCT] y descomposición a microservicios).
>
> **Cruces con otros dominios:**
> * **1.5 / 2.6 — Optimización de costos** (TCO on-premises vs. AWS, right-sizing antes y después de migrar, licencias BYOL vs. License Included).
> * **2.2 — Continuidad de actividades** (estrategias de corte y conmutación [*cutover*] con ventana de inactividad mínima o cero).
> * **1.2 / 2.3 — Seguridad y gobernanza** (cifrado de datos en tránsito/reposo durante migraciones masivas, segregación de cuentas destino).

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como 🟢 solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 🗺️ Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | Course Overview | Hoja de ruta: 6 objetivos, framework MAP (3 fases) y espectro de las 7 Rs | 🔵 | [[Course Overview - Migration and Modernization]] |
| 02 | Gathering the Customer Requirements | Caso Utilities: gran entorno VMware, misión crítica, >200 controles y 4 requisitos | 🔵 | [[Gathering the Customer Requirements - Migration]] |
| 03 | Preparing for Migration | Cloud Value Framework, 4 hábitos de Jassy, fases MAP, CART/MRA/Evaluator y AMS | 🔵 | [[Preparing for Migration]] |
| 04 | The Migration Process | Fase Mobilize, los 3 modelos operativos, taxonomía 7 Rs (casos reales) y workflow en 6 pasos | 🔵 | [[The Migration Process]] |
| 05 | Migration Tools | Landing Zone con Control Tower (Home Region, preventivos/detectives) y DataSync (NFS/SMB a S3/EFS/FSx) | 🔵 | [[Migration Tools]] |
| 06 | AWS Transform Overview | Servicio de IA agéntica: los 4 agentes (Assessments, VMware, Mainframe COBOL➔Java, y .NET Windows➔Linux) | 🔵 | [[AWS Transform Overview]] |
| 07 | AWS Transform for VMware | Agente para vSphere a EC2: arquitectura de 3 cuentas, 4 job types, RBAC y Human-in-the-Loop | 🔵 | [[AWS Transform for VMware]] |
| 08 | AWS Application Migration Service | Rehost a nivel de bloque: Replication Agent (no reboot), Staging Area, Conversion Server (< 1 min) y Cutover | 🔵 | [[AWS Application Migration Service]] |
| 09 | AWS DataSync | Transferencia masiva data-centric: agente virtual, protocolo WAN (10x), TLS 1.2, checksums y archivado en S3 Glacier | 🔵 | [[AWS DataSync]] |
| 10 | Migrating Databases | Replicación relacional y NoSQL: AWS DMS (Full Load, CDC continuo, CDC-only con Snowball), Fan-Out y AWS SCT | 🔵 | [[Migrating Databases]] |
| 11 | Modernize the Enterprise | Dimensiones de modernización (Arquitectura, Organización, Infraestructura) y el Innovation Flywheel | 🔵 | [[Modernize the Enterprise]] |
| 12 | Before and After Modernization | Evolución en 4 fases: Rehost As-Is, Replatform (RDS, ALB, ASG, CloudFront/S3), Contenedores en Fargate y Serverless | 🔵 | [[Before and After Modernization]] |
| 13 | Using Containers to Modernize | Contenedorización con Amazon ECS/EKS (Fargate), empaquetado estandarizado y el flujo de 5 pasos de AWS App2Container (A2C) | 🔵 | [[Using Containers to Modernize]] |
| 14 | Use Serverless Architectures | Filosofía "small pieces, loosely joined": API Gateway, Lambda, DynamoDB, EFS for Lambda, y Step Functions | 🔵 | [[Use Serverless Architectures]] |
| 15 | Finished Architecture | Capstone del caso Utilities: AWS Transform (GNN AI), MGN, TGW Hub-and-Spoke, CloudFormation y multi-cuenta | 🔵 | [[Finished Architecture - Migration]] |
| 16 | BuildingBlocks Videos | 3 debates de diseño: VMware Multi-Región con AWS Transform, Petabytes con enlace lento y Serverless Refactor | 🔵 | [[BuildingBlocks Videos - Migration]] |
| 17 | Activity: Architecture Challenge | Desafío AnyCompany Cookies: DataSync con VPC Endpoints, AWS Transform con IA agéntica y DMS + SCT | 🔵 | [[Activity - Architecture Challenge - Migration]] |

Estados: ⬜ sin cargar · 🔵 resumen cargado · 🟣 consolidado y enlazado · 🟢 repasado con preguntas.

> [!success] Módulo completo
> El módulo concluyó formalmente con **17 lecciones cargadas** y evaluadas al 100% de efectividad en Skill Builder.
> Incluye el capstone integrador final con el caso de **AnyCompany Cookies** (6/6 aciertos).

---

## 📐 Reglas del módulo

Las mismas de los módulos anteriores, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, cuotas, algoritmos, nombres exactos de servicios, comandos y políticas.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

**Formato de cada nota:** [[_Plantilla de lección]] + [[_Estandar de formato]].

---

## 📚 Qué cubre cada sesión

### 01 — Course Overview
- **Formato**: página de texto con **Course details** y resumen general.
- **Compromiso**: seis objetivos de aprendizaje para dominar las prácticas clave de migración, las fases del proceso (MAP), los servicios de aceleración de AWS, la taxonomía de las 7 Rs, la migración de bases de datos con AWS DMS y la optimización post-migración.
- **Conceptos**: encuadre de los dos tiempos (Migrar primero, Modernizar después); desglose del framework MAP (Assess, Mobilize, Migrate & Modernize); matriz y árbol de decisión de las 7 Rs (Rehost, Replatform, Refactor, Repurchase, Relocate, Retain, Retire); servicios clave (MGN, DMS, SCT, DataSync, Snow Family, App2Container); perfil de Solutions Architect con $\ge 2$ años.
- **La trampa**: intentar refactorizar (Refactor) todas las aplicaciones en una salida urgente de data center con plazo fijo, en lugar de priorizar Rehost/Replatform y modernizar de forma incremental.

### 02 — Gathering the Customer Requirements
- **Formato**: video de 3 min 16 s (Joe) + flashcards interactivas de requisitos.
- **El caso**: empresa de energía y servicios públicos (*Energy & Utilities*) decide migrar su infraestructura masiva VMware on-premises. Sus cargas críticas son: distribución de energía en tiempo real (tolerancia cero a latencia/caídas), facturación masiva de clientes y telemetría continua.
- **Los cuatro dolores de negocio**: ciclo vicioso donde el 100% del tiempo de ingeniería se gasta manteniendo fierros físicos; aprovisionamiento de meses para añadir capacidad; TCO disparado por sobrecarga operativa; y aplicaciones monolíticas legadas cuya modernización vive postergada.
- **Marco regulatorio extremo**: auditorías trimestrales obligatorias; necesidad de documentar cada cambio de infraestructura; mantenimiento y prueba de más de 200 controles de seguridad; trazabilidad y soberanía de datos (*“It's not just about turning the lights on, it's about proving that they can keep them on”*).
- **Los cuatro requisitos de arquitectura**: (1) Migración del entorno VMware con mínima disrupción, (2) Optimización de costos (CAPEX a OPEX y liberación de tiempo humano), (3) Cumplimiento regulatorio demostrable, (4) Posicionamiento para modernización futura.
- **La trampa**: plantear la reescritura inmediata a serverless/microservicios de sistemas de control en tiempo real durante la migración; la solución correcta es Rehost/Relocate seguro primero, y modernizar en fases posteriores.

### 03 — Preparing for Migration
- **Formato**: video de 5 min 35 s + lecturas profundas sobre drivers, metas cuantificables, buenas prácticas y servicios aceleradores.
- **Conceptos**: Cloud Value Framework con sus 4 dimensiones (TCO $\ge 50\%$, productividad $30-50\%$, resiliencia con $-98\%$ incidentes como GE Oil & Gas, agilidad $5\times$ en despliegues); los 4 hábitos de clientes exitosos según Andy Jassy (convicción del liderazgo senior, metas top-down cuantificables, líderes responsables y entrenamiento temprano, construir experiencia sin sobreanalizar); las 3 fases del marco MAP (Assess, Mobilize, Migrate & Modernize); herramientas de evaluación (CART para cuestionario online rápido, MRA para taller formal de 1 día con ProServe, Migration Evaluator para business case financiero de TCO); y aceleración operativa con AWS Managed Services (AMS) para landing zones preconfiguradas con cumplimiento HIPAA/PCI/SOC/ISO y gestión 24/7.
- **La trampa**: contratar personal para desarrollar scripts manuales de parches y gobierno cuando el cliente necesita migrar en 6 meses bajo estricto cumplimiento regulatorio (HIPAA/PCI-DSS); la solución estándar de examen es adoptar AWS Managed Services (AMS).

### 04 — The Migration Process
- **Formato**: video de 7 min 14 s + lecturas profundas sobre fase Mobilize, modelos operativos, las 7 Rs y workflow de migración.
- **Conceptos**: la fase Mobilize como constructora de capacidades fundacionales mediante pilotos de producción pequeños y change management; herramientas clave (MPA tool, Prescriptive Guidance, Application Discovery Service con análisis SQL en Amazon Athena, Control Tower, AWS MGN); los 3 modelos operativos (Self-managed, AWS Managed Services [AMS] con contrato mes a mes y soporte 24/7, y Partner Managed [MSP]); taxonomía profunda de las 7 Rs con casos reales (Rehost con ahorro inmediato del 30% en GE Oil & Gas; Replatform con ahorro de millones en licencias migrando de WebLogic a Tomcat; Refactor a serverless/microservicios; Repurchase a SaaS; Relocate a VMware Cloud on AWS; Retain; y Retire apagando el 10–20% del catálogo en desuso); y workflow iterativo en 6 pasos (Plan & Design, Migrate, Integrate, Validate, Cutover con traffic shifting, y Operate & Modernize).
- **La trampa**: intentar refactorizar (Refactor) aplicaciones Java de alto costo de licenciamiento en WebLogic cuando se exige una reducción inmediata de costos en meses; la respuesta correcta es Replatform hacia Apache Tomcat en AWS sin alterar el código.

### 05 — Migration Tools
- **Formato**: video de 1 min 14 s + lecturas profundas sobre AWS Control Tower y AWS DataSync.
- **Conceptos**: la gobernanza que precede al cómputo (por qué configurar la Landing Zone antes de lanzar EC2); arquitectura de Control Tower orquestando Organizations, CloudFormation, Service Catalog (Account Factory) e IAM Identity Center; regla de la Home AWS Region (recursos globales como OUs/cuentas vs recursos regionales); alcance de controles (preventivos/SCPs de alcance global vs detectives/Config de alcance regional soportado); y AWS DataSync como solución administrada para migrar almacenamiento masivo NFS/SMB hacia Amazon S3, Amazon EFS y Amazon FSx for Windows File Server (agente virtual on-premise, protocolo de red propietario optimizado para WAN hasta 10x más rápido, cifrado TLS 1.2 obligatorio, validación automática de checksums sin scripts manuales, y throttling de ancho de banda).
- **La trampa**: usar scripts artesanales (robocopy, rsync) montando unidades de red sobre instancias EC2 intermedias para mover terabytes de datos NAS/SMB hacia AWS; la solución estándar es el agente de AWS DataSync directo a S3/EFS/FSx con validación y cifrado nativos.

### 06 — AWS Transform Overview
- **Formato**: lectura técnica sobre el servicio de IA agéntica (*agentic AI*) AWS Transform.
- **Conceptos**: modernización acelerada basada en 19 años de experiencia de AWS; reducción de plazos de años a meses; los cuatro agentes especializados: (1) AWS Transform assessments para business case y TCO, (2) AWS Transform for VMware para migrar vSphere a EC2 con mapeo de dependencias y conversión automática de configuraciones de red, (3) AWS Transform for mainframe para modernizar IBM z/OS convirtiendo código COBOL a Java con colaboración web unificada, y (4) AWS Transform for .NET para portar .NET Framework de Windows Server a .NET multiplataforma sobre Linux, eliminando costos recurrentes de licencias de Windows.
- **La trampa**: realizar Rehost continuo de aplicaciones .NET Framework sobre Windows Server pagando recargos perpetuos de licencias; la modernización costo-eficiente recomendada es refactorizar a .NET en Linux mediante AWS Transform for .NET.

### 07 — AWS Transform for VMware
- **Formato**: lectura técnica profunda + demostración guiada paso a paso de creación de un job.
- **Conceptos**: resolución de los dos mayores desafíos de VMware (conversión automática de topologías de red dvSwitches/NSX a VPCs/subredes/SGs y orquestación de olas conscientes de dependencias); los 3 constructos centrales (Workspaces para aislamiento total, Jobs estructurados, y Unified Web Experience para visibilidad en tiempo real sin saltar entre consolas); los 4 tipos de job (End-to-end, Network only, Network-and-server, y Discovery and server migration para VPCs preexistentes); gobierno RBAC con IAM Identity Center (4 roles: Administrator, Approver para autorizaciones críticas, Contributor, y View only); arquitectura de segregación en tres cuentas (Planning Account con KMS/Worklog/CloudWatch, Discovery Account con S3 para RVTools/NSX/ADS, y Migration Target Account con VPC/EC2/MGN, unidas por Connectors de menor privilegio con aprobación manual); marco Human-in-the-Loop (HITL) con 7 puntos de control obligatorios; e integración con AWS Application Migration Service (MGN) y MAP 2.0.
- **La trampa**: seleccionar un job End-to-End Migration cuando la empresa ya tiene su Landing Zone y VPCs creadas y auditadas por el equipo de redes; la opción correcta es Discovery and Server Migration para reutilizar la infraestructura existente.

### 08 — AWS Application Migration Service
- **Formato**: video de 1 min 30 s + lecturas técnicas profundas sobre replicación a nivel de bloque, Staging Area y cutover.
- **Conceptos**: motor estándar de Rehost (*Lift and Shift*) para servidores físicos y virtuales x86 (Windows y Linux); instalación no disruptiva del AWS Replication Agent (sin reinicio y con impacto insignificante de CPU/RAM; puertos salientes 443 para control y 1500 para datos); arquitectura del Staging Area (instancias EC2 Replication Server ligeras y volúmenes EBS de bajo costo mapeados 1:1, donde un servidor maneja múltiples fuentes en paralelo); Machine Conversion Server efímero que inyecta drivers Nitro/ENA/NVMe y adapta el bootloader en menos de 1 minuto por máquina en paralelo; regla de oro de pruebas exhaustivas (*test, test, and test some more*) al menos 2 semanas antes del lanzamiento sin detener la replicación continua; y corte definitivo (*Cutover*) tras congelar escrituras con RPO de segundos y autolimpieza del Staging Area al finalizar.
- **La trampa**: apagar servidores o usar exportaciones manuales de OVA/VMDK para migrar a EC2; la solución oficial no disruptiva con RPO mínimo es AWS MGN con replicación continua asíncrona de bloques.

### 09 — AWS DataSync
- **Formato**: video de 1 min 31 s + lectura técnica sobre arquitectura, componentes y protocolo WAN acelerado.
- **Conceptos**: servicio especializado y administrado orientado a datos (*data-centric*), enfocado en transferir grandes volúmenes de almacenamiento no estructurado sin migrar sistemas operativos; caso clave de archivado de datos fríos (*cold data*) directamente a Amazon S3 y S3 Glacier Deep Archive para retiro de cabinas de almacenamiento legadas (*Retire strategy*) cumpliendo con retención legal (*discovery orders*); arquitectura basada en DataSync Agent (appliance virtual on-premises en VMware ESXi, Hyper-V o KVM) y DataSync Service 100% administrado en AWS; protocolo de red propietario optimizado para WAN que acelera transferencias hasta $10\times$ frente a herramientas estándar (`rsync`, `robocopy`); cifrado obligatorio en tránsito con TLS 1.2; soporte de VPC Endpoints (AWS PrivateLink) para aislar el tráfico sobre Direct Connect o VPN sin tocar Internet pública; validación automática de integridad mediante sumas de verificación (*checksums*) en tránsito y en reposo sin scripts adicionales; preservación exhaustiva de metadatos POSIX (NFS a EFS) y permisos/DACLs/SIDs de Windows (SMB a FSx for Windows File Server); y control dinámico de ancho de banda (*Bandwidth Throttling*).
- **La trampa**: implementar instancias EC2 con scripts en Python montando carpetas SMB/NFS locales y ejecutando `robocopy` o `aws s3 sync` con scripts de hash para migrar cientos de terabytes con permisos de Active Directory; la solución correcta, segura y sin sobrecarga operativa es AWS DataSync hacia Amazon FSx o Amazon S3 preservando ACLs y validando integridad automáticamente.

### 10 — Migrating Databases
- **Formato**: video de 5 min 53 s + lecturas técnicas sobre AWS DMS, Fan-out, migraciones en EC2 y AWS SCT.
- **Conceptos**: migración y modernización de bases de datos relacionales y no relacionales minimizando disrupción y con cero pérdida de datos; distinción arquitectónica entre migraciones homogéneas (mismo motor, herramientas nativas o DMS) y heterogéneas (motores distintos, desacople en esquema con SCT y datos con DMS); arquitectura de DMS (Source/Target Endpoints, Replication Instance / DMS Serverless y Replication Tasks); modos de replicación (Full Load, Full Load + Ongoing CDC vía logs transaccionales del motor, y CDC-only combinado con AWS Snowball Edge para grandes volúmenes); la regla crítica de que DMS **solo crea tablas y Primary Keys** (no traslada índices secundarios, foreign keys, triggers ni stored procedures); patrón Fan-Out (una fuente transaccional replicando a múltiples destinos: Aurora, Redshift, S3 Data Lake, Kinesis Data Streams / MSK); migraciones intra-cloud desde EC2 a RDS (versiones Oracle soportadas: 10.2+ en self-managed y 11.2.0.4+ en RDS); y AWS Schema Conversion Tool (AWS SCT) con proyectos de conversión, Assessment Reports ejecutivos, SCT Data Extractors para Data Warehouses y cumplimiento FIPS/FedRAMP.
- **La trampa**: confiar en que AWS DMS por sí solo convierta y migre una base heterogénea (como SQL Server a Aurora PostgreSQL) con procedimientos almacenados e índices; la solución correcta requiere AWS SCT para convertir el esquema y la lógica previamente, desactivar índices secundarios durante el Full Load de DMS y sincronizar con CDC continuo antes del cutover.

### 11 — Modernize the Enterprise
- **Formato**: lectura interactiva sobre dimensiones de modernización y el volante de la innovación (*Innovation Flywheel*).
- **Conceptos**: la modernización como transformación cultural y multidimensional de toda la empresa (no solo de TI); las 3 dimensiones indivisibles: (1) Arquitectura (reemplazo de monolitos grandes por servicios enfocados, resiliencia desacoplada y blast radius mínimo), (2) Patrones Organizacionales (FinOps, visibilidad y atribución real de costos para los dueños de sistemas, equipos de producto *You build it, you run it*, y predisposición al replatform/refactor continuo), y (3) Infraestructura (consumo como servicio de utilidad elástica OPEX, pago estricto por uso y eliminación de pronósticos rígidos de capacidad); beneficios directos (aumento de uptime, agilización de parches/fixes, reducción de deuda técnica); el Innovation Flywheel como proceso cíclico continuo (*Feedback* ➔ *Ideas* ➔ *Experiment* ➔ *Feedback*); los 4 aceleradores de velocidad (seguimiento de métricas y telemetría proactiva antes de impactar usuarios, optimización iterativa de aplicaciones, aceleración del time-to-market y reinversión de ahorros operativos para autofinanciar la innovación); y patrones técnicos clave como *Strangler Fig* y arquitecturas *Event-Driven*.
- **La trampa**: congelar el negocio durante meses/años para realizar una reescritura monolítica total (*Big Bang*) a microservicios; el enfoque recomendado por AWS y evaluado en SAP-C02 es la modernización iterativa y progresiva mediante el patrón Strangler Fig (con ALB/API Gateway) y la reinversión continua de ahorros del flywheel.

### 12 — Before and After Modernization
- **Formato**: video de 2 min 17 s + lecturas técnicas sobre el enfoque por fases de modernización.
- **Conceptos**: el espectro evolutivo en 4 estadios para evitar el riesgo de "todo o nada"; (1) Rehost As-Is con servidores web y base de datos en EC2 con resiliencia Multi-AZ vía Route 53 (cero cambio de código pero alta sobrecarga operativa), (2) Replatform Inicial incorporando servicios administrados sin reescribir la app: Amazon RDS Multi-AZ con failover en $<60-120\text{ s}$, Auto Scaling Groups (ASG), Application Load Balancer (ALB) con health checks en capa 7, y descarga de contenido estático en Amazon S3 con aceleración global en Amazon CloudFront, (3) Contenedorización iterativa comenzando con el empaquetado del monolito (contenedor de 4 GB con EFS) hasta su descomposición en microservicios ejecutados en contenedores serverless con AWS Fargate (Amazon ECS/EKS), y (4) Serverless Integral dirigido por eventos con funciones AWS Lambda orquestadas por máquinas de estado de AWS Step Functions y bases de datos purpose-built (DynamoDB, Aurora Serverless v2).
- **La trampa**: forzar una reescritura completa a Lambda/DynamoDB/Step Functions cuando el negocio tiene un plazo improrrogable de 3 meses para salir del centro de datos; la respuesta correcta es ejecutar Rehost + Replatform inmediato a EC2, RDS Multi-AZ, ALB y CloudFront, dejando la contenedorización y serverless para iteraciones posteriores.

### 13 — Using Containers to Modernize
- **Formato**: lectura interactiva sobre ventajas del empaquetado en contenedores y la herramienta AWS App2Container.
- **Conceptos**: aceleración de la entrega de aplicaciones y reducción de costos mediante contenedores OCI/Docker; las 5 ventajas clave (reutilización de la misma tecnología para apps nuevas y migradas, aceleración del time-to-market con DevOps, portabilidad absoluta dev-to-prod, empaquetado inmutable y definición como código para reducir riesgos); arquitectura modernizada de referencia (Amazon CloudFront + ALB + clúster Amazon ECS con AWS Fargate serverless + Amazon RDS Multi-AZ); y la herramienta de aceleración **AWS App2Container (A2C)** para lift-and-shift de aplicaciones Java (Tomcat, Spring Boot, JBoss, WebLogic) y .NET (ASP.NET en IIS, .NET Core) sin tocar código, mediante su flujo de trabajo en 5 pasos: (1) Discover and analyze (`analysis.json`), (2) Extract and containerize (construcción de Dockerfile e imagen), (3) Create deployment artifacts (Task definitions para ECS, manifiestos YAML/Helm para EKS y CloudFormation), (4) Deploy in the AWS Cloud (push a Amazon ECR y ejecución), y (5) Create a CI/CD pipeline opcional con AWS CodePipeline y AWS CodeBuild.
- **La trampa**: intentar reescribir manualmente desde cero decenas de aplicaciones legadas Java Tomcat o ASP.NET IIS a microservicios cuando se carece de acceso al código fuente original o de experiencia en Kubernetes; la solución canónica en AWS es ejecutar AWS App2Container (A2C) para empaquetarlas automáticamente y desplegarlas en Amazon ECS o Amazon EKS sobre AWS Fargate con CI/CD automatizado.

### 14 — Use Serverless Architectures
- **Formato**: lectura técnica sobre el paradigma serverless y su diseño modular en AWS.
- **Conceptos**: la filosofía de diseño *"small pieces, loosely joined"*; composición de aplicaciones mediante servicios modulares y desacoplados sin servidores que aprovisionar ni mantener; los tres pilares de valor (aceleración del time-to-market, resiliencia nativa Multi-AZ y costo proporcional al valor con \$0 costo en reposo); arquitectura de referencia (Amazon CloudFront para caching y DDoS Shield, Amazon API Gateway como front door con rate limiting/throttling y autenticación, AWS Lambda para cómputo atómico dirigido por eventos, Amazon DynamoDB On-Demand para persistencia transaccional NoSQL de $<10\text{ ms}$, y Amazon EFS para AWS Lambda para almacenamiento compartido persistente con semántica POSIX o archivos grandes); coordinación asíncrona de backend mediante eventos con Amazon EventBridge, búferes de mensajes con Amazon SQS/SNS y orquestación de máquinas de estado con AWS Step Functions (Standard vs Express workflows y patrón Saga); y mitigación de cuellos de botella para el examen: el límite de ejecución de 15 minutos de Lambda (alternativas con Fargate/Batch) y prevención del agotamiento de conexiones relacionales mediante **Amazon RDS Proxy**.
- **La trampa**: conectar miles de funciones AWS Lambda concurrentes directamente a una base de datos relacional (Amazon RDS MySQL/PostgreSQL) ante picos de tráfico y tratar de resolver el colapso de conexiones escalando verticalmente la instancia; la solución arquitectónica oficial es interponer **Amazon RDS Proxy** para multiplexar las conexiones sobre un pool administrado y estabilizar la base de datos sin sobrecostos.

### 15 — Finished Architecture
- **Formato**: video capstone de 5 min 19 s (Joe) + resumen de arquitectura final para el caso Energy & Utilities.
- **Conceptos**: síntesis e integración integral de todos los componentes del curso en una arquitectura de migración masiva regulada; resolución de los cuatro requisitos del cliente de energía (cargas de distribución, billing y telemetría en tiempo real sin disrupción, optimización de costos, cumplimiento de $>200$ controles y auditorías trimestrales, y posicionamiento para modernización); descubrimiento flexible y sin agentes (RVTools, exportaciones de VMware NSX, y Application Discovery Service agentless/agent-based) alojado en la *AWS Migration Discovery Account*; mapeo de dependencias mediante IA con Redes Neuronales de Grafos (*Graph Neural Networks - GNN*) en AWS Transform para planificación automatizada de olas (*Wave Planning*); topología de red Hub-and-Spoke con AWS Transit Gateway con NAT Gateways centralizados en la VPC Hub para optimizar costos de red y seguridad; automatización declarativa de red con plantillas AWS CloudFormation generadas por AWS Transform; estructura multi-cuenta en AWS Organizations con auditoría inmutable en AWS CloudTrail, RBAC centralizado con IAM Identity Center y cifrado en reposo con AWS KMS; y ejecución asíncrona de bloques mediante AWS Application Migration Service (MGN) con almacenamiento en Amazon EBS y right-sizing guiado por IA desde el día cero.
- **La trampa**: recurrir a consultoría manual para auditar servidores y crear redes artesanales con scripts cuando se migran cientos de VMs reguladas; la solución oficial integrada es AWS Transform (IA y wave planning) coordinando a AWS MGN (replicación continua de bloques) sobre una arquitectura Hub-and-Spoke con Transit Gateway y gobierno estricto con Organizations, KMS y CloudTrail.

### 16 — BuildingBlocks Videos
- **Formato**: 3 videos técnicos de debate arquitectónico (Melissa y Joe) resolviendo dilemas complejos del mundo real.
- **Conceptos**: análisis de tres casos críticos de examen: (1) Consolidación VMware multi-región de manufactura desde Frankfurt y Virginia hacia Sydney con estricta residencia de datos; evaluación de topología de AWS Transform demostrando por qué la co-localización de Discovery Connectors y la separación de Workspaces y Target Connectors independientes por región es la única forma de garantizar residencia legal y precisión en el wave planning por IA, (2) Migración de petabytes de registros médicos para un proveedor de salud con enlace WAN limitado bajo HIPAA; aplicación del principio de *Mechanical Sympathy* para demostrar por qué DataSync e Internet tomarían meses y Direct Connect tardaría semanas en provisionarse, justificando la transferencia física offline (AWS Snowball Edge / Data Transfer Terminal) hacia Amazon S3 con cifrado KMS (CMK) y política de transporte TLS obligatorio (`aws:SecureTransport`), y (3) Modernización de un monolito de software (ISV); árbol de decisión demostrando por qué Rehost (MGN) y Replatform (EC2+ElastiCache) no resuelven la sobrecarga operativa, y por qué Serverless Refactor (AWS Lambda para flujos de $<15\text{ min}$, Provisioned Concurrency para latencia crítica, Amazon DynamoDB On-Demand para tráfico variable y Amazon EventBridge) vence a clústeres de contenedores ECS/EKS.
- **La trampa**: insistir en aprovisionar un enlace AWS Direct Connect y scripts DataSync para transferir múltiples petabytes en un plazo de semanas; el tiempo de aprovisionamiento de telecomunicaciones y el ancho de banda del enlace superarán inevitablemente el cronograma; la respuesta correcta es la transferencia física mediante la familia Snowball Edge hacia Amazon S3.

### 17 — Activity: Architecture Challenge
- **Formato**: evaluación interactiva final en 3 desafíos de doble parte (6 Knowledge Checks en total: Parte A de selección triple y Parte B de decisión óptima única).
- **El caso**: AnyCompany Cookies, empresa de repostería especializada en rápida expansión global que pasó de una panadería local a una multinacional con ventas minoristas físicas, e-commerce, suscripciones y distribución mayorista. Enfrenta infraestructura física monolítica y envejecida en su sede central (*HQ*), falta de resiliencia y recuperación ante desastres (*DR*), cuellos de botella severos por flujos batch y scripts manuales entre continentes, y silos de bases de datos relacionales heterogéneas.
- **Las tres decisiones óptimas de arquitectura**:
  1. *Sincronización global y disponibilidad de datos:* Desplegar agentes virtuales de **AWS DataSync** en cada sede internacional comunicándose con almacenamiento centralizado en AWS (Amazon S3 / Amazon EFS) a través de **VPC Endpoints privados (AWS PrivateLink)** sobre enlaces dedicados/VPN, garantizando cifrado TLS 1.2, verificación automática de *checksums* y evitando la exposición a la Internet pública.
  2. *Modernización de aplicaciones heredadas:* Emplear **AWS Transform** con sus capacidades de IA generativa y agéntica para descubrir, mapear y documentar dependencias lógicas complejas y advertir problemas de compatibilidad de código antes de iniciar la migración (descartando el anti-patrón de migrar primero con MGN sin evaluación previa).
  3. *Consolidación y migración de bases de datos:* Enfocarse prioritariamente en la **continuidad del negocio** (*business continuity*) y mínimo tiempo de inactividad durante la fase inicial mediante la dupla **AWS Database Migration Service (DMS)** con replicación continua (*Ongoing CDC*) y **AWS Schema Conversion Tool (SCT)** para convertir esquemas heterogéneos, sentando las bases para la arquitectura de destino dividida en **Amazon Aurora** para procesamiento transaccional OLTP y **Amazon Redshift** para *data warehousing* OLAP.
- **La trampa**: seleccionar transferencias masivas únicas con ventanas de corte de horas para un negocio global 24/7, o intentar descubrir dependencias migrando los servidores a ciegas hacia AWS mediante MGN. La respuesta oficial de examen exige evaluación previa con IA agéntica (AWS Transform) y replicación transaccional continua (DMS CDC).

---

## ✅ Checklist: lo que tenés que poder explicar

- [ ] Las **7 Rs de migración** (Rehost, Replatform, Refactor, Repurchase, Relocate, Retain, Retire) y cuándo se aplica cada una en el examen.
- [ ] Por qué el **Replatform** de WebLogic a Tomcat permite ahorrar millones en licencias sin alterar el código de la aplicación.
- [ ] La regla de que el **10 % al 20 %** del catálogo empresarial puede retirarse (**Retire**) inmediatamente.
- [ ] La arquitectura interna de **AWS MGN**: Replication Agent, Staging Area (Replication Servers + EBS bajo costo) y Machine Conversion Server.
- [ ] Por qué la instalación del **AWS Replication Agent** no requiere reinicio ni interrumpe la producción local.
- [ ] Los puertos de red requeridos por MGN: **TCP 443** (control) y **TCP 1500** (datos hacia Staging).
- [ ] El rol del **Machine Conversion Server** y por qué convierte discos para AWS en menos de 1 minuto en paralelo.
- [ ] Cómo se ejecutan las pruebas (*Test instances*) en AWS MGN sin detener la replicación continua desde el origen.
- [ ] Diferencias clave entre **AWS Application Migration Service (MGN)** (migración puntual) y **AWS Elastic Disaster Recovery (DRS)** (DR continuo con failback).
- [ ] La función y alcance de los cuatro agentes especializados de **AWS Transform** (Assessments, VMware, Mainframe, .NET).
- [ ] La **arquitectura de tres cuentas** de AWS Transform (Planning, Discovery, Target) y por qué previene impactos en producción.
- [ ] La diferencia entre los cuatro **Job Types** de AWS Transform for VMware (End-to-end, Network only, Network-and-server, Discovery and server).
- [ ] La función del rol **Approver** frente a Administrator y Contributor en el framework Human-in-the-Loop (HITL).
- [ ] Cómo **AWS Transform** ingiere inventarios offline (RVTools) y configuraciones de red (VMware NSX) en buckets S3 cifrados.
- [ ] La integración de AWS Transform con **AWS Application Migration Service (MGN)** y el etiquetado automático para el programa MAP 2.0.
- [ ] Cómo **AWS Transform for Mainframe** reduce los tiempos de modernización convirtiendo código COBOL a Java.
- [ ] Por qué portar aplicaciones con **AWS Transform for .NET** hacia Linux elimina el recargo de licenciamiento de Windows Server.
- [ ] Los **cuatro requisitos de arquitectura** del caso de utilities y cómo se equilibran velocidad, costo y riesgo.
- [ ] Por qué la **distribución de energía en tiempo real** impone tolerancia cero a latencia y descarta migraciones disruptivas.
- [ ] Cómo gestionar el cumplimiento de $>200$ controles de seguridad de forma automatizada mediante AWS Config Conformance Packs y AWS Audit Manager.
- [ ] La diferencia de alcance en **AWS Control Tower**: por qué los controles preventivos (SCPs) son globales mientras los detectives (Config) son regionales.
- [ ] La arquitectura técnica de **AWS DataSync** (agente on-premise, protocolo WAN optimizado, cifrado TLS 1.2, destinos S3/EFS/FSx).
- [ ] Cómo **DataSync** garantiza la no corrupción de datos mediante validación automática de checksums y preservación de ACLs de Windows / permisos POSIX.
- [ ] Cuándo elegir **AWS DataSync** (online sobre WAN) frente a **AWS Snowball Edge** (offline masivo físico).
- [ ] Las cuatro dimensiones del **Cloud Value Framework** (TCO, Productividad, Resiliencia, Agilidad) y sus metas cuantitativas típicas.
- [ ] Los cuatro hábitos de éxito del liderazgo según Andy Jassy (convicción ejecutiva, metas top-down, capacitación y evitar la parálisis por análisis).
- [ ] Las diferencias metodológicas entre **CART** (cuestionario online preliminar) y **MRA** (taller formal de 1 día con AWS Professional Services).
- [ ] La función exclusiva de **Migration Evaluator** (modelado financiero de TCO y análisis de licencias, sin transferir datos).
- [ ] Los tres modelos operativos (**Self-managed**, **AWS Managed Services - AMS**, **Partner MSP**) y sus criterios de selección.
- [ ] Las seis fases del **Application Migration Workflow** (Plan & Design, Migrate, Integrate, Validate, Cutover con traffic shifting, Operate & Modernize).
- [ ] Cómo se utiliza **Amazon Athena** con AWS Application Discovery Service para analizar baselines y dependencias entre servidores.
- [ ] La mecánica de migración heterogénea de bases de datos: **AWS Schema Conversion Tool (SCT)** + **AWS Database Migration Service (DMS)** con CDC continuo.
- [ ] Estrategias de modernización con contenedores: **AWS App2Container (A2C)** hacia ECS/EKS.
- [ ] Patrones de transición y descomposición de monolitos a microservicios (patrón Strangler Fig).
- [ ] Estrategias de cutover con mínimo downtime (DNS switch, replicación continua, pruebas paralelas).
- [ ] Gestión de licencias en la nube: **AWS License Manager** para BYOL vs. licencias incluidas.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| 1 | **Propuestas de las flashcards de la Lección 02**: el scraper no capturó el reverso interactivo de las tarjetas con las propuestas específicas de Joe para cada uno de los 4 requisitos. | **Cerrada** ✅ | Se resolvió formalmente en el capstone [[Finished Architecture - Migration]] con la solución completa: AWS Transform (GNN AI), MGN, Transit Gateway Hub-and-Spoke, y gobierno multi-cuenta (Organizations/KMS/CloudTrail). |

---

## 📌 Pendiente del módulo

- [x] Cargar la **lección 01** y registrar sus objetivos en este índice ([[Course Overview - Migration and Modernization]]).
- [x] Cargar la **lección 02** y registrar el caso de Utilities y sus 4 requisitos ([[Gathering the Customer Requirements - Migration]]).
- [x] Cargar la **lección 03** y consolidar las fases de preparación, Cloud Value Framework y herramientas de evaluación ([[Preparing for Migration]]).
- [x] Cargar la **lección 04** y estructurar la fase Mobilize, modelos operativos, las 7 Rs y workflow de 6 pasos ([[The Migration Process]]).
- [x] Cargar la **lección 05** e integrar las herramientas de Landing Zone (Control Tower) y migración de almacenamiento (AWS DataSync) ([[Migration Tools]]).
- [x] Cargar la **lección 06** e integrar los 4 agentes de IA de modernización ([[AWS Transform Overview]]).
- [x] Cargar la **lección 07** y profundizar en AWS Transform for VMware, arquitectura de 3 cuentas y HITL ([[AWS Transform for VMware]]).
- [x] Cargar la **lección 08** y consolidar la arquitectura de Rehost con AWS Application Migration Service ([[AWS Application Migration Service]]).
- [x] Cargar la **lección 09** y profundizar en AWS DataSync para migración y archivado masivo de almacenamiento ([[AWS DataSync]]).
- [x] Cargar la **lección 10** y consolidar la migración de bases de datos con AWS DMS y AWS SCT ([[Migrating Databases]]).
- [x] Cargar la **lección 11** y estructurar la modernización empresarial y el Innovation Flywheel ([[Modernize the Enterprise]]).
- [x] Cargar la **lección 12** y consolidar las fases de modernización Before and After Modernization ([[Before and After Modernization]]).
- [x] Cargar la **lección 13** y estructurar la contenedorización con Amazon ECS/EKS y AWS App2Container ([[Using Containers to Modernize]]).
- [x] Cargar la **lección 14** y estructurar las arquitecturas serverless modulares con API Gateway, Lambda, DynamoDB y Step Functions ([[Use Serverless Architectures]]).
- [x] Cargar la **lección 15** y consolidar el capstone de arquitectura final ([[Finished Architecture - Migration]]).
- [x] Cargar la **lección 16** y estructurar los tres casos de debate arquitectónico de BuildingBlocks Videos ([[BuildingBlocks Videos - Migration]]).
- [x] Cargar la **lección 17** con la evaluación integradora de cierre ([[Activity - Architecture Challenge - Migration]]).
- [x] Registrar cada lección con su nota individual respetando la plantilla canónica (17 notas creadas).
- [x] Confirmar la cantidad total de lecciones del módulo: **17 lecciones completadas**.
- [x] Confirmar el mapeo del Dominio 4 (tareas 4.1, 4.2, 4.3, 4.4) en todas las sesiones y capstones.
- [x] Revisar si el learning plan trae **labs**: no se incorporaron labs mandatorios en este módulo digital.
- [x] Cerrar el módulo: checklist consolidado, mapa de progreso final y **reto de arquitectura AnyCompany Cookies completado al 100% (6/6)**.

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[Course Overview - Migration and Modernization]] — lección 01 del módulo (hoja de ruta)
- [[Gathering the Customer Requirements - Migration]] — lección 02 del módulo (caso Utilities)
- [[Preparing for Migration]] — lección 03 del módulo (preparación, fases MAP y evaluación)
- [[The Migration Process]] — lección 04 del módulo (fase Mobilize, 7 Rs y workflow en 6 pasos)
- [[Migration Tools]] — lección 05 del módulo (Control Tower y AWS DataSync)
- [[AWS Transform Overview]] — lección 06 del módulo (agentes de IA de AWS Transform)
- [[AWS Transform for VMware]] — lección 07 del módulo (agente de VMware, 3 cuentas y HITL)
- [[AWS Application Migration Service]] — lección 08 del módulo (motor estándar de Rehost a nivel de bloque)
- [[AWS DataSync]] — lección 09 del módulo (transferencia masiva de almacenamiento y archivado de datos fríos)
- [[Migrating Databases]] — lección 10 del módulo (migración y modernización de bases de datos con DMS y SCT)
- [[Modernize the Enterprise]] — lección 11 del módulo (las 3 dimensiones de la modernización y el Innovation Flywheel)
- [[Before and After Modernization]] — lección 12 del módulo (evolución arquitectónica en 4 fases: Rehost, Replatform, Contenedores y Serverless)
- [[Using Containers to Modernize]] — lección 13 del módulo (modernización con contenedores en ECS/EKS y AWS App2Container)
- [[Use Serverless Architectures]] — lección 14 del módulo (arquitecturas serverless modulares: "small pieces, loosely joined")
- [[Finished Architecture - Migration]] — lección 15 del módulo (capstone: arquitectura final del caso Energy & Utilities)
- [[BuildingBlocks Videos - Migration]] — lección 16 del módulo (debates de diseño: VMware multi-región, petabytes con enlaces lentos y serverless refactor)
- [[Activity - Architecture Challenge - Migration]] — lección 17 del módulo (evaluación integradora de cierre: caso AnyCompany Cookies)
- [[Guia AWS]] — guía oficial del examen (especialmente Dominio 4: Aceleración de la migración y la modernización)
- [[AWS Solutions Architect Advanced - Operational Resilience]] — módulo previo: resiliencia, RTO/RPO, DR y SLAs
- [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] — conectividad híbrida (Direct Connect, VPN, Resolver) que sirve de canal para la migración
- [[AWS Solutions Architect Advanced - Securing Networks and Data]] — cifrado KMS, CloudHSM y controles de seguridad para datos en tránsito y en reposo
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — arquitectura de VPCs, Transit Gateway y PrivateLink de destino
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — estructura de cuentas de destino en AWS Organizations y Control Tower
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — observabilidad con CloudWatch, X-Ray y gobernanza de costos
- [[4.1 Seleccionar las cargas de trabajo y los procesos existentes para una posible migración]] — tarea de examen 4.1
- [[4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes]] — tarea de examen 4.2
- [[4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes]] — tarea de examen 4.3
- [[4.4 Determinar oportunidades de modernización y mejoras]] — tarea de examen 4.4
