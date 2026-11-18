---
title: "Cost Management Tools"
aliases:
  - "Cost management tools"
  - "Herramientas de gestión de costos"
  - "AWS cost management services"
  - "Cost Explorer, Budgets y tagging"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - costos
  - finops
  - tagging
status: consolidado
fuente: "AWS Solutions Architect Advanced — Implementing Observability and Management Controls (AWS Skill Builder) — Cost Management Tools"
---

# Cost Management Tools

> [!abstract] Qué es este archivo
> Lección de **6:37** que responde la pregunta que quedó abierta en [[Cloud Cost Management]]: **¿con qué
> herramientas se implementa todo eso?**
>
> Organiza el arsenal en **tres categorías** —**reporting and alerting**, **controls** y **governance**— y después
> desarrolla en detalle las piezas que más se evalúan: **Cost Explorer**, **Cost and Usage Report**, **Budgets**
> (con **budget actions**), **tagging** y **tag policies**.
>
> Cierra con un **self-check** de una sola pregunta.

> [!quote] La idea que hay que retener
> **Sin tags no hay datos; sin datos no hay control; sin acciones no hay ahorro.**
> Las herramientas no valen por separado: **Cost Explorer** muestra, **CUR** permite analizar, **Budgets** vigila
> y **actúa**, **Organizations** impone el estándar y **Trusted Advisor / Well-Architected** recomiendan.

---

## Resumen en una frase

> AWS agrupa sus herramientas de costos en **reporting and alerting** (**Cost Explorer**, **CUR**, **Budgets**,
> **CloudWatch**), **controls** (**Organizations**, **IAM**, **Service Catalog**) y **governance** (**Config**,
> **Control Tower**, **Well-Architected Tool**, **Trusted Advisor**, **License Manager**, **CodeGuru Profiler**),
> y el pegamento que hace que todas funcionen es una **estrategia de tagging consistente** activada para
> **cost allocation**.

---

## 1. Las tres categorías

| # | Categoría | Pregunta que responde | Servicios que lista la lectura |
| --- | --- | --- | --- |
| **1** | **Reporting and alerting** | **¿Adónde se va el dinero y cómo me entero a tiempo?** | **AWS Cost Explorer** · **AWS Cost and Usage Report** · **AWS Budgets** · **Amazon CloudWatch** |
| **2** | **Controls** | **¿Quién puede gastar qué?** | **AWS Organizations** · **AWS Identity and Access Management (IAM)** · **AWS Service Catalog** |
| **3** | **Governance** | **¿Estamos siguiendo las mejores prácticas?** | **AWS Config** · **AWS Control Tower** · **AWS Well-Architected Tool** · **AWS Trusted Advisor** · **AWS License Manager** · **Amazon CodeGuru (Profiler)** |

> [!important] Tres capas, no tres alternativas
> **Reporting** da **visibilidad**; **controls** definen **límites de quién y cuánto**; **governance** verifica
> **que el conjunto siga las reglas y las mejores prácticas**. En el examen, si el requisito es **“entender”**,
> la respuesta es reporting; si es **“evitar”**, controls; si es **“verificar/mejorar”**, governance.

### 1.1 Diferencia entre el video y la lectura

El video nombra en la categoría 3 solo **dos** herramientas (*“the Well-Architected Tool and Trusted Advisor”*).
La lectura lista **seis** (agrega **Config**, **Control Tower**, **License Manager** y **CodeGuru Profiler**).
No es contradicción: el video da **ejemplos**, la lectura da **la lista completa**. Se transcriben ambas.

---

## 2. AWS Cost Explorer

**Qué es:** una **interfaz** para **visualizar, entender y gestionar** costos y uso de AWS **a lo largo del
tiempo**.

| Aspecto | Detalle |
| --- | --- |
| **Acceso** | Consola de **Cost Management** |
| **Primera carga de datos** | Puede tardar **hasta 24 horas** para usuarios nuevos |
| **Reportes** | **Personalizados**, con **gráficos y datos tabulares** |
| **Nivel de detalle** | Desde **alto nivel** (costo y uso total de todas las cuentas) hasta **consultas muy específicas** |
| **Para qué sirve** | Ver **qué proyectos impulsan el costo** y **cómo cambia el gasto en el tiempo** |

### 2.1 Purchase recommendations

Cost Explorer **no solo muestra lo gastado**: mira **cómo se está usando AWS** y sugiere **cómo ahorrar**.

| Recomendación | Qué evalúa |
| --- | --- |
| **Reserved Instances** | Si conviene un compromiso de RI para el patrón de uso |
| **Savings Plans** | Si un Savings Plan encaja mejor que las RI |
| **Instancias apenas usadas** | Derecho de **rightsizing** |
| **Storage en un tier más barato** | Mover datos a un nivel de almacenamiento de menor costo |

> **La frase del video:** *“Es como tener un **asesor de economía de nube** al alcance de la mano.”*

> [!tip] Por qué esto es distinto de “mirar la factura”
> La recomendación usa **el uso real**, no el gasto agregado. Y el video marca el contraste con el mundo
> on-premises: *“esto no era algo a lo que tuvieras acceso instantáneo con tus recursos dedicados”*.

### 2.2 El caso de la empresa de tecnología

Una **empresa de tecnología** usa Cost Explorer para **seguir el gasto de sus equipos de desarrollo** y así
**identificar dónde ahorrar sin frenar la innovación**.

> [!important] El detalle que vale para el examen
> El objetivo no fue **recortar el gasto de desarrollo**: fue **encontrar el gasto que no aportaba**. La
> visibilidad **protege** la inversión que sí rinde.

---

## 3. AWS Cost and Usage Report (CUR)

Cuando hay que **profundizar** en los datos de gasto, la herramienta es el **Cost and Usage Report**.

| Característica | Detalle literal |
| --- | --- |
| **Nivel de detalle** | **Información detallada** de costos y uso |
| **Frecuencia de actualización** | **A lo largo del día** |
| **Flexibilidad** | Permite **analizar los patrones de gasto como se necesite** |
| **Dónde se guarda** | En **Amazon S3** |
| **Qué habilita** | **Correr el propio análisis** para entender exactamente adónde va el dinero |

> [!note] Ampliación (no está en la fuente)
> En la práctica, el CUR se consulta con **Amazon Athena** sobre S3 y se visualiza con **QuickSight**, y también
> alimenta hojas de cálculo. La lección **menciona S3 y el análisis propio**, pero **no nombra Athena**: esa
> integración es la implementación habitual, no contenido de esta lección.

### 3.1 El detalle “suelto” de QuickSight y Glue

La lectura cierra la sección de **budget actions** con una aclaración que pertenece a este contexto de análisis:

> **Amazon QuickSight** puede hacer **algunas transformaciones**, pero **no es una herramienta ETL completa**
> (*extract, load, and transform*). Para eso AWS ofrece **AWS Glue**, un servicio **ETL totalmente administrado**
> que ayuda a **preparar y cargar los datos para analítica**.

> [!warning] No confundir
> **QuickSight** = **visualización** (con transformaciones limitadas). **Glue** = **ETL administrado**. Si el
> enunciado pide **preparar** datos para analítica, la respuesta es **Glue**; si pide **visualizar**, QuickSight.

---

## 4. AWS Budgets

**Qué es:** un **sistema de alerta temprana financiera** para el gasto en la nube. Permite **planificar** uso,
costos y reservas de instancias, y **revisar** el desvío contra el plan.

### 4.1 Qué información muestra

| Revisa | Detalle |
| --- | --- |
| **Cercanía al monto presupuestado** | O a los **límites del free tier** |
| **Uso a la fecha** | Incluye **cuánto de las RI se usó** |
| **Cargos estimados actuales** | Y **cuánto se va a facturar a fin de mes** según el uso previsto |
| **Porcentaje del budget usado** | Cuánto del presupuesto ya se consumió |

**Actualización:** la información se actualiza **hasta tres veces por día**. Las actualizaciones ocurren
**típicamente entre 8 y 12 horas después** de la anterior.

**Qué rastrea:** **unblended costs**, **suscripciones**, **reembolsos** y **RI**.

> [!important] “Hasta tres veces al día” ≠ tiempo real
> Si el enunciado exige **reacción inmediata**, **Budgets** no es la herramienta: su ciclo es de **horas**. Para
> tiempo real de **uso** está **CloudWatch**; para **costo**, ninguna herramienta de costos es instantánea.

### 4.2 Los seis tipos de budget

| Tipo | Qué planifica / vigila | Alerta cuando… |
| --- | --- | --- |
| **Cost budgets** | **Cuánto gastar** en un servicio | El **costo** supera el umbral |
| **Usage budgets** | **Cuánto usar** uno o más servicios | El **uso** supera el umbral |
| **RI utilization budgets** | **Utilización** de las RI | La utilización **cae por debajo** del umbral → RI **sin usar o subutilizadas** |
| **RI coverage budgets** | **Cobertura** de RI | Las **horas cubiertas por RI** caen por debajo del umbral → cuánto del uso está cubierto |
| **Savings Plans utilization budgets** | **Utilización** de Savings Plans | La utilización **cae por debajo** del umbral → SP **sin usar o subutilizados** |
| **Savings Plans coverage budgets** | **Cobertura** de Savings Plans | El **uso elegible cubierto** cae por debajo del umbral |

> [!tip] La diferencia que se pregunta
> **Utilization** = *“¿estoy usando lo que compré?”* · **Coverage** = *“¿cuánto de mi uso está cubierto por lo
> que compré?”*. Baja **utilization** = **desperdicio**; baja **coverage** = **oportunidad de ahorro**.

### 4.3 Pricing (literal)

| Regla | Dato |
| --- | --- |
| **Máximo de budgets** | **20.000** por cuenta **o** por **management account** de AWS Organizations |
| **Franquicia mensual** | Los primeros **62 budget days** son **gratis** cada mes |
| **Equivalencia** | **62 budget days** = **los primeros dos budgets por mes** sin costo |
| **Costo adicional** | **$0,02** por **budget day** adicional |
| **Consolidated billing** | Los **62 budget days** se pueden **distribuir entre varias cuentas** |
| **Ejemplo de la fuente** | **62 cuentas con 1 budget cada una**: sin costo extra por el **primer día del mes** de cada budget |

> [!warning] Cuidado con la aritmética
> **62 budget days** no son “62 presupuestos gratis”: es **un día de un budget**. Con **dos budgets** durante
> **31 días** se consumen exactamente los **62**. El ejemplo de **62 cuentas × 1 budget** cubre solo **el primer
> día del mes** de cada uno.

---

## 5. Budget actions

**Qué agregan:** en lugar de **solo avisar**, permiten **responder automáticamente** cuando el gasto se dispara.

### 5.1 Cómo funcionan

| Elemento | Detalle |
| --- | --- |
| **Disparador** | Un budget **excede su umbral**, medido en montos **actuales o pronosticados** |
| **Tipos de acción (3)** | **IAM policy** · **Service Control Policy (SCP)** · **target running instances (EC2 o RDS)** |
| **Cantidad configurable** | Hasta **5 umbrales** por budget, con hasta **10 acciones** por umbral |
| **Ejecución** | **Automática** o con **workflow de aprobación** previo |
| **Default** | **Workflow approval** es la experiencia por defecto |
| **Notificación** | Siempre se recibe aviso de que una acción **está pendiente o ya se ejecutó**, con **link al Budget details page** |
| **API** | Toda la funcionalidad está disponible por **AWS Budgets API** |

### 5.2 Ejemplo de la fuente

- Se aplica una **IAM policy custom “Deny EC2 Run instances”** a un **usuario, grupo o rol** cuando el budget
  mensual de **Amazon EC2** se excede.
- Con **el mismo umbral**, se configura una **segunda acción** que apunta a **instancias EC2 específicas dentro de
  una Región**.

Ese ejemplo muestra que **umbral** y **acción** están desacoplados: un mismo punto de control puede disparar
**varias respuestas distintas**.

### 5.3 La regla de reseteo (muy preguntable)

| Tipo de acción | ¿Se resetea? |
| --- | --- |
| **IAM policy** | **Sí**, al inicio de cada **período presupuestado** (por ejemplo, mensual) |
| **SCP** | **Sí**, al inicio de cada período presupuestado |
| **Instancias EC2 / RDS en ejecución** | **No** se resetean |

> [!important] Por qué la distinción importa
> Las acciones de **política** son **temporales por diseño**: se levantan al empezar el período siguiente para no
> bloquear al equipo para siempre. Las acciones sobre **instancias** (por ejemplo, **detener**) **no se revierten
> solas**: alguien tiene que **volver a encenderlas**. Es la diferencia entre un **freno que se suelta** y un
> **apagón que hay que reparar**.

> [!note] Ampliación (no está en la fuente)
> El transcript menciona como ejemplo **aplicar políticas IAM más estrictas al 80 % del budget** y **pausar
> recursos no críticos**. El **80 %** coincide con los umbrales de alerta de [[Governance at Scale]]
> (**20 / 30 / 50 / 80 %**), pero acá se usa como **disparador de acción**, no solo de notificación.

---

## 6. Controls: quién puede gastar qué

La lectura agrupa tres servicios que ya aparecieron en el módulo:

| Servicio | Rol en el control de costos |
| --- | --- |
| **AWS Organizations** | **Gobierno y administración central** de múltiples cuentas |
| **AWS IAM** | **Control de acceso fino** a servicios y recursos |
| **AWS Service Catalog** | **Catálogos de servicios de TI aprobados**, con **compliance y control de costos** |

**El objetivo declarado:** implementar **políticas fuertes de governance y acceso** para **prevenir gasto no
autorizado y aprovisionamiento no autorizado**.

> [!important] El vínculo con las lecciones anteriores
> Esto es exactamente lo de [[Establishing Guardrails]] (**preventive**) y [[Management Controls]]
> (**Service Catalog**): el control de costos **empieza antes** de que el recurso exista. **Budgets** actúa
> **después**; **Organizations / IAM / Service Catalog**, **antes**.

---

## 7. Governance: seguir las mejores prácticas

| Herramienta | Qué aporta según la lectura |
| --- | --- |
| **AWS Config** | **Monitoreo continuo** y compliance de configuración |
| **AWS Control Tower** | **Governance automatizado a escala** en el entorno multi-cuenta |
| **AWS Well-Architected Tool** | **Guía arquitectónica** contra el marco de mejores prácticas |
| **AWS Trusted Advisor** | **Recomendaciones de optimización** |
| **AWS License Manager** | Administración de **licencias** |
| **Amazon CodeGuru (Profiler)** | **Perfilado** de aplicaciones para encontrar ineficiencias |

**El resultado buscado:** mantener una infraestructura **bien arquitectada, compliant y costo-eficiente**, e
**identificar áreas de mejora y ahorro**.

> [!note] Ampliación (no está en la fuente)
> **Trusted Advisor** expone checks de **cost optimization** (por ejemplo, instancias idle, IPs elásticas sin
> asociar, volúmenes sin usar). **Well-Architected Tool** evalúa el **pilar de costo** del framework. La lección
> los nombra sin detallar checks ni pilares: el detalle es referencia de estudio.

---

## 8. Tagging

**Definición literal:** un **tag** es una **etiqueta** que **vos o AWS** asignan a un recurso. Cada tag tiene una
**key** y un **value**.

| Regla | Detalle |
| --- | --- |
| **Unicidad de la key** | Para cada recurso, **cada tag key debe ser única** |
| **Un solo valor** | Cada key puede tener **solo un value** |
| **Para qué sirven** | **Organizar** recursos |
| **Cost allocation tags** | Permiten **rastrear costos a nivel detallado** |
| **Después de activarlas** | AWS usa los tags para **organizar los costos en el cost-allocation report** |

### 8.1 Los dos tipos de cost allocation tags

| Tipo | Quién la define | Detalle |
| --- | --- | --- |
| **AWS generated tags** | **AWS** | AWS **define, crea y aplica** el tag |
| **User-defined tags** | **Vos** | Vos **definís, creás y aplicás** el tag |

> [!warning] Se activan **por separado**
> La lectura es explícita: *“You must activate **both types** of tags **separately** before they can appear in
> Cost Explorer or on a cost allocation report.”*
> Tener el tag **no** alcanza; **activarlo** es un paso aparte.

### 8.2 Activación y reporte

| Paso | Detalle |
| --- | --- |
| **Dónde** | **Billing console** |
| **Cómo** | **Refresh** para ver todos los tags disponibles y **elegir** los que se usarán para cost tracking |
| **Demora** | Puede tardar **un día o más** en aparecer en los reportes |
| **Formato del reporte** | **CSV** con uso y costos **agrupados por los tags activos** |
| **Alcance** | **Todos los costos de AWS** de cada **período de facturación** |
| **Categorías de negocio** | **Cost centers**, **nombres de aplicación**, **owners** |

### 8.3 Qué tag necesita cada stakeholder

| Stakeholder | Ejemplo de tag key | Ejemplo de tag value |
| --- | --- | --- |
| **Finance** | `cost-center` · `budget-code` | `engineering` · `eg-001` |
| **Engineering** | `workload` · `codebase` | `website` · `python` |
| **Line-of-business owners** | `project` · `user` | `super-secret-project` · `alice` |
| **IT** | `backup-regime` · `environment` | `24/7` · `production` |
| **Security** | `patch-strategy` · `automation-support` | `immutable` · `true` |

> [!important] Por qué hay varios stakeholders en la tabla
> **No existe un tagging “de finanzas”**: el mismo recurso necesita responder **preguntas distintas** (costo,
> operación, seguridad, ownership). La estrategia tiene que **servir a todos** sin multiplicar tags inútiles.

### 8.4 Best practices (literales)

1. Asegurar que los developers apliquen **tags consistentes**.
2. **Auditar** los recursos tagueados y mantener la **categorización** correcta.
3. Usar **todo en minúsculas**, con **guiones** entre palabras.
4. **Cuidado al imponer compliance** (*“use caution in enforcing compliance”*).
5. Asegurar los **atributos correctos** para habilitar **attribute-based access control (ABAC)**.

> [!tip] La regla de estilo
> `cost-center`, no `Cost Center` ni `CostCenter`. Minúsculas + guiones. Suena cosmético, pero **un tag con otra
> capitalización es otro tag** para los reportes.

### 8.5 El caso de la empresa de medios

Una **empresa de medios** redujo su **factura mensual un 15 %** **solo identificando recursos sin tag que nadie
estaba usando**.

> [!important] Lo que enseña el 15 %
> El ahorro **no vino de una herramienta nueva**: vino de **hacer visible** lo que estaba fuera de todo reporte.
> **Lo que no está tagueado no aparece en el cost allocation report** — y por lo tanto **no se gestiona**.

### 8.6 La estrategia de tagging en 4 pasos (transcript)

| # | Paso | Herramienta |
| --- | --- | --- |
| **1** | **Definir los tags estándar** | **AWS Organizations** |
| **2** | **Revisar qué está bien tagueado y qué no** | **Resource Groups** |
| **3** | **Prevenir recursos no compliant** | **Tag policies** (y controles de creación) |
| **4** | **Hacer el tagging obligatorio** | **IAM policies** |

> **La frase que resume la filosofía:** *“Se trata de **hacer fácil lo correcto y difícil lo incorrecto**.”*

---

## 9. AWS Organizations tag policies

**Qué son:** políticas de tags **integradas con AWS Organizations**, el servicio de **gobierno central** entre
cuentas.

| Aspecto | Detalle |
| --- | --- |
| **Alcance** | **Toda la organización**, **OUs específicas** o **cuentas individuales** |
| **Reporte** | **Cross-account y cross-Region** para identificar tags que **no se alinean** con la política |
| **Uso del reporte** | **Agregar, ver y compartir** con los **owners** para corregir tags no compliant |
| **Enforcement (opcional)** | **Prevenir cambios de tag no compliant**, por ejemplo **actualizar un tag con un valor no permitido** |
| **Qué se define** | **Tag keys**, **capitalización** y **valores permitidos** |

### 9.1 Ejemplo literal de la lectura

| Tag key | Valores permitidos |
| --- | --- |
| `CostCenter` | **“123”** |
| `SecurityGroup` | **“red-team”** o **“blue-team”** |

Con tags estandarizados se puede usar el tagging con confianza para **cost allocation** y **ABAC**, porque se
**garantiza que los recursos tengan los atributos correctos**.

### 9.2 Discrepancia importante: qué bloquea realmente una tag policy

| Fuente | Dice |
| --- | --- |
| **Transcript** | Se puede *“**prevenir que los recursos se creen** si no tienen los tags requeridos”* |
| **Lectura** | El enforcement **opcional** previene **cambios de tag no compliant** (por ejemplo, un valor no permitido) |

**Cómo lo traté:** se transcriben **ambas**. La formulación de la **lectura** es la precisa: una **tag policy**
**no impide crear un recurso sin tags** de forma general; lo que hace es **estandarizar keys/valores** y, con
enforcement, **bloquear cambios que violen la política**. Para **exigir tags en la creación** se usan
**IAM policies** (con condiciones sobre tags) o **SCPs**.

> [!warning] Trampa de examen
> Si la opción dice *“tag policy impide crear recursos sin el tag requerido”*, es **imprecisa**. La respuesta
> correcta para **bloquear la creación** es **IAM policy / SCP**; la tag policy **define el estándar y protege los
> valores**.

### 9.3 Cómo se usa en la práctica

```
Organizations
   └── Tag policy (keys + valores permitidos + capitalización)
          │
          ├── aplica a: organización / OU / cuenta
          ├── reporte cross-account + cross-Region  →  corregir
          └── enforcement opcional  →  bloquear cambios inválidos
```

> [!note] Ampliación (no está en la fuente)
> Las **tag policies** de Organizations **no reemplazan** al **tagging de cost allocation**: la política
> **estandariza**; la **activación** en Billing hace que el tag **aparezca en los reportes**. Son pasos
> distintos y complementarios.

---

## 10. Cómo encaja todo (flujo completo)

```
1. DEFINIR       Organizations tag policies → keys, valores, capitalización
2. APLICAR       developers taguean · IAM/SCP exigen tags en la creación
3. ACTIVAR       Billing console → cost allocation tags (AWS generated + user-defined)
4. VER           Cost Explorer (visual) · CUR en S3 (detalle) · cost allocation report (CSV)
5. VIGILAR       Budgets (cost / usage / RI / SP) + alertas
6. ACTUAR        Budget actions → IAM policy / SCP / detener EC2-RDS
7. VERIFICAR     Config · Control Tower · Trusted Advisor · Well-Architected · License Manager · CodeGuru
```

| Si el problema es… | La herramienta es… |
| --- | --- |
| “No sé **quién** gasta” | **Tagging** + **Cost Explorer** |
| “Necesito **el detalle** para analizar” | **CUR** en **S3** |
| “Quiero **que me avisen**” | **AWS Budgets** |
| “Quiero **que se frene solo**” | **Budget actions** |
| “Quiero **evitar** que se cree” | **Organizations / IAM / SCP / Service Catalog** |
| “Quiero **saber si sigo las best practices**” | **Trusted Advisor / Well-Architected Tool** |

---

## 11. Self-check de la lección

> **Pregunta:** ¿qué herramienta permite **aplicar políticas dinámicamente** para **impactar el gasto**?
> **(elegir 1)**

| Opción | Veredicto | Por qué |
| --- | --- | --- |
| **A. AWS Cost and Usage Report** | ❌ | **Reporta** detalle; no aplica políticas |
| **B. Tags** | ❌ | **Organizan y asignan** costos; no ejecutan políticas |
| **C. AWS Cost Explorer** | ❌ | **Visualiza y recomienda**; no aplica políticas |
| **D. AWS Budgets** | ✅ | Sus **budget actions** aplican **IAM policies / SCPs** o actúan sobre **EC2/RDS** al superar un umbral |

> **Respuesta: D. AWS Budgets.**

> [!note] Sobre la fuente
> El self-check **no trae rationale oficial** ni confirmación de “Correct!”: solo el enunciado y las opciones.
> La justificación de arriba es **propia**, basada en la sección **budget actions** de esta misma lección.

---

## 12. Traducción del contenido

### 12.1 Introducción

AWS ofrece **soluciones de gestión de costos** diseñadas para dar **visibilidad, control y capacidades de
optimización sin precedentes**. Desde **analítica detallada** hasta **alertas automáticas de presupuesto**, estas
herramientas permiten **tomar decisiones basadas en datos**, **eliminar desperdicio** y **maximizar el retorno de
la inversión** en la nube.

### 12.2 Transcript (duración: 6 minutos, 37 segundos)

Ahora abordemos la **siguiente pregunta de tu gerente de operaciones**. Parte de nuestro **charter** es **reducir y
optimizar costos**. **¿Qué herramientas ofrece AWS** para enfrentar estos desafíos? Quiere saber **qué hay
disponible** para ayudarlos a **controlar el gasto manteniendo el rendimiento**.

AWS ofrece **toda una suite de herramientas que trabajan juntas** para darte **visibilidad de tus costos**,
**control sobre tu gasto** y **recomendaciones inteligentes de optimización**. Pensá en estas herramientas en
**tres categorías principales**.

Primero, tenés las **herramientas de reporting y alerting**, cosas como **Cost Explorer** y **AWS Budgets** que te
ayudan a **entender adónde va tu dinero**. Después están las **herramientas de control** como **Organizations** y
**Service Catalog** que te ayudan a **gestionar quién puede gastar qué**. Finalmente, tenés las **herramientas de
governance** como **Well-Architected Tool** y **Trusted Advisor** que ayudan a **asegurar que estás siguiendo las
mejores prácticas de optimización de costos**.

**Cost Explorer** te ayuda a **entender tus patrones de gasto** de formas que tienen sentido. ¿Querés saber **qué
proyectos están impulsando tus costos** o necesitás ver **cómo cambia tu gasto en el tiempo**? Cost Explorer puede
mostrarte **todo eso**. Una **empresa de tecnología** con la que trabajé lo usa para **seguir el gasto de sus
equipos de desarrollo**, ayudándoles a **identificar dónde pueden ahorrar sin frenar la innovación**.

Cost Explorer **no solo muestra lo que gastaste**: te ayuda a **tomar decisiones inteligentes sobre el gasto
futuro**. Mira **cómo estás usando realmente AWS** y **sugiere formas en que podrías ahorrar**. Quizá podrías
beneficiarte de **Reserved Instances**, o quizá un **Savings Plan** funcione mejor para tus necesidades. Es como
tener un **asesor de economía de nube** al alcance de la mano.

Pero acá es donde Cost Explorer **realmente te ayuda a ahorrar**: mira **cómo estás usando tus recursos** y
**detecta oportunidades de optimización**. Quizá tenés **instancias que apenas se usan** o **storage que podría
moverse a un tier más barato**. Estas recomendaciones ayudan a **recortar costos manteniendo las aplicaciones
funcionando sin problemas**. Esto **no era algo a lo que tuvieras acceso instantáneo** con tus recursos dedicados
anteriormente.

Cuando tu gerente de operaciones quiere **profundizar en sus datos de gasto**, el **AWS Cost and Usage Report** es
el camino. Provee **información detallada** sobre tus costos y uso, **se actualiza a lo largo del día** y te
permite **analizar tus patrones de gasto como necesites**. Podés **guardar estos datos en S3** y **correr tu
propio análisis** para entender exactamente **adónde va tu dinero**.

Ahora pasemos a **AWS Budgets**. Es como tener un **sistema de alerta temprana financiera** para tu gasto en la
nube. Podés configurar **alertas de costos, de uso e incluso de utilización de reservas**. Lo realmente útil es que
podés **seguir el gasto real** y **recibir notificaciones antes de exceder tu presupuesto**. El gerente de
operaciones puede establecer **umbrales distintos para distintos equipos o proyectos**, asegurando que **todos se
mantengan en curso**.

Ahora, **Budgets se vuelve aún más poderoso cuando agregás acciones automatizadas**. En lugar de **solo recibir una
alerta** cuando el gasto se pone alto, podés configurar **respuestas automáticas**. Quizá querés **aplicar políticas
IAM más estrictas cuando el gasto llega al 80 % del budget**, o **pausar ciertos recursos no críticos**. Podés
elegir si estas acciones ocurren **automáticamente** o **requieren aprobación primero**.

El **tagging** es crucial para **entender quién está gastando qué** en tu entorno de nube. **Distintos equipos
necesitan información distinta**. **Finanzas** quizá quiera seguir **cost centers y budget codes**, mientras que
**ingeniería** necesita saber **qué workload o codebase están soportando**. **Hacer bien tu estrategia de tagging**
ayuda a que **todos vean la información que necesitan** para tomar buenas decisiones.

Cuando se trata de tagging, **la consistencia es clave**. Querés que tus developers **apliquen los mismos tipos de
tags de la misma forma** en todos tus recursos. **Mantené los nombres de tags simples y significativos**. Usar
**minúsculas con guiones entre palabras** funciona bien. Y recordá **revisar regularmente que los recursos estén
tagueados correctamente**.

Una **empresa de medios** con la que trabajé **redujo su factura mensual un 15 %** solo **identificando recursos
sin tag que nadie estaba usando**. Para que los tags **aparezcan en tus reportes de costos**, necesitás
**activarlos para cost allocation**. Es un **proceso directo en la consola de billing**: **refrescás para ver todos
los tags disponibles**, después **elegís cuáles querés usar** para cost tracking. Solo recordá que puede tardar
**un día o así** para que los tags recién activados **empiecen a aparecer en tus reportes**.

Las **tag policies de AWS Organizations** ayudan a **mantener un tagging consistente en toda tu organización**.
Podés **definir tags estándar que todos deberían usar** e incluso **prevenir que los recursos se creen si no tienen
los tags requeridos**. Esto ayuda a tu gerente de operaciones a **obtener datos de costos limpios y usables en
todas sus cuentas**.

Ahora, **no me malinterpretes**: lograr que **todos sigan tus estándares de tagging** es **más fácil decirlo que
hacerlo**, pero lo que **realmente ayuda** es una **estrategia clara**. Empezá por **definir tus tags estándar en
AWS Organizations**. Después usá **resource groups** para **revisar qué está bien tagueado y qué no**. Podés
**prevenir recursos no compliant** y usar **políticas IAM para hacer el tagging obligatorio**. Se trata de
**hacer fácil lo correcto y difícil lo incorrecto**. Las **tag policies** te dan ese **nivel extra de control**
que tu gerente de operaciones busca: podés **asegurar que los equipos usen tags consistentes en todas las
cuentas** y **mantener una categorización adecuada de los recursos**. Por ejemplo, podrías **requerir que cada
recurso tenga un tag llamado `Cost Center`**, u otro llamado `Environment`, que **solo usen valores aprobados como
`prod` o `dev`**.

### 12.3 AWS cost management services

AWS ofrece **toda una suite de herramientas que trabajan juntas** para darte **visibilidad de tus costos**,
**control sobre tu gasto** y **recomendaciones inteligentes de optimización**.

Para aprender más sobre las herramientas relacionadas con la gestión de costos, **elegí cada marcador numerado**.

#### 1: Reporting and alerting

**AWS Cost Explorer**, **AWS Cost and Usage Report**, **AWS Budgets** y **Amazon CloudWatch** forman la **columna
vertebral** de las capacidades de **reporting y alerting** de AWS. Estos servicios proveen **insights detallados**
sobre el gasto, los patrones de uso y los pronósticos. Permiten **configurar budgets personalizados**, **recibir
alertas cuando los costos exceden umbrales** y **generar reportes integrales** para análisis profundo. Estas
herramientas permiten **mantenerse informado sobre el gasto en tiempo real** y **tomar decisiones basadas en
datos** para optimizar costos.

#### 2: Controls

**AWS Organizations**, **AWS Identity and Access Management (IAM)** y **AWS Service Catalog** ofrecen **mecanismos
de control robustos** para gestionar recursos y acceso. **Organizations** permite **gobernar y administrar
centralmente múltiples cuentas**; **IAM** provee **control de acceso fino** a servicios y recursos; **Service
Catalog** ayuda a **crear y gestionar catálogos de servicios de TI aprobados**, asegurando **compliance y control
de costos**. Juntos permiten implementar **políticas fuertes de governance y acceso** para **prevenir gasto y
aprovisionamiento no autorizados**.

#### 3: Governance

La categoría de **governance** incluye **AWS Config**, **AWS Control Tower**, **AWS Well-Architected Tool**,
**AWS Trusted Advisor**, **AWS License Manager** y **Amazon CodeGuru (Profiler)**. Estos servicios trabajan juntos
para **asegurar que el entorno cumpla** con **mejores prácticas**, **estándares de compliance** y **principios de
optimización de costos**. Proveen **monitoreo continuo**, **governance automatizado a escala**, **guía
arquitectónica** y **recomendaciones de optimización**. Al usarlos, se puede mantener una infraestructura **bien
arquitectada, compliant y costo-eficiente**, e **identificar áreas de mejora y ahorro**.

### 12.4 AWS Cost Explorer

**AWS Cost Explorer** tiene una **interfaz** para **visualizar, entender y gestionar** costos y uso de AWS **a lo
largo del tiempo**. Se empieza rápido **creando reportes personalizados** (incluidos **gráficos y datos
tabulares**) que analizan costo y uso, tanto **a alto nivel** (costo y uso total de todas las cuentas) como para
**pedidos muy específicos**.

Se accede a **Cost Explorer** desde la **consola de Cost Management**. Puede tardar **hasta 24 horas** en cargar
los datos de costo y uso para **usuarios nuevos**.

**Purchase recommendations**

**Cost Explorer** muestra **lo que gastaste** y ayuda a **tomar decisiones inteligentes sobre el gasto futuro**.
Mira **cómo usás realmente AWS** y **sugiere formas de ahorrar**. Quizá podrías beneficiarte de **Reserved
Instances**, o quizá un **Savings Plan** funcione mejor. Es como tener un **asesor de economía de nube** al
alcance.

Acá es donde **Cost Explorer realmente ayuda a ahorrar**: mira **cómo usás tus recursos** y **detecta
oportunidades de optimización**. Quizá tenés **instancias que apenas se usan**, o **storage que podría moverse a
un tier más barato**. Estas recomendaciones ayudan a **recortar costos manteniendo las aplicaciones funcionando sin
problemas**. Esto **no era algo a lo que tuvieras acceso instantáneo con tus recursos dedicados**.

### 12.5 AWS Budgets

Con **AWS Budgets** podés **planificar el uso de servicios, los costos de servicios y las reservas de instancias**.
Budgets provee una forma de **revisar** la siguiente información:

- **Qué tan cerca está tu plan** del monto presupuestado **o de los límites del free tier**.
- **Tu uso a la fecha**, incluido **cuánto de tus RI usaste**.
- **Tus cargos estimados actuales** de AWS y **cuánto generará tu uso previsto** en cargos **a fin de mes**.
- **Cuánto de tu budget se usó**.

La información de **AWS Budgets** se actualiza **hasta tres veces al día**. Las actualizaciones ocurren
**típicamente entre 8 y 12 horas después** de la actualización anterior. Budgets **rastrea tus costos unblended,
suscripciones, reembolsos y RI**.

Podés crear los siguientes **tipos de budget**:

- **Cost budgets** — Planificar **cuánto querés gastar** en un servicio.
- **Usage budgets** — Planificar **cuánto querés usar** uno o más servicios.
- **RI utilization budgets** — Definir un **umbral de utilización** y recibir alertas cuando el **uso de RI cae por
  debajo** de ese umbral. Permite revisar si las RI están **sin usar o subutilizadas**.
- **RI coverage budgets** — Definir un **umbral de cobertura** y recibir alertas cuando el **número de horas RI cae
  por debajo** de ese umbral. Permite revisar **cuánto del uso de instancias está cubierto** por una reserva.
- **Savings Plans utilization budgets** — Definir un **umbral de utilización** y recibir alertas cuando el **uso de
  Savings Plans cae por debajo** de ese umbral. Permite revisar si los SP están **sin usar o subutilizados**.
- **Savings Plans coverage budgets** — Definir un **umbral de cobertura** y recibir alertas cuando el **uso
  elegible para Savings Plans cae por debajo** de ese umbral. Permite revisar **cuánto del uso de instancias está
  cubierto** por Savings Plans.

**Pricing:** podés crear hasta **20.000 budgets** por cuenta **o** por **management account** de AWS Organizations.
Para cuentas regulares, los primeros **62 budget days** son **gratis** cada mes (**62 budget days equivalen a tus
primeros dos budgets por mes** sin costo). Cada **budget day** adicional cuesta **$0,02**. Para cuentas en una
**familia de consolidated billing**, podés **distribuir los 62 budget days entre múltiples cuentas**. Por ejemplo,
para **62 cuentas con 1 budget en cada una**, **no hay costo extra por el primer día del mes** de cada budget.

### 12.6 Budget actions

**Introducción**

**Budgets** se vuelve **aún más poderoso** cuando agregás **acciones automatizadas**. En lugar de **solo recibir
una alerta** cuando el gasto se pone alto, podés configurar **respuestas automáticas**.

**Budget threshold**

Con **budget actions** definís **la acción que querés tomar** en tu cuenta cuando un budget **excede su umbral**
(montos **actuales o pronosticados**). Con este nivel de control podés **reducir el sobregasto no intencional**.
Podés elegir entre **tres tipos de acción**: **IAM policy**, **service control policy (SCP)** o **target running
instances (EC2 o RDS)**.

**Approve/Deny**

Por ejemplo, podés aplicar una **IAM policy custom “Deny EC2 Run instances”** a un **usuario, grupo o rol** de tu
cuenta después de que se exceda el **budget mensual de Amazon EC2**. Con **el mismo umbral**, podés configurar una
**segunda acción** que apunte a **instancias EC2 específicas dentro de una Región**.

**Automatic**

Podés elegir **ejecutar las acciones automáticamente** o **requerir un proceso de aprobación por workflow** antes
de que AWS Budgets inicie una solicitud en tu nombre. Podés configurar **hasta 5 umbrales** con **hasta 10 acciones
por umbral**. Las acciones de tipo **IAM y SCP se resetean al inicio de cada período presupuestado** (por ejemplo,
mensual), mientras que las acciones dirigidas a **instancias EC2 o RDS específicas no se resetean**. Podés acceder
a **toda la funcionalidad de AWS Budgets programáticamente** con la **API de AWS Budgets**. Además, elegís si
estas acciones se ejecutan **automáticamente** o mediante **workflow de aprobación**.

**Workflow approval**

El **workflow de aprobación** está configurado como tu **experiencia por defecto**. Recibís una **notificación**
de que una acción **está pendiente o ya se ejecutó** en tu nombre, **independientemente de tus preferencias de
acción**. La notificación incluye un **link a la página Budget details** en la consola de la acción en cuestión.
También podés llegar a **Budget details** eligiendo el **nombre del budget** en el **Budget dashboard**. En la
página **Budget details** podés **revisar y aprobar** tu budget action. Para configurar una acción, primero seguí
el proceso de **crear un cost budget o editar un budget** y seleccioná **Configure thresholds**.

**Summary**

**Budget actions** proveen **control de costos automatizado** al **disparar respuestas predefinidas** cuando se
exceden los umbrales de gasto. Como viste, estas acciones se implementan con **políticas IAM**, **SCP** o
**apuntando a instancias EC2/RDS específicas**, ayudando a **prevenir sobregiros inesperados**. Esta automatización
representa una herramienta poderosa que permite pasar de un **control de costos reactivo** a uno **proactivo**.

Notá que, aunque **Amazon QuickSight** puede hacer **algunas transformaciones**, **no es una herramienta ETL
completa** (*extract, load, and transform*). AWS ofrece **AWS Glue**, un **servicio ETL totalmente administrado**
que ayuda a **preparar y cargar datos para analítica**.

### 12.7 Tagging

Un **tag** es una **etiqueta** que **vos o AWS** asignan a un recurso de AWS. Cada tag consiste en una **key** y un
**value**. Para cada recurso, **cada tag key debe ser única** y puede tener **solo un value**. Podés usar tags
para **organizar tus recursos** y **cost allocation tags** para **rastrear tus costos de AWS a nivel detallado**.
Después de **activar las cost allocation tags**, AWS usa los tags para **organizar los costos de tus recursos en
tu cost-allocation report**, ayudándote a **categorizar y rastrear tus costos**.

AWS provee **dos tipos de cost allocation tags**. Debés **activar ambos tipos por separado** antes de que puedan
aparecer en **Cost Explorer** o en un **cost allocation report**.

1. **AWS generated tags** — AWS **define, crea y aplica** los tags generados por AWS.
2. **User-defined tags** — Vos **definís, creás y aplicás** los tags definidos por el usuario.

| Stakeholder | Ejemplo de tag key | Ejemplo de tag value |
| --- | --- | --- |
| **Finance** | `cost-center` `budget-code` | `engineering` `eg-001` |
| **Engineering** | `workload` `codebase` | `website` `python` |
| **Line-of-business owners** | `project` `user` | `super-secret-project` `alice` |
| **IT** | `backup-regime` `environment` | `24/7` `production` |
| **Security** | `patch-strategy` `automation-support` | `immutable` `true` |

**Best practices de tagging**

Cuando se trata de tagging, **la consistencia es clave**. Querés que tus developers **apliquen los mismos tipos de
tags de la misma forma** en todos tus recursos. **Mantené los nombres de tags simples y significativos**: usar
**minúsculas con guiones** funciona bien. Y **revisá regularmente** que los recursos estén **tagueados
correctamente**.

- Asegurar que tus developers **apliquen tags consistentes**.
- **Auditar** los recursos tagueados y mantener la **categorización** adecuada.
- Usar **keys y values en minúsculas**, con **guiones** para separar palabras.
- **Cuidado al imponer compliance**.
- Asegurar que los recursos estén tagueados con **los atributos correctos** para permitir **attribute-based
  access control**.

**Cost allocation tagging**

**Cost allocation**

Para que los tags **aparezcan en tus reportes de costos**, necesitás **activarlos para cost allocation**. Es un
**proceso directo en la consola de billing**: **refrescás para ver todos los tags disponibles**, después **elegís
cuáles querés usar** para cost tracking. Puede tardar **un día o así** para que los tags **recién activados
empiecen a aparecer** en tus reportes.

AWS genera un **cost allocation report** como **archivo CSV** con tu **uso y costos agrupados por tus tags
activos**. Podés aplicar tags que representen **categorías de negocio** (como **cost centers**, **nombres de
aplicación** u **owners**) para **organizar tus costos entre múltiples servicios**. El **cost allocation report**
incluye **todos tus costos de AWS** de cada **período de facturación**.

### 12.8 AWS Organizations tag policies

Las **tag policies están integradas con AWS Organizations**, un servicio de **gobierno y administración central**
entre cuentas de AWS. Podés aplicar una **tag policy** a **toda tu organización**, a **OUs específicas** y a
**cuentas individuales**. Después de aplicar una política, podés **exportar un reporte cross-account y
cross-Region** que ayuda a **identificar tags que no se alinean** con tu política. Después podés **agregar, ver y
compartir** estos datos con los **owners de recursos** para **corregir los tags no compliant**. También podés
**especificar enforcement opcional** para **prevenir cambios de tag no compliant**, como **actualizar un tag con un
valor no permitido** por tu política.

Usar **tag policies** implica trabajar con **múltiples servicios de AWS**:

**Tag policies**

Con **tag policies** podés **asegurar que tus developers apliquen tags consistentes**, **auditar recursos
tagueados** y **mantener una categorización adecuada**. Usando tag policies podés **definir tag keys**, incluida
**cómo deben capitalizarse** y **sus valores permitidos**. Por ejemplo, podés definir los tags `CostCenter` y
`SecurityGroup`, donde `CostCenter` debe ser **“123”** y `SecurityGroup` puede ser **“red-team”** o
**“blue-team”**. Con **tags estandarizados** podés usar el tagging con confianza para **casos de uso críticos**,
como **cost allocation** y **attribute-based access control**, porque podés **asegurar que tus recursos estén
tagueados con los atributos correctos**.

### 12.9 Self-check

**Pregunta:** ¿qué herramienta podés usar para **aplicar políticas dinámicamente** e **impactar el gasto**?
**(elegir 1)**

A. AWS Cost and Usage Report
B. Tags
C. AWS Cost Explorer
D. AWS Budgets

---

## 13. Para el examen (SAP-C02)

> Esta sección es **interpretación propia**: cruza la lección con [[Guia AWS]].

### 13.1 A qué tareas responde

| Concepto | Tarea |
| --- | --- |
| **Tagging y cost allocation** | **1.5** Estrategias de optimización de costos y visibilidad |
| **Cost Explorer, CUR y Budgets** | **1.5** · **3.5** Identificar oportunidades de optimización |
| **Budget actions (control automatizado)** | **2.6** Estrategia de optimización · **1.2 / 2.3** controles |
| **Tag policies y Organizations** | **1.4** Entorno multi-cuenta · **1.2** controles |
| **Trusted Advisor / Well-Architected** | **3.5** · **3.1** Excelencia operativa |

### 13.2 Diez puntos para llevarse

1. **Tres categorías**: **reporting/alerting · controls · governance**.
2. **Cost Explorer** = visualizar, entender y **recomendar** (RI, Savings Plans, rightsizing, tiers).
3. Datos de **Cost Explorer** para usuario nuevo: **hasta 24 h**.
4. **CUR** = detalle, **actualización durante el día**, en **S3**, análisis propio.
5. **Budgets** se actualiza **hasta 3 veces/día**, con **8–12 h** entre actualizaciones.
6. **Seis tipos** de budget: **cost · usage · RI utilization · RI coverage · SP utilization · SP coverage**.
7. **Budget actions**: **IAM policy · SCP · EC2/RDS**; **5 umbrales × 10 acciones**; **approval** por defecto.
8. **IAM/SCP se resetean** cada período; **EC2/RDS no**.
9. **Dos tipos** de cost allocation tags, **activadas por separado**; demora **~1 día**.
10. **Tag policies**: keys, capitalización y valores permitidos; reporte **cross-account/cross-Region**;
    enforcement **opcional**.

### 13.3 Trampas típicas

| Trampa | Por qué es falsa |
| --- | --- |
| “Los tags aparecen solos en los reportes” | Hay que **activarlos** para cost allocation, y tardan **hasta un día** |
| “AWS generated y user-defined se activan juntas” | Se activan **por separado** |
| “**Budget** solo notifica” | Con **budget actions** aplica **IAM/SCP** o **detiene EC2/RDS** |
| “Todas las budget actions se resetean cada mes” | Solo **IAM y SCP**; las de **instancias** no |
| “Las acciones siempre corren solas” | **Workflow approval** es el **default** |
| “Cost Explorer es tiempo real” | Primera carga: **hasta 24 h**; es analítico, no monitoreo |
| “CUR es un dashboard” | Es **detalle exportable**; se analiza **aparte** (S3) |
| “**Tag policy** impide crear recursos sin tags” | Es **impreciso**: define el estándar y bloquea **cambios inválidos**; para exigir tags al crear se usa **IAM/SCP** |
| “**Utilization** y **coverage** son lo mismo” | **Utilization** = uso de lo comprado; **coverage** = cuánto del uso está cubierto |
| “**62 budget days** = 62 budgets gratis” | Son **días-budget**: equivalen a **2 budgets** durante **31 días** |
| “**QuickSight** sirve como ETL” | No es ETL completo: para eso está **AWS Glue** |

> [!note] Ampliación (no está en la fuente)
> Para el examen conviene fijar el **mapeo por verbo**:
> **visualizar** → Cost Explorer · **analizar en detalle** → CUR · **alertar** → Budgets ·
> **actuar** → Budget actions · **asignar** → tagging · **imponer** → Organizations/IAM/SCP ·
> **recomendar** → Trusted Advisor / Compute Optimizer / Cost Explorer.

---

## 14. Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 26/10/2026 | Lección completa: introducción + transcript (6:37) + lectura de servicios, Cost Explorer, Budgets, budget actions, tagging y tag policies + self-check | Nota completa (secciones 1–13) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Tag policy y creación de recursos.** El transcript dice que se puede **prevenir la creación** de recursos sin
   los tags requeridos; la lectura dice que el enforcement **previene cambios de tag no compliant**. Se transcriben
   ambas y se marca la **imprecisión del transcript** en §9.2.
2. **Categoría “governance”.** El video nombra **dos** herramientas (**Well-Architected Tool**, **Trusted Advisor**);
   la lectura lista **seis** (suma **Config**, **Control Tower**, **License Manager**, **CodeGuru Profiler**).
   No es contradicción: ejemplo vs. lista completa (§1.1).
3. **Self-check sin rationale.** La plataforma entrega **solo el enunciado**; no hay “Correct!” ni explicación
   oficial. La justificación de §11 es **propia**.
4. **Imágenes no disponibles.** La lectura referencia seis capturas (`G4F8VGGT2X.jpeg`, `SWMDE149W4.jpeg`,
   `A7692PMBBT.png`, `444RAFHKXJ.png`, `1SA5W41D5G.jpeg`, `8KC9DQWGCK.png`) que **no están en el vault**.
5. **Ubicación del párrafo de QuickSight/Glue.** Aparece al final de **budget actions**, pero conceptualmente
   pertenece al análisis de datos (**CUR**). Se transcribió en su lugar y se explica en §3.1.

**Decisiones de transcripción:**

- **“unblended costs”**, **“RI utilization”**, **“RI coverage”**, **“Savings Plans”** y **“budget day”** se
  mantienen en inglés: son nombres de métricas/unidades de la consola.
- **“Cost Center”** aparece con mayúsculas en el ejemplo del transcript y como `CostCenter` en la lectura. Se
  conservan ambos por contexto (§9.1, §12.8).
- Las **cifras** se transcribieron **literales**: **24 h**, **3 veces/día**, **8–12 h**, **20.000**, **62**,
  **$0,02**, **5 × 10**, **15 %**, **80 %**.
- El **15 %** del caso de la empresa de medios se atribuye **solo a identificar recursos sin tag sin usar**; la
  fuente no da el monto base ni el período.

---

## 🔗 Relacionado

- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — índice del módulo
- [[Cloud Cost Management]] — el marco que estas herramientas implementan
- [[Governance at Scale]] — budget por capas y alertas 20/30/50/80 %
- [[Establishing Guardrails]] — preventive/detective y dónde encajan IAM y SCP
- [[Management Controls]] — Service Catalog como control de gasto
- [[Detective Controls]] — Config y Security Hub en la capa de governance
- [[Cloud Governance Pillars]] — inventario, compliance y visibilidad
- [[Knowledge Check]] — pregunta 3: Budgets con acciones
- [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]
- [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]
- [[3.5 Identificar oportunidades de optimización de costos]]
- [[3.1 Estrategia para mejorar la excelencia operativa general]]
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
