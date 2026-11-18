---
title: "Demo - AWS Security Hub"
aliases:
  - "Demo: AWS Security Hub"
  - "Demo Security Hub"
  - "Recorrido por la consola de Security Hub"
  - "Control Tower y el security score"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - demo
  - security-hub
  - compliance
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Demo - AWS Security Hub

> [!abstract] Qué es este archivo
> Séptima lección del módulo y **la primera demo**. Recorre la **consola de Security Hub** de punta a punta:
> el **security score**, los **estándares**, un **control fallido**, el **workflow status**, la **configuration
> timeline** de AWS Config y el salto al **recurso real** con *Manage Resource*.
>
> **No enseña conceptos nuevos**: enseña **dónde mirar**. Complementa a [[Security Hub]] con lo que solo se ve
> usando la consola. Video: **6 min 42 s**.

> [!quote] La idea que ordena todo
> **El hallazgo no es el final del camino: es el principio de una investigación.** La demo hace *click* en el
> finding, muestra **por qué falla**, **cuándo empezó a fallar** y **dónde se arregla**. Ese recorrido —finding →
> control → timeline → recurso— **es el flujo de trabajo real**.

---

## Resumen en una frase

> Un **score alto no significa trabajo hecho** (puede venir de **Control Tower**), y un **control fallido no
> significa error** (puede ser intencional): la consola da el **contexto para decidir**, no la orden de cambiar.

---

## 1. Qué muestra la demo

**El marco:** el instructor **profundiza en AWS Security Hub** retomando **los benchmarks** que ya había
mencionado. Es una recorrida **de consola**, no una clase teórica.

**Los cinco pasos del recorrido:**

| # | Paso | Qué muestra |
| --- | --- | --- |
| **1** | **Dashboard** | **Estándares** y **score**, con la aclaración de **Control Tower** |
| **2** | **Un estándar** | **AWS Foundational Security Best Practices**: **249 controles**, **224 pasados**, **17 fallidos** |
| **3** | **Un control fallido** | **VPC default security groups** que **no deberían permitir tráfico de entrada ni salida** |
| **4** | **El contexto** | **Workflow status**, **standards and requirements**, **remediation instructions**, **configuration timeline** |
| **5** | **El recurso** | ***Manage Resource*** → consola tipo EC2 → **reglas de entrada del security group** |

---

## 2. El score: primero, la advertencia

> *“Este security score, con toda honestidad, está un poco elevado o bueno o verde **porque también tenemos AWS
> Control Tower configurado y habilitado**.”*

> [!important] La frase más importante de la demo
> El **score verde no es mérito del equipo**: es **consecuencia de los guardrails de Control Tower**. Si el
> arquitecto no lo sabe, **lee un número que no significa lo que cree**.

> [!warning] La trampa que se desprende
> “Tenemos 90 de score, estamos bien”. **No**: el score mide **cuántos controles pasan**, y muchos pasan **porque
> Control Tower los impuso al crear las cuentas**. **El score heredado no es postura propia**.

---

## 3. Los estándares que se ven

**La fuente nombra tres marcos en pantalla:**

| Marco | Para qué se usa en la demo |
| --- | --- |
| **NIST SP 800-53** | Uno de los estándares que se pueden seguir |
| **PCI** (workload) | Otro marco; se pueden ver **scores específicos** por servicio o por **workload en ejecución** |
| **AWS Foundational Security Best Practices** | **El que se abre** para el recorrido |

> [!note] Lectura propia (no está en la fuente)
> La frase clave del instructor es **“se puede ver el score específico por servicio o por workload”**. Eso
> significa que **el mismo entorno tiene varios scores simultáneos**, uno por marco. **No hay “el score de la
> cuenta”**: hay **un score por estándar**. Y un hallazgo puede **fallar en uno y no en otro**.

**El detalle operativo:** *“siempre podés buscar cualquier servicio en la consola escribiendo el nombre del
servicio o algo similar a lo que recordás que es”*.

---

## 4. Los números del estándar (y el problema que tienen)

**Lo que dice el instructor, literal:**

| Dato | Valor |
| --- | --- |
| **Controles totales** | **249** |
| **Pasados** | **224** |
| **Fallidos** | **17** |
| **“Sin hacer nada”** | Los **224** pasan **por Control Tower** y sus **guardrails iniciales** |

> [!warning] Los números no cierran
> **224 + 17 = 241**, no **249**. Faltan **8 controles** que la fuente **no explica** (podrían estar en otro
> estado: sin datos, no aplicables, en curso). **Se registra la discrepancia y no se rellena el hueco.** En la
> consola real esos estados existen; **la demo no los muestra ni los nombra**.

> [!important] La lección de método
> El propio instructor dice que **empieza por el estándar de score alto** *“porque es menos trabajo el que
> tenemos que hacer”*. Es una decisión **legítima y práctica**: primero se ataca **lo que está peor**, no lo que
> es más fácil de leer.

**El filtro que usa:** por **severidad** —**low**, **medium**, **high**—, y vuelve a **high** para trabajar.

---

## 5. El control fallido: el caso concreto

**El control:** **“VPC default security groups should not allow inbound or outbound traffic”**. Es decir: **los
security groups por defecto de una VPC no deberían permitir tráfico ni de entrada ni de salida**.

**Detalles que se ven en pantalla:**

| Dato | Valor |
| --- | --- |
| **Checks específicos** | **Dos** |
| **Última actualización** | **hace unas 21 horas** |
| **Frecuencia de los checks** | **Automáticos, al menos una vez cada 24 horas** |
| **Alcance** | **Regiones enlazadas**: **no solo una Region**; se **agrega y enlaza entre otras cuentas y otras Regions** |
| **Region del instructor** | **Northern Virginia / US East 1** |

> [!important] “Al menos una vez cada 24 horas”
> Es el dato que hay que llevarse. **Security Hub no es tiempo real**: es **evaluación periódica**. Y la
> **agregación multi-Region y multi-cuenta** significa que **el hallazgo que ves puede venir de otra Region**.

> [!note] Lectura propia (no está en la fuente)
> La **latencia de 24 horas** es la diferencia con **GuardDuty**, que **sí** detecta en tiempo real. Si el
> escenario del examen pide **reaccionar a un ataque en curso**, Security Hub **llega tarde** — no porque falle,
> sino **porque su ciclo es de cumplimiento**, no de detección.

---

## 6. Antes de cambiar nada: entender el hallazgo

**La ruta que muestra el instructor, en orden:**

| Paso | Qué abre |
| --- | --- |
| **1** | **Standards and requirements** — **qué está pidiendo el estándar** |
| **2** | **Remediation instructions** — **ventana o documento** con **qué hay que hacer para corregir** el control |
| **3** | **Control status → Workflow status** — **asignarlo a alguien**, **suprimirlo** o **resolverlo** |
| **4** | **El security group → Full details** — **nombre del SG** y **permisos adicionales asociados** |

> [!warning] La frase que hay que subrayar
> *“No estoy del todo seguro de si quiero cambiar algo todavía. **Quizás hay una razón por la que esto está
> fallando**.”*
>
> Un control fallido **puede ser intencional**. **Un default SG abierto puede ser un requisito heredado**. La
> consola **no sabe** de tu negocio: **vos sí**.

**Los tres estados de workflow, que son la parte evaluable:**

| Acción | Qué significa |
| --- | --- |
| **Assign** | **Asignar a alguien** para que lo atienda |
| **Suppress** | **Suprimir**: el hallazgo **existe pero se excluye** del flujo |
| **Resolve** | **Resolver**: se considera **atendido** |

> [!important] Suprimir ≠ resolver
> **Suprimir** es **dejar de mirarlo** (con justificación). **Resolver** es **decir que está atendido**. Confundirlos
> es la forma más común de **bajar el score sin mejorar la postura**.

---

## 7. La evidencia: configuration timeline

**El énfasis del instructor:** *“la configuration timeline es una de esas cosas que, **desde la perspectiva de
auditoría**, importa”*.

**Qué muestra:**

| Elemento | Qué aporta |
| --- | --- |
| **Estado de la regla** | **Cuándo estaba *compliant*** y **cuándo pasó a *non-compliant*** |
| **Marcas de fecha y hora** | **El momento exacto del cambio de estado** |
| **Campos `from` y `to`** | **El registro estaba en un estado y pasó a otro** |
| **Checks fallidos registrados** | **Dos**, con fecha **31 de octubre de 2023** |

> [!important] Es el requisito 6 del caso, en pantalla
> “Mantener **evidencia** de los controles para auditorías futuras”. **La timeline es exactamente eso**: no el
> estado actual, sino **la historia del estado**. Un control que **hoy pasa** y **ayer falló** deja **el mismo
> registro**.

> [!note] Ambigüedad de la fuente (registrada)
> El instructor dice **“August or October 31st of last year, 2023”** —se corrige a sí mismo en la frase—. Se
> transcribe **la fecha que queda firme (31 de octubre de 2023)** y se deja constancia de la vacilación.

**La conexión con Config:** el instructor lo dice: *“si quisiera ver **exactamente qué regla de config estaba
disparando**… acordate de que hablamos de **AWS Config**”*. **La timeline es de Config, mostrada desde Security
Hub.**

---

## 8. De hallazgo a recurso: *Manage Resource*

**Qué hace el botón:** **lleva a otra parte de la consola** —el instructor nota que **se parece al dashboard de
EC2, y de hecho lo es**—.

**El recorrido:** **security group** → **inbound rules** → **qué estaba disparando la alerta**.

**El ejemplo que pone:** una regla **abierta a SSH desde cualquier IPv4** (`0.0.0.0/0`). Y la pregunta correcta:

| Decisión | Cuándo |
| --- | --- |
| **Dejarla** | Si el acceso es **parte del diseño** |
| **Quitarla** | Si **no debería existir** |
| **Restringirla a un rango o a una IP** | Si **hace falta, pero no para todos** |

> [!important] El cierre del instructor
> Lo valioso **no es el score**: es que **podés entrar a Security Hub, identificar qué pasa, manejar el recurso
> directamente y obtener una evaluación actualizada —casi en tiempo real, desde una perspectiva de monitoreo
> continuo— de lo que ocurre en tus cargas**.

---

## 9. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla para
> estudiar**: lo que se estudia son las secciones **1 a 8** y se cierra con la **11**.
> Usala solo si (a) querés el texto exacto de un dato de la consola, o (b) antes del examen querés chequear un
> número.

### 9.1 Demo: AWS Security Hub (transcripción)

**Muy bien, clase. Bienvenidos de nuevo.** **Vamos a mirar AWS Security Hub un poco más a fondo.** **Ya les
mencioné algo de esto, pero recuerden esos benchmarks que vimos antes: es en esto en lo que vamos a profundizar.**

**Ahora, recuerden que siempre pueden buscar cualquiera de nuestros servicios dentro de la consola simplemente
escribiendo el nombre del servicio o algo similar a lo que recuerdan que es, ¿verdad?**

**Con eso en mente, volviendo al dashboard, podemos ver que tenemos unos cuantos estándares distintos y tenemos un
score acá.** **Ahora, este security score, con toda honestidad, está un poco elevado, o bueno, o verde, porque
también tenemos AWS Control Tower configurado y habilitado.** **Pero profundicemos un poco más acá.**

**Sea que nuestros estándares o benchmarks que estamos buscando seguir estén de acuerdo con NIST SP 800-53 o con
una carga de trabajo PCI, podemos ver cuáles son los scores específicos para servicios de AWS o para una carga de
trabajo que está corriendo ahora.**

**Ahora, hay un estándar o framework acá para AWS Foundational Security Best Practices.** **Miremos ese
resultado.**

**Voy a empezar por acá porque tengo un score bastante alto, así que eso es bueno para mí, porque es menos trabajo
el que tenemos que hacer.** **Pero déjenme profundizar en algunos de los controles fallidos.**

**Puedo ver que tenemos un total de 249.** **Pasé 224 de esos controles sin siquiera haber hecho nada.** **Lo que
realmente quiero decir es que este es el poder de AWS Control Tower al establecer esos guardrails iniciales para
nosotros.**

**Así que profundicemos en los 17 controles fallidos.** **Puedo ver algunos de ellos.** **Podemos filtrar por
severidad, sea baja, media o alta.** **Volvamos a filtrar por nuestras altas.** **Voy a cerrar esta barra de acá
para darme un poco más de espacio.**

**Para mis severidades fallidas, veo que tenemos esta alta, que muestra que *los security groups por defecto de la
VPC no deberían permitir tráfico de entrada ni de salida*.** **Eso suena bien, pero no estoy realmente seguro de
que sea ahí donde quiero ir, pero hagamos clic y profundicemos un poco más.**

**También veo que tengo dos chequeos específicos, pero déjenme subir un poco más acá porque quiero enfatizar algo.**
**Podemos ver cuándo se actualizó esto por última vez: hace unas 21 horas.** **Ahora, estos chequeos ocurren
automáticamente detrás de escena al menos una vez cada 24 horas.** **Puedo ver qué regiones están enlazadas,
¿verdad?** **Así que no es solo en una region.** **Claro, estoy acá en Northern Virginia ahora, o US East 1.**
**Pero con eso en mente, podemos agregar y enlazar entre otras cuentas y otras regiones.**

**Ahora, digamos que no estoy 100 % seguro de qué está buscando este estándar.** **Puedo hacer clic en *standards
and requirements*, o también puedo hacer clic en *remediation instructions*, que me va a llevar a otra ventana o
documento para profundizar sobre qué necesito hacer para modificar o corregir este control.**

**Ahora, de nuevo, no estoy realmente seguro de si quiero cambiar algo todavía.** **Quizás hay una razón por la
que esto está fallando.** **Puedo hacer clic en el control status, ir al workflow status, asignarlo a alguien,
suprimirlo o resolverlo.** **Pero antes de hacer cualquier cambio, profundicemos en entender qué está pasando.**

**Puedo ir y hacer clic en el security group directamente.** **Puedo hacer clic en *full details* acá y me va a dar
algo de información sobre el nombre del security group y qué user ID o qué permisos adicionales están asociados.**
**Pero hagamos clic en *close* acá.**

**Ahora, si quisiera entrar a ver exactamente qué regla de config estaba disparando esto —recuerden que hablamos de
AWS Config, y vamos a hablar de eso un poco más a fondo a medida que avancemos—, pero *configuration timeline* es
realmente lo que quiero enfatizar acá.**

**En esta configuration timeline, esta es una de esas cosas que desde una perspectiva de auditoría importa.** **Me
muestra cuándo la regla estaba realmente en cumplimiento y cuándo pasó a un estado de no cumplimiento.** **También
podemos ver que tenemos ciertos marcadores en cuanto a la fecha o el período de tiempo.** **Puedo ver que tenía dos
chequeos fallidos que profundizan un poco más en lo que pasó el 31 de agosto u octubre del año pasado, 2023.**

**Ahora, puedo ver que hay un campo *from* y un campo *to*.** **Así que muestra que este registro estaba en un
estado y después pasó a otro.**

**Ahora, déjenme subir un minuto y voy a hacer clic en el finding de Security Hub.** **Voy a volver al security
group no conforme y lo que quiero hacer es subir y hacer clic en *Manage Resource*.**

**Ahora, lo que va a hacer esto es llevarme a otra parte de la consola.** **Puedo ver arriba donde dice *Security
Hubs*.** **Puedo ver que esto se parece al dashboard de EC2, y de hecho lo es.** **Si entro a esto o hago clic en
el security group, puedo ir a mis inbound rules y me va a mostrar exactamente qué estaba disparando o sobre qué
estaba alertando.**

**Ahora, de nuevo, ¿esto significa que quiero editar esto para mi default?** **Probablemente no, o quizás sí.**
**¿Quiero remover esto?** **Ciertamente puedo.** **O si de hecho viste otra regla que te decía que tenías un puerto
o un security group abierto a otra cosa, acá es donde irías y modificarías eso.**

**Sería cuestión de seleccionar el protocolo o puerto específico que vas a abrir.** **Digamos que estamos viendo
SSH.** **Digamos que teníamos una regla abierta a SSH desde cualquier lado o cualquier dirección IPv4.**
**Quizás eso es algo que no queremos permitir.** **Quizás es algo que sí queremos permitir.** **Quizás es algo que
queremos restringir específicamente a un rango de IP o a una IP individual.**

**Pero esto es realmente lo que quería mostrarles: el hecho de que podés entrar a Security Hub, identificar qué
está pasando, manejar el recurso directamente y proveer una evaluación actualizada, casi en tiempo real, o desde
una perspectiva de monitoreo continuo, de lo que está pasando dentro de tus cargas en la nube.**

*Duración del video: **6 minutos 42 segundos**.*

---

## 10. Cuadro de cierre: qué se aprende solo en la consola

| Concepto | Dónde se ve | Por qué importa |
| --- | --- | --- |
| **Score inflado por Control Tower** | **Dashboard** | El verde **puede ser heredado**, no ganado |
| **Un score por estándar** | **Selector de estándares** | **No existe “el score de la cuenta”** |
| **Filtro por severidad** | **Lista de controles** | Se trabaja **primero lo alto** |
| **Ciclo de 24 horas** | **“Last updated”** | Security Hub **no es tiempo real** |
| **Agregación multi-Region y multi-cuenta** | **Regiones enlazadas** | El hallazgo **puede venir de otra Region** |
| **Standards and requirements** | **Detalle del control** | **Qué pide** el estándar |
| **Remediation instructions** | **Detalle del control** | **Cómo se corrige** |
| **Workflow status** | **Control status** | **Assign / Suppress / Resolve** |
| **Configuration timeline** | **Detalle del control** | **La evidencia para auditoría** (Config) |
| **Manage Resource** | **Botón del finding** | Del hallazgo **al recurso real** |

---

## 11. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **El score alto puede venir de AWS Control Tower** y sus **guardrails iniciales**: **no es postura propia**.
> 2. **Hay un score por estándar**, no uno solo por cuenta. **NIST SP 800-53**, **PCI** y **AWS Foundational
>    Security Best Practices** conviven.
> 3. **Los cheques son automáticos y corren al menos una vez cada 24 horas.**
> 4. **Security Hub agrega entre cuentas y Regions**: **el hallazgo puede venir de otra Region**.
> 5. **Se filtra por severidad**: **low**, **medium**, **high**.
> 6. **Workflow status tiene tres acciones**: **assign**, **suppress**, **resolve**.
> 7. **Suprimir no es resolver**: suprimir **saca del flujo**, resolver **declara atendido**.
> 8. **La configuration timeline es de AWS Config** y es **la evidencia para auditoría**: **from** y **to**.
> 9. **Manage Resource** lleva **del finding al recurso** para corregirlo en su consola nativa.
> 10. **Un control fallido puede ser intencional**: la consola da **contexto**, no órdenes.

> [!warning] Trampa clásica del examen
> Escenario: *“el score de cumplimiento de la cuenta es 90, ¿qué conclusión se saca?”*. La respuesta **no** es
> “la postura es buena”: hay que preguntar **contra qué estándar**, **si el score viene de Control Tower** y
> **cuándo se evaluó** (hasta **24 horas** de antigüedad). Y si el escenario pide **detectar un ataque en curso**,
> **Security Hub no es la respuesta**: su ciclo es **de cumplimiento**, y el que detecta en **tiempo real** es
> **GuardDuty**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[Security Hub]] — la lección de concepto que esta demo ilustra
- [[AWS Firewall Manager]] — una de las fuentes de findings que se ven en el dashboard
- [[Gathering the Customer Requirements - Security]] — el requisito **6** (evidencia para auditorías) que la
  **configuration timeline** materializa
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[Tech Talk - AWS Security Hub]] — el mismo servicio con un caso de **compliance
  PCI** y el criterio de remediación

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 07 completa: demo de consola (score, estándares, control fallido, workflow, timeline, Manage Resource) | Nota completa (secciones 1–11) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Los números del estándar no cierran**: **249** totales, **224** pasados, **17** fallidos → **224 + 17 = 241**.
   Faltan **8** que la fuente **no explica**. No se rellena el hueco (§4).
2. **La fecha de los checks fallidos es ambigua**: el instructor dice **“August or October 31st of last year,
   2023”** y se corrige en la misma frase. Se conserva **31 de octubre de 2023** con la vacilación registrada
   (§7).
3. **La fuente no dice qué estándar evalúa cada score** ni cuántos estándares hay disponibles: solo se ven **tres
   marcos** en pantalla.
4. **No se nombran los 8 controles restantes** ni los estados posibles (sin datos, no aplicable). **No se
   inventan.**
5. **No hay imágenes ni diagramas** en esta lección: es **transcripción de video** pura.
6. **No hay Knowledge Check** ni preguntas de autoevaluación.
7. **El instructor anuncia que “hablará de AWS Config más a fondo”**, pero en esta lección **no lo hace**: queda
   como **referencia pendiente**.
8. **El nombre de archivo `Demo - AWS Security Hub.md` no colisiona** con ninguna nota del vault (verificado: **0
   basenames duplicados**). El módulo de Observability usa **`Demonstration - AWS Service Catalog`**; acá se
   respeta el título de la fuente (**“Demo:”**) en vez de homogeneizar, para no inventar un nombre que la fuente
   no usa.

**Decisiones de transcripción:**

- Se conservan **security score**, **benchmark**, **standard**, **control**, **workflow status**, **assign**,
  **suppress**, **resolve**, **configuration timeline**, **Manage Resource**, **guardrails**, **finding**,
  **inbound rules** y **workload**.
- Las **cifras** se transcriben literales: **249** controles, **224** pasados, **17** fallidos, **2** chequeos,
  **21 horas**, **24 horas**, **6 min 42 s**, **SSH**, **IPv4**.
- Se conservan los **nombres de los marcos** tal como aparecen: **NIST SP 800-53**, **PCI**, **AWS Foundational
  Security Best Practices**, **AWS Control Tower**, **AWS Config**.
