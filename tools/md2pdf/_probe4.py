import sys
from pathlib import Path
from playwright.sync_api import sync_playwright
import pymupdf

sys.path.insert(0, str(Path(__file__).parent))
import build

SRC = Path(r"C:\Users\LENOVO\Desktop\Trabajo\Certificaciones\Estudio-SAP-C02\Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)\AWS Solutions Architect Advanced - Operational Resilience")
TMP = Path(r"C:\Users\LENOVO\AppData\Local\Temp")

rows = build.parse_index(next(f for f in SRC.iterdir() if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")))
target = next(SRC / r["file"] for r in rows if r["n"] == "07")

title, body, _ = build.note_to_html(target)

variants = {
    "asis": "",
    "nomathml": "<style>.katex-mathml{display:none}</style>",
    "nowrap_off": "<style>.katex-display{white-space:normal}</style>",
}

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    for name, extra in variants.items():
        html = build.build_html([("M7", title, body)], title).replace("</head>", extra + "</head>")
        p = TMP / f"probe4_{name}.html"
        p.write_text(html, encoding="utf-8")
        page = ctx.new_page()
        page.goto(p.as_uri())
        page.wait_for_function("window.__ready === true", timeout=120000)
        page.emulate_media(media="print")
        out = TMP / f"probe4_{name}.pdf"
        page.pdf(path=str(out), format="A4", print_background=True,
                 margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
        page.close()
        d = pymupdf.open(out)
        sizes = sorted({round(s["size"], 1) for pg in d for bl in pg.get_text("dict")["blocks"]
                        for l in bl.get("lines", []) for s in l["spans"]})
        print(f"{name:12s} pages={d.page_count} body102={any(abs(s-10.2)<0.15 for s in sizes)} max={max(sizes)}")
        d.close()
    b.close()
