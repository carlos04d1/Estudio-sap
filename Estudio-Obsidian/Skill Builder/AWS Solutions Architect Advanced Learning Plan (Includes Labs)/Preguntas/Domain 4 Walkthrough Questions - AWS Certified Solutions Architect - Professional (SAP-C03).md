---
title: "Domain 4 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)"
aliases:
  - "Domain 4 Walkthrough Questions"
  - "Walkthrough D4"
  - "Preguntas Walkthrough D4"
tags:
  - certificacion/aws
  - sap-c02
  - sap-c03
  - skill-builder
  - preguntas
  - walkthrough
  - dominio-4
status: activo
fuente: "https://skillbuilder.aws/learn/YGHF4S4JRH/domain-4-practice-aws-certified-solutions-architect--professional-sapc03--english/J5B7N8NNMA"
---

# Domain 4 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **preguntas guiadas (Walkthrough)** y **evaluaciones prácticas (Practice Assessment)** del **Dominio 4: Accelerate Workload Migration and Modernization** para la certificación AWS Certified Solutions Architect - Professional (SAP-C03).
> Diseñado para analizar escenarios de evaluación y migración a gran escala: herramientas de descubrimiento y seguimiento (Application Discovery Service, Migration Hub), estrategias de migración a bases de datos administradas (MongoDB a DocumentDB, MySQL a Aurora con DMS), transferencias de datos a escala de petabytes (Snowball Edge + Redshift), resiliencia multirregión en la red troncal de AWS (Global Accelerator) y orquestación automatizada de Disaster Recovery (promoción de réplicas y copia de AMIs).

> [!info] Metodología Walkthrough
> 1. **Lectura dirigida:** Identificar primero la pregunta final (criterio clave: *menor sobrecarga operativa*, *menor tiempo de inactividad / cutover downtime*, *permanecer en la red de AWS*, *RTO/RPO estricto*).
> 2. **Extracción de señales y restricciones:** Desglosar volumen de datos (20 TB vs 2 PB), compatibilidad de motores, herramientas de descubrimiento vs evaluación de costos, y naturaleza regional de recursos (AMIs, ALBs).
> 3. **Eliminación sistemática:** Descartar opciones inviables (migraciones a EC2 cuando se pide servicio gestionado, o transferencias de petabytes sobre VPN).
> 4. **Validación:** Confirmar la mejor opción frente a los servicios recomendados y las mejores prácticas del Well-Architected Framework.

---

## 📊 Registro de intentos

| # | Fecha | Evaluación / Sección | Aciertos | % | Estado | Tareas flojas / Motivo del error |
| - | ----- | -------------------- | -------- | - | ------ | -------------------------------- |
| 1 | 2026-11-20 | Walkthrough Questions (Q1-Q2) | 2/2 | 100 % | 🟢 | Q1: MongoDB a DocumentDB con DMS Full load + CDC (sin SCT por compatibilidad nativa, sin EC2 para eliminar gestión de servidores) / Q2: AWS Backup con planes por tags para EBS + DynamoDB + tipos futuros, con copia de Prod a bóveda en segunda región. |
| 2 | 2026-11-20 | Practice Assessment (5 preguntas) | 2/5 | 40 % | 🟠 | Aciertos en Global Accelerator (P1) y Snowball Edge + SCT + Redshift para DW de 2 PB (P3). Falladas: P2 (confusión de Application Discovery Service + Migration Hub con Evaluator/MGN), P4 (seleccionar EC2 y mysqldump en vez de Aurora MySQL Multi-AZ + DMS), P5 (crear snapshot de read replica en vez de promoverla con Lambda, e intentar dar permisos cross-region a AMIs en vez de copiarlas físicamente). |

---

## ✅ Cobertura por tarea (Dominio 4)

| Tarea | Descripción | Preguntas vistas | Estado |
| ----- | ----------- | ---------------- | ------ |
| **4.1** | Design migration strategies by using AWS frameworks / Discovery | 2 (Q1: MongoDB a DocumentDB / P2: Discovery Service + Migration Hub) | 🟡 vista |
| **4.2** | Determine the optimal migration approach for existing workloads | 2 (P3: Snowball Edge + Redshift / P4: Aurora MySQL + DMS) | 🟡 vista |
| **4.3** | Design solutions to meet business continuity and resiliency requirements | 3 (Q2: AWS Backup / P1: Global Accelerator / P5: DR RDS Replica + AMI Copy) | 🟡 vista |

*Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.*

---

# Walkthrough questions

## Question 1: Walkthrough question

This walkthrough question is from task statement 4.1: Design migration strategies by using AWS frameworks. The question reads:

"A company has an on-premises MongoDB cluster with many databases that the company updates regularly. The company decides to migrate the databases to AWS to eliminate the company's need to manage the on-premises server fleet. The company wants to use managed services on AWS to eliminate server management. The existing databases and applications must remain available during the migration period. Which solution will meet these requirements?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: on-premises MongoDB cluster

MongoDB as the source tells you the target should be a compatible managed service. Amazon DocumentDB is MongoDB-compatible at the API level, so applications can connect with minimal changes and no schema conversion is needed.

#### 2: updates regularly

"Updates regularly" means the source is active during migration. Data is changing continuously. A full-load-only migration creates a point-in-time snapshot, but changes after that point would be lost. You need change data capture (CDC) to replicate ongoing changes and keep the target synchronized until cutover.

#### 3: managed services on AWS to eliminate server management

"Managed services" and "eliminate server management" disqualify any option that lands on EC2. Lift-and-shift to EC2 still requires the company to manage the OS, database software, patching, and scaling. DocumentDB is a fully managed service where AWS handles infrastructure.

#### 4: remain available during the migration period

"Remain available" means zero-downtime migration. The source must keep serving traffic until the target is fully synchronized and the application can safely cut over. Full load plus CDC achieves this: the initial load moves existing data, and CDC keeps both in sync until you're ready to switch.

---

## Question 1: Examine the answers

You identified MongoDB as the source, a managed service as the target, regular updates happening during migration, and continuous availability required. Each one narrows what the answer can be. Which option lines up with all of them? Hold your reasoning, then watch the walkthrough below.

#### Transcript

So this question asks about migrating MongoDB to AWS while keeping everything running. Two signals in the STEM do all the work for us. So let's break them down, Joe. All right, well, signal one is manage services to eliminate server management. So that immediately eliminates any option that lands on EC2. If you're managing the OS and the database software yourself, you haven't eliminated server management. You've just moved where you do it, right? Option C lifts and shifts the Mongo DB cluster to EC2. The servers are on AWS, but the company still patches, scales, and manages them. That fails the managed service requirement, right, which leaves Amazon DocumentDB. It's MongoDB compatible at the API level, so applications connect with minimal changes, and it's fully managed. AWS handles infrastructure, patching, and backups, right? And Signal 2 updates regularly plus remain available during migration. The databases are active. Changes are happening continuously, so a one-time full load is not enough. No, if you only do a full load, you only get a point in time copy. But while that load is running, the source keeps getting updates. By the time the load finishes, your target's already behind, so you lose those changes on cutover. That's why options A and D fail. Both do full load only, no CDC. Option A uses DMS for a full load, then cuts over. Option D adds schema conversion tool on top of that, which is actually unnecessary because DocumentDB is already MongoDB compatible. No schema conversion. needed. So two problems with D unnecessary conversion step and still no CDC. -- Same data gap as -- A. Option B gets both signals right. Full load to move existing data, then CDC mode to continuously replicate ongoing changes. The source stays available the entire time. Once the target catches up and both are synchronized, -- you cut over cleanly with no data -- loss. Exactly. The pattern is when a stem says active source and stay available during migration, the answer is full load plus CDC. Full load alone leaves a gap. CDC closes it. And when the source and target are compatible, like MongoDB to document DB, schema conversion isn't needed. If you see SCT in an option for a compatible pair, that's unnecessary overhead and usually a sign the option has other problems too. So try these two checks. Is the target managed and does the migration handle ongoing changes, because both have to be yes.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the markers you marked in the stem?

#### Create an Amazon DocumentDB cluster. Use AWS DMS to perform a full load of data from the on-premises MongoDB cluster. When the data load is finished, update the application to point to the Amazon DocumentDB cluster endpoint.

A test-taker might pick this because it uses a managed service (DocumentDB) and DMS for migration, which addresses the managed service requirement. However, a full-load-only migration creates a point-in-time copy. Since the company updates databases regularly, changes made to the source after the full load starts would be lost. The application cannot cut over safely without change data capture (CDC) to keep the target synchronized with ongoing source changes. The pattern to notice: when a stem says "updates regularly" and "remain available during migration," a full-load-only approach creates a data gap between load start and cutover.

#### Create an Amazon DocumentDB cluster. Use AWS DMS to perform a full load of data from the on-premises MongoDB cluster. Activate change data capture (CDC) mode to replicate source changes. After the data is synchronized, update the application to point to the Amazon DocumentDB cluster endpoint.

This is the correct option. It uses DocumentDB (a managed, MongoDB-compatible service) as the target, addressing the "eliminate server management" requirement. DMS performs the initial full load to move existing data, then CDC mode continuously replicates ongoing changes from the source to the target. This keeps both databases synchronized during the migration period, so the source remains fully available and no data is lost. Once the target catches up (source and target are synchronized), the application can cut over with near-zero downtime. The pattern to take forward: when a stem describes an active source that must stay available, look for full load plus CDC. Full load alone leaves a gap; CDC closes it by replicating changes that happen after the initial load.

#### Use AWS Application Migration Service to lift and shift the on-premises servers to Amazon EC2 instances. Maintain the MongoDB cluster on the EC2 instances. When the servers are running, update the application to point to the new MongoDB cluster endpoint.

A test-taker might pick this because it moves the workload to AWS and the application stays available during migration. However, the stem explicitly says the company wants to "use managed services on AWS to eliminate server management." Lifting and shifting to EC2 still requires the company to manage the operating system, the database software, patching, backups, and scaling. EC2-hosted MongoDB is not a managed database service. The pattern to notice: when the stem says "managed service" or "eliminate server management," any option that puts the workload on self-managed EC2 instances fails that requirement, even if the migration mechanics are sound.

#### Create an Amazon DocumentDB cluster. Use the AWS SCT to convert from MongoDB. Use AWS DMS to perform a full load of data from the on-premises MongoDB deployment. When the data load is finished, update the application to point to the Amazon DocumentDB cluster endpoint.

A test-taker might pick this because AWS Schema Conversion Tool (SCT) is commonly used in database migrations. However, Amazon DocumentDB is directly compatible with MongoDB at the API level. Schema conversion is not necessary for this migration path because DocumentDB accepts MongoDB's document model natively. Additionally, this option performs only a full load without CDC, creating the same data gap problem as option A: changes made during migration would be lost. The pattern to notice: when the source and target are compatible (MongoDB to DocumentDB), schema conversion is unnecessary overhead. And full load without CDC still fails the "remain available" requirement for an active source.

---

## Question 1: Takeaway

That is all for this question. The reading pattern here rewards recognizing two signals: "updates regularly" plus "remain available" means you need CDC, not just a one-time full load. And "managed service" eliminates lift-and-shift to EC2. When both signals are present, the answer must deliver a managed target with continuous replication. Note any knowledge gap you spotted while working through it.

---

## Question 2: Walkthrough question

This walkthrough question is from task statement 4.3: Design solutions to meet business continuity and resiliency requirements. The question reads:

"A company has many resources in a single AWS Region. The resources include Amazon EBS volumes and Amazon DynamoDB tables. The company plans to add additional AWS resource types to its backup plans in the future. The company tags resources with one of three tags: Prod, Dev, or Test. A system administrator manually takes backups of the various resources and stores the backups in the same Region. The company requires the system administrator to back up Dev and Test resources daily. The system administrator must back up Prod resources twice a day. The company needs to automate the backups and store the Prod backups in a second Region. Which solution will meet these requirements with the LEAST operational effort?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: Amazon EBS volumes and Amazon DynamoDB tables

Two different resource types (EBS and DynamoDB) is the first signal. Amazon Data Lifecycle Manager only backs up EBS snapshots, so it cannot cover DynamoDB. AWS Backup covers many services from one place, which is why it fits.

#### 2: add additional AWS resource types to its backup plans in the future

"More resource types in the future" is decisive. The solution must absorb new types without a redesign. AWS Backup plans that include all supported resources pick up future types automatically; DLM would need bolt-on tooling for each new type.

#### 3: tags: Prod, Dev, or Test

The Prod, Dev, and Test tags are how backups are grouped and scheduled. AWS Backup assigns resources to plans by tag, so two tag-based plans handle the two schedules: Prod every 12 hours, Dev and Test daily.

#### 4: store the Prod backups in a second Region

"Prod backups in a second Region" is the detail that separates the two AWS Backup options. The correct choice stores the Prod backups in a vault in the second Region; the distractor leaves them in the default (same-Region) vault. When two options use the right service, focus on this one difference.

---

## Question 2: Examine the answers

You identified multiple resource types (with more coming in the future), tag-based backup schedules, a cross-Region requirement for Prod, and least operational effort. Each one narrows what the answer can be. Which option lines up with all of them? Hold your reasoning, then watch the walkthrough below.

#### Transcript

OK, let's read the STEM together this time and watch for the constraints that separate the options. A company has many resources in a single AWS region. The resources include Amazon EBS volumes and Amazon DynamoDB tables. The company plans to add additional AWS resource types to its backup plans in the future. The company tags resources with one of three tags prod, dev, or test. A system administrator manually takes backups of the various resources and stores the backups in the same region. The company requires the system administrator to back up dev and test resources daily. The system administrator must back up Prod resources twice a day. The company needs to automate the backups and store the prod backups in a second region. All right, Joe, so which solution will meet these requirements with the LEAST operational effort? Well, here's the first signal. We start with two different resource types EBS volumes and DynamoDB tables. And then we have this line plans to add additional AWS resource types in the future. That's the line that really matters here. Whatever we choose can't be tied to one resource type. It has to cover several today and absorb new ones later without a redesign, right? And then the second signal is manage schedules by tag, backup dev and test daily, and prod twice a day. So these prod, dev and test tags are how we group what gets backed up and how often. And the third signalto the prod backups in a 2nd region, which is a great DR strategy for their most critical data. That means cross region, and the closer, least operational effort means the fewest moving parts and the least manual upkeep. So let's test these options. A and B both use Amazon Data Lifecycle Manager. Data Life Cycle Manager automates EBS snapshots. That's the catch. It handles EBS, but it doesn't back up DynamoDB. And it won't cover those future resource types either. You'd be bolting on extra tooling for everything that isn't an EBS volume, right? So A and B are out on that alone before we even check the regions. They can't cover the resources in the STEM, let alone anything that comes along later. Yep, so that leaves C and D, and both use AWS backup. That's the right service. It's a managed backup service that works across many AWS services from one place. And you can include all supported resources, so future resource types come along automatically. Yeah, so now it comes down to the details. Both options create two plans. Both back up prod every 12 hours and Dev and test daily. The only difference is where the prod backups go. Option D stores the prod backups in the default vault, which is in the. Same region, but the requirement was prod in a second region, so D misses the one geographic requirement in the question. Option C stores the prod backups in a vault in the second region and puts the dev and test in the default vault. Now that matches every requirement exactly. -- So -- the answer is C. Write service and the prod copies land where they're supposed to. Exactly. So here's the takeaway. When you see many resource types, especially if it says more types in the future, plus a cross-region requirement and least effort, that's AWS backup with tag-based plans. Data life cycle Manager is EBS only. -- And -- when two options look almost identical, focus on the difference. Here it was one detail which vault and which region.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the markers you marked in the stem?

#### Create two Amazon Data Lifecycle Manager (Amazon DLM) policies. Configure the first policy to back up resources that have the Prod tag every 12 hours. Use the default location for the first policy. Configure a second policy as a cross-account copy event policy for resources that have the Dev or Test tags. Configure the second policy to write backups to the second Region every 24 hours.

A test-taker might pick this because Amazon DLM automates backups on a schedule and can act on tagged resources. However, DLM automates EBS snapshots only. It does not back up DynamoDB or the other resource types the company plans to add, so you would need extra tooling for everything that is not an EBS volume. The default location also would not place the Prod backups in the second Region. The pattern to notice: when the stem lists multiple resource types (and "more in the future"), DLM's EBS-only scope disqualifies it before you even check the Region details.

#### Create two Amazon Data Lifecycle Manager (Amazon DLM) policies. Configure the first policy as a cross-account copy event policy for resources that have the Prod tag. Configure the first policy to write backups to the second Region every 12 hours. Configure the second policy to back up resources that have the Dev or Test tags once a day. Use the default location for the second policy.

A test-taker might pick this because the cross-account copy would get the Prod backups into the second Region, which fixes the geographic requirement. However, it is still Amazon DLM, which backs up EBS snapshots only. It does not cover DynamoDB or future resource types, so you would need additional configuration for everything else. The pattern to notice: getting one requirement right (the Region) does not rescue an option whose core service cannot cover the resources in scope.

#### Create two backup plans in AWS Backup. Configure the first plan to include all supported resources that have the Prod tag. Run the first backup plan every 12 hours. Store these backups in a backup vault in the second Region. Configure the second backup plan to include all supported resources that have the Dev or Test tags. Run the second backup plan daily. Store these backups in the default backup vault.

This is the correct option. AWS Backup is a managed service that automates data protection across many AWS services from one place. Two tag-based plans handle the schedules: Prod every 12 hours, Dev and Test daily. Storing the Prod backups in a vault in the second Region meets the cross-Region requirement. Including all supported resources means current types (EBS, DynamoDB) and future types are covered automatically, with the least operational effort. The pattern to take forward: many resource types plus "more in the future" plus a cross-Region requirement points to AWS Backup with tag-based plans, and the correct option is the one whose Prod vault is in the second Region.

#### Create two backup plans in AWS Backup. Configure the first backup plan to include all supported resources that have the Prod tag. Run the first backup plan every 12 hours. Store these backups in the default backup vault. Configure the second backup plan to include all supported resources that have the Dev or Test tags. Run the second backup plan daily. Store these backups in a backup vault in the second Region.

A test-taker might pick this because it uses AWS Backup with two tag-based plans, which is the right service and the right schedule structure. However, it stores the Prod backups in the default backup vault (same Region) and puts Dev and Test in the second Region. The stem requires the Prod backups in the second Region, so the vaults are reversed. The pattern to notice: when two options use the right service and differ by one detail, focus on that detail. Here it is which vault holds Prod, and this option puts it in the wrong Region.

---

## Question 2: Takeaway

That is all for this question. The reading pattern here rewards two checks: match the service to the resource scope (AWS Backup covers many services and future types; Amazon DLM is EBS only), then, when two options use the right service, focus on the one detail that separates them. Here it was which vault held the Prod backups, and only the option that placed Prod in the second Region met every requirement. Note any knowledge gap you spotted while working through it.

---

# Practice Assessment: Domain 4 (5 preguntas)

## Pregunta 1 de 5: Failover multi-región para Disaster Recovery permaneciendo en la red global de AWS

*Tarea: 4.3 — Soluciones de resiliencia y continuidad de negocio en arquitecturas de red*

### Enunciado

A company has an application that runs on Amazon EC2 instances behind an Application Load Balancer (ALB). The instances run in an Amazon EC2 Auto Scaling group in a single AWS Region. The application must have the ability to failover to a second Region for disaster recovery. The company clones the existing environment to a second Region to establish the disaster-recovery infrastructure. To provide the highest level of network performance, all traffic must remain in the AWS network.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Create a VPC peering connection between the VPCs in both Regions. Use Route 53 latency alias records that point to the ALBs.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Amazon Route 53 es un servicio DNS que resuelve nombres hacia endpoints públicos. Las consultas y el tráfico del cliente viajan a través de la Internet pública; el tráfico de los usuarios no permanece confinado dentro de la red privada global de AWS.
  - 📖 Más información: [Amazon Route 53](https://docs.aws.amazon.com/route53/)

- **B.** Create a VPC peering connection between the VPCs in both Regions. Use a Route 53 weighted routing policy that points to the ALBs.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Nuevamente, Route 53 enruta las conexiones de los clientes a través de Internet público, incumpliendo el requisito estricto de que el tráfico debe permanecer en la red privada de AWS.
  - 📖 Más información: [Amazon Route 53](https://docs.aws.amazon.com/route53/)

- **C.** Create a VPC peering connection between the VPCs in both Regions. Configure the ALBs to distribute the traffic to the Regions.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los Application Load Balancers son recursos estrictamente **regionales**; un ALB no puede distribuir tráfico directamente hacia instancias o destinos situados en otra región de AWS.
  - 📖 Más información: [What Is VPC Peering?](https://docs.aws.amazon.com/vpc/latest/peering/what-is-vpc-peering.html) y [How Elastic Load Balancing Works](https://docs.aws.amazon.com/elasticloadbalancing/latest/userguide/how-elastic-load-balancing-works.html)

- **D.** Create a standard accelerator with AWS Global Accelerator. Configure the accelerator to point to the ALBs.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Tráfico 100 % en la red global de AWS:** **AWS Global Accelerator** asigna dos direcciones Anycast IP estáticas globales. El tráfico de los clientes ingresa por la ubicación de borde (Edge PoP) de AWS más cercana geográficamente y viaja íntegramente por la **red privada troncal de AWS**, ofreciendo el más alto rendimiento y el menor jitter.
    2. **Failover instantáneo entre regiones:** Monitorea continuamente la salud de los Application Load Balancers en ambas regiones y conmuta automáticamente el tráfico a la segunda región en segundos ante una interrupción.
  - 📖 Más información: [How AWS Global Accelerator Works](https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html)

> [!important] Trampa de examen
> Cuando un escenario exija: **Failover multirregión + el tráfico DEBE permanecer dentro de la red global de AWS (highest network performance)**: la solución es **AWS Global Accelerator**. Route 53 depende del enrutamiento por Internet público y de la expiración de cachés DNS (TTL).

---

## Pregunta 2 de 5: Recolección de datos de infraestructura y seguimiento centralizado de la migración

*Tarea: 4.1 — Evaluación de cargas de trabajo y herramientas de planificación*

### Enunciado

A company wants to migrate its current applications and infrastructure to AWS. The company has applications and databases that run on several on-premises physical servers. The company wants to determine what infrastructure it must migrate. The company wants to monitor the progress of the migration.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Use AWS Migration Evaluator to collect usage and configuration data about the on-premises servers. Use AWS Application Migration Service to plan and track the status of the application migration efforts.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:**
    1. **Migration Evaluator:** Es un servicio de evaluación económica para construir el *business case* inicial (comparación de TCO / costos On-Premises vs AWS), no para el inventario técnico detallado de servidores y dependencias de red.
    2. **AWS Application Migration Service (MGN):** Es una herramienta técnica de ejecución de migración en bloque (*rehost / lift-and-shift* a nivel de bloque), no la herramienta diseñada para planificar y rastrear centralizadamente el progreso de la cartera de aplicaciones.
  - 📖 Más información: [Migration Evaluator](https://aws.amazon.com/migration-evaluator/) y [What Is AWS Application Migration Service?](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)

- **B.** Use AWS Application Discovery Service to collect usage and configuration data about the on-premises servers. Use AWS Application Migration Service to plan and track the status of the application migration efforts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Application Discovery Service es correcto para la recolección, pero Application Migration Service (MGN) ejecuta la replicación de bloques, no el seguimiento del portafolio. Para planificar y rastrear el estado del proyecto se requiere AWS Migration Hub.
  - 📖 Más información: [What Is AWS Application Migration Service?](https://docs.aws.amazon.com/mgn/latest/ug/what-is-application-migration-service.html)

- **C.** Use AWS Migration Evaluator to collect usage and configuration data about the on-premises servers. Use AWS Migration Hub to plan and track the status of the application migration efforts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Migration Evaluator se enfoca en business case y modelos financieros, no en el descubrimiento técnico profundo de especificaciones de hardware y dependencias de red de los servidores on-premises.
  - 📖 Más información: [Migration Evaluator](https://aws.amazon.com/migration-evaluator) y [What Is AWS Application Discovery Service?](https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html)

- **D.** Use AWS Application Discovery Service to collect usage and configuration data about the on-premises servers. Use AWS Migration Hub to plan and track the status of the application migration efforts.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:**
    1. **AWS Application Discovery Service:** Diseñado específicamente para recolectar datos de configuración, uso de CPU/RAM/disco y conexiones de red de servidores físicos y máquinas virtuales on-premises (mediante agentes o modo sin agente).
    2. **AWS Migration Hub:** Es el **único panel centralizado** de AWS diseñado para descubrir servidores, agruparlos en aplicaciones lógicas, planificar olas de migración y **rastrear el progreso y estado** de cada aplicación a medida que se ejecutan las migraciones con diversas herramientas de AWS y de terceros.
  - 📖 Más información: [What Is AWS Migration Hub?](https://docs.aws.amazon.com/migrationhub/latest/ug/whatishub.html) y [What Is AWS Application Discovery Service?](https://docs.aws.amazon.com/application-discovery/latest/userguide/what-is-appdiscovery.html)

> [!important] Trampa de examen
> Memoriza la dupla canónica de migración:
> - **Descubrir servidores, configuraciones y dependencias on-premises:** **AWS Application Discovery Service**.
> - **Planificar y monitorear el progreso del proyecto de migración en un solo lugar:** **AWS Migration Hub**.
> - **Migration Evaluator:** Solo para casos de negocio y estimación de costos/TCO.
> - **Application Migration Service (MGN):** Motor de replicación lift-and-shift a nivel de bloque hacia EC2.

---

## Pregunta 3 de 5: Migración de Data Warehouse a escala de Petabytes (2 PB) sin afectar procesos ETL

*Tarea: 4.2 — Estrategia de migración de datos masivos y heterogéneos*

### Enunciado

A company has an on-premises Oracle Data Warehouse database that the company wants to migrate to AWS. The company does not want to use the Oracle database platform in the future. The database is approximately 2 PB in size. The company runs ETL processes every 2 weeks to load new data into the database. The company does not want the migration to affect the ETL processes.

The company has a secure AWS Site-to-Site VPN connection between the company's on-premises network and a VPC. The company plans to use AWS DMS and the AWS SCT to complete the migration.

Which migration option will meet these requirements?

### Opciones de respuesta

- **A.** Create an AWS Snowball Edge job with an appropriate number of devices. Configure AWS SCT agents to transfer the data to the Snowball Edge devices. Convert the database to an Amazon Redshift database.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Escala de Petabytes (2 PB):** Transferir 2 PB por una conexión Site-to-Site VPN saturaría el enlace durante meses y pondría en riesgo los procesos ETL quincenales. El uso de múltiples dispositivos físicos **AWS Snowball Edge** transporta petabytes de datos de forma rápida, segura y fuera de banda.
    2. **Migración heterogénea de Data Warehouse:** El origen es un Data Warehouse Oracle y la empresa no desea continuar con Oracle. **AWS SCT (Schema Conversion Tool) con agentes de extracción de datos** extrae, convierte los esquemas y carga los datos hacia los dispositivos Snowball Edge para su ingesta final en **Amazon Redshift**, que es el servicio gestionado de Data Warehouse diseñado para escala de petabytes.
  - 📖 Más información: [What Is Amazon Redshift?](https://docs.aws.amazon.com/redshift/latest/mgmt/welcome.html), [Migrating Data from an On-Premises Data Warehouse to Amazon Redshift](https://docs.aws.amazon.com/SchemaConversionTool/latest/userguide/agents.dw.html) y [What Is AWS Snowball Edge?](https://docs.aws.amazon.com/snowball/latest/developer-guide/whatisedge.html)

- **B.** Create an AWS Snowball Edge job with an appropriate number of devices. Configure AWS SCT agents to transfer the data to the Snowball Edge devices. Convert the database to an Amazon Aurora database.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Amazon Aurora es un motor relacional transaccional (OLTP) cuyo límite de tamaño de volumen es de **128 TB**. Aurora no puede albergar un Data Warehouse analítico de 2 PB.
  - 📖 Más información: [Quotas and Constraints for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html)

- **C.** Configure AWS SCT agents to transfer the data to an Amazon S3 bucket by using the existing VPN connection. Convert the database to an Amazon Redshift database.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Transferir 2 PB sobre una VPN IPsec estándar (máx 1.25 Gbps por túnel) tomaría más de 6 meses de transferencia ininterrumpida saturando el enlace y rompiendo los ETLs quincenales.
  - 📖 Más información: [What Is AWS Site-to-Site VPN?](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html)

- **D.** Configure AWS SCT agents to transfer the data to an Amazon S3 bucket by using the existing VPN connection. Convert the database to an Amazon Aurora database.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Falla tanto por usar la VPN para 2 PB como por seleccionar Aurora como destino de 2 PB.
  - 📖 Más información: [Quotas and Constraints for Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/CHAP_Limits.html)

> [!important] Trampa de examen
> - **Datos analíticos a escala de Petabytes (> 1 PB):** El destino siempre es **Amazon Redshift**. Amazon Aurora tiene un límite máximo de **128 TB**.
> - **Transferir > cientos de Terabytes / Petabytes con enlaces de red limitados:** Utiliza **AWS Snowball Edge** (con agentes de extracción de **AWS SCT** para data warehouses).

---

## Pregunta 4 de 5: Migración de MySQL (20 TB) sin downtime y reducción de carga operativa

*Tarea: 4.2 — Migración homogénea de base de datos con mínimo downtime*

### Enunciado

A company is preparing to migrate an on-premises MySQL database to the AWS Cloud. An increase in the number of client applications has caused poor database performance. The database size is 20 TB and is forecasted to increase by 4 TB each year. This database requires a large team for maintenance and ongoing operations, which is an administrative burden for the company.

The company wants a cost-effective solution that the company can implement quickly without refactoring the applications. The solution must minimize administrative burden and must offer high performance now and in the future. The database must be highly available and must remain operational during the migration.

Which combination of actions should the company take to meet these requirements? (Select TWO.)

### Opciones de respuesta

- **A.** Use an Amazon Aurora MySQL Multi-AZ DB instance.
  - ✅ **Respuesta correcta (Paso 1/2)**
  - **Por qué es correcto:**
    1. **Compatible sin refactorización:** Aurora MySQL es 100 % compatible con MySQL a nivel de código y controladores, permitiendo conectar las aplicaciones existentes sin modificarlas.
    2. **Escalabilidad y reducción administrativa:** Es un servicio totalmente administrado (parches, copias de seguridad automáticas, autoescalado de almacenamiento hasta 128 TB sin pre-aprovisionar). Con 20 TB y creciendo a 4 TB/año, Aurora lo soporta de forma nativa.
    3. **Alta disponibilidad y rendimiento:** El despliegue Multi-AZ replica el volumen en 6 copias a través de 3 zonas de disponibilidad con tolerancia a fallos.
  - 📖 Más información: [Amazon Aurora MySQL](https://aws.amazon.com/rds/aurora/) y [Database Migration Step-by-Step Walkthroughs](https://docs.aws.amazon.com/dms/latest/sbs/dms-sbs-welcome.html)

- **B.** Use AWS DMS to migrate the data.
  - ✅ **Respuesta correcta (Paso 2/2)**
  - **Por qué es correcto:** **AWS Database Migration Service (AWS DMS)** realiza la carga inicial y activa replicación continua de cambios (CDC), manteniendo la base de datos on-premises **100 % operativa y disponible para los clientes durante todo el proceso de migración**, minimizando el tiempo de inactividad a solo el cambio de endpoint en el corte (*near-zero downtime*).
  - 📖 Más información: [AWS Database Migration Service](https://aws.amazon.com/dms/)

- **C.** Use an Amazon DynamoDB table.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** DynamoDB es una base de datos NoSQL clave-valor / documental. Migrar una base de datos relacional MySQL a DynamoDB obligaría a reescribir y refactorizar por completo todas las aplicaciones cliente, violando el requisito *"without refactoring the applications"*.
  - 📖 Más información: [Best Practices for Modeling Relational Data in DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-relational-modeling.html)

- **D.** Use MySQL running on an Amazon EC2 instance that is optimized for storage and high I/O.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Hospedar MySQL en instancias autogestionadas de EC2 traslada la pesada carga de administración del sistema operativo, el aprovisionamiento de discos EBS, la configuración manual de réplicas Multi-AZ y las actualizaciones de parches al equipo interno, violando el requisito de *"minimize administrative burden"*.
  - 📖 Más información: [Amazon Aurora vs EC2](https://aws.amazon.com/rds/aurora/)

- **E.** Use the mysqldump utility to migrate the data.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** `mysqldump` genera un volcado estático en un punto en el tiempo. Exportar e importar 20 TB con mysqldump tardaría días o semanas, no mantiene sincronizados los cambios posteriores y obligaría a detener la base de datos o causaría inconsistencias severas, violando el requisito de permanecer operativa durante la migración.
  - 📖 Más información: [Exporting Data From a MySQL DB Instance by Using Replication](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/MySQL.Procedural.Exporting.NonRDSRepl.html)

> [!important] Trampa de examen
> - **Reducir sobrecarga administrativa en MySQL:** Siempre elegir **Amazon Aurora MySQL** sobre EC2 autogestionado.
> - **Base de datos que debe permanecer operativa durante la migración (cero downtime):** Siempre elegir **AWS DMS**, NUNCA utilidades de volcado estático como `mysqldump`.

---

## Pregunta 5 de 5: Orquestación automatizada de Disaster Recovery: promoción de Read Replica y copia de AMIs

*Tarea: 4.3 — Soluciones de continuidad de negocio, RTO/RPO y recuperación automatizada*

### Enunciado

A company runs a web application in the us-west-2 Region. The application runs on Amazon EC2 instances behind a Network Load Balancer. The instances run in an Amazon EC2 Auto Scaling group across multiple Availability Zones. Transactional data is stored in an Amazon RDS for MySQL DB instance. Amazon Route 53 is used for the DNS. The database endpoint name is stored in AWS Systems Manager Parameter Store. The Auto Scaling group has a minimum size of 1 and a maximum size of 8. The application is deployed with an AWS CloudFormation template.

A solutions architect must design an automated disaster recovery (DR) plan for the application. The plan must give the application the ability to fail over to a second AWS Region with an RTO of 30 minutes and an RPO of 15 minutes. The solutions architect does not have the ability to change the application source code.

The solutions architect already has completed the following steps:
1. Created a read replica of the DB instance in the second Region.
2. Added an Amazon S3 bucket and database connection string to Parameter Store in the second Region.
3. Updated the Mappings section of the CloudFormation template with mappings of the Region to the appropriate AMIs.
4. Used the CloudFormation template to launch an application stack in the second Region.
5. Configured Route 53 to fail over to the application in the second Region based on a failed health check.
6. Created an Amazon CloudWatch alarm to send a message to an Amazon SNS topic if the health check fails.

Which combination of additional steps must the solutions architect take to complete this DR plan? (Select TWO.)

### Opciones de respuesta

- **A.** Create an AWS Lambda function in the second Region that makes a snapshot of the read replica and uses that snapshot to create a new DB instance. Subscribe the function to the health check alarm SNS topic.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Tomar un snapshot de la réplica y reconstruir una instancia RDS desde el snapshot puede tardar más de 30 minutos (violando el RTO de 30 min). No es necesario crear un snapshot porque AWS RDS permite **promover directamente la réplica existente a base de datos independiente**.
  - 📖 Más información: [Working with Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)

- **B.** Create an AWS Lambda function in the second Region that promotes the read replica DB instance to a standalone DB instance. Subscribe the function to the health check alarm SNS topic.
  - ✅ **Respuesta correcta (Paso 1/2)**
  - **Por qué es correcto:** La réplica de lectura entre regiones se mantiene sincronizada con lag mínimo (< 15 min RPO). Sin embargo, una réplica de lectura rechaza todas las operaciones de escritura (modo solo lectura). Al suscribir una función **AWS Lambda** al tema SNS de la alarma de fallo de salud, Lambda invoca la API `PromoteReadReplicaDBInstance`, transformándola inmediatamente en una base de datos independiente de lectura y escritura para permitir el failover dentro del RTO de 30 minutos.
  - 📖 Más información: [Working with Read Replicas](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_ReadRepl.html)

- **C.** Copy any required AMIs from the first Region to the second Region.
  - ✅ **Respuesta correcta (Paso 2/2)**
  - **Por qué es correcto:** Las **Amazon Machine Images (AMIs) son recursos regionales**. No es posible lanzar una instancia EC2 en la segunda región utilizando un ID de AMI que resida en la primera región. Aunque el CloudFormation template tenga un mapa de AMIs por región, dichas AMIs deben existir físicamente en la segunda región mediante la operación de **copia de AMI (Copy AMI)**.
  - 📖 Más información: [Copy an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html)

- **D.** Add a parameter to the CloudFormation template to indicate the Region of the deployment.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** CloudFormation utiliza la pseudo-variable intrínseca `AWS::Region` para detectar automáticamente la región en la que se ejecuta el stack; agregar un parámetro manual para la región no es la práctica estándar ni soluciona el aprovisionamiento de las AMIs.
  - 📖 Más información: [AWS CloudFormation Endpoints](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-endpoints.html)

- **E.** Change the permissions on any required AMIs in the first Region to allow them to be accessed from the second Region.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Los permisos de las AMIs (compartir con otras cuentas) operan exclusivamente dentro de la misma región. **No existe ningún mecanismo de permisos que permita usar una AMI en una región diferente** a donde fue creada; la AMI debe ser copiada físicamente a la región de destino.
  - 📖 Más información: [Copy an AMI](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/CopyingAMIs.html)

> [!important] Trampa de examen
> 1. **Failover de RDS Read Replica en DR:** Se automatiza con una función **Lambda que ejecuta `PromoteReadReplica`** (promoción a base de datos standalone). **NUNCA tomes un snapshot para recrear la BD** en un failover con RTO estricto.
> 2. **AMIs entre regiones:** Las AMIs **NUNCA se comparten cross-region mediante permisos**. La única forma de utilizarlas en otra región es **copiándolas físicamente (`Copy AMI`)**.

---

_Fuente: [Skill Builder - Domain 4 Practice (SAP-C03)](https://skillbuilder.aws/renderer/?module_id=BQ2MS7DJ7H%3A001.000.000&product_id=J5B7N8NNMA%3A001.000.000&registration_id=de7b2874-7159-51f8-b851-b556790fbe2f&referrer=https%3A%2F%2Fskillbuilder.aws%2Flearn%2FYGHF4S4JRH%2Fdomain-4-practice-aws-certified-solutions-architect--professional-sapc03--english%2FJ5B7N8NNMA&navigation=digital_)
