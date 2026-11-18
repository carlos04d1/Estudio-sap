---
title: "Demonstration: AWS Service Catalog"
aliases:
  - "Demonstration - AWS Service Catalog"
  - "Demo Service Catalog"
  - "Kitty Cat Store"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - service-catalog
  - governance
  - demo
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Demonstration: AWS Service Catalog"
---

# Demonstration: AWS Service Catalog

> [!abstract] Qué es este archivo
> Demo guiada de **AWS Service Catalog** (5:59). No agrega teoría nueva: **muestra en pantalla** lo que
> [[Management Controls]] explicó. Sirve para fijar el **flujo real** de administrador y de usuario final.
>
> Escenario: una empresa ficticia, **Kitty Cat Store**, con dos portafolios: **Linux applications** y
> **Windows applications**.

> [!tip] Para qué mirarla si ya leíste la teoría
> Acá se ven tres cosas que en texto quedan abstractas:
> 1. El **branding** del console se puede personalizar.
> 2. El **producto es un template de CloudFormation** — se ve el código.
> 3. El **end user no puede crear recursos fuera del catálogo**: su menú está recortado.

---

## Resumen en una frase

> El administrador arma **portafolios con productos** (templates de CloudFormation), los **comparte** con el
> usuario, y ese usuario **lanza un VPC y después una instancia EC2 dentro de ese VPC** sin tener permisos para
> crear nada por fuera del catálogo.

---

## 1. Mapa del recorrido

```
Administrador                                  Usuario final (developer)
─────────────                                  ─────────────────────────
Service Catalog
  └── Portfolios
        ├── Linux applications  ──(Access)──►  ve solo esos productos
        │     ├── EC2 Linux                     lanza "dev-vpc"
        │     ├── EC2 + Apache                  └── lanza "dev-linux" dentro del VPC
        │     ├── EC2 + NGINX
        │     └── VPC propia                    verifica en consola EC2
        └── Windows applications
```

---

## 2. Branding del console

Lo primero que muestra el instructor: **la consola se ve distinta**. Service Catalog permite **ajustar el
branding del console de AWS**.

> **Ejemplo:** el instructor trabaja sobre su negocio ficticio, **“Kitty Cat Store”**.
> No es decoración: en un catálogo interno, el branding refuerza que el usuario está en **el portal aprobado** de
> la organización y no en la consola cruda de AWS.

---

## 3. Los portafolios y sus productos

En el menú lateral, **Portfolios**:

| Portfolio | Productos que contiene |
| --- | --- |
| **Linux applications** | **EC2 instance** (Linux) · **EC2 + Apache Web Server** · **EC2 + NGINX Web Server** · **VPC propia** |
| **Windows applications** | (portafolio separado; el instructor no lo abre) |

> **Por qué dos portafolios:** *“a collection of different products or applications that have grouped together
> for… common sense organizing”*. Es exactamente la definición de **portfolio**: agrupar por **tipo de usuario o
> necesidad**, no por servicio de AWS.

El objetivo que declara el instructor: **empoderar a los developers con mentalidad de autoservicio** —
*“I can just make it myself using these approved templates”*.

---

## 4. Un producto por dentro

Al abrir un producto, arriba se ve que **es un template de CloudFormation**.

| Lo que se ve | Qué confirma |
| --- | --- |
| **Código del template** | El producto **es** un template (provisto por AWS como referencia o propio) |
| **Parameters, labels y tags** | Los parámetros que el usuario completará al lanzar |
| **Resources** | Los recursos que CloudFormation va a crear |

> **La idea:** si conocés CloudFormation, estás en terreno conocido. Si no, no importa: Service Catalog
> **ejecuta todo lo definido en el código**.

---

## 5. Compartir el portafolio

En **Linux applications → Access**, el instructor muestra que **el portafolio ya está compartido con el usuario
developer**.

| Rol | Responsabilidad |
| --- | --- |
| **Administrador** | **Crear y mantener** los productos y servicios disponibles |
| **Developer / end user** | **Consumir** lo que se le compartió |

> [!important] La frontera de permisos
> El administrador **define y comparte**; el usuario **consume**. El usuario **no hereda** permisos para crear
> recursos por fuera del catálogo: hereda **acceso al portafolio**.

---

## 6. La vista del usuario final

El instructor **cambia de cuenta** y entra como **developer**. La diferencia es inmediata:

| Administrador | End user |
| --- | --- |
| Muchas opciones en el menú lateral | **Menos opciones** |
| Puede **crear recursos** | **No puede crear recursos**: solo **consumir** lo provisto |
| Ve portfolios, constraints, access | Ve **los productos** de los portfolios compartidos |

> **Frase del instructor:** *“I'm only allowed to consume what's been provided to me.”*
> Eso es **least privilege** visible en la interfaz, no solo en una política.

---

## 7. Lanzar el VPC

1. El usuario abre el producto **VPC**.
2. Clic en **Launch**.
3. Pone **nombre**: `dev-vpc`.
4. Elige la **versión del producto**: solo hay **una** disponible (por eso usa esa).
5. Completa los **parámetros** del template de CloudFormation — *“the same sort of back and forth that I'd get as
   if I actually spun this up myself using the CloudFormation service directly”*.
6. Acepta los **valores por default**, completa el resto y hace clic en **Launch**.
7. Tarda **uno o dos minutos**; al terminar, el VPC existe.

> **Observación clave:** el template lo **construyó y validó el administrador**. El usuario solo **parametriza**.

---

## 8. Lanzar la instancia dentro del VPC

El instructor vuelve a **Products** y crea una **instancia EC2** para que viva en el VPC recién creado:

1. Elige el producto **`dev-linux`** (EC2 Linux).
2. Selecciona la **misma versión 1.0**.
3. En los parámetros, elige el **VPC nuevo** que Service Catalog acaba de construir.
4. Completa el resto de los valores y **selecciona dónde va a vivir**.
5. **Launch** y espera unos segundos.

> [!tip] El detalle que vale para el examen
> El **VPC recién creado aparece como opción** en el parámetro de la instancia. Eso demuestra que los productos del
> catálogo **se componen entre sí**: el output de uno se convierte en input de otro, siempre **dentro de lo
> aprobado**.

---

## 9. Verificación

En la **consola de EC2 → Instances** aparece el **host nuevo (`dev host`)**.

> **Cierre del instructor:** *“Service Catalog is a very powerful tool to enable individuals to serve their own
> needs inside of their AWS accounts in a structured and controlled way.”*
> **Structured and controlled**: esas dos palabras son la definición operativa de management control.

---

## 10. Qué confirma la demo (cruce con la teoría)

| Lo que se vio | Término de [[Management Controls]] |
| --- | --- |
| Dos carpetas por sistema operativo | **Portfolio** |
| EC2 Linux, Apache, NGINX, VPC | **Product** |
| Código con parameters, tags y resources | **AWS CloudFormation template** |
| `dev-vpc` y `dev-linux` desplegados | **Provisioned product** (un **stack** cada uno) |
| Versión **1.0** elegida al lanzar | **Versioning** |
| Acceso otorgado al developer | **Permissions** (IAM sobre el portafolio) |
| Menú recortado del developer | **Least privilege** en la práctica |

> [!note] Lo que la demo **no** muestra
> No se ven **constraints** en acción, ni **Account Factory**, ni **hub-and-spoke**. Esos conceptos quedan en la
> teoría de [[Management Controls]]; esta demo se limita a **portfolio + product + provisioning**.

---

## 11. Traducción del contenido

### 11.1 Introducción

En esta demostración, el instructor te guía por la **creación de un portafolio** y el **aprovisionamiento de
productos** usando **AWS Service Catalog**.

### 11.2 Transcript (duración: 5 minutos 59 segundos)

Hola gente, delante nuestro tenemos nuestro servicio **AWS Service Catalog**. Ahora, después de haber hablado un
poco de él, quiero guiarlos por, bueno, **aprovisionar nuestro primer producto** usando esta herramienta.

A primera vista, quizá notes algunos **cambios inesperados**. Una de mis partes favoritas de Service Catalog es que
podés **ajustar el branding del console de AWS**. Así que sí, vamos a recorrer mi nuevo negocio, la **Kitty Cat
Store**.

Ahora, en el lado izquierdo, voy a bajar un poco. Una de las primeras cosas que necesitamos mirar son los
**portafolios** que creé. Esos portafolios van a ser simplemente una **colección de distintos productos o
aplicaciones** agrupados por, bueno, ya sabés, **organización con sentido común**.

Bajo un poco acá. Tengo **dos portafolios** ahora: tengo mis **Linux applications** y tengo mis **Windows
applications**, y ordené mis distintos productos, o las cosas disponibles que mis developers pueden crear, en esos
**dos buckets**.

Abramos mis **Linux applications** ahora. Bajando un poco más, tengo un par de **productos** distintos. Puedo
crear una **instancia EC2** con ese sabor de Linux. Puedo crear una **instancia EC2 con un Apache Web Server** o un
**NGINX Web Server**, o incluso puedo crear **mi propio VPC**. Quiero **empoderar a mis developers** para que
adopten esa **mentalidad de autoservicio** de “puedo hacerlo yo mismo usando estos **templates aprobados**”.

Ahora abramos uno de estos productos. Podemos ver acá arriba que esto va a ser, en realidad, un **template de
CloudFormation**. Así que si trabajaste con CloudFormation antes, te vas a sentir como en casa. Bajando un poco
más, puedo ver el **código del template**. Esto fue uno que **AWS proveyó amablemente como referencia**, o también
podés usarlo vos. Tenemos nuestros **parámetros estándar**, nuestras **labels y tags**, y si bajo lo suficiente,
voy a empezar a ver algunos de mis **recursos**. Todo esto es muy familiar si trabajaste con este servicio antes.
Si no lo hiciste, no es un gran problema: este servicio va a **crear todo lo que definimos en nuestro código**.

Bien, volviendo al menú principal, quiero mostrarte algo rápido antes de cambiar a mi otra cuenta. Si abro mi
portafolio otra vez, selecciono esas **Linux applications** y hago clic en **Access**, podemos ver que **pude
compartir este portafolio particular con mi usuario developer**.

Ahora, el **administrador** va a ser responsable de **configurar, mantener y crear** estos distintos productos y
servicios disponibles para mí, y el **developer o usuario final** va a ser el que **consume** eso.

Cambiemos de cuenta. Ahora salto acá y estoy en la misma página, pero **estoy logueado como mi cuenta de
developer**, y te vas a dar cuenta de que lo estoy porque **no tengo tantas opciones** en el lado izquierdo: **no
puedo crear recursos nuevos**, ¿no? **Solo tengo permitido consumir lo que se me proveyó**. Así que esto es lo que
tu **usuario final estándar** va a ver cuando inicie sesión.

Ahora tengo mis distintos productos acá, pero bajemos a ese **VPC** que miré hace un minuto. Lo voy a
**seleccionar**. Voy a hacer clic en **Launch**. Esto va a pasar por ese proceso de crear ese template, el que fue
**revisado y construido por mi administrador**, pero ahora lo voy a correr **dentro de mi propia cuenta de
developer**.

Le damos un nombre rápido: esto va a ser mi **`dev-vpc`**, y puedo elegir **qué versión del producto** quiero.
Como hay **solo una** ahora, voy con esa. Completo rápido. Ahora, estos van a ser los **parámetros** que están
presentes en ese template de CloudFormation, así que tengo **el mismo ida y vuelta** que tendría si lo levantara
yo mismo usando el servicio de CloudFormation directamente. Voy a **aceptar los valores por default**, completar el
resto y debería estar listo. Hagamos clic en **Launch**.

Ahora, esto va a tardar **un minuto o dos**, así que dejo que corra y volvemos cuando termine. Parece que acaba de
terminar.

Ahora que tengo esto funcionando, bueno, **no es muy útil por sí solo**, ¿no? ¿Qué voy a hacer solo con un VPC?
Volvamos a mi pestaña de **Products** y voy a crear una **instancia EC2** para que viva en ese VPC que acabo de
crear. ¿Qué tal mi **`dev-linux`** acá? Voy a seleccionar esa **misma versión 1.0**, y ahora puedo **seleccionar
ese VPC nuevo** que Service Catalog acaba de construir para mí. Completo el resto de los valores, **selecciono
dónde va a vivir**. Hago clic en **Launch** otra vez. Esto también va a tardar un segundo. Vuelvo cuando esté
listo.

Y parece que está listo. Ahora saltemos a la **consola de EC2** y lo revisamos. Abro mis **instances** acá. Puedo
ver mi **nuevo host `dev`** que acaba de ser creado para mí.

Así que, como podemos ver, **Service Catalog es una herramienta muy poderosa** para permitir que los individuos
**satisfagan sus propias necesidades dentro de sus cuentas de AWS** de una manera **estructurada y controlada**.

---

## 12. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la demo con [[Guia AWS]].

### 12.1 A qué tareas responde

| Lo que muestra la demo | Tarea |
| --- | --- |
| **Portfolio + product + permisos** por audiencia | **1.4** Entorno de AWS de varias cuentas |
| **Usuario final sin permisos de creación** | **1.2** Prescribir controles de seguridad |
| **Templates aprobados y versionados** | **2.1** Estrategia de implementación |
| **Autoservicio controlado** | **3.1** Excelencia operativa |

### 12.2 Lo que la demo deja claro

1. **El producto ES un template de CloudFormation**: el usuario final nunca escribe infraestructura, solo
   **completa parámetros**.
2. **El administrador comparte el portafolio**; no comparte credenciales ni permisos amplios.
3. **El end user ve un menú recortado**: no puede crear recursos fuera del catálogo.
4. **Se elige versión al lanzar** (en la demo, **1.0**).
5. **Los productos se componen**: el VPC creado por un producto queda disponible como parámetro de otro.
6. **Cada lanzamiento = un stack** (provisioned product).

### 12.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Service Catalog **crea** la infraestructura con su propio motor” | Lo hace **CloudFormation** con el template del producto |
| “El usuario final necesita **permisos de EC2/VPC** para lanzar” | Solo necesita acceso al **portafolio**; el despliegue usa roles |
| “El usuario puede **modificar** el template” | Solo **parametriza** lo que el template expone |
| “Compartir el portafolio comparte **recursos**” | Comparte **acceso al catálogo**, no los recursos ya creados |
| “El **branding** es cosmético y no aporta gobernanza” | Refuerza el uso del **portal aprobado**; la demo lo usa como parte de la experiencia controlada |

> [!note] Ampliación (no está en la fuente)
> En el examen, si la pregunta describe **“developers que necesitan crear recursos rápido sin conocer los
> requisitos de compliance”**, la respuesta suele ser **Service Catalog con productos preaprobados y constraints**,
> no “dar permisos amplios y auditar después”. La demo es la versión visual de ese patrón.

---

## 13. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Demo completa (5:59): branding, portafolios, producto, sharing, end user, lanzamiento de VPC y EC2 | Nota completa (secciones 1–12) |

**Decisiones de transcripción:**

- La demo **no trae Knowledge Check** ni lecturas: la nota se limita a lo que se ve en pantalla.
- El instructor **no abre** el portafolio **Windows applications**: se registra que existe, sin inventar contenido.
- Los nombres exactos usados en la demo —**`dev-vpc`**, **`dev-linux`**, **versión 1.0**— se transcriben literales.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Management Controls]] — teoría de Service Catalog: términos, workflow, Account Factory
- [[Establishing Guardrails]] — los controles que hacen que el catálogo sea seguro
- [[Governance at Scale]] — account automation y el marco general
- [[AWS Control Tower]] — Account Factory (módulo anterior)
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] · [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]]
- [[Guia AWS]] — pesos y tareas oficiales
