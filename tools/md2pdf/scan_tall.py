import json, tempfile, shutil
from pathlib import Path
import build
from playwright.sync_api import sync_playwright

base = Path(r"C:\Users\LENOVO\Desktop\Trabajo\Certificaciones\Estudio-SAP-C02\Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)")
mods = {
 "05": "AWS Solutions Architect Advanced - Optimizing Hybrid Architectures",
 "06": "AWS Solutions Architect Advanced - Migration and Modernization",
 "07": "AWS Solutions Architect Advanced - Operational Resilience",
}
tmp = Path(tempfile.mkdtemp())
report = {}
with sync_playwright() as pw:
    b = pw.chromium.launch(); ctx = b.new_context(viewport={"width":1280,"height":900})
    for num, name in mods.items():
        src = base / name
        idx = next(f for f in src.iterdir() if f.suffix==".md" and f.name.startswith("AWS Solutions Architect Advanced - "))
        for row in build.parse_index(idx):
            title, body, _ = build.note_to_html(src / row["file"])
            hp = tmp / f"{num}_{row['n']}.html"
            hp.write_text(build.build_html([("x", title, body)], title), encoding="utf-8")
            pg = ctx.new_page(); pg.goto(hp.as_uri())
            pg.wait_for_function("window.__ready === true", timeout=120000)
            dims = pg.evaluate("""() => Array.from(document.querySelectorAll('.mermaid-wrap svg')).map(s => Math.round(s.getBoundingClientRect().height))""")
            pg.close()
            if dims and max(dims) > 700:
                report[f"{num}/{row['n']}"] = dims
    b.close()
shutil.rmtree(tmp, ignore_errors=True)
print(json.dumps(report, indent=1))
Path("tall.json").write_text(json.dumps(report), encoding="utf-8")
