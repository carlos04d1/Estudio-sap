---
title: "Domain 3 Review: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)"
aliases:
  - "Domain 3 Review"
  - "Review D3"
  - "Notas vivas D3"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - notas-vivas
  - dominio-3
status: vivo
fuente: "Resúmenes de video/sesión de AWS Skill Builder — Dominio 3 (mejora continua), español LATAM"
---

# Domain 3 Review: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)

> [!abstract] Qué es este archivo
> Documento **único y acumulativo** del **Dominio 3 — Mejora continua para las soluciones existentes (25 %)**.
> Cada sesión de Skill Builder se integra acá y se **reorganiza para que el conocimiento se acumule**,
> no para reemplazarse.
>
> Es el punto de entrada del dominio: si algo se vio en una sesión y es relevante para el examen,
> **tiene que estar acá**. Las notas por tarea (`03 - Dominio 3 - Mejora Continua`) y
> [[Definicion servicios]] son el detalle de referencia; este archivo es el hilo conductor.

> [!warning] Reglas de actualización (compromiso del agente)
> 1. **Nada se borra.** Si un resumen nuevo corrige o amplía algo, se **reescribe la línea** y se anota el cambio en [[#🕒 Registro de cambios]]. Lo reemplazado queda registrado, no desaparece.
> 2. **Todo dato se conserva.** Cifras, límites, cuotas, nombres exactos de servicios, puertos, tiempos de retención y "reglas de dedo" se transcriben **literalmente**; no se redondean ni se parafrasean.
> 3. **Cada afirmación tiene origen.** Toda fila o bullet se marca con la sesión de la que sale (`S01`, `S02`…). Si no lo dijo la sesión, no se inventa: va a [[#❓ Dudas abiertas]].
> 4. **Se consolida, no se duplica.** Antes de agregar, se busca si el concepto ya existe y se **fusiona** en la sección que corresponde.
> 5. **Los nombres de servicios van en inglés** (`AWS Config`), con la explicación en español.
> 6. **Siempre se cierra el ciclo**: mapa de progreso + índice + registro de cambios actualizados en la misma edición.

> [!question] Cómo se responden las dudas
> Cuando digas **"tengo una duda"** (o similar), la respuesta va **acá mismo**, no en el chat: primero
> **1–3 líneas de respuesta directa**, después el detalle justo. La duda entra en [[#❓ Dudas abiertas]]
> y se cierra en el mismo movimiento, así queda el registro de *qué* se dudó y *cómo* se resolvió.
>
> Formato: **Duda** → **Respuesta corta** → **En el examen** → **Estado** ✅.
> Si la duda no se puede cerrar con lo que hay en las sesiones, queda ⏳ abierta y se resuelve cuando
> aparezca la sesión que la cubra.

> [!tip] Cómo pedirme una sesión
> Pegame el resumen del video (o la transcripción) y decime el número/título de la sesión.
> Yo devuelvo: sección `Sxx` nueva + filas integradas en las secciones transversales + changelog.
> Si el resumen es ambiguo o contradice algo ya anotado, te lo marco **antes** de escribir.

> [!info] Relación con el Dominio 2
> El D2 diseña **soluciones nuevas**; el D3 **mejora las existentes**. Muchos servicios se repiten, pero el
> verbo cambia: acá se pregunta **qué revisar, qué medir y qué mejorar**, no qué construir.
> Ver [[Domain 2 Review]].

---

## 📌 Mapa de progreso

| ID | Sesión / video | Tema | Dominio | Estado | Sección |
| --- | --- | --- | --- | --- | --- |
| S01 | Introducción al Dominio 3 (presentación del módulo) | Panorama de las 5 tareas del D3 | D3 | 🟡 resumen cargado | [[#S01 — Dominio 3: panorama general (presentación del módulo)]] |
| S02 | Tarea 3.1 — Excelencia operativa | SSM, Config, OpsWorks, CloudWatch, estrategias de despliegue, CI/CD | D3 | 🟡 resumen cargado | [[#S02 — Tarea 3.1: estrategia para mejorar la excelencia operativa general]] |
| S03 | Tarea 3.2 — Seguridad | Security Hub, Access Analyzer, CloudTrail, Config, EventBridge, ACM/SNI, Secrets Manager, Backup | D3 | 🟡 resumen cargado | [[#S03 — Tarea 3.2: estrategia para mejorar la seguridad]] |
| S04 | Tarea 3.3 — Rendimiento | KPI, X-Ray, EKS, Auto Scaling, flotas, placement groups, Global Accelerator, CloudFront | D3 | 🟡 resumen cargado | [[#S04 — Tarea 3.3: estrategia para mejorar el rendimiento]] |
| S05 | Tarea 3.4 — Fiabilidad | DMS, DataSync, ELB + Auto Scaling, Beanstalk, Service Quotas, Route 53, CloudFront failover, DRS | D3 | 🟡 resumen cargado | [[#S05 — Tarea 3.4: estrategia para mejorar la fiabilidad]] |
| S06 | Tarea 3.5 — Costos | Etiquetado, Cost Explorer, CUR + Glue/Athena, CloudFront/Origin Shield, PrivateLink, Auto Scaling, Budgets y alarmas | D3 | 🟡 resumen cargado | [[#S06 — Tarea 3.5: identificar oportunidades de optimización de costos]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 🗂️ Índice de sesiones

- [[S01 — Dominio 3: panorama general (presentación del módulo)|S01 — Dominio 3: panorama general]]
- [[S02 — Tarea 3.1: estrategia para mejorar la excelencia operativa general|S02 — Tarea 3.1: excelencia operativa]]
- [[S03 — Tarea 3.2: estrategia para mejorar la seguridad|S03 — Tarea 3.2: seguridad]]
- [[S04 — Tarea 3.3: estrategia para mejorar el rendimiento|S04 — Tarea 3.3: rendimiento]]
- [[S05 — Tarea 3.4: estrategia para mejorar la fiabilidad|S05 — Tarea 3.4: fiabilidad]]
- [[S06 — Tarea 3.5: identificar oportunidades de optimización de costos|S06 — Tarea 3.5: costos]]

---

## S01 — Dominio 3: panorama general (presentación del módulo)

> [!info] Ficha
> - **Fuente:** video introductorio del módulo · **Dominio:** D3 — Mejora continua de soluciones existentes (25 %)
> - **Tareas cubiertas:** 3.1 a 3.5 (solo el mapa, todavía sin desarrollo técnico)
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> El Dominio 3 se estudia en **5 videos, uno por enunciado de tarea**, y cierra con **3 preguntas de ejemplo explicadas en detalle**.

### Qué evalúa el dominio
- La capacidad de **supervisar y evaluar datos de cargas de trabajo** para **mejorar infraestructuras existentes** e **implementar automatización**. *(S01)*
- El módulo incluye **5 videos**, que abarcan los **5 enunciados de tarea** del Dominio 3. *(S01)*
- Al final: **3 lecciones con explicaciones detalladas** de preguntas del Dominio 3. *(S01)*

### Mapa de las 5 tareas

| Tarea | Tema | Qué evalúa / qué se profundiza |
| --- | --- | --- |
| **3.1** | Estrategia para mejorar la **excelencia operativa** | **Supervisar los datos de la carga de trabajo** para obtener información de las operaciones y **recomendar mejoras**; **estrategias de supervisión y registro**; **corrección automática**; **planificación de recuperación ante desastres** |
| **3.2** | Estrategia para mejorar la **seguridad** | Mejorar la seguridad **en cada capa** de la carga de trabajo: **auditorías de seguridad** del entorno, **procesos de respaldo** y **automatización de la corrección de seguridad** |
| **3.3** | Estrategia para mejorar el **rendimiento** | Mantener la **eficiencia mientras cambia la demanda y evoluciona la tecnología**: identificar y revisar el **bloqueo del rendimiento** (*bottleneck*) y **adoptar nuevas tecnologías y servicios administrados** |
| **3.4** | Estrategia para mejorar la **fiabilidad** | **Alta disponibilidad y resiliencia**; **métodos de replicación de datos**; **métodos y herramientas de recuperación ante desastres** |
| **3.5** | **Identificar oportunidades de optimización de costos** | **Administración de costos, alertas e informes**: costos de **transferencia de datos y redes**, **alarmas de facturación** y **análisis de informes de uso** |

> [!important] El cambio de verbo respecto del Dominio 2
> En el **D2** la pregunta es *"¿cómo lo construyo?"*. En el **D3** es *"¿qué mido, qué está fallando y qué mejoro?"*.
> Por eso acá dominan **monitoreo, registro, auditoría, corrección automática y análisis de uso**, no el diseño desde cero.

### Indicación del instructor
- Ir anotando **todo conocimiento que se note faltante** mientras se miran las lecciones, para planificar el estudio posterior. *(S01)*

### Pendiente de esta sesión
- [x] Contenido de los 5 videos (3.1 → 3.5) — cerrado: S02 (3.1), S03 (3.2), S04 (3.3), S05 (3.4), S06 (3.5)
- [ ] Las 3 preguntas de ejemplo explicadas en detalle

### Enlaces
- Guía oficial del Dominio 3 → [[Guia AWS]]
- Distinciones de servicios → [[Definicion servicios]]
- Notas por tarea → carpeta `03 - Dominio 3 - Mejora Continua`

---

## S02 — Tarea 3.1: estrategia para mejorar la excelencia operativa general

> [!info] Ficha
> - **Fuente:** video de la tarea 3.1 · **Dominio:** D3 (25 %) · **Tarea:** 3.1
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Excelencia operativa = **medir la carga, automatizar la configuración y corregir solo**: Systems Manager, Config, OpsWorks, CloudWatch y CI/CD puestos al servicio de **mejorar lo que ya corre**.

### Base
- La tarea incluye **supervisar los datos de la carga de trabajo** para **recomendar mejoras** de eficiencia operativa e **identificar oportunidades de automatización**. *(S02)*
- Revisar el **pilar de excelencia operativa** de AWS Well-Architected, en el área de enfoque **Evolución**. *(S02)*
- El examen evalúa **recomendar la solución AWS adecuada para automatizar la administración de la configuración**. *(S02)*

### Automatización de la configuración

| Servicio | Para qué lo usa el examen |
| --- | --- |
| **AWS Systems Manager** | Automatizar funciones comunes: **recopilar inventario de software**, **aplicar parches del SO** y **configurar instancias EC2** |
| **AWS Config** | **Analizar, auditar y evaluar** configuraciones y **relaciones entre recursos** de forma **continua** |
| **AWS OpsWorks** | Configurar y actualizar aplicaciones con **Puppet o Chef** para aplicar las configuraciones de infraestructura deseadas |

- La automatización clave: **runbooks de Systems Manager** (manuales de procedimientos) para **corregir recursos no conformes** detectados por las **reglas de AWS Config**. *(S02)*

> [!example] Caso del video: Windows Server con RDP y parches
> Aplicación **Windows Server** en **subred pública**, y los ingenieros usan instancias **EC2 en subred privada** para entrar por **RDP** a solucionar problemas.
> El servidor debe tener **las últimas actualizaciones del SO** y estar **accesible en todo momento**. Hay que **refactorizar** y **garantizar la administración de parches**.
>
> Opciones que plantea el video: lanzar **nueva AMI + Systems Manager Patch Manager** · **Amazon Lightsail** · **AWS AppSync + Patch Manager** · **Amazon WorkSpaces + WorkSpaces Application Manager**.
>
> ⚠️ **La transcripción dice que se usaría WorkSpaces + WorkSpaces Application Manager**, pero eso **no cierra**: WorkSpaces es un servicio de **escritorios virtuales administrados**, no una forma de alojar esta aplicación, y el resto del video insiste en **AMI + Patch Manager**. Queda como [[#❓ Dudas abiertas|duda #1]] hasta verificarlo con la explicación oficial.

### Supervisión y registro
- **Amazon CloudWatch**: **recopilar métricas**, hacerles **seguimiento**, **establecer alarmas** y **reaccionar automáticamente** a cambios en los recursos de AWS. *(S02)*
- Determinar la **estrategia de registro y supervisión más adecuada** es parte de lo que evalúa el examen. *(S02)*

### Situaciones de error y recuperación
- Hay que entender las **acciones de recuperación**, **interpretar el resultado de un error** e identificar formas de **mejorar la detección y la corrección automatizada**. *(S02)*

> [!example] Caso del video: el failover que "funcionó" pero rompió todo
> Aplicación web en **AZ1**, diseñada para conmutar automáticamente a **AZ2** ante una interrupción de AZ1.
> Se simula la caída: la carga **conmuta a AZ2** y **parece funcionar según los estándares de monitoreo actuales**.
> Pero al probar la **experiencia del usuario final**, la aplicación **ya no es accesible desde internet**: **la conmutación por error de DNS no funcionó** como se esperaba.
>
> Lección: **el monitoreo puede dar verde mientras el usuario ve un error**. Las mejoras pasan por **automatizar el failover de DNS** o **mejorar los estándares de monitoreo** (medir desde el punto de vista del cliente, no solo del recurso).
>
> *(La transcripción dice "conmutar a AZ1 si se detecta una interrupción en AZ1"; por coherencia con el resto del caso, la conmutación es **a AZ2**.)*

### Estrategias de despliegue

> El video exige conocer **cinco** y **cuándo usar cada una**. Los nombres son los que da; las definiciones son las estándar de AWS.

| Estrategia | En qué consiste |
| --- | --- |
| **En el mismo lugar** (*in-place*) | Se actualiza la instancia/servidor existente |
| **Lineal** (*linear*) | La nueva versión avanza por lotes, desplazando a la anterior en proporciones |
| **Azul o verde** (*blue/green*) | Dos entornos completos: se cambia el tráfico del azul al verde |
| **Canary** | Un porcentaje pequeño de tráfico va a la versión nueva y se amplía si responde bien |
| **Todo a la vez** (*all-at-once*) | Se reemplaza todo el conjunto de una vez |

### CI/CD
- **Integración continua (CI)** y **entrega continua (CD)** automatizan la implementación de **aplicaciones e infraestructura**. *(S02)*
- **AWS CodePipeline** automatiza los procesos de **compilación, prueba y lanzamiento**. *(S02)*
- **AWS CodeCommit** entra a la canalización como **repositorio fuente**. *(S02)*
- **AWS CodeBuild** **construye la aplicación** e **inicia las pruebas automatizadas**. *(S02)*
- Terminadas las pruebas, CodePipeline usa **AWS CodeDeploy** para desplegar la aplicación actualizada. *(S02)*
- **Pilas de CodePipeline + CloudFormation** para **actualizar infraestructura**. *(S02)*
- CodePipeline tiene **integración incorporada con CloudFormation**: se pueden especificar acciones de **crear, actualizar o eliminar una pila** dentro de la canalización. *(S02)*

### Cómo se resuelve en el examen
- Piden **automatizar la configuración y el cumplimiento** → **AWS Config + runbooks de Systems Manager**. *(S02)*
- Piden **inventario, parches o configuración de instancias** → **Systems Manager**. *(S02)*
- Piden **Puppet o Chef** → **AWS OpsWorks**. *(S02)*
- Piden **métricas, alarmas y reacción automática** → **CloudWatch**. *(S02)*
- Piden **implementar de forma gradual y poder abortar** → **canary** (o lineal); **cambiar de entorno completo** → **blue/green**; **reemplazo total** → **all-at-once**. *(S02)*
- Piden **canalización con acciones sobre pilas** → **CodePipeline + CloudFormation** (crear/actualizar/eliminar). *(S02)*
- **"El monitoreo dice OK pero el usuario no llega"** → revisar **DNS failover** y **monitorear la experiencia del cliente**. *(S02)*

### Trampas y errores comunes
- ❌ Usar **Config** para aplicar el cambio. → ✅ **Config evalúa**; el cambio lo ejecuta el **runbook de Systems Manager**.
- ❌ Elegir **OpsWorks** cuando no hay Puppet/Chef de por medio. → ✅ eso es **Systems Manager**.
- ❌ Confiar en que "la alarma no se disparó" equivale a "el servicio funciona". → ✅ el caso del DNS lo desmiente. *(S02)*
- ❌ Confundir **canary** con **blue/green**: canary es **porcentaje de tráfico**; blue/green es **dos entornos completos**. *(S02)*
- ❌ Usar **CodeDeploy** como si orquestara la canalización. → ✅ orquesta **CodePipeline**; CodeDeploy **despliega**. *(S02)*

### Preguntas de repaso
1. ¿Qué servicio evalúa continuamente la configuración y las relaciones entre recursos?
   <details><summary>Respuesta</summary>AWS Config.</details>
2. ¿Qué ejecuta la corrección de un recurso no conforme detectado por una regla de Config?
   <details><summary>Respuesta</summary>Un runbook (manual de procedimientos) de automatización de Systems Manager.</details>
3. ¿Qué tres funciones comunes de Systems Manager menciona el video?
   <details><summary>Respuesta</summary>Inventario de software, aplicación de parches del SO y configuración de instancias EC2.</details>
4. ¿Qué enseñó el caso del failover entre AZs?
   <details><summary>Respuesta</summary>Que el monitoreo puede indicar éxito mientras el usuario no accede: el DNS no conmutó, así que hay que automatizar el failover de DNS y monitorear desde el cliente.</details>
5. Nombrá las cinco estrategias de despliegue.
   <details><summary>Respuesta</summary>En el mismo lugar, lineal, azul/verde, canary y todo a la vez.</details>

### Dudas resueltas en esta sesión
- Ninguna. Se **abre** la duda #1 (respuesta del caso WorkSpaces).

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 3: panorama general (presentación del módulo)]]
- Nota de tarea → `03 - Dominio 3 - Mejora Continua/3.1 Estrategia para mejorar la excelencia operativa general.md`
- Servicios → [[Definicion servicios]]

---

## S03 — Tarea 3.2: estrategia para mejorar la seguridad

> [!info] Ficha
> - **Fuente:** video de la tarea 3.2 · **Dominio:** D3 (25 %) · **Tarea:** 3.2
> - **Estado:** 🟡 resumen cargado
> - **Nota de numeración:** se envió como "tercer enunciado — rendimiento", pero el contenido y el cierre del video corresponden a **3.2 (seguridad)**. La tarea **3.3 (rendimiento) sigue pendiente**.

### Resumen en una frase
> Seguridad en D3 = **revisar cada capa, priorizar hallazgos y automatizar la corrección**: Security Hub agrega, Access Analyzer audita permisos, CloudTrail traza, Config evalúa y EventBridge dispara el remedio.

### Base
- Supervisar cargas de trabajo para **identificar vulnerabilidades**, **planificar mejoras** e **implementar corrección automática**. *(S03)*
- Pilar de seguridad de AWS Well-Architected, en sus cinco áreas: **administración de identidad y acceso**, **detección**, **protección de infraestructura**, **protección de datos** y **respuesta ante incidentes**. *(S03)*
- Se evalúa **revisar soluciones implementadas para garantizar seguridad en cada capa**. *(S03)*

### Visión integral: AWS Security Hub
- Da una **visión integral del estado de seguridad** de un entorno de AWS. *(S03)*
- **Consume, agrega, organiza y prioriza los hallazgos** de los servicios habilitados. *(S03)*
- Fuentes que menciona el video: **Amazon GuardDuty**, **Amazon Inspector** y **Amazon Macie**. *(S03)*
- Hay que **interpretar esos hallazgos** para identificar oportunidades de mejorar la **postura de seguridad**. *(S03)*

> [!note] Para qué sirve cada fuente (estándar de AWS; el video solo las nombra)
> GuardDuty → actividad maliciosa y comportamiento anómalo. Inspector → vulnerabilidades en cargas. Macie → datos sensibles en S3.
> Security Hub **no reemplaza** a ninguno: los **agrega y prioriza**.

### Identidad y acceso
- Comprender el **principio de mínimo privilegio**: **leer, escribir y aplicar políticas** que otorguen **solo los permisos necesarios** para la tarea. *(S03)*
- **Auditar el entorno** para lograr acceso con privilegios mínimos. *(S03)*
- **IAM Access Analyzer**: **valida políticas** según las **mejores prácticas** de AWS. *(S03)*
- Interpretar sus hallazgos, que incluyen **advertencias, errores y recomendaciones de políticas**. *(S03)*
- **Informe de credenciales de IAM**: evaluar el estado de **contraseñas**, **claves de acceso** y **dispositivos de autenticación multifactor (MFA)**. *(S03)*

### Trazabilidad
- Saber **qué servicios de AWS** permiten **seguir acciones y cambios** en una carga de trabajo. *(S03)*
- **AWS CloudTrail**: analizar las **acciones realizadas por un usuario, rol o servicio**. *(S03)*
- Integrar el seguimiento con **CloudWatch Logs** para recibir **alertas procesables**. *(S03)*
- **Reglas de AWS Config**: evaluar configuraciones de recursos, **interpretar los resultados** y **mejorar con medidas correctivas**. *(S03)*

### Respuesta automatizada ante vulnerabilidades
- **Reglas de Amazon EventBridge** para **responder a eventos de seguridad** e **iniciar la corrección automática**. *(S03)*
- **Paquetes de conformidad de AWS Config** (*conformance packs*): **colección de reglas de configuración + acciones de corrección**. Sirven para **detectar cambios** en una carga de trabajo y **dirigir la información al flujo de corrección correcto**. *(S03)*
- Ese flujo puede incluir: **funciones Lambda del cliente**, el **kit de desarrollo de reglas de Config** o una **biblioteca de reglas de configuración de código abierto**. *(S03)*

### Secretos, credenciales y certificados
- **AWS Certificate Manager (ACM)**: aprovisionar y administrar certificados; también se pueden usar **certificados propios**. *(S03)*
- **SNI en el ALB**: se pueden vincular **múltiples certificados al mismo listener seguro**; el balanceador **elige automáticamente el certificado TLS óptimo para cada cliente**, lo que permite **varios dominios sobre la misma dirección IP**. *(S03)*
- **AWS Secrets Manager**: **administrar, recuperar y rotar automáticamente** credenciales de base de datos, claves de API y otros secretos **a lo largo de su ciclo de vida**. *(S03)*

### Parches y actualizaciones
- **Patch Manager**: **programar, aprobar o rechazar** parches para mantener actualizada la seguridad de los recursos. *(S03)*
- **AWS OpsWorks**: administrar automáticamente la aplicación de parches en entornos **Chef o Puppet**. *(S03)*

### Respaldos
- Hay que poder responder sobre una **solución de respaldo existente frente a un cambio de requisitos**: nuevas **regulaciones gubernamentales** o un cambio en la **política de retención** de la organización. *(S03)*
- **Clasificar los datos** para determinar los **controles de protección y retención** adecuados. *(S03)*
- **Automatizar los respaldos con planes de respaldo de AWS Backup** e **identificar el plan correcto** según los requisitos. *(S03)*

### Cómo se resuelve en el examen
- Piden **estado de seguridad consolidado y priorizado** → **Security Hub**. *(S03)*
- Piden **validar políticas y permisos** → **IAM Access Analyzer** (+ informe de credenciales para el estado de credenciales). *(S03)*
- Piden **quién hizo qué** → **CloudTrail**; y para **alertas** → **CloudWatch Logs**. *(S03)*
- Piden **corrección automática de un hallazgo** → **regla de EventBridge** (o **paquete de conformidad** de Config con acción de corrección). *(S03)*
- Piden **varios dominios en un ALB** → **SNI** con múltiples certificados en el mismo listener. *(S03)*
- Piden **rotación automática de credenciales** → **Secrets Manager**. *(S03)*
- Piden **aprobar o rechazar parches** → **Patch Manager**; en **Chef/Puppet** → **OpsWorks**. *(S03)*
- Cambian los **requisitos de retención** → revisar el **plan de AWS Backup** y la **clasificación de datos**. *(S03)*

### Trampas y errores comunes
- ❌ Usar **Security Hub** como si detectara las amenazas. → ✅ **agrega y prioriza** hallazgos de GuardDuty/Inspector/Macie.
- ❌ Auditar permisos mirando **CloudTrail**. → ✅ CloudTrail dice **qué pasó**; los permisos se validan con **Access Analyzer** y el **informe de credenciales**.
- ❌ Creer que **CloudWatch Logs** reemplaza a CloudTrail. → ✅ CloudTrail **registra la API**; CloudWatch Logs **procesa y alerta**.
- ❌ Enlazar un certificado por dominio con una IP distinta. → ✅ **SNI** permite varios dominios en el **mismo listener**.
- ❌ Resolver la rotación con un script propio. → ✅ **Secrets Manager**.
- ❌ Cambiar la retención "a mano" en cada recurso. → ✅ **plan de AWS Backup** alineado a la clasificación de datos. *(S03)*

### Preguntas de repaso
1. ¿Qué tres fuentes de hallazgos menciona el video para Security Hub?
   <details><summary>Respuesta</summary>GuardDuty, Inspector y Macie.</details>
2. ¿Qué valida IAM Access Analyzer y qué tipos de hallazgo da?
   <details><summary>Respuesta</summary>Valida políticas contra las buenas prácticas de AWS; sus hallazgos incluyen advertencias, errores y recomendaciones de políticas.</details>
3. ¿Qué permite SNI en un ALB?
   <details><summary>Respuesta</summary>Varios certificados en el mismo listener seguro, con el certificado TLS óptimo elegido por cliente, habilitando varios dominios sobre la misma IP.</details>
4. ¿Qué es un paquete de conformidad de Config?
   <details><summary>Respuesta</summary>Una colección de reglas de configuración y acciones de corrección para detectar cambios y dirigirlos al flujo de corrección correcto.</details>
5. ¿Qué se revisa cuando cambia la política de retención?
   <details><summary>Respuesta</summary>La clasificación de datos y el plan de respaldo de AWS Backup que corresponda a los nuevos requisitos.</details>

### Dudas resueltas en esta sesión
- Ninguna.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 3: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S02 — Tarea 3.1: estrategia para mejorar la excelencia operativa general]]
- Nota de tarea → `03 - Dominio 3 - Mejora Continua/3.2 Estrategia para mejorar la seguridad.md`
- Refuerzo de seguridad del D2 → [[Domain 2 Review#S04 — Tarea 2.3: determinar controles de seguridad basados en los requisitos]]
- Servicios → [[Definicion servicios]]

---

## S04 — Tarea 3.3: estrategia para mejorar el rendimiento

> [!info] Ficha
> - **Fuente:** video de la tarea 3.3 · **Dominio:** D3 (25 %) · **Tarea:** 3.3
> - **Estado:** 🟡 resumen cargado
> - **Nota:** con esta sesión queda cubierta la tarea que había quedado pendiente por el cruce de numeración en S03.

### Resumen en una frase
> Rendimiento en D3 = **traducir requisitos a KPI, medir, encontrar el cuello de botella y corregir automáticamente**, apoyándose en servicios administrados y en el edge.

### Base
- Pilar de **eficiencia del rendimiento** de AWS Well-Architected, en las áreas de enfoque de **selección, revisión y monitoreo**. *(S04)*
- **Traducir los requisitos de la empresa en métricas medibles**. *(S04)*
- **Identificar los requisitos del cliente** y **establecer los KPI** (indicadores clave de rendimiento). *(S04)*
- Con los KPI definidos: saber **cuándo las métricas están fuera de los límites esperados** y configurar un **sistema de monitoreo con alarmas** que **inicien automáticamente los pasos de corrección**. *(S04)*

### Encontrar el cuello de botella
- Identificar las **limitaciones de rendimiento** que afectan la **eficiencia general** de la carga de trabajo. *(S04)*
- Cadena de servicios del video: **CloudWatch** + **Amazon EventBridge** + **Amazon SNS** para detectar y avisar, y **AWS Lambda** para tomar **medidas correctivas**. *(S04)*
- **AWS X-Ray**: analizar y **depurar aplicaciones distribuidas** e **identificar limitaciones de rendimiento**. *(S04)*
- Usar **métricas y monitoreo** para detectar **desempeño deficiente** y aplicar mejoras. *(S04)*

### Probar el diseño sin fundir el presupuesto
- **Probar la carga de trabajo para descubrir limitaciones**. *(S04)*
- Usar **instancias Spot** para **disminuir los costos de la prueba**. *(S04)*
- **Implementar caché** para mejorar rendimiento, pero **con un diseño para actualizar e invalidar** los datos cacheados. *(S04)*

> [!important] La idea que ordena toda la tarea
> **Enfoque basado en datos:** la arquitectura evoluciona por lo que muestran las métricas, no por intuición.
> Y siempre entendiendo **cómo los trade-offs afectan el entorno**. *(S04)*

### Adoptar servicios administrados
- Identificar componentes que se pueden **reemplazar por servicios administrados** para **reducir gastos operativos** y **costos transaccionales**. *(S04)*
- Ejemplo del video: **Amazon EKS** para correr el clúster de Kubernetes **sin la sobrecarga operativa** de instalar, operar y mantener **nodos y planos de control**. *(S04)*

### Arquitecturas de alto rendimiento

| Pieza | Para qué |
| --- | --- |
| **AWS Auto Scaling** | Ajustar **automáticamente** la capacidad y mantener un rendimiento **constante y predecible** |
| **EC2 Fleet** | Lanzar y gestionar una flota de instancias |
| **Spot Fleet** | Flota basada en **instancias Spot** |
| **Grupos de ubicación** (*placement groups*) | Cumplir necesidades específicas de la carga de trabajo |

- Hay que saber **ajustar la configuración de la flota** para cumplir objetivos de **rendimiento o de costos**. *(S04)*
- Grupos de ubicación: conocer las diferencias entre **clúster**, **partición** (*partition*) y **distribución** (*spread*), y cómo afectan **rendimiento y fiabilidad**. *(S04)*

> [!note] Qué prioriza cada tipo (definición estándar de AWS; el video solo las nombra)
> **Cluster** → latencia mínima y throughput alto (riesgo compartido). **Partition** → aislamiento entre grupos de instancias.
> **Spread** → máxima disponibilidad, instancias en hardware distinto.

### Redes perimetrales globales
- Usar los **servicios globales de redes perimetrales de AWS** para acercar **conectividad fiable y de baja latencia** a los usuarios finales. *(S04)*
- **AWS Global Accelerator**: saber **cuándo usarlo**, la diferencia entre un **acelerador de enrutamiento estándar** y uno **personalizado** (*custom routing*), y **cómo configurar ambos**. *(S04)*
- **CloudFront**: saber cuándo usarlo y cómo **configurar el comportamiento de caché** de la distribución para el resultado buscado. *(S04)*

> [!tip] Cómo mejorar la tasa de aciertos en caché de CloudFront
> Configurar el **origen** para agregar una directiva **`Cache-Control: max-age`** a los objetos y especificar
> **el valor práctico más largo para `max-age`**. *(S04)*

### Cómo se resuelve en el examen
- Piden **métricas alineadas al negocio** → definir **KPI** primero, después las alarmas. *(S04)*
- Piden **reacción automática a una métrica fuera de rango** → **CloudWatch → EventBridge → Lambda** (y SNS para avisar). *(S04)*
- Piden **encontrar dónde se degrada una app distribuida** → **X-Ray**. *(S04)*
- Piden **probar a bajo costo** → **instancias Spot**. *(S04)*
- Piden **caché sin datos viejos** → caché **con invalidación** definida. *(S04)*
- Piden **reducir sobrecarga de Kubernetes** → **EKS**. *(S04)*
- Piden **capacidad elástica predecible** → **AWS Auto Scaling**. *(S04)*
- Piden **máximo throughput entre instancias** → **placement group de clúster**. *(S04)*
- Piden **acelerar tráfico global con IP fija** → **Global Accelerator** (estándar o *custom routing*). *(S04)*
- Piden **subir el hit ratio de CloudFront** → **`max-age` largo en el origen**. *(S04)*

### Trampas y errores comunes
- ❌ Mejorar el rendimiento **sin KPI**. → ✅ sin métrica no hay mejora demostrable.
- ❌ Usar **CloudWatch** para rastrear una transacción entre microservicios. → ✅ **X-Ray**.
- ❌ Cachear sin estrategia de **invalidación**. → ✅ datos viejos y bugs difíciles.
- ❌ Asumir que **Spot Fleet** es lo mismo que **EC2 Fleet**. → ✅ la primera es específica de Spot.
- ❌ Elegir **spread** cuando se busca mínima latencia. → ✅ eso es **cluster**.
- ❌ Bajar el TTL para "tener todo fresco" y esperar más hits. → ✅ pasa lo contrario: **más `max-age`, más hits**. *(S04)*

### Preguntas de repaso
1. ¿Cuál es el primer paso antes de configurar alarmas?
   <details><summary>Respuesta</summary>Traducir los requisitos del cliente a métricas medibles y definir los KPI.</details>
2. ¿Qué servicio analiza aplicaciones distribuidas para encontrar el cuello de botella?
   <details><summary>Respuesta</summary>AWS X-Ray.</details>
3. ¿Qué diferencia hay entre EC2 Fleet y Spot Fleet?
   <details><summary>Respuesta</summary>EC2 Fleet gestiona una flota de instancias; Spot Fleet es la variante basada en instancias Spot.</details>
4. ¿Para qué sirve cada grupo de ubicación?
   <details><summary>Respuesta</summary>Cluster para latencia/throughput, partition para aislamiento entre grupos y spread para máxima disponibilidad.</details>
5. ¿Cómo se mejora la tasa de aciertos de CloudFront?
   <details><summary>Respuesta</summary>Con una directiva Cache-Control max-age en el origen y el valor práctico más largo para max-age.</details>

### Dudas resueltas en esta sesión
- Se cierra el cruce de numeración: esta es la **3.3**, y la seguridad quedó en **S03 / 3.2**.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 3: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S03 — Tarea 3.2: estrategia para mejorar la seguridad]]
- Contraste con el diseño de rendimiento del D2 → [[Domain 2 Review#S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento]]
- Nota de tarea → `03 - Dominio 3 - Mejora Continua/3.3 Estrategia para mejorar el rendimiento.md`
- Servicios → [[Definicion servicios]]

---

## S05 — Tarea 3.4: estrategia para mejorar la fiabilidad

> [!info] Ficha
> - **Fuente:** video de la tarea 3.4 · **Dominio:** D3 (25 %) · **Tarea:** 3.4
> - **Estado:** 🟡 resumen cargado
> - **Nota de numeración:** se envió como "cuarto enunciado — rendimiento", pero el contenido y el cierre del video son de **3.4 (fiabilidad)**: *"esto concluye el enunciado de la tarea 4, determinar una estrategia para mejorar la fiabilidad"*.

### Resumen en una frase
> Fiabilidad en D3 = **quitar puntos únicos de error**: replicar datos, escalar y autorreparar, conmutar por DNS u origen, y ensayar la recuperación con AWS DRS.

### Base
- Pilar de **fiabilidad** de AWS Well-Architected, en sus cuatro áreas: **fundamentos**, **arquitectura de la carga de trabajo**, **administración de cambios** y **administración de errores**. *(S05)*
- Se evalúa habilitar **replicación de datos**, **autorreparación** y **características y servicios elásticos**. *(S05)*

### Replicación de datos

| Servicio | Para qué | Detalle que pide el video |
| --- | --- | --- |
| **AWS Database Migration Service (DMS)** | Replicar **cambios continuos entre bases de datos** | Mantener **sincronizadas** las bases **de origen y de destino** |
| **AWS DataSync** | **Automatizar y acelerar** el movimiento de **grandes conjuntos de datos activos** | — |
| **DataSync Discovery** | **Informes detallados** de los recursos del sistema de almacenamiento | Incluye **utilización**, **capacidad** e **información de configuración** |

### Autorreparación y elasticidad
- **Elastic Load Balancing + AWS Auto Scaling** para crear una **infraestructura de recuperación automática** en **todas las zonas de disponibilidad y regiones**. *(S05)*
- Conocer las **opciones y políticas de escalamiento** y **cuándo usar cada una o combinarlas**. *(S05)*
- **AWS Elastic Beanstalk**: **aprovisionar la infraestructura mediante programación**, **eliminar errores humanos** y **garantizar que se esté ejecutando la configuración más actualizada**. *(S05)*

### Leer las métricas de crecimiento
- Interpretar **métricas** para identificar **crecimiento de las aplicaciones** y **tendencias de uso**, y así **ajustar las cargas de trabajo**. *(S05)*
- Ejemplo textual del video: **aumentar la capacidad mínima del grupo de EC2 Auto Scaling de 2 a 4 instancias** en respuesta a un **aumento del 45 %** en el uso de la carga. *(S05)*

> [!important] Caso del pico que el escalado no alcanza (muy probable en el examen)
> - Aplicación con cómputo de **Auto Scaling en dos zonas de disponibilidad**.
> - Requisito: **CPU ≤ 75 %** para rendimiento aceptable.
> - Configuración actual: **escala horizontal al 70 %** para evitar la sobrecarga.
> - Dato de CloudWatch: **picos aleatorios de hasta 10 %** de tráfico durante la semana; el escalado **sí ocurre**, pero **no entrega capacidad lo bastante rápido** y la CPU **supera el 75 %**.
> - Conclusión que se espera: **aprovisionar en exceso** el nivel adecuado de recursos para **absorber los picos** y **compensar la latencia del escalado automático**. *(S05)*

### Service Quotas
- Las **cuotas** pueden **limitar el crecimiento** de la carga de trabajo. *(S05)*
- **Evitan aprovisionar accidentalmente más recursos de los necesarios**. *(S05)*
- También **limitan las tasas de solicitudes en las operaciones de API** para **proteger los servicios de abusos**. *(S05)*
- Se pueden **buscar los valores de cuota** y **solicitar y hacer seguimiento de los aumentos** desde la **consola de Service Quotas** o a través del **SDK de AWS**. *(S05)*

### Análisis de la arquitectura existente
- Determinar **áreas que no son lo suficientemente fiables**. *(S05)*
- **Identificar puntos únicos de error** (*single points of failure*) y **recomendar pasos** para llegar a una solución. *(S05)*
- Interpretar métricas para ver cuándo un componente **superó o está en peligro de superar** los **umbrales predefinidos**. *(S05)*

### Enrutamiento y entrega
- **Amazon Route 53**: saber cómo **mejora la fiabilidad**, las **diferencias entre políticas de enrutamiento** y **cuándo usar una sobre otra**. *(S05)*
- **Health checks de Route 53** para **invocar la conmutación por error de DNS**. *(S05)*
- **CloudFront origin failover**: dirigir el tráfico a un **grupo de origen secundario** si falla el **grupo de origen principal**. *(S05)*
- **API Gateway** para **limitar las solicitudes a la API**. *(S05)*

### Recuperación ante desastres
- Evaluar la **configuración de las estrategias de DR** para identificar **oportunidades de mejorar la resistencia**. *(S05)*
- **AWS Elastic Disaster Recovery (DRS)**: replicar **servidores** en un **área de preparación** (*staging area*) en una **región preferida**, de manera **continua**. *(S05)*
- Saber hacer **conmutación por error** y **conmutación por recuperación** (*failover* / *failback*) **entre regiones o entre zonas de disponibilidad** en la **consola de AWS DRS**. *(S05)*
- **Ajustes de lanzamiento** (*launch settings*) de AWS DRS: configurarlos para cumplir los requisitos de cada situación. *(S05)*

### Cómo se resuelve en el examen
- Piden **mantener dos bases de datos sincronizadas** → **DMS** con replicación continua. *(S05)*
- Piden **mover TB de archivos activos** → **DataSync**. *(S05)*
- Piden **informe de capacidad y utilización del storage** → **DataSync Discovery**. *(S05)*
- Piden **autorreparación en varias AZ/regiones** → **ELB + Auto Scaling**. *(S05)*
- Piden **quitar errores humanos del aprovisionamiento** → **Elastic Beanstalk**. *(S05)*
- **El escalado no llega a tiempo en los picos** → **aprovisionamiento excesivo** (subir la capacidad mínima). *(S05)*
- **No crece aunque haya demanda** → revisar **Service Quotas** y pedir aumento (consola o SDK). *(S05)*
- Piden **encontrar el punto único de error** → analizar la arquitectura y **recomendar pasos**. *(S05)*
- Piden **failover por DNS** → **health checks de Route 53**. *(S05)*
- **Falla el origen de CloudFront** → **origin failover** al grupo secundario. *(S05)*
- Piden **proteger la API de abuso** → **throttling de API Gateway**. *(S05)*
- Piden **replicar servidores completos a otra región** → **AWS DRS** con *staging area*. *(S05)*

### Trampas y errores comunes
- ❌ Usar **DMS** para mover archivos o datasets. → ✅ DMS es **bases de datos**; para datos masivos, **DataSync**.
- ❌ Confundir **DataSync** con **DataSync Discovery**. → ✅ Discovery **solo informa** (utilización, capacidad, configuración).
- ❌ Creer que **Auto Scaling** absorbe cualquier pico. → ✅ si el pico es más rápido que el escalado, hay que **sobreaprovisionar**.
- ❌ Resolver un **origen caído** con Route 53. → ✅ **CloudFront origin failover**.
- ❌ Usar **AWS DRS** para migrar una base de datos. → ✅ DRS replica **servidores**; para BD, **DMS**.
- ❌ Ignorar las **cuotas** al planear crecimiento. → ✅ el techo de Service Quotas **bloquea el escalado**. *(S05)*

### Preguntas de repaso
1. ¿Cuándo se usa DMS en lugar de DataSync?
   <details><summary>Respuesta</summary>DMS cuando hay que replicar cambios continuos entre bases de datos y mantener origen y destino sincronizados; DataSync sirve para mover grandes conjuntos de datos activos.</details>
2. ¿Qué informa DataSync Discovery?
   <details><summary>Respuesta</summary>Informes detallados de los recursos del sistema de almacenamiento: utilización, capacidad e información de configuración.</details>
3. ¿Por qué el Auto Scaling del caso no evita superar el 75 % de CPU?
   <details><summary>Respuesta</summary>Porque el escalado ocurre pero no entrega capacidad lo bastante rápido; se necesita aprovisionamiento excesivo para absorber los picos y compensar la latencia del escalado.</details>
4. ¿Qué dos cosas logran las Service Quotas?
   <details><summary>Respuesta</summary>Evitar el aprovisionamiento accidental de más recursos y limitar las tasas de solicitudes de API para proteger los servicios de abusos.</details>
5. ¿Qué hace el origin failover de CloudFront?
   <details><summary>Respuesta</summary>Dirigir el tráfico a un grupo de origen secundario si falla el grupo de origen principal.</details>
6. ¿Qué replica AWS DRS y dónde?
   <details><summary>Respuesta</summary>Servidores, de forma continua, en un área de preparación en una región preferida; permite failover y failback entre regiones o zonas de disponibilidad.</details>

### Dudas resueltas en esta sesión
- Se cierra el cruce de numeración: esta es la **3.4**, y la 3.3 quedó en **S04**.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 3: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S04 — Tarea 3.3: estrategia para mejorar el rendimiento]]
- Contraste con el diseño de fiabilidad del D2 → [[Domain 2 Review#S05 — Tarea 2.4: diseñar una estrategia para cumplir los requisitos de fiabilidad]]
- Solapamiento con DR del D2 → [[Domain 2 Review#S03 — Tarea 2.2: solución para garantizar la continuidad de actividades]]
- Nota de tarea → `03 - Dominio 3 - Mejora Continua/3.4 Estrategia para mejorar la fiabilidad.md`
- Servicios → [[Definicion servicios]]

---

## S06 — Tarea 3.5: identificar oportunidades de optimización de costos

> [!info] Ficha
> - **Fuente:** video de la tarea 3.5 · **Dominio:** D3 (25 %) · **Tarea:** 3.5
> - **Estado:** 🟡 resumen cargado
> - **Cierre del módulo de tareas:** con esta sesión quedan cubiertos los 5 enunciados (3.1 → 3.5).

### Resumen en una frase
> Costos en D3 = **etiquetar para saber quién gasta, medir con Cost Explorer y CUR, y poner límites que actúen**: Budgets con acciones, alarmas que apagan y Auto Scaling que quita el exceso.

### Base
- Pilar de **optimización de costos** de AWS Well-Architected (el video lo llama "columna"), con sus áreas: **conocimiento de los gastos y del uso**, **recursos efectivos en costos**, **demanda de administración y recursos de suministro**, y **optimización del tiempo**. *(S06)*
- Las **configuraciones optimizadas en costos deben evolucionar** a medida que las cargas maduran, porque **la infraestructura siempre está cambiando**. *(S06)*
- Una **estrategia de supervisión eficaz** es esencial para **identificar oportunidades** y **mantener las cargas rentables**. *(S06)*

### Etiquetado y asignación de costos
- El examen evalúa el uso del **etiquetado** (*tagging*) para la **asignación de costos** y la **generación de informes**. *(S06)*
- Para **supervisar y aplicar las políticas de etiquetado**: **manuales de procedimientos (runbooks) de AWS Config** y **Systems Manager Automation**. *(S06)*

### Analizar el gasto

| Herramienta | Para qué | Detalle |
| --- | --- | --- |
| **AWS Cost Explorer** | Identificar **tendencias**, localizar los **controladores de costos** (*cost drivers*) y **detectar anomalías** | Vista de análisis |
| **Cost and Usage Report (CUR)** | **Uso diario o por hora** de **todos los servicios de AWS con cargo** | Reporte detallado |
| **AWS Glue + Amazon Athena** | **Análisis de datos más profundo** sobre el informe de costo y uso | Complemento del CUR |

- Analizar los **datos de supervisión** para identificar **recursos de alto costo** y saber **cuándo están subutilizados o sobreutilizados**. *(S06)*

### Bajar el costo de transferencia y de red
- **CloudFront** para **minimizar el costo de transferencia de datos a un servidor de origen**. *(S06)*
- Configurar el **almacenamiento en caché de CloudFront** para **equilibrar rendimiento y costo** según los objetivos del negocio. *(S06)*
- **CloudFront Origin Shield**: **capa de almacenamiento en caché adicional** para la infraestructura, que **reduce los costos operativos**. *(S06)*
- **AWS PrivateLink**: **enrutar el tráfico de forma privada** a través de los **puntos de enlace de interfaz de VPC** (*interface endpoints*) y **reducir el tráfico de salida a internet**. *(S06)*

### Quitar capacidad y apagar lo que no se usa
- Evaluar las **políticas de AWS Auto Scaling** para **eliminar automáticamente el exceso de capacidad** y **evitar gastos excesivos**. *(S06)*
- Incluye saber **cómo escalar distintos servicios**: **instancias EC2**, **tareas ECS** y **réplicas de Amazon Aurora**. *(S06)*
- **Alarmas de CloudWatch** para **detener o finalizar automáticamente** las instancias **cuando ya no estén en uso**. *(S06)*

### Poner límites que actúen

| Mecanismo | Qué hace |
| --- | --- |
| **Alarmas de facturación** de CloudWatch | Supervisan los **cargos estimados** de AWS y se activan cuando la **facturación excede ciertos umbrales**; se diseñan **según los patrones de uso esperados** |
| **AWS Budgets (alertas)** | Notifican cuando el **gasto real** *y* el **previsto** superan ciertos **umbrales** |
| **Acciones de AWS Budgets** | **Remedian automáticamente** cuando un presupuesto excede un **costo o umbral de uso** |

- Las **acciones de AWS Budgets** incluyen **aplicar una política de IAM** o una **política de control de servicios (SCP)** que **evite el gasto de recursos adicionales**. *(S06)*
- Ejemplo textual del video: aplicar una **política personalizada de IAM `Deny ec2:RunInstances`** a un **usuario, grupo o rol** de la cuenta **una vez superado el presupuesto mensual de EC2**. *(S06)*

### Cómo se resuelve en el examen
- Piden **saber qué equipo o proyecto gasta qué** → **etiquetado** + informes de asignación de costos. *(S06)*
- Piden **hacer cumplir el etiquetado** → **runbooks de Config + Systems Manager Automation**. *(S06)*
- Piden **tendencias, controladores o anomalías** → **Cost Explorer**. *(S06)*
- Piden **detalle diario u horario por servicio** → **CUR**. *(S06)*
- Piden **cruzar el CUR con consultas** → **Glue + Athena**. *(S06)*
- Piden **reducir el costo de salida hacia el origen** → **CloudFront** (+ **Origin Shield**). *(S06)*
- Piden **evitar la salida a internet** → **PrivateLink** con *interface endpoints*. *(S06)*
- Piden **quitar capacidad ociosa de forma automática** → **políticas de Auto Scaling** (EC2, ECS, Aurora). *(S06)*
- Piden **apagar instancias sin uso** → **alarmas de CloudWatch** que **detienen o terminan**. *(S06)*
- Piden **avisar si el gasto real o el previsto se pasa** → **AWS Budgets**. *(S06)*
- Piden **frenar el gasto automáticamente** → **acciones de AWS Budgets** (política IAM o SCP). *(S06)*
- Piden **alarma sobre los cargos estimados** → **alarma de facturación de CloudWatch**. *(S06)*

### Trampas y errores comunes
- ❌ Usar **AWS Budgets** para explorar tendencias. → ✅ eso es **Cost Explorer**; Budgets es **umbral + alerta/acción**.
- ❌ Confundir **CUR** con **Cost Explorer**. → ✅ CUR es el **detalle** diario/hora; Cost Explorer es la **vista de análisis**.
- ❌ Creer que una **alerta de presupuesto** frena el gasto. → ✅ hace falta una **acción de AWS Budgets** (IAM o SCP).
- ❌ Usar **PrivateLink** para servir contenido a usuarios finales. → ✅ PrivateLink es **tráfico privado**; para usuarios, **CloudFront**.
- ❌ Resolver instancias ociosas con **Auto Scaling**. → ✅ Auto Scaling ajusta **capacidad de un grupo**; para apagar lo que no se usa, **alarmas de CloudWatch**.
- ❌ Etiquetar a mano y confiar en la disciplina. → ✅ **Config + Systems Manager Automation**. *(S06)*

### Preguntas de repaso
1. ¿Qué herramienta muestra tendencias, controladores de costos y anomalías?
   <details><summary>Respuesta</summary>AWS Cost Explorer.</details>
2. ¿Qué entrega el Cost and Usage Report?
   <details><summary>Respuesta</summary>El uso diario o por hora de todos los servicios de AWS con cargo.</details>
3. ¿Cómo se hace cumplir una política de etiquetado?
   <details><summary>Respuesta</summary>Con runbooks de AWS Config y Systems Manager Automation.</details>
4. ¿Qué agrega CloudFront Origin Shield?
   <details><summary>Respuesta</summary>Una capa adicional de almacenamiento en caché para la infraestructura, que reduce los costos operativos.</details>
5. ¿Qué diferencia hay entre alerta y acción de AWS Budgets?
   <details><summary>Respuesta</summary>La alerta notifica cuando el gasto real o previsto supera un umbral; la acción remedia automáticamente, por ejemplo aplicando una política IAM o una SCP.</details>
6. ¿Cómo se detienen instancias que ya no se usan?
   <details><summary>Respuesta</summary>Con alarmas de CloudWatch configuradas para detenerlas o finalizarlas automáticamente.</details>

### Dudas resueltas en esta sesión
- Ninguna.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 3: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S05 — Tarea 3.4: estrategia para mejorar la fiabilidad]]
- Contraste con los modelos de precios del D2 → [[Domain 2 Review#S07 — Tarea 2.6: estrategia de optimización de costos para cumplir las metas]]
- Nota de tarea → `03 - Dominio 3 - Mejora Continua/3.5 Identificar oportunidades de optimización de costos.md`
- Servicios → [[Definicion servicios]]

---

## 🧠 Núcleo de conceptos (crece con cada sesión)

> [!info] Para qué sirve esta sección
> Es el "un solo lugar" para lo que hay que tener en la cabeza el día del examen.
> Cada sesión aporta filas acá **además** de su sección propia.

### Decisiones de arquitectura

> Formato: **Si el escenario pide…** → **entonces la respuesta es…** · *(origen)*

| Si el escenario pide… | Entonces… | Origen |
| --- | --- | --- |
| Obtener **información de las operaciones** y recomendar mejoras | Tarea **3.1** — supervisión y registro + corrección automática + plan de DR | S01 |
| Mejorar la seguridad **en cada capa** | Tarea **3.2** — auditorías, respaldos y corrección automatizada | S01 |
| Rendimiento cuando **cambia la demanda** o **evoluciona la tecnología** | Tarea **3.3** — encontrar el *bottleneck* y adoptar servicios administrados | S01 |
| **Resiliencia y replicación** de datos | Tarea **3.4** — alta disponibilidad + métodos de replicación + DR | S01 |
| **Bajar costos de una carga ya existente** | Tarea **3.5** — alarmas de facturación, informes de uso, transferencia de datos y redes | S01 |
| **Automatizar la configuración y el cumplimiento** | **AWS Config** (evalúa) + **runbook de Systems Manager** (corrige) | S02 |
| Piden **inventario, parches del SO o configurar instancias** | **AWS Systems Manager** | S02 |
| Piden **Puppet o Chef** | **AWS OpsWorks** | S02 |
| Piden **métricas, alarmas y reacción automática** | **Amazon CloudWatch** | S02 |
| **Desplegar gradual y poder abortar** | **Canary** (o lineal) | S02 |
| **Cambiar de entorno completo** sin tocar el que funciona | **Azul/verde** (blue/green) | S02 |
| **Reemplazar todo de una vez** | **Todo a la vez** (all-at-once) | S02 |
| **Canalización que crea/actualiza/elimina pilas** | **CodePipeline + CloudFormation** (integración incorporada) | S02 |
| **El monitoreo da verde pero el usuario no accede** | Revisar el **failover de DNS** y monitorear la **experiencia del cliente** | S02 |
| Piden **estado de seguridad consolidado y priorizado** | **AWS Security Hub** (agrega GuardDuty, Inspector, Macie) | S03 |
| Piden **auditar permisos o validar políticas** | **IAM Access Analyzer** + **informe de credenciales** de IAM | S03 |
| Piden **quién hizo qué** | **CloudTrail**; para alertas procesables, **CloudWatch Logs** | S03 |
| Piden **corrección automática de hallazgos** | **Reglas de EventBridge** o **paquete de conformidad** de Config con acción de corrección | S03 |
| Piden **varios dominios en un balanceador** | **SNI** con múltiples certificados en el mismo listener | S03 |
| Piden **rotación automática** de credenciales, claves API o secretos | **AWS Secrets Manager** | S03 |
| Piden **aprobar o rechazar parches** | **Patch Manager**; en entornos **Chef/Puppet**, **OpsWorks** | S03 |
| Cambia la **política de retención** o aparece una regulación | Revisar la **clasificación de datos** y el **plan de AWS Backup** | S03 |
| Piden **mejorar rendimiento pero no hay métricas** | Primero **traducir requisitos a KPI medibles** | S04 |
| Piden **reacción automática a una métrica fuera de rango** | **CloudWatch → EventBridge → Lambda** (con SNS para avisar) | S04 |
| Piden **encontrar dónde se degrada una aplicación distribuida** | **AWS X-Ray** | S04 |
| Piden **probar el diseño a bajo costo** | **Instancias Spot** | S04 |
| Piden **caché sin datos viejos** | Caché **con diseño de actualización e invalidación** | S04 |
| Piden **quitar sobrecarga operativa de Kubernetes** | **Amazon EKS** | S04 |
| Piden **capacidad elástica constante y predecible** | **AWS Auto Scaling** | S04 |
| Piden **máximo throughput entre instancias** | **Placement group de clúster** | S04 |
| Piden **acelerar tráfico global** | **AWS Global Accelerator** (estándar o *custom routing*) | S04 |
| Piden **subir la tasa de aciertos de CloudFront** | **`Cache-Control: max-age`** largo en el origen | S04 |
| Piden **replicar cambios continuos entre bases de datos** | **AWS DMS**, manteniendo origen y destino sincronizados | S05 |
| Piden **mover grandes conjuntos de datos activos** | **AWS DataSync** | S05 |
| Piden **informe de utilización, capacidad y configuración del storage** | **DataSync Discovery** | S05 |
| Piden **recuperación automática en todas las AZ y regiones** | **Elastic Load Balancing + AWS Auto Scaling** | S05 |
| Piden **eliminar errores humanos en el aprovisionamiento** | **AWS Elastic Beanstalk** | S05 |
| **El escalado no llega a tiempo en los picos** | **Aprovisionar en exceso** (subir la capacidad mínima) para absorber picos y compensar la latencia del escalado | S05 |
| **La carga no crece aunque haya demanda** | Revisar **Service Quotas** y solicitar aumento (consola o SDK) | S05 |
| Piden **identificar puntos únicos de error** | Analizar la arquitectura y **recomendar pasos** para eliminarlos | S05 |
| Piden **conmutación por error de DNS** | **Health checks de Route 53** | S05 |
| **Falla el grupo de origen principal de CloudFront** | **Origin failover** hacia el grupo de origen secundario | S05 |
| Piden **limitar las solicitudes a una API** | **API Gateway** | S05 |
| Piden **replicar servidores completos a otra región** | **AWS Elastic Disaster Recovery (DRS)** con área de preparación y *launch settings* | S05 |
| Piden **saber qué equipo o proyecto gasta qué** | **Etiquetado** para asignación de costos e informes | S06 |
| Piden **hacer cumplir la política de etiquetado** | **Runbooks de AWS Config + Systems Manager Automation** | S06 |
| Piden **tendencias, controladores de costos o anomalías** | **AWS Cost Explorer** | S06 |
| Piden **uso diario o por hora de todos los servicios con cargo** | **Cost and Usage Report (CUR)** | S06 |
| Piden **análisis profundo sobre el CUR** | **AWS Glue + Amazon Athena** | S06 |
| Piden **reducir el costo de transferencia hacia el origen** | **CloudFront** (y **Origin Shield** como capa extra de caché) | S06 |
| Piden **evitar el tráfico de salida a internet** | **AWS PrivateLink** con *interface endpoints* de VPC | S06 |
| Piden **eliminar exceso de capacidad automáticamente** | **Políticas de AWS Auto Scaling** (EC2, tareas ECS, réplicas Aurora) | S06 |
| Piden **apagar instancias que ya no se usan** | **Alarmas de CloudWatch** que detienen o finalizan | S06 |
| Piden **avisar cuando el gasto real o previsto supera un umbral** | **AWS Budgets** (alertas) | S06 |
| Piden **frenar el gasto automáticamente** | **Acciones de AWS Budgets**: política IAM o SCP | S06 |
| Piden **alarma sobre los cargos estimados** | **Alarma de facturación de CloudWatch** | S06 |

### Distinciones entre servicios parecidos

> En el D3 la trampa típica es confundir **detectar** con **corregir**, o **medir** con **mejorar**.

| Par / grupo de servicios | Criterio que decide | Origen |
| --- | --- | --- |
| **Detectar** vs **corregir automáticamente** | El D3 premia la **automatización de la corrección**, no solo el aviso: un hallazgo sin remedio automático deja trabajo manual | S01 |
| **Optimización de costos en D2 (2.6)** vs **en D3 (3.5)** | D2 elige **modelo de precios al diseñar**; D3 **analiza uso y facturación de lo que ya corre** (alarmas, informes, transferencia) | S01 |
| **Fiabilidad en D2 (2.4) y D3 (3.4)** | Mismo objetivo, distinto verbo: D2 **diseña** disponibilidad y replicación; D3 **revisa y mejora** las que ya existen | S01 |
| **DR en 3.1** vs **DR en 3.4** | 3.1 = **planificación** de la recuperación (proceso operativo); 3.4 = **métodos y herramientas** de DR (mecánica técnica y replicación) | S01 |
| **Systems Manager** vs **AWS Config** | SSM **ejecuta** (parches, inventario, configuración, runbooks); Config **evalúa** el estado y las relaciones de los recursos | S02 |
| **AWS Config** vs **CloudWatch** | Config = **estado de configuración** y cumplimiento; CloudWatch = **métricas, alarmas y reacción** en el tiempo | S02 |
| **Systems Manager** vs **OpsWorks** | SSM = capacidades nativas de AWS; OpsWorks = **Puppet o Chef** para aplicar configuración deseada | S02 |
| **Canary** vs **azul/verde** | Canary envía **un porcentaje de tráfico** a la versión nueva; blue/green **cambia de entorno completo** | S02 |
| **Azul/verde** vs **en el mismo lugar** | Blue/green no toca lo que funciona: se levanta el verde y se mueve el tráfico; in-place actualiza lo existente | S02 |
| **CodePipeline** vs **CodeDeploy** | Pipeline **orquesta** compilación, prueba y lanzamiento; CodeDeploy **despliega** en el recurso de cómputo | S02 |
| **Security Hub** vs **GuardDuty / Inspector / Macie** | Security Hub **agrega y prioriza**; cada servicio produce sus propios hallazgos | S03 |
| **IAM Access Analyzer** vs **informe de credenciales** | Access Analyzer valida **políticas**; el informe muestra el **estado de las credenciales** (contraseñas, claves, MFA) | S03 |
| **CloudTrail** vs **CloudWatch Logs** | CloudTrail **registra** las acciones de usuarios, roles y servicios; CloudWatch Logs **procesa y alerta** | S03 |
| **Reglas de Config** vs **paquetes de conformidad** | Una regla evalúa un control; el paquete es una **colección de reglas + acciones de corrección** | S03 |
| **ACM** vs **Secrets Manager** | ACM = **certificados TLS** (incluidos los propios, con SNI); Secrets Manager = **secretos y su rotación** | S03 |
| **Patch Manager** vs **OpsWorks (parches)** | Patch Manager programa y aprueba parches en general; OpsWorks aplica parches en entornos **Chef/Puppet** | S03 |
| **CloudWatch** vs **AWS X-Ray** | CloudWatch = **métricas y alarmas** de recursos; X-Ray = **trazas** de aplicaciones distribuidas | S04 |
| **EC2 Fleet** vs **Spot Fleet** | EC2 Fleet gestiona una flota mixta; Spot Fleet es la variante **basada en Spot** | S04 |
| **Placement group: clúster / partición / distribución** | Clúster = latencia mínima; partición = aislamiento por grupos; distribución = máxima disponibilidad | S04 |
| **Global Accelerator** vs **CloudFront** | GA acelera el **tráfico de red** global (routing propio, IP fija); CloudFront **cachea contenido** en el edge | S04 |
| **Acelerador estándar** vs **custom routing** | Estándar enruta al endpoint óptimo; *custom routing* permite dirigir a **destinos específicos** dentro de la VPC | S04 |
| **EKS** vs **Kubernetes autogestionado** | EKS quita la sobrecarga de instalar, operar y mantener **nodos y planos de control** | S04 |
| **AWS DMS** vs **AWS DataSync** | DMS replica **cambios entre bases de datos**; DataSync mueve **grandes conjuntos de datos** (archivos/objetos) | S05 |
| **DataSync** vs **DataSync Discovery** | DataSync **mueve** los datos; Discovery **solo informa** utilización, capacidad y configuración | S05 |
| **Elastic Load Balancing** vs **Auto Scaling** | ELB **distribuye** el tráfico entre destinos; Auto Scaling **ajusta la capacidad** | S05 |
| **Route 53 failover** vs **CloudFront origin failover** | Route 53 conmuta por **DNS** entre endpoints; CloudFront conmuta entre **grupos de origen** de la distribución | S05 |
| **Service Quotas** vs **Auto Scaling** | Service Quotas fija el **techo máximo** de recursos; Auto Scaling se mueve **dentro de ese techo** | S05 |
| **AWS DRS** vs **AWS DMS** | DRS replica **servidores completos** a un área de preparación; DMS replica **datos de bases de datos** | S05 |
| **Elastic Beanstalk** vs **CloudFormation** | Beanstalk aprovisiona la **aplicación** (y quita errores humanos); CloudFormation es **IaC genérica** para cualquier recurso | S05 |
| **Cost Explorer** vs **CUR** | Cost Explorer **analiza** (tendencias, controladores, anomalías); el CUR es el **detalle** diario/hora por servicio | S06 |
| **AWS Budgets** vs **alarma de facturación de CloudWatch** | Budgets compara **gasto real y previsto** contra un umbral y puede **actuar**; la alarma de CloudWatch vigila los **cargos estimados** y notifica | S06 |
| **Alerta de Budgets** vs **acción de Budgets** | La alerta **notifica**; la acción **remedia** aplicando una política IAM o una SCP | S06 |
| **CloudFront** vs **Origin Shield** | CloudFront cachea en el **edge**; Origin Shield agrega **una capa de caché** delante del origen | S06 |
| **CloudFront** vs **PrivateLink** | CloudFront reduce el costo de **servir contenido** a usuarios; PrivateLink evita la **salida a internet** en tráfico privado | S06 |
| **Auto Scaling** vs **alarmas que apagan instancias** | Auto Scaling ajusta la **capacidad del grupo**; las alarmas **detienen o finalizan** lo que ya no se usa | S06 |
| **Optimización de costos en 2.6** vs **en 3.5** | 2.6 elige **modelo de precios al diseñar**; 3.5 **mide el gasto real** y pone límites que actúan | S06 |

### Límites, cuotas y valores numéricos

| Valor | A qué aplica | Origen |
| --- | --- | --- |
| **25 %** | Peso del Dominio 3 en el examen SAP-C02 | [[Guia AWS]] |
| **5** | Enunciados de tarea del Dominio 3 (un video por tarea) | S01 |
| **3** | Lecciones con preguntas de ejemplo explicadas al final del módulo | S01 |
| **5** | Estrategias de despliegue que exige el examen: mismo lugar, lineal, azul/verde, canary, todo a la vez | S02 |
| **75 %** | Utilización de CPU máxima aceptable en el caso de Auto Scaling (por encima, rendimiento inaceptable) | S05 |
| **70 %** | Umbral de CPU al que está configurado el escalado horizontal en ese caso | S05 |
| **10 %** | Picos aleatorios de tráfico durante la semana en ese caso | S05 |
| **2 → 4** | Capacidad mínima del grupo de EC2 Auto Scaling, ante un aumento de uso del **45 %** | S05 |
| **Diario o por hora** | Granularidad del Cost and Usage Report | S06 |

### Reglas de dedo para el examen

- **En D3 el verbo manda:** *monitorear, auditar, detectar, corregir, optimizar*. Si la opción "construye algo nuevo" cuando el escenario describe algo **que ya corre**, probablemente está mal. *(S01)*
- **Automatizar gana a avisar.** Ante dos opciones equivalentes, la que **corrige sola** es la respuesta. *(S01)*
- **Primero se mide, después se opina:** sin datos de supervisión o de uso, cualquier "mejora" es una suposición. *(S01)*
- **Config detecta, Systems Manager corrige.** Si la opción solo detecta, está incompleta. *(S02)*
- **Monitoreo verde no es servicio funcionando.** El caso del DNS obliga a medir la experiencia del cliente y a automatizar el failover. *(S02)*
- **El despliegue se elige por riesgo:** gradual (canary/lineal) si hay que poder abortar; azul/verde si se cambia de entorno; todo a la vez solo si el riesgo es aceptable. *(S02)*
- **En seguridad, el orden es detectar → priorizar → corregir:** GuardDuty/Inspector/Macie producen, **Security Hub prioriza**, **EventBridge/Config corrigen**. *(S03)*
- **Permisos no se auditan con logs:** CloudTrail cuenta **qué pasó**; Access Analyzer e informe de credenciales dicen **cómo están los permisos**. *(S03)*
- **Si cambia la retención, primero se clasifica el dato y después se toca el plan de backup.** *(S03)*
- **Sin KPI no hay mejora de rendimiento:** primero se define qué se mide, después la alarma y la corrección. *(S04)*
- **Caché sin invalidación es deuda técnica:** el video pide explícitamente diseñar cómo se actualiza y se invalida. *(S04)*
- **Antes de optimizar, se reemplaza:** si un componente se puede delegar a un administrado (EKS, Auto Scaling), primero se quita la sobrecarga operativa. *(S04)*
- **Escalar más rápido no siempre es la respuesta:** si el pico supera la latencia del escalado, se **sobreaprovisiona**. *(S05)*
- **Si no crece, mirar el techo:** el bloqueo puede ser una **cuota** de Service Quotas, no falta de demanda. *(S05)*
- **Réplica según el dato:** **bases de datos → DMS**, **archivos y datasets → DataSync**, **servidores completos → DRS**. *(S05)*
- **Sin etiqueta no hay asignación:** el costo se reparte por *tags*; para que se cumpla, **Config + SSM Automation**. *(S06)*
- **Presupuesto sin acción es solo un aviso:** para frenar el gasto hace falta una **acción de AWS Budgets** (IAM o SCP). *(S06)*
- **Dos caminos para bajar transferencia:** **caché** (CloudFront/Origin Shield) hacia el origen y **PrivateLink** para no salir a internet. *(S06)*

---

## ✅ Cobertura del examen

> Pesos oficiales según [[Guia AWS]]: D1 26 % · D2 29 % · **D3 25 %** · D4 20 % (temas emergentes sin puntaje).

| Dominio / tarea | Visto en | Confianza |
| --- | --- | --- |
| 3.1 Excelencia operativa | S01 (panorama) · S02 (contenido) | 🟡 |
| 3.2 Mejora de la seguridad | S01 (panorama) · S03 (contenido) | 🟡 |
| 3.3 Mejora del rendimiento | S01 (panorama) · S04 (contenido) | 🟡 |
| 3.4 Mejora de la fiabilidad | S01 (panorama) · S05 (contenido) | 🟡 |
| 3.5 Oportunidades de optimización de costos | S01 (panorama) · S06 (contenido) | 🟡 |

Confianza: ⬜ sin ver · 🟠 visto una vez · 🟡 entendido · 🟢 puedo explicarlo y responder preguntas.

---

## ❓ Dudas abiertas

> Preguntas que surgieron en una sesión. La respuesta corta va **acá**; el desarrollo, en la sesión.
> Se cierran **solo** con una sesión o una fuente, nunca "porque suena lógico".

| # | Duda | Respuesta corta | Sesión | Estado |
| --- | --- | --- | --- | --- |
| 1 | Caso Windows Server con RDP: ¿la respuesta correcta es **WorkSpaces + WorkSpaces Application Manager**, como dice la transcripción? | **Muy probablemente no.** WorkSpaces es **escritorios virtuales administrados**, no una forma de alojar esta aplicación, y el video insiste en **AMI nueva + Systems Manager Patch Manager**. La transcripción parece haber cruzado la respuesta con otra pregunta. Queda pendiente de verificar con la explicación oficial o la nota de tarea 3.1. | S02 | ⏳ abierta |

---

## 🕒 Registro de cambios

| Fecha | Cambio | Sesión |
| --- | --- | --- |
| 2026-10-21 | Creación de la estructura base del Dominio 3 (mapa, núcleo, cobertura, dudas, plantilla). | — |
| 2026-10-21 | **S01** cargada: panorama del Dominio 3 (5 tareas), distinción de verbos D2/D3, reglas de automatización. 5 decisiones y 3 distinciones nuevas; las 5 tareas pasan a 🟠. | S01 |
| 2026-10-21 | **S02** cargada: tarea 3.1 (Systems Manager, Config, OpsWorks, CloudWatch, caso DNS, 5 estrategias de despliegue, CI/CD con CodePipeline y CloudFormation). 10 decisiones y 7 distinciones nuevas; 3.1 pasa a 🟡; duda #1 (respuesta WorkSpaces del caso Windows/RDP) registrada como ⏳. | S02 |
| 2026-10-21 | **S03** cargada: tarea 3.2 (Security Hub y fuentes, mínimo privilegio, Access Analyzer, CloudTrail/CloudWatch Logs, EventBridge y conformance packs, ACM/SNI, Secrets Manager, Patch Manager/OpsWorks, AWS Backup). Se aclara que el video es de **3.2** aunque se envió como "rendimiento". 8 decisiones y 7 distinciones nuevas; 3.2 pasa a 🟡. | S03 |
| 2026-10-21 | **S04** cargada: tarea 3.3 (KPI, X-Ray, corrección automática, Spot para pruebas, EKS, Auto Scaling, flotas, placement groups, Global Accelerator, CloudFront y max-age). 11 decisiones y 7 distinciones nuevas; 3.3 pasa a 🟡. | S04 |
| 2026-10-21 | **S05** cargada: tarea 3.4 (DMS, DataSync y DataSync Discovery, ELB + Auto Scaling, Beanstalk, caso del pico con CPU al 75 %, Service Quotas, SPOF, Route 53 y CloudFront origin failover, API Gateway, AWS DRS). Se aclara que el video es de **3.4** aunque se envió como "rendimiento". 13 decisiones, 8 distinciones y 4 valores numéricos nuevos; 3.4 pasa a 🟡. | S05 |
| 2026-10-21 | **S06** cargada: tarea 3.5 (etiquetado con Config y SSM Automation, Cost Explorer, CUR con Glue/Athena, CloudFront y Origin Shield, PrivateLink, Auto Scaling en EC2/ECS/Aurora, alarmas de facturación, Budgets con alertas y acciones). 13 decisiones y 8 distinciones nuevas; **los 5 enunciados del D3 quedan cubiertos** y 3.5 pasa a 🟡. | S06 |

---

## 📋 Plantilla de sesión (no borrar)

> Se copia en orden ascendente (S01, S02…), justo después de [[#🗂️ Índice de sesiones]].
> Los campos vacíos se dejan así a propósito:
> un campo vacío es información ("no se dijo"), un campo inventado es un error de estudio.

```markdown
## Sxx — Título de la sesión

> [!info] Ficha
> - **Fuente:** video / laboratorio / evaluación · **Duración:** · **Dominio:** D3 · **Tarea:** _
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> La idea que hay que poder decir sin mirar nada.

### Puntos clave
- **Concepto** — explicación en una línea. *(Sxx)*

### Servicios involucrados
| Servicio | Qué hace en este contexto | Distinción / trampa |
| --- | --- | --- |
| | | |

### Cómo se resuelve en el examen
- **Si piden …** → … (y por qué las otras opciones fallan).

### Números y límites mencionados
- …

### Trampas y errores comunes
- ❌ … → ✅ …

### Preguntas de repaso
1. …
   <details><summary>Respuesta</summary>…</details>

### Dudas resueltas en esta sesión
- **Duda:** … → **Respuesta corta:** … → **Estado:** ✅

### Enlaces
- Nota de tarea: [[ ]]
- Servicios: [[Definicion servicios]]
```

---

## 🔗 Navegación

- Dominio anterior → [[Domain 2 Review]]
- Práctica del Dominio 2 → [[Domain 2 Practice]]
- Guía oficial y pesos por dominio → [[Guia AWS]]
- Catálogo de servicios y distinciones → [[Definicion servicios]]
- Banco de preguntas → [[preguntas-v1-manual]]
- Notas por tarea: carpeta `03 - Dominio 3 - Mejora Continua` (una nota por tarea del examen)
