const fs = require('fs');
const path = require('path');

const SITE_URL = 'https://kayroxen.github.io';
const SITE_NOM = 'ConvertirFacile';
const AUTEUR = 'Kayroxen';
const EMAIL_CONTACT = 'Karoxen.dev@gmail.com';
const LANGUES = ['fr', 'en'];

// ============================================================
// 1. TRADUCTIONS
// ============================================================

const TRAD = {
  fr: {
    nom: 'Français',
    accueil: 'Accueil',
    rechercher: 'Rechercher…',
    motEn: 'en',
    labelPlus: 'Plus',
    calculateur: 'Calculateur',
    formule: 'Formule',
    tableau: 'Tableau de conversion',
    faq: 'FAQ',
    similaires: 'Conversions similaires',
    resultat: 'Résultat',
    valeur: 'Valeur',
    voirTout: 'Voir tout',
    conversions: 'conversions',
    texteFooter: "Convertisseur d'unités simple et rapide.",
    labelCategories: 'Catégories',
    dernierMaj: 'Dernière mise à jour',
    nav: {
      apropos: 'À propos',
      mentions: 'Mentions légales',
      confidentialite: 'Confidentialité',
      contact: 'Contact',
      quiSommesNous: 'Qui sommes-nous',
    },
    aproposTitre: 'À propos',
    mentionsTitre: 'Mentions légales',
    confidentialiteTitre: 'Politique de confidentialité',
    contactTitre: 'Contact',
    urlApropos: 'a-propos',
    urlMentions: 'mentions-legales',
    urlConfidentialite: 'politique-confidentialite',
    urlContact: 'contact',
    categories: {
      longueur: { nom: 'Longueur', icone: '📏' },
      masse: { nom: 'Masse', icone: '⚖️' },
      volume: { nom: 'Volume', icone: '🧪' },
      surface: { nom: 'Surface', icone: '📐' },
      donnees: { nom: 'Données', icone: '📊' },
      temps: { nom: 'Temps', icone: '⏱️' },
      pression: { nom: 'Pression', icone: '🌬️' },
      energie: { nom: 'Énergie', icone: '🔋' },
      cuisine: { nom: 'Cuisine', icone: '🍳' },
      vitesse: { nom: 'Vitesse', icone: '🚀' },
      debit: { nom: 'Débit', icone: '🔄' },
      puissance: { nom: 'Puissance', icone: '💡' },
      frequence: { nom: 'Fréquence', icone: '📻' },
      angle: { nom: 'Angle', icone: '🎚️' },
      force: { nom: 'Force', icone: '🧲' },
      temperature: { nom: 'Température', icone: '🌡️' },
    },
  },
  en: {
    nom: 'English',
    accueil: 'Home',
    rechercher: 'Search…',
    motEn: 'to',
    labelPlus: 'More',
    calculateur: 'Calculator',
    formule: 'Formula',
    tableau: 'Conversion table',
    faq: 'FAQ',
    similaires: 'Similar conversions',
    resultat: 'Result',
    valeur: 'Value',
    voirTout: 'See all',
    conversions: 'conversions',
    texteFooter: 'Simple and fast unit converter.',
    labelCategories: 'Categories',
    dernierMaj: 'Last updated',
    nav: {
      apropos: 'About',
      mentions: 'Legal',
      confidentialite: 'Privacy',
      contact: 'Contact',
      quiSommesNous: 'About us',
    },
    aproposTitre: 'About',
    mentionsTitre: 'Legal notice',
    confidentialiteTitre: 'Privacy policy',
    contactTitre: 'Contact',
    urlApropos: 'about',
    urlMentions: 'legal',
    urlConfidentialite: 'privacy',
    urlContact: 'contact',
    categories: {
      longueur: { nom: 'Length', icone: '📏' },
      masse: { nom: 'Weight', icone: '⚖️' },
      volume: { nom: 'Volume', icone: '🧪' },
      surface: { nom: 'Area', icone: '📐' },
      donnees: { nom: 'Data', icone: '📊' },
      temps: { nom: 'Time', icone: '⏱️' },
      pression: { nom: 'Pressure', icone: '🌬️' },
      energie: { nom: 'Energy', icone: '🔋' },
      cuisine: { nom: 'Cooking', icone: '🍳' },
      vitesse: { nom: 'Speed', icone: '🚀' },
      debit: { nom: 'Data rate', icone: '🔄' },
      puissance: { nom: 'Power', icone: '💡' },
      frequence: { nom: 'Frequency', icone: '📻' },
      angle: { nom: 'Angle', icone: '🎚️' },
      force: { nom: 'Force', icone: '🧲' },
      temperature: { nom: 'Temperature', icone: '🌡️' },
    },
  },
};

const CAT_SLUGS = {
  longueur:    { fr: 'longueur',    en: 'length' },
  masse:       { fr: 'masse',       en: 'weight' },
  volume:      { fr: 'volume',      en: 'volume' },
  surface:     { fr: 'surface',     en: 'area' },
  donnees:     { fr: 'donnees',     en: 'data' },
  temps:       { fr: 'temps',       en: 'time' },
  pression:    { fr: 'pression',    en: 'pressure' },
  energie:     { fr: 'energie',     en: 'energy' },
  cuisine:     { fr: 'cuisine',     en: 'cooking' },
  vitesse:     { fr: 'vitesse',     en: 'speed' },
  debit:       { fr: 'debit',       en: 'data-rate' },
  puissance:   { fr: 'puissance',   en: 'power' },
  frequence:   { fr: 'frequence',   en: 'frequency' },
  angle:       { fr: 'angle',       en: 'angle' },
  force:       { fr: 'force',       en: 'force' },
  temperature: { fr: 'temperature', en: 'temperature' },
};

const UNITES_TRAD = {
  mm: { frNom: 'mm', enSlug: 'mm', enNom: 'mm' },
  cm: { frNom: 'cm', enSlug: 'cm', enNom: 'cm' },
  dm: { frNom: 'dm', enSlug: 'dm', enNom: 'dm' },
  m: { frNom: 'm', enSlug: 'm', enNom: 'm' },
  dam: { frNom: 'dam', enSlug: 'dam', enNom: 'dam' },
  hm: { frNom: 'hm', enSlug: 'hm', enNom: 'hm' },
  km: { frNom: 'km', enSlug: 'km', enNom: 'km' },
  pouce: { frNom: 'pouces', enSlug: 'inch', enNom: 'inches' },
  pied: { frNom: 'pieds', enSlug: 'foot', enNom: 'feet' },
  yard: { frNom: 'yards', enSlug: 'yard', enNom: 'yards' },
  mile: { frNom: 'miles', enSlug: 'mile', enNom: 'miles' },
  'mile-nautique': { frNom: 'miles nautiques', enSlug: 'nautical-mile', enNom: 'nautical miles' },
  furlong: { frNom: 'furlongs', enSlug: 'furlong', enNom: 'furlongs' },
  brasse: { frNom: 'brasses', enSlug: 'fathom', enNom: 'fathoms' },
  chaine: { frNom: 'chaînes', enSlug: 'chain', enNom: 'chains' },
  perche: { frNom: 'perches', enSlug: 'rod', enNom: 'rods' },
  angstrom: { frNom: 'ångströms', enSlug: 'angstrom', enNom: 'angstroms' },
  micron: { frNom: 'microns', enSlug: 'micron', enNom: 'microns' },
  nanometre: { frNom: 'nanomètres', enSlug: 'nanometer', enNom: 'nanometers' },
  'annee-lumiere': { frNom: 'années-lumière', enSlug: 'light-year', enNom: 'light years' },
  mg: { frNom: 'mg', enSlug: 'mg', enNom: 'mg' },
  cg: { frNom: 'cg', enSlug: 'cg', enNom: 'cg' },
  dg: { frNom: 'dg', enSlug: 'dg', enNom: 'dg' },
  g: { frNom: 'g', enSlug: 'g', enNom: 'g' },
  dag: { frNom: 'dag', enSlug: 'dag', enNom: 'dag' },
  hg: { frNom: 'hg', enSlug: 'hg', enNom: 'hg' },
  kg: { frNom: 'kg', enSlug: 'kg', enNom: 'kg' },
  tonne: { frNom: 'tonnes', enSlug: 'tonne', enNom: 'tonnes' },
  once: { frNom: 'onces', enSlug: 'ounce', enNom: 'ounces' },
  livre: { frNom: 'livres', enSlug: 'pound', enNom: 'pounds' },
  stone: { frNom: 'stones', enSlug: 'stone', enNom: 'stones' },
  carat: { frNom: 'carats', enSlug: 'carat', enNom: 'carats' },
  grain: { frNom: 'grains', enSlug: 'grain', enNom: 'grains' },
  'tonne-courte': { frNom: 'tonnes courtes', enSlug: 'short-ton', enNom: 'short tons' },
  'tonne-longue': { frNom: 'tonnes longues', enSlug: 'long-ton', enNom: 'long tons' },
  ml: { frNom: 'ml', enSlug: 'ml', enNom: 'ml' },
  cl: { frNom: 'cl', enSlug: 'cl', enNom: 'cl' },
  dl: { frNom: 'dl', enSlug: 'dl', enNom: 'dl' },
  l: { frNom: 'litres', enSlug: 'liter', enNom: 'liters' },
  dal: { frNom: 'dal', enSlug: 'dal', enNom: 'dal' },
  hl: { frNom: 'hl', enSlug: 'hl', enNom: 'hl' },
  cm3: { frNom: 'cm³', enSlug: 'cm3', enNom: 'cm³' },
  m3: { frNom: 'm³', enSlug: 'm3', enNom: 'm³' },
  'cuillere-cafe': { frNom: 'cuillères à café', enSlug: 'teaspoon', enNom: 'teaspoons' },
  'cuillere-soupe': { frNom: 'cuillères à soupe', enSlug: 'tablespoon', enNom: 'tablespoons' },
  tasse: { frNom: 'tasses', enSlug: 'cup', enNom: 'cups' },
  verre: { frNom: 'verres', enSlug: 'glass', enNom: 'glasses' },
  'pinte-us': { frNom: 'pintes US', enSlug: 'us-pint', enNom: 'US pints' },
  'pinte-uk': { frNom: 'pintes UK', enSlug: 'uk-pint', enNom: 'UK pints' },
  'gallon-us': { frNom: 'gallons US', enSlug: 'us-gallon', enNom: 'US gallons' },
  'gallon-uk': { frNom: 'gallons UK', enSlug: 'uk-gallon', enNom: 'UK gallons' },
  'once-liquide': { frNom: 'onces liquides', enSlug: 'fluid-ounce', enNom: 'fluid ounces' },
  baril: { frNom: 'barils', enSlug: 'barrel', enNom: 'barrels' },
  'pied-cube': { frNom: 'pieds cubes', enSlug: 'cubic-foot', enNom: 'cubic feet' },
  'pouce-cube': { frNom: 'pouces cubes', enSlug: 'cubic-inch', enNom: 'cubic inches' },
  mm2: { frNom: 'mm²', enSlug: 'mm2', enNom: 'mm²' },
  cm2: { frNom: 'cm²', enSlug: 'cm2', enNom: 'cm²' },
  dm2: { frNom: 'dm²', enSlug: 'dm2', enNom: 'dm²' },
  m2: { frNom: 'm²', enSlug: 'm2', enNom: 'm²' },
  are: { frNom: 'ares', enSlug: 'are', enNom: 'ares' },
  hectare: { frNom: 'hectares', enSlug: 'hectare', enNom: 'hectares' },
  km2: { frNom: 'km²', enSlug: 'km2', enNom: 'km²' },
  pouce2: { frNom: 'pouces²', enSlug: 'square-inch', enNom: 'square inches' },
  pied2: { frNom: 'pieds²', enSlug: 'square-foot', enNom: 'square feet' },
  yard2: { frNom: 'yards²', enSlug: 'square-yard', enNom: 'square yards' },
  acre: { frNom: 'acres', enSlug: 'acre', enNom: 'acres' },
  mile2: { frNom: 'miles²', enSlug: 'square-mile', enNom: 'square miles' },
  centiare: { frNom: 'centiares', enSlug: 'centiare', enNom: 'centiares' },
  perche2: { frNom: 'perches²', enSlug: 'square-rod', enNom: 'square rods' },
  arpent: { frNom: 'arpents', enSlug: 'arpent', enNom: 'arpents' },
  bit: { frNom: 'bits', enSlug: 'bit', enNom: 'bits' },
  octet: { frNom: 'octets', enSlug: 'byte', enNom: 'bytes' },
  ko: { frNom: 'ko', enSlug: 'kb', enNom: 'KB' },
  mo: { frNom: 'Mo', enSlug: 'mb', enNom: 'MB' },
  go: { frNom: 'Go', enSlug: 'gb', enNom: 'GB' },
  to: { frNom: 'To', enSlug: 'tb', enNom: 'TB' },
  po: { frNom: 'Po', enSlug: 'pb', enNom: 'PB' },
  kibioctet: { frNom: 'kibioctets', enSlug: 'kib', enNom: 'KiB' },
  mebioctet: { frNom: 'mébioctets', enSlug: 'mib', enNom: 'MiB' },
  gibioctet: { frNom: 'gibioctets', enSlug: 'gib', enNom: 'GiB' },
  tebioctet: { frNom: 'tébioctets', enSlug: 'tib', enNom: 'TiB' },
  pebioctet: { frNom: 'pébioctets', enSlug: 'pib', enNom: 'PiB' },
  kilobit: { frNom: 'kilobits', enSlug: 'kilobit', enNom: 'kilobits' },
  megabit: { frNom: 'mégabits', enSlug: 'megabit', enNom: 'megabits' },
  milliseconde: { frNom: 'millisecondes', enSlug: 'millisecond', enNom: 'milliseconds' },
  seconde: { frNom: 'secondes', enSlug: 'second', enNom: 'seconds' },
  minute: { frNom: 'minutes', enSlug: 'minute', enNom: 'minutes' },
  heure: { frNom: 'heures', enSlug: 'hour', enNom: 'hours' },
  jour: { frNom: 'jours', enSlug: 'day', enNom: 'days' },
  semaine: { frNom: 'semaines', enSlug: 'week', enNom: 'weeks' },
  mois: { frNom: 'mois', enSlug: 'month', enNom: 'months' },
  trimestre: { frNom: 'trimestres', enSlug: 'quarter', enNom: 'quarters' },
  semestre: { frNom: 'semestres', enSlug: 'semester', enNom: 'semesters' },
  annee: { frNom: 'années', enSlug: 'year', enNom: 'years' },
  decennie: { frNom: 'décennies', enSlug: 'decade', enNom: 'decades' },
  siecle: { frNom: 'siècles', enSlug: 'century', enNom: 'centuries' },
  millenaire: { frNom: 'millénaires', enSlug: 'millennium', enNom: 'millennia' },
  lustre: { frNom: 'lustres', enSlug: 'lustrum', enNom: 'lustra' },
  quinquennat: { frNom: 'quinquennats', enSlug: 'quinquennium', enNom: 'quinquennia' },
  pascal: { frNom: 'pascals', enSlug: 'pascal', enNom: 'pascals' },
  hpa: { frNom: 'hPa', enSlug: 'hpa', enNom: 'hPa' },
  kpa: { frNom: 'kPa', enSlug: 'kpa', enNom: 'kPa' },
  mpa: { frNom: 'MPa', enSlug: 'mpa', enNom: 'MPa' },
  bar: { frNom: 'bars', enSlug: 'bar', enNom: 'bars' },
  mbar: { frNom: 'mbar', enSlug: 'mbar', enNom: 'mbar' },
  atmosphere: { frNom: 'atmosphères', enSlug: 'atmosphere', enNom: 'atmospheres' },
  psi: { frNom: 'psi', enSlug: 'psi', enNom: 'psi' },
  torr: { frNom: 'torrs', enSlug: 'torr', enNom: 'torr' },
  mmhg: { frNom: 'mmHg', enSlug: 'mmhg', enNom: 'mmHg' },
  cmh2o: { frNom: 'cmH₂O', enSlug: 'cmh2o', enNom: 'cmH₂O' },
  'n-m2': { frNom: 'N/m²', enSlug: 'n-m2', enNom: 'N/m²' },
  joule: { frNom: 'joules', enSlug: 'joule', enNom: 'joules' },
  kilojoule: { frNom: 'kilojoules', enSlug: 'kilojoule', enNom: 'kilojoules' },
  calorie: { frNom: 'calories', enSlug: 'calorie', enNom: 'calories' },
  kilocalorie: { frNom: 'kilocalories', enSlug: 'kilocalorie', enNom: 'kilocalories' },
  wh: { frNom: 'Wh', enSlug: 'wh', enNom: 'Wh' },
  kwh: { frNom: 'kWh', enSlug: 'kwh', enNom: 'kWh' },
  btu: { frNom: 'BTU', enSlug: 'btu', enNom: 'BTU' },
  electronvolt: { frNom: 'électronvolts', enSlug: 'electronvolt', enNom: 'electronvolts' },
  erg: { frNom: 'ergs', enSlug: 'erg', enNom: 'ergs' },
  'tonne-tnt': { frNom: 'tonnes TNT', enSlug: 'ton-of-tnt', enNom: 'tons of TNT' },
  ms: { frNom: 'm/s', enSlug: 'mps', enNom: 'm/s' },
  kmh: { frNom: 'km/h', enSlug: 'kph', enNom: 'km/h' },
  mph: { frNom: 'mph', enSlug: 'mph', enNom: 'mph' },
  noeud: { frNom: 'nœuds', enSlug: 'knot', enNom: 'knots' },
  'pied-s': { frNom: 'pieds/s', enSlug: 'fps', enNom: 'ft/s' },
  mach: { frNom: 'Mach', enSlug: 'mach', enNom: 'Mach' },
  'cm-s': { frNom: 'cm/s', enSlug: 'cmps', enNom: 'cm/s' },
  'km-s': { frNom: 'km/s', enSlug: 'kmps', enNom: 'km/s' },
  bps: { frNom: 'bit/s', enSlug: 'bps', enNom: 'bit/s' },
  kbps: { frNom: 'kbit/s', enSlug: 'kbps', enNom: 'kbit/s' },
  mbps: { frNom: 'Mbit/s', enSlug: 'mbps', enNom: 'Mbit/s' },
  gbps: { frNom: 'Gbit/s', enSlug: 'gbps', enNom: 'Gbit/s' },
  tbps: { frNom: 'Tbit/s', enSlug: 'tbps', enNom: 'Tbit/s' },
  'octet-s': { frNom: 'octets/s', enSlug: 'bytes-per-sec', enNom: 'bytes/s' },
  'ko-s': { frNom: 'ko/s', enSlug: 'kbps-byte', enNom: 'KB/s' },
  'mo-s': { frNom: 'Mo/s', enSlug: 'mbps-byte', enNom: 'MB/s' },
  'go-s': { frNom: 'Go/s', enSlug: 'gbps-byte', enNom: 'GB/s' },
  'to-s': { frNom: 'To/s', enSlug: 'tbps-byte', enNom: 'TB/s' },
  watt: { frNom: 'watts', enSlug: 'watt', enNom: 'watts' },
  kilowatt: { frNom: 'kilowatts', enSlug: 'kilowatt', enNom: 'kilowatts' },
  megawatt: { frNom: 'mégawatts', enSlug: 'megawatt', enNom: 'megawatts' },
  gigawatt: { frNom: 'gigawatts', enSlug: 'gigawatt', enNom: 'gigawatts' },
  'cheval-vapeur': { frNom: 'chevaux-vapeur', enSlug: 'horsepower', enNom: 'horsepower' },
  'btu-h': { frNom: 'BTU/h', enSlug: 'btu-h', enNom: 'BTU/h' },
  'calorie-s': { frNom: 'calories/s', enSlug: 'calorie-per-sec', enNom: 'calories/s' },
  'joule-s': { frNom: 'joules/s', enSlug: 'joule-per-sec', enNom: 'joules/s' },
  hertz: { frNom: 'hertz', enSlug: 'hertz', enNom: 'hertz' },
  khz: { frNom: 'kHz', enSlug: 'khz', enNom: 'kHz' },
  mhz: { frNom: 'MHz', enSlug: 'mhz', enNom: 'MHz' },
  ghz: { frNom: 'GHz', enSlug: 'ghz', enNom: 'GHz' },
  thz: { frNom: 'THz', enSlug: 'thz', enNom: 'THz' },
  'tr-min': { frNom: 'tr/min', enSlug: 'rpm', enNom: 'RPM' },
  'tr-s': { frNom: 'tr/s', enSlug: 'rps', enNom: 'RPS' },
  degre: { frNom: 'degrés', enSlug: 'degree', enNom: 'degrees' },
  radian: { frNom: 'radians', enSlug: 'radian', enNom: 'radians' },
  grade: { frNom: 'grades', enSlug: 'gradian', enNom: 'gradians' },
  tour: { frNom: 'tours', enSlug: 'turn', enNom: 'turns' },
  'minute-arc': { frNom: "minutes d'arc", enSlug: 'arcminute', enNom: 'arcminutes' },
  'seconde-arc': { frNom: "secondes d'arc", enSlug: 'arcsecond', enNom: 'arcseconds' },
  newton: { frNom: 'newtons', enSlug: 'newton', enNom: 'newtons' },
  kilonewton: { frNom: 'kilonewtons', enSlug: 'kilonewton', enNom: 'kilonewtons' },
  dyne: { frNom: 'dynes', enSlug: 'dyne', enNom: 'dynes' },
  'livre-force': { frNom: 'livres-force', enSlug: 'pound-force', enNom: 'pounds-force' },
  'kilogramme-force': { frNom: 'kilogrammes-force', enSlug: 'kgf', enNom: 'kgf' },
  'once-force': { frNom: 'onces-force', enSlug: 'ounce-force', enNom: 'ounces-force' },
  celsius: { frNom: 'Celsius', enSlug: 'celsius', enNom: 'Celsius' },
  fahrenheit: { frNom: 'Fahrenheit', enSlug: 'fahrenheit', enNom: 'Fahrenheit' },
  kelvin: { frNom: 'Kelvin', enSlug: 'kelvin', enNom: 'Kelvin' },
  rankine: { frNom: 'Rankine', enSlug: 'rankine', enNom: 'Rankine' },
  reaumur: { frNom: 'Réaumur', enSlug: 'reaumur', enNom: 'Réaumur' },
};

// ============================================================
// CONTENU UNIQUE PAR CATÉGORIE (pour enrichir les pages)
// ============================================================

const CONTENU_CATEGORIES = {

  longueur: {
    fr: {
      intro: "La longueur est l'une des unités les plus utilisées au quotidien. Que vous mesuriez un meuble, calculiez une distance de voyage ou vérifiez les dimensions d'un écran, la conversion entre centimètres, pouces, mètres et pieds est essentielle.",
      utilite: "Utile en bricolage, couture, achat de matériel étranger, lecture de spécifications techniques (téléphones, écrans, outils), ou simplement pour comprendre les dimensions annoncées dans un pays qui utilise un autre système.",
      exemples: [
        "Un smartphone récent fait environ 15 cm de long, soit près de 6 pouces.",
        "Un écran de 55 pouces de diagonale correspond à environ 140 cm.",
        "Un terrain de football mesure entre 90 et 120 mètres de long.",
        "Un mile (1,609 km) est la distance moyenne parcourue à pied en 20 minutes."
      ],
      erreurs: [
        "Ne confondez pas le pouce (inch, 2,54 cm) avec le centimètre : c'est une erreur très fréquente dans le bricolage.",
        "Le pied (foot) ne fait pas 30 cm pile, mais 30,48 cm. Sur 10 pieds, ça fait 4,8 cm de différence.",
        "Les miles nautiques et les miles terrestres sont différents (1852 m contre 1609 m)."
      ],
      astuces: [
        "Pour convertir approximativement des cm en pouces, divisez par 2,5 (1 pouce ≈ 2,54 cm).",
        "Un mètre fait à peu près 3 pieds et 3 pouces (3,28 pieds).",
        "La longueur d'une feuille A4 (29,7 cm) est presque exactement 1 pied."
      ],
      faq: [
        { q: "Quelle est la différence entre un pouce et un centimètre ?", r: "Le centimètre fait partie du système métrique (1 cm = 0,01 m). Le pouce (inch) fait partie du système impérial anglo-saxon (1 pouce = 2,54 cm exactement)." },
        { q: "Pourquoi utilise-t-on encore les pouces ?", r: "Les États-Unis, le Royaume-Uni (pour certaines mesures) et plusieurs pays anglo-saxons utilisent encore le pouce pour les écrans, les tuyaux, les vêtements et la menuiserie." },
        { q: "Combien de pieds dans un mètre ?", r: "1 mètre équivaut à environ 3,28084 pieds. Inversement, 1 pied = 0,3048 mètre exactement." }
      ]
    },
    en: {
      intro: "Length is one of the most commonly used measurements in daily life. Whether you're measuring furniture, calculating travel distances, or checking screen sizes, converting between centimeters, inches, meters, and feet is essential.",
      utilite: "Useful for DIY, sewing, buying foreign equipment, reading technical specs (phones, screens, tools), or simply understanding dimensions advertised in countries using a different system.",
      exemples: [
        "A recent smartphone is about 15 cm long, or nearly 6 inches.",
        "A 55-inch screen diagonal corresponds to about 140 cm.",
        "A football field is between 90 and 120 meters long.",
        "A mile (1.609 km) is the average distance walked in 20 minutes."
      ],
      erreurs: [
        "Don't confuse inches (2.54 cm) with centimeters — a very common DIY mistake.",
        "A foot isn't 30 cm exactly, but 30.48 cm. Over 10 feet, that's a 4.8 cm difference.",
        "Nautical miles and land miles are different (1852 m vs 1609 m)."
      ],
      astuces: [
        "To roughly convert cm to inches, divide by 2.5 (1 inch ≈ 2.54 cm).",
        "One meter is about 3 feet and 3 inches (3.28 feet).",
        "The length of an A4 sheet (29.7 cm) is almost exactly 1 foot."
      ],
      faq: [
        { q: "What's the difference between an inch and a centimeter?", r: "The centimeter is part of the metric system (1 cm = 0.01 m). The inch is part of the Anglo-Saxon imperial system (1 inch = 2.54 cm exactly)." },
        { q: "Why are inches still used?", r: "The United States, the United Kingdom (for some measures), and several Anglo-Saxon countries still use inches for screens, pipes, clothing, and carpentry." },
        { q: "How many feet in a meter?", r: "1 meter equals about 3.28084 feet. Conversely, 1 foot = 0.3048 meter exactly." }
      ]
    }
  },

  masse: {
    fr: {
      intro: "La masse (souvent appelée poids dans le langage courant) est utilisée partout : en cuisine, en sport, en expédition, ou pour comprendre les étiquettes de produits importés.",
      utilite: "Utile pour lire des recettes américaines, comprendre le poids d'un colis à l'étranger, suivre un programme sportif, ou interpréter les données d'une balance étrangère.",
      exemples: [
        "Un être humain adulte pèse en moyenne entre 60 et 80 kg, soit 130 à 175 livres.",
        "Une livre (pound) fait environ 454 grammes, soit un peu moins d'un demi-kilo.",
        "Une once (ounce) fait environ 28 grammes, le poids d'une tranche de pain.",
        "Une stone (14 livres) est utilisée au Royaume-Uni pour le poids corporel."
      ],
      erreurs: [
        "Ne confondez pas le kilogramme (1000 g) avec la livre (453,6 g). Une livre n'est PAS un demi-kilo.",
        "L'once liquide (volume) et l'once solide (masse) sont deux choses différentes.",
        "Le carat (bijoux) n'a rien à voir avec le carat de pureté de l'or."
      ],
      astuces: [
        "Pour convertir rapidement des kg en livres, multipliez par 2 et ajoutez 10%.",
        "1 stone = 6,35 kg, pratique pour le poids corporel au Royaume-Uni.",
        "La tonne métrique (1000 kg) est différente de la tonne courte (907 kg) et de la tonne longue (1016 kg)."
      ],
      faq: [
        { q: "Quelle est la différence entre masse et poids ?", r: "La masse est la quantité de matière (en kg). Le poids est la force exercée par la gravité sur cette masse (en newtons). Dans le langage courant, on confond les deux." },
        { q: "Combien de grammes dans une once ?", r: "1 once (ounce) = 28,3495 grammes exactement. C'est l'unité de base pour les recettes anglo-saxonnes." },
        { q: "Pourquoi le Royaume-Uni utilise-t-il encore les stones ?", r: "La stone (14 livres) reste l'unité traditionnelle pour le poids corporel au Royaume-Uni et en Irlande, même si le kilogramme est officiel." }
      ]
    },
    en: {
      intro: "Mass (often called weight in everyday language) is used everywhere: cooking, sports, shipping, or reading imported product labels.",
      utilite: "Useful for reading American recipes, understanding package weights abroad, following a fitness program, or interpreting foreign scale data.",
      exemples: [
        "An average adult weighs between 60 and 80 kg, or 130 to 175 pounds.",
        "A pound is about 454 grams, slightly less than half a kilo.",
        "An ounce is about 28 grams, the weight of a slice of bread.",
        "A stone (14 pounds) is used in the UK for body weight."
      ],
      erreurs: [
        "Don't confuse kilograms (1000 g) with pounds (453.6 g). A pound is NOT half a kilo.",
        "Fluid ounces (volume) and solid ounces (mass) are two different things.",
        "The carat (jewelry) has nothing to do with gold purity carats."
      ],
      astuces: [
        "To quickly convert kg to pounds, multiply by 2 and add 10%.",
        "1 stone = 6.35 kg, handy for UK body weight.",
        "The metric ton (1000 kg) is different from the short ton (907 kg) and long ton (1016 kg)."
      ],
      faq: [
        { q: "What's the difference between mass and weight?", r: "Mass is the amount of matter (in kg). Weight is the force of gravity on that mass (in newtons). In everyday language, they're often confused." },
        { q: "How many grams in an ounce?", r: "1 ounce = 28.3495 grams exactly. It's the base unit for Anglo-Saxon recipes." },
        { q: "Why does the UK still use stones?", r: "The stone (14 pounds) remains the traditional unit for body weight in the UK and Ireland, even though the kilogram is official." }
      ]
    }
  },

  volume: {
    fr: {
      intro: "Le volume mesure l'espace occupé par un liquide, un gaz ou un solide. C'est une unité quotidienne : recettes, réservoirs, bouteilles, dosages.",
      utilite: "Utile en cuisine (recettes françaises vs américaines), automobile (réservoir, consommation), ou pour comprendre les quantités dans les produits importés.",
      exemples: [
        "Une bouteille de vin standard fait 75 cl, soit 0,75 litre.",
        "Un gallon US fait environ 3,785 litres, un gallon UK fait 4,546 litres.",
        "Une tasse américaine (cup) fait environ 240 ml, soit un peu moins qu'un verre français.",
        "Un baril de pétrole fait exactement 158,987 litres."
      ],
      erreurs: [
        "Le gallon américain et le gallon britannique sont différents (3,78 L vs 4,55 L).",
        "La pinte américaine (473 ml) n'est pas la même que la pinte britannique (568 ml).",
        "La tasse (cup) n'est pas une mesure universelle : elle varie selon les pays."
      ],
      astuces: [
        "Pour convertir des litres en gallons US, multipliez par 0,264.",
        "Une cuillère à soupe = 3 cuillères à café = 15 ml.",
        "Une tasse US standard = 16 cuillères à soupe = 8 onces liquides."
      ],
      faq: [
        { q: "Quelle est la différence entre gallon US et gallon UK ?", r: "Le gallon américain fait 3,785 litres. Le gallon britannique fait 4,546 litres, soit environ 20 % de plus. Cette différence vient de l'histoire des mesures britanniques." },
        { q: "Combien de millilitres dans une cuillère à café ?", r: "1 cuillère à café (teaspoon) = 5 ml. Une cuillère à soupe (tablespoon) = 15 ml. Ces mesures sont standardisées dans les recettes modernes." },
        { q: "Combien de litres dans un mètre cube ?", r: "1 m³ = 1000 litres. C'est utile pour calculer le volume d'une piscine ou d'un réservoir." }
      ]
    },
    en: {
      intro: "Volume measures the space occupied by a liquid, gas, or solid. It's a daily unit: recipes, tanks, bottles, dosages.",
      utilite: "Useful in cooking (French vs American recipes), automotive (fuel tank, consumption), or understanding quantities in imported products.",
      exemples: [
        "A standard wine bottle is 75 cl, or 0.75 liters.",
        "A US gallon is about 3.785 liters, a UK gallon is 4.546 liters.",
        "A US cup is about 240 ml, slightly less than a French glass.",
        "A barrel of oil is exactly 158.987 liters."
      ],
      erreurs: [
        "US and UK gallons are different (3.78 L vs 4.55 L).",
        "The US pint (473 ml) isn't the same as the UK pint (568 ml).",
        "The cup isn't a universal measure — it varies by country."
      ],
      astuces: [
        "To convert liters to US gallons, multiply by 0.264.",
        "One tablespoon = 3 teaspoons = 15 ml.",
        "A standard US cup = 16 tablespoons = 8 fluid ounces."
      ],
      faq: [
        { q: "What's the difference between US and UK gallons?", r: "The US gallon is 3.785 liters. The UK gallon is 4.546 liters, about 20% more. This difference comes from British measurement history." },
        { q: "How many milliliters in a teaspoon?", r: "1 teaspoon = 5 ml. One tablespoon = 15 ml. These measures are standardized in modern recipes." },
        { q: "How many liters in a cubic meter?", r: "1 m³ = 1000 liters. Useful for calculating pool or tank volumes." }
      ]
    }
  },

  surface: {
    fr: {
      intro: "La surface mesure une aire en deux dimensions. Essentielle pour l'immobilier, l'agriculture, le jardinage et la construction.",
      utilite: "Utile pour comprendre la superficie d'un appartement, comparer des terrains, calculer la surface d'un jardin, ou lire des annonces immobilières étrangères.",
      exemples: [
        "Un appartement T3 français fait en moyenne 65 m², soit environ 700 pieds carrés.",
        "Un hectare (10 000 m²) correspond à peu près à un terrain de rugby.",
        "Un acre américain (4046 m²) est presque la moitié d'un hectare.",
        "Un studio parisien de 20 m² fait environ 215 pieds carrés."
      ],
      erreurs: [
        "L'acre (4046 m²) et l'hectare (10 000 m²) sont souvent confondus : l'acre est 2,47 fois plus petit.",
        "Ne confondez pas surface et périmètre : ce sont deux notions différentes.",
        "Le pied carré (sq ft) est utilisé aux USA et UK, mais pas en France."
      ],
      astuces: [
        "Pour estimer une surface en pieds carrés, multipliez les m² par 10,8.",
        "Un terrain de football fait environ 0,7 hectare.",
        "Pour un jardin : 100 m² = environ 1000 pieds carrés."
      ],
      faq: [
        { q: "Quelle est la différence entre m² et pieds carrés ?", r: "Le mètre carré (m²) est l'unité métrique (1 m × 1 m). Le pied carré (sq ft) est l'unité impériale (1 pied × 1 pied), soit environ 0,093 m²." },
        { q: "Combien de m² dans un acre ?", r: "1 acre = 4046,86 m², soit environ 0,4 hectare. C'est l'unité de surface agricole standard aux États-Unis et au Royaume-Uni." },
        { q: "Comment calculer la surface d'une pièce ?", r: "Multipliez la longueur par la largeur. Par exemple, une pièce de 4 m × 5 m = 20 m². Pour les formes irrégulières, divisez en rectangles." }
      ]
    },
    en: {
      intro: "Area measures a two-dimensional surface. Essential for real estate, agriculture, gardening, and construction.",
      utilite: "Useful for understanding apartment size, comparing land, calculating garden area, or reading foreign real estate listings.",
      exemples: [
        "A French 3-room apartment averages 65 m², or about 700 square feet.",
        "A hectare (10,000 m²) is roughly a rugby field.",
        "A US acre (4046 m²) is almost half a hectare.",
        "A 20 m² Paris studio is about 215 square feet."
      ],
      erreurs: [
        "Acres (4046 m²) and hectares (10,000 m²) are often confused: an acre is 2.47 times smaller.",
        "Don't confuse area and perimeter — different concepts.",
        "Square feet is used in the US and UK, but not in France."
      ],
      astuces: [
        "To estimate square feet, multiply m² by 10.8.",
        "A football field is about 0.7 hectares.",
        "For a garden: 100 m² = about 1000 square feet."
      ],
      faq: [
        { q: "What's the difference between m² and square feet?", r: "The square meter (m²) is the metric unit (1 m × 1 m). The square foot (sq ft) is imperial (1 foot × 1 foot), about 0.093 m²." },
        { q: "How many m² in an acre?", r: "1 acre = 4046.86 m², about 0.4 hectare. It's the standard agricultural unit in the US and UK." },
        { q: "How to calculate a room's area?", r: "Multiply length by width. For example, a 4 m × 5 m room = 20 m². For irregular shapes, divide into rectangles." }
      ]
    }
  },

  donnees: {
    fr: {
      intro: "Les unités de données mesurent la quantité d'information numérique. Essentielles pour comprendre la capacité d'un disque dur, la vitesse d'internet ou la taille d'un fichier.",
      utilite: "Utile pour choisir un forfait mobile, comprendre la capacité d'un SSD, estimer le temps de téléchargement, ou comparer les offres cloud.",
      exemples: [
        "Une photo HD pèse entre 2 et 5 Mo.",
        "Une chanson MP3 pèse en moyenne 4 Mo.",
        "Un film en HD pèse entre 4 et 8 Go.",
        "Un SSD de 500 Go peut stocker environ 125 000 photos."
      ],
      erreurs: [
        "Ne confondez pas les préfixes décimaux (ko, Mo, Go) et binaires (kibioctet, mébioctet, gibioctet).",
        "Un kilo-octet (ko) vaut 1000 octets, mais un kibioctet (Kio) vaut 1024 octets.",
        "Les fabricants de disques utilisent le système décimal (1 Go = 1 milliard d'octets), les OS utilisent le binaire."
      ],
      astuces: [
        "8 bits = 1 octet. Une connexion à 100 Mbit/s télécharge à environ 12,5 Mo/s.",
        "Pour estimer le temps de téléchargement : taille (Mo) ÷ débit (Mo/s).",
        "Un Go peut contenir environ 250 chansons ou 500 photos."
      ],
      faq: [
        { q: "Quelle est la différence entre bit et octet ?", r: "1 octet = 8 bits. Les débits internet sont souvent en bits/s, les tailles de fichiers en octets. C'est pour ça qu'un forfait '100 Mb/s' télécharge à ~12,5 Mo/s." },
        { q: "Pourquoi mon disque de 500 Go affiche seulement 465 Go ?", r: "Les fabricants utilisent 1 Go = 1 000 000 000 octets, mais Windows utilise 1 Go = 1 073 741 824 octets. D'où la différence d'affichage." },
        { q: "Combien de photos dans 1 Go ?", r: "Environ 200 à 500 photos selon la qualité. Une photo JPEG de 12 MP pèse entre 2 et 5 Mo." }
      ]
    },
    en: {
      intro: "Data units measure the amount of digital information. Essential for understanding hard drive capacity, internet speed, or file sizes.",
      utilite: "Useful for choosing a mobile plan, understanding SSD capacity, estimating download time, or comparing cloud offers.",
      exemples: [
        "An HD photo weighs between 2 and 5 MB.",
        "An MP3 song averages 4 MB.",
        "An HD movie weighs 4 to 8 GB.",
        "A 500 GB SSD can store about 125,000 photos."
      ],
      erreurs: [
        "Don't confuse decimal prefixes (KB, MB, GB) with binary ones (KiB, MiB, GiB).",
        "A kilobyte (KB) is 1000 bytes, but a kibibyte (KiB) is 1024 bytes.",
        "Drive manufacturers use decimal (1 GB = 1 billion bytes), OSes use binary."
      ],
      astuces: [
        "8 bits = 1 byte. A 100 Mbit/s connection downloads at ~12.5 MB/s.",
        "To estimate download time: size (MB) ÷ speed (MB/s).",
        "1 GB can hold about 250 songs or 500 photos."
      ],
      faq: [
        { q: "What's the difference between bits and bytes?", r: "1 byte = 8 bits. Internet speeds are often in bits/s, file sizes in bytes. That's why a '100 Mb/s' plan downloads at ~12.5 MB/s." },
        { q: "Why does my 500 GB drive show only 465 GB?", r: "Manufacturers use 1 GB = 1,000,000,000 bytes, but Windows uses 1 GB = 1,073,741,824 bytes. Hence the display difference." },
        { q: "How many photos in 1 GB?", r: "About 200 to 500 photos depending on quality. A 12 MP JPEG weighs 2 to 5 MB." }
      ]
    }
  },

  temps: {
    fr: {
      intro: "Le temps est l'une des unités les plus fondamentales. Des millisecondes aux millénaires, chaque échelle a son usage.",
      utilite: "Utile en programmation (millisecondes), en gestion de projet (jours, semaines, trimestres), en histoire (siècles, millénaires), ou pour comprendre des durées de contrats.",
      exemples: [
        "Un clignement d'œil dure environ 300 millisecondes.",
        "Une année fait 365,25 jours (d'où les années bissextiles).",
        "Un quinquennat présidentiel français dure 5 ans.",
        "Un siècle = 100 ans, un millénaire = 1000 ans."
      ],
      erreurs: [
        "Un mois n'a pas une durée fixe : 28, 29, 30 ou 31 jours.",
        "Une année n'est pas exactement 365 jours, mais 365,2422 jours (d'où le calendrier bissextile).",
        "Le trimestre (3 mois) n'a pas de durée fixe non plus en jours."
      ],
      astuces: [
        "1 heure = 3600 secondes, à retenir pour tout calcul.",
        "Pour passer des secondes aux jours : divisez par 86400.",
        "Une décennie = 10 ans, un siècle = 100 ans, un millénaire = 1000 ans."
      ],
      faq: [
        { q: "Combien de secondes dans une journée ?", r: "1 jour = 24 × 60 × 60 = 86 400 secondes. C'est une valeur clé pour tout calcul de durée." },
        { q: "Pourquoi une année fait 365,25 jours ?", r: "La Terre fait le tour du Soleil en 365,2422 jours. Pour compenser, on ajoute un jour tous les 4 ans : le 29 février." },
        { q: "Quelle est la différence entre un lustre et un quinquennat ?", r: "Le lustre dure 5 ans (période romaine), le quinquennat aussi (mandat de 5 ans, notamment en politique française). Les deux valent 5 ans." }
      ]
    },
    en: {
      intro: "Time is one of the most fundamental units. From milliseconds to millennia, each scale has its use.",
      utilite: "Useful in programming (milliseconds), project management (days, weeks, quarters), history (centuries, millennia), or understanding contract durations.",
      exemples: [
        "An eye blink lasts about 300 milliseconds.",
        "A year is 365.25 days (hence leap years).",
        "A French presidential term lasts 5 years.",
        "A century = 100 years, a millennium = 1000 years."
      ],
      erreurs: [
        "A month doesn't have a fixed length: 28, 29, 30, or 31 days.",
        "A year isn't exactly 365 days, but 365.2422 days (hence the leap calendar).",
        "A quarter (3 months) also has no fixed day count."
      ],
      astuces: [
        "1 hour = 3600 seconds, remember for any calculation.",
        "To convert seconds to days: divide by 86400.",
        "A decade = 10 years, a century = 100 years, a millennium = 1000 years."
      ],
      faq: [
        { q: "How many seconds in a day?", r: "1 day = 24 × 60 × 60 = 86,400 seconds. A key value for any duration calculation." },
        { q: "Why is a year 365.25 days?", r: "Earth orbits the Sun in 365.2422 days. To compensate, we add a day every 4 years: February 29." },
        { q: "What's the difference between a lustrum and a quinquennium?", r: "A lustrum lasts 5 years (Roman period), a quinquennium too (5-year term, notably in French politics). Both equal 5 years." }
      ]
    }
  },

  pression: {
    fr: {
      intro: "La pression mesure la force exercée par unité de surface. Cruciale en météorologie, plomberie, mécanique et sport.",
      utilite: "Utile pour comprendre la météo (hPa), gonfler un pneu (psi ou bar), lire un manomètre, ou comprendre les spécifications d'un compresseur.",
      exemples: [
        "La pression atmosphérique standard est de 1013,25 hPa (ou 1 atm).",
        "Un pneu de voiture est gonflé à environ 2,2 bars (32 psi).",
        "Un pneu de vélo de route peut atteindre 8 bars.",
        "Un plongeur subit 1 bar supplémentaire tous les 10 mètres."
      ],
      erreurs: [
        "Ne confondez pas bar et psi : 1 bar ≈ 14,5 psi.",
        "L'atmosphère (atm) n'est pas exactement égale au bar (1 atm = 1,01325 bar).",
        "Le mmHg (millimètre de mercure) est utilisé en médecine pour la tension artérielle, pas le bar."
      ],
      astuces: [
        "Pour convertir bars en psi, multipliez par 14,5.",
        "La pression atmosphérique au niveau de la mer est d'environ 1 bar.",
        "Les pneus de voiture se gonflent entre 2 et 2,5 bars en général."
      ],
      faq: [
        { q: "Quelle est la pression atmosphérique normale ?", r: "La pression atmosphérique standard est de 1013,25 hPa (hectopascals), soit 1013,25 mbar, ou environ 1 atmosphère." },
        { q: "À quelle pression gonfler un pneu de voiture ?", r: "Entre 2 et 2,5 bars (30 à 36 psi) pour une voiture standard. Vérifiez toujours la préconisation du fabricant inscrite sur la portière." },
        { q: "Quelle est la différence entre bar et psi ?", r: "Le bar est l'unité métrique (1 bar = 100 000 Pa). Le psi (pound per square inch) est l'unité impériale (1 psi ≈ 0,069 bar). 1 bar ≈ 14,5 psi." }
      ]
    },
    en: {
      intro: "Pressure measures force per unit area. Crucial in meteorology, plumbing, mechanics, and sports.",
      utilite: "Useful for understanding weather (hPa), inflating tires (psi or bar), reading a gauge, or understanding compressor specs.",
      exemples: [
        "Standard atmospheric pressure is 1013.25 hPa (or 1 atm).",
        "A car tire is inflated to about 2.2 bar (32 psi).",
        "A road bike tire can reach 8 bar.",
        "A diver experiences 1 extra bar every 10 meters."
      ],
      erreurs: [
        "Don't confuse bar and psi: 1 bar ≈ 14.5 psi.",
        "Atmosphere (atm) isn't exactly equal to bar (1 atm = 1.01325 bar).",
        "mmHg (millimeter of mercury) is used in medicine for blood pressure, not bar."
      ],
      astuces: [
        "To convert bars to psi, multiply by 14.5.",
        "Sea-level atmospheric pressure is about 1 bar.",
        "Car tires are usually inflated between 2 and 2.5 bars."
      ],
      faq: [
        { q: "What's normal atmospheric pressure?", r: "Standard atmospheric pressure is 1013.25 hPa (hectopascals), or 1013.25 mbar, or about 1 atmosphere." },
        { q: "At what pressure should I inflate a car tire?", r: "Between 2 and 2.5 bars (30 to 36 psi) for a standard car. Always check the manufacturer's spec on the door jamb." },
        { q: "What's the difference between bar and psi?", r: "Bar is metric (1 bar = 100,000 Pa). Psi (pound per square inch) is imperial (1 psi ≈ 0.069 bar). 1 bar ≈ 14.5 psi." }
      ]
    }
  },

  energie: {
    fr: {
      intro: "L'énergie mesure la capacité à produire un travail. Omniprésente : factures d'électricité, alimentation, chauffage, transports.",
      utilite: "Utile pour comprendre sa facture d'électricité (kWh), calculer ses apports alimentaires (calories), ou comparer des sources d'énergie.",
      exemples: [
        "Un adulte consomme environ 2000 kilocalories par jour (alimentation).",
        "Un radiateur électrique de 1000 W consomme 1 kWh en 1 heure.",
        "1 kWh coûte environ 0,25 € en France (tarif réglementé).",
        "Une ampoule LED de 10 W consomme 0,01 kWh par heure."
      ],
      erreurs: [
        "Ne confondez pas calorie (cal) et kilocalorie (kcal). Une kcal = 1000 cal.",
        "Ce qu'on appelle 'calorie' dans l'alimentation est en réalité une kilocalorie.",
        "Ne confondez pas puissance (W) et énergie (kWh) : la puissance est un débit, l'énergie une quantité."
      ],
      astuces: [
        "Pour calculer la consommation d'un appareil : puissance (W) × heures ÷ 1000 = kWh.",
        "1 kWh = 3,6 millions de joules.",
        "Un Français consomme en moyenne 2200 kWh d'électricité par an (hors chauffage)."
      ],
      faq: [
        { q: "Quelle est la différence entre watt et kilowattheure ?", r: "Le watt (W) mesure la puissance instantanée. Le kilowattheure (kWh) mesure l'énergie consommée sur une durée. Un appareil de 1000 W qui tourne 1 heure consomme 1 kWh." },
        { q: "Combien de calories dans un kilo ?", r: "En nutrition, ce qu'on appelle 'calories' sont des kilocalories. 1 kg de graisse corporelle ≈ 7700 kcal. Un aliment de 100 g peut contenir 50 à 600 kcal selon sa nature." },
        { q: "Combien coûte 1 kWh en France ?", r: "En 2024, le tarif réglementé est d'environ 0,25 € par kWh (tarif bleu EDF). Le prix peut varier selon le fournisseur et l'option tarifaire." }
      ]
    },
    en: {
      intro: "Energy measures the capacity to do work. Omnipresent: electricity bills, food, heating, transportation.",
      utilite: "Useful for understanding your electricity bill (kWh), calculating food intake (calories), or comparing energy sources.",
      exemples: [
        "An adult consumes about 2000 kilocalories per day (food).",
        "A 1000 W electric heater uses 1 kWh in 1 hour.",
        "1 kWh costs about €0.25 in France (regulated rate).",
        "A 10 W LED bulb uses 0.01 kWh per hour."
      ],
      erreurs: [
        "Don't confuse calorie (cal) and kilocalorie (kcal). 1 kcal = 1000 cal.",
        "What we call 'calories' in food is actually kilocalories.",
        "Don't confuse power (W) and energy (kWh): power is a rate, energy a quantity."
      ],
      astuces: [
        "To calculate device consumption: power (W) × hours ÷ 1000 = kWh.",
        "1 kWh = 3.6 million joules.",
        "A French person uses about 2200 kWh of electricity per year (excluding heating)."
      ],
      faq: [
        { q: "What's the difference between watt and kilowatt-hour?", r: "The watt (W) measures instantaneous power. The kilowatt-hour (kWh) measures energy consumed over time. A 1000 W device running for 1 hour uses 1 kWh." },
        { q: "How many calories in a kilo?", r: "In nutrition, 'calories' means kilocalories. 1 kg of body fat ≈ 7700 kcal. A 100 g food can contain 50 to 600 kcal depending on its nature." },
        { q: "How much does 1 kWh cost in France?", r: "In 2024, the regulated rate is about €0.25 per kWh (EDF blue tariff). The price varies by provider and tariff option." }
      ]
    }
  },

  cuisine: {
    fr: {
      intro: "Les mesures de cuisine sont essentielles pour réussir ses recettes. Mais elles varient entre la France, les États-Unis et le Royaume-Uni.",
      utilite: "Utile pour adapter une recette américaine, convertir des cuillères en millilitres, ou comprendre les quantités dans les livres de cuisine étrangers.",
      exemples: [
        "1 cuillère à soupe = 15 ml = 3 cuillères à café.",
        "1 tasse américaine (cup) = 240 ml = 16 cuillères à soupe.",
        "1 verre standard français = 200 ml environ.",
        "1 once liquide US = 29,57 ml."
      ],
      erreurs: [
        "La tasse américaine (240 ml) n'est pas la même que la tasse métrique (250 ml) ni la tasse japonaise (200 ml).",
        "Une cuillère à café rase ≠ une cuillère à café bombée.",
        "Les conversions en grammes dépendent de l'ingrédient : 1 tasse de farine ≠ 1 tasse de sucre."
      ],
      astuces: [
        "Retenez : 1 c. à soupe = 3 c. à café = 15 ml.",
        "Pour les liquides, 1 ml = 1 g (sauf huiles, sirops).",
        "1 cup de farine ≈ 125 g ; 1 cup de sucre ≈ 200 g ; 1 cup de riz ≈ 185 g."
      ],
      faq: [
        { q: "Combien de ml dans une cuillère à soupe ?", r: "1 cuillère à soupe = 15 ml exactement. Une cuillère à café = 5 ml. Ces valeurs sont standardisées dans les recettes modernes." },
        { q: "Quelle est la différence entre cup US et cup UK ?", r: "La cup américaine fait 240 ml. La cup britannique fait 250 ml (métrique) ou 284 ml (impériale). Utilisez la valeur US pour la plupart des recettes en ligne." },
        { q: "Combien de grammes dans une cuillère à soupe ?", r: "Cela dépend de l'ingrédient : 1 c. à soupe de sucre ≈ 12 g, de farine ≈ 8 g, de beurre ≈ 14 g, d'eau = 15 g. Pour les liquides, 1 ml = 1 g." }
      ]
    },
    en: {
      intro: "Cooking measurements are essential for successful recipes. But they vary between France, the US, and the UK.",
      utilite: "Useful for adapting an American recipe, converting spoons to milliliters, or understanding quantities in foreign cookbooks.",
      exemples: [
        "1 tablespoon = 15 ml = 3 teaspoons.",
        "1 US cup = 240 ml = 16 tablespoons.",
        "1 standard French glass = about 200 ml.",
        "1 US fluid ounce = 29.57 ml."
      ],
      erreurs: [
        "The US cup (240 ml) isn't the same as the metric cup (250 ml) or Japanese cup (200 ml).",
        "A level teaspoon ≠ a heaping teaspoon.",
        "Gram conversions depend on the ingredient: 1 cup of flour ≠ 1 cup of sugar."
      ],
      astuces: [
        "Remember: 1 tbsp = 3 tsp = 15 ml.",
        "For liquids, 1 ml = 1 g (except oils, syrups).",
        "1 cup flour ≈ 125 g; 1 cup sugar ≈ 200 g; 1 cup rice ≈ 185 g."
      ],
      faq: [
        { q: "How many ml in a tablespoon?", r: "1 tablespoon = 15 ml exactly. One teaspoon = 5 ml. These values are standardized in modern recipes." },
        { q: "What's the difference between US and UK cups?", r: "The US cup is 240 ml. The UK cup is 250 ml (metric) or 284 ml (imperial). Use the US value for most online recipes." },
        { q: "How many grams in a tablespoon?", r: "It depends on the ingredient: 1 tbsp sugar ≈ 12 g, flour ≈ 8 g, butter ≈ 14 g, water = 15 g. For liquids, 1 ml = 1 g." }
      ]
    }
  },

  vitesse: {
    fr: {
      intro: "La vitesse mesure la distance parcourue par unité de temps. Utilisée partout : voiture, avion, bateau, sport, internet.",
      utilite: "Utile pour comprendre un compteur étranger, suivre un match de sport, calculer un temps de trajet, ou lire des données météo (nœuds).",
      exemples: [
        "Une voiture sur autoroute roule à 130 km/h, soit environ 80 mph.",
        "Un TGV roule à 320 km/h, soit environ 200 mph.",
        "Un avion de ligne vole à 900 km/h, soit environ 0,74 Mach.",
        "Un nœud = 1 mile nautique par heure = 1,852 km/h."
      ],
      erreurs: [
        "Ne confondez pas km/h et mph : 100 mph ≠ 100 km/h (100 mph = 161 km/h).",
        "Le nœud est une unité maritime et aéronautique, pas terrestre.",
        "Mach dépend de l'altitude et de la température : ce n'est pas une vitesse fixe."
      ],
      astuces: [
        "Pour convertir mph en km/h, multipliez par 1,6.",
        "Pour convertir km/h en mph, divisez par 1,6.",
        "Un nœud ≈ 1,852 km/h ≈ 0,514 m/s."
      ],
      faq: [
        { q: "Combien de km/h dans 1 mph ?", r: "1 mph = 1,60934 km/h exactement. Inversement, 1 km/h = 0,621371 mph. Pour un calcul rapide : multipliez les mph par 1,6." },
        { q: "Pourquoi utilise-t-on les nœuds en mer et dans l'air ?", r: "Le nœud est lié au mile nautique, qui correspond à 1 minute d'arc de latitude. C'est pratique pour la navigation car cela simplifie les calculs de position sur une carte marine." },
        { q: "Qu'est-ce que le Mach ?", r: "Le Mach est le rapport entre la vitesse d'un objet et la vitesse du son dans le milieu. Mach 1 = vitesse du son ≈ 340 m/s dans l'air au niveau de la mer. Le Mach dépend de l'altitude et de la température." }
      ]
    },
    en: {
      intro: "Speed measures distance traveled per unit of time. Used everywhere: cars, planes, boats, sports, internet.",
      utilite: "Useful for understanding a foreign speedometer, following a sports match, calculating travel time, or reading weather data (knots).",
      exemples: [
        "A car on the highway drives at 130 km/h, or about 80 mph.",
        "A high-speed train runs at 320 km/h, or about 200 mph.",
        "An airliner flies at 900 km/h, or about Mach 0.74.",
        "A knot = 1 nautical mile per hour = 1.852 km/h."
      ],
      erreurs: [
        "Don't confuse km/h and mph: 100 mph ≠ 100 km/h (100 mph = 161 km/h).",
        "The knot is a maritime and aeronautical unit, not terrestrial.",
        "Mach depends on altitude and temperature: it's not a fixed speed."
      ],
      astuces: [
        "To convert mph to km/h, multiply by 1.6.",
        "To convert km/h to mph, divide by 1.6.",
        "A knot ≈ 1.852 km/h ≈ 0.514 m/s."
      ],
      faq: [
        { q: "How many km/h in 1 mph?", r: "1 mph = 1.60934 km/h exactly. Conversely, 1 km/h = 0.621371 mph. For quick math: multiply mph by 1.6." },
        { q: "Why are knots used at sea and in the air?", r: "The knot is tied to the nautical mile, which corresponds to 1 minute of latitude arc. It simplifies position calculations on a nautical chart." },
        { q: "What is Mach?", r: "Mach is the ratio between an object's speed and the speed of sound in the medium. Mach 1 = speed of sound ≈ 340 m/s in air at sea level. Mach depends on altitude and temperature." }
      ]
    }
  },

  debit: {
    fr: {
      intro: "Le débit mesure la quantité de données transférée par unité de temps. Essentiel pour comprendre sa connexion internet ou son réseau mobile.",
      utilite: "Utile pour choisir un forfait internet, comprendre pourquoi un téléchargement est lent, ou comparer les offres fibre/ADSL/4G/5G.",
      exemples: [
        "Une connexion ADSL fait 8 Mbit/s en moyenne.",
        "Une fibre optique fait entre 100 Mbit/s et 1 Gbit/s.",
        "Une 5G peut atteindre 1 Gbit/s dans de bonnes conditions.",
        "Un film HD de 5 Go se télécharge en 6 minutes à 100 Mbit/s."
      ],
      erreurs: [
        "Ne confondez pas Mbit/s (mégabits par seconde) et Mo/s (mégaoctets par seconde). 1 Mo/s = 8 Mbit/s.",
        "Un forfait '100 mégas' est en Mbit/s, pas en Mo/s. Le débit réel sera d'environ 12,5 Mo/s.",
        "Le débit annoncé est un maximum théorique, rarement atteint en pratique."
      ],
      astuces: [
        "Pour estimer un temps de téléchargement : taille (Mo) ÷ débit (Mo/s) = secondes.",
        "Pour passer de Mbit/s à Mo/s, divisez par 8.",
        "La fibre est le seul moyen d'atteindre 1 Gbit/s de façon fiable."
      ],
      faq: [
        { q: "Quelle est la différence entre Mbit/s et Mo/s ?", r: "Mbit/s = mégabits par seconde (unité de débit réseau). Mo/s = mégaoctets par seconde (unité de débit de fichier). 1 Mo/s = 8 Mbit/s. Les opérateurs utilisent Mbit/s pour paraître plus rapides." },
        { q: "Combien de temps pour télécharger un film en fibre ?", r: "Un film HD de 5 Go se télécharge en environ 6 minutes à 100 Mbit/s, et en 40 secondes à 1 Gbit/s (fibre haut de gamme)." },
        { q: "Quel débit pour la 4K en streaming ?", r: "La 4K nécessite entre 25 et 50 Mbit/s selon la plateforme (Netflix, YouTube). La HD standard demande 5 Mbit/s. La fibre est recommandée pour plusieurs utilisateurs simultanés." }
      ]
    },
    en: {
      intro: "Data rate measures the amount of data transferred per unit of time. Essential for understanding your internet or mobile connection.",
      utilite: "Useful for choosing an internet plan, understanding why a download is slow, or comparing fiber/ADSL/4G/5G offers.",
      exemples: [
        "An ADSL connection averages 8 Mbit/s.",
        "Fiber offers between 100 Mbit/s and 1 Gbit/s.",
        "5G can reach 1 Gbit/s under good conditions.",
        "A 5 GB HD movie downloads in 6 minutes at 100 Mbit/s."
      ],
      erreurs: [
        "Don't confuse Mbit/s (megabits per second) and MB/s (megabytes per second). 1 MB/s = 8 Mbit/s.",
        "A '100 meg' plan is in Mbit/s, not MB/s. Real speed will be ~12.5 MB/s.",
        "Advertised speed is a theoretical maximum, rarely achieved in practice."
      ],
      astuces: [
        "To estimate download time: size (MB) ÷ speed (MB/s) = seconds.",
        "To go from Mbit/s to MB/s, divide by 8.",
        "Fiber is the only way to reliably reach 1 Gbit/s."
      ],
      faq: [
        { q: "What's the difference between Mbit/s and MB/s?", r: "Mbit/s = megabits per second (network rate unit). MB/s = megabytes per second (file transfer unit). 1 MB/s = 8 Mbit/s. ISPs use Mbit/s to look faster." },
        { q: "How long to download a movie on fiber?", r: "A 5 GB HD movie downloads in about 6 minutes at 100 Mbit/s, and in 40 seconds at 1 Gbit/s (high-end fiber)." },
        { q: "What speed for 4K streaming?", r: "4K needs between 25 and 50 Mbit/s depending on the platform (Netflix, YouTube). Standard HD needs 5 Mbit/s. Fiber is recommended for multiple simultaneous users." }
      ]
    }
  },

  puissance: {
    fr: {
      intro: "La puissance mesure l'énergie consommée ou produite par unité de temps. Essentielle pour les appareils électriques, les moteurs, et les systèmes de chauffage.",
      utilite: "Utile pour choisir un radiateur, comparer des aspirateurs, comprendre la puissance d'une voiture, ou vérifier la consommation d'un appareil.",
      exemples: [
        "Une ampoule LED standard fait 10 W.",
        "Un aspirateur fait entre 800 et 2000 W.",
        "Un radiateur électrique fait 1000 à 2000 W.",
        "Une voiture fait entre 90 et 150 chevaux-vapeur (66 à 110 kW)."
      ],
      erreurs: [
        "Ne confondez pas watt (W) et wattheure (Wh) : le premier est une puissance, le second une énergie.",
        "Le cheval-vapeur (ch) n'est pas la même chose que le horsepower (hp) : 1 ch = 0,986 hp.",
        "Un appareil de 2000 W ne consomme pas forcément 2000 W en permanence (thermostat, mode éco)."
      ],
      astuces: [
        "Pour convertir des chevaux-vapeur en kW : multipliez par 0,735.",
        "Un radiateur de 1000 W consomme 1 kWh par heure à pleine puissance.",
        "Pour connaître la consommation d'un appareil : puissance (W) × heures d'usage ÷ 1000 = kWh."
      ],
      faq: [
        { q: "Quelle est la différence entre watt et cheval-vapeur ?", r: "Le watt est l'unité internationale de puissance (1 W = 1 joule par seconde). Le cheval-vapeur (ch) est une ancienne unité (1 ch = 735,5 W environ). Il est encore utilisé pour les voitures." },
        { q: "Combien de watts pour un radiateur ?", r: "Pour une pièce bien isolée, comptez 100 W par m². Une chambre de 15 m² nécessite environ 1500 W. Un salon de 30 m² : 3000 W (souvent réparti sur 2 radiateurs)." },
        { q: "Quelle puissance pour un aspirateur ?", r: "Un aspirateur standard fait entre 800 et 2000 W. La puissance n'est pas le seul critère : l'efficacité dépend aussi de l'aspiration (kPa) et de la conception." }
      ]
    },
    en: {
      intro: "Power measures energy consumed or produced per unit of time. Essential for electrical devices, motors, and heating systems.",
      utilite: "Useful for choosing a heater, comparing vacuum cleaners, understanding a car's power, or checking a device's consumption.",
      exemples: [
        "A standard LED bulb is 10 W.",
        "A vacuum cleaner is between 800 and 2000 W.",
        "An electric heater is 1000 to 2000 W.",
        "A car is between 90 and 150 horsepower (66 to 110 kW)."
      ],
      erreurs: [
        "Don't confuse watt (W) and watt-hour (Wh): the first is power, the second is energy.",
        "Metric horsepower (ch) isn't the same as imperial horsepower (hp): 1 ch = 0.986 hp.",
        "A 2000 W device doesn't always consume 2000 W (thermostat, eco mode)."
      ],
      astuces: [
        "To convert horsepower to kW: multiply by 0.735.",
        "A 1000 W heater consumes 1 kWh per hour at full power.",
        "To know a device's consumption: power (W) × hours used ÷ 1000 = kWh."
      ],
      faq: [
        { q: "What's the difference between watt and horsepower?", r: "The watt is the international unit of power (1 W = 1 joule per second). Horsepower (hp) is an older unit (1 hp = 745.7 W). It's still used for cars." },
        { q: "How many watts for a heater?", r: "For a well-insulated room, count 100 W per m². A 15 m² bedroom needs about 1500 W. A 30 m² living room: 3000 W (often split over 2 heaters)." },
        { q: "What power for a vacuum cleaner?", r: "A standard vacuum is between 800 and 2000 W. Power isn't the only criterion: efficiency also depends on suction (kPa) and design." }
      ]
    }
  },

  frequence: {
    fr: {
      intro: "La fréquence mesure le nombre de répétitions d'un phénomène par unité de temps. Utilisée en électronique, radio, mécanique et informatique.",
      utilite: "Utile pour comprendre un processeur (GHz), un écran (Hz), une radio (MHz), ou un moteur (tr/min).",
      exemples: [
        "Un processeur moderne tourne à 3 à 5 GHz.",
        "Un écran 60 Hz rafraîchit l'image 60 fois par seconde.",
        "Une station FM émet entre 87,5 et 108 MHz.",
        "Un moteur de voiture tourne entre 800 et 7000 tr/min."
      ],
      erreurs: [
        "Ne confondez pas Hz et tr/min : 1 Hz = 60 tr/min.",
        "Un écran 120 Hz n'est pas deux fois plus rapide qu'un 60 Hz, mais plus fluide.",
        "Les GHz d'un processeur ne déterminent pas tout : l'architecture compte aussi."
      ],
      astuces: [
        "Pour convertir des tr/min en Hz : divisez par 60.",
        "Pour convertir des Hz en tr/min : multipliez par 60.",
        "1 kHz = 1000 Hz, 1 MHz = 1 million de Hz, 1 GHz = 1 milliard de Hz."
      ],
      faq: [
        { q: "Quelle est la différence entre Hz et tr/min ?", r: "Le hertz (Hz) mesure les cycles par seconde. Le tr/min (RPM) mesure les tours par minute. 1 Hz = 60 tr/min. Un moteur à 3000 tr/min tourne à 50 Hz." },
        { q: "Pourquoi les écrans gamer ont-ils 144 Hz ?", r: "Un écran 144 Hz affiche 144 images par seconde (au lieu de 60). C'est plus fluide pour les jeux rapides, réduit le flou de mouvement, et améliore la réactivité. Le gain est surtout visible en FPS." },
        { q: "Qu'est-ce que la fréquence d'un processeur ?", r: "C'est le nombre de cycles d'horloge par seconde (en GHz). Un CPU à 3 GHz effectue 3 milliards de cycles par seconde. Mais la performance dépend aussi du nombre de cœurs, de l'architecture et du cache." }
      ]
    },
    en: {
      intro: "Frequency measures the number of repetitions of a phenomenon per unit of time. Used in electronics, radio, mechanics, and computing.",
      utilite: "Useful for understanding a processor (GHz), a screen (Hz), a radio (MHz), or a motor (RPM).",
      exemples: [
        "A modern processor runs at 3 to 5 GHz.",
        "A 60 Hz screen refreshes the image 60 times per second.",
        "An FM station broadcasts between 87.5 and 108 MHz.",
        "A car engine runs between 800 and 7000 RPM."
      ],
      erreurs: [
        "Don't confuse Hz and RPM: 1 Hz = 60 RPM.",
        "A 120 Hz screen isn't twice as fast as a 60 Hz, but smoother.",
        "Processor GHz doesn't determine everything: architecture matters too."
      ],
      astuces: [
        "To convert RPM to Hz: divide by 60.",
        "To convert Hz to RPM: multiply by 60.",
        "1 kHz = 1000 Hz, 1 MHz = 1 million Hz, 1 GHz = 1 billion Hz."
      ],
      faq: [
        { q: "What's the difference between Hz and RPM?", r: "Hertz (Hz) measures cycles per second. RPM measures revolutions per minute. 1 Hz = 60 RPM. A motor at 3000 RPM runs at 50 Hz." },
        { q: "Why do gaming screens have 144 Hz?", r: "A 144 Hz screen displays 144 frames per second (instead of 60). It's smoother for fast games, reduces motion blur, and improves responsiveness. The gain is most visible in FPS games." },
        { q: "What is a processor's frequency?", r: "It's the number of clock cycles per second (in GHz). A 3 GHz CPU performs 3 billion cycles per second. But performance also depends on core count, architecture, and cache." }
      ]
    }
  },

  angle: {
    fr: {
      intro: "L'angle mesure l'ouverture entre deux droites. Essentiel en géométrie, navigation, astronomie, et même en sport.",
      utilite: "Utile en bricolage (coupes), navigation, astronomie, topographie, ou pour comprendre les radians en mathématiques.",
      exemples: [
        "Un angle droit fait 90° ou π/2 radians.",
        "Un tour complet fait 360° ou 2π radians.",
        "La latitude et la longitude s'expriment en degrés.",
        "Un angle de 45° correspond à une pente de 100 %."
      ],
      erreurs: [
        "Ne confondez pas degrés (°) et radians (rad) : 180° = π rad.",
        "Un grade (400 pour un tour complet) n'est ni un degré ni un radian.",
        "Les minutes et secondes d'arc ne sont pas des minutes de temps."
      ],
      astuces: [
        "Pour convertir des degrés en radians : multipliez par π/180.",
        "Pour convertir des radians en degrés : multipliez par 180/π.",
        "Un angle droit = 90° = π/2 rad ≈ 1,5708 rad."
      ],
      faq: [
        { q: "Quelle est la différence entre degrés et radians ?", r: "Le degré divise un cercle en 360 parts. Le radian mesure l'angle par la longueur d'arc sur le cercle unité. Un tour complet = 360° = 2π radians. Les radians sont utilisés en mathématiques et physique." },
        { q: "À quoi sert le grade ?", r: "Le grade divise un tour complet en 400 parts. Il est utilisé en topographie et dans l'armée. 100 grades = 90°. Il est aussi appelé 'grade centésimal'." },
        { q: "Comment convertir des degrés en radians ?", r: "Multipliez par π et divisez par 180. Exemple : 45° = 45 × π/180 = π/4 ≈ 0,7854 rad. À retenir : 180° = π rad, 90° = π/2, 60° = π/3, 45° = π/4." }
      ]
    },
    en: {
      intro: "Angle measures the opening between two lines. Essential in geometry, navigation, astronomy, and even sports.",
      utilite: "Useful for DIY (cuts), navigation, astronomy, surveying, or understanding radians in mathematics.",
      exemples: [
        "A right angle is 90° or π/2 radians.",
        "A full turn is 360° or 2π radians.",
        "Latitude and longitude are expressed in degrees.",
        "A 45° angle corresponds to a 100% slope."
      ],
      erreurs: [
        "Don't confuse degrees (°) and radians (rad): 180° = π rad.",
        "A gradian (400 for a full turn) is neither a degree nor a radian.",
        "Arcminutes and arcseconds aren't minutes of time."
      ],
      astuces: [
        "To convert degrees to radians: multiply by π/180.",
        "To convert radians to degrees: multiply by 180/π.",
        "A right angle = 90° = π/2 rad ≈ 1.5708 rad."
      ],
      faq: [
        { q: "What's the difference between degrees and radians?", r: "The degree divides a circle into 360 parts. The radian measures the angle by arc length on the unit circle. A full turn = 360° = 2π radians. Radians are used in math and physics." },
        { q: "What is the gradian used for?", r: "The gradian divides a full turn into 400 parts. It's used in surveying and the military. 100 gradians = 90°. It's also called a 'centesimal degree'." },
        { q: "How to convert degrees to radians?", r: "Multiply by π and divide by 180. Example: 45° = 45 × π/180 = π/4 ≈ 0.7854 rad. Remember: 180° = π rad, 90° = π/2, 60° = π/3, 45° = π/4." }
      ]
    }
  },

  force: {
    fr: {
      intro: "La force mesure l'action mécanique exercée sur un objet. Essentielle en physique, mécanique et ingénierie.",
      utilite: "Utile pour comprendre les spécifications d'un vérin, la résistance d'un matériau, ou les efforts dans une structure.",
      exemples: [
        "Le poids d'un objet de 1 kg correspond à environ 9,81 newtons.",
        "Un livre-force (lbf) équivaut à environ 4,45 newtons.",
        "Une voiture de 1500 kg exerce 14 700 N sur le sol.",
        "Un vérin hydraulique peut exercer plusieurs tonnes-force."
      ],
      erreurs: [
        "Ne confondez pas masse (kg) et force (N) : elles sont liées mais différentes.",
        "Le kilogramme-force (kgf) est une ancienne unité, mais encore utilisée.",
        "1 kgf = 9,81 N, pas 10 N."
      ],
      astuces: [
        "Pour convertir des kgf en N : multipliez par 9,81.",
        "Le poids d'un objet = masse (kg) × 9,81.",
        "1 newton ≈ 0,102 kgf (approximativement le poids d'une pomme)."
      ],
      faq: [
        { q: "Quelle est la différence entre masse et force ?", r: "La masse (kg) est la quantité de matière. La force (N) est l'action mécanique (poids, poussée, traction). Le poids est une force : P = m × g (avec g ≈ 9,81 m/s² sur Terre)." },
        { q: "Combien de newtons dans un kilogramme-force ?", r: "1 kgf = 9,80665 newtons exactement. Cette valeur vient de l'accélération de la pesanteur sur Terre. En arrondi, on utilise souvent 9,81." },
        { q: "Qu'est-ce qu'une livre-force ?", r: "La livre-force (lbf) est l'unité anglo-saxonne de force. 1 lbf = 4,44822 newtons, soit le poids d'une livre (454 g) sur Terre. Elle est encore utilisée aux États-Unis." }
      ]
    },
    en: {
      intro: "Force measures the mechanical action exerted on an object. Essential in physics, mechanics, and engineering.",
      utilite: "Useful for understanding cylinder specs, material resistance, or structural loads.",
      exemples: [
        "The weight of a 1 kg object is about 9.81 newtons.",
        "A pound-force (lbf) equals about 4.45 newtons.",
        "A 1500 kg car exerts 14,700 N on the ground.",
        "A hydraulic cylinder can exert several tonnes-force."
      ],
      erreurs: [
        "Don't confuse mass (kg) and force (N): they're related but different.",
        "The kilogram-force (kgf) is an older unit, still in use.",
        "1 kgf = 9.81 N, not 10 N."
      ],
      astuces: [
        "To convert kgf to N: multiply by 9.81.",
        "An object's weight = mass (kg) × 9.81.",
        "1 newton ≈ 0.102 kgf (roughly the weight of an apple)."
      ],
      faq: [
        { q: "What's the difference between mass and force?", r: "Mass (kg) is the amount of matter. Force (N) is the mechanical action (weight, thrust, pull). Weight is a force: W = m × g (with g ≈ 9.81 m/s² on Earth)." },
        { q: "How many newtons in a kilogram-force?", r: "1 kgf = 9.80665 newtons exactly. This value comes from Earth's gravitational acceleration. Rounded, we often use 9.81." },
        { q: "What is a pound-force?", r: "The pound-force (lbf) is the Anglo-Saxon unit of force. 1 lbf = 4.44822 newtons, the weight of one pound (454 g) on Earth. It's still used in the US." }
      ]
    }
  },

  temperature: {
    fr: {
      intro: "La température mesure le degré de chaleur ou de froid. C'est probablement l'unité la plus utilisée au quotidien.",
      utilite: "Utile pour la météo, la cuisine, la climatisation, le corps humain, ou pour comprendre les recettes et données scientifiques.",
      exemples: [
        "L'eau gèle à 0 °C (32 °F) et bout à 100 °C (212 °F).",
        "La température corporelle normale est de 37 °C (98,6 °F).",
        "Le zéro absolu est à -273,15 °C (0 Kelvin).",
        "Une journée chaude d'été est à 30 °C (86 °F)."
      ],
      erreurs: [
        "Le Kelvin n'a pas de degré (°) : on dit '300 kelvins', pas '300 degrés Kelvin'.",
        "Attention aux signes négatifs : -40 °C = -40 °F (unique point d'égalité).",
        "Le Rankine et le Réaumur ne sont presque plus utilisés, mais existent encore dans certains domaines."
      ],
      astuces: [
        "Pour convertir approximativement °C en °F : × 2 + 30.",
        "Pour convertir approximativement °F en °C : (- 30) ÷ 2.",
        "-40 °C = -40 °F : un repère facile à retenir."
      ],
      faq: [
        { q: "Quelle est la formule pour convertir Celsius en Fahrenheit ?", r: "°F = (°C × 9/5) + 32. Exemple : 20 °C = (20 × 9/5) + 32 = 36 + 32 = 68 °F. La formule inverse : °C = (°F - 32) × 5/9." },
        { q: "Qu'est-ce que le zéro absolu ?", r: "Le zéro absolu est la température la plus basse possible : -273,15 °C ou 0 Kelvin. À cette température, les molécules n'ont plus d'énergie thermique. C'est un concept théorique." },
        { q: "Pourquoi les États-Unis utilisent-ils Fahrenheit ?", r: "Le Fahrenheit a été inventé par Daniel Gabriel Fahrenheit en 1724. Les États-Unis l'ont adopté avant la généralisation du système métrique et ne l'ont jamais abandonné. Quelques autres pays l'utilisent aussi (Bahamas, Belize, îles Caïmans)." }
      ]
    },
    en: {
      intro: "Temperature measures the degree of heat or cold. It's probably the most used unit in daily life.",
      utilite: "Useful for weather, cooking, air conditioning, body temperature, or understanding recipes and scientific data.",
      exemples: [
        "Water freezes at 0 °C (32 °F) and boils at 100 °C (212 °F).",
        "Normal body temperature is 37 °C (98.6 °F).",
        "Absolute zero is at -273.15 °C (0 Kelvin).",
        "A hot summer day is 30 °C (86 °F)."
      ],
      erreurs: [
        "Kelvin has no degree (°) symbol: say '300 kelvins', not '300 degrees Kelvin'.",
        "Watch for negative signs: -40 °C = -40 °F (unique equality point).",
        "Rankine and Réaumur are barely used anymore, but still exist in some fields."
      ],
      astuces: [
        "To roughly convert °C to °F: × 2 + 30.",
        "To roughly convert °F to °C: (- 30) ÷ 2.",
        "-40 °C = -40 °F: an easy reference to remember."
      ],
      faq: [
        { q: "What's the formula to convert Celsius to Fahrenheit?", r: "°F = (°C × 9/5) + 32. Example: 20 °C = (20 × 9/5) + 32 = 36 + 32 = 68 °F. The reverse formula: °C = (°F - 32) × 5/9." },
        { q: "What is absolute zero?", r: "Absolute zero is the lowest possible temperature: -273.15 °C or 0 Kelvin. At this temperature, molecules have no thermal energy left. It's a theoretical concept." },
        { q: "Why does the US use Fahrenheit?", r: "Fahrenheit was invented by Daniel Gabriel Fahrenheit in 1724. The US adopted it before the metric system spread and never abandoned it. A few other countries use it too (Bahamas, Belize, Cayman Islands)." }
      ]
    }
  }

};

// ============================================================
// 2. DONNÉES
// ============================================================

const categories = {
  longueur: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'mm', f: 0.001 }, { slug: 'cm', f: 0.01 }, { slug: 'dm', f: 0.1 },
      { slug: 'm', f: 1 }, { slug: 'dam', f: 10 }, { slug: 'hm', f: 100 }, { slug: 'km', f: 1000 },
      { slug: 'pouce', f: 0.0254 }, { slug: 'pied', f: 0.3048 }, { slug: 'yard', f: 0.9144 },
      { slug: 'mile', f: 1609.344 }, { slug: 'mile-nautique', f: 1852 },
      { slug: 'furlong', f: 201.168 }, { slug: 'brasse', f: 1.8288 }, { slug: 'chaine', f: 20.1168 },
      { slug: 'perche', f: 5.0292 }, { slug: 'angstrom', f: 1e-10 },
      { slug: 'micron', f: 1e-6 }, { slug: 'nanometre', f: 1e-9 }, { slug: 'annee-lumiere', f: 9.461e15 },
    ],
  },
  masse: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'mg', f: 0.001 }, { slug: 'cg', f: 0.01 }, { slug: 'dg', f: 0.1 },
      { slug: 'g', f: 1 }, { slug: 'dag', f: 10 }, { slug: 'hg', f: 100 }, { slug: 'kg', f: 1000 },
      { slug: 'tonne', f: 1000000 }, { slug: 'once', f: 28.3495 }, { slug: 'livre', f: 453.592 },
      { slug: 'stone', f: 6350.29 }, { slug: 'carat', f: 0.2 }, { slug: 'grain', f: 0.0647989 },
      { slug: 'tonne-courte', f: 907185 }, { slug: 'tonne-longue', f: 1016047 },
    ],
  },
  volume: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'ml', f: 0.001 }, { slug: 'cl', f: 0.01 }, { slug: 'dl', f: 0.1 },
      { slug: 'l', f: 1 }, { slug: 'dal', f: 10 }, { slug: 'hl', f: 100 },
      { slug: 'cm3', f: 0.001 }, { slug: 'm3', f: 1000 },
      { slug: 'cuillere-cafe', f: 0.005 }, { slug: 'cuillere-soupe', f: 0.015 },
      { slug: 'tasse', f: 0.24 }, { slug: 'verre', f: 0.2 },
      { slug: 'pinte-us', f: 0.473176 }, { slug: 'pinte-uk', f: 0.568261 },
      { slug: 'gallon-us', f: 3.78541 }, { slug: 'gallon-uk', f: 4.54609 },
      { slug: 'once-liquide', f: 0.0295735 }, { slug: 'baril', f: 158.987 },
      { slug: 'pied-cube', f: 28.3168 }, { slug: 'pouce-cube', f: 0.0163871 },
    ],
  },
  surface: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'mm2', f: 1e-6 }, { slug: 'cm2', f: 1e-4 }, { slug: 'dm2', f: 0.01 },
      { slug: 'm2', f: 1 }, { slug: 'are', f: 100 }, { slug: 'hectare', f: 10000 },
      { slug: 'km2', f: 1e6 }, { slug: 'pouce2', f: 0.00064516 },
      { slug: 'pied2', f: 0.092903 }, { slug: 'yard2', f: 0.836127 },
      { slug: 'acre', f: 4046.86 }, { slug: 'mile2', f: 2589988 },
      { slug: 'centiare', f: 1 }, { slug: 'perche2', f: 25.2929 }, { slug: 'arpent', f: 3418.89 },
    ],
  },
  donnees: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'bit', f: 0.125 }, { slug: 'octet', f: 1 }, { slug: 'ko', f: 1000 },
      { slug: 'mo', f: 1e6 }, { slug: 'go', f: 1e9 }, { slug: 'to', f: 1e12 }, { slug: 'po', f: 1e15 },
      { slug: 'kibioctet', f: 1024 }, { slug: 'mebioctet', f: 1048576 },
      { slug: 'gibioctet', f: 1073741824 }, { slug: 'tebioctet', f: 1.0995e12 },
      { slug: 'pebioctet', f: 1.1259e15 }, { slug: 'kilobit', f: 125 }, { slug: 'megabit', f: 125000 },
    ],
  },
  temps: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'milliseconde', f: 0.001 }, { slug: 'seconde', f: 1 }, { slug: 'minute', f: 60 },
      { slug: 'heure', f: 3600 }, { slug: 'jour', f: 86400 }, { slug: 'semaine', f: 604800 },
      { slug: 'mois', f: 2629800 }, { slug: 'trimestre', f: 7889400 },
      { slug: 'semestre', f: 15778800 }, { slug: 'annee', f: 31557600 },
      { slug: 'decennie', f: 315576000 }, { slug: 'siecle', f: 3155760000 },
      { slug: 'millenaire', f: 31557600000 }, { slug: 'lustre', f: 157788000 },
      { slug: 'quinquennat', f: 157788000 },
    ],
  },
  pression: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'pascal', f: 1 }, { slug: 'hpa', f: 100 }, { slug: 'kpa', f: 1000 },
      { slug: 'mpa', f: 1e6 }, { slug: 'bar', f: 100000 }, { slug: 'mbar', f: 100 },
      { slug: 'atmosphere', f: 101325 }, { slug: 'psi', f: 6894.76 }, { slug: 'torr', f: 133.322 },
      { slug: 'mmhg', f: 133.322 }, { slug: 'cmh2o', f: 98.0665 }, { slug: 'n-m2', f: 1 },
    ],
  },
  energie: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'joule', f: 1 }, { slug: 'kilojoule', f: 1000 }, { slug: 'calorie', f: 4.184 },
      { slug: 'kilocalorie', f: 4184 }, { slug: 'wh', f: 3600 }, { slug: 'kwh', f: 3600000 },
      { slug: 'btu', f: 1055.06 }, { slug: 'electronvolt', f: 1.60218e-19 },
      { slug: 'erg', f: 1e-7 }, { slug: 'tonne-tnt', f: 4.184e9 },
    ],
  },
  cuisine: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'cuillere-cafe', f: 5 }, { slug: 'cuillere-soupe', f: 15 },
      { slug: 'tasse', f: 240 }, { slug: 'verre', f: 200 }, { slug: 'ml', f: 1 },
      { slug: 'cl', f: 10 }, { slug: 'dl', f: 100 }, { slug: 'l', f: 1000 },
      { slug: 'pinte-us', f: 473 }, { slug: 'once-liquide', f: 29.57 },
    ],
  },
  vitesse: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'ms', f: 1 }, { slug: 'kmh', f: 0.277778 }, { slug: 'mph', f: 0.44704 },
      { slug: 'noeud', f: 0.514444 }, { slug: 'pied-s', f: 0.3048 }, { slug: 'mach', f: 340.29 },
      { slug: 'cm-s', f: 0.01 }, { slug: 'km-s', f: 1000 },
    ],
  },
  debit: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'bps', f: 1 }, { slug: 'kbps', f: 1000 }, { slug: 'mbps', f: 1e6 },
      { slug: 'gbps', f: 1e9 }, { slug: 'tbps', f: 1e12 }, { slug: 'octet-s', f: 8 },
      { slug: 'ko-s', f: 8000 }, { slug: 'mo-s', f: 8e6 }, { slug: 'go-s', f: 8e9 }, { slug: 'to-s', f: 8e12 },
    ],
  },
  puissance: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'watt', f: 1 }, { slug: 'kilowatt', f: 1000 }, { slug: 'megawatt', f: 1e6 },
      { slug: 'gigawatt', f: 1e9 }, { slug: 'cheval-vapeur', f: 735.499 },
      { slug: 'btu-h', f: 0.293071 }, { slug: 'calorie-s', f: 4.184 }, { slug: 'joule-s', f: 1 },
    ],
  },
  frequence: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'hertz', f: 1 }, { slug: 'khz', f: 1000 }, { slug: 'mhz', f: 1e6 },
      { slug: 'ghz', f: 1e9 }, { slug: 'thz', f: 1e12 }, { slug: 'tr-min', f: 1/60 }, { slug: 'tr-s', f: 1 },
    ],
  },
  angle: {
    valeurs: [1, 2, 5, 10, 20, 45, 90, 180, 270, 360],
    unites: [
      { slug: 'degre', f: Math.PI/180 }, { slug: 'radian', f: 1 }, { slug: 'grade', f: Math.PI/200 },
      { slug: 'tour', f: 2*Math.PI }, { slug: 'minute-arc', f: Math.PI/(180*60) },
      { slug: 'seconde-arc', f: Math.PI/(180*3600) },
    ],
  },
  force: {
    valeurs: [1, 2, 5, 10, 20, 50, 100, 200, 500, 1000],
    unites: [
      { slug: 'newton', f: 1 }, { slug: 'kilonewton', f: 1000 }, { slug: 'dyne', f: 1e-5 },
      { slug: 'livre-force', f: 4.44822 }, { slug: 'kilogramme-force', f: 9.80665 },
      { slug: 'once-force', f: 0.278014 },
    ],
  },
  temperature: {
    special: true,
    valeurs: [-40, -10, 0, 10, 20, 30, 37, 50, 100, 200],
    unites: [
      { slug: 'celsius',    toRef: v => v,             fromRef: v => v },
      { slug: 'fahrenheit', toRef: v => (v - 32) * 5/9, fromRef: v => v * 9/5 + 32 },
      { slug: 'kelvin',     toRef: v => v - 273.15,     fromRef: v => v + 273.15 },
      { slug: 'rankine',    toRef: v => v * 5/9 - 273.15, fromRef: v => (v + 273.15) * 9/5 },
      { slug: 'reaumur',    toRef: v => v * 1.25,       fromRef: v => v * 0.8 },
    ],
  },
};

// ============================================================
// 3. HELPERS
// ============================================================

function arrondir(n) {
  if (!isFinite(n)) return 0;
  if (Math.abs(n) < 1e-6 || Math.abs(n) > 1e15) return n.toExponential(4);
  return Math.round(n * 10000) / 10000;
}

function esc(s) {
  return String(s)
    .replace(/&/g, '&amp;').replace(/</g, '&lt;')
    .replace(/>/g, '&gt;').replace(/"/g, '&quot;');
}

function calculer(cat, de, vers, v) {
  if (cat.special) return vers.fromRef(de.toRef(v));
  return v * de.f / vers.f;
}

function nomUnite(slug, lang) {
  const u = UNITES_TRAD[slug];
  if (!u) return slug;
  return lang === 'fr' ? u.frNom : u.enNom;
}

function slugUnite(slug, lang) {
  const u = UNITES_TRAD[slug];
  if (!u) return slug;
  return lang === 'fr' ? slug : u.enSlug;
}

function remplacerVars(html, vars) {
  let out = html;
  for (const [cle, valeur] of Object.entries(vars)) {
    const re = new RegExp('\\{\\{\\s*' + cle + '\\s*\\}\\}', 'g');
    out = out.replace(re, () => valeur);
  }
  return out;
}

// ============================================================
// 4. PARTIALS
// ============================================================

const HEADER_PARTIAL = fs.readFileSync(path.join('src', 'partials', 'header.html'), 'utf8');
const FOOTER_PARTIAL = fs.readFileSync(path.join('src', 'partials', 'footer.html'), 'utf8');

function construireHeader(lang) {
  const trad = TRAD[lang];
  const catPrincipales = ['longueur', 'masse', 'volume', 'temperature', 'surface', 'vitesse'];

  const menuMain = catPrincipales.map(k => {
    const s = CAT_SLUGS[k][lang];
    const c = trad.categories[k];
    return `<a href="/${lang}/${s}/">${c.icone} ${c.nom}</a>`;
  }).join('\n      ');

  const menuPlus = Object.entries(CAT_SLUGS)
    .filter(([k]) => !catPrincipales.includes(k))
    .map(([k, slugs]) => {
      const c = trad.categories[k];
      return `<a href="/${lang}/${slugs[lang]}/">${c.icone} ${c.nom}</a>`;
    }).join('\n          ');

  const autreLang = lang === 'fr' ? 'en' : 'fr';

  return remplacerVars(HEADER_PARTIAL, {
    LANG: lang,
    SITE_NOM: SITE_NOM,
    MENU_MAIN: menuMain,
    MENU_PLUS: menuPlus,
    LABEL_PLUS: trad.labelPlus,
    RECHERCHE_PLACEHOLDER: trad.rechercher,
    LANG_SWITCH_URL: `/${autreLang}/`,
    LANG_SWITCH_LABEL: autreLang.toUpperCase(),
    LANG_SWITCH_TITRE: TRAD[autreLang].nom,
  });
}

function construireFooter(lang) {
  const trad = TRAD[lang];

  const menuFooter = Object.entries(CAT_SLUGS)
    .map(([k, slugs]) => `<a href="/${lang}/${slugs[lang]}/">${trad.categories[k].nom}</a>`)
    .join('\n        ');

  return remplacerVars(FOOTER_PARTIAL, {
    SITE_NOM: SITE_NOM,
    ANNEE: new Date().getFullYear(),
    TEXTE_FOOTER: trad.texteFooter,
    LABEL_CATEGORIES: trad.labelCategories,
    MENU_FOOTER: menuFooter,
    LABEL_APROPOS: trad.nav.apropos,
    LABEL_QUI_SOMMES_NOUS: trad.nav.quiSommesNous,
    LABEL_MENTIONS: trad.nav.mentions,
    LABEL_CONFIDENTIALITE: trad.nav.confidentialite,
    LABEL_CONTACT: trad.nav.contact,
    URL_APROPOS: `/${lang}/${trad.urlApropos}.html`,
    URL_MENTIONS: `/${lang}/${trad.urlMentions}.html`,
    URL_CONFIDENTIALITE: `/${lang}/${trad.urlConfidentialite}.html`,
    URL_CONTACT: `/${lang}/${trad.urlContact}.html`,
  });
}

// ============================================================
// 5. GÉNÉRATION DES CONVERSIONS
// ============================================================

const conversionsParLangue = { fr: [], en: [] };

for (const lang of LANGUES) {
  const trad = TRAD[lang];
  for (const [catKey, cat] of Object.entries(categories)) {
    const catSlug = CAT_SLUGS[catKey][lang];
    const catNom = trad.categories[catKey].nom;
    const catIcone = trad.categories[catKey].icone;

    for (const de of cat.unites) {
      for (const vers of cat.unites) {
        if (de.slug === vers.slug) continue;
        for (const valeur of cat.valeurs) {
          const resultat = arrondir(calculer(cat, de, vers, valeur));
          const deNom = nomUnite(de.slug, lang);
          const versNom = nomUnite(vers.slug, lang);
          const deSlug = slugUnite(de.slug, lang);
          const versSlug = slugUnite(vers.slug, lang);
          const motEn = trad.motEn;
          const slugFinal = `${valeur}-${deSlug}-${motEn}-${versSlug}`;

          conversionsParLangue[lang].push({
            lang,
            categorie: catKey,
            categorieSlug: catSlug,
            categorieNom: catNom,
            categorieIcone: catIcone,
            valeur,
            de: { slug: de.slug, slugAffichage: deSlug, nom: deNom, f: de.f, toRef: de.toRef, fromRef: de.fromRef },
            vers: { slug: vers.slug, slugAffichage: versSlug, nom: versNom, f: vers.f, toRef: vers.toRef, fromRef: vers.fromRef },
            resultat,
            slug: slugFinal,
          });
        }
      }
    }
  }
}

// ============================================================
// 6. FAVICON
// ============================================================

const FAVICON_SVG = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 64 64">
  <rect width="64" height="64" rx="12" fill="#2563eb"/>
  <text x="32" y="44" font-family="system-ui, sans-serif" font-size="36" font-weight="700" fill="#fff" text-anchor="middle">C</text>
</svg>`;

// ============================================================
// 7. HEAD COMMUN (SEO COMPLET)
// ============================================================

function headCommun(lang, titre, description, urlPage, urlAlt, jsonLD) {
  const ogLocale = lang === 'fr' ? 'fr_FR' : 'en_US';

  return `<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<meta name="theme-color" content="#2563eb">
<meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">
<meta name="author" content="${AUTEUR}">
<title>${esc(titre)}</title>
<meta name="description" content="${esc(description)}">
<link rel="canonical" href="${urlPage}">
<link rel="alternate" hreflang="${lang}" href="${urlPage}">
<link rel="alternate" hreflang="${lang === 'fr' ? 'en' : 'fr'}" href="${urlAlt}">
<link rel="alternate" hreflang="x-default" href="${urlPage}">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/style.css">

<meta property="og:type" content="website">
<meta property="og:site_name" content="${SITE_NOM}">
<meta property="og:locale" content="${ogLocale}">
<meta property="og:title" content="${esc(titre)}">
<meta property="og:description" content="${esc(description)}">
<meta property="og:url" content="${urlPage}">
<meta property="og:image" content="${SITE_URL}/og-image.png">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">

<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="${esc(titre)}">
<meta name="twitter:description" content="${esc(description)}">
<meta name="twitter:image" content="${SITE_URL}/og-image.png">
${jsonLD || ''}`;
}

// ============================================================
// 8. PAGE DE CONVERSION
// ============================================================

function pageConversion(c, toutes) {
  const trad = TRAD[c.lang];
  const motEn = trad.motEn;
  const titre = `${c.valeur} ${c.de.nom} ${motEn} ${c.vers.nom}`;
  const description = c.lang === 'fr'
    ? `Convertissez ${c.valeur} ${c.de.nom} en ${c.vers.nom}. Résultat : ${c.resultat} ${c.vers.nom}. Calculateur, formule, tableau et exemples.`
    : `Convert ${c.valeur} ${c.de.nom} to ${c.vers.nom}. Result: ${c.resultat} ${c.vers.nom}. Calculator, formula, table and examples.`;
  const urlPage = `${SITE_URL}/${c.lang}/${c.categorieSlug}/${c.slug}.html`;

  const autreLang = c.lang === 'fr' ? 'en' : 'fr';
  const equivalent = toutes.find(x =>
    x.lang === autreLang &&
    x.categorie === c.categorie &&
    x.valeur === c.valeur &&
    x.de.slug === c.de.slug &&
    x.vers.slug === c.vers.slug
  );
  const urlAlt = equivalent
    ? `${SITE_URL}/${equivalent.lang}/${equivalent.categorieSlug}/${equivalent.slug}.html`
    : `${SITE_URL}/${autreLang}/`;

  const proches = toutes
    .filter(x => x.lang === c.lang && x.categorie === c.categorie && x.slug !== c.slug)
    .slice(0, 10);

  const liensProches = proches
    .map(p => `<li><a href="/${p.lang}/${p.categorieSlug}/${p.slug}.html">${p.valeur} ${p.de.nom} ${motEn} ${p.vers.nom}</a></li>`)
    .join('\n');

  const cat = categories[c.categorie];
  let lignes = '';
  for (const v of cat.valeurs) {
    const r = arrondir(calculer(cat, c.de, c.vers, v));
    lignes += `<tr><td>${v} ${c.de.nom}</td><td>${r} ${c.vers.nom}</td></tr>\n`;
  }

  // Contenu unique par catégorie
  const contenu = CONTENU_CATEGORIES[c.categorie] ? CONTENU_CATEGORIES[c.categorie][c.lang] : null;

  let sectionIntro = '';
  let sectionUtilite = '';
  let sectionExemples = '';
  let sectionErreurs = '';
  let sectionAstuces = '';
  let faqSupplementaires = '';

  if (contenu) {
    sectionIntro = `
    <section>
      <h2>${c.lang === 'fr' ? 'À propos de cette conversion' : 'About this conversion'}</h2>
      <p>${contenu.intro}</p>
    </section>`;

    sectionUtilite = `
    <section>
      <h2>${c.lang === 'fr' ? 'À quoi ça sert ?' : 'What is it used for?'}</h2>
      <p>${contenu.utilite}</p>
    </section>`;

    const exemplesLi = contenu.exemples.map(e => `<li>${e}</li>`).join('');
    sectionExemples = `
    <section>
      <h2>${c.lang === 'fr' ? 'Exemples concrets' : 'Concrete examples'}</h2>
      <ul>${exemplesLi}</ul>
    </section>`;

    const erreursLi = contenu.erreurs.map(e => `<li>${e}</li>`).join('');
    sectionErreurs = `
    <section>
      <h2>${c.lang === 'fr' ? 'Erreurs courantes à éviter' : 'Common mistakes to avoid'}</h2>
      <ul>${erreursLi}</ul>
    </section>`;

    const astucesLi = contenu.astuces.map(a => `<li>${a}</li>`).join('');
    sectionAstuces = `
    <section>
      <h2>${c.lang === 'fr' ? 'Astuces pratiques' : 'Practical tips'}</h2>
      <ul>${astucesLi}</ul>
    </section>`;

    faqSupplementaires = contenu.faq.map(f =>
      `<p><strong>${f.q}</strong><br>${f.r}</p>`
    ).join('\n');
  }

  const faqJSON = JSON.stringify({
    "@context": "https://schema.org", "@type": "FAQPage",
    "mainEntity": [
      { "@type": "Question",
        "name": c.lang === 'fr' ? `Combien font ${c.valeur} ${c.de.nom} en ${c.vers.nom} ?` : `How many ${c.vers.nom} in ${c.valeur} ${c.de.nom}?`,
        "acceptedAnswer": { "@type": "Answer", "text": c.lang === 'fr'
          ? `${c.valeur} ${c.de.nom} équivaut à ${c.resultat} ${c.vers.nom}.`
          : `${c.valeur} ${c.de.nom} equals ${c.resultat} ${c.vers.nom}.` } },
      { "@type": "Question",
        "name": c.lang === 'fr' ? `Comment convertir ${c.de.nom} en ${c.vers.nom} ?` : `How to convert ${c.de.nom} to ${c.vers.nom}?`,
        "acceptedAnswer": { "@type": "Answer", "text": c.lang === 'fr'
          ? "Utilisez notre calculateur ou la formule de conversion."
          : "Use our calculator or the conversion formula." } }
    ].concat(contenu ? contenu.faq.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.r }
    })) : [])
  });

  const breadcrumbJSON = JSON.stringify({
    "@context": "https://schema.org", "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": trad.accueil, "item": `${SITE_URL}/${c.lang}/` },
      { "@type": "ListItem", "position": 2, "name": c.categorieNom, "item": `${SITE_URL}/${c.lang}/${c.categorieSlug}/` },
      { "@type": "ListItem", "position": 3, "name": titre, "item": urlPage }
    ]
  });

  const jsonLD = `<script type="application/ld+json">${faqJSON}</script>
<script type="application/ld+json">${breadcrumbJSON}</script>`;

  const labelValeur = c.lang === 'fr' ? `Valeur en ${c.de.nom}` : `Value in ${c.de.nom}`;

  return `<!DOCTYPE html>
<html lang="${c.lang}">
<head>
${headCommun(c.lang, titre + ' - ' + SITE_NOM, description, urlPage, urlAlt, jsonLD)}
</head>
<body>

${construireHeader(c.lang)}

<div class="layout">
  <aside class="ad-side ad-side-left"><div class="ad ad-skyscraper" data-ad-format="skyscraper"></div></aside>

  <main>
    <nav class="fil-ariane">
      <a href="/${c.lang}/">${trad.accueil}</a> ›
      <a href="/${c.lang}/${c.categorieSlug}/">${c.categorieNom}</a> ›
      <span>${titre}</span>
    </nav>

    <h1>${titre}</h1>

    <p class="reponse"><strong>${c.valeur} ${c.de.nom} = ${c.resultat} ${c.vers.nom}</strong></p>

    <div class="ad ad-horizontal ad-inline" data-ad-format="horizontal"></div>

    <section class="calculateur">
      <h2>${trad.calculateur}</h2>
      <label>${labelValeur} :
        <input type="number" id="val" value="${c.valeur}" step="any">
      </label>
      <p>${trad.resultat} : <strong><span id="res">${c.resultat}</span> ${c.vers.nom}</strong></p>
      <script>
        (function(){
          var input = document.getElementById('val');
          var res = document.getElementById('res');
          var de = ${JSON.stringify({ f: c.de.f, toRef: c.de.toRef })};
          var vers = ${JSON.stringify({ f: c.vers.f, fromRef: c.vers.fromRef })};
          var special = ${cat.special ? 'true' : 'false'};
          function calc(v){
            if (special) return eval(vers.fromRef.toString())(eval(de.toRef.toString())(v));
            return v * de.f / vers.f;
          }
          input.addEventListener('input', function(){
            var v = parseFloat(input.value) || 0;
            var r = calc(v);
            if (Math.abs(r) > 1e15 || (Math.abs(r) < 1e-6 && r !== 0)) {
              res.textContent = r.toExponential(4);
            } else {
              res.textContent = Math.round(r * 10000) / 10000;
            }
          });
        })();
      </script>
    </section>

    ${sectionIntro}

    <section>
      <h2>${trad.formule}</h2>
      <p>${c.lang === 'fr'
        ? `Convertissez les ${c.de.nom} en ${c.vers.nom} à l'aide du calculateur ci-dessus.`
        : `Convert ${c.de.nom} to ${c.vers.nom} using the calculator above.`}</p>
    </section>

    <section>
      <h2>${trad.tableau}</h2>
      <table>
        <thead><tr><th>${c.de.nom}</th><th>${c.vers.nom}</th></tr></thead>
        <tbody>${lignes}</tbody>
      </table>
    </section>

    <div class="ad ad-rectangle ad-inline" data-ad-format="rectangle"></div>

    ${sectionUtilite}
    ${sectionExemples}
    ${sectionErreurs}

    <section>
      <h2>${trad.faq}</h2>
      <p><strong>${c.lang === 'fr'
        ? `Combien font ${c.valeur} ${c.de.nom} en ${c.vers.nom} ?`
        : `How many ${c.vers.nom} in ${c.valeur} ${c.de.nom}?`}</strong><br>
      ${c.lang === 'fr'
        ? `${c.valeur} ${c.de.nom} équivaut à ${c.resultat} ${c.vers.nom}.`
        : `${c.valeur} ${c.de.nom} equals ${c.resultat} ${c.vers.nom}.`}</p>
      <p><strong>${c.lang === 'fr'
        ? `Comment convertir ${c.de.nom} en ${c.vers.nom} ?`
        : `How to convert ${c.de.nom} to ${c.vers.nom}?`}</strong><br>
      ${c.lang === 'fr'
        ? 'Utilisez le calculateur ci-dessus.'
        : 'Use the calculator above.'}</p>
      ${faqSupplementaires}
    </section>

    ${sectionAstuces}

    <div class="ad ad-horizontal ad-inline" data-ad-format="horizontal"></div>

    <section class="maillage">
      <h2>${trad.similaires}</h2>
      <ul>${liensProches}</ul>
    </section>
  </main>

  <aside class="ad-side ad-side-right"><div class="ad ad-skyscraper" data-ad-format="skyscraper"></div></aside>
</div>

${construireFooter(c.lang)}
<script src="/app.js" defer></script>
<script src="/cookies.js" defer></script>
<script src="/ads.js" defer></script>
</body>
</html>`;
}

// ============================================================
// 9. PAGE CATÉGORIE
// ============================================================

function pageCategorie(catKey, lang, toutes) {
  const trad = TRAD[lang];
  const catSlug = CAT_SLUGS[catKey][lang];
  const catNom = trad.categories[catKey].nom;
  const catIcone = trad.categories[catKey].icone;
  const motEn = trad.motEn;
  const cat = categories[catKey];

  const dansCat = toutes.filter(c => c.lang === lang && c.categorie === catKey);

  // Grouper par paire (de → vers)
  const groupes = {};
  for (const c of dansCat) {
    const cle = `${c.de.slug}-${c.vers.slug}`;
    if (!groupes[cle]) groupes[cle] = { de: c.de, vers: c.vers, items: [] };
    groupes[cle].items.push(c);
  }

  // ============================================
  // 1. INTRO AUTO
  // ============================================
  const listeUnites = cat.unites.map(u => nomUnite(u.slug, lang)).join(', ');
  const nbPaires = Object.keys(groupes).length;

  const introFR = `Cette page regroupe toutes les conversions de ${catNom.toLowerCase()} disponibles sur ${SITE_NOM}. Elle couvre ${cat.unites.length} unités différentes : ${listeUnites}. Que vous soyez étudiant, professionnel, bricoleur ou simplement curieux, vous trouverez ici la réponse en quelques secondes, sans inscription et sans publicité intrusive.

Les ${dansCat.length} conversions proposées couvrent ${nbPaires} combinaisons possibles entre ces unités, dans les deux sens. Chaque page inclut un calculateur interactif, un tableau de conversion complet et les formules détaillées.`;

  const introEN = `This page gathers all ${catNom.toLowerCase()} conversions available on ${SITE_NOM}. It covers ${cat.unites.length} different units: ${listeUnites}. Whether you are a student, professional, DIY enthusiast, or simply curious, you'll find the answer in seconds, with no registration and no intrusive ads.

The ${dansCat.length} conversions listed cover ${nbPaires} possible combinations between these units, in both directions. Each page includes an interactive calculator, a complete conversion table, and detailed formulas.`;

  const intro = lang === 'fr' ? introFR : introEN;

  // ============================================
  // 2. TABLEAU DES UNITÉS
  // ============================================
  let sectionTableauUnites = '';

  if (!cat.special) {
    const uniteRef = cat.unites.find(u => u.f === 1) || cat.unites[0];
    let lignesU = '';
    for (const u of cat.unites) {
      const nom = nomUnite(u.slug, lang);
      const valeur = u.f === 1
        ? (lang === 'fr' ? 'unité de référence' : 'reference unit')
        : `${arrondir(u.f)} ${nomUnite(uniteRef.slug, lang)}`;
      lignesU += `<tr><td>${nom}</td><td>${valeur}</td></tr>\n`;
    }
    sectionTableauUnites = `
    <section>
      <h2>${lang === 'fr' ? 'Les unités de ' + catNom.toLowerCase() : catNom + ' units'}</h2>
      <p>${lang === 'fr'
        ? "Voici les " + cat.unites.length + " unités disponibles et leur équivalent dans l'unité de référence (" + nomUnite(uniteRef.slug, lang) + ") :"
        : 'Here are the ' + cat.unites.length + ' available units and their equivalent in the reference unit (' + nomUnite(uniteRef.slug, lang) + '):'}</p>
      <table>
        <thead><tr><th>${lang === 'fr' ? 'Unité' : 'Unit'}</th><th>${lang === 'fr' ? '1 unité en ' + nomUnite(uniteRef.slug, lang) : '1 unit in ' + nomUnite(uniteRef.slug, lang)}</th></tr></thead>
        <tbody>${lignesU}</tbody>
      </table>
    </section>`;
  } else {
    // Température : cas spécial
    const listeEchelles = cat.unites.map(u => nomUnite(u.slug, lang)).join(', ');
    sectionTableauUnites = `
    <section>
      <h2>${lang === 'fr' ? 'Les échelles de température' : 'Temperature scales'}</h2>
      <p>${lang === 'fr'
        ? 'Cette catégorie couvre ' + cat.unites.length + ' échelles de température : ' + listeEchelles + '. Chaque échelle a ses usages : Celsius en Europe, Fahrenheit aux États-Unis, Kelvin en science, Rankine en ingénierie anglo-saxonne, Réaumur historiquement en France.'
        : 'This category covers ' + cat.unites.length + ' temperature scales: ' + listeEchelles + '. Each scale has its uses: Celsius in Europe, Fahrenheit in the US, Kelvin in science, Rankine in Anglo-Saxon engineering, Réaumur historically in France.'}</p>
    </section>`;
  }

  // ============================================
  // 3. CONVERSIONS POPULAIRES (10 max, variées)
  // ============================================
  const premierePaireParDe = {};
  for (const g of Object.values(groupes)) {
    if (!premierePaireParDe[g.de.slug]) premierePaireParDe[g.de.slug] = g;
  }
  const pairesPopulaires = Object.values(premierePaireParDe).slice(0, 10);

  let sectionPopulaires = '';
  if (pairesPopulaires.length > 0) {
    const liensPop = pairesPopulaires.map(g => {
      const item = g.items[0];
      return `<li><a href="/${lang}/${catSlug}/${item.slug}.html">${item.valeur} ${item.de.nom} ${motEn} ${item.vers.nom}</a></li>`;
    }).join('\n');

    sectionPopulaires = `
    <section>
      <h2>${lang === 'fr' ? 'Conversions les plus courantes' : 'Most common conversions'}</h2>
      <p>${lang === 'fr'
        ? 'Voici une sélection des conversions les plus demandées dans cette catégorie :'
        : 'Here is a selection of the most requested conversions in this category:'}</p>
      <ul>${liensPop}</ul>
    </section>`;
  }

  // ============================================
  // 4. TABLEAU DE CONVERSION RAPIDE
  // ============================================
  let sectionTableauRapide = '';
  if (!cat.special && cat.unites.length > 1) {
    const baseUnite = cat.unites[0];
    const nomBase = nomUnite(baseUnite.slug, lang);
    let lignesRapides = '';
    for (const u of cat.unites.slice(1, 11)) {
      const nom = nomUnite(u.slug, lang);
      const r = arrondir(calculer(cat, baseUnite, u, 1));
      lignesRapides += `<tr><td>${nom}</td><td>${r}</td></tr>\n`;
    }
    sectionTableauRapide = `
    <section>
      <h2>${lang === 'fr' ? 'Tableau de conversion rapide' : 'Quick conversion table'}</h2>
      <p>${lang === 'fr'
        ? 'Convertir 1 ' + nomBase + ' dans les principales autres unités :'
        : 'Convert 1 ' + nomBase + ' into the main other units:'}</p>
      <table>
        <thead><tr><th>${lang === 'fr' ? 'Unité' : 'Unit'}</th><th>1 ${nomBase}</th></tr></thead>
        <tbody>${lignesRapides}</tbody>
      </table>
    </section>`;
  }

  // ============================================
  // 5. FAQ AUTO
  // ============================================
  const faqItems = [];
  const u0 = cat.unites[0];
  const u1 = cat.unites[1] || cat.unites[0];
  const nomU0 = nomUnite(u0.slug, lang);
  const nomU1 = nomUnite(u1.slug, lang);

  if (lang === 'fr') {
    faqItems.push({
      q: `Combien d'unités de ${catNom.toLowerCase()} sont disponibles sur ${SITE_NOM} ?`,
      r: `Cette catégorie propose ${cat.unites.length} unités différentes et ${dansCat.length} pages de conversion au total, couvrant ${nbPaires} combinaisons dans les deux sens.`
    });
    faqItems.push({
      q: `Comment convertir ${nomU0} en ${nomU1} ?`,
      r: `Utilisez le calculateur interactif présent sur chaque page de conversion, ou cliquez sur la conversion correspondante dans la liste ci-dessus. Chaque page affiche le résultat instantanément.`
    });
    faqItems.push({
      q: `Les conversions de ${catNom.toLowerCase()} sont-elles gratuites ?`,
      r: `Oui, ${SITE_NOM} est un outil 100 % gratuit. Aucune inscription n'est nécessaire, et il n'y a aucune limite d'utilisation.`
    });
    faqItems.push({
      q: `Puis-je utiliser ces conversions sur mobile ?`,
      r: `Oui, le site est entièrement responsive et fonctionne parfaitement sur smartphone, tablette et ordinateur. Le calculateur s'adapte à toutes les tailles d'écran.`
    });
    faqItems.push({
      q: `Quelle est la précision des conversions ?`,
      r: `Toutes les conversions sont calculées avec une précision de 4 décimales. Pour les très grandes ou très petites valeurs, la notation scientifique est utilisée. Les formules sont basées sur les standards internationaux.`
    });
  } else {
    faqItems.push({
      q: `How many ${catNom.toLowerCase()} units are available on ${SITE_NOM}?`,
      r: `This category offers ${cat.unites.length} different units and ${dansCat.length} conversion pages in total, covering ${nbPaires} combinations in both directions.`
    });
    faqItems.push({
      q: `How to convert ${nomU0} to ${nomU1}?`,
      r: `Use the interactive calculator on each conversion page, or click the corresponding conversion in the list above. Each page displays the result instantly.`
    });
    faqItems.push({
      q: `Are ${catNom.toLowerCase()} conversions free?`,
      r: `Yes, ${SITE_NOM} is a 100% free tool. No registration is required, and there is no usage limit.`
    });
    faqItems.push({
      q: `Can I use these conversions on mobile?`,
      r: `Yes, the site is fully responsive and works perfectly on smartphone, tablet, and desktop. The calculator adapts to all screen sizes.`
    });
    faqItems.push({
      q: `How accurate are the conversions?`,
      r: `All conversions are calculated with 4-decimal precision. For very large or very small values, scientific notation is used. Formulas are based on international standards.`
    });
  }

  const faqHTML = faqItems.map(f => `<p><strong>${f.q}</strong><br>${f.r}</p>`).join('\n');

  const faqJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "FAQPage",
    "mainEntity": faqItems.map(f => ({
      "@type": "Question",
      "name": f.q,
      "acceptedAnswer": { "@type": "Answer", "text": f.r }
    }))
  });

  const breadcrumbJSON = JSON.stringify({
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    "itemListElement": [
      { "@type": "ListItem", "position": 1, "name": trad.accueil, "item": `${SITE_URL}/${lang}/` },
      { "@type": "ListItem", "position": 2, "name": catNom, "item": `${SITE_URL}/${lang}/${catSlug}/` }
    ]
  });

  const jsonLD = `<script type="application/ld+json">${faqJSON}</script>
<script type="application/ld+json">${breadcrumbJSON}</script>`;

  // ============================================
  // 6. VOIR AUSSI
  // ============================================
  const autresCat = Object.entries(CAT_SLUGS)
    .filter(([k]) => k !== catKey)
    .slice(0, 6)
    .map(([k, slugs]) => {
      const c = trad.categories[k];
      return `<li><a href="/${lang}/${slugs[lang]}/">${c.icone} ${c.nom}</a></li>`;
    })
    .join('\n');

  const sectionVoirAussi = `
    <section class="maillage">
      <h2>${lang === 'fr' ? 'Voir aussi' : 'See also'}</h2>
      <ul>${autresCat}</ul>
    </section>`;

  // ============================================
  // 7. TOUS LES GROUPES (annuaire complet)
  // ============================================
  let blocs = '';
  let groupesHTML = '';
  for (const g of Object.values(groupes)) {
    const itemsLimites = g.items.slice(0, 5);
    const liens = itemsLimites
      .map(i => `<li><a href="/${lang}/${catSlug}/${i.slug}.html">${i.valeur} ${i.de.nom} ${motEn} ${i.vers.nom}</a></li>`)
      .join('\n');
    const plus = g.items.length > 5
      ? `<li class="plus"><em>… ${lang === 'fr' ? 'et' : 'and'} ${g.items.length - 5} ${lang === 'fr' ? 'autres valeurs' : 'more values'}</em></li>`
      : '';
    groupesHTML += `<details>
      <summary>${g.de.nom} → ${g.vers.nom} <span class="compteur">${g.items.length}</span></summary>
      <ul>${liens}${plus}</ul>
    </details>\n`;
  }
  blocs = `<div class="annuaire">${groupesHTML}</div>`;

  const titre = lang === 'fr'
    ? `${catNom} - Convertisseur ${catNom.toLowerCase()}`
    : `${catNom} - ${catNom} converter`;
  const description = lang === 'fr'
    ? `Convertisseur de ${catNom.toLowerCase()} : ${cat.unites.length} unités, ${dansCat.length} conversions. Calculateur interactif, formules et tableaux.`
    : `${catNom} converter: ${cat.unites.length} units, ${dansCat.length} conversions. Interactive calculator, formulas and tables.`;
  const urlPage = `${SITE_URL}/${lang}/${catSlug}/`;

  const autreLang = lang === 'fr' ? 'en' : 'fr';
  const urlAlt = `${SITE_URL}/${autreLang}/${CAT_SLUGS[catKey][autreLang]}/`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headCommun(lang, titre + ' - ' + SITE_NOM, description, urlPage, urlAlt, jsonLD)}
</head>
<body>
${construireHeader(lang)}
<div class="layout">
  <aside class="ad-side ad-side-left"><div class="ad ad-skyscraper" data-ad-format="skyscraper"></div></aside>
  <main>
    <nav class="fil-ariane"><a href="/${lang}/">${trad.accueil}</a> › <span>${catNom}</span></nav>

    <h1>${catIcone} ${catNom}</h1>

    <div class="ad ad-horizontal ad-inline" data-ad-format="horizontal"></div>

    <section>
      <h2>${lang === 'fr' ? 'Présentation' : 'Overview'}</h2>
      ${intro.split('\n\n').map(p => `<p>${p}</p>`).join('\n')}
    </section>

    ${sectionTableauUnites}
    ${sectionPopulaires}
    ${sectionTableauRapide}

    <div class="ad ad-rectangle ad-inline" data-ad-format="rectangle"></div>

    <section>
      <h2>${lang === 'fr' ? 'FAQ' : 'FAQ'}</h2>
      ${faqHTML}
    </section>

    <section>
      <h2>${lang === 'fr' ? 'Toutes les conversions de ' + catNom.toLowerCase() : 'All ' + catNom.toLowerCase() + ' conversions'}</h2>
      <p>${lang === 'fr'
        ? "Retrouvez ci-dessous l'intégralité des conversions, regroupées par paire d'unités."
        : 'Find below the complete list of conversions, grouped by unit pair.'}</p>
    </section>

    ${blocs}

    <div class="ad ad-horizontal ad-inline" data-ad-format="horizontal"></div>

    ${sectionVoirAussi}
  </main>
  <aside class="ad-side ad-side-right"><div class="ad ad-skyscraper" data-ad-format="skyscraper"></div></aside>
</div>
${construireFooter(lang)}
<script src="/app.js" defer></script>
<script src="/cookies.js" defer></script>
<script src="/ads.js" defer></script>
</body>
</html>`;
}

// ============================================================
// 10. ACCUEIL
// ============================================================

function pageAccueil(lang, toutes) {
  const trad = TRAD[lang];
  const titre = lang === 'fr' ? `${SITE_NOM} - Convertisseur d'unités en ligne` : `${SITE_NOM} - Online unit converter`;
  const description = lang === 'fr'
    ? "Convertissez facilement toutes les unités : longueur, masse, volume, température et plus."
    : "Easily convert all units: length, weight, volume, temperature and more.";
  const urlPage = `${SITE_URL}/${lang}/`;
  const autreLang = lang === 'fr' ? 'en' : 'fr';
  const urlAlt = `${SITE_URL}/${autreLang}/`;
  const motEn = trad.motEn;

  let cartes = '';
  for (const [catKey, slugs] of Object.entries(CAT_SLUGS)) {
    const dansCat = toutes.filter(x => x.lang === lang && x.categorie === catKey);
    if (dansCat.length === 0) continue;
    const exemples = dansCat.slice(0, 5)
      .map(x => `<li><a href="/${lang}/${x.categorieSlug}/${x.slug}.html">${x.valeur} ${x.de.nom} ${motEn} ${x.vers.nom}</a></li>`)
      .join('');
    const c = trad.categories[catKey];
    cartes += `<div class="carte">
      <h3><a href="/${lang}/${slugs[lang]}/">${c.icone} ${c.nom}</a></h3>
      <p>${dansCat.length} ${trad.conversions}</p>
      <ul>${exemples}</ul>
      <a href="/${lang}/${slugs[lang]}/" class="btn">${trad.voirTout} →</a>
    </div>`;
  }

  const h1 = lang === 'fr' ? "Convertisseur d'unités rapide et gratuit" : 'Fast and free unit converter';
  const intro = lang === 'fr'
    ? "Trouvez instantanément la conversion que vous cherchez, ou utilisez la recherche en haut."
    : 'Instantly find the conversion you are looking for, or use the search at the top.';

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headCommun(lang, titre, description, urlPage, urlAlt)}
</head>
<body>
${construireHeader(lang)}
<main class="accueil">
  <h1>${h1}</h1>
  <p class="intro">${intro}</p>
  <div class="ad ad-horizontal ad-inline" data-ad-format="horizontal"></div>
  <div class="cartes">${cartes}</div>
</main>
${construireFooter(lang)}
<script src="/app.js" defer></script>
<script src="/cookies.js" defer></script>
<script src="/ads.js" defer></script>
</body>
</html>`;
}

// ============================================================
// 11. PAGES LÉGALES
// ============================================================

function pageSimple(lang, titre, contenu, slug) {
  const trad = TRAD[lang];
  const urlPage = `${SITE_URL}/${lang}/${slug}.html`;
  const autreLang = lang === 'fr' ? 'en' : 'fr';
  const urlAlt = `${SITE_URL}/${autreLang}/`;

  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headCommun(lang, titre + ' - ' + SITE_NOM, titre, urlPage, urlAlt)}
</head>
<body>
${construireHeader(lang)}
<main class="page-legale">
  <nav class="fil-ariane"><a href="/${lang}/">${trad.accueil}</a> › <span>${titre}</span></nav>
  <h1>${titre}</h1>
  ${contenu}
</main>
${construireFooter(lang)}
<script src="/app.js" defer></script>
<script src="/cookies.js" defer></script>
<script src="/ads.js" defer></script>
</body>
</html>`;
}

function page404(lang) {
  const trad = TRAD[lang];
  const titre = lang === 'fr' ? 'Page introuvable' : 'Page not found';
  return `<!DOCTYPE html>
<html lang="${lang}">
<head>
${headCommun(lang, titre + ' - ' + SITE_NOM, titre, `${SITE_URL}/${lang}/404.html`, `${SITE_URL}/${lang}/404.html`)}
</head>
<body>
${construireHeader(lang)}
<main style="text-align:center;padding:4rem 0">
  <h1>404</h1>
  <p>${lang === 'fr' ? "Cette page n'existe pas." : "This page doesn't exist."}</p>
  <p><a href="/${lang}/">${lang === 'fr' ? "Retour à l'accueil" : 'Back to home'}</a></p>
</main>
${construireFooter(lang)}
<script src="/app.js" defer></script>
<script src="/cookies.js" defer></script>
<script src="/ads.js" defer></script></body>
</html>`;
}

// ============================================================
// 12. CONTENU PAGES LÉGALES
// ============================================================

function contenuApropos(lang) {
  const date = lang === 'fr'
    ? new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  if (lang === 'fr') {
    return `
<p><strong>${SITE_NOM}</strong> est un outil de conversion d'unités en ligne, gratuit et accessible à tous, sans inscription.</p>
<h2>Notre mission</h2>
<p>Nous proposons des convertisseurs rapides et fiables pour toutes les unités du quotidien : longueur, masse, volume, température, surface, vitesse, données informatiques, et bien plus.</p>
<h2>Pourquoi ce site ?</h2>
<p>La plupart des sites de conversion sont lents ou surchargés. ${SITE_NOM} va à l'essentiel : réponse immédiate, calculateur interactif, tableau complet, aucune inscription.</p>
<h2>Notre engagement</h2>
<p>Le site est et restera gratuit. Il est financé par la publicité, ce qui couvre les frais d'hébergement. Nous ne revendons jamais vos données personnelles.</p>
<h2>Contact</h2>
<p>Une question, une suggestion ? Écrivez-nous à <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a>.</p>
<p><em>Dernière mise à jour : ${date}</em></p>`;
  } else {
    return `
<p><strong>${SITE_NOM}</strong> is a free online unit conversion tool, accessible to everyone, no registration required.</p>
<h2>Our mission</h2>
<p>We provide fast and reliable converters for everyday units: length, weight, volume, temperature, area, speed, digital data, and more.</p>
<h2>Why this site?</h2>
<p>Most conversion sites are slow or cluttered. ${SITE_NOM} goes straight to the point: instant answers, interactive calculator, complete tables, no registration.</p>
<h2>Our commitment</h2>
<p>The site is and will remain free. It is funded by advertising, which covers hosting costs. We never sell your personal data.</p>
<h2>Contact</h2>
<p>A question or suggestion? Write to us at <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a>.</p>
<p><em>Last updated: ${date}</em></p>`;
  }
}

function contenuMentions(lang) {
  const date = lang === 'fr'
    ? new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  if (lang === 'fr') {
    return `
<p>Conformément aux articles 6-III et 19 de la loi n° 2004-575 du 21 juin 2004 (LCEN), voici les informations légales relatives au site <strong>${SITE_NOM}</strong>.</p>
<h2>Éditeur du site</h2>
<p><strong>Nom / Pseudonyme :</strong> ${AUTEUR}<br>
<strong>Statut :</strong> Particulier<br>
<strong>Pays :</strong> France<br>
<strong>Contact :</strong> <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></p>
<h2>Directeur de la publication</h2>
<p>${AUTEUR}, joignable à l'adresse email ci-dessus.</p>
<h2>Hébergeur</h2>
<p><strong>Cloudflare, Inc.</strong><br>101 Townsend Street<br>San Francisco, CA 94107<br>États-Unis<br>Téléphone : +1 (650) 319-8930<br>Site : <a href="https://www.cloudflare.com" target="_blank" rel="noopener">cloudflare.com</a></p>
<h2>Propriété intellectuelle</h2>
<p>L'ensemble du contenu (structure, textes, code, mise en page) est la propriété exclusive de l'éditeur. Toute reproduction est interdite sans autorisation.</p>
<h2>Responsabilité</h2>
<p>Les informations sont fournies à titre indicatif. L'éditeur ne saurait être tenu responsable d'une erreur ou d'un usage inapproprié.</p>
<p><em>Dernière mise à jour : ${date}</em></p>`;
  } else {
    return `
<p>Legal information about <strong>${SITE_NOM}</strong>.</p>
<h2>Publisher</h2>
<p><strong>Name / Nickname:</strong> ${AUTEUR}<br>
<strong>Status:</strong> Individual<br>
<strong>Country:</strong> France<br>
<strong>Contact:</strong> <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></p>
<h2>Publication director</h2>
<p>${AUTEUR}, reachable at the email above.</p>
<h2>Host</h2>
<p><strong>Cloudflare, Inc.</strong><br>101 Townsend Street<br>San Francisco, CA 94107<br>USA<br>Phone: +1 (650) 319-8930<br>Website: <a href="https://www.cloudflare.com" target="_blank" rel="noopener">cloudflare.com</a></p>
<h2>Intellectual property</h2>
<p>All content (structure, texts, code, layout) is the exclusive property of the publisher. Any reproduction is prohibited without authorization.</p>
<h2>Liability</h2>
<p>Information is provided for informational purposes only. The publisher cannot be held liable for any error or inappropriate use.</p>
<p><em>Last updated: ${date}</em></p>`;
  }
}

function contenuConfidentialite(lang) {
  const date = lang === 'fr'
    ? new Date().toLocaleDateString('fr-FR', { year: 'numeric', month: 'long' })
    : new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long' });
  if (lang === 'fr') {
    return `
<p>Cette politique décrit comment <strong>${SITE_NOM}</strong> collecte, utilise et protège vos données, conformément au RGPD (UE 2016/679).</p>
<h2>1. Responsable du traitement</h2>
<p>${AUTEUR} — <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></p>
<h2>2. Données collectées</h2>
<p>${SITE_NOM} ne demande aucune inscription et ne collecte aucune donnée personnelle directe. Les seules données traitées sont :</p>
<ul>
<li>Données de navigation anonymisées (statistiques)</li>
<li>Cookies publicitaires déposés par Google AdSense</li>
<li>Adresse IP, traitée temporairement par l'hébergeur pour la sécurité</li>
</ul>
<h2>3. Cookies et publicité</h2>
<p>Ce site utilise <strong>Google AdSense</strong>. Google peut utiliser des cookies pour diffuser des annonces personnalisées.</p>
<ul>
<li>Désactiver la personnalisation : <a href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a></li>
<li>Politique Google : <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a></li>
</ul>
<h2>4. Base légale</h2>
<p>Consentement (art. 6.1.a RGPD) pour les cookies, intérêt légitime (art. 6.1.f) pour la sécurité.</p>
<h2>5. Durée de conservation</h2>
<p>Données de navigation : 14 mois maximum. Cookies publicitaires : 13 mois maximum.</p>
<h2>6. Vos droits</h2>
<p>Vous disposez des droits d'accès, rectification, effacement, limitation, opposition et portabilité. Contact : <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a>. Réclamation possible auprès de la <a href="https://www.cnil.fr" target="_blank" rel="noopener">CNIL</a>.</p>
<h2>7. Sécurité</h2>
<p>Le site est servi en HTTPS. Aucune donnée sensible n'est stockée.</p>
<p><em>Dernière mise à jour : ${date}</em></p>`;
  } else {
    return `
<p>This policy describes how <strong>${SITE_NOM}</strong> collects, uses and protects your data, in accordance with GDPR (EU 2016/679).</p>
<h2>1. Data controller</h2>
<p>${AUTEUR} — <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></p>
<h2>2. Data collected</h2>
<p>${SITE_NOM} does not require registration and does not collect any direct personal data. Only the following is processed:</p>
<ul>
<li>Anonymized browsing data (statistics)</li>
<li>Advertising cookies set by Google AdSense</li>
<li>IP address, temporarily processed by the host for security</li>
</ul>
<h2>3. Cookies and advertising</h2>
<p>This site uses <strong>Google AdSense</strong>. Google may use cookies to serve personalized ads.</p>
<ul>
<li>Opt out: <a href="https://adssettings.google.com" target="_blank" rel="noopener">adssettings.google.com</a></li>
<li>Google policy: <a href="https://policies.google.com/privacy" target="_blank" rel="noopener">policies.google.com/privacy</a></li>
</ul>
<h2>4. Legal basis</h2>
<p>Consent (Art. 6.1.a GDPR) for cookies, legitimate interest (Art. 6.1.f) for security.</p>
<h2>5. Retention</h2>
<p>Browsing data: maximum 14 months. Advertising cookies: maximum 13 months.</p>
<h2>6. Your rights</h2>
<p>You have the rights of access, rectification, erasure, restriction, objection and portability. Contact: <a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a>.</p>
<h2>7. Security</h2>
<p>The site is served over HTTPS. No sensitive data is stored.</p>
<p><em>Last updated: ${date}</em></p>`;
  }
}

function contenuContact(lang) {
  if (lang === 'fr') {
    return `
<p>Une question, une suggestion, un bug à signaler ? Nous serions ravis de vous lire.</p>
<h2>Par email</h2>
<p>Écrivez-nous à : <strong><a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></strong></p>
<p>Nous répondons dans un délai de 48 à 72 heures.</p>
<h2>Signaler une erreur</h2>
<p>Merci de préciser l'URL, la valeur, les unités et le résultat attendu.</p>
<h2>Proposer une nouvelle unité</h2>
<p>Envoyez-nous son nom, sa catégorie et son facteur de conversion.</p>`;
  } else {
    return `
<p>A question, suggestion, or bug to report? We'd love to hear from you.</p>
<h2>By email</h2>
<p>Write to us at: <strong><a href="mailto:${EMAIL_CONTACT}">${EMAIL_CONTACT}</a></strong></p>
<p>We respond within 48 to 72 hours.</p>
<h2>Report an error</h2>
<p>Please specify the URL, value, units and expected result.</p>
<h2>Suggest a new unit</h2>
<p>Send us its name, category and conversion factor.</p>`;
  }
}

// ============================================================
// 13. SITEMAP + ROBOTS + SEARCH INDEX
// ============================================================

// Génère la liste complète des URLs
function toutesLesUrls() {
  const urls = [];
  urls.push(`${SITE_URL}/`);
  for (const lang of LANGUES) {
    const trad = TRAD[lang];
    urls.push(`${SITE_URL}/${lang}/`);
    urls.push(`${SITE_URL}/${lang}/404.html`);
    for (const catKey of Object.keys(CAT_SLUGS)) {
      urls.push(`${SITE_URL}/${lang}/${CAT_SLUGS[catKey][lang]}/`);
    }
    urls.push(`${SITE_URL}/${lang}/${trad.urlApropos}.html`);
    urls.push(`${SITE_URL}/${lang}/${trad.urlMentions}.html`);
    urls.push(`${SITE_URL}/${lang}/${trad.urlConfidentialite}.html`);
    urls.push(`${SITE_URL}/${lang}/${trad.urlContact}.html`);

    for (const c of conversionsParLangue[lang]) {
      urls.push(`${SITE_URL}/${lang}/${c.categorieSlug}/${c.slug}.html`);
    }
  }
  return urls;
}

// Découpe un tableau en morceaux de taille N
function decouperEnMorceaux(tableau, taille) {
  const morceaux = [];
  for (let i = 0; i < tableau.length; i += taille) {
    morceaux.push(tableau.slice(i, i + taille));
  }
  return morceaux;
}

// Génère un sous-sitemap
function genererSousSitemap(urls) {
  const entries = urls.map(u => `  <url><loc>${u}</loc><changefreq>monthly</changefreq><priority>0.7</priority></url>`).join('\n');
  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}
</urlset>`;
}

// Génère le sitemap index
function genererSitemapIndex(nbSousSitemaps) {
  const date = new Date().toISOString().split('T')[0];
  let entries = '';
  for (let i = 1; i <= nbSousSitemaps; i++) {
    entries += `  <sitemap>
    <loc>${SITE_URL}/sitemap-${i}.xml</loc>
    <lastmod>${date}</lastmod>
  </sitemap>\n`;
  }
  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${entries}</sitemapindex>`;
}

function robots() {
  return `User-agent: *\nAllow: /\nSitemap: ${SITE_URL}/sitemap.xml\n`;
}

function searchIndex(lang) {
  return JSON.stringify(
    conversionsParLangue[lang].map(c => ({
      t: `${c.valeur} ${c.de.nom} ${TRAD[lang].motEn} ${c.vers.nom}`,
      u: `/${lang}/${c.categorieSlug}/${c.slug}.html`,
      c: c.categorieNom,
    })),
    null, 0
  );
}

// ============================================================
// 14. PAGE RACINE
// ============================================================

function pageRacine() {
  return `<!DOCTYPE html>
<html lang="fr">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>${SITE_NOM}</title>
<meta name="description" content="Convertisseur d'unités / Unit converter">
<link rel="canonical" href="${SITE_URL}/fr/">
<link rel="alternate" hreflang="fr" href="${SITE_URL}/fr/">
<link rel="alternate" hreflang="en" href="${SITE_URL}/en/">
<link rel="alternate" hreflang="x-default" href="${SITE_URL}/fr/">
<link rel="icon" type="image/svg+xml" href="/favicon.svg">
<link rel="stylesheet" href="/style.css">
<script>
(function(){
  try {
    var stored = localStorage.getItem('lang');
    if (stored === 'fr' || stored === 'en') {
      location.replace('/' + stored + '/');
      return;
    }
  } catch(e){}
  var nav = (navigator.language || 'en').toLowerCase();
  var lang = nav.indexOf('fr') === 0 ? 'fr' : 'en';
  location.replace('/' + lang + '/');
})();
</script>
</head>
<body>
<noscript>
  <p style="padding:2rem;text-align:center;font-family:system-ui">
    <a href="/fr/">Français</a> · <a href="/en/">English</a>
  </p>
</noscript>
</body>
</html>`;
}

// ============================================================
// 15. ÉCRITURE
// ============================================================

const out = 'docs';
console.log('🧹 Nettoyage de docs/…');
fs.rmSync(out, { recursive: true, force: true });
fs.mkdirSync(out, { recursive: true });

fs.writeFileSync(path.join(out, 'index.html'), pageRacine());
fs.writeFileSync(path.join(out, 'favicon.svg'), FAVICON_SVG);   // ← REMETS CETTE LIGNE

// Fichier de vérification Google Search Console
// (à régénérer si tu changes de compte Google)
const GOOGLE_VERIF_FILENAME = 'google410344c2c4e63311.html';
const GOOGLE_VERIF_CONTENT = 'google-site-verification: ' + GOOGLE_VERIF_FILENAME;
fs.writeFileSync(path.join(out, GOOGLE_VERIF_FILENAME), GOOGLE_VERIF_CONTENT);

const t0 = Date.now();

for (const lang of LANGUES) {
  console.log(`\n🌍 Langue : ${lang.toUpperCase()}`);
  const trad = TRAD[lang];
  const langDir = path.join(out, lang);
  fs.mkdirSync(langDir, { recursive: true });

  for (const [catKey, slugs] of Object.entries(CAT_SLUGS)) {
    fs.mkdirSync(path.join(langDir, slugs[lang]), { recursive: true });
  }

  const toutes = conversionsParLangue[lang];
  console.log(`   📄 ${toutes.length} pages de conversion…`);
  let n = 0;
  for (const c of toutes) {
    fs.writeFileSync(
      path.join(langDir, c.categorieSlug, c.slug + '.html'),
      pageConversion(c, toutes)
    );
    n++;
    if (n % 5000 === 0) console.log(`      … ${n}`);
  }

  for (const catKey of Object.keys(CAT_SLUGS)) {
    fs.writeFileSync(
      path.join(langDir, CAT_SLUGS[catKey][lang], 'index.html'),
      pageCategorie(catKey, lang, toutes)
    );
  }

  fs.writeFileSync(path.join(langDir, 'index.html'), pageAccueil(lang, toutes));

  // Pages légales
  fs.writeFileSync(path.join(langDir, trad.urlApropos + '.html'),
    pageSimple(lang, trad.aproposTitre, contenuApropos(lang), trad.urlApropos));
  fs.writeFileSync(path.join(langDir, trad.urlMentions + '.html'),
    pageSimple(lang, trad.mentionsTitre, contenuMentions(lang), trad.urlMentions));
  fs.writeFileSync(path.join(langDir, trad.urlConfidentialite + '.html'),
    pageSimple(lang, trad.confidentialiteTitre, contenuConfidentialite(lang), trad.urlConfidentialite));
  fs.writeFileSync(path.join(langDir, trad.urlContact + '.html'),
    pageSimple(lang, trad.contactTitre, contenuContact(lang), trad.urlContact));

  fs.writeFileSync(path.join(langDir, '404.html'), page404(lang));
  fs.writeFileSync(path.join(out, `search-index-${lang}.json`), searchIndex(lang));
}

// Sitemaps découpés en morceaux de 5000 URLs
const TOUTES_URLS = toutesLesUrls();
const TAILLE_MORCEAU = 5000;
const MORCEAUX = decouperEnMorceaux(TOUTES_URLS, TAILLE_MORCEAU);

console.log(`📋 Génération de ${MORCEAUX.length} sous-sitemaps (${TOUTES_URLS.length} URLs)…`);
for (let i = 0; i < MORCEAUX.length; i++) {
  fs.writeFileSync(
    path.join(out, `sitemap-${i + 1}.xml`),
    genererSousSitemap(MORCEAUX[i])
  );
}

fs.writeFileSync(path.join(out, 'sitemap.xml'), genererSitemapIndex(MORCEAUX.length));
fs.writeFileSync(path.join(out, 'robots.txt'), robots());

fs.copyFileSync(path.join('src', 'style.css'), path.join(out, 'style.css'));
fs.copyFileSync(path.join('src', 'app.js'),    path.join(out, 'app.js'));
fs.copyFileSync(path.join('src', 'ads.js'),    path.join(out, 'ads.js'));
fs.copyFileSync(path.join('src', 'cookies.js'), path.join(out, 'cookies.js'));

const dt = ((Date.now() - t0) / 1000).toFixed(1);
const totalFr = conversionsParLangue.fr.length;
const totalEn = conversionsParLangue.en.length;

console.log('');
console.log('✅ Génération terminée en ' + dt + ' s');
console.log('');
console.log(`   🇫🇷 FR : ${totalFr} pages`);
console.log(`   🇬🇧 EN : ${totalEn} pages`);
console.log(`   TOTAL : ${totalFr + totalEn} pages de conversion`);
console.log(`           + 32 catégories + 8 légales + 2 accueils + 2 pages 404`);
console.log('');
console.log('   Racine : / (redirection auto selon navigateur)');
console.log('   FR : /fr/…');
console.log('   EN : /en/…');
console.log('');
console.log('   sitemap.xml + robots.txt');
console.log('   search-index-fr.json + search-index-en.json');
console.log('   favicon.svg + style.css + app.js + ads.js');
console.log('');
console.log(`📦 TOTAL : ${totalFr + totalEn + 32 + 8 + 2 + 2 + 2 + 3 + 1 + 2 + 1} fichiers dans docs/`);