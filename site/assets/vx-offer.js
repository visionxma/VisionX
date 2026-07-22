// VisionX — Oferta relâmpago no ícone azul (seção "Sobre nós").
// Passar o mouse no ícone azul (icon1.svg) abre um popup: site por R$ 1.000,00,
// contador regressivo de 15s e botão de WhatsApp com mensagem pronta.
// Quando os 15s acabam, a oferta expira e NÃO reaparece (localStorage) —
// só volta se a pessoa limpar o cache/dados do site.
// Design nativo: usa os design tokens do site (adapta ao claro/escuro),
// eyebrow com quadradinho, botão em pílula e a mesma tipografia.
(function () {
  var K_DEADLINE = 'vx_offer_deadline';   // timestamp de expiração (setado no 1º hover)
  var K_EXPIRED = 'vx_offer_expired';      // '1' quando já acabou
  var DURATION = 15000;                    // 15 segundos
  var WA_DEFAULT = '5599984680391';
  var WA_MSG = 'Olá! Vim pela *oferta especial* — quero meu site por R$ 1.000,00! 🚀';

  function lget(k) { try { return localStorage.getItem(k); } catch (e) { return null; } }
  function lset(k, v) { try { localStorage.setItem(k, v); } catch (e) {} }

  if (lget(K_EXPIRED) === '1') return;                 // oferta já encerrada
  var icon = document.querySelector('img.title-icon[src*="icon1"]');
  if (!icon) return;

  // ---- estilos nativos (tokens do site; CSP já permite inline) ----
  var css = document.createElement('style');
  css.textContent = [
    'img.title-icon[src*="icon1"]{cursor:pointer;border-radius:50%;animation:vxof-breathe 2.6s ease-in-out infinite}',
    '@keyframes vxof-breathe{0%,100%{transform:scale(1)}50%{transform:scale(1.15)}}',
    'img.title-icon.vxof-done{animation:none;cursor:default}',
    '.vxof{position:absolute;z-index:99998;width:314px;max-width:calc(100vw - 24px);padding:24px 24px 22px;border-radius:22px;',
    'background:var(--bg-color--bg-white,#fff);border:5px solid var(--bg-color--bg-primary,#f2f2f2);',
    'box-shadow:0 6px 14px rgba(0,0,0,.07),0 22px 48px rgba(0,0,0,.16);color:var(--text-color--text-primary,#131313);',
    "font-family:'Plus Jakarta Sans',system-ui,sans-serif;opacity:0;transform:translateY(10px) scale(.97);pointer-events:none;transition:opacity .24s ease,transform .24s cubic-bezier(.2,.8,.2,1)}",
    '.vxof.is-visible{opacity:1;transform:none;pointer-events:auto}',
    '.vxof::before{content:"";position:absolute;top:-12px;left:50%;transform:translateX(-50%) rotate(45deg);width:17px;height:17px;background:var(--bg-color--bg-white,#fff);border-left:5px solid var(--bg-color--bg-primary,#f2f2f2);border-top:5px solid var(--bg-color--bg-primary,#f2f2f2)}',
    '.vxof-x{position:absolute;top:12px;right:14px;background:none;border:0;color:var(--text-color--text-secondary,#585858);font-size:21px;line-height:1;cursor:pointer;opacity:.5;padding:2px 5px;border-radius:8px}',
    '.vxof-x:hover{opacity:1}',
    '.vxof-badge{display:flex;align-items:center;gap:9px;font-size:12px;font-weight:600;letter-spacing:.16em;text-transform:uppercase;color:#00a6d6;margin-bottom:15px}',
    '.vxof-badge b{width:8px;height:8px;border-radius:2px;background:#00d4ff;display:inline-block;box-shadow:0 0 8px rgba(0,212,255,.8);animation:vxof-blink 1.1s steps(1,end) infinite}',
    '@keyframes vxof-blink{50%{opacity:.15}}',
    '.vxof-t{font-size:14.5px;color:var(--text-color--text-secondary,#585858);line-height:1.35}',
    '.vxof-price{font-size:40px;font-weight:800;letter-spacing:-1.4px;line-height:1.1;margin:5px 0 3px;color:var(--text-color--text-primary,#131313)}',
    '.vxof-price i{font-style:normal;font-size:21px;font-weight:700;color:var(--text-color--text-secondary,#585858);margin-right:5px}',
    '.vxof-price span{font-size:21px;font-weight:800;color:var(--text-color--text-secondary,#585858)}',
    '.vxof-sub{font-size:12.5px;color:var(--text-color--text-secondary,#585858);opacity:.9;margin-bottom:18px}',
    '.vxof-timer{font-size:13px;color:var(--text-color--text-secondary,#585858);margin-bottom:9px;display:flex;align-items:baseline;gap:7px}',
    '.vxof-clock{font-weight:800;font-variant-numeric:tabular-nums;color:#00a6d6;font-size:18px;letter-spacing:.5px}',
    '.vxof.is-end .vxof-clock{color:#ff4d4d}',
    '.vxof-bar{height:6px;border-radius:100px;background:var(--bg-color--bg-primary,#eee);overflow:hidden;margin-bottom:20px}',
    '.vxof-bar i{display:block;height:100%;border-radius:100px;background:linear-gradient(90deg,#00d4ff,#00ff88);transition:width .2s linear}',
    '.vxof.is-end .vxof-bar i{background:linear-gradient(90deg,#ff8a3d,#ff4d4d)}',
    '.vxof-wa{display:flex;align-items:center;justify-content:center;gap:10px;text-decoration:none;background:#25d366;color:#04120a;font-weight:700;font-size:13.5px;letter-spacing:.06em;text-transform:uppercase;padding:15px 18px;border-radius:80px;box-shadow:0 10px 24px rgba(37,211,102,.3);transition:transform .16s ease,box-shadow .16s ease}',
    '.vxof-wa:hover{transform:translateY(-2px);box-shadow:0 15px 30px rgba(37,211,102,.44);color:#04120a}',
    '.vxof-wa svg{flex:none}',
    '@media (prefers-reduced-motion:reduce){.vxof,.vxof-badge b,img.title-icon[src*="icon1"]{animation:none;transition:none}}'
  ].join('');
  document.head.appendChild(css);

  var WA_PATH = 'M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.29.173-1.414-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.885-9.885 9.885M20.52 3.449C18.24 1.245 15.24 0 12.045 0 5.463 0 .104 5.359.101 11.946c0 2.096.549 4.14 1.595 5.945L0 24l6.335-1.652a11.882 11.882 0 005.71 1.454h.006c6.585 0 11.946-5.359 11.949-11.945a11.821 11.821 0 00-3.48-8.413z';

  var pop = document.createElement('div');
  pop.className = 'vxof';
  pop.setAttribute('role', 'dialog');
  pop.setAttribute('aria-label', 'Oferta especial');
  pop.innerHTML =
    '<button class="vxof-x" aria-label="Fechar">×</button>' +
    '<div class="vxof-badge"><b></b>Oferta relâmpago</div>' +
    '<div class="vxof-t">Seu site profissional por apenas</div>' +
    '<div class="vxof-price"><i>R$</i>1.000<span>,00</span></div>' +
    '<div class="vxof-sub">Site completo, entregue e no ar.</div>' +
    '<div class="vxof-timer">Acaba em <span class="vxof-clock">00:15</span></div>' +
    '<div class="vxof-bar"><i style="width:100%"></i></div>' +
    '<a class="vxof-wa" target="_blank" rel="noopener" aria-label="Falar no WhatsApp"' +
    ' href="https://wa.me/' + WA_DEFAULT + '?text=' + encodeURIComponent(WA_MSG) + '">' +
    '<svg viewBox="0 0 24 24" width="19" height="19" fill="currentColor" aria-hidden="true"><path d="' + WA_PATH + '"/></svg>' +
    'Quero aproveitar</a>';
  document.body.appendChild(pop);

  var clockEl = pop.querySelector('.vxof-clock');
  var barEl = pop.querySelector('.vxof-bar i');
  var waLink = pop.querySelector('.vxof-wa');
  var timer = null, hideTimer = null, over = false;

  // pega o WhatsApp configurado no painel (fallback pro padrão)
  fetch('/api/settings').then(function (r) { return r.ok ? r.json() : null; }).then(function (s) {
    if (s && s.contato_whatsapp) {
      var n = String(s.contato_whatsapp).replace(/\D/g, '');
      if (n) waLink.href = 'https://wa.me/' + n + '?text=' + encodeURIComponent(WA_MSG);
    }
  }).catch(function () {});

  function deadline() {
    var d = parseInt(lget(K_DEADLINE), 10);
    if (!d) { d = Date.now() + DURATION; lset(K_DEADLINE, String(d)); }
    return d;
  }
  function remaining() { return Math.max(0, deadline() - Date.now()); }

  function position() {
    var r = icon.getBoundingClientRect();
    var docW = document.documentElement.clientWidth;
    var top = r.bottom + window.scrollY + 14;
    var left = r.left + window.scrollX + r.width / 2 - pop.offsetWidth / 2;
    left = Math.max(12, Math.min(left, window.scrollX + docW - pop.offsetWidth - 12));
    pop.style.top = top + 'px';
    pop.style.left = left + 'px';
  }

  function tick() {
    var rem = remaining();
    var s = Math.ceil(rem / 1000);
    clockEl.textContent = '00:' + (s < 10 ? '0' : '') + s;
    if (barEl) barEl.style.width = (rem / DURATION * 100) + '%';
    pop.classList.toggle('is-end', rem <= 5000);
    if (rem <= 0) expire();
  }

  function show() {
    if (lget(K_EXPIRED) === '1' || remaining() <= 0) { expire(); return; }
    deadline();
    pop.classList.add('is-visible');
    position();
    tick();
    if (!timer) timer = setInterval(tick, 200);
  }
  function hide() { pop.classList.remove('is-visible'); }
  function expire() {
    lset(K_EXPIRED, '1');
    pop.classList.remove('is-visible');
    if (timer) { clearInterval(timer); timer = null; }
    icon.classList.add('vxof-done');
  }

  // já passou do prazo (aba reaberta) -> encerra e sai
  if (lget(K_DEADLINE) && remaining() <= 0) { expire(); return; }
  // já começou mas não expirou -> mantém timer global pra expirar no prazo mesmo sem hover
  if (lget(K_DEADLINE)) timer = setInterval(tick, 200);

  var grace = function () { hideTimer = setTimeout(function () { if (!over) hide(); }, 400); };
  icon.addEventListener('mouseenter', function () { over = true; clearTimeout(hideTimer); show(); });
  icon.addEventListener('mouseleave', function () { over = false; grace(); });
  pop.addEventListener('mouseenter', function () { over = true; clearTimeout(hideTimer); });
  pop.addEventListener('mouseleave', function () { over = false; grace(); });
  icon.addEventListener('click', function (e) { e.preventDefault(); pop.classList.contains('is-visible') ? hide() : show(); });
  pop.querySelector('.vxof-x').addEventListener('click', hide);
  window.addEventListener('resize', function () { if (pop.classList.contains('is-visible')) position(); });
  window.addEventListener('scroll', function () { if (pop.classList.contains('is-visible')) position(); }, { passive: true });
})();
