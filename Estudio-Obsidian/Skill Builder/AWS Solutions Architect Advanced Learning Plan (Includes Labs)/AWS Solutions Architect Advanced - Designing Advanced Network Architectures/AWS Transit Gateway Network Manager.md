---
title: "AWS Transit Gateway Network Manager"
aliases:
  - "Transit Gateway Network Manager"
  - "Network Manager"
  - "Global network"
  - "VPC Reachability Analyzer"
  - "Reachability Analyzer"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - monitoreo
  - transit-gateway
  - reachability-analyzer
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# AWS Transit Gateway Network Manager

> [!abstract] Qué es este archivo
> Sexta lección del módulo. Hasta acá construimos red; esta la **mira**. Dos herramientas que suelen ir juntas:
>
> - **Transit Gateway Network Manager**: un **global network** que representa tu red —AWS y on-premises— y la
>   muestra en un tablero.
> - **VPC Reachability Analyzer**: dado un **origen** y un **destino**, dice **si el flujo es posible** y, si no,
>   **qué componente lo bloquea**, sin mandar un solo paquete.
>
> Demo: **7 min 24 s**, con un caso real de “A funciona y B no”.

> [!quote] La idea que ordena todo
> **Configurar y verificar son dos trabajos distintos.** Network Manager **no crea ni cambia nada**; Reachability
> Analyzer **no arregla nada**. Uno dice **dónde mirar**; el otro dice **qué está mal**.

---

## Resumen en una frase

> **Network Manager** da el mapa de la red global (TGW, VPN, DX y on-prem) y **Reachability Analyzer** responde la
> pregunta puntual —¿llega o no llega?— identificando el **componente exacto** que corta el camino.

---

## 1. Network Manager: el mapa, no la llave

**Qué hace:** administrar de forma central las redes **construidas alrededor de transit gateways**, y
**visualizar y monitorear** esa red a través de **Regiones de AWS y ubicaciones on-premises**.

**Cómo se arranca:** se crea un **global network** —la representación de tu red—. **Al principio está vacío.** Se
**registran** los TGW existentes y se **definen los recursos on-premises**.

| Característica | Detalle |
| --- | --- |
| **Alcance** | TGW de **múltiples Regiones** en un mismo global network |
| **Costo** | **Sin cargo adicional** por Network Manager; se pagan las **tarifas normales** de los recursos (por ejemplo, los TGW) |
| **Qué NO hace** | **No crea, modifica ni borra** transit gateways ni sus attachments |
| **Para cambiar algo** | Consola de **Amazon VPC** y **API de Amazon EC2** |

> [!important] La frase que se lleva el examen
> Network Manager es **observabilidad**, no **configuración**. Si la pregunta pide **cambiar** una ruta o
> **adjuntar** una VPC, la respuesta nunca es Network Manager.

---

## 2. Qué entra en el global network

Se **registran transit gateways que estén en la misma cuenta de AWS** que el global network.

Al registrar un TGW, **sus attachments se incluyen automáticamente**:

- **VPC**
- Conexiones **Site-to-Site VPN**
- **Direct Connect gateways**
- **Transit gateway peering connections**

**El caso del peering, que es el que se pregunta:**

| Situación | Qué ves |
| --- | --- |
| El peer **no es tuyo** | Ves el **peer transit gateway** en el global network, pero **no sus attachments** |
| El peer **sí es tuyo** | Lo **registrás** en tu global network y **ahí sí** ves sus attachments |

**Baja automática:** si **borrás un transit gateway**, queda **automáticamente deregistrado** del global network.

> [!note] Ampliación (no está en la fuente)
> La lógica del peering es la de **quien posee, registra**: la visibilidad sigue la **propiedad de la cuenta**, no
> la existencia del attachment. Es el mismo criterio que en **RAM**: compartir un recurso no te da los permisos
> del dueño.

---

## 3. Monitoreo: dónde está el problema

Con el global network creado, el **tablero** de la consola de Network Manager muestra **actividad y salud** de la
red, alimentado por **CloudWatch metrics** y **CloudWatch Events**.

**La pregunta que responde:** ¿el problema es de un **recurso de AWS**, de un **recurso on-premises**, o de la
**conexión entre ellos**?

**Qué se puede representar del lado on-premises** (según el diagrama de la fuente):

- Un **datacenter** (por ejemplo, **New York**) con **identificador único**.
- Los **dispositivos** de ese datacenter, cada uno con el **identificador de la empresa**.
- Los **links** (por ejemplo, **broadband**) que los conectan.
- Los **customer gateways** y el **Direct Connect gateway** que los unen al TGW.

> [!note] Ampliación (no está en la fuente)
> **CloudWatch Events** es hoy **Amazon EventBridge**. La fuente conserva el nombre viejo; el concepto es el
> mismo: **eventos** de cambio en la red, no solo métricas.

---

## 4. Reachability Analyzer: ¿llega o no llega?

**Qué hace:** analiza la **alcanzabilidad entre dos endpoints** **sin enviar paquetes**. Mira la **configuración
de todos los recursos** de las VPC y usa **razonamiento automatizado** para determinar **qué flujos son posibles**.

**Si el destino no es alcanzable, identifica el componente que bloquea.** Ejemplos de bloqueadores:

- **Security group**
- **Network ACL**
- **Route table**
- **Load balancer**

**Para qué sirve:**

1. **Diagnosticar** problemas de conectividad por **mala configuración**.
2. **Verificar** que la configuración **coincide con la intención** de diseño.
3. **Automatizar** esa verificación **a medida que la configuración cambia**.

> [!important] Lo que lo hace distinto de un ping
> No manda tráfico: **razona sobre la configuración**. Por eso sirve **antes** de que algo falle y **sin** abrir
> un solo puerto.

---

## 5. Demo: el caso de B que no llega a C

**El escenario:** tres VPC adjuntas al transit gateway. **A y B aisladas entre sí**, **ambas** tienen que llegar a
los **shared services de C**. Todo configurado “y parecía bien”. Después llega el reclamo: **las instancias de B
no llegan a las de C**.

| # | Paso | Qué muestra |
| --- | --- | --- |
| 1 | Abrir **Reachability Analyzer** (dentro de Network Manager) | La herramienta de análisis de caminos |
| 2 | Test **A → C** ya corrido | **Success**: el camino de A funciona |
| 3 | **Create and Analyze Path** con nombre `B-to-C` | Se define el camino a probar |
| 4 | **Source type: instances** | También hay **ENI**, **VPC** y **transit gateway** como origen |
| 5 | **Destination type: instances** en C | También se podría probar hasta **internet** |
| 6 | Resultado | **Failed**, como decía el reclamo |
| 7 | **Path details** | Cada paso del recorrido, **con links** a SG, NACL y route tables |
| 8 | Leer el motivo | **“No route to the destination”** |
| 9 | Abrir la **route table de B** | Solo tiene la **ruta local**: **no hay salida al TGW** |
| 10 | **Edit routes → Add route** | Todo el tráfico de salida → **transit gateway**; **Save** |
| 11 | **Rerun Analysis** | Ahora **success**: B llega a C |

**El diagnóstico que hay que copiar:** el problema **no estaba en el transit gateway**. El tráfico **ni siquiera
llegaba** al gateway: **faltaba la ruta en la VPC de origen**. La causa fue humana —se actualizó la route table de
A y **se olvidó la de B**—.

> [!warning] El detalle que se pasa por alto
> El resultado advierte que es un **forward path test only**: prueba **un solo sentido**. Si querés estar seguro,
> hay que **crear el camino inverso** y correrlo también.

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual de la demo, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 6.1 Lectura: AWS Transit Gateway Network Manager

> [!note] La imagen de la fuente no está en el vault
> Captura del tablero de *Transit Gateway Network Manager*
> (`assets/images/603a2a13-6b24-4bd8-b0fc-d53c99ff5b97.jpeg`).

Podés **registrar transit gateways que estén en la misma cuenta de AWS** que tu **global network**. Cuando
**registrás un transit gateway**, los siguientes **attachments se incluyen automáticamente** en tu global network:

- **VPC**
- Conexiones **Site-to-Site VPN**
- **Direct Connect gateways**
- **Transit gateway peering connections**

Cuando **registrás un transit gateway que tiene un peering attachment**, podés **ver el peer transit gateway** en
tu global network, pero **no podés ver sus attachments**. Si **sos dueño del peer transit gateway**, podés
**registrarlo** en tu global network **para ver sus attachments**. Si **borrás un transit gateway**, se
**deregistra automáticamente** de tu global network. Podés **crear un global network que incluya transit gateways
de múltiples Regiones de AWS**, para **monitorear la salud global** de tu red de AWS.

Podés usar **Transit Gateway Network Manager** para **administrar centralmente tus redes** construidas alrededor de
transit gateways. Podés **visualizar y monitorear tu red global** a través de **Regiones de AWS y ubicaciones
on-premises**. **No hay cargos adicionales** por usar Network Manager. Se te cobran **las tarifas estándar** por
los **recursos de red que administrás** en tu global network, como los transit gateways.

Para usar Network Manager, **creás un global network** que represente tu red. **Inicialmente, el global network
está vacío.** **Registrás tus transit gateways existentes** y **definís tus recursos on-premises** en el global
network para **visualizar y monitorear** tus recursos de AWS y tus redes on-premises.

> [!note] La imagen de la fuente no está en el vault
> Diagrama *Network Manager y la representación de una red* (`assets/images/b67de8c9-1e59-477a-8092-fb6e7330d67b.png`):
> a la izquierda, una **red on-premises** con un **datacenter de New York** y **identificador único**, con **dos
> dispositivos** conectados por un **link broadband**, cada uno con el **identificador de la empresa**; al centro,
> **dos customer gateways** conectados a los links y a los dispositivos, más un **Direct Connect gateway** que une
> el datacenter con el TGW; a la derecha, un **transit gateway** con **dos VPC adjuntas**.

Después de **crear tu global network**, podés **monitorear tus redes** a través de un **tablero** en la consola de
Network Manager. **Mirá la actividad y la salud de la red** usando **CloudWatch metrics** y **CloudWatch Events**.
La consola puede ayudarte a **identificar si los problemas de tu red son causados por recursos de AWS, por tus
recursos on-premises, o por las conexiones entre ellos**. **Network Manager no crea, modifica ni borra** tus
transit gateways ni sus attachments. Para **trabajar con transit gateways**, usá la **consola de Amazon VPC** y
las **API de Amazon EC2**.

**No es raro** tener una **configuración no intencional** que pueda llevar a **problemas de conectividad** cuando
tenés **controles y features ricos**. Usá **VPC Reachability Analyzer** para **analizar la alcanzabilidad entre
dos endpoints sin enviar paquetes**. Reachability Analyzer **mira la configuración de todos los recursos** de tus
VPC y usa **razonamiento automatizado** para **determinar qué flujos de red son factibles**.

### 6.2 Lectura: VPC Reachability Analyzer

> [!note] La imagen de la fuente no está en el vault
> Diagrama de *VPC Reachability Analyzer* (`assets/images/SDEH28BJ7Y.png`).

Cuando **el destino no es alcanzable**, Reachability Analyzer **identifica el componente que bloquea**. Por
ejemplo, **problemas de configuración en un security group, una network ACL, una route table o un load balancer**
podrían **bloquear un camino**.

Podés usar Reachability Analyzer para:

- **Diagnosticar problemas de conectividad** causados por **mala configuración de red**.
- **Verificar que tu configuración de red coincide** con la **conectividad que pretendías**.
- **Automatizar la verificación de tu intención de conectividad** a medida que **cambia la configuración** de tu
  red.

Para más información sobre **cómo funcionan estos algoritmos**, ver *How Reachability Analyzer works* en la
documentación.

### 6.3 Demo: Reachability Analyzer (transcripción)

Bienvenidos a esta **demo de Reachability Analyzer**. Empecemos con una pregunta: **¿qué tan divertido es
diagnosticar problemas de conectividad de red?** Si somos honestos, **no mucho**, ¿no? Bueno, les voy a
**demostrar cómo usar Reachability Analyzer** para **resolver un problema de conectividad**. Y **no les prometo
que haga divertido el troubleshooting**, pero **te puede ahorrar muchísimo tiempo**, así que es **una buena
herramienta para conocer**.

Acá está la situación. **Recibí un pedido de adjuntar tres VPC a un transit gateway**. Y los requisitos eran que
**VPC A y VPC B pudieran llegar a los shared services en VPC C**, pero **VPC A y VPC B necesitan estar aisladas**.
**No pueden hablarse entre sí, solo con C**. Así que **configuré el transit gateway**, **adjunté las VPC** y
**configuré las route tables y el transit gateway** de acuerdo con mis requisitos. **Todo se veía bien para mí**.
Pero ahora **me llegan quejas** de que **las instancias EC2 en VPC B no pueden llegar a las instancias en VPC C**.

¿Por qué **dos instancias EC2 no podrían hablarse**? Bueno, **hay muchísimas razones posibles** cuando lo pensás:
**conexiones rotas, security groups, network ACL, firewalls**. Realmente **tenés que recorrer todo el camino**
para estar seguro. Y **ahí es donde Reachability Analyzer me va a ayudar**. Veamos.

**Reachability Analyzer es una herramienta disponible en AWS Network Manager**, junto con **un montón de otras
utilidades útiles**. **Especifico un origen y un destino**, y Reachability Analyzer **recorre todo el camino** y
**reporta si el destino es alcanzable desde el origen o no**. Y **si no lo es, resalta por qué**.

Parece que **ya corrí un test entre VPC A y VPC C**, y **devuelve success**. Corramos un test **entre B y C** y
veamos cómo sale. Selecciono **Create and Analyze Path** y le doy un **nombre** al camino. Lo voy a llamar
**B-to-C**. Y después selecciono el **tipo de origen**. Tengo **varias opciones útiles** acá: **¿desde dónde
exactamente quiero empezar a testear?** ¿Desde el **nivel de instancia** o desde **una network interface
particular**? ¿O quizás quiero ir **más arriba**, al **nivel de VPC o de transit gateway**? Para este ejemplo,
selecciono **instances**. **Lancé una instancia EC2 en cada VPC** para esta demostración. Selecciono la instancia
en **VPC B** como **origen**.

Y para el **tipo de destino**, de nuevo, **opciones muy útiles**. Si VPC C tiene un **recurso compartido**, como un
**internet gateway**, podría **testear la conectividad desde mi instancia en B hasta internet público** si
quisiera. Para este test, voy a seleccionar **instances** como tipo de destino, y selecciono **VPC C**, la
instancia en VPC C. **Todo está bien con los defaults**, así que selecciono **Create and Analyze Path**. Y esto
**va a tardar un poco** mientras testea el camino.

Así que **mientras corre ese test**, voy a volver a Reachability Analyzer y **seleccionar el camino A-to-C** que
corrí antes. Y voy a **seleccionar el ID** de acá. **Cada vez que corro este test, obtengo un análisis**. **Solo
corrí este test una vez**, así que **bajo hasta los path details**, y **acá es donde Reachability Analyzer
realmente brilla**. **Despliega cada paso involucrado** en esta ruta: **los físicos, como las interfaces**, y
**también las configuraciones en el medio, como security groups, network ACL y route tables**. **Cualquiera de
estas cosas podría ser un bloqueador posible**, así que **todas se listan acá**. Y notá que **todos estos son
links**. Por ejemplo, si quería **chequear el security group** que usa la instancia A, puedo **seleccionar el link**
y obtener **un popup con los detalles de ese SG**, y un link que **me llevaría directo a él en la consola** si
quisiera. Esta es **una gran forma de asegurarte de que el tráfico está fluyendo** y de que **fluye como vos
querés**.

Bien, **volvamos un nivel arriba**. Y vemos que **el camino B-to-C falló**, tal como **me venían diciendo**. Estoy
pensando que **quizás el problema es la configuración del transit gateway**. Ese fue **el último cambio grande que
hice**. Pero lo configuré para que **VPC A y VPC B usaran la misma route table del transit gateway**. Así que es
**un poco raro que A funcione y B no**.

Entonces hago clic en el **ID del camino** para ver los resultados del test fallido. Y cuando **bajo y miro los
path details**: **ah, acá está el problema**. **El transit gateway no es el problema en sí**; el problema es que
**el tráfico ni siquiera está llegando al gateway desde VPC B**. Dice acá que **no hay ruta al destino**. Así que
**selecciono ese link** y hago clic en el **ID de la route table local de VPC B**. La selecciono y después
selecciono la pestaña **Routes**. Y **acá está el problema**: **la única ruta que hay es para tráfico local**. **No
hay ruta para el tráfico de salida que llegue al transit gateway**.

**Debo haber estado apurado cuando configuré esto** y **actualicé la route table local de VPC A**, pero después
**me olvidé de hacer lo mismo para VPC B**. Quizás **estaba apurado por ir a almorzar** o algo así. **Hoy hay
tacos.** Vamos a arreglarlo. Selecciono **Edit Routes** y después **Add Routes**. Y voy a **agregar una ruta para
todo el tráfico de salida hacia un transit gateway**. Y **especifico a qué transit gateway va a ir**. **Hay uno
solo** en este ejemplo. Selecciono **Save Changes**.

Bien, **esto se ve mejor**. Volvamos a **Reachability Analyzer** y **corramos ese test de nuevo**. **Subo y
selecciono Rerun Analysis**, y después **hago clic en Confirm**. **El segundo test va a tardar unos momentos** en
correr. Puedo **apretar Refresh** y **chequear cómo va**. **Esto se ve mucho mejor**: **mi instancia en VPC B ahora
puede llegar a mi instancia en VPC C**. **Problema resuelto.**

Notá la **advertencia** de acá: **este es un test de camino de ida solamente**. Así que si quisiera ser
**exhaustivo**, **debería crear un camino para testear la conectividad en la otra dirección** también, para
asegurarme de que **todo funciona bien**. Y después puedo **cerrar ese ticket** e **ir a comer unos tacos**.
Gracias por ver esta demostración de **Reachability Analyzer**.

*Duración del video: **7 minutos 24 segundos**.*

---

## 7. Qué herramienta para qué

| Necesidad | Herramienta | Por qué |
| --- | --- | --- |
| Ver la **salud global** de la red (AWS + on-prem) | **Network Manager** | Tablero con CloudWatch |
| Saber si el problema es **AWS, on-prem o la conexión** | **Network Manager** | Modela los tres dominios |
| Ver los **attachments** de un TGW | **Network Manager** | Se incluyen al registrar |
| Saber si **un flujo específico** es posible | **Reachability Analyzer** | Analiza config, sin paquetes |
| Encontrar **qué componente bloquea** | **Reachability Analyzer** | SG, NACL, route table, LB |
| Verificar la intención **en cada cambio** | **Reachability Analyzer** | Se puede automatizar |
| **Cambiar** una ruta o un attachment | **Consola VPC / API EC2** | Network Manager **no** modifica nada |

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Network Manager observa; no configura.** No crea, modifica ni borra TGW ni attachments.
> 2. Un **global network** puede incluir TGW de **varias Regiones**.
> 3. Al **registrar un TGW** se incluyen **automáticamente**: VPC, **Site-to-Site VPN**, **Direct Connect
>    gateways** y **peering connections**.
> 4. **Peer TGW**: ves el peer, **no sus attachments**; si es tuyo, **lo registrás**.
> 5. **Borrar el TGW** lo **deregistra** solo.
> 6. **Sin cargo adicional** por Network Manager; pagás los **recursos** (TGW, etc.).
> 7. **Reachability Analyzer** no envía paquetes: **razona sobre la configuración**.
> 8. Identifica el **bloqueador**: **SG, NACL, route table o load balancer**.
> 9. Sirve para **diagnosticar**, **verificar la intención** y **automatizar** la verificación.
> 10. El test es **forward path only**: para estar seguro, **probá el camino inverso**.

> [!warning] Trampa clásica del examen
> Escenario: “A llega a C, **B no llega**, y el transit gateway está bien configurado”.
> La respuesta **no** es rearmar el TGW: es **la route table local de B**, que **no tiene ruta al TGW**. El
> tráfico **nunca llega** al gateway. Y si el test pasa en un solo sentido, acordate de que **el análisis es de
> ida**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[Use Cases - Transit Gateway]] — el escenario A/B/C que la demo reproduce
- [[AWS Transit Gateway Setup]] — route tables y asociaciones que se están diagnosticando
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — verificar el camino esperado
- Siguiente paso del módulo: [[AWS Resource Access Manager (RAM) Solutions]] — compartir sin perder el control

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 06 completa: Network Manager, Reachability Analyzer y demo de 7:24 | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Tres imágenes no están en el vault**: `603a2a13-…jpeg`, `b67de8c9-…png` y `SDEH28BJ7Y.png`. Se describen
   desde el texto alternativo, en el lugar donde irían.
2. **“CloudWatch Events”** es el nombre anterior de **Amazon EventBridge**. Se transcribe literal y se aclara en
   §3 como ampliación.
3. **“No additional fees”** no significa “gratis”: se pagan los recursos administrados. Queda explícito en §1.
4. **La demo mezcla humor y un dato irrelevante** (“tacos”). Se traduce completo, sin recortar, porque la consigna
   es traducción fiel.
5. **No hay Knowledge Check**: la lección cierra con la demo.

**Decisiones de transcripción:**

- Se conservan **global network**, **register**, **attachment**, **Reachability Analyzer**, **path details**,
  **forward path test** y **network ACL**.
- Las **cifras** se transcriben literales: **7 min 24 s**, **tres VPC**, **una instancia por VPC**.
- **No se agregaron** cuotas de global networks, precios ni límites que la fuente no da.
