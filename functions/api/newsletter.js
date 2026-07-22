// POST /api/newsletter — inscrição na newsletter (JSON do vx-forms ou urlencoded nativo).
import { sb, json, readBody, thanks } from '../_supabase.js';

export async function onRequestPost({ request, env }) {
  const b = await readBody(request);
  const email = (b.email || '').trim();
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  if (!email) return isJson ? json({ ok: false, erro: 'E-mail obrigatório' }, 400) : new Response('E-mail obrigatório', { status: 400 });
  try {
    await sb(env, 'newsletter', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ email }) });
    return isJson ? json({ ok: true }) : thanks('Inscrição confirmada!', 'Você entrou na nossa newsletter.');
  } catch (e) { return isJson ? json({ ok: false, erro: 'Falha ao salvar' }, 500) : new Response('Falha ao salvar', { status: 500 }); }
}
