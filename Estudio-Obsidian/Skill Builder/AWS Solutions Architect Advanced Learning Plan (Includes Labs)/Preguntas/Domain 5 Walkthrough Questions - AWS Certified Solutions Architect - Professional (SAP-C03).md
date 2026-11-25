---
title: "Domain 5 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)"
aliases:
  - "Domain 5 Walkthrough Questions"
  - "Walkthrough D5"
  - "Preguntas Walkthrough D5"
tags:
  - certificacion/aws
  - sap-c03
  - skill-builder
  - preguntas
  - walkthrough
  - dominio-5
status: activo
fuente: "https://skillbuilder.aws/learn/34FVT2D7MD/domain-5-practice-aws-certified-solutions-architect--professional-sapc03--english/H8R28VGFFM"
---

# Domain 5 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **preguntas guiadas (Walkthrough)** y **evaluaciones prácticas (Practice Assessment)** del **Dominio 5** para la certificación AWS Certified Solutions Architect - Professional (SAP-C03).
> Diseñado para analizar escenarios de DevSecOps, pipelines de despliegue automatizado seguro (Canary con AWS CodeDeploy), observabilidad multi-cuenta a escala con SLOs y error budgets (CloudWatch Application Signals), controles preventivos en IaC (CloudFormation Hooks), detección y remediación automática de drift en StackSets, y pipelines de build de AMIs inmutables aislados de Internet.

> [!info] Metodología Walkthrough
> 1. **Lectura dirigida:** Identificar primero la pregunta final (criterio clave: *menor sobrecarga operativa*, *despliegue automatizado y progresivo*, *remediación automática en < 1 hora*, *sin cruzar Internet*, *MOST cost-effectively*).
> 2. **Extracción de señales y restricciones:** Desglosar alcances multi-cuenta (>200 cuentas, 80 cuentas), excepciones por etiquetas (`Exception:Approved`, `change-control:approved`), dependencias aisladas de red y cálculo nativo de telemetría vs pipelines custom.
> 3. **Eliminación sistemática:** Descartar opciones inviables (SCPs para validar configuraciones internas detalladas, NAT Gateways cuando se prohíbe salir a Internet, o revisiones manuales cuando se exige cero intervención).
> 4. **Validación:** Confirmar la mejor opción frente a los servicios recomendados y las mejores prácticas del Well-Architected Framework.

---

## 📊 Registro de intentos

| # | Fecha | Evaluación / Sección | Aciertos | % | Estado | Tareas flojas / Motivo del error |
| - | ----- | -------------------- | -------- | - | ------ | -------------------------------- |
| 1 | 2026-11-20 | Walkthrough Questions (Q1-Q2) | 2/2 | 100 % | 🟢 | Q1: CodeDeploy Canary deployment con rollback automático / Q2: AWS Systems Manager Run Command sobre HTTPS (puerto 443) para cambios a nivel de SO en toda la flota sin abrir puerto 22 SSH |
| 2 | 2026-11-20 | Practice Assessment (4 preguntas) | 3/4 | 75 % | 🟢 | **Aciertos:** P1 (CloudWatch Cross-Account Observability + Application Signals SLOs + Multi-window burn rate composite alarms), P2 (CloudFormation Hooks + AWS Config tag-based selection + SSM Automation), P4 (StackSets drift detection + EventBridge + Lambda Change Sets condicionales para proteger cambios aprobados). **Falla en P3:** Infraestructura inmutable (una sola AMI para Dev/Test/Prod) y acceso a dependencias sin Internet (VPC Gateway Endpoint para S3 [repos yum Amazon Linux] + CodeCommit con Interface Endpoint PrivateLink). |

---

## ✅ Cobertura por tarea (Dominio 5)

| Tarea | Descripción | Preguntas vistas | Estado |
| ----- | ----------- | ---------------- | ------ |
| **5.1** | Design automated testing and artifact pipelines | 1 (P3: AMI build pipeline sin Internet) | 🟠 a reforzar |
| **5.2** | Design CI/CD and DevSecOps pipelines | 1 (Q1: CodeDeploy Canary + Rollback) | 🟡 vista |
| **5.3** | Implement security controls and governance in pipelines | 2 (P2: CFN Hooks + P4: StackSets Drift) | 🟢 dominado |
| **5.4** | Design operational automation and resilient systems | 2 (Q2: SSM Run Command / P1: CloudWatch SLOs) | 🟢 dominado |

*Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.*

---

# Walkthrough Questions

## Question 1: Walkthrough

This walkthrough question is from task statement 5.2: Design CI/CD and DevSecOps pipelines. The question reads:

"A company runs applications on Amazon EC2 instances. The company currently deploys the applications manually, but the company requires an automated solution. To avoid faulty deployments that affect all customers, the company wants to evaluate production deployments before it makes the applications widely available. The company requires the capability to move traffic back to the previous version of the application if the new deployment does not meet certain criteria. Which solution will meet these requirements?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: Requires an automated solution

The current process is manual and must become automated. This points to a deployment service that runs the release for you. CodeDeploy automates deployments; CodeBuild only builds and tests, and CodeGuru only reviews and profiles code.

#### 2: Evaluate production deployments before it makes the applications widely available

"Evaluate before widely available" means a subset of users sees the new version first, with a chance to check it before everyone switches. That is a canary deployment, which shifts traffic in two increments. It rules out an all-at-once type.

#### 3: Move traffic back to the previous version of the application if the new deployment does not meet certain criteria

The solution must shift traffic back to the previous version if the new one fails the defined criteria. This is rollback. CodeDeploy provides it, returning traffic to the prior version rather than staying on a faulty release.

---

## Question 1: Examine the answers

You identified manual deployments that need automation, a request to evaluate a production deployment before it reaches all customers, and the ability to shift traffic back to the previous version if the new one fails. Each one narrows what the answer can be. Hold your reasoning, then watch the walkthrough below.

#### Transcript

All right, this question is about deploying safely to production. So I want to walk through what the STEM is telling us and why option D wins in this case. Well, the first signal requires an automated solution that eliminates manual processes, but more importantly, it tells us the answer must be a deployment service, not a build service, not a code review tool, something that actually deploys, which immediately handles two distractors. CodeBuild compiles and tests code. It produces artifacts. It does not deploy them. And code guru provides code quality recommendations. Neither one puts code onto EC2 instances, right? So we're down to CodeDeploy. And so the question is which deployment type. The stem says evaluate production deployments before making them widely available. That's a staged rollout. A small group first, validate, then everyone else. -- That's exactly what a canary deployment -- does. A canary shifts traffic in two increments. First, a small percentage goes to the new version, and then after a configured interval, the rest follows. If something goes wrong during that first window, you roll back before the majority of users are affected. Yep, and the stem explicitly requires the ability to move traffic back to the previous version if criteria are not met. CodeDeploy supports automatic rollback triggered by cloud watch alarms during the canary window. So option B, all at once is the opposite of what the stem asks for. All traffic moves immediately. No evaluation window, no staged rollout, no chance to catch a problem before everybody sees it. Exactly. So here's the pattern to carry forward. When a stem describes staged evaluation plus rollback, that's canary. When it says all at once or simultaneously, that's all at once. And when the Stem asks for a deployment solution, confirm the service actually deploys, not just builds or analyzes. So 3 checks you can make. Does it deploy? Is the rollout staged? Can it roll back? If all 3 are yes, you've got your answer.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem?

#### Use AWS CodeBuild to deploy the application. Use a canary deployment type.

This option pairs the right deployment type with the wrong service. A canary deployment does shift traffic gradually so a small group sees the new version first, which fits the stem. But CodeBuild is a continuous integration service: it compiles source code, runs tests, and produces packages that are ready to deploy. It does not deploy the application or shift production traffic, so it cannot provide the canary rollout or the rollback the stem asks for. The pattern to notice: a correct-sounding deployment type does not rescue a service that does not perform deployments.

#### Use AWS CodeDeploy to deploy the application. Use an all-at-once deployment type.

CodeDeploy is the right service, but the deployment type defeats the requirement. An all-at-once deployment shifts all traffic from the old version to the new version in a single step. There is no early subset of users and no window to evaluate the new version before everyone is on it, so a faulty deployment reaches all customers immediately. That is the exact outcome the stem wants to avoid. The pattern to notice: "evaluate before making it widely available" rules out any type that moves all traffic at once.

#### Use Amazon CodeGuru to deploy the application. Use a linear deployment type.

CodeGuru is not a deployment service. It is a developer tool that reviews code for quality issues and profiles application performance to find expensive or inefficient code. It has no ability to deploy an application or shift production traffic, so the linear deployment type has nothing to act on here. The pattern to notice: match the service to the job first. CodeGuru inspects code, it does not ship it.

#### Use AWS CodeDeploy to deploy the application. Use a canary deployment type.

This pairs the deployment service with the deployment type that fits every requirement. CodeDeploy automates the deployment, which replaces the manual process. A canary type shifts traffic in two increments: a defined percentage goes to the new version first, then the rest follows after a set interval. That first increment is the chance to evaluate the new version on a small share of production traffic before it reaches all customers. CodeDeploy can also roll back, shifting traffic to the previous version if the deployment does not meet the defined criteria. The pattern to notice: when the stem asks to automate deployment, expose a new version to a subset of users first, and roll back on failure, CodeDeploy with a canary type covers all three.

---

## Question 1: Takeaways

That is all for this question. The reading pattern it rewards: read the service and the deployment type as a pair, and check the service first. Deployment and traffic shifting are the job of CodeDeploy, not CodeBuild (continuous integration) or CodeGuru (code review and profiling). Once the service is right, a canary type is what exposes the new version to a subset of users before everyone, with rollback if it fails. All-at-once moves everyone at once, so it cannot evaluate before wide release. Note any knowledge gap you spotted while working through it.

---

## Question 2: Walkthrough

This walkthrough question is from task statement 5.4: Design operational automation and resilient systems. The question reads:

"A company runs containers on a large Amazon ECS cluster. The cluster consists of identical Amazon EC2 instances. The company has configured the associated security group to allow only HTTPS traffic inbound on Port 443 because of a strict internal company regulation. The company's security team needs the ability to make critical operating system changes across all the instances. Which solution would provide the required access with the LEAST ongoing operational overhead?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: Configured the associated security group to allow only HTTPS traffic inbound on Port 443 because of a strict internal company regulation

The security group is locked to port 443 only, and this is a regulatory requirement, not a preference. Any solution that opens SSH (port 22) violates it. Systems Manager communicates over HTTPS (port 443), so it works within the rule.

#### 2: Make critical operating system changes across all the instances

Two requirements in one phrase: OS-level changes (not application-level) and "across all" (not one at a time). This points to a fleet-wide execution tool. Session Manager is per-instance; Run Command targets many instances in one operation.

#### 3: Least ongoing operational overhead

"Least ongoing operational overhead" means no repeated manual steps each time access is needed. Temporarily opening ports or connecting instance by instance adds overhead every time. A persistent IAM role plus the SSM Agent is configured once and reused.

---

## Question 2: Examine the answers

You identified a security group that allows only HTTPS on port 443, a need to make OS-level changes across all instances, and least ongoing operational overhead. Each one narrows what the answer can be. Hold your reasoning, then watch the walkthrough below.

#### Transcript

OK, this question has a constraint that eliminates options right off the bat, so let's find them. A company runs containers on a large Amazon ECS cluster. The cluster consists of identical Amazon EC-2 instances. The company has configured the associated security group to allow only HTTPS traffic inbound on Port 443 because of a strict internal company regulation. The company's security team needs the ability to make critical operating system changes across all the instances. So Joe. Which solution would provide the required access with the LEAST ongoing operational overhead? Configured the associated Security Group to allow only HTTPS traffic inbound on Port 443 because of a strict internal company regulation. So that's big for me. Port 443 only, not a preference, a regulation. So any solution that requires opening SSH on port 22 is not just inconvenient, it violates a company regulation. Yes, and also this signal make critical operating system changes across all the instances. So there's two parts to that OS level changes and across all, not one at a time, the whole fleet. And also the qualifier here, least ongoing operational overhead. Whatever we pick, it shouldn't require repeated manual steps every time the team needs access. So let's test the options. Option A temporarily opens port 22. The team SSH is in, and then someone closes port 22 again. Well, that violates the regulation directly. And even if you set that aside, think about the operational pattern. Every. Time the security team needs to make changes, someone opens the port, waits, closes it, verifies it's closed. That cycle repeats indefinitely. There's a high ongoing overhead and it breaks the rule. Option B adds a network ACL rule to allow port 22 at the subnet level, then removes it afterward. And here's the fundamental problem Network ACLs and security groups evaluate independently. The network ACL might allow port 22 into the subnet, but the security group on instance is still going to block it. The traffic never reaches the instance, so this option doesn't even work technically before you get to the operational overhead question, right now, Option C installs the SSM agent and uses session Manager. Session Manager gives you a shell session to an instance over HTTPS. No inbound port needed. That solves the port problem, but the stem says across all the instances. Session Manager connects to one instance at a time. For a large ECS cluster, the security team would need to open a session to each instance individually and repeat the same changes. Yeah, that's no good. The operational overhead scales linearly with the fleet size, so every new instance is another manual session, which brings us to option D. install the SSM agent and use RCommand. Well, -- Run -- Command sends a document, which is essentially a script to multiple instances in a single operation. You target by tag or by instance ID or by resource group. That's one action, and it hits the whole fleet. And it communicates through the SSM agent over HTTPS port 443. The security group stays exactly as it is. No temporary changes, no cleanup, and no regulatory violations, and the setup is one time install the agent and configure the IAM role. After that, the security team runs commands whenever they need to with no infrastructure changes, so it satisfies the port constraint. It handles the fleetwide requirement in one action, and the ongoing overhead is minimal because nothing changes between uses. Exactly. So here's the takeaway. When you see lockdown inbound ports, plus fleetwide OS operations, plus least ongoing overhead, that combination is Systems Manager run command. Session Manager is for single instance interactive access. Run command is for fleet scale automation. Same agent, same HTTPS channel, but a different scope. Match the scope to the tool.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem?

#### Temporarily update the security group to allow inbound SSH access on Port 22. Ask the security team to connect to the instances to apply the changes. Update the security group to remove the SSH access after the security team applies the changes.

Opening port 22 temporarily works as a one-time workaround, but it violates the company's strict regulation that allows only HTTPS on port 443. Each time the security team needs access, someone must modify the security group, wait for the work to complete, then revert the change. This is a manual, error-prone process that repeats every time changes are needed. The pattern to notice: "strict internal company regulation" plus "LEAST ongoing operational overhead" means the solution should not require modifying security group rules each time.

#### Create network access control list (network ACL) rules in the subnets to allow SSH access on Port 22. Ask the security team to connect to the instances to apply the changes. Remove the network ACL rules after the security team applies the changes.

Network ACLs are stateless and operate at the subnet level. Adding an allow rule in the network ACL does not override the security group's deny. Security groups are stateful and evaluate independently: if the security group only allows port 443, SSH traffic on port 22 is still blocked at the instance level regardless of what the network ACL permits. Beyond the technical failure, this approach has the same ongoing overhead as the SSH option: manual rule changes every time. The pattern to notice: network ACLs and security groups evaluate independently. Allowing traffic in a network ACL does not bypass a security group restriction.

#### Configure an AWS Systems Manager Agent (SSM Agent) on the EC2 instances. Configure an IAM role to allow the security team to use Session Manager, a capability of AWS Systems Manager, to connect to the instances.

Session Manager provides shell access without opening inbound ports, which respects the port-443-only security group. However, the stem asks the security team to make changes "across all the instances." Session Manager connects to one instance at a time, meaning the team would need to repeat the operation on each instance individually. For a large ECS cluster, this is operationally heavy compared to a single command that targets the entire fleet. The pattern to notice: Session Manager solves the port problem, but "across all instances" plus "LEAST ongoing operational overhead" points toward a fleet-wide execution tool, not a per-instance shell.

#### Configure an AWS Systems Manager Agent (SSM Agent) on the EC2 instances. Configure an IAM role to allow the security team to use an AWS Systems Manager Run Command to apply the changes to the instances.

Run Command sends a command to multiple instances in a single operation. It uses the SSM Agent, which communicates over HTTPS (port 443), so no additional inbound ports are needed. The security group stays unchanged, satisfying the regulation. The IAM role is configured once, and from that point forward the security team can run commands across the entire fleet with a single action. No security group modifications, no per-instance connections, no cleanup afterward. The pattern to notice: Run Command is the fleet-wide execution path through Systems Manager. It respects the existing network constraints (HTTPS only) and eliminates repetitive manual steps, which is why it has the least ongoing operational overhead.

---

## Question 2: Takeaways

That is all for this question. The reading pattern it rewards: when the stem locks down inbound ports and asks for fleet-wide OS changes with minimal overhead, look for Systems Manager Run Command. It communicates over HTTPS (no port changes), targets multiple instances in one operation (no per-instance repetition), and requires only an IAM role and the SSM Agent (no infrastructure to build or tear down). Note any knowledge gap you spotted while working through it.

---

# Practice Assessment: Domain 5 (4 preguntas)

## Pregunta 1 de 4: Observabilidad cross-account para microservicios con SLOs y error budget burn rates

*Tarea: 5.4 — Automatización de operaciones, telemetría unificada y resiliencia*

### Enunciado

A company operates more than 200 AWS accounts in an organization in AWS Organizations. The company runs microservices on Amazon EKS clusters and AWS Lambda functions across the us-east-1 and eu-west-1 Regions. Each microservice has SLOs. Each SLO has an error budget that represents an allowable margin of failure. The error budget is consumed by microservice errors.

The company must provide a unified view of the SLOs, metrics, logs, and traces across every account and AWS Region. SLO metrics must be calculated automatically from live production traffic to the microservices. The company must be alerted when error budget burn rates indicate an upcoming SLO violation. The company must minimize operational overhead and must not build custom telemetry pipelines.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Configure Amazon CloudWatch cross-account observability by designating a central account as the monitoring account and every member account as a source account. Enable CloudWatch Application Signals on the EKS clusters and Lambda functions. Define SLOs in Application Signals. Create multi-window burn rate composite alarms on the burn rate metrics.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Observabilidad multi-cuenta unificada:** **CloudWatch cross-account observability** permite que una cuenta de monitoreo centralizada agregue métricas, grupos de logs y trazas de AWS X-Ray procedentes de cientos de cuentas de origen en una sola consola unificada.
    2. **Cálculo automático de SLOs sin telemetría custom:** Al habilitar **CloudWatch Application Signals**, se auto-instrumentan las cargas de trabajo en Amazon EKS y AWS Lambda, descubriendo servicios automáticamente y calculando métricas de latencia y disponibilidad de SLO a partir del tráfico real de producción sin requerir pipelines de telemetría personalizados.
    3. **Alertas de consumo de error budget:** Las **alarmas compuestas de tasa de consumo en múltiples ventanas (multi-window burn rate composite alarms)** son el patrón recomendado por AWS (y por la disciplina SRE) para alertar sobre presupuestos de error de SLO, y Application Signals expone métricas nativas de burn rate para configurarlas directamente.
  - 📖 Más información: [CloudWatch Cross-Account Observability](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Unified-Cross-Account.html), [Composite Alarms](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/alarm-combining.html) y [Service Level Objectives (SLOs) in CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html)

- **B.** Stream Amazon CloudWatch metrics, logs, and AWS X-Ray traces from each account through Amazon Data Firehose to a centralized Amazon OpenSearch Service domain. Create OpenSearch Service dashboards that calculate the SLO metrics from the data in the OpenSearch Service domain. Use OpenSearch Service alerting to notify the company when the microservice error rates exceed configured thresholds.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Transmitir métricas, logs y trazas a OpenSearch a través de Firehose requiere construir y mantener un pipeline completo de telemetría personalizado (delivery streams, gestión de ciclo de vida de índices, queries complejas en dashboards para derivar SLOs). Además, las alertas sobre tasas de error instantáneas en OpenSearch no equivalen al modelo matemático de alertas por *burn rate* sobre presupuestos de error.
  - 📖 Más información: [How to Use OpenSearch Service Alerting](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/alerting.html) y [OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)

- **C.** Deploy an Amazon Managed Service for Prometheus workspace and an Amazon Managed Grafana workspace in each Region. Install the AWS Distro for OpenTelemetry collector in every account to forward metrics, logs, and traces to a centralized Amazon S3 bucket. Build an AWS Step Functions workflow to calculate the SLO metrics from the data in the S3 bucket. Publish the burn rate metrics to Amazon CloudWatch.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Construir y mantener flujos de Step Functions para calcular métricas de SLO a partir de datos volcados en S3 constituye un pipeline de telemetría custom complejo, el cual fue prohibido explícitamente en el enunciado (*"must not build custom telemetry pipelines"*).
  - 📖 Más información: [CloudWatch Application Signals SLOs](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-ServiceLevelObjectives.html) y [Amazon Managed Service for Prometheus](https://docs.aws.amazon.com/prometheus/latest/userguide/what-is-Amazon-Managed-Service-Prometheus.html)

- **D.** Enable Amazon CloudWatch Logs subscription filters in every account to forward CloudWatch log groups to a central account. Use CloudWatch Contributor Insights to identify the top contributors to the microservice errors. Define SLO calculations as CloudWatch metric math expressions in a central account. Create standard CloudWatch alarms on the metric math results.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los *subscription filters* reenvían únicamente logs; no proporcionan acceso multi-cuenta integrado a métricas de CloudWatch ni a trazas de X-Ray. Además, escribir y mantener fórmulas de Metric Math para cada servicio en cada cuenta implica monitoreo artesanal y no escalable frente a la solución gestionada de Application Signals.
  - 📖 Más información: [Log Group-Level Subscription Filters](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/SubscriptionFilters.html)

> [!important] Trampa de examen
> Cuando veas: **SLOs, presupuestos de error (error budgets), multi-window burn rate alerting y observabilidad unificada (métricas, logs, trazas) en cientos de cuentas SIN construir pipelines personalizados**: la respuesta de AWS es **CloudWatch Cross-Account Observability + CloudWatch Application Signals**.

---

## Pregunta 2 de 4: Controles preventivos en CloudFormation y detección con exclusión de tags

*Tarea: 5.3 — Gobernanza, controles de seguridad y DevSecOps en IaC*

### Enunciado

A company operates workloads in 80 accounts across Production and Development OUs. The company manages the accounts by using AWS Organizations. A recent security audit identified Amazon S3 buckets that have public access, unencrypted Amazon RDS instances, and security groups allowing 0.0.0.0/0 SSH access. The company routinely redeploys noncompliant AWS CloudFormation stacks after manual remediation of any noncompliant resources.

The company requires a solution that fails the deployment of noncompliant CloudFormation resources and detects existing noncompliant resources. The resources that include the Exception:Approved tag must bypass enforcement and remediation.

Which solution will meet these requirements MOST cost-effectively?

### Opciones de respuesta

- **A.** Deploy CloudFormation hooks across the organization by using a stack set that validates Amazon S3, Amazon RDS, and security group configurations during stack operations. Configure the hooks to skip validation when the resource has the Exception:Approved tag. Create AWS Config rules that use continuous evaluation by using tag-based resource selection that excludes the resources that have the Exception:Approved tag. Configure AWS Systems Manager Automation documents as automatic remediation actions that include tag condition checks.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Controles preventivos a nivel de IaC:** Los **CloudFormation Hooks** desplegados mediante StackSets interceptan las operaciones de stack (`CREATE`, `UPDATE`, `DELETE`) antes del aprovisionamiento físico; si los recursos no cumplen las reglas de cifrado o reglas de SG, fallan el despliegue proactivamente. El hook evalúa las propiedades y omite la validación si detecta la etiqueta `Exception:Approved`.
    2. **Detección continua con bypass nativo:** **AWS Config Rules** con evaluación continua detecta cualquier recurso preexistente que no cumpla. La funcionalidad nativa de **selección de recursos basada en tags (tag-based resource selection)** de AWS Config permite excluir los recursos etiquetados con `Exception:Approved` sin costo adicional ni código custom.
    3. **Remediación automática:** Los documentos de **AWS Systems Manager Automation** ejecutan la remediación automática sobre los recursos no conformes que no tengan la etiqueta de excepción.
  - 📖 Más información: [How to Use Schema Syntax to Develop CloudFormation Hooks](https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-schema.html), [AWS Config Tag-Based Resource Selection](https://docs.aws.amazon.com/config/latest/developerguide/resource-config-reference.html) y [Systems Manager Automation](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-automation.html)

- **B.** Activate CloudFormation Hooks that use the FAIL mode for Amazon S3, Amazon RDS, and security group validation during stack operations. Enable AWS Config rules that use continuous evaluation and automatic remediation. Use AWS Lambda functions that are invoked by Amazon EventBridge to read tag values and bypass remediation for resources that have the Exception:Approved tag.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los Hooks en modo FAIL sin lógica de omisión bloquean todos los recursos no conformes e impiden el despliegue incluso si contienen la etiqueta de excepción `Exception:Approved`. Además, construir funciones Lambda en EventBridge para verificar tags añade código personalizado y costos de mantenimiento innecesarios cuando AWS Config ya ofrece filtrado nativo por etiquetas.
  - 📖 Más información: [How to Use Schema Syntax to Develop CloudFormation Hooks](https://docs.aws.amazon.com/cloudformation-cli/latest/hooks-userguide/hooks-schema.html)

- **C.** Enable preventive controls in AWS Control Tower for Amazon S3, Amazon RDS, and security group configurations across all accounts. Enable AWS Control Tower detective controls that integrate with AWS Config for existing resource monitoring. Configure AWS Lambda functions that are invoked by AWS Control Tower lifecycle events to implement Exception:Approved tag-based exclusions. Use AWS Systems Manager Automation runbooks that require manual approval steps for remediation. Monitor compliance through the AWS Control Tower dashboard.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los controles preventivos de Control Tower son directrices estándar preempaquetadas de alto nivel (basadas en SCPs) y no permiten validar configuraciones técnicas minuciosas como patrones específicos de reglas de Security Groups o algoritmos de cifrado. Además, las aprobaciones manuales introducen sobrecarga y lentitud operativa.
  - 📖 Más información: [Controls in AWS Control Tower](https://docs.aws.amazon.com/controltower/latest/userguide/controls.html)

- **D.** Configure SCPs at the OU level to prevent the deployment of noncompliant S3 buckets, RDS DB instances, and security groups. Create AWS Config rules that use continuous evaluation for compliance monitoring across all accounts. Configure AWS Systems Manager Automation documents to automatically remediate detected violations. Deploy an AWS Config aggregator in a delegated administrator account for centralized compliance reporting.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Las **Service Control Policies (SCPs) no pueden validar las propiedades internas de configuración de un recurso** (como los bloques CIDR dentro de una regla de Security Group o los parámetros detallados de cifrado de RDS). Las SCPs autorizan o deniegan llamadas a APIs a nivel general, pero no inspeccionan la plantilla de CloudFormation antes de crear los recursos.
  - 📖 Más información: [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

> [!important] Trampa de examen
> - **Prevenir despliegues no conformes en CloudFormation inspeccionando propiedades detalladas (ej. CIDR 0.0.0.0/0 en SSH o cifrado RDS):** Usa **CloudFormation Hooks**. Las SCPs NO pueden validar configuraciones internas detalladas de recursos.
> - **Excluir recursos etiquetados de auditorías de AWS Config:** Usa **Tag-based resource selection** nativo de AWS Config (sin necesidad de programar funciones Lambda).

---

## Pregunta 3 de 4: Pipeline de construcción de AMIs inmutables sin cruzar Internet

*Tarea: 5.1 — Pipelines de empaquetado de artefactos y despliegues inmutables*

### Enunciado

A company is running an application on Amazon EC2 instances. The EC2 instances use Amazon Linux across development, testing, and production environments. The company uses AMIs to deploy the EC2 instances. The company builds the AMIs in a private subnet that has no internet access. The company uses custom deployment scripts and infrastructure orchestration tools to run a build process for each application release in each environment. The build process pulls the application's source code from a third-party Git hosting service and downloads operating system packages from Amazon Linux repositories. Builds frequently fail because the build environment cannot reach external resources. The company has also found that building a separate AMI for each environment introduces configuration inconsistencies.

The company needs to ensure reliable access to all build dependencies without traversing the internet. Additionally, the company needs consistent deployments across all environments.

Which combination of steps will meet these requirements? (Select THREE.)

### Opciones de respuesta

- **A.** Produce one EC2 AMI for each application release in a single build pipeline. Use the same AMI across the development, testing, and production environments.
  - ✅ **Respuesta correcta (Paso 1/3)**
  - **Por qué es correcto:** Siguiendo la buena práctica de **Infraestructura Inmutable**, se debe generar una **única AMI idéntica e inmutable** por release en un solo pipeline y promover esa misma imagen a través de los entornos de Development, Testing y Production. Esto garantiza que lo probado en testing sea exactamente lo que corre en producción, eliminando las discrepancias de configuración (*configuration drift*). La configuración específica de cada entorno se inyecta en tiempo de lanzamiento (launch time) mediante User Data o Parameter Store, no horneándola en AMIs separadas.
  - 📖 Más información: [How AMIs Support Consistent EC2 Instance Launches](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/AMIs.html) y [Manage Image Build Pipelines with EC2 Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-pipelines.html)

- **B.** Continue producing a separate EC2 AMI for each environment in each application release. Manually reconcile the differences between the development, testing, and production AMIs before each deployment.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Continuar compilando una AMI separada para cada entorno perpetúa las inconsistencias que la empresa busca erradicar. La reconciliación manual es propensa a fallos humanos e ineficiente.
  - 📖 Más información: [Cross-Account AMI Distribution with Image Builder](https://docs.aws.amazon.com/imagebuilder/latest/userguide/cross-account-dist.html)

- **C.** Create an EC2 Image Builder pipeline to replace the custom scripts and tools. Run the pipeline in a public subnet so that the pipeline can reach the third-party Git service and Amazon Linux repositories over the internet.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Colocar el pipeline en una subred pública y salir a Internet contradice directamente el requerimiento estricto de **no atravesar Internet** (*"without traversing the internet"*).
  - 📖 Más información: [Configure EC2 Image Builder with VPC Infrastructure](https://docs.aws.amazon.com/imagebuilder/latest/userguide/manage-infra-config.html)

- **D.** Create a VPC gateway endpoint for Amazon S3. Configure an endpoint policy to allow access to the Amazon Linux package repository buckets.
  - ✅ **Respuesta correcta (Paso 2/3)**
  - **Por qué es correcto:** Los repositorios de paquetes `yum` de Amazon Linux están alojados en **buckets de Amazon S3**. Configurar un **VPC Gateway Endpoint para Amazon S3** permite a las instancias en la subred privada descargar los paquetes del sistema operativo de manera completamente privada y gratuita a través de la red troncal de AWS, **sin salir a Internet**. Se puede asegurar con una política de endpoint que restrinja el acceso únicamente a los buckets de repositorios oficiales.
  - 📖 Más información: [Gateway Endpoints for Amazon S3](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-s3.html) y [Control Access with S3 Endpoint Policies](https://docs.aws.amazon.com/vpc/latest/privatelink/vpc-endpoints-access.html)

- **E.** Mirror the application source code to an AWS CodeCommit repository. Configure an interface VPC endpoint for CodeCommit to allow the build process to pull the application source code without traversing the internet.
  - ✅ **Respuesta correcta (Paso 3/3)**
  - **Por qué es correcto:** Para eliminar la dependencia del servicio Git de terceros externo a través de Internet, se espeja el repositorio en **AWS CodeCommit**. Al aprovisionar un **Interface VPC Endpoint (AWS PrivateLink)** para CodeCommit en la VPC privada, el proceso de construcción clona el código fuente de forma privada a través de interfaces de red elásticas (ENIs) locales, cumpliendo el requisito de cero tráfico por Internet.
  - 📖 Más información: [CodeCommit with Interface VPC Endpoints](https://docs.aws.amazon.com/codecommit/latest/userguide/codecommit-and-interface-VPC.html) y [AWS Services that Integrate with AWS PrivateLink](https://docs.aws.amazon.com/vpc/latest/privatelink/aws-services-privatelink-support.html)

- **F.** Configure a NAT gateway in the private subnet to allow the build process to reach external package repositories and Git services over the internet.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Un NAT Gateway envía el tráfico saliente hacia Internet público, violando la regla mandatoria de no cruzar Internet y dejando el proceso sujeto a caídas de servicios externos.
  - 📖 Más información: [How NAT Gateways Provide Internet Access](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-nat-gateway.html)

> [!important] Trampa de examen
> 1. **Infraestructura Inmutable:** Se compila **una sola AMI por release** y esa misma AMI se promueve por Dev, Test y Prod. Nunca generes AMIs distintas por entorno.
> 2. **Instancias privadas sin Internet que necesitan paquetes Amazon Linux (`yum`):** Los repositorios de Amazon Linux están en **Amazon S3**; se resuelven con un **VPC Gateway Endpoint para S3**.
> 3. **Acceso a código Git sin salir a Internet:** Espejar en **AWS CodeCommit** y conectar vía **Interface VPC Endpoint (PrivateLink)**.
> 4. Si el enunciado dice *"without traversing the internet"*, **descalifica inmediatamente cualquier opción con NAT Gateway o subred pública**.

---

## Pregunta 4 de 4: Remediación automatizada de drift en StackSets protegiendo cambios aprobados

*Tarea: 5.3 — Automatización de cumplimiento y control de cambios en CloudFormation*

### Enunciado

A company operates a transaction processing platform across a primary and a standby AWS Region. The company deploys the platform in both Regions by using a stack set in AWS CloudFormation StackSets. The stack set uses a CloudFormation template to create a stack instance in each Region. The company discovers that the standby stack instance was missing changes to some resources. These resources include security groups and IAM policies. These changes were applied directly to the primary stack instance's resources. Some changes are unauthorized drift. Other changes are emergency updates that the change-control board approved and that have the change-control:approved tag.

The company must remediate drift within 1 hour of drift detection unless the change is part of an approved update. The company needs a solution that requires no manual intervention for unauthorized drift. Approved updates must not be reverted by automated remediation.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Enable drift detection on the stack set. Configure Amazon EventBridge to invoke an AWS Lambda function when drift is detected. Configure the function to create a CloudFormation change set for each affected stack instance. Apply change sets that do not modify the resources that include the change-control:approved tag. Publish Amazon SNS notifications for change sets that modify the tagged resources.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Detección y reacción reactiva en < 1 hora:** Activar la detección de desvío (*drift detection*) en el stack set y conectar el evento a **Amazon EventBridge** permite disparar una función **AWS Lambda** inmediatamente ante cualquier desvío.
    2. **Previsualización granular con Change Sets:** La función Lambda genera un *Change Set* de CloudFormation para inspeccionar con exactitud qué cambios propone la remediación en cada recurso.
    3. **Protección de cambios autorizados:** Si el change set toca recursos con la etiqueta `change-control:approved`, la función no aplica el cambio automáticamente y envía una notificación vía **Amazon SNS** a la junta de control de cambios. Si el change set sólo contiene drift no autorizado, aplica el change set automáticamente remediando el desvío sin intervención manual dentro de la ventana de 1 hora.
  - 📖 Más información: [How to Perform Drift Detection on CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html) y [Updating Stacks Using Change Sets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/using-cfn-updating-stacks-changesets.html)

- **B.** Enable drift detection on the stack set. Configure an Amazon EventBridge rule that publishes drift detection events to an Amazon SNS topic. Subscribe the company's security team to the SNS topic. Require the security team to manually view each drifted resource and invoke a StackSets update operation to reapply the template and revert the unauthorized drift.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Exigir que el equipo de seguridad revise manualmente cada recurso desvirtúa el requisito de **cero intervención manual** para el desvío no autorizado (*"no manual intervention for unauthorized drift"*) y arriesga no cumplir el SLA de remediación en menos de 1 hora.
  - 📖 Más información: [How to Perform Drift Detection on CloudFormation StackSets](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/stacksets-drift.html)

- **C.** Configure the AWS Config managed cloudformation-stack-drift-detection-check rule to evaluate the StackSets stack instances across both Regions. Create an AWS Systems Manager Automation runbook as the AWS Config remediation action that calls the CloudFormation UpdateStackInstances API to reapply the original template. Initiate the remediation automatically when AWS Config reports noncompliance.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** La acción de remediación de Systems Manager Automation ejecutando `UpdateStackInstances` reaplica ciegamente la plantilla original a todo el stack, sin capacidad de inspeccionar etiquetas individuales por recurso; esto revertiría y destruiría los cambios aprobados de emergencia, violando la restricción de que los cambios aprobados no deben revertirse.
  - 📖 Más información: [AWS Config CloudFormation Stack Drift Check Rule](https://docs.aws.amazon.com/config/latest/developerguide/cloudformation-stack-drift-detection-check.html) y [UpdateStackInstances API](https://docs.aws.amazon.com/AWSCloudFormation/latest/APIReference/API_UpdateStackInstances.html)

- **D.** Configure a pipeline in AWS CodePipeline to include a CloudFormation drift detection stage daily. Configure the pipeline to reapply the original template to drifted stack instances and to exclude tagged resources from reapplication. Configure an Amazon SNS notification step in the pipeline to alert the change control team when tagged drift is detected.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Una ejecución programada diaria (*daily*) en CodePipeline no cumple la exigencia de remediar en **menos de 1 hora** tras la detección del desvío; la solución debe ser orientada a eventos en tiempo real.
  - 📖 Más información: [Detect Drift on an Entire CloudFormation Stack](https://docs.aws.amazon.com/AWSCloudFormation/latest/UserGuide/detect-drift-stack.html)

> [!important] Trampa de examen
> Para **remediar drift automáticamente SIN revertir cambios de emergencia aprobados con etiquetas**: el patrón oficial consiste en usar **EventBridge + Lambda**, donde la función genera un **CloudFormation Change Set**, verifica si los recursos afectados tienen la etiqueta de aprobación y solo aplica el cambio si no afecta recursos autorizados (notificando a SNS en caso contrario).

---

_Fuente: [Skill Builder - Domain 5 Practice (SAP-C03)](https://skillbuilder.aws/renderer/?module_id=JJ3KWEUHXB%3A001.000.000&product_id=H8R28VGFFM%3A001.000.000&registration_id=b5202342-7a56-5208-9f6b-adea2af0b722&referrer=https%3A%2F%2Fskillbuilder.aws%2Flearn%2F34FVT2D7MD%2Fdomain-5-practice-aws-certified-solutions-architect--professional-sapc03--english%2FH8R28VGFFM&navigation=digital_)
