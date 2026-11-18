---
title: "VPC Connectivity"
aliases:
  - "Conectividad de VPC"
  - "VPC connectivity"
  - "VPC Connectivity (lección)"
  - "Peering, transit VPC y Transit Gateway"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - vpc
  - transit-gateway
  - peering
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# VPC Connectivity

> [!abstract] Qué es este archivo
> Segunda lección del módulo. La anterior terminó con un requisito —**red escalable sin reconfigurar**—; esta
> muestra **por qué la malla no escala** y las **dos formas** de arreglarla: **transit VPC** (la vieja) y
> **AWS Transit Gateway** (la administrada).
>
> El número que ordena todo: **6 VPC conectadas en malla son 15 peerings**. Y cada conexión es un punto de falla
> y un tablero que alguien tiene que mirar.
>
> Duración del video: **5 min 30 s**.

> [!quote] La idea que ordena todo
> **Cada conexión que agregás es un punto de falla y algo que monitorear.** La arquitectura no se simplifica
> administrando mejor el desorden: se simplifica **sacando conexiones**.

---

## Resumen en una frase

> Un **transit gateway** reemplaza la malla de peering y las conexiones uno-a-uno con un **hub administrado,
> regional y escalable**, donde cada red se **adjunta una vez** y el ruteo se resuelve con **route tables**.

---

## 1. El problema: la cuenta que no cierra

El escenario de la lección: **6 VPC** (dev y producción) y un entorno **on-premises**.

| Lo que se quiere conectar | Conexiones sin Transit Gateway |
| --- | --- |
| **6 VPC ↔ on-premises por VPN** | **6** conexiones, una por cada **virtual private gateway** |
| **6 VPC ↔ on-premises por Direct Connect** | **6** **private virtual interfaces (VIF)** — **12** si se busca redundancia |
| **Las 6 VPC entre sí** | **15** **VPC peering** |

**De dónde sale el 15:** el peering es **1 a 1** y **no es transitivo**. Si A está con B y B con C, **A no está con
C**. Para conectar **n** VPC en malla hacen falta **n(n−1)/2** conexiones: con 6, **15**.

> [!important] Lo que el número significa
> **15 no es solo 15 configuraciones.** Son **15 puntos potenciales de falla** y **15 cosas que monitorear**.
> Y el problema **crece con cada VPC nueva**: no es un costo único, es una curva.

**La pregunta que deja la lección:** *¿cómo simplificamos el diseño para reducir la cantidad de conexiones de
peering y de VPN?*

> [!note] Ampliación (no está en la fuente)
> Con **10 VPC** la malla pide **45** peerings; con **20**, **190**. La fórmula es la misma que en la lección
> anterior: el peering no falla por mala configuración, falla por **topología**.

---

## 2. Transit VPC: el hub que resolvía la mitad

Antes de que existiera Transit Gateway, el patrón era **una VPC de tránsito**:

- Una **VPC dedicada** con **instancias EC2 que hacen de routers**.
- Esa VPC es el **hub**: las demás se conectan ahí.
- **Reduce las conexiones físicas** desde on-premises (de 6 a **2**: VPN + Direct Connect).
- Permite colgar servicios útiles en el hub: **packet scanning**, **firewalls**.

**Lo que sí resuelve:** el **lado on-premises**. Menos conexiones físicas, un punto donde inspeccionar.

**Lo que NO resuelve:** el **lado cloud**.

| Problema del transit VPC | Por qué duele |
| --- | --- |
| **Conocimiento del sistema operativo del vendor** | Hay que administrar routers en EC2, no un servicio |
| **La segmentación exige listas de direcciones complejas** | Separar VPC que sí y VPC que no se vuelve un listado manual |
| **Se paga la EC2 y la licencia del software de terceros** | Costo fijo, sin importar el tráfico |
| **La escalabilidad la limita el hardware elegido** | El techo es el tamaño de las instancias, no la demanda |

> [!warning] El error de diagnóstico
> El transit VPC **no elimina los peering**: los **mueve** al hub. Si querés que las 12 VPC se hablen, seguís
> armando conexiones hacia el hub y **seguís administrando listas** para segmentar.

---

## 3. Transit Gateway: el switchboard administrado

**AWS Transit Gateway** es un **hub de tránsito de red** que interconecta **VPC** y **redes on-premises**. Es un
**servicio administrado**, no una VPC con routers.

| Comparación | Transit VPC | Transit Gateway |
| --- | --- | --- |
| **Naturaleza** | EC2 + software de routing | **Servicio administrado** |
| **Escalabilidad** | Limitada por el **hardware** | **Elástica, según el tráfico** |
| **Operación** | SOS del vendor, parches, licencias | **Consola central** |
| **Costo** | EC2 + **licencias** | Por **attachment** y por **tráfico** |
| **Segmentación** | Listas de direcciones | **Route tables** o **blackhole entries** |
| **On-premises** | VPN y DX por separado | **VPN** y **Direct Connect gateway** como attachments |

**Cómo se comporta por defecto:** el transit gateway nace con **una sola route table**. Eso significa que **todas
las VPC adjuntas se ven entre sí** — “una gran familia feliz”.

**Cómo se segmenta:**

1. **Varias route tables**, una por segmento, y se asocian los attachments correspondientes.
2. **Una sola table con blackhole entries**: se manda a la ruta “agujero negro” lo que no debe pasar.

> [!important] La prueba de que entendiste
> **Adjuntar no es conectar.** Un attachment define **quién puede hablar con el TGW**; lo que **puede alcanzar**
> lo define la **route table**. Si te olvidás de la segunda parte, el default te da conectividad total.

---

## 4. Fundamentos: attachments, ruteo y alcance

**Un attachment es origen y destino de paquetes.** Se puede adjuntar:

- **Una o más VPC**
- **Una o más conexiones VPN**
- **Uno o más Direct Connect gateways**
- **Uno o más transit gateway peering connections**

**Reglas que el examen pregunta seguido:**

| Regla | Detalle |
| --- | --- |
| **Direct Connect no entra directo** | Se conecta a través de un **Direct Connect gateway**, no del DX “pelado” |
| **Es regional** | Todos los attachments están en la **misma Región** |
| **Cross-Region = peering de TGW** | El attachment de peering **debe estar en otra Región**; **cifra todo el tráfico** |
| **Cross-account = RAM** | Se comparte con **AWS Resource Access Manager**; la otra cuenta **adjunta sus VPC** |
| **Borrar el attachment** | **Cualquiera de las dos cuentas** puede eliminarlo en cualquier momento |
| **Ruteo** | Soporta **dinámico y estático**; la **propagación de rutas se prende o apaga por attachment** |
| **Tráfico** | VPC ↔ TGW queda en la **red privada global de AWS**, no sale a internet |
| **Sin cuello de botella** | No hay punto único de falla ni límite de ancho de banda en el hub; protege de **DDoS** |

**Transit Gateway Network Manager:** consola central para **monitorear VPC y conexiones de borde**, integrada con
dispositivos **SD-WAN**, para encontrar el problema en una red global.

---

## 5. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 4** y se cierra con la **7**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual de los diagramas, o (c) antes
> del examen querés chequear que no se escapó un matiz.

### 5.1 Video principal (transcripción)

En este módulo vas a aprender a construir **soluciones escalables** para administrar arquitecturas con
**topologías de red complejas**. También vas a explorar soluciones para **simplificar las conexiones** entre
aplicaciones y cargas de trabajo de **alto rendimiento** en redes globales. Vamos.

Acá hay un **desafío común**. Estás dando soporte a **múltiples VPC** y se te está haciendo **difícil administrar
la cantidad de conexiones** que eso requiere. En este ejemplo tenés **6 VPC** para cargas de **dev y producción**.
Si querés conectarlas a tu **VPN on-premises**, necesitás **6 conexiones**, una por cada **private gateway**. Lo
mismo si sumás **Direct Connect**: son **6 conexiones más** a las **private virtual interfaces**, o **12** si
querés **redundancia**. Son **muchísimas conexiones** para administrar, y el problema **crece a medida que
escalás**. Cada **VPC nueva** que desplegás requiere **más conexiones**, o sea **más monitoreo** y **más puntos
posibles de falla**. Y eso es **solo** para establecer conectividad con el entorno **on-premises**.

La **P** de VPC significa **private**, pero quizás igual querés que **algunas o todas** estas VPC puedan **hablarse
entre sí**. Si conocés **VPC peering**, sabés que podés usar peering para conectar dos VPC, pero el peering es una
**relación 1 a 1**. Si conectás **VPC A** con **VPC B** por peering y después **VPC B** con **VPC C**, ¿hay alguna
**propiedad transitiva** que diga que **A y C** ahora están conectadas? **No la hay.** Necesitarías **otra conexión
de peering** para eso.

Entonces, ¿cuántas conexiones de peering harían falta para que **las 6 VPC** de este diagrama estén conectadas?
Y antes de que pauses el video para contar, te ayudo: son **15 conexiones de VPC peering**. Y ese número **crece
exponencialmente** con cada **VPC nueva** que despliegues con los mismos requisitos. Estaría bueno poder
**centralizar y simplificar** esto un poco.

Acá va **una solución** que ataca **parte** del problema. Podrías desplegar una **transit VPC dedicada**, que es lo
que **muchos clientes hacían antes de que existieran los transit gateways**. Dentro de esa transit VPC tenés
**instancias EC2 actuando como routers**, y así se convierte en un **hub** para las comunicaciones. Ahora
necesitás **muchísimas menos conexiones físicas** desde el sitio on-premises, lo cual está bien. Y si querés,
podés instalar **otros servicios útiles** en ese hub central, como **packet scanning** o **firewalls**.

Pero acá está **la parte del problema que el transit VPC no resuelve**: la **comunicación dentro de la nube**.
Seguís necesitando **cablear**, o **virtualmente cablear**, **muchísimas conexiones** desde tu hub hacia todas
estas VPC. Todavía hay **mucho para administrar**, y esta solución **no hace nada** para que conectar VPC sea más
fácil. Seguís usando **muchísimas conexiones de peering** si querés que todas estas VPC se hablen. ¿Y si querés
**segmentación**? Es muy común que necesites que **algunas VPC se hablen entre sí pero no con otras**. Eso puede
significar **muchísimas listas de direcciones** para administrar.

¿Podemos hacerlo mejor? **Sí, podemos.** Mirando este diagrama, lo primero que noto es que hay **muchísimo menos
espagueti** que en el diagrama anterior. Me gusta. ¿Cómo lo administramos? Bueno, hicimos lo que hacemos seguido
cuando encontramos **arquitecturas complejas** en AWS: ver si hay un **servicio administrado** que se haga cargo
de **parte de ese trabajo pesado**. En este caso, ese servicio es **Transit Gateway**, un **hub de tránsito
escalable** que podés usar para **interconectar tus VPC y tus redes on-premises**.

Transit Gateway es como tener una **centralita telefónica basada en la nube** a la que **todos se conectan**, y es
**mucho más fácil de configurar y administrar** que intentar manejar todas esas **conexiones individuales** por tu
cuenta. Y **monitoreás y administrás todo desde una consola central**.

¿Querés **agregar una VPC nueva** a tu entorno? La **adjuntás al gateway** y **das una lista de con quién querés
que hable**, en forma de **route table**. Por defecto, el transit gateway tiene **una route table**, lo que
significa que el comportamiento default es que **todas las VPC adjuntas se hablan entre sí**, una gran familia
feliz. Si quiero **segmentar** eso, puedo **agregar route tables adicionales** o **usar una sola tabla y crear
blackhole entries**. Vamos a profundizar en eso más adelante en este video.

Cada red que conectás a tu transit gateway se llama **attachment**, y esta diapositiva muestra los **distintos
tipos**: **VPC** de la nube, **conexiones VPN** y **Direct Connect gateways** desde on-premises. Fijate que es un
**Direct Connect gateway**: **no podés ir de Direct Connect directamente al transit gateway**.

Los transit gateways **funcionan entre cuentas de AWS**, así que podés usar **AWS Resource Access Manager** para
**compartir tu transit gateway** con otras cuentas. Los transit gateways son un **recurso regional**, así que
**todos estos attachments están en la misma Región**. Por eso tenemos el último ítem de la lista: los
**transit gateway peering attachments**, que sirven para **conectar tu transit gateway con otro en otra Región**.

*Duración del video: **5 minutos 30 segundos**.*

**Preguntate:** *¿cómo podemos simplificar el diseño de red para reducir la cantidad de conexiones de peering y de
VPN?*

### 5.2 Lectura: VPC connectivity without a transit gateway

Una conexión **VPN** desde on-premises a una VPC es una **relación 1 a 1**. Si querés conectarte a **múltiples
VPC** con una VPN on-premises, tenés que **crear una conexión adicional a cada private gateway** de cada VPC. Lo
mismo pasa con las **private virtual interfaces (VIF)** de **AWS Direct Connect**: **cada private VIF es, por
defecto, una ruta a una sola VPC**. Para conectarte a múltiples VPC con Direct Connect, podés **crear private VIF
adicionales**.

**VPC peering** también es una **relación 1 a 1**. Hacer peering de **6 VPC en malla** produce **15 conexiones de
peering independientes**. La **cantidad de conexiones** tiene **impacto directo** en la cantidad de **puntos
posibles de falla** y en la **necesidad de monitoreo**. **Menos conexiones** significa **menos para monitorear** y
**menos puntos posibles de falla**. A medida que **crece la infraestructura**, estas conexiones de **peering, VPN y
Direct Connect** pueden **aumentar sustancialmente**.

> [!note] Las imágenes de la fuente no están en el vault
> Diagrama *VPC connectivity without a Transit Gateway* (`assets/images/BDEDAVDF9J.png`): arriba, **6 VPC
> interconectadas por peering**; abajo, **on-premises** con **VPN y Direct Connect** hacia cada VPC, **12 enlaces
> distintos** (6 VPN + 6 DX).

Antes de meternos en qué es **AWS Transit Gateway**, veamos cómo podrías **crear conexiones VPN sin uno**.
Considerá la siguiente arquitectura.

### 5.3 Lectura: VPC connectivity with a Transit VPC

Entonces, ¿cuál es **una forma** de simplificar esta solución? Podrías usar una **transit VPC**.

Podés crear lo que se conoce como **solución de transit VPC** para **simplificar la configuración de red**. Una
transit VPC es, esencialmente, **una VPC que corre software de routing en instancias de Amazon Elastic Compute
Cloud (Amazon EC2)**. Podés **agregar otro software**, como **packet scanning**, a ese **hub central**. El
**ruteo transitivo** se habilita **a través del hub central**.

Podés usar la transit VPC para **conectar múltiples VPC** que estén **geográficamente dispersas** o **corriendo en
cuentas de AWS separadas** a una **VPC común** que sirve como **centro de tránsito de red global**. Esta topología
**simplifica la administración** y **minimiza la cantidad de conexiones** que hay que **configurar y administrar**.
Se implementa **de forma virtual** y **no requiere hardware de red físico** ni presencia en un **hub de
colocation**.

> [!note] Las imágenes de la fuente no están en el vault
> Diagrama *VPC connectivity using a Transit VPC* (`assets/images/Q7PG96D5XD.png`): arriba, **12 VPC**; abajo,
> **on-premises** con **2 conexiones** al transit VPC (**VPN** y **DX**); adentro del transit VPC, **2 routers**,
> cada uno con enlaces a **las 12 VPC** → **24 conexiones**.

Aunque esta solución es **un poco mejor** que la primera, el **transit VPC** tiene **varios problemas potenciales**
que vale la pena considerar:

- Se requiere **conocimiento del sistema operativo (OS) del vendor**.
- La **segmentación** requiere **listas de direcciones complejas**.
- **Pagás las instancias EC2** y el **licenciamiento** del software de terceros que corre en ellas.
- La **escalabilidad** de esta solución está **limitada por el hardware** elegido para el transit VPC.

### 5.4 Lectura: VPC connectivity with a Transit Gateway

¿Se puede **simplificar** esta solución? **¡Sí!** Una de las formas de simplificar todo esto es usar un
**Transit Gateway**.

Un **transit gateway** es un **hub de tránsito de red** que podés usar para **interconectar tus VPC y tus redes
on-premises**. **Escala elásticamente** según el tráfico. A diferencia del **transit VPC**, **AWS Transit Gateway
es un servicio administrado**. Un transit gateway **actúa como un router en la nube** para **simplificar tu
arquitectura de red**.

> [!note] Las imágenes de la fuente no están en el vault
> Diagrama *VPC using a Transit Gateway* (`assets/images/B79AZJSAQV.png`): arriba, **12 VPC**; abajo,
> **on-premises** con **2 conexiones** (**VPN** y **DX**); el TGW tiene **un attachment a cada una de las 12 VPC**
> → **12 conexiones**.

A medida que **crece tu red**, la **complejidad de administrar conexiones incrementales no te frena**. Cuando
construís **aplicaciones globales**, podés **conectar transit gateways usando inter-Region peering**.

También podés usar **Transit Gateway Network Manager**. Con **Transit Gateway Network Manager** podés
**monitorear tus VPC y las conexiones de borde desde una consola central**. **Integrado con dispositivos
populares de software-defined wide area network (SD-WAN)**, Transit Gateway Network Manager te ayuda a
**identificar problemas en tu red global**. El **tráfico entre una VPC y el transit gateway permanece en la red
privada global de AWS** y **no se expone a internet público**. El **peering inter-Region de Transit Gateway
cifra todo el tráfico**. **Sin punto único de falla ni cuello de botella de ancho de banda**, te protege contra
**ataques de denegación de servicio distribuido (DDoS)** y otras **explotaciones comunes**.

### 5.5 Lectura: Transit Gateway fundamentals

Un transit gateway es un **recurso regional** y **funciona entre cuentas de AWS**. Podés usar **AWS Resource
Access Manager** para **compartir tu transit gateway con otras cuentas**. Después de compartirlo con otra cuenta
de AWS, **el dueño de esa cuenta puede adjuntar sus VPC** a tu transit gateway. **Un usuario de cualquiera de las
dos cuentas puede borrar el attachment en cualquier momento**.

> [!note] Las imágenes de la fuente no están en el vault
> Diagrama *Transit Gateway attachment setup* (`assets/images/VFWY53MYJX.png`): a la izquierda, los **tipos de
> attachment** (**VPC**, **VPN**, **Direct Connect gateway** y **transit gateway peering**); a la derecha, un
> **transit gateway** con todos esos attachments conectados.

Un **attachment de transit gateway es origen y destino de paquetes**. Podés adjuntar los siguientes recursos a tu
transit gateway:

- **Una o más VPC**
- **Una o más conexiones VPN**
- **Uno o más Direct Connect gateways**
- **Una o más conexiones de peering de transit gateway**

Si adjuntás una **conexión de peering de transit gateway**, el transit gateway **debe estar en una Región
distinta**. Los transit gateways soportan **ruteo dinámico y estático** entre las **VPC y las conexiones VPN
adjuntas**. Podés **prender o apagar la propagación de rutas para cada attachment**.

---

## 6. Las tres arquitecturas, lado a lado

| | **Sin TGW** | **Transit VPC** | **Transit Gateway** |
| --- | --- | --- | --- |
| **On-premises** | 6 VPN + 6 private VIF | 2 conexiones (VPN + DX) | 2 conexiones (VPN + DX) |
| **VPC ↔ VPC** | **15 peering** | Peering hacia el hub | **1 attachment por VPC** |
| **Hub** | No hay | **EC2 con routers** | **Servicio administrado** |
| **Segmentación** | Peerings selectivos | **Listas de direcciones** | **Route tables** o **blackhole** |
| **Operación** | Muchas conexiones, mucho monitoreo | SOS del vendor, parches, licencias | **Consola central** |
| **Costo** | Por conexión | EC2 + **licencias** | Por **attachment** y tráfico |
| **Techo** | Crece el desorden | **El hardware** | **Elástico** |
| **Multi-Región** | Peering por par | VPC dispersas al hub | **TGW peering** (cifrado) |
| **Multi-cuenta** | Peering por par | Cuentas separadas al hub | **RAM** |

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Peering es 1 a 1 y no es transitivo.** n VPC en malla = **n(n−1)/2**; con 6, **15**.
> 2. **VPN y private VIF también son 1 a 1**: N VPC = **N conexiones**, y **el doble** si querés redundancia.
> 3. **Transit Gateway es administrado y escala elásticamente**; el **transit VPC** depende de **EC2 + software**.
> 4. **Attachment ≠ conectividad.** El attachment dice **quién se cuelga**; la **route table** dice **con quién
>    habla**.
> 5. **Default = todo se habla**: una sola route table conecta a todos los attachments.
> 6. **Segmentación**: varias route tables o **blackhole entries**.
> 7. **Es regional.** Cross-Region solo con **TGW peering**, que además **cifra**.
> 8. **Cross-account con RAM**; **cualquiera de las dos cuentas puede borrar** el attachment.
> 9. **Direct Connect no se adjunta directo**: va por un **Direct Connect gateway**.
> 10. **El tráfico VPC ↔ TGW no sale a internet**: queda en la **red privada global de AWS**.

> [!warning] Trampa clásica del examen
> Escenario: “conectar **20 VPC** entre sí y con on-premises, con **la menor complejidad operativa**”.
> La respuesta **no** es una **malla de peering** (serían **190** conexiones) ni un **transit VPC** (techo de
> hardware y licencias): es **Transit Gateway** con **RAM** para las cuentas y **route tables** para segmentar.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[Gathering the Customer Requirements - Networking]] — la lección anterior: los 5 requisitos que esta resuelve
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — TGW compartido con RAM
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — el hub elástico
- [[Architecting for Cost - Networking]] — costo de attachments y de transferencia
- Siguiente paso: [[AWS Transit Gateway Setup]] — cómo se adjunta la VPC y quién decide el next hop

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 02 completa: malla de peering, transit VPC, Transit Gateway y fundamentos | Nota completa (secciones 1–7) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Cuatro imágenes no están en el vault**: `BDEDAVDF9J.png`, `Q7PG96D5XD.png`, `B79AZJSAQV.png` y
   `VFWY53MYJX.png`. Se describe su contenido a partir del texto alternativo de la fuente.
2. **La transcripción dice “12 si querés redundancia”** al hablar de Direct Connect, mientras la lectura cuenta
   **6 VPN + 6 DX = 12 enlaces**. Se transcriben ambas y se aclara en §1: **12** es el total de enlaces, y la
   redundancia **multiplica**.
3. **No hay Knowledge Check**: la lección cierra con una **pregunta abierta** (“¿cómo simplificamos…?”).
4. **“Transit gateway peering attachments”** se traduce como **peering de TGW**; se conserva el término en inglés
   en la transcripción.
5. **La fuente no da cuotas** (attachments por TGW, rutas por route table). No se agregan.

**Decisiones de transcripción:**

- Se conservan **transit gateway**, **transit VPC**, **attachment**, **route table**, **blackhole entries**,
  **private virtual interface (VIF)**, **Direct Connect gateway**, **RAM** y **SD-WAN**.
- Las **cifras** se transcriben literales: **6 VPC**, **15 peerings**, **12 enlaces**, **24 conexiones** del
  diagrama de transit VPC.
- **No se agregaron** precios, latencias ni límites que la fuente no da.
