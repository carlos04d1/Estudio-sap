// Cada funcion se inyecta por separado con chrome.scripting: debe ser autocontenida.

function sbProbe(sel) {
  const count = (s) => {
    try { return document.querySelectorAll(s).length; } catch (e) { return -1; }
  };
  const counts = {};
  for (const key of Object.keys(sel)) counts[key] = count(sel[key]);
  let title = '';
  try {
    const el = document.querySelector(sel.title);
    if (el) title = (el.innerText || el.textContent || '').trim();
  } catch (e) { /* selector invalido */ }
  return {
    hasTitle: !!title,
    hasNext: counts.next_lesson > 0,
    title,
    url: location.href,
    counts,
  };
}

async function sbExtractLesson(sel) {
  const sleep = (ms) => new Promise((r) => setTimeout(r, ms));
  const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  const all = (s, ctx) => { try { return Array.from(ctx.querySelectorAll(s)); } catch (e) { return []; } };
  const one = (s, ctx) => { try { return ctx.querySelector(s); } catch (e) { return null; } };
  const clickable = (el) => !el.disabled && el.getAttribute('aria-disabled') !== 'true';

  const root = sel.lesson_root.split(',').map((s) => one(s.trim(), document)).find(Boolean) || document.body;

  let title = '';
  const titleEl = one(sel.title, document);
  if (titleEl) title = (titleEl.innerText || titleEl.textContent || '').trim();

  // Fase 1: leer datos interactivos en el DOM vivo (solo clicks, sin reescribir nada).
  const carouselSlides = [];
  for (const car of all(sel.carousel, root)) {
    const slides = [];
    const seen = new Set();
    for (let k = 0; k < 40; k++) {
      const content = one(sel.carousel_slide, car);
      if (!content) break;
      const label = content.getAttribute('aria-label') || 'slide-' + slides.length;
      if (seen.has(label)) break;
      seen.add(label);
      const text = (content.innerText || '').trim();
      if (text) slides.push(text);
      const nxt = one(sel.carousel_next, car);
      if (!nxt || !clickable(nxt)) break;
      nxt.click();
      await sleep(120);
    }
    carouselSlides.push(slides);
  }

  const hotspotParts = [];
  for (const region of all(sel.hotspot_region, root)) {
    const markersAt = () => all(sel.hotspot_marker, region);
    const initial = markersAt().find((m) => /\bselected\b/i.test(m.getAttribute('aria-label') || ''));
    const total = markersAt().length;
    const parts = [];
    for (let j = 0; j < total; j++) {
      const marker = markersAt()[j];
      if (!marker) continue;
      marker.click();
      await sleep(150);
      const info = one(sel.hotspot_info, region);
      if (!info) continue;
      const h4 = one('h4', info);
      const t = h4 ? (h4.innerText || '').trim() : '';
      const full = (info.innerText || '').replace(/\s+/g, ' ').trim();
      const body = t && full.startsWith(t) ? full.slice(t.length).trim() : full;
      if ((t || body) && !parts.some((p) => p[0] === t && p[1] === body)) parts.push([t, body]);
    }
    // Devolver el panel a su marcador original.
    if (initial && initial.isConnected && total > 1) {
      initial.click();
      await sleep(150);
    }
    hotspotParts.push(parts);
  }

  // Pestanas (tabs): los paneles inactivos estan vacios, hay que activar cada una.
  const tabGroups = [];
  for (const list of all(sel.tablist, root)) {
    const tabs = all(sel.tab, list);
    const initialTab = tabs.find((t) => t.getAttribute('aria-selected') === 'true');
    const items = [];
    for (const tab of tabs) {
      if (clickable(tab)) {
        tab.click();
        await sleep(150);
      }
      const panelId = tab.getAttribute('aria-controls') || '';
      const panel = panelId ? document.getElementById(panelId) : null;
      items.push({
        label: (tab.innerText || tab.textContent || '').trim(),
        panelId,
        html: panel ? panel.innerHTML : '',
      });
    }
    if (initialTab && initialTab.isConnected && tabs.length > 1) {
      initialTab.click();
      await sleep(150);
    }
    tabGroups.push(items);
  }

  const transcripts = all(sel.transcript, root).map((b) =>
    (b.innerText || '').replace(/<v[^>]*>|<\/v>/g, '').replace(/\s+/g, ' ').trim());

  // Fase 2: aplicar los reemplazos solo sobre un clon.
  const clone = root.cloneNode(true);

  all(sel.tablist, clone).forEach((list, i) => {
    const items = tabGroups[i] || [];
    for (const it of items) {
      if (!it.panelId || !it.html.trim()) continue;
      const panel = one('[id="' + it.panelId.replace(/(["\\])/g, '\\$1') + '"]', clone);
      if (!panel) continue;
      panel.innerHTML = '<h4>' + esc(it.label) + '</h4>' + it.html;
    }
    list.remove();
  });

  all(sel.carousel, clone).forEach((el, i) => {
    const blocks = [];
    for (const slide of carouselSlides[i] || []) {
      const lines = slide.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
      if (!lines.length) continue;
      blocks.push('<div><h4>' + esc(lines[0]) + '</h4><p>' + esc(lines.slice(1).join(' ')) + '</p></div>');
    }
    if (blocks.length) el.innerHTML = blocks.join('');
  });

  all(sel.hotspot_region, clone).forEach((el, i) => {
    const parts = hotspotParts[i] || [];
    if (!parts.length) return;
    el.innerHTML = parts.map((p) => '<div><h4>' + esc(p[0] || 'Info') + '</h4><p>' + esc(p[1]) + '</p></div>').join('');
  });

  all(sel.transcript, clone).forEach((el, i) => {
    if (!transcripts[i]) return;
    el.innerHTML = '';
    const h = document.createElement('h4');
    h.textContent = 'Transcript';
    const p = document.createElement('p');
    p.textContent = transcripts[i];
    el.appendChild(h);
    el.appendChild(p);
  });

  // Serializador HTML -> Markdown (mismo que EXTRACT_JS del scraper Python).
  const SKIP = new Set(['SCRIPT', 'STYLE', 'SVG', 'BUTTON', 'HEADER', 'VIDEO', 'SOURCE', 'TRACK', 'NOSCRIPT', 'NAV', 'ASIDE']);
  const SKIP_ROLES = new Set(['navigation', 'menu', 'menubar', 'tree']);
  const norm = (s) => s.replace(/\u00a0/g, ' ').replace(/[ \t\r\n]+/g, ' ');

  function inline(node) {
    let out = '';
    for (const child of node.childNodes) out += render(child);
    return out;
  }

  function render(node) {
    if (node.nodeType === 3) return norm(node.textContent);
    if (node.nodeType !== 1) return '';
    const tag = node.tagName;
    if (SKIP.has(tag.toUpperCase())) return '';
    if (SKIP_ROLES.has(node.getAttribute('role') || '')) return '';

    switch (tag) {
      case 'H1': return '\n# ' + inline(node).trim() + '\n';
      case 'H2': return '\n## ' + inline(node).trim() + '\n';
      case 'H3': return '\n### ' + inline(node).trim() + '\n';
      case 'H4': return '\n#### ' + inline(node).trim() + '\n';
      case 'H5': return '\n##### ' + inline(node).trim() + '\n';
      case 'P': {
        const t = inline(node).trim();
        return t ? '\n' + t + '\n' : '';
      }
      case 'BR': return '  \n';
      case 'HR': return '\n---\n';
      case 'STRONG':
      case 'B': {
        const t = inline(node).trim();
        return t ? '**' + t + '**' : '';
      }
      case 'EM':
      case 'I': {
        const t = inline(node).trim();
        return t ? '*' + t + '*' : '';
      }
      case 'CODE': {
        const t = node.textContent.trim();
        return t ? '`' + t + '`' : '';
      }
      case 'PRE': {
        const t = node.textContent.replace(/\n+$/, '');
        return t ? '\n```\n' + t + '\n```\n' : '';
      }
      case 'IMG': {
        const src = node.getAttribute('src') || '';
        if (!src || src.startsWith('data:')) return '';
        const alt = (node.getAttribute('alt') || '').replace(/[\[\]]/g, '');
        return '\n![' + alt + '](' + src + ')\n';
      }
      case 'A': {
        const t = inline(node).trim();
        const href = node.getAttribute('href') || '';
        if (!t) return '';
        if (!href || href.startsWith('javascript')) return t;
        return '[' + t + '](' + href + ')';
      }
      case 'UL':
      case 'OL': {
        const ordered = tag === 'OL';
        const items = Array.from(node.children)
          .filter((li) => li.tagName === 'LI')
          .map((li, i) => {
            const body = inline(li).trim().replace(/\s*\n\s*/g, ' ');
            return (ordered ? (i + 1) + '. ' : '- ') + body;
          });
        return items.length ? '\n' + items.join('\n') + '\n' : '';
      }
      case 'TABLE': {
        const rows = Array.from(node.querySelectorAll('tr'))
          .map((tr) => Array.from(tr.children)
            .filter((c) => c.tagName === 'TH' || c.tagName === 'TD')
            .map((c) => inline(c).trim().replace(/\|/g, '\\|').replace(/\s*\n\s*/g, ' ')))
          .filter((r) => r.length);
        if (!rows.length) return '';
        const width = Math.max(...rows.map((r) => r.length));
        const pad = (r) => { const c = r.slice(); while (c.length < width) c.push(''); return c; };
        const lines = rows.map((r) => '| ' + pad(r).join(' | ') + ' |');
        lines.splice(1, 0, '| ' + Array(width).fill('---').join(' | ') + ' |');
        return '\n' + lines.join('\n') + '\n';
      }
      case 'BLOCKQUOTE': {
        const t = inline(node).trim();
        return t ? '\n' + t.split('\n').map((l) => '> ' + l).join('\n') + '\n' : '';
      }
      case 'DIV':
      case 'SECTION':
      case 'ARTICLE':
      case 'MAIN':
      case 'FOOTER':
      case 'FIGURE':
      case 'FIGCAPTION':
      case 'DL':
      case 'DT':
      case 'DD':
      case 'LI':
      case 'DETAILS':
      case 'SUMMARY':
      case 'FORM': {
        const t = inline(node).trim();
        return t ? '\n' + t + '\n' : '';
      }
      default:
        return inline(node);
    }
  }

  let markdown = render(clone);
  markdown = markdown.replace(/[ \t]+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  return { title, url: location.href, markdown };
}

function sbClickNext(sel) {
  let btn = null;
  try { btn = document.querySelector(sel.next_lesson); } catch (e) { return false; }
  if (!btn || btn.disabled || btn.getAttribute('aria-disabled') === 'true') return false;
  btn.click();
  return true;
}
