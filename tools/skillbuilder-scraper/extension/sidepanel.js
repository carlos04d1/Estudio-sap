const SEP = '\n\n---\n\n';
const STORE_KEY = 'sbSelectors';
const $ = (id) => document.getElementById(id);

let sel = Object.assign({}, SB_DEFAULT_SELECTORS);
let running = false;
let stopFlag = false;

function log(msg) {
  const box = $('log');
  const t = new Date().toLocaleTimeString();
  box.textContent += `[${t}] ${msg}\n`;
  box.scrollTop = box.scrollHeight;
}

function updateStats() {
  const text = $('output').value;
  const n = text.trim() ? text.split(SEP).filter((s) => s.trim()).length : 0;
  $('stats').textContent = `${n} lecciones · ${text.length} caracteres`;
}

function appendLesson(md) {
  const out = $('output');
  out.value = out.value.trim() ? out.value + SEP + md : md;
  out.scrollTop = out.scrollHeight;
  updateStats();
}

const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

async function sleepInterruptible(ms) {
  const end = Date.now() + ms;
  while (Date.now() < end && !stopFlag) await sleep(Math.min(200, end - Date.now()));
}

function setRunning(v) {
  running = v;
  $('btnExtract').disabled = v;
  $('btnDiag').disabled = v;
  $('btnStop').disabled = !v;
}

async function loadSelectors() {
  try {
    const data = await chrome.storage.local.get(STORE_KEY);
    if (data[STORE_KEY]) sel = Object.assign({}, SB_DEFAULT_SELECTORS, JSON.parse(data[STORE_KEY]));
  } catch (e) {
    log('Selectores guardados inválidos; uso los de defecto.');
  }
  $('selectors').value = JSON.stringify(sel, null, 2);
}

async function saveSelectors() {
  try {
    const parsed = JSON.parse($('selectors').value);
    if (!parsed || typeof parsed !== 'object' || Array.isArray(parsed)) throw new Error('debe ser un objeto');
    await chrome.storage.local.set({ [STORE_KEY]: JSON.stringify(parsed) });
    sel = Object.assign({}, SB_DEFAULT_SELECTORS, parsed);
    $('selectors').value = JSON.stringify(sel, null, 2);
    log('Selectores guardados.');
  } catch (e) {
    log('JSON de selectores inválido: ' + e.message);
  }
}

async function resetSelectors() {
  await chrome.storage.local.remove(STORE_KEY);
  sel = Object.assign({}, SB_DEFAULT_SELECTORS);
  $('selectors').value = JSON.stringify(sel, null, 2);
  log('Selectores restaurados.');
}

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch (e) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (e2) { ok = false; }
    ta.remove();
    return ok;
  }
}

async function activeTab() {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  return tab;
}

async function getFrames(tabId) {
  try {
    return (await chrome.webNavigation.getAllFrames({ tabId })) || [];
  } catch (e) {
    return [];
  }
}

const isHttp = (url) => /^https?:\/\//i.test(url || '');

// Debe llamarse dentro del handler del click (gesto de usuario).
async function ensurePermissions(frames) {
  const origins = new Set();
  for (const f of frames) if (isHttp(f.url)) origins.add(new URL(f.url).origin + '/*');
  const missing = [];
  for (const o of origins) {
    try {
      if (!(await chrome.permissions.contains({ origins: [o] }))) missing.push(o);
    } catch (e) { /* patron no soportado */ }
  }
  if (!missing.length) return;
  try {
    const granted = await chrome.permissions.request({ origins: missing });
    log(granted ? `Permisos concedidos: ${missing.join(', ')}` : `Permisos denegados: ${missing.join(', ')}`);
  } catch (e) {
    log('No se pudieron pedir permisos: ' + e.message);
  }
}

async function runInFrame(tabId, frameId, func, args) {
  const [r] = await chrome.scripting.executeScript({ target: { tabId, frameIds: [frameId] }, func, args });
  return r ? r.result : undefined;
}

// Devuelve [{frame, probe, error}] para todos los frames http(s) de la pestana.
async function probeAll(tabId) {
  const frames = (await getFrames(tabId)).filter((f) => isHttp(f.url));
  return Promise.all(frames.map(async (frame) => {
    try {
      return { frame, probe: await runInFrame(tabId, frame.frameId, sbProbe, [sel]) };
    } catch (e) {
      return { frame, error: e.message };
    }
  }));
}

function reportNoContent(results) {
  log('No encontré el contenido de la lección. Abrí una lección en esta pestaña.');
  log('Frames vistos:');
  for (const r of results) log(`  - ${r.frame.url}${r.error ? '  [error: ' + r.error + ']' : ''}`);
  if (!results.length) log('  (ninguno)');
}

async function findContentFrame(tabId, timeoutMs, accept) {
  const deadline = Date.now() + timeoutMs;
  let last = [];
  while (Date.now() < deadline && !stopFlag) {
    last = await probeAll(tabId);
    const hit = last.find((r) => r.probe && r.probe.hasTitle && (!accept || accept(r.probe)));
    if (hit) return { found: hit };
    await sleep(500);
  }
  return { found: null, last };
}

async function clickNextEverywhere(tabId) {
  for (const f of (await getFrames(tabId)).filter((x) => isHttp(x.url))) {
    try {
      if (await runInFrame(tabId, f.frameId, sbClickNext, [sel])) return true;
    } catch (e) { /* frame sin acceso */ }
  }
  return false;
}

async function extractFrom(tabId, hit) {
  try {
    return await runInFrame(tabId, hit.frame.frameId, sbExtractLesson, [sel]);
  } catch (e) {
    log('    reintentando extracción: ' + e.message);
    const { found } = await findContentFrame(tabId, 10000);
    if (!found) throw e;
    return runInFrame(tabId, found.frame.frameId, sbExtractLesson, [sel]);
  }
}

async function extractRun(tabId, limit, delay) {
  const first = await findContentFrame(tabId, 20000);
  if (!first.found) {
    if (!stopFlag) reportNoContent(first.last || []);
    return;
  }
  let hit = first.found;
  let count = 0;

  while (count < limit && !stopFlag) {
    log(`[${count + 1}] ${hit.probe.title}`);
    const res = await extractFrom(tabId, hit);
    if (!res || !res.markdown) {
      log('    ERROR: extracción vacía.');
      break;
    }
    const tab = await chrome.tabs.get(tabId);
    const url = tab.url || res.url;
    appendLesson(`${res.markdown}\n\n_Fuente: ${url}_`);
    log(`    ok (${res.markdown.length} caracteres)`);
    count++;
    if (count >= limit) break;

    await sleepInterruptible((delay + Math.random() * delay * 0.6) * 1000);
    if (stopFlag) break;

    const before = { title: res.title || hit.probe.title, url };
    if (!(await clickNextEverywhere(tabId))) {
      log('No hay más lecciones.');
      break;
    }
    let changed = null;
    const deadline = Date.now() + 30000;
    while (Date.now() < deadline && !stopFlag && !changed) {
      await sleep(500);
      const tabNow = await chrome.tabs.get(tabId);
      const results = await probeAll(tabId);
      changed = results.find((r) => r.probe && r.probe.hasTitle &&
        (r.probe.title !== before.title || tabNow.url !== before.url)) || null;
    }
    if (!changed) {
      if (!stopFlag) log('La lección no cambió tras 30 s; detengo el proceso.');
      break;
    }
    await sleep(400);
    hit = changed;
  }
  log(stopFlag ? 'Detenido por el usuario.' : `Listo: ${count} lección(es) extraída(s).`);
}

async function onExtract() {
  if (running) return;
  setRunning(true);
  stopFlag = false;
  try {
    const tab = await activeTab();
    if (!tab || tab.id == null) {
      log('No hay pestaña activa.');
      return;
    }
    await ensurePermissions(await getFrames(tab.id));

    const mode = document.querySelector('input[name=mode]:checked').value;
    const n = Math.max(1, parseInt($('count').value, 10) || 1);
    const delay = Math.max(0, parseFloat($('delay').value) || 0);
    const limit = mode === 'one' ? 1 : mode === 'n' ? n : Infinity;
    await extractRun(tab.id, limit, delay);
  } catch (e) {
    log('ERROR: ' + e.message);
  } finally {
    setRunning(false);
  }
}

async function onDiagnostic() {
  if (running) return;
  setRunning(true);
  stopFlag = false;
  try {
    const tab = await activeTab();
    if (!tab || tab.id == null) {
      log('No hay pestaña activa.');
      return;
    }
    const frames = await getFrames(tab.id);
    await ensurePermissions(frames);

    const lines = ['Diagnóstico Skill Builder', `Pestaña: ${tab.url}`];
    for (const f of await getFrames(tab.id)) {
      lines.push('', `Frame ${f.frameId} (padre ${f.parentFrameId}): ${f.url}`);
      if (!isHttp(f.url)) {
        lines.push('  omitido (no http/https)');
        continue;
      }
      try {
        const p = await runInFrame(tab.id, f.frameId, sbProbe, [sel]);
        lines.push(`  title="${p.title}" hasTitle=${p.hasTitle} hasNext=${p.hasNext}`);
        for (const k of Object.keys(p.counts)) lines.push(`  selector ${k}: ${p.counts[k]}`);
      } catch (e) {
        lines.push('  ERROR: ' + e.message);
      }
    }
    const report = lines.join('\n');
    log('\n' + report);
    log((await copyText(report)) ? 'Diagnóstico copiado al portapapeles.' : 'No se pudo copiar; copialo desde el log.');
  } catch (e) {
    log('ERROR: ' + e.message);
  } finally {
    setRunning(false);
  }
}

async function onCopy() {
  const text = $('output').value;
  if (!text) return log('Nada para copiar.');
  log((await copyText(text)) ? `Copiado (${text.length} caracteres).` : 'No se pudo copiar.');
}

function onSave() {
  const text = $('output').value;
  if (!text) return log('Nada para guardar.');
  const stamp = new Date().toISOString().replace(/[-:]/g, '').replace('T', '-').slice(0, 15);
  const url = URL.createObjectURL(new Blob([text], { type: 'text/markdown;charset=utf-8' }));
  const a = document.createElement('a');
  a.href = url;
  a.download = `skillbuilder-${stamp}.md`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 5000);
  log('Guardado: ' + a.download);
}

$('btnExtract').addEventListener('click', onExtract);
$('btnStop').addEventListener('click', () => { stopFlag = true; log('Deteniendo...'); });
$('btnCopy').addEventListener('click', onCopy);
$('btnSave').addEventListener('click', onSave);
$('btnDiag').addEventListener('click', onDiagnostic);
$('btnClear').addEventListener('click', () => { $('output').value = ''; updateStats(); });
$('btnSelSave').addEventListener('click', saveSelectors);
$('btnSelReset').addEventListener('click', resetSelectors);
$('output').addEventListener('input', updateStats);

loadSelectors().then(updateStats);
