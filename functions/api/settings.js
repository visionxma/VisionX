// GET /api/settings — conteúdo/configurações do site (contatos, hero, números, imagens, seções on/off).
import { sb, json } from '../_supabase.js';

export async function onRequestGet({ env }) {
  try {
    const rows = await sb(env, 'settings?select=chave,valor');
    const o = {};
    (rows || []).forEach(r => { o[r.chave] = r.valor; });
    return json(o);
  } catch (e) { return json({}); }
}
