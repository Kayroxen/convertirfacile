(function () {
  var CONSENT_KEY = 'cookie_consent';
  var consent = null;
  try { consent = localStorage.getItem(CONSENT_KEY); } catch (e) {}

  var lang = (document.documentElement.lang || 'fr').toLowerCase();
  var isFr = lang.indexOf('fr') === 0;

  var txt = isFr ? {
    titre: '🍪 Ce site utilise des cookies',
    message: 'Nous utilisons Google AdSense pour afficher des publicités. Vous pouvez accepter ou refuser.',
    accepter: 'Tout accepter',
    refuser: 'Refuser',
    lien: 'En savoir plus'
  } : {
    titre: '🍪 This site uses cookies',
    message: 'We use Google AdSense to display ads. You can accept or refuse.',
    accepter: 'Accept all',
    refuser: 'Refuse',
    lien: 'Learn more'
  };

  var lienUrl = isFr ? '/fr/politique-confidentialite.html' : '/en/privacy.html';

  function creerBanniere() {
    var div = document.createElement('div');
    div.className = 'cookie-banner';
    div.innerHTML =
      '<div class="cookie-inner">' +
        '<div class="cookie-texte">' +
          '<strong>' + txt.titre + '</strong>' +
          '<p>' + txt.message + ' <a href="' + lienUrl + '">' + txt.lien + '</a></p>' +
        '</div>' +
        '<div class="cookie-actions">' +
          '<button type="button" class="cookie-btn cookie-btn-refuse" data-action="refuse">' + txt.refuser + '</button>' +
          '<button type="button" class="cookie-btn cookie-btn-accept" data-action="accept">' + txt.accepter + '</button>' +
        '</div>' +
      '</div>';
    document.body.appendChild(div);

    div.querySelectorAll('button').forEach(function (btn) {
      btn.addEventListener('click', function () {
        var action = btn.getAttribute('data-action');
        try { localStorage.setItem(CONSENT_KEY, action); } catch (e) {}
        div.classList.add('cookie-hidden');
        setTimeout(function () { div.remove(); }, 300);

        if (typeof window.__chargerAdsense === 'function') {
          if (action === 'accept') {
            window.__chargerAdsense(false);  // Pubs personnalisées
          } else if (action === 'refuse') {
            window.__chargerAdsense(true);   // Pubs non personnalisées
          }
        }
      });
    });
  }

  function init() {
    if (!consent) {
      // Pas encore de choix → afficher le bandeau
      creerBanniere();
    } else if (typeof window.__chargerAdsense === 'function') {
      if (consent === 'accept') {
        window.__chargerAdsense(false);
      } else if (consent === 'refuse') {
        window.__chargerAdsense(true);
      }
    }
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }
})();