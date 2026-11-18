import pymupdf
from pathlib import Path
from playwright.sync_api import sync_playwright

HTML = """<!doctype html><html><body style="font-family:Segoe UI,Arial;font-size:10.2pt">
<p>Texto normal de prueba para medir el tamano de fuente.</p>
{wide}
</body></html>"""

wide = '<table style="width:100%"><tr>' + "".join(
    f"<td>columna_muy_larga_numero_{i}_con_texto</td>" for i in range(12)
) + "</tr></table>"

tmp = Path(r"C:\Users\LENOVO\AppData\Local\Temp")
with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    for name, w in (("narrow", ""), ("wide", wide)):
        p = tmp / f"probe_{name}.html"
        p.write_text(HTML.format(wide=w), encoding="utf-8")
        page = ctx.new_page()
        page.goto(p.as_uri())
        page.emulate_media(media="print")
        out = tmp / f"probe_{name}.pdf"
        page.pdf(path=str(out), format="A4", print_background=True,
                 margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
        page.close()
        d = pymupdf.open(out)
        sizes = sorted({round(s["size"], 1) for bl in d[0].get_text("dict")["blocks"]
                        for l in bl.get("lines", []) for s in l["spans"]})
        print(name, "pages", d.page_count, "sizes", sizes)
        d.close()
    b.close()
