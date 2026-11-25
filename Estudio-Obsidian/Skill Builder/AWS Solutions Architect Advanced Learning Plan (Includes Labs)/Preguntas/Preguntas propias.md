---
title: "Preguntas propias — AWS Certified Solutions Architect - Professional (SAP-C02 / SAP-C03)"
aliases:
  - "preguntas propias"
  - "Preguntas propias"
  - "Banco de preguntas propias"
tags:
  - certificacion/aws
  - sap-c02
  - sap-c03
  - skill-builder
  - preguntas
  - propias
status: activo
fuente: "Preguntas propias de práctica y simulación técnica redactadas a partir del temario oficial y casos reales de AWS Skill Builder"
---

# Preguntas propias — AWS Certified Solutions Architect - Professional (SAP-C02 / SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **50 preguntas de práctica y simulación de alta fidelidad** organizadas en bloques de 10 por cada dominio oficial.
> Cada pregunta ha sido diseñada siguiendo el formato de examen real:
> - Opciones de respuesta homogéneas y limpias (sin decoradores, negritas ni pistas visuales que delaten la respuesta).
> - Respuestas y justificaciones técnicas protegidas dentro de bloques desplegables colapsados para permitir autoevaluación real.
> - Desglose exhaustivo de por qué la opción correcta es la mejor y por qué falla cada uno de los distractores.
> - Callout de trampa de examen con la regla de oro para retener.

---

## 📊 Registro de intentos

| # | Fecha | Bloque / Rango | Preguntas | Aciertos | % | Estado | Tareas / Temas a reforzar |
| - | ----- | -------------- | --------- | -------- | - | ------ | ------------------------- |
| — | *(pendiente)* | Todas las 50 preguntas | 50 | — | — | ⬜ por evaluar | Autoevaluación completa del banco |

---

## 📋 Distribución por Dominio (50 preguntas en 5 bloques de 10)

| Bloque | Dominio | Rango | Cantidad | Estado |
| ------ | ------- | ----- | -------- | ------ |
| **Bloque 1** | **Dominio 1: Organizational Complexity** | P01–P10 | 10 | 🟢 Completo |
| **Bloque 2** | **Dominio 2: Design for New Solutions** | P11–P20 | 10 | 🟢 Completo |
| **Bloque 3** | **Dominio 3: Continuous Improvement** | P21–P30 | 10 | 🟢 Completo |
| **Bloque 4** | **Dominio 4: Migration & Modernization** | P31–P40 | 10 | 🟢 Completo |
| **Bloque 5** | **Dominio 5: CI/CD, DevSecOps & Automation** | P41–P50 | 10 | 🟢 Completo |

---

# Bloque 1: Dominio 1

## Pregunta 1 de 50: Conectividad multi-cuenta inter-región con inspección centralizada

*Dominio 1 · Tarea: 1.1 — Diseñar estrategias de conectividad de redes*

### Enunciado

A multinational enterprise operates 60 AWS accounts within an organization in AWS Organizations across two AWS Regions: us-east-1 and eu-west-1. Each account contains a VPC hosting microservices that need to communicate with microservices in other accounts and Regions. Security policy mandates that all inter-VPC traffic must undergo deep packet inspection (DPI) with stateful rule filtering. The enterprise requires a centralized architecture that minimizes latency, avoids full-mesh VPC peering, and requires the LEAST operational overhead to scale as new accounts and VPCs are added. Which solution will meet these requirements?

### Opciones de respuesta

- A. Create VPC peering connections between all 60 VPCs in us-east-1 and all VPCs in eu-west-1. In each VPC, launch a cluster of EC2 instances running third-party firewall appliances behind an Application Load Balancer. Route all inter-VPC traffic through these local firewalls.
- B. Deploy an AWS Transit Gateway in us-east-1 only. Share the Transit Gateway with all accounts in both Regions via AWS RAM. Deploy AWS Network Firewall in us-east-1. Route all European VPC traffic across an inter-region Direct Connect gateway to us-east-1 for inspection.
- C. In each Region, deploy an AWS Transit Gateway in a dedicated Network account. Share the Transit Gateways with the organization using AWS RAM. In each Region, deploy AWS Network Firewall into a dedicated Inspection VPC attached to the regional Transit Gateway with appliance mode enabled. Peer the two Transit Gateways across Regions. Route inter-VPC traffic through the Inspection VPC in each Region before traversing the Transit Gateway peering connection.
- D. In each Region, configure AWS PrivateLink endpoint services for each microservice. Create interface VPC endpoints in each VPC to connect to every other microservice. Use VPC Flow Logs and Amazon GuardDuty to fulfill the deep packet inspection requirement.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Un Transit Gateway regional en una cuenta de red compartida mediante AWS RAM elimina la malla compleja de peering y escala a miles de VPCs. Desplegar AWS Network Firewall en una VPC de inspección dedicada con Appliance Mode activado en el attachment garantiza la simetría de flujo bidireccional requerida para firewalls con estado (stateful DPI). El peering nativo entre Transit Gateways conecta ambas regiones a través de la red privada de AWS con cifrado automático y mínimo overhead.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Una malla completa de VPC peering para 60 cuentas en 2 regiones genera cientos de conexiones individuales inmanejables, y clústeres de EC2 con firewalls de terceros añaden alta sobrecarga operativa de escalado y parches.
> - **Opción B:** Un Transit Gateway es regional y no puede conectarse directamente a VPCs de otra región sin un gateway local y peering. Enviar tráfico europeo a us-east-1 solo para inspección introduce latencia transatlántica inaceptable.
> - **Opción D:** GuardDuty y VPC Flow Logs analizan metadatos y eventos a posteriori; no realizan inspección profunda de paquetes (DPI) en línea ni filtrado con estado. Además, PrivateLink entre decenas de microservicios genera una complejidad y costo inasumibles.
>
> **Trampa de examen:**
> Para inspección centralizada con AWS Network Firewall o firewalls en Transit Gateway: siempre debe activarse Appliance Mode en el attachment de la VPC de inspección para garantizar la simetría de flujo (flow symmetry) y evitar caídas en conexiones con estado.

---

## Pregunta 2 de 50: Barrera de datos organizacional (Data Perimeter) en Amazon S3

*Dominio 1 · Tarea: 1.2 — Prescribir controles de seguridad y gobernanza*

### Enunciado

A financial institution is implementing a strict Data Perimeter strategy across 100 AWS accounts governed by AWS Organizations. The security team must ensure that sensitive data stored in Amazon S3 buckets can only be accessed by IAM principals belonging to the company's AWS Organization. Additionally, principals within the company's organization must be prevented from exfiltrating data to external S3 buckets owned by third parties from within the corporate network. Which combination of policies will satisfy these requirements with the LEAST operational overhead?

### Opciones de respuesta

- A. Configure an SCP that denies all s3 actions unless the request originates from specific VPC IDs. In each account, create IAM roles with permission boundaries that list every allowed S3 bucket ARN explicitly.
- B. In S3 bucket policies, add a condition requiring aws:PrincipalOrgID matching the company's Organization ID. Configure VPC endpoint policies on all S3 gateway endpoints with a condition requiring aws:ResourceOrgID matching the Organization ID.
- C. Deploy an AWS Network Firewall rule group that performs TLS inspection on all HTTPS calls to s3.amazonaws.com and drops any HTTP request headers that do not contain corporate session cookies.
- D. In S3 bucket policies, use the aws:PrincipalArn condition listing all IAM users in the company. Configure an SCP denying s3:PutObject to any bucket without the tag Confidential:True.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> La clave de condición aws:PrincipalOrgID en las políticas de bucket de S3 asegura que solo identidades de la organización corporativa accedan a los datos. La condición aws:ResourceOrgID en la política del VPC Gateway Endpoint de S3 impide que cualquier recurso o usuario dentro de la red corporativa envíe o lea datos de buckets de S3 que no pertenezcan a la organización corporativa, bloqueando la exfiltración a terceros sin requerir listar ARNs individuales.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Listar cientos de VPC IDs en SCPs excede rápidamente los límites de tamaño de las políticas SCP (5.120 bytes), y las permission boundaries con listas explícitas de buckets requieren mantenimiento constante.
> - **Opción C:** Inspeccionar TLS de endpoints de S3 con Network Firewall para evaluar cookies introduce latencia extrema, complejidad de certificados y sobrecarga operativa innecesaria.
> - **Opción D:** Listar ARNs de usuarios en bucket policies no escala en 100 cuentas, y condicionar por tags en SCP no bloquea la subida de datos a buckets de terceros donde el atacante no controla las etiquetas.
>
> **Trampa de examen:**
> Data Perimeter canónico de AWS: Identidades confiables en políticas de bucket con aws:PrincipalOrgID, y Recursos confiables en políticas de VPC Endpoint con aws:ResourceOrgID.

---

## Pregunta 3 de 50: Resolución híbrida y bidireccional de DNS a gran escala

*Dominio 1 · Tarea: 1.1 — Diseñar estrategias de conectividad de redes*

### Enunciado

A healthcare company has connected its on-premises data center to AWS through two AWS Direct Connect dedicated connections terminating at an AWS Transit Gateway. The company operates 80 VPCs across multiple accounts. The on-premises environment uses Active Directory DNS (corp.example.com). Workloads on AWS use Amazon Route 53 Private Hosted Zones (aws.example.com). On-premises clients must resolve domain names in the AWS Private Hosted Zones, and EC2 instances in all 80 VPCs must resolve on-premises domain names with high availability and minimal management as new VPCs are deployed. Which solution will meet these requirements?

### Opciones de respuesta

- A. In a central Shared Services VPC connected to the Transit Gateway, create Route 53 Resolver inbound endpoints and outbound endpoints across multiple Availability Zones. Configure on-premises DNS forwarders for aws.example.com pointing to the inbound endpoint IPs. Create a Route 53 Resolver forwarding rule for corp.example.com pointing to on-premises DNS servers, and share the rule across the organization using AWS RAM. Associate the shared rule and Private Hosted Zones with all 80 VPCs.
- B. Deploy custom BIND DNS servers on EC2 instances across multiple AZs in each of the 80 VPCs. Configure DHCP option sets in each VPC pointing to these local BIND servers. Configure zone transfers between BIND and on-premises Active Directory DNS servers over Direct Connect.
- C. Deploy Route 53 Resolver inbound and outbound endpoints in all 80 VPCs. Create conditional forwarding rules in each VPC pointing directly to the on-premises DNS IP addresses over Direct Connect.
- D. Associate the Route 53 Private Hosted Zone with the on-premises customer gateway router IP addresses using BGP route advertisements. Configure Route 53 Public Hosted Zones with latency routing for internal resolution.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Los Inbound Endpoints en una VPC centralizada permiten a los servidores on-premises resolver dominios de Route 53 Private Hosted Zones. Los Outbound Endpoints permiten a las VPCs resolver dominios corporativos locales mediante una Forwarding Rule. Al compartir dicha regla con toda la organización mediante AWS RAM, cualquier VPC existente o futura la hereda automáticamente sin necesidad de desplegar endpoints adicionales en cada VPC.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Desplegar servidores BIND en 80 VPCs (160+ instancias EC2) requiere gestión manual de parches, configuración de zonas y alta sobrecarga operativa.
> - **Opción C:** Crear endpoints de Resolver en las 80 VPCs genera costos masivos redundantes (se factura por ENI/hora de cada endpoint) cuando pueden centralizarse en una sola VPC compartida.
> - **Opción D:** Las zonas privadas de Route 53 solo se asocian a VPCs, no a routers mediante BGP. Además, las zonas públicas exponen los nombres internos a Internet.
>
> **Trampa de examen:**
> Arquitectura DNS Híbrida: Centraliza Inbound y Outbound Endpoints en una sola VPC de servicios compartidos y comparte las Forwarding Rules con toda la organización vía AWS RAM.

---

## Pregunta 4 de 50: Gobernanza estricta de regiones en AWS Organizations con servicios globales

*Dominio 1 · Tarea: 1.2 — Prescribir controles de seguridad y gobernanza*

### Enunciado

An enterprise manages 150 accounts under AWS Organizations. Corporate governance mandates that AWS resources may only be created in us-east-1 and us-west-2. The solutions architect must implement a Service Control Policy (SCP) attached to the organization root that blocks the creation of resources in any other Region. However, this policy must not break global AWS services, identity management, or CloudFront edge operations. Which configuration in the SCP will meet these requirements?

### Opciones de respuesta

- A. Create an SCP with an Allow effect specifying us-east-1 and us-west-2 under aws:RequestedRegion. Detach the default FullAWSAccess SCP from the organization root.
- B. In AWS Control Tower, enable data residency guardrails only on the Core OU. Disable CloudTrail in all member accounts located outside us-east-1 and us-west-2.
- C. In AWS Config, create an organization-wide rule that detects resources in unapproved Regions and triggers an AWS Systems Manager Automation document that runs ec2:TerminateInstances and s3:DeleteBucket.
- D. Create an SCP with a Deny effect on all actions, with a condition using StringNotEquals on aws:RequestedRegion specifying us-east-1 and us-west-2, and add a condition using NotAction or StringNotLike for global services such as iam, organizations, route53, cloudfront, support, and wafv2.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> La condición global aws:RequestedRegion restringe las llamadas API a las regiones autorizadas. Sin embargo, los servicios globales (IAM, CloudFront, Route 53, Organizations, Support) envían llamadas a endpoints globales o no regionales. Si se aplica un Deny explícito sin excluirlos en NotAction o condiciones similares, se bloquea la autenticación, la gestión de roles y la consola de AWS.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Remover FullAWSAccess y usar solo un Allow por región rompe de inmediato todos los servicios globales, ya que sus llamadas no llevan la firma de las regiones especificadas.
> - **Opción B:** Aplicar guardrails solo en la Core OU deja desprotegidas las 150 cuentas de producción y desarrollo. Desactivar CloudTrail viola la seguridad básica.
> - **Opción C:** AWS Config es detectivo, no preventivo. Eliminar recursos después de creados causa disrupción y no evita que los datos se almacenen inicialmente en regiones prohibidas.
>
> **Trampa de examen:**
> En SCPs con Deny en aws:RequestedRegion, SIEMPRE deben excluirse los servicios globales (iam, route53, cloudfront, organizations, support) para no romper la operatividad básica de la cuenta.

---

## Pregunta 5 de 50: Ingress global multirregión con conmutación determinista en segundos

*Dominio 1 · Tarea: 1.3 — Diseñar arquitecturas fiables y resilientes a escala*

### Enunciado

An online payment gateway processes millions of financial transactions daily across us-east-1 and us-west-2 behind Application Load Balancers in both Regions. The architecture requires deterministic global traffic routing with client requests entering AWS at the closest Point of Presence, automated health checking with failover within 30 seconds between Regions without relying on client DNS caching behaviors, and static Anycast IP addresses that external partners can safelist in their corporate firewalls. Which solution will meet these requirements?

### Opciones de respuesta

- A. Configure Amazon Route 53 with an active-passive failover routing policy pointing to the two ALBs. Set the record TTL to 10 seconds. Create Route 53 health checks associated with CloudWatch alarms in each Region.
- B. Deploy AWS Global Accelerator with two static Anycast IP addresses. Create an endpoint group for us-east-1 and an endpoint group for us-west-2, attaching the respective regional Application Load Balancers. Configure health checks in Global Accelerator with an interval of 10 seconds and a threshold of 3 consecutive checks.
- C. Deploy an Amazon CloudFront distribution with Origin Shield enabled. Configure an origin group with the primary ALB in us-east-1 and the secondary ALB in us-west-2 with 502/503/504 failover criteria.
- D. Establish an AWS Site-to-Site VPN with BGP route propagation between the two Regions. Use ECMP to route traffic over the AWS backbone.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS Global Accelerator proporciona 2 direcciones Anycast IPv4 estáticas globales ideales para listas blancas de firewalls de socios. El tráfico entra por el PoP de AWS más cercano y viaja por la red troncal privada de AWS. Además, el failover ocurre a nivel de capa de red en menos de 30 segundos (3 intervalos de 10 seg) sin verse afectado por DNS caching o resolvers de clientes que ignoran el TTL.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Route 53 depende del DNS; muchos resolvers de clientes almacenan en caché las respuestas durante decenas de minutos ignorando el TTL (DNS pinning), retrasando el failover. Además, los ALBs no tienen IPs estáticas fijas.
> - **Opción C:** CloudFront utiliza dominios dinámicos y un pool masivo de IPs variables; no proporciona dos IPs estáticas fijas dedicadas para safelisting en firewalls de terceros.
> - **Opción D:** Site-to-Site VPN es para conectar redes privadas corporativas on-premises, no para el ingreso de clientes y socios comerciales públicos en Internet.
>
> **Trampa de examen:**
> Si el escenario exige IPs estáticas para safelisting y conmutación por error en menos de un minuto sin depender de la caché DNS de los clientes, la respuesta siempre es AWS Global Accelerator.

---

## Pregunta 6 de 50: Auditoría inmutable de CloudTrail hacia una cuenta central de Log Archive

*Dominio 1 · Tarea: 1.2 — Prescribir controles de seguridad y gobernanza*

### Enunciado

A regulated enterprise with 80 AWS accounts in AWS Organizations must centralize all API activity logs. The compliance framework mandates that all management and data events across all accounts and Regions must be logged and stored in a dedicated Log Archive AWS account in a central S3 bucket. Neither account administrators in member accounts nor the AWS Organizations management account root user may be able to modify, delete, or shorten the retention period of the stored logs for 10 years. CloudTrail log files must be encrypted with a Customer Managed Key (CMK) in AWS KMS. Which solution satisfies these requirements?

### Opciones de respuesta

- A. In the Log Archive account, create an S3 bucket with S3 Object Lock enabled in compliance mode with a 10-year default retention period. Create a KMS CMK with a key policy allowing cloudtrail.amazonaws.com to generate data keys. In the management account, create an organization trail with the IncludeGlobalServiceEvents and IsMultiRegionTrail flags enabled, pointing to the central S3 bucket in the Log Archive account and configured with the KMS CMK.
- B. In the management account, create a central S3 bucket with S3 Versioning and S3 Lifecycle rules configured to transition objects to S3 Glacier Flexible Retrieval after 30 days and delete after 10 years. Encrypt the bucket with the default AWS managed key aws/s3.
- C. In the Log Archive account, create an S3 bucket with S3 Object Lock in governance mode for 10 years. Attach an SCP to the organization root that denies s3:Delete actions on the log bucket ARN.
- D. Configure Amazon CloudWatch Logs log groups in each account with a 10-year retention policy. Use CloudWatch metric filters to send all log events to Amazon Kinesis Data Firehose in the Log Archive account.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> S3 Object Lock en Compliance Mode garantiza que absolutamente nadie, incluido el usuario root de la cuenta de gestión o de la cuenta de archivo, pueda borrar objetos ni reducir el período de retención durante los 10 años. Un Organization Trail multi-región captura todos los eventos automáticamente, y una clave KMS CMK con la política adecuada permite a CloudTrail cifrar los registros entre cuentas.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** S3 Versioning y Lifecycle sin Object Lock Compliance Mode no impiden que un administrador o usuario root borre permanentemente versiones de objetos. Además, la clave administrada aws/s3 no admite políticas de clave personalizadas para cruce de cuentas.
> - **Opción C:** Governance Mode permite que usuarios con permisos de bypass eliminen objetos. Además, los SCPs no aplican al usuario root de la cuenta de gestión.
> - **Opción D:** Mantener 10 años de retención en CloudWatch Logs para 80 cuentas genera un costo astronómico de almacenamiento comparado con S3 y no provee el estándar legal de inmutabilidad de Object Lock Compliance Mode.
>
> **Trampa de examen:**
> S3 Object Lock en Governance Mode admite bypass; solo Compliance Mode garantiza inmutabilidad absoluta donde ni el usuario root puede eliminar o alterar los archivos de auditoría.

---

## Pregunta 7 de 50: Inspección centralizada de salida a Internet con AWS Network Firewall

*Dominio 1 · Tarea: 1.1 — Diseñar estrategias de conectividad de redes*

### Enunciado

A retail company hosts microservices across 50 production VPCs. All microservices require outbound Internet access to communicate with third-party payment gateways and external APIs. Direct outbound access from production VPCs via local Internet Gateways is strictly prohibited. All outbound Internet traffic must be filtered using stateful domain name (FQDN) allowlists and deep packet inspection. The solution must minimize NAT Gateway hourly charges and scale seamlessly without deploying individual NAT Gateways in every VPC. Which network architecture should the solutions architect implement?

### Opciones de respuesta

- A. In each of the 50 VPCs, deploy an AWS Network Firewall and a NAT Gateway in a public subnet. Configure Network Firewall domain allowlists locally in each VPC.
- B. In each production VPC, create a VPC peering connection to a centralized Proxy VPC hosting an Auto Scaling group of Squid proxy instances. Route all traffic through the proxy instances.
- C. In a dedicated Network Egress account, deploy a centralized Egress VPC connected to a regional AWS Transit Gateway. In the Egress VPC, launch AWS Network Firewall across multiple Availability Zones, with dedicated NAT Gateways in public subnets routing through an Internet Gateway. In the Transit Gateway route table, set the default route (0.0.0.0/0) to point to the Egress VPC attachment. In the Egress VPC route tables, route traffic from the Transit Gateway through the AWS Network Firewall endpoints before directing it to the NAT Gateways.
- D. Attach an Internet Gateway to each production VPC. Configure egress-only Internet Gateways and security groups with outbound rules restricted to specific public IP addresses.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Centralizar la salida a Internet en una Egress VPC conectada a Transit Gateway evita desplegar NAT Gateways redundantes en cada una de las 50 VPCs, reduciendo drásticamente los costos fijos por hora. AWS Network Firewall en la Egress VPC inspecciona los flujos salientes aplicando reglas con estado para permitir solo los nombres de dominio autorizados (FQDN allowlists) antes de pasar por los NAT Gateways hacia el Internet Gateway.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Desplegar Network Firewall y NAT Gateways en cada una de las 50 VPCs (150+ dispositivos en total) multiplica enormemente los costos operativos y de licenciamiento.
> - **Opción B:** VPC peering no soporta enrutamiento transitivo a través de proxies sin complejidad extrema, y administrar clústeres Squid en EC2 genera gran sobrecarga de mantenimiento.
> - **Opción D:** Los Egress-only Internet Gateways son exclusivamente para tráfico IPv6; no funcionan con IPv4. Además, las IPs de APIs externas son dinámicas y no pueden filtrarse por Security Groups estáticos.
>
> **Trampa de examen:**
> Para reducir costos de NAT Gateway y centralizar el filtrado de dominios: centraliza el tráfico saliente en una Egress VPC con AWS Network Firewall y NAT Gateways compartidos mediante Transit Gateway.

---

## Pregunta 8 de 50: ABAC dinámico a escala con IAM Identity Center y proveedor de identidad

*Dominio 1 · Tarea: 1.2 — Prescribir controles de seguridad y gobernanza*

### Enunciado

An enterprise has 200 AWS accounts organized by project teams in AWS Organizations. The enterprise has 3,000 developers who authenticate using an external corporate identity provider integrated with AWS IAM Identity Center via SAML 2.0. The security team currently manages over 400 static permission sets, which has become unmaintainable. The security team wants to transition to an Attribute-Based Access Control (ABAC) model so that developers can only manage AWS resources that belong to their assigned CostCenter and Project tags, and developers must not be able to modify or delete the tags on resources they create. Which combination of steps will achieve this requirement with the LEAST operational overhead?

### Opciones de respuesta

- A. In each of the 200 accounts, create custom IAM policies for each developer listing their allowed resources by ARN. Update the policies daily using an automated Lambda script reading from an S3 CSV file.
- B. In IAM Identity Center, create one permission set for every CostCenter and Project combination. Assign users to the permission sets based on their Active Directory security groups.
- C. In AWS Organizations, create an SCP that denies all access if the user's IAM role name does not match the tag on the EC2 instance or S3 bucket.
- D. In IAM Identity Center, configure Attributes for access control to map the CostCenter and Project attributes from the IdP SAML assertion. Create a single consolidated IAM Identity Center permission set with a policy that allows actions conditioned on aws:PrincipalTag/CostCenter matching aws:ResourceTag/CostCenter and aws:PrincipalTag/Project matching aws:ResourceTag/Project. In the policy, add a Deny statement for tag:UntagResources and DeleteTags on resources where the tags match, and enforce aws:RequestTag conditions on resource creation APIs.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> El modelo ABAC en IAM Identity Center permite reemplazar cientos de permission sets estáticos por uno solo. Mapea los atributos del IdP a tags de principal (aws:PrincipalTag) y los compara en tiempo de ejecución con las etiquetas del recurso (aws:ResourceTag). Denegar tag:UntagResources y exigir aws:RequestTag en la creación evita que los usuarios eludan el control de acceso eliminando o alterando las etiquetas.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Gestionar políticas basadas en roles con ARNs fijos en 200 cuentas genera miles de políticas estáticas imposibles de mantener y satura los límites de IAM.
> - **Opción B:** Crear un permission set para cada combinación de CostCenter y Project es RBAC tradicional y multiplicaría los conjuntos de permisos a cientos, aumentando la carga operativa.
> - **Opción C:** Los SCPs no evalúan de forma dinámica las comparaciones entre tags de principal SAML y tags de recursos con la granularidad necesaria para controlar accesos internos a nivel de API.
>
> **Trampa de examen:**
> ABAC canónico en AWS: Mapea atributos en Attributes for access control de IAM Identity Center y usa una sola política comparando aws:PrincipalTag con aws:ResourceTag, colapsando cientos de permission sets.

---

## Pregunta 9 de 50: Gobernanza de compromisos de ahorro (Savings Plans / RIs) entre cuentas

*Dominio 1 · Tarea: 1.5 — Determinar estrategias de visibilidad y optimización de costos*

### Enunciado

A digital media enterprise operates 40 AWS accounts under a single consolidated billing organization in AWS Organizations. The accounts are divided into two Organizational Units (OUs): Production and Development. The enterprise purchases Compute Savings Plans and EC2 Instance Savings Plans in a designated FinOps billing account. Recently, the FinOps team discovered that idle or low-priority EC2 instances in the Development OU are automatically absorbing the Savings Plans discounts, leaving mission-critical production workloads in the Production OU paying on-demand rates. The enterprise needs to ensure that Production workloads receive first priority for discounts, Development accounts do not consume discounts intended for Production, and the solution requires the LEAST administrative effort. Which solution will achieve this goal?

### Opciones de respuesta

- A. In the AWS Billing and Cost Management console of the management account, navigate to Preferences and turn off discount sharing for all accounts in the Development OU. Keep discount sharing enabled between the FinOps account and accounts in the Production OU.
- B. Create an SCP attached to the Development OU that denies ec2:RunInstances for any instance type covered by a Savings Plan or Reserved Instance.
- C. Move the Development accounts out of the current AWS Organization into a completely separate standalone billing account without AWS Organizations.
- D. In AWS Budgets, configure a budget action in each Development account that automatically stops EC2 instances when their usage exceeds 500 dollars per month.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> En AWS Organizations con Consolidated Billing, la funcionalidad nativa de Discount Sharing (Uso compartido de descuentos de RI y Savings Plans) permite desactivar el beneficio para cuentas específicas (en este caso, la OU Development). Esto garantiza que las instancias de desarrollo nunca absorban los descuentos comprados por FinOps, canalizando el 100% del beneficio hacia las cuentas de Production con solo un clic en la consola de facturación.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Un SCP que prohíba tipos de instancias impide a los desarrolladores usar las instancias necesarias para sus pruebas y no resuelve la lógica de distribución financiera de descuentos.
> - **Opción C:** Mover las cuentas fuera de la organización destruye la gobernanza centralizada, los guardrails de SCP, la visibilidad común y los descuentos por volumen de la factura unificada.
> - **Opción D:** Detener instancias no evita que, mientras estén encendidas, consuman las horas de descuento de Savings Plans en tiempo real antes que las de producción.
>
> **Trampa de examen:**
> Para evitar que cuentas secundarias (Dev/Test) consuman Savings Plans o RIs corporativos: desactiva el Discount Sharing en las preferencias de facturación de la cuenta de gestión.

---

## Pregunta 10 de 50: Replicación transaccional activa-activa con Amazon DynamoDB Global Tables

*Dominio 1 · Tarea: 1.3 — Diseñar arquitecturas fiables y resilientes a escala*

### Enunciado

A global retail platform requires a multi-region active-active database layer across us-east-1 and eu-west-1 to support local low-latency read and write operations. The business requirements mandate an RPO of less than 1 second and an RTO of less than 5 seconds in the event of a regional outage, automatic conflict resolution without custom application reconciliation code, encryption at rest using Customer Managed Keys (CMKs) in each Region, and minimal operational overhead to manage database replication and failover. Which solution meets these requirements?

### Opciones de respuesta

- A. Deploy Amazon Aurora PostgreSQL in us-east-1. Create an Aurora read replica in eu-west-1. In the application code, implement write-forwarding to send all write requests from Europe to the US endpoint.
- B. Deploy an Amazon DynamoDB Global Table with replica tables in us-east-1 and eu-west-1. Configure each regional replica table to use a customer managed key (CMK) in its respective Region. The application in each Region writes to its local replica table.
- C. Deploy DynamoDB tables in each Region. Deploy AWS Lambda functions triggered by DynamoDB Streams in both Regions to replicate changes bidirectionally across Regions using cross-region API calls.
- D. Deploy Amazon DocumentDB Multi-Region clusters with bidirectional Apache Kafka replication deployed on Amazon EC2 instances across both Regions.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> Amazon DynamoDB Global Tables proporciona replicación multimaestro bidireccional completamente gestionada con latencias de propagación sub-segundo (RPO < 1s). Cuenta con resolución nativa de conflictos (Last-Writer-Wins) sin código custom. Admite cifrado CMK regional en cada réplica y al ser activo-activo simétrico, el failover ante caída regional es casi instantáneo (RTO ~0).
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Aurora con write-forwarding es activo-pasivo; las escrituras desde Europa sufren alta latencia de ida y vuelta transatlántica y el failover requiere promover la réplica (tardando minutos, violando el RTO de 5 seg).
> - **Opción C:** Replicar bidireccionalmente con Lambda y DynamoDB Streams añade gran complejidad operativa, latencia y riesgo de bucles infinitos de replicación que Global Tables ya resuelve de forma nativa.
> - **Opción D:** Administrar un clúster Kafka en EC2 para replicación de bases de datos genera una altísima carga de mantenimiento y no ofrece la disponibilidad gestionada de DynamoDB Global Tables.
>
> **Trampa de examen:**
> DynamoDB Global Tables es la solución nativa para bases de datos Active-Active Multi-Region con RPO < 1s y RTO ~0, resolución Last-Writer-Wins automática y soporte de CMKs independientes por región.

---


# Bloque 2: Dominio 2

## Pregunta 11 de 50: Actualización mayor de motor de base de datos sin tiempo de inactividad

*Dominio 2 · Tarea: 2.1 — Diseñar estrategias de despliegue*

### Enunciado

A critical financial application uses an Amazon Aurora PostgreSQL cluster. The company must perform a major engine version upgrade to access new compliance features. The application cannot tolerate more than 1 minute of downtime during the cutover window. Furthermore, the company requires a rollback strategy that preserves zero data loss in case unexpected application incompatibilities arise after the cutover. Which deployment strategy meets these requirements with the LEAST operational effort?

### Opciones de respuesta

- A. Create a manual snapshot of the Aurora cluster. Restore the snapshot into a new cluster with the upgraded major version. Perform application testing and manually switch the application connection string to the new cluster.
- B. Use AWS DMS to perform a full load and continuous replication to a newly provisioned Aurora cluster running the upgraded version. Drop the DMS task during the maintenance window and point the application to the new endpoint.
- C. Use Amazon Aurora Blue/Green Deployments to create a green environment with the target major engine version. Perform validation on the green environment. Initiate switchover to the green environment, ensuring that the blue environment remains intact for rollback.
- D. Modify the existing Aurora cluster in-place using the AWS CLI with the apply-immediately flag set to true. Monitor the upgrade through Amazon CloudWatch metrics.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Amazon Aurora Blue/Green Deployments crea un entorno de prueba duplicado y mantiene la replicación lógica sincronizada sin pérdida de datos. La conmutación (switchover) toma típicamente menos de 1 minuto (a menudo bajo 30 segundos) mediante guardrails de tiempo y conmutación de nombres DNS integrados. Si surge un problema, el entorno Blue original se mantiene disponible para un rollback seguro.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Restaurar un snapshot para un volumen grande toma horas y no replica los datos que sigan escribiéndose durante el proceso, generando pérdida de datos o tiempos de corte extensos.
> - **Opción B:** Configurar DMS manualmente con esquemas y tablas LOB complejas requiere alta sobrecarga de configuración y validación en comparación con la función nativa de Blue/Green Deployments de Aurora.
> - **Opción D:** Una actualización in-place con apply-immediately de una versión mayor bloquea la base de datos durante varios minutos o decenas de minutos, violando el límite de 1 minuto de inactividad, y no ofrece marcha atrás directa sin restaurar un snapshot.
>
> **Trampa de examen:**
> Para actualizaciones mayores de versión en Aurora o RDS con tiempo de inactividad mínimo (< 1 minuto) y rollback seguro: la solución nativa recomendada es Amazon RDS/Aurora Blue/Green Deployments.

---

## Pregunta 12 de 50: Disaster Recovery multirregión para clústeres de contenedores con GitOps

*Dominio 2 · Tarea: 2.2 — Diseñar soluciones de continuidad de negocio*

### Enunciado

A travel booking portal operates on an Amazon EKS cluster in us-east-1. The portal requires a cross-region Disaster Recovery strategy to eu-central-1 with an RTO of less than 5 minutes and an RPO of less than 1 minute. The application manifests and configurations are managed in Git repositories. The database is already using Amazon DynamoDB Global Tables. Which architecture provides the required failover capability with the LEAST operational overhead?

### Opciones de respuesta

- A. Provision a standby Amazon EKS cluster in eu-central-1. Deploy a GitOps operator in both clusters synchronizing deployments from the Git repository. Use Amazon Route 53 Application Recovery Controller (ARC) routing controls and health checks to govern automated traffic shifting between Regions.
- B. Create an AWS Lambda function that triggers during a regional failure to execute aws eks create-cluster via the AWS CLI in eu-central-1 and deploys all application pods using kubectl.
- C. Use AWS Backup to take hourly snapshots of the EKS cluster worker node EBS volumes in us-east-1. In the event of a disaster, restore the EBS volumes in eu-central-1 and launch new EC2 instances.
- D. Deploy a single EKS cluster spanning worker nodes across both us-east-1 and eu-central-1 across an inter-region VPC peering connection. Configure pod topology spread constraints to balance replicas.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Tener un clúster standby activo gobernado por GitOps (como ArgoCD o Flux) asegura que la infraestructura de contenedores esté idéntica y lista en todo momento sin retrasos de aprovisionamiento. Route 53 Application Recovery Controller (ARC) provee conmutadores de enrutamiento altamente confiables en plano de datos que ejecutan el desvío de tráfico en segundos sin depender del plano de control de Route 53, cumpliendo sobradamente el RTO < 5 min.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Crear un clúster EKS desde cero toma entre 10 y 15 minutos solo para el plano de control, lo que viola directamente el RTO de 5 minutos.
> - **Opción C:** Restaurar volúmenes EBS de nodos EKS entre regiones no recupera el plano de control gestionado de Kubernetes ni recrea las definiciones de pods y servicios de forma confiable.
> - **Opción D:** Los clústeres de Amazon EKS son regionales y no pueden extender nodos de trabajo hacia otra región de AWS; los planos de control de EKS no operan en modo multi-región stretch.
>
> **Trampa de examen:**
> Amazon EKS es un servicio regional y no puede extenderse entre regiones. Para RTO < 5 min, usa un clúster standby pre-aprovisionado sincronizado mediante GitOps y gestionado por Route 53 ARC.

---

## Pregunta 13 de 50: Diseño de API segura con autenticación mTLS y rotación de credenciales

*Dominio 2 · Tarea: 2.3 — Determinar controles de seguridad según requerimientos*

### Enunciado

An enterprise B2B service exposes a REST API to external corporate partners. To meet strict regulatory banking requirements, the architecture must enforce mutual TLS (mTLS) authentication with custom client certificates, inspect requests for OWASP Top 10 web vulnerabilities, prevent public exposure of the backend microservices hosted on EC2 instances in private subnets, and automatically rotate backend database credentials every 30 days without downtime. Which solution will meet these requirements?

### Opciones de respuesta

- A. Deploy an Application Load Balancer in public subnets with an mTLS listener. Route traffic directly to the private EC2 instances. Use AWS Systems Manager Parameter Store with an EC2 cron job to rotate database passwords.
- B. Deploy an Amazon CloudFront distribution with AWS WAF attached. Configure CloudFront origin request policies to validate client certificates. Store database credentials in an S3 bucket encrypted with SSE-S3.
- C. Configure a Network Load Balancer with TLS termination and pass client certificates to backend EC2 instances in HTTP headers. Configure AWS Secrets Manager to store credentials and use an EventBridge scheduled rule to trigger an EC2 reboot.
- D. Deploy an Amazon API Gateway regional REST API with a custom domain name configured for mutual TLS (mTLS) using an S3 truststore. Associate an AWS WAF web ACL with the API Gateway. Configure a VPC Link from API Gateway to an internal Network Load Balancer in front of the private EC2 instances. Store database credentials in AWS Secrets Manager and enable automatic rotation using a pre-configured AWS Lambda rotation function.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Amazon API Gateway soporta mTLS de forma nativa en nombres de dominio personalizados validando certificados contra un truststore en S3. La integración con AWS WAF bloquea ataques OWASP Top 10. El uso de VPC Link permite comunicarse con servicios internos en subredes privadas sin exponerlos a Internet. AWS Secrets Manager con una función Lambda de rotación nativa rota credenciales de base de datos de manera transparente y sin tiempo de inactividad.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Parameter Store no tiene rotación automática administrada de base de datos nativa con doble secret (como Secrets Manager) y los cron jobs en EC2 causan inconsistencias y tiempos de caída.
> - **Opción B:** CloudFront por sí solo no termina mTLS validando un truststore de clientes corporativos de la misma manera que API Gateway mTLS nativo. Guardar credenciales en texto plano en S3 es una violación grave de seguridad.
> - **Opción C:** Pasar certificados en headers HTTP tras terminación en NLB es propenso a suplantación si no se firma criptográficamente, y reiniciar instancias EC2 para rotar credenciales provoca disrupción del servicio.
>
> **Trampa de examen:**
> Para APIs con requerimiento de mutual TLS (mTLS) e integración con microservicios privados: usa Amazon API Gateway con dominio mTLS (S3 truststore) + VPC Link hacia un NLB interno + AWS Secrets Manager para rotación sin downtime.

---

## Pregunta 14 de 50: Arquitectura desacoplada de alta resiliencia con procesamiento por lotes parcial

*Dominio 2 · Tarea: 2.4 — Diseñar estrategias para cumplir requerimientos de fiabilidad*

### Enunciado

An e-commerce platform processes high-priority order requests that must be processed strictly in the order they are received, without duplicates. The orders are processed in batches of 10 by an AWS Lambda function. If a single order within a batch fails due to an unexpected transient error, only the failing order should be retried, while successfully processed orders in the same batch must not be reprocessed. Unprocessable orders after 5 retries must be moved to secondary storage for forensic analysis without blocking the main processing stream. Which solution meets these requirements with the LEAST operational overhead?

### Opciones de respuesta

- A. Publish orders to an Amazon Kinesis Data Stream. Configure a Lambda event source mapping with a batch size of 10. Write custom application logic to check DynamoDB idempotency keys before processing each record.
- B. Send orders to an Amazon SQS FIFO queue with a Dead Letter Queue (DLQ) configured with maxReceiveCount set to 5. Configure the Lambda event source mapping with ReportBatchItemFailures enabled. In the Lambda function, return the batchItemFailures list containing the message IDs of only the failed items.
- C. Send orders to an Amazon SQS Standard queue. Configure a Lambda trigger with a batch size of 10. In the function catch block, delete all messages from the queue except the failed message ID.
- D. Send orders to an Amazon SNS FIFO topic that fan-out to 10 standard SQS queues. Configure Lambda to process one queue per worker with exponential backoff retries.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> SQS FIFO garantiza orden estricto (First-In, First-Out) y procesamiento exactamente una vez (de-duplicación). La funcionalidad ReportBatchItemFailures en el event source mapping de Lambda permite devolver solo los IDs de los mensajes que fallaron, de modo que SQS reintente exclusivamente esos mensajes individuales sin volver a ejecutar los 9 mensajes exitosos del lote. El DLQ con maxReceiveCount=5 aísla los mensajes venenosos sin bloquear la cola FIFO.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Kinesis procesa particiones completas; si un registro falla en una partición Kinesis, todo el shard se bloquea hasta que el registro pase o expire (a menos que se divida el lote), requiriendo lógica de idempotencia custom compleja.
> - **Opción C:** SQS Standard no garantiza orden estricto (puede entregar mensajes desordenados y duplicados). Además, borrar mensajes manualmente en el código en lugar de usar ReportBatchItemFailures es ineficiente y propenso a errores.
> - **Opción D:** Fan-out a 10 colas estándar rompe el orden de los mensajes en el procesamiento y añade una sobrecarga innecesaria de recursos.
>
> **Trampa de examen:**
> Para lotes de Lambda con SQS (especialmente FIFO): siempre usa ReportBatchItemFailures para devolver los messageId fallidos y evitar que los mensajes exitosos se reprocesen innecesariamente.

---

## Pregunta 15 de 50: Almacenamiento de ultra-alto rendimiento para cómputo genómico intensivo

*Dominio 2 · Tarea: 2.5 — Diseñar soluciones para cumplir objetivos de rendimiento*

### Enunciado

A biotechnology research institute runs genomic sequencing workloads on a cluster of Amazon EC2 instances in an Auto Scaling group. The workload requires sub-millisecond file system latency, hundreds of thousands of IOPS, and several gigabytes per second of throughput against shared data sets that are currently stored in an Amazon S3 bucket. The analysis runs periodically for 48-hour bursts. The solution must provide high-performance POSIX file access and synchronize data back to Amazon S3 automatically with minimal management. Which storage architecture should be deployed?

### Opciones de respuesta

- A. Deploy an Amazon FSx for Lustre persistent file system linked to the Amazon S3 bucket with an automated data repository association (DRA) to import and export changes. Mount the FSx for Lustre file system across all EC2 worker instances.
- B. Deploy an Amazon Elastic File System (EFS) file system with General Purpose performance mode and provisioned throughput. Mount the EFS file system via NFS on all instances and run an rsync script to transfer files to S3.
- C. Create an Amazon EBS Provisioned IOPS SSD (io2 Block Express) volume of 64 TB. Attach the EBS volume to an EC2 instance and share it with the cluster using a Samba Windows share.
- D. Configure EC2 instances with local NVMe Instance Store SSDs. Write a custom daemon that continuously downloads objects from S3 using the AWS CLI and uploads results using multipart uploads.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Amazon FSx for Lustre está diseñado específicamente para cargas de trabajo HPC, aprendizaje automático y procesamiento genómico, ofreciendo latencias de sub-milisegundo, millones de IOPS y cientos de GB/s de rendimiento. Su integración nativa con Amazon S3 mediante Data Repository Association (DRA) sincroniza archivos bidireccionalmente de forma automática y transparente sin scripts externos.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Amazon EFS tiene latencias de varios milisegundos y un modelo de throughput más costoso para cargas HPC que demandan gigabytes por segundo continuos. Además, usar rsync para sincronizar con S3 es ineficiente y propenso a fallas.
> - **Opción C:** EBS io2 Block Express es un almacenamiento en bloque que solo puede montarse como Multi-Attach en modo compartido por un número muy limitado de instancias (máximo 16) y requiere un cluster file system no nativo como GFS2. Samba añade un cuello de botella severo.
> - **Opción D:** Usar daemons personalizados para transferir archivos entre Instance Store y S3 reinventa la rueda, carece de la interfaz POSIX compartida entre instancias y añade una sobrecarga operativa extrema.
>
> **Trampa de examen:**
> Cargas de trabajo HPC, ML o genómica que requieren acceso POSIX compartido, millones de IOPS, GB/s de throughput y sincronización nativa con S3: la respuesta es siempre Amazon FSx for Lustre.

---

## Pregunta 16 de 50: Procesamiento de imágenes costo-eficiente con escalado elástico y Spot

*Dominio 2 · Tarea: 2.6 — Determinar estrategias de optimización de costos*

### Enunciado

A digital photography company processes over 500,000 raw image uploads daily. The processing pipeline is asynchronous: users upload images to an Amazon S3 bucket, and processed thumbnails and metadata must be generated within 4 hours. The volume of uploads fluctuates wildly throughout the day, with major peaks during evening hours. The company runs containerized image processing workers on Amazon EKS. Which combination of architectural choices will minimize compute and storage costs while maintaining the 4-hour SLA?

### Opciones de respuesta

- A. Configure an S3 event notification to trigger AWS Lambda functions for all images. Run the Lambda functions with maximum memory (10,240 MB) and configure Provisioned Concurrency to absorb peak hours.
- B. Deploy Amazon EKS worker nodes on EC2 On-Demand instances using an Auto Scaling group managed by the Kubernetes Cluster Autoscaler with a fixed minimum size of 20 instances. Store all images in S3 Standard.
- C. Configure S3 event notifications to send upload events to an Amazon SQS queue. In the EKS cluster, deploy Karpenter to automatically provision EC2 Spot instances using diverse instance types based on queue depth. Store raw images in Amazon S3 with an S3 Lifecycle rule to transition objects to S3 Intelligent-Tiering immediately.
- D. Purchase 3-year EC2 Reserved Instances for the peak evening capacity. Configure the worker pods with static CPU requests and deploy them on dedicated EC2 hosts.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> El uso de una cola SQS desacopla la ingesta de las subidas y actúa como búfer natural para el SLA holgado de 4 horas. Karpenter escala rápidamente nodos EC2 Spot diversificados según la profundidad de la cola, ahorrando hasta un 90% en costos de cómputo frente a On-Demand. S3 Intelligent-Tiering optimiza el costo del almacenamiento automáticamente sin penalizaciones de recuperación.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Provisioned Concurrency en Lambda cobra por capacidad ociosa las 24 horas del día, lo que resulta sumamente costoso para cargas que fluctúan y no requieren procesamiento en tiempo real.
> - **Opción B:** Mantener 20 instancias On-Demand como mínimo fijo genera un gasto inútil en horas valle cuando no hay procesamiento activo.
> - **Opción D:** Comprar Reserved Instances a 3 años basadas en la capacidad del pico nocturno obliga a pagar por capacidad ociosa durante la mayor parte del día, lo que es la antítesis de la optimización de costos.
>
> **Trampa de examen:**
> Cargas por lotes desacopladas con ventanas de tiempo holgadas (horas) y picos variables: la combinación más costo-eficiente es SQS + EC2 Spot (con Karpenter o Auto Scaling mixto) + S3 Intelligent-Tiering.

---

## Pregunta 17 de 50: Segmentación de red corporativa a escala global con AWS Cloud WAN

*Dominio 2 · Tarea: 2.3 — Determinar controles de seguridad según requerimientos*

### Enunciado

An enterprise has a global cloud footprint across 4 AWS Regions and 6 on-premises corporate offices connected via AWS Direct Connect. The enterprise needs to establish isolated network segments for Production, Development, and Corporate Shared Services across all Regions and on-premises environments. Security mandates that Development workloads must never be able to reach Production workloads, but both must reach Shared Services. The enterprise wants to manage global network routing and segmentation policies centrally through declarative policy documents rather than managing regional Transit Gateway route tables individually. Which solution should be implemented?

### Opciones de respuesta

- A. Deploy a mesh of VPC peering connections across all Regions and accounts. Use Security Groups in each VPC with IP prefix lists to restrict traffic between Development and Production CIDRs.
- B. Deploy AWS Cloud WAN with a global central network. Define segments for Production, Development, and SharedServices in a central core network policy document. Configure routing rules within the policy to allow Production and Development to route only to SharedServices while isolating them from each other. Attach regional VPCs and Direct Connect gateways to the appropriate core network segments.
- C. Deploy an AWS Transit Gateway in each Region. Peer all Transit Gateways together in a full mesh. In each Transit Gateway, create separate route tables for Production and Development. Use AWS Systems Manager to manually copy route table entries between Regions.
- D. Deploy an AWS Network Firewall in every VPC. Configure firewall rules locally in each account to block any traffic originating from the Development CIDR block.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS Cloud WAN proporciona un modelo de red global administrado basado en políticas declarativas (Core Network Policy). Permite definir segmentos aislados (Production, Development, SharedServices) a escala multirregión e híbrida desde un único documento centralizado, eliminando la sobrecarga operativa de coordinar y sincronizar tablas de ruteo complejas en múltiples Transit Gateways individuales.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** La malla de VPC peering inter-región no escala a múltiples cuentas y regiones, y los Security Groups por sí solos no aíslan los segmentos a nivel de enrutamiento troncal.
> - **Opción C:** Administrar manualmente mallas de Transit Gateways y sincronizar tablas de rutas con scripts o SSM en 4 regiones genera una complejidad operativa inmensa y propensa a desincronizaciones.
> - **Opción D:** Desplegar Network Firewall en cada VPC es extremadamente costoso y descentralizado; las restricciones de segmentación deben aplicarse a nivel de arquitectura de red WAN, no en cada VPC individual.
>
> **Trampa de examen:**
> Para segmentación y gobernanza de red WAN multirregión e híbrida declarativa desde un único documento de política: la respuesta es AWS Cloud WAN (Core Network con Segments).

---

## Pregunta 18 de 50: Arquitectura orientada a eventos multirregión con conmutación automática de buses

*Dominio 2 · Tarea: 2.4 — Diseñar estrategias para cumplir requerimientos de fiabilidad*

### Enunciado

A banking institution is designing an event-driven architecture that ingests financial transaction events from mobile applications. The architecture must run across us-east-1 and us-west-2 in an active-active configuration. If event ingestion in the primary Region degrades or experiences an outage, incoming events must automatically be ingested and routed in the secondary Region without requiring mobile clients to update their configuration. Which solution meets these requirements with the LEAST operational effort?

### Opciones de respuesta

- A. Deploy an Amazon API Gateway in both Regions that writes events directly to an Amazon Kinesis Data Stream in each Region. Use a Route 53 latency record pointing to the API Gateways.
- B. Create a custom Amazon EventBridge event bus in each Region. Configure an AWS Lambda function on a schedule that tests the bus and updates Route 53 DNS records using the AWS SDK if failures are detected.
- C. Deploy an Amazon SQS queue in each Region. Configure an Application Load Balancer in each Region to forward events to the local SQS queue, and use VPC Peering to synchronize the queues.
- D. Create an Amazon EventBridge global endpoint that spans event buses in us-east-1 and us-west-2. Configure an Amazon Route 53 health check to monitor the health of the primary bus and manage automatic failover. Direct the mobile clients to publish events to the EventBridge global endpoint.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Amazon EventBridge Global Endpoints proporciona un endpoint DNS administrado único y global. Monitorea la salud de la ingesta en la región primaria mediante un Route 53 health check y conmuta automáticamente el tráfico de eventos al bus de eventos de la región secundaria ante fallos, sin requerir cambios en el código de los clientes móviles ni lógica custom.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Route 53 por latencia distribuye tráfico por cercanía pero no realiza failover determinista de eventos sin caídas y requiere construir capas intermedias de ingesta en API Gateway.
> - **Opción B:** Construir funciones Lambda custom para comprobar la salud y modificar registros DNS es frágil, lento y añade sobrecarga operativa innecesaria frente a la característica nativa de Global Endpoints.
> - **Opción C:** Las colas SQS son estrictamente regionales y no pueden sincronizarse directamente sobre VPC peering sin código consumidor-productor bidireccional complejo.
>
> **Trampa de examen:**
> Para ingesta de eventos multirregión con conmutación automática por error gestionada y endpoint único para los clientes: usa Amazon EventBridge Global Endpoints.

---

## Pregunta 19 de 50: Caché de ultra-baja latencia con persistencia de datos en memoria para transacciones

*Dominio 2 · Tarea: 2.5 — Diseñar soluciones para cumplir objetivos de rendimiento*

### Enunciado

A gaming platform requires an in-memory data store for live player sessions and leaderboards. The data store must provide microsecond read latency and single-digit millisecond write latency, support complex data structures (sets, sorted sets, hashes), ensure zero data loss across Multi-AZ failures with transactional ACID durability, and support automatic failover. The company does not want to manage Redis replication lag or write append-only files (AOF) manually. Which service will meet these requirements?

### Opciones de respuesta

- A. Amazon MemoryDB for Redis
- B. Amazon ElastiCache for Memcached with Multi-AZ
- C. Amazon DynamoDB with DynamoDB Accelerator (DAX)
- D. Amazon RDS for PostgreSQL with an in-memory tempfs storage engine

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Amazon MemoryDB for Redis es una base de datos en memoria totalmente compatible con Redis que utiliza un registro transaccional distribuido multizona (Multi-AZ Transaction Log) para garantizar durabilidad ACID y consistencia sin pérdida de datos en failovers, combinando la velocidad en microsegundos de Redis con la durabilidad de una base de datos primaria.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Memcached no soporta Multi-AZ ni replicación nativa de failover automático, ni tampoco estructuras de datos avanzadas como sorted sets o hashes.
> - **Opción C:** DAX solo almacena en caché lecturas de DynamoDB en memoria; no proporciona la API nativa de Redis ni sus tipos de datos complejos para tablas de clasificación (leaderboards con ZADD/ZRANGE).
> - **Opción D:** Montar PostgreSQL en tempfs en memoria destruye la durabilidad de los datos ante reinicios o fallos de instancias y no es una solución administrada para estructuras de datos de Redis.
>
> **Trampa de examen:**
> Diferencia clave: ElastiCache for Redis es un caché con persistencia secundaria (puede perder datos en failover); MemoryDB for Redis es una base de datos primaria en memoria con durabilidad transaccional ACID y cero pérdida de datos.

---

## Pregunta 20 de 50: Replicación asíncrona entre regiones para Amazon OpenSearch Service

*Dominio 2 · Tarea: 2.2 — Diseñar soluciones de continuidad de negocio*

### Enunciado

An online catalog application uses an Amazon OpenSearch Service domain in us-east-1 for search indexing and analytics. To meet business continuity standards, the company requires an active-standby disaster recovery solution in us-west-2 with an RPO of less than 15 minutes. The secondary domain must be continuously synchronized with index changes from the primary domain and must be capable of serving search queries immediately if the primary Region experiences an outage. Which solution should the solutions architect recommend?

### Opciones de respuesta

- A. Schedule hourly automated snapshots of the primary OpenSearch domain to an S3 bucket in us-east-1. Use S3 Cross-Region Replication (CRR) to copy the snapshots to us-west-2. Restore the domain from the snapshot when a disaster occurs.
- B. Configure an Amazon Kinesis Data Firehose delivery stream in us-east-1 with dual endpoints that write concurrently to both OpenSearch domains.
- C. Set up an Amazon OpenSearch Service domain in us-west-2. Establish a cross-cluster connection between the two domains and configure Cross-Cluster Replication (CCR) for the relevant indexes. In the secondary domain, monitor the replication lag and use the follower indexes for immediate read failover.
- D. Deploy an AWS Lambda function triggered by Amazon CloudWatch Logs to read data from the primary OpenSearch domain and index it into the secondary domain.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> La replicación entre clústeres (Cross-Cluster Replication - CCR) de Amazon OpenSearch Service permite replicar índices de forma asíncrona y continua desde un clúster líder (leader) a un clúster seguidor (follower) en otra región con latencias de propagación de pocos segundos (RPO < 15 min). El clúster seguidor está activo y listo para atender consultas de búsqueda de inmediato ante una contingencia.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Restaurar snapshots de OpenSearch entre regiones toma horas (violando el RTO) y las copias horarias exceden el RPO requerido de 15 minutos.
> - **Opción B:** Dual writing con Firehose no garantiza la sincronización de actualizaciones de documentos ni eliminaciones efectuadas directamente en OpenSearch (produce discrepancias de índice).
> - **Opción D:** Construir funciones Lambda custom para sincronizar índices de OpenSearch añade enorme sobrecarga, es frágil y no escala con el volumen de datos de búsqueda.
>
> **Trampa de examen:**
> Para replicación continua de índices de búsqueda entre dominios de Amazon OpenSearch Service en distintas regiones con mínimo lag: usa Cross-Cluster Replication (CCR).

---


# Bloque 3: Dominio 3

## Pregunta 21 de 50: Cifrado masivo de volúmenes EBS en toda la organización sin disrupción

*Dominio 3 · Tarea: 3.1 — Determinar controles de seguridad para mejorar la seguridad general*

### Enunciado

A security audit across 80 accounts in AWS Organizations revealed hundreds of unencrypted Amazon EBS volumes. Corporate compliance requires that all existing and future EBS volumes must be encrypted at rest with a Customer Managed Key (CMK) in AWS KMS. Additionally, any attempt to launch an EC2 instance with an unencrypted volume must be blocked automatically. What combination of actions provides the MOST effective and automated solution?

### Opciones de respuesta

- A. Create an IAM policy attached to all IAM users that denies ec2:RunInstances unless the Encrypted:true parameter is present. Manually detach and re-encrypt existing volumes during the weekend.
- B. Enable default EBS encryption in each Region across all accounts using AWS Systems Manager Quick Setup or an organization-wide script, configured with the regional KMS CMK. Create an SCP that denies ec2:RunInstances if the volume is unencrypted. For existing unencrypted volumes, use AWS Systems Manager Automation to automate snapshot creation, snapshot copy with KMS CMK encryption, and volume replacement during maintenance windows.
- C. Deploy AWS KMS key policies with conditions denying ec2:CreateVolume if encryption is disabled. Rely on Amazon Macie to detect unencrypted EBS volumes.
- D. In AWS Config, enable an automatic remediation action that immediately terminates any EC2 instance attached to an unencrypted EBS volume.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> Habilitar 'EBS encryption by default' a nivel regional garantiza que todo nuevo volumen creado o adjunto se cifre automáticamente con la clave CMK seleccionada. El SCP previene que cualquier usuario intente desactivar la configuración o eludir el cifrado. Para volúmenes existentes, automatizar el flujo (snapshot -> copia cifrada con CMK -> nuevo volumen) mediante runbooks de Systems Manager Automation elimina el error humano y la disrupción.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Las políticas de IAM locales no impiden lanzamientos efectuados por roles automatizados o cuentas nuevas y la re-encriptación manual de cientos de volúmenes no escala.
> - **Opción C:** Macie analiza datos sensibles en Amazon S3, no configuraciones de volúmenes EBS ni cifrado en reposo.
> - **Opción D:** Terminar instancias EC2 abruptamente destruye datos en memoria y causa indisponibilidad catastrófica en aplicaciones de producción.
>
> **Trampa de examen:**
> Para forzar cifrado en EBS: Habilita 'EBS Encryption by Default' por región + SCP que bloquee volúmenes sin cifrar + SSM Automation para migrar volúmenes existentes.

---

## Pregunta 22 de 50: Optimización de base de datos relacional con agotamiento de conexiones

*Dominio 3 · Tarea: 3.2 — Determinar una vía para mejorar el rendimiento general*

### Enunciado

A microservices application running on AWS Lambda functions interacts with an Amazon Aurora PostgreSQL database. During sudden traffic spikes, hundreds of Lambda execution environments scale concurrently. The database experiences connection exhaustion (too many connections errors) and high CPU utilization, resulting in API timeouts. What is the MOST effective architectural improvement to resolve the connection bottlenecks?

### Opciones de respuesta

- A. Increase the max_connections parameter in the Aurora DB parameter group to the maximum allowed limit and upgrade the DB instance size to a larger instance class.
- B. Migrate the application from AWS Lambda to Amazon EC2 instances running inside an Auto Scaling group with connection pooling configured in the application server.
- C. Deploy an Amazon DynamoDB table in front of Aurora to buffer all database queries, and use a scheduled cron Lambda to flush changes to Aurora.
- D. Deploy an Amazon RDS Proxy between the AWS Lambda functions and the Amazon Aurora PostgreSQL cluster. Configure Lambda functions to connect to the RDS Proxy endpoint instead of the direct database endpoint.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Amazon RDS Proxy es un proxy de base de datos totalmente administrado y de alta disponibilidad que agrupa y comparte conexiones (connection pooling) establecidas por miles de funciones Lambda concurrentes. Esto reduce drásticamente la sobrecarga de memoria y CPU en el motor Aurora, evitando los errores de 'too many connections' y manteniendo las transacciones estables.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Aumentar max_connections consume memoria RAM crítica del motor de base de datos; cuando miles de lambdas efímeras abren y cierran conexiones, el overhead de TLS handshake satura la CPU sin resolver la causa raíz.
> - **Opción B:** Abandonar arquitecturas serverless en Lambda para volver a servidores fijos en EC2 añade una enorme carga operativa de administración de infraestructura.
> - **Opción C:** Usar DynamoDB como búfer arbitrario para consultas relacionales requiere reescribir toda la lógica transaccional de la aplicación.
>
> **Trampa de examen:**
> Cuando funciones Lambda concurrentes saturan las conexiones de una base de datos RDS o Aurora ('Too many connections'): la solución canónica de AWS es Amazon RDS Proxy.

---

## Pregunta 23 de 50: Desacoplamiento del estado de sesión en aplicaciones web para escalado elástico

*Dominio 3 · Tarea: 3.3 — Determinar una vía para mejorar la fiabilidad general*

### Enunciado

A legacy web application runs on four Amazon EC2 instances behind an Application Load Balancer in a single Availability Zone. The application stores user session state locally in server memory. When an instance fails or CPU utilization spikes, users lose their shopping cart contents and are forced to log in again. What combination of actions will improve reliability and eliminate session loss with the LEAST operational overhead?

### Opciones de respuesta

- A. Refactor the application to store session state externally in an Amazon DynamoDB table or Amazon ElastiCache cluster. Deploy the EC2 instances across multiple Availability Zones inside an Auto Scaling group with scaling policies based on CPU utilization and target tracking.
- B. Enable sticky sessions (session affinity) on the Application Load Balancer target group and increase the idle timeout to 3600 seconds. Add two more EC2 instances in the same Availability Zone.
- C. Configure Elastic Block Store (EBS) Multi-Attach on an io2 volume and share the memory state file system across all four EC2 instances.
- D. Use AWS Application Migration Service to convert the EC2 instances into a single high-memory bare-metal EC2 instance with 99.99% hardware reliability.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Extraer el estado de la sesión de la memoria local hacia un almacén externo y distribuido (como Amazon DynamoDB o Amazon ElastiCache) hace que los servidores web sean completamente sin estado (stateless). Esto permite que el Auto Scaling group agregue o retire instancias en múltiples AZs dinámicamente sin que ningún usuario pierda su sesión si una máquina se cae.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Sticky sessions en el balanceador ata al usuario a una instancia específica; si esa instancia falla, la sesión en memoria se destruye de todos modos y mantener una sola AZ no provee alta disponibilidad.
> - **Opción C:** EBS Multi-Attach no comparte memoria RAM y requiere sistemas de archivos de clúster complejos; no está diseñado para sesiones web concurrentes.
> - **Opción D:** Escalar verticalmente a una sola máquina gigante crea un único punto de fallo (SPOF) catastrófico y no mejora la resiliencia arquitectónica.
>
> **Trampa de examen:**
> Para alta disponibilidad en aplicaciones web con sesiones de usuario: haz la capa web stateless moviendo la sesión a Amazon ElastiCache o DynamoDB y coloca las instancias en Auto Scaling Multi-AZ.

---

## Pregunta 24 de 50: Optimización de costos de cómputo a gran escala con AWS Compute Optimizer

*Dominio 3 · Tarea: 3.4 — Determinar una vía para mejorar la rentabilidad*

### Enunciado

An enterprise operates 2,000 Amazon EC2 instances, 500 EBS volumes, and 300 Lambda functions across 50 accounts in AWS Organizations. The cloud operations team suspects widespread over-provisioning. The FinOps team requires an automated solution to analyze historical utilization metrics, receive rightsizing recommendations for instances, storage, and serverless functions, and export the findings centrally for executive reporting without installing complex third-party monitoring agents. Which solution meets these requirements?

### Opciones de respuesta

- A. Deploy custom Python scripts on cron schedules in every account that invoke the DescribeInstances API and calculate average metrics. Store the JSON output in an S3 bucket.
- B. Configure Amazon CloudWatch anomaly detection on every EC2 instance metric and set up CloudWatch alarms that trigger AWS Lambda functions to stop underutilized instances.
- C. Enable AWS Compute Optimizer in the management account for the entire organization. Configure export of Compute Optimizer recommendations to a centralized Amazon S3 bucket in a FinOps account, and visualize the findings using Amazon QuickSight.
- D. In AWS Cost Explorer, manually generate monthly Rightsizing Reports for each individual member account and download CSV spreadsheets.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> AWS Compute Optimizer se integra con AWS Organizations para analizar automáticamente el historial de métricas de CloudWatch de EC2, EBS y Lambda sin instalar agentes adicionales (aunque el CloudWatch Agent añade métricas de memoria). Permite exportar recomendaciones centralizadas de optimización de tamaño hacia Amazon S3 para análisis avanzado en QuickSight con el menor esfuerzo.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Escribir y mantener scripts personalizados que consultan APIs de telemetría en 50 cuentas añade una carga operativa y costos de desarrollo innecesarios frente al servicio nativo de AWS.
> - **Opción B:** Detener instancias mediante alarmas de anomalías puede apagar servidores de producción durante fluctuaciones normales de carga sin realizar un análisis de optimización de tallas.
> - **Opción D:** Descargar reportes manuales en CSV de 50 cuentas individuales consume horas de trabajo humano y carece de automatización y escalabilidad.
>
> **Trampa de examen:**
> Para recomendaciones automáticas de rightsizing de EC2, EBS y Lambda a nivel de toda la organización: habilita AWS Compute Optimizer en la cuenta de gestión y exporta los datos a S3.

---

## Pregunta 25 de 50: Gestión automatizada de parches en flotas híbridas con AWS Systems Manager

*Dominio 3 · Tarea: 3.5 — Determinar una vía para mejorar la excelencia operativa*

### Enunciado

An enterprise manages a hybrid fleet of 600 Linux and Windows servers operating on-premises and across several AWS Regions. Security governance mandates that critical operating system security patches must be scanned weekly and applied during a monthly 4-hour maintenance window. Servers failing patch compliance must be automatically reported. The solution must not require VPN connectivity back to on-premises servers for management. Which solution provides this capability with the LEAST ongoing overhead?

### Opciones de respuesta

- A. Configure Ansible Tower on an EC2 instance in a public subnet. Install OpenSSH on all Windows and Linux on-premises servers and execute patch playbooks over the public Internet.
- B. Install the AWS Systems Manager Agent (SSM Agent) on all on-premises servers and EC2 instances, registering on-premises machines as managed instances with hybrid activations. Configure Systems Manager Patch Manager with custom patch baselines for Linux and Windows. Use Systems Manager Maintenance Windows to schedule automated patch deployment and view compliance in the Systems Manager Compliance dashboard.
- C. Use AWS Systems Manager Run Command to manually execute shell scripts and PowerShell commands on all instances on the first weekend of every month.
- D. Deploy AWS CodeDeploy agents on all servers. Create deployment groups for each operating system and push OS patch packages using CodePipeline.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS Systems Manager Patch Manager soporta flotas híbridas mediante activación híbrida del agente SSM (que se comunica de salida vía HTTPS hacia los endpoints de SSM sin requerir VPNs ni puertos de entrada abiertos). Las Patch Baselines definen qué parches aprobar según severidad, y Maintenance Windows automatiza la ventana mensual de 4 horas registrando el estado de cumplimiento en un dashboard unificado.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Abrir puertos SSH a través de Internet público para servidores Windows y Linux es una vulnerabilidad de seguridad inaceptable y requiere mantener servidores Ansible.
> - **Opción C:** Ejecutar Run Command manualmente cada mes introduce dependencia de intervención humana, propensión a olvidos y sobrecarga operativa.
> - **Opción D:** AWS CodeDeploy está diseñado para desplegar código de aplicaciones (artefactos de software), no para evaluar dependencias de parches del sistema operativo y baselines de seguridad.
>
> **Trampa de examen:**
> Para parches y cumplimiento de SO en flotas híbridas (EC2 + On-premises) sin puertos abiertos de entrada: usa AWS Systems Manager Patch Manager + Hybrid Activations + Maintenance Windows.

---

## Pregunta 26 de 50: Detección y contención automatizada de amenazas con Amazon GuardDuty

*Dominio 3 · Tarea: 3.1 — Determinar controles de seguridad para mejorar la seguridad general*

### Enunciado

A financial company operates 70 AWS accounts in AWS Organizations. The company must implement continuous intelligent threat detection across all accounts that can analyze VPC Flow Logs, CloudTrail logs, DNS query logs, and Amazon EKS audit logs. If an EC2 instance or IAM credential is confirmed to be compromised (e.g. communicating with known cryptocurrency mining pools or command-and-control servers), the compromised resource must be isolated automatically within minutes. Which solution fulfills these requirements with the LEAST operational overhead?

### Opciones de respuesta

- A. In each account, configure Amazon OpenSearch Service to ingest VPC Flow Logs and CloudTrail logs. Write custom Python query scripts to compare IP addresses against open-source threat intelligence lists.
- B. Enable Amazon Macie in all accounts and configure an AWS Lambda function to stop EC2 instances when sensitive data is exposed.
- C. Configure AWS WAF in each account and configure rate-based rules to block IP addresses generating abnormal outbound HTTP traffic.
- D. In the AWS Organizations management account, designate a security account as the delegated administrator for Amazon GuardDuty. Enable GuardDuty for all member accounts with automated enablement for future accounts. Configure an Amazon EventBridge rule in the security account that listens for GuardDuty findings of high severity and triggers an AWS Step Functions workflow to isolate the compromised EC2 instance by attaching a quarantine security group and revoke active IAM sessions.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Amazon GuardDuty analiza automáticamente múltiples fuentes de telemetría (CloudTrail, VPC Flow Logs, DNS logs, EKS audit logs) utilizando machine learning y threat intelligence sin necesidad de agentes. La administración delegada centraliza todos los hallazgos en la cuenta de seguridad. Al conectar los hallazgos de alta severidad con EventBridge y Step Functions, se logra contención y aislamiento automático inmediato (seguridad reactiva) sin código de telemetría propio.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Ingerir y comparar logs manualmente en OpenSearch requiere programar reglas, mantener listas de reputación y acarrea un inmenso costo operativo y de almacenamiento.
> - **Opción B:** Amazon Macie detecta datos confidenciales (PII, tarjetas de crédito) en Amazon S3; no detecta tráfico de minería de criptomonedas ni compromisos de instancias EC2 o credenciales.
> - **Opción C:** AWS WAF inspecciona peticiones HTTP/S entrantes en CloudFront, ALBs o API Gateway; no analiza DNS logs, VPC Flow Logs ni conexiones salientes de instancias EC2 comprometidas.
>
> **Trampa de examen:**
> Para detección inteligente y gestionada de anomalías en DNS, VPC Flow Logs y CloudTrail con auto-enablement en Organizations: usa Amazon GuardDuty con Delegated Administrator + EventBridge para auto-remediación.

---

## Pregunta 27 de 50: Diagnóstico de latencia en microservicios distribuidos con AWS X-Ray

*Dominio 3 · Tarea: 3.2 — Determinar una vía para mejorar el rendimiento general*

### Enunciado

An online retail application is built using a microservices architecture running across Amazon ECS, AWS Lambda, and Amazon DynamoDB. Customers complain that checkout requests intermittently take over 10 seconds to complete. The engineering team has review CloudWatch metrics for each service, but cannot determine which specific microservice, external API call, or database query is causing the latency spike within the distributed transaction. How should the solutions architect resolve this visibility gap?

### Opciones de respuesta

- A. Instrument the application microservices using the AWS X-Ray SDK or AWS Distro for OpenTelemetry (ADOT). Enable active tracing on the Lambda functions and ECS task definitions. Use the AWS X-Ray Service Map and trace analysis to identify latency distribution and pinpoint downstream bottlenecks in the request path.
- B. Increase the provisioned read and write capacity on all DynamoDB tables to 10,000 RCU/WCU and turn on DynamoDB Streams.
- C. Enable Amazon CloudWatch Detailed Monitoring on all underlying EC2 instances and configure VPC Flow Logs with 1-minute aggregation intervals.
- D. Configure Amazon CloudWatch Synthetics canaries to send checkout requests every minute and record HTTP response codes in an Amazon S3 bucket.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS X-Ray (y AWS Distro for OpenTelemetry) está diseñado específicamente para rastreo distribuido (distributed tracing). Al propagar el encabezado de trazabilidad a través de microservicios, Lambda y llamadas a DynamoDB, genera un Service Map visual interactivo que desglosa el tiempo invertido en cada segmento y subsegmento, identificando con precisión la causa raíz de la latencia.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Aumentar capacidad en DynamoDB es costoso y no resuelve el problema si la lentitud reside en un microservicio de ECS, una llamada a un API de pago externo o contención de bloqueos.
> - **Opción C:** Detailed Monitoring y VPC Flow Logs solo muestran métricas de servidor y paquetes IP a nivel de red; no rastrean transacciones de aplicación distribuidas.
> - **Opción D:** CloudWatch Synthetics canaries confirman que hay lentitud desde el punto de vista del usuario, pero no desglosan qué componente interno dentro del backend generó la demora de 10 segundos.
>
> **Trampa de examen:**
> Para diagnosticar cuellos de botella y latencia oculta en llamadas entre microservicios distribuidos: la herramienta nativa es AWS X-Ray (Distributed Tracing / Service Map).

---

## Pregunta 28 de 50: Optimización de ciclo de vida de almacenamiento en Amazon S3 para analítica

*Dominio 3 · Tarea: 3.4 — Determinar una vía para mejorar la rentabilidad*

### Enunciado

An analytics platform ingests 50 TB of telemetry log files daily into an Amazon S3 bucket. Millions of raw files are uploaded via multipart uploads. The data is queried intensively using Amazon Athena during the first 7 days. Between day 8 and day 90, the data is accessed only once or twice a month, but queries still require retrieval times within seconds. After 90 days, the data must be preserved for 7 years for compliance and can tolerate retrieval times of several hours. What S3 Lifecycle configuration will achieve the HIGHEST cost savings?

### Opciones de respuesta

- A. Keep objects in S3 Standard for 7 days. Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) at day 8. Transition objects to S3 Glacier Flexible Retrieval at day 90. Configure a rule to abort incomplete multipart uploads after 7 days.
- B. Keep objects in S3 Standard for 90 days. Transition objects to S3 Glacier Deep Archive at day 91. Delete incomplete multipart uploads manually using the AWS CLI.
- C. Keep objects in S3 Standard for 7 days. Transition objects to S3 Glacier Instant Retrieval at day 8. Transition objects to S3 Glacier Deep Archive at day 90. Configure an S3 Lifecycle rule to abort incomplete multipart uploads after 7 days.
- D. Transition all objects immediately upon ingestion to S3 Glacier Instant Retrieval. Configure S3 Object Lock in compliance mode for 7 years.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> S3 Glacier Instant Retrieval proporciona acceso en milisegundos con un costo de almacenamiento significativamente menor que Standard-IA para datos que se consultan raramente (1-2 veces al mes). A los 90 días, S3 Glacier Deep Archive es la clase de almacenamiento más económica para retención de largo plazo donde las horas de recuperación son aceptables. Abortar subidas multiparte incompletas elimina gigabytes de fragmentos ocultos que generan cargos innecesarios.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** S3 Glacier Flexible Retrieval es más caro que Glacier Deep Archive para retención a 7 años, y S3 Standard-IA tiene un costo de almacenamiento mayor que Glacier Instant Retrieval.
> - **Opción B:** Mantener datos en S3 Standard durante 90 días cuando casi no se consultan después del día 7 es muy costoso, y la limpieza manual con CLI de subidas multiparte no es automatizada.
> - **Opción D:** Glacier Instant Retrieval cobra una tarifa de recuperación por GB; usarlo durante los primeros 7 días cuando se realizan consultas masivas en Athena incrementaría exponencialmente los costos de lectura.
>
> **Trampa de examen:**
> Acceso raro pero que requiere respuesta en milisegundos: S3 Glacier Instant Retrieval. Archivo a largo plazo con recuperación en horas: S3 Glacier Deep Archive. Nunca olvides abortar subidas multiparte incompletas.

---

## Pregunta 29 de 50: Protección de DNS saliente contra exfiltración con Route 53 Resolver DNS Firewall

*Dominio 3 · Tarea: 3.3 — Determinar una vía para mejorar la fiabilidad general*

### Enunciado

A security audit identifies that EC2 instances in an application VPC could be leveraged by attackers to exfiltrate proprietary source code using DNS tunneling techniques or resolve malicious domain names. The company already inspects HTTP/S traffic, but needs a managed solution specifically to monitor and block malicious outbound DNS queries made to the Route 53 Resolver (AmazonProvidedDNS) with the LEAST administrative effort. Which solution should the company implement?

### Opciones de respuesta

- A. Deploy custom DNS proxies on EC2 instances running dnsmasq. Point the DHCP option set of the VPC to the EC2 proxies and configure regex domain blocking in custom config files.
- B. Configure Route 53 Resolver DNS Firewall. Create a rule group using the AWS Managed Domain Lists (MalwareDomains and BotnetCommandandControlDomains) with the BLOCK action, and associate the rule group with the VPC.
- C. Configure AWS WAF with rate-based rules and associate it directly with the Route 53 Private Hosted Zone.
- D. Modify all Security Groups attached to EC2 instances to deny outbound UDP and TCP traffic on port 53.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> Route 53 Resolver DNS Firewall es la característica nativa de AWS para inspeccionar y filtrar consultas DNS salientes realizadas al resolver de VPC (IP .2). Las listas de dominios administradas por AWS (AWS Managed Domain Lists) protegen automáticamente contra malware, botnets y tunelización DNS sin necesidad de que los administradores mantengan listas manuales de dominios maliciosos.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Desplegar servidores dnsmasq autogestionados en EC2 añade complejidad, mantenimiento de parches y puntos únicos de fallo.
> - **Opción C:** AWS WAF opera en capas 7 HTTP/HTTPS; no puede asociarse a zonas privadas de Route 53 ni inspecciona consultas DNS a nivel de protocolo UDP/TCP 53.
> - **Opción D:** Bloquear el puerto 53 en Security Groups no afecta las consultas dirigidas al Route 53 Resolver (AmazonProvidedDNS en la IP base de la VPC +2), ya que ese tráfico está explícitamente exento de las reglas de SG en la VPC.
>
> **Trampa de examen:**
> Para bloquear exfiltración por DNS y resolución de dominios maliciosos en consultas al resolver de VPC: usa Route 53 Resolver DNS Firewall con AWS Managed Domain Lists.

---

## Pregunta 30 de 50: Gobernanza centralizada de cumplimiento con AWS Config Conformance Packs

*Dominio 3 · Tarea: 3.5 — Determinar una vía para mejorar la excelencia operativa*

### Enunciado

An enterprise operates 100 AWS accounts in AWS Organizations. Corporate governance mandates a baseline of 35 security rules (such as enforcing MFA, disallowing public S3 buckets, requiring encrypted volumes, and checking IAM password policies) that must be deployed and continuously enforced in every account and Region. Creating and updating these rules individually across all accounts has caused configuration drift and operational overhead. Which solution allows the enterprise to package, deploy, and manage this compliance baseline as a single entity across all accounts?

### Opciones de respuesta

- A. Write a custom Python script using the Boto3 SDK that loops through every account and creates the 35 rules using the PutConfigRule API. Schedule the script to run daily using AWS Lambda.
- B. Create an SCP with 35 deny statements and attach it to the root of the organization in AWS Organizations.
- C. Deploy AWS CloudTrail across all accounts and create 35 CloudWatch metric filters with alarms that send email notifications via Amazon SNS.
- D. Author an AWS Config Conformance Pack containing the 35 rules and remediation actions in a YAML template. Deploy the conformance pack as an Organization Conformance Pack from the AWS Organizations management account or delegated administrator account.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Un AWS Config Conformance Pack permite empaquetar una colección de reglas de AWS Config y acciones de remediación en un único documento YAML. Cuando se despliega como un 'Organization Conformance Pack', se aplica de forma uniforme y declarativa a todas las cuentas miembros de la organización (incluyendo cuentas creadas en el futuro), eliminando el desvío de configuración con una sola entidad gestionable.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Scripts en Lambda iterando 100 cuentas con APIs son frágiles, no detectan desvíos en tiempo real y añaden sobrecarga de mantenimiento de código.
> - **Opción B:** Las SCPs son controles preventivos que deniegan APIs de IAM/AWS; no pueden evaluar si una base de datos preexistente cumple políticas complejas de contraseñas ni sustituyen las reglas de auditoría de Config.
> - **Opción C:** Metric filters en CloudWatch solo alertan ante eventos de logs; no auditan el estado continuo de configuración de los recursos ni ejecutan remediación.
>
> **Trampa de examen:**
> Para empaquetar, versionar y desplegar un conjunto homogéneo de reglas de auditoría y remediación de AWS Config en toda una organización: usa AWS Config Organization Conformance Packs.

---


# Bloque 4: Dominio 4

## Pregunta 31 de 50: Descubrimiento exhaustivo y mapeo de dependencias para migración

*Dominio 4 · Tarea: 4.1 — Seleccionar cargas de trabajo para migración*

### Enunciado

A manufacturing enterprise plans to migrate 400 on-premises physical and virtual servers to AWS. The infrastructure team has undocumented dependencies between applications and databases. To plan migration waves accurately, the enterprise must collect detailed server utilization metrics (CPU, RAM, disk I/O) and network connection data between servers. What is the MOST effective approach to discover servers and map dependencies with the least manual effort?

### Opciones de respuesta

- A. Deploy the AWS Application Discovery Agent on all on-premises servers. In AWS Application Discovery Service, collect system performance data and network communication histories. Use AWS Migration Hub Network Diagram and Grouping tools to map dependencies and group servers into migration waves.
- B. Deploy the AWS Application Migration Service (MGN) replication agent on all servers and immediately initiate block-level replication to AWS.
- C. Use AWS Migration Evaluator with the collector appliance to estimate monthly cloud costs and generate high-level business cases.
- D. Export VMware vCenter inventory reports to Excel spreadsheets and manually cross-reference IP addresses using netstat outputs.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS Application Discovery Agent (basado en agente) captura configuraciones de hardware, rendimiento en tiempo real y, crucialmente, las conexiones de red entrantes y salientes (network dependencies) entre servidores. Integrado con AWS Migration Hub, permite visualizar dependencias y agrupar servidores interconectados en olas de migración lógicas sin riesgo de romper dependencias ocultas.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Application Migration Service (MGN) es la herramienta de ejecución de migración a nivel de bloques; ejecutar replicación masiva sin haber planificado dependencias y requerimientos de red genera fallos de corte.
> - **Opción C:** Migration Evaluator se centra en el modelo financiero de costos (TCO y Business Case); no realiza mapeo detallado de conexiones de red entre procesos.
> - **Opción D:** El análisis manual con hojas de cálculo y netstat en 400 servidores es sumamente propenso a errores humanos, no captura picos estacionales y consume meses de trabajo.
>
> **Trampa de examen:**
> Para mapear dependencias de red profundas entre servidores on-premises previo a la migración: usa AWS Application Discovery Service en modo basado en agente (Agent-based) integrado con Migration Hub.

---

## Pregunta 32 de 50: Migración heterogénea de base de datos a gran escala hacia Amazon Aurora

*Dominio 4 · Tarea: 4.2 — Determinar el enfoque de migración óptimo*

### Enunciado

A banking company wants to migrate an on-premises 15 TB Microsoft SQL Server database to Amazon Aurora PostgreSQL to eliminate expensive commercial licensing costs. The database undergoes continuous transactions 24/7. The cutover window must not exceed 15 minutes of downtime, and stored procedures and complex database schemas must be converted to PostgreSQL equivalents. Which migration approach satisfies these requirements?

### Opciones de respuesta

- A. Take a full SQL Server backup (.bak), upload it to Amazon S3, and use native RDS restore to launch an Amazon RDS for SQL Server instance. Then, convert the database using pg_dump.
- B. Use AWS Application Migration Service (MGN) to lift-and-shift the underlying Windows Server and SQL Server instance to Amazon EC2. Change the engine type in the EC2 console.
- C. Use the AWS Schema Conversion Tool (AWS SCT) to convert the SQL Server schema, triggers, and stored procedures to PostgreSQL syntax, applying the generated scripts to a new Aurora PostgreSQL cluster. Then, configure AWS Database Migration Service (AWS DMS) with a full load and continuous replication (CDC) task. After the target catches up, switch the application endpoint during the 15-minute cutover window.
- D. Export the database to flat CSV files. Upload the files to Amazon S3 and use the aws_s3 PostgreSQL extension to import the data into Aurora.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Esta es una migración heterogénea (motores distintos: SQL Server a PostgreSQL). AWS SCT convierte esquemas, funciones y procedimientos almacenados entre motores incompatibles. Posteriormente, AWS DMS realiza la carga inicial de los 15 TB y mantiene la sincronización continua mediante Change Data Capture (CDC) mientras la base sigue en producción, permitiendo cambiar el endpoint en menos de 15 minutos sin pérdida de datos.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** La restauración nativa de backups .bak en RDS solo produce bases de datos SQL Server, no migra hacia PostgreSQL ni reduce costos de licencias.
> - **Opción B:** AWS MGN replica servidores a nivel de bloque hacia EC2 manteniendo el mismo sistema operativo y motor SQL Server sin convertirlo a Aurora PostgreSQL.
> - **Opción D:** Exportar e importar 15 TB en archivos CSV detiene la producción o pierde todos los cambios generados durante la exportación (sin CDC), violando el corte de 15 minutos.
>
> **Trampa de examen:**
> Migración heterogénea de base de datos (ej. SQL Server/Oracle hacia PostgreSQL/MySQL): siempre requiere la combinación AWS SCT (conversión de esquemas/código) + AWS DMS (Full load + CDC para corte sin downtime).

---

## Pregunta 33 de 50: Migración masiva de almacenamiento de archivos NAS con AWS DataSync

*Dominio 4 · Tarea: 4.2 — Determinar el enfoque de migración óptimo*

### Enunciado

An enterprise needs to migrate 500 TB of file shares hosted on an on-premises NetApp NAS storage array to Amazon FSx for Windows File Server. The migration must preserve all NTFS access control lists (ACLs), ownership metadata, and timestamps. The data transfer must happen over a dedicated 1 Gbps AWS Direct Connect connection, but the transfer must not saturate the link during business hours (8 AM to 6 PM). Which solution meets these requirements with the LEAST operational effort?

### Opciones de respuesta

- A. Deploy an AWS DataSync agent as a virtual machine in the on-premises environment. Configure a DataSync task with the on-premises SMB file share as the source and the Amazon FSx for Windows File Server file system as the destination, enabling options to transfer permissions, ownership, and timestamps. Configure task bandwidth throttling to limit network consumption during business hours.
- B. Order five AWS Snowball Edge Storage Optimized devices. Copy the files to the Snowball devices using standard rsync scripts and ship them to AWS.
- C. Mount the on-premises SMB share on an EC2 instance in AWS over Direct Connect. Use Robocopy scripts with PowerShell to copy files continuously.
- D. Set up an AWS Storage Gateway File Gateway on-premises. Point applications to the Storage Gateway to automatically replicate files to Amazon S3, and then copy from S3 to FSx.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS DataSync está optimizado específicamente para transferencias masivas de datos hacia AWS hasta 10 veces más rápido que herramientas de código abierto. Preserva de forma nativa los metadatos de archivos de Windows (NTFS ACLs, timestamps, atributos) y permite programar cuotas de ancho de banda (bandwidth throttling) para no saturar el circuito Direct Connect en horario laboral.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Enviar dispositivos Snowball no permite actualización incremental en línea y requiere detener escrituras durante el envío físico para evitar desincronizaciones.
> - **Opción C:** Robocopy sobre Direct Connect carece de aceleración de red, validación de integridad automática y requiere supervisar y reiniciar scripts manuales ante cortes.
> - **Opción D:** Storage Gateway File Gateway conecta con Amazon S3, no directamente con FSx for Windows File Server preservando las ACLs avanzadas de Active Directory de manera nativa sin pasos adicionales.
>
> **Trampa de examen:**
> Para migrar servidores de archivos (NFS/SMB) a AWS (EFS/FSx/S3) preservando metadatos (ACLs, timestamps) con aceleración y límites de ancho de banda: la herramienta canónica es AWS DataSync.

---

## Pregunta 34 de 50: Modernización de monolito .NET a contenedores serverless en Linux

*Dominio 4 · Tarea: 4.3 — Determinar una nueva arquitectura cloud para cargas existentes*

### Enunciado

A company runs a monolithic .NET Framework application on Windows Server 2012 R2 virtual machines in an on-premises data center. The operating system has reached End of Support. The company wants to modernize the application to .NET Core/8 to run on Linux containers, eliminate Windows licensing costs, and avoid managing server infrastructure. Which migration and modernization pathway should the solutions architect recommend?

### Opciones de respuesta

- A. Use AWS Application Migration Service (MGN) to replicate the Windows Server 2012 R2 VMs to Amazon EC2 instances running Windows Server 2022.
- B. Use AWS App2Container (A2C) to containerize the application as a Windows container and deploy it on Amazon EC2 instances managed by an Auto Scaling group.
- C. Lift and shift the VMs to AWS Elastic Beanstalk using the Windows Server platform.
- D. Use AWS Microservice Extractor for .NET and the AWS Toolkit to refactor and port the .NET Framework application code to .NET Core on Linux. Package the application as a Docker container, push the image to Amazon Elastic Container Registry (ECR), and run the service on Amazon Elastic Container Service (ECS) using the AWS Fargate launch type.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Portar el código a .NET moderno (.NET Core/8) permite ejecutar la aplicación sobre Linux, erradicando por completo el costo de licencias de Windows Server. Desplegar los contenedores en Amazon ECS con el tipo de lanzamiento AWS Fargate elimina la gestión de servidores físicos o virtuales (serverless), cumpliendo plenamente los objetivos de modernización y ahorro.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Rehost a Windows Server en EC2 no moderniza el código, perpetúa los costos de licencias de Windows y mantiene la sobrecarga de administración de servidores.
> - **Opción B:** Contenedores Windows en EC2 requieren seguir pagando licencias de Windows Server y no eliminan la gestión de la infraestructura EC2.
> - **Opción C:** Elastic Beanstalk con Windows Server mantiene la dependencia del sistema operativo Windows y sus licencias comerciales.
>
> **Trampa de examen:**
> Modernizar aplicaciones .NET heredadas para eliminar licencias de Windows: Portar a .NET Core/8 sobre contenedores Linux en AWS Fargate (ECS o EKS).

---

## Pregunta 35 de 50: Transferencia masiva de 2 PB fuera de banda hacia almacenamiento de archivo profundo

*Dominio 4 · Tarea: 4.2 — Determinar el enfoque de migración óptimo*

### Enunciado

A media archive facility must migrate 2 PB of historical video recordings from an on-premises tape and disk library to AWS within a strict deadline of 4 weeks. The facility has a shared 1 Gbps Internet connection that cannot be used for more than 20% of its capacity. The video files are write-once and will rarely be accessed, but must be retained indefinitely for legal preservation. What is the MOST cost-effective and timely migration strategy?

### Opciones de respuesta

- A. Order multiple AWS Snowball Edge Storage Optimized devices. Copy the video files onto the Snowball devices locally using the S3 adapter. Ship the devices to AWS for direct data import into Amazon S3 Glacier Deep Archive.
- B. Compress the video files and upload them over the 1 Gbps Internet connection directly to an S3 bucket using AWS DataSync.
- C. Order an AWS Snowcone device. Transfer the files continuously in batches over the 4-week window.
- D. Provision an AWS Direct Connect 100 Gbps dedicated connection and stream the files using AWS Transfer Family.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> Transferir 2 PB a través de un enlace de 1 Gbps limitado al 20% (200 Mbps) tomaría más de 2.5 años. Usar múltiples dispositivos físicos AWS Snowball Edge Storage Optimized (80 TB utilizables por dispositivo) permite cargar los datos a velocidades de red local (10/25 Gbps) y transportarlos físicamente en pocos días, cargándolos directamente en la clase más barata del mercado: S3 Glacier Deep Archive (aprox. $0.00099 por GB/mes).
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** El ancho de banda disponible es insuficiente por órdenes de magnitud; violaría la fecha límite de 4 semanas por años de retraso.
> - **Opción C:** AWS Snowcone solo tiene 8 TB de capacidad utilizable; se necesitarían más de 250 envíos de Snowcone, lo cual es inviable operativa y logísticamente para 2 PB.
> - **Opción D:** Aprovisionar un enlace Direct Connect de 100 Gbps tarda meses de coordinación con proveedores de telecomunicaciones y tiene costos astronómicos injustificables para un archivo frío.
>
> **Trampa de examen:**
> Para mover Petabytes con ancho de banda de red limitado y plazos estrictos: la solución física es AWS Snowball Edge hacia S3 Glacier Deep Archive.

---

## Pregunta 36 de 50: Migración masiva de servidores virtuales con AWS Application Migration Service (MGN)

*Dominio 4 · Tarea: 4.2 — Determinar el enfoque de migración óptimo*

### Enunciado

A corporate enterprise plans to migrate 300 on-premises virtual machines running a mix of Linux and Windows to AWS. The enterprise requires an automated lift-and-shift solution that minimizes downtime during the final cutover (less than 10 minutes per server). The solution must perform continuous block-level data replication over TLS without disrupting production workloads during the initial data synchronization phase. Which service should be used?

### Opciones de respuesta

- A. AWS Server Migration Service (SMS)
- B. AWS Application Migration Service (AWS MGN)
- C. AWS DataSync
- D. AWS Backup with gateway appliances

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS Application Migration Service (AWS MGN) es el servicio estándar principal recomendado por AWS para migraciones lift-and-shift (rehost). Instala un agente ligero en cada servidor que replica cambios a nivel de bloque en segundo plano de manera continua y comprimida. En el momento del cutover final, solo se aplican los últimos bloques deltas, permitiendo un tiempo de inactividad de solo unos pocos minutos.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** AWS Server Migration Service (SMS) es una herramienta heredada (deprecated) basada en snapshots periódicos que causaba mayores ventanas de corte y fue reemplazada oficialmente por AWS MGN.
> - **Opción C:** AWS DataSync está diseñado para migrar sistemas de archivos compartidos (NFS/SMB/S3), no para replicar sistemas operativos completos de servidores en ejecución a nivel de bloques.
> - **Opción D:** AWS Backup es para copias de seguridad de recuperación ante desastres, no para orquestar cutovers de migración con pruebas y conversión de drivers para EC2.
>
> **Trampa de examen:**
> Para migraciones de servidores Lift-and-Shift (Rehost) con replicación continua a nivel de bloque y mínimo tiempo de corte: la herramienta oficial de AWS siempre es AWS Application Migration Service (AWS MGN).

---

## Pregunta 37 de 50: Evaluación financiera inicial y TCO para migración con AWS Migration Evaluator

*Dominio 4 · Tarea: 4.1 — Seleccionar cargas de trabajo para migración*

### Enunciado

An enterprise CIO wants to understand the total cost of ownership (TCO) and business case for migrating 1,200 on-premises servers to AWS. The leadership team needs visibility into potential cost savings comparing existing on-premises hardware provisioning with AWS optimized compute instances, taking into account actual historical CPU and RAM utilization rather than allocated capacity, along with Microsoft licensing optimization (BYOL vs license-included). Which service is designed specifically to generate this assessment?

### Opciones de respuesta

- A. AWS Migration Evaluator
- B. AWS Application Discovery Service
- C. AWS Pricing Calculator
- D. AWS Cost Explorer

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS Migration Evaluator (anteriormente TSO Logic) es el servicio de evaluación económica de AWS diseñado para crear casos de negocio basados en datos. Recolecta la utilización real de recursos on-premises (modelando CPU y RAM aprovisionadas vs consumidas) y genera reportes de TCO comparativos que optimizan el tallaje de instancias y las licencias de Microsoft (BYOL).
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Application Discovery Service se enfoca en el inventario técnico y mapeo de dependencias de red de servidores para planificar la migración, no en generar casos de negocio ejecutivos de TCO.
> - **Opción C:** AWS Pricing Calculator es una calculadora manual para estimar costos de arquitecturas que el usuario configura a mano; no analiza el uso histórico de servidores on-premises automáticamente.
> - **Opción D:** AWS Cost Explorer analiza el gasto histórico de recursos que ya están corriendo dentro de cuentas de AWS; no analiza servidores on-premises.
>
> **Trampa de examen:**
> Para construir el caso de negocio de migración y análisis de TCO basado en uso real de servidores on-premises: usa AWS Migration Evaluator.

---

## Pregunta 38 de 50: Migración homogénea de base de datos Oracle a Amazon RDS for Oracle

*Dominio 4 · Tarea: 4.2 — Determinar el enfoque de migración óptimo*

### Enunciado

An enterprise operates a mission-critical 8 TB Oracle Enterprise Edition database on-premises. The company decides to migrate the database to Amazon RDS for Oracle under the Bring Your Own License (BYOL) model. The database transaction volume is high, and the maintenance window for final cutover is only 10 minutes. The on-premises database version is identical to the target Amazon RDS version. What is the MOST reliable and efficient migration strategy?

### Opciones de respuesta

- A. Export the entire database using Oracle Data Pump (expdp) into a dump file, upload it to S3, and import it into RDS using impdp.
- B. Create a cold backup of the database on tape, ship the tape to AWS, and restore it.
- C. Use Oracle Data Guard to configure the Amazon RDS for Oracle DB instance as a physical standby replica of the on-premises primary database over AWS Direct Connect. Keep the replica in sync continuously, and execute a Data Guard switchover during the 10-minute cutover window.
- D. Use AWS Database Migration Service (DMS) with full load only without configuring CDC.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Para bases de datos Oracle homogéneas Enterprise Edition, usar las herramientas nativas de Oracle como Data Guard es el método estándar de la industria. Permite que la instancia RDS opere como una réplica física en espera sincronizada continuamente por Direct Connect; la conmutación por error (switchover) es instantánea y garantiza cero pérdida de datos dentro del límite de 10 minutos.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Data Pump para una base de 8 TB tarda horas en exportar e importar, y los cambios que ocurran durante la transferencia se pierden sin un mecanismo de replicación activa.
> - **Opción B:** Los envíos físicos de cintas son lentos y no ofrecen sincronización continua de deltas para cumplir una ventana de 10 minutos.
> - **Opción D:** Un DMS Full Load sin CDC deja una brecha masiva de datos y obliga a detener la base durante horas para evitar inconsistencias.
>
> **Trampa de examen:**
> Migración homogénea de Oracle Enterprise a RDS for Oracle con mínimo tiempo de corte: la mejor práctica técnica es Oracle Data Guard (o Oracle GoldenGate).

---

## Pregunta 39 de 50: Modernización de almacenamiento compartido Windows con Amazon FSx

*Dominio 4 · Tarea: 4.3 — Determinar una nueva arquitectura cloud para cargas existentes*

### Enunciado

A corporate environment has multiple legacy Windows applications running on Amazon EC2 instances across two Availability Zones. The applications require concurrent read/write access to a shared file system via the SMB protocol. The file system must support Microsoft Active Directory domain integration, Windows NTFS permissions, DFS Namespaces, and automated daily backups, with automatic sub-minute failover if an Availability Zone fails. Which storage solution should be deployed?

### Opciones de respuesta

- A. Amazon Elastic File System (EFS) with Max I/O performance mode.
- B. Amazon S3 bucket mounted on EC2 instances using the AWS Storage Gateway File Gateway.
- C. Amazon FSx for Windows File Server deployed in a Multi-AZ configuration joined to the corporate AWS Managed Microsoft AD domain.
- D. Amazon EBS General Purpose SSD (gp3) volume configured with Multi-Attach enabled across the EC2 instances.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Amazon FSx for Windows File Server es un servicio totalmente administrado construido nativamente sobre Windows Server. Proporciona soporte completo para el protocolo SMB, integración directa con Active Directory, permisos NTFS y DFS Namespaces. La opción Multi-AZ replica datos de forma sincrónica y realiza failover automático en menos de 1 minuto ante la pérdida de una AZ.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Amazon EFS es un sistema de archivos nativo de Linux que opera sobre el protocolo NFS; no soporta de forma nativa SMB ni permisos NTFS de Windows.
> - **Opción B:** Montar S3 a través de Storage Gateway introduce latencia, no soporta semántica de bloqueo de archivos SMB estándar y carece de conmutación automática de clúster activo-pasivo.
> - **Opción D:** EBS Multi-Attach solo funciona en la misma Zona de Disponibilidad; no puede adjuntarse a través de múltiples AZs y no implementa un sistema de archivos SMB compartido.
>
> **Trampa de examen:**
> Almacenamiento de archivos compartido para aplicaciones Windows que requieran SMB, Active Directory y NTFS con alta disponibilidad Multi-AZ: la respuesta siempre es Amazon FSx for Windows File Server Multi-AZ.

---

## Pregunta 40 de 50: Migración de mainframe legacy con AWS Mainframe Modernization

*Dominio 4 · Tarea: 4.3 — Determinar una nueva arquitectura cloud para cargas existentes*

### Enunciado

An insurance enterprise runs core transaction workloads on an on-premises IBM z/OS mainframe. The mainframe runs legacy COBOL programs and DB2 data stores. The enterprise needs to migrate these workloads to AWS to reduce annual multi-million dollar MIPS licensing fees. The enterprise wants to automatically convert the COBOL codebase into modern Java microservices while migrating the DB2 relational data to Amazon Aurora PostgreSQL with automated testing. Which AWS service is designed specifically for this purpose?

### Opciones de respuesta

- A. AWS Application Migration Service (MGN)
- B. AWS Mainframe Modernization with the Automated Refactor pattern (AWS Blu Age)
- C. AWS Serverless Application Model (AWS SAM)
- D. AWS Snowmobile

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS Mainframe Modernization es el servicio administrado creado específicamente para migrar y modernizar cargas de mainframe. Ofrece dos patrones: Replatform (emulación en Micro Focus) y Automated Refactor (con AWS Blu Age), el cual traduce automáticamente el código COBOL heredado a aplicaciones modernas Java orientadas a servicios sobre Aurora PostgreSQL.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** AWS MGN es para servidores x86 virtuales o físicos; no puede replicar la arquitectura de hardware ni sistemas operativos propietarios de Mainframes IBM z/OS.
> - **Opción C:** AWS SAM es un framework para definir aplicaciones serverless en CloudFormation; no realiza conversión de código COBOL ni migración de mainframes.
> - **Opción D:** AWS Snowmobile es un contenedor físico para transferencias masivas de datos a escala de exabytes, no una herramienta de transformación de software.
>
> **Trampa de examen:**
> Para modernizar código COBOL de mainframe y migrar a microservicios Java en AWS: usa AWS Mainframe Modernization con el patrón Automated Refactor (AWS Blu Age).

---


# Bloque 5: Dominio 5

## Pregunta 41 de 50: Pipeline CI/CD multicuenta y multirregión con cifrado KMS personalizado

*Dominio 5 · Tarea: 5.2 — Diseñar pipelines de CI/CD y DevSecOps*

### Enunciado

An enterprise operates a shared Tools AWS account and separate Production accounts across us-east-1 and us-west-2. The DevOps team builds a continuous deployment pipeline using AWS CodePipeline in the Tools account. The pipeline must build Docker images, test them, and deploy them to Amazon ECS clusters running in both Production accounts in both Regions. The S3 artifact bucket must be secured so that member accounts can read build artifacts. Which combination of actions allows the cross-account pipeline to deploy successfully?

### Opciones de respuesta

- A. In the Tools account, encrypt the S3 artifact bucket using the default aws/s3 key. In the Production accounts, attach an IAM policy to the ECS task execution role granting s3:GetObject.
- B. In the Tools account, encrypt the S3 artifact bucket using a customer managed key (CMK) in AWS KMS. In the KMS key policy, grant cross-account permissions to the Production accounts' deployment roles. In each Production account, create an IAM cross-account deployment role that trusts the CodePipeline service and has permissions to deploy to ECS and use the KMS CMK. Configure CodePipeline stages with cross-Region and cross-account actions referencing these roles.
- C. Configure S3 bucket policies in the Tools account with public read access restricted by an IP address condition. Configure CodePipeline to use public S3 URLs.
- D. Move the CodePipeline pipeline into the Production account and create a VPC peering connection back to the Tools account to pull code from CodeCommit.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> Para pipelines multicuenta en AWS CodePipeline, el bucket de artefactos de S3 DEBE estar cifrado con una clave KMS Customer Managed Key (CMK), ya que la clave predeterminada aws/s3 no admite políticas de clave entre cuentas. La política de la clave CMK y la política del bucket S3 deben autorizar a los roles de despliegue de las cuentas de producción, los cuales asume CodePipeline para ejecutar acciones en otras cuentas y regiones.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** La clave administrada por defecto aws/s3 no puede ser compartida entre diferentes cuentas de AWS; cualquier intento de descarga cross-account fallará por acceso denegado en KMS.
> - **Opción C:** Hacer un bucket de artefactos públicamente accesible viola los estándares básicos de seguridad corporativa y expone propiedad intelectual.
> - **Opción D:** Duplicar pipelines en cada cuenta de producción fragmenta el gobierno del CI/CD y contradice el modelo estándar de cuenta central de Tools.
>
> **Trampa de examen:**
> En CodePipeline multicuenta: el bucket de S3 de artefactos NUNCA puede usar la clave por defecto aws/s3. Obligatoriamente requiere una clave KMS CMK con permisos concedidos a las cuentas destino.

---

## Pregunta 42 de 50: Integración de análisis de vulnerabilidades en contenedores en el pipeline de CI/CD

*Dominio 5 · Tarea: 5.3 — Implementar controles de seguridad y gobernanza en pipelines*

### Enunciado

A financial company builds and deploys microservices packaged as Docker containers on Amazon EKS. The DevSecOps policy mandates that container images must be scanned for operating system and application package vulnerabilities prior to deployment. If any CRITICAL or HIGH Common Vulnerabilities and Exposures (CVEs) are detected, the deployment pipeline must automatically halt, preventing the image from reaching production. What is the MOST automated solution to enforce this gate?

### Opciones de respuesta

- A. In the Dockerfile, add a curl command to download an open-source vulnerability list during docker build. If an exit code is non-zero, fail the build.
- B. Configure an EC2 cron job that runs weekly to scan images in Amazon ECR using a custom Python script.
- C. Deploy a third-party antivirus agent on every EKS worker node to scan containers after they are running in the cluster.
- D. Store container images in Amazon Elastic Container Registry (ECR) with enhanced scanning enabled using Amazon Inspector. In AWS CodePipeline, configure an AWS CodeBuild step following the image push that polls the ECR image vulnerability findings via the DescribeImageScanFindings API, and fails the build step if any findings exceed the defined severity threshold.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> Amazon ECR Enhanced Scanning utiliza Amazon Inspector para escanear automáticamente imágenes de contenedores en busca de vulnerabilidades tanto a nivel de paquetes de SO como de dependencias de lenguaje de programación. Al integrar un paso de validación en CodeBuild dentro del pipeline, se evalúan los resultados del escaneo y se bloquea el paso de despliegue proactivamente antes de que la imagen sea promovida a producción.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Descargar listas con curl en el Dockerfile es frágil, carece de base de datos actualizada de CVEs y no valida dependencias compiladas de forma exhaustiva.
> - **Opción B:** Un escaneo semanal a posteriori detecta problemas días después de que la imagen vulnerable ya fue desplegada en producción, incumpliendo el control preventivo en el pipeline.
> - **Opción C:** Escanear contenedores después de que ya están en ejecución en el clúster viola el principio DevSecOps de validación previa (shift-left security).
>
> **Trampa de examen:**
> Para escanear contenedores en ECR contra CVEs de SO y dependencias de código: habilita Enhanced Scanning con Amazon Inspector y valida los findings en el pipeline de CI/CD para frenar el despliegue.

---

## Pregunta 43 de 50: Pipeline automatizado de Golden AMIs con distribución multicuenta

*Dominio 5 · Tarea: 5.1 — Diseñar pipelines de pruebas y artefactos automatizados*

### Enunciado

An organization operating across 60 AWS accounts requires hardened 'Golden AMIs' for all Amazon EC2 workloads. The security team updates base AMIs monthly with security patches, antivirus agents, and compliance configuration scripts. The process must automatically build the AMI, run automated validation tests, and distribute the approved AMI to all 60 accounts and multiple Regions, while deregistering outdated AMIs. Which solution achieves this with the LEAST operational overhead?

### Opciones de respuesta

- A. Use EC2 Image Builder to create an image pipeline with build components and automated test components. Configure an infrastructure configuration and an Image Builder distribution settings resource that specifies the target 60 account IDs and target Regions. Schedule the pipeline to run monthly and use an Amazon EventBridge rule to notify teams when new AMIs are available.
- B. Write a custom Packer template on an EC2 instance that builds the AMI. Execute a Python script that iterates through all accounts and calls the ModifyImageAttribute API to share the AMI.
- C. Use AWS Systems Manager State Manager to continuously run patch commands on running production instances and take snapshots every Sunday.
- D. Create an AWS CloudFormation template that launches an EC2 instance in each account, runs user data scripts to patch the OS, and triggers an AWS Lambda function to create an AMI locally in each account.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> EC2 Image Builder es el servicio completamente administrado de AWS para automatizar la creación, prueba y distribución de imágenes de máquinas virtuales. Las 'Distribution Settings' admiten compartir y replicar AMIs automáticamente a múltiples cuentas de AWS Organizations y regiones sin scripts personalizados, incluyendo la eliminación y ciclo de vida de versiones anteriores.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Gestionar Packer e invocar scripts caseros de Python para compartir y copiar AMIs en 60 cuentas y múltiples regiones requiere mantenimiento continuo de infraestructura y credenciales.
> - **Opción C:** Parchear instancias de producción activas y tomar snapshots no produce una 'Golden AMI' inmutable estandarizada y expone los entornos a desincronizaciones.
> - **Opción D:** Desplegar instancias temporales por CloudFormation en 60 cuentas por separado multiplica los costos y la sobrecarga operativa innecesariamente.
>
> **Trampa de examen:**
> Para construir, probar, endurecer y distribuir Golden AMIs automáticamente entre cuentas y regiones: la solución nativa es EC2 Image Builder.

---

## Pregunta 44 de 50: Auto-reparación automatizada y respuesta a incidentes en flotas de EC2

*Dominio 5 · Tarea: 5.4 — Diseñar automatización de operaciones y sistemas resilientes*

### Enunciado

An enterprise runs an e-commerce catalog application on EC2 instances in an Auto Scaling group. Occasionally, application processes crash or freeze due to memory leaks, leaving instances passing basic EC2 system status checks but failing application health checks. The operations team requires an automated solution that detects application failure, collects diagnostic heap memory dumps from the failing instance into an Amazon S3 bucket for developer analysis, and terminates the unhealthy instance so Auto Scaling replaces it with a healthy one. Which solution fulfills these requirements?

### Opciones de respuesta

- A. Configure the Auto Scaling group health check type to EC2 only. Have developers manually connect via SSH to dump memory when alerts fire.
- B. Write a cron job inside the instance that checks the local port. If the port fails, the script runs shutdown -h now.
- C. Configure the Auto Scaling group to use ELB health checks. In Amazon EventBridge, create a rule that captures the EC2 Auto Scaling Instance Terminate Lifecycle Hook event. Trigger an AWS Systems Manager Automation document that runs a script on the instance via Run Command to capture the heap dump and upload it to an S3 bucket before completing the lifecycle action to terminate the instance.
- D. Increase the health check grace period on the Auto Scaling group to 3,600 seconds and disable instance termination policies.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> Usar 'ELB health checks' en el Auto Scaling Group permite detectar fallos a nivel de aplicación (no solo fallos de hardware del hypervisor). Configurar un Lifecycle Hook para el evento de terminación pausa la eliminación de la instancia, permitiendo que EventBridge dispare un documento de Systems Manager para recopilar diagnósticos (memory dumps) y subirlos a S3 antes de permitir que el ASG destruya y reemplace la instancia.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** El chequeo de tipo EC2 solo detecta caídas de hardware o del kernel; no detecta cuelgues o bloqueos a nivel de aplicación HTTP/S.
> - **Opción B:** Un cron job local en una máquina con la memoria congelada o bloqueada suele fallar y no garantiza la entrega confiable de dumps de memoria.
> - **Opción D:** Aumentar el grace period a 1 hora deja instancias no funcionales atendiendo tráfico de usuarios durante 60 minutos, degradando la experiencia del cliente.
>
> **Trampa de examen:**
> Para recolectar diagnósticos, volcados de memoria o registros forenses antes de que un Auto Scaling group destruya una instancia fallida: usa Auto Scaling Lifecycle Hooks + Systems Manager Run Command.

---

## Pregunta 45 de 50: Despliegues progresivos y seguros en arquitecturas serverless con AWS SAM y CodeDeploy

*Dominio 5 · Tarea: 5.2 — Diseñar pipelines de CI/CD y DevSecOps*

### Enunciado

A financial startup deploys payment processing microservices using AWS Lambda and Amazon API Gateway defined with the AWS Serverless Application Model (AWS SAM). The startup must implement safe deployment practices: new Lambda function versions must be tested with 10% of production traffic for 10 minutes before shifting the remaining 90%. If any 5xx server errors or latency spikes occur during this canary period, traffic must automatically roll back to the previous version immediately. What is the MOST effective way to configure this deployment strategy?

### Opciones de respuesta

- A. Create two separate Lambda functions (V1 and V2) in the SAM template. Use an Application Load Balancer with weighted target groups to manually shift weights using a custom Python script.
- B. In the AWS SAM template, configure the DeploymentPreference of the Lambda function with the Type set to Linear10PercentEvery1Minute or Canary10Percent10Minutes. Specify Amazon CloudWatch Alarms monitoring function errors and latency under the Alarms property to trigger an automated rollback via AWS CodeDeploy.
- C. In the API Gateway console, manually create a new stage named Beta and ask customer support to test the Beta URL for 10 minutes before updating the Production stage.
- D. Deploy a second API Gateway endpoint. Use Route 53 weighted routing to split traffic between the two API Gateway domains.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** B
>
> **Por qué es correcta:**
> AWS SAM se integra de forma nativa con AWS CodeDeploy mediante la propiedad DeploymentPreference. Especificar 'Canary10Percent10Minutes' automatiza la creación de alias de Lambda y desvía el 10% del tráfico durante 10 minutos antes de completar el despliegue. Si alguna alarma de CloudWatch asociada se activa, CodeDeploy aborta la operación y conmuta el alias a la versión estable de inmediato.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Gestionar dos funciones Lambda separadas y alterar pesos manualmente con scripts no utiliza las capacidades nativas de versiones/alias de Lambda ni provee rollback automatizado integrado.
> - **Opción C:** Pruebas manuales con URLs separadas de Beta dependen de intervención humana, no evalúan tráfico real de producción y carecen de conmutación automatizada.
> - **Opción D:** Route 53 weighted routing sufre de retrasos por caché de DNS en clientes y no ofrece la granularidad ni el rollback instantáneo que provee CodeDeploy a nivel de alias de Lambda.
>
> **Trampa de examen:**
> En despliegues serverless con AWS SAM: la forma canónica de hacer Canary con rollback ante alarmas de CloudWatch es la propiedad DeploymentPreference (gestionada por CodeDeploy).

---

## Pregunta 46 de 50: Validación preventiva de políticas de seguridad en Infrastructure as Code (IaC)

*Dominio 5 · Tarea: 5.3 — Implementar controles de seguridad y gobernanza en pipelines*

### Enunciado

An enterprise development team uses AWS CloudFormation to provision cloud infrastructure across multiple accounts. The security team discovers that developers frequently commit templates that create unencrypted S3 buckets, open security groups (0.0.0.0/0 on port 22), or lack mandatory tags. The security team mandates that these policy violations must be caught in the local developer environment and in the CI/CD pipeline before any CloudFormation API calls are made to AWS. Which tool is specifically designed to write policy-as-code rules to validate CloudFormation templates against compliance policies?

### Opciones de respuesta

- A. AWS Systems Manager State Manager
- B. Amazon Inspector
- C. AWS Trusted Advisor
- D. AWS CloudFormation Guard (cfn-guard)

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> AWS CloudFormation Guard (cfn-guard) es una herramienta de código abierto de política como código (Policy-as-Code) específica para validar plantillas de CloudFormation y Terraform contra reglas de cumplimiento personalizadas antes del despliegue (shift-left). Puede ejecutarse en local (CLI) y en pipelines de CI/CD para rechazar plantillas no conformes antes de invocar la API de CloudFormation.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** SSM State Manager aplica configuraciones sobre instancias EC2 en ejecución; no valida plantillas de CloudFormation antes de su despliegue.
> - **Opción B:** Amazon Inspector escanea instancias EC2 y repositorios ECR en busca de vulnerabilidades de software; no analiza sintaxis de plantillas de IaC.
> - **Opción C:** AWS Trusted Advisor es un servicio en la nube que emite recomendaciones sobre cuentas activas de AWS; no se ejecuta localmente ni en pipelines de código.
>
> **Trampa de examen:**
> Para validar plantillas de CloudFormation contra reglas de seguridad y etiquetas en local y en el pipeline ANTES del despliegue: la herramienta oficial de AWS es AWS CloudFormation Guard.

---

## Pregunta 47 de 50: Gobernanza de secretos centralizados con replicación multirregión y rotación automática

*Dominio 5 · Tarea: 5.4 — Diseñar automatización de operaciones y sistemas resilientes*

### Enunciado

A multi-region application deployed in us-east-1 and us-west-2 requires access to an Amazon Aurora database credentials secret. To support local low-latency access and regional disaster recovery, the secret must be synchronized across both Regions. Corporate policy mandates that the database password must be rotated every 30 days without manual intervention, and client applications in both Regions must experience zero downtime during password rotation. How should the solutions architect implement this requirement?

### Opciones de respuesta

- A. Store the secret in AWS Secrets Manager in us-east-1 and configure primary secret replication to us-west-2. Enable automatic rotation in the primary Region using a pre-configured AWS Lambda function. Applications in both Regions retrieve the secret from their local regional Secrets Manager endpoint.
- B. Store the secret in an Amazon DynamoDB Global Table with client-side encryption. Use an EventBridge cron rule to trigger an EC2 instance that updates the password.
- C. Store the secret in AWS Systems Manager Parameter Store in us-east-1. Write a custom Lambda function triggered on a schedule to copy parameters to us-west-2.
- D. Save the database credentials in a configuration file within an encrypted S3 bucket in us-east-1 and replicate the bucket to us-west-2 using S3 Cross-Region Replication.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS Secrets Manager admite la replicación nativa de secretos entre múltiples regiones. Al configurar la rotación automática en la región primaria, Secrets Manager utiliza una función Lambda que crea una contraseña secundaria, actualiza la base de datos y conmuta el secreto sin tiempo de inactividad, replicando automáticamente la nueva versión a la región secundaria.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** DynamoDB no gestiona la lógica de rotación de credenciales en bases de datos relacionales ni maneja el ciclo de vida de secrets de forma administrada.
> - **Opción C:** SSM Parameter Store no ofrece replicación multirregión nativa integrada con rotación automática de contraseñas de bases de datos sin código custom.
> - **Opción D:** Almacenar contraseñas en archivos de configuración en S3 no proporciona rotación automática ni permite a las aplicaciones obtener credenciales dinámicas en tiempo de ejecución de forma segura.
>
> **Trampa de examen:**
> Para secretos compartidos multirregión con rotación periódica automática sin downtime: usa AWS Secrets Manager con replicación multirregión nativa.

---

## Pregunta 48 de 50: Lanzamiento progresivo de funcionalidades con AWS AppConfig Feature Flags

*Dominio 5 · Tarea: 5.2 — Diseñar pipelines de CI/CD y DevSecOps*

### Enunciado

An e-commerce company wants to release a new checkout workflow to a small percentage of users and gradually increase the exposure over several days. The operations team requires the capability to instantly toggle the feature off (kill switch) within seconds without redeploying application code or restarting application servers. Furthermore, if the new feature causes application error spikes in Amazon CloudWatch, the system must automatically revert the configuration. Which solution meets these requirements with the LEAST operational overhead?

### Opciones de respuesta

- A. Store configuration settings in an Amazon RDS table. Have application servers poll the database every second for updates.
- B. Create a new application build with hardcoded logic for each percentage change and deploy via AWS CodeDeploy using an all-at-once strategy.
- C. Use AWS AppConfig to manage the feature flag configuration. Define an AppConfig deployment strategy that gradually rolls out the configuration changes, and configure an Amazon CloudWatch alarm as an automatic rollback monitor. Use the AppConfig Agent or SDK in the application to retrieve configuration updates dynamically.
- D. Use AWS Systems Manager Parameter Store and write a custom polling script on each EC2 instance that restarts the web server daemon whenever a change in parameter version is detected.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** C
>
> **Por qué es correcta:**
> AWS AppConfig (capacidad de AWS Systems Manager) está diseñado específicamente para feature flags y configuraciones dinámicas de aplicaciones en tiempo de ejecución. Permite despliegues controlados progresivos, validación mediante esquemas, rollback automático instantáneo ante alarmas de CloudWatch y revocación de emergencia (kill switch) en segundos sin reiniciar servidores.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** Consultar una base de datos relacional cada segundo desde cientos de servidores genera una sobrecarga innecesaria en la base de datos y carece de estrategias de despliegue progresivo controladas.
> - **Opción B:** Recompilar y redesplegar código para cada ajuste porcentual es lento, propenso a errores y completamente ineficiente como kill switch.
> - **Opción D:** Reiniciar los servidores web interrumpe las conexiones activas de los usuarios y añade degradación del servicio en lugar de actualizar la configuración en caliente.
>
> **Trampa de examen:**
> Para Feature Flags, despliegues progresivos de configuración y kill-switch en segundos con rollback automático sin reiniciar servidores: usa AWS AppConfig.

---

## Pregunta 49 de 50: Remediación automática e inmediata de credenciales IAM filtradas

*Dominio 5 · Tarea: 5.3 — Implementar controles de seguridad y gobernanza en pipelines*

### Enunciado

A security incident response team discovers that long-term IAM user access keys are occasionally committed accidentally to public GitHub repositories by contractors. The company needs an automated solution that detects leaked AWS access keys immediately, invalidates the compromised access keys within seconds of public exposure, and notifies the security operations center. Which architecture provides the FASTEST and most automated response?

### Opciones de respuesta

- A. Configure an Amazon EventBridge rule that listens for AWS Health events regarding compromised credentials (AWS_RISK_CREDENTIALS_EXPOSED). Target an AWS Lambda function that invokes the UpdateAccessKey API to deactivate the exposed key and publishes an alert to an Amazon SNS topic.
- B. Run a daily AWS Config rule check for IAM users with keys older than 90 days and trigger an SSM Automation runbook to delete the keys.
- C. Use Amazon Inspector to scan all developer laptops every 24 hours.
- D. In AWS IAM, configure an account-wide password policy that forces key rotation every 24 hours.

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** A
>
> **Por qué es correcta:**
> AWS monitoriza repositorios públicos de código y, al detectar credenciales de AWS expuestas, emite de inmediato un evento en AWS Health bajo el código 'AWS_RISK_CREDENTIALS_EXPOSED'. Capturar este evento mediante Amazon EventBridge permite disparar una función Lambda en segundos para desactivar (`Status: Inactive`) la clave comprometida y alertar al equipo de seguridad por SNS.
>
> **Por qué fallan las demás opciones:**
> - **Opción B:** Las comprobaciones diarias de AWS Config detectan antigüedad de claves, no filtraciones en tiempo real; esperar horas o un día deja las credenciales expuestas a explotación masiva.
> - **Opción C:** Amazon Inspector no es un agente de endpoint para laptops de usuarios; opera en EC2 y ECR en la nube.
> - **Opción D:** Forzar rotación diaria de claves IAM no previene que una clave válida filtrada sea utilizada por atacantes minutos después de ser expuesta.
>
> **Trampa de examen:**
> Para neutralizar credenciales de AWS expuestas públicamente en GitHub u otras plataformas en segundos: captura el evento de AWS Health 'AWS_RISK_CREDENTIALS_EXPOSED' con EventBridge y desactiva la clave con Lambda.

---

## Pregunta 50 de 50: Simulación de fallos e ingeniería de caos con AWS Fault Injection Simulator (FIS)

*Dominio 5 · Tarea: 5.4 — Diseñar automatización de operaciones y sistemas resilientes*

### Enunciado

A financial banking platform operates an active-active multi-region workload across us-east-1 and us-west-2 using Amazon DynamoDB Global Tables and Route 53 ARC routing controls. To validate business continuity readiness before an annual compliance audit, the reliability engineering team must run controlled chaos engineering experiments in production. The experiment must simulate a severe regional outage by draining network traffic from us-east-1, stressing CPU on backend EC2 instances, and verifying that automated failover occurs without human intervention. The experiment must automatically stop if critical application error rates exceed safety thresholds. Which service should be used to orchestrate this experiment?

### Opciones de respuesta

- A. AWS CloudFormation StackSets
- B. AWS Systems Manager Patch Manager
- C. Amazon CloudWatch Synthetics
- D. AWS Fault Injection Simulator (AWS FIS)

> [!question]- Ver respuesta y justificación
> **Respuesta correcta:** D
>
> **Por qué es correcta:**
> AWS Fault Injection Simulator (AWS FIS) es el servicio administrado de ingeniería de caos de AWS. Permite diseñar y ejecutar experimentos controlados sobre recursos reales (inyectar latencia de red, drenar tráfico en AZs o regiones, simular estrés de CPU y desconexiones de bases de datos). Incluye de forma nativa 'Stop Conditions' que abortan el experimento inmediatamente si las alarmas de CloudWatch superan umbrales de seguridad críticos.
>
> **Por qué fallan las demás opciones:**
> - **Opción A:** CloudFormation StackSets gestiona despliegues de plantillas de infraestructura; no inyecta fallos de estrés ni gestiona condiciones de parada de caos.
> - **Opción B:** SSM Patch Manager instala parches del sistema operativo; no simula caídas regionales ni estrés de CPU.
> - **Opción C:** CloudWatch Synthetics monitoriza endpoints enviando peticiones periódicas; es una herramienta de observación de telemetría, no un generador de inyección de fallos controlado.
>
> **Trampa de examen:**
> Para realizar pruebas de caos controladas, simulación de fallos en producción y validación de resiliencia con stop conditions de seguridad: la herramienta oficial de AWS es AWS Fault Injection Simulator (AWS FIS).

---

