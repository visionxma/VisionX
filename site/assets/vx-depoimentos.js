// VisionX — carrega os depoimentos do backend (/api/depoimentos) e renderiza os cards na home.
// Se falhar/vier vazio, os cards estáticos do HTML permanecem (fallback).
(function () {
  var track = document.getElementById('vx-dep-track');
  if (!track) return;

  function esc(s) { s = (s == null ? '' : String(s)); return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var QSVG = '<svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 32 32" fill="none" class="icon-1x1-large"><path d="M3.33398 6.66797H14.6673V16.868L8.69132 25.3346H5.06065L8.61532 17.3346H3.33398V6.66797ZM17.334 6.66797H28.6673V16.868L22.6913 25.3346H19.0607L22.6153 17.3346H17.334V6.66797Z" fill="currentColor"></path></svg>';

  function card(d) {
    var img = d.foto ? '<img src="' + esc(d.foto) + '" loading="lazy" alt="" class="img">' : '';
    return '<div class="depoimentos_card">' + img
      + '<div class="blur-card"></div>'
      + '<div class="testimonial_card-container"><div class="card-black-gradient"></div>'
      + '<div class="relative text-color-on-primary">' + QSVG
      + '<div class="text-lg text-style-3lines">&quot;' + esc(d.texto || '') + '&quot;</div>'
      + '<div class="spacer-large"></div>'
      + '<div class="text-align-right">— ' + esc(d.autor || '') + '</div>'
      + '</div></div></div>';
  }

  fetch('/api/depoimentos')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (list) {
      if (!list || !list.length) return; // mantém o fallback estático
      track.innerHTML = list.map(card).join('');
    })
    .catch(function () {});
})();
