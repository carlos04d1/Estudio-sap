---
title: "AWS Solutions Architect Advanced — Designing a Multi-Account Architecture"
aliases:
  - "Designing a Multi-Account Architecture"
  - "Índice Multi-Account"
  - "Módulo Multi-Account"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - multi-account
  - indice
  - dominio-1
status: completo
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Designing a Multi-Account Architecture

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> Las sesiones 01–04 cubren la **Tarea 1.4 — Diseñar un entorno de AWS de varias cuentas** del SAP-C02
> (complejidad organizacional, 26 %); 05–08 entran en **Tarea 2.1 — estrategia de implementación** (CI/CD, IaC,
> pipeline security y el caso integral); 09 toca **Tarea 1.1** (redes), **1.2** (controles de seguridad) y
> **1.5** (costos); y 10 es la **actividad integradora** con el caso AnyCompany.

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones 1 → 8; la traducción del 9 es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como ✅ solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 📌 Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | **Gathering the Customer Requirements** | Relevamiento: contexto de negocio antes que servicios; 3 requisitos del cliente | 🔵 consolidado | [[Gathering the customer REquirements]] |
| 02 | **Multi-Account Access Solutions** | Cross-account access con IAM roles, auditoría, log account, Service Catalog | 🔵 consolidado | [[Multi-Account Access Solutions]] |
| 03 | **AWS Organizations and IAM Identity Center** | Organizations, SCPs, permisos efectivos, Identity Center, demo | 🔵 consolidado | [[AWS Organizations and IAM Identity Center]] |
| 04 | **AWS Control Tower** | Orquestador, landing zone, controls, Account Factory, enrollment | 🔵 consolidado (26/10) | [[AWS Control Tower]] |
| 05 | **CI/CD Deployment Models** | In-place, rolling, immutable, blue/green; CodeDeploy, rollbacks, canary | 🔵 consolidado (26/10) | [[CI-CD Deployment Models]] |
| 06 | **CloudFormation StackSets** | StackSets multi-cuenta/multi-región, self vs service-managed, concurrency y tolerancia | 🔵 consolidado (26/10) | [[CloudFormation StackSets]] |
| 07 | **CI/CD Pipeline Security** | InspectorScan, ECR scanning, tools account, multi-región, rollback automático | 🔵 consolidado (26/10) | [[CI-CD Pipeline Security]] |
| 08 | **Finished Architecture** | Caso integral: cuentas, pipeline, SCPs, logging, costos, fase dos | 🔵 consolidado (26/10) | [[Finished Architecture]] |
| 09 | **BuildingBlocks Videos** | Security Hub, cost controls con SCP, PrivateLink con CIDR solapado | 🔵 consolidado (26/10) | [[BuildingBlocks Videos]] |
| 10 | **Activity: Architecture Challenge** | Caso AnyCompany: 3 desafíos × 2 partes; respuestas y anti-patrones | ✅ **6/6** (26/10) | [[Activity - Architecture Challenge]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 🗂️ Qué cubre cada sesión

### 01 — Gathering the Customer Requirements
- Regla de oro: **el contexto de negocio va antes que la solución técnica**.
- Caso: e-commerce **born in the cloud** con equipos múltiples y despliegues manuales.
- **Guardrails** (permitir con límites) vs **gates** (bloquear hasta cumplir).
- Requisitos: multi-cuenta segura/automatizada, identidad y gobernanza central, CI/CD con testing, costos por
  equipo, escalabilidad, **PCI + GDPR** demostrable.

### 02 — Multi-Account Access Solutions
- Sin cross-account access → credenciales duplicadas y revocación en N cuentas.
- Con **IAM roles** → usuarios en una cuenta, permisos por rol, credenciales temporales (STS), revocación
  cambiando la **trust policy**.
- **Auditoría**: rol de auditoría por cuenta + permiso de `AssumeRole` desde la cuenta del auditor.
- Casos de uso: **centralized log account** (CloudTrail + Config) y **centralized resource protection**
  (Service Catalog, AMIs, snapshots).

### 03 — AWS Organizations and IAM Identity Center
- **Organizations**: cuentas, OUs, consolidated billing, SCPs.
- **Permisos efectivos = IAM ∩ SCP** (la SCP nunca otorga, solo limita).
- **IAM Identity Center**: identidad centralizada, **permission sets**, SSO, integración con Organizations.
- Demo paso a paso + diferencia entre **quién hace qué** (Organizations vs Identity Center).

### 04 — AWS Control Tower
- **Orquestador** (Organizations + IAM Identity Center + Service Catalog), no corre workloads.
- **Landing zone**: Root OU / Security OU / Sandbox OU opcional / Log Archive / Audit / Workloads.
- **20 preventive + 6 detective controls** aplicados al setup (salvo la management account).
- **Controls**: preventive = **SCP** · detective = **Config + Lambda** · proactive = **CloudFormation hooks**.
- **Account Factory** (product de Service Catalog), **blueprints**, dashboard, **enrollment** de cuentas
  existentes (cuentas no enroladas quedan **fuera** de la gobernanza).

### 05 — CI/CD Deployment Models
- La estrategia la dicta el **negocio** + los **recursos disponibles**.
- **In-place** (mismos recursos; all-at-once = ventana de mantenimiento).
- **Rolling** (por porciones, **cero downtime**, dos versiones conviviendo, rollback lento).
- **Immutable** (ASG nuevo, rollback por tráfico, ideal con **dependencias desconocidas**).
- **Blue/green** (entorno paralelo; **DNS cutover** o **swap de ASG**; **linear** vs **canary**).
- **CodeDeploy**: tamaño de lote, **auto rollback** por falla o umbral, **CloudWatch alarm** para detener, y
  manejo de archivos ajenos (**fail / overwrite / retain**).

### 06 — CloudFormation StackSets
- Repaso: **template → stack → change set** (preview del impacto, detecta *replacement*).
- **StackSets** = una operación sobre **muchas cuentas y regiones**.
- **Administrator account** vs **target account** + **trust relationship**.
- **Self-managed** (roles propios, cualquier cuenta) vs **service-managed** (Organizations, roles automáticos,
  **auto-deploy** a cuentas nuevas).
- **Concurrency** y **failure tolerance**; **un template + un parameter set**; el stack set es **regional**.
- **Update por default toca todas las stack instances**; para granularidad, varios stack sets.

### 07 — CI/CD Pipeline Security
- El escaneo va en **build**, después de compilar y **antes de promover**.
- **InspectorScan**: acción nativa, **etapa standalone** → gate que **no se saltea** con el buildspec.
  **SourceCodeScan** vs **ECRImageScan**; umbral **CRITICAL/HIGH**; salida **SBOM**.
- **ECR**: **basic** (CVEs) vs **enhanced** (Inspector: OS + lenguajes).
- **Tools account**: pipeline + CodeBuild + artifact S3 + **KMS**; targets solo deployment targets →
  **least privilege**, **audit trail**, **artifact integrity**.
- **Multi-región**: **sequential** (default, blast radius) vs **parallel**; artefactos por **S3 CRR**.
- **Rollback**: **CloudWatch alarms** + **health thresholds**; **canary + alarmas** = menor riesgo.

### 08 — Finished Architecture (capstone)
- **Control Tower + IAM Identity Center** como base; **3 cuentas core** + **shared services**.
- **Pipeline en shared services** desplegando **cross-account** a **Dev** y **Prod**.
- **CloudFormation + StackSets** para infraestructura consistente (Terraform descartado por integración nativa).
- **SCPs** como red de seguridad (no deshabilitar CloudTrail, no tocar SGs core).
- **Tests en Dev → aprobación manual → Prod**.
- **CloudTrail → Log Archive**, dashboards + CloudWatch; **Account Factory**; **tags + budgets**.
- **Fase dos**: security scanning en pipeline, compliance checks, **cross-Region DR**.

### 09 — BuildingBlocks Videos (3 casos)
- **Notificaciones multi-cuenta**: Security Hub + Macie + Access Analyzer; se descarta el agregador casero
  (S3 + Lambda + EventBridge) por **carga operativa**.
- **Costos en dev**: Budgets en la **management account** + **SCP de deny** creada por Lambda y removida por
  **EventBridge programado**; el IAM restrictivo **no sirve** porque el admin lo deshace.
- **CIDR solapado** (`10.0.0.0/16` en dos cuentas): peering y TGW **no enrutan**; NAT+TGW es caro y complejo;
  **PrivateLink** resuelve con **mínimo esfuerzo** (solo cambia el DNS name).

### 10 — Activity: Architecture Challenge (cierre)
- Caso **AnyCompany** (fintech, 85 devs, SOX/PCI DSS) con **3 desafíos × 2 partes**.
- **Respuestas**: 1A = **A, D, E** · 1B = **D** · 2A = **A, C, F** · 2B = **D** · 3A = **D, E, F** · 3B = **A**.
- **SAML vs SCIM**, **Cognito no es para workforce**, **preventivo vs detectivo vs provisioning**.
- **Anti-patrones** que aparecen como distractores (IAM users por cuenta, SCP única, Config solo en prod,
  pipelines por cuenta, access keys hardcodeadas).
- Cómo leer la **segunda parte**: el enunciado ya enumera los requisitos que la respuesta debe contener.

---

## ✅ Checklist: lo que tenés que poder explicar

- [ ] Por qué se empieza por los requisitos y no por los servicios.
- [ ] Diferencia entre **guardrail** y **gate**.
- [ ] Cómo funciona el **cross-account access** con IAM roles y por qué es mejor que duplicar usuarios.
- [ ] Qué es una **trust policy** y cómo se revoca el acceso.
- [ ] Por qué los **logs van a una cuenta separada**.
- [ ] **Permisos efectivos = IAM ∩ SCP**.
- [ ] Qué centraliza **IAM Identity Center** y qué no.
- [ ] Qué crea exactamente una **landing zone** de Control Tower.
- [ ] **Preventive vs detective vs proactive** (implementación y status de cada uno).
- [ ] Por qué la **management account** no lleva workloads.
- [ ] Por qué una cuenta preexistente queda **fuera** de la gobernanza hasta enrolarla.
- [ ] Cuándo elegir **in-place**, **rolling**, **immutable** o **blue/green**.
- [ ] Por qué el rollback de **immutable** es más rápido que el de **rolling**.
- [ ] **Linear vs canary** y las dos formas de redirigir tráfico en blue/green.
- [ ] **Self-managed vs service-managed** en StackSets y cuándo usar cada uno.
- [ ] Por qué un **change set** evita pérdida de datos.
- [ ] Qué significa que un **stack set sea regional**.
- [ ] Por qué el **InspectorScan** no se puede saltear cambiando el buildspec.
- [ ] **Basic vs enhanced** scanning en ECR.
- [ ] Los **3 beneficios** de la tools account y qué hace la **trust policy**.
- [ ] Por qué **sequential** es el default en multi-región.
- [ ] Los **dos** mecanismos de rollback automático de CodeDeploy.
- [ ] Dónde vive el pipeline y por qué (shared services).
- [ ] Qué corre en Dev y qué requiere aprobación manual.
- [ ] Qué decisiones se descartaron (Jenkins, Terraform, Organizations manual) y por qué.
- [ ] Las tres mejoras de **fase dos**.
- [ ] Por qué **SCP** frena a un admin y una **política IAM** no.
- [ ] Qué **no** funciona con **CIDR solapado** (peering, TGW) y qué sí (**PrivateLink**).
- [ ] Cuándo **Security Hub** reemplaza a un agregador casero de findings.
- [ ] **SAML vs SCIM** y por qué **Cognito** no es para workforce.
- [ ] Por qué **Account Factory** da compliance inmediata y **Config** solo detecta.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| — | *(sin dudas abiertas)* | — | — |

---

## ⏳ Pendiente del módulo

- [ ] **Labs del learning plan** (el nombre del plan dice *Includes Labs*; las 10 lecciones ya están cargadas).
- [ ] **Repaso con preguntas de las sesiones 01–09** — la 10 ya está ✅ (6/6).
- [ ] **Revisión de detalles** de todo el módulo (pedida para el final): consistencia, links y datos repetidos.
- [ ] Actualizar las notas de tarea del dominio (1.1, 1.2, 1.4, 1.5, 2.1) con lo consolidado acá.

---

## 🔗 Relacionado

- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — la tarea del examen que cubre el bloque multi-cuenta
- [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]] — la tarea que
  cubre **CI/CD**, **StackSets** y **pipeline security**
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- [[Definicion servicios]] — definiciones de los servicios mencionados
- [[AWS Control Tower]] · [[AWS Organizations and IAM Identity Center]] · [[Multi-Account Access Solutions]] ·
  [[Gathering the customer REquirements]] · [[CI-CD Deployment Models]] · [[CloudFormation StackSets]] ·
  [[CI-CD Pipeline Security]] · [[Finished Architecture]] · [[BuildingBlocks Videos]] ·
  [[Activity - Architecture Challenge]]
