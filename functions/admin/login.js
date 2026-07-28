// GET  /admin/login — formulário
// POST /admin/login — autentica e devolve o cookie de sessão
import { loginPage } from '../_login.js';
import { signToken, verifyToken, cookies, sessionCookie, sessionMs, panelEnabled } from '../_auth.js';
import { readBody } from '../_supabase.js';

const html = (body, extra = {}) =>
  new Response(body, { headers: { 'Content-Type': 'text/html; charset=utf-8', 'Cache-Control': 'no-store', 'X-Robots-Tag': 'noindex', ...extra } });

export async function onRequestGet({ request, env }) {
  if (!panelEnabled(env)) return new Response('Not found', { status: 404 });
  // já logado? vai direto para o painel
  if (await verifyToken(env, cookies(request)['vx_admin'])) {
    return Response.redirect(new URL('/admin', request.url).toString(), 302);
  }
  const erro = new URL(request.url).searchParams.get('e');
  return html(loginPage(erro));
}

export async function onRequestPost({ request, env }) {
  if (!panelEnabled(env)) return new Response('Not found', { status: 404 });
  const b = await readBody(request);
  const user = (b.usuario || env.ADMIN_USER || 'admin').trim();
  const senha = String(b.senha || '');

  const okUser = user === (env.ADMIN_USER || 'admin');
  // comparação em tempo constante, para a resposta não vazar o tamanho certo
  const alvo = String(env.ADMIN_PASS);
  let diff = senha.length ^ alvo.length;
  for (let i = 0; i < Math.max(senha.length, alvo.length); i++) {
    diff |= (senha.charCodeAt(i) || 0) ^ (alvo.charCodeAt(i) || 0);
  }

  if (okUser && diff === 0) {
    const tok = await signToken(env, { u: user, exp: Date.now() + sessionMs });
    return new Response(null, {
      status: 302,
      headers: { Location: new URL('/admin', request.url).toString(), 'Set-Cookie': sessionCookie(tok) }
    });
  }
  return Response.redirect(new URL('/admin/login?e=1', request.url).toString(), 302);
}
