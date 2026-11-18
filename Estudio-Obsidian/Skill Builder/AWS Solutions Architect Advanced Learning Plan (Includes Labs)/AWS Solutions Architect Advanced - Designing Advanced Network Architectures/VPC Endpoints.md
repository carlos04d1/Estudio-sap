---
title: "VPC Endpoints"
aliases:
  - "VPC Endpoint"
  - "Interface endpoint"
  - "Gateway endpoint"
  - "Endpoint service"
  - "PrivateLink"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - privatelink
  - vpc-endpoints
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# VPC Endpoints

> [!abstract] Qué es este archivo
> Octava lección del módulo. Hasta acá conectábamos **redes enteras** —peering, Transit Gateway—. Esta lección
> conecta **un servicio**, y nada más.
>
> El caso: una **utilidad de catálogo** propia que otras VPC tienen que consumir **sin peering**. La respuesta es
> un **VPC endpoint** apoyado en **AWS PrivateLink**.
>
> Video: **2 min 49 s**.

> [!quote] La idea que ordena todo
> **No hace falta unir dos redes para compartir un servicio.** El endpoint lleva el tráfico al servicio **sin
> salir de la red de Amazon**, sin internet gateway, sin NAT, sin VPN y sin publicar una IP pública.

---

## Resumen en una frase

> Un **VPC endpoint** es un **punto de entrada privado** a un servicio: **interface endpoint** (una **ENI** con IP
> privada, vía **PrivateLink**) para casi todo, y **gateway endpoint** (target de **route table**) solo para
> **S3 y DynamoDB**.

---

## 1. El problema: conectar sin conectar VPC

**Lo que ya sabemos hacer:** unir VPC con **VPC peering** o con **Transit Gateway**.

**El caso que no encaja:** tenés una **aplicación interna tipo SaaS** —por ejemplo, una **utilidad de catálogo
central** de tus productos— y querés que aplicaciones de **otras VPC** la consuman **sin hacer peering de VPC**.

| Enfoque | Qué conecta | Cuándo |
| --- | --- | --- |
| **VPC peering** | Dos **VPC completas** | Necesitás que las redes se hablen |
| **Transit Gateway** | Muchas VPC, **hub-and-spoke** | Necesitás topología y ruteo central |
| **VPC endpoint** | **Un servicio**, desde tu VPC | El caso es **más específico**: consumir algo puntual |

**Cómo viaja el tráfico sin endpoint:** sale por el **internet gateway**, cruza **internet** y llega al
**endpoint público** del servicio.

**Cómo viaja con endpoint:** va a un **endpoint privado** del servicio y **todo el tráfico queda fuera de
internet**, dentro de la **red de AWS**. Eso mejora **performance** y **seguridad** al mismo tiempo.

> [!important] Por qué esto no es “un atajo de red”
> El endpoint no reemplaza al peering: **elimina la necesidad de exponer el servicio**. El consumidor no recibe
> acceso a tu VPC; recibe acceso **al servicio**.

---

## 2. Qué es un VPC endpoint

**Definición de la fuente:** habilita **conexiones privadas** entre tu VPC y los **servicios de AWS soportados**
y los **endpoint services** impulsados por **AWS PrivateLink**, **sin requerir internet gateway, NAT device,
VPN connection ni Direct Connect connection**.

| Propiedad | Detalle |
| --- | --- |
| **IP pública** | **No hace falta**: las instancias de la VPC **no necesitan IP pública** para llegar al servicio |
| **Camino del tráfico** | **No sale de la red de Amazon** |
| **Naturaleza** | Son **dispositivos virtuales** |
| **Escalado** | **Horizontally scaled**, **redundantes** y de **alta disponibilidad** |
| **Riesgo de disponibilidad** | **No imponen** riesgos de disponibilidad **ni límites de ancho de banda** al tráfico |
| **Tipos** | **Interface endpoints** y **gateway endpoints**; se crea el que **el servicio soportado** requiera |

> [!note] Ampliación (no está en la fuente)
> “No impone límites de ancho de banda” **no** significa “sin costo”: significa que el endpoint **no es un
> cuello de botella** de capacidad. El costo es otra conversación y depende del **tipo** de endpoint.

---

## 3. Interface endpoints

**Qué es:** una **elastic network interface** con una **IP privada** —tomada del **rango de la subred**— que
sirve como **punto de entrada** para el tráfico destinado a un servicio soportado.

- Creada **en la VPC del consumidor** del servicio.
- **AWS PrivateLink** es el que impulsa los interface endpoints.
- Es el tipo que resuelve el caso de **hostear tu propio servicio compartido**.

**Cómo se lee en el diagrama de la fuente:** el consumidor tiene una **subred privada** con una **instancia
EC2**; el **endpoint** vive dentro de esa subred privada y desde ahí llega al **servicio de AWS**. Al lado, la
**subred pública** con su **internet gateway** sigue existiendo, pero **no se usa para ese tráfico**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de uso de VPC endpoints (`assets/images/YESBYPUU5J.png`): a la izquierda una VPC con **subred
> pública + internet gateway** hacia internet y una **subred privada** con una **instancia EC2**; esa instancia
> llega a un **servicio de AWS** a través de un **VPC endpoint** ubicado en la subred privada.

---

## 4. Gateway endpoints

**Qué es:** un **gateway** que se especifica como **target de una ruta** en la **route table**, para el tráfico
destinado a un servicio de AWS soportado.

| | **Gateway endpoint** |
| --- | --- |
| **Cómo se enruta** | **Route table** → gateway → red de AWS |
| **ENI** | **No despliega ninguna** |
| **PrivateLink** | **No lo usa** |
| **Servicios soportados** | **Amazon S3** y **Amazon DynamoDB** |
| **Desde on-premises** | **No se puede usar** |
| **Costo** | **No es facturable** |

**Cómo lo dice el video:** sirven para **pocos servicios**, tienen **otras restricciones** —no se puede usar
desde on-premises— pero **conviene conocerlos porque no se cobran**. Si querés llegar a **S3 o DynamoDB**,
**ahorrás plata** yendo por gateway endpoint.

> [!warning] “Solo S3 y DynamoDB” es literal
> No es una lista de ejemplos: la fuente enumera **esos dos** servicios. Si el escenario pide un endpoint
> gateway para cualquier otra cosa, la respuesta es **interface endpoint**.

---

## 5. Las dos partes de PrivateLink: provider y consumer

**PrivateLink da una conexión escalable a tu aplicación dentro de tu VPC.**

| Paso | Quién | Qué hace |
| --- | --- | --- |
| 1 | **Service provider** | Crea **su aplicación en su VPC** y la configura como **servicio impulsado por PrivateLink**: un **endpoint service** |
| 2 | **Service consumer** | Otros **principals de AWS** crean una **conexión desde sus VPC** a ese endpoint service, **usando un interface VPC endpoint** |

**Los dos roles, explícitos:** vos sos el **service provider**; los principals que se conectan son los **service
consumers**.

> [!note] Ampliación (no está en la fuente)
> El modelo es el mismo que en **RAM**: el **dueño** publica, el **otro** se conecta. La diferencia es qué se
> comparte: RAM comparte **el recurso**; PrivateLink expone **el servicio**, sin dar acceso a la VPC que lo
> contiene.

> [!note] La imagen de la fuente no está en el vault
> Diagrama del **endpoint service** de AWS PrivateLink (`assets/images/EGDPCXX2HZ.png`): el provider publica su
> servicio y el consumer se conecta con un **interface VPC endpoint**.

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual del video, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 6.1 Video: VPC Endpoints (transcripción)

Hablemos de **compartir recursos específicos entre VPC**. Podés **conectar VPC usando VPC peering o transit
gateway**. Pero quizás **tu caso de uso es más específico** que eso, y **conectar VPC no es lo que tenías en
mente**. Digamos que **tenías una aplicación interna tipo SaaS** que desplegaste, por ejemplo, **una utilidad de
catálogo central para tus productos**. Querés un **setup donde las aplicaciones que corren en otras VPC puedan
conectarse a esta utilidad de catálogo y usar sus servicios sin hacer peering de VPC**. Los **VPC endpoints**,
impulsados por **PrivateLink**, pueden ayudar con eso.

**En vez de conectar VPC, podés usar un VPC endpoint para llegar a servicios fuera de tu VPC**, y hay **varias
ventajas** en esta configuración. Por ejemplo, **cuando nos conectamos a un servicio de AWS u otro recurso
externo, el tráfico normalmente va por el internet gateway hacia internet y de ahí al endpoint público de ese
servicio**. Si desplegás un **VPC endpoint**, podés **hacer la conexión a un endpoint privado del servicio**,
**manteniendo todo tu tráfico fuera de internet público y dentro de la red de AWS**, lo cual **es bueno para
performance y seguridad**.

Hay **muchos servicios de AWS que soportan VPC endpoints**, además de **productos de terceros que podés
conseguir en AWS Marketplace**. O podés **hostear un servicio compartido propio**, que es **el ejemplo que
estamos tratando de resolver acá**.

Hay **distintos tipos de VPC endpoints**. **El que nos interesa para nuestro caso de uso es un interface
endpoint**. Un **interface endpoint crea una interface, una ENI, en la VPC del consumidor del servicio**. En
otras palabras, **de quien quiere llegar y usar el servicio compartido**. Los **interface endpoints usan
PrivateLink para conectarse a través de la red de AWS**.

Y **para que sepas, hay otro tipo de VPC endpoint: un gateway endpoint, que no usa PrivateLink**. Cuando usás un
**gateway endpoint para llegar a un servicio**, **routeás el tráfico al gateway usando la route table**, y de
ahí **va a través de la red de AWS**, y **no se despliega ninguna ENI**. Los **gateway endpoints solo soportan
unos pocos servicios de AWS, como S3 y DynamoDB**, y **tienen otras restricciones**. Por ejemplo, **no podés usar
un gateway endpoint desde on-premises**, pero **conviene conocerlos porque no son facturables**. Así que si
**querías llegar a S3 o DynamoDB**, podrías **ahorrar algo de plata yendo por un gateway endpoint**. Para
**nuestro caso de uso, hostear un servicio compartido, un interface endpoint es lo que querés**.

*Duración del video: **2 minutos 49 segundos**.*

### 6.2 Lectura: soluciones con VPC endpoints

Un **VPC endpoint** habilita **conexiones privadas** entre tu VPC y **servicios de AWS soportados**, y
**servicios de VPC endpoint impulsados por AWS PrivateLink**, **sin requerir internet gateway, dispositivo NAT,
conexión VPN ni conexión Direct Connect**. **Las instancias de tu VPC no necesitan direcciones IP públicas** para
**comunicarse con recursos del servicio**. **El tráfico entre tu VPC y el otro servicio no deja la red de
Amazon**.

Los **endpoints son dispositivos virtuales**. Son **componentes de VPC escalados horizontalmente, redundantes y
de alta disponibilidad**. Los endpoints **permiten la comunicación entre instancias de tu VPC y servicios sin
imponer riesgos de disponibilidad ni restricciones de ancho de banda** a tu tráfico de red. Hay **dos tipos de
VPC endpoints**: **interface endpoints** y **gateway endpoints**. **Creá el tipo de VPC endpoint que requiera el
servicio soportado**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de uso de VPC endpoints (`assets/images/YESBYPUU5J.png`), descrito en §3.

**Interface Endpoints.** Un **interface endpoint** es una **elastic network interface con una dirección IP
privada** (del **rango de direcciones IP de tu subred**) que **sirve como punto de entrada** para el tráfico
destinado a un **servicio soportado**. **PrivateLink impulsa los interface endpoints**.

**Gateway Endpoints.** Un **gateway endpoint** es un **gateway que especificás como target de una ruta** en tu
**route table** para el tráfico destinado a un **servicio de AWS soportado**. Los siguientes servicios de AWS
están soportados:

- **Amazon Simple Storage Service (Amazon S3)**
- **Amazon DynamoDB**

### 6.3 Lectura: componentes de VPC endpoint

**PrivateLink provee una conexión escalable a tu aplicación dentro de tu VPC:**

- **Creá tu propia aplicación en tu VPC** y **configurala como un servicio impulsado por PrivateLink**, al que se
  hace referencia como **endpoint service**.
- **Otros principals de AWS pueden crear una conexión desde sus VPC a tu endpoint service usando un interface
  VPC endpoint.**
- **Vos sos el service provider**, y los **principals de AWS que crean conexiones a tu servicio son los service
  consumers**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama del **endpoint service** de AWS PrivateLink (`assets/images/EGDPCXX2HZ.png`), descrito en §5.

---

## 7. Cuál usar

| Necesidad | Tipo | Por qué |
| --- | --- | --- |
| Llegar a **S3** o **DynamoDB** desde una VPC | **Gateway endpoint** | Target de route table, **sin ENI** y **sin costo** |
| Llegar a **S3** desde **on-premises** | **Interface endpoint** | El gateway **no se puede usar desde on-premises** |
| Exponer **tu propio servicio** a otras VPC | **Interface endpoint + endpoint service** | PrivateLink, con roles de **provider/consumer** |
| Consumir un servicio de **AWS Marketplace** | **Interface endpoint** | PrivateLink lo soporta |
| Evitar que el tráfico salga a internet | **Cualquiera de los dos** | El tráfico queda en la **red de Amazon** |
| No pagar por el endpoint | **Gateway endpoint** | **No es facturable** (solo S3 y DynamoDB) |
| No administrar IPs ni ENIs | **Gateway endpoint** | **No despliega ENI** |

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **VPC endpoint** = conexión **privada** a un servicio, **sin IGW, NAT, VPN ni Direct Connect**.
> 2. **No requiere IP pública** y el tráfico **no deja la red de Amazon**.
> 3. Son **dispositivos virtuales**: **horizontales, redundantes y de alta disponibilidad**; **sin límites de
>    ancho de banda**.
> 4. **Interface endpoint** = **ENI con IP privada** de la subred, en la **VPC del consumidor**, impulsada por
>    **PrivateLink**.
> 5. **Gateway endpoint** = **target de route table**, **sin ENI**, **sin PrivateLink**.
> 6. **Gateway endpoint** soporta **solo S3 y DynamoDB**.
> 7. **Gateway endpoint no se puede usar desde on-premises**; **no es facturable**.
> 8. **PrivateLink**: el **provider** publica un **endpoint service**; el **consumer** se conecta con un
>    **interface endpoint**.
> 9. **El tipo lo dicta el servicio**, no la preferencia: se crea el que el servicio soportado requiera.
> 10. **El endpoint no conecta redes**: conecta **un servicio**. Para hablar entre VPC sigue siendo peering o
>     TGW.

> [!warning] Trampa clásica del examen
> Escenario: “necesitamos acceder a **S3 desde on-premises** por un **gateway endpoint** para ahorrar”. La
> respuesta es **no**: el gateway endpoint **no se puede usar desde on-premises**. Hay que ir por **interface
> endpoint**. Y al revés: si el servicio es **S3 o DynamoDB** y el origen está **en la VPC**, el gateway es la
> opción **sin costo**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[VPC Connectivity]] — peering y Transit Gateway: cuando sí hay que unir redes
- [[Use Cases - Transit Gateway]] — el patrón de **shared services** que el endpoint resuelve sin TGW
- [[AWS Resource Access Manager (RAM) Solutions]] — compartir recursos vs. exponer servicios
- [[IP Address Management and IPv6 Adoption]] — el CIDR deja de importar cuando no hay que unir redes
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- Siguiente paso del módulo: [[AWS PrivateLink Components]] — el servicio detrás del endpoint

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 08 completa: VPC endpoints (interface/gateway) y componentes de PrivateLink | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Dos imágenes no están en el vault**: `YESBYPUU5J.png` (uso de VPC endpoints) y `EGDPCXX2HZ.png`
   (endpoint service). Se describen desde el texto alternativo, en el lugar donde irían.
2. **La fuente dice “SAS application”** en la transcripción del video, donde el contexto indica **SaaS**. Se
   registra la ambigüedad; en la traducción se conserva el sentido del contexto.
3. **“Dynamo DB”** aparece separado en el video y **“DynamoDB”** en la lectura. Se conserva cada forma en su
   bloque.
4. **Las pestañas** (Interface / Gateway) se transcriben como **secciones**, sin perder el contenido de ninguna.
5. **No hay Knowledge Check**: la lección cierra con la lectura de componentes.
6. **La fuente dice que el gateway endpoint “no es facturable”, pero no dice cuánto cuesta un interface
   endpoint.** No se agregaron precios; el contraste queda solo donde la fuente lo afirma.
7. **No se mencionan** endpoint policies, private DNS ni selección de subredes por AZ. No se agregaron.

**Decisiones de transcripción:**

- Se conservan **VPC endpoint**, **interface endpoint**, **gateway endpoint**, **endpoint service**,
  **service provider**, **service consumer**, **PrivateLink** y **ENI**.
- Las **cifras** se transcriben literales: **2 min 49 s** y los **dos** servicios del gateway endpoint.
- El **caso del catálogo** se traduce completo porque es el hilo conductor: es el ejemplo de **servicio
  compartido propio** que el módulo usa para distinguir interface de gateway.
