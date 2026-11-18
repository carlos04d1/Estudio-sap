---
title: "Use Cases - Transit Gateway"
aliases:
  - "Use Cases (Transit Gateway)"
  - "Casos de uso de Transit Gateway"
  - "Isolated VPCs with shared services"
  - "Blackhole route"
  - "Transit Gateway peering"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - transit-gateway
  - route-tables
  - nat-gateway
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# Use Cases - Transit Gateway

> [!abstract] Qué es este archivo
> Cuarta lección del módulo. Las anteriores explicaron el **qué** y el **cómo**; esta muestra **para qué se usa**:
> ruteo centralizado, aislamiento, **shared services**, **NAT compartido** y **peering entre transit gateways**.
>
> Es la lección más “de examen” del bloque: casi todos los escenarios de red del SAP-C02 son una variante de
> **aislar dos VPC y darles salida por una tercera**.
>
> Duración del video: **3 min 05 s** · Demo: **8 min 57 s**.

> [!quote] La idea que ordena todo
> **Todo se resuelve moviendo asociaciones.** Aislar no es “desconectar”: es **asociar el attachment a otra route
> table** o meterle una **blackhole** que descarte lo que no debe pasar.

---

## Resumen en una frase

> El transit gateway es un **router de Capa 3** que conecta todo por default; los **casos de uso** son formas de
> **recuperar el control**: segmentar con route tables, aislar con **blackhole**, compartir un **servicio** y
> unir regiones con **peering**.

---

## 1. Los casos de uso, de un vistazo

| Caso | Qué resuelve | Mecanismo |
| --- | --- | --- |
| **Centralized routing** | Un solo punto de ruteo para VPC, VPN y DX | Route tables adicionales y **reasociación** |
| **Isolating VPCs** | Que una VPC no vea a las demás | **Route table separada** |
| **Isolated VPCs with shared services** | A y B aisladas, pero **ambas llegan a C** | Tabla compartida + **blackhole** para lo privado |
| **NAT gateway as a shared service** | Salida a internet centralizada sin perder aislamiento | **VPC de salida** con NAT + tablas por segmento |
| **Peering** | Unir dos transit gateways de **regiones distintas** | **Peering attachment** + ruta estática |

> [!note] El caso 3 y el 4 son el mismo diseño
> La fuente los presenta por separado, pero el video, los seis pasos y la demo arman **una sola arquitectura**:
> **VPC A y B privadas y aisladas**, **VPC C con el NAT** y una **tabla compartida** que manda internet a C y
> descarta lo privado.

---

## 2. Centralized routing

**La idea:** en vez de que cada VPC resuelva sus rutas, **el transit gateway concentra el ruteo**. Se crean
**route tables adicionales** dentro del TGW y se **cambia la asociación** de las VPC o VPN.

**El ejemplo de la fuente:** VPC de **desarrollo** a una tabla, VPC de **producción** a otra. Quedan **redes
aisladas dentro del transit gateway**, parecido a **VRF** en redes tradicionales.

| VPC | CIDR | Qué hace |
| --- | --- | --- |
| **VPC A** | `10.1.0.0/16` | Habla con todas (caso “centralizado”) |
| **VPC B** | `10.2.0.0/16` | Habla con todas |
| **VPC C** | `10.3.0.0/16` | Habla con todas |
| **Customer gateway** | `10.99.99.0/24` | On-premises, también alcanza a todas |

> [!note] Las imágenes de la fuente no están en el vault
> *Centralized routing* (`assets/images/98ea276e-…-5adb44207706.png`): las tres VPC y el customer gateway
> adjuntos a un TGW, **todos los attachments pueden rutear entre sí**.

---

## 3. Isolating VPCs

**El punto de partida:** el transit gateway configurado como **router central** que conecta **todas las VPC, DX y
Site-to-Site VPN**. Todos los attachments se **asocian** y **propagan** a la **default route table**.

**Consecuencia:** todos los attachments **se rutean entre sí**, con el TGW haciendo de **router IP de Capa 3**
simple.

**Para aislar:** se le da a la VPC que debe quedar afuera **otra route table**. En el ejemplo, **A y B se hablan**
y **C queda completamente aislada**.

> [!note] Las imágenes de la fuente no están en el vault
> *Isolating VPCs* (`assets/images/6dca4694-…-7dc2a1309d21.png`): mismo dibujo, pero **solo A y B se comunican**;
> **C está aislada**.

---

## 4. Isolated VPCs con shared services

**El requisito del video:**

- **VPC A** y **VPC B** deben quedar **aisladas entre sí**.
- **Las dos** tienen que llegar al **servicio compartido** que vive en **VPC C**.
- La VPC C es la **outbound VPC**: tiene el **NAT gateway** y es la única con salida a internet.

**El recorrido de ida, paso a paso:**

1. Un servidor en **A** quiere salir a internet.
2. El tráfico **local** dentro de A lo resuelve **la VPC**.
3. La route table de A manda **todo lo demás** al **transit gateway**.
4. **A y B están asociadas a la route table 1** del TGW.
5. En la tabla 1: lo que va a **internet público** se reenvía a la **outbound VPC (C)**.
6. En la tabla 1 también hay una **blackhole** para `10.0.0.0/8`: lo que va a **otra VPC privada** se **descarta**.

**El recorrido de vuelta:**

7. La route table de la **subred privada de C** manda el tráfico al **NAT gateway**.
8. El NAT gateway lo manda al **internet gateway** y sale.
9. El tráfico **entrante** hacia `10.2.x.x` (VPC B) llega a C, C lo manda al **TGW**.
10. **C está asociada a la route table 2**, y esa tabla lo dirige a **VPC B**.
11. El ruteo local de B lo entrega al **host** correcto.

**El resultado:** un **hub-and-spoke** donde **todo es privado y aislado salvo la outbound VPC**, que es donde se
concentran las capas extra de seguridad. Todo se monitorea desde **Transit Gateway Network Manager**.

> [!important] Por qué la blackhole es la pieza clave
> **Sin** la blackhole, A y B se verían por la tabla compartida. **Con** la blackhole en `10.0.0.0/8`, cualquier
> destino privado que no sea el local **se descarta**, y **no hace falta una tabla por VPC**.
>
> **Escala:** si mañana agregás 2 o 3 VPC privadas más, las adjuntás, las asociás a **la misma tabla 1**, y ya
> están aisladas.

---

## 5. Routers aislados con un servicio compartido

La forma **general** del caso anterior: configurar el TGW como **varios routers aislados** que **usan un servicio
compartido**.

- **Cada router aislado tiene una sola route table.**
- Los attachments de ese router **propagan y se asocian** a **su** tabla.
- Los attachments de un router **se hablan entre sí**, pero **no** con los de otro router.
- **Todos** pueden rutear hacia y desde la **VPC de shared services**.

| VPC | CIDR | Rol |
| --- | --- | --- |
| **VPC A** | `10.1.0.0/16` | Aislada de B y C |
| **VPC B** | `10.2.0.0/16` | Aislada de A y C |
| **VPC C** | `10.3.0.0/16` | Aislada de A y B |
| **VPC D** | `10.4.0.0/16` | **Shared services**: habla con todas |
| **Customer gateway** | `10.99.99.0/24` | On-premises |

**Cuándo usarlo:** cuando hay **grupos que deben estar aislados** pero **comparten un servicio** —por ejemplo, un
**sistema de producción**.

> [!note] TGW único vs. varios TGW
> La fuente dice que esto es **parecido a usar múltiples transit gateways**, pero **más flexible** cuando las
> rutas y los attachments **cambian seguido**: en vez de crear otro gateway, movés **asociaciones**.

> [!note] Las imágenes de la fuente no están en el vault
> *Isolated VPCs with shared services* (`assets/images/df7691f0-…-34499070ee88.png`): A, B y C **aisladas entre
> sí**, todas conectadas con **D (shared services)**.

---

## 6. Peering entre transit gateways

**Qué permite:** conectar **dos transit gateways** y rutear **IPv4 e IPv6** entre ellos.

| Paso | Detalle |
| --- | --- |
| **1. Crear el peering attachment** | En tu TGW, especificando el **peer TGW** en **otra Región** |
| **2. Misma o distinta cuenta** | El peer puede estar en **tu cuenta o en otra** |
| **3. Aceptar** | El dueño del peer —el **accepter transit gateway**— **debe aceptar** la solicitud |
| **4. Ruta estática** | En la route table del TGW, apuntando al **peering attachment** |
| **5. ASN únicos** | Usar **ASN distintos** en cada TGW para aprovechar **propagación de rutas** a futuro |

**Lo que hay que saber:**

- **Está cifrado**: el peering de TGW usa **la misma infraestructura que VPC peering**.
- **No resuelve DNS público entre regiones**: el peering **cross-Region** **no soporta** resolver **nombres DNS
  públicos de IPv4** a **direcciones IPv4 privadas** en VPC de **ninguno de los dos lados**.

> [!note] Las imágenes de la fuente no están en el vault
> *Transit gateway peering* (`assets/images/447ece32-…-7169bcf0f8c8.png`): **us-east-1** con VPC A (`10.1.0.0/16`)
> y VPC B (`10.2.0.0/16`) en un TGW; **us-west-2** con un customer gateway (`172.31.0.0/24`) por VPN en otro TGW;
> los dos TGW unidos por **peering**. Cada tabla default tiene una **ruta estática** al peering attachment.

---

## 7. Demo: armarlo en la consola

**Requisitos:** tres VPC (A, B, C). **C** tiene el recurso compartido (el **internet gateway**) y **toda la salida
a internet pasa por C**. **A y B no se hablan entre sí**.

| # | Paso | Qué se ve |
| --- | --- | --- |
| 1 | **Create transit gateway** | Nombre, defaults, y se marca **Default route table association** |
| 2 | **Create transit gateway attachment** × 3 | Tipo **VPC**; se adjuntan A, B y C |
| 3 | Abrir la **default route table** | Tiene **rutas de las tres VPC** → todos se hablan |
| 4 | **Renombrar** la default | Deja de ser “default” y pasa a llamarse por lo que hace |
| 5 | **Create transit gateway route table** | Se crea la tabla **AB** |
| 6 | Ruta estática en **AB** | Todo el tráfico de salida → **VPC C** |
| 7 | Segunda ruta estática en **AB** | `10.0.0.0/8` → **blackhole** |
| 8 | **Associations** de la default | Se **borran** las de **A** y **B**, una por una |
| 9 | **Create association** en **AB** | Se asocian **A** y **B** |
| 10 | **C** queda en la default | Porque tiene el recurso compartido y debe hablar con todos |
| 11 | **Route tables locales** | Verificar que cada VPC tenga ruta de salida **al TGW** |

> [!tip] Lo que la demo enseña sin decirlo
> El orden importa: si asociás A y B a la tabla nueva **antes** de sacarlas de la default, un attachment queda
> asociado a **dos** tablas, y eso **no está permitido**. Se borra primero, se asocia después.

---

## 8. Best practices y datos operativos

**Buenas prácticas de la fuente:**

1. **Una subred separada por cada attachment** de VPC, con **CIDR chico** (por ejemplo **/28**), para dejar
   direcciones a las instancias EC2.
2. **NACL de entrada y salida abiertas** en las subredes del transit gateway.
3. Según el flujo, aplicar NACL a las **subredes de las cargas de trabajo**.
4. **Una sola NACL** para todas las subredes del TGW, **abierta en ambos sentidos**.
5. **La misma route table de VPC** para todas las subredes del TGW, salvo que el diseño pida varias (por ejemplo,
   una **middle-box VPC** con varios NAT gateways).
6. Usar **BGP** en las Site-to-Site VPN; si el equipo lo soporta, habilitar **multipath**.
7. **Habilitar propagación de rutas** en los attachments de **Direct Connect gateway** y de **VPN BGP**.
8. **No hacen falta TGW adicionales para alta disponibilidad**: el TGW **ya es HA por diseño**.
9. **Limitar la cantidad de route tables**, salvo que el diseño las necesite.
10. En **multi-Región**, usar un **ASN del lado AWS único** por cada transit gateway.

**Datos que el examen pregunta:**

| Categoría | Valores |
| --- | --- |
| **Métricas (CloudWatch)** | **BytesIn**, **BytesOut**, **PacketsIn**, **PacketsOut** |
| **Cuotas** | **5** TGW por **Región** y por **cuenta** · **20** route tables por gateway · **5.000** attachments por gateway |
| **Costo** | Por **attachment** y por **GB procesado** |

---

## 9. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 8** y se cierra con la **11**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual del video o de la demo, o (c)
> antes del examen querés chequear que no se escapó un matiz.

### 9.1 Lectura: centralized routing e isolating VPCs

**Centralized routing.** Podés **crear route tables adicionales** dentro del transit gateway y **cambiar la
asociación** de la VPC o VPN a esas route tables. De esta forma, podés **segmentar tu red**.

Por ejemplo, podés **asociar las VPC de desarrollo a una route table** y las **VPC de producción a otra**. Podés
**crear redes aisladas dentro de un transit gateway** parecidas a **virtual routing and forwarding (VRF)** en las
redes tradicionales.

**Isolating VPCs.** Podés configurar tu transit gateway como un **router central** que conecta **todas tus VPC**,
**AWS Direct Connect** y las conexiones **AWS Site-to-Site VPN**. En este escenario, **todos los attachments se
asocian** a la route table default y **propagan** a ella. Por lo tanto, **todos los attachments pueden rutear
paquetes entre sí**, con el transit gateway sirviendo como un **router IP de Capa 3 simple**.

En este ejemplo, las route tables del transit gateway permiten que **VPC A y VPC B se comuniquen**. Sin embargo,
**VPC C podría quedar completamente aislada** de las otras dos.

### 9.2 Video: Isolated VPCs with Shared Services (transcripción)

Acá hay un ejemplo donde hay un **servicio compartido en una VPC** que querés que esté **disponible para las
otras dos VPC**. Tus requisitos dicen que **VPC A y B deben estar aisladas entre sí**, pero **ambas tienen que
poder acceder** a los servicios compartidos que corren en **VPC C**. Veamos un setup así con más detalle.

Esto es un poco más de detalle sobre la configuración para este caso de uso. No sé ustedes, pero yo **no soy un
ingeniero de redes profesional**, y a veces los **diagramas de red me resultan intimidantes**. Pero la buena
noticia es que **no tenés que ser un experto en redes para trabajar con Transit Gateway**. Solo necesitás
**adjuntar tus VPC** y **configurar la route table** para decirle al gateway **a dónde querés que vaya el
tráfico**.

En este ejemplo, el **recurso compartido de VPC C está en ese gateway**, y por eso está etiquetada como la
**outbound VPC**. **VPC A y B son privadas.** Cualquier tráfico de ellas que necesite **salir a internet** tiene
que pasar por el **NAT gateway**. Así que vamos a recorrerlo **paso a paso**.

Hay un **servidor en VPC A** que quiere **mandar tráfico a internet**. El **tráfico local dentro de VPC A** lo
maneja **la VPC**. La **route table** dice que **todo lo demás** —como nuestro mensaje saliente— se manda al
**transit gateway**. **VPC A y B están asociadas a la route table 1** del transit gateway. Así que **la tabla 1
dice cuál será el next hop**. Y según la ruta que hay acá, **todo lo direccionado a internet público se reenvía a
mi outbound VPC**.

Fijate en **esta otra ruta**, sin embargo. Es lo que llamamos una **blackhole route**. Todo lo que se manda a una
blackhole **no va a ningún lado**, igual que un **agujero negro** de verdad. Esto **satisface uno de mis
requisitos**: que **VPC A y VPC B estén aisladas entre sí** **sin necesidad de configurar route tables separadas
para cada una**. Si un host en VPC A intenta mandar tráfico a **10.2.algo** en VPC B, va al transit gateway y
**simplemente se descarta**. Eso hace que sea una **solución muy escalable**. Si agregás **2 o 3 VPC privadas
más** que querés aislar, las **adjuntás al transit gateway** y las **asociás a la route table 1**, y **listo**.
Con un **CIDR /8 especificado en una regla blackhole**, cualquier tráfico direccionado **fuera de la VPC local
hacia 10.algo** no va a ningún lado.

Sigamos con el ejemplo de un **mensaje válido a internet público**. El transit gateway **reenvió este tráfico a
esta subred privada de la outbound VPC**. La **route table de esa subred** rutea el tráfico al **NAT gateway**. Y
después ese gateway **reenvía todo al internet gateway** y **afuera, a la web**.

También ves en esta route table **qué pasa con el tráfico entrante**. Digamos que hay **tráfico entrante para
10.2.alguien** en **VPC B**. Se rutea **al transit gateway desde la outbound VPC**. Esta VPC está **asociada a la
route table 2** en el gateway, y eso **dirige el tráfico a VPC B**, donde el **ruteo local de la VPC** lo dirige
al **host correcto**.

Así que lo que tenemos acá es un **lindo setup hub-and-spoke**, donde **todo es privado y está aislado excepto la
outbound VPC**, y donde probablemente tengas **algunas capas extra de seguridad** configuradas. Y podés
**monitorearlo todo** desde **Transit Gateway Network Manager**.

*Duración del video: **3 minutos 05 segundos**.*

### 9.3 Lectura: isolated routers con shared services

Podés configurar tu transit gateway como **múltiples routers aislados** que **usan un servicio compartido**. Es
**parecido a usar múltiples transit gateways**, pero da **más flexibilidad** en casos donde las **rutas y los
attachments pueden cambiar**.

En este escenario, **cada router aislado tiene una sola route table**. **Todos los attachments asociados a un
router aislado propagan y se asocian a su route table**.

Los attachments asociados a un router aislado **pueden rutear paquetes entre ellos**, pero **no pueden rutear
paquetes hacia, ni recibir paquetes de, los attachments de otro router aislado**. Los attachments **sí pueden
rutear hacia y desde los shared services**.

Podés usar este escenario cuando tenés **grupos que necesitan estar aislados**, pero **usan un servicio
compartido**, por ejemplo un **sistema de producción**.

> [!note] La imagen de la fuente no está en el vault
> *Isolated VPC with shared services* (`assets/images/df7691f0-…-34499070ee88.png`): VPC A (`10.1.0.0/16`),
> VPC B (`10.2.0.0/16`) y VPC C (`10.3.0.0/16`) **aisladas entre sí**; **VPC D** (`10.4.0.0/16`) de **shared
> services**; customer gateway (`10.99.99.0/24`). **Todas pueden comunicarse con D.**

### 9.4 Lectura: NAT Gateway as a Shared Service

Este es un ejemplo de **combinar aislamiento de VPC con una VPC de shared services**.

1. **Enviar tráfico.** Las **route tables de las VPC** mandan el tráfico **no local** al **transit gateway**.
2. **Rutear tráfico.** El tráfico no local **que no es 10.x** se rutea a la **outbound VPC**.
3. **Blackhole route.** La **ruta blackhole** asegura que **VPC A y VPC B no puedan comunicarse entre sí**.
4. **Ruta al NAT gateway.** La **route table de la subred privada** de la outbound VPC rutea el tráfico al
   **NAT gateway**.
5. **Ruta al internet gateway.** El **NAT gateway** rutea el tráfico al **internet gateway**.
6. **Ruta a la subred adecuada.** El **tráfico entrante** al transit gateway para direcciones **10.1 y 10.2** se
   rutea **directo a la subred correspondiente**.

Podés **centralizar el tráfico de salida a internet** de muchas VPC **sin comprometer el aislamiento**. Usando
**AWS Transit Gateway**, podés configurar **una sola VPC con múltiples NAT gateways** para **consolidar el
tráfico saliente** de numerosas VPC. Al mismo tiempo, podés usar **múltiples route tables** dentro del transit
gateway para **mantener el aislamiento VPC a VPC**. Este diseño **hub-and-spoke** te ayuda a **administrar toda
tu comunicación saliente a internet de forma segura desde un solo lugar**. La **ruta blackhole** crea el
**aislamiento entre las VPC**.

### 9.5 Lectura: peering

Podés hacer **peering entre dos transit gateways** y rutear **tráfico IPv4 e IPv6** entre ellos. Para hacerlo,
**creá un peering attachment** en tu transit gateway y **especificá un peer transit gateway en otra Región de
AWS**. Este peer transit gateway puede estar en **tu cuenta o en una cuenta distinta**.

Después de crear la **solicitud de peering attachment**, **el dueño del peer** —también llamado **accepter transit
gateway**— **debe aceptar** la solicitud. Para rutear tráfico entre los transit gateways, **agregá una ruta
estática** a la route table del transit gateway **que apunte al peering attachment**. Usá **números de sistema
autónomo (ASN) únicos** para los transit gateways emparejados, para aprovechar **capacidades futuras de
propagación de rutas**.

El **peering cross-Region** de transit gateway **no soporta resolver nombres DNS públicos de IPv4 a direcciones
IPv4 privadas** entre VPC de **cualquiera de los dos lados** del peering attachment. El peering de transit gateway
**usa la misma infraestructura de red que VPC peering** y, por lo tanto, **está cifrado**.

En este escenario, las **VPC y los attachments de VPN** se asocian a las **route tables default** y **propagan**
a ellas. **Cada route table** tiene una **ruta estática** que apunta al **peering attachment**.

### 9.6 Demo: Transit Gateway (transcripción)

Bienvenidos a esta **demo de Transit Gateway**. Voy a demostrar **cómo crear un transit gateway**, **cómo
adjuntar un conjunto de VPC** y **cómo rutear tráfico de acuerdo con un conjunto de requisitos**.

Acá está el **layout** y los **requisitos** que me dieron. Hay **tres VPC: A, B y C**, que necesitan estar
**adjuntas al transit gateway**. **VPC C tiene un recurso que necesita ser compartido** entre las tres VPC. Por
ejemplo, podría ser un **internet gateway**, y el plan es que **todo el tráfico que va a internet se rutee por VPC
C**. Y después tengo este **requisito adicional**: **VPC A y B tienen que estar aisladas entre sí**. Así que **A y
B necesitan poder hablar con C, pero no entre ellas**. Sin problema: tenemos **herramientas** para manejar eso.
Vamos a la consola.

Bien, acá está mi **punto de partida**. **Tres VPC: A, B y C.** Igual que el diagrama. Y ahora mismo hay **tres
redes separadas**, **no conectadas entre sí**. Así que vamos a la sección de **transit gateway** y seleccionamos
**transit gateway**. **No hay gateways creados todavía**, así que vamos a **crear uno**.

Selecciono **Create transit gateway** y le doy un **nombre**. Voy con el default: **transit gateway 01**. Y dejo
**los otros settings en sus defaults** también, pero voy a **seleccionar este**: **Default route table
association**. Esa opción significa que este transit gateway va a tener una **default route table** que va a
**asociarse automáticamente con cualquier cosa que adjunte** a este gateway. Eso va a ser **importante más
adelante**. Por ahora, selecciono **Create transit gateway**. Eso va a tardar **unos segundos** en configurarse.

Bien, **mi gateway está available**. Voy a seleccionar el **siguiente ítem del menú**: **Transit gateway
attachments**. Y está **vacío**, por supuesto, porque **no adjunté nada todavía**. Vamos a hacerlo ahora.

Selecciono **Create transit gateway attachment** y empiezo a **adjuntar mis VPC** al transit gateway. Empecemos
con **VPC A**. Le doy un **nombre** al attachment, selecciono **a qué gateway** lo estoy adjuntando (**solo tengo
un gateway** en este ejemplo, así que ese), y el **tipo de attachment es VPC**. Y en **VPC ID** selecciono la que
quiero: **VPC A**. Y ahora selecciono **Create transit gateway attachment**. Eso tarda **unos momentos** en
activarse.

Mientras trabajo, voy a **adjuntar VPC B**. **Mismo proceso**: le doy nombre al attachment, selecciono el
**transit gateway** al que lo adjunto y selecciono **qué VPC** se adjunta. Selecciono **Create transit gateway
attachment**. Veo que **las dos siguen pending**. Trabajemos en **VPC C**. Le doy un nombre, selecciono un
**transit gateway** al que adjuntarla y selecciono **qué VPC** estoy adjuntando. Se ve bien.

**Las tres VPC están adjuntas** al transit gateway y **available**. Veamos la **route table** que el transit
gateway está usando para ver **cómo voy con mis requisitos**. Selecciono **transit gateway route tables**. Y acá
está lo que les decía cuando **creé el transit gateway**: hay una **default route table** que **se asocia a las
tres VPC** que adjunto.

Seleccionemos esa route table. Y en el panel, selecciono **routes**. Hay **ruteo para las tres VPC** en esta
tabla. Eso significa que **VPC A, B y C pueden hablarse entre sí**, y eso **satisface solo parcialmente mis
requisitos**, ¿no? Yo quería que **A y B pudieran hablar con C**, pero **no quería que se hablaran entre ellas** a
través del gateway.

¿Cómo lo arreglo? Necesito **crear otra route table** para que A y B usen, que **no sea tan abierta**. Antes de
hacer cualquier otra cosa, voy a **darle a esta tabla un nombre más descriptivo**, porque eso es lo que es: es la
**default**, y **conecta todas estas VPC**. Y después selecciono **Create transit gateway route table**. Ahora
nombro esta route table **AB**. Selecciono **para qué transit gateway es** (**de nuevo, hay uno solo**) y
selecciono el botón para **crear** la route table.

Ahora, si selecciono esta tabla y voy al panel **routes**, no es muy emocionante: **solo una ruta a ningún lado**.
Vamos a arreglar eso. Selecciono **Create route**, y mi **primera ruta va a ser para el tráfico de salida**. Voy a
**apuntar todo eso a VPC C**, que es donde está el **internet gateway** al que todos quieren acceso. Selecciono el
botón para **crear la ruta estática**, y vuelvo a la pestaña **routes** de mi route table **AB**. Eso es **la
mitad del problema resuelto**, pero las cosas **siguen demasiado abiertas** para mis requisitos.

Así que selecciono el botón para **crear otra ruta estática**, y selecciono **todo el bloque CIDR 10.algo**. Y
selecciono **black hole** como tipo, y selecciono **Create static route**. Esto es lo que necesito para **VPC A y
B**: el **tráfico de salida se rutea a VPC C** como se pidió, y **A no puede mandar tráfico a B, ni viceversa**, a
través del gateway. Cualquier tráfico que intente eso se **rutea a la blackhole** y **no va a ningún lado**.

**Casi listo.** Estos son mis **últimos pasos**. Selecciono la **default route table**, y voy a mirar acá en el
panel de **routes**, y me voy a **recordar los IDs de attachment** de **A** y de **B**, porque **no soy de los que
memorizan eso al instante**. Acá están. Puedo ver por los **bloques CIDR** que **A y B** empiezan con **08 8** y
**0C2** respectivamente.

Selecciono **associations**, y selecciono **08 8** y **0C2**, y selecciono **Delete association** y confirmo.
Tengo que hacerlo **de a uno**. Bien, **las dos asociaciones fueron borradas**, o están en proceso. Ahora puedo
seleccionar la **route table** que quiero que **A y B** tengan. Selecciono **associations** y el botón **Create
association**. **Asocio VPC A** y selecciono **Create association**. Y después **repito el proceso para VPC B**.

Y **ahí lo tengo**. **VPC C está usando la default table**, porque tiene el **recurso compartido**, así que
queremos que **C pueda hablar con todos**. **VPC A y B están usando esta tabla custom**, donde **cada una puede
hablar con C, pero no entre ellas**. **Mis requisitos están cumplidos.**

Lo último que haría antes de dar el día por terminado es **revisar las route tables locales de cada una de estas
VPC** y **asegurarme de que haya una ruta para el tráfico de salida hacia el transit gateway**. Gracias por ver
esta demostración.

*Duración del video: **8 minutos 57 segundos**.*

### 9.7 Lectura: Transit Gateway best practices

Las siguientes son **buenas prácticas** para el diseño de tu transit gateway:

- Usá una **subred separada para cada attachment** de VPC. Para cada subred, usá un **CIDR chico**, por ejemplo
  **/28**, para tener **más direcciones para recursos de Amazon EC2**.
- Mantené **abiertas** las **network ACL de entrada y salida** asociadas a las **subredes del transit gateway**.
- Según tu **flujo de tráfico**, podés **aplicar network ACL a las subredes de las cargas de trabajo**.
- **Creá una network ACL** y **asociala a todas las subredes asociadas al transit gateway**. Mantené la NACL
  **abierta en ambas direcciones**.
- **Asociá la misma route table de VPC** a **todas las subredes asociadas al transit gateway**, salvo que tu
  diseño requiera **múltiples route tables de VPC** (por ejemplo, una **middle-box VPC** que rutea tráfico a
  través de **múltiples NAT gateways**).
- Usá **conexiones Site-to-Site VPN con BGP**. Si el **dispositivo de customer gateway** o el **firewall** de la
  conexión soporta **multipath**, **habilitá la función**.
- **Habilitá la propagación de rutas** para los **attachments de Direct Connect gateway** y los **attachments de
  Site-to-Site VPN con BGP**.
- **No necesitás transit gateways adicionales para alta disponibilidad**, porque los transit gateways **son
  altamente disponibles por diseño**.
- **Limitá la cantidad de route tables** del transit gateway, salvo que tu diseño requiera **múltiples**.
- Para **despliegues en múltiples Regiones**, se recomienda **un ASN del lado AWS único para cada uno** de tus
  transit gateways.

### 9.8 Lectura: Transit Gateway data points

**Amazon VPC publica data points en Amazon CloudWatch** para tus transit gateways y tus **attachments**. Podés
usar **CloudWatch** para recuperar **estadísticas** sobre esos data points como un **conjunto ordenado de series
temporales**, conocidas como **métricas**.

**Métricas clave:** **BytesIn**, **BytesOut**, **PacketsIn**, **PacketsOut**.

**Cuotas clave:**

- **5 por Región, por cuenta**
- **20 route tables por gateway**
- **5.000 attachments por gateway**

**Componentes de costo:**

- **Por attachment**
- **Por GB de datos procesados**

---

## 10. El patrón que se repite

| Lo que querés | Cómo se hace |
| --- | --- |
| **Que todo se hable** | Dejarlo en la **default route table** (asociación + propagación) |
| **Aislar una VPC** | **Otra route table** para ella |
| **Aislar dos VPC que comparten tabla** | **Blackhole** al rango privado (`10.0.0.0/8`) |
| **Dar internet a VPC privadas** | **Outbound VPC** con **NAT gateway** y ruta de retorno por **su** tabla |
| **Compartir un servicio entre grupos aislados** | **VPC de shared services** + una tabla por grupo |
| **Unir dos regiones** | **Peering attachment** + **ruta estática** + **aceptar** la solicitud |
| **Escalar sin tocar la topología** | Adjuntar y **asociar a la tabla que ya existe** |

---

## 11. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Default = router de Capa 3**: todos los attachments asociados y propagados a la default **se hablan**.
> 2. **Aislar** = **otra route table**; o **blackhole** si querés **compartir** tabla.
> 3. **Blackhole a `10.0.0.0/8`** aísla las VPC privadas **sin** una tabla por VPC, y **escala**.
> 4. **Shared services**: A y B aisladas, ambas llegan a C; C es la **outbound VPC** con el **NAT gateway**.
> 5. El **retorno** necesita **su propia tabla**: la outbound VPC asociada a la tabla que apunta a las spokes.
> 6. **Peering de TGW**: **otra Región**, el peer **acepta**, **ruta estática** al peering attachment,
>    **cifrado** y **ASN únicos**.
> 7. **Peering cross-Region NO resuelve** nombres DNS públicos a IP privadas entre las VPC de los dos lados.
> 8. **HA no requiere un segundo TGW**: el TGW **es HA por diseño**. **Limitar** la cantidad de route tables.
> 9. **Cuotas**: **5** TGW por Región y cuenta · **20** route tables · **5.000** attachments.
> 10. **Costo**: por **attachment** y por **GB procesado**. **Métricas**: **BytesIn/Out**, **PacketsIn/Out**.

> [!warning] Trampa clásica del examen
> Escenario: “A y B deben quedar aisladas, y **las dos** necesitan salir a internet por una VPC compartida, **sin
> crear una route table por VPC**”.
> La respuesta **no** es un **segundo transit gateway** ni **peering** entre A y B: es **una sola tabla
> compartida** con **ruta a la outbound VPC** + **blackhole** para el rango privado.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[AWS Transit Gateway Setup]] — la lección anterior: asociación, propagación y blackhole
- [[VPC Connectivity]] — por qué el hub reemplaza la malla
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — shared services entre cuentas
- [[Architecting for Cost - Networking]] — costo por attachment y por GB procesado
- Siguiente paso del módulo: [[IP Address Management and IPv6 Adoption]] — el CIDR como recurso escaso

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 04 completa: cinco casos de uso, demo de 8:57, best practices y data points | Nota completa (secciones 1–11) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **“Use Cases” agrupa cinco escenarios** y la fuente los presenta sin índice. Se ordenaron en §1 y se marcó que
   el caso de **NAT compartido** y el de **shared services** son **el mismo diseño** visto desde dos ángulos.
2. **Las cinco imágenes no están en el vault**: `98ea276e-…`, `6dca4694-…`, `df7691f0-…`, `447ece32-…` y la del
   caso de shared services. Se describen desde el texto alternativo.
3. **La demo tiene los IDs de attachment ilegibles** en la transcripción (“08 8” y “0C2”). Se transcriben tal
   como suenan y se aclara que son **IDs de attachment**, no CIDR.
4. **“/8” en la blackhole**: el video dice “un CIDR /8” y después “10.algo”; se interpreta como **`10.0.0.0/8`**,
   que es lo que la lectura confirma (“tráfico que no es 10.x se rutea a la outbound VPC”).
5. **La sección “Centralized Routing” repite** el texto de *Additional route tables* de la lección 03. No es
   contradicción: es la misma idea presentada como caso de uso.
6. **“5 per Region, per account”** se transcribe como **5 TGW por Región y por cuenta**; la fuente no aclara si
   incluye el default de otras cuentas.
7. **No hay Knowledge Check.**

**Decisiones de transcripción:**

- Se conservan **blackhole route**, **outbound VPC**, **shared services**, **hub-and-spoke**, **peering
  attachment**, **accepter transit gateway**, **ASN**, **NACL** y **middle-box VPC**.
- Las **cifras** se transcriben literales: **5 / 20 / 5.000**, **/28**, **3 min 05 s**, **8 min 57 s**.
- **No se agregaron** precios por attachment ni límites que la fuente no da.
