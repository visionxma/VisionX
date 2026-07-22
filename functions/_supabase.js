// Helper compartilhado das Cloudflare Pages Functions — fala com o Supabase (PostgREST).
// As credenciais vêm das variáveis de ambiente do projeto Pages (Settings → Environment variables):
//   SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY
export async function sb(env, pathQuery, opts = {}) {
  const url = (env.SUPABASE_URL || '').replace(/\/+$/, '');
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || '';
  const res = await fetch(url + '/rest/v1/' + pathQuery, {
    method: opts.method || 'GET',
    headers: {
      apikey: key,
      Authorization: 'Bearer ' + key,
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    },
    body: opts.body
  });
  if (!res.ok) throw new Error('Supabase ' + res.status + ': ' + (await res.text()).slice(0, 200));
  const t = await res.text();
  return t ? JSON.parse(t) : null;
}

export function json(data, status = 200) {
  return new Response(JSON.stringify(data), {
    status,
    headers: { 'Content-Type': 'application/json', 'Cache-Control': 'no-store' }
  });
}

export function thanks(titulo, msg) {
  return new Response(
    '<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>' + titulo + '</title>' +
    '<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f7;color:#1d1d1f;text-align:center;padding:24px}h1{font-size:22px;letter-spacing:-.02em}p{color:#5b6673}a{display:inline-block;margin-top:18px;padding:12px 22px;border-radius:980px;background:#1d1d1f;color:#fff;text-decoration:none;font-weight:600}</style>' +
    '</head><body><div><div style="font-size:44px">✅</div><h1>' + titulo + '</h1><p>' + msg + '</p><a href="/">Voltar ao site</a></div></body></html>',
    { headers: { 'Content-Type': 'text/html; charset=utf-8' } }
  );
}

// Lê o corpo aceitando JSON (fetch do vx-forms) ou urlencoded (envio nativo do formulário)
export async function readBody(request) {
  const ct = request.headers.get('content-type') || '';
  if (ct.includes('application/json')) return await request.json().catch(() => ({}));
  try {
    const f = await request.formData();
    const o = {};
    for (const [k, v] of f) o[k] = v;
    return o;
  } catch { return {}; }
}
