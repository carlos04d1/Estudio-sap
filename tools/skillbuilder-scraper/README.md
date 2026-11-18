# Skill Builder Extractor

Extension de Chrome/Edge que extrae el contenido de una leccion de **AWS Skill Builder** a **Markdown** (transcript del video, carruseles, hotspots, tablas, listas y links) para pegarlo en una IA o guardarlo en Obsidian.

Corre dentro de tu navegador ya abierto y logueado: no abre ventanas nuevas, no hace login y no usa puertos de depuracion.

## Instalacion (una sola vez)

1. Abre `chrome://extensions` (o `edge://extensions`).
2. Activa **Modo de desarrollador**.
3. **Cargar descomprimida** y elige la carpeta `extension/`.
4. Fija el icono en la barra del navegador.

Al cambiar el codigo, usa **Recargar** en la tarjeta de la extension.

## Uso

1. Abre una leccion de Skill Builder.
2. Clic en el icono: se abre un panel lateral.
3. Elige el modo: esta leccion, proximas N o curso completo (sigue "Next lesson"), y la pausa entre lecciones.
4. **Extraer**. El Markdown aparece en el panel: **Copiar todo** o **Guardar .md**.

**Diagnostico** copia un reporte de los frames y selectores encontrados; sirve para ajustar los selectores si algo sale vacio.

El contenido de la leccion vive en un iframe que puede ser de otro dominio: la primera vez el navegador pide permiso para ese sitio.

## Pruebas

```bat
python tests\test_extension.py
```

Requiere `playwright` (`pip install playwright` y `playwright install chromium`). Prueba la extraccion y la carga de la extension contra `tests/fixture.html`, sin tocar AWS.

## Nota de uso

Automatiza **tu propio acceso** a contenido al que ya estas suscrito, para estudiar. No lo uses para redistribuir el material. Si bajas un curso entero, hazlo de a poco: el sitio es una SPA y conviene no martillarlo.
