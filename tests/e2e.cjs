// Test end-to-end (richiede: npm i playwright). Uso: node tests/e2e.cjs  (server locale su :8080 già avviato)
const { chromium, devices } = require('playwright');
const BASE = process.env.BASE || 'http://localhost:8080';
const SHOTS = process.env.SHOTS || '';
let fail = 0;
const ok = (c, m) => { console.log((c ? '  PASS ' : '  FAIL ') + m); if (!c) fail++; };

(async () => {
  const b = await chromium.launch();
  const viewports = { 'mobile (iPhone 13)': devices['iPhone 13'], 'tablet 820x1180': { viewport: { width: 820, height: 1180 } }, 'desktop 1440x900': { viewport: { width: 1440, height: 900 } } };
  for (const [name, opts] of Object.entries(viewports)) {
    console.log('\n== ' + name);
    const ctx = await b.newContext({ ...opts, permissions: ['clipboard-read', 'clipboard-write'] });
    const p = await ctx.newPage();
    const errs = []; const bad = [];
    p.on('console', m => m.type() === 'error' && errs.push(m.text()));
    p.on('pageerror', e => errs.push(String(e)));
    p.on('response', r => r.status() >= 400 && bad.push(r.status() + ' ' + r.url()));
    await p.goto(BASE + '/'); await p.waitForSelector('html[data-ready]');
    await p.waitForTimeout(900);

    ok(await p.locator('h1').innerText() === 'Nathan Pollini', 'nome profilo da profile.json');
    ok(await p.locator('.featured-card .btn').innerText().then(t => t.includes('VISITA PHOTOCARCIFO')), 'CTA VISITA PHOTOCARCIFO');
    ok(await p.locator('.featured-card').getAttribute('href') === 'https://photocarcifo.ch', 'link Photocarcifo corretto');
    const yF = (await p.locator('.featured-card').boundingBox()).y, yE = (await p.locator('#equipment').boundingBox()).y;
    ok(yF < yE && yF < (opts.viewport?.height || 900), 'card Photocarcifo prima e visibile above the fold');
    ok(await p.locator('.link-card').count() === 2, '2 card link da links.json');
    ok(await p.locator('.product').count() === 11, '11 prodotti da equipment.json');
    ok(await p.locator('.cat-block').count() === 4, '4 categorie con prodotti');
    ok(await p.evaluate(() => document.documentElement.scrollWidth <= innerWidth), 'nessuno scroll orizzontale');
    // le immagini lazy si caricano solo in vista: porta ogni immagine in vista e attendi il caricamento
    await p.evaluate(async () => {
      for (const i of document.images) {
        if (!i.getAttribute('src')) continue;
        i.scrollIntoView({ block: 'center' });
        for (let t = 0; t < 50 && !i.naturalWidth; t++) await new Promise(r => setTimeout(r, 60));
      }
      scrollTo(0, 0);
    });
    const badImgs = await p.evaluate(() => [...document.images].filter(i => i.getAttribute('src') && !i.naturalWidth).map(i => i.getAttribute('src')));
    const imgs = badImgs.length; if (imgs) console.log('   non caricate:', badImgs);
    ok(imgs === 0, 'tutte le immagini caricate');

    // ricerca
    await p.fill('#search', 'dji'); await p.waitForTimeout(300);
    ok(await p.locator('.product').count() === 4, 'ricerca "dji" → 4 risultati');
    await p.fill('#search', 'sandisk'); await p.waitForTimeout(300);
    ok(await p.locator('.product').count() === 1, 'ricerca "sandisk" → 1 risultato');
    await p.fill('#search', 'zzzz'); await p.waitForTimeout(300);
    ok(await p.locator('.empty').count() === 1, 'ricerca senza risultati → stato vuoto');
    await p.fill('#search', ''); await p.waitForTimeout(300);
    // filtri
    await p.click('.chip[data-cat="cameras"]');
    ok(await p.locator('.product').count() === 2, 'filtro Fotocamere → 2');
    ok(await p.locator('.chip[data-cat="cameras"]').getAttribute('aria-pressed') === 'true', 'chip attivo aria-pressed');
    await p.selectOption('#status-filter', 'incoming');
    ok(await p.locator('.product').count() === 0, 'categoria + stato "in arrivo" → 0');
    await p.selectOption('#status-filter', 'all'); await p.click('.chip[data-cat="all"]');
    await p.selectOption('#status-filter', 'sold');
    ok(await p.locator('.product').count() === 0, 'stato "venduto" → 0');
    await p.selectOption('#status-filter', 'all');
    ok(await p.locator('.product').count() === 11, 'reset filtri → 11');

    // scheda + lightbox + tastiera
    await p.locator('.product h3 button').nth(2).focus(); await p.keyboard.press('Enter');
    await p.waitForSelector('#product-dialog[open]');
    ok(await p.locator('#pd-title').innerText() === 'Sony E PZ 18-105mm f/4 G OSS', 'scheda prodotto aperta da tastiera');
    ok(p.url().includes('#p=sony-18-105-f4'), 'deep link #p= impostato');
    ok(await p.locator('#product-dialog .specs dt').count() === 2, 'specifiche mostrate');
    await p.click('[data-zoom]'); await p.waitForSelector('#lightbox[open]');
    ok(true, 'lightbox aperta');
    await p.keyboard.press('Escape');
    ok(await p.locator('#lightbox[open]').count() === 0 && await p.locator('#product-dialog[open]').count() === 1, 'Esc chiude solo la lightbox');
    await p.click('[data-copy-product]');
    ok((await p.evaluate(() => navigator.clipboard.readText())).includes('#p=sony-18-105-f4'), 'copia link scheda');
    await p.keyboard.press('Escape');
    ok(await p.locator('#product-dialog[open]').count() === 0, 'Esc chiude la scheda');
    await p.waitForTimeout(200);
    ok(!p.url().includes('#p='), 'hash ripulito alla chiusura');

    // copia link card
    await p.locator('.featured .copy-btn').click();
    ok((await p.evaluate(() => navigator.clipboard.readText())).startsWith('https://photocarcifo.ch'), 'pulsante copia link Photocarcifo');

    // tema
    ok(await p.evaluate(() => document.documentElement.dataset.theme) === 'dark', 'tema scuro di default');
    await p.click('#theme-toggle');
    ok(await p.evaluate(() => document.documentElement.dataset.theme) === 'light', 'cambio a tema chiaro');
    await p.waitForTimeout(600); // transizione tema
    const bg = await p.evaluate(() => getComputedStyle(document.body).backgroundColor);
    ok(bg === 'rgb(245, 245, 247)', 'sfondo chiaro applicato (' + bg + ')');
    await p.reload(); await p.waitForSelector('html[data-ready]');
    ok(await p.evaluate(() => document.documentElement.dataset.theme) === 'light', 'tema persistente dopo reload');
    if (SHOTS) { await p.waitForTimeout(800); await p.screenshot({ path: `${SHOTS}/${name.split(' ')[0]}-light.png`, fullPage: true }); }
    await p.click('#theme-toggle');
    if (SHOTS) { await p.waitForTimeout(800); await p.screenshot({ path: `${SHOTS}/${name.split(' ')[0]}-dark.png`, fullPage: true }); }

    // deep link
    await p.goto(BASE + '/#p=dji-mic-mini'); await p.waitForSelector('#product-dialog[open]');
    ok(await p.locator('#pd-title').innerText() === 'DJI Mic Mini', 'deep link apre la scheda');

    ok(bad.length === 0, 'nessuna risposta HTTP >= 400' + (bad.length ? ' ' + bad : ''));
    ok(errs.length === 0, 'nessun errore in console' + (errs.length ? ' ' + errs : ''));
    await ctx.close();
  }

  console.log('\n== Link esterni / 404');
  const ctx = await b.newContext(); const p = await ctx.newPage();
  await p.goto(BASE + '/404.html');
  ok(await p.locator('h1').innerText() === '404', '404.html personalizzata');
  ok((await p.request.get(BASE + '/data/equipment.json')).ok(), 'JSON raggiungibile');
  for (const f of ['CNAME', 'robots.txt', 'sitemap.xml', 'assets/img/og.png', 'assets/img/favicon.svg', 'assets/img/favicon-32.png', 'assets/img/apple-touch-icon.png'])
    ok((await p.request.get(BASE + '/' + f)).ok(), f + ' raggiungibile');
  await b.close();
  console.log(fail ? `\n${fail} TEST FALLITI` : '\nTUTTI I TEST SUPERATI');
  process.exit(fail ? 1 : 0);
})();
