---
title: "Governance at Scale"
aliases:
  - "Governance at scale"
  - "Gobernanza a escala"
  - "Focos de gobernanza"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - governance
  - multi-account
  - costos
  - compliance
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Governance at Scale"
---

# Governance at Scale

> [!abstract] Qué es este archivo
> Primera lección técnica del módulo. **No enseña servicios todavía**: instala el **marco mental** con el que se
> leen todas las lecciones siguientes.
>
> Idea central: la gobernanza a escala se apoya en **tres focos** —**account management**, **security and
> compliance automation** y **budget and cost management**— y funciona por **herencia**: lo que se define en un
> nivel de la jerarquía **baja** a todos los niveles inferiores.

> [!quote] La frase que resume la lección
> **“If I'm not enforcing the rules, the rules are just a suggestion.”**
> Si no se aplican solas, no son reglas.

---

## Resumen en una frase

> Gobernar a escala es **centralizar, estandarizar y automatizar** cuentas, seguridad/compliance y presupuesto,
> aprovechando que las reglas definidas en un nivel de la jerarquía **se heredan hacia abajo**, para ser **ágil
> sin perder control**.

---

## 1. Los tres focos

| # | Foco | La pregunta que responde | Sin esto… |
| --- | --- | --- | --- |
| **1** | **Account management** | ¿Tengo la cantidad correcta de cuentas, con los guardrails que necesito? ¿Cómo agrego y quito cuentas? | Se pierde el control del inventario de cuentas |
| **2** | **Security and compliance automation** | ¿Las reglas se aplican **solas**? ¿Se detecta y **remedia** un desvío? | Las reglas quedan como sugerencias |
| **3** | **Budget and cost management** | ¿Quién gasta qué, cuánto queda y qué pasa cuando se acaba? | Se sobrepasa el presupuesto sin freno |

> [!important] No todos miran los tres
> El instructor lo dice explícito: un grupo puede interesarse **solo** por account management, otro **solo** por
> costos, algunos por **los tres**, y otros **solo necesitan estar al tanto** de lo que se construye aunque no lo
> administren. El diseño tiene que servir a los cuatro perfiles.

---

## 2. Foco 1 — Account management

La gobernanza a escala **centraliza, estandariza y automatiza** el mantenimiento de cuentas. Se implementa con tres
mecanismos:

| Mecanismo | Qué hace | Detalle de la lección |
| --- | --- | --- |
| **Policy automation** | Aplica automáticamente especificaciones estándar a **IAM users, groups y roles** | Hace cumplir seguridad **sin depender de que alguien la configure** |
| **Identity federation** | Centraliza el acceso con **IAM Identity Center** (sucesor de AWS Single Sign-On) | Se integra con IdPs externos como **OpenID** o **Microsoft Active Directory**. Con **CloudTrail**, la actividad del usuario se puede **rastrear entre múltiples cuentas** |
| **Account automation** | Reemplaza procesos manuales usando **templates de despliegue predefinidos** | Esos templates **generan cuentas** para la organización |

### 2.1 El argumento del SSO

Si tenés **10 cuentas de AWS**, no querés **10 juegos de credenciales**. Se estandariza en **una sola solución de
identidad** (SSO) y el acceso se otorga **por rol**, no por cuenta individual.

### 2.2 El argumento de la automatización

> *“The more manual steps that you have in the process, the more room for error that you're introducing.”*

Cada paso manual agrega superficie de error. Preguntarle a la gente “por favor, seguí las reglas” **no produce
buenos resultados**: hay que **estandarizar reglas y guardrails** y hacer que **todo ocurra automáticamente**.

### 2.3 La jerarquía de cuentas

El ejemplo de la lección:

| Nivel | Qué contiene |
| --- | --- |
| **Cuenta principal de la compañía** | Controles de alto nivel: **billing**, **support** |
| **OUs** | “Como carpetas”: se agrupan cuentas y recursos relevantes |
| **Equipos** | engineering · research · front end · back end · database |
| **Grupos** | Subdivisiones dentro de cada equipo |
| **Cuentas** | El nivel donde finalmente viven los workloads |

```
Compañía (billing / support)
└── OU
    ├── Equipo A (engineering)
    │   └── Grupo → Cuentas
    ├── Equipo B (research)
    ├── Equipo C (front end)
    ├── Equipo D (back end)
    └── Equipo E (database)
```

> [!tip] Por qué importa la jerarquía
> La jerarquía existe **para colgar reglas de cada capa**. Si la estructura es plana, no hay dónde aplicar una
> política que afecte solo a un conjunto de cuentas. La lección lo dice: *“this kind of hierarchy is going to be
> important because… we'll talk about creating rules for these different layers”*.

---

## 3. Foco 2 — Security and compliance automation

**Automatizar es la clave.** Sin automatización, cumplir con lo que se crea es muy difícil. El ciclo que describe
la lección:

```
Reglas establecidas  →  aplicación automática  →  desvío detectado  →  notificación  →  remediación automática
```

Los **tres objetivos** de este foco:

| Objetivo | Qué significa | Ejemplo de la lección |
| --- | --- | --- |
| **Identity and access automation** | Otorgar acceso **por rol definido por la compañía**, no por cuenta individual | Agregar acceso a un servicio **a nivel de OU** y que aplique a **todas las cuentas** de ese nivel |
| **Security automation** | Automatizar tareas de seguridad y **evaluaciones de compliance** con **templates** | El sistema puede **revocar el acceso** a usuarios no autorizados |
| **Policy enforcement** | Aplicar políticas sobre **Regions**, **servicios** y **configuraciones de recursos** | Se impide aprovisionar un **bucket S3** sin los permisos correctos |

### 3.1 Identity and access automation

Se apoya en lo que ya se vio: **IAM Identity Center**, **OpenID** y **Active Directory**. La diferencia clave es
**el sujeto del permiso**:

| Modelo | Cómo se otorga |
| --- | --- |
| ❌ **Por cuenta individual** | “Este usuario tiene permiso en esta cuenta” |
| ✅ **Por rol** | “Este rol tiene estos privilegios según las políticas de la organización” |

### 3.2 Security automation

Los procesos manuales **no escalan** y no siguen el ritmo del negocio. La automatización se apoya en **security
templates** alineados con los requisitos de seguridad y compliance de la organización **y con la regulación legal
aplicable**.

Beneficios que enumera la lección:

1. **Menos tiempo de implementación** — los templates garantizan que servicios y proyectos nazcan **seguros y
   compliant**.
2. **Mayor capacidad de reacción** ante una violación de política — por ejemplo, **revocar acceso** a usuarios no
   autorizados.

### 3.3 Policy enforcement

Se aplica a **Regions**, **servicios** y **configuraciones de recursos**, y puede hacerse a **nivel organizacional
o a nivel de recurso**, según **roles, responsabilidades y regulaciones** (**HIPAA**, **FedRAMP**, **PCI DSS**).

> [!important] Por qué esto es gobernanza y no “una regla más”
> *“If I'm not enforcing the rules, the rules are just a suggestion.”*
> La diferencia entre un documento de políticas y **gobernanza** es que la gobernanza **impide** la acción.
> El ejemplo del S3 lo deja claro: el recurso **no se crea**, no se crea y después se marca.

---

## 4. Foco 3 — Budget and cost management

Se divide en **planificación** y **enforcement**.

### 4.1 Budget planning

| Elemento | Qué resuelve |
| --- | --- |
| **Asignación** | Repartir el presupuesto disponible **desde una fuente de financiamiento** entre las partes de la organización |
| **Subdivisión** | Bajar ese monto a **cada capa, departamento o proyecto** |
| **Visibilidad** | **Dashboards financieros** con información **en tiempo real**, durante toda la vida de la fuente de fondos |
| **Decisión** | Que líderes y staff tomen decisiones **proactivas y bien informadas** |

El ejemplo del instructor con números:

```
Presupuesto total AWS del año:  $1.000.000
Operaciones:                    3/4 de eso  (75 %)
Equipo B:                       su monto, en su cuenta
Debajo:                         monto en dólares por proyecto individual
```

### 4.2 Budget enforcement

> **Planificar sin cortar el gasto es solo una intención.** *“If we're not cutting users off once they've spent
> all of their money, it's easy to overspend.”*

| Mecanismo | Cómo se implementa |
| --- | --- |
| **Alertas por umbral** | Notificar al equipo al llegar al **20 %, 30 %, 50 % y 80 %** de utilización del gasto |
| **Corte al llegar al techo** | **No se crean más recursos** hasta revisar y ajustar de dónde sale ese gasto |
| **Restricción por tipo de recurso** | Permitir “todas las **T3 micro** que quieras”, pero **negar** el acceso a recursos de cómputo más grandes |

La lectura agrega el catálogo de **acciones de enforcement** que el sistema puede tomar:

1. **Restringir** el uso de recursos de AWS a los que **cuestan menos que un precio especificado**.
2. **Throttling** del aprovisionamiento de recursos nuevos.
3. **Apagar, terminar o desaprovisionar** recursos de AWS **después de archivar configuraciones y datos** para uso
   futuro.

> [!warning] El orden importa
> En la tercera acción, el archivado de **configuraciones y datos** ocurre **antes** del apagado. Destruir sin
> archivar no es “enforcement”, es pérdida de datos.

---

## 5. El ejemplo completo: jerarquía, compliance y fondos

### 5.1 Organizational hierarchy

Una empresa típica tiene **capas y departamentos** con roles, responsabilidades y requisitos de seguridad y
compliance **distintos**. Cada capa contiene **OUs** con requisitos **técnicos, financieros, de reporte y de
seguridad** diferentes. La guía de AWS funciona **con la estructura y los procesos que ya existen**, y permite:

- instituir **políticas** o **ajustar presupuestos** de compañía y de proyecto según **prioridades de misión** y
  **patrones de uso**;
- **propagar** esas políticas por toda la organización.

### 5.2 Security and compliance: cómo fluyen los guardrails

**Guardrail** = regla de gobernanza **preempaquetada** de seguridad, operaciones y compliance, que se elige y se
aplica a toda la empresa o a **grupos específicos de cuentas**.

| Dónde se define | Alcance |
| --- | --- |
| **Nivel superior** | **Cascada a todos** los niveles de abajo |
| **Nivel intermedio** | Solo los niveles **debajo** de ese nivel |
| **Nivel inferior** | Solo ese nivel y lo que cuelga de él |

> [!important] La regla de la herencia
> Los guardrails **se heredan hacia abajo, nunca hacia arriba**. Eso es lo que permite aplicar **HIPAA** a toda la
> organización desde el nivel ejecutivo, o **FedRAMP** a un grupo y **PCI DSS** a otro, **sin** aplicar niveles
> extra de compliance donde no hacen falta.

Ejemplo del instructor:

| Nivel | Guardrail aplicado | Efecto |
| --- | --- | --- |
| **Nivel ejecutivo / compañía** | **HIPAA** | Se transmite a **todas** las cuentas de abajo → organización HIPAA-compliant |
| **Grupo X** | **FedRAMP** | Solo ese grupo y sus descendientes |
| **Grupo Y (debajo de X)** | **PCI DSS** | Se suma a lo heredado; no se aplica al resto |

### 5.3 Budget and cost management en la jerarquía

La interfaz y el subsistema que cumple los criterios de governance at scale permiten a los líderes:

1. **Asignar fondos**.
2. **Asignar presupuestos** por capa.
3. **Monitorear el consumo de recursos casi en tiempo real**.

---

## 6. Self-check de la lección

> **Pregunta:** se implementa un **security guardrail** en el nivel **intermedio** de una jerarquía organizacional
> llamado **Management**. ¿Qué impacto tiene ese guardrail sobre los otros niveles de la organización?

**Respuesta:** afecta a **Management y a todos los niveles por debajo** de él. **No** afecta a los niveles
superiores.

| Nivel | ¿Afectado? | Por qué |
| --- | --- | --- |
| Por encima de Management | ❌ **No** | La herencia es **solo hacia abajo** |
| **Management** | ✅ Sí | Es donde se definió la regla |
| Por debajo de Management | ✅ Sí | **Heredan** el guardrail |

> [!note] Sobre las opciones
> En Skill Builder las opciones de esta pregunta son **imágenes**, así que no se transcriben. La respuesta surge
> de la regla explícita de la lectura: *“If you implement it at a lower level, only the levels below that level
> inherit the guardrail.”*

---

## 7. Traducción del contenido

### 7.1 Transcript (duración: 7 minutos 52 segundos)

Veamos tres áreas de enfoque que vamos a querer tener en cuenta mientras hablamos de servicios en este curso.

La primera es la **gestión de cuentas**. Esto es asegurarme de que tengo la **cantidad correcta de cuentas**, que
están administradas con los **guardrails** que necesito tener, y básicamente que **todos siguen las reglas**. Esto
también va a presentar el desafío de **cómo agrego cuentas nuevas o elimino cuentas viejas**, porque ese número
siempre va a estar cambiando.

Ahora, cuando se trata de **seguridad y compliance**, la **automatización es clave**. Si no tenés automatización,
va a ser difícil tener compliance con lo que estás creando. Necesitás asegurarte de que las **reglas estén
establecidas** y luego se **apliquen automáticamente**. Así, si algo sale de compliance, podemos **ser
notificados** y **remediar el problema automáticamente**.

Y finalmente, el **presupuesto y el costo** siempre son importantes. Las cosas cuestan dinero y solo tenemos un
presupuesto limitado. ¿Cómo nos aseguramos de estar gastándolo con criterio y de tener **visibilidad** para saber
**adónde va el dinero** y, cuando se acaba, tener la configuración para **evitar que nuestra arquitectura
sobrepase el gasto**?

Ahora, distintos usuarios van a tener distintos focos. Un grupo puede estar interesado **solo** en la gestión de
cuentas y otro **solo** en la gestión de costos. A veces vas a tener grupos que administran **los tres**, u otros
usuarios que simplemente necesitan **estar al tanto** de lo que estamos construyendo, aunque no lo administren
ellos mismos.

Para la gestión de cuentas, la **automatización de políticas** es importante. Necesitamos **estandarizar nuestras
reglas y guardrails** en las cuentas, y vamos a ver eso un poco más adelante en este curso. También necesitamos
asegurarnos de que **todo ocurra automáticamente**, porque **pedirle a los usuarios que sigan las reglas no va a
dar buenos resultados**.

Para las cuentas de usuario vamos a necesitar algún tipo de solución de **single sign-on (SSO)**. Esto significa
que, si tengo **10 cuentas de AWS distintas**, no tengo que tener **10 conjuntos de credenciales distintos**.
Queremos estandarizar con **una sola solución de identidad**. Y también, como dije, necesitamos asegurarnos de que
todo va a estar **automatizado**, o al menos tanto como sea posible. **Cuantos más pasos manuales tengas en el
proceso, más margen de error estás introduciendo.**

Esto es un ejemplo de organización que podrías ver. Arriba tenemos nuestra **cuenta principal de la compañía**.
Esta podría ser la cuenta que controla cosas como **facturación** u otras funciones de alto nivel como **soporte**.
Debajo vamos a empezar a crear **unidades organizacionales u OUs**. Podemos pensar en una OU **como una carpeta**:
tomamos todos nuestros recursos o cuentas relevantes y las agrupamos. Quizá tenemos nuestros equipos de
**ingeniería**, equipos de **investigación**, equipo de **front end**, equipo de **back end** y equipo de **base de
datos**. Y debajo hay **distintos grupos** también, antes de llegar finalmente a las **cuentas** reales.

Este tipo de jerarquía va a ser importante porque en un momento vamos a hablar de **crear reglas para estas
distintas capas**. Pero este es el tipo de estructura que vas a querer adoptar, aunque no sea exactamente esta,
cuando empieces a diseñar tus propias cuentas de AWS.

Ahora, la **automatización de seguridad y compliance**: cuando se agrega un usuario nuevo a un grupo, no quiero
tener que entrar y darle acceso a todos los recursos. No necesito saber que hay un desarrollador nuevo y que hay
que aplicarle un conjunto X de políticas nuevas. **Solo quiero que ocurra cuando se lo agrega al grupo correcto.**

Con la automatización de seguridad, la **auditoría** y la **revisión** tienen que hacerse automáticamente. No tengo
tiempo para entrar y revisar **cada recurso** para asegurarme de que estoy cumpliendo con mi compliance de **PCI** o
**HIPAA**. Y para el **enforcement**, bueno, tiene que ocurrir. **Si no estoy aplicando las reglas, las reglas son
solo una sugerencia**, y entonces no son realmente reglas. ¿O sí?

Para nuestra arquitectura, podemos aplicar **distintos guardrails o distintos niveles de compliance** según
nuestras necesidades individuales. Cuando aplicamos, por ejemplo, el nivel **HIPAA** en ese nivel ejecutivo de la
compañía, eso va a **gotear hacia abajo** a todas las demás cuentas. Entonces, **en el nivel donde se establecen
los guardrails, se transmiten hacia abajo**. Esto significa que podemos asegurar que **toda la organización** sea
HIPAA-compliant.

Ahora, quizá hay un escenario donde algunos recursos necesitan ser **FedRAMP** y otros necesitan ser **PCI
compliant**, pero **no todos**, y no querríamos aplicar niveles extra de compliance donde simplemente no hacen
falta. Entonces puedo decir selectivamente: **quiero que este grupo sea FedRAMP, pero quiero que ese grupo debajo
sea PCI compliant**. Y una vez más, esos guardrails, esas reglas de compliance, **gotearán desde el nivel donde se
aplican por primera vez hacia todo lo que está debajo**. Así que tenés **control granular** para decir qué tiene
sentido para vos en tus cuentas.

Cuando se trata de **planificar un presupuesto**, es importante **tener un plan**. Necesitamos poder mirar nuestras
cuentas y **dividir claramente cuánto dinero tenemos y quién recibe qué**. Quiero poder decir: **cuenta X, ese
equipo recibe X cantidad de dinero; cuenta Y, vos recibís esta cantidad**. Y necesito poder **ver cuánto se gastó
hasta ese momento**.

Ahora, **si no cortamos a los usuarios una vez que gastaron todo su dinero, es fácil sobrepasarse** y no queremos
que eso pase. Así que necesitamos dar **el paso siguiente y crear esa acción de enforcement**. Y podemos hacerlo
dentro de nuestras cuentas. Puedo configurar **alertas** para notificar al equipo cuando estamos al **20, 30, 50,
80 %** de utilización de nuestro gasto. Y cuando llegamos al número tope, podemos decir **no se van a crear más
recursos** hasta que volvamos y quizá ajustemos de dónde sale ese gasto.

Incluso podemos **restringir qué pueden crear los usuarios**. Podemos decir: **sí, podés crear todas las T3 micro
que quieras, pero no tenés acceso a algunos de esos recursos de cómputo más grandes**. Depende de vos definir
**tanto el plan como los pasos de enforcement**.

Ahora podemos ver cómo se ve esto en nuestra estructura de cuentas: puedo decir que en el nivel superior tengo un
**presupuesto de 1 millón de dólares** para AWS este año. Mi equipo de operaciones recibe **3 cuartos de eso**
(75 %). **Team B** recibe su cuenta con un número, y debajo puedo definir un **monto en dólares por proyecto
individual**. Puedo asignar estos fondos y puedo configurar los **monitores y las reglas** sobre cuánto va a ser
ese gasto.

Entonces, ¿qué cubrimos en este módulo? Bueno, miramos algunas de las **complejidades** que podés encontrar cuando
empezás a crear más y más cuentas y arquitectura en la nube, y **cómo empezar a reducir esas complejidades y
envolver con gobernanza todo lo que creamos**. Hablamos de **equilibrar esa gobernanza y esa agilidad** para
asegurarnos de tener las reglas que necesitamos **y también la velocidad** para desarrollar e innovar para nuestros
clientes.

### 7.2 Focal Points

Dentro de una estructura organizacional empresarial, distintas unidades (o departamentos) tienen **necesidades y
responsabilidades distintas**. En algunos casos quizá recién estés empezando tu camino a la nube y quieras
**aprovisionar servicios nuevos**. En otros casos quizá ya tengas una **huella de nube existente**, donde intentás
**administrar y gobernar** de manera efectiva tus recursos, servicios, productos e infraestructura. Cada caso
requiere **financiamiento a través del departamento correcto**, manteniéndose **dentro del presupuesto** y
manteniendo una **buena postura de seguridad**.

La gobernanza a escala se enfoca en **tres áreas principales** para ayudarte a cubrir estas necesidades y cumplir
tus requisitos de seguridad:

- Gestión de cuentas
- Automatización de seguridad y compliance
- Gestión de presupuesto y costos

#### 1. Gestión de cuentas

Para entender los focos, empezá pensando en la **gestión de cuentas**. Los procesos de gobernanza a escala
**agilizan la gestión de cuentas** en múltiples cuentas y workloads de tu empresa mediante la **centralización**,
la **estandarización** y la **automatización** del mantenimiento de cuentas. Esto se logra mediante
**automatización de políticas**, **federación de identidades** y **automatización de cuentas**.

**1: Automatización de políticas.** La automatización de políticas **hace cumplir la seguridad** aplicando
automáticamente **especificaciones estándar** a los **usuarios, grupos y roles de AWS Identity and Access
Management (IAM)**.

**2: Federación de identidades.** La federación de identidades usa **AWS IAM Identity Center (sucesor de AWS
Single Sign-On)** para **simplificar el acceso de usuarios**. Se integra con **proveedores de identidad externos**,
como **OpenID** o **Microsoft Active Directory**. Cuando se usa IAM Identity Center con **CloudTrail**, la
actividad del usuario se puede **rastrear entre múltiples cuentas de AWS**.

**3: Automatización de cuentas.** La automatización de cuentas **reemplaza los procesos manuales** usando
**templates de despliegue predefinidos** que **generan cuentas** para una organización.

#### 2. Automatización de seguridad y compliance

Recordá: querés ser **ágil, compliant y seguro**. Para lograr estos objetivos **a escala**, los procesos manuales
**no son confiables**. La **automatización es fundamental** para una implementación exitosa.

Las prácticas de seguridad y compliance de la gobernanza a escala consisten en **tres objetivos principales**:
**automatización de identidad y acceso**, **automatización de seguridad** y **enforcement de políticas**.

**Automatización de identidad y acceso.** Podés usar algunas de las capacidades y servicios mencionados antes, como
**AWS IAM Identity Center (sucesor de AWS Single Sign-On)**, **OpenID** y **Active Directory**, para otorgar
acceso automáticamente a recursos **según roles definidos por tu empresa** en lugar de cuentas individuales. Podés
acceder a tus recursos según los **privilegios de tu rol**, definidos por las políticas de la organización. El
acceso a servicios nuevos se puede agregar **a nivel de unidad organizacional (OU)**, y los cambios se aplican a
**todas las cuentas de la nube de ese nivel**.

**Automatización de seguridad.** Los procesos manuales **no escalan bien** y no pueden seguir el **ritmo acelerado
de un negocio en crecimiento**. Para mantener una postura segura **a escala**, las tareas de seguridad y las
**evaluaciones de compliance** también requieren automatización. La automatización de estas tareas se apoya en
**security templates** alineados con los requisitos de seguridad y compliance de tu organización, así como con las
**regulaciones legales aplicables**.

La automatización da como resultado **tiempos de implementación más cortos**, porque los templates aseguran que
servicios y proyectos estén **automáticamente seguros y compliant**. También podés ser **más reactivo cuando
ocurre una violación de política**. Por ejemplo, el sistema puede **revocar el acceso** a usuarios que no están
autorizados a acceder a ciertos servicios.

**Enforcement de políticas.** La guía de AWS para lograr gobernanza a escala te ayuda a conseguir **enforcement de
políticas** para **regiones de AWS**, **servicios de AWS** y **configuraciones de recursos**. Las políticas se
aplican **en distintos niveles**, ya sea a nivel **organizacional** o a nivel de **recurso**. El enforcement se
basa en **roles, responsabilidades y regulaciones de compliance** (como **HIPAA**, **FedRAMP** y **PCI DSS**). El
sistema da **suficiente flexibilidad** para aplicar estas reglas **en cada nivel de la jerarquía**. Por ejemplo, si
un usuario intenta aprovisionar un **bucket de Amazon S3** sin el nivel correcto de permisos, el enforcement de
políticas **impide que se aprovisionen elementos no aprobados**.

#### 3. Gestión de presupuesto y costos

Las prácticas de **planificación de presupuesto** y **enforcement** ayudan a líderes y staff a **asignar y
administrar presupuestos** para múltiples cuentas de AWS y a **definir acciones de enforcement**. Con gobernanza a
escala, los líderes pueden tomar **decisiones proactivas y bien informadas** en materia de **control y asignación
de presupuesto** en toda la organización.

**Planificación de presupuesto.** La planificación de presupuesto ayuda a los **dueños financieros** a asignar y
subdividir el presupuesto disponible de una **fuente de financiamiento** determinada, de manera apropiada, en toda
la organización. Los **dashboards financieros** dan a los tomadores de decisión **información en tiempo real**
durante toda la vida de la fuente de financiamiento.

**Enforcement de presupuesto.** El enforcement de presupuesto es un **componente clave** de la gobernanza a escala.
**Cada capa, departamento o proyecto** de una organización normalmente tiene **necesidades y límites
presupuestarios distintos**. El marco de gobernanza ayuda a la organización a **asignar el presupuesto** y
**definir los límites**, a la vez que **monitorea el gasto**. Este monitoreo ocurre **en tiempo real**, y el
sistema puede **notificar proactivamente** a los interesados y **comenzar acciones de enforcement**.

Parte de esa automatización incluye:

- **Restringir el uso de recursos de AWS** a los que **cuestan menos que un precio especificado**.
- **Limitar (throttling)** el aprovisionamiento de recursos nuevos.
- **Apagar, terminar o desaprovisionar** recursos de AWS **después de archivar configuraciones y datos** para su
  posible uso futuro.

### 7.3 Ejemplo de gobernanza a escala

**Jerarquía organizacional.** La jerarquía de una organización empresarial típica tiene **distintas capas y
departamentos**, que pueden tener **roles, responsabilidades y requisitos de seguridad y compliance variados**. AWS
proporciona una guía para lograr gobernanza a escala que **funciona con tu estructura y procesos de negocio
existentes**.

Cada capa contiene **OUs** que pueden tener **requisitos técnicos, financieros, de reporte y de seguridad
distintos**. Las empresas pueden **instituir políticas** o **ajustar presupuestos** de compañía y de proyecto
según **prioridades de misión** y **patrones de uso**. Pueden **propagar las políticas** por toda la organización.

**Seguridad y compliance.** Este ejemplo ilustra cómo los **guardrails** de seguridad y compliance **fluyen a
través de una jerarquía**. Los guardrails son **reglas de gobernanza preempaquetadas** de seguridad, operaciones y
compliance que los clientes pueden seleccionar y aplicar **en toda la empresa o a grupos específicos de cuentas**.
Podés establecer guardrails **en cualquier nivel**. Sin embargo, cuando un guardrail se configura en un nivel
específico, **todos los niveles por debajo heredan la aplicación del guardrail**. Las reglas se aplican a **todos
los niveles de la OU** donde se configura el guardrail.

- Si implementás un guardrail **en el nivel superior**, **se propaga a todos los niveles** por debajo.
- Si lo implementás **en un nivel inferior**, **solo los niveles por debajo de ese nivel** heredan el guardrail.
- Así que tenés la capacidad de configurar un guardrail **en el nivel correcto**, según tus requisitos.

**Presupuesto y gestión de costos.** Este ejemplo demuestra cómo se apoya el **presupuesto y la gestión de costos**
a través de la estructura organizacional. Una **interfaz y un subsistema** que cumple con los criterios de
gobernanza a escala ayuda a los líderes a **asignar financiamiento**, **asignar presupuestos** y **monitorear el
consumo de recursos casi en tiempo real**.

---

## 8. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 8.1 A qué tareas responde

| Concepto de la lección | Tarea del examen |
| --- | --- |
| **Account management**, OUs, jerarquía, automatización de cuentas | **1.4** Diseñar un entorno de AWS de varias cuentas |
| **Policy automation**, **policy enforcement**, guardrails | **1.2** Prescribir controles de seguridad · **2.3** Controles según requisitos |
| **Identity federation**, SSO, acceso por rol | **1.2** · **1.4** |
| **Budget planning / enforcement**, alertas, visibilidad | **1.5** Estrategias de optimización de costos y visibilidad · **2.6** |
| **Automatización y detección/remediación** | **3.1** Excelencia operativa · **3.2** Mejorar la seguridad |

### 8.2 Diez puntos para llevarse

1. **Tres focos**: account management · security and compliance automation · budget and cost management.
2. **Herencia unidireccional**: un guardrail aplica al nivel donde se define **y a todo lo que está debajo**,
   **nunca** hacia arriba.
3. **Estandarizar + automatizar** es lo que convierte una regla en gobernanza.
4. **Políticas sin enforcement son sugerencias** — la frase que el examen premia y castiga.
5. **SSO**: una identidad para N cuentas, no N juegos de credenciales.
6. **Acceso por rol**, no por cuenta individual; el permiso se agrega **a nivel de OU** y baja.
7. **Federación + CloudTrail** = trazabilidad de la actividad **entre cuentas**.
8. **Account automation** = **templates de despliegue** que **generan cuentas**.
9. **Budget enforcement** tiene tres acciones: **restringir por precio**, **throttling** de provisioning y
   **apagar/terminar/desaprovisionar** — **archivando primero**.
10. **Gobernanza ≠ lentitud**: el objetivo es **agilidad con control**, no burocracia.

### 8.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| **“Aplicar el guardrail a toda la organización” para un requisito de un solo equipo** | La herencia permite **granularidad**: se define en el nivel correcto y baja solo a lo que corresponde |
| **“Configurar la regla y avisar por mail”** | Sin **enforcement** no hay gobernanza: la regla es una sugerencia |
| **“Cada equipo administra sus propias credenciales”** | Contradice **identidad federada** y multiplica el error |
| **“Alertar al 100 %”** | Las alertas sirven **antes** del techo (20/30/50/80 %); al llegar al tope hay que **frenar**, no avisar |
| **“Apagar los recursos para ahorrar”** sin archivar | La lección exige **archivar configuraciones y datos** antes de apagar/terminar |
| **“La gobernanza frena la innovación”** | El instructor cierra con lo contrario: **balance entre gobernanza y agilidad** |
| **“Un guardrail definido en un nivel bajo afecta a toda la empresa”** | Solo afecta **hacia abajo** desde donde se definió |

> [!note] Ampliación (no está en la fuente)
> Los mecanismos concretos de AWS para cada foco aparecen en las lecciones siguientes, pero para ubicarse:
> **SCPs** implementan el *policy enforcement* preventivo; **AWS Config** + **Security Hub** cubren la
> **detección**; **Control Tower** aporta los **guardrails** preempaquetados; **AWS Budgets** con *budget actions*
> ejecuta el enforcement de costos. La lección no nombra estos servicios todavía.

---

## 9. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: transcript (7:52) + *Focal Points* + *Governance at Scale Example* + self-check | Nota completa (secciones 1–8) |

**Decisiones de transcripción:**

- El transcript es **hablado**: se transcribió el contenido sin “corregir” el estilo del instructor.
- Las opciones del **self-check** son **imágenes** en la fuente → no se transcriben; la respuesta se deriva de la
  regla explícita de la lectura y se marca como tal.
- Los porcentajes del ejemplo (**20/30/50/80 %**) y el presupuesto (**$1.000.000**, **3/4 = 75 %**) se transcriben
  literales. En el audio, *“2030, 50, 80”* suena como una sola cifra: se interpretó como la secuencia
  **20 · 30 · 50 · 80 %**, que es lo que describe el resto de la frase.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Course Overview]] — objetivos del curso y servicios que va a tocar
- [[COMPACT - Estado del estudio]] — método y estado general
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — cuenta principal, OUs, jerarquía
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]] — policy enforcement y guardrails
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — budget planning y enforcement
- [[3.1 Estrategia para mejorar la excelencia operativa general]] — automatización y operación
- [[AWS Organizations and IAM Identity Center]] — OUs, SCPs, Identity Center (módulo anterior)
- [[AWS Control Tower]] — guardrails preempaquetados y Account Factory (módulo anterior)
- [[Guia AWS]] — pesos y tareas oficiales
