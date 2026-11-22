'use strict';

/* ===== Costanti ===== */
const V = '20261122h';
const FALLBACK_IMG = 'assets/img/placeholders/other.svg';

const P = {
  instagram: '<rect x="2" y="2" width="20" height="20" rx="5"/><circle cx="12" cy="12" r="4"/><path d="M17.5 6.5h.01"/>',
  github: '<path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.4 5.4 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4"/><path d="M9 18c-4.51 2-5-2-7-2"/>',
  mail: '<rect x="2" y="4" width="20" height="16" rx="2"/><path d="m22 7-10 7L2 7"/>',
  globe: '<circle cx="12" cy="12" r="10"/><path d="M2 12h20M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"/>',
  camera: '<path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"/><circle cx="12" cy="13" r="3.5"/>',
  lens: '<circle cx="12" cy="12" r="10"/><circle cx="12" cy="12" r="4"/><path d="M12 2v6M20.7 7l-5.2 3M20.7 17l-5.2-3M12 22v-6M3.3 17l5.2-3M3.3 7l5.2 3"/>',
  tripod: '<path d="M12 3v8M5 21l7-10 7 10M8.5 16h7"/><circle cx="12" cy="3" r="1"/>',
  video: '<path d="m16 13 5.2 3.5a.5.5 0 0 0 .8-.4V7.9a.5.5 0 0 0-.8-.4L16 10.5"/><rect x="2" y="6" width="14" height="12" rx="2"/>',
  drone: '<path d="M6 6l12 12M18 6L6 18"/><circle cx="5" cy="5" r="3"/><circle cx="19" cy="5" r="3"/><circle cx="5" cy="19" r="3"/><circle cx="19" cy="19" r="3"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/>',
  laptop: '<path d="M20 16V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v9m16 0H4m16 0 1.3 2.5a1 1 0 0 1-.9 1.5H3.6a1 1 0 0 1-.9-1.5L4 16"/>',
  box: '<path d="M21 8a2 2 0 0 0-1-1.7l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.7l7 4a2 2 0 0 0 2 0l7-4a2 2 0 0 0 1-1.7Z"/><path d="m3.3 7 8.7 5 8.7-5M12 22V12"/>',
  folder: '<path d="M20 20a2 2 0 0 0 2-2V8a2 2 0 0 0-2-2h-7.9a2 2 0 0 1-1.7-.9l-.8-1.2A2 2 0 0 0 7.9 3H4a2 2 0 0 0-2 2v13a2 2 0 0 0 2 2Z"/>',
  link: '<path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>',
  code: '<path d="m16 18 6-6-6-6M8 6l-6 6 6 6"/>',
  copy: '<rect x="9" y="9" width="13" height="13" rx="2"/><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"/>',
  check: '<path d="M20 6 9 17l-5-5"/>',
  x: '<path d="M18 6 6 18M6 6l12 12"/>',
  arrow: '<path d="M5 12h14M12 5l7 7-7 7"/>',
  external: '<path d="M15 3h6v6M10 14 21 3M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/>',
  zoom: '<circle cx="11" cy="11" r="8"/><path d="m21 21-4.3-4.3M11 8v6M8 11h6"/>',
  sun: '<circle cx="12" cy="12" r="4"/><path d="M12 2v2M12 20v2M4.9 4.9l1.4 1.4M17.7 17.7l1.4 1.4M2 12h2M20 12h2M4.9 19.1l1.4-1.4M17.7 6.3l1.4-1.4"/>',
  moon: '<path d="M12 3a6 6 0 0 0 9 9 9 9 0 1 1-9-9Z"/>',
  chevron: '<path d="m6 9 6 6 6-6"/>'
};
const icon = (name, cls = '') =>
  `<svg class="icon ${cls}" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.75" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${P[name] || P.link}</svg>`;

/* ===== Utilità ===== */
const $ = (s, r = document) => r.querySelector(s);
const esc = s => String(s ?? '').replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const norm = s => String(s ?? '').normalize('NFD').replace(/[̀-ͯ]/g, '').toLowerCase();
const safeUrl = u => { try { return ['http:', 'https:', 'mailto:', 'tel:'].includes(new URL(u, location.href).protocol) ? u : '#'; } catch { return '#'; } };
const isWeb = u => /^https?:/i.test(u);
const ext = u => isWeb(u) && new URL(u, location.href).origin !== location.origin ? ' target="_blank" rel="noopener noreferrer"' : '';
const sorted = arr => arr.map((v, i) => [v, i]).sort((a, b) => ((a[0].order ?? 1e9) - (b[0].order ?? 1e9)) || a[1] - b[1]).map(x => x[0]);
const visible = arr => (arr || []).filter(x => x && x.enabled !== false);
const iconOrImg = (v, fallback = 'link') => /[./]/.test(v || '')
  ? `<img src="${esc(v)}" alt="" width="44" height="44" loading="lazy" decoding="async">`
  : icon(v || fallback);

async function getJSON(path) {
  const r = await fetch(`${path}?v=${V}`, { cache: 'no-cache' });
  if (!r.ok) throw new Error(`${path}: HTTP ${r.status}`);
  return r.json();
}

const state = { cats: [], items: [], q: '', cat: 'all' };
let lang = DEFAULT_LANG;
let DATA = null;
/* testo dell'interfaccia */
const t = (k, v = {}) => (UI[lang][k] ?? UI[DEFAULT_LANG][k] ?? k).replace(/\{(\w+)\}/g, (_, n) => v[n] ?? '');
/* campo dei JSON: stringa semplice oppure oggetto { it, en, fr, de, es } */
const tr = v => (v && typeof v === 'object') ? (v[lang] ?? v.en ?? v.it ?? Object.values(v)[0] ?? '') : (v ?? '');
const specKey = k => (SPEC_KEYS[k] && SPEC_KEYS[k][lang]) || k;

/* ===== Toast e copia ===== */
let toastTimer;
function toast(msg) {
  const t = $('#toast');
  t.textContent = msg; t.classList.add('show');
  clearTimeout(toastTimer); toastTimer = setTimeout(() => t.classList.remove('show'), 1900);
}
async function copyText(text, btn) {
  try { await navigator.clipboard.writeText(text); }
  catch {
    const ta = document.createElement('textarea');
    ta.value = text; ta.style.cssText = 'position:fixed;opacity:0'; document.body.append(ta); ta.select();
    try { document.execCommand('copy'); } catch { /* ignora */ }
    ta.remove();
  }
  toast(t('copied'));
  if (btn) { btn.classList.add('done'); const o = btn.innerHTML; btn.innerHTML = icon('check'); setTimeout(() => { btn.innerHTML = o; btn.classList.remove('done'); }, 1500); }
}
const absUrl = u => new URL(u, location.href).href;
const copyBtn = (url, label) => `<button class="icon-btn copy-btn" type="button" data-copy="${esc(url)}" aria-label="${esc(t('copy_link', { name: label }))}" title="${esc(t('copy_title'))}">${icon('copy')}</button>`;

/* ===== Tema ===== */
function setupTheme() {
  window.__t = k => t(k);
  const btn = $('#theme-toggle'), meta = $('meta[name="theme-color"]');
  const apply = t => {
    document.documentElement.dataset.theme = t;
    btn.innerHTML = icon(t === 'dark' ? 'sun' : 'moon');
    btn.setAttribute('aria-label', t === 'dark' ? window.__t('theme_light') : window.__t('theme_dark'));
    btn.title = window.__t('theme_title');
    if (meta) meta.content = t === 'dark' ? '#0a0c14' : '#ffffff';
  };
  apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  window.__refreshTheme = () => apply(document.documentElement.dataset.theme === 'dark' ? 'dark' : 'light');
  btn.addEventListener('click', () => {
    const t = document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark';
    apply(t); try { localStorage.setItem('theme', t); } catch { /* ignora */ }
  });
}

/* ===== Profilo, link, footer ===== */
function renderProfile(p) {
  $('#name').textContent = p.name || '';
  $('#tagline').textContent = tr(p.tagline);
  $('#bio').textContent = tr(p.bio);
  if (p.avatar) { const a = $('#avatar'); if (!a.src.endsWith(p.avatar)) a.src = p.avatar; a.alt = tr(p.avatarAlt) || p.name || ''; }
  $('#social').hidden = !visible(p.social).length;
  $('#social').innerHTML = sorted(visible(p.social)).map(s =>
    `<li><a href="${esc(safeUrl(s.url))}"${ext(s.url)} aria-label="${esc(tr(s.name))}" title="${esc(tr(s.name))}">${icon(s.icon)}</a></li>`).join('');
  const f = p.footer || {};
  $('#footer-text').textContent = tr(f.text);
  $('#footer-links').innerHTML = sorted(visible(f.links)).map(l =>
    `<li><a href="${esc(safeUrl(l.url))}"${ext(l.url)}>${esc(tr(l.name))}</a></li>`).join('');
  $('#year').textContent = new Date().getFullYear();
}

function renderLinks(d) {
  const f = d.featured;
  if (f) {
    $('#featured').innerHTML = `
      <a class="featured-card" href="${esc(safeUrl(f.url))}"${ext(f.url)}>
        <div class="featured-head">
          ${f.icon ? `<img class="featured-icon" src="${esc(f.icon)}" alt="" width="68" height="68" decoding="async">` : ''}
          <div><span class="eyebrow">${esc(t('featured'))}</span><h2>${esc(tr(f.name))}</h2><p>${esc(tr(f.description))}</p></div>
        </div>
        <span class="btn btn-primary">${esc(tr(f.cta) || 'OK')} ${icon('arrow')}</span>
      </a>${copyBtn(absUrl(f.url), tr(f.name))}`;
  }
  $('#links').innerHTML = sorted(visible(d.groups)).map((g, gi) => `
    <section class="group"${g.title ? ` aria-labelledby="g-${esc(g.id)}"` : ` aria-label="${esc(t('link_group'))}"`}>
      ${g.title ? `<h2 id="g-${esc(g.id)}">${esc(tr(g.title))}</h2>` : ''}
      <ul class="link-list">${sorted(visible(g.items)).map((l, i) => `
        <li class="link-card rise" style="--i:${gi * 3 + i + 2}">
          <a class="link-main" href="${esc(safeUrl(l.url))}"${ext(l.url)}>
            <span class="link-ico">${iconOrImg(l.icon)}</span>
            <span class="link-text"><strong>${esc(tr(l.name))}${l.placeholder ? `<span class="tag">${esc(t('example'))}</span>` : ''}</strong><span>${esc(tr(l.description))}</span></span>
          </a>${copyBtn(absUrl(l.url), tr(l.name))}
        </li>`).join('')}
      </ul>
    </section>`).join('');
}

/* ===== Attrezzatura ===== */
const catName = id => tr((state.cats.find(c => c.id === id) || {}).name) || id;
const catIcon = id => (state.cats.find(c => c.id === id) || {}).icon || 'box';

function matches(it) {
  if (state.cat !== 'all' && it.category !== state.cat) return false;
  if (!state.q) return true;
  const hay = norm([tr(it.name), tr(it.brand), tr(it.model), tr(it.description), catName(it.category),
    ...Object.entries(it.specs || {}).map(([k, v]) => `${specKey(k)} ${tr(v)}`)].join(' '));
  return norm(state.q).split(/\s+/).filter(Boolean).every(w => hay.includes(w));
}

function renderChips() {
  const count = id => state.items.filter(i => id === 'all' || i.category === id).length;
  const chip = (id, label) => `<button class="chip" type="button" data-cat="${esc(id)}" aria-pressed="${state.cat === id}">${esc(label)} <small>${count(id)}</small></button>`;
  $('#chips').innerHTML = chip('all', t('all')) + state.cats.filter(c => count(c.id)).map(c => chip(c.id, tr(c.name))).join('');
}

function productCard(it, i) {
  const img = it.image || FALLBACK_IMG;
  return `
    <article class="product rise" style="--i:${Math.min(i, 10)}">
      <div class="thumb"><img class="${img.includes('/placeholders/') ? 'is-ph' : ''}" src="${esc(img)}" alt="${esc(tr(it.name))}" width="800" height="600" loading="lazy" decoding="async"></div>
      <div class="p-body">
        ${it.placeholder ? `<div class="badges"><span class="badge ph">${esc(t('placeholder'))}</span></div>` : ''}
        <span class="brand">${esc([tr(it.brand), tr(it.model)].filter(Boolean).join(' · '))}</span>
        <h3><button type="button" data-open="${esc(it.id)}" aria-haspopup="dialog">${esc(tr(it.name))}</button></h3>
        <p class="p-desc">${esc(tr(it.description))}</p>
      </div>
    </article>`;
}

function renderCatalog() {
  const list = state.items.filter(matches);
  $('#count').textContent = list.length === state.items.length
    ? t('count_all', { n: list.length }) : t('count_some', { n: list.length, m: state.items.length });
  if (!list.length) {
    $('#catalog').innerHTML = `<div class="empty"><strong>${esc(t('empty_title'))}</strong>${esc(t('empty_text'))}</div>`;
    return;
  }
  const ids = [...state.cats.map(c => c.id), ...new Set(list.map(i => i.category))].filter((v, i, a) => a.indexOf(v) === i);
  let n = 0;
  $('#catalog').innerHTML = ids.map(id => {
    const g = sorted(list.filter(i => i.category === id));
    if (!g.length) return '';
    return `<section class="cat-block" aria-labelledby="c-${esc(id)}">
      <h3 id="c-${esc(id)}">${icon(catIcon(id))}${esc(catName(id))} <small>${g.length}</small></h3>
      <div class="grid">${g.map(it => productCard(it, n++)).join('')}</div></section>`;
  }).join('');
}

function setupFilters() {
  let timer;
  $('#search').addEventListener('input', e => { clearTimeout(timer); timer = setTimeout(() => { state.q = e.target.value.trim(); renderCatalog(); }, 120); });
  $('#chips').addEventListener('click', e => {
    const b = e.target.closest('[data-cat]'); if (!b) return;
    state.cat = b.dataset.cat; renderChips(); renderCatalog();
  });
  document.addEventListener('keydown', e => {
    if (e.key === '/' && !/^(INPUT|TEXTAREA|SELECT)$/.test(document.activeElement.tagName) && !document.querySelector('dialog[open]')) {
      e.preventDefault(); $('#search').focus();
    }
  });
}

/* ===== Dialog prodotto e lightbox ===== */
const pd = () => $('#product-dialog');
const lb = () => $('#lightbox');

function openProduct(id, pushHash = true) {
  const it = state.items.find(i => i.id === id); if (!it) return;
  const specs = Object.entries(it.specs || {});
  const img = it.image || FALLBACK_IMG;
  pd().innerHTML = `
    <button class="icon-btn pd-close" type="button" aria-label="${esc(t('close_card'))}" data-close>${icon('x')}</button>
    <button class="pd-image" type="button" aria-label="${esc(t('enlarge_label', { name: tr(it.name) }))}" data-zoom>
      <img class="${img.includes('/placeholders/') ? 'is-ph' : ''}" src="${esc(img)}" alt="${esc(tr(it.name))}" width="800" height="600" decoding="async">
      <span class="pd-zoom">${icon('zoom')} ${esc(t('enlarge'))}</span>
    </button>
    <div class="pd-body">
      <div class="badges"><span class="badge">${esc(catName(it.category))}</span>${it.placeholder ? `<span class="badge ph">${esc(t('placeholder'))}</span>` : ''}</div>
      <div><span class="brand">${esc([tr(it.brand), tr(it.model)].filter(Boolean).join(' · '))}</span><h2 id="pd-title">${esc(tr(it.name))}</h2></div>
      <p>${esc(tr(it.description))}</p>
      ${specs.length ? `<dl class="specs">${specs.map(([k, v]) => `<dt>${esc(specKey(k))}</dt><dd>${esc(tr(v))}</dd>`).join('')}</dl>` : ''}
      <div class="pd-actions">
        ${it.url ? `<a class="btn btn-primary" href="${esc(safeUrl(it.url))}"${ext(it.url)}>${esc(t('maker_site'))} ${icon('external')}</a>` : ''}
        <button class="btn" type="button" data-copy-product>${icon('copy')} ${esc(t('copy_card'))}</button>
      </div>
    </div>`;
  pd().dataset.id = id;
  if (!pd().open) { pd().showModal(); document.body.classList.add('lock'); }
  if (pushHash) history.replaceState(null, '', '#p=' + encodeURIComponent(id));
}

function openLightbox(src, caption) {
  const d = lb();
  $('img', d).src = src; $('img', d).alt = caption; $('.lb-caption', d).textContent = caption;
  d.showModal();
}

function setupDialogs() {
  $('#lightbox [data-close]').innerHTML = icon('x');
  $('#catalog').addEventListener('click', e => { const b = e.target.closest('[data-open]'); if (b) openProduct(b.dataset.open); });
  pd().addEventListener('click', e => {
    if (e.target === pd() || e.target.closest('[data-close]')) return pd().close();
    if (e.target.closest('[data-zoom]')) { const it = state.items.find(i => i.id === pd().dataset.id); openLightbox(it.image || FALLBACK_IMG, tr(it.name)); }
    if (e.target.closest('[data-copy-product]')) copyText(location.origin + location.pathname + '#p=' + encodeURIComponent(pd().dataset.id), e.target.closest('button'));
  });
  pd().addEventListener('close', () => {
    document.body.classList.remove('lock');
    if (location.hash.startsWith('#p=')) history.replaceState(null, '', location.pathname + location.search);
  });
  lb().addEventListener('click', () => lb().close());
}

function routeHash() {
  const m = location.hash.match(/^#p=(.+)$/);
  if (m) openProduct(decodeURIComponent(m[1]), false);
  else if (pd().open) pd().close();
}

/* ===== Avvio ===== */
document.addEventListener('error', e => {
  if (e.target.tagName === 'IMG' && !e.target.dataset.failed && !e.target.closest('.link-ico, .featured-head, .profile')) {
    e.target.dataset.failed = '1'; e.target.src = FALLBACK_IMG;
  }
}, true);

document.addEventListener('click', e => {
  const b = e.target.closest('[data-copy]'); if (b) copyText(b.dataset.copy, b);
});

/* ===== Lingua ===== */
const flag = c => `<img src="assets/img/flags/${c}.svg" alt="" width="24" height="16" decoding="async">`;

function applyStaticTexts() {
  document.documentElement.lang = lang;
  document.title = t('doc_title');
  const md = $('meta[name="description"]'); if (md) md.content = t('doc_desc');
  for (const el of document.querySelectorAll('[data-i18n]')) el.textContent = t(el.dataset.i18n);
  for (const el of document.querySelectorAll('[data-i18n-attr]'))
    for (const pair of el.dataset.i18nAttr.split(';')) { const [a, k] = pair.split(':'); el.setAttribute(a, t(k)); }
  const cur = LANGS.find(l => l.code === lang);
  $('#lang-btn').innerHTML = `${flag(lang)}<span class="lang-name">${esc(cur.name)}</span>${icon('chevron')}`;
  $('#lang-btn').setAttribute('aria-label', `${t('lang_label')}: ${cur.name}`);
  $('#lang-menu').setAttribute('aria-label', t('lang_label'));
  $('#lang-menu').innerHTML = `<li class="lang-head" aria-hidden="true">${esc(t('lang_label'))}</li>` + LANGS.map(l => `<li><button type="button" class="lang-opt" data-lang="${l.code}" lang="${l.code}" aria-current="${l.code === lang}">${flag(l.code)}<span>${esc(l.name)}</span>${l.code === lang ? icon('check') : ''}</button></li>`).join('');
  $('#lightbox [data-close]').setAttribute('aria-label', t('close_image'));
  $('#lightbox').setAttribute('aria-label', t('lightbox'));
  if (window.__refreshTheme) window.__refreshTheme();
}

function renderAll() {
  applyStaticTexts();
  renderProfile(DATA.profile); renderLinks(DATA.links);
  renderChips(); renderCatalog();
  if (pd().open) openProduct(pd().dataset.id, false);
}

function setLang(code) {
  if (!LANGS.some(l => l.code === code) || code === lang) return;
  lang = code;
  try { localStorage.setItem('lang', code); } catch { /* ignora */ }
  renderAll();
}

function setupLang() {
  const btn = $('#lang-btn'), menu = $('#lang-menu');
  const close = (focus) => { menu.hidden = true; btn.setAttribute('aria-expanded', 'false'); if (focus) btn.focus(); };
  btn.addEventListener('click', () => {
    const open = menu.hidden;
    menu.hidden = !open; btn.setAttribute('aria-expanded', String(open));
    if (open) (menu.querySelector('[aria-current="true"]') || menu.querySelector('button')).focus();
  });
  menu.addEventListener('click', e => { const b = e.target.closest('[data-lang]'); if (b) { setLang(b.dataset.lang); close(true); } });
  menu.addEventListener('keydown', e => {
    const items = [...menu.querySelectorAll('button')], i = items.indexOf(document.activeElement);
    if (e.key === 'ArrowDown') { e.preventDefault(); items[(i + 1) % items.length].focus(); }
    if (e.key === 'ArrowUp') { e.preventDefault(); items[(i - 1 + items.length) % items.length].focus(); }
  });
  document.addEventListener('keydown', e => { if (e.key === 'Escape' && !menu.hidden) { e.stopPropagation(); close(true); } }, true);
  document.addEventListener('click', e => { if (!menu.hidden && !e.target.closest('.lang')) close(false); });
}

async function init() {
  lang = detectLang();
  setupTheme();
  try {
    const [profile, links, cats, items] = await Promise.all(
      ['profile', 'links', 'categories', 'equipment'].map(n => getJSON(`data/${n}.json`)));
    DATA = { profile, links };
    state.cats = sorted(visible(cats));
    state.items = visible(items);
    setupLang(); setupFilters(); setupDialogs();
    renderAll();
    window.addEventListener('hashchange', routeHash); routeHash();
    document.documentElement.dataset.ready = '1';
  } catch (err) {
    console.error(err);
    $('#catalog').innerHTML = `<div class="error-box" role="alert"><strong>${esc(t('error_title'))}</strong><br>${esc(err.message)}<br>${esc(t('error_hint'))}</div>`;
  }
}
init();
