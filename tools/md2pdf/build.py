"""Genera los PDFs de estudio de un modulo a partir de las notas Markdown.

Uso:
    python build.py --source "<carpeta del modulo>" --dest "<carpeta destino>" --modulo 6 [--from 04] [--only 04,05]

Salida (misma convencion que los modulos ya publicados):
    00 - Indice del modulo.pdf
    NN - <Sesion>.pdf          (una por leccion)
    99 - <Modulo> (modulo completo).pdf   (indice + todas las lecciones)
"""

import argparse
import html as html_lib
import os
import re
import shutil
import tempfile
from pathlib import Path

import markdown_it
from playwright.sync_api import sync_playwright

HERE = Path(__file__).resolve().parent
MERMAID = (HERE / "node_modules/mermaid/dist/mermaid.min.js").resolve()
KATEX_CSS = (HERE / "node_modules/katex/dist/katex.min.css").resolve()
KATEX_JS = (HERE / "node_modules/katex/dist/katex.min.js").resolve()
KATEX_AUTO = (HERE / "node_modules/katex/dist/contrib/auto-render.min.js").resolve()

BLOCK_TOKEN = "@@BLK{:04d}@@"

CALLOUTS = {
    "abstract": ("Qué es este archivo", "#0b5fb0", "#f5f9ff"),
    "summary": ("Resumen", "#0b5fb0", "#f5f9ff"),
    "info": ("Información", "#3d6d8f", "#f4f8fb"),
    "todo": ("Nota", "#3d6d8f", "#f4f8fb"),
    "quote": ("Cita", "#5b6779", "#f6f7f9"),
    "note": ("Nota", "#5b6779", "#f6f7f9"),
    "important": ("Importante", "#a15c00", "#fff8ee"),
    "warning": ("Atención", "#b3261e", "#fdf4f3"),
    "caution": ("Atención", "#b3261e", "#fdf4f3"),
    "danger": ("Atención", "#b3261e", "#fdf4f3"),
    "error": ("Error", "#b3261e", "#fdf4f3"),
    "tip": ("Consejo", "#1f7a4d", "#f1f9f4"),
    "success": ("Consejo", "#1f7a4d", "#f1f9f4"),
    "question": ("Pregunta", "#6b4fa0", "#f7f4fc"),
}

MD = markdown_it.MarkdownIt("commonmark").enable("table")


# --------------------------------------------------------------------------- #
# Markdown -> HTML
# --------------------------------------------------------------------------- #
def esc(text: str) -> str:
    return html_lib.escape(text, quote=False)


def inline(text: str) -> str:
    return MD.renderInline(normalize_links(text)).strip()


INLINE_CODE_TOKEN = "@@IC{:05d}@@"


def protect_inline_code(text: str, store: list) -> str:
    def repl(match):
        store.append(match.group(2))
        return INLINE_CODE_TOKEN.format(len(store) - 1)

    return re.sub(r"(`+)([^`\n]+?)\1", repl, text)


def restore_inline_code(text: str, store: list) -> str:
    for idx, code in enumerate(store):
        text = text.replace(INLINE_CODE_TOKEN.format(idx), f"<code>{esc(code)}</code>")
    return text


INLINE_MATH_TOKEN = "@@IM{:05d}@@"


def protect_inline_math(text: str, store: list) -> str:
    """Envuelve `$...$` (LaTeX inline) evitando los `$$` de costo."""

    def repl(match):
        latex = match.group(1)
        looks_math = (
            "\\" in latex
            or bool(re.fullmatch(r"[A-Za-z]", latex.strip()))
            or bool(re.search(r"[_^{}=]", latex))
            or bool(re.fullmatch(r"[<>≤≥]?\s*[\d.,]+\s*%?", latex.strip()))
        )
        if not looks_math or "|" in latex:
            return match.group(0)
        store.append(latex)
        return INLINE_MATH_TOKEN.format(len(store) - 1)

    return re.sub(r"(?<!\$)\$(?!\$)([^$\n]{1,120}?)\$(?!\$)", repl, text)


def restore_inline_math(text: str, store: list) -> str:
    for idx, latex in enumerate(store):
        text = text.replace(
            INLINE_MATH_TOKEN.format(idx),
            f'<span class="imath">{esc(latex)}</span>',
        )
    return text


def fix_strong_adjacency(text: str) -> str:
    """Obsidian acepta `**texto:**Sigue`; CommonMark necesita un borde valido."""
    parts = text.split("**")
    if len(parts) < 3:
        return text
    rebuilt = parts[0]
    inside = False
    for seg in parts[1:]:
        if not inside:
            rebuilt += "**" + seg
            inside = True
        else:
            rebuilt += "**"
            if seg and seg[0].isalnum():
                rebuilt += " "
            rebuilt += seg
            inside = False
    return rebuilt


def normalize_links(text: str) -> str:
    text = re.sub(r"!\[\[[^\]]*\]\]", "", text)
    text = re.sub(r"\[\[([^\]|]+)\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]#|]+)(?:#[^\]|]*)?\|([^\]]+)\]\]", r"\2", text)
    text = re.sub(r"\[\[([^\]]+)\]\]", r"\1", text)
    text = re.sub(r"==([^=]+)==", r"<mark>\1</mark>", text)
    text = re.sub(r"%%[^%]*%%", "", text)
    return text


def sanitize_mermaid(code: str) -> str:
    """Mermaid rechaza etiquetas de flecha con parentesis sin comillas."""
    def fix_edge(match):
        label = match.group(1)
        if label.lstrip().startswith('"') or "(" not in label:
            return match.group(0)
        return '|"' + label.replace('"', "'") + '"|'

    return re.sub(r"\|([^|\n]+)\|", fix_edge, code)


def render_block(text: str) -> str:
    """Renderiza un fragmento Markdown a HTML, resolviendo bloques protegidos."""
    inline_codes = []
    inline_maths = []
    text = protect_inline_code(text, inline_codes)
    text = protect_inline_math(text, inline_maths)

    blocks = []

    def keep(block_html: str) -> str:
        blocks.append(block_html)
        return "\n\n" + BLOCK_TOKEN.format(len(blocks) - 1) + "\n\n"

    lines = text.split("\n")
    out = []
    i = 0
    while i < len(lines):
        line = lines[i]

        # --- fences -------------------------------------------------------
        fence = re.match(r"^\s*```(\w*)\s*$", line)
        if fence:
            lang = fence.group(1).lower()
            i += 1
            buf = []
            while i < len(lines) and not re.match(r"^\s*```\s*$", lines[i]):
                buf.append(lines[i])
                i += 1
            i += 1
            code = "\n".join(buf)
            non_empty = [ln for ln in code.split("\n") if ln.strip()]
            if non_empty:
                indent = min(len(ln) - len(ln.lstrip()) for ln in non_empty)
                if indent:
                    code = "\n".join(
                        ln[indent:] if len(ln) >= indent else ln for ln in code.split("\n")
                    )
            if lang == "mermaid":
                block = (
                    '<div class="mermaid-wrap"><pre class="mermaid">'
                    + esc(sanitize_mermaid(code))
                    + "</pre></div>"
                )
            else:
                block = '<pre class="code"><code>' + esc(code) + "</code></pre>"
            out.append(keep(block))
            continue

        # --- math display -------------------------------------------------
        if line.strip().startswith("$$"):
            joined = "\n".join(lines[i:])
            match = re.match(r"\s*\$\$(.+?)\$\$", joined, re.S)
            if match:
                consumed = joined[: match.end()].count("\n")
                out.append(
                    keep('<div class="math">' + esc(match.group(1).strip()) + "</div>")
                )
                i += consumed + 1
                continue
            # $$ de apertura que cierra mas abajo en otro bloque
            close = next(
                (k for k in range(i + 1, len(lines)) if "$$" in lines[k]), None
            )
            if close is not None:
                chunk = "\n".join(lines[i : close + 1])
                body = chunk.strip()
                body = re.sub(r"^\$\$", "", body)
                body = re.sub(r"\$\$$", "", body)
                out.append(keep('<div class="math">' + esc(body) + "</div>"))
                i = close + 1
                continue

        # --- callouts -----------------------------------------------------
        callout = re.match(r"^>\s*\[!(\w+)\][-+]?\s*(.*)$", line)
        if callout:
            ctype = callout.group(1).lower()
            title = callout.group(2).strip()
            inner = []
            i += 1
            while i < len(lines):
                current = lines[i]
                if current.lstrip().startswith(">"):
                    inner.append(re.sub(r"^\s*>\s?", "", current))
                    i += 1
                elif current.strip() == "":
                    j = i + 1
                    while j < len(lines) and lines[j].strip() == "":
                        j += 1
                    starts_callout = j < len(lines) and re.match(
                        r"^>\s*\[!", lines[j].lstrip()
                    )
                    if (
                        j < len(lines)
                        and lines[j].lstrip().startswith(">")
                        and not starts_callout
                    ):
                        inner.append("")
                        i += 1
                    else:
                        break
                else:
                    break

            default_title, color, background = CALLOUTS.get(
                ctype, ("Nota", "#5b6779", "#f6f7f9")
            )
            title_html = inline(title) if title else esc(default_title)
            body_html = render_block("\n".join(inner).strip("\n"))
            block = (
                f'<div class="callout" style="--bar:{color};--bg:{background}">'
                f'<div class="callout-title">{title_html}</div>'
                f'<div class="callout-body">{body_html}</div></div>'
            )
            out.append(keep(block))
            continue

        out.append(line)
        i += 1

    plain = "\n".join(out)
    plain = normalize_links(plain)
    plain = fix_strong_adjacency(plain)
    plain = re.sub(r"^([ \t]*)[-*+][ \t]+\[ \][ \t]+", r"\1- ☐ ", plain, flags=re.M)
    plain = re.sub(r"^([ \t]*)[-*+][ \t]+\[[xX]\][ \t]+", r"\1- ☑ ", plain, flags=re.M)

    rendered = MD.render(plain)
    for idx, block in enumerate(blocks):
        token = BLOCK_TOKEN.format(idx)
        rendered = rendered.replace(f"<p>{token}</p>", block)
        rendered = rendered.replace(token, block)
    return restore_inline_math(restore_inline_code(rendered, inline_codes), inline_maths)


def strip_frontmatter(text: str):
    meta = {}
    if text.startswith("---"):
        end = text.find("\n---", 3)
        if end != -1:
            raw = text[3:end]
            for line in raw.split("\n"):
                match = re.match(r"^(\w[\w-]*):\s*(.*)$", line)
                if match:
                    value = match.group(2).strip().strip('"').strip("'")
                    meta[match.group(1)] = value
            text = text[end + 4 :]
    return meta, text


def note_to_html(path: Path):
    raw = path.read_text(encoding="utf-8")
    meta, body = strip_frontmatter(raw)
    title = None
    kept = []
    for line in body.split("\n"):
        if title is None and re.match(r"^#\s+\S", line):
            title = line.lstrip("#").strip()
            continue
        kept.append(line)
    title = title or meta.get("title") or path.stem
    html_body = render_block("\n".join(kept))
    return title, html_body, lint(html_body)


def lint(html_body: str):
    plain = re.sub(r"<pre[\s\S]*?</pre>", "", html_body)
    plain = re.sub(r"<code[\s\S]*?</code>", "", plain)
    leftovers = []
    for token in ("**", "[[", "]]", "`", "&amp;", "&lt;"):
        count = plain.count(token)
        if count:
            leftovers.append(f"{token} x{count}")
    return leftovers


# --------------------------------------------------------------------------- #
# Documento
# --------------------------------------------------------------------------- #
CSS = """
@page { size: A4; }
* { box-sizing: border-box; }
html, body { margin: 0; padding: 0; }
body {
  font-family: "Segoe UI", "Segoe UI Emoji", "Segoe UI Symbol", Arial, sans-serif;
  font-size: 10.2pt; line-height: 1.5; color: #1c1f24;
  overflow-wrap: break-word;
  -webkit-print-color-adjust: exact; print-color-adjust: exact;
}
.doc { page-break-before: always; }
.doc:first-of-type { page-break-before: auto; }
.doc-head {
  font-size: 8pt; letter-spacing: 1.05pt; text-transform: uppercase;
  color: #6b7686; padding-bottom: 7.5pt; border-bottom: 1px solid #dfe4ea;
}
.doc-title {
  font-size: 21pt; line-height: 1.18; font-weight: 700; color: #10141a;
  letter-spacing: -0.15pt; margin: 8pt 0 14pt;
}
.doc-body { padding: 0 4.5pt; }
.doc-body > :first-child { margin-top: 0; }
h2 {
  font-size: 13.6pt; font-weight: 700; color: #10141a; line-height: 1.3;
  margin: 20pt 0 10pt; padding-bottom: 4pt; border-bottom: 1px solid #e6eaef;
  page-break-after: avoid;
}
h3 {
  font-size: 11.2pt; font-weight: 700; color: #10141a; line-height: 1.35;
  margin: 16pt 0 7pt; page-break-after: avoid;
}
h4, h5, h6 {
  font-size: 10.2pt; font-weight: 700; color: #10141a;
  margin: 13pt 0 6pt; page-break-after: avoid;
}
p { margin: 0 0 9pt; }
strong { color: #0d1117; font-weight: 700; }
em { font-style: italic; }
a { color: inherit; text-decoration: none; }
ul, ol { margin: 0 0 9pt; padding-left: 12pt; }
li { margin: 0 0 3pt; }
li > ul, li > ol { margin: 3pt 0 0; }
hr { border: 0; border-top: 1px solid #dfe4ea; margin: 14pt -4.5pt; }
blockquote {
  margin: 0 0 10pt; padding: 2pt 0 2pt 17pt;
  border-left: 2px solid #e6eaef; color: #1c1f24;
}
blockquote p:last-child { margin-bottom: 0; }
mark { background: #fff3b0; color: inherit; }
code {
  font-family: Consolas, "Cascadia Mono", monospace; font-size: 8.9pt;
  background: #f2f5f8; border-radius: 2px; padding: 0.5pt 2pt; color: #24292f;
}
pre.code {
  font-family: Consolas, "Cascadia Mono", monospace; font-size: 8.9pt;
  line-height: 1.45; background: #f7f9fb; border: 1px solid #dfe4ea;
  border-radius: 3px; padding: 8pt 10pt; margin: 6pt 0 12pt;
  white-space: pre-wrap; word-break: break-word; color: #333333;
  page-break-inside: avoid;
}
pre.code code { background: none; padding: 0; font-size: 8.9pt; }
.mermaid-wrap {
  background: #fcfdfe; border: 1px solid #e6eaef; border-radius: 3px;
  padding: 9pt 8pt; margin: 6pt 0 12pt; text-align: center;
  page-break-inside: avoid;
}
.mermaid-wrap svg { max-width: 100%; height: auto; }
.mermaid { margin: 0; background: none; border: 0; font-family: inherit; }
.imath { white-space: nowrap; }
.math {
  text-align: center; margin: 8pt 0 12pt; padding: 6pt 8pt;
  background: #fcfdfe; border: 1px solid #e6eaef; border-radius: 3px;
  page-break-inside: avoid;
}
table {
  width: 100%; border-collapse: collapse; border: 1px solid #dfe4ea;
  font-size: 8.9pt; line-height: 1.45; margin: 6pt 0 12pt;
  page-break-inside: auto;
}
thead { display: table-header-group; }
tr { page-break-inside: avoid; }
th {
  background: #eef2f7; color: #1c1f24; font-weight: 600; text-align: left;
  padding: 5pt 7pt; border-bottom: 1px solid #dfe4ea; vertical-align: bottom;
}
td { padding: 5pt 7pt; border-top: 1px solid #dfe4ea; vertical-align: top;
  overflow-wrap: anywhere; }
th + th, td + td { border-left: 1px solid #dfe4ea; }
.callout {
  background: var(--bg); border-left: 3px solid var(--bar);
  padding: 8pt 12pt 4pt 15pt; margin: 0 -4.5pt 10pt;
  page-break-inside: avoid;
}
.callout-title {
  font-size: 8.2pt; font-weight: 700; letter-spacing: 0.75pt;
  text-transform: uppercase; color: var(--bar); margin-bottom: 4pt;
}
.callout-title strong { color: var(--bar); }
.callout-body { font-size: 9.7pt; line-height: 1.47; }
.callout-body p { margin: 0 0 6pt; }
.callout-body ul, .callout-body ol { margin: 0 0 6pt; }
.callout-body > :last-child { margin-bottom: 0; }
.callout .callout { margin-bottom: 6pt; }
"""

BROWSER_SCRIPT = f"""
<script src="{MERMAID.as_uri()}"></script>
<link rel="stylesheet" href="{KATEX_CSS.as_uri()}">
<script src="{KATEX_JS.as_uri()}"></script>
<script src="{KATEX_AUTO.as_uri()}"></script>
<script>
window.__ready = false;
(async () => {{
  try {{
    mermaid.initialize({{
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
      flowchart: {{ htmlLabels: true, useMaxWidth: true }},
      themeVariables: {{ fontFamily: "Segoe UI, Arial, sans-serif", fontSize: "14px" }}
    }});
    await mermaid.run({{ querySelector: "pre.mermaid" }});
    // Los diagramas mas altos o mas anchos que la pagina se escalan para entrar.
    // Si algo supera el ancho imprimible, Chromium encoge TODO el documento.
    const maxH = 900;
    const maxW = 660;
    document.querySelectorAll(".mermaid-wrap svg").forEach((svg) => {{
      const box = svg.getBoundingClientRect();
      if (!box.width || !box.height) return;
      const k = Math.min(1, maxH / box.height, maxW / box.width);
      if (k < 1) {{
        svg.style.height = Math.round(box.height * k) + "px";
        svg.style.width = Math.round(box.width * k) + "px";
      }}
    }});
  }} catch (err) {{
    console.error("mermaid", err);
  }}
  try {{
    document.querySelectorAll(".math").forEach((el) => {{
      try {{
        katex.render(el.textContent, el, {{ displayMode: true, throwOnError: false }});
      }} catch (err) {{ console.error("katex", err); }}
    }});
    document.querySelectorAll(".imath").forEach((el) => {{
      try {{
        katex.render(el.textContent, el, {{ throwOnError: false }});
      }} catch (err) {{ console.error("katex", err); }}
    }});
    // Una formula mas ancha que la caja hace que Chromium encoja el documento entero.
    // Se mide contra el ancho imprimible real y se reduce el tamano hasta que entra.
    document.querySelectorAll(".math").forEach((el) => {{
      const katexEl = el.querySelector(".katex");
      if (!katexEl) return;
      const prev = el.style.width;
      el.style.width = "640px";
      let guard = 0;
      while (katexEl.scrollWidth > 640 && guard < 12) {{
        const size = parseFloat(getComputedStyle(el).fontSize) || 13;
        el.style.fontSize = Math.max(5, size * 0.93) + "px";
        guard++;
      }}
      el.style.width = prev;
    }});
    document.querySelectorAll(".imath").forEach((el) => {{
      const limit = el.parentElement && el.parentElement.clientWidth;
      if (!limit) return;
      let guard = 0;
      while (el.scrollWidth > limit && guard < 8) {{
        const size = parseFloat(getComputedStyle(el).fontSize) || 13;
        el.style.fontSize = Math.max(5, size * 0.95) + "px";
        guard++;
      }}
    }});
  }} catch (err) {{
    console.error("katex", err);
  }}
  window.__ready = true;
}})();
</script>
"""


def build_html(docs, document_title: str) -> str:
    sections = []
    for module_label, title, body in docs:
        sections.append(
            '<section class="doc">'
            f'<div class="doc-head">{esc(module_label)}</div>'
            f'<h1 class="doc-title">{esc(title)}</h1>'
            f'<div class="doc-body">{body}</div>'
            "</section>"
        )
    return (
        "<!doctype html><html lang=\"es\"><head><meta charset=\"utf-8\">"
        f"<title>{esc(document_title)}</title><style>{CSS}</style></head>"
        f"<body>{''.join(sections)}{BROWSER_SCRIPT}</body></html>"
    )


def footer_template(label: str) -> str:
    return (
        '<div style="width:100%;font-family:\'Segoe UI\',Arial,sans-serif;'
        "font-size:7.5px;color:#40454c;display:flex;justify-content:space-between;"
        'align-items:baseline;padding:0 12mm;">'
        f"<span>{esc(label)}</span>"
        '<span><span class="pageNumber"></span> / '
        '<span class="totalPages"></span></span></div>'
    )


def print_pdf(context, html_path: Path, pdf_path: Path, label: str):
    page = context.new_page()
    page.goto(html_path.as_uri())
    page.wait_for_function("window.__ready === true", timeout=120000)
    page.emulate_media(media="print")
    page.pdf(
        path=str(pdf_path),
        format="A4",
        print_background=True,
        display_header_footer=True,
        header_template="<div></div>",
        footer_template=footer_template(label),
        margin={"top": "12mm", "bottom": "12mm", "left": "12mm", "right": "12mm"},
    )
    page.close()


# --------------------------------------------------------------------------- #
# Modulo
# --------------------------------------------------------------------------- #
def parse_index(index_path: Path):
    text = index_path.read_text(encoding="utf-8")
    start = text.find("Mapa de progreso")
    if start == -1:
        start = text.find("Mapa del módulo")
    segment = text[start:]
    end = segment.find("\n---", 10)
    if end > 0:
        segment = segment[:end]
    rows = []
    for line in segment.split("\n"):
        if not re.match(r"^\|\s*\d+\s*\|", line):
            continue
        cells = [c.strip() for c in line.strip().strip("|").split("|")]
        link = re.search(r"\[\[([^\]|]+)", cells[-1])
        if not link:
            continue
        rows.append(
            {
                "n": re.sub(r"\D", "", cells[0]).zfill(2),
                "sesion": cells[1],
                "file": link.group(1) + ".md",
            }
        )
    return rows


def safe_name(name: str) -> str:
    name = name.replace("\u2013", "-").replace("\u2014", "-").replace("\u2212", "-")
    name = re.sub(r"\s*:\s*", " - ", name)
    name = re.sub(r"([A-Za-z])-(?=\s)", r"\1 -", name)
    name = re.sub(r'[<>:"/\\|?*]', "-", name)
    name = re.sub(r"\s+", " ", name).strip()
    return name


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument("--source", required=True)
    parser.add_argument("--dest", required=True)
    parser.add_argument("--modulo", required=True)
    parser.add_argument("--from", dest="from_lesson", default=None)
    parser.add_argument("--only", default=None, help="lista de numeros: 04,05")
    parser.add_argument("--skip-lessons", action="store_true")
    parser.add_argument("--skip-compiled", action="store_true")
    parser.add_argument("--skip-index", action="store_true")
    parser.add_argument("--overwrite", action="store_true")
    args = parser.parse_args()

    source = Path(args.source).resolve()
    dest = Path(args.dest).resolve()
    dest.mkdir(parents=True, exist_ok=True)

    index_path = next(
        f for f in source.iterdir()
        if f.suffix == ".md" and f.name.startswith("AWS Solutions Architect Advanced - ")
    )
    module_name = dest.name.split(" - ", 1)[-1]
    label_base = dest.name
    module_label = f"AWS Solutions Architect Advanced \u2022 SAP-C02 \u2022 Módulo {args.modulo}"

    lessons = parse_index(index_path)
    missing = [r for r in lessons if not (source / r["file"]).exists()]
    if missing:
        raise SystemExit(f"Lecciones sin archivo: {[r['file'] for r in missing]}")

    index_title, index_body, index_lint = note_to_html(index_path)

    want = None
    if args.only:
        want = {x.strip().zfill(2) for x in args.only.split(",")}
    elif args.from_lesson:
        floor = args.from_lesson.zfill(2)
        want = {r["n"] for r in lessons if r["n"] >= floor}

    tmpdir = Path(tempfile.mkdtemp(prefix="md2pdf-"))
    try:
        with sync_playwright() as pw:
            browser = pw.chromium.launch()
            context = browser.new_context(viewport={"width": 1280, "height": 900})

            # --- indice ---------------------------------------------------
            if not args.skip_index:
                target = dest / "00 - Indice del modulo.pdf"
                if args.overwrite or not target.exists():
                    html_path = tmpdir / "00.html"
                    html_path.write_text(
                        build_html([(module_label, index_title, index_body)], index_title),
                        encoding="utf-8",
                    )
                    print(f"[indice] {target.name}")
                    print_pdf(context, html_path, target, f"{label_base} \u2022 Índice")

            # --- lecciones ------------------------------------------------
            if not args.skip_lessons:
                for row in lessons:
                    if want is not None and row["n"] not in want:
                        continue
                    target = dest / f"{row['n']} - {safe_name(row['sesion'])}.pdf"
                    if target.exists() and not args.overwrite:
                        print(f"[salta ] {target.name} (ya existe)")
                        continue
                    title, body, lint_info = note_to_html(source / row["file"])
                    if lint_info:
                        print(f"        aviso de formato: {lint_info}")
                    html_path = tmpdir / f"{row['n']}.html"
                    html_path.write_text(
                        build_html([(module_label, title, body)], title), encoding="utf-8"
                    )
                    print(f"[build ] {target.name}")
                    print_pdf(context, html_path, target, f"{label_base} \u2022 {row['n']}")

            # --- compilado ------------------------------------------------
            if not args.skip_compiled:
                docs = [(module_label, index_title, index_body)]
                for row in lessons:
                    title, body, _ = note_to_html(source / row["file"])
                    docs.append((module_label, title, body))
                compiled_name = (
                    f"99 - {module_name} (modulo completo).pdf"
                )
                target = dest / compiled_name
                html_path = tmpdir / "99.html"
                html_path.write_text(
                    build_html(docs, f"{module_name} (modulo completo)"), encoding="utf-8"
                )
                print(f"[build ] {target.name}")
                print_pdf(context, html_path, target, f"{label_base} \u2022 completo")

            browser.close()
    finally:
        shutil.rmtree(tmpdir, ignore_errors=True)


if __name__ == "__main__":
    main()
