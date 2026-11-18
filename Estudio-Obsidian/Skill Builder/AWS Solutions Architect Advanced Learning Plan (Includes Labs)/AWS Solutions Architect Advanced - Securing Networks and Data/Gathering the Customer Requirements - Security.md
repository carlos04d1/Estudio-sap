---
title: "Gathering the Customer Requirements - Security"
aliases:
  - "Gathering the Customer Requirements (Security)"
  - "Relevamiento de requisitos - Seguridad"
  - "Requisitos del cliente - Seguridad"
  - "Caso auditoría de seguridad"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - requisitos
  - auditoria
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Securing Networks and Data (AWS Skill Builder)"
---

# Gathering the Customer Requirements - Security

> [!abstract] Qué es este archivo
> Segunda lección del módulo y **primera con caso**. Una empresa sale de una **auditoría de seguridad** con cuatro
> hallazgos y seis requisitos; nosotros tenemos que entender el negocio **antes** de proponer servicios.
>
> Es el mismo movimiento que en el módulo de redes: **el caso vuelve en cada lección siguiente**. Acá se fija el
> problema; las próximas traen las soluciones.
>
> Video: **3 min 20 s**.

> [!quote] La idea que ordena todo
> **“Security is Job Zero.”** No es un eslogan: es el orden de trabajo. Primero se entiende **qué protege el
> negocio**, después se elige el control. Un firewall sin requisito detrás es solo un gasto.

---

## Resumen en una frase

> La auditoría encontró **DDoS, firewalls, cifrado y monitoreo** flojos; de ahí salen **seis requisitos** que
> apuntan todos al mismo lugar: **seguridad centralizada, automatizada y demostrable**.

---

## 1. El punto de partida: la auditoría

**El contexto:** la empresa **acaba de completar una auditoría de seguridad**. El trabajo del arquitecto empieza
**antes** de la consola: entender el **contexto de negocio** para proponer soluciones de **seguridad y
compliance**.

**Los cuatro hallazgos de la auditoría:**

| Hallazgo | Qué implica |
| --- | --- |
| **DDoS protection** | Falta protección frente a ataques de denegación de servicio |
| **Firewall implementation** | No hay controles de firewall adecuados |
| **Encryption practices** | Las prácticas de cifrado no alcanzan |
| **Overall security monitoring** | No hay visibilidad de seguridad suficiente |

**El objetivo inmediato del cliente:** **fortalecer la postura de seguridad** y, al mismo tiempo, **mantener la
eficiencia operativa**.

> [!important] El requisito que se esconde en la segunda mitad
> “Mantener la eficiencia operativa” **no es relleno**: descarta soluciones que funcionan pero **agregan trabajo
> manual**. Es el mismo criterio que en el módulo de redes hacía ganar a RAM sobre los roles por cuenta.

---

## 2. La arquitectura actual

| Dato | Detalle |
| --- | --- |
| **Aplicación** | Web de **tres capas**, **production ready** |
| **Disponibilidad** | Desplegada en **dos Availability Zones** |
| **Estado** | **Funcional**, pero **sin los servicios y controles de seguridad** necesarios |

**Lo que hay que leer ahí:** la aplicación **ya es resiliente** —dos AZ— y **aun así no es segura**. Son dos ejes
distintos y el caso los separa desde el principio.

> [!warning] El error de diagnóstico más común
> “Está en dos AZ, entonces está bien”. La **alta disponibilidad** responde a **fallas de infraestructura**, no a
> **ataques, accesos indebidos ni datos expuestos**. Este caso existe justamente porque lo primero ya estaba
> resuelto y lo segundo no.

---

## 3. Los seis requisitos

**Los requisitos, tal como los enuncia la fuente:**

| # | Requisito | Qué falta hoy |
| --- | --- | --- |
| 1 | **Centralized security management** | Políticas **consistentes** en todas las cuentas y regiones |
| 2 | **DDoS protection implementation** | Protección real en la capa de red |
| 3 | **Comprehensive firewall controls** | Firewalls y **inspección de tráfico** |
| 4 | **Integrated encryption capabilities** | Cifrado y **gestión de claves** en todas las capas |
| 5 | **Real-time threat detection** | Detección **en tiempo real** y evaluación automatizada |
| 6 | **Compliance reporting capabilities** | Reportes de cumplimiento y **evidencia para auditorías futuras** |

**Los cuatro ejes que los agrupan** —así los recorre el video—:

| Eje | Qué pide el cliente |
| --- | --- |
| **Operación** | Monitoreo **integral**, controles **automatizados** que **escalen** a múltiples cuentas y regiones, **gestión centralizada** para **aplicar política de forma consistente** |
| **Red** | Protección **DDoS**, **control de tráfico**, firewalls e **inspección** |
| **Datos** | Mejor **key management**, cifrado **en todas las capas** y manejo robusto de **secretos** (API keys, credenciales) |
| **Monitoreo y compliance** | **Visibilidad** completa, **detección en tiempo real**, **evaluaciones automatizadas**, **reportes** y **evidencia** de los controles |

> [!note] Ampliación (no está en la fuente)
> El requisito **6** es el que más se subestima: “mantener evidencia de los controles para auditorías futuras” no
> es un reporte más, es **guardar la prueba**. Un control que no deja registro **no cuenta** en una auditoría.

---

## 4. De requisito a servicio

> [!note] Lectura propia (no está en la fuente)
> La fuente **no asigna servicios a los requisitos**: las flashcards que lo harían **no vienen con su contenido**
> en el texto. Este cuadro es **mi cruce** con los cuatro objetivos del curso
> ([[Course Overview - Securing Networks and Data]]). Se confirma o se corrige a medida que lleguen las lecciones.

| Requisito | Candidato del curso | Por qué |
| --- | --- | --- |
| **Centralized security management** | **Firewall Manager** (+ **Security Hub** para la postura) | Aplica política **a través de cuentas** desde un punto |
| **DDoS protection** | **AWS Shield** | Confirmado en [[AWS Firewall Manager]]: absorbe el ataque **dentro** de la infraestructura global |
| **Comprehensive firewall controls** | **Network Firewall** + **Firewall Manager** | Inspección **dentro de la VPC** y despliegue central |
| **Integrated encryption** | **AWS KMS** | Claves administradas y **key policies** |
| **Real-time threat detection** | **GuardDuty** | Hallazgos continuos, sin agentes |
| **Compliance reporting** | **Security Hub** | Estándares, puntaje y **evidencia** agregada |

> [!warning] El hueco declarado: DDoS
> Los **cuatro objetivos** del curso son **Firewall Manager + Network Firewall**, **GuardDuty + Security Hub**,
> **criptografía** y **KMS**. **Shield no está nombrado en ningún objetivo**, aunque el requisito **2** sea
> explícitamente DDoS. Queda anotado como **hueco a verificar**: si una lección no lo cubre, el requisito queda
> sin servicio asignado en estas notas.
>
> **✅ Resuelto (27/10/2026):** la lección **03** —[[AWS Firewall Manager]]— le dedica a **Shield** una sección
> completa: definición, el paso de **SaaS** a **cloud-first** y el dato de **900 Gbps en 2023**. El hueco era de
> la fuente de la lección 02, no del curso.

---

## 5. Los límites de esta fuente

| Qué falta | Consecuencia |
| --- | --- |
| **El contenido de las flashcards** (prompts y propuestas) | No se pueden reconstruir las propuestas de Melissa; **no se inventan** |
| **La imagen `M261SWEJE5.jpeg`** | No está en el vault; se registra sin describir lo que no se ve |
| **Cifras de la arquitectura** (tamaño, tráfico, número de cuentas) | No hay datos para dimensionar; el caso es cualitativo |

**Lo que sí trae:** el video completo, la lista de **seis requisitos** y el puente explícito a la lección
siguiente: *“cómo traducir estos requisitos en una arquitectura endurecida”*.

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, o (b) querés el texto exacto de un requisito.

### 6.1 Video: Business summary and requirements (transcripción)

Hola a todos. Hoy quiero **recorrerles mi proceso de relevamiento de requisitos** para una empresa que
**recientemente completó una auditoría de seguridad**. Como nos gusta decir en AWS, **la seguridad es el Job
Zero**, y sé **lo crítico que es entender a fondo el contexto de negocio** antes de **proponer soluciones técnicas
para sus necesidades de seguridad y compliance**.

Durante **mi reunión inicial con el equipo de liderazgo** de la empresa, nos enfocamos en **sus principales
preocupaciones de seguridad**, las que **destacó la auditoría**. La auditoría **reveló varias áreas que necesitan
mejoras**, particularmente en **protección DDoS, implementación de firewalls, prácticas de cifrado y monitoreo de
seguridad general**. Su **objetivo inmediato** es **fortalecer su postura de seguridad** manteniendo la
**eficiencia operativa**.

Dados **los hallazgos de la auditoría**, tuvimos **una discusión profunda sobre sus controles de seguridad
actuales y sus requisitos de compliance**. Exploramos **su arquitectura de red existente**, que consiste en **una
aplicación web de tres capas, lista para producción, desplegada en dos Availability Zones**; **si bien es
funcional, carece de los servicios y controles de seguridad críticos** necesarios para **una postura de
seguridad robusta**.

Para los **requisitos operativos**, discutimos **sus expectativas sobre detección y respuesta a amenazas**.
Necesitan **capacidades de monitoreo integrales** y **controles de seguridad automatizados que puedan escalar a
múltiples cuentas y regiones**. Un **punto clave que enfatizaron** fue **la necesidad de gestión centralizada de
la seguridad** para **asegurar la aplicación consistente de políticas**.

Cuando hablamos de **seguridad de red**, compartieron **preocupaciones por posibles ataques DDoS** y **la
necesidad de un mejor control del tráfico de red**. Su **arquitectura actual no incluye protección adecuada en la
capa de red**, y **quieren implementar firewalls y capacidades de inspección de tráfico** apropiados.

Pasando a **protección de datos**, exploramos **sus requisitos de cifrado y sus prácticas de gestión de
secretos**. La auditoría **destacó la necesidad de un mejor key management y de mejores prácticas de cifrado en
todas las capas de su aplicación**. También necesitan **un enfoque más robusto para administrar información
sensible**, como **API keys y credenciales**.

Sus **necesidades de monitoreo y compliance** incluyen **visibilidad de seguridad integral en todo su entorno**.
Quieren **detección de amenazas en tiempo real**, **evaluaciones de seguridad automatizadas** y **capacidades
detalladas de reporte de compliance**. De manera importante, **necesitan mantener evidencia de sus controles de
seguridad para auditorías futuras**.

Después de estas conversaciones, **identifiqué varios requisitos clave**. Necesitan **un enfoque de gestión
centralizada de la seguridad**, **protección DDoS robusta**, **controles de firewall integrales** y
**capacidades de cifrado que cumplan sus requisitos de compliance**. También necesitan **monitoreo de seguridad
integrado** y **reporte automatizado de compliance**.

En **nuestro próximo segmento**, les voy a mostrar **cómo vamos a traducir estos requisitos en una arquitectura
endurecida** que **atienda sus necesidades de seguridad** y, al mismo tiempo, **provea una base para la mejora
continua de la seguridad**.

*Duración del video: **3 minutos 20 segundos**.*

### 6.2 Architecture requirements

- **Gestión centralizada de la seguridad**
- **Implementación de protección DDoS**
- **Controles de firewall integrales**
- **Capacidades de cifrado integradas**
- **Detección de amenazas en tiempo real**
- **Capacidades de reporte de compliance**

Como nos gusta decir en AWS, **la seguridad es el Job Zero**, y sé **lo crítico que es entender a fondo el contexto
de negocio** antes de **proponer soluciones técnicas para sus necesidades de seguridad y compliance**.

**— Melissa Coger-Huezo**

> [!note] La imagen de la fuente no está en el vault
> `assets/images/M261SWEJE5.jpeg` — imagen asociada a la cita de la autora. No se describe porque **su contenido
> no viene en el texto**.

### 6.3 Flashcards

> [!note] Flashcards sin propuestas en la fuente
> El texto dice: *“Revisá la información de cada una de las siguientes flashcards y pensá qué solución
> propondrías. Después elegí la flashcard para darla vuelta y ver mis propuestas.”*
>
> **Los prompts y las propuestas no vienen en el texto**: son un componente interactivo. No se reconstruyen.

**El puente al resto del curso:** *“A lo largo del curso, vas a aprender más sobre cómo traducir estos requisitos
en una arquitectura endurecida que atienda sus necesidades de seguridad y provea una base para la mejora continua
de la seguridad.”*

---

## 7. Cómo se usa este caso

| Pieza del caso | Dónde vuelve |
| --- | --- |
| **Auditoría con cuatro hallazgos** | Cada bloque del curso ataca uno |
| **Aplicación de tres capas en dos AZ** | El sujeto de prueba de las arquitecturas endurecidas |
| **Seis requisitos** | La lista de verificación de la solución final |
| **“Evidencia para auditorías futuras”** | El criterio que separa un control de un control **demostrable** |
| **“Sin perder eficiencia operativa”** | El filtro que descarta soluciones manuales |

**El criterio que conviene llevarse:** los requisitos **no piden productos**, piden **propiedades** —
centralización, automatización, visibilidad, evidencia—. Elegir el producto es el paso siguiente, y **cambia si
cambia el contexto**.

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Security is Job Zero**: primero el contexto de negocio, después la solución técnica.
> 2. La auditoría encontró **cuatro** fallas: **DDoS**, **firewalls**, **cifrado** y **monitoreo**.
> 3. La aplicación es de **tres capas**, **production ready**, en **dos AZ**, y **aun así insegura**.
> 4. **Seis requisitos**: gestión centralizada · DDoS · firewalls · cifrado · detección en tiempo real ·
>    reporte de compliance.
> 5. **Centralización** = política **consistente** en **múltiples cuentas y regiones**.
> 6. **Automatización** = controles que escalan **sin trabajo manual** por cuenta.
> 7. **Secretos** (API keys, credenciales) son parte de **protección de datos**, no un anexo.
> 8. **Evidencia para auditorías futuras** es un requisito explícito, no un extra.

> [!warning] Trampa clásica del examen
> Escenario: “la aplicación ya corre en **dos Availability Zones**, ¿qué falta?”. La respuesta **no** es
> “nada de disponibilidad”: falta **todo el eje de seguridad**. Y si el enunciado pide **cumplimiento
> demostrable**, no alcanza con **detectar**: hay que **reportar y conservar evidencia**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Securing Networks and Data]] *(índice del módulo)*
- [[Course Overview - Securing Networks and Data]] — los cuatro bloques que resuelven estos requisitos
- [[AWS Firewall Manager]] — resuelve los requisitos **1** (centralización) y **2** (DDoS) y cierra el hueco de
  Shield
- [[Gathering the Customer Requirements - Networking]] — el mismo método, con requisitos de red
- [[Finished Architecture - Networking]] — cómo se ve un caso traducido a arquitectura
- [[1.2 Prescribir controles de seguridad]] — la tarea que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[AWS Firewall Manager]] — Shield para el DDoS y gestión centralizada de los cinco
  servicios

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 02 completa: auditoría, arquitectura actual y seis requisitos | Nota completa (secciones 1–8) |

**Actualizaciones posteriores (nada se borra):**

| Fecha | Qué cambió | Por qué |
| --- | --- | --- |
| 27/10/2026 | **Duda de DDoS cerrada**: la fila de **Shield** en §4 y el bloque de hueco ahora apuntan a [[AWS Firewall Manager]] | La lección **03** le dedica a **Shield** una sección completa (definición, cloud-first, **900 Gbps**) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Las flashcards no traen su contenido**: el texto invita a “dar vuelta” cada tarjeta para ver las propuestas,
   pero **no incluye prompts ni propuestas**. No se reconstruyen.
2. **La imagen `M261SWEJE5.jpeg` no está en el vault** y su contenido no viene descrito en el texto.
3. **La fuente no asigna servicios a los requisitos.** El cuadro de §4 es **cruce propio** con los objetivos del
   curso y está marcado como tal.
4. **DDoS queda sin servicio confirmado**: **Shield** no aparece en los cuatro objetivos. Se registra como hueco.
5. **El nombre del archivo original choca** con `Gathering the Customer Requirements` del módulo de redes y con
   `Gathering the customer REquirements` del módulo de Multi-Account; se usa el sufijo **`- Security`**.
6. **No hay Knowledge Check**: la lección cierra con las flashcards y el puente a la siguiente.
7. **La fuente no da cifras** de cuentas, tráfico ni tamaño de la aplicación.

**Decisiones de transcripción:**

- Se conservan **Job Zero**, **DDoS**, **firewall**, **key management**, **secrets**, **compliance**,
  **flashcards** y **hardened architecture**.
- Las **cifras** se transcriben literales: **3 min 20 s**, **tres capas**, **dos Availability Zones**, **seis
  requisitos**, **cuatro hallazgos**.
- Se conserva el nombre de la autora, **Melissa Coger-Huezo**, junto a la cita.
