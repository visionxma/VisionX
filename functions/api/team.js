// GET /api/team — equipe ativa (a página Sobre lê daqui).
import { sb, json } from '../_supabase.js';

export async function onRequestGet({ env }) {
  try {
    const rows = await sb(env, 'team?select=*&order=ordem.asc,id.asc');
    const t = (rows || [])
      .filter(r => r.ativo !== false)
      .map(r => ({ id: String(r.id), nome: r.nome, cargo: r.cargo, foto: r.foto, ordem: r.ordem, ativo: r.ativo !== false }));
    return json(t);
  } catch (e) { return json([]); }
}
