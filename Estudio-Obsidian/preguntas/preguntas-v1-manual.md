---
title: "Preguntas de práctica SAP-C02 — v1 (manual)"
aliases:
  - "preguntas-v1-manual"
  - "Banco de preguntas v1"
tags:
  - certificacion/aws
  - sap-c02
  - preguntas
  - practica
status: en-estudio
fuente: "Preguntas originales redactadas a mano a partir de [[Guia AWS]], con el estilo del examen SAP-C02"
---

# 📝 Preguntas de práctica SAP-C02 — v1 (manual)

> [!info] Cómo usar este banco
> - **50 preguntas** originales (no son preguntas reales del examen) con escenario, opciones, respuesta y explicación de **por qué la correcta es la mejor** y **por qué cada distractor falla**.
> - Cada respuesta está en un bloque **plegado**: haz clic en `Respuesta y explicación` solo después de elegir.
> - Las preguntas marcadas como **(Elija DOS)** son de respuesta múltiple: debes acertar **todas** las correctas.
> - En el examen real tienes ~3 min por pregunta: lee primero la **última frase** (qué se pide: *menor sobrecarga operativa*, *más rentable*, *mayor disponibilidad*…) y luego los requisitos.
> - Cada pregunta enlaza con su nota de estudio de la tarea correspondiente.

## 📊 Distribución

| Dominio | Peso oficial | Preguntas | Rango |
| --- | --- | --- | --- |
| D1 — Complejidad organizacional | 26 % | 13 | 1–13 |
| D2 — Nuevas soluciones | 29 % | 14 | 14–27 |
| D3 — Mejora continua | 25 % | 11 | 28–38 |
| D4 — Migración y modernización | 20 % | 10 | 39–48 |
| Temas emergentes (IA generativa) | sin puntaje | 2 | 49–50 |

## 🎯 Registro de intentos

| Intento | Fecha | Aciertos /50 | % | Dominios flojos |
| --- | --- | --- | --- | --- |
| 1 |  |  |  |  |
| 2 |  |  |  |  |

---

# Dominio 1 — Complejidad organizacional

### Pregunta 1
*Tarea: [[1.1 Diseñar estrategias de conectividad de redes]]*

Una empresa tiene 60 VPC repartidas en 25 cuentas de AWS (todas en AWS Organizations) en la Región us-east-1 y un centro de datos corporativo conectado a AWS con dos conexiones de AWS Direct Connect. Requisitos:

1. Las VPC de **producción** y de **desarrollo** no deben poder comunicarse entre sí.
2. Ambos tipos de VPC deben poder comunicarse con el centro de datos.
3. No se desea mantener una malla de conexiones entre VPC.
4. Se requiere la **menor sobrecarga operativa**.

¿Qué solución cumple los requisitos?

- **A.** Crear peering de VPC en malla completa entre todas las VPC y asociar una interfaz virtual privada (VIF privada) de Direct Connect a cada VPC.
- **B.** Crear un AWS Transit Gateway en una cuenta de red, compartirlo con las demás cuentas mediante AWS RAM, usar tablas de rutas separadas (producción y desarrollo) y conectar el centro de datos con un Direct Connect gateway y una VIF de tránsito.
- **C.** Crear una conexión Site-to-Site VPN hacia un virtual private gateway en cada VPC y usar peering de VPC para el tráfico entre VPC.
- **D.** Consolidar todas las cargas en una sola VPC compartida con VPC sharing y separar producción de desarrollo solo con grupos de seguridad.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Transit Gateway es un enrutador hub-and-spoke **transitivo** que escala a miles de VPC. Se comparte entre cuentas con **AWS RAM**. La segmentación se logra con **tablas de rutas de TGW separadas**: los attachments de producción se asocian a una tabla y los de desarrollo a otra, y ambas propagan solo la ruta del attachment de Direct Connect, no las de la otra. El **Direct Connect gateway + VIF de tránsito** conecta las dos conexiones DX al TGW con una sola configuración.
>
> **Por qué las otras no:**
> - **A ✗** 60 VPC en malla requieren N(N−1)/2 = **1 770 peerings**, inmanejable. Además el peering **no es transitivo** y una VIF privada por VPC no escala.
> - **C ✗** 60 VPN son costosas y difíciles de operar, ignoran la inversión en Direct Connect y el peering sigue siendo una malla no transitiva.
> - **D ✗** Consolidar 60 VPC en una es un rediseño (no una estrategia de conectividad) y los grupos de seguridad no son un límite de aislamiento adecuado entre entornos.
>
> 🔑 **Concepto clave:** TGW + RAM + tablas de rutas múltiples = segmentación y conectividad transitiva a escala.

---

### Pregunta 2
*Tarea: [[1.1 Diseñar estrategias de conectividad de redes]]*

Una VPC está conectada al centro de datos mediante Site-to-Site VPN. Los servidores locales deben resolver los nombres de una **zona hospedada privada** de Amazon Route 53 (`app.internal.example.com`) y las instancias EC2 deben resolver nombres de la zona `corp.example.local`, que se aloja en los servidores DNS locales. La empresa no quiere administrar servidores DNS en AWS.

¿Qué solución cumple los requisitos con la **menor sobrecarga operativa**?

- **A.** Desplegar servidores BIND en EC2 en dos zonas de disponibilidad, configurados como reenviadores condicionales en ambos sentidos.
- **B.** Asociar la zona hospedada privada con los servidores DNS locales y crear una zona hospedada pública de Route 53 para `corp.example.local`.
- **C.** Crear un *inbound endpoint* de Route 53 Resolver para las consultas desde el centro de datos hacia AWS y un *outbound endpoint* con una regla de reenvío para `corp.example.local` hacia los DNS locales.
- **D.** Crear solo un *outbound endpoint* de Route 53 Resolver con reglas de reenvío para ambos dominios.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** El **inbound endpoint** crea ENI en la VPC a las que el DNS local reenvía las consultas de `app.internal.example.com`. El **outbound endpoint** con una **regla de reenvío** envía las consultas de `corp.example.local` desde la VPC a los DNS locales. Ambos son administrados por AWS (cero servidores).
>
> **Por qué las otras no:**
> - **A ✗** Funciona, pero obliga a parchear, escalar y dar alta disponibilidad a servidores DNS propios: exactamente lo que se quiere evitar.
> - **B ✗** Una zona hospedada privada se asocia a **VPC**, no a servidores locales. Una zona pública para un nombre interno expone información y no reenvía nada a los DNS locales.
> - **D ✗** Un outbound endpoint solo permite que la VPC **salga** a resolver nombres externos; no recibe consultas del centro de datos.
>
> 🔑 **Concepto clave:** *Inbound* = on-prem → AWS. *Outbound* = AWS → on-prem. Las reglas de reenvío se pueden compartir entre cuentas con RAM.

---

### Pregunta 3
*Tarea: [[1.1 Diseñar estrategias de conectividad de redes]]*

Una empresa financiera transfiere datos desde su centro de datos a Amazon S3 a través de una conexión Direct Connect con VIF privada. Una política interna exige que el tráfico hacia S3 use **direcciones IP privadas de una VPC** y no direcciones IP públicas de S3. La solución debe tener la **menor sobrecarga operativa**.

¿Qué debe hacer el arquitecto?

- **A.** Crear un *interface endpoint* (AWS PrivateLink) para S3 en la VPC y hacer que las aplicaciones locales usen los nombres DNS específicos del endpoint a través de la VIF privada.
- **B.** Crear un *gateway endpoint* para S3 y propagar la ruta de la lista de prefijos hacia la red local.
- **C.** Crear un NAT gateway en la VPC y enrutar el tráfico local hacia S3 a través de él.
- **D.** Crear un *gateway endpoint* para S3 y desplegar una flota de proxies en EC2 con Auto Scaling para que los clientes locales los usen.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** El *interface endpoint* de S3 es una ENI con **IP privada** dentro de la VPC y **sí es accesible desde on-premises** por Direct Connect o VPN. Es totalmente administrado.
>
> **Por qué las otras no:**
> - **B ✗** Los *gateway endpoints* operan solo mediante **tablas de rutas de la VPC**: no son alcanzables desde redes locales.
> - **C ✗** Un NAT gateway da salida a Internet desde subredes privadas; no sirve de destino para tráfico entrante desde on-premises y usaría IP públicas de S3.
> - **D ✗** Cumple técnicamente, pero agrega una flota de proxies que hay que operar y parchear. El interface endpoint elimina esa sobrecarga.
>
> 🔑 **Concepto clave:** Gateway endpoint (S3/DynamoDB, gratis, solo desde la VPC) vs. Interface endpoint (PrivateLink, con costo, accesible desde on-premises).

---

### Pregunta 4
*Tarea: [[1.2 Prescribir controles de seguridad]]*

Una empresa contrata a un proveedor SaaS de monitoreo que opera desde su propia cuenta de AWS (`111122223333`). El proveedor necesita **leer métricas de CloudWatch** en la cuenta de la empresa. Requisitos: no usar credenciales de larga duración, aplicar mínimo privilegio y **mitigar el problema del "suplente confuso" (confused deputy)**.

¿Qué solución cumple los requisitos?

- **A.** Crear un usuario IAM con permisos de solo lectura de CloudWatch y entregar las claves de acceso al proveedor, rotándolas cada 90 días.
- **B.** Crear un rol IAM con la política administrada `CloudWatchReadOnlyAccess` y una política de confianza que permita `sts:AssumeRole` a la cuenta `111122223333`, sin condiciones adicionales.
- **C.** Crear un rol IAM con `AdministratorAccess` para evitar fallos de permisos y confiar en la cuenta del proveedor.
- **D.** Crear un rol IAM con permisos mínimos de lectura de métricas y una política de confianza que permita `sts:AssumeRole` a la cuenta del proveedor con la condición `sts:ExternalId` única para esta empresa.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** El acceso de terceros se hace con un **rol entre cuentas** (credenciales temporales de STS), con permisos mínimos y un **ExternalId** secreto y único por cliente. Si otro cliente del proveedor intentara engañarlo para asumir tu rol, no conocería el ExternalId.
>
> **Por qué las otras no:**
> - **A ✗** Claves de larga duración compartidas con un tercero: lo opuesto a la buena práctica.
> - **B ✗** Casi correcta, pero sin `ExternalId` queda expuesta al *confused deputy*. Además, la política administrada puede dar más de lo necesario.
> - **C ✗** Viola el mínimo privilegio.
>
> 🔑 **Concepto clave:** Terceros → rol entre cuentas + `ExternalId`. Nunca usuarios IAM con claves.

---

### Pregunta 5
*Tarea: [[1.2 Prescribir controles de seguridad]]*

Una organización tiene 120 cuentas en AWS Organizations que operan en 4 Regiones. El equipo de seguridad necesita una **vista única** de los hallazgos de seguridad (Amazon GuardDuty, Amazon Inspector, Amazon Macie y estándares de seguridad), que las **cuentas nuevas se incorporen automáticamente** y que los hallazgos críticos generen una notificación. Se busca el **menor esfuerzo operativo**.

¿Qué solución debe implementarse?

- **A.** Habilitar AWS Security Hub e invitar manualmente cada cuenta y Región como miembro; usar un script para las cuentas nuevas.
- **B.** Designar una cuenta de seguridad como administrador delegado de Security Hub y GuardDuty, activar la habilitación automática para cuentas nuevas, configurar la agregación entre Regiones en una Región de agregación y crear una regla de EventBridge para los hallazgos críticos que publique en Amazon SNS.
- **C.** Habilitar AWS Config con un agregador de organización y usar sus reglas no conformes como fuente única de hallazgos de seguridad.
- **D.** Habilitar un trail de AWS CloudTrail de la organización y consultar los eventos con Amazon Athena para detectar actividad sospechosa.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** **Security Hub** agrega hallazgos de GuardDuty, Inspector, Macie y estándares (CIS, FSBP). Con **administrador delegado** y **auto-enable** a nivel de organización, las cuentas nuevas se suman solas; la **agregación entre Regiones** da una vista única y **EventBridge → SNS** cubre las notificaciones. Se usa una cuenta de seguridad distinta de la de administración de la organización.
>
> **Por qué las otras no:**
> - **A ✗** Invitaciones manuales por cuenta y Región: alta sobrecarga y propenso a errores.
> - **C ✗** AWS Config evalúa el **cumplimiento de configuración** de recursos; no consolida hallazgos de amenazas de GuardDuty, Inspector o Macie.
> - **D ✗** CloudTrail son registros, no hallazgos: habría que construir la detección y la consolidación.
>
> 🔑 **Concepto clave:** Security Hub + admin delegado + auto-enable + agregación entre Regiones.

---

### Pregunta 6 (Elija DOS)
*Tarea: [[1.2 Prescribir controles de seguridad]]*

Un bucket de Amazon S3 de la **Cuenta A** está cifrado con SSE-KMS mediante una **clave administrada por el cliente** de la Cuenta A. La política del bucket ya permite `s3:GetObject` a un rol IAM de la **Cuenta B**, pero el rol recibe `AccessDenied` al descargar objetos.

¿Qué **DOS** acciones son necesarias para solucionar el problema?

- **A.** Agregar a la política de la clave de KMS de la Cuenta A una declaración que permita `kms:Decrypt` al rol (o a la cuenta) de la Cuenta B.
- **B.** Cambiar el cifrado del bucket a la clave administrada por AWS `aws/s3` para que otras cuentas puedan descifrar.
- **C.** Adjuntar al rol de la Cuenta B una política IAM que permita `kms:Decrypt` sobre el ARN de la clave de la Cuenta A.
- **D.** Exportar el material de la clave de KMS de la Cuenta A e importarlo en la Cuenta B.
- **E.** Crear en la Cuenta B un alias que apunte a la clave de la Cuenta A.

> [!success]- Respuesta y explicación
> **Respuestas correctas: A y C**
>
> **Por qué A y C:** En el acceso **entre cuentas** a una clave KMS se necesitan **ambos lados**: la **política de la clave** (Cuenta A) debe permitir a la entidad externa y la **política IAM** (Cuenta B) debe permitir a su rol usar la clave.
>
> **Por qué las otras no:**
> - **B ✗** La política de una clave administrada por AWS **no se puede editar**, por lo que no permite acceso entre cuentas.
> - **D ✗** Las claves de KMS **no se pueden exportar**; el material nunca sale de KMS.
> - **E ✗** Los alias son locales a cada cuenta y Región y **no otorgan permisos**; además un alias de la Cuenta B no puede apuntar a una clave de otra cuenta.
>
> 🔑 **Concepto clave:** Cross-account KMS = key policy + IAM policy.

---

### Pregunta 7
*Tarea: [[1.3 Diseñar arquitecturas fiables y resistentes]]*

Una aplicación crítica se ejecuta en us-east-1 con un Application Load Balancer, instancias EC2 en un grupo de Auto Scaling y una base de datos Amazon Aurora MySQL. Los requisitos de recuperación ante desastres son **RTO ≤ 10 minutos** y **RPO de pocos segundos**. La empresa **no necesita** una arquitectura activa-activa y quiere **controlar costos**.

¿Qué estrategia de DR debe diseñar el arquitecto?

- **A.** Copia de seguridad y restauración: AWS Backup con copias entre Regiones cada hora.
- **B.** Luz piloto: copiar snapshots de Aurora entre Regiones cada 15 minutos y conservar AMIs; lanzar toda la pila cuando ocurra el desastre.
- **C.** Espera activa (*warm standby*): Aurora Global Database con clúster secundario en us-west-2, ALB y Auto Scaling con capacidad mínima reducida en us-west-2 y Route 53 con conmutación por error; ante un desastre, promover el clúster secundario y escalar la flota.
- **D.** Multi-sitio activo-activo con 100 % de capacidad en ambas Regiones, escrituras simultáneas en las dos y Route 53 ponderado.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** Aurora Global Database replica con retraso típico **< 1 segundo** (RPO de segundos) y permite promover el secundario en **menos de un minuto**. Una flota reducida ya en ejecución escala en minutos (RTO ≈ minutos) con un costo mucho menor que el activo-activo.
>
> **Por qué las otras no:**
> - **A ✗** RPO de ~1 hora y RTO de horas: incumple ambos.
> - **B ✗** Los snapshots cada 15 minutos dan RPO de 15 min (> pocos segundos) y lanzar toda la pila supera el RTO.
> - **D ✗** Cumple los tiempos pero cuesta el doble y exige escrituras multi-Región (Aurora Global Database tiene **una sola Región de escritura**), complejidad innecesaria cuando no se exige activo-activo.
>
> 🔑 **Concepto clave:** Backup/restore (horas) → Luz piloto (decenas de min) → Espera activa (minutos) → Multi-sitio (≈ 0). Elige el **más barato que cumpla** RTO/RPO.

---

### Pregunta 8
*Tarea: [[1.3 Diseñar arquitecturas fiables y resistentes]]*

Una empresa tiene ~80 servidores locales (Windows y Linux en VMware). Quiere un plan de DR en AWS con **RPO de segundos** y **RTO de minutos**, **sin pagar por un entorno de DR completo en ejecución** y con la posibilidad de **realizar simulacros de DR** sin afectar la producción.

¿Qué servicio debe usar?

- **A.** AWS Elastic Disaster Recovery.
- **B.** AWS Backup con Backup gateway para VMware con copias diarias.
- **C.** VM Import/Export con una imagen (AMI) cada noche.
- **D.** AWS Database Migration Service (AWS DMS) con captura de cambios (CDC).

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** **Elastic Disaster Recovery** replica de forma continua a **nivel de bloque** hacia un área de preparación (*staging*) con instancias pequeñas y volúmenes EBS económicos. Solo se lanzan las instancias de recuperación completas durante un simulacro o un desastre → RPO de segundos, RTO de minutos y bajo costo.
>
> **Por qué las otras no:**
> - **B ✗** Backups diarios: RPO de horas.
> - **C ✗** Proceso manual y puntual: RPO de ~24 h y RTO alto.
> - **D ✗** DMS replica **bases de datos**, no servidores completos.
>
> 🔑 **Concepto clave:** Servidores on-prem/otra nube → AWS con RPO de segundos = AWS Elastic Disaster Recovery.

---

### Pregunta 9
*Tarea: [[1.3 Diseñar arquitecturas fiables y resistentes]]*

Una aplicación web se ejecuta en un grupo de Auto Scaling detrás de un ALB en tres zonas de disponibilidad. En varios incidentes, el proceso de la aplicación se bloquea, pero las instancias siguen en estado *running* y con las comprobaciones de estado de EC2 aprobadas. El ALB marca los destinos como *unhealthy* y deja de enviarles tráfico, pero el grupo de Auto Scaling **no los reemplaza**, y la capacidad se reduce.

¿Qué solución **recupera automáticamente** la capacidad con el menor esfuerzo?

- **A.** Crear una alarma de CloudWatch sobre `StatusCheckFailed_System` con acción de recuperación de EC2.
- **B.** Aumentar el tamaño mínimo del grupo de Auto Scaling para absorber las instancias no saludables.
- **C.** Instalar un cron en cada instancia que reinicie la aplicación cuando deje de responder.
- **D.** Cambiar el tipo de comprobación de estado del grupo de Auto Scaling de EC2 a **ELB** y configurar un período de gracia adecuado.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** Por defecto, Auto Scaling solo usa las comprobaciones de **EC2** (hardware/hipervisor). Con el tipo **ELB**, también reemplaza instancias que el balanceador considera *unhealthy*, es decir, fallos de aplicación. El período de gracia evita reemplazos prematuros durante el arranque.
>
> **Por qué las otras no:**
> - **A ✗** `StatusCheckFailed_System` detecta problemas del **host subyacente**, no de la aplicación.
> - **B ✗** Oculta el problema pagando por instancias zombis; no recupera nada.
> - **C ✗** Operación manual por instancia y no reemplaza instancias dañadas.
>
> 🔑 **Concepto clave:** ASG + ELB health checks = recuperación automática ante fallos a nivel de aplicación.

---

### Pregunta 10
*Tarea: [[1.4 Diseñar un entorno de AWS de varias cuentas]]*

Una empresa tiene 40 cuentas organizadas en unidades organizativas (OU). Por requisitos de **residencia de datos**, solo se pueden usar las Regiones eu-west-1 y eu-central-1, y **nadie puede deshabilitar AWS CloudTrail ni AWS Config**. Los administradores de cada cuenta tienen `AdministratorAccess`.

¿Qué solución **impide** el incumplimiento?

- **A.** Crear políticas IAM de denegación en cada cuenta mediante CloudFormation StackSets.
- **B.** Adjuntar políticas de control de servicios (SCP) a la raíz o a las OU de cargas de trabajo que denieguen el uso de otras Regiones con la condición `aws:RequestedRegion` (excluyendo servicios globales) y denieguen detener o eliminar CloudTrail y Config.
- **C.** Crear reglas de AWS Config que detecten recursos fuera de las Regiones permitidas y un Lambda que los elimine.
- **D.** Adjuntar las SCP únicamente a la cuenta de administración de la organización.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Las **SCP** son guardarraíles **preventivos** que limitan el máximo de permisos de las cuentas miembro, incluso para sus administradores. `aws:RequestedRegion` con excepciones para servicios globales (IAM, Organizations, Route 53, CloudFront…) implementa la residencia de datos; denegar `cloudtrail:StopLogging`, `config:StopConfigurationRecorder`, etc. protege la auditoría. AWS Control Tower ofrece controles equivalentes.
>
> **Por qué las otras no:**
> - **A ✗** Un administrador de la cuenta puede **editar o eliminar** esas políticas IAM.
> - **C ✗** Es **detectivo/reactivo**: el recurso existe (y los datos salen) antes de eliminarse; además los admins podrían desactivar Config.
> - **D ✗** Las SCP **no afectan a la cuenta de administración** y adjuntarlas solo allí no restringe a las cuentas miembro.
>
> 🔑 **Concepto clave:** Preventivo = SCP. Detectivo = AWS Config. Las SCP no se aplican a la cuenta de administración.

---

### Pregunta 11
*Tarea: [[1.4 Diseñar un entorno de AWS de varias cuentas]]*

Una auditoría exige un registro **centralizado, con integridad verificable y de acceso restringido** de toda la actividad de API de las 60 cuentas actuales y **futuras** de una organización. Solo el equipo de auditoría debe poder acceder a los registros.

¿Qué solución cumple con el **menor esfuerzo**?

- **A.** Crear un trail de la organización de CloudTrail que entregue a un bucket de S3 en una cuenta dedicada de archivo de registros, con cifrado SSE-KMS, validación de integridad de archivos de registro y política de bucket restrictiva (opcionalmente S3 Object Lock).
- **B.** Crear un trail en cada cuenta mediante un script y entregar los registros a un bucket en cada cuenta.
- **C.** Usar el historial de eventos de CloudTrail de cada cuenta y exportarlo manualmente cada trimestre.
- **D.** Enviar los eventos de CloudTrail a CloudWatch Logs en cada cuenta con retención de 7 años.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** Un **trail de la organización** se aplica automáticamente a todas las cuentas, **incluidas las futuras**, y los miembros no pueden modificarlo ni eliminarlo. Entregar a un bucket en una **cuenta de Log Archive** separa funciones; la **validación de integridad** (digests firmados) demuestra que los registros no fueron alterados.
>
> **Por qué las otras no:**
> - **B ✗** Las cuentas nuevas requieren ejecutar el script y los administradores locales pueden borrar su trail o su bucket.
> - **C ✗** El historial de eventos solo conserva 90 días y la exportación manual no es auditable ni centralizada.
> - **D ✗** Siguen siendo registros locales, modificables por los administradores de cada cuenta y sin centralización.
>
> 🔑 **Concepto clave:** Trail de organización + cuenta de Log Archive + validación de integridad.

---

### Pregunta 12
*Tarea: [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]*

Finanzas quiere asignar los costos de 50 cuentas por unidad de negocio mediante la clave de etiqueta `BusinessUnit` en AWS Cost Explorer y en el Informe de costo y uso (CUR). Hoy muchas etiquetas faltan o tienen valores inconsistentes (`finance`, `Finance`, `FIN`).

¿Qué estrategia debe implementarse?

- **A.** Crear una política de etiquetas (*tag policy*) en AWS Organizations; las etiquetas aparecerán automáticamente en Cost Explorer.
- **B.** Activar `BusinessUnit` como etiqueta de asignación de costos, sin estandarizar claves ni valores.
- **C.** Definir una política de etiquetas en AWS Organizations con claves y valores permitidos y **activar** `BusinessUnit` como **etiqueta de asignación de costos** en la cuenta de administración (Billing); analizar los costos por etiqueta en Cost Explorer/CUR.
- **D.** Usar CloudTrail para identificar quién creó cada recurso y atribuir el costo por usuario.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** Hacen falta **dos piezas**: (1) **estandarizar** (tag policy: clave y valores permitidos) y (2) **activar** la etiqueta como *cost allocation tag* en Billing desde la cuenta de administración. Solo entonces los costos se pueden desglosar por la etiqueta.
>
> **Por qué las otras no:**
> - **A ✗** Una política de etiquetas **no activa** la etiqueta para costos; sin activación no aparece en Cost Explorer.
> - **B ✗** Activa la etiqueta pero los valores inconsistentes fragmentan el reporte (`finance` ≠ `Finance`).
> - **D ✗** Quién creó el recurso no equivale a qué unidad de negocio es dueña del costo.
>
> 🔑 **Concepto clave:** Tag policy (consistencia) + activación de *cost allocation tags* (visibilidad). La activación **no es retroactiva** y puede tardar hasta 24 h.

---

### Pregunta 13
*Tarea: [[1.5 Determinar las estrategias de optimización de costos y visibilidad]]*

Una empresa gasta 50 000 USD al mes en cómputo estable entre instancias EC2 (familia m5), AWS Fargate y AWS Lambda. En los próximos 12 meses planea **migrar a Graviton (m7g)**, **mover cargas de EC2 a Fargate** y posiblemente **cambiar de Región**. Quiere el **mayor descuento posible con compromiso de 3 años** conservando esa flexibilidad.

¿Qué opción de compra recomienda?

- **A.** Instancias reservadas estándar de m5 de 3 años.
- **B.** EC2 Instance Savings Plans de 3 años para la familia m5 en la Región actual.
- **C.** Instancias reservadas convertibles de 3 años.
- **D.** Compute Savings Plans de 3 años.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** Los **Compute Savings Plans** se aplican a EC2 (cualquier familia, tamaño, Región, SO o tenencia), **Fargate y Lambda**. Es el plan más flexible: cubre exactamente el escenario de cambio de familia, servicio y Región.
>
> **Por qué las otras no:**
> - **A ✗** Las RI estándar quedan ligadas a familia, Región y SO.
> - **B ✗** El EC2 Instance Savings Plan está ligado a **una familia en una Región** y no cubre Fargate ni Lambda.
> - **C ✗** Las RI convertibles permiten intercambiar, pero solo aplican a **EC2**, no a Fargate ni Lambda.
>
> 🔑 **Concepto clave:** Más flexibilidad = Compute Savings Plans; más descuento rígido = RI estándar / EC2 Instance SP.

---

# Dominio 2 — Diseño para nuevas soluciones

### Pregunta 14
*Tarea: [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]]*

El equipo de seguridad debe desplegar una configuración base (roles IAM de auditoría, reglas de AWS Config y temas de Amazon SNS) en **todas las cuentas y en 3 Regiones**, incluidas las **cuentas que se creen en el futuro**, sin crear roles manualmente en cada cuenta.

¿Qué solución cumple con la **menor sobrecarga operativa**?

- **A.** Una función Lambda programada que asuma un rol en cada cuenta y cree una pila de CloudFormation.
- **B.** AWS CloudFormation StackSets con **permisos administrados por el servicio** (integración con AWS Organizations), dirigido a las OU con **implementación automática** habilitada y a las 3 Regiones.
- **C.** StackSets con **permisos autoadministrados**, creando manualmente los roles `AWSCloudFormationStackSetExecutionRole` en cada cuenta.
- **D.** Una plantilla de CloudFormation con pilas anidadas, desplegada desde la cuenta de administración.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Con permisos **administrados por el servicio**, StackSets crea los roles necesarios automáticamente mediante Organizations y, con la **implementación automática**, aplica la pila a las cuentas nuevas que se unan a la OU.
>
> **Por qué las otras no:**
> - **A ✗** Código a mantener (manejo de errores, reintentos, Regiones, cuentas nuevas): reinventa StackSets.
> - **C ✗** Funciona, pero cada cuenta nueva exige crear manualmente los roles: más trabajo y riesgo.
> - **D ✗** Una pila (aunque sea anidada) vive en **una cuenta y una Región**; no se despliega en varias cuentas.
>
> 🔑 **Concepto clave:** StackSets service-managed + auto-deployment = línea base multi-cuenta/multi-Región.

---

### Pregunta 15
*Tarea: [[2.1 Diseñar una estrategia de implementación para cumplir con los requisitos empresariales]]*

Un servicio de Amazon ECS en AWS Fargate se ejecuta detrás de un Application Load Balancer. La empresa necesita desplegar versiones nuevas **sin tiempo de inactividad**, **probar la versión nueva con tráfico de prueba antes de enviarle tráfico de producción** y **revertir automáticamente en segundos** si se disparan alarmas de CloudWatch.

¿Qué estrategia de implementación cumple los requisitos?

- **A.** AWS CodeDeploy con despliegue **azul/verde** para ECS, con un *listener* de prueba y alarmas de CloudWatch configuradas para la reversión automática.
- **B.** Actualización continua (*rolling update*) del servicio de ECS con el *deployment circuit breaker* habilitado.
- **C.** Despliegue "todo a la vez" actualizando la definición de tarea y reduciendo `minimumHealthyPercent` a 0 para acelerar el cambio.
- **D.** Crear un servicio nuevo y, tras probarlo, cambiar manualmente el registro DNS de Route 53.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** En azul/verde, el entorno nuevo (*green*) se levanta junto al actual; el **listener de prueba** permite validarlo antes del cambio de tráfico y la reversión es **redirigir el tráfico de vuelta** al entorno *blue*, que sigue intacto (segundos), disparada por alarmas de CloudWatch.
>
> **Por qué las otras no:**
> - **B ✗** No hay validación previa con tráfico de prueba y revertir implica **reemplazar tareas** de nuevo (lento).
> - **C ✗** Provoca interrupción (0 % saludable) y no tiene reversión rápida.
> - **D ✗** El caché DNS y los TTL hacen el cambio y la reversión lentos y manuales.
>
> 🔑 **Concepto clave:** Reversión instantánea = azul/verde. Menor riesgo gradual = canary/lineal.

---

### Pregunta 16
*Tarea: [[2.2 Diseñar una solución para garantizar la continuidad de actividades]]*

Una aplicación opera en modo **activo-pasivo**: un ALB principal en us-east-1 y otro en us-west-2 que solo debe recibir tráfico si el principal falla. La conmutación debe ser **automática** y usar el dominio `www.example.com`.

¿Qué configuración de Amazon Route 53 debe usar el arquitecto?

- **A.** Política de **latencia** con un registro por Región.
- **B.** Política **ponderada** con peso 100 para us-east-1 y 0 para us-west-2, cambiando los pesos manualmente en caso de incidente.
- **C.** Política de **conmutación por error** (*failover*): registro de alias primario hacia el ALB de us-east-1 con comprobación de estado y registro de alias secundario hacia el ALB de us-west-2.
- **D.** Política **simple** con las direcciones de ambos ALB en un solo registro.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** La política *failover* envía el tráfico al **primario** mientras esté saludable y pasa **automáticamente** al **secundario** si la comprobación de estado falla: es el patrón activo-pasivo.
>
> **Por qué las otras no:**
> - **A ✗** La latencia reparte el tráfico a ambas Regiones (activo-activo), no solo en fallo.
> - **B ✗** Requiere intervención manual: incumple el requisito de automatización.
> - **D ✗** El enrutamiento simple devuelve todos los valores (no hay comprobación de estado ni prioridad).
>
> 🔑 **Concepto clave:** Activo-pasivo = failover. Activo-activo = latencia, geolocalización o ponderada con health checks.

---

### Pregunta 17
*Tarea: [[2.2 Diseñar una solución para garantizar la continuidad de actividades]]*

Un carrito de compras global tiene usuarios en Norteamérica, Europa y Asia. La empresa necesita **escrituras locales de baja latencia en la Región más cercana**, **RPO de segundos** y resiliencia ante la caída de una Región **sin promoción manual**.

¿Qué base de datos debe usar?

- **A.** Amazon Aurora Global Database con clúster primario en us-east-1 y secundarios en las demás Regiones.
- **B.** Amazon RDS for MySQL con réplicas de lectura entre Regiones.
- **C.** Amazon DynamoDB en una sola Región con recuperación a un momento dado (PITR) copiada a otras Regiones.
- **D.** Amazon DynamoDB **tablas globales**.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** Las **tablas globales** de DynamoDB son **multi-Región y multi-activas**: cada Región acepta escrituras locales y replica al resto en ~1 s (resolución de conflictos *last writer wins*). Si una Región cae, las demás siguen operando sin promoción.
>
> **Por qué las otras no:**
> - **A ✗** Aurora Global Database tiene **una sola Región de escritura**; las escrituras desde otras Regiones se reenvían al primario (mayor latencia) y ante un fallo hay que promover.
> - **B ✗** Las réplicas entre Regiones son de **solo lectura**; la promoción es manual.
> - **C ✗** Los respaldos dan un RPO de minutos/horas y la restauración es manual.
>
> 🔑 **Concepto clave:** Escrituras activas en varias Regiones = DynamoDB global tables.

---

### Pregunta 18
*Tarea: [[2.2 Diseñar una solución para garantizar la continuidad de actividades]]*

Por cumplimiento, una empresa debe conservar copias de seguridad de volúmenes EBS, bases de datos RDS y sistemas de archivos EFS durante **7 años**, copiadas a una **cuenta aislada en otra Región** y **inmutables**: nadie, ni siquiera el usuario raíz, puede eliminarlas antes de su vencimiento. Debe administrarse **de forma centralizada** para 80 cuentas.

¿Qué solución cumple los requisitos?

- **A.** Funciones Lambda que creen instantáneas de EBS y RDS y las copien a otra Región, con Amazon Data Lifecycle Manager.
- **B.** AWS Backup con **políticas de copia de seguridad de AWS Organizations**, reglas con copia entre cuentas y Regiones hacia un almacén en una cuenta de respaldo aislada con **AWS Backup Vault Lock en modo cumplimiento (*compliance*)**.
- **C.** Habilitar el control de versiones de S3 con MFA Delete y exportar todos los respaldos a un bucket.
- **D.** AWS Backup con las mismas copias, pero con **Vault Lock en modo gobernanza (*governance*)**.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** AWS Backup soporta EBS, RDS y EFS, se gobierna centralmente con **backup policies de Organizations** y permite **copias entre cuentas y Regiones**. **Vault Lock en modo cumplimiento** hace los respaldos **inmutables**: tras el período de gracia, ni el usuario raíz ni AWS pueden alterar la retención.
>
> **Por qué las otras no:**
> - **A ✗** Es un desarrollo propio, no centralizado ni inmutable.
> - **C ✗** MFA Delete protege objetos en S3 pero no cubre los respaldos nativos de EBS/RDS/EFS ni es inmutabilidad real.
> - **D ✗** En modo **gobernanza**, usuarios con permisos especiales **pueden quitar o cambiar** el bloqueo: no cumple "nadie puede eliminarlas".
>
> 🔑 **Concepto clave:** *Compliance mode* = inmutable. *Governance mode* = reversible por usuarios autorizados.

---

### Pregunta 19 (Elija DOS)
*Tarea: [[2.3 Determinar los controles de seguridad en función de los requisitos]]*

Un sitio de comercio electrónico detrás de un ALB sufre **inyección SQL**, *scraping* con **altas tasas de solicitudes HTTP desde miles de IP** y **ataques DDoS volumétricos** esporádicos. Se necesita mitigación **a gran escala en el borde**, sin mantener listas de IP manualmente, **soporte de respuesta durante ataques** y **protección contra picos de costos** causados por DDoS.

¿Qué **DOS** acciones debe realizar el arquitecto?

- **A.** Distribuir con Amazon CloudFront y asociar AWS WAF con grupos de reglas administradas (incluida SQLi) y **reglas basadas en tasa**.
- **B.** Agregar reglas de denegación en la ACL de red para los rangos de IP atacantes.
- **C.** Habilitar Amazon GuardDuty para bloquear automáticamente las IP maliciosas.
- **D.** Suscribirse a **AWS Shield Advanced** para CloudFront y el ALB.
- **E.** Abrir el grupo de seguridad del ALB únicamente a los rangos de IP de los clientes conocidos.

> [!success]- Respuesta y explicación
> **Respuestas correctas: A y D**
>
> **Por qué A y D:**
> - **A:** CloudFront absorbe y distribuye el tráfico en el borde; **WAF** con reglas administradas bloquea SQLi y las **reglas basadas en tasa** limitan el *scraping* por IP, sin listas manuales.
> - **D:** **Shield Advanced** añade protección DDoS L3/L4/L7, acceso al **equipo de respuesta (SRT)** y **protección de costos** por picos asociados a un ataque.
>
> **Por qué las otras no:**
> - **B ✗** Las ACL de red tienen pocas reglas y no escalan a miles de IP cambiantes.
> - **C ✗** GuardDuty **detecta** amenazas; no bloquea tráfico por sí mismo.
> - **E ✗** Un sitio público de comercio electrónico no puede limitarse a IP conocidas.
>
> 🔑 **Concepto clave:** WAF = capa 7 (SQLi, rate limiting). Shield Advanced = DDoS + SRT + protección de costos.

---

### Pregunta 20
*Tarea: [[2.3 Determinar los controles de seguridad en función de los requisitos]]*

Varias funciones de AWS Lambda acceden a una base de datos **Amazon RDS for Oracle** con usuario y contraseña. Se requiere que las credenciales se **roten automáticamente cada 30 días**, estén cifradas y **no sea necesario volver a desplegar** las funciones, con el menor esfuerzo.

¿Qué solución cumple los requisitos?

- **A.** Habilitar la autenticación de base de datos de IAM en RDS for Oracle y usar tokens temporales.
- **B.** Guardar las credenciales como `SecureString` en AWS Systems Manager Parameter Store y escribir una función Lambda de rotación personalizada.
- **C.** Almacenar las credenciales en **AWS Secrets Manager** con **rotación automática** cada 30 días; las funciones leen el secreto en tiempo de ejecución (con caché) mediante su rol IAM.
- **D.** Guardar las credenciales cifradas con KMS en variables de entorno de Lambda y actualizarlas cada 30 días desde la canalización de CI/CD.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** Secrets Manager rota secretos **de forma nativa** (con plantillas para RDS, incluido Oracle) y las funciones obtienen siempre el valor vigente en tiempo de ejecución, sin redespliegue.
>
> **Por qué las otras no:**
> - **A ✗** La autenticación IAM de RDS **no está soportada en Oracle** (solo MySQL, MariaDB y PostgreSQL).
> - **B ✗** Parameter Store **no rota** secretos de forma nativa; habría que construir y mantener la rotación.
> - **D ✗** Las variables de entorno requieren **redespliegue** para cambiar y la rotación es manual.
>
> 🔑 **Concepto clave:** Rotación automática nativa = Secrets Manager. Parameter Store = configuración/secretos sin rotación nativa.

---

### Pregunta 21
*Tarea: [[2.3 Determinar los controles de seguridad en función de los requisitos]]*

Una empresa tiene 500 instancias EC2 (Windows y Amazon Linux) en 20 cuentas y 3 Regiones. Los parches críticos deben aplicarse en 7 días, con **ventanas de mantenimiento distintas por entorno** y un **informe de cumplimiento centralizado**. Se busca el **menor esfuerzo**.

¿Qué solución debe implementarse?

- **A.** Usar Amazon Inspector para escanear las instancias y aplicar los parches automáticamente.
- **B.** Crear una AMI nueva cada mes con EC2 Image Builder y reemplazar manualmente las instancias.
- **C.** Que los administradores se conecten por RDP/SSH a cada instancia en las ventanas de mantenimiento.
- **D.** Usar **AWS Systems Manager Patch Manager** con una **política de parches (*patch policy*)** desplegada a nivel de organización con Quick Setup: líneas base de parches, programaciones por entorno e informes de cumplimiento centralizados.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** Las **patch policies** con Quick Setup definen líneas base, programaciones y ámbito (OU/Regiones/etiquetas) para toda la organización y consolidan el **cumplimiento** de parches.
>
> **Por qué las otras no:**
> - **A ✗** Inspector **detecta vulnerabilidades**, no instala parches.
> - **B ✗** Hornear AMIs es válido para flotas inmutables, pero no resuelve el cumplimiento de las instancias existentes y exige reemplazo manual.
> - **C ✗** Manual, no escala y no genera reportes.
>
> 🔑 **Concepto clave:** Patch Manager aplica parches; Inspector los descubre.

---

### Pregunta 22
*Tarea: [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]*

En un sistema de pedidos, el nivel web (grupo de Auto Scaling en EC2) llama de forma **síncrona por HTTP** a un servicio de procesamiento en EC2. En picos de tráfico el servicio de procesamiento se satura, devuelve errores 5xx y **se pierden pedidos**. Hay que rediseñar para **no perder pedidos** y escalar de forma eficiente.

¿Qué solución debe implementarse?

- **A.** Aumentar el tamaño de las instancias de procesamiento y el mínimo de su grupo de Auto Scaling.
- **B.** Introducir una **cola de Amazon SQS** entre ambos niveles: el nivel web publica los pedidos, los *workers* los consumen y su grupo de Auto Scaling escala con una métrica de **mensajes en cola por instancia**; usar una cola de mensajes fallidos (DLQ).
- **C.** Reemplazar la llamada HTTP por un tema de SNS con suscripción HTTP al servicio de procesamiento.
- **D.** Colocar un balanceador interno entre ambos niveles y escalar el nivel web por CPU.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** SQS **desacopla** los niveles y actúa como **búfer duradero**: los pedidos no se pierden aunque el procesamiento esté saturado. Escalar con *backlog por instancia* ajusta la capacidad a la carga real y la DLQ aísla mensajes problemáticos.
>
> **Por qué las otras no:**
> - **A ✗** Más capacidad fija no elimina el acoplamiento síncrono: un pico mayor vuelve a perder pedidos y sube el costo.
> - **C ✗** SNS no almacena en búfer para consumidores lentos; sigue empujando al servicio saturado y los reintentos son limitados.
> - **D ✗** Un balanceador reparte, pero no absorbe picos; escalar el nivel web por CPU no ayuda al nivel que se satura.
>
> 🔑 **Concepto clave:** Acoplamiento débil con SQS + escalado por *backlog per instance*.

---

### Pregunta 23
*Tarea: [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]*

Una API sin servidor usa AWS Lambda y un clúster **Amazon Aurora MySQL** Multi-AZ. En picos, Aurora agota las conexiones (*"Too many connections"*) y, durante las conmutaciones por error, las funciones fallan entre 30 y 60 segundos. Hay que **minimizar los cambios** en la aplicación.

¿Qué solución debe implementarse?

- **A.** Subir a una instancia más grande para aumentar `max_connections`.
- **B.** Agregar réplicas de lectura y que cada función elija una al azar.
- **C.** Implementar **Amazon RDS Proxy** delante del clúster y hacer que las funciones se conecten al endpoint del proxy.
- **D.** Configurar *provisioned concurrency* en las funciones Lambda.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** **RDS Proxy** agrupa y **multiplexa conexiones** (ideal para Lambda) y reduce el impacto de una conmutación por error, ya que mantiene conexiones de aplicación mientras el proxy se reconecta al nuevo primario. Solo se cambia el endpoint.
>
> **Por qué las otras no:**
> - **A ✗** Más conexiones máximas cuestan más y no resuelven la tormenta de conexiones ni los fallos en la conmutación.
> - **B ✗** Solo reparte lecturas; no reduce la cantidad de conexiones totales ni el efecto del *failover*.
> - **D ✗** La concurrencia aprovisionada reduce arranques en frío; no limita conexiones a la base de datos (puede incluso aumentarlas).
>
> 🔑 **Concepto clave:** Lambda + RDS/Aurora = RDS Proxy.

---

### Pregunta 24
*Tarea: [[2.4 Diseñar una estrategia para cumplir con los requisitos de fiabilidad]]*

Una plataforma SaaS tiene pilas completas en eu-central-1 y us-east-1. Por GDPR y por contrato, los usuarios de la **Unión Europea deben atenderse siempre desde eu-central-1**, aunque la latencia hacia us-east-1 sea menor; el resto de usuarios debe ir a us-east-1.

¿Qué política de enrutamiento de Route 53 debe usar?

- **A.** **Geolocalización**: un registro para el continente Europa hacia eu-central-1 y un registro **predeterminado** hacia us-east-1, con comprobaciones de estado.
- **B.** **Latencia**: un registro por Región.
- **C.** **Geoproximidad** con sesgo 0 para ambas Regiones.
- **D.** **Ponderada** 50/50 entre las dos Regiones.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** La geolocalización enruta por **la ubicación del usuario** (país/continente) y **garantiza** que Europa vaya a eu-central-1. El registro predeterminado atiende a las ubicaciones sin coincidencia.
>
> **Por qué las otras no:**
> - **B ✗** La latencia enruta por la Región más rápida, que podría ser us-east-1 para algunos usuarios europeos.
> - **C ✗** La geoproximidad enruta por **distancia**, no garantiza que un usuario de la UE termine en la UE.
> - **D ✗** El reparto ponderado es aleatorio y no respeta residencia.
>
> 🔑 **Concepto clave:** Requisito legal/residencia = geolocalización. Rendimiento = latencia.

---

### Pregunta 25
*Tarea: [[2.5 Diseñar una solución para cumplir con los objetivos de rendimiento]]*

Una aplicación de lectura intensiva en Amazon DynamoDB recibe millones de lecturas por segundo sobre unos pocos elementos "calientes". Se necesita pasar de milisegundos a **microsegundos** de latencia, con lecturas eventualmente consistentes aceptables, **mínimos cambios de código** y menor gasto de RCU.

¿Qué debe hacer el arquitecto?

- **A.** Implementar Amazon ElastiCache for Redis con el patrón *cache-aside* en la aplicación.
- **B.** Aumentar las unidades de capacidad de lectura (RCU) o cambiar a modo bajo demanda.
- **C.** Habilitar tablas globales de DynamoDB en más Regiones.
- **D.** Implementar **Amazon DynamoDB Accelerator (DAX)** y apuntar el cliente de DynamoDB al clúster de DAX.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** DAX es un caché **en memoria totalmente administrado y compatible con la API de DynamoDB**: se cambia el cliente/endpoint y se logran lecturas en microsegundos, descargando las RCU de la tabla.
>
> **Por qué las otras no:**
> - **A ✗** Exige escribir y mantener la lógica de caché e invalidación en la aplicación (más cambios de código).
> - **B ✗** Más RCU no baja la latencia a microsegundos y aumenta el costo.
> - **C ✗** Las tablas globales mejoran proximidad/DR, no la latencia a microsegundos de elementos calientes.
>
> 🔑 **Concepto clave:** DynamoDB + microsegundos + mínimo cambio = DAX.

---

### Pregunta 26
*Tarea: [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]*

La factura muestra miles de dólares por el procesamiento de datos de **NAT gateway**, causado por instancias en subredes privadas que leen grandes volúmenes de **Amazon S3 y Amazon DynamoDB en la misma Región**. Hay que reducir el costo **sin cambiar la aplicación ni debilitar la seguridad**.

¿Qué debe hacer el arquitecto?

- **A.** Crear **gateway endpoints** para S3 y DynamoDB y agregarlos a las tablas de rutas de las subredes privadas.
- **B.** Crear *interface endpoints* para S3 y DynamoDB.
- **C.** Reemplazar el NAT gateway por una instancia NAT de EC2.
- **D.** Mover las instancias a subredes públicas con direcciones IP públicas.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** Los **gateway endpoints** para S3 y DynamoDB son **gratuitos**, sin cargo por procesamiento de datos, y dirigen el tráfico por la red de AWS evitando el NAT. No requieren cambios en la aplicación.
>
> **Por qué las otras no:**
> - **B ✗** Los *interface endpoints* tienen costo por hora y por GB; funcionan, pero son más caros que el gateway endpoint cuando basta con este.
> - **C ✗** No elimina el tráfico por NAT; añade administración y menor disponibilidad.
> - **D ✗** Expone las instancias a Internet: debilita la seguridad.
>
> 🔑 **Concepto clave:** Tráfico a S3/DynamoDB dentro de la Región → gateway endpoints = ahorro de NAT.

---

### Pregunta 27
*Tarea: [[2.6 Determinar una estrategia de optimización de costos para cumplir las metas]]*

Una empresa almacena 600 TB de objetos (en su mayoría de más de 1 MB) en S3 Standard con **patrones de acceso impredecibles**. Cuando se accede a un objeto, la lectura debe ser en **milisegundos**. Se busca reducir costos **sin cargos por recuperación** y **sin gestión manual**.

¿Qué debe hacer el arquitecto?

- **A.** Configurar una regla de ciclo de vida a S3 Standard-IA a los 30 días.
- **B.** Configurar una regla de ciclo de vida a S3 Glacier Flexible Retrieval a los 30 días.
- **C.** Mover los objetos a **S3 Intelligent-Tiering**.
- **D.** Mover los objetos a S3 One Zone-IA.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** **Intelligent-Tiering** mueve automáticamente los objetos entre niveles según el acceso real (*Frequent*, *Infrequent* y *Archive Instant Access*, todos de **milisegundos**), **sin cargos por recuperación** y sin intervención; solo cobra una pequeña tarifa de monitoreo por objeto.
>
> **Por qué las otras no:**
> - **A ✗** Standard-IA cobra **recuperación por GB** y permanencia mínima de 30 días; con accesos impredecibles puede salir más caro y no vuelve a Standard solo.
> - **B ✗** Glacier Flexible Retrieval tarda **minutos u horas** en recuperar: incumple el requisito de milisegundos.
> - **D ✗** One Zone-IA reduce la resiliencia (una sola AZ) y también cobra recuperación.
>
> 🔑 **Concepto clave:** Acceso impredecible + milisegundos + sin tarifa de recuperación = Intelligent-Tiering.

---

# Dominio 3 — Mejora continua de las soluciones existentes

### Pregunta 28
*Tarea: [[3.1 Estrategia para mejorar la excelencia operativa general]]*

Una auditoría encontró buckets de S3 **públicos** creados por equipos de desarrollo en varias cuentas. La empresa quiere **detectar** buckets públicos en todas las cuentas y **corregirlos automáticamente en minutos**, con trazabilidad de cada acción.

¿Qué solución cumple los requisitos?

- **A.** Revisar semanalmente el informe de AWS Trusted Advisor y notificar por correo a los propietarios.
- **B.** Implementar reglas de **AWS Config** (por ejemplo `s3-bucket-public-read-prohibited` y `s3-bucket-public-write-prohibited`) en la organización con **acciones de corrección automática** que ejecuten un runbook de **Systems Manager Automation** (por ejemplo `AWS-DisableS3BucketPublicReadWrite`).
- **C.** Habilitar Amazon Inspector para que corrija los buckets públicos.
- **D.** Consultar mensualmente los eventos de CloudTrail con Athena y corregir manualmente.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Config **evalúa continuamente** la configuración, marca los recursos no conformes y su **remediación automática** invoca documentos de **Systems Manager Automation**. Todo queda registrado (historial de Config, ejecuciones de Automation). En paralelo conviene activar **S3 Block Public Access** a nivel de cuenta/organización como control **preventivo**.
>
> **Por qué las otras no:**
> - **A ✗** Manual y semanal: no cumple "en minutos" ni es automático.
> - **C ✗** Inspector escanea vulnerabilidades de cómputo/contenedores/Lambda; no corrige configuración de S3.
> - **D ✗** Mensual y manual.
>
> 🔑 **Concepto clave:** Detección + corrección automática = AWS Config + SSM Automation. Prevención = Block Public Access / SCP.

---

### Pregunta 29
*Tarea: [[3.1 Estrategia para mejorar la excelencia operativa general]]*

Una API de pagos usa AWS Lambda detrás de Amazon API Gateway y se despliega con AWS SAM. Los despliegues son riesgosos. La empresa quiere **enviar el 10 % del tráfico a la versión nueva durante 10 minutos** y **revertir automáticamente** si las alarmas de errores se disparan.

¿Qué solución cumple los requisitos?

- **A.** Desplegar "todo a la vez" y vigilar manualmente las alarmas.
- **B.** Crear dos funciones y usar Route 53 ponderado, cambiando los pesos con un script.
- **C.** Usar la estrategia de implementación *immutable* de AWS Elastic Beanstalk.
- **D.** Usar `AutoPublishAlias` con `DeploymentPreference: Canary10Percent10Minutes` en SAM, asociado a **alarmas de CloudWatch**; AWS CodeDeploy desplaza el tráfico del alias y revierte si hay alarmas.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** SAM integra **CodeDeploy** con alias de Lambda: el tráfico se desplaza de forma **canary** (10 % → 100 % tras 10 min) y las **alarmas** provocan una **reversión automática** al alias anterior. No requiere infraestructura adicional.
>
> **Por qué las otras no:**
> - **A ✗** Sin gradualidad ni reversión automática.
> - **B ✗** El caché DNS lo hace impreciso y el script es código a mantener.
> - **C ✗** Elastic Beanstalk no aplica a funciones Lambda.
>
> 🔑 **Concepto clave:** Lambda + CodeDeploy = canary/lineal con alias ponderados y rollback por alarmas.

---

### Pregunta 30
*Tarea: [[3.1 Estrategia para mejorar la excelencia operativa general]]*

El equipo de operaciones gestiona 50 cuentas de AWS en us-east-1 y necesita un **único panel** con métricas, registros y trazas de todas ellas, **sin duplicar datos** ni construir canalizaciones.

¿Qué solución cumple con el **menor esfuerzo**?

- **A.** Usar la **observabilidad entre cuentas de Amazon CloudWatch**: una cuenta de monitoreo con un *sink* y las cuentas de origen vinculadas (con AWS Organizations).
- **B.** Enviar los registros de cada cuenta con suscripciones a Amazon Data Firehose hacia un bucket central y consultarlos con Athena.
- **C.** Crear un panel de CloudWatch en cada cuenta y compartirlo con el equipo.
- **D.** Exportar periódicamente los registros a S3 y analizarlos con Athena.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** La **observabilidad entre cuentas** (OAM) permite que una cuenta de monitoreo **consulte** métricas, registros y trazas de las cuentas de origen **sin copiarlos**, y puede incorporarlas por OU. Es nativa y se opera desde una sola consola.
>
> **Por qué las otras no:**
> - **B ✗** Es una canalización a construir, con datos duplicados y retrasos.
> - **C ✗** No hay vista única: hay 50 paneles distintos.
> - **D ✗** Análisis diferido, no un panel operativo en tiempo real.
>
> 🔑 **Concepto clave:** CloudWatch cross-account observability = monitoreo centralizado sin copiar datos (por Región).

---

### Pregunta 31 (Elija DOS)
*Tarea: [[3.2 Estrategia para mejorar la seguridad]]*

Una auditoría de **mínimo privilegio** detecta cientos de roles IAM con políticas amplias (`"Action": "*"`). La empresa quiere **identificar los permisos y roles no utilizados** en toda la organización y **generar políticas ajustadas** al uso real.

¿Qué **DOS** soluciones debe usar?

- **A.** IAM Access Analyzer con un analizador de **acceso no utilizado** a nivel de organización.
- **B.** El informe de credenciales de IAM.
- **C.** **Generación de políticas** de IAM Access Analyzer basada en la actividad registrada en AWS CloudTrail.
- **D.** Los hallazgos de IAM de Amazon GuardDuty.
- **E.** La comprobación "IAM Use" de AWS Trusted Advisor.

> [!success]- Respuesta y explicación
> **Respuestas correctas: A y C**
>
> **Por qué A y C:**
> - **A:** El analizador de **acceso no utilizado** señala roles, usuarios, claves y **permisos** no usados en un periodo definido.
> - **C:** La **generación de políticas** crea una política de mínimo privilegio a partir de la actividad real de CloudTrail.
>
> **Por qué las otras no:**
> - **B ✗** El informe de credenciales cubre **usuarios** (contraseñas, claves, MFA), no permisos de roles.
> - **D ✗** GuardDuty detecta **comportamiento anómalo/amenazas**, no permisos sobrantes.
> - **E ✗** La comprobación "IAM Use" solo verifica que exista al menos un usuario IAM; no analiza permisos.
>
> 🔑 **Concepto clave:** Auditar mínimo privilegio = Access Analyzer (unused access + policy generation).

---

### Pregunta 32
*Tarea: [[3.2 Estrategia para mejorar la seguridad]]*

Una empresa tiene 300 buckets de S3 en 40 cuentas. Debe **descubrir datos personales (PII)** como identificaciones y tarjetas, y **notificar** al equipo de seguridad cuando aparezcan.

¿Qué solución cumple los requisitos?

- **A.** Habilitar la protección de S3 de Amazon GuardDuty.
- **B.** Ejecutar Amazon Inspector sobre los buckets.
- **C.** Habilitar **Amazon Macie** con un administrador delegado en AWS Organizations, activar el **descubrimiento automatizado de datos confidenciales** y enviar los hallazgos a **EventBridge → SNS**.
- **D.** Crear reglas de AWS Config que verifiquen que todos los buckets estén cifrados.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** **Macie** usa ML y patrones para **clasificar datos sensibles** en S3, se administra de forma centralizada para toda la organización y emite hallazgos a EventBridge para notificaciones.
>
> **Por qué las otras no:**
> - **A ✗** GuardDuty S3 Protection detecta **accesos sospechosos**, no clasifica el contenido.
> - **B ✗** Inspector busca vulnerabilidades de software, no PII.
> - **D ✗** Cifrar no indica **qué datos** hay en el bucket.
>
> 🔑 **Concepto clave:** PII en S3 = Macie.

---

### Pregunta 33
*Tarea: [[3.2 Estrategia para mejorar la seguridad]]*

Una auditoría criticó el uso de *bastion hosts* con SSH abierto (puerto 22) y claves compartidas. La empresa quiere reemplazarlos: **sin puertos de entrada abiertos**, acceso autenticado con **IAM**, **registro de todas las sesiones** y con instancias en **subredes privadas sin salida a Internet**.

¿Qué solución cumple los requisitos?

- **A.** Usar EC2 Instance Connect y limitar el grupo de seguridad del bastión a las IP de la oficina.
- **B.** Usar **AWS Systems Manager Session Manager** con registro en S3/CloudWatch Logs, eliminar las reglas de entrada y crear **endpoints de VPC de interfaz** (`ssm`, `ssmmessages` y `ec2messages`).
- **C.** Implementar AWS Client VPN y mantener SSH con las claves compartidas.
- **D.** Rotar cada 30 días las claves SSH con AWS Secrets Manager.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Session Manager no necesita **ningún puerto de entrada**; la autenticación y autorización son por **IAM**, las sesiones se pueden **registrar** y, con los endpoints de VPC, funciona en subredes privadas sin Internet (requiere agente SSM y un perfil de instancia).
>
> **Por qué las otras no:**
> - **A ✗** Sigue habiendo puerto 22 abierto y no hay registro de sesión por defecto.
> - **C ✗** Mantiene las claves compartidas y SSH; añade una VPN que operar.
> - **D ✗** Rotar claves no elimina el puerto abierto ni da auditoría de sesión.
>
> 🔑 **Concepto clave:** Acceso a instancias sin puertos ni claves = Session Manager.

---

### Pregunta 34
*Tarea: [[3.3 Estrategia para mejorar el rendimiento]]*

Un juego multijugador en tiempo real tiene servidores detrás de **Network Load Balancers (UDP)** en us-east-1 y eu-west-1. Jugadores de todo el mundo sufren **latencia y jitter** por la Internet pública. Se necesitan **IP estáticas** para las listas de permitidos en firewalls corporativos y una **conmutación regional rápida** que no dependa del TTL de DNS.

¿Qué solución debe implementarse?

- **A.** Amazon CloudFront con los NLB como orígenes.
- **B.** Amazon Route 53 con enrutamiento por latencia.
- **C.** Amazon S3 Transfer Acceleration.
- **D.** **AWS Global Accelerator** (acelerador estándar) con grupos de puntos de enlace por Región apuntando a los NLB.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** Global Accelerator ofrece **dos IP anycast estáticas**, soporta **TCP y UDP**, ingresa el tráfico a la red global de AWS en el borde más cercano (menos jitter) y conmuta entre Regiones **en segundos** con comprobaciones de estado, sin depender del caché DNS.
>
> **Por qué las otras no:**
> - **A ✗** CloudFront entrega HTTP/HTTPS/WebSocket y **no soporta UDP**.
> - **B ✗** El tráfico sigue por la Internet pública, no hay IP estáticas y la conmutación depende del TTL de DNS.
> - **C ✗** S3 Transfer Acceleration solo acelera cargas a S3.
>
> 🔑 **Concepto clave:** TCP/UDP + IP estáticas + failover rápido = Global Accelerator. HTTP cacheable = CloudFront.

---

### Pregunta 35
*Tarea: [[3.3 Estrategia para mejorar el rendimiento]]*

Una simulación HPC con **MPI** se ejecuta en 64 instancias C5 de un grupo de Auto Scaling distribuido en varias zonas de disponibilidad. La **latencia entre nodos es alta y variable**, lo que limita el rendimiento.

¿Qué debe hacer el arquitecto?

- **A.** Usar un **grupo de ubicación de clúster** en una sola zona de disponibilidad con instancias compatibles con **Elastic Fabric Adapter (EFA)**.
- **B.** Usar un grupo de ubicación de dispersión (*spread*).
- **C.** Usar un grupo de ubicación de partición (*partition*).
- **D.** Distribuir las instancias en más zonas de disponibilidad para mejorar el aislamiento.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** Una carga **fuertemente acoplada** necesita latencia mínima y ancho de banda máximo entre nodos: el grupo de **clúster** agrupa instancias físicamente cercanas en una AZ y **EFA** ofrece comunicación con *OS-bypass* para MPI.
>
> **Por qué las otras no:**
> - **B ✗** *Spread* separa instancias en hardware distinto (alta disponibilidad de pocas instancias críticas), lo contrario a lo que se necesita.
> - **C ✗** *Partition* aísla fallos entre grupos de instancias (Hadoop/Cassandra), no optimiza la latencia.
> - **D ✗** Más AZ aumenta la latencia entre nodos.
>
> 🔑 **Concepto clave:** Cluster = rendimiento de red. Spread = aislamiento de pocas instancias. Partition = aislamiento por grupos grandes.

---

### Pregunta 36
*Tarea: [[3.4 Estrategia para mejorar la fiabilidad]]*

Durante un evento anual de ventas, el grupo de Auto Scaling de una aplicación **no pudo lanzar instancias** porque se alcanzó la **cuota de vCPU On-Demand de EC2** de la Región y nadie recibió una advertencia. La empresa quiere **monitorear proactivamente** el uso frente a las cuotas y **aplicar cuotas elevadas automáticamente** a las cuentas nuevas de la organización.

¿Qué solución cumple los requisitos?

- **A.** Distribuir el grupo de Auto Scaling en más zonas de disponibilidad.
- **B.** Revisar manualmente cada mes el panel de AWS Trusted Advisor.
- **C.** Usar **Service Quotas**: alarmas de CloudWatch sobre las métricas de uso (por ejemplo, al 80 % de la cuota) con notificación por SNS, solicitar aumentos con antelación y una **plantilla de solicitud de cuotas** de la organización para las cuentas nuevas.
- **D.** Usar solo instancias Spot para evitar las cuotas.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** Service Quotas expone **métricas de uso** en CloudWatch para crear **alarmas proactivas** y permite **plantillas de solicitud** que se aplican automáticamente a las cuentas nuevas de la organización. Los aumentos se solicitan **antes** del evento.
>
> **Por qué las otras no:**
> - **A ✗** Las cuotas de vCPU son **por Región**, no por zona de disponibilidad.
> - **B ✗** Revisión manual y esporádica: no es proactiva ni automatizada.
> - **D ✗** Spot tiene sus propias cuotas y no elimina el riesgo.
>
> 🔑 **Concepto clave:** Cuotas = por Región/cuenta; monitorear uso con alarmas y solicitar aumentos con anticipación.

---

### Pregunta 37
*Tarea: [[3.5 Identificar oportunidades de optimización de costos]]*

Una flota EC2 tiene un uso medio de CPU del 15 %. El equipo cree que está sobredimensionada, pero algunas aplicaciones son **intensivas en memoria**. Se quieren **recomendaciones de dimensionamiento correcto que consideren la memoria**, a nivel de toda la organización.

¿Qué solución debe implementarse?

- **A.** Usar la comprobación de instancias EC2 con baja utilización de AWS Trusted Advisor.
- **B.** Habilitar **AWS Compute Optimizer** a nivel de organización e instalar el **agente de CloudWatch** para publicar las métricas de memoria.
- **C.** Crear alarmas de CloudWatch que detengan las instancias con CPU inferior al 20 %.
- **D.** Reducir manualmente todas las instancias a una familia menor y observar el resultado.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** **Compute Optimizer** analiza el uso histórico y recomienda tamaños/familias óptimos. Por defecto usa CPU, red y disco; para que la **memoria** cuente se necesita el **agente de CloudWatch**. Se puede activar a nivel de organización.
>
> **Por qué las otras no:**
> - **A ✗** La comprobación de baja utilización se basa en CPU y red, no en memoria.
> - **C ✗** Detener instancias por CPU puede interrumpir cargas intensivas en memoria; no es dimensionamiento.
> - **D ✗** Es ensayo y error con riesgo de impacto en producción.
>
> 🔑 **Concepto clave:** Memoria en rightsizing = Compute Optimizer + CloudWatch agent.

---

### Pregunta 38
*Tarea: [[3.5 Identificar oportunidades de optimización de costos]]*

Las cuentas de *sandbox* de una empresa tienen picos de gasto ocasionales. Los requisitos son: **alertar** cuando el gasto **pronosticado** supere el 80 % del presupuesto mensual y, al alcanzar el **100 %** del presupuesto, **aplicar automáticamente** una restricción que impida lanzar nuevos recursos.

¿Qué solución cumple los requisitos?

- **A.** **AWS Budgets** con alertas de gasto real y pronosticado y una **acción de presupuesto** que aplique una SCP o una política IAM de denegación al alcanzar el umbral.
- **B.** Una alarma de facturación de CloudWatch que envíe un correo.
- **C.** Revisiones semanales del panel de Trusted Advisor y compra de Savings Plans.
- **D.** Informes semanales de Cost Explorer enviados al equipo.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** **AWS Budgets** soporta alertas sobre costos **reales y pronosticados** y **acciones de presupuesto** que pueden aplicar una **política IAM o SCP** (o detener instancias EC2/RDS) automáticamente al superar un umbral.
>
> **Por qué las otras no:**
> - **B ✗** Solo notifica; no aplica restricciones ni usa pronóstico.
> - **C ✗** Manual y los Savings Plans no limitan gastos de *sandbox*.
> - **D ✗** Informativo y diferido: no actúa.
>
> 🔑 **Concepto clave:** Control de gasto automatizado = Budgets + Budget Actions.

---

# Dominio 4 — Aceleración de la migración y la modernización

### Pregunta 39
*Tarea: [[4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración]]*

Una empresa planea migrar 1 500 servidores locales (VMware). Necesita el **inventario**, la **utilización** y, sobre todo, las **dependencias de red entre servidores (conexiones TCP y procesos)** para agruparlos en aplicaciones y definir **oleadas de migración**.

¿Qué solución debe usar?

- **A.** Introducir manualmente cada servidor en la Calculadora de precios de AWS.
- **B.** Ejecutar AWS Compute Optimizer sobre los servidores locales.
- **C.** Desplegar únicamente el **Agentless Collector** de AWS Application Discovery Service en vCenter.
- **D.** Instalar el **agente de AWS Application Discovery Service** en los servidores y analizar el **diagrama de red** en AWS Migration Hub.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** El **agente de Discovery** recopila configuración, rendimiento, **conexiones de red y procesos** de cada servidor; Migration Hub muestra las **dependencias** para agrupar aplicaciones y planificar oleadas.
>
> **Por qué las otras no:**
> - **A ✗** Manual, sin utilización real ni dependencias.
> - **B ✗** Compute Optimizer analiza recursos que **ya están en AWS**.
> - **C ✗** El recolector sin agente (VMware) obtiene configuración y rendimiento, pero **no datos de conexiones de red/procesos** necesarios para dependencias.
>
> 🔑 **Concepto clave:** Dependencias entre servidores = *agent-based* Application Discovery Service + Migration Hub.

---

### Pregunta 40
*Tarea: [[4.1 Seleccionar las cargas de trabajo y procesos existentes para una posible migración]]*

Una empresa migrará 100 máquinas virtuales con **licencias por socket/núcleo** (por ejemplo, Oracle y SQL Server) que desea **reutilizar (BYOL)**. Necesita visibilidad de sockets y núcleos físicos, afinidad con el host y **control del cumplimiento de licencias** con el menor esfuerzo administrativo.

¿Qué solución cumple los requisitos?

- **A.** Instancias dedicadas (*Dedicated Instances*) con tenencia dedicada.
- **B.** Instancias Spot de tenencia compartida.
- **C.** **EC2 Dedicated Hosts** administrados con **AWS License Manager** (configuraciones de licencia y grupos de recursos de host con asignación automática).
- **D.** Instancias de tenencia compartida con licencia incluida y reserva de capacidad.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** Los **Dedicated Hosts** exponen **sockets, núcleos y afinidad de host**, requisitos típicos de licencias BYOL. **License Manager** automatiza la asignación de hosts, aplica límites y reporta el uso para el cumplimiento.
>
> **Por qué las otras no:**
> - **A ✗** Las *Dedicated Instances* aíslan el hardware pero **no dan visibilidad de sockets/núcleos ni afinidad** de host.
> - **B ✗** Spot en hardware compartido no sirve para licencias ligadas a hardware.
> - **D ✗** La licencia incluida contradice el objetivo de **reutilizar las licencias existentes**.
>
> 🔑 **Concepto clave:** BYOL por socket/núcleo = Dedicated Hosts + License Manager.

---

### Pregunta 41 (Elija DOS)
*Tarea: [[4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes]]*

Una empresa debe migrar una base de datos **Oracle 19c de 4 TB** desde su centro de datos a **Amazon Aurora PostgreSQL** con **menos de 30 minutos de inactividad**. La base de datos tiene muchos procedimientos almacenados en PL/SQL.

¿Qué **DOS** acciones debe realizar el arquitecto?

- **A.** Usar AWS Schema Conversion Tool (AWS SCT) o DMS Schema Conversion para evaluar y convertir el esquema y el código PL/SQL a PostgreSQL.
- **B.** Exportar con Oracle Data Pump y restaurar el archivo directamente en Aurora PostgreSQL.
- **C.** Usar AWS DMS con **carga completa y captura de datos de cambios (CDC)** y conmutar la aplicación cuando el retraso de replicación sea casi cero.
- **D.** Usar AWS DMS solo con carga completa y detener la aplicación mientras se copian los datos.
- **E.** Tomar una instantánea de Oracle y crear el clúster de Aurora a partir de ella.

> [!success]- Respuesta y explicación
> **Respuestas correctas: A y C**
>
> **Por qué A y C:** En una migración **heterogénea** hay que **convertir** el esquema y el código (SCT / DMS Schema Conversion) y **replicar los datos** con carga completa + **CDC**, de modo que el corte solo requiere esperar a que el retraso sea ~0 (minutos de inactividad).
>
> **Por qué las otras no:**
> - **B ✗** El formato de Data Pump es específico de Oracle; PostgreSQL no puede importarlo.
> - **D ✗** Sin CDC, la inactividad sería proporcional al tiempo de copia de 4 TB, y DMS no convierte código PL/SQL.
> - **E ✗** Las instantáneas solo restauran dentro del mismo motor; no cambian Oracle por PostgreSQL.
>
> 🔑 **Concepto clave:** Migración heterogénea con mínima inactividad = SCT (esquema) + DMS (full load + CDC).

---

### Pregunta 42
*Tarea: [[4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes]]*

Una empresa hará un **rehost** (lift-and-shift) de 150 servidores Windows y Linux desde VMware a EC2. Requiere **ventana de corte de minutos**, **pruebas no disruptivas** antes del corte, **replicación continua a nivel de bloque** y no cambiar el sistema operativo.

¿Qué servicio debe usar?

- **A.** VM Import/Export con imágenes OVA exportadas.
- **B.** **AWS Application Migration Service (AWS MGN)**.
- **C.** AWS DataSync.
- **D.** Instantáneas de EBS y AMI manuales.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** **MGN** instala un agente que **replica continuamente** los discos hacia un área de preparación, permite **lanzar instancias de prueba** sin afectar el origen y realizar el **corte** en minutos, sin cambios de SO.
>
> **Por qué las otras no:**
> - **A ✗** Es un proceso puntual, con inactividad y sin replicación continua.
> - **C ✗** DataSync mueve archivos/objetos, no servidores completos.
> - **D ✗** Manual, no continuo y no aplica a servidores locales.
>
> 🔑 **Concepto clave:** Rehost de servidores = AWS Application Migration Service.

---

### Pregunta 43 (Elija DOS)
*Tarea: [[4.2 Determinar el enfoque de migración óptimo para las cargas de trabajo existentes]]*

Una empresa debe mover **600 TB** de archivos locales a Amazon S3 en **6 semanas**. El enlace de Internet es de **1 Gbps compartido** y solo ~30 % puede usarse para la migración (≈ 3 TB/día). Los datos **siguen cambiando** durante el proyecto.

¿Qué **DOS** acciones cumplen los requisitos?

- **A.** Transferir todo con AWS DataSync únicamente por Internet.
- **B.** Aprovisionar una conexión Direct Connect de 10 Gbps y transferir por ella.
- **C.** Pedir varios dispositivos de **AWS Snow Family** (Snowball Edge Storage Optimized) para la **carga masiva inicial**.
- **D.** Usar **AWS DataSync** por la red para **sincronizar los cambios incrementales** después de la carga masiva.
- **E.** Solicitar AWS Snowmobile.

> [!success]- Respuesta y explicación
> **Respuestas correctas: C y D**
>
> **Por qué C y D:** A ~3 TB/día, 600 TB tardarían **~200 días**: la carga masiva debe ir en dispositivos **Snowball Edge**. Los cambios posteriores se sincronizan con **DataSync** sobre la red.
>
> **Por qué las otras no:**
> - **A ✗** ~200 días ≫ 6 semanas.
> - **B ✗** Aprovisionar Direct Connect puede tardar **semanas o meses**: no cabe en la ventana.
> - **E ✗** Snowmobile está pensado para **decenas de PB a EB**; sería exagerado para 600 TB.
>
> 🔑 **Concepto clave:** Muchos TB + poco ancho de banda = Snow Family (bulk) + DataSync (delta). Cálculo rápido: 1 Gbps al 100 % ≈ 10 TB/día.

---

### Pregunta 44
*Tarea: [[4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes]]*

Una empresa migra servidores de archivos de Windows locales (**SMB**, ACL NTFS, **80 TB**) integrados con **Active Directory**. Debe conservar SMB, las ACL y DFS con **la mínima administración de servidores**.

¿Qué solución debe elegir?

- **A.** Amazon EFS con montaje desde los clientes Windows.
- **B.** Instancias EC2 con Windows Server y volúmenes EBS configurados como servidor de archivos.
- **C.** **Amazon FSx for Windows File Server** Multi-AZ unido a Active Directory (administrado o autoadministrado), con **AWS DataSync** para migrar los datos conservando las ACL.
- **D.** Amazon S3 reescribiendo las aplicaciones para usar la API de S3.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** FSx for Windows File Server es un servicio **administrado** con SMB nativo, ACL NTFS, DFS, cuotas y **integración con AD**, con Multi-AZ para alta disponibilidad. DataSync copia datos y metadatos (permisos).
>
> **Por qué las otras no:**
> - **A ✗** EFS usa **NFS** y no es compatible con clientes Windows.
> - **B ✗** Funciona, pero hay que administrar SO, parches, clúster y réplica: mucha sobrecarga.
> - **D ✗** Reescribir aplicaciones no cumple "conservar SMB y ACL".
>
> 🔑 **Concepto clave:** SMB/Windows/AD = FSx for Windows. NFS/Linux = EFS. HPC = FSx for Lustre.

---

### Pregunta 45
*Tarea: [[4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes]]*

Una aplicación Java monolítica fue migrada a una sola instancia grande de EC2 y **guarda las sesiones de usuario en memoria local**. Para mejorar disponibilidad y escalabilidad se colocará detrás de un ALB con un grupo de Auto Scaling en varias zonas de disponibilidad. Los usuarios **no deben perder la sesión** si una instancia se termina.

¿Qué debe hacer el arquitecto?

- **A.** Habilitar *sticky sessions* en el ALB.
- **B.** **Externalizar el estado de sesión** a Amazon ElastiCache (Redis/Valkey) con Multi-AZ o a Amazon DynamoDB con TTL, dejando las instancias sin estado.
- **C.** Guardar las sesiones en un volumen EBS compartido con Multi-Attach entre las instancias.
- **D.** Usar una instancia más grande y mantener una sola instancia con las sesiones en memoria.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** Una arquitectura **sin estado** permite escalar horizontalmente y sobrevivir a la pérdida de instancias. Las sesiones externas (ElastiCache o DynamoDB) son accesibles desde cualquier instancia.
>
> **Por qué las otras no:**
> - **A ✗** La afinidad mantiene al usuario en una instancia, pero si esa instancia se termina **la sesión se pierde** y el balanceo queda desigual.
> - **C ✗** EBS Multi-Attach es de una **sola AZ**, requiere un sistema de archivos con soporte de clúster y no es una solución de sesiones.
> - **D ✗** Mantiene el punto único de falla.
>
> 🔑 **Concepto clave:** Escalar y recuperar = instancias sin estado + estado externo.

---

### Pregunta 46
*Tarea: [[4.3 Determinar una nueva arquitectura para las cargas de trabajo existentes]]*

Una empresa ejecuta procesos *batch* nocturnos de ~6 horas en 200 servidores locales. Los trabajos son **tolerantes a interrupciones y reiniciables**. Quiere **minimizar costos** con **poca administración** al migrar a AWS.

¿Qué arquitectura recomienda?

- **A.** **AWS Batch** con entornos de cómputo administrados que usen instancias **Spot** (estrategia `SPOT_PRICE_CAPACITY_OPTIMIZED`), múltiples tipos de instancia y reintentos de trabajo.
- **B.** Instancias reservadas de 3 años para 200 instancias EC2.
- **C.** Funciones AWS Lambda orquestadas con Step Functions.
- **D.** EC2 Dedicated Hosts On-Demand.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** AWS Batch administra colas, aprovisionamiento y escalado; con **Spot** (hasta ~90 % de descuento) y **diversificación de tipos de instancia**, los trabajos reiniciables se ejecutan al menor costo.
>
> **Por qué las otras no:**
> - **B ✗** Pagar 24×7 por cómputo que solo se usa ~6 h al día.
> - **C ✗** Lambda tiene un límite de **15 minutos** por ejecución: no sirve para tareas de 6 horas sin rediseño.
> - **D ✗** Dedicated Hosts On-Demand es la opción más cara sin necesidad de licencias o aislamiento.
>
> 🔑 **Concepto clave:** Batch tolerante a fallos = Spot + AWS Batch.

---

### Pregunta 47
*Tarea: [[4.4 Determinar oportunidades de modernización y mejoras]]*

Una empresa tiene un **monolito .NET** en EC2 y quiere modernizarlo a **microservicios** sin interrumpir el servicio ni hacer una reescritura total (*big bang*). Debe entregar funcionalidades de forma **incremental** y poder **revertir** fácilmente.

¿Qué enfoque debe seguir?

- **A.** Detener el desarrollo y reescribir todo en funciones Lambda antes de salir a producción.
- **B.** Mover el monolito a un contenedor en ECS y dar por terminada la modernización.
- **C.** Dividir primero la base de datos en muchas bases independientes y después refactorizar el código.
- **D.** Aplicar el patrón **strangler fig**: colocar un ALB (enrutamiento por ruta) o Amazon API Gateway frente al monolito y extraer funciones gradualmente a microservicios (ECS/Fargate o Lambda), redirigiendo rutas una a una.

> [!success]- Respuesta y explicación
> **Respuesta correcta: D**
>
> **Por qué D es la mejor:** *Strangler fig* reemplaza el monolito **poco a poco**: cada ruta migrada se redirige al nuevo servicio y, si falla, se vuelve a apuntar al monolito. No hay ventana de interrupción ni riesgo de "gran explosión".
>
> **Por qué las otras no:**
> - **A ✗** Reescritura *big bang*: alto riesgo, sin valor hasta el final.
> - **B ✗** Es *replatform* (contenedores), no moderniza la arquitectura a microservicios.
> - **C ✗** Dividir primero los datos es la parte más riesgosa y acopla toda la migración.
>
> 🔑 **Concepto clave:** Monolito → microservicios sin interrupciones = strangler fig (con ALB/API Gateway como fachada).

---

### Pregunta 48
*Tarea: [[4.4 Determinar oportunidades de modernización y mejoras]]*

Una empresa opera un servidor **SFTP en EC2** para socios externos; hay que parcharlo y un *cron* copia los archivos a S3. Los socios usan **IP fijas** en sus firewalls. Se quiere **reducir la administración**, escribir **directamente en S3**, **mantener IP fijas** y **autenticar contra el directorio existente** (AD/LDAP).

¿Qué solución debe implementar?

- **A.** Un servidor SFTP en contenedores Fargate con almacenamiento en EFS.
- **B.** **AWS Transfer Family** (SFTP) con un **endpoint de VPC accesible desde Internet con Elastic IP**, S3 como almacenamiento y un proveedor de identidad (AWS Managed Microsoft AD o personalizado con API Gateway + Lambda).
- **C.** URL prefirmadas de S3 distribuidas a los socios.
- **D.** S3 Transfer Acceleration, pidiendo a los socios que usen la API de S3.

> [!success]- Respuesta y explicación
> **Respuesta correcta: B**
>
> **Por qué B es la mejor:** **Transfer Family** es un SFTP/FTPS/FTP **administrado** que guarda en S3. Los *endpoints públicos* usan IP dinámicas; con un **endpoint de VPC + Elastic IP** (y grupos de seguridad) se logran **IP fijas**. Admite directorios y proveedores de identidad externos.
>
> **Por qué las otras no:**
> - **A ✗** Sigue siendo infraestructura que operar y no escribe directo en S3.
> - **C ✗** No es SFTP ni integra el directorio: los socios usan clientes SFTP.
> - **D ✗** Transfer Acceleration acelera la API de S3; no ofrece protocolo SFTP.
>
> 🔑 **Concepto clave:** SFTP administrado hacia S3 con IP fijas = Transfer Family + VPC endpoint + Elastic IP.

---

# Temas emergentes — IA generativa responsable

> [!warning] Sin puntaje en el examen real
> Estas preguntas se basan en la sección [[Guia AWS#Temas emergentes|Temas emergentes]]: en el examen son preguntas de **prueba previa** que no afectan el puntaje.

### Pregunta 49
*Sección: [[Guia AWS#Diseño de controles de seguridad y de inteligencia artificial responsable]]*

Una aseguradora crea un chatbot de atención al cliente con **Amazon Bedrock**. Requisitos: **bloquear contenido dañino** y **temas fuera de alcance** (por ejemplo, asesoría de inversión), **enmascarar PII** (como números de seguro) en entradas y salidas, aplicar **la misma política a varios modelos y aplicaciones** y poder **auditarla**.

¿Qué solución cumple los requisitos?

- **A.** Incluir las restricciones en el *system prompt* del modelo.
- **B.** Procesar las respuestas con una función Lambda que aplique expresiones regulares.
- **C.** Configurar **Amazon Bedrock Guardrails** con filtros de contenido, **temas denegados** y **filtros de información confidencial** (bloqueo o enmascaramiento), aplicados a entradas y salidas; reutilizarlo en varios modelos con la API `ApplyGuardrail`.
- **D.** Afinar (*fine-tuning*) el modelo para que evite esos temas.

> [!success]- Respuesta y explicación
> **Respuesta correcta: C**
>
> **Por qué C es la mejor:** **Guardrails** aplica controles **independientes del modelo**, tanto en la entrada del usuario como en la respuesta: filtros de contenido dañino, temas denegados, filtros de palabras y **PII (bloquear/enmascarar)**. Es una política gestionada y reutilizable, con trazas para auditoría.
>
> **Por qué las otras no:**
> - **A ✗** Las instrucciones del *prompt* no son un control garantizado (inyección de prompts, desvíos del modelo).
> - **B ✗** Solo cubre la salida, es frágil, difícil de mantener y no filtra la entrada.
> - **D ✗** El ajuste fino no garantiza el cumplimiento, es costoso y se debe repetir por modelo.
>
> 🔑 **Concepto clave:** Filtrado de contenido y cumplimiento en GenAI = Bedrock Guardrails.

---

### Pregunta 50
*Sección: [[Guia AWS#Diseño de controles de seguridad y de inteligencia artificial responsable]]*

Un agente de IA generativa propone **operaciones de alto impacto** (reembolsos de más de 10 000 USD y cambios en producción). Se exige **aprobación humana obligatoria** antes de ejecutarlas, con **auditoría** y **tiempo de espera** (*timeout*). La aprobación puede tardar horas o días.

¿Qué solución debe diseñarse?

- **A.** Un flujo de **AWS Step Functions** (estándar) con una tarea de **callback** (`.waitForTaskToken`) que envíe el token al aprobador (SNS, correo o API) y continúe con `SendTaskSuccess`/`SendTaskFailure`, con *timeouts* y `Catch`.
- **B.** Una función Lambda que consulte cada minuto si hay aprobación (*polling*).
- **C.** Poner las solicitudes en una cola SQS y dejar que el agente decida cuándo consumirlas.
- **D.** Ejecutar siempre la operación y revertirla si un humano la rechaza después.

> [!success]- Respuesta y explicación
> **Respuesta correcta: A**
>
> **Por qué A es la mejor:** Los flujos **estándar** de Step Functions pueden esperar **hasta un año** con la ejecución en pausa y sin costo de cómputo; el patrón de **token de tarea** detiene el flujo hasta que un humano responde. El historial de ejecución da **auditoría** y se configuran **tiempos de espera** y rutas de error.
>
> **Por qué las otras no:**
> - **B ✗** Lambda dura como máximo **15 minutos** y el *polling* desperdicia recursos.
> - **C ✗** No obliga a la aprobación humana: el agente podría procesar sin ella.
> - **D ✗** Ejecutar primero viola el requisito de aprobación **previa** y algunas operaciones no son reversibles.
>
> 🔑 **Concepto clave:** *Human-in-the-loop* = Step Functions + `waitForTaskToken`.

---

# ✅ Hoja de respuestas

| # | Resp. | Tarea | # | Resp. | Tarea |
| --- | --- | --- | --- | --- | --- |
| 1 | B | 1.1 | 26 | A | 2.6 |
| 2 | C | 1.1 | 27 | C | 2.6 |
| 3 | A | 1.1 | 28 | B | 3.1 |
| 4 | D | 1.2 | 29 | D | 3.1 |
| 5 | B | 1.2 | 30 | A | 3.1 |
| 6 | A, C | 1.2 | 31 | A, C | 3.2 |
| 7 | C | 1.3 | 32 | C | 3.2 |
| 8 | A | 1.3 | 33 | B | 3.2 |
| 9 | D | 1.3 | 34 | D | 3.3 |
| 10 | B | 1.4 | 35 | A | 3.3 |
| 11 | A | 1.4 | 36 | C | 3.4 |
| 12 | C | 1.5 | 37 | B | 3.5 |
| 13 | D | 1.5 | 38 | A | 3.5 |
| 14 | B | 2.1 | 39 | D | 4.1 |
| 15 | A | 2.1 | 40 | C | 4.1 |
| 16 | C | 2.2 | 41 | A, C | 4.2 |
| 17 | D | 2.2 | 42 | B | 4.2 |
| 18 | B | 2.2 | 43 | C, D | 4.2 |
| 19 | A, D | 2.3 | 44 | C | 4.3 |
| 20 | C | 2.3 | 45 | B | 4.3 |
| 21 | D | 2.3 | 46 | A | 4.3 |
| 22 | B | 2.4 | 47 | D | 4.4 |
| 23 | C | 2.4 | 48 | B | 4.4 |
| 24 | A | 2.4 | 49 | C | Emergente |
| 25 | D | 2.5 | 50 | A | Emergente |

> [!tip] Próximo paso
> Cuando tengas las preguntas oficiales de referencia, se puede generar una **v2** replicando su estilo (longitud del escenario, tipo de distractores y proporción de "Elija DOS/TRES").
