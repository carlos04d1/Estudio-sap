// Banco de preguntas SAP-C02 v1
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** El **inbound endpoint** crea ENI en la VPC a las que el DNS local reenvía las consultas de `app.internal.example.com`. El **outbound endpoint** con una **regla de reenvío** envía las consultas de `corp.example.local` desde la VPC a los DNS locales. Ambos son administrados por AWS (cero servidores).\n\n**Por qué las otras no:**\n- **A ✗** Funciona, pero obliga a parchear, escalar y dar alta disponibilidad a servidores DNS propios: exactamente lo que se quiere evitar.\n- **B ✗** Una"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** El *interface endpoint* de S3 es una ENI con **IP privada** dentro de la VPC y **sí es accesible desde on-premises** por Direct Connect o VPN. Es totalmente administrado.\n\n**Por qué las otras no:**\n- **B ✗** Los *gateway endpoints* operan solo mediante **tablas de rutas de la VPC**: no son alcan"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **Security Hub** agrega halla"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Aurora Global Database replica con retraso típico **< 1 segundo** (RPO de segundos) y permite promover el secundario en **menos de un minuto**. Una flota reducida ya en ejecución escala en minutos (RTO ≈ minutos) con un costo mucho menor que el activo-activo.\n\n**Por qué las otras no:**\n- **A ✗** RPO de ~1 hora y RTO de horas: incumple ambos.\n- **B ✗** Los snapshots cada 15 minutos dan RPO de 15 min (> pocos segundos) y lan"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** **Elastic Disaster Recovery** replica de forma continua a **nivel de bloque** hacia un área de preparación (*staging*) con instancias pequeñas y volúmenes EBS económicos. Solo se lan"
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
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Por defecto, Auto Scaling solo usa las comprobaciones de **EC2** (hardware/hipervisor). Con el tipo **ELB**, también reempla"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Las **SCP** son guardarraíles **preventivos** que limitan el máximo de permisos de las cuentas miembro, incluso para sus administradores. `aws:RequestedRegion` con excepciones para servicios globales (IAM, Organi"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Un **trail de la organi"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Hacen falta **dos pie"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Con permisos **administrados por el servicio**, StackSets crea los roles necesarios automáticamente mediante Organi"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** En a"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** La política *failover* envía el tráfico al **primario** mientras esté saludable y pasa **automáticamente** al **secundario** si la comprobación de estado falla: es el patrón activo-pasivo.\n\n**Por qué las otras no:**\n- **A ✗** La latencia reparte el tráfico a ambas Regiones (activo-activo), no solo en fallo.\n- **B ✗** Requiere intervención manual: incumple el requisito de automati"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** AWS Backup soporta EBS, RDS y EFS, se gobierna centralmente con **backup policies de Organi"
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
    "explanation": "**Respuestas correctas: A y D**\n\n**Por qué A y D:**\n- **A:** CloudFront absorbe y distribuye el tráfico en el borde; **WAF** con reglas administradas bloquea SQLi y las **reglas basadas en tasa** limitan el *scraping* por IP, sin listas manuales.\n- **D:** **Shield Advanced** añade protección DDoS L3/L4/L7, acceso al **equipo de respuesta (SRT)** y **protección de costos** por picos asociados a un ataque.\n\n**Por qué las otras no:**\n- **B ✗** Las ACL de red tienen pocas reglas y no escalan a miles de IP cambiantes.\n- **C ✗** GuardDuty **detecta** amena"
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
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** Las **patch policies** con Quick Setup definen líneas base, programaciones y ámbito (OU/Regiones/etiquetas) para toda la organi"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La geolocali"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Config **evalúa continuamente** la configuración, marca los recursos no conformes y su **remediación automática** invoca documentos de **Systems Manager Automation**. Todo queda registrado (historial de Config, ejecuciones de Automation). En paralelo conviene activar **S3 Block Public Access** a nivel de cuenta/organi"
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
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** SAM integra **CodeDeploy** con alias de Lambda: el tráfico se despla"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** La **observabilidad entre cuentas** (OAM) permite que una cuenta de monitoreo **consulte** métricas, registros y tra"
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
    "explanation": "**Respuestas correctas: A y C**\n\n**Por qué A y C:**\n- **A:** El anali"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **Macie** usa ML y patrones para **clasificar datos sensibles** en S3, se administra de forma centrali"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Session Manager no necesita **ningún puerto de entrada**; la autenticación y autori"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** Una carga **fuertemente acoplada** necesita latencia mínima y ancho de banda máximo entre nodos: el grupo de **clúster** agrupa instancias físicamente cercanas en una AZ y **EFA** ofrece comunicación con *OS-bypass* para MPI.\n\n**Por qué las otras no:**\n- **B ✗** *Spread* separa instancias en hardware distinto (alta disponibilidad de pocas instancias críticas), lo contrario a lo que se necesita.\n- **C ✗** *Partition* aísla fallos entre grupos de instancias (Hadoop/Cassandra), no optimi"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Service Quotas expone **métricas de uso** en CloudWatch para crear **alarmas proactivas** y permite **plantillas de solicitud** que se aplican automáticamente a las cuentas nuevas de la organi"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **Compute Optimi"
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
    "explanation": "**Respuesta correcta: A**\n\n**Por qué A es la mejor:** **AWS Budgets** soporta alertas sobre costos **reales y pronosticados** y **acciones de presupuesto** que pueden aplicar una **política IAM o SCP** (o detener instancias EC2/RDS) automáticamente al superar un umbral.\n\n**Por qué las otras no:**\n- **B ✗** Solo notifica; no aplica restricciones ni usa pronóstico.\n- **C ✗** Manual y los Savings Plans no limitan gastos de *sandbox*.\n- **D ✗** Informativo y diferido: no actúa.\n\n🔑 **Concepto clave:** Control de gasto automati"
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
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** El **agente de Discovery** recopila configuración, rendimiento, **conexiones de red y procesos** de cada servidor; Migration Hub muestra las **dependencias** para agrupar aplicaciones y planificar oleadas.\n\n**Por qué las otras no:**\n- **A ✗** Manual, sin utili"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** Los **Dedicated Hosts** exponen **sockets, núcleos y afinidad de host**, requisitos típicos de licencias BYOL. **License Manager** automati"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** **MGN** instala un agente que **replica continuamente** los discos hacia un área de preparación, permite **lan"
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
    "explanation": "**Respuestas correctas: C y D**\n\n**Por qué C y D:** A ~3 TB/día, 600 TB tardarían **~200 días**: la carga masiva debe ir en dispositivos **Snowball Edge**. Los cambios posteriores se sincroni"
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
    "explanation": "**Respuesta correcta: B**\n\n**Por qué B es la mejor:** Una arquitectura **sin estado** permite escalar hori"
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
    "explanation": "**Respuesta correcta: D**\n\n**Por qué D es la mejor:** *Strangler fig* reempla"
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
    "explanation": "**Respuesta correcta: C**\n\n**Por qué C es la mejor:** **Guardrails** aplica controles **independientes del modelo**, tanto en la entrada del usuario como en la respuesta: filtros de contenido dañino, temas denegados, filtros de palabras y **PII (bloquear/enmascarar)**. Es una política gestionada y reutili"
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
  }
];
