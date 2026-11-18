---
title: "AWS Solutions Architect Advanced — Optimizing Hybrid Architectures"
aliases:
  - "Optimizing Hybrid Architectures"
  - "Índice Optimizing Hybrid Architectures"
  - "Módulo de arquitecturas híbridas"
  - "Arquitecturas híbridas"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - hybrid
  - networking
  - indice
  - dominio-1
  - dominio-2
status: en-curso
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Optimizing Hybrid Architectures

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> **Estado (29/10/2026):** **contenido completo**, **13 lecciones cargadas** (01-13). Los **ocho objetivos**
> quedaron **cubiertos**, la **arquitectura final** está en la 11, la **12** suma **dos casos de
> troubleshooting** y la **13** es la **actividad final** con **seis preguntas**. Falta solo el **cierre**:
> checklist consolidado, mapa de progreso final y **quiz integrador**.

> [!info] Mapeo del examen
> El eje probable es la tarea **1.1 — Diseñar estrategias de conectividad de redes**, en su parte **híbrida**:
> cómo se conecta lo que corre **on-premises** con lo que corre en **AWS**.
>
> **Cruces probables:** **1.3 — Diseñar arquitecturas fiables y resistentes** (resiliencia del enlace),
> **2.2 — Diseñar una solución para garantizar la continuidad de actividades** (failover),
> **2.5 — Diseñar una solución para cumplir con los objetivos de rendimiento** (latencia y throughput) y
> **1.5 / 2.6** (costos de transferencia).
>
> **Es un mapeo tentativo:** las tareas exactas por lección se anotan **cuando la lección llega**; acá no se
> adivinan. Si el módulo toma otro eje, se corrige en este bloque y se registra.

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como ✅ solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 📌 Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | Course Overview | Ocho objetivos en tres capas: conectividad, DNS y borde | 🔵 | [[Course Overview - Optimizing Hybrid Architectures]] |
| 02 | Gathering the Customer Requirements | Caso institución financiera: cinco conversaciones y cuatro requisitos | 🔵 | [[Gathering the Customer Requirements - Hybrid]] |
| 03 | AWS Client VPN | VPN de usuarios: endpoint, componentes, autenticación, split tunnel y demo | 🔵 | [[AWS Client VPN]] |
| 04 | AWS Site-to-Site VPN | VPN de redes: VGW, EC2 y TGW, redundancia de cuatro caminos, ECMP y aceleración | 🔵 | [[AWS Site-to-Site VPN]] |
| 05 | Direct Connect — Connection Options | Enlace dedicado: componentes, tres VIF y cinco formas de armar el camino | 🔵 | [[AWS Direct Connect - Connection Options]] |
| 06 | Direct Connect — Redundancy and Resilience | Basic, high y maximum resiliency, LAG y VPN de respaldo | 🔵 | [[AWS Direct Connect - Redundancy and Resilience]] |
| 07 | Route 53 Resolver | DNS híbrido: private hosted zones, inbound y outbound, cuenta de red | 🔵 | [[Amazon Route 53 Resolver]] |
| 08 | AWS Outposts | AWS en el predio: rack 42U y server 1U/2U, VPC extendida y RDS local | 🔵 | [[AWS Outposts]] |
| 09 | AWS Local Zones | Latencia de un dígito: satélites de la Region en ciudades sin Region | 🔵 | [[AWS Local Zones]] |
| 10 | AWS Wavelength | 5G en la red del carrier: carrier gateway, < 20 ms y racks en el CSP | 🔵 | [[AWS Wavelength]] |
| 11 | Finished Architecture | El caso financiero armado: DX doble + VPN + TGW, borde, DNS, Outposts y trade-offs | 🔵 | [[Finished Architecture]] |
| 12 | BuildingBlocks Videos | Dos troubleshooting: forwarding rules faltantes y DX inter-region peering | 🔵 | [[BuildingBlocks Videos - Hybrid]] |
| 13 | Activity - Architecture Challenge | AnyCompany: seis preguntas, DX + ECMP + híbrido, Client VPN y Outposts | 🔵 | [[Activity - Architecture Challenge]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 📐 Reglas del módulo

Las mismas de los módulos anteriores, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, algoritmos, nombres exactos de servicios y políticas.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

---

## 🗂️ Qué cubre cada sesión

### 01 — Course Overview

- **Formato**: página de texto (**summary** + **Course details**). **Sin video, sin demo, sin knowledge check,
  sin imágenes.**
- **La promesa**: diseñar e implementar **arquitecturas híbridas y de borde** con **servicios de conectividad** y
  **edge computing**, para **comunicación confiable y de baja latencia** entre **on-premises, edge y AWS**.
- **Los ocho objetivos**: **Client VPN vs. Site-to-Site VPN** · **Site-to-Site VPN resiliente** ·
  **configuraciones de Direct Connect** · **HA de DX + VPN de respaldo** · **Route 53 Resolver endpoints** ·
  **Outposts** (residencia de datos, **racks y servers**) · **Local Zones** · **Wavelength con 5G**.
- **Los tres bloques**: **conectividad** (1–4), **DNS** (5) y **borde** (6–8). **Lectura propia**: la fuente
  enumera los objetivos sin agruparlos.
- **Audiencia**: solutions architect con **2+ años en el rol**. **Prerrequisitos**: SAA (learning plan o
  examen), evaluar requisitos y recomendar arquitectura, **2+ años usando AWS**.
- **Huecos registrados**: **“Route 52 Resolver”** (errata por **Route 53**); `****Course Objectives****` como
  artefacto de formato; **sin lecciones enumeradas**, **sin duración**, **sin cuotas ni costos**.
- **Nota**: [[Course Overview - Optimizing Hybrid Architectures]]

### 02 — Gathering the Customer Requirements

- **Formato**: video (**3 min 56 s**) + bloque **“Architecture requirements”** + **flashcards sin contenido**.
- **El caso**: **institución financiera** con **footprint on-premises sustancial**; las aplicaciones **no están
  listas para migrar**. El movimiento es **extender** a AWS, no migrar.
- **Para qué**: **disaster recovery** y **cloud bursting**, con **conectividad segura y privada**.
- **Las cinco conversaciones**: performance de **trading** · **regulación** y protección de datos · **DR** con
  RTO/RPO · **capacidad** y picos · **monitoreo** y auditoría.
- **Los cuatro requisitos**: conexión **privada y segura** · **DR robusto** · **monitoreo y gobierno** ·
  **low-latency performance**.
- **Discrepancia**: la transcripción pone **cloud bursting** como tercer requisito; la lista fija lo reemplaza
  por **low-latency performance**. Se registran las dos.
- **Cita**: **Joe Gallagher** — *“not only performs well, but also satisfies their strict compliance
  requirements.”*
- **Huecos**: sin **valores de RTO/RPO**, sin métricas de tráfico y **sin servicios** asignados.
- **Nota**: [[Gathering the Customer Requirements - Hybrid]]

### 03 — AWS Client VPN

- **Formato**: video conceptual (**5 min 49 s**) + lectura + **demo de 12 min 23 s**.
- **Qué es**: VPN **de usuarios** con cliente **OpenVPN** y **TLS**; **no** une redes. El **endpoint** es
  **regional** y ahí **terminan** las sesiones.
- **Las siete capacidades**: TLS de un solo túnel · administrado · **HA y elasticidad** · **tres
  autenticaciones** · control granular · **connection logs** · integración con **Directory Service** y **VPC**.
- **Setup mínimo**: VPC con subnet · **client CIDR sin superposición** · endpoint en la misma Region · asociar
  subnet · **authorization rule** · **security group**.
- **Componentes**: endpoint · **target network** · **route** · **authorization rule** · **client CIDR** ·
  **Client VPN network interface** (hace **source NAT**).
- **Autenticación**: **AD** (Directory ID), **SAML 2.0** (provider ARN) y **certificado** (ACM); **al menos
  una**. Flujo SAML con **IAM Identity Center** en **seis pasos**. **AD on-premises exige Site-to-Site VPN**.
- **Split tunnel**: habilitado, solo la VPC va por la VPN; deshabilitado, **todo** el tráfico.
- **Destinos**: VPC · **peered VPC** · **servicios de AWS** · **internet** · **on-premises** por **DX** o
  **Site-to-Site VPN**.
- **Reglas**: subnet **`/27`** mínimo y **8 IPs** · una subnet **por AZ** · mismo **VPC** · **local route**
  automática · `pending-associate` → `available`.
- **Demo**: client CIDR **`10.2.0.0/22`**, VPC **`10.1.0.0/16`**, subnet **`private-1a`**, **UDP**, **cinco
  perfiles** en el cliente.
- **Huecos**: cuotas, precios, tamaño máximo del client CIDR; **imágenes ausentes**.
- **Nota**: [[AWS Client VPN]]

### 04 — AWS Site-to-Site VPN

- **Formato**: video conceptual (**7 min 52 s**) + **cinco lecturas**. **Sin demo y sin knowledge check.**
- **Qué es**: VPN **de redes**, con **túneles IPsec** **siempre encendidos** entre la red **on-premises** y AWS.
  Client VPN conecta **personas**; esta conecta **redes**.
- **Default que importa**: las instancias de una VPC **no ven la red remota** hasta que se crea la VPN **y se
  configura el routing**.
- **Las tres opciones**: **virtual private gateway** (administrado) · **EC2 con software VPN** (**no
  administrado**) · **transit gateway** (hub). La elección depende de **qué lograr**, **cuánto tráfico** y
  **cuánta complejidad**.
- **Componentes**: **VGW** (concentrador del lado AWS) · **customer gateway device** (equipo on-premises) ·
  **customer gateway** (el recurso de AWS que lo representa: IP pública + **BGP ASN**) · **dos túneles**.
- **Quién levanta el túnel**: **el dispositivo on-premises**, generando tráfico e **iniciando IKE**. El archivo de
  configuración se **descarga por dispositivo** y trae **cada túnel**; **tunnel options** y **DPD** son opcionales.
- **Opción 1 (VGW)**: **endpoints redundantes** automáticos y **dos túneles en AZs distintas**. Routing **estático**
  o **dinámico con BGP**. Límites: **IPv6 no soportado sobre VGW** y **sin Path MTU Discovery**; **CIDR sin
  superposición**.
- **Opción 2 (EC2)**: control total de **ambos extremos** (a veces por **compliance**) o **protocolo no IPsec**
  (ej. **GRE**). AWS **no provee ni mantiene** los appliances: **Marketplace** y open source.
- **Opción 3 (TGW)**: **un attachment** da acceso a **todas las VPC** adjuntas y elimina una conexión por VPC.
  Mezcla **VPN + Direct Connect + VPC attachments**. **50 gigabytes por segundo por VPC attachment** *(cifra del
  video)*. Con **NAT-T**: IP pública del NAT + **UDP 4500** abierto.
- **Redundancia**: **segunda conexión + segundo CGW** con los **mismos rangos anunciados** → **2 × 2 = 4 caminos**;
  failover **automático en segundos**; permite **mantenimiento** de un equipo sin cortar.
- **Throughput**: **1.25 Gbps por túnel**; **las VPN no se agregan solas**. **ECMP** = **TGW** + **routing
  dinámico** + **varios túneles** + **CGW compatible**; reparte con **hash de 5 tuplas**; **un flujo = un túnel**
  (medir con **flujos paralelos**, `iPerf -P`); **ruteo asimétrico OK** (IP es stateless), salvo **firewall
  stateful** → **source NAT**.
- **Aceleración**: **Global Accelerator** lleva el tráfico a la **edge más cercana al CGW** y de ahí por la red
  privada de AWS. **Dos aceleradores**, uno por túnel, **administrados por AWS** e **invisibles** en la consola.
- **Huecos**: sin **precios**, sin **cuotas**, sin **demo**, sin **Knowledge Check**, imágenes ausentes y enlaces a
  la guía sin contenido.
- **Nota**: [[AWS Site-to-Site VPN]]

### 05 — Direct Connect: Connection Options

- **Formato**: video conceptual (**7 min 52 s**) + **dos lecturas**. **Sin demo y sin knowledge check.**
- **Qué resuelve**: **ancho de banda consistente** y **menos riesgo de perder conectividad**; enlace **dedicado**,
  **latencia predecible** y **menor costo de transferencia** en volúmenes grandes.
- **El costo de la autopista**: **más setup y más inversión inicial** que una VPN, porque *se levanta una autopista
  privada en vez de usar las rutas existentes*.
- **Los tres componentes**: **physical connection** (fibra) · **Direct Connect location** (instalación donde termina)
  · **VIF** (configuración lógica: los carriles).
- **Regla que decide exámenes**: **privado no es cifrado**. Direct Connect **no cifra por default**.
- **Tres VIF**: **public** (servicios públicos de todas las Regions) · **private** (una VPC, una Region) · **transit**
  (transit gateways).
- **Cifras**: **jumbo frames 9,023 bytes** (estándar **1,522**) · **sub-1 Gb = un solo VIF** · **`/31`** asignado por
  AWS si no tenés IPs públicas · **ASN público** propio o **privado**.
- **Cinco opciones**: private VIF → **VGW** (una VPC) · private VIF → **DX gateway** (multi-Region) · transit VIF →
  **TGW** (multi-VPC) · **VPN sobre public VIF** (cifrado) · **private IP VPN** con DX gateway (cifrado + IPs
  privadas + **5,000/1,000** rutas contra **20/100**).
- **Las dos negaciones de la opción 1**: **no** da acceso a **VPC endpoints** y **no** hay **transitividad** por
  peering.
- **La trampa del DX gateway**: es **global** y llega a muchas Regions, pero **no permite tráfico entre sus
  asociaciones** (VGW → VGW). Para que las VPC se hablen: **TGW**; para aislarlas: **route table `blackhole`**.
- **Huecos**: sin **precios**, **velocidades de puerto**, **LAG**, **BFD**, **MACsec**, **SLA** ni **demo**; la alta
  disponibilidad de DX **no está** en esta lección.
- **Nota**: [[AWS Direct Connect - Connection Options]]

### 06 — Direct Connect: Redundancy and Resilience

- **Formato**: video conceptual (**2 min 16 s**) + **una lectura**. **Sin demo y sin knowledge check.**
- **La frase que ordena todo**: **“Everything fails, all the time”** (Werner Vogels). Se diseña para **cuando**
  falla, no para **si** falla.
- **Basic device resiliency**: **2 conexiones en dispositivos distintos, 1 location**. Cubre **dispositivo**, **no**
  location. Para **desarrollo y prueba**.
- **High resiliency**: **2 conexiones a múltiples locations**. Cubre **corte de fibra** y **dispositivo**;
  **previene** la falla de location.
- **Maximum resiliency**: **conexiones separadas en dispositivos separados en más de una location**. Cubre
  **dispositivo + conectividad + location**. Es la **más cara**: el **“dormir tranquilo”**.
- **LAG**: **LACP**, hasta **4 enlaces**, **100/10/1 Gbps**, **misma velocidad** y **mismo equipamiento**; **no**
  admite **< 1 Gbps**. **Simplifica la configuración**, **no** protege de una location.
- **VPN de respaldo**: **mismo VGW** y **mismos prefijos** (BGP o estáticos). La VPN **no da el mismo ancho de
  banda**: la app tiene que tolerarlo.
- **La regla que decide exámenes**: con las **mismas rutas**, **Direct Connect gana siempre**, **aunque haya
  AS-Path prepending**. Y hay que preferir DX **también desde on-premises** para **evitar ruteo asimétrico**.
- **Huecos**: sin **SLA**, **tiempos de conmutación**, **precios**, **MACsec/BFD**, ni combinaciones **LAG + VPN**.
- **Nota**: [[AWS Direct Connect - Redundancy and Resilience]]

### 07 — Route 53 Resolver

- **Formato**: video conceptual (**3 min 7 s**) + **una lectura** (*Private Hosted Zones*). **Sin demo y sin
  knowledge check.**
- **La pregunta del lead developer**: *¿cómo hace la gente on-premises para **conectarse a recursos en zonas
  privadas**?* La red ya está; lo que falta es que las aplicaciones **se encuentren por nombre**.
- **Private hosted zone**: registros **A/AAAA** con **nombres personalizados** dentro de una o más **VPC**; el
  **directorio telefónico** de la VPC.
- **Private DNS** en un **VPC endpoint** crea una **zona administrada por AWS** que **solo resuelve dentro de esa
  VPC**: **no** fuera y **no** desde on-premises por default.
- **Inbound endpoint**: **on-premises → AWS**. Vive en la **misma VPC que el VPC endpoint** y se acompaña de un
  **conditional forwarder** en el DNS de la empresa.
- **Outbound endpoint**: **AWS → on-premises**, disparado por una **forwarding rule** que matchea el dominio.
- **Capa 3 siempre**: **VPN** o **Direct Connect** hacia un **transit gateway** (o **VGW**).
- **Cuenta de red**: endpoints en una **VPC dedicada** y **reglas compartidas con RAM**; el **`.2`** soporta
  **1024 packets per second**, así que en entornos grandes va **DNS caching**.
- **La trampa**: **inbound ≠ outbound** y la zona compartida **no** habilita on-premises.
- **Huecos**: sin **precios**, **cuotas**, **DNSSEC**, **query logging**, **DNS Firewall**, ni **HA de endpoints**.
- **Nota**: [[Amazon Route 53 Resolver]]

### 08 — AWS Outposts

- **Formato**: video largo (**6 min 46 s**) + **cuatro lecturas** (*Family*, *Functionality*, *Options*, *Setup*).
  **Sin demo y sin knowledge check.**
- **La pregunta del deployment manager**: *¿cómo dejar la base de datos **local** por compliance?* **Storage Gateway
  cachea**; **Outposts trae el servicio y el dato** al predio.
- **Dos formas**: **rack de 42U** (hasta **96 racks**, experiencia completa de Region, energía DC redundante y hot
  spares) y **server de 1U (Graviton2) / 2U (Intel)** para **torres, retail y clínicas**.
- **Extiende la VPC**: las instancias del Outpost hablan con la VPC **por IP privada**, *como en el mismo edificio*.
- **Corre un subconjunto**: **EC2**, **EBS**, **S3** y **RDS local** — *el dato nunca deja el predio* y sigue
  siendo **totalmente administrado**.
- **El límite duro**: **depende del service link** a la Region; **no** es para operaciones **desconectadas** ni con
  conectividad limitada. Está **anclado a una AZ**.
- **Seis conceptos**: **site**, **configurations**, **capacity**, **equipment**, **service link** y **local
  gateway** (este último hacia la red local, con **VLAN + LACP**).
- **Dos opciones de control**: **AWS** (mismas APIs; RDS/ECS/EKS/SageMaker/EMR/ELB localmente, S3/DynamoDB/Lambda
  por **PrivateLink**) o **VMware Cloud on Outposts** (**SDDC** completo).
- **El argumento comercial**: **single pane of glass** — aparece en la consola junto a los recursos de la Region.
- **La trampa**: confundir **residencia de datos** con **air-gapped**, o usar **un solo Outpost** como HA entre AZs.
- **Nota**: [[AWS Outposts]]

### 09 — AWS Local Zones

- **Formato**: video (**3 min 39 s**) + **dos lecturas** (*The Need* y *AWS Local Zones*), con la sección *Local
  Zones use cases* **vacía** en la fuente. **Sin demo y sin knowledge check.**
- **La pregunta del deployment manager**: *¿cómo correr aplicaciones de **baja latencia** donde **AWS no tiene
  Region**?*
- **Qué es**: **despliegue de infraestructura de AWS** en **grandes centros urbanos e industriales sin Region**;
  **construido y operado por AWS**.
- **La métrica**: **latencia de un dígito en milisegundos** para los usuarios de **esa área metropolitana**.
- **La analogía**: **satélites de la Region**. Y la diferencia clave: **Outposts vive en tu data center**; la Local
  Zone, en **una ciudad**.
- **El setup**: **habilitar** en la cuenta, **elegir ubicación**, **crear subnet** asociada. **Sin hardware ni red
  compleja**; **security groups, NACLs y route tables** se extienden.
- **Catálogo**: **T3, C5, M5, R5, R5d, I3en, G4**; **EBS gp2/io1**; **FSx for Lustre** y **FSx for Windows File
  Server**; **pods de EKS** y **tareas de ECS**.
- **Red**: **internet local inbound/outbound** **y** soporte de **Direct Connect** (camino privado).
- **Servicios**: **EC2, VPC, EBS, FSx, ELB, EMR, ElastiCache, RDS** y **on-demand capacity reservation** para EC2
  en una Local Zone específica.
- **La trampa**: elegir **Outposts** para latencia de metro, o **Local Zones** para **residencia de datos**.
- **Nota**: [[AWS Local Zones]]

### 10 — AWS Wavelength

- **Formato**: **sin video**. Página con **pestañas** y **tres imágenes**. **Sin demo y sin knowledge check.** Es
  la única lección del módulo sin transcripción ni duración.
- **Qué es**: **oferta de infraestructura de AWS instalada en sitio**, dentro de la **red de un CSP**; la
  **Wavelength Zone** es **extensión lógica de su Region**.
- **Dónde**: **torres de celular** y **puntos de agregación de tráfico** metro o regionales del carrier.
- **Racks**: **diseñados por AWS** con **energía, cableado, ToR switches, servidores y discos**.
- **La pieza clave**: **carrier gateway** — conecta la **red de acceso 5G** con la zona; el móvil llega a la
  instancia **sin pasar por internet**.
- **Las cifras**: **70–180 ms** sin Wavelength vs **< 20 ms** con Wavelength (pies de las imágenes).
- **La configuración**: **opt in** → **VPC** → **carrier gateway** → **subnet en la Wavelength Zone**; después
  **EC2**, **ECS** y **EKS**.
- **Casos de uso**: **autos autónomos** con sensores, **robots industriales** y **promociones en tiempo real** en
  retail.
- **La trampa**: **Wavelength vs Local Zones vs Outposts** — red móvil, metrópoli y predio, respectivamente.
- **Nota**: [[AWS Wavelength]]

### 11 — Finished Architecture

- **Formato**: video (**5 min 27 s**) + **un recap** con los servicios. **Sin demo y sin knowledge check.** Es el
  **capstone**: no agrega conceptos, **integra** las lecciones 03–10 en el caso financiero.
- **Conectividad**: **Direct Connect de 10 Gbps a dos locations** (redundancia geográfica) + **VPN de respaldo** con
  conmutación automática + **Transit Gateway** como hub.
- **Borde**: **Local Zones en centros financieros** para las cargas de trading, con el **core en las Regions**.
- **Acceso**: **Client VPN** integrado con el **identity provider existente** (sin credenciales separadas).
- **DNS**: **Route 53 Resolver con inbound y outbound** + **reglas compartidas por RAM**.
- **Residencia**: **Outposts** para lo que no puede salir por regulación (**EKS on-premises**).
- **Observabilidad y auditoría**: **CloudWatch**, **CloudTrail**, **cifrado** del tráfico, **Organizations + SCPs**
  e **IAM**.
- **Trade-offs**: DX redundante, Local Zones y Outposts **se justifican por el costo de no tenerlos**.
- **Crecimiento**: lo nuevo se **conecta al TGW** y **hereda** el modelo. **Wavelength es futuro**, no parte del
  diseño.
- **La trampa**: decir que la solución **usa** Wavelength, o llamarla **maximum resiliency** cuando es **high**.
- **Nota**: [[Finished Architecture]]

### 12 — BuildingBlocks Videos

- **Formato**: **dos videos** de troubleshooting (**3 min 6 s** y **2 min 33 s**), en diálogo. **Sin demo y sin
  knowledge check.**
- **Caso 1 — DNS híbrido**: cargas de AWS que **no resuelven de forma confiable** los dominios on-prem; **a veces
  salen al DNS público**. Ya había **outbound endpoint** y la zona nombrada.
- **Los descartes**: **alinear subnets** (no es el camino) y **Private DNS en interface endpoints** (solo resuelve
  **servicios de AWS**).
- **La causa**: **faltan las forwarding rules** — le dicen al resolver que **`onprem.company.local`** va al
  endpoint. Son **zone specific**.
- **La remediación**: reglas + **monitoreo** con **métricas de CloudWatch** en los endpoints.
- **Caso 2 — multi-Region**: aplicación core on-prem que debe alcanzarse desde **VPC en dos Regiones**; ya hay
  **DX a `eu-west-1`** y **TGW**.
- **Los descartes**: **peering cross-Region al TGW** (**hairpin**, mata la latencia) y **VPN over DX** (complejidad
  y más puntos de falla).
- **La solución**: **DX inter-region peering** con **Direct Connect gateway** asociado al **TGW**; menos puntos de
  falla, red nativa y **sin circuitos adicionales**.
- **El método**: **usar el camino nativo antes que agregar capas**.
- **Nota**: [[BuildingBlocks Videos - Hybrid]]

### 13 - Activity: Architecture Challenge

- **Formato**: **actividad final** de **tres desafíos × dos preguntas**. **Sin demo, sin video y sin puntaje.**
- **La mecánica**: primero **Select THREE** (*qué podría servir*); después **Choose 1** con **información nueva**
  (*qué resuelve esta restricción*).
- **El caso - AnyCompany**: banco **digital-first**, **2 millones de clientes**, **99,99%** de uptime, **PCI-DSS** y
  **SOX**; hoy con **una VPN por oficina a su VPC** —la **telaraña** que el módulo combate—.
- **Desafío 1 - performance y confiabilidad**: **A · D · E** (**DX**, **S2S múltiple + TGW con ECMP**, **DX + VPN**)
  → **A**, porque la parte 2 pide **eliminar puntos únicos de falla**.
- **Desafío 2 - acceso remoto**: **A · B · E** (**Client VPN**, **TGW**, **S2S + TGW**) → **B**, porque la parte 2
  pide el **servicio de acceso de usuarios individuales**.
- **Desafío 3 - residencia y latencia**: **D · E · F** (**Outposts**, **Local Zones**, **DX a los exchanges**) →
  **D**, porque la parte 2 exige **infraestructura bajo control del cliente**.
- **Las tres partes 2 restringen hacia el mismo lado**: **resiliencia**, **personas** y **control**.
- **El hueco**: el **problema 4 (DNS)** del caso **no tiene pregunta**; el inventario de data centers es
  **inconsistente** en la fuente.
- **Nota**: [[Activity - Architecture Challenge]]

---

## ✅ Checklist: lo que tenés que poder explicar

> [!note] Borrador propio (no está en la fuente)
> Esta lista es un **punto de partida** basado en los **ocho objetivos** de la lección 01, en las lecciones ya
> cargadas (02–03) y en las tareas **1.1 / 2.5** de la guía del examen, no en las lecciones de servicio. Se
> ajusta —se agrega, se recorta, se corrige— a medida que el módulo avance.

- [ ] **Acceso remoto vs. sitio a sitio**: **Client VPN** para **usuarios**; **Site-to-Site VPN** para **redes**.
- [ ] **Client VPN por dentro**: **endpoint**, **target network**, **authorization rules** (default **deny**),
  **routes**, **client CIDR** y **split tunnel**; qué hace la **ENI** con el **source NAT**.
- [ ] **Las reglas de Client VPN**: **`/27`** mínimo y **8 IPs** en la subnet, **una por AZ**, **mismo VPC** y
  **local route** automática.
- [ ] **Site-to-Site VPN resiliente**: qué hace que un diseño de VPN **tolere fallas** y no solo funcione.
- [ ] **Direct Connect**: piezas de una configuración y qué habilita frente a un enlace por internet.
- [ ] **Alta disponibilidad híbrida**: opciones de **resiliencia de DX** y **VPN como respaldo**.
- [ ] **DNS híbrido**: **Route 53 Resolver endpoints** para resolver **entre on-premises y AWS**.
- [ ] **Outposts**: **residencia de datos** on-premises con servicios de AWS, en **racks y servers**.
- [ ] **Local Zones**: **casos de uso** y **requisitos** para baja latencia **donde no hay Region**.
- [ ] **Wavelength**: **5G**, despliegue **en la red del carrier** y **latencia ultra baja**.
- [ ] **Criterio de elección**: **latencia**, **residencia de datos** y **costo** como ejes de decisión
      (*lectura propia*).
- [ ] **Resolver un caso tipo examen**: separar **“Select THREE”** (*qué podría servir*) de **“Choose 1”**
      (*qué cumple la restricción nueva*), como en la **actividad final**.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| 1 | **¿Cloud bursting** es requisito o capacidad? La transcripción lo pone como tercero; la lista fija lo reemplaza por **low-latency performance** | Abierta | [[Gathering the Customer Requirements - Hybrid]] §2 · a confirmar con las lecciones de conectividad |
| 2 | **¿Qué servicios cubren el DR** (orquestación, replicación, failover) y el **gobierno híbrido**? Ninguno figura entre los ocho objetivos | Abierta | [[Gathering the Customer Requirements - Hybrid]] §7 |
| 3 | **¿S3 corre local en Outposts o se accede por endpoint?** El video dice que S3 corre localmente; la lectura *Options* lo ubica como endpoint de PrivateLink | Abierta | [[AWS Outposts]] §5 y registro, punto 3 |
| 4 | **La actividad final no pregunta el problema 4 (DNS)** del caso AnyCompany: el bloque de Route 53 Resolver queda **sin práctica** en la evaluación | Registrada | [[Activity - Architecture Challenge]] §3 y registro, punto 1 |

---

## ⏳ Pendiente del módulo

- [x] Cargar la **lección 01** → [[Course Overview - Optimizing Hybrid Architectures]].
- [x] Cargar la **lección 02** → [[Gathering the Customer Requirements - Hybrid]].
- [x] Cargar la **lección 03** → [[AWS Client VPN]].
- [x] Cargar la **lección 04** → [[AWS Site-to-Site VPN]].
- [x] Cargar la **lección 05** → [[AWS Direct Connect - Connection Options]].
- [x] Cargar la **lección 06** → [[AWS Direct Connect - Redundancy and Resilience]].
- [x] Cargar la **lección 07** → [[Amazon Route 53 Resolver]].
- [x] Cargar la **lección 08** → [[AWS Outposts]].
- [x] Cargar la **lección 09** → [[AWS Local Zones]].
- [x] Cargar la **lección 10** → [[AWS Wavelength]].
- [x] Cargar la **lección 11** → [[Finished Architecture]].
- [x] Cargar la **lección 12** → [[BuildingBlocks Videos - Hybrid]].
- [x] Cargar la **lección 13** → [[Activity - Architecture Challenge]].
- [ ] Hacer el **cierre del módulo**: consolidar el checklist, el mapa de progreso y el **quiz integrador**.
- [x] **Contar las lecciones del módulo**: **13** (01-13). La fuente **nunca lo declara**; se deduce de las
      páginas entregadas.
- [ ] **Confirmar el mapeo** de tareas (1.1 / 1.3 / 2.2 / 2.5) con las lecciones de servicio.
- [ ] Revisar si el learning plan trae **labs** para este módulo.

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — módulo anterior (cerrado):
  la red **dentro** de AWS que este módulo conecta con lo **on-premises**
- [[AWS Solutions Architect Advanced - Securing Networks and Data]] — módulo anterior (cerrado): la seguridad de
  los enlaces y de los datos que viajan por ellos
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — cuentas, OUs y **SCPs**
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — monitoreo y
  auditoría del enlace híbrido
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea del examen que este módulo cubre
- [[1.3 Diseñar arquitecturas fiables y resistentes]] — resiliencia de la conectividad
- [[2.2 Diseñar una solución para garantizar la continuidad de actividades]] — failover entre entornos
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — latencia y throughput
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — costos de transferencia
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
