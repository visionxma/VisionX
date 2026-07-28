// Operações de dados do painel — mesmas consultas do db.js (PostgREST/Supabase),
// só que no formato das Pages Functions. O db.js tem um fallback para arquivos
// JSON em disco; aqui não existe disco, então é sempre Supabase.
import { sb } from './_supabase.js';

const normLead = r => ({ id: String(r.id), data: r.created_at, nome: r.nome, email: r.email, mensagem: r.mensagem, origem: r.origem, status: r.status || 'novo' });
const normNews = r => ({ id: String(r.id), data: r.created_at, email: r.email });
const normTeam = r => ({ id: String(r.id), nome: r.nome, cargo: r.cargo, foto: r.foto, ordem: (r.ordem == null ? 0 : r.ordem), ativo: r.ativo !== false });
const normDep  = r => ({ id: String(r.id), texto: r.texto, autor: r.autor, foto: r.foto, ordem: (r.ordem == null ? 0 : r.ordem), ativo: r.ativo !== false });

const eq = id => encodeURIComponent(id);
const REP = { Prefer: 'return=representation' };

export const getLeads = async env => ((await sb(env, 'leads?select=*&order=created_at.desc')) || []).map(normLead);
export const getNews  = async env => ((await sb(env, 'newsletter?select=*&order=created_at.desc')) || []).map(normNews);
export const getTeam  = async env => ((await sb(env, 'team?select=*&order=ordem.asc,id.asc')) || []).map(normTeam);
export const getDeps  = async env => ((await sb(env, 'depoimentos?select=*&order=ordem.asc,id.asc')) || []).map(normDep);

export async function getSettings(env) {
  const rows = await sb(env, 'settings?select=chave,valor');
  const o = {};
  (rows || []).forEach(r => { o[r.chave] = r.valor; });
  return o;
}

export async function setSettings(env, obj) {
  const clean = {};
  Object.keys(obj || {}).forEach(k => {
    if (k === 'id') return;
    const v = obj[k];
    if (v === undefined || v === null) return;
    clean[k] = String(v);
  });
  const rows = Object.keys(clean).map(k => ({ chave: k, valor: clean[k] }));
  if (rows.length) {
    await sb(env, 'settings', {
      method: 'POST',
      headers: { Prefer: 'resolution=merge-duplicates,return=minimal' },
      body: JSON.stringify(rows)
    });
  }
}

export async function setLeadStatus(env, id, status) {
  const r = await sb(env, 'leads?id=eq.' + eq(id), { method: 'PATCH', headers: REP, body: JSON.stringify({ status }) });
  return Boolean(r && r.length);
}
export async function delLead(env, id) {
  const r = await sb(env, 'leads?id=eq.' + eq(id), { method: 'DELETE', headers: REP });
  return Boolean(r && r.length);
}
export async function delNews(env, id) {
  const r = await sb(env, 'newsletter?id=eq.' + eq(id), { method: 'DELETE', headers: REP });
  return Boolean(r && r.length);
}

export async function addTeam(env, o) {
  const row = { nome: o.nome || '', cargo: o.cargo || '', foto: o.foto || '', ordem: Number(o.ordem) || 0, ativo: o.ativo !== false };
  const r = await sb(env, 'team', { method: 'POST', headers: REP, body: JSON.stringify(row) });
  if (!r || !r[0]) throw new Error('Supabase não retornou o membro criado');
  return normTeam(r[0]);
}
export async function updateTeam(env, id, o) {
  const patch = {};
  ['nome', 'cargo', 'foto'].forEach(k => { if (o[k] !== undefined) patch[k] = o[k]; });
  if (o.ordem !== undefined) patch.ordem = Number(o.ordem) || 0;
  if (o.ativo !== undefined) patch.ativo = o.ativo !== false;
  if (!Object.keys(patch).length) return true;
  const r = await sb(env, 'team?id=eq.' + eq(id), { method: 'PATCH', headers: REP, body: JSON.stringify(patch) });
  return Boolean(r && r.length);
}
export async function delTeam(env, id) {
  const r = await sb(env, 'team?id=eq.' + eq(id), { method: 'DELETE', headers: REP });
  return Boolean(r && r.length);
}
export async function reorderTeam(env, ids) {
  for (let i = 0; i < ids.length; i++) await updateTeam(env, ids[i], { ordem: i + 1 });
}

export async function addDep(env, o) {
  const row = { texto: o.texto || '', autor: o.autor || '', foto: o.foto || '', ordem: Number(o.ordem) || 0, ativo: o.ativo !== false };
  const r = await sb(env, 'depoimentos', { method: 'POST', headers: REP, body: JSON.stringify(row) });
  if (!r || !r[0]) throw new Error('Supabase não retornou o depoimento criado');
  return normDep(r[0]);
}
export async function updateDep(env, id, o) {
  const patch = {};
  ['texto', 'autor', 'foto'].forEach(k => { if (o[k] !== undefined) patch[k] = o[k]; });
  if (o.ordem !== undefined) patch.ordem = Number(o.ordem) || 0;
  if (o.ativo !== undefined) patch.ativo = o.ativo !== false;
  if (!Object.keys(patch).length) return true;
  const r = await sb(env, 'depoimentos?id=eq.' + eq(id), { method: 'PATCH', headers: REP, body: JSON.stringify(patch) });
  return Boolean(r && r.length);
}
export async function delDep(env, id) {
  const r = await sb(env, 'depoimentos?id=eq.' + eq(id), { method: 'DELETE', headers: REP });
  return Boolean(r && r.length);
}
export async function reorderDeps(env, ids) {
  for (let i = 0; i < ids.length; i++) await updateDep(env, ids[i], { ordem: i + 1 });
}

// ---- upload de imagem ----
// O server.js gravava em site/images/. Workers não têm disco, então vai para o
// Supabase Storage. O bucket precisa existir e ser público (ver README do painel).
const BUCKET = 'uploads';

export async function uploadImage(env, dataUrl, prefix, maxBytes, allowGif = true) {
  const re = allowGif
    ? /^data:image\/(png|jpe?g|webp|gif|avif);base64,(.+)$/i
    : /^data:image\/(png|jpe?g|webp);base64,(.+)$/i;
  const m = re.exec(dataUrl || '');
  if (!m) return { ok: false, erro: 'Formato inválido' };           // sem SVG: evita XSS armazenado
  const ext = m[1].toLowerCase().replace('jpeg', 'jpg');

  const bin = atob(m[2]);
  if (bin.length > maxBytes) return { ok: false, erro: 'Imagem muito grande' };
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) bytes[i] = bin.charCodeAt(i);

  const name = prefix + Date.now() + Math.floor(Math.random() * 1000) + '.' + ext;
  const base = (env.SUPABASE_URL || '').replace(/\/+$/, '');
  const key = env.SUPABASE_SERVICE_ROLE_KEY || env.SUPABASE_KEY || '';
  const res = await fetch(`${base}/storage/v1/object/${BUCKET}/${name}`, {
    method: 'POST',
    headers: {
      apikey: key,
      Authorization: 'Bearer ' + key,
      'Content-Type': 'image/' + (ext === 'jpg' ? 'jpeg' : ext),
      'x-upsert': 'true'
    },
    body: bytes
  });
  if (!res.ok) return { ok: false, erro: 'Falha no upload (' + res.status + ')' };
  return { ok: true, path: `${base}/storage/v1/object/public/${BUCKET}/${name}` };
}
