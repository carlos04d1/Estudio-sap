---
title: "Demo - AWS KMS"
aliases:
  - "Demo: AWS KMS"
  - "Demo KMS"
  - "Crear una KMS key y aplicarla a S3"
  - "SSE-KMS en la consola"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - demo
  - kms
  - cifrado
  - dominio-2
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Demo - AWS KMS

> [!abstract] Qué es este archivo
> Décima tercera lección del módulo. Es la **demo que convierte [[AWS KMS]] en algo que se puede hacer**:
> **crear una KMS key**, **aplicarla a un bucket de S3** como cifrado por defecto y **comprobar** que el archivo
> queda cifrado y que **solo quien tiene permisos lo lee**.
>
> **No enseña conceptos nuevos**: enseña **el orden de los pasos** y **dónde se rompe** —casi siempre, en las
> **key policies**—. Video: **6 min 21 s**. **Sin imágenes, sin texto de lectura y sin Knowledge Check.**

> [!quote] La idea que ordena todo
> *“KMS requiere **dos niveles de permiso**: **quién puede administrar la clave** y **quién puede usarla para
> cifrar**.”* Y el error que repite todo el mundo: *“**asumir que los permisos de IAM alcanzan**”*. **No alcanzan:
> KMS tiene sus propias key policies.**

---

## Resumen en una frase

> La demo hace **cuatro cosas** —**crear** una clave simétrica con alias, **repartir** los dos niveles de permiso,
> **aplicarla** como cifrado por defecto de un bucket con **SSE-KMS** y **probar** que **con permisos se descarga y
> sin permisos da Access Denied**— y cierra con **seis mejores prácticas** que no están en la consola.

---

## 1. Qué muestra la demo

**La presentadora:** **Melissa**. **El objetivo, dicho al principio:**

> *“Al final de esta demo vas a tener **una KMS key funcional aplicada a un bucket de S3**, y vas a entender **cómo
> funcionan el cifrado y el descifrado en AWS**. **Es sorprendentemente fácil empezar**.”*

**Los cuatro momentos:**

| # | Momento | Qué queda |
| --- | --- | --- |
| **1** | **Crear la clave** | Una **symmetric key** con alias **`demo KMS key`** y **dos niveles de permiso** |
| **2** | **Aplicarla a S3** | **Default encryption** del bucket con **SSE-KMS** |
| **3** | **Verificar** | Un archivo subido, con **server-side encryption** habilitada **con KMS** |
| **4** | **Probar el acceso** | **Descarga correcta** con permisos; **Access Denied** sin ellos |

**El encuadre del caso:** *“este es un **paso crucial** para asegurar información sensible **en servicios como S3
y RDS**”*.

> [!note] Es la demo más “de procedimiento” del módulo
> La 07 mostró **cómo se lee** un control, la 10 **cómo se lee** un finding, y esta **cómo se hace**: **consola,
> clics, orden**. Y como toda demo de procedimiento, **el valor está en los dos puntos donde la gente se traba**:
> **las key policies** (§3) y **la replicación entre Regions** (§6).

---

## 2. Crear la clave, paso a paso

| # | Paso | Detalle |
| --- | --- | --- |
| **1** | **Ir al servicio KMS** | En la consola de administración |
| **2** | **Quedarse en *customer managed keys*** | *“Deberías estar en **customer managed keys**”* |
| **3** | **Create a key** | — |
| **4** | **Elegir *symmetric key*** | *“Porque es **la más usada** para cifrar y descifrar datos en AWS”* |
| **5** | **Definir el alias** | **`demo KMS key`**, *“para referenciarla fácil después”* |
| **6** | **Configurar el acceso** | **Key administrators** + permisos de cifrado (§3) |
| **7** | **Review → Create** | *“Clic en next para ir a la página de review y creamos la clave”* |

> [!important] Simétrica *porque es la que sirve*
> La demo elige **symmetric** sin dudar, y no es una preferencia estética: en [[AWS KMS]] §4 quedó dicho que **los
> servicios integrados solo cifran con claves simétricas**. **Una asimétrica no habría servido para SSE-KMS.**

> [!note] El alias es la interfaz
> **`demo KMS key`** es un **alias**, no la clave. En la consola y en las políticas se trabaja **con el alias**; el
> **key ID** queda detrás. **Renombrar el alias no cambia la clave, y remapear el alias es justamente cómo se hace
> la rotación manual** (lección 12, §10.1).

---

## 3. Los dos niveles de permiso (el corazón de la demo)

**La frase textual:**

> *“Ahora hablemos del **control de acceso**. **KMS requiere dos niveles de permiso**: **quién puede administrar la
> clave** y **quién puede usarla para cifrar**.”*

**El error que señala:**

> *“Un **error común** acá es **asumir que los permisos de IAM solos alcanzan**. Pero **KMS tiene sus propias key
> policies** que deben estar **configuradas correctamente**.”*

| Nivel | Quién | Qué habilita |
| --- | --- | --- |
| **1. Administración** | **Key administrators** | **Administrar la clave** (política, ciclo de vida) |
| **2. Uso** | **Key users** | **Usarla para cifrar y descifrar** |

**Lo que hace Melissa:** **se agrega a sí misma como key administrator** y **asigna permisos de cifrado a los IAM
roles necesarios**.

> [!important] IAM no es suficiente
> Es **la trampa central de la lección** y **la que más se repite en el examen**: **la key policy y la IAM policy
> son dos puertas**. Si la **key policy** no le da acceso a la cuenta o al rol, **IAM puede permitir todo y el
> `Decrypt` sigue fallando** con **Access Denied**. **La key policy manda sobre la clave.**

> [!warning] El efecto práctico del error
> Quien configura **solo IAM** obtiene **una clave que nadie puede usar** —o que **solo el dueño** puede usar— y
> **descubre el problema en producción**, cuando el servicio que cifra **no puede descifrar**. Es exactamente el
> cierre de la demo: *“**key policies mal configuradas pueden causar problemas de acceso**, así que **siempre
> revisá tu configuración**”*.

> [!note] Lectura propia (no está en la fuente)
> El “dos niveles” no es un detalle de consola: es **el modelo de responsabilidad** de KMS. **El administrador de
> la clave no tiene por qué poder leer los datos**, y **el usuario de la clave no tiene por qué poder borrarla**.
> Si un examen te ofrece **un solo rol para las dos cosas**, está ofreciendo **el anti-patrón**.

---

## 4. Aplicarla al bucket: SSE-KMS por defecto

| # | Paso | Detalle |
| --- | --- | --- |
| **1** | **Ir a S3** | *“Donde ya tengo un **bucket de demo**”* |
| **2** | **Properties** | — |
| **3** | **Habilitar *default encryption*** | El cifrado **por defecto del bucket** |
| **4** | **Elegir *AWS Key Management Service key*** | Es decir, **SSE-KMS** |
| **5** | **Seleccionar la clave recién creada** | La del alias **`demo KMS key`** |
| **6** | **Guardar los cambios** | *“Guardemos los cambios primero”* |

**El efecto, en palabras de la fuente:**

> *“Esto asegura que **cualquier archivo subido al bucket se cifre automáticamente con KMS**.”*

> [!important] “Default encryption” ≠ “cifrar este archivo”
> La opción de **Properties** define **la política del bucket**: **todo lo que se suba después** queda cifrado
> **sin que el que sube haga nada**. **Es el equivalente de SSE a nivel bucket** y la razón por la que el cifrado
> **se puede volver “por defecto”** y no una decisión por objeto.

> [!note] Lectura propia (no está en la fuente)
> **Poner la clave como default es también un contrato**: a partir de ese momento, **quien suba un objeto necesita
> permiso para usar la clave**. Si el bucket es compartido con equipos que **no** tienen `kms:GenerateDataKey`,
> **van a empezar a fallar las subidas**. **Cifrar por defecto cambia los permisos de todos, no solo del dueño.**

---

## 5. Verificar: subir y mirar las propiedades

**La secuencia de la demo:**

| # | Acción | Resultado |
| --- | --- | --- |
| **1** | **Volver a los buckets** | — |
| **2** | **Entrar al bucket de demo → `pictures`** | La carpeta donde va el archivo |
| **3** | **Upload** | Se sube un archivo de prueba |
| **4** | **Seleccionar el archivo → Properties** | — |
| **5** | **Bajar hasta server-side encryption** | **Habilitada, con KMS** |

**La conclusión que se extrae:**

> *“Como esperábamos, deberíamos ver que **server-side encryption está habilitada con KMS**, lo que significa que
> **incluso si alguien gana acceso no autorizado al bucket de S3, no va a poder leer los datos sin los permisos
> correctos**.”*

> [!important] La verificación es la parte que se saltea
> Subir un archivo **no demuestra nada** si no se mira **la propiedad**. **El cifrado se prueba en el objeto**, no
> en la configuración del bucket: **un bucket con default encryption y un objeto viejo sin cifrar es un caso
> real**. **Mirá el objeto, no la política.**

---

## 6. Probar el acceso (y el detalle de las Regions)

### 6.1 La descarga

| Actor | Qué pasa |
| --- | --- |
| **Con permisos** | **Descarga y abre normalmente**: *“como tengo los permisos correctos, el archivo se descarga y se abre”* |
| **Sin permisos** | ***“Access denied error”*** |

> [!important] El cifrado no se “ve”: se **comporta**
> **El archivo se ve igual** para quien tiene permisos. **La diferencia aparece en el que no los tiene**, y es
> **un error de autorización, no un archivo corrupto**. **Eso es exactamente lo que hay que buscar en la consola
> cuando algo “no abre”.**

### 6.2 Cross-Region replication

> *“Quiero mencionar que cuando trabajás con **cross-Region replication en S3**, recordá que **vas a necesitar KMS
> keys en las dos Regions**. **Un error común es asumir que una clave funciona en todas las Regions**.”*

| Suposición | Realidad |
| --- | --- |
| *“Una clave sirve para todas las Regions”* | **Cada Region necesita su clave** |

> [!important] La clave es regional
> **Una KMS key vive en una Region.** Si el bucket replica a otra Region, **la réplica necesita una clave en la
> Region de destino**. **Asumir lo contrario es el error que la demo marca explícitamente.**

> [!warning] Lo que la fuente **no** menciona
> La demo **no habla de multi-Region keys** —la alternativa que existe justamente para este escenario—. **No se
> agrega**: se registra como hueco (§ registro, punto 3). **La regla que sí queda**: **replicar datos cifrados
> implica resolver la clave en el destino.**

---

## 7. EBS: la mención que no se demuestra

> *“KMS también se usa para cifrar **volúmenes de Amazon EBS**. Cuando lanzás una **instancia EC2**, podés
> **habilitar el cifrado usando KMS**. Esto asegura que **el storage subyacente esté protegido**, agregando **otra
> capa de seguridad**.”*

**Y la aclaración:** *“aunque **no vamos a pasar por eso en esta demo**, tené en cuenta que **cifrar tus volúmenes
EBS con KMS es una buena práctica** para proteger cargas sensibles”*.

> [!note] Por qué lo menciona sin hacerlo
> Es **la misma clave, otro servicio**: EBS **crea y usa `aws/ebs`** si no elegís una customer managed. **Que no se
> demuestre no significa que no se pregunte**: **EBS + KMS es el par más común del examen después de S3.**

---

## 8. Las seis mejores prácticas (lo que no está en la consola)

**Melissa las presenta como *“battle-tested, de la comunidad de AWS”*, y aclara: *“no son pautas teóricas, son
lecciones aprendidas de la manera difícil”*.**

| # | Práctica | Por qué |
| --- | --- | --- |
| **1** | **Implementar tagging de claves desde el día uno** | **Crucial para cost allocation y auditoría** |
| **2** | **Configurar alarmas de CloudWatch** para **patrones sospechosos de uso de claves** | *“Hemos visto esto **detectar brechas potenciales durante horarios no laborables**”* |
| **3** | **Documentar el uso de cada clave** | **Qué aplicaciones la usan** y **qué datos cifran** |
| **4** | **Habilitar la rotación automática de claves** | **Asegurando que las aplicaciones la soporten sin romperse** |
| **5** | **Probar la rotación primero en desarrollo** | *“Test this in development first”* |
| **6** | **Revisar los patrones de acceso a las claves cada trimestre** | *“Te sorprendería **cuánto acceso innecesario queda** después de que terminan los proyectos o se van los integrantes del equipo”* |

> [!important] Las dos que más se preguntan
> **Tagging desde el día uno** (sin tags no hay **atribución de costo** ni **auditoría por aplicación**) y
> **revisión trimestral de accesos** (**el permiso que nadie revocó**). Las otras cuatro son **higiene operativa**;
> estas dos son **gobierno**.

> [!note] Lectura propia (no está en la fuente)
> El punto 2 completa algo que la lección 12 dejaba en CloudTrail: **CloudTrail registra, pero no avisa**. **La
> alarma de CloudWatch sobre métricas de uso de KMS es lo que convierte un log en una detección** —y encaja con el
> patrón **GuardDuty → EventBridge → Lambda** de la lección 09—: **observar, alertar, actuar**.

> [!warning] La rotación “gracefully”
> La fuente dice **habilitar la rotación automática** y **verificar que las aplicaciones la soporten**. **Es
> coherente con la lección 12**: la rotación automática **no obliga a re-cifrar** y **KMS conserva las versiones
> anteriores**, así que **una app que pide `Decrypt` sigue funcionando**. **La que se rompe es la que cachea la
> data key para siempre** —y eso la fuente no lo dice—.

---

## 9. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla para
> estudiar**: lo que se estudia son las secciones **1 a 8** y se cierra con la **11**.

### 9.1 Demo: AWS KMS (transcripción)

**Muy bien, vamos a meternos con la configuración de AWS Key Management Service, o KMS.** **Vamos a recorrer el
proceso de crear y usar KMS keys para que puedas cifrar datos de forma segura en AWS.** **Este es un paso crucial
para asegurar información sensible en servicios como S3 y RDS.** **Podés leer un poco más sobre tus opciones con
KMS en la documentación de AWS que tengo abierta acá.** **Al final de esta demo vas a tener una KMS key funcional
aplicada a un bucket de S3, y vas a entender cómo funcionan el cifrado y el descifrado en AWS.** **Es
sorprendentemente fácil empezar.**

**Muy bien, primero vayamos a la consola de administración y necesitamos crear una KMS key.** **En la consola,
naveguemos a la página del servicio KMS.** **Deberías estar en *customer managed keys*, y después hacemos clic en
*create a key*.** **Vamos a elegir una *symmetric key*, ya que es la más usada para cifrar y descifrar datos en
AWS.** **Para el alias, usemos algo como *demo KMS key*, así es fácil referenciarla después.**

**Ahora hablemos del control de acceso.** **KMS requiere dos niveles de permiso: quién puede administrar la
clave y quién puede usarla para cifrar.** **Un error común acá es asumir que los permisos de IAM solos
alcanzan.** **Pero KMS tiene sus propias key policies que deben estar configuradas correctamente.** **Así que nos
vamos a agregar a nosotros mismos como *key administrators* y asignar permisos de cifrado a los IAM roles
necesarios.** **Clic en next para llegar a la página de review y creamos la clave.**

**Con nuestra clave creada, ahora vamos a aplicarla a un bucket de S3.** **Voy a navegar a S3, donde ya tengo un
bucket de demo.** **En *properties* voy a habilitar el *default encryption*.** **Voy a elegir *AWS Key Management
Service Key*, o SSE-KMS, y después voy a seleccionar la clave que acabamos de crear.** **Esto asegura que
cualquier archivo subido al bucket se cifre automáticamente con KMS.**

**Así que verifiquemos esto subiendo un archivo de prueba.** **Vamos a guardar los cambios primero, y volvamos a
nuestros buckets.** **Entramos al *advanced ARC demo bucket* y a *pictures*, y vamos a subir.** **Una vez subido,
podemos revisar sus propiedades.** **Voy a seleccionar eso, estamos en la sección de propiedades.** **Y como
esperábamos, deberíamos bajar y ver que *server side encryption* está habilitada con KMS, lo que significa que
incluso si alguien gana acceso no autorizado al bucket de S3, no va a poder leer los datos sin los permisos
correctos.**

**Y quiero mencionar que cuando trabajás con *cross region replication* en S3, recordá que vas a necesitar KMS
keys en las dos regions.** **Un error común es asumir que una clave funciona en todas las regions.**

**Ahora que nuestro archivo está cifrado en S3, probemos el acceso.** **Voy a descargar el archivo directamente
desde la consola de S3.** **Podés ver que puedo descargarlo acá, y por supuesto, como tengo los permisos
correctos, el archivo se descarga y se abre normalmente.** **Sin embargo, si un usuario no autorizado intenta
esto, va a recibir un error de *access denied*.**

**KMS también se usa para cifrar volúmenes de Amazon EBS.** **Cuando lanzás una instancia EC2, podés habilitar el
cifrado usando KMS.** **Esto asegura que el storage subyacente esté protegido, agregando otra capa de seguridad.**
**Aunque no vamos a pasar por eso en esta demo, tené en cuenta que cifrar tus volúmenes EBS con KMS es una buena
práctica para proteger cargas sensibles.**

**Antes de cerrar, déjenme compartir algunas mejores prácticas probadas en batalla, de nuestra comunidad de
AWS.** **Siempre implementá un tagging adecuado de las claves desde el día uno.** **Es crucial para la asignación
de costos y la auditoría.** **Configurá alarmas de CloudWatch para patrones sospechosos de uso de claves.**
**Hemos visto esto detectar brechas de seguridad potenciales durante horarios no laborables.** **Documentá tu uso
de claves a fondo, incluido qué aplicaciones usan cada clave y qué datos cifran.** **Habilitá la rotación
automática de claves, pero asegurate de que tus aplicaciones puedan manejarla sin problemas.** **Probá esto
primero en desarrollo.** **Y lo más importante: revisá los patrones de acceso a las claves cada trimestre.** **Te
sorprendería cuánto acceso innecesario queda después de que terminan los proyectos o se van los integrantes del
equipo.** **No son solo pautas teóricas: son lecciones aprendidas de la manera difícil por organizaciones reales
que protegen sus datos sensibles.**

**Entonces, ¿qué logramos acá?** **Creamos una KMS key, la aplicamos a un bucket de S3 y verificamos el
cifrado.** **Pero más importante, aseguramos que solo usuarios autorizados puedan acceder a esos datos cifrados.**
**AWS KMS se integra con múltiples servicios de AWS, haciendo el cifrado simple y escalable.** **Así que recordá:
las key policies mal configuradas pueden causar problemas de acceso.** **Siempre revisá dos veces tus
configuraciones.** **Y eso es todo.** **Configuraste exitosamente AWS KMS y demostraste su uso.** **Súper
simple.** **Gracias por acompañar.**

*Duración del video: **6 minutos 21 segundos**.*

> [!note] La fuente no trae nada más
> Esta lección es **video y transcripción, sin más**: **no hay imágenes, ni diagramas, ni texto de lectura, ni
> Knowledge Check**, ni la lista de pasos por escrito. **Los pasos de §2 y §4 se ordenan a partir de lo que la
> presentadora dice en voz alta**, sin completar ninguno que no aparezca.

---

## 10. Cuadro de cierre: qué se aprende solo haciendo la demo

| Concepto | Dónde se ve | Por qué importa |
| --- | --- | --- |
| **Customer managed keys** | **Menú de KMS** | Es donde **se crean** las claves propias |
| **Symmetric key** | **Tipo de clave** | **La única que sirve para SSE-KMS** |
| **Alias** | **Nombre de la clave** | **La interfaz**; remapearlo es **rotación manual** |
| **Key administrators** | **Paso de acceso** | **Nivel 1**: administrar |
| **Key users + IAM roles** | **Paso de acceso** | **Nivel 2**: cifrar y descifrar |
| **Key policies** | **Paso de acceso** | **Sin ellas, IAM no alcanza** |
| **Default encryption** | **S3 → Properties** | El cifrado **se vuelve política del bucket** |
| **SSE-KMS** | **Opción de cifrado** | **Clave elegida por vos**, con auditoría |
| **Server-side encryption** | **Properties del objeto** | **La prueba** de que el objeto está cifrado |
| **Access Denied** | **Descarga sin permisos** | El síntoma de **key policy mal configurada** |
| **Claves en ambas Regions** | **Cross-Region replication** | **Una clave no cruza Regions** |
| **EBS** | **Mención** | **La misma clave, otro servicio** |
| **Tagging desde el día uno** | **Mejores prácticas** | **Costo y auditoría** |
| **Alarmas de CloudWatch** | **Mejores prácticas** | **Detectar uso raro, incluso de madrugada** |
| **Revisión trimestral** | **Mejores prácticas** | **El permiso que nadie revocó** |

---

## 11. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Crear una clave** es **customer managed** y **simétrica**: **así la usan los servicios integrados**.
> 2. **El alias** es el nombre con el que se referencia; **la clave** es otra cosa.
> 3. **KMS tiene dos niveles de permiso**: **administrar** (**key administrators**) y **usar** (**key users**).
> 4. **Los permisos de IAM solos no alcanzan**: **la key policy** también tiene que permitirlo.
> 5. **Default encryption** del bucket con **SSE-KMS** cifra **todo lo que se suba después**, sin intervención.
> 6. **La verificación es en el objeto**: **server-side encryption** con KMS en las **properties** del archivo.
> 7. **Con permisos se descarga; sin permisos, Access Denied** —un **error de autorización**, no de datos—.
> 8. **Cross-Region replication** exige **KMS keys en las dos Regions**: **una clave no cruza Regions**.
> 9. **EBS también se cifra con KMS**, eligiendo la clave al lanzar la instancia.
> 10. **Las seis prácticas**: **tags**, **alarmas de CloudWatch**, **documentación**, **rotación automática**,
>     **prueba en dev** y **revisión trimestral de accesos**.

> [!warning] Trampa clásica del examen
> Escenario: *“subimos un objeto a un bucket con **SSE-KMS** y el **rol de la aplicación recibe Access Denied al
> leerlo**, aunque su **IAM policy permite `s3:GetObject`**”*. La respuesta **no** es “el bucket está mal”: **falta
> `kms:Decrypt` en la key policy** (o **el rol no es key user**). Y si el escenario pide **replicar el bucket a
> otra Region** y pregunta qué falta, **no** es “activar la replicación”: **falta la clave en la Region de
> destino**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[AWS KMS]] — **la lección de concepto** que esta demo aplica: **envelope encryption**, **key policies**,
  **rotación** y **CloudTrail**
- [[Cryptography]] — los **tres estados del dato** y el **HSM** que hay detrás de cada clave
- [[Demo - AWS Security Hub]] y [[Demo - AWS GuardDuty]] — las otras demos del módulo
- [[Network Traffic Controls]] — el **cifrado en tránsito** que complementa el cifrado en reposo de esta demo
- [[Gathering the Customer Requirements - Security]] — el **requisito 4** (cifrado integrado) **en pantalla**
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[AWS CloudHSM]] — **el módulo responde quién controla el hardware**: HSM dedicado,
  nivel 3 y custom key store

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 13 completa: demo de consola (crear KMS key, dos niveles de permiso, SSE-KMS en S3, verificación, prueba de acceso, cross-Region y mejores prácticas) | Nota completa (secciones 1–11) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La transcripción dice “asignar permisos de cifrado a los necesarios IAM *rules*”**: debe ser **IAM roles**
   (la propia frase habla de roles en el contexto). Se traduce al sentido evidente y se registra.
2. **El nombre del bucket aparece como “advanced ARC demo bucket”**: es **un nombre de demo opaco**, no un
   servicio ni un concepto. **Se conserva literal** y no se interpreta.
3. **La fuente dice que la replicación cross-Region necesita claves en las dos Regions y no menciona
   multi-Region keys**: **no se agrega** la alternativa. **Queda como hueco** (posible tema de otra lección).
4. **La fuente afirma que la rotación automática “debe soportarse sin romper las apps”, sin explicar por qué**:
   la razón —**KMS conserva versiones anteriores**
   ([[AWS KMS]] §10.1)— **se enlaza, no se inventa acá**.
5. **No se especifica el tipo de clave elegido en el paso de S3** más allá de **SSE-KMS**; **no se dice** si es
   **AWS managed** o **customer managed**, aunque por el contexto **es la recién creada**.
6. **No hay imágenes, diagramas, texto de lectura ni Knowledge Check**: es **transcripción de video** pura. Los
   cuadros de §2, §4 y §10 son **síntesis propia** de los pasos narrados.
7. **La demo no muestra la key policy resultante**: **no se transcribe ninguna política** porque **la fuente no la
   muestra**.
8. **El nombre de archivo `Demo - AWS KMS.md` no colisiona** con ninguna nota del vault (verificado: **0
   basenames duplicados**). Se mantiene el patrón **`Demo - …`** de las lecciones 07 y 10.
9. **La presentadora se identifica solo como “Melissa”**: se conserva el nombre, **sin agregar apellido**.

**Decisiones de transcripción:**

- Se conservan **KMS key**, **customer managed keys**, **symmetric key**, **alias**, **key administrators**, **key
  users**, **key policies**, **default encryption**, **SSE-KMS**, **server-side encryption**, **access denied**,
  **cross-Region replication**, **key rotation**, **tagging**, **CloudWatch** y **battle-tested**.
- Las **cifras** se transcriben literales: **6 min 21 s**, **dos** niveles de permiso, **seis** mejores prácticas,
  **cuatro** momentos de la demo, **una** revisión **por trimestre**.
- Se conservan los **nombres propios y de recursos** tal como aparecen: **Melissa**, **`demo KMS key`**,
  **`pictures`**, **`advanced ARC demo bucket`**.
