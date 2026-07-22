// POST /api/lead — formulário de contato (fetch JSON do vx-forms) grava no Supabase.
import { sb, json, readBody } from '../_supabase.js';

export async function onRequestPost({ request, env }) {
  const b = await readBody(request);
  const email = (b.email || b.Address || '').trim();
  if (!email) return json({ ok: false, erro: 'E-mail obrigatório' }, 400);
  try {
    await sb(env, 'leads', {
      method: 'POST',
      headers: { Prefer: 'return=minimal' },
      body: JSON.stringify({
        nome: (b.nome || b.Name || '').trim() || null,
        email,
        mensagem: (b.mensagem || b.Mensagem || '').trim() || null,
        origem: request.headers.get('referer') || null,
        status: 'novo'
      })
    });
    return json({ ok: true });
  } catch (e) { return json({ ok: false, erro: 'Falha ao salvar' }, 500); }
}
