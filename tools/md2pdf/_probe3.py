import sys, json
from pathlib import Path
from playwright.sync_api import sync_playwright

sys.path.insert(0, str(Path(__file__).parent))
import build

SRC = Path(r"C:\Users\LENOVO\Desktop\Trabajo\Certificaciones\Estudio-SAP-C02\Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)\AWS Solutions Architect Advanced - Operational Resilience")
TMP = Path(r"C:\Users\LENOVO\AppData\Local\Temp")

rows = build.parse_index(next(f for f in SRC.iterdir() if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")))
target = next(SRC / r["file"] for r in rows if r["n"] == "07")

title, body, _ = build.note_to_html(target)
html = build.build_html([("AWS SOLUTIONS ARCHITECT ADVANCED", title, body)], title)
p = TMP / "probe3.html"
p.write_text(html, encoding="utf-8")

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 703, "height": 1123})
    page = ctx.new_page()
    page.goto(p.as_uri())
    page.wait_for_function("window.__ready === true", timeout=120000)
    info = page.evaluate("""() => {
      const W = document.documentElement.clientWidth;
      const out = [];
      document.querySelectorAll('body *').forEach(el => {
        const r = el.getBoundingClientRect();
        const st = getComputedStyle(el);
        const hidden = st.position === 'absolute' || st.display === 'none';
        if (!hidden && r.right > W + 1) {
          out.push({tag: el.tagName, cls: (el.className||'').toString().slice(0,30),
                    w: Math.round(r.width), right: Math.round(r.right),
                    text: (el.textContent||'').trim().replace(/\\s+/g,' ').slice(0,60)});
        }
      });
      return {W, docSW: document.documentElement.scrollWidth, bodySW: document.body.scrollWidth, n: out.length, out: out.slice(0,12)};
    }""")
    print(json.dumps(info, ensure_ascii=False, indent=1)[:4000])
    b.close()
