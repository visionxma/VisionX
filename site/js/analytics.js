/* ============================================================
   VisionX — camada de medicao
   ------------------------------------------------------------
   O site nao tinha NENHUMA medicao: nem analytics, nem pixel.
   Sem isso nao da para saber de onde vem visita, qual servico
   e procurado, nem se o formulario de contato converte.

   Este arquivo nao escolhe fornecedor. Ele:
     1. empurra todo evento para window.dataLayer (padrao GTM);
     2. repassa para gtag() quando o GA4 estiver presente;
     3. carrega o gtag.js sozinho quando GA4_ID for preenchido.

   ATIVO desde 08/09/2026: propriedade "VisionX" (properties/553096510),
   fluxo de dados web "visionxma.com", ID de metrica preenchido abaixo.
   Propriedade separada da do FroX de proposito — sao negocios diferentes
   e um relatorio nao pode contaminar o outro.

   Se algum dia precisar desligar a medicao, basta esvaziar GA4_ID:
   sem ele o arquivo nao faz requisicao nem cria cookie.

   Regra deste arquivo: medicao nunca pode quebrar a pagina.
   Tudo roda dentro de try/catch.
   ============================================================ */
(function () {
  'use strict';

  var GA4_ID = 'G-WLDYLZDEKX';   /* propriedade "VisionX" (553096510), fluxo visionxma.com */
  var GTM_ID = '';   /* container do GTM, se um dia usarem */

  /* Dominios onde a medicao vale. Fora deles nada e carregado —
     evita poluir o relatorio com localhost e preview de deploy. */
  var DOMINIOS = ['visionxma.com', 'www.visionxma.com'];

  try {
    var host = location.hostname;
    var valido = DOMINIOS.some(function (d) { return host === d; });

    window.dataLayer = window.dataLayer || [];
    function gtag() { window.dataLayer.push(arguments); }
    window.vxTrack = function (evento, dados) {
      try { window.dataLayer.push(Object.assign({ event: evento }, dados || {})); } catch (e) {}
      try { if (window.gtag) window.gtag('event', evento, dados || {}); } catch (e) {}
    };

    if (!valido) return;

    if (GA4_ID) {
      var s = document.createElement('script');
      s.async = true;
      s.src = 'https://www.googletagmanager.com/gtag/js?id=' + GA4_ID;
      document.head.appendChild(s);
      window.gtag = gtag;
      gtag('js', new Date());
      gtag('config', GA4_ID);
    }

    if (GTM_ID) {
      var g = document.createElement('script');
      g.async = true;
      g.src = 'https://www.googletagmanager.com/gtm.js?id=' + GTM_ID;
      document.head.appendChild(g);
    }

    /* Eventos que respondem as perguntas do negocio: qual servico
       interessa, e quem tentou falar com a gente. */
    document.addEventListener('click', function (ev) {
      try {
        var a = ev.target && ev.target.closest ? ev.target.closest('a') : null;
        if (!a || !a.href) return;

        if (/wa\.me|whatsapp/i.test(a.href)) {
          window.vxTrack('clique_whatsapp', { destino: a.href });
        } else if (/^mailto:/i.test(a.href)) {
          window.vxTrack('clique_email', { destino: a.href });
        } else if (/\/servicos\//.test(a.href)) {
          window.vxTrack('clique_servico', { servico: a.getAttribute('href') });
        } else if (/\/contact\//.test(a.href)) {
          window.vxTrack('clique_contato', {});
        }
      } catch (e) {}
    }, true);

    document.addEventListener('submit', function (ev) {
      try {
        var f = ev.target;
        if (f && f.tagName === 'FORM') {
          window.vxTrack('envio_formulario', { formulario: f.getAttribute('id') || f.getAttribute('name') || 'sem-nome' });
        }
      } catch (e) {}
    }, true);
  } catch (e) { /* medicao nunca quebra a pagina */ }
})();
