import pymupdf
from pathlib import Path
from playwright.sync_api import sync_playwright

BASE = """<!doctype html><html><head><style>
@page { size: A4; }
body { font-family: Segoe UI, Arial; font-size: 10.2pt; margin: 0; }
table { width: 100%%; border-collapse: collapse; font-size: 8.9pt; %s }
td { border: 1px solid #ccd; padding: 5pt 7pt; vertical-align: top; %s }
</style></head><body><p>Texto normal de prueba para medir el tamano de fuente.</p>%s</body></html>"""

cells = "".join(f"<td>columna_muy_larga_numero_{i}_con_texto</td>" for i in range(12))
table = f"<table><tr>{cells}</tr></table>"

variants = {
    "auto_sin_wrap": (BASE % ("", "", table), 0),
    "auto_con_wrap": (BASE % ("", "overflow-wrap: anywhere;", table), 0),
    "fixed_con_wrap": (BASE % ("table-layout: fixed;", "overflow-wrap: anywhere;", table), 0),
    "diagrama_ancho": (BASE % ("", "", '<svg width="1200" height="300"></svg>'), 0),
    "diagrama_ancho_max": (BASE % ("", "", '<svg width="1200" height="300" style="max-width:100%;height:auto"></svg>'), 0),
}

tmp = Path(r"C:\Users\LENOVO\AppData\Local\Temp")
with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    for name, (html, _) in variants.items():
        p = tmp / f"probe2_{name}.html"
        p.write_text(html, encoding="utf-8")
        page = ctx.new_page()
        page.goto(p.as_uri())
        page.emulate_media(media="print")
        out = tmp / f"probe2_{name}.pdf"
        page.pdf(path=str(out), format="A4", print_background=True,
                 margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
        page.close()
        d = pymupdf.open(out)
        txt = d[0].get_text()
        sizes = [s["size"] for bl in d[0].get_text("dict")["blocks"]
                 for l in bl.get("lines", []) for s in l["spans"]]
        body = min(sizes) if sizes else None
        print(f"{name:20s} pages={d.page_count} min_size={round(body,1) if body else None} clipped={'NUMERO_11' not in txt}")
        d.close()
    b.close()
