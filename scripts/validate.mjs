// Valida i file JSON: sintassi, riferimenti a categorie, ID univoci, immagini esistenti, stati validi.
import { readFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = join(dirname(fileURLToPath(import.meta.url)), '..');
const errors = [], warnings = [];
const load = f => { try { return JSON.parse(readFileSync(join(root, 'data', f), 'utf8')); } catch (e) { errors.push(`data/${f}: JSON non valido (${e.message})`); return null; } };
const img = (p, where) => { if (p && !/^https?:/.test(p) && !existsSync(join(root, p))) errors.push(`${where}: immagine mancante "${p}"`); };

const profile = load('profile.json'), links = load('links.json'), cats = load('categories.json'), eq = load('equipment.json');
if (profile) img(profile.avatar, 'profile.avatar');
if (links) {
  img(links.featured?.icon, 'links.featured.icon');
  if (!links.featured?.url) errors.push('links.featured.url mancante');
  for (const g of links.groups || []) for (const l of g.items || []) {
    if (/[./]/.test(l.icon || '')) img(l.icon, `link "${l.name}"`);
    if (!l.url) errors.push(`link "${l.name}": url mancante`);
    if (l.placeholder) warnings.push(`link "${l.name}" è ancora un placeholder`);
  }
}
if (cats && eq) {
  const catIds = new Set(cats.map(c => c.id));
  if (catIds.size !== cats.length) errors.push('categories.json: id duplicati');
  const ids = new Set();
  for (const it of eq) {
    if (!it.id) { errors.push(`prodotto senza id: "${it.name}"`); continue; }
    if (ids.has(it.id)) errors.push(`id prodotto duplicato: "${it.id}"`);
    ids.add(it.id);
    if (!/^[a-z0-9-]+$/.test(it.id)) errors.push(`id "${it.id}": usa solo minuscole, numeri e trattini`);
    if (!catIds.has(it.category)) errors.push(`prodotto "${it.id}": categoria sconosciuta "${it.category}"`);
    if (!['owned', 'sold', 'incoming'].includes(it.status)) errors.push(`prodotto "${it.id}": status non valido "${it.status}" (owned|sold|incoming)`);
    if (!it.name) errors.push(`prodotto "${it.id}": name mancante`);
    img(it.image, `prodotto "${it.id}"`);
    if (it.placeholder) warnings.push(`prodotto "${it.id}" è ancora un placeholder`);
  }
}
warnings.slice(0, 3).forEach(w => console.log('⚠ ', w));
if (warnings.length > 3) console.log(`⚠  ... e altri ${warnings.length - 3} placeholder`);
if (errors.length) { errors.forEach(e => console.error('✖', e)); process.exit(1); }
console.log(`✔ Dati validi (${eq.length} prodotti, ${cats.length} categorie)`);
