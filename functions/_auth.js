// Sessão do admin nas Cloudflare Pages Functions.
// Mesmo formato de token do server.js (payload_base64url + "." + hmac_base64url),
// mas assinado com Web Crypto — o módulo 'crypto' do Node não existe em Workers.
//
// Variáveis de ambiente esperadas no projeto Pages (Settings → Environment variables):
//   ADMIN_USER   (opcional, padrão "admin")
//   ADMIN_PASS   OBRIGATÓRIA — sem ela o painel fica desligado
//   ADMIN_SECRET OBRIGATÓRIA — segredo que assina o cookie de sessão

const SESSION_HOURS = 8;
const enc = new TextEncoder();

function b64url(bytes) {
  let s = '';
  const a = new Uint8Array(bytes);
  for (let i = 0; i < a.length; i++) s += String.fromCharCode(a[i]);
  return btoa(s).replace(/\+/g, '-').replace(/\//g, '_').replace(/=+$/, '');
}
function unb64url(str) {
  const s = str.replace(/-/g, '+').replace(/_/g, '/');
  return atob(s + '='.repeat((4 - (s.length % 4)) % 4));
}

async function hmac(secret, payload) {
  const key = await crypto.subtle.importKey(
    'raw', enc.encode(secret), { name: 'HMAC', hash: 'SHA-256' }, false, ['sign']
  );
  return b64url(await crypto.subtle.sign('HMAC', key, enc.encode(payload)));
}

export async function signToken(env, obj) {
  const payload = b64url(enc.encode(JSON.stringify(obj)));
  return payload + '.' + (await hmac(env.ADMIN_SECRET, payload));
}

export async function verifyToken(env, token) {
  if (!env || !env.ADMIN_SECRET || !token || token.indexOf('.') < 0) return null;
  const [payload, sig] = token.split('.');
  const expected = await hmac(env.ADMIN_SECRET, payload);
  // comparação em tempo constante (evita descobrir a assinatura byte a byte)
  if (sig.length !== expected.length) return null;
  let diff = 0;
  for (let i = 0; i < sig.length; i++) diff |= sig.charCodeAt(i) ^ expected.charCodeAt(i);
  if (diff !== 0) return null;
  try {
    const obj = JSON.parse(unb64url(payload));
    if (obj.exp && Date.now() > obj.exp) return null;
    return obj;
  } catch { return null; }
}

export function cookies(request) {
  const out = {};
  (request.headers.get('cookie') || '').split(';').forEach(p => {
    const i = p.indexOf('=');
    if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim());
  });
  return out;
}

export function sessionCookie(token) {
  return 'vx_admin=' + token + '; HttpOnly; Path=/admin; SameSite=Lax; Secure; Max-Age=' + SESSION_HOURS * 3600;
}
export const clearCookie = 'vx_admin=; HttpOnly; Path=/admin; SameSite=Lax; Secure; Max-Age=0';
export const sessionMs = SESSION_HOURS * 3600000;

// O painel só existe se as duas variáveis estiverem definidas. Sem isso ele
// responde 404 — assim um deploy sem configurar nada não expõe escrita no banco.
export function panelEnabled(env) {
  return Boolean(env && env.ADMIN_PASS && env.ADMIN_SECRET);
}

export async function requireAuth(request, env) {
  if (!panelEnabled(env)) return { ok: false, response: new Response('Not found', { status: 404 }) };
  const sess = await verifyToken(env, cookies(request)['vx_admin']);
  if (sess) return { ok: true, sess };
  const wantsJson = (request.headers.get('accept') || '').includes('json') || request.method !== 'GET';
  return {
    ok: false,
    response: wantsJson
      ? new Response(JSON.stringify({ ok: false, erro: 'nao autenticado' }), {
          status: 401, headers: { 'Content-Type': 'application/json' } })
      : Response.redirect(new URL('/admin/login', request.url).toString(), 302)
  };
}
