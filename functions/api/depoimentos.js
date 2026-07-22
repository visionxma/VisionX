// GET /api/depoimentos — depoimentos ativos (a página inicial lê daqui).
import { sb, json } from '../_supabase.js';

export async function onRequestGet({ env }) {
  try {
    const rows = await sb(env, 'depoimentos?select=*&order=ordem.asc,id.asc');
    const t = (rows || [])
      .filter(r => r.ativo !== false)
      .map(r => ({ id: String(r.id), texto: r.texto, autor: r.autor, foto: r.foto, ordem: r.ordem, ativo: r.ativo !== false }));
    return json(t);
  } catch (e) { return json([]); }
}
