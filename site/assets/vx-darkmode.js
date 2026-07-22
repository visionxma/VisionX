// VisionX — dark mode acionado pela lâmpada da seção "Sobre nós".
// Clique na lâmpada = "acende/apaga a luz" do site, com revelação circular
// saindo da própria lâmpada (View Transitions API) e persistência entre páginas.
(function () {
  var root = document.documentElement;
  var BULB = 'img.title-icon[src*="icon2"]';

  function isDark() { return root.classList.contains('vx-dark'); }
  function save(v) { try { localStorage.setItem('vx-theme', v); } catch (e) {} }
  function setTheme(dark) {
    root.classList.toggle('vx-dark', dark);
    save(dark ? 'dark' : 'light');
    document.querySelectorAll(BULB).forEach(function (b) {
      b.setAttribute('aria-pressed', dark ? 'true' : 'false');
      b.setAttribute('title', dark ? 'Voltar ao modo claro' : 'Ativar modo escuro');
    });
  }

  function toggle(bulb) {
    var dark = !isDark();
    var r = bulb.getBoundingClientRect();
    var x = r.left + r.width / 2, y = r.top + r.height / 2;

    // feedback tátil na lâmpada
    bulb.classList.remove('vx-pop'); void bulb.offsetWidth; bulb.classList.add('vx-pop');

    var reduce = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (document.startViewTransition && !reduce) {
      var vt = document.startViewTransition(function () { setTheme(dark); });
      vt.ready.then(function () {
        var end = Math.hypot(Math.max(x, innerWidth - x), Math.max(y, innerHeight - y));
        root.animate(
          { clipPath: ['circle(0px at ' + x + 'px ' + y + 'px)',
                       'circle(' + end + 'px at ' + x + 'px ' + y + 'px)'] },
          { duration: 640, easing: 'cubic-bezier(.4,0,.2,1)', pseudoElement: '::view-transition-new(root)' }
        );
      }).catch(function () {});
    } else {
      root.classList.add('vx-theme-anim');
      setTheme(dark);
      setTimeout(function () { root.classList.remove('vx-theme-anim'); }, 520);
    }
  }

  // deixa a lâmpada acessível (foco por teclado + rótulo)
  function prep() {
    document.querySelectorAll(BULB).forEach(function (b) {
      if (b.dataset.vxReady) return;
      b.dataset.vxReady = '1';
      b.setAttribute('role', 'button');
      b.setAttribute('tabindex', '0');
      b.setAttribute('aria-label', 'Alternar modo escuro do site');
      b.setAttribute('aria-pressed', isDark() ? 'true' : 'false');
      b.setAttribute('title', isDark() ? 'Voltar ao modo claro' : 'Ativar modo escuro');
    });
  }

  document.addEventListener('click', function (e) {
    var bulb = e.target.closest && e.target.closest(BULB);
    if (bulb) { e.preventDefault(); toggle(bulb); }
  });
  document.addEventListener('keydown', function (e) {
    if ((e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') &&
        e.target && e.target.matches && e.target.matches(BULB)) {
      e.preventDefault(); toggle(e.target);
    }
  });

  if (document.readyState !== 'loading') prep();
  else document.addEventListener('DOMContentLoaded', prep);
})();
