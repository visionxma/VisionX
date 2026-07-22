// VisionX — camada de armazenamento
// Usa Supabase (Postgres via API REST/PostgREST) quando SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY
// estiverem definidos; senão cai automaticamente para arquivos JSON locais (data/*.json).
const fs = require('fs');
const path = require('path');

const DATA_DIR = path.join(__dirname, 'data');
fs.mkdirSync(DATA_DIR, { recursive: true });

const SB_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';
const USE_SB = !!(SB_URL && SB_KEY);

// ---------------- armazenamento local (JSON) — fallback ----------------
function jfile(n) { return path.join(DATA_DIR, n); }
function jload(n) { try { return JSON.parse(fs.readFileSync(jfile(n), 'utf8')); } catch { return []; } }
function jsave(n, a) { fs.writeFileSync(jfile(n), JSON.stringify(a, null, 2)); }
function jid() { return Date.now() + '' + Math.floor(Math.random() * 1000); }

// ---------------- Supabase (PostgREST) ----------------
async function sb(pathQuery, opts = {}) {
  const res = await fetch(SB_URL + '/rest/v1/' + pathQuery, {
    method: opts.method || 'GET',
    headers: {
      apikey: SB_KEY,
      Authorization: 'Bearer ' + SB_KEY,
      'Content-Type': 'application/json',
      ...(opts.headers || {})
    },
    body: opts.body
  });
  if (!res.ok) {
    const t = await res.text().catch(() => '');
    throw new Error('Supabase ' + res.status + ': ' + t.slice(0, 300));
  }
  const txt = await res.text();
  return txt ? JSON.parse(txt) : null;
}

// Detecta se a tabela existe. true = existe, false = NÃO existe (404/PGRST205),
// null = erro transitório (5xx/rede/timeout). O null NÃO deve virar cache — senão
// uma falha momentânea travaria o app no JSON local e dessincronizaria do Supabase.
async function tableProbe(table) {
  try { await sb(table + '?select=*&limit=1'); return true; }
  catch (e) {
    const m = String((e && e.message) || '');
    if (m.indexOf(' 404') >= 0 || m.indexOf('PGRST205') >= 0 || m.indexOf('Could not find the table') >= 0) return false;
    return null; // transitório: não cacheia
  }
}

// normaliza a linha do banco para o formato que o painel espera
function normLead(r) {
  return { id: String(r.id), data: r.created_at, nome: r.nome, email: r.email, mensagem: r.mensagem, origem: r.origem, status: r.status || 'novo' };
}
function normNews(r) { return { id: String(r.id), data: r.created_at, email: r.email }; }

// ---- EQUIPE: decide o backend sob demanda (cai pro JSON se a tabela 'team' ainda não existir) ----
let _teamSb = null;
async function teamUsesSb() {
  if (!USE_SB) return false;
  if (_teamSb !== null) return _teamSb;
  const r = await tableProbe('team');
  if (r !== null) _teamSb = r;   // só cacheia resultado definitivo (existe / não existe)
  return r === false ? false : true; // transitório -> tenta Supabase (falha visível, não silencia)
}
function normTeam(r) { return { id: String(r.id), nome: r.nome, cargo: r.cargo, foto: r.foto, ordem: (r.ordem == null ? 0 : r.ordem), ativo: r.ativo !== false }; }

// ---- CONFIGURAÇÕES/CONTEÚDO (settings): mesmo padrão de fallback ----
let _setsSb = null;
async function setsUsesSb() {
  if (!USE_SB) return false;
  if (_setsSb !== null) return _setsSb;
  const r = await tableProbe('settings');
  if (r !== null) _setsSb = r;
  return r === false ? false : true;
}
function loadSettingsJson() { try { return JSON.parse(fs.readFileSync(jfile('settings.json'), 'utf8')); } catch { return {}; } }

// ---- DEPOIMENTOS: mesmo padrão de fallback ----
let _depSb = null;
async function depUsesSb() {
  if (!USE_SB) return false;
  if (_depSb !== null) return _depSb;
  const r = await tableProbe('depoimentos');
  if (r !== null) _depSb = r;
  return r === false ? false : true;
}
function normDep(r) { return { id: String(r.id), texto: r.texto, autor: r.autor, foto: r.foto, ordem: (r.ordem == null ? 0 : r.ordem), ativo: r.ativo !== false }; }

module.exports = {
  mode: USE_SB ? 'supabase' : 'json',

  // ---- LEADS ----
  async addLead(o) {
    if (USE_SB) {
      await sb('leads', {
        method: 'POST', headers: { Prefer: 'return=minimal' },
        body: JSON.stringify({ nome: o.nome || null, email: o.email, mensagem: o.mensagem || null, origem: o.origem || null, status: 'novo' })
      });
      return;
    }
    const a = jload('leads.json');
    a.unshift({ id: jid(), data: new Date().toISOString(), nome: o.nome, email: o.email, mensagem: o.mensagem, origem: o.origem, status: 'novo' });
    jsave('leads.json', a);
  },
  async getLeads() {
    if (USE_SB) return (await sb('leads?select=*&order=created_at.desc')).map(normLead);
    return jload('leads.json');
  },
  async setLeadStatus(id, status) {
    if (USE_SB) {
      const r = await sb('leads?id=eq.' + encodeURIComponent(id), { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify({ status }) });
      return !!(r && r.length);
    }
    const a = jload('leads.json'); const it = a.find(x => String(x.id) === String(id));
    if (!it) return false; it.status = status; jsave('leads.json', a); return true;
  },
  async delLead(id) {
    if (USE_SB) {
      const r = await sb('leads?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: { Prefer: 'return=representation' } });
      return !!(r && r.length);
    }
    const a = jload('leads.json'); const n = a.length; const b = a.filter(x => String(x.id) !== String(id));
    if (b.length === n) return false; jsave('leads.json', b); return true;
  },

  // ---- NEWSLETTER ----
  async addNews(o) {
    if (USE_SB) {
      await sb('newsletter', { method: 'POST', headers: { Prefer: 'return=minimal' }, body: JSON.stringify({ email: o.email }) });
      return;
    }
    const a = jload('newsletter.json');
    a.unshift({ id: jid(), data: new Date().toISOString(), email: o.email });
    jsave('newsletter.json', a);
  },
  async getNews() {
    if (USE_SB) return (await sb('newsletter?select=*&order=created_at.desc')).map(normNews);
    return jload('newsletter.json');
  },
  async delNews(id) {
    if (USE_SB) {
      const r = await sb('newsletter?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: { Prefer: 'return=representation' } });
      return (r && r.length) ? 1 : 0;
    }
    const a = jload('newsletter.json'); const n = a.length; const b = a.filter(x => String(x.id) !== String(id));
    jsave('newsletter.json', b); return n - b.length;
  },

  // ---- EQUIPE (team) ----
  async getTeam() {
    if (await teamUsesSb()) {
      try {
        const rows = (await sb('team?select=*&order=ordem.asc,id.asc')).map(normTeam);
        try { jsave('team.json', rows); } catch (e) {} // espelho local (backup p/ falha transitória do PostgREST)
        return rows;
      } catch (e) { console.error('getTeam (Supabase, usando espelho):', e.message); }
    }
    return jload('team.json').slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  },
  async addTeam(o) {
    const row = { nome: o.nome || '', cargo: o.cargo || '', foto: o.foto || '', ordem: Number(o.ordem) || 0, ativo: o.ativo !== false };
    if (await teamUsesSb()) { const r = await sb('team', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(row) }); if (!r || !r[0]) throw new Error('Supabase não retornou o registro criado (team)'); return normTeam(r[0]); }
    const a = jload('team.json'); const m = { id: jid(), ...row }; a.push(m); jsave('team.json', a); return m;
  },
  async updateTeam(id, o) {
    const patch = {};
    ['nome', 'cargo', 'foto'].forEach(k => { if (o[k] !== undefined) patch[k] = o[k]; });
    if (o.ordem !== undefined) patch.ordem = Number(o.ordem) || 0;
    if (o.ativo !== undefined) patch.ativo = !!o.ativo;
    if (await teamUsesSb()) { const r = await sb('team?id=eq.' + encodeURIComponent(id), { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(patch) }); return !!(r && r.length); }
    const a = jload('team.json'); const it = a.find(x => String(x.id) === String(id)); if (!it) return false; Object.assign(it, patch); jsave('team.json', a); return true;
  },
  async delTeam(id) {
    if (await teamUsesSb()) { const r = await sb('team?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: { Prefer: 'return=representation' } }); return !!(r && r.length); }
    const a = jload('team.json'); const n = a.length; const b = a.filter(x => String(x.id) !== String(id)); if (b.length === n) return false; jsave('team.json', b); return true;
  },
  async reorderTeam(ids) {
    for (let i = 0; i < ids.length; i++) { await module.exports.updateTeam(ids[i], { ordem: i + 1 }); }
    return true;
  },

  // ---- DEPOIMENTOS ----
  async getDepoimentos() {
    if (await depUsesSb()) {
      try {
        const rows = (await sb('depoimentos?select=*&order=ordem.asc,id.asc')).map(normDep);
        try { jsave('depoimentos.json', rows); } catch (e) {}
        return rows;
      } catch (e) { console.error('getDepoimentos (espelho):', e.message); }
    }
    return jload('depoimentos.json').slice().sort((a, b) => (a.ordem || 0) - (b.ordem || 0));
  },
  async addDepoimento(o) {
    const row = { texto: o.texto || '', autor: o.autor || '', foto: o.foto || '', ordem: Number(o.ordem) || 0, ativo: o.ativo !== false };
    if (await depUsesSb()) { const r = await sb('depoimentos', { method: 'POST', headers: { Prefer: 'return=representation' }, body: JSON.stringify(row) }); if (!r || !r[0]) throw new Error('Supabase não retornou o registro criado (depoimentos)'); return normDep(r[0]); }
    const a = jload('depoimentos.json'); const m = { id: jid(), ...row }; a.push(m); jsave('depoimentos.json', a); return m;
  },
  async updateDepoimento(id, o) {
    const patch = {};
    ['texto', 'autor', 'foto'].forEach(k => { if (o[k] !== undefined) patch[k] = o[k]; });
    if (o.ordem !== undefined) patch.ordem = Number(o.ordem) || 0;
    if (o.ativo !== undefined) patch.ativo = !!o.ativo;
    if (await depUsesSb()) { const r = await sb('depoimentos?id=eq.' + encodeURIComponent(id), { method: 'PATCH', headers: { Prefer: 'return=representation' }, body: JSON.stringify(patch) }); return !!(r && r.length); }
    const a = jload('depoimentos.json'); const it = a.find(x => String(x.id) === String(id)); if (!it) return false; Object.assign(it, patch); jsave('depoimentos.json', a); return true;
  },
  async delDepoimento(id) {
    if (await depUsesSb()) { const r = await sb('depoimentos?id=eq.' + encodeURIComponent(id), { method: 'DELETE', headers: { Prefer: 'return=representation' } }); return !!(r && r.length); }
    const a = jload('depoimentos.json'); const n = a.length; const b = a.filter(x => String(x.id) !== String(id)); if (b.length === n) return false; jsave('depoimentos.json', b); return true;
  },
  async reorderDepoimentos(ids) {
    for (let i = 0; i < ids.length; i++) { await module.exports.updateDepoimento(ids[i], { ordem: i + 1 }); }
    return true;
  },

  // ---- CONFIGURAÇÕES/CONTEÚDO (settings) ----
  async getSettings() {
    if (await setsUsesSb()) {
      try {
        const rows = await sb('settings?select=chave,valor');
        const o = {}; rows.forEach(r => { o[r.chave] = r.valor; });
        try { jsave('settings.json', o); } catch (e) {} // espelho local
        return o;
      } catch (e) { console.error('getSettings (usando espelho):', e.message); }
    }
    return loadSettingsJson();
  },
  async setSettings(obj) {
    const clean = {}; Object.keys(obj || {}).forEach(k => { clean[k] = obj[k] == null ? '' : String(obj[k]); });
    if (await setsUsesSb()) {
      const rows = Object.keys(clean).map(k => ({ chave: k, valor: clean[k] }));
      if (rows.length) await sb('settings', { method: 'POST', headers: { Prefer: 'resolution=merge-duplicates,return=minimal' }, body: JSON.stringify(rows) });
      try { const cur = loadSettingsJson(); Object.assign(cur, clean); jsave('settings.json', cur); } catch (e) {}
      return true;
    }
    const cur = loadSettingsJson(); Object.assign(cur, clean); jsave('settings.json', cur); return true;
  },

  // ---- diagnóstico ----
  async ping() {
    if (!USE_SB) return { ok: true, mode: 'json' };
    await sb('leads?select=id&limit=1');
    return { ok: true, mode: 'supabase' };
  }
};
