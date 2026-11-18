---
title: "Cloud Cost Management"
aliases:
  - "Cloud cost management"
  - "Gestión de costos en la nube"
  - "Cost management vs cost optimization"
  - "Cloud financial management"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - costos
  - finops
  - governance
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Cloud Cost Management"
---

# Cloud Cost Management

> [!abstract] Qué es este archivo
> Lección de **7:00** que corre el eje: de los **controles** (Service Catalog, Config, GuardDuty) al **dinero**.
> Todavía **no** enseña las herramientas concretas de AWS: el video cierra anunciándolas (*“let's look at the
> specific tools AWS provides”*). Lo que fija es el **marco mental**:
>
> - cómo cambia el **consumo tradicional** al **consumo en nube**;
> - las **4 áreas** que hay que adaptar (traceability, oversight, forecasting, control);
> - la diferencia entre **gestionar** y **optimizar** costos;
> - las **4 etapas** del viaje a la nube y los **7 pasos** de cloud financial management.

> [!quote] La idea que hay que retener
> **Gestionar costos es ver; optimizar es actuar.**
> Y en la nube el costo no es un accidente de fin de mes: **se diseña**. Las decisiones de la etapa de
> **investigación y diseño** —sobre todo el **tagging**— condicionan los costos **por años**.

---

## Resumen en una frase

> La nube reemplaza el **gasto fijo con ciclos largos de compra** por **consumo variable y elástico**, y eso obliga
> a rediseñar cuatro prácticas —**traceability, oversight, forecasting y control**— para **ver** dónde se va el
> dinero (cost management) y **actuar** para entregar el mismo valor al menor precio posible (cost optimization),
> madurando a lo largo de **cuatro etapas** y **siete pasos**.

---

## 1. El escenario: el gerente de operaciones

La lección arranca con una situación concreta: el **operations manager** —que viene de manejar infraestructura
**on-premises** “con mano firme”— pregunta:

> *“Hemos desarrollado procedimientos efectivos y productivos de gestión y optimización de costos para recursos
> on-premises. **¿Cómo cambian estos procesos en un modelo de nube?**”*

No pregunta “cómo pago menos”. Pregunta **cómo adaptar un proceso que ya funciona**. La respuesta del video es un
cambio de modelo, no un descuento.

### 1.1 La analogía del restaurante

| Modelo | Cómo compra el restaurante | Cómo compra TI |
| --- | --- | --- |
| **Tradicional** | Compra **todos los ingredientes con meses de anticipación**, *“con la esperanza de haber adivinado el apetito de los clientes”* | Planifica meses, múltiples aprobaciones, **compra inicial grande** y convive con esa decisión **por años** |
| **Nube** | Usa **proveedores flexibles** y **ajusta los pedidos según lo que los clientes realmente quieren** | Aprovisiona **cuando lo necesita**, escala **arriba o abajo** con la demanda y **paga por lo que usa** |

> [!important] Por qué la analogía importa
> El problema del modelo tradicional **no es el precio unitario**: es **la apuesta**. Se compra capacidad contra un
> pronóstico y, si el pronóstico falla, el costo ya está comprometido. En la nube la **decisión es reversible**.
> Eso es lo que cambia el proceso —y lo que hace que el costo pase a ser **una decisión de arquitectura**.

---

## 2. Traditional vs. cloud technology consumption

### 2.1 El ciclo tradicional

| Paso | Quién lo hace | Qué pasa |
| --- | --- | --- |
| **1. Request** | **Engineering / IT teams** | Piden infraestructura |
| **2. Approve / procure** | **Finance teams** | Aprueban y compran |
| **3. Install / hand off** | **Operations teams** | Instalan (“rack and stack”) y entregan infraestructura lista |

Es un proceso **aprendido durante décadas** desde la perspectiva de **finance y procurement**: presupuestar,
pedir, aprobar, comprar e instalar.

### 2.2 Los dos costos ocultos del modelo tradicional

| Costo oculto | Efecto |
| --- | --- |
| **Costo de falla para finanzas** | Las inversiones son **capital a largo plazo**: si la apuesta sale mal, el dinero ya está gastado |
| **Costo de fricción para tecnología** | **Aprobaciones, ciclos de compra y operationalización** frenan **experimentación e innovación**; los equipos quedan bloqueados por **long pole dependencies** de organizaciones en silos |

> [!warning] “Anticuado” no significa “inútil”
> La lección dice que es *“un modelo anticuado que requiere ajustes para tener éxito en la nube”*, no que haya que
> tirarlo. Lo que se conserva es la **disciplina financiera**; lo que cambia es **el mecanismo**.

### 2.3 El ciclo en la nube

| Dimensión | Tradicional | Nube |
| --- | --- | --- |
| **Ciclo de aprobación / compra / despliegue** | Largo | **Corto**: los equipos innovan más rápido |
| **Costo de falla para finanzas** | Alto: capital comprometido | **Eliminado**: se está a **“unos pocos clics de UI o llamadas de API”** de terminar los recursos |
| **Rol del equipo de tecnología** | Solo **builders** | **Builders + operators + owners** del producto |
| **Quién hace procurement y deployment** | Finance y operations, en silos | **El propio equipo de tecnología**, que asume actividades **históricamente de finanzas y operaciones** |
| **Naturaleza del gasto** | **Fijo**, planificado por años | **Variable**, ajustable a la demanda |
| **Unidad de decisión** | Compra de infraestructura | **Uso del recurso** |

> [!important] La frase que resume el cambio
> *“Technology teams are no longer just builders, but **operators and owners** of their products.”*
> En el examen, cuando el enunciado dice que un equipo **crea** un workload y además **responde por su costo**, está
> describiendo este modelo: **ownership** del ciclo completo.

---

## 3. Adapting to be cloud-ready: las 4 áreas

La lección advierte una trampa de enfoque: **el costo no es la única preocupación del cliente**. Las empresas
tienen **necesidades extensas de financial management** que nacen de un **proceso de compra fundamentalmente
distinto**, con un modelo de costos **variable** en lugar de **fijo**.

> **Hay que repensar lo que en TI tradicional era rutina.**

| # | Área | Pregunta que responde | Qué implica | Qué se hace concretamente |
| --- | --- | --- | --- | --- |
| **1** | **Traceability** | **¿Quién usa qué?** | Rastrear costos **hasta equipos o proyectos individuales** de forma **estándar** | Modelos de **chargeback** o **showback**, o simplemente un **proceso regular de reporte y monitoreo** de costos |
| **2** | **Oversight** | **¿Estamos usando solo lo necesario?** | **Descentralizar** la gestión de costos en **toda** la organización | Institucionalizar **cost-consciousness** en el **diseño de aplicaciones** (de **monolitos** a diseños que **escalan según necesidad**) y **aprovechar el pricing de nube** |
| **3** | **Forecasting** | **¿Cuánto voy a gastar y por qué?** | Rediseñar el pronóstico con **machine learning y predictive analytics** | Trabajar **transversalmente** para entender los **drivers** de costo y uso: **lanzamiento de producto**, **campaña de marketing**, **expansión regional** |
| **4** | **Control** | **¿Cómo evito la sorpresa en la factura?** | Establecer **guardrails** | **Account strategy** definida · **partnership entre finanzas e ingeniería** · **inversión en personas, procesos y tecnología** para escalar |

### 3.1 Cómo se conectan las cuatro

```
TRACEABILITY  →  saber quién consume
      │
OVERSIGHT     →  decidir cuánto debería consumir
      │
FORECASTING   →  anticipar cuánto va a consumir
      │
CONTROL       →  evitar que se salga del carril
```

> [!note] Ampliación (no está en la fuente)
> **Chargeback** = se **factura internamente** el costo real a cada equipo/unidad de negocio.
> **Showback** = se **muestra** el costo sin transferirlo en el presupuesto.
> La lección los nombra como alternativas, sin definirlos: la diferencia está en si el número **afecta el
> presupuesto** del equipo o solo **informa**.

### 3.2 El detalle que más se pasa por alto: oversight no es centralizar

La lección dice **“instill oversight and decentralize cost management across the entire organization”**. Las dos
cosas juntas:

- **Oversight**: hay una **política y un marco** (account strategy, partnership, inversión).
- **Decentralize**: **cada equipo** toma decisiones de consumo dentro de ese marco.

Y el puente con arquitectura es explícito: **cost-consciousness se mete en el diseño de la aplicación**. Salir de
**monolitos** hacia diseños que **escalan cuando hace falta** no es solo una decisión técnica: es una decisión de
costo.

> [!tip] Por qué el monolito aparece en una lección de costos
> Un monolito obliga a **escalar todo** para atender la parte que se saturó. Un diseño que escala **por componente**
> permite escalar **solo lo que se usa**. La lección usa esto como ejemplo de **oversight institucionalizado en el
> diseño**, no como una clase de arquitectura.

---

## 4. Cost management vs. cost optimization

La distinción es corta y aparece dos veces (transcript y lectura). Es la definición que hay que poder recitar.

| Concepto | Definición literal | Verbo | Qué produce |
| --- | --- | --- | --- |
| **Cost management** | *“La capacidad de dar **visibilidad** de los costos para mantenerlos **bajo control**, y de proveer la **oportunidad** de optimización.”* | **Ver** | **Saber** dónde se va el dinero |
| **Cost optimization** | *“La capacidad de **operar sistemas** para entregar **valor de negocio** al **menor precio posible**.”* | **Actuar** | **Mejor eficiencia** sin perder valor |

> [!important] La relación es de dependencia, no de sinonimia
> **No se puede optimizar lo que no se ve.** Cost management **habilita** la optimización; cost optimization
> **ejecuta** lo que la visibilidad reveló. Una empresa puede tener **visibilidad perfecta y seguir gastando de
> más**; lo que no puede es optimizar **a ciegas**.

### 4.1 El caso del cliente retail

El ejemplo del video: un cliente de **retail** no solo **redujo sus costos de cómputo**, sino que **mejoró el
rendimiento de la aplicación** cuando empezó a **optimizar** en lugar de solo **monitorear**.

> [!warning] La trampa que desarma ese ejemplo
> “Optimizar” **no** es “recortar”. Si la optimización degrada el servicio, no es optimización: es **un recorte que
> se paga después**. La definición literal exige **entregar valor de negocio** — el ahorro es un medio, no el fin.

### 4.2 Las cuatro decisiones que hay que tomar

Gestionar costos en la nube **no es mirar el resultado del mes**. Es decidir, con información:

| Decisión | Pregunta |
| --- | --- |
| **Quién puede aprovisionar** | ¿Qué equipos/roles pueden crear recursos, y con qué límites? |
| **Qué opciones de pricing convienen** | ¿On-Demand, compromiso, spot? ¿Para qué workload? |
| **Qué servicios encajan mejor** | ¿La arquitectura usa el servicio adecuado para el patrón de uso? |
| **Cómo van a cambiar los costos al crecer** | ¿El costo escala **linealmente**, **por picos** o **por almacenamiento acumulado**? |

> **El objetivo declarado:** *“tomar decisiones informadas que **balanceen costo con rendimiento**.”*

---

## 5. El viaje a la nube: 4 etapas

El video describe **cuatro etapas** y subraya que **la aproximación a la optimización crece y cambia** con el
progreso. La metáfora es la del restaurante: **día de apertura → máquina aceitada**.

| # | Etapa | Qué caracteriza | Qué se hace | Riesgo si se saltea |
| --- | --- | --- | --- | --- |
| **1** | **Investigation and design** | Se define la base | **Tagging strategy** · revisar **support options** · establecer **fundaciones de visibilidad de costos** | Decisiones que impactan el costo **por años** |
| **2** | **Implementation and testing** | Los costos **típicamente suben** — *“y está bien”* | **Monitorear el gasto**, revisar **budgets** con regularidad, **probar la aplicación con distintos niveles de demanda** | Detectar **ineficiencias** tarde, cuando ya son problemas reales |
| **3** | **Production and growth** | Aparecen **patrones de uso reales** y sus costos | **Decisiones data-driven** de optimización | Optimizar sobre supuestos en vez de sobre uso real |
| **4** | **Operational** | Operación estable | Revisar **costos y uso** regularmente, **optimizar cuentas**, **rightsizing** de recursos subutilizados, decisiones inteligentes de **compromisos de largo plazo** | Deriva de costos y capacidad ociosa crónica |

### 5.1 La etapa 1 decide el resto

> *“The choices you make during an investigation and design can impact your costs for **years to come**.”*

Lo que se define ahí:

1. **Tagging strategy** — sin tags, **no hay traceability** (§3).
2. **Support options** — el nivel de soporte es un **costo fijo** que se elige temprano.
3. **Foundations for cost visibility** — la capacidad de **ver** se construye antes de necesitarla.

### 5.2 Etapa 2: el aumento de costo es esperado

La lección lo dice sin vueltas: en **implementation and testing** los costos **suben**, *“like stocking your
kitchen before opening night”*. Lo que hay que hacer **no es frenar el gasto**, es:

- **monitorear** el gasto mientras se desarrolla;
- **revisar budgets** seguido;
- **probar la aplicación con diferentes niveles de demanda**;
- **detectar y corregir ineficiencias** antes de que sean problemas reales.

> [!tip] La diferencia entre etapa 2 y etapa 4
> En **etapa 2** el costo sube porque **estás construyendo**; en **etapa 4** el costo sube porque **te olvidaste de
> mirar**. Misma dirección de la curva, causa opuesta, acción opuesta.

### 5.3 Etapa 3: el caso de e-commerce

Un cliente de **e-commerce** descubrió que podía **ahorrar significativamente** **escalando automáticamente** sus
recursos **según los patrones de tráfico reales de clientes**.

> [!important] Por qué el ejemplo es de “production”
> Recién en producción existen **patrones de uso reales**. Antes, el escalado se diseña con supuestos; después, se
> **calibra con datos**. La lección no dice “usá auto scaling”: dice que **la etapa habilita el dato** que permite
> decidir.

### 5.4 Etapa 4: optimización continua

En la etapa operativa se hace, de forma **regular**:

| Actividad | Qué busca |
| --- | --- |
| **Revisar costos y uso** | Detectar deriva |
| **Optimizar las cuentas** | Ordenar la estructura de costos |
| **Rightsizing** de recursos **no plenamente utilizados** | Eliminar capacidad ociosa |
| **Decisiones inteligentes sobre compromisos de largo plazo** | Bajar el precio unitario **donde el uso es predecible** |

> **La frase de cierre:** *“You're not just managing costs, but you're continuously finding new ways to optimize
> them.”* La optimización **no termina**: es una práctica.

---

## 6. Cloud financial management: los 7 pasos

> *“Getting good at cloud financial management is a journey with **seven key steps**.”*
> **Cada paso se apoya en los anteriores.**

| # | Paso | Qué significa | Pregunta que resuelve |
| --- | --- | --- | --- |
| **1** | **Ownership** | Definir **quién es responsable** de gestionar los costos | ¿Quién responde por este gasto? |
| **2** | **Partnership** | Hacer que **finanzas y tecnología trabajen juntos** | ¿Quién decide con quién? |
| **3** | **Cost allocation and enablement** | **Asignar** costos correctamente y **habilitar** a los equipos | ¿A qué equipo/proyecto le corresponde? |
| **4** | **Cost visibility** | Establecer **visibilidad clara** del gasto | ¿Puedo verlo y explicarlo? |
| **5** | **Cost optimization** | **Optimizar donde se pueda** | ¿Qué acción mejora la eficiencia? |
| **6** | **Cost forecasting** | **Mejorar el pronóstico** | ¿Cuánto voy a gastar y por qué? |
| **7** | **Education** | Asegurar que **todos entiendan su rol** en la gestión de costos | ¿Cada equipo sabe qué le toca? |

### 6.1 La lógica de la secuencia

```
1 OWNERSHIP ──► 2 PARTNERSHIP ──► 3 ALLOCATION ──► 4 VISIBILITY
                                                        │
                                                        ▼
                     7 EDUCATION ◄── 6 FORECASTING ◄── 5 OPTIMIZATION
```

| Bloque | Pasos | De qué se ocupa |
| --- | --- | --- |
| **Personas y acuerdo** | **1–2** | **Quién** es dueño y **con quién** se decide |
| **Mecánica** | **3–6** | **Asignar → ver → actuar → anticipar** |
| **Cultura** | **7** | Que el rol de cada uno sea **entendido**, no solo asignado |

> [!important] Orden, no lista
> La lección insiste: *“Each step builds on the ones before it.”*
> **Optimizar (5)** sin **asignación (3)** ni **visibilidad (4)** es adivinar. **Pronosticar (6)** sin
> **ownership (1)** es un ejercicio de finanzas sin dueño en el negocio. Y **education (7)** cierra el ciclo porque
> los pasos anteriores **reparten responsabilidad**: si nadie sabe qué le toca, el modelo se cae.

> [!note] Ampliación (no está en la fuente)
> Esta secuencia es **muy cercana al marco FinOps** (Inform → Optimize → Operate). La lección **no menciona FinOps**
> por nombre; el paralelo sirve para estudiar, no para citarlo como contenido de la fuente.
> Los **pasos 1–2** son los que más se saltean en la práctica: sin **ownership** y **partnership**, el resto se
> convierte en reportes que nadie usa.

---

## 7. Traducción del contenido

### 7.1 Introducción

**Cloud cost management de AWS: donde pagás solo por lo que necesitás, cuando lo necesitás.**

La gestión de costos en la nube de AWS **transforma el gasto tradicional de TI en una ventaja estratégica**
proveyendo **visibilidad, control y herramientas de optimización en tiempo real**, para que pagues **solo por lo que
necesitás**. Esta lección explora **monitoreo, controles automatizados y recomendaciones inteligentes** para
optimizar el gasto en la nube manteniendo el **rendimiento** y escalando de forma **eficiente**.

### 7.2 Transcript (duración: 7 minutos, 0 segundos)

Muy bien, es momento de **optimización de costos**. Es esencial entender esto para **evitar sorpresas** y realmente
**sacar el máximo provecho** de tu entorno de AWS. Además, AWS hace que sea fácil **gestionar y optimizar
efectivamente** tus costos de nube mientras **mantenés el rendimiento** que tus aplicaciones necesitan. Esto es algo
que **toda organización quiere hacer bien**. Así que veamos exactamente cómo hacerlo.

Empecemos con un **escenario**. Tu **gerente de operaciones** viene con preguntas urgentes sobre **cómo gestionar
costos en la nube**. Han estado operando **con mano firme** su infraestructura **on-premises**, pero el **gasto en
nube funciona distinto**. Y su pregunta apunta directamente a eso: *“Hemos desarrollado procedimientos efectivos y
productivos de gestión y optimización de costos para recursos on-premises. **¿Cómo cambian estos procesos en un
modelo de nube?**”* Necesitan entender **cómo adaptar sus prácticas existentes de control de costos** a este nuevo
entorno.

Pensá en cómo **un restaurante gestiona su inventario**. En **TI tradicional**, sos como un restaurante que tiene
que **comprar todos sus ingredientes con meses de anticipación**, solo **esperando haber adivinado el apetito de
sus clientes**. En la **nube**, sos más como un **restaurante moderno con proveedores flexibles**: podés **ajustar
los pedidos según lo que los clientes realmente quieren**.

La mayoría de las organizaciones están familiarizadas con el **modelo tradicional**: pasás **meses planificando**
tus necesidades tecnológicas, navegás **múltiples procesos de aprobación**, hacés **compras iniciales
sustanciales** y después **trabajás con esas decisiones por años**. Es un proceso que **sirvió bien a muchas
organizaciones**, pero viene con **ciclos de compra largos** y **flexibilidad limitada** una vez que los recursos
están desplegados.

La nube introduce **una forma distinta de pensar el consumo de tecnología**. En lugar de esos **grandes compromisos
iniciales**, podés **ajustar tus recursos según lo que realmente necesitás**. Los equipos pueden **aprovisionar
recursos cuando los necesitan**, **escalar arriba o abajo con la demanda** y **pagar por lo que usan**. Esta
flexibilidad es **valiosa**, pero también significa que **necesitamos pensar distinto la gestión de costos**.

Así que ayudemos a tu gerente de operaciones a **evolucionar sus procesos** mirando **cuatro áreas clave**.
Pensá en **traceability**: querés saber **quién está usando qué recursos**, igual que **rastrear ingredientes en
una cocina ocupada**. Después está **oversight**: asegurarte de **usar solo lo que necesitás**. También necesitás
**enfoques nuevos de forecasting**, porque tus costos **pueden variar mes a mes**. Y por último, necesitás
**controles que funcionen bien en este entorno dinámico**.

Hay algo que tu gerente de operaciones **necesita entender**: hay una **diferencia clave** entre **gestionar
costos** y **optimizarlos**. **Cost management** te ayuda a **ver adónde va tu dinero**, mientras que **cost
optimization** se trata de **tomar acción para mejorar la eficiencia**. Trabajé recientemente con un **cliente de
retail** que no solo **redujo sus costos de cómputo**, sino que **vio mejor rendimiento de la aplicación** cuando
empezó a **optimizar en lugar de solo monitorear**.

Gestionar costos en la nube **no es solo mirar el resultado final**: es **obtener valor de cada dólar** que gastás.
Tenés que pensar **quién puede aprovisionar recursos**, **qué opciones de pricing tienen sentido** para tus
workloads, **qué servicios encajan mejor** con tus necesidades y **cómo podrían cambiar tus costos al crecer**. Se
trata de **tomar decisiones informadas que balanceen costo con rendimiento**.

Y tu enfoque de **optimización de costos crece y cambia** a medida que **progresás en tu viaje a la nube**. Pensá en
cómo **un restaurante evoluciona** desde el **día de apertura**, cuando está aprendiendo el oficio, hasta
convertirse en **una máquina aceitada que sabe exactamente cómo gestionar sus recursos**. Vemos **cuatro etapas
principales** en este viaje: **investigation and design**, **implementation and testing**, **production and
growth** y, finalmente, la **operational stage**.

Las decisiones que tomás durante **investigation and design** pueden **impactar tus costos por años**. Es cuando
**establecés tu estrategia de tagging**, **revisás tus opciones de soporte** y **sentás las bases para la
visibilidad de costos**. **Hacer bien estas bases desde el principio** hace que **todo sea más fácil después**. Las
organizaciones necesitan **enfocarse en estos elementos fundacionales** para construir una **estrategia de gestión
de costos sostenible**.

Durante **implementation and testing**, típicamente vas a ver que **tus costos aumentan**, y **está bien**. Es como
**abastecer tu cocina antes de la noche de apertura**. La clave es **mantenerte encima de esos costos mientras se
desarrollan**: vas a querer **monitorear tu gasto**, **revisar tus budgets regularmente** y **probar qué tan bien
tus aplicaciones manejan distintos niveles de demanda**. Esta es tu oportunidad de **detectar y corregir
ineficiencias de costos antes de que sean problemas reales**.

Ahora, una vez que estás en **producción**, es cuando las cosas se ponen realmente interesantes: podés ver
**patrones de uso reales** y sus **costos asociados**. Es cuando podés empezar a tomar **decisiones basadas en
datos** sobre optimización. Uno de nuestros **clientes de e-commerce** descubrió que podía **ahorrar
significativamente** **escalando automáticamente sus recursos según los patrones de tráfico reales de sus
clientes**. Ese es exactamente el tipo de **insight** que tu gerente de operaciones está buscando.

En la **etapa operativa**, estás **operando sin problemas**: **revisás costos y uso regularmente**, **optimizás tus
cuentas**, hacés **rightsizing de recursos que no se usan plenamente** y tomás **decisiones inteligentes sobre
compromisos de largo plazo**. **No solo estás gestionando costos, sino encontrando continuamente nuevas formas de
optimizarlos.**

Volverte bueno en **cloud financial management** es un **viaje con siete pasos clave**. Empezás por **definir quién
es responsable** de gestionar los costos y **hacer que finanzas y tecnología trabajen juntos**. Después,
**establecés una asignación de costos adecuada**, **generás visibilidad clara sobre tu gasto**, **optimizás donde
podés**, **mejorás en el pronóstico** y **te asegurás de que todos entiendan su rol** en la gestión de esos costos.
**Cada paso se apoya en los anteriores**, ayudándote a crear un **enfoque integral** para gestionar tu gasto en la
nube.

Ahora que entendemos **cómo funciona cloud financial management a alto nivel**, veamos **las herramientas
específicas que AWS provee** para ayudar a tu gerente de operaciones a **implementar estas prácticas**.

### 7.3 Traditional technology consumption

**La forma tradicional**

Desde la perspectiva de **finanzas y procurement**, el proceso de **presupuestar, pedir, aprobar, comprar e
instalar** infraestructura física es uno que se **aprendió durante décadas**:

- Los equipos de **engineering o IT** son típicamente los **solicitantes**.
- Distintos equipos de **finanzas** actúan como **aprobadores y compradores**.
- Los equipos de **operaciones** **instalan y entregan** infraestructura lista para usar.

El proceso, sin embargo, **aumenta el costo de falla para las organizaciones de finanzas** debido a la **naturaleza
de largo plazo** de estas inversiones de capital. Las **aprobaciones, los ciclos de procurement y las actividades de
operationalización** también **frenan la experimentación e innovación** de los equipos de tecnología, que quedan
**bloqueados en dependencias de largo plazo (long pole dependencies)** de estas otras organizaciones en silos. Es
un **modelo anticuado** y **requiere ajustes** para tener éxito en la nube.

### 7.4 Cloud technology consumption

**La forma de la nube**

Con la adopción de la tecnología de nube, los equipos pueden **innovar más rápido** debido a la **reducción de los
ciclos de aprobación, procurement y despliegue de infraestructura**.

El **costo de falla también se elimina para las organizaciones de finanzas**, porque **siempre están a unos pocos
clics de UI o llamadas de API de terminar los recursos de nube**. Los equipos de tecnología **ya no son solo
builders**, sino **operators y owners de sus productos**, responsables de la **mayoría de las actividades
históricamente asociadas a los equipos de finanzas y operaciones**, incluidos **procurement y deployment**.

### 7.5 Adaptarse para estar listos para la nube

Aunque es fácil pensar que **el costo es la principal preocupación del cliente**, las **necesidades de las
empresas se extienden mucho más allá** de **cómo bajar la factura**. Las organizaciones tienen **necesidades
extensas de financial management**, que en parte resultan de un **proceso de procurement fundamentalmente distinto**
del que están acostumbradas con un **modelo de costos fijos pesado**.

La **naturaleza variable de la nube** significa que las empresas deben **repensar la forma en que hacen cosas que
se volvieron rutina** en la **gestión financiera de TI tradicional**, incluyendo:

#### Traceability

**Rastrear los costos hasta equipos o proyectos individuales de forma estándar**, ya sea con modelos de
**chargeback** o **showback**, o simplemente **estableciendo un proceso regular de reporte y monitoreo de costos**.

#### Oversight

**Instilar oversight y descentralizar la gestión de costos en toda la organización.** Esto incluye
**institucionalizar la conciencia de costos en el proceso de diseño de aplicaciones**, para **alejarse de
aplicaciones monolíticas hacia diseños modernos que puedan escalar según sea necesario**. También incluye
**aprovechar el pricing basado en la nube**.

#### Forecasting

**Rediseñar el proceso de pronóstico** para **aprovechar lo último en machine learning y predictive analytics** y
para **trabajar transversalmente en la organización** de modo de **entender mejor los drivers de costo y uso**, ya
sea un **lanzamiento de producto**, una **campaña de marketing** o una **expansión regional**.

#### Control

**Establecer los guardrails para evitar sorpresas con las facturas**, lo que incluye una **estrategia de cuentas
establecida**, una **partnership entre finanzas e ingeniería** y una **inversión en personas, procesos y
tecnología** para tener éxito **a medida que escalás**.

### 7.6 Cost management y cost optimization

Hay una **diferencia entre gestionar costos y optimizarlos**. **Cost management** te ayuda a **ver adónde va tu
dinero**, mientras que **cost optimization** se trata de **tomar acción para mejorar la eficiencia**.

**Cost management:** *la capacidad de dar **visibilidad** de los costos para **mantenerlos bajo control**, y de
proveer la **oportunidad** de optimización.*

**Cost optimization:** *la capacidad de **operar sistemas** para **entregar valor de negocio al menor precio
posible**.*

Gestionar costos en la nube **no es solo mirar el resultado final**: es **obtener valor de cada dólar** que gastás.
Tenés que pensar **quién puede aprovisionar recursos**, **qué opciones de pricing tienen sentido** para tus
workloads, **qué servicios encajan mejor** con tus necesidades y **cómo podrían cambiar tus costos al crecer**. Se
trata de **tomar decisiones informadas que balanceen costo con rendimiento**.

### 7.7 Cloud journey

**Resumen**

Estas ilustraciones mostraron **cómo tu enfoque de optimización de costos crece y cambia** a medida que **progresás
en tu viaje a la nube**.

**Pasos del viaje a la nube**

**Cloud financial management** es un **viaje con siete pasos clave** listados abajo.

Empezá por **definir quién es responsable** de gestionar los costos y **hacer que finanzas y tecnología trabajen
juntos**. Después, **establecé una asignación de costos adecuada**, **generá visibilidad clara sobre tu gasto**,
**optimizá donde puedas**, **mejorá en el pronóstico** y **asegurate de que todos entiendan su rol** en la gestión
de esos costos. **Cada paso se apoya en los anteriores**, ayudándote a crear un **enfoque integral** para gestionar
tu **gasto en la nube**.

1. **Ownership**
2. **Partnership**
3. **Cost allocation and enablement**
4. **Cost visibility**
5. **Cost optimization**
6. **Cost forecasting**
7. **Education**

---

## 8. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 8.1 A qué tareas responde

| Concepto de la lección | Tarea |
| --- | --- |
| **Visibilidad, tagging y asignación de costos** | **1.5** Determinar las estrategias de optimización de costos y visibilidad |
| **Optimización sin degradar rendimiento** | **2.6** Estrategia de optimización de costos para cumplir metas · **3.5** Identificar oportunidades |
| **Ownership y partnership (finanzas + ingeniería)** | **1.5** · **3.5** |
| **Rightsizing y compromisos de largo plazo** | **3.5** · **2.6** |
| **Operación continua del modelo** | **3.1** Excelencia operativa |

### 8.2 Diez puntos para llevarse

1. **Gestionar = ver**; **optimizar = actuar**. Una cosa habilita a la otra, no la reemplaza.
2. La nube **elimina el costo de falla** para finanzas porque **terminar un recurso es reversible**.
3. El equipo de tecnología pasa de **builder** a **operator y owner**.
4. Las **4 áreas** a adaptar: **traceability · oversight · forecasting · control**.
5. **Traceability** se resuelve con **chargeback, showback** o **reporte/monitoreo regular**.
6. **Oversight** es **descentralizar con marco**: la conciencia de costos se **mete en el diseño**.
7. **Forecasting** se **rediseña** con **ML y predictive analytics**, cruzando áreas y drivers.
8. **Etapa 1 (investigation and design)** define **tagging, soporte y visibilidad** — impacta **por años**.
9. En **etapa 2** el costo **sube y está bien**; en **etapa 4** se **optimiza de forma continua**.
10. Los **7 pasos**: **ownership → partnership → allocation/enablement → visibility → optimization → forecasting →
    education**.

### 8.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Cost management y cost optimization son sinónimos” | Uno **da visibilidad**; el otro **ejecuta** eficiencia |
| “Optimizar es bajar la factura como sea” | La definición exige **entregar valor de negocio**; degradar rendimiento no es optimizar |
| “En la nube ya no hace falta forecasting” | Se **rediseña** con ML; la variabilidad **aumenta** la necesidad |
| “La nube elimina los controles” | Cambian de forma: **guardrails**, account strategy y partnership |
| “Los costos deben bajar desde el día uno” | En **implementation and testing** **suben**; es esperado |
| “El tagging es tarea exclusiva de finanzas” | Se define en **diseño** y lo usan **todos** los equipos |
| “Las 4 etapas y los 7 pasos son la misma lista” | **Etapas = madurez en el tiempo**; **pasos = capacidades** de financial management |
| “Rightsizing es solo de producción” | Es una actividad de la **etapa operativa**, sostenida y continua |
| “Comprar compromisos lo antes posible ahorra siempre” | Los compromisos son **inteligentes** cuando el uso es **predecible** (etapa operativa) |
| “Con visibilidad ya está resuelto” | Sin **ownership** y **partnership**, la visibilidad **no cambia decisiones** |

> [!note] Ampliación (no está en la fuente)
> Para el examen, la dupla que más se pide es **tagging + AWS Cost Explorer / AWS Budgets** para **visibilidad y
> alertas**, y **Compute Optimizer / Trusted Advisor** para **rightsizing**. La lección **no nombra esas
> herramientas**: solo anuncia que vienen en la próxima parte. Quedan como referencia de estudio, no como contenido
> de esta nota.

---

## 9. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + transcript (7:00) + lectura (traditional/cloud consumption, 4 áreas, cost management vs optimization, cloud journey) | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Cuatro etapas vs. siete pasos.** Las **4 etapas** (investigation and design · implementation and testing ·
   production and growth · operational) aparecen **solo en el transcript**. La lectura “Cloud journey” lista **solo
   los 7 pasos**. Se transcriben ambos y se distinguen explícitamente en §5 y §6.
2. **Las ilustraciones no llegaron.** La lectura dice *“These illustrations showed how…”* y referencia cuatro
   imágenes (`JJHAE5ARRR.png`, `6CVBDJQCZE.png`, `YCBEBT1XXH.png`, `QK21HB3U2V.png`) que **no están en el vault**.
   No se describe su contenido para no inventarlo.
3. **Cierre en transición.** El video termina con *“let's look at the specific tools AWS provides”*: la lección
   **no enseña herramientas**. La próxima lección del módulo debería ser la de **herramientas de costos**.

**Decisiones de transcripción:**

- Se conservaron los **términos en inglés** (`traceability`, `oversight`, `forecasting`, `control`, `ownership`,
  `showback`, `chargeback`, `rightsizing`) y se explicaron en español.
- **“Cloud cost management - where you only pay for what you need, when you need it”** se transcribió literal como
  subtítulo de la introducción.
- La frase **“long pole dependencies”** se mantiene en inglés con la traducción entre paréntesis, porque es la
  fórmula exacta de la fuente.
- El ejemplo del **cliente retail** y el del **e-commerce** se transcribieron **sin agregar métricas**: la fuente
  **no da porcentajes ni cifras**.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Governance at Scale]] — budget, alertas al 20/30/50/80 % y enforcement de costos
- [[Course Overview]] — los objetivos de costos del curso
- [[Cloud Governance Pillars]] — visibilidad de inventario y compliance
- [[Detective Controls]] — monitoreo y alertas que alimentan la visibilidad
- [[Establishing Guardrails]] — el “control” del §3 llevado a SCP y Config
- [[Knowledge Check]] — pregunta 3: rendimiento **y** costos a la vez
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
