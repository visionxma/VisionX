// VisionX — envia os formulários (contato + newsletter) para o backend/admin
(function () {
  function val(form, name) {
    var el = form.querySelector('[name="' + name + '"]');
    return el ? el.value.trim() : '';
  }
  document.addEventListener('submit', async function (e) {
    var form = e.target;
    if (!(form instanceof HTMLFormElement)) return;
    // Webflow usa name="wf-form-Form"/"email-form" e data-name="Form"/"Email Form".
    // Detecta por data-name, name ou pelos campos (robusto).
    var dn = form.getAttribute('data-name') || '';
    var nm = form.getAttribute('name') || '';
    var isContact = dn === 'Form' || nm === 'Form' || !!form.querySelector('[name="Mensagem"]');
    var isNews = !isContact && (dn === 'Email Form' || nm === 'Email Form' || nm === 'email-form' || !!form.querySelector('[name="email"]'));
    if (!isContact && !isNews) return;
    e.preventDefault();

    var wrap = form.closest('.w-form') || form.parentElement;
    var done = wrap && wrap.querySelector('.w-form-done');
    var fail = wrap && wrap.querySelector('.w-form-fail');

    var url, payload;
    if (isContact) {
      url = '/api/lead';
      payload = { nome: val(form, 'Name'), email: val(form, 'Address'), mensagem: val(form, 'Mensagem') };
    } else {
      url = '/api/newsletter';
      payload = { email: val(form, 'email') };
    }
    if (!payload.email) { if (fail) fail.style.display = 'block'; return; }

    // estado de carregamento no botão
    var btn = form.querySelector('[type="submit"], button[type="submit"], .w-button');
    var btnOrig = '';
    if (btn) {
      btnOrig = ('value' in btn && btn.value) ? btn.value : btn.textContent;
      btn.disabled = true; btn.style.opacity = '.65'; btn.style.pointerEvents = 'none';
      if ('value' in btn && btn.tagName === 'INPUT') btn.value = 'Enviando…'; else btn.textContent = 'Enviando…';
    }
    function restoreBtn() {
      if (!btn) return;
      btn.disabled = false; btn.style.opacity = ''; btn.style.pointerEvents = '';
      if ('value' in btn && btn.tagName === 'INPUT') btn.value = btnOrig; else btn.textContent = btnOrig;
    }

    try {
      var r = await fetch(url, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      var j = await r.json();
      if (!r.ok || !j.ok) throw new Error(j && j.erro || 'erro');
      form.style.display = 'none';
      if (done) { done.style.display = 'block'; } else { form.reset(); alert('Recebido! Obrigado pelo contato.'); }
    } catch (err) {
      restoreBtn();
      if (fail) { fail.style.display = 'block'; } else { alert('Ops! Algo deu errado. Tente novamente.'); }
    }
  });
})();
