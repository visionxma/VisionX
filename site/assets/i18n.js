// VisionX — i18n no cliente (PT-BR · PT-PT · ES · EN)
(function () {
  var LANGS = [['pt-br', '🇧🇷 PT-BR'], ['pt', '🇵🇹 PT'], ['es', '🇪🇸 ES'], ['en', '🇬🇧 EN']];

  // PT-PT derivado do PT-BR (trocas de vocabulário)
  var PTPT = [
    [/sob medida/g, 'à medida'], [/aplicativos/g, 'aplicações'], [/aplicativo/g, 'aplicação'],
    [/\btime\b/g, 'equipa'], [/usuários/g, 'utilizadores'], [/usuário/g, 'utilizador'],
    [/planejamento/g, 'planeamento'], [/planejamos/g, 'planeámos'], [/estoque/g, 'stock'],
    [/\bContato\b/g, 'Contacto'], [/\bcontato\b/g, 'contacto'], [/gerenciamento/g, 'gestão']
  ];
  function toPTPT(s) { PTPT.forEach(function (r) { s = s.replace(r[0], r[1]); }); return s; }

  function tr(orig, lang) {
    var k = (orig || '').trim();
    if (!k || lang === 'pt-br') return orig;
    if (lang === 'pt') return orig.replace(k, toPTPT(k));
    var e = (window.VX_DICT || {})[k];
    return (e && e[lang]) ? orig.replace(k, e[lang]) : orig;
  }

  var nodes = [];
  function collect() {
    var w = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, {
      acceptNode: function (n) {
        if (!n.nodeValue || !/[A-Za-zÀ-ÿ]/.test(n.nodeValue)) return NodeFilter.FILTER_REJECT;
        var p = n.parentNode;
        if (!p || p.nodeName === 'SCRIPT' || p.nodeName === 'STYLE') return NodeFilter.FILTER_REJECT;
        if (p.closest && p.closest('.vx-lang-wrap')) return NodeFilter.FILTER_REJECT;
        return NodeFilter.FILTER_ACCEPT;
      }
    });
    var n; while (n = w.nextNode()) nodes.push({ node: n, orig: n.nodeValue });
    document.querySelectorAll('[placeholder]').forEach(function (el) {
      nodes.push({ ph: el, orig: el.getAttribute('placeholder') });
    });
    document._vxTitle = document.title;
  }

  function apply(lang) {
    nodes.forEach(function (o) {
      var t = tr(o.orig, lang);
      if (o.ph) o.ph.setAttribute('placeholder', t); else o.node.nodeValue = t;
    });
    if (document._vxTitle) document.title = tr(document._vxTitle, lang);
    document.documentElement.setAttribute('lang', lang === 'pt-br' ? 'pt-BR' : (lang === 'pt' ? 'pt-PT' : lang));
    try { localStorage.setItem('vx-lang', lang); } catch (e) {}
  }

  function buildSwitcher(cur) {
    var wrap = document.createElement('div');
    wrap.className = 'vx-lang-wrap';
    wrap.style.cssText = 'display:inline-flex;align-items:center;margin-right:12px';
    var sel = document.createElement('select');
    sel.setAttribute('aria-label', 'Idioma / Language');
    sel.style.cssText = 'padding:7px 9px;border-radius:9px;border:1px solid rgba(10,10,10,.15);background:#fff;color:#0a0a0a;font:inherit;font-size:13px;font-weight:500;cursor:pointer';
    LANGS.forEach(function (l) {
      var o = document.createElement('option');
      o.value = l[0]; o.textContent = l[1];
      if (l[0] === cur) o.selected = true;
      sel.appendChild(o);
    });
    sel.addEventListener('change', function () { apply(sel.value); });
    wrap.appendChild(sel);
    return wrap;
  }

  document.addEventListener('DOMContentLoaded', function () {
    var cur = 'pt-br';
    try { cur = localStorage.getItem('vx-lang') || 'pt-br'; } catch (e) {}
    collect();
    var host = document.querySelector('.nav_buttons-wrap') || document.querySelector('.navbar_content');
    if (host) host.insertBefore(buildSwitcher(cur), host.firstChild);
    if (cur !== 'pt-br') apply(cur);
  });
})();
