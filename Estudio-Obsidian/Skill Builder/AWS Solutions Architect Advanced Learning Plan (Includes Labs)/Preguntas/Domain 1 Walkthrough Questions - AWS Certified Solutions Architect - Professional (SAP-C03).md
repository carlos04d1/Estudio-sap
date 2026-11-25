---
title: "Domain 1 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)"
aliases:
  - "Domain 1 Walkthrough Questions"
  - "Walkthrough D1"
  - "Preguntas Walkthrough D1"
tags:
  - certificacion/aws
  - sap-c02
  - sap-c03
  - skill-builder
  - preguntas
  - walkthrough
  - dominio-1
status: activo
fuente: "https://skillbuilder.aws/learn/WFFGJFSDMT/domain-1-practice-aws-certified-solutions-architect--professional-sapc03--english/UJV7VCRTPH"
---

# Domain 1 Walkthrough Questions: AWS Certified Solutions Architect - Professional (SAP-C03)

> [!abstract] Qué es este archivo
> Banco de **preguntas guiadas (Walkthrough)** y **evaluación práctica (Practice Assessment)** del **Dominio 1: Organizational Complexity** para la certificación AWS Certified Solutions Architect - Professional (SAP-C03).
> Diseñado para analizar escenarios de nivel profesional paso a paso: disección de palabras clave del enunciado (stem), descarte de distractores, registro de intentos y justificación técnica de la arquitectura óptima.

> [!info] Metodología Walkthrough
> 1. **Lectura dirigida:** Identificar primero la pregunta final (criterio clave: *menor sobrecarga operativa*, *mayor resiliencia*, *más costo-eficiente*).
> 2. **Extracción de señales y restricciones:** Desglosar requisitos duros (RPO, RTO, aislamiento de tráfico, gobernanza multi-cuenta, sesión/cookies, stateless vs stateful).
> 3. **Eliminación sistemática:** Descartar opciones inviables o subóptimas justificando la falla de cada distractor.
> 4. **Validación:** Confirmar la mejor opción frente a los servicios recomendados y las mejores prácticas del Well-Architected Framework.

---

## 📊 Registro de intentos

| # | Fecha | Evaluación / Sección | Aciertos | % | Estado | Tareas flojas / Motivo del error |
| - | ----- | -------------------- | -------- | - | ------ | -------------------------------- |
| 1 | 2026-11-20 | Walkthrough Questions (Q1-Q2) | 2/2 | 100 % | 🟢 | Guiadas oficiales analizadas (CloudFront session affinity / VPC Traffic Mirroring) |
| 2 | 2026-11-20 | Practice Assessment (7 preguntas) | 1/7 | 14.3 % | 🟠 | Confusión de servicios en contingencia DX (Accelerated VPN), Stateless NACLs (puertos efímeros), destino nativo de Firehose vs transformaciones, Failover vs Latency en API Gateway, Planned vs Unplanned failover en Aurora Global DB |

---

## ✅ Cobertura por tarea (Dominio 1)

| Tarea | Descripción | Preguntas vistas | Estado |
| ----- | ----------- | ---------------- | ------ |
| **1.1** | Design cloud-native architectures | 4 (Q1 Walkthrough, P4 Firehose, P5 API Gateway, P7 ElastiCache) | 🟡 vista |
| **1.2** | Prescribe security controls | 1 (P3 NACL stateless / SG) | 🟠 a reforzar |
| **1.3** | Design reliable and resilient architectures | 3 (P2 Backup VPN, P5 Active/Standby DR, P6 Aurora Cross-Region) | 🟠 a reforzar |
| **1.4** | Design network architectures | 3 (Q2 Traffic Mirroring, P1 DX + IGW, P2 Accelerated VPN) | 🟡 vista |
| **1.5** | Determine cost optimization and visibility strategies | 1 (P2 Backup DX vs Accelerated VPN) | 🟡 vista |

*Estados: ⬜ sin practicar · 🟠 < 60 % · 🟡 60–79 % · 🟢 ≥ 80 %.*

---

# Walkthrough Questions

## Question 1: Walkthrough

This walkthrough question is from task statement 1.1: Design cloud-native architectures. The question reads:

"A company hosts a website behind an Amazon CloudFront distribution on two origin servers. The company has deployed a new application version on one of the origin servers to beta test some new features. The company wants to automatically direct a small percentage of new sessions that connect through the CloudFront distribution to the new application version. The company does not want to direct customers who are currently running workloads on the original application version to the new application version. Those customers should have the ability to finish their operations with the original application. Which solution will meet these requirements with the LEAST operational effort?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: Amazon CloudFront distribution on two origin servers

The architecture is already CloudFront-based with two origins. Any routing solution must work within the CloudFront request lifecycle. This points toward edge-level compute (Lambda@Edge or CloudFront Functions) rather than external infrastructure like a second distribution or Route 53.

#### 2: Automatically direct a small percentage of new sessions

The routing must happen automatically (no user choice) and only for new sessions (not all traffic). This requires inspecting the request to determine whether a session cookie already exists. Percentage-based splitting of only new sessions is a programmatic decision, not a DNS-level or infrastructure-level split.

#### 3: Does not want to direct customers who are currently running workloads on the original application version

Existing sessions must stick to their original origin. This is session affinity. The solution must read a session identifier (a cookie) and route accordingly. DNS-based approaches cannot provide this because DNS resolution does not carry session context.

#### 4: LEAST operational effort

The solution with the fewest moving parts wins. A single Lambda@Edge function that inspects cookies and rewrites the origin is one component. Creating second distributions, configuring Route 53, or modifying application code all add components that must be built, tested, and later decommissioned.

---

## Question 1: Examine the answers

You identified a CloudFront distribution with two origins, routing new sessions versus in-progress sessions, and least operational effort. Each one narrows what the answer can be. Hold your reasoning, then watch the walkthrough below.

#### Transcript

OK, let's review the STEM and then talk about what the keywords are telling us before we look at the options. A company hosts a website behind an Amazon CloudFront distribution on 2 Origin servers. The company has deployed a new application version on one of the Origin servers to beta test some new features. The company wants to automatically direct a small percentage of new sessions that connect through CloudFront distribution to the new application version. The company does not want to direct customers who are currently running workloads on the original application version to the new application version. Those customers should have the ability to finish their operations with the original application. All right, Joe, so which solution will meet these requirements with the LEAST operational effort, right? Well, the first signal is CloudFront distribution on two origin servers. The architecture is already cloudfront-based. Whatever routing solution we pick has to work inside the CloudFront request life cycle. OK. The second signal is automatically direct a small percentage of new sessions. Two things are packed in there. Automatic means no user choice, and new sessions means we need to tell new visitors apart from returning ones, which means reading a session cookie. If there's no cookie, this is a new session. If there is one, the session is already in progress. Exactly, and that third signal reinforces that does not want to direct customers who are currently running workloads on the original application version. That's session affinity. Returning sessions stay on their original origin. Yes, and the closer, least operational effort. So whatever has fewer moving parts wins. OK, so now let's talk through the options. Option B says update the home page so customers can choose which version they want, and that fails immediately because the stem says automatically direct and a manual choice isn't automatic. It also means modifying application code, which is development effort, so not less effort. OK. Option C creates a second CloudFront distribution and uses Route 53 weighted routing to split traffic between them. Well, Route 53 splits at the DNS level, and DNS doesn't carry session context. A returning customer whose DNS cache expires could resolve to the other distribution on their next request, so you lose session affinity. And you're building a second distribution, configuring Route 53 policies and tearing it all down after the beta. That's more infrastructure to manage, not less. Now option D says to publish two Lambda add edge functions and add code to the website to call them. That misunderstands how Lambda at edge works. Lambda edge is not an API endpoint your application calls. It's triggered by CloudFront events viewer request, origin request, viewer response, origin response. You attach it to the distribution, -- and CloudFront invokes -- it. So the architecture in that option doesn't actually work as described, right, which leaves option A, a single Lambda at edge function on the viewer request event. It examines the incoming request and checks for a session cookie. If no cookie exists, it's a new session. And the function applies the percentage split and for the chosen subset rewrites the origin to the beta server and sets a cookie so that subsequent requests stick there. If a cookie already exists, the function reads it and routes it to whichever origin that session was assigned to. Returning customers stay on their original version, right? One function, no extra distributions, no Route 53, no application code changes. It handles both the split and the affinity in the same place, and that's why it's the least operational effort. OK, so here's the pattern to focus on. When you see CloudFront, session level routing, and minimal infrastructure, think Lambda at Edge with cookie-based origin selection. One component, two behaviors, and zero extra infrastructure.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem?

#### Create a new Lambda@Edge function for the CloudFront distribution to examine incoming requests and that inspects cookies to determine whether a session is new. For a new session, configure the function to rewrite the URL for a small percentage of sessions to display the new application version. For a session that is in progress, configure the function to set the origin based on the value in the session cookie.

Lambda@Edge runs code at the edge location, so it can inspect each incoming request right where it arrives. By examining cookies, the function distinguishes new sessions from existing ones. For new sessions, a percentage-based split rewrites the URL to the beta origin. For returning sessions, the cookie directs the request back to their original origin. This is a single function that handles both routing cases at the edge, with no additional infrastructure to create or tear down. The pattern to notice: when the question asks for session-aware routing at the edge with minimal moving parts, a single Lambda@Edge function that reads cookies and rewrites origins is the leanest solution.

#### Update the home page code of the website to allow customers to select either the new application version or the original application. Redirect the request from the home page directly to the correct origin as needed.

This approach puts the routing decision in the application code itself and requires customer action. The stem asks for automatic direction of a small percentage, not a manual choice. It also means modifying the website code, which adds development and testing effort. The pattern to notice: when the stem says "automatically direct," a solution that requires user interaction does not satisfy the requirement, regardless of how simple it sounds.

#### Create a second CloudFront distribution for the origin server that hosts the new application version. Create an Amazon Route 53 weighted routing policy to distribute connections to the two CloudFront distributions. Route traffic to the appropriate CloudFront distribution by using the DNS information.

Route 53 weighted routing can split traffic, which is why this option looks appealing. However, it splits at the DNS level, not the session level. DNS cannot distinguish a new session from a returning one, so in-progress customers might be routed to the beta origin on their next DNS resolution. Creating a second CloudFront distribution and configuring Route 53 also adds infrastructure to build and later decommission, which increases operational effort. The pattern to notice: DNS-level traffic splitting cannot provide session affinity, and extra infrastructure to create and remove adds operational overhead.

#### Publish two new Lambda@Edge functions to automatically direct requests to the new application version or the original application. Add appropriate code to the existing website to call these new Lambda@Edge functions as necessary.

Lambda@Edge functions are not called from website code. They are triggered by CloudFront events (viewer request, origin request, viewer response, origin response). This option conflates how Lambda@Edge works with application-level function calls, which makes it architecturally incorrect. The pattern to notice: Lambda@Edge is a CloudFront feature triggered by distribution events, not an API endpoint that application code invokes.

---

## Question 1: Takeaways

That is all for this question. The reading pattern it rewards: when you see CloudFront, session awareness, and least operational effort in the same stem, look for a single Lambda@Edge function that uses cookies to distinguish sessions and route accordingly. Note any knowledge gap you spotted while working through it.

---

## Question 2: Walkthrough

This walkthrough question is from task statement 1.4: Design network architectures. The question reads:

"A company suspects that one of the Amazon EC2 instances that hosts the company's application has been the target of a sophisticated network attack. To investigate the suspected attack, a network administrator needs to inspect the network traffic message content. A solutions architect needs to recommend a solution that will monitor and capture the relevant traffic. Which solution will meet these requirements?"

As you read it, look for the keywords or phrases that tell you what the question is really asking. Select each numbered marker on the question to check what that phrase signals.

#### 1: Sophisticated network attack

This is a forensic investigation, not a prevention or detection scenario. The team already suspects an attack and needs to examine what happened. The solution must provide raw evidence, not just alerts or findings. This rules out detection-only services like GuardDuty and assessment services like Inspector.

#### 2: Inspect the network traffic message content

"Message content" means the payload inside the packets, not just the connection metadata (IPs, ports, protocol). VPC Flow Logs only capture metadata. The solution must provide full packet capture including the data being transmitted. Traffic Mirroring is the VPC feature that copies full packets including payload.

#### 3: Monitor and capture the relevant traffic

The solution must both monitor (observe in real time or near-real time) and capture (store for analysis). Traffic Mirroring copies traffic from a source ENI to a target where it can be analyzed with packet inspection tools. It satisfies both verbs in one feature.

---

## Question 2: Examine the answers

You identified a suspected network attack, the need to inspect message content (not just metadata), and a specific EC2 instance. Each one narrows what the answer can be. Hold your reasoning, then watch the walkthrough below.

#### Transcript

OK, this question has one key word that decides everything. Let's find it. A company suspects that one of the Amazon EC2 instances that hosts the company's application has been the target of a sophisticated network attack. To investigate the suspected attack, a network administrator needs to inspect the network traffic message content. A solutions architect needs to recommend a solution that will monitor and capture the relevant traffic. All right, Joe, so which solution will meet these requirements? Well, inspect the network traffic message content. That's the phrase, not metadata, not findings, the actual content inside the packets, right? And the context is a forensic investigation. They suspect an attack has already happened. And they need to look at what was sent over the wire. So this is evidence gathering, not prevention or detection, right? So let's test each option against that requirement. Option A uses VPC flow logs sent to an S3 bucket. Flow logs capture connection metadata, source IP, destination IP, ports, protocol, bytes transferred, and whether the traffic was accepted or rejected. They answer who talked to whom and how much, right? But they never show you what was inside the packets. There's no payload. So if you need the actual message content, Flow logs can't give it to you. OK. Option C combines flow logs with Amazon guard duty. Guard duty analyzes flow logs, CloudTrail events, and DNS logs to produce security findings. It tells you this IP looks suspicious or this instance might be compromised, -- which -- is useful for threat detection. But it's still operating on metadata. Guard duty surfaces findings, not raw traffic. You can't open a guard duty finding and read what the attacker sent. OK, so now option D uses Amazon Inspector. Inspector scans EC2 instances for software vulnerabilities and checks network exposure. It answers what weaknesses does this instance have, and that's a different question entirely. It doesn't capture traffic at all. It's an assessment tool, not a monitoring tool. So none of these three can show us packet content, which brings us to Option B, traffic mirroring. Traffic mirroring is a VPC feature that copies network traffic from the elastic network interface of an EC2 instance, and the copy includes the complete packet, headers and payload. Perfect. You configure a mirror source, which is the ENI of the affected instance. And a mirror target, which can be another ENI, a network load balancer or a gateway load balancer. The mirrored traffic arrives at the target where you run your packet analysis tools, so it satisfies both verbs in the STEM monitor because it copies traffic in real time and capture because the full content is available for analysis, and it specifically targets one instance's ENI, which is exactly what the question asks for. So here's the pattern to look for when you see inspect message content or packet payload in a network question, that's traffic mirroring. Flow logs give you metadata, guard duty gives you findings. Inspector gives you vulnerability assessments. Only traffic mirroring gives you the actual data on the wire. 4 tools, 4 different answers match the verb to the tool.

Prefer to read, or want to revisit a single option? Each option below has a reason a test-taker might choose it. How does each hold up against the keywords you marked in the stem?

#### Configure VPC Flow Logs to monitor the elastic network interface of the affected EC2 instance. Configure an Amazon S3 bucket as the target. Analyze the flow logs that are stored in the target S3 bucket.

VPC Flow Logs capture metadata about IP traffic: source and destination IP addresses, ports, protocol, and whether packets were accepted or rejected. They do not capture the actual packet payload or message content. When the stem specifically asks for inspecting "network traffic message content," Flow Logs fall short because they only provide header-level information. The pattern to notice: Flow Logs answer "who talked to whom," not "what did they say."

#### Configure Traffic Mirroring with the elastic network interface of the affected EC2 instance as the source and another EC2 instance network interface as the target. Analyze the data that Traffic Mirroring captures.

Traffic Mirroring is an Amazon VPC feature that copies network traffic from the elastic network interface of an EC2 instance, including the full packet payload (the message content). It sends that mirrored traffic to a target for analysis, which can be another ENI, a Network Load Balancer, or a Gateway Load Balancer. This directly satisfies the requirement to inspect message content, not just metadata. It operates at the network level, capturing everything that flows through the interface, which is exactly what a network forensics investigation requires. The pattern to notice: when the stem asks for packet-level content inspection on a specific instance, Traffic Mirroring is the VPC feature that provides full payload capture.

#### Configure VPC Flow Logs to monitor the elastic network interface of the affected EC2 instance. Activate Amazon GuardDuty and use the GuardDuty console or Amazon EventBridge to view findings.

This combines two metadata-level services. VPC Flow Logs capture connection metadata. GuardDuty analyzes Flow Logs, CloudTrail logs, and DNS logs to produce security findings, but it does not give you access to the raw packet content. GuardDuty identifies threats at a findings level ("this IP is suspicious") rather than giving you the ability to read what was in the packets. The pattern to notice: GuardDuty is a detection service that surfaces findings, not a forensics tool that provides raw traffic content.

#### Configure Amazon Inspector to monitor the EC2 instance. Install the Amazon Inspector agent on the EC2 instance. Run an assessment. Use the Amazon Inspector console to view findings.

Amazon Inspector assesses the security state of EC2 instances by checking for software vulnerabilities and unintended network exposure. It does not capture or display live network traffic. It produces findings about what is wrong with the instance's configuration or software, not what an attacker sent over the wire. The pattern to notice: Inspector answers "what vulnerabilities does this instance have," not "what traffic is this instance receiving."

---

## Question 2: Takeaways

That is all for this question. The reading pattern it rewards: when you see "inspect network traffic message content" or "packet payload," look for Traffic Mirroring. VPC Flow Logs, GuardDuty, and Inspector are useful security tools, but none of them provide the actual packet content. Note any knowledge gap you spotted while working through it.

---

# Practice Assessment: Domain 1 (7 preguntas)

## Pregunta 1 de 7: Acceso híbrido y público simultáneo a aplicación en VPC

*Tarea: 1.1 / 1.4 — Arquitectura de conectividad de redes*

### Enunciado

A company hosts an application in two subnets in a VPC. The employees connect through the company's on-premises data center to communicate with the application. The two subnets are currently accessible only from the on-premises environment through a single AWS Direct Connect connection. The company issued a new requirement to allow access to the application from the internet. Application access from the company's on-premises data center must continue to occur exclusively through the Direct Connect connection. Remote users should access the application through the public internet.

Which routing configuration will meet these requirements?

### Opciones de respuesta

- **A.** Create an AWS Transit Gateway. Connect the VPC and the Direct Connect connection to the transit gateway. Route all traffic through the transit gateway.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** La adición de una conexión Transit Gateway a Direct Connect permite crear conexiones de enrutamiento altamente escalables entre numerosas VPC y redes locales. Sin embargo, un Transit Gateway configurado de esta manera no permite el acceso a Internet por sí mismo.
  - 📖 Más información: [AWS Direct Connect + AWS Transit Gateway](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-aws-transit-gateway.html)

- **B.** Create a public VIF in Direct Connect. Establish a VPN connection between the VPC and the on-premises environment by using Direct Connect. Propagate routes by using BGP.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Agregar una VPN a Direct Connect (a través de una VIF pública) mejora la seguridad mediante cifrado IPsec, pero no proporciona acceso a Internet a los usuarios públicos para la aplicación en la VPC.
  - 📖 Más información: [AWS Direct Connect + VPN](https://docs.aws.amazon.com/whitepapers/latest/aws-vpc-connectivity-options/aws-direct-connect-vpn.html)

- **C.** Create a private VIF in Direct Connect. Configure each subnet with a route to a newly created internet gateway. Propagate specific on-premises routes through BGP.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** Un Internet Gateway (IGW) es el recurso de VPC que hace posible la comunicación bidireccional entre la VPC e Internet. La VPC se conecta a Direct Connect mediante una **VIF privada**. Las rutas locales específicas propagadas por BGP entre la VPC y el router del cliente en Direct Connect garantizan que el tráfico corporativo siga yendo exclusivamente por Direct Connect, mientras que la ruta por defecto (`0.0.0.0/0`) hacia el IGW en las tablas de ruteo de las subredes permite a los usuarios remotos acceder a la aplicación desde la red pública.
  - 📖 Más información: [Connect to the Internet Using an Internet Gateway](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_Internet_Gateway.html) y [AWS Direct Connect Virtual Interfaces](https://docs.aws.amazon.com/directconnect/latest/UserGuide/WorkingWithVirtualInterfaces.html)

- **D.** Deploy an AWS Client VPN endpoint in a subnet with client IPv4 CIDR of 0.0.0.0/0. In that subnet's route table, add a route of 0.0.0.0/0. Distribute the link for the VPN software to users who need internet access.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Client VPN es un servicio administrado para acceso cliente-a-red seguro. No es posible configurar un endpoint de Client VPN para aceptar conexiones desde un bloque CIDR cliente de `0.0.0.0/0`.
  - 📖 Más información: [What Is AWS Client VPN?](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html) y [Limitations and Rules of Client VPN](https://docs.aws.amazon.com/vpn/latest/clientvpn-admin/what-is.html#what-is-limitations)

> [!important] Trampa de examen
> Para permitir que coexistan Direct Connect corporativo e Internet público en la misma VPC, la solución canónica es: **Private VIF** para tráfico local (rutas propagadas por BGP) + **Internet Gateway (IGW)** con ruta `0.0.0.0/0 -> igw` para clientes de internet. Transit Gateway no reemplaza un IGW local en la VPC sin salida pública dedicada.

---

## Pregunta 2 de 7: Conexión secundaria de respaldo costo-eficiente y de baja latencia

*Tarea: 1.1 / 1.3 / 1.5 — Continuidad híbrida y optimización de costos*

### Enunciado

A company plans to implement highly available hybrid connectivity between its on-premises data center and an AWS Region. The company will use a transit gateway and an AWS Direct Connect dedicated connection that has a port speed of 10 Gbps to implement a centralized networking model. In case of an interruption in connectivity, the company plans to use a secondary connection for its most critical latency-sensitive applications. These applications do not have high data-transfer activity.

What is the MOST cost-effective way to configure the secondary connection?

### Opciones de respuesta

- **A.** Set up an accelerated AWS Site-to-Site VPN connection. Enable NAT-traversal (NAT-T) for the accelerated VPN connection.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** Las conexiones **Accelerated Site-to-Site VPN** utilizan AWS Global Accelerator para enrutar el tráfico desde la red local hasta la ubicación de borde (Edge Location) de AWS más cercana mediante Anycast IP. Desde allí, el tráfico transita por la red global de AWS libre de congestión, proporcionando menor latencia, menor jitter y mayor rendimiento en comparación con la Internet pública tradicional. Es la solución más económica y costo-eficiente porque no requiere pagar un segundo circuito dedicado Direct Connect mensual cuando el volumen de transferencia de datos es bajo.
  - 📖 Más información: [Accelerated Site-to-Site VPN Connections](https://docs.aws.amazon.com/vpn/latest/s2svpn/accelerated-vpn.html) y [How AWS Global Accelerator Works](https://docs.aws.amazon.com/global-accelerator/latest/dg/introduction-how-it-works.html)

- **B.** Set up a second Direct Connect connection that has a port speed of 10 Gbps. Create a link aggregation group (LAG) for both connections.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Direct Connect proporciona alto ancho de banda privado. La creación de un LAG requiere conexiones de la misma velocidad (10 Gbps) y pagar los costos de un segundo puerto dedicado de 10 Gbps para aplicaciones que casi no transfieren datos no es la solución más rentable (cost-effective).
  - 📖 Más información: [Link Aggregation Groups](https://docs.aws.amazon.com/directconnect/latest/UserGuide/lags.html)

- **C.** Set up multiple AWS Site-to-Site VPN connections. Enable VPN equal-cost multi-path (ECMP) support for the transit gateway.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Las conexiones Site-to-Site VPN convencionales sobre Transit Gateway con ECMP permiten agregar ancho de banda (balanceando entre túneles de 1.25 Gbps) y aumentan la resiliencia, pero **no mejoran la latencia** debido a que los paquetes siguen viajando por la Internet pública sujeta a congestión y variaciones de ruta. Por ello, no es adecuada para aplicaciones sensibles a la latencia (*latency-sensitive*).
  - 📖 Más información: [What Is AWS Site-to-Site VPN?](https://docs.aws.amazon.com/vpn/latest/s2svpn/VPC_VPN.html), [Site-to-Site VPN Single and Multiple Connection Examples](https://docs.aws.amazon.com/vpn/latest/s2svpn/Examples.html) y [Transit Gateways](https://docs.aws.amazon.com/vpc/latest/tgw/tgw-transit-gateways.html)

- **D.** Set up a second Direct Connect connection that has a port speed of 1 Gbps. Create a link aggregation group (LAG) for both connections.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Un LAG exige puertos de la misma velocidad idéntica (no se puede mezclar 10 Gbps con 1 Gbps en un LAG). Además, aprovisionar un circuito de fibra adicional no es costo-eficiente.
  - 📖 Más información: [Link Aggregation Groups](https://docs.aws.amazon.com/directconnect/latest/UserGuide/lags.html)

> [!important] Trampa de examen
> Cuando el enunciado pida un respaldo para Direct Connect que sea **sensible a la latencia** pero con **bajo volumen de transferencia de datos** y con **menor costo (MOST cost-effective)**: la respuesta es **Accelerated Site-to-Site VPN** (usa Global Accelerator edge POPs). ECMP sobre VPN estándar suma ancho de banda, no baja latencia.

---

## Pregunta 3 de 7: Arquitectura de 3 capas y retorno de tráfico con Network ACLs

*Tarea: 1.2 — Controles de seguridad y filtrado de tráfico en VPC*

### Enunciado

A developer created a proof of concept architecture on AWS that has the following characteristics:
- An Amazon EC2 instance hosts a web application in a public subnet named A with a security group named SG-1 that allows communication from the internet.
- An EC2 instance hosts a middle-tier application in a private subnet named B with a security group named SG-2 that allows communication from SG-1.
- An Amazon RDS database runs in a private subnet named C with a security group named SG-3 that allows communication from SG-2.
- A custom network ACL is associated with subnet C to allow incoming database traffic from the middle-tier EC2 instance.

The developer finds that an error is occurring in the web application. The database updates correctly. However, the web application does not receive a valid response.

What should the developer do to ensure that the application receives valid responses?

### Opciones de respuesta

- **A.** Update the custom network ACL to include an outgoing rule to allow traffic on port range 1,024–65,535 to the middle tier.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** Las Network ACLs son **stateless** (sin estado). A diferencia de los Security Groups, requieren reglas explícitas tanto de entrada (inbound) como de salida (outbound). Cuando el middle-tier envía una consulta a RDS (puerto de DB, e.g. 3306 o 5432), la respuesta de la base de datos debe retornar al cliente hacia un **puerto efímero** (rango 1024–65535). Si la custom NACL en la subred C solo tiene regla entrante y carece de la regla saliente para puertos efímeros, la base de datos procesa la consulta (se actualiza correctamente) pero su respuesta es bloqueada al salir.
  - 📖 Más información: [Control Traffic to Subnets Using Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)

- **B.** Update the default network ACL for Subnets A and B to include rules to allow all incoming and outgoing traffic between the two subnets.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Las Network ACLs por defecto ya vienen configuradas con reglas que permiten todo el tráfico entrante y saliente (`Rule 100: ALL Traffic - Allow`). No existe ningún bloqueo en las NACLs por defecto de las subredes A y B.
  - 📖 Más información: [Control Traffic to Subnets Using Network ACLs](https://docs.aws.amazon.com/vpc/latest/userguide/vpc-network-acls.html)

- **C.** Update SG-1 to include an incoming rule to allow communication from SG-2.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los Security Groups son **stateful** (con estado). Si SG-1 origina una petición hacia SG-2, el tráfico de respuesta es permitido de regreso automáticamente, sin requerir reglas de entrada para el retorno.
  - 📖 Más información: [Control Traffic to Resources Using Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

- **D.** Update SG-2 to include an incoming rule to allow communication from SG-3.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Por la naturaleza stateful de los Security Groups, la respuesta que emite SG-3 hacia SG-2 entra automáticamente por ser el retorno de una conexión establecida previamente por SG-2.
  - 📖 Más información: [Control Traffic to Resources Using Security Groups](https://docs.aws.amazon.com/vpc/latest/userguide/VPC_SecurityGroups.html)

> [!important] Trampa de examen
> Síntoma clásico: *"La base de datos se actualiza pero el frontend o cliente da timeout / no recibe respuesta"*.
> Causa: Una **Custom NACL** (stateless) fue aplicada a la subred de datos y le falta la regla saliente (**Outbound Rule**) hacia los **puertos efímeros (1024–65535)**. Los Security Groups son stateful y nunca causan este síntoma en respuestas a peticiones establecidas.

---

## Pregunta 4 de 7: Streaming y visualización en tiempo casi real con mínima sobrecarga

*Tarea: 1.1 / 1.5 — Soluciones cloud-native y menor esfuerzo operativo*

### Enunciado

A company has implemented Amazon Connect so that the company's employees can address inbound user inquiries. The company has activated Amazon Connect agent event streams to push real-time events and statuses to Amazon Kinesis Data Streams. The company wants to build a dashboard to show the status of events in near real time, with no more than 10 minutes of lag.

Which solution will meet these requirements with the LEAST amount of implementation overhead?

### Opciones de respuesta

- **A.** Use the KCL to consume the data from Kinesis Data Streams in Amazon OpenSearch Service. Build an OpenSearch Dashboards dashboard to retrieve the data in OpenSearch Service.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** KCL (Kinesis Client Library) requiere programar, aprovisionar, hospedar y mantener aplicaciones consumidoras personalizadas en instancias o contenedores, lo cual introduce un alto overhead de desarrollo y mantenimiento.
  - 📖 Más información: [What Is the Kinesis Client Library?](https://docs.aws.amazon.com/streams/latest/dev/shared-throughput-kcl-consumers.html#shared-throughput-kcl-consumers-overview)

- **B.** Use an Amazon Data Firehose delivery stream to save data from the Amazon Connect agent event streams to Amazon OpenSearch Service. Build an OpenSearch Dashboards dashboard to show the required information.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** Amazon Data Firehose cuenta con soporte e integración nativa directa como destino hacia Amazon OpenSearch Service, sin necesidad de servidores ni código consumidor custom. Firehose entrega datos con un buffer configurable (tan bajo como 60 segundos), cumpliendo sobradamente el requerimiento de menos de 10 minutos de lag con el **menor esfuerzo de implementación (LEAST overhead)**.
  - 📖 Más información: [Loading Streaming Data into Amazon OpenSearch Service](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/integrations.html)

- **C.** Use an Amazon Data Firehose delivery stream with a data-transformation AWS Lambda function to save data from the Amazon Connect agent event streams to Amazon S3 and to store a manifest file. Use Amazon QuickSight to query for the desired agent data from Amazon S3.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Amazon QuickSight no consulta archivos crudos directamente desde S3 sin usar Amazon Athena o cargar conjuntos SPICE. Además, la frecuencia de refresco programada más pequeña para SPICE es de **15 minutos**, lo cual viola el requisito de un desfase máximo de 10 minutos.
  - 📖 Más información: [Refreshing a Dataset on a Schedule](https://docs.aws.amazon.com/quicksight/latest/user/refreshing-imported-data.html#schedule-data-refresh)

- **D.** Use an Amazon Data Firehose delivery stream with a data-transformation AWS Lambda function to insert the data into Amazon Redshift in JSON format. Use Amazon QuickSight to query Amazon Redshift for the desired agent data.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Firehose tiene soporte nativo para Redshift, pero incluir una función Lambda para transformar datos y montar un pipeline sobre un data warehouse como Redshift + QuickSight agrega una complejidad e implementación innecesarias frente a la integración directa nativa entre Firehose y OpenSearch Service.
  - 📖 Más información: [Choose Amazon Redshift for Your Destination](https://docs.aws.amazon.com/firehose/latest/dev/create-destination.html#create-destination-redshift)

> [!important] Trampa de examen
> Para ingesta de streaming hacia dashboards en tiempo casi real (< 10 min) con **mínima sobrecarga operativa**: el pipeline serverless canónico es **Kinesis Data Streams -> Amazon Data Firehose -> Amazon OpenSearch Service -> OpenSearch Dashboards**. QuickSight SPICE tiene un piso de refresco de 15 minutos.

---

## Pregunta 5 de 7: API global con optimización de latencia y recuperación ante desastres (Active/Standby)

*Tarea: 1.1 / 1.3 — Resiliencia global y enrutamiento DNS*

### Enunciado

A company plans to run a REST-based application in the AWS Cloud. The application will serve a global audience. The company will deploy the application primarily in one AWS Region. There will be a secondary deployment in another Region for disaster recovery. The company wants to optimize latency for its customer requests. The company wants to serve all requests by using Amazon API Gateway as an entry point that uses Amazon Route 53.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Use edge-optimized API Gateway endpoints. In Route 53, configure a traffic policy that evaluates a latency routing policy first and a failover routing policy second for each endpoint along with a health check for each endpoint.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Si se evalúa primero una política de enrutamiento por latencia (Latency-based routing), el tráfico de los clientes se dividirá geográficamente entre la región primaria y la secundaria en base al tiempo de ida y vuelta. Esto viola el requerimiento de arquitectura de contingencia (hot standby / DR), donde el 100% de las solicitudes normales deben atenderse en la región primaria y sólo derivarse a la secundaria ante una interrupción.
  - 📖 Más información: [Creating and Managing Traffic Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/traffic-policies.html) y [Plan for Disaster Recovery (DR)](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html)

- **B.** Use edge-optimized API Gateway endpoints. In Route 53, configure a failover routing policy and a health check for each endpoint.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:**
    1. **Optimización de latencia global:** Un endpoint **edge-optimized** de API Gateway enruta automáticamente las solicitudes a través de la red perimetral de Amazon CloudFront (Point of Presence - PoP) más cercano al cliente, reduciendo la latencia de establecimiento de conexión TCP/TLS.
    2. **Estrategia DR Active/Standby:** La política de **Failover** de Route 53 combinada con **health checks** garantiza que todas las solicitudes vayan al endpoint primario durante operación normal y conmuten a la región secundaria exclusivamente en caso de fallo.
  - 📖 Más información: [Choose an Endpoint Type to Set Up for an API Gateway API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html), [Choosing a Routing Policy](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/routing-policy.html) y [How Amazon Route 53 Chooses Records When Health Checking is Configured](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-how-route-53-chooses-records.html)

- **C.** Use regional API Gateway endpoints. In Route 53, configure a latency routing policy and a health check for each endpoint.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los endpoints regionales de API Gateway no aprovechan los puntos perimetrales de CloudFront, por lo que no optimizan la latencia para una audiencia global diversa. Además, el enrutamiento por latencia no proporciona el modelo de failover pasivo requerido.
  - 📖 Más información: [Choose an Endpoint Type to Set Up for an API Gateway API](https://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-api-endpoint-types.html)

- **D.** Use regional API Gateway endpoints. In Route 53, configure a traffic policy that evaluates a failover routing policy first and a latency routing policy second for each endpoint along with a health check for each endpoint.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Los endpoints regionales no optimizan la latencia de llegada global. Además, anidar failover primero y latencia después entre endpoints regionales en dos regiones no es la solución adecuada para el modelo de punto de entrada descrito.
  - 📖 Más información: [Creating and Managing Traffic Policies](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/traffic-policies.html) y [How Internet Traffic is Routed to Your Website or Web Application](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/welcome-dns-service.html)

> [!important] Trampa de examen
> Si un escenario exige **audiencia global + entrada API Gateway**, la optimización de latencia la proveen los endpoints **Edge-optimized** (apoyados en CloudFront). Si el objetivo es **Disaster Recovery (despliegue primario + secundario de respaldo)**, la política DNS es **Failover con Health Checks**, NUNCA Latency routing (que distribuiría tráfico activo a ambas regiones).

---

## Pregunta 6 de 7: Disaster Recovery en base de datos Aurora con RTO/RPO mínimo

*Tarea: 1.3 / 1.4 — Resiliencia y estrategias de base de datos entre regiones*

### Enunciado

A company plans to deploy a web application that will serve a global audience. The application will run on Amazon EC2 instances behind an Application Load Balancer. The company will deploy the application to two AWS Regions. The company sets up an Amazon Aurora MySQL DB cluster in the first Region. The company must minimize latency for all Aurora database operations. The company also needs to design a disaster recovery (DR) procedure with minimal data loss and a low RTO.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Create a manual snapshot of the existing Aurora DB cluster. Copy the snapshot to the second Region on a frequent basis. Restore a new Aurora DB cluster by using the snapshot when recovery is necessary.
  - ❌ **Tu respuesta: Incorrecto**
  - **Por qué es incorrecto:** Los snapshots manuales copian el volumen de almacenamiento completo. Transferir y restaurar un snapshot entre regiones toma varias horas (RTO elevado) y la información generada entre snapshots se pierde (RPO elevado). No cumple los requisitos de mínima pérdida de datos ni bajo RTO.
  - 📖 Más información: [Copying a DB Cluster Snapshot](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-copy-snapshot.html#USER_CopySnapshot.AcrossRegions)

- **B.** Create a secondary Aurora DB cluster in the second Region to perform read operations by configuring an Aurora global database. Turn on write forwarding and direct the database's write forwarding to the primary DB cluster. Activate Aurora managed planned failover when recovery is necessary.
  - ❌ **Por qué sería incorrecto:** La característica de **managed planned failover** en Aurora Global Database está concebida exclusivamente para mantenimientos programados donde el clúster primario está 100% saludable y operativo (sincroniza datos y revierte roles sin pérdida de datos). En una situación real de **desastre o interrupción no programada**, el clúster primario no está disponible para coordinar un planned failover; se requeriría un *unplanned failover* (desacoplar y promover el clúster secundario). Por ende, esta opción falla por invocar el procedimiento incorrecto de failover.
  - 📖 Más información: [Using Amazon Aurora Global Databases](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) y [Using Failover in an Amazon Aurora Global Database](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html)

- **C.** Create an Aurora Replica in the second Region to direct read operations. Use the Aurora cluster endpoint in the first Region to perform write operations. Promote the Aurora Replica to a standalone database when recovery is necessary.
  - ✅ **Respuesta correcta**
  - **Por qué es correcto:** La creación de una **Cross-Region Aurora Replica** replica datos de manera asíncrona continua con un desfase típico de réplica inferior a un segundo. Esto minimiza la latencia para las operaciones de lectura en la segunda región y permite una promoción rápida de la réplica a base de datos independiente (*standalone*) ante un desastre, alcanzando un RTO de minutos y un RPO casi nulo.
  - 📖 Más información: [Replication with Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/Aurora.Replication.html) y [Replicating Amazon Aurora MySQL DB Clusters across AWS Regions](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/AuroraMySQL.Replication.CrossRegion.html)

- **D.** Create a primary Aurora DB cluster in the second Region to perform read and write operations individually. Synchronize the two clusters by using a single AWS DMS task. Direct all requests to the healthy DB cluster when recovery is necessary.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** La sincronización bidireccional continua entre dos clústeres primarios activos requeriría al menos dos tareas separadas de DMS (no una sola) y acarrea una enorme complejidad de resolución de conflictos de escritura en dos vías.
  - 📖 Más información: [Creating Tasks for Ongoing Replication Using AWS DMS](https://docs.aws.amazon.com/dms/latest/userguide/CHAP_Task.CDC.html)

> [!important] Trampa de examen
> Atención al término: **Managed PLANNED Failover** en Aurora Global Database solo funciona cuando la región primaria está activa (para rotación o mantenimiento). En caso de desastre (*disaster recovery*), la acción técnica es promover la réplica entre regiones (**Promote to standalone DB**) o realizar un failover manual no planificado.

---

## Pregunta 7 de 7: Rendimiento de base de datos, alta disponibilidad y latencia sub-milisegundo

*Tarea: 1.1 / 1.3 — Optimización de rendimiento y almacenamiento en memoria*

### Enunciado

A company has application that uses an Application Load Balancer in front of an Auto Scaling group to run web and application servers across two Availability Zones. A Multi-AZ Amazon RDS database serves as the data store. The CPU usage for the database layer is often high. Most I/O operations are repetitive reads. The application sometimes fails because of timeouts. The application requires that most of the repetitive reads have sub-millisecond latency, which the current configuration does not provide. A solutions architect must configure a solution to decrease the latency. The solution must also be highly available.

Which solution will meet these requirements?

### Opciones de respuesta

- **A.** Configure an ElastiCache (Redis OSS) cluster with a replication group that consists of at least one additional read replica node. Configure Multi-AZ for the Redis replication group. Modify the application to direct repetitive reads to the new cache.
  - ✅ **Tu respuesta: Correcto**
  - **Por qué es correcto:** **Amazon ElastiCache (Redis OSS)** es un motor de almacenamiento en memoria que entrega lecturas repetitivas con **latencia de sub-milisegundo** garantizada. Configurar un grupo de replicación con réplicas de lectura y **Multi-AZ** proporciona alta disponibilidad y conmutación por error automática (*automatic node failover*), descargando por completo la CPU de la base de datos RDS.
  - 📖 Más información: [ElastiCache (Redis OSS)](https://docs.aws.amazon.com/whitepapers/latest/scale-performance-elasticache/elasticache-for-redis.html) y [Mitigating Failures in ElastiCache](https://docs.aws.amazon.com/AmazonElastiCache/latest/red-ug/FaultTolerance.html)

- **B.** Configure an ElastiCache (Memcached) cluster on two nodes in different Availability Zones. Modify the application to direct repetitive reads to the new cache.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** ElastiCache (Memcached) no admite replicación entre nodos, réplicas de lectura ni conmutación por error automática en múltiples AZ. Si un nodo cae, sus datos se pierden; no ofrece la alta disponibilidad que sí provee Redis Multi-AZ.
  - 📖 Más información: [Comparing Valkey, Memcached, and Redis OSS self-designed caches](https://docs.aws.amazon.com/AmazonElastiCache/latest/mem-ug/SelectEngine.html)

- **C.** Create summary tables that can serve the repetitive reads in the existing RDS database. Update the application to read from the summary tables.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** Las tablas resumen dentro de RDS siguen dependiendo de almacenamiento en disco y consumiendo CPU en el motor relacional. No son capaces de proveer latencia consistente de sub-milisegundo.
  - 📖 Más información: [ElastiCache (Redis OSS)](https://docs.aws.amazon.com/whitepapers/latest/scale-performance-elasticache/elasticache-for-redis.html)

- **D.** Create an Amazon OpenSearch Service Multi-AZ domain cluster to store and index the data that the application reads repetitively. Configure UltraWarm storage to improve latency performance. Modify the application to direct repetitive reads to the OpenSearch Service cluster.
  - ❌ **Incorrecto**
  - **Por qué sería incorrecto:** OpenSearch Service está optimizado para indexación y búsqueda analítica de texto completo o logs, no como caché relacional en memoria de sub-milisegundo. Además, el almacenamiento **UltraWarm** es un tier tibio respaldado en S3, considerablemente más lento que el tier caliente estándar.
  - 📖 Más información: [What Is Amazon OpenSearch Service?](https://docs.aws.amazon.com/opensearch-service/latest/developerguide/what-is.html)

> [!important] Trampa de examen
> Regla de oro:
> - **Lecturas repetitivas con latencia sub-milisegundo + Alta Disponibilidad** = **Amazon ElastiCache for Redis (con grupo de replicación Multi-AZ)**.
> - Memcached no tiene replicación ni failover automático.
> - Tablas resumen o réplicas de lectura en disco en RDS no bajan a latencia de sub-milisegundo.

---

_Fuente: [Skill Builder - Domain 1 Practice (SAP-C03)](https://skillbuilder.aws/renderer/?module_id=EXYKC31MQF%3A001.000.000&product_id=UJV7VCRTPH%3A001.000.000&registration_id=5c123ab4-0556-561f-8023-dd541a2168d1&referrer=https%3A%2F%2Fskillbuilder.aws%2Flearn%2FWFFGJFSDMT%2Fdomain-1-practice-aws-certified-solutions-architect--professional-sapc03--english%2FUJV7VCRTPH&navigation=digital_)
