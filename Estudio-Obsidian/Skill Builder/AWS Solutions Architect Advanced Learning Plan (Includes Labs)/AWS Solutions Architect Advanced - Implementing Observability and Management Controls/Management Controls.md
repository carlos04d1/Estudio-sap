---
title: "Management Controls"
aliases:
  - "Management controls"
  - "Controles de administración"
  - "AWS Service Catalog"
  - "Service Catalog"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - governance
  - service-catalog
  - control-tower
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Management Controls"
---

# Management Controls

> [!abstract] Qué es este archivo
> Cuarta lección del módulo. Baja la gobernanza a la **operación diaria**: cómo darle a un developer
> **autoservicio** sin perder **control**. La herramienta central es **AWS Service Catalog**.
>
> Idea central: **el desarrollador no debería tener que adivinar qué está permitido**. Se le ofrece un
> **catálogo de productos aprobados** y todo lo que despliegue desde ahí ya está **en política, tagueado y dentro
> de presupuesto**.

> [!quote] La tensión que resuelve
> **Velocidad y autoservicio** (lo que pide el developer) **vs.** seguridad, compliance, gobernanza y presupuesto
> (lo que pide la organización). No tienen que pelear: **Service Catalog las hace trabajar juntas**.

---

## Resumen en una frase

> Los **management controls** son las herramientas de gobernanza que **estandarizan el despliegue**, **hacen
> cumplir el compliance** y **mantienen la eficiencia operativa**; **AWS Service Catalog** los materializa en un
> **catálogo central de productos aprobados** que el usuario despliega **solo**, sin acceso directo a los
> servicios de base.

---

## 1. Qué son los management controls

| Concepto | Definición de la lección |
| --- | --- |
| **Management controls** | Herramientas de gobernanza que ayudan a las organizaciones a **estandarizar el despliegue de recursos**, **hacer cumplir el compliance** y **mantener la eficiencia operativa** en todo el entorno de AWS |
| **Rol del Solutions Architect** | Diseñar soluciones que **balanceen agilidad con control** |
| **Pieza clave** | **AWS Service Catalog**: portafolios de servicios estandarizados con **autoservicio** y **compliance** |

> [!important] La frase que define el diseño
> *“You'll need to design and implement solutions that balance agility with control.”*
> Si una opción del examen da autoservicio **sin** control, o control **sin** autoservicio, está incompleta.

---

## 2. El problema: Grace y el menú infinito

**Grace** es la developer del ejemplo. Acaba de iniciar sesión y se encuentra con “un millón de servicios y un
millón de preguntas”:

| Pregunta que se hace Grace | Riesgo si adivina |
| --- | --- |
| ¿Qué servicios puedo usar? | Usar servicios restringidos |
| ¿Qué parte de los servicios está OK y qué no? | Violar políticas |
| ¿Qué sistemas operativos hay? | Incumplir requisitos de licenciamiento |
| ¿Qué **AMIs** puedo elegir? | Desplegar imágenes no aprobadas |
| ¿Qué **tipos de volumen**? | Incumplir compliance |
| ¿Qué **puertos** deben estar abiertos? | Exposición de seguridad |

Si tiene que **buscar manualmente** cada regla para cumplirla, el proceso es **frustrante** para ella **y para la
organización**.

> **Lo que hay que darle:** un entorno donde **sepa qué se le pide** y **cuáles son los límites** dentro de los
> que puede trabajar.

### 2.1 Qué pasa con acceso total (escenario “current state”)

Grace tiene una cuenta de developer (dedicada o compartida) con **acceso total de autoservicio**. Puede entrar a
la consola y **acceder a todo**:

- servicios y recursos que **no sabe usar ni configurar**;
- servicios **restringidos** a los que **no debería** acceder;
- trabajo **sin guía ni gobernanza**.

Necesita un servidor para experimentar, correr aplicaciones y probar una base de datos, más acceso a internet.
Y tiene que decidir sola: **SO y versión** (licenciamiento), **tipo de instancia EC2**, **motor de base de datos y
su costo**, **tipo de volumen** (compliance), **cómo crear una VPC segura y compliant**, **qué puertos abrir**.

**Consecuencias que enumera la lección:**

| Consecuencia | Qué significa |
| --- | --- |
| **Procesos que consumen tiempo** | Cada decisión requiere investigación |
| **Best practices sin enforcement** | Nada garantiza que se sigan |
| **Procesos de IT no estándar** | Diseñados por otros departamentos |
| **Brecha de seguridad o de datos** | Por **misconfiguración** de recursos |
| **Gasto fuera del presupuesto asignado** | Se aprovisiona sin control de costo |

> **La conclusión:** sería más eficiente **si sus opciones estuvieran preconfiguradas**. El autoservicio **no es
> “acceso total”**: es **acceso a lo aprobado**.

---

## 3. AWS Service Catalog

**Definición de la lección:** provee **un solo lugar** para **administrar centralmente catálogos de recursos
preaprobados**, agrupados como **productos**.

| Aspecto | Detalle |
| --- | --- |
| **Rol en governance at scale** | Sostiene el modelo, **especialmente el paso de *provision*** (aprovisionamiento) |
| **Qué permite** | Desplegar y administrar infraestructura y aplicaciones que **cumplen** las políticas de seguridad y operativas |
| **Cómo** | **Haciendo cumplir la estandarización** y **manteniéndose dentro del presupuesto** |
| **Base** | Es un **IT service catalog** que administra **servicios AWS aprobados** |

### 3.1 Los tres conceptos de la lectura

| # | Concepto | Definición |
| --- | --- | --- |
| **1** | **IT service catalog** | **ITIL** (*Information Technology Infrastructure Library*) lo define como un **servicio estructurado** usado para la **gestión, el despliegue y el mantenimiento** de servicios puestos a disposición de los clientes |
| **2** | **Governance at scale** | Metodología que aborda **account management**, **cost control** y **security and compliance** mediante **automatización** |
| **3** | **AWS Service Catalog** | **IT service catalog** que permite **administrar centralmente** los servicios AWS de uso común y **aprovisionar productos de software**; da **gobernanza y compliance consistentes** y deja que los usuarios desplieguen **servicios aprobados rápido y con autoservicio** |

---

## 4. Los objetivos de una solución de autoservicio

| # | Objetivo | Qué implica |
| --- | --- | --- |
| **1** | **Las personas correctas tienen acceso a los servicios correctos** | Según los **roles establecidos**, y de forma **automática** |
| **2** | **Los servicios se usan conforme a políticas, reglas de seguridad y compliance** | No alcanza con documentarlo |
| **3** | **Todo se rastrea** —incluido el **patching**— para monitorear **uso, versión del producto y costos** | Sin tracking no hay forma de saber si se cumple |

> [!important] El objetivo 3 es el que se olvida
> **Tracking incluye patching, versión del producto y costo.** Si no se rastrea, *“we don't really have an idea”*
> — y eso es exactamente lo que arruina una auditoría.

### 4.1 Estado nuevo: el portafolio

Cuando Service Catalog está implementado, Grace ve **una lista de productos y servicios** definidos por la
organización. El **portafolio** contiene:

- **servicios de AWS**;
- **productos de terceros** del **AWS Marketplace**;
- **productos propios** de la organización.

Y se puede:

1. **Otorgar acceso** a productos y portafolios a los **usuarios, roles o grupos correctos**.
2. Definir productos con **infraestructura como código**: **JSON**, **YAML** o **Terraform** para los templates de
   **CloudFormation**.
3. Aplicar **controles de seguridad y compliance** y **definir y hacer cumplir el tagging**.
4. **Organizar y agrupar productos por categorías** y **asignarlos** a un usuario, grupo o rol.

**Resultado para Grace:**

| Antes | Después |
| --- | --- |
| Buscar y adivinar entre todos los servicios | Elige de **productos definidos por la organización** |
| Sin garantía de tagging | **Tagging consistente y correcto** |
| Infraestructura improvisada | **Infraestructura aprobada** y con requisitos de compliance |
| Sin separación | **Seguridad y segregación** según las necesidades de la organización |
| Riesgo de exceder presupuesto | **Dentro del presupuesto** |

> **La frase que resume el valor:** todo lo construido desde Service Catalog está **en política, correctamente
> tagueado y dentro del presupuesto** → el developer **deja de cargar con el peso de “¿estaré construyendo la
> arquitectura correcta?”**.

---

## 5. Los siete términos de Service Catalog

| # | Término | Definición literal |
| --- | --- | --- |
| **1** | **Product** | **Servicio de IT** que querés poner a disposición para desplegar en AWS. Consiste en **uno o más recursos de AWS** (instancias EC2, volúmenes, bases de datos) o **productos empaquetados del AWS Marketplace** |
| **2** | **Portfolio** | **Colección de productos con información de configuración**. Identifica **quién** puede usar productos específicos y **cómo**. Se puede crear un portafolio **personalizado para cada tipo de usuario** |
| **3** | **Permissions** | Dar acceso a un portafolio deja al usuario **navegarlo y usar sus productos**. Se aplican **permisos IAM** para controlar **quién puede ver y modificar** el catálogo |
| **4** | **AWS CloudFormation template** | Define los **recursos requeridos**, las **relaciones** entre ellos y los **parámetros**. El usuario final puede configurar **security groups**, crear **key pairs** y hacer otras personalizaciones **con parámetros** al iniciar el producto |
| **5** | **Constraints** | Controlan **cómo** se pueden desplegar los recursos de un producto. Sirven para **aplicar límites** por **gobernanza o control de costos** |
| **6** | **Provisioned product** | Es un **stack**. Cuando el usuario lanza un producto, la instancia que Service Catalog aprovisiona es un **stack con los recursos** para correr el producto |
| **7** | **Versioning** | Capacidad de **administrar múltiples versiones** de los productos del catálogo. Al crear una **versión nueva** en un portafolio, esa versión queda **automáticamente disponible para todos los usuarios actuales** |

> [!important] Portfolio ≠ Product ≠ Provisioned product
> **Product** = qué se ofrece (la definición).
> **Portfolio** = la **colección** de productos **con configuración** y **quién puede usarlos**.
> **Provisioned product** = el **stack** que existe cuando alguien lo lanzó.
> Ésta es la confusión más explotada en las preguntas de Service Catalog.

---

## 6. Los dos tipos de usuario

| | **Administrators** | **End users** |
| --- | --- | --- |
| **Qué hacen** | Preparan **templates de CloudFormation**, configuran **constraints** y administran los **roles IAM** asignados a los productos | Abren la **consola** para **lanzar productos** |
| **Qué obtienen** | Otorgan acceso a los productos **sin dar acceso directo** a los servicios de AWS que los aprovisionan | Usan los productos; los permisos **varían** según el requisito operativo |
| **Alcance** | Catálogo, constraints, roles, portafolios | Pueden administrar los recursos de **sus** productos, o solo **usar features específicas** |

> [!tip] El punto arquitectónico
> El usuario final **no necesita permisos sobre EC2, RDS o VPC**. Necesita permiso **sobre el producto**, y
> Service Catalog asume el **rol** que ejecuta el despliegue. Eso es **least privilege** aplicado al autoservicio.

---

## 7. Los workflows

### 7.1 Administrador

1. **Autorizar templates** (author).
2. **Crear productos**.
3. **Crear portafolios** y **agregar productos**.
4. **Dar visibilidad** de los portafolios a los usuarios y **agregar tags específicos** a cada portafolio.

> **¿Para qué los tags?** Para **rastrear uso** con fines de **reporting** y **asignación de costos**.

Además:

- **Constraints** limitan o especifican las **opciones del usuario** para un producto dentro de un portafolio.
- Hay que **asignar usuarios, grupos o roles IAM** al portafolio para que el end user **pueda verlo y lanzar
  productos**.

### 7.2 End user

```
Navega el portafolio → elige un producto POR VERSIÓN → configura parámetros
        → inicia → Service Catalog + CloudFormation despliegan el stack
        → notificación con el output (ej.: URL del stack LAMP)
        → usa los servicios aprovisionados
```

### 7.3 Lo que puede hacer el administrador después

Con **funciones programadas de AWS Lambda** puede actuar sobre los stacks:

- **creación automatizada de snapshots**;
- **start**, **stop** o **resize** de un tipo de instancia.

> [!note] Ampliación (no está en la fuente)
> Ese patrón (Lambda sobre los stacks) es la base de lo que en el examen aparece como **automatización
> operativa**: reemplaza tareas manuales repetitivas sobre recursos ya aprovisionados.

---

## 8. Account Factory: Service Catalog por dentro

**Account Factory usa AWS Service Catalog para aprovisionar cuentas.**

| Pieza | Detalle |
| --- | --- |
| **Dónde vive** | Se despliega **como parte de AWS Control Tower** |
| **Qué es** | **Control Tower** es un producto en Service Catalog que pertenece al **Account Factory portfolio**, creado cuando se establece la **landing zone** |
| **Qué crea al provisionar** | La cuenta **más un network baseline** automático, según las preferencias y requisitos de la organización |
| **Qué se define en el producto** | La configuración del **network baseline**: **subredes privadas y públicas**, **bloques CIDR** y **regiones** |

### 8.1 Los tres hotspots de la lectura

| # | Elemento | Detalle |
| --- | --- | --- |
| **1** | **Account Factory** | Los administradores crean cuentas nuevas. Se crea el **network baseline** automáticamente. Al **agregar una OU** nueva en Organizations **a través de Control Tower**, el **template del producto se actualiza solo** y la OU nueva **aparece como opción** al provisionar |
| **2** | **AWS Service Catalog** | El **end user que aprovisiona una cuenta no ve los detalles de red**: la cuenta se aprovisiona **como la organización especificó** |
| **3** | **Cuentas nuevas** | El **account baseline** está definido y gobernado por **guardrails**. Cuando los guardrails están activos en una OU, **se aplican automáticamente a las cuentas nuevas** |

> [!warning] Imprecisión en la fuente
> La lectura dice literalmente *“Control Tower is a product in AWS Service Catalog that belongs to the Account
> Factory portfolio”*, mientras que el workflow dice que Control Tower **crea** el portfolio
> **AWS Control Tower Account Factory portfolio** y el producto **AWS Control Tower Account Factory**.
> Lo correcto, según el propio workflow: el **producto es Account Factory**, dentro del portfolio de Control
> Tower. La frase se transcribe tal cual en la traducción y se marca acá.

### 8.2 El workflow de aprovisionamiento (6 pasos)

| # | Paso | Quién |
| --- | --- | --- |
| **1** | Al crear la **landing zone**, Control Tower crea el portfolio **AWS Control Tower Account Factory portfolio** | Administrador |
| **2** | En ese portfolio, crea el producto **AWS Control Tower Account Factory** | Administrador |
| **3** | El producto usa un **template** con instrucciones para **recolectar la información** de la cuenta. Es un **snippet de texto en JSON o YAML** | Administrador |
| **4** | Los templates están **versionados**: al actualizarse, se crea **una versión nueva** del producto. Si se agrega una **OU**, el template se actualiza y la OU aparece en un **dropdown** al provisionar | Administrador |
| **5** | Account Factory se apoya en un **stack de CloudFormation** para describir y aprovisionar los recursos (**account baseline** y **network baseline**), y permite configurar el despliegue **entre cuentas y regiones** | Administrador |
| **6** | **Lanzar el producto = aprovisionar una cuenta.** Se puede lanzar desde Service Catalog, pero **se recomienda usar la función Enroll account** de Account Factory en Control Tower | Usuario |

> [!important] El último paso es el que cae en el examen
> **Se puede** lanzar desde Service Catalog, pero **la recomendación es Enroll account**. Si la pregunta pide
> “la forma recomendada”, es **Enroll account**, no lanzar el producto a mano.

---

## 9. Automatizar la gobernanza a escala: hub-and-spoke

Service Catalog soporta **local launch constraints**: el administrador **comparte productos desde una cuenta a
otras** y esos productos **se lanzan localmente en cada cuenta**. En Service Catalog, esto es el modelo
**hub-and-spoke** de compartir servicios de IT aprobados.

| Rol | Quién es | Qué hace |
| --- | --- | --- |
| **Hub** | La **cuenta primaria de AWS Control Tower** | Define **productos y portafolios**; aplica gobernanza, automatización y escala |
| **Spoke** | Las **cuentas de usuario final**: developer, API, **AWS CLI** | Reciben los productos y portafolios compartidos |

**Mecánica:** usando las **capacidades de sharing de AWS Organizations**, se comparten productos y portafolios
desde el hub a las spoke. Cuando el usuario inicia sesión, hace **llamadas API** o se conecta por **AWS CLI**,
tiene los servicios apropiados a disposición. En vez de administrar cada cuenta spoke, **se administran desde la
cuenta primaria**.

> **En una frase:** *self-service provisioning at scale*.

---

## 10. Knowledge Check

> **Pregunta:** ¿qué feature de AWS Service Catalog es una **colección de productos que contienen información de
> configuración**?

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A. Portfolio** | ✅ **Correcta** | La definición literal del término: colección de productos **con información de configuración**, que además identifica **quién** puede usarlos y **cómo** |
| B. Provisioned product | ❌ | Es el **stack** que existe tras lanzar un producto |
| C. Permissions | ❌ | Controlan **quién ve y modifica** el catálogo |
| D. Constraints | ❌ | Limitan **cómo** se despliega un producto (gobernanza / costo) |

---

## 11. Traducción del contenido

### 11.1 Introducción

Los **management controls** son herramientas de gobernanza que ayudan a las organizaciones a **estandarizar el
despliegue de recursos**, **hacer cumplir el compliance** y **mantener la eficiencia operativa** en su entorno de
AWS.

Como Solutions Architect que trabaja con clientes empresariales, necesitarás diseñar e implementar soluciones que
**balanceen la agilidad con el control**. **AWS Service Catalog** es particularmente crucial en este rol, porque te
permite **crear y administrar portafolios de servicios estandarizados** que dan a los equipos **capacidades de
autoservicio** mientras garantizan el cumplimiento de las políticas organizacionales. Entender cómo aprovechar
Service Catalog de manera efectiva te ayudará a **arquitecturar soluciones que escalen de forma segura** y a
**mantener la gobernanza** en entornos complejos de múltiples cuentas.

### 11.2 Transcript (duración: 6 minutos 3 segundos)

Acá es donde entra en juego **AWS Service Catalog**, y es la herramienta que vamos a usar para resolver esos
desafíos.

Lo primero que tenemos son los **developers** y esa **necesidad de velocidad**. Quieren moverse rápido y también
quieren que sea **autoservicio**. No quieren tener que **levantar un ticket** cada vez que necesitan una
aplicación o un recurso nuevo. Quieren poder **ir y obtenerlo ellos mismos**.

Ahora, la **organización** necesita **seguridad**, necesita **compliance**, necesita **gobernanza**, necesita
**presupuesto**, todas esas cosas que ya cubrimos. Y una vez más, **no queremos que esas fuerzas peleen entre sí**:
queremos que estén **balanceadas**, trabajando en armonía, y **Service Catalog puede ayudar a que eso pase**.

El **catálogo de servicios de IT tradicional** es algo que quizá ya viste en una organización grande. Es ese
**conjunto grande de software o recursos** al que puedo ir y decir “necesito el producto X o el entorno Y” y que me
lo construyan. Eso **gobierna a escala**. Bueno, necesitamos **abordar los problemas potenciales y anticiparnos a
los desafíos de compliance** en nuestras cuentas de AWS. Y podemos **fusionar esas dos cosas a nivel de AWS
Service Catalog**: va a ser una **solución administrada centralmente** para **mantener y construir aplicaciones y
entornos aprobados** para nosotros.

Ahora, **antes de Service Catalog** tenemos a **Grace** la developer. Grace acaba de iniciar sesión y se le
presentan lo que parecen **un millón de servicios y un millón de preguntas**. ¿Qué servicios puedo usar? ¿Qué
parte de los servicios está OK y cuáles no? ¿Qué sistemas operativos hay? ¿Qué **AMIs** puedo seleccionar? ¿Y esos
**tipos de volumen**? Tengo tantas reglas, y si tengo que **revisarlas manualmente** todas para cumplirlas, va a
ser un proceso **muy frustrante** para mí y también para Grace.

Así que queremos asegurarnos de que Grace y los demás developers tengan un entorno donde **sepan qué se les pide**
y **cuáles son los límites** dentro de los que pueden trabajar.

Cuando llega el momento de configurar esa **solución de autoservicio**, tenemos un par de **objetivos** en los que
realmente necesitamos enfocarnos. Queremos asegurarnos de que **las personas correctas tengan el acceso correcto**
a las aplicaciones y entornos correctos **según sus roles establecidos**, y queremos que eso ocurra
**automáticamente**. Necesitamos asegurarnos de que **los servicios que usamos cumplan** con las reglas, políticas
y todas esas restricciones que necesitamos aplicar a nuestra arquitectura. Y necesitamos asegurarnos de que esas
reglas y restricciones **sean claras**, para que **trabajen con nosotros y no en contra**.

Ahora, cuando se trata de **gobernanza** y de **seguridad**, el **tracking y el monitoreo** son importantes, son
realmente importantes. Si no estamos **rastreando lo que pasa**, ¿cómo sabemos si estamos cumpliendo con todo lo
que tenemos que cumplir? Y la respuesta es que **realmente no tenemos idea**, y eso **no es bueno cuando llega el
momento de auditar** nuestra arquitectura.

Podemos implementar estos objetivos **construyendo y utilizando Service Catalog**.

Lo que Service Catalog nos permite hacer es **crear nuestros propios productos o aplicaciones** que los usuarios
pueden **desplegar cuando los necesiten**.

Entonces empieza acá, con el **administrador**. El administrador va a mirar y decir: “¿qué necesito?”. Puede
entrar y **seleccionar productos de terceros o propios del AWS Marketplace**. Puede tomar **guías de inicio de
best practices de AWS**, o simplemente **construir su propia aplicación**. Y estas van a venir en forma de
documentos de **Terraform o CloudFormation**.

Ahora, si ya trabajaste con estos servicios, esto va a **abrazar realmente esa idea de automatización**. Voy a
**definir qué entra en esto**, cómo se ve toda mi arquitectura y, **casi tan importante como cómo se ve, cómo no se
ve**. Puedo **establecer constraints sobre lo que se me permite crear**, así que puedo decir, otra vez, que esos
developers **obtengan esas instancias T3 micro y no algunas de las aplicaciones más grandes** para sus entornos de
desarrollo.

Una vez que creé estos templates y construí todo lo que necesito, puedo **publicarlos en AWS Service Catalog**.

Cuando pasamos de esos administradores a los developers, acá tenemos a **Grace** otra vez. Ahora, usando Service
Catalog, a Grace se le presenta **una lista de aplicaciones y entornos aprobados** que puede construir **cuando los
necesite**. Y en lugar de tener que revisar esa **flota de servicios** y hacer todas las preguntas que acabamos de
mencionar, sabe que cuando elige **este ítem de Service Catalog**, lo que va a obtener va a estar **dentro de la
política**, **correctamente tagueado** y **dentro del presupuesto aprobado**. Esto **le saca ese proceso frustrante
al developer** y le permite **enfocarse en hacer lo que mejor hace**.

Ahora hagamos un cambio: del administrador volvemos a Grace, nuestra developer. Cuando Grace usa Service Catalog,
se le presenta una **lista de aplicaciones y entornos aprobados**. Entonces, en lugar de tener que **buscar y
picotear** entre todos esos servicios y hacerse las preguntas que cubrimos antes, sabe que **estos son los recursos
aprobados y los entornos aprobados** que puede crear. Y todavía mejor: **todo lo que construya desde Service
Catalog va a ser compliant con mis políticas, correctamente tagueado y dentro del presupuesto**. Esto significa que
**no le estoy poniendo al developer el estrés de “¿estaré construyendo la arquitectura correcta?”**, permitiéndole
enfocarse en hacer lo que mejor hace.

Ya hablamos mucho de Service Catalog, así que creo que es momento de **ponernos manos a la obra y verlo en
acción**.

### 11.3 AWS Service Catalog

AWS Service Catalog provee **un solo lugar para administrar centralmente catálogos de recursos preaprobados**,
agrupándolos como **productos**. Sostiene el modelo de **gobernanza a escala** en el recorrido de adopción de la
nube, **especialmente en el paso de aprovisionamiento** (*provision*).

AWS Service Catalog cumple un rol fundamental en el marco de **gobernanza a escala**. Permite a las organizaciones
**desplegar y administrar** la infraestructura y las aplicaciones de AWS que **cumplen con las políticas de
seguridad y operativas** de la organización. Esto se logra **haciendo cumplir la estandarización** y
**manteniéndose dentro del presupuesto**.

#### Conceptos de AWS Service Catalog

AWS Service Catalog es un **catálogo de servicios de IT** que administra **servicios aprobados de AWS**. Muchas
organizaciones **carecen de este tipo de servicio**.

**1: IT service catalog.** La **Information Technology Infrastructure Library (ITIL)** define un catálogo de
servicios como un **servicio estructurado** utilizado para la **gestión, el despliegue y el mantenimiento** de
servicios puestos a disposición de los clientes.

**2: Governance at scale.** Como se explicó, es una **metodología** que aborda la **gestión de cuentas de AWS**,
el **control de costos** y la **seguridad y el compliance** mediante **automatización**.

**3: AWS Service Catalog.** Es un **catálogo de servicios de IT**. Permite a las organizaciones **administrar
centralmente** los servicios de AWS de uso común y **aprovisionar productos de software**. Ayuda a lograr
**requisitos de gobernanza y compliance consistentes** mientras permite a los usuarios **desplegar servicios
aprobados de AWS rápidamente usando autoservicio**.

### 11.4 Autoservicio

A continuación, examiná dos escenarios para ver en acción cómo AWS Service Catalog ofrece una solución **más
rápida, resiliente, escalable y segura**.

1. **Estado actual del autoservicio:** un developer con **acceso total** de autoservicio a AWS.
2. **Estado nuevo del autoservicio:** un developer **con AWS Service Catalog**.

#### 1. Estado actual del autoservicio

En este ejemplo, una developer típica, **Grace**, necesita acceso a recursos de AWS. Tiene una cuenta de developer
**dedicada o compartida** con **acceso total de autoservicio**.

Grace puede iniciar sesión en la **consola de administración de AWS** y **acceder a todo**. Puede encontrarse con
**servicios y recursos que no sabe usar ni configurar**. Puede haber **servicios restringidos a los que no
debería acceder**. Grace empieza a trabajar **sin ninguna guía ni gobernanza** sobre sus acciones.

Grace necesita un **servidor** para experimentar, correr aplicaciones y probar una **base de datos** para
almacenar datos. También necesita **acceso a internet** para aplicaciones y servicios.

Grace **puede no saber** cuáles son los servicios **mejores para sus necesidades**. Debe considerar el **sistema
operativo o versión de SO** que cumpla con los requisitos de licenciamiento, el **tipo de instancia de Amazon
EC2** que va a levantar, **qué motor de base de datos** elegir y su **costo**, **qué tipo de volumen** configurar
para cumplir con compliance, **cómo crear una VPC nueva** que sea segura y compliant, y **qué puertos** deben
estar abiertos.

Sin el conocimiento adecuado, **podría adivinar** qué recursos aprovisionar. Esto podría resultar en:

- **procesos que consumen tiempo**;
- **falta de enforcement** de las best practices;
- **seguir procesos de IT no estándar** diseñados por otros departamentos;
- **brechas de seguridad o de datos** por **misconfigurar recursos**;
- **aprovisionar recursos fuera del presupuesto asignado**.

Este proceso sería **más eficiente** para Grace y para la organización **si sus opciones estuvieran
preconfiguradas**. Una **solución de autoservicio** es un enfoque **más rápido**.

#### Objetivos de una solución de autoservicio

Pensá en los objetivos que una solución de autoservicio te puede ayudar a lograr:

- **Las personas correctas tienen acceso a los servicios correctos.**
- **Los servicios se usan de acuerdo con las políticas, las reglas de seguridad y los requisitos de compliance**
  de una organización.
- **Todo, incluido el patching, se rastrea** para monitorear el **uso**, la **versión del producto** y los
  **costos**.

#### 2. Estado nuevo del autoservicio

Ahora mirá el escenario donde **AWS Service Catalog está implementado** y Grace puede **seleccionar de una lista
de productos y servicios**.

La lista de productos o servicios se convierte en un **portafolio** que contiene **servicios de AWS**, **productos
de terceros del AWS Marketplace** y **productos propios de los clientes**. Los clientes pueden **otorgar acceso**
a productos y portafolios a los **usuarios, roles o grupos correctos** de sus organizaciones.

Usando AWS Service Catalog, los clientes pueden **usar infraestructura como código** para definir productos como
sus necesidades de **infraestructura, cómputo y almacenamiento** y otros recursos de la nube. Pueden usar
**scripts o archivos JSON, YAML o Terraform** para definir **templates de AWS CloudFormation**. Pueden **aplicar
controles de seguridad y compliance** y **definir y hacer cumplir el tagging**. También pueden **organizar y
agrupar productos por categorías** y **asignar los productos** a un **usuario, grupo o rol**.

AWS Service Catalog permite **un nuevo estado de autoservicio** y **estandariza las best practices**.

Ahora Grace puede elegir entre un **rango de productos definidos por nuestra organización** para developers. Los
productos ahora están construidos usando **best practices como tagging consistente y correcto**. Se despliegan
sobre **infraestructura aprobada** definida por la organización y que **cumple con los requisitos de compliance**.
Están **seguros y segregados** según las necesidades de la organización.

Así, los **productos correctos están disponibles para los usuarios, grupos y roles definidos**, y están
**rastreados y controlados** para que **no violen políticas de seguridad o compliance** y **se mantengan dentro del
presupuesto**. Los productos se apoyan en una **infraestructura aprobada** definida por la organización de Grace,
lo que es una **solución más rápida, resiliente, escalable y segura**.

### 11.5 Términos de AWS Service Catalog

Los siguientes términos describen features importantes de AWS Service Catalog.

**1: Product.** Un **producto** es un **servicio de IT** que querés poner a disposición para desplegar en AWS. Un
producto consiste en **uno o más recursos de AWS**, como instancias **EC2**, volúmenes de almacenamiento, bases de
datos, o **productos empaquetados del AWS Marketplace**.

**2: Portfolio.** Un **portafolio** es una **colección de productos con información de configuración**. Los
portafolios identifican **quién puede usar productos específicos y cómo**. Podés crear un **portafolio
personalizado para cada tipo de usuario** de la organización.

**3: Permissions.** Otorgar acceso a un portafolio permite a un usuario **navegar el portafolio y usar los
productos** que contiene. Aplicá **permisos IAM** para controlar **quién puede ver y modificar** tu catálogo.

**4: AWS CloudFormation template.** Usá el template para definir los **recursos de AWS requeridos**, las
**relaciones entre recursos** y los **parámetros**. Los usuarios finales pueden **configurar security groups**,
**crear key pairs** y realizar **otras personalizaciones con parámetros** cuando **inician el producto**.

**5: Constraints.** Los **constraints** controlan **las formas en que se pueden desplegar los recursos de AWS**
para un producto. Podés usarlos para **aplicar límites** a los productos por **gobernanza o control de costos**.

**6: Provisioned product.** Un **provisioned product** es un **stack**. Cuando un usuario final lanza un producto,
la **instancia del producto** que AWS Service Catalog aprovisiona es un **stack con los recursos** para correr el
producto.

**7: Versioning.** El **versioning** es la capacidad de **administrar múltiples versiones de los productos** de un
catálogo. Cuando creás una **versión nueva** de un producto en un portafolio, esa versión queda
**automáticamente disponible para todos los usuarios actuales**.

### 11.6 Usuarios de AWS Service Catalog

AWS Service Catalog soporta **dos tipos de usuarios**: **administradores** y **usuarios finales**. Los
**administradores** administran un **catálogo de productos** (aplicaciones y servicios). Los **usuarios finales**,
también llamados *users*, **reciben credenciales de AWS** de su departamento de IT o de su manager.

**1: Administrators.** Los administradores **preparan templates de AWS CloudFormation**, **configuran
constraints** y **administran los roles IAM** asignados a los productos para la administración avanzada de
recursos. **Otorgan a los usuarios acceso a los productos que pueden lanzar sin acceso directo a los servicios de
AWS subyacentes** que aprovisionan esos recursos.

**2: End users.** Los usuarios finales **abren la consola de administración de AWS para lanzar productos**. Los
permisos pueden **variar según los requisitos operativos**. Un usuario puede tener permiso para **lanzar y
administrar los recursos** requeridos por los productos que usa, o **solo permiso para usar features específicas**
del servicio.

### 11.7 Workflows

Los administradores y los usuarios finales tienen **workflows distintos** para usar AWS Service Catalog.

Los **administradores** usan un workflow para configurar productos para AWS Service Catalog. Primero
**autorizan templates**. Después **crean productos**. Luego **crean portafolios y agregan productos** a ellos. Y
finalmente **dejan que los usuarios vean múltiples portafolios** y **agregan tags específicos a cada portafolio**.
Los **tags** son útiles para **rastrear el uso** con fines de **reporting y asignación de costos**.

Los **constraints** pueden **limitar o especificar las opciones del usuario** para un producto dado dentro de un
portafolio. Un administrador debe **asignar usuarios, grupos o roles IAM** a un portafolio dado para que el usuario
final **pueda acceder a su portafolio y lanzar productos**.

El usuario final puede entonces **navegar los productos del portafolio**. **Selecciona un producto por versión** y
**configura sus parámetros**. Cuando se inicia, **AWS Service Catalog y AWS CloudFormation despliegan el stack**.
El usuario final y el administrador **reciben notificaciones sobre el output**, como la **URL del stack LAMP**.
Después, el usuario final puede **empezar a usar los servicios aprovisionados**.

Los administradores pueden **crear funciones programadas usando AWS Lambda** que actúen sobre los stacks. Esto
incluye **creación automatizada de snapshots** y funciones para **iniciar, detener o redimensionar** un tipo de
instancia.

### 11.8 Account Factory

**Account Factory usa AWS Service Catalog para el aprovisionamiento de cuentas.** Account Factory se despliega
**como parte de AWS Control Tower**. **Control Tower es un producto en AWS Service Catalog que pertenece al
portafolio de Account Factory** y se crea cuando **establecés tu landing zone**.

**1: Account Factory.** Los administradores pueden usar **Account Factory en AWS Control Tower** para **crear
cuentas nuevas de AWS**. Como parte de la creación de la cuenta, **se crea un network baseline**: tu cuenta se crea
con una **configuración de red automáticamente en su lugar**, según las **preferencias y requisitos** de tu
organización. Como parte del producto Account Factory, **definís la configuración del network baseline**
(**subredes privadas y públicas**, **bloques CIDR** y **regiones**). Cuando **agregás una OU nueva en AWS
Organizations a través de AWS Control Tower**, **el template del producto Account Factory se actualiza
automáticamente**. Cuando **aprovisionás cuentas nuevas**, la **OU nueva está disponible como opción**.

**2: AWS Service Catalog.** Un **usuario final que aprovisiona una cuenta no ve los detalles de red**. La cuenta
se aprovisiona **como lo especifica la organización**.

**3: Cuentas nuevas de AWS.** Un **account baseline** está **definido y gobernado por guardrails**. Cuando los
**guardrails están activados en una OU**, **se aplican automáticamente a las cuentas aprovisionadas nuevas**.

#### Workflow de aprovisionamiento automatizado de cuentas

Este ejemplo muestra el proceso que **AWS Control Tower usa para configurar Account Factory** para el
aprovisionamiento de cuentas. **AWS Control Tower es un producto basado en consola que forma parte de AWS Service
Catalog.** Los **primeros cinco pasos son del administrador**; el **último paso es del usuario**.

**1: AWS Control Tower.** Cuando el administrador configura una **landing zone de AWS Control Tower**, AWS Control
Tower **crea un portafolio llamado AWS Control Tower Account Factory portfolio** en AWS Service Catalog.

**2: AWS Service Catalog.** En el portafolio de AWS Service Catalog, AWS Control Tower **crea un producto llamado
AWS Control Tower Account Factory**.

**3: Producto Account Factory.** El producto Account Factory usa un **template con instrucciones** sobre **cómo
recolectar la información** para aprovisionar la cuenta. Ese template es un **fragmento de texto en formato JSON o
YAML**.

**4: Producto versionado.** Estos templates están **versionados**. Cuando hay una **actualización en el
template**, se crea **una versión nueva del producto**. Si **agregás una OU**, el **template del producto se
actualiza** y la **OU nueva aparece en un dropdown** cuando se aprovisiona una cuenta.

**5: Stack de AWS CloudFormation.** Account Factory se apoya en un **stack de AWS CloudFormation** para
**describir y aprovisionar los recursos** que el producto necesita, como el **account baseline** y el **network
baseline**. También te permite **configurar el despliegue del producto entre cuentas y regiones**.

**6: Provisioned products.** Al **lanzar un producto de AWS Service Catalog**, estás **aprovisionando una
cuenta**. Podés **lanzar el producto desde AWS Service Catalog**. Sin embargo, **recomendamos que uses la función
Enroll account a través de Account Factory en AWS Control Tower**.

### 11.9 Automatizar la gobernanza a escala

AWS Service Catalog soporta **local launch constraints**. Con esta feature, los administradores pueden **compartir
productos de una cuenta de AWS a otras cuentas** y hacer que esos productos **se lancen localmente en cada
cuenta**. En AWS Service Catalog, esto se conoce como modelo **hub-and-spoke** de compartir servicios de IT
aprobados. Esto facilita a los administradores **distribuir y administrar** estos servicios **en múltiples
cuentas**, brindando **acceso de autoservicio** mientras se **mantiene el cumplimiento** de las best practices y
políticas organizacionales.

**Cuenta hub.** Como administrador de sistemas, **definís productos y portafolios**. Aunque podés **exponer
productos y best practices** a tu organización, para **agregar impacto y valor** querés **hacer cumplir
gobernanza, automatización y escala**. Si trabajás en una organización con **miles de developers**, querés
**ayudarlos a aprovisionar sus propios recursos**. Considerá tu **cuenta primaria de AWS Control Tower** como tu
cuenta **“hub”**.

**Cuentas spoke.** Las **cuentas de usuario final** —developer, API y **AWS Command Line Interface (AWS CLI)**—
son las cuentas **spoke**. Usando las **capacidades de sharing de AWS Organizations**, podés **compartir productos
y portafolios desde tu cuenta hub** a las **cuentas spoke**. Cuando los usuarios finales **inician sesión, hacen
llamadas API o se conectan usando AWS CLI**, tienen **los servicios apropiados a su disposición**. En lugar de
**administrar cuentas spoke individualmente**, podés **administrarlas desde tu cuenta primaria hub**. Esto es
**aprovisionamiento de autoservicio a escala**.

---

## 12. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 12.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Service Catalog**, productos, portafolios, autoservicio | **1.4** Diseñar un entorno de AWS de varias cuentas |
| **Constraints**, tagging, gobernanza del despliegue | **1.2** · **2.3** Controles de seguridad |
| **Account Factory** y baselines | **1.4** · **2.1** Estrategia de implementación |
| **Tags para asignación de costos** | **1.5** Visibilidad y costos |
| **Hub-and-spoke, local launch, tracking** | **3.1** Excelencia operativa |

### 12.2 Diez puntos para llevarse

1. **Service Catalog = catálogo de productos aprobados**, no un portal de tickets.
2. **Product** = definición; **Portfolio** = colección **con configuración** y audiencia; **Provisioned product** =
   **stack** en ejecución.
3. **Constraints** limitan **cómo** se despliega → gobernanza y costo (ej.: **T3 micro sí, instancias grandes no**).
4. El **end user no necesita permisos** sobre los servicios de base: Service Catalog usa **roles IAM**.
5. **Versioning**: una versión nueva queda **automáticamente disponible para todos los usuarios actuales**.
6. **Account Factory es un producto de Service Catalog** dentro de un **portfolio creado por Control Tower**.
7. **Account Factory** crea la cuenta **con network baseline** (subredes, CIDR, regiones) que el usuario **no ve**.
8. **OU nueva en Organizations vía Control Tower** → **template actualizado** y la OU **aparece en el dropdown**.
9. **Guardrails activos en la OU** se aplican **automáticamente** a las cuentas nuevas.
10. **Recomendado para cuentas: Enroll account**, no lanzar el producto a mano.

### 12.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “**Portfolio** es el stack desplegado” | El stack es el **provisioned product** |
| “**Product** es la colección de productos” | El producto es **un** servicio de IT; la colección es el **portfolio** |
| “Los usuarios finales necesitan **permisos de EC2/RDS**” | Reciben permiso sobre el **producto**; el despliegue usa **roles IAM** |
| “**Constraints** controlan quién ve el catálogo” | Eso son **permissions**; los constraints controlan **cómo se despliega** |
| “Una versión nueva requiere **re-asignar** a los usuarios” | Queda **automática** para los usuarios actuales |
| “Account Factory es un servicio independiente” | Es un **producto de Service Catalog** que Control Tower crea en la landing zone |
| “El usuario configura la **VPC** al pedir la cuenta” | El **network baseline** se aplica solo; el usuario **no ve** los detalles |
| “Se recomienda lanzar el producto desde Service Catalog para crear cuentas” | Se recomienda **Enroll account** |
| “**Local launch constraints** obligan a lanzar en el hub” | Se comparten desde el hub y se lanzan **localmente en cada cuenta** |
| “Un **tag** en el producto alcanza para costos” | El tagging se define y **se hace cumplir**; los tags del **portfolio** se usan para **reporting y asignación de costos** |

> [!note] Ampliación (no está en la fuente)
> Para el examen conviene retener el mapeo: **Service Catalog** da **autoservicio gobernado**; **Control Tower**
> da **landing zone y guardrails**; **Organizations** da **jerarquía, SCPs y sharing**. Una pregunta que pida
> “self-service con cumplimiento de políticas” suele resolverse con **Service Catalog + constraints**, no con
> permisos IAM amplios.

---

## 13. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + transcript (6:03) + *AWS Service Catalog* + *Self-service* (2 videos) + *Terms* + *Users* + *Workflows* + *Account Factory* + *Automate governance at scale* + Knowledge Check | Nota completa (secciones 1–12) |

**Decisiones de transcripción:**

- **Knowledge Check**: respuesta **A. Portfolio**, con el análisis de los cuatro distractores.
- **Imprecisión de la fuente**: la lectura dice que *“Control Tower es un producto en Service Catalog que
  pertenece al portfolio de Account Factory”*, pero el workflow dice que Control Tower **crea** el portfolio
  **AWS Control Tower Account Factory** y el producto **AWS Control Tower Account Factory**. Se transcribe literal
  y se marca en la §8.1.
- El transcript repite el bloque de Grace (“list of approved applications…”) **dos veces** con redacción casi
  idéntica: se transcribió **una vez** en la traducción, respetando el contenido de ambas.
- “AWService catalog” (audio) → **AWS Service Catalog**.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Establishing Guardrails]] — los controles que Account Factory aplica a cuentas nuevas
- [[Governance at Scale]] — account automation y policy automation
- [[Course Overview]] — servicios y objetivos del curso
- [[AWS Control Tower]] — landing zone, Account Factory y enrollment (módulo anterior)
- [[AWS Organizations and IAM Identity Center]] — OUs, sharing entre cuentas
- [[Multi-Account Access Solutions]] — Service Catalog como protección de recursos centralizados (módulo anterior)
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] · [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]]
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[Guia AWS]] — pesos y tareas oficiales
