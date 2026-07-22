// VisionX — melhorias de UX: barra de progresso, WhatsApp, voltar-ao-topo, cookies (LGPD)
(function () {
  var WHATS = 'https://wa.me/5599984680391?text=' + encodeURIComponent('Olá! Vim pelo site da VisionX e quero um orçamento.');
  var CY = '#00d4ff';

  var css = document.createElement('style');
  css.textContent =
    '.vx-progress{position:fixed;top:0;left:0;height:3px;width:0;background:' + CY + ';z-index:9999;transition:width .1s ease-out}' +
    '.vx-fab{position:fixed;right:22px;z-index:9998;display:flex;align-items:center;justify-content:center;border-radius:50%;box-shadow:0 6px 22px rgba(0,0,0,.22);cursor:pointer;text-decoration:none;transition:transform .2s ease,opacity .3s ease}' +
    '.vx-fab:hover{transform:scale(1.08)}' +
    '.vx-whats{bottom:22px;width:58px;height:58px;background:#25D366}' +
    '.vx-top{bottom:92px;width:46px;height:46px;background:#0a0e14;opacity:0;pointer-events:none}' +
    '.vx-top.show{opacity:1;pointer-events:auto}' +
    '.vx-cookie{position:fixed;left:22px;bottom:22px;max-width:420px;z-index:9998;background:#0f1622;color:#e7ecf2;border:1px solid #1b2430;border-radius:16px;padding:20px 22px;box-shadow:0 10px 40px rgba(0,0,0,.35);font:14px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif;transform:translateY(140%);transition:transform .45s cubic-bezier(.22,1,.36,1)}' +
    '.vx-cookie.show{transform:none}' +
    '.vx-cookie h4{margin:0 0 6px;font-size:15px;color:#fff}' +
    '.vx-cookie a{color:' + CY + ';text-decoration:none}.vx-cookie a:hover{text-decoration:underline}' +
    '.vx-cookie-btns{display:flex;gap:10px;margin-top:14px}' +
    '.vx-btn{flex:1;padding:9px 12px;border-radius:9px;border:0;font:inherit;font-weight:600;font-size:13px;cursor:pointer}' +
    '.vx-btn.p{background:' + CY + ';color:#04121a}.vx-btn.s{background:transparent;color:#9fb0c2;border:1px solid #2a3646}' +
    '@media(max-width:560px){.vx-cookie{left:12px;right:12px;bottom:12px;max-width:none}}' +
    '.vx-skip{position:fixed;left:-999px;top:10px;z-index:10000;background:#0a0e14;color:#fff;padding:10px 18px;border-radius:9px;text-decoration:none;font:600 14px system-ui}.vx-skip:focus{left:10px}' +
    'a:focus-visible,button:focus-visible,input:focus-visible,select:focus-visible,textarea:focus-visible{outline:2px solid ' + CY + ';outline-offset:2px}';
  document.head.appendChild(css);

  document.addEventListener('DOMContentLoaded', function () {
    // 0) acessibilidade: pular para o conteúdo
    var main = document.querySelector('main');
    if (main) {
      if (!main.id) main.id = 'conteudo';
      var skip = document.createElement('a');
      skip.className = 'vx-skip'; skip.href = '#conteudo'; skip.textContent = 'Pular para o conteúdo';
      document.body.insertBefore(skip, document.body.firstChild);
    }

    // 1) barra de progresso do scroll
    var bar = document.createElement('div'); bar.className = 'vx-progress'; document.body.appendChild(bar);

    // 2) botão WhatsApp flutuante
    var wa = document.createElement('a');
    wa.className = 'vx-fab vx-whats'; wa.href = WHATS; wa.target = '_blank'; wa.rel = 'noopener';
    wa.setAttribute('aria-label', 'Falar no WhatsApp');
    wa.innerHTML = '<svg width="30" height="30" viewBox="0 0 24 24" fill="#fff"><path d="M.057 24l1.687-6.163a11.867 11.867 0 01-1.587-5.946C.16 5.335 5.495 0 12.05 0a11.817 11.817 0 018.413 3.488 11.824 11.824 0 013.48 8.414c-.003 6.557-5.338 11.892-11.893 11.892a11.9 11.9 0 01-5.688-1.448L.057 24zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884a9.86 9.86 0 001.51 5.26l-.999 3.648 3.727-.607zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.612-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/></svg>';
    document.body.appendChild(wa);

    // 3) voltar ao topo
    var top = document.createElement('button');
    top.className = 'vx-fab vx-top'; top.type = 'button'; top.setAttribute('aria-label', 'Voltar ao topo');
    top.innerHTML = '<svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#00d4ff" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"><path d="M18 15l-6-6-6 6"/></svg>';
    top.addEventListener('click', function () { window.scrollTo({ top: 0, behavior: 'smooth' }); });
    document.body.appendChild(top);

    function onScroll() {
      var h = document.documentElement, sc = h.scrollTop || document.body.scrollTop;
      var max = (h.scrollHeight - h.clientHeight) || 1;
      bar.style.width = (sc / max * 100) + '%';
      top.classList.toggle('show', sc > 400);
    }
    window.addEventListener('scroll', onScroll, { passive: true }); onScroll();

    // 4) banner de cookies (LGPD)
    var consent = null; try { consent = localStorage.getItem('vx-cookie-consent'); } catch (e) {}
    if (!consent) {
      var c = document.createElement('div');
      c.className = 'vx-cookie';
      c.innerHTML =
        '<h4>🍪 Cookies & privacidade</h4>' +
        '<div>Usamos cookies e dados para melhorar a sua experiência, lembrar o idioma e entender o uso do site. ' +
        'Veja a <a href="/privacidade/">Política de Privacidade</a>.</div>' +
        '<div class="vx-cookie-btns">' +
        '<button class="vx-btn p" data-a="accepted">Aceitar</button>' +
        '<button class="vx-btn s" data-a="rejected">Recusar</button></div>';
      document.body.appendChild(c);
      setTimeout(function () { c.classList.add('show'); }, 600);
      c.querySelectorAll('[data-a]').forEach(function (b) {
        b.addEventListener('click', function () {
          try { localStorage.setItem('vx-cookie-consent', b.getAttribute('data-a')); } catch (e) {}
          c.classList.remove('show'); setTimeout(function () { c.remove(); }, 450);
          if (b.getAttribute('data-a') === 'accepted' && window.vxOnConsent) window.vxOnConsent();
        });
      });
    }
  });
})();
