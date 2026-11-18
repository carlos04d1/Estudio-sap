#!/usr/bin/env python3
"""Verifica la extension contra tests/fixture.html (sin tocar skillbuilder.aws)."""

import json
import re
import shutil
import subprocess
import sys
import tempfile
from pathlib import Path

from playwright.sync_api import sync_playwright

ROOT = Path(__file__).resolve().parent.parent
EXT = ROOT / "extension"
FIXTURE = ROOT / "tests" / "fixture.html"
FIXTURE_URL = FIXTURE.as_uri()

failures = 0


def check(name: str, ok: bool, detail: str = "") -> None:
    global failures
    if not ok:
        failures += 1
    print(f"{'PASS' if ok else 'FAIL'}  {name}" + (f"  -> {detail}" if detail and not ok else ""))


def info(msg: str) -> None:
    print(f"INFO  {msg}")


def norm_html(html: str) -> str:
    return re.sub(r">\s+<", "><", re.sub(r"\s+", " ", html)).strip()


SNAPSHOT_JS = """() => {
  const c = document.body.cloneNode(true);
  const hs = c.querySelector('.HotSpotInfoSection');
  const hotspot = hs ? hs.outerHTML : '';
  if (hs) hs.remove();
  return { rest: c.outerHTML, hotspot, carousel: document.querySelector('.Carousel').outerHTML };
}"""


def test_syntax() -> None:
    node = shutil.which("node")
    if not node:
        info("node no disponible; se omite node --check")
    else:
        for js in sorted(EXT.glob("*.js")):
            r = subprocess.run([node, "--check", str(js)], capture_output=True, text=True)
            check(f"node --check {js.name}", r.returncode == 0, r.stderr.strip())
    try:
        manifest = json.loads((EXT / "manifest.json").read_text(encoding="utf-8"))
        check("manifest.json es JSON valido", True)
        check("manifest MV3 con service worker y side panel",
              manifest.get("manifest_version") == 3
              and manifest["background"]["service_worker"] == "background.js"
              and manifest["side_panel"]["default_path"] == "sidepanel.html"
              and "content_scripts" not in manifest)
    except Exception as exc:  # noqa: BLE001
        check("manifest.json es JSON valido", False, str(exc))


def test_fixture(p) -> None:
    browser = p.chromium.launch(headless=False)
    try:
        page = browser.new_context().new_page()
        page.goto(FIXTURE_URL)
        page.add_script_tag(path=str(EXT / "selectors.js"))
        page.add_script_tag(path=str(EXT / "extract.js"))

        before = page.evaluate(SNAPSHOT_JS)
        res = page.evaluate("sbExtractLesson(SB_DEFAULT_SELECTORS)")
        after = page.evaluate(SNAPSHOT_JS)
        md = res["markdown"]

        check("titulo de la leccion", res["title"] == "AWS Control Tower", res["title"])
        check("markdown contiene '# AWS Control Tower'", "# AWS Control Tower" in md)
        check("seccion Transcript", "#### Transcript" in md)
        check("transcript sin tags <v>", "<v" not in md and "</v>" not in md and "All right, now we'll look at AWS Control Tower," in md)
        for slide in ("Building a Landing Zone", "Account structure", "Networking"):
            check(f"slide del carrusel: {slide}", f"#### {slide}" in md)
        for hs in ("1: Management Account", "2: Landing Zone", "3: Controls"):
            check(f"hotspot: {hs}", f"#### {hs}" in md)
        check("tabla con '| --- |'", "| --- |" in md)
        for label, body in (("Blue/Green", "Switches all traffic"), ("Canary", "Routes a small percentage"), ("Rolling", "Replaces instances in batches")):
            check(f"pestana: {label}", f"#### {label}" in md and body in md)
        check("DOM vivo: pestana activa restaurada",
              page.evaluate("document.querySelector('#tabs-1').getAttribute('aria-selected')") == "true"
              and page.evaluate("!document.getElementById('tabs-0-panel').innerHTML.trim()"))
        check("lista con negrita", "- **Preventive**" in md)
        check("negrita/cursiva inline", "**behavior**" in md and "*guidance*" in md)

        check("DOM vivo: resto del body sin cambios", norm_html(before["rest"]) == norm_html(after["rest"]))
        check("DOM vivo: .Carousel sin cambios (normalizado)", norm_html(before["carousel"]) == norm_html(after["carousel"]))
        check("DOM vivo: sin h4 'Transcript' inyectado", page.evaluate("!document.querySelector('.SideTranscript h4')"))
        check("DOM vivo: markers de hotspot intactos", page.evaluate("document.querySelectorAll('button[aria-label^=\"marker \"]').length") == 3)
        same_hs = norm_html(before["hotspot"]) == norm_html(after["hotspot"])
        info("DOM vivo: .HotSpotInfoSection " + ("identico" if same_hs else
             "difiere de la carga inicial (el fixture regenera el panel al hacer click; se vuelve al marcador original)"))

        probe = page.evaluate("sbProbe(SB_DEFAULT_SELECTORS)")
        check("sbProbe: hasTitle/hasNext/title",
              probe["hasTitle"] and probe["hasNext"] and probe["title"] == "AWS Control Tower", str(probe))
        c = probe["counts"]
        check("sbProbe: conteos", c["carousel"] == 1 and c["hotspot_marker"] == 3 and c["transcript"] == 1 and c["next_lesson"] == 1, str(c))

        page.evaluate("window.__clicked = 0; document.querySelector('.NextLessonButton').addEventListener('click', () => window.__clicked++)")
        check("sbClickNext devuelve true y hace click",
              page.evaluate("sbClickNext(SB_DEFAULT_SELECTORS)") is True and page.evaluate("window.__clicked") == 1)
        page.evaluate("document.querySelector('.NextLessonButton').disabled = true")
        check("sbClickNext con boton deshabilitado -> false", page.evaluate("sbClickNext(SB_DEFAULT_SELECTORS)") is False)
        check("sbClickNext sin boton -> false", page.evaluate("sbClickNext({next_lesson: '.nope'})") is False)

        blocks = (
            '<body><nav role="navigation"><div><span>Introduction</span><span>Course Overview</span></div></nav>'
            '<div id="ContentDiv"><div class="LessonTitle"><h1>Test Lesson</h1></div>'
            '<div><div>First block</div><div>Second block</div></div>'
            '<div role="tree"><div>Menu item A</div></div></div></body>'
        )
        page.set_content(blocks)
        page.add_script_tag(path=str(EXT / "selectors.js"))
        page.add_script_tag(path=str(EXT / "extract.js"))
        lines = page.evaluate("sbExtractLesson(SB_DEFAULT_SELECTORS)")["markdown"].splitlines()
        check("raiz #ContentDiv (no body) y titulo", "# Test Lesson" in lines)
        check("bloques div en lineas separadas", "First block" in lines and "Second block" in lines)
        joined = "\n".join(lines)
        check("menus (nav / role=tree) excluidos",
              not any(t in joined for t in ("Introduction", "Course Overview", "Menu item A")))
    finally:
        browser.close()


def test_load_extension(p) -> None:
    tmp = tempfile.mkdtemp(prefix="sb-ext-")
    ctx = None
    try:
        ctx = p.chromium.launch_persistent_context(
            tmp, headless=False,
            args=[f"--disable-extensions-except={EXT}", f"--load-extension={EXT}"],
        )
        sw = ctx.service_workers[0] if ctx.service_workers else ctx.wait_for_event("serviceworker", timeout=15000)
        check("service worker registrado", sw.url.endswith("/background.js"), sw.url)
        ext_id = sw.url.split("/")[2]

        errors: list[str] = []
        page = ctx.new_page()
        page.on("pageerror", lambda e: errors.append(str(e)))
        page.on("console", lambda m: errors.append(m.text) if m.type == "error" else None)
        page.goto(f"chrome-extension://{ext_id}/sidepanel.html")
        page.wait_for_timeout(500)
        check("sidepanel.html carga sin errores", not errors, "; ".join(errors))
        check("sidepanel: selectores y funciones cargados",
              page.evaluate("typeof sbExtractLesson === 'function' && SB_DEFAULT_SELECTORS.title.length > 0"))
        check("sidepanel: textarea de selectores poblado", "lesson_root" in page.input_value("#selectors"))
        side = sw.evaluate("typeof chrome.sidePanel.setPanelBehavior")
        check("API sidePanel disponible en el service worker", side == "function", str(side))
        manifest_name = sw.evaluate("chrome.runtime.getManifest().name")
        check("manifest leido por el navegador", manifest_name == "Skill Builder Extractor", str(manifest_name))
    except Exception as exc:  # noqa: BLE001
        check("carga de la extension", False, repr(exc))
    finally:
        if ctx:
            ctx.close()
        shutil.rmtree(tmp, ignore_errors=True)


def main() -> int:
    test_syntax()
    with sync_playwright() as p:
        test_fixture(p)
        test_load_extension(p)
    print(f"\n{'TODOS LOS CHEQUEOS PASARON' if not failures else f'{failures} chequeo(s) fallaron'}")
    return 1 if failures else 0


if __name__ == "__main__":
    sys.exit(main())
