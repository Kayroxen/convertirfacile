(function () {
  var input = document.getElementById('recherche');
  var resultats = document.getElementById('resultats');
  if (!input || !resultats) return;

  var path = window.location.pathname;
  var lang = path.indexOf('/en/') === 0 ? 'en' : 'fr';
  var index = null;

  fetch('/search-index-' + lang + '.json')
    .then(function (r) { return r.json(); })
    .then(function (data) { index = data; })
    .catch(function () {});

  function normaliser(s) {
    return String(s).toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '');
  }

  input.addEventListener('input', function () {
    var q = normaliser(input.value.trim());
    if (!index || q.length < 2) {
      resultats.innerHTML = '';
      resultats.style.display = 'none';
      return;
    }
    var trouves = [];
    for (var i = 0; i < index.length && trouves.length < 8; i++) {
      if (normaliser(index[i].t).indexOf(q) !== -1) trouves.push(index[i]);
    }
    if (trouves.length === 0) {
      resultats.innerHTML = '<div class="aucun">' + (lang === 'fr' ? 'Aucun résultat' : 'No results') + '</div>';
    } else {
      resultats.innerHTML = trouves.map(function (r) {
        return '<a href="' + r.u + '">' + r.t + ' <small>' + r.c + '</small></a>';
      }).join('');
    }
    resultats.style.display = 'block';
  });

  document.addEventListener('click', function (e) {
    if (!input.contains(e.target) && !resultats.contains(e.target)) {
      resultats.style.display = 'none';
    }
  });
})();

// ============================================================
// BOUTON RETOUR EN HAUT
// ============================================================
(function () {
  // Créer le bouton
  var btn = document.createElement('button');
  btn.className = 'back-to-top';
  btn.type = 'button';
  btn.setAttribute('aria-label', 'Retour en haut');
  btn.innerHTML = '<svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><polyline points="18 15 12 9 6 15"></polyline></svg>';
  document.body.appendChild(btn);

  // Afficher/masquer selon le scroll
  var seuil = 400;
  function verifierScroll() {
    if (window.scrollY > seuil) {
      btn.classList.add('visible');
    } else {
      btn.classList.remove('visible');
    }
  }

  // Throttle pour la performance
  var ticking = false;
  window.addEventListener('scroll', function () {
    if (!ticking) {
      window.requestAnimationFrame(function () {
        verifierScroll();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });

  // Clic → remonter en haut
  btn.addEventListener('click', function () {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });

  // État initial
  verifierScroll();
})();