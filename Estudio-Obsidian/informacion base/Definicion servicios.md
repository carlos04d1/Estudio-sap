---
title: "Definición de servicios AWS"
aliases:
  - "definicion servicios"
  - "Servicios AWS"
tags:
  - certificacion/aws
  - sap-c02
  - servicios
  - referencia
status: referencia
fuente: "Alcance definido en [[Guia AWS]] → Referencias de servicios"
---

# Definición de servicios AWS

> [!abstract] Para qué sirve esta nota
> Catálogo de los servicios AWS que están **dentro del alcance del examen SAP-C02**, con una
> definición de una línea y, sobre todo, **la distinción clave frente a los servicios parecidos**.
> El examen no pregunta "¿qué hace este servicio?" sino *"estos dos servicios se parecen en
> X, ¿cuál elijo?"*. Por eso lo importante es la columna de **distinción**.

> [!info] Cómo estudiar esta nota
> No la leas de arriba abajo como un manual. Study por dominio:
> el [[Guia AWS|Dominio 1]] trae entre paréntesis los servicios de redes, el Dominio 3 los de
> observabilidad y gobernanza, el Dominio 4 los de migración. Cada dominio tiene su propia nota
> de estudio que debe enlazar a esta.

Índice de categorías:

[[#Análisis]] · [[#Integración de aplicaciones]] · [[#Blockchain]] · [[#Aplicaciones empresariales]] · [[#Administración financiera en la nube]] · [[#Computación]] · [[#Contenedores]] · [[#Base de datos]] · [[#Herramientas para desarrolladores]] · [[#Computación para usuarios finales]] · [[#Frontend web y móvil]] · [[#Internet de las cosas (IoT)]] · [[#Machine learning]] · [[#Servicios multimedia]] · [[#Administración y gobernanza]] · [[#Migración y transferencia]] · [[#Redes y entrega de contenido]] · [[#Seguridad, identidad y cumplimiento]] · [[#Almacenamiento]]

---

## Análisis

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon Athena** | Consultas SQL interactivas y ad-hoc sobre datos en S3, sin gestionar infraestructura. Paga por TB escaneados. | Serverless, sin clúster. Para datos *en reposo en S3*, no para datos que llegan en streaming. |
| **AWS Data Exchange** | Marketplace privado para compartir datasets entre cuentas y con proveedores. | Es un **intercambio de datos entre organizaciones**, no un almacén. |
| **Amazon Data Firehose** | Ingesta y *delivery* en streaming hacia S3, OpenSearch, Redshift, etc. | Transfiere y transforma, **no consulta**. Se usa como destino de Kinesis. |
| **Amazon EMR** | Hadoop/Spark gestionado para grandes volúmenes de datos (*big data*) por lotes y streams. | Clusters de Spark/Hadoop autogestionados. Clásico para machine learning a escala. |
| **AWS Glue** | Catálogo de datos + ETL serverless. Crea crawlers y trabajos de ETL. | El **catálogo** es lo que Athena y Redshift Spectrum usan para saber qué hay en S3. |
| **Amazon Kinesis Data Streams** | Ingesta de datos en tiempo real a escala, ordenada por *shards*. | Streaming **ordenado y persistente**, vs. SQS como cola. |
| **AWS Lake Formation** | Orquestación y gobierno sobre el *data lake* en S3, en vez de dejarlo auto-descubrirse todo. | Controla **qué datos puede ver cada grupo** dentro del lago. |
| **Amazon Managed Service for Apache Flink** | Flink gestionado para procesamiento de streams Exactly-Once. | Watermarking, windows, eventos. Más potente que Kinesis para lógica de streams compleja. |
| **Amazon MSK** | Kafka gestionado. | Recibe eventos del mundo Kafka existente, no los produce AWS. |
| **Amazon OpenSearch Service** | Búsqueda y análisis de logs / analítica near-real-time. | Sustituye a **Elasticsearch autoalojado**. Machine learning para anomalías. |
| **Amazon QuickSight** | BI y visualización business intelligence con precios por sesión o por usuario. | Capa de BI sobre Athena / OpenSearch / RDS. |

## Integración de aplicaciones

> [!tip] Patrón a memorizar
> ¿Desacoplar procesamiento asíncrono? → **SQS**. ¿Notificar a muchos consumidores?
> → **SNS**. ¿Comunicación por eventos, con arquitectura basada en eventos? → **EventBridge**.
> ¿Coreografía, sin orquestador central? → **SNS/SQS/EventBridge**. ¿Orquestación explícita
> paso a paso? → **Step Functions**.

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon AppFlow** | Mueve datos de SaaS (Salesforce, Slack…) a servicios AWS de forma segura e integrada. | **Integración SaaS**, no integración entre servicios AWS. |
| **AWS AppSync** | Backend serverless para APIs GraphQL y WebSocket. | Solo **GraphQL/WebSocket**. REST es API Gateway. |
| **Amazon EventBridge** | Bus de eventos con enrutamiento a destinos AWS y SaaS. 1 evento ≈ 75 destinos. | Globos de eventos y **enrutamiento de eventos**, ≠ cola de mensajes. |
| **Amazon MQ** | Broker gestionado para ActiveMQ o RabbitMQ. | Para migrar **MQ existente** a AWS sin reescribir. |
| **Amazon SNS** | Servicio de publicación y suscripción de topics para **fan-out**. | Notificaciones push, email, SMS, fan-out a múltiples colas. |
| **Amazon SQS** | Cola administrada para desacoplar aplicaciones a escala. **Entrega al menos una vez** (estándar); FIFO con deduplicación y orden. | Cola de trabajo, ≈ **buffer** o **decoupling**. No pub/sub. |
| **AWS Step Functions** | Orquestación de workflows como máquina de estados, con compensated transactions. | **Orquestador explícito** (vs. coreografía con eventos). Visibilidad y reintentos por paso. |

## Blockchain

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon Managed Blockchain** | Redes *permissioned* (Hyperledger Fabric y Ethereum) administradas. | Ledger distribuido compartido y permissioned. Fuera de alcance del examen solo *GameLift*. |

## Aplicaciones empresariales

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon SES** | Envío de email transaccional y de campañas a escala. | Amazon Simple Email **Service** — envío de correo. |

## Administración financiera en la nube

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS Budgets** | Alertas de gasto y presupuesto (y a veces límites duros de servicio). | Notificación configurable por umbral; **CloudWatch Events para automatizar**. |
| **Informe de costo y uso de AWS** | Informe de consumo heredado, por producto y por etiqueta, disponible ~24 h después. | Base de datos Athena para consultas granulares. Complemento de Cost Explorer. |
| **AWS Cost Explorer** | Visualización de costos por consumidor, vinculado a Savings Plans y RIs. | Paga por vista de datos. En su límite: → **Cost and Usage Report** en S3. |
| **Savings Plans** | Compromiso de uso 1 o 3 años a cambio de descuento, en **instancia / cómputo / familia**. | Más flexible que las RIs.Forzar excedentes con usar `Savings Plans` cuando RIs Compute Instance son más baratas. |

## Computación

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS App Runner** | Despliega contenedores fuente desde un repositorio Git, con escalado automático. | **Fuente → URL**, sin gestionar infraestructura. |
| **AWS Auto Scaling** | Grupo de escalado automático con plantillas de lanzamiento, health checks,Amazon EC2 Auto Scaling. | Sadd: es el **mecanismo**, losLaunch templates y CloudFormation son piezas. |
| **AWS Batch** | Trabajo por lotes (batch) a escala sobre **EC2 / Fargate / Spot**, según coste. | No necesita cola gestionada: **AWS Batch ↔ Amazon ECS**. |
| **AWS Elastic Beanstalk** | Plataforma PaaS: sube tu código y administra EC2, balanceo, escalado. | Nivel de abstracción "administración" frente a Lambda o Fargate. |
| **Amazon EC2** | Máquinas virtuales. Amplio catálogo de familias de instancias. | Base de cómputo; elige familia por workload (burstable, optimised, etc.). |
| **Amazon EC2 Auto Scaling** | Automatiza el aprovisionamiento de instancias EC2 en varias AZs. | Programar capacidad automáticamente según métricas. |
| **AWS Fargate** | Capacidad serverless de contenedores bajo ECS/EKS. | Solo la **computación de contenedor**, sin máquinas. |
| **AWS Lambda** | Ejecución de código por evento, serverless. Paga por duración. | 15 min máximo por ejecución. Escala horizontalmente y **no por defecto**. |
| **Amazon Lightsail** | Instancias, almacenamiento y DNS simples con precio fijo. | RDS, caché, IP fija, DNS gestionado con coste fijo. |
| **AWS Outposts** | Extensión de la infraestructura AWS on-premises con MicroEnvs para baja latencia. | On-premises con racks comerciales, no es lo mismo que Zonas locales. |
| **AWS Wavelength** | Ejecuta instancias de contenedor en el borde de la red de la operadora (5G). | Deploy dentro del **edge del operador**. |

## Contenedores

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon ECR** | Registro privado de imágenes Docker/OCI. | Solo **almacena imágenes**. |
| **Amazon ECS** | Orquestador de contenedores AWS, integrado nativamente con IAM y VPC. | **ECS Anywhere** = ECS para cargas híbridas fuera de AWS. |
| **Amazon ECS Anywhere** | Ejecuta ECS en centros de datos on-premises/híbrido. | Difiere de Outposts: no requiere un rack Outposts. |
| **Amazon EKS** | Orquestador **Kubernetes** gestionado. Compatible con API de K8s. | Kubernetes puro, no propietario. |
| **Amazon EKS Anywhere** | EKS para hybrid/multicloud, igual que ECS Anywhere. | Extensión de EKS fuera de AWS. |
| **Amazon EKS Distro** | Permite ejecutar el plano de control de EKS en tu propio hardware. | EKS Distro = clusters de K8s downstream; EKS Anywhere = experiencia EKS gestionada. |

## Base de datos

> [!tip] Patrón a memorizar
> Relacional → **RDS** / **Aurora**. No relacional clave-valor → **DynamoDB**.
> Clave-valor en caché → **ElastiCache** / **MemoryDB**. Grafos → **Neptune**.
> Series de tiempo → **Timestream**. Search → **OpenSearch**. Columnar analítico → **Redshift**.
> Compatible MongoDB → **DocumentDB**. Compatible Cassandra → **Keyspaces**.

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon Aurora** | MySQL/PostgreSQL gestionado de AWS, hasta 5× más rápido que RDS equivalente. | Optimizado para **alto rendimiento** y readers. Aurora Serverless v2 escala por Aurora Capacity Units. |
| **Amazon Aurora sin servidor** | Aurora Serverless v2: capacidad gestionada automáticamente. | A diferencia de v1, en v2 **sí es personalizable y Aurora-compatib**. |
| **Amazon DocumentDB** | Base de datos de documentos compatible con MongoDB. | Compatible con MongoDB / API de Cassandra. |
| **Amazon DynamoDB** | Base de datos NoSQL clave-valor serverless, de baja latencia en milisegundos. | Tabla única; requiere modelado de clave de partición y orden para escalar. |
| **Amazon ElastiCache** | Redis OSS y Memcached gestionados para caché en memoria. | **Valkey** (fork de Redis) también disponible. |
| **Amazon Keyspaces** | Base de datos serverless compatible con Apache Cassandra. | Compatible con Cassandra, pero **solo disponible para Cassandra y estilo documento**. |
| **Amazon Neptune** | Base de datos de grafos para relaciones complejas. | Relaciones de grafos, noDocuments (DocumentDB) ni clave-valor (DynamoDB). |
| **Amazon RDS** | Servicio gestionado para bases de datos relacionales (MySQL, PostgreSQL, Oracle...). | Incluye **despliegue multi-AZ** yréplicas de lectura. No es una base de datos serverless. |
| **Amazon Redshift** | Data warehouse analítico columnar de alto rendimiento. | **Serverless** disponible. Optimizado para informes y analítica, no para OLTP. |
| **Amazon Timestream** | Base de datos de series de tiempo. | Ingesta de series temporales, retención por etapas. |

## Herramientas para desarrolladores

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS CodeArtifact** | Repositorio privado de paquetes (Maven, npm, pip...). | Registro de paquetes, ≠ Git. |
| **AWS CodeBuild** | Servicio de **build y pruebas** (integrado con CodePipeline). | Solo compilación/pruebas. No despliega. |
| **AWS CodeDeploy** | Despliegue automatizado a EC2, Lambda, ECS/EKS. | **Solo despliegue**, sin compilación ni orquestación de pipeline. |
| **Amazon CodeGuru** | Revisión de código con IA y optimizaciones de rendimiento. | Análisis automático de calidad/rendimiento. |
| **AWS CodePipeline** | Orquestación de CI/CD de extremo a extremo. | Une CodeBuild / CodeDeploy. |
| **AWS X-Ray** | Trazas de extremo a extremo y mapa de servicios para depurar aplicaciones distribuidas. | Observabilidad de **aplicación distribuida**, no de infraestructura. |

## Computación para usuarios finales

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon AppStream 2.0** | Escritorio virtual gestionado para aplicaciones, para clientes. | Similar a WorkSpaces, basado en **SIS/streaming de apps**. |
| **Amazon WorkSpaces** | Escritorios virtuales gestionados para empleados. | VDI persistente; ≠ streaming de aplicaciones. |

## Frontend web y móvil

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS Amplify** | Plataforma administrada para **crear, alojar y desplegar** apps web/móvil, con CI/CD. | Hosting + backend (GraphQL, Cognito, S3). **CloudFront + S3** es la alternativa manual. |
| **Amazon API Gateway** | Crea, publica, supervisa y protege APIs REST, HTTP y WebSocket. | **REST/HTTP**, no GraphQL (eso es AppSync). Cuenca frente a VPC Link. |
| **AWS Device Farm** | Pruebas de apps en dispositivos reales en la nube. | Testing en dispositivos reales. |
| **Amazon Pinpoint** | Analítica de interacción para campañas de notificación. | Interacción y campañas push/email; ≠ servicio de email (SES). |

## Internet de las cosas (IoT)

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS IoT Core** | Núcleo del servicio de IoT: conexiones de dispositivos, mensajes y shadow. | Mensajería de dispositivos bidireccional. |
| **AWS IoT Device Defender** | Auditoría de seguridad y cumplimiento de dispositivos IoT. | Auditoría de flotas de dispositivos. |
| **AWS IoT Device Management** | Registro, búsqueda y agrupación de dispositivos; actualizaciones remotas. | Over-the-air updates, organization y fleet index. |
| **AWS IoT Events** | Detección de eventos de dispositivos y acción automática. | Basado en **máquinas de estados de eventos**, no en reglas. |
| **AWS IoT Greengrass** | Runtime para IoT en el borde, con ejecución local. | IoT **en el dispositivo/nave**, no en la nube. |
| **AWS IoT SiteWise** | Almacenamiento y análisis de datos de **equipos industriales**. | Datos de planta/activos industriales, ≠ telemetría genérica. |
| **AWS IoT Things Graph** | Modelo de datos y consultas de relaciones entre dispositivos. | **Grafo de shadow y relaciones de dispositivos.** |
| **AWS IoT 1-Click** | Pedidos de un solo botón para dispositivos preintegrados con AWS. | Soluciones preintegradas de un solo botón. |

## Machine learning

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon Comprehend** | NLP: extracción de entidades, sentiment, clasificación de documentos. | Procesamiento de texto. |
| **Amazon Fraud Detector** | Detección de fraude en tiempo real con modelos entrenados. | **Antifraude** especializado. |
| **Amazon Kendra** | Búsqueda empresarial sobre contenido de múltiples fuentes. | Búsqueda semántica en documentos corporativos. |
| **Amazon Lex** | Conversational AI: chatbots de texto y voz. | Se apoya en Polly y Transcribe. |
| **Amazon Personalize** | Motor de recomendaciones en tiempo real. | Recomendaciones personalizadas. |
| **Amazon Polly** | **Texto a voz** (sintesis de voz) en múltiples idiomas. | Solo **TTS**, no STT (eso es Transcribe). |
| **Amazon Rekognition** | Visión por computadora: rostro, texto en imagen, análisis de vídeo. | Análisis de imagen y vídeo. |
| **Amazon SageMaker AI** | Plataforma para construir, entrenar, ajustar y desplegar modelos ML. | Plataforma ML completa. **Amazon Bedrock** es la alternativa *foundation models* (IA generativa). |
| **Amazon Textract** | Extracción de texto, formularios y tablas en documentos escaneados. | OCR avanzado para documentos. |
| **Amazon Transcribe** | **Voz a texto** (STT). | Micrófono → transcripción. |
| **Amazon Translate** | Traducción de texto en tiempo real. | Traducción neuronal. |

## Servicios multimedia

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon Elastic Transcoder** | Conversión por lotes de video entre formatos y resoluciones. | Transcodificación **de vídeo por lotes** a medida. |
| **Amazon Kinesis Video Streams** | Ingesta y procesamiento de flujos de vídeo en tiempo real. | Solo **vídeo** en streaming; ≠ Kinesis Data Streams (datos genéricos). |

## Administración y gobernanza

> [!tip] Patrón a memorizar
> Observabilidad de infraestructura → **CloudWatch**. del código de la API →
> CloudTrail. Configuración desired vs real → **Config**. Automatizar todo lo anterior →
> **Systems Manager**. Envs multi-cuenta estandarizados → **Control Tower** sobre
> **Organizations**. Teoría → **Trusted Advisor**. AWS te dice qué instances están
> sobredimensionadas → **Compute Optimizer**.

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS CloudFormation** | Infraestructura como código declarativa por plantillas YAML/JSON. | IaC **nativo de AWS**, plantillas personalizables. ≠ OpenTofu/Terraform. |
| **AWS CloudTrail** | Registro de todas las llamadas a la API (quién, cuándo, qué, desde dónde). | **API activity y auditoría**. No es un log de aplicación. |
| **Amazon CloudWatch** | Métricas, alarmas, logs y eventos de todos los recursos. | Almacenamiento a largo plazo de métricas **o logs** con **Athena**. |
| **Amazon CloudWatch Logs** | Servicio de gestión y almacenamiento de logs; retención configurable. | Subservicio de CloudWatch, con Insights para consultas. |
| **AWS CLI** | Interfaz de línea de comandos para interactuar con los servicios. | Para automatizar y consultar recursos. |
| **AWS Compute Optimizer** | Analiza uso y recomienda el dimensionamiento y tipo de instancia. | Dimensionamiento correcto, no optimizador de arquitectura. |
| **AWS Config** | Inventario de recursos y auditoría de configuración desired vs real. | Detecta **deriva** entre Playbooks y lo implementado. |
| **AWS Control Tower** | Orquestación de cuentas, políticas deforcement y Landing Zones multi-cuenta. | Landing zones estandarizadas, sobre Organizations. |
| **Panel de AWS Health** | Estado de los servicios y eventos que afectan tu cuenta. | Aisle de salud operativo. |
| **AWS License Manager** | Gestiona licencias de software en toda la organización. | Inventario y cumplimiento de licencias. |
| **Amazon Managed Grafana** | Grafana gestionado con secure integrations y dashboards. | Dashboards; ≠ CloudWatch solo. |
| **Amazon Managed Service for Prometheus** | Prometheus gestionado, integrado con Grafana y descubre objetivos. | **Métricas** open-source Prometheus. |
| **Consola de administración de AWS** | Panel unificado para gestionar servicios y cuenta. | Interfaz web unificada. |
| **AWS Organizations** | Gobierno centralizado multi-cuenta (SCP, unidades organizativas, OU). | SCPs restringen permisos a nivel de cuenta; no es IAM. |
| **AWS Proton** | Plantillas y herramientas gestionadas para crear entornos *serverless*. | Acelera la configuración de entornos sin servidor. |
| **AWS Service Catalog** | Catálogo centralizado de servicios, productos y aprovisionamiento. | Share punto de acceso a catálogo y productos de la empresa. |
| **Service Quotas** | Gestiona cuotas de servicio y solicita aumentos. | Ajuste de límites por servicio/región. |
| **AWS Systems Manager** | Gestiona VMs, parches automáticos, Parameter Store, Run Command y Session Manager. | Combina **gestión + automatización**. Cada tarea usa su documento. |
| **AWS Trusted Advisor** | Recomendaciones de costos, seguridad, rendimiento,Operaciones y límites. | Solo para cuentas **Business/Enterprise**; no es configurable. |
| **Herramienta de AWS Well-Architected** | Revisiones y cuestionarios del Framework Well-Architected. | Revisión de arquitectura, no herramienta de IaC. |

## Migración y transferencia

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS Application Discovery Service** | Inventario y dependencias de aplicaciones (agents). | Alimenta el plan de migración. |
| **AWS Application Migration Service** | Migración de VMs AWS → AWS conCMF. | Replicación continua de VMs,≠ DMS. |
| **AWS Database Migration Service (DMS)** | Replicación y migración de bases de datos (CDC + carga). | Datos + esquema, no servidores de aplicación. |
| **AWS DataSync** | Transferencia de archivos entre local y S3/NFS. | File transfer, automatizado. |
| **AWS Migration Hub** | Portal centralizado para descubrir apps y rastrear su migración. | Dashboard de migración. |
| **AWS SCT** | Convierte esquemas de bases de datos on-premises a cloud. | Se usa **junto a DMS**. |
| **AWS Snow Family** | Dispositivos físicos para mover petabytes de datos sin red. | Snowball, Snowball Edge, Snowcone. **Offline**. |
| **AWS Transfer Family** | SFTP, FTP y FTPS para mover archivos a S3. | Sustituye a servidores de transferencia. |

## Redes y entrega de contenido

> [!tip] Patrón a memorizar
> Global para accelerating apps estáticas/global → **CloudFront**. Reenvío TCP/UDP
> estático de extremo a extremo → **Global Accelerator**. VPC ↔ VPC → **Peering** o
> **Transit Gateway**. VPC ↔ on-premises → **VPN / Direct Connect**. Exponer un servicio
> **como servicio AWS** sin internet público → **PrivateLink**. Balanceo → **ELB/ALB/NLB**.
> Resolución y enrutamiento DNS con health checks → **Route 53**.

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **Amazon CloudFront** | CDN global que entrega contenido desde ubicaciones perimetrales. | Acelera contenido estático/dinámico vía cache en el borde. |
| **AWS Direct Connect** | Conexión de red dedicada física entre on-premises y AWS. | **Dedicada**, privada, estable; precio fijo por hora de puerto. |
| **Elastic Load Balancing (ELB)** | Distribución de tráfico entre múltiples objetivos. | **ALB** (HTTP/HTTPS, L7), **NLB** (TCP/UDP, IP estático), **GWLB**. |
| **AWS Global Accelerator** | Red global anycast que acelera apps TCP/UDP usandoAccelerators. | No es CDN de contenido; optimiza conexión **de red**. |
| **AWS PrivateLink** | Conecta privately a servicios AWS a través de ENIs sin salir a internet. | Endpoint-based; **Private Endpoint** vs. **VPC Endpoint Services**. |
| **Amazon Route 53** | Servicio de DNS gestionado + traffic flow + health checks. | 53 es la **dirección de IP de AWS** que resuelve Site-to-Site VPN. |
| **AWS Transit Gateway** | Hub de interconexión de VPCs, on-premises y otras regiones. | **Hub-and-spoke** centralizado, reduce conexiones N×N. |
| **Amazon VPC** | Red virtual aislada con subredes, IGW, NAT, security groups. | Tabla de enrutamiento no puede reenviar tráfico de entrada de ENI. |
| **AWS VPN** | Conexión cifrada sobre internet (Site-to-Site) a la VPC. | **AWS Client VPN** para usuarios → Access Analyzer. |

## Seguridad, identidad y cumplimiento

> [!tip] Patrón a memorizar
> Permisos → **IAM** / **IAM Identity Center** (SSO). **Cifrado en reposo** → **KMS**. Cifrado
> en tránsito → **ACM** / TLS. **WAF** solo protege capa 7 web; **Shield** protege DDoS;
> **Network Firewall** filtra tráfico dentro de la VPC. Secretos dinámicos → **Secrets
> Manager**. Trazabilidad de recursos compartidos → **Security Hub / Config**. Sistema de
> detección de intrusiones → **GuardDuty**.

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS Artifact** | Descarga de informes de cumplimiento (SOC, ISO, PCI). | Informes y auditorías, no servicio de seguridad. |
| **AWS Audit Manager** | Genera evidencia de auditoría para demostrar cumplimiento. | Evidencia y evaluación continua. |
| **AWS Certificate Manager (ACM)** | Provisiona, administra y renueva certificados TLS/SSL. | Para balanceadores, CloudFront y **NLBs**. |
| **AWS CloudHSM** | Módulo de seguridad de hardware dedicado para HSM. | HSM **dedicado y personalizable**. |
| **Amazon Cognito** | Identidad de usuario para apps web/móvil (registro, login, SSO). | **Federación de identidades de usuarios finales**, no de empleados. |
| **Amazon Detective** | Investigación de alertas de seguridad con grafos. | Análisis forense; usa GuardDuty como fuente. |
| **AWS Directory Service** | Directorio corporativo (Microsoft AD, Simple AD, AD Connector). | Managed Microsoft AD parahybrid. |
| **AWS Firewall Manager** | Firewall manager centralizado para múltiples cuentas. | Aplica políticas WAF, Shield y Security Group centralizadas. |
| **Amazon GuardDuty** | Detección de amenazas administrada (vpc flow logs + ML). | Detección de **intrusiones** en cuentas y computación. |
| **AWS IAM Identity Center** | Inicio de sesión único (SSO) corporativo con AWS Directory Service. | **Federación corporativa** (antiguamente AWS SSO). |
| **AWS Identity and Access Management (IAM)** | Identidades, políticas, roles y permisos. Global, por cuenta. | Policies para **API calls**, no para el tráfico de red. |
| **Amazon Inspector** | Gestiona escaneos de vulnerabilidades **sin agentes** en EC2 y contenedores. | Solo detección de **vulnerabilidades de paquetes**. |
| **AWS Key Management Service (AWS KMS)** | Generación y gestión de claves de cifrado y rotación. | Claves **controladas por el cliente**. AWS Encryption es una opción predeterminada. |
| **Amazon Macie** | Descubre y clasifica datos sensibles con ML en S3. | **PII** en S3, no en EC2. |
| **AWS Network Firewall** | Stateful firewall de alto rendimiento para VPC. | Control de tráfico **dentro de la VPC**, no exposición pública. |
| **AWS Resource Access Manager (RAM)** | Comparte recursos entre cuentas y dentro de OU. | Transversal; ≠ IAM. |
| **AWS Secrets Manager** | Almacena, rota y recupera secretos de forma nativa. | Secretos con rotación automática. |
| **AWS Security Hub** | Agrega hallazgos de seguridad en una vista central. | Hub y CSPM; **centraliza** métricas. |
| **AWS Security Token Service (AWS STS)** | Emite tokens temporales para AssumeRole, federation e identidad. | **Credenciales temporales** de corto plazo. |
| **AWS Shield** | Protección DDoS gestionada y detección de ataques. | Always-on, Standard (gratuito) y Advanced (24/7 con coste). |
| **AWS WAF** | Firewall de aplicación web (L7) frente a SQLi/XSS/bots. | **Solo web**; no es un Network Firewall. |

## Almacenamiento

| Servicio | Qué es | Distinción clave |
| --- | --- | --- |
| **AWS Backup** | Servicio de gestión centralizada de backups. | **Cross-service** (EC2, EBS, RDS, Aurora, S3…), policies y vaults. |
| **Amazon Elastic Block Store (Amazon EBS)** | Volúmenes de bloque persistentes para EC2. | Cifrado y snapshots; un **volumen en una instancia a la vez**. |
| **Recuperación elástica ante desastres de AWS** | Servicio regional y global de DR. | Alternativa a **AWS Backup**. |
| **Amazon Elastic File System (Amazon EFS)** | Sistema de archivos elástico compartido (NFS) para Linux. | El NFS más fácil de montar, compartido entre EC2 y Lambda. |
| **Amazon FSx** | Almacenamiento de archivos para **Windows** (SMB), **Lustre**, OpenZFS, NetApp. | Lustre para HPC; ≠ OpenSearch. |
| **Amazon Simple Storage Service (Amazon S3)** | Almacenamiento de objetos masivo, ilimitado, 11 nines. | Clases: Standard / Infrequent Access / **Glacier** (Instant/Flexible/Deep Archive). |
| **Amazon S3 Glacier** | Clases de archivo económico de largo plazo. | Recuperación de minutos a horas según la clase. |
| **AWS Storage Gateway** | Almacenamiento local + iSCSI/NFS/SMB hacia S3. | **On-premises ↔ S3**, integración de datos existentes. |

---

## Notas relacionadas

- [[Guia AWS]] — fuente oficial de este catálogo
- [[README]] — método de estudio
