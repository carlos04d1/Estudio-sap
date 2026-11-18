---
title: "Activity - Architecture Challenge - Networking"
aliases:
  - "Architecture Challenge - Networking"
  - "AnyCompany"
  - "Reto de arquitectura - Networking"
tags:
  - certificacion/aws
  - sap-c02
  - skill-builder
  - networking
  - evaluacion
  - actividad
  - dominio-1
status: activo
fuente: "AWS Solutions Architect Advanced - Designing Advanced Network Architectures (AWS Skill Builder)"
---

# Activity - Architecture Challenge - Networking

> [!abstract] Qué es este archivo
> Duodécima lección del módulo y **evaluación integradora**. No trae contenido nuevo: plantea **tres desafíos**
> sobre **AnyCompany**, una fintech con problemas de red, y pide **elegir tres opciones** y después **la óptima**.
>
> Es el examen del módulo, con una vuelta: **la segunda pregunta de cada desafío reencuadra la primera**. Las
> respuestas correctas están abajo, con el razonamiento de cada distractor.

> [!quote] La idea que ordena todo
> **Elegir tres no es elegir la mejor: es descartar.** La primera pregunta premia **cobertura**; la segunda,
> **precisión**. Quien gana la primera y repite la misma lógica en la segunda, pierde.

---

## Resumen en una frase

> Tres desafíos, tres pares de respuestas: **Network Manager** para gestionar, **Direct Connect Gateway** para
> centralizar partners y **RAM** para compartir subredes y attachments.

---

## 1. El caso y el formato

**AnyCompany:** fintech de **500+ empleados**, **tres oficinas regionales**, aplicaciones bancarias y de
analytics para **salud y finanzas**. Hoy corre **todo en una sola cuenta de AWS**, con **VPC peering “según
haga falta”** y **endpoints públicos** protegidos por **security groups y NACLs**.

**Los cinco problemas que declara:**

| # | Problema |
| --- | --- |
| 1 | **Aislamiento multi-cuenta** entre prod, dev y test |
| 2 | **Gestión centralizada** de red, sin malla de peering |
| 3 | **Integración privada con partners**, sin internet |
| 4 | **Resource sharing cross-account** con control de acceso |
| 5 | **Escalabilidad**: **diez clientes enterprise** nuevos, cada uno con red aislada |

**El formato de cada desafío:**

| Parte | Qué pide | Cantidad |
| --- | --- | --- |
| **Primera** | Soluciones **que podrían servir** | **Tres** |
| **Segunda** | La **óptima**, con información nueva | **Una** |

> [!important] La trampa estructural
> Las tres de la primera parte **son válidas**. La segunda pregunta **no pide lo mismo**: pide **el servicio
> más directo** para el requisito. Ahí caen quienes repiten la opción “más completa” en vez de la **más
> específica**.

---

## 2. Desafío 1: gestión centralizada de red

**El requisito:** pasar de **una cuenta con peering** a **multi-cuenta**, con gestión de red que **escale** con
las oficinas y los equipos.

### Primera parte — las tres correctas

| Opción | Qué aporta |
| --- | --- |
| **B. AWS Network Manager + AWS Organizations** | **Gestionar transit gateways** de **varias cuentas y regiones** de forma central |
| **D. AWS Control Tower** | **Landing zone** con setup multi-cuenta automatizado y **baseline de red** |
| **F. AWS Organizations con OUs** | **Estructura jerárquica** para aplicar políticas de red por **herencia** |

**Por qué las tres:** cubren **tres capas distintas** — **gobierno** (OUs), **fundación** (Control Tower) y
**operación de red** (Network Manager). No compiten: se complementan.

### Distractores

| Opción | Por qué no |
| --- | --- |
| **A. Peering “a través de una cuenta master”** | Sigue siendo una **malla**; centralizar la administración **no elimina** el problema de escalado |
| **C. Una Organizations por oficina** | **Rompe** el gobierno central y **duplica** la administración |
| **E. AWS Config rules como herramienta principal** | **Config** audita **cumplimiento**, no **gestiona ni monitorea** la red |

### Segunda parte — la óptima

> **D. Implement AWS Network Manager with AWS Organizations integration.**

**El razonamiento de la fuente:** Network Manager está **diseñado** para gestionar redes de **Transit Gateway**
en **varias cuentas, regiones y ubicaciones on-premises**. Permite **un global network** y **registrar TGW de
varias cuentas**. Con **Organizations** habilita **trusted access** y **despliega automáticamente** los
**service-linked roles** y **roles de IAM** para la administración cross-account.

**Por qué no las otras tres:** **OUs** dan política, no **consola de gestión**; **RAM** **comparte** el TGW
pero **no lo monitorea**; **Control Tower** arma la **landing zone**, no la **operación diaria** de la red.

> [!note] Ampliación (no está en la fuente)
> La distinción es la misma de la lección 06: **RAM comparte, Network Manager observa**. Ninguno de los dos crea
> ni modifica el TGW. Si la pregunta pide “gestionar y monitorear en una sola consola”, la respuesta es
> **Network Manager**.

---

## 3. Desafío 2: integración segura con partners

**El requisito:** conexiones **privadas** con **terceros** y **partners financieros**, sin **exponer servicios a
internet**, por **cumplimiento**.

### Primera parte — las tres correctas

| Opción | Qué aporta |
| --- | --- |
| **A. Direct Connect con private VIFs** | Conexión **dedicada**, **bypassa** el internet público; **VLAN 802.1Q** con **IPs privadas** |
| **B. Direct Connect Gateway** | Recurso **global**: conecta **hasta 20 VPC** en **cualquier Región** desde **un solo private VIF** |
| **F. Transit VIFs hacia Transit Gateway** | Conecta el **DX** con el **TGW** para **ruteo escalable** de redes de partners |

**Cómo encajan las tres:** forman **una sola arquitectura**, no tres alternativas:

```
Partner → DX location → (private VIF / transit VIF) → DX Gateway ↔ Transit Gateway → VPC en varias Regiones
```

**El private VIF** lleva a **una VPC** (vía virtual private gateway); el **transit VIF** lleva al **TGW**, que
distribuye a **muchas VPC**. El **DX Gateway** es la pieza que **centraliza** y **cruza regiones**.

### Distractores

| Opción | Por qué no |
| --- | --- |
| **C. Site-to-Site VPN “over the public internet”** | El tráfico **va por internet**: incumple el requisito regulatorio, aunque tenga SG y NACL |
| **D. VPC peering con la cuenta del partner** | Asume que el partner **tiene cuenta AWS**; no sirve para redes propias y no escala a muchos partners |
| **E. PrivateLink “over the internet”** | El texto se contradice: PrivateLink **no** sale a internet; y una **IAM policy** no es el control de transporte |

### Segunda parte — la óptima

> **B. Configure AWS Direct Connect Gateway.**

**El razonamiento de la fuente:** el **DX Gateway** da **gestión centralizada** y permite **conectarse a varias
Regiones** desde **una sola ubicación de Direct Connect**. Eso **simplifica la administración** y mantiene
**seguridad y cumplimiento** para partners en **geografías distintas**.

**El detalle que decide entre B y C:** las dos son correctas en la primera parte, pero la pregunta pide
**“centralized management”** y **“multi-region”**. Eso es **DX Gateway**. El **transit VIF** es el **medio de
enganche al TGW**, no la pieza de administración central.

> [!warning] El dato del “20” que la fuente dice de más
> El rationale afirma que el DX Gateway “conecta **hasta 20 VPC** en cualquier Región **sobre un solo private
> VIF**”. La cifra pertenece al número de **virtual private gateways** que se asocian al DX Gateway, no a un
> límite de VPC por VIF. Se transcribe literal en §6 y queda registrado como imprecisión.

---

## 4. Desafío 3: compartir recursos entre cuentas

**El requisito:** los equipos de **dev, test y prod** —cada uno en su cuenta— necesitan **los mismos componentes
de red**, con **aislamiento** y **gobierno**, **sin duplicar** infraestructura.

### Primera parte — las tres correctas

> [!warning] Pregunta duplicada en la fuente
> La primera pregunta de este desafío es **idéntica** a la primera del Desafío 2: mismo enunciado (“secure,
> private partner integrations”) y mismas seis opciones. Las respuestas también son las mismas: **A, B y F**.
> El contenido **no corresponde** al título del desafío. Se registra como defecto de la fuente y se responde
> igual, porque es lo que el curso marca como correcto.

| Opción | Por qué es correcta |
| --- | --- |
| **A. Direct Connect con private VIFs** | Conexión privada dedicada |
| **B. Direct Connect Gateway** | Centralización multi-Región |
| **F. Transit VIFs hacia TGW** | Ruteo escalable desde el DX |

### Segunda parte — la óptima

> **A. Implement AWS RAM to share VPC subnets and Transit Gateway attachments across accounts within the
> organization.**

**El razonamiento de la fuente:** **RAM está diseñado específicamente** para compartir **subredes de VPC** y
**attachments de Transit Gateway** entre cuentas, que es exactamente lo que AnyCompany necesita: **compartir sin
duplicar**, con **control de acceso**.

### Distractores

| Opción | Por qué no |
| --- | --- |
| **B. SCPs para restringir el sharing a la organización** | **Restringe**, no **implementa** el sharing |
| **C. Data perimeter con `aws:PrincipalOrgId`** | Buen control **complementario**, pero **no es el mecanismo de compartición** |
| **D. Resource-based policies en cada subred** | **No es cómo se comparte una subred**: se hace por **RAM** (VPC sharing) |

> [!note] Ampliación (no está en la fuente)
> La opción **C** es la más peligrosa de las tres: **suena a buena práctica** y lo es, pero la pregunta pide
> **la configuración que habilita el sharing**. Un control de perímetro **no crea** el recurso compartido.

---

## 5. Cómo se descartan los distractores

| Distractor | El error que comete |
| --- | --- |
| **Peering administrado desde una cuenta master** | Centraliza **la administración**, no **la topología**: sigue siendo malla |
| **Una Organizations por oficina** | Confunde **aislamiento** con **fragmentación** del gobierno |
| **AWS Config como herramienta de red** | Confunde **auditoría de cumplimiento** con **gestión de red** |
| **VPN Site-to-Site para cumplimiento** | Confunde **cifrado** con **no atravesar internet** |
| **Peering con el partner** | Asume que el partner **es una cuenta AWS** y que los **CIDR no se solapan** |
| **PrivateLink “over the internet”** | Contradice **cómo funciona** PrivateLink |
| **SCPs / data perimeter** | Confunde **restringir** con **compartir** |
| **Policies por subred** | Inventa un mecanismo que **no existe** para subredes |

---

## 6. Traducción del contenido

> [!info] Sección de referencia (opcional)
> Esto es la **traducción fiel** de la fuente, para verificar que no se perdió nada. **No hace falta leerla
> para estudiar**: lo que se estudia son las secciones **1 a 5** y se cierra con la **8**.
> Usala solo si (a) algo de arriba te quedó dudoso, (b) querés el texto exacto de una opción, o (c) antes del
> examen querés chequear que no se escapó un matiz.

### 6.1 Enunciado: Activity — Architecture Challenge

En este challenge se te presentan **tres preguntas**. Cada pregunta tiene **dos partes**. Primero se te presenta
**un problema o una necesidad de negocio**. Tenés que **seleccionar TRES soluciones disponibles** que podrían
servir para resolver la necesidad. Después de responder, se te presenta **una evaluación adicional de
necesidades**, y en ese momento tenés que **decidir la solución óptima** con esa **información nueva**.

**Sobre el negocio.** **AnyCompany** es una **empresa de tecnología financiera en rápido crecimiento** que se
especializa en **desarrollar aplicaciones bancarias seguras y soluciones de data analytics** para **clientes
enterprise de los sectores de salud y financiero**.

**Fundada hace cinco años**, la compañía **pasó de ser un startup chico a una empresa mediana con más de 500
empleados en tres oficinas regionales**. AnyCompany se enorgullece de **ofrecer soluciones altamente seguras,
compliant y confiables** que **protegen datos sensibles de clientes** y, al mismo tiempo, **habilitan servicios
financieros innovadores**.

**Arquitectura de negocio actual.** AnyCompany **opera hoy con una estructura de una sola cuenta de AWS** que
**aloja todos sus entornos de desarrollo, testing y producción**. Su arquitectura **consiste en múltiples VPC con
conexiones de VPC peering simples, establecidas según necesidad**. A medida que la compañía creció, **este
enfoque llevó a una telaraña cada vez más compleja de peering connections, con políticas de seguridad
inconsistentes entre entornos**. El **resource sharing entre equipos se administra con políticas de IAM dentro de
la única cuenta**, y la **conectividad externa con partners se maneja con endpoints públicos**, con **security
groups y network ACLs** como protección. Los **servicios de base de datos y las APIs internas son accesibles
desde todos los entornos con una segmentación de red mínima**.

**Problemas de negocio.**

1. **Aislamiento de seguridad multi-cuenta**: AnyCompany **necesita pasar de su modelo de una sola cuenta a una
   arquitectura multi-cuenta** que **aísle correctamente producción, desarrollo y test**, manteniendo **caminos
   de comunicación seguros** entre los servicios que lo necesitan.
2. **Gestión centralizada de red**: la compañía **requiere un enfoque simplificado para administrar la red entre
   múltiples cuentas**, **sin crear una malla compleja de VPC peering** que sería **difícil de escalar y
   mantener** a medida que crecen.
3. **Integración segura con partners**: AnyCompany **debe establecer conexiones privadas seguras con
   proveedores de servicios y partners terceros**, **sin exponer servicios a internet público**, y **cumpliendo
   con regulaciones de la industria financiera** sobre protección de datos.
4. **Resource sharing cross-account**: a medida que **los equipos crecen y se especializan**, **necesitan un
   método consistente para compartir recursos de red entre cuentas**, manteniendo **controles de acceso
   adecuados** y **evitando la duplicación de infraestructura**.
5. **Arquitectura de red escalable**: la compañía **anticipa sumar diez clientes enterprise en el próximo año**,
   **cada uno con entornos de red aislados** y **conectados a sus servicios core**. La solución **debe escalar
   eficientemente sin requerir cambios arquitectónicos mayores por cada cliente nuevo**.

### 6.2 Desafío 1 de 3: Centralized Network Management

AnyCompany **está pasando de su arquitectura actual de una sola cuenta, con múltiples VPC peering connections, a
un setup multi-cuenta**. **Necesitan implementar una solución de gestión centralizada de red que escale
eficientemente** a medida que **siguen creciendo sus oficinas regionales y su estructura de equipos**.

> **Pregunta 1.** Como Cloud Solutions Architect, **¿qué componentes y prácticas arquitectónicas deberías
> recomendar para establecer una gestión de red simplificada en su nuevo entorno multi-cuenta?** (Elegí TRES.)

- **A.** Seguir usando VPC peering connections, pero implementarlas **a través de una única cuenta master** para
  centralizar la administración.
- **B.** Implementar **AWS Network Manager con integración de AWS Organizations** para **gestionar transit
  gateways de forma central** en múltiples cuentas y regiones.
- **C.** Implementar **una AWS Organizations separada para cada oficina regional** para mantener el aislamiento
  de red y la administración independiente.
- **D.** Desplegar **AWS Control Tower** para establecer una **landing zone** con **setup multi-cuenta
  automatizado** y **configuraciones baseline de red**.
- **E.** Usar **AWS Config rules como herramienta principal de gestión de red** en todas las cuentas, **sin
  integrar con Network Manager**.
- **F.** Organizar las cuentas en **una estructura jerárquica con AWS Organizations y Organizational Units
  (OUs)** para **aplicar políticas de red consistentes por herencia**.

**Correcto: B, D y F.**

**Rationale (B):** es correcto. Esta solución **atiende directamente la necesidad de gestión centralizada de red
en un entorno multi-cuenta** y **provee la escalabilidad requerida para oficinas regionales en crecimiento**.

**Rationale (D):** es correcto. **AWS Control Tower provee un setup de best practices en un clic** para un
**entorno multi-cuenta de AWS con landing zone**, e **implementa baselines de cuenta con configuraciones de
red**. Esto **provee la estructura fundacional multi-cuenta con capacidades de gestión de red incorporadas** que
**pueden escalar eficientemente**.

**Rationale (F):** es correcto. **Este enfoque jerárquico habilita la gestión escalable de políticas** en la
**estructura organizacional en crecimiento**.

> **Pregunta 2.** Dado que AnyCompany **determinó que necesita gestión centralizada de red en múltiples
> cuentas**, **¿qué servicio de AWS provee la solución más directa para gestionar y monitorear transit gateways
> en múltiples cuentas y regiones desde una sola consola?**

- **A.** Organizar las cuentas con **Organizations y OUs** para aplicar políticas consistentes por herencia.
- **B.** Usar **AWS RAM** para **compartir transit gateways entre cuentas y administrarlos centralmente desde el
  resource share**.
- **C.** Desplegar **AWS Control Tower** para una **landing zone** con setup multi-cuenta y baseline de red.
- **D.** Implementar **AWS Network Manager con integración de AWS Organizations** para gestionar transit gateways
  de forma central en múltiples cuentas y regiones.

**Correcto: D.**

**Rationale:** **AWS Network Manager está diseñado para gestionar centralmente redes de Transit Gateway** en
**múltiples cuentas, regiones y ubicaciones on-premises**. El servicio **provee soporte multi-cuenta** que
**permite crear un único global network y registrar transit gateways de múltiples cuentas**. Con **integración
de AWS Organizations**, **habilita trusted access y despliega automáticamente los service-linked roles y roles
de IAM necesarios** para la **gestión cross-account de recursos**, **atendiendo directamente el requisito de
gestión centralizada de red**.

### 6.3 Desafío 2 de 3: Secure Partner Integration

AnyCompany **debe establecer conectividad privada con proveedores de servicios terceros y partners de la
industria financiera**, manteniendo **cumplimiento con regulaciones estrictas de protección de datos**. Su
**enfoque actual, con endpoints públicos y security groups, es insuficiente** para sus **requisitos
regulatorios**.

> **Pregunta 1.** **¿Qué servicios y configuraciones de red de AWS implementarías para habilitar integraciones
> seguras y privadas con partners, eliminando la exposición a internet público?** (Elegí TRES.)

- **A.** Implementar **AWS Direct Connect con Virtual Interfaces (VIFs) privadas** para **establecer conexiones
  dedicadas con redes de partners**, **bypasseando internet público por completo**.
- **B.** Configurar **AWS Direct Connect Gateway** para habilitar **gestión centralizada de conectividad** para
  **múltiples conexiones de partners en distintas Regiones de AWS**.
- **C.** Usar **AWS Site-to-Site VPN sobre internet público** con **security groups y NACLs reforzados** para la
  conectividad con partners.
- **D.** Configurar **conexiones de VPC Peering directamente con cuentas de AWS de partners terceros** para
  establecer conectividad privada.
- **E.** Implementar **endpoints de AWS PrivateLink con políticas de IAM reforzadas** para **asegurar conexiones
  a servicios de partners sobre internet**.
- **F.** Establecer **Transit Virtual Interfaces (Transit VIFs)** a través de **AWS Direct Connect** para
  **conectar con AWS Transit Gateway** para **ruteo escalable de redes de partners**.

**Correcto: A, B y F.**

**Rationale (A):** es correcto. **AWS Direct Connect provee una conexión de red dedicada que bypassa los
proveedores de servicios de internet y el internet público.** Las **private VIFs establecen conectividad privada
usando VLANs 802.1Q estándar de la industria, con direcciones IP privadas**, **cumpliendo los requisitos
regulatorios de protección de datos**.

**Rationale (B):** es correcto. **Direct Connect Gateway es un recurso globalmente disponible que puede conectar
hasta 20 VPC en cualquier Región de AWS sobre un único private VIF.** Esto **provee gestión escalable y
centralizada para múltiples integraciones de partners**, manteniendo **conectividad privada**.

**Rationale (F):** es correcto. **Las Transit VIFs proveen conectividad privada entre AWS Transit Gateway y
redes externas.** Esto **habilita el ruteo y la gestión centralizada de múltiples conexiones de partners**,
manteniendo **aislamiento completo de internet público**.

> **Pregunta 2.** Dado que AnyCompany **decidió usar AWS Direct Connect para conectividad segura con partners**,
> **ahora necesita determinar la configuración óptima para conectarse con múltiples partners financieros en
> distintas Regiones de AWS, manteniendo gestión centralizada**. **¿Qué configuración específica de AWS Direct
> Connect deberían implementar para lograr conectividad multi-Región escalable con administración
> simplificada?**

- **A.** Desplegar **AWS Direct Connect con public VIFs** en cada ubicación de partner para **alcance regional
  amplio a endpoints públicos de AWS en todas las Regiones**.
- **B.** Configurar **AWS Direct Connect Gateway** para **gestión centralizada de conectividad** en múltiples
  conexiones de partners en distintas Regiones.
- **C.** Establecer **Transit VIFs** a través de **AWS Direct Connect** para conectar con **AWS Transit Gateway**
  para **ruteo escalable de redes de partners**.
- **D.** Implementar **AWS Direct Connect con private VIFs** para **establecer conexiones dedicadas con redes de
  partners**, **bypasseando internet público por completo**.

**Correcto: B.**

**Rationale:** **AWS Direct Connect Gateway provee la solución óptima** para este escenario. **Habilita gestión
centralizada de conectividad** y **permite conexiones a múltiples Regiones de AWS desde una sola ubicación de
Direct Connect**. Este enfoque **simplifica significativamente la administración**, manteniendo **los requisitos
de seguridad y cumplimiento** para **partners de la industria financiera en distintas geografías**.

### 6.4 Desafío 3 de 3: Cross-Account Resource Sharing

A medida que **los equipos especializados de AnyCompany se expanden a distintas cuentas**, **necesitan compartir
recursos de red eficientemente**, manteniendo **controles de acceso adecuados** y **evitando la duplicación de
infraestructura**. **Los equipos de desarrollo, testing y producción requieren acceso a componentes de red
compartidos**, pero **con el aislamiento y el gobierno correspondientes**.

> **Pregunta 1.** **¿Qué servicios y configuraciones de red de AWS implementarías para habilitar integraciones
> seguras y privadas con partners, eliminando la exposición a internet público?** (Elegí TRES.)
>
> **La fuente repite exactamente la pregunta y las seis opciones del Desafío 2.** Correcto: **A, B y F**, con los
> mismos rationales (Direct Connect con private VIFs, Direct Connect Gateway y Transit VIFs).

> **Pregunta 2.** **Al implementar AWS Resource Access Manager (RAM) para el resource sharing cross-account en
> AnyCompany, ¿qué configuración específica aseguraría mejor el acceso seguro y controlado a los recursos de VPC
> compartidos?**

- **A.** Implementar **AWS Resource Access Manager (RAM)** para **compartir subredes de VPC y attachments de
  Transit Gateway entre cuentas dentro de la organización**.
- **B.** Usar **AWS Organizations con Service Control Policies (SCPs)** para **restringir el resource sharing
  solo a cuentas dentro de la organización**.
- **C.** Establecer un **data perimeter** usando **controles basados en identidad combinados con controles de
  red**, incluyendo **VPC endpoint policies con condiciones `aws:PrincipalOrgId`**.
- **D.** Adjuntar **políticas de recurso de IAM cross-account a cada subred de VPC**, **otorgando a las cuentas
  de partners permisos directos** para usar los recursos de red compartidos.

**Correcto: A.**

**Rationale:** **AWS RAM está diseñado específicamente para compartir subredes de VPC y attachments de Transit
Gateway entre cuentas**, lo que **atiende directamente la necesidad de AnyCompany de compartir recursos de red**
manteniendo **controles de acceso adecuados**. El contexto **menciona explícitamente que AWS RAM es el servicio
apropiado para compartir “recursos comunes, como VPC Subnets o Transit Gateway attachments”**.

**¡Felicitaciones! Completaste todos los Architecture Challenges de este curso.**

---

## 7. Las tres respuestas óptimas

| Desafío | Óptima | Por qué esa y no otra |
| --- | --- | --- |
| **1. Gestión central** | **Network Manager + Organizations** | Es el único que **gestiona y monitorea** TGW de varias cuentas **desde una consola** |
| **2. Partners privados** | **Direct Connect Gateway** | Es la pieza de **centralización multi-Región**; el transit VIF es el **enganche** al TGW |
| **3. Resource sharing** | **RAM** (subredes + attachments de TGW) | Es el **mecanismo**, no el control que lo rodea |

**El hilo que ata los tres:** AnyCompany no necesita **más servicios**, necesita **un punto de gobierno por
problema** — **una consola** para la red, **un gateway** para los partners, **un share** para los recursos.

---

## 8. Para el examen (SAP-C02)

> [!important] Lo que hay que retener
> 1. **Network Manager + Organizations** = gestión y monitoreo **central** de TGW en cuentas y regiones.
> 2. **Control Tower** = **landing zone** y baseline; **no** es la consola de operación de red.
> 3. **OUs** = **políticas por herencia**; no gestionan ni monitorean recursos.
> 4. **RAM** = **comparte**; **no** monitorea ni administra la topología.
> 5. **Direct Connect** con **private VIF** = conexión dedicada **sin internet**.
> 6. **DX Gateway** = **una** ubicación de DX hacia **varias Regiones**; es la pieza de **administración
>    central**.
> 7. **Transit VIF** = enganche del **DX con el TGW** para ruteo escalable.
> 8. **VPN Site-to-Site** **no** cumple un requisito de “sin internet”, aunque esté cifrada.
> 9. **RAM** comparte **subredes de VPC** y **attachments de TGW**; no existe “policy por subred”.
> 10. **SCPs y data perimeter** **restringen**; el **sharing** lo hace **RAM**.

> [!warning] Trampa clásica del examen
> La primera pregunta premia **tres opciones válidas**; la segunda pide **la más directa**. Si el enunciado
> agrega “**desde una sola consola**”, la respuesta es **Network Manager**; si dice “**sin duplicar**”, es
> **RAM**; si dice “**varias Regiones desde una ubicación**”, es **DX Gateway**.
>
> Y el distractor más seductor es el **data perimeter con `aws:PrincipalOrgId`**: es una **buena práctica real**,
> pero **no crea el recurso compartido**.

---

## Relacionado

- [[AWS Solutions Architect Advanced - Designing Advanced Network Architectures]] *(índice del módulo)*
- [[AWS Transit Gateway Network Manager]] — la respuesta del Desafío 1
- [[AWS Resource Access Manager (RAM) Solutions]] — la respuesta del Desafío 3
- [[AWS Transit Gateway Setup]] — DX, transit VIF y attachments
- [[Use Cases - Transit Gateway]] — shared services y aislamiento
- [[VPC Endpoints]] · [[AWS PrivateLink Components]] — por qué PrivateLink no es “over the internet”
- [[Finished Architecture - Networking]] — la arquitectura que estos desafíos evalúan
- [[1.1 Diseñar estrategias de conectividad de redes]] — la tarea que el módulo cubre
- Siguiente paso del módulo: **sin lecciones pendientes conocidas** — la fuente cierra con “completaste todos
  los Architecture Challenges de este curso”

---

## Registro de integración

| Fecha | Qué llegó | Dónde se integró |
| --- | --- | --- |
| 27/10/2026 | Lección 12 completa: actividad integradora con tres desafíos y sus respuestas | Nota completa (secciones 1–8) |

**Discrepancias y vacíos registrados (no corregidos):**

1. **La primera pregunta del Desafío 3 está duplicada** del Desafío 2: mismo enunciado y mismas seis opciones,
   con respuestas **A, B y F**. No corresponde al tema del desafío (cross-account sharing). Se transcribe tal
   cual y se advierte en §4 y §6.4.
2. **El rationale del Desafío 2 dice que el DX Gateway conecta “hasta 20 VPC en cualquier Región sobre un único
   private VIF”**. La cifra corresponde a las **asociaciones de virtual private gateways**, no a un límite de
   VPC por VIF. Se transcribe literal y se marca en §3.
3. **La opción E del Desafío 2 se contradice a sí misma**: “PrivateLink … sobre internet”. Se registra como
   distractor mal formulado; el concepto correcto está en [[AWS PrivateLink Components]].
4. **El enunciado del Desafío 3** habla de dev, test y prod, pero **su primera pregunta** es sobre partners. Se
   responde lo que el curso marca como correcto.
5. **No hay diagramas** en la lección.
6. **No se dan cifras de costos** ni de tiempos de implementación. No se agregaron.
7. **“Correct!” y los rationales** vienen intercalados en la fuente, sin indicar a qué opción pertenecen en las
   preguntas de tres respuestas; se reasignaron por orden (**B, D, F** y **A, B, F**), que es el único orden
   consistente con los textos.

**Decisiones de transcripción:**

- Se conservan **AWS Network Manager**, **AWS Control Tower**, **Organizational Units**, **AWS RAM**, **Direct
  Connect**, **private VIF**, **transit VIF**, **DX Gateway**, **Transit Gateway**, **data perimeter** y
  **SCP**.
- Las **cifras** se transcriben literales: **500+ empleados**, **tres oficinas**, **cinco años**, **diez
  clientes**, **20 VPC** (con la salvedad de §3).
- Las **opciones** se traducen **completas**, incluidas las incorrectas: el valor del ejercicio está en
  **reconocer el error de cada distractor**.
