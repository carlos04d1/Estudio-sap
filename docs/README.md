# 📱 SAP-C02 Quiz Web App (GitHub Pages)

Simulador de examen para la certificación **AWS Certified Solutions Architect - Professional (SAP-C02)** optimizado para dispositivos móviles y escritorio.

## ✨ Características

- 🎲 **Preguntas aleatorias sin repetición:** Cada examen toma por defecto **10 preguntas al azar** del banco de 50 preguntas. Cuenta con un sistema de ciclo inteligente que evita que te salgan preguntas ya vistas hasta haber completado las 50.
- ⚡ **Retroalimentación inmediata:** Al confirmar cada respuesta, sabes al instante si estás bien o mal, con el por qué detallado (justificación de la correcta, análisis de distractores y concepto clave 🔑).
- 🌓 **Modo Claro y Oscuro:** Selector rápido con guardado automático de tu preferencia.
- 📱 **Diseño Responsive Mobile-First:** Diseñado para estudiar cómodamente desde el móvil (botones grandes, opciones tipo tarjeta táctil, texto legible sin zoom molesto).
- 🏆 **Pantalla de resultados:** Puntuación final, porcentaje, desglose por los 4 dominios oficiales de AWS y opción de revisar todas las preguntas respondidas.
- 📴 **100% Estático y Offline:** No requiere bases de datos, Node ni servidores externos.

---

## 🚀 Cómo activar GitHub Pages

Para publicar esta app en tu cuenta de GitHub:

1. Haz un commit y push de esta carpeta al repositorio en GitHub:
   ```bash
   git add docs/
   git commit -m "feat: Add SAP-C02 mobile quiz web app"
   git push
   ```

2. Entra a tu repositorio en GitHub y ve a:
   **Settings** (Configuración) ➔ **Pages** (en el menú lateral izquierdo).

3. En la sección **Build and deployment**:
   - **Source:** Selecciona `Deploy from a branch`.
   - **Branch:** Selecciona `main` (o tu rama principal) y en la carpeta elige **/docs**.
   - Haz clic en **Save**.

4. En 1-2 minutos GitHub te dará tu URL pública:
   `https://<tu-usuario>.github.io/<tu-repositorio>/`

---

## 💻 Uso local en tu PC o celular

También puedes abrir la app directamente sin subirla a GitHub:
- Simplemente haz doble clic en `docs/index.html` en tu navegador favorito (Chrome, Edge, Safari, Firefox).
- En el celular, puedes compartirte el enlace de GitHub Pages y agregarla a tu pantalla de inicio como una aplicación (PWA).
