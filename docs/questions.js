// Banco de preguntas SAP-C02 v3 (100 preguntas: Set 1 + Set 2 balanceadas y sin decoradores)
window.ALL_QUESTIONS = [
  {
    "id": 1,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 60 VPC repartidas en 25 cuentas de AWS (todas en AWS Organizations) en la Región us-east-1 y un centro de datos corporativo conectado a AWS con dos conexiones de AWS Direct Connect. Requisitos:\n\n1. Las VPC de producción y de desarrollo no deben poder comunicarse entre sí.\n2. Ambos tipos de VPC deben poder comunicarse con el centro de datos.\n3. No se desea mantener una malla de conexiones entre VPC.\n4. Se requiere la menor sobrecarga operativa.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear una malla completa de conexiones VPC peering entre todas las VPC y asociar una interfaz virtual privada (private VIF) de Direct Connect a un Virtual Private Gateway en cada una de las 60 VPC."
      },
      {
        "key": "B",
        "text": "Crear un AWS Transit Gateway en una cuenta de red, compartirlo con las demás cuentas mediante AWS RAM, usar tablas de rutas de tránsito separadas para producción y desarrollo, y conectar el centro de datos con un Direct Connect gateway y una VIF de tránsito."
      },
      {
        "key": "C",
        "text": "Desplegar clústeres de instancias EC2 con software de enrutamiento VPN en una VPC central de tránsito, configurar conexiones IPsec hacia cada VPC mediante un Network Load Balancer y conectar la red local mediante dos VIFs privadas dedicadas."
      },
      {
        "key": "D",
        "text": "Consolidar todas las cargas de trabajo en una única VPC compartida a nivel de organización mediante AWS RAM, y configurar listas de control de acceso de red (NACL) y grupos de seguridad independientes para aislar el tráfico de desarrollo y producción."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Transit Gateway es un enrutador hub-and-spoke transitivo y completamente administrado que escala a miles de VPCs sin complejidad de malla. Se comparte con las cuentas de la organización mediante AWS RAM. El aislamiento estricto entre producción y desarrollo se logra asociando los attachments a tablas de rutas de Transit Gateway independientes, donde ninguna propaga rutas hacia la otra, pero ambas propagan la ruta del attachment de Direct Connect gateway a través de una transit VIF.\n\n**Por qué las otras no:**\n- **A ✗** Crear una malla completa para 60 VPCs requiere 1.770 conexiones individuales de peering (N*(N-1)/2), lo cual excede las cuotas de AWS y genera una sobrecarga administrativa inmanejable. Además, una private VIF por VPC no escala en Direct Connect.\n- **C ✗** Mantener clústeres autogestionados de routers VPN en EC2 introduce una carga operativa severa de parches, alta disponibilidad y mantenimiento de túneles IPsec, ignorando las capacidades nativas de Transit Gateway.\n- **D ✗** Consolidar 60 VPCs en una sola compartida destruye los límites de aislamiento de red entre cuentas y viola las mejores prácticas de gobernanza multi-cuenta de AWS Organizations.\n\n🔑 **Concepto clave:** Transit Gateway + AWS RAM + tablas de rutas de tránsito múltiples = segmentación estricta y conectividad transitiva a escala empresarial."
  },
  {
    "id": 2,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una VPC está conectada al centro de datos corporativo mediante una conexión AWS Site-to-Site VPN. Los servidores locales deben resolver los nombres de dominio de una zona hospedada privada de Amazon Route 53 (app.internal.example.com). Las instancias EC2 en la VPC deben resolver los nombres de dominio de la zona corporativa on-premises (corp.example.local), alojada en servidores DNS locales. La empresa no desea administrar servidores DNS en AWS y exige la menor sobrecarga operativa.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar servidores BIND en instancias EC2 distribuidos en dos Zonas de Disponibilidad dentro de la VPC, configurados con directivas de reenvío condicional bidireccional entre la red local y el resolver predeterminado de Amazon VPC."
      },
      {
        "key": "B",
        "text": "Asociar la zona hospedada privada directamente con los servidores DNS locales mediante transferencias de zona AXFR, y crear una zona hospedada pública en Route 53 con registros alias para la resolución de corp.example.local."
      },
      {
        "key": "C",
        "text": "Crear un Route 53 Resolver inbound endpoint para recibir las consultas locales hacia AWS y un Route 53 Resolver outbound endpoint con una regla de reenvío que dirija las consultas de corp.example.local hacia las direcciones IP de los DNS locales."
      },
      {
        "key": "D",
        "text": "Configurar un único Route 53 Resolver outbound endpoint en la VPC y agregar reglas de reenvío de sistema para app.internal.example.com y corp.example.local que apunten a la dirección IP de reserva de la VPC (CIDR base + 2)."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Route 53 Resolver proporciona resolución híbrida y bidireccional completamente administrada sin servidores EC2 que gestionar. El Inbound Endpoint asigna interfaces de red elásticas (ENIs) con IPs privadas en la VPC para que los DNS locales reenvíen consultas de la zona privada de AWS. El Outbound Endpoint permite que Route 53 reenvíe consultas de la zona corporativa hacia los DNS locales mediante reglas de reenvío condicional.\n\n**Por qué las otras no:**\n- **A ✗** Desplegar y administrar servidores BIND en EC2 genera una alta sobrecarga operativa de mantenimiento, parches del sistema operativo y configuración de alta disponibilidad.\n- **B ✗** Las zonas privadas de Route 53 no admiten transferencias de zona AXFR hacia servidores DNS externos locales, y publicar nombres corporativos internos en una zona pública de Route 53 expone la topología de red a Internet.\n- **D ✗** Un Outbound Endpoint solo envía tráfico hacia el exterior de la VPC; no puede recibir consultas entrantes desde la red local. Además, la IP de reserva de la VPC (.2) no es accesible directamente desde fuera de la VPC a través de VPN o Direct Connect.\n\n🔑 **Concepto clave:** Resolución DNS híbrida nativa: Inbound Endpoint para consultas local -> AWS; Outbound Endpoint + Forwarding Rules para consultas AWS -> local."
  },
  {
    "id": 3,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa financiera transfiere datos confidenciales desde su centro de datos local a Amazon S3 a través de una conexión AWS Direct Connect con una interfaz virtual privada (private VIF). La política de seguridad corporativa prohíbe estrictamente que este tráfico atraviese direcciones IP públicas o la Internet pública. La empresa exige la solución más confiable con la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear un interface VPC endpoint (AWS PrivateLink) para Amazon S3 en la VPC y configurar las aplicaciones locales para dirigir sus llamadas a la API de S3 hacia las direcciones IP privadas o los nombres DNS específicos del endpoint a través de la private VIF."
      },
      {
        "key": "B",
        "text": "Configurar un gateway VPC endpoint para Amazon S3 en las tablas de rutas de la VPC, y propagar dinámicamente la lista de prefijos CIDR de S3 a través de las sesiones BGP de la private VIF hacia los enrutadores locales."
      },
      {
        "key": "C",
        "text": "Desplegar un AWS NAT Gateway en una subred pública de la VPC conectada a una public VIF de Direct Connect, y configurar las aplicaciones locales para enrutar el tráfico de S3 a través de una ruta estática por defecto hacia el gateway."
      },
      {
        "key": "D",
        "text": "Lanzar un clúster de instancias EC2 que ejecuten software proxy Squid detrás de un Network Load Balancer interno, configurar un gateway VPC endpoint para S3 y enrutar las peticiones locales a través del proxy mediante la private VIF."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los Interface Endpoints para S3 (habilitados por AWS PrivateLink) asignan direcciones IP privadas de la subred dentro de la VPC. Al estar dentro del espacio de direccionamiento privado de la VPC, estas IPs privadas son directamente enrutables desde la red local a través de una private VIF de Direct Connect o VPN sin requerir IPs públicas ni atravesar Internet.\n\n**Por qué las otras no:**\n- **B ✗** Los Gateway Endpoints de S3 se basan en listas de prefijos locales en las tablas de rutas de la VPC; no admiten enrutamiento transitivo ni son accesibles desde fuera de la VPC (ni por VPN ni por Direct Connect private VIF).\n- **C ✗** Un NAT Gateway requiere IPs públicas y salida hacia Internet o public VIF; no mantiene el tráfico dentro de rutas IP estrictamente privadas de la private VIF.\n- **D ✗** Aunque los proxies EC2 con Gateway Endpoint permitirían el acceso, introducen un cuello de botella de rendimiento, costo computacional y sobrecarga de administración de instancias que el servicio administrado PrivateLink evita.\n\n🔑 **Concepto clave:** Para acceder a Amazon S3 desde on-premises a través de Direct Connect Private VIF o VPN privada: utilizar Interface Endpoints para S3 (AWS PrivateLink)."
  },
  {
    "id": 4,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa contrata a un proveedor SaaS de monitoreo que opera desde su propia cuenta de AWS (111122223333). El proveedor necesita acceso de solo lectura para recopilar métricas de Amazon CloudWatch en la cuenta de producción de la empresa. La arquitectura debe aplicar el principio de mínimo privilegio y mitigar de forma rigurosa el riesgo del problema del diputado confuso (confused deputy problem).\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear un usuario IAM dedicado en la cuenta de administración con una política restringida a CloudWatch, generar claves de acceso a largo plazo y almacenarlas en AWS Secrets Manager con rotación automática cada 90 días para el uso del proveedor."
      },
      {
        "key": "B",
        "text": "Crear un rol IAM con permisos de lectura en CloudWatch, configurar una política de confianza que permita sts:AssumeRole a la cuenta 111122223333 y restringir el acceso con una condición aws:SourceIp basada en las IPs públicas del proveedor SaaS."
      },
      {
        "key": "C",
        "text": "Crear un rol IAM con permisos de lectura en CloudWatch, configurar una política de confianza que permita sts:AssumeRole a la cuenta 111122223333 y definir una condición aws:PrincipalArn que restrinja el acceso al rol específico del proveedor."
      },
      {
        "key": "D",
        "text": "Crear un rol IAM con permisos de lectura en CloudWatch, configurar una política de confianza que permita sts:AssumeRole a la cuenta del proveedor e incluir la condición sts:ExternalId con un valor secreto y único asignado exclusivamente a esta empresa."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Cuando se concede acceso a un proveedor SaaS externo que asume roles en múltiples clientes, el riesgo principal es el ataque del diputado confuso. La solución estándar y recomendada por AWS es requerir la clave de condición sts:ExternalId en la política de confianza del rol, garantizando que el proveedor transmita este identificador único al emitir la llamada sts:AssumeRole.\n\n**Por qué las otras no:**\n- **A ✗** Crear usuarios IAM y claves de acceso de larga duración para terceros viola las mejores prácticas de seguridad de AWS, que exigen credenciales temporales mediante roles IAM.\n- **B ✗** Limitar por IP de origen no mitiga el ataque del diputado confuso porque el tráfico malicioso provendría de los mismos servidores legítimos del proveedor SaaS.\n- **C ✗** Restringir por aws:PrincipalArn asegura qué identidad del proveedor asume el rol, pero no evita que un atacante engañe a ese mismo rol del proveedor para que solicite acceso con el ARN de esta empresa.\n\n🔑 **Concepto clave:** Delegación de acceso a terceros multi-tenant (SaaS): Rol IAM asumido con condición sts:ExternalId obligatoria."
  },
  {
    "id": 5,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una organización tiene 120 cuentas en AWS Organizations que operan en 4 Regiones de AWS. El equipo de seguridad necesita una vista centralizada de los hallazgos de seguridad y cumplimiento normativo en todas las cuentas y Regiones, asegurando que cualquier cuenta nueva creada en la organización quede protegida automáticamente. Además, se requiere enviar notificaciones de inmediato ante cualquier hallazgo clasificado como crítico, con la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar AWS Security Hub en cada cuenta individualmente, enviar solicitudes de invitación a todas las cuentas miembro en las 4 Regiones y configurar reglas locales de EventBridge en cada cuenta para reenviar eventos a una cola central de SQS."
      },
      {
        "key": "B",
        "text": "Designar una cuenta de seguridad como administrador delegado de Security Hub y GuardDuty, activar la habilitación automática para cuentas nuevas, configurar la agregación entre Regiones en una Región principal y crear una regla de EventBridge para hallazgos críticos con destino en SNS."
      },
      {
        "key": "C",
        "text": "Desplegar un agregador organizacional de AWS Config en una cuenta central, habilitar reglas de cumplimiento gestionadas en todas las cuentas mediante StackSets y configurar automatizaciones de Systems Manager para publicar eventos de no conformidad en Amazon SNS."
      },
      {
        "key": "D",
        "text": "Configurar un trail de la organización en AWS CloudTrail que entregue registros de eventos de todas las Regiones a un bucket central de S3, programar consultas analíticas con Amazon Athena cada 15 minutos y activar una función Lambda que envíe alertas a un tema SNS."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Designar un Administrador Delegado en AWS Organizations permite administrar Security Hub y GuardDuty centralizadamente sin usar la cuenta raíz de administración. La función de auto-enable asegura que cualquier cuenta nueva que se una a la organización quede habilitada automáticamente en todas las regiones. La agregación entre regiones centraliza todos los hallazgos en una única región, donde una sola regla de Amazon EventBridge detecta hallazgos con severidad crítica y dispara notificaciones vía Amazon SNS.\n\n**Por qué las otras no:**\n- **A ✗** El modelo antiguo de invitaciones manuales de Security Hub genera una sobrecarga administrativa inasumible en 120 cuentas y no protege automáticamente las cuentas nuevas.\n- **C ✗** AWS Config evalúa configuraciones de recursos contra reglas normativas; no reemplaza la agregación consolidada de hallazgos de vulnerabilidad, amenazas y postura de seguridad que proporciona Security Hub.\n- **D ✗** CloudTrail con Athena es un mecanismo de auditoría y análisis forense por lotes; no ofrece detección de amenazas en tiempo real ni gestión unificada de posturas de seguridad.\n\n🔑 **Concepto clave:** Seguridad multi-cuenta centralizada: Administrador delegado de Security Hub/GuardDuty + auto-enable organizacional + Cross-Region finding aggregation."
  },
  {
    "id": 6,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": true,
    "multiCount": 2,
    "multiNote": "(Elija DOS)",
    "stem": "Un bucket de Amazon S3 en la Cuenta A está cifrado con SSE-KMS mediante una clave KMS administrada por el cliente (KMS CMK) creada en la Cuenta A. Un rol IAM en la Cuenta B necesita descargar objetos de este bucket de S3. La política de bucket de S3 en la Cuenta A ya permite la acción s3:GetObject a la Cuenta B. Sin embargo, los usuarios que asumen el rol en la Cuenta B reciben un error AccessDenied al intentar leer los objetos.\n\n¿Qué DOS acciones combinadas resolverán este problema?",
    "options": [
      {
        "key": "A",
        "text": "Agregar una declaración en la política de la clave KMS en la Cuenta A que conceda permiso explícito para las acciones kms:Decrypt y kms:DescribeKey al rol IAM específico (o al ARN de la cuenta) de la Cuenta B."
      },
      {
        "key": "B",
        "text": "Modificar la configuración de cifrado predeterminado del bucket de S3 para utilizar la clave administrada por AWS (aws/s3) y delegar el control de acceso criptográfico a las políticas de recursos de S3."
      },
      {
        "key": "C",
        "text": "Adjuntar una política de permisos de identidad al rol IAM en la Cuenta B que conceda explícitamente la acción kms:Decrypt sobre el ARN de la clave KMS ubicada en la Cuenta A."
      },
      {
        "key": "D",
        "text": "Exportar el material criptográfico de la clave KMS de la Cuenta A mediante AWS CloudHSM e importarlo en una nueva clave simétrica creada en la Cuenta B con el mismo identificador de clave."
      },
      {
        "key": "E",
        "text": "Crear un alias de clave KMS en la Cuenta B con el mismo nombre y asociarlo directamente al identificador de recurso ARN de la clave KMS ubicado en la Cuenta A."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C son correctas:** Para el acceso entre cuentas a objetos de S3 cifrados con una KMS CMK, se requieren autorizaciones explícitas en ambos lados de la relación de confianza:\n1. La política de recursos de la clave KMS en la Cuenta A debe permitir el uso de la clave (kms:Decrypt) a la Cuenta B o al rol de la Cuenta B (Opción A).\n2. La política de identidad del rol IAM en la Cuenta B debe otorgar permiso para invocar kms:Decrypt apuntando al ARN de la clave KMS de la Cuenta A (Opción C).\n\n**Por qué las otras no:**\n- **B ✗** La clave administrada por AWS aws/s3 no admite acceso entre cuentas; su política de clave no se puede modificar y solo permite acceso a entidades de la misma cuenta.\n- **D ✗** Las claves KMS estándar no permiten exportar su material criptográfico fuera del servicio KMS, y recrear claves no soluciona el problema de permisos de acceso.\n- **E ✗** Los alias de KMS son recursos locales por cuenta y región; no pueden apuntar a claves ubicadas en cuentas de AWS diferentes.\n\n🔑 **Concepto clave:** Acceso multi-cuenta con KMS: Requiere permiso en la Key Policy de la cuenta propietaria Y en la IAM Policy de la cuenta que consume."
  },
  {
    "id": 7,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación crítica de procesamiento de pedidos se ejecuta en us-east-1 con un Application Load Balancer, instancias EC2 en un grupo de Auto Scaling y un clúster de Amazon Aurora PostgreSQL Multi-AZ. La empresa requiere una estrategia de recuperación ante desastres (DR) en us-west-2 con los siguientes objetivos: RTO inferior a 15 minutos y RPO inferior a 5 minutos. La solución debe minimizar los costos operativos y de infraestructura mientras no ocurra ningún desastre.\n\n¿Qué estrategia de recuperación ante desastres cumple estos requisitos al menor costo?",
    "options": [
      {
        "key": "A",
        "text": "Implementar una estrategia de Backup y Restauración configurando AWS Backup para transferir copias de seguridad de volúmenes EBS y clústeres Aurora a us-west-2 cada hora, restaurando la infraestructura completa con AWS CloudFormation ante un fallo."
      },
      {
        "key": "B",
        "text": "Implementar una estrategia de Luz Piloto copiando instantáneas de Aurora a us-west-2 cada 15 minutos, manteniendo AMIs actualizadas de la capa de cómputo y aprovisionando los balanceadores ALB y grupos de Auto Scaling únicamente tras declarar el desastre."
      },
      {
        "key": "C",
        "text": "Implementar una estrategia de Espera Activa (Warm Standby) desplegando un clúster secundario de Aurora Global Database en us-west-2, manteniendo un ALB y un grupo de Auto Scaling con capacidad mínima reducida en us-west-2, y configurando conmutación por error en Route 53."
      },
      {
        "key": "D",
        "text": "Implementar una estrategia Multi-sitio Activo-Activo aprovisionando el 100% de la capacidad de cómputo en ambas Regiones, utilizando Aurora Multi-Master con sincronización bidireccional y distribuyendo el tráfico uniformemente mediante Route 53 con enrutamiento ponderado."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Aurora Global Database utiliza replicación dedicada a nivel de almacenamiento con una latencia típica inferior a 1 segundo, cumpliendo holgadamente el RPO < 5 min. Mantener una infraestructura de espera activa (Warm Standby) en us-west-2 con una flota mínima de EC2 y ALB permite escalar la capacidad en minutos y promover el clúster secundario de Aurora en menos de 1 minuto, cumpliendo el RTO < 15 min a una fracción del costo de un entorno activo-activo completo.\n\n**Por qué las otras no:**\n- **A ✗** Backup & Restore tiene un RPO de 1 hora y un RTO que puede tardar horas en restaurar clústeres de base de datos y compilar pilas de CloudFormation.\n- **B ✗** Pilot Light copiando instantáneas viola el RPO de 5 minutos (las instantáneas tardan más de 15 minutos) y aprovisionar toda la flota de cómputo desde cero suele violar el RTO de 15 minutos.\n- **D ✗** Multi-sitio Activo-Activo con 100% de capacidad duplicada es significativamente más costoso y Aurora PostgreSQL no admite modo Multi-Master entre regiones.\n\n🔑 **Concepto clave:** RTO < 15 min y RPO < 5 min a costo optimizado = Warm Standby con Aurora Global Database + capacidad mínima en región secundaria."
  },
  {
    "id": 8,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa opera 80 servidores físicos y máquinas virtuales locales (Windows y Linux en VMware vSphere). La organización necesita establecer un plan de recuperación ante desastres hacia AWS con un RPO de pocos segundos y un RTO de menos de 15 minutos. La solución debe minimizar el costo de infraestructura en AWS durante las operaciones normales y requerir la menor sobrecarga operativa de administración de copias.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar AWS Elastic Disaster Recovery (AWS DRS) instalando el agente de replicación en cada servidor local para replicar datos continuamente a nivel de bloque en volúmenes EBS de bajo costo, manteniendo instancias de recuperación preconfiguradas."
      },
      {
        "key": "B",
        "text": "Desplegar el dispositivo virtual AWS Backup Gateway en el entorno de VMware local para ejecutar copias de seguridad incrementales periódicas de las máquinas virtuales hacia un almacén de respaldo centralizado en AWS Backup."
      },
      {
        "key": "C",
        "text": "Configurar el servicio VM Import/Export mediante tareas programadas de PowerShell para exportar instantáneas periódicas de cada disco VMDK a buckets de Amazon S3 y generar nuevas imágenes AMI de Amazon EC2 cada noche."
      },
      {
        "key": "D",
        "text": "Configurar tareas de replicación continua en AWS Database Migration Service (AWS DMS) para las bases de datos locales y utilizar AWS DataSync para transferir archivos del sistema operativo cada hora hacia volúmenes Amazon EFS."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Elastic Disaster Recovery (AWS DRS) es el servicio recomendado por AWS para recuperación ante desastres de servidores locales y virtuales. Instala un agente que replica continuamente el almacenamiento a nivel de bloque en un área de preparación ligera en AWS (volúmenes EBS de bajo costo sin ejecutar instancias de cómputo completas). Esto garantiza un RPO de segundos y permite lanzar instancias de cómputo completas en cuestión de minutos ante un desastre (RTO < 15 min) minimizando drásticamente los costos.\n\n**Por qué las otras no:**\n- **B ✗** AWS Backup para VMware realiza copias de seguridad de respaldo puntuales; no proporciona replicación continua a nivel de bloque y su RPO está limitado por la frecuencia de las copias (horas o días).\n- **C ✗** VM Import/Export es un mecanismo de migración estático y lento que requiere exportar y convertir archivos VMDK enteros, lo que imposibilita un RPO de segundos.\n- **D ✗** DMS y DataSync son herramientas de migración y sincronización de datos; no capturan el estado completo de los sistemas operativos ni orquestan el levantamiento de servidores en contingencia.\n\n🔑 **Concepto clave:** DR local -> AWS con RPO de segundos y RTO de minutos al menor costo = AWS Elastic Disaster Recovery (AWS DRS)."
  },
  {
    "id": 9,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación web se ejecuta en un grupo de Auto Scaling detrás de un Application Load Balancer en tres Zonas de Disponibilidad. En varios incidentes recientes, el proceso del servidor web de ciertas instancias EC2 se bloqueó por completo, dejando de responder a las solicitudes HTTP de los usuarios. Sin embargo, el grupo de Auto Scaling no reemplazó las instancias defectuosas porque el hipervisor de EC2 continuaba reportando que las máquinas estaban en ejecución normal.\n\n¿Qué cambio en la arquitectura garantizará que Auto Scaling detecte y reemplace automáticamente estas instancias?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una alarma de Amazon CloudWatch basada en la métrica StatusCheckFailed_System con una acción de recuperación automática de Amazon EC2 para reiniciar las instancias que presenten problemas en el hipervisor."
      },
      {
        "key": "B",
        "text": "Aumentar la capacidad mínima y deseada del grupo de Auto Scaling para absorber la carga degradada y configurar políticas de escalado dinámico basadas en el uso promedio de memoria recopilado por el agente de CloudWatch."
      },
      {
        "key": "C",
        "text": "Implementar un trabajo cron en el sistema operativo de cada instancia EC2 que verifique el puerto web localmente y reinicie el servicio web de la aplicación cada vez que se detecte un código de error de respuesta HTTP 5xx."
      },
      {
        "key": "D",
        "text": "Modificar el tipo de comprobación de estado del grupo de Auto Scaling para cambiar de comprobaciones EC2 a comprobaciones de estado de ELB, y configurar un período de gracia de comprobación de estado adecuado para el inicio de la aplicación."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** De forma predeterminada, los grupos de Auto Scaling solo evalúan las comprobaciones de estado de EC2 (estado del hardware e hipervisor). Si la aplicación web o el demonio se bloquean pero el sistema operativo subyacente sigue respondiendo a nivel de red, EC2 reporta la instancia como saludable. Al cambiar el tipo de comprobación a ELB, Auto Scaling utiliza el resultado de los health checks HTTP/HTTPS configurados en el target group del ALB, marcando y reemplazando las instancias cuyo software web deje de responder.\n\n**Por qué las otras no:**\n- **A ✗** StatusCheckFailed_System solo detecta problemas en la infraestructura física de AWS subyacente; no detecta bloqueos a nivel de aplicación dentro del sistema operativo.\n- **B ✗** Aumentar la capacidad mínima no elimina las instancias zombi que están fallando peticiones de usuarios detrás del balanceador.\n- **C ✗** Un cron interno es una solución frágil que no se integra con el ciclo de vida de Auto Scaling ni previene que el balanceador siga enviando tráfico a una instancia corrupta.\n\n🔑 **Concepto clave:** Detección de fallos a nivel de aplicación en grupos de Auto Scaling: Cambiar health check type de EC2 a ELB."
  },
  {
    "id": 10,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 40 cuentas en AWS Organizations organizadas en diferentes unidades organizativas (OU). Por estrictos requisitos de soberanía y residencia de datos, las cargas de trabajo solo tienen autorización para aprovisionar recursos en us-east-1 y us-west-2. Adicionalmente, se debe garantizar que ningún administrador en las cuentas miembro pueda desactivar o alterar AWS CloudTrail ni AWS Config. La solución debe aplicarse de manera centralizada con la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar políticas IAM de denegación en todas las cuentas miembro mediante AWS CloudFormation StackSets, restringiendo la acción de llamada a las APIs de regiones no autorizadas y protegiendo los roles de auditoría."
      },
      {
        "key": "B",
        "text": "Adjuntar políticas de control de servicios (SCP) a la raíz o a las OU que denieguen acciones en otras Regiones mediante la condición aws:RequestedRegion (excluyendo servicios globales) y denieguen acciones para detener o eliminar CloudTrail y Config."
      },
      {
        "key": "C",
        "text": "Desplegar reglas administradas de AWS Config en todas las cuentas para detectar la creación de recursos fuera de las regiones permitidas y vincularlas a funciones AWS Lambda que terminen automáticamente los recursos no conformes."
      },
      {
        "key": "D",
        "text": "Adjuntar políticas de control de servicios (SCP) con condiciones aws:RequestedRegion únicamente a la cuenta de administración de la organización para restringir el despliegue de infraestructura global a nivel corporativo."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Las Service Control Policies (SCPs) en AWS Organizations establecen una barrera de permisos infranqueable (guardrail) que actúa como límite máximo sobre todas las identidades y usuarios administradores de las cuentas miembro. Con la condición aws:RequestedRegion se bloquea el uso de regiones no autorizadas (exceptuando servicios globales como IAM, CloudFront, Route 53 y Support), y se deniegan llamadas críticas de gestión sobre CloudTrail y Config.\n\n**Por qué las otras no:**\n- **A ✗** Las políticas IAM locales pueden ser modificadas o eliminadas por usuarios que posean privilegios de administrador en las cuentas miembro; no constituyen una barrera inmutable.\n- **C ✗** AWS Config con Lambda es una remediación reactiva que actúa después de que el recurso no autorizado ya fue creado y expuesto; no previene la creación inicial.\n- **D ✗** Las SCPs nunca se aplican a la cuenta de administración (Management Account); solo afectan a las cuentas miembro dentro de la raíz o las OUs donde se adjuntan.\n\n🔑 **Concepto clave:** Controles organizacionales inmutables: SCPs adjuntadas en la raíz o OUs con condición aws:RequestedRegion para delimitar regiones."
  },
  {
    "id": 11,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría exige un registro centralizado, con integridad verificable y de acceso estrictamente restringido de toda la actividad de la API en 50 cuentas de AWS en AWS Organizations. Los registros de auditoría deben almacenarse de forma inmutable durante 7 años y no deben poder ser eliminados ni modificados por ningún usuario, incluidos los administradores de las cuentas miembro o de la cuenta de seguridad. La solución debe requerir la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear un trail de la organización en AWS CloudTrail que entregue los registros a un bucket de S3 en una cuenta dedicada de seguridad, habilitar la validación de integridad de archivos de registro, aplicar SSE-KMS y configurar S3 Object Lock en modo cumplimiento."
      },
      {
        "key": "B",
        "text": "Desplegar mediante AWS CloudFormation StackSets un trail individual de CloudTrail en cada una de las 50 cuentas, configurando cada trail para enviar sus registros hacia un bucket de Amazon S3 local con políticas de ciclo de vida hacia S3 Glacier."
      },
      {
        "key": "C",
        "text": "Configurar la exportación periódica automatizada del historial de eventos de CloudTrail desde cada cuenta mediante funciones AWS Lambda programadas hacia un bucket centralizado de Amazon S3 con cifrado del lado del servidor SSE-S3."
      },
      {
        "key": "D",
        "text": "Configurar el reenvío de eventos de CloudTrail hacia grupos de registros de Amazon CloudWatch Logs en cada cuenta miembro, y utilizar CloudWatch cross-account observability para visualizar los registros desde una cuenta central de auditoría."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Un trail de la organización en AWS CloudTrail captura automáticamente los eventos de todas las cuentas miembro presentes y futuras en un único flujo hacia un bucket de Amazon S3 central en una cuenta de archivo de registros segura. Habilitar la validación de integridad de archivos permite comprobar criptográficamente que los registros no han sido alterados. S3 Object Lock en modo cumplimiento (Compliance mode) garantiza que nadie (ni siquiera la cuenta raíz de AWS) pueda eliminar ni sobrescribir los registros durante el período de retención legal de 7 años.\n\n**Por qué las otras no:**\n- **B ✗** Mantener 50 trails individuales en cuentas locales genera una sobrecarga innecesaria y permite que un administrador comprometido en una cuenta miembro desactive su propio registro.\n- **C ✗** El historial de eventos de la consola de CloudTrail solo retiene 90 días de eventos de gestión y no registra eventos de datos; exportarlo con scripts es frágil e incompleto.\n- **D ✗** CloudWatch Logs no proporciona la inmutabilidad certificada (WORM) ni la validación criptográfica de integridad de archivos de registro que exige una auditoría formal y que S3 Object Lock sí garantiza.\n\n🔑 **Concepto clave:** Registro de auditoría inmutable multi-cuenta: Organization Trail de CloudTrail + S3 bucket central con validación de integridad de archivo y S3 Object Lock (Compliance mode)."
  },
  {
    "id": 12,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "El departamento de finanzas de una empresa necesita asignar con precisión los costos de infraestructura de 50 cuentas en AWS Organizations según la unidad de negocio propietaria. La estrategia exige estandarizar la etiqueta BusinessUnit (restringiendo variaciones ortográficas como business_unit o bu) y garantizar que los costos puedan desglosarse de forma gráfica en AWS Cost Explorer y en el AWS Cost and Usage Report (CUR) con la menor sobrecarga operativa.\n\n¿Qué conjunto de acciones logrará este objetivo?",
    "options": [
      {
        "key": "A",
        "text": "Crear una política de etiquetas (tag policy) en AWS Organizations definiendo la clave BusinessUnit y sus valores permitidos, y esperar a que el motor de facturación de AWS Cost Explorer active automáticamente la etiqueta como dimensión de costo."
      },
      {
        "key": "B",
        "text": "Habilitar BusinessUnit como etiqueta de asignación de costos generada por el usuario en cada una de las cuentas miembro individuales, sin requerir configuración centralizada de gobernanza ni políticas en AWS Organizations."
      },
      {
        "key": "C",
        "text": "Definir una política de etiquetas (tag policy) en AWS Organizations con las claves y valores permitidos para BusinessUnit, y activar BusinessUnit como etiqueta de asignación de costos en la consola de facturación de la cuenta de administración."
      },
      {
        "key": "D",
        "text": "Desplegar reglas de AWS Config en todas las cuentas para auditar la presencia de la etiqueta BusinessUnit, y ejecutar consultas programadas en Amazon Athena sobre AWS CloudTrail para atribuir los costos a los usuarios creadores de los recursos."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Para lograr una asignación de costos efectiva se requieren dos pasos complementarios:\n1. Estandarizar la nomenclatura mediante una Tag Policy en AWS Organizations, definiendo la clave exacta BusinessUnit (sensible a mayúsculas) y los valores válidos para evitar discrepancias.\n2. Activar explícitamente BusinessUnit como etiqueta de asignación de costos definida por el usuario en la consola de facturación de la cuenta de administración (Management Account). Las etiquetas no aparecen en Cost Explorer ni en el CUR hasta que se activan formalmente.\n\n**Por qué las otras no:**\n- **A ✗** Las políticas de etiquetas estandarizan nombres, pero AWS Cost Explorer no activa automáticamente las etiquetas para facturación; la activación es un paso manual obligatorio en Billing.\n- **B ✗** Activar etiquetas en cuentas miembro individuales sin una Tag Policy corporativa no previene que los desarrolladores usen variaciones incorrectas (por ejemplo business-unit), fragmentando los reportes de costo.\n- **D ✗** CloudTrail con Athena es una solución compleja que rastrea eventos de llamadas a la API; no calcula tarifas financieras ni sustituye el motor de asignación de costos nativo de AWS Billing.\n\n🔑 **Concepto clave:** Gobernanza de costos con etiquetas: Tag Policies en AWS Organizations (estandarización) + Activación en Billing de la Management Account (visibilidad en Cost Explorer/CUR)."
  },
  {
    "id": 13,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa gasta actualmente 50.000 USD al mes en cómputo estable distribuido entre instancias Amazon EC2 (familia m5), contenedores en AWS Fargate y funciones AWS Lambda en us-east-1. En los próximos tres años, la empresa planea migrar la mayoría de las cargas de trabajo de EC2 a procesadores AWS Graviton (familia m6g), transferir servicios monolíticos a AWS Fargate y expandirse a una región europea adicional. ¿Qué opción de compromiso de precios proporcionará el máximo ahorro de costos manteniendo la flexibilidad requerida para estas transformaciones?",
    "options": [
      {
        "key": "A",
        "text": "Comprar Instancias Reservadas Estándar de EC2 a 3 años con pago total por adelantado para cubrir la capacidad actual de las instancias m5 en la región principal de producción."
      },
      {
        "key": "B",
        "text": "Contratar un EC2 Instance Savings Plans a 3 años para la familia m5 en la región actual, con el objetivo de obtener el mayor descuento porcentual aplicable a las instancias actuales."
      },
      {
        "key": "C",
        "text": "Adquirir Instancias Reservadas Convertibles de EC2 a 3 años con opción de cambio de familia de instancias para permitir la futura transición entre la familia m5 y la familia m6g de Graviton."
      },
      {
        "key": "D",
        "text": "Contratar un Compute Savings Plans a 3 años que proporcione flexibilidad automática para reducir costos en Amazon EC2 (independientemente de la familia o región), AWS Fargate y AWS Lambda."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Los Compute Savings Plans ofrecen la mayor flexibilidad de todos los modelos de ahorro de cómputo de AWS. Se aplican automáticamente al uso de cómputo independientemente de la familia de instancias (m5 a m6g Graviton), el sistema operativo, la región (us-east-1 a Europa) y el modelo de ejecución (EC2, AWS Fargate y AWS Lambda), adaptándose perfectamente a la evolución tecnológica planificada a 3 años.\n\n**Por qué las otras no:**\n- **A ✗** Las Standard RIs están atadas rígidamente a una familia de instancias, región y sistema operativo específicos; no se aplican a Graviton, ni a Fargate ni a Lambda.\n- **B ✗** Los EC2 Instance Savings Plans solo ofrecen descuentos dentro de la misma familia de instancias (m5) y región; no aplican a la migración hacia m6g ni cubren Fargate o Lambda.\n- **C ✗** Las Convertibles RIs permiten cambiar de familia pero implican una sobrecarga manual de intercambio continuo y no cubren cargas de trabajo en AWS Fargate ni AWS Lambda.\n\n🔑 **Concepto clave:** Flexibilidad de cómputo a largo plazo (cambio de familia EC2 + Fargate + Lambda + multi-región): Compute Savings Plans."
  },
  {
    "id": 14,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "El equipo de seguridad de una organización corporativa debe desplegar una configuración base obligatoria (roles IAM de auditoría, reglas gestionadas de AWS Config y temas de Amazon SNS para alertas críticas) en 30 cuentas de AWS y en 3 Regiones. La arquitectura exige que cualquier cuenta nueva creada dentro de las unidades organizativas (OU) reciba automáticamente estos recursos sin intervención manual. ¿Qué mecanismo de despliegue proporciona la menor sobrecarga operativa?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar una función AWS Lambda programada en la cuenta de administración que asuma roles temporales de administración en cada cuenta miembro y ejecute llamadas a la API para crear los recursos de seguridad en las 3 Regiones."
      },
      {
        "key": "B",
        "text": "Desplegar AWS CloudFormation StackSets utilizando permisos administrados por el servicio integrados con AWS Organizations, dirigido a las unidades organizativas (OU) con la implementación automática habilitada y desplegado en las 3 Regiones."
      },
      {
        "key": "C",
        "text": "Configurar AWS CloudFormation StackSets utilizando el modelo de permisos autoadministrados, aprovisionando manualmente los roles AWSCloudFormationStackSetExecutionRole en cada cuenta miembro antes de ejecutar los despliegues."
      },
      {
        "key": "D",
        "text": "Crear una plantilla de AWS CloudFormation con pilas anidadas en la cuenta de administración de AWS Organizations y utilizar scripts de Bash con AWS CLI para iterar e implementar los recursos en cada cuenta y Región."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS CloudFormation StackSets con permisos administrados por el servicio (service-managed permissions) se integra de forma nativa con AWS Organizations. No requiere crear roles de ejecución en las cuentas de destino y permite activar la implementación automática (automatic deployment): cuando se agrega una cuenta nueva a una OU de destino, CloudFormation despliega automáticamente las instancias de pila en todas las regiones especificadas.\n\n**Por qué las otras no:**\n- **A ✗** Construir scripts personalizados en Lambda para asumir roles y desplegar recursos genera una carga operativa inmensa de mantenimiento de código y control de errores en comparación con la solución nativa StackSets.\n- **C ✗** El modelo autoadministrado requiere crear y mantener manualmente roles IAM de ejecución en cada cuenta y no admite la función de despliegue automático cuando se crean cuentas nuevas.\n- **D ✗** Las pilas anidadas estándar de CloudFormation solo operan dentro de una única cuenta y región; no escalan a través de múltiples cuentas sin herramientas orquestadoras externas.\n\n🔑 **Concepto clave:** Despliegue de infraestructura base multi-cuenta y multi-región con auto-aprovisionamiento: CloudFormation StackSets con permisos administrados por el servicio (service-managed)."
  },
  {
    "id": 15,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un servicio de microservicios basado en Amazon ECS sobre AWS Fargate opera detrás de un Application Load Balancer. La empresa necesita modernizar su canalización de despliegue para permitir lanzamientos con validación previa: un pequeño porcentaje de tráfico de prueba debe enrutarse hacia la nueva versión del servicio antes de promoverla al público general, y la infraestructura debe revertirse automáticamente a la versión anterior si se detectan aumentos en los errores HTTP 5xx.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar AWS CodeDeploy para realizar despliegues azul/verde en Amazon ECS, utilizando un agente de escucha de prueba (test listener) en el ALB y alarmas de Amazon CloudWatch para activar la reversión automática inmediata ante fallos."
      },
      {
        "key": "B",
        "text": "Configurar una actualización continua (rolling update) en el servicio de Amazon ECS con el deployment circuit breaker activado y un parámetro minimumHealthyPercent establecido en 100% para evitar tiempo de inactividad."
      },
      {
        "key": "C",
        "text": "Utilizar una estrategia de despliegue todo a la vez (all-at-once) actualizando la definición de tarea de ECS y reduciendo temporalmente minimumHealthyPercent a 0% para reemplazar todas las tareas simultáneamente."
      },
      {
        "key": "D",
        "text": "Desplegar una copia completa del servicio de ECS con un nuevo ALB en subredes paralelas y ejecutar una función Lambda que modifique los registros DNS de Amazon Route 53 tras validar manualmente el entorno."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS CodeDeploy admite de forma nativa despliegues azul/verde (blue/green) para Amazon ECS. Crea un conjunto de tareas de reemplazo (verde), permite vincular un test listener secundario en el Application Load Balancer para ejecutar pruebas sintéticas o de integración sobre la nueva versión, y realiza un cambio gradual o canario de tráfico hacia el listener de producción. Si las alarmas de CloudWatch (por ejemplo, errores HTTP 5xx) se disparan durante el despliegue, CodeDeploy redirige inmediatamente el tráfico al conjunto azul original.\n\n**Por qué las otras no:**\n- **B ✗** Las actualizaciones continuas (rolling updates) reemplazan tareas gradualmente en producción sin permitir validación previa mediante un listener de prueba y sin conmutación controlada por canary.\n- **C ✗** All-at-once con minimumHealthyPercent en 0 causa una interrupción de servicio total y expone inmediatamente el código potencialmente defectuoso a todos los usuarios.\n- **D ✗** Duplicar ALBs y conmutar con Route 53 está sujeto a demoras de almacenamiento en caché de DNS en clientes (TTL) y carece de reversión automatizada en segundos.\n\n🔑 **Concepto clave:** Despliegue de microservicios en ECS con validación de pruebas y reversión automática: AWS CodeDeploy Blue/Green deployment para ECS con ALB test listener."
  },
  {
    "id": 16,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación opera en modo activo-pasivo entre dos regiones de AWS: un Application Load Balancer principal en us-east-1 y otro de contingencia en us-west-2 que atiende a una réplica pasiva de la infraestructura. La empresa requiere que las solicitudes de los usuarios finales se envíen siempre a la región principal, pero si el balanceador de carga o las instancias de us-east-1 fallan, el tráfico debe redirigirse automáticamente a us-west-2 en menos de un minuto sin intervención de operadores.\n\n¿Qué configuración de Amazon Route 53 cumple este requisito?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una política de enrutamiento basada en latencia en Amazon Route 53 con registros de alias que apunten a los balanceadores de carga ALB de ambas Regiones para dirigir el tráfico al extremo más cercano."
      },
      {
        "key": "B",
        "text": "Configurar una política de enrutamiento ponderado en Amazon Route 53 asignando peso 100 a us-east-1 y peso 0 a us-west-2, y ejecutar una función Lambda que altere los pesos de los registros al detectar una interrupción regional."
      },
      {
        "key": "C",
        "text": "Configurar una política de enrutamiento por conmutación por error (failover) en Amazon Route 53 con un registro de alias primario hacia el ALB de us-east-1 con comprobación de estado y un registro secundario hacia el ALB de us-west-2."
      },
      {
        "key": "D",
        "text": "Configurar una política de enrutamiento simple en Amazon Route 53 que contenga las direcciones DNS de ambos balanceadores ALB en un único conjunto de registros para balancear las peticiones entre ambas infraestructuras."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** La política de conmutación por error (Failover Routing Policy) de Amazon Route 53 está diseñada específicamente para configuraciones activo-pasivo. Se crea un registro primario asociado al ALB de us-east-1 con una comprobación de estado (health check) y un registro secundario que apunta al ALB de us-west-2. Si la comprobación de estado del registro primario falla, Route 53 automáticamente deja de responder con la IP primaria y resuelve exclusivamente las consultas DNS hacia el registro secundario en segundos.\n\n**Por qué las otras no:**\n- **A ✗** El enrutamiento por latencia es para arquitecturas activo-activo; enviaría a los usuarios cercanos a us-west-2 hacia la región pasiva incluso durante el funcionamiento normal.\n- **B ✗** El enrutamiento ponderado requiere intervención (manual o mediante scripts externos con Lambda) para alterar los registros DNS, lo cual introduce demoras y puntos de falla operativos.\n- **D ✗** El enrutamiento simple no admite comprobaciones de estado ni lógica de conmutación por error; entrega ambas direcciones IP de forma aleatoria a los clientes.\n\n🔑 **Concepto clave:** Enrutamiento activo-pasivo multi-región: Route 53 Failover Routing Policy con registro de alias primario evaluado por health check y registro de alias secundario."
  },
  {
    "id": 17,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una plataforma global de comercio electrónico cuenta con usuarios distribuidos en Norteamérica, Europa y Asia. La arquitectura requiere que los usuarios experimenten una latencia de lectura y escritura inferior a 10 milisegundos en su región geográfica local más cercana. La solución debe resolver automáticamente los conflictos de concurrencia basados en la última escritura y requerir la menor sobrecarga operativa de gestión de bases de datos.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar Amazon Aurora Global Database con el clúster primario de lectura y escritura en us-east-1 y clústeres secundarios de solo lectura en Europa y Asia, configurando write forwarding para las escrituras."
      },
      {
        "key": "B",
        "text": "Desplegar instancias de Amazon RDS for MySQL Multi-AZ en us-east-1 y configurar réplicas de lectura entre Regiones en Europa y Asia utilizando el motor de replicación asíncrona nativo de MySQL."
      },
      {
        "key": "C",
        "text": "Desplegar tablas independientes de Amazon DynamoDB en cada Región y programar funciones AWS Lambda activadas por DynamoDB Streams para replicar los cambios entre regiones mediante llamadas a la API."
      },
      {
        "key": "D",
        "text": "Desplegar tablas globales de Amazon DynamoDB (DynamoDB Global Tables) con réplicas en las tres Regiones, permitiendo que las aplicaciones locales realicen lecturas y escrituras locales con resolución de conflictos automática."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon DynamoDB Global Tables es una base de datos multimaestro totalmente administrada y multi-región. Permite que las aplicaciones en cada región lean y escriban localmente en su tabla de réplica más cercana con latencias de un solo dígito de milisegundo, propagando los cambios automáticamente a todas las demás réplicas y resolviendo conflictos concurrentes de forma nativa mediante la regla Last-Writer-Wins.\n\n**Por qué las otras no:**\n- **A ✗** En Aurora Global Database, todas las escrituras se reenvían al clúster primario en us-east-1; los usuarios en Europa y Asia sufrirían latencias de red transoceánicas de cientos de milisegundos para escribir.\n- **B ✗** RDS for MySQL solo admite réplicas de lectura; no permite escrituras locales en Europa o Asia y requiere gestión manual de failover.\n- **C ✗** Construir un mecanismo propio de replicación bidireccional con DynamoDB Streams y Lambda genera una complejidad inmensa de código, riesgo de bucles infinitos y retrasos en la entrega.\n\n🔑 **Concepto clave:** Lecturas y escrituras locales multi-región con latencia sub-10ms y resolución nativa de conflictos: Amazon DynamoDB Global Tables."
  },
  {
    "id": 18,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Por estrictas regulaciones gubernamentales de cumplimiento, una institución bancaria debe retener copias de seguridad inmutables de volúmenes de Amazon EBS, clústeres de Amazon RDS y tablas de Amazon DynamoDB durante 7 años en 50 cuentas de AWS. Las copias de seguridad deben protegerse de forma absoluta contra cualquier eliminación accidental o intencionada, asegurando que ni siquiera el usuario raíz de la cuenta de AWS pueda borrarlas antes de que expire el período de retención legal.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar funciones AWS Lambda en cada cuenta para tomar instantáneas manuales de EBS y RDS, exportarlas a buckets de S3 en otra cuenta y habilitar S3 Object Lock con retención legal en los objetos respaldados."
      },
      {
        "key": "B",
        "text": "Configurar AWS Backup con políticas de copia de seguridad de AWS Organizations hacia un almacén de respaldo centralizado en una cuenta de auditoría aislada, habilitando AWS Backup Vault Lock en modo cumplimiento."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon Data Lifecycle Manager (DLM) en todas las cuentas miembro para crear políticas de ciclo de vida cruzadas entre regiones, y activar el bloqueo de eliminación con MFA Delete en los buckets de respaldo."
      },
      {
        "key": "D",
        "text": "Configurar AWS Backup en cada cuenta miembro con copias automáticas entre regiones hacia una cuenta central de respaldo, protegiendo los almacenes de respaldo mediante AWS Backup Vault Lock en modo gobernanza."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Backup Vault Lock en modo cumplimiento (Compliance mode) aplica una política estricta de protección WORM sobre los almacenes de copias de seguridad. Una vez transcurrido el período de gracia inicial, la política queda bloqueada de forma irreversible: nadie, incluidos administradores o el usuario root de AWS, puede eliminar puntos de recuperación ni reducir el tiempo de retención. Integrarlo con políticas organizacionales de AWS Backup y cuentas de respaldo centralizadas garantiza una protección uniforme y a prueba de manipulaciones.\n\n**Por qué las otras no:**\n- **A ✗** Las funciones Lambda personalizadas para exportar instantáneas a S3 generan una sobrecarga de mantenimiento innecesaria y no admiten de forma nativa la protección consolidada de tablas DynamoDB y bases de datos RDS con metadatos de restauración.\n- **C ✗** Data Lifecycle Manager (DLM) solo gestiona instantáneas de volúmenes EBS e instancias EC2; no admite Amazon RDS ni Amazon DynamoDB.\n- **D ✗** El modo gobernanza (Governance mode) de Vault Lock permite que usuarios con permisos IAM específicos o el usuario root de la cuenta eludan el bloqueo y eliminen copias de seguridad, violando el requisito regulatorio.\n\n🔑 **Concepto clave:** Retención inmutable de copias de seguridad multi-servicio que ni el root puede borrar: AWS Backup Vault Lock en modo cumplimiento (Compliance mode)."
  },
  {
    "id": 19,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Prescribir controles de seguridad y gobernanza",
    "multi": true,
    "multiCount": 2,
    "multiNote": "(Elija DOS)",
    "stem": "Un sitio web corporativo de comercio electrónico alojado detrás de un Application Load Balancer enfrenta ataques frecuentes de inyección SQL (SQLi), scraping masivo por parte de bots que satura los servidores y picos esporádicos de tráfico anómalo que sugieren ataques volumétricos de denegación de servicio distribuido (DDoS) en capas 3, 4 y 7. La empresa necesita una solución integral de protección perimetral con soporte de expertos.\n\n¿Qué DOS acciones combinadas protegerán la plataforma contra estas amenazas?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar Amazon CloudFront delante del Application Load Balancer y asociar una Web ACL de AWS WAF con grupos de reglas administradas contra SQL injection y reglas basadas en tasa (rate-based rules)."
      },
      {
        "key": "B",
        "text": "Configurar listas de control de acceso de red (Network ACLs) en las subredes públicas para bloquear dinámicamente los bloques CIDR de las direcciones IP atacantes identificadas por los registros de acceso."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon GuardDuty en la cuenta de producción para interceptar el tráfico de red en el Application Load Balancer y descartar automáticamente los paquetes procedentes de fuentes maliciosas."
      },
      {
        "key": "D",
        "text": "Suscribir la infraestructura a AWS Shield Advanced para obtener protección especializada contra ataques DDoS de capas 3, 4 y 7 con mitigación automática y acceso al Shield Response Team (SRT)."
      },
      {
        "key": "E",
        "text": "Restringir los grupos de seguridad del Application Load Balancer para permitir únicamente el tráfico proveniente de las listas de direcciones IP conocidas y validadas de los clientes corporativos."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "explanation": "**Respuestas correctas: A y D**\n\n**Por qué A y D son correctas:**\n1. Desplegar Amazon CloudFront con AWS WAF (Opción A) mitiga ataques de capa de aplicación (capa 7). Las reglas administradas de AWS WAF inspeccionan el cuerpo y parámetros HTTP para bloquear inyecciones SQL (SQLi), y las reglas basadas en tasa limitan peticiones por IP para mitigar el scraping abusivo.\n2. AWS Shield Advanced (Opción D) proporciona protección DDoS avanzada contra ataques volumétricos en capas 3, 4 y 7, mitigación automática en el borde de CloudFront, protección de costos contra picos causados por ataques y acceso directo al equipo de respuesta especializada de AWS (Shield Response Team - SRT).\n\n**Por qué las otras no:**\n- **B ✗** Las NACLs tienen límites reducidos de reglas (típicamente 20 por dirección) y no escalan para bloquear miles de direcciones IP dinámicas de una botnet distribuida.\n- **C ✗** GuardDuty es un sistema de detección y análisis de telemetría fuera de banda (out-of-band); no es un firewall en línea y no intercepta tráfico en el ALB en tiempo real.\n- **E ✗** Restringir por listas blancas de IPs destruiría el modelo de negocio de un comercio electrónico público, impidiendo el acceso a clientes legítimos en Internet.\n\n🔑 **Concepto clave:** Defensa perimetral integral y anti-DDoS: CloudFront + AWS WAF (reglas SQLi y rate-based) + AWS Shield Advanced (DDoS L3/4/7 y SRT)."
  },
  {
    "id": 20,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un conjunto de funciones sin servidor en AWS Lambda debe conectarse a una base de datos relacional heredada en Amazon RDS for Oracle utilizando un nombre de usuario y contraseña específicos. La política de seguridad de la empresa exige que las credenciales de la base de datos se roten automáticamente cada 30 días sin interrumpir la disponibilidad de la aplicación y sin almacenar texto plano en el código ni en repositorios.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar la autenticación de base de datos de IAM en el clúster de RDS for Oracle y generar tokens de autenticación temporales dentro del código de las funciones Lambda en cada invocación."
      },
      {
        "key": "B",
        "text": "Almacenar las credenciales de la base de datos como un parámetro de tipo SecureString en AWS Systems Manager Parameter Store y desplegar una función Lambda personalizada para rotar la clave cada 30 días."
      },
      {
        "key": "C",
        "text": "Almacenar las credenciales de la base de datos en AWS Secrets Manager con rotación automática configurada mediante una función Lambda de rotación, y permitir que las funciones Lambda lean el secreto en tiempo de ejecución."
      },
      {
        "key": "D",
        "text": "Almacenar las credenciales cifradas con una clave KMS administrada por el cliente dentro de las variables de entorno de Lambda y actualizarlas mensualmente mediante una canalización automatizada de CI/CD."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** AWS Secrets Manager está diseñado específicamente para almacenar y rotar credenciales de bases de datos de forma automática. Ofrece plantillas de funciones Lambda de rotación integradas que actualizan las credenciales tanto en el motor de base de datos como en Secrets Manager de forma transparente, permitiendo que las aplicaciones lean la última versión del secreto mediante llamadas a la API autorizadas por su rol IAM.\n\n**Por qué las otras no:**\n- **A ✗** La autenticación de base de datos mediante IAM es compatible con RDS PostgreSQL y RDS MySQL, pero no es compatible con el motor de Amazon RDS for Oracle.\n- **B ✗** SSM Parameter Store admite parámetros cifrados, pero no cuenta con un motor de rotación automática nativo y programado como el que ofrece Secrets Manager de forma inmediata.\n- **D ✗** Actualizar variables de entorno en Lambda mediante CI/CD requiere redesplegar las funciones en cada rotación, puede causar cortes momentáneos y expone las credenciales a los desarrolladores de la canalización.\n\n🔑 **Concepto clave:** Rotación periódica automatizada de contraseñas de bases de datos: AWS Secrets Manager con rotación automática habilitada."
  },
  {
    "id": 21,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar la rentabilidad y la eficiencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una gran empresa gestiona 500 instancias Amazon EC2 (ejecutando Windows Server y Amazon Linux) distribuidas en 20 cuentas de AWS y 3 Regiones. Los parches de seguridad del sistema operativo deben aplicarse mensualmente durante ventanas de mantenimiento específicas, garantizando un informe consolidado del estado de cumplimiento de parches para auditoría y la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar Amazon Inspector en todas las cuentas para escanear vulnerabilidades en los sistemas operativos y ejecutar remediaciones automáticas de parches mediante scripts de CloudFormation."
      },
      {
        "key": "B",
        "text": "Configurar EC2 Image Builder para compilar una nueva imagen dorada (Golden AMI) parchada cada mes y ejecutar un script automatizado que reemplace todas las 500 instancias en producción."
      },
      {
        "key": "C",
        "text": "Crear documentos de comando en AWS Systems Manager y programar ventanas de mantenimiento locales en cada cuenta para que los ingenieros ejecuten scripts de actualización por SSH y RDP."
      },
      {
        "key": "D",
        "text": "Configurar AWS Systems Manager Patch Manager mediante Quick Setup a nivel de organización en AWS Organizations, desplegando líneas base de parches, programaciones automáticas e informes centralizados."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS Systems Manager Patch Manager integrado con Quick Setup y AWS Organizations permite automatizar la aplicación de parches en flotas híbridas y multi-cuenta sin esfuerzo manual. Aplica líneas base de parches (patch baselines) aprobadas para Windows y Linux, define ventanas de mantenimiento programadas por entorno y genera reportes de cumplimiento de parches centralizados para toda la organización.\n\n**Por qué las otras no:**\n- **A ✗** Amazon Inspector detecta vulnerabilidades y exposición de red; no es una herramienta para instalar parches de actualización del sistema operativo.\n- **B ✗** Reemplazar 500 instancias activas mensualmente mediante nuevas AMIs introduce una complejidad innecesaria para servidores con estado o aplicaciones que no son efímeras.\n- **C ✗** Ejecutar scripts manualmente por SSH/RDP en 500 instancias distribuidas en 20 cuentas genera una carga operativa inmanejable y es propenso a errores humanos.\n\n🔑 **Concepto clave:** Gestión de parches automatizada multi-cuenta: AWS Systems Manager Patch Manager con Quick Setup a nivel de AWS Organizations."
  },
  {
    "id": 22,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar la rentabilidad y la eficiencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "En un sistema de procesamiento de transacciones de alta concurrencia, el nivel web alojado en un grupo de Auto Scaling realiza llamadas síncronas por HTTP hacia el nivel de procesamiento de pedidos en otra flota de instancias EC2. Durante las campañas de ventas masivas, el nivel de procesamiento se satura y no puede atender las peticiones al ritmo que llegan, provocando que las llamadas web superen el tiempo de espera (timeout) y se pierdan transacciones de clientes. La empresa requiere desacoplar ambos niveles y garantizar que ningún pedido se pierda.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Aumentar el tamaño de las instancias del nivel de procesamiento y elevar la capacidad mínima del grupo de Auto Scaling para mantener capacidad ociosa durante los picos de ventas."
      },
      {
        "key": "B",
        "text": "Intercalar una cola de Amazon SQS entre el nivel web y el nivel de procesamiento: el nivel web encola los pedidos y el nivel de procesamiento los consume de forma asíncrona escalando por backlog."
      },
      {
        "key": "C",
        "text": "Reemplazar el balanceador de carga HTTP por un Network Load Balancer con cross-zone load balancing habilitado para acelerar la transmisión de las conexiones síncronas entre ambos niveles."
      },
      {
        "key": "D",
        "text": "Configurar una caché de Amazon ElastiCache for Redis entre ambos niveles para almacenar en memoria las solicitudes HTTP en tránsito y reintentarlas periódicamente si el procesamiento falla."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Introducir una cola de Amazon SQS desacopla completamente el nivel de recepción de pedidos del nivel de procesamiento. Los pedidos se almacenan de forma duradera y resiliente en la cola aunque el nivel de backend esté saturado. El nivel de procesamiento consume los mensajes a su propio ritmo y el grupo de Auto Scaling puede escalar dinámicamente utilizando una métrica personalizada de retraso de mensajes por instancia (ApproximateNumberOfMessagesVisible / número de instancias).\n\n**Por qué las otras no:**\n- **A ✗** Sobredimensionar instancias fijas es sumamente costoso e ineficiente fuera de las ventanas de picos y no garantiza la absorción ante ráfagas extremas e inesperadas.\n- **C ✗** Un Network Load Balancer optimiza conexiones a nivel de red, pero las llamadas siguen siendo síncronas; si el backend se bloquea, las conexiones siguen fallando por timeout.\n- **D ✗** ElastiCache es un almacén de caché volátil; no proporciona semántica de colas transaccionales con reintentos garantizados ni políticas de mensajes fallidos (Dead-Letter Queues).\n\n🔑 **Concepto clave:** Desacoplamiento de capas y absorción de picos de tráfico: Intercalar Amazon SQS con escalado basado en el tamaño de la cola (backlog per instance)."
  },
  {
    "id": 23,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar la rentabilidad y la eficiencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una arquitectura de microservicios sin servidor utiliza funciones AWS Lambda que ejecutan consultas transaccionales frecuentes contra un clúster de Amazon Aurora MySQL Multi-AZ. Durante las horas de alto tráfico, cientos de ejecuciones concurrentes de Lambda abren conexiones simultáneas a la base de datos, agotando rápidamente el parámetro de conexiones máximas (max_connections) de Aurora y provocando que las funciones fallen por errores de conexión rechazada.\n\n¿Qué solución resuelve este problema con la menor sobrecarga operativa y sin modificar la base de datos?",
    "options": [
      {
        "key": "A",
        "text": "Escalar verticalmente el clúster de Amazon Aurora MySQL a un tipo de instancia computacional de mayor capacidad para incrementar el límite del parámetro max_connections del motor."
      },
      {
        "key": "B",
        "text": "Aumentar el número de réplicas de lectura de Aurora en el clúster y modificar el código de la función Lambda para distribuir las conexiones de escritura de manera aleatoria entre las instancias."
      },
      {
        "key": "C",
        "text": "Implementar Amazon RDS Proxy entre las funciones Lambda y el clúster de Amazon Aurora MySQL para reutilizar y multiplexar las conexiones a la base de datos de manera eficiente."
      },
      {
        "key": "D",
        "text": "Configurar concurrencia aprovisionada (provisioned concurrency) en las funciones AWS Lambda para limitar el número de instancias de funciones que pueden inicializarse simultáneamente."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon RDS Proxy es un proxy de base de datos totalmente administrado y altamente disponible que multiplexa y comparte miles de conexiones de clientes hacia un número reducido de conexiones reales abiertas con la base de datos. Está diseñado específicamente para cargas efímeras y concurrentes como AWS Lambda, evitando el agotamiento de memoria y conexiones en Amazon Aurora sin requerir escalado vertical de la base de datos.\n\n**Por qué las otras no:**\n- **A ✗** Escalar a instancias más grandes eleva el límite de conexiones pero es muy costoso y simplemente traslada el problema a un umbral ligeramente superior sin resolver la ineficiencia de conexiones efímeras.\n- **B ✗** Las réplicas de lectura solo admiten consultas SELECT; las operaciones de escritura no se pueden enviar a las réplicas de lectura y fallarían inmediatamente.\n- **D ✗** Limitar la concurrencia en Lambda restringe la capacidad de procesamiento de la API y genera errores de limitación de tasa (throttling) a los usuarios finales.\n\n🔑 **Concepto clave:** Mitigación del agotamiento de conexiones en bases de datos relacionales por funciones Lambda: Implementar Amazon RDS Proxy."
  },
  {
    "id": 24,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una plataforma SaaS aloja réplicas completas de su aplicación en eu-central-1 y en us-east-1. Debido a regulaciones estrictas del RGPD (GDPR) y acuerdos contractuales, todos los usuarios que accedan desde países del continente europeo deben ser atendidos obligatoriamente por la infraestructura en eu-central-1. Todos los usuarios de Norteamérica y del resto del mundo deben ser dirigidos a us-east-1. Si alguna región experimenta fallos parciales, los usuarios deben continuar enrutándose según las reglas de cumplimiento.\n\n¿Qué política de enrutamiento de Amazon Route 53 cumple con estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una política de enrutamiento por geolocalización en Amazon Route 53 con un registro para el continente Europa hacia eu-central-1 y un registro predeterminado (default) hacia us-east-1."
      },
      {
        "key": "B",
        "text": "Configurar una política de enrutamiento basada en latencia en Amazon Route 53 creando registros independientes para ambas Regiones para que los clientes se conecten al centro más veloz."
      },
      {
        "key": "C",
        "text": "Configurar una política de enrutamiento por geoproximidad en Amazon Route 53 utilizando Route 53 Traffic Flow con un sesgo (bias) neutral de cero para ambas infraestructuras regionales."
      },
      {
        "key": "D",
        "text": "Configurar una política de enrutamiento ponderado en Amazon Route 53 asignando una distribución 50/50 entre ambas Regiones y asociando comprobaciones de estado para failover."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La política de enrutamiento por geolocalización (Geolocation routing policy) permite restringir y mapear el tráfico según la ubicación geográfica de origen del cliente (continente, país o subdivisión de EE. UU.). Crear un registro para el continente Europa que apunte a eu-central-1 garantiza el estricto cumplimiento legal de GDPR, mientras que un registro default (predeterminado) atrapa todo el tráfico restante del mundo y lo envía a us-east-1.\n\n**Por qué las otras no:**\n- **B ✗** El enrutamiento por latencia dirige a los usuarios según el tiempo de respuesta más bajo; un usuario europeo con una ruta de red anómala podría terminar en us-east-1, violando GDPR.\n- **C ✗** El enrutamiento por geoproximidad se basa en la distancia geográfica a los recursos de AWS y permite alterar límites con bias, pero no garantiza el cumplimiento de fronteras políticas o continentales estrictas.\n- **D ✗** El enrutamiento ponderado reparte el tráfico aleatoriamente según porcentajes numéricos; la mitad de los usuarios europeos serían enviados a EE. UU.\n\n🔑 **Concepto clave:** Cumplimiento de residencia de datos y soberanía regulatoria (GDPR): Route 53 Geolocation Routing con registro por continente/país y registro default."
  },
  {
    "id": 25,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar arquitecturas para la fiabilidad y la continuidad del negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación de catálogos en Amazon DynamoDB experimenta una tasa masiva de millones de solicitudes de lectura por segundo concentradas sobre un número reducido de elementos muy populares (hot keys). La empresa necesita reducir la latencia de lectura a niveles de microsegundos sin modificar el esquema de datos de las tablas y sin obligar a los desarrolladores a gestionar invalidaciones de caché en la aplicación.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar un clúster de Amazon ElastiCache for Redis con replicación Multi-AZ y reescribir la lógica de la aplicación para implementar el patrón de lectura cache-aside."
      },
      {
        "key": "B",
        "text": "Incrementar las unidades de capacidad de lectura (RCU) aprovisionadas en la tabla de DynamoDB o cambiar el modo de capacidad a bajo demanda (on-demand) para absorber el volumen."
      },
      {
        "key": "C",
        "text": "Habilitar tablas globales de Amazon DynamoDB (Global Tables) replicando la información en múltiples regiones para distribuir las consultas de lectura entre distintos extremos."
      },
      {
        "key": "D",
        "text": "Implementar Amazon DynamoDB Accelerator (DAX) en la VPC y apuntar el SDK de la aplicación al endpoint del clúster de DAX para obtener respuestas en microsegundos en memoria."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon DynamoDB Accelerator (DAX) es una memoria caché en memoria completamente administrada y de alta disponibilidad construida específicamente para DynamoDB. Proporciona aceleración de lectura de un solo dígito de milisegundo a microsegundos. Es totalmente compatible con las llamadas a la API de DynamoDB existentes, por lo que la aplicación solo necesita apuntar al endpoint de DAX sin requerir código de gestión de caché.\n\n**Por qué las otras no:**\n- **A ✗** ElastiCache con Redis requiere reescribir el código de la aplicación para implementar lógica de lectura y escritura (cache-aside), invalidación de caché y manejo de fallos.\n- **B ✗** Aumentar las RCUs o usar on-demand no reduce la latencia por debajo de los milisegundos y puede incurrir en costos astronómicos sin resolver la congestión de una sola partición (hot partition).\n- **C ✗** Replicar con Global Tables agrega costos multi-región y no reduce la latencia para los clientes locales que siguen accediendo a las mismas hot keys.\n\n🔑 **Concepto clave:** Aceleración en memoria transparente para DynamoDB con latencia en microsegundos: Amazon DynamoDB Accelerator (DAX)."
  },
  {
    "id": 26,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar la rentabilidad y la eficiencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "La factura mensual de AWS de una empresa refleja un costo imprevisto de miles de dólares por cargos de procesamiento de datos de AWS NAT Gateway. El análisis de tráfico revela que este costo es provocado por cientos de instancias Amazon EC2 en subredes privadas que transfieren decenas de terabytes diarios hacia Amazon S3 y realizan lecturas masivas sobre Amazon DynamoDB. La empresa exige eliminar estos costos de procesamiento de red sin exponer las instancias privadas a Internet.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear gateway VPC endpoints para Amazon S3 y Amazon DynamoDB en la VPC y asociarlos a las tablas de rutas de todas las subredes privadas donde residen las instancias."
      },
      {
        "key": "B",
        "text": "Crear interface VPC endpoints basados en AWS PrivateLink para Amazon S3 y Amazon DynamoDB en las subredes privadas y actualizar los clientes para usar los nombres DNS del endpoint."
      },
      {
        "key": "C",
        "text": "Reemplazar el AWS NAT Gateway gestionado por una instancia EC2 NAT optimizada para red ejecutando Linux con iptables para procesar el tráfico a un costo fijo por hora."
      },
      {
        "key": "D",
        "text": "Mover las instancias EC2 a subredes públicas con direcciones IP públicas elásticas y configurar grupos de seguridad restrictivos para comunicarse directamente con los servicios de AWS."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los Gateway VPC Endpoints para Amazon S3 y Amazon DynamoDB son gratuitos (no tienen costo por hora ni tarifa por procesamiento de datos). Al asociarlos a las tablas de rutas de las subredes privadas, todo el tráfico hacia S3 y DynamoDB se enruta internamente a través de la red privada de AWS sin pasar por el NAT Gateway, eliminando el 100% de los cargos de procesamiento de NAT.\n\n**Por qué las otras no:**\n- **B ✗** Los Interface Endpoints (PrivateLink) para S3 y DynamoDB tienen un costo por hora de endpoint y cobran una tarifa por gigabyte procesado, lo que no optimizaría los costos comparado con los Gateway Endpoints gratuitos.\n- **C ✗** Una instancia NAT autogestionada en EC2 elimina los cargos de procesamiento de NAT Gateway pero añade una gran sobrecarga operativa de parches, alta disponibilidad y posibles cuellos de botella.\n- **D ✗** Mover instancias privadas a subredes públicas expone servidores internos y viola las directivas de seguridad corporativas básicas.\n\n🔑 **Concepto clave:** Gateway VPC Endpoints para S3 y DynamoDB: No tienen costo y eliminan los cargos de procesamiento de NAT Gateway."
  },
  {
    "id": 27,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar la rentabilidad y la eficiencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa almacena 600 TB de objetos (en su mayoría archivos de más de 1 MB) en Amazon S3 Standard. Los patrones de acceso a estos datos son desconocidos, impredecibles y cambian constantemente: algunos archivos se consultan frecuentemente durante semanas y luego quedan inactivos durante meses, para volver a consultarse esporádicamente. La empresa desea minimizar el costo total de almacenamiento sin incurrir en tarifas punitivas por recuperación de datos y con la menor sobrecarga operativa.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una regla de ciclo de vida de Amazon S3 para transferir todos los objetos a la clase de almacenamiento S3 Standard-IA de forma obligatoria transcurridos 30 días de su creación."
      },
      {
        "key": "B",
        "text": "Configurar una regla de ciclo de vida de Amazon S3 para transferir los objetos a S3 Glacier Flexible Retrieval a los 30 días y eliminarlos definitivamente al cabo de 365 días."
      },
      {
        "key": "C",
        "text": "Modificar la clase de almacenamiento de los objetos existentes y nuevos hacia S3 Intelligent-Tiering para optimizar costos de forma automática sin tarifas de recuperación."
      },
      {
        "key": "D",
        "text": "Configurar una regla de ciclo de vida de Amazon S3 para archivar los objetos a S3 One Zone-IA a los 30 días, aceptando la reducción de disponibilidad para maximizar el ahorro económico."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon S3 Intelligent-Tiering está diseñado exactamente para datos con patrones de acceso desconocidos, cambiantes o impredecibles. Mueve automáticamente los objetos entre niveles de acceso frecuente, poco frecuente (30 días) y acceso diferido (90 días) según el uso real, sin tarifas de recuperación de datos ni penalizaciones operativas por reactivación.\n\n**Por qué las otras no:**\n- **A ✗** S3 Standard-IA cobra tarifas por gigabyte recuperado cada vez que un objeto se consulta y penaliza objetos borrados antes de 30 días; ante patrones impredecibles, las tarifas de recuperación superan el ahorro de almacenamiento.\n- **B ✗** Glacier Flexible Retrieval requiere tiempos de recuperación de minutos a horas y cobra tarifas de recuperación, lo que rompería las aplicaciones que requieren acceso inmediato.\n- **D ✗** S3 One Zone-IA almacena los datos en una sola Zona de Disponibilidad, arriesgando pérdida total ante un desastre zonal, y cobra tarifas de recuperación.\n\n🔑 **Concepto clave:** Patrones de acceso a S3 desconocidos, cambiantes o impredecibles: S3 Intelligent-Tiering (cero tarifas de recuperación)."
  },
  {
    "id": 28,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Mejorar la seguridad y los controles de gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría de seguridad corporativa detectó que varios buckets de Amazon S3 fueron configurados accidentalmente con acceso público de lectura y escritura por parte de desarrolladores en diferentes cuentas de AWS Organizations. La empresa exige implementar una solución automatizada a escala que detecte de forma continua cualquier bucket no conforme en todas las cuentas y corrija la configuración revocando el acceso público de inmediato sin intervención manual.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar la comprobación de buckets de S3 con permisos abiertos en AWS Trusted Advisor y configurar un script semanal que envíe correos electrónicos a los administradores de cuenta."
      },
      {
        "key": "B",
        "text": "Desplegar reglas de AWS Config para buckets públicos a nivel de organización con acciones de corrección automática asociadas a runbooks de AWS Systems Manager Automation."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon Inspector en todas las cuentas de la organización y configurar la función de remediación automática de vulnerabilidades para modificar las políticas de los buckets."
      },
      {
        "key": "D",
        "text": "Configurar consultas periódicas en Amazon Athena sobre los registros de eventos de AWS CloudTrail para identificar llamadas de configuración pública y ejecutar scripts manuales de corrección."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Las reglas gestionadas de AWS Config organizacionales (como s3-bucket-public-read-prohibited y s3-bucket-public-write-prohibited) evalúan continuamente la postura de todos los buckets de la organización. Al asociar una corrección automática (automatic remediation) mediante AWS Systems Manager Automation (ejecutando el runbook AWS-DisableS3BucketPublicReadWrite), el bucket público se desactiva y protege en cuestión de segundos sin intervención humana.\n\n**Por qué las otras no:**\n- **A ✗** Trusted Advisor notifica de forma pasiva por correo y requiere intervención manual; no proporciona remediación automática inmediata.\n- **C ✗** Amazon Inspector escanea vulnerabilidades de software en instancias EC2, imágenes de contenedor ECR y funciones Lambda; no evalúa ni corrige políticas de buckets de S3.\n- **D ✗** Consultar CloudTrail con Athena es un proceso analítico periódico y reactivo que no proporciona una acción correctiva automatizada en tiempo real.\n\n🔑 **Concepto clave:** Detección y corrección automática de cumplimiento continuo multi-cuenta: AWS Config Rules organizacionales + Systems Manager Automation runbooks."
  },
  {
    "id": 29,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 Diseñar e implementar redes de distribución y canalizaciones CI/CD",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una API de procesamiento de pagos críticos basada en funciones AWS Lambda opera detrás de Amazon API Gateway y se gestiona mediante el AWS Serverless Application Model (AWS SAM). El equipo de ingeniería requiere implementar una estrategia de despliegue progresivo que desvíe el 10% del tráfico a la nueva versión, supervise la tasa de fallos durante 10 minutos y, si no se disparan alarmas, promueva el tráfico restante al 100%, con reversión automática en caso de incidentes.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una estrategia de despliegue todo a la vez (all-at-once) en la plantilla SAM y utilizar un script de validación que ejecute pruebas sintéticas antes de promover el cambio."
      },
      {
        "key": "B",
        "text": "Desplegar dos funciones Lambda independientes y configurar una política de enrutamiento ponderado en Amazon Route 53, modificando los pesos gradualmente mediante una función externa."
      },
      {
        "key": "C",
        "text": "Migrar el despliegue de la aplicación serverless a entornos de AWS Elastic Beanstalk utilizando la estrategia de implementación inmutable (immutable deployment)."
      },
      {
        "key": "D",
        "text": "Configurar la propiedad AutoPublishAlias en la plantilla SAM con la preferencia de despliegue Canary10Percent10Minutes y vincularla a alarmas de CloudWatch mediante AWS CodeDeploy."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS SAM proporciona integración nativa con AWS CodeDeploy para funciones sin servidor mediante las propiedades AutoPublishAlias y DeploymentPreference. Definir Canary10Percent10Minutes indica a CodeDeploy que dirija el 10% del tráfico a la nueva versión mediante un alias de Lambda, espere 10 minutos monitoreando las alarmas de CloudWatch especificadas (por ejemplo errores 5xx o duración) y, si permanecen en estado OK, complete el cambio de tráfico al 100% de forma segura.\n\n**Por qué las otras no:**\n- **A ✗** El despliegue all-at-once cambia el 100% del tráfico inmediatamente sin dar oportunidad de validar la nueva versión con una muestra reducida de usuarios reales.\n- **B ✗** Route 53 opera a nivel de DNS y está sujeto al almacenamiento en caché (TTL) en los clientes, lo cual impide un desplazamiento de tráfico preciso en intervalos de 10 minutos.\n- **C ✗** Elastic Beanstalk está orientado a servidores de aplicaciones tradicionales, no a funciones Lambda serverless desacopladas de API Gateway.\n\n🔑 **Concepto clave:** Despliegues seguros de AWS Lambda con validación progresiva: AWS SAM con AutoPublishAlias + CodeDeploy Canary10Percent10Minutes + CloudWatch Alarms."
  },
  {
    "id": 30,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Determinar oportunidades para mejorar la fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "El equipo de operaciones gestiona 50 cuentas de AWS dentro de AWS Organizations en us-east-1. El equipo necesita una vista unificada y centralizada de métricas, registros de Amazon CloudWatch Logs y trazas distribuidas de AWS X-Ray en un único panel de control sin requerir la creación de canalizaciones de datos personalizadas ni la gestión de credenciales en cada cuenta.\n\n¿Qué solución cumple estos requisitos con la menor sobrecarga operativa?",
    "options": [
      {
        "key": "A",
        "text": "Configurar la observabilidad entre cuentas de Amazon CloudWatch designando una cuenta central de monitoreo con un sink compartido y vinculando las cuentas de origen con AWS Organizations."
      },
      {
        "key": "B",
        "text": "Configurar suscripciones de Amazon CloudWatch Logs en cada cuenta hacia flujos de Amazon Data Firehose que entreguen registros a un bucket de S3 para análisis en Amazon Athena."
      },
      {
        "key": "C",
        "text": "Crear paneles independientes de Amazon CloudWatch en cada cuenta miembro individual y compartir los enlaces de acceso mediante roles de IAM asumidos por el equipo de operaciones."
      },
      {
        "key": "D",
        "text": "Programar exportaciones periódicas de métricas y registros de CloudWatch hacia Amazon S3 en cada cuenta y configurar consultas analíticas programadas mediante Amazon OpenSearch Service."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La observabilidad entre cuentas (CloudWatch cross-account observability) permite designar una cuenta de monitoreo central con un sink compartido y vincular de forma automática todas las cuentas de origen dentro de AWS Organizations. Permite correlacionar y buscar métricas, grupos de registros y trazas de AWS X-Ray de todas las cuentas en una experiencia unificada sin construir canalizaciones de telemetría personalizadas.\n\n**Por qué las otras no:**\n- **B ✗** Firehose con Athena requiere construir y mantener canalizaciones de datos y solo aborda registros de texto; no ofrece tableros de métricas en tiempo real ni trazas interactivas de X-Ray.\n- **C ✗** Cambiar de cuenta en cuenta para ver 50 paneles fragmentados destruye la visibilidad operativa y dificulta la correlación de fallos entre servicios.\n- **D ✗** Exportar a S3 y montar un clúster de OpenSearch Service introduce altos costos de infraestructura, parches y administración continua en comparación con la función nativa de CloudWatch.\n\n🔑 **Concepto clave:** Telemetría multi-cuenta unificada nativa (métricas, logs y trazas X-Ray): Amazon CloudWatch cross-account observability."
  },
  {
    "id": 31,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Mejorar la seguridad y los controles de gobernanza",
    "multi": true,
    "multiCount": 2,
    "multiNote": "(Elija DOS)",
    "stem": "Una auditoría de seguridad basada en el principio de mínimo privilegio reveló que cientos de roles IAM en una organización de AWS tienen políticas con permisos excesivos (incluyendo comodines como Action: *). La empresa exige identificar con precisión qué permisos no han sido utilizados en los últimos 90 días y generar nuevas políticas IAM restrictivas basadas en la actividad real de las cargas de trabajo.\n\n¿Qué DOS acciones combinadas cumplirán este requisito?",
    "options": [
      {
        "key": "A",
        "text": "Configurar IAM Access Analyzer con un analizador de acceso no utilizado a nivel de organización para identificar roles, políticas y claves de acceso que no se han empleado en 90 días."
      },
      {
        "key": "B",
        "text": "Descargar y analizar el informe de credenciales de IAM de cada cuenta para identificar las fechas de última actividad y modificar manualmente las políticas asociadas a cada rol."
      },
      {
        "key": "C",
        "text": "Utilizar la función de generación de políticas de IAM Access Analyzer basada en la actividad histórica registrada en AWS CloudTrail para crear políticas con permisos mínimos exactos."
      },
      {
        "key": "D",
        "text": "Configurar los hallazgos de seguridad de Amazon GuardDuty en la categoría de IAM para identificar roles comprometidos y restringir automáticamente sus políticas asociadas."
      },
      {
        "key": "E",
        "text": "Revisar la comprobación de uso de IAM en AWS Trusted Advisor y eliminar manualmente las acciones administrativas que muestren alertas de riesgo potencial en la consola."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C son correctas:**\n1. IAM Access Analyzer permite crear analizadores de acceso no utilizado (unused access analyzers) a nivel de AWS Organizations (Opción A) para identificar de forma continua y automatizada qué roles, usuarios y permisos específicos no han sido utilizados dentro del período definido (por ejemplo 90 días).\n2. La función de generación de políticas de IAM Access Analyzer (Opción C) analiza los registros de eventos de AWS CloudTrail capturados durante un período representativo de actividad del rol y redacta automáticamente una política IAM ajustada con solo las acciones exactas y recursos ejecutados.\n\n**Por qué las otras no:**\n- **B ✗** El informe de credenciales de IAM solo reporta el uso de contraseñas y claves de acceso por usuarios; no analiza el uso granular de acciones en roles de aplicación.\n- **D ✗** GuardDuty detecta actividad anómala o potencialmente maliciosa (amenazas); no audita ni refactoriza políticas de mínimo privilegio.\n- **E ✗** Trusted Advisor solo ofrece comprobaciones de alto nivel como la presencia de MFA en la cuenta raíz; no genera políticas IAM adaptadas a cargas de trabajo.\n\n🔑 **Concepto clave:** Ajuste a mínimo privilegio en IAM: IAM Access Analyzer (analizador de acceso no utilizado + generador de políticas basado en CloudTrail)."
  },
  {
    "id": 32,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Mejorar la seguridad y los controles de gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa gestiona más de 300 buckets de Amazon S3 distribuidos en 40 cuentas de AWS. Para cumplir con la normativa de protección de datos, el equipo de seguridad debe descubrir automáticamente datos confidenciales y personales (PII) como números de tarjetas de crédito, documentos de identidad y registros médicos almacenados en los objetos de S3, generando alertas centralizadas sin revisar manualmente cada bucket.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar la protección de almacenamiento de Amazon GuardDuty para analizar metadatos y accesos anómalos sobre los buckets de Amazon S3 en todas las cuentas de la organización."
      },
      {
        "key": "B",
        "text": "Desplegar agentes de Amazon Inspector en instancias EC2 para ejecutar análisis continuos de vulnerabilidades sobre los sistemas de archivos montados desde los buckets de S3."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon Macie designando una cuenta de seguridad como administrador delegado en AWS Organizations, activar el descubrimiento automatizado de datos confidenciales y enrutar hallazgos a EventBridge y SNS."
      },
      {
        "key": "D",
        "text": "Desplegar reglas administradas de AWS Config en todas las cuentas para verificar que los buckets de S3 tengan habilitado el cifrado en reposo con claves KMS administradas por el cliente."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon Macie es el servicio de seguridad de datos de AWS que utiliza aprendizaje automático y coincidencia de patrones para descubrir, clasificar y proteger datos confidenciales (PII, credenciales, información financiera) almacenados en Amazon S3. Al integrarlo con AWS Organizations mediante un administrador delegado, permite activar el descubrimiento automatizado de datos confidenciales en todas las cuentas de la empresa y publicar hallazgos en EventBridge para alertas.\n\n**Por qué las otras no:**\n- **A ✗** GuardDuty S3 Protection detecta patrones de acceso inusuales o llamadas a la API sospechosas sobre S3; no inspecciona el contenido interno de los objetos para clasificar PII.\n- **B ✗** Amazon Inspector escanea vulnerabilidades de software y dependencias; no realiza análisis de clasificación de datos confidenciales en buckets de almacenamiento.\n- **D ✗** AWS Config valida metadatos de configuración (como si el cifrado está activo); no puede leer ni clasificar el contenido de los archivos.\n\n🔑 **Concepto clave:** Descubrimiento y clasificación automatizada de datos confidenciales (PII) en S3: Amazon Macie multi-cuenta con AWS Organizations."
  },
  {
    "id": 33,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Mejorar la seguridad y los controles de gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría de seguridad exigió a una empresa eliminar el uso de servidores bastión (bastion hosts) expuestos a Internet con el puerto SSH (22) abierto y claves públicas compartidas. Los ingenieros necesitan conectarse mediante consola y ejecutar comandos en instancias EC2 ubicadas en subredes estrictamente privadas sin asignar direcciones IP públicas, sin abrir puertos de entrada en los grupos de seguridad y manteniendo un registro de auditoría completo de cada sesión.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Implementar EC2 Instance Connect en todas las instancias y restringir las reglas de entrada del grupo de seguridad del host bastión a los rangos de direcciones IP públicas de la oficina."
      },
      {
        "key": "B",
        "text": "Implementar AWS Systems Manager Session Manager con registro de auditoría en Amazon S3 y CloudWatch Logs, eliminar las reglas de entrada en los grupos de seguridad y configurar interface VPC endpoints."
      },
      {
        "key": "C",
        "text": "Desplegar un endpoint de AWS Client VPN en la VPC para que los administradores se conecten a la red privada y continúen autenticándose mediante claves SSH compartidas tradicionales."
      },
      {
        "key": "D",
        "text": "Configurar la rotación automática de claves SSH cada 30 días mediante AWS Secrets Manager y limitar el acceso al puerto 22 mediante una lista blanca dinámica en AWS WAF."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Systems Manager Session Manager permite la gestión de instancias seguras y auditables sin abrir puertos de entrada (inbound rules) en los grupos de seguridad, sin necesitar servidores bastión ni gestionar pares de claves SSH. La comunicación ocurre a través del agente SSM mediante tráfico de salida (o a través de VPC endpoints privados de interfaz para ssm, ssmmessages y ec2messages). Permite registrar cada pulsación de tecla y comando ejecutado en Amazon S3 y CloudWatch Logs.\n\n**Por qué las otras no:**\n- **A ✗** EC2 Instance Connect sigue requiriendo conectividad directa de red entrante al puerto 22 (SSH) en la instancia y grupos de seguridad abiertos.\n- **C ✗** Client VPN establece conectividad de red pero mantiene el uso de claves SSH compartidas sin eliminar la sobrecarga de administración ni proporcionar auditoría de comandos a nivel de sesión.\n- **D ✗** Rotar claves con Secrets Manager no elimina la necesidad de abrir el puerto 22 ni proporciona la gestión centralizada y auditada que Session Manager entrega de forma nativa.\n\n🔑 **Concepto clave:** Acceso seguro a instancias privadas sin puertos de entrada ni claves SSH: AWS Systems Manager Session Manager + VPC Endpoints."
  },
  {
    "id": 34,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 Diseñar e implementar redes de distribución y canalizaciones CI/CD",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un videojuego multijugador global en tiempo real ejecuta sus servidores de juego detrás de Network Load Balancers (NLB) que manejan tráfico de red basado en el protocolo UDP en 3 Regiones de AWS. Los jugadores necesitan conectarse mediante una dirección IP estática única, minimizar la latencia de red y contar con mitigación contra ataques distribuidos de denegación de servicio (DDoS).\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar una distribución de Amazon CloudFront con los balanceadores Network Load Balancers configurados como orígenes personalizados para acelerar el contenido en el borde."
      },
      {
        "key": "B",
        "text": "Configurar un dominio en Amazon Route 53 utilizando una política de enrutamiento basada en latencia para resolver las direcciones IP de los Network Load Balancers más cercanos."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon S3 Transfer Acceleration en los servidores de juegos para optimizar la velocidad de transferencia de paquetes a través de la red troncal global de AWS."
      },
      {
        "key": "D",
        "text": "Implementar un acelerador estándar en AWS Global Accelerator asignando dos direcciones IP anycast estáticas y configurando grupos de puntos de enlace regionales hacia los balanceadores NLB."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS Global Accelerator proporciona dos direcciones IP anycast estáticas globales que actúan como punto de entrada único para los clientes. Enruta el tráfico TCP y UDP ingresando a través de los puntos de presencia (PoP) de AWS más cercanos al usuario y transportándolo por la red privada de AWS optimizada y libre de congestión hacia los NLBs regionales, reduciendo significativamente la fluctuación (jitter) y latencia en UDP, con protección DDoS de AWS Shield integrada.\n\n**Por qué las otras no:**\n- **A ✗** Amazon CloudFront es una red de entrega de contenido (CDN) diseñada para tráfico HTTP/HTTPS y WebSocket en capa 7; no admite tráfico UDP en capa de transporte.\n- **B ✗** Route 53 responde consultas DNS; no proporciona direcciones IP anycast estáticas fijas ni enruta el tráfico directamente a través de la red troncal privada de AWS una vez resuelto el nombre.\n- **C ✗** S3 Transfer Acceleration está diseñado exclusivamente para acelerar cargas y descargas de objetos hacia buckets de Amazon S3.\n\n🔑 **Concepto clave:** Aceleración global para tráfico no-HTTP / UDP con IPs estáticas anycast: AWS Global Accelerator."
  },
  {
    "id": 35,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Determinar oportunidades para mejorar la fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación de computación de alto rendimiento (HPC) utiliza la interfaz de paso de mensajes (MPI) para ejecutar simulaciones científicas distribuidas en 64 instancias Amazon EC2 de la familia c5. Actualmente las instancias se encuentran distribuidas entre múltiples Zonas de Disponibilidad en una región, lo que provoca una latencia de comunicación de nodo a nodo inaceptable que ralentiza severamente el cálculo distribuido.\n\n¿Qué cambio en la arquitectura de red y computación optimizará al máximo el rendimiento de la aplicación?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar las instancias en un grupo de ubicación de clúster (cluster placement group) dentro de una única Zona de Disponibilidad y utilizar instancias que admitan Elastic Fabric Adapter (EFA)."
      },
      {
        "key": "B",
        "text": "Desplegar las instancias en un grupo de ubicación de dispersión (spread placement group) distribuido equitativamente entre las tres Zonas de Disponibilidad para evitar fallos de hardware."
      },
      {
        "key": "C",
        "text": "Desplegar las instancias en un grupo de ubicación de partición (partition placement group) asignando cada nodo de procesamiento a una partición lógica independiente dentro de la VPC."
      },
      {
        "key": "D",
        "text": "Distribuir las instancias en múltiples regiones de AWS mediante conexiones de inter-region VPC peering para reducir la congestión en los conmutadores de red locales."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Un grupo de ubicación de clúster (Cluster Placement Group) empaqueta las instancias físicamente cerca dentro de una única Zona de Disponibilidad, logrando la latencia de red más baja posible y el mayor rendimiento de paquetes por segundo (hasta 100 Gbps). Combinarlo con Elastic Fabric Adapter (EFA) permite omitir la pila de red del sistema operativo (OS bypass) y ejecutar transferencias directas de memoria para aplicaciones MPI y HPC.\n\n**Por qué las otras no:**\n- **B ✗** Un spread placement group coloca cada instancia en hardware físico independiente en diferentes racks para aislar fallos, lo que incrementa la distancia física y la latencia entre nodos.\n- **C ✗** Un partition placement group se utiliza para sistemas distribuidos como HDFS o Cassandra para evitar fallos correlacionados; no minimiza la latencia de red para HPC.\n- **D ✗** Distribuir entre regiones introduce latencias intercontinentales que destruirían el rendimiento de una simulación MPI altamente acoplada.\n\n🔑 **Concepto clave:** Computación HPC / MPI de latencia ultra-baja entre nodos: Cluster Placement Group + Elastic Fabric Adapter (EFA) en una sola Zona de Disponibilidad."
  },
  {
    "id": 36,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Determinar oportunidades para mejorar la fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Durante un evento anual de compras masivas, el grupo de Auto Scaling de una aplicación web crítica no pudo aprovisionar nuevas instancias EC2 debido a que alcanzó inesperadamente la cuota predeterminada de vCPUs para instancias On-Demand de la cuenta. La empresa exige una solución proactiva a nivel corporativo que prevenga incidentes similares y notifique antes de alcanzar los límites de servicio en todas las cuentas de la organización.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar el grupo de Auto Scaling para distribuirse en un mayor número de Zonas de Disponibilidad y subredes privadas para eludir las restricciones de cuotas zonales."
      },
      {
        "key": "B",
        "text": "Programar recordatorios mensuales en el calendario corporativo para que los ingenieros de operaciones revisen manualmente el panel de límites de AWS Trusted Advisor."
      },
      {
        "key": "C",
        "text": "Utilizar Service Quotas para configurar alarmas de CloudWatch sobre el uso de cuotas críticas (por ejemplo al 80%), solicitar incrementos por adelantado y aplicar plantillas de solicitud de cuotas organizacionales."
      },
      {
        "key": "D",
        "text": "Modificar la configuración de lanzamiento del grupo de Auto Scaling para utilizar exclusivamente instancias Spot en lugar de On-Demand para omitir las restricciones de cuotas de cómputo."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** AWS Service Quotas permite visualizar y administrar de forma centralizada los límites de servicio de AWS. Permite configurar alarmas de Amazon CloudWatch directamente sobre el porcentaje de utilización de las cuotas (por ejemplo al alcanzar el 80%), solicitar aumentos automáticos con anticipación antes de eventos críticos y aplicar una Service Quota Request Template a nivel de AWS Organizations para que cualquier cuenta nueva reciba las cuotas requeridas automáticamente.\n\n**Por qué las otras no:**\n- **A ✗** Las cuotas de vCPU de EC2 son a nivel de región y cuenta; agregar más zonas de disponibilidad dentro de la misma región no incrementa la cuota total de vCPUs permitidas.\n- **B ✗** Las revisiones manuales en Trusted Advisor son propensas a errores humanos y no emiten alertas automáticas cuando un evento de escalado rápido consume la cuota.\n- **D ✗** Las instancias Spot también tienen sus propias cuotas de vCPU independientes en Service Quotas y están sujetas a interrupciones involuntarias durante eventos de alta demanda.\n\n🔑 **Concepto clave:** Gobernanza proactiva y monitorización de límites de recursos: Service Quotas + CloudWatch Alarms + Service Quota Request Templates organizacionales."
  },
  {
    "id": 37,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Determinar oportunidades para mejorar la fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una flota de 200 instancias Amazon EC2 muestra una utilización promedio de CPU del 15%. El equipo de arquitectura sospecha que las instancias están sobredimensionadas, pero las métricas estándar de CloudWatch no reflejan la utilización de memoria RAM. La empresa necesita recomendaciones precisas de optimización de tamaño (right-sizing) que tengan en cuenta tanto la CPU como la memoria para reducir costos sin afectar el rendimiento.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Revisar el informe de optimización de costos en AWS Trusted Advisor y proceder a reducir el tamaño de todas las instancias que muestren bajo uso sostenido de CPU."
      },
      {
        "key": "B",
        "text": "Habilitar AWS Compute Optimizer a nivel de organización en AWS Organizations e instalar el agente de Amazon CloudWatch en las instancias para publicar métricas de memoria."
      },
      {
        "key": "C",
        "text": "Crear alarmas de Amazon CloudWatch que detengan automáticamente las instancias EC2 cuando su utilización promedio de CPU permanezca por debajo del 20% durante una hora."
      },
      {
        "key": "D",
        "text": "Modificar manualmente los tipos de instancia en los grupos de Auto Scaling para descender a familias de menor capacidad y monitorizar si los usuarios reportan incidencias de rendimiento."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Compute Optimizer utiliza algoritmos de aprendizaje automático para analizar el historial de utilización y generar recomendaciones de dimensionamiento óptimo (right-sizing) para instancias EC2, grupos de Auto Scaling, volúmenes EBS y funciones Lambda. Al instalar el agente unificado de CloudWatch en las instancias para enviar la métrica de memoria (mem_used_percent), Compute Optimizer incorpora el consumo de RAM en su análisis y evita recomendaciones erróneas que podrían degradar la aplicación.\n\n**Por qué las otras no:**\n- **A ✗** Trusted Advisor evalúa únicamente instancias de muy bajo uso basadas solo en CPU y red; no analiza patrones de memoria ni ofrece la granularidad de familias de Compute Optimizer.\n- **C ✗** Detener instancias cuando la CPU es baja destruye la disponibilidad de los servicios en producción; el objetivo es ajustar el tamaño, no apagar servidores activos.\n- **D ✗** El ensayo y error manual es un enfoque empírico de alto riesgo que puede causar caídas de producción por falta de memoria (OOM).\n\n🔑 **Concepto clave:** Recomendaciones de optimización de instancias con análisis de memoria: AWS Compute Optimizer + Agente unificado de Amazon CloudWatch."
  },
  {
    "id": 38,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Mejorar la seguridad y los controles de gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Las cuentas de sandbox y experimentación de una organización experimentan gastos excesivos no planificados. La dirección exige una solución que envíe alertas al equipo cuando el gasto real o proyectado alcance el 80% y el 100% del límite mensual, y que restrinja automáticamente el aprovisionamiento de nuevas instancias EC2 en la cuenta si el gasto alcanza el 100% del presupuesto asignado.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar AWS Budgets con alertas de gasto real y pronosticado al 80% y 100%, y asociar una acción de presupuesto que aplique una política restrictiva que deniegue ec2:RunInstances al exceder el límite."
      },
      {
        "key": "B",
        "text": "Configurar alarmas de facturación en Amazon CloudWatch con notificaciones a Amazon SNS y programar un trabajo cron en Jenkins para revisar la factura consolidada de la organización."
      },
      {
        "key": "C",
        "text": "Desplegar una política de control de servicios (SCP) en la unidad organizativa de Sandbox que limite de manera fija el costo mensual total de los recursos desplegados en las cuentas."
      },
      {
        "key": "D",
        "text": "Habilitar AWS Cost Anomaly Detection para monitorear anomalías de gasto en Sandbox y configurar una regla de EventBridge que termine automáticamente todas las instancias en ejecución."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Budgets permite definir presupuestos de costos y uso personalizados, configurando notificaciones por correo o SNS basadas tanto en el gasto real acumulado como en el pronosticado. Además, admite Budget Actions (acciones de presupuesto), que pueden aplicar automáticamente una política de control de servicios (SCP), una política IAM restrictiva (por ejemplo denegando ec2:RunInstances) o detener instancias específicas cuando se alcanza un umbral definido.\n\n**Por qué las otras no:**\n- **B ✗** Las alarmas de facturación de CloudWatch solo envían notificaciones; no pueden ejecutar acciones automatizadas de remediación o bloqueo como las Budget Actions.\n- **C ✗** Las Service Control Policies (SCPs) controlan permisos y llamadas a la API de AWS; no tienen visibilidad de montos monetarios o costos de facturación acumulados.\n- **D ✗** Cost Anomaly Detection identifica patrones de gasto inusuales basándose en machine learning, pero terminar todas las instancias en ejecución es destructivo e indiscriminado.\n\n🔑 **Concepto clave:** Control de gastos con acciones automáticas de bloqueo: AWS Budgets con Budget Actions (política IAM o SCP restrictiva al 100%)."
  },
  {
    "id": 39,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Diseñar estrategias de migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa necesita migrar una base de datos PostgreSQL local de 45 TB hacia Amazon Aurora PostgreSQL. La base de datos opera continuamente y procesa cientos de transacciones por segundo. La empresa requiere que la base de datos de producción permanezca completamente disponible durante la migración y que la ventana final de corte e indisponibilidad (cutover) sea inferior a 1 hora.\n\n¿Qué estrategia de migración cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Realizar un volcado completo de la base de datos con pg_dump hacia un bucket de S3, transferir los archivos por la red y restaurar los datos en Aurora PostgreSQL con pg_restore durante la ventana."
      },
      {
        "key": "B",
        "text": "Desplegar una máquina virtual en AWS con una réplica de PostgreSQL nativa mediante streaming replication física, y promover la máquina virtual a producción durante la ventana de mantenimiento."
      },
      {
        "key": "C",
        "text": "Utilizar AWS Database Migration Service (AWS DMS) con carga completa y captura de datos modificados (CDC), manteniendo Aurora sincronizada hasta realizar la conmutación final."
      },
      {
        "key": "D",
        "text": "Tomar una instantánea del sistema de archivos local de PostgreSQL y utilizar AWS DataSync para replicar los bloques de almacenamiento hacia volúmenes de Amazon EBS conectados a Aurora."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** AWS Database Migration Service (AWS DMS) con captura de datos modificados (CDC) es la solución estándar para migraciones de bases de datos con tiempo de inactividad mínimo. Realiza una carga completa inicial mientras la base de datos de origen sigue activa y, a continuación, lee continuamente los registros de transacciones (WAL) para replicar los cambios en tiempo real hacia Aurora. Al momento del corte, la conmutación solo requiere unos minutos para apuntar la aplicación al clúster de Aurora.\n\n**Por qué las otras no:**\n- **A ✗** Exportar y restaurar 45 TB con pg_dump/pg_restore toma muchas horas o días, violando drásticamente el límite de corte de 1 hora y requiriendo detener la producción.\n- **B ✗** Streaming replication física nativa hacia una EC2 requiere gestionar manualmente un servidor PostgreSQL autoadministrado en lugar de migrar directamente al motor gestionado de Aurora.\n- **D ✗** DataSync no puede replicar bloques de almacenamiento en vivo hacia Amazon Aurora, ya que Aurora utiliza una arquitectura de almacenamiento distribuido propietaria desacoplada.\n\n🔑 **Concepto clave:** Migración de bases de datos con tiempo de inactividad casi nulo: AWS Database Migration Service (AWS DMS) con Full Load + Ongoing Replication (CDC)."
  },
  {
    "id": 40,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Diseñar estrategias de migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una organización necesita migrar 200 servidores locales virtualizados en VMware vSphere hacia Amazon EC2. El plan de migración exige que la replicación se realice a nivel de bloque para capturar el sistema operativo completo, aplicaciones y datos sin interrumpir el funcionamiento de los servidores locales. Adicionalmente, se deben poder realizar pruebas de lanzamiento no disruptivas en AWS antes del corte final.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Utilizar el servicio VM Import/Export mediante scripts automatizados para convertir cada disco de máquina virtual en una imagen AMI de Amazon EC2 tras apagar los servidores locales."
      },
      {
        "key": "B",
        "text": "Utilizar AWS Application Migration Service (AWS MGN) instalando el agente de replicación para sincronizar datos a nivel de bloque y realizar pruebas de lanzamiento no disruptivas."
      },
      {
        "key": "C",
        "text": "Desplegar AWS DataSync en el hipervisor VMware para sincronizar periódicamente los archivos de configuración y discos virtuales hacia un bucket de Amazon S3 en la región de destino."
      },
      {
        "key": "D",
        "text": "Configurar copias de seguridad de máquinas virtuales con AWS Backup Gateway y programar la restauración de las instancias en Amazon EC2 únicamente durante la ventana de transición final."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Application Migration Service (AWS MGN) es el servicio de migración recomendado por AWS para migrar aplicaciones basadas en servidores físicos y virtuales hacia Amazon EC2. Utiliza replicación continua a nivel de bloque no disruptiva, mantiene la sincronización en tiempo real y permite realizar pruebas de lanzamiento completas en una subred de prueba aislada sin afectar las cargas locales antes del corte final.\n\n**Por qué las otras no:**\n- **A ✗** VM Import/Export requiere apagar los servidores o capturar imágenes estáticas de discos, lo que genera tiempo de inactividad no planificado y no admite pruebas incrementales.\n- **C ✗** DataSync sincroniza archivos y metadatos de almacenamiento; no convierte máquinas virtuales en instancias de cómputo EC2 ejecutables ni orquestación de migración de servidores.\n- **D ✗** AWS Backup Gateway realiza copias puntuales de respaldo; no ofrece replicación continua ni pruebas de corte orquestadas con configuración de red.\n\n🔑 **Concepto clave:** Migración masiva de servidores físicos/VMware con replicación a nivel de bloque y pruebas no disruptivas: AWS Application Migration Service (AWS MGN)."
  },
  {
    "id": 41,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Desarrollar soluciones para la modernización",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación web heredada desarrollada en .NET Framework se ejecuta sobre servidores Windows Server con Internet Information Services (IIS) en el centro de datos local. La empresa planea migrar la carga de trabajo a AWS sin realizar cambios en el código fuente, pero desea eliminar la sobrecarga operativa de administrar servidores físicos y parches del sistema operativo, permitiendo escalado horizontal automático.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar instancias EC2 con Windows Server en un grupo de Auto Scaling y configurar scripts de PowerShell en user data para instalar y configurar IIS en cada lanzamiento."
      },
      {
        "key": "B",
        "text": "Empaquetar la aplicación en contenedores de Windows y desplegarla en Amazon ECS con el tipo de inicio AWS Fargate detrás de un Application Load Balancer."
      },
      {
        "key": "C",
        "text": "Desplegar la aplicación en un clúster de Amazon EKS administrando manualmente nodos de trabajo basados en instancias EC2 de Windows Server configuradas con Auto Scaling."
      },
      {
        "key": "D",
        "text": "Reescribir los módulos de la aplicación ASP.NET en Node.js y desplegarlos como funciones AWS Lambda sin servidor detrás de un balanceador Application Load Balancer."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Amazon ECS admite contenedores de Windows Server en el modo sin servidor de AWS Fargate. Esto permite empaquetar la aplicación existente en un contenedor de Windows con IIS sin modificar el código fuente y delegar completamente a AWS la administración del hardware, clúster y parches del sistema operativo de los nodos, escalando dinámicamente las tareas detrás de un ALB.\n\n**Por qué las otras no:**\n- **A ✗** Lanzar instancias EC2 completas mantiene la carga administrativa de parchado del sistema operativo, administración de licencias y mantenimiento de servidores.\n- **C ✗** Administrar nodos de trabajo autogestionados en EKS añade una sobrecarga operativa y de complejidad muy superior a la solución Fargate sin servidor.\n- **D ✗** Reescribir la aplicación en Node.js para Lambda viola el requisito explícito de migrar sin cambios en el código fuente.\n\n🔑 **Concepto clave:** Modernización de aplicaciones Windows/.NET sin servidores ni cambios de código: Contenedores Windows en Amazon ECS con AWS Fargate."
  },
  {
    "id": 42,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Diseñar estrategias de migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una institución cinematográfica necesita migrar un archivo histórico de 2 PB de vídeos locales hacia Amazon S3 Glacier Flexible Retrieval. La conexión a Internet corporativa está limitada a 1 Gbps y el equipo de redes solo puede destinar un máximo de 300 Mbps para tareas de migración de datos. La empresa exige transferir todos los datos en el menor tiempo posible y al menor costo.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Configurar tareas de transferencia en AWS DataSync a través de la conexión a Internet existente, limitando el consumo de ancho de banda a 300 Mbps hasta completar los 2 PB."
      },
      {
        "key": "B",
        "text": "Contratar un enlace dedicado de AWS Direct Connect de 10 Gbps para transferir los 2 PB de datos a través de una private virtual interface hacia Amazon S3 Glacier en una semana."
      },
      {
        "key": "C",
        "text": "Solicitar múltiples dispositivos AWS Snowball Edge Storage Optimized para cargar los datos localmente y enviarlos por correo seguro a AWS, aplicando reglas de ciclo de vida hacia S3 Glacier."
      },
      {
        "key": "D",
        "text": "Solicitar un contenedor AWS Snowmobile para transferir los 2 PB de datos en un único viaje de transporte especializado hacia el centro de datos de la región de AWS."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Transferir 2 PB a través de una conexión de 300 Mbps tomaría más de dos años. Utilizar múltiples dispositivos AWS Snowball Edge Storage Optimized (cada uno con hasta 80 TB de capacidad utilizable) permite transferir los datos localmente a velocidades de red local de 10 Gbps y enviarlos por mensajería física segura a AWS, completando la ingesta masiva en pocas semanas al menor costo. Una regla de ciclo de vida en S3 transfiere los objetos a Glacier de inmediato.\n\n**Por qué las otras no:**\n- **A ✗** A 300 Mbps, 2 PB de datos demorarían aproximadamente 650 días continuos de transmisión ininterrumpida.\n- **B ✗** Contratar un enlace dedicado de 10 Gbps de Direct Connect implica meses de aprovisionamiento de telecomunicaciones y costos astronómicos para una migración puntual.\n- **D ✗** AWS Snowmobile está diseñado para conjuntos de datos de escala de exabytes (decenas o cientos de PB); para 2 PB, la familia Snowball Edge es significativamente más ágil y económica.\n\n🔑 **Concepto clave:** Migración masiva de datos (petabytes) con ancho de banda de red limitado: Familia de dispositivos físicos AWS Snowball Edge."
  },
  {
    "id": 43,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Diseñar estrategias de migración",
    "multi": true,
    "multiCount": 2,
    "multiNote": "(Elija DOS)",
    "stem": "Una empresa necesita migrar 80 TB de datos no estructurados almacenados en un NAS local hacia Amazon S3. La empresa solo cuenta con una conexión a Internet de 100 Mbps, por lo que transferir todos los datos por la red tardaría varios meses. Los archivos continúan modificándose diariamente en el NAS. La empresa necesita transferir los datos iniciales rápidamente y, posteriormente, mantener sincronizados los cambios incrementales hasta el corte definitivo.\n\n¿Qué DOS acciones combinadas cumplirán este requisito?",
    "options": [
      {
        "key": "A",
        "text": "Solicitar un dispositivo AWS Snowball Edge Storage Optimized para realizar la transferencia masiva inicial de los 80 TB de datos de manera local y desconectada."
      },
      {
        "key": "B",
        "text": "Configurar AWS Storage Gateway en modo File Gateway conectado a la red local para sincronizar todos los 80 TB de datos a través de la conexión a Internet de 100 Mbps."
      },
      {
        "key": "C",
        "text": "Comprimir todos los datos en archivos ZIP locales de gran tamaño y cargarlos en partes paralelas hacia Amazon S3 mediante scripts de AWS CLI a través de la red existente."
      },
      {
        "key": "D",
        "text": "Desplegar un agente de AWS DataSync en la red local para sincronizar los cambios incrementales generados en el NAS a través del enlace de 100 Mbps después de la carga inicial."
      },
      {
        "key": "E",
        "text": "Solicitar el envío de un camión de transporte de datos AWS Snowmobile para conectar el centro de datos local a la red de alta velocidad de AWS."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "explanation": "**Respuestas correctas: A y D**\n\n**Por qué A y D son correctas:**\n1. Para mover los 80 TB iniciales con una conexión de solo 100 Mbps (que tardaría ~75 días continuos), la mejor práctica es utilizar un dispositivo físico AWS Snowball Edge Storage Optimized (Opción A) para copiar los datos a velocidad de red local y enviarlo a AWS.\n2. Una vez que los datos iniciales están en S3, se despliega un agente de AWS DataSync (Opción D) sobre la conexión de 100 Mbps para detectar y transferir únicamente los cambios delta e incrementales diarios, manteniendo S3 sincronizado hasta el cutover.\n\n**Por qué las otras no:**\n- **B ✗** File Gateway no acelera la transferencia de la carga masiva inicial y seguiría limitado por los 100 Mbps de red.\n- **C ✗** Comprimir y usar la CLI sobre 100 Mbps sigue tardando meses y consume capacidad computacional local sin solucionar el cuello de botella de red.\n- **E ✗** AWS Snowmobile es para migraciones masivas superiores a 10 PB; no está dimensionado ni disponible para 80 TB.\n\n🔑 **Concepto clave:** Migración híbrida masiva con red lenta: Carga masiva inicial con AWS Snowball Edge + Sincronización delta incremental con AWS DataSync."
  },
  {
    "id": 44,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Diseñar estrategias de migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa requiere migrar sus servidores de archivos locales basados en Windows Server hacia AWS. El almacenamiento total es de 80 TB y los datos se comparten a través del protocolo SMB, integrados estrechamente con Microsoft Active Directory para la gestión de listas de control de acceso NTFS (ACLs). La solución en AWS debe ser totalmente administrada, mantener la integración con Active Directory y preservar de forma intacta los permisos NTFS existentes.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar un sistema de archivos Amazon EFS y configurar el protocolo SMB en clientes Windows mediante servicios de emulación de software de terceros en EC2."
      },
      {
        "key": "B",
        "text": "Lanzar instancias EC2 con Windows Server en un grupo de Auto Scaling y configurar volúmenes Amazon EBS compartidos con Multi-Attach para hospedar los recursos compartidos."
      },
      {
        "key": "C",
        "text": "Desplegar un sistema de archivos Amazon FSx for Windows File Server Multi-AZ integrado con Active Directory, y utilizar AWS DataSync para migrar los datos conservando los metadatos y ACLs."
      },
      {
        "key": "D",
        "text": "Migrar todos los archivos a un bucket de Amazon S3 y modificar las aplicaciones corporativas para acceder a los datos mediante la API REST de S3 o AWS Storage Gateway."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon FSx for Windows File Server es un sistema de archivos totalmente administrado que se ejecuta sobre Windows Server nativo y proporciona acceso completo mediante el protocolo SMB con compatibilidad total de listas de control de acceso (ACLs) NTFS. Se une de forma nativa a Microsoft Active Directory (AWS Managed o autoadministrado). Utilizar AWS DataSync permite migrar los 80 TB preservando de forma exacta los propietarios, marcas de tiempo y permisos NTFS.\n\n**Por qué las otras no:**\n- **A ✗** Amazon EFS utiliza el protocolo NFS para entornos Linux; no admite de forma nativa el protocolo SMB ni las ACLs de seguridad de Windows NTFS.\n- **B ✗** Administrar servidores de archivos en EC2 mantiene la carga operativa de parches y gestión de almacenamiento en lugar de utilizar un servicio gestionado.\n- **D ✗** Modificar las aplicaciones para usar S3 requiere una reescritura de código extensa e incompatibilidad con las herramientas que dependen del sistema de archivos SMB de Windows.\n\n🔑 **Concepto clave:** Servidores de archivos Windows SMB con integración Active Directory y permisos NTFS: Amazon FSx for Windows File Server + AWS DataSync."
  },
  {
    "id": 45,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Desarrollar soluciones para la modernización",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación monolítica basada en Java fue migrada mediante rehosting a una única instancia Amazon EC2 de gran tamaño detrás de un Application Load Balancer. La aplicación guarda el estado de sesión de los usuarios en la memoria local de la máquina virtual, lo que impide escalar horizontalmente añadiendo más instancias en un grupo de Auto Scaling sin que los usuarios pierdan su sesión activa. La empresa exige escalar horizontalmente sin perder sesiones.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar sesiones persistentes (sticky sessions / afinidad basada en cookies) en el Application Load Balancer y duplicar el tamaño de la instancia EC2 única existente."
      },
      {
        "key": "B",
        "text": "Externalizar el estado de las sesiones de usuario hacia un clúster de Amazon ElastiCache for Redis Multi-AZ o una tabla de Amazon DynamoDB con TTL, convirtiendo las instancias EC2 en nodos sin estado."
      },
      {
        "key": "C",
        "text": "Configurar un volumen de almacenamiento en bloque Amazon EBS con soporte Multi-Attach montado simultáneamente en todas las instancias EC2 para almacenar los archivos de sesión."
      },
      {
        "key": "D",
        "text": "Desplegar un clúster de software distribuido en memoria Terracotta directamente sobre las instancias EC2 para sincronizar la memoria RAM de las sesiones a través de la red local."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** El principio de diseño fundamental para escalar horizontalmente es convertir la capa de cómputo en sin estado (stateless). Externalizar las sesiones de usuario hacia un almacén de datos centralizado y de baja latencia como Amazon ElastiCache (Redis/Valkey) o Amazon DynamoDB permite que cualquier instancia del grupo de Auto Scaling atienda cualquier solicitud sin que el usuario pierda su sesión si una instancia escala o se termina.\n\n**Por qué las otras no:**\n- **A ✗** Sticky sessions en el ALB dirige las peticiones a la misma instancia mientras viva, pero si la instancia falla o escala hacia abajo, todas las sesiones de esa instancia se pierden por completo.\n- **C ✗** EBS Multi-Attach requiere un sistema de archivos en clúster especializado (como GFS2) y no está diseñado como almacén de sesiones web de baja latencia.\n- **D ✗** Sincronizar memoria RAM entre instancias EC2 autogestionadas genera sobrecarga de red, es frágil ante eventos de auto-scaling y no desacopla el estado.\n\n🔑 **Concepto clave:** Escalado horizontal sin pérdida de sesiones: Externalizar el estado de sesión a Amazon ElastiCache o DynamoDB (capa de cómputo sin estado)."
  },
  {
    "id": 46,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Desarrollar soluciones para la modernización",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa ejecuta trabajos de procesamiento por lotes (batch) nocturnos de aproximadamente 6 horas en 200 servidores locales. Los trabajos están empaquetados en contenedores Docker y son tolerantes a fallos (pueden reiniciarse desde puntos de control si se interrumpe un nodo). La empresa busca migrar esta carga a AWS minimizando al máximo los costos de cómputo y sin necesidad de gestionar la infraestructura de orquestación de clústeres.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar AWS Batch con entornos de cómputo administrados configurados con instancias Spot utilizando la estrategia de asignación SPOT_CAPACITY_OPTIMIZED y reintentos automáticos de trabajos."
      },
      {
        "key": "B",
        "text": "Adquirir Instancias Reservadas Estándar de Amazon EC2 a 3 años con pago total por adelantado para aprovisionar 200 instancias dedicadas al procesamiento por lotes nocturno."
      },
      {
        "key": "C",
        "text": "Dividir las cargas de trabajo por lotes en miles de invocaciones síncronas de funciones AWS Lambda orquestadas mediante máquinas de estado de AWS Step Functions."
      },
      {
        "key": "D",
        "text": "Aprovisionar una flota fija de Hosts Dedicados de Amazon EC2 bajo demanda para garantizar que las instancias de procesamiento no compartan hardware físico con otros clientes."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Batch es un servicio totalmente administrado que provisiona, programa y escala automáticamente la capacidad de cómputo para trabajos en contenedores. Al configurar entornos de cómputo con instancias Spot y la estrategia SPOT_CAPACITY_OPTIMIZED, AWS Batch selecciona los grupos de instancias con menor probabilidad de interrupción ofreciendo hasta un 90% de ahorro frente a On-Demand. Al ser tolerante a fallos, los reintentos automáticos de trabajos garantizan la finalización exitosa.\n\n**Por qué las otras no:**\n- **B ✗** Pagar instancias reservadas durante 24 horas al día para una carga de trabajo que solo se ejecuta durante 6 horas en la noche desperdicia el 75% del costo de cómputo.\n- **C ✗** Las funciones AWS Lambda tienen un tiempo límite máximo de ejecución de 15 minutos; no pueden ejecutar trabajos monolíticos de 6 horas continuas.\n- **D ✗** Dedicated Hosts es la opción más costosa de EC2 y no aporta beneficios a una carga por lotes tolerante a fallos.\n\n🔑 **Concepto clave:** Procesamiento por lotes en contenedores tolerante a fallos con costo mínimo: AWS Batch con entornos de cómputo Spot e instancias administradas."
  },
  {
    "id": 47,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Desarrollar soluciones para la modernización",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene una aplicación monolítica crítica escrita en .NET ejecutándose sobre instancias Amazon EC2. La empresa desea descomponer gradualmente el monolito en microservicios independientes sin realizar una reescritura masiva de alto riesgo (big bang) y sin interrumpir la experiencia de los clientes que acceden al sistema a través de una única URL pública.\n\n¿Qué patrón de arquitectura de modernización y solución de AWS debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Detener el desarrollo de nuevas funciones y reescribir la totalidad de la aplicación monolítica en funciones AWS Lambda antes de realizar un corte total en producción."
      },
      {
        "key": "B",
        "text": "Migrar la máquina virtual existente a una imagen de contenedor en Amazon ECS y considerar completada la modernización arquitectónica sin separar las capas de negocio."
      },
      {
        "key": "C",
        "text": "Dividir inmediatamente la base de datos relacional central en múltiples bases de datos independientes antes de realizar cualquier modificación en el código del monolito."
      },
      {
        "key": "D",
        "text": "Implementar el patrón Strangler Fig desplegando un Application Load Balancer o Amazon API Gateway frente al monolito para desviar rutas específicas hacia nuevos microservicios en ECS o Lambda."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** El patrón Strangler Fig (higuera estranguladora) es el estándar de la industria y la mejor práctica recomendada por AWS para modernizar monolitos de forma incremental. Se coloca una fachada de enrutamiento (como un Application Load Balancer con enrutamiento basado en rutas o Amazon API Gateway) frente a la aplicación. Las nuevas funciones o módulos refactorizados se despliegan en microservicios (en ECS o Lambda), redirigiendo el tráfico ruta por ruta hasta retirar el monolito sin interrupciones.\n\n**Por qué las otras no:**\n- **A ✗** La reescritura big bang es una estrategia de altísimo riesgo que requiere congelar el negocio durante meses y suele fracasar.\n- **B ✗** Mover el monolito a un contenedor es solo un rehosting (lift and shift en contenedor); no descompone la aplicación en microservicios independientes.\n- **C ✗** Separar la base de datos primero antes del código genera inconsistencias y bloqueos severos en transacciones acopladas del monolito.\n\n🔑 **Concepto clave:** Descomposición incremental y segura de monolitos a microservicios: Patrón Strangler Fig con enrutamiento por rutas en ALB o API Gateway."
  },
  {
    "id": 48,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Desarrollar soluciones para la modernización",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa opera un servidor SFTP autogestionado sobre instancias Amazon EC2 para intercambiar archivos financieros con socios externos. El equipo de TI invierte horas semanales aplicando parches de seguridad al sistema operativo y manteniendo scripts de rotación de usuarios y scripts cron para transferir archivos a Amazon S3. La empresa requiere una solución totalmente administrada que elimine la gestión de servidores y almacene los datos directamente en S3.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar contenedores Docker con software SFTP de código abierto en Amazon ECS con AWS Fargate, utilizando Amazon EFS como sistema de almacenamiento compartido de archivos."
      },
      {
        "key": "B",
        "text": "Implementar un servidor SFTP administrado mediante AWS Transfer Family con un endpoint accesible desde Internet respaldado por Amazon S3 e integrado con un proveedor de identidades."
      },
      {
        "key": "C",
        "text": "Generar y distribuir URLs prefirmadas de Amazon S3 con vencimiento programado a cada socio externo para que realicen las transferencias directamente a través de navegadores web."
      },
      {
        "key": "D",
        "text": "Habilitar Amazon S3 Transfer Acceleration en los buckets de almacenamiento y solicitar a todos los socios comerciales que reprogramen sus clientes para utilizar la API REST de S3."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Transfer Family proporciona servidores SFTP, FTPS y FTP totalmente administrados y escalables. Los archivos transferidos se almacenan de forma nativa directamente en buckets de Amazon S3 (o Amazon EFS). Se integra con proveedores de identidad existentes (Microsoft Active Directory o personalizados mediante API Gateway + Lambda) y elimina por completo la necesidad de administrar instancias EC2, sistemas operativos o parches de seguridad.\n\n**Por qué las otras no:**\n- **A ✗** Contenedores en ECS siguen requiriendo la gestión de la aplicación SFTP de código abierto, configuración de autenticación y almacenamiento en EFS.\n- **C ✗** Las URLs prefirmadas requieren navegadores o clientes HTTP/HTTPS; los socios externos utilizan clientes y protocolos SFTP tradicionales automatizados.\n- **D ✗** S3 Transfer Acceleration requiere interactuar con la API REST de S3; obligar a los socios a modificar su software de transferencia es inviable comercialmente.\n\n🔑 **Concepto clave:** Servidores de transferencia SFTP totalmente administrados con backend en S3: AWS Transfer Family."
  },
  {
    "id": 49,
    "domain": "Temas emergentes — IA generativa responsable",
    "task": "Gobernanza y seguridad en inteligencia artificial generativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa desarrolla un asistente virtual de IA generativa corporativo utilizando modelos fundacionales en Amazon Bedrock. Para cumplir con las directivas éticas y de seguridad de la organización, la aplicación debe garantizar que: 1) el modelo no entregue asesoramiento legal o financiero (temas restringidos); 2) se bloquee o enmascare información de identificación personal (PII); y 3) los controles se apliquen de forma consistente independientemente del modelo fundacional utilizado.\n\n¿Qué solución cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Incorporar instrucciones y directivas de restricción de contenido dentro del prompt del sistema (system prompt) de cada modelo fundacional invocado por la aplicación."
      },
      {
        "key": "B",
        "text": "Desarrollar una función AWS Lambda intermedia que analice las respuestas generadas por los modelos utilizando expresiones regulares para detectar y eliminar palabras no permitidas."
      },
      {
        "key": "C",
        "text": "Configurar Amazon Bedrock Guardrails con filtros de contenido, temas denegados y filtros de información de identificación personal (PII), aplicando las políticas a entradas y salidas de modelos."
      },
      {
        "key": "D",
        "text": "Realizar un ajuste fino (fine-tuning) supervisado de cada modelo fundacional utilizando conjuntos de datos de entrenamiento especialmente curados para evitar los temas no deseados."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon Bedrock Guardrails permite implementar salvaguardas personalizadas y controles de seguridad para aplicaciones de IA generativa independientemente del modelo subyacente. Permite definir filtros de contenido dañino, temas denegados (denied topics), filtros de palabras sensibles y enmascaramiento o bloqueo de información de identificación personal (PII), evaluando tanto los prompts del usuario de entrada como las respuestas generadas por el modelo con trazabilidad y auditoría completas.\n\n**Por qué las otras no:**\n- **A ✗** Las instrucciones en el system prompt son vulnerables a ataques de inyección de prompts (prompt injection) y no ofrecen garantías deterministas de cumplimiento.\n- **B ✗** Las expresiones regulares en Lambda son frágiles, difíciles de mantener, no comprenden el contexto semántico de los temas y solo evalúan la salida, ignorando las entradas.\n- **D ✗** El ajuste fino (fine-tuning) es extremadamente costoso, debe repetirse para cada modelo y no garantiza el bloqueo estricto de PII ni temas denegados.\n\n🔑 **Concepto clave:** Salvaguardas, filtrado de contenido y cumplimiento ético en IA generativa: Amazon Bedrock Guardrails aplicable de forma transversal a múltiples modelos."
  },
  {
    "id": 50,
    "domain": "Temas emergentes — IA generativa responsable",
    "task": "Gobernanza y seguridad en inteligencia artificial generativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un sistema autónomo basado en agentes de IA generativa analiza solicitudes de clientes y propone acciones de alto impacto empresarial (como reembolsos financieros superiores a 10.000 USD y cambios de configuración en entornos de producción). La gobernanza corporativa exige supervisión humana obligatoria (human-in-the-loop): las operaciones no deben ejecutarse hasta que un operador humano las apruebe expresamente, permitiendo pausas de días o semanas con auditoría completa y tiempos de espera controlados.\n\n¿Qué solución arquitectónica cumple estos requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Implementar un flujo de trabajo estándar en AWS Step Functions con una tarea de callback (.waitForTaskToken) que envíe el token de aprobación a los revisores humanos y espere la respuesta."
      },
      {
        "key": "B",
        "text": "Configurar una regla programada en Amazon EventBridge que ejecute una función AWS Lambda cada 5 minutos para sondear una tabla de DynamoDB en busca de registros de aprobación pendientes."
      },
      {
        "key": "C",
        "text": "Publicar las solicitudes de aprobación en una cola de Amazon SQS con un tiempo de espera de visibilidad extendido y permitir que el agente de IA decida cuándo reintentar la ejecución."
      },
      {
        "key": "D",
        "text": "Ejecutar inmediatamente todas las operaciones propuestas por el agente en producción y desplegar un mecanismo de compensación automatizado para revertir los cambios si un humano los rechaza."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los flujos de trabajo estándar (Standard Workflows) de AWS Step Functions admiten el patrón de token de tarea (.waitForTaskToken), que pausa la ejecución de forma completamente desacoplada y sin costo de cómputo durante períodos de hasta 1 año. El token se envía a los revisores humanos (por correo, Slack o portal web) y, cuando el operador aprueba o rechaza, la llamada SendTaskSuccess o SendTaskFailure reanuda la máquina de estado con trazabilidad completa de auditoría.\n\n**Por qué las otras no:**\n- **B ✗** Las funciones Lambda tienen un tiempo límite máximo de 15 minutos; el sondeo continuo (polling) durante días o semanas desperdicia recursos y requiere diseñar un motor de estado propio.\n- **C ✗** Una cola SQS no garantiza la retención durante semanas (el período máximo de retención de SQS es de 14 días) y no obliga al agente a esperar la aprobación humana antes de proceder.\n- **D ✗** Ejecutar antes de aprobar viola flagrantemente el principio de human-in-the-loop y muchas operaciones de alto impacto (como reembolsos bancarios) no son reversibles automáticamente.\n\n🔑 **Concepto clave:** Flujos de aprobación humana (Human-in-the-loop) de larga duración en IA: AWS Step Functions Standard Workflows con patrón de callback (.waitForTaskToken)."
  },
  {
    "id": 51,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 — Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A multinational enterprise operates 60 AWS accounts within an organization in AWS Organizations across two AWS Regions: us-east-1 and eu-west-1. Each account contains a VPC hosting microservices that need to communicate with microservices in other accounts and Regions. Security policy mandates that all inter-VPC traffic must undergo deep packet inspection (DPI) with stateful rule filtering. The enterprise requires a centralized architecture that minimizes latency, avoids full-mesh VPC peering, and requires the LEAST operational overhead to scale as new accounts and VPCs are added. Which solution will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Create VPC peering connections between all 60 VPCs in us-east-1 and all VPCs in eu-west-1. In each VPC, deploy high-availability clusters of third-party stateful firewall virtual appliances on Amazon EC2 across multiple Availability Zones behind Network Load Balancers. Update local VPC route tables in all 60 accounts to point inter-VPC traffic to the firewalls, and establish inter-region peering connections between every individual VPC pair."
      },
      {
        "key": "B",
        "text": "Deploy an AWS Transit Gateway in us-east-1 only. Share the Transit Gateway with all accounts across both Regions using AWS RAM. Deploy AWS Network Firewall in us-east-1 in a centralized inspection VPC. Configure an inter-region AWS Direct Connect gateway connection to route all European VPC traffic across trans-Atlantic private circuits into us-east-1 for deep packet inspection before sending to destination VPCs."
      },
      {
        "key": "C",
        "text": "In each Region, deploy an AWS Transit Gateway in a dedicated Network account. Share the Transit Gateways with the organization using AWS RAM. In each Region, deploy AWS Network Firewall into a dedicated Inspection VPC attached to the regional Transit Gateway with appliance mode enabled. Peer the two Transit Gateways across Regions. Route inter-VPC traffic through the Inspection VPC in each Region before traversing the Transit Gateway peering connection."
      },
      {
        "key": "D",
        "text": "In each Region, configure AWS PrivateLink endpoint services for each microservice in every account. Deploy interface VPC endpoints in all 60 VPCs across both Regions to establish private connectivity between services. Configure VPC Flow Logs to publish to central Amazon CloudWatch Logs log groups, and enable Amazon GuardDuty and Amazon Detective to fulfill the deep packet inspection requirement."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Un Transit Gateway regional en una cuenta de red compartida mediante AWS RAM elimina la malla compleja de peering y escala a miles de VPCs. Desplegar AWS Network Firewall en una VPC de inspección dedicada con Appliance Mode activado en el attachment garantiza la simetría de flujo bidireccional requerida para firewalls con estado (stateful DPI). El peering nativo entre Transit Gateways conecta ambas regiones a través de la red privada de AWS con cifrado automático y mínimo overhead.\n\n**Por qué las otras no:**\n- **A ✗** Una malla completa de VPC peering para 60 cuentas en 2 regiones genera cientos de conexiones individuales inmanejables, y clústeres de EC2 con firewalls de terceros añaden alta sobrecarga operativa de escalado y parches.\n- **B ✗** Un Transit Gateway es regional y no puede conectarse directamente a VPCs de otra región sin un gateway local y peering. Enviar tráfico europeo a us-east-1 solo para inspección introduce latencia transatlántica inaceptable.\n- **D ✗** GuardDuty y VPC Flow Logs analizan metadatos y eventos a posteriori; no realizan inspección profunda de paquetes (DPI) en línea ni filtrado con estado. Además, PrivateLink entre decenas de microservicios genera una complejidad y costo inasumibles.\n\n🔑 **Concepto clave:** Para inspección centralizada con AWS Network Firewall o firewalls en Transit Gateway: siempre debe activarse Appliance Mode en el attachment de la VPC de inspección para garantizar la simetría de flujo (flow symmetry) y evitar caídas en conexiones con estado."
  },
  {
    "id": 52,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 — Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A financial institution is implementing a strict Data Perimeter strategy across 100 AWS accounts governed by AWS Organizations. The security team must ensure that sensitive data stored in Amazon S3 buckets can only be accessed by IAM principals belonging to the company's AWS Organization. Additionally, principals within the company's organization must be prevented from exfiltrating data to external S3 buckets owned by third parties from within the corporate network. Which combination of policies will satisfy these requirements with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "Configure a Service Control Policy (SCP) attached to the organization root that denies all s3 actions unless the request originates from specific corporate VPC endpoint IDs. In each member account, create IAM roles with permission boundaries that explicitly list every allowed corporate Amazon S3 bucket ARN, updating the policies as new buckets are created."
      },
      {
        "key": "B",
        "text": "In S3 bucket policies, add a condition requiring aws:PrincipalOrgID matching the company's Organization ID. Configure VPC endpoint policies on all S3 gateway endpoints with a condition requiring aws:ResourceOrgID matching the Organization ID, ensuring principals within the network cannot write to external buckets."
      },
      {
        "key": "C",
        "text": "Deploy an AWS Network Firewall rule group across all VPC egress points that performs TLS decryption and deep packet inspection on all outbound HTTPS calls to s3.amazonaws.com. Configure stateful inspection rules that evaluate HTTP request headers and drop any requests that do not present valid corporate identity session tokens."
      },
      {
        "key": "D",
        "text": "In all S3 bucket policies, add the aws:PrincipalArn condition explicitly listing all authorized IAM user and role ARNs across the 100 accounts. Configure an SCP on the organization root denying s3:PutObject and s3:GetObject to any S3 bucket that does not contain the mandatory resource tag Confidentiality:Corporate."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** La clave de condición aws:PrincipalOrgID en las políticas de bucket de S3 asegura que solo identidades de la organización corporativa accedan a los datos. La condición aws:ResourceOrgID en la política del VPC Gateway Endpoint de S3 impide que cualquier recurso o usuario dentro de la red corporativa envíe o lea datos de buckets de S3 que no pertenezcan a la organización corporativa, bloqueando la exfiltración a terceros sin requerir listar ARNs individuales.\n\n**Por qué las otras no:**\n- **A ✗** Listar cientos de VPC IDs en SCPs excede rápidamente los límites de tamaño de las políticas SCP (5.120 bytes), y las permission boundaries con listas explícitas de buckets requieren mantenimiento constante.\n- **C ✗** Inspeccionar TLS de endpoints de S3 con Network Firewall para evaluar cookies introduce latencia extrema, complejidad de certificados y sobrecarga operativa innecesaria.\n- **D ✗** Listar ARNs de usuarios en bucket policies no escala en 100 cuentas, y condicionar por tags en SCP no bloquea la subida de datos a buckets de terceros donde el atacante no controla las etiquetas.\n\n🔑 **Concepto clave:** Data Perimeter canónico de AWS: Identidades confiables en políticas de bucket con aws:PrincipalOrgID, y Recursos confiables en políticas de VPC Endpoint con aws:ResourceOrgID."
  },
  {
    "id": 53,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 — Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A healthcare company has connected its on-premises data center to AWS through two AWS Direct Connect dedicated connections terminating at an AWS Transit Gateway. The company operates 80 VPCs across multiple accounts. The on-premises environment uses Active Directory DNS (corp.example.com). Workloads on AWS use Amazon Route 53 Private Hosted Zones (aws.example.com). On-premises clients must resolve domain names in the AWS Private Hosted Zones, and EC2 instances in all 80 VPCs must resolve on-premises domain names with high availability and minimal management as new VPCs are deployed. Which solution will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "In a central Shared Services VPC connected to the Transit Gateway, create Route 53 Resolver inbound endpoints and outbound endpoints across multiple Availability Zones. Configure on-premises DNS forwarders for aws.example.com pointing to the inbound endpoint IPs. Create a Route 53 Resolver forwarding rule for corp.example.com pointing to on-premises DNS servers, and share the rule across the organization using AWS RAM. Associate the shared rule and Private Hosted Zones with all 80 VPCs."
      },
      {
        "key": "B",
        "text": "Deploy custom BIND DNS servers on EC2 instances across multiple AZs in each of the 80 VPCs. Configure DHCP option sets in each VPC pointing to these local BIND servers. Configure zone transfers between BIND and on-premises Active Directory DNS servers over Direct Connect, and configure local conditional forwarding rules for both aws.example.com and corp.example.local to sync records continuously."
      },
      {
        "key": "C",
        "text": "Deploy Route 53 Resolver inbound and outbound endpoints independently inside all 80 VPCs. In each individual VPC, create conditional forwarding rules for corp.example.com pointing directly to the on-premises DNS server IP addresses over Direct Connect, and associate the Private Hosted Zone for aws.example.com with each VPC route table using separate VPC endpoint policies."
      },
      {
        "key": "D",
        "text": "Associate the Route 53 Private Hosted Zone for aws.example.com directly with the on-premises customer gateway router IP addresses using BGP community route advertisements over Direct Connect. Configure public Route 53 Hosted Zones with latency-based alias routing policies for corp.example.com to resolve corporate internal domain names across the AWS network."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los Inbound Endpoints en una VPC centralizada permiten a los servidores on-premises resolver dominios de Route 53 Private Hosted Zones. Los Outbound Endpoints permiten a las VPCs resolver dominios corporativos locales mediante una Forwarding Rule. Al compartir dicha regla con toda la organización mediante AWS RAM, cualquier VPC existente o futura la hereda automáticamente sin necesidad de desplegar endpoints adicionales en cada VPC.\n\n**Por qué las otras no:**\n- **B ✗** Desplegar servidores BIND en 80 VPCs (160+ instancias EC2) requiere gestión manual de parches, configuración de zonas y alta sobrecarga operativa.\n- **C ✗** Crear endpoints de Resolver en las 80 VPCs genera costos masivos redundantes (se factura por ENI/hora de cada endpoint) cuando pueden centralizarse en una sola VPC compartida.\n- **D ✗** Las zonas privadas de Route 53 solo se asocian a VPCs, no a routers mediante BGP. Además, las zonas públicas exponen los nombres internos a Internet.\n\n🔑 **Concepto clave:** Arquitectura DNS Híbrida: Centraliza Inbound y Outbound Endpoints en una sola VPC de servicios compartidos y comparte las Forwarding Rules con toda la organización vía AWS RAM."
  },
  {
    "id": 54,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 — Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise manages 150 accounts under AWS Organizations. Corporate governance mandates that AWS resources may only be created in us-east-1 and us-west-2. The solutions architect must implement a Service Control Policy (SCP) attached to the organization root that blocks the creation of resources in any other Region. However, this policy must not break global AWS services, identity management, or CloudFront edge operations. Which configuration in the SCP will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Create an SCP with an Allow effect specifying us-east-1 and us-west-2 under the aws:RequestedRegion condition key. Detach the default FullAWSAccess SCP from the organization root to restrict all member accounts to only the specified Regions, and attach local IAM boundary policies to permit administrators access to global management services."
      },
      {
        "key": "B",
        "text": "In AWS Control Tower, enable data residency guardrails exclusively on the Core OU. Disable AWS CloudTrail in all member accounts located outside us-east-1 and us-west-2, and configure an Amazon EventBridge rule in the management account to detect any API calls originating from unapproved regional endpoints."
      },
      {
        "key": "C",
        "text": "In AWS Config, create an organization-wide rule that detects resources provisioned in unapproved Regions. Link the non-compliant rule events to an AWS Systems Manager Automation document that runs ec2:TerminateInstances and s3:DeleteBucket, and configure SNS alerts to notify compliance administrators of the termination."
      },
      {
        "key": "D",
        "text": "Create an SCP with a Deny effect on all actions, with a condition using StringNotEquals on aws:RequestedRegion specifying us-east-1 and us-west-2, and add a condition using NotAction or StringNotLike for global services such as iam, organizations, route53, cloudfront, support, and wafv2. Attach the SCP to the organization root or work OUs."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** La condición global aws:RequestedRegion restringe las llamadas API a las regiones autorizadas. Sin embargo, los servicios globales (IAM, CloudFront, Route 53, Organizations, Support) envían llamadas a endpoints globales o no regionales. Si se aplica un Deny explícito sin excluirlos en NotAction o condiciones similares, se bloquea la autenticación, la gestión de roles y la consola de AWS.\n\n**Por qué las otras no:**\n- **A ✗** Remover FullAWSAccess y usar solo un Allow por región rompe de inmediato todos los servicios globales, ya que sus llamadas no llevan la firma de las regiones especificadas.\n- **B ✗** Aplicar guardrails solo en la Core OU deja desprotegidas las 150 cuentas de producción y desarrollo. Desactivar CloudTrail viola la seguridad básica.\n- **C ✗** AWS Config es detectivo, no preventivo. Eliminar recursos después de creados causa disrupción y no evita que los datos se almacenen inicialmente en regiones prohibidas.\n\n🔑 **Concepto clave:** En SCPs con Deny en aws:RequestedRegion, SIEMPRE deben excluirse los servicios globales (iam, route53, cloudfront, organizations, support) para no romper la operatividad básica de la cuenta."
  },
  {
    "id": 55,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 — Diseñar arquitecturas fiables y resilientes a escala",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An online payment gateway processes millions of financial transactions daily across us-east-1 and us-west-2 behind Application Load Balancers in both Regions. The architecture requires deterministic global traffic routing with client requests entering AWS at the closest Point of Presence, automated health checking with failover within 30 seconds between Regions without relying on client DNS caching behaviors, and static Anycast IP addresses that external partners can safelist in their corporate firewalls. Which solution will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Configure Amazon Route 53 with an active-passive failover routing policy pointing to the two ALBs. Set the DNS record TTL to 10 seconds. Create Route 53 health checks associated with CloudWatch metric alarms in each Region to initiate regional traffic failover when the primary ALB reports sustained 5xx HTTP response codes."
      },
      {
        "key": "B",
        "text": "Deploy AWS Global Accelerator with two static Anycast IP addresses. Create an endpoint group for us-east-1 and an endpoint group for us-west-2, attaching the respective regional Application Load Balancers. Configure health checks in Global Accelerator with an interval of 10 seconds and a threshold of 3 consecutive checks to automate failover."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon CloudFront distribution with Origin Shield enabled in us-east-1. Configure an origin group containing the primary ALB in us-east-1 and the secondary ALB in us-west-2 with 502/503/504 failover criteria, and configure CloudFront Functions to rewrite client request headers based on regional health."
      },
      {
        "key": "D",
        "text": "Establish an AWS Site-to-Site VPN with BGP route propagation between the VPCs in both Regions. Use Equal-Cost Multi-Path (ECMP) routing to steer traffic across the AWS backbone, and configure internal Network Load Balancers in each Region to handle payment transactions with mutual TLS encryption."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Global Accelerator proporciona 2 direcciones Anycast IPv4 estáticas globales ideales para listas blancas de firewalls de socios. El tráfico entra por el PoP de AWS más cercano y viaja por la red troncal privada de AWS. Además, el failover ocurre a nivel de capa de red en menos de 30 segundos (3 intervalos de 10 seg) sin verse afectado por DNS caching o resolvers de clientes que ignoran el TTL.\n\n**Por qué las otras no:**\n- **A ✗** Route 53 depende del DNS; muchos resolvers de clientes almacenan en caché las respuestas durante decenas de minutos ignorando el TTL (DNS pinning), retrasando el failover. Además, los ALBs no tienen IPs estáticas fijas.\n- **C ✗** CloudFront utiliza dominios dinámicos y un pool masivo de IPs variables; no proporciona dos IPs estáticas fijas dedicadas para safelisting en firewalls de terceros.\n- **D ✗** Site-to-Site VPN es para conectar redes privadas corporativas on-premises, no para el ingreso de clientes y socios comerciales públicos en Internet.\n\n🔑 **Concepto clave:** Si el escenario exige IPs estáticas para safelisting y conmutación por error en menos de un minuto sin depender de la caché DNS de los clientes, la respuesta siempre es AWS Global Accelerator."
  },
  {
    "id": 56,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 — Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A regulated enterprise with 80 AWS accounts in AWS Organizations must centralize all API activity logs. The compliance framework mandates that all management and data events across all accounts and Regions must be logged and stored in a dedicated Log Archive AWS account in a central S3 bucket. Neither account administrators in member accounts nor the AWS Organizations management account root user may be able to modify, delete, or shorten the retention period of the stored logs for 10 years. CloudTrail log files must be encrypted with a Customer Managed Key (CMK) in AWS KMS. Which solution satisfies these requirements?",
    "options": [
      {
        "key": "A",
        "text": "In the Log Archive account, create an S3 bucket with S3 Object Lock enabled in compliance mode with a 10-year default retention period. Create a KMS CMK with a key policy allowing cloudtrail.amazonaws.com to generate data keys. In the management account, create an organization trail with the IncludeGlobalServiceEvents and IsMultiRegionTrail flags enabled, pointing to the central S3 bucket in the Log Archive account and configured with the KMS CMK."
      },
      {
        "key": "B",
        "text": "In the management account, create a central S3 bucket with S3 Versioning and S3 Lifecycle rules configured to transition objects to S3 Glacier Flexible Retrieval after 30 days and delete after 10 years. Encrypt the bucket with the default AWS managed key aws/s3, and create an organization trail with multi-Region logging enabled delivering to this central bucket."
      },
      {
        "key": "C",
        "text": "In the Log Archive account, create an S3 bucket with S3 Object Lock configured in governance mode for a 10-year retention duration. Attach an SCP to the organization root that denies s3:Delete actions on the log bucket ARN, and configure individual CloudTrail trails in all 80 member accounts using AWS CloudFormation StackSets delivering logs to this central bucket."
      },
      {
        "key": "D",
        "text": "Configure Amazon CloudWatch Logs log groups in each of the 80 member accounts with a 10-year retention policy. Use CloudWatch metric filters to send all log events to Amazon Kinesis Data Firehose in the Log Archive account, and configure Firehose to stream the records into an Amazon OpenSearch Service cluster with SSE-KMS encryption."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** S3 Object Lock en Compliance Mode garantiza que absolutamente nadie, incluido el usuario root de la cuenta de gestión o de la cuenta de archivo, pueda borrar objetos ni reducir el período de retención durante los 10 años. Un Organization Trail multi-región captura todos los eventos automáticamente, y una clave KMS CMK con la política adecuada permite a CloudTrail cifrar los registros entre cuentas.\n\n**Por qué las otras no:**\n- **B ✗** S3 Versioning y Lifecycle sin Object Lock Compliance Mode no impiden que un administrador o usuario root borre permanentemente versiones de objetos. Además, la clave administrada aws/s3 no admite políticas de clave personalizadas para cruce de cuentas.\n- **C ✗** Governance Mode permite que usuarios con permisos de bypass eliminen objetos. Además, los SCPs no aplican al usuario root de la cuenta de gestión.\n- **D ✗** Mantener 10 años de retención en CloudWatch Logs para 80 cuentas genera un costo astronómico de almacenamiento comparado con S3 y no provee el estándar legal de inmutabilidad de Object Lock Compliance Mode.\n\n🔑 **Concepto clave:** S3 Object Lock en Governance Mode admite bypass; solo Compliance Mode garantiza inmutabilidad absoluta donde ni el usuario root puede eliminar o alterar los archivos de auditoría."
  },
  {
    "id": 57,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 — Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A retail company hosts microservices across 50 production VPCs. All microservices require outbound Internet access to communicate with third-party payment gateways and external APIs. Direct outbound access from production VPCs via local Internet Gateways is strictly prohibited. All outbound Internet traffic must be filtered using stateful domain name (FQDN) allowlists and deep packet inspection. The solution must minimize NAT Gateway hourly charges and scale seamlessly without deploying individual NAT Gateways in every VPC. Which network architecture should the solutions architect implement?",
    "options": [
      {
        "key": "A",
        "text": "In each of the 50 production VPCs, deploy an AWS Network Firewall and an AWS NAT Gateway in a dedicated public subnet. Configure local VPC route tables with a default route (0.0.0.0/0) pointing to the NAT Gateway, and manage independent domain list rule groups inside each member account using customized CloudFormation templates."
      },
      {
        "key": "B",
        "text": "In each production VPC, create a VPC peering connection to a centralized Proxy VPC in a Shared Services account. Deploy a fleet of Squid proxy servers on Amazon EC2 instances behind an internal Application Load Balancer in the Proxy VPC, and configure proxy client environment variables in all production instances to route HTTP and HTTPS traffic."
      },
      {
        "key": "C",
        "text": "In a dedicated Network Egress account, deploy a centralized Egress VPC connected to the regional Transit Gateway. In the Egress VPC, launch AWS Network Firewall and NAT Gateways across multiple AZs. Configure Transit Gateway route tables to direct outbound 0.0.0.0/0 traffic to the Egress VPC. In AWS Network Firewall, configure stateful SNORT rule groups for domain filtering."
      },
      {
        "key": "D",
        "text": "Attach an Internet Gateway directly to each production VPC across all 50 accounts. Configure egress-only Internet Gateways in the private subnets, apply strict Network ACLs blocking outbound traffic to all destinations except corporate IP ranges, and configure Amazon Route 53 Resolver DNS Firewall rules in each account to block unauthorized domains."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Centralizar la salida a Internet en una Egress VPC conectada a Transit Gateway evita desplegar NAT Gateways redundantes en cada una de las 50 VPCs, reduciendo drásticamente los costos fijos por hora. AWS Network Firewall en la Egress VPC inspecciona los flujos salientes aplicando reglas con estado para permitir solo los nombres de dominio autorizados (FQDN allowlists) antes de pasar por los NAT Gateways hacia el Internet Gateway.\n\n**Por qué las otras no:**\n- **A ✗** Desplegar Network Firewall y NAT Gateways en cada una de las 50 VPCs (150+ dispositivos en total) multiplica enormemente los costos operativos y de licenciamiento.\n- **B ✗** VPC peering no soporta enrutamiento transitivo a través de proxies sin complejidad extrema, y administrar clústeres Squid en EC2 genera gran sobrecarga de mantenimiento.\n- **D ✗** Los Egress-only Internet Gateways son exclusivamente para tráfico IPv6; no funcionan con IPv4. Además, las IPs de APIs externas son dinámicas y no pueden filtrarse por Security Groups estáticos.\n\n🔑 **Concepto clave:** Para reducir costos de NAT Gateway y centralizar el filtrado de dominios: centraliza el tráfico saliente en una Egress VPC con AWS Network Firewall y NAT Gateways compartidos mediante Transit Gateway."
  },
  {
    "id": 58,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 — Prescribir controles de seguridad y gobernanza",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise has 200 AWS accounts organized by project teams in AWS Organizations. The enterprise has 3,000 developers who authenticate using an external corporate identity provider integrated with AWS IAM Identity Center via SAML 2.0. The security team currently manages over 400 static permission sets, which has become unmaintainable. The security team wants to transition to an Attribute-Based Access Control (ABAC) model so that developers can only manage AWS resources that belong to their assigned CostCenter and Project tags, and developers must not be able to modify or delete the tags on resources they create. Which combination of steps will achieve this requirement with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In the IT management account, deploy an AWS Service Catalog portfolio containing AWS CloudFormation templates with predefined IAM roles, security groups, and KMS keys. Share the portfolio with the entire organization using AWS Organizations integration. In each member account, assign launch constraints using local IAM roles with permission to provision the resources."
      },
      {
        "key": "B",
        "text": "Create an AWS CloudFormation StackSet in the management account with self-managed permissions. Create an AWS Lambda function triggered by an Amazon EventBridge rule on account creation that automatically deploys a landing zone template with standard IAM roles and security groups in every new account across all supported Regions."
      },
      {
        "key": "C",
        "text": "In each member account, create an IAM user for developers with permissions restricted by a permission boundary. Store pre-approved CloudFormation templates in a central Amazon S3 bucket in the management account, and grant member accounts read access through S3 bucket policies using the aws:PrincipalOrgID condition key."
      },
      {
        "key": "D",
        "text": "Use AWS Control Tower to create Account Factory for Terraform (AFT). Configure a centralized pipeline that builds custom AMI images containing pre-configured security agents and network settings, and automatically shares these golden AMIs with all member accounts via Amazon EC2 Image Builder and AWS RAM."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** El modelo ABAC en IAM Identity Center permite reemplazar cientos de permission sets estáticos por uno solo. Mapea los atributos del IdP a tags de principal (aws:PrincipalTag) y los compara en tiempo de ejecución con las etiquetas del recurso (aws:ResourceTag). Denegar tag:UntagResources y exigir aws:RequestTag en la creación evita que los usuarios eludan el control de acceso eliminando o alterando las etiquetas.\n\n**Por qué las otras no:**\n- **A ✗** Gestionar políticas basadas en roles con ARNs fijos en 200 cuentas genera miles de políticas estáticas imposibles de mantener y satura los límites de IAM.\n- **B ✗** Crear un permission set para cada combinación de CostCenter y Project es RBAC tradicional y multiplicaría los conjuntos de permisos a cientos, aumentando la carga operativa.\n- **C ✗** Los SCPs no evalúan de forma dinámica las comparaciones entre tags de principal SAML y tags de recursos con la granularidad necesaria para controlar accesos internos a nivel de API.\n\n🔑 **Concepto clave:** ABAC canónico en AWS: Mapea atributos en Attributes for access control de IAM Identity Center y usa una sola política comparando aws:PrincipalTag con aws:ResourceTag, colapsando cientos de permission sets."
  },
  {
    "id": 59,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.5 — Determinar estrategias de visibilidad y optimización de costos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A digital media enterprise operates 40 AWS accounts under a single consolidated billing organization in AWS Organizations. The accounts are divided into two Organizational Units (OUs): Production and Development. The enterprise purchases Compute Savings Plans and EC2 Instance Savings Plans in a designated FinOps billing account. Recently, the FinOps team discovered that idle or low-priority EC2 instances in the Development OU are automatically absorbing the Savings Plans discounts, leaving mission-critical production workloads in the Production OU paying on-demand rates. The enterprise needs to ensure that Production workloads receive first priority for discounts, Development accounts do not consume discounts intended for Production, and the solution requires the LEAST administrative effort. Which solution will achieve this goal?",
    "options": [
      {
        "key": "A",
        "text": "In the AWS Billing console of the management account, navigate to Preferences and turn off discount sharing for all accounts in the Development OU. Keep discount sharing enabled between the FinOps account and accounts in the Production OU, ensuring Savings Plans and Reserved Instances apply strictly to production workloads."
      },
      {
        "key": "B",
        "text": "Create an SCP attached to the Development OU that denies the ec2:RunInstances action for any EC2 instance type that matches the instance families covered by the corporate Savings Plans or Reserved Instances purchased by the FinOps account, forcing developers to use uncovered families."
      },
      {
        "key": "C",
        "text": "Move all accounts in the Development OU out of the current AWS Organization into a completely separate standalone billing structure with individual credit cards and separate invoices, effectively eliminating consolidated billing and discount sharing across environments."
      },
      {
        "key": "D",
        "text": "In AWS Budgets, configure an automated budget action for each account in the Development OU that automatically executes an SSM Automation document to stop all running EC2 instances whenever development usage exceeds a threshold of 500 USD per month."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** En AWS Organizations con Consolidated Billing, la funcionalidad nativa de Discount Sharing (Uso compartido de descuentos de RI y Savings Plans) permite desactivar el beneficio para cuentas específicas (en este caso, la OU Development). Esto garantiza que las instancias de desarrollo nunca absorban los descuentos comprados por FinOps, canalizando el 100% del beneficio hacia las cuentas de Production con solo un clic en la consola de facturación.\n\n**Por qué las otras no:**\n- **B ✗** Un SCP que prohíba tipos de instancias impide a los desarrolladores usar las instancias necesarias para sus pruebas y no resuelve la lógica de distribución financiera de descuentos.\n- **C ✗** Mover las cuentas fuera de la organización destruye la gobernanza centralizada, los guardrails de SCP, la visibilidad común y los descuentos por volumen de la factura unificada.\n- **D ✗** Detener instancias no evita que, mientras estén encendidas, consuman las horas de descuento de Savings Plans en tiempo real antes que las de producción.\n\n🔑 **Concepto clave:** Para evitar que cuentas secundarias (Dev/Test) consuman Savings Plans o RIs corporativos: desactiva el Discount Sharing en las preferencias de facturación de la cuenta de gestión."
  },
  {
    "id": 60,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 — Diseñar arquitecturas fiables y resilientes a escala",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A global retail platform requires a multi-region active-active database layer across us-east-1 and eu-west-1 to support local low-latency read and write operations. The business requirements mandate an RPO of less than 1 second and an RTO of less than 5 seconds in the event of a regional outage, automatic conflict resolution without custom application reconciliation code, encryption at rest using Customer Managed Keys (CMKs) in each Region, and minimal operational overhead to manage database replication and failover. Which solution meets these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon DynamoDB Global Table with replica tables in us-east-1 and eu-west-1. Configure each regional replica table to use a customer managed key (CMK) in its respective Region. The application in each Region writes to its local replica table, and DynamoDB resolves conflicts automatically using the last-writer-wins rule."
      },
      {
        "key": "B",
        "text": "Deploy Amazon Aurora PostgreSQL in us-east-1 as the primary cluster. Create an Aurora cross-region read replica in eu-west-1. In the application code, implement write-forwarding to send all write requests from Europe across trans-Atlantic connections to the US endpoint, while serving local reads from the replica."
      },
      {
        "key": "C",
        "text": "Deploy standalone Amazon DynamoDB tables in each Region. Deploy AWS Lambda functions triggered by DynamoDB Streams in both Regions to replicate item mutations bidirectionally across Regions using cross-region API calls, implementing custom conflict resolution logic based on transaction sequence IDs."
      },
      {
        "key": "D",
        "text": "Deploy Amazon DocumentDB Multi-Region clusters across us-east-1 and eu-west-1 with bidirectional Apache Kafka replication deployed on Amazon EC2 instances in both Regions, configuring Kafka Connect with SASL/SCRAM authentication to synchronize data with sub-second replication latency."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Amazon DynamoDB Global Tables proporciona replicación multimaestro bidireccional completamente gestionada con latencias de propagación sub-segundo (RPO < 1s). Cuenta con resolución nativa de conflictos (Last-Writer-Wins) sin código custom. Admite cifrado CMK regional en cada réplica y al ser activo-activo simétrico, el failover ante caída regional es casi instantáneo (RTO ~0).\n\n**Por qué las otras no:**\n- **A ✗** Aurora con write-forwarding es activo-pasivo; las escrituras desde Europa sufren alta latencia de ida y vuelta transatlántica y el failover requiere promover la réplica (tardando minutos, violando el RTO de 5 seg).\n- **C ✗** Replicar bidireccionalmente con Lambda y DynamoDB Streams añade gran complejidad operativa, latencia y riesgo de bucles infinitos de replicación que Global Tables ya resuelve de forma nativa.\n- **D ✗** Administrar un clúster Kafka en EC2 para replicación de bases de datos genera una altísima carga de mantenimiento y no ofrece la disponibilidad gestionada de DynamoDB Global Tables.\n\n🔑 **Concepto clave:** DynamoDB Global Tables es la solución nativa para bases de datos Active-Active Multi-Region con RPO < 1s y RTO ~0, resolución Last-Writer-Wins automática y soporte de CMKs independientes por región."
  },
  {
    "id": 61,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 — Diseñar estrategias de despliegue",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A critical financial application uses an Amazon Aurora PostgreSQL cluster. The company must perform a major engine version upgrade to access new compliance features. The application cannot tolerate more than 1 minute of downtime during the cutover window. Furthermore, the company requires a rollback strategy that preserves zero data loss in case unexpected application incompatibilities arise after the cutover. Which deployment strategy meets these requirements with the LEAST operational effort?",
    "options": [
      {
        "key": "A",
        "text": "Configure the ALB with an idle timeout of 60 seconds. Deploy AWS WAF on the ALB with a rate-based rule set to 10,000 requests per 5-minute period. Increase the Auto Scaling group maximum size to 200 instances and change the scaling metric to average CPU utilization with a 40% threshold to absorb traffic bursts."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon CloudFront distribution in front of the ALB. Configure the CloudFront distribution with an origin request policy that forwards all headers, query strings, and cookies, but caches responses for 60 seconds. Enable AWS Shield Advanced on the CloudFront distribution to mitigate volumetric load."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon Simple Queue Service (Amazon SQS) FIFO queue between the web tier and an asynchronous processing tier. Configure the web application to enqueue incoming requests immediately and return an HTTP 202 Accepted response with a polling token. Configure a target tracking scaling policy based on the SQS queue depth."
      },
      {
        "key": "D",
        "text": "Replace the Application Load Balancer with a Network Load Balancer (NLB) operating in cross-zone load balancing mode. Configure Amazon ElastiCache for Redis behind the NLB to cache all incoming POST requests in memory, and configure the EC2 instances to poll Redis for new requests at a fixed rate of 10,000 items per minute."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon Aurora Blue/Green Deployments crea un entorno de prueba duplicado y mantiene la replicación lógica sincronizada sin pérdida de datos. La conmutación (switchover) toma típicamente menos de 1 minuto (a menudo bajo 30 segundos) mediante guardrails de tiempo y conmutación de nombres DNS integrados. Si surge un problema, el entorno Blue original se mantiene disponible para un rollback seguro.\n\n**Por qué las otras no:**\n- **A ✗** Restaurar un snapshot para un volumen grande toma horas y no replica los datos que sigan escribiéndose durante el proceso, generando pérdida de datos o tiempos de corte extensos.\n- **B ✗** Configurar DMS manualmente con esquemas y tablas LOB complejas requiere alta sobrecarga de configuración y validación en comparación con la función nativa de Blue/Green Deployments de Aurora.\n- **D ✗** Una actualización in-place con apply-immediately de una versión mayor bloquea la base de datos durante varios minutos o decenas de minutos, violando el límite de 1 minuto de inactividad, y no ofrece marcha atrás directa sin restaurar un snapshot.\n\n🔑 **Concepto clave:** Para actualizaciones mayores de versión en Aurora o RDS con tiempo de inactividad mínimo (< 1 minuto) y rollback seguro: la solución nativa recomendada es Amazon RDS/Aurora Blue/Green Deployments."
  },
  {
    "id": 62,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 — Diseñar soluciones de continuidad de negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A travel booking portal operates on an Amazon EKS cluster in us-east-1. The portal requires a cross-region Disaster Recovery strategy to eu-central-1 with an RTO of less than 5 minutes and an RPO of less than 1 minute. The application manifests and configurations are managed in Git repositories. The database is already using Amazon DynamoDB Global Tables. Which architecture provides the required failover capability with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon Aurora Global Database with the primary DB cluster in us-east-1 and a secondary DB cluster in us-west-2. Deploy the application on Amazon EC2 instances in both Regions behind regional ALBs. Use Route 53 with a latency-based routing policy. In the event of an outage, promote the secondary cluster to primary using the Aurora console or AWS CLI."
      },
      {
        "key": "B",
        "text": "Deploy Amazon RDS for PostgreSQL in us-east-1 with Multi-AZ enabled. Create a cross-region read replica in us-west-2. Configure an AWS Lambda function triggered by Route 53 health check failures to promote the cross-region read replica to standalone primary, update the application configuration, and perform DNS failover."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon Aurora PostgreSQL Multi-AZ cluster in us-east-1. Configure AWS Backup to take automated hourly snapshots of the Aurora cluster and copy them to us-west-2. In the event of a disaster, use an AWS CloudFormation template to restore the cluster from the latest snapshot in us-west-2 and launch the application fleet."
      },
      {
        "key": "D",
        "text": "Deploy standalone Amazon Aurora PostgreSQL clusters in both us-east-1 and us-west-2. Use AWS Database Migration Service (AWS DMS) with continuous change data capture (CDC) to replicate data bidirectionally between both clusters. Use Amazon Route 53 weighted routing with equal weights to distribute traffic evenly across both Regions."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Tener un clúster standby activo gobernado por GitOps (como ArgoCD o Flux) asegura que la infraestructura de contenedores esté idéntica y lista en todo momento sin retrasos de aprovisionamiento. Route 53 Application Recovery Controller (ARC) provee conmutadores de enrutamiento altamente confiables en plano de datos que ejecutan el desvío de tráfico en segundos sin depender del plano de control de Route 53, cumpliendo sobradamente el RTO < 5 min.\n\n**Por qué las otras no:**\n- **B ✗** Crear un clúster EKS desde cero toma entre 10 y 15 minutos solo para el plano de control, lo que viola directamente el RTO de 5 minutos.\n- **C ✗** Restaurar volúmenes EBS de nodos EKS entre regiones no recupera el plano de control gestionado de Kubernetes ni recrea las definiciones de pods y servicios de forma confiable.\n- **D ✗** Los clústeres de Amazon EKS son regionales y no pueden extender nodos de trabajo hacia otra región de AWS; los planos de control de EKS no operan en modo multi-región stretch.\n\n🔑 **Concepto clave:** Amazon EKS es un servicio regional y no puede extenderse entre regiones. Para RTO < 5 min, usa un clúster standby pre-aprovisionado sincronizado mediante GitOps y gestionado por Route 53 ARC."
  },
  {
    "id": 63,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 — Determinar controles de seguridad según requerimientos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise B2B service exposes a REST API to external corporate partners. To meet strict regulatory banking requirements, the architecture must enforce mutual TLS (mTLS) authentication with custom client certificates, inspect requests for OWASP Top 10 web vulnerabilities, prevent public exposure of the backend microservices hosted on EC2 instances in private subnets, and automatically rotate backend database credentials every 30 days without downtime. Which solution will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Create an Amazon S3 bucket with S3 Versioning enabled. Configure a lifecycle rule to transition objects to S3 Glacier Flexible Retrieval after 30 days and to S3 Glacier Deep Archive after 90 days. Enable S3 Object Lock in governance mode with a retention period of 7 years, allowing administrators to modify retention settings if compliance mandates change."
      },
      {
        "key": "B",
        "text": "Create an Amazon S3 bucket with S3 Versioning and S3 Object Lock enabled in compliance mode with a retention period of 7 years. Configure an S3 Lifecycle rule to transition objects to S3 Glacier Flexible Retrieval after 30 days and to S3 Glacier Deep Archive after 90 days. Restrict bucket policy permissions to prevent deletion before the retention period expires."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon S3 bucket and attach a bucket policy that denies s3:DeleteObject and s3:DeleteObjectVersion with a condition matching the current timestamp against the object creation date plus 7 years. Configure a lifecycle rule to transition objects to S3 Glacier Instant Retrieval after 30 days and S3 One Zone-IA after 90 days."
      },
      {
        "key": "D",
        "text": "Create an AWS Backup backup vault with AWS Backup Vault Lock enabled in compliance mode. Configure a daily backup plan that copies files from an Amazon EFS file system to the vault, with a lifecycle rule to move recovery points to cold storage after 30 days and retain them for 7 years, disallowing early deletion by any user."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon API Gateway soporta mTLS de forma nativa en nombres de dominio personalizados validando certificados contra un truststore en S3. La integración con AWS WAF bloquea ataques OWASP Top 10. El uso de VPC Link permite comunicarse con servicios internos en subredes privadas sin exponerlos a Internet. AWS Secrets Manager con una función Lambda de rotación nativa rota credenciales de base de datos de manera transparente y sin tiempo de inactividad.\n\n**Por qué las otras no:**\n- **A ✗** Parameter Store no tiene rotación automática administrada de base de datos nativa con doble secret (como Secrets Manager) y los cron jobs en EC2 causan inconsistencias y tiempos de caída.\n- **B ✗** CloudFront por sí solo no termina mTLS validando un truststore de clientes corporativos de la misma manera que API Gateway mTLS nativo. Guardar credenciales en texto plano en S3 es una violación grave de seguridad.\n- **C ✗** Pasar certificados en headers HTTP tras terminación en NLB es propenso a suplantación si no se firma criptográficamente, y reiniciar instancias EC2 para rotar credenciales provoca disrupción del servicio.\n\n🔑 **Concepto clave:** Para APIs con requerimiento de mutual TLS (mTLS) e integración con microservicios privados: usa Amazon API Gateway con dominio mTLS (S3 truststore) + VPC Link hacia un NLB interno + AWS Secrets Manager para rotación sin downtime."
  },
  {
    "id": 64,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.4 — Diseñar estrategias para cumplir requerimientos de fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An e-commerce platform processes high-priority order requests that must be processed strictly in the order they are received, without duplicates. The orders are processed in batches of 10 by an AWS Lambda function. If a single order within a batch fails due to an unexpected transient error, only the failing order should be retried, while successfully processed orders in the same batch must not be reprocessed. Unprocessable orders after 5 retries must be moved to secondary storage for forensic analysis without blocking the main processing stream. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In the application code, use the AWS SDK to retrieve credentials from AWS Systems Manager Parameter Store SecureString parameters at startup. Configure a Lambda function to rotate the credentials in both the database and Parameter Store every 30 days, and restart the EC2 instances through SSM Run Command to pick up the new credentials."
      },
      {
        "key": "B",
        "text": "Store the database credentials in AWS Secrets Manager. Configure automatic rotation for the secret every 30 days using the built-in Secrets Manager rotation Lambda function for Aurora MySQL. Update the application to retrieve the credentials from Secrets Manager using the caching client library and attach an IAM role to the EC2 instances granting secretsmanager:GetSecretValue."
      },
      {
        "key": "C",
        "text": "Enable IAM database authentication on the Amazon Aurora MySQL DB cluster. Modify the application code to generate IAM database authentication tokens dynamically using the AWS SDK for each new database connection. Grant the EC2 instance profile an IAM policy allowing rds-db:connect to the specific database user."
      },
      {
        "key": "D",
        "text": "Store database credentials encrypted with AWS KMS customer managed keys (CMK) inside the EC2 instance user data script. Configure a monthly CloudWatch alarm that invokes an AWS Step Functions state machine to update the user data script, rotate the database password, and execute an AMI rolling deployment of the Auto Scaling group."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** SQS FIFO garantiza orden estricto (First-In, First-Out) y procesamiento exactamente una vez (de-duplicación). La funcionalidad ReportBatchItemFailures en el event source mapping de Lambda permite devolver solo los IDs de los mensajes que fallaron, de modo que SQS reintente exclusivamente esos mensajes individuales sin volver a ejecutar los 9 mensajes exitosos del lote. El DLQ con maxReceiveCount=5 aísla los mensajes venenosos sin bloquear la cola FIFO.\n\n**Por qué las otras no:**\n- **A ✗** Kinesis procesa particiones completas; si un registro falla en una partición Kinesis, todo el shard se bloquea hasta que el registro pase o expire (a menos que se divida el lote), requiriendo lógica de idempotencia custom compleja.\n- **C ✗** SQS Standard no garantiza orden estricto (puede entregar mensajes desordenados y duplicados). Además, borrar mensajes manualmente en el código en lugar de usar ReportBatchItemFailures es ineficiente y propenso a errores.\n- **D ✗** Fan-out a 10 colas estándar rompe el orden de los mensajes en el procesamiento y añade una sobrecarga innecesaria de recursos.\n\n🔑 **Concepto clave:** Para lotes de Lambda con SQS (especialmente FIFO): siempre usa ReportBatchItemFailures para devolver los messageId fallidos y evitar que los mensajes exitosos se reprocesen innecesariamente."
  },
  {
    "id": 65,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.5 — Diseñar soluciones para cumplir objetivos de rendimiento",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A biotechnology research institute runs genomic sequencing workloads on a cluster of Amazon EC2 instances in an Auto Scaling group. The workload requires sub-millisecond file system latency, hundreds of thousands of IOPS, and several gigabytes per second of throughput against shared data sets that are currently stored in an Amazon S3 bucket. The analysis runs periodically for 48-hour bursts. The solution must provide high-performance POSIX file access and synchronize data back to Amazon S3 automatically with minimal management. Which storage architecture should be deployed?",
    "options": [
      {
        "key": "A",
        "text": "Deploy the web tier into a public subnet and the application tier into a private subnet within the same VPC. Configure Security Group rules on the application tier to allow inbound traffic only from the web tier Security Group ID. Configure Network ACLs on the private subnet to allow inbound traffic from the public subnet CIDR block only."
      },
      {
        "key": "B",
        "text": "Create two separate VPCs: a Web VPC and an App VPC. Establish a VPC peering connection between the two VPCs. In the App VPC, configure the application tier Security Group to reference the Web VPC security group ID as the source for inbound traffic on the application port, and update the route tables accordingly."
      },
      {
        "key": "C",
        "text": "Deploy the web tier in a public subnet and the application tier in a private subnet. Create an AWS Network Firewall endpoint in an inspection subnet between the two tiers. Configure stateful 5-tuple firewall rules to inspect all traffic between the web subnet and application subnet, and disable intra-VPC route propagation."
      },
      {
        "key": "D",
        "text": "Deploy the application tier behind an internal Application Load Balancer. In the web tier, configure AWS WAF rules to inspect outbound traffic heading to the application tier. Configure an AWS PrivateLink endpoint service for the internal ALB and establish interface VPC endpoints in the web tier subnets."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Amazon FSx for Lustre está diseñado específicamente para cargas de trabajo HPC, aprendizaje automático y procesamiento genómico, ofreciendo latencias de sub-milisegundo, millones de IOPS y cientos de GB/s de rendimiento. Su integración nativa con Amazon S3 mediante Data Repository Association (DRA) sincroniza archivos bidireccionalmente de forma automática y transparente sin scripts externos.\n\n**Por qué las otras no:**\n- **B ✗** Amazon EFS tiene latencias de varios milisegundos y un modelo de throughput más costoso para cargas HPC que demandan gigabytes por segundo continuos. Además, usar rsync para sincronizar con S3 es ineficiente y propenso a fallas.\n- **C ✗** EBS io2 Block Express es un almacenamiento en bloque que solo puede montarse como Multi-Attach en modo compartido por un número muy limitado de instancias (máximo 16) y requiere un cluster file system no nativo como GFS2. Samba añade un cuello de botella severo.\n- **D ✗** Usar daemons personalizados para transferir archivos entre Instance Store y S3 reinventa la rueda, carece de la interfaz POSIX compartida entre instancias y añade una sobrecarga operativa extrema.\n\n🔑 **Concepto clave:** Cargas de trabajo HPC, ML o genómica que requieren acceso POSIX compartido, millones de IOPS, GB/s de throughput y sincronización nativa con S3: la respuesta es siempre Amazon FSx for Lustre."
  },
  {
    "id": 66,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.6 — Determinar estrategias de optimización de costos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A digital photography company processes over 500,000 raw image uploads daily. The processing pipeline is asynchronous: users upload images to an Amazon S3 bucket, and processed thumbnails and metadata must be generated within 4 hours. The volume of uploads fluctuates wildly throughout the day, with major peaks during evening hours. The company runs containerized image processing workers on Amazon EKS. Which combination of architectural choices will minimize compute and storage costs while maintaining the 4-hour SLA?",
    "options": [
      {
        "key": "A",
        "text": "Deploy a fleet of Amazon EC2 c5n.18xlarge instances in an Auto Scaling group distributed across three Availability Zones. Configure an Amazon EFS file system with Provisioned Throughput mode mounted across all instances. Use TCP communication for inter-node MPI messaging and configure jumbo frames (MTU 9000) on all network interfaces."
      },
      {
        "key": "B",
        "text": "Deploy Amazon EC2 instances with Elastic Fabric Adapter (EFA) enabled within a cluster placement group in a single Availability Zone. Use an Amazon FSx for Lustre file system linked to an Amazon S3 bucket for high-performance parallel POSIX storage, and execute the MPI jobs using the Libfabric interface."
      },
      {
        "key": "C",
        "text": "Use AWS Batch with AWS Fargate compute environments configured with maximum vCPU and memory allocations. Configure an Amazon FSx for OpenZFS file system attached to the Fargate tasks, and configure AWS Step Functions to orchestrate parallel map tasks across 10,000 concurrent containers in multiple Regions."
      },
      {
        "key": "D",
        "text": "Deploy Amazon EC2 instances within a spread placement group across multiple Availability Zones to ensure physical hardware isolation. Attach Amazon EBS io2 Block Express volumes with 256,000 IOPS to each instance, and configure an internal Network Load Balancer with cross-zone load balancing to distribute MPI network packets."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** El uso de una cola SQS desacopla la ingesta de las subidas y actúa como búfer natural para el SLA holgado de 4 horas. Karpenter escala rápidamente nodos EC2 Spot diversificados según la profundidad de la cola, ahorrando hasta un 90% en costos de cómputo frente a On-Demand. S3 Intelligent-Tiering optimiza el costo del almacenamiento automáticamente sin penalizaciones de recuperación.\n\n**Por qué las otras no:**\n- **A ✗** Provisioned Concurrency en Lambda cobra por capacidad ociosa las 24 horas del día, lo que resulta sumamente costoso para cargas que fluctúan y no requieren procesamiento en tiempo real.\n- **B ✗** Mantener 20 instancias On-Demand como mínimo fijo genera un gasto inútil en horas valle cuando no hay procesamiento activo.\n- **D ✗** Comprar Reserved Instances a 3 años basadas en la capacidad del pico nocturno obliga a pagar por capacidad ociosa durante la mayor parte del día, lo que es la antítesis de la optimización de costos.\n\n🔑 **Concepto clave:** Cargas por lotes desacopladas con ventanas de tiempo holgadas (horas) y picos variables: la combinación más costo-eficiente es SQS + EC2 Spot (con Karpenter o Auto Scaling mixto) + S3 Intelligent-Tiering."
  },
  {
    "id": 67,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 — Determinar controles de seguridad según requerimientos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise has a global cloud footprint across 4 AWS Regions and 6 on-premises corporate offices connected via AWS Direct Connect. The enterprise needs to establish isolated network segments for Production, Development, and Corporate Shared Services across all Regions and on-premises environments. Security mandates that Development workloads must never be able to reach Production workloads, but both must reach Shared Services. The enterprise wants to manage global network routing and segmentation policies centrally through declarative policy documents rather than managing regional Transit Gateway route tables individually. Which solution should be implemented?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon CloudFront distribution in front of the Application Load Balancer. Configure CloudFront origin request policies to cache static media files at CloudFront Edge locations. Configure CloudFront with AWS WAF rate-based rules to protect against traffic spikes, and configure origin shield in the nearest Region to reduce origin load."
      },
      {
        "key": "B",
        "text": "Deploy AWS Global Accelerator and create an accelerator with two static Anycast IP addresses. Create an endpoint group for the AWS Region where the Application Load Balancer is deployed and attach the ALB as the endpoint. Configure client applications to connect to the Global Accelerator Anycast IP addresses instead of the ALB DNS name."
      },
      {
        "key": "C",
        "text": "Configure Amazon Route 53 with an IP-based routing policy that maps client IP ranges to the closest AWS Region. Configure AWS Direct Connect connections with public virtual interfaces in major metropolitan centers worldwide, and route global internet traffic over the Direct Connect connections directly to the ALB."
      },
      {
        "key": "D",
        "text": "Deploy an Application Load Balancer in each major geographical AWS Region. Configure inter-region VPC peering between all regional VPCs and the primary application VPC. In Amazon Route 53, configure a latency-based routing policy pointing to the regional ALBs, and enable cross-zone load balancing on all target groups."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Cloud WAN proporciona un modelo de red global administrado basado en políticas declarativas (Core Network Policy). Permite definir segmentos aislados (Production, Development, SharedServices) a escala multirregión e híbrida desde un único documento centralizado, eliminando la sobrecarga operativa de coordinar y sincronizar tablas de ruteo complejas en múltiples Transit Gateways individuales.\n\n**Por qué las otras no:**\n- **A ✗** La malla de VPC peering inter-región no escala a múltiples cuentas y regiones, y los Security Groups por sí solos no aíslan los segmentos a nivel de enrutamiento troncal.\n- **C ✗** Administrar manualmente mallas de Transit Gateways y sincronizar tablas de rutas con scripts o SSM en 4 regiones genera una complejidad operativa inmensa y propensa a desincronizaciones.\n- **D ✗** Desplegar Network Firewall en cada VPC es extremadamente costoso y descentralizado; las restricciones de segmentación deben aplicarse a nivel de arquitectura de red WAN, no en cada VPC individual.\n\n🔑 **Concepto clave:** Para segmentación y gobernanza de red WAN multirregión e híbrida declarativa desde un único documento de política: la respuesta es AWS Cloud WAN (Core Network con Segments)."
  },
  {
    "id": 68,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.4 — Diseñar estrategias para cumplir requerimientos de fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A banking institution is designing an event-driven architecture that ingests financial transaction events from mobile applications. The architecture must run across us-east-1 and us-west-2 in an active-active configuration. If event ingestion in the primary Region degrades or experiences an outage, incoming events must automatically be ingested and routed in the secondary Region without requiring mobile clients to update their configuration. Which solution meets these requirements with the LEAST operational effort?",
    "options": [
      {
        "key": "A",
        "text": "Store API keys as plain-text secrets in AWS Systems Manager Parameter Store. Configure Amazon API Gateway with an AWS Lambda authorizer that retrieves all API keys from Parameter Store on every request and validates the incoming Authorization header against the cached in-memory dictionary."
      },
      {
        "key": "B",
        "text": "Use Amazon API Gateway usage plans and API keys. Associate each client's API key with a usage plan that defines the required throttling rate (requests per second) and burst limits. Require clients to pass the x-api-key header in all requests, and attach an Amazon Cognito user pool authorizer to manage authentication."
      },
      {
        "key": "C",
        "text": "Deploy an AWS WAF Web ACL associated with the Amazon API Gateway stage. Create a rate-based rule for each client that inspects the client's source IP address and blocks requests exceeding 1,000 requests per 5-minute evaluation period. Configure AWS Shield Advanced to absorb layer 7 distributed denial-of-service traffic."
      },
      {
        "key": "D",
        "text": "Configure an Amazon SQS FIFO queue in front of the API Gateway integrations. Configure client applications to submit requests with their API key as a message attribute. Use an AWS Lambda consumer function that processes messages at a throttled rate per client key and writes responses back to individual client S3 buckets."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon EventBridge Global Endpoints proporciona un endpoint DNS administrado único y global. Monitorea la salud de la ingesta en la región primaria mediante un Route 53 health check y conmuta automáticamente el tráfico de eventos al bus de eventos de la región secundaria ante fallos, sin requerir cambios en el código de los clientes móviles ni lógica custom.\n\n**Por qué las otras no:**\n- **A ✗** Route 53 por latencia distribuye tráfico por cercanía pero no realiza failover determinista de eventos sin caídas y requiere construir capas intermedias de ingesta en API Gateway.\n- **B ✗** Construir funciones Lambda custom para comprobar la salud y modificar registros DNS es frágil, lento y añade sobrecarga operativa innecesaria frente a la característica nativa de Global Endpoints.\n- **C ✗** Las colas SQS son estrictamente regionales y no pueden sincronizarse directamente sobre VPC peering sin código consumidor-productor bidireccional complejo.\n\n🔑 **Concepto clave:** Para ingesta de eventos multirregión con conmutación automática por error gestionada y endpoint único para los clientes: usa Amazon EventBridge Global Endpoints."
  },
  {
    "id": 69,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.5 — Diseñar soluciones para cumplir objetivos de rendimiento",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A gaming platform requires an in-memory data store for live player sessions and leaderboards. The data store must provide microsecond read latency and single-digit millisecond write latency, support complex data structures (sets, sorted sets, hashes), ensure zero data loss across Multi-AZ failures with transactional ACID durability, and support automatic failover. The company does not want to manage Redis replication lag or write append-only files (AOF) manually. Which service will meet these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Deploy Amazon ElastiCache for Memcached with 10 nodes distributed across multiple Availability Zones. Configure the application to use the Memcached auto-discovery mechanism, and implement consistent hashing in the application client to distribute cached database queries evenly across all nodes."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon DynamoDB table in front of the PostgreSQL database. Use AWS Database Migration Service (AWS DMS) with continuous change data capture (CDC) to stream updates from PostgreSQL to DynamoDB. Configure the application to read exclusively from DynamoDB and write to PostgreSQL."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon ElastiCache for Redis (cluster mode enabled) replication group across multiple Availability Zones with automatic failover and read replicas. Configure the application with a cache-aside strategy: query ElastiCache first; on a cache miss, query PostgreSQL and populate ElastiCache with a TTL; update or invalidate the cache on database writes."
      },
      {
        "key": "D",
        "text": "Deploy Amazon CloudFront in front of the PostgreSQL database using an internal Network Load Balancer as the custom origin. Configure CloudFront with a caching policy that caches SQL query responses for 300 seconds, and configure an AWS Lambda@Edge function to parse SQL statements and generate cache keys."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Amazon MemoryDB for Redis es una base de datos en memoria totalmente compatible con Redis que utiliza un registro transaccional distribuido multizona (Multi-AZ Transaction Log) para garantizar durabilidad ACID y consistencia sin pérdida de datos en failovers, combinando la velocidad en microsegundos de Redis con la durabilidad de una base de datos primaria.\n\n**Por qué las otras no:**\n- **B ✗** Memcached no soporta Multi-AZ ni replicación nativa de failover automático, ni tampoco estructuras de datos avanzadas como sorted sets o hashes.\n- **C ✗** DAX solo almacena en caché lecturas de DynamoDB en memoria; no proporciona la API nativa de Redis ni sus tipos de datos complejos para tablas de clasificación (leaderboards con ZADD/ZRANGE).\n- **D ✗** Montar PostgreSQL en tempfs en memoria destruye la durabilidad de los datos ante reinicios o fallos de instancias y no es una solución administrada para estructuras de datos de Redis.\n\n🔑 **Concepto clave:** Diferencia clave: ElastiCache for Redis es un caché con persistencia secundaria (puede perder datos en failover); MemoryDB for Redis es una base de datos primaria en memoria con durabilidad transaccional ACID y cero pérdida de datos."
  },
  {
    "id": 70,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 — Diseñar soluciones de continuidad de negocio",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An online catalog application uses an Amazon OpenSearch Service domain in us-east-1 for search indexing and analytics. To meet business continuity standards, the company requires an active-standby disaster recovery solution in us-west-2 with an RPO of less than 15 minutes. The secondary domain must be continuously synchronized with index changes from the primary domain and must be capable of serving search queries immediately if the primary Region experiences an outage. Which solution should the solutions architect recommend?",
    "options": [
      {
        "key": "A",
        "text": "Create an Amazon S3 Lifecycle rule to transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days and to S3 Glacier Flexible Retrieval after 90 days. Configure S3 Intelligent-Tiering for all incoming objects and set an expiration rule to permanently delete all objects after 365 days."
      },
      {
        "key": "B",
        "text": "Create an Amazon S3 Lifecycle rule that transitions objects to S3 Standard-Infrequent Access (S3 Standard-IA) after 30 days and transitions objects to S3 Glacier Deep Archive after 90 days. Keep expiration rules disabled to ensure data is retained indefinitely according to corporate archival policy."
      },
      {
        "key": "C",
        "text": "Create an Amazon S3 Lifecycle rule that transitions objects directly to S3 Glacier Instant Retrieval after 30 days and to S3 One Zone-IA after 90 days. Configure S3 Batch Operations to periodically move files smaller than 128 KB back to S3 Standard to avoid minimum storage charges."
      },
      {
        "key": "D",
        "text": "Deploy an AWS Lambda function triggered by Amazon EventBridge scheduled rules every 24 hours. Use the Lambda function to scan S3 bucket inventory reports, calculate the age of each object, and copy objects older than 30 days to S3 Glacier Deep Archive using the Amazon S3 PutObject API with a Glacier storage class header."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** La replicación entre clústeres (Cross-Cluster Replication - CCR) de Amazon OpenSearch Service permite replicar índices de forma asíncrona y continua desde un clúster líder (leader) a un clúster seguidor (follower) en otra región con latencias de propagación de pocos segundos (RPO < 15 min). El clúster seguidor está activo y listo para atender consultas de búsqueda de inmediato ante una contingencia.\n\n**Por qué las otras no:**\n- **A ✗** Restaurar snapshots de OpenSearch entre regiones toma horas (violando el RTO) y las copias horarias exceden el RPO requerido de 15 minutos.\n- **B ✗** Dual writing con Firehose no garantiza la sincronización de actualizaciones de documentos ni eliminaciones efectuadas directamente en OpenSearch (produce discrepancias de índice).\n- **D ✗** Construir funciones Lambda custom para sincronizar índices de OpenSearch añade enorme sobrecarga, es frágil y no escala con el volumen de datos de búsqueda.\n\n🔑 **Concepto clave:** Para replicación continua de índices de búsqueda entre dominios de Amazon OpenSearch Service en distintas regiones con mínimo lag: usa Cross-Cluster Replication (CCR)."
  },
  {
    "id": 71,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 — Determinar controles de seguridad para mejorar la seguridad general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A security audit across 80 accounts in AWS Organizations revealed hundreds of unencrypted Amazon EBS volumes. Corporate compliance requires that all existing and future EBS volumes must be encrypted at rest with a Customer Managed Key (CMK) in AWS KMS. Additionally, any attempt to launch an EC2 instance with an unencrypted volume must be blocked automatically. What combination of actions provides the MOST effective and automated solution?",
    "options": [
      {
        "key": "A",
        "text": "Migrate the promotional clickstream data stream to Amazon SQS FIFO queues with provisioned message deduplication IDs. Configure the GPS data stream to use Amazon Kinesis Data Streams in on-demand mode. Create separate cost allocation tags on each queue and stream, and analyze costs using AWS Cost Explorer."
      },
      {
        "key": "B",
        "text": "Configure the GPS data stream to use Amazon Kinesis Data Streams in provisioned mode with an appropriate shard count. Configure the promotional clickstream data stream to use Amazon Kinesis Data Streams in on-demand mode. Apply unique cost allocation tags to each data stream, and activate the tags in the AWS Billing console for independent cost tracking."
      },
      {
        "key": "C",
        "text": "Configure both data streams to use Amazon Kinesis Data Streams in provisioned capacity mode. Configure an Application Auto Scaling policy on the promotional stream that scales shard capacity up based on incoming bytes metrics, and configure a scheduled scaling policy to handle marketing campaign windows."
      },
      {
        "key": "D",
        "text": "Configure both data streams to use Amazon Managed Streaming for Apache Kafka (Amazon MSK) with tiered storage enabled. Deploy a 3-broker cluster across multiple Availability Zones, and use separate Kafka topics for GPS and clickstream data. Track costs by analyzing broker disk utilization metrics in CloudWatch."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Habilitar 'EBS encryption by default' a nivel regional garantiza que todo nuevo volumen creado o adjunto se cifre automáticamente con la clave CMK seleccionada. El SCP previene que cualquier usuario intente desactivar la configuración o eludir el cifrado. Para volúmenes existentes, automatizar el flujo (snapshot -> copia cifrada con CMK -> nuevo volumen) mediante runbooks de Systems Manager Automation elimina el error humano y la disrupción.\n\n**Por qué las otras no:**\n- **A ✗** Las políticas de IAM locales no impiden lanzamientos efectuados por roles automatizados o cuentas nuevas y la re-encriptación manual de cientos de volúmenes no escala.\n- **C ✗** Macie analiza datos sensibles en Amazon S3, no configuraciones de volúmenes EBS ni cifrado en reposo.\n- **D ✗** Terminar instancias EC2 abruptamente destruye datos en memoria y causa indisponibilidad catastrófica en aplicaciones de producción.\n\n🔑 **Concepto clave:** Para forzar cifrado en EBS: Habilita 'EBS Encryption by Default' por región + SCP que bloquee volúmenes sin cifrar + SSM Automation para migrar volúmenes existentes."
  },
  {
    "id": 72,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 — Determinar una vía para mejorar el rendimiento general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A microservices application running on AWS Lambda functions interacts with an Amazon Aurora PostgreSQL database. During sudden traffic spikes, hundreds of Lambda execution environments scale concurrently. The database experiences connection exhaustion (too many connections errors) and high CPU utilization, resulting in API timeouts. What is the MOST effective architectural improvement to resolve the connection bottlenecks?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon EC2 Auto Scaling mixed instances group. Use 20% On-Demand Instances as the base capacity and Spot Instances for the remaining 80% of capacity. Configure the application to store processing checkpoints in Amazon DynamoDB every 10 minutes. Resume processing from the last checkpoint if Spot Instances are interrupted."
      },
      {
        "key": "B",
        "text": "Deploy the application on 100% Spot Instances across multiple Availability Zones using the capacity-optimized allocation strategy. Attach Amazon EBS io2 Block Express volumes to each instance to store the application state locally, and configure EBS fast snapshot restore to recover state upon Spot interruption."
      },
      {
        "key": "C",
        "text": "Purchase 1-year Standard Reserved Instances for 100% of the cluster capacity with no upfront payment. Configure the batch processing application to store intermediate state on an Amazon EFS file system with Provisioned Throughput mode mounted across all instances."
      },
      {
        "key": "D",
        "text": "Use AWS Batch with an unmanaged compute environment consisting of On-Demand Instances. Configure the application to store processing checkpoints in an Amazon S3 bucket using multipart uploads every 30 minutes, and re-launch the entire batch job from the beginning if any single instance fails."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon RDS Proxy es un proxy de base de datos totalmente administrado y de alta disponibilidad que agrupa y comparte conexiones (connection pooling) establecidas por miles de funciones Lambda concurrentes. Esto reduce drásticamente la sobrecarga de memoria y CPU en el motor Aurora, evitando los errores de 'too many connections' y manteniendo las transacciones estables.\n\n**Por qué las otras no:**\n- **A ✗** Aumentar max_connections consume memoria RAM crítica del motor de base de datos; cuando miles de lambdas efímeras abren y cierran conexiones, el overhead de TLS handshake satura la CPU sin resolver la causa raíz.\n- **B ✗** Abandonar arquitecturas serverless en Lambda para volver a servidores fijos en EC2 añade una enorme carga operativa de administración de infraestructura.\n- **C ✗** Usar DynamoDB como búfer arbitrario para consultas relacionales requiere reescribir toda la lógica transaccional de la aplicación.\n\n🔑 **Concepto clave:** Cuando funciones Lambda concurrentes saturan las conexiones de una base de datos RDS o Aurora ('Too many connections'): la solución canónica de AWS es Amazon RDS Proxy."
  },
  {
    "id": 73,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 — Determinar una vía para mejorar la fiabilidad general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A legacy web application runs on four Amazon EC2 instances behind an Application Load Balancer in a single Availability Zone. The application stores user session state locally in server memory. When an instance fails or CPU utilization spikes, users lose their shopping cart contents and are forced to log in again. What combination of actions will improve reliability and eliminate session loss with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In AWS Compute Optimizer, export the rightsizing recommendations report for the organization. Run an automated AWS Systems Manager Automation runbook that immediately downsizes all flagged EC2 instances, reduces EBS volume sizes by 50%, and switches all RDS DB instances to Burstable (t4g) instance types across all accounts."
      },
      {
        "key": "B",
        "text": "In the management account, enable AWS Compute Optimizer for the entire AWS Organization. Install the Amazon CloudWatch unified agent on all EC2 instances to collect memory metrics (mem_used_percent). Review Compute Optimizer recommendations in the management account, filter by projected cost savings, and apply rightsizing recommendations during planned maintenance windows."
      },
      {
        "key": "C",
        "text": "In AWS Trusted Advisor, review the Low Utilization Amazon EC2 Instances check across all member accounts. Deploy an Amazon EventBridge rule in each account that runs a Lambda function every weekend to stop any EC2 instance whose average CPU utilization remained below 20% during the preceding 7 days."
      },
      {
        "key": "D",
        "text": "Purchase 3-year Compute Savings Plans for the entire historical baseline spend across all 50 accounts. Because Compute Savings Plans apply automatically to EC2, Fargate, and Lambda usage regardless of instance size or utilization, rightsizing individual resources is unnecessary."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Extraer el estado de la sesión de la memoria local hacia un almacén externo y distribuido (como Amazon DynamoDB o Amazon ElastiCache) hace que los servidores web sean completamente sin estado (stateless). Esto permite que el Auto Scaling group agregue o retire instancias en múltiples AZs dinámicamente sin que ningún usuario pierda su sesión si una máquina se cae.\n\n**Por qué las otras no:**\n- **B ✗** Sticky sessions en el balanceador ata al usuario a una instancia específica; si esa instancia falla, la sesión en memoria se destruye de todos modos y mantener una sola AZ no provee alta disponibilidad.\n- **C ✗** EBS Multi-Attach no comparte memoria RAM y requiere sistemas de archivos de clúster complejos; no está diseñado para sesiones web concurrentes.\n- **D ✗** Escalar verticalmente a una sola máquina gigante crea un único punto de fallo (SPOF) catastrófico y no mejora la resiliencia arquitectónica.\n\n🔑 **Concepto clave:** Para alta disponibilidad en aplicaciones web con sesiones de usuario: haz la capa web stateless moviendo la sesión a Amazon ElastiCache o DynamoDB y coloca las instancias en Auto Scaling Multi-AZ."
  },
  {
    "id": 74,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.4 — Determinar una vía para mejorar la rentabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise operates 2,000 Amazon EC2 instances, 500 EBS volumes, and 300 Lambda functions across 50 accounts in AWS Organizations. The cloud operations team suspects widespread over-provisioning. The FinOps team requires an automated solution to analyze historical utilization metrics, receive rightsizing recommendations for instances, storage, and serverless functions, and export the findings centrally for executive reporting without installing complex third-party monitoring agents. Which solution meets these requirements?",
    "options": [
      {
        "key": "A",
        "text": "In the AWS Billing and Cost Management console of the management account, enable AWS Cost Anomaly Detection with a separate monitor for each AWS account. Configure an alert subscription with an immediate threshold of 100 USD that sends email notifications to the cloud operations team and publishes to an Amazon SNS topic."
      },
      {
        "key": "B",
        "text": "Create an Amazon CloudWatch billing alarm in us-east-1 in the management account based on the EstimatedCharges metric. Configure the alarm threshold to 10% above the previous month's total bill, and configure the alarm action to trigger an Amazon SNS notification to the operations team."
      },
      {
        "key": "C",
        "text": "In AWS Budgets, create a cost budget for each account with a threshold set to 120% of historical average spend. Configure the budget to trigger a Budget Action that applies an SCP denying ec2:RunInstances and rds:CreateDBInstance whenever the budget threshold is breached."
      },
      {
        "key": "D",
        "text": "Configure a recurring daily Amazon Athena query on the AWS Cost and Usage Report (CUR) stored in Amazon S3. When the query detects a cost variance greater than 15% between consecutive days for any service, invoke an AWS Lambda function that posts an alert to a company Slack channel."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** AWS Compute Optimizer se integra con AWS Organizations para analizar automáticamente el historial de métricas de CloudWatch de EC2, EBS y Lambda sin instalar agentes adicionales (aunque el CloudWatch Agent añade métricas de memoria). Permite exportar recomendaciones centralizadas de optimización de tamaño hacia Amazon S3 para análisis avanzado en QuickSight con el menor esfuerzo.\n\n**Por qué las otras no:**\n- **A ✗** Escribir y mantener scripts personalizados que consultan APIs de telemetría en 50 cuentas añade una carga operativa y costos de desarrollo innecesarios frente al servicio nativo de AWS.\n- **B ✗** Detener instancias mediante alarmas de anomalías puede apagar servidores de producción durante fluctuaciones normales de carga sin realizar un análisis de optimización de tallas.\n- **D ✗** Descargar reportes manuales en CSV de 50 cuentas individuales consume horas de trabajo humano y carece de automatización y escalabilidad.\n\n🔑 **Concepto clave:** Para recomendaciones automáticas de rightsizing de EC2, EBS y Lambda a nivel de toda la organización: habilita AWS Compute Optimizer en la cuenta de gestión y exporta los datos a S3."
  },
  {
    "id": 75,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.5 — Determinar una vía para mejorar la excelencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise manages a hybrid fleet of 600 Linux and Windows servers operating on-premises and across several AWS Regions. Security governance mandates that critical operating system security patches must be scanned weekly and applied during a monthly 4-hour maintenance window. Servers failing patch compliance must be automatically reported. The solution must not require VPN connectivity back to on-premises servers for management. Which solution provides this capability with the LEAST ongoing overhead?",
    "options": [
      {
        "key": "A",
        "text": "Convert the existing Aurora MySQL cluster to an Aurora Serverless v2 cluster. Set the minimum capacity to 0.5 ACUs and the maximum capacity to 128 ACUs. Because Aurora Serverless v2 scales down instantly during periods of zero traffic, read replicas are not required to meet cost and availability requirements."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon Aurora Serverless v2 cluster with a primary writer instance and an Aurora Serverless v2 reader instance configured in a second Availability Zone for high availability. Set the minimum ACUs to 0.5 and the maximum ACUs to 64. Configure the application to use the Aurora cluster endpoint for writes and the reader endpoint for reads."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon RDS for MySQL Multi-AZ DB instance with an db.r6g.4xlarge instance type. Purchase a 1-year Standard Reserved DB Instance to minimize hourly costs. Configure an Application Auto Scaling scheduled policy to scale the instance type down to db.t4g.medium during the 8-hour low-traffic periods every night."
      },
      {
        "key": "D",
        "text": "Deploy an Amazon DynamoDB table with on-demand capacity mode. Use AWS Database Migration Service (AWS DMS) to replicate data continuously from Aurora to DynamoDB. Configure the reporting microservice to read from DynamoDB, and shut down the Aurora database cluster during the 8-hour low-traffic window."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Systems Manager Patch Manager soporta flotas híbridas mediante activación híbrida del agente SSM (que se comunica de salida vía HTTPS hacia los endpoints de SSM sin requerir VPNs ni puertos de entrada abiertos). Las Patch Baselines definen qué parches aprobar según severidad, y Maintenance Windows automatiza la ventana mensual de 4 horas registrando el estado de cumplimiento en un dashboard unificado.\n\n**Por qué las otras no:**\n- **A ✗** Abrir puertos SSH a través de Internet público para servidores Windows y Linux es una vulnerabilidad de seguridad inaceptable y requiere mantener servidores Ansible.\n- **C ✗** Ejecutar Run Command manualmente cada mes introduce dependencia de intervención humana, propensión a olvidos y sobrecarga operativa.\n- **D ✗** AWS CodeDeploy está diseñado para desplegar código de aplicaciones (artefactos de software), no para evaluar dependencias de parches del sistema operativo y baselines de seguridad.\n\n🔑 **Concepto clave:** Para parches y cumplimiento de SO en flotas híbridas (EC2 + On-premises) sin puertos abiertos de entrada: usa AWS Systems Manager Patch Manager + Hybrid Activations + Maintenance Windows."
  },
  {
    "id": 76,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 — Determinar controles de seguridad para mejorar la seguridad general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A financial company operates 70 AWS accounts in AWS Organizations. The company must implement continuous intelligent threat detection across all accounts that can analyze VPC Flow Logs, CloudTrail logs, DNS query logs, and Amazon EKS audit logs. If an EC2 instance or IAM credential is confirmed to be compromised (e.g. communicating with known cryptocurrency mining pools or command-and-control servers), the compromised resource must be isolated automatically within minutes. Which solution fulfills these requirements with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In AWS Systems Manager Parameter Store, store the allowed VPC CIDR blocks in a parameter list. Configure a nightly Lambda function that runs describe-vpcs across all accounts, compares VPC CIDRs against the allowed list, and automatically terminates any VPC containing overlapping IP address ranges."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon DynamoDB table in a central networking account to maintain an IP address registry. Configure an AWS Service Catalog product for VPC creation that invokes an AWS Lambda custom resource to query DynamoDB, allocate an available CIDR block, and register the new VPC allocation atomically."
      },
      {
        "key": "C",
        "text": "Use Amazon VPC IP Address Manager (IPAM). Create an IPAM instance in a delegated administrator account and share it with the organization via AWS RAM. Define top-level and regional pools with non-overlapping CIDR blocks. Configure IPAM allocation rules and netmask constraints, and require member accounts to provision VPCs from the IPAM pools."
      },
      {
        "key": "D",
        "text": "Create an SCP on the organization root that specifies an Allow effect on ec2:CreateVpc only if the request contains an aws:RequestTag/NetworkApproved tag. In each account, require network engineers to manually review VPC creation requests and apply the tag only after verifying that the requested CIDR does not overlap."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon GuardDuty analiza automáticamente múltiples fuentes de telemetría (CloudTrail, VPC Flow Logs, DNS logs, EKS audit logs) utilizando machine learning y threat intelligence sin necesidad de agentes. La administración delegada centraliza todos los hallazgos en la cuenta de seguridad. Al conectar los hallazgos de alta severidad con EventBridge y Step Functions, se logra contención y aislamiento automático inmediato (seguridad reactiva) sin código de telemetría propio.\n\n**Por qué las otras no:**\n- **A ✗** Ingerir y comparar logs manualmente en OpenSearch requiere programar reglas, mantener listas de reputación y acarrea un inmenso costo operativo y de almacenamiento.\n- **B ✗** Amazon Macie detecta datos confidenciales (PII, tarjetas de crédito) en Amazon S3; no detecta tráfico de minería de criptomonedas ni compromisos de instancias EC2 o credenciales.\n- **C ✗** AWS WAF inspecciona peticiones HTTP/S entrantes en CloudFront, ALBs o API Gateway; no analiza DNS logs, VPC Flow Logs ni conexiones salientes de instancias EC2 comprometidas.\n\n🔑 **Concepto clave:** Para detección inteligente y gestionada de anomalías en DNS, VPC Flow Logs y CloudTrail con auto-enablement en Organizations: usa Amazon GuardDuty con Delegated Administrator + EventBridge para auto-remediación."
  },
  {
    "id": 77,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 — Determinar una vía para mejorar el rendimiento general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An online retail application is built using a microservices architecture running across Amazon ECS, AWS Lambda, and Amazon DynamoDB. Customers complain that checkout requests intermittently take over 10 seconds to complete. The engineering team has review CloudWatch metrics for each service, but cannot determine which specific microservice, external API call, or database query is causing the latency spike within the distributed transaction. How should the solutions architect resolve this visibility gap?",
    "options": [
      {
        "key": "A",
        "text": "In the management account, enable AWS IAM Access Analyzer for the entire organization with an unused access analyzer. Configure a 90-day tracking period to identify unused IAM roles, access keys, and permissions. Use the IAM Access Analyzer policy generation feature with CloudTrail logs to generate right-sized, least-privilege replacement policies."
      },
      {
        "key": "B",
        "text": "Deploy a custom AWS Lambda function in each of the 60 accounts using AWS CloudFormation StackSets. Schedule the function to run monthly, download the IAM credential report, analyze the password_last_used and access_key_1_last_used fields, and delete any IAM role that has not been assumed within the last 90 days."
      },
      {
        "key": "C",
        "text": "In AWS Security Hub, review the findings generated by the CIS AWS Foundations Benchmark standard related to IAM credentials. Deploy an automated remediation action using AWS Systems Manager Automation that revokes active sessions and attaches an inline Deny policy to any IAM role flagged as non-compliant by Security Hub."
      },
      {
        "key": "D",
        "text": "Enable Amazon GuardDuty in each member account with IAM protection enabled. Create an Amazon EventBridge rule that detects any IAM entity exhibiting anomalous API activity or attempting to use unused administrative permissions, and trigger an AWS Step Functions workflow that immediately deletes the over-permissive IAM policies."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS X-Ray (y AWS Distro for OpenTelemetry) está diseñado específicamente para rastreo distribuido (distributed tracing). Al propagar el encabezado de trazabilidad a través de microservicios, Lambda y llamadas a DynamoDB, genera un Service Map visual interactivo que desglosa el tiempo invertido en cada segmento y subsegmento, identificando con precisión la causa raíz de la latencia.\n\n**Por qué las otras no:**\n- **B ✗** Aumentar capacidad en DynamoDB es costoso y no resuelve el problema si la lentitud reside en un microservicio de ECS, una llamada a un API de pago externo o contención de bloqueos.\n- **C ✗** Detailed Monitoring y VPC Flow Logs solo muestran métricas de servidor y paquetes IP a nivel de red; no rastrean transacciones de aplicación distribuidas.\n- **D ✗** CloudWatch Synthetics canaries confirman que hay lentitud desde el punto de vista del usuario, pero no desglosan qué componente interno dentro del backend generó la demora de 10 segundos.\n\n🔑 **Concepto clave:** Para diagnosticar cuellos de botella y latencia oculta en llamadas entre microservicios distribuidos: la herramienta nativa es AWS X-Ray (Distributed Tracing / Service Map)."
  },
  {
    "id": 78,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.4 — Determinar una vía para mejorar la rentabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An analytics platform ingests 50 TB of telemetry log files daily into an Amazon S3 bucket. Millions of raw files are uploaded via multipart uploads. The data is queried intensively using Amazon Athena during the first 7 days. Between day 8 and day 90, the data is accessed only once or twice a month, but queries still require retrieval times within seconds. After 90 days, the data must be preserved for 7 years for compliance and can tolerate retrieval times of several hours. What S3 Lifecycle configuration will achieve the HIGHEST cost savings?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon CloudWatch agent on each web server instance to tail the Apache/Nginx access logs and stream them to CloudWatch Logs. Configure CloudWatch metric filters to count HTTP 4xx and 5xx error rates, and configure an alarm that triggers an Auto Scaling policy when error counts exceed 100 within a 1-minute window."
      },
      {
        "key": "B",
        "text": "Deploy Amazon CloudWatch Synthetics canaries that continuously send HTTP GET and POST requests to the web application endpoints every 1 minute. Configure the canaries to take screenshots and validate response status codes. Create CloudWatch composite alarms on canary failure metrics that notify the operations team via Amazon SNS."
      },
      {
        "key": "C",
        "text": "Enable VPC Flow Logs on all subnets hosting the web application instances, publishing records to Amazon S3. Configure an Amazon Athena workgroup with scheduled queries running every 5 minutes to identify dropped TCP connections, and invoke an AWS Lambda function to publish alerts to an Amazon SNS topic."
      },
      {
        "key": "D",
        "text": "Deploy AWS X-Ray daemon on all web server instances and instrument the web application code with the AWS X-Ray SDK. Configure X-Ray sampling rules to record 100% of all user transactions. Configure AWS Lambda functions to continuously poll the X-Ray GetTraceSummaries API and alert on latency regressions."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** S3 Glacier Instant Retrieval proporciona acceso en milisegundos con un costo de almacenamiento significativamente menor que Standard-IA para datos que se consultan raramente (1-2 veces al mes). A los 90 días, S3 Glacier Deep Archive es la clase de almacenamiento más económica para retención de largo plazo donde las horas de recuperación son aceptables. Abortar subidas multiparte incompletas elimina gigabytes de fragmentos ocultos que generan cargos innecesarios.\n\n**Por qué las otras no:**\n- **A ✗** S3 Glacier Flexible Retrieval es más caro que Glacier Deep Archive para retención a 7 años, y S3 Standard-IA tiene un costo de almacenamiento mayor que Glacier Instant Retrieval.\n- **B ✗** Mantener datos en S3 Standard durante 90 días cuando casi no se consultan después del día 7 es muy costoso, y la limpieza manual con CLI de subidas multiparte no es automatizada.\n- **D ✗** Glacier Instant Retrieval cobra una tarifa de recuperación por GB; usarlo durante los primeros 7 días cuando se realizan consultas masivas en Athena incrementaría exponencialmente los costos de lectura.\n\n🔑 **Concepto clave:** Acceso raro pero que requiere respuesta en milisegundos: S3 Glacier Instant Retrieval. Archivo a largo plazo con recuperación en horas: S3 Glacier Deep Archive. Nunca olvides abortar subidas multiparte incompletas."
  },
  {
    "id": 79,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 — Determinar una vía para mejorar la fiabilidad general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A security audit identifies that EC2 instances in an application VPC could be leveraged by attackers to exfiltrate proprietary source code using DNS tunneling techniques or resolve malicious domain names. The company already inspects HTTP/S traffic, but needs a managed solution specifically to monitor and block malicious outbound DNS queries made to the Route 53 Resolver (AmazonProvidedDNS) with the LEAST administrative effort. Which solution should the company implement?",
    "options": [
      {
        "key": "A",
        "text": "Deploy AWS Network Firewall with TLS inspection enabled. Use a stateful rule group that intercepts all HTTPS calls to dynamodb.us-east-1.amazonaws.com and inspects HTTP request headers to verify that the requesting principal matches an authorized IAM role ARN before allowing packets through to the service endpoint."
      },
      {
        "key": "B",
        "text": "In each VPC, create a gateway VPC endpoint for Amazon DynamoDB. Attach an endpoint policy to each gateway endpoint that restricts access to the corporate DynamoDB table ARNs. On the DynamoDB tables, attach resource-based policies with a condition requiring aws:PrincipalOrgID matching the organization ID."
      },
      {
        "key": "C",
        "text": "Create interface VPC endpoints for Amazon DynamoDB in private subnets across multiple AZs. On each interface endpoint, attach an endpoint policy that denies access to any DynamoDB resource not owned by the organization's AWS account ID, and update security groups to restrict inbound traffic to application subnets."
      },
      {
        "key": "D",
        "text": "In each member account, create IAM permission boundaries attached to all developer roles that deny all dynamodb actions unless the request contains the condition aws:SourceVpc matching one of the approved corporate VPC IDs, and deploy AWS Config rules to monitor compliance across all accounts."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Route 53 Resolver DNS Firewall es la característica nativa de AWS para inspeccionar y filtrar consultas DNS salientes realizadas al resolver de VPC (IP .2). Las listas de dominios administradas por AWS (AWS Managed Domain Lists) protegen automáticamente contra malware, botnets y tunelización DNS sin necesidad de que los administradores mantengan listas manuales de dominios maliciosos.\n\n**Por qué las otras no:**\n- **A ✗** Desplegar servidores dnsmasq autogestionados en EC2 añade complejidad, mantenimiento de parches y puntos únicos de fallo.\n- **C ✗** AWS WAF opera en capas 7 HTTP/HTTPS; no puede asociarse a zonas privadas de Route 53 ni inspecciona consultas DNS a nivel de protocolo UDP/TCP 53.\n- **D ✗** Bloquear el puerto 53 en Security Groups no afecta las consultas dirigidas al Route 53 Resolver (AmazonProvidedDNS en la IP base de la VPC +2), ya que ese tráfico está explícitamente exento de las reglas de SG en la VPC.\n\n🔑 **Concepto clave:** Para bloquear exfiltración por DNS y resolución de dominios maliciosos en consultas al resolver de VPC: usa Route 53 Resolver DNS Firewall con AWS Managed Domain Lists."
  },
  {
    "id": 80,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.5 — Determinar una vía para mejorar la excelencia operativa",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise operates 100 AWS accounts in AWS Organizations. Corporate governance mandates a baseline of 35 security rules (such as enforcing MFA, disallowing public S3 buckets, requiring encrypted volumes, and checking IAM password policies) that must be deployed and continuously enforced in every account and Region. Creating and updating these rules individually across all accounts has caused configuration drift and operational overhead. Which solution allows the enterprise to package, deploy, and manage this compliance baseline as a single entity across all accounts?",
    "options": [
      {
        "key": "A",
        "text": "Create a separate Amazon S3 bucket for each of the 50 accounts in the Central Analytics account. Configure S3 Cross-Region Replication (CRR) from each member account's local bucket to its dedicated bucket in the central account. Use S3 bucket policies with AWS KMS customer managed keys to manage access permissions."
      },
      {
        "key": "B",
        "text": "Register the central Amazon S3 data lake location in AWS Lake Formation in the Central Analytics account. Use Lake Formation permissions to grant fine-grained, column-level access to specific IAM roles in the Data Science and Business Intelligence accounts using AWS RAM for cross-account sharing and Lake Formation tags (LF-tags) for governance."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon Redshift cluster in the Central Analytics account. Use Amazon Redshift data sharing to share datashares with Redshift clusters in the Data Science and Business Intelligence accounts, configuring consumer cluster permissions and row-level security policies directly within Redshift."
      },
      {
        "key": "D",
        "text": "Store all data in an Amazon S3 bucket in the Central Analytics account. Create hundreds of IAM roles with complex inline policies that define column-level projections using Amazon Athena saved queries, and require users in the consumer accounts to assume these roles using AWS STS AssumeRole tokens."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Un AWS Config Conformance Pack permite empaquetar una colección de reglas de AWS Config y acciones de remediación en un único documento YAML. Cuando se despliega como un 'Organization Conformance Pack', se aplica de forma uniforme y declarativa a todas las cuentas miembros de la organización (incluyendo cuentas creadas en el futuro), eliminando el desvío de configuración con una sola entidad gestionable.\n\n**Por qué las otras no:**\n- **A ✗** Scripts en Lambda iterando 100 cuentas con APIs son frágiles, no detectan desvíos en tiempo real y añaden sobrecarga de mantenimiento de código.\n- **B ✗** Las SCPs son controles preventivos que deniegan APIs de IAM/AWS; no pueden evaluar si una base de datos preexistente cumple políticas complejas de contraseñas ni sustituyen las reglas de auditoría de Config.\n- **C ✗** Metric filters en CloudWatch solo alertan ante eventos de logs; no auditan el estado continuo de configuración de los recursos ni ejecutan remediación.\n\n🔑 **Concepto clave:** Para empaquetar, versionar y desplegar un conjunto homogéneo de reglas de auditoría y remediación de AWS Config en toda una organización: usa AWS Config Organization Conformance Packs."
  },
  {
    "id": 81,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 — Seleccionar cargas de trabajo para migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A manufacturing enterprise plans to migrate 400 on-premises physical and virtual servers to AWS. The infrastructure team has undocumented dependencies between applications and databases. To plan migration waves accurately, the enterprise must collect detailed server utilization metrics (CPU, RAM, disk I/O) and network connection data between servers. What is the MOST effective approach to discover servers and map dependencies with the least manual effort?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon DocumentDB cluster with Multi-AZ enabled. Export the on-premises MongoDB databases using mongodump, upload the dump files to an Amazon S3 bucket, and restore the databases to the Amazon DocumentDB cluster using mongorestore during a scheduled weekend maintenance window."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon DocumentDB (with MongoDB compatibility) cluster. Use AWS Database Migration Service (AWS DMS) with full load and ongoing change data capture (CDC) using a MongoDB source endpoint and an Amazon DocumentDB target endpoint. After verifying data synchronization, switch application connection strings to DocumentDB."
      },
      {
        "key": "C",
        "text": "Deploy MongoDB Enterprise Advanced on a fleet of Amazon EC2 instances in an Auto Scaling group across multiple Availability Zones. Configure MongoDB replica sets with the on-premises cluster as the primary, and initiate failover to promote the AWS EC2 replica to primary during the maintenance window."
      },
      {
        "key": "D",
        "text": "Deploy an Amazon DynamoDB table in on-demand capacity mode. Use the AWS Schema Conversion Tool (AWS SCT) to convert the MongoDB collections and BSON documents into DynamoDB tables, and run an AWS Glue ETL job to migrate historical data and keep the target tables synchronized."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Application Discovery Agent (basado en agente) captura configuraciones de hardware, rendimiento en tiempo real y, crucialmente, las conexiones de red entrantes y salientes (network dependencies) entre servidores. Integrado con AWS Migration Hub, permite visualizar dependencias y agrupar servidores interconectados en olas de migración lógicas sin riesgo de romper dependencias ocultas.\n\n**Por qué las otras no:**\n- **B ✗** Application Migration Service (MGN) es la herramienta de ejecución de migración a nivel de bloques; ejecutar replicación masiva sin haber planificado dependencias y requerimientos de red genera fallos de corte.\n- **C ✗** Migration Evaluator se centra en el modelo financiero de costos (TCO y Business Case); no realiza mapeo detallado de conexiones de red entre procesos.\n- **D ✗** El análisis manual con hojas de cálculo y netstat en 400 servidores es sumamente propenso a errores humanos, no captura picos estacionales y consume meses de trabajo.\n\n🔑 **Concepto clave:** Para mapear dependencias de red profundas entre servidores on-premises previo a la migración: usa AWS Application Discovery Service en modo basado en agente (Agent-based) integrado con Migration Hub."
  },
  {
    "id": 82,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 — Determinar el enfoque de migración óptimo",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A banking company wants to migrate an on-premises 15 TB Microsoft SQL Server database to Amazon Aurora PostgreSQL to eliminate expensive commercial licensing costs. The database undergoes continuous transactions 24/7. The cutover window must not exceed 15 minutes of downtime, and stored procedures and complex database schemas must be converted to PostgreSQL equivalents. Which migration approach satisfies these requirements?",
    "options": [
      {
        "key": "A",
        "text": "Create a VPC peering connection between the VPCs in both Regions. Use Route 53 latency alias records that point to the ALBs. In the event of an outage in the primary Region, update the Route 53 DNS records to direct 100% of the traffic to the secondary Region's Application Load Balancer."
      },
      {
        "key": "B",
        "text": "Create a VPC peering connection between the VPCs in both Regions. Use a Route 53 weighted routing policy that points to the ALBs. Configure health checks on both records so that Route 53 automatically shifts traffic away from the primary Region if its ALB becomes unhealthy."
      },
      {
        "key": "C",
        "text": "Create a VPC peering connection between the VPCs in both Regions. Configure the ALBs to distribute the traffic across both Regions using cross-zone load balancing. In the target group settings, register the private IP addresses of the EC2 instances in the secondary Region as targets."
      },
      {
        "key": "D",
        "text": "Create an AWS Transit Gateway in each Region and peer the Transit Gateways. In the secondary Region, create an internal ALB and register the cloned EC2 instances. In the primary Region, add the private IP addresses of the internal ALB as targets in the existing public ALB's target group."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Esta es una migración heterogénea (motores distintos: SQL Server a PostgreSQL). AWS SCT convierte esquemas, funciones y procedimientos almacenados entre motores incompatibles. Posteriormente, AWS DMS realiza la carga inicial de los 15 TB y mantiene la sincronización continua mediante Change Data Capture (CDC) mientras la base sigue en producción, permitiendo cambiar el endpoint en menos de 15 minutos sin pérdida de datos.\n\n**Por qué las otras no:**\n- **A ✗** La restauración nativa de backups .bak en RDS solo produce bases de datos SQL Server, no migra hacia PostgreSQL ni reduce costos de licencias.\n- **B ✗** AWS MGN replica servidores a nivel de bloque hacia EC2 manteniendo el mismo sistema operativo y motor SQL Server sin convertirlo a Aurora PostgreSQL.\n- **D ✗** Exportar e importar 15 TB en archivos CSV detiene la producción o pierde todos los cambios generados durante la exportación (sin CDC), violando el corte de 15 minutos.\n\n🔑 **Concepto clave:** Migración heterogénea de base de datos (ej. SQL Server/Oracle hacia PostgreSQL/MySQL): siempre requiere la combinación AWS SCT (conversión de esquemas/código) + AWS DMS (Full load + CDC para corte sin downtime)."
  },
  {
    "id": 83,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 — Determinar el enfoque de migración óptimo",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise needs to migrate 500 TB of file shares hosted on an on-premises NetApp NAS storage array to Amazon FSx for Windows File Server. The migration must preserve all NTFS access control lists (ACLs), ownership metadata, and timestamps. The data transfer must happen over a dedicated 1 Gbps AWS Direct Connect connection, but the transfer must not saturate the link during business hours (8 AM to 6 PM). Which solution meets these requirements with the LEAST operational effort?",
    "options": [
      {
        "key": "A",
        "text": "Use the VM Import/Export service to export on-premises VMware virtual machine disk images (VMDK) to Amazon S3. Configure an automated PowerShell script to convert the S3 objects into Amazon EC2 AMIs and launch instances into the target VPC during a weekend cutover window."
      },
      {
        "key": "B",
        "text": "Deploy an AWS Storage Gateway Volume Gateway appliance in the on-premises VMware environment. Create gateway-cached volumes mapped to the on-premises VMs. Take point-in-time EBS snapshots of the storage volumes in AWS and create Amazon EC2 instances from the snapshots."
      },
      {
        "key": "C",
        "text": "Use AWS Application Migration Service (AWS MGN). Install the AWS Replication Agent on all 150 on-premises Windows and Linux servers. Configure continuous block-level data replication over Direct Connect. Launch test instances in an isolated subnet for non-disruptive validation, and execute final cutover."
      },
      {
        "key": "D",
        "text": "Deploy AWS DataSync agents in the on-premises data center. Configure DataSync tasks to replicate root and data volumes from on-premises servers to Amazon Elastic File System (Amazon EFS) file systems. Launch generic EC2 instances in AWS and mount the EFS file systems during instance boot."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS DataSync está optimizado específicamente para transferencias masivas de datos hacia AWS hasta 10 veces más rápido que herramientas de código abierto. Preserva de forma nativa los metadatos de archivos de Windows (NTFS ACLs, timestamps, atributos) y permite programar cuotas de ancho de banda (bandwidth throttling) para no saturar el circuito Direct Connect en horario laboral.\n\n**Por qué las otras no:**\n- **B ✗** Enviar dispositivos Snowball no permite actualización incremental en línea y requiere detener escrituras durante el envío físico para evitar desincronizaciones.\n- **C ✗** Robocopy sobre Direct Connect carece de aceleración de red, validación de integridad automática y requiere supervisar y reiniciar scripts manuales ante cortes.\n- **D ✗** Storage Gateway File Gateway conecta con Amazon S3, no directamente con FSx for Windows File Server preservando las ACLs avanzadas de Active Directory de manera nativa sin pasos adicionales.\n\n🔑 **Concepto clave:** Para migrar servidores de archivos (NFS/SMB) a AWS (EFS/FSx/S3) preservando metadatos (ACLs, timestamps) con aceleración y límites de ancho de banda: la herramienta canónica es AWS DataSync."
  },
  {
    "id": 84,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 — Determinar una nueva arquitectura cloud para cargas existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A company runs a monolithic .NET Framework application on Windows Server 2012 R2 virtual machines in an on-premises data center. The operating system has reached End of Support. The company wants to modernize the application to .NET Core/8 to run on Linux containers, eliminate Windows licensing costs, and avoid managing server infrastructure. Which migration and modernization pathway should the solutions architect recommend?",
    "options": [
      {
        "key": "A",
        "text": "Deploy AWS DataSync agents on on-premises virtual machines to synchronize file data continuously over the public Internet to an Amazon S3 bucket. After the initial synchronization phase completes, configure an S3 Lifecycle transition rule to migrate the objects to an Amazon FSx for Windows File Server file system within 24 hours while keeping local shares active."
      },
      {
        "key": "B",
        "text": "Order multiple AWS Snowball Edge Storage Optimized devices. Copy the 120 TB of data to the Snowball devices on-premises, ship them back to AWS, and import the data into an Amazon S3 bucket. Deploy an Amazon FSx for Windows File Server Multi-AZ file system. Deploy an AWS DataSync agent on an EC2 instance in the VPC to transfer the incremental changes from on-premises to FSx over the Direct Connect connection, preserving NTFS ACLs."
      },
      {
        "key": "C",
        "text": "Order an AWS Snowmobile to transfer the 120 TB of data over a dedicated physical fiber optic connection direct to the AWS data center. Once the data arrives at the AWS facility, import the file shares directly into an Amazon FSx for Lustre file system configured with cross-region replication to an Amazon FSx for Windows File Server deployment in the target production VPC."
      },
      {
        "key": "D",
        "text": "Deploy an AWS Storage Gateway File Gateway virtual appliance on the VMware cluster on-premises. Configure an SMB file share on the gateway pointing to an Amazon S3 bucket. Mount the SMB share on-premises, copy the entire 120 TB data set over the 100 Mbps Direct Connect connection, and mount the S3 bucket directly on newly launched Amazon EC2 Windows Server instances."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Portar el código a .NET moderno (.NET Core/8) permite ejecutar la aplicación sobre Linux, erradicando por completo el costo de licencias de Windows Server. Desplegar los contenedores en Amazon ECS con el tipo de lanzamiento AWS Fargate elimina la gestión de servidores físicos o virtuales (serverless), cumpliendo plenamente los objetivos de modernización y ahorro.\n\n**Por qué las otras no:**\n- **A ✗** Rehost a Windows Server en EC2 no moderniza el código, perpetúa los costos de licencias de Windows y mantiene la sobrecarga de administración de servidores.\n- **B ✗** Contenedores Windows en EC2 requieren seguir pagando licencias de Windows Server y no eliminan la gestión de la infraestructura EC2.\n- **C ✗** Elastic Beanstalk con Windows Server mantiene la dependencia del sistema operativo Windows y sus licencias comerciales.\n\n🔑 **Concepto clave:** Modernizar aplicaciones .NET heredadas para eliminar licencias de Windows: Portar a .NET Core/8 sobre contenedores Linux en AWS Fargate (ECS o EKS)."
  },
  {
    "id": 85,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 — Determinar el enfoque de migración óptimo",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A media archive facility must migrate 2 PB of historical video recordings from an on-premises tape and disk library to AWS within a strict deadline of 4 weeks. The facility has a shared 1 Gbps Internet connection that cannot be used for more than 20% of its capacity. The video files are write-once and will rarely be accessed, but must be retained indefinitely for legal preservation. What is the MOST cost-effective and timely migration strategy?",
    "options": [
      {
        "key": "A",
        "text": "Perform an all-at-once migration by freezing on-premises changes for a 48-hour weekend window. Export all data using Oracle Data Pump utilities, upload the dump files to Amazon S3 via AWS Snowball devices, import the schemas and data into Aurora PostgreSQL using pg_restore, and redirect all 20 microservice database connection endpoints simultaneously during Sunday night."
      },
      {
        "key": "B",
        "text": "Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle database schema to PostgreSQL. Deploy AWS Database Migration Service (AWS DMS) with full load and continuous change data capture (CDC) to keep Aurora synchronized with Oracle. Apply the Strangler Fig pattern by deploying an API Gateway or Application Load Balancer in front of the services, refactoring one microservice at a time to query Aurora, and retiring the Oracle database after the final service is migrated."
      },
      {
        "key": "C",
        "text": "Deploy Amazon RDS for Oracle in AWS using a Multi-AZ DB instance deployment. Set up an Oracle Active Data Guard standby replica in AWS connected over the dedicated Direct Connect connection. Promote the standby database to primary, and then configure recurring scheduled AWS Glue ETL jobs to convert tables into Aurora PostgreSQL on a weekly batch schedule."
      },
      {
        "key": "D",
        "text": "Deploy an Amazon DocumentDB cluster and convert the relational schema into JSON BSON document collections using AWS SCT. Use AWS DataSync to continuously synchronize database tables from Oracle to DocumentDB across the network. Rewrite all 20 microservices to use the MongoDB API, and execute a blue/green DNS cutover using Amazon Route 53 weighted records."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Transferir 2 PB a través de un enlace de 1 Gbps limitado al 20% (200 Mbps) tomaría más de 2.5 años. Usar múltiples dispositivos físicos AWS Snowball Edge Storage Optimized (80 TB utilizables por dispositivo) permite cargar los datos a velocidades de red local (10/25 Gbps) y transportarlos físicamente en pocos días, cargándolos directamente en la clase más barata del mercado: S3 Glacier Deep Archive (aprox. $0.00099 por GB/mes).\n\n**Por qué las otras no:**\n- **B ✗** El ancho de banda disponible es insuficiente por órdenes de magnitud; violaría la fecha límite de 4 semanas por años de retraso.\n- **C ✗** AWS Snowcone solo tiene 8 TB de capacidad utilizable; se necesitarían más de 250 envíos de Snowcone, lo cual es inviable operativa y logísticamente para 2 PB.\n- **D ✗** Aprovisionar un enlace Direct Connect de 100 Gbps tarda meses de coordinación con proveedores de telecomunicaciones y tiene costos astronómicos injustificables para un archivo frío.\n\n🔑 **Concepto clave:** Para mover Petabytes con ancho de banda de red limitado y plazos estrictos: la solución física es AWS Snowball Edge hacia S3 Glacier Deep Archive."
  },
  {
    "id": 86,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 — Determinar el enfoque de migración óptimo",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A corporate enterprise plans to migrate 300 on-premises virtual machines running a mix of Linux and Windows to AWS. The enterprise requires an automated lift-and-shift solution that minimizes downtime during the final cutover (less than 10 minutes per server). The solution must perform continuous block-level data replication over TLS without disrupting production workloads during the initial data synchronization phase. Which service should be used?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Auto Scaling group of Amazon EC2 instances running Windows Server in private subnets across multiple Availability Zones. In the EC2 user data script, configure PowerShell DSC to download the .NET application package from Amazon S3, install IIS features, and register the instance with an Application Load Balancer target group."
      },
      {
        "key": "B",
        "text": "Containerize the .NET Framework application into Windows Server container images. Deploy the application on Amazon ECS using the AWS Fargate launch type with Windows containers, placed behind an Application Load Balancer. Configure ECS Service Auto Scaling based on target tracking metrics to scale tasks automatically without managing underlying EC2 hosts."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon EKS cluster with self-managed Windows Server worker nodes running across three Availability Zones. Use Helm charts to deploy the application pods, configure persistent volumes backed by Amazon EBS, and configure the Kubernetes Cluster Autoscaler to launch new EC2 Windows instances when pod scheduling capacity is exhausted."
      },
      {
        "key": "D",
        "text": "Rewrite the .NET Framework application into .NET Core and deploy it on AWS Elastic Beanstalk using the Linux multi-container Docker platform. Configure rolling deployments with an additional batch to ensure zero downtime during application upgrades, and use an Amazon RDS for SQL Server database backend for persistence."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Application Migration Service (AWS MGN) es el servicio estándar principal recomendado por AWS para migraciones lift-and-shift (rehost). Instala un agente ligero en cada servidor que replica cambios a nivel de bloque en segundo plano de manera continua y comprimida. En el momento del cutover final, solo se aplican los últimos bloques deltas, permitiendo un tiempo de inactividad de solo unos pocos minutos.\n\n**Por qué las otras no:**\n- **A ✗** AWS Server Migration Service (SMS) es una herramienta heredada (deprecated) basada en snapshots periódicos que causaba mayores ventanas de corte y fue reemplazada oficialmente por AWS MGN.\n- **C ✗** AWS DataSync está diseñado para migrar sistemas de archivos compartidos (NFS/SMB/S3), no para replicar sistemas operativos completos de servidores en ejecución a nivel de bloques.\n- **D ✗** AWS Backup es para copias de seguridad de recuperación ante desastres, no para orquestar cutovers de migración con pruebas y conversión de drivers para EC2.\n\n🔑 **Concepto clave:** Para migraciones de servidores Lift-and-Shift (Rehost) con replicación continua a nivel de bloque y mínimo tiempo de corte: la herramienta oficial de AWS siempre es AWS Application Migration Service (AWS MGN)."
  },
  {
    "id": 87,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 — Seleccionar cargas de trabajo para migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise CIO wants to understand the total cost of ownership (TCO) and business case for migrating 1,200 on-premises servers to AWS. The leadership team needs visibility into potential cost savings comparing existing on-premises hardware provisioning with AWS optimized compute instances, taking into account actual historical CPU and RAM utilization rather than allocated capacity, along with Microsoft licensing optimization (BYOL vs license-included). Which service is designed specifically to generate this assessment?",
    "options": [
      {
        "key": "A",
        "text": "Migrate the application to Amazon Elastic Container Service (Amazon ECS) on AWS Fargate. Deploy an Amazon ElastiCache for Valkey/Redis cluster in a private subnet. Update the application to store and retrieve user session state in ElastiCache using standard Redis session providers. Configure the ECS service with Service Auto Scaling behind an ALB."
      },
      {
        "key": "B",
        "text": "Deploy the application across multiple Amazon EC2 instances in an Auto Scaling group. Enable sticky sessions (session affinity) on the Application Load Balancer using application-based cookies with a 1-day duration, and configure cross-zone load balancing to ensure sessions remain pinned to specific instances."
      },
      {
        "key": "C",
        "text": "Attach an Amazon Elastic Block Store (Amazon EBS) Multi-Attach volume to all EC2 instances in the Auto Scaling group. Configure the Tomcat web server to write session state files directly to the shared EBS block device using a clustered file system like GFS2."
      },
      {
        "key": "D",
        "text": "Configure the Java application to write session state to local instance store NVMe SSDs. Set up a cron job that runs every 60 seconds on each EC2 instance to synchronize the local session files to an Amazon S3 bucket using the AWS CLI s3 sync command."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Migration Evaluator (anteriormente TSO Logic) es el servicio de evaluación económica de AWS diseñado para crear casos de negocio basados en datos. Recolecta la utilización real de recursos on-premises (modelando CPU y RAM aprovisionadas vs consumidas) y genera reportes de TCO comparativos que optimizan el tallaje de instancias y las licencias de Microsoft (BYOL).\n\n**Por qué las otras no:**\n- **B ✗** Application Discovery Service se enfoca en el inventario técnico y mapeo de dependencias de red de servidores para planificar la migración, no en generar casos de negocio ejecutivos de TCO.\n- **C ✗** AWS Pricing Calculator es una calculadora manual para estimar costos de arquitecturas que el usuario configura a mano; no analiza el uso histórico de servidores on-premises automáticamente.\n- **D ✗** AWS Cost Explorer analiza el gasto histórico de recursos que ya están corriendo dentro de cuentas de AWS; no analiza servidores on-premises.\n\n🔑 **Concepto clave:** Para construir el caso de negocio de migración y análisis de TCO basado en uso real de servidores on-premises: usa AWS Migration Evaluator."
  },
  {
    "id": 88,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 — Determinar el enfoque de migración óptimo",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise operates a mission-critical 8 TB Oracle Enterprise Edition database on-premises. The company decides to migrate the database to Amazon RDS for Oracle under the Bring Your Own License (BYOL) model. The database transaction volume is high, and the maintenance window for final cutover is only 10 minutes. The on-premises database version is identical to the target Amazon RDS version. What is the MOST reliable and efficient migration strategy?",
    "options": [
      {
        "key": "A",
        "text": "Create an Amazon EventBridge scheduled rule that invokes an AWS Lambda function every 15 minutes to run an AWS DMS resume-task API call, evaluating the replication lag metric in CloudWatch, logging detailed execution traces to Amazon S3, and triggering an Amazon SNS notification to database engineers if replication latency exceeds 60 seconds."
      },
      {
        "key": "B",
        "text": "Use the AWS Schema Conversion Tool (AWS SCT) to convert the Oracle database schema and code objects to Amazon Aurora PostgreSQL. Deploy an AWS DMS replication instance with Multi-AZ enabled. Configure a full load plus CDC task. Create primary keys on the target tables, add validation, and configure target database indexes after the full load completes to ensure high replication throughput."
      },
      {
        "key": "C",
        "text": "Deploy Oracle GoldenGate on high-memory Amazon EC2 instances in a private subnet to replicate data from the on-premises Oracle database to Aurora PostgreSQL. Configure an Amazon Kinesis Data Stream between GoldenGate and Aurora to buffer transaction change events during network interruptions over Direct Connect."
      },
      {
        "key": "D",
        "text": "Perform an offline initial data migration using AWS Snowball Edge devices with AWS DMS pre-installed and configured. Ship the physical devices to AWS, import data into Aurora, and use AWS DataSync over the public internet to stream real-time database write-ahead log (WAL) changes directly to the Aurora PostgreSQL cluster."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Para bases de datos Oracle homogéneas Enterprise Edition, usar las herramientas nativas de Oracle como Data Guard es el método estándar de la industria. Permite que la instancia RDS opere como una réplica física en espera sincronizada continuamente por Direct Connect; la conmutación por error (switchover) es instantánea y garantiza cero pérdida de datos dentro del límite de 10 minutos.\n\n**Por qué las otras no:**\n- **A ✗** Data Pump para una base de 8 TB tarda horas en exportar e importar, y los cambios que ocurran durante la transferencia se pierden sin un mecanismo de replicación activa.\n- **B ✗** Los envíos físicos de cintas son lentos y no ofrecen sincronización continua de deltas para cumplir una ventana de 10 minutos.\n- **D ✗** Un DMS Full Load sin CDC deja una brecha masiva de datos y obliga a detener la base durante horas para evitar inconsistencias.\n\n🔑 **Concepto clave:** Migración homogénea de Oracle Enterprise a RDS for Oracle con mínimo tiempo de corte: la mejor práctica técnica es Oracle Data Guard (o Oracle GoldenGate)."
  },
  {
    "id": 89,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 — Determinar una nueva arquitectura cloud para cargas existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A corporate environment has multiple legacy Windows applications running on Amazon EC2 instances across two Availability Zones. The applications require concurrent read/write access to a shared file system via the SMB protocol. The file system must support Microsoft Active Directory domain integration, Windows NTFS permissions, DFS Namespaces, and automated daily backups, with automatic sub-minute failover if an Availability Zone fails. Which storage solution should be deployed?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon CloudFront distribution with an origin group containing the on-premises data center origin as primary and the AWS Application Load Balancer as secondary. Configure CloudFront to fail over to AWS if the on-premises origin returns HTTP 500/502/503/504 status codes."
      },
      {
        "key": "B",
        "text": "In Amazon Route 53, create a weighted routing policy with two record sets: one pointing to the on-premises data center public IP address and one pointing to the AWS ALB. Assign an initial weight of 100 to on-premises and 0 to AWS. Gradually increase the AWS weight (e.g., to 10, then 50, then 100) while monitoring application health metrics in CloudWatch."
      },
      {
        "key": "C",
        "text": "Deploy AWS Global Accelerator with two endpoint groups: one pointing to the on-premises firewall external IP address and one pointing to the AWS Application Load Balancer. Use traffic dial settings to shift 100% of incoming TCP traffic to the AWS endpoint group during a single maintenance window."
      },
      {
        "key": "D",
        "text": "In Amazon Route 53, configure a geolocation routing policy that directs all North American users to the on-premises environment and all European users to the AWS environment. Once verified, delete the on-premises DNS record and create a simple routing record pointing to the AWS ALB."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Amazon FSx for Windows File Server es un servicio totalmente administrado construido nativamente sobre Windows Server. Proporciona soporte completo para el protocolo SMB, integración directa con Active Directory, permisos NTFS y DFS Namespaces. La opción Multi-AZ replica datos de forma sincrónica y realiza failover automático en menos de 1 minuto ante la pérdida de una AZ.\n\n**Por qué las otras no:**\n- **A ✗** Amazon EFS es un sistema de archivos nativo de Linux que opera sobre el protocolo NFS; no soporta de forma nativa SMB ni permisos NTFS de Windows.\n- **B ✗** Montar S3 a través de Storage Gateway introduce latencia, no soporta semántica de bloqueo de archivos SMB estándar y carece de conmutación automática de clúster activo-pasivo.\n- **D ✗** EBS Multi-Attach solo funciona en la misma Zona de Disponibilidad; no puede adjuntarse a través de múltiples AZs y no implementa un sistema de archivos SMB compartido.\n\n🔑 **Concepto clave:** Almacenamiento de archivos compartido para aplicaciones Windows que requieran SMB, Active Directory y NTFS con alta disponibilidad Multi-AZ: la respuesta siempre es Amazon FSx for Windows File Server Multi-AZ."
  },
  {
    "id": 90,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 — Determinar una nueva arquitectura cloud para cargas existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An insurance enterprise runs core transaction workloads on an on-premises IBM z/OS mainframe. The mainframe runs legacy COBOL programs and DB2 data stores. The enterprise needs to migrate these workloads to AWS to reduce annual multi-million dollar MIPS licensing fees. The enterprise wants to automatically convert the COBOL codebase into modern Java microservices while migrating the DB2 relational data to Amazon Aurora PostgreSQL with automated testing. Which AWS service is designed specifically for this purpose?",
    "options": [
      {
        "key": "A",
        "text": "Deploy an Amazon FSx for Windows File Server file system across two Availability Zones. Configure an AWS Storage Gateway File Gateway in the VMware cluster, map local Windows clients to the gateway SMB share, and allow background synchronization to push the 50 TB of data to FSx over the 1 Gbps Direct Connect connection, maintaining continuous caching."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon FSx for Windows File Server Multi-AZ file system integrated with the corporate Active Directory. Deploy an AWS DataSync agent in the on-premises environment. Create a DataSync task to transfer data from the on-premises SMB share to FSx, configuring the task to copy file data, metadata, and NTFS ACLs. Run the task to perform the initial transfer, and run it again during the cutover window for final sync."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon Elastic File System (Amazon EFS) file system configured with Provisioned Throughput mode. Use the multi-threaded robocopy utility on on-premises Windows servers to copy files directly to the EFS mount target over Direct Connect, attempting to preserve file timestamps, attributes, and NTFS discretionary access control lists."
      },
      {
        "key": "D",
        "text": "Order an AWS Snowball Edge Storage Optimized device with 80 TB capacity. Copy the 50 TB of data from the on-premises share to the Snowball device using the S3 adapter. Ship the device to AWS to load data into Amazon S3. In AWS, deploy an EC2 instance that runs a PowerShell script to copy objects from S3 to Amazon FSx."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Mainframe Modernization es el servicio administrado creado específicamente para migrar y modernizar cargas de mainframe. Ofrece dos patrones: Replatform (emulación en Micro Focus) y Automated Refactor (con AWS Blu Age), el cual traduce automáticamente el código COBOL heredado a aplicaciones modernas Java orientadas a servicios sobre Aurora PostgreSQL.\n\n**Por qué las otras no:**\n- **A ✗** AWS MGN es para servidores x86 virtuales o físicos; no puede replicar la arquitectura de hardware ni sistemas operativos propietarios de Mainframes IBM z/OS.\n- **C ✗** AWS SAM es un framework para definir aplicaciones serverless en CloudFormation; no realiza conversión de código COBOL ni migración de mainframes.\n- **D ✗** AWS Snowmobile es un contenedor físico para transferencias masivas de datos a escala de exabytes, no una herramienta de transformación de software.\n\n🔑 **Concepto clave:** Para modernizar código COBOL de mainframe y migrar a microservicios Java en AWS: usa AWS Mainframe Modernization con el patrón Automated Refactor (AWS Blu Age)."
  },
  {
    "id": 91,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.2 — Diseñar pipelines de CI/CD y DevSecOps",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise operates a shared Tools AWS account and separate Production accounts across us-east-1 and us-west-2. The DevOps team builds a continuous deployment pipeline using AWS CodePipeline in the Tools account. The pipeline must build Docker images, test them, and deploy them to Amazon ECS clusters running in both Production accounts in both Regions. The S3 artifact bucket must be secured so that member accounts can read build artifacts. Which combination of actions allows the cross-account pipeline to deploy successfully?",
    "options": [
      {
        "key": "A",
        "text": "Use AWS CodeDeploy with a Canary10Percent10Minutes deployment configuration on Amazon ECS. Configure CloudWatch alarms for 5xx errors and latency on the ALB target group. If an alarm triggers during the 10-minute canary evaluation window, CodeDeploy automatically rolls back traffic to the original task set immediately."
      },
      {
        "key": "B",
        "text": "Use AWS CodePipeline with an AWS CloudFormation action that initiates a rolling update on the ECS service. Enable the deployment circuit breaker with automatic rollback enabled. Configure minimumHealthyPercent to 100% and maximumPercent to 200% to evaluate health over an hour."
      },
      {
        "key": "C",
        "text": "Deploy a secondary ECS service behind a separate Application Load Balancer. In Amazon Route 53, configure a weighted routing policy that sends 10% of traffic to the secondary ALB and 90% to the primary ALB. Create an AWS Lambda function that monitors CloudWatch and deletes the secondary service on failure."
      },
      {
        "key": "D",
        "text": "Use AWS CodeDeploy with an AllAtOnce deployment configuration for Amazon ECS. Configure an ALB test listener on port 8080. Require quality assurance engineers to manually test the new version on port 8080 within 15 minutes, after which CodeDeploy shifts 100% of production traffic to the new task set."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Para pipelines multicuenta en AWS CodePipeline, el bucket de artefactos de S3 DEBE estar cifrado con una clave KMS Customer Managed Key (CMK), ya que la clave predeterminada aws/s3 no admite políticas de clave entre cuentas. La política de la clave CMK y la política del bucket S3 deben autorizar a los roles de despliegue de las cuentas de producción, los cuales asume CodePipeline para ejecutar acciones en otras cuentas y regiones.\n\n**Por qué las otras no:**\n- **A ✗** La clave administrada por defecto aws/s3 no puede ser compartida entre diferentes cuentas de AWS; cualquier intento de descarga cross-account fallará por acceso denegado en KMS.\n- **C ✗** Hacer un bucket de artefactos públicamente accesible viola los estándares básicos de seguridad corporativa y expone propiedad intelectual.\n- **D ✗** Duplicar pipelines en cada cuenta de producción fragmenta el gobierno del CI/CD y contradice el modelo estándar de cuenta central de Tools.\n\n🔑 **Concepto clave:** En CodePipeline multicuenta: el bucket de S3 de artefactos NUNCA puede usar la clave por defecto aws/s3. Obligatoriamente requiere una clave KMS CMK con permisos concedidos a las cuentas destino."
  },
  {
    "id": 92,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.3 — Implementar controles de seguridad y gobernanza en pipelines",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A financial company builds and deploys microservices packaged as Docker containers on Amazon EKS. The DevSecOps policy mandates that container images must be scanned for operating system and application package vulnerabilities prior to deployment. If any CRITICAL or HIGH Common Vulnerabilities and Exposures (CVEs) are detected, the deployment pipeline must automatically halt, preventing the image from reaching production. What is the MOST automated solution to enforce this gate?",
    "options": [
      {
        "key": "A",
        "text": "In the management account, create a central CloudFormation template in an S3 bucket. Write a Python script using the AWS SDK (boto3) that iterates through all member accounts and Regions using assumed admin roles and executes create-stack calls. Run the script via Jenkins on a weekly cron schedule."
      },
      {
        "key": "B",
        "text": "In the management account, deploy an AWS CloudFormation StackSet with service-managed permissions targeted to the organization root or specific OUs. Enable automatic deployment to ensure new accounts automatically receive stack instances, and configure failure tolerance and max concurrent accounts to deploy across multiple Regions simultaneously."
      },
      {
        "key": "C",
        "text": "Configure AWS Control Tower Account Factory to provision accounts. In each member account, manually configure AWS Systems Manager State Manager associations to download and execute the baseline CloudFormation template from a central S3 bucket on a daily recurring schedule."
      },
      {
        "key": "D",
        "text": "In AWS Service Catalog, create a portfolio containing the baseline CloudFormation product. Share the portfolio with all 100 accounts using AWS RAM. Create a Lambda function in each account triggered on the CreateAccount event that invokes the Service Catalog provision-product API."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Amazon ECR Enhanced Scanning utiliza Amazon Inspector para escanear automáticamente imágenes de contenedores en busca de vulnerabilidades tanto a nivel de paquetes de SO como de dependencias de lenguaje de programación. Al integrar un paso de validación en CodeBuild dentro del pipeline, se evalúan los resultados del escaneo y se bloquea el paso de despliegue proactivamente antes de que la imagen sea promovida a producción.\n\n**Por qué las otras no:**\n- **A ✗** Descargar listas con curl en el Dockerfile es frágil, carece de base de datos actualizada de CVEs y no valida dependencias compiladas de forma exhaustiva.\n- **B ✗** Un escaneo semanal a posteriori detecta problemas días después de que la imagen vulnerable ya fue desplegada en producción, incumpliendo el control preventivo en el pipeline.\n- **C ✗** Escanear contenedores después de que ya están en ejecución en el clúster viola el principio DevSecOps de validación previa (shift-left security).\n\n🔑 **Concepto clave:** Para escanear contenedores en ECR contra CVEs de SO y dependencias de código: habilita Enhanced Scanning con Amazon Inspector y valida los findings en el pipeline de CI/CD para frenar el despliegue."
  },
  {
    "id": 93,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.1 — Diseñar pipelines de pruebas y artefactos automatizados",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An organization operating across 60 AWS accounts requires hardened 'Golden AMIs' for all Amazon EC2 workloads. The security team updates base AMIs monthly with security patches, antivirus agents, and compliance configuration scripts. The process must automatically build the AMI, run automated validation tests, and distribute the approved AMI to all 60 accounts and multiple Regions, while deregistering outdated AMIs. Which solution achieves this with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In the AWS CodePipeline build stage, configure AWS CodeBuild to pull the image and run an open-source container scanning script. If vulnerabilities are found, configure CodeBuild to write an error to the build logs and send an email notification to the security team using Amazon SES."
      },
      {
        "key": "B",
        "text": "Enable Amazon Inspector enhanced scanning on the Amazon Elastic Container Registry (Amazon ECR) repository. In AWS CodePipeline, add a test action after the image push stage that invokes an AWS Lambda function to query Inspector scan findings via the DescribeImageScanFindings API, failing the pipeline if any critical severity CVEs are present."
      },
      {
        "key": "C",
        "text": "Deploy Amazon GuardDuty with EKS Protection enabled. Configure an Amazon EventBridge rule that detects GuardDuty container runtime findings and triggers an AWS Systems Manager Automation document that revokes IAM deployment role credentials and rolls back the ECS task definition."
      },
      {
        "key": "D",
        "text": "Configure an SCP on the workload OU that denies ecs:CreateService and ecs:UpdateService if the container image tag is latest. Require developers to sign container images using AWS Signer, and configure Amazon EKS admission controllers to block unsigned container images."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** EC2 Image Builder es el servicio completamente administrado de AWS para automatizar la creación, prueba y distribución de imágenes de máquinas virtuales. Las 'Distribution Settings' admiten compartir y replicar AMIs automáticamente a múltiples cuentas de AWS Organizations y regiones sin scripts personalizados, incluyendo la eliminación y ciclo de vida de versiones anteriores.\n\n**Por qué las otras no:**\n- **B ✗** Gestionar Packer e invocar scripts caseros de Python para compartir y copiar AMIs en 60 cuentas y múltiples regiones requiere mantenimiento continuo de infraestructura y credenciales.\n- **C ✗** Parchear instancias de producción activas y tomar snapshots no produce una 'Golden AMI' inmutable estandarizada y expone los entornos a desincronizaciones.\n- **D ✗** Desplegar instancias temporales por CloudFormation en 60 cuentas por separado multiplica los costos y la sobrecarga operativa innecesariamente.\n\n🔑 **Concepto clave:** Para construir, probar, endurecer y distribuir Golden AMIs automáticamente entre cuentas y regiones: la solución nativa es EC2 Image Builder."
  },
  {
    "id": 94,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.4 — Diseñar automatización de operaciones y sistemas resilientes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise runs an e-commerce catalog application on EC2 instances in an Auto Scaling group. Occasionally, application processes crash or freeze due to memory leaks, leaving instances passing basic EC2 system status checks but failing application health checks. The operations team requires an automated solution that detects application failure, collects diagnostic heap memory dumps from the failing instance into an Amazon S3 bucket for developer analysis, and terminates the unhealthy instance so Auto Scaling replaces it with a healthy one. Which solution fulfills these requirements?",
    "options": [
      {
        "key": "A",
        "text": "In each member account, create Amazon CloudWatch alarms on the StatusCheckFailed metric for each EC2 instance and ALB target group. Configure the alarms to publish to a regional Amazon SNS topic, and subscribe the operations team distribution email to the SNS topic, establishing cross-account IAM role trust relationships for centralized alarm viewing."
      },
      {
        "key": "B",
        "text": "Configure an Amazon EventBridge rule in every member account that captures AWS Health events (source: aws.health). Configure the rule to forward events to a centralized EventBridge event bus in the central Monitoring account. In the Monitoring account, create a rule on the central bus that routes events to an Amazon SNS topic and triggers an AWS Lambda function for automated incident triage."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon CloudWatch agent on all EC2 instances across all accounts that scrapes the AWS Health API endpoint every 60 seconds and publishes health metrics to a custom CloudWatch namespace. Create a centralized CloudWatch dashboard in the management account, configuring metric alarms on service availability."
      },
      {
        "key": "D",
        "text": "In the management account, use AWS Trusted Advisor to monitor service limits and operational health across all accounts. Create an automated AWS Systems Manager Automation document that runs daily, queries Trusted Advisor checks for all member accounts, and exports the findings to an Amazon S3 bucket for analysis in Athena."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Usar 'ELB health checks' en el Auto Scaling Group permite detectar fallos a nivel de aplicación (no solo fallos de hardware del hypervisor). Configurar un Lifecycle Hook para el evento de terminación pausa la eliminación de la instancia, permitiendo que EventBridge dispare un documento de Systems Manager para recopilar diagnósticos (memory dumps) y subirlos a S3 antes de permitir que el ASG destruya y reemplace la instancia.\n\n**Por qué las otras no:**\n- **A ✗** El chequeo de tipo EC2 solo detecta caídas de hardware o del kernel; no detecta cuelgues o bloqueos a nivel de aplicación HTTP/S.\n- **B ✗** Un cron job local en una máquina con la memoria congelada o bloqueada suele fallar y no garantiza la entrega confiable de dumps de memoria.\n- **D ✗** Aumentar el grace period a 1 hora deja instancias no funcionales atendiendo tráfico de usuarios durante 60 minutos, degradando la experiencia del cliente.\n\n🔑 **Concepto clave:** Para recolectar diagnósticos, volcados de memoria o registros forenses antes de que un Auto Scaling group destruya una instancia fallida: usa Auto Scaling Lifecycle Hooks + Systems Manager Run Command."
  },
  {
    "id": 95,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.2 — Diseñar pipelines de CI/CD y DevSecOps",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A financial startup deploys payment processing microservices using AWS Lambda and Amazon API Gateway defined with the AWS Serverless Application Model (AWS SAM). The startup must implement safe deployment practices: new Lambda function versions must be tested with 10% of production traffic for 10 minutes before shifting the remaining 90%. If any 5xx server errors or latency spikes occur during this canary period, traffic must automatically roll back to the previous version immediately. What is the MOST effective way to configure this deployment strategy?",
    "options": [
      {
        "key": "A",
        "text": "Deploy AWS CloudFormation StackSets with self-managed permissions to create AWS Config rules in each account. Configure each rule to trigger an inline AWS Lambda function that parses the resource configuration, determines whether it complies with corporate tagging standards, and sends a notification email to the resource creator."
      },
      {
        "key": "B",
        "text": "In the delegated administrator account for AWS Config, deploy an organization-wide conformance pack that includes managed rules such as required-tags and encrypted-volumes. Configure automatic remediation using AWS Systems Manager Automation runbooks (e.g., AWS-ApplyTags, AWS-EnableEBSVolumeEncryption) triggered upon non-compliance."
      },
      {
        "key": "C",
        "text": "Create a Service Control Policy (SCP) attached to the organization root that specifies a Deny effect on all resource creation actions (such as ec2:RunInstances, s3:CreateBucket) if the request does not include an explicit resource tag and server-side encryption parameter header."
      },
      {
        "key": "D",
        "text": "Deploy Amazon GuardDuty across all accounts and Regions. Configure custom GuardDuty threat detection criteria based on resource tags and unencrypted storage volumes. Configure GuardDuty finding export to an Amazon S3 bucket in a central security account for quarterly compliance review."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS SAM se integra de forma nativa con AWS CodeDeploy mediante la propiedad DeploymentPreference. Especificar 'Canary10Percent10Minutes' automatiza la creación de alias de Lambda y desvía el 10% del tráfico durante 10 minutos antes de completar el despliegue. Si alguna alarma de CloudWatch asociada se activa, CodeDeploy aborta la operación y conmuta el alias a la versión estable de inmediato.\n\n**Por qué las otras no:**\n- **A ✗** Gestionar dos funciones Lambda separadas y alterar pesos manualmente con scripts no utiliza las capacidades nativas de versiones/alias de Lambda ni provee rollback automatizado integrado.\n- **C ✗** Pruebas manuales con URLs separadas de Beta dependen de intervención humana, no evalúan tráfico real de producción y carecen de conmutación automatizada.\n- **D ✗** Route 53 weighted routing sufre de retrasos por caché de DNS en clientes y no ofrece la granularidad ni el rollback instantáneo que provee CodeDeploy a nivel de alias de Lambda.\n\n🔑 **Concepto clave:** En despliegues serverless con AWS SAM: la forma canónica de hacer Canary con rollback ante alarmas de CloudWatch es la propiedad DeploymentPreference (gestionada por CodeDeploy)."
  },
  {
    "id": 96,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.3 — Implementar controles de seguridad y gobernanza en pipelines",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An enterprise development team uses AWS CloudFormation to provision cloud infrastructure across multiple accounts. The security team discovers that developers frequently commit templates that create unencrypted S3 buckets, open security groups (0.0.0.0/0 on port 22), or lack mandatory tags. The security team mandates that these policy violations must be caught in the local developer environment and in the CI/CD pipeline before any CloudFormation API calls are made to AWS. Which tool is specifically designed to write policy-as-code rules to validate CloudFormation templates against compliance policies?",
    "options": [
      {
        "key": "A",
        "text": "In each account, configure Amazon CloudWatch Logs subscription filters on the respective log groups to stream events directly to an Amazon Kinesis Data Firehose delivery stream in the Security account. Configure Kinesis Data Firehose to deliver the log streams into a centralized Amazon S3 bucket, and enforce S3 Object Lock in compliance mode."
      },
      {
        "key": "B",
        "text": "In each member account, configure an AWS Lambda function triggered by Amazon EventBridge rules to export log streams to local S3 buckets daily. Configure S3 Cross-Region Replication (CRR) from all local buckets to a central bucket in the Security account, and encrypt the destination bucket with an SSE-S3 key."
      },
      {
        "key": "C",
        "text": "Deploy Amazon OpenSearch Service in the Security account. Install Fluent Bit agents on all EC2 instances across all 50 accounts, configuring the agents to stream logs directly over public internet endpoints into the OpenSearch cluster with index lifecycle management policies."
      },
      {
        "key": "D",
        "text": "Use AWS CloudTrail Insights in each member account to detect log anomaly events. Export the Insights events to an Amazon SQS queue in each account, and deploy a centralized fleet of EC2 worker instances in the Security account that polls all 50 SQS queues and archives the raw events to Amazon S3 Glacier."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS CloudFormation Guard (cfn-guard) es una herramienta de código abierto de política como código (Policy-as-Code) específica para validar plantillas de CloudFormation y Terraform contra reglas de cumplimiento personalizadas antes del despliegue (shift-left). Puede ejecutarse en local (CLI) y en pipelines de CI/CD para rechazar plantillas no conformes antes de invocar la API de CloudFormation.\n\n**Por qué las otras no:**\n- **A ✗** SSM State Manager aplica configuraciones sobre instancias EC2 en ejecución; no valida plantillas de CloudFormation antes de su despliegue.\n- **B ✗** Amazon Inspector escanea instancias EC2 y repositorios ECR en busca de vulnerabilidades de software; no analiza sintaxis de plantillas de IaC.\n- **C ✗** AWS Trusted Advisor es un servicio en la nube que emite recomendaciones sobre cuentas activas de AWS; no se ejecuta localmente ni en pipelines de código.\n\n🔑 **Concepto clave:** Para validar plantillas de CloudFormation contra reglas de seguridad y etiquetas en local y en el pipeline ANTES del despliegue: la herramienta oficial de AWS es AWS CloudFormation Guard."
  },
  {
    "id": 97,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.4 — Diseñar automatización de operaciones y sistemas resilientes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A multi-region application deployed in us-east-1 and us-west-2 requires access to an Amazon Aurora database credentials secret. To support local low-latency access and regional disaster recovery, the secret must be synchronized across both Regions. Corporate policy mandates that the database password must be rotated every 30 days without manual intervention, and client applications in both Regions must experience zero downtime during password rotation. How should the solutions architect implement this requirement?",
    "options": [
      {
        "key": "A",
        "text": "In AWS CodePipeline, use AWS CodeDeploy with a Canary10Percent5Minutes deployment preference for the serverless application. Configure an Amazon CloudWatch alarm on the Lambda function's Errors and Duration metrics. If the alarm triggers during the canary phase, CodeDeploy automatically rolls back the alias to the previous function version."
      },
      {
        "key": "B",
        "text": "In AWS CodePipeline, configure an AWS CloudFormation deployment action with change sets. Deploy the new Lambda function version and immediately point the production API Gateway stage to the new version. If manual smoke tests fail, initiate a rollback by deploying a previous CloudFormation template."
      },
      {
        "key": "C",
        "text": "Configure the AWS SAM template with AutoPublishAlias set to live and DeploymentPreference set to AllAtOnce. Configure Amazon CloudWatch synthetics canaries to send test traffic to the Lambda function. If the canary detects errors within 15 minutes, trigger an AWS Lambda function to update the alias manually."
      },
      {
        "key": "D",
        "text": "In Amazon API Gateway, configure weighted canary settings on the production stage to send 10% of traffic to the new stage deployment. Configure an Amazon EventBridge rule that checks CloudWatch error metrics every 5 minutes and invokes an API Gateway update-stage API call to promote or roll back traffic."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Secrets Manager admite la replicación nativa de secretos entre múltiples regiones. Al configurar la rotación automática en la región primaria, Secrets Manager utiliza una función Lambda que crea una contraseña secundaria, actualiza la base de datos y conmuta el secreto sin tiempo de inactividad, replicando automáticamente la nueva versión a la región secundaria.\n\n**Por qué las otras no:**\n- **B ✗** DynamoDB no gestiona la lógica de rotación de credenciales en bases de datos relacionales ni maneja el ciclo de vida de secrets de forma administrada.\n- **C ✗** SSM Parameter Store no ofrece replicación multirregión nativa integrada con rotación automática de contraseñas de bases de datos sin código custom.\n- **D ✗** Almacenar contraseñas en archivos de configuración en S3 no proporciona rotación automática ni permite a las aplicaciones obtener credenciales dinámicas en tiempo de ejecución de forma segura.\n\n🔑 **Concepto clave:** Para secretos compartidos multirregión con rotación periódica automática sin downtime: usa AWS Secrets Manager con replicación multirregión nativa."
  },
  {
    "id": 98,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.2 — Diseñar pipelines de CI/CD y DevSecOps",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "An e-commerce company wants to release a new checkout workflow to a small percentage of users and gradually increase the exposure over several days. The operations team requires the capability to instantly toggle the feature off (kill switch) within seconds without redeploying application code or restarting application servers. Furthermore, if the new feature causes application error spikes in Amazon CloudWatch, the system must automatically revert the configuration. Which solution meets these requirements with the LEAST operational overhead?",
    "options": [
      {
        "key": "A",
        "text": "In AWS CloudFormation, enable stack drift detection across all stacks. Configure a scheduled Amazon EventBridge rule that invokes the detect-stack-drift API on all production stacks every hour. If drift is detected, configure an AWS Lambda function to automatically delete and recreate the drifted resources to enforce consistency."
      },
      {
        "key": "B",
        "text": "Deploy AWS Config rules (cloudformation-stack-drift-detection-check) to continuously monitor stack drift. Attach a Service Control Policy (SCP) to the workload OUs that denies CloudFormation, EC2, and RDS modification actions to all IAM principals except the specific IAM role used by the CI/CD pipeline, preventing manual console and CLI changes."
      },
      {
        "key": "C",
        "text": "Attach a CloudFormation stack policy to each production stack that specifies an explicit Deny effect on all resource updates. When the CI/CD pipeline runs, configure the pipeline to delete the stack policy before deploying changes and recreate the stack policy after the deployment succeeds to protect resources."
      },
      {
        "key": "D",
        "text": "In each production account, remove all IAM policies from developer and administrator roles. Require all engineers to submit AWS Support tickets to request manual configuration changes on production infrastructure, and review CloudTrail logs weekly to verify adherence and audit manual adjustments."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** AWS AppConfig (capacidad de AWS Systems Manager) está diseñado específicamente para feature flags y configuraciones dinámicas de aplicaciones en tiempo de ejecución. Permite despliegues controlados progresivos, validación mediante esquemas, rollback automático instantáneo ante alarmas de CloudWatch y revocación de emergencia (kill switch) en segundos sin reiniciar servidores.\n\n**Por qué las otras no:**\n- **A ✗** Consultar una base de datos relacional cada segundo desde cientos de servidores genera una sobrecarga innecesaria en la base de datos y carece de estrategias de despliegue progresivo controladas.\n- **B ✗** Recompilar y redesplegar código para cada ajuste porcentual es lento, propenso a errores y completamente ineficiente como kill switch.\n- **D ✗** Reiniciar los servidores web interrumpe las conexiones activas de los usuarios y añade degradación del servicio en lugar de actualizar la configuración en caliente.\n\n🔑 **Concepto clave:** Para Feature Flags, despliegues progresivos de configuración y kill-switch en segundos con rollback automático sin reiniciar servidores: usa AWS AppConfig."
  },
  {
    "id": 99,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.3 — Implementar controles de seguridad y gobernanza en pipelines",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A security incident response team discovers that long-term IAM user access keys are occasionally committed accidentally to public GitHub repositories by contractors. The company needs an automated solution that detects leaked AWS access keys immediately, invalidates the compromised access keys within seconds of public exposure, and notifies the security operations center. Which architecture provides the FASTEST and most automated response?",
    "options": [
      {
        "key": "A",
        "text": "In AWS Systems Manager Patch Manager, configure a patch baseline with an auto-approval rule set to approve patches 7 days after release. Use Quick Setup to configure a patch policy deployed across all accounts in the organization, defining separate maintenance windows for dev, test, and prod, and generating centralized compliance reports."
      },
      {
        "key": "B",
        "text": "Use Amazon Inspector to scan all EC2 instances across all accounts for operating system vulnerabilities. Configure Amazon Inspector to automatically apply security patches to all non-compliant instances during the next reboot using an automated EventBridge rule and Lambda function."
      },
      {
        "key": "C",
        "text": "Configure EC2 Image Builder to build an updated golden AMI every weekend. Configure an automated pipeline that replaces all running EC2 instances across all 50 accounts by terminating them and launching new instances from the updated golden AMI within an Auto Scaling group rolling deployment."
      },
      {
        "key": "D",
        "text": "Create an AWS Systems Manager State Manager association in each account that runs the AWS-RunPatchBaseline command every 24 hours on all managed nodes without scheduling or environment separation, immediately installing all available patches and rebooting instances when required."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS monitoriza repositorios públicos de código y, al detectar credenciales de AWS expuestas, emite de inmediato un evento en AWS Health bajo el código 'AWS_RISK_CREDENTIALS_EXPOSED'. Capturar este evento mediante Amazon EventBridge permite disparar una función Lambda en segundos para desactivar (`Status: Inactive`) la clave comprometida y alertar al equipo de seguridad por SNS.\n\n**Por qué las otras no:**\n- **B ✗** Las comprobaciones diarias de AWS Config detectan antigüedad de claves, no filtraciones en tiempo real; esperar horas o un día deja las credenciales expuestas a explotación masiva.\n- **C ✗** Amazon Inspector no es un agente de endpoint para laptops de usuarios; opera en EC2 y ECR en la nube.\n- **D ✗** Forzar rotación diaria de claves IAM no previene que una clave válida filtrada sea utilizada por atacantes minutos después de ser expuesta.\n\n🔑 **Concepto clave:** Para neutralizar credenciales de AWS expuestas públicamente en GitHub u otras plataformas en segundos: captura el evento de AWS Health 'AWS_RISK_CREDENTIALS_EXPOSED' con EventBridge y desactiva la clave con Lambda."
  },
  {
    "id": 100,
    "domain": "Dominio 5 — CI/CD, DevSecOps y automatización",
    "task": "5.4 — Diseñar automatización de operaciones y sistemas resilientes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "A financial banking platform operates an active-active multi-region workload across us-east-1 and us-west-2 using Amazon DynamoDB Global Tables and Route 53 ARC routing controls. To validate business continuity readiness before an annual compliance audit, the reliability engineering team must run controlled chaos engineering experiments in production. The experiment must simulate a severe regional outage by draining network traffic from us-east-1, stressing CPU on backend EC2 instances, and verifying that automated failover occurs without human intervention. The experiment must automatically stop if critical application error rates exceed safety thresholds. Which service should be used to orchestrate this experiment?",
    "options": [
      {
        "key": "A",
        "text": "Deploy a custom AWS Lambda function triggered by an Amazon EventBridge rule that executes every 60 seconds. In the Lambda code, use the AWS SDK to randomly terminate EC2 instances, detach EBS volumes, and inject simulated network packet loss using iptables commands sent via SSM Run Command."
      },
      {
        "key": "B",
        "text": "Use AWS Systems Manager Patch Manager to simulate infrastructure degradation by scheduling maintenance windows during peak production hours that intentionally reboot database instances and drain ALB target groups without prior notice to the application team."
      },
      {
        "key": "C",
        "text": "Deploy Amazon CloudWatch Synthetics canaries configured to simulate distributed denial-of-service (DDoS) traffic spikes against the application endpoints, while configuring AWS WAF rate-based rules to evaluate whether the application maintains acceptable latency thresholds."
      },
      {
        "key": "D",
        "text": "Use AWS Fault Injection Simulator (AWS FIS). Create FIS experiment templates that define targeted faults (such as CPU stress, network latency, packet loss, and simulated DB failover) across EC2, ECS, and Aurora resources. Configure stop conditions integrated with Amazon CloudWatch alarms to halt experiments automatically if error thresholds are exceeded."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS Fault Injection Simulator (AWS FIS) es el servicio administrado de ingeniería de caos de AWS. Permite diseñar y ejecutar experimentos controlados sobre recursos reales (inyectar latencia de red, drenar tráfico en AZs o regiones, simular estrés de CPU y desconexiones de bases de datos). Incluye de forma nativa 'Stop Conditions' que abortan el experimento inmediatamente si las alarmas de CloudWatch superan umbrales de seguridad críticos.\n\n**Por qué las otras no:**\n- **A ✗** CloudFormation StackSets gestiona despliegues de plantillas de infraestructura; no inyecta fallos de estrés ni gestiona condiciones de parada de caos.\n- **B ✗** SSM Patch Manager instala parches del sistema operativo; no simula caídas regionales ni estrés de CPU.\n- **C ✗** CloudWatch Synthetics monitoriza endpoints enviando peticiones periódicas; es una herramienta de observación de telemetría, no un generador de inyección de fallos controlado.\n\n🔑 **Concepto clave:** Para realizar pruebas de caos controladas, simulación de fallos en producción y validación de resiliencia con stop conditions de seguridad: la herramienta oficial de AWS es AWS Fault Injection Simulator (AWS FIS)."
  }
];
