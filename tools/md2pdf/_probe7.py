import sys, json
from pathlib import Path
sys.path.insert(0, r"tools/md2pdf")
import build
from playwright.sync_api import sync_playwright

SRC = Path(r"Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)\AWS Solutions Architect Advanced - Operational Resilience")
rows = build.parse_index(next(f for f in SRC.iterdir() if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")))
target = next(SRC / r["file"] for r in rows if r["n"] == "07")
title, body, _ = build.note_to_html(target)
import re
parts = re.split(r"(?=<h2)", body)
s = parts[4]

TMP = Path(r"C:\Users\LENOVO\AppData\Local\Temp")
p = TMP / "probe7.html"
p.write_text(build.build_html([("M7", "s4", s)], "s4"), encoding="utf-8")

with sync_playwright() as pw:
    b = pw.chromium.launch()
    ctx = b.new_context(viewport={"width": 1280, "height": 900})
    page = ctx.new_page()
    page.goto(p.as_uri())
    page.wait_for_function("window.__ready === true", timeout=120000)
    data = page.evaluate("""() => {
      const out = [];
      document.querySelectorAll('.math').forEach(el => {
        out.push({cls: el.className, sw: el.scrollWidth, cw: el.clientWidth,
                  fs: getComputedStyle(el).fontSize,
                  kid: el.firstElementChild && el.firstElementChild.className,
                  ksw: el.firstElementChild && el.firstElementChild.scrollWidth,
                  kw: el.firstElementChild && Math.round(el.firstElementChild.getBoundingClientRect().width)});
      });
      const wide = [];
      document.querySelectorAll('body *').forEach(el => {
        const r = el.getBoundingClientRect();
        if (r.width > 900) wide.push({tag: el.tagName, cls: (el.className||'').toString().slice(0,30), w: Math.round(r.width)});
      });
      return {out, wide: wide.slice(0,10), docSW: document.documentElement.scrollWidth};
    }""")
    print(json.dumps(data, ensure_ascii=False, indent=1))
    b.close()
