---
title: "AWS Solutions Architect Advanced — Securing Networks and Data"
aliases:
  - "Securing Networks and Data"
  - "Índice Securing Networks and Data"
  - "Módulo de seguridad de redes y datos"
  - "Seguridad de redes y datos"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - seguridad
  - indice
  - dominio-1
  - dominio-2
status: completo
fuente: "AWS Solutions Architect Advanced Learning Plan (Includes Labs) — AWS Skill Builder"
---

# AWS Solutions Architect Advanced — Securing Networks and Data

> [!abstract] Qué es este archivo
> **Índice y mapa de progreso** del módulo. No reemplaza a las notas de sesión: las ordena, marca qué está
> cerrado y qué falta, y guarda las dudas que quedan abiertas.
>
> **Estado (27/10/2026):** módulo **cerrado**, **18 lecciones cargadas** (01–18). La fuente cierra con
> **“Activity: Architecture Challenge”** y la frase *“completaste todos los Architecture Challenges de este
> curso”*.

> [!info] Mapeo del examen
> El eje probable es la tarea **1.2 — Prescribir controles de seguridad**, y cruza con **2.3 — Determinar los
> controles de seguridad en función de los requisitos**.
>
> **Es un mapeo tentativo:** las tareas exactas por lección se anotan **cuando la lección llega**; acá no se
> adivinan. Si el módulo toma otro eje, se corrige en este bloque y se registra.

> [!info] Cómo se estudia
> 1. Leer la **nota de la sesión** (secciones conceptuales; la traducción es referencia).
> 2. Cerrar con **“Para el examen” + trampas típicas** de esa nota.
> 3. Volver acá y marcar la sesión como ✅ solo cuando puedas explicar sus puntos sin mirar.
> 4. Las dudas se anotan en [[#❓ Dudas abiertas]] y se resuelven dentro de la nota correspondiente.

---

## 📌 Mapa de progreso

| # | Sesión | Tema | Estado | Nota |
| --- | --- | --- | --- | --- |
| 01 | Course Overview | Mapa del curso: cuatro bloques y prerrequisitos | 🔵 | [[Course Overview - Securing Networks and Data]] |
| 02 | Gathering the Customer Requirements | Auditoría: cuatro hallazgos y seis requisitos | 🔵 | [[Gathering the Customer Requirements - Security]] |
| 03 | AWS Firewall Manager | DoS/DDoS, Shield y gestión centralizada de 5 servicios | 🔵 | [[AWS Firewall Manager]] |
| 04 | Network Segmentation | Segmentación, north/south vs. east/west, Network Firewall, análisis de acceso | 🔵 | [[Network Segmentation]] |
| 05 | Network Traffic Controls | Cinco planos de control, SG avanzados, TGW, Cloud WAN e inspección | 🔵 | [[Network Traffic Controls]] |
| 06 | Security Hub | Agregación de hallazgos, insights, remediación automatizada y governance | 🔵 | [[Security Hub]] |
| 07 | Demo: AWS Security Hub | Recorrido por la consola: score, estándares, workflow y timeline | 🔵 | [[Demo - AWS Security Hub]] |
| 08 | Tech Talk: AWS Security Hub | Caso PCI: elegir marco, leer remediación, esperar 24 h | 🔵 | [[Tech Talk - AWS Security Hub]] |
| 09 | Amazon GuardDuty | Inspector vs. GuardDuty, cuatro categorías, baseline 7–14 días, listas y alert fatigue | 🔵 | [[Amazon GuardDuty]] |
| 10 | Demo: AWS GuardDuty | Protection plans, dashboard tipo SIEM, detalle de un finding EKS y Detective | 🔵 | [[Demo - AWS GuardDuty]] |
| 11 | Cryptography | Algoritmo + clave, HSM, tres estados del dato y client-side vs. server-side | 🔵 | [[Cryptography]] |
| 12 | AWS KMS | Claves, envelope encryption, ciclo de vida, SSE, rotación, ABAC, CloudTrail y BYOK | 🔵 | [[AWS KMS]] |
| 13 | Demo: AWS KMS | Crear la clave, dos niveles de permiso, SSE-KMS en S3, Access Denied y claves por Region | 🔵 | [[Demo - AWS KMS]] |
| 14 | AWS CloudHSM | HSM dedicado nivel 3, clústeres, backups, SSL offload, TDE, cross-Region y custom key store | 🔵 | [[AWS CloudHSM]] |
| 15 | AWS Secrets Manager | Credenciales fuera del código, rotación con staging labels, contenedores y access keys de IAM | 🔵 | [[AWS Secrets Manager]] |
| 16 | Finished Architecture | Arquitectura final del caso: red, detección, datos, compliance, escala y costo | 🔵 | [[Finished Architecture - Security]] |
| 17 | BuildingBlocks Videos | Tres casos: Firewall Manager, Network Firewall + TGW y KMS para S3 | 🔵 | [[BuildingBlocks Videos - Security]] |
| 18 | Activity: Architecture Challenge | Tres desafíos: monitoreo central, cifrado del pipeline y respuesta automatizada | 🔵 | [[Activity - Architecture Challenge - Security]] |

Estados: ⬜ sin cargar · 🟡 resumen cargado · 🔵 consolidado y enlazado · ✅ repasado con preguntas.

---

## 📐 Reglas del módulo

Las mismas de los módulos anteriores, para que las notas sean intercambiables:

1. **Una lección = un `.md`.** Nunca mezclar lecciones en el mismo archivo.
2. **Todo dato literal**: cifras, límites, algoritmos, nombres exactos de servicios y políticas.
3. **Nombres de servicios en inglés**, explicación en español.
4. **Nada se borra**: lo que se corrige o amplía se anota en el *registro de integración* de la nota.
5. **Lo que no está en la fuente** va marcado como `[!note] Ampliación (no está en la fuente)`.
6. **El índice se actualiza en el mismo movimiento** que la nota.

---

## 🗂️ Qué cubre cada sesión

### 01 — Course Overview

- **Formato**: página de texto (summary + objetivos + audiencia + prerrequisitos). **Sin video, sin demo, sin
  knowledge check.**
- **Los cuatro objetivos = los cuatro bloques**: **Firewall Manager + Network Firewall** · **GuardDuty + Security
  Hub** · **criptografía** · **KMS**.
- **Enfoque**: **multi-capa** y **multi-cuenta**; compliance exigente **sin** perder agilidad.
- **Audiencia**: solutions architect con **2+ años en el rol**.
- **Prerrequisitos**: SAA (learning plan o examen), evaluar requisitos y recomendar arquitectura, **2+ años**
  usando AWS.
- **Nota**: [[Course Overview - Securing Networks and Data]]

### 02 — Gathering the Customer Requirements

- **Formato**: video de **3 min 20 s** (transcripción en la nota) + **flashcards interactivas** cuyo contenido
  **no viene en la fuente** + una imagen (`M261SWEJE5.jpeg`) que **no está en el vault**.
- **El caso**: empresa que **sale de una auditoría de seguridad**; auditoría con **cuatro hallazgos** —**DDoS**,
  **firewalls**, **cifrado**, **monitoreo general**—.
- **Arquitectura actual**: web de **tres capas**, **production ready**, en **dos AZ**; **funcional pero sin los
  controles de seguridad**. Disponibilidad ≠ seguridad.
- **Los seis requisitos**: gestión centralizada · protección **DDoS** · **firewalls** integrales · cifrado
  integrado · detección **en tiempo real** · **reporte de compliance**.
- **Filtro transversal**: **eficiencia operativa** (descarta lo manual) y **evidencia para auditorías futuras**
  (un control sin registro no cuenta).
- **Hueco**: la fuente **no asigna servicios** a los requisitos; el cruce de §4 de la nota es **lectura propia**.
- **Nota**: [[Gathering the Customer Requirements - Security]]

### 03 — AWS Firewall Manager

- **Formato**: texto con **interactivos** (tres marcadores numerados, flashcards de Shield) + **dos Knowledge
  Check**. **Sin video, sin demo.** Además, trae **tres imágenes** que **no están en el vault**.
- **Primera mitad, el problema**: **DoS** (inundar para impedir el uso legítimo) vs. **DDoS** (**más de una IP**,
  a menudo **miles**); el **ingress filtering solo no alcanza** y el **IP spoofing** lo agrava.
- **La evolución en tres eras**: **on-premise** (CAPEX + personal) → **SaaS** (latencia, puntos de falla) →
  **cloud-first** (**Shield**, mitigación **dentro de la infraestructura global**, sin desviar tráfico).
- **Dato de escala**: **en 2023 AWS mitigó varios DDoS de más de 900 Gbps**.
- **Shield**: identifica **problemas de configuración de red** y defiende contra **explotación web activa y
  DDoS**. *Sus “dos capacidades” vienen en flashcards que no están en el texto.*
- **Segunda mitad, la solución**: **Firewall Manager** administra **cinco servicios** —**WAF**, **Shield
  Advanced**, **security groups**, **Network Firewall**, **Route 53 Resolver DNS Firewall**— con **reglas
  configuradas una vez**, aplicadas **también a recursos nuevos**.
- **Requisito de entrada**: cuenta **miembro de una organización** de **AWS Organizations** + organización con
  **all features turned on**.
- **Cierre del perímetro**: reporta **violaciones de compliance a Security Hub**. Aplicar ≠ demostrar.
- **Perfil**: **equipo central de seguridad y compliance**, **cinco o más cuentas**.
- **Nota**: [[AWS Firewall Manager]]

### 04 — Network Segmentation

- **Formato**: la lección **más densa** del módulo. Seis bloques: política, tráfico, **Tech Talk de 8 min 23 s**,
  análisis de acceso, **Network Firewall** y **troubleshooting**. **Ocho imágenes**, ninguna en el vault.
- **Segmentar**: espacios aislados que **no se comunican solos** — necesitan **un intermediario** (router,
  firewall). Nativos: **VPC**, **subnet**, **security group**.
- **Los cuatro tipos de política** de Firewall Manager: **Network Firewall**, **DNS Firewall**, **security
  groups**, **WAF**. Más **enforcement** (remediar, targeting, visibilidad) y **governance** (postura, acciones,
  change management).
- **North/South vs. East/West**: borde de la VPC vs. **movimiento lateral**. **El caso del retail fue east/west**:
  pasado el acceso inicial, **nada frenaba el paso a los sistemas de pago**.
- **Tech Talk**: **Cloud WAN** es **multi-Region por defecto** y aporta **dominios de routing aislados**;
  **segment actions** en la **core network policy**; **appliance mode** para **routing simétrico**; **diseñar por
  security context**, **nunca por organigrama**.
- **La analogía del castillo**: el museo, el **Rembrandt** y el interruptor de luces en el pasillo. **Defense in
  depth no se detiene en las puertas.**
- **Cuatro herramientas de acceso**: **Network Access Analyzer** (previsto vs. real), **Verified Access**
  (contexto), **Reachability Analyzer** (por qué no llega), **Inspector** (exposición y exfiltración).
- **Network Firewall**: **stateless → stateful**, **Suricata**, **500.000 conexiones concurrentes por Firewall
  Endpoint**, **endpoint por AZ**, escala automática. **L3/L4 y nivel VPC**; **WAF** es **L7**.
- **Troubleshooting en 5 pasos**, con consulta de Logs Insights y la advertencia de **NACL stateless**.
- **Nota**: [[Network Segmentation]]

### 05 — Network Traffic Controls

- **Formato**: **la más práctica** del módulo. Cinco planos de control + **cuatro ejemplos de código** (Lambda de
  JIT, endpoint policy, `put-policy` de TGW, política de Cloud WAN). **Nueve imágenes**, ninguna en el vault.
- **Los cinco ejes**: **security group** (quién me habla) · **NACL** (qué entra a la subred) · **DNS Firewall**
  (a qué nombre resuelvo) · **endpoint + endpoint policy** (por dónde salgo) · **route tables / segmentos** (por
  dónde puede ir).
- **Cuatro patrones de SG**: **service-oriented** (por función, no por ubicación) · **reference chaining** (sin
  CIDR) · **just-in-time** (Lambda que agrega y revierte) · **cross-account references**.
- **NACL en bordes de zona**: **automated threat response** con **GuardDuty**, **zone-based design**,
  **ephemeral ports**. Recordar: **stateless**.
- **DNS Firewall**: previene **exfiltración y C2**; **rule groups por categoría**, detección de **DNS tunneling**,
  **feeds de threat intelligence**.
- **Endpoints como control**: **`aws:PrincipalOrgID`** como perímetro de datos; **defense in depth = endpoint
  policy + IAM policy**; **PrivateLink** con **endpoint service permissions**.
- **TGW**: **route table segmentation**, **blackhole routes**, **appliance mode**, **RAM** para attachments,
  **flow logs**. El aislamiento real es **restringir la propagación de rutas**.
- **Cloud WAN**: **aprovisiona los TGWs regionales solo** (sin peering manual); **`require-attachment-acceptance`**
  en **prod/dev `true`**, **shared `false`**; **la ausencia de ruta es la regla**.
- **Inspección**: Network Firewall **distribuido / centralizado / híbrido**; **GWLB** para **terceros**;
  **Traffic Mirroring** para **observar sin frenar**.
- **Nota**: [[Network Traffic Controls]]

### 06 — Security Hub

- **Formato**: texto con **interactivos** (5 marcadores de automatización, 4 pasos de la solución, flashcards de
  governance que **no vienen**) + **tres imágenes**, ninguna en el vault.
- **Qué es**: servicio **totalmente administrado** que da **vista integral** contra **estándares y buenas
  prácticas**. **Agrega, no detecta.**
- **Siete fuentes**: **GuardDuty**, **Inspector**, **Firewall Manager**, **IAM Access Analyzer**, **Macie**,
  **Config**, **Systems Manager Patch Manager**. **Formato estándar**, sin conversión.
- **Dos detalles de integración**: **Access Analyzer se activa solo**; **Firewall Manager manda cuatro findings**
  (WAF, Shield Advanced, **DDoS en curso**, **SG mal usados**).
- **Insights**: **más de 100 out of the box**, más los propios; dashboard por **severidad**; **drill-down** con
  recomendaciones y anotaciones.
- **Automatización**: findings → **EventBridge** → **amarillo = Lambda remedia**, **rojo = SNS + humano**.
  **Amarillo y rojo son ejemplos de riesgo organizacional, no severidades de AWS**.
- **SNS message data protection**: **redacción o masking** del payload.
- **La solución de remediación**: **CIS v1.2.0**, **AWS Foundational v1.0.0**, **PCI DSS v3.2.1**; cuatro pasos
  **Detect → Ingest → Remediate → Log**; **la regla automática viene apagada por defecto**; **audit trail en las
  notas del finding**.
- **Los cuatro roles**: **Config** (cambios), **GuardDuty** (ML sobre CloudTrail + Flow Logs + **DNS logs**),
  **Security Hub** (**acepta logs de terceros** — la diferencia clave), **SSM** (remedia en los recursos).
- **Nota**: [[Security Hub]]

### 07 — Demo: AWS Security Hub

- **Formato**: **video de 6 min 42 s**, demo de consola. **Sin imágenes, sin Knowledge Check.** Transcripción
  completa.
- **El recorrido**: dashboard → estándar → control fallido → workflow → **configuration timeline** → **Manage
  Resource**.
- **La advertencia central**: el **score verde** está alto **porque AWS Control Tower está habilitado** y sus
  **guardrails** hicieron el trabajo. **Score heredado ≠ postura propia.**
- **Los números de la demo**: **249** controles, **224** pasados, **17** fallidos. **No cierran** (suman 241):
  registrado como hueco, no se rellena.
- **Ciclo de evaluación**: **automático, al menos cada 24 horas**; última actualización **21 horas** atrás.
  **Agrega entre cuentas y Regions**.
- **Workflow status**: **assign**, **suppress**, **resolve**. **Suprimir no es resolver.**
- **La evidencia**: **configuration timeline** de **AWS Config**, con **from/to** y el paso de *compliant* a
  *non-compliant*.
- **Manage Resource**: del finding **al recurso real**, para corregirlo en su consola nativa.
- **Nota**: [[Demo - AWS Security Hub]]

### 08 — Tech Talk: AWS Security Hub

- **Formato**: **conversación de 5 min 44 s** entre **Alex** (trae el caso) y **Charisma** (maneja la consola).
  **Sin imágenes, sin Knowledge Check.**
- **El caso**: un cliente **no sabe el estado de sus recursos** ni **si cumplen**; le preocupa **PCI**.
- **El método**: **elegir el marco primero** (uno a la vez), **filtrar por severidad**, **elegir el control por
  contexto de negocio** (redes y datos), no solo por severidad.
- **El control**: **VPC default security groups** otra vez; esta vez con **cuatro checks** (**dos pasados, dos
  fallidos**) — *no coincide con los dos de la lección 07*.
- **La timeline**: *“**a los auditores les encanta eso**”*. Es función de **auditoría**, no de diagnóstico.
- **Remediación**: **no a ciegas**. *Remediation instructions* abre **la guía del usuario de AWS en el control de
  ese framework**; los caminos son **quitar el SG** o **quitar el puerto**.
- **El cierre**: **Security Hub re-evalúa solo, hasta en 24 horas**. *“Puedo dejar que corra su check y volver
  mañana.”* **Latencia ≠ fallo.**
- **Nota**: [[Tech Talk - AWS Security Hub]]

### 09 — Amazon GuardDuty

- **Formato**: texto con **interactivos** (cuatro categorías de detección, marcadores de fuentes, dos tabs de
  listas, dos de alert fatigue, tres de respuesta automatizada) + **video de 4 min 46 s**. Trae **ocho
  imágenes**, ninguna en el vault.
- **El título engaña**: la lección **compara GuardDuty con Inspector** todo el tiempo. **Inspector = qué está
  expuesto o sin parchear** (EC2, Lambda, contenedores); **GuardDuty = quién está haciendo algo raro** (la cuenta
  entera). **Un estado se corrige; un evento se investiga.**
- **Inspector**: **escaneo continuo**, **auto-descubrimiento**, **sin programar escaneos**; **rules packages**
  predefinidos, **seis beneficios**, findings **priorizados por severidad**.
- **GuardDuty**: se activa **con unos pocos clics** y **empieza de inmediato** con **CloudTrail, VPC Flow Logs y
  DNS logs**; **no se escriben reglas**, las detecciones las mantiene **AWS Security** (la fuente dice *Security
  Hub*: errata registrada).
- **Las cuatro categorías**: **Reconnaissance** · **Account compromise** (apagar CloudTrail, geolocalización
  inusual) · **Bucket compromise** (acceso a S3 sin historial) · **Instance compromise** (criptominado, **DGAs**,
  **exfiltración por DNS**).
- **El finding**: **JSON común con Macie e Inspector**; trae **qué, qué recursos, cuándo y dónde, quién** y
  **severidad**. **High = remediar ya**, **medium = investigar pronto**, **low = anotar**.
- **Cómo detecta**: **threat intelligence** de **AWS, Proofpoint y CrowdStrike**, **pre-integrada y sin costo
  adicional**; **listas propias solo para tu cuenta**. Las **seis fuentes**: VPC Flow Logs, DNS logs, CloudTrail,
  eventos S3, **EKS audit logs** y **RDS protection profiles** (Aurora). **Los logs se cifran en tránsito y se
  descartan** después de extraer campos.
- **El baseline**: **7 a 14 días** para aprender el comportamiento; después **de aprendizaje a activo**. *“No
  alertó las primeras dos semanas”* **no es una falla**: es el diseño.
- **Malware Protection**: **agentless**, **snapshots → réplicas cifradas en la cuenta de servicio**; si **no hay
  malware, los snapshots se borran**. **Status** Completed/Running/Skipped/Failed · **result** Clean/Infected.
  **Skipped no es Clean.**
- **Las listas, con cuotas**: **trusted IP list 2.000** IPs y **una** por cuenta y Region · **threat list
  250.000** y **hasta seis**. Aplican **solo a IPs públicamente ruteables** y **no a findings de DNS**; **no hay
  findings por nombres de dominio**. Formatos **TXT, STIX y CSV**.
- **Alert fatigue**: **filters + archiving** conservan **toda la historia** (**90 días**); la **suppression
  rule** del caso de **Nikki** (AnyCompany) **corta la entrega** a Security Hub, S3, Detective y CloudWatch y **no
  dispara el escaneo de malware**. **Suprimir no es archivar.**
- **Respuesta automatizada**: **GuardDuty → EventBridge → Lambda**, para **aislar la instancia**, **invalidar
  credenciales** o **modificar la NACL**. Es el patrón que la lección 05 solo nombraba.
- **Governance**: **multi-cuenta con Organizations** y **una cuenta administradora** que agrega los findings;
  **sin software, sensores ni appliances**.
- **Nota**: [[Amazon GuardDuty]]

### 10 — Demo: AWS GuardDuty

- **Formato**: **video de 3 min 09 s**, demo de consola. **Sin imágenes, sin texto de lectura, sin Knowledge
  Check.** Transcripción completa.
- **El recorrido**: **dashboard con protection plans** → **Findings filtrados por high** → **detalle de un finding
  de EKS** → **mención de Detective**.
- **Los protection plans**: **S3 protection** y **EKS protection** — los orígenes de la lección 09, **encendidos
  por tipo de recurso**.
- **El dashboard es un SIEM**: **findings**, **severidad** y **finding types** (*acceso no autorizado*,
  *impacto/criptominado* sobre un **runtime**), sin armar pipeline propio.
- **El detalle del finding**: **severidad**, **Region**, **`time`**, **`updated`**, **target resource group**,
  **resource type**, **cluster name**, **ARN**, **VPC ID**, **workload details** e **instance tags**. **`time` es
  cuándo empezó; `updated`, cuándo cambió.**
- **Samples**: las cuentas de la demo son **de prueba** y **cualquiera puede generar samples propios** — la forma
  de **ensayar la respuesta automatizada** sin incidente.
- **La errata**: el instructor dice *“esta instancia EC2”* mientras el finding es de un **clúster EKS**. Se
  registra y se transcribe literal.
- **Detective**: se **nombra** como el paso de investigación y **no se explica**. Queda como referencia
  pendiente; **no hay nota de Detective en el vault**.
- **La habilitación**: **“corre bajo el capó”** una vez habilitado; se habilitó **vía Organizations/Control
  Tower**, pero **también se puede habilitar directo en cualquier cuenta**. **Organizations no es requisito**
  —a diferencia de **Firewall Manager**—: agrega **cuenta administradora y consolidación**, no detección.
- **Nota**: [[Demo - AWS GuardDuty]]

### 11 — Cryptography

- **Formato**: **video de 4 min 29 s** + **tres lecturas** (*What, How, and Why* · *When and Where* ·
  *Traditional Reasons Not to Encrypt*). **Cuatro imágenes**, ninguna en el vault. **Sin Knowledge Check.**
- **No enseña servicios todavía**: enseña **los fundamentos** que justifican KMS y CloudHSM.
- **El escenario**: el **deployment manager** no pregunta *qué algoritmo*, pregunta **cómo mantener el control**
  sobre los datos sensibles **después de moverlos a AWS**.
- **El cifrado es la última línea de defensa**: *“un campo de fuerza invisible”*; **defense in depth** = **capa
  adicional sobre el control de acceso**, **no reemplazo**.
- **La mecánica**: **algoritmo + clave → ciphertext**; el algoritmo **es público**, **la clave es el secreto**.
  *“Proteger y administrar las claves es una parte crítica de cualquier solución de cifrado.”*
- **Los HSM**: **dispositivo a prueba de manipulación** que **guarda claves y opera sin exponer el material
  fuera de su límite criptográfico**; analogía de **la bóveda del banco**. **KMS** (administrado) vs.
  **CloudHSM** (bajo tu control).
- **Los tres estados**: **in motion** (**TLS**) · **at rest** (**S3, EBS, bases de datos**) · **in use** (**la app
  procesando** — **sin mecanismo propuesto**).
- **Client-side vs. server-side**: **dónde** se cifra y **quién** lo hace; **no definen *cómo* hacerlo**, **no son
  excluyentes** y **se pueden usar los dos sobre el mismo dato**. **La mayoría de los servicios SSE está
  integrada con KMS**.
- **Las objeciones**: **performance** (**menos de un milisegundo** en un cliente de servicios financieros),
  **complejidad** (sistemas fragmentados, controles inconsistentes, provisioning) y **disponibilidad**
  (**pérdida de claves**, que la fuente dice cubierta con **múltiples capas** sin enumerarlas).
- **Huecos registrados**: el **ciphertext del ejemplo** tiene **31 caracteres hex** (no byte-alineado) y **parece
  un hash**; **“Level 3 HSMs”** se menciona **sin definirse**; **no se nombra ningún algoritmo concreto**.
- **Nota**: [[Cryptography]]

### 12 — AWS KMS

- **Formato**: **la lección más larga del módulo**: **video de 12 min 48 s** + **once lecturas**. **Doce
  imágenes**, ninguna en el vault. **Sin Knowledge Check.**
- **La respuesta al caso**: KMS **crea y controla las claves**, **más de 100 integraciones** y —lo central— **separa
  el acceso a la clave del acceso al dato**. *“Aunque alguien entre al bucket, sin permisos de KMS no descifra.”*
- **Defense in depth**: AES-256 = **al menos un billón de años**; **la clave de descifrado no puede estar en el
  mismo sistema** que el dato.
- **HSMs FIPS 140-2**, **excepto China (Beijing) y China (Ningxia)**. Operaciones: cifrar, descifrar, re-cifrar,
  firmar, verificar, generar data keys y números aleatorios.
- **Tres orígenes del material**: **generado por KMS** · **importado (BYOK)** · **custom key store con CloudHSM**.
- **Envelope encryption**: **data key local** + **data key cifrada bajo la KMS key**; **KMS no guarda las data
  keys**; **4 KB** de máximo directo; **nunca guardar la data key sin cifrar con el dato**.
- **Ciclo de vida**: crear, activar, **desactivar bloquea el uso**, **rotación anual opt-in**, **borrado con espera
  de 7–30 días (default 30), cancelable**. **El material importado se borra sin espera y se reimporta.**
- **AWS managed vs. customer managed**: alias **`aws/`**, **gratis**, **no se administran ni rotan**, **no se usan
  directo**; las propias se identifican con **`DescribeKey` → `KeyManager=CUSTOMER`**.
- **Simétrica 256 bits** vs. **asimétrica RSA/ECC**. **Los servicios integrados solo cifran con simétricas.**
- **Los tres SSE de S3**: **SSE-S3** (S3 manda) · **SSE-KMS** (**permisos separados + auditoría + cargos**) ·
  **SSE-C** (**clave en cada request**, HMAC salteado, **si la perdés perdés el objeto**).
- **Rotación**: automática **solo** para claves generadas por KMS; **no** para importadas, asimétricas ni custom
  key store; **rotar no obliga a re-cifrar**. **ABAC** por **tags y aliases**; **encryption context** como
  condición.
- **CloudTrail**: **todas** las operaciones, **también las denegadas**; **cross-account en las dos cuentas**;
  **campos omitidos** (plaintext, `GetKeyPolicy`, operaciones criptográficas).
- **BYOK vs. SSE-C**: **importar una vez** vs. **clave en cada request**; **BYOK no admite asimétricas**.
- **Huecos registrados**: el **ejemplo de CloudTrail no es JSON válido**; el **30 vs. 7–30** del borrado; **FIPS
  140-2 “Level 3”** solo en el video; **“AWS owned key”** sin definir.
- **Nota**: [[AWS KMS]]

### 13 — Demo: AWS KMS

- **Formato**: **video de 6 min 21 s**, solo transcripción. **Sin imágenes, sin texto de lectura, sin Knowledge
  Check.** La presentadora es **Melissa**. Los pasos (§2 y §4 de la nota) se ordenan **desde lo que narra**.
- **Los cuatro momentos**: **crear** la clave · **aplicarla** a S3 como default encryption · **verificar** el
  objeto · **probar** el acceso.
- **La clave**: **customer managed**, **symmetric** (*“la más usada”*), alias **`demo KMS key`**. Simétrica porque
  **los servicios integrados solo cifran con simétricas** (lección 12, §4).
- **El corazón de la demo**: **dos niveles de permiso** —**key administrators** (administrar) y **key users**
  (cifrar/descifrar)— y el **error común de asumir que IAM alcanza**. **La key policy manda sobre la clave.**
- **Aplicación**: **S3 → Properties → default encryption → SSE-KMS → la clave recién creada**. Todo lo que se suba
  **después** queda cifrado sin intervención.
- **Verificación**: en las **properties del objeto** aparece **server-side encryption habilitada con KMS**. Se mira
  **el objeto**, no la política del bucket.
- **Prueba de acceso**: **con permisos descarga y abre**; **sin permisos, Access Denied** —error de autorización,
  no de datos—.
- **Cross-Region replication**: **hacen falta KMS keys en las dos Regions**; *“un error común es asumir que una
  clave funciona en todas las Regions”*. **La fuente no menciona multi-Region keys** (hueco registrado).
- **EBS**: se menciona **sin demo**: al lanzar una EC2 se puede **elegir la clave**, y es **buena práctica**.
- **Seis mejores prácticas**: **tagging desde el día uno** · **alarmas de CloudWatch** por uso sospechoso ·
  **documentar** qué app usa cada clave · **rotación automática** que las apps soporten · **probar en desarrollo** ·
  **revisar accesos cada trimestre**.
- **Huecos registrados**: *“IAM rules”* por **roles**; bucket **`advanced ARC demo bucket`** opaco; **no se muestra
  la key policy**; **no se mencionan multi-Region keys**.
- **Nota**: [[Demo - AWS KMS]]

### 14 — AWS CloudHSM

- **Formato**: **video de 7 min 46 s** + **nueve lecturas**. **Ocho imágenes**, ninguna en el vault. **Sin
  Knowledge Check.**
- **La pregunta del caso**: *“¿cómo mantenemos **acceso directo a un HSM de nivel 3** que **controlamos**?”* —
  **requisito de compliance**, no de cifrado.
- **La respuesta**: **HSM dedicado en tu VPC**, **validado por terceros**, **FIPS 140-2 Level 3**, **sin acceso
  de AWS a las claves**. Caso citado: **cliente de contratación gubernamental** que debía **probar acceso
  exclusivo** a claves de **proyectos clasificados**.
- **Responsabilidad compartida**: **AWS** → **dispositivo, mantenimiento, firmware, balanceo, cumplimiento** ·
  **vos** → **claves, usuarios, integración y alta disponibilidad**.
- **Requisitos que cumple**: **PKCS #11**, **JCE** o **Microsoft CNG**; **canales SSL mutuamente
  autenticados**; **bulk crypto** en la VPC; **hardware tamper-resistant en varias AZs**.
- **Clúster**: **un HSM lógico** de **1 a 28 HSMs** (**6 por defecto por cuenta por Region**); **mínimo
  recomendado 2 HSMs en 2 AZs**. **Claves sincronizadas solas**; **usuarios y políticas requieren actualizar la
  configuración del cliente**. **Load balancing automático** con más de un HSM.
- **Backups**: **periódicos y no programables a demanda**; **agregar un HSM restaura el más reciente**; **borrar
  un HSM dispara uno**; **clonar un clúster solo en la misma Region**.
- **SSL acceleration**: el **HSM descifra el premaster secret**; **la clave privada del servidor nunca sale del
  módulo**.
- **Envelope encryption**: **root key en el HSM**, **data keys afuera**; **Oracle TDE** usa **PKCS #11** y
  **guarda la master key en el HSM**, **en EC2 con 11g/12c**, **no en RDS**.
- **Cross-Region**: **`copy-backup-to-region`** → **`CREATE_IN_PROGRESS`** → **`READY`** (o **`DELETED`**);
  **después, sincronización manual**.
- **KMS custom key store**: **clave AES de 256 bits, persistente y no exportable** **generada en tu clúster**;
  **el material nunca sale sin cifrar**; **operaciones dentro de tus HSMs**.
- **Costos**: **borrar HSMs en dev pausa el facturado**; **recrear restaura el backup**; **en prod, escalar y
  compartir clústeres**; **envolver data keys y guardarlas afuera** para el límite de almacenamiento.
- **Huecos registrados**: *“manager your keys”* por *managing*; **contradicción RDS/CloudHSM Classic**; **quorum
  authentication sin definir**; **dos imágenes sin texto alternativo**; **sin precios**.
- **Nota**: [[AWS CloudHSM]]

### 15 — AWS Secrets Manager

- **Formato**: **video de 4 min 25 s** + **cinco lecturas**. **Dos imágenes**, ninguna en el vault. **Sin
  Knowledge Check.**
- **La pregunta del caso**: *“¿cómo guardamos y recuperamos de forma segura los secretos que usan nuestras
  aplicaciones?”* — **credenciales, no claves criptográficas**.
- **El problema**: credenciales **embebidas en el código**; rotar exigía **actualizar y redistribuir la app**, y
  **una app olvidada fallaba**. Por eso **muchos clientes no rotaban**: *“sustituye un riesgo por otro”*.
- **La respuesta**: **el secreto ya no existe en el código**; la app **lo pide por API**. **Cifrado en tránsito y
  en reposo**; **nadie del equipo conoce el valor**.
- **Qué guarda**: **credenciales de base**, **contraseñas**, **API keys de terceros**, **credenciales
  on-premises**, **claves SSH**, **credenciales SaaS** y **texto arbitrario**.
- **El flujo**: **API Gateway → Lambda → Secrets Manager → RDS**; la función **pide el secreto en el último
  salto**, sin **hardcodear** ni **variables de entorno**.
- **Rotación de RDS**: **Aurora, MySQL, MariaDB, PostgreSQL y Oracle**; **Lambda ya existe** para esos motores;
  **para SAML u otras credenciales hace falta una función propia**.
- **El ciclo de etiquetas**: **`AWSPENDING`** → **se prueba** → **`AWSCURRENT`**; la vieja pasa a
  **`AWSPREVIOUS`** y la anterior **queda sin etiqueta y deprecada**. **La prueba antes de activar es lo que evita
  romper la app.**
- **Versionado**: **soporta rollback y recuperación** ante fallas de despliegue; **expiración** por cronograma o a
  demanda (consola, CLI o SDK).
- **Contenedores**: **ECS / Fargate** inyectan secretos **como variables de entorno o en la configuración de
  logs**; **cachear → rotar → refrescar**, **sin reiniciar**.
- **Access keys de IAM**: **Lambda** rota, **EventBridge** programa, **IAM** provee, **Secrets Manager** guarda y
  **SNS** notifica. **Cada 90 días**: **crear el día 1**, **desactivar el 11**, **borrar el 21**.
- **El combo del módulo**: **KMS cifra**, **CloudHSM cumple el hardware propio** y **Secrets Manager administra
  las credenciales**.
- **Huecos registrados**: **“después de 90 días”** en el video por **desfases de 10 días**; *“SNS updated”* por
  *notifica*; **sin clave de KMS nombrada**, **sin intervalo por defecto** y **sin precios**.
- **Nota**: [[AWS Secrets Manager]]

### 16 — Finished Architecture

- **Formato**: **video de 5 min 28 s** + **una lectura de recapitulación**. **Una imagen**, que no está en el
  vault. **Sin Knowledge Check.**
- **Qué es**: la **arquitectura endurecida** que resuelve los **seis requisitos** de la lección 02, manteniendo
  **performance y confiabilidad** de la aplicación de **tres capas**.
- **Capa de red**: **Network Firewall** en **subnets dedicadas** y **dos AZ**, con **inspección stateful** y
  **deep packet inspection**; **Firewall Manager** centraliza la política en cuentas y VPCs.
- **El trade-off**: **reglas por equipo** (autonomía, deriva) vs. **Firewall Manager** (consistencia, menos
  autonomía). Se elige **consistencia** por el **compliance**.
- **Borde**: **Shield Advanced** para **capas 3 y 4** detrás del **ALB**; **WAF** para **exploits web** de
  **capa 7**. **Tres perímetros, no uno.**
- **Detección**: **GuardDuty** corre continuo con **ML**; **Security Hub** **agrega** y da la vista integral.
  **Security Hub no detecta: ordena.**
- **Datos**: **KMS con customer managed keys** para todo lo que está en reposo; **CloudHSM se evaluó y se
  descartó** por **carga operativa** —el requisito no pedía acceso directo al HSM—; **multi-Region keys** para
  el **DR**; **Secrets Manager** reemplaza los **secretos en archivos de configuración**.
- **Compliance**: **Security Hub CSPM** evalúa postura; **EventBridge + Lambda** **remedian** y dejan el
  **reporte** que la auditoría futura va a pedir.
- **Escala**: **Firewall Manager** y **Security Hub** extienden la protección a **cuentas y recursos nuevos**,
  sobre **AWS Organizations**.
- **Costo**: **réplicas regionales de KMS** en vez de **HSMs dedicados** y **sampling rates de GuardDuty**
  ajustadas al **threat model**. *“El costo de un incidente supera el costo de los controles.”*
- **Horizonte**: **Amazon Macie** para descubrimiento de datos sensibles y **marcos de compliance adicionales**.
- **Cierre del proceso**: la arquitectura **se revisa con el cliente** antes de tocar producción.
- **Huecos registrados**: **“dedicated subnets”** aplicado a Shield y WAF; **“réplicas regionales” vs.
  “multi-Region keys”** sin aclarar; **sampling rates** y **CSPM** sin definir; **imagen ausente**.
- **Nota**: [[Finished Architecture - Security]]

### 17 — BuildingBlocks Videos

- **Formato**: **tres videos**, sin lecturas ni imágenes: **2 min 34 s**, **3 min 21 s** y **2 min 41 s**. **Sin
  Knowledge Check.**
- **Qué son**: **tres diálogos** donde se propone, se descarta y se elige. **El valor está en los descartes.**
- **Caso 1 — aplicaciones web**: **WAF consistente** en todos los ALB y **security groups aplicados** en todas
  las cuentas. Se descartan **AWS Config** (monitorea, no aplica) y **CloudFormation** (estandariza, pero se
  despliega a mano). Gana **Firewall Manager**: **política una vez**, **toda la organización**, **WAF + security
  groups**, **cuentas y recursos nuevos**.
- **Caso 2 — red multi-cuenta**: **deep packet inspection**, **reglas centrales**, **logging para compliance** y
  **filtrado de salida**. Se descartan **flow logs + Lambda** (sobreingeniería, solo visibilidad), **Inspector y
  GuardDuty** (detección) y **solo Firewall Manager** (no filtra). Gana **Network Firewall**, primero con **VPCs
  de inspección** y después **con attachment en Transit Gateway**, **sin VPCs dedicadas**; **TGW compartido con
  AWS RAM** si el firewall va en otra cuenta.
- **Caso 3 — cifrado de S3**: **rotar cada 30 días**, **logs de uso**, **impedir borrado** y **auditores
  verifican key policies**. Se descartan **CloudHSM** (overkill, no hay requisito FIPS 140-2 Level 3) y
  **SSE-S3** (sin visibilidad ni control); **KMS solo con MFA** queda incompleto. Gana **KMS + CloudTrail +
  key policy**.
- **El patrón**: **aplicar > monitorear**, **prevenir > detectar**, **attachment > VPC extra**, **KMS > CloudHSM
  cuando no hay requisito de hardware**.
- **Huecos registrados**: **Config “no puede aplicar”** (simplificación); **rotación de 30 días** por debajo del
  mínimo de KMS; **key policy “impide borrar”** dicho de forma laxa; **sin cuotas, costos ni cuentas**.
- **Nota**: [[BuildingBlocks Videos - Security]]

### 18 — Activity: Architecture Challenge

- **Formato**: **evaluación integradora**, sin lecturas ni imágenes: **tres desafíos** y **seis Knowledge Checks**
  (dos por desafío: **elegir TRES** y después **la óptima**). Cierra con *“completaste todos los Architecture
  Challenges de este curso”*.
- **El caso**: **Example Corp**, tecnología para la salud, **2.000+ instituciones**, **50 millones+ de
  pacientes**, **300% de crecimiento**, **200+ cuentas** y **tres entornos** (dev, staging, prod).
- **Desafío 1 — monitoreo central**: tres correctas **GuardDuty (detectar) + Security Hub (agregar y evaluar
  contra HIPAA) + Detective (investigar)**; se descartan **Systems Manager**, **Config** e **Inspector**. La
  óptima es **Security Hub en una cuenta central + EventBridge + S3 con retención**.
- **Desafío 2 — cifrado del pipeline**: tres correctas **KMS key multi-Region con rotación y aliases + bucket
  policies que exigen PUT cifrados + CloudTrail**; se descartan **Secrets Manager para la clave**, **SSE-S3** y
  **un rol con KMS completo**. La óptima es **rol con `kms:Decrypt` + encryption context + variables cifradas**.
- **Desafío 3 — respuesta automatizada**: tres correctas **EventBridge → Step Functions**, **Lambda que revoca
  credenciales y aísla** y **runbooks de SSM Automation**; se descartan **SNS**, **Macie** y **terminar todo**.
  La óptima es **Security Lake + Athena + QuickSight**.
- **El patrón**: **la primera pregunta premia cobertura; la segunda, precisión** — de **tener el servicio** a
  **tener el flujo**.
- **Huecos registrados**: el **problema 4** dice **“Secrets management”** con la descripción del **problema 5**
  (**segmentación de red**); **ningún desafío evalúa DDoS, secrets management ni segmentación**; **`****THREE****`**
  es artefacto de formato; **el trail separado de KMS no es obligatorio**.
- **Nota**: [[Activity - Architecture Challenge - Security]]

---

## ✅ Checklist: lo que tenés que poder explicar

> [!note] Borrador propio (no está en la fuente)
> Esta lista es un **punto de partida** basado en las tareas **1.2** y **2.3** de la guía del examen, no en las
> lecciones. Se ajusta —se agrega, se recorta, se corrige— a medida que el módulo avance.

- [ ] **Security group vs. NACL**: estado, orden de evaluación y qué se puede referenciar en cada uno.
- [ ] **Cifrado en tránsito**: TLS, **ACM**, VPN y en qué punto del camino se aplica.
- [ ] **Cifrado en reposo**: **KMS** (CMK vs. AWS managed), **multi-Region keys** y **CloudHSM**.
- [ ] **Key policies vs. IAM policies**: quién manda sobre una clave y cómo se comparte cross-account.
- [ ] **Acceso cross-account**: **roles** y `AssumeRole` vs. **resource-based policies**; **`iam:PassRole`**.
- [ ] **Secretos**: **Secrets Manager** vs. **Parameter Store**, rotación y a quién se le da acceso.
- [ ] **S3**: **Block Public Access**, **Object Ownership**, bucket policies y **presigned URLs**.
- [ ] **Perímetro de datos**: **`aws:PrincipalOrgId`**, endpoint policies y **VPC endpoints**.
- [ ] **Segmentación**: subredes, **Network Firewall**, **PrivateLink** y qué tráfico se puede evitar.
- [ ] **Exposición perimetral**: **AWS WAF**, **Shield** y **Route 53 Resolver DNS Firewall**.
- [ ] **Detección**: **GuardDuty**, **Inspector**, **Macie**, **Security Hub** e **IAM Access Analyzer**.
- [ ] **Auditoría**: **CloudTrail**, **VPC Flow Logs**, logs de DNS y **Config**.
- [ ] **Guardrails**: **SCPs** como límite máximo que **no otorgan** permisos.
- [ ] **Identidad a escala**: **IAM Identity Center**, federación **SAML/OIDC** y credenciales temporales.

---

## ❓ Dudas abiertas

| # | Duda | Estado | Se resolvió en |
| --- | --- | --- | --- |
| 1 | **DDoS: ¿qué servicio?** El requisito **2** es explícito, pero **Shield** no aparecía en los cuatro objetivos del curso. ¿Lo cubre alguna lección o queda fuera? | ✅ Resuelta | [[AWS Firewall Manager]] — Shield tiene definición, contexto (cloud-first) y un dato de escala (900 Gbps) |
| 2 | **¿Cuáles son las “dos capacidades” de Shield?** La lección 03 las manda a **flashcards** que no vienen en la fuente | Abierta (27/10/2026) | — |
| 3 | **Centralizar o distribuir la inspección.** La KC de la lección 04 premia **una VPC de inspección central**; el Tech Talk dice que **desconfía de centralizar**. Lectura propuesta: **centralizado por Region, distribuido entre Regions** | Abierta, con avance (27/10/2026) | [[Network Segmentation]] §4.4 · [[Finished Architecture - Security]] §2.2 (**gestión central, ejecución distribuida**) |
| 4 | **¿Qué son los “Level 3 HSMs”?** Aparece una sola vez, en la lección 11, en boca del cliente y sin definición | ✅ **Resuelta**: [[AWS CloudHSM]] exige y cumple **FIPS 140-2 Level 3** y lo asocia a **hardware validado por terceros y a prueba de manipulación** | [[Cryptography]] §4.1 · [[AWS KMS]] §3 · [[AWS CloudHSM]] §3 |
| 5 | **¿Existe una clave que sirva en varias Regions?** La demo 13 dice que la replicación **exige claves en las dos Regions** y **no menciona multi-Region keys**; el checklist las pide | ✅ **Resuelta**: **sí existen**; la arquitectura final las usa para **mantener cifrado consistente en el DR**. **No se explica cómo se crean** | [[Finished Architecture - Security]] §4.2 · [[Demo - AWS KMS]] §6.2 · [[AWS CloudHSM]] §8 (CloudHSM lo resuelve **por backup**) |
| 6 | **Secrets Manager vs. Parameter Store.** El checklist pide compararlos, pero **la fuente de la lección 15 nunca menciona Parameter Store** | Abierta (27/10/2026) | [[AWS Secrets Manager]] §11 (solo como trampa de examen) |

---

## ⏳ Pendiente del módulo

- [x] Cargar la **lección 01** → [[Course Overview - Securing Networks and Data]].
- [x] Cargar la **lección 02** → [[Gathering the Customer Requirements - Security]].
- [x] Cargar la **lección 03** → [[AWS Firewall Manager]].
- [x] Cargar la **lección 04** → [[Network Segmentation]].
- [x] Cargar la **lección 05** → [[Network Traffic Controls]].
- [x] Cargar la **lección 06** → [[Security Hub]].
- [x] Cargar la **lección 07** → [[Demo - AWS Security Hub]].
- [x] Cargar la **lección 08** → [[Tech Talk - AWS Security Hub]].
- [x] Cargar la **lección 09** → [[Amazon GuardDuty]].
- [x] Cargar la **lección 10** → [[Demo - AWS GuardDuty]].
- [x] Cargar la **lección 11** → [[Cryptography]].
- [x] Cargar la **lección 12** → [[AWS KMS]].
- [x] Cargar la **lección 13** → [[Demo - AWS KMS]].
- [x] Cargar la **lección 14** → [[AWS CloudHSM]].
- [x] Cargar la **lección 15** → [[AWS Secrets Manager]].
- [x] Cargar la **lección 16** → [[Finished Architecture - Security]].
- [x] Cargar la **lección 17** → [[BuildingBlocks Videos - Security]].
- [x] Cargar la **lección 18** → [[Activity - Architecture Challenge - Security]].
- [x] Definir **cuántas lecciones** tiene el módulo: **18** (la fuente cierra con la actividad final).
- [ ] **Confirmar el mapeo** de tareas (1.2 / 2.3) con las lecciones de servicio.
- [x] **Resolver la duda 1 (DDoS)**: **Shield** aparece con sección propia en la lección 03.
- [x] **Resolver la duda 4 (Level 3 HSMs)**: **CloudHSM** (lección 14) exige y cumple **FIPS 140-2 Level 3**.
- [ ] **Duda 2**: conseguir las **dos capacidades de Shield** (las flashcards no vienen en la fuente).
- [x] **Resolver la duda 5 (multi-Region keys)**: la **lección 16** confirma que existen y las usa para el **DR**.
- [ ] **Duda 3**: conciliar **inspección centralizada** (KC de la lección 04) con **cada Region protegida por
      separado** (Tech Talk). Lectura propuesta: centralizado **dentro** de la Region, distribuido **entre**.
- [ ] **Duda 6**: comparar **Secrets Manager** con **Parameter Store** (ninguna lección de la fuente lo hace).
- [ ] Revisar si el learning plan trae **labs** para este módulo.

---

## 🔗 Relacionado

- [[COMPACT - Estado del estudio]] — estado general y método de trabajo
- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] — módulo anterior (cerrado):
  la red que ahora hay que **asegurar**
- [[AWS Solutions Architect Advanced - Designing a Multi-Account Architecture]] — cuentas, OUs y **SCPs**
- [[AWS Solutions Architect Advanced - Implementing Observability and Management Controls]] — detección y
  auditoría
- [[1.2 Prescribir controles de seguridad]] — la tarea del examen que este módulo cubre
- [[2.3 Determinar los controles de seguridad en función de los requisitos]] — el cruce con Dominio 2
- [[1.1 Diseñar estrategias de conectividad de redes]] — endpoints, PrivateLink y segmentación
- [[1.4 Diseñar un entorno de AWS de varias cuentas]] — identidad y perímetro entre cuentas
- [[Guia AWS]] — pesos y tareas oficiales del SAP-C02
