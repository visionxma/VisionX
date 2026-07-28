// Página de login do painel — mesmo HTML do server.js.
export function loginPage(erro) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Entrar — Painel VisionX</title>
<link rel="icon" href="/favicon.png?v=5">
<style>
  @font-face{font-family:"Plus Jakarta Sans";font-weight:400;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-400-normal.Dhut76fR.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:600;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-600-normal.DLTa1BUW.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:700;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-700-normal.CfpNZvy6.woff2) format("woff2")}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
    font-family:"Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:#f5f7fa;color:#414b57;-webkit-font-smoothing:antialiased}
  form{width:100%;max-width:370px;padding:40px 36px;background:#fff;border:1px solid #e7eaef;border-radius:20px;box-shadow:0 12px 40px rgba(20,26,34,.08);text-align:center}
  .vxlogo{height:30px;width:auto;margin:0 auto 18px;display:block}
  h1{font-size:19px;margin:0 0 3px;color:#141a22;letter-spacing:-.01em} p.sub{color:#8a95a3;font-size:13px;margin:0 0 24px}
  label{display:block;text-align:left;font-size:12px;color:#6b7683;margin:0 0 6px;font-weight:600}
  input{width:100%;padding:13px 14px;border-radius:12px;border:1px solid #e7eaef;background:#fff;color:#141a22;font-size:15px;outline:none;font-family:inherit}
  input:focus{border-color:#00d4ff;box-shadow:0 0 0 3px rgba(0,212,255,.14)}
  button{width:100%;margin-top:18px;padding:13px;border:0;border-radius:22px;background:#0b1017;color:#fff;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit}
  button:hover{background:#171f2b}
  .err{background:#fff5f5;color:#e53e3e;border:1px solid rgba(229,62,62,.25);border-radius:11px;padding:10px 12px;font-size:13px;margin-bottom:16px}
  .home{display:inline-block;margin-top:18px;color:#8a95a3;font-size:12.5px;text-decoration:none;font-weight:500}.home:hover{color:#0a8fb0}
  /* Apple polish */
  html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  body{background:#f5f5f7}
  h1{letter-spacing:-.022em}
  form{border:1px solid rgba(0,0,0,.06);box-shadow:0 1px 2px rgba(0,0,0,.04),0 24px 56px -22px rgba(0,0,0,.28)}
  input{border-radius:12px}
  input:focus{border-color:rgba(0,0,0,.16);box-shadow:0 0 0 4px rgba(0,212,255,.16)}
  button{border-radius:980px;transition:transform .18s cubic-bezier(.4,0,.2,1),background-color .2s}
  button:hover{transform:translateY(-1px)} button:active{transform:scale(.97)}
  @keyframes vxin{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}
  form{animation:vxin .55s cubic-bezier(.2,.7,.2,1) both}
  @media(prefers-reduced-motion:reduce){form{animation:none}*{transition:none!important}}
</style></head><body>
<form method="POST" action="/admin/login" autocomplete="off">
  <img class="vxlogo" src="/images/logo.png?v=2" alt="VisionX">
  <h1>Painel</h1><p class="sub">Acesso restrito · leads, equipe e conteúdo</p>
  ${erro ? '<div class="err">Senha incorreta. Tente novamente.</div>' : ''}
  <label for="senha">Senha</label>
  <input id="senha" type="password" name="senha" placeholder="••••••••" autofocus required>
  <button type="submit">Entrar</button>
  <a class="home" href="/">← Voltar ao site</a>
</form></body></html>`;
}
