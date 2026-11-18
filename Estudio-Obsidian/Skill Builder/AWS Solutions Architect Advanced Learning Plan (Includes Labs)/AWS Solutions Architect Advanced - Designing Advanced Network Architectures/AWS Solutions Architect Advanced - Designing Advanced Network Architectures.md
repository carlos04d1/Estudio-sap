---
title: "AWS Solutions Architect Advanced — Designing Advanced Network Architectures"
aliases:
  - "Designing Advanced Network Architectures"
  - "Índice Advanced Networking"
  - "Módulo Networking"
  - "Redes avanzadas"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - indice
  - dominio-1
status: completo
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Designing Advanced Network Architectures

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> El eje del módulo es la **Tarea 1.1 — Diseñar estrategias de conectividad de redes** del SAP-C02 (Dominio 1,
> 26 %): conectividad **híbrida**, **multi-cuenta** y **multi-región**, enrutamiento, segmentación y exposición
> controlada de servicios. Como efecto secundario toca **1.3 / 2.4** (fiabilidad y continuidad de la red),
> **2.5** (rendimiento) y **1.5 / 2.6** (costo de transferencia de datos).
>
> **Estado (27/10/2026):** **12 lecciones cargadas** (01–12) y **módulo cerrado**. La actividad final cierra el
> curso: *“You have completed all the Architecture Challenges for this course”*.
>
> **Recorrido:** requisitos → peering → Transit Gateway → casos de uso → IPAM/IPv6 → monitoreo → compartición
> cross-account → endpoints → PrivateLink → arquitectura final → tres casos → evaluación.

> [!info] Mapeo del examen
> El módulo se apoya en **1.1** (conectividad de redes) y la cruza con **1.4** (entorno multi-cuenta),
> **1.3 / 2.4** (fiabilidad), **2.5** (rendimiento) y **1.5 / 2.6** (costos de red). Las tareas exactas por
> lección se anotan cuando la lección llega; **acá no se adivinan**.

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como ✅ solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 📌 Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | Gathering the Customer Requirements | Caso gaming: los cinco requisitos de red | 🔵 | [[Gathering the Customer Requirements - Networking]] |
| 02 | VPC Connectivity | Malla de peering, transit VPC y Transit Gateway | 🔵 | [[VPC Connectivity]] |
| 03 | AWS Transit Gateway Setup | ENI por AZ, route tables, asociación y aislamiento | 🔵 | [[AWS Transit Gateway Setup]] |
| 04 | Use Cases | Shared services, blackhole, NAT compartido y peering | 🔵 | [[Use Cases - Transit Gateway]] |
| 05 | IP Address Management and IPv6 Adoption | IPAM, pools compartidos y modos IPv6 | 🔵 | [[IP Address Management and IPv6 Adoption]] |
| 06 | AWS Transit Gateway Network Manager | Global network, monitoreo y Reachability Analyzer | 🔵 | [[AWS Transit Gateway Network Manager]] |
| 07 | AWS Resource Access Manager (RAM) Solutions | Compartición cross-account, TGW compartido y AZ ID | 🔵 | [[AWS Resource Access Manager (RAM) Solutions]] |
| 08 | VPC Endpoints | Interface vs. gateway, PrivateLink y endpoint services | 🔵 | [[VPC Endpoints]] |
| 09 | AWS PrivateLink Components | Unidireccionalidad, endpoint policies y límites del NLB | 🔵 | [[AWS PrivateLink Components]] |
| 10 | Finished Architecture | TGW hub, segmentación, shared services y DNS | 🔵 | [[Finished Architecture - Networking]] |
| 11 | BuildingBlocks Videos | Tres casos: RAM, routing global y costo de NAT | 🔵 | [[BuildingBlocks Videos - Networking]] |
| 12 | Activity: Architecture Challenge | Evaluación: Network Manager, DX Gateway y RAM | 🔵 | [[Activity - Architecture Challenge - Networking]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 📐 Reglas del módulo

Las mismas de los módulos anteriores, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, rangos CIDR, latencias, nombres exactos de servicios.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

---

## 🗂️ Qué cubre cada sesión

### 01 — Gathering the Customer Requirements

- **Formato**: video (**3 min 39 s**) + actividad de **flashcards** (las propuestas no vienen en el texto).
- **Caso**: plataforma de **gaming** que suma títulos y regiones sobre una red que ya no aguanta.
- **Dolores**: **peering punto a punto**, servicios compartidos **duplicados por región**, **failover
  inconsistente**.
- **Cinco requisitos**: red **escalable** · servicios **centralizados** · **diseñado para failover** ·
  **segmentación** por seguridad · **performance**.
- **Anticipo**: **Transit Gateway**, **Resource Access Manager** y **PrivateLink**.
- **Nota**: [[Gathering the Customer Requirements - Networking]]

### 02 — VPC Connectivity

- **Formato**: video (**5 min 30 s**) + cuatro lecturas cortas.
- **La cuenta que ordena todo**: **6 VPC en malla = 15 peerings**; **6 VPN + 6 VIF = 12 enlaces** a on-premises.
- **Transit VPC**: hub con **EC2 routers**; resuelve on-premises, **no** el lado cloud. Techo de **hardware** y
  **licencias**.
- **Transit Gateway**: **administrado**, **elástico**, **regional**; **attachments** y **route tables**.
- **Default peligroso**: una sola route table = **todos se hablan**; se segmenta con varias tablas o
  **blackhole entries**.
- **Nota**: [[VPC Connectivity]]

### 03 — AWS Transit Gateway Setup

- **Formato**: lectura de **Direct Connect** + video (**3 min 01 s**) + lectura de setup.
- **Direct Connect**: **DX → DX gateway → Transit VIF → TGW**; nunca DX directo al TGW.
- **Adjuntar una VPC**: **una subred por AZ**; el TGW pone **una ENI con una IP**; **/28** como buena práctica.
- **AZ sin ENI = sin conectividad**, aunque la ruta esté bien.
- **Route tables del TGW**: cada attachment se asocia a **una sola**; la tabla decide el **next hop**.
- **Aislar**: route table propia, **blackhole** o **prefix list**; parecido a **VRF**.
- **Nota**: [[AWS Transit Gateway Setup]]

### 04 — Use Cases

- **Formato**: lectura de casos + video (**3 min 05 s**) + demo (**8 min 57 s**) + best practices y data points.
- **Cinco casos**: ruteo centralizado · aislar VPC · **shared services** · **NAT compartido** · **peering**.
- **La pieza clave**: **blackhole a `10.0.0.0/8`** para aislar A y B **sin** una route table por VPC.
- **Demo**: crear TGW, adjuntar 3 VPC, tabla **AB** con ruta a C + blackhole, **reasociar** A y B.
- **Datos**: **5** TGW/Región/cuenta · **20** route tables · **5.000** attachments; costo por attachment y por GB.
- **Nota**: [[Use Cases - Transit Gateway]]

### 05 — IP Address Management and IPv6 Adoption

- **Formato**: lectura con pestañas interactivas (3 componentes de IPAM, 3 modos de subred, 2 gateways) + key
  takeaways. **No hay video.**
- **IPAM**: **scopes** (private/public), **pools** jerárquicos con **reglas de netmask** y **allocations**
  automáticas; detecta **unmanaged**.
- **Multi-cuenta**: IPAM en la **cuenta de red** + pools compartidos por **RAM** (cuenta u **OU**).
- **IPv6**: **/56 por VPC** con **256 /64**; **dual-stack** para empezar, **IPv6-only** para lo nuevo.
- **Conectividad**: **egress-only IGW** (solo salida, sin cargo por hora) y **NAT64 + DNS64** para hablar con IPv4.
- **Nota**: [[IP Address Management and IPv6 Adoption]]

### 06 — AWS Transit Gateway Network Manager

- **Formato**: lectura (Network Manager) + lectura (Reachability Analyzer) + demo (**7 min 24 s**). **No hay
  Knowledge Check.**
- **Network Manager**: un **global network** representa la red; se **registran** TGW de **varias Regiones** y se
  definen recursos **on-premises**.
- **Qué arrastra el registro**: VPC, **Site-to-Site VPN**, **Direct Connect gateways** y **peering connections**.
- **Límite clave**: **no crea, modifica ni borra** TGW ni attachments; **sin cargo adicional** por la herramienta.
- **Peering**: ves el **peer TGW** pero **no sus attachments**, salvo que sea tuyo y lo registres.
- **Reachability Analyzer**: dice si el flujo es posible **sin enviar paquetes** y marca el **bloqueador**
  (SG, NACL, route table, LB). Test **solo de ida**.
- **Demo**: A→C funciona, B→C falla; el problema **no era el TGW** sino la **route table de B sin ruta al TGW**.
- **Nota**: [[AWS Transit Gateway Network Manager]]

### 07 — AWS Resource Access Manager (RAM) Solutions

- **Formato**: lectura (servicios que soportan RAM) + video (**1 min 54 s**) + dos lecturas cortas (TGW con/sin
  RAM, AZ name vs. AZ ID). **No hay Knowledge Check.**
- **Qué hace RAM**: comparte **acceso** a un recurso entre cuentas; **no administra** nada y **no** transfiere
  la propiedad.
- **Habilitación**: el sharing dentro de la organización se habilita **desde la management account**; IAM **no
  trae** permisos de RAM por defecto.
- **TGW compartido**: la cuenta A **adjunta su VPC** al TGW de B; **VPN Site-to-Site** debe estar **en la cuenta
  dueña del TGW**; **DX gateway** puede estar **en otra cuenta**.
- **También se comparte**: **subredes de VPC** (otra cuenta lanza EC2 ahí), Route 53, License Manager, Outposts,
  entre otros.
- **AZ name vs. AZ ID**: `us-east-1a` **no** es la misma ubicación física entre cuentas; se coordina con
  **`use1-az1`**, **`use1-az2`**.
- **Nota**: [[AWS Resource Access Manager (RAM) Solutions]]

### 08 — VPC Endpoints

- **Formato**: video (**2 min 49 s**) + lectura con pestañas (interface / gateway) + lectura de componentes.
  **No hay Knowledge Check.**
- **Qué resuelve**: consumir **un servicio** —propio o de AWS— desde otra VPC **sin peering**, con el tráfico
  **sin salir de la red de Amazon**.
- **Sin IP pública**: las instancias no necesitan IP pública; no hay IGW, NAT, VPN ni Direct Connect de por medio.
- **Interface endpoint**: **ENI** con IP privada de la subred en la **VPC del consumidor**, impulsada por
  **PrivateLink**.
- **Gateway endpoint**: **target de route table**, **sin ENI**, **solo S3 y DynamoDB**, **no sirve desde
  on-premises** y **no es facturable**.
- **PrivateLink**: el **provider** publica un **endpoint service**; el **consumer** se conecta con un **interface
  endpoint**.
- **Nota**: [[VPC Endpoints]]

### 09 — AWS PrivateLink Components

- **Formato**: video (**2 min 06 s**) + tres lecturas (componentes, features, endpoint policies) + notas de
  PrivateLink. **No hay Knowledge Check.**
- **Arquitectura**: **service provider** (servicio detrás de un **NLB** registrado) y **service consumer**
  (interface endpoint, acceso por la **ENI**).
- **Unidireccional**: la conexión **solo nace en el consumidor**; el proveedor **no puede iniciar** conexiones de
  vuelta.
- **Endpoint policy**: **IAM resource policy en JSON**; si no se adjunta, **acceso total** por default y **no
  reemplaza** políticas de IAM ni **bucket policies**.
- **Sin fricción**: no hace falta **IGW, peering, firewall rules, route tables ni administrar CIDR**; sirve
  también **desde on-premises**.
- **Límite**: **55.000 conexiones simultáneas** (o **~55.000 por minuto por target**); ante **port allocation
  errors**, **agregar targets**.
- **Nota**: [[AWS PrivateLink Components]]

### 10 — Finished Architecture

- **Formato**: video (**4 min 52 s**) + **architecture recap** en seis bullets. **No hay Knowledge Check.**
- **Cierre del módulo**: no trae servicios nuevos, **arma la arquitectura final** del caso gaming.
- **Hub**: **un TGW por región activa** + **TGW peering** entre regiones; cada VPC con **una sola conexión**.
- **Segmentación**: **RT app** (apps → shared) y **RT shared** (shared → apps), **sin app-to-app**.
- **Shared services**: **una VPC por región** (auth, logging, CI/CD), compartida por **RAM** y expuesta por
  **PrivateLink**; **Resolver endpoints** también compartidos por RAM.
- **Lo que no se toca**: **Aurora Global Database** con **readers locales** y failover al writer; **no pasa por
  el TGW**.
- **Trade-off**: costo y límites de **attachments y route tables** vs. ahorro de eliminar el peering punto a
  punto.
- **Nota**: [[Finished Architecture - Networking]]

### 11 — BuildingBlocks Videos

- **Formato**: **tres videos de diálogo** (**2:38**, **2:38** y **2:17**), sin lecturas ni Knowledge Check.
- **Caso 1 — recovery plans**: Equipos ejecutan desde sus cuentas + control central de seguridad → **AWS RAM**
  (con **trusted access** con Organizations), no IAM roles por cuenta ni Identity Center.
- **Caso 2 — active-active**: **multivalue routing + health checks** para failover automático manteniendo DNS;
  Global Accelerator y latency/weighted quedan descartados.
- **Caso 3 — costo de NAT**: **S3 gateway endpoint** en la VPC central **+ ruteo**; el gateway es gratis y saca
  los parches del NAT. Interface endpoints no cubren OS updates y cobran por hora.
- **Método**: cada caso descarta la opción técnicamente válida por **overhead**, **intervención manual** o
  **costo**.
- **Nota**: [[BuildingBlocks Videos - Networking]]

### 12 — Activity: Architecture Challenge

- **Formato**: **actividad evaluadora**, tres desafíos de **dos partes** (elegir **3** opciones y después **la
  óptima**). **No hay video ni lecturas.**
- **Caso**: **AnyCompany**, fintech con **500+ empleados**, **tres oficinas**, una sola cuenta y peering “según
  necesidad”.
- **Desafío 1**: **Network Manager + Organizations** (gestionar y monitorear TGW desde una consola); Control
  Tower y OUs son válidas pero no son la consola.
- **Desafío 2**: **Direct Connect Gateway** para **varias Regiones desde una ubicación**; private VIF y transit
  VIF son las piezas de conexión.
- **Desafío 3**: **RAM** para compartir **subredes de VPC y attachments de TGW**; SCPs y data perimeter
  **restringen**, no comparten.
- **Nota**: [[Activity - Architecture Challenge - Networking]]

---

## ✅ Checklist: lo que tenés que poder explicar

> [!note] Borrador propio (no está en la fuente)
> Esta lista es un **punto de partida** basado en la Tarea **1.1** de la guía del examen, no en las lecciones.
> Se ajusta —se agrega, se recorta, se corrige— a medida que el módulo avance.

- [ ] **VPC**: CIDR primario y secundario, subredes públicas/privadas, route tables y por qué una subred no “es”
      pública por el nombre.
- [ ] **Internet Gateway vs. NAT Gateway vs. NAT instance**: qué resuelve cada uno y qué cobra cada uno.
- [ ] **Security group vs. NACL**: estado, orden de evaluación y qué se puede referenciar en cada uno.
- [ ] **VPC peering**: no transitivo, CIDR no solapado, y por qué no escala a malla completa.
- [ ] **AWS Transit Gateway**: hub-and-spoke, attachments, route tables por attachment y **peering de TGW**.
- [ ] **AWS PrivateLink**: endpoints de interfaz, por qué evita el solapamiento de CIDR y qué no atraviesa.
- [ ] **Site-to-Site VPN vs. AWS Direct Connect**: latencia, ancho de banda, cifrado y **DX Gateway**.
- [ ] **Route 53**: hosted zones públicas/privadas, alias, routing policies y **Resolver** para híbrido.
- [ ] **DNS híbrido**: forward rules, inbound/outbound endpoints y el problema de resolver dominios cruzados.
- [ ] **Multi-región**: VPC sharing, TGW inter-región, latencia y costo de transferencia.
- [ ] **Costo de red**: transferencia por AZ, por Región y de salida a internet; dónde se esconde el gasto.
- [ ] **Observabilidad de red**: Flow Logs, Reachability Analyzer y Network Manager.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| 1 | ¿Cuántas **regiones** y cuántos **títulos** entran en el horizonte del rediseño? | Abierta | — |
| 2 | ¿Qué servicios compartidos **deben** quedar regionales por latencia o compliance? | Abierta | — |
| 3 | “Permitido explícitamente”: ¿qué mecanismo lo va a expresar? | Abierta | — |

---

## ⏳ Pendiente del módulo

- [x] Cargar las **lecciones 01–12** → mapa de progreso hasta [[Activity - Architecture Challenge - Networking]].
- [x] Confirmar el cierre: la actividad final declara completados los challenges del curso.
- [ ] **Labs** del learning plan (el plan dice *Includes Labs*; no se cargaron).
- [ ] **Repaso con preguntas** para pasar las 12 lecciones de 🔵 a ✅.
- [ ] Resolver las **dudas abiertas** de la tabla de arriba (regiones, servicios regionales, mecanismo de
      “permitido explícitamente”).

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — módulo anterior (cerrado)
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — módulo de multi-cuenta (cerrado)
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea del examen que este módulo cubre
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] · [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]]
- [[1.3 Diseñar arquitecturas fiables y resistentes]] · [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] · [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[Architecting for Cost - Networking]] — costo de transferencia por AZ, Región y VPC
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
