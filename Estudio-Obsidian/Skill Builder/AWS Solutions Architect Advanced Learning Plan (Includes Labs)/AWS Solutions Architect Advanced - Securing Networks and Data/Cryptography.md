---
title: "Cryptography"
aliases:
  - "Criptografía"
  - "Cryptography - Securing Networks and Data"
  - "Fundamentos de criptografía"
  - "Cifrado: los tres estados del dato"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - criptografia
  - kms
  - cloudhsm
  - dominio-2
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Cryptography

> [!abstract] Qué es este archivo
> Décima primera lección del módulo y **la que abre el bloque de cifrado**. No enseña servicios todavía:
> enseña **los fundamentos** que después justifican **KMS** y **CloudHSM**.
>
> Cubre **qué hace el cifrado**, **por qué las claves son el problema real**, **qué es un HSM**, **los tres
> estados del dato**, **client-side vs. server-side** y **las objeciones de siempre** —con el dato de
> performance que las desarma—. Video: **4 min 29 s**.

> [!quote] La frase que abre la lección
> *“Seguridad. El tema favorito de todos… **hasta que algo sale mal**.”*
>
> Y la que la cierra, con la analogía que ordena todo: **el cifrado es un campo de fuerza invisible alrededor de
> tus datos**. **Aunque alguien pase las otras barreras, lo que está cifrado sigue siendo ilegible.**

---

## Resumen en una frase

> El **cifrado** convierte **dato legible en ilegible** con un **algoritmo + una clave**, y como **la clave es
> el eslabón débil**, se guarda en un **HSM**; el dato se protege en **tres estados** —**en movimiento, en
> reposo y en uso**— y el cifrado se hace **del lado del cliente o del servidor**, según **cuánto control**
> quieras conservar.

---

## 1. El escenario: el arquitecto y la pregunta correcta

**El planteo de la fuente:** *“Imaginá que tu **deployment manager** se reúne con vos para discutir tus opciones
de arquitectura para **seguridad de datos**.”*

**La pregunta que trae:** *“¿Cómo podemos asegurar que **los datos sensibles de nuestra aplicación sigan
cifrados** una vez que movemos la app a AWS?”*

| Lo que pide | Lo que **no** pide |
| --- | --- |
| **Mantener el control** sobre la seguridad de sus datos | Que AWS **vea** los datos |
| **Aprovechar las capacidades del cloud** | Replicar la infraestructura on-premise |

> [!important] La pregunta es de **control**, no de algoritmo
> El enunciado no dice *“¿qué cifrado usamos?”*. Dice **“¿cómo mantenemos el control?”**. Por eso la lección
> empieza por **las claves y los HSM**, no por los cifrados: **quien tiene la clave, tiene el control.** Es la
> misma pregunta que va a reaparecer como **“Level 3 HSMs”** en §4.

> [!note] Lectura propia (no está en la fuente)
> **“Cifrado” y “control” son dos ejes distintos.** Se puede tener **cifrado perfecto y control nulo** —todo
> cifrado con claves que administra el proveedor— y **control alto con cifrado discutible** —claves propias en
> un HSM propio—. El examen suele preguntar **el segundo eje disfrazado del primero**.

---

## 2. La idea central: la última línea de defensa

**La definición de la fuente:** **el cifrado es como un campo de fuerza invisible alrededor de tus datos**.
**Aunque alguien logre atravesar otras medidas de seguridad, los datos cifrados siguen protegidos e ilegibles.**

> *“Cuando movés aplicaciones sensibles a la nube, **el cifrado se vuelve tu última línea de defensa**. Incluso
> si otras medidas de seguridad fallan, **los datos correctamente cifrados siguen protegidos e ilegibles para
> usuarios no autorizados**.”*

### 2.1 Defense in depth: por qué “última” no significa “única”

**La definición de la fuente:** **defense in depth** es un **enfoque de seguridad con una serie de mecanismos
defensivos diseñados para que, si un mecanismo falla, haya al menos otro más funcionando**.

> [!important] El cifrado **suma**, no reemplaza
> *“El cifrado, cuando se usa correctamente, puede proveer **una capa adicional de protección por encima del
> control de acceso básico**.”* **No es un sustituto de IAM, de security groups ni de la segmentación**: es
> **lo que queda cuando todo lo demás falla**.

| Si falla… | El cifrado… |
| --- | --- |
| El **control de acceso** (una política de más) | **Sigue protegiendo**: el dato se lee, pero **no se entiende** |
| El **perímetro de red** (un puerto abierto) | **Sigue protegiendo** el dato exfiltrado |
| La **credencial** (una clave filtrada) | **Protege solo si la clave de cifrado no estaba en el mismo lugar** |

> [!warning] La condición que se olvida
> El cifrado es la última línea **solo si la clave está separada del dato**. **Un backup cifrado junto con su
> clave, en el mismo bucket, no es un backup cifrado**: es **un backup con un candado al lado**.

---

## 3. Cómo funciona: algoritmo, clave y texto cifrado

**La mecánica, en una línea:** **un algoritmo con una clave convierte datos en datos ilegibles (ciphertext)**,
que **solo vuelven a ser legibles con la clave correcta**.

**El ejemplo de la fuente:**

| Entrada | Salida |
| --- | --- |
| **`Hello World!`** | **`1c28df2b595b4e30b7b07500963dc7c`** |

> *“Alguien **sin la clave** no podría decodificar esa frase de vuelta a `Hello World!`. **Quienes tienen la
> clave, sí.**”*

### 3.1 Por qué la clave es todo

**Lo que la fuente afirma sobre los algoritmos:**

- Hay **varios tipos de algoritmos de cifrado**, **todos usando distintos tipos de claves**.
- Un **algoritmo fuerte** se apoya en **propiedades matemáticas** para producir un ciphertext que **no se puede
  descifrar con ninguna cantidad de poder de cómputo prácticamente disponible**, **sin tener también la clave
  necesaria**.
- Por lo tanto, **proteger y administrar las claves se vuelve una parte crítica de cualquier solución de
  cifrado**.

> [!important] La frase que hay que retener
> **“Proteger y administrar las claves es una parte crítica de cualquier solución de cifrado.”** El algoritmo
> **no es el secreto** —los algoritmos son públicos—; **la clave sí**. Toda la lección, y todo el bloque de
> **KMS** y **CloudHSM** que viene después, existe por esta frase.

> [!warning] El ejemplo no es reproducible (registrado)
> El texto dice que **`Hello World!`** se convierte en **`1c28df2b595b4e30b7b07500963dc7c`** y que **con la
> clave se vuelve a leer**. Dos problemas, que **no se corrigen** (ver registro):
>
> 1. **La cadena tiene 31 caracteres hexadecimales**: un bloque de bytes completo daría un número **par**
>    —**32** caracteres serían **128 bits**—. **31 no es una salida byte-alineada.**
> 2. **El formato parece un hash** —salida de longitud fija, en hexadecimal—, y **un hash es de una sola vía**:
>    **no se “descifra” con una clave**. El texto, en cambio, describe **cifrado reversible**.
>
> **Se transcribe literal y se usa como ilustración, no como ejemplo técnico.**

---

## 4. Los HSM: la bóveda del banco

**La definición de la fuente:** un **hardware security module (HSM)** provee **almacenamiento seguro de claves
y operaciones criptográficas** dentro de un **dispositivo de hardware a prueba de manipulación** (*tamper-
resistant*).

**Lo que hace, con precisión:**

| Propiedad | Qué significa |
| --- | --- |
| **Guarda el material de la clave de forma segura** | La clave **vive adentro** |
| **Usa el material sin exponerlo afuera** | Las operaciones ocurren **dentro del límite criptográfico del hardware** |
| **Es a prueba de manipulación** | Si alguien lo abre, **la clave se destruye** —no se copia— |

**La analogía del instructor:**

> *“Pensá en un HSM como **la bóveda principal de un banco**. Es un **entorno especializado y a prueba de
> manipulación**, diseñado específicamente para proteger **tus activos más valiosos: tus claves de cifrado**.”*

### 4.1 Las dos opciones (y la pregunta del cliente)

**Lo que dice la fuente:** en AWS podés elegir entre **HSMs administrados por AWS** o **mantener tu propia
instalación de HSM**.

> *“Esta elección va a ser **particularmente importante** cuando atiendas la **segunda pregunta** de tu
> deployment manager, sobre **mantener el control directo sobre HSMs de nivel 3**.”*

**Los dos tipos que el módulo va a tratar, nombrados por la lectura:**

| Tipo | Qué es, según la fuente |
| --- | --- |
| **AWS Key Management Service (AWS KMS)** | El **HSM administrado** por AWS |
| **AWS CloudHSM** | El **HSM que administrás vos** —instalación **no administrada**, bajo tu control |

> [!important] El eje de la decisión
> **No es “cifrado sí o no”: es “quién tiene la clave”.** **KMS** = **claves administradas, integración total,
> sin operar hardware**. **CloudHSM** = **control directo del módulo**, con la operación a tu cargo. **Todo el
> bloque de cifrado del curso cuelga de esta elección.**

> [!warning] “Nivel 3” se menciona y **no se define**
> La fuente habla de **“Level 3 HSMs”** **una sola vez**, en boca del cliente, **sin explicar qué es el nivel ni
> contra qué estándar se mide**. **No se completa con conocimiento externo**: se registra como hueco (§8.4 de la
> traducción lo conserva literal).

> [!note] Lectura propia (no está en la fuente)
> La distinción práctica entre los dos es **quién responde por el hardware**. Con **KMS**, si el módulo falla,
> **AWS lo reemplaza** y la clave sigue disponible. Con **CloudHSM**, el módulo **es tuyo**: si se pierde, **se
> pierde con él** —salvo que hayas hecho **backup de las claves**, que es **tu** responsabilidad—.

---

## 5. Los tres estados del dato

**La regla:** **los datasets pueden estar en uno de tres estados —en movimiento, en reposo o en uso— y la
protección debe considerar los tres**.

| Estado | Definición de la fuente | Dónde se ve | Con qué se protege |
| --- | --- | --- | --- |
| **Data in motion** | **Información viajando por las redes**, como cuando los componentes de tu aplicación se comunican entre sí | **Tráfico entre servicios, entre AZ, hacia el usuario** | **Cifrado de red**, empezando por **protocolos como TLS** |
| **Data at rest** | **Información almacenada** en un sistema de storage | **Un bucket de Amazon S3**, **un volumen de Amazon EBS**, **bases de datos y archivos** | **Cifrado del storage** |
| **Data in use** | **Información que una aplicación está procesando activamente**; **dato que es llamado por una aplicación** | **Memoria del proceso, la CPU** | *(la fuente no nombra mecanismo)* |

> [!important] Los tres, no uno
> *“La protección de datos **debe tener en cuenta los tres estados**.”* Un bucket cifrado con **TLS en el
> transporte** sigue teniendo **el dato en claro mientras se procesa**. **Cada estado es una pregunta distinta**
> y el examen los separa.

> [!note] Lectura propia (no está en la fuente)
> Los tres estados se atacan en **momentos distintos del camino del dato**: **en tránsito** se protege **el
> canal**, **en reposo** se protege **el medio** y **en uso** se protege **el proceso**. Y hay una asimetría:
> **los dos primeros tienen servicio de AWS detrás** (TLS, KMS); **el tercero es el más difícil y el que la
> fuente deja sin respuesta**.

> [!warning] El hueco del “data in use”
> La fuente **define** el estado y **no propone mecanismo**. **No se agrega ninguno** —ni enclaves, ni cifrado a
> nivel de memoria— porque **la lección no los menciona**. Queda anotado en el registro.

---

## 6. Client-side vs. server-side: el “dónde”

**La distinción, literal:**

| | **Client-side encryption** | **Server-side encryption** |
| --- | --- | --- |
| **Dónde se cifra** | **En o cerca del origen**: en la **aplicación o servicio que genera** el dato | **En el destino**: en la **aplicación o servicio que lo recibe** |
| **Quién cifra y descifra** | **Vos** | **AWS**, de forma transparente |
| **Cuánto control** | **Total** | **El que el servicio exponga** |

### 6.1 Las cuatro reglas finas (las que se preguntan)

1. **La elección depende de la sensibilidad del dato y de los requisitos de seguridad de la aplicación.**
2. **Client-side y server-side difieren en *cuándo*, *dónde* y *quién* cifra y descifra** — **no definen
   *cómo* se cifra**, y **pueden usar el mismo proceso**.
3. **No son excluyentes**: *“a menudo podés usar cifrado client-side y server-side **sobre los mismos datos**”*.
4. **AWS soporta los dos.**

> [!important] “No definen el cómo”
> Es la frase que desarma la confusión más común: **client-side no significa “más fuerte”**. **El algoritmo
> puede ser el mismo**; lo que cambia es **dónde está la clave y quién la toca**. **Un cifrado client-side con
> una clave mal guardada es peor que un server-side con KMS.**

### 6.2 Lo que AWS hace por defecto

**Lo que la fuente afirma sobre los servicios:**

- **La mayoría de los servicios que almacenan o administran datos de clientes ofrecen una opción de
  server-side encryption**, o **hacen server-side encryption por defecto**.
- Esos servicios **cifran tus datos de forma transparente antes de escribirlos a disco** y **los descifran de
  forma transparente cuando accedés**.
- **La mayoría de los servicios que soportan server-side encryption están integrados con AWS KMS** para
  **proteger las claves que protegen tus datos**.

> [!important] La cadena de custodia
> **Datos protegidos por claves** · **claves protegidas por KMS** · **KMS protegido por sus propios HSM**. Es
> **una capa sobre otra**, y es la razón por la que **KMS aparece al final de casi todas las respuestas de
> cifrado** del examen.

> [!note] Lectura propia (no está en la fuente)
> **“Transparente” es la palabra clave para el examen.** Si el servicio **cifra antes de escribir y descifra al
> leer**, **la aplicación no cambia una línea de código**. Cuando una opción de respuesta propone **modificar la
> app para cifrar**, está eligiendo **client-side**: **válido, pero es otro nivel de esfuerzo y de control**.

---

## 7. Las objeciones de siempre (y las respuestas)

**La lista de la lectura:** la gente se resiste por **performance**, **complejidad** y **disponibilidad**, y en
concreto por:

| # | Preocupación | En una frase |
| --- | --- | --- |
| **1** | **Performance latency** | *“¿No va a hacer más lento todo?”* |
| **2** | **Fragmented systems** | **Sistemas partidos**, cada uno con su criterio |
| **3** | **Inconsistent controls** | **Controles distintos** según dónde esté el dato |
| **4** | **Loss of keys** | **Perder la clave** = perder el dato |
| **5** | **Key provisioning** | **Repartir claves** entre equipos y cuentas |

**Las tres respuestas del instructor:**

| Objeción | Respuesta |
| --- | --- |
| **Performance** | *“El cifrado moderno está **altamente optimizado**.”* Un cliente de **servicios financieros** midió que **agregaba menos de un milisegundo** a sus tiempos de transacción |
| **Administración de claves** | *“AWS lo maneja de forma **elegante**, con servicios **sofisticados pero fáciles de usar**”* |
| **Perder acceso** | *“AWS construyó **múltiples capas de protección** para **prevenir la pérdida accidental de datos**”* |

> [!important] El dato que hay que citar
> **Menos de un milisegundo** en un caso de **servicios financieros**. Es **el único número de performance de
> toda la lección** y sirve para cerrar la discusión: **la latencia dejó de ser el argumento**.

> [!warning] Lo que la fuente **no** dice
> No dice **cuántas capas** son, **cuáles** son, ni **cómo** se evita la pérdida. Tampoco dice **qué servicios**
> resuelven la administración de claves: eso **viene después**, con KMS y CloudHSM. **No se adelanta.**

> [!note] Lectura propia (no está en la fuente)
> De las cinco preocupaciones, **cuatro son de operación** y **una es existencial**. **Performance, sistemas
> partidos, controles y provisioning** se resuelven **con proceso y servicio administrado**. **Perder la clave
> no se resuelve**: es **el único riesgo que el cifrado convierte en pérdida total**. Por eso la conversación
> real nunca es *“¿ciframos?”* sino *“¿quién puede perder la clave y qué pasa si la pierde?”*.

---

## 8. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla para
> estudiar**: lo que se estudia son las secciones **1 a 7** y se cierra con la **10**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el texto exacto de una definición, o (c) antes del
> examen querés chequear un matiz.

### 8.1 Video: Cryptography (transcripción)

**Muy bien: seguridad, el tema favorito de todos hasta que algo sale mal.** **Como arquitectos, nos
encantaría enfocarnos solo en construir soluciones increíbles, pero sabemos que la seguridad tiene que estar
incorporada desde el principio.** **Necesitás múltiples capas de seguridad trabajando juntas sin fisuras,
asegurando al mismo tiempo que los usuarios autorizados puedan seguir accediendo a lo que necesitan, cuando
lo necesitan.** **Vamos a explorar cómo AWS nos ayuda a mantener nuestros datos seguros y a salvo.**

**Déjenme compartir un escenario.** **Imaginá que tu deployment manager se reúne con vos para discutir tus
opciones de arquitectura para la seguridad de datos.** **La pregunta es: ¿cómo podemos asegurar que los
datos sensibles de nuestra aplicación sigan cifrados una vez que movemos la app a AWS?** **Esto es
realmente mantener el control sobre la seguridad de sus datos mientras aprovechan las capacidades del
cloud.**

**Pero antes de meternos en los servicios específicos de AWS que van a ayudar a resolver esto, necesitamos
empezar por los fundamentos de la criptografía.** **El cifrado es como un campo de fuerza invisible
alrededor de tus datos.** **Incluso si alguien logra atravesar otras medidas de seguridad, los datos
cifrados siguen protegidos e ilegibles.** **Cuando movés aplicaciones sensibles a la nube, el cifrado se
vuelve tu última línea de defensa.** **Incluso si otras medidas de seguridad fallan, los datos correctamente
cifrados siguen protegidos e ilegibles para usuarios no autorizados.** **Esto es exactamente lo que tu
deployment manager necesita para asegurar que los datos sensibles de su aplicación sigan seguros en AWS.**

**Ahora hablemos de cómo funciona el cifrado dentro de AWS.** **En su núcleo, el cifrado se apoya en claves
que deben protegerse cuidadosamente.** **Acá es donde entran en juego los hardware security modules, o
HSMs.** **Pensá en un HSM como la bóveda principal de un banco.** **Es un entorno especializado y a prueba
de manipulación, diseñado específicamente para proteger tus activos más valiosos: tus claves de cifrado.**
**En AWS, podés elegir entre HSMs administrados por AWS o mantener tu propia instalación de HSM.** **Esta
elección va a ser particularmente importante cuando atiendas la segunda pregunta de tu deployment manager,
sobre mantener el control directo sobre HSMs de nivel 3.**

**Ahora déjenme mostrarles qué hace el cifrado en la práctica.** **Cuando cifrás datos sensibles, como
`Hello world`, se vuelven algo como esto.** **Completamente ilegible sin la clave correcta.** **Es como
convertir tus datos en un código secreto que solo los usuarios autorizados pueden decodificar.**

**Para nuestro escenario, necesitamos considerar la protección de los datos en tres estados.** **Los datos
en movimiento son información viajando por las redes, como cuando los componentes de tu aplicación se
comunican entre sí.** **Los datos en reposo son información almacenada en servicios como S3 o EBS: las bases
de datos y archivos de tu aplicación.** **Y los datos en uso son cuando tus aplicaciones están procesando
información activamente.**

**Podés implementar cifrado de dos formas: del lado del cliente, donde vos controlás todo el proceso, y del
lado del servidor, donde AWS maneja el cifrado.** **Esta flexibilidad nos permite diseñar una solución que
coincida con tus requisitos específicos de control.**

**Sabés, escucho a clientes todo el tiempo sobre por qué dudaron en implementar cifrado en el pasado.**
**Les preocupa el impacto en el performance: *“¿No va a hacer más lentas nuestras aplicaciones?”*, dicen.**
**O lo que podría preocuparles de verdad es la administración de claves: llevar la cuenta de todas esas
claves de cifrado parece abrumador.** **O quizás, lo más importante, les preocupa perder acceso a sus datos
si algo sale mal con las claves de cifrado.**

**Pero acá están las buenas noticias: AWS transformó completamente este panorama.** **El cifrado moderno
está altamente optimizado.** **Uno de mis clientes de servicios financieros descubrió que agregaba menos de
un milisegundo a sus tiempos de transacción.** **Y la administración de claves, AWS la maneja de forma
elegante, con servicios sofisticados pero fáciles de usar.** **Y en cuanto a perder acceso, AWS construyó
múltiples capas de protección para prevenir la pérdida accidental de datos.**

***Duración del video: 4 minutos 29 segundos.***

### 8.2 Lectura: Cryptography — What, How, and Why

**En su nivel más básico, el cifrado funciona usando un algoritmo con una clave para convertir datos en
datos ilegibles (ciphertext), que solo pueden volver a ser legibles con la clave correcta.**

**Por ejemplo, una frase simple como “Hello World!” podría verse como `1c28df2b595b4e30b7b07500963dc7c`
cuando está cifrada.** **Alguien sin la “clave” no podría “decodificar” esa frase de vuelta a “Hello
World!”.** **Quienes tienen la clave, en cambio, sí podrían.**

**Hay varios tipos distintos de algoritmos de cifrado, todos usando distintos tipos de claves.** **Un
algoritmo de cifrado fuerte se apoya en propiedades matemáticas para producir ciphertext que no se puede
descifrar usando ninguna cantidad de poder de cómputo prácticamente disponible sin tener también la clave
necesaria.** **Por lo tanto, proteger y administrar las claves se vuelve una parte crítica de cualquier
solución de cifrado.**

**Un hardware security module (HSM) provee almacenamiento seguro de claves y operaciones criptográficas
dentro de un dispositivo de hardware a prueba de manipulación.** **Los HSMs están diseñados para almacenar
material de claves criptográficas de forma segura y usar el material de la clave sin exponerlo fuera del
límite criptográfico del hardware.** **Este módulo se enfoca en dos tipos de HSMs: AWS Key Management
Service (AWS KMS) y AWS CloudHSM.**

**Algunas cosas para notar:**

- **Las claves de cifrado deben protegerse.**
- **Los HSMs son dispositivos que procesan operaciones criptográficas y proveen almacenamiento seguro para las
  claves criptográficas.**
- **El HSM que uses podría ser un servicio administrado por AWS o una instalación no administrada que controlás
  completamente.**

### 8.3 Lectura: Cryptography — When and Where

**Hablemos del “cuándo” ciframos nuestros datos.**

**Los datasets pueden estar en uno de tres estados: en movimiento, en reposo o en uso.** **La protección de
datos debe tener en cuenta los tres estados.**

**Data in motion — Los datos en movimiento son la protección que ocurre mediante cifrado de red, empezando
por protocolos como TLS.**

**Data at rest — Los datos en reposo son datos en un sistema de almacenamiento, como un bucket de Amazon
Simple Storage Service (Amazon S3) o un volumen de Amazon Elastic Block Store (Amazon EBS).**

**Data in use — Los datos en uso son datos que son llamados por una aplicación.**

**Además del “cuándo”, también está el “dónde”.** **Para esto hay una distinción importante entre cifrado
del lado del cliente y cifrado del lado del servidor.**

- **El cifrado del lado del cliente es cifrar datos en o cerca de su origen, como cifrar datos en la aplicación
  o servicio que los genera.**
- **El cifrado del lado del servidor es cifrar datos en su destino, es decir, la aplicación o servicio que los
  recibe.**

**El método que elijas depende de la sensibilidad de tus datos y de los requisitos de seguridad de tu
aplicación.** **El cifrado del lado del cliente y el del lado del servidor difieren en cuándo, dónde y quién
cifra y descifra los datos.** **No definen necesariamente cómo se cifran los datos, y podrían usar el mismo
proceso.** **Además, no son excluyentes.** **A menudo podés usar cifrado del lado del cliente y del lado del
servidor sobre los mismos datos.**

**AWS soporta tanto el cifrado del lado del cliente como el del lado del servidor.** **La mayoría de los
servicios de AWS que almacenan o administran datos de clientes ofrecen una opción de cifrado del lado del
servidor, o realizan cifrado del lado del servidor de tus datos por defecto.** **Estos servicios cifran tus
datos de forma transparente antes de escribirlos a disco, y después los descifran de forma transparente
cuando accedés a ellos.** **La mayoría de los servicios de AWS que soportan cifrado del lado del servidor
están integrados con AWS KMS para proteger las claves de cifrado que protegen tus datos.**

### 8.4 Lectura: Traditional Reasons Not to Encrypt

**Mucha gente puede ser reticente al cifrado por algunas razones.** **Quizás les preocupe el performance, la
complejidad y la disponibilidad.** **Algunos pueden preocuparse por todo o parte de lo siguiente:**

- **Latencia de performance**
- **Sistemas fragmentados**
- **Controles inconsistentes**
- **Pérdida de claves**
- **Aprovisionamiento de claves**

**Es importante notar, sin embargo, que el cifrado es un componente crítico de una estrategia de defense in
depth.** **Defense in depth es un enfoque de seguridad con una serie de mecanismos defensivos diseñados para
que, si un mecanismo de seguridad falla, haya al menos uno más todavía funcionando.** **A medida que más
organizaciones buscan operar más rápido y a escala, necesitan formas de cumplir requisitos críticos de
compliance y mejorar la seguridad de los datos.** **El cifrado, cuando se usa correctamente, puede proveer
una capa adicional de protección por encima del control de acceso básico.**

> [!note] Las cuatro imágenes de la fuente no están en el vault
> `J3UVTWB2M3.png` (HSM), `H57CWU9HTE.png` (data in motion con HTTPS), `C3CQGERT2N.png` (S3 y EBS con datos
> protegidos) y `W5K4BEH413.png` (data in use). **No se describen más allá de su texto alternativo**, que se
> transcribe arriba. **No hay diagramas reconstruidos en esta nota**: la fuente no aporta esquemas que
> justifiquen uno.

---

## 9. Cuadro de cierre: quién protege qué

| Necesidad | Concepto | Mecanismo |
| --- | --- | --- |
| **Que el dato sea ilegible si cae el perímetro** | **Cifrado** | **Algoritmo + clave** → **ciphertext** |
| **Que la clave no se pueda copiar** | **HSM** | **Dispositivo a prueba de manipulación**; el material **no sale del límite** |
| **Claves administradas, sin operar hardware** | **AWS KMS** | **HSM administrado** por AWS |
| **Control directo del módulo** | **AWS CloudHSM** | **Instalación propia**, no administrada |
| **Proteger el dato viajando** | **Data in motion** | **Cifrado de red**, empezando por **TLS** |
| **Proteger el dato guardado** | **Data at rest** | **Cifrado en S3, EBS, bases de datos** |
| **Proteger el dato procesándose** | **Data in use** | *(la fuente no propone mecanismo)* |
| **Control total del proceso de cifrado** | **Client-side** | **Vos cifrás y descifrás**, cerca del origen |
| **Cifrado sin tocar la aplicación** | **Server-side** | **AWS cifra y descifra de forma transparente** |
| **Que un fallo no deje todo expuesto** | **Defense in depth** | **Capa adicional sobre el control de acceso** |

---

## 10. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **El cifrado es la última línea de defensa**: protege **cuando las otras capas fallan**.
> 2. **Cifrado = algoritmo + clave**; el resultado es **ciphertext**, legible **solo con la clave correcta**.
> 3. **La clave es el punto crítico**: los algoritmos son públicos; **la clave se protege en un HSM**.
> 4. **Un HSM** es un **dispositivo a prueba de manipulación** que **guarda claves y ejecuta operaciones sin
>    exponer el material fuera de su límite criptográfico**.
> 5. **Dos HSMs en el módulo**: **AWS KMS** (administrado) y **AWS CloudHSM** (bajo tu control).
> 6. **Tres estados**: **in motion** (**TLS**), **at rest** (**S3, EBS, bases de datos**) e **in use** (**la app
>    procesando**).
> 7. **Client-side** = **en el origen, lo hacés vos**; **server-side** = **en el destino, lo hace AWS**.
> 8. **No definen *cómo* se cifra** y **no son excluyentes**: se pueden **usar los dos sobre el mismo dato**.
> 9. **La mayoría de los servicios SSE de AWS está integrada con KMS**, y muchos **cifran por defecto de forma
>    transparente**.
> 10. **Cifrado correcto = capa adicional sobre el control de acceso**, no reemplazo.

> [!warning] Trampa clásica del examen
> Escenario: *“la empresa quiere **mantener control directo sobre las claves** con un **HSM dedicado**”*. La
> respuesta **no** es “activar el cifrado por defecto de S3”: eso es **server-side con claves administradas**.
> El requisito de **control del módulo** apunta a **CloudHSM**; el de **cifrado con mínima operación**, a
> **KMS**. Y si el enunciado pide **cifrado en tránsito**, la respuesta **no** es un HSM: es **TLS** —**el HSM
> protege claves, no canales**—.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[Gathering the Customer Requirements - Security]] — el **requisito 4** (cifrado integrado) que esta lección
  empieza a cubrir
- [[Network Traffic Controls]] — **data in motion** en la práctica: endpoints y TLS en el camino
- [[VPC Endpoints]] — el cifrado del canal hacia los servicios de AWS
- [[Network Segmentation]] — **defense in depth** aplicado a la red: la capa que el cifrado respalda
- [[Amazon GuardDuty]] — la otra cara: **detectar** lo que el cifrado **no impide**
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[AWS KMS]] — la respuesta de servicio: **claves bajo control**, **envelope
  encryption** y **CloudTrail** en cada operación

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 11 completa: fundamentos (algoritmo + clave), HSM, tres estados del dato, client-side vs. server-side y objeciones tradicionales | Nota completa (secciones 1–10) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **El ejemplo de ciphertext no es reproducible**: **`1c28df2b595b4e30b7b07500963dc7c`** tiene **31
   caracteres hexadecimales** —**124 bits si se lee como hex, y no es byte-alineado**—, cuando un bloque
   completo daría **un número par** (**32 caracteres = 128 bits**). Además, **el formato parece un hash**, y
   **un hash no se descifra con una clave**. Se transcribe literal y se usa **solo como ilustración** (§3.1).
2. **La entrada del ejemplo cambia entre video y lectura**: el video dice **`Hello world`** y la lectura
   **`Hello World!`**. Se conservan **las dos** en la traducción.
3. **“Level 3 HSMs” no se define**: aparece **una sola vez**, en boca del cliente, **sin estándar ni criterio**.
   **No se completa con conocimiento externo** (§4.1).
4. **La fuente no nombra ningún algoritmo concreto** (ni AES, ni RSA, ni simétrico/asimétrico): solo dice
   **“varios tipos de algoritmos”**. **No se agregan nombres.**
5. **“Data in use” se define y no se resuelve**: **no hay mecanismo** propuesto en la lección (§5).
6. **“Múltiples capas de protección” contra la pérdida de claves** se menciona **sin enumerarlas** (§7).
7. **Las cuatro imágenes no están en el vault** (listadas en §8.4). **No se reconstruye ningún diagrama.**
8. **La lección no trae Knowledge Check** ni texto de autoevaluación.
9. **El nombre de archivo `Cryptography.md` no colisiona** con ninguna nota del vault (verificado: **0
   basenames duplicados**). **No había notas previas de KMS ni de CloudHSM.**
10. **El mapeo de tareas del módulo sigue siendo tentativo**: esta lección cae de lleno en **cifrado**, que en el
    índice figura como **pendiente de confirmar** (1.2 / 2.3).

**Decisiones de transcripción:**

- Se conservan **encryption**, **ciphertext**, **key**, **hardware security module (HSM)**,
  **tamper-resistant**, **client-side encryption**, **server-side encryption**, **data in motion**, **data at
  rest**, **data in use**, **defense in depth**, **deployment manager**, **provisioning** y **performance
  latency**.
- Las **cifras** se transcriben literales: **4 min 29 s**, **tres** estados del dato, **dos** tipos de HSM,
  **dos** formas de implementar cifrado, **cinco** preocupaciones tradicionales, **menos de un milisegundo**.
- Se conservan los **nombres de servicio** tal como aparecen: **AWS Key Management Service (AWS KMS)**,
  **AWS CloudHSM**, **Amazon S3**, **Amazon EBS**.
