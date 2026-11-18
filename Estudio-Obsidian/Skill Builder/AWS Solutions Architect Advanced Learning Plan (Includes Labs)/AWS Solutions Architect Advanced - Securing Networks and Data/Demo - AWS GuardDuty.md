---
title: "Demo - AWS GuardDuty"
aliases:
  - "Demo: AWS GuardDuty"
  - "Demo GuardDuty"
  - "Recorrido por la consola de GuardDuty"
  - "Protection plans y findings en GuardDuty"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - demo
  - guardduty
  - deteccion
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Demo - AWS GuardDuty

> [!abstract] Qué es este archivo
> Décima lección del módulo y **la segunda demo**. Es la **continuación en consola** de
> [[Amazon GuardDuty]]: el **dashboard con los protection plans**, la **lista de findings** filtrada por
> severidad, el **detalle de un finding de EKS** y el **salto a Detective**.
>
> **No enseña conceptos nuevos**: enseña **dónde mirar y qué campos leer**. Es **la demo más corta del módulo**
> —**3 min 09 s**— y **no trae texto de lectura, imágenes ni Knowledge Check**.

> [!quote] La idea que ordena todo
> *“El dashboard de GuardDuty da **una perspectiva única**: nos permite meternos en lo que llamamos **protection
> plans**.”* Y abajo, en el centro, **los mismos campos que verías en una herramienta SIEM**: findings, severidad
> y tipos de finding. **GuardDuty ya viene con el SIEM adentro.**

---

## Resumen en una frase

> **Una vez habilitado, GuardDuty corre solo**: el dashboard muestra **planes de protección por tipo de recurso**
> (**S3**, **EKS**), la lista de findings se **filtra por severidad** y el detalle trae **Region, hora, recurso y
> workload** —todo lo necesario para decidir si se investiga con **Detective**—; y se puede habilitar **con o sin
> Organizations**.

---

## 1. Qué muestra la demo

**El marco:** el instructor **vuelve a Amazon GuardDuty** después de haber recorrido varios dashboards de
seguridad. *“Acá hay uno más.”* Es una recorrida **de consola**, no una clase teórica.

**Los cuatro momentos del recorrido:**

| # | Momento | Qué muestra |
| --- | --- | --- |
| **1** | **Dashboard** | **Protection plans** (**S3**, **EKS**) y los **campos tipo SIEM** del centro |
| **2** | **Findings** | Filtro por **severidad high**, **sample workloads** y un finding de **clúster EKS** |
| **3** | **Detalle del finding** | **Severidad**, **Region**, **hora**, **recurso**, **cluster name / ARN / VPC ID** y **tags** |
| **4** | **Investigación** | El **salto a Detective** y el **finding ID** como punto de partida |

**La aclaración que hace dos veces:** las cuentas y los workloads que muestra **son de prueba** (*“sample
accounts”*), y **cualquiera puede generar samples propios**.

> [!note] Es la demo más “operativa” del módulo
> La 07 mostró **cómo se lee un control de compliance**; esta muestra **cómo se lee un evento sospechoso**. La
> diferencia de fondo: **un control es un estado que persiste; un finding es un evento con hora**.

---

## 2. El dashboard: protection plans y vista de SIEM

### 2.1 Los planes de protección

> *“Podemos meternos en lo que llamamos **protection plans**. A la izquierda vemos **S3 protection**, **EKS
> protection**, si estás usando Elastic Kubernetes Service o corriendo una carga de contenedores.”*

| Plan | Para qué recurso |
| --- | --- |
| **S3 protection** | **Buckets de Amazon S3** |
| **EKS protection** | **Clústeres de Amazon EKS** y **cargas de contenedores** |

> [!important] El dato que la lección 09 no mostraba
> En [[Amazon GuardDuty]] las fuentes de datos eran **una lista de seis**. Acá se ve **la otra cara**: esos
> orígenes se **encienden por plan**, y cada plan tiene **su propio alcance de recurso**. **S3 y EKS no son
> “logs sueltos”: son módulos con interruptor.**

### 2.2 El centro del dashboard: campos de SIEM

> *“Podemos identificar algunos campos comunes que **típicamente verías en una herramienta SIEM**. Cosas como
> tus **findings y la severidad**, los **tipos de finding**; vemos que tenemos **acceso no autorizado sobre
> cierto runtime**, o un **impacto a cierto runtime desde una perspectiva de criptominado**.”*

| Campo | Qué aporta |
| --- | --- |
| **Findings** | La lista de eventos sospechosos |
| **Severidad** | **High**, **medium**, **low** |
| **Finding types** | La **familia** del hallazgo: **acceso no autorizado**, **impacto** (por ejemplo, **criptominado**) |
| **Runtime** | El **entorno de ejecución** afectado —típicamente **contenedores** |

> [!note] Lectura propia (no está en la fuente)
> La frase *“campos que verías en un SIEM”* es la forma más rápida de entender el producto: **GuardDuty no
> reemplaza al SIEM, pero trae el 80 % del trabajo hecho**. Un SIEM tradicional **necesita que alguien escriba
> las reglas**; acá las reglas **vienen con el servicio**. Lo que queda del lado del cliente es **la respuesta**:
> a quién avisa, qué automatiza y qué archiva.

> [!warning] Las cuentas de la demo son de prueba
> El instructor lo dice explícitamente y conviene retenerlo: **los hallazgos que se ven son generados a
> propósito**. En un entorno real **no se “generan” findings de criptominado para probar**: se usan **sample
> findings**, que existen justamente para **ensayar la respuesta** sin esperar un incidente.

---

## 3. Los findings: severidad, tipo y filtro

**La secuencia que hace en pantalla:**

| # | Acción | Resultado |
| --- | --- | --- |
| **1** | Abre **Findings** | El dashboard con **las severidades acostumbradas** |
| **2** | **Filtra por high** | Queda **solo lo urgente** |
| **3** | Mira los **sample workloads** | Aparece un finding **de clúster EKS** |
| **4** | **Expande el finding** | Se ven **highs, mediums y lows** dentro del detalle |

> [!important] El filtro primero, el contexto después
> La demo repite el método de la 07: **filtrar por severidad antes de leer**. Con decenas de findings, **el
> orden de lectura es la mitad del trabajo**. Y el filtro **no cambia el finding**: cambia **qué mirás primero**.

**Lo que el instructor remarca del detalle:** *“me está alertando en base a **lo que está pasando dentro de esta
instancia EC2**”* — mientras el campo de **resource type** dice **EKS cluster**. La contradicción se registra en
§5.

**Sobre los samples:** *“recordá que esto es solo un sample, pero **también podés crear samples para vos
mismo**”*.

> [!note] Lectura propia (no está en la fuente)
> Poder **crear samples propios** es lo que permite **probar la respuesta automatizada** de la lección 09
> —**GuardDuty → EventBridge → Lambda**— **sin provocar un incidente**. Es la misma lógica que un **game day**:
> el valor no está en el finding, está en **verificar que la alarma llega y que la Lambda hace lo que dice**.

---

## 4. Anatomía del finding, campo por campo

**El finding que abre es de un clúster EKS.** Lo que muestra, en el orden en que lo nombra:

| Campo | Qué dice |
| --- | --- |
| **Severity** | **High**, **medium** y **low** dentro del mismo detalle |
| **Region** | **Dónde** se identificó el finding |
| **Time** | **Cuándo** ocurrió |
| **Updated** | **Cuándo se actualizó** por última vez |
| **Target resource group** | El **grupo de recursos** objetivo |
| **Resource type** | **EKS cluster** |
| **Cluster name** | Nombre del clúster |
| **Amazon Resource Name (ARN)** | Identificador del recurso |
| **VPC ID** | **VPC asociada** |
| **Workload details** | Detalle de la **carga de trabajo** |
| **Instance tags** | **Tags** de la instancia |

> [!important] Las cuatro preguntas de la 09, en pantalla
> La lección de concepto decía que el finding responde **qué pasó, qué recursos, cuándo y dónde, y quién**. Acá
> se ve **el “cuándo” con dos relojes** —**time** y **updated**— y **el “dónde” con dos granularidades**:
> **Region** y **VPC ID**. **Un finding sin Region no se puede enrutar; uno sin VPC no se puede contener.**

> [!note] Lectura propia (no está en la fuente)
> **`time` y `updated` no son lo mismo**: el primero es **cuándo se detectó**; el segundo, **cuándo cambió el
> finding** —por ejemplo, cuando pasó de *running* a *archived*, o cuando se le agregó información—. En una
> investigación, **la diferencia entre ambos es la diferencia entre “empezó” y “sigue pasando”**.

> [!note] Los tags son la dimensión que falta en el examen
> **`instance tags`** y **`target resource group`** son lo que permite responder **“¿de quién es este
> incidente?”**. En un entorno multi-cuenta, **sin tagging no hay atribución**: el finding dice **qué** se
> comprometió, pero no **a quién avisarle**.

---

## 5. La errata de la demo: EC2 o EKS

**Lo que dice el instructor, textual:**

> *“Puedo ver que **esto me está alertando en base a lo que está pasando dentro de esta instancia EC2 en
> particular**.”*

**Lo que acaba de mostrar en pantalla, dos frases antes:** el **resource type** es **EKS cluster**, con
**cluster name**, **ARN** y **VPC ID**.

> [!warning] Discrepancia registrada, no corregida
> El relato **mezcla EC2 con EKS**: el finding es **de un clúster**, no de una instancia. **Se transcribe
> literal** (§8) y se señala acá. **No invalida la demo** —los campos que muestra son los de EKS—, pero **sí
> invalida la frase**: quien estudie de la transcripción sola **va a creer que era una instancia**.

> [!note] Por qué importa la distinción
> **No es lo mismo contener una instancia que un clúster.** En una instancia, **aislás el security group o la
> apagás**; en un clúster, **el compromiso puede estar en un pod, en una imagen o en el nodo**. La respuesta
> automatizada de la 09 —**modificar la NACL**— sirve para el nodo, **no para el pod**.

---

## 6. Detective: el paso siguiente

**El único lugar donde aparece:** *“Quizás quiero investigar esto un poco más con **Detective**.”*

**Lo que la fuente dice del resto del finding:** *“si volvemos al **finding ID**, podemos ver que hay **bastante
cosas distintas**”*.

> [!important] La fuente **nombra** Detective y **no lo explica**
> No hay definición, ni alcance, ni relación con GuardDuty más allá de **la sugerencia de investigar**. **No se
> agrega nada que la fuente no diga**; queda como **referencia pendiente** en el registro.

> [!note] Lectura propia (no está en la fuente)
> La división de trabajo que se desprende del recorrido es: **GuardDuty detecta** (te dice *que* algo pasa) y
> **Detective investiga** (te ayuda a reconstruir *cómo* pasó). **Uno emite el evento; el otro arma la línea de
> tiempo.** Es la misma separación que en la 07 había entre **el control fallido** y la **configuration
> timeline** de Config.

---

## 7. Cómo se habilitó: bajo el capó, con o sin Organizations

**La frase clave:** *“Está **corriendo bajo el capó una vez que lo habilité**.”*

**El contexto de la habilitación:** *“recordá que lo hicimos **cuando estábamos mirando Control Tower y AWS
Organizations**”* — es decir, en el módulo de **Multi-Account**.

**La aclaración que amplía todo:** *“**incluso sin tener esos servicios encendidos**, podés **habilitar GuardDuty
directamente en cualquiera de tus cuentas**”*.

| Camino | Cómo se habilita | Qué agrega |
| --- | --- | --- |
| **Vía Organizations / Control Tower** | **Delegando** la administración y **encendiendo** GuardDuty en las cuentas | **Cuenta administradora** y **findings agregados** (lección 09, §11) |
| **Directo, cuenta por cuenta** | **Desde la consola de cada cuenta**, sin organización | **Detección igual**, pero **sin vista consolidada** |

> [!important] Organizations **no es requisito** para GuardDuty
> Es la diferencia con **[[AWS Firewall Manager]]**, que **sí exige** ser **cuenta miembro de una organización**
> y que la organización tenga **all features turned on**. **GuardDuty se puede encender en una cuenta sola.**
> Organizations **escala la operación**, no habilita el servicio.

> [!warning] Lo que se pierde sin Organizations
> No se pierde **la detección**: se pierde **la cuenta administradora** y **la agregación**. En la práctica:
> **cada cuenta ve solo su parte**, y nadie tiene **el panorama**. Si el examen pide **“consolidar los findings
> de toda la organización”**, la respuesta **sí** incluye **Organizations**.

---

## 8. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla para
> estudiar**: lo que se estudia son las secciones **1 a 7** y se cierra con la **10**.
> Usala solo si (a) querés el texto exacto de un campo de la consola, o (b) antes del examen querés chequear un
> detalle.

### 8.1 Demo: AWS GuardDuty (transcripción)

**Hola, clase. Acá estamos de nuevo con Amazon GuardDuty.** **Ya vimos bastantes dashboards distintos y bastantes
servicios distintos en lo que hace a seguridad, ¿verdad?** **Ahora, acá hay uno más.**

**El dashboard de GuardDuty da una perspectiva única: nos permite meternos en lo que llamamos *protection
plans*.** **A la izquierda vemos que tenemos algo llamado *S3 protection*, *EKS protection*, si estás usando
Elastic Kubernetes Service o corriendo una carga de contenedores.** **También podemos volver al centro y
identificar algunos campos comunes que típicamente verías en una herramienta SIEM: cosas como tus findings y la
severidad de esos findings, los tipos de finding; podemos ver que tenemos accesos no autorizados sobre cierto
runtime, o un impacto a cierto runtime desde una perspectiva de criptominado.** **Ahora, no se preocupen: estas
son todas cuentas de prueba, cuentas de ejemplo, para mí.**

**Vamos a *Findings* un minuto.** **Puedo ver que mi dashboard de findings muestra la severidad a la que estamos
acostumbrados.** **Si filtro por severidad alta y miro las cargas de trabajo de ejemplo, quizás tenga curiosidad
por saber qué está pasando dentro de este finding en particular, alrededor del clúster de EKS.** **Déjenme hacer
clic en esto y expandir lo que nos muestra.** **Podemos ver que tengo algunas altas, medias y bajas distintas;
estamos acostumbrados a ver eso.** **Puedo ver que esto me está alertando en base a lo que está pasando dentro de esta instancia EC2 en
particular.** **Ahora, acordate, esto es solo un sample, pero también podés crear samples para vos mismo.**

**Y después también nos da una visión general.** **De nuevo, ¿cuál es la severidad?** **¿En qué Region se
identificó este finding, este problema?** **¿A qué hora?** **¿Cuándo se actualizó?** **¿Cuál es mi grupo de
recursos objetivo?** **Ahora podemos ver que el tipo de recurso es específicamente para mi clúster de EKS.**
**¿Qué detalles específicos alrededor de mi clúster?** **Nombre del clúster, Amazon resource name, qué VPC ID
podría estar asociada, y también detalles de la carga de trabajo.**

**Ahora, si vuelvo para arriba, o en realidad sigo bajando, puedo entrar en los tags de instancia y ver qué está
pasando con eso también.** **Pero de nuevo, si vuelvo arriba del todo, esto me va a ayudar a descubrir qué está
pasando realmente.** **Quizás quiero investigar esto un poco más con Detective.**

**Ahora, otra vez: si volvemos al finding ID, podemos ver que hay bastante cosas distintas.** **Mencionamos
Detective un poco acá, pero recordá que estamos hablando de monitoreo inteligente de detección de amenazas.**
**Esta es una de las bellezas, o los beneficios, o las características de GuardDuty específicamente.** **Está
corriendo bajo el capó una vez que lo habilité; recordá que lo hicimos cuando estábamos mirando Control Tower y
AWS Organizations.** **Incluso sin tener esos servicios encendidos, podés habilitar GuardDuty directamente en
cualquiera de tus cuentas.**

*Duración del video: **3 minutos 09 segundos**.*

> [!note] La fuente no trae nada más
> Esta lección es **video y transcripción, sin más**. **No hay imágenes, ni diagramas, ni texto de lectura, ni
> Knowledge Check**, ni una lista de los campos del finding. **Los campos de §4 se ordenan a partir de lo que el
> instructor nombra en voz alta**; no se completa ninguno que no aparezca.

---

## 9. Cuadro de cierre: qué se aprende solo en la consola

| Concepto | Dónde se ve | Por qué importa |
| --- | --- | --- |
| **Protection plans** | **Dashboard, columna izquierda** | **S3** y **EKS** se encienden **por recurso** |
| **Campos tipo SIEM** | **Centro del dashboard** | Findings, **severidad** y **finding types** sin armar pipeline |
| **Filtro por severidad** | **Findings** | Se lee **primero lo high** |
| **Sample findings** | **Findings** | Se **ensaya la respuesta** sin incidente real |
| **Resource type** | **Detalle del finding** | Dice si es **EKS**, **EC2**, **S3** o **IAM** |
| **`time` vs. `updated`** | **Detalle del finding** | **Cuándo empezó** vs. **cuándo cambió** |
| **Region + VPC ID** | **Detalle del finding** | **Dónde** enrutar y **dónde** contener |
| **Cluster name / ARN** | **Detalle del finding** | **Identifica el recurso exacto** sobre el que actuar |
| **Instance tags** | **Detalle del finding** | **A quién** avisarle |
| **Detective** | **Mención del instructor** | **Investigar** más allá del finding |
| **Habilitación directa** | **Cierre del video** | **Organizations no es requisito** |

---

## 10. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **GuardDuty corre solo una vez habilitado** (*“under the hood”*): **no hay agentes ni reglas propias**.
> 2. **El dashboard se organiza por protection plans**: **S3 protection** y **EKS protection** entre ellos.
> 3. **Los campos del dashboard son los de un SIEM**: **findings**, **severidad** y **tipos de finding**.
> 4. **Los finding types se agrupan por familia**: **acceso no autorizado**, **impacto** (**criptominado**).
> 5. **La lista se filtra por severidad**: **high** primero; el detalle conserva **high, medium y low**.
> 6. **El detalle trae Region, `time`, `updated`, target resource group, resource type, cluster name, ARN, VPC
>    ID, workload details e instance tags.**
> 7. **Se pueden generar sample findings** para **probar la respuesta** sin esperar un ataque.
> 8. **Detective aparece como el paso de investigación**, no de detección.
> 9. **Se puede habilitar GuardDuty directamente en cualquier cuenta**, **sin** Organizations ni Control Tower.
> 10. **Organizations agrega la cuenta administradora y la consolidación**, no la capacidad de detectar.

> [!warning] Trampa clásica del examen
> Escenario: *“la empresa tiene **una sola cuenta** y quiere detección de amenazas con **mínima operación**;
> ¿hace falta AWS Organizations?”*. **No**: **GuardDuty se habilita en la cuenta directamente**. Organizations
> aparece cuando el requisito es **ver todos los findings de la organización en un solo lugar**. Y si el
> enunciado pide **investigar** un finding de GuardDuty a fondo, la respuesta **no** es Security Hub —que
> **agrega**— ni GuardDuty otra vez: es **Detective**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[Amazon GuardDuty]] — **la lección de concepto** que esta demo ilustra: cuatro categorías, baseline, listas y
  respuesta automatizada
- [[Demo - AWS Security Hub]] — la otra demo del módulo: **control de compliance** en vez de **evento**
- [[Security Hub]] — dónde **se agregan** los findings que acá se ven uno por uno
- [[AWS Firewall Manager]] — el contraste: **exige** Organizations y **all features**; GuardDuty **no**
- [[AWS Control Tower]] — el contexto en el que el instructor habilitó GuardDuty
- [[AWS Organizations and IAM Identity Center]] — la organización que **consolida** los findings
- [[Gathering the Customer Requirements - Security]] — el requisito **5** (detección) que esta demo muestra
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[Cryptography]] — **los fundamentos del cifrado** que sostienen todo el bloque de
  claves: **HSM**, **tres estados del dato** y **client-side vs. server-side**

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 10 completa: demo de consola (protection plans, dashboard tipo SIEM, findings, detalle de EKS, Detective y habilitación directa) | Nota completa (secciones 1–10) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **El instructor dice “esta instancia EC2” mientras el finding es de un clúster EKS**: el **resource type** en
   pantalla dice **EKS cluster**. Se transcribe literal (§8.1) y se señala (§5). **No se corrige la fuente.**
2. **Detective se nombra y no se explica**: no hay definición, alcance ni relación técnica con GuardDuty. **No se
   agrega nada** (§6).
3. **La fuente no enumera los protection plans**: solo se ven **S3 protection** y **EKS protection**. **No se
   completa la lista** ni se agregan planes que no aparecen —**RDS protection**, por ejemplo, se menciona en la
   lección 09 como fuente, **no acá como plan**—.
4. **No se nombran los finding types completos**: solo **acceso no autorizado** e **impacto/criptominado**. **No
   se transcriben nombres técnicos** que la fuente no dice.
5. **La fuente no dice cuántos findings muestra ni cuántas cuentas participan**: **no se inventan cifras**.
6. **“Detective” no tiene nota propia en el vault** (verificado): **no se enlaza** para no crear un link roto.
   Queda como **referencia pendiente**.
7. **La lección no trae imágenes, diagramas, texto de lectura ni Knowledge Check**: es **transcripción de video**
   pura. El cuadro de §9 es **síntesis propia** de lo que se ve en pantalla.
8. **El nombre de archivo `Demo - AWS GuardDuty.md` no colisiona** con ninguna nota del vault (verificado: **0
   basenames duplicados**). Se mantiene el patrón **`Demo - …`** de la lección 07, que respeta el título de la
   fuente en vez de homogeneizar a **`Demonstration - …`**.

**Decisiones de transcripción:**

- Se conservan **protection plans**, **S3 protection**, **EKS protection**, **findings**, **severity**, **finding
  types**, **runtime**, **sample**, **workload**, **target resource group**, **resource type**, **Amazon
  Resource Name (ARN)**, **VPC ID**, **instance tags**, **finding ID**, **SIEM**, **Detective**, **Control
  Tower**, **Organizations** y **under the hood**.
- Las **cifras** se transcriben literales: **3 min 09 s**, **tres** severidades (**high**, **medium**, **low**),
  **dos** protection plans visibles, **dos** momentos del finding (**`time`** y **`updated`**).
- Se conserva el **nombre propio** del servicio **Elastic Kubernetes Service (EKS)** tal como lo dice la fuente.
