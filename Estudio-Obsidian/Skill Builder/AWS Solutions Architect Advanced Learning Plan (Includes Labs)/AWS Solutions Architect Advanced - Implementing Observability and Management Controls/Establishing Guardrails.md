---
title: "Establishing Guardrails"
aliases:
  - "Establishing guardrails"
  - "Guardrails"
  - "Establecer guardrails"
  - "Controles preventivos y detectivos"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - governance
  - control-tower
  - scp
  - config
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Establishing Guardrails"
---

# Establishing Guardrails

> [!abstract] Qué es este archivo
> Tercera lección del módulo. Convierte el concepto abstracto de **guardrail** (que quedó abierto en
> [[Governance at Scale]]) en algo concreto: **dos tipos** (preventive / detective), **tres niveles de guidance**
> (mandatory / strongly recommended / elective) y **un mecanismo de implementación para cada tipo**
> (**SCP** / **AWS Config + Lambda**).
>
> La idea que hay que llevarse: el **tipo** dice **cómo actúa**; la **guidance** dice **cuán obligatorio es**.
> Son dos ejes **independientes**.

> [!quote] Definición de la lección
> **“A guardrail is a high-level rule that provides ongoing governance for your overall AWS environment.”**
> Y ese entorno es **multi-cuenta y multi-región**.

---

## Resumen en una frase

> Un guardrail es una **regla de alto nivel** que se implementa como **SCP** (si previene) o como **regla de
> AWS Config + Lambda** (si detecta), y que se clasifica como **mandatory, strongly recommended o elective**
> independientemente de su tipo.

---

## 1. Los dos tipos de guardrail

| | **Preventive** | **Detective** |
| --- | --- | --- |
| **Qué hace** | **Impide** las acciones que llevan a una violación de política | **Descubre** recursos no compliant y **avisa** |
| **Cómo** | **SCPs**, que son parte de **AWS Organizations** | **Reglas de AWS Config** + **funciones Lambda** |
| **Estados posibles** | **enforced** · **not turned on** | **clear** · **in violation** · **not turned on** |
| **Cobertura regional** | **Todas las regiones de AWS** | **Solo** las regiones **soportadas por AWS Control Tower** |
| **Remediación** | No aplica: la acción **nunca ocurre** | **No** remedia sola: el cliente sigue siendo responsable (se puede automatizar) |
| **Alerta** | — | **Dashboard** de Control Tower |

> [!important] Los estados no se mezclan
> Una guardrail **preventive** **no** puede estar *“in violation”*: si funciona, la acción no se ejecuta.
> Una **detective** **no** puede estar *“enforced”*: solo observa y reporta.
> Ésta es la trampa más común de las preguntas sobre guardrails.

---

## 2. Las tres categorías de guidance

La **guidance** es la recomendación de **a qué nivel aplicar** el guardrail. Es **independiente** de que sea
preventive o detective.

| Categoría | Qué significa | ¿Se activa sola en una landing zone nueva? |
| --- | --- | --- |
| **Mandatory** | **Siempre** se aplican | ✅ **Sí, todas** |
| **Strongly recommended** | Basadas en **best practices** comunes para entornos **well-architected** y **multi-cuenta** | ❌ No |
| **Elective** | Permiten **rastrear o bloquear** acciones que suelen restringirse en una empresa con AWS | ❌ No |

> [!important] El default que cae en el examen
> **Al crear una landing zone nueva: todas las mandatory se activan; las strongly recommended y las elective,
> no.** Si una opción dice “todas las guardrails se activan por default”, es falsa.

### 2.1 Cómo se combinan los dos ejes

```
                    ┌── Preventive (SCP) ──────────► enforced / not turned on
Guardrail ──────────┤
                    └── Detective (Config + Lambda) ► clear / in violation / not turned on

Guidance (eje aparte, aplica a ambos): mandatory · strongly recommended · elective
```

Ejemplo real de la lección: *“Disallow policy changes to log archive”* es **mandatory**; *“Disallow internet
connection through SSH”* es **strongly recommended**; el guardrail detective de **versioning en S3** es
**elective**.

---

## 3. Cómo se implementan

> **Analogía de la lección:** son como los guardrails de una autopista: protegen al usuario de cometer errores o
> de salirse del camino seguro. En el peor caso, protegen a los demás de los errores graves de uno.

Los guardrails se implementan **por detrás** (“behind the scenes”): vos ves la categoría y el estado, no la
política que hay debajo.

| Elemento | Qué aporta |
| --- | --- |
| **Guardrail category** | Identifica el guardrail. Ej.: la categoría **IAM** se refiere a **usuarios IAM** y afecta sus capacidades de acceso |
| **Preventive** | **SCP** (Service Control Policy), parte de **AWS Organizations** |
| **Detective** | **AWS Config rule** + **función Lambda** |

### 3.1 Herencia

Los guardrails se aplican **a las OUs** y, como se vio en [[Governance at Scale]], **se heredan hacia abajo**:
lo que se define en un nivel aplica a **todos los niveles inferiores**. La guidance **no cambia** esa mecánica.

---

## 4. Ejemplo preventivo: borrar en S3 sin MFA

**Guardrail de la categoría *Data security*:** impide acciones de **delete** sobre buckets de **S3** cuando el
usuario **no tiene MFA**.

| Aspecto | Detalle |
| --- | --- |
| **Cuando está activo** | Garantiza que el usuario **tenga MFA** antes de borrar un bucket u objeto |
| **Efecto** | **Previene** la violación de política: la acción **no se ejecuta** |
| **Implementación** | Una **SCP** |

### 4.1 Anatomía de la SCP (los 7 puntos de la lección)

| # | Elemento | Qué especifica |
| --- | --- | --- |
| **1** | **Version** | Las **reglas de sintaxis** del lenguaje para procesar la política (**no** es una fecha) |
| **2** | **Statement** | **Contenedor** de los elementos de la política. Puede haber **varios** statements; en el ejemplo hay **uno** |
| **3** | **Sid** *(opcional)* | **Nombre amigable** del statement, para humanos |
| **4** | **Effect** | Si el statement **permite o deniega** el acceso del **principal** y del **root** en la cuenta (`Allow` / `Deny`) |
| **5** | **Action** | **Servicio y acciones** que la SCP permite o deniega. En el ejemplo: `s3:DeleteObject`, `s3:DeleteBucket` o ambos |
| **6** | **Resource** | Los **recursos** a los que aplica. El **asterisco** significa **“todos”** (todos los buckets S3 gobernados) |
| **7** | **Condition** | **Cuándo** aplica el statement. En el ejemplo: **MFA requerido**; si no está presente, se restringe la acción |

> [!note] Detalle que suele preguntarse
> **Varias guardrails mandatory pueden compartir una sola SCP** que ejecuta **múltiples acciones**, en lugar de
> tener una SCP única por guardrail. Por eso la **misma SCP aparece repetida** en la referencia de guardrails,
> bajo **cada** guardrail mandatory a la que aplica. No es un error de documentación.

---

## 5. Ejemplo detective: S3 sin versioning

**Guardrail de la categoría *Data security*, de tipo *elective*.**

| Aspecto | Detalle |
| --- | --- |
| **Qué detecta** | Un bucket de **S3 creado sin versioning** activado |
| **Qué reporta** | Buckets **no compliant**, de forma continua |
| **Remediación** | **Responsabilidad del cliente**. Se puede **automatizar** (la lección lo adelanta) |
| **Implementación** | **Regla de AWS Config** |

### 5.1 Anatomía de la regla de Config (los 7 puntos de la lección)

El ejemplo es un template de **AWS CloudFormation en YAML**.

| # | Elemento | Qué especifica |
| --- | --- | --- |
| **1** | **Parameters** | Lista de parámetros del template. Acá hay **uno**: `ConfigRuleName`, definido como **string** |
| **2** | **Resources** | Lista de recursos que se incluyen en el stack |
| **3** | **Logical identifier** | Identificador **predefinido** (aunque podés elegir el nombre). En el ejemplo: `CheckForS3VersioningEnabled` |
| **4** | **Resource type** | El tipo es **regla de AWS Config** |
| **5** | **ConfigRuleName** | El **nombre de la regla**. La función **`Sub`** reemplaza el valor con el parámetro |
| **6** | **Source** | **Dueño** de la regla (**AWS** o **customer**) y el **identificador** de la regla |
| **7** | **Scope** | Qué recursos se evalúan. En el ejemplo, los que **empiezan como bucket de S3** |

> [!tip] Cómo distinguir los dos ejemplos de un vistazo
> **SCP** = JSON con `Effect`, `Action`, `Resource`, `Condition` → **bloquea**.
> **Config rule** = YAML de CloudFormation con `Parameters`, `Resources`, `Source`, `Scope` → **evalúa y reporta**.

---

## 6. Otros ejemplos por categoría

| Categoría | Guardrail | Qué protege |
| --- | --- | --- |
| **Operations** | **Disallow launch of EC2 instance types that are not optimized for EBS** | Solo permite lanzar instancias con un volumen **EBS performance optimized**, para minimizar la contención entre el I/O de EBS y el resto del tráfico de la instancia |
| **Network** | **Disallow internet connection through RDP** | Reduce la exposición del servidor eliminando conectividad sin restricción a consolas remotas como **RDP** |
| **Network** | **Disallow internet connection through SSH** | Lo mismo para **SSH** |
| **Monitoring** | **Disallow policy changes to log archive** | Protege la integridad del **log archive**: ningún usuario puede cambiar políticas sobre ese bucket S3 |
| **Monitoring** | **Integrate CloudTrail events with CloudWatch Logs** | Envía eventos de **CloudTrail** a **CloudWatch Logs** para **analizar la actividad en tiempo real** |
| **IAM** | **Disallow access to IAM users without MFA** | Exige **MFA** a cualquier usuario IAM que use la cuenta |
| **IAM** | **Disallow console access to IAM users without MFA** | Exige **MFA** específicamente para el **acceso por consola** |

> [!note] Duplicación en la fuente
> En la sección *Operations*, la lección repite dos veces el mismo guardrail de instancias **no optimizadas para
> EBS**, con el texto casi idéntico. Se transcribe **una sola vez** acá; queda anotado en el registro.

> [!important] Los dos ejemplos del transcript
> El instructor cierra con dos casos para fijar la lógica de las categorías:
> - **Mandatory** → *“Disallow policy changes to log archive”*: no querés que nadie **desactive el logging**.
> - **Strongly recommended** → *“Disallow internet connection through SSH”*: no querés que se entre a la red
>   **por SSH sin restricción**.

---

## 7. Cómo encaja con lo anterior

| Pieza | De dónde viene | Qué agrega esta lección |
| --- | --- | --- |
| **Guardrails se heredan hacia abajo** | [[Governance at Scale]] | Acá se ve **cómo** se implementan y **qué estados** tienen |
| **SCPs** | Organizations / módulo anterior | Se confirma que son el mecanismo **preventivo** |
| **AWS Config** | Módulo anterior | Se confirma que es el mecanismo **detectivo**, junto con **Lambda** |
| **Landing zone** | Control Tower | Defaults: **mandatory on**, el resto **off** |
| **Dashboard** | Control Tower | Canal de **alerta** para los detectivos |

---

## 8. Traducción del contenido

### 8.1 Introducción

En esta lección aprenderás sobre **guardrails**. Un **guardrail** es una **regla de alto nivel** que brinda
**gobernanza continua** para tu entorno de AWS en general.

### 8.2 Transcript (duración: 5 minutos 43 segundos)

Establecer guardrails es donde vamos a cubrir esto un poco más a fondo, pero quiero que recuerdes: tenemos esa
**regla de alto nivel que brinda gobernanza continua**. Esto es en todo tu entorno de AWS, **entre múltiples
cuentas y múltiples regiones** también.

Ahora, **AWS Control Tower** implementa **controles preventivos y detectivos** que nos ayudan a **gobernar
nuestros recursos** y a **monitorear el compliance** de aquí en adelante.

Recordá: los **controles preventivos** aseguran que nuestras cuentas **mantengan el compliance**, porque
**impiden acciones que llevan a violaciones de política**. Las **guardrails preventivas** están **enforced** o
**not enabled**, pero **están soportadas en todas las regiones**.

Ahora, las **guardrails detectivas** nos ayudan a **descubrir recursos no compliant o no-compliance** dentro de
nuestras cuentas, como **violaciones de política**, pero también dan una forma de **ser alertados mediante un
dashboard** o incluso de **automatizar alguna actividad de remediación**. El **estado de las guardrails
detectivas** es **clear**, **in violation** o **not enabled**.

AWS Control Tower proporciona **tres categorías de guidance**: **mandatory**, **strongly recommended** y
**elective** guardrails.

Ahora, **mandatory** suena bastante autoexplicativo: son guardrails que **siempre se aplican**. **Strongly
recommended**, en cambio, se basan en algunas **best practices comunes**, ya sea de tu **Well-Architected
Framework** o de un **entorno multi-cuenta**. Y las **elective guardrails** te permiten **rastrear y bloquear
acciones que comúnmente se restringen en un entorno empresarial de AWS**.

Pero quiero que tengas esto en cuenta: **cuando creás una landing zone nueva, todas las guardrails mandatory se
habilitan por default. Las recommended y las elective no se habilitan por default.**

Este ejemplo muestra las categorías. Por ejemplo, tenemos la categoría **IAM**, que se refiere a **usuarios de
Identity and Access Management** y a los efectos de esas capacidades de acceso en tus cuentas. Pero también
recordá: cuando implementaste **guardrails preventivas** usando cosas como **service control policies**, eso
también es parte de **AWS Organizations**. Además, podés aplicar **guardrails detectivas** usando **reglas de
AWS Config y funciones Lambda**.

Ahora revisemos este ejemplo. Muestra el **security guardrail que restringe las acciones de borrado en buckets de
Amazon S3 sin MFA**. Cuando este guardrail está habilitado, asegura que los usuarios **deban tener MFA antes de
borrar un objeto en un bucket de S3**.

¿Y este otro? Vemos que lo implementamos con una **SCP (service control policy)**. Acá estamos **restringiendo
las acciones de borrado cuando el multi-factor no está presente** para un usuario también. Podemos ver arriba que
tenemos **versioning** —que **no es la fecha**, sino que especifica las **reglas del sistema** sobre cómo vamos a
procesar la política de aquí en adelante—.

Más abajo vemos que el statement tiene algo llamado **Sid**. Pensalo simplemente como una **opción de descripción
para humanos**. Pero tenemos un par de cosas distintas acá: tenemos **effect**, **action** y **resource**.

Y cuando leo eso, quiero que te agarres la oreja: pensá en **effect** como **allow / deny**. La **action** va a
ser **qué acción querés hacer**: vemos que estamos usando el servicio **S3** y vamos a **delete object** o
**delete bucket**. Esos son los **verbos o acciones** que se pueden ejecutar. ¿Y **contra qué recursos**? Vemos
que tenemos ese **asterisco o wildcard** en la sección de **resources**, así que eso realmente significa **todos
los buckets de S3** que se están gobernando.

Pero también vemos esa pequeña sección que dice **condition**. Ahí es donde estipulamos que **MFA debe estar
presente** y, si no lo está, es donde vamos a **restringir esa acción**.

También recordá: **ciertas guardrails mandatory se implementan dentro de una sola SCP que ejecuta múltiples
acciones**, en lugar de una política única por guardrail, que es lo que estamos viendo acá.

Recordá que **cuando habilitamos guardrails detectivas, usamos reglas de AWS Config** para hacerlo. Cuando este
guardrail detectivo está habilitado, **detecta cuando se crea un bucket de Amazon S3 sin habilitar versioning** en
ese bucket. También **detecta buckets no compliant** de aquí en adelante.

Y recordá esto: **sigue siendo responsabilidad del cliente realizar la remediación o las acciones correctivas**,
pero más adelante te voy a hablar de **cómo se puede automatizar**.

Acá hay un ejemplo de una **regla de AWS Config**. Está **verificando que el versioning de S3 esté habilitado**.
Recordá que el **logical identifier** que vemos acá es solo un **campo predefinido**, pero lo que realmente quiero
que te llame la atención es la **sección de propiedades**. Vemos el **nombre de la regla de Config**, similar a lo
que acabamos de mencionar. Vemos la **descripción**, autoexplicativa: **verifica si el versioning está habilitado
para tu bucket de S3**, suena lógico. Y más adelante pensamos también en el **scope**: podemos ver que el scope
son los **tipos de recursos de compliance asociados específicamente a buckets de S3**.

Acá hay un ejemplo de algunas categorías adicionales. Revisemos algunas. Vemos que podemos empezar por
**mandatory**, donde tenemos **disallow policy change to log archive**. Pensá en el hecho de que **no querés que
los usuarios de tu entorno deshabiliten el logging**. Suena contradictorio, ¿no?

¿Y qué hay de **strongly recommended**, donde vemos **disallow internet connection through SSH**? Quizá no
queremos que los usuarios **entren a nuestro entorno o a nuestra red por SSH**. Considerá algunos de esos factores
como otros ejemplos o categorías que quizá quieras implementar de aquí en adelante.

### 8.3 Guardrail types

Los guardrails te ayudan a **expresar las intenciones de tu política**. Se categorizan por su **comportamiento** y
por su **guidance**. Usando guardrails, **AWS Control Tower implementa controles preventivos y detectivos** que
ayudan a **gobernar tus recursos** y a **monitorear el compliance** en grupos de cuentas de AWS.

**Guardrails preventivas.** El comportamiento de una guardrail preventiva asegura que tus cuentas **sigan siendo
compliant**, porque **deshabilita (disallows) las acciones que llevan a violaciones de política**. El estado de una
guardrail preventiva es **enforced** o **not turned on**. Las guardrails preventivas **están soportadas en todas
las regiones de AWS**.

**Guardrails detectivas.** La guardrail detectiva **descubre recursos no compliant dentro de tus cuentas**, como
**violaciones de política**, y **provee alertas a través del dashboard**. El estado de una guardrail detectiva es
**clear**, **in violation** o **not turned on**. Las guardrails detectivas **aplican solo en las regiones de AWS
soportadas por AWS Control Tower**.

### 8.4 Guardrail guidance

La **guardrail guidance** se refiere a la **práctica recomendada de aplicar cada guardrail a tus OUs**. La
guidance de un guardrail es **independiente** de que sea preventiva o detectiva. AWS Control Tower provee **tres
categorías de guidance**: **mandatory**, **strongly recommended** y **elective**.

- Las **guardrails mandatory** **siempre se aplican**.
- Las **guardrails strongly recommended** se basan en algunas **best practices comunes** para entornos
  **well-architected y multi-cuenta**.
- Las **guardrails elective** permiten a los clientes **rastrear o bloquear acciones que comúnmente se
  restringen en un entorno empresarial de AWS**.

Cuando se crea una **landing zone nueva**, **todas las guardrails mandatory se habilitan por default**. Las
**strongly recommended** y las **elective** **no se habilitan por default**.

### 8.5 Implementation

> **Los guardrails son similares a los guardrails de una autopista: protegen al usuario de cometer errores o de
> desviarse demasiado del camino seguro. En el peor de los casos, protegen a los demás de los errores graves de un
> solo usuario.**

Los guardrails se implementan **por detrás de escena**. La **categoría del guardrail** identifica el guardrail. Por
ejemplo, la categoría **IAM** se refiere a los **usuarios IAM** y afecta sus **capacidades de acceso**.

Se implementan **guardrails preventivas** usando **service control policies (SCPs)**, que son parte de **AWS
Organizations**. Se aplican **guardrails detectivas** usando **reglas de AWS Config y funciones AWS Lambda**.

**Ejemplo de guardrail preventiva.** Este ejemplo muestra un guardrail de **data security** que **deshabilita las
acciones de borrado en buckets de S3 sin MFA**. Cuando el guardrail está habilitado, asegura que los usuarios
**tengan MFA antes de borrar buckets de S3**. **Previene violaciones de política.**

#### Detalle de implementación: service control policy

Este ejemplo muestra la representación **JSON** de una **service control policy (SCP)**.

**1: Version.** `Version` especifica las **reglas de sintaxis del lenguaje** que se usan para procesar la política.

**2: Statement.** `Statement` sirve como el **contenedor de los elementos de la política**. Podés tener **múltiples
statements** en las SCPs, pero en este ejemplo hay **uno**.

**3: Sid (opcional).** `Sid` provee un **nombre amigable** para el statement.

**4: Effect.** `Effect` define si el statement de la SCP **permite o deniega** el acceso del **principal** y del
**root** en una cuenta.

**5: Action.** `Action` especifica el **servicio y las acciones de AWS** que la SCP permite o deniega. En este
ejemplo, se **previene el borrado de un bucket, de un objeto en un bucket, o de ambos**.

**6: Resource.** `Resource` especifica los **recursos de AWS** para la SCP. En este caso, un **asterisco** indica
**“todos”**.

**7: Condition.** `Condition` especifica las **condiciones** para que el statement esté en efecto, y muestra que
**se requiere MFA**.

**Ciertas guardrails mandatory se implementan con una sola SCP que ejecuta múltiples acciones**, en lugar de como
SCPs únicas. Por lo tanto, **la misma SCP se muestra en la referencia de guardrails, bajo cada guardrail mandatory
a la que esa SCP aplica**.

#### Ejemplo de guardrail detectiva

Este ejemplo muestra una **guardrail detectiva**. Pertenece a la categoría **Data security** y es **elective**.
Cuando se habilita, **detecta cuando se crea un bucket de S3 sin habilitar el versioning**. Al ser una guardrail
detectiva, **detecta buckets no compliant**. **Sigue siendo responsabilidad del cliente realizar la remediación o
las acciones de corrección**, que **se pueden automatizar**.

#### Detalle de implementación: AWS Config

Como se mencionó antes, la implementación de las guardrails detectivas **se apoya en reglas de AWS Config**. Este
es un ejemplo de una regla de AWS Config. El código es un template **YAML de AWS CloudFormation**.

**1: Parameters.** `Parameters` es una **lista de parámetros** que usa el template. Acá hay **solo uno**:
`ConfigRuleName`, definido como **string**.

**2: Resources.** `Resources` es una **lista de recursos** que querés incluir en el stack.

**3: Logical identifier.** El **identificador lógico** está **predefinido** acá, pero podés elegir el nombre:
`CheckForS3VersioningEnabled`.

**4: Resource type.** El **tipo de recurso** es una **regla de AWS Config**.

**5: ConfigRuleName.** `ConfigRuleName` es el **nombre de la regla**. La función **`Sub`** reemplaza el valor con
el **parámetro**.

**6: Source.** `Source` es el **dueño de la regla de AWS Config** (**AWS** o **customer**) y el **identificador de
la regla**.

**7: Scope.** `Scope` define **qué recursos empiezan como un bucket de S3** (una evaluación para una regla de AWS
Config).

#### Otros ejemplos

**Operations**

- **Disallow launch of Amazon EC2 instance types that are not optimized for Amazon EBS:** lanzar instancias EC2
  solo con un volumen de **Amazon EBS performance optimized**. Estos volúmenes **minimizan la contención** entre el
  I/O de EBS y otro tráfico de tu instancia.

**Network**

- **Disallow internet connection through RDP:** reducir la exposición de un servidor **eliminando la conectividad
  sin restricciones a servicios de consola remota como RDP**.
- **Disallow internet connection through SSH:** reducir la exposición de un servidor **eliminando la conectividad
  sin restricciones a servicios de consola remota como SSH**.

**Monitoring**

- **Disallow policy changes to log archive:** proteger la **integridad de tu log archive** asegurando que **ningún
  usuario** haga **cambios de política** sobre el bucket de S3.
- **Integrate CloudTrail events with CloudWatch Logs — Perform real-time analysis of activity data:** enviar
  **eventos de CloudTrail a Amazon CloudWatch Logs**.

**IAM**

- **Disallow access to IAM users without MFA:** proteger la cuenta **requiriendo MFA para cualquier usuario IAM**
  que use la cuenta. MFA **agrega un código extra de autenticación** sobre el nombre de usuario y la contraseña.
- **Disallow console access to IAM users without MFA:** proteger la cuenta **requiriendo MFA para cualquier usuario
  IAM que use la consola**. MFA agrega un código extra de autenticación sobre el nombre de usuario y la contraseña.

---

## 9. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 9.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Preventive guardrails (SCP)** | **1.2** Prescribir controles de seguridad · **2.3** Controles según requisitos |
| **Detective guardrails (Config + Lambda)** | **1.2** · **3.1** Excelencia operativa · **3.2** Mejorar la seguridad |
| **Guidance y defaults de la landing zone** | **1.4** Diseñar un entorno de AWS de varias cuentas |
| **Monitoreo de compliance y dashboard** | **3.1** · **1.5** (visibilidad) |

### 9.2 Diez puntos para llevarse

1. **Guardrail = regla de alto nivel** de gobernanza **continua**, multi-cuenta y multi-región.
2. **Preventive = SCP** (Organizations). **Detective = regla de Config + Lambda**.
3. **Preventive**: estados **enforced / not turned on**; **todas las regiones**.
4. **Detective**: estados **clear / in violation / not turned on**; **solo regiones soportadas por Control Tower**.
5. **Guidance ≠ tipo**: mandatory, strongly recommended y elective aplican a **cualquiera** de los dos tipos.
6. **Mandatory siempre se aplica**; en una landing zone nueva, **solo las mandatory vienen activas**.
7. **Strongly recommended** = best practices de **Well-Architected** y **multi-cuenta**.
8. **Elective** = acciones **comúnmente restringidas** en empresas.
9. **Una SCP puede cubrir varias guardrails mandatory** → aparece repetida en la referencia.
10. **Detective detecta, no remedia**: la remediación es del cliente y **puede automatizarse**.

### 9.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Una guardrail **detectiva** puede estar **enforced**” | Los estados son **clear / in violation / not turned on** |
| “Una guardrail **preventiva** puede estar **in violation**” | Si previene, la acción no ocurre: **enforced / not turned on** |
| “Todas las guardrails se activan al crear la landing zone” | Solo las **mandatory** |
| “Las detectivas funcionan en **todas** las regiones” | Solo en las **soportadas por Control Tower** |
| “Las detectivas **remedian** solas” | Solo **detectan y alertan**; la remediación es del cliente (y se puede automatizar) |
| “**Mandatory** es un tipo de guardrail” | Es una **categoría de guidance**, no un tipo |
| “Cada guardrail necesita su propia SCP” | Varias mandatory pueden compartir **una SCP con múltiples acciones** |
| “`Version` es la fecha de la política” | Son las **reglas de sintaxis** del lenguaje |
| “`Sid` es obligatorio” | Es **opcional** y solo da un **nombre amigable** |
| “`Condition` aplica al recurso” | Define **cuándo** el statement está en efecto (ej.: **MFA presente**) |

> [!note] Ampliación (no está en la fuente)
> En el módulo anterior de este mismo plan, **AWS Control Tower** aplicaba **20 preventive + 6 detective controls**
> al crear la landing zone (salvo en la management account). Cruzado con esta lección: esas son las **mandatory**
> que vienen activas por default. Ver [[AWS Control Tower]].

---

## 10. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + transcript (5:43) + *Guardrail types* + *Guidance* + *Implementation* (SCP y Config) + *Other examples* | Nota completa (secciones 1–9) |

**Decisiones de transcripción:**

- La fuente **duplica** el guardrail de *Operations* sobre instancias **no optimizadas para EBS**, con texto casi
  idéntico. Se transcribió **una vez**; la duplicación queda anotada.
- El transcript dice “**Adibus** control tower” y “**SEP**” (por *SCP*): son errores de reconocimiento de voz. Se
  normalizaron a **AWS Control Tower** y **SCP** sin cambiar el contenido.
- “**versioning**, que **no es la fecha**” → el original dice *“which is not the date”*: se mantiene la aclaración
  porque el instructor la usa para diferenciar `Version` de una fecha.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Governance at Scale]] — los tres focos y la **herencia** de guardrails hacia abajo
- [[Course Overview]] — servicios y objetivos del curso
- [[AWS Control Tower]] — landing zone, guardrails y **20 preventive + 6 detective** (módulo anterior)
- [[AWS Organizations and IAM Identity Center]] — SCPs y OUs (módulo anterior)
- [[1.2 Prescribir controles de seguridad]] · [[2.3 Determinar los controles de seguridad en función de los requisitos]]
- [[1.4 Diseñar un entorno de AWS de varias cuentas]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales
