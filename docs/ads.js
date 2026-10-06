// ============================================================
// CONFIG ADSENSE
// Remplis ces valeurs quand tu auras ton compte AdSense.
// Laisse vide pour afficher les placeholders de test.
// ============================================================

const ADSENSE_CLIENT = '';
const ADSENSE_SLOT_HORIZONTAL = '';
const ADSENSE_SLOT_RECTANGLE = '';
const ADSENSE_SLOT_SKYSCRAPER = '';

// ============================================================
// NE PAS TOUCHER EN DESSOUS
// ============================================================

(function () {
  const CONSENT_KEY = 'cookie_consent';
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  const actif = ADSENSE_CLIENT && ADSENSE_CLIENT.startsWith('ca-pub-');
  const slots = {
    horizontal: ADSENSE_SLOT_HORIZONTAL,
    rectangle: ADSENSE_SLOT_RECTANGLE,
    skyscraper: ADSENSE_SLOT_SKYSCRAPER,
  };

  function remplirPlaceholder(div) {
    const format = div.dataset.adFormat || 'horizontal';
    div.innerHTML =
      '<span>Publicité</span><small>' +
      (format === 'horizontal' ? '728×90' : format === 'rectangle' ? '336×280' : '160×600') +
      '</small>';
  }

  function remplirVraieAd(div, nonPersonnalisee) {
    const format = div.dataset.adFormat || 'horizontal';
    if (!slots[format]) {
      remplirPlaceholder(div);
      return;
    }
    const ins = document.createElement('ins');
    ins.className = 'adsbygoogle';
    ins.style.display = 'block';
    ins.setAttribute('data-ad-client', ADSENSE_CLIENT);
    ins.setAttribute('data-ad-slot', slots[format]);
    ins.setAttribute('data-ad-format', 'auto');
    ins.setAttribute('data-full-width-responsive', 'true');
    if (nonPersonnalisee) {
      ins.setAttribute('data-npa', '1');
    }
    div.innerHTML = '';
    div.appendChild(ins);
    try { (window.adsbygoogle = window.adsbygoogle || []).push({}); } catch (e) {}
  }

  function chargerAdsense(nonPersonnalisee) {
    if (actif && !document.querySelector('script[src*="adsbygoogle"]')) {
      const s = document.createElement('script');
      s.async = true;
      s.src = 'https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=' + ADSENSE_CLIENT;
      s.crossOrigin = 'anonymous';
      document.head.appendChild(s);
    }

    document.querySelectorAll('.ad[data-ad-format]').forEach(function (div) {
      if (actif) remplirVraieAd(div, nonPersonnalisee);
      else remplirPlaceholder(div);
    });
  }

  // Exposé pour que cookies.js puisse le déclencher après acceptation/refus
  window.__chargerAdsense = function (nonPerso) { chargerAdsense(nonPerso); };

  function init() {
    if (consent === 'accept') {
      chargerAdsense(false);        // Pubs personnalisées
    } else if (consent === 'refuse') {
      chargerAdsense(true);         // Pubs non personnalisées (légal RGPD)
    } else {
      // Pas encore de choix : placeholders seulement
      document.querySelectorAll('.ad[data-ad-format]').forEach(remplirPlaceholder);
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();