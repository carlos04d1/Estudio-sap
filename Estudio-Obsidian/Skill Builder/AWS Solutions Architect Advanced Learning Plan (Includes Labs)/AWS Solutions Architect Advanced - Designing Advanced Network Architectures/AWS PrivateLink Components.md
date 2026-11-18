---
title: "AWS PrivateLink Components"
aliases:
  - "AWS PrivateLink"
  - "PrivateLink"
  - "Endpoint policy"
  - "Endpoint service"
  - "Política de endpoint"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - privatelink
  - vpc-endpoints
  - seguridad
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# AWS PrivateLink Components

> [!abstract] Qué es este archivo
> Novena lección del módulo, continuación directa de [[VPC Endpoints]]. Ahí quedó claro **qué** es un endpoint;
> acá se define **cómo se arma** el servicio detrás: **NLB**, **endpoint service**, **consumer** y la pieza que
> controla el uso: la **endpoint policy**.
>
> Además, los dos datos operativos que el examen usa como distractores: la **unidireccionalidad** y el límite de
> **55.000 conexiones**.
>
> Video: **2 min 06 s**.

> [!quote] La idea que ordena todo
> **La conexión va en un solo sentido, y el consumidor es el que llama.** El proveedor **nunca** inicia
> conexiones hacia la VPC del consumidor; eso es lo que hace que PrivateLink sea más seguro que un peering.

---

## Resumen en una frase

> **PrivateLink** conecta un **service consumer** con un **service provider** a través de un **interface
> endpoint** y un **NLB**, en **un solo sentido**, con **endpoint policies** para decidir **qué se puede hacer**
> y sin que el tráfico toque internet.

---

## 1. La arquitectura: dos lados, dos roles

**El escenario del módulo:** una **utilidad de catálogo** propia —el servicio compartido— que otras VPC tienen
que consumir.

| Lado | Nombre | Qué tiene |
| --- | --- | --- |
| **Proveedor** | **Service provider** | La **SaaS VPC** que **hostea el catálogo**; el servicio se publica detrás de un **Network Load Balancer (NLB)** |
| **Consumidor** | **Service consumer** | La VPC que quiere usar el catálogo: tiene un **interface endpoint** y **accede por la ENI** |

**Cantidad de consumidores:** en el ejemplo hay **uno solo** para simplificar; en producción **pueden ser
muchos**.

> [!note] Precisión sobre el NLB (no está explícita en la fuente)
> El video dice “hosting the catalog service **with an NLB as the endpoint**”. El NLB **no es el endpoint**: es
> el **balanceador que se registra en el endpoint service** y que recibe el tráfico que entra por el endpoint.
> El endpoint es la **ENI** del lado del consumidor.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de PrivateLink (`assets/images/Y664VQGYGQ.png`): a la izquierda, dentro de una VPC, una **subred con
> varias instancias EC2**, una **ENI** y un **VPC endpoint**; a la derecha, un **entorno SaaS** con un **Network
> Load Balancer** y su propio conjunto de **instancias EC2**.

---

## 2. Unidireccional

**La regla, textual:** PrivateLink garantiza que las conexiones iniciadas hacia un conjunto específico de
recursos de red sean **unidireccionales** — la conexión **solo puede originarse en la VPC del consumidor** y
**fluir hacia la VPC del proveedor**, **nunca al revés**.

**Cómo se ve en el diagrama del video:** **todas las flechas van del VPC endpoint al shared service**, ninguna
vuelve.

| Pregunta | Respuesta |
| --- | --- |
| ¿El consumidor puede llamar al servicio? | **Sí** |
| ¿El servicio puede iniciar conexiones al consumidor? | **No** |
| ¿Se puede “devolver” la llamada a otro puerto del consumidor? | **No**: no hay camino de vuelta |

> [!important] Por qué esto es una ventaja y no una limitación
> Un peering o un TGW **habilitan las dos direcciones**: si el consumidor puede llegar al proveedor, el
> proveedor puede llegar al consumidor. PrivateLink **rompe esa simetría**, y por eso sirve para exponer un
> servicio **sin exponer la red**.

---

## 3. Endpoint policies: qué se puede hacer, no solo quién

**Definición:** una **endpoint policy** es una **política de recurso de IAM** que se **adjunta a un endpoint**
—al crearlo o al modificarlo— y **controla el acceso al servicio** al que te conectás.

**Qué se puede controlar:** **quién** accede al endpoint **y cómo se usa**. Ejemplo de la fuente: que por el
catálogo compartido pasen **solo comandos de lectura y no de escritura**.

| Regla | Detalle |
| --- | --- |
| **Formato** | **JSON** |
| **Qué es** | **IAM resource policy** adjunta al endpoint |
| **Si no adjuntás ninguna** | AWS adjunta una **default policy** que **permite acceso total** al servicio |
| **Si el servicio no soporta endpoint policies** | El endpoint **permite acceso total** |
| **¿Reemplaza las políticas de IAM?** | **No**: no reemplaza ni anula las **políticas de usuario de IAM** |
| **¿Reemplaza políticas del servicio?** | **No**: por ejemplo, **S3 bucket policies** siguen aplicando |
| **¿Qué es entonces?** | Una **política separada** que controla el acceso **desde el endpoint hacia el servicio** |

**Caso S3:** si el endpoint es hacia **Amazon S3**, además de la endpoint policy se pueden usar **bucket
policies** para controlar el acceso a los buckets **desde endpoints o VPC específicos**.

> [!warning] La trampa de la política única
> Una endpoint policy **no es** el único control y **no** reemplaza a los demás. Si el bucket policy permite
> algo, la endpoint policy no lo “arregla” por sí sola: **se suman**.

> [!note] La imagen de la fuente no está en el vault
> Dos diagramas con la misma idea (`assets/images/J876SWMGTM.png` y `assets/images/C5J2SXGVZP.png`): el tráfico
> del **VPC endpoint** se valida contra la **endpoint policy** antes de llegar al **NLB**; del otro lado, la
> **cuenta del proveedor** con su VPC, el **load balancer** y sus instancias, y la **endpoint policy asociada al
> endpoint de PrivateLink**.

---

## 4. Servicios soportados y cómo se accede

**Quién puede usar PrivateLink:** **service users** acceden **privadamente** a servicios impulsados por
PrivateLink **desde su VPC o desde on-premises**, **sin IPs públicas** y **sin que el tráfico atraviese
internet**.

**Quién puede publicar:** **service owners** **registran sus Network Load Balancers** como servicios de
PrivateLink y **ofrecen el servicio a otros clientes de AWS**.

**Servicios de AWS que soportan la feature:**

| | |
| --- | --- |
| **Amazon EC2** | **Elastic Load Balancing** |
| **Amazon Kinesis Data Streams** | **AWS Service Catalog** |
| **AWS Systems Manager** | **Amazon Simple Notification Service (Amazon SNS)** |
| **AWS DataSync** | |

**SaaS:** **muchas soluciones SaaS** también soportan la feature; los productos están en **AWS Marketplace**.

**Cómo se llega:** los consumidores pueden usar los **endpoint-specific DNS hostnames** o el **private DNS
name** para acceder al endpoint service.

> [!note] Ampliación (no está en la fuente)
> Que el acceso funcione **desde on-premises** es la diferencia práctica con el **gateway endpoint**, que no se
> puede usar desde afuera de la VPC. Es el mismo criterio que en [[VPC Endpoints]], aplicado al otro tipo.

---

## 5. Límites y operación

**El número que hay que recordar:** para el endpoint service, el **Network Load Balancer asociado** soporta
**55.000 conexiones simultáneas** —o **unas 55.000 conexiones por minuto**— **a cada target único** (dirección
IP y puerto).

**Si se supera:** **aumenta la chance de errores de asignación de puertos**. **Cómo se corrige:** **agregar más
targets al target group**.

| Regla | Detalle |
| --- | --- |
| **Varios NLB en un endpoint service** | Para una **AZ específica**, el **interface endpoint se conecta con un solo load balancer** |
| **DNS** | **Endpoint-specific DNS hostnames** o **private DNS name** |
| **AZ entre cuentas** | Los **nombres de AZ no coinciden** necesariamente entre cuentas: `us-east-1a` puede ser otra ubicación física. Se coordina con **AZ ID** |
| **Cuotas** | Revisar las **service-specific quotas** del endpoint service |
| **Seguridad** | Revisar las **security best practices** y ejemplos para endpoint services |

> [!warning] Lo que se arregla agregando targets
> El error de **port allocation** no se resuelve cambiando la política ni el DNS: se resuelve **sumando
> targets**. Es la respuesta que el examen espera cuando aparece el límite de **55.000**.

> [!note] Ampliación (no está en la fuente)
> La regla de “un solo NLB por AZ” es lo que hace que el diseño multi-AZ sea **explícito**: no se reparte el
> tráfico entre varios balanceadores dentro de la misma AZ; se elige **uno por AZ**, y la alta disponibilidad
> viene de tener el endpoint en **varias AZ**.

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual del video, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 6.1 Video: Introduction to AWS PrivateLink (transcripción)

Acá hay un **overview de alto nivel de cómo va a verse nuestra solución usando PrivateLink**, y hay **un par de
cosas para destacar**. Primero, notá que **estas flechas del VPC endpoint al shared service son todas flechas de
un solo sentido**. Así que **este setup permite que recursos y otras VPC armen VPC endpoints y consuman el
servicio compartido, pero lo inverso no es cierto**. **El servicio compartido no puede iniciar conexiones de
vuelta hacia otras VPC**, y eso **encaja perfecto con nuestros requisitos**.

Además, **podés adjuntar endpoint policies a los VPC endpoints**. Una **endpoint policy es una política de
recurso de IAM** que podés usar para **controlar quién puede acceder al endpoint o cómo se usa**. Por ejemplo,
quizás querés **controlar qué tipo de comandos se pueden mandar a través del VPC endpoint**. Quizás **solo
querés comandos de lectura y no de escritura** hacia tu servicio de catálogo compartido. Podés **configurar una
endpoint policy para administrar eso**.

**Así se ve la arquitectura.** La **SaaS VPC es lo que llamamos el service provider**, que **hostea el servicio
de catálogo con un NLB como endpoint**. La **VPC que quiere acceder al servicio de catálogo tiene un VPC
endpoint, específicamente un interface endpoint configurado, y se accede a través de la ENI**. A esta la
llamamos **service consumer**. **Hay solo uno en este ejemplo para mantenerlo simple, pero podría haber muchos
más en un entorno de producción real**.

**PrivateLink simplifica tu arquitectura.** **No tenés que configurar VPC peering, internet gateways, reglas de
firewall ni nada de eso**. Y, **como dice el nombre, es privado**. Así que **esta puede ser una buena forma de
migrar aplicaciones que tradicionalmente corren on-premises a ofertas SaaS en la nube, sin preocuparte por que
los datos queden expuestos en internet**.

*Duración del video: **2 minutos 06 segundos**.*

### 6.2 Lectura: componentes de AWS PrivateLink

Con **AWS PrivateLink**, podés **acceder a servicios hosteados en AWS de forma altamente disponible y
escalable**, **manteniendo todo el tráfico de red dentro de la red de Amazon**. AWS PrivateLink **asegura que
las conexiones iniciadas hacia un conjunto específico de recursos de red sean unidireccionales** — **la conexión
solo puede originarse en la VPC del service consumer y fluir hacia la VPC del service provider, y no al revés**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de AWS PrivateLink (`assets/images/J876SWMGTM.png`): **el tráfico del VPC endpoint se valida contra
> la endpoint policy antes de enviarse al NLB**; el **NLB rutea el tráfico a PrivateLink, que lo conecta con tus
> servicios**.

**Los service users pueden acceder privadamente a servicios impulsados por PrivateLink desde su VPC o
on-premises**, **sin usar IPs públicas** y **sin requerir que el tráfico atraviese internet**. **Los service
owners pueden registrar sus Network Load Balancers como servicios de PrivateLink** y **proveer los servicios a
otros clientes de AWS**. Los siguientes servicios de AWS soportan esta feature:

- **Amazon EC2**
- **Elastic Load Balancing**
- **Amazon Kinesis Data Streams**
- **AWS Service Catalog**
- **AWS Systems Manager**
- **Amazon Simple Notification Service (Amazon SNS)**
- **AWS DataSync**

Para más información sobre **endpoint services**, ver la guía *Share your services through AWS PrivateLink*.

**SaaS.** **Muchas soluciones SaaS también soportan esta feature.** Para más información sobre productos SaaS
impulsados por PrivateLink, visitá **AWS Marketplace**.

### 6.3 Lectura: features de PrivateLink y endpoint services

**Conectá tus VPC con servicios en AWS de forma segura y escalable con PrivateLink.** **El tráfico de red que
usa PrivateLink no atraviesa internet público**, **reduciendo la exposición a vectores de amenaza como ataques
de fuerza bruta y DDoS**. Podés usar **conectividad por IP privada y security groups** para que **tus servicios
funcionen como si estuvieran hosteados directamente en tu red privada**. También podés **adjuntar una endpoint
policy** para **controlar con precisión quién tiene acceso a un servicio específico**.

Podés **conectar servicios entre cuentas y VPC distintas sin necesidad de reglas de firewall, definiciones de
path ni route tables**. **No necesitás configurar un internet gateway ni una VPC peering connection, ni
administrar bloques CIDR de VPC.** PrivateLink **simplifica tu arquitectura de red** y **te ayuda a administrar
tu red global**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de **AWS PrivateLink y endpoint services con features numeradas**
> (`assets/images/Y664VQGYGQ.png`), descrito en §1.

**PrivateLink puede ayudar a migrar aplicaciones on-premises tradicionales a ofertas SaaS hosteadas en la
nube.** Como **tus datos no quedan expuestos a internet**, donde pueden ser comprometidos, podés **migrar y usar
más servicios en la nube con la confianza de que tu tráfico sigue siendo seguro**. **Ya no tenés que elegir
entre usar un servicio y exponer tus datos críticos a internet.**

**AWS tiene el AWS SaaS Factory Insights Hub**, una **biblioteca en crecimiento de contenido de negocio y
técnico** para ayudar a los **AWS Partners** a **obtener insights, tomar decisiones informadas y potenciarse en
cualquier etapa del journey SaaS en AWS**. En el hub podés **buscar y navegar los recursos disponibles por rol,
nivel de conocimiento, categoría de contenido, tipo de contenido o palabras clave**. También podés **ver todo el
contenido nuevo y destacado** para seguir las últimas novedades del equipo de **AWS SaaS Factory**. Vas a
encontrar **recursos que cubren aspectos de negocio y técnicos de un modelo de entrega SaaS**, como **SaaS 101,
estrategia de producto SaaS, go-to-market (GTM), packaging y pricing, estrategias de migración, billing y
metering, aislamiento de tenants y particionamiento de datos**.

**AWS Compliance Programs.** Para más información sobre **los últimos controles disponibles** para ayudarte a
**mantenerte compliant**, ver **Compliance Programs**.

### 6.4 Lectura: endpoint policies

Cuando **creás un endpoint**, podés **adjuntarle una endpoint policy**, que **controla el acceso al servicio al
que te estás conectando**. Las **endpoint policies deben escribirse en formato JSON**. **No todos los servicios
soportan endpoint policies.** Si usás un endpoint hacia **Amazon S3**, también podés usar **S3 bucket policies**
para **controlar el acceso a los buckets desde endpoints o VPC específicos**.

Una **VPC endpoint policy** es una **política de recurso de IAM que adjuntás a un endpoint cuando creás o
modificás el endpoint**. **Si no adjuntás una política cuando creás un endpoint, AWS te adjunta una política
default**, que **permite acceso total al servicio**. **Si un servicio no soporta endpoint policies, el endpoint
permite acceso total al servicio.** Una **endpoint policy no anula ni reemplaza las políticas de usuario de IAM
ni las políticas específicas del servicio**, como las **S3 bucket policies**. Una endpoint policy es una
**política separada** para **controlar el acceso desde el endpoint hacia el servicio especificado**.

> [!note] La imagen de la fuente no está en el vault
> Diagrama de un endpoint con endpoint policy adjunta (`assets/images/C5J2SXGVZP.png`): a la izquierda, una
> **cuenta de consumidor** con una VPC, una **instancia EC2** y un **endpoint de PrivateLink**; a la derecha,
> una **cuenta de proveedor** con su VPC, un **load balancer** y varias **instancias EC2**; la **endpoint policy**
> está **asociada al endpoint de PrivateLink**.

### 6.5 Lectura: notas de PrivateLink

Si estás planeando usar **endpoint services**, estas son **algunas reglas y limitaciones clave** a tener en
cuenta:

- **Los service consumers pueden usar los endpoint-specific DNS hostnames o el private DNS name** para acceder
  al endpoint service.
- **Si un endpoint service está asociado con múltiples Network Load Balancers**, entonces, **para una
  Availability Zone específica, un interface endpoint establece conexión con un solo load balancer**.
- **Para el endpoint service, el Network Load Balancer asociado puede soportar 55.000 conexiones simultáneas** o
  **alrededor de 55.000 conexiones por minuto hacia cada target único** (dirección IP y puerto). **Si superás
  esas conexiones, aumenta la chance de errores de asignación de puertos.** Para **arreglar los errores de
  asignación de puertos, agregá más targets al target group**.
- **Las Availability Zones de tu cuenta podrían no mapear a las mismas ubicaciones que las Availability Zones de
  otra cuenta.** Por ejemplo, **tu Availability Zone `us-east-1a` podría no ser la misma ubicación que
  `us-east-1a` de otra cuenta**.
- **Revisá las service-specific quotas de tu endpoint service.**
- **Revisá las security best practices y los ejemplos para endpoint services.**

---

## 7. PrivateLink frente a las otras formas de conectar

| Necesidad | Solución | Por qué |
| --- | --- | --- |
| Consumir **un servicio** de otra VPC | **PrivateLink** | Expone el servicio, **no la red** |
| Que el proveedor **no pueda iniciar** conexiones | **PrivateLink** | Conexión **unidireccional** |
| Controlar **qué comandos pasan** por el endpoint | **Endpoint policy** | IAM resource policy en **JSON** |
| Conectar **redes enteras**, en las dos direcciones | **Peering / TGW** | Ruteo bidireccional |
| Evitar **IGW, peering, firewall rules, route tables y CIDR** | **PrivateLink** | La conexión es al servicio |
| Publicar mi servicio a **otras cuentas** | **Endpoint service + NLB** | El owner registra el **NLB** |
| Resolver **errores de puertos** con mucho tráfico | **Más targets** | El límite es por **target** |

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **PrivateLink es unidireccional**: solo del **consumer** al **provider**, nunca al revés.
> 2. **Provider** = VPC con el servicio detrás de un **NLB registrado** como **endpoint service**.
> 3. **Consumer** = VPC con un **interface endpoint**; el acceso pasa por la **ENI**.
> 4. **Sin IP pública y sin internet**: el tráfico queda en la **red de Amazon**; se reducen **brute force** y
>    **DDoS**.
> 5. **Sin IGW, sin peering, sin firewall rules, sin route tables y sin administrar CIDR**.
> 6. **Endpoint policy** = **IAM resource policy en JSON**; controla **quién** y **cómo** se usa el endpoint.
> 7. **Si no adjuntás policy**, hay una **default de acceso total**; si el servicio **no soporta** policies,
>    también hay **acceso total**.
> 8. La endpoint policy **no reemplaza** las políticas de **IAM** ni las **S3 bucket policies**: **se suman**.
> 9. **55.000 conexiones simultáneas** —o **~55.000 por minuto por target único** (IP + puerto)—; si hay
>    **port allocation errors**, se **agregan targets**.
> 10. Con **varios NLB**, en cada **AZ** el interface endpoint se conecta con **uno solo**.

> [!warning] Trampa clásica del examen
> Escenario: “el servicio compartido necesita **llamar de vuelta** a la VPC del consumidor”. La respuesta es
> **no con PrivateLink**: la conexión es **unidireccional**. Y si el enunciado dice que “la endpoint policy
> permite el acceso, entonces el bucket es accesible”, falta la otra mitad: la **bucket policy** y las
> **políticas de IAM** siguen aplicando.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[VPC Endpoints]] — la lección previa: interface vs. gateway
- [[Use Cases - Transit Gateway]] — el patrón de **shared services**, resuelto sin TGW
- [[AWS Resource Access Manager (RAM) Solutions]] — compartir recursos vs. exponer servicios
- [[IP Address Management and IPv6 Adoption]] — por qué **no administrar CIDR** es una ventaja
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- Siguiente paso del módulo: [[Finished Architecture - Networking]] — la arquitectura que junta todo

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 09 completa: PrivateLink, endpoint policies, límites y notas operativas | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Tres imágenes no están en el vault**: `Y664VQGYGQ.png`, `J876SWMGTM.png` y `C5J2SXGVZP.png`. Se describen
   desde el texto alternativo, en el lugar donde irían.
2. **El video dice “hosting the catalog service with an NLB as the endpoint”**: el NLB **no es** el endpoint,
   sino el balanceador **registrado en el endpoint service**. Se transcribe literal y se aclara en §1.
3. **El texto alternativo de `J876SWMGTM.png` invierte el orden** (“el NLB rutea el tráfico a PrivateLink, que lo
   conecta con tus servicios”). Se transcribe como está y se explica el orden real en §3.
4. **“Sas VPC” / “SAS”** aparecen con esa grafía en la fuente; el contexto es **SaaS**. Se conserva el sentido.
5. **No hay Knowledge Check**: la lección cierra con las notas de PrivateLink.
6. **La fuente no da precios** de PrivateLink ni de los NLB. No se agregaron.
7. **La lista de servicios que soportan la feature** es la que da la lectura; no se amplió con otros servicios.

**Decisiones de transcripción:**

- Se conservan **PrivateLink**, **endpoint service**, **service provider**, **service consumer**, **endpoint
  policy**, **NLB**, **ENI**, **private DNS name** y **target group**.
- Las **cifras** se transcriben literales: **2 min 06 s**, **55.000 conexiones simultáneas**, **~55.000 por
  minuto por target único**, **`us-east-1a`**.
- La **unidireccionalidad** se transcribe en los dos lugares donde aparece —video y lectura— porque es la regla
  que más se evalúa.
