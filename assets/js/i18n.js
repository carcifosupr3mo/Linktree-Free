'use strict';
/* Lingue supportate. Il sito usa la lingua del dispositivo; se non è tra queste usa l'inglese. */
const LANGS = [
  { code: 'it', name: 'Italiano' },
  { code: 'en', name: 'English' },
  { code: 'fr', name: 'Français' },
  { code: 'de', name: 'Deutsch' },
  { code: 'es', name: 'Español' }
];
const DEFAULT_LANG = 'en';

const UI = {
  it: {
    skip: 'Vai al contenuto', nav_gear: 'Attrezzatura', nav_label: 'Navigazione principale',
    theme_dark: 'Passa al tema scuro', theme_light: 'Passa al tema chiaro', theme_title: 'Cambia tema',
    lang_label: 'Lingua', featured: 'Progetto principale', catalog: 'Catalogo',
    gear_title: 'La mia attrezzatura', gear_sub: 'Fotocamere, obiettivi, accessori e attrezzatura video.',
    search_ph: 'Cerca marca, modello, specifiche…', search_label: "Cerca nell'attrezzatura", cat_filter: 'Filtra per categoria',
    all: 'Tutti', count_all: '{n} prodotti', count_some: '{n} di {m} prodotti',
    empty_title: 'Nessun risultato', empty_text: 'Prova con un altro termine o rimuovi i filtri.',
    copy_link: 'Copia il link di {name}', copy_title: 'Copia link', copied: 'Link copiato',
    close_card: 'Chiudi scheda', enlarge: 'Ingrandisci', enlarge_label: 'Ingrandisci immagine di {name}',
    maker_site: 'Sito del produttore', copy_card: 'Copia link scheda', close_image: 'Chiudi immagine', lightbox: 'Immagine ingrandita',
    placeholder: 'Segnaposto', example: 'Esempio', link_group: 'Link', social: 'Social',
    error_title: 'Impossibile caricare i contenuti.', error_hint: 'Se stai aprendo il file direttamente, avvia un server locale (es. python3 -m http.server).',
    doc_title: 'Nathan Pollini · Gear — Attrezzatura fotografica',
    doc_desc: "Photocarcifo, il mio Instagram e l'attrezzatura fotografica e video che uso: fotocamere, obiettivi e accessori."
  },
  en: {
    skip: 'Skip to content', nav_gear: 'Gear', nav_label: 'Main navigation',
    theme_dark: 'Switch to dark theme', theme_light: 'Switch to light theme', theme_title: 'Change theme',
    lang_label: 'Language', featured: 'Main project', catalog: 'Catalog',
    gear_title: 'My gear', gear_sub: 'Cameras, lenses, accessories and video equipment.',
    search_ph: 'Search brand, model, specs…', search_label: 'Search gear', cat_filter: 'Filter by category',
    all: 'All', count_all: '{n} products', count_some: '{n} of {m} products',
    empty_title: 'No results', empty_text: 'Try another term or clear the filters.',
    copy_link: 'Copy link to {name}', copy_title: 'Copy link', copied: 'Link copied',
    close_card: 'Close details', enlarge: 'Enlarge', enlarge_label: 'Enlarge image of {name}',
    maker_site: 'Manufacturer site', copy_card: 'Copy link to this product', close_image: 'Close image', lightbox: 'Enlarged image',
    placeholder: 'Placeholder', example: 'Example', link_group: 'Links', social: 'Social',
    error_title: 'Unable to load the content.', error_hint: 'If you opened the file directly, start a local server (e.g. python3 -m http.server).',
    doc_title: 'Nathan Pollini · Gear — Photography equipment',
    doc_desc: 'Photocarcifo, my Instagram and the photo and video gear I use: cameras, lenses and accessories.'
  },
  fr: {
    skip: 'Aller au contenu', nav_gear: 'Matériel', nav_label: 'Navigation principale',
    theme_dark: 'Passer au thème sombre', theme_light: 'Passer au thème clair', theme_title: 'Changer de thème',
    lang_label: 'Langue', featured: 'Projet principal', catalog: 'Catalogue',
    gear_title: 'Mon matériel', gear_sub: 'Appareils photo, objectifs, accessoires et matériel vidéo.',
    search_ph: 'Rechercher marque, modèle, caractéristiques…', search_label: 'Rechercher dans le matériel', cat_filter: 'Filtrer par catégorie',
    all: 'Tout', count_all: '{n} produits', count_some: '{n} sur {m} produits',
    empty_title: 'Aucun résultat', empty_text: 'Essayez un autre terme ou retirez les filtres.',
    copy_link: 'Copier le lien de {name}', copy_title: 'Copier le lien', copied: 'Lien copié',
    close_card: 'Fermer la fiche', enlarge: 'Agrandir', enlarge_label: "Agrandir l'image de {name}",
    maker_site: 'Site du fabricant', copy_card: 'Copier le lien de la fiche', close_image: "Fermer l'image", lightbox: 'Image agrandie',
    placeholder: 'Exemple', example: 'Exemple', link_group: 'Liens', social: 'Réseaux',
    error_title: 'Impossible de charger le contenu.', error_hint: 'Si vous ouvrez le fichier directement, lancez un serveur local (ex. python3 -m http.server).',
    doc_title: 'Nathan Pollini · Gear — Matériel photo',
    doc_desc: "Photocarcifo, mon Instagram et le matériel photo et vidéo que j'utilise : appareils, objectifs et accessoires."
  },
  de: {
    skip: 'Zum Inhalt springen', nav_gear: 'Ausrüstung', nav_label: 'Hauptnavigation',
    theme_dark: 'Zum dunklen Design wechseln', theme_light: 'Zum hellen Design wechseln', theme_title: 'Design wechseln',
    lang_label: 'Sprache', featured: 'Hauptprojekt', catalog: 'Katalog',
    gear_title: 'Meine Ausrüstung', gear_sub: 'Kameras, Objektive, Zubehör und Videoausrüstung.',
    search_ph: 'Marke, Modell, Daten suchen…', search_label: 'Ausrüstung durchsuchen', cat_filter: 'Nach Kategorie filtern',
    all: 'Alle', count_all: '{n} Produkte', count_some: '{n} von {m} Produkten',
    empty_title: 'Keine Ergebnisse', empty_text: 'Versuche einen anderen Begriff oder entferne die Filter.',
    copy_link: 'Link zu {name} kopieren', copy_title: 'Link kopieren', copied: 'Link kopiert',
    close_card: 'Details schließen', enlarge: 'Vergrößern', enlarge_label: 'Bild von {name} vergrößern',
    maker_site: 'Website des Herstellers', copy_card: 'Link zum Produkt kopieren', close_image: 'Bild schließen', lightbox: 'Vergrößertes Bild',
    placeholder: 'Platzhalter', example: 'Beispiel', link_group: 'Links', social: 'Social',
    error_title: 'Inhalte konnten nicht geladen werden.', error_hint: 'Wenn du die Datei direkt öffnest, starte einen lokalen Server (z. B. python3 -m http.server).',
    doc_title: 'Nathan Pollini · Gear — Fotoausrüstung',
    doc_desc: 'Photocarcifo, mein Instagram und die Foto- und Videoausrüstung, die ich benutze: Kameras, Objektive und Zubehör.'
  },
  es: {
    skip: 'Ir al contenido', nav_gear: 'Equipo', nav_label: 'Navegación principal',
    theme_dark: 'Cambiar al tema oscuro', theme_light: 'Cambiar al tema claro', theme_title: 'Cambiar tema',
    lang_label: 'Idioma', featured: 'Proyecto principal', catalog: 'Catálogo',
    gear_title: 'Mi equipo', gear_sub: 'Cámaras, objetivos, accesorios y equipo de vídeo.',
    search_ph: 'Buscar marca, modelo, características…', search_label: 'Buscar en el equipo', cat_filter: 'Filtrar por categoría',
    all: 'Todo', count_all: '{n} productos', count_some: '{n} de {m} productos',
    empty_title: 'Sin resultados', empty_text: 'Prueba con otro término o quita los filtros.',
    copy_link: 'Copiar el enlace de {name}', copy_title: 'Copiar enlace', copied: 'Enlace copiado',
    close_card: 'Cerrar ficha', enlarge: 'Ampliar', enlarge_label: 'Ampliar imagen de {name}',
    maker_site: 'Sitio del fabricante', copy_card: 'Copiar enlace de la ficha', close_image: 'Cerrar imagen', lightbox: 'Imagen ampliada',
    placeholder: 'Ejemplo', example: 'Ejemplo', link_group: 'Enlaces', social: 'Redes',
    error_title: 'No se pudo cargar el contenido.', error_hint: 'Si abres el archivo directamente, inicia un servidor local (p. ej. python3 -m http.server).',
    doc_title: 'Nathan Pollini · Gear — Equipo fotográfico',
    doc_desc: 'Photocarcifo, mi Instagram y el equipo de foto y vídeo que uso: cámaras, objetivos y accesorios.'
  }
};

/* Etichette delle specifiche: nei JSON si scrivono in italiano, qui vengono tradotte. Quelle sconosciute restano com'è. */
const SPEC_KEYS = {
  'Focale': { en: 'Focal length', fr: 'Focale', de: 'Brennweite', es: 'Distancia focal' },
  'Apertura': { en: 'Aperture', fr: 'Ouverture', de: 'Blende', es: 'Apertura' },
  'Capacità': { en: 'Capacity', fr: 'Capacité', de: 'Kapazität', es: 'Capacidad' },
  'Classe di velocità': { en: 'Speed class', fr: 'Classe de vitesse', de: 'Geschwindigkeitsklasse', es: 'Clase de velocidad' },
  'Lettura / scrittura': { en: 'Read / write', fr: 'Lecture / écriture', de: 'Lesen / Schreiben', es: 'Lectura / escritura' },
  'Diametro': { en: 'Diameter', fr: 'Diamètre', de: 'Durchmesser', es: 'Diámetro' },
  'Gradazione': { en: 'Strength', fr: 'Densité', de: 'Stärke', es: 'Densidad' }
};

/* Scelta lingua: preferenza salvata → lingue del dispositivo → inglese. */
function detectLang() {
  const ok = c => LANGS.some(l => l.code === c);
  try { const s = localStorage.getItem('lang'); if (ok(s)) return s; } catch { /* ignora */ }
  for (const l of (navigator.languages && navigator.languages.length ? navigator.languages : [navigator.language])) {
    const c = String(l || '').toLowerCase().split('-')[0];
    if (ok(c)) return c;
  }
  return DEFAULT_LANG;
}
