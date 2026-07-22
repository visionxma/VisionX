// VisionX — carrega a equipe do backend (/api/team) e renderiza os cards na página Sobre.
// Se a requisição falhar ou vier vazia, os cards estáticos do HTML permanecem (fallback).
(function () {
  var track = document.getElementById('vx-team-track');
  if (!track) return;

  function esc(s) { s = (s == null ? '' : String(s)); return s.replace(/[&<>"]/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]; }); }

  var ARROW = '<div class="arrow_button"><svg xmlns="http://www.w3.org/2000/svg" width="100%" viewBox="0 0 20 20" fill="none" class="icon-1x1-main"><path d="M13.0457 8.13128L5.8733 15.3037L4.69479 14.1252L11.8672 6.95277L5.54568 6.95277L5.54568 5.28636H14.7121V14.4528L13.0457 14.4528V8.13128Z" fill="currentColor"></path></svg></div>';

  function card(m) {
    var foto = m.foto || '';
    return '<div role="listitem" class="team_card-item w-dyn-item">'
      + '<a href="/contact" class="team_card scroll-right w-inline-block" style="background-color:rgb(236,236,236)">'
      + ARROW
      + '<div class="team_card-header"><div class="max-text is-name"><h3 class="h2 text-weight-semibold">' + esc(m.nome || '') + '</h3></div>'
      + '<div class="text-sm">' + esc(m.cargo || '') + '</div></div>'
      + '<div class="team_card-img"><img src="' + esc(foto) + '" loading="lazy" alt="' + esc(m.nome || '') + '" class="img"></div>'
      + '</a></div>';
  }

  fetch('/api/team')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (list) {
      if (!list || !list.length) return; // mantém o fallback estático
      track.innerHTML = list.map(card).join('');
    })
    .catch(function () { /* mantém o fallback estático */ });
})();
