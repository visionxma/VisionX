// GET /api/settings — conteúdo/configurações do site (contatos, hero, números, imagens, seções on/off).
import { sb, json } from '../_supabase.js';

export async function onRequestGet({ env }) {
  try {
    const rows = await sb(env, 'settings?select=chave,valor');
    const o = {};
    (rows || []).forEach(r => { o[r.chave] = r.valor; });
    // O WhatsApp 5599984680391 caiu em out/2026: se o painel ainda guardar esse número,
    // o site entrega o novo, para os links trocados em vx-content.js e vx-offer.js não voltarem ao antigo.
    if (String(o.contato_whatsapp || '').replace(/\D/g, '') === '5599984680391') o.contato_whatsapp = '5599984304630';
    return json(o);
  } catch (e) { return json({}); }
}
