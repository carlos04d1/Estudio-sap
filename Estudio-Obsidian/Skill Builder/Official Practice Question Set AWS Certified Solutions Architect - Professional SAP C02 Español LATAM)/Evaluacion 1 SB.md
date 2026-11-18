 ¡Impresionante, Carlos! Has completado la evaluación.

¡Enhorabuena, lo has conseguido! Ya puedes ver los resultados y buscar más oportunidades de aprendizaje que te permitan seguir potenciando tus habilidades.

Ver historial y volver a realizar

## Información general sobre la evaluación

Puntuación

45%

N.º de intento

1

Respuestas correctas

9

Respuestas incorrectas

11

Se ha omitido

0

Tiempo total empleado

20 minutos 43 segundos

Tiempo medio por pregunta

1 minutos 2 segundos

- Puntuaciones de dominio (4)
    
- Detalles de la pregunta (20)
    

Estado de la respuesta

Nivel de confianza

Solo las preguntas marcadas

Eliminar filtros

Contraer todo

## Pregunta 1

Selección múltiple

Tiempo de respuesta:

1 minutos 19 segundos

Estado de la respuesta:

Correcto

Pregunta

El equipo de procesamiento de una empresa tiene una cuenta de AWS con una aplicación de producción. La aplicación se ejecuta en instancias de Amazon EC2 detrás de un equilibrador de carga de red (NLB). Las instancias EC2 están alojadas en subredes privadas en una nube privada virtual (VPC) en la región eu-west-1. A la VPC, se le asignó el bloque de CIDR de 10.0.0.0/16. El equipo de facturación de la empresa creó recientemente una nueva cuenta de AWS e implementó una aplicación en instancias EC2, que están alojadas en subredes privadas de una VPC en la región eu-central-1. A la nueva VPC, se le asignó el bloque de CIDR de 10.0.0.0/16.

  

La aplicación de procesamiento debe comunicarse de forma segura con la aplicación de facturación a través de un puerto TCP privado.

  

¿Qué debe hacer un arquitecto de soluciones para cumplir este requisito con el MENOR esfuerzo operativo?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. En la cuenta del equipo de facturación, crear una nueva VPC y subredes en eu-central-1 que utilicen el bloque de CIDR de 192.168.0.0/16. Implementar la aplicación nuevamente en las nuevas subredes. Configurar una interconexión de VPC entre las dos VPC.||Sin seleccionar|Incorrecto. Si bien esta solución es posible, requiere un esfuerzo y un tiempo de inactividad significativos. AWS PrivateLink ofrece una mejor solución.<br><br>  <br><br>Para obtener más información sobre PrivateLink, consulte [AWS PrivateLink](https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/aws-privatelink.html) .|
|B. En la cuenta del equipo de facturación, crear una nueva VPC y subredes en eu-west-1 que utilicen el bloque de CIDR de 192.168.0.0/16. En la cuenta del equipo de procesamiento, crear un servicio de punto de enlace de la VPC con tecnología de AWS PrivateLink. Crear un punto de enlace de la VPC de tipo interfaz en la nueva VPC. Configurar una conexión de interconexión de VPC entre regiones en la cuenta del equipo de facturación entre las dos VPC.|Correcto|Seleccionado|Correcto. Esta solución es una buena opción cuando el cliente y los servidores de las dos VPC tienen direcciones IP superpuestas. PrivateLink utiliza interfaces de red elásticas dentro de la VPC cliente para que no haya conflictos de las direcciones IP con el proveedor de servicios. Puede acceder a los puntos de enlace de PrivateLink a través de interconexiones de VPC, VPN y AWS Direct Connect. PrivateLink admite la interconexión de VPC, lo que permite a los clientes conectarse de forma privada a un servicio, incluso si el punto de enlace de servicio reside en una Amazon VPC diferente que esté conectada mediante la interconexión de VPC.<br><br>  <br><br>Para obtener más información sobre PrivateLink, consulte [AWS PrivateLink](https://docs.aws.amazon.com/whitepapers/latest/building-scalable-secure-multi-vpc-network-infrastructure/aws-privatelink.html) .|
|C. En cada cuenta, crear una nueva VPC con los bloques de CIDR de 192.168.0.0/16 y de 172.16.0.0/16. Crear interconexiones de VPC entre regiones entre las VPC del equipo de facturación y las VPC del equipo de procesamiento. Crear puntos de enlace de VPC de puerta de enlace para permitir que el tráfico se dirija entre las VPC.||Sin seleccionar|Incorrecto. Los puntos de enlace de puerta de enlace son para servicios de AWS específicos y permiten el enrutamiento hacia ellos. Los puntos de enlace de la puerta de enlace no permiten el enrutamiento hacia puntos de enlace personalizados, como se describe en la pregunta.<br><br>  <br><br>Para obtener más información sobre los puntos de enlace de las puertas de enlace, consulte [Puntos de conexión de la puerta de enlace](https://docs.aws.amazon.com/vpc/latest/privatelink/vpce-gateway.html) .|
|D. En la cuenta del equipo de procesamiento, agregar otro bloque de CIDR de 192.168.0.0/16 a la VPC en eu-west-1. Reiniciar cada una de las instancias EC2 para que obtengan una nueva dirección IP. Configurar una interconexión de VPC entre regiones entre las dos VPC.||Sin seleccionar|Incorrecto. No es posible configurar una interconexión de VPC con otra VPC si hay superposición de rangos de direcciones IP. Esto ocurre, aunque se agreguen rangos de direcciones IP adicionales.<br><br>  <br><br>Para obtener más información sobre la interconexión de VPC, consulte [Conceptos básicos de las interconexiones de VPC](https://docs.aws.amazon.com/vpc/latest/peering/vpc-peering-basics.html) .|

## Pregunta 2

Selección múltiple

Tiempo de respuesta:

49 segundos

Estado de la respuesta:

Correcto

Pregunta

Una aplicación móvil para compartir videos carga archivos de más de 10 GB en un bucket de Amazon S3. Sin embargo, cuando los usuarios acceden a la aplicación en ubicaciones alejadas de la región de AWS donde reside el S3 Bucket, las cargas tardan mucho tiempo. En algunos casos, las cargas fallan antes de completarse.

¿Qué combinación de pasos debe adoptar un arquitecto de soluciones para mejorar el rendimiento de carga de la aplicación? (Seleccione DOS).

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Configurar la aplicación para dividir los archivos de video en fragmentos. Utilizar una carga multiparte para transferir los archivos a Amazon S3.|Correcto|Seleccionado|Correcto. La carga multiparte transfiere archivos grandes más rápidamente al cargar los fragmentos en paralelo. Este método ofrece una velocidad de carga mejorada y una mejor recuperación de cargas fallidas.<br><br>Para obtener más información sobre la carga multiparte de S3, consulte [Carga y copia de objetos con la carga multiparte](https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html) . [https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/uploadobjusingmpu.html)|
|B. Habilitar S3 Transfer Acceleration en el S3 Bucket. Configurar la aplicación a fin de utilizar el punto de enlace de S3 Transfer Acceleration para las cargas.|Correcto|Seleccionado|Correcto. S3 Transfer Acceleration utiliza ubicaciones de borde de CloudFront y rutas de red optimizadas para acelerar la transferencia de objetos.<br><br>  <br><br>Para obtener más información sobre S3 Transfer Acceleration, consulte [Configuración de transferencias de archivos rápidas y seguras con Amazon S3 Transfer Acceleration](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html) . [https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html](https://docs.aws.amazon.com/AmazonS3/latest/dev/transfer-acceleration.html)|
|C. Configurar Amazon Route 53 con el enrutamiento basado en latencia para dirigir las cargas al S3 Bucket más cercano.||Sin seleccionar|Incorrecto. Route 53 no se dirigirá directamente a un bucket de S3. Puede configurar el S3 Bucket para que sea un sitio web estático, pero no podrá recibir el archivo.<br><br>  <br><br>Para obtener más información sobre cómo alojar un sitio web estático en un S3 Bucket, consulte [Alojamiento de un sitio web estático mediante Amazon S3](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html) . [https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/WebsiteHosting.html)|
|D. Configurar un S3 Bucket en cada región para recibir las cargas. Utilizar la replicación entre regiones de S3 para copiar los objetos en el bucket de réplica.||Sin seleccionar|Incorrecto. Este método podría llevar mucho más tiempo. El objeto tendría que cargarse completamente en el S3 Bucket de la primera región. A continuación, usted debería iniciar y completar la transferencia a la región de destino final.<br><br>Para obtener más información sobre la replicación entre regiones de S3, consulte [Replicación de objetos](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html) . [https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html](https://docs.aws.amazon.com/AmazonS3/latest/userguide/replication.html)|
|E. Modificar la aplicación para agregar prefijos aleatorios a los archivos antes de que se produzcan las cargas.||Sin seleccionar|Incorrecto. La aleatorización del nombre del objeto no afecta los tiempos de carga de Amazon S3.|

## Pregunta 3

Selección múltiple

Tiempo de respuesta:

1 minutos 8 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa utiliza varias tablas de Amazon DynamoDB para alojar datos de tres aplicaciones diferentes. Un administrador de seguridad quisiera proporcionar a los administradores de aplicaciones la capacidad de administrar los permisos de las tablas que están asociadas solo con la aplicación específica de cada administrador. En la actualidad, los administradores de aplicaciones forman parte de un grupo de IAM llamado DynamoDBAdmins que tiene permisos en todas las tablas. La empresa creará administradores y tablas adicionales para nuevas aplicaciones en el futuro.

  

Recientemente, uno de los administradores de la aplicación pudo crear un rol de IAM que tenía permisos en tablas no asociadas con la aplicación del administrador. El administrador de seguridad debe crear una nueva solución que evite que los administradores de aplicaciones obtengan permisos en tablas que no estén asociadas a sus aplicaciones.

  

¿Qué solución cumple con este requisito con la MENOR cantidad de esfuerzo administrativo continuo?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear políticas de IAM para denegar el acceso a tablas específicas para cada administrador. Adjuntar las políticas a los administradores correspondientes.||Sin seleccionar|Incorrecto. Se necesitaría un esfuerzo administrativo significativo para crear y administrar varias políticas de IAM para los administradores de aplicaciones. Cuando la empresa cree nuevas aplicaciones y añada nuevos administradores en el futuro, se deberán actualizar todas las políticas de denegación existentes y se deberán crear otras nuevas. Una solución mejor sería utilizar un único límite de permisos para limitar los permisos de los administradores de la aplicación.<br><br>  <br><br>Para obtener más información sobre las políticas de IAM, consulte [Políticas y permisos en IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies.html) .|
|B. Cree una política basada en recursos que indique el administrador apropiado como la entidad principal para cada aplicación. Aplicar la política basada en recursos a las tablas de DynamoDB según sea necesario.||Sin seleccionar|Incorrecto. Una política basada en recursos es una política que está integrada en un objeto de servicio de AWS. Las políticas basadas en recursos incluyen un elemento principal para especificar qué identidades de IAM pueden acceder a ese recurso. Sin embargo, las políticas basadas en recursos no están disponibles para las tablas de DynamoDB.<br><br>  <br><br>Para obtener más información sobre las políticas de DynamoDB, consulte [Cómo funciona Amazon DynamoDB con IAM](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/security_iam_service-with-iam.html) .|
|C. Crear una política de límites de permisos con una declaración para cada administrador que proporcione acceso solo a sus tablas específicas. Adjuntar el límite de permisos a cada usuario.|Correcto|Sin seleccionar|Correcto. Un límite de permisos es una característica avanzada que le da la capacidad de usar una política administrada para establecer los permisos máximos que una política basada en la identidad puede conceder a una entidad de IAM (usuario o rol). Puede usar un límite de permisos para restringir los permisos que los administradores de la aplicación pueden conceder. Los administradores de la aplicación no tendrían la capacidad de crear un rol de IAM con permisos en ninguna tabla, excepto en aquellas para las que tienen permisos. Una sola política de límite de permisos requeriría menos esfuerzo administrativo que varias políticas.<br><br>  <br><br>Para obtener más información sobre los límites de permisos, consulte [Límites de permisos para las entidades de IAM](https://docs.aws.amazon.com/IAM/latest/UserGuide/access_policies_boundaries.html) .|
|D. Crear una política de límites de permisos con una declaración para cada administrador que proporcione acceso solo a sus tablas específicas. Adjuntar el límite de permisos al grupo de DynamoDBAdmins.||Seleccionado|Incorrecto. Un límite de permisos es una característica avanzada que le da la capacidad de usar una política administrada para establecer los permisos máximos que una política basada en la identidad puede conceder a una entidad de IAM (usuario o rol). Puede usar un límite de permisos para limitar los permisos que los administradores de aplicaciones pueden conceder. A los administradores no se les permitiría crear un rol de IAM con permisos en ninguna tabla, excepto en aquellas para las que tienen permisos. Sin embargo, puede adjuntar límites de permisos solo a un usuario o rol, no a un grupo.|

## Pregunta 4

Selección múltiple

Tiempo de respuesta:

1 minutos 17 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa tiene una serie de funciones de AWS Lambda que realizan una serie compleja de actividades de procesamiento. Las funciones deben ejecutarse en un orden específico. Por lo general, todo el flujo de trabajo termina en unos segundos, y el flujo de trabajo siempre termina en menos de 20 segundos. Una sola llamada a la API REST de Amazon API Gateway gestiona las solicitudes de procesamiento. La API REST requiere una respuesta cuando se finaliza la solicitud. Es posible procesar varias solicitudes al mismo tiempo. El código de API Gateway reutiliza el mismo nombre de ejecución cada vez que se llama al flujo de trabajo. La empresa está pensando en obtener AWS Step Functions como una solución para crear y administrar el flujo de trabajo.

  

¿Qué solución cumplirá con estos requisitos?

Nivel de confianza

No lo sé

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear una máquina de estado de flujo de trabajo estándar de Step Functions. Invocar la máquina de estado mediante la ejecución asincrónica.||Sin seleccionar|Incorrecto. Step Functions es un servicio sin servidor que combina funciones de Lambda y otros servicios de AWS para crear aplicaciones empresariales. Sin embargo, la ejecución asincrónica no proporcionaría la respuesta inmediata que requiere API Gateway.|
|B. Crear una máquina de estado de flujo de trabajo exprés de Step Functions. Invocar la máquina de estado mediante la ejecución sincrónica.|Correcto|Sin seleccionar|Correcto. Step Functions es un servicio sin servidor que combina funciones de Lambda y otros servicios de AWS para crear aplicaciones empresariales. Un flujo de trabajo exprés permitiría múltiples solicitudes simultáneas. La ejecución sincrónica esperaría a que finalizara el flujo de trabajo para devolver la respuesta a API Gateway.<br><br>  <br><br>Para obtener más información sobre las garantías de ejecución de Step Functions, consulte [Garantías de ejecución](https://docs.aws.amazon.com/step-functions/latest/dg/express-at-least-once-execution.html) .<br><br>  <br><br>Para obtener más información acerca de los flujos de trabajo exprés sincrónicos y asincrónicos, consulte [Flujos de trabajo exprés sincrónicos y asincrónicos](https://docs.aws.amazon.com/step-functions/latest/dg/concepts-express-synchronous.html) .|
|C. Crear una máquina de estado de flujo de trabajo estándar de Step Functions. Invocar la máquina de estado mediante la ejecución sincrónica.||Seleccionado|Incorrecto. Step Functions es un servicio sin servidor que combina funciones de Lambda y otros servicios de AWS para crear aplicaciones empresariales. Sin embargo, una máquina de estado de flujo de trabajo estándar no admite varias ejecuciones simultáneas con el mismo nombre. Este escenario requeriría varias ejecuciones simultáneas para procesar varias solicitudes al mismo tiempo.|
|D. Crear una máquina de estado de flujo de trabajo exprés de Step Functions. Invocar la máquina de estado mediante la ejecución asincrónica.||Sin seleccionar|Incorrecto. Step Functions es un servicio sin servidor que combina funciones de Lambda y otros servicios de AWS para crear aplicaciones empresariales. Sin embargo, la ejecución asincrónica no proporcionaría la respuesta inmediata que requiere API Gateway.|

## Pregunta 5

Selección múltiple

Tiempo de respuesta:

59 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa meteorológica mundial quiere migrar su aplicación principal de análisis a AWS. La aplicación de análisis recibe miles de millones de eventos todos los días de múltiples sensores en varias ubicaciones. La empresa procesa los datos mediante un proceso de larga duración que implementa en Java para pronosticar tendencias por hora, día y semana. Algunas partes del procesamiento de datos pueden tardar más de 30 minutos.

  

Cuando finaliza el procesamiento de datos, la empresa almacena los datos en una base de datos MySQL, donde puede recuperarlos para su posterior análisis. A medida que aumenta la cantidad de datos meteorológicos, la aplicación de análisis existente que pronostica las tendencias experimenta tiempos de recuperación de datos más largos. La interacción con la base de datos debe ser significativamente más rápida para cumplir con un nuevo acuerdo de nivel de servicios.

  

¿Qué estrategia de migración cumplirá con estos requisitos con el tiempo de recuperación de datos MÁS RÁPIDO?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Refactorizar la capa de aplicación a AWS Lambda. Refactorizar la capa de la base de datos en Amazon Timestream.||Sin seleccionar|Incorrecto. Lambda es un servicio de cómputo sin servidor. Lambda es más adecuado para cargas de trabajo más cortas e impulsadas por eventos porque las funciones de Lambda tienen una duración limitada. Esta limitación hace que Lambda sea inapropiado para procesos de larga duración.<br><br>  <br><br>Para obtener más información sobre Lambda, consulte [¿Cuándo debo usar Lambda?](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#when-to-use-cloud-functions) <br><br>  <br><br>Para obtener más información sobre Timestream, consulte [¿Qué es Amazon Timestream?](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)|
|B. Redefinir la plataforma de la capa de aplicación mediante la creación de contenedores en Amazon Elastic Container Service (Amazon ECS). Refactorizar la capa de la base de datos en Amazon Timestream.|Correcto|Sin seleccionar|Correcto. Amazon ECS es un servicio de administración de contenedores que admite procesos de larga ejecución. Este tipo de patrón de acceso y datos meteorológicos de Internet de las cosas es adecuado para una base de datos de serie temporal. Timestream es una base de datos de serie temporal rápida, escalable, completamente administrada y creada específicamente que le brinda la capacidad de almacenar y analizar billones de puntos de datos de serie temporal cada día. Timestream puede ser hasta mil veces más rápida que una base de datos relacional.<br><br>  <br><br>Para obtener más información sobre Amazon ECS, consulte [¿Qué es Amazon Elastic Container Service?](https://docs.aws.amazon.com/AmazonECS/latest/developerguide/Welcome.html) <br><br>  <br><br>Para obtener más información sobre Timestream, consulte [¿Qué es Amazon Timestream?](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)|
|C. Refactorizar la capa de aplicación a AWS Lambda. Redefinir la plataforma de la capa de la base de datos a Amazon Aurora Serverless.||Seleccionado|Incorrecto. Lambda es un servicio de cómputo sin servidor. Lambda es más adecuado para cargas de trabajo más cortas e impulsadas por eventos porque las funciones de Lambda tienen una duración limitada. Esta limitación hace que Lambda sea inapropiado para procesos de larga duración. Este tipo de patrón de acceso y datos meteorológicos de Internet de las cosas es adecuado para una base de datos de serie temporal. Timestream es una base de datos de serie temporal rápida, escalable, completamente administrada y creada específicamente que le brinda la capacidad de almacenar y analizar billones de puntos de datos de serie temporal cada día. Timestream puede ser hasta mil veces más rápida que una base de datos relacional.<br><br>  <br><br>Para obtener más información sobre Lambda, consulte [¿Cuándo debo usar Lambda?](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#when-to-use-cloud-functions) <br><br>  <br><br>Para obtener más información sobre Aurora Serverless, consulte [Cómo funciona Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v1.how-it-works.html) <br><br>  <br><br>Para obtener más información sobre Timestream, consulte [¿Qué es Amazon Timestream?](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)|
|D. Redefinir la plataforma de la capa de aplicación mediante la creación de contenedores en Amazon Elastic Kubernetes Service (Amazon EKS). Redefinir la plataforma de la capa de la base de datos a Amazon Aurora Serverless.||Sin seleccionar|Incorrecto. Aurora Serverless es una configuración de escalado automático bajo demanda para Aurora. Sin embargo, la aplicación meteorológica utiliza datos de serie temporal que son más adecuados para una base de datos de serie temporal. Timestream puede ser hasta mil veces más rápida que una base de datos relacional.<br><br>  <br><br>Para obtener más información sobre Amazon EKS, consulte [¿Qué es Amazon EKS?](https://docs.aws.amazon.com/eks/latest/userguide/what-is-eks.html) <br><br>  <br><br>Para obtener más información sobre Aurora Serverless, consulte [Cómo funciona Aurora Serverless v1](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-serverless-v1.how-it-works.html) .<br><br>  <br><br>Para obtener más información sobre Timestream, consulte [¿Qué es Amazon Timestream?](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)  [](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html)|

## Pregunta 6

Selección múltiple

Tiempo de respuesta:

2 minutos 26 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa utiliza AWS Organizations para administrar sus cuentas. La empresa desea prohibir el uso de servicios no aprobados en las cuentas de AWS de producción. La empresa también desea reducir otros gastos generales de administración a medida que aumenta el número de cuentas.

  

¿Qué método cumplirá con estos requisitos?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear una nueva organización solamente mediante la habilitación de la facturación unificada. Crear dos nuevas OU. Una OU es para cuentas de producción, y la otra es para cuentas de no producción. En la nueva organización, se debe crear un rol de IAM que se aplique a cada subcuenta de producción para denegar el acceso a los servicios que no están aprobados.||Sin seleccionar|Incorrecto. La administración de roles de IAM en todas las cuentas puede llevar mucho tiempo. Cada vez que se agregue un nuevo servicio, deberá incluirlo en una lista de permitidos. Además, las personas con roles que permiten ediciones de IAM pueden anular el rol de IAM.<br><br>Para obtener más información sobre las políticas de SCP e IAM, consulte [¿Cuál es la diferencia entre una política de control de servicios y una política de IAM de AWS Organizations?](https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/)  [https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/](https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/)|
|B. Crear una nueva organización con todas las características habilitadas. Crear dos nuevas OU. Una OU es para cuentas de producción, y la otra es para cuentas de no producción. En la nueva organización, se debe crear un rol de IAM que se aplique a cada subcuenta de producción para denegar el acceso a los servicios que no están aprobados.||Sin seleccionar|Incorrecto. La administración de roles de IAM en todas las cuentas puede llevar mucho tiempo. Cada vez que se agregue un nuevo servicio, deberá incluirlo en una lista de permitidos. Además, las personas con roles que permiten ediciones de IAM pueden anular el rol de IAM.<br><br>Para obtener más información sobre las políticas de SCP e IAM, consulte [¿Cuál es la diferencia entre una política de control de servicios y una política de IAM de AWS Organizations?](https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/)  [https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/](https://aws.amazon.com/premiumsupport/knowledge-center/iam-policy-service-control-policy/)|
|C. Crear una nueva organización con todas las características habilitadas. Crear dos nuevas OU. Una OU es para cuentas de producción, y la otra es para cuentas de no producción. En la nueva organización, se debe crear una SCP que deniegue el acceso a los servicios que no están aprobados. Aplicar la SCP a la OU de producción.|Correcto|Sin seleccionar|Correcto. Cuando aplica una SCP a la OU que incluye cuentas de producción, puede denegar los servicios de todas las cuentas de esa OU.<br><br>  <br><br>Para obtener más información sobre las SCP, consulte [Políticas de control de servicios](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) . [https://docs.aws.amazon.com/organizations/latest/userguide/orgs\_manage\_policies\_scp.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs/_manage/_policies/_scp.html) <br><br>  <br><br>Para obtener más información sobre la administración de unidades organizativas, consulte [Administración de unidades organizativas](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_ous.html) . [https://docs.aws.amazon.com/organizations/latest/userguide/orgs\_manage\_ous.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs/_manage/_ous.html)|
|D. Crear una nueva organización solamente mediante la habilitación de la facturación unificada. Crear dos nuevas OU. Una OU es para cuentas de producción, y la otra es para cuentas de no producción. En la nueva organización, se debe crear una SCP que deniegue el acceso a los servicios que no están aprobados. Aplicar la SCP a la OU de producción.||Seleccionado|Incorrecto. No hay SCP disponibles en una organización en la que solo está habilitada la facturación unificada. Para que las SCP estén disponibles, se deben habilitar todas las características de la organización.<br><br>Para obtener más información sobre las SCP, consulte [Políticas de control de servicios](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scp.html) . [https://docs.aws.amazon.com/organizations/latest/userguide/orgs\_manage\_policies\_scp.html](https://docs.aws.amazon.com/organizations/latest/userguide/orgs/_manage/_policies/_scp.html)|

## Pregunta 7

Selección múltiple

Tiempo de respuesta:

1 minutos 4 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa ha implementado una aplicación comercial en varias regiones de AWS. La aplicación utiliza servicios REST de terceros que también se implementan en AWS en las mismas regiones que la aplicación comercial. Por motivos de seguridad, la aplicación utiliza puntos de enlace de la VPC de AWS PrivateLink para conectarse a los servicios de terceros. Recientemente, uno de los servicios de terceros comenzó a enviar respuestas de error internas. Las respuestas de error provocaron inestabilidad en la aplicación comercial en esa región. Como resultado, la empresa sufrió una gran pérdida financiera. Por eso, quiere una solución para la conmutación por error a una región secundaria si un servicio de terceros no responde correctamente en una de las regiones.

¿Qué solución cumplirá con estos requisitos?

Nivel de confianza

No lo sé

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear un _canary_ de Amazon CloudWatch Synthetics que utilice un _blueprint canary_ de API para llegar a la aplicación de terceros. Crear una alarma de CloudWatch en el _canary_ en función del número de intentos fallidos por minuto. Configurar el DNS de Amazon Route 53 con comprobaciones de estado para realizar un seguimiento del estado de la alarma y realizar una conmutación por error a una región secundaria.|Correcto|Sin seleccionar|Correcto. Puede usar CloudWatch Synthetics para crear _canaries_, que son _scripts_ configurables que se ejecutan de forma programada para monitorear los puntos de enlace y las API. Puede crear una API _canary_ con un método GET para determinar si el servicio de terceros responde como se espera. Route 53 puede realizar un seguimiento del estado de la alarma y hacer una conmutación por error a una región secundaria si es necesario.<br><br>  <br><br>Para obtener más información sobre el monitoreo sintético, consulte [Uso del monitoreo sintético](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html) .<br><br>  <br><br>Para obtener más información sobre _blueprints de canary_, consulte [Uso de proyectos de canaries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html) .<br><br>  <br><br>Para obtener más información sobre las comprobaciones de estado de Route 53, consulte [Tipos de comprobaciones de estado de Amazon Route 53](https://docs.aws.amazon.com/Route53/latest/DeveloperGuide/health-checks-types) .|
|B. Crear un _canary_ de Amazon CloudWatch Synthetics que utilice un _blueprint_ de monitoreo de _heartbeat_ para llegar a la aplicación de terceros. Crear una alarma de CloudWatch en el _canary_ en función del número de intentos fallidos por minuto. Configurar el DNS de Amazon Route 53 con comprobaciones de estado para realizar un seguimiento del estado de la alarma y realizar una conmutación por error a una región secundaria.||Sin seleccionar|Incorrecto. Puede usar CloudWatch Synthetics para crear _canaries_, que son _scripts_ configurables que se ejecutan de forma programada para monitorear los puntos de enlace y las API. Sin embargo, un monitoreo de _heartbeat_ intentaría llegar solo al objetivo. El monitoreo no podría determinar si el servicio de terceros responde con un mensaje de error interno. Puede crear una API _canary_ con un método GET, que sería un método mejor para determinar si el servicio de terceros responde como se espera.<br><br>  <br><br>Para obtener más información sobre el monitoreo sintético, consulte [Uso del monitoreo sintético](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries.html) .<br><br>  <br><br>Para obtener más información sobre _blueprints de canary_, consulte [Uso de proyectos de canaries](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Synthetics_Canaries_Blueprints.html) .|
|C. Transmitir los registros de la aplicación comercial a Amazon CloudWatch. Crear una alarma de CloudWatch a partir de los registros en función del tiempo de respuesta para determinar si el servicio de terceros no responde. Configurar el DNS de Amazon Route 53 con comprobaciones de estado para realizar un seguimiento del estado de alarma de CloudWatch y realizar la conmutación por error a la región secundaria.||Sin seleccionar|Incorrecto. Esta solución solo comprueba si hay una respuesta de la aplicación de terceros. En este caso, la aplicación recibe una respuesta del servicio, pero la respuesta es un mensaje de error interno. Esta solución no activaría una alarma basada en la respuesta vacía de la aplicación de terceros.<br><br>  <br><br>Para obtener más información sobre cómo crear métricas a partir de eventos de registro mediante filtros, consulte [Creación de métricas a partir de eventos de registro mediante filtros](https://docs.aws.amazon.com/AmazonCloudWatch/latest/logs/MonitoringLogData.html) .|
|D. Activar los registros de flujo de la VPC y configurar los registros para publicarlos en Amazon CloudWatch Logs. Crear una alarma de CloudWatch en CloudWatch Logs en función de las solicitudes rechazadas del punto de enlace de la VPC. Configurar el DNS de Amazon Route 53 con comprobaciones de estado para realizar un seguimiento del estado de la alarma y realizar una conmutación por error a una región secundaria.||Seleccionado|Incorrecto. Los registros de flujo de VPC capturan solicitudes de tráfico de red. Sin embargo, los registros de flujo de VPC no tendrían información sobre el contenido de la respuesta del servicio de terceros.<br><br>  <br><br>Para obtener más información sobre el registro y el monitoreo de la VPC, consulte [Registro y monitoreo en su VPC](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs.html) .|

## Pregunta 8

Selección múltiple

Tiempo de respuesta:

51 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa desarrolló una aplicación de tres niveles en AWS. Los dos primeros niveles consisten en una aplicación web empresarial Java y una aplicación de procesamiento de pedidos. Ambas aplicaciones se ejecutan en grupos de Amazon EC2 Auto Scaling que la empresa implementó en varias zonas de disponibilidad. La aplicación de procesamiento de pedidos es un programa independiente complejo. Por lo general, la aplicación de procesamiento de pedidos finaliza en unos minutos. Sin embargo, para pedidos grandes, el procesamiento puede tardar horas. El nivel de base de datos consiste en una base de datos MySQL que se ejecuta en instancias de EC2. La empresa quiere reducir la cantidad de servidores que administra.

  

¿Qué solución cumplirá con estos requisitos?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Volver a alojar la aplicación web para que se ejecute como un servicio de AWS App Runner basado en el código fuente. Utilizar el código de la aplicación web existente como fuente. Convertir la aplicación de procesamiento de pedidos para que utilice las funciones de AWS Lambda. Convertir la base de datos en una base de datos de Amazon Aurora.||Sin seleccionar|Incorrecto. AWS Lambda es más adecuado para cargas de trabajo más cortas e impulsadas por eventos porque las funciones de Lambda tienen una duración limitada. En este escenario, Lambda no sería apropiado porque, a veces, puede tardar varias horas en procesar los pedidos.<br><br>  <br><br>Para obtener más información sobre cuándo usar Lambda, consulte [¿Qué es AWS Lambda?](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#when-to-use-cloud-functions)|
|B. Retener la aplicación web en el grupo de EC2 Auto Scaling existente. Convertir la aplicación de procesamiento de pedidos en un contenedor y ejecutarla en AWS Fargate. Convertir la base de datos en una base de datos de Amazon Aurora.||Sin seleccionar|Incorrecto. Admitiría la aplicación web empresarial Java para volver a formar la aplicación web en instancias de EC2. Sin embargo, la empresa quiere reducir la cantidad de servidores que administra. Una solución mejor sería una opción sin servidor, como App Runner, para alojar la aplicación web.<br><br>  <br><br>Para obtener más información sobre App Runner, consulte [¿Qué es AWS App Runner?](https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html) <br><br>  <br><br>Para obtener más información sobre los servicios de App Runner basados en código, consulte [Servicio de App Runner en función del código fuente](https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code.html) .|
|C. Retener la aplicación web en el grupo de EC2 Auto Scaling existente. Convertir la aplicación de procesamiento de pedidos para que utilice las funciones de AWS Lambda. Convertir la base de datos en una base de datos MySQL de Amazon RDS.||Seleccionado|Incorrecto. Lambda es más adecuado para cargas de trabajo más cortas e impulsadas por eventos porque las funciones de Lambda tienen una duración limitada. En este escenario, Lambda no sería apropiado porque, a veces, puede tardar varias horas en procesar los pedidos.<br><br>  <br><br>Para obtener más información sobre cuándo usar Lambda, consulte [¿Qué es AWS Lambda?](https://docs.aws.amazon.com/lambda/latest/dg/welcome.html#when-to-use-cloud-functions)|
|D. Volver a alojar la aplicación web para que se ejecute como un servicio de AWS App Runner basado en el código fuente. Utilizar el código de la aplicación web existente como fuente. Convertir la aplicación de procesamiento de pedidos en un contenedor y ejecutarla en AWS Fargate. Convertir la base de datos en una base de datos MySQL de Amazon RDS.|Correcto|Sin seleccionar|Correcto. App Runner es un servicio de AWS que proporciona una forma rápida, sencilla y rentable de implementar desde el código fuente o una imagen de contenedor directamente en una aplicación web escalable y segura en la nube de AWS. Una solución que cree un contenedor y ejecute la aplicación de procesamiento de pedidos existente en AWS Fargate eliminaría la administración de servidores para la aplicación de procesamiento de pedidos. Una solución que convierta la base de datos en una base de datos MySQL de Amazon RDS eliminaría la administración de servidores para el nivel de la base de datos. Esta solución requeriría muy poco esfuerzo de desarrollo para su implementación.<br><br>  <br><br>Para obtener más información sobre App Runner, consulte [¿Qué es AWS App Runner?](https://docs.aws.amazon.com/apprunner/latest/dg/what-is-apprunner.html) <br><br>  <br><br>Para obtener más información sobre los servicios de App Runner basados en código, consulte [Servicio de App Runner en función del código fuente](https://docs.aws.amazon.com/apprunner/latest/dg/service-source-code.html) .<br><br>  <br><br>Para obtener más información sobre AWS Fargate, consulte [¿Qué es AWS Fargate?](https://docs.aws.amazon.com/AmazonECS/latest/userguide/what-is-fargate.html) <br><br>  <br><br>Para obtener más información sobre Amazon RDS, consulte [¿Qué es Amazon Relational Database Service (Amazon RDS)?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)  [](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)|

## Pregunta 9

Selección múltiple

Tiempo de respuesta:

54 segundos

Estado de la respuesta:

Correcto

Pregunta

Una empresa tiene un proceso de análisis de larga duración que se ejecuta en las instalaciones. La infraestructura actual consiste en un clúster de servidores de alto rendimiento que se conectan a través de una red de fibra de baja latencia. La infraestructura actual debe ser objeto de una importante actualización de hardware, lo que requerirá un aumento grande del presupuesto. La empresa está considerando migrar el proceso de análisis a AWS. Un arquitecto de soluciones debe recomendar una solución para replicar la arquitectura en las instalaciones en AWS.

  

¿Qué solución cumpliría con estos requisitos de forma MÁS rentable?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear Amazon EC2 Fleet en un grupo de ubicación en clúster con instancias reservadas.|Correcto|Seleccionado|Correcto. Un grupo de ubicación en clúster proporcionaría las comunicaciones de baja latencia necesarias. Las instancias reservadas serían la opción más rentable para un procesamiento de análisis consistente y de larga duración.<br><br>  <br><br>Para obtener más información sobre los grupos de ubicación de EC2, consulte [Grupos de ubicación](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/placement-groups.html) <br><br>  <br><br>Para obtener más información sobre las instancias reservadas, consulte [Instancias reservadas](https://docs.aws.amazon.com/AWSEC2/latest/UserGuide/ec2-reserved-instances.html) .|
|B. Crear Amazon EC2 Fleet en un grupo de ubicación de particiones con instancias reservadas.||Sin seleccionar|Incorrecto. Un grupo de ubicación de particiones no proporcionaría las comunicaciones de baja latencia necesarias. Un grupo de ubicación en clúster sería una mejor solución.|
|C. Crear Amazon EC2 Fleet en un grupo de ubicación en clúster con instancias tipo spot.||Sin seleccionar|Incorrecto. Un grupo de ubicación en clúster proporcionaría las comunicaciones de baja latencia necesarias. Sin embargo, dado que el proceso de análisis es de larga duración, las instancias tipo spot no serían la mejor opción porque podrían detenerse en cualquier momento. Las instancias reservadas serían una mejor solución.|
|D. Crear Amazon EC2 Fleet en un grupo de ubicación de particiones con instancias tipo spot.||Sin seleccionar|Incorrecto. Un grupo de ubicación de particiones no proporcionaría las comunicaciones de baja latencia necesarias. Un grupo de ubicación en clúster sería una mejor solución.|

## Pregunta 10

Selección múltiple

Tiempo de respuesta:

33 segundos

Estado de la respuesta:

Correcto

Pregunta

Un arquitecto de soluciones está diseñando una aplicación para una empresa de investigación. La aplicación realizará varios cálculos matemáticos complejos todas las noches. Cada cálculo es independiente de los demás. Terminar de ejecutar cada cálculo puede llevar varias horas.

  

El diseño de la aplicación debe reducir los costos y las interdependencias. Los cálculos deben realizarse en paralelo.

  

¿Qué debe hacer el arquitecto de soluciones para cumplir estos requisitos?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Enviar los cálculos a AWS Batch como trabajos. Ejecutar los trabajos en contenedores independientes en Amazon Elastic Container Service (Amazon ECS).|Correcto|Seleccionado|Correcto. AWS Batch aprovisionará los recursos necesarios de forma automática y los terminará cuando finalice el trabajo.<br><br>  <br><br>Para obtener más información sobre AWS Batch, consulte [AWS Batch](https://aws.amazon.com/batch/) . [https://aws.amazon.com/batch/](https://aws.amazon.com/batch/)|
|B. Enviar cada cálculo a una API de Amazon API Gateway. Utilizar las funciones de AWS Lambda para realizar los cálculos.||Sin seleccionar|Incorrecto. Las funciones Lambda agotan el tiempo de espera a los 15 minutos. Terminar de ejecutar los cálculos puede llevar varias horas. El tiempo de espera impide que esta solución tenga éxito.<br><br>  <br><br>Para obtener más información sobre la configuración de Lambda, consulte [Configuración de las opciones de las funciones de Lambda](https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html) . [https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html](https://docs.aws.amazon.com/lambda/latest/dg/configuration-console.html)|
|C. Enviar cada cálculo a una instancia principal de Amazon EC2. Configurar la instancia EC2 para reenviar los cálculos a un nodo EC2 adecuado.||Sin seleccionar|Incorrecto. Esta configuración requiere que las instancias se ejecuten de forma continua. Esta solución no es la opción más rentable.<br><br>  <br><br>Para obtener más información sobre los precios de EC2, consulte [Precios de Amazon EC2](https://aws.amazon.com/ec2/pricing/) . [https://aws.amazon.com/ec2/pricing/](https://aws.amazon.com/ec2/pricing/) <br><br>  <br><br>Para obtener más información sobre los precios de Lambda, consulte [Precios de AWS Lambda](https://aws.amazon.com/lambda/pricing/) . [https://aws.amazon.com/lambda/pricing/](https://aws.amazon.com/lambda/pricing/)|
|D. Enviar cada cálculo a un Application Load Balancer (ALB, balanceador de carga de aplicaciones). Configurar el ALB para utilizar el enrutamiento basado en rutas y reenviar la solicitud a un nodo EC2 adecuado.||Sin seleccionar|Incorrecto. Esta configuración requiere que las instancias se ejecuten de forma continua. Esta solución no es la opción más rentable.<br><br>  <br><br>Para obtener más información sobre los precios de EC2, consulte [Precios de Amazon EC2](https://aws.amazon.com/ec2/pricing/) . [https://aws.amazon.com/ec2/pricing/](https://aws.amazon.com/ec2/pricing/) <br><br>  <br><br>Para obtener más información sobre los precios de Lambda, consulte [Precios de AWS Lambda](https://aws.amazon.com/lambda/pricing/) . [https://aws.amazon.com/lambda/pricing/](https://aws.amazon.com/lambda/pricing/)|

## Pregunta 11

Selección múltiple

Tiempo de respuesta:

1 minutos 3 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa implementó una aplicación que se ejecuta en instancias de Amazon EC2 detrás de un equilibrador de carga de aplicación en una única región de AWS. Las instancias de EC2 se ejecutan en un grupo de Amazon EC2 Auto Scaling y la aplicación utiliza una instancia de base de datos Multi-AZ de Amazon RDS para almacenar datos. Un arquitecto de soluciones necesita desarrollar un escenario de recuperación de desastres (DR) entre regiones para ayudar a garantizar la continuidad de la empresa. La empresa necesita tener un RTO objetivo de 3 minutos y un RPO de 30 segundos.

  

¿Qué solución cumplirá estos requisitos de la forma MÁS rentable?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Implementar un grupo de EC2 Auto Scaling con un número menor de instancias y una réplica de lectura de la instancia de base de datos de RDS en otra región de AWS. Escalar verticalmente las instancias de EC2 y promover la réplica de lectura para que se convierta en la instancia de base de datos primaria cuando sea necesario para garantizar la continuidad de la empresa. Actualizar la aplicación para que referencie a la nueva instancia de base de datos primaria.|Correcto|Sin seleccionar|Correcto. Una solución de recuperación de desastres en espera activa está diseñada para lograr un RPO en segundos y un RTO en minutos. Este enfoque cumpliría con los requisitos de la empresa.<br><br>  <br><br>Para obtener más información sobre los escenarios de recuperación ante desastres, consulte [Planificar para la recuperación de desastres (DR)](https://docs.aws.amazon.com/wellarchitected/latest/reliability-pillar/plan-for-disaster-recovery-dr.html) .|
|B. Crear instantáneas de las instancias de EC2 y una réplica de lectura de la instancia de base de datos de RDS en otra región de AWS. Iniciar las instancias de EC2 y promover la réplica de lectura para que se convierta en la instancia de base de datos primaria cuando sea necesario para garantizar la continuidad de la empresa. Actualizar la aplicación para que referencie a la nueva instancia de base de datos primaria.||Sin seleccionar|Incorrecto. Una solución de recuperación de desastres con luz piloto está diseñada para lograr un RPO en minutos y un RTO en horas. El lanzamiento de las instancias de EC2 de Windows puede tardar más de 3 minutos. Este enfoque no cumpliría con los requisitos de la empresa.|
|C. Realizar copias de seguridad de las instancias de EC2 y la instancia de base de datos de RDS mediante copias de seguridad en un momento dado en otra región. Restaurar estos datos cuando sea necesario para garantizar la continuidad de la empresa. Actualizar la aplicación para referenciar a la instancia de base de datos de la copia de seguridad.||Sin seleccionar|Incorrecto. Una solución de recuperación de desastres de copia de seguridad y restauración está diseñada para lograr un RPO en horas y un RTO en 24 horas o menos. Llevaría más de 3 minutos lanzar una instancia de base de datos de RDS desde una copia de seguridad. Esta solución no cumpliría con los requisitos de la empresa.|
|D. Implementar un grupo de EC2 Auto Scaling con el mismo número de instancias y una instancia de base de datos de RDS en otra región. Distribuir siempre el tráfico entre ambas regiones para garantizar la continuidad de la empresa. Configurar aplicaciones activo-activo e instancias de base de datos en cada región.||Seleccionado|Incorrecto. Una solución de DR activo-activo de múltiples regiones (múltiples sitios) está diseñada para lograr un RTO y un RPO casi nulos. Este enfoque cumpliría con la mayoría de los requisitos. Sin embargo, esta solución no es la más rentable y, por lo tanto, no cumple los requisitos.|

## Pregunta 12

Selección múltiple

Tiempo de respuesta:

1 minutos 5 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa tiene una gran presencia en la infraestructura de AWS. La empresa necesita crear algunas instancias de Amazon EC2 nuevas y un bucket de Amazon S3. La empresa necesita comunicaciones de latencia inferior a un segundo entre las instancias de EC2 y el bucket de S3. Los datos y las aplicaciones deben residir en hardware bajo el control físico de la empresa debido a la naturaleza confidencial de la información que esta almacena. La empresa quiere administrar todos los recursos mediante la Consola de administración de AWS y AWS CLI.

  

¿Qué configuración cumplirá con estos requisitos?

Nivel de confianza

No lo sé

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Habilitar las zonas locales de AWS para la cuenta. Agregar nuevas subredes privadas en la zona local según sea necesario. Iniciar las instancias de EC2 necesarias en la nueva subred privada. Crear el bucket de S3. Configure los puntos de enlace de la nube virtual privada (VPC) para facilitar las comunicaciones seguras entre las instancias de EC2 y el bucket de S3.||Seleccionado|Incorrecto. Las zonas locales son un tipo de implementación de infraestructura que coloca el cómputo, el almacenamiento, la base de datos y otros servicios de AWS selectos cerca de grandes centros industriales y de población. Sin embargo, si la empresa utilizara zonas locales, el hardware y los recursos no estarían bajo el control directo de la empresa. Esta solución no cumpliría con los requisitos.<br><br>  <br><br>Para obtener más información sobre las zonas locales, consulte [Ampliar una VPC a una zona local, una zona Wavelength o Outpost](https://docs.aws.amazon.com/vpc/latest/userguide/Extend_VPCs.html) .|
|B. Habilitar zonas de AWS Wavelength para la cuenta. Crear una puerta de enlace y una subred de operador según sea necesario. Iniciar las instancias de EC2 necesarias en la nueva subred. Crear el bucket de S3. Configure los puntos de enlace de la nube virtual privada (VPC) para facilitar las comunicaciones seguras entre las instancias de EC2 y el bucket de S3.||Sin seleccionar|Incorrecto. AWS Wavelength implementa servidores de cómputo y almacenamiento de AWS estándar en el borde de las redes 5G de los operadores de telecomunicaciones. Sin embargo, si la empresa utilizara AWS Wavelength, el hardware y los recursos no estarían bajo el control directo de la empresa. Esta solución no cumpliría con los requisitos.<br><br>  <br><br>Para obtener más información sobre AWS Wavelength, consulte [¿Qué es AWS Wavelength?](https://docs.aws.amazon.com/wavelength/latest/developerguide/what-is-wavelength.html)|
|C. Solicitar e instalar un rack de AWS Outposts. Crear una subred privada en el rack de Outpost. Iniciar las instancias de EC2 necesarias en la nueva subred privada. Crear el bucket de S3 en Outposts. Configurar las comunicaciones seguras entre las instancias de EC2 y el bucket de S3 mediante una conexión de punto de enlace de IP propiedad del cliente.||Sin seleccionar|Incorrecto. AWS Outposts es un servicio totalmente administrado que extiende la infraestructura, los servicios, las API y las herramientas de AWS a las instalaciones del cliente. Un rack de Outpost cumpliría con los requisitos de la empresa de retener el control sobre el hardware. Es posible implementar buckets de S3 y las instancias de EC2 en un rack de Outpost para comunicaciones de baja latencia. Sin embargo, una IP propiedad del cliente requeriría que la información confidencial transitara por la Internet pública, lo que no garantiza la seguridad.<br><br>  <br><br>Para obtener más información sobre Outposts y los recursos de AWS disponibles, consulte [¿Qué es AWS Outposts?](https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html) <br><br>  <br><br>Para obtener más información sobre las redes para Amazon S3 en Outposts, consulte [Redes para S3 en Outposts](https://docs.aws.amazon.com/AmazonS3/latest/userguide/S3OutpostsNetworking.html) .|
|D. Solicitar e instalar un rack de AWS Outposts. Crear una subred privada en el rack de Outpost. Iniciar las instancias de EC2 necesarias en la nueva subred privada. Crear el bucket de S3 en Outposts. Configurar las comunicaciones seguras entre las instancias de EC2 y el bucket de S3 mediante una conexión de punto de enlace privada.|Correcto|Sin seleccionar|Correcto. Outposts es un servicio completamente administrado que amplía la infraestructura, los servicios, las API y las herramientas de AWS a las instalaciones del cliente. Un rack de Outpost cumpliría con los requisitos de la empresa de retener el control sobre el hardware. Es posible implementar buckets de S3 y las instancias de EC2 en un rack de Outpost para comunicaciones de baja latencia. También existe una conexión privada a través de la red de AWS, lo que garantiza la seguridad de la información confidencial.<br><br>  <br><br>Para obtener más información sobre Outposts, consulte [¿Qué es AWS Outposts?](https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html) <br><br>  <br><br>Para obtener más información sobre las redes para Amazon S3 en Outposts, consulte [Redes para S3 en Outposts](https://docs.aws.amazon.com/AmazonS3/latest/userguide/S3OutpostsNetworking.html) .|

## Pregunta 13

Selección múltiple

Tiempo de respuesta:

51 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa tiene una aplicación web de tres niveles que se ejecuta en instancias de Amazon EC2 detrás de un equilibrador de carga de aplicación. Las instancias de nivel web y de aplicaciones se ejecutan en grupos de Amazon EC2 Auto Scaling. La empresa ha implementado el nivel de datos en una única instancia de EC2 que ejecuta una base de datos PostgreSQL. La empresa ya ha replicado los niveles web y de aplicaciones en una segunda región mediante el uso de CloudFormation Stacksets. La empresa administra las solicitudes de DNS mediante Amazon Route 53 con conjuntos de registros ponderados configurados. Un arquitecto de soluciones necesita diseñar una estrategia de conmutación por error en varias regiones para el nivel de datos.

  

¿Qué solución cumplirá estos requisitos con el tiempo de recuperación MÁS RÁPIDO?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Migrar la base de datos a una instancia de base de datos de Amazon RDS para PostgreSQL. Crear una réplica de lectura en una segunda región.||Sin seleccionar|Incorrecto. Amazon RDS es un servicio que permite configurar, operar y escalar una base de datos relacional en la nube de AWS. Sin embargo, sería necesario realizar un esfuerzo manual para la conmutación por error de una réplica de lectura a una segunda región. Esta solución no ofrecería el tiempo de recuperación más rápido.<br><br>Para obtener más información sobre Amazon RDS, consulte [¿Qué es Amazon Relational Database Service (Amazon RDS)?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html) <br><br>Para obtener más información sobre las réplicas de lectura, consulte [Configuración de réplicas de lectura con PostgreSQL](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/USER_PostgreSQL.Replication.ReadReplicas.html#USER_PostgreSQL.Replication.ReadReplicas.Configuration) .|
|B. Crear una segunda base de datos PostgreSQL en una instancia de EC2 de una segunda región. Implementar la alta disponibilidad activo-pasivo.||Sin seleccionar|Incorrecto. PostgreSQL no proporciona el software del sistema necesario para identificar un error en el servidor principal y notificar al servidor de base de datos en espera. Tendría que implementar herramientas adicionales para facilitar la conmutación por error.<br><br>  <br><br>Para obtener más información sobre las bases de datos relacionales en Amazon EC2 o en Amazon RDS, consulte [Amazon RDS y Amazon EC2](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html#Welcome.Concepts.RDS) .|
|C. Migrar la base de datos a una instancia de base de datos Amazon RDS para PostgreSQL con una implementación Multi-AZ.||Seleccionado|Incorrecto. Amazon RDS es un servicio que permite configurar, operar y escalar una base de datos relacional en la nube de AWS. Aunque el despliegue Multi-AZ mejora la alta disponibilidad, no sería adecuado para una estrategia multirregional, como la de esta situación.<br><br>Para obtener más información sobre Amazon RDS, consulte [¿Qué es Amazon Relational Database Service (Amazon RDS)?](https://docs.aws.amazon.com/AmazonRDS/latest/UserGuide/Welcome.html)|
|D. Migrar la base de datos a una base de datos global de Amazon Aurora. Crear un clúster de base de datos secundaria en una segunda región.|Correcto|Sin seleccionar|Correcto. Las bases de datos globales de Aurora abarcan múltiples regiones de AWS. Esta solución posibilitaría la conmutación por error rápida a otra región.<br><br>Para obtener más información sobre las bases de datos globales de Aurora, consulte [Uso de bases de datos globales de Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database.html) .<br><br>Para obtener más información sobre la recuperación ante desastres, consulte [Uso de la transición o la conmutación por error en una base de datos global de Amazon Aurora](https://docs.aws.amazon.com/AmazonRDS/latest/AuroraUserGuide/aurora-global-database-disaster-recovery.html) .|

## Pregunta 14

Selección múltiple

Tiempo de respuesta:

1 minutos 38 segundos

Estado de la respuesta:

Correcto

Pregunta

Cada equipo de desarrollo de una empresa tiene sus propias cuentas de AWS de no producción en AWS Organizations. En cada una de estas cuentas, los desarrolladores tienen usuarios de IAM en grupos de IAM para desarrolladores que conceden permisos administrativos y de costos a sus usuarios. Cada equipo de desarrollo excede su presupuesto mensual de forma habitual. La empresa quiere imponer restricciones a los equipos de desarrollo para reducir el gasto.

  

¿Qué solución impedirá que los equipos de desarrollo inicien nuevos recursos si exceden el presupuesto mensual?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. En la cuenta de administración, se debe crear un presupuesto para cada cuenta de desarrollo vinculada mediante AWS Budgets. Cuando el uso de una cuenta específica alcance 100 % del presupuesto mensual, se debe publicar en un tema de Amazon Simple Notification Service (Amazon SNS). Suscribir al tema una función de AWS Lambda que cree una nueva SCP para la cuenta a fin de denegar el lanzamiento de cualquier nueva infraestructura. Utilizar Amazon EventBridge para programar una función de Lambda que elimine esas SCP al principio de cada nuevo mes.|Correcto|Seleccionado|Correcto. Debido a que el presupuesto está en la cuenta de administración, los desarrolladores no pueden cambiarlo. Una SCP no se puede anular, aunque los usuarios tengan derechos administrativos dentro de la cuenta.<br><br>  <br><br>Para obtener más información sobre AWS Budgets, consulte [AWS Budgets](https://aws.amazon.com/aws-cost-management/aws-budgets/) .<br><br>  <br><br>Para obtener más información sobre las SCP, consulte [Políticas de control de servicios (SCP)](https://docs.aws.amazon.com/organizations/latest/userguide/orgs_manage_policies_scps.html) .|
|B. En la cuenta de administración, se debe crear un presupuesto para cada cuenta de desarrollo vinculada mediante AWS Budgets. Cuando el uso de una cuenta específica alcance 100 % del presupuesto mensual, se debe publicar en un tema de Amazon Simple Notification Service (Amazon SNS). Suscribir al tema una función de AWS Lambda que agregue una política al grupo de desarrolladores de IAM para denegar el lanzamiento de cualquier nueva infraestructura. Utilizar Amazon EventBridge para programar una función de Lambda que elimine esas políticas al principio de cada nuevo mes.||Sin seleccionar|Incorrecto. Dado que los desarrolladores tienen privilegios de administrador, podrían quitar la nueva política del grupo de IAM y continuar gastando.|
|C. En cada cuenta de desarrollo, se debe crear un presupuesto con AWS Budgets. Cuando el uso de una cuenta específica alcance 100 % del presupuesto mensual, se debe publicar en un tema de Amazon Simple Notification Service (Amazon SNS). Suscribir al tema una función de AWS Lambda que cree una nueva SCP para la cuenta a fin de denegar el lanzamiento de cualquier nueva infraestructura. Utilizar Amazon EventBridge para programar una función de Lambda que elimine esas SCP al principio de cada nuevo mes.||Sin seleccionar|Incorrecto. Con privilegios de administrador, los desarrolladores pueden desactivar AWS Budgets si está dentro de la cuenta de desarrollo.|
|D. En cada cuenta de desarrollo, se debe crear un presupuesto con AWS Budgets. Cuando el uso de una cuenta específica alcance 100 % del presupuesto mensual, se debe publicar en un tema de Amazon Simple Notification Service (Amazon SNS). Suscribir al tema una función de AWS Lambda que agregue una política al grupo de desarrolladores de IAM para denegar el lanzamiento de cualquier nueva infraestructura. Utilizar Amazon EventBridge para programar una función de Lambda que elimine esas políticas al principio de cada nuevo mes.||Sin seleccionar|Incorrecto. Con privilegios de administrador, los desarrolladores pueden desactivar AWS Budgets si está dentro de la cuenta de desarrollo.|

## Pregunta 15

Selección múltiple

Tiempo de respuesta:

59 segundos

Estado de la respuesta:

Correcto

Pregunta

Una empresa de diseño web crea y mantiene los productos de los clientes en cuentas de AWS independientes. La empresa tiene su propia cuenta de AWS y tiene acceso total para administrar las cuentas de AWS en nombre de sus clientes. A medida que aumenta el número de clientes de la empresa, el equipo de seguridad de la empresa se ve abrumado por los informes de incidentes. El equipo de seguridad necesita una forma eficaz de determinar dos cosas: el acceso a los recursos que se concede a las identidades de IAM externas y la información confidencial almacenada en Amazon S3 que es de acceso público.

  

¿Qué solución cumple estos requisitos con la MENOR sobrecarga operativa?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. En cada cuenta de cliente, crear un rol entre cuentas que publicará los hallazgos de Amazon Detective, AWS Audit Manager y Amazon Macie en un S3 bucket de la cuenta de la empresa. Invocar una función de AWS Lambda en los datos nuevos que lleguen al S3 bucket para iniciar las diversas inspecciones. Crear paneles de Amazon CloudWatch en la cuenta de la empresa mediante métricas de CloudWatch.||Sin seleccionar|Incorrecto. La solución consta de dos partes. Macie analiza S3 buckets para determinar si hay objetos públicos, _buckets_ públicos o información confidencial en Amazon S3. Los demás servicios de esta solución no proporcionarían los datos necesarios para resolver el otro problema del equipo. Puede usar Detective para la clasificación, la investigación de incidentes y la búsqueda de amenazas. Puede utilizar Audit Manager para automatizar la recopilación de pruebas y proporcionar auditorías y conformidad continuos. Ninguno de estos servicios informaría de que las identidades de IAM externas tienen acceso a los recursos.<br><br>  <br><br>Para obtener más información sobre Macie, consulte [¿Qué es Amazon Macie?](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html) <br><br>  <br><br>Para obtener más información sobre cómo invocar una función de Lambda desde Amazon S3, consulte [Tutorial: Uso de un desencadenador de Amazon S3 para invocar una función de Lambda](https://docs.aws.amazon.com/lambda/latest/dg/with-s3-example.html) .<br><br>  <br><br>Para obtener más información sobre los paneles de CloudWatch, consulte [Uso de paneles de Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html) .|
|B. En cada cuenta de cliente, crear un rol entre cuentas que publicará los hallazgos de AWS Identity and Access Management Access Analyzer, Amazon GuardDuty y Amazon Macie en un S3 bucket de la cuenta de la empresa. Invocar una función de AWS Lambda en los datos nuevos que lleguen al S3 bucket para iniciar las diversas inspecciones y crear paneles de Amazon CloudWatch en la cuenta de la empresa mediante el uso de métricas de CloudWatch.||Sin seleccionar|Incorrecto. Se necesita una sobrecarga operativa significativa para crear manualmente roles entre cuentas, funciones de Lambda y paneles de CloudWatch. Una solución mejor sería utilizar Security Hub para las integraciones automáticas.<br><br>  <br><br>Para obtener más información sobre Macie, consulte [¿Qué es Amazon Macie?](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html) <br><br>  <br><br>Para obtener más información sobre IAM Access Analyzer, consulte [Usar IAM Access Analyzer AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html) .<br><br>  <br><br>Para obtener más información sobre los paneles de CloudWatch, consulte [Uso de paneles de Amazon CloudWatch](https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch_Dashboards.html) .|
|C. Configurar AWS Organizations en la cuenta de la empresa. Invitar a todas las cuentas de clientes a una sola unidad organizativa (OU). Configurar todas las cuentas de clientes como cuentas de miembros en AWS Security Hub. Activar Amazon Macie, AWS Identity and Access Management Access Analyzer y AWS CloudTrail en la cuenta de la empresa y en todas las cuentas de clientes. Utilizar Security Hub para revisar todos los hallazgos.|Correcto|Seleccionado|Correcto. La solución consta de dos partes. IAM Access Analyzer analiza los registros de CloudTrail para determinar si se concede el acceso externo. Macie analiza S3 buckets para verificar si hay objetos públicos, _buckets_ públicos o información confidencial en Amazon S3. Los hallazgos de IAM Access Analyzer y Macie se pueden informar en Security Hub. Security Hub se integra con Organizations, por lo que puede utilizar un único panel de Security Hub para monitorear ambos problemas de seguridad en un solo lugar.<br><br>  <br><br>Para obtener más información sobre la integración de IAM Access Analyzer con Security Hub, consulte [Integración con AWS Security Hub](https://docs.aws.amazon.com/IAM/latest/UserGuide/access-analyzer-securityhub-integration.html) .<br><br>  <br><br>Para obtener más información sobre la integración de Macie con Security Hub, consulte [Integración de Amazon Macie con AWS Security Hub](https://docs.aws.amazon.com/macie/latest/user/securityhub-integration.html) .<br><br>  <br><br>Para obtener más información sobre la integración de Security Hub con Organizations, consulte [AWS Security Hub y AWS Organizations](https://docs.aws.amazon.com/organizations/latest/userguide/services-that-can-integrate-securityhub.html) .|
|D. Configurar AWS Organizations en la cuenta de la empresa. Invitar a todas las cuentas de clientes a una sola unidad organizativa (OU). Activar AWS Identity and Access Management Access Analyzer y Amazon Macie en todas las cuentas. Crear una función de AWS Lambda que genere paneles de Amazon CloudWatch. Implementar esta función según las reglas de eventos de Amazon EventBridge de los hallazgos de IAM Access Analyzer y Macie.||Sin seleccionar|Incorrecto. Si bien esta solución proporcionaría el resultado deseado, se necesita una sobrecarga operativa significativa para crear y mantener la función de Lambda y los paneles de CloudWatch. Una solución mejor es utilizar Security Hub para las integraciones automáticas.<br><br>  <br><br>Para obtener más información sobre Macie, consulte [¿Qué es Amazon Macie?](https://docs.aws.amazon.com/macie/latest/user/what-is-macie.html) <br><br>  <br><br>Para obtener más información sobre IAM Access Analyzer, consulte [Usar IAM Access Analyzer AWS](https://docs.aws.amazon.com/IAM/latest/UserGuide/what-is-access-analyzer.html) .|

## Pregunta 16

Selección múltiple

Tiempo de respuesta:

1 minutos 5 segundos

Estado de la respuesta:

Correcto

Pregunta

Una empresa está migrando una aplicación desde el centro de datos hasta la nube de AWS. Actualmente, la aplicación almacena una clave de API que se utiliza para acceder a un servicio de terceros en un archivo local. Cuando se implementa en AWS, la aplicación se ejecuta en instancias de Amazon EC2. Como parte de la migración, la aplicación debe reforzar la seguridad de la clave de API. En concreto, la aplicación tiene los siguientes requisitos:

- Cada entorno (como desarrollo, prueba y producción) debe tener su propia clave de API.
- Todas las solicitudes de acceso a claves de API deben registrarse con fines de auditoría.
- Las claves de API deben cifrarse en reposo con una clave administrada por el cliente.
- Los permisos de acceso deben ser granulares. Por ejemplo, el entorno de desarrollo no puede acceder a la clave de API de producción.

¿Cuál es la forma MÁS segura de cumplir con estos requisitos?

Nivel de confianza

Confiado

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Pasar la clave de API adecuada a cada instancia EC2 tras el lanzamiento mediante el uso de datos de usuario. Asignar un rol de IAM a cada instancia EC2 con permisos para las acciones kms:Encrypt y kms:Decrypt para una CMK de AWS Key Management Service (AWS KMS) administrada por el cliente. En el script de los datos del usuario, se debe cifrar la clave de API mediante la CMK. Almacenar la clave de API cifrada en cada instancia EC2.||Sin seleccionar|Incorrecto. La clave de API se expondría en texto sin formato en los datos de usuario de la instancia. No habría registro de acceso a la clave de API.<br><br>Para obtener más información sobre cómo almacenar credenciales, consulte [Almacene las credenciales de las aplicaciones de forma segura](https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html) . [https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html](https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html)|
|B. Crear una cadena segura en AWS Systems Manager Parameter Store para cada clave de API. Cifrar las cadenas seguras mediante una CMK de AWS Key Management Service (AWS KMS) administrada por el cliente. Crear un rol de IAM en cada entorno con permisos para la acción kms:Decrypt de la CMK y para la acción ssm:GetParameter de la clave de API adecuada. Lanzar cada instancia EC2 con el rol de IAM adecuado.|Correcto|Seleccionado|Correcto. Puede reubicar los secretos en Parameter Store, el cual proporciona jerarquías, controles de acceso y auditorías de acceso. Es preferible un rol de IAM al uso de credenciales persistentes.<br><br>Para obtener más información sobre Parameter Store, consulte [AWS Systems Manager Parameter Store](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) . [https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/systems-manager-parameter-store.html) <br><br>Para obtener más información sobre el acceso a los almacenes de parámetros, consulte [Restringir el acceso a los parámetros de Systems Manager mediante políticas de IAM](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html) . [https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/sysman-paramstore-access.html)|
|C. Crear una cadena segura en AWS Systems Manager Parameter Store para cada clave de API. Cifrar las cadenas seguras mediante una CMK de AWS Key Management Service (AWS KMS) administrada por el cliente. Crear un usuario de IAM con permisos para la acción kms:Decrypt de la CMK y para la acción ssm:GetParameter de la clave de API del entorno. Almacenar una clave de acceso para ese usuario en un almacén de credenciales en cada instancia EC2.||Sin seleccionar|Incorrecto. Las claves de acceso de los almacenes de credenciales de las instancias EC2 son de texto sin formato y persistentes. Las claves de acceso presentan un mayor riesgo de exposición que los roles de IAM, los cuales son credenciales temporales. La rotación de credenciales es más difícil que la rotación de roles, y puede dar lugar a una rotación menos frecuente.<br><br>  <br><br>Para obtener más información sobre cómo almacenar credenciales, consulte [Almacene las credenciales de las aplicaciones de forma segura](https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html) . [https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html](https://docs.aws.amazon.com/wellarchitected/latest/financial-services-industry-lens/store-application-credentials-securely.html)|
|D. Crear un volumen estándar de Amazon Elastic File System (Amazon EFS) en la región y VPC (Virtual Private Cloud) correctas de AWS. Montar el volumen de EFS en las instancias EC2. Almacenar cada clave de API en un archivo único en el volumen de EFS cifrado con una CMK de AWS Key Management Service (AWS KMS). Crear un rol de IAM en cada entorno con permisos para la acción kms:Decrypt de la CMK. Lanzar cada instancia EC2 con el rol de IAM adecuado.||Sin seleccionar|Incorrecto. Amazon EFS no proporciona los registros de auditoría obligatorios. AWS Systems Manager puede proporcionar los registros de auditoría obligatorios.<br><br>  <br><br>Para obtener más información sobre los registros y Systems Manager, consulte [Envío de registros de SSM Agent a CloudWatch Logs](https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-ssm-agent.html) . [https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-ssm-agent.html](https://docs.aws.amazon.com/systems-manager/latest/userguide/monitoring-ssm-agent.html)|

## Pregunta 17

Selección múltiple

Tiempo de respuesta:

55 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa ejecuta una aplicación confidencial en instancias de Amazon EC2 de una VPC. La empresa desea monitorear y analizar el tráfico de red en busca de posibles amenazas. La solución debe escalarse para acomodarse a grandes cantidades de tráfico de red. Además, la solución debe ofrecer la posibilidad de consultar y visualizar los datos.

¿Qué solución cumplirá estos requisitos con la MENOR sobrecarga operativa?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Utilizar Amazon Kinesis Data Streams para capturar archivos de registro en Amazon CloudWatch. Utilizar Amazon Data Firehose para enviar los archivos de registro a Amazon S3. Crear una tabla externa en Amazon Athena para consultar los archivos de registro. Conectarse a Amazon Athena desde Amazon QuickSight para visualizar los datos.||Seleccionado|Incorrecto. No es necesario utilizar Kinesis Data Streams ni Firehose para insertar registros en Amazon S3. Puede publicar registros de flujo de VPC directamente en Amazon S3. Esta solución agrega más sobrecarga operativa.<br><br>  <br><br>Para obtener más información sobre la publicación de registros de flujo de VPC en Amazon S3, consulte [Publicar registros de flujo en Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) . [https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html)|
|B. Crear un registro de flujo de VPC. Publicar el registro de flujo en una tabla de Amazon DynamoDB. Utilizar una función de AWS Lambda para leer los datos en la transmisión de DynamoDB y escribir los datos de registro en una tabla de Amazon Aurora. Conectar la base de datos a Amazon QuickSight para visualizar los datos.||Sin seleccionar|Incorrecto. Uno de los objetivos de la solución es reducir la sobrecarga operativa. Si los registros se publican en DynamoDB y, a continuación, Lambda los transfiere a Aurora, se produce una sobrecarga operativa significativa para que los registros lleguen a un estado en el cual se puedan consultar. La solución de publicar directamente en Amazon S3 y utilizar Athena para consultar los archivos reducirá la sobrecarga operativa.<br><br>  <br><br>Para obtener más información sobre Athena, consulte [Conexión a orígenes de datos](https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html) . [https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html](https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html)|
|C. Crear un registro de flujo de VPC. Publicar el registro de flujo en un bucket de Amazon S3. Crear una tabla externa en Amazon Athena para consultar los archivos de registro. Conectarse a Amazon Athena desde Amazon QuickSight para visualizar los datos.|Correcto|Sin seleccionar|Correcto. Esta solución utiliza AWS Managed Services y componentes sin servidor que reducen la sobrecarga operativa. Además, esta solución es automáticamente escalable.<br><br>  <br><br>Para obtener más información sobre los registros de flujo de VPC, consulte [Registros de flujo de VPC](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html) . [http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html](http://docs.aws.amazon.com/AmazonVPC/latest/UserGuide/flow-logs.html) <br><br>  <br><br>Para obtener más información sobre Athena, consulte [Conexión a orígenes de datos](https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html) . [https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html](https://docs.aws.amazon.com/athena/latest/ug/work-with-data-stores.html)|
|D. Crear un registro de flujo de VPC. Publicar el registro de flujo en una aplicación Apache Spark en memoria que se ejecuta en un clúster de Amazon EMR. Conectarse al clúster desde Amazon QuickSight para visualizar los datos mediante Spark SQL.||Sin seleccionar|Incorrecto. Uno de los objetivos de la solución es reducir la sobrecarga operativa. La creación de una aplicación Spark requiere mucho más esfuerzo que publicar directamente en Amazon S3. Una mejor opción es utilizar Athena para consultar los archivos.<br><br>  <br><br>Para obtener más información sobre cómo publicar registros de flujo de VPC en Amazon S3, consulte [Publicar registros de flujo en Amazon S3](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html) . [https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html](https://docs.aws.amazon.com/vpc/latest/userguide/flow-logs-s3.html)|

## Pregunta 18

Selección múltiple

Tiempo de respuesta:

36 segundos

Estado de la respuesta:

Incorrecto

Pregunta

Una empresa minorista almacena los datos de ventas de millones de productos en una base de datos MySQL que se ejecuta en instancias de Amazon EC2. A medida que aumenta la cantidad de productos, la empresa observa una degradación del rendimiento en la base de datos. Debido a los malos pronósticos de demanda, la empresa con frecuencia se queda sin productos. Para evitar la pérdida de ventas como resultado de la escasez de productos, la empresa quiere automatizar la creación de pronósticos de demanda mediante el uso de análisis. La empresa está evaluando otras opciones de bases de datos administradas de AWS. La empresa tiene los siguientes requisitos:

- Realizar análisis de los datos entrantes cada minuto.
- Reconocer las tendencias de comportamiento de los consumidores, como las visitas diarias a la página, la tasa de abandono del carrito y los pedidos semanales, según las funciones agregadas, derivadas y de correlación.
- Almacenar de manera eficiente cientos de terabytes de datos, entre los que se incluyen datos actuales e históricos, para optimizar el rendimiento.

¿Qué solución cumplirá estos requisitos con la MENOR sobrecarga operativa?

Nivel de confianza

Suposición fundamentada

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Crear una sola tabla de Amazon Timestream para los datos actuales e históricos.|Correcto|Sin seleccionar|Correcto. Timestream es una base de datos de serie temporal rápida, escalable y sin servidor. Timestream incorpora análisis de serie temporal que admiten funciones de serie temporal y pueden ayudar a identificar las tendencias de comportamiento de los consumidores. Timestream puede almacenar cientos de terabytes de datos. Timestream simplifica la administración del ciclo de vida de los datos con un almacén de memoria para los datos recientes y un almacén magnético para los datos históricos. Timestream puede programar consultas de forma periódica y automática para realizar análisis en tiempo real de los datos entrantes. Esta solución cumple con todos los requisitos.<br><br>  <br><br>Para obtener más información sobre Timestream, consulte [¿Qué es Amazon Timestream?](https://docs.aws.amazon.com/timestream/latest/developerguide/what-is-timestream.html) <br><br>  <br><br>Para obtener más información sobre las funciones de serie temporal admitidas, consulte [Funciones de serie temporal](https://docs.aws.amazon.com/timestream/latest/developerguide/timeseries-specific-constructs.functions.html) .<br><br>  <br><br>Para obtener más información sobre los niveles de almacenamiento de datos, consulte [Almacenamiento](https://docs.aws.amazon.com/timestream/latest/developerguide/storage.html) .<br><br>  <br><br>Para obtener más información sobre las características de consultas programadas de Timestream, consulte [Consultas programadas](https://docs.aws.amazon.com/timestream/latest/developerguide/scheduledqueries.html) [.](https://docs.aws.amazon.com/timestream/latest/developerguide/scheduledqueries.html)|
|B. Crear múltiples tablas estándar de Amazon DynamoDB para separar los datos actuales e históricos.||Sin seleccionar|Incorrecto. Puede gestionar datos de serie temporal creando una tabla de DynamoDB para cada período. Sin embargo, esta solución añadiría la sobrecarga operativa necesaria para crear y utilizar adecuadamente estas tablas. Además, DynamoDB no tendrá la capacidad de analizar directamente las tendencias que requieren el uso de funciones de serie temporal, como derivadas y correlaciones. Esta solución requerirá la implementación adicional de la funcionalidad de análisis deseada. Timestream tiene análisis de serie temporal que se adaptan mejor a este caso de uso.<br><br>  <br><br>Para obtener más información sobre DynamoDB y los datos de serie temporal, consulte [Prácticas recomendadas para administrar los datos de serie temporal en DynamoDB](https://docs.aws.amazon.com/amazondynamodb/latest/developerguide/bp-time-series.html) .|
|C. Crear una tabla de Amazon Timestream para los datos actuales y una colección de Amazon DocumentDB para los datos históricos.||Seleccionado|Incorrecto. Timestream es una base de datos de serie temporal rápida, escalable y sin servidor. Timestream incorpora análisis de serie temporal que admiten funciones de serie temporal y pueden ayudar a identificar las tendencias de comportamiento de los consumidores. Timestream puede almacenar cientos de terabytes de datos. Simplifica la administración del ciclo de vida de los datos con un almacén de memoria para los datos recientes y un almacén magnético para los datos históricos. Sin embargo, una colección de Amazon DocumentDB no puede almacenar cientos de terabytes de datos históricos. Esta solución también añadirá la sobrecarga operativa necesaria para transferir los datos de la tabla Timestream a una colección de Amazon DocumentDB.<br><br>  <br><br>Para obtener más información sobre Amazon DocumentDB, consulte [Qué es Amazon DocumentDB (compatible con MongoDB)](https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html) .|
|D. Crear una única colección de Amazon DocumentDB para los datos actuales e históricos.||Sin seleccionar|Incorrecto. Amazon DocumentDB puede gestionar datos de serie temporal en una sola colección. Sin embargo, Amazon DocumentDB no puede escalar a cientos de terabytes de almacenamiento de datos. Además, Amazon DocumentDB no podrá analizar directamente las tendencias que requieren el uso de funciones de serie temporal, como derivados y correlaciones. Timestream tiene análisis de serie temporal que se adaptan mejor a este caso de uso.<br><br>  <br><br>Para obtener más información sobre Amazon DocumentDB, consulte [Qué es Amazon DocumentDB (compatible con MongoDB)](https://docs.aws.amazon.com/documentdb/latest/developerguide/what-is.html) .|

## Pregunta 19

Selección múltiple

Tiempo de respuesta:

49 segundos

Estado de la respuesta:

Correcto

Pregunta

Una empresa aloja varias aplicaciones web públicas en la nube de AWS. La empresa quiere dar a sus empleados la posibilidad de trabajar desde casa. Los empleados deben tener acceso a las aplicaciones de la empresa. Además, necesitan acceso a una variedad de aplicaciones de escritorio de Microsoft Windows desde las computadoras domésticas que utilizan habitualmente para trabajar.

  

¿Qué solución cumplirá estos requisitos con la MENOR sobrecarga operativa?

Nivel de confianza

No lo sé

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Implementar Amazon WorkSpaces para alojar un escritorio de Windows para cada usuario. Instalar el software de escritorio necesario. Solicitar a los usuarios que accedan al escritorio desde el cliente de Amazon WorkSpaces en sus dispositivos domésticos.|Correcto|Seleccionado|Correcto. Puede usar WorkSpaces a fin de aprovisionar escritorios virtuales para los usuarios. WorkSpaces elimina la necesidad de adquirir e implementar hardware o de instalar software complejos. Los usuarios pueden acceder a sus escritorios virtuales desde varios dispositivos o navegadores web. Puede configurar WorkSpaces para actualizar automáticamente el software, incluidos los parches del sistema operativo. Esta es la solución con la menor sobrecarga operativa.<br><br>Para obtener más información sobre WorkSpaces, consulte [¿Qué es Amazon WorkSpaces?](https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html)  [](https://docs.aws.amazon.com/workspaces/latest/adminguide/amazon-workspaces.html)|
|B. Lanzar instancias de Amazon EC2 que ejecuten Windows con el software de escritorio necesario para cada usuario. Solicitar a los usuarios que accedan a los escritorios desde casa mediante el Protocolo de escritorio remoto (RDP).||Sin seleccionar|Incorrecto. Para utilizar Amazon EC2, tendrá que aplicar parches de seguridad y actualizaciones de forma individual a Windows y a otro software. Además, se necesitaría un esfuerzo significativo para garantizar la alta disponibilidad de los escritorios. WorkSpaces puede automatizar estas tareas con una sobrecarga operativa mínima.<br><br>  <br><br>Para obtener más información sobre cómo conectarse a una instancia de Windows, consulte [Conectarse a su instancia de Windows](https://docs.aws.amazon.com/AWSEC2/latest/WindowsGuide) .|
|C. Implementar AWS Outposts para alojar instancias de Amazon EC2 que ejecuten Windows con el software de escritorio necesario para cada usuario. Solicitar a los usuarios que accedan a los escritorios desde casa mediante el Protocolo de escritorio remoto (RDP).||Sin seleccionar|Incorrecto. Outposts ofrece a los usuarios la posibilidad de crear y ejecutar aplicaciones en las instalaciones mediante el uso de servicios, herramientas y API de AWS conocidos. Esta solución requeriría una importante instalación de hardware en el hogar de cada usuario. Esto no solo sería costoso, sino que también requeriría una enorme sobrecarga operativa. WorkSpaces puede automatizar estas tareas con una sobrecarga operativa mínima.<br><br>  <br><br>Para obtener más información sobre Outposts, consulte [¿Qué es AWS Outposts?](https://docs.aws.amazon.com/outposts/latest/userguide/what-is-outposts.html)|
|D. Implementar contenedores de Docker en Windows con una imagen para cada usuario en un clúster de Amazon Elastic Container Service (Amazon ECS). Transmitir los escritorios al navegador de cada usuario mediante Amazon AppStream 2.0.||Sin seleccionar|Incorrecto. Puede usar AppStream 2.0 para transmitir los escritorios de Windows al navegador de cada usuario. Sin embargo, esta solución no es operativamente eficiente. Amazon ECS es un servicio de aprovisionamiento de contenedores completamente administrado. Se necesitaría una gran sobrecarga operativa para usar Docker y un clúster de Amazon ECS. Se necesitaría un esfuerzo significativo para garantizar la alta disponibilidad de los escritorios. WorkSpaces puede automatizar estas tareas con una sobrecarga operativa mínima.<br><br>  <br><br>Para obtener más información sobre AppStream 2.0, consulte [¿Qué es Amazon AppStream 2.0?](https://docs.aws.amazon.com/appstream2/latest/developerguide/what-is-appstream.html)|

## Pregunta 20

Selección múltiple

Tiempo de respuesta:

22 segundos

Estado de la respuesta:

Correcto

Pregunta

Una empresa está migrando todos sus sistemas desde un centro de datos en las instalaciones hasta la nube de AWS. La empresa necesita trasferir todos los datos almacenados en las instalaciones a Amazon S3 en un plazo de 4 semanas. Actualmente, el almacenamiento en las instalaciones contiene 900 TB de datos y está conectado a Internet mediante conexión de 100 Mbps. Los sistemas existentes utilizan hasta el 20 % del rendimiento de la conexión en tiempo real.

  

¿Qué solución completará la migración en el plazo requerido?

Nivel de confianza

Confiado

---

## Opciones de respuesta

|Opción|Respuesta correcta|Tu selección|Fundamentos|
|---|---|---|---|
|A. Ordenar una cantidad suficiente de dispositivos AWS Snowball Edge Storage Optimized para enviar los datos.|Correcto|Seleccionado|Correcto. Esta es la única solución que cumple con los requisitos dentro del plazo indicado. La empresa necesitaría una cantidad determinada de dispositivos; sin embargo, 4 semanas son suficientes para completar la migración.<br><br>Para obtener más información sobre la migración de datos con Snowball Edge, consulte [Migración de datos con AWS Snowball Edge](https://d1.awsstatic.com/whitepapers/snowball-edge-data-migration-guide.pdf) . [https://d1.awsstatic.com/whitepapers/snowball-edge-data-migration-guide.pdf](https://d1.awsstatic.com/whitepapers/snowball-edge-data-migration-guide.pdf)|
|B. Utilizar una carga multiparte para transferir los datos a través de la conexión existente.||Sin seleccionar|Incorrecto. La empresa necesitaría casi 3 años para transferir los datos a través de la conexión existente.|
|C. Configurar dos conexiones AWS Direct Connect de 1 Gbps en un grupo de agregación de enlaces (LAG).||Sin seleccionar|Incorrecto. Con el tiempo de configuración de Direct Connect, esta solución no cumpliría el plazo requerido. Es posible que se requieran varios días o semanas para establecer la conexión de red desde las instalaciones. Además, se requerirían más de 37 días para transferir los datos mediante una conexión de banda ancha de 2 Gbps.|
|D. Configurar un túnel VPN para que el entorno de AWS cargue los datos.||Sin seleccionar|Incorrecto. Esta solución tardaría varios años. La VPN protege la transferencia de datos, pero no la acelera.|