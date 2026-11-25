---
title: "COMPACT — Estado del estudio"
aliases:
  - "Compact"
  - "Estado de estudio"
  - "Handoff"
tags:
  - certificacion/aws
  - sap-c02
  - compact
  - handoff
  - skill-builder
status: referencia
fecha: 2026-10-27
fuente: "Sesión de estudio del 27/10/2026 — módulos Designing a Multi-Account Architecture, Implementing Observability and Management Controls, Designing Advanced Network Architectures y Securing Networks and Data (los cuatro cerrados), más Optimizing Hybrid Architectures (en curso)"
---

# COMPACT — Estado del estudio

> [!abstract] Para qué sirve este archivo
> **Punto de retomada.** Si se pierde el contexto del chat, o si se arranca una sesión nueva (o otro curso),
> leyendo esto alcanza para saber **qué se estudió, cómo se estudia, dónde está cada cosa y qué queda pendiente**.
>
> No reemplaza las notas: las **ubica**.

---

## 1. Objetivo

Certificación **AWS Certified Solutions Architect – Professional (SAP-C02)**.
Guía oficial en [[Guia AWS]] (pesos: D1 26 % · D2 29 % · D3 25 % · D4 20 %).

---

## 2. Qué se completó (26–27/10/2026)

Se terminó el módulo **AWS Solutions Architect Advanced — Designing a Multi-Account Architecture**
(Skill Builder, 10 lecciones). Se cerró con **la actividad final respondida 6/6**.

| # | Lección | Estado | Nota |
| --- | --- | --- | --- |
| 01 | Gathering the Customer Requirements | 🔵 | [[Gathering the customer REquirements]] |
| 02 | Multi-Account Access Solutions | 🔵 | [[Multi-Account Access Solutions]] |
| 03 | AWS Organizations and IAM Identity Center | 🔵 | [[AWS Organizations and IAM Identity Center]] |
| 04 | AWS Control Tower | 🔵 | [[AWS Control Tower]] |
| 05 | CI/CD Deployment Models | 🔵 | [[CI-CD Deployment Models]] |
| 06 | CloudFormation StackSets | 🔵 | [[CloudFormation StackSets]] |
| 07 | CI/CD Pipeline Security | 🔵 | [[CI-CD Pipeline Security]] |
| 08 | Finished Architecture | 🔵 | [[Finished Architecture]] |
| 09 | BuildingBlocks Videos | 🔵 | [[BuildingBlocks Videos]] |
| 10 | Activity: Architecture Challenge | ✅ **6/6** | [[Activity - Architecture Challenge]] |

**Índice del módulo:** [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]]
(10 sesiones, mapa de progreso, checklist, dudas y pendientes).

### 2.1 Módulo Designing Advanced Network Architectures (cerrado 27/10/2026)

**12 sesiones / 13 archivos / ~5.203 líneas / 0 links rotos.** Arco completo, de los requisitos a la arquitectura
final:

| # | Lección | Estado | Nota |
| --- | --- | --- | --- |
| 01 | Gathering the Customer Requirements | 🔵 | [[Gathering the Customer Requirements - Networking]] |
| 02 | VPC Connectivity | 🔵 | [[VPC Connectivity]] |
| 03 | AWS Transit Gateway Setup | 🔵 | [[AWS Transit Gateway Setup]] |
| 04 | Use Cases - Transit Gateway | 🔵 | [[Use Cases - Transit Gateway]] |
| 05 | IP Address Management and IPv6 Adoption | 🔵 | [[IP Address Management and IPv6 Adoption]] |
| 06 | AWS Transit Gateway Network Manager | 🔵 | [[AWS Transit Gateway Network Manager]] |
| 07 | AWS Resource Access Manager (RAM) Solutions | 🔵 | [[AWS Resource Access Manager (RAM) Solutions]] |
| 08 | VPC Endpoints | 🔵 | [[VPC Endpoints]] |
| 09 | AWS PrivateLink Components | 🔵 | [[AWS PrivateLink Components]] |
| 10 | Finished Architecture | 🔵 | [[Finished Architecture - Networking]] |
| 11 | BuildingBlocks Videos | 🔵 | [[BuildingBlocks Videos - Networking]] |
| 12 | Activity: Architecture Challenge | 🔵 | [[Activity - Architecture Challenge - Networking]] |

**Índice del módulo:** [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]]
(estado `completo`, mapa de progreso, checklist, dudas y pendientes).

> [!note] Sufijos `- Networking` en tres títulos
> `Finished Architecture`, `BuildingBlocks Videos` y `Activity - Architecture Challenge` **existen también en el
> módulo de Multi-Account**. Los tres del módulo de redes llevan sufijo **`- Networking`** para que los
> wikilinks no sean ambiguos.

### 2.2 Módulo Implementing Observability and Management Controls (cerrado 26/10/2026)

**20 sesiones / 21 archivos / ~9.009 líneas / 0 links rotos.** Tres bloques:

| Bloque | Sesiones | Contenido |
| --- | --- | --- |
| **Apertura** | 01 | [[Course Overview]] |
| **Governance y controles** | 02–08 | Governance at Scale · Establishing Guardrails · Management Controls · Service Catalog · Detective Controls · Cloud Governance Pillars · Knowledge Check (**3/3**) |
| **Costos** | 09–16 | Cloud Cost Management · Cost Management Tools · Cost Optimization · Knowledge Check 2 (**2/2**) · Architecting for Cost de Compute, Networking, Storage y Databases |
| **Observabilidad** | 17–20 | Designing Observability Solutions · Distributed Tracing · Synthetic Monitoring and SLOs · Multi-Account Observability |

**Índice del módulo:** [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]]

**Quedó abierto (no bloquea el cierre):** las secciones *Systems Manager governance* y *Security Hub governance*
nunca llegaron como texto (solo como flashcards en [[Detective Controls]]).

### 2.3 Módulo Securing Networks and Data (cerrado 27/10/2026)

**18 sesiones / 19 archivos / ~11.660 líneas / 0 links rotos.** De los requisitos a la evaluación integradora:

| Bloque | Sesiones | Contenido |
| --- | --- | --- |
| **Apertura y red** | 01–05 | Course Overview · Gathering the Customer Requirements · AWS Firewall Manager · Network Segmentation · Network Traffic Controls |
| **Detección** | 06–10 | Security Hub · Demo de Security Hub · Tech Talk de Security Hub · Amazon GuardDuty · Demo de GuardDuty |
| **Criptografía y secretos** | 11–15 | Cryptography · AWS KMS · Demo de KMS · AWS CloudHSM · AWS Secrets Manager |
| **Cierre** | 16–18 | Finished Architecture · BuildingBlocks Videos · Activity: Architecture Challenge |

**Índice del módulo:** [[AWS Solutions Architect Advanced - Securing Networks and Data]]
(estado `completo`, mapa de progreso, checklist, dudas y pendientes).

> [!note] Sufijos `- Security` en cuatro títulos
> `Gathering the Customer Requirements`, `Finished Architecture`, `BuildingBlocks Videos` y `Activity -
> Architecture Challenge` **existen también en los otros módulos**. Los cuatro del módulo de seguridad llevan
> sufijo **`- Security`**, y `Course Overview` lleva **`- Securing Networks and Data`**, para que los wikilinks no
> sean ambiguos.

---

## 3. Qué se hizo exactamente en esta sesión

| Acción | Detalle |
| --- | --- |
| **Completar Control Tower** | Se integró la continuación de la clase: **20 preventive + 6 detective controls**, **4 blueprints**, **3 vías de member accounts**, **audit account read/write + rol solo para Lambda**, **monitoreo vía CloudWatch/Activities**, nombres exactos **AWSAdministratorAccess** y **AWSControlTowerExecution**, y se completaron los **componentes 2–5** y la **lectura de landing zone** |
| **Crear 5 notas nuevas** | Deployment Models · StackSets · Pipeline Security · Finished Architecture · BuildingBlocks Videos |
| **Crear el índice del módulo** | Cerró **4 links rotos** que existían desde el 23/10 |
| **Resolver la actividad final** | 6/6, con análisis opción por opción y taxonomía de anti-patrones |
| **Revisión mecánica** | 0 links rotos · 10/10 títulos coherentes · **1 inconsistencia corregida** (home Region) |
| **Compact + nuevo curso** | Se creó este archivo y la carpeta + índice del módulo **Implementing Observability and Management Controls** |
| **Cierre del módulo de observabilidad** | 20 sesiones completas (governance, costos y observabilidad), **0 links rotos**, estado `completo` en el índice |
| **Nuevo curso** | Carpeta + índice de **Designing Advanced Network Architectures**, con mapa de progreso vacío y checklist borrador sobre la tarea **1.1** |
| **Cierre del módulo de seguridad** | 18 sesiones completas (red, detección, criptografía, secretos, cierre y actividad final), **0 links rotos**, estado `completo` en el índice |
| **Nuevo curso híbrido** | Carpeta + índice de **Optimizing Hybrid Architectures**, con **3 lecciones** (Overview, requisitos del caso financiero y **AWS Client VPN** con su demo) y checklist alineado a los **ocho objetivos** |
| **Lección 13 + módulo nuevo** | Se cerró **Activity - Architecture Challenge** (**13/13** del módulo híbrido) y se creó la carpeta + índice de **Operational Resilience**, con mapa de progreso vacío, estado `en-curso` y el mapeo del examen marcado como **hipótesis** |

---

## 4. Método de trabajo (respetarlo en el curso nuevo)

### Formato de cada nota

```
frontmatter YAML  (title, aliases, tags, status, fuente)
> [!abstract] Qué es este archivo
Resumen en una frase
1..N  secciones conceptuales (tablas comparativas, diagramas mermaid cuando suma)
Traducción del contenido (transcripción / lecturas) — sección de referencia
Para el examen (SAP-C02): puntos numerados + trampas típicas
Relacionado (links a tareas del dominio y notas vecinas)
```

### Reglas

1. **Nada se borra.** Si algo se corrige o amplía, se reescribe la línea y se anota en el **registro**.
2. **Todo dato literal.** Cifras, límites, nombres exactos de servicios, puertos y tiempos **no se redondean**.
3. **Cada afirmación tiene origen.** Lo que no dijo la fuente va a un `[!note] Ampliación (no está en la fuente)`.
4. **Se consolida, no se duplica.** Antes de agregar, buscar si el concepto ya existe y fusionarlo.
5. **Nombres de servicios en inglés**, explicación en español.
6. **Una lección = un md.** No mezclar lecciones en el mismo archivo.
7. **El índice se actualiza en el mismo movimiento** que la nota (mapa de progreso + checklist + links).
8. **Distinguir fuente de interpretación:** las trampas de examen y mapas de decisión son valor agregado, y se
   marcan como tales.

### Estados

⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 5. Decisiones y criterios que quedaron fijados

| Tema | Criterio |
| --- | --- |
| **Workforce vs clientes** | **IAM Identity Center** = empleados · **Cognito** = clientes de la app |
| **SAML vs SCIM** | SAML **autentica** · SCIM **provisiona/desprovisiona** (ciclo de vida) |
| **Gobernanza** | Prevenir = **SCP** · Detectar = **Config/Security Hub** · Provisionar con baseline = **Control Tower + Account Factory** |
| **"Compliance inmediata"** | **Account Factory** (la cuenta nace compliant), no Config (detecta después) |
| **CIDR solapado** | Peering y TGW **no** enrutan · NAT+TGW caro/complejo · **PrivateLink** gana |
| **Herramienta nativa vs custom** | Gana la administrada (CodePipeline sobre Jenkins, Security Hub sobre Lambda propia) **salvo** requisito multi-cloud/agnóstico |
| **Rollback** | Inmutable/blue-green = **cambiar tráfico** (rápido) · Rolling = **otro rolling** (lento) |
| **Pipelines** | Viven en **shared services / tools account**, despliegan **cross-account con roles** |
| **Compartir vs. administrar** | **RAM comparte acceso**, no propiedad: la cuenta dueña conserva el control |
| **Compartir vs. monitorear** | **RAM** comparte el TGW · **Network Manager** lo monitorea · ninguno lo modifica |
| **TGW cross-account** | **VPN Site-to-Site** siempre en la **cuenta dueña del TGW**; **DX gateway** puede estar en otra |
| **Endpoint de S3** | **Gateway endpoint**: gratis y por **route table** · **interface**: PrivateLink y con costo por hora |
| **PrivateLink** | **Unidireccional** (consumer → provider) y **no reemplaza** IAM ni bucket policies |
| **DNS entre VPC** | **Resolver endpoints**; el **latency-based routing** es para usuarios |
| **Failover en DNS** | **Multivalue + health checks** = automático · **weighted/latency** = manual |
| **AZ entre cuentas** | Se coordina por **AZ ID** (`use1-az2`), nunca por la letra (`us-east-1a`) |

---

## 6. Pendiente (no bloquea empezar otro curso)

- [ ] **Quiz integrador** de las 10 lecciones de Multi-Account y de las **12 de Networking** → convierte 🔵 en ✅.
- [ ] **Sincronizar las notas de tarea del dominio** (1.1, 1.2, 1.4, 1.5, 2.1) con el detalle del módulo.
- [ ] **Revisión de exactitud técnica** nota por nota contra la fuente.
- [ ] **Labs** del learning plan (el plan dice *Includes Labs*; no se cargaron).
- [ ] `Notas - Evaluacion 1 SB.md` sigue **vacío (0 bytes)** desde el 20/10.
- [ ] `preguntas/preguntas-v1-manual.md`: **registro de intentos vacío** (banco de 50 preguntas sin usar).
- [x] **Curso cerrado**: **Securing Networks and Data** completo, **01–18 cargadas**.
- [ ] **Curso en curso**: **Optimizing Hybrid Architectures** - **01-13 cargadas** (Overview, requisitos, Client VPN, Site-to-Site VPN, Direct Connect, su resiliencia, Route 53 Resolver, Outposts, Local Zones, Wavelength, la arquitectura final, los dos troubleshooting y la actividad final con seis preguntas); falta solo el **cierre** (checklist, mapa final y quiz).
- [ ] **Dudas abiertas de Networking**: regiones del horizonte, servicios que deben quedar regionales y mecanismo
      de “permitido explícitamente”.
- [ ] Conseguir el **texto** de **Systems Manager governance** y **Security Hub governance** (en [[Detective Controls]]
      solo llegaron como flashcards, sin contenido).

---

## 7. Cómo retomar en una sesión nueva

Pegar o referenciar este archivo y decir, por ejemplo:

> *"Estoy siguiendo el COMPACT. Quiero seguir con el curso nuevo: [nombre]. Creá la carpeta y arrancamos con la lección [X]."*

El agente debería:
1. Leer este compact + el índice del curso anterior (si hace falta contexto de método).
2. Crear la carpeta del curso nuevo y su **índice** con mapa de progreso vacío.
3. Aplicar el formato y las reglas de la sección 4.
4. Actualizar el índice en cada lección.

---

## 8. Inventario de módulos cerrados

### 8.1 Designing a Multi-Account Architecture

Carpeta:
`Skill Builder/AWS Solutions Architect Advanced Learning Plan (Includes Labs)/AWS Solutions Architect Advanced - Designing a Multi-Account Architecture/`

| Archivo | Líneas |
| --- | --- |
| AWS Control Tower.md | 644 |
| AWS Organizations and IAM Identity Center.md | 544 |
| CloudFormation StackSets.md | 417 |
| CI-CD Pipeline Security.md | 413 |
| CI-CD Deployment Models.md | 389 |
| BuildingBlocks Videos.md | 355 |
| Finished Architecture.md | 354 |
| Multi-Account Access Solutions.md | 330 |
| Activity - Architecture Challenge.md | 243 |
| AWS Solutions Architect Advanced - Designing a Multi-Account Architecture.md (índice) | 205 |
| Gathering the customer REquirements.md | 163 |
| **Total** | **~4.057** |

---

### 8.2 Implementing Observability and Management Controls

Carpeta:
`Skill Builder/AWS Solutions Architect Advanced Learning Plan (Includes Labs)/AWS Solutions Architect Advanced - Implementing Observability and Management Controls/`

| Archivo | Líneas |
| --- | --- |
| Cost Optimization.md | 707 |
| Cost Management Tools.md | 671 |
| Architecting for Cost - Compute.md | 628 |
| Management Controls.md | 551 |
| AWS Solutions Architect Advanced - Implementing Observability and Management Controls.md (índice) | 539 |
| Architecting for Cost - Storage.md | 533 |
| Architecting for Cost - Databases.md | 461 |
| Cloud Cost Management.md | 456 |
| Architecting for Cost - Networking.md | 439 |
| Detective Controls.md | 433 |
| Governance at Scale.md | 433 |
| Designing Observability Solutions.md | 415 |
| Multi-Account Observability.md | 407 |
| Synthetic Monitoring and Service-Level Objectives.md | 406 |
| Establishing Guardrails.md | 377 |
| Distributed Tracing for Microservices.md | 354 |
| Knowledge Check 2.md | 278 |
| Cloud Governance Pillars.md | 273 |
| Demonstration - AWS Service Catalog.md | 245 |
| Knowledge Check.md | 245 |
| Course Overview.md | 158 |
| **Total** | **~9.009** |

**Verificación mecánica (26/10/2026):** **0 links rotos** dentro del módulo (comprobado leyendo los `.md` en
**UTF-8** y resolviendo los `[[wikilinks]]` contra todo el vault). Los **34 links rotos** que quedan en el vault son
**previos y ajenos** a este módulo: `Domain 2 Review` / `Domain 3 Review` (apuntan al nombre sin el sufijo
`(SAP-C02 - Español LATAM)`), `Guia AWS.md` (→ *Marco de AWS Well-Architected*, *README*), `Definicion servicios.md`
(→ *README*, *Definicion conectores*) y la nota 4.3 (→ *Definicion conectores*).

**Mapa conceptual del módulo (para repasar sin abrir las 20 notas):**

- **Governance**: guardrails preventive (SCP) vs. detective (Config) · guidance mandatory/recommended/elective ·
  Service Catalog como self-service gobernado · Config / GuardDuty / Security Hub como detección.
- **Costos**: 4 áreas a adaptar · 4 etapas + 7 pasos · Cost Explorer / CUR / Budgets + actions · 5 pilares de
  optimización · rightsizing, elasticidad, pricing y storage · data transfer por AZ/Región.
- **Observabilidad**: 3 pilares · EMF · Logs Insights · anomalías · composite alarms · X-Ray vs. ADOT · sampling ·
  canaries vs. RUM · SLO + error budget + burn rate · OAM + Container Insights.

---

### 8.3 Designing Advanced Network Architectures

Carpeta:
`Skill Builder/AWS Solutions Architect Advanced Learning Plan (Includes Labs)/AWS Solutions Architect Advanced - Designing Advanced Network Architectures/`

| Archivo | Líneas |
| --- | --- |
| Use Cases - Transit Gateway.md | 581 |
| Activity - Architecture Challenge - Networking.md | 508 |
| IP Address Management and IPv6 Adoption.md | 463 |
| VPC Connectivity.md | 405 |
| AWS PrivateLink Components.md | 402 |
| AWS Transit Gateway Network Manager.md | 394 |
| Finished Architecture - Networking.md | 393 |
| BuildingBlocks Videos - Networking.md | 389 |
| AWS Transit Gateway Setup.md | 386 |
| AWS Resource Access Manager (RAM) Solutions.md | 369 |
| VPC Endpoints.md | 324 |
| Gathering the Customer Requirements - Networking.md | 295 |
| AWS Solutions Architect Advanced - Designing Advanced Network Architectures.md (índice) | 294 |
| **Total** | **~5.203** |

**Verificación mecánica (27/10/2026):** **0 links rotos** en los 13 archivos del módulo y **0 fences impares**.
Los tres títulos genéricos llevan sufijo **`- Networking`** para no colisionar con el módulo de Multi-Account.

**Mapa conceptual del módulo (para repasar sin abrir las 12 notas):**

- **Requisitos**: caso gaming, cinco requisitos, anticipo de TGW/RAM/PrivateLink.
- **Topología**: malla de peering vs. transit VPC vs. **TGW**; ENI por AZ, route tables y aislamiento.
- **Casos**: shared services, **blackhole**, NAT compartido, peering de TGW.
- **Direcciones**: **IPAM** (scopes/pools/allocations) y **IPv6** (dual-stack, IPv6-only, NAT64/DNS64).
- **Operación**: **Network Manager** (observa) y **Reachability Analyzer** (diagnostica sin paquetes).
- **Compartir**: **RAM** (acceso, no propiedad) y **AZ ID** entre cuentas.
- **Exponer**: **endpoints** (interface vs. gateway) y **PrivateLink** (unidireccional, endpoint policies).
- **Cierre**: arquitectura final — dos route tables, shared services, Aurora intacta, Resolver endpoints.

---

## 9. Estado actual

**Se completaron las sesiones de los ocho módulos procesados del Learning Plan.** Ocho módulos están formalmente cerrados al 100 % (*Multi-Account*, *Observability*, *Networking*, *Security*, *Operational Resilience*, *Migration and Modernization*, *Designing Responsible AI Controls* con sus 5 lecciones completadas y Knowledge Check 10/10, y ahora **Integrating AI/ML Services into Architecture** con sus 11 lecciones y actividad integradora cerradas al 100 %), mientras que **Optimizing Hybrid Architectures** tiene sus 13 lecciones completas de contenido (a la espera del quiz integrador).

| Módulo | Sesiones | Estado | Índice |
| --- | --- | --- | --- |
| Designing a Multi-Account Architecture | 10 | `completo` | [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] |
| Implementing Observability and Management Controls | 20 | `completo` | [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] |
| Designing Advanced Network Architectures | 12 | `completo` | [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] |
| **Securing Networks and Data** | **18** | `completo` | [[AWS Solutions Architect Advanced - Securing Networks and Data]] |
| **Optimizing Hybrid Architectures** | **13** | `en-curso` | [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] |
| **Operational Resilience** | **10** | `completo` | [[AWS Solutions Architect Advanced - Operational Resilience]] |
| **Migration and Modernization** | **17** | `completo` | [[AWS Solutions Architect Advanced - Migration and Modernization]] |
| **Integrating AI/ML Services into Architecture** | **11** | `completo` | [[AWS Solutions Architect Advanced - Integrating AI-ML Services into Architecture]] |
| **Designing Responsible AI Controls** | **5** | `completo` | [[AWS Solutions Architect Advanced - Designing Responsible AI Controls]] |

**Total de sesiones cargadas:** **116 sesiones** procesadas en el Learning Plan (8 módulos completos; híbrido completo de contenido a la espera de quiz).

**Siguiente paso:** Se completó formalmente el módulo **Integrating AI/ML Services into Architecture** con la **Lección 11** ([[Activity - Architecture Challenge - AI-ML]]: resolución de la crisis de AnyCompany Media y pipeline financiero de auditoría con S3 Object Lock, Athena y Glacier). El módulo está al 100 % cerrado a nivel de contenido. El siguiente paso es avanzar con el siguiente módulo del Learning Plan (o el quiz de Hybrid).

---

## 🔗 Relacionado

- [[Guia AWS]] — guía oficial del examen
- [[AWS Solutions Architect Advanced - Integrating AI-ML Services into Architecture]] — **módulo completado al 100 %** (11 sesiones: Bedrock multi-cuenta, RAG con OpenSearch Serverless, AgentCore, inferencia en SageMaker, pricing/Prompt Caching, Cross-Region, evaluaciones, observabilidad y capstone)
- [[AWS Solutions Architect Advanced - Designing Responsible AI Controls]] — **módulo completado al 100 %** (IA Responsable, Bedrock Guardrails, AgentCore Identity, Step Functions HITL, gobernanza)
- [[Course Overview - Designing Responsible AI Controls]] — lección 01 del módulo de IA Responsable (hoja de ruta: defensa en 3 capas)
- [[Content Filtering and Compliance Controls]] — lección 02: los 6 componentes de Bedrock Guardrails, PII masking, limitación tool-use, Grounding vs Relevance y Automated Reasoning formal
- [[Human Oversight and Approval Workflows]] — lección 03: supervisión humana con Step Functions, Task Tokens (.waitForTaskToken), Callbacks, Risk-Based Routing y unión de las 3 capas
- [[Finished Architecture - Responsible AI Controls]] — lección 04: arquitectura final integrada, trazado del request a través de las 3 capas y composición según riesgo
- [[Knowledge Check - Responsible AI Controls]] — evaluación final del módulo: 10/10 preguntas de escenario resueltas (100 %)
- [[Course Overview - Integrating AI-ML Services into Architecture]] — lección 01 del módulo de IA/ML (hoja de ruta)
- [[Gathering the Customer Requirements - AI-ML]] — lección 02: caso AnyCompany Media (3 use cases + 3 restricciones)
- [[Multi-Account Bedrock Deployment Patterns]] — lección 03: patrones multi-cuenta, Assume-Role vs RBP y PrivateLink regional
- [[RAG Architectures with Bedrock Knowledge Bases]] — lección 04: arquitectura RAG completa, OpenSearch Serverless, búsqueda híbrida y citas verificables
- [[AI Agent Architectures]] — lección 05: arquitectura de agentes con Bedrock AgentCore, Gateway con Lambda y comparativa RAG vs Fine-Tuning vs Agentes
- [[ML Inference Architectures with SageMaker AI]] — lección 06: las 4 opciones de inferencia en SageMaker (Real-Time, Serverless, Async, Batch Transform) y modelos propietarios vs Bedrock
- [[Bedrock Pricing and Inference Optimization]] — lección 07: los 3 modelos de precios de Bedrock, Prompt Caching, dimensionamiento de PTUs y ausencia de spillover automático
- [[Cross-Region Inference and Data Transfer Costs]] — lección 08: perfiles Cross-Region de Bedrock, enrutamiento $0 data transfer, perfiles Geográficos (GDPR) vs Globales y Route 53 LBR
- [[Model Evaluation with Bedrock Evaluations]] — lección 09: los 3 métodos de evaluación (Automática, Model-as-a-Judge, Humana con Ground Truth), métricas cuantitativas y validación en CI/CD
- [[Monitoring AI Workloads in Production]] — lección 10: las 4 señales operativas en CloudWatch, Model Invocation Logging en S3/Glacier, Data vs. Concept Drift y AgentCore Observability
- [[Activity - Architecture Challenge - AI-ML]] — lección 11 (cierre): actividad integradora, resolución de crisis de AnyCompany Media y pipeline financiero con S3 Object Lock, Athena y Glacier
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — índice del módulo cerrado (10 sesiones)
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo cerrado (20 sesiones)
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — índice del módulo cerrado (12 sesiones)
- [[AWS Solutions Architect Advanced - Securing Networks and Data]] — **módulo cerrado** (18 sesiones: overview, requisitos, Firewall Manager, segmentación, controles de tráfico, Security Hub ×3, GuardDuty con demo, Cryptography, AWS KMS con su demo, CloudHSM, Secrets Manager, Finished Architecture, BuildingBlocks y la actividad final)
- [[Activity - Architecture Challenge - Security]] — cierre del módulo de seguridad: monitoreo, cifrado y respuesta automatizada
- [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] - **módulo con contenido completo** (13 sesiones: de Overview a la actividad final **AnyCompany**)
- [[AWS Solutions Architect Advanced - Operational Resilience]] - **módulo completado** (10 sesiones: Data Lake resilience, S3 RTC, AWS Backup, SSM, SLAs, KPIs, Finished Architecture y BuildingBlocks)
- [[AWS Solutions Architect Advanced - Migration and Modernization]] - **módulo completado** (17 lecciones cargadas, 01-17, formalmente cerrado)
- [[Course Overview - Migration and Modernization]] — lección 01 del módulo de migración (hoja de ruta)
- [[Gathering the Customer Requirements - Migration]] — lección 02: caso Energy & Utilities (gran entorno VMware)
- [[Preparing for Migration]] — lección 03: preparación, Cloud Value Framework y fases MAP
- [[The Migration Process]] — lección 04: fase Mobilize, las 7 Rs y workflow de migración en 6 pasos
- [[Migration Tools]] — lección 05: Landing Zone con Control Tower y transferencia acelerada con AWS DataSync
- [[AWS Transform Overview]] — lección 06: modernización asistida por IA (agentes de AWS Transform)
- [[AWS Transform for VMware]] — lección 07: agente de vSphere a EC2, arquitectura de 3 cuentas y HITL
- [[AWS Application Migration Service]] — lección 08: motor estándar de Rehost a nivel de bloque y cutover mínimo impacto
- [[AWS DataSync]] — lección 09: transferencia masiva data-centric y archivado de datos fríos hacia S3 Glacier
- [[Migrating Databases]] — lección 10: replicación de bases de datos con AWS DMS y conversión de esquemas con AWS SCT
- [[Modernize the Enterprise]] — lección 11: dimensiones de modernización (Arquitectura, Organización, Infraestructura) y el Innovation Flywheel
- [[Before and After Modernization]] — lección 12: evolución técnica en 4 fases (Rehost, Replatform, Contenedores y Serverless)
- [[Using Containers to Modernize]] — lección 13: contenedorización con Amazon ECS/EKS (Fargate) y AWS App2Container
- [[Use Serverless Architectures]] — lección 14: arquitecturas serverless modulares ("small pieces, loosely joined")
- [[Finished Architecture - Migration]] — lección 15: capstone de arquitectura final del caso Energy & Utilities
- [[BuildingBlocks Videos - Migration]] — lección 16: debates de diseño (VMware multi-región, petabytes con enlaces lentos y serverless refactor)
- [[Activity - Architecture Challenge - Migration]] — lección 17: capstone integrador final (caso AnyCompany Cookies con 6/6 aciertos)
- [[BuildingBlocks Videos - Resilience]] — lección 10 de resiliencia: casos de Aurora Global Database y Warm Standby
- [[Architecting for Cost - Compute]] — lección 13: EC2, rightsizing, Fleet y Auto Scaling
- [[Architecting for Cost - Networking]] — lección 14: data transfer, LCU y EIP
- [[Architecting for Cost - Storage]] — lección 15: EBS, snapshots y S3
- [[Architecting for Cost - Databases]] — lección 16: reservas, caché y global tables
- [[Designing Observability Solutions]] — lección 17: 3 pilares y alarmas compuestas
- [[Distributed Tracing for Microservices]] — lección 18: X-Ray, ADOT y sampling
- [[Synthetic Monitoring and Service-Level Objectives]] — lección 19: canaries, RUM y SLOs
- [[Multi-Account Observability]] — última lección cargada (20): OAM, subscription filters y Container Insights
- [[Activity - Architecture Challenge]] — cierre con 6/6
- [[Definicion servicios]] — definiciones de referencia

