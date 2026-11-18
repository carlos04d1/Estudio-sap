---
title: "Gathering the Customer Requirements - Networking"
aliases:
  - "Gathering the Customer Requirements (Networking)"
  - "Relevamiento de requisitos - Networking"
  - "Requisitos del cliente - Networking"
  - "Caso gaming: requisitos de red"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - requisitos
  - gaming
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# Gathering the Customer Requirements - Networking

> [!abstract] Qué es este archivo
> Primera lección del módulo **Designing Advanced Network Architectures**. Todavía no hay arquitectura: hay una
> **reunión con el cliente** y una lista de requisitos.
>
> El caso: una **plataforma de gaming** que suma títulos y regiones, sostenida sobre **VPC peering punto a punto**
> y **servicios compartidos duplicados en cada región**. De esta conversación salen los **cinco requisitos** que
> el resto del módulo va a resolver con **AWS Transit Gateway**, **AWS Resource Access Manager** y
> **AWS PrivateLink**.
>
> Duración del video: **3 min 39 s**.

> [!quote] La regla de oro
> “Siempre empiezo por entender el **contexto de negocio** antes de tirarme a la **solución técnica**.”
> — Joe Gallagher

---

## Resumen en una frase

> Una plataforma de gaming que crece en **títulos** y en **regiones** necesita **dejar la malla de peering punto a
> punto** y **centralizar los servicios compartidos**, sin perder **segmentación**, **performance** ni control de
> **costos**.

---

## 1. El caso

| Aspecto | Situación |
| --- | --- |
| **Negocio** | Plataforma de **gaming** con crecimiento significativo |
| **Qué está pasando** | Suma **nuevos títulos** y se expande a **varias regiones** |
| **Cómo conecta hoy** | **VPC peering punto a punto** |
| **Servicios compartidos** | **Duplicados en cada región**: autenticación, logging, observabilidad |
| **Enrutamiento de jugadores** | **Route 53 latency-based routing** hacia la región más cercana |
| **Qué pide** | Que la arquitectura **escale sin sumar complejidad operativa** |

**Lo que el cliente no dice, pero se escucha de fondo:** el problema no es “falta una región más”. Es que **no hay
un lugar central** donde conectar, observar y aplicar política. Cada región es un mundo aparte.

---

## 2. Los dolores, ordenados por causa

| Síntoma | Causa raíz | Consecuencia |
| --- | --- | --- |
| Autenticación, logging y observabilidad **separados** en cada región | Los servicios compartidos se **duplican** por región | Overhead operativo y **deriva** de configuración entre regiones |
| El failover se comporta **distinto cada vez** | Los servicios compartidos **no están sincronizados** | La recuperación “existe” en el papel, pero **no es confiable** |
| Cada **título** o **tenant** nuevo obliga a tocar conexiones | **Peering punto a punto**, sin hub | Onboarding cada vez más lento y más frágil |
| Las regiones operan **aisladas** | No hay **hub** para tráfico **VPC a VPC** ni **cross-region** | No hay un punto único de política, ruteo ni observación |
| Duplicar todo **cuesta** | Cada región paga su **copia** de cada servicio | El costo crece con la cantidad de regiones, no con el uso |

> [!important] El síntoma que más pesa
> El **failover inconsistente** no se arregla con más regiones: se arregla **sincronizando** lo que hoy está
> duplicado. Es el requisito que descarta las soluciones “agregar otra copia”.

> [!note] Ampliación (no está en la fuente)
> La malla de peering crece como **n(n−1)/2** conexiones para **n** VPC. Con 10 VPC son **45** conexiones; con 50,
> **1.225**. Es la razón matemática por la que el peering punto a punto no escala: no es un problema de
> configuración, es de topología.

---

## 3. Los cinco requisitos de arquitectura

La fuente los presenta como **flashcards**: cada una enuncia un requisito y, al darla vuelta, propone una
solución. Los enunciados son estos:

| # | Requisito | Qué significa | Qué **no** significa |
| --- | --- | --- | --- |
| 1 | **Scalable networking architecture** | Sumar **títulos, tenants y regiones** sin reconfigurar la red | “Más conexiones punto a punto” |
| 2 | **Centralized shared services** | Una sola copia administrada de auth, logging y observabilidad, **accesible durante el failover** | “Todo en una región y que se arregle” |
| 3 | **Designed for failover** | La recuperación **se comporta igual siempre** y los servicios compartidos están **sincronizados** | “Tener un DR documentado” |
| 4 | **Network segmentation for security** | Las aplicaciones **no se hablan salvo que se permita explícitamente**; aislamiento entre entornos de juego y datos de jugadores | “Aislar cada región” o “confiar en el default” |
| 5 | **High performance** | Mantener la **latencia** que ya da Route 53 y **sostenerla** en failover | “Activo-activo en todas las regiones” |

> [!warning] El sexto requisito, sin número
> El **costo** aparece en toda la conversación, pero **no** está en la lista de cinco. Es una **restricción
> transversal**: el cliente quiere centralizar **justamente** porque duplicar es caro.
> En el examen, “optimizar costos” puede ser la condición que elimina la opción de **duplicar por región**.

---

## 4. El método: negocio primero, servicios después

El orden de la lección no es decorativo:

1. **Contexto de negocio** — qué hace la empresa y qué la está frenando.
2. **Dolores operativos** — dónde duele hoy, con nombres concretos.
3. **Requisitos de red** — qué necesita la red para dejar de doler.
4. **Restricciones** — seguridad, performance, crecimiento y costo.
5. **Recién ahí**, servicios.

Las preguntas que ordenaron la reunión, por dominio:

| Dominio | Pregunta que se hizo | Lo que reveló |
| --- | --- | --- |
| **Operación** | ¿Qué se mantiene **por región**? | Auth, logging y observabilidad **triplicados** |
| **Red** | ¿Cómo se conectan las VPC **hoy**? | **Peering punto a punto**, sin hub |
| **Seguridad** | ¿Pueden hablar dos juegos entre sí? | Solo si se **permite explícitamente** |
| **Performance** | ¿Cómo llega el jugador? | **Route 53 latency** funciona; el riesgo está en los **shared services** |
| **Crecimiento** | ¿Qué viene? | **Más títulos** y **más regiones** en los próximos meses |
| **Costo** | ¿Cuánto cuesta la copia? | Duplicar es **caro** y además **no resuelve** el failover |

> [!important] Por qué importa el orden
> Si arrancás por el servicio, después **justificás** la elección que ya tomaste. El examen está lleno de
> enunciados donde la opción “moderna” respeta cuatro requisitos y **falla el quinto**.

---

## 5. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 4** y se cierra con la **7**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el detalle textual de la conversación, o (c) antes
> del examen querés chequear que no se escapó un matiz.

### 5.1 Video principal (transcripción)

Hola a todos. Hoy quiero mostrarles mi **proceso de relevamiento de requisitos** para una plataforma de **gaming**
fascinante que está creciendo de forma significativa.

Siguiendo nuestra **regla de oro de la arquitectura**, siempre empiezo por **entender el contexto de negocio**
antes de meterme en **soluciones técnicas**.

Hace poco me reuní con el **equipo de liderazgo** de la plataforma para hablar de sus **desafíos de
escalamiento**. Están sumando **nuevos títulos de juegos** y expandiéndose a **varias regiones**, y eso expuso
algunos **dolores de crecimiento** en su arquitectura. Su **preocupación principal** es que el enfoque actual
—**VPC peering punto a punto** y **duplicación de servicios compartidos en cada región**— se vuelve cada vez más
**difícil de administrar**.

Durante la discusión inicial nos enfocamos en sus **desafíos operativos**. Me explicaron que mantener **sistemas
de autenticación, infraestructura de logging y herramientas de observabilidad separados en cada región** genera
**overhead significativo** y, lo más preocupante, están viendo **comportamientos inconsistentes durante los
escenarios de failover**, porque esos **servicios compartidos no están sincronizados** correctamente entre
regiones.

Después nos metimos en sus **necesidades de red**. Hoy sus regiones **operan de forma independiente**, sin ningún
**hub central** para tráfico **VPC a VPC** ni **cross-region**. A medida que incorporan **nuevos títulos y
tenants**, la complejidad de administrar todas esas **conexiones punto a punto** se vuelve abrumadora. Necesitan
un enfoque **más escalable** que **no exija reconfigurar** cada vez que agregan un componente nuevo.

Cuando hablamos de **seguridad**, remarcaron la importancia de una **segmentación de red adecuada**. Quieren
asegurarse de que las **aplicaciones de juego no puedan interactuar directamente entre sí** salvo que se **permita
explícitamente**. Eso es fundamental para mantener el **aislamiento entre los distintos entornos de juego** y
**proteger los datos de los jugadores**.

La **performance** y la **experiencia de usuario** son absolutamente críticas para el negocio. Hoy usan
**Route 53 latency-based routing** para dirigir a los jugadores a la **región más cercana**, y eso funciona bien,
pero les preocupa **mantener performance consistente en los servicios compartidos**, sobre todo durante los
**escenarios de failover**.

También exploramos sus **planes de crecimiento**. Esperan **lanzar varios títulos nuevos** en los próximos meses
y **expandirse a regiones adicionales**. Eso hace crucial diseñar una solución que **escale sin agregar
complejidad operativa**.

La **optimización de costos** es otra consideración clave. Su enfoque actual de **duplicar servicios compartidos**
en cada región no solo es **operativamente desafiante**, también es **costoso**. Buscan **centralizar** esos
servicios **manteniendo alta disponibilidad y performance**.

A partir de estas conversaciones, **identifiqué varios requisitos clave**:

- Necesitan una **arquitectura de red más escalable** que soporte el **onboarding fácil de nuevos juegos y
  regiones**.
- Necesitan **servicios compartidos centralizados** que **sigan accesibles durante los escenarios de failover**.
- Necesitan **segmentación de red adecuada** por seguridad.
- Y necesitan todo eso **manteniendo alta performance** y **controlando costos**.

En nuestra **próxima sesión** les voy a mostrar cómo podemos **resolver estos requisitos** usando **AWS Transit
Gateway**, **Resource Access Manager** y **Private Link** para crear una arquitectura **más escalable y más
manejable**. Vamos a ver cómo estos servicios ayudan a **simplificar el diseño de red**, **mejorar la
confiabilidad** y **reducir el overhead operativo**.

*Duración del video: **3 minutos 39 segundos**.*

**— Joe Gallagher**

### 5.2 Flashcards: los requisitos de arquitectura

> [!note] La fuente no transcribe las propuestas
> La actividad dice: *revisá la información de cada flashcard, pensá qué solución propondrías y después dalas
> vuelta para ver mis propuestas*. **Las propuestas no vienen en el texto**: solo llegan los **cinco enunciados**
> que se transcriben abajo. No se reconstruyen.

Los cinco enunciados, literales:

1. **Scalable networking architecture.**
2. **Centralized shared services.**
3. **Designed for failover.**
4. **Network segmentation for security.**
5. **High performance.**

> [!note] Material no disponible
> La fuente referencia una imagen (`assets/images/47A9UDVK6R.jpeg`) que **no está en el vault**.

---

## 6. Del requisito al servicio (puente a la próxima sesión)

| Requisito | Servicio que la lección anticipa | Para qué |
| --- | --- | --- |
| **Scalable networking architecture** | **AWS Transit Gateway** | Hub de VPC a VPC y **cross-region** sin malla de peering |
| **Centralized shared services** | **AWS Resource Access Manager** | Compartir TGW y recursos entre cuentas sin duplicarlos |
| **Network segmentation for security** | **AWS PrivateLink** | Exponer un servicio **sin exponer la VPC** |
| **Designed for failover** | TGW + servicios centralizados **replicados con criterio** | Que el failover sea **consistente**, no una sorpresa |
| **High performance** | **Route 53 latency-based routing** (se conserva) | Mantener al jugador cerca y **sostenerlo** en failover |

> [!warning] No adelantarse
> Esto es **anticipo**, no la solución. La lección siguiente es la que define la arquitectura. Cuando se estudia,
> requisitos y decisiones de diseño **no se mezclan**.

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Negocio → requisitos → arquitectura.** El enunciado describe el negocio; la respuesta correcta respeta
>    **todas** las restricciones, no la que suena más moderna.
> 2. **Peering punto a punto no escala**: cada componente nuevo exige **reconfigurar**. La señal en el examen es
>    “sin agregar complejidad operativa” → **hub-and-spoke**, no malla.
> 3. **Duplicar servicios compartidos por región** genera **costo**, **deriva de configuración** y **failover
>    inconsistente**. Centralizar ataca los tres a la vez.
> 4. **Failover no es “tener otra región”**: es que los **servicios compartidos estén sincronizados** y
>    **accesibles** durante el cambio.
> 5. **Segmentación = allow-list.** Las aplicaciones **no se hablan salvo que se permita explícitamente**.
> 6. **Route 53 latency-based routing** resuelve “el más cercano”, **no** la consistencia de los shared services.
> 7. **El costo es requisito aunque no esté en la lista.** Si el enunciado dice “reducir overhead y costo de
>    duplicar”, la opción de **replicar todo** queda descartada.
> 8. **Onboarding repetible**: sumar título o región **sin tocar la topología**.
> 9. Los servicios que resuelven el caso son **Transit Gateway** (hub), **RAM** (compartir) y **PrivateLink**
>    (exponer).

> [!warning] Trampa clásica del examen
> Escenario: “la empresa quiere mejorar la performance y la disponibilidad de sus servicios compartidos”.
> La respuesta **no** es **multi-región activo-activo**: primero hay que **centralizar y sincronizar**. Duplicar
> otra vez es lo que justamente está causando el **failover inconsistente**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[Gathering the customer REquirements]] — la misma lección en el módulo Multi-Account, con otro caso (e-commerce)
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — servicios compartidos entre cuentas
- [[1.3 Diseñar arquitecturas fiables y resistentes]] · [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]] — el requisito de failover
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — el requisito de performance
- [[Architecting for Cost - Networking]] — el costo de duplicar y de transferir
- Siguiente paso del módulo: [[VPC Connectivity]] — el hub administrado que resuelve la malla de peering

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 01 completa: caso de gaming, cinco requisitos y transcripción del video | Nota completa (secciones 1–7) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Las flashcards no traen sus propuestas.** Solo llegan los **cinco enunciados**. Se transcriben y se marca el
   vacío; no se reconstruyen soluciones que la fuente no da.
2. **La imagen de la actividad no está en el vault** (`47A9UDVK6R.jpeg`).
3. **La lección no trae Knowledge Check.** Termina con el anticipo de la próxima sesión.
4. **“Private Link” aparece separado** en la transcripción. Se conserva el nombre correcto, **AWS PrivateLink**.
5. **El costo no figura en la lista de cinco requisitos**, pero recorre toda la conversación. Se trata como
   **restricción transversal** y se aclara en §3.

**Decisiones de transcripción:**

- Se conservan **VPC peering**, **latency-based routing**, **shared services**, **failover**, **segmentation**,
  **Transit Gateway**, **Resource Access Manager** y **PrivateLink**.
- El nombre del arquitecto se transcribe tal cual: **Joe Gallagher**.
- **No se agregaron** cifras de latencia, cantidad de regiones ni precios que la fuente no da.
