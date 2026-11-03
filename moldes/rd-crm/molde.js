/* Comportamento do molde rd-crm na página vestida (02/11/2026): as abas de telas (a referência usa o Splide;
   aqui é troca de painel sem trilho), o "Ver mais perguntas (+N)" com N contado, a reserva do <details name>
   (abrir uma pergunta fecha a outra), o índice do artigo aceso pela rolagem e o revelar ao entrar.
   Sem dependência; respeita "menos movimento"; sem JS, todo o conteúdo continua à vista. */
(function () {
  var raiz = document.querySelector('.mx-rd-crm.mx-vestido');
  if (!raiz) return;
  var menos = window.matchMedia && matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---------- abas ---------- */
  raiz.querySelectorAll('.bsl-slider-tabs').forEach(function (sec) {
    var abas = [].slice.call(sec.querySelectorAll('[role="tab"]'));
    var telas = [].slice.call(sec.querySelectorAll('[role="tabpanel"]'));
    if (!abas.length) return;
    var atual = Math.max(0, abas.findIndex(function (a) { return a.getAttribute('aria-selected') === 'true'; }));
    var tocou = false, timer = null;
    function ir(i, foco) {
      atual = (i + abas.length) % abas.length;
      abas.forEach(function (a, k) {
        var on = k === atual;
        a.classList.toggle('active', on);
        a.setAttribute('aria-selected', on ? 'true' : 'false');
        a.tabIndex = on ? 0 : -1;
      });
      telas.forEach(function (t, k) {
        var on = k === atual;
        t.classList.toggle('is-active', on);
        t.classList.toggle('is-visible', on);
        if (on) t.removeAttribute('hidden'); else t.setAttribute('hidden', '');
      });
      if (foco) abas[atual].focus();
    }
    abas.forEach(function (a, k) {
      a.addEventListener('click', function () { tocou = true; parar(); ir(k); });
      a.addEventListener('keydown', function (ev) {
        var d = ev.key === 'ArrowRight' ? 1 : ev.key === 'ArrowLeft' ? -1 : 0;
        if (ev.key === 'Home') { ev.preventDefault(); tocou = true; parar(); ir(0, true); }
        else if (ev.key === 'End') { ev.preventDefault(); tocou = true; parar(); ir(abas.length - 1, true); }
        else if (d) { ev.preventDefault(); tocou = true; parar(); ir(atual + d, true); }
      });
    });
    ir(atual);
    /* troca sozinha enquanto a seção está à vista, até a pessoa tocar numa aba (como a referência) */
    function parar() { if (timer) { clearInterval(timer); timer = null; } }
    if (!menos && 'IntersectionObserver' in window) {
      new IntersectionObserver(function (es) {
        es.forEach(function (e) {
          if (e.isIntersecting && !tocou && !timer) timer = setInterval(function () { if (!document.hidden) ir(atual + 1); }, 5000);
          else if (!e.isIntersecting) parar();
        });
      }, { threshold: 0.4 }).observe(sec);
      sec.addEventListener('pointerenter', parar);
    }
  });

  /* ---------- FAQ: ver mais (+N contado) e um aberto por vez ---------- */
  raiz.querySelectorAll('.bsl-faq').forEach(function (sec) {
    var botao = sec.querySelector('.mx-faq-mais');
    if (botao) {
      var extras = sec.querySelectorAll('.mx-faq-extra');
      if (!extras.length) botao.remove();
      else {
        botao.textContent = 'Ver mais perguntas (+' + extras.length + ')';
        botao.addEventListener('click', function () {
          sec.classList.add('mx-faq-aberto');
          botao.setAttribute('aria-expanded', 'true');
          var primeira = extras[0].querySelector('summary');
          botao.remove();
          if (primeira) primeira.focus();
        });
      }
    }
    var itens = [].slice.call(sec.querySelectorAll('details'));
    itens.forEach(function (d) {
      d.addEventListener('toggle', function () {
        if (!d.open) return;
        itens.forEach(function (o) { if (o !== d && o.open) o.open = false; });
      });
    });
  });
  /* pergunta aberta pelo endereço (#...) que esteja atrás do "ver mais" */
  if (location.hash) {
    var alvo = document.getElementById(decodeURIComponent(location.hash.slice(1)));
    if (alvo && alvo.closest && alvo.closest('.mx-faq-extra')) {
      var s = alvo.closest('.bsl-faq'); s.classList.add('mx-faq-aberto');
      var b = s.querySelector('.mx-faq-mais'); if (b) b.remove();
    }
  }

  /* ---------- índice do artigo: aceso pelo painel que contém o meio da tela ---------- */
  var toc = raiz.querySelector('.mx-toc');
  if (toc) {
    var links = [].slice.call(toc.querySelectorAll('a[href^="#"]'));
    var alvos = links.map(function (a) { return document.getElementById(decodeURIComponent(a.getAttribute('href').slice(1))); });
    var pendente = false;
    function acender() {
      pendente = false;
      var meio = innerHeight / 2, k = -1;
      alvos.forEach(function (el, i) { if (el && el.getBoundingClientRect().top <= meio) k = i; });
      links.forEach(function (a, i) { a.classList.toggle('mx-aceso', i === k); if (i === k) a.setAttribute('aria-current', 'true'); else a.removeAttribute('aria-current'); });
    }
    addEventListener('scroll', function () { if (!pendente) { pendente = true; requestAnimationFrame(acender); } }, { passive: true });
    acender();
  }

  /* ---------- revelar ao entrar, com escalonamento entre irmãos ---------- */
  if ('IntersectionObserver' in window) {
    var grupos = raiz.querySelectorAll('#recursos .cards-wrapper, .bsl-topics-list .topics-wrapper, .mx-ia-botoes');
    var alvosR = [];
    grupos.forEach(function (g) {
      [].slice.call(g.children).forEach(function (el, i) { el.classList.add('mx-revelar'); el.style.setProperty('--i', String(i % 6)); alvosR.push(el); });
    });
    raiz.querySelectorAll(':scope > section:not(.mx-hero) .section-header, :scope > section:not(.mx-hero) .header').forEach(function (el) { el.classList.add('mx-revelar'); alvosR.push(el); });
    var io = new IntersectionObserver(function (es) {
      es.forEach(function (e) { if (e.isIntersecting) { e.target.classList.add('mx-visto'); io.unobserve(e.target); } });
    }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });
    alvosR.forEach(function (el) { io.observe(el); });
    raiz.classList.add('mx-js');
  }
})();
