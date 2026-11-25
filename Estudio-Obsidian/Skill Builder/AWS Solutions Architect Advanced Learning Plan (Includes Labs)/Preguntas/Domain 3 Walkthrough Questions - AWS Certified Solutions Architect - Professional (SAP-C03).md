---
title: "Domain 3 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)"
aliases:
  - "Domain 3 Walkthrough Questions"
  - "Walkthrough D3"
  - "Preguntas Walkthrough D3"
tags:
  - certificacion/aws
  - sap-c02
  - sap-c03
  - skill-builder
  - preguntas
  - walkthrough
  - dominio-3
status: activo
fuente: "https://skillbuilder.aws/learn/MN2JMQRPWD/domain-3-practice-aws-certified-solutions-architect--professional-sapc03--english/YQBP2CA22N"
---

# Domain 3 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **preguntas guiadas (Walkthrough)** y **evaluaciones prácticas (Practice Assessment)** del **Dominio 3: Continuous Improvement for Existing Solutions** para la certificación AWS Certified Solutions Architect - Professional (SAP-C03).
> Diseñado para analizar escenarios de optimización sobre arquitecturas en producción: modelos de precios de AWS (Provisioned vs On-demand en Kinesis), imputación y visibilidad de costos nativos en IA generativa (Bedrock application inference profiles), optimización de cómputo batch (Auto Scaling Mixed Instances Spot + On-Demand), ciclo de vida de almacenamiento (S3 Glacier vs IA) y limitaciones operativas de DynamoDB TTL.

> [!info] Metodología Walkthrough
> 1. **Lectura dirigida:** Identificar primero la pregunta final (criterio clave: *menor sobrecarga operativa*, *más costo-eficiente*, *menor tiempo de espera*, *HIGHEST potential cost savings*).
> 2. **Extracción de señales y restricciones:** Desglosar patrones de tráfico, SLAs estrictos (7 AM apertura de mercado), formatos de datos (string vs epoch number para TTL) y restricciones del negocio ("no modificar la aplicación").
> 3. **Eliminación sistemática:** Descartar opciones inviables, sobreaprovisionadas o sobrecargadas operativamente justificando la falla de cada distractor.
> 4. **Validación:** Confirmar la mejor opción frente a los servicios recomendados y las mejores prácticas del Well-Architected Framework.

---

## 📊 Registro de intentos

| # | Fecha | Evaluación / Sección | Aciertos | % | Estado | Tareas flojas / Motivo del error |
| - | ----- | -------------------- | -------- | - | ------ | -------------------------------- |
| 1 | 2026-11-20 | Walkthrough Questions (Q1-Q2) | 2/2 | 100 % | 🟢 | Q1: Kinesis capacity modes (Provisioned para tráfico predecible vs On-demand para picos de 15 min; streams separados para facturación) / Q2: Bedrock application inference profiles con cost allocation tags + Cost Explorer |
| 2 | 2026-11-20 | Practice Assessment (2 preguntas) | 1/2 | 50 % | 🟡 | P1 acertada (Mixed Instances 20% On-Demand + 80% Spot con checkpoints en DynamoDB para cumplir SLA de 7 AM). P2 fallada: trampa de **DynamoDB TTL** (requiere formato numérico Unix epoch time, inviable si no se puede modificar la app que envía string) y elección de **Glacier Flexible Retrieval** sobre S3-IA para máximo ahorro cuando el acceso no es inmediato. |

---

## ✅ Cobertura por tarea (Dominio 3)

| Tarea | Descripción | Preguntas vistas | Estado |
| ----- | ----------- | ---------------- | ------ |
| **3.1** | Design architectures based on AWS pricing models | 1 (Q1: Kinesis capacity modes) | 🟡 vista |
| **3.2** | Determine a path to improve overall performance | 0 | ⬜ |
| **3.3** | Design cost allocation and visibility solutions | 1 (Q2: Bedrock inference profiles) | 🟡 vista |
| **3.4** | Determine a path to improve cost effectiveness | 2 (P1: EC2 Mixed Instances / P2: DynamoDB + S3 Glacier) | 🟡 vista |
| **3.5** | Determine a path to improve operational excellence | 0 | ⬜ |

*Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.*

---

# Walkthrough questions

## Question 1: Walkthrough question

This walkthrough question is from task statement 3.1: Design architectures based on AWS pricing models. The question reads:

"A ride-sharing company processes GPS and promotional clickstream data streams through Amazon Kinesis Data Streams. The GPS data stream operates continuously and has predictable throughput. The promotional clickstream data stream has minimum steady-state traffic outside of occasional spikes that reach peak levels within 15 minutes. These spikes occur two to four times monthly for 3-hour windows during marketing campaigns. The company requires sub-second processing latency during all traffic patterns. The company also requires independent cost tracking for each data stream. Which solution will meet these requirements MOST cost-effectively?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: predictable throughput

"Predictable throughput" signals a workload suited for provisioned mode. When you know the steady-state capacity, provisioning it at a fixed per-shard-hour rate avoids the on-demand per-GB premium. Provisioned mode is cheaper for known, constant workloads.

#### 2: occasional spikes that reach peak levels within 15 minutes

Spikes that reach peak within 15 minutes align precisely with on-demand mode's scaling behavior. On-demand accommodates up to 2x the previous 30-day peak instantly. Beyond that, it scales within 15 minutes. The stem is telling you the spike ramp matches on-demand's scaling window.

#### 3: two to four times monthly for 3-hour windows

Campaigns happen only 2 to 4 times monthly for 3-hour windows. That means provisioning at peak capacity would leave shards idle 27 to 29 days per month. Paying for idle shard-hours contradicts cost-effectiveness. On-demand charges only for data actually written and read.

#### 4: independent cost tracking for each data stream

"Independent cost tracking" means separate billable resources. Kinesis bills at the stream level, not at the partition key level. You cannot isolate costs within a shared stream using tags or key prefixes. Separate streams are required.

#### 5: MOST cost-effectively

"MOST cost-effectively" is the tiebreaker. It eliminates any option that over-provisions (paying for idle capacity) or uses on-demand mode where provisioned mode would be cheaper (predictable workload). Match each workload to the mode that minimizes waste.

---

## Question 1: Examine the answers

You identified two workloads with different traffic patterns (predictable versus spiky), a 15-minute ramp-up window, independent cost tracking, and cost-effectiveness as the deciding factor. Each one narrows what the answer can be. Which option lines up with all of them? Hold your reasoning, then watch the walkthrough below.

#### Transcript

This question gives you two data streams with very different traffic profiles and asks you to pick the most cost-effective configuration. All right, Joe, let's start with what the STEM tells us about each workload. Well, the GPS stream is straightforward, continuous, predictable throughput. That's a textbook fit for provision mode. You know the capacity, you set the shards, you pay a fixed rate, no surprises. The promotional click stream is the opposite minimum traffic most of the time. Then spikes 2 to 4 times a month during campaigns. The stem even tells you the spikes reach peak within 15 minutes, and that 15 minute detail is not random. On-demand mode in Kinesis accommodates up to 2 times the previous 30 day peak instantly, and beyond that, it scales within 15 minutes. So the stem is essentially describing on-demand mode's scaling window. Exactly. So the mode assignment is provision for GPS, on demand for promotional click stream. That's option A. All right, well, let's look at the distractors. Option B puts both streams on on-demand. Now that works functionally, but on-demand mode costs more than provisioned for a stream with predictable, steady throughput. You're paying a per gigabyte premium for capacity flexibility that you don't need on the GPS stream, and the stem asks for MOST cost effectively. -- Overpaying for the predictable stream disqualifies -- it. Now O option C swaps the modes entirely. It provisions the promotional stream at peak capacity and puts the GPS stream on on-demand, and that's just backwards in both directions, right? Provisioning at peak means those shards sit idle 27 to 29 days a month. You're paying shard hours for capacity that's only used during 3 hour campaign windows a few times a month. That's the definition of waste. -- It -- is. And option D consolidates both workloads into a single stream provisioned at peak promotional capacity. And there's two problems there. First, the same overprovisioning waste. And second, and this is the one some folks miss, Kinesis data streams bills at the stream level. So if both workloads share one stream, you can't separate the GPS costs from the promotional costs. Cost allocation tags on the stream give you one cost figure for the whole stream, not per partition key breakdowns, and the STEM explicitly requires independent cost tracking for each data stream. A single shared stream fails that requirement. -- All -- right, so to recap the pattern here, we have two signals that we'll watch out for. The traffic profile tells you the mode. Predictable means provisioned, variable means on demand, and the cost tracking requirement tells you the resource boundary. Independent tracking means separate billable resources. Yeah, match the mode to the workload and separate the resources when the stem asks for a separate tracking. Both of those have to line up for the answer to work.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the markers you marked in the stem?

#### Configure the GPS data stream in provisioned mode. Set the capacity for steady throughput. Configure the promotional clickstream data stream in on-demand mode. Deploy separate streams for independent cost allocation. Enable AWS cost allocation tags on each stream to track costs independently.

This is the correct option. It matches the capacity mode to each workload's traffic pattern. The GPS stream has predictable, steady throughput, so provisioned mode provides cost-effective fixed pricing without paying the on-demand premium. The promotional clickstream stream has unpredictable spikes, so on-demand mode automatically scales to handle traffic increases. On-demand mode accommodates up to two times the previous 30-day peak instantly and scales beyond that within 15 minutes, which matches the stem's "reach peak levels within 15 minutes" description. Separate streams enable independent cost tracking because Kinesis Data Streams bills at the stream level. Cost allocation tags provide additional granularity in Cost Explorer. The pattern to take forward: match the capacity mode to the traffic profile. Predictable and steady means provisioned. Variable and spiky means on-demand. And separate resources are needed when the stem requires independent cost tracking.

#### Configure both streams in on-demand mode. Configure monitoring on the promotional clickstream data stream to track when traffic doubles the previous 30-day peak. Deploy separate streams for independent cost tracking. Enable detailed Amazon CloudWatch metrics for capacity monitoring.

A test-taker might pick this because on-demand mode does work for both streams, and separate streams do enable independent cost tracking. However, on-demand mode for the GPS stream costs more than provisioned mode because the GPS throughput is predictable and steady. On-demand pricing is designed for variable workloads where you cannot predict capacity needs. Applying it to a stream with known, constant throughput means paying an on-demand premium for capacity you could have provisioned at a lower rate. The stem asks for the MOST cost-effective solution, and overpaying for the GPS stream disqualifies this option. The pattern to notice: on-demand is not always cheaper. When throughput is known and stable, provisioned mode avoids the on-demand per-GB premium.

#### Configure the GPS data stream in on-demand mode. Configure the promotional clickstream data stream in provisioned mode. Set the shard count to peak campaign capacity. Deploy separate streams for independent cost tracking. Use AWS Budgets to monitor the costs for each stream.

A test-taker might pick this because it assigns separate streams (enabling cost tracking) and uses both modes. However, it assigns them backward. Provisioning the promotional clickstream stream at peak capacity means paying for shards that sit idle 27 to 29 days each month between campaigns. That is wasted shard-hour cost for the vast majority of the time. Meanwhile, the GPS stream that could benefit from fixed provisioned pricing is on on-demand instead. The pattern to notice: the mode assignment must match the traffic pattern. Predictable gets provisioned. Spiky gets on-demand. Swapping them wastes money in both directions.

#### Deploy a single consolidated stream in provisioned mode. Set the shard count to peak promotional capacity. Use separate partition key prefixes for the GPS and promotional clickstream data streams. Use AWS cost allocation tags and partition key patterns to track the costs by workload type.

A test-taker might pick this because it appears to consolidate infrastructure and simplify management. However, provisioning the single stream at peak promotional capacity wastes shard hours during steady-state GPS-only traffic (most of the time). More critically, Kinesis Data Streams bills at the stream level, not at the partition key level. Cost allocation tags on a shared stream cannot isolate GPS costs from promotional costs because both workloads share the same billable stream resource. This approach fails both the cost-effectiveness requirement (over-provisioned shards) and the independent cost tracking requirement (single billing entity). The pattern to notice: cost allocation tags do not break down costs by partition key within a stream. When the stem requires independent cost tracking, the workloads must be on separate billable resources.

---

## Question 1: Takeaways

That is all for this question. The reading pattern here rewards two things: matching capacity modes to workload profiles (predictable means provisioned, variable means on-demand) and understanding that cost isolation requires separate billable resources. When a stem describes two workloads with different patterns and requires independent cost tracking, those two signals together demand separate streams with modes matched to each pattern. Note any knowledge gap you spotted while working through it.

---

## Question 2: Walkthrough question

This walkthrough question is from task statement 3.3: Design cost allocation and visibility solutions. The question reads:

"A university IT department runs a shared on-premises GPU cluster that researchers in multiple departments use for LLM inference workloads. The IT department will move these workloads to AWS by using Amazon Bedrock. The IT department must automate cost tracking for each department. The IT department must also decrease the time that researchers wait for available capacity. Which solution will meet these requirements with the LEAST operational overhead?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: shared on-premises GPU cluster

The current pain point is a shared physical cluster with contention. Researchers wait because capacity is fixed and shared. Moving to a managed service eliminates that contention model entirely.

#### 2: Amazon Bedrock

The target service is already decided: Amazon Bedrock. The question is not "which service" but "how to organize cost tracking and capacity within Bedrock." Look for Bedrock-native features rather than external tooling.

#### 3: automate cost tracking for each department

Per-department cost tracking in Bedrock points to a resource that can carry cost allocation tags and be used in API calls to attribute costs. Application inference profiles are purpose-built for this: one per department, each tagged, each used as the model ID in that department's requests.

#### 4: decrease the time that researchers wait for available capacity

Reduced wait time means on-demand capacity that scales without pre-allocation. Provisioned Throughput requires capacity planning and can under-provision. On-demand inference via Bedrock (the default when you call the API) scales automatically with no wait queue.

#### 5: LEAST operational overhead

"LEAST operational overhead" eliminates options that require standing up additional services (Athena, CUR delivery, SQL queries) or managing fixed-capacity commitments (Provisioned Throughput rightsizing). Look for the solution that uses built-in features with no extra infrastructure.

---

## Question 2: Examine the answers

You identified a move to Amazon Bedrock, per-department cost tracking, reduced wait times, and least operational overhead. Each one narrows what the answer can be. Which option lines up with all of them? Hold your reasoning, then watch the walkthrough below.

#### Transcript

All right, Joe, let's talk through this one. The university is moving from a shared GPU cluster to Amazon Bedrock. They need per department cost tracking, and they want less waiting, and the whole thing needs to run with the least operational overhead, right? And the key insight here is that the target service is already decided. It's Bedrock. So what the question is really asking is what's the lightest weight way to track costs per department within Bedrock, and the answer is application inference profiles. You create one per department, tag each one with a cost allocation tag, and then each department uses their profile ARN in place of the model ID. When they call the API, -- the -- tags flow through to Cost Explorer automatically. No custom queries, no separate infrastructure. It is filtered by the tag, and you can see what each department has spent. So now let's eliminate the distractors. Option B tries to use cost categories with I A M role as a rule dimension. That sounds logical, but cost category rules support account, service, charge type, tag, and region. I A M role is not a supported dimension. So no matter how clever that rule sounds, you can't build it. Well, that's a, that's a fail. Exactly. OK. And now option C uses inference profiles, which is correct for attribution, but then it layers on cost and usage reports delivery to S3, Athena table setup, and SQL queries to extract the cost data. That works, but it adds significant operational overhead. The stem says LEAST operational overhead, and Cost Explorer already provides the same filtering natively. Exactly. Why build a whole reporting pipeline when the built-in tool already does it? And Option D uses provision throughput with cost allocation tags. The tags work fine for tracking, but provision throughput requires allocating fixed model units per department. That means capacity planning, right sizing decisions, and the risk of underprovisioning, which reintroduces the very wait time the STEM wants to eliminate. -- Plus -- overprovisioning just wastes money, and underprovisioning means throttled requests that need retries. Either way, it adds operational burden that on-demand. Avoids completely. So the pattern here when a STEM names a specific managed service and asks for least operational overhead cost tracking, look for that service's native attribution mechanism first. For Bedrock, that's application inference profiles with cost allocation tags and cost explorer, right? And don't bolt on external reporting when the service already has that feature built in.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the markers you marked in the stem?

#### Set up Amazon Bedrock application inference profiles for each department. Configure and activate cost allocation tags for each of the application inference profiles. Use AWS Cost Explorer to view the Amazon Bedrock inference costs for each department.

This is the correct option. Application inference profiles are purpose-built for this scenario: you create one per department, attach cost allocation tags, and use the profile ARN in place of the model ID in API calls. Cost Explorer then filters costs by those tags without any custom code. This directly addresses per-department cost tracking with zero infrastructure to manage. On the capacity side, Bedrock's on-demand inference eliminates GPU wait times entirely because there is no shared cluster to contend for. No provisioning, no capacity planning, no query writing. The pattern to take forward: when a stem says "LEAST operational overhead" and the workload already maps to a fully managed service, look for the native tagging and attribution mechanism built into that service rather than bolting on external reporting.

#### Create cost categories in AWS Billing and Cost Management for each department. Enable Amazon Bedrock model invocation logging to an Amazon S3 bucket. Set up rules in the cost categories to match the Amazon Bedrock API calls to the departments. Base the rules on the IAM roles that each department's researchers use. Use the cost category filters of AWS Cost Explorer to view the Amazon Bedrock inference cost for each department.

A test-taker might pick this because cost categories are a real AWS feature for grouping costs. However, cost category rule dimensions include account, service, charge type, tag, and Region. They do not support IAM role as a dimension. You cannot write a cost category rule that says "attribute this Bedrock usage to Department X because it came from Role Y." Model invocation logging captures metadata but does not integrate with cost category rules for attribution. The pattern to notice: when an option describes a rule dimension that does not actually exist in the service, the option cannot work regardless of how logical it sounds.

#### Set up Amazon Bedrock application inference profiles for each department. Enable Amazon Bedrock model invocation logging to an Amazon S3 bucket for each profile. Configure an AWS Cost and Usage Report that has hourly granularity. Query the report data in Amazon Athena. Filter the data by the application inference profile resource ID to view the costs for each department.

A test-taker might pick this because it does achieve per-department cost visibility. The profiles provide the attribution, and querying CUR in Athena is technically valid. However, this approach requires setting up CUR delivery to S3, creating an Athena database and table, and writing SQL queries to extract the cost data. Those additional steps significantly increase operational overhead compared to option A, which achieves the same result using built-in Cost Explorer filters with no additional infrastructure. The pattern to notice: when "LEAST operational overhead" is in the stem, a solution that requires standing up additional services (Athena, CUR delivery) to do what a native feature already provides is over-engineered.

#### Purchase Amazon Bedrock Provisioned Throughput for each department. Configure cost allocation tags on each Provisioned Throughput resource. Use the cost allocation tag filters of AWS Cost Explorer to view the Provisioned Throughput costs for each department.

A test-taker might pick this because Provisioned Throughput resources can carry cost allocation tags, and the cost tracking would work. However, Provisioned Throughput requires allocating a fixed number of model units for each department. This adds operational overhead for capacity planning and rightsizing. Over-provisioning increases costs; under-provisioning results in throttled requests that require client-side retries, which the stem explicitly wants to avoid. On-demand inference via application inference profiles scales automatically with no capacity decisions. The pattern to notice: when a stem mentions reducing wait times AND least operational overhead, fixed-capacity commitments add planning burden and risk the very problem the stem wants solved.

---

## Question 2: Takeaways

That is all for this question. The reading pattern here rewards matching the cost attribution mechanism to the service's native capabilities. When Bedrock is already chosen and the stem asks for least operational overhead, the answer lives in Bedrock's own cost management features (application inference profiles with cost allocation tags) rather than external tooling or fixed-capacity purchases. Note any knowledge gap you spotted while working through it.

---

# Practice Assessment: Domain 3 (2 preguntas)

## Pregunta 1 de 2: Optimización de costos en procesamiento batch con SLA estricto y manejo de interrupciones

*Tarea: 3.4 — Optimización de costos en cómputo y tolerancia a fallos*

### Enunciado

A financial company runs a nightly batch processing application that analyzes market data by using a cluster of Amazon EC2 instances. The application maintains a processing state. The processing takes 4-6 hours to complete. The average processing time is 5 hours.

The company needs a cost-optimized solution. The processing must complete by 7 AM for the start of the stock trading day. The application must handle instance interruptions. The processing state must be stored externally rather than on the EC2 instances.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Configure an Amazon EC2 Auto Scaling mixed instances group. Use 20% On-Demand Instances as the base capacity and Spot Instances for the remaining 80% of capacity. Configure the application to store processing checkpoints in Amazon DynamoDB every 10 minutes. Resume processing from the last checkpoint if the instances are replaced.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Piso de cómputo garantizado frente a SLA:** Un grupo de Auto Scaling con instancias mixtas (*mixed instances group*) que garantiza un 20 % de capacidad base en instancias On-Demand asegura que el trabajo nunca se detenga completamente incluso ante revocaciones masivas de Spot, permitiendo avanzar de forma constante hacia el objetivo de las 7:00 AM.
    2. **Ahorro masivo con Spot (80 %):** Las instancias Spot proporcionan hasta un 90 % de descuento respecto a On-Demand para la mayor parte del procesamiento pesado.
    3. **Persistencia externa de checkpoints:** Guardar puntos de control en Amazon DynamoDB cada 10 minutos desacopla el estado de la instancia física, de modo que cualquier instancia Spot interrumpida puede retomar el trabajo perdiendo como máximo 10 minutos de cómputo en lugar de reiniciar el batch de 5 horas desde cero.
  - 📖 Más información: [Best Practices for Amazon EC2 Spot](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/spot-best-practices.html) y [Auto Scaling Groups with Multiple Instance Types and Purchase Options](https://docs.aws.amazon.com/autoscaling/ec2/userguide/asg-purchase-options.html)

- **B.** Create an EC2 Fleet that uses only Spot Instances and the capacity-optimized allocation strategy. Configure the application to store processing checkpoints in Amazon DynamoDB every 10 minutes. Resume processing from the last checkpoint when replacement instances launch.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Usar 100 % de instancias Spot maximiza el descuento teórico, pero carece de capacidad garantizada. Si se produce un reclamo de capacidad Spot simultáneo en los tipos de instancia seleccionados, el clúster puede quedarse sin capacidad suficiente y no llegar a terminar el procesamiento antes de la hora límite fija de las 7:00 AM.
  - 📖 Más información: [How EC2 Fleet Allocation Strategies Fulfill Spot Capacity](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-fleet-allocation-strategy.html)

- **C.** Migrate the workload to AWS Lambda functions that run in parallel. Configure each function to process a segment of the market data. Store the processing state in Amazon S3 every 10 minutes. Use AWS Step Functions to coordinate execution. Configure Step Functions to redistribute the incomplete data segments when the functions reach the maximum Lambda timeout.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** AWS Lambda tiene un tiempo límite de ejecución máximo de 15 minutos. Descomponer y reestructurar un proceso batch monolítico dependiente de estado de 5 horas en miles de micro-tareas de 15 minutos requiere una re-arquitectura profunda y compleja con sobrecarga operativa excesiva.
  - 📖 Más información: [How to Configure the Lambda Function Timeout](https://docs.aws.amazon.com/lambda/latest/dg/configuration-timeout.html)

- **D.** Purchase Reserved Instances that have a 3-year commitment for the full cluster capacity. Configure Amazon CloudWatch alarms on instance status checks that initiate EC2 automatic recovery. Store processing checkpoints on instance store volumes every 10 minutes.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:**
    1. Las instancias reservadas a 3 años para un proceso que solo corre entre 4 y 6 horas por noche implican pagar por capacidad ociosa durante ~18 horas al día.
    2. Los volúmenes **Instance Store** son efímeros; si una instancia se interrumpe, se detiene o falla el hardware, los datos almacenados en el instance store se destruyen permanentemente, violando el requisito de persistencia externa del estado.
  - 📖 Más información: [How Data Persists on EC2 Instance Store Volumes](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/instance-store-lifetime.html)

> [!important] Trampa de examen
> Para cargas batch críticas con **hora límite estricta (SLA)** y tolerancia a interrupciones:
> - **NUNCA uses 100 % Spot** si hay riesgo de violar el SLA por falta de capacidad disponible en el pool.
> - La solución óptima es **Mixed Instances Auto Scaling Group (Base On-Demand + % Spot)** combinada con **checkpoints en DynamoDB / S3**.
> - Recuerda que los **Instance Store volumes son efímeros** y pierden su información ante cualquier parada o interrupción de la instancia.

---

## Pregunta 2 de 2: Máximo ahorro de costos en backend: limitación de DynamoDB TTL y almacenamiento de archivo en S3

*Tarea: 3.4 — Optimización de costos en DynamoDB y S3 Lifecycle*

### Enunciado

A company is hosting a sleep-tracking application on AWS. The application sends data points that it collects to backend servers every 5 minutes. The application includes a string-based timestamp along with the collected data points. The backend application authenticates users and writes the data to an Amazon DynamoDB table.

Every morning, the company scans the DynamoDB table to extract and summarize the previous night's data on a per-user basis. The company stores the summarized results as objects in an Amazon S3 bucket. The company uses Amazon SNS message to notify users that new data is available.

Users do not have access the data after two weeks. The company needs to retain the summarized results for an extended period. However, the company rarely accesses the summarized results, and access does not need to be immediate. The company cannot modify the application at this time. The company must modify the backend system to reduce costs.

Which solution will provide the HIGHEST potential cost savings?

### Opciones de respuesta

- **A.** Create a new DynamoDB table each day. Delete the previous day's table after you transfer the new summarized data to Amazon S3. Implement an S3 Lifecycle configuration to move the summarized data to S3 Standard-Infrequent Access (S3 Standard-IA) after two weeks.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Esta opción reduce costos al eliminar la tabla de DynamoDB vieja diariamente, pero mover los resúmenes en S3 a Standard-IA no maximiza los ahorros. Dado que el enunciado aclara explícitamente que los resultados se consultan muy raramente y que **el acceso no necesita ser inmediato**, la clase **S3 Glacier Flexible Retrieval** ofrece un costo por GB/mes sustancialmente inferior a S3 Standard-IA.
  - 📖 Más información: [Using Amazon S3 Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html) y [Managing Your Storage Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html)

- **B.** Create a new DynamoDB table each day. Delete the previous day's table after you transfer the new summarized data to Amazon S3. Implement an S3 Lifecycle configuration to move the summarized data to S3 Glacier Flexible Retrieval after 2 weeks.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:**
    1. **Eliminación masiva de datos en DynamoDB sin tocar la app:** La aplicación envía un **timestamp de tipo String** y la empresa **no puede modificar la aplicación en este momento**. Dado que DynamoDB TTL exige que el atributo de expiración sea de tipo **Number** (en segundos Unix Epoch), **no es posible activar TTL**. La única técnica backend sin código para purgar millones de items sin pagar lecturas/escrituras masivas ni acumular almacenamiento es crear una tabla diaria y eliminar la tabla anterior (*DeleteTable*) una vez procesado el resumen.
    2. **Mayor ahorro en S3 para acceso no inmediato:** S3 Glacier Flexible Retrieval cuesta una fracción (~\$0.0036/GB) comparado con Standard-IA (~\$0.0125/GB). Dado que el acceso no requiere inmediatez, Glacier Flexible Retrieval proporciona el **máximo ahorro potencial (HIGHEST potential cost savings)**.
  - 📖 Más información: [Using Amazon S3 Storage Classes](https://docs.aws.amazon.com/AmazonS3/latest/userguide/storage-class-intro.html), [Managing Your Storage Lifecycle](https://docs.aws.amazon.com/AmazonS3/latest/userguide/object-lifecycle-mgmt.html) y [Basic Operations on DynamoDB Tables](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/WorkingWithTables.Basics.html)

- **C.** Configure DynamoDB TTL based on the timestamp in the collected data points to automatically delete the item after 24 hours. Implement an S3 Lifecycle configuration to move the summarized data to S3 Glacier Flexible Retrieval after 2 weeks.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** DynamoDB TTL **requiere de forma obligatoria que el timestamp sea un atributo de tipo numérico (`Number`) en formato Unix Epoch time**. Como el timestamp actual es de tipo `String` y la empresa **no puede modificar la aplicación**, no es posible habilitar TTL en DynamoDB.
  - 📖 Más información: [Expiring Items by Using DynamoDB Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html) y [Using DynamoDB Time to Live (TTL) Before You Start](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/time-to-live-ttl-before-you-start.html)

- **D.** Configure DynamoDB TTL based on the timestamp in the collected data points to automatically delete the item after 24 hours. Implement an S3 Lifecycle configuration to move the summarized data to S3 Standard-Infrequent Access (S3 Standard-IA) after 2 weeks.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Falla en ambos frentes:
    1. DynamoDB TTL no puede activarse sobre un campo `String` sin modificar la aplicación cliente para enviar formato numérico epoch.
    2. S3 Standard-IA es más caro que Glacier Flexible Retrieval y el enunciado especifica que el acceso no necesita ser inmediato.
  - 📖 Más información: [Expiring Items by Using DynamoDB Time to Live (TTL)](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/TTL.html)

> [!important] Trampa clásica del examen
> 1. **DynamoDB TTL:** Requiere obligatoriamente un atributo de tipo **`Number` con formato Unix Epoch time (en segundos)**. Si los datos llegan en formato `String` (e.g. ISO 8601 o texto legible) y la aplicación **no se puede modificar**, **TTL NO se puede usar**. En ese escenario, el patrón de diseño recomendado es la **rotación diaria de tablas (crear tabla por día y llamar `DeleteTable`)**.
> 2. **S3 Tiering para costos:** Si el acceso es infrecuente pero **NO requiere inmediatez** (como auditoría o retención extendida), la clase más económica es **S3 Glacier Flexible Retrieval** (o Glacier Deep Archive), no S3 Standard-IA.

---

_Fuente: [Skill Builder - Domain 3 Practice (SAP-C03)](https://skillbuilder.aws/renderer/?module_id=Z3P8Z5Z979%3A001.000.000&product_id=YQBP2CA22N%3A001.000.000&registration_id=1f3713e9-44bc-552e-883a-41482124f007&referrer=https%3A%2F%2Fskillbuilder.aws%2Flearn%2FMN2JMQRPWD%2Fdomain-3-practice-aws-certified-solutions-architect--professional-sapc03--english%2FYQBP2CA22N&navigation=digital_)
