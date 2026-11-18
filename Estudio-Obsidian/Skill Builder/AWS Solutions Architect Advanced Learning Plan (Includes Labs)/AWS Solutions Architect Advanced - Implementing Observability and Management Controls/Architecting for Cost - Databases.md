---
title: "Architecting for Cost - Databases"
aliases:
  - "Architecting for Cost: Databases"
  - "Arquitectura de costos: bases de datos"
  - "Database cost optimization"
  - "Optimización de costos de bases de datos"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - costos
  - bases-de-datos
  - rds
  - dynamodb
  - aurora
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Architecting for Cost - Databases"
---

# Architecting for Cost - Databases

> [!abstract] Qué es este archivo
> Lección de costos de **bases de datos**. Cierra la trilogía de arquitectura de costos del módulo
> (**compute → red → storage**) con el rubro que suele combinar **cómputo, storage y licencias** en una sola
> factura.
>
> Cubre **DynamoDB global tables** y su pricing, el **caching con ElastiCache** (hit/miss y TTL),
> **Redshift provisioned vs. serverless**, los **modelos de reserva** por servicio (RDS/Aurora/Redshift,
> ElastiCache y DynamoDB) y un **caso numérico completo** con y sin Reserved Instance.

> [!quote] La idea que hay que retener
> **La base de datos es el componente más caro de “apagar” y el más caro de “sobredimensionar”.**
> La lección lo abre así: *“los costos de bases de datos pueden impactar significativamente el gasto total”*;
> por eso hay que diseñar soluciones **performantes y confiables, pero también costo-efectivas**.

---

## Resumen en una frase

> Optimizar bases de datos es **elegir el motor y el modo de capacidad correctos**, **sacar presión de lectura con
> caché**, **reservar lo estable** (1 o 3 años, con el pago adelantado que convenga) y **escalar a serverless** lo
> impredecible.

---

## 1. El mapa de la lección

| Servicio | Eje de costo que trata la lección |
| --- | --- |
| **Amazon DynamoDB** | **Global tables** (réplicas multi-Región) y **Reserved Capacity** |
| **Amazon ElastiCache** | **Caching** para **reducir capacidad** de la base y **Reserved Nodes** |
| **Amazon Redshift** | **Provisioned vs. serverless** |
| **Amazon RDS / Aurora** | **Reservation models** (1 o 3 años, 3 formas de pago) |

> [!important] No son cuatro temas sueltos
> Cada servicio muestra una **palanca distinta**: **DynamoDB** = **capacidad y replicación**; **ElastiCache** =
> **evitar llegar a la base**; **Redshift** = **modo de aprovisionamiento**; **RDS/Aurora** = **compromiso de
> plazo**. En el examen, la pregunta suele nombrar el síntoma y esperar **la palanca**, no el servicio.

---

## 2. Amazon DynamoDB global tables

### 2.1 Qué es

Una **global table** está compuesta por **múltiples replica tables**:

| Propiedad | Detalle |
| --- | --- |
| **Ubicación** | Cada réplica **en una Región distinta** |
| **Nombre y primary key** | **Iguales en todas** las réplicas |
| **Escritura** | Se puede **escribir en cualquier réplica** |
| **Replicación** | DynamoDB **replica automáticamente** a **todas las demás** réplicas de la global table |
| **Para qué** | Aplicaciones **massively scaled** con **usuarios dispersos globalmente** que esperan **performance muy rápida** |

> [!important] Activo-activo, no “primary + réplica de lectura”
> La fuente dice **“write to any replica”**. Eso implica **multi-master**: no hay una Región “principal”.
> El beneficio es **latencia local de escritura**; el costo es **replicar cada escritura a todas las Regiones**.

### 2.2 Ejemplo de pricing (literal)

**Arquitectura:** una tabla DynamoDB **On-Demand** que entrega ítems a una aplicación con **usuarios globales**,
más **tres global tables adicionales**. **Todas las tablas son de una sola cuenta de AWS**, lo que facilita
**escribir en una réplica** y tener el dato en **otras Regiones en milisegundos**.

| Parámetro | Valor |
| --- | --- |
| **Región de la tabla** | **US East (N. Virginia)** |
| **Dataset** | **29 GB** |
| **Capacidad On-Demand** | **4 millones de reads** y **4 millones de writes** |
| **Global tables** | **US West (Oregon)**, **Asia Pacific (Singapore)** y **Europe (London)** |
| **Costo On-Demand de DynamoDB** | **$61.838 por mes**\* |

**Detalle del cálculo:** dataset de **29 GB**, con **promedio mensual de 4 millones de writes** y **la misma
cantidad de reads**. Además, **tres global tables** con **writes replicados similares por mes**, lo que da un
cargo de **$61.838**.

**Qué mueve el precio de una global table:**

- **Región** (se cobra **por millón de replicated write request units**).
- **Data storage**.
- **Data backups**.
- **Data transfer out**.

> **Vigencia declarada:** *“Pricing as of **May 2023**”*.

> [!warning] Ambigüedad del número en la fuente
> La lectura escribe **“$61.838”** sin aclarar si el punto es **separador de miles** o **decimal**. Por el orden
> de magnitud del ejemplo (**29 GB** y **8 millones de operaciones**), lo razonable es leerlo como
> **61,838 USD** (unos **sesenta y un dólares con ochenta y cuatro centavos**), no como **61.838 USD**. Se
> transcribe **literal** y se registra en §10.

> [!tip] Regla de diseño
> Una **global table** se justifica cuando el requisito es **latencia de escritura local** en varias Regiones. Si
> solo se necesita **leer cerca del usuario**, una **réplica de lectura** o caché puede salir **mucho más
> barata** que replicar **todas las escrituras**.

---

## 3. Caching con ElastiCache

### 3.1 Concepto

**ElastiCache cachea datos como pares key-value.** Una aplicación puede:

| Operación | Cómo |
| --- | --- |
| **Recuperar** | Pedir **el valor correspondiente a una key** |
| **Guardar** | Especificar **key**, **value** y un **tiempo de expiración** llamado **TTL** |

**TTL** es un **valor entero** que especifica **la cantidad de segundos hasta que la key expira**.

**Motores:** **Redis** o **Memcached**.

**Para qué:** que la aplicación **obtenga información de un almacén en memoria rápido** en lugar de hacer
**requests repetidos a una base de datos más lenta y más costosa**.

> [!important] El ahorro no es “la caché”: es **la base más chica**
> La fuente lo dice directo: *“reducir la capacidad de tu base de datos física significa que podés optimizar con
> el tiempo para ajustarte mejor a los costos planeados”*. La caché **absorbe lecturas** → baja la **capacidad
> necesaria** → baja la **factura de la base**.

### 3.2 Cache hit y cache miss

| Evento | Qué pasa |
| --- | --- |
| **Cache hit** | El dato **está disponible y con TTL vigente** → ElastiCache **entrega el dato** a la aplicación |
| **Cache miss** | El dato **no está** en el nodo **o el TTL expiró** → la aplicación **consulta la base** |

**En el miss:** para **prepararse para requests repetidos** del mismo dato, ElastiCache **replica el dato en todos
los nodos** y **actualiza los TTL**.

> **Estrategia:** es **una** de las formas de **reducir capacidad de la base**, **monitoreando y midiendo el uso de
> la caché** para **mejorar la eficiencia de costo**.

> [!tip] La métrica que decide
> Un **hit ratio bajo** significa que se está pagando **caché + base** y aprovechando solo la base. Antes de
> agrandar la caché hay que **medir**: si el patrón de acceso es muy disperso, la caché **no** va a ahorrar.

> [!note] Ampliación (no está en la fuente)
> **Redis** ofrece estructuras de datos, persistencia y réplicas; **Memcached** es **caché simple y multi-hilo**,
> sin persistencia. La fuente **no compara** los motores: solo los nombra.

---

## 4. Amazon Redshift: provisioned vs. serverless

**Qué ofrece:** **ambas opciones**, lo que hace **más eficiente correr y escalar analítica** sin **gestionar el
data warehouse**.

| Opción | Cómo funciona | Cuándo |
| --- | --- | --- |
| **Serverless** | Se **crea un endpoint Redshift Serverless** y **aprovisiona el data warehouse automáticamente en segundos** | **Carga variable o impredecible**; evitar administrar clústeres |
| **Provisioned** | Se elige y administra la capacidad | **Workloads predecibles** |

**La comparación de la figura** entre provisioned y serverless se basa en **caso de uso**, **tipo de workload** y
**optimización de costos**.

> [!important] La misma lógica que compute
> **Predecible → provisioned** (y con reserva, si aplica). **Impredecible o intermitente → serverless**. Pagar un
> clúster encendido para una consulta ocasional es el equivalente analítico de dejar una instancia EC2 corriendo
> sin tráfico.

---

## 5. Modelos de reserva

**Idea general:** **comprometer parámetros de uso** al momento de la compra para **obtener una tarifa por hora más
baja**. Se puede reservar **1 o 3 años** a cambio de un **descuento**, con **tres formas de pago**:

1. **No upfront**
2. **Partial upfront**
3. **All upfront**

### 5.1 RDS, Aurora y Redshift

| Aspecto | Detalle |
| --- | --- |
| **Compromiso** | **Parámetros de uso** de la instancia al comprar |
| **Beneficio** | **Menor tarifa por hora** |
| **Plazo** | **1 o 3 años** |
| **Pago** | **No upfront**, **Partial upfront**, **All upfront** |
| **Restricción** | **No upfront solo está disponible a 1 año** |

> [!important] La restricción que se pregunta
> **No upfront = 1 año**. Si la opción ofrece **No upfront a 3 años** para **RDS/Aurora/Redshift**, es
> **incorrecta**. **Partial** y **All upfront** sí admiten **1 o 3 años**.

### 5.2 ElastiCache: Reserved Nodes

| Aspecto | Detalle |
| --- | --- |
| **Nombre** | **Reserved Node** |
| **Plazo** | **1 a 3 años** |
| **Pago** | **No upfront**, **Partial upfront** o **All upfront**, **en los tres plazos** |

**Cómo se aplica en la factura:**

- El sistema **aplica primero las tarifas de Reserved Cache Node** para **minimizar costos**.
- Un **cache node hour** se cobra **a tarifa On-Demand** **solo cuando la cantidad de nodos que corren en esa
  hora supera** la cantidad de **Reserved Nodes** que se poseen.

> [!warning] Diferencia fina con RDS
> En **ElastiCache**, **No upfront admite 1 o 3 años**; en **RDS/Aurora/Redshift**, **No upfront es solo a 1
> año**. Es el tipo de detalle que separa dos respuestas “parecidas” en el examen.

### 5.3 DynamoDB: capacidad y Reserved Capacity

**Dos decisiones distintas:**

| Decisión | Qué implica |
| --- | --- |
| **Provisioned Capacity** | **Especificar** las **read y write capacity** que la aplicación va a necesitar |
| **Reserved Capacity** | **Pago único upfront** + **compromiso de tarifa horaria** por **RCUs y WCUs** durante el **plazo** de la reserva |

**Excedente:** **cualquier capacidad provisionada por encima de la reservada** se factura a **tarifas estándar de
provisioned capacity**.

**Definiciones literales:**

| Unidad | Definición |
| --- | --- |
| **RCU** | Cada **API call para leer** datos de la tabla es un **read request** |
| **WCU** | Cada **API call para escribir** datos en la tabla es un **write request** |

> [!important] Reserved Capacity ≠ global tables
> **Reserved Capacity** es un **descuento sobre throughput provisionado**; **global tables** es **replicación
> multi-Región**. Son ejes **independientes**: se puede tener una global table **On-Demand** (como el ejemplo de
> §2.2) o **provisionada con reserva**.

---

## 6. Caso numérico completo

**Escenario:** un **sitio de campaña de marketing de un año** que **procesa y sirve contenido dinámico**.

| Componente | Configuración |
| --- | --- |
| **Cómputo** | **Amazon EC2 c7g.large** al **100 % de uso** |
| **Base de datos** | **Amazon RDS db.m6g.large** con **MySQL** |
| **Storage de la base** | **20 GB** |
| **Contenido estático** | **Amazon S3** con **2.300 GB** almacenados y **200 GB** servidos **por mes** |

### 6.1 Con RDS On-Demand

| Ítem | Costo mensual |
| --- | --- |
| **EC2 c7g.large (100 %)** | **$52,93** |
| **S3 (2.300 GB + 200 GB de transferencia)** | **$70,90** |
| **RDS On-Demand (MySQL db.m6g.large, 20 GB)** | **$113,26** |
| **Total mensual** | **$237,09** |
| **Total anual** | **$2.845,08** |

### 6.2 Con RDS Reserved Instance (1 año, partial upfront)

Mismos **EC2** y **S3**; se cambia la instancia RDS por una **reservada del mismo tamaño**.

| Ítem | Costo mensual |
| --- | --- |
| **EC2 c7g.large (100 %)** | **$52,93** |
| **S3 (2.300 GB + 200 GB de transferencia)** | **$70,90** |
| **RDS Reserved Instance 1 año partial upfront (MySQL db.m6g.large, 20 GB)** | **$36,17** |
| **Total mensual** | **$160,00** |
| **Pago único (one-time fee)** | **$406,00** |
| **Total anual** | **$2.326,00** |

### 6.3 Lectura del resultado

| Métrica | Valor |
| --- | --- |
| **Ahorro anual** | **$2.845,08 − $2.326,00 = $519,08** |
| **Reducción** | **18 %** (según la fuente) |
| **Cómo bajarlo más** | **3 años** y **all upfront** |

> [!warning] El “mensual” de la RI no es todo el costo
> Los **$36,17/mes** de la instancia reservada **no incluyen** el **pago único de $406**. El **total anual** de
> **$2.326** sí lo incluye: **($36,17 × 12) + $406 + EC2 + S3 = $2.326**. Comparar **solo** los mensuales
> (**$160 vs. $237,09**) **exagera** el ahorro.

> [!note] Ampliación (no está en la fuente)
> Verificación propia: **$519,08 / $2.845,08 ≈ 18,24 %**, consistente con el **18 %** que declara la fuente. El
> **18 %** es el ahorro **del sitio completo**, no solo de la base; el ahorro de la base es **mucho mayor**
> (**$113,26 → $36,17** mensual, aunque con el upfront).

---

## 7. Self-check de la lección

> **Pregunta:** ¿qué **opciones de pago** te permiten **reducir o eliminar** el costo **mensual de una instancia
> de base de datos reservada**? **(elegir 3)**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A. Partial** | ✅ | **Partial upfront** reduce el pago mensual (se adelanta una parte) |
| **B. Capacity reservation** | ❌ | Es una **compra de capacidad** (modelo de **DynamoDB/otros**), **no una forma de pago** de una instancia reservada |
| **C. All upfront** | ✅ | **All upfront** **elimina** el pago mensual (se paga todo al inicio) |
| **D. Spot Instance pricing** | ❌ | **Spot** aplica a **EC2** (y cargas tolerantes a interrupciones), **no** a **RDS** |
| **E. 1- and 3-year payment options** | ✅ | Los **plazos de 1 y 3 años** son los que habilitan la **tarifa reservada** con descuento |

> **Respuesta: A, C y E.**

> [!note] Sobre la fuente
> El self-check **no trae rationale oficial**. La justificación es **propia**, basada en §5.
>
> La pregunta tiene **defectos de redacción** que se registran en §10: **“No upfront”** —una de las tres formas de
> pago que enumera la lección— **no aparece** entre las opciones, y **E** describe **plazos**, no una **forma de
> pago**. La respuesta se deduce por **exclusión** de **B** y **D**.

---

## 8. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 8.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **DynamoDB global tables y capacidad** | **1.5** Costos y visibilidad · **2.6** Optimización para metas |
| **ElastiCache y reducción de capacidad** | **1.5** · **3.5** Oportunidades de optimización |
| **Redshift provisioned/serverless** | **2.6** · **3.5** |
| **Modelos de reserva** | **1.5** · **2.6** |
| **Caso numérico y TCO** | **1.5** · **3.5** |

### 8.2 Diez puntos para llevarse

1. **Global table** = **réplicas en varias Regiones**, **mismo nombre y primary key**, **escritura en cualquiera**,
   **replicación automática**.
2. **Ideal** para **millones de usuarios dispersos** con **latencia muy baja**.
3. **Pricing de global tables**: **por millón de replicated write request units**, **según Región**, más
   **storage**, **backups** y **data transfer out**.
4. **ElastiCache** = **key-value** con **TTL en segundos**; **Redis** o **Memcached**.
5. **Hit** = dato vigente en caché; **miss** = no está o **expiró** → va a la base y **se replica a todos los
   nodos**.
6. **El ahorro real** es **reducir la capacidad de la base**, no solo “tener caché”.
7. **Redshift**: **serverless** aprovisiona **en segundos**; **provisioned** para **cargas predecibles**.
8. **Reservas**: **1 o 3 años**, **No / Partial / All upfront**; **No upfront solo 1 año** en **RDS/Aurora/
   Redshift**.
9. **ElastiCache Reserved Nodes** se aplican **primero**; el **On-Demand** solo cubre el **excedente**.
10. **DynamoDB Reserved Capacity** = **upfront + hourly** por **RCU/WCU**; el **exceso** va a **tarifa estándar**.
    En el caso: **$237,09 → $160/mes**, **$2.845,08 → $2.326/año**, **18 %**.

### 8.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “La global table tiene una Región primaria” | **Se escribe en cualquiera**; **no hay primaria** |
| “Global tables no replican writes” | Replican **cada escritura** a **todas** las réplicas |
| “ElastiCache elimina la base” | **Reduce** la capacidad necesaria; la base sigue existiendo |
| “TTL se expresa en minutos” | Es un **entero en segundos** |
| “Un cache miss actualiza solo ese nodo” | ElastiCache **replica en todos los nodos** y **actualiza TTL** |
| “Redshift serverless es para cargas predecibles” | **Provisioned** es para **predecible**; serverless para lo **variable** |
| “No upfront admite 3 años en RDS” | **Solo 1 año** en **RDS/Aurora/Redshift** |
| “ElastiCache no tiene reservas” | Tiene **Reserved Nodes**, con **1–3 años** y **3 formas de pago** |
| “Reserved Capacity de DynamoDB cubre cualquier exceso” | El **exceso** se cobra a **tarifa estándar** |
| “Spot sirve para RDS” | **Spot es de EC2**; RDS no usa Spot |

> [!note] Ampliación (no está en la fuente)
> Tres atajos:
> **“¿Usuarios en varias Regiones que escriben?”** → **global tables** ·
> **“¿Lecturas repetidas y base cara?”** → **ElastiCache** (y medir **hit ratio**) ·
> **“¿Carga estable por años?”** → **Reserved Instance** (mejor **all upfront y 3 años** si el flujo de caja lo
> permite).

---

## 9. Traducción del contenido

### 9.1 Introducción

Los **costos de bases de datos** pueden **impactar significativamente el gasto total en la nube**. Como
**arquitectos de nube**, es crucial **entender cómo diseñar y gestionar soluciones de bases de datos** que sean no
solo **performantes y confiables**, sino también **costo-efectivas**.

En esta lección explorás **estrategias de optimización de costos** a través del **diverso portafolio de bases de
datos de AWS**, incluyendo **RDS, DynamoDB, Aurora** y **otras bases purpose-built**.

### 9.2 Amazon DynamoDB global tables

Una **global table** de DynamoDB está **compuesta por múltiples replica tables**. Cada **replica table** existe
**en una Región distinta**, pero **todas las réplicas tienen el mismo nombre y la misma primary key**. Cuando se
**escribe** en **cualquier replica table**, DynamoDB **replica automáticamente** esos datos a **todas las demás
replica tables** de la global table. Las **global tables** son ideales para **aplicaciones massively scaled** con
**usuarios dispersos globalmente** que **esperan performance muy rápida**.

**Ejemplo de pricing de DynamoDB global tables**

En este ejemplo hay una **tabla DynamoDB On-Demand** usada para **entregar data items** a una aplicación usada por
**usuarios globalmente dispersos**. Hay **tres global tables adicionales** para ayudar con la **base de usuarios
global**. **Todas las tablas pertenecen a una sola cuenta de AWS**, lo que **facilita escribir en una réplica** y
tener **los mismos datos disponibles en otras Regiones en milisegundos**.

**Parámetros para el cálculo de costo** de la arquitectura del ejemplo:

- **DynamoDB: US East (N. Virginia)**
- **Tamaño del dataset: 29 GB**
- **Capacidad on-demand: 4 millones de reads y 4 millones de writes**
- **Global tables: US West (Oregon), Asia Pacific (Singapore) y Europe (London)**
- **Costos On-Demand de DynamoDB: $61.838 por mes\***

El **dataset** está fijado en **29 GB**, con un **promedio mensual de 4 millones de writes** y **la misma
cantidad de reads**. Además hay **tres global tables adicionales** con **writes replicados similares por mes**, lo
que resulta en un **cargo de $61.838**.\*

El **pricing de global tables varía según la Región** **por millón de replicated write request units**. Los
**costos de data storage, data backups y data transfer out** también **afectan** el pricing de global tables.

\***Pricing as of May 2023.**

### 9.3 Caching de base de datos con ElastiCache

**ElastiCache** cachea datos como **pares key-value**. Una aplicación puede **recuperar un valor correspondiente a
una key específica**, o **guardar un ítem en la caché** especificando **key, value y un tiempo de expiración**
conocido como **Time-To-Live (TTL)**. **TTL** es un **valor entero** que especifica **la cantidad de segundos
hasta que la key expira**.

Elegí entre **Redis** y **Memcached** como **motores de ElastiCache** para permitir que tu aplicación **obtenga
información de un almacén de datos en memoria rápido** en lugar de **hacer requests repetidos a una base de datos
más lenta y más costosa**.

**Reducir la capacidad de tu base de datos física** significa que podés **optimizar con el tiempo** para
**ajustarte mejor a tus costos planeados**.

> **Figura:** **Cache hit** se refiere a **devolver la respuesta desde ElastiCache**. **Cache miss** se refiere a
> la **ausencia del dato requerido en ElastiCache**, lo que **resulta en acceso a la base de datos**.

En este ejemplo, una aplicación **pide información a la nube**. La aplicación **primero consulta un clúster de
ElastiCache** por el dato. Si el dato **está disponible y tiene un TTL vigente**, resulta en un **Cache hit**, con
**ElastiCache entregando el dato** a la aplicación.

Un **Cache miss** ocurre cuando la aplicación **pide algo que no está disponible en un nodo de caché** o **cuyo
TTL expiró**. La aplicación entonces **pide la información a la base de datos**. Para **prepararse para requests
adicionales del mismo dato**, **ElastiCache replica el dato en todos los nodos** y **actualiza los TTLs**.

Esta es **una estrategia de caching** usada para **reducir la capacidad de una base de datos**, **monitoreando y
midiendo el uso de la caché** para **mejorar la eficiencia de costo**.

### 9.4 Optimización de Amazon Redshift

**Amazon Redshift** ofrece tanto **opciones provisioned como serverless**, lo que **facilita correr y escalar
analítica** **sin tener que gestionar el data warehouse**. Podés **crear un nuevo endpoint de Amazon Redshift
Serverless** para **aprovisionar automáticamente el data warehouse en segundos**, o elegir la **opción
provisioned** para **workloads predecibles**.

> **Figura:** la comparación entre **workloads provisioned y serverless** en **Amazon Redshift** se basa en el
> **caso de uso**, el **tipo de workload** y la **optimización de costos**.

### 9.5 Modelos de reserva

Los **modelos de reserva** permiten **comprometer parámetros de uso de la instancia** al momento de la compra
para **lograr una tarifa horaria más baja**. Tenés la opción de **reservar la instancia por un plazo de 1 o 3
años** a cambio de un **descuento**. Se te dan **tres opciones de pago**: **No upfront**, **Partial upfront** o
**All upfront**.

**Amazon RDS, Aurora y Amazon Redshift**

Los **modelos de reserva** de servicios de bases de datos como **RDS, Aurora y Redshift** son un **concepto de
AWS** que permite **comprometer parámetros de uso de la instancia** al momento de la compra para **lograr una
tarifa horaria más baja**.

Tenés la opción de **reservar la instancia por 1 o 3 años** a cambio de un **descuento**. Se te dan **tres
opciones de pago**: **No upfront**, **Partial upfront** o **All upfront**. La opción **No upfront** está
disponible **solo para un plazo de 1 año**.

**ElastiCache**

**ElastiCache** tiene **pricing similar**, con **opciones de plazos de 1 a 3 años** y **elecciones de pago no
upfront, partial upfront o all upfront**. Esta **opción de reserva** se llama **Reserved Node**. Al **calcular tu
factura**, nuestro sistema **aplicará automáticamente primero las tarifas de Reserved Cache Node** para
**minimizar tus costos**. Un **cache node hour** se cobrará a **tarifa On-Demand** **solo cuando el número total
de cache nodes que corrés en esa hora exceda el número de Reserved Nodes aplicables que poseés**.

**Términos de pago:**

- **No upfront** — plazo de **1 o 3 años**
- **Partial upfront** — plazo de **1 o 3 años**
- **All upfront** — plazo de **1 o 3 años**

**DynamoDB**

Tenés la opción de seleccionar **Provisioned Capacity**, que permite **especificar la read y write capacity** que
**esperás que tu aplicación requiera**. Para **aumentar aún más tus ahorros**, podés optar por **Reserved
Capacity**, **pagando un fee único upfront** y **comprometiéndote a pagar la tarifa horaria** por **read capacity
units (RCUs)** y **write capacity units (WCUs)** durante la **duración del plazo de la reserva**. Cualquier
**capacidad que provisiones por encima de tu capacidad reservada** se factura a **tarifas estándar de provisioned
capacity**.

**RCU:** cada **API call para leer datos** de tu tabla es un **read request**.

**WCU:** cada **API call para escribir datos** en tu tabla es un **write request**.

### 9.6 Ejemplo de costo de base de datos

**Introducción**

En este ejemplo, un **sitio web de campaña de marketing de un año** usa una **instancia Amazon EC2 c7g.large al
100 % de uso** para **procesar y servir su contenido dinámico**. También usa una **instancia Amazon RDS
db.m6g.large** como **base de datos** para **almacenar contenido dinámico**, mientras usa **Amazon S3** para
**almacenar 2.300 GB de contenido estático** y **servir 200 GB por mes**. El **gasto mensual** de este sitio es
**$237,09**, o **$2845 al año**.

**Amazon RDS On-Demand**

- **Instancia EC2: c7g.large al 100 % de utilización** — costo mensual = **$52,93**
- **Amazon S3: 2.300 GB de storage con 200 GB de transferencia** — costo mensual = **$70,90**
- **Amazon RDS On-Demand Instance: MySQL db.m6g.large, 20 GB de storage** — costo mensual = **$113,26**
- **Gasto mensual total: $237,09**
- **Gasto anual: $2845,08**

**Amazon RDS Reserved Instance**

Tomá el mismo ejemplo del **sitio de campaña de un año** que usa los **mismos componentes** (instancia **EC2
c7g.large**, **Amazon S3 2.300 GB** con **200 GB de transferencia**). Sin embargo, podés **cambiar la instancia
db.m6g.large de Amazon RDS** por una **instancia de base de datos RDS reservada del mismo tamaño** para almacenar
contenido dinámico.

- **Instancia EC2: c7g.large al 100 % de utilización** — costo mensual = **$52,93**
- **Amazon S3: 2.300 GB de storage con 200 GB de transferencia** — costo mensual = **$70,90**
- **Amazon RDS Reserved Instance 1 año partial upfront: MySQL db.m6g.large, 20 GB de storage** — costo mensual =
  **$36,17**
- **Gasto mensual total: $160,00**
- **One-time fee: $406,00**
- **Gasto anual: $2.326,00**
- **18 % de disminución del gasto**

**Resumen**

Al **comprometer una instancia Amazon RDS reservada por 1 año**, el **dueño de este sitio ahorró 18 %** en su
**gasto anual**. Puede **reducir aún más ese costo** comprometiendo un **plazo de 3 años** y **pagando todo
upfront** la Reserved Instance.

### 9.7 Self-check

**Pregunta:** ¿qué **opciones de pago** te permiten **reducir o eliminar** el **costo mensual de tu instancia de
base de datos reservada**? **(Elegir 3.)**

A. Partial
B. Capacity reservation
C. All upfront
D. Spot Instance pricing
E. 1- and 3-year payment options

---

## 10. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: global tables, ElastiCache, Redshift, reservas, caso numérico y self-check | Nota completa (secciones 1–9) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **“$61.838” ambiguo.** No se distingue **separador de miles** de **decimal**. Por el orden de magnitud del
   ejemplo, se interpreta como **≈ $61,84/mes**, pero se transcribe **literal**. Queda anotado en §2.2.
2. **“Tres global tables adicionales”.** Una **global table** incluye **todas** las réplicas; lo que el ejemplo
   agrega son **tres réplicas** (Oregon, Singapore, London). La redacción de la fuente es imprecisa; se conserva
   literal en §2.2 y §9.2.
3. **Self-check con opciones incompletas.** La lección enumera **tres formas de pago** (**No / Partial / All
   upfront**), pero la pregunta **no ofrece “No upfront”** y en su lugar pone **“1- and 3-year payment options”**,
   que son **plazos**, no formas de pago. La respuesta **A, C, E** se deduce por **exclusión** de **B** y **D**.
   Se registra en §7.
4. **“Partial” y “All upfront” sin “upfront”.** Las opciones **A** y **C** del self-check están **abreviadas**
   respecto de la terminología de la lección. Se transcriben tal como llegaron.
5. **“Base de datos física” en la nube.** La fuente habla de **“physical database”**; en cloud la capacidad es
   **lógica/provisionada**. Se conserva la frase y se aclara en §3.1.
6. **Caso numérico: mensual vs. anual.** Los **$160,00/mes** no incluyen el **one-time fee de $406**; el **total
   anual de $2.326** sí. La fuente no lo explicita; se aclara en §6.3.
7. **Self-check sin rationale.** No llegó explicación oficial; la justificación de §7 es **propia**.
8. **Imágenes no disponibles.** La lectura referencia **tres** capturas (`6RRYNNHJ34.png`, `HYVCQ7W91R.png`,
   `1WJNMPEK27.png`) que **no están en el vault**.

**Decisiones de transcripción:**

- Se conservan **global table**, **replica table**, **cache hit / miss**, **TTL**, **Reserved Node**,
  **Reserved Capacity**, **RCU/WCU**, **provisioned** y **serverless**.
- Los **números** se transcriben literales: **29 GB**, **4 M reads + 4 M writes**, **$61.838**,
  **$237,09**, **$2.845,08**, **$113,26**, **$36,17**, **$406**, **$160**, **$2.326**, **18 %**, **2.300 GB**,
  **200 GB**, **20 GB**, **1 y 3 años**.
- Los **nombres de instancia** se conservan exactos: **c7g.large**, **db.m6g.large**, **MySQL**.
- **No se agregaron** tarifas por RCU/WCU ni descuentos porcentuales de reserva que la fuente no da.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Architecting for Cost - Storage]] — lección anterior: EBS, snapshots y S3 classes
- [[Architecting for Cost - Networking]] — data transfer, LCU y Elastic IP
- [[Architecting for Cost - Compute]] — familias EC2, rightsizing, Fleet y Auto Scaling
- [[Cost Optimization]] — los 5 pilares, con **pricing** y **elasticidad**
- [[Cost Management Tools]] — Cost Explorer, CUR, Budgets y tagging
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
