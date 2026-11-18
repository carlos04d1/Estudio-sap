import sys, re
from pathlib import Path
sys.path.insert(0, r"tools/md2pdf")
import build
from playwright.sync_api import sync_playwright
import pymupdf

SRC = Path(r"Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)\AWS Solutions Architect Advanced - Operational Resilience")
rows = build.parse_index(next(f for f in SRC.iterdir() if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")))
target = next(SRC / r["file"] for r in rows if r["n"] == "07")
title, body, _ = build.note_to_html(target)
s = re.split(r"(?=<h2)", body)[4]

no_table = re.sub(r"<table[\s\S]*?</table>", "", s)
no_math = re.sub(r'<div class="math">[\s\S]*?</div>', "", s)
no_both = re.sub(r"<table[\s\S]*?</table>", "", no_math)

variants = {"full": s, "sin_tabla": no_table, "sin_math": no_math, "sin_ambos": no_both}
TMP = Path(r"C:\Users\LENOVO\AppData\Local\Temp")
with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    for name, html_body in variants.items():
        p = TMP / "probe8.html"
        p.write_text(build.build_html([("M7", "s4", html_body)], "s4"), encoding="utf-8")
        page = ctx.new_page()
        page.goto(p.as_uri())
        page.wait_for_function("window.__ready === true", timeout=120000)
        page.emulate_media(media="print")
        out = TMP / "probe8.pdf"
        page.pdf(path=str(out), format="A4", print_background=True,
                 margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"})
        page.close()
        d = pymupdf.open(out)
        sizes = sorted({round(sp["size"], 1) for pg in d for bl in pg.get_text("dict")["blocks"]
                        for l in bl.get("lines", []) for sp in l["spans"]})
        print(f"{name:10s} pages={d.page_count} rect={d[0].rect} sizes={sizes[:8]} ... max={max(sizes)}")
        d.close()
    b.close()
