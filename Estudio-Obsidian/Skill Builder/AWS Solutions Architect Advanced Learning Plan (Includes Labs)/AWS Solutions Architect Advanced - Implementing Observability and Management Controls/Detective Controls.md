---
title: "Detective Controls"
aliases:
  - "Detective controls"
  - "Controles detectivos"
  - "Config, GuardDuty y Security Hub"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - governance
  - config
  - guardduty
  - security-hub
  - systems-manager
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Detective Controls"
---

# Detective Controls

> [!abstract] Qué es este archivo
> Quinta lección del módulo y la que abre el bloque de **observabilidad**. Hasta acá todo era **prevenir**
> (guardrails, SCPs, catálogo). Acá empieza la otra mitad: **detectar, registrar y alertar**.
>
> La lección cubre cuatro servicios —**AWS Config**, **AWS Systems Manager**, **Amazon GuardDuty** y
> **AWS Security Hub**— desde una misma pregunta: **¿qué pasa cuando algo ya se desvió?**

> [!quote] La definición que ordena todo
> **Detective controls** = *detect, log, and alert to misconfigurations and potential threats.*
> No impiden el incidente: te dicen **qué pasó, cuándo y dónde**, y habilitan la respuesta.

---

## Resumen en una frase

> Los controles detectivos **no evitan** la acción: la **registran**, la **evalúan contra una regla** y
> **alertan** — y con **auto-remediation** pueden además **corregirla**, cerrando el ciclo
> **definir → monitorear → detectar → notificar → actuar**.

---

## 1. Preventive vs. detective

| | **Preventive** | **Detective** |
| --- | --- | --- |
| **Momento** | **Antes**: impide la acción | **Después**: la acción ya ocurrió |
| **Pregunta** | ¿Puede pasar? | ¿Pasó? ¿Qué cambió? ¿Quién lo hizo? |
| **Implementación** | **SCPs** | **Config rules**, **GuardDuty**, **Security Hub** |
| **Salida** | La acción **no se ejecuta** | **Hallazgo**, **alerta**, **historial** |
| **Valor** | Evita el incidente | Permite **entender, investigar y remediar** |

> [!important] Por qué hacen falta las dos
> La lección lo plantea como pregunta abierta: los preventivos aseguran que los recursos **se configuren bien**.
> Pero **¿cómo asegurás que sigan bien**? Ahí entran los detectivos: **identificar cambios no deseados** en
> configuración y compliance, y decidir **qué hacer después de detectarlos**.

---

## 2. Los cuatro aspectos de operar con agilidad y control

| # | Aspecto | Qué busca |
| --- | --- | --- |
| **1** | **Monitor** | Visibilidad de **cómo se usan** los recursos y aplicaciones y **cómo rinden** |
| **2** | **Audit** | Que sean **auditables**: configuración de recursos, **quién accede**, **qué políticas** se aplican |
| **3** | **Act** | **Accionar** sobre los recursos: administrarlos a escala, agruparlos lógicamente, **automatizar tareas** de forma segura |
| **4** | **Operate** | **Seguir administrando y analizando después del provisioning** para mantener compliance y mejorar eficiencia y postura de seguridad |

> [!tip] El orden no es casual
> **Monitor → Audit → Act → Operate** es el ciclo que después se repite en cada servicio. Si una opción del
> examen solo “monitorea”, está incompleta: falta **actuar** y **operar**.

---

## 3. El mapa de servicios de management

| # | Función | Servicios |
| --- | --- | --- |
| **1** | **Enterprise governance and control** | **AWS Control Tower** + **AWS Organizations** |
| **2** | **Provisioning and orchestration** | **AWS CloudFormation** + **AWS Service Catalog** |
| **3** | **Monitoring and observability** | **Amazon CloudWatch** — datos e **insights accionables**; **vista unificada de la salud operativa** |
| **4** | **Centralized operations management and governance** | **CloudTrail** · **AWS Config** · **Systems Manager** · **Security Hub** · **GuardDuty** |

### 3.1 Qué hace cada uno del grupo 4

| Servicio | Rol literal de la lección |
| --- | --- |
| **AWS CloudTrail** | **Registrar, monitorear y retener** la actividad de la cuenta: acciones desde **consola**, **SDKs**, **herramientas de línea de comandos** y **otros servicios de AWS** |
| **AWS Config** | **Rastrear cambios** en la **configuración de recursos** |
| **AWS Systems Manager** | **Administrar tareas operativas**; en híbridos, **centraliza** en un **operations cockpit** con un **toolset común** en vez de herramientas distintas |
| **AWS Security Hub** | **Dashboard central** para **administrar alertas de seguridad** y **actuar sobre los findings** |
| **Amazon GuardDuty** | **Identificación de amenazas multi-cuenta** y **automatización de respuestas** |

### 3.2 Lo que habilitan juntos

- **Definir** reglas de seguridad y requisitos de compliance.
- **Monitorear** la infraestructura **contra** esas reglas.
- **Detectar** violaciones.
- **Notificar en tiempo real**.
- **Actuar** de forma **efectiva y rápida**.

---

## 4. AWS Config

**Qué hace:** **evalúa, audita y evalúa** (*assess, audit, and evaluate*) tus configuraciones de AWS.

**Detalle del video (0:50):**

| Característica | Detalle |
| --- | --- |
| **Tipo** | Servicio **nativo** y **agentless** |
| **Descubrimiento** | **Descubre automáticamente** los recursos que existen en la cuenta |
| **Registro** | Guarda el **estado actual** de las configuraciones y **rastrea los cambios** para un **historial completo** |
| **Evaluación** | Evalúa los cambios **contra políticas de compliance** usando **Config rules** |
| **Qué son esas políticas** | **Prácticas internas**, **guías de la industria** y **regulaciones** |
| **Alertas** | **En tiempo real** por violaciones, usando **Amazon SNS** y **eventos de Amazon CloudWatch** |
| **Definición** | *“AWS Config is a real-time configuration auditor in the cloud.”* |

> [!important] Config no es un firewall
> Config **no bloquea**: **audita**. Su valor es el **historial** — qué configuración tenía el recurso, cuándo
> cambió y si el estado actual cumple la regla.

### 4.1 Config y governance a escala (6 puntos)

| # | Punto | Detalle |
| --- | --- | --- |
| **1** | **Enterprise-wide compliance monitoring** | Corre sobre **AWS Organizations**: gobernanza **multi-cuenta y multi-región**, con **vista agregada** de configuración y compliance de toda la organización |
| **2** | **Monitoring** | **Control Tower** y **Config** dan **dashboard visual** para detectar rápido recursos no compliant y actuar |
| **3** | **Assessment** | **Auditoría centralizada**: vista **enterprise-wide** de recursos y del **estado de compliance de las reglas** |
| **4** | **Support for third-party resources** | Si ya invertiste en **ITSM** (ej.: **ServiceNow**), podés **agregar datos de Config** a esas herramientas |
| **5** | **Change management** | Con los datos en el ITSM, arrancás el **proceso de cambio** según los **workflows existentes** |
| **6** | **Operational troubleshooting** | **Auto-remediation**: permite **actuar** cuando algo está en violación del estado deseado |

> [!tip] El punto 1 es el que más se pregunta
> **Config corre sobre Organizations** → no se configura cuenta por cuenta. Y da **vista agregada**
> (aggregators) de **múltiples cuentas y regiones**.

---

## 5. AWS Systems Manager

**Qué da:** **visibilidad y control** de la infraestructura en AWS.

**Detalle del video (0:59):**

| Capacidad | Detalle |
| --- | --- |
| **Interfaz** | **UI unificada** para ver **datos operativos de múltiples servicios de AWS** |
| **Automatización** | Permite **automatizar tareas operativas** sobre los recursos |
| **Agrupación** | Agrupa recursos **por aplicación**: instancias **EC2**, buckets **S3**, instancias **RDS** |
| **Uso** | Ver datos operativos para **monitoreo y troubleshooting**, y **actuar sobre grupos** de recursos |
| **Beneficio** | **Agiliza** la administración de recursos y aplicaciones, **acorta el tiempo de detección y resolución** de problemas, y **simplifica operar de forma segura y a escala** |

> [!warning] Falta contenido en la fuente
> La sección **“Systems Manager governance”** viene como **flashcards** y el texto de cada tarjeta **no llegó**
> en lo que se compartió. Queda **pendiente**: no se completa con suposiciones.
> Lo que sí está confirmado es su rol en el ciclo (§11.2): **automatiza el compliance de recursos**, mantiene
> **grupos de políticas** a escala y **ejecuta la remediación** que disparan Config, Security Hub o GuardDuty.

---

## 6. Amazon GuardDuty

**Qué es:** servicio de **detección de amenazas** que **monitorea actividad maliciosa y comportamiento no
autorizado** para proteger **cuentas, workloads y datos almacenados en Amazon S3**.

**Detalle del video (1:01):**

| Característica | Detalle |
| --- | --- |
| **Cómo detecta** | **Machine learning**, **anomaly detection** e **integrated threat intelligence** |
| **Salida** | Identifica y **prioriza** amenazas potenciales |
| **Activación** | Se habilita desde la **consola de administración de AWS** |
| **Escala** | Analiza **tens of billions of events** de **múltiples fuentes** |
| **Fuentes** | **CloudTrail event logs** · **VPC Flow Logs** · **DNS logs** |
| **Integración** | Con **Amazon CloudWatch Events** → alertas **accionables**, **agregables entre cuentas** y **empujables** a sistemas de gestión de eventos y workflows existentes |

> [!important] El dato que casi nadie sabe
> **Los usuarios normalmente no pueden acceder a los DNS logs.** GuardDuty es el servicio que **sí** los usa,
> y la lección lo destaca explícitamente: *“generally, users can't access DNS logs, which is something only
> GuardDuty provides.”*

### 6.1 GuardDuty y governance (4 categorías)

| Categoría | Detalle |
| --- | --- |
| **Monitoring and threat detection** | Detecta amenazas **monitoreando actividad de red, patrones de acceso a datos y comportamiento de la cuenta**. Está integrado con **feeds de threat intelligence actualizados de AWS**, como **CrowdStrike** y **Proofpoint**. Con **ML y modelos de comportamiento** detecta **criptominería**, **compromiso de credenciales**, **acceso a datos no autorizado o inusual**, **comunicación con servidores command-and-control conocidos** y **llamadas API desde IPs maliciosas conocidas** |
| **Security automation** | Además de detectar, **automatiza la respuesta**, reduciendo **tiempo de remediación y recuperación**. Los findings son **informativos y accionables**: incluyen **detalles del recurso afectado** e **información del atacante** (IP, geolocalización) |
| **Multi-account support** | Soporte multi-cuenta con **Organizations**: se activa en **cuentas existentes y nuevas**; los equipos de seguridad **agregan los findings de la organización en una sola GuardDuty administrator account**; los findings agregados también están disponibles vía **Amazon EventBridge** |
| **Simplified management** | Al activarse, **empieza a analizar en near real-time y a escala**. **No hay** software, sensores ni appliances de red que desplegar o administrar. La **threat intelligence está preintegrada** y se **actualiza y mantiene** |

> [!tip] GuardDuty responde a “**comportamiento**”
> No evalúa si un bucket cumple una política de tagging: eso es **Config**. GuardDuty evalúa **si alguien está
> haciendo algo malo**: minar cripto, usar credenciales robadas, hablar con un C2, llamar APIs desde IPs maliciosas.

---

## 7. AWS Security Hub

**Qué es:** **el centro de compliance y seguridad** para usuarios de AWS. Permite **ver y administrar centralmente
alertas de seguridad** y **automatizar chequeos de seguridad**.

**Detalle del video (0:38):**

| Característica | Detalle |
| --- | --- |
| **Chequeos automáticos** | Corre chequeos de **configuración y seguridad a nivel de cuenta** basados en **AWS best practices** y **open standards** |
| **Agregación** | **Consolida findings entre cuentas** y **entre productos de proveedores** |
| **Visualización** | Muestra resultados en la **consola de Security Hub** |
| **Integración** | Soporta **Amazon CloudWatch Events** |
| **Remediación** | Se pueden definir **custom actions** para **automatizar la remediación** de findings específicos |

> [!warning] Falta contenido en la fuente
> La sección **“Security Hub governance”** también viene como **flashcards** y **no llegó** el contenido.
> Queda pendiente. Lo confirmado sobre su rol está en §11.4: **agrega findings de servicios y herramientas**,
> **los correlaciona**, **acepta logs de terceros** y hace **chequeos de compliance con open standards**.

---

## 8. Los cuatro roles en el ciclo (comparativa)

| | **AWS Config** | **Systems Manager** | **GuardDuty** | **Security Hub** |
| --- | --- | --- | --- | --- |
| **Qué mira** | **Configuración** de recursos | **Recursos agrupados** por aplicación | **Comportamiento y amenazas** | **Findings** de múltiples fuentes |
| **Cómo detecta** | **Config rules** contra políticas | Integra y ejecuta acciones | **ML**, anomalías, **threat intel** | **Chequeos** + correlación |
| **Fuentes** | Configuración registrada | Servicios de AWS | **CloudTrail**, **VPC Flow Logs**, **DNS logs** | Servicios de AWS **+ terceros** |
| **Salida** | **Violación de compliance** + historial | **Acción operativa / remediación** | **Amenaza priorizada** | **Finding priorizado** |
| **Automatiza** | **Auto-remediation** | **Remediación** y tareas operativas | **Respuesta** a amenazas | **Remediación** vía EventBridge + Lambda |
| **Alcance** | **Organizations**, multi-región, **vista agregada** | Grupos de recursos multi-servicio | **Multi-cuenta** con **administrator account** | **Multi-cuenta**, multi-proveedor |

### 8.1 La diferencia que más se pregunta

| Comparación | Regla |
| --- | --- |
| **GuardDuty vs. Security Hub** | GuardDuty **detecta amenazas**; Security Hub **agrega y correlaciona findings** — y **acepta logs de terceros**, cosa que GuardDuty no |
| **Config vs. GuardDuty** | Config evalúa **configuración**; GuardDuty evalúa **comportamiento** |
| **Config vs. CloudTrail** | CloudTrail registra **quién hizo qué API call**; Config registra **cómo estaba configurado el recurso** |
| **Security Hub vs. CloudWatch** | Security Hub es de **seguridad y compliance**; CloudWatch es de **salud operativa y métricas** |

### 8.2 El flujo completo

```
Definir requisito  →  Monitorear  →  Detectar  →  Notificar  →  Actuar
   (política)          (Config)      (regla)      (SNS/CWE)     (SSM / EventBridge + Lambda)
                                       ▲
                      GuardDuty ───────┘ (comportamiento)
                      Security Hub ────┘ (findings agregados + standards)
```

---

## 9. Recursos adicionales de la lección

| Servicio | Descripción | Video |
| --- | --- | --- |
| **AWS Systems Manager** | Da **visibilidad y control** de tu infraestructura en AWS | [youtu.be/MK4ZoCs-muo](https://youtu.be/MK4ZoCs-muo) |
| **Amazon GuardDuty** | Protege cuentas, workloads y datos con **detección y monitoreo inteligente de amenazas** | [youtu.be/ocZjGirQT9A](https://youtu.be/ocZjGirQT9A) |
| **AWS Security Hub** | Es el **centro de compliance y seguridad** para clientes de AWS | [youtu.be/K7V5kNBjGCI](https://youtu.be/K7V5kNBjGCI) |

---

## 10. Traducción del contenido

### 10.1 Introducción

**Detectá, registrá y alertá sobre configuraciones incorrectas y amenazas potenciales usando controles
detectivos.**

Los **controles detectivos** cumplen un rol crucial en **monitorear e identificar** amenazas de seguridad
potenciales, violaciones de compliance y problemas operativos en todo tu entorno de AWS. A diferencia de los
**controles preventivos**, que buscan **detener los incidentes antes de que ocurran**, los controles detectivos
ayudan a **entender qué está pasando** en tu entorno, **rastrear cambios** e **investigar** preocupaciones de
seguridad o compliance **después de que ocurren**.

Para los Solutions Architects, entender cómo **implementar y aprovechar** servicios detectivos como **AWS
CloudTrail**, **AWS Config**, **Amazon GuardDuty** y **Amazon Security Hub** es esencial para mantener una
**postura de seguridad robusta** y asegurar el **compliance** en workloads empresariales. Exploremos cómo estos
servicios **trabajan juntos** para proveer **visibilidad y control integrales** sobre tu infraestructura de AWS.

### 10.2 Operate

Aprendiste sobre los **controles preventivos** que deben estar en su lugar para asegurar que los recursos estén
**configurados correctamente y sean compliant**. Pero **¿cómo asegurás que esos recursos sigan configurados
correctamente, seguros y compliant?** ¿Podés **identificar y detectar cambios no deseados** en su configuración y
estado de compliance? Y **después de la detección, ¿qué podés hacer al respecto?**

### 10.3 Cuatro aspectos de la agilidad y el control

Hay **cuatro aspectos** para operar con agilidad y control: **monitor, audit, act y operate**.

**1: Monitor.** Primero, querés **monitorear tus recursos y aplicaciones** para tener **visibilidad** de cómo se
están usando y de cómo están rindiendo.

**2: Audit.** Después, querés asegurarte de que tus recursos sean **auditables**. Ítems importantes como la
**configuración de recursos**, **qué usuarios están accediendo** y **qué políticas se están aplicando** deberían
ser auditables.

**3: Act.** A continuación, querés **tomar acción operativa** sobre esos recursos, **administrarlos a escala**,
**agruparlos lógicamente** y **automatizar tareas operativas** de manera segura y protegida.

**4: Operate.** Y querés **seguir administrando y analizando** los recursos **después del aprovisionamiento**
para **mantenerlos compliant** y **mejorar su eficiencia y postura de seguridad**.

### 10.4 Servicios de management

AWS provee una **suite de servicios** que los clientes pueden usar para **implementar gobernanza** en su solución.

**1: Enterprise governance and control.** Usá **AWS Control Tower** y **Organizations** para gobernanza y
control empresarial.

**2: Provisioning and orchestration.** Usá **AWS CloudFormation** y **AWS Service Catalog** para **aprovisionar
y orquestar** recursos en tu entorno.

**3: Monitoring and observability.** Usá **CloudWatch** para monitoreo y observabilidad. Da **datos e insights
accionables** para monitorear tus aplicaciones — y una **vista unificada de la salud operativa**.

**4: Centralized operations management and governance.** Usá **CloudTrail** para **registrar, monitorear y
retener** la actividad de la cuenta relacionada con acciones en AWS. Esto incluye acciones tomadas a través de la
**consola de administración de AWS**, los **SDKs de AWS**, **herramientas de línea de comandos** y **otros
servicios de AWS**. Usá **AWS Config** para **rastrear cambios en la configuración de recursos**. Usá **Systems
Manager** para **administrar tareas operativas**: en lugar de usar distintos toolsets en entornos de nube híbrida,
Systems Manager **centraliza las tareas en un operations cockpit**, con un **toolset común**. Usá **Security Hub**
como **dashboard central** para **administrar alertas de seguridad** y **actuar sobre los findings**. Usá
**GuardDuty** para **identificación de amenazas multi-cuenta** y para **automatizar respuestas a amenazas**.

Examinemos **AWS Config**, **AWS Systems Manager**, **Amazon GuardDuty** y **AWS Security Hub** desde una
**perspectiva de ciclo de vida** y exploremos el rol de cada servicio en el **ciclo de governance**.

Juntos, hacen posible:

- **Definir** reglas de seguridad y requisitos de compliance.
- **Monitorear** la infraestructura **contra** las reglas y requisitos.
- **Detectar** violaciones.
- **Obtener notificaciones en tiempo real**.
- **Actuar** de manera **efectiva y rápida**.

### 10.5 AWS Config

Con AWS Config podés **evaluar, auditar y evaluar** (*assess, audit, and evaluate*) tus configuraciones de AWS.

**Detalles del servicio.** AWS Config **monitorea y registra** las configuraciones de recursos de AWS y
**automatiza la evaluación** de las configuraciones registradas **contra las configuraciones deseadas**.

AWS Config es un **servicio nativo agentless** que **descubre automáticamente** los recursos que existen en una
cuenta. **Registra el estado actual** de las configuraciones de recursos y luego **rastrea los cambios** para un
**registro histórico completo**. Después, **evalúa los cambios de configuración contra políticas de compliance**
con **AWS Config rules**. Las políticas de compliance incluyen **prácticas internas**, **guías de la industria** y
**regulaciones**. AWS Config **envía alertas en tiempo real** por violaciones de compliance usando **Amazon SNS** y
**eventos de Amazon CloudWatch**. AWS Config es un **auditor de configuración en tiempo real en la nube**.

### 10.6 Gobernanza con AWS Config

Para recapitular, hay **dos tipos de guardrails**: **preventive** y **detective**. Las **reglas de AWS Config** se
agregan a los **guardrails detectivos**. Aprendiste que **AWS Control Tower** viene con **múltiples guardrails
activos por default** en AWS Organizations.

**1: Enterprise-wide compliance monitoring.** Como los guardrails, **AWS Config corre sobre AWS Organizations**.
Cuando administrás y gobernás una arquitectura multi-cuenta en múltiples regiones, obtenés **monitoreo de
compliance a nivel empresarial**. También obtenés una **vista agregada** de la configuración y el compliance en
toda tu organización.

**2: Monitoring.** Tanto **AWS Control Tower** como **AWS Config** proveen un **dashboard visual** para monitoreo
que ayuda a **detectar rápido recursos no compliant** y **tomar la acción apropiada**.

**3: Assessment.** El assessment facilita la **auditoría y gobernanza centralizadas** al proveer una **vista
empresarial de recursos y del estado de compliance de las reglas de AWS Config** para evaluación.

**4: Support for third-party resources.** Si invertiste en otras **herramientas de ITSM**, como **ServiceNow**,
podés **agregar datos de AWS Config** a las herramientas de ITSM.

**5: Change management.** Después de agregar datos de AWS Config a una herramienta de ITSM, podés **iniciar tu
proceso de gestión de cambios** de acuerdo con los **workflows existentes**.

**6: Operational troubleshooting.** AWS Config ofrece **troubleshooting operativo con auto-remediation**. Permite
**tomar acción** cuando algo está **en violación de un estado deseado**.

### 10.7 AWS Systems Manager

AWS Systems Manager da **visibilidad y control** de tu infraestructura en AWS.

**Detalles del servicio.** Systems Manager provee una **interfaz de usuario unificada**, así podés **ver datos
operativos de múltiples servicios de AWS**. También te permite **automatizar tareas operativas** en tus recursos de
AWS.

AWS Systems Manager provee una **interfaz de usuario unificada** para que los clientes puedan **ver datos
operativos de múltiples servicios de AWS**. También permite a los clientes **automatizar tareas operativas** en sus
recursos de AWS. Con AWS Systems Manager, los clientes pueden **agrupar recursos por aplicación**, como instancias
**Amazon EC2**, buckets **Amazon S3** o instancias **Amazon RDS**. Pueden **ver datos operativos** para monitoreo
y troubleshooting, y **tomar acción sobre grupos de recursos**. AWS Systems Manager **agiliza la administración de
recursos y aplicaciones**, **acorta el tiempo para detectar y resolver problemas operativos** y **simplifica
operar y administrar la infraestructura de forma segura y a escala**.

**Gobernanza con Systems Manager.** Acá hay features importantes de Systems Manager desde una perspectiva de
gobernanza. *(El contenido de las flashcards no estaba disponible en la fuente compartida.)*

### 10.8 Amazon GuardDuty

Amazon GuardDuty protege cuentas, workloads y datos con **detección y monitoreo inteligente de amenazas**.

**Detalles del servicio.** GuardDuty es un servicio de **detección de amenazas** que **monitorea actividad
maliciosa y comportamiento no autorizado** para proteger cuentas de AWS, workloads y datos almacenados en **Amazon
Simple Storage Service (Amazon S3)**.

Amazon GuardDuty es un servicio de **detección de amenazas** que monitorea **actividad maliciosa y comportamiento
no autorizado**. Protege **cuentas, workloads y datos almacenados en Amazon S3**. Usa **machine learning**,
**detección de anomalías** e **inteligencia de amenazas integrada** para **identificar y priorizar amenazas
potenciales**.

Los clientes habilitan GuardDuty desde la **consola de administración de AWS**, donde **analiza decenas de miles
de millones de eventos** a través de **múltiples fuentes de datos de AWS**. Estos eventos incluyen **logs de
eventos de AWS CloudTrail**, **VPC Flow Logs** y **DNS logs**. Al integrarse con **Amazon CloudWatch Events**, las
alertas de GuardDuty son **accionables**: pueden **agregarse entre múltiples cuentas** y **empujarse a sistemas
existentes de gestión de eventos y workflows**.

**Gobernanza con GuardDuty.**

**Monitoring and threat detection.** GuardDuty **identifica amenazas** monitoreando **actividad de red**, **patrones
de acceso a datos** y **comportamiento de la cuenta** en AWS. Está integrado con **feeds de threat intelligence
actualizados de AWS**, como **CrowdStrike** y **Proofpoint**. La **threat intelligence**, junto con **machine
learning** y **modelos de comportamiento**, ayuda a detectar actividad como **criptominería** y **comportamiento de
compromiso de credenciales**. También podés detectar **acceso a datos no autorizado e inusual**, **comunicación con
servidores command-and-control conocidos** o **llamadas API desde direcciones IP maliciosas conocidas**.

**Security automation.** Además de detectar amenazas, GuardDuty **automatiza cómo responder** a ellas, reduciendo
el **tiempo de remediación y recuperación**. Los findings de GuardDuty son **informativos y accionables** para las
operaciones de seguridad. Los findings incluyen **detalles del recurso afectado** e **información del atacante**,
como **dirección IP y geolocalización**.

**Multi-account support.** GuardDuty provee **soporte multi-cuenta usando Organizations**, así los clientes pueden
**activar GuardDuty en cuentas existentes y nuevas**. Los equipos de seguridad pueden **agregar los findings de una
organización entre cuentas** en una **única GuardDuty administrator account** para una administración más fácil.
Los findings agregados también están disponibles a través de **Amazon EventBridge**, facilitando la integración
con **sistemas empresariales existentes de gestión de eventos**.

**Simplified management.** Cuando se activa GuardDuty, **inmediatamente empieza a analizar flujos de actividad de
cuenta y de red en near real-time y a escala**. **No tenés software, sensores ni appliances de red adicionales**
que desplegar o administrar. La **threat intelligence está preintegrada** en el servicio y se **actualiza y
mantiene regularmente**.

### 10.9 AWS Security Hub

Security Hub es el **centro de compliance y seguridad** para los usuarios de AWS. Con Security Hub podés **ver y
administrar centralmente alertas de seguridad** y **automatizar chequeos de seguridad**.

AWS Security Hub **corre automáticamente chequeos de configuración y seguridad a nivel de cuenta** basados en
**AWS best practices** y **open standards**. **Consolida findings de seguridad entre cuentas y productos de
proveedores** y **muestra los resultados en la consola de Security Hub**. Security Hub también soporta integración
con **Amazon CloudWatch Events**. Para **automatizar la remediación** de findings específicos, los clientes pueden
definir **custom actions** para tomar cuando se recibe un finding.

**Gobernanza con Security Hub.** Acá hay features importantes de Security Hub desde una perspectiva de gobernanza.
*(El contenido de las flashcards no estaba disponible en la fuente compartida.)*

### 10.10 Roles en el proceso de servicio

Todos estos servicios **comparten un rol similar**: hacen posible **configurar tus requisitos de seguridad**,
**monitorear tus recursos según esos requisitos**, **detectar cuándo ocurre una violación** e **iniciar una
remediación**.

**1: AWS Config.** Con AWS Config como **control detectivo**, podés **definir y evaluar políticas de
configuración**. Después **rastrea los cambios**, **detecta cuándo los cambios violan las políticas** y **envía
alertas en tiempo real**. Los clientes pueden configurar AWS Config para que **tome acción** —llamada
**auto-remediation**— cuando ocurren violaciones.

**2: AWS Systems Manager.** Systems Manager **automatiza el compliance de recursos**. Cuando creás recursos
nuevos, como **instancias EC2**, **automáticamente estás en compliance** con tus políticas. Podés **mantener
automáticamente grupos de políticas** en una gran cantidad de recursos mediante **categorización**. Systems Manager
también **automatiza la remediación de problemas**. Se integra con múltiples servicios como **AWS Config**,
**Security Hub** y **GuardDuty**. Cuando cualquiera de los servicios **detecta un problema e inicia una alerta**,
Systems Manager puede **ejecutar la acción de remediación configurada** sobre los **recursos correctos**.

**3: Amazon GuardDuty.** Primero, GuardDuty **ingiere logs de AWS**. Analiza **decenas de miles de millones de
eventos** a través de múltiples fuentes de datos de AWS. Esto incluye **logs de eventos de CloudTrail**, **VPC Flow
Logs** y **logs de Domain Name System (DNS)**. (Generalmente, **los usuarios no pueden acceder a los DNS logs**,
que es algo que **solo GuardDuty provee**.) Segundo, usando **machine learning**, GuardDuty **genera alertas
accionables** que pueden **agregarse entre múltiples cuentas**. Y tercero, las alertas pueden **usarse para
iniciar eventos** como **acciones de remediación**. Estas alertas son **fáciles de mover a sistemas existentes de
gestión de eventos y workflows**.

**4: AWS Security Hub.** Security Hub **agrega findings de servicios y herramientas de seguridad de AWS**, y los
**correlaciona** para **identificar los findings de mayor prioridad**. **Se diferencia de GuardDuty porque acepta
logs de terceros.** Como paso adicional, Security Hub **realiza chequeos automáticos de compliance usando open
standards** y **provee los resultados para remediación**. Finalmente, podés **revisar tus findings en la consola**.
Podés **seleccionar los que necesitan acciones específicas**, como **enviar findings a ticketing, chat, email** o
**remediación automatizada a través de Amazon EventBridge y Lambda**.

---

## 11. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 11.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Config** (compliance de configuración) | **1.2** Prescribir controles de seguridad · **2.3** Controles según requisitos |
| **GuardDuty** (detección de amenazas) | **1.2** · **3.2** Mejorar la seguridad |
| **Security Hub** (agregación y standards) | **1.2** · **3.2** |
| **Systems Manager** (operación y remediación) | **3.1** Excelencia operativa |
| **CloudTrail** (auditoría de API) | **1.2** · **3.1** |
| **Vista multi-cuenta / agregada** | **1.4** Entorno de varias cuentas |

### 11.2 Doce puntos para llevarse

1. **Detectives = registrar, evaluar, alertar**; los preventivos **impiden**.
2. **Config es agentless**, descubre recursos y guarda **historial completo** de configuración.
3. **Config alerta por SNS y CloudWatch events**; evalúa con **Config rules**.
4. **Config corre sobre Organizations** → vista **agregada multi-cuenta y multi-región**.
5. **Config tiene auto-remediation** (punto 6 de governance).
6. **GuardDuty usa CloudTrail, VPC Flow Logs y DNS logs**; el **DNS log** es el dato que **solo** GuardDuty aporta.
7. **GuardDuty detecta comportamiento**: criptominería, credenciales comprometidas, C2, IPs maliciosas.
8. **GuardDuty multi-cuenta** vía Organizations + **administrator account** + **EventBridge**.
9. **Security Hub agrega y correlaciona**; **acepta logs de terceros** (GuardDuty no).
10. **Security Hub corre chequeos con open standards** y envía a **ticketing, chat, email o EventBridge + Lambda**.
11. **Systems Manager** agrupa recursos por aplicación y **ejecuta la remediación** que disparan los otros.
12. El ciclo es **definir → monitorear → detectar → notificar → actuar**.

### 11.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “**Config** detecta amenazas” | Detecta **desviaciones de configuración**, no comportamiento malicioso |
| “**GuardDuty** verifica si un bucket cumple una política” | Eso es **Config**; GuardDuty evalúa **actividad** |
| “**GuardDuty** acepta logs de terceros” | Es **Security Hub** el que los acepta |
| “**Security Hub** bloquea la acción” | **Agrega y alerta**; a lo sumo dispara **remediación** |
| “**CloudTrail** guarda la configuración del recurso” | Guarda **API calls**; la configuración es **Config** |
| “**Systems Manager** es solo para parchear” | También **agrupa**, **automatiza** y **remedia** integrado con Config/Security Hub/GuardDuty |
| “**Config** se activa cuenta por cuenta” | Corre sobre **Organizations** y da **vista agregada** |
| “Los **DNS logs** están disponibles para el cliente” | **Solo GuardDuty** los usa; el cliente **no** los ve |
| “**Security Hub** reemplaza a GuardDuty” | Se **complementan**: GuardDuty genera threat findings, Security Hub los **agrega y prioriza** |

> [!note] Ampliación (no está en la fuente)
> En el módulo anterior, la lección [[BuildingBlocks Videos]] ya había resuelto el caso “notificaciones
> multi-cuenta” con **Security Hub** en lugar de un agregador casero (S3 + Lambda + EventBridge) por **carga
> operativa**. Esta lección confirma el mismo criterio: **usar el servicio administrado** antes que construir el
> agregador propio.

---

## 12. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + *Operate* + *Four aspects* + *Management services* + Config + Systems Manager + GuardDuty + Security Hub + *Service process roles* + recursos | Nota completa (secciones 1–11) |

**Pendiente de la fuente:**

- **“Systems Manager governance”** y **“Security Hub governance”** vienen como **flashcards** y el texto **no
  llegó**. No se completaron con suposiciones: quedan marcadas en §5 y §7 y listadas como pendiente del módulo.

**Decisiones de transcripción:**

- “**Amazon SecurityHub**” (introducción) → **AWS Security Hub**.
- “**guard duty**” (audio) → **GuardDuty**.
- La lección repite el texto de Systems Manager en *service details* y en el transcript: se transcribió **una vez**
  cada versión, sin duplicar.
- Los enlaces de YouTube de *Additional resources* se conservan **literales**.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Establishing Guardrails]] — preventive vs detective, y los estados de cada tipo
- [[Management Controls]] — Service Catalog y el control del despliegue
- [[Governance at Scale]] — los tres focos y el ciclo de compliance
- [[BuildingBlocks Videos]] — Security Hub vs. agregador casero (módulo anterior)
- [[AWS Control Tower]] — guardrails y dashboard (módulo anterior)
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]]
- [[1.4 Diseñar un entorno de AWS de varias cuentas]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]] · [[3.2 Estrategia para mejorar la seguridad]]
- [[Guia AWS]] — pesos y tareas oficiales
