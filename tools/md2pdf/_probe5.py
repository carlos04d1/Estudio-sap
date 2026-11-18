import sys, re
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

parts = re.split(r"(?=<h2)", body)
print("secciones:", len(parts))

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    for i, part in enumerate(parts):
        if not part.strip():
            continue
        html = build.build_html([("M7", f"parte {i}", part)], "p")
        p = TMP / "probe5.html"
        p.write_text(html, encoding="utf-8")
        page = ctx.new_page()
        page.goto(p.as_uri())
        page.wait_for_function("window.__ready === true", timeout=120000)
        page.emulate_media(media="print")
        out = TMP / "probe5.pdf"
        page.pdf(path=str(out), format="A4", print_background=True,
                 margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
        page.close()
        d = pymupdf.open(out)
        sizes = [s["size"] for pg in d for bl in pg.get_text("dict")["blocks"]
                 for l in bl.get("lines", []) for s in l["spans"]]
        body_ok = any(abs(s - 10.2) < 0.15 for s in sizes)
        head = re.sub(r"<[^>]+>", "", part)[:60].replace("\n", " ")
        print(f"{i:02d} shrunk={not body_ok} pages={d.page_count} :: {head}")
        d.close()
    b.close()
