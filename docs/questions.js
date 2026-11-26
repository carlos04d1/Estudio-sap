// Banco de preguntas SAP-C02 v2 (100 preguntas: Set 1 + Set 2)
window.ALL_QUESTIONS = [
  {
    "id": 1,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 60 VPC repartidas en 25 cuentas de AWS (todas en AWS Organizations) en la Región us-east-1 y un centro de datos corporativo conectado a AWS con dos conexiones de AWS Direct Connect. Requisitos:\n\n1. Las VPC de **producción** y de **desarrollo** no deben poder comunicarse entre sí.\n2. Ambos tipos de VPC deben poder comunicarse con el centro de datos.\n3. No se desea mantener una malla de conexiones entre VPC.\n4. Se requiere la **menor sobrecarga operativa**.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear peering de VPC en malla completa entre todas las VPC y asociar una interfaz virtual privada (VIF privada) de Direct Connect a cada VPC."
      },
      {
        "key": "B",
        "text": "Crear un AWS Transit Gateway en una cuenta de red, compartirlo con las demás cuentas mediante AWS RAM, usar tablas de rutas separadas (producción y desarrollo) y conectar el centro de datos con un Direct Connect gateway y una VIF de tránsito."
      },
      {
        "key": "C",
        "text": "Crear una conexión Site-to-Site VPN hacia un virtual private gateway en cada VPC y usar peering de VPC para el tráfico entre VPC."
      },
      {
        "key": "D",
        "text": "Consolidar todas las cargas en una sola VPC compartida con VPC sharing y separar producción de desarrollo solo con grupos de seguridad."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Transit Gateway es un enrutador hub-and-spoke **transitivo** que escala a miles de VPC. Se comparte entre cuentas con **AWS RAM**. La segmentación se logra con **tablas de rutas de TGW separadas**: los attachments de producción se asocian a una tabla y los de desarrollo a otra, y ambas propagan solo la ruta del attachment de Direct Connect, no las de la otra. El **Direct Connect gateway + VIF de tránsito** conecta las dos conexiones DX al TGW con una sola configuración.\n\n**Por qué las otras no:**\n- **A ✗** 60 VPC en malla requieren N(N−1)/2 = **1 770 peerings**, inmanejable. Además el peering **no es transitivo** y una VIF privada por VPC no escala.\n- **C ✗** 60 VPN son costosas y difíciles de operar, ignoran la inversión en Direct Connect y el peering sigue siendo una malla no transitiva.\n- **D ✗** Consolidar 60 VPC en una es un rediseño (no una estrategia de conectividad) y los grupos de seguridad no son un límite de aislamiento adecuado entre entornos.\n\n🔑 **Concepto clave:** TGW + RAM + tablas de rutas múltiples = segmentación y conectividad transitiva a escala."
  },
  {
    "id": 2,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una VPC está conectada al centro de datos mediante Site-to-Site VPN. Los servidores locales deben resolver los nombres de una **zona hospedada privada** de Amazon Route 53 (`app.internal.example.com`) y las instancias EC2 deben resolver nombres de la zona `corp.example.local`, que se aloja en los servidores DNS locales. La empresa no quiere administrar servidores DNS en AWS.\n\n¿Qué solución cumple los requisitos con la **menor sobrecarga operativa**?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar servidores BIND en EC2 en dos zonas de disponibilidad, configurados como reenviadores condicionales en ambos sentidos."
      },
      {
        "key": "B",
        "text": "Asociar la zona hospedada privada con los servidores DNS locales y crear una zona hospedada pública de Route 53 para `corp.example.local`."
      },
      {
        "key": "C",
        "text": "Crear un *inbound endpoint* de Route 53 Resolver para las consultas desde el centro de datos hacia AWS y un *outbound endpoint* con una regla de reenvío para `corp.example.local` hacia los DNS locales."
      },
      {
        "key": "D",
        "text": "Crear solo un *outbound endpoint* de Route 53 Resolver con reglas de reenvío para ambos dominios."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** El **inbound endpoint** crea ENI en la VPC a las que el DNS local reenvía las consultas de `app.internal.example.com`. El **outbound endpoint** con una **regla de reenvío** envía las consultas de `corp.example.local` desde la VPC a los DNS locales. Ambos son administrados por AWS (cero servidores).\n\n**Por qué las otras no:**\n- **A ✗** Funciona, pero obliga a parchear, escalar y dar alta disponibilidad a servidores DNS propios: exactamente lo que se quiere evitar.\n- **B ✗** Una zona hospedada privada se asocia a **VPC**, no a servidores locales. Una zona pública para un nombre interno expone información y no reenvía nada a los DNS locales.\n- **D ✗** Un outbound endpoint solo permite que la VPC **salga** a resolver nombres externos; no recibe consultas del centro de datos.\n\n🔑 **Concepto clave:** *Inbound* = on-prem → AWS. *Outbound* = AWS → on-prem. Las reglas de reenvío se pueden compartir entre cuentas con RAM."
  },
  {
    "id": 3,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.1 Diseñar estrategias de conectividad de redes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa financiera transfiere datos desde su centro de datos a Amazon S3 a través de una conexión Direct Connect con VIF privada. Una política interna exige que el tráfico hacia S3 use **direcciones IP privadas de una VPC** y no direcciones IP públicas de S3. La solución debe tener la **menor sobrecarga operativa**.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Crear un *interface endpoint* (AWS PrivateLink) para S3 en la VPC y hacer que las aplicaciones locales usen los nombres DNS específicos del endpoint a través de la VIF privada."
      },
      {
        "key": "B",
        "text": "Crear un *gateway endpoint* para S3 y propagar la ruta de la lista de prefijos hacia la red local."
      },
      {
        "key": "C",
        "text": "Crear un NAT gateway en la VPC y enrutar el tráfico local hacia S3 a través de él."
      },
      {
        "key": "D",
        "text": "Crear un *gateway endpoint* para S3 y desplegar una flota de proxies en EC2 con Auto Scaling para que los clientes locales los usen."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** El *interface endpoint* de S3 es una ENI con **IP privada** dentro de la VPC y **sí es accesible desde on-premises** por Direct Connect o VPN. Es totalmente administrado.\n\n**Por qué las otras no:**\n- **B ✗** Los *gateway endpoints* operan solo mediante **tablas de rutas de la VPC**: no son alcanzables desde redes locales.\n- **C ✗** Un NAT gateway da salida a Internet desde subredes privadas; no sirve de destino para tráfico entrante desde on-premises y usaría IP públicas de S3.\n- **D ✗** Cumple técnicamente, pero agrega una flota de proxies que hay que operar y parchear. El interface endpoint elimina esa sobrecarga.\n\n🔑 **Concepto clave:** Gateway endpoint (S3/DynamoDB, gratis, solo desde la VPC) vs. Interface endpoint (PrivateLink, con costo, accesible desde on-premises)."
  },
  {
    "id": 4,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa contrata a un proveedor SaaS de monitoreo que opera desde su propia cuenta de AWS (`111122223333`). El proveedor necesita **leer métricas de CloudWatch** en la cuenta de la empresa. Requisitos: no usar credenciales de larga duración, aplicar mínimo privilegio y **mitigar el problema del \"suplente confuso\" (confused deputy)**.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Crear un usuario IAM con permisos de solo lectura de CloudWatch y entregar las claves de acceso al proveedor, rotándolas cada 90 días."
      },
      {
        "key": "B",
        "text": "Crear un rol IAM con la política administrada `CloudWatchReadOnlyAccess` y una política de confianza que permita `sts:AssumeRole` a la cuenta `111122223333`, sin condiciones adicionales."
      },
      {
        "key": "C",
        "text": "Crear un rol IAM con `AdministratorAccess` para evitar fallos de permisos y confiar en la cuenta del proveedor."
      },
      {
        "key": "D",
        "text": "Crear un rol IAM con permisos mínimos de lectura de métricas y una política de confianza que permita `sts:AssumeRole` a la cuenta del proveedor con la condición `sts:ExternalId` única para esta empresa."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** El acceso de terceros se hace con un **rol entre cuentas** (credenciales temporales de STS), con permisos mínimos y un **ExternalId** secreto y único por cliente. Si otro cliente del proveedor intentara engañarlo para asumir tu rol, no conocería el ExternalId.\n\n**Por qué las otras no:**\n- **A ✗** Claves de larga duración compartidas con un tercero: lo opuesto a la buena práctica.\n- **B ✗** Casi correcta, pero sin `ExternalId` queda expuesta al *confused deputy*. Además, la política administrada puede dar más de lo necesario.\n- **C ✗** Viola el mínimo privilegio.\n\n🔑 **Concepto clave:** Terceros → rol entre cuentas + `ExternalId`. Nunca usuarios IAM con claves."
  },
  {
    "id": 5,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una organización tiene 120 cuentas en AWS Organizations que operan en 4 Regiones. El equipo de seguridad necesita una **vista única** de los hallazgos de seguridad (Amazon GuardDuty, Amazon Inspector, Amazon Macie y estándares de seguridad), que las **cuentas nuevas se incorporen automáticamente** y que los hallazgos críticos generen una notificación. Se busca el **menor esfuerzo operativo**.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar AWS Security Hub e invitar manualmente cada cuenta y Región como miembro; usar un script para las cuentas nuevas."
      },
      {
        "key": "B",
        "text": "Designar una cuenta de seguridad como administrador delegado de Security Hub y GuardDuty, activar la habilitación automática para cuentas nuevas, configurar la agregación entre Regiones en una Región de agregación y crear una regla de EventBridge para los hallazgos críticos que publique en Amazon SNS."
      },
      {
        "key": "C",
        "text": "Habilitar AWS Config con un agregador de organización y usar sus reglas no conformes como fuente única de hallazgos de seguridad."
      },
      {
        "key": "D",
        "text": "Habilitar un trail de AWS CloudTrail de la organización y consultar los eventos con Amazon Athena para detectar actividad sospechosa."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **Security Hub** agrega hallazgos de GuardDuty, Inspector, Macie y estándares (CIS, FSBP). Con **administrador delegado** y **auto-enable** a nivel de organización, las cuentas nuevas se suman solas; la **agregación entre Regiones** da una vista única y **EventBridge → SNS** cubre las notificaciones. Se usa una cuenta de seguridad distinta de la de administración de la organización.\n\n**Por qué las otras no:**\n- **A ✗** Invitaciones manuales por cuenta y Región: alta sobrecarga y propenso a errores.\n- **C ✗** AWS Config evalúa el **cumplimiento de configuración** de recursos; no consolida hallazgos de amenazas de GuardDuty, Inspector o Macie.\n- **D ✗** CloudTrail son registros, no hallazgos: habría que construir la detección y la consolidación.\n\n🔑 **Concepto clave:** Security Hub + admin delegado + auto-enable + agregación entre Regiones."
  },
  {
    "id": 6,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.2 Prescribir controles de seguridad",
    "multi": true,
    "multiCount": 2,
    "multiNote": "Elija DOS",
    "stem": "Un bucket de Amazon S3 de la **Cuenta A** está cifrado con SSE-KMS mediante una **clave administrada por el cliente** de la Cuenta A. La política del bucket ya permite `s3:GetObject` a un rol IAM de la **Cuenta B**, pero el rol recibe `AccessDenied` al descargar objetos.\n\n¿Qué **DOS** acciones son necesarias para solucionar el problema?",
    "options": [
      {
        "key": "A",
        "text": "Agregar a la política de la clave de KMS de la Cuenta A una declaración que permita `kms:Decrypt` al rol (o a la cuenta) de la Cuenta B."
      },
      {
        "key": "B",
        "text": "Cambiar el cifrado del bucket a la clave administrada por AWS `aws/s3` para que otras cuentas puedan descifrar."
      },
      {
        "key": "C",
        "text": "Adjuntar al rol de la Cuenta B una política IAM que permita `kms:Decrypt` sobre el ARN de la clave de la Cuenta A."
      },
      {
        "key": "D",
        "text": "Exportar el material de la clave de KMS de la Cuenta A e importarlo en la Cuenta B."
      },
      {
        "key": "E",
        "text": "Crear en la Cuenta B un alias que apunte a la clave de la Cuenta A."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C:** En el acceso **entre cuentas** a una clave KMS se necesitan **ambos lados**: la **política de la clave** (Cuenta A) debe permitir a la entidad externa y la **política IAM** (Cuenta B) debe permitir a su rol usar la clave.\n\n**Por qué las otras no:**\n- **B ✗** La política de una clave administrada por AWS **no se puede editar**, por lo que no permite acceso entre cuentas.\n- **D ✗** Las claves de KMS **no se pueden exportar**; el material nunca sale de KMS.\n- **E ✗** Los alias son locales a cada cuenta y Región y **no otorgan permisos**; además un alias de la Cuenta B no puede apuntar a una clave de otra cuenta.\n\n🔑 **Concepto clave:** Cross-account KMS = key policy + IAM policy."
  },
  {
    "id": 7,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar arquitecturas fiables y resistentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación crítica se ejecuta en us-east-1 con un Application Load Balancer, instancias EC2 en un grupo de Auto Scaling y una base de datos Amazon Aurora MySQL. Los requisitos de recuperación ante desastres son **RTO ≤ 10 minutos** y **RPO de pocos segundos**. La empresa **no necesita** una arquitectura activa-activa y quiere **controlar costos**.\n\n¿Qué estrategia de DR debe diseñar el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Copia de seguridad y restauración: AWS Backup con copias entre Regiones cada hora."
      },
      {
        "key": "B",
        "text": "Luz piloto: copiar snapshots de Aurora entre Regiones cada 15 minutos y conservar AMIs; lanzar toda la pila cuando ocurra el desastre."
      },
      {
        "key": "C",
        "text": "Espera activa (*warm standby*): Aurora Global Database con clúster secundario en us-west-2, ALB y Auto Scaling con capacidad mínima reducida en us-west-2 y Route 53 con conmutación por error; ante un desastre, promover el clúster secundario y escalar la flota."
      },
      {
        "key": "D",
        "text": "Multi-sitio activo-activo con 100 % de capacidad en ambas Regiones, escrituras simultáneas en las dos y Route 53 ponderado."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Aurora Global Database replica con retraso típico **< 1 segundo** (RPO de segundos) y permite promover el secundario en **menos de un minuto**. Una flota reducida ya en ejecución escala en minutos (RTO ≈ minutos) con un costo mucho menor que el activo-activo.\n\n**Por qué las otras no:**\n- **A ✗** RPO de ~1 hora y RTO de horas: incumple ambos.\n- **B ✗** Los snapshots cada 15 minutos dan RPO de 15 min (> pocos segundos) y lanzar toda la pila supera el RTO.\n- **D ✗** Cumple los tiempos pero cuesta el doble y exige escrituras multi-Región (Aurora Global Database tiene **una sola Región de escritura**), complejidad innecesaria cuando no se exige activo-activo.\n\n🔑 **Concepto clave:** Backup/restore (horas) → Luz piloto (decenas de min) → Espera activa (minutos) → Multi-sitio (≈ 0). Elige el **más barato que cumpla** RTO/RPO."
  },
  {
    "id": 8,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar arquitecturas fiables y resistentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene ~80 servidores locales (Windows y Linux en VMware). Quiere un plan de DR en AWS con **RPO de segundos** y **RTO de minutos**, **sin pagar por un entorno de DR completo en ejecución** y con la posibilidad de **realizar simulacros de DR** sin afectar la producción.\n\n¿Qué servicio debe usar?",
    "options": [
      {
        "key": "A",
        "text": "AWS Elastic Disaster Recovery."
      },
      {
        "key": "B",
        "text": "AWS Backup con Backup gateway para VMware con copias diarias."
      },
      {
        "key": "C",
        "text": "VM Import/Export con una imagen (AMI) cada noche."
      },
      {
        "key": "D",
        "text": "AWS Database Migration Service (AWS DMS) con captura de cambios (CDC)."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** **Elastic Disaster Recovery** replica de forma continua a **nivel de bloque** hacia un área de preparación (*staging*) con instancias pequeñas y volúmenes EBS económicos. Solo se lanzan las instancias de recuperación completas durante un simulacro o un desastre → RPO de segundos, RTO de minutos y bajo costo.\n\n**Por qué las otras no:**\n- **B ✗** Backups diarios: RPO de horas.\n- **C ✗** Proceso manual y puntual: RPO de ~24 h y RTO alto.\n- **D ✗** DMS replica **bases de datos**, no servidores completos.\n\n🔑 **Concepto clave:** Servidores on-prem/otra nube → AWS con RPO de segundos = AWS Elastic Disaster Recovery."
  },
  {
    "id": 9,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.3 Diseñar arquitecturas fiables y resistentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación web se ejecuta en un grupo de Auto Scaling detrás de un ALB en tres zonas de disponibilidad. En varios incidentes, el proceso de la aplicación se bloquea, pero las instancias siguen en estado *running* y con las comprobaciones de estado de EC2 aprobadas. El ALB marca los destinos como *unhealthy* y deja de enviarles tráfico, pero el grupo de Auto Scaling **no los reemplaza**, y la capacidad se reduce.\n\n¿Qué solución **recupera automáticamente** la capacidad con el menor esfuerzo?",
    "options": [
      {
        "key": "A",
        "text": "Crear una alarma de CloudWatch sobre `StatusCheckFailed_System` con acción de recuperación de EC2."
      },
      {
        "key": "B",
        "text": "Aumentar el tamaño mínimo del grupo de Auto Scaling para absorber las instancias no saludables."
      },
      {
        "key": "C",
        "text": "Instalar un cron en cada instancia que reinicie la aplicación cuando deje de responder."
      },
      {
        "key": "D",
        "text": "Cambiar el tipo de comprobación de estado del grupo de Auto Scaling de EC2 a **ELB** y configurar un período de gracia adecuado."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Por defecto, Auto Scaling solo usa las comprobaciones de **EC2** (hardware/hipervisor). Con el tipo **ELB**, también reemplaza instancias que el balanceador considera *unhealthy*, es decir, fallos de aplicación. El período de gracia evita reemplazos prematuros durante el arranque.\n\n**Por qué las otras no:**\n- **A ✗** `StatusCheckFailed_System` detecta problemas del **host subyacente**, no de la aplicación.\n- **B ✗** Oculta el problema pagando por instancias zombis; no recupera nada.\n- **C ✗** Operación manual por instancia y no reemplaza instancias dañadas.\n\n🔑 **Concepto clave:** ASG + ELB health checks = recuperación automática ante fallos a nivel de aplicación."
  },
  {
    "id": 10,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.4 Diseñar un entorno de AWS de varias cuentas",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 40 cuentas organizadas en unidades organizativas (OU). Por requisitos de **residencia de datos**, solo se pueden usar las Regiones eu-west-1 y eu-central-1, y **nadie puede deshabilitar AWS CloudTrail ni AWS Config**. Los administradores de cada cuenta tienen `AdministratorAccess`.\n\n¿Qué solución **impide** el incumplimiento?",
    "options": [
      {
        "key": "A",
        "text": "Crear políticas IAM de denegación en cada cuenta mediante CloudFormation StackSets."
      },
      {
        "key": "B",
        "text": "Adjuntar políticas de control de servicios (SCP) a la raíz o a las OU de cargas de trabajo que denieguen el uso de otras Regiones con la condición `aws:RequestedRegion` (excluyendo servicios globales) y denieguen detener o eliminar CloudTrail y Config."
      },
      {
        "key": "C",
        "text": "Crear reglas de AWS Config que detecten recursos fuera de las Regiones permitidas y un Lambda que los elimine."
      },
      {
        "key": "D",
        "text": "Adjuntar las SCP únicamente a la cuenta de administración de la organización."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Las **SCP** son guardarraíles **preventivos** que limitan el máximo de permisos de las cuentas miembro, incluso para sus administradores. `aws:RequestedRegion` con excepciones para servicios globales (IAM, Organizations, Route 53, CloudFront…) implementa la residencia de datos; denegar `cloudtrail:StopLogging`, `config:StopConfigurationRecorder`, etc. protege la auditoría. AWS Control Tower ofrece controles equivalentes.\n\n**Por qué las otras no:**\n- **A ✗** Un administrador de la cuenta puede **editar o eliminar** esas políticas IAM.\n- **C ✗** Es **detectivo/reactivo**: el recurso existe (y los datos salen) antes de eliminarse; además los admins podrían desactivar Config.\n- **D ✗** Las SCP **no afectan a la cuenta de administración** y adjuntarlas solo allí no restringe a las cuentas miembro.\n\n🔑 **Concepto clave:** Preventivo = SCP. Detectivo = AWS Config. Las SCP no se aplican a la cuenta de administración."
  },
  {
    "id": 11,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.4 Diseñar un entorno de AWS de varias cuentas",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría exige un registro **centralizado, con integridad verificable y de acceso restringido** de toda la actividad de API de las 60 cuentas actuales y **futuras** de una organización. Solo el equipo de auditoría debe poder acceder a los registros.\n\n¿Qué solución cumple con el **menor esfuerzo**?",
    "options": [
      {
        "key": "A",
        "text": "Crear un trail de la organización de CloudTrail que entregue a un bucket de S3 en una cuenta dedicada de archivo de registros, con cifrado SSE-KMS, validación de integridad de archivos de registro y política de bucket restrictiva (opcionalmente S3 Object Lock)."
      },
      {
        "key": "B",
        "text": "Crear un trail en cada cuenta mediante un script y entregar los registros a un bucket en cada cuenta."
      },
      {
        "key": "C",
        "text": "Usar el historial de eventos de CloudTrail de cada cuenta y exportarlo manualmente cada trimestre."
      },
      {
        "key": "D",
        "text": "Enviar los eventos de CloudTrail a CloudWatch Logs en cada cuenta con retención de 7 años."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Un **trail de la organización** se aplica automáticamente a todas las cuentas, **incluidas las futuras**, y los miembros no pueden modificarlo ni eliminarlo. Entregar a un bucket en una **cuenta de Log Archive** separa funciones; la **validación de integridad** (digests firmados) demuestra que los registros no fueron alterados.\n\n**Por qué las otras no:**\n- **B ✗** Las cuentas nuevas requieren ejecutar el script y los administradores locales pueden borrar su trail o su bucket.\n- **C ✗** El historial de eventos solo conserva 90 días y la exportación manual no es auditable ni centralizada.\n- **D ✗** Siguen siendo registros locales, modificables por los administradores de cada cuenta y sin centralización.\n\n🔑 **Concepto clave:** Trail de organización + cuenta de Log Archive + validación de integridad."
  },
  {
    "id": 12,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.5 Determinar las estrategias de optimización de costos y visibilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Finanzas quiere asignar los costos de 50 cuentas por unidad de negocio mediante la clave de etiqueta `BusinessUnit` en AWS Cost Explorer y en el Informe de costo y uso (CUR). Hoy muchas etiquetas faltan o tienen valores inconsistentes (`finance`, `Finance`, `FIN`).\n\n¿Qué estrategia debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Crear una política de etiquetas (*tag policy*) en AWS Organizations; las etiquetas aparecerán automáticamente en Cost Explorer."
      },
      {
        "key": "B",
        "text": "Activar `BusinessUnit` como etiqueta de asignación de costos, sin estandarizar claves ni valores."
      },
      {
        "key": "C",
        "text": "Definir una política de etiquetas en AWS Organizations con claves y valores permitidos y **activar** `BusinessUnit` como **etiqueta de asignación de costos** en la cuenta de administración (Billing); analizar los costos por etiqueta en Cost Explorer/CUR."
      },
      {
        "key": "D",
        "text": "Usar CloudTrail para identificar quién creó cada recurso y atribuir el costo por usuario."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Hacen falta **dos piezas**: (1) **estandarizar** (tag policy: clave y valores permitidos) y (2) **activar** la etiqueta como *cost allocation tag* en Billing desde la cuenta de administración. Solo entonces los costos se pueden desglosar por la etiqueta.\n\n**Por qué las otras no:**\n- **A ✗** Una política de etiquetas **no activa** la etiqueta para costos; sin activación no aparece en Cost Explorer.\n- **B ✗** Activa la etiqueta pero los valores inconsistentes fragmentan el reporte (`finance` ≠ `Finance`).\n- **D ✗** Quién creó el recurso no equivale a qué unidad de negocio es dueña del costo.\n\n🔑 **Concepto clave:** Tag policy (consistencia) + activación de *cost allocation tags* (visibilidad). La activación **no es retroactiva** y puede tardar hasta 24 h."
  },
  {
    "id": 13,
    "domain": "Dominio 1 — Complejidad organizacional",
    "task": "1.5 Determinar las estrategias de optimización de costos y visibilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa gasta 50 000 USD al mes en cómputo estable entre instancias EC2 (familia m5), AWS Fargate y AWS Lambda. En los próximos 12 meses planea **migrar a Graviton (m7g)**, **mover cargas de EC2 a Fargate** y posiblemente **cambiar de Región**. Quiere el **mayor descuento posible con compromiso de 3 años** conservando esa flexibilidad.\n\n¿Qué opción de compra recomienda?",
    "options": [
      {
        "key": "A",
        "text": "Instancias reservadas estándar de m5 de 3 años."
      },
      {
        "key": "B",
        "text": "EC2 Instance Savings Plans de 3 años para la familia m5 en la Región actual."
      },
      {
        "key": "C",
        "text": "Instancias reservadas convertibles de 3 años."
      },
      {
        "key": "D",
        "text": "Compute Savings Plans de 3 años."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Los **Compute Savings Plans** se aplican a EC2 (cualquier familia, tamaño, Región, SO o tenencia), **Fargate y Lambda**. Es el plan más flexible: cubre exactamente el escenario de cambio de familia, servicio y Región.\n\n**Por qué las otras no:**\n- **A ✗** Las RI estándar quedan ligadas a familia, Región y SO.\n- **B ✗** El EC2 Instance Savings Plan está ligado a **una familia en una Región** y no cubre Fargate ni Lambda.\n- **C ✗** Las RI convertibles permiten intercambiar, pero solo aplican a **EC2**, no a Fargate ni Lambda.\n\n🔑 **Concepto clave:** Más flexibilidad = Compute Savings Plans; más descuento rígido = RI estándar / EC2 Instance SP."
  },
  {
    "id": 14,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "El equipo de seguridad debe desplegar una configuración base (roles IAM de auditoría, reglas de AWS Config y temas de Amazon SNS) en **todas las cuentas y en 3 Regiones**, incluidas las **cuentas que se creen en el futuro**, sin crear roles manualmente en cada cuenta.\n\n¿Qué solución cumple con la **menor sobrecarga operativa**?",
    "options": [
      {
        "key": "A",
        "text": "Una función Lambda programada que asuma un rol en cada cuenta y cree una pila de CloudFormation."
      },
      {
        "key": "B",
        "text": "AWS CloudFormation StackSets con **permisos administrados por el servicio** (integración con AWS Organizations), dirigido a las OU con **implementación automática** habilitada y a las 3 Regiones."
      },
      {
        "key": "C",
        "text": "StackSets con **permisos autoadministrados**, creando manualmente los roles `AWSCloudFormationStackSetExecutionRole` en cada cuenta."
      },
      {
        "key": "D",
        "text": "Una plantilla de CloudFormation con pilas anidadas, desplegada desde la cuenta de administración."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Con permisos **administrados por el servicio**, StackSets crea los roles necesarios automáticamente mediante Organizations y, con la **implementación automática**, aplica la pila a las cuentas nuevas que se unan a la OU.\n\n**Por qué las otras no:**\n- **A ✗** Código a mantener (manejo de errores, reintentos, Regiones, cuentas nuevas): reinventa StackSets.\n- **C ✗** Funciona, pero cada cuenta nueva exige crear manualmente los roles: más trabajo y riesgo.\n- **D ✗** Una pila (aunque sea anidada) vive en **una cuenta y una Región**; no se despliega en varias cuentas.\n\n🔑 **Concepto clave:** StackSets service-managed + auto-deployment = línea base multi-cuenta/multi-Región."
  },
  {
    "id": 15,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un servicio de Amazon ECS en AWS Fargate se ejecuta detrás de un Application Load Balancer. La empresa necesita desplegar versiones nuevas **sin tiempo de inactividad**, **probar la versión nueva con tráfico de prueba antes de enviarle tráfico de producción** y **revertir automáticamente en segundos** si se disparan alarmas de CloudWatch.\n\n¿Qué estrategia de implementación cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "AWS CodeDeploy con despliegue **azul/verde** para ECS, con un *listener* de prueba y alarmas de CloudWatch configuradas para la reversión automática."
      },
      {
        "key": "B",
        "text": "Actualización continua (*rolling update*) del servicio de ECS con el *deployment circuit breaker* habilitado."
      },
      {
        "key": "C",
        "text": "Despliegue \"todo a la vez\" actualizando la definición de tarea y reduciendo `minimumHealthyPercent` a 0 para acelerar el cambio."
      },
      {
        "key": "D",
        "text": "Crear un servicio nuevo y, tras probarlo, cambiar manualmente el registro DNS de Route 53."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** En azul/verde, el entorno nuevo (*green*) se levanta junto al actual; el **listener de prueba** permite validarlo antes del cambio de tráfico y la reversión es **redirigir el tráfico de vuelta** al entorno *blue*, que sigue intacto (segundos), disparada por alarmas de CloudWatch.\n\n**Por qué las otras no:**\n- **B ✗** No hay validación previa con tráfico de prueba y revertir implica **reemplazar tareas** de nuevo (lento).\n- **C ✗** Provoca interrupción (0 % saludable) y no tiene reversión rápida.\n- **D ✗** El caché DNS y los TTL hacen el cambio y la reversión lentos y manuales.\n\n🔑 **Concepto clave:** Reversión instantánea = azul/verde. Menor riesgo gradual = canary/lineal."
  },
  {
    "id": 16,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Diseñar una solución para garantizar la continuidad de actividades",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación opera en modo **activo-pasivo**: un ALB principal en us-east-1 y otro en us-west-2 que solo debe recibir tráfico si el principal falla. La conmutación debe ser **automática** y usar el dominio `www.example.com`.\n\n¿Qué configuración de Amazon Route 53 debe usar el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Política de **latencia** con un registro por Región."
      },
      {
        "key": "B",
        "text": "Política **ponderada** con peso 100 para us-east-1 y 0 para us-west-2, cambiando los pesos manualmente en caso de incidente."
      },
      {
        "key": "C",
        "text": "Política de **conmutación por error** (*failover*): registro de alias primario hacia el ALB de us-east-1 con comprobación de estado y registro de alias secundario hacia el ALB de us-west-2."
      },
      {
        "key": "D",
        "text": "Política **simple** con las direcciones de ambos ALB en un solo registro."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** La política *failover* envía el tráfico al **primario** mientras esté saludable y pasa **automáticamente** al **secundario** si la comprobación de estado falla: es el patrón activo-pasivo.\n\n**Por qué las otras no:**\n- **A ✗** La latencia reparte el tráfico a ambas Regiones (activo-activo), no solo en fallo.\n- **B ✗** Requiere intervención manual: incumple el requisito de automatización.\n- **D ✗** El enrutamiento simple devuelve todos los valores (no hay comprobación de estado ni prioridad).\n\n🔑 **Concepto clave:** Activo-pasivo = failover. Activo-activo = latencia, geolocalización o ponderada con health checks."
  },
  {
    "id": 17,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Diseñar una solución para garantizar la continuidad de actividades",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un carrito de compras global tiene usuarios en Norteamérica, Europa y Asia. La empresa necesita **escrituras locales de baja latencia en la Región más cercana**, **RPO de segundos** y resiliencia ante la caída de una Región **sin promoción manual**.\n\n¿Qué base de datos debe usar?",
    "options": [
      {
        "key": "A",
        "text": "Amazon Aurora Global Database con clúster primario en us-east-1 y secundarios en las demás Regiones."
      },
      {
        "key": "B",
        "text": "Amazon RDS for MySQL con réplicas de lectura entre Regiones."
      },
      {
        "key": "C",
        "text": "Amazon DynamoDB en una sola Región con recuperación a un momento dado (PITR) copiada a otras Regiones."
      },
      {
        "key": "D",
        "text": "Amazon DynamoDB **tablas globales**."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Las **tablas globales** de DynamoDB son **multi-Región y multi-activas**: cada Región acepta escrituras locales y replica al resto en ~1 s (resolución de conflictos *last writer wins*). Si una Región cae, las demás siguen operando sin promoción.\n\n**Por qué las otras no:**\n- **A ✗** Aurora Global Database tiene **una sola Región de escritura**; las escrituras desde otras Regiones se reenvían al primario (mayor latencia) y ante un fallo hay que promover.\n- **B ✗** Las réplicas entre Regiones son de **solo lectura**; la promoción es manual.\n- **C ✗** Los respaldos dan un RPO de minutos/horas y la restauración es manual.\n\n🔑 **Concepto clave:** Escrituras activas en varias Regiones = DynamoDB global tables."
  },
  {
    "id": 18,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.2 Diseñar una solución para garantizar la continuidad de actividades",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Por cumplimiento, una empresa debe conservar copias de seguridad de volúmenes EBS, bases de datos RDS y sistemas de archivos EFS durante **7 años**, copiadas a una **cuenta aislada en otra Región** y **inmutables**: nadie, ni siquiera el usuario raíz, puede eliminarlas antes de su vencimiento. Debe administrarse **de forma centralizada** para 80 cuentas.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Funciones Lambda que creen instantáneas de EBS y RDS y las copien a otra Región, con Amazon Data Lifecycle Manager."
      },
      {
        "key": "B",
        "text": "AWS Backup con **políticas de copia de seguridad de AWS Organizations**, reglas con copia entre cuentas y Regiones hacia un almacén en una cuenta de respaldo aislada con **AWS Backup Vault Lock en modo cumplimiento (*compliance*)**."
      },
      {
        "key": "C",
        "text": "Habilitar el control de versiones de S3 con MFA Delete y exportar todos los respaldos a un bucket."
      },
      {
        "key": "D",
        "text": "AWS Backup con las mismas copias, pero con **Vault Lock en modo gobernanza (*governance*)**."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Backup soporta EBS, RDS y EFS, se gobierna centralmente con **backup policies de Organizations** y permite **copias entre cuentas y Regiones**. **Vault Lock en modo cumplimiento** hace los respaldos **inmutables**: tras el período de gracia, ni el usuario raíz ni AWS pueden alterar la retención.\n\n**Por qué las otras no:**\n- **A ✗** Es un desarrollo propio, no centralizado ni inmutable.\n- **C ✗** MFA Delete protege objetos en S3 pero no cubre los respaldos nativos de EBS/RDS/EFS ni es inmutabilidad real.\n- **D ✗** En modo **gobernanza**, usuarios con permisos especiales **pueden quitar o cambiar** el bloqueo: no cumple \"nadie puede eliminarlas\".\n\n🔑 **Concepto clave:** *Compliance mode* = inmutable. *Governance mode* = reversible por usuarios autorizados."
  },
  {
    "id": 19,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar los controles de seguridad en función de los requisitos",
    "multi": true,
    "multiCount": 2,
    "multiNote": "Elija DOS",
    "stem": "Un sitio de comercio electrónico detrás de un ALB sufre **inyección SQL**, *scraping* con **altas tasas de solicitudes HTTP desde miles de IP** y **ataques DDoS volumétricos** esporádicos. Se necesita mitigación **a gran escala en el borde**, sin mantener listas de IP manualmente, **soporte de respuesta durante ataques** y **protección contra picos de costos** causados por DDoS.\n\n¿Qué **DOS** acciones debe realizar el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Distribuir con Amazon CloudFront y asociar AWS WAF con grupos de reglas administradas (incluida SQLi) y **reglas basadas en tasa**."
      },
      {
        "key": "B",
        "text": "Agregar reglas de denegación en la ACL de red para los rangos de IP atacantes."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon GuardDuty para bloquear automáticamente las IP maliciosas."
      },
      {
        "key": "D",
        "text": "Suscribirse a **AWS Shield Advanced** para CloudFront y el ALB."
      },
      {
        "key": "E",
        "text": "Abrir el grupo de seguridad del ALB únicamente a los rangos de IP de los clientes conocidos."
      }
    ],
    "correct": [
      "A",
      "D"
    ],
    "explanation": "**Respuestas correctas: A y D**\n\n**Por qué A y D:**\n- **A:** CloudFront absorbe y distribuye el tráfico en el borde; **WAF** con reglas administradas bloquea SQLi y las **reglas basadas en tasa** limitan el *scraping* por IP, sin listas manuales.\n- **D:** **Shield Advanced** añade protección DDoS L3/L4/L7, acceso al **equipo de respuesta (SRT)** y **protección de costos** por picos asociados a un ataque.\n\n**Por qué las otras no:**\n- **B ✗** Las ACL de red tienen pocas reglas y no escalan a miles de IP cambiantes.\n- **C ✗** GuardDuty **detecta** amenazas; no bloquea tráfico por sí mismo.\n- **E ✗** Un sitio público de comercio electrónico no puede limitarse a IP conocidas.\n\n🔑 **Concepto clave:** WAF = capa 7 (SQLi, rate limiting). Shield Advanced = DDoS + SRT + protección de costos."
  },
  {
    "id": 20,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar los controles de seguridad en función de los requisitos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Varias funciones de AWS Lambda acceden a una base de datos **Amazon RDS for Oracle** con usuario y contraseña. Se requiere que las credenciales se **roten automáticamente cada 30 días**, estén cifradas y **no sea necesario volver a desplegar** las funciones, con el menor esfuerzo.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar la autenticación de base de datos de IAM en RDS for Oracle y usar tokens temporales."
      },
      {
        "key": "B",
        "text": "Guardar las credenciales como `SecureString` en AWS Systems Manager Parameter Store y escribir una función Lambda de rotación personalizada."
      },
      {
        "key": "C",
        "text": "Almacenar las credenciales en **AWS Secrets Manager** con **rotación automática** cada 30 días; las funciones leen el secreto en tiempo de ejecución (con caché) mediante su rol IAM."
      },
      {
        "key": "D",
        "text": "Guardar las credenciales cifradas con KMS en variables de entorno de Lambda y actualizarlas cada 30 días desde la canalización de CI/CD."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Secrets Manager rota secretos **de forma nativa** (con plantillas para RDS, incluido Oracle) y las funciones obtienen siempre el valor vigente en tiempo de ejecución, sin redespliegue.\n\n**Por qué las otras no:**\n- **A ✗** La autenticación IAM de RDS **no está soportada en Oracle** (solo MySQL, MariaDB y PostgreSQL).\n- **B ✗** Parameter Store **no rota** secretos de forma nativa; habría que construir y mantener la rotación.\n- **D ✗** Las variables de entorno requieren **redespliegue** para cambiar y la rotación es manual.\n\n🔑 **Concepto clave:** Rotación automática nativa = Secrets Manager. Parameter Store = configuración/secretos sin rotación nativa."
  },
  {
    "id": 21,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.3 Determinar los controles de seguridad en función de los requisitos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 500 instancias EC2 (Windows y Amazon Linux) en 20 cuentas y 3 Regiones. Los parches críticos deben aplicarse en 7 días, con **ventanas de mantenimiento distintas por entorno** y un **informe de cumplimiento centralizado**. Se busca el **menor esfuerzo**.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Usar Amazon Inspector para escanear las instancias y aplicar los parches automáticamente."
      },
      {
        "key": "B",
        "text": "Crear una AMI nueva cada mes con EC2 Image Builder y reemplazar manualmente las instancias."
      },
      {
        "key": "C",
        "text": "Que los administradores se conecten por RDP/SSH a cada instancia en las ventanas de mantenimiento."
      },
      {
        "key": "D",
        "text": "Usar **AWS Systems Manager Patch Manager** con una **política de parches (*patch policy*)** desplegada a nivel de organización con Quick Setup: líneas base de parches, programaciones por entorno e informes de cumplimiento centralizados."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Las **patch policies** con Quick Setup definen líneas base, programaciones y ámbito (OU/Regiones/etiquetas) para toda la organización y consolidan el **cumplimiento** de parches.\n\n**Por qué las otras no:**\n- **A ✗** Inspector **detecta vulnerabilidades**, no instala parches.\n- **B ✗** Hornear AMIs es válido para flotas inmutables, pero no resuelve el cumplimiento de las instancias existentes y exige reemplazo manual.\n- **C ✗** Manual, no escala y no genera reportes.\n\n🔑 **Concepto clave:** Patch Manager aplica parches; Inspector los descubre."
  },
  {
    "id": 22,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "En un sistema de pedidos, el nivel web (grupo de Auto Scaling en EC2) llama de forma **síncrona por HTTP** a un servicio de procesamiento en EC2. En picos de tráfico el servicio de procesamiento se satura, devuelve errores 5xx y **se pierden pedidos**. Hay que rediseñar para **no perder pedidos** y escalar de forma eficiente.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Aumentar el tamaño de las instancias de procesamiento y el mínimo de su grupo de Auto Scaling."
      },
      {
        "key": "B",
        "text": "Introducir una **cola de Amazon SQS** entre ambos niveles: el nivel web publica los pedidos, los *workers* los consumen y su grupo de Auto Scaling escala con una métrica de **mensajes en cola por instancia**; usar una cola de mensajes fallidos (DLQ)."
      },
      {
        "key": "C",
        "text": "Reemplazar la llamada HTTP por un tema de SNS con suscripción HTTP al servicio de procesamiento."
      },
      {
        "key": "D",
        "text": "Colocar un balanceador interno entre ambos niveles y escalar el nivel web por CPU."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** SQS **desacopla** los niveles y actúa como **búfer duradero**: los pedidos no se pierden aunque el procesamiento esté saturado. Escalar con *backlog por instancia* ajusta la capacidad a la carga real y la DLQ aísla mensajes problemáticos.\n\n**Por qué las otras no:**\n- **A ✗** Más capacidad fija no elimina el acoplamiento síncrono: un pico mayor vuelve a perder pedidos y sube el costo.\n- **C ✗** SNS no almacena en búfer para consumidores lentos; sigue empujando al servicio saturado y los reintentos son limitados.\n- **D ✗** Un balanceador reparte, pero no absorbe picos; escalar el nivel web por CPU no ayuda al nivel que se satura.\n\n🔑 **Concepto clave:** Acoplamiento débil con SQS + escalado por *backlog per instance*."
  },
  {
    "id": 23,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una API sin servidor usa AWS Lambda y un clúster **Amazon Aurora MySQL** Multi-AZ. En picos, Aurora agota las conexiones (*\"Too many connections\"*) y, durante las conmutaciones por error, las funciones fallan entre 30 y 60 segundos. Hay que **minimizar los cambios** en la aplicación.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Subir a una instancia más grande para aumentar `max_connections`."
      },
      {
        "key": "B",
        "text": "Agregar réplicas de lectura y que cada función elija una al azar."
      },
      {
        "key": "C",
        "text": "Implementar **Amazon RDS Proxy** delante del clúster y hacer que las funciones se conecten al endpoint del proxy."
      },
      {
        "key": "D",
        "text": "Configurar *provisioned concurrency* en las funciones Lambda."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **RDS Proxy** agrupa y **multiplexa conexiones** (ideal para Lambda) y reduce el impacto de una conmutación por error, ya que mantiene conexiones de aplicación mientras el proxy se reconecta al nuevo primario. Solo se cambia el endpoint.\n\n**Por qué las otras no:**\n- **A ✗** Más conexiones máximas cuestan más y no resuelven la tormenta de conexiones ni los fallos en la conmutación.\n- **B ✗** Solo reparte lecturas; no reduce la cantidad de conexiones totales ni el efecto del *failover*.\n- **D ✗** La concurrencia aprovisionada reduce arranques en frío; no limita conexiones a la base de datos (puede incluso aumentarlas).\n\n🔑 **Concepto clave:** Lambda + RDS/Aurora = RDS Proxy."
  },
  {
    "id": 24,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una plataforma SaaS tiene pilas completas en eu-central-1 y us-east-1. Por GDPR y por contrato, los usuarios de la **Unión Europea deben atenderse siempre desde eu-central-1**, aunque la latencia hacia us-east-1 sea menor; el resto de usuarios debe ir a us-east-1.\n\n¿Qué política de enrutamiento de Route 53 debe usar?",
    "options": [
      {
        "key": "A",
        "text": "**Geolocalización**: un registro para el continente Europa hacia eu-central-1 y un registro **predeterminado** hacia us-east-1, con comprobaciones de estado."
      },
      {
        "key": "B",
        "text": "**Latencia**: un registro por Región."
      },
      {
        "key": "C",
        "text": "**Geoproximidad** con sesgo 0 para ambas Regiones."
      },
      {
        "key": "D",
        "text": "**Ponderada** 50/50 entre las dos Regiones."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La geolocalización enruta por **la ubicación del usuario** (país/continente) y **garantiza** que Europa vaya a eu-central-1. El registro predeterminado atiende a las ubicaciones sin coincidencia.\n\n**Por qué las otras no:**\n- **B ✗** La latencia enruta por la Región más rápida, que podría ser us-east-1 para algunos usuarios europeos.\n- **C ✗** La geoproximidad enruta por **distancia**, no garantiza que un usuario de la UE termine en la UE.\n- **D ✗** El reparto ponderado es aleatorio y no respeta residencia.\n\n🔑 **Concepto clave:** Requisito legal/residencia = geolocalización. Rendimiento = latencia."
  },
  {
    "id": 25,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.5 Diseñar una solución para cumplir con los objetivos de rendimiento",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación de lectura intensiva en Amazon DynamoDB recibe millones de lecturas por segundo sobre unos pocos elementos \"calientes\". Se necesita pasar de milisegundos a **microsegundos** de latencia, con lecturas eventualmente consistentes aceptables, **mínimos cambios de código** y menor gasto de RCU.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Implementar Amazon ElastiCache for Redis con el patrón *cache-aside* en la aplicación."
      },
      {
        "key": "B",
        "text": "Aumentar las unidades de capacidad de lectura (RCU) o cambiar a modo bajo demanda."
      },
      {
        "key": "C",
        "text": "Habilitar tablas globales de DynamoDB en más Regiones."
      },
      {
        "key": "D",
        "text": "Implementar **Amazon DynamoDB Accelerator (DAX)** y apuntar el cliente de DynamoDB al clúster de DAX."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** DAX es un caché **en memoria totalmente administrado y compatible con la API de DynamoDB**: se cambia el cliente/endpoint y se logran lecturas en microsegundos, descargando las RCU de la tabla.\n\n**Por qué las otras no:**\n- **A ✗** Exige escribir y mantener la lógica de caché e invalidación en la aplicación (más cambios de código).\n- **B ✗** Más RCU no baja la latencia a microsegundos y aumenta el costo.\n- **C ✗** Las tablas globales mejoran proximidad/DR, no la latencia a microsegundos de elementos calientes.\n\n🔑 **Concepto clave:** DynamoDB + microsegundos + mínimo cambio = DAX."
  },
  {
    "id": 26,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.6 Determinar una estrategia de optimización de costos para cumplir las metas",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "La factura muestra miles de dólares por el procesamiento de datos de **NAT gateway**, causado por instancias en subredes privadas que leen grandes volúmenes de **Amazon S3 y Amazon DynamoDB en la misma Región**. Hay que reducir el costo **sin cambiar la aplicación ni debilitar la seguridad**.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Crear **gateway endpoints** para S3 y DynamoDB y agregarlos a las tablas de rutas de las subredes privadas."
      },
      {
        "key": "B",
        "text": "Crear *interface endpoints* para S3 y DynamoDB."
      },
      {
        "key": "C",
        "text": "Reemplazar el NAT gateway por una instancia NAT de EC2."
      },
      {
        "key": "D",
        "text": "Mover las instancias a subredes públicas con direcciones IP públicas."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los **gateway endpoints** para S3 y DynamoDB son **gratuitos**, sin cargo por procesamiento de datos, y dirigen el tráfico por la red de AWS evitando el NAT. No requieren cambios en la aplicación.\n\n**Por qué las otras no:**\n- **B ✗** Los *interface endpoints* tienen costo por hora y por GB; funcionan, pero son más caros que el gateway endpoint cuando basta con este.\n- **C ✗** No elimina el tráfico por NAT; añade administración y menor disponibilidad.\n- **D ✗** Expone las instancias a Internet: debilita la seguridad.\n\n🔑 **Concepto clave:** Tráfico a S3/DynamoDB dentro de la Región → gateway endpoints = ahorro de NAT."
  },
  {
    "id": 27,
    "domain": "Dominio 2 — Diseño para nuevas soluciones",
    "task": "2.6 Determinar una estrategia de optimización de costos para cumplir las metas",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa almacena 600 TB de objetos (en su mayoría de más de 1 MB) en S3 Standard con **patrones de acceso impredecibles**. Cuando se accede a un objeto, la lectura debe ser en **milisegundos**. Se busca reducir costos **sin cargos por recuperación** y **sin gestión manual**.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Configurar una regla de ciclo de vida a S3 Standard-IA a los 30 días."
      },
      {
        "key": "B",
        "text": "Configurar una regla de ciclo de vida a S3 Glacier Flexible Retrieval a los 30 días."
      },
      {
        "key": "C",
        "text": "Mover los objetos a **S3 Intelligent-Tiering**."
      },
      {
        "key": "D",
        "text": "Mover los objetos a S3 One Zone-IA."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **Intelligent-Tiering** mueve automáticamente los objetos entre niveles según el acceso real (*Frequent*, *Infrequent* y *Archive Instant Access*, todos de **milisegundos**), **sin cargos por recuperación** y sin intervención; solo cobra una pequeña tarifa de monitoreo por objeto.\n\n**Por qué las otras no:**\n- **A ✗** Standard-IA cobra **recuperación por GB** y permanencia mínima de 30 días; con accesos impredecibles puede salir más caro y no vuelve a Standard solo.\n- **B ✗** Glacier Flexible Retrieval tarda **minutos u horas** en recuperar: incumple el requisito de milisegundos.\n- **D ✗** One Zone-IA reduce la resiliencia (una sola AZ) y también cobra recuperación.\n\n🔑 **Concepto clave:** Acceso impredecible + milisegundos + sin tarifa de recuperación = Intelligent-Tiering."
  },
  {
    "id": 28,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 Estrategia para mejorar la excelencia operativa general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría encontró buckets de S3 **públicos** creados por equipos de desarrollo en varias cuentas. La empresa quiere **detectar** buckets públicos en todas las cuentas y **corregirlos automáticamente en minutos**, con trazabilidad de cada acción.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Revisar semanalmente el informe de AWS Trusted Advisor y notificar por correo a los propietarios."
      },
      {
        "key": "B",
        "text": "Implementar reglas de **AWS Config** (por ejemplo `s3-bucket-public-read-prohibited` y `s3-bucket-public-write-prohibited`) en la organización con **acciones de corrección automática** que ejecuten un runbook de **Systems Manager Automation** (por ejemplo `AWS-DisableS3BucketPublicReadWrite`)."
      },
      {
        "key": "C",
        "text": "Habilitar Amazon Inspector para que corrija los buckets públicos."
      },
      {
        "key": "D",
        "text": "Consultar mensualmente los eventos de CloudTrail con Athena y corregir manualmente."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Config **evalúa continuamente** la configuración, marca los recursos no conformes y su **remediación automática** invoca documentos de **Systems Manager Automation**. Todo queda registrado (historial de Config, ejecuciones de Automation). En paralelo conviene activar **S3 Block Public Access** a nivel de cuenta/organización como control **preventivo**.\n\n**Por qué las otras no:**\n- **A ✗** Manual y semanal: no cumple \"en minutos\" ni es automático.\n- **C ✗** Inspector escanea vulnerabilidades de cómputo/contenedores/Lambda; no corrige configuración de S3.\n- **D ✗** Mensual y manual.\n\n🔑 **Concepto clave:** Detección + corrección automática = AWS Config + SSM Automation. Prevención = Block Public Access / SCP."
  },
  {
    "id": 29,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 Estrategia para mejorar la excelencia operativa general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una API de pagos usa AWS Lambda detrás de Amazon API Gateway y se despliega con AWS SAM. Los despliegues son riesgosos. La empresa quiere **enviar el 10 % del tráfico a la versión nueva durante 10 minutos** y **revertir automáticamente** si las alarmas de errores se disparan.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Desplegar \"todo a la vez\" y vigilar manualmente las alarmas."
      },
      {
        "key": "B",
        "text": "Crear dos funciones y usar Route 53 ponderado, cambiando los pesos con un script."
      },
      {
        "key": "C",
        "text": "Usar la estrategia de implementación *immutable* de AWS Elastic Beanstalk."
      },
      {
        "key": "D",
        "text": "Usar `AutoPublishAlias` con `DeploymentPreference: Canary10Percent10Minutes` en SAM, asociado a **alarmas de CloudWatch**; AWS CodeDeploy desplaza el tráfico del alias y revierte si hay alarmas."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** SAM integra **CodeDeploy** con alias de Lambda: el tráfico se desplaza de forma **canary** (10 % → 100 % tras 10 min) y las **alarmas** provocan una **reversión automática** al alias anterior. No requiere infraestructura adicional.\n\n**Por qué las otras no:**\n- **A ✗** Sin gradualidad ni reversión automática.\n- **B ✗** El caché DNS lo hace impreciso y el script es código a mantener.\n- **C ✗** Elastic Beanstalk no aplica a funciones Lambda.\n\n🔑 **Concepto clave:** Lambda + CodeDeploy = canary/lineal con alias ponderados y rollback por alarmas."
  },
  {
    "id": 30,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.1 Estrategia para mejorar la excelencia operativa general",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "El equipo de operaciones gestiona 50 cuentas de AWS en us-east-1 y necesita un **único panel** con métricas, registros y trazas de todas ellas, **sin duplicar datos** ni construir canalizaciones.\n\n¿Qué solución cumple con el **menor esfuerzo**?",
    "options": [
      {
        "key": "A",
        "text": "Usar la **observabilidad entre cuentas de Amazon CloudWatch**: una cuenta de monitoreo con un *sink* y las cuentas de origen vinculadas (con AWS Organizations)."
      },
      {
        "key": "B",
        "text": "Enviar los registros de cada cuenta con suscripciones a Amazon Data Firehose hacia un bucket central y consultarlos con Athena."
      },
      {
        "key": "C",
        "text": "Crear un panel de CloudWatch en cada cuenta y compartirlo con el equipo."
      },
      {
        "key": "D",
        "text": "Exportar periódicamente los registros a S3 y analizarlos con Athena."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La **observabilidad entre cuentas** (OAM) permite que una cuenta de monitoreo **consulte** métricas, registros y trazas de las cuentas de origen **sin copiarlos**, y puede incorporarlas por OU. Es nativa y se opera desde una sola consola.\n\n**Por qué las otras no:**\n- **B ✗** Es una canalización a construir, con datos duplicados y retrasos.\n- **C ✗** No hay vista única: hay 50 paneles distintos.\n- **D ✗** Análisis diferido, no un panel operativo en tiempo real.\n\n🔑 **Concepto clave:** CloudWatch cross-account observability = monitoreo centralizado sin copiar datos (por Región)."
  },
  {
    "id": 31,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Estrategia para mejorar la seguridad",
    "multi": true,
    "multiCount": 2,
    "multiNote": "Elija DOS",
    "stem": "Una auditoría de **mínimo privilegio** detecta cientos de roles IAM con políticas amplias (`\"Action\": \"*\"`). La empresa quiere **identificar los permisos y roles no utilizados** en toda la organización y **generar políticas ajustadas** al uso real.\n\n¿Qué **DOS** soluciones debe usar?",
    "options": [
      {
        "key": "A",
        "text": "IAM Access Analyzer con un analizador de **acceso no utilizado** a nivel de organización."
      },
      {
        "key": "B",
        "text": "El informe de credenciales de IAM."
      },
      {
        "key": "C",
        "text": "**Generación de políticas** de IAM Access Analyzer basada en la actividad registrada en AWS CloudTrail."
      },
      {
        "key": "D",
        "text": "Los hallazgos de IAM de Amazon GuardDuty."
      },
      {
        "key": "E",
        "text": "La comprobación \"IAM Use\" de AWS Trusted Advisor."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C:**\n- **A:** El analizador de **acceso no utilizado** señala roles, usuarios, claves y **permisos** no usados en un periodo definido.\n- **C:** La **generación de políticas** crea una política de mínimo privilegio a partir de la actividad real de CloudTrail.\n\n**Por qué las otras no:**\n- **B ✗** El informe de credenciales cubre **usuarios** (contraseñas, claves, MFA), no permisos de roles.\n- **D ✗** GuardDuty detecta **comportamiento anómalo/amenazas**, no permisos sobrantes.\n- **E ✗** La comprobación \"IAM Use\" solo verifica que exista al menos un usuario IAM; no analiza permisos.\n\n🔑 **Concepto clave:** Auditar mínimo privilegio = Access Analyzer (unused access + policy generation)."
  },
  {
    "id": 32,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Estrategia para mejorar la seguridad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene 300 buckets de S3 en 40 cuentas. Debe **descubrir datos personales (PII)** como identificaciones y tarjetas, y **notificar** al equipo de seguridad cuando aparezcan.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar la protección de S3 de Amazon GuardDuty."
      },
      {
        "key": "B",
        "text": "Ejecutar Amazon Inspector sobre los buckets."
      },
      {
        "key": "C",
        "text": "Habilitar **Amazon Macie** con un administrador delegado en AWS Organizations, activar el **descubrimiento automatizado de datos confidenciales** y enviar los hallazgos a **EventBridge → SNS**."
      },
      {
        "key": "D",
        "text": "Crear reglas de AWS Config que verifiquen que todos los buckets estén cifrados."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **Macie** usa ML y patrones para **clasificar datos sensibles** en S3, se administra de forma centralizada para toda la organización y emite hallazgos a EventBridge para notificaciones.\n\n**Por qué las otras no:**\n- **A ✗** GuardDuty S3 Protection detecta **accesos sospechosos**, no clasifica el contenido.\n- **B ✗** Inspector busca vulnerabilidades de software, no PII.\n- **D ✗** Cifrar no indica **qué datos** hay en el bucket.\n\n🔑 **Concepto clave:** PII en S3 = Macie."
  },
  {
    "id": 33,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.2 Estrategia para mejorar la seguridad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una auditoría criticó el uso de *bastion hosts* con SSH abierto (puerto 22) y claves compartidas. La empresa quiere reemplazarlos: **sin puertos de entrada abiertos**, acceso autenticado con **IAM**, **registro de todas las sesiones** y con instancias en **subredes privadas sin salida a Internet**.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Usar EC2 Instance Connect y limitar el grupo de seguridad del bastión a las IP de la oficina."
      },
      {
        "key": "B",
        "text": "Usar **AWS Systems Manager Session Manager** con registro en S3/CloudWatch Logs, eliminar las reglas de entrada y crear **endpoints de VPC de interfaz** (`ssm`, `ssmmessages` y `ec2messages`)."
      },
      {
        "key": "C",
        "text": "Implementar AWS Client VPN y mantener SSH con las claves compartidas."
      },
      {
        "key": "D",
        "text": "Rotar cada 30 días las claves SSH con AWS Secrets Manager."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Session Manager no necesita **ningún puerto de entrada**; la autenticación y autorización son por **IAM**, las sesiones se pueden **registrar** y, con los endpoints de VPC, funciona en subredes privadas sin Internet (requiere agente SSM y un perfil de instancia).\n\n**Por qué las otras no:**\n- **A ✗** Sigue habiendo puerto 22 abierto y no hay registro de sesión por defecto.\n- **C ✗** Mantiene las claves compartidas y SSH; añade una VPN que operar.\n- **D ✗** Rotar claves no elimina el puerto abierto ni da auditoría de sesión.\n\n🔑 **Concepto clave:** Acceso a instancias sin puertos ni claves = Session Manager."
  },
  {
    "id": 34,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Estrategia para mejorar el rendimiento",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Un juego multijugador en tiempo real tiene servidores detrás de **Network Load Balancers (UDP)** en us-east-1 y eu-west-1. Jugadores de todo el mundo sufren **latencia y jitter** por la Internet pública. Se necesitan **IP estáticas** para las listas de permitidos en firewalls corporativos y una **conmutación regional rápida** que no dependa del TTL de DNS.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Amazon CloudFront con los NLB como orígenes."
      },
      {
        "key": "B",
        "text": "Amazon Route 53 con enrutamiento por latencia."
      },
      {
        "key": "C",
        "text": "Amazon S3 Transfer Acceleration."
      },
      {
        "key": "D",
        "text": "**AWS Global Accelerator** (acelerador estándar) con grupos de puntos de enlace por Región apuntando a los NLB."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Global Accelerator ofrece **dos IP anycast estáticas**, soporta **TCP y UDP**, ingresa el tráfico a la red global de AWS en el borde más cercano (menos jitter) y conmuta entre Regiones **en segundos** con comprobaciones de estado, sin depender del caché DNS.\n\n**Por qué las otras no:**\n- **A ✗** CloudFront entrega HTTP/HTTPS/WebSocket y **no soporta UDP**.\n- **B ✗** El tráfico sigue por la Internet pública, no hay IP estáticas y la conmutación depende del TTL de DNS.\n- **C ✗** S3 Transfer Acceleration solo acelera cargas a S3.\n\n🔑 **Concepto clave:** TCP/UDP + IP estáticas + failover rápido = Global Accelerator. HTTP cacheable = CloudFront."
  },
  {
    "id": 35,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.3 Estrategia para mejorar el rendimiento",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una simulación HPC con **MPI** se ejecuta en 64 instancias C5 de un grupo de Auto Scaling distribuido en varias zonas de disponibilidad. La **latencia entre nodos es alta y variable**, lo que limita el rendimiento.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Usar un **grupo de ubicación de clúster** en una sola zona de disponibilidad con instancias compatibles con **Elastic Fabric Adapter (EFA)**."
      },
      {
        "key": "B",
        "text": "Usar un grupo de ubicación de dispersión (*spread*)."
      },
      {
        "key": "C",
        "text": "Usar un grupo de ubicación de partición (*partition*)."
      },
      {
        "key": "D",
        "text": "Distribuir las instancias en más zonas de disponibilidad para mejorar el aislamiento."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Una carga **fuertemente acoplada** necesita latencia mínima y ancho de banda máximo entre nodos: el grupo de **clúster** agrupa instancias físicamente cercanas en una AZ y **EFA** ofrece comunicación con *OS-bypass* para MPI.\n\n**Por qué las otras no:**\n- **B ✗** *Spread* separa instancias en hardware distinto (alta disponibilidad de pocas instancias críticas), lo contrario a lo que se necesita.\n- **C ✗** *Partition* aísla fallos entre grupos de instancias (Hadoop/Cassandra), no optimiza la latencia.\n- **D ✗** Más AZ aumenta la latencia entre nodos.\n\n🔑 **Concepto clave:** Cluster = rendimiento de red. Spread = aislamiento de pocas instancias. Partition = aislamiento por grupos grandes."
  },
  {
    "id": 36,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.4 Estrategia para mejorar la fiabilidad",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Durante un evento anual de ventas, el grupo de Auto Scaling de una aplicación **no pudo lanzar instancias** porque se alcanzó la **cuota de vCPU On-Demand de EC2** de la Región y nadie recibió una advertencia. La empresa quiere **monitorear proactivamente** el uso frente a las cuotas y **aplicar cuotas elevadas automáticamente** a las cuentas nuevas de la organización.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Distribuir el grupo de Auto Scaling en más zonas de disponibilidad."
      },
      {
        "key": "B",
        "text": "Revisar manualmente cada mes el panel de AWS Trusted Advisor."
      },
      {
        "key": "C",
        "text": "Usar **Service Quotas**: alarmas de CloudWatch sobre las métricas de uso (por ejemplo, al 80 % de la cuota) con notificación por SNS, solicitar aumentos con antelación y una **plantilla de solicitud de cuotas** de la organización para las cuentas nuevas."
      },
      {
        "key": "D",
        "text": "Usar solo instancias Spot para evitar las cuotas."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Service Quotas expone **métricas de uso** en CloudWatch para crear **alarmas proactivas** y permite **plantillas de solicitud** que se aplican automáticamente a las cuentas nuevas de la organización. Los aumentos se solicitan **antes** del evento.\n\n**Por qué las otras no:**\n- **A ✗** Las cuotas de vCPU son **por Región**, no por zona de disponibilidad.\n- **B ✗** Revisión manual y esporádica: no es proactiva ni automatizada.\n- **D ✗** Spot tiene sus propias cuotas y no elimina el riesgo.\n\n🔑 **Concepto clave:** Cuotas = por Región/cuenta; monitorear uso con alarmas y solicitar aumentos con anticipación."
  },
  {
    "id": 37,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.5 Identificar oportunidades de optimización de costos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una flota EC2 tiene un uso medio de CPU del 15 %. El equipo cree que está sobredimensionada, pero algunas aplicaciones son **intensivas en memoria**. Se quieren **recomendaciones de dimensionamiento correcto que consideren la memoria**, a nivel de toda la organización.\n\n¿Qué solución debe implementarse?",
    "options": [
      {
        "key": "A",
        "text": "Usar la comprobación de instancias EC2 con baja utilización de AWS Trusted Advisor."
      },
      {
        "key": "B",
        "text": "Habilitar **AWS Compute Optimizer** a nivel de organización e instalar el **agente de CloudWatch** para publicar las métricas de memoria."
      },
      {
        "key": "C",
        "text": "Crear alarmas de CloudWatch que detengan las instancias con CPU inferior al 20 %."
      },
      {
        "key": "D",
        "text": "Reducir manualmente todas las instancias a una familia menor y observar el resultado."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **Compute Optimizer** analiza el uso histórico y recomienda tamaños/familias óptimos. Por defecto usa CPU, red y disco; para que la **memoria** cuente se necesita el **agente de CloudWatch**. Se puede activar a nivel de organización.\n\n**Por qué las otras no:**\n- **A ✗** La comprobación de baja utilización se basa en CPU y red, no en memoria.\n- **C ✗** Detener instancias por CPU puede interrumpir cargas intensivas en memoria; no es dimensionamiento.\n- **D ✗** Es ensayo y error con riesgo de impacto en producción.\n\n🔑 **Concepto clave:** Memoria en rightsizing = Compute Optimizer + CloudWatch agent."
  },
  {
    "id": 38,
    "domain": "Dominio 3 — Mejora continua de las soluciones existentes",
    "task": "3.5 Identificar oportunidades de optimización de costos",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Las cuentas de *sandbox* de una empresa tienen picos de gasto ocasionales. Los requisitos son: **alertar** cuando el gasto **pronosticado** supere el 80 % del presupuesto mensual y, al alcanzar el **100 %** del presupuesto, **aplicar automáticamente** una restricción que impida lanzar nuevos recursos.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "**AWS Budgets** con alertas de gasto real y pronosticado y una **acción de presupuesto** que aplique una SCP o una política IAM de denegación al alcanzar el umbral."
      },
      {
        "key": "B",
        "text": "Una alarma de facturación de CloudWatch que envíe un correo."
      },
      {
        "key": "C",
        "text": "Revisiones semanales del panel de Trusted Advisor y compra de Savings Plans."
      },
      {
        "key": "D",
        "text": "Informes semanales de Cost Explorer enviados al equipo."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** **AWS Budgets** soporta alertas sobre costos **reales y pronosticados** y **acciones de presupuesto** que pueden aplicar una **política IAM o SCP** (o detener instancias EC2/RDS) automáticamente al superar un umbral.\n\n**Por qué las otras no:**\n- **B ✗** Solo notifica; no aplica restricciones ni usa pronóstico.\n- **C ✗** Manual y los Savings Plans no limitan gastos de *sandbox*.\n- **D ✗** Informativo y diferido: no actúa.\n\n🔑 **Concepto clave:** Control de gasto automatizado = Budgets + Budget Actions."
  },
  {
    "id": 39,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa planea migrar 1 500 servidores locales (VMware). Necesita el **inventario**, la **utilización** y, sobre todo, las **dependencias de red entre servidores (conexiones TCP y procesos)** para agruparlos en aplicaciones y definir **oleadas de migración**.\n\n¿Qué solución debe usar?",
    "options": [
      {
        "key": "A",
        "text": "Introducir manualmente cada servidor en la Calculadora de precios de AWS."
      },
      {
        "key": "B",
        "text": "Ejecutar AWS Compute Optimizer sobre los servidores locales."
      },
      {
        "key": "C",
        "text": "Desplegar únicamente el **Agentless Collector** de AWS Application Discovery Service en vCenter."
      },
      {
        "key": "D",
        "text": "Instalar el **agente de AWS Application Discovery Service** en los servidores y analizar el **diagrama de red** en AWS Migration Hub."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** El **agente de Discovery** recopila configuración, rendimiento, **conexiones de red y procesos** de cada servidor; Migration Hub muestra las **dependencias** para agrupar aplicaciones y planificar oleadas.\n\n**Por qué las otras no:**\n- **A ✗** Manual, sin utilización real ni dependencias.\n- **B ✗** Compute Optimizer analiza recursos que **ya están en AWS**.\n- **C ✗** El recolector sin agente (VMware) obtiene configuración y rendimiento, pero **no datos de conexiones de red/procesos** necesarios para dependencias.\n\n🔑 **Concepto clave:** Dependencias entre servidores = *agent-based* Application Discovery Service + Migration Hub."
  },
  {
    "id": 40,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa migrará 100 máquinas virtuales con **licencias por socket/núcleo** (por ejemplo, Oracle y SQL Server) que desea **reutilizar (BYOL)**. Necesita visibilidad de sockets y núcleos físicos, afinidad con el host y **control del cumplimiento de licencias** con el menor esfuerzo administrativo.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Instancias dedicadas (*Dedicated Instances*) con tenencia dedicada."
      },
      {
        "key": "B",
        "text": "Instancias Spot de tenencia compartida."
      },
      {
        "key": "C",
        "text": "**EC2 Dedicated Hosts** administrados con **AWS License Manager** (configuraciones de licencia y grupos de recursos de host con asignación automática)."
      },
      {
        "key": "D",
        "text": "Instancias de tenencia compartida con licencia incluida y reserva de capacidad."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Los **Dedicated Hosts** exponen **sockets, núcleos y afinidad de host**, requisitos típicos de licencias BYOL. **License Manager** automatiza la asignación de hosts, aplica límites y reporta el uso para el cumplimiento.\n\n**Por qué las otras no:**\n- **A ✗** Las *Dedicated Instances* aíslan el hardware pero **no dan visibilidad de sockets/núcleos ni afinidad** de host.\n- **B ✗** Spot en hardware compartido no sirve para licencias ligadas a hardware.\n- **D ✗** La licencia incluida contradice el objetivo de **reutilizar las licencias existentes**.\n\n🔑 **Concepto clave:** BYOL por socket/núcleo = Dedicated Hosts + License Manager."
  },
  {
    "id": 41,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes",
    "multi": true,
    "multiCount": 2,
    "multiNote": "Elija DOS",
    "stem": "Una empresa debe migrar una base de datos **Oracle 19c de 4 TB** desde su centro de datos a **Amazon Aurora PostgreSQL** con **menos de 30 minutos de inactividad**. La base de datos tiene muchos procedimientos almacenados en PL/SQL.\n\n¿Qué **DOS** acciones debe realizar el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Usar AWS Schema Conversion Tool (AWS SCT) o DMS Schema Conversion para evaluar y convertir el esquema y el código PL/SQL a PostgreSQL."
      },
      {
        "key": "B",
        "text": "Exportar con Oracle Data Pump y restaurar el archivo directamente en Aurora PostgreSQL."
      },
      {
        "key": "C",
        "text": "Usar AWS DMS con **carga completa y captura de datos de cambios (CDC)** y conmutar la aplicación cuando el retraso de replicación sea casi cero."
      },
      {
        "key": "D",
        "text": "Usar AWS DMS solo con carga completa y detener la aplicación mientras se copian los datos."
      },
      {
        "key": "E",
        "text": "Tomar una instantánea de Oracle y crear el clúster de Aurora a partir de ella."
      }
    ],
    "correct": [
      "A",
      "C"
    ],
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C:** En una migración **heterogénea** hay que **convertir** el esquema y el código (SCT / DMS Schema Conversion) y **replicar los datos** con carga completa + **CDC**, de modo que el corte solo requiere esperar a que el retraso sea ~0 (minutos de inactividad).\n\n**Por qué las otras no:**\n- **B ✗** El formato de Data Pump es específico de Oracle; PostgreSQL no puede importarlo.\n- **D ✗** Sin CDC, la inactividad sería proporcional al tiempo de copia de 4 TB, y DMS no convierte código PL/SQL.\n- **E ✗** Las instantáneas solo restauran dentro del mismo motor; no cambian Oracle por PostgreSQL.\n\n🔑 **Concepto clave:** Migración heterogénea con mínima inactividad = SCT (esquema) + DMS (full load + CDC)."
  },
  {
    "id": 42,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa hará un **rehost** (lift-and-shift) de 150 servidores Windows y Linux desde VMware a EC2. Requiere **ventana de corte de minutos**, **pruebas no disruptivas** antes del corte, **replicación continua a nivel de bloque** y no cambiar el sistema operativo.\n\n¿Qué servicio debe usar?",
    "options": [
      {
        "key": "A",
        "text": "VM Import/Export con imágenes OVA exportadas."
      },
      {
        "key": "B",
        "text": "**AWS Application Migration Service (AWS MGN)**."
      },
      {
        "key": "C",
        "text": "AWS DataSync."
      },
      {
        "key": "D",
        "text": "Instantáneas de EBS y AMI manuales."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **MGN** instala un agente que **replica continuamente** los discos hacia un área de preparación, permite **lanzar instancias de prueba** sin afectar el origen y realizar el **corte** en minutos, sin cambios de SO.\n\n**Por qué las otras no:**\n- **A ✗** Es un proceso puntual, con inactividad y sin replicación continua.\n- **C ✗** DataSync mueve archivos/objetos, no servidores completos.\n- **D ✗** Manual, no continuo y no aplica a servidores locales.\n\n🔑 **Concepto clave:** Rehost de servidores = AWS Application Migration Service."
  },
  {
    "id": 43,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes",
    "multi": true,
    "multiCount": 2,
    "multiNote": "Elija DOS",
    "stem": "Una empresa debe mover **600 TB** de archivos locales a Amazon S3 en **6 semanas**. El enlace de Internet es de **1 Gbps compartido** y solo ~30 % puede usarse para la migración (≈ 3 TB/día). Los datos **siguen cambiando** durante el proyecto.\n\n¿Qué **DOS** acciones cumplen los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Transferir todo con AWS DataSync únicamente por Internet."
      },
      {
        "key": "B",
        "text": "Aprovisionar una conexión Direct Connect de 10 Gbps y transferir por ella."
      },
      {
        "key": "C",
        "text": "Pedir varios dispositivos de **AWS Snow Family** (Snowball Edge Storage Optimized) para la **carga masiva inicial**."
      },
      {
        "key": "D",
        "text": "Usar **AWS DataSync** por la red para **sincronizar los cambios incrementales** después de la carga masiva."
      },
      {
        "key": "E",
        "text": "Solicitar AWS Snowmobile."
      }
    ],
    "correct": [
      "C",
      "D"
    ],
    "explanation": "**Respuestas correctas: C y D**\n\n**Por qué C y D:** A ~3 TB/día, 600 TB tardarían **~200 días**: la carga masiva debe ir en dispositivos **Snowball Edge**. Los cambios posteriores se sincronizan con **DataSync** sobre la red.\n\n**Por qué las otras no:**\n- **A ✗** ~200 días ≫ 6 semanas.\n- **B ✗** Aprovisionar Direct Connect puede tardar **semanas o meses**: no cabe en la ventana.\n- **E ✗** Snowmobile está pensado para **decenas de PB a EB**; sería exagerado para 600 TB.\n\n🔑 **Concepto clave:** Muchos TB + poco ancho de banda = Snow Family (bulk) + DataSync (delta). Cálculo rápido: 1 Gbps al 100 % ≈ 10 TB/día."
  },
  {
    "id": 44,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa migra servidores de archivos de Windows locales (**SMB**, ACL NTFS, **80 TB**) integrados con **Active Directory**. Debe conservar SMB, las ACL y DFS con **la mínima administración de servidores**.\n\n¿Qué solución debe elegir?",
    "options": [
      {
        "key": "A",
        "text": "Amazon EFS con montaje desde los clientes Windows."
      },
      {
        "key": "B",
        "text": "Instancias EC2 con Windows Server y volúmenes EBS configurados como servidor de archivos."
      },
      {
        "key": "C",
        "text": "**Amazon FSx for Windows File Server** Multi-AZ unido a Active Directory (administrado o autoadministrado), con **AWS DataSync** para migrar los datos conservando las ACL."
      },
      {
        "key": "D",
        "text": "Amazon S3 reescribiendo las aplicaciones para usar la API de S3."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** FSx for Windows File Server es un servicio **administrado** con SMB nativo, ACL NTFS, DFS, cuotas y **integración con AD**, con Multi-AZ para alta disponibilidad. DataSync copia datos y metadatos (permisos).\n\n**Por qué las otras no:**\n- **A ✗** EFS usa **NFS** y no es compatible con clientes Windows.\n- **B ✗** Funciona, pero hay que administrar SO, parches, clúster y réplica: mucha sobrecarga.\n- **D ✗** Reescribir aplicaciones no cumple \"conservar SMB y ACL\".\n\n🔑 **Concepto clave:** SMB/Windows/AD = FSx for Windows. NFS/Linux = EFS. HPC = FSx for Lustre."
  },
  {
    "id": 45,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una aplicación Java monolítica fue migrada a una sola instancia grande de EC2 y **guarda las sesiones de usuario en memoria local**. Para mejorar disponibilidad y escalabilidad se colocará detrás de un ALB con un grupo de Auto Scaling en varias zonas de disponibilidad. Los usuarios **no deben perder la sesión** si una instancia se termina.\n\n¿Qué debe hacer el arquitecto?",
    "options": [
      {
        "key": "A",
        "text": "Habilitar *sticky sessions* en el ALB."
      },
      {
        "key": "B",
        "text": "**Externalizar el estado de sesión** a Amazon ElastiCache (Redis/Valkey) con Multi-AZ o a Amazon DynamoDB con TTL, dejando las instancias sin estado."
      },
      {
        "key": "C",
        "text": "Guardar las sesiones en un volumen EBS compartido con Multi-Attach entre las instancias."
      },
      {
        "key": "D",
        "text": "Usar una instancia más grande y mantener una sola instancia con las sesiones en memoria."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Una arquitectura **sin estado** permite escalar horizontalmente y sobrevivir a la pérdida de instancias. Las sesiones externas (ElastiCache o DynamoDB) son accesibles desde cualquier instancia.\n\n**Por qué las otras no:**\n- **A ✗** La afinidad mantiene al usuario en una instancia, pero si esa instancia se termina **la sesión se pierde** y el balanceo queda desigual.\n- **C ✗** EBS Multi-Attach es de una **sola AZ**, requiere un sistema de archivos con soporte de clúster y no es una solución de sesiones.\n- **D ✗** Mantiene el punto único de falla.\n\n🔑 **Concepto clave:** Escalar y recuperar = instancias sin estado + estado externo."
  },
  {
    "id": 46,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa ejecuta procesos *batch* nocturnos de ~6 horas en 200 servidores locales. Los trabajos son **tolerantes a interrupciones y reiniciables**. Quiere **minimizar costos** con **poca administración** al migrar a AWS.\n\n¿Qué arquitectura recomienda?",
    "options": [
      {
        "key": "A",
        "text": "**AWS Batch** con entornos de cómputo administrados que usen instancias **Spot** (estrategia `SPOT_PRICE_CAPACITY_OPTIMIZED`), múltiples tipos de instancia y reintentos de trabajo."
      },
      {
        "key": "B",
        "text": "Instancias reservadas de 3 años para 200 instancias EC2."
      },
      {
        "key": "C",
        "text": "Funciones AWS Lambda orquestadas con Step Functions."
      },
      {
        "key": "D",
        "text": "EC2 Dedicated Hosts On-Demand."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** AWS Batch administra colas, aprovisionamiento y escalado; con **Spot** (hasta ~90 % de descuento) y **diversificación de tipos de instancia**, los trabajos reiniciables se ejecutan al menor costo.\n\n**Por qué las otras no:**\n- **B ✗** Pagar 24×7 por cómputo que solo se usa ~6 h al día.\n- **C ✗** Lambda tiene un límite de **15 minutos** por ejecución: no sirve para tareas de 6 horas sin rediseño.\n- **D ✗** Dedicated Hosts On-Demand es la opción más cara sin necesidad de licencias o aislamiento.\n\n🔑 **Concepto clave:** Batch tolerante a fallos = Spot + AWS Batch."
  },
  {
    "id": 47,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.4 Determinar oportunidades de modernización y mejoras",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa tiene un **monolito .NET** en EC2 y quiere modernizarlo a **microservicios** sin interrumpir el servicio ni hacer una reescritura total (*big bang*). Debe entregar funcionalidades de forma **incremental** y poder **revertir** fácilmente.\n\n¿Qué enfoque debe seguir?",
    "options": [
      {
        "key": "A",
        "text": "Detener el desarrollo y reescribir todo en funciones Lambda antes de salir a producción."
      },
      {
        "key": "B",
        "text": "Mover el monolito a un contenedor en ECS y dar por terminada la modernización."
      },
      {
        "key": "C",
        "text": "Dividir primero la base de datos en muchas bases independientes y después refactorizar el código."
      },
      {
        "key": "D",
        "text": "Aplicar el patrón **strangler fig**: colocar un ALB (enrutamiento por ruta) o Amazon API Gateway frente al monolito y extraer funciones gradualmente a microservicios (ECS/Fargate o Lambda), redirigiendo rutas una a una."
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** *Strangler fig* reemplaza el monolito **poco a poco**: cada ruta migrada se redirige al nuevo servicio y, si falla, se vuelve a apuntar al monolito. No hay ventana de interrupción ni riesgo de \"gran explosión\".\n\n**Por qué las otras no:**\n- **A ✗** Reescritura *big bang*: alto riesgo, sin valor hasta el final.\n- **B ✗** Es *replatform* (contenedores), no moderniza la arquitectura a microservicios.\n- **C ✗** Dividir primero los datos es la parte más riesgosa y acopla toda la migración.\n\n🔑 **Concepto clave:** Monolito → microservicios sin interrupciones = strangler fig (con ALB/API Gateway como fachada)."
  },
  {
    "id": 48,
    "domain": "Dominio 4 — Aceleración de la migración y la modernización",
    "task": "4.4 Determinar oportunidades de modernización y mejoras",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "Una empresa opera un servidor **SFTP en EC2** para socios externos; hay que parcharlo y un *cron* copia los archivos a S3. Los socios usan **IP fijas** en sus firewalls. Se quiere **reducir la administración**, escribir **directamente en S3**, **mantener IP fijas** y **autenticar contra el directorio existente** (AD/LDAP).\n\n¿Qué solución debe implementar?",
    "options": [
      {
        "key": "A",
        "text": "Un servidor SFTP en contenedores Fargate con almacenamiento en EFS."
      },
      {
        "key": "B",
        "text": "**AWS Transfer Family** (SFTP) con un **endpoint de VPC accesible desde Internet con Elastic IP**, S3 como almacenamiento y un proveedor de identidad (AWS Managed Microsoft AD o personalizado con API Gateway + Lambda)."
      },
      {
        "key": "C",
        "text": "URL prefirmadas de S3 distribuidas a los socios."
      },
      {
        "key": "D",
        "text": "S3 Transfer Acceleration, pidiendo a los socios que usen la API de S3."
      }
    ],
    "correct": [
      "B"
    ],
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **Transfer Family** es un SFTP/FTPS/FTP **administrado** que guarda en S3. Los *endpoints públicos* usan IP dinámicas; con un **endpoint de VPC + Elastic IP** (y grupos de seguridad) se logran **IP fijas**. Admite directorios y proveedores de identidad externos.\n\n**Por qué las otras no:**\n- **A ✗** Sigue siendo infraestructura que operar y no escribe directo en S3.\n- **C ✗** No es SFTP ni integra el directorio: los socios usan clientes SFTP.\n- **D ✗** Transfer Acceleration acelera la API de S3; no ofrece protocolo SFTP.\n\n🔑 **Concepto clave:** SFTP administrado hacia S3 con IP fijas = Transfer Family + VPC endpoint + Elastic IP."
  },
  {
    "id": 49,
    "domain": "Temas emergentes — IA generativa responsable",
    "task": "",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "*Sección: [[Guia AWS#Diseño de controles de seguridad y de inteligencia artificial responsable]]*\n\nUna aseguradora crea un chatbot de atención al cliente con **Amazon Bedrock**. Requisitos: **bloquear contenido dañino** y **temas fuera de alcance** (por ejemplo, asesoría de inversión), **enmascarar PII** (como números de seguro) en entradas y salidas, aplicar **la misma política a varios modelos y aplicaciones** y poder **auditarla**.\n\n¿Qué solución cumple los requisitos?",
    "options": [
      {
        "key": "A",
        "text": "Incluir las restricciones en el *system prompt* del modelo."
      },
      {
        "key": "B",
        "text": "Procesar las respuestas con una función Lambda que aplique expresiones regulares."
      },
      {
        "key": "C",
        "text": "Configurar **Amazon Bedrock Guardrails** con filtros de contenido, **temas denegados** y **filtros de información confidencial** (bloqueo o enmascaramiento), aplicados a entradas y salidas; reutilizarlo en varios modelos con la API `ApplyGuardrail`."
      },
      {
        "key": "D",
        "text": "Afinar (*fine-tuning*) el modelo para que evite esos temas."
      }
    ],
    "correct": [
      "C"
    ],
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **Guardrails** aplica controles **independientes del modelo**, tanto en la entrada del usuario como en la respuesta: filtros de contenido dañino, temas denegados, filtros de palabras y **PII (bloquear/enmascarar)**. Es una política gestionada y reutilizable, con trazas para auditoría.\n\n**Por qué las otras no:**\n- **A ✗** Las instrucciones del *prompt* no son un control garantizado (inyección de prompts, desvíos del modelo).\n- **B ✗** Solo cubre la salida, es frágil, difícil de mantener y no filtra la entrada.\n- **D ✗** El ajuste fino no garantiza el cumplimiento, es costoso y se debe repetir por modelo.\n\n🔑 **Concepto clave:** Filtrado de contenido y cumplimiento en GenAI = Bedrock Guardrails."
  },
  {
    "id": 50,
    "domain": "Temas emergentes — IA generativa responsable",
    "task": "",
    "multi": false,
    "multiCount": 1,
    "multiNote": null,
    "stem": "*Sección: [[Guia AWS#Diseño de controles de seguridad y de inteligencia artificial responsable]]*\n\nUn agente de IA generativa propone **operaciones de alto impacto** (reembolsos de más de 10 000 USD y cambios en producción). Se exige **aprobación humana obligatoria** antes de ejecutarlas, con **auditoría** y **tiempo de espera** (*timeout*). La aprobación puede tardar horas o días.\n\n¿Qué solución debe diseñarse?",
    "options": [
      {
        "key": "A",
        "text": "Un flujo de **AWS Step Functions** (estándar) con una tarea de **callback** (`.waitForTaskToken`) que envíe el token al aprobador (SNS, correo o API) y continúe con `SendTaskSuccess`/`SendTaskFailure`, con *timeouts* y `Catch`."
      },
      {
        "key": "B",
        "text": "Una función Lambda que consulte cada minuto si hay aprobación (*polling*)."
      },
      {
        "key": "C",
        "text": "Poner las solicitudes en una cola SQS y dejar que el agente decida cuándo consumirlas."
      },
      {
        "key": "D",
        "text": "Ejecutar siempre la operación y revertirla si un humano la rechaza después."
      }
    ],
    "correct": [
      "A"
    ],
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Los flujos **estándar** de Step Functions pueden esperar **hasta un año** con la ejecución en pausa y sin costo de cómputo; el patrón de **token de tarea** detiene el flujo hasta que un humano responde. El historial de ejecución da **auditoría** y se configuran **tiempos de espera** y rutas de error.\n\n**Por qué las otras no:**\n- **B ✗** Lambda dura como máximo **15 minutos** y el *polling* desperdicia recursos.\n- **C ✗** No obliga a la aprobación humana: el agente podría procesar sin ella.\n- **D ✗** Ejecutar primero viola el requisito de aprobación **previa** y algunas operaciones no son reversibles.\n\n🔑 **Concepto clave:** *Human-in-the-loop* = Step Functions + `waitForTaskToken`."
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
        "text": "Create VPC peering connections between all 60 VPCs in us-east-1 and all VPCs in eu-west-1. In each VPC, launch a cluster of EC2 instances running third-party firewall appliances behind an Application Load Balancer. Route all inter-VPC traffic through these local firewalls."
      },
      {
        "key": "B",
        "text": "Deploy an AWS Transit Gateway in us-east-1 only. Share the Transit Gateway with all accounts in both Regions via AWS RAM. Deploy AWS Network Firewall in us-east-1. Route all European VPC traffic across an inter-region Direct Connect gateway to us-east-1 for inspection."
      },
      {
        "key": "C",
        "text": "In each Region, deploy an AWS Transit Gateway in a dedicated Network account. Share the Transit Gateways with the organization using AWS RAM. In each Region, deploy AWS Network Firewall into a dedicated Inspection VPC attached to the regional Transit Gateway with appliance mode enabled. Peer the two Transit Gateways across Regions. Route inter-VPC traffic through the Inspection VPC in each Region before traversing the Transit Gateway peering connection."
      },
      {
        "key": "D",
        "text": "In each Region, configure AWS PrivateLink endpoint services for each microservice. Create interface VPC endpoints in each VPC to connect to every other microservice. Use VPC Flow Logs and Amazon GuardDuty to fulfill the deep packet inspection requirement."
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
        "text": "Configure an SCP that denies all s3 actions unless the request originates from specific VPC IDs. In each account, create IAM roles with permission boundaries that list every allowed S3 bucket ARN explicitly."
      },
      {
        "key": "B",
        "text": "In S3 bucket policies, add a condition requiring aws:PrincipalOrgID matching the company's Organization ID. Configure VPC endpoint policies on all S3 gateway endpoints with a condition requiring aws:ResourceOrgID matching the Organization ID."
      },
      {
        "key": "C",
        "text": "Deploy an AWS Network Firewall rule group that performs TLS inspection on all HTTPS calls to s3.amazonaws.com and drops any HTTP request headers that do not contain corporate session cookies."
      },
      {
        "key": "D",
        "text": "In S3 bucket policies, use the aws:PrincipalArn condition listing all IAM users in the company. Configure an SCP denying s3:PutObject to any bucket without the tag Confidential:True."
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
        "text": "Deploy custom BIND DNS servers on EC2 instances across multiple AZs in each of the 80 VPCs. Configure DHCP option sets in each VPC pointing to these local BIND servers. Configure zone transfers between BIND and on-premises Active Directory DNS servers over Direct Connect."
      },
      {
        "key": "C",
        "text": "Deploy Route 53 Resolver inbound and outbound endpoints in all 80 VPCs. Create conditional forwarding rules in each VPC pointing directly to the on-premises DNS IP addresses over Direct Connect."
      },
      {
        "key": "D",
        "text": "Associate the Route 53 Private Hosted Zone with the on-premises customer gateway router IP addresses using BGP route advertisements. Configure Route 53 Public Hosted Zones with latency routing for internal resolution."
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
        "text": "Create an SCP with an Allow effect specifying us-east-1 and us-west-2 under aws:RequestedRegion. Detach the default FullAWSAccess SCP from the organization root."
      },
      {
        "key": "B",
        "text": "In AWS Control Tower, enable data residency guardrails only on the Core OU. Disable CloudTrail in all member accounts located outside us-east-1 and us-west-2."
      },
      {
        "key": "C",
        "text": "In AWS Config, create an organization-wide rule that detects resources in unapproved Regions and triggers an AWS Systems Manager Automation document that runs ec2:TerminateInstances and s3:DeleteBucket."
      },
      {
        "key": "D",
        "text": "Create an SCP with a Deny effect on all actions, with a condition using StringNotEquals on aws:RequestedRegion specifying us-east-1 and us-west-2, and add a condition using NotAction or StringNotLike for global services such as iam, organizations, route53, cloudfront, support, and wafv2."
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
        "text": "Configure Amazon Route 53 with an active-passive failover routing policy pointing to the two ALBs. Set the record TTL to 10 seconds. Create Route 53 health checks associated with CloudWatch alarms in each Region."
      },
      {
        "key": "B",
        "text": "Deploy AWS Global Accelerator with two static Anycast IP addresses. Create an endpoint group for us-east-1 and an endpoint group for us-west-2, attaching the respective regional Application Load Balancers. Configure health checks in Global Accelerator with an interval of 10 seconds and a threshold of 3 consecutive checks."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon CloudFront distribution with Origin Shield enabled. Configure an origin group with the primary ALB in us-east-1 and the secondary ALB in us-west-2 with 502/503/504 failover criteria."
      },
      {
        "key": "D",
        "text": "Establish an AWS Site-to-Site VPN with BGP route propagation between the two Regions. Use ECMP to route traffic over the AWS backbone."
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
        "text": "In the management account, create a central S3 bucket with S3 Versioning and S3 Lifecycle rules configured to transition objects to S3 Glacier Flexible Retrieval after 30 days and delete after 10 years. Encrypt the bucket with the default AWS managed key aws/s3."
      },
      {
        "key": "C",
        "text": "In the Log Archive account, create an S3 bucket with S3 Object Lock in governance mode for 10 years. Attach an SCP to the organization root that denies s3:Delete actions on the log bucket ARN."
      },
      {
        "key": "D",
        "text": "Configure Amazon CloudWatch Logs log groups in each account with a 10-year retention policy. Use CloudWatch metric filters to send all log events to Amazon Kinesis Data Firehose in the Log Archive account."
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
        "text": "In each of the 50 VPCs, deploy an AWS Network Firewall and a NAT Gateway in a public subnet. Configure Network Firewall domain allowlists locally in each VPC."
      },
      {
        "key": "B",
        "text": "In each production VPC, create a VPC peering connection to a centralized Proxy VPC hosting an Auto Scaling group of Squid proxy instances. Route all traffic through the proxy instances."
      },
      {
        "key": "C",
        "text": "In a dedicated Network Egress account, deploy a centralized Egress VPC connected to a regional AWS Transit Gateway. In the Egress VPC, launch AWS Network Firewall across multiple Availability Zones, with dedicated NAT Gateways in public subnets routing through an Internet Gateway. In the Transit Gateway route table, set the default route (0.0.0.0/0) to point to the Egress VPC attachment. In the Egress VPC route tables, route traffic from the Transit Gateway through the AWS Network Firewall endpoints before directing it to the NAT Gateways."
      },
      {
        "key": "D",
        "text": "Attach an Internet Gateway to each production VPC. Configure egress-only Internet Gateways and security groups with outbound rules restricted to specific public IP addresses."
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
        "text": "In each of the 200 accounts, create custom IAM policies for each developer listing their allowed resources by ARN. Update the policies daily using an automated Lambda script reading from an S3 CSV file."
      },
      {
        "key": "B",
        "text": "In IAM Identity Center, create one permission set for every CostCenter and Project combination. Assign users to the permission sets based on their Active Directory security groups."
      },
      {
        "key": "C",
        "text": "In AWS Organizations, create an SCP that denies all access if the user's IAM role name does not match the tag on the EC2 instance or S3 bucket."
      },
      {
        "key": "D",
        "text": "In IAM Identity Center, configure Attributes for access control to map the CostCenter and Project attributes from the IdP SAML assertion. Create a single consolidated IAM Identity Center permission set with a policy that allows actions conditioned on aws:PrincipalTag/CostCenter matching aws:ResourceTag/CostCenter and aws:PrincipalTag/Project matching aws:ResourceTag/Project. In the policy, add a Deny statement for tag:UntagResources and DeleteTags on resources where the tags match, and enforce aws:RequestTag conditions on resource creation APIs."
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
        "text": "In the AWS Billing and Cost Management console of the management account, navigate to Preferences and turn off discount sharing for all accounts in the Development OU. Keep discount sharing enabled between the FinOps account and accounts in the Production OU."
      },
      {
        "key": "B",
        "text": "Create an SCP attached to the Development OU that denies ec2:RunInstances for any instance type covered by a Savings Plan or Reserved Instance."
      },
      {
        "key": "C",
        "text": "Move the Development accounts out of the current AWS Organization into a completely separate standalone billing account without AWS Organizations."
      },
      {
        "key": "D",
        "text": "In AWS Budgets, configure a budget action in each Development account that automatically stops EC2 instances when their usage exceeds 500 dollars per month."
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
        "text": "Deploy Amazon Aurora PostgreSQL in us-east-1. Create an Aurora read replica in eu-west-1. In the application code, implement write-forwarding to send all write requests from Europe to the US endpoint."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon DynamoDB Global Table with replica tables in us-east-1 and eu-west-1. Configure each regional replica table to use a customer managed key (CMK) in its respective Region. The application in each Region writes to its local replica table."
      },
      {
        "key": "C",
        "text": "Deploy DynamoDB tables in each Region. Deploy AWS Lambda functions triggered by DynamoDB Streams in both Regions to replicate changes bidirectionally across Regions using cross-region API calls."
      },
      {
        "key": "D",
        "text": "Deploy Amazon DocumentDB Multi-Region clusters with bidirectional Apache Kafka replication deployed on Amazon EC2 instances across both Regions."
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
        "text": "Create a manual snapshot of the Aurora cluster. Restore the snapshot into a new cluster with the upgraded major version. Perform application testing and manually switch the application connection string to the new cluster."
      },
      {
        "key": "B",
        "text": "Use AWS DMS to perform a full load and continuous replication to a newly provisioned Aurora cluster running the upgraded version. Drop the DMS task during the maintenance window and point the application to the new endpoint."
      },
      {
        "key": "C",
        "text": "Use Amazon Aurora Blue/Green Deployments to create a green environment with the target major engine version. Perform validation on the green environment. Initiate switchover to the green environment, ensuring that the blue environment remains intact for rollback."
      },
      {
        "key": "D",
        "text": "Modify the existing Aurora cluster in-place using the AWS CLI with the apply-immediately flag set to true. Monitor the upgrade through Amazon CloudWatch metrics."
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
        "text": "Provision a standby Amazon EKS cluster in eu-central-1. Deploy a GitOps operator in both clusters synchronizing deployments from the Git repository. Use Amazon Route 53 Application Recovery Controller (ARC) routing controls and health checks to govern automated traffic shifting between Regions."
      },
      {
        "key": "B",
        "text": "Create an AWS Lambda function that triggers during a regional failure to execute aws eks create-cluster via the AWS CLI in eu-central-1 and deploys all application pods using kubectl."
      },
      {
        "key": "C",
        "text": "Use AWS Backup to take hourly snapshots of the EKS cluster worker node EBS volumes in us-east-1. In the event of a disaster, restore the EBS volumes in eu-central-1 and launch new EC2 instances."
      },
      {
        "key": "D",
        "text": "Deploy a single EKS cluster spanning worker nodes across both us-east-1 and eu-central-1 across an inter-region VPC peering connection. Configure pod topology spread constraints to balance replicas."
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
        "text": "Deploy an Application Load Balancer in public subnets with an mTLS listener. Route traffic directly to the private EC2 instances. Use AWS Systems Manager Parameter Store with an EC2 cron job to rotate database passwords."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon CloudFront distribution with AWS WAF attached. Configure CloudFront origin request policies to validate client certificates. Store database credentials in an S3 bucket encrypted with SSE-S3."
      },
      {
        "key": "C",
        "text": "Configure a Network Load Balancer with TLS termination and pass client certificates to backend EC2 instances in HTTP headers. Configure AWS Secrets Manager to store credentials and use an EventBridge scheduled rule to trigger an EC2 reboot."
      },
      {
        "key": "D",
        "text": "Deploy an Amazon API Gateway regional REST API with a custom domain name configured for mutual TLS (mTLS) using an S3 truststore. Associate an AWS WAF web ACL with the API Gateway. Configure a VPC Link from API Gateway to an internal Network Load Balancer in front of the private EC2 instances. Store database credentials in AWS Secrets Manager and enable automatic rotation using a pre-configured AWS Lambda rotation function."
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
        "text": "Publish orders to an Amazon Kinesis Data Stream. Configure a Lambda event source mapping with a batch size of 10. Write custom application logic to check DynamoDB idempotency keys before processing each record."
      },
      {
        "key": "B",
        "text": "Send orders to an Amazon SQS FIFO queue with a Dead Letter Queue (DLQ) configured with maxReceiveCount set to 5. Configure the Lambda event source mapping with ReportBatchItemFailures enabled. In the Lambda function, return the batchItemFailures list containing the message IDs of only the failed items."
      },
      {
        "key": "C",
        "text": "Send orders to an Amazon SQS Standard queue. Configure a Lambda trigger with a batch size of 10. In the function catch block, delete all messages from the queue except the failed message ID."
      },
      {
        "key": "D",
        "text": "Send orders to an Amazon SNS FIFO topic that fan-out to 10 standard SQS queues. Configure Lambda to process one queue per worker with exponential backoff retries."
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
        "text": "Deploy an Amazon FSx for Lustre persistent file system linked to the Amazon S3 bucket with an automated data repository association (DRA) to import and export changes. Mount the FSx for Lustre file system across all EC2 worker instances."
      },
      {
        "key": "B",
        "text": "Deploy an Amazon Elastic File System (EFS) file system with General Purpose performance mode and provisioned throughput. Mount the EFS file system via NFS on all instances and run an rsync script to transfer files to S3."
      },
      {
        "key": "C",
        "text": "Create an Amazon EBS Provisioned IOPS SSD (io2 Block Express) volume of 64 TB. Attach the EBS volume to an EC2 instance and share it with the cluster using a Samba Windows share."
      },
      {
        "key": "D",
        "text": "Configure EC2 instances with local NVMe Instance Store SSDs. Write a custom daemon that continuously downloads objects from S3 using the AWS CLI and uploads results using multipart uploads."
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
        "text": "Configure an S3 event notification to trigger AWS Lambda functions for all images. Run the Lambda functions with maximum memory (10,240 MB) and configure Provisioned Concurrency to absorb peak hours."
      },
      {
        "key": "B",
        "text": "Deploy Amazon EKS worker nodes on EC2 On-Demand instances using an Auto Scaling group managed by the Kubernetes Cluster Autoscaler with a fixed minimum size of 20 instances. Store all images in S3 Standard."
      },
      {
        "key": "C",
        "text": "Configure S3 event notifications to send upload events to an Amazon SQS queue. In the EKS cluster, deploy Karpenter to automatically provision EC2 Spot instances using diverse instance types based on queue depth. Store raw images in Amazon S3 with an S3 Lifecycle rule to transition objects to S3 Intelligent-Tiering immediately."
      },
      {
        "key": "D",
        "text": "Purchase 3-year EC2 Reserved Instances for the peak evening capacity. Configure the worker pods with static CPU requests and deploy them on dedicated EC2 hosts."
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
        "text": "Deploy a mesh of VPC peering connections across all Regions and accounts. Use Security Groups in each VPC with IP prefix lists to restrict traffic between Development and Production CIDRs."
      },
      {
        "key": "B",
        "text": "Deploy AWS Cloud WAN with a global central network. Define segments for Production, Development, and SharedServices in a central core network policy document. Configure routing rules within the policy to allow Production and Development to route only to SharedServices while isolating them from each other. Attach regional VPCs and Direct Connect gateways to the appropriate core network segments."
      },
      {
        "key": "C",
        "text": "Deploy an AWS Transit Gateway in each Region. Peer all Transit Gateways together in a full mesh. In each Transit Gateway, create separate route tables for Production and Development. Use AWS Systems Manager to manually copy route table entries between Regions."
      },
      {
        "key": "D",
        "text": "Deploy an AWS Network Firewall in every VPC. Configure firewall rules locally in each account to block any traffic originating from the Development CIDR block."
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
        "text": "Deploy an Amazon API Gateway in both Regions that writes events directly to an Amazon Kinesis Data Stream in each Region. Use a Route 53 latency record pointing to the API Gateways."
      },
      {
        "key": "B",
        "text": "Create a custom Amazon EventBridge event bus in each Region. Configure an AWS Lambda function on a schedule that tests the bus and updates Route 53 DNS records using the AWS SDK if failures are detected."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon SQS queue in each Region. Configure an Application Load Balancer in each Region to forward events to the local SQS queue, and use VPC Peering to synchronize the queues."
      },
      {
        "key": "D",
        "text": "Create an Amazon EventBridge global endpoint that spans event buses in us-east-1 and us-west-2. Configure an Amazon Route 53 health check to monitor the health of the primary bus and manage automatic failover. Direct the mobile clients to publish events to the EventBridge global endpoint."
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
        "text": "Amazon MemoryDB for Redis"
      },
      {
        "key": "B",
        "text": "Amazon ElastiCache for Memcached with Multi-AZ"
      },
      {
        "key": "C",
        "text": "Amazon DynamoDB with DynamoDB Accelerator (DAX)"
      },
      {
        "key": "D",
        "text": "Amazon RDS for PostgreSQL with an in-memory tempfs storage engine"
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
        "text": "Schedule hourly automated snapshots of the primary OpenSearch domain to an S3 bucket in us-east-1. Use S3 Cross-Region Replication (CRR) to copy the snapshots to us-west-2. Restore the domain from the snapshot when a disaster occurs."
      },
      {
        "key": "B",
        "text": "Configure an Amazon Kinesis Data Firehose delivery stream in us-east-1 with dual endpoints that write concurrently to both OpenSearch domains."
      },
      {
        "key": "C",
        "text": "Set up an Amazon OpenSearch Service domain in us-west-2. Establish a cross-cluster connection between the two domains and configure Cross-Cluster Replication (CCR) for the relevant indexes. In the secondary domain, monitor the replication lag and use the follower indexes for immediate read failover."
      },
      {
        "key": "D",
        "text": "Deploy an AWS Lambda function triggered by Amazon CloudWatch Logs to read data from the primary OpenSearch domain and index it into the secondary domain."
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
        "text": "Create an IAM policy attached to all IAM users that denies ec2:RunInstances unless the Encrypted:true parameter is present. Manually detach and re-encrypt existing volumes during the weekend."
      },
      {
        "key": "B",
        "text": "Enable default EBS encryption in each Region across all accounts using AWS Systems Manager Quick Setup or an organization-wide script, configured with the regional KMS CMK. Create an SCP that denies ec2:RunInstances if the volume is unencrypted. For existing unencrypted volumes, use AWS Systems Manager Automation to automate snapshot creation, snapshot copy with KMS CMK encryption, and volume replacement during maintenance windows."
      },
      {
        "key": "C",
        "text": "Deploy AWS KMS key policies with conditions denying ec2:CreateVolume if encryption is disabled. Rely on Amazon Macie to detect unencrypted EBS volumes."
      },
      {
        "key": "D",
        "text": "In AWS Config, enable an automatic remediation action that immediately terminates any EC2 instance attached to an unencrypted EBS volume."
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
        "text": "Increase the max_connections parameter in the Aurora DB parameter group to the maximum allowed limit and upgrade the DB instance size to a larger instance class."
      },
      {
        "key": "B",
        "text": "Migrate the application from AWS Lambda to Amazon EC2 instances running inside an Auto Scaling group with connection pooling configured in the application server."
      },
      {
        "key": "C",
        "text": "Deploy an Amazon DynamoDB table in front of Aurora to buffer all database queries, and use a scheduled cron Lambda to flush changes to Aurora."
      },
      {
        "key": "D",
        "text": "Deploy an Amazon RDS Proxy between the AWS Lambda functions and the Amazon Aurora PostgreSQL cluster. Configure Lambda functions to connect to the RDS Proxy endpoint instead of the direct database endpoint."
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
        "text": "Refactor the application to store session state externally in an Amazon DynamoDB table or Amazon ElastiCache cluster. Deploy the EC2 instances across multiple Availability Zones inside an Auto Scaling group with scaling policies based on CPU utilization and target tracking."
      },
      {
        "key": "B",
        "text": "Enable sticky sessions (session affinity) on the Application Load Balancer target group and increase the idle timeout to 3600 seconds. Add two more EC2 instances in the same Availability Zone."
      },
      {
        "key": "C",
        "text": "Configure Elastic Block Store (EBS) Multi-Attach on an io2 volume and share the memory state file system across all four EC2 instances."
      },
      {
        "key": "D",
        "text": "Use AWS Application Migration Service to convert the EC2 instances into a single high-memory bare-metal EC2 instance with 99.99% hardware reliability."
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
        "text": "Deploy custom Python scripts on cron schedules in every account that invoke the DescribeInstances API and calculate average metrics. Store the JSON output in an S3 bucket."
      },
      {
        "key": "B",
        "text": "Configure Amazon CloudWatch anomaly detection on every EC2 instance metric and set up CloudWatch alarms that trigger AWS Lambda functions to stop underutilized instances."
      },
      {
        "key": "C",
        "text": "Enable AWS Compute Optimizer in the management account for the entire organization. Configure export of Compute Optimizer recommendations to a centralized Amazon S3 bucket in a FinOps account, and visualize the findings using Amazon QuickSight."
      },
      {
        "key": "D",
        "text": "In AWS Cost Explorer, manually generate monthly Rightsizing Reports for each individual member account and download CSV spreadsheets."
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
        "text": "Configure Ansible Tower on an EC2 instance in a public subnet. Install OpenSSH on all Windows and Linux on-premises servers and execute patch playbooks over the public Internet."
      },
      {
        "key": "B",
        "text": "Install the AWS Systems Manager Agent (SSM Agent) on all on-premises servers and EC2 instances, registering on-premises machines as managed instances with hybrid activations. Configure Systems Manager Patch Manager with custom patch baselines for Linux and Windows. Use Systems Manager Maintenance Windows to schedule automated patch deployment and view compliance in the Systems Manager Compliance dashboard."
      },
      {
        "key": "C",
        "text": "Use AWS Systems Manager Run Command to manually execute shell scripts and PowerShell commands on all instances on the first weekend of every month."
      },
      {
        "key": "D",
        "text": "Deploy AWS CodeDeploy agents on all servers. Create deployment groups for each operating system and push OS patch packages using CodePipeline."
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
        "text": "In each account, configure Amazon OpenSearch Service to ingest VPC Flow Logs and CloudTrail logs. Write custom Python query scripts to compare IP addresses against open-source threat intelligence lists."
      },
      {
        "key": "B",
        "text": "Enable Amazon Macie in all accounts and configure an AWS Lambda function to stop EC2 instances when sensitive data is exposed."
      },
      {
        "key": "C",
        "text": "Configure AWS WAF in each account and configure rate-based rules to block IP addresses generating abnormal outbound HTTP traffic."
      },
      {
        "key": "D",
        "text": "In the AWS Organizations management account, designate a security account as the delegated administrator for Amazon GuardDuty. Enable GuardDuty for all member accounts with automated enablement for future accounts. Configure an Amazon EventBridge rule in the security account that listens for GuardDuty findings of high severity and triggers an AWS Step Functions workflow to isolate the compromised EC2 instance by attaching a quarantine security group and revoke active IAM sessions."
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
        "text": "Instrument the application microservices using the AWS X-Ray SDK or AWS Distro for OpenTelemetry (ADOT). Enable active tracing on the Lambda functions and ECS task definitions. Use the AWS X-Ray Service Map and trace analysis to identify latency distribution and pinpoint downstream bottlenecks in the request path."
      },
      {
        "key": "B",
        "text": "Increase the provisioned read and write capacity on all DynamoDB tables to 10,000 RCU/WCU and turn on DynamoDB Streams."
      },
      {
        "key": "C",
        "text": "Enable Amazon CloudWatch Detailed Monitoring on all underlying EC2 instances and configure VPC Flow Logs with 1-minute aggregation intervals."
      },
      {
        "key": "D",
        "text": "Configure Amazon CloudWatch Synthetics canaries to send checkout requests every minute and record HTTP response codes in an Amazon S3 bucket."
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
        "text": "Keep objects in S3 Standard for 7 days. Transition objects to S3 Standard-Infrequent Access (S3 Standard-IA) at day 8. Transition objects to S3 Glacier Flexible Retrieval at day 90. Configure a rule to abort incomplete multipart uploads after 7 days."
      },
      {
        "key": "B",
        "text": "Keep objects in S3 Standard for 90 days. Transition objects to S3 Glacier Deep Archive at day 91. Delete incomplete multipart uploads manually using the AWS CLI."
      },
      {
        "key": "C",
        "text": "Keep objects in S3 Standard for 7 days. Transition objects to S3 Glacier Instant Retrieval at day 8. Transition objects to S3 Glacier Deep Archive at day 90. Configure an S3 Lifecycle rule to abort incomplete multipart uploads after 7 days."
      },
      {
        "key": "D",
        "text": "Transition all objects immediately upon ingestion to S3 Glacier Instant Retrieval. Configure S3 Object Lock in compliance mode for 7 years."
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
        "text": "Deploy custom DNS proxies on EC2 instances running dnsmasq. Point the DHCP option set of the VPC to the EC2 proxies and configure regex domain blocking in custom config files."
      },
      {
        "key": "B",
        "text": "Configure Route 53 Resolver DNS Firewall. Create a rule group using the AWS Managed Domain Lists (MalwareDomains and BotnetCommandandControlDomains) with the BLOCK action, and associate the rule group with the VPC."
      },
      {
        "key": "C",
        "text": "Configure AWS WAF with rate-based rules and associate it directly with the Route 53 Private Hosted Zone."
      },
      {
        "key": "D",
        "text": "Modify all Security Groups attached to EC2 instances to deny outbound UDP and TCP traffic on port 53."
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
        "text": "Write a custom Python script using the Boto3 SDK that loops through every account and creates the 35 rules using the PutConfigRule API. Schedule the script to run daily using AWS Lambda."
      },
      {
        "key": "B",
        "text": "Create an SCP with 35 deny statements and attach it to the root of the organization in AWS Organizations."
      },
      {
        "key": "C",
        "text": "Deploy AWS CloudTrail across all accounts and create 35 CloudWatch metric filters with alarms that send email notifications via Amazon SNS."
      },
      {
        "key": "D",
        "text": "Author an AWS Config Conformance Pack containing the 35 rules and remediation actions in a YAML template. Deploy the conformance pack as an Organization Conformance Pack from the AWS Organizations management account or delegated administrator account."
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
        "text": "Deploy the AWS Application Discovery Agent on all on-premises servers. In AWS Application Discovery Service, collect system performance data and network communication histories. Use AWS Migration Hub Network Diagram and Grouping tools to map dependencies and group servers into migration waves."
      },
      {
        "key": "B",
        "text": "Deploy the AWS Application Migration Service (MGN) replication agent on all servers and immediately initiate block-level replication to AWS."
      },
      {
        "key": "C",
        "text": "Use AWS Migration Evaluator with the collector appliance to estimate monthly cloud costs and generate high-level business cases."
      },
      {
        "key": "D",
        "text": "Export VMware vCenter inventory reports to Excel spreadsheets and manually cross-reference IP addresses using netstat outputs."
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
        "text": "Take a full SQL Server backup (.bak), upload it to Amazon S3, and use native RDS restore to launch an Amazon RDS for SQL Server instance. Then, convert the database using pg_dump."
      },
      {
        "key": "B",
        "text": "Use AWS Application Migration Service (MGN) to lift-and-shift the underlying Windows Server and SQL Server instance to Amazon EC2. Change the engine type in the EC2 console."
      },
      {
        "key": "C",
        "text": "Use the AWS Schema Conversion Tool (AWS SCT) to convert the SQL Server schema, triggers, and stored procedures to PostgreSQL syntax, applying the generated scripts to a new Aurora PostgreSQL cluster. Then, configure AWS Database Migration Service (AWS DMS) with a full load and continuous replication (CDC) task. After the target catches up, switch the application endpoint during the 15-minute cutover window."
      },
      {
        "key": "D",
        "text": "Export the database to flat CSV files. Upload the files to Amazon S3 and use the aws_s3 PostgreSQL extension to import the data into Aurora."
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
        "text": "Deploy an AWS DataSync agent as a virtual machine in the on-premises environment. Configure a DataSync task with the on-premises SMB file share as the source and the Amazon FSx for Windows File Server file system as the destination, enabling options to transfer permissions, ownership, and timestamps. Configure task bandwidth throttling to limit network consumption during business hours."
      },
      {
        "key": "B",
        "text": "Order five AWS Snowball Edge Storage Optimized devices. Copy the files to the Snowball devices using standard rsync scripts and ship them to AWS."
      },
      {
        "key": "C",
        "text": "Mount the on-premises SMB share on an EC2 instance in AWS over Direct Connect. Use Robocopy scripts with PowerShell to copy files continuously."
      },
      {
        "key": "D",
        "text": "Set up an AWS Storage Gateway File Gateway on-premises. Point applications to the Storage Gateway to automatically replicate files to Amazon S3, and then copy from S3 to FSx."
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
        "text": "Use AWS Application Migration Service (MGN) to replicate the Windows Server 2012 R2 VMs to Amazon EC2 instances running Windows Server 2022."
      },
      {
        "key": "B",
        "text": "Use AWS App2Container (A2C) to containerize the application as a Windows container and deploy it on Amazon EC2 instances managed by an Auto Scaling group."
      },
      {
        "key": "C",
        "text": "Lift and shift the VMs to AWS Elastic Beanstalk using the Windows Server platform."
      },
      {
        "key": "D",
        "text": "Use AWS Microservice Extractor for .NET and the AWS Toolkit to refactor and port the .NET Framework application code to .NET Core on Linux. Package the application as a Docker container, push the image to Amazon Elastic Container Registry (ECR), and run the service on Amazon Elastic Container Service (ECS) using the AWS Fargate launch type."
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
        "text": "Order multiple AWS Snowball Edge Storage Optimized devices. Copy the video files onto the Snowball devices locally using the S3 adapter. Ship the devices to AWS for direct data import into Amazon S3 Glacier Deep Archive."
      },
      {
        "key": "B",
        "text": "Compress the video files and upload them over the 1 Gbps Internet connection directly to an S3 bucket using AWS DataSync."
      },
      {
        "key": "C",
        "text": "Order an AWS Snowcone device. Transfer the files continuously in batches over the 4-week window."
      },
      {
        "key": "D",
        "text": "Provision an AWS Direct Connect 100 Gbps dedicated connection and stream the files using AWS Transfer Family."
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
        "text": "AWS Server Migration Service (SMS)"
      },
      {
        "key": "B",
        "text": "AWS Application Migration Service (AWS MGN)"
      },
      {
        "key": "C",
        "text": "AWS DataSync"
      },
      {
        "key": "D",
        "text": "AWS Backup with gateway appliances"
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
        "text": "AWS Migration Evaluator"
      },
      {
        "key": "B",
        "text": "AWS Application Discovery Service"
      },
      {
        "key": "C",
        "text": "AWS Pricing Calculator"
      },
      {
        "key": "D",
        "text": "AWS Cost Explorer"
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
        "text": "Export the entire database using Oracle Data Pump (expdp) into a dump file, upload it to S3, and import it into RDS using impdp."
      },
      {
        "key": "B",
        "text": "Create a cold backup of the database on tape, ship the tape to AWS, and restore it."
      },
      {
        "key": "C",
        "text": "Use Oracle Data Guard to configure the Amazon RDS for Oracle DB instance as a physical standby replica of the on-premises primary database over AWS Direct Connect. Keep the replica in sync continuously, and execute a Data Guard switchover during the 10-minute cutover window."
      },
      {
        "key": "D",
        "text": "Use AWS Database Migration Service (DMS) with full load only without configuring CDC."
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
        "text": "Amazon Elastic File System (EFS) with Max I/O performance mode."
      },
      {
        "key": "B",
        "text": "Amazon S3 bucket mounted on EC2 instances using the AWS Storage Gateway File Gateway."
      },
      {
        "key": "C",
        "text": "Amazon FSx for Windows File Server deployed in a Multi-AZ configuration joined to the corporate AWS Managed Microsoft AD domain."
      },
      {
        "key": "D",
        "text": "Amazon EBS General Purpose SSD (gp3) volume configured with Multi-Attach enabled across the EC2 instances."
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
        "text": "AWS Application Migration Service (MGN)"
      },
      {
        "key": "B",
        "text": "AWS Mainframe Modernization with the Automated Refactor pattern (AWS Blu Age)"
      },
      {
        "key": "C",
        "text": "AWS Serverless Application Model (AWS SAM)"
      },
      {
        "key": "D",
        "text": "AWS Snowmobile"
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
        "text": "In the Tools account, encrypt the S3 artifact bucket using the default aws/s3 key. In the Production accounts, attach an IAM policy to the ECS task execution role granting s3:GetObject."
      },
      {
        "key": "B",
        "text": "In the Tools account, encrypt the S3 artifact bucket using a customer managed key (CMK) in AWS KMS. In the KMS key policy, grant cross-account permissions to the Production accounts' deployment roles. In each Production account, create an IAM cross-account deployment role that trusts the CodePipeline service and has permissions to deploy to ECS and use the KMS CMK. Configure CodePipeline stages with cross-Region and cross-account actions referencing these roles."
      },
      {
        "key": "C",
        "text": "Configure S3 bucket policies in the Tools account with public read access restricted by an IP address condition. Configure CodePipeline to use public S3 URLs."
      },
      {
        "key": "D",
        "text": "Move the CodePipeline pipeline into the Production account and create a VPC peering connection back to the Tools account to pull code from CodeCommit."
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
        "text": "In the Dockerfile, add a curl command to download an open-source vulnerability list during docker build. If an exit code is non-zero, fail the build."
      },
      {
        "key": "B",
        "text": "Configure an EC2 cron job that runs weekly to scan images in Amazon ECR using a custom Python script."
      },
      {
        "key": "C",
        "text": "Deploy a third-party antivirus agent on every EKS worker node to scan containers after they are running in the cluster."
      },
      {
        "key": "D",
        "text": "Store container images in Amazon Elastic Container Registry (ECR) with enhanced scanning enabled using Amazon Inspector. In AWS CodePipeline, configure an AWS CodeBuild step following the image push that polls the ECR image vulnerability findings via the DescribeImageScanFindings API, and fails the build step if any findings exceed the defined severity threshold."
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
        "text": "Use EC2 Image Builder to create an image pipeline with build components and automated test components. Configure an infrastructure configuration and an Image Builder distribution settings resource that specifies the target 60 account IDs and target Regions. Schedule the pipeline to run monthly and use an Amazon EventBridge rule to notify teams when new AMIs are available."
      },
      {
        "key": "B",
        "text": "Write a custom Packer template on an EC2 instance that builds the AMI. Execute a Python script that iterates through all accounts and calls the ModifyImageAttribute API to share the AMI."
      },
      {
        "key": "C",
        "text": "Use AWS Systems Manager State Manager to continuously run patch commands on running production instances and take snapshots every Sunday."
      },
      {
        "key": "D",
        "text": "Create an AWS CloudFormation template that launches an EC2 instance in each account, runs user data scripts to patch the OS, and triggers an AWS Lambda function to create an AMI locally in each account."
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
        "text": "Configure the Auto Scaling group health check type to EC2 only. Have developers manually connect via SSH to dump memory when alerts fire."
      },
      {
        "key": "B",
        "text": "Write a cron job inside the instance that checks the local port. If the port fails, the script runs shutdown -h now."
      },
      {
        "key": "C",
        "text": "Configure the Auto Scaling group to use ELB health checks. In Amazon EventBridge, create a rule that captures the EC2 Auto Scaling Instance Terminate Lifecycle Hook event. Trigger an AWS Systems Manager Automation document that runs a script on the instance via Run Command to capture the heap dump and upload it to an S3 bucket before completing the lifecycle action to terminate the instance."
      },
      {
        "key": "D",
        "text": "Increase the health check grace period on the Auto Scaling group to 3,600 seconds and disable instance termination policies."
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
        "text": "Create two separate Lambda functions (V1 and V2) in the SAM template. Use an Application Load Balancer with weighted target groups to manually shift weights using a custom Python script."
      },
      {
        "key": "B",
        "text": "In the AWS SAM template, configure the DeploymentPreference of the Lambda function with the Type set to Linear10PercentEvery1Minute or Canary10Percent10Minutes. Specify Amazon CloudWatch Alarms monitoring function errors and latency under the Alarms property to trigger an automated rollback via AWS CodeDeploy."
      },
      {
        "key": "C",
        "text": "In the API Gateway console, manually create a new stage named Beta and ask customer support to test the Beta URL for 10 minutes before updating the Production stage."
      },
      {
        "key": "D",
        "text": "Deploy a second API Gateway endpoint. Use Route 53 weighted routing to split traffic between the two API Gateway domains."
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
        "text": "AWS Systems Manager State Manager"
      },
      {
        "key": "B",
        "text": "Amazon Inspector"
      },
      {
        "key": "C",
        "text": "AWS Trusted Advisor"
      },
      {
        "key": "D",
        "text": "AWS CloudFormation Guard (cfn-guard)"
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
        "text": "Store the secret in AWS Secrets Manager in us-east-1 and configure primary secret replication to us-west-2. Enable automatic rotation in the primary Region using a pre-configured AWS Lambda function. Applications in both Regions retrieve the secret from their local regional Secrets Manager endpoint."
      },
      {
        "key": "B",
        "text": "Store the secret in an Amazon DynamoDB Global Table with client-side encryption. Use an EventBridge cron rule to trigger an EC2 instance that updates the password."
      },
      {
        "key": "C",
        "text": "Store the secret in AWS Systems Manager Parameter Store in us-east-1. Write a custom Lambda function triggered on a schedule to copy parameters to us-west-2."
      },
      {
        "key": "D",
        "text": "Save the database credentials in a configuration file within an encrypted S3 bucket in us-east-1 and replicate the bucket to us-west-2 using S3 Cross-Region Replication."
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
        "text": "Store configuration settings in an Amazon RDS table. Have application servers poll the database every second for updates."
      },
      {
        "key": "B",
        "text": "Create a new application build with hardcoded logic for each percentage change and deploy via AWS CodeDeploy using an all-at-once strategy."
      },
      {
        "key": "C",
        "text": "Use AWS AppConfig to manage the feature flag configuration. Define an AppConfig deployment strategy that gradually rolls out the configuration changes, and configure an Amazon CloudWatch alarm as an automatic rollback monitor. Use the AppConfig Agent or SDK in the application to retrieve configuration updates dynamically."
      },
      {
        "key": "D",
        "text": "Use AWS Systems Manager Parameter Store and write a custom polling script on each EC2 instance that restarts the web server daemon whenever a change in parameter version is detected."
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
        "text": "Configure an Amazon EventBridge rule that listens for AWS Health events regarding compromised credentials (AWS_RISK_CREDENTIALS_EXPOSED). Target an AWS Lambda function that invokes the UpdateAccessKey API to deactivate the exposed key and publishes an alert to an Amazon SNS topic."
      },
      {
        "key": "B",
        "text": "Run a daily AWS Config rule check for IAM users with keys older than 90 days and trigger an SSM Automation runbook to delete the keys."
      },
      {
        "key": "C",
        "text": "Use Amazon Inspector to scan all developer laptops every 24 hours."
      },
      {
        "key": "D",
        "text": "In AWS IAM, configure an account-wide password policy that forces key rotation every 24 hours."
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
        "text": "AWS CloudFormation StackSets"
      },
      {
        "key": "B",
        "text": "AWS Systems Manager Patch Manager"
      },
      {
        "key": "C",
        "text": "Amazon CloudWatch Synthetics"
      },
      {
        "key": "D",
        "text": "AWS Fault Injection Simulator (AWS FIS)"
      }
    ],
    "correct": [
      "D"
    ],
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** AWS Fault Injection Simulator (AWS FIS) es el servicio administrado de ingeniería de caos de AWS. Permite diseñar y ejecutar experimentos controlados sobre recursos reales (inyectar latencia de red, drenar tráfico en AZs o regiones, simular estrés de CPU y desconexiones de bases de datos). Incluye de forma nativa 'Stop Conditions' que abortan el experimento inmediatamente si las alarmas de CloudWatch superan umbrales de seguridad críticos.\n\n**Por qué las otras no:**\n- **A ✗** CloudFormation StackSets gestiona despliegues de plantillas de infraestructura; no inyecta fallos de estrés ni gestiona condiciones de parada de caos.\n- **B ✗** SSM Patch Manager instala parches del sistema operativo; no simula caídas regionales ni estrés de CPU.\n- **C ✗** CloudWatch Synthetics monitoriza endpoints enviando peticiones periódicas; es una herramienta de observación de telemetría, no un generador de inyección de fallos controlado.\n\n🔑 **Concepto clave:** Para realizar pruebas de caos controladas, simulación de fallos en producción y validación de resiliencia con stop conditions de seguridad: la herramienta oficial de AWS es AWS Fault Injection Simulator (AWS FIS)."
  }
];
