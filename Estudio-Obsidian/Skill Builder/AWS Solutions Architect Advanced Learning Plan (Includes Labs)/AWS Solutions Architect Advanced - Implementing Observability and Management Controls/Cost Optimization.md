---
title: "Cost Optimization"
aliases:
  - "Cost optimization"
  - "Optimización de costos"
  - "Five pillars of cost optimization"
  - "Rightsizing, elasticity, pricing, storage"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - costos
  - finops
  - optimizacion
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Cost Optimization"
---

# Cost Optimization

> [!abstract] Qué es este archivo
> Lección de **12:04**, la más larga del bloque de costos. Responde la pregunta del **operations manager** que
> quedó abierta: *“la cantidad de datos que recolectamos y analizamos es mucho mayor de lo que planeamos para este
> año. **¿Cómo optimizamos los costos de storage?**”*
>
> La respuesta de AWS son **cinco pilares** que funcionan como **palancas**: **rightsize · elasticity · pricing
> model · storage · measure/monitor/improve**. No hay que usar todas todo el tiempo: hay que saber **cuál mover**.
>
> Cierra con un caso integrador (**image processing app**), **Cost Anomaly Detection** y la progresión de **TCO**.

> [!quote] La idea que hay que retener
> **No existe “el” recurso óptimo: existe el recurso correcto para el uso real de hoy.**
> Y como el uso cambia, la optimización **no es un proyecto**: es un **ciclo** (pilar 5).

---

## Resumen en una frase

> Optimizar costos en AWS es **ajustar cada palanca al uso real** —**rightsizing** de recursos, **elasticidad** para
> seguir la demanda, **modelo de pricing** adecuado (**Spot**, **Savings Plans**), **storage class** según el patrón
> de acceso— dentro de un **ciclo continuo de medición, monitoreo y mejora** que incluye **detección de anomalías**
> y migración hacia **servicios administrados y serverless**.

---

## 1. Las cinco palancas

La introducción y la lectura coinciden en **cinco pilares**. El transcript los enumera en otro orden (menciona
*“measuring and monitoring usage”* antes de *“pricing”* y *“storage”*); la lectura fija el orden **1–5** que uso acá.

| # | Pilar | Pregunta | Palanca principal |
| --- | --- | --- | --- |
| **1** | **Rightsize** | **¿Este recurso es del tamaño que necesito?** | Cambiar **tipo/tamaño**, apagar lo ocioso, **scheduling** |
| **2** | **Increase elasticity** | **¿Pago capacidad de pico todo el tiempo?** | **Auto Scaling** y ajuste por demanda |
| **3** | **Use the right pricing model** | **¿Estoy pagando el precio correcto por este patrón?** | **On-Demand · Spot · Savings Plans** |
| **4** | **Optimize storage** | **¿Esta clase de storage coincide con cómo accedo?** | **S3 classes · lifecycle · Intelligent-Tiering** |
| **5** | **Measure, monitor, and improve** | **¿Sigue siendo óptimo mañana?** | **Medición continua · anomalías · TCO** |

> [!important] “Palancas”, no checklist
> La lección lo dice: *“Pensá en estas como **diferentes palancas** que podés accionar. Quizá no necesites usarlas
> **todas todo el tiempo**, pero **saber cuándo usar cada una es la clave**.”*
> En el examen, la opción correcta suele ser **la palanca que ataca la causa**, no la que suena más moderna.

### 1.1 El punto de partida

Antes de las palancas, la lección fija **tres condiciones**:

1. **Implementar buenas prácticas de financial management.**
2. **Adoptar un modelo de consumo** (*consumption-based*).
3. **Medir eficiencia**, **enfocar al equipo en lo que hace único al negocio** y **poder rastrear cada dólar**.

---

## 2. Pilar 1 — Rightsize

**Definición:** **entender las necesidades reales de performance** de los recursos y **dimensionarlos para que sean
lo más costo-efectivo posible**.

### 2.1 Qué incluye

| Acción | Detalle |
| --- | --- |
| **Elegir la instancia más barata** | Siempre que **cumpla** los requisitos de negocio y performance |
| **Revisar CPU, RAM, storage y red** | Para identificar instancias que **podrían bajar de tamaño** |
| **Eliminar lo subutilizado o no usado** | Recursos **ociosos** |
| **Programar start/stop** | **Scheduling** según horarios de uso apropiados |

### 2.2 Por qué es continuo

Incluso si rightsizeás al inicio, **los requisitos de performance y capacidad cambian** y aparecen recursos
**subutilizados o idle**. Además:

- **proyectos y workloads nuevos** requieren recursos y, sin un proceso, **el overprovisioning es el resultado
  probable**;
- conviene **migrar de una generación anterior a una actual** para aprovechar features (ejemplo de la fuente:
  **soporte de IPv6**).

> **Regla literal:** *“Deberías rightsizeár tus workloads **al menos una vez al mes** para controlar costos.”*

### 2.3 El proceso en 5 pasos (literal)

| # | Paso |
| --- | --- |
| **1** | Que **cada equipo** fije un **calendario de rightsizing** y **reporte los ahorros** a la dirección |
| **2** | **Monitorear costos de cerca** con **Cost Explorer**, **Budgets** y los **detailed billing reports** de la consola **Billing and Cost Management** |
| **3** | Usar **Cost Optimization Monitor** para **visualizar detailed billing reports** en un **dashboard personalizable** |
| **4** | **Hacer obligatorio el tagging** de todas las instancias para identificar **owner, aplicación y entorno** (development, testing, production) |
| **5** | **Entender cómo rightsizear** |

> [!warning] Herramientas con nombre viejo
> **Cost Optimization Monitor**, **Operations Conductor** y **detailed billing reports** son nombres que la fuente
> usa, pero que en la consola actual están **reemplazados o deprecados** (los reportes detallados fueron
> sustituidos por **CUR**). Se transcriben porque son parte de la lección; para el examen, lo vigente es
> **Cost Explorer**, **CUR**, **Compute Optimizer** y **Instance Scheduler**.

### 2.4 Por qué “más chicas” puede ser mejor: 29 vs. 59

La lección plantea un caso concreto: **29 instancias más grandes** para el workload. La alternativa es **más
instancias más chicas** con **la misma capacidad de cómputo**, **menor costo**, **más flexibilidad de escalado** y
**mejor resiliencia** ante fallas de una instancia.

| Opción | Cantidad | Tipo | Precio/hora | Costo mensual |
| --- | --- | --- | --- | --- |
| **A** | **29** | **m5.large** | **$0,096** | **$2.032,32** |
| **B** | **59** | **t3.medium** | **$0,0416** | **$1.791,71** |

> [!note] Lectura propia (cálculo, no está en la fuente)
> La diferencia es de **~$240,61/mes** (**~11,8 %**), **no** “casi la mitad”. El *“casi la mitad”* del video
> corresponde a **otro cliente** que tenía instancias **mucho más grandes de lo necesario**. No hay que mezclar
> los dos casos: el de **29 → 59** demuestra **flexibilidad y resiliencia** con ahorro moderado; el “casi la mitad”
> demuestra el impacto de un **sobredimensionamiento severo**.

### 2.5 Generaciones: c4 → c5

Del caption de la figura: **c5.large** (2 vCPU, **4 GB**) a **$0,085/h** vs. **c4.large** (2 vCPU, **3,75 GB**) a
**$0,1/h**. La figura también muestra un caso de **83 % → 57 % de CPU**: rightsizing **no** es llevar la
utilización al 100 %, es **dejar margen**.

> [!important] El mensaje de las generaciones
> Una instancia **más nueva** puede dar **mejor performance a menor precio**. Rightsizing incluye **revisar la
> generación**, no solo el tamaño. Y el **57 %** de CPU recuerda que el objetivo es **holgura razonable**, no
> saturación.

### 2.6 AWS Compute Optimizer

**Qué hace:** usa **machine learning** para encontrar los **recursos óptimos** para los workloads.

| Capacidad | Detalle |
| --- | --- |
| **Analiza** | **Patrones de uso** |
| **Recomienda** | **Tipos de instancia y configuraciones** |
| **Alcance** | **Instancias EC2**, **Auto Scaling groups** y más |
| **Objetivo** | El **punto justo** entre **performance y costo** |
| **Valor extra** | Visualizar **escenarios what-if** con los recursos recomendados |

> [!tip] Compute Optimizer ≠ Cost Explorer
> **Cost Explorer** muestra **gasto** y recomendaciones de **compra** (RI/SP). **Compute Optimizer** analiza
> **métricas de utilización** y recomienda **tipo/tamaño**. Si la pregunta pide **“qué instancia usar”**, es
> Compute Optimizer; si pide **“cuánto gasté / qué compromiso comprar”**, es Cost Explorer.

### 2.7 Time-based: workload scheduling

**La idea:** **apagar lo que no se necesita**. ¿Todos los ambientes de **development y testing** necesitan correr
**24/7**? Probablemente no.

| Herramienta | Detalle |
| --- | --- |
| **AWS Instance Scheduler** | Solución para configurar **horarios custom de start/stop** de **EC2 y RDS** |
| **Alcance** | **Development y production** |
| **Ahorro declarado** | **Hasta 70 %** vs. correr **24 horas al día** |

> [!important] Por qué el ahorro es tan alto
> Un ambiente de **8 h × 5 días** está encendido **~24 %** del tiempo de la semana. Apagarlo el resto **no degrada
> nada** porque **nadie lo usa**. Es el ahorro más “gratis” de todos — y el más fácil de olvidar.

---

## 3. Pilar 2 — Increase elasticity

**Definición:** **ajustar la capacidad a la demanda real en tiempo real**. En lugar de **pagar capacidad de pico
todo el tiempo**, los recursos **escalan cuando hay carga** y **bajan cuando no**.

**El caso de la fuente:** empresas de **gaming** escalan para el **pico de la tarde/noche** y bajan en las horas
tranquilas, ahorrando **sustancialmente** en cómputo.

### 3.1 AWS Auto Scaling

| Aspecto | Detalle |
| --- | --- |
| **Qué hace** | **Monitorea aplicaciones** y **ajusta capacidad automáticamente** para mantener **performance estable y predecible** al **menor costo posible** |
| **Velocidad** | Configurar scaling para **múltiples recursos y servicios en minutos** |
| **Scaling plans** | Se construyen para **EC2 instances y Spot Fleets**, **ECS tasks**, **DynamoDB tables e indexes**, **Aurora Replicas** |
| **Recomendaciones** | Optimizar **performance**, **costo** o **balancear** entre ambos |
| **Combinación** | Si ya usás **EC2 Auto Scaling**, se puede **combinar** con **AWS Auto Scaling** para escalar **otros recursos** |
| **Promesa** | *“Tu aplicación siempre tiene **los recursos correctos en el momento correcto**.”* |

> [!note] Ampliación (no está en la fuente)
> **AWS Auto Scaling** es la capa de **scaling plans multi-servicio**; **EC2 Auto Scaling** es el servicio
> específico de EC2 (grupos, políticas, lifecycle hooks). La lección los distingue y dice que **se combinan**.

### 3.2 Las otras formas de ganar elasticidad

| Recurso | Qué hacer | Herramienta / umbral |
| --- | --- | --- |
| **EC2** | **Detener** o **rightsizear** instancias **idle o de baja utilización** | **Cost Explorer Resource Optimization** para el reporte; **Instance Scheduler** para apagar; **Operations Conductor** para redimensionar según la recomendación |
| **Amazon RDS** | **Detener** instancias de baja utilización | **Trusted Advisor — RDS idle DB instances**: **sin conexiones en los últimos 7 días** |
| **Amazon Redshift** | **Pausar** clusters de baja utilización | **Trusted Advisor — underutilized Redshift clusters**: **sin conexiones 7 días** **y** **< 5 % de CPU promedio** en **99 % de los últimos 7 días** |
| **DynamoDB** | **Auto scaling** o **on-demand** | Métricas **ConsumedReadCapacityUnits** y **ConsumedWriteCapacityUnits** en **CloudWatch** |

> [!important] Los dos umbrales de Redshift
> No alcanza con “sin conexiones”: exige **también** **< 5 % de CPU** en **99 %** de **7 días**. Es un criterio
> **doble** —y es el tipo de detalle que distingue una opción correcta de una “casi”.

> [!warning] Detener ≠ pausar
> **RDS** se **detiene**; **Redshift** se **pausa**. En RDS, una instancia detenida **reinicia sola después de 7
> días** (eso es ampliación: la fuente no lo dice). No confundir los verbos en el examen.

---

## 4. Pilar 3 — Use the right pricing model

### 4.1 Pay-as-you-go

Permite **adaptarse a necesidades cambiantes sin sobrecomprometer el presupuesto** y **mejora la capacidad de
respuesta**. La clave: **adaptarse a la necesidad, no al pronóstico**, reduciendo el riesgo de **sobreaprovisionar**
o de **quedarse sin capacidad**.

### 4.2 Spot Instances

| Dato | Valor |
| --- | --- |
| **Ahorro** | **Hasta 90 %** vs. **On-Demand** |
| **Condición** | El workload **puede tolerar interrupciones** |

### 4.3 Savings Plans

| Aspecto | Detalle |
| --- | --- |
| **Ahorro** | **Hasta 72 %** |
| **Aplica a** | **Amazon EC2**, **AWS Fargate** y **AWS Lambda** |
| **Compromiso** | **Cantidad de uso consistente**, medida en **$/hora** |
| **Plazo** | **1 año** o **3 años** |
| **Dónde se compra** | **Cualquier cuenta**: **management account** o **member account** |
| **Orden de aplicación** | Primero al **uso de la cuenta dueña del plan**; después a **otras cuentas de la AWS Organization** |

> [!important] La analogía del plan de celular
> *“Es como comprar un **plan de teléfono móvil**: te comprometés a gastar **cierta cantidad por mes** y obtenés
> **una tarifa mucho mejor**.”* El compromiso es en **dinero/hora**, no en **cantidad de instancias** — por eso es
> más flexible que una RI.

### 4.4 Los dos sabores

| Tipo | Flexibilidad | Dónde aplica | Descuento |
| --- | --- | --- | --- |
| **Compute Savings Plans** | **Máxima**: **cualquier** familia, tamaño, **Región** y **sistema operativo** | **EC2 + Fargate + Lambda** automáticamente | Menor que EC2 Instance SP |
| **EC2 Instance Savings Plans** | Atado a **una familia de instancias en una Región** | **EC2** | **Más profundo** |

**El caso de la empresa de servicios financieros:**

- **EC2 Instance Savings Plans** para **steady state**, donde **saben exactamente** qué tipos de instancia necesitan.
- **Compute Savings Plans** para workloads **más dinámicos**, que **pueden moverse** entre opciones de cómputo.

> **Resultado:** **ahorros significativos** con la **flexibilidad** que necesitan.

> [!tip] Cómo elegir
> **Uso predecible y fijo** → **EC2 Instance SP** (mayor descuento).
> **Uso que cambia de familia/región/SO, o incluye Fargate/Lambda** → **Compute SP** (menor descuento, más
> cobertura). La respuesta “todo EC2 Instance SP” **siempre** es sospechosa.

---

## 5. Pilar 4 — Optimize storage

**Idea central:** **storage es una decisión de diseño** que impacta **costo y performance**. En lugar de mantener
**todos los datos en el storage más rápido**, conviene **mover lo de acceso infrecuente** a una **clase/tier más
barata** — y que el sistema lo haga **automáticamente**, sin afectar la aplicación.

### 5.1 Servicios por tipo de storage

| Tipo | Servicios que nombra la lección |
| --- | --- |
| **File storage** | **Amazon EFS** · **Amazon FSx** |
| **Block storage** | **Amazon EBS** · **instance store** |
| **Object storage** | **Amazon S3** · **Amazon Glacier** |

> **Cada uno tiene su “sweet spot”**: usar el servicio correcto para cada workload **hace una diferencia grande**
> en el costo.

### 5.2 La lógica de S3

**La clave es entender los patrones de acceso.**

| Situación | Consecuencia |
| --- | --- |
| **Guardar en tiers de acceso infrecuente** | **Cuesta menos** |
| **Recuperar desde esos tiers** | **Se paga una pequeña fee** por retrieval |

> [!important] El trade-off que hay que verbalizar
> **Storage barato ≠ gratis de leer.** La clase correcta depende de **frecuencia de acceso** y de **cuánto cuesta
> equivocarse**. Si el dato se lee seguido, el ahorro de storage **se come** con las retrieval fees.

### 5.3 Los cuatro escenarios de la fuente

**Base:** **1.000 objetos**, **1 GB cada uno**, durante **12 meses**. ¿Qué clase conviene en cada caso?

| # | Patrón de acceso | Pregunta de la fuente |
| --- | --- | --- |
| **1** | Cada objeto se recupera **1.000 veces por trimestre** | ¿Qué storage class optimiza costo a 12 meses? |
| **2** | Cada objeto se recupera **1.000 veces por mes** | Ídem |
| **3** | Cada objeto se recupera **100 veces en el primer mes** y **nunca más** | Ídem |
| **4** | Cada objeto se recupera **10 veces por día** | Ídem |

> [!warning] La fuente no trae la respuesta
> La lectura solo plantea los escenarios; **la tabla de precios y la solución están en una imagen**
> (`GTF5ASBD7R.png`) que **no llegó al vault**. **No se inventan números.** Abajo va una guía de razonamiento
> **marcada como ampliación**.

> [!note] Ampliación (no está en la fuente)
> **Guía de razonamiento, sin cálculos:**
> - **Escenario 4** (10 veces/día) y **2** (1.000 veces/mes) → **S3 Standard**: el acceso es **frecuente**; las
>   retrieval fees de IA superarían el ahorro.
> - **Escenario 1** (1.000 veces/trimestre ≈ 11/día) → sigue siendo **frecuente**: **Standard** o, con análisis de
>   costo, **Standard-IA** solo si el patrón real es más espaciado.
> - **Escenario 3** (100 accesos el primer mes y nunca más) → **lifecycle** desde **Standard** hacia
>   **Glacier / Deep Archive**; el dato es **archivístico** después del primer mes.
> - **Patrón impredecible** → **S3 Intelligent-Tiering**, que mueve objetos **automáticamente**.
> La respuesta exacta depende de **precios vigentes** y de la **fee de retrieval**, que la lección no transcribe.

### 5.4 Las tres reglas de optimización de S3

| Regla | Cuándo |
| --- | --- |
| **S3 Standard** | Datos de **acceso frecuente** |
| **S3 Intelligent-Tiering** | **Patrones de acceso impredecibles** |
| **Lifecycle policies** | Para **mover automáticamente** datos a clases **más baratas con el tiempo** |

> [!important] Por qué lifecycle es la palanca de los “datos que crecen”
> La pregunta del operations manager era **storage que crece**. Lifecycle convierte una decisión **única** en una
> **regla permanente**: lo que envejece **se abarata solo**. Sin lifecycle, el crecimiento se paga **al precio del
> primer día**.

---

## 6. Pilar 5 — Measure, monitor, and improve

**Definición:** crear un **ciclo continuo de mejora**: **medir uso**, **monitorear costos** y **encontrar nuevas
formas de optimizar**. *“No es un proyecto de una sola vez; es un proceso ongoing.”*

### 6.1 El caso integrador: image processing app

**Modelo de negocio:** **freemium** — servicio **gratis** + servicio **con costo extra**.

| Tier | Requisito | Mecánica inicial |
| --- | --- | --- |
| **Free** | *“Eventualmente”* | Espera **1.000 requests** y procesa **en batch** con **una m4.large**, que procesa **1.000 imágenes/hora** |
| **Paid** | **SLA de 10 minutos** | Si **cualquier request en la cola tiene más de 10 minutos**, **se levanta una instancia nueva** |

**Volumen:** **2.000 transacciones/hora**, **mitad free y mitad paid**.

| Tier | Instancias | Costo por transacción (TXN) |
| --- | --- | --- |
| **Free** | **1** alcanza para el SLA | **$0,0001** |
| **Paid** | **6** para sostener el SLA | **$0,0006** |

### 6.2 La evolución del diseño

```
1. ASG separados por cola     →  free escala lento · paid escala rápido (SLA)
2. Lambda                     →  pagás solo el tiempo de procesamiento
3. Híbrido                    →  Lambda para premium + batch free en off-peak
```

| Etapa | Qué mejora | Qué cuesta |
| --- | --- | --- |
| **Auto Scaling groups separados** | Cumple **SLA** y no sobredimensiona el free | **Instancias ociosas** en valles |
| **Lambda** | **Pago por procesamiento**, no por instancia encendida | Cambia el modelo operativo |
| **Híbrido** | **Respuesta rápida** para premium **y** **costo bajo** para free | Requiere **desacoplar** por horario/cola |

> [!important] La lección de arquitectura
> El **mismo requisito funcional** (procesar imágenes) se puede resolver con **tres arquitecturas de costo muy
> distinto**. La optimización **no es un ajuste de precio**: es una **decisión de diseño**.

### 6.3 AWS Cost Anomaly Detection

**Qué hace:** con **machine learning**, **detecta patrones inusuales de gasto** y **alerta automáticamente**.

| Característica | Detalle |
| --- | --- |
| **Modelo** | **ML multi-capa** que aprende **patrones históricos únicos** de gasto |
| **Detecta** | **Picos únicos** (*one-time spikes*) y **aumentos continuos** |
| **Umbrales** | **No requiere que definas thresholds** para detectar |
| **Alcance del monitor** | Una **cuenta** o **todos los servicios** |
| **Suscripciones** | **Múltiples**, con **umbral y frecuencia distintos**, sobre el **mismo monitor** |

**Ejemplo de la fuente (un monitor, tres audiencias):**

| Suscripción | Audiencia | Condición |
| --- | --- | --- |
| **Immediate Alert** | **Engineering** | **Todas** las anomalías, **inmediato** |
| **Daily Summary** | **DevOps** | Anomalías que **superan $100** de impacto, **resumen diario** |
| **Weekly Summary** | **Finance** | Anomalías que **superan $1.000** de impacto, **resumen semanal** |

> [!important] Por qué esto es distinto de Budgets
> **Budgets** compara contra **un umbral que vos definís**. **Cost Anomaly Detection** **aprende** tu patrón y
> **no necesita** que definas umbrales. Si el enunciado dice *“sin definir thresholds”*, la respuesta es
> **Cost Anomaly Detection**, no Budgets.

### 6.4 TCO: de unmanaged a managed

| Etapa de madurez | Qué hace | Efecto en TCO |
| --- | --- | --- |
| **1. Básica** | **Comparaciones de costo** y **lift and shift** simple | Punto de partida |
| **2. Eficiencia** | **Rightsizing** y **mejor elasticidad** | Baja el costo de lo mismo |
| **3. Managed / serverless** | **Servicios administrados** y **arquitecturas serverless** | **Reduce el TCO**: no mantenés la infraestructura |
| **4. Mejora continua** | **Medición y mejora permanentes** | Sostiene el resultado |

> [!important] “Managed” no es solo comodidad
> Al pasar de **unmanaged a managed** se **reduce el costo total de propiedad**: dejás de mantener **infraestructura
> propia** y usás servicios que **hacen el trabajo pesado**.

### 6.5 El cierre: e-commerce con −45 %

Una plataforma de **e-commerce** combinó las palancas:

| Palanca | Uso |
| --- | --- |
| **Savings Plans** | **Carga base** |
| **Spot Instances** | **Procesamiento batch** |
| **Lifecycle management** | **Storage automatizado** |

**Resultado:** **−45 % en la factura mensual** **y mejor performance** de la aplicación.

> [!tip] Por qué el caso importa
> No usó **una** herramienta mágica: **combinó** compromiso para lo predecible, Spot para lo tolerante a
> interrupciones y lifecycle para lo que envejece. Es la tesis de la lección en una sola arquitectura.

---

## 7. Cómo elegir la palanca (síntesis)

| Síntoma | Palanca | Herramienta |
| --- | --- | --- |
| “Pago instancias más grandes de lo que uso” | **Rightsize** | **Compute Optimizer**, métricas de CPU/RAM |
| “Ambientes de dev/test corren 24/7” | **Rightsize (scheduling)** | **Instance Scheduler** |
| “Pago el pico aunque el pico dure 3 horas” | **Elasticity** | **AWS Auto Scaling** |
| “Mi uso es estable y predecible” | **Pricing** | **Savings Plans** (EC2 Instance SP) |
| “Mi workload tolera interrupciones” | **Pricing** | **Spot** |
| “Mi storage crece y no sé qué se accede” | **Storage** | **Intelligent-Tiering + lifecycle** |
| “Quiero saber si algo se salió de patrón” | **Measure** | **Cost Anomaly Detection** |
| “Quiero mejorar el TCO de fondo” | **Measure + arquitectura** | **Managed services / serverless** |

---

## 8. Self-check de la lección

> **Pregunta:** ¿qué usa un **modelo de machine learning multicapa** que **aprende tus patrones históricos únicos
> de gasto** para detectar **picos únicos** y **aumentos continuos** **sin requerir que definas umbrales**?
> **(elegir 1)**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A. AWS Budgets** | ❌ | **Vos definís** el presupuesto y los umbrales |
| **B. Cost Anomaly Detection** | ✅ | **ML** que aprende el patrón histórico y **no requiere thresholds** |
| **C. AWS Cost and Usage Report** | ❌ | **Reporta** datos; no detecta anomalías |
| **D. AWS Cost Explorer** | ❌ | **Visualiza y recomienda**; no detecta picos automáticamente |

> **Respuesta: B. Cost Anomaly Detection.**

> [!note] Sobre la fuente
> El self-check **no trae rationale oficial** ni “Correct!”. La justificación es **propia**, basada en §6.3.

---

## 9. Traducción del contenido

### 9.1 Introducción

Esta lección profundiza en el **enfoque integral de AWS para la optimización de costos**. Explora los **cinco
pilares fundamentales** que forman la **columna vertebral** de una gestión efectiva de costos en la nube:
**rightsizing**, **elasticity**, **pricing models**, **storage optimization** y **continuous measurement and
improvement**.

### 9.2 Transcript (duración: 12 minutos, 04 segundos)

Ahora que establecimos una **gobernanza fuerte** mediante **tag policies**, volvamos a la preocupación del
**gerente de operaciones** sobre el **crecimiento de los costos de datos**. Preguntó: *“la cantidad de datos que
estamos recolectando y analizando es **mucho mayor de lo que planeamos para este año**. **¿Cómo podemos optimizar
los costos de storage?**”* Están recolectando y analizando **más datos que nunca** y necesitan **mantener esos
costos bajo control** sin perder performance.

Un **servicio de streaming** con el que trabajé enfrentó **exactamente este desafío**: necesitaba **optimizar
costos** mientras sus **necesidades de storage crecían rápidamente**.

Antes de entrar en soluciones específicas, veamos los **principios centrales** de la optimización de costos en AWS.
Empieza por **implementar buenas prácticas de financial management** y **adoptar un modelo basado en consumo**.
Necesitás **medir eficiencia**, **enfocar la energía de tu equipo en lo que hace único a tu negocio** y
**asegurarte de poder rastrear adónde va cada dólar**.

AWS aborda la optimización de costos a través de **cinco pilares clave**: **rightsizing de tus recursos**,
**aumentar la elasticidad**, **medir y monitorear el uso**, **usar el modelo de pricing correcto** y **optimizar
storage**. Pensá en estos como **diferentes palancas** que podés accionar para **controlar costos**. Quizá no
necesites usar **todas todo el tiempo**, pero **saber cuándo usar cada una es la clave**.

Empecemos por **rightsizing**: **ajustar tus recursos a tus necesidades reales**. Es sorprendente **cuán a menudo
este principio simple** lleva a **ahorros significativos**. Un cliente descubrió que estaba corriendo **varias
instancias mucho más grandes de lo que necesitaba**. Al **rightsizearlas**, **cortó sus costos de cómputo casi a la
mitad** **sin sacrificar performance**. Y rightsizing **no es algo que hacés una vez y olvidás**: los requisitos
cambian y AWS **introduce regularmente nuevos tipos de instancia** que podrían ajustarse mejor. Por ejemplo, pasar
de **c4 a c5** suele dar **mejor performance a menor costo**. La clave es **hacer del rightsizing parte de tus
operaciones regulares**.

A veces **usar más instancias pequeñas funciona mejor que menos grandes**. Veamos un ejemplo real: estás corriendo
**29 instancias más grandes** para manejar tu workload. Puede parecer lógico, pero **puede haber una mejor forma**.
Al cambiar a **un número mayor de instancias más chicas**, podrías obtener **la misma capacidad de cómputo**
**reduciendo costos**. Además, este enfoque da **más flexibilidad para escalar** y **mejor resiliencia** si una
instancia tiene problemas. Es exactamente el tipo de **optimización práctica** que tu gerente de operaciones puede
implementar **de inmediato**.

**AWS Compute Optimizer** usa **machine learning** para ayudarte a encontrar **los recursos óptimos** para tus
workloads. Mira tus **patrones de uso** y hace **recomendaciones inteligentes** sobre **tipos de instancia y
configuraciones**. Puede analizar **instancias EC2**, **Auto Scaling groups** y más, para encontrar **ese punto
justo entre performance y costo**.

Acá va una forma **simple pero poderosa** de ahorrar: **apagá las cosas cuando no las necesitás**. ¿Todos tus
ambientes de **desarrollo y testing** necesitan correr **24/7**? Probablemente no. Al **programar los recursos según
tu horario real de trabajo**, podés **reducir significativamente** los costos de **workloads no productivos**.

Ahora, **elasticity** se trata de **ajustar tu capacidad a la demanda real en tiempo real**. En lugar de **pagar
capacidad de pico todo el tiempo**, tus recursos pueden **escalar cuando estás ocupado** y **bajar cuando no**.
Las **empresas de gaming** usan este enfoque para manejar el **tráfico de jugadores**: escalan para el **pico de la
tarde/noche** y bajan en las **horas tranquilas**, ahorrando **sustancialmente** en cómputo.

AWS ofrece **varias formas de pagar** por los recursos y **elegir la mezcla correcta** puede llevar a **ahorros
significativos**. Las **Spot instances** te pueden ahorrar **hasta 90 %** frente a **on-demand** si tu workload
**tolera interrupciones**. Pero para los workloads de tu gerente de operaciones, veamos otra **opción poderosa** que
da **ahorros consistentes**: **AWS Savings Plans**. Pensalo como **comprar un plan de teléfono móvil**: te
comprometés a **gastar cierta cantidad por mes** y obtenés **una tarifa mucho mejor** a cambio. Con Savings Plans
te comprometés a **una cantidad consistente de uso de cómputo**, medida en **dólares por hora**, y podés ahorrar
**hasta 72 %** frente a **on-demand**.

Tenés **dos sabores principales** de Savings Plans. Los **Compute Savings Plans** dan **máxima flexibilidad**:
**aplican automáticamente a EC2, Fargate y Lambda**, **independientemente de la familia de instancias, el tamaño,
la Región o el sistema operativo**. Los **EC2 Instance Savings Plans** están **atados a una familia de instancias en
una Región**, pero ofrecen **descuentos aún más profundos**. Una **empresa de servicios financieros** usa **una
mezcla de ambos**: **EC2 Instance Savings Plans** para **workloads de steady state**, donde **saben exactamente qué
tipos de instancia necesitan**, y **Compute Savings Plans** para **workloads más dinámicos** que podrían necesitar
**moverse entre distintas opciones de cómputo**. Esta combinación les da **ahorros significativos** manteniendo la
**flexibilidad** que necesitan.

Ahora volvamos a la **preocupación del gerente de operaciones sobre storage**. AWS ofrece **distintas opciones de
storage optimizadas para distintas necesidades**: **EFS y FSx para file storage**, **EBS e instance store para block
storage**, y **S3 y Glacier para object storage**. **Cada uno tiene su sweet spot**, y **usar el servicio correcto
para cada workload** puede hacer **una gran diferencia** en los costos.

Ahora, para **optimizar costos de S3**, la clave es **entender tus patrones de acceso**. **Guardar datos en tiers
de acceso infrecuente cuesta menos**, pero **pagás una pequeña fee cuando necesitás recuperarlos**. Consideremos
**escenarios reales** con **1.000 objetos, cada uno de 1 GB**, y veamos cómo **distintos patrones de acceso** afectan
qué **storage class** tiene más sentido. **La matemática se aclara cuando miramos patrones de uso reales.** Si
**accedés a objetos con frecuencia**, digamos **varias veces por día**, **Standard Storage** suele ser lo que más
conviene. Pero si **solo accedés a los datos una vez cada pocos meses**, mover a **Standard-IA** o incluso
**Glacier** podría **ahorrarte dinero**. Este tipo de análisis ayuda a tu gerente de operaciones a **tomar
decisiones basadas en datos** sobre sus **crecientes necesidades de storage**.

Entonces, esto es lo que tu gerente de operaciones **necesita recordar** sobre optimización de S3: se trata de
**hacer coincidir las storage classes con los patrones de uso reales**. **Standard** funciona mejor para **datos de
acceso frecuente**. Considerá **Intelligent-Tiering** cuando **los patrones de acceso son impredecibles**, y usá
**lifecycle policies** para **mover automáticamente los datos a clases de storage más baratas con el tiempo**.
Esto **aborda directamente** la preocupación por **optimizar el crecimiento de los costos de storage**.

Este **pilar final** junta todo para tu gerente de operaciones. Se trata de crear un **ciclo continuo de mejora**
donde **constantemente medís uso, monitoreás costos y encontrás nuevas formas de optimizar**. **No es un proyecto de
una sola vez**: es un **proceso ongoing** que ayuda a **obtener el máximo valor** del gasto en la nube.

Ahora veamos un **ejemplo del mundo real** que **junta todos estos principios**. Considerá una **aplicación de
procesamiento de imágenes** con usuarios **free y premium**. Los **premium** esperan sus imágenes procesadas en
**10 minutos**, mientras que los **free** pueden **esperar más**. **Una instancia puede procesar cerca de 1.000
imágenes por hora**, y necesitamos manejarlo **eficientemente** cumpliendo los **SLA**.

La **solución inicial** podría usar **distintos Auto Scaling groups** para las **colas free y premium**. Los
workloads **premium escalan rápido** para cumplir el **SLA de 10 minutos**, mientras que el procesamiento **free
escala más gradualmente** para **optimizar costos**. Pero **hay margen de mejora**. ¿Y si usáramos **AWS Lambda**?
Lambda puede procesar estas imágenes **eficientemente** y **solo pagás por el tiempo real de procesamiento**. Este
enfoque **alinea perfectamente** con el objetivo del gerente de operaciones: **optimizar costos manteniendo
performance**. Podemos optimizar **aún más** combinando enfoques: **Lambda para premium** para obtener **respuesta
instantánea**, mientras **procesamos los workloads free en batches durante horas de baja demanda**. Este enfoque
**híbrido** da **lo mejor de ambos mundos**: **respuesta rápida donde se necesita** y **optimización de costos donde
es posible**.

Ahora, la **detección de anomalías de costos** ayuda a **atrapar gasto inesperado antes de que se vuelva un
problema**. Usando **machine learning**, **detecta patrones inusuales** en tu gasto y **alerta automáticamente**.
Podés **configurar distintos umbrales de notificación para distintos equipos**: quizá **alertas inmediatas para
engineering** cuando algo se ve raro, **resúmenes diarios para DevOps** y **resúmenes semanales para finance**.

A medida que pasás de **servicios unmanaged a managed**, a menudo **reducís tu costo total de propiedad**. En lugar
de **mantener tu propia infraestructura**, podés **aprovechar servicios que hacen el trabajo pesado**. Esto es
**particularmente relevante** para tu gerente de operaciones mientras busca **optimizar sus crecientes costos de
gestión de datos**. Tu **viaje para optimizar TCO** sigue típicamente una **progresión clara**: la mayoría de las
organizaciones empiezan con **comparaciones básicas de costo** y **migraciones lift and shift simples**. Después
pasan a **mejorar la eficiencia** con **rightsizing y mejor elasticidad**. **La magia real** ocurre cuando empiezan
a **aprovechar servicios administrados y arquitecturas serverless**, **midiendo y mejorando continuamente** su
entorno.

Terminemos viendo **cómo trabajan juntas** todas estas estrategias. Una **plataforma de e-commerce** combinó estos
enfoques: usó **Savings Plans para su carga base**, **Spot instances para su procesamiento batch** y **automatizó
la gestión del ciclo de vida del storage**. El resultado: **cortaron su factura mensual un 45 %** **mejorando la
performance** de su aplicación. **Aprovechando estos principios y servicios**, junto con **herramientas de gestión
de costos de AWS**, **modelos de pricing flexibles** como Savings Plans y **optimización inteligente de storage**,
podés crear un **enfoque integral** para gestionar costos efectivamente en la nube.

### 9.3 Five pillars of cost optimization

La optimización de costos empieza por **implementar buenas prácticas de financial management** y **adoptar un
modelo basado en consumo**. Necesitás **medir eficiencia**, **enfocar la energía de tu equipo en lo que hace único
a tu negocio** y **rastrear adónde va cada dólar**.

1. **Rightsize**
2. **Increase elasticity**
3. **Use the right pricing model**
4. **Optimize storage**
5. **Measure, monitor, and improve**

### 9.4 Pillar 1 — Rightsize

Empecemos por **rightsizing**, que es **ajustar los recursos a tus necesidades reales**. Rightsizing implica
**entender las verdaderas necesidades de performance** de tus recursos y **dimensionarlos para que sean lo más
costo-efectivos**. Esto incluye:

- **Seleccionar la instancia más barata** que **cumpla** los requisitos de negocio y performance.
- **Revisar CPU, RAM, storage y utilización de red** para identificar instancias que podrían **reducirse**.
- **Eliminar recursos subutilizados o no usados**.
- **Programar start/stop** en horarios apropiados.

**Rightsizing como proceso ongoing**

¿Por qué es necesario rightsizear **continuamente**? Aunque rightsizeés inicialmente, **los requisitos de
performance y capacidad pueden cambiar** y dejar recursos **subutilizados o idle**. Además, **proyectos y workloads
nuevos** requieren recursos, y **el overprovisioning es el resultado probable** si **no hay un proceso** que
sostenga el rightsizing y otros esfuerzos de optimización. También podrías querer **migrar de una generación
anterior a una actual** para aprovechar features, por ejemplo, **soporte de IPv6**.

Deberías rightsizear tus workloads **al menos una vez al mes** para controlar costos. Podés hacerlo un proceso
fluido así:

1. Que **cada equipo** establezca un **calendario de rightsizing** y **reporte los ahorros** a la dirección.
2. **Monitorear costos de cerca** con herramientas de costos y reportes de AWS, como **Cost Explorer**, **Budgets**
   y **detailed billing reports** en la consola **Billing and Cost Management**.
3. Usar **Cost Optimization Monitor** para **visualizar detailed billing reports** en un **dashboard
   personalizable**.
4. **Hacer obligatorio el tagging** de todas las instancias para identificar rápidamente **owner, aplicación y
   entorno** (development, testing, production).
5. **Entender cómo rightsizear**.

**Rightsizing: elasticidad**

A veces **usar más instancias pequeñas funciona mejor que menos grandes**. Veamos un ejemplo real: estás corriendo
**29 instancias más grandes**. Puede parecer lógico, pero **puede haber una mejor forma**. Al cambiar a **un número
mayor de instancias más chicas**, podrías obtener **la misma capacidad de cómputo** **reduciendo costos**. Además,
da **más flexibilidad de escalado** y **mejor resiliencia** si una instancia falla. Es el tipo de **optimización
práctica** que los operations managers pueden implementar **de inmediato**.

**AWS Compute Optimizer**

**AWS Compute Optimizer** usa **machine learning** para encontrar **los recursos óptimos** para tus workloads.
Mira **patrones de uso** y hace **recomendaciones** sobre **tipos de instancia y configuraciones**. Analiza
**instancias EC2**, **Auto Scaling groups** y más, para encontrar **el punto justo entre performance y costo**.
El flujo: **identifica recursos ideales → escanea la infraestructura → usa ML para encontrar lo óptimo → deriva
perfiles de workload → alinea requisitos con recursos (EC2, ASG) → visualiza escenarios what-if**.

**Time-based: workload scheduling**

¿Querés una forma **simple pero poderosa** de ahorrar? **Apagá lo que no necesitás**. ¿Todos los ambientes de
**development y testing** necesitan correr **24/7**? Probablemente no. **Programando recursos según el horario real
de trabajo** se **reducen significativamente** los costos de **workloads no productivos**.

**AWS Instance Scheduler** es una **solución** que ayuda a **configurar horarios custom de start/stop** para
**EC2 y RDS**. Puede **reducir costos operativos** en **development y production**. Los clientes que la usan para
correr instancias **en horario laboral** pueden ahorrar **hasta 70 %** frente a correrlas **24 horas al día**.

### 9.5 Pillar 2 — Increase elasticity

**Elasticity** es **ajustar la capacidad a la demanda real en tiempo real**. En lugar de **pagar capacidad de pico
todo el tiempo**, los recursos **escalan cuando hay carga** y **bajan cuando no**. Las **empresas de gaming** lo usan
para el **tráfico de jugadores**: escalan en el **pico de la tarde/noche** y bajan en las **horas tranquilas**,
ahorrando **sustancialmente** en cómputo.

**AWS Auto Scaling**

**AWS Auto Scaling** monitorea aplicaciones y **ajusta capacidad automáticamente** para mantener **performance
estable y predecible al menor costo posible**. Permite **configurar scaling para múltiples recursos y servicios en
minutos**. Con su interfaz se construyen **scaling plans** para **EC2 instances y Spot Fleets**, **ECS tasks**,
**DynamoDB tables e indexes** y **Aurora Replicas**.

Con las **recomendaciones de AWS Auto Scaling** podés **optimizar performance y costos, o balancear entre ambos**.
Si ya usás **EC2 Auto Scaling** para escalar instancias EC2 dinámicamente, podés **combinarlo** con **AWS Auto
Scaling** para escalar **recursos adicionales** de otros servicios. Con AWS Auto Scaling, tus aplicaciones
**siempre tienen los recursos correctos en el momento correcto**.

**Otros métodos para aumentar la elasticidad de costos**

**Identificar instancias EC2 de baja utilización**

Identificá instancias EC2 de **baja utilización** y reducí costos **deteniéndolas o rightsizeándolas**. Usá
**AWS Cost Explorer Resource Optimization** para obtener un **reporte de instancias idle o de baja utilización**.
Reducí costos **deteniendo o reduciendo** esas instancias. Usá **AWS Instance Scheduler** para **detenerlas
automáticamente**. Usá **Operations Conductor** para **redimensionar automáticamente** las instancias según el
**reporte de recomendaciones de Cost Explorer**.

**Identificar instancias Amazon RDS y Amazon Redshift de baja utilización**

Identificá instancias **RDS y Redshift** de baja utilización y reducí costos **deteniendo (RDS)** y **pausando
(Redshift)**. Usá el check **Trusted Advisor — RDS idle DB instances** para identificar instancias **sin conexiones
en los últimos 7 días**. Para **Redshift**, usá el check **underutilized Redshift clusters** para identificar
clusters **sin conexiones en los últimos 7 días** y con **menos de 5 % de CPU promedio** en **99 % de los últimos
7 días**.

**Analizar el uso de DynamoDB**

**Analizá el uso de DynamoDB y reducí costos usando auto scaling u on-demand.** Analizá el uso **monitoreando dos
métricas en CloudWatch**: **ConsumedReadCapacityUnits** y **ConsumedWriteCapacityUnits**. Para **escalar
automáticamente (in y out)** la tabla DynamoDB, usá la feature de **auto scaling**.

### 9.6 Pillar 3 — Use the right pricing model

El tercer pilar es **usar el modelo de pricing correcto**. Con **pay-as-you-go** podés **adaptarte a necesidades
cambiantes sin sobrecomprometer presupuestos** y **mejorar la capacidad de respuesta**. Con este modelo, te adaptás
**a la necesidad, no a los pronósticos**, reduciendo el riesgo de **sobreaprovisionar** o de **quedarte sin
capacidad**.

Las **Spot Instances** pueden ahorrar **hasta 90 %** frente a **On-Demand** si el workload **tolera
interrupciones**. Pero para los workloads crecientes del operations manager, veamos otra **opción poderosa** que da
**ahorros consistentes**.

**Savings Plans**

**Savings Plans** es un **modelo de pricing flexible** que ayuda a ahorrar **hasta 72 %** en **Amazon EC2**,
**AWS Fargate** y **AWS Lambda**. Ofrece **precios más bajos** para **EC2, Fargate y Lambda** a cambio de un
**compromiso de uso consistente** (medido en **$/hora**) por **1 o 3 años**. Podés comprar Savings Plans desde
**cualquier cuenta**: **management account** o **member account**. Los Savings Plans **primero se aplican al uso de
la cuenta dueña del plan** y **después al uso de otras cuentas de la AWS Organization**.

### 9.7 Pillar 4 — Optimize storage

**Storage es una decisión de diseño importante** que impacta **costo y performance**. Dos drivers comunes para
mover aplicaciones a la nube son **maximizar eficiencia operativa** y **reducir el costo total de propiedad**; esto
aplica igual a **costos de storage**. En lugar de **mantener todos los datos en el storage más rápido**, puede
tener sentido **mover datos de acceso infrecuente** a **otra clase/tier** con **reducción de costo asociada**.
Identificar esos datos **manualmente** puede ser una carga, así que también es ideal que **el sistema monitoree el
acceso en el tiempo** y **mueva los datos entre tiers automáticamente**, **sin afectar las aplicaciones en
ejecución**.

Veamos cómo **optimizar costos de S3**. La clave es **entender los patrones de acceso**. **Guardar en tiers de
acceso infrecuente cuesta menos**, pero **pagás una pequeña fee al recuperar**.

**Rightsizing: escenarios de Amazon S3**

**1.000 objetos de 1 GB** están en S3. Veamos **escenarios** y qué **storage class** conviene si se optimiza
**costo a 12 meses**:

**Escenario 1:** cada objeto se recupera **1.000 veces por trimestre**.

**Escenario 2:** cada objeto se recupera **1.000 veces por mes**.

**Escenario 3:** cada objeto se recupera **100 veces en el primer mes** y **nunca más**.

**Escenario 4:** cada objeto se recupera **10 veces por día**.

### 9.8 Pillar 5 — Measure, monitor, and improve

Este **pilar final** junta todo. Se trata de crear un **ciclo continuo de mejora**: **medir uso**, **monitorear
costos** y **encontrar nuevas formas de optimizar**. **No es un proyecto de una sola vez**: es un **proceso
ongoing** que asegura **el máximo valor** del gasto.

**El ejemplo de la aplicación de procesamiento de imágenes**

La arquitectura opera con **modelo freemium**: se ofrecen **servicios gratis y servicios con costo extra**. La
aplicación **modifica imágenes** para los usuarios.

- El **servicio free** espera hasta que se **acumulan 1.000 requests** y las **procesa en batch** con una
  **m4.large**, que procesa **1.000 imágenes por hora**. Promete que los free **recibirán sus imágenes
  eventualmente**.
- Los **usuarios paid** requieren **10 minutos de turnaround** según el **SLA**. Si **cualquier request en la cola
  tiene más de 10 minutos**, el servicio **levanta una instancia nueva**.

Si la arquitectura recibe **2.000 transacciones por hora** (**mitad free, mitad paid**), el **costo por
transacción (TXN)** del **free** es **$0,0001**. El **paid** requiere **6 instancias** para cumplir el SLA, lo que
lleva su **TXN** a **$0,0006**.

¿Y si usáramos **AWS Lambda**? Lambda puede procesar las imágenes **eficientemente** y **solo pagás el tiempo real
de procesamiento**. Esto **alinea** con el objetivo de **optimizar costos manteniendo performance**. Se puede
optimizar **más** combinando enfoques: **Lambda para premium** para **respuesta instantánea**, **free en batches
durante off-peak**. El enfoque **híbrido** da **lo mejor de ambos mundos**: **respuesta rápida donde se necesita**
y **optimización de costos donde es posible**.

**AWS Cost Anomaly Detection**

Si tu organización tiene **distintos departamentos**, y cada uno está interesado en **un umbral y una frecuencia
distintos**, podés crear **múltiples alert subscriptions** que **escuchan las anomalías detectadas por el mismo
monitor**.

1. **AWS Account** — Si la organización tiene departamentos con **umbrales y frecuencias distintos**, podés crear
   **múltiples suscripciones** que escuchan **las anomalías del mismo monitor**.
2. **All Services** — Por ejemplo, podés crear **un único service monitor** para **todos los servicios de AWS**.
3. **Immediate Alert** — Cuando se detectan anomalías, podés crear una suscripción **“Immediate Alert”** para que
   **engineering** reciba **notificación inmediata de todas** las anomalías.
4. **Daily Summary** — Al mismo tiempo, podés crear una suscripción separada para **DevOps** con un **reporte
   diario** de **toda anomalía que supere $100 de impacto**.
5. **Weekly Summary** — Escuchando **el mismo Cost Monitor**, podés crear una suscripción **“Weekly Summary”**
   para **finance**, para que estén al tanto de **toda anomalía que supere $1.000 de impacto**.

### 9.9 Self-check

**Pregunta:** ¿qué usa un **modelo de machine learning multicapa** que **aprende tus patrones históricos únicos de
gasto** para detectar **picos únicos** y **aumentos continuos** **sin requerir que definas tus umbrales**?
**(elegir 1)**

A. AWS Budgets
B. Cost Anomaly Detection
C. AWS Cost and Usage Report
D. AWS Cost Explorer

---

## 10. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 10.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Rightsizing y eliminación de ociosos** | **1.5** Estrategias de optimización de costos y visibilidad · **3.5** Oportunidades |
| **Elasticidad y Auto Scaling** | **2.6** Estrategia de optimización para cumplir metas |
| **Savings Plans / Spot** | **1.5** · **2.6** |
| **Storage classes y lifecycle** | **2.6** · **3.5** |
| **Medición continua y anomalías** | **3.5** · **3.1** Excelencia operativa |
| **TCO y managed services** | **2.6** · **3.5** |

### 10.2 Diez puntos para llevarse

1. **Cinco pilares**: **rightsize · elasticity · pricing · storage · measure/monitor/improve**.
2. **Rightsizing** se hace **al menos una vez al mes**, no una sola vez.
3. **Compute Optimizer** = **ML** sobre **métricas de uso** para recomendar **tipo/tamaño**.
4. **Instance Scheduler** apaga **EC2 y RDS** por horario: **hasta 70 %** de ahorro.
5. **AWS Auto Scaling** cubre **EC2, Spot Fleets, ECS, DynamoDB y Aurora Replicas**.
6. **Redshift** exige **doble criterio**: **sin conexiones 7 días** **y** **< 5 % CPU** en **99 %** de ese período.
7. **Spot** = **hasta 90 %** si tolera interrupciones; **Savings Plans** = **hasta 72 %**, **1 o 3 años**, en **$/hora**.
8. **Compute SP** = flexible (EC2/Fargate/Lambda, cualquier familia/Región/SO); **EC2 Instance SP** = más descuento, **una familia en una Región**.
9. **Storage**: **Standard** para frecuente · **Intelligent-Tiering** para impredecible · **lifecycle** para envejecimiento.
10. **Cost Anomaly Detection** = **ML**, **sin thresholds**, detecta **picos** y **aumentos continuos**; múltiples suscripciones sobre un monitor.

### 10.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Rightsizing es una tarea única” | Es **continuo**: **al menos mensual** |
| “Rightsizing = usar el 100 % de CPU” | El ejemplo baja de **83 % a 57 %**: se busca **holgura**, no saturación |
| “Más grande siempre rinde mejor” | **Más chicas** pueden dar **misma capacidad**, **menos costo** y **más resiliencia** |
| “Compute Optimizer recomienda compromisos de compra” | Eso es **Cost Explorer**; Compute Optimizer recomienda **tipo/tamaño** |
| “Instance Scheduler sirve solo para dev” | La fuente dice **development y production** |
| “Spot es para todo” | Requiere **tolerar interrupciones** |
| “Savings Plans se limitan a EC2” | Cubren **EC2, Fargate y Lambda** |
| “El descuento máximo siempre es EC2 Instance SP” | Es más profundo **pero menos flexible**; la elección depende del **patrón** |
| “Standard-IA siempre es más barata” | **Sí en storage**, pero **no** si accedés seguido: **retrieval fees** |
| “Intelligent-Tiering es para acceso predecible” | Es para **impredecible**; para predecible va **lifecycle** |
| “Budgets detecta anomalías sin umbrales” | **Budgets** exige **umbral**; sin umbral es **Cost Anomaly Detection** |
| “Managed services siempre salen más caros” | A menudo **reducen el TCO** al eliminar mantenimiento |

> [!note] Ampliación (no está en la fuente)
> Para el examen, tres atajos de decisión:
> **“no sé qué instancia”** → **Compute Optimizer** ·
> **“no sé qué se gastó”** → **Cost Explorer** ·
> **“algo se salió de lo normal”** → **Cost Anomaly Detection**.

---

## 11. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + transcript (12:04) + lectura de los 5 pilares + escenarios S3 + caso de image processing + anomaly detection + self-check | Nota completa (secciones 1–10) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Orden de los pilares.** El transcript menciona **measuring and monitoring** antes de **pricing** y **storage**;
   la lectura fija **1 rightsize · 2 elasticity · 3 pricing · 4 storage · 5 measure**. Se sigue el orden de la
   lectura y se anota.
2. **Escenarios S3 sin respuesta.** La lectura plantea **4 escenarios** pero **no incluye la solución**: la tabla de
   precios está en la imagen `GTF5ASBD7R.png`, **no disponible**. No se inventaron cifras; la guía de §5.3 está
   marcada como **ampliación**.
3. **“Casi la mitad” vs. el ejemplo 29 → 59.** El **“casi la mitad”** corresponde a **otro cliente** con
   instancias **muy sobredimensionadas**. El ejemplo numérico de la lección ahorra **~11,8 %**. Se distinguen en
   §2.4; el cálculo es **propio**.
4. **Herramientas legacy.** **Cost Optimization Monitor**, **Operations Conductor** y **detailed billing reports**
   aparecen en la fuente pero están **reemplazados/deprecados** en la consola actual. Se transcriben y se advierte
   en §2.3.
5. **Self-check sin rationale.** No hay “Correct!” ni explicación oficial; la justificación de §8 es **propia**.
6. **Imágenes no disponibles.** La lectura referencia **trece** capturas (`2S416TTA64.png`, `3ZS3JUEJ2W.png`,
   `5QYGUEVKSA.png`, `AHN8TT1GGZ.png`, `KDDCP3ZG6G.png`, `3S7KS2HGPJ.png`, `7WGBXPYHPN.jpeg`, `Y8TA8J6V77.png`,
   `GTF5ASBD7R.png`, `K2M2KPH6GT.png`, `YQMMYU3M12.png`, `EF5QSKB4EH.png`, `9WW2F3B137.png`) que **no están en el
   vault**.

**Decisiones de transcripción:**

- Se conservan **rightsizing**, **elasticity**, **Savings Plans**, **Spot**, **steady state**, **TXN**,
  **freemium** y **lifecycle** en inglés.
- **“c4 a c5”**, **c5.large (2 vCPU, 4 GB, $0,085/h)** y **c4.large (2 vCPU, 3,75 GB, $0,1/h)** provienen del
  **caption de la figura**; se transcriben literales.
- Los **precios mensuales** (**$2.032,32** y **$1.791,71**) son los que muestra la fuente; **no** se recalcularon
  con otra tarifa horaria.
- El **45 %** del e-commerce y el **70 %** de Instance Scheduler se transcriben **sin agregar período ni monto
  base**: la fuente no los da.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Cost Management Tools]] — Cost Explorer, CUR, Budgets, tagging
- [[Cloud Cost Management]] — el marco de los 7 pasos y las 4 etapas
- [[Governance at Scale]] — presupuesto por capas y enforcement
- [[Management Controls]] — Service Catalog como control previo al gasto
- [[Detective Controls]] — monitoreo y remediación
- [[Knowledge Check]] — pregunta 3: elasticidad y costo
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
