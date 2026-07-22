// VisionX — migra os dados dos arquivos JSON locais (data/*.json) para o Supabase.
// Uso: configure o .env (SUPABASE_URL + SUPABASE_SERVICE_ROLE_KEY) e rode:
//   node migrate-to-supabase.js
const fs = require('fs');
const path = require('path');

// carrega .env
try {
  const p = path.join(__dirname, '.env');
  if (fs.existsSync(p)) fs.readFileSync(p, 'utf8').split(/\r?\n/).forEach(function (l) {
    const m = l.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
    if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
  });
} catch (e) {}

const SB_URL = (process.env.SUPABASE_URL || '').replace(/\/+$/, '');
const SB_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_KEY || '';
if (!SB_URL || !SB_KEY) {
  console.error('❌ Configure SUPABASE_URL e SUPABASE_SERVICE_ROLE_KEY no .env primeiro.');
  process.exit(1);
}

function jload(n) { try { return JSON.parse(fs.readFileSync(path.join(__dirname, 'data', n), 'utf8')); } catch { return []; } }

async function insert(table, rows) {
  if (!rows.length) return 0;
  const res = await fetch(SB_URL + '/rest/v1/' + table, {
    method: 'POST',
    headers: { apikey: SB_KEY, Authorization: 'Bearer ' + SB_KEY, 'Content-Type': 'application/json', Prefer: 'return=minimal' },
    body: JSON.stringify(rows)
  });
  if (!res.ok) throw new Error(table + ' ' + res.status + ': ' + (await res.text()));
  return rows.length;
}

(async () => {
  const leads = jload('leads.json').map(l => ({
    created_at: l.data || new Date().toISOString(),
    nome: l.nome || null, email: l.email, mensagem: l.mensagem || null, origem: l.origem || null, status: l.status || 'novo'
  }));
  const news = jload('newsletter.json').map(n => ({ created_at: n.data || new Date().toISOString(), email: n.email }));
  console.log('Migrando dados locais para o Supabase...');
  console.log('  leads inseridos:     ' + (await insert('leads', leads)));
  console.log('  newsletter inserida: ' + (await insert('newsletter', news)));
  console.log('✅ Concluído! Confira no painel do Supabase (Table Editor).');
})().catch(e => { console.error('❌ Erro na migração:', e.message); process.exit(1); });
