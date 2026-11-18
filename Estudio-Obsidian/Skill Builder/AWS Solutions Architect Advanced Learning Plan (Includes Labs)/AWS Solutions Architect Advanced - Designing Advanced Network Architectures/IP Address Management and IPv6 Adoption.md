---
title: "IP Address Management and IPv6 Adoption"
aliases:
  - "IPAM"
  - "Amazon VPC IPAM"
  - "Gestión de direcciones IP"
  - "Adopción de IPv6"
  - "Egress-only internet gateway"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - ipam
  - ipv6
  - ram
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# IP Address Management and IPv6 Adoption

> [!abstract] Qué es este archivo
> Quinta lección del módulo. Hasta acá la red crecía **agregando conexiones**; esta ataca el recurso que se agota
> **antes**: las **direcciones IP**.
>
> Dos mitades: **Amazon VPC IPAM** (planificar, asignar y monitorear el espacio de direcciones de toda la
> organización) y **IPv6** (dejar de contar direcciones).
>
> La conexión con el caso del curso: cada **título nuevo** pide VPC nuevas, y cada VPC pide un **CIDR que no se
> pise**. Sin IPAM, eso se coordina por planilla y **bloquea el attachment al Transit Gateway**.

> [!quote] La idea que ordena todo
> **El CIDR es un recurso escaso y compartido.** Si se asigna a mano, tarde o temprano dos equipos piden el mismo
> rango, y el que pierde no es el que se equivocó: es el que se queda **sin poder adjuntar la VPC**.

---

## Resumen en una frase

> **IPAM** convierte la asignación de CIDR en un **árbol de pools con reglas**, compartido por **RAM** entre
> cuentas; **IPv6** elimina el problema de raíz porque cada VPC recibe un **/56** con **256 /64**.

---

## 1. El problema: la planilla que no escala

A medida que la organización adjunta **más VPC, en más cuentas y más regiones**, el manejo de direcciones se
vuelve un cuello de botella.

| Cómo se hace hoy | Qué produce |
| --- | --- |
| **CIDR a mano en una planilla** | Rangos **solapados** que nadie vio |
| **Sin registro central** | **Subredes agotadas** sin dueño claro |
| **Sin control de tamaño** | Equipos que piden **/16 cuando necesitan /24** |
| **Solapamiento entre cuentas** | **Attachments al Transit Gateway bloqueados** |
| **Adquisiciones** | Rangos heredados que **chocan** con los propios |

> [!important] Por qué el solapamiento duele tanto
> El Transit Gateway **no puede rutear entre VPC con CIDR iguales**. Un rango repetido no es un problema
> cosmético: **corta la conectividad** de esa VPC con el resto de la red.

**IPAM** reemplaza el seguimiento manual por un modelo **jerárquico y gobernado por políticas**.

---

## 2. IPAM: scopes, pools y allocations

Tres componentes, de arriba hacia abajo.

### Scopes

**El contenedor de más alto nivel.** Al crear un IPAM se crean **dos scopes automáticamente**:

| Scope | Qué contiene |
| --- | --- |
| **Private** | Direcciones que **no se anuncian a internet**: CIDR de VPC, rangos **on-premises**, recursos internos |
| **Public** | Direcciones que **sí se pueden anunciar** afuera, como rangos **BYOIP** |

**Para qué sirven:** permiten **reutilizar direcciones** en **redes no conectadas entre sí**, sin que se pisen.
Es la razón por la que dos adquisiciones pueden usar `10.0.0.0/8` **cada una en su scope**.

### Pools

**Una colección de rangos contiguos (CIDR) dentro de un scope.** Se organizan **en jerarquía**, igual que la
empresa *(ejemplo ilustrativo: la fuente da el patrón, no los rangos)*:

```
Pool raíz           10.0.0.0/8
├── Regional us-east-1     10.1.0.0/16
│   ├── Dev                10.1.0.0/20
│   └── Prod               10.1.16.0/20
└── Regional eu-west-1     10.2.0.0/16
    ├── Dev                10.2.0.0/20
    └── Prod               10.2.16.0/20
```

**Los pools aplican reglas de asignación:** se define el **netmask mínimo y máximo** que una cuenta puede pedir.
Eso evita que un equipo se lleve **un bloque gigante** y deje sin espacio al resto.

### Allocations

**Una asignación de CIDR desde un pool a un recurso.**

- Creás la VPC y elegís el **pool de IPAM como origen del CIDR**.
- IPAM asigna **el siguiente bloque disponible** de ese pool.
- El seguimiento es **automático**: qué VPC tiene qué CIDR, **en qué cuenta y en qué Región**, sin registro
  externo.

**Además, IPAM detecta allocations no administradas:** CIDR que existen en tus cuentas pero se asignaron **fuera**
de IPAM. Eso da visibilidad sobre el espacio que **ya existía** antes de adoptarlo.

> [!note] Ampliación (no está en la fuente)
> El valor real de detectar **unmanaged allocations** es la migración: no podés mover cien VPC de golpe, pero sí
> saber **qué rangos quedaron afuera** y empezar a planificar el solapamiento antes de que aparezca en un
> attachment.

---

## 3. Multi-cuenta: el pool compartido con RAM

**Dónde vive IPAM:** en una **cuenta de administrador delegado**, típicamente la cuenta de **red** o de
**shared services**.

**Cómo llega a las demás:** se **comparten los pools** con **AWS Resource Access Manager (RAM)**.

- Se comparte con una **cuenta** o con una **OU**.
- Los principals de esas cuentas **crean VPC tomando el CIDR del pool compartido**.
- El **administrador de IPAM conserva visibilidad y gobierno** sobre todo el espacio.
- Las cuentas **no coordinan entre sí** ni piden CIDR a mano.

**La arquitectura, en cuatro pasos:**

| # | Pieza | Qué hace |
| --- | --- | --- |
| 1 | **IPAM en la cuenta de red** | Visibilidad total de pools, allocations y utilización |
| 2 | **Pool de nivel superior** | Todo el espacio privado (por ejemplo `10.0.0.0/8`), subdividido después |
| 3 | **Pools regionales y de entorno** | Separan geografía y después **dev / prod**; cada pool tiene **reglas de netmask** |
| 4 | **Asignación de VPC vía RAM** | La cuenta de workload crea la VPC y **recibe el bloque automáticamente** |

> [!important] El punto de arquitectura
> El equipo de red **deja de ser un cuello de botella**: mantiene el **gobierno** del espacio sin aprobar cada
> VPC. La política se expresa **en el pool**, no en un ticket.

---

## 4. IPv6: por qué y cómo

**El problema:** el espacio privado de IPv4 es **finito**. Con **cientos de VPC**, una organización puede
**agotar su `10.0.0.0/8`** o chocar con rangos heredados de **adquisiciones**.

**La solución:** IPv6 da un espacio **virtualmente ilimitado**. AWS asigna **un /56 por VPC**, que contiene
**256 subredes /64**.

### Los tres modos de subred

| Modo | Direcciones que recibe el recurso | Cómo llega a IPv4 | Cuándo usarlo |
| --- | --- | --- | --- |
| **Dual-stack** | **IPv4 + IPv6** | Directo: usa la dirección que corresponde | **Punto de partida recomendado**: no rompe nada de lo que ya funciona |
| **IPv6-only** | **Solo IPv6** | **NAT64 + DNS64** como capa de interoperación | Cargas **nuevas** sin necesidad de IPv4 directo |
| **IPv4-only** | **Solo IPv4** | Directo | Modelo tradicional; cargas que **solo** hablan IPv4 |

**Dual-stack no requiere capa de interoperación**: el recurso tiene las dos direcciones y elige según el destino.
Por eso es el **punto de partida seguro**.

**IPv6-only** reduce la complejidad de administración y **elimina el costo de NAT gateway IPv4** para la salida a
internet, a cambio de necesitar **NAT64/DNS64** para lo viejo.

---

## 5. Conectividad IPv6: dos piezas

### Egress-only internet gateway

Permite **salida IPv6** desde una **subred privada** a internet, **sin permitir conexiones entrantes**.

**Es el equivalente IPv6 del NAT gateway para IPv4**, con una diferencia que el examen adora:

| | **NAT gateway (IPv4)** | **Egress-only IGW (IPv6)** |
| --- | --- | --- |
| **Dirección** | Solo salida | Solo salida |
| **Cargo por hora** | **Sí** | **No** |
| **Cargo por procesamiento** | **Sí** | **No** |
| **Qué se paga** | Hora + datos | **Solo el data transfer** |

**Cuándo:** recursos IPv6 privados que necesitan **bajar updates** o **llamar APIs externas** sin ser alcanzables
desde afuera.

### NAT64 y DNS64

| Pieza | Qué hace |
| --- | --- |
| **NAT64** | **Traduce paquetes IPv6 a IPv4** en el NAT gateway |
| **DNS64** | Trabaja con **Route 53 Resolver**: **sintetiza registros AAAA** (IPv6) para dominios que **solo tienen A** (IPv4) |

**Cómo se combinan:** un recurso IPv6-only consulta un dominio que **no tiene IPv6**; **DNS64 devuelve una
dirección IPv6 sintetizada** que rutea por **NAT64**; NAT64 traduce y llega al destino IPv4.

**Cuándo:** cuando lo IPv6-only tiene que hablar con **servicios legacy IPv4** o **APIs de terceros** que todavía
no migraron.

> [!warning] La confusión clásica
> **Egress-only** resuelve **salida a internet**. **NAT64/DNS64** resuelve **hablar con IPv4**. No son
> intercambiables: podés tener salida IPv6 y **aun así** no poder llamar a una API que solo tiene dirección IPv4.

---

## 6. Aplicado al caso del curso

La plataforma de **gaming** del módulo se expande a **varias regiones** y **suma títulos**. **Cada título pide
VPC aisladas.**

| Desafío | Cómo lo resuelve |
| --- | --- |
| **Cada título pide VPC con CIDR que no se pise** | **Pools de IPAM compartidos por RAM**: la cuenta del juego crea la VPC **self-service** y recibe un bloque del **pool regional correcto** |
| **El equipo de red no puede aprobar cada VPC** | La política vive en el **pool** (netmask mínimo y máximo) |
| **Solapamiento que bloquea el TGW** | **IPAM** lo evita antes de que exista |
| **Cientos de microservicios por título** | **IPv6-only**: cada tarea de **Fargate** o **pod** de Kubernetes consume una IP; un **/64** por subred da **más de 18 trillones** de direcciones |

> [!note] Ampliación (no está en la fuente)
> **18 trillones** es el orden de **2⁶⁴** (≈ 1,8 × 10¹⁹). La cuenta que importa para el examen no es el número
> exacto sino la conclusión: **el agotamiento deja de ser una restricción de escalado** para contenedores.

---

## 7. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 6** y se cierra con la **9**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual de las pestañas, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 7.1 Introducción

A medida que las organizaciones **adjuntan más VPC en más cuentas y Regiones**, la **administración de
direcciones IP** se vuelve un **desafío de escalado**. La **asignación manual de CIDR en planillas** lleva a
**rangos de direcciones solapados**, **subredes agotadas** y **attachments de Transit Gateway bloqueados**.

**Amazon VPC IP Address Manager (IPAM)** ofrece un **enfoque estructurado** para **planificar, asignar y
monitorear** el espacio de direcciones IP en **toda la organización**. Para entornos que se acercan al
**agotamiento de IPv4**, la **adopción de IPv6** ofrece un **espacio de direcciones prácticamente ilimitado** con
**ruteo simplificado**.

### 7.2 Amazon VPC IPAM

**Amazon VPC IPAM** es una **feature de VPC** que te ayuda a **planificar, rastrear y monitorear** direcciones IP
en cargas de trabajo de AWS. **Reemplaza el seguimiento manual** con un **modelo jerárquico basado en políticas**.

IPAM usa **tres componentes centrales** para organizar el espacio de direcciones.

**Scopes.** Un **scope** es el **contenedor de más alto nivel** en IPAM. Cuando **creás un IPAM**, se crean
**automáticamente dos scopes**: uno **privado** y uno **público**. El **scope privado** contiene todas las
direcciones IP que **no se pueden anunciar a internet** —los **bloques CIDR de tus VPC**, los **rangos
on-premises** y los **recursos internos**. El **scope público** contiene direcciones que **sí se pueden anunciar
externamente**, como los rangos de **Bring Your Own IP (BYOIP)**.

Los scopes te permiten **reutilizar direcciones IP en múltiples redes no conectadas** sin causar **solapamientos**.

**Pools.** Un **pool** es una **colección de rangos de direcciones IP contiguos (CIDR)** **dentro de un scope**.
Organizás los pools **jerárquicamente** para que coincidan con la **estructura organizacional**. Un **patrón
común** es un **pool de nivel superior** que contiene **todo tu espacio de direcciones**, con **pools regionales**
debajo, y **pools específicos por entorno** (desarrollo, producción) en el **nivel más bajo**.

Los pools **aplican reglas de asignación**. Definís la **longitud mínima y máxima de netmask** que las cuentas
pueden **pedir de un pool**. Esto **evita que los equipos pidan bloques CIDR sobredimensionados** que
**desperdician espacio de direcciones**.

**Allocations.** Una **allocation** es una **asignación de CIDR de un pool a un recurso**. Cuando **creás una VPC
y seleccionás un pool de IPAM como origen del CIDR**, IPAM **asigna el siguiente bloque disponible** de ese pool.
La **asignación se rastrea automáticamente** —podés ver **qué VPC es dueña de qué CIDR, en qué cuenta y en qué
Región**, sin mantener **registros externos**.

IPAM también **detecta allocations no administradas**: **CIDR en tus cuentas que se asignaron fuera de IPAM**.
Esto te da **visibilidad sobre el espacio de direcciones que es anterior** a tu despliegue de IPAM.

### 7.3 Multi-Account IPAM con AWS RAM

IPAM se crea en una **cuenta de administrador delegado** —típicamente tu **cuenta de red o de shared services**.
Para permitir que las **cuentas de workload asignen CIDR de los pools de IPAM**, **compartís los pools usando AWS
Resource Access Manager (RAM)**.

Cuando **compartís un pool de IPAM con una cuenta o una unidad organizacional**, los **principals de esas
cuentas** pueden **crear VPC que toman sus bloques CIDR del pool compartido**. El **administrador de IPAM
conserva la visibilidad y el gobierno** sobre **todo el espacio de direcciones**. Las **cuentas individuales no
necesitan coordinarse entre sí** ni **pedir CIDR manualmente**.

El siguiente diagrama muestra una **arquitectura de IPAM multi-cuenta** con **pools jerárquicos compartidos** en
toda una organización.

1. **IPAM en la cuenta de red.** El **recurso IPAM** se crea en una **cuenta de administrador delegado**. Esta
   cuenta tiene **visibilidad completa** de todos los pools, allocations y **utilización de IP** de toda la
   organización.
2. **Pool de nivel superior.** El pool de nivel superior contiene **todo el espacio de direcciones privado** de la
   organización. **Aprovisionás un bloque CIDR grande** acá (como `10.0.0.0/8`) y **lo subdividís** en pools
   **regionales** y de **entorno**.
3. **Pools regionales y de entorno.** Los **pools regionales** **particionan el espacio por geografía**. Los
   **pools de entorno** debajo **separan desarrollo de producción**. Las **reglas de asignación** de cada pool
   **controlan los tamaños de netmask** que las cuentas de workload pueden pedir.
4. **Asignación de VPC vía RAM.** Las **cuentas de workload** crean VPC y **seleccionan el pool de IPAM compartido
   como origen del CIDR**. IPAM **asigna el siguiente bloque disponible automáticamente**. El **equipo de red
   mantiene visibilidad centralizada** **sin convertirse en cuello de botella** para la creación de VPC.

### 7.4 Estrategias de adopción de IPv6

El **espacio de direcciones privado de IPv4 es finito**. Las organizaciones con **cientos de VPC en múltiples
Regiones** pueden **agotar su asignación de `10.0.0.0/8`** o **encontrar rangos CIDR solapados por adquisiciones**.
**IPv6 ofrece un espacio de direcciones prácticamente ilimitado** —AWS asigna **un bloque CIDR IPv6 /56 por
VPC**, con **256 subredes /64 disponibles**.

**Tres modos de subred** determinan **cómo se comunican los recursos**.

**Dual-stack.** Los recursos reciben **tanto dirección IPv4 como IPv6**. Se comunican con **endpoints IPv4 usando
su dirección IPv4** y con **endpoints IPv6 usando su dirección IPv6**. **No se requiere capa de interoperación**.

Usá **dual-stack** para cargas que **deben comunicarse con pares IPv4 e IPv6 simultáneamente**. Es el **punto de
partida recomendado** para organizaciones que **empiezan la adopción de IPv6**, porque **no introduce cambios
disruptivos** en la conectividad IPv4 existente.

**IPv6-only.** Los recursos reciben **solo una dirección IPv6**. **No tienen dirección IPv4 asignada**. Para
comunicarse con **endpoints IPv4**, usan **NAT64 y DNS64** como **capa de interoperación**.

Usá **subredes IPv6-only** para **cargas nuevas** que **no requieren conectividad IPv4 directa**. Las subredes
IPv6-only **reducen la complejidad de administración de direcciones** y **eliminan los costos de NAT gateway IPv4**
para el **tráfico saliente a internet**.

**IPv4-only.** Los recursos reciben **solo una dirección IPv4**. Es el **modelo tradicional** y **sigue siendo
apropiado** para cargas que **se comunican exclusivamente con endpoints IPv4** y **no necesitan soporte IPv6**.

### 7.5 Componentes de conectividad IPv6

IPv6 **introduce distintos tipos de gateway** para **controlar el acceso a internet desde subredes privadas**.

**Egress-only internet gateway.** Un **egress-only internet gateway** permite **tráfico IPv6 de salida** desde
una **subred privada** hacia internet, pero **impide conexiones entrantes** desde internet. Es el **equivalente
IPv6 de un NAT gateway para IPv4** —con **una diferencia clave**: los **egress-only internet gateways no tienen
cargo por hora ni cargo por procesamiento de datos**. **Solo pagás el data transfer**.

Usá un **egress-only internet gateway** para **recursos IPv6 privados** que necesitan **llegar a internet** (por
ejemplo, para **descargar actualizaciones** o **llamar APIs externas**) **sin ser alcanzables desde internet**.

**NAT64 y DNS64.** **NAT64** permite que los **recursos IPv6-only se comuniquen con endpoints IPv4**.
**Traduce paquetes IPv6 a paquetes IPv4** en el **NAT gateway**. **DNS64** trabaja con **Amazon Route 53
Resolver** para **sintetizar registros AAAA** (direcciones IPv6) para **nombres de dominio que solo tienen
registros A** (direcciones IPv4). Cuando un **recurso IPv6-only consulta un dominio que no tiene dirección IPv6**,
**DNS64 devuelve una dirección IPv6 sintetizada** que **rutea a través del gateway NAT64**.

Usá **NAT64 y DNS64 juntos** cuando los **recursos IPv6-only necesitan llegar a servicios legacy IPv4** o a
**APIs de terceros que todavía no soportan IPv6**.

### 7.6 Diseñando para la plataforma de gaming

El **escenario de la plataforma de gaming** de este curso implica **expandirse a múltiples Regiones** e
**incorporar nuevos títulos de juegos**. **Cada título nuevo requiere VPC aisladas**. **IPAM e IPv6** atacan
**dos desafíos de escalado** que esta arquitectura enfrenta.

**IPAM ataca la planificación de IP a escala.** A medida que la plataforma **agrega títulos en distintas
Regiones**, **cada título requiere una o más VPC con bloques CIDR que no se solapen**. **Sin IPAM**, el **equipo
de red** debe **asignar CIDR manualmente para cada VPC nueva** —un proceso que **demora el onboarding** y
**arriesga solapamientos que bloquean el ruteo del Transit Gateway**. **Con pools de IPAM compartidos vía RAM**,
los **equipos de juego crean VPC self-service** y **reciben un CIDR automáticamente asignado y sin solapamiento**
del **pool regional correcto**.

**IPv6 reduce el riesgo de agotamiento de direcciones.** Una **plataforma de gaming** con **cientos de
microservicios contenerizados por título** **consume direcciones IP rápidamente**. **Cada tarea de Fargate o pod
de Kubernetes requiere una dirección IP de la subred**. Las **subredes IPv6-only** proveen **un prefijo /64 por
subred** —**más de 18 trillones de direcciones**— y **eliminan el agotamiento de direcciones como restricción**
para **escalar cargas de trabajo de contenedores**.

### 7.7 Key takeaways

Revisá los siguientes **key takeaways**:

- **IPAM usa scopes, pools y allocations** para **organizar el espacio de IP jerárquicamente**. **Compartí pools
  vía RAM** para que las **cuentas de workload** puedan **crear VPC self-service** **sin coordinación manual de
  CIDR**.
- Las **subredes dual-stack** son el **punto de partida más seguro** para la **adopción de IPv6**. Las
  **subredes IPv6-only** **eliminan la administración de direcciones IPv4** para **cargas nuevas**.
- Los **egress-only internet gateways** dan **acceso saliente IPv6 gratis** desde **subredes privadas**.
  **NAT64 y DNS64** permiten que los **recursos IPv6-only lleguen a endpoints IPv4 legacy**.
- **IPAM e IPv6 juntos** **eliminan la administración de direcciones IP como cuello de botella** para
  **arquitecturas multi-cuenta y multi-Región**.

---

## 8. Cuándo usar cada cosa

| Necesidad | Pieza | Por qué |
| --- | --- | --- |
| Planificar el espacio de toda la organización | **IPAM + pools jerárquicos** | Un árbol, reglas de netmask y seguimiento automático |
| Que las cuentas creen VPC sin pedir permiso | **RAM** sobre el pool | Self-service con gobierno central |
| Recuperar visibilidad de rangos viejos | **Unmanaged allocations** | Detecta lo asignado fuera de IPAM |
| Empezar con IPv6 sin romper nada | **Dual-stack** | No hay capa de interoperación |
| Escalar contenedores sin contar IP | **IPv6-only** | /56 por VPC, 256 /64 por VPC |
| Salida IPv6 sin entrada | **Egress-only IGW** | Solo salida; sin cargo por hora ni por procesamiento |
| Hablar con una API solo-IPv4 | **NAT64 + DNS64** | Traducción + AAAA sintetizado |

---

## 9. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **IPAM** planifica, rastrea y monitorea; reemplaza la **planilla**.
> 2. **Dos scopes automáticos**: **private** (VPC, on-premises, interno) y **public** (**BYOIP**). Los scopes
>    permiten **reusar rangos** en redes **no conectadas**.
> 3. **Pools jerárquicos** con **reglas de netmask mínimo y máximo**; evitan bloques sobredimensionados.
> 4. **Allocations automáticas**, con dueño, cuenta y Región; **detecta unmanaged allocations**.
> 5. **Multi-cuenta**: IPAM en la **cuenta de administrador delegado** + **RAM** (cuenta u **OU**) → las cuentas
>    crean VPC **sin coordinarse**.
> 6. **IPv6**: **/56 por VPC** con **256 /64**. **Dual-stack** es el punto de partida; **IPv6-only** necesita
>    **NAT64/DNS64**.
> 7. **Egress-only IGW** = solo salida, **sin cargo por hora ni por procesamiento**; se paga **solo el data
>    transfer**.
> 8. **DNS64** sintetiza **AAAA** desde **A** vía **Route 53 Resolver**; **NAT64** traduce en el **NAT gateway**.
> 9. **El solapamiento de CIDR bloquea el Transit Gateway**: por eso IPAM es un requisito de la red, no un
>    inventario.
> 10. **IPv6 elimina el agotamiento** como límite para **contenedores** (Fargate, pods).

> [!warning] Trampa clásica del examen
> Escenario: “recursos **IPv6-only** necesitan llamar a una **API de terceros que solo tiene IPv4**”.
> La respuesta **no** es **egress-only internet gateway** (eso es salida a internet) ni volver a **IPv4-only**:
> es **NAT64 + DNS64**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[Use Cases - Transit Gateway]] — por qué el CIDR solapado **bloquea** el attachment
- [[AWS Transit Gateway Setup]] — el otro extremo: adjuntar y rutear
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — administrador delegado y RAM
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — el costo de NAT gateway vs.
  egress-only
- Siguiente paso del módulo: [[AWS Transit Gateway Network Manager]] — el mapa y el diagnóstico de la red

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 05 completa: IPAM (scopes, pools, allocations), RAM, IPv6 y conectividad | Nota completa (secciones 1–9) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La lección tiene un `###` vacío** entre “Designing for the gaming platform” y “Key takeaways”. Es un
   artefacto de la fuente: se ignora y se registra.
2. **La fuente anuncia un diagrama** (“The following diagram shows a multi-account IPAM architecture”) **pero no
   incluye la imagen** en el texto entregado. Se transcriben los **cuatro pasos** numerados, que son su
   descripción.
3. **“18 quintillion”** se traduce como **18 trillones**; el orden de magnitud es **2⁶⁴**. Se aclara en §6.
4. **No hay Knowledge Check**: la lección cierra con **cuatro key takeaways**.
5. **Las pestañas interactivas** (scopes/pools/allocations, modos de subred, gateways) se transcriben como
   secciones, sin perder el contenido de ninguna.

**Decisiones de transcripción:**

- Se conservan **scope**, **pool**, **allocation**, **delegated administrator**, **BYOIP**, **dual-stack**,
  **IPv6-only**, **egress-only internet gateway**, **NAT64**, **DNS64** y **Route 53 Resolver**.
- Las **cifras** se transcriben literales: **/56 por VPC**, **256 /64**, **`10.0.0.0/8`**, **/64 por subred**.
- **No se agregaron** precios, cuotas de pools ni límites que la fuente no da.
