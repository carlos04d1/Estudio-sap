---
title: "Gathering the Customer Requirements"
aliases:
  - "Gathering the customer REquirements"
  - "Relevamiento de requisitos"
  - "Requisitos del cliente - Multi-Account"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - multi-account
  - requisitos
status: activo
fuente: "AWS Solutions Architect Advanced - Designing a Multi-Account Architecture (AWS Skill Builder)"
---

# Gathering the Customer Requirements

> [!abstract] Qué es este archivo
> Primera sesión del módulo **Designing a Multi-Account Architecture**. Acá no hay arquitectura todavía:
> acá se **escucha al cliente** y se convierte esa conversación en requisitos accionables.
>
> Idea central: **el contexto de negocio va antes que la solución técnica.** Si arrancás por los servicios,
> ya perdiste.

> [!quote] La regla de oro
> **Siempre empezar por entender el contexto de negocio antes de meterse en soluciones técnicas.**

---

## Resumen en una frase

> Una e-commerce **born in the cloud** que crece rápido necesita una **arquitectura multi-cuenta segura y automatizada** que dé autonomía a los equipos sin perder control centralizado de seguridad, compliance y costos.

---

## 1. Contexto del cliente

| Aspecto | Situación |
| --- | --- |
| **Tipo de empresa** | E-commerce "born in the cloud" (nació en la nube, sin legado on-premises) |
| **Desafío principal** | Establecer una **arquitectura multi-cuenta robusta** para su pipeline de desarrollo de aplicaciones |
| **Qué NO es el problema** | No es "crear entornos separados" y listo |
| **Qué SÍ es el problema** | Construir una **base** que soporte crecimiento rápido **manteniendo seguridad y gobernanza** |
| **Estructura** | Varios equipos de desarrollo, cada uno dueño de un componente de la plataforma |
| **Momento** | Crecimiento acelerado; los despliegues manuales ya son cuello de botella |

---

## 2. Hallazgos clave de la reunión

| # | Tema | Lo que dijo el cliente | Implicancia para el diseño |
| --- | --- | --- | --- |
| 1 | **Organización y workflow** | Múltiples equipos, cada uno con autonomía para innovar rápido | Necesita **autonomía por equipo** + **control centralizado** |
| 2 | **Seguridad / IAM** | Hay que definir quién accede a qué y cómo se autentica entre entornos | Identidad centralizada y acceso por rol/entorno |
| 3 | **Compliance** | **PCI** y **GDPR** son **no negociables** (datos de clientes) | Controles obligatorios, auditables y aplicados en todas las cuentas |
| 4 | **Automatización** | Publican seguido; el despliegue manual frena | Pipeline **end-to-end**: commit → producción |
| 5 | **Validación** | Quieren automatizar, pero con pruebas en cada etapa | Gates de calidad/test automatizados dentro del pipeline |
| 6 | **Costos** | Quieren cuentas separadas de dev y prod, pero con visibilidad | Costos **por equipo y por entorno**, con alertas de desvío |
| 7 | **Políticas** | Estándares consistentes en todas las cuentas **sin** ahogar la innovación | **Guardrails** (permitir con límites) > **gates** (bloquear) |
| 8 | **Escalabilidad** | Crecen rápido; la arquitectura tiene que crecer con ellos | Onboarding repetible de **nuevos equipos y nuevos entornos** |

> [!tip] Guardrails vs. Gates (lo que el cliente pidió sin decirlo con esas palabras)
> - **Guardrail:** barrera que **deja avanzar** dentro de límites seguros (ej.: SCPs, políticas de OU, presupuestos).
> - **Gate:** punto de control que **bloquea** hasta que se cumple una condición (ej.: aprobación manual, tests en rojo).
> - El cliente quiere **guardrails como default** y gates solo donde el riesgo lo justifique.

---

## 3. Requisitos identificados

Los tres requisitos que salieron de la reunión:

1. **Estructura multi-cuenta segura y automatizada**, con **separación real entre desarrollo y producción**.
2. **Gestión centralizada de identidades y controles de gobernanza** aplicados de forma consistente en todas las cuentas.
3. **Pipelines de despliegue automatizados** que mantengan la seguridad **y** habiliten desarrollo rápido (con testing y validación en cada etapa).

Requisitos implícitos (también hay que cubrirlos):

4. **Visibilidad de costos** por equipo y por entorno, con prevención de sobrecostos.
5. **Escalabilidad organizacional**: incorporar equipos y entornos nuevos sin rediseñar.
6. **Cumplimiento PCI + GDPR** demostrable (no solo "configurado").

---

## 4. Traducción del contenido (transcripción)

> Traducción completa al español de la sesión original en inglés.

Hola a todos. Hoy quiero explicarles mi proceso de **relevamiento de requisitos** para una emocionante empresa de comercio electrónico **nacida en la nube**.

Mi regla de oro es **siempre empezar por entender el contexto de negocio antes de meterse en soluciones técnicas**.

En mi reunión inicial con el equipo directivo de la empresa, nos enfocamos en su **desafío principal**: necesitan establecer una **arquitectura multi-cuenta robusta** para su **pipeline de desarrollo de aplicaciones**. Esto no se trata solo de crear entornos separados; se trata de construir una **base** que soporte su **rápido crecimiento** mientras mantiene **seguridad y gobernanza**.

Déjenme compartir algunos hallazgos clave de nuestra conversación.

**Primero**, hablamos de su **estructura organizacional y flujo de trabajo de desarrollo**. Tienen **múltiples equipos de desarrollo** trabajando en distintos componentes de su plataforma de e-commerce. Cada equipo necesita la **autonomía** para innovar rápido, pero la empresa también necesita **control centralizado** para mantener los estándares de **seguridad y cumplimiento**.

**La seguridad fue un foco importante** de la conversación. Discutimos su enfoque actual de **gestión de identidades y accesos**: ¿quién necesita acceso a qué recursos? ¿Cómo manejan la **autenticación entre distintos entornos**? Estas preguntas son importantes porque en e-commerce, **proteger los datos de los clientes** y mantener el cumplimiento de **PCI y GDPR** son **no negociables**.

Cuando exploramos su **proceso de desarrollo**, destacaron la necesidad de **automatización y consistencia**. Sus equipos publican actualizaciones con frecuencia y los **despliegues manuales se están volviendo un cuello de botella**. Quieren **automatizar todo el pipeline**, desde el commit de código hasta el despliegue en producción, pero necesitan asegurar **pruebas y validaciones adecuadas en cada etapa**.

**La gestión de costos** fue otro tema interesante. Si bien quieren **cuentas separadas** para desarrollo y producción, les preocupa mantener **visibilidad de los costos entre cuentas**. Necesitan **rastrear el gasto por equipo y por entorno**, y a la vez **evitar sobrecostos inesperados** por requisitos de gobernanza.

Discutimos cómo gestionan actualmente **políticas y cumplimiento**. Necesitan una forma de **aplicar estándares de manera consistente en todas las cuentas**, sin dejar de dar a los equipos la **flexibilidad** que necesitan para innovar. Esto llevó a muy buenas conversaciones sobre **guardrails versus gates** en su proceso de desarrollo.

Un punto particularmente importante que plantearon fue la **escalabilidad futura**. Están creciendo rápido y necesitan una **arquitectura que crezca con ellos**. Eso implica pensar en cómo **incorporar nuevos equipos**, **agregar nuevos entornos** y **mantener seguridad y gobernanza a medida que escalan**.

Después de estas conversaciones, **identifiqué varios requisitos clave**:

- Necesitan una **estructura multi-cuenta segura y automatizada** que **separe desarrollo de producción**.
- Necesitan **gestión centralizada de identidades** y **controles de gobernanza**.
- Necesitan **pipelines de despliegue automatizados** que mantengan la seguridad **habilitando el desarrollo rápido**.

En nuestra próxima conversación, les mostraré cómo **traducir estos requisitos en una arquitectura específica** usando **AWS Control Tower**, **IAM Identity Center** y **servicios de CI/CD**.

Entender estos fundamentos es importante antes de pasar al **diseño de la solución**.

---

## 5. Del requisito al servicio (puente a la próxima sesión)

| Requisito | Servicio(s) que se anticipan |
| --- | --- |
| Estructura multi-cuenta gobernada | **AWS Control Tower** (Landing Zone, OUs, Account Factory) |
| Identidad centralizada | **AWS IAM Identity Center** (+ roles IAM por cuenta) |
| Guardrails de políticas | **SCPs** (Organizations), **control policies** de Control Tower |
| Pipeline automatizado | **CI/CD** (CodePipeline / CodeBuild / CodeDeploy o equivalentes) |
| Visibilidad de costos | Cost Explorer, AWS Budgets, etiquetado por equipo/entorno |

> [!warning] No adelantarse
> Esto es **anticipo**, no la solución. La sesión siguiente es la que define la arquitectura. No mezclar
> requisitos con decisiones de diseño cuando se estudia.

---

## 6. Preguntas que deja abiertas

- ¿Cuántas cuentas exactamente y con qué granularidad (por equipo, por entorno, por dominio)?
- ¿Autenticación federada con un IdP corporativo existente o identidades nativas de IAM Identity Center?
- ¿Qué es "producción" para ellos: una cuenta o varias (por región / por línea de negocio)?
- ¿Los gates de aprobación son humanos o solo automáticos (tests + análisis de seguridad)?
- ¿Cómo se etiquetan los recursos para que el costo por equipo sea confiable?
- ¿Quién es el dueño de la política: plataforma central o cada equipo?

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Requisitos primero, servicios después.** Los escenarios del examen describen negocio y restricciones; la respuesta correcta respeta **todas** las restricciones, no la que suena más moderna.
> 2. **Autonomía + control** no es una contradicción: se resuelve con **multi-cuenta + guardrails**.
> 3. **PCI/GDPR** implican controles **demostrables y consistentes**, no configuraciones sueltas por cuenta.
> 4. **Costo por equipo/entorno** exige **etiquetado + separación de cuentas**, no solo reportes.
> 5. **Escalabilidad organizacional** se diseña: onboarding repetible de cuentas y equipos.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] *(índice del módulo)*
- Próxima sesión: diseño con **AWS Control Tower**, **IAM Identity Center** y **CI/CD**
