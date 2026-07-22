// POST /api/contact — formulário de contato. Com JS chega JSON (responde JSON);
// sem JS chega urlencoded (responde uma página HTML de "obrigado"). Espelha o Express.
import { sb, json, readBody, thanks } from '../_supabase.js';

export async function onRequestPost({ request, env }) {
  const isJson = (request.headers.get('content-type') || '').includes('application/json');
  const b = await readBody(request);
  const email = (b.email || b.Address || '').trim();
  if (!email) return isJson ? json({ ok: false, erro: 'E-mail obrigatório' }, 400) : new Response('E-mail obrigatório', { status: 400 });
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
    return isJson ? json({ ok: true }) : thanks('Mensagem recebida!', 'Obrigado pelo contato — retornaremos em breve.');
  } catch (e) { return isJson ? json({ ok: false, erro: 'Falha ao enviar' }, 500) : new Response('Falha ao enviar', { status: 500 }); }
}
