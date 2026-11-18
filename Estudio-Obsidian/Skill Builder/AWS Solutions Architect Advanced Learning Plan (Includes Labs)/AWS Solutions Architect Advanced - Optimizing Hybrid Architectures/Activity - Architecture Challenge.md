---
title: "Activity — Architecture Challenge"
aliases:
  - "Architecture Challenge"
  - "AnyCompany"
  - "Actividad final híbrida"
  - "Casos AnyCompany"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - hybrid
  - actividad
  - casos
  - dominio-1
  - dominio-2
status: activo
fuente: "AWS Solutions Architect Advanced - Optimizing Hybrid Architectures (AWS Skill Builder)"
---

# Activity — Architecture Challenge

> [!abstract] Qué es este archivo
> Lección **13** y **actividad final del módulo**: **tres desafíos** con **dos preguntas cada uno** —primero
> **elegir tres** soluciones posibles y después **elegir la mejor** a la luz de **información nueva**— sobre el caso
> **AnyCompany**.
>
> No introduce servicios nuevos: **evalúa el criterio** de las lecciones 03–12 con el formato del examen
> (**“Select THREE”** + **“Choose 1”**). Se registran **las seis respuestas correctas**, las **racionales oficiales**
> y el **análisis de los distractores**.

> [!quote] La idea que ordena todo
> **“Select THREE”** premia el **abanico**; **“Choose 1”** premia el **ajuste exacto**.
>
> El mismo contenido, dos preguntas distintas: primero *¿qué podría servir?*, después *¿qué es lo que resuelve
> **esto** que acaban de agregar?*

---

## Resumen en una frase

> Una entidad financiera con **VPN punto a punto** que no escala: se resuelve con **Direct Connect + VPN de
> respaldo + Transit Gateway** (con **ECMP** para pasar el techo de **1,25 Gbps** por túnel), **Client VPN + TGW**
> para **500+ remotos**, y **Outposts / Local Zones / DX a los exchanges** para **residencia y sub-5 ms**.

---

## 1. Cómo está armada la actividad

**El formato, según la fuente:** *“se te presentan **tres preguntas**. Cada pregunta tiene **dos partes**. Primero se
te presenta un **problema o necesidad de negocio** y **seleccionás TRES** soluciones disponibles que podrían
resolverlo. Después de responder, **se te presenta información adicional** de necesidades, y entonces **decidís la
mejor solución** a la luz de esa información nueva.”*

| | **Parte 1** | **Parte 2** |
| --- | --- | --- |
| **Consigna** | **Select THREE** | **Choose 1** |
| **Qué evalúa** | **Cobertura**: qué soluciones **podrían** servir | **Ajuste**: cuál es **la mejor** con la restricción nueva |
| **Riesgo** | Elegir **una sola** y perder dos puntos | Quedarse con la respuesta “de la parte 1” sin leer **lo nuevo** |

**La mecánica:** **3 desafíos × 2 preguntas = 6 preguntas**. Todas las respuestas de la fuente están marcadas como
**“Correct!”** con su **rationale**.

> [!important] La lección de método
> La **parte 2** casi siempre **restringe**: *“ahora todos los datos tienen que estar en **infraestructura
> controlada por la empresa**”*. La respuesta correcta **no es la mejor en general**, es **la única que cumple el
> requisito agregado**.

---

## 2. El caso: AnyCompany

**El perfil:** organización **multinacional de servicios** en rápido crecimiento —**banca digital, gestión de
inversiones y seguros**— con **más de 2 millones de clientes** en **Norteamérica, Europa y Asia-Pacífico**.

| Dato | Detalle |
| --- | --- |
| **Antigüedad** | **15 años**; nació como **banco tradicional** y se transformó en **digital-first** |
| **Oferta** | **Banca móvil**, **plataformas de trading en tiempo real** y **asesoría financiera con IA** |
| **Casa matriz** | **Nueva York** |
| **Data centers** | **Virginia** y **California** (perfil) |
| **Oficinas regionales** | **Londres** y **Singapur** |
| **Sucursales** | **25 ciudades** en el mundo |
| **Volumen** | **Millones de transacciones por día** |
| **Uptime exigido** | **99,99%** para aplicaciones de cara al cliente |
| **Regulación** | **PCI-DSS**, **SOX** y **leyes regionales de protección de datos** con **residencia local** y **ultra baja latencia** para trading |

### La arquitectura actual

| Pieza | Estado |
| --- | --- |
| **AWS** | **`us-east-1`** (Virginia) y **`us-west-2`** (Oregón) |
| **On-premises** | **Data centers tradicionales en Nueva York y Londres**: **mainframes legacy**, **core banking** y **datos sensibles de clientes** que **deben quedarse on-premises** |
| **Conectividad** | **Site-to-Site VPN básica desde cada ubicación principal** |
| **Resultado** | **Performance inconsistente** y **cortes ocasionales** que afectan **operaciones y experiencia de cliente** |
| **Red** | **Una VPN por oficina regional a una VPC específica** → **telaraña punto a punto**, **difícil de administrar y escalar** |
| **Remotos** | **Clientes VPN tradicionales** + **conexiones directas de oficina** → **experiencia inconsistente** |
| **El límite** | Las **VPN sobre internet** **no dan** la **ultra baja latencia** que piden **trading** y **banca móvil** |

> [!warning] El diagnóstico en una línea
> **Muchas conexiones, ninguna arquitectura.** Cada oficina con **su** VPN a **su** VPC es el antipatrón que el
> módulo combate: **hub, no telaraña**.

---

## 3. Los cinco problemas de negocio

| # | Problema | Métrica / restricción |
| --- | --- | --- |
| 1 | **Performance y confiabilidad de red** | **Sub-10 ms** y **99,99%** de disponibilidad para aplicaciones financieras críticas |
| 2 | **Acceso remoto escalable** | **500+ empleados y contratistas** a **on-premises y AWS**, con **seguridad estricta** y **performance pareja** |
| 3 | **Compliance y residencia** | Infraestructura en **Chicago, Miami y Boston**, con **sub-5 ms** para trading |
| 4 | **DNS y integración** | **Resolución entre Active Directory on-premises y aplicaciones en AWS** para **SSO**, **service discovery** e **híbridos**, **sin DNS manual** |
| 5 | **Edge para ultra baja latencia** | **Sub-milisegundo** para **clientes de high-frequency trading** contra **feeds de mercado** y **motores de trading** |

> [!note] Un hueco del caso (lectura propia)
> Hay **cinco problemas** y **tres desafíos**: el **problema 4 (DNS)** **no tiene pregunta** en la actividad. Se
> registra en el **Registro de integración**. Quien estudie solo por esta actividad **no practica** el bloque de
> Route 53 Resolver.

---

## 4. Challenge 1 — Performance y confiabilidad

**El enunciado:** las **VPN Site-to-Site** actuales causan **performance inconsistente** y **cortes** en
aplicaciones que requieren **sub-10 ms** y **99,99%**.

### Parte 1 — Select THREE

| Opción | ¿Correcta? | Por qué |
| --- | --- | --- |
| **A. AWS Direct Connect** dedicado, latencia consistente y **jitter casi nulo** | ✅ | **Racional oficial:** DX da conectividad dedicada **de 50 Mbps a 10 Gbps** con **latencia administrada y controlada**, **performance predecible** por red privada |
| **B. Una sola VPN** para toda la conectividad híbrida | ❌ | **Un solo punto de falla** y **sin** las garantías de latencia que pide el caso |
| **C. VPC Endpoints** como método **primario** para conectar on-premises | ❌ | Los **VPC endpoints** conectan **dentro de AWS**; **no** llevan tráfico desde el data center |
| **D. Múltiples Site-to-Site VPN + Transit Gateway con ECMP** para **superar el límite de 1,25 Gbps** por túnel IPsec | ✅ | **Racional oficial:** TGW con **ECMP** **escala más allá del límite estándar de VPN** balanceando el tráfico entre túneles |
| **E. Arquitectura híbrida con Direct Connect + VPN de respaldo** | ✅ | **Racional oficial:** combinar DX con **VPN de backup** da **redundancia** y **continuidad** si un método falla |
| **F. Client VPN** como solución principal para **cargas de producción de alto ancho de banda** | ❌ | **Client VPN** es **acceso de usuarios**, no conectividad **sitio a sitio** de producción |

**El dato que hay que retener:** **1,25 Gbps por túnel IPsec** — el techo que se supera con **varios túneles + ECMP**.

### Parte 2 — Choose 1

**La información nueva:** la dirección teme **puntos únicos de falla** y quiere que las aplicaciones sigan operando
**si el método principal se cae**.

**La respuesta correcta: A — arquitectura híbrida con Direct Connect + VPN de respaldo.**

**La racional oficial:** *“una arquitectura híbrida que combina Direct Connect como conexión primaria con VPN como
respaldo da **lo mejor de los dos mundos**. Direct Connect entrega la **performance consistente y predecible** que
hace falta para los **sub-10 ms**, mientras que el **backup por VPN** asegura **alta disponibilidad y resiliencia**.
Este enfoque **elimina puntos únicos de falla** manteniendo las características de performance necesarias para
alcanzar el **99,99%**.”*

**Por qué caen las otras:**

| Opción | Por qué no |
| --- | --- |
| **B. Un DX de máxima capacidad** confiando en su **redundancia de hardware** | La redundancia **interna del equipo** no cubre la **caída de la location** ni del **circuito**: sigue siendo **un** camino |
| **C. Varias VPN + TGW con ECMP** | Supera el **ancho de banda**, pero **no** la **latencia** ni la **disponibilidad** que pide el caso |
| **D. Solo Direct Connect** | **Sin respaldo**: si el enlace cae, **no hay camino** |

> [!important] El patrón de la parte 2
> **“Eliminar puntos únicos de falla”** es una pista de **combinación**, no de **tamaño**. La respuesta no es “el
> enlace más grande”: es **dos caminos distintos**.

---

## 5. Challenge 2 — Acceso remoto y red escalable

**El enunciado:** rediseñar la red para **500+ remotos** que acceden a **on-premises y AWS**, **eliminando la
telaraña** de VPN punto a punto, con **seguridad estricta**, **performance pareja** y **administración simple**.

### Parte 1 — Select THREE

| Opción | ¿Correcta? | Por qué |
| --- | --- | --- |
| **A. AWS Client VPN** para acceso remoto a **AWS y on-premises** por un **endpoint administrado único** | ✅ | **Racional oficial:** es **un servicio administrado y escalable diseñado para empleados remotos**; **centraliza** el acceso y **elimina la telaraña** |
| **B. AWS Transit Gateway** para conectar **muchas VPC y redes on-premises** por **un solo gateway** | ✅ | **Racional oficial:** **hub-and-spoke** que **simplifica** las conexiones; **conecta la VPN IPsec administrada** de la red remota al hub regional |
| **C. Malla de security groups y NACLs** **sin** servicios de conectividad centralizados | ❌ | **Security groups y NACLs filtran**, **no conectan**: sin hub, la telaraña **sigue** |
| **D. Amazon CloudFront** como solución **principal** para conectar remotos a aplicaciones **on-premises** | ❌ | **CloudFront** es **CDN** para contenido, **no** un camino de acceso a la red corporativa |
| **E. Site-to-Site VPN + Transit Gateway** para conectar **on-premises con AWS** de forma segura | ✅ | **Racional oficial:** conexión **segura y escalable** entre la infraestructura on-premises y AWS, **manteniendo controles estrictos** |
| **F. Un Direct Connect por cada empleado remoto** | ❌ | **Inviable**: DX es **sitio a sitio**, no acceso de usuarios |

### Parte 2 — Choose 1

**La información nueva:** ya decidieron **eliminar la telaraña**; ahora hay que **identificar el servicio específico**
que da **acceso directo y seguro a usuarios individuales** por **un único endpoint**.

**La respuesta correcta: B — AWS Client VPN.**

**La racional oficial:** *“AWS Client VPN está **específicamente diseñado para el acceso de usuarios remotos**,
permitiendo que **empleados individuales** se conecten de forma segura a **AWS o a recursos on-premises** usando
**clientes de software VPN**. Es **un servicio administrado** que **elimina configuraciones complejas del lado del
cliente** y da **performance consistente sin importar la ubicación**.”*

**Por qué caen las otras:** **Site-to-Site VPN** conecta **redes**, no **personas**; **Transit Gateway** es el
**hub**, no el punto de entrada del usuario; y **S2S + TGW** es la **combinación de infraestructura**, no el acceso
individual.

> [!warning] La confusión que el examen cobra
> **Site-to-Site VPN = red ↔ red. Client VPN = persona ↔ red.** Si el enunciado dice **“empleados”**,
> **“contratistas”** o **“desde cualquier ubicación”**, la pieza es **Client VPN**.

---

## 6. Challenge 3 — Residencia y ultra baja latencia

**El enunciado:** cumplir **residencia de datos** y lograr **sub-5 ms** para trading en **Chicago, Miami y Boston**,
donde **no hay presencia regional**.

### Parte 1 — Select THREE

| Opción | ¿Correcta? | Por qué |
| --- | --- | --- |
| **A. AWS Snowball Edge** para edge computing | ❌ | Es un dispositivo de **transferencia y cómputo en el borde**, **no** una extensión permanente de la Region con los servicios que pide el caso |
| **B. Amazon CloudFront** para caché de contenido | ❌ | **Caché de contenido** no resuelve **residencia** ni **latencia de cómputo** para trading |
| **C. AWS IoT Greengrass** para procesamiento local | ❌ | Orientado a **dispositivos IoT**, no al **cómputo general** de la aplicación financiera |
| **D. AWS Outposts** en cada metro (**Chicago, Miami, Boston**) | ✅ | **Racional oficial:** infraestructura **on-premises** que mantiene el **dato en la ubicación geográfica** (**residencia**) y da **latencia de un dígito en ms** |
| **E. AWS Local Zones** en las metros objetivo | ✅ | **Racional oficial:** acerca **cómputo y storage** a los usuarios de la metro, con **sub-5 ms** y **localidad del dato** |
| **F. AWS Direct Connect** con conexiones dedicadas **a los exchanges** de cada metro | ✅ | **Racional oficial:** **el camino más corto y confiable**; para trading, **conexiones dedicadas a los exchanges** son **esenciales** para el **sub-5 ms** |

### Parte 2 — Choose 1

**La información nueva, en dos partes:**

1. **Compliance** exige que **todos los datos de trading de clientes** se **procesen y almacenen** en **su propio
   entorno de infraestructura controlada**.
2. Los clientes de **high-frequency trading** requieren **performance de red garantizada** con **ancho de banda
   dedicado** a los **exchanges financieros** principales.

**La respuesta correcta: D — AWS Outposts en cada metro.**

**La racional oficial:** *“Outposts provee **infraestructura de AWS totalmente administrada desplegada on-premises o
en ubicaciones de borde bajo control físico del cliente**. Atiende el **requisito regulatorio de infraestructura
controlada** y **sigue dando servicios de AWS**. Puede entregar el **sub-5 ms** colocando **cómputo y storage
directamente en las metros objetivo**. También **mantiene el cumplimiento de residencia**, porque la infraestructura
**permanece en el entorno controlado de AnyCompany**.”*

**Por qué caen las otras:**

| Opción | Por qué no |
| --- | --- |
| **A. Local Zones** en las metros | Acerca el cómputo, pero **no** está **bajo control físico** de la empresa: es **infraestructura de AWS** |
| **B. Local Zone + internet público cifrado** | **Contradice** el requisito de **red dedicada garantizada** y el de **control** |
| **C. Direct Connect dedicado a los exchanges** | Resuelve la **banda dedicada**, pero **no** el **procesamiento y almacenamiento en entorno controlado** |

> [!note] El detalle que la fuente deja abierto (lectura propia)
> La parte 2 pide **dos cosas** —**infraestructura controlada** y **banda dedicada a los exchanges**— y la respuesta
> elegida (**Outposts**) cubre **la primera**. El **DX a los exchanges** ya había sido seleccionado en la parte 1 y
> **no se descarta**: se asume que **se combinan**. La fuente **no lo dice** y queda registrado en el
> **Registro de integración**.

---

## 7. El patrón: cómo se responde

| Señal en el enunciado | Qué mirar | Respuesta del caso |
| --- | --- | --- |
| **“Sub-10 ms”**, **“jitter bajo”**, producción | **Enlace dedicado** | **Direct Connect** |
| **“Superar 1,25 Gbps”** | **Varios túneles + ECMP** | **S2S VPN múltiple + TGW** |
| **“Eliminar puntos únicos de falla”** | **Combinación**, no tamaño | **DX + VPN de respaldo** |
| **“Empleados / contratistas / cualquier ubicación”** | **Acceso de usuarios** | **Client VPN** |
| **“Telaraña de conexiones”**, **“muchas VPC”** | **Hub** | **Transit Gateway** |
| **“Residencia en una metro”** + **“sub-5 ms”** | **Infra de AWS en la ciudad** | **Local Zones** |
| **“Datos en entorno controlado por la empresa”** | **Infra en su sitio** | **Outposts** |
| **“Banda dedicada a los exchanges”** | **Camino privado corto** | **Direct Connect** |
| **“CloudFront / Snowball / Greengrass”** como respuesta a red híbrida | **Distractor**: no son conectividad híbrida ni cómputo general | ❌ |

**La secuencia de razonamiento que conviene automatizar:**

1. **¿Quién se conecta?** usuarios (**Client VPN**) o redes (**S2S VPN / DX**).
2. **¿Qué se mide?** latencia (**DX**, **Local Zones**), throughput (**ECMP**), disponibilidad (**dos caminos**).
3. **¿Dónde tiene que estar el dato?** en AWS (**Local Zones**), en el país (**Local Zone / Region**) o **bajo
   control del cliente** (**Outposts**).
4. **¿Qué restricción agregó la parte 2?** Esa es la que **decide**.

---

## 8. Los límites de esta fuente

> [!note] Huecos registrados (no se inventan)
> - **Sin demo y sin Knowledge Check**: es una **actividad** con **seis preguntas** y sus racionales.
> - **Sin puntaje**, **sin tiempo límite** y **sin segundo intento**: la fuente solo muestra **“Correct!”**.
> - **Sin explicación de los distractores**: las racionales cubren **solo las respuestas correctas**; el análisis de
>   las incorrectas de esta nota es **lectura propia**.
> - **El problema 4 (DNS) no tiene pregunta**.
> - **Sin el diagrama** de la arquitectura de AnyCompany: el caso es **solo texto**.
> - **Sin costos**: no se comparan precios de DX, Outposts ni Local Zones.
> - **Sin cifras de SLA**: **99,99%** y **sub-10 / sub-5 ms** se enuncian como **requisitos del caso**, no como
>   compromisos del servicio.
> - **Sin la lista de regiones** ni de **Local Zones disponibles**.
> - **La fuente no indica cuántas lecciones tiene el módulo**: con esta van **13**.

---

## 9. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de las fuentes, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 8** y se cierra con la **11**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el texto exacto de las racionales, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 9.1 La actividad y el caso

En este desafío se te presentan **una serie de tres preguntas**. **Cada pregunta tiene dos partes.** Primero se te
presenta **un problema o una necesidad de negocio**: **seleccionás TRES** soluciones disponibles que **podrían
funcionar** para resolverla. Después de responder, **se te presenta información adicional** de necesidades, y en ese
momento **decidís la mejor solución apropiada** con base en esa **información nueva**. **Buena suerte.**

**Sobre la empresa:** **AnyCompany** es una **organización multinacional de servicios en rápido crecimiento** que
provee **banca digital**, **gestión de inversiones** y **productos de seguros** a **más de 2 millones de clientes**
en **Norteamérica, Europa y la región de Asia-Pacífico**. Fundada hace **15 años** como un **banco tradicional de
ladrillo y cemento**, AnyCompany se transformó en una **institución financiera digital-first**, con **aplicaciones
de banca móvil**, **plataformas de trading en tiempo real** y **servicios de asesoría financiera impulsados por IA**.
La empresa opera desde su **casa matriz en Nueva York**, con **data centers principales en Virginia y California**,
**oficinas regionales en Londres y Singapur** y **sucursales más chicas en 25 ciudades** del mundo.

A medida que AnyCompany **expande sus ofertas digitales** y sus **requisitos de cumplimiento regulatorio**, la
organización **migra gradualmente cargas críticas a AWS** mientras **mantiene ciertos sistemas on-premises** por
**requisitos regulatorios y de residencia de datos**. La empresa **procesa millones de transacciones por día**,
requiere **99,99% de uptime** para **aplicaciones de cara al cliente**, y **debe cumplir con regulaciones
financieras estrictas** —incluyendo **PCI-DSS**, **SOX** y **leyes regionales de protección de datos**— que a
menudo **exigen residencia local de datos** y **ultra baja latencia** para **aplicaciones de trading**.

**Arquitectura de negocio actual:** AnyCompany opera hoy una **arquitectura de nube híbrida** con **infraestructura
primaria de AWS en las Regiones `us-east-1` (Virginia) y `us-west-2` (Oregón)**, junto con **infraestructura
on-premises sustancial** en sus **ubicaciones globales**. La empresa mantiene **data centers tradicionales en Nueva
York y Londres** que alojan **sistemas mainframe legacy**, **plataformas de core banking** y **datos sensibles de
clientes** que **deben permanecer on-premises por requisitos regulatorios**. Su **conectividad actual a AWS** se
apoya en **conexiones Site-to-Site VPN básicas desde cada ubicación principal**, lo que **resultó en performance de
red inconsistente** y **problemas de conectividad ocasionales** que **impactan tanto las operaciones internas como
la experiencia del cliente**.

La **arquitectura de red existente** incluye **conexiones VPN individuales desde cada oficina regional a VPC
específicas en AWS**, creando una **compleja telaraña de conexiones punto a punto** que es **difícil de administrar
y escalar**. Los **empleados remotos** acceden hoy a **recursos on-premises y de nube** mediante una **combinación
de clientes VPN tradicionales y conexiones directas de oficina**, lo que **genera experiencias de usuario
inconsistentes**. Además, la **creciente necesidad de aplicaciones de trading en tiempo real** y **banca móvil**
requiere **conexiones de ultra baja latencia** que sus **soluciones VPN basadas en internet** **no pueden proveer de
forma confiable**.

**Problemas de negocio:**

1. **Performance y confiabilidad de red:** AnyCompany necesita **establecer conectividad predecible y de alto
   rendimiento** entre sus **data centers on-premises** y la **infraestructura de AWS** para sostener
   **aplicaciones financieras críticas** que requieren **latencia consistente por debajo de 10 ms** y **99,99% de
   disponibilidad**.
2. **Estrategia de acceso remoto escalable:** la organización debe **implementar una solución integral de acceso
   remoto** que pueda **conectar sin problemas a más de 500 empleados y contratistas remotos** tanto a **sistemas
   on-premises** como a **recursos de AWS**, **manteniendo controles de seguridad estrictos** y **ofreciendo
   performance consistente sin importar la ubicación del usuario**.
3. **Cumplimiento regulatorio y residencia de datos:** la empresa necesita **desplegar infraestructura de AWS en
   ubicaciones geográficas donde hoy no tiene presencia regional** —**específicamente en áreas metropolitanas como
   Chicago, Miami y Boston**— para **cumplir requisitos de procesamiento local de datos** y **reducir la latencia
   de las aplicaciones de trading por debajo de 5 ms**.
4. **Resolución DNS e integración de servicios:** AnyCompany requiere **resolución DNS sin costuras** entre su
   **entorno on-premises de Active Directory** y sus **aplicaciones alojadas en AWS**, para habilitar **single
   sign-on**, **service discovery** y **arquitecturas de aplicaciones híbridas**, **sin administración manual de
   DNS ni problemas de conectividad**.
5. **Edge computing para aplicaciones de ultra baja latencia:** la organización necesita **implementar soluciones
   de edge computing** que soporten su **plataforma de trading en tiempo real** y sus **aplicaciones de banca
   móvil** en **áreas donde no tienen infraestructura existente**, particularmente para **servir a clientes de
   high-frequency trading** que requieren **latencia por debajo del milisegundo** hacia **feeds de datos de mercado**
   y **motores de trading**.

### 9.2 Challenge 1 de 3: Performance y confiabilidad de red

Las **conexiones Site-to-Site VPN actuales** de AnyCompany están causando **performance de red inconsistente** y
**problemas de conectividad ocasionales** que **impactan sus aplicaciones financieras críticas**, que requieren
**latencia por debajo de 10 ms** y **99,99% de disponibilidad**.

**Pregunta 1.** Como **Cloud Solutions Architect**, ¿qué **soluciones de conectividad y enfoques arquitectónicos de
AWS** deberías recomendar para atender **estos requisitos de performance y confiabilidad**? (**Elegí TRES.**)

- **A.** Desplegar **AWS Direct Connect** para una **conexión privada dedicada** con **latencia consistente** y
  **jitter casi nulo**.
- **B.** **Apoyarse únicamente en una sola conexión VPN** para **todas** las necesidades de conectividad híbrida.
- **C.** Usar **VPC Endpoints** como **método primario** para conectar **recursos on-premises** con AWS.
- **D.** Implementar **múltiples conexiones AWS Site-to-Site VPN con AWS Transit Gateway usando ruteo equal cost
  multi-path (ECMP)** para **superar el límite de throughput de 1,25 Gbps del IPsec VPN**.
- **E.** Diseñar una **arquitectura de red híbrida usando conexiones Direct Connect y VPN** como **respaldo**, para
  asegurar **alta disponibilidad y resiliencia**.
- **F.** Seleccionar **AWS Client VPN** como **solución principal** para **cargas de producción de alto ancho de
  banda** que requieren **performance consistente**.

**Correcto: A, D y E.**

**Racional A:** es correcta porque **AWS Direct Connect provee conectividad dedicada desde 50 Mbps hasta 10 Gbps**
con **latencia administrada y controlada**. Ofrece **performance predecible y consistente** mediante **conectividad
de red privada**, lo que la hace **ideal para cargas de producción que requieren performance confiable**.

**Racional D:** es correcta porque **AWS Transit Gateway con soporte de ruteo ECMP permite escalar más allá de los
límites estándar de throughput de VPN**, **balanceando el tráfico entre múltiples túneles VPN** y **mejorando tanto
la performance como la confiabilidad mediante redundancia**.

**Racional E:** es correcta porque **combinar Direct Connect con conexiones VPN de respaldo** provee **opciones de
conectividad redundantes**, **aumentando la confiabilidad de la carga** y **asegurando operaciones continuas incluso
si un método de conexión falla**.

**Pregunta 2.** La dirección de AnyCompany está **preocupada por posibles puntos únicos de falla** en su solución de
conectividad. Quieren **asegurar que, incluso si su método principal de conectividad sufre una interrupción**, sus
**aplicaciones financieras críticas puedan seguir operando sin interrupción**. ¿Qué **enfoque arquitectónico**
deberías recomendar para **atender tanto los requisitos de performance como para eliminar los puntos únicos de
falla**? (**Elegí 1.**)

- **A.** Diseñar una **arquitectura de red híbrida usando conexiones Direct Connect y VPN** como **respaldo**, para
  asegurar **alta disponibilidad y resiliencia**.
- **B.** **Provisionar una única conexión dedicada de AWS Direct Connect de máxima capacidad** y **confiar en la
  redundancia de hardware incorporada** de la conexión para **mantener la disponibilidad** de las aplicaciones
  críticas.
- **C.** Implementar **múltiples conexiones AWS Site-to-Site VPN con AWS Transit Gateway usando ECMP** para
  **superar el límite de throughput de 1,25 Gbps del IPsec VPN**.
- **D.** Desplegar **AWS Direct Connect** para una **conexión privada dedicada** con **latencia consistente** y
  **jitter casi nulo**.

**Correcto: A.**

**Racional:** esta opción es correcta porque **una arquitectura híbrida que combina Direct Connect como conexión
primaria con VPN como respaldo da lo mejor de los dos mundos**. **Direct Connect entrega la performance consistente
y predecible** que hace falta para los **requisitos de sub-10 ms**, mientras que el **respaldo por VPN asegura alta
disponibilidad y resiliencia**. Este enfoque **elimina los puntos únicos de falla** y **mantiene las características
de performance** que necesitan las **aplicaciones financieras críticas** para alcanzar **99,99% de disponibilidad**.

### 9.3 Challenge 2 de 3: Acceso remoto escalable y arquitectura de conectividad híbrida

AnyCompany necesita **rediseñar su arquitectura de red** para **soportar a más de 500 empleados remotos** que
acceden **a sistemas on-premises y a recursos de AWS**, **eliminando la compleja telaraña actual de conexiones VPN
punto a punto**. La solución debe **proveer performance consistente**, **mantener controles de seguridad estrictos**
y ser **fácil de administrar y escalar**.

**Pregunta 1.** ¿Qué **combinación de servicios de AWS y patrones arquitectónicos** atendería mejor estos
requisitos? (**Elegí TRES.**)

- **A.** Desplegar **AWS Client VPN** para proveer **acceso remoto seguro** a **recursos de AWS y on-premises** a
  través de **un único endpoint administrado**.
- **B.** Implementar **AWS Transit Gateway** para **conectar múltiples VPC y redes on-premises** a través de **un
  solo gateway**, **simplificando la arquitectura de red**.
- **C.** Configurar una **malla de security groups y NACLs** **sin servicios de conectividad centralizados** para
  **mantener la seguridad** mientras se **reduce la complejidad**.
- **D.** Implementar **Amazon CloudFront** como **solución principal** para **conectar empleados remotos** con
  **aplicaciones on-premises**.
- **E.** Usar **AWS Site-to-Site VPN en combinación con AWS Transit Gateway** para **conectar sistemas
  on-premises con recursos de AWS** de forma **segura**.
- **F.** Configurar **conexiones AWS Direct Connect individuales para cada empleado remoto** para **acceder a los
  recursos de AWS** con **performance consistente**.

**Correcto: A, B y E.**

**Racional A:** es correcta porque **AWS Client VPN provee una solución VPN administrada y escalable
específicamente diseñada para que empleados remotos accedan tanto a recursos de AWS como a sistemas on-premises**.
Esto **elimina la compleja telaraña de conexiones punto a punto centralizando el acceso en un único endpoint**,
**mejorando la administración y la seguridad**. Está **específicamente diseñada para escenarios de acceso de
empleados remotos** como el de AnyCompany.

**Racional B:** es correcta porque **AWS Transit Gateway actúa como un hub de tránsito de red** que **simplifica las
conexiones entre múltiples VPC y redes on-premises**. **Elimina la compleja telaraña de conexiones punto a punto**
proveyendo un **modelo hub-and-spoke**. Transit Gateway es una **buena solución para establecer una conexión VPN
IPsec administrada desde el equipamiento de red de una red remota hacia un hub de red regional para las VPC**, lo
que **atiende directamente los requisitos de performance consistente y administración simplificada**.

**Racional E:** es correcta porque **la combinación de AWS Site-to-Site VPN con Transit Gateway crea una conexión
segura y escalable entre la infraestructura on-premises y los recursos de AWS**. Este enfoque **mantiene controles de
seguridad estrictos** mientras provee **infraestructura administrable**.

**Pregunta 2.** AnyCompany decidió **implementar una solución integral de acceso remoto** para sus **más de 500
empleados remotos**. Después de **determinar que necesitan eliminar la compleja telaraña de conexiones VPN punto a
punto**, ahora necesitan **identificar el servicio específico de AWS que proveerá acceso directo y seguro a usuarios
remotos individuales**. ¿Qué **servicio de AWS** debería implementar AnyCompany para dar a **empleados remotos
individuales** acceso seguro **a sus recursos de AWS y on-premises** a través de **un único endpoint**? (**Elegí 1.**)

- **A.** Desplegar **solo AWS Site-to-Site VPN**.
- **B.** Desplegar **AWS Client VPN** para proveer **acceso remoto seguro** a **recursos de AWS y on-premises** a
  través de **un único endpoint administrado**.
- **C.** Implementar **AWS Transit Gateway** para conectar **múltiples VPC y redes on-premises**.
- **D.** Usar **AWS Site-to-Site VPN en combinación con AWS Transit Gateway**.

**Correcto: B.**

**Racional:** esta es la **respuesta CORRECTA**. **AWS Client VPN está específicamente diseñado para el acceso de
usuarios remotos**, permitiendo que **empleados individuales se conecten de forma segura a recursos de AWS o
on-premises usando clientes de software VPN**. Provee **exactamente la funcionalidad que AnyCompany necesita** para
soportar a sus **más de 500 empleados remotos** accediendo a recursos **desde ubicaciones variadas**. **AWS Client
VPN es un servicio administrado** que **elimina la necesidad de configuraciones complejas del lado del cliente** y
**provee performance consistente sin importar la ubicación del usuario**.

### 9.4 Challenge 3 de 3: Compliance regulatorio y requisitos de ultra baja latencia

AnyCompany necesita **cumplir requisitos regulatorios de procesamiento local de datos** y **lograr latencia por
debajo de 5 ms** para **aplicaciones de trading** en **áreas metropolitanas como Chicago, Miami y Boston**, donde
AnyCompany **hoy no tiene presencia regional**.

**Pregunta 1.** ¿Qué **soluciones de infraestructura y edge computing de AWS** deberían implementarse?
**Considerá tanto el cumplimiento de residencia de datos como las necesidades de ultra baja latencia** de los
**clientes de high-frequency trading**. (**Elegí TRES.**)

- **A.** Desplegar **dispositivos AWS Snowball Edge** para **edge computing**.
- **B.** Usar **Amazon CloudFront** para **caching de contenido**.
- **C.** Implementar **AWS IoT Greengrass** para **procesamiento local**.
- **D.** Desplegar **AWS Outposts en cada área metropolitana** (Chicago, Miami, Boston).
- **E.** Implementar **AWS Local Zones en las áreas metropolitanas objetivo**.
- **F.** Usar **AWS Direct Connect con conexiones dedicadas a los exchanges** en cada área metropolitana.

**Correcto: D, E y F.**

**Racional D:** es correcta porque **AWS Outposts provee infraestructura de AWS on-premises**, **permitiendo que el
dato permanezca en ubicaciones geográficas específicas** por **cumplimiento regulatorio**, mientras **entrega la
latencia de un dígito en milisegundos** que requieren las **aplicaciones de high-frequency trading**. **Atiende
directamente tanto la residencia de datos como la ultra baja latencia.**

**Racional E:** es correcta porque **AWS Local Zones ubica servicios de cómputo y almacenamiento de AWS más cerca de
los usuarios finales en áreas metropolitanas**, proveyendo **latencia por debajo de 5 ms** para **aplicaciones
sensibles a la latencia** como el **high-frequency trading**, **manteniendo la localidad del dato** para el
**cumplimiento regulatorio**.

**Racional F:** es correcta porque **Direct Connect provee el camino más corto y confiable hacia los recursos de
AWS** con **conectividad predecible y de baja latencia**. Para **aplicaciones de trading donde los milisegundos
importan**, las **conexiones dedicadas a los exchanges** son **esenciales** para **cumplir los requisitos de
sub-5 ms**.

**Pregunta 2.** El **equipo de compliance** de AnyCompany **especificó ahora** que **todos los datos de trading de
clientes** deben **procesarse y almacenarse dentro de su propio entorno de infraestructura controlada**, debido a un
**escrutinio regulatorio reforzado**. Además, sus **clientes de high-frequency trading** requieren **performance de
red garantizada con ancho de banda dedicado** hacia los **principales exchanges financieros**. ¿Qué **enfoque de
implementación** atiende mejor **estas restricciones adicionales**? (**Elegí 1.**)

- **A.** Implementar **AWS Local Zones** en las **áreas metropolitanas objetivo**.
- **B.** Desplegar **cargas en una AWS Local Zone cercana a los exchanges financieros** y **enrutar el tráfico de
  trading por internet público con cifrado**.
- **C.** Usar **AWS Direct Connect con conexiones dedicadas a los exchanges** en **cada área metropolitana**.
- **D.** Desplegar **AWS Outposts en cada área metropolitana** (Chicago, Miami, Boston).

**Correcto: D.**

**Racional:** esta respuesta es correcta porque **AWS Outposts provee infraestructura de AWS totalmente administrada
desplegada on-premises o en ubicaciones de borde bajo el control físico del cliente**. Esto **atiende el requisito
regulatorio reforzado de infraestructura controlada** y **sigue proveyendo servicios de AWS**. **Outposts puede
entregar el sub-5 ms** necesario para trading **colocando cómputo y almacenamiento directamente en las áreas
metropolitanas objetivo**. La solución también **mantiene el cumplimiento de residencia de datos**, ya que la
**infraestructura permanece dentro del entorno controlado de AnyCompany**.

**¡Felicitaciones! Completaste todos los Architecture Challenges de este curso.**

---

## 10. Las seis respuestas (cierre)

| # | Desafío | Parte 1 (THREE) | Parte 2 (ONE) | La restricción que decide |
| --- | --- | --- | --- | --- |
| **1** | Performance y confiabilidad | **A · D · E** — DX, ECMP, híbrido | **A** — **DX + VPN de respaldo** | **Eliminar puntos únicos de falla** |
| **2** | Acceso remoto | **A · B · E** — Client VPN, TGW, S2S + TGW | **B** — **Client VPN** | **Usuarios individuales por un endpoint** |
| **3** | Residencia y latencia | **D · E · F** — Outposts, Local Zones, DX | **D** — **Outposts** | **Infraestructura bajo control del cliente** |

**La lectura de conjunto:** las tres partes 2 **restringen hacia el mismo lado** —**resiliencia**, **personas** y
**control**— y las tres respuestas ganadoras son las **que cumplen la restricción más dura**, no las que **suman más
servicios**.

---

## 11. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **“Select THREE”** pide **cobertura**; **“Choose 1”** pide **la mejor con la restricción nueva**. Son dos
>    preguntas distintas sobre el mismo caso.
> 2. **Direct Connect**: **50 Mbps a 10 Gbps**, **latencia administrada**, **jitter casi nulo**.
> 3. **1,25 Gbps por túnel IPsec** es el techo que se supera con **múltiples Site-to-Site VPN + TGW con ECMP**.
> 4. **Eliminar puntos únicos de falla = combinar**: **Direct Connect primario + VPN de respaldo**.
> 5. **Un DX “de máxima capacidad”** no elimina el punto único: la **redundancia de hardware** no cubre la
>    **location**.
> 6. **Client VPN** = **personas** por **un endpoint administrado**; **Site-to-Site VPN** = **redes**.
> 7. **Transit Gateway** = **hub** que elimina la **telaraña punto a punto**.
> 8. **VPC Endpoints** **no** conectan on-premises con AWS; **CloudFront**, **Snowball Edge** y **Greengrass** **no**
>    son la respuesta a conectividad híbrida.
> 9. **Local Zones** = **sub-5 ms** en la metro, **infraestructura de AWS**; **Outposts** = **sub-5 ms** con
>    **infraestructura bajo control del cliente** y **residencia**.
> 10. **DX dedicado a los exchanges** = **camino más corto y banda dedicada** para trading.

> [!warning] Trampa clásica del examen
> Escenario: “**todos los datos** deben procesarse y almacenarse en **infraestructura controlada por la empresa**”.
> La respuesta **no** es **Local Zones** (es infraestructura **de AWS**) ni **“Local Zone + internet cifrado”**
> (contradice la **banda dedicada**): es **Outposts**. Segunda trampa: elegir **“un DX de máxima capacidad”** cuando
> piden **eliminar puntos únicos de falla** — la redundancia **interna** no es **redundancia de camino**.

---

## Relacionado

- [[Finished Architecture]] — el mismo tipo de caso, resuelto pieza por pieza
- [[AWS Direct Connect - Connection Options]] — el enlace dedicado y sus límites
- [[AWS Direct Connect - Redundancy and Resilience]] — por qué **un** DX no es alta disponibilidad
- [[AWS Site-to-Site VPN]] — el techo de **1,25 Gbps** y el **ECMP**
- [[AWS Client VPN]] — el acceso de los **500+ remotos**
- [[AWS Outposts]] — la respuesta de **residencia bajo control del cliente**
- [[AWS Local Zones]] — la respuesta de **sub-5 ms** en la metro
- [[Amazon Route 53 Resolver]] — el **problema 4** que la actividad **no pregunta**
- [[AWS Solutions Architect Advanced - Optimizing Hybrid Architectures]] *(índice del módulo)*
- [[Use Cases - Transit Gateway]] — el **hub** que elimina la telaraña
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que estos casos evalúan
- [[1.3 Diseñar arquitecturas fiables y resistentes]] — el criterio de **puntos únicos de falla**
- Cierre del módulo: queda el **quiz integrador** y el **mapa de progreso final**

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 29/10/2026 | Lección 13 completa: actividad con **3 desafíos × 2 preguntas**, caso **AnyCompany** y **seis racionales** oficiales | Nota completa (secciones 1–11) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **Cinco problemas de negocio, tres desafíos**: el **problema 4 (DNS entre Active Directory y AWS)** **no tiene
   pregunta**. Se marca en §3 y en §11 como hueco de práctica.
2. **Inventario de ubicaciones inconsistente en la fuente**: el perfil dice **“data centers principales en Virginia y
   California”**; la arquitectura actual dice **“data centers tradicionales en Nueva York y Londres”**; y las
   Regions de AWS son **`us-east-1` (Virginia)** y **`us-west-2` (Oregón)**. Se transcriben **las tres** versiones y
   **no se corrigen**.
3. **Las latencias no coinciden entre problemas**: el problema 3 pide **sub-5 ms**, el 5 pide **sub-milisegundo** y
   el desafío 3 vuelve a **sub-5 ms**. Se conservan literales.
4. **La parte 2 del desafío 3 pide dos cosas** —**infraestructura controlada** y **banda dedicada a los
   exchanges**— y la respuesta (**Outposts**) cubre **la primera**; el **DX a los exchanges** se asume combinado. La
   fuente **no lo dice**; se marca en §6 y **no se resuelve**.
5. **Las racionales solo explican las respuestas correctas**: no hay justificación oficial de **B, C y F** en cada
   parte 1 ni de los distractores de las partes 2. El análisis de los distractores de esta nota es **lectura
   propia**.
6. **La actividad está marcada toda como “Correct!”** con el mismo formato de *Knowledge Check*, aunque es una
   **actividad** y no una evaluación con puntaje.
7. **Sin diagrama** de la arquitectura de AnyCompany: el caso es **solo texto**.
8. **Sin precios, sin SLA y sin lista de regiones o Local Zones**: **99,99%**, **sub-10 ms** y **sub-5 ms** son
   **requisitos del caso**, no compromisos del servicio.
9. **La fuente no indica cuántas lecciones tiene el módulo**: con esta van **13**, y la actividad **cierra el
   curso** (*“You have completed all the Architecture Challenges for this course”*).

**Decisiones de transcripción:**

- Se conservan **AWS Direct Connect**, **Site-to-Site VPN**, **Client VPN**, **Transit Gateway**, **ECMP**,
  **VPC Endpoints**, **CloudFront**, **Outposts**, **Local Zones**, **Snowball Edge**, **IoT Greengrass**,
  **High Frequency Trading (HFT)**, **PCI-DSS**, **SOX**, **single sign-on** y **service discovery**.
- Las **cifras** se transcriben literales: **2 millones de clientes**, **15 años**, **25 ciudades**, **500+
  remotos**, **99,99%**, **sub-10 ms**, **sub-5 ms**, **sub-milisegundo**, **1,25 Gbps**, **50 Mbps a 10 Gbps**,
  **tres desafíos**, **seis preguntas**.
- Se conservan las **denominaciones del caso** —**AnyCompany**, **“digital-first”**, **“telaraña de conexiones punto
  a punto”**, **“lo mejor de los dos mundos”**— porque son el vocabulario del escenario.
- Las tablas de **§3**, **§4**, **§5**, **§6**, **§7** y **§10** son **lectura propia** que ordenan el caso y las
  opciones; la fuente **no** las trae.
