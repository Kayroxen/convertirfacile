# ConvertirFacile — Convertisseur d'unités multilingue

Site statique généré automatiquement : **~46 000 pages** FR + EN couvrant 16 catégories de conversions d'unités.

---

## 📁 Structure du projet

```
test site de merde/
├── generate.js                  ← Script générateur (Node.js)
├── README.md                    ← Ce fichier
├── src/                         ← Sources (jamais touchées par le générateur)
│   ├── style.css                ← Design complet
│   ├── app.js                   ← Recherche instantanée
│   ├── ads.js                   ← Config AdSense + placeholders
│   ├── cookies.js               ← Bandeau cookies RGPD
│   └── partials/
│       ├── header.html          ← Header (logo + menu + recherche + langue)
│       └── footer.html          ← Footer (3 colonnes)
└── public/                      ← Site généré (NE PAS ÉDITER À LA MAIN)
    ├── index.html               ← Redirection auto FR/EN
    ├── favicon.svg
    ├── style.css
    ├── app.js
    ├── ads.js
    ├── cookies.js
    ├── sitemap.xml
    ├── robots.txt
    ├── search-index-fr.json
    ├── search-index-en.json
    ├── fr/                      ← Version française
    │   ├── index.html
    │   ├── a-propos.html
    │   ├── mentions-legales.html
    │   ├── politique-confidentialite.html
    │   ├── contact.html
    │   ├── 404.html
    │   ├── longueur/
    │   ├── masse/
    │   └── ... (16 catégories)
    └── en/                      ← Version anglaise
        └── ... (même structure)
```

---

## 🚀 Commandes essentielles

| Action | Commande |
|---|---|
| Générer le site | `node generate.js` |
| Tester en local | `npx serve public` |
| Ouvrir dans le navigateur | `http://localhost:3000` |
| Vider le cache navigateur | `Ctrl + F5` |
| Reset consentement cookies | F12 → Console → `localStorage.removeItem('cookie_consent'); location.reload()` |

---

## 📊 Statistiques du site

| | Nombre |
|---|---|
| Langues | 2 (FR + EN) |
| Catégories | 16 |
| Unités par catégorie | 5 à 20 |
| Pages de conversion | **~44 000** (22 000 FR + 22 000 EN) |
| Pages catégories | 32 |
| Pages légales | 8 (4 par langue) |
| Pages accueil | 2 |
| Pages 404 | 2 |
| **Total fichiers** | **~44 200** |
| Poids total | ~400 Mo |
| Temps de génération | ~90 secondes |

---

## 🗂️ Les 16 catégories

| Catégorie | FR | EN | Unités |
|---|---|---|---|
| 📏 Longueur | longueur | length | 20 |
| ⚖️ Masse | masse | weight | 15 |
| 🧪 Volume | volume | volume | 20 |
| 📐 Surface | surface | area | 15 |
| 📊 Données | donnees | data | 14 |
| ⏱️ Temps | temps | time | 15 |
| 🌬️ Pression | pression | pressure | 12 |
| 🔋 Énergie | energie | energy | 10 |
| 🍳 Cuisine | cuisine | cooking | 10 |
| 🚀 Vitesse | vitesse | speed | 8 |
| 🔄 Débit | debit | data-rate | 10 |
| 💡 Puissance | puissance | power | 8 |
| 📻 Fréquence | frequence | frequency | 7 |
| 🎚️ Angle | angle | angle | 6 |
| 🧲 Force | force | force | 6 |
| 🌡️ Température | temperature | temperature | 5 |

---

## ⚙️ Configuration

### 1. URL du site (`generate.js`)

En haut du fichier, modifie :

```js
const SITE_URL = 'https://tonsite.fr';     // ← ton vrai domaine ici
const SITE_NOM = 'ConvertirFacile';        // ← nom du site
const AUTEUR = 'Kayroxen';                 // ← ton pseudo
const EMAIL_CONTACT = 'Karoxen.dev@gmail.com';  // ← ton email
```

### 2. Config AdSense (`src/ads.js`)

Quand tu auras ton compte AdSense, remplis les 4 lignes en haut du fichier :

```js
const ADSENSE_CLIENT = 'ca-pub-XXXXXXXXXXXXXXXX';   // ton ID éditeur
const ADSENSE_SLOT_HORIZONTAL = '1234567890';       // slot bannière
const ADSENSE_SLOT_RECTANGLE = '0987654321';        // slot rectangle
const ADSENSE_SLOT_SKYSCRAPER = '1122334455';       // slot skyscraper
```

**Tu n'as PAS besoin de regénérer les pages.** Upload juste ce fichier sur ton hébergeur et c'est fini.

### 3. Design (`src/style.css`)

Couleur d'accent principale :

```css
:root {
  --accent: #2563eb;         /* Bleu par défaut */
  --accent-hover: #1d4ed8;
}
```

Change juste ces 2 valeurs pour changer tout le thème (boutons, liens, réponses).

---

## 🎨 Templates modifiables sans régénérer

Ces fichiers peuvent être modifiés et uploadés **directement** sur le serveur sans relancer `node generate.js` :

| Fichier | Ce que tu peux changer |
|---|---|
| `src/style.css` | Couleurs, typo, espacements, layout |
| `src/ads.js` | Config AdSense, types de pubs |
| `src/app.js` | Logique de recherche |
| `src/cookies.js` | Textes du bandeau cookies |

## 🔁 Templates à régénérer

Ces fichiers nécessitent de relancer `node generate.js` après modification :

| Fichier | Ce que tu peux changer |
|---|---|
| `src/partials/header.html` | Logo, menu, bouton langue |
| `src/partials/footer.html` | Liens, textes, colonnes |
| `generate.js` (bloc `TRAD`) | Traductions, textes UI |
| `generate.js` (bloc `categories`) | Unités, valeurs, formules |
| `generate.js` (bloc `CONTENU_CATEGORIES`) | Contenu unique par catégorie |

---

## 🔧 Comment modifier le contenu

### Ajouter une unité

Dans `generate.js`, bloc `categories`, ajoute une ligne :

```js
longueur: {
  valeurs: [1, 2, 5, 10, ...],
  unites: [
    { slug: 'mm', f: 0.001 },
    { slug: 'cm', f: 0.01 },
    { slug: 'nouvelle-unite', f: 0.5 },  // ← ajoute ici
  ],
}
```

Puis dans `UNITES_TRAD`, ajoute la traduction :

```js
'nouvelle-unite': { frNom: 'nom FR', enSlug: 'en-slug', enNom: 'English name' },
```

Relance `node generate.js` → **~400 nouvelles pages** créées automatiquement.

### Ajouter une catégorie

1. Ajoute dans `categories` (bloc données)
2. Ajoute dans `CAT_SLUGS` (slugs FR/EN)
3. Ajoute dans `TRAD.fr.categories` et `TRAD.en.categories` (nom + icône)
4. Ajoute dans `CONTENU_CATEGORIES` (contenu unique)
5. Ajoute dans les catégories principales du header si besoin (`catPrincipales` dans `construireHeader`)

Relance `node generate.js`.

### Ajouter une langue

1. Ajoute `'es'` dans `const LANGUES = ['fr', 'en', 'es']`
2. Ajoute un bloc `es: { ... }` dans `TRAD`
3. Ajoute les traductions des unités dans `UNITES_TRAD` (clé `esSlug`, `esNom`)
4. Ajoute les slugs dans `CAT_SLUGS` (clé `es`)
5. Ajoute `es` dans les partials `header.html` / `footer.html` si besoin

**Attention** : chaque langue ajoute ~22 000 pages et beaucoup de traductions.

---

## 🌐 Mise en ligne sur Cloudflare Pages

### Prérequis
- Compte GitHub
- Compte Cloudflare
- Nom de domaine (optionnel mais recommandé)

### Étapes

1. **Créer un repo GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   git branch -M main
   git remote add origin https://github.com/Kayroxen/convertirfacile.git
   git push -u origin main
   ```

2. **Créer un projet Cloudflare Pages**
   - Va sur [dash.cloudflare.com](https://dash.cloudflare.com)
   - Pages → Créer un projet → Connecter à Git
   - Sélectionne ton repo
   - **Build command** : `node generate.js`
   - **Build output directory** : `public`
   - Clique **Save and Deploy**

3. **Configurer le domaine**
   - Cloudflare Pages → Custom domain → Ajoute `tonsite.fr`
   - Suis les instructions DNS
   - HTTPS automatique en 1-2 minutes

4. **Redéployer après chaque modification**
   - `git add . && git commit -m "Update" && git push`
   - Cloudflare régénère et déploie automatiquement en ~2 minutes

---

## 📈 SEO — Référencement Google

### Soumettre à Google Search Console

1. Va sur [search.google.com/search-console](https://search.google.com/search-console)
2. Ajoute ta propriété (ton domaine)
3. Vérifie la propriété (via DNS ou fichier HTML)
4. Va dans **Sitemaps** → soumets `https://tonsite.fr/sitemap.xml`
5. Attends 2-7 jours pour les premiers résultats d'indexation

### Suivre l'indexation

- **Couverture** → voir combien de pages sont indexées
- **Performances** → voir les requêtes et clics
- **Expérience** → Core Web Vitals

### Ce qui est déjà optimisé

- ✅ Balises `<title>` uniques par page
- ✅ Meta description unique par page
- ✅ Canonical URL
- ✅ hreflang FR ↔ EN + x-default
- ✅ JSON-LD FAQ + Breadcrumb
- ✅ Sitemap XML complet (~44 000 URLs)
- ✅ robots.txt
- ✅ URL hiérarchiques (`/fr/longueur/...`)
- ✅ Maillage interne (10 liens par page)
- ✅ Contenu unique par catégorie (intro, exemples, erreurs, astuces, FAQ)
- ✅ Open Graph + Twitter Card
- ✅ Favicon SVG

---

## 💰 Monétisation AdSense

### Prérequis pour être accepté

- ✅ Site en ligne avec HTTPS
- ✅ Pages légales complètes (mentions, confidentialité, contact, à propos)
- ✅ Bandeau cookies RGPD
- ✅ Contenu unique (déjà en place)
- ✅ Navigation claire
- ✅ Pas de contenu interdit (santé, finance, adulte, etc.)

### Étapes

1. Créer un compte sur [adsense.google.com](https://adsense.google.com)
2. Ajouter ton site
3. Attendre la validation (1 à 4 semaines)
4. Une fois validé, récupérer ton ID (`ca-pub-XXXXX`) et les slots
5. Remplir les 4 lignes dans `src/ads.js`
6. Upload `ads.js` sur Cloudflare Pages (ou régénérer + push)

### Types de pubs affichées

| Choix visiteur | Type | Revenus |
|---|---|---|
| Pas encore choisi | Placeholder (gris) | ❌ |
| **Tout accepter** | Pubs personnalisées | 💰💰 |
| **Refuser** | Pubs non personnalisées (NPA) | 💰 |

### RPM estimé (France)

- Site utilitaire : **1,5 à 2,5 €** par 1 000 pages vues
- Avec NPA activé : +50 % de vues monétisées

---

## 📱 Responsive

Le site est **100 % responsive** :

- **Desktop** (> 1100px) : 2 pubs latérales + 3 inline
- **Tablette** (900-1100px) : pas de latérales, 3 inline
- **Mobile** (< 900px) : menu en dessous, footer en 1 colonne, 3 inline

---

## 🔒 RGPD / Cookies

- Bandeau cookies au premier chargement
- 2 boutons équivalents : **Refuser** / **Tout accepter**
- Choix mémorisé dans `localStorage`
- Pas de cookie AdSense tant que le visiteur n'a pas accepté
- Lien vers la politique de confidentialité
- Si refus : pubs **non personnalisées** (NPA) quand même affichées → tu gagnes quand même

---

## 🐛 Résolution de problèmes

### `node generate.js` plante

- Vérifie que Node.js est installé : `node -v`
- Vérifie que tu es dans le bon dossier : `dir`
- Regarde la ligne d'erreur indiquée, c'est souvent une apostrophe non échappée

### Les pages ne s'affichent pas

- Vérifie que `public/` existe et n'est pas vide
- Vérifie que tu lances bien `npx serve public`
- Ouvre `http://localhost:3000` (pas `file://`)

### Le CSS ne se charge pas

- Vérifie que `src/style.css` n'est pas vide
- Vérifie que le lien est bien `/style.css` (avec slash au début)
- Vide le cache : `Ctrl + F5`

### Le bandeau cookies réapparaît à chaque fois

- Vérifie que `localStorage` n'est pas bloqué (navigation privée)
- F12 → Application → Local Storage → cherche `cookie_consent`

### AdSense ne s'affiche pas

- Vérifie que `ADSENSE_CLIENT` est bien rempli (`ca-pub-XXXX`)
- Vérifie que `ADSENSE_SLOT_*` sont remplis
- Vérifie que tu as bien accepté les cookies (sinon NPA)
- Attends 24h après validation AdSense (délai habituel)

---

## 📅 Roadmap / À faire

### Phase 1 — Mise en ligne ✅
- [x] Générer les 44 000 pages
- [x] Tester en local
- [ ] Acheter un domaine
- [ ] Déployer sur Cloudflare Pages
- [ ] Soumettre à Google Search Console

### Phase 2 — Monétisation (M+1)
- [ ] Créer un compte AdSense
- [ ] Attendre la validation
- [ ] Remplir `src/ads.js`
- [ ] Suivre les revenus

### Phase 3 — Trafic (M+3)
- [ ] Créer un convertisseur universel (page unique)
- [ ] Poster sur Reddit, Hacker News, Quora
- [ ] Ajouter des backlinks (annuaires, forums)

### Phase 4 — Optimisation (M+6)
- [ ] Analyser les stats Search Console
- [ ] Ajouter des catégories selon la demande
- [ ] Optimiser les pubs (A/B testing)
- [ ] Passer à Ezoic (à 10k visites/mois)

---

## 📞 Contact

- **Auteur** : Kayroxen
- **Email** : Karoxen.dev@gmail.com
- **Site** : https://tonsite.fr

---

## 📄 Licence

Projet personnel. Tous droits réservés.