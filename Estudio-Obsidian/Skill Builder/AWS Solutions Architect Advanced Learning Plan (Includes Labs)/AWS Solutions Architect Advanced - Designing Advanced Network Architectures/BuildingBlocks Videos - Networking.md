---
title: "BuildingBlocks Videos - Networking"
aliases:
  - "BuildingBlocks - Networking"
  - "Casos BuildingBlocks - Networking"
  - "Cross-Region Communication"
  - "Optimización de NAT Gateway"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - ram
  - route-53
  - nat-gateway
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# BuildingBlocks Videos - Networking

> [!abstract] Qué es este archivo
> Undécima lección del módulo. **No enseña servicios nuevos**: son **tres diálogos de arquitectos** donde
> se evalúan opciones y se descartan con argumentos.
>
> Cada caso es un **molde de examen**: aparece un requisito, se proponen dos o tres soluciones razonables y gana
> la que **cumple sin agregar operación**.
>
> Duraciones: **2 min 38 s**, **2 min 38 s** y **2 min 17 s**.

> [!quote] La idea que ordena todo
> **La respuesta no es la más potente, es la que cumple el requisito con menos piezas nuevas.** En los tres
> casos se descarta la opción “más completa” porque agrega **costo, operación o un servicio que el cliente no
> quería**.

---

## Resumen en una frase

> Tres decisiones: **RAM** para compartir recovery plans sin duplicar IAM, **multivalue + health checks** para
> active-active con failover automático, y **S3 gateway endpoint** para sacar del NAT el tráfico de parches.

---

## 1. Tres casos, un mismo método

**El formato:** dos arquitectos revisan un problema real de un cliente, proponen opciones, las critican **contra
los pilares de Well-Architected** y cierran con una recomendación.

| Caso | Pilar que decide | Pieza ganadora |
| --- | --- | --- |
| **1. Compartir recovery plans** | **Security** + **Operational Excellence** | **AWS RAM** |
| **2. Active-active global** | **Reliability** | **Multivalue routing + health checks** |
| **3. Costo del NAT central** | **Cost Optimization** | **S3 gateway endpoint** |

> [!important] Cómo se lee cada caso
> Fijate **qué se descarta y por qué**. En el examen, la opción incorrecta suele ser **técnicamente válida**:
> pierde por **overhead**, por **intervención manual** o por **costo**, no por no funcionar.

---

## 2. Caso 1: compartir recovery plans entre cuentas

> [!warning] Ojo con el título
> La sección se llama **“BuildingBlocks: Cross-Region Communication”** y su introducción habla de **arquitecturas
> con IPs solapadas, Transit Gateway con NAT y exposición pública**. **Nada de eso aparece en el video**: la
> conversación es sobre **Route 53 Application Recovery Controller** y **compartición de recovery plans**. Se
> registra la inconsistencia; la nota sigue **el contenido del video**.

**La situación:** el cliente usa **Route 53 Application Recovery Controller** en **varias cuentas** y tiene
problemas para **administrar los recovery plans**.

**El requisito, con dos partes que chocan:**

| Quién | Qué necesita |
| --- | --- |
| **Los equipos** | **Ejecutar** los recovery plans **desde sus propias cuentas** |
| **El equipo de seguridad** | **Control centralizado** sobre el **resource sharing** |

### Las opciones que se evalúan

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **IAM roles por cuenta con trust cross-account** + resource-based policies en cada plan | **Descartada** | Funciona, pero **demasiado overhead operativo**; administrar roles y políticas por cuenta **se vuelve complejo** (pilar **Security**) |
| **IAM Identity Center** | **Descartada** | Es bueno para **gestión de acceso de usuarios**, pero **no resuelve el resource sharing**; el requisito es que **ejecuten desde sus cuentas** |
| **AWS RAM** | **Elegida** | **Resource share** de los recovery plans con **cuentas específicas** de la organización: **control centralizado** y ejecución **desde cada cuenta** |

**El detalle de implementación:** como ya usan **AWS Organizations**, hay que **habilitar el trusted access entre
RAM y Organizations**.

**Los beneficios que se enumeran:** alinea con **Operational Excellence** porque **reduce overhead**; es **más
simple** que administrar IAM roles individuales o **duplicar planes** en cada cuenta; y es **más costo-eficiente
que crear clusters duplicados** en cada cuenta.

> [!note] Ampliación (no está en la fuente)
> La frase del video “create a resource share for the **region**, switch plans” está mal transcripta: lo que se
> comparte son **los recovery plans**. No hay “resource share por región” en el argumento.

---

## 3. Caso 2: active-active multi-región con routing global

**La situación:** una **aplicación web global** con **active-active en dos regiones**. Hoy usa **Route 53 con
weighted routing** y **no está conforme**.

**Los dos requisitos:**

1. **Minimizar la latencia** para una base de usuarios global.
2. **Failover automático** si una región falla.

### Las opciones que se evalúan

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **AWS Global Accelerator** (dos accelerators, Route 53 apuntando a las **static IPs**) | **Descartada** | Ayudaría con latencia vía **AWS Global Network**, pero el cliente **quiere mantener la solución basada en DNS** y **ya tiene Route 53** administrando el dominio |
| **Latency-based routing con weighted record sets** | **Descartada** | Dirige a la región más cercana, pero ante una falla hay que **ajustar los pesos a mano**; **Reliability** pide **minimizar la intervención manual** |
| **Multivalue routing con health checks** | **Elegida** | Active-active + **remoción automática** de endpoints **no saludables**; devuelve **varios registros sanos** (load balancing básico) y **no requiere servicios nuevos** |

**El mecanismo del failover, según el video:** el **health check** saca el endpoint enfermo y el **navegador del
cliente prueba automáticamente otra IP** si la primera falla. Eso es **recuperación automática**.

> [!important] La diferencia que decide
> **Weighted** y **latency-based** te dan **control**, pero la falla se resuelve **tocando pesos**.
> **Multivalue + health checks** te da **automación**. El requisito era **automático**, no **flexible**.

> [!note] Ampliación (no está en la fuente)
> El caso mezcla dos planos: **latencia** (qué región conviene) y **disponibilidad** (qué región responde). La
> respuesta elegida prioriza **disponibilidad automática** y acepta que la elección de región sea **por conjunto
> de registros sanos**, no por medición de latencia.

---

## 4. Caso 3: bajar el costo del NAT central

**La situación:** un **NAT gateway compartido en la VPC central** da salida a internet a **todas las demás
VPC**. Los **data transfer charges** son altos, **sobre todo por OS updates y patches**.

### Las opciones que se evalúan

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **Un NAT gateway por VPC** | **Descartada** | Baja el tráfico **cross-VPC**, pero **cuesta más en total**: se pagan **varios NAT gateways** y **los mismos charges de salida a internet** |
| **VPC interface endpoints** para servicios comunes | **Parcial** | Sirven para **servicios de AWS**, pero **las actualizaciones de SO siguen necesitando internet** y los interface endpoints **tienen su propio cargo por hora** |
| **S3 gateway endpoint** en la **VPC central**, con el **ruteo** configurado | **Elegida** | El gateway endpoint **es gratis**, **elimina los data transfer charges** de los parches guardados en S3 y **el tráfico queda en la red de AWS** |

**La condición que se remarca:** **agregar el gateway endpoint no alcanza**. Hay que **configurar el ruteo**
para que el tráfico de S3 **pase por el endpoint** en lugar del NAT.

> [!warning] Dos imprecisiones del video
> 1. Dice que los parches se mueven **“over PrivateLink”**: un **gateway endpoint no usa PrivateLink** (eso es
>    de los interface endpoints).
> 2. Dice “configurar el ruteo **del NAT gateway**”: las rutas se configuran en la **route table** de la VPC,
>    apuntando al **gateway endpoint**; el NAT queda **bypasseado**, no reconfigurado.

> [!note] Ampliación (no está en la fuente)
> El ahorro no viene del precio del endpoint —que es cero— sino de **sacar el volumen del camino que cobra
> procesamiento**. Con parches de SO, ese volumen es **predecible y grande**: es el caso ideal para este cambio.

---

## 5. El patrón que se repite

| Se descartó… | Porque agrega… | Y el requisito pedía… |
| --- | --- | --- |
| **IAM roles + policies por cuenta** | **Operación** distribuida | **Control centralizado** |
| **IAM Identity Center** | Nada, pero **no comparte recursos** | **Resource sharing** |
| **Global Accelerator** | Un servicio y **otro modelo de entrada** | **Mantener DNS** |
| **Latency/weighted routing** | **Ajuste manual** en la falla | **Failover automático** |
| **NAT por VPC** | **Más NAT gateways** y el mismo egreso | **Bajar el costo** |
| **Solo interface endpoints** | **Cargo por hora** y no cubre parches | **Cubrir OS updates** |
| **Solo crear el gateway endpoint** | Nada, pero **no cambia el camino** | **Rutear el tráfico** |

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual de los diálogos, o (c) antes
> del examen querés chequear que no se escapó un matiz.

### 6.1 Video: BuildingBlocks — Cross-Region Communication (transcripción)

**Joe, estaba revisando el setup de disaster recovery de este cliente enterprise.** Dejame traerlo acá. Ahí
está. Están usando **Route 53 Application Recovery Controller en varias cuentas**, pero **están teniendo
problemas para administrar los recovery plans**.

**Contame.** Bueno, **necesitan que distintos equipos ejecuten recovery plans desde sus respectivas cuentas**,
pero **el equipo de seguridad quiere control centralizado sobre el resource sharing**. Están tratando de
**averiguar la forma más eficiente de administrar estos planes entre cuentas**.

Bueno, **podríamos armar IAM roles en cada cuenta con relaciones de trust cross-account**. Después
**configurar resource-based policies en cada plan** para controlar el acceso.

**Sí, técnicamente funcionaría**, pero **pensando en el pilar de seguridad de Well-Architected**, **podría crear
más overhead operativo del necesario**. **Administrar todas esas reglas y políticas de IAM por cuenta se puede
volver complejo bastante rápido.**

**Sí, sí. Buen punto.** Bueno, **¿qué tal usar IAM Identity Center?** Podríamos **dar permisos específicos a
usuarios para acceder a los recovery plans**. **Identity Center es genial para la gestión de acceso de
usuarios**, pero **no resuelve realmente el problema del resource sharing**. Acordate: **necesitan que los
equipos ejecuten estos planes desde sus propias cuentas**.

**Ya veo lo que querés decir.** Entonces **¿por qué no vamos con AWS Resource Access Manager?** Podemos **crear
un resource share para los recovery plans** y **compartirlos con cuentas específicas dentro de la estructura de
tu organización**. **Se alinea perfecto con el pilar de operational excellence**, porque **reduce el overhead
operativo**. Además, **les da el control centralizado que necesitan** y **permite que los equipos ejecuten los
planes desde sus cuentas**. Y como **ya están usando Organizations**, **solo tenemos que habilitar el trusted
access entre RAM y Organizations**. **Mucho más simple que administrar IAM roles individuales o duplicar planes
entre cuentas.**

**Exacto.** **El equipo de seguridad obtiene su control centralizado**, **los equipos pueden ejecutar los
recovery plans desde sus cuentas** y **estamos minimizando el overhead operativo**. **¿Deberíamos recomendar
este enfoque?**

**Definitivamente.** Es **la solución más eficiente que cumple todos los requisitos** y **es más costo-efectiva
que crear clusters duplicados en cada cuenta**.

**Perfecto. Vamos a documentarlo para ellos.**

*Duración del video: **2 minutos 38 segundos**.*

### 6.2 Video: Multi-Region Active-Active with Global Routing (transcripción)

**Bien, Joe, estaba revisando el caso de un cliente de aplicación web global.** Traigamos su arquitectura. Muy
bien. **Tienen un desafío interesante con su setup active-active en dos regiones.**

**¿Cuál es la preocupación principal?** Bueno, **quieren minimizar la latencia para su base de usuarios global**
y **al mismo tiempo asegurar que tengan failover automático** si hay un problema. **Ahora mismo están usando
Route 53 con weighteda routing policy**, pero **no están conformes con los resultados**.

**¿Podrían usar AWS Global Accelerator?** Podríamos **configurar dos accelerators y apuntar Route 53 a una de
las static IPs**, lo que les daría **direcciones IP consistentes** y **ayudaría con la latencia usando la AWS
Global Network**.

**Es una idea interesante. No estoy seguro de que sea el mejor fit acá.** Si bien **Global Accelerator ayudaría
con la latencia**, **mencionaron específicamente que quieren mantener su solución basada en DNS**, y además **ya
tienen Route 53 administrando su dominio**.

**Buen punto.** **¿Qué tal usar latency-based routing con weighted record sets?** Así podríamos **dirigir a los
usuarios a la región más cercana** y **mantener la capacidad de mover tráfico si hace falta**.

**Sí, está más cerca. Pero acordate de lo que dijeron sobre querer failover automático**: con latency-based
routing, **tendríamos que ajustar los pesos manualmente si una región tiene problemas**. Y **desde la
perspectiva de reliability, queremos minimizar la intervención manual en escenarios de falla. ¿No?**

**Correcto. Y mirando el pilar de reliability de Well-Architected, deberíamos estar implementando recuperación
automática frente a fallas.**

**¿Qué tal multivalue routing con health checks?** Eso nos daría **el setup active-active que quieren** y
además **la remoción automática de endpoints no saludables**.

**Mirá, satisface los dos requisitos.** Los **health checks nos dan failover automático** y, **al devolver
múltiples registros sanos, obtenemos una forma básica de load balancing entre regiones**. Además, **es una
solución simple que no requiere servicios adicionales más allá de lo que ya están usando**. **Tengo que decir
que me convenciste.**

**Genial. Sí. Y provee recuperación automática.** **El navegador del cliente va a probar automáticamente otra IP
si la primera falla**, así que **obtenemos ese failover automático que querían**. **Suena como la solución
perfecta.**

*Duración del video: **2 minutos 38 segundos**.*

### 6.3 Video: Optimizing NAT Gateway Costs with S3 Gateway Endpoints (transcripción)

**Joe, estaba revisando la arquitectura de este cliente donde usan un NAT gateway compartido en su VPC central
para el acceso a internet desde todas las demás VPC.** Dejame traerlo acá. **Están viendo data transfer charges
significativos**, **especialmente por OS updates y patches**.

**Sí, ese es un patrón común.** **Centralizar el egress a internet a través de un NAT gateway compartido**, pero
**esos data transfer costs realmente se acumulan**. **¿Qué opciones consideraron?**

Bueno, **un equipo sugirió poner un NAT gateway en cada VPC** en vez de compartir uno central.

**Bueno, eso reduciría el tráfico cross-VPC, pero probablemente costaría más en total**, ya que **estarían
pagando por múltiples NAT gateways** y además **seguirían incurriendo en los mismos cargos de transferencia de
datos a internet**.

**Ese es un buen punto.** **Otro equipo sugirió usar VPC interface endpoints para servicios comunes para
bypasear el NAT gateway por completo.**

**Los interface endpoints ayudarían para servicios de AWS, pero todavía necesitan acceso a internet para OS
updates y patches**, y **los interface endpoints tienen sus propios cargos por hora**.

**¿Qué tal usar S3 gateway endpoints?** Podríamos **subir las actualizaciones y parches a un bucket de S3** y
**moverlos por PrivateLink en vez de ir por internet público**.

**Eso se acerca bastante, pero agregar gateway endpoints no va a ayudar a menos que configuremos el ruteo para
usarlos realmente.** Creo que **podría ser más eficiente desplegar un gateway endpoint para S3 en la VPC central
y después configurar el ruteo del NAT gateway para dirigir el tráfico de S3 a través del gateway endpoint**.

**Sí. Ahora esto tiene sentido.** **El gateway endpoint es gratis** y, **al rutear el tráfico de S3 a través de
él en vez del NAT gateway, eliminamos esos data transfer charges por las actualizaciones y parches guardados en
S3**. Además **es más eficiente, porque el tráfico se queda dentro de la red de AWS**.

**Perfecto. Esto parece una gran solución. Llevémosla al cliente.** **Suena bien.**

*Duración del video: **2 minutos 17 segundos**.*

---

## 7. Qué gana en cada caso

| Si el escenario dice… | La respuesta es… | Y no… |
| --- | --- | --- |
| “Compartir recursos entre cuentas con **control central** y **sin duplicar**” | **AWS RAM** | IAM roles por cuenta |
| “Los equipos necesitan **acceder**, no compartir recursos” | **IAM Identity Center** | RAM |
| “**Failover automático** manteniendo **DNS**” | **Multivalue + health checks** | Latency/weighted con pesos manuales |
| “**IPs estáticas** y red global, sin importar el DNS” | **Global Accelerator** | Multivalue |
| “Bajar el costo de **parches** que ya están en **S3**” | **S3 gateway endpoint** | NAT por VPC |
| “El problema son **servicios de AWS** con mucho volumen” | **Interface endpoint** | Gateway endpoint |
| “Ya creé el endpoint y **no cambió nada**” | **Falta el ruteo** | Otro endpoint |

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **RAM** comparte los **recovery plans** de Route 53 ARC con **cuentas específicas** de la organización.
> 2. Con **Organizations**, hace falta **trusted access entre RAM y Organizations**.
> 3. **IAM Identity Center** gestiona **acceso de usuarios**, **no** resource sharing.
> 4. **IAM roles cross-account por plan** funcionan, pero **agregan overhead** (Security / Operational
>    Excellence).
> 5. **Active-active con failover automático y DNS** → **multivalue routing + health checks**.
> 6. **Latency-based o weighted** → **ajuste manual de pesos** cuando una región falla.
> 7. **Global Accelerator** da **static IPs** y red global, pero **no** es la respuesta si el requisito es
>    **seguir con DNS**.
> 8. **S3 gateway endpoint**: **gratis**, saca el tráfico del **NAT**, y **hay que configurar el ruteo**.
> 9. **Gateway endpoint ≠ PrivateLink**: el gateway usa **route table**; PrivateLink es de los **interface
>    endpoints**.
> 10. **NAT por VPC** no baja el costo: **multiplica los NAT gateways** y mantiene el **egreso a internet**.

> [!warning] Trampa clásica del examen
> Escenario: “hay **failover automático** y **se mantiene DNS**”. La respuesta **no** es **latency-based con
> pesos** (eso es manual) ni **Global Accelerator** (cambia el modelo de entrada). Es **multivalue con health
> checks**.
>
> Y en costos: si el enunciado dice “los parches ya están en **S3**”, la respuesta es **gateway endpoint + ruta**,
> no **interface endpoint** ni **más NAT gateways**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[AWS Resource Access Manager (RAM) Solutions]] — el mecanismo del caso 1, en detalle
- [[VPC Endpoints]] — gateway vs. interface, y por qué el gateway es gratis
- [[AWS PrivateLink Components]] — el “over PrivateLink” que el caso 3 dice de más
- [[Finished Architecture - Networking]] — el diseño que estos casos ajustan
- [[Architecting for Cost - Networking]] — egreso, NAT y transferencia entre VPC
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]] — el pilar del caso 3
- [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]] — el pilar del caso 2
- Siguiente paso del módulo: [[Activity - Architecture Challenge - Networking]] — la evaluación del módulo

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 11 completa: tres BuildingBlocks (RAM, routing global, costo de NAT) | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **El título y la introducción del caso 1 no coinciden con el video.** La sección se llama **“Cross-Region
   Communication”** y la introducción describe **IPs solapadas, Transit Gateway con NAT y exposición pública**;
   el video habla de **Route 53 Application Recovery Controller** y **recovery plans compartidos con RAM**. Se
   registra y se sigue el **contenido del video**.
2. **“create a resource share for the region, switch plans”** está mal transcripto: se comparten **los recovery
   plans**, no un “share por región”.
3. **El caso 3 dice “move them over PrivateLink”**: un **gateway endpoint no usa PrivateLink**. Se transcribe
   literal y se corrige en §4.
4. **El caso 3 dice “configure the NAT gateway routing”**: el ruteo se configura en la **route table** de la VPC
   hacia el **gateway endpoint**; el NAT se **bypassea**.
5. **El caso 2 tiene dos duraciones idénticas** (2 min 38 s) con el caso 1; se conserva el dato tal como viene.
6. **No hay imágenes ni diagramas** en esta lección.
7. **No hay Knowledge Check**: son tres videos, sin cierre evaluativo.
8. **La fuente no da cifras** de ahorro ni de costo de NAT: no se agregaron.

**Decisiones de transcripción:**

- Se conservan **Route 53 Application Recovery Controller**, **recovery plan**, **resource share**, **trusted
  access**, **weighted routing**, **latency-based routing**, **multivalue routing**, **health check**, **Global
  Accelerator**, **static IPs**, **NAT gateway**, **interface endpoint** y **S3 gateway endpoint**.
- Las **duraciones** se transcriben literales: **2:38**, **2:38** y **2:17**.
- Los **diálogos** se traducen completos, incluidas las muletillas, porque el valor del caso está en **cómo se
  descarta** cada opción.
