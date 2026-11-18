---
title: "Domain 2 Review: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)"
aliases:
  - "opencode"
  - "Domain 2 Review"
  - "Notas vivas SAP-C02"
  - "Consolidado Skill Builder"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - notas-vivas
status: vivo
fuente: "Resúmenes de video/sesión de AWS Skill Builder (SAP-C02, español LATAM) integrados sesión por sesión"
---

# Domain 2 Review: AWS Certified Solutions Architect - Professional (SAP-C02 - Español LATAM)

> [!abstract] Qué es este archivo
> Documento **único y acumulativo** de estudio. Aquí se integra el contenido de cada sesión de
> Skill Builder (resumen del video, práctica, evaluación) y se **reorganiza para que el
> conocimiento se acumule**, no para reemplazarse.
>
> Es el punto de entrada del estudio: si algo se vio en una sesión y es relevante para el examen,
> **tiene que estar acá**. Las notas por dominio (`01 - Dominio 1` … `04 - Dominio 4`) y
> [[Definicion servicios]] son el detalle de referencia; este archivo es el hilo conductor.

> [!warning] Reglas de actualización (compromiso del agente)
> 1. **Nada se borra.** Si un resumen nuevo corrige o amplía algo, se **reescribe la línea** y se anota el cambio en [[#🕒 Registro de cambios]]. Lo reemplazado queda registrado, no desaparece.
> 2. **Todo dato se conserva.** Cifras, límites, cuotas, nombres exactos de servicios, puertos, tiempos de retención y "reglas de dedo" se transcriben **literalmente**; no se redondean ni se parafrasean.
> 3. **Cada afirmación tiene origen.** Toda fila o bullet se marca con la sesión de la que sale (`S01`, `S02`…). Si no lo dijo la sesión, no se inventa: va a [[#❓ Dudas abiertas]].
> 4. **Se consolida, no se duplica.** Antes de agregar, se busca si el concepto ya existe y se **fusiona** en la sección que corresponde.
> 5. **Los nombres de servicios van en inglés** (`AWS Transit Gateway`), con la explicación en español.
> 6. **Siempre se cierra el ciclo**: mapa de progreso + índice + registro de cambios actualizados en la misma edición.

> [!question] Cómo se responden las dudas
> Cuando digas **"tengo una duda"** (o similar), la respuesta va **acá mismo**, no en el chat: primero
> **1–3 líneas de respuesta directa**, después el detalle justo. La duda entra en [[#❓ Dudas abiertas]]
> y se cierra en el mismo movimiento, así queda el registro de *qué* se dudó y *cómo* se resolvió.
>
> Formato: **Duda** → **Respuesta corta** → **En el examen** → **Estado** ✅.
> Si la duda no se puede cerrar con lo que hay en las sesiones, queda ⏳ abierta y se resuelve cuando
> aparezca la sesión que la cubra.

> [!tip] Cómo pedirme una sesión
> Pegame el resumen del video (o la transcripción) y decime el número/título de la sesión.
> Yo devuelvo: sección `Sxx` nueva + filas integradas en las secciones transversales + changelog.
> Si el resumen es ambiguo o contradice algo ya anotado, te lo marco **antes** de escribir.

---

## 📌 Mapa de progreso

| ID | Sesión / video | Tema | Dominio | Estado | Sección |
| --- | --- | --- | --- | --- | --- |
| S01 | Introducción al Dominio 2 (presentación del módulo) | Panorama de las 6 tareas del D2 | D2 | 🟡 resumen cargado | [[#S01 — Dominio 2: panorama general (presentación del módulo)]] |
| S02 | Tarea 2.1 — Estrategia de implementación | Administración de cambios, CloudFormation, parches, CI/CD, SageMaker | D2 | 🟡 resumen cargado | [[#S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa]] |
| S03 | Tarea 2.2 — Continuidad de actividades | RTO/RPO, estrategias de DR, DRS, replicación, Route 53, monitoreo | D2 | 🟡 resumen cargado | [[#S03 — Tarea 2.2: solución para garantizar la continuidad de actividades]] |
| S04 | Tarea 2.3 — Controles de seguridad | GuardDuty, Security Hub, WAF, Shield, IAM, cifrado, endpoints, API Gateway | D2 | 🟡 resumen cargado | [[#S04 — Tarea 2.3: determinar controles de seguridad basados en los requisitos]] |
| S05 | Tarea 2.4 — Fiabilidad | Desacople, auto scaling, Multi-AZ, Route 53, almacenamiento HA | D2 | 🟡 resumen cargado | [[#S05 — Tarea 2.4: diseñar una estrategia para cumplir los requisitos de fiabilidad]] |
| S06 | Tarea 2.5 — Rendimiento | Escalado horizontal, right-sizing, patrones réplica/búfer/caché, bases por patrón | D2 | 🟡 resumen cargado | [[#S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento]] |
| S07 | Tarea 2.6 — Optimización de costos | Modelos de precios, S3/EBS, transferencia de datos, controles y visibilidad | D2 | 🟡 resumen cargado | [[#S07 — Tarea 2.6: estrategia de optimización de costos para cumplir las metas]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 🗂️ Índice de sesiones

- [[S01 — Dominio 2: panorama general (presentación del módulo)|S01 — Dominio 2: panorama general]]
- [[S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa|S02 — Tarea 2.1: estrategia de implementación]]
- [[S03 — Tarea 2.2: solución para garantizar la continuidad de actividades|S03 — Tarea 2.2: continuidad de actividades]]
- [[S04 — Tarea 2.3: determinar controles de seguridad basados en los requisitos|S04 — Tarea 2.3: controles de seguridad]]
- [[S05 — Tarea 2.4: diseñar una estrategia para cumplir los requisitos de fiabilidad|S05 — Tarea 2.4: fiabilidad]]
- [[S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento|S06 — Tarea 2.5: rendimiento]]
- [[S07 — Tarea 2.6: estrategia de optimización de costos para cumplir las metas|S07 — Tarea 2.6: optimización de costos]]

---

## S01 — Dominio 2: panorama general (presentación del módulo)

> [!info] Ficha
> - **Fuente:** video introductorio del módulo · **Dominio:** D2 — Diseño de las nuevas soluciones (29 %)
> - **Tareas cubiertas:** 2.1 a 2.6 (solo el mapa, todavía sin desarrollo técnico)
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> El Dominio 2 se estudia en **6 videos, uno por enunciado de tarea**, y cierra con **3 preguntas de ejemplo explicadas en detalle**.

### Qué evalúa el dominio
- Las preguntas evalúan la capacidad de **identificar soluciones y configuraciones nuevas** que cumplan requisitos específicos. *(S01)*
- El módulo incluye **6 videos**, que abarcan los **6 enunciados de tarea** del Dominio 2. *(S01)*
- Al final de las lecciones: **3 explicaciones detalladas de preguntas** de ejemplo del Dominio 2. *(S01)*

### Mapa de las 6 tareas

| Tarea | Tema | Qué evalúa / qué se profundiza |
| --- | --- | --- |
| **2.1** | Diseñar una estrategia de implementación para cumplir los requisitos del negocio *(transcripción: "de actividades")* | **Administración de cambios**; estrategias de implementación de **aplicaciones** y de **infraestructura**; implementación de **soluciones nuevas**; planificación de **actualizaciones** |
| **2.2** | Diseñar una solución para garantizar la **continuidad de actividades** | **Recuperación ante desastres (DR)** y **administración de errores**; arquitecturas de **alta disponibilidad**; administración de **conmutación por error (failover)**; **detección de errores** |
| **2.3** | Determinar **controles de seguridad** en función de los requisitos | **Administración de identidades y accesos (IAM)**; administración de **certificados y credenciales**; **cifrado** y más |
| **2.4** | Diseñar una estrategia para cumplir los requisitos de **fiabilidad** | **Prevenir interrupciones y mantener la estabilidad**; resistencia mediante **componentes poco acoplados**; **escalar para lograr estabilidad**; diseñar **recursos de conmutación por error** |
| **2.5** | Diseñar una solución para los **objetivos de rendimiento** | **Escalamiento para el rendimiento**; **ajuste del tamaño de los recursos** (*rightsizing*); **patrones de diseño**; suele exigir **equilibrar costo vs. mantenimiento** |
| **2.6** | Determinar una estrategia de **optimización de costos** para cumplir las metas | **Selección de recursos rentables**; **modelos de precios**; **herramientas de visibilidad de costos**; costos de **componentes arquitectónicos específicos** |

> [!important] 2.2 ≠ 2.4 (lo aclara el propio módulo)
> - **2.2 — Continuidad de actividades:** qué hacer **cuando ya pasó** el desastre → DR, failover, detección de errores.
> - **2.4 — Fiabilidad:** **evitar** que la interrupción ocurra y mantener la estabilidad → desacople, escalado, recursos de conmutación por error.
> - Regla práctica: si el enunciado dice *"recuperarse tras"* → 2.2. Si dice *"no dejar de estar disponible"* → 2.4.

### Indicación del instructor
- Ir anotando **todo conocimiento que se note faltante** mientras se miran las lecciones, para planificar el estudio posterior. *(S01)*

### Pendiente de esta sesión
- [x] Contenido de los 6 videos (2.1 → 2.6) — cargados en S02 a S07
- [ ] Las 3 preguntas de ejemplo explicadas en detalle

### Enlaces
- Guía oficial del Dominio 2 → [[Guia AWS]]
- Distinciones de servicios → [[Definicion servicios]]
- Notas por tarea → carpeta `02 - Dominio 2 - Nuevas Soluciones`

---

## S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa

> [!info] Ficha
> - **Fuente:** video de la tarea 2.1 · **Dominio:** D2 (29 %) · **Tarea:** 2.1
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Entregar y actualizar soluciones **con automatización e infraestructura inmutable**, usando CloudFormation para la infraestructura, Systems Manager para el mantenimiento y una canalización CI/CD para las aplicaciones.

### Puntos clave
- La tarea exige entender **administración de cambios**: cómo se entrega una solución nueva a los clientes y **cómo se actualiza** una vez implementada. *(S02)*
- El video ancla las respuestas en el **pilar de fiabilidad de AWS Well-Architected** y sus prácticas recomendadas de administración de cambios (ubicación tal como la da el video). *(S02)*
- **Práctica recomendada 1 — cambios con automatización.** *(S02)*
- **Práctica recomendada 2 — infraestructura inmutable:** ninguna actualización, parche de seguridad ni cambio de configuración puede ocurrir **en el lugar** (*in-place*) en cargas de producción. Se construye la arquitectura **en infraestructura nueva** y se despliega a producción. *(S02)*
- Se espera que sepas **elegir servicios** para estrategias de implementación e **implementar mecanismos de restauración** adecuados, tanto para **infraestructura** como para **aplicaciones**. *(S02)*

### Bloque 1 — Implementación de infraestructura

- Buscar **servicios administrados** que reduzcan el aprovisionamiento y los gastos generales de **aplicación de parches**. *(S02)*
- **AWS CloudFormation** es el eje: infraestructura como código (IaC), automatiza el aprovisionamiento y la configuración de una **pila completa nueva o actualizada**. *(S02)*
- Patrón de actualización: **desplegar una pila nueva** de recursos en lugar de intentar actualizar la infraestructura de producción, y **luego dirigir el tráfico de producción** a la pila actualizada. *(S02)*
- Hay que dominar lo básico: **plantillas**, **pilas** y **conjuntos de cambios** (*change sets*). *(S02)*
- Prácticas recomendadas de CloudFormation que menciona el video:
  - Componentes de infraestructura **reutilizables**.
  - **Pilas anidadas** (*nested stacks*) y **StackSets**.
  - Usar **conjuntos de cambios**.
  - **Compartir StackSets entre varias cuentas y regiones**.
  - **`DeletionPolicy`**: cómo **retener un recurso** cuando se elimina una pila.
  - Integración con **AWS Cloud Development Kit (CDK)**.

### Bloque 2 — Parches y mantenimiento continuo

- Al diseñar soluciones nuevas hay que **planificar el mantenimiento continuo**, no solo el día 1. *(S02)*
- **AWS Systems Manager**: implementar **parches de seguridad** y **actualizaciones de software**; hay que saber **incorporarlo** al despliegue de soluciones nuevas. *(S02)*
- **AWS Secrets Manager**: manejar contraseñas de **cuentas de servicio** y de **Amazon RDS** en implementaciones **automatizadas** de bases de datos. *(S02)*
- **Run Command** (comando de ejecución): facilita las **implementaciones de servidor** y las **configuraciones posteriores** al despliegue. *(S02)*
- Hay que saber **cuándo planificar la instalación del agente de Systems Manager**. *(S02)*

### Bloque 3 — Implementaciones de aplicaciones (CI/CD)

- El examen verifica si sabés determinar una **aplicación o ruta de actualización** para servicios y funciones nuevas. *(S02)*
- Metodología que cumple "cambios con automatización": **integración y entrega continuas (CI/CD)**. *(S02)*
- Canalización de ejemplo del video, en orden:

| Etapa | Servicio | Qué hace |
| --- | --- | --- |
| 1. Origen | **AWS CodeCommit** | Repositorio de código que alimenta la canalización |
| 2. Orquestación | **AWS CodePipeline** | Automatiza los procesos de **compilación, prueba y lanzamiento** |
| 3. Build + test | **AWS CodeBuild** | Construye la aplicación e **inicia pruebas automatizadas** |
| 4. Despliegue | **AWS CodeDeploy** | Despliega en el recurso de cómputo: **Amazon EC2, AWS Lambda o contenedores en AWS Fargate** |
| 5. Tráfico | **AWS CodeDeploy** | **Dirige el tráfico de producción** a la aplicación recién implementada |

### Bloque 4 — Delegar lo complejo a AWS

- Tecnologías avanzadas accesibles **delegando tareas complejas de desarrollo e implementación** a AWS. *(S02)*
- **Amazon SageMaker**: ML de un extremo a otro, con **algoritmos y marcos de trabajo** para crear y entrenar modelos; además **gestiona la implementación de modelos nuevos y actualizados** para usarlos en aplicaciones. *(S02)*

### Refuerzo desde la práctica (P01)

- **Lambda@Edge** es una característica de **CloudFront** que permite **ejecutar código en una ubicación perimetral** (edge). *(P01)*
- Sirve para dirigir un **porcentaje del tráfico de sesiones nuevas** al origen beta de forma **automática**, **sin interrumpir ni redirigir** las sesiones existentes. *(P01)*
- Cómo lo hace: **inspecciona cookies** para saber si la sesión es nueva; en sesiones nuevas **reescribe la URL** para un porcentaje pequeño; en sesiones en curso **fija el origen según la cookie**. *(P01)*
- Límite que el examen usa como distractor: **el sitio web no puede invocar funciones de Lambda@Edge**; se disparan por eventos de CloudFront. *(P01)*
- **Route 53 con enrutamiento ponderado** reparte tráfico entre dos distribuciones, pero **no distingue sesión nueva de sesión existente**, y al terminar la beta obliga a **eliminar la distribución y reconfigurar los pesos** → **más esfuerzo operativo**. *(P01)*

### Cómo se resuelve en el examen
- Si piden **actualizar sin downtime y poder volver atrás** → pila nueva + `change set` + mover tráfico; no "modificar en el lugar". *(S02)*
- Si piden **retener datos al eliminar la pila** → `DeletionPolicy` con retención. *(S02)*
- Si piden **gobernar el despliegue en muchas cuentas/regiones** → **StackSets**. *(S02)*
- Si piden **cumplir parches y cumplimiento en flota de servidores** → **Systems Manager**. *(S02)*
- Si piden **contraseñas sin hardcodear en el despliegue** → **Secrets Manager**. *(S02)*
- Si piden **automatizar build→test→deploy** → **CodePipeline + CodeBuild + CodeDeploy** (con CodeCommit como origen en el ejemplo). *(S02)*

### Trampas y errores comunes
- ❌ "Actualizo la instancia de producción en caliente" → ✅ **infraestructura inmutable**: pila nueva y mover el tráfico. *(S02)*
- ❌ Confundir **conjunto de cambios** (previsualiza el impacto antes de ejecutar) con desplegar directo. *(S02)*
- ❌ Poner las contraseñas de RDS en la plantilla o en el script → ✅ **Secrets Manager**. *(S02)*
- ❌ Olvidar el **agente de Systems Manager**: sin agente no hay parches ni Run Command. *(S02)*
- ❌ Resolver "solo sesiones nuevas" con **ponderado de Route 53**. → ✅ hace falta **conciencia de sesión** (Lambda@Edge leyendo cookies). *(P01)*
- ❌ Creer que el **sitio web puede invocar Lambda@Edge**. → ✅ solo se dispara por eventos de CloudFront. *(P01)*

### Preguntas de repaso
1. ¿Qué significa "infraestructura inmutable" en este contexto y qué patrón de despliegue implica?
   <details><summary>Respuesta</summary>Que no se aplican cambios en el lugar sobre producción: se construye la arquitectura nueva y se despliega; el tráfico se dirige a la pila actualizada.</details>
2. ¿Para qué sirve `DeletionPolicy` al eliminar una pila?
   <details><summary>Respuesta</summary>Para decidir qué pasa con un recurso: el video destaca **retenerlo** en lugar de borrarlo con la pila.</details>
3. ¿Qué servicio gobierna la instalación de parches y las configuraciones posteriores al despliegue?
   <details><summary>Respuesta</summary>AWS Systems Manager (parches y actualizaciones de software, Run Command), con el agente de SSM instalado en las instancias.</details>
4. ¿Qué cuatro servicios aparecen en la canalización de ejemplo y en qué orden?
   <details><summary>Respuesta</summary>CodePipeline orquesta; CodeCommit es el origen; CodeBuild compila y prueba; CodeDeploy despliega y dirige el tráfico de producción.</details>

### Dudas resueltas en esta sesión
- Ninguna.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Guía oficial → [[Guia AWS]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales.md`
- Servicios → [[Definicion servicios]]

---

## S03 — Tarea 2.2: solución para garantizar la continuidad de actividades

> [!info] Ficha
> - **Fuente:** video de la tarea 2.2 · **Dominio:** D2 (29 %) · **Tarea:** 2.2
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Continuidad de actividades = **capacidad de todo un sistema para recuperarse de un desastre**; se resuelve eligiendo la estrategia de DR que cumpla **RTO + RPO + costo**.

### Base conceptual
- Revisar el **pilar de confiabilidad/fiabilidad de AWS Well-Architected**, con foco en **administración de errores** y sus prácticas recomendadas. *(S03)*
- **RTO** (*Recovery Time Objective*): cantidad **máxima de inactividad tolerable** por un error. *(S03)*
- **RPO** (*Recovery Point Objective*): cantidad **aceptable de pérdida de datos, medida en tiempo**. *(S03)*
- Las preguntas del D2 suelen dar requisitos (RTO/RPO/costo) y pedir **la solución que los cumpla**. *(S03)*

### Alta disponibilidad: aislar el fallo
- Diseñar arquitecturas que mantengan disponibles **aplicaciones e infraestructura** durante una interrupción. *(S03)*
- Usar **varias zonas de disponibilidad o regiones** para **aislar errores**, limitar el impacto y **soportar operaciones de conmutación por error** si falla una AZ o una región. *(S03)*

### Las 4 estrategias de recuperación (escalera costo ↔ velocidad)

| Estrategia | Velocidad de recuperación | Costo | Qué implica |
| --- | --- | --- | --- |
| **Multisitio / activo-activo** | **Rápida** | **Mayor** | Recursos activos en más de un sitio |
| **Espera semiactiva** (*warm standby*) | Ligeramente más lenta | Más rentable que multisitio | Entorno de espera ya montado, listo para tomar carga |
| **Luz piloto** (*pilot light*) | Más lenta | Aún más rentable | Solo lo mínimo encendido; se escala al recuperar |
| **Respaldo y restauración** | **La más lenta** | **La más rentable** | Requiere tolerar **RPO y RTO mayores** |

> [!important] La regla de oro de 2.2
> **Más velocidad = más costo.** Si el enunciado pide RTO/RPO casi cero, la respuesta es multisitio activo-activo
> aunque sea caro. Si pide "lo más rentable posible" y tolera horas de pérdida, es respaldo y restauración.
> El examen castiga elegir la estrategia "barata" cuando el RTO pedido es agresivo.

### Caso Redshift del video (RPO 24 h · RTO 1 h · caída de región entera)

El video plantea: almacén de datos en **Amazon Redshift** que debe seguir disponible aunque **caiga una región completa**, con **RPO de 24 horas** y **RTO de 1 hora**. Las opciones que pone sobre la mesa:
1. **Instantáneas automáticas** + **instantáneas entre regiones** para copiar/replicar el clúster de producción a la región de DR.
2. **Cambiar el punto de enlace DNS** para apuntar al entorno recuperado.
3. **Replicación entre regiones**.

- Hay que **profundizar en instantáneas** y en cómo habilitar **copias automáticas en otra región**. *(S03)*
- El video **no cierra la respuesta**: la deja como ejercicio de razonamiento (ver [[#❓ Dudas abiertas]], duda #1).

### Requisitos de una solución de respaldo
- **Automatizada** y **rentable**. *(S03)*
- Que soporte **disponibilidad entre varias regiones o zonas de disponibilidad**. *(S03)*
- Que equilibre: **RPO · RTO · resistencia/durabilidad de los datos · costos de almacenamiento y de transferencia**. *(S03)*

### Qué debe poder hacer una solución de DR
1. **Replicar recursos** de producción hacia un entorno de conmutación por error.
2. **Integrarse con herramientas de monitoreo** para detectar interrupciones.
3. **Redirigir el tráfico** al entorno de conmutación por error.
4. **Soportar pruebas de recuperación ante desastres**.

### AWS Elastic Disaster Recovery (DRS)
- Hace **replicación continua** de los **servidores** y del **almacenamiento en bloque** desde la ubicación de origen hacia AWS, para recuperación en la región. *(S03)*
- Permite **probar en la región de recuperación** para verificar que la replicación funciona. *(S03)*

### Replicación de bases de datos (Amazon RDS)

| Opción | Qué es | Se puede leer de ella | Al promover / failover |
| --- | --- | --- | --- |
| **Instancia Multi-AZ** | Réplica en otra AZ | No acepta tráfico de lectura (standby) | Conmutación automática |
| **Clúster Multi-AZ** | Variante de clúster Multi-AZ | — | — |
| **Réplicas de lectura** | Copias que escalan lectura | **Sí**, aceptan tráfico de lectura | Se pueden **promover a primaria**, pero **primero hay que reiniciar las réplicas** → **tarda más → RTO más largo** |

> [!warning] Dato que el examen explota
> El tipo de replicación que podés crear **está limitado por el motor de base de datos**. Y no todas las copias
> aceptan tráfico de lectura. Si el requisito es **RTO corto**, promover réplicas de lectura no es la mejor
> opción porque el reinicio alarga la recuperación.

### Replicación de datos: DataSync vs Storage Gateway

- **AWS DataSync** y **AWS Storage Gateway** son los servicios de replicación de datos a comparar. *(S03)*
- Pregunta que decide: **¿te piden replicar archivos, volúmenes o respaldos en cinta?** *(S03)*
- Y además: **cómo afecta al RPO la frecuencia de las acciones de replicación programadas** de cada servicio. *(S03)*

### Refuerzo desde la práctica (P02) — Replicación de S3

- La **replicación de S3** replica **solo los objetos nuevos** agregados **después de habilitarla**; **no** copia los objetos que ya estaban en el bucket. *(P02)*
- **S3 Replication Time Control** **no cambia** ese comportamiento: no sirve para recuperar el histórico. *(P02)*
- **S3 Batch Replication** sí copia los **objetos existentes** (y sirve para reintentar los que fallaron). *(P02)*
- Combinación para "existentes + nuevos": **Batch Replication primero**, y **después** configurar la **replicación** para lo nuevo. *(P02)*
- **S3 Inventory** lista objetos, pero usarlo repetidamente con **Batch Operations** **vuelve a replicar** lo ya replicado → ineficiente. *(P02)*
- **Athena** consulta **datos** almacenados en S3, pero **no puede generar una lista de objetos de un bucket**. *(P02)*

### Enrutamiento del tráfico en DR
- **Amazon Route 53** para DNS:
  - **Comprobaciones de estado** (*health checks*) que reconozcan las interrupciones.
  - El **método de enrutamiento** correcto que cumpla los requisitos de conmutación por error.
  - **TTL adecuado** en los registros DNS que deban cambiar rápido durante un failover.
- **Componentes de red** que facilitan el failover, como el **balanceador de carga**. *(S03)*
- Entender cómo **el enrutamiento estático vs. dinámico** afecta las configuraciones necesarias para redirigir el tráfico. *(S03)*

### Monitoreo y respuesta automatizada
- Usar **procesos y componentes de supervisión centralizada** para recuperarse **proactivamente**. *(S03)*
- **CloudWatch**: configuraciones correctas de **supervisión del estado del sistema** y **alarmas** que pueden **iniciar una respuesta automatizada**. *(S03)*
- **EventBridge** para automatizar la respuesta ante una interrupción con **AWS Lambda** o **Amazon SNS** para avisar al equipo correcto. *(S03)*

### Cómo se resuelve en el examen
- **Primero leé RTO y RPO.** Son los dos números que descartan opciones antes de mirar servicios. *(S03)*
- Si el RTO es agresivo y el costo no importa → **activo-activo**. Si tolera horas → **backup & restore**. *(S03)*
- Si piden replicar **servidores completos** con conmutación rápida → **AWS Elastic Disaster Recovery**. *(S03)*
- Si piden replicar **todo el bucket, histórico incluido**, a otra región → **S3 Batch Replication** + **replicación de S3** para lo nuevo. *(P02)*
- Si piden **cambiar de región rápido sin tocar la app** → **Route 53 + health checks + TTL bajo** y mover el tráfico. *(S03)*
- Si piden **recuperación automática** → **alarma de CloudWatch → EventBridge → Lambda/SNS**. *(S03)*

### Trampas y errores comunes
- ❌ Confundir **RTO** (tiempo sin servicio) con **RPO** (datos perdidos). → ✅ RTO = cuánto puedo estar caído; RPO = cuánto dato puedo perder.
- ❌ Elegir **respaldo y restauración** cuando el RTO es de minutos. → ✅ esa estrategia es la más lenta.
- ❌ Asumir que **toda réplica de BD** sirve para lectura. → ✅ depende del motor y del tipo.
- ❌ Promover una réplica de lectura y creer que el RTO es inmediato. → ✅ primero hay que reiniciar las réplicas.
- ❌ Cambiar DNS sin **TTL bajo** → ✅ la propagación se come el RTO. *(S03)*
- ❌ Olvidar que el RPO depende de la **frecuencia** de replicación. → ✅ un backup diario no puede dar RPO de una hora. *(S03)*
- ❌ Configurar **replicación de S3** y creer que copia el histórico. → ✅ los objetos previos van con **Batch Replication**. *(P02)*

### Preguntas de repaso
1. Definí RTO y RPO sin mirar.
   <details><summary>Respuesta</summary>RTO: inactividad máxima tolerable por un error. RPO: pérdida de datos aceptable, medida en tiempo.</details>
2. Ordená las 4 estrategias de DR de menor a mayor costo.
   <details><summary>Respuesta</summary>Respaldo y restauración → luz piloto → espera semiactiva → multisitio/activo-activo. La velocidad de recuperación sube en el mismo orden.</details>
3. ¿Por qué promover una réplica de lectura alarga el RTO?
   <details><summary>Respuesta</summary>Porque además de promoverla hay que reiniciar las réplicas de lectura, y ese reinicio consume tiempo.</details>
4. ¿Qué dos ajustes de Route 53 son críticos en un failover?
   <details><summary>Respuesta</summary>Las comprobaciones de estado (para detectar la interrupción) y un TTL bajo en los registros que deben cambiar rápido; más el método de enrutamiento adecuado.</details>
5. ¿Qué servicio automatiza la respuesta ante una alarma?
   <details><summary>Respuesta</summary>EventBridge, invocando Lambda o enviando avisos por SNS.</details>

### Dudas resueltas en esta sesión
- Ninguna (queda la duda #1 abierta a propósito).

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.2 Diseñar una solución para garantizar la continuidad de actividades.md`
- Servicios → [[Definicion servicios]]

---

## S04 — Tarea 2.3: determinar controles de seguridad basados en los requisitos

> [!info] Ficha
> - **Fuente:** video de la tarea 2.3 · **Dominio:** D2 (29 %) · **Tarea:** 2.3
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> La seguridad se resuelve **leyendo el requisito y armando capas**: identidad y acceso, protección de la infraestructura y protección de los datos, con el servicio que cumpla **ese** requisito.

### Base
- Revisar el **pilar de seguridad** de AWS Well-Architected. *(S04)*
- Aunque las preguntas tocan todo el pilar, el foco está en tres áreas:
  1. **Administración de identidad y acceso (IAM)**
  2. **Protección de la infraestructura**
  3. **Protección de datos**
- Al responder: **prestar mucha atención a los requisitos** y saber cómo los servicios **se combinan** para dar **defensa en profundidad**. *(S04)*

### Defensa en profundidad: los 4 servicios que hay que dominar

| Servicio | Qué aporta | Trampa de identificación |
| --- | --- | --- |
| **Amazon GuardDuty** | **Detección de amenazas** y visibilidad de seguridad | Detecta, **no** bloquea ni corrige |
| **AWS Security Hub** | Prácticas recomendadas de seguridad, comprobaciones, **alertas agregadas** y **soporte de remediación automática** | Es el **agregador**; no es el motor de detección de amenazas |
| **AWS WAF** | Protege **aplicaciones web y APIs** contra vulnerabilidades comunes y **bots** | Capa de aplicación (HTTP/HTTPS) |
| **AWS Shield** | Protección **gestionada contra ataques DDoS** | DDoS, no inyecciones ni bots |

- Hay que saber **qué capa de protección OSI** ofrece cada servicio de seguridad de AWS → [[#❓ Dudas abiertas]], duda #2. *(S04)*
- También se pueden pedir **servicios de seguridad administrados para mitigar ataques a aplicaciones web a gran escala**. *(S04)*

### Identidad y acceso (IAM)
- Especificar **usuarios y roles de IAM** que cumplan el **principio de acceso con privilegios mínimos** y los requisitos dados. *(S04)*
- Conocer la **gestión de credenciales** y cómo **cada servicio** soporta las prácticas de **rotación y auditoría**. *(S04)*
- Cuando el requisito lo permita: **credenciales temporales** en lugar de credenciales de largo plazo. *(S04)*

**Auditoría y rotación de credenciales**

| Servicio | Rol en este bloque |
| --- | --- |
| **AWS Secrets Manager** | Facilita la **rotación de credenciales**, controla el **acceso a secretos** y se integra con monitoreo y registro para **control y auditoría** |
| **AWS Config** | **Reglas de configuración** para automatizar la **auditoría de credenciales** e **iniciar acciones correctivas** |

> [!example] Caso del video: AMI aprobada solo en producción
> **Requisito:** todas las instancias EC2 de producción usan una **AMI aprobada**, pero los desarrolladores
> pueden usar AMIs no aprobadas. **Respuesta: AWS Config**, porque además **evalúa configuraciones e
> instantáneas de recursos** y **recupera configuraciones históricas**.

### Protección de la infraestructura
- Aplicar un conjunto de requisitos dentro de una **estrategia de defensa en capas** e identificar las configuraciones correctas de:
  - **Tabla de enrutamiento**
  - **Grupo de seguridad** (*security group*)
  - **Lista de control de acceso a la red (NACL)**
- **Service endpoints** para proteger el tráfico de las integraciones:
  - Reconocer los **requisitos distintos** de **puntos de enlace de interfaz** vs **puntos de enlace de puerta de enlace**.
  - Saber **cuándo usar VPC endpoints con AWS PrivateLink** para conectar de forma segura **VPC, servicios de AWS o aplicaciones en las instalaciones**.
- **Parches que cumplan los estándares de la organización**:
  - **Patch Manager**, capacidad de **AWS Systems Manager**, cuando corresponde aplicarlos al **sistema operativo y las aplicaciones**. *(S04)*
  - Alternativa: **actualizar la AMI** y desplegar el servidor actualizado **como nuevo**, en lugar de actualizar *in situ* (misma lógica inmutable de [[#S02 — Tarea 2.1: estrategia de implementación para cumplir los requisitos de la empresa|S02]]). *(S04)*

### Datos en reposo

| Pregunta del enunciado | Respuesta |
| --- | --- |
| ¿Los requisitos permiten usar **AWS KMS**? | KMS **crea, almacena y rota** claves de cifrado |
| ¿Exigen **crear las propias claves**? | **AWS CloudHSM** para almacenarlas |
| ¿Hay que auditar el uso de las claves? | Consultar **AWS CloudTrail** |
| ¿Piden **validación y corrección automatizadas**? | **Reglas de AWS Config** que verifiquen el cifrado de los recursos **recién creados** |

- Prepararse para configurar servicios que **cifren todos los datos almacenados por defecto**. *(S04)*

### Datos en tránsito
- Aplicar cifrado en tránsito mediante **conexiones VPN**. *(S04)*
- Definir **puntos de enlace HTTPS** en los componentes de red: **balanceadores de carga** y **distribuciones de CloudFront**. *(S04)*
- Garantizar las comunicaciones configurando los componentes de red para operar con **certificados TLS**. *(S04)*
- **AWS Certificate Manager (ACM)**: aprovisiona, administra y despliega certificados **TLS públicos y privados**. *(S04)*
- Volver sobre **VPC endpoints y AWS PrivateLink** y cómo protegen el tráfico entre VPC o con las instalaciones. *(S04)*

### Autenticación segura de solicitudes
- **Amazon API Gateway** es el servicio clave para autenticar y procesar solicitudes de forma segura. *(S04)*
- Saber integrar:
  - **Proxy Lambda**
  - **Cognito** (autenticación)
  - **DynamoDB** para almacenar los **metadatos**
  - **Auto scaling**

### Cómo se resuelve en el examen
- Si piden **detectar** comportamiento anómalo → **GuardDuty**. Si piden **ver cumplimiento y agregar hallazgos** → **Security Hub**. *(S04)*
- Si piden **bloquear SQLi/XSS o bots** → **WAF**. Si piden **mitigar DDoS** → **Shield**. *(S04)*
- Si piden **privilegios mínimos** → roles de IAM, no usuarios con claves. *(S04)*
- Si piden **rotar credenciales** → **Secrets Manager**; si piden **auditar/forzar** una configuración → **AWS Config**. *(S04)*
- Si piden **claves propias, no gestionadas por AWS** → **CloudHSM**. *(S04)*
- Si piden **cifrado en tránsito extremo a extremo dentro de AWS** → **PrivateLink / VPC endpoints**. *(S04)*
- Si piden **certificados TLS** → **ACM**. *(S04)*
- Si piden **actualizar servidores sin in-place** → AMI nueva desplegada como instancia nueva. *(S04)*

### Trampas y errores comunes
- ❌ Usar **GuardDuty** para "remediar". → ✅ detecta y avisa; la remediación automática la da **Security Hub**.
- ❌ Usar **WAF** para DDoS volumétrico. → ✅ **Shield**; WAF es capa de aplicación.
- ❌ Guardar credenciales de largo plazo "porque es más simple". → ✅ credenciales **temporales** cuando el requisito lo permita.
- ❌ Mezclar **KMS** con **CloudHSM** cuando el requisito exige control total de la clave. → ✅ CloudHSM.
- ❌ Confundir **punto de enlace de interfaz** con **punto de enlace de puerta de enlace**: tienen **requisitos de configuración distintos**. *(S04)*
- ❌ Auditar claves mirando CloudWatch. → ✅ **CloudTrail** registra el uso de claves.

### Preguntas de repaso
1. ¿Qué servicio agregar alertas y remediación automática sobre prácticas recomendadas?
   <details><summary>Respuesta</summary>AWS Security Hub, que agrega comprobaciones y soporte de remediación; GuardDuty se queda en la detección de amenazas.</details>
2. Necesitás forzar que producción use solo AMIs aprobadas sin bloquear a los desarrolladores. ¿Qué usás?
   <details><summary>Respuesta</summary>AWS Config, con reglas que evalúan el cumplimiento y permiten acciones correctivas; además guarda configuraciones históricas.</details>
3. ¿Cuándo elegís CloudHSM sobre KMS?
   <details><summary>Respuesta</summary>Cuando el requisito exige crear y almacenar las propias claves de cifrado.</details>
4. ¿Cómo se cifra el tránsito entre tus VPC y servicios de AWS sin salir a internet?
   <details><summary>Respuesta</summary>Con VPC endpoints / AWS PrivateLink, eligiendo interfaz o puerta de enlace según el requisito.</details>
5. ¿Qué dos caminos hay para parchear servidores?
   <details><summary>Respuesta</summary>Patch Manager de Systems Manager sobre el sistema en ejecución, o construir una AMI actualizada y desplegarla como servidor nuevo.</details>

### Dudas resueltas en esta sesión
- Ninguna (queda la duda #2 abierta: capas OSI).

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S03 — Tarea 2.2: solución para garantizar la continuidad de actividades]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.3 Determinar los controles de seguridad en función de los requisitos.md`
- Servicios → [[Definicion servicios]]

---

## S05 — Tarea 2.4: diseñar una estrategia para cumplir los requisitos de fiabilidad

> [!info] Ficha
> - **Fuente:** video de la tarea 2.4 · **Dominio:** D2 (29 %) · **Tarea:** 2.4
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Fiabilidad = **prevenir y aislar** errores: desacoplar componentes, escalar para absorber demanda y usar Multi-AZ/multi-región para que un fallo no se propague.

### La distinción que ahora queda cerrada
| | 2.2 Continuidad de actividades | 2.4 Fiabilidad |
| --- | --- | --- |
| Enfoque | **Reaccionar** ante una interrupción | **Prevenir y aislar** errores |
| Métrica típica | **RTO / RPO** (tiempo caído, datos perdidos) | **Disponibilidad expresada como tiempo de actividad (uptime)** |
| Pilar | Fiabilidad / confiabilidad de Well-Architected | El **mismo** pilar |

> Ambos enunciados pertenecen al **pilar de fiabilidad**; lo que cambia es el verbo del escenario. *(S05)*

### Infraestructura global
- Diseñar e implementar entornos **de alta disponibilidad o tolerantes a errores** según los requisitos del negocio. *(S05)*
- La infraestructura global de AWS ayuda con **implementaciones de varias regiones** y **despliegues Multi-AZ**. *(S05)*
- Multi-región no solo permite **conmutación por error**: también **reduce latencia** al acercar los recursos a los clientes, lo que **aumenta la fiabilidad** y evita problemas como **pérdida de paquetes y tiempos de espera de mensajes**. *(S05)*

### Route 53: enrutamiento para estabilidad
- **Enrutamiento basado en latencia**. *(S05)*
- **Enrutamiento de geolocalización**. *(S05)*
- **Enrutamiento de conmutación por error**. *(S05)*

### Componentes débilmente acoplados

> Cada componente debe ser **poco acoplado** (limita el impacto del error), **escalable** (absorbe la demanda manteniendo estabilidad) y **altamente disponible**. *(S05)*

| Tipo de desacople | Cómo se implementa |
| --- | --- |
| **Sincrónico** | **ALB** (Application Load Balancer) distribuyendo tráfico entre instancias **EC2**; **API Gateway** enrutando llamadas entre **funciones Lambda** |
| **Asincrónico** | **SQS** conectado a una aplicación de trabajo mediante **modelo de sondeo** (*polling*); **temas de SNS** distribuyendo mensajes a **varias aplicaciones suscriptoras** |

- Herramientas **sin servidor** para crear y mejorar el desacople: **SQS, API Gateway, DynamoDB** y el resto del conjunto serverless. *(S05)*

### Escalado para absorber la demanda

| Pieza | Qué hay que configurar |
| --- | --- |
| **Métricas** | Capturar las métricas correctas para decidir **cuándo** escalar |
| **Health checks** | Balanceadores de carga comprobando el estado de las instancias **EC2 en grupos de Auto Scaling** |
| **Alarmas** | **CloudWatch** monitoreando, por ejemplo, la **utilización de CPU** |

**Acciones de escalado por servicio**

| Servicio | Acción |
| --- | --- |
| **EC2 Auto Scaling** | Ajustar el **recuento de instancias** |
| **Amazon ECS** | Ajustar el **recuento de tareas** del servicio |
| **Amazon DynamoDB** | Modificar el **rendimiento aprovisionado** de la tabla |

> [!warning] Antes de elegir cualquier acción de escalado
> Considerar **limitaciones de recursos**: capacidad de una **clase de almacenamiento**, **tráfico máximo de un tipo de conexión de red**, y sobre todo
> **Service Quotas y límites** — las cuotas limitan cuántos recursos podés aprovisionar y **la tasa de solicitudes a las API**.

### Estabilidad de datos y base de datos
- **RDS Multi-AZ**, tres formas: **instancia Multi-AZ**, **clúster Multi-AZ** y **réplicas de lectura**; hay que saber **qué motores admiten cada tipo** y **cuándo usar cada uno** (ver [[#S03 — Tarea 2.2: solución para garantizar la continuidad de actividades|S03]]). *(S05)*
- Todos soportan **conmutación por error**, pero la **instancia en espera** de Multi-AZ **no descarga lecturas** del primario: por eso no aporta estabilidad cuando la carga de lectura es el problema. *(S05)*
- **Amazon ElastiCache**: almacenar en caché **resultados de consultas comunes** para sostener la estabilidad de la base de datos. *(S05)*

### Almacenamiento altamente disponible
- Pregunta de diseño: **cómo replica el servidor los datos en múltiples ubicaciones**. *(S05)*
- **Amazon S3**: habilitar **replicación entre regiones (CRR)** para duplicar los archivos en distintas regiones. *(S05)*
- **AWS Global Accelerator** con **puntos de acceso de varias regiones de S3**, para dar el **menor acceso de latencia** a los datos replicados. *(S05)*
- Sistemas de archivos **Multi-AZ**: **Amazon EFS** y **Amazon FSx**. *(S05)*
- El **almacenamiento de archivos se desacopla del cómputo**: si se interrumpe el cómputo, el almacenamiento no se ve afectado. *(S05)*

### Cómo se resuelve en el examen
- Si el escenario dice **"evitar que un fallo se propague"** → desacople (ALB, API Gateway, SQS, SNS). *(S05)*
- Si dice **"absorber picos"** → Auto Scaling con la métrica y la alarma correctas, y revisar cuotas. *(S05)*
- Si dice **"latencia mínima para usuarios globales"** → Route 53 por **latencia/geolocalización**, o **Global Accelerator**. *(S05)*
- Si dice **"descargar lecturas de la base"** → **réplicas de lectura** o **ElastiCache**; la standby de Multi-AZ **no** sirve para eso. *(S05)*
- Si dice **"datos duplicados en otra región"** → **S3 Cross-Region Replication**. *(S05)*
- Si dice **"archivos compartidos Multi-AZ"** → **EFS / FSx**, no un volumen atado a una instancia. *(S05)*

### Trampas y errores comunes
- ❌ Usar **Multi-AZ standby** para escalar lectura. → ✅ réplicas de lectura o caché.
- ❌ Elegir auto scaling sin mirar **cuotas y límites** → ✅ la acción puede fallar o no alcanzar.
- ❌ Confundir **disponibilidad (uptime)** con **RTO/RPO**. → ✅ la 2.4 se mide en tiempo de actividad.
- ❌ Poner el almacenamiento junto al cómputo. → ✅ EFS/FSx desacoplan y sobreviven a la caída de la instancia.
- ❌ Asumir que **SQS** notifica a varios consumidores. → ✅ eso es **SNS** (fan-out); SQS es cola con sondeo.

### Preguntas de repaso
1. ¿Qué diferencia central hay entre 2.2 y 2.4?
   <details><summary>Respuesta</summary>2.2 reacciona a la interrupción (DR, RTO/RPO); 2.4 previene y aísla errores, y se mide como tiempo de actividad.</details>
2. ¿Tres formas de Multi-AZ en RDS y cuál no descarga lecturas?
   <details><summary>Respuesta</summary>Instancia Multi-AZ, clúster Multi-AZ y réplicas de lectura; la instancia en espera de Multi-AZ no acepta lecturas.</details>
3. ¿Qué acción de escalado corresponde a DynamoDB?
   <details><summary>Respuesta</summary>Modificar el rendimiento aprovisionado de la tabla.</details>
4. ¿Qué dos servicios dan acceso Multi-AZ a archivos y desacoplan el almacenamiento del cómputo?
   <details><summary>Respuesta</summary>Amazon EFS y Amazon FSx.</details>
5. ¿Para qué se combina Global Accelerator con access points de S3 en varias regiones?
   <details><summary>Respuesta</summary>Para dar el menor acceso de latencia a los datos replicados entre regiones.</details>

### Dudas resueltas en esta sesión
- Se cierra el contraste **2.2 vs 2.4** con el contenido de ambos videos.

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S04 — Tarea 2.3: determinar controles de seguridad basados en los requisitos]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad.md`
- Servicios → [[Definicion servicios]]

---

## S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento

> [!info] Ficha
> - **Fuente:** video de la tarea 2.5 · **Dominio:** D2 (29 %) · **Tarea:** 2.5
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Rendimiento = **elasticidad + dimensionamiento correcto + patrones** (réplica, búfer, caché), casi siempre eligiendo lo que cumple el objetivo **sin inflar costo ni mantenimiento**.

### Base
- Se alinea con el **pilar de eficiencia de rendimiento**, pero también exige entender **optimización de costos** y **excelencia operativa**. *(S06)*
- La tarea se centra en la **selección**, aunque incluye **revisión, supervisión y compromisos** (*trade-offs*). *(S06)*
- Las preguntas piden **la solución que cumpla los requisitos de rendimiento, a menudo equilibrando costos y necesidades de mantenimiento**. *(S06)*

### Elasticidad y escalado
- Diseñar una arquitectura **elástica** basada en los objetivos de negocio. *(S06)*
- Identificar estrategias de escalado **eficiente** que escalen **horizontalmente** para cumplir el rendimiento… y que **también reduzcan** cuando baja la demanda, para cumplir los requisitos de **costo**. *(S06)*
- Para evaluar estrategias hay que conocer **controles y configuraciones de escalado** en: **cómputo, almacenamiento, base de datos y servicios de red**. *(S06)*
- Conocer las **opciones sin servidor** de esas categorías y el compromiso **costo ↔ menor sobrecarga de mantenimiento**. *(S06)*

### Dimensionamiento correcto (*right-sizing*)
- Estrategia para **cumplir el rendimiento y ahorrar dinero** al mismo tiempo. *(S06)*
- Familiarizarse con las **familias de instancias EC2 y sus casos de uso**, y con el dimensionamiento de **almacenamiento** e **instancias de base de datos**. *(S06)*
- En EC2, decidir dos cosas:
  1. **Qué tipo de volumen** tiene la **velocidad correcta** y las **funciones de solidez de datos** para la carga.
  2. **Qué tamaño de volumen** hace falta.
- Para **cómputo de alto rendimiento (HPC)**: evaluar **Elastic Fabric Adapter (EFA)**. *(S06)*
- La **supervisión** verifica si dimensionaste bien y permite **detectar recursos sobreutilizados o subutilizados** de forma continua. *(S06)*

### Patrón 1 — Réplica
- Acerca los recursos a donde se consumen para **reducir latencia**: **tabla global de DynamoDB** con réplicas en las regiones de mayor demanda. *(S06)*
- También crea **recursos adicionales** para soportar demanda y **distribuir la carga**: **réplicas de lectura de RDS** que descargan tráfico de lectura del primario. *(S06)*
- Al evaluar este patrón: **qué servicios incluyen replicación**, y **costo adicional + administración** que agregan. *(S06)*

### Patrón 2 — Búfer (buffering)
- Usar una **cola de mensajes como búfer** entre aplicaciones. *(S06)*
- **Amazon MQ** (Apache ActiveMQ / RabbitMQ) vs **Amazon SQS**: cuándo usar cada uno. *(S06)*
- Hay que conocer de las colas:
  - **Tipos** de cola y su **rendimiento y límites**
  - **Opciones de ordenamiento** de mensajes
  - **Tamaño de la carga** del mensaje
  - **Procesamiento por lotes**
  - **Frecuencias de sondeo** admitidas

### Patrón 3 — Caché
- **CloudFront** reduce latencia **cacheando los elementos solicitados con frecuencia cerca del usuario**. *(S06)*
- De CloudFront hay que saber:
  - El **TTL correcto** de los objetos cacheados
  - Cómo **comprimir automáticamente** ciertos tipos de objetos
  - Cómo usarlo junto con el **enrutamiento basado en latencia de Route 53**

> [!important] Caché de base de datos vs réplicas de lectura (la comparación que decide preguntas)
> - Una **caché de BD** solo devuelve resultados de consultas **ya producidas** → mejora el rendimiento **solo si el tráfico tiene muchas consultas duplicadas**.
> - La caché **almacena resultados de consultas** → es **mala opción con datos que cambian con frecuencia**.
> - Las **réplicas de lectura necesitan tiempo para ejecutar la consulta** → son **menos eficientes** que una caché.
> - Pueden hacer falta **varias réplicas** para igualar las **solicitudes por segundo de un solo nodo de caché en memoria** → **más costo y más recursos que administrar**.

### Refuerzo desde la práctica (P03) — Latencia con CloudFront

- CloudFront sirve los **cache hits** desde la **ubicación perimetral más cercana**; ahí está la mayor parte del ahorro de latencia. *(P03)*
- **TTL alto** = más tiempo en caché, **más hits**, entregas más cortas y **menos carga en el origen**. **TTL cero impide cachear**: todo se vuelve una recuperación de origen. *(P03)*
- **Reenviar todos los encabezados, cookies y query strings al origen evita el caché** y no mejora la latencia. *(P03)*
- En los **fallos de caché** la solicitud va al origen: **Route 53 con enrutamiento por latencia** elige el origen con mejor tiempo de respuesta, y **orígenes geográficamente más cercanos** reducen el tiempo de respuesta. *(P03)*
- **Price Class 100 no incluye ubicaciones perimetrales con cobertura global**: para una audiencia mundial es la opción equivocada. *(P03)*
- La latencia también puede venir de: **distancia contenido-usuario**, **alojamiento mal dimensionado**, **ancho de banda insuficiente** o **imágenes sin optimizar**. *(P03)*

### Elegir la base según el patrón de acceso
- Las preguntas evalúan seleccionar servicios que soporten **distintos patrones de acceso**. *(S06)*
- Identificar la base de datos **específica para el caso**: **DynamoDB** para **clave-valor**, **Amazon Neptune** para **grafos**. *(S06)*

### Cómo se resuelve en el examen
- Si piden **escalar con la demanda y bajar cuando cae** → escalado **horizontal + elástico**, no "una instancia más grande". *(S06)*
- Si piden **rendimiento al menor costo** → **right-sizing** guiado por métricas de monitoreo. *(S06)*
- Si piden **latencia global de lectura** → **réplica** (DynamoDB global tables / read replicas). *(S06)*
- Si piden **absorber picos entre productor y consumidor** → **búfer** con cola (SQS, o Amazon MQ si ya existe ActiveMQ/RabbitMQ). *(S06)*
- Si piden **contenido repetido cerca del usuario** → **CloudFront** con TTL y compresión. *(S06)*
- Si el tráfico tiene **consultas duplicadas sobre datos estables** → **caché** gana a réplicas. *(S06)*
- Si los datos **cambian todo el tiempo** → **no** caché de resultados. *(S06)*
- Si el patrón es **clave-valor o grafo** → **DynamoDB / Neptune**, no una base relacional "por comodidad". *(S06)*

### Trampas y errores comunes
- ❌ "Escalar" = agrandar la instancia. → ✅ el video pide escalado **horizontal**, y también **hacia abajo**.
- ❌ Cachear datos que cambian seguido. → ✅ resultados obsoletos.
- ❌ Usar caché cuando cada consulta es distinta. → ✅ sin duplicados no hay beneficio.
- ❌ Comparar una caché con **una** réplica sin mirar RPS. → ✅ un nodo de caché puede rendir más que varias réplicas.
- ❌ Elegir Amazon MQ "porque es administrado" cuando no hay broker heredado. → ✅ SQS es la opción nativa.
- ❌ Olvidar el **costo y la administración** que agregan las réplicas. *(S06)*
- ❌ Poner **TTL en cero** "para que siempre esté actualizado". → ✅ anula el caché y **empeora** la latencia. *(P03)*
- ❌ Mirar solo los **cache hits**. → ✅ el **fallo de caché** se resuelve con orígenes cercanos + Route 53 por latencia. *(P03)*
- ❌ Bajar la **Price Class** teniendo audiencia global. → ✅ reduce las ubicaciones perimetrales disponibles. *(P03)*

### Preguntas de repaso
1. ¿Cuándo conviene caché de BD y cuándo réplicas de lectura?
   <details><summary>Respuesta</summary>Caché si hay muchas consultas duplicadas sobre datos estables; réplicas si necesitás ejecutar consultas variadas y distribuir carga, asumiendo latencia y costo mayores.</details>
2. ¿Por qué una caché puede ser incorrecta con datos que cambian frecuentemente?
   <details><summary>Respuesta</summary>Porque almacena resultados de consultas y quedarían desactualizados.</details>
3. ¿Qué tres patrones de diseño cubre la tarea 2.5?
   <details><summary>Respuesta</summary>Réplica, búfer (colas) y caché.</details>
4. ¿Qué dos decisiones hay que tomar sobre el volumen de una instancia EC2?
   <details><summary>Respuesta</summary>El tipo (velocidad y solidez de datos) y el tamaño.</details>
5. ¿Qué base elegís para clave-valor y para grafos?
   <details><summary>Respuesta</summary>DynamoDB y Amazon Neptune.</details>

### Dudas resueltas en esta sesión
- Ninguna (queda la duda #4 abierta: familias EC2).

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S05 — Tarea 2.4: diseñar una estrategia para cumplir los requisitos de fiabilidad]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.5 Diseñar una solución para cumplir con los objetivos de rendimiento.md`
- Servicios → [[Definicion servicios]]

---

## S07 — Tarea 2.6: estrategia de optimización de costos para cumplir las metas

> [!info] Ficha
> - **Fuente:** video de la tarea 2.6 · **Dominio:** D2 (29 %) · **Tarea:** 2.6
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> Costos = **elegir el modelo de precio correcto + dimensionar bien + controlar y medir**; siempre equilibrando con rendimiento y fiabilidad, no recortando a ciegas.

### Base
- Se ajusta al **pilar de optimización de costos**, con foco en: **conocimiento de gastos y uso** y **recursos rentables**. *(S07)*
- Hay que **equilibrar costos con rendimiento y fiabilidad** → profundizar en esos dos pilares. *(S07)*
- El examen evalúa **costos de los servicios de AWS** y cómo incluir **controles de costos y supervisión** en soluciones nuevas. *(S07)*
- Se espera: **seleccionar y dimensionar** la infraestructura, e **identificar el mejor modelo de precios o combinación**. *(S07)*

### Modelos de precios

| Situación de uso | Modelo |
| --- | --- |
| Uso **desconocido** o **intermitente** | **On-Demand** o **Spot** |
| Uso **esperado y persistente** por **1 o 3 años** | **Savings Plans** de cómputo |
| Uso **predecible y persistente de base de datos** | **Instancias reservadas** |

**Tipos de Savings Plans**

| Plan | Cubre |
| --- | --- |
| **EC2 Instance Savings Plans** | Instancias EC2 |
| **Compute Savings Plans** | **EC2, AWS Lambda y AWS Fargate** |
| **SageMaker Savings Plans** | Instancias de **machine learning de SageMaker** |

- **Instancias reservadas** disponibles para: **Amazon RDS, Amazon Redshift, Amazon ElastiCache y Amazon OpenSearch Service**. *(S07)*

### Almacenamiento
- **Amazon S3**:
  - Elegir la **clase de almacenamiento más rentable** según **capacidad** y **patrón de acceso**.
  - Identificar la **política de ciclo de vida** correcta que **mueve objetos entre clases** a medida que cambia el uso.
  - Entender cómo afectan al costo total: **recuperación**, **control de versiones** y **replicación de datos**.
- **Amazon EBS**: dos preguntas de diseño que el examen usa seguido:
  1. Si la solución **termina instancias EC2**, ¿**también elimina el volumen EBS**?
  2. Si crea **instantáneas EBS**, ¿**archiva o elimina las más antiguas**?

### Administrado vs autogestionado
- Determinar **cuándo un servicio administrado ahorra más** que una opción propia. *(S07)*
- Ejemplo del video: **Cognito** para autenticar usuarios en lugar de construir tu propia herramienta → ahorra **desarrollo, alojamiento y mantenimiento**. *(S07)*

### Transferencia de datos
- El costo depende de **origen, destino y cantidad de tráfico**. *(S07)*

**Entre AWS y centros de datos en las instalaciones** (puede ser combinación de):

| Opción | Qué se cobra |
| --- | --- |
| **VPN de sitio a sitio** | **Cargo horario de la conexión** + costo de transferencia |
| **AWS Direct Connect** | **Cargo horario del puerto** + costo de transferencia |
| **Transit Gateway** | **Número de adjuntos** (*attachments*) + costo de transferencia |

**Dentro de las cargas de trabajo**
- Para **evitar costos de enrutar por internet**, conectarse a servicios y cargas en **otras regiones** **desde AWS** usando **VPC endpoints**. *(S07)*
- **Dentro de una misma AZ la transferencia es gratuita**; **entre AZs puede no serlo**. *(S07)*

> [!example] El par de ejemplos que hay que memorizar
> - **RDS Multi-AZ:** la **sincronización entre las dos instancias** en AZ separadas **no genera cargo**.
> - **EC2 entre AZs:** la transferencia de **entrada y salida entre dos instancias EC2** en esas mismas AZs **sí genera cargos**.

### Controles y visibilidad de costos

**Controles**
- **Estrategias de etiquetado de recursos** (*tagging*). *(S07)*
- **Políticas de IAM que restringen la creación de recursos nuevos**. *(S07)*

**Herramientas de visibilidad y uso**

| Herramienta | Para qué |
| --- | --- |
| **AWS Pricing Calculator** | **Estimar** el precio de una solución **antes de desarrollarla** |
| **Cost Explorer** | Profundizar en **datos de costos agregados** por servicio, etc. |
| **Trusted Advisor** | **Comprueba la infraestructura** y hace **recomendaciones**, incluidas optimizaciones de costos |
| **Alarmas de CloudWatch** | Reaccionar a **cambios en las verificaciones de Trusted Advisor** (recursos actualizados, cuota de servicio alcanzada) |

### Cómo se resuelve en el examen
- Uso **intermitente o incierto** → **On-Demand / Spot**; **1 o 3 años persistentes** → **Savings Plans**; **BD persistente** → **reservadas**. *(S07)*
- Si piden **estimar antes de construir** → **Pricing Calculator**. Si piden **analizar lo ya gastado** → **Cost Explorer**. Si piden **recomendaciones y buenas prácticas** → **Trusted Advisor**. *(S07)*
- Si piden **atacar el gasto de almacenamiento que cambia en el tiempo** → **lifecycle policy** entre clases de S3. *(S07)*
- Si piden **reducir transferencia entre regiones** → **VPC endpoints** en lugar de internet. *(S07)*
- Si piden **gobernar quién puede crear recursos** → **políticas de IAM** + **tagging**. *(S07)*
- Si el escenario pide **reemplazar desarrollo propio por servicio administrado** → evaluar **Cognito** y similares por costo total. *(S07)*

### Trampas y errores comunes
- ❌ Comprar **reservas** con uso intermitente. → ✅ On-Demand/Spot.
- ❌ Confundir **Compute Savings Plans** con **EC2 Instance Savings Plans** (el primero cubre también **Lambda y Fargate**).
- ❌ Creer que **toda** transferencia entre AZs es gratis. → ✅ **RDS Multi-AZ no cobra** la sincronización; **EC2 entre AZs sí cobra**.
- ❌ Terminar instancias EC2 y olvidar los **volúmenes EBS** y las **snapshots viejas**. *(S07)*
- ❌ Optimizar costo sacrificando el **RTO/RPO** o el rendimiento pedido. → ✅ el video pide **equilibrar**. *(S07)*
- ❌ Usar internet para hablar entre regiones cuando ya estás en AWS. → ✅ VPC endpoints.

### Preguntas de repaso
1. ¿Qué modelo elegís para una carga intermitente y para una que corre 3 años seguidos?
   <details><summary>Respuesta</summary>Intermitente: On-Demand o Spot. Persistente 1–3 años: Savings Plans (o reservadas si es base de datos).</details>
2. ¿Qué cubre un Compute Savings Plan que no cubre uno de instancias EC2?
   <details><summary>Respuesta</summary>También Lambda y Fargate, además de EC2.</details>
3. ¿Qué servicios ofrecen instancias reservadas según el video?
   <details><summary>Respuesta</summary>Amazon RDS, Amazon Redshift, Amazon ElastiCache y Amazon OpenSearch Service.</details>
4. ¿La sincronización Multi-AZ de RDS genera costo de transferencia? ¿Y el tráfico EC2 entre AZs?
   <details><summary>Respuesta</summary>RDS Multi-AZ no genera cargo por esa sincronización; el tráfico entre instancias EC2 en AZs distintas sí.</details>
5. ¿Qué herramienta estima antes de construir y cuál recomienda sobre lo existente?
   <details><summary>Respuesta</summary>Pricing Calculator para estimar; Trusted Advisor para comprobaciones y recomendaciones (Cost Explorer es para analizar el gasto).</details>

### Dudas resueltas en esta sesión
- Ninguna (queda la duda #5 abierta: clases de S3).

### Enlaces
- Panorama del dominio → [[#S01 — Dominio 2: panorama general (presentación del módulo)]]
- Tarea anterior → [[#S06 — Tarea 2.5: diseñar una solución para cumplir los objetivos de rendimiento]]
- Nota de tarea → `02 - Dominio 2 - Nuevas Soluciones/2.6 Determinar una estrategia de optimización de costos para cumplir las metas y objetivos de la solución.md`
- Servicios → [[Definicion servicios]]

---

## 🧠 Núcleo de conceptos (crece con cada sesión)

> [!info] Para qué sirve esta sección
> Es el "un solo lugar" para lo que hay que tener en la cabeza el día del examen.
> Cada sesión aporta filas acá **además** de su sección propia, para no tener que releer
> 20 resúmenes cuando falten dos días.

### Decisiones de arquitectura

> Formato: **Si el escenario pide…** → **entonces la respuesta es…** · *(origen)*

| Si el escenario pide… | Entonces… | Origen |
| --- | --- | --- |
| Recuperarse **después** de un desastre, conmutar por error, detectar fallos | Tarea **2.2 — continuidad de actividades** (DR, alta disponibilidad, failover) | S01 |
| **Evitar** la interrupción y mantener la estabilidad (desacoplar, escalar, failover de recursos) | Tarea **2.4 — fiabilidad** | S01 |
| Implementar o actualizar sin romper (aprobaciones, ventanas, canarios) | Tarea **2.1 — estrategia de implementación** (administración de cambios) | S01 |
| Cumplir rendimiento **sin** disparar el costo ni el mantenimiento | Tarea **2.5** — el examen suele pedir el equilibrio, no la máxima potencia | S01 (heurística, validar con las 3 preguntas de ejemplo) |
| Actualizar producción **sin downtime** y poder volver atrás | **Pila nueva** (inmutable) + **conjunto de cambios** + mover el tráfico a la pila nueva | S02 |
| **Retener** datos/recurso al eliminar una pila | **`DeletionPolicy`** (retener el recurso) | S02 |
| Desplegar la misma infraestructura en **muchas cuentas y regiones** | **StackSets** (compartidos entre cuentas y regiones) | S02 |
| **Patchar** y configurar una flota de servidores de forma continua | **AWS Systems Manager** (+ agente de SSM instalado) | S02 |
| Automatizar **build → test → deploy** de una aplicación | **CodePipeline** orquesta, **CodeBuild** construye/prueba, **CodeDeploy** despliega y mueve tráfico | S02 |
| Delegar el **entrenamiento y despliegue de modelos de ML** | **Amazon SageMaker** (extremo a extremo) | S02 |
| **Caída de región completa** con RTO/RPO declarados | Elegir la estrategia de DR de la escalera que cumpla ambos; no la más barata si el RTO es agresivo | S03 |
| **RTO de minutos** y el costo no es la restricción | **Multisitio / activo-activo** | S03 |
| **Lo más rentable**, tolerando RPO y RTO largos | **Respaldo y restauración** | S03 |
| **Replicar servidores completos** y poder **probar la recuperación** | **AWS Elastic Disaster Recovery** (replicación continua + pruebas en la región de recuperación) | S03 |
| **Redirigir el tráfico rápido** durante un failover de región | **Route 53**: health checks + método de enrutamiento de failover + **TTL bajo** | S03 |
| **Detectar la interrupción y responder solo** | **Alarma de CloudWatch → EventBridge → Lambda / SNS** | S03 |
| El enunciado fija un **RPO** exigente | Ajustar la **frecuencia de replicación** (backups, DataSync, Storage Gateway): el RPO no puede ser menor que el intervalo entre copias | S03 |
| Piden **detectar amenazas** | **GuardDuty** | S04 |
| Piden **cumplimiento agregado + remediación automática** | **Security Hub** | S04 |
| Piden **bloquear ataques web o bots** | **AWS WAF** | S04 |
| Piden **mitigar DDoS** | **AWS Shield** | S04 |
| Piden **privilegios mínimos y credenciales temporales** | Roles de IAM (no usuarios con claves de largo plazo) | S04 |
| Piden **rotar credenciales** y controlar el acceso a secretos | **Secrets Manager** | S04 |
| Piden **auditar o forzar** una configuración (ej.: solo AMIs aprobadas) | **AWS Config** (reglas + acciones correctivas + histórico) | S04 |
| Exigen **crear y almacenar las propias claves** | **AWS CloudHSM**; si no, **KMS** | S04 |
| Piden **cifrado en tránsito sin salir a internet** | **VPC endpoints / AWS PrivateLink** | S04 |
| Piden **certificados TLS** públicos o privados | **AWS Certificate Manager** | S04 |
| Hay que **autenticar y procesar solicitudes de API** | **API Gateway** + **Cognito** + Lambda proxy + DynamoDB | S04 |
| Un fallo **no debe propagarse** al resto del sistema | **Desacople**: ALB / API Gateway (sincrónico) o SQS / SNS (asincrónico) | S05 |
| **Absorber un pico de demanda** manteniendo estabilidad | Auto Scaling con la **métrica y alarma** correctas; revisar **cuotas** antes | S05 |
| **Latencia mínima** para usuarios en varias geografías | Route 53 por **latencia** o **geolocalización**, o **Global Accelerator** | S05 |
| **Descargar lecturas** de la base de datos | **Réplicas de lectura** o **ElastiCache**; la standby Multi-AZ **no** lee | S05 |
| Datos **duplicados en otra región** | **S3 Cross-Region Replication** | S05 |
| **Archivos compartidos Multi-AZ** y desacoplados del cómputo | **Amazon EFS** o **Amazon FSx** | S05 |
| Escalar **contenedores** o una **tabla NoSQL** | ECS: **recuento de tareas** · DynamoDB: **rendimiento aprovisionado** | S05 |
| **Escalar al subir la demanda y bajar al caer** | Escalado **horizontal y elástico**, con controles por **cómputo, almacenamiento, BD y red** | S06 |
| **Rendimiento al menor costo** | **Right-sizing** guiado por métricas de monitoreo (detecta sobre/subutilización) | S06 |
| **Latencia global de lectura** | Patrón **réplica**: DynamoDB global tables, réplicas de lectura | S06 |
| **Picos entre productor y consumidor** | Patrón **búfer**: cola (**SQS**, o **Amazon MQ** si ya hay ActiveMQ/RabbitMQ) | S06 |
| **Contenido repetido cerca del usuario** | **CloudFront** con TTL y compresión, junto a Route 53 por latencia | S06 |
| **Consultas duplicadas sobre datos estables** | **Caché de BD** (mejor que réplicas); con datos cambiantes, **no** cachear | S06 |
| **Patrón de acceso clave-valor o grafo** | Base específica: **DynamoDB** / **Neptune** | S06 |
| Carga de **cómputo de alto rendimiento (HPC)** | Evaluar **Elastic Fabric Adapter** + volumen adecuado | S06 |
| Mandar **solo sesiones nuevas** a una versión beta detrás de CloudFront | **Lambda@Edge** en CloudFront leyendo **cookies** (no ponderado de Route 53) | P01 |
| Replicar un **bucket completo** (histórico + nuevo) a otra región | **S3 Batch Replication** para lo existente + **replicación de S3** para lo nuevo | P02 |
| **Latencia mínima** global con CloudFront | **TTL alto** + **orígenes cercanos con Route 53 por latencia**; no bajar la Price Class | P03 |
| Uso **intermitente o desconocido** | **On-Demand** o **Spot** | S07 |
| Uso persistente **1 o 3 años** | **Savings Plans** (EC2 / Compute / SageMaker) | S07 |
| Uso **predecible de base de datos** o almacén | **Instancias reservadas** (RDS, Redshift, ElastiCache, OpenSearch) | S07 |
| El patrón de acceso al **almacenamiento** cambia con el tiempo | **Política de ciclo de vida** entre clases de S3 | S07 |
| Terminás instancias **EC2** | Verificar **eliminación del volumen EBS** y de **snapshots viejas** | S07 |
| Necesitás **estimar antes de construir** | **AWS Pricing Calculator** | S07 |
| Necesitás **analizar el gasto real** | **Cost Explorer** | S07 |
| Necesitás **recomendaciones y comprobaciones** | **Trusted Advisor** (+ alarma de CloudWatch sobre sus verificaciones) | S07 |
| Querés **evitar transferencia por internet** entre regiones | **VPC endpoints** | S07 |
| Querés **gobernar la creación de recursos** | **Tagging** + **políticas de IAM** restrictivas | S07 |

### Distinciones entre servicios parecidos

> El examen no pregunta "¿qué hace X?", pregunta *"¿X o Y?"*. Esta tabla es la que decide.

| Par / grupo de servicios | Criterio que decide | Origen |
| --- | --- | --- |
| **Continuidad de actividades (2.2)** vs **Fiabilidad (2.4)** | 2.2 = reactivo, *"ya se cayó, cómo vuelvo"*. 2.4 = preventivo, *"cómo hago que no se caiga"* | S01 |
| **CloudFormation** vs **AWS CDK** | CFN = plantillas declarativas (IaC); CDK = definís la infraestructura con un lenguaje de programación y se integra con CFN | S02 |
| **Pilas anidadas** vs **StackSets** | Anidadas = reutilizar y componer plantillas dentro de una pila; StackSets = desplegar en **varias cuentas y regiones** | S02 |
| **Conjunto de cambios** vs **actualizar directo** | El change set **previsualiza** el impacto antes de ejecutar; el video lo lista como práctica recomendada | S02 |
| **Infraestructura inmutable** vs **cambio en el lugar** | Inmutable = pila nueva + mover tráfico (permitido en producción); in-place = prohibido en producción | S02 |
| **Systems Manager** vs **Secrets Manager** | SSM = parches, software y configuración (Run Command, agente SSM); Secrets Manager = contraseñas de cuentas de servicio y de Amazon RDS | S02 |
| **CodePipeline / CodeBuild / CodeDeploy / CodeCommit** | Pipeline = orquesta; Build = compila y prueba; Deploy = despliega y dirige tráfico; Commit = repositorio de origen | S02 |
| **CodeDeploy** vs **CodePipeline** | Se confunden: CodeDeploy **despliega en el cómputo** (EC2, Lambda, Fargate); CodePipeline **orquesta la canalización** | S02 |
| **RTO** vs **RPO** | RTO = **tiempo** de inactividad tolerable; RPO = **datos** que puedo perder, expresados en tiempo | S03 |
| **Multisitio (activo-activo)** vs **espera semiactiva (warm standby)** | Multisitio = ambos sitios sirviendo carga; warm standby = entorno de espera montado, más barato y algo más lento | S03 |
| **Espera semiactiva** vs **luz piloto** | Warm standby mantiene el entorno listo para tomar carga; luz piloto solo lo mínimo encendido y escala al recuperar | S03 |
| **Multi-AZ (instancia)** vs **clúster Multi-AZ** vs **réplica de lectura** | Los tres replican, pero difieren en disponibilidad y lectura; la **réplica de lectura** escala lectura y se puede promover | S03 |
| **DataSync** vs **Storage Gateway** | Depende de qué replicás: **archivos** (DataSync) vs **volúmenes o cintas** (Storage Gateway); la frecuencia de las tareas programadas define el RPO | S03 |
| **CloudWatch** vs **EventBridge** | CloudWatch **detecta** (estado + alarma); EventBridge **automatiza** la respuesta (Lambda/SNS) | S03 |
| **Health check de Route 53** vs **balanceador de carga** | Route 53 decide **a qué región/sitio** mandar el DNS; el balanceador distribuye **dentro** del entorno | S03 |
| **GuardDuty** vs **Security Hub** | GuardDuty **detecta amenazas**; Security Hub **agrega comprobaciones**, prioriza y soporta **remediación automática** | S04 |
| **WAF** vs **Shield** | WAF = capa de aplicación (vulnerabilidades web, bots); Shield = **DDoS** | S04 |
| **KMS** vs **CloudHSM** | KMS = claves gestionadas (crear, almacenar, rotar); CloudHSM = **tus propias claves** | S04 |
| **CloudTrail** vs **AWS Config** | CloudTrail = **quién hizo qué** (llamadas y uso de claves); Config = **en qué estado está** el recurso y si cumple la regla | S04 |
| **Secrets Manager** vs **AWS Config** | Secrets Manager **rota** credenciales; Config **audita y corrige** configuraciones | S04 |
| **Punto de enlace de interfaz** vs **punto de enlace de puerta de enlace** | Son configuraciones distintas (el video lo remarca sin detallar); en ambos casos el objetivo es no exponer el tráfico a internet | S04 |
| **Patch Manager** vs **AMI nueva** | Patch Manager parchea **in situ**; la AMI actualizada se despliega **como servidor nuevo** (inmutable) | S02 · S04 |
| **Grupo de seguridad** vs **NACL** | Ambos son capas de la defensa en profundidad; el video pide identificar la configuración correcta de cada una en el diseño | S04 |
| **Desacople sincrónico** vs **asincrónico** | Sincrónico = el llamador espera (ALB, API Gateway); asincrónico = cola/tema en medio (SQS con sondeo, SNS fan-out) | S05 |
| **SQS** vs **SNS** | SQS = **cola** que el consumidor sondea; SNS = **tema** que distribuye a varios suscriptores | S05 |
| **ALB** vs **API Gateway** | Ambos desacoplan de forma sincrónica: ALB reparte tráfico a **EC2**; API Gateway enruta llamadas entre **funciones Lambda** | S05 |
| **Standby Multi-AZ** vs **réplica de lectura** | La standby **no acepta lecturas**; la réplica sí escala lectura (y se puede promover, con RTO mayor) | S03 · S05 |
| **S3 CRR** vs **Global Accelerator** | CRR **duplica** los objetos en otra región; Global Accelerator **acelera el acceso** a esos datos replicados | S05 |
| **Route 53 latencia / geolocalización / failover** | Latencia = al destino más rápido; geolocalización = según ubicación del usuario; failover = al secundario si el primario falla | S05 |
| **Almacenamiento de archivos** vs **almacenamiento atado al cómputo** | EFS/FSx dan acceso Multi-AZ y **sobreviven** a la caída del cómputo | S05 |
| **Caché de BD** vs **réplicas de lectura** | Caché = solo consultas ya ejecutadas (sirve con **consultas duplicadas** y datos estables); réplicas = ejecutan consultas, **más lentas** y hace falta **varias** para igualar un nodo de caché | S06 |
| **SQS** vs **Amazon MQ** | SQS = cola nativa de AWS; Amazon MQ = broker **ActiveMQ/RabbitMQ** cuando ya existe ese ecosistema | S05 · S06 |
| **CloudFront** vs **Route 53 por latencia** | CloudFront **cachea** el objeto cerca del usuario; Route 53 solo **enruta** al destino más rápido | S06 |
| **Patrón réplica** vs **búfer** vs **caché** | Réplica = más copias para latencia/carga; búfer = cola que absorbe el desacople temporal; caché = resultados ya calculados | S06 |
| **Escalado horizontal** vs **vertical** | Horizontal = más instancias/tareas (y bajar al caer la demanda); vertical = una más grande, que el video no propone | S06 |
| **DynamoDB** vs **Neptune** | DynamoDB = clave-valor; Neptune = grafos. La base se elige por **patrón de acceso** | S06 |
| **Serverless** vs **aprovisionado** | Serverless reduce **sobrecarga de mantenimiento**, con su propio compromiso de costo | S06 |
| **On-Demand** vs **Spot** vs **Savings Plans** vs **Reservadas** | Intermitente/incierto → On-Demand/Spot; persistente 1–3 años → Savings Plans; BD predecible → reservadas | S07 |
| **Compute Savings Plan** vs **EC2 Instance Savings Plan** vs **SageMaker** | Compute cubre EC2 **+ Lambda + Fargate**; el de instancias solo EC2; el de SageMaker solo instancias ML | S07 |
| **Cost Explorer** vs **Pricing Calculator** vs **Trusted Advisor** | Analizar lo gastado vs estimar antes de construir vs recomendar sobre la infraestructura existente | S07 |
| **Transferencia intra-AZ** vs **entre AZs** | Intra-AZ gratuita; entre AZs puede cobrarse. Excepción del video: **sincronización RDS Multi-AZ sin cargo**, **EC2 entre AZs con cargo** | S07 |
| **VPN sitio a sitio** vs **Direct Connect** vs **Transit Gateway** | Los tres cobran además transferencia: VPN = hora de conexión; DX = hora de puerto; TGW = **número de adjuntos** | S07 |
| **Administrado** vs **autogestionado** | El administrado (ej.: **Cognito** para auth) puede ahorrar desarrollo, alojamiento y mantenimiento | S07 |
| **Controles de costo** vs **visibilidad de costo** | Controles = tagging + políticas de IAM; visibilidad = Pricing Calculator, Cost Explorer, Trusted Advisor | S07 |
| **Lambda@Edge** vs **Route 53 ponderado** | Lambda@Edge decide **por sesión** en el borde (lee cookies); el ponderado reparte un **porcentaje fijo** sin saber si la sesión es nueva | S02 · P01 |
| **S3 Replication** vs **S3 Batch Replication** | Replication copia **solo objetos nuevos** desde que se habilita; Batch Replication copia los **existentes** (y los que fallaron) | S03 · P02 |
| **TTL alto** vs **TTL cero** en CloudFront | Alto = más hits y entregas cortas; cero = **nada se cachea**, todo va al origen | S06 · P03 |
| **Price Class 100** vs cobertura global | La clase 100 **no incluye** ubicaciones perimetrales de cobertura mundial | P03 |
| **Reenviar todo al origen** vs **cachear** | Reenviar encabezados, cookies y query strings **anula el caché** | P03 |

### Límites, cuotas y valores numéricos

> Todo número que aparezca en una sesión va acá, tal cual se dijo.

| Valor | A qué aplica | Origen |
| --- | --- | --- |
| **29 %** | Peso del Dominio 2 en el examen SAP-C02 | [[Guia AWS]] / S01 |
| **6** | Enunciados de tarea del Dominio 2 (un video por tarea) | S01 |
| **3** | Preguntas de ejemplo explicadas al final del módulo | S01 |
| **RPO 24 h · RTO 1 h** | Caso Redshift con caída de región completa (ejemplo del video) | S03 |
| **1 o 3 años** | Plazos de compromiso de los **Savings Plans** (uso persistente esperado) | S07 |

### Reglas de dedo para el examen

- **Primero clasificá la tarea, después el servicio.** En D2 casi todas las trampas son de "tarea equivocada" (DR vs fiabilidad, costo vs rendimiento), no de servicio desconocido. *(S01)*
- **Si la opción gana en rendimiento pero pierde en costo o mantenimiento, probablemente no es la respuesta** en 2.5. *(S01, heurística)*
- **Anotá lo que te falta mientras mirás el video.** El propio instructor lo pide: el resumen sirve para planificar el estudio posterior. *(S01)*
- **Si la opción toca producción "en el lugar", descartala.** En 2.1 la respuesta casi siempre construye algo nuevo y mueve el tráfico. *(S02)*
- **Preferí lo administrado cuando pidan "reducir gastos generales de parches".** La pregunta suele medir cuánto trabajo operativo delegás, no cuán potente es el servicio. *(S02)*
- **En 2.2, leé RTO y RPO antes que los servicios.** Esos dos números descartan opciones solos. *(S03)*
- **Más velocidad de recuperación = más costo.** Si la opción barata no llega al RTO pedido, está mal aunque sea "rentable". *(S03)*
- **El RPO se cumple con frecuencia de replicación, no con intención.** Backup diario ⇒ RPO mínimo de 24 h. *(S03)*
- **En 2.3, leé el requisito literal**: quién accede, a qué dato, en reposo o en tránsito, y en qué capa. Elegir "el servicio de seguridad más famoso" es la forma habitual de fallar. *(S04)*
- **Verbos que deciden:** "detectar" → GuardDuty · "agregar/cumplir" → Security Hub · "bloquear web" → WAF · "DDoS" → Shield · "rotar" → Secrets Manager · "auditar/corregir" → Config. *(S04)*
- **2.4 vs 2.2 se distingue por el verbo:** *"prevenir / aislar / no propagar"* → 2.4; *"recuperar / volver / conmutar"* → 2.2. *(S05)*
- **Si el problema es lectura, la standby Multi-AZ no es la respuesta.** Réplicas o caché. *(S05)*
- **Ninguna acción de escalado es válida sin chequear cuotas y límites** (recursos aprovisionables y tasa de API). *(S05)*
- **El patrón se elige por la forma del tráfico, no por moda:** réplica si falta cercanía/carga, búfer si hay picos, caché si hay **consultas duplicadas**. *(S06)*
- **Si el enunciado pide "cumplir rendimiento al menor costo/mantenimiento", la opción más potente suele estar mal.** *(S06)*
- **Caché solo con datos estables:** si el dato cambia seguido, la caché devuelve basura. *(S06)*
- **Si el enunciado dice "Elija DOS", buscá las dos mitades del problema:** hits y misses, existente y nuevo, sesión nueva y en curso. *(P01 · P02 · P03)*
- **"Menor esfuerzo operativo" descarta soluciones con limpieza posterior:** si al terminar la prueba hay que desarmar algo, no es la respuesta. *(P01)*
- **El modelo de precio se elige por el uso, no por el descuento:** intermitente → On-Demand/Spot; persistente 1–3 años → Savings Plans. *(S07)*
- **Antes de "ahorrar", mirá lo que queda prendido:** volúmenes EBS huérfanos y snapshots viejas son gasto invisible. *(S07)*
- **Entre AZs no todo es gratis:** la sincronización Multi-AZ de RDS no cobra; el tráfico EC2 entre AZs sí. *(S07)*

---

## ✅ Cobertura del examen

> Pesos oficiales según [[Guia AWS]]: D1 26 % · D2 29 % · D3 25 % · D4 20 % (temas emergentes sin puntaje).

| Dominio / tarea | Visto en | Confianza |
| --- | --- | --- |
| 1.1 Conectividad de redes | — | ⬜ |
| 1.2 Controles de seguridad | — | ⬜ |
| 1.3 Arquitecturas fiables y resistentes | — | ⬜ |
| 1.4 Entorno de AWS de varias cuentas | — | ⬜ |
| 1.5 Optimización de costos y visibilidad | — | ⬜ |
| 2.1 Estrategia de implementación | S01 (panorama) · S02 (contenido) | 🟡 |
| 2.2 Continuidad de actividades | S01 (panorama) · S03 (contenido) | 🟡 |
| 2.3 Controles de seguridad según requisitos | S01 (panorama) · S04 (contenido) | 🟡 |
| 2.4 Requisitos de fiabilidad | S01 (panorama) · S05 (contenido) | 🟡 |
| 2.5 Objetivos de rendimiento | S01 (panorama) · S06 (contenido) | 🟡 |
| 2.6 Optimización de costos de la solución | S01 (panorama) · S07 (contenido) | 🟡 |
| 3.1 Excelencia operativa | — | ⬜ |
| 3.2 Mejora de la seguridad | — | ⬜ |
| 3.3 Mejora del rendimiento | — | ⬜ |
| 3.4 Mejora de la fiabilidad | — | ⬜ |
| 3.5 Oportunidades de optimización de costos | — | ⬜ |
| 4.1 Selección de cargas a migrar | — | ⬜ |
| 4.2 Enfoque de migración óptimo | — | ⬜ |
| 4.3 Nueva arquitectura para cargas existentes | — | ⬜ |
| 4.4 Oportunidades de modernización | — | ⬜ |

Confianza: ⬜ sin ver · 🟠 visto una vez · 🟡 entendido · 🟢 puedo explicarlo y responder preguntas.

---

## ❓ Dudas abiertas

> Preguntas que surgieron en una sesión. La respuesta corta va **acá**; el desarrollo, en la sesión.
> Se cierran **solo** con una sesión o una fuente, nunca "porque suena lógico".

| # | Duda | Respuesta corta | Sesión | Estado |
| --- | --- | --- | --- | --- |
| 1 | Caso Redshift: caída de región completa, RPO 24 h y RTO 1 h. ¿Snapshots automáticos + snapshots entre regiones y cambio de DNS, o replicación entre regiones? | El video plantea las opciones pero **no cierra la respuesta**. Criterio a aplicar: el snapshot debe ocurrir al menos cada 24 h para cumplir el RPO, y los snapshots entre regiones son lo que permite reconstruir en la región de DR. Se cierra con las 3 preguntas de ejemplo del módulo. | S03 | ⏳ abierta |
| 2 | ¿Qué **capa OSI** ofrece cada servicio de seguridad de AWS? El video lo marca como requisito del examen pero no lo desarrolla. | Pendiente de completar en la nota de tarea 2.3. Lo que sí quedó fijado: **WAF** opera sobre HTTP/HTTPS (capa de aplicación) y **Shield** protege contra DDoS; **GuardDuty** detecta y **Security Hub** agrega. | S04 | ⏳ abierta |
| 3 | ¿Qué **motores de base de datos** admiten cada tipo de despliegue Multi-AZ en RDS (instancia, clúster, réplicas de lectura)? | El video lo exige como conocimiento pero **no lo lista**. Queda para la nota de tarea 2.4 / documentación de RDS. | S05 | ⏳ abierta |
| 4 | ¿**Familias de instancias EC2** y sus casos de uso? El video exige conocerlas pero no las enumera. | Pendiente en la nota de tarea 2.5. El criterio de right-sizing sí quedó fijado: tipo de volumen (velocidad + solidez) y tamaño, más EFA para HPC. | S06 | ⏳ abierta |
| 5 | ¿Qué **clases de almacenamiento de S3** existen y cuál conviene según capacidad y patrón de acceso? | El video exige elegir la más rentable y definir el **lifecycle** entre clases, pero **no las enumera**. Queda para la nota de tarea 2.6 / documentación de S3. | S07 | ⏳ abierta |

---

## 🕒 Registro de cambios

| Fecha | Cambio | Sesión |
| --- | --- | --- |
| 2026-10-21 | Creación de la estructura base del documento vivo (mapa, núcleo, cobertura, dudas, plantilla). | — |
| 2026-10-21 | **S01** cargada: panorama del Dominio 2 (6 tareas), distinción 2.2 vs 2.4, pesos y pendientes. Se agrega el protocolo de dudas dentro del md. | S01 |
| 2026-10-21 | **S02** cargada: tarea 2.1 completa (administración de cambios, infraestructura inmutable, CloudFormation/StackSets/DeletionPolicy, Systems Manager, CI/CD, SageMaker). 8 distinciones y 6 decisiones nuevas; 2.1 pasa a 🟡. | S02 |
| 2026-10-21 | **S03** cargada: tarea 2.2 (RTO/RPO, 4 estrategias de DR, caso Redshift, DRS, replicación RDS, DataSync/Storage Gateway, Route 53, CloudWatch/EventBridge). 8 distinciones y 7 decisiones nuevas; 2.2 pasa a 🟡; duda #1 registrada como ⏳. | S03 |
| 2026-10-21 | **S04** cargada: tarea 2.3 (GuardDuty, Security Hub, WAF, Shield, IAM y credenciales, Config, defensa en capas, endpoints, KMS/CloudHSM, TLS/ACM, API Gateway). 12 decisiones y 8 distinciones nuevas; 2.3 pasa a 🟡; duda #2 (capas OSI) registrada como ⏳. | S04 |
| 2026-10-21 | **S05** cargada: tarea 2.4 (desacople sync/async, auto scaling y cuotas, Multi-AZ, ElastiCache, S3 CRR, Global Accelerator, EFS/FSx). Se cierra el contraste 2.2 vs 2.4; 8 decisiones y 8 distinciones nuevas; 2.4 pasa a 🟡; duda #3 (motores RDS por tipo Multi-AZ) registrada como ⏳. | S05 |
| 2026-10-21 | **S06** cargada: tarea 2.5 (escalado horizontal, right-sizing, patrones réplica/búfer/caché, caché vs réplicas, bases por patrón de acceso). 9 decisiones y 8 distinciones nuevas; 2.5 pasa a 🟡; duda #4 (familias EC2) registrada como ⏳. | S06 |
| 2026-10-21 | **S07** cargada: tarea 2.6 (modelos de precios, Savings Plans/RI, S3 y EBS, transferencia de datos, tagging/IAM, Pricing Calculator/Cost Explorer/Trusted Advisor). 11 decisiones y 8 distinciones nuevas; 2.6 pasa a 🟡; duda #5 (clases S3) registrada como ⏳. **Dominio 2 completo en contenido.** | S07 |
| 2026-10-21 | **P01** integrada desde la práctica: refuerzo de Lambda@Edge en S02 (edge, cookies, límite de invocación desde el sitio), nueva distinción **Lambda@Edge vs Route 53 ponderado** y 2 trampas. | P01 |
| 2026-10-21 | **P02** integrada: refuerzo de replicación S3 en S03 (solo nuevos vs existentes), distinción **S3 Replication vs Batch Replication**, decisión y trampa de "configurar replicación no alcanza". | P02 |
| 2026-10-21 | **P03** integrada: refuerzo de latencia CloudFront en S06 (TTL, fallos de caché, Price Class), 3 distinciones nuevas, 1 decisión y 3 trampas. | P03 |

---

## 📋 Plantilla de sesión (no borrar)

> Se copia en orden ascendente (S01, S02…), justo después de [[#🗂️ Índice de sesiones]].
> Los campos vacíos se dejan así a propósito:
> un campo vacío es información ("no se dijo"), un campo inventado es un error de estudio.

```markdown
## Sxx — Título de la sesión

> [!info] Ficha
> - **Fuente:** video / laboratorio / evaluación · **Duración:** · **Dominio:** D_ · **Tarea:** _
> - **Estado:** 🟡 resumen cargado

### Resumen en una frase
> La idea que hay que poder decir sin mirar nada.

### Puntos clave
- **Concepto** — explicación en una línea. *(Sxx)*

### Servicios involucrados
| Servicio | Qué hace en este contexto | Distinción / trampa |
| --- | --- | --- |
| | | |

### Cómo se resuelve en el examen
- **Si piden …** → … (y por qué las otras opciones fallan).

### Números y límites mencionados
- …

### Trampas y errores comunes
- ❌ … → ✅ …

### Preguntas de repaso
1. …
   <details><summary>Respuesta</summary>…</details>

### Dudas resueltas en esta sesión
- **Duda:** … → **Respuesta corta:** … → **Estado:** ✅

### Enlaces
- Nota de tarea: [[ ]]
- Servicios: [[Definicion servicios]]
```

---

## 🔗 Navegación

- Guía oficial y pesos por dominio → [[Guia AWS]]
- Catálogo de servicios y distinciones → [[Definicion servicios]]
- Banco de preguntas → [[preguntas-v1-manual]]
- Notas por tarea: carpetas `01 - Dominio 1` … `04 - Dominio 4` (una nota por tarea del examen)
- Práctica oficial → [[Notas - Evaluacion 1 SB]]
- Banco de práctica del dominio → [[Domain 2 Practice]]
- Dominio siguiente → [[Domain 3 Review]]
