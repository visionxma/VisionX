// VisionX — aplica o conteúdo configurável do painel (/api/settings) no site:
// contatos/redes, textos do hero e mostrar/ocultar seções da home. Tudo sem tocar no código.
(function () {
  function apply(s) {
    if (!s) return;

    // ---- CONTATOS & REDES (troca em qualquer link do site) ----
    if (s.contato_email) {
      document.querySelectorAll('a[href^="mailto:"]').forEach(function (a) {
        var txt = (a.textContent || '').trim();
        a.setAttribute('href', 'mailto:' + s.contato_email);
        if (/@/.test(txt)) a.textContent = s.contato_email;
      });
    }
    if (s.contato_whatsapp) {
      var num = String(s.contato_whatsapp).replace(/\D/g, '');
      document.querySelectorAll('a[href*="wa.me/"]').forEach(function (a) {
        a.href = a.href.replace(/wa\.me\/\d+/, 'wa.me/' + num);
      });
    }
    if (s.rede_instagram) {
      var ig = String(s.rede_instagram).replace(/^@/, '').replace(/\/+$/, '');
      document.querySelectorAll('a[href*="instagram.com"]').forEach(function (a) { a.href = 'https://www.instagram.com/' + ig + '/'; });
    }
    if (s.rede_linkedin) {
      document.querySelectorAll('a[href*="linkedin.com"]').forEach(function (a) { a.href = s.rede_linkedin; });
    }
    if (s.rede_github) {
      var gh = String(s.rede_github).replace(/^@/, '').replace(/\/+$/, '');
      document.querySelectorAll('a[href*="github.com"]').forEach(function (a) { a.href = 'https://github.com/' + gh; });
    }

    // ---- TEXTOS (data-vx) — só troca se mudou de verdade, pra preservar estilo/quebras ----
    // compara ignorando espaços/quebras: se o valor salvo é o mesmo texto do HTML (ex.: hero
    // com <br> e <span>), NÃO mexe — assim a marcação estilizada não é destruída à toa.
    function normTxt(x) { return String(x == null ? '' : x).replace(/\s+/g, ' ').trim(); }
    document.querySelectorAll('[data-vx]').forEach(function (el) {
      var v = s[el.getAttribute('data-vx')];
      if (v == null || v === '') return;
      if (normTxt(el.textContent) === normTxt(v)) return;
      el.textContent = v;
    });

    // ---- NÚMEROS (contador animado): atualiza o texto e o alvo do contador ----
    document.querySelectorAll('[data-vx-num]').forEach(function (el) {
      var v = s[el.getAttribute('data-vx-num')];
      if (v == null || v === '') return;
      var digits = String(v).replace(/\D/g, '') || String(v);
      el.textContent = digits; // só os dígitos (o "+"/"%" é um elemento irmão)
      el.setAttribute('fs-numbercount-end', digits); // mantém o "comeca" do HTML (0) pra animar
    });

    // ---- TEXTO DO BOTÃO CTA (mantém consistente em todos os "Começar agora") ----
    if (s.hero_botao) {
      document.querySelectorAll('.text_button').forEach(function (el) {
        if ((el.textContent || '').trim() === 'Começar agora') el.textContent = s.hero_botao;
      });
    }

    // ---- IMAGENS (trocadas pelo painel) ----
    function setSrc(sel, val) { if (!val) return; document.querySelectorAll(sel).forEach(function (el) { el.setAttribute('src', val); }); }
    function setBg(sel, val) { if (!val) return; document.querySelectorAll(sel).forEach(function (el) { el.style.setProperty('background-image', 'url(' + val + ')', 'important'); }); }
    setSrc('[data-hero-bg]', s.img_hero);
    if (s.img_logo) document.querySelectorAll('img[src*="logo.png"]').forEach(function (el) { el.setAttribute('src', s.img_logo); });
    if (s.img_servicos_hero) document.querySelectorAll('img[src*="h-service"]').forEach(function (el) { el.setAttribute('src', s.img_servicos_hero); });
    if (s.img_contato) document.querySelectorAll('img[src*="contact-bg"]').forEach(function (el) { el.setAttribute('src', s.img_contato); });
    if (s.img_card_sites) document.querySelectorAll('img[src*="_service-img.webp"]').forEach(function (el) { el.setAttribute('src', s.img_card_sites); });
    if (s.img_card_sistemas) document.querySelectorAll('img[src*="_service-img-2.webp"]').forEach(function (el) { el.setAttribute('src', s.img_card_sistemas); });
    if (s.img_card_marketing) document.querySelectorAll('img[src*="_service-img-3.webp"]').forEach(function (el) { el.setAttribute('src', s.img_card_marketing); });
    setBg('.h-about_img,.h-abou_wrap', s.img_sobre);
    if (s.img_cta) document.querySelectorAll('.call-to_card,.cta-wrap,.cta_wrap').forEach(function (el) { el.style.setProperty('background-image', 'linear-gradient(90deg,rgba(6,10,18,.88) 0%,rgba(6,10,18,.60) 55%,rgba(6,10,18,.38) 100%),url(' + s.img_cta + ')', 'important'); });

    // ---- SEÇÕES: oculta as desligadas ----
    // (a) home — mapa por classe
    var p = location.pathname;
    var isHome = (p === '/' || p === '/index.html' || p === '');
    if (isHome) {
      var map = {
        sec_logos: '.section_loop', sec_sobre: '.section_about', sec_servicos: '.section_services',
        sec_expertise: '.section_expertise', sec_depoimentos: '.section_depoimentos',
        sec_blog: '.section_blog', sec_cta: '.section_cta'
      };
      Object.keys(map).forEach(function (k) {
        if (String(s[k]) === '0') document.querySelectorAll(map[k]).forEach(function (el) { el.style.display = 'none'; });
      });
    }
    // (b) qualquer página — seções marcadas com data-vx-section (chave = "sec_" + valor)
    document.querySelectorAll('[data-vx-section]').forEach(function (el) {
      if (String(s['sec_' + el.getAttribute('data-vx-section')]) === '0') el.style.display = 'none';
    });
  }

  fetch('/api/settings')
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (s) { apply(s); setTimeout(function () { apply(s); }, 900); }) // 2ª passada pega o botão do WhatsApp injetado depois
    .catch(function () {});
})();
