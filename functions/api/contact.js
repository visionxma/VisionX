// POST /api/contact — fallback do formulário de contato quando enviado sem JavaScript (urlencoded).
import { sb, readBody, thanks } from '../_supabase.js';

export async function onRequestPost({ request, env }) {
  const b = await readBody(request);
  const email = (b.email || b.Address || '').trim();
  if (!email) return new Response('E-mail obrigatório', { status: 400 });
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
    return thanks('Mensagem recebida!', 'Obrigado pelo contato — retornaremos em breve.');
  } catch (e) { return new Response('Falha ao enviar', { status: 500 }); }
}
