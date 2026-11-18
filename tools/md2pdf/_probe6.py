import sys, re
from pathlib import Path
sys.path.insert(0, r"tools/md2pdf")
import build

SRC = Path(r"Estudio-Obsidian\Skill Builder\AWS Solutions Architect Advanced Learning Plan (Includes Labs)\AWS Solutions Architect Advanced - Operational Resilience")
rows = build.parse_index(next(f for f in SRC.iterdir() if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")))
target = next(SRC / r["file"] for r in rows if r["n"] == "07")
title, body, _ = build.note_to_html(target)
parts = re.split(r"(?=<h2)", body)
s = parts[4]
Path(r"C:\Users\LENOVO\AppData\Local\Temp\sec4.html").write_text(s, encoding="utf-8")
print("len", len(s))
for m in re.finditer(r"<(table|pre|svg|div class=\"math\"|div class=\"mermaid-wrap\")", s):
    print(m.group(1), m.start())
print("---- head ----")
print(s[:1200])
