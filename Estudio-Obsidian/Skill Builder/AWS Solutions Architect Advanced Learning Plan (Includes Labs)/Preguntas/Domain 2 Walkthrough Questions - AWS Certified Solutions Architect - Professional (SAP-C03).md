---
title: "Domain 2 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)"
aliases:
  - "Domain 2 Walkthrough Questions"
  - "Walkthrough D2"
  - "Preguntas Walkthrough D2"
tags:
  - certificacion/aws
  - sap-c02
  - sap-c03
  - skill-builder
  - preguntas
  - walkthrough
  - dominio-2
status: activo
fuente: "https://skillbuilder.aws/learn/C37XA6NWNT/domain-2-practice-aws-certified-solutions-architect--professional-sapc03--english/EKU5G6K61V"
---

# Domain 2 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **preguntas guiadas (Walkthrough)** y **evaluaciones prácticas (Practice Assessment)** del **Dominio 2: Design for New Solutions** para la certificación AWS Certified Solutions Architect - Professional (SAP-C03).
> Diseñado para analizar escenarios de arquitectura avanzada: gobernanza y cumplimiento multi-cuenta (Control Tower, SCPs a nivel OU), seguridad y auditoría inmutable (Object Lock, CloudTrail con Bedrock, IMDSv2, KMS grants), gestión de certificados regionales (ACM) y control de accesos basado en atributos (ABAC con IAM Identity Center).

> [!info] Metodología Walkthrough
> 1. **Lectura dirigida:** Identificar primero la pregunta final (criterio clave: *menor sobrecarga operativa*, *mayor resiliencia*, *más costo-eficiente*).
> 2. **Extracción de señales y restricciones:** Desglosar requisitos duros (RPO, RTO, consistencia de datos, latencia, modelo de administración delegada, auditoría regulatoria).
> 3. **Eliminación sistemática:** Descartar opciones inviables o subóptimas justificando la falla de cada distractor.
> 4. **Validación:** Confirmar la mejor opción frente a los servicios recomendados y las mejores prácticas del Well-Architected Framework.

---

## 📊 Registro de intentos

| # | Fecha | Evaluación / Sección | Aciertos | % | Estado | Tareas flojas / Motivo del error |
| - | ----- | -------------------- | -------- | - | ------ | -------------------------------- |
| 1 | 2026-11-20 | Walkthrough Questions (Q1-Q2) | 2/2 | 100 % | 🟢 | Q1: Cross-account TGW attachment via RAM (management on-switch, share resource, attach) / Q2: Centralized CloudTrail delegated admin + Bedrock advanced event selectors + S3 Object Lock compliance mode (7 años) |
| 2 | 2026-11-20 | Practice Assessment (5 preguntas) | 2/5 | 40 % | 🟠 | Confusión de IMDSv2 (session-oriented) con apagar IMDS (P1), rehacer landing zone vs enrolar cuentas existentes en Control Tower (P2), asociar SCP a cada cuenta en lugar de a nivel OU (P4). Aciertos en ACM regional (P3) y ABAC + Access Analyzer (P5, 3/3). |

---

## ✅ Cobertura por tarea (Dominio 2)

| Tarea | Descripción | Preguntas vistas | Estado |
| ----- | ----------- | ---------------- | ------ |
| **2.1** | Design a deployment strategy to meet job requirements | 1 (P3: ACM Regional en ALB) | 🟢 dominado |
| **2.2** | Design a solution to ensure business continuity | 0 | ⬜ |
| **2.3** | Design multi-account governance and compliance solutions | 4 (Q1 TGW RAM, P2 Control Tower, P4 SCP OU, P5 ABAC) | 🟡 vista |
| **2.4** | Design architectures to meet compliance requirements | 2 (Q2 CloudTrail Bedrock, P1 IMDSv2 KMS Grants) | 🟠 a reforzar |
| **2.5** | Design a solution to meet performance objectives | 0 | ⬜ |
| **2.6** | Determine a cost-optimization strategy to meet solution goals | 0 | ⬜ |

*Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.*

---

# Walkthrough questions

## Question 1: Walkthrough question

This walkthrough question is from task statement 2.3: Design multi-account governance and compliance solutions. The question reads:

"A company migrates all its applications to AWS in the us-east-1 Region. In AWS Organizations, the company adds a development account with two VPCs that the company attaches to a transit gateway. The company also adds a production account with another VPC. Which combination of steps should the company take to attach the production VPC to the transit gateway? (Select THREE.)"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: AWS Organizations

The accounts are in the same AWS Organizations organization. That matters because cross-account resource sharing runs through AWS RAM, and RAM sharing to an organization has to be turned on first from the management account. This is the "on switch" step.

#### 2: development account with two VPCs that the company attaches to a transit gateway

The transit gateway is owned by the development account. Ownership is the key signal: the resource you share is the transit gateway, and it is shared from the account that owns it.

#### 3: production account with another VPC

The VPC to connect lives in a separate production account. Resource and VPC sit in two different accounts, which is why this is a cross-account sharing problem, not an in-account one.

#### 4: attach the production VPC to the transit gateway

The goal is to attach the production VPC to the transit gateway. The three steps that get there: activate resource sharing from the management account, share the transit gateway with the production account through AWS RAM, then create the attachment from the production VPC. Distractors use IAM (wrong mechanism) or share the VPC (wrong resource).

---

## Question 1: Examine the answers

You identified an AWS Organizations setup, a transit gateway in one account, a VPC in a separate production account, and the need to attach that VPC across account boundaries. Each one narrows what the answer can be. This is a Select THREE question, so you are looking for the three steps that work together to share and attach the transit gateway. Hold your reasoning, then watch the walkthrough below.

#### Transcript

All right, so this one asks us to pick 3 steps, not 1. So let's keep that in mind as we read. A company migrates all its applications to AWS in the US East One region. In AWS organizations, the company adds a development account with two VPCs that the company attaches to a transit gateway. The company also adds a production account with another VPC. All right, Joe, so which combination of steps should the company take to attach the production VPC to the transit gateway? We're going to select 3. All right, well, the first signal is AWS organizations. These accounts already live in the same organization, and that matters because sharing resources across accounts is much smoother once organizations are in the picture. Agreed. And the second signal is ownership. The transit gateway lives in the development account. The VPC we want to attach lives in the production account. So the resource and the thing joining it sit in two different accounts, right? And the third signal is the goal itself attach the production VPC to the transit gateway. Whatever 3 steps we pick have to add up to a working cross-account attachment. There's a repeatable pattern for sharing a resource across accounts in an organization. Turn on sharing at the organization level. Share the specific resource, then let the other account use it. So we have 3 moves. All right, well, let's walk through these options. Step 1 is option A. Use the organization's management account to activate resource sharing. Resource access Manager can share with your whole organization, but only after sharing with organizations is switched on. So that's the on switch, right? And step two is option D. Use AWS Resource Access Manager to share the transit gateway with the production account. RAM is the service built to share a resource like a transit gateway across accounts. And notice what we share the transit gateway, because that's what the development account owns. Yep. And step 3 is option F. Attach the VPC in the production account to the transit gateway. Once the gateway is shared, the production account creates the attachment from its own side to its own VPC, and that's a step that actually connects the network. So our keys for this question are ADF. Turn on sharing, share the transit gateway, attach the VPC. Now let's see why the other three steps are traps. Well, Option B says to use an IAM policy in a development account to share the transit gateway. IAM controls who can call which API inside an account. It doesn't hand a network resource like a transit gateway to another account. That's the wrong tool. Option C says use IAM in the production account to share the production VPC. Same problem with IAM, and it's the wrong resource. We never need to share the VPC, right? And option E says to use RAM to share the production VPC. RAM is right, but the direction is backwards. You share the transit gateway that the development account owns. You don't share the VPC. That's the theme across all three wrong answers. Either the wrong service, IAM, or the wrong resource, the VPC. So here's the good pattern to remember for the exam. Cross-account sharing in an organization is 3 things enable sharing, share the owned resource with RAM, and then attach from the account that's joining. Right service, right resource, right direction.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem? This is a Select THREE question: three options are correct.

#### Use the Organizations management account to activate resource sharing.

Correct. Before resources can be shared across accounts in an organization, resource sharing has to be turned on from the management account. Once enabled, accounts in the organization can share resources such as a transit gateway with each other. The pattern to notice: cross-account sharing within an organization starts with enabling resource sharing at the organization level, which is a management-account action.

#### Use an IAM policy in the development account to share the transit gateway with the production account.

Incorrect. IAM gives fine-grained access control over AWS resources within an account, but it is not the mechanism for sharing a transit gateway across accounts. A transit gateway is shared with other accounts through Resource Access Manager, not through an IAM policy. The pattern to notice: IAM controls who can do what inside an account; it does not hand a network resource to another account.

#### Use IAM in the production account to share the production VPC with the development account.

Incorrect. This targets the wrong resource and the wrong direction. The goal is to share the transit gateway so the production VPC can attach to it, not to share the VPC. IAM is also not the sharing mechanism for these resources. The pattern to notice: check what actually needs to be shared. Here it is the transit gateway, not the VPC.

#### Use AWS Resource Access Manager (AWS RAM) to share the transit gateway with the production account.

Correct. AWS RAM is the service that securely shares resources across accounts in an organization. Sharing the transit gateway with the production account through AWS RAM is what lets that account attach its VPC to the transit gateway. The pattern to take forward: when a resource has to be used from another account, AWS RAM is the sharing mechanism, and the transit gateway is the resource to share.

#### Use AWS Resource Access Manager (AWS RAM) to share the production VPC with the development account.

Incorrect. AWS RAM is the right service, but this shares the wrong resource. The company needs to share the transit gateway so the production VPC can attach to it, not share the VPC itself. The pattern to notice: the right tool aimed at the wrong resource is still wrong. Confirm which resource the stem needs shared.

#### Attach the VPC in the production account to the transit gateway.

Correct. After resource sharing is enabled and the transit gateway is shared through AWS RAM, the final step is to create the attachment from the production VPC to the transit gateway. Without this step the VPC is not connected. The pattern to take forward: sharing a transit gateway makes it available to the other account, but the attachment still has to be created to complete the connection.

---

## Question 1: Takeaways

That is all for this question. The reading pattern here rewards two checks: identify the correct sharing mechanism (AWS RAM, not IAM) and identify the correct resource to share (the transit gateway, not the VPC). The three correct steps form a sequence: enable resource sharing from the management account, share the transit gateway through AWS RAM, then attach the production VPC to it. Distractors either use the wrong mechanism (IAM) or share the wrong resource (the VPC). Note any knowledge gap you spotted while working through it.

---

## Question 2: Walkthrough question

This walkthrough question is from task statement 2.4: Design architectures to meet compliance requirements. The question reads:

"A company has an organization in AWS Organizations that manages multiple AWS accounts across production, development, and shared services OUs. The organization's management account is separate from the operational accounts. The company uses Amazon Bedrock for production applications. The company must maintain tamper-proof audit logs that include administrator actions, Amazon S3 data access, and all AI model invocations to meet regulatory requirements. The company must retain the audit logs for 7 years. The company uses AWS CloudTrail to generate the required audit logs and has created a central S3 bucket for the CloudTrail logs. The company discovered that accounts in the production and development OUs previously disabled CloudTrail logging during troubleshooting. A security account in the shared services OU must centrally manage audit capabilities and store the CloudTrail logs in the central S3 bucket. This security account must also prevent accounts in the production and development OUs from disabling the centralized CloudTrail logging. Which solution will meet these requirements?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: tamper-proof audit logs

"Tamper-proof" means no one, not even the root user, can delete or modify the logs once written. This eliminates any storage option that allows override with sufficient permissions. Look for S3 Object Lock in compliance mode, which prevents any user from shortening the retention period or deleting protected versions.

#### 2: all AI model invocations

AI model invocations (Amazon Bedrock API calls like InvokeModel and InvokeAgent) are logged as data events. Basic event selectors only support S3 and Lambda data events. To log Bedrock invocations, the trail must use advanced event selectors with the appropriate Bedrock resource types.

#### 3: retain the audit logs for 7 years

A 7-year retention requirement confirms you need a retention period on the storage itself, not just a lifecycle policy. Combined with "tamper-proof," this points to S3 Object Lock with a fixed retention period set to 7 years.

#### 4: A security account in the shared services OU must centrally manage

The stem specifies which account must manage audit: the security account. This means using a CloudTrail delegated administrator rather than creating the trail from the management account. The delegated administrator pattern separates operational security responsibilities from the management account.

#### 5: prevent accounts in the production and development OUs from disabling

Organization trails, when created by a delegated administrator or the management account, cannot be deleted, stopped, or modified by member accounts. This inherent property of organization trails addresses the "prevent disabling" requirement without additional controls.

---

## Question 2: Examine the answers

You identified tamper-proof audit logs, AI model invocations, a delegated security account, and the need to prevent member accounts from disabling logging. Each one narrows what the answer can be. Which option lines up with all of them? Hold your reasoning, then watch the walkthrough below.

#### Transcript

All right, so let's walk through another question. In this case, I'll assume that you've already read the question and mark some key phrases. So Joe, let's talk about why option C is the one that holds up here. Yeah, this question stacks several requirements together. Let's start with who manages the trail. The Stem says the security account in shared services has to centrally manage audit that immediately points to a delegated administrator. Right? Option D creates the trail from the management account that technically works, but it violates the requirement. The stem told you which account to use, so any option using a different account is out. Agreed. And once you register a delegated administrator and create an organization trail, member accounts can't delete it, can't stop logging, or modify it. That built-in protection handles the prevent disabling requirement on its own. All right, good. So next signal all AI model invocations. Amazon Bedrock API calls like invoke model and invoke agent are logged as data events. To capture those, you need advanced event selectors. Basic event selectors only handle S3 and Lambda data events. So that's going to eliminate Option B. It uses basic event selectors, so Bedrock invocations never get logged. You'd have a compliance gap for the AI audit requirement. Now the big one, tamperproof plus 7 years. That combination is a strict one. You need storage that no one, not even the root user, can override during the retention period. And that's the difference between compliance mode and governance mode. An S3 object lock. Governance mode lets a user with a bypass governance retention permission remove the lock. Compliance mode doesn't. No user, root included, can shorten or remove a compliance mode retention period. So option A fails there. It has the right event selectors, the right delegated admin setup, but governance mode leaves a door open for a privileged user to tamper with the logs. Regulatory auditors would definitely flag that. Exactly, yeah. Option C uses compliance mode with a 7 year retention period which closes that door completely. So let's recap the pattern. When you see tamperproof or regulatory retention in a stem, check the storage immutability. Governance mode is for internal protection where overrides might occasionally be needed. Compliance mode is for external regulation where overrides are never acceptable. And pair that with who manages the trail. If the stem names a specific account, use the delegated administrator model for that account. Don't default to the management account just because it can do everything. That's a good summary. The reading pattern. Check the management requirement, check the event coverage, and check the immutability level. All three have to line up.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem?

#### Register the security account as a delegated administrator for CloudTrail. Create a multi-Region organization trail that delivers the logs to the central S3 bucket. Log management events, S3 data events, and Amazon Bedrock events by using advanced event selectors. Configure S3 Object Lock in governance mode. Set the retention period to 7 years.

A test-taker might pick this because it covers all three event types (management events, S3 data events, and Amazon Bedrock events) and uses a delegated administrator with an organization trail. That structure does centralize logging and prevent member accounts from disabling the trail. However, the option specifies S3 Object Lock in governance mode. Governance mode allows users with the s3:BypassGovernanceRetention permission to override the lock and delete protected objects. For regulatory requirements that demand tamper-proof logs, governance mode leaves a gap: a privileged user could still remove log files before the 7-year retention period ends. The pattern to notice: when a stem says "tamper-proof" or "regulatory," governance mode is not strict enough.

#### Register the security account as a delegated administrator for CloudTrail. Create a multi-Region organization trail that delivers the logs to the central S3 bucket. Log management events and S3 data events by using basic event selectors. Configure S3 Versioning and S3 Lifecycle policies.

A test-taker might pick this because it uses a delegated administrator and an organization trail, which handles the centralized logging requirement. However, basic event selectors cannot log Amazon Bedrock data events. Advanced event selectors are required to specify resource types such as AWS::Bedrock::AgentAlias for Bedrock API invocations. Without that, the company misses AI model invocation logs entirely, creating a regulatory compliance gap. Additionally, S3 Versioning and Lifecycle policies do not provide true immutability: a principal with the right permissions can still permanently delete versioned objects. The pattern to notice: basic event selectors limit you to S3 and Lambda data events; newer services like Amazon Bedrock require advanced event selectors. And versioning alone does not equal tamper-proof.

#### Register the security account as a delegated administrator for CloudTrail. Create a multi-Region organization trail that delivers the logs to the central S3 bucket. Log management events, S3 data events, and Amazon Bedrock events by using advanced event selectors. Configure S3 Object Lock in compliance mode. Set the retention period to 7 years.

This is the correct option. It satisfies every marker in the stem. A CloudTrail delegated administrator in the shared services OU can centrally create and manage an organization trail. A multi-Region organization trail logs events for all accounts in the organization, and member accounts cannot delete it, stop logging, or modify it, which addresses the "prevent disabling" requirement. Advanced event selectors support logging Amazon Bedrock data events (such as InvokeAgent calls) alongside S3 data events and management events, covering the full audit scope. S3 Object Lock in compliance mode prevents any user, including the root user, from overwriting or deleting protected object versions until the retention period expires, meeting the tamper-proof and 7-year retention requirements. The pattern to take forward: delegated administrator plus organization trail centralizes control, advanced event selectors cover AI services, and compliance mode provides true immutability.

#### Create a multi-Region organization trail from the management account. Log management events and S3 data events. Deliver the logs to the central S3 bucket. Configure S3 Object Lock in compliance mode. Set the retention period to 7 years.

A test-taker might pick this because it uses an organization trail with compliance mode Object Lock, which does provide tamper-proof retention. However, the stem requires the security account in the shared services OU to manage audit capabilities. Creating the trail from the management account violates the AWS best practice of separating operational responsibilities into a delegated security account. Additionally, this option only logs management events and S3 data events. It does not include Amazon Bedrock as a data event resource type, so AI model invocations go unrecorded. The pattern to notice: when the stem specifies which account must manage something, an option that uses a different account fails the requirement even if the rest looks right. Also watch for missing event types: the stem listed three categories, and this option only covers two.

---

## Question 2: Takeaways

That is all for this question. The reading pattern here rewards checking two dimensions simultaneously: who manages the trail (delegated administrator versus management account) and how the logs stay immutable (compliance mode versus governance mode versus versioning). When a stem names a specific account for management and demands tamper-proof retention, both conditions must be met. Note any knowledge gap you spotted while working through it.

---

# Practice Assessment: Domain 2 (5 preguntas)

## Pregunta 1 de 5: Acceso seguro a metadatos de instancia (IMDS) y cifrado con AWS KMS

*Tarea: 2.4 — Controles de seguridad y cifrado en EC2 / S3*

### Enunciado

A company plans to run a web application and a custom firewall solution on Amazon EC2 instances. The application will access sensitive data that the company stores in an Amazon S3 bucket. To make this process possible, the EC2 instances will have an instance profile with an IAM role that provides access to the bucket. The company has a requirement to encrypt the data by using AWS KMS. A solutions architect needs to design a secure solution for data access and encryption.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Turn on both request/response and session-oriented methods for instance metadata service (IMDS). Use an AWS managed key for data encryption. Provide permissions by using an AWS KMS key policy.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** IMDSv1 utiliza un método de petición/respuesta y carece de defensas contra ataques SSRF (Server-Side Request Forgery) o proxies abiertos. Permitir ambos métodos deja activa la vulnerabilidad de IMDSv1. Además, las claves administradas por AWS (*AWS managed keys*) no admiten políticas de clave personalizadas (*key policies* modificables por el usuario).
  - 📖 Más información: [Use IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html), [AWS KMS Concepts](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html) y [Key Policies in AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/key-policies.html)

- **B.** Access IAM credentials by using a request/response method for instance metadata service (IMDS). Use an asymmetric AWS KMS key in a custom key store for data encryption. Provide permissions by using an AWS KMS key policy.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Usar sólo el método petición/respuesta (IMDSv1) deja expuesta la instancia ante SSRF. Además, un *custom key store* (CloudHSM) no admite claves asimétricas de KMS para cifrado de datos general de esta manera.
  - 📖 Más información: [Use IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html) y [Managing KMS Keys in a CloudHSM Key Store](https://docs.aws.amazon.com/kms/latest/developerguide/manage-cmk-keystore.html)

- **C.** Access IAM credentials by using a session-oriented method for instance metadata service (IMDS). Use a customer managed key for data encryption. Provide permissions by using AWS KMS grants.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:**
    1. **IMDSv2 (Session-oriented method):** Utiliza tokens de sesión orientados a conexión que mitigan de raíz las vulnerabilidades de SSRF y proxies inversos mal configurados.
    2. **Customer Managed Key (CMK) con AWS KMS Grants:** Permite delegar permisos de uso de clave de forma temporal y granular mediante concesiones (*grants*) con restricciones de concesión (*grant constraints*), sin necesidad de alterar permanentemente la política de la clave ni las políticas de IAM.
  - 📖 Más información: [Use IMDSv2](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/configuring-instance-metadata-service.html), [AWS KMS Concepts](https://docs.aws.amazon.com/kms/latest/developerguide/concepts.html), [Grants in AWS KMS](https://docs.aws.amazon.com/kms/latest/developerguide/grants.html) y [Using Grant Constraints](https://docs.aws.amazon.com/kms/latest/developerguide/create-grant-overview.html#grant-constraints)

- **D.** Turn off both request/response and session-oriented methods for instance metadata service (IMDS). Use a symmetric AWS KMS key with imported key material. Provide permissions by using AWS KMS grants.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Si se desactivan ambos métodos de IMDS (se apaga el servicio de metadatos), las instancias EC2 no podrán consultar el enlace local `169.254.169.254` para obtener las credenciales temporales del IAM instance profile, impidiendo que la aplicación acceda al bucket de S3.
  - 📖 Más información: [Retrieve Security Credentials from Instance Metadata](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/iam-roles-for-amazon-ec2.html#instance-metadata-security-credentials)

> [!important] Trampa de examen
> **IMDSv2** se define técnicamente en la documentación de AWS como el **método orientado a sesión (session-oriented method)** que exige crear un token vía `PUT` antes de consultar los metadatos. **NUNCA apagues IMDS** si la instancia necesita asumir un IAM Role / Instance Profile.

---

## Pregunta 2 de 5: Gobernanza centralizada en AWS Control Tower para cuentas de empresas adquiridas

*Tarea: 2.3 — Gobernanza multi-cuenta y landing zones*

### Enunciado

A company has an AWS Control Tower landing zone. The company recently acquired other companies. The acquired companies have several separate AWS accounts each. The acquired companies did not use AWS Organizations. The company needs to bring all existing and future accounts under common governance.

Which solution will meet these requirements with the LEAST operational effort?

### Opciones de respuesta

- **A.** Decommission the existing AWS Control Tower landing zone. Create a new landing zone by using AWS Control Tower. Invite each individual AWS account from the recently acquired companies to join the existing organization that is registered with AWS Control Tower. After each account accepts the invitation, move the accounts to the appropriate OUs. Use the new landing zone capabilities to govern all current and new accounts.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Desmantelar (*decommission*) y reconstruir por completo una landing zone de AWS Control Tower existente es una operación de altísimo riesgo, innecesaria, propensa a errores y con sobrecarga operativa extrema. Control Tower permite enrolar cuentas externas existentes de forma nativa sin destruir la zona de aterrizaje.
  - 📖 Más información: [Walkthrough: Decommission an AWS Control Tower Landing Zone](https://docs.aws.amazon.com/controltower/latest/userguide/decommission-landing-zone.html) y [Inviting an AWS Account to Join Your Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html)

- **B.** Invite each individual AWS account from the recently acquired companies to join the existing organization that is registered with AWS Control Tower. After each account accepts the invitation, create one OU for each account. Move each account to its respective OU. Continue to use the existing landing zone capabilities to govern all current and new accounts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Crear una OU por cada cuenta adquirida fragmenta la estructura, destruye la gobernanza común y obliga a duplicar políticas (SCPs) en decenas de OUs separadas en lugar de agrupar cuentas por función en OUs estándar compartidas.
  - 📖 Más información: [Inviting an AWS Account to Join Your Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html) y [Enroll an Existing AWS Account](https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html)

- **C.** Decommission the existing AWS Control Tower landing zone. Create a custom landing zone by using Organizations with appropriate OUs. Invite each individual AWS account from the recently acquired companies to join the new organization. After each account accepts the invitation, move the accounts to the appropriate OUs. Use the new organization capabilities to govern all current and new accounts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Reemplazar Control Tower por una landing zone manual construida desde cero con AWS Organizations aumenta la sobrecarga operativa de gestión en lugar de reducirla.
  - 📖 Más información: [Building a Landing Zone](https://docs.aws.amazon.com/prescriptive-guidance/latest/migration-aws-environment/building-landing-zones.html)

- **D.** Invite each individual AWS account from the recently acquired companies to join the existing organization that is registered with AWS Control Tower. After each account accepts the invitation, move the accounts to the appropriate OUs. Use the existing landing zone capabilities to govern all current and new accounts.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** AWS Control Tower opera sobre una única organización en AWS Organizations. La vía con el **menor esfuerzo operativo (LEAST operational effort)** consiste en:
    1. Enviar una invitación a las cuentas externas para unirse a la organización existente.
    2. Una vez aceptada, mover las cuentas a las OUs pertinentes gobernadas por Control Tower (*Enroll account*).
    3. Gobernar todas las cuentas bajo los guardrails y controles existentes sin recrear nada.
  - 📖 Más información: [Inviting an AWS Account to Join Your Organization](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_accounts_invites.html) y [Enroll an Existing AWS Account](https://docs.aws.amazon.com/controltower/latest/userguide/enroll-account.html)

> [!important] Trampa de examen
> **Nunca desmanteles una landing zone de Control Tower** para incorporar cuentas existentes. La solución estándar de AWS es: **Invitar a la organización existente $\rightarrow$ Mover a la OU de Control Tower $\rightarrow$ Inscribir (Enroll) la cuenta**.

---

## Pregunta 3 de 5: Despliegue unificado de certificados en ACM y naturaleza regional en Application Load Balancers

*Tarea: 2.1 — Estrategias de despliegue y gestión de certificados SSL/TLS*

### Enunciado

A company operates hundreds of websites in the us-east-1 and us-west-2 Regions. Users can currently access all applications by using HTTPS through Application Load Balancers. The company configured the load balancers to use custom public SSL/TLS certificates. A solutions architect needs to design a unified certificate deployment solution that uses AWS Certificate Manager (ACM) with DNS validation.

Which solution will meet these requirements with the LEAST ongoing certificate management?

### Opciones de respuesta

- **A.** Create a certificate for each website in ACM in the Region where each load balancer resides. Replace the certificates on each load balancer.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:**
    1. **Naturaleza regional de ACM:** Los certificados emitidos por ACM son recursos regionales. Para asociar un certificado a un Application Load Balancer en una región específica (por ejemplo, us-west-2), el certificado debe solicitarse forzosamente en esa misma región.
    2. **Menor mantenimiento continuo:** Los certificados emitidos directamente por ACM con validación DNS cuentan con **renovación administrada automática (managed renewal)** sin intervención humana, a diferencia de los certificados importados.
  - 📖 Más información: [Supported Regions in ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html) y [Managed Renewal for ACM Certificates](https://docs.aws.amazon.com/acm/latest/userguide/managed-renewal.html)

- **B.** Import the existing certificates into ACM. Replace the certificates on the load balancers with the imported certificates on ACM.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** ACM **NO renueva automáticamente los certificados importados**. Requiere renovaciones y cargas manuales periódicas, lo cual eleva el esfuerzo operativo continuo.
  - 📖 Más información: [Importing Certificates into AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html)

- **C.** Create a certificate for each website by using ACM in us-east-1. Replace the certificates on each load balancer.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Un certificado solicitado en us-east-1 no puede ser vinculado a un Application Load Balancer que resida en us-west-2 (únicamente CloudFront utiliza certificados exclusivos de us-east-1).
  - 📖 Más información: [Supported Regions in ACM](https://docs.aws.amazon.com/acm/latest/userguide/acm-regions.html)

- **D.** Add the existing certificates to the certificate list on each load balancer. Import the certificates to ACM and add the certificates to the listener.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Nuevamente, los certificados importados carecen de renovación automática en ACM, requiriendo intervención manual continua.
  - 📖 Más información: [Add Certificates to the Certificate List](https://docs.aws.amazon.com/elasticloadbalancing/latest/application/listener-update-certificates.html#add-certificates) y [Importing Certificates into AWS Certificate Manager](https://docs.aws.amazon.com/acm/latest/userguide/import-certificate.html)

> [!important] Trampa de examen
> - **ALB / NLB / API Gateway:** Los certificados ACM deben solicitarse en la **misma región** donde vive el balanceador.
> - **CloudFront:** El certificado ACM debe solicitarse obligatoriamente en **us-east-1**.
> - **Certificados importados** $\rightarrow$ **NO tienen renovación automática**. Certificados emitidos por ACM $\rightarrow$ **Tienen renovación automática**.

---

## Pregunta 4 de 5: Protección centralizada de CloudTrail en AWS Organizations mediante SCPs a nivel OU

*Tarea: 2.3 — Gobernanza multi-cuenta y Service Control Policies (SCPs)*

### Enunciado

A company uses AWS Organizations with many accounts in a single Organizational Unit (OU). For compliance purposes, the company relies heavily on AWS CloudTrail logs. The company stores the CloudTrail logs in Amazon S3 buckets in each individual account. Recently, the company discovered that an employee turned off CloudTrail logs for several accounts. The company wants a solution to prevent changes to CloudTrail settings in all current and future accounts. The company will require all trails to use a new centralized S3 bucket.

Which solution will meet these requirements with the LEAST operational overhead?

### Opciones de respuesta

- **A.** Create the new S3 bucket in a new account with a bucket policy that grants cross-account permissions to CloudTrail. Turn on CloudTrail logs for all accounts. Update the current CloudTrail logs to use the new bucket. Create an SCP to deny changes to CloudTrail settings. Attach the SCP to each account.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Vincular el SCP a cada cuenta individualmente introduce una sobrecarga administrativa innecesaria y no protege de forma automática a las **cuentas futuras** que se creen o agreguen a la organización.
  - 📖 Más información: [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

- **B.** Create the new S3 bucket in the management account. Turn on CloudTrail logs for all accounts. Update the current CloudTrail logs to use the new bucket. Create IAM policies to deny changes to CloudTrail settings. Attach the policy as needed to each account.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Las políticas de IAM se administran de forma local por cuenta y no impiden que los administradores de cuenta o el usuario root modifiquen la configuración. Además, configurar IAM en cada cuenta individual tiene un costo operativo enorme.
  - 📖 Más información: [Policies and Permissions in IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html)

- **C.** Create the new S3 bucket in the management account. Turn on CloudTrail logs for all accounts. Update the current CloudTrail logs to use the new S3 bucket. Create IAM permissions boundaries in each account in the OU to deny changes to CloudTrail settings.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Las *Permissions Boundaries* solo aplican a usuarios o roles IAM específicos y requieren ser asignadas entidad por entidad en cada cuenta; no protegen a nivel organizacional ni previenen acciones directas fuera de los límites asignados.
  - 📖 Más información: [Permissions Boundaries for IAM Entities](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) y [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

- **D.** Create the new S3 bucket in a new account with a bucket policy that grants cross-account permissions to CloudTrail. Turn on CloudTrail logs for all accounts. Update the current CloudTrail logs to use the new bucket. Create an SCP to deny changes to CloudTrail settings. Attach the SCP to the OU.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:**
    1. **Herencia y cobertura automática:** Al asociar el SCP directamente a la **Unidad Organizativa (OU)**, la regla de denegación (`Deny CloudTrail stop/delete/update`) se aplica automáticamente a todas las cuentas miembros actuales y a **cualquier cuenta futura** que se incorpore a esa OU, con el **menor overhead operativo**.
    2. **Inmutabilidad frente a administradores locales:** Los SCPs establecen guardrails de permisos máximos que ni los administradores locales de las cuentas miembros pueden eludir.
  - 📖 Más información: [Receiving CloudTrail Log Files from Multiple Accounts](https://docs.aws.amazon.com/awscloudtrail/latest/userguide/cloudtrail-receive-logs-from-multiple-accounts.html) y [Service Control Policies (SCPs)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html)

> [!important] Trampa de examen
> Para gobernar cuentas **actuales y futuras** con el menor esfuerzo operativo: **asocia el SCP a la OU (o a la raíz de la Organización)**, nunca a cuentas individuales una por una.

---

## Pregunta 5 de 5: ABAC centralizado con IAM Identity Center y generación de políticas con IAM Access Analyzer

*Tarea: 2.3 — Gobernanza de identidades, ABAC y principio de mínimo privilegio*

### Enunciado

A company manages 80 AWS accounts by using AWS Organizations. Each account uses AWS CloudTrail to store trail logs in its own Amazon S3 bucket. The company has appropriately tagged all AWS resources across accounts, including IAM resources, through a centralized tagging strategy. The company has also implemented centralized identity management by using AWS IAM Identity Center and uses an external identity provider (IdP). The company has properly defined user and group attributes in the external IdP.

The company has activated the "Attributes for access control" page in IAM Identity Center. The company wants to implement attribute-based access control (ABAC) based on the department tag for all the accounts. Additionally, a few of these accounts are exception accounts that each require unique IAM Identity Center permission sets. These permission sets have broader access, and the company determines that it must restrict access based on recent activity.

Which combination of steps will meet these requirements? (Select THREE.)

### Opciones de respuesta

- **A.** Update the custom permission policy for each IAM Identity Center permission set. Configure a condition where the value of the aws:PrincipalTag/Department condition key matches the value of the resource's ResourceTag/Department tag.
  - ✅ **Tu respuesta: Correcto (Paso 1/3)**
  - **Por qué es correcto:** En IAM Identity Center, el control de acceso basado en atributos (ABAC) se implementa en la política de permisos personalizada utilizando la clave de condición `aws:PrincipalTag/<Attribute>`, comparándola con la etiqueta del recurso de destino (`aws:ResourceTag/<Attribute>`).
  - 📖 Más información: [Create Permission Policies for ABAC in IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac-policies.html)

- **B.** Update the custom permission policy for each IAM Identity Center permission set. Configure a condition where the value of the aws:SessionTag/Department condition key matches the value of the resource's ResourceTag/Department tag.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** IAM Identity Center pasa los atributos mapeados desde el IdP como etiquetas de principal (`aws:PrincipalTag`), no como `aws:SessionTag`.
  - 📖 Más información: [Create Permission Policies for ABAC in IAM Identity Center](https://docs.aws.amazon.com/singlesignon/latest/userguide/configure-abac-policies.html)

- **C.** In the exception accounts, update the custom permissions policy that is attached to specific IAM Identity Center permission sets for the applicable accounts.
  - ✅ **Tu respuesta: Correcto (Paso 2/3)**
  - **Por qué es correcto:** Los conjuntos de permisos (*permission sets*) residen de forma centralizada en IAM Identity Center y se aprovisionan automáticamente como roles IAM en las cuentas destino. Para actualizar o restringir los permisos en las cuentas de excepción, la modificación debe realizarse en las políticas de permisos personalizadas de los *permission sets* pertinentes dentro de IAM Identity Center, garantizando sincronización centralizada.
  - 📖 Más información: [Permission Sets Concepts](https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html)

- **D.** Use AWS Identity and Access Management Access Analyzer to generate IAM policies for each role that IAM Identity Center permission sets created in the applicable accounts.
  - ✅ **Tu respuesta: Correcto (Paso 3/3)**
  - **Por qué es correcto:** La función de **generación de políticas de IAM Access Analyzer** analiza los eventos registrados en AWS CloudTrail para identificar exactamente qué acciones y servicios utilizó una entidad IAM (en este caso, los roles aprovisionados por IAM Identity Center en las cuentas de excepción). A partir de esta actividad reciente real, genera una política de permisos ajustada al **principio de mínimo privilegio**.
  - 📖 Más información: [IAM Access Analyzer Policy Generation](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-policy-generation.html)

- **E.** In the exception accounts, update the IAM policy that is attached to the IAM roles that IAM Identity Center permission sets created in the applicable accounts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los roles creados por IAM Identity Center en las cuentas miembros están administrados por el servicio central. Modificar las políticas de IAM directamente en la consola de IAM local de una cuenta miembro no es compatible ni persistente (serían sobrescritas en la próxima sincronización de IAM Identity Center).
  - 📖 Más información: [Permission Sets Concepts](https://docs.aws.amazon.com/singlesignon/latest/userguide/permissionsetsconcept.html)

- **F.** Use Access Advisor in IAM to review the last accessed information for each role that IAM Identity Center permission sets created in the applicable accounts.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** IAM Access Advisor solo muestra información de último acceso a nivel de servicio y acción, pero **no genera automáticamente políticas de IAM** listas para aplicar como sí lo hace IAM Access Analyzer Policy Generation.
  - 📖 Más información: [Last Accessed Information Types for IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_access-advisor.html#access_policies_access-advisor-data-types)

> [!important] Trampa de examen
> 1. En **IAM Identity Center + ABAC**: la clave de condición para comparar atributos de usuario del IdP con etiquetas de recursos es **`aws:PrincipalTag/<Attribute>`**.
> 2. Para restringir permisos excesivos basados en actividad reciente histórica: la herramienta oficial de AWS para generar la política de mínimo privilegio es **IAM Access Analyzer (Policy Generation a partir de CloudTrail)**.
> 3. Los roles aprovisionados por IAM Identity Center **nunca se editan directamente en la consola local de IAM** de la cuenta miembro.

---

_Fuente: [Skill Builder - Domain 2 Practice (SAP-C03)](https://skillbuilder.aws/renderer/?module_id=YV7RGAZM3B%3A001.000.000&product_id=EKU5G6K61V%3A001.000.000&registration_id=97dabf20-da78-5e79-815b-70e38be10571&referrer=https%3A%2F%2Fskillbuilder.aws%2Flearn%2FC37XA6NWNT%2Fdomain-2-practice-aws-certified-solutions-architect--professional-sapc03--english%2FEKU5G6K61V&navigation=digital_)
