---
title: "Course Overview - Optimizing Hybrid Architectures"
aliases:
  - "Course Overview (Optimizing Hybrid Architectures)"
  - "Overview del curso híbrido"
  - "Resumen del curso híbrido"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - hybrid
  - overview
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Optimizing Hybrid Architectures (AWS Skill Builder)"
---

# Course Overview - Optimizing Hybrid Architectures

> [!abstract] Qué es este archivo
> Primera lección del módulo. **No enseña ningún servicio**: es el **mapa del curso** —qué promete, con qué
> servicios lo hace, a quién apunta y qué asume—.
>
> Sirve para saber **qué esperar** y para ubicar cada lección futura en uno de los **tres bloques** que declaran
> sus ocho objetivos: **conectividad**, **DNS** y **borde**.

> [!quote] La idea que ordena todo
> **Híbrido no es un servicio: es una decisión en tres capas.** Cómo **llego** a AWS, cómo **resuelvo nombres**
> entre los dos mundos y **dónde ejecuto** cuando la latencia o la residencia no admiten una Region.

---

## Resumen en una frase

> Ocho objetivos en tres capas: **Client VPN / Site-to-Site VPN / Direct Connect** para llegar, **Route 53
> Resolver** para resolver nombres y **Outposts / Local Zones / Wavelength** para acercar el cómputo.

---

## 1. Qué promete el curso

**El encuadre de la fuente:** el curso da **conocimiento y habilidades prácticas** para **diseñar e implementar
arquitecturas híbridas y de borde** con **servicios de conectividad** y **soluciones de edge computing** de AWS.

| Lo que declara la fuente | Qué significa en la práctica |
| --- | --- |
| **Arquitecturas híbridas y de borde** | No es solo “conectar la oficina”: también es **acercar el cómputo** a donde está el usuario o el dato |
| **Servicios de conectividad de AWS** | **Client VPN**, **Site-to-Site VPN** y **Direct Connect** son las tres formas de llegar |
| **Soluciones de edge computing** | **Outposts**, **Local Zones** y **Wavelength** resuelven latencia y **residencia de datos** |
| **Comunicación confiable y de baja latencia** | El criterio de diseño es **latencia + confiabilidad**, no solo “que haya link” |
| **Tres entornos: on-premises, edge y AWS** | La arquitectura se diseña **entre** entornos, no dentro de uno |

> [!important] El curso no empieza por los servicios
> Empieza por una **decisión de arquitectura**: qué parte de la carga se queda **on-premises**, qué parte va al
> **borde** y qué parte vive en una **Region**. Los servicios vienen después, como **consecuencia** de esa
> decisión.

---

## 2. Los ocho objetivos, en tres bloques

**Los objetivos no son un temario suelto: agrupan el curso en tres bloques.**

| # | Objetivo de la fuente | Servicio / tema | Qué se espera que hagas |
| --- | --- | --- | --- |
| 1 | Comparar **Client VPN** y **Site-to-Site VPN** | **AWS Client VPN**, **AWS Site-to-Site VPN** | Elegir la **estrategia de acceso remoto** adecuada |
| 2 | Diseñar **Site-to-Site VPN resilientes** | **Site-to-Site VPN** | Que el enlace **tolere fallas** |
| 3 | Implementar configuraciones de **Direct Connect** | **AWS Direct Connect** | Montar el enlace **dedicado** |
| 4 | Diseñar **alta disponibilidad** con **DX** y **VPN de respaldo** | **Direct Connect** + **VPN** | Combinar **resiliencia** y **failover** |
| 5 | Configurar **Route 53 Resolver endpoints** | **Route 53 Resolver** | Resolver **DNS entre on-premises y AWS** |
| 6 | Configurar **AWS Outposts** | **AWS Outposts** | Sostener **residencia de datos** on-premises con servicios de AWS, en **racks y servers** |
| 7 | Evaluar **AWS Local Zones** | **AWS Local Zones** | Casos de uso y requisitos para **baja latencia** donde **no hay Region** |
| 8 | Implementar **AWS Wavelength** con **5G** | **AWS Wavelength** | **Latencia ultra baja** desplegando en **la red del carrier** |

### Los tres bloques

| Bloque | Objetivos | Pregunta que responde |
| --- | --- | --- |
| **Conectividad** | 1–4 | **¿Cómo llego?** — usuario remoto, sitio a sitio, enlace dedicado y su respaldo |
| **DNS** | 5 | **¿Cómo me nombro?** — resolución entre **on-premises** y **AWS** |
| **Borde** | 6–8 | **¿Dónde ejecuto?** — residencia de datos, cercanía y latencia |

> [!note] Lectura propia (no está en la fuente)
> La fuente **enumera los ocho objetivos seguidos**, sin agruparlos. Los tres bloques son **mi lectura** del
> orden: los cuatro primeros son **conectividad**, el quinto es **DNS** y los tres últimos son **cómputo en el
> borde**. No es un temario oficial del curso.

> [!warning] “Borde” no es una sola cosa
> **Outposts** resuelve **residencia de datos** (el cómputo se queda en tu instalación). **Local Zones** resuelve
> **cercanía metropolitana** (hay cómputo de AWS en tu ciudad, sin Region). **Wavelength** resuelve **latencia de
> red móvil** (el cómputo vive en la red del carrier). **Comparten la idea de “más cerca”, no el problema.**

---

## 3. A quién apunta y qué asume

| | Detalle de la fuente |
| --- | --- |
| **Audiencia** | Un **solutions architect** que lleva **2 o más años** en el rol |
| **Prerrequisito 1** | Haber tomado o **entender el learning plan de Solutions Architect – Associate**, o haber **aprobado** ese examen |
| **Prerrequisito 2** | **Evaluar requisitos** de aplicaciones cloud y **hacer recomendaciones** de arquitectura para desplegarlas en AWS |
| **Prerrequisito 3** | **Dos o más años** de experiencia **usando servicios de AWS** para **diseñar e implementar** soluciones cloud |

> [!warning] Dos “dos años” distintos
> La **audiencia** pide **2+ años en el rol** de solutions architect; el **prerrequisito** pide **2+ años usando
> servicios de AWS**. No es el mismo requisito y la fuente los enuncia por separado.

---

## 4. Cómo está armado

**Según la fuente, el curso incluye:**

- **Instrucción grabada**.
- **Contenido multimedia e interactivo**.
- **Un activity challenge** para **evaluar y reforzar** el conocimiento **actual y posterior a la formación**.

> [!note] Lo que este overview **no** trae
> No hay definiciones de servicio, ni demo, ni knowledge check, ni diagramas. Es una página de encuadre: **no se
> estudia como contenido**, se usa para **ubicarse**.

---

## 5. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 4** y se cierra con la **7**.
> Usala solo si (a) algo de arriba te quedó dudoso, o (b) querés chequear el texto exacto de un objetivo.

### 5.1 Course summary

Este curso incluye **instrucción grabada**, así como **contenido multimedia e interactivo**. Se provee **un
activity challenge** para **ayudarte a evaluar y reforzar tu conocimiento actual y posterior a la formación**.

Este curso te **equipa con el conocimiento y las habilidades prácticas** necesarias para **diseñar e implementar
arquitecturas híbridas y de edge computing** utilizando **servicios de conectividad de AWS** y **soluciones de
edge computing**, para **establecer una comunicación confiable y de baja latencia** en **entornos on-premises,
edge y de AWS**.

### 5.2 Course details — Course Objectives

En este curso, vas a aprender a:

- **Comparar y contrastar** las soluciones **AWS Client VPN** y **Site-to-Site VPN** para **determinar la
  estrategia de acceso remoto adecuada**.
- **Diseñar arquitecturas resilientes de Site-to-Site VPN**.
- **Implementar configuraciones de AWS Direct Connect**.
- **Diseñar arquitecturas de alta disponibilidad** usando las **opciones de resiliencia de Direct Connect** y
  **soluciones de respaldo con VPN**.
- **Configurar endpoints de Route 52 Resolver** para **habilitar la resolución DNS entre entornos on-premises y
  de AWS**.
- **Configurar soluciones de AWS Outposts** para **soportar cargas de trabajo que requieren residencia de datos
  on-premises**, **aprovechando los servicios de AWS** a través de **distintos formatos (racks y servers)**.
- **Evaluar casos de uso y requisitos de configuración de AWS Local Zones** para **implementar aplicaciones de
  baja latencia en áreas geográficas sin Regiones de AWS**.
- **Implementar soluciones de AWS Wavelength junto con redes 5G** para **entregar aplicaciones de latencia ultra
  baja**, **desplegando infraestructura de AWS en ubicaciones de la red del carrier**.

### 5.3 Intended Audience

Este curso está destinado a:

- **Un solutions architect que lleva actualmente 2 o más años en el rol.**

### 5.4 Prerequisites

Recomendamos que quienes tomen este curso tengan los siguientes prerrequisitos:

- **Haber tomado o entender la información del learning plan de Solutions Architect – Associate**, o **haber
  aprobado el examen de certificación Solutions Architect – Associate**.
- **La capacidad de evaluar requisitos de aplicaciones cloud** y **hacer recomendaciones de arquitectura** para
  el **despliegue de aplicaciones en AWS**.
- **Dos o más años de experiencia usando servicios de AWS** para **diseñar e implementar soluciones cloud**.

---

## 6. Cómo leer el módulo

| Si la lección habla de… | Pertenece al bloque… |
| --- | --- |
| Usuarios que se conectan **desde cualquier lugar** | **Conectividad — Client VPN** |
| **Dos sitios** unidos por túneles | **Conectividad — Site-to-Site VPN** |
| Un enlace **dedicado**, que no pasa por internet | **Conectividad — Direct Connect** |
| **Redundancia** del enlace y **respaldo** | **Conectividad — HA de DX + VPN** |
| Nombres que se resuelven **entre on-premises y AWS** | **DNS — Route 53 Resolver** |
| El cómputo **se queda en la instalación** del cliente | **Borde — Outposts** |
| Cómputo de AWS **en la ciudad**, sin Region | **Borde — Local Zones** |
| Cómputo **en la red 5G** del carrier | **Borde — Wavelength** |

**El hilo que los une:** las tres capas responden a la misma pregunta desde lugares distintos — **cómo llego,
cómo me nombro y dónde ejecuto**.

---

## 7. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. El curso se organiza en **tres capas**: **conectividad**, **DNS** y **borde**.
> 2. **Client VPN** es **acceso remoto de usuarios**; **Site-to-Site VPN** une **redes o sitios**.
> 3. El curso pide **Site-to-Site VPN resiliente**: el diseño debe **tolerar fallas**, no solo “funcionar”.
> 4. **Direct Connect** se estudia en dos planos: **configuración** y **alta disponibilidad**.
> 5. La **HA de Direct Connect** se completa con **VPN como respaldo**, no con un segundo túnel del mismo tipo.
> 6. **Route 53 Resolver endpoints** habilitan **DNS entre on-premises y AWS**.
> 7. **Outposts** existe para **residencia de datos** on-premises, en **racks y servers**.
> 8. **Local Zones** sirven para **baja latencia** en zonas **sin Region**.
> 9. **Wavelength** va con **5G** y despliega **en la red del carrier**, para **latencia ultra baja**.
> 10. El curso **no enumera lecciones**: los tres bloques de §2 son **lectura propia** de los ocho objetivos.

> [!warning] Trampa clásica del examen
> Escenario: *“una empresa necesita **conectar a sus empleados remotos** con la VPC y, además, **unir su data
> center** con AWS por un enlace **privado**”*. La respuesta **no** es un solo servicio para todo: son **dos
> decisiones** —**Client VPN** o **Site-to-Site VPN** para el acceso, según sea **usuario** o **sitio**, y
> **Direct Connect** cuando el requisito es **enlace dedicado**. Mezclar “acceso remoto” con “conectividad de
> sitio” es el error que el curso quiere evitar.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] *(índice del módulo)*
- [[Course Overview - Securing Networks and Data]] — el overview anterior: mismo formato, otro eje
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — la red **dentro** de AWS que
  este curso conecta con lo **on-premises**
- [[AWS Solutions Architect Advanced - Securing Networks and Data]] — los controles que protegen esos enlaces
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que este módulo cubre
- [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]] — el cruce con latencia y borde
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
- Siguiente paso del módulo: [[Gathering the Customer Requirements - Hybrid]] — el caso que fija los requisitos

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 01 completa: resumen, ocho objetivos, audiencia y prerrequisitos | Nota completa (secciones 1–7) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La fuente escribe “Route 52 Resolver”** en el quinto objetivo. El servicio es **Route 53 Resolver**. Se
   transcribe literal en §5.2 y se usa el nombre correcto en el cuerpo.
2. **La fuente usa `****Course Objectives****`** (cuatro asteriscos) para los títulos. Es un **artefacto de
   formato**; se traduce como negrita normal.
3. **El archivo original se llama `Course Overview.md`**, igual que los de otros módulos. Se agregó el sufijo
   **`- Optimizing Hybrid Architectures`** para evitar ambigüedad de wikilinks.
4. **No hay imágenes, video ni knowledge check**: es una página de texto.
5. **La fuente no enumera las lecciones** del curso: los tres bloques de §2 son **mi lectura de los ocho
   objetivos**, no un temario oficial.
6. **La fuente no da duración** del curso ni de las lecciones.
7. **El curso declara “híbridas y de borde”** en el resumen, pero los objetivos mezclan **conectividad** (1–5)
   y **borde** (6–8) sin separarlos. La separación es **lectura propia**.
8. **No se describen** configuraciones, cuotas, costos ni topologías: el overview **solo nombra** los servicios.
9. **“racks y servers”** se conserva literal; no se traduce a “bastidores y servidores” para no perder el
   nombre de los **formatos** de Outposts.

**Decisiones de transcripción:**

- Se conservan **AWS Client VPN**, **Site-to-Site VPN**, **AWS Direct Connect**, **Route 53 Resolver**,
  **AWS Outposts**, **AWS Local Zones**, **AWS Wavelength**, **5G**, **edge computing**, **on-premises**,
  **residencia de datos**, **racks** y **servers**.
- Las **cifras** se transcriben literales: **2 o más años** (dos veces, con significados distintos: rol y uso de
  AWS) y **ocho objetivos**.
- Los **ocho objetivos** se transcriben completos, porque son el **contrato del curso**.
