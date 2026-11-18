---
title: "Guía de examen SAP-C02 — AWS Certified Solutions Architect Professional"
aliases:
  - "Guia AWS"
  - "SAP-C02"
  - "Guía de examen SAP-C02"
tags:
  - certificacion/aws
  - sap-c02
  - guia-oficial
  - mocs
status: referencia
fuente: "AWS Certified Solutions Architect - Professional Exam Guide (SAP-C02), 2026"
---

# AWS Certified Solutions Architect – Professional (SAP-C02)

> **Guía de examen (Exam Guide)** — AWS Certified Solutions Architect – Professional (SAP-C02)
> Copyright © 2026 Amazon Web Services, Inc. and/or its affiliates. All rights reserved.
>
> Amazon's trademarks and trade dress may not be used in connection with any product or service that is not Amazon's, in any manner that is likely to cause confusion among customers, or in any manner that disparages or discredits Amazon. All other trademarks not owned by Amazon are the property of their respective owners, who may or may not be affiliated with, connected to, or sponsored by Amazon.

---

## Contenido de esta nota

- [[#Introducción]]
- [[#Descripción del candidato objetivo]]
- [[#Contenido del examen]]
  - [[#Tipos de respuesta]]
  - [[#Contenido sin puntaje]]
  - [[#Resultados del examen]]
  - [[#Descripción del contenido]]
- [[#Dominio de contenido 1: Diseño de soluciones para la complejidad organizacional]] — **26 %**
  - [[#Tarea 1.1: Diseñar estrategias de conectividad de redes]]
  - [[#Tarea 1.2: Prescribir controles de seguridad]]
  - [[#Tarea 1.3: Diseñar arquitecturas fiables y resistentes]]
  - [[#Tarea 1.4: Diseñar un entorno de AWS de varias cuentas]]
  - [[#Tarea 1.5: Determinar las estrategias de optimización de costos y visibilidad]]
- [[#Dominio de contenido 2: Diseño para nuevas soluciones]] — **29 %**
  - [[#Tarea 2.1: Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]]
  - [[#Tarea 2.2: Diseñar una solución para garantizar la continuidad de actividades]]
  - [[#Tarea 2.3: Determinar los controles de seguridad en función de los requisitos]]
  - [[#Tarea 2.4: Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]
  - [[#Tarea 2.5: Diseñar una solución para cumplir con los objetivos de rendimiento]]
  - [[#Tarea 2.6: Determinar una estrategia de optimización de costos para cumplir con las metas y objetivos de la solución]]
- [[#Dominio de contenido 3: Mejora continua para las soluciones existentes]] — **25 %**
  - [[#Tarea 3.1: Determinar una estrategia para mejorar la excelencia operativa general]]
  - [[#Tarea 3.2: Determinar una estrategia para mejorar la seguridad]]
  - [[#Tarea 3.3: Determinar una estrategia para mejorar el rendimiento]]
  - [[#Tarea 3.4: Determinar una estrategia para mejorar la fiabilidad]]
  - [[#Tarea 3.5: Identificar oportunidades de optimización de costos]]
- [[#Dominio de contenido 4: Aceleración de la migración y la modernización de las cargas de trabajo]] — **20 %**
  - [[#Tarea 4.1: Seleccionar las cargas de trabajo y los procesos existentes para una posible migración]]
  - [[#Tarea 4.2: Determinar el enfoque de migración óptimo para las cargas de trabajo existentes]]
  - [[#Tarea 4.3: Determinar una nueva arquitectura para las cargas de trabajo existentes]]
  - [[#Tarea 4.4: Determinar oportunidades de modernización y mejoras]]
- [[#Temas emergentes]]
  - [[#Diseño de controles de seguridad y de inteligencia artificial responsable]]
- [[#Referencias de servicios]]
  - [[#Tecnologías y conceptos]]
  - [[#Servicios de AWS dentro del alcance]]
  - [[#Servicios de AWS fuera del alcance]]
  - [[#Menciones de los servicios de AWS en el examen]]

---

## Introducción

El examen AWS Certified Solutions Architect – Professional (SAP-C02) está dirigido a personas que desempeñan un rol en la arquitectura de soluciones. El examen valida la experiencia y las habilidades técnicas avanzadas de un candidato en el diseño de soluciones de AWS optimizadas que se basan en el [[Marco de AWS Well-Architected|Wel Marco de AWS Well-Architected]].

El examen también valida la capacidad de un candidato para completar las siguientes tareas dentro del alcance del Marco de AWS Well-Architected:
- Diseño para la complejidad organizacional.
- Diseño para nuevas soluciones.
- Mejora continua de las soluciones existentes.
- Aceleración de la migración y la modernización de las cargas de trabajo.

---

## Descripción del candidato objetivo

El candidato objetivo debe tener **2 o más años de experiencia** en el uso de los servicios de AWS para diseñar e implementar soluciones en la nube. Este candidato debe tener la capacidad de evaluar los requisitos de las aplicaciones en la nube y formular recomendaciones de arquitectura para la implementación de aplicaciones en AWS. Este candidato también debe ser capaz de proporcionar orientación experta sobre el diseño arquitectónico que abarca múltiples aplicaciones y proyectos dentro de una organización compleja.

### Tareas de trabajo y conocimientos fuera del alcance

En la siguiente lista se incluyen las tareas de trabajo que no se espera que realice el candidato objetivo y los conocimientos que no se espera que tenga. Esta lista no es exhaustiva. Estas tareas y conocimientos están **fuera del alcance del examen**:

- Desarrollo de frontend para aplicaciones móviles
- Metodología de 12 factores para aplicaciones
- Conocimientos profundos de los sistemas operativos

---

## Contenido del examen

### Tipos de respuesta

El examen contiene uno o más de los siguientes tipos de preguntas:

- **Opciones múltiples:** hay una respuesta correcta y tres incorrectas (distractoras).
- **Respuesta múltiple:** hay dos o más respuestas correctas entre cinco o más opciones. Debe seleccionar todas las respuestas correctas para recibir crédito por la pregunta.

Las preguntas no respondidas se califican como incorrectas. **No hay penalización por adivinar.**

### Contenido sin puntaje

El examen incluye **10 preguntas sin puntaje** que no afectan su puntaje. AWS recopila información sobre el desempeño en estas preguntas sin puntaje a fin de evaluarlas para su uso como preguntas con puntaje en el futuro. Las preguntas sin puntaje no están identificadas en el examen.

### Resultados del examen

El examen AWS Certified Solutions Architect – Professional (SAP-C02) tiene una calificación de **aprobado o reprobado**. El puntaje del examen se obtiene según un estándar mínimo que establecen los profesionales de AWS en función de las prácticas recomendadas y las pautas del sector de la certificación.

El informe de los resultados del examen es un puntaje en la escala del **100 al 1000**. El puntaje mínimo para aprobar es **750**. El puntaje muestra cómo le fue en el examen en general y si lo aprobó o no. Los modelos de puntaje en escala ayudan a equiparar los puntajes de varios formularios de examen que pueden tener niveles de dificultad un poco diferentes.

En el informe de puntaje podría haber una tabla de clasificación de su desempeño en cada nivel de sección. En el examen se usa un **modelo de puntaje compensatorio**, lo que significa que no es necesario aprobar cada sección: solo necesita aprobar el examen general.

Cada sección del examen tiene una ponderación específica, por lo que algunas contienen más preguntas que otras. En la tabla de clasificaciones se presenta información general que resalta sus fortalezas y debilidades. **Interprete los comentarios de cada sección con prudencia.**

### Descripción del contenido

En esta guía de examen se incluyen ponderaciones, dominios de contenido y tareas para el examen. En esta guía no se proporciona una lista completa del contenido del examen. Sin embargo, hay contexto adicional disponible de cada tarea a fin de ayudarlo a prepararse para el examen.

El examen tiene los siguientes dominios de contenido y ponderaciones:

| Dominio de contenido | Descripción | Peso |
| --- | --- | --- |
| 1 | Soluciones de diseño para la complejidad organizacional | **26 %** |
| 2 | Diseño para nuevas soluciones | **29 %** |
| 3 | Mejora continua de las soluciones existentes | **25 %** |
| 4 | Aceleración de la migración y la modernización de la carga de trabajo | **20 %** |

> [!info] Total de preguntas con puntaje
> **65 preguntas** afectan el puntaje, más **10 preguntas sin puntaje**.

---

## Dominio de contenido 1: Diseño de soluciones para la complejidad organizacional

**Peso: 26 % del contenido con puntaje**

### Tareas

- **Tarea 1.1:** [[1.1 Diseñar estrategias de conectividad de redes|Diseñar estrategias de conectividad de redes.]]
- **Tarea 1.2:** [[1.2 Prescribir controles de seguridad|Prescribir controles de seguridad.]]
- **Tarea 1.3:** [[1.3 Diseñar arquitecturas fiables y resistentes|Diseñar arquitecturas fiables y resistentes.]]
- **Tarea 1.4:** [[1.4 Diseñar un entorno de AWS de varias cuentas|Diseñar un entorno de AWS de varias cuentas.]]
- **Tarea 1.5:** [[1.5 Determinar las estrategias de optimización de costos y visibilidad|Determinar las estrategias de optimización de costos y visibilidad.]]

### Tarea 1.1: Diseñar estrategias de conectividad de redes

**Conocimientos de:**

- Infraestructura global de AWS
- Conceptos de redes de AWS (por ejemplo, Amazon Virtual Private Cloud [Amazon VPC], AWS Direct Connect, AWS VPN, enrutamiento transitivo, servicios de contenedores de AWS)
- Conceptos de DNS híbrido (por ejemplo, Amazon Route 53 Resolver, integración de DNS en las instalaciones)
- Segmentación de red (por ejemplo, subredes, direccionamiento IP, conectividad entre VPC)
- Supervisión del tráfico de red

**Habilidades para:**

- Evaluar las opciones de conectividad para varias VPC.
- Evaluar las opciones de conectividad para la integración de coubicación, en las instalaciones y en la nube.
- Seleccionar zonas de disponibilidad y regiones de AWS en función de los requisitos de red y latencia.
- Solucionar problemas de flujos de tráfico mediante herramientas de AWS.
- Usar puntos de enlace de servicio para integraciones de servicios.

### Tarea 1.2: Prescribir controles de seguridad

**Conocimientos de:**

- AWS Identity and Access Management (IAM) y AWS IAM Identity Center
- Tablas de enrutamiento, grupos de seguridad y ACL de red
- Administración de certificados y claves de cifrado (por ejemplo, AWS Key Management Service [AWS KMS], AWS Certificate Manager [ACM])
- Herramientas de seguridad, identidad y cumplimiento de AWS (por ejemplo, AWS CloudTrail, analizador de acceso de AWS Identity and Access Management, AWS Security Hub, Amazon Inspector)

**Habilidades para:**

- Evaluación de la administración del acceso entre cuentas
- Integración con proveedores de identidad de terceros
- Implementación de estrategias de cifrado para datos en reposo y datos en tránsito
- Desarrollo de una estrategia para la auditoría y las notificaciones de eventos de seguridad centralizadas

### Tarea 1.3: Diseñar arquitecturas fiables y resistentes

**Conocimientos de:**

- Objetivos de tiempo de recuperación (RTO) y objetivos de punto de recuperación (RPO)
- Estrategias de recuperación de desastres (por ejemplo, el uso de la Recuperación elástica ante desastres de AWS, llama piloto, espera activa y varios sitios)
- Copia de seguridad y restauración de datos

**Habilidades para:**

- Diseñar soluciones de recuperación de desastres basadas en los requisitos de RTO y RPO.
- Implementar arquitecturas para recuperarse automáticamente de los errores.
- Desarrollar una arquitectura óptima teniendo en cuenta las opciones de escalado vertical y horizontal.
- Diseñar una estrategia eficaz de copia de seguridad y restauración.

### Tarea 1.4: Diseñar un entorno de AWS de varias cuentas

**Conocimientos de:**

- AWS Organizations y AWS Control Tower
- Notificaciones de eventos de varias cuentas
- Intercambio de recursos de AWS entre entornos

**Habilidades para:**

- Evaluar la estructura de cuenta más adecuada para los requisitos de la organización.
- Recomendar una estrategia para el registro centralizado y las notificaciones de eventos.
- Desarrollar un modelo de gobernanza de varias cuentas.

### Tarea 1.5: Determinar las estrategias de optimización de costos y visibilidad

**Conocimientos de:**

- Herramientas de supervisión de uso y costos de AWS (por ejemplo, AWS Trusted Advisor, Calculadora de precios de AWS, AWS Cost Explorer, AWS Budgets)
- Opciones de compra de AWS (por ejemplo, instancias reservadas, Savings Plans, instancias de spot)
- Herramientas de visibilidad del dimensionamiento correcto de AWS (por ejemplo, AWS Compute Optimizer, Amazon Simple Storage Service [Amazon S3] Storage Lens)

**Habilidades para:**

- Supervisar el costo y uso con herramientas de AWS.
- Desarrollar una estrategia de etiquetado eficaz que asigne los costos a las unidades de negocio.
- Comprender cómo las opciones de compra afectan el costo y el rendimiento.

---

## Dominio de contenido 2: Diseño para nuevas soluciones

**Peso: 29 % del contenido con puntaje** *(el dominio más pesado)*

### Tareas

- **Tarea 2.1:** [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales|Diseñar una estrategia de implementación para cumplir con los requisitos empresariales.]]
- **Tarea 2.2:** [[2.2 Diseñar una solución para garantizar la continuidad de actividades|Diseñar una solución para garantizar la continuidad de actividades.]]
- **Tarea 2.3:** [[2.3 Determinar los controles de seguridad en función de los requisitos|Determinar los controles de seguridad en función de los requisitos.]]
- **Tarea 2.4:** [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad|Diseñar una estrategia para cumplir con los requisitos de fiabilidad.]]
- **Tarea 2.5:** [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento|Diseñar una solución para cumplir con los objetivos de rendimiento.]]
- **Tarea 2.6:** [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas|Determinar una estrategia de optimización de costos para cumplir con las metas y objetivos de la solución.]]

### Tarea 2.1: Diseñar una estrategia de implementación para cumplir con los requisitos empresariales

**Conocimientos de:**

- Infraestructura como código (IaC) (por ejemplo, AWS CloudFormation)
- Integración y entrega continuas (CI/CD)
- Procesos de administración de cambios
- Herramientas de administración de la configuración (por ejemplo, AWS Systems Manager)

**Habilidades para:**

- Determinar una ruta de actualización o aplicación para nuevos servicios y características.
- Seleccionar servicios para desarrollar estrategias de implementación e implementar mecanismos de restauración adecuados.
- Adoptar servicios administrados según sea necesario para reducir el aprovisionamiento de infraestructura y la sobrecarga de parches.
- Hacer que las tecnologías avanzadas sean accesibles al delegar tareas complejas de desarrollo e implementación a AWS.

### Tarea 2.2: Diseñar una solución para garantizar la continuidad de actividades

**Conocimientos de:**

- Infraestructura global de AWS
- Conceptos de redes de AWS (por ejemplo, Route 53, métodos de enrutamiento)
- RTO y RPO
- Escenarios de recuperación de desastres (por ejemplo, copia de seguridad y restauración, llama piloto, espera activa, varios sitios)
- Soluciones de recuperación de desastres en AWS

**Habilidades para:**

- Configurar soluciones de recuperación de desastres.
- Configurar la replicación de datos y bases de datos.
- Ejecutar pruebas de recuperación de desastres.
- Diseñar la arquitectura de una solución de copia de seguridad automatizada, rentable y compatible con la continuidad de actividades en varias zonas de disponibilidad o regiones de AWS.
- Diseñar una arquitectura que proporcione disponibilidad de aplicaciones e infraestructuras ante una interrupción.
- Usar procesos y componentes para la supervisión centralizada con el fin de recuperarse de manera proactiva de los errores del sistema.

### Tarea 2.3: Determinar los controles de seguridad en función de los requisitos

**Conocimientos de:**

- IAM
- Tablas de enrutamiento, grupos de seguridad y ACL de red
- Opciones de cifrado para datos en reposo y datos en tránsito
- Puntos de enlace de servicios de AWS
- Servicios de administración de credenciales
- Servicios de seguridad administrados de AWS (por ejemplo, AWS Shield, AWS WAF, Amazon GuardDuty, AWS Security Hub)

**Habilidades para:**

- Especificar los usuarios y roles de IAM que se adhieren al principio de acceso de mínimo privilegio.
- Especificar los flujos de red entrantes y salientes mediante reglas de grupo de seguridad y ACL de red.
- Desarrollar estrategias de mitigación de ataques para aplicaciones web a gran escala.
- Desarrollar estrategias de cifrado para datos en reposo y datos en tránsito.
- Especificar puntos de enlace de servicio para integraciones de servicios.
- Desarrollar estrategias para que la administración de parches se mantenga conforme a los estándares de la organización.

### Tarea 2.4: Diseñar una estrategia para cumplir con los requisitos de fiabilidad

**Conocimientos de:**

- Infraestructura global de AWS
- Servicios de almacenamiento y estrategias de replicación de AWS (por ejemplo, Amazon S3, Amazon RDS, Amazon ElastiCache)
- Arquitecturas multi-AZ y multirregionales
- Políticas y eventos de escalado automático
- Integración de aplicaciones (por ejemplo, Amazon SNS, Amazon SQS, AWS Step Functions)
- Cuotas y límites de servicios

**Habilidades para:**

- Diseñar entornos de aplicaciones de alta disponibilidad en función de los requisitos empresariales.
- Usar técnicas avanzadas para crear un diseño a prueba de fallas y garantizar una capacidad de recuperación perfecta del sistema.
- Implementar dependencias con acoplamiento débil.
- Operar y mantener arquitecturas de alta disponibilidad (por ejemplo, conmutación por error de aplicaciones, conmutación por error de bases de datos).
- Usar AWS Managed Services para obtener una alta disponibilidad.
- Implementar políticas de enrutamiento de DNS (por ejemplo, enrutamiento basado en latencia de Route 53, enrutamiento de geolocalización, enrutamiento simple)

### Tarea 2.5: Diseñar una solución para cumplir con los objetivos de rendimiento

**Conocimientos de:**

- Tecnologías de supervisión del rendimiento
- Opciones de almacenamiento en AWS
- Familias de instancias y casos de uso
- Bases de datos personalizadas

**Habilidades para:**

- Diseñar arquitecturas de aplicaciones a gran escala para una variedad de patrones de acceso.
- Diseñar una arquitectura elástica basada en los objetivos empresariales.
- Aplicar patrones de diseño para cumplir con los objetivos de rendimiento con almacenamiento en caché, almacenamiento en búfer y réplicas.
- Desarrollar una metodología de procesos para seleccionar servicios diseñados específicamente para las tareas requeridas.
- Diseñar una estrategia de dimensionamiento correcto.

### Tarea 2.6: Determinar una estrategia de optimización de costos para cumplir con las metas y objetivos de la solución

**Conocimientos de:**

- Herramientas de supervisión de uso y costos de AWS (por ejemplo, AWS Cost Explorer, AWS Trusted Advisor, Calculadora de precios de AWS)
- Modelos de precios (por ejemplo, instancias reservadas, AWS Savings Plans)
- Organización en niveles de almacenamiento
- Costos de transferencia de datos
- Ofertas de AWS Managed Service

**Habilidades para:**

- Identificar oportunidades para seleccionar y hacer un dimensionamiento correcto de la infraestructura para obtener recursos rentables.
- Identificar modelos de precios adecuados.
- Ejecutar modelado de transferencia de datos y selección de servicios para reducir los costos de transferencia de datos.
- Desarrollar una estrategia e implementar controles para la concientización sobre los gastos y el uso.

---

## Dominio de contenido 3: Mejora continua para las soluciones existentes

**Peso: 25 % del contenido con puntaje**

### Tareas

- **Tarea 3.1:** [[3.1 Estrategia para mejorar la excelencia operativa general|Determinar una estrategia para mejorar la excelencia operativa general.]]
- **Tarea 3.2:** [[3.2 Estrategia para mejorar la seguridad|Determinar una estrategia para mejorar la seguridad.]]
- **Tarea 3.3:** [[3.3 Estrategia para mejorar el rendimiento|Determinar una estrategia para mejorar el rendimiento.]]
- **Tarea 3.4:** [[3.4 Estrategia para mejorar la fiabilidad|Determinar una estrategia para mejorar la fiabilidad.]]
- **Tarea 3.5:** [[3.5 Identificar oportunidades de optimización de costos|Identificar oportunidades de optimización de costos.]]

### Tarea 3.1: Determinar una estrategia para mejorar la excelencia operativa general

**Conocimientos de:**

- Estrategias de alerta y corrección automática
- Planificación de recuperación de desastres
- Soluciones de supervisión y registro (por ejemplo, Amazon CloudWatch)
- Canalizaciones de CI/CD y estrategias de implementación (por ejemplo, azul/verde, todo a la vez, de forma continua)
- Herramientas de administración de la configuración (por ejemplo, AWS Systems Manager)

**Habilidades para:**

- Determinar la estrategia de registro y supervisión más adecuada.
- Evaluar los procesos de implementación actuales para determinar oportunidades de mejora.
- Priorizar oportunidades para la automatización dentro de una pila de soluciones.
- Recomendar las soluciones de AWS adecuadas para habilitar la automatización de la administración de la configuración.
- Diseñar actividades de escenarios de errores para respaldar y comprender las acciones de recuperación.

### Tarea 3.2: Determinar una estrategia para mejorar la seguridad

**Conocimientos de:**

- Retención de datos, confidencialidad de datos y requisitos normativos de datos
- Estrategias automatizadas de supervisión y corrección (por ejemplo, reglas de AWS Config)
- Administración de secretos (por ejemplo, Systems Manager, AWS Secrets Manager)
- Principio de acceso de mínimo privilegio
- Soluciones de AWS específicas de seguridad
- Prácticas de aplicación de parches
- Prácticas y métodos de respaldo

**Habilidades para:**

- Evaluar una estrategia para la administración segura de secretos y credenciales.
- Auditar un entorno para verificar el acceso de mínimo privilegio.
- Revisar las soluciones implementadas para garantizar la seguridad en cada capa.
- Revisar la trazabilidad integral de usuarios y servicios.
- Priorizar respuestas automatizadas para la detección de vulnerabilidades.
- Diseñar e implementar un proceso de parches y actualización.
- Diseñar e implementar un proceso de copia de seguridad.
- Usar de técnicas de corrección.

### Tarea 3.3: Determinar una estrategia para mejorar el rendimiento

**Conocimientos de:**

- Arquitecturas de sistemas de alto rendimiento (por ejemplo, escalado automático, flotas de instancias y grupos de ubicación)
- Ofertas de servicios globales (por ejemplo, AWS Global Accelerator, Amazon CloudFront y servicios de computación periférica)
- Conjuntos y servicios de herramientas de supervisión (por ejemplo, CloudWatch)
- Acuerdos de nivel de servicios (SLA) e indicadores de rendimiento clave (KPI)

**Habilidades para:**

- Transformación de los requisitos empresariales en métricas medibles
- Pruebas de posibles soluciones de corrección y recomendaciones
- Propuesta de oportunidades para la adopción de nuevas tecnologías y servicios administrados
- Evaluación de soluciones y aplicación del dimensionamiento correcto en función de los requisitos
- Identificación y examinación de los cuellos de botella en el rendimiento

### Tarea 3.4: Determinar una estrategia para mejorar la fiabilidad

**Conocimientos de:**

- Infraestructura global de AWS
- Métodos de replicación de datos
- Metodologías de escalado (por ejemplo, equilibrio de carga, escalado automático)
- Alta disponibilidad y resistencia
- Métodos y herramientas de recuperación de desastres
- Cuotas y límites de servicios

**Habilidades para:**

- Comprender las tendencias de uso y crecimiento de aplicaciones.
- Evaluar la arquitectura existente para determinar las áreas que no son lo suficientemente fiables.
- Corregir los puntos únicos de error.
- Habilitar la replicación de datos, la reparación automática y las características y los servicios elásticos.

### Tarea 3.5: Identificar oportunidades de optimización de costos

**Conocimientos de:**

- Opciones de arquitectura rentables (por ejemplo, el uso de instancias de spot, políticas de escalado y recursos de dimensionamiento correcto)
- Adopciones de modelos de precios (por ejemplo, instancias reservadas, AWS Savings Plans)
- Costos de redes y transferencia de datos
- Administración de costos, alertas e informes

**Habilidades para:**

- Analizar informes de uso para identificar recursos poco utilizados y muy utilizados.
- Usar soluciones de AWS para identificar recursos no utilizados.
- Diseñar alarmas de facturación según los patrones de uso esperados.
- Investigar Informes de costo y uso de AWS a nivel granular.
- Usar el etiquetado para la asignación de costos y creación de informes.

---

## Dominio de contenido 4: Aceleración de la migración y la modernización de las cargas de trabajo

**Peso: 20 % del contenido con puntaje**

### Tareas

- **Tarea 4.1:** [[4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración|Seleccionar las cargas de trabajo y los procesos existentes para una posible migración.]]
- **Tarea 4.2:** [[4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes|Determinar el enfoque de migración óptimo para las cargas de trabajo existentes.]]
- **Tarea 4.3:** [[4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes|Determinar una nueva arquitectura para las cargas de trabajo existentes.]]
- **Tarea 4.4:** [[4.4 Determinar oportunidades de modernización y mejoras|Determinar oportunidades de modernización y mejoras.]]

### Tarea 4.1: Seleccionar las cargas de trabajo y los procesos existentes para una posible migración

**Conocimientos de:**

- Herramientas de evaluación y seguimiento de la migración (por ejemplo, AWS Migration Hub)
- Evaluación de carteras
- Planificación de activos
- Prioridad y migración de cargas de trabajo (por ejemplo, planificación de los conjuntos)

**Habilidades para:**

- Completar una evaluación de migración de aplicaciones.
- Evaluar las aplicaciones según las **siete estrategias de migración comunes (7Rs)**.
- Evaluar el costo total de propiedad (TCO).

### Tarea 4.2: Determinar el enfoque de migración óptimo para las cargas de trabajo existentes

**Conocimientos de:**

- Opciones y herramientas de migración de datos (por ejemplo, AWS DataSync, AWS Transfer Family, AWS Snow Family, Amazon S3 Transfer Acceleration)
- Herramientas de migración de aplicaciones (por ejemplo, AWS Application Discovery Service, AWS Application Migration Service)
- Servicios de redes y DNS de AWS (por ejemplo, AWS Direct Connect, AWS Site-to-Site VPN, Amazon Route 53)
- Servicios de identidad (por ejemplo, AWS IAM Identity Center, AWS Directory Service)
- Herramientas de migración de bases de datos (por ejemplo, AWS DMS, AWS SCT)
- Herramientas de gobernanza (por ejemplo, AWS Control Tower, AWS Organizations)

**Habilidades para:**

- Seleccionar el mecanismo de transferencia de base de datos adecuado.
- Seleccionar el mecanismo de transferencia de aplicaciones adecuado.
- Seleccionar el servicio de transferencia de datos y la estrategia de migración adecuados.
- Aplicar los métodos de seguridad adecuados a las herramientas de migración.
- Seleccionar el modelo de gobernanza adecuado.

### Tarea 4.3: Determinar una nueva arquitectura para las cargas de trabajo existentes

**Conocimientos de:**

- Servicios de computación (por ejemplo, Amazon EC2, AWS Elastic Beanstalk)
- Contenedores (por ejemplo, Amazon ECS, Amazon EKS, AWS Fargate, Amazon ECR)
- Servicios de almacenamiento de AWS (por ejemplo, Amazon EBS, Amazon EFS, Amazon FSx, Amazon S3, Volume Gateway de AWS Storage Gateway)
- Bases de datos (por ejemplo, Amazon DynamoDB, Amazon OpenSearch Service, Amazon RDS, bases de datos autogestionadas en Amazon EC2)

**Habilidades para:**

- Seleccionar la plataforma de computación adecuada.
- Seleccionar la plataforma de alojamiento de contenedores adecuada.
- Seleccionar el servicio de almacenamiento adecuado.
- Seleccionar la plataforma de base de datos adecuada.

### Tarea 4.4: Determinar oportunidades de modernización y mejoras

**Conocimientos de:**

- Ofertas de computación sin servidor (por ejemplo, AWS Lambda)
- Contenedores (por ejemplo, Amazon ECS, Amazon EKS, Fargate)
- Servicios de almacenamiento de AWS (por ejemplo, Amazon S3, Amazon EFS)
- Bases de datos personalizadas (por ejemplo, DynamoDB, Amazon Aurora sin servidor, ElastiCache)
- Servicios de integración (por ejemplo, Amazon SQS, Amazon SNS, Amazon EventBridge, AWS Step Functions)

**Habilidades para:**

- Identificar oportunidades para desacoplar los componentes de la aplicación.
- Identificar oportunidades para soluciones sin servidor.
- Seleccionar el servicio adecuado para los contenedores.
- Identificar oportunidades para bases de datos personalizadas.
- Seleccionar el servicio de integración de aplicaciones adecuado.

---

## Temas emergentes

Además de las preguntas basadas en la descripción del contenido de esta guía, es posible que también encuentre preguntas sobre tecnologías y prácticas emergentes que son cada vez más relevantes para la función de arquitecto de soluciones de nivel Profesional. Estos temas representan áreas en evolución de la arquitectura de nube y pueden aparecer como **preguntas de prueba previa** en el examen.

Las preguntas sobre estos temas emergentes se incluyen para evaluar el contenido nuevo y **no afectarán el puntaje de su examen**. Estas preguntas de prueba previa nos ayudan a garantizar que nuestras certificaciones se mantengan actualizadas con la evolución de las tecnologías de AWS y las prácticas recomendadas de arquitectura.

### Diseño de controles de seguridad y de inteligencia artificial responsable

**Habilidades para:**

- Implementar controles de filtrado de contenido y de conformidad normativa para los servicios de IA generativa (por ejemplo, mediante el uso de Barreras de protección de Amazon Bedrock).
- Implementar controles de acceso para aplicaciones de IA generativa y agéntica (por ejemplo, mediante el uso de AgentCore Identity).
- Diseñar flujos de trabajo de supervisión humana que incluyan mecanismos de aprobación para las operaciones de IA (por ejemplo, mediante el uso de AWS Step Functions).

---

## Referencias de servicios

Las siguientes secciones proporcionan información detallada sobre los servicios de AWS, las tecnologías y los conceptos relevantes para este examen de certificación:

- **Tecnologías y conceptos**
- **Servicios de AWS dentro del alcance**
- **Servicios de AWS fuera del alcance**
- **Menciones de los servicios de AWS en el examen**

### Tecnologías y conceptos

La siguiente lista contiene las tecnologías y los conceptos que pueden aparecer en el examen. Esta lista no es exhaustiva y está sujeta a cambios. El orden y la ubicación de los elementos de esta lista **no indican su ponderación ni importancia** relativos en el examen:

- Computación
- Administración de costos
- Base de datos
- Recuperación de desastres
- Alta disponibilidad
- Administración y gobernanza
- Microservicios y desacoplamiento de componentes
- Migración y transferencia de datos
- Redes, conectividad y entrega de contenido
- Seguridad
- Principios del diseño sin servidores
- Almacenamiento

### Servicios de AWS dentro del alcance

La siguiente lista contiene los servicios y las características de AWS que están dentro del alcance del examen. Esta lista no es exhaustiva y está sujeta a cambios. Las ofertas de AWS aparecen en categorías que se alinean con las funciones principales de las ofertas.

#### Análisis

- Amazon Athena
- AWS Data Exchange
- Amazon Data Firehose
- Amazon EMR
- AWS Glue
- Amazon Kinesis Data Streams
- AWS Lake Formation
- Amazon Managed Service para Apache Flink
- Amazon Managed Streaming para Apache Kafka (Amazon MSK)
- Amazon OpenSearch Service
- Amazon QuickSight

#### Integración de aplicaciones

- Amazon AppFlow
- AWS AppSync
- Amazon EventBridge
- Amazon MQ
- Amazon Simple Notification Service (Amazon SNS)
- Amazon Simple Queue Service (Amazon SQS)
- AWS Step Functions

#### Blockchain

- Amazon Managed Blockchain

#### Aplicaciones empresariales

- Amazon Simple Email Service (Amazon SES)

#### Administración financiera en la nube

- AWS Budgets
- Informe de costo y uso de AWS
- AWS Cost Explorer
- Savings Plans

#### Computación

- AWS App Runner
- AWS Auto Scaling
- AWS Batch
- AWS Elastic Beanstalk
- Amazon Elastic Compute Cloud (Amazon EC2)
- Amazon EC2 Auto Scaling
- AWS Fargate
- AWS Lambda
- Amazon Lightsail
- AWS Outposts
- AWS Wavelength

#### Contenedores

- Amazon Elastic Container Registry (Amazon ECR)
- Amazon Elastic Container Service (Amazon ECS)
- Amazon ECS Anywhere
- Amazon Elastic Kubernetes Service (Amazon EKS)
- Amazon EKS Anywhere
- Amazon EKS Distro

#### Base de datos

- Amazon Aurora
- Amazon Aurora sin servidor
- Amazon DocumentDB (compatible con MongoDB)
- Amazon DynamoDB
- Amazon ElastiCache
- Amazon Keyspaces (para Apache Cassandra)
- Amazon Neptune
- Amazon Relational Database Service (Amazon RDS)
- Amazon Redshift
- Amazon Timestream

#### Herramientas para desarrolladores

- AWS CodeArtifact
- AWS CodeBuild
- AWS CodeDeploy
- Amazon CodeGuru
- AWS CodePipeline
- AWS X-Ray

#### Computación para usuarios finales

- Amazon AppStream 2.0
- Amazon WorkSpaces

#### Frontend web y móvil

- AWS Amplify
- Amazon API Gateway
- AWS Device Farm
- Amazon Pinpoint

#### Internet de las cosas (IoT)

- AWS IoT Core
- AWS IoT Device Defender
- AWS IoT Device Management
- AWS IoT Events
- AWS IoT Greengrass
- AWS IoT SiteWise
- AWS IoT Things Graph
- AWS IoT 1-Click

#### Machine learning

- Amazon Comprehend
- Amazon Fraud Detector
- Amazon Kendra
- Amazon Lex
- Amazon Personalize
- Amazon Polly
- Amazon Rekognition
- Amazon SageMaker AI (anteriormente conocida como Amazon SageMaker)
- Amazon Textract
- Amazon Transcribe
- Amazon Translate

#### Servicios multimedia

- Amazon Elastic Transcoder
- Amazon Kinesis Video Streams

#### Administración y gobernanza

- AWS CloudFormation
- AWS CloudTrail
- Amazon CloudWatch
- Amazon CloudWatch Logs
- Interfaz de la línea de comandos de AWS (AWS CLI)
- AWS Compute Optimizer
- AWS Config
- AWS Control Tower
- Panel de AWS Health
- AWS License Manager
- Amazon Managed Grafana
- Amazon Managed Service para Prometheus
- Consola de administración de AWS
- AWS Organizations
- AWS Proton
- AWS Service Catalog
- Service Quotas
- AWS Systems Manager
- AWS Trusted Advisor
- Herramienta de AWS Well-Architected

#### Migración y transferencia

- AWS Application Discovery Service
- AWS Application Migration Service
- AWS Database Migration Service (AWS DMS)
- AWS DataSync
- AWS Migration Hub
- Herramienta de conversión de esquemas de AWS (AWS SCT)
- AWS Snow Family
- AWS Transfer Family

#### Redes y entrega de contenido

- Amazon CloudFront
- AWS Direct Connect
- Elastic Load Balancing (ELB)
- AWS Global Accelerator
- AWS PrivateLink
- Amazon Route 53
- AWS Transit Gateway
- Amazon Virtual Private Cloud (Amazon VPC)
- AWS VPN

#### Seguridad, identidad y cumplimiento

- AWS Artifact
- AWS Audit Manager
- AWS Certificate Manager (ACM)
- AWS CloudHSM
- Amazon Cognito
- Amazon Detective
- AWS Directory Service
- AWS Firewall Manager
- Amazon GuardDuty
- AWS IAM Identity Center
- AWS Identity and Access Management (IAM)
- Amazon Inspector
- AWS Key Management Service (AWS KMS)
- Amazon Macie
- AWS Network Firewall
- AWS Resource Access Manager (AWS RAM)
- AWS Secrets Manager
- AWS Security Hub
- AWS Security Token Service (AWS STS)
- AWS Shield
- AWS WAF

#### Almacenamiento

- AWS Backup
- Amazon Elastic Block Store (Amazon EBS)
- Recuperación elástica ante desastres de AWS
- Amazon Elastic File System (Amazon EFS)
- Amazon FSx (para todos los tipos)
- Amazon Simple Storage Service (Amazon S3)
- Amazon S3 Glacier
- AWS Storage Gateway

### Servicios de AWS fuera del alcance

La siguiente lista contiene los servicios y las características de AWS que están fuera del alcance del examen. Esta lista no es exhaustiva y está sujeta a cambios. Las ofertas de AWS que no tienen ninguna relación con los roles laborales objetivo para el examen se excluyen de esta lista:

#### Tecnología de juegos

- Amazon GameLift

### Menciones de los servicios de AWS en el examen

AWS Certification reduce la carga de lectura de este examen mediante el uso de **nombres abreviados oficiales** para los nombres de servicios de AWS conocidos que contienen abreviaturas o información entre paréntesis. Por ejemplo, Amazon Simple Notification Service (Amazon SNS) aparece en el examen como Amazon SNS.

La característica de ayuda del examen (disponible para todas las preguntas) contiene la lista de los nombres abreviados de los servicios de AWS y sus nombres completos correspondientes. Puede consultar los nombres de los servicios de AWS en el sitio web de AWS Certification para ver la lista de los servicios que aparecen como nombres abreviados en el examen. Los servicios que figuran en la lista pero que están fuera del alcance del examen no aparecerán en él.

> [!note] Sobre las abreviaturas
> No todas las abreviaturas están completamente explicadas en el examen ni están disponibles en
> la característica de ayuda. El nombre completo oficial de algunos servicios de AWS incluye
> una abreviatura que nunca se amplía (por ejemplo, Amazon API Gateway, Amazon EMR). El examen
> también puede contener otras abreviaturas que se espera que el público objetivo conozca.

---

## Encuesta

¿Qué tan útil fue esta guía de examen? AWS invita a informar mediante su encuesta en <https://aws.amazon.com/certification/faqs/>.

---

## Notas relacionadas

- [[Definicion servicios]] — definiciones de los servicios AWS del alcance del examen
- [[README]] — propósito y método de estudio de esta bóveda

---

> [!quote] Aviso
> Material de estudio personal con fines educativos. La guía de examen es propiedad de Amazon
> Web Services. No existe relación ni afiliación con AWS ni con SAP SE.
