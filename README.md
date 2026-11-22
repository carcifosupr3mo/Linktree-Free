# gear.photocarcifo.ch — Personal Gear Hub

Sito statico (HTML + CSS + JavaScript + JSON) in stile Linktree / portfolio / catalogo attrezzatura.
Nessun backend, nessun database, nessun costo. Hosting su GitHub Pages.

## Struttura

```
├── index.html                 # pagina principale (SEO / Open Graph statici)
├── 404.html                   # pagina di errore personalizzata
├── CNAME                      # gear.photocarcifo.ch
├── robots.txt · sitemap.xml
├── data/                      # ← TUTTI i contenuti si modificano qui
│   ├── profile.json           #   nome, descrizione, foto, social header, footer
│   ├── links.json             #   card Photocarcifo + gruppi di link
│   ├── categories.json        #   categorie attrezzatura
│   └── equipment.json         #   prodotti
├── assets/
│   ├── css/style.css · js/app.js
│   └── img/                   #   immagini (profilo, prodotti, favicon, og.png)
├── scripts/
│   ├── validate.mjs           #   controlla i JSON (usato anche dalla CI)
│   └── optimize-images.sh     #   opzionale: ridimensiona/comprime foto (ImageMagick)
├── tests/e2e.cjs              #   test browser (Playwright)
└── .github/workflows/deploy.yml
```

## Anteprima locale

```bash
python3 -m http.server 8080    # poi apri http://localhost:8080
node scripts/validate.mjs      # controlla i JSON
```

(Aprire `index.html` con doppio clic non funziona: il browser blocca `fetch` dei JSON da `file://`.)

## Aggiungere un'attrezzatura

1. Metti la foto in `assets/img/products/` (consigliato: rapporto 4:3, max 1600 px, WebP o JPG; per ottimizzare: `scripts/optimize-images.sh foto.jpg`).
2. Aggiungi un oggetto in `data/equipment.json`:

```json
{
  "id": "sony-a7iv",
  "category": "cameras",
  "name": "Sony A7 IV",
  "brand": "Sony",
  "model": "ILCE-7M4",
  "description": "La mia fotocamera principale.",
  "image": "assets/img/products/sony-a7iv.webp",
  "specs": { "Sensore": "Full frame 33 MP" },
  "status": "owned",
  "url": "https://www.sony.ch/",
  "order": 10
}
```

| Campo | Note |
|---|---|
| `id` | univoco, solo minuscole/numeri/trattini (usato nel link diretto `#p=id`) |
| `category` | un `id` presente in `categories.json` |
| `status` | `owned` (posseduto) · `sold` (venduto) · `incoming` (in arrivo) |
| `order` | numero: più basso = prima, dentro la categoria |
| `url` | sito del produttore, oppure `null` |
| `enabled` | `false` per nascondere senza cancellare |
| `placeholder` | `true` mostra il badge "Placeholder": rimuovilo sui prodotti reali |

**Rimuovere** = cancellare l'oggetto (o `"enabled": false`). **Riordinare** = cambiare `order`.
**Nuova categoria** = aggiungere un oggetto in `categories.json` (`id`, `name`, `icon`, `order`).
Icone disponibili: `camera lens tripod video drone laptop box folder globe mail instagram github link code`.

## Modificare profilo e link

- `data/profile.json`: nome, tagline, bio, avatar, icone social nell'header, footer.
- `data/links.json`: card Photocarcifo (`featured`) e gruppi di card (`groups[].items[]`).
  `icon` può essere un nome icona oppure il percorso di un'immagine. Rimuovi `"placeholder": true` quando il link è reale.

> Titolo, descrizione e anteprime social (Open Graph) sono in `index.html`, perché i social non eseguono JavaScript.

## Pubblicazione

Vedi la guida passo-passo consegnata con il progetto (repo → push → Settings → Pages → DNS → HTTPS).
Il deploy è automatico a ogni push su `main` (`.github/workflows/deploy.yml`, che esegue prima `validate.mjs`).

### DNS

| Tipo | Nome (host) | Valore |
|---|---|---|
| `CNAME` | `gear` | `<tuo-utente-github>.github.io` |

## Test

```bash
npm i playwright && python3 -m http.server 8080 &
node tests/e2e.cjs
```
