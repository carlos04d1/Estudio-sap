---
title: "Architecting for Cost - Compute"
aliases:
  - "Architecting for Cost: Compute"
  - "Arquitectura de costos: cómputo"
  - "EC2 cost optimization"
  - "Optimización de costos de compute"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - costos
  - ec2
  - compute
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Architecting for Cost - Compute"
---

# Architecting for Cost - Compute

> [!abstract] Qué es este archivo
> Lección de arquitectura de costos centrada en **compute**, el rubro que suele ser **la porción más grande del
> gasto** en la nube. No repite el marco de [[Cost Optimization]]: baja a **decisiones concretas de EC2**.
>
> Cubre **familias de instancias**, **generación y tamaño**, **rightsizing** con **Compute Optimizer** y
> **Cost Explorer**, **estados que cuestan aunque no se usen**, **EC2 Fleet**, **Auto Scaling con mixed instances**,
> **estrategias de asignación de Spot** y las **opciones de scaling** (scheduled, target tracking, predictive).

> [!quote] La idea que hay que retener
> **Elegir bien desde el principio es barato; corregir después es caro.**
> La lección lo dice explícito: *“elegir el recurso correcto desde el principio requiere **mínimo esfuerzo**;
> actualizar después requiere **overhead operativo y análisis** que puede **no ser financieramente viable**.”*

---

## Resumen en una frase

> Optimizar compute es **elegir la familia, la generación y el tamaño correctos**, **medir** con **Compute
> Optimizer** o **Cost Explorer**, **eliminar lo que cuesta sin usarse**, y **combinar modelos de compra y tipos de
> instancia** con **EC2 Fleet** y **Auto Scaling** para pagar **solo la capacidad que la aplicación necesita**.

---

## 1. Las cinco familias de instancias

Cada tipo de instancia está **optimizado para un caso de uso** y se agrupa en una **familia**.

| # | Familia | Workloads que menciona la fuente |
| --- | --- | --- |
| **1** | **General purpose** | **Balance** de compute, memoria y red · **diversidad** · **aplicaciones web** |
| **2** | **Compute optimized** | **Procesadores compute-bound** · **alto rendimiento** · **media transcoding** · **scientific modeling** · **machine learning** |
| **3** | **Memory optimized** | **Entrega rápida de grandes data sets en memoria** · **database servers** · **web caches** · **data analytics** |
| **4** | **Accelerated computing** | **High-graphics processing** · **GPU bound** · **machine learning** · **HPC** · **vehículos autónomos** |
| **5** | **Storage optimized** | **Alto read/write secuencial** · **grandes data sets** · **NoSQL databases** · **Amazon OpenSearch Service** |

> [!important] La familia se elige por **cuello de botella**, no por precio
> **General purpose** es el default razonable; cuando la carga está dominada por **CPU**, **memoria**, **GPU** o
> **I/O secuencial**, la familia especializada suele salir **más barata** porque evita **sobredimensionar el
> recurso que no es el límite**.

> [!note] Ampliación (no está en la fuente)
> **Machine learning** aparece tanto en **compute optimized** como en **accelerated computing**. La diferencia
> práctica: **compute optimized** para **inferencia/entrenamiento liviano en CPU**; **accelerated** cuando el
> trabajo se acelera con **GPU** (entrenamiento profundo, HPC, render).

---

## 2. Generación y tamaño

### 2.1 Actualizar a la última generación

La fuente da **dos beneficios de costo**:

| Beneficio | Detalle |
| --- | --- |
| **Menor precio por hora** | Las generaciones nuevas **cuestan menos por hora** que las viejas |
| **Mejor performance** | Puede resultar en **usar menos instancias** |

> *“Elegir el recurso correcto desde el principio requiere **mínimo esfuerzo**. Actualizar después requiere
> **overheads operativos y análisis** que podrían **no ser financieramente viables**.”*

La figura compara el costo de instancias de **distintas generaciones** y muestra que **conviene la última**.

> [!important] El costo de la deuda técnica
> Migrar de generación **no es solo** un cambio de precio: implica **revalidar** la aplicación, **replanificar
> capacidad** y **coordinar** el cambio. Por eso el momento barato para decidir es **el diseño**.

### 2.2 Instance sizing

Los tipos de instancia existen en **distintos tamaños**; cada tamaño asigna **distinta cantidad de recursos**
(**CPU, memoria, ancho de banda de red**).

**Cómo se elige:** **benchmarkear la aplicación** y seleccionar el tamaño que **balancee performance y costo**.

> [!tip] En Auto Scaling, “más chico” suele ser mejor
> *“Cuando usás un **Amazon EC2 Auto Scaling group**, las instancias **más chicas** permiten que tu capacidad
> **se ajuste más de cerca a la demanda**.”*
> La razón es granularidad: con instancias grandes, el escalón mínimo es **un bloque enorme**; con chicas, el
> ajuste es **fino** y se reduce el **sobredimensionamiento** en los valles.

La figura muestra que **las capacidades de un tipo de instancia escalan linealmente**: duplicar el tamaño
**duplica** los recursos (y el precio, aproximadamente).

---

## 3. Rightsizing recommendations

Dos herramientas recomiendan el **tipo de instancia óptimo**. **Ambas usan machine learning** para analizar
**métricas históricas de utilización**.

| Herramienta | Qué recomienda | Enfoque |
| --- | --- | --- |
| **AWS Compute Optimizer** | **Configuraciones óptimas** de recursos: **tipos de instancia EC2**, **configuraciones de volumen EBS**, **task sizes de ECS en Fargate**, **licencias de software comercial** y **tamaños de memoria de Lambda** | **ML** sobre **métricas históricas de utilización** |
| **AWS Cost Explorer** | **Downsizing o terminación** de instancias EC2 | **Rightsizing recommendations** sobre **recursos y uso** para **bajar el gasto** |

### 3.1 Compute Optimizer en detalle

| Aspecto | Detalle |
| --- | --- |
| **Alcance** | **EC2**, **EBS**, **ECS en Fargate**, **licencias comerciales**, **Lambda (memoria)** |
| **Página de recomendaciones EC2** | Lista **cada instancia actual** con **findings**, **finding reasons**, **platform differences**, **tipo actual** y **precio por hora actual** según la **opción de compra** |
| **Recomendación principal** | Aparece **al lado de cada instancia** |
| **Valor extra** | **Escenarios what-if** con los recursos recomendados |

### 3.2 Cost Explorer en detalle

| Aspecto | Detalle |
| --- | --- |
| **Qué busca** | **Oportunidades de ahorro** por **downsizing** o **terminación** |
| **Qué analiza** | **Recursos y uso de EC2** |
| **Detalle de la recomendación** | **Utilización**, **tipo de instancia específico** recomendado y **ahorro mensual y anual estimado** |

> [!important] Compute Optimizer vs. Cost Explorer
> **Compute Optimizer** = **qué recurso usar** (tipo, tamaño, configuración), con **más servicios** cubiertos.
> **Cost Explorer** = **dónde ahorrar** en EC2, con **ahorro estimado en dólares** y foco en **downsize/terminate**.
> Si la pregunta pide **“configuración óptima”**, gana Compute Optimizer; si pide **“ahorro estimado”**, Cost
> Explorer.

> [!note] Ampliación (no está en la fuente)
> **AWS Trusted Advisor** también tiene checks de **cost optimization** (instancias de baja utilización, recursos
> ociosos, IPs sin asociar). La lección **no lo incluye** en esta comparación y el **self-check** de §8 lo trata
> como distractor para “rightsizing recommendations”. No confundir **check de costo** con **recomendación de
> rightsizing**.

---

## 4. Estados de EC2 que cuestan

Una instancia **detenida** o **que falla un health check** está **inutilizable**, pero **puede seguir generando
costos**.

### 4.1 Stopped o idle

| Recurso | ¿Cobra? |
| --- | --- |
| **Uso de la instancia** | **No** |
| **Data transfer** | **No** |
| **Volúmenes EBS adjuntos** | **Sí**, siguen generando costo |

> [!warning] Detener no es lo mismo que dejar de pagar
> El cómputo se detiene, pero **el storage no**. Una flota de instancias detenidas **con volúmenes grandes** sigue
> costando **todos los meses**. Para ahorrar de verdad hay que **revisar los EBS** también.

### 4.2 Failed health check / stuck

Las instancias **pueden generar costos mientras están trabadas**. Para evitarlo:

| Remedio | Cómo funciona |
| --- | --- |
| **EC2 auto recovery** | **Detiene y arranca automáticamente** las instancias que **fallan un health check** |
| **EventBridge + Lambda** | Un **evento de EventBridge** inicia una **función Lambda** que **termina** las instancias que **fallan repetidamente** los health checks |

> [!important] La lógica de las dos remediaciones
> **Auto recovery** intenta **salvar** la instancia; **EventBridge + Lambda** la **elimina** cuando el fallo es
> **recurrente**. La primera es **continuidad**; la segunda, **control de costo**.

---

## 5. Amazon EC2 Fleet

**Qué es:** una feature que **simplifica el aprovisionamiento de capacidad EC2** a través de **distintos tipos de
instancia y Availability Zones**.

| Aspecto | Detalle |
| --- | --- |
| **Modelos de compra** | **On-Demand**, **Reserved Instances (RI)** y **Spot** |
| **Invocación** | **Una sola llamada de API** |
| **Objetivo** | Alcanzar **escala, performance y costo** requeridos |
| **Spec** | **Target capacity**, **tipos de instancia** que sirven, **cuánto** de la flota se llena con **On-Demand, RI y Spot** |
| **Cómputo de capacidad** | Puede considerar **cantidad de cores y memoria** de cada instancia, o tratar **todas las instancias como iguales** |
| **Resultado** | Lanza la **combinación de menor precio** que cumple la capacidad objetivo |

> [!warning] Imprecisión de la fuente: “provisionar con RI”
> La lección dice que se puede **provisionar capacidad usando RI** y que se define **“cuánto de la flota”** se
> llena con cada modelo. En AWS, una **RI no se “lanza”**: es un **descuento de facturación** que se aplica a
> instancias **On-Demand elegibles**. **EC2 Fleet** lanza instancias **On-Demand y Spot**; las **RI y Savings
> Plans** **descuentan** esa capacidad, no la crean. Queda registrado en §12.

> [!note] Ampliación (no está en la fuente)
> La forma vigente de expresar la mezcla es **`OnDemandBaseCapacity`**, **`OnDemandPercentageAboveBaseCapacity`** y
> **`SpotAllocationStrategy`** dentro de una **mixed instances policy** (ver §6.4). **EC2 Fleet** y **Auto
> Scaling groups** comparten esa lógica de distribución.

---

## 6. Amazon EC2 Auto Scaling

### 6.1 Configuración básica

Primero se define la **configuración común** en un **launch template**. Después, para el **Auto Scaling group**:

| Opción | Detalle |
| --- | --- |
| **Tipos de instancia** | Elegir **uno o más**, opcionalmente **override** del tipo del launch template |
| **Pesos por tipo** | Asignar a cada tipo un **weight** individual; útil si difieren en **procesamiento, memoria, storage o red** |
| **Mezcla On-Demand / Spot** | Especificar **cuánta capacidad On-Demand y Spot** lanzar, y una **On-Demand base** opcional |
| **Prioridad de descuentos** | Priorizar tipos que se beneficien de **RI o Savings Plans** |
| **Distribución de Spot** | Definir cómo repartir la capacidad Spot **entre tipos** |

### 6.2 Mixed instance groups

Se puede **lanzar y escalar automáticamente** una flota de **On-Demand + Spot** **dentro de un mismo Auto Scaling
group**.

- **Spot** da **descuento** por sí mismo.
- **RI o Savings Plans** dan **descuento sobre el precio On-Demand regular**.

> [!important] Por qué mezclar
> La **base estable** se cubre con **On-Demand** (o con **RI/SP** que la abaratan); los **picos** se cubren con
> **Spot**. Así se protege la **disponibilidad** sin pagar **todo** al precio On-Demand.

### 6.3 Instance weights

Con **varios tipos de instancia**, cada tipo puede aportar **unidades de capacidad** distintas a la **capacidad
deseada**.

| Cómo ponderar | Ejemplo |
| --- | --- |
| **Por cores (vCPU)** | Una instancia de **4 vCPU** pesa **2** si la de **2 vCPU** pesa **1** |
| **Por memoria (GB)** | Se ajusta al **recurso que limita** la aplicación |

> **Para qué sirve:** mapear el peso **directamente a la performance** de la aplicación y poder **intercambiar
> tamaños** sin romper la capacidad total.

### 6.4 Estrategias de asignación

Cuando hay **varios tipos**, hay que definir **cómo se llena** la capacidad On-Demand y Spot.

#### On-Demand: prioritized

**Prioridad por orden** de los **launch template overrides**.

**Ejemplo literal:** overrides en orden **`c5.large` → `c4.large` → `c3.large`**. El grupo llena la capacidad
On-Demand **empezando por `c5.large`**, después `c4.large` y después `c3.large`.

#### Spot: capacity-optimized

| Característica | Detalle |
| --- | --- |
| **Qué hace** | Asigna instancias del **pool Spot con capacidad óptima** para la cantidad que se lanza |
| **Beneficio** | **Uso eficiente** de la capacidad **spare** de EC2 |
| **Datos que usa** | **Capacidad en tiempo real** + **tendencias históricas** |
| **Resultado** | **Menos interrupciones** |

#### Spot: lowest price

| Característica | Detalle |
| --- | --- |
| **Qué hace** | Asigna desde los **N pools Spot** que se especifiquen y desde los **de menor precio por unidad** en el momento |
| **Ejemplo** | **4 tipos × 4 AZ = hasta 16 pools**; con **N = 2**, puede llenar desde **un mínimo de 8 pools** con el **menor precio unitario** |
| **Beneficio** | **Menor costo posible** según los tipos pedidos |

> [!important] La trampa del “más barato”
> **lowest price** optimiza **costo**, pero puede elegir pools **más volátiles** → **más interrupciones**.
> **capacity-optimized** optimiza **estabilidad**. En el examen: si el requisito es **menos interrupciones**,
> la respuesta es **capacity-optimized**; si es **mínimo costo**, **lowest price**.

### 6.5 Ejemplo de configuración (literal)

```json
{
    "MixedInstancesPolicy": {
        "LaunchTemplate": {
            "LaunchTemplateSpecification": {
                "LaunchTemplateName": "LaunchTemplateA",
                "Version": "$latest"},
           "Overrides":[   {"InstanceType": "c5.large"},
                            {"InstanceType": "c4.large"},
                            {"InstanceType": "c3.large"}]
        },
        "InstancesDistribution": {
           "OnDemandAllocationStrategy": "prioritized",
           "OnDemandBaseCapacity": 12,
           "OnDemandPercentageAboveBaseCapacity": 50,
           "SpotAllocationStrategy": "lowest-price",
           "SpotInstacePools": 2
        }
    }
}
```

| Campo | Valor | Lectura |
| --- | --- | --- |
| **Overrides** | `c5.large`, `c4.large`, `c3.large` | Orden de **prioridad** para On-Demand |
| **OnDemandAllocationStrategy** | `prioritized` | Respeta el orden de los overrides |
| **OnDemandBaseCapacity** | **12** | **12 unidades** de base siempre On-Demand |
| **OnDemandPercentageAboveBaseCapacity** | **50** | Por encima de la base, **50 % On-Demand** |
| **SpotAllocationStrategy** | `lowest-price` | Busca el **menor precio por unidad** |
| **SpotInstacePools** | **2** | **N = 2** pools |

> [!warning] Typo de la fuente (sic)
> El JSON escribe **`SpotInstacePools`** (falta la **n** de *Instance*). El nombre correcto de la propiedad es
> **`SpotInstancePools`**. Se transcribe **literal** y se anota en §12.

### 6.6 Best practices de Auto Scaling (10, literales)

1. **Elegir la métrica y el target adecuados.**
2. **Elegir al menos dos instance type overrides** para mejorar la **disponibilidad** de On-Demand y Spot.
3. **Usar Reserved Instances o Savings Plans** para descuentos significativos frente a On-Demand.
4. **Elegir tipos del mismo tamaño entre familias** para mantener **estabilidad** al escalar.
5. **Usar Spot Instance interruption notices** para monitorear el estado de las Spot.
6. **Especificar el porcentaje de capacidad del grupo que se cubre con On-Demand** y usar **Spot** para optimizar
   costo.
7. **Usar tipos priorizados** para escalar en **eventos urgentes e impredecibles** y optimizar performance.
8. **Especificar un número alto de Spot pools** con **lowest-price**.
9. **Usar múltiples scaling policies** para manejar la capacidad.
10. **Usar instance weighting** para intercambiar **tamaños distintos**.

> [!tip] Lo que estas 10 reglas tienen en común
> **Diversidad** (varios tipos, varias AZ, varios pools) + **mezcla de compra** + **medición**. La diversidad es
> lo que evita que un cambio de capacidad o una interrupción de Spot **tumbe** el grupo.

---

## 7. Elasticidad y opciones de scaling

**Cloud elasticity** = **adquirir recursos cuando se necesitan y liberarlos cuando no**. Variar
**programáticamente** la cantidad de recursos **ahorra** y mantiene la capacidad.

Algunos servicios tienen **elasticidad incorporada**; otros se integran con **AWS Auto Scaling**.

### 7.1 AWS Auto Scaling vs. EC2 Auto Scaling

| Criterio | **AWS Auto Scaling** | **Amazon EC2 Auto Scaling** |
| --- | --- | --- |
| **Alcance** | **Múltiples recursos y servicios** | **Solo grupos de EC2** |
| **Para qué** | Definir **scaling policies** para varios **ASG** u otros recursos con **estrategias predefinidas** | Escalar grupos EC2 o **mantener la salud** de la flota |
| **Velocidad** | Configurar todo **más rápido** que servicio por servicio | Consola propia por recurso |
| **Políticas** | Solo **target tracking** | **Scheduled**, **step** y **target tracking** |
| **Creación del ASG** | **No** crea grupos: se crean **fuera** (EC2 console, API, CloudFormation) y AWS Auto Scaling les configura políticas | **Sí** crea y configura los grupos |

> [!important] La regla de elección
> Si necesitás **scheduled** o **step scaling**, o **crear** el grupo, usá **EC2 Auto Scaling**. Si querés
> **target tracking** para **varios recursos/servicios** en un solo lugar, usá **AWS Auto Scaling**.

### 7.2 Opciones de scaling

| Opción | Cómo funciona | Cuándo conviene |
| --- | --- | --- |
| **Sin política** (default) | Mantiene un **número fijo** de instancias para la **capacidad deseada** | Carga constante |
| **Scheduled scaling** | Ajusta **mínimo, máximo y deseado** en **fechas/horas** definidas | Patrones **predecibles** (ej.: sube miércoles, alto jueves, baja viernes; fines de semana) |
| **Dynamic scaling (target tracking)** | Escala **out** con alta demanda y **in** con baja utilización | Demanda **variable** |
| **Predictive scaling** | Analiza **carga histórica**, detecta **patrones diarios/semanales** y **pronostica** capacidad | Picos **anticipables** |
| **AWS Instance Scheduler** | **Start/stop** de **EC2 y RDS** por horario | **Dev/test** y horarios laborales |

### 7.3 Scheduled scaling

Permite **definir el propio calendario**. Las **scheduled actions** redimensionan el grupo ajustando
**mínimo, máximo y deseado**.

**Ejemplo literal:** el tráfico **sube el miércoles**, sigue **alto el jueves** y **baja el viernes**. Se planifican
acciones según ese patrón **predecible**; se ejecutan **automáticamente** en función de **fecha y hora**.

> [!tip] Por qué scheduled y no target tracking
> Para un patrón **conocido de antemano**, **scheduled** evita el **retraso de arranque** de las instancias:
> la capacidad está **antes** de que llegue el pico. Target tracking **reacciona**; scheduled **anticipa**.

### 7.4 AWS Instance Scheduler

**Qué es:** una **solución provista por AWS** para configurar **horarios custom de start/stop** de **EC2 y RDS**.

**Workflow (4 pasos literales):**

| # | Paso |
| --- | --- |
| **1** | Un **template de CloudFormation** crea un **evento de CloudWatch** con **intervalo definido por el cliente**, que invoca la **función Lambda** de Instance Scheduler. En la configuración se definen **Regiones y cuentas** y un **tag custom** que asocia **schedules** a **instancias y clusters** de EC2/RDS |
| **2** | Los **valores de configuración** se guardan en **DynamoDB** y la **Lambda** los lee **cada vez que corre**. Después se aplica el **tag custom** a las instancias correspondientes |
| **3** | En la configuración inicial se define una **tag key** para identificar instancias/clusters. Al crear un **schedule**, **el nombre** que se especifica se usa como **tag value** que identifica el schedule aplicado al recurso |
| **4** | La **Lambda** también registra el **nombre del schedule**, la **cantidad de instancias asociadas** y la **cantidad de instancias corriendo** como **métrica custom opcional** en **CloudWatch** |

**Ahorro declarado:** **hasta 70 %** vs. correr **24 horas al día**, para quienes la usan en **horario laboral**.
Aplica a **development y production**.

> [!note] Ampliación (no está en la fuente)
> La solución se despliega como **stack de CloudFormation** y usa **DynamoDB** como configuración, **Lambda** como
> motor y **CloudWatch** como disparador y métrica. Es la misma herramienta que aparece en [[Cost Optimization]],
> acá con el **workflow** detallado.

### 7.5 Dynamic scaling y predictive scaling

| Tipo | Mecánica |
| --- | --- |
| **Dynamic / target tracking** | Se define una **scaling policy** que responde a la demanda: **scale out** en picos y **scale in** en valles |
| **Predictive** | Analiza **datos históricos de carga**, detecta **patrones diarios o semanales**, **pronostica** la necesidad futura y **aumenta la capacidad por adelantado** |

**Predictive**, según la figura: un **modelo de ML actualizado regularmente con datos diarios** predice los
**requisitos de scaling**.

---

## 8. Self-check de la lección

> **Pregunta:** ¿qué servicios proveen **recomendaciones de rightsizing** desde una **perspectiva de ahorro de
> costos**? **(elegir 2)**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A. AWS Cost Explorer** | ✅ | Su feature de **rightsizing recommendations** identifica **downsizing o terminación** y muestra **ahorro mensual/anual estimado** |
| **B. AWS Trusted Advisor** | ❌ | Tiene **checks de cost optimization**, pero la lección **no lo presenta** como motor de **rightsizing recommendations** |
| **C. AWS Compute Optimizer** | ✅ | **ML** sobre métricas históricas para recomendar **tipo/configuración óptima** |
| **D. Amazon CloudWatch** | ❌ | **Mide** métricas; no genera recomendaciones de rightsizing |

> **Respuesta: A y C.**

> [!note] Sobre la fuente
> El self-check **no trae rationale oficial** ni “Correct!”. La justificación es **propia**, basada en §3.

---

## 9. Traducción del contenido

### 9.1 Introducción

Como **arquitectos de nube**, una de las **responsabilidades principales** es **diseñar e implementar soluciones**
que no solo **cumplan los requisitos de performance**, sino que también **optimicen costos**. En el mundo
**cloud-first** actual, los **recursos de cómputo** suelen representar **una porción significativa del gasto** de
una organización, lo que los convierte en un **área crítica** para la optimización de costos.

En esta lección, profundizás en **estrategias y mejores prácticas** para **optimizar tus costos de cómputo de AWS**
**sin sacrificar performance ni confiabilidad**. Explorás cómo **rightsizear tus instancias**, **aprovechar
distintas opciones de compra de EC2**, **implementar estrategias de instancias mixtas** y **aplicar técnicas
prácticas de ahorro**.

### 9.2 Familias de instancias de Amazon EC2

**Amazon EC2** provee una **amplia selección de tipos de instancia** optimizados para **distintos casos de uso y
workloads**. Según sus **capacidades**, cada instancia se **categoriza en una familia**.

**1: General purpose**

Esta familia es útil para workloads que requieren: **balance de compute, memoria y red**, **diversidad**,
**aplicaciones web**.

**2: Compute optimized**

Útil para workloads que requieren: **procesadores compute-bound**, **procesadores de alto rendimiento**, **media
transcoding**, **scientific modeling**, **machine learning**.

**3: Memory optimized**

Útil para workloads que requieren: **entrega rápida de grandes data sets en memoria**, **database servers**,
**web caches**, **data analytics**.

**4: Accelerated computing**

Útil para workloads que requieren: **high-graphics processing**, **GPU bound**, **machine learning**, **high
performance computing (HPC)**, **vehículos autónomos**.

**5: Storage optimized**

Útil para workloads que requieren: **alto read/write secuencial**, **grandes data sets**, **bases NoSQL**,
**Amazon OpenSearch Service**.

### 9.3 Actualizar a la última generación

Actualizar a las instancias de **última generación** puede dar **dos beneficios de costo**:

- Las **generaciones nuevas** tienen un **precio por hora menor** que las anteriores.
- Las **generaciones nuevas** dan **mejor performance**, lo que puede resultar en **usar menos instancias**.

**Elegir el recurso correcto desde el principio requiere mínimo esfuerzo. Actualizar después requiere overheads
operativos y análisis que podrían no ser financieramente viables.**

> **Comparación de generaciones:** al comparar el costo de instancias de **distintas generaciones**, se ve que es
> **costo-efectivo usar la última generación**.

### 9.4 Instance sizing

Los **tipos de instancia** están disponibles en **distintos tamaños**. Cada tamaño tiene **distinta cantidad de
recursos** asignados (**CPU, memoria, ancho de banda de red**). **Benchmarkeá tu aplicación** y **elegí el tamaño
correcto** para **balancear performance y costo**.

Cuando usás un **Amazon EC2 Auto Scaling group**, las **instancias más chicas** permiten que tu capacidad **coincida
más de cerca con la demanda**.

> **La capacidad de las instancias de un tipo escala linealmente.**

### 9.5 Recomendaciones de rightsizing

**AWS Compute Optimizer** y **AWS Cost Explorer** proveen **recomendaciones óptimas de instancias EC2** para tus
workloads. **Ambas herramientas usan un motor de machine learning** para analizar **métricas históricas de
utilización**.

**AWS Compute Optimizer**

Con **AWS Compute Optimizer** podés identificar las **configuraciones óptimas** de recursos como **tipos de
instancia EC2**, **configuraciones de volúmenes EBS**, **task sizes de servicios ECS en Fargate**, **licencias de
software comercial** y **tamaños de memoria de funciones Lambda**, usando **machine learning** para analizar
**métricas históricas de utilización**.

La **página de recomendaciones** para instancias EC2 lista **cada una de tus instancias actuales**. También lista
**findings**, **finding reasons**, **platform differences**, **tipo de instancia actual** y **precio por hora
actual** para la **opción de compra seleccionada**. La **recomendación principal** de Compute Optimizer aparece
**al lado de cada instancia**.

**AWS Cost Explorer**

La feature de **rightsizing recommendations** de **Cost Explorer** ayuda a **identificar oportunidades de ahorro**
haciendo **downsizing o terminando instancias** de **Amazon EC2**. Las recomendaciones analizan tus **recursos y
uso de EC2** para mostrar **oportunidades de bajar el gasto**.

Para ver el **detalle** de una recomendación, seleccioná la instancia que te interesa. La recomendación ofrece
**detalles de utilización**, recomienda un **tipo de instancia EC2 específico** y muestra el **ahorro mensual y
anual estimado**.

### 9.6 Estado de las instancias EC2

Cuando una instancia EC2 está **stopped**, está **apagada** y **no se puede usar**. Del mismo modo, cuando una
instancia **falla un health check**, **no se puede usar** y **será terminada**. En ambos casos, la instancia está
**idle o trabada**. Sin embargo, **podrías incurrir en costos** en los dos casos.

**Stopped o idle**

Cuando **detenés** la instancia, **no se te cobra** por **uso** ni por **data transfer**. Los **volúmenes EBS
adjuntos** a las instancias detenidas **siguen generando costos**.

**Falla de health check o estado trabado**

Las instancias **pueden generar costos** mientras están **trabadas**. Para evitarlo:

- **Activá EC2 auto recovery** para **detener y arrancar automáticamente** las instancias que **fallan un health
  check**.
- **Creá un evento de EventBridge** que inicie un **script Lambda** para **terminar** las instancias que **fallan
  repetidamente** los health checks.

### 9.7 Amazon EC2 Fleet

**Amazon EC2 Fleet** es una feature que **simplifica el aprovisionamiento de capacidad EC2** a través de **distintos
tipos de instancia y Availability Zones**. También podés **aprovisionar instancias** con los modelos **On-Demand**,
**Reserved Instances (RI)** y **Spot**. Con **una sola llamada de API**, podés **aprovisionar capacidad** a través
de **tipos de instancia y modelos de compra** para lograr la **escala, performance y costo** requeridos.

Podés crear una **spec de EC2 Fleet** definiendo **target capacity**, **qué tipos de instancia** te sirven y
**cuánto de la flota** debe llenarse con **On-Demand, RI y Spot**. También podés indicar si EC2 Fleet debe
considerar la **cantidad de cores y memoria** de cada instancia o **tratar todas las instancias como iguales** al
escalar. EC2 Fleet luego **lanza la combinación de menor precio** que cumple la capacidad objetivo según esas
preferencias. EC2 Fleet te permite usar **múltiples tipos de instancia y modelos de compra** para **aprovisionar
capacidad de forma costo-efectiva** con **unos pocos clics** en la consola.

### 9.8 Amazon EC2 Auto Scaling

Al crear un **Amazon EC2 Auto Scaling group**, primero especificás los **parámetros de configuración comunes** en un
**launch template**. Para configurar el grupo, podés:

- **Elegir uno o más tipos de instancia** (opcionalmente **override** del tipo especificado en el launch template).
- **Asignar a cada tipo un weight individual**. Útil, por ejemplo, si los tipos ofrecen **distinto procesamiento,
  memoria, storage o ancho de banda**.
- **Especificar cuánta capacidad On-Demand y Spot** lanzar y una **porción base On-Demand** opcional.
- **Priorizar tipos de instancia** que puedan **beneficiarse con descuentos de RI o Savings Plans**.
- **Definir cómo distribuir la capacidad Spot** entre tipos.

**Mixed instance groups**

Podés **lanzar y escalar automáticamente** una flota de **On-Demand y Spot** **dentro de un mismo Auto Scaling
group**. Además de los **descuentos por Spot**, podés usar **Reserved Instances o un Savings Plan** para obtener
**tarifas con descuento** sobre el **precio On-Demand regular**.

**Instance weights**

Cuando configurás un grupo para **lanzar múltiples tipos**, podés definir la **cantidad de unidades de capacidad**
que cada instancia aporta a la **capacidad deseada** mediante **instance weighting**. Esto permite **especificar el
peso relativo** de cada tipo **mapeado directamente a la performance** de la aplicación. Podés ponderar por
**cores (vCPU)** o por **memoria (GB)**.

**Mixed instance groups — estrategias de asignación**

Con **múltiples tipos**, administrás **cómo** Auto Scaling **llena** la capacidad On-Demand y Spot. Para eso
especificás **allocation strategies**.

**Prioritized allocation para On-Demand**

La estrategia para On-Demand es **prioritized**. Auto Scaling usa el **orden de los tipos** en la lista de
**launch template overrides** para determinar **qué tipo usar primero** al llenar capacidad On-Demand. Ejemplo: si
especificás **tres overrides** en orden **`c5.large`, `c4.large`, `c3.large`**, al lanzar On-Demand el grupo llena
**empezando por `c5.large`**, luego **`c4.large`** y luego **`c3.large`**.

**Capacity-optimized**

Auto Scaling asigna instancias del **pool Spot con capacidad óptima** para la **cantidad de instancias que se
lanza**. Desplegar así ayuda a **usar eficientemente la capacidad spare** de EC2.

- Lanza en los **pools más disponibles**.
- Los **datos de disponibilidad** se basan en **capacidad en tiempo real** y **tendencias históricas**.
- Da **posibilidad de menos interrupciones**.

**Lowest price**

Auto Scaling asigna instancias de los **N pools Spot** que especifiques y de los **pools con menor precio por
unidad** en el momento. Ejemplo: con **cuatro tipos y cuatro AZ**, el grupo puede usar hasta **16 pools Spot**
distintos. Si especificás **dos pools (N = 2)**, puede llenar capacidad desde un **mínimo de ocho pools** donde el
**precio por unidad es el más bajo**.

- Lanza según el **menor precio por unidad** en ese momento.
- Provee el **menor costo posible** según los tipos pedidos.

**Ejemplo de configuración de mixed instance group**

```json
{
    "MixedInstancesPolicy": {
        "LaunchTemplate": {
            "LaunchTemplateSpecification": {
                "LaunchTemplateName": "LaunchTemplateA",
                "Version": "$latest"},
           "Overrides":[   {"InstanceType": "c5.large"},
                            {"InstanceType": "c4.large"},
                            {"InstanceType": "c3.large"}]
        },
        "InstancesDistribution": {
           "OnDemandAllocationStrategy": "prioritized",
           "OnDemandBaseCapacity": 12,
           "OnDemandPercentageAboveBaseCapacity": 50,
           "SpotAllocationStrategy": "lowest-price",
           "SpotInstacePools": 2
        }
    }
}
```

**Best practices de Amazon EC2 Auto Scaling**

Para **optimizar costos** con **EC2 Auto Scaling**:

- **Elegir la métrica y el target adecuados.**
- **Elegir al menos dos instance type overrides** para mejorar la **disponibilidad** de On-Demand y Spot.
- **Usar RI o Savings Plans** para descuentos significativos frente a On-Demand.
- **Elegir tipos del mismo tamaño entre familias** para mantener **estabilidad** al escalar.
- **Usar Spot Instance interruption notices** para monitorear el estado de las Spot.
- **Especificar el porcentaje de capacidad del grupo cubierto por On-Demand** y usar **Spot** para optimizar costo.
- **Usar tipos priorizados** para escalar en **eventos urgentes e impredecibles** y optimizar performance.
- **Especificar un número alto de Spot pools** con **lowest-price**.
- **Usar múltiples scaling policies** para manejar capacidad.
- **Usar instance weighting** para **intercambiar tamaños**.

### 9.9 Implementación práctica

**Cloud Elasticity** es la **capacidad de adquirir recursos cuando se necesitan y liberarlos cuando no**. Aprovechar
la **elasticidad** para **satisfacer la demanda cambiante** puede dar **ahorros significativos**. Podés **variar
programáticamente** la cantidad de recursos de nube, **aumentando o disminuyendo** la capacidad.

Algunos servicios de AWS tienen **elasticidad incorporada**; otros se **integran con AWS Auto Scaling**.

**AWS Auto Scaling**

Usá **AWS Auto Scaling** para **gestionar scaling de múltiples recursos en múltiples servicios**. Permite definir
**políticas de scaling dinámico** para **varios grupos de EC2 Auto Scaling u otros recursos** con **estrategias
predefinidas**.

Configurar las políticas con AWS Auto Scaling **para todos los recursos escalables** de la aplicación es **más
rápido** que hacerlo **servicio por servicio**. AWS Auto Scaling incluye **estrategias predefinidas** que
**simplifican** el setup.

**Amazon EC2 Auto Scaling**

Usá **Amazon EC2 Auto Scaling** si **solo necesitás escalar grupos EC2** o si solo te interesa **mantener la salud
de la flota**. También si necesitás **crear o configurar grupos** o **configurar políticas scheduled o step**
(porque **AWS Auto Scaling solo soporta target tracking**).

Los **grupos de EC2 Auto Scaling** deben **crearse y configurarse fuera** de AWS Auto Scaling (consola EC2, API o
CloudFormation). **AWS Auto Scaling** ayuda a configurar **políticas dinámicas** para los grupos **existentes**.

**Opciones de Amazon EC2 Auto Scaling**

Por **default**, un grupo **no tiene políticas** y mantiene un **número fijo** de instancias. Podés definir la
política **manualmente**, **por schedule** o **por demanda**, y usar **predictive scaling** para **escalar
proactivamente** por requisitos futuros.

**Scheduled Scaling**

Permite **definir tu propio calendario**. Las **scheduled actions** redimensionan grupos **ajustando mínimo,
máximo y deseado**. Podés **lanzar y terminar instancias** según **patrones predecibles**, **disponibilidad
requerida** y **períodos extensos de baja utilización** como **fines de semana o feriados**.

Ejemplo: si **cada semana** el tráfico **sube el miércoles**, sigue **alto el jueves** y **baja el viernes**, podés
planificar acciones según esos **patrones predecibles**. Se ejecutan **automáticamente** en función de **fecha y
hora**.

**AWS Instance Scheduler**

Es una **solución simple provista por AWS** que permite **configurar horarios custom de start/stop** de **EC2 y
RDS**.

**1:** El **template de CloudFormation** configura un **evento de CloudWatch** con **intervalo definido por el
cliente**. Ese evento **invoca la función Lambda** de Instance Scheduler. Durante la configuración, el usuario
define **Regiones y cuentas** y un **tag custom** que la solución usa para **asociar schedules** a las **instancias
y clusters** de EC2/RDS.

**2:** Los **valores de configuración** se guardan en **DynamoDB** y la **Lambda** los **recupera cada vez que
corre**. Después podés **aplicar el tag custom** a las instancias correspondientes.

**3:** Durante la **configuración inicial**, definís una **tag key** para identificar instancias/clusters. Cuando
**creás un schedule**, **el nombre que especificás** se usa como **tag value** que identifica el schedule aplicado
al recurso.

**4:** La **Lambda** también registra el **nombre del schedule**, la **cantidad de instancias asociadas** y la
**cantidad de instancias corriendo** como **métrica custom opcional** en **CloudWatch**.

**AWS Instance Scheduler** es **fácil de desplegar** y ayuda a **reducir costos operativos** en **development y
production**. Los clientes que la usan para correr instancias **en horario laboral** pueden **ahorrar hasta 70 %**
frente a correrlas **24 horas al día**.

**Dynamic Scaling con Target Tracking**

Cuando configurás **dynamic scaling**, definís **cómo escalar la capacidad** del grupo **en respuesta a la demanda
cambiante** creando una **scaling policy**. EC2 Auto Scaling puede **scale out** (**agregar instancias**) para
**alta demanda en picos** y **scale in** (**correr menos instancias**) para **reducir costos en baja utilización**.

**Predictive Scaling**

**Predictive scaling** analiza **datos históricos de carga** para **detectar patrones diarios o semanales** en los
flujos de tráfico. Usa esa información para **pronosticar la necesidad futura de capacidad**, de modo que EC2 Auto
Scaling pueda **aumentar proactivamente** la capacidad del grupo para **coincidir con la carga anticipada**.

Según la figura: un **modelo de machine learning actualizado regularmente con datos diarios**; en base a los datos,
el modelo **predice los requisitos de scaling**.

### 9.10 Self-check

**Pregunta:** ¿qué servicios proveen **recomendaciones de rightsizing** desde una **perspectiva de ahorro de
costos**? **(Elegir 2.)**

A. AWS Cost Explorer
B. AWS Trusted Advisor
C. AWS Compute Optimizer
D. Amazon CloudWatch

---

## 10. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 10.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Selección de familia/tipo/tamaño** | **1.5** Estrategias de optimización de costos y visibilidad · **2.6** Optimización para metas |
| **Rightsizing** | **1.5** · **3.5** Oportunidades de optimización |
| **Modelos de compra y mezcla** | **2.6** · **3.5** |
| **Auto Scaling y elasticidad** | **2.6** · **3.1** Excelencia operativa |
| **Eliminación de recursos ociosos o trabados** | **3.5** · **3.1** |

### 10.2 Diez puntos para llevarse

1. **5 familias**: **general · compute · memory · accelerated · storage**.
2. **Última generación** = **menor precio/hora** + **mejor performance** (menos instancias).
3. **Decidir bien al inicio** es barato; **migrar después** tiene costo operativo.
4. **Instancias más chicas** en ASG ajustan **más fino** a la demanda.
5. **Compute Optimizer** cubre **EC2, EBS, ECS/Fargate, licencias y Lambda**; **Cost Explorer** se enfoca en
   **downsize/terminate** con **ahorro estimado**.
6. **Instancia detenida**: no cobra uso ni data transfer, **pero los EBS siguen cobrando**.
7. **Health check fallido/repetido**: **auto recovery** o **EventBridge + Lambda** para terminar.
8. **EC2 Fleet** = **una API**, múltiples tipos/AZ/modelos, **combinación de menor precio**.
9. **On-Demand = prioritized**; **Spot = capacity-optimized** (menos interrupciones) o **lowest-price** (menor
   costo).
10. **AWS Auto Scaling** = multi-servicio, solo **target tracking**; **EC2 Auto Scaling** = grupos EC2, permite
    **scheduled/step**.

### 10.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Instancia detenida = costo cero” | Los **volúmenes EBS** siguen cobrando |
| “Compute Optimizer solo analiza EC2” | También **EBS, ECS/Fargate, licencias y Lambda** |
| “Cost Explorer recomienda configuración óptima” | Recomienda **downsize/terminate** y muestra **ahorro**; la configuración óptima es **Compute Optimizer** |
| “Más grande siempre es más estable” | Más chicas dan **mejor granularidad** y **más resiliencia** |
| “La última generación siempre cuesta más” | **Menor precio/hora** y **mejor performance** |
| “capacity-optimized elige el precio más bajo” | Elige **capacidad disponible**; el más barato es **lowest price** |
| “lowest price minimiza interrupciones” | Minimiza **costo**, no interrupciones |
| “AWS Auto Scaling hace scheduled scaling” | **Solo target tracking**; scheduled/step son de **EC2 Auto Scaling** |
| “AWS Auto Scaling crea los grupos” | Los grupos se crean **fuera**; AWS Auto Scaling les configura políticas |
| “EC2 Fleet compra RI” | Las **RI descuentan**; no se **lanzan** |

> [!note] Ampliación (no está en la fuente)
> Para el examen, tres atajos:
> **“¿qué tipo/tamaño?”** → **Compute Optimizer** ·
> **“¿cuánto ahorro?”** → **Cost Explorer** ·
> **“¿menos interrupciones de Spot?”** → **capacity-optimized**.

---

## 11. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: familias, generación/tamaño, rightsizing, estados, EC2 Fleet, Auto Scaling, elasticidad y self-check | Nota completa (secciones 1–10) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **“Provisionar con RI” en EC2 Fleet.** La fuente dice que se **aprovisiona capacidad** con **On-Demand, RI y
   Spot** y que se define **cuánto de la flota** va con cada modelo. En AWS, las **RI son un descuento de
   facturación**, no un mecanismo de lanzamiento: **EC2 Fleet lanza On-Demand/Spot** y las RI **descuentan** la
   parte elegible. Se transcribe literal y se aclara en §5.
2. **Typo en el JSON.** La propiedad aparece como **`SpotInstacePools`** (falta la **n**). El nombre correcto es
   **`SpotInstancePools`**. Se conserva **sic** y se anota en §6.5.
3. **Health check fallido = “will be terminated”.** La lectura lo afirma de forma directa. En la práctica, un
   **Auto Scaling group** **reemplaza** la instancia; una instancia **fuera** de ASG no se termina sola. Se
   transcribe y se enmarca en §4.2.
4. **Trusted Advisor en el self-check.** La opción **B** se descarta para “rightsizing recommendations”, aunque
   Trusted Advisor **sí tiene checks de costo**. Se explica en §8 y §3.2.
5. **Self-check sin rationale.** No llegó “Correct!” ni explicación oficial; la justificación de §8 es **propia**.
6. **Imágenes no disponibles.** La lectura referencia **catorce** capturas (`VABRGJ9MYT.png`, `XEPA2XK1SX.png`,
   `Y5N93CAG5R.png`, `XUKXDBHJ8K.png`, `ZAP1E56EPT.png`, `236B4U1J71.png`, `EZB2ZSTWR7.png`, `95GY4BPVEF.png`,
   `3R3PSQ78VS.png`, `WTX98EUZG2.jpeg`, `NADMB4WB2G.jpeg`, `WDX9NFSZ35.jpeg`, `GSMU1UQZHA.jpeg`,
   `HYJAZNN46M.png`) que **no están en el vault**.

**Decisiones de transcripción:**

- Se conservan **general purpose**, **compute optimized**, **memory optimized**, **accelerated computing**,
  **storage optimized**, **rightsizing**, **mixed instances**, **weights**, **capacity-optimized**,
  **lowest price** y **target tracking**.
- Los **números** se transcriben literales: **12** de base On-Demand, **50 %** por encima de la base, **N = 2**,
  **16 pools**, **8 pools**, **70 %**.
- El **ejemplo de prioridad** se transcribe con los tres tipos exactos: **`c5.large`**, **`c4.large`**,
  **`c3.large`**.
- No se agregaron **precios** ni **métricas** que la fuente no da.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Cost Optimization]] — los 5 pilares: rightsizing, elasticidad, pricing, storage y mejora continua
- [[Cost Management Tools]] — Cost Explorer, CUR, Budgets y tagging
- [[Cloud Cost Management]] — marco de financial management
- [[Governance at Scale]] — guardrails y presupuesto
- [[Knowledge Check 2]] — evaluación del bloque de costos
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
