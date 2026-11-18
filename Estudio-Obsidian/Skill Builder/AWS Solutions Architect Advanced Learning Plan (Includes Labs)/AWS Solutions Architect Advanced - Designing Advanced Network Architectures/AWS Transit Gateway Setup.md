---
title: "AWS Transit Gateway Setup"
aliases:
  - "Transit Gateway setup"
  - "Configuración de Transit Gateway"
  - "Transit VIF"
  - "TGW route tables"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - transit-gateway
  - direct-connect
  - routing
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# AWS Transit Gateway Setup

> [!abstract] Qué es este archivo
> Tercera lección del módulo. La anterior explicó **por qué** el transit gateway; esta explica **cómo se arma**:
> qué pasa cuando adjuntás una VPC, dónde vive la **ENI**, cómo se decide el **next hop** y cómo se **aísla** un
> attachment del resto.
>
> Agrega el tramo que faltaba: **Direct Connect → Direct Connect gateway → Transit VIF → Transit Gateway**.
>
> Duración del video: **3 min 01 s**.

> [!quote] La idea que ordena todo
> **La route table del transit gateway es la que decide.** El attachment solo dice “estoy acá”; la tabla dice
> “salís por allá”. Todo el diseño —segmentar, aislar, compartir— se hace moviendo **asociaciones**.

---

## Resumen en una frase

> Adjuntar una VPC habilita **una subred por AZ** (donde el TGW pone una **ENI**), y el tráfico se gobierna con
> **route tables del TGW**: cada attachment se asocia a **una sola**, y de esa asociación sale el **next hop**.

---

## 1. Direct Connect hasta el transit gateway

**La cadena completa:** router del cliente → ubicación de **Direct Connect** → **Direct Connect gateway** →
**transit virtual interface (Transit VIF)** → **Transit Gateway** → VPC adjuntas.

**Beneficios de adjuntar un TGW a un DX gateway con Transit VIF:**

1. **Una sola conexión** para **múltiples VPC o VPN** que estén en la **misma Región**.
2. **Se anuncian prefijos** de on-premises hacia AWS **y** de AWS hacia on-premises.
3. **Mejora la administración de la red**: un punto en vez de N.

**Las dos formas de llegar desde Direct Connect:**

| | **Private VIF → DX gateway** | **Transit VIF → DX gateway → TGW** |
| --- | --- | --- |
| **Quién termina** | El **virtual private gateway (VGW)** de cada VPC | El **Transit Gateway** |
| **Alcance** | Una **VPC** por VIF | **Todas las VPC adjuntas** al TGW |
| **Cuántas VIF** | Una **por VPC** | **Una** para todo el TGW |
| **Segmentación** | En cada VPC | En las **route tables del TGW** |

> [!warning] La frase que hay que leer dos veces
> La fuente primero dice que **podés** adjuntar un TGW a un DX gateway **usando Transit VIF**, y más abajo afirma
> que **Direct Connect no soporta Transit VIF** para conectividad con Transit Gateway. **Las dos frases no pueden
> ser ciertas a la vez.**
>
> Lo que sí es consistente en toda la fuente —y con la lección anterior— es esto: **Direct Connect no se adjunta
> directo al TGW**. Necesitás un **Direct Connect gateway** en el medio. La Transit VIF es el **último tramo**:
> DX gateway → TGW. Queda registrado como discrepancia en el anexo.
>
> **Para el examen:** si una opción propone **Transit VIF** para llegar al TGW, es el camino correcto; si propone
> **DX directo al TGW**, es la trampa.

---

## 2. Adjuntar una VPC: una subred por AZ, una ENI

Cuando adjuntás una VPC al transit gateway:

- Especificás **exactamente una subred por Availability Zone** que querés habilitar.
- El TGW coloca una **elastic network interface (ENI)** en esa subred, consumiendo **una IP**.
- Desde ahí, el tráfico llega a **todas las subredes de esa AZ** por el **ruteo normal de la VPC**.

> [!tip] Buena práctica de la fuente
> Usar una **subred chica solo para esto** —por ejemplo, un **/28**— y, si hace falta, asignarle una
> **network ACL separada** a la conexión del transit gateway.

**La regla que se lleva preguntas de examen:** una AZ **sin subred habilitada no tiene ENI**, y por lo tanto
**nada en esa AZ puede hablar con el transit gateway**. Habilitá **todas** las AZ, salvo que dejar una afuera sea
**parte deliberada del diseño**.

| Situación | Resultado |
| --- | --- |
| AZ habilitada con **una** subred | El TGW pone **una ENI**; **todas** las subredes de la AZ la usan |
| AZ **no** habilitada | **Sin ENI** → **sin conectividad** al TGW desde esa AZ |
| Subred habilitada **chica** | Alcanza: la ENI usa **una IP**, no la subred entera |

---

## 3. Route tables: asociación, propagación y next hop

**Primero, la ruta de ida.** En la VPC, la **route table de la subred** necesita una ruta hacia el transit
gateway. Sin esa ruta, el paquete nunca llega al attachment.

**Después, la decisión del TGW.** El transit gateway tiene **sus propias route tables**, y ahí se define el
**next hop**:

| Concepto | Qué hace |
| --- | --- |
| **Route table del TGW** | Decide a qué **attachment** va el tráfico que entra |
| **Asociación** | Cada **VPC o VPN** se asocia a **una sola** route table del TGW |
| **Propagación** | Las rutas de la VPC o VPN **se aprenden** en la tabla; se puede prender o apagar por attachment |
| **Rutas estáticas** | Se agregan a mano en la tabla del TGW |
| **Blackhole** | Ruta que **descarta** el tráfico que coincide |
| **Prefix list** | Conjunto de **CIDR** reutilizable; **cada entrada se vuelve una ruta** |

**Asociación ≠ propagación.** Es la confusión más cara del tema:

- **Asociación** = “el tráfico que **sale de este attachment** se busca en **esta** tabla”.
- **Propagación** = “las rutas **de esta VPC/VPN** se **inyectan** en la tabla”.

**Reglas duras:**

1. Un attachment se asocia a **una sola** route table. **No** se puede asociar a dos.
2. Una route table puede tener **de cero a muchas** asociaciones.
3. La tabla soporta **IPv4 e IPv6**, con **CIDR** como destino y **VPC o VPN** como target.
4. Al crear el TGW, AWS crea una **default route table** y la usa como **default association** y **default
   propagation**.
5. **No hay ruteo entre VPC con CIDR idéntico** (ni solapado, según la fuente): el TGW no puede distinguir el
   destino. Lo detalla el anexo.

> [!important] El default que hay que saber de memoria
> Si no tocás nada, **todos los attachments caen en la default route table** y por lo tanto **todos se hablan**.
> Ese es el “efecto peering” gratis. La segmentación **no es el default**: hay que **crearla**.

---

## 4. Aislar: las tres herramientas

**1. Route tables adicionales.** Creás otra tabla y **reasociás** los attachments que quieras separar.

Ejemplo de la fuente: **VPC 1** y **VPC 2** comparten una tabla y se hablan; **VPC 3** se asocia a **otra tabla**
y queda **deliberadamente aislada**. Caso típico: **dev separado de producción**.

**2. Blackhole routes.** Dentro de una tabla compartida, una ruta **blackhole** **descarta** el tráfico que
coincide. Sirve para **compartir tabla** y aun así **negar destinos puntuales**.

**3. Prefix lists.** Cuando el mismo conjunto de CIDR se repite en varias tablas, se administra **una sola vez** y
se referencia; cada entrada **aparece como ruta**.

> [!note] La analogía que da la fuente
> Las tablas adicionales crean **redes aisladas dentro del transit gateway**, parecido a **VRF (virtual routing
> and forwarding)** en las redes tradicionales.

**Lo que se gana frente al peering:** las VPC se conectan **una vez** al hub y **comparten tabla**, en vez de
armar una malla 1:1. Es el mismo efecto de conectividad, con **menos conexiones** y **administración y seguridad
más simples**.

---

## 5. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 4** y se cierra con la **7**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual del video, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 5.1 Lectura: Direct Connect routing to a Transit Gateway

Podés **adjuntar un transit gateway a un Direct Connect gateway usando una transit virtual interface**. Esta
configuración ofrece los siguientes beneficios:

- Podés **administrar una sola conexión** para **múltiples VPC o VPN** que estén en la **misma Región**.
- Podés **anunciar prefijos** desde on-premises hacia AWS y desde AWS hacia on-premises.
- La **administración de la red mejora**.

**Private VIF hacia Direct Connect gateway**

> [!note] Las imágenes de la fuente no están en el vault
> *Private VIF to DX Gateway* (`assets/images/c31eb202-f158-45de-81f0-9103673edb23.png`): **dos VPC**, cada una
> con su **virtual private gateway (VGW)**; una **ubicación de Direct Connect** con **router del cliente** y
> **router de AWS**; el router de AWS se conecta a un **Direct Connect gateway**, que a su vez enlaza **a los dos
> VGW**.

En esta configuración, el **Direct Connect gateway** enlaza **a ambos virtual private gateways**.

**Transit VIF hacia Transit Gateway**

> [!note] Las imágenes de la fuente no están en el vault
> *Transit VIF to Transit Gateway* (`assets/images/a42dc574-9352-4a67-a565-9f7a66b1821e.png`): las **mismas dos
> VPC**, el **router del cliente** y el **router de AWS**; el router de AWS se conecta a un **Direct Connect
> gateway**; el DX gateway se conecta a un **Transit Gateway**, al que están **adjuntas las dos VPC**.

Con un Transit Gateway, el **Direct Connect gateway** se conecta al **Transit Gateway**, que tiene **dos VPC
adjuntas**.

> **AWS Direct Connect no soporta Transit VIF para conectividad con AWS Transit Gateway.** Para más información
> sobre el ruteo de Direct Connect hacia un transit gateway, ver *Transit gateway associations* en la **AWS
> Direct Connect User Guide**.

### 5.2 Video: Transit Gateway setup (transcripción)

Cuando **adjuntás una VPC a un transit gateway**, especificás **una subred en cada Availability Zone** para
**habilitar esa AZ**. El transit gateway pone una **elastic network interface**, o **ENI** para abreviar, en esa
subred. Y desde ahí, el tráfico se puede **rutear a todas las otras subredes de esa AZ** mediante el **ruteo
normal de la VPC**. Es una **buena práctica** usar una **subred chica solo para este propósito**, digamos un
**bloque /28**, y después, si querés, podés **asignar una network ACL separada** a tu **conexión del transit
gateway**. Cualquier **AZ que no esté habilitada no tiene ENI**, o sea que **nada en esa AZ puede comunicarse con
el transit gateway**. Así que **asegurate de habilitarlas todas**, salvo que eso haya sido **parte deliberada de
tu diseño**.

Hablemos un poco más de **cómo se rutea el tráfico**. Cuando **adjuntás una VPC a un transit gateway**, necesitás
**agregar una ruta en la route table de tu subred** para el tráfico que va hacia el transit gateway. En este
ejemplo, **todo el tráfico externo de esta VPC** se rutea hacia el transit gateway.

¿A dónde va el tráfico una vez que **llega al gateway**? Bueno, el **transit gateway también tiene una route
table** que controla eso. Por defecto, el transit gateway tiene **una route table** y **cada attachment de VPC o
VPN está asociado a ella**. Esa route table **decide cuál será el attachment de destino**, o en otras palabras,
el **next hop** para el tráfico entrante. Podés **crear más de una route table** para el transit gateway, y hay
ejemplos de eso más adelante. Pero **cada VPC o VPN solo puede estar asociada a una route table del transit
gateway**. Entonces, por ejemplo, **no podés tener 2 VPC con bloques CIDR solapados conectadas al mismo transit
gateway**.

Acá hay un ejemplo con **múltiples attachments de VPC**. Por defecto, **todas comparten la misma route table** del
transit gateway, así que **todas pueden hablarse**. Esto tiene **el mismo efecto que si estuvieran todas en
peering**, pero **sin tener que hacer todas esas conexiones de peering**.

Ahora, ¿y si **no querías** que estas tres VPC pudieran comunicarse entre sí? En realidad hay **dos formas** de
**aislar los attachments** entre ellos. Una forma es **configurar route tables adicionales** en el transit gateway
y **configurar las rutas** en la VPC y en el gateway para que se ajusten a tus necesidades de **quién puede hablar
con quién**. En este ejemplo, **VPC 1 y VPC 2** usan **una** route table del transit gateway y **pueden
comunicarse entre sí**. **VPC 3** usa **otra** route table del transit gateway y está **deliberadamente aislada**
de las otras dos VPC. Hay **varias razones** por las que podrías querer hacer eso. Por ejemplo, para **mantener
las VPC de tu entorno de desarrollo separadas** de las VPC usadas para **producción**.

*Duración del video: **3 minutos 01 segundo**.*

### 5.3 Lectura: Transit Gateway setup

**Introducción**

Ya sabés que **las VPC usan route tables asociadas a las subredes** para controlar el tráfico. Cuando **adjuntás
una VPC a un transit gateway**, tenés que **habilitar una o más Availability Zones** para que el transit gateway
**rutee tráfico hacia los recursos en las subredes de la VPC**. Veamos cómo se hace.

Para **habilitar cada Availability Zone**, especificás **exactamente una subred**. El transit gateway **coloca una
network interface en esa subred usando una dirección IP de la subred**. Después de **habilitar una AZ**, el
tráfico se puede **rutear a todas las subredes de esa AZ**, **no solo a la subred especificada**. Los recursos que
están en AZ donde **no hay attachment del transit gateway** **no van a poder llegar** al transit gateway.
**Recomendamos habilitar múltiples Availability Zones** para asegurar **disponibilidad**.

**Agregar una ruta**

Cuando **adjuntás una VPC a un transit gateway**, tenés que **agregar una ruta en la route table de tu subred**
para que el tráfico se rutee **a través del transit gateway**.

**Asociaciones**

Un transit gateway **actúa como un router virtual regional** para el tráfico que fluye **entre tus VPC y tus
conexiones VPN**. El ruteo a través de un transit gateway **opera en Capa 3**, donde **los paquetes se envían a un
attachment de next hop específico, según sus direcciones IP de destino**. **AWS Transit Gateway controla cómo se
rutea el tráfico** hacia todas las redes conectadas **usando route tables**. Estas route tables incluyen **rutas
dinámicas, rutas estáticas y rutas blackhole**. Podés **crear múltiples route tables** para **separar el acceso a
la red**. **Cada attachment de VPC o VPN se asocia a una sola route table** del transit gateway. Esa route table
**decide el next hop** para el tráfico que viene **de ese attachment**. Una route table dentro del transit gateway
**admite bloques y destinos CIDR de IPv4 o IPv6**. Los **destinos son VPC y conexiones VPN**.

Cuando **adjuntás una VPC o creás una conexión VPN** en un transit gateway, **el attachment se asocia a la route
table default** del transit gateway. Cuando **creás un transit gateway**, AWS **crea una route table default** y
la usa como **route table de asociación default** y **route table de propagación default**.

Podés **referenciar una prefix list en tu route table del transit gateway**. Una **prefix list** es un **conjunto
de una o más entradas de bloques CIDR**. Podés usar una prefix list para **simplificar la administración de las
direcciones IP** que referenciás en tus recursos para rutear tráfico de red. Por ejemplo, si **especificás
seguido los mismos bloques CIDR de destino** en múltiples route tables del transit gateway, podés **administrar
esos bloques en una sola prefix list**. Los transit gateways **no soportan ruteo entre VPC con bloques CIDR
idénticos**. Cuando **creás una referencia de prefix list** en tu route table del transit gateway, **cada entrada
de la prefix list se representa como una ruta** en tu route table.

**Asociaciones (continuación)**

Podés **asociar un attachment del transit gateway a una sola route table**. **Cada route table puede asociarse
con cero o muchos attachments** y **reenviar paquetes a otros attachments**. Tu transit gateway **rutea paquetes
IPv4 e IPv6 entre attachments usando las route tables del transit gateway**. Podés **configurar estas route
tables para propagar rutas** desde las route tables de las **VPC y conexiones VPN adjuntas**. También podés
**agregar rutas estáticas** a las route tables del transit gateway. Cuando **un paquete llega desde un
attachment**, se **rutea a otro attachment** usando **la ruta que coincide con la dirección IP de destino**. **La
misma route table del transit gateway puede compartirse con múltiples VPC**.

**Configuraciones de route table compartida**

Si la route table compartida **está configurada para permitirlo**, las VPC pueden **rutear tráfico entre sí igual
que si estuvieran en peering**, pero con **significativamente menos conexiones**. En vez de tener que **crear una
malla de conexiones de peering 1:1 entre todas las VPC**, las VPC **solo necesitan un único attachment al transit
gateway**. Esto **simplifica la administración y la seguridad**.

Podés **crear una ruta blackhole** en la route table del transit gateway que **descarta el tráfico que coincide
con la ruta**. Haciendo esto, podés **usar una route table compartida con reglas para aislar VPC**.

**Route tables adicionales**

Podés **crear route tables adicionales dentro del transit gateway** y **cambiar la asociación** de la VPC o VPN a
esas route tables. De esta forma, podés **segmentar tu red**. Por ejemplo, podés **asociar las VPC de desarrollo a
una route table** y las **VPC de producción a otra**. Podés **crear redes aisladas dentro de un transit gateway**
parecidas a **virtual routing and forwarding (VRF)** en las redes tradicionales.

---

## 6. Cómo se arma, en orden

| # | Paso | Qué verificar |
| --- | --- | --- |
| 1 | **Adjuntar la VPC** | Una **subred por AZ**; idealmente **/28** |
| 2 | **Confirmar las ENI** | Una por AZ habilitada; **una IP** cada una |
| 3 | **Ruta en la subred** | La route table de la subred apunta al **TGW** |
| 4 | **Asociar** el attachment | A la route table del TGW que corresponda (**una sola**) |
| 5 | **Propagar o escribir rutas** | Propagación de la VPC/VPN, o **estáticas** |
| 6 | **Segmentar** | Route tables separadas o **blackhole** |
| 7 | **Repetir por AZ** | La AZ sin ENI **no tiene red** |

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Una subred por AZ**; el TGW pone **una ENI con una IP**. Desde ahí, **toda la AZ** alcanza el gateway.
> 2. **AZ sin ENI = sin conectividad.** No “va por otra AZ”: no hay camino.
> 3. Hace falta **ruta en la route table de la subred** hacia el TGW, además de la tabla del gateway.
> 4. **Cada attachment se asocia a una sola** route table del TGW; una tabla puede tener **muchos** attachments.
> 5. **Asociación** decide el next hop del tráfico **que sale** del attachment; **propagación** inyecta las rutas
>    **de** la VPC/VPN en la tabla.
> 6. **Default = todos se hablan**: la default route table es asociación y propagación por defecto.
> 7. **Aislar**: route table propia, **blackhole** o **prefix list** para administrar destinos repetidos.
> 8. **CIDR idéntico (u solapado) entre VPC**: el TGW **no rutea** entre ellas.
> 9. **Direct Connect no se adjunta directo**: **DX → Direct Connect gateway → Transit VIF → TGW**.
> 10. El ruteo es de **Capa 3**, por **IP de destino**, y soporta **IPv4 e IPv6**.

> [!warning] Trampa clásica del examen
> Escenario: “la VPC tiene ruta al transit gateway, el attachment está asociado a la route table correcta, y aun
> así **una AZ no llega**”.
> La respuesta **no** es tocar la route table: es que **esa AZ no tiene subred habilitada**, así que **no hay
> ENI**. Sin ENI no hay next hop posible.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[VPC Connectivity]] — la lección anterior: qué es un attachment y por qué el default conecta todo
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[1.3 Diseñar arquitecturas fiables y resistentes]] — habilitar varias AZ para disponibilidad
- [[Architecting for Cost - Networking]] — costo de attachments y de transferencia
- Siguiente paso del módulo: [[Use Cases - Transit Gateway]] — los cinco escenarios y la demo

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 03 completa: DX hacia TGW, adjuntar VPC, ENI por AZ y route tables del TGW | Nota completa (secciones 1–7) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La fuente se contradice sobre la Transit VIF.** Primero: *“podés adjuntar un transit gateway a un Direct
   Connect gateway usando una transit virtual interface”*. Después: *“AWS Direct Connect no soporta Transit VIF
   para conectividad con AWS Transit Gateway”*. Se transcriben **las dos** y se explica en §1 que la ruta
   soportada es **DX → DX gateway → Transit VIF → TGW**, sin saltear el DX gateway.
2. **“28 cider block”** en la transcripción: es **/28 CIDR**. Se transcribe como **/28**.
3. **CIDR solapado:** el video dice que *“no podés tener 2 VPC con CIDR solapados en el mismo TGW”*; la lectura
   dice que *“no soporta ruteo entre VPC con CIDR idénticos”*. Se transcriben ambas; la segunda es la más precisa
   (el límite está en el **ruteo entre ellas**, no en el attachment).
4. **Dos imágenes no están en el vault**: `c31eb202-…-9103673edb23.png` y `a42dc574-…-9f7a66b1821e.png`. Se
   describen desde el texto alternativo.
5. **No hay Knowledge Check.** La lección cierra con el video y la lectura.

**Decisiones de transcripción:**

- Se conservan **transit VIF**, **Direct Connect gateway**, **virtual private gateway (VGW)**, **attachment**,
  **route table**, **association**, **propagation**, **blackhole**, **prefix list** y **VRF**.
- Las **cifras** se transcriben literales: **/28**, **una IP**, **una subred por AZ**, **3 min 01 s**.
- **No se agregaron** cuotas de attachments, rutas por tabla ni precios que la fuente no da.
