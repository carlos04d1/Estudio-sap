---
title: "Activity: Architecture Challenge"
aliases:
  - "Architecture Challenge"
  - "Reto de arquitectura"
  - "Caso AnyCompany"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - actividad
  - examen
  - multi-account
  - caso-practico
status: completado
fuente: "AWS Solutions Architect Advanced (AWS Skill Builder) — Activity: Architecture Challenge"
---

# Activity: Architecture Challenge

> [!abstract] Qué es este archivo
> **Actividad de cierre** del curso: el caso **AnyCompany** (fintech) con **3 desafíos × 2 partes**.
> Primero elegís **3 soluciones posibles**; después llega **información adicional** y hay que elegir **la mejor**.
>
> Acá están las **respuestas**, el **porqué de cada una** y el **porqué de cada distractor**. Los enunciados y
> opciones están resumidos en español para estudiar; el texto original está en inglés en Skill Builder.

> [!tip] Cómo usarla
> Tapá la tabla de respuestas, contestá primero, y después leé el análisis. El valor no está en acertar: está en
> reconocer **el anti-patrón** que hace falsa a cada distractor.

> [!success] Resultado del intento
> **26/10/2026 — 6 de 6 correctas** en Skill Builder.
> Las tres partes de "elegir 1" salieron bien, incluidas las dos trampas: **SCIM sobre SAML** (1.B) y **leer el
> enunciado como lista de requisitos** (3.B). Actividad **cerrada**.

---

## 🎯 Respuestas rápidas

| Desafío | Parte | Pregunta | Respuesta |
| --- | --- | --- | --- |
| **1** | A | Servicios para multi-cuenta + Okta (3) | **A, D, E** |
| **1** | B | Implementación para 85 devs en varios equipos (1) | **D** |
| **2** | A | Governance automatizado y compliance (3) | **A, C, F** |
| **2** | B | Onboarding de 15+ equipos en 18 meses (1) | **D** |
| **3** | A | CI/CD consistente, seguro y auditable (3) | **D, E, F** |
| **3** | B | Arquitectura óptima de CI/CD (1) | **A** |

---

## 🏢 El caso: AnyCompany

| Aspecto | Situación |
| --- | --- |
| **Negocio** | Fintech en crecimiento: banca, inversiones y pagos. **500.000+ clientes**, millones de transacciones/mes |
| **Equipo** | De **15 a 85 developers** en **múltiples product teams** |
| **Momento** | Preparación para **Series C** + requisitos regulatorios (**SOX**, **PCI DSS**) |
| **Arquitectura actual** | **Una sola cuenta** con dev, staging y prod mezclados |
| **Accesos** | **Usuarios y grupos IAM** básicos; **service accounts compartidas** para deploy |
| **Despliegues** | **Manuales**, templates de CloudFormation básicos, prácticas inconsistentes |
| **Identidad** | **Okta** para aplicaciones de negocio, **sin integración con AWS** |

> **Los 5 problemas de negocio:** acceso multi-cuenta · identidad centralizada con Okta · governance y compliance ·
> provisioning automático de cuentas · CI/CD estandarizado.

---

## 🧩 Desafío 1 — Estrategia multi-cuenta e integración de identidad

### 1.A — ¿Qué combinación resuelve el acceso multi-cuenta y la integración con Okta? *(elegir 3)*

**Respuesta: A, D y E.**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A** | ✅ | **Organizations + Control Tower** con cuentas separadas **dev/staging/prod**; **IAM Identity Center con SAML** hacia **Okta**; **SCPs** para límites y compliance. Es el patrón canónico del módulo |
| **B** | ❌ | Cuentas **manuales** + **IAM users** por cada uno de los **85 devs en 3 cuentas** + Directory Service sincronizando. Duplica identidades, no da SSO real y **no escala** |
| **C** | ❌ | **SSO legacy** + **RAM para "compartir recursos en una sola cuenta"** + condition keys "simulando" límites. **No hay límites reales**: todo vive en la misma cuenta |
| **D** | ✅ | **Organizations con OUs por product team** + **IAM Identity Center como IdP central** con **SCIM desde Okta** + **permission sets** por rol en dev/staging/prod |
| **E** | ✅ | **Control Tower con guardrails** + **StackSets** para configuraciones consistentes + **Identity Center con IdP externo (Okta)** + **roles cross-account** para deploys |
| **F** | ❌ | **Cognito** para workforce (es para **clientes**, no empleados) + **un rol cross-account por developer** (no escala) + Config, que **no resuelve identidad** |

**Los tres distractores atacan lo mismo:** identidad **duplicada y manual** (B), **límites falsos** en una sola
cuenta (C) y la **herramienta equivocada** para workforce (F).

### 1.B — ¿Qué implementación sirve para 85 devs en varios equipos? *(elegir 1)*

**Respuesta: D.**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A** | ❌ | Es correcta como arquitectura, pero acá no responde el problema: **SAML** autentica, **no administra el ciclo de vida** de 85 personas que entran, se mueven y se van |
| **B** | ❌ | "Individual permissions for trust relationships" es vago y **no escala**; no menciona el IdP |
| **C** | ❌ | Foco en **guardrails + StackSets + roles de deployment**: es **infraestructura**, no gestión de identidad del equipo |
| **D** | ✅ | **OUs por product team** (separación de concerns) + **SCIM** (altas/bajas automáticas desde Okta) + **permission sets** (acceso por rol y entorno) = **eficiencia operativa** |

> [!important] La diferencia que decide esta pregunta
> **SAML / OIDC autentican.** **SCIM provisiona y desprovisiona usuarios y grupos** automáticamente.
> Con **85 developers** que cambian de equipo y se van, el requisito implícito es **ciclo de vida automatizado** →
> **SCIM**. Sin SCIM, cada alta/baja es trabajo manual en 3 cuentas.

---

## 🛡️ Desafío 2 — Governance y compliance automatizados

### 2.A — ¿Qué servicios crean la estructura de governance? *(elegir 3)*

**Respuesta: A, C y F.**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A** | ✅ | **Control Tower** con landing zone + **Account Factory** para provisioning + **guardrails obligatorios** en todas las OUs y **opcionales** para necesidades del equipo → cumple "consistencia con flexibilidad" |
| **B** | ❌ | **Cada equipo despliega sus propios templates** a mano: es exactamente el problema que hay que resolver (inconsistencia) |
| **C** | ✅ | **SCPs** = controles **preventivos**; OUs **por entorno** + políticas **específicas por entorno** → granularidad real |
| **D** | ❌ | **Una sola SCP para todo** → demasiado blunt: frena lo que dev/staging necesitan y **no distingue entornos**. "Máxima seguridad" a costa de **romper la operación** |
| **E** | ❌ | **Config solo en prod** + templates **hardcodeados y modificables** por cada equipo → no hay baseline ni enforcement |
| **F** | ✅ | **Config rules en todas las cuentas vía Organizations** (detección continua) + **StackSets** (configuración y **remediation** consistentes) |

**El eje del desafío:** **preventivo (SCPs) + detectivo (Config) + provisioning con baseline (Control Tower/Account
Factory)**. Ninguno alcanza solo.

### 2.B — 15+ equipos en 18 meses con compliance **inmediata** *(elegir 1)*

**Respuesta: D.**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A** | ❌ | SCPs son **preventivas**: no **crean** cuentas ni aplican baseline al onboardear |
| **B** | ❌ | Config + StackSets **detectan y configuran**, pero no **provisionan** la cuenta ni garantizan compliance **desde el minuto cero** |
| **C** | ❌ | Template + **deploy manual + checklist post-deployment** → lo contrario de automatización; "inmediatamente compliant" es imposible |
| **D** | ✅ | **Account Factory** crea cada cuenta con **baseline** y **guardrails obligatorios ya aplicados** → compliance **inmediata**, sin trabajo manual, y escala a 15+ equipos |

> [!important] La frase que decide
> **"Inmediatamente compliant" + "cuentas nuevas"** = **Account Factory con guardrails**, no "Config que después
> detecta y corrige".

---

## 🚀 Desafío 3 — CI/CD estandarizado

### 3.A — ¿Qué servicios dan CI/CD consistente, seguro y auditable? *(elegir 3)*

**Respuesta: D, E y F.**

| Opción | Veredicto | Análisis |
| --- | --- | --- |
| **A** | ❌ | **Jenkins** por cuenta + **SSH keys compartidas** + scripts custom + aprobaciones **por email**. Mantiene el problema de credenciales compartidas |
| **B** | ❌ | **Access keys hardcodeadas** + **S3 con lectura pública** + templates **sin versionado** → antítesis de seguridad y auditoría |
| **C** | ❌ | **Un pipeline por cuenta** + **IAM users locales** + intervención manual por Session Manager → sin cross-account ni governance central |
| **D** | ✅ | **CodePipeline cross-account** + **Identity Center** para developers + **CodeBuild con IAM roles** + **StackSets** para infraestructura consistente |
| **E** | ✅ | **CodePipeline en una cuenta DevOps dedicada** + **roles cross-account** + **CodeDeploy** + **CloudTrail** (auditoría) + **Parameter Store** (config segura) |
| **F** | ✅ | **CodeBuild con roles cross-account** + **approval gates** para producción + **SCPs** para compliance + **templates con tagging** consistente |

**Distractores:** credenciales de largo plazo (A, B), aislamiento sin centralización (C) y ausencia de auditoría.

### 3.B — ¿Cuál es la arquitectura óptima? *(elegir 1)*

**Respuesta: A.**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A** | ✅ | **CodePipeline cross-account** + **IAM Identity Center** + **CodeBuild con IAM roles** + **StackSets**: cumple **exactamente** los tres requisitos que el enunciado dice que ya están establecidos |
| **B** | ❌ | Tiene gates y SCPs, pero **no incluye Identity Center ni StackSets** y no fija dónde vive el pipeline |
| **C** | ❌ | La cuenta DevOps dedicada es un buen patrón, pero **no integra Identity Center ni StackSets**, que el enunciado da por establecidos |
| **D** | ❌ | **Un pipeline independiente por equipo**: vuelve al problema original (inconsistencia, sin auditoría ni governance central) |

> [!important] El truco de esta parte
> El enunciado arranca con: *"estableciste que AnyCompany necesita una solución de CI/CD con **capacidades
> cross-account**, **integración con IAM Identity Center** y **CloudFormation StackSets**"*.
> La respuesta correcta es **la única que contiene esos tres elementos**. No hay que "elegir la mejor en general":
> hay que **elegir la que cumple lo ya decidido**.

---

## 🧠 Patrones que enseña la actividad

### 1. Identidad: autenticar ≠ administrar el ciclo de vida

| Necesidad | Mecanismo |
| --- | --- |
| **Login único** en AWS y apps | **SAML / OIDC** en IAM Identity Center |
| **Altas, bajas y cambios de grupo automáticos** | **SCIM** |
| **Permisos por rol y por cuenta** | **Permission sets** |
| **Clientes** de la aplicación (no empleados) | **Cognito** |

### 2. Governance: los tres verbos

| Verbo | Servicio | Pregunta que responde |
| --- | --- | --- |
| **Prevenir** | **SCP** | ¿Qué **no se puede** hacer, ni con admin? |
| **Detectar** | **AWS Config** (+ Security Hub) | ¿Qué se **desvió** del baseline? |
| **Provisionar con baseline** | **Control Tower + Account Factory** | ¿Cómo nace una cuenta **ya compliant**? |

### 3. Anti-patrones que aparecen como distractores

| Anti-patrón | Por qué está mal |
| --- | --- |
| **IAM users** por developer en cada cuenta | Duplica identidad, no hay SSO, no escala |
| **Directory Service + IAM users** para workforce | Complejidad sin resolver el ciclo de vida |
| **Cognito** para empleados | Cognito es para **clientes** de la app |
| **SSO legacy** + "límites simulados" | No son límites reales |
| **Una SCP única** para toda la organización | Blunt: rompe entornos que necesitan permisos |
| **Config solo en producción** | Deja el resto del entorno sin detección |
| **Templates modificables / checklist manual** | No hay enforcement ni compliance inmediata |
| **Jenkins + SSH keys compartidas** | Credenciales de largo plazo |
| **Access keys hardcodeadas + S3 público** | Falla de seguridad básica |
| **Un pipeline por cuenta** | Inconsistencia y sin auditoría central |
| **Aprobación por email** | No es un control auditable |
| **Pipeline independiente por equipo** | Vuelve al problema original |

### 4. Cómo leer las preguntas de "elegir 1" después de "elegir 3"

1. La primera parte valida que sepas **qué sirve**.
2. La segunda agrega **una restricción** y te obliga a **priorizar**.
3. **Leé el enunciado de la segunda parte como si fuera una lista de requisitos**: si dice "cross-account,
   Identity Center y StackSets", la respuesta **tiene que contener los tres**.
4. Si dos opciones son técnicamente válidas, gana la que responde **el requisito explícito**, no la "más completa".

---

## ✅ Checklist de comprensión

- [ ] Puedo explicar por qué **Cognito** no sirve para workforce.
- [ ] Sé la diferencia entre **SAML** y **SCIM**.
- [ ] Puedo justificar **SCPs + Config + Account Factory** como un sistema, no como piezas sueltas.
- [ ] Sé por qué **una sola SCP** es mala idea.
- [ ] Puedo enumerar **5 anti-patrones** de CI/CD.
- [ ] Entiendo por qué **Account Factory** da compliance "inmediata" y **Config** no.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — índice del módulo
- [[Gathering the customer REquirements]] — el método de relevamiento que esta actividad pone a prueba
- [[AWS Organizations and IAM Identity Center]] — OUs, SCPs, permission sets, SCIM
- [[AWS Control Tower]] — landing zone, guardrails, Account Factory
- [[CloudFormation StackSets]] — configuraciones consistentes multi-cuenta
- [[CI-CD Deployment Models]] · [[CI-CD Pipeline Security]] — pipelines, gates, auditoría
- [[Finished Architecture]] — el caso resuelto del curso
- [[BuildingBlocks Videos]] — Security Hub, SCPs para costos, PrivateLink
- [[1.2 Prescribir controles de seguridad]] · [[1.4 Diseñar un entorno de AWS de varias cuentas]] ·
  [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — tareas del examen
- [[Definicion servicios]] — definiciones de los servicios usados
