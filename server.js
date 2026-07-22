// VisionX — servidor do site + captura de leads + painel admin
const express = require('express');
const fs = require('fs');
const path = require('path');
const crypto = require('crypto');

// carrega variáveis de um arquivo .env (se existir) — sem dependências
try {
  const envPath = path.join(__dirname, '.env');
  if (fs.existsSync(envPath)) {
    fs.readFileSync(envPath, 'utf8').split(/\r?\n/).forEach(function (line) {
      const m = line.match(/^\s*([A-Za-z0-9_]+)\s*=\s*(.*)\s*$/);
      if (m && !process.env[m[1]]) process.env[m[1]] = m[2].replace(/^["']|["']$/g, '');
    });
  }
} catch (e) {}

const db = require('./db');

const app = express();
const PORT = process.env.PORT || 8099;
const SITE_DIR = path.join(__dirname, 'site');
const DATA_DIR = path.join(__dirname, 'data');
const ADMIN_USER = process.env.ADMIN_USER || 'admin';
const ADMIN_PASS = process.env.ADMIN_PASS || 'visionx2025'; // TROQUE isso (env ADMIN_PASS)
const IS_DEFAULT_PASS = !process.env.ADMIN_PASS || ADMIN_PASS === 'visionx2025';
// Segredo de sessão INDEPENDENTE da senha: sabendo a senha não dá pra forjar o cookie.
// Prioridade: env ADMIN_SECRET (sessão estável entre reinícios) -> aleatório por boot (desloga no restart, mais seguro).
const ADMIN_SECRET = process.env.ADMIN_SECRET || crypto.randomBytes(32).toString('hex');
const SESSION_HOURS = 12;
if (IS_DEFAULT_PASS) {
  console.warn('\n  ⚠️  ADMIN_PASS está no padrão! Defina ADMIN_PASS (senha forte) no .env antes de publicar.');
}
if (!process.env.ADMIN_SECRET) {
  console.warn('  ℹ️  ADMIN_SECRET não definido — usando segredo aleatório (você precisa relogar a cada reinício). Defina ADMIN_SECRET no .env pra manter a sessão.\n');
}

fs.mkdirSync(DATA_DIR, { recursive: true });

app.use(express.json({ limit: '4mb' })); // 4mb p/ permitir upload de foto da equipe (base64)
app.use(express.urlencoded({ extended: true }));

// ===================== SEGURANÇA =====================
app.set('trust proxy', 1);
var FORCE_HTTPS = process.env.FORCE_HTTPS === '1'; // ligar em produção
var INSTA = 'https://www.instagram.com/visionx.dev/';

// 1) Força HTTPS (atrás de proxy/host) — criptografia em trânsito
app.use(function (req, res, next) {
  if (FORCE_HTTPS && req.headers['x-forwarded-proto'] === 'http') {
    return res.redirect(301, 'https://' + req.headers.host + req.originalUrl);
  }
  next();
});

// 2) Cabeçalhos de segurança
app.use(function (req, res, next) {
  res.setHeader('Content-Security-Policy',
    "default-src 'self'; script-src 'self' 'unsafe-inline'; style-src 'self' 'unsafe-inline'; " +
    "img-src 'self' data:; font-src 'self' data:; connect-src 'self'; frame-ancestors 'none'; " +
    "base-uri 'self'; form-action 'self'; object-src 'none'; upgrade-insecure-requests");
  res.setHeader('X-Frame-Options', 'DENY');                 // impede embutir o site em iframe (anti-cópia/phishing)
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  res.setHeader('Permissions-Policy', 'geolocation=(), microphone=(), camera=(), interest-cohort=()');
  res.setHeader('X-DNS-Prefetch-Control', 'off');
  if (FORCE_HTTPS) res.setHeader('Strict-Transport-Security', 'max-age=63072000; includeSubDomains; preload');
  res.removeHeader('X-Powered-By');
  next();
});

// 3) Bloqueia ferramentas de clonagem/scraping (permitindo buscadores)
var BADBOTS = /(curl|wget|httrack|webcopier|teleport|webzip|wpull|scrapy|python-requests|python-urllib|libwww|go-http-client|node-fetch|axios|java\/|okhttp|apache-httpclient|winhttp|headlesschrome|phantomjs|dataminr|masscan|zgrab)/i;
var GOODBOTS = /(googlebot|bingbot|slurp|duckduckbot|baiduspider|yandexbot|applebot|facebookexternalhit|twitterbot|linkedinbot|whatsapp|telegrambot|discordbot|pinterest|semrushbot|ahrefsbot)/i;
app.use(function (req, res, next) {
  var ua = req.headers['user-agent'] || '';
  if (!GOODBOTS.test(ua) && (ua === '' || BADBOTS.test(ua))) {
    return res.redirect(302, INSTA); // clonadores caem no Instagram
  }
  next();
});

// 4) Rate limiting — conta SÓ navegações de página (não assets), 200 páginas/min por IP
var hits = Object.create(null);
setInterval(function () { hits = Object.create(null); }, 60000);
var ASSET_RE = /\.(css|js|mjs|woff2?|ttf|otf|eot|avif|webp|png|jpe?g|gif|svg|ico|json|xml|txt|map)$/i;
app.use(function (req, res, next) {
  var p = req.path;
  if (ASSET_RE.test(p) ||
      p.indexOf('/api') === 0 || p.indexOf('/admin') === 0 ||
      p.indexOf('/_astro') === 0 || p.indexOf('/assets') === 0 ||
      p.indexOf('/images') === 0 || p.indexOf('/fonts') === 0) return next();
  var ip = req.ip || 'x';
  hits[ip] = (hits[ip] || 0) + 1;
  if (hits[ip] > 200) return res.status(429).send('Muitas requisições. Tente novamente em instantes.');
  next();
});

// 5) Anti-brute-force nos endpoints sensíveis (login do admin + formulários públicos)
var sensiHits = Object.create(null);
setInterval(function () { sensiHits = Object.create(null); }, 60000);
function tooMany(req, res, max) {
  var ip = req.ip || 'x';
  var k = req.path + '|' + ip;
  sensiHits[k] = (sensiHits[k] || 0) + 1;
  if (sensiHits[k] > max) { res.status(429).send('Muitas tentativas. Aguarde um minuto.'); return true; }
  return false;
}
app.use(function (req, res, next) {
  if (req.method === 'POST') {
    if (req.path === '/admin/login' && tooMany(req, res, 8)) return;      // 8 logins/min por IP
    if ((req.path === '/api/lead' || req.path === '/api/newsletter' || req.path === '/api/contact') && tooMany(req, res, 20)) return; // 20 envios/min por IP
  }
  next();
});
// ====================================================

// ---------- armazenamento: delegado ao módulo db (Supabase ou JSON) ----------
const esc = s => String(s == null ? '' : s).replace(/[&<>"]/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

// ---------- sessão do admin (cookie assinado, sem dependências) ----------
function signToken(obj) {
  const payload = Buffer.from(JSON.stringify(obj)).toString('base64url');
  const sig = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('base64url');
  return payload + '.' + sig;
}
function verifyToken(token) {
  if (!token || token.indexOf('.') < 0) return null;
  const [payload, sig] = token.split('.');
  const expected = crypto.createHmac('sha256', ADMIN_SECRET).update(payload).digest('base64url');
  const a = Buffer.from(sig), b = Buffer.from(expected);
  if (a.length !== b.length || !crypto.timingSafeEqual(a, b)) return null;
  try {
    const obj = JSON.parse(Buffer.from(payload, 'base64url').toString());
    if (obj.exp && Date.now() > obj.exp) return null;
    return obj;
  } catch { return null; }
}
function parseCookies(req) {
  const out = {}; const h = req.headers.cookie || '';
  h.split(';').forEach(function (p) { const i = p.indexOf('='); if (i > 0) out[p.slice(0, i).trim()] = decodeURIComponent(p.slice(i + 1).trim()); });
  return out;
}

// ---------- API dos formulários (públicas) ----------
app.post('/api/lead', async (req, res) => {
  const { nome, email, mensagem } = req.body || {};
  if (!email) return res.status(400).json({ ok: false, erro: 'E-mail obrigatório' });
  try {
    await db.addLead({
      nome: (nome || '').trim(), email: (email || '').trim(), mensagem: (mensagem || '').trim(),
      origem: req.get('referer') || ''
    });
    res.json({ ok: true });
  } catch (e) { console.error('addLead:', e.message); res.status(500).json({ ok: false, erro: 'Falha ao salvar' }); }
});

app.post('/api/newsletter', async (req, res) => {
  const { email } = req.body || {};
  if (!email) return res.status(400).json({ ok: false, erro: 'E-mail obrigatório' });
  try {
    await db.addNews({ email: (email || '').trim() });
    if (!req.is('application/json')) return res.send(thanksPage('Inscrição confirmada!', 'Você entrou na nossa newsletter.'));
    res.json({ ok: true });
  } catch (e) { console.error('addNews:', e.message); res.status(500).json({ ok: false, erro: 'Falha ao salvar' }); }
});

// página simples de agradecimento (usada quando o formulário é enviado sem JavaScript)
function thanksPage(titulo, msg) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><title>${titulo} | VisionX</title>
<style>body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:#f5f5f7;color:#1d1d1f;text-align:center;padding:24px}.c{max-width:420px}h1{font-size:22px;letter-spacing:-.02em}p{color:#5b6673}a{display:inline-block;margin-top:18px;padding:12px 22px;border-radius:980px;background:#1d1d1f;color:#fff;text-decoration:none;font-weight:600}</style>
</head><body><div class="c"><div style="font-size:44px">✅</div><h1>${titulo}</h1><p>${msg}</p><a href="/">Voltar ao site</a></div></body></html>`;
}

// fallback do formulário de contato (envio nativo do Webflow -> /api/contact, urlencoded)
app.post('/api/contact', async (req, res) => {
  const b = req.body || {};
  const nome = (b.nome || b.Name || '').trim();
  const email = (b.email || b.Address || '').trim();
  const mensagem = (b.mensagem || b.Mensagem || '').trim();
  if (!email) return res.status(400).send('E-mail obrigatório');
  try {
    await db.addLead({ nome, email, mensagem, origem: req.get('referer') || '' });
    if (!req.is('application/json')) return res.send(thanksPage('Mensagem recebida!', 'Obrigado pelo contato — retornaremos em breve.'));
    res.json({ ok: true });
  } catch (e) { console.error('contact:', e.message); res.status(500).send('Falha ao enviar'); }
});

// equipe (público, só leitura) — a página Sobre lê daqui
app.get('/api/team', async (req, res) => {
  try { const t = (await db.getTeam()).filter(m => m.ativo !== false); res.json(t); }
  catch (e) { console.error('getTeam:', e.message); res.json([]); }
});

// conteúdo/configurações do site (público, só leitura)
app.get('/api/settings', async (req, res) => {
  try { res.json(await db.getSettings()); }
  catch (e) { console.error('getSettings:', e.message); res.json({}); }
});

// depoimentos (público, só leitura)
app.get('/api/depoimentos', async (req, res) => {
  try { res.json((await db.getDepoimentos()).filter(d => d.ativo !== false)); }
  catch (e) { console.error('getDepoimentos:', e.message); res.json([]); }
});

// ---------- autenticação do admin (sessão por cookie assinado) ----------
function auth(req, res, next) {
  if (verifyToken(parseCookies(req)['vx_admin'])) return next();
  if (req.path.indexOf('/admin/api') === 0) return res.status(401).json({ ok: false, erro: 'sessão expirada' });
  return res.redirect(302, '/admin/login');
}

function loginPage(erro) {
  return `<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Entrar — Painel VisionX</title>
<link rel="icon" href="/favicon.png?v=5">
<style>
  @font-face{font-family:"Plus Jakarta Sans";font-weight:400;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-400-normal.Dhut76fR.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:600;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-600-normal.DLTa1BUW.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:700;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-700-normal.CfpNZvy6.woff2) format("woff2")}
  *{box-sizing:border-box}
  body{margin:0;min-height:100vh;display:flex;align-items:center;justify-content:center;padding:20px;
    font-family:"Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;
    background:#f5f7fa;color:#414b57;-webkit-font-smoothing:antialiased}
  form{width:100%;max-width:370px;padding:40px 36px;background:#fff;border:1px solid #e7eaef;border-radius:20px;box-shadow:0 12px 40px rgba(20,26,34,.08);text-align:center}
  .vxlogo{height:30px;width:auto;margin:0 auto 18px;display:block}
  h1{font-size:19px;margin:0 0 3px;color:#141a22;letter-spacing:-.01em} p.sub{color:#8a95a3;font-size:13px;margin:0 0 24px}
  label{display:block;text-align:left;font-size:12px;color:#6b7683;margin:0 0 6px;font-weight:600}
  input{width:100%;padding:13px 14px;border-radius:12px;border:1px solid #e7eaef;background:#fff;color:#141a22;font-size:15px;outline:none;font-family:inherit}
  input:focus{border-color:#00d4ff;box-shadow:0 0 0 3px rgba(0,212,255,.14)}
  button{width:100%;margin-top:18px;padding:13px;border:0;border-radius:22px;background:#0b1017;color:#fff;font-weight:700;font-size:15px;cursor:pointer;font-family:inherit}
  button:hover{background:#171f2b}
  .err{background:#fff5f5;color:#e53e3e;border:1px solid rgba(229,62,62,.25);border-radius:11px;padding:10px 12px;font-size:13px;margin-bottom:16px}
  .home{display:inline-block;margin-top:18px;color:#8a95a3;font-size:12.5px;text-decoration:none;font-weight:500}.home:hover{color:#0a8fb0}
  /* Apple polish */
  html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  body{background:#f5f5f7}
  h1{letter-spacing:-.022em}
  form{border:1px solid rgba(0,0,0,.06);box-shadow:0 1px 2px rgba(0,0,0,.04),0 24px 56px -22px rgba(0,0,0,.28)}
  input{border-radius:12px}
  input:focus{border-color:rgba(0,0,0,.16);box-shadow:0 0 0 4px rgba(0,212,255,.16)}
  button{border-radius:980px;transition:transform .18s cubic-bezier(.4,0,.2,1),background-color .2s}
  button:hover{transform:translateY(-1px)} button:active{transform:scale(.97)}
  @keyframes vxin{from{opacity:0;transform:translateY(10px) scale(.99)}to{opacity:1;transform:none}}
  form{animation:vxin .55s cubic-bezier(.2,.7,.2,1) both}
  @media(prefers-reduced-motion:reduce){form{animation:none}*{transition:none!important}}
</style></head><body>
<form method="POST" action="/admin/login" autocomplete="off">
  <img class="vxlogo" src="/images/logo.png?v=2" alt="VisionX">
  <h1>Painel</h1><p class="sub">Acesso restrito · leads, equipe e conteúdo</p>
  ${erro ? '<div class="err">Senha incorreta. Tente novamente.</div>' : ''}
  <label for="senha">Senha</label>
  <input id="senha" type="password" name="senha" placeholder="••••••••" autofocus required>
  <button type="submit">Entrar</button>
  <a class="home" href="/">← Voltar ao site</a>
</form></body></html>`;
}

app.get('/admin/login', (req, res) => {
  if (verifyToken(parseCookies(req)['vx_admin'])) return res.redirect('/admin');
  res.send(loginPage(req.query.e));
});
app.post('/admin/login', (req, res) => {
  const senha = (req.body && req.body.senha) || '';
  const user = (req.body && req.body.usuario) || ADMIN_USER;
  if (user === ADMIN_USER && senha === ADMIN_PASS) {
    const tok = signToken({ u: ADMIN_USER, exp: Date.now() + SESSION_HOURS * 3600000 });
    res.setHeader('Set-Cookie', 'vx_admin=' + tok + '; HttpOnly; Path=/admin; SameSite=Lax; Max-Age=' + (SESSION_HOURS * 3600) + (FORCE_HTTPS ? '; Secure' : ''));
    return res.redirect('/admin');
  }
  return res.redirect('/admin/login?e=1');
});
app.get('/admin/logout', (req, res) => {
  res.setHeader('Set-Cookie', 'vx_admin=; HttpOnly; Path=/admin; Max-Age=0');
  res.redirect('/admin/login');
});

// ---------- ações do painel (protegidas) ----------
app.post('/admin/api/lead-status', auth, async (req, res) => {
  const { id, status } = req.body || {};
  if (['novo', 'andamento', 'fechado'].indexOf(status) < 0) return res.status(400).json({ ok: false });
  try { const ok = await db.setLeadStatus(id, status); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('setLeadStatus:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/lead-delete', auth, async (req, res) => {
  const { id } = req.body || {};
  try { const ok = await db.delLead(id); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('delLead:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/news-delete', auth, async (req, res) => {
  const { id } = req.body || {};
  try { const removed = await db.delNews(id); res.json({ ok: true, removed }); }
  catch (e) { console.error('delNews:', e.message); res.status(500).json({ ok: false }); }
});

// ---- equipe (protegido) ----
app.post('/admin/api/team-add', auth, async (req, res) => {
  try { const membro = await db.addTeam(req.body || {}); res.json({ ok: true, membro }); }
  catch (e) { console.error('addTeam:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/team-update', auth, async (req, res) => {
  const { id } = req.body || {};
  try { const ok = await db.updateTeam(id, req.body || {}); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('updateTeam:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/team-delete', auth, async (req, res) => {
  try { const ok = await db.delTeam((req.body || {}).id); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('delTeam:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/team-reorder', auth, async (req, res) => {
  const ids = (req.body || {}).ordem || [];
  try { await db.reorderTeam(ids); res.json({ ok: true }); }
  catch (e) { console.error('reorderTeam:', e.message); res.status(500).json({ ok: false }); }
});
// conteúdo/configurações do site (protegido)
app.post('/admin/api/settings', auth, async (req, res) => {
  try { await db.setSettings(req.body || {}); res.json({ ok: true }); }
  catch (e) { console.error('setSettings:', e.message); res.status(500).json({ ok: false }); }
});
// depoimentos (protegido)
app.post('/admin/api/dep-add', auth, async (req, res) => {
  try { res.json({ ok: true, item: await db.addDepoimento(req.body || {}) }); }
  catch (e) { console.error('addDepoimento:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/dep-update', auth, async (req, res) => {
  try { const ok = await db.updateDepoimento((req.body || {}).id, req.body || {}); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('updateDepoimento:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/dep-delete', auth, async (req, res) => {
  try { const ok = await db.delDepoimento((req.body || {}).id); return ok ? res.json({ ok: true }) : res.status(404).json({ ok: false }); }
  catch (e) { console.error('delDepoimento:', e.message); res.status(500).json({ ok: false }); }
});
app.post('/admin/api/dep-reorder', auth, async (req, res) => {
  try { await db.reorderDepoimentos((req.body || {}).ordem || []); res.json({ ok: true }); }
  catch (e) { console.error('reorderDepoimentos:', e.message); res.status(500).json({ ok: false }); }
});
// upload genérico de imagem (base64 -> site/images/uploads/)
app.post('/admin/api/upload', auth, (req, res) => {
  try {
    const dataUrl = (req.body || {}).dataUrl || '';
    const m = /^data:image\/(png|jpe?g|webp|gif|avif);base64,(.+)$/i.exec(dataUrl); // sem SVG (evita XSS armazenado)
    if (!m) return res.status(400).json({ ok: false, erro: 'Formato inválido' });
    const ext = m[1].toLowerCase().replace('jpeg', 'jpg');
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > 3.5 * 1024 * 1024) return res.status(400).json({ ok: false, erro: 'Imagem muito grande (máx 3,5MB)' });
    const dir = path.join(SITE_DIR, 'images', 'uploads');
    fs.mkdirSync(dir, { recursive: true });
    const name = 'u' + Date.now() + Math.floor(Math.random() * 1000) + '.' + ext;
    fs.writeFileSync(path.join(dir, name), buf);
    res.json({ ok: true, path: '/images/uploads/' + name });
  } catch (e) { console.error('upload:', e.message); res.status(500).json({ ok: false }); }
});
// upload de foto da equipe (base64 -> salva em site/images/team/)
app.post('/admin/api/team-photo', auth, (req, res) => {
  try {
    const dataUrl = (req.body || {}).dataUrl || '';
    const m = /^data:image\/(png|jpe?g|webp|gif);base64,(.+)$/i.exec(dataUrl);
    if (!m) return res.status(400).json({ ok: false, erro: 'Formato inválido' });
    const ext = m[1].toLowerCase() === 'jpeg' ? 'jpg' : m[1].toLowerCase();
    const buf = Buffer.from(m[2], 'base64');
    if (buf.length > 3 * 1024 * 1024) return res.status(400).json({ ok: false, erro: 'Máx 3MB' });
    const dir = path.join(SITE_DIR, 'images', 'team');
    fs.mkdirSync(dir, { recursive: true });
    const name = 'm' + Date.now() + Math.floor(Math.random() * 1000) + '.' + ext;
    fs.writeFileSync(path.join(dir, name), buf);
    res.json({ ok: true, path: '/images/team/' + name });
  } catch (e) { console.error('team-photo:', e.message); res.status(500).json({ ok: false }); }
});

// ---------- exportar CSV ----------
app.get('/admin/export/:tipo.csv', auth, async (req, res) => {
  const isNews = req.params.tipo === 'newsletter';
  try {
    const rows = isNews ? await db.getNews() : await db.getLeads();
    const cols = isNews ? ['data', 'email'] : ['data', 'nome', 'email', 'mensagem', 'status', 'origem'];
    // neutraliza injeção de fórmula (=,+,-,@ no início viram fórmula no Excel/Sheets)
    const csvCell = v => { let s = String(v == null ? '' : v); if (/^[=+\-@\t\r]/.test(s)) s = "'" + s; return '"' + s.replace(/"/g, '""') + '"'; };
    const csv = [cols.join(',')].concat(rows.map(r => cols.map(c => csvCell(r[c])).join(','))).join('\n');
    res.set('Content-Type', 'text/csv; charset=utf-8').set('Content-Disposition', `attachment; filename="${req.params.tipo}.csv"`).send('﻿' + csv);
  } catch (e) { console.error('export:', e.message); res.status(500).send('Falha ao exportar'); }
});

// ---------- painel admin (dashboard) ----------
app.get('/admin', auth, async (req, res) => {
  res.setHeader('Cache-Control', 'no-store, must-revalidate');
  let data = { leads: [], news: [], team: [], settings: {}, depoimentos: [] };
  try { data = { leads: await db.getLeads(), news: await db.getNews(), team: await db.getTeam(), settings: await db.getSettings(), depoimentos: await db.getDepoimentos() }; }
  catch (e) { console.error('getData:', e.message); }
  const dataJson = JSON.stringify(data).replace(/</g, '\\u003c').replace(/-->/g, '--\\>');
  res.send(`<!doctype html><html lang="pt-BR"><head><meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1"><meta name="robots" content="noindex">
<title>Painel VisionX — Leads</title>
<link rel="icon" href="/favicon.png?v=5">
<style>
  @font-face{font-family:"Plus Jakarta Sans";font-weight:400;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-400-normal.Dhut76fR.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:500;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-500-normal.Bf-nb4oT.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:600;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-600-normal.DLTa1BUW.woff2) format("woff2")}
  @font-face{font-family:"Plus Jakarta Sans";font-weight:700;font-display:swap;src:url(/_astro/plus-jakarta-sans-latin-700-normal.CfpNZvy6.woff2) format("woff2")}
  :root{--cy:#00d4ff;--cyd:#0a8fb0;--ink:#141a22;--body:#414b57;--muted:#8a95a3;--line:#e7eaef;--bg:#f5f7fa;--card:#fff;--dark:#0b1017}
  *{box-sizing:border-box}
  body{margin:0;font-family:"Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif;background:var(--bg);color:var(--body);-webkit-font-smoothing:antialiased}
  a{color:var(--cyd);text-decoration:none} a:hover{text-decoration:underline}
  header{display:flex;align-items:center;gap:12px;padding:14px 24px;border-bottom:1px solid var(--line);position:sticky;top:0;background:rgba(255,255,255,.92);backdrop-filter:blur(8px);z-index:10}
  .vxlogo{height:26px;width:auto;display:block}
  .badge-admin{font-size:11px;font-weight:700;color:var(--cyd);background:rgba(0,212,255,.12);border:1px solid rgba(0,212,255,.28);padding:3px 10px;border-radius:20px}
  header .sp{flex:1}
  .hbtn{font-size:13px;font-weight:600;padding:9px 16px;border-radius:22px;border:1px solid var(--line);background:#fff;color:#4a5560;cursor:pointer;text-decoration:none;transition:.15s;font-family:inherit}
  .hbtn:hover{border-color:#cfd6de;color:var(--ink);text-decoration:none}
  .hbtn.primary{background:var(--dark);color:#fff;border-color:var(--dark)} .hbtn.primary:hover{background:#171f2b;color:#fff}
  main{padding:26px 24px 64px;max-width:1120px;margin:0 auto}
  h1,h2,h3{color:var(--ink);letter-spacing:-.01em}
  .stats{display:grid;grid-template-columns:repeat(5,1fr);gap:14px;margin-bottom:24px}
  .stat{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:18px 20px;box-shadow:0 1px 2px rgba(20,26,34,.04)}
  .stat .v{font-size:30px;font-weight:800;line-height:1;color:var(--ink);letter-spacing:-.02em}
  .stat .l{color:var(--muted);font-size:12.5px;margin-top:8px;font-weight:500}
  .stat.accent{border-color:rgba(0,212,255,.45);background:linear-gradient(180deg,rgba(0,212,255,.09),#fff)}
  .stat.accent .v{color:var(--cyd)}
  .tabs{display:flex;gap:8px;margin-bottom:18px;flex-wrap:wrap}
  .tab{padding:9px 16px;border-radius:22px;border:1px solid var(--line);background:#fff;color:#5b6673;font-size:13.5px;cursor:pointer;font-weight:600;transition:.15s;font-family:inherit}
  .tab:hover{border-color:#cfd6de;color:var(--ink)}
  .tab.on{background:var(--dark);color:#fff;border-color:var(--dark)}
  .toolbar{display:flex;flex-wrap:wrap;gap:10px;align-items:center;margin-bottom:16px}
  .search{flex:1;min-width:220px;position:relative}
  .search input{width:100%;padding:11px 14px 11px 40px;border-radius:12px;border:1px solid var(--line);background:#fff;color:var(--ink);font-size:14px;outline:none;font-family:inherit}
  .search input:focus{border-color:var(--cy);box-shadow:0 0 0 3px rgba(0,212,255,.13)}
  .search svg{position:absolute;left:13px;top:12px}
  .chips{display:flex;gap:6px;flex-wrap:wrap}
  .chip{padding:8px 13px;border-radius:22px;border:1px solid var(--line);background:#fff;color:#5b6673;font-size:13px;cursor:pointer;font-weight:500;font-family:inherit}
  .chip:hover{border-color:#cfd6de}
  .chip.on{border-color:var(--cy);color:var(--cyd);background:rgba(0,212,255,.1);font-weight:700}
  .exp{margin-left:auto;font-size:13px;font-weight:700;padding:10px 16px;border-radius:22px;background:var(--dark);color:#fff;border:1px solid var(--dark);cursor:pointer;font-family:inherit}
  .exp:hover{text-decoration:none;background:#171f2b;color:#fff}
  .tablewrap{background:var(--card);border:1px solid var(--line);border-radius:16px;overflow-x:auto;box-shadow:0 1px 2px rgba(20,26,34,.04)}
  table{width:100%;border-collapse:collapse;font-size:14px;min-width:720px}
  th,td{text-align:left;padding:13px 16px;border-bottom:1px solid var(--line);vertical-align:top}
  th{color:var(--muted);font-weight:700;font-size:11px;text-transform:uppercase;letter-spacing:.05em;background:#fbfcfd}
  tr:last-child td{border-bottom:0}
  td a{color:var(--cyd)} .nowrap{white-space:nowrap;color:#6b7683;font-size:13px}
  .muted{color:var(--muted)}
  .msg{max-width:340px;-webkit-line-clamp:2;-webkit-box-orient:vertical;display:-webkit-box;overflow:hidden;cursor:pointer;color:#5b6673}
  .msg.open{-webkit-line-clamp:unset;display:block}
  .stsel{border:1px solid var(--line);border-radius:22px;padding:6px 11px;font-size:12px;font-weight:700;background:#fff;color:#5b6673;cursor:pointer;outline:none;font-family:inherit}
  .stsel.st-novo{color:var(--cyd);border-color:rgba(0,212,255,.5);background:rgba(0,212,255,.07)}
  .stsel.st-and{color:#c47d10;border-color:rgba(214,150,30,.4);background:rgba(245,181,68,.1)}
  .stsel.st-fech{color:#1f9d57;border-color:rgba(46,180,110,.4);background:rgba(46,180,110,.08)}
  .acts{white-space:nowrap;display:flex;gap:6px}
  .ic{width:32px;height:32px;display:inline-flex;align-items:center;justify-content:center;border-radius:9px;border:1px solid var(--line);background:#fff;color:#5b6673;cursor:pointer;font-size:14px;text-decoration:none;transition:.15s}
  .ic:hover{border-color:var(--cy);color:var(--cyd);text-decoration:none}
  .ic.danger:hover{border-color:#ff6b6b;color:#e53e3e;background:#fff5f5}
  .empty{padding:38px;text-align:center;color:var(--muted)}
  .count{color:var(--muted);font-size:13px;margin:0 0 12px}
  .toast{position:fixed;bottom:24px;left:50%;transform:translateX(-50%) translateY(20px);background:var(--dark);color:#fff;padding:12px 22px;border-radius:12px;font-weight:600;font-size:14px;opacity:0;pointer-events:none;transition:.25s;z-index:50;box-shadow:0 12px 32px rgba(11,16,23,.24)}
  .toast.show{opacity:1;transform:translateX(-50%) translateY(0)}
  @media(max-width:820px){.stats{grid-template-columns:repeat(2,1fr)}}
  .tbtn{padding:11px 18px;border:0;border-radius:22px;background:var(--dark);color:#fff;font-weight:700;font-size:13.5px;cursor:pointer;margin-bottom:14px;font-family:inherit}
  .tbtn:hover{background:#171f2b}
  .tbtn.ghost{background:#fff;color:#5b6673;border:1px solid var(--line);font-weight:600;margin-left:8px}
  .tbtn.ghost:hover{border-color:#cfd6de;color:var(--ink)}
  .tform{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px;margin-bottom:16px;max-width:560px;box-shadow:0 1px 2px rgba(20,26,34,.04)}
  .tftitle{font-weight:700;margin-bottom:16px;color:var(--ink);font-size:15px}
  .trow{margin-bottom:14px} .trow>label{display:block;font-size:12px;color:#6b7683;margin-bottom:6px;font-weight:600}
  .tform input[type=text],.tform input:not([type]),.tform input[type=number],.tform textarea{width:100%;padding:11px 13px;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:11px;font-size:14px;outline:none;font-family:inherit}
  .tform textarea{resize:vertical;line-height:1.5}
  .tform input:focus,.tform textarea:focus{border-color:var(--cy);box-shadow:0 0 0 3px rgba(0,212,255,.13)}
  .tchk{display:flex;align-items:center;gap:8px;font-size:14px;color:var(--body);margin-top:4px} .tchk input{width:auto}
  .tlist{display:flex;flex-direction:column;gap:10px}
  .tmember{display:flex;align-items:center;gap:14px;background:var(--card);border:1px solid var(--line);border-radius:14px;padding:12px 16px;cursor:default;box-shadow:0 1px 2px rgba(20,26,34,.04)}
  .tmember.dragging{opacity:.5;border-color:var(--cy)}
  .tavatar{width:46px;height:46px;border-radius:50%;background:#eef1f5 center/cover no-repeat;flex:0 0 auto}
  .tinfo{flex:1} .tname{font-weight:700;color:var(--ink)} .tcargo{color:var(--muted);font-size:13px}
  .thandle{cursor:grab;color:#c2cad3;font-size:16px;user-select:none;padding:0 2px;line-height:1} .thandle:active{cursor:grabbing}
  .tswitch{position:relative;display:inline-block;width:42px;height:24px;flex:0 0 auto}
  .tswitch input{opacity:0;width:0;height:0}
  .tslider{position:absolute;inset:0;background:#d3d9e0;border-radius:24px;transition:.2s;cursor:pointer}
  .tslider:before{content:"";position:absolute;height:18px;width:18px;left:3px;top:3px;background:#fff;border-radius:50%;transition:.2s;box-shadow:0 1px 2px rgba(0,0,0,.2)}
  .tswitch input:checked+.tslider{background:var(--cy)}
  .tswitch input:checked+.tslider:before{transform:translateX(18px)}
  .tphoto-area{width:112px;height:112px;border:2px dashed #d3d9e0;border-radius:14px;display:flex;align-items:center;justify-content:center;cursor:pointer;overflow:hidden;color:var(--muted);text-align:center;font-size:12px;line-height:1.4;margin-bottom:8px;transition:border-color .15s}
  .tphoto-area:hover{border-color:var(--cy);color:var(--cyd)}
  .tphoto-area img{width:100%;height:100%;object-fit:cover}
  .tkbd{color:#aab2bc;font-size:12px;margin-left:12px}
  .hint{background:rgba(0,212,255,.07);border:1px solid rgba(0,212,255,.22);color:#33707f;font-size:13px;line-height:1.5;padding:11px 15px;border-radius:12px;margin-bottom:16px}
  .hint b{color:var(--ink)}
  .empty2{background:var(--card);border:1px dashed #d3d9e0;border-radius:16px;padding:46px 22px;text-align:center;color:var(--muted)}
  .empty2 .ei{font-size:34px;margin-bottom:10px}
  .empty2 .et{font-weight:700;color:var(--ink);margin-bottom:5px}
  .empty2 .es{font-size:13px;max-width:380px;margin:0 auto;line-height:1.5}
  tr.row-novo td{background:rgba(0,212,255,.05)}
  tr.row-novo td:first-child{box-shadow:inset 3px 0 0 var(--cy)}
  .cgroup{background:var(--card);border:1px solid var(--line);border-radius:16px;padding:20px 22px;margin-bottom:16px;max-width:620px;box-shadow:0 1px 2px rgba(20,26,34,.04)}
  .cgt{font-weight:700;color:var(--ink);font-size:15px;margin-bottom:16px;padding-bottom:12px;border-bottom:1px solid var(--line)}
  .crow{margin-bottom:14px} .crow label{display:block;font-size:12px;color:#6b7683;margin-bottom:6px;font-weight:600}
  .crow input{width:100%;padding:11px 13px;border:1px solid var(--line);background:#fff;color:var(--ink);border-radius:11px;font-size:14px;outline:none;font-family:inherit}
  .crow input:focus{border-color:var(--cy);box-shadow:0 0 0 3px rgba(0,212,255,.13)}
  .cformacts{margin-top:6px}
  .sechint{color:var(--muted);font-size:12.5px;margin-bottom:14px}
  .secrow{display:flex;align-items:center;justify-content:space-between;gap:14px;padding:12px 0;border-bottom:1px solid var(--line)}
  .secrow:last-child{border-bottom:0}
  .secname{font-weight:600;color:var(--ink);font-size:14px} .secdesc{color:var(--muted);font-size:12px;margin-top:2px}
  .tbtn2{padding:9px 15px;border:1px solid var(--line);border-radius:22px;background:#fff;color:#4a5560;font-size:12.5px;font-weight:600;cursor:pointer;white-space:nowrap;font-family:inherit;flex:0 0 auto}
  .tbtn2:hover{border-color:var(--cy);color:var(--cyd)}
  .cimg{display:flex;align-items:center;gap:14px;padding:12px 0;border-bottom:1px solid var(--line)}
  .cimg:last-child{border-bottom:0}
  .cimg-prev{width:66px;height:46px;border-radius:9px;background:#eef1f5 center/cover no-repeat;flex:0 0 auto;border:1px solid var(--line)}
  .cimg-body{flex:1;min-width:0} .cimg-name{font-weight:600;color:var(--ink);font-size:14px;margin-bottom:6px}
  .cimg-url{width:100%;padding:8px 11px;border:1px solid var(--line);border-radius:9px;font-size:12.5px;color:var(--body);outline:none;font-family:inherit;background:#fff}
  .cimg-url:focus{border-color:var(--cy)}
  /* ===================== APPLE POLISH ===================== */
  html{-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}
  body{background:#f5f5f7}
  .stat,.tab,.tbtn,.exp,.hbtn,.ic,.tbtn2,.chip,.tmember,.tphoto-area,.stsel,input,a,.cimg-prev{transition:transform .22s cubic-bezier(.4,0,.2,1),box-shadow .3s cubic-bezier(.4,0,.2,1),background-color .2s ease,border-color .2s ease,color .18s ease}
  header{background:rgba(245,245,247,.72)!important;-webkit-backdrop-filter:saturate(180%) blur(20px);backdrop-filter:saturate(180%) blur(20px);border-bottom:1px solid rgba(0,0,0,.07)!important;padding:15px 28px!important}
  main{padding:32px 28px 84px!important}
  h1,h2,h3,.stat .v,.tftitle,.cgt,.empty2 .et,.badge-admin{letter-spacing:-.022em}
  .stat,.tablewrap,.cgroup,.tform{border:1px solid rgba(0,0,0,.06)!important;border-radius:18px!important;box-shadow:0 1px 2px rgba(0,0,0,.04),0 12px 32px -14px rgba(0,0,0,.14)!important}
  .stat{padding:20px 22px!important}
  .stat:hover{transform:translateY(-3px);box-shadow:0 2px 6px rgba(0,0,0,.05),0 20px 44px -16px rgba(0,0,0,.2)!important}
  .tmember{border:1px solid rgba(0,0,0,.06)!important;border-radius:16px!important;box-shadow:0 1px 2px rgba(0,0,0,.04)!important}
  .tmember:hover{transform:translateY(-2px);box-shadow:0 2px 6px rgba(0,0,0,.05),0 14px 32px -14px rgba(0,0,0,.16)!important}
  .tabs{display:inline-flex;flex-wrap:wrap;background:rgba(0,0,0,.05);padding:4px;border-radius:14px;gap:2px;margin-bottom:24px}
  .tab{border:0!important;background:transparent!important;border-radius:10px!important;color:#48484a!important;padding:8px 16px!important;box-shadow:none!important}
  .tab:hover{color:#1d1d1f!important;background:rgba(0,0,0,.04)!important}
  .tab.on{background:#fff!important;color:#1d1d1f!important;box-shadow:0 1px 3px rgba(0,0,0,.14),0 1px 1px rgba(0,0,0,.04)!important}
  .tbtn,.exp,.hbtn{border-radius:980px!important}
  .tbtn,.exp,.hbtn.primary{background:#1d1d1f!important;border-color:#1d1d1f!important}
  .tbtn:hover,.exp:hover,.hbtn.primary:hover{background:#000!important;transform:translateY(-1px);box-shadow:0 8px 20px -8px rgba(0,0,0,.5)!important;color:#fff!important}
  .tbtn:active,.exp:active,.hbtn:active,.ic:active,.tbtn2:active,.tab:active,.chip:active{transform:scale(.96)}
  .ic{border-radius:11px!important} .ic:hover{transform:translateY(-1px)}
  input,select{border-radius:12px!important}
  .search input:focus,.crow input:focus,.tform input:focus,.cimg-url:focus{border-color:rgba(0,0,0,.16)!important;box-shadow:0 0 0 4px rgba(0,212,255,.16)!important}
  @keyframes vxrise{from{opacity:0;transform:translateY(9px)}to{opacity:1;transform:none}}
  #vxstats>.stat{animation:vxrise .5s cubic-bezier(.2,.7,.2,1) both}
  #vxstats>.stat:nth-child(2){animation-delay:.05s} #vxstats>.stat:nth-child(3){animation-delay:.1s} #vxstats>.stat:nth-child(4){animation-delay:.15s} #vxstats>.stat:nth-child(5){animation-delay:.2s}
  #vxcontent>*{animation:vxrise .45s cubic-bezier(.2,.7,.2,1) both}
  .tslider,.tslider:before{transition:.3s cubic-bezier(.4,0,.2,1)!important}
  ::-webkit-scrollbar{width:11px;height:11px} ::-webkit-scrollbar-thumb{background:rgba(0,0,0,.16);border-radius:9px;border:3px solid transparent;background-clip:content-box} ::-webkit-scrollbar-thumb:hover{background:rgba(0,0,0,.28);background-clip:content-box}
  @media(prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
</style></head><body>
<header>
  <a href="/" target="_blank" aria-label="VisionX, abrir o site"><img class="vxlogo" src="/images/logo.png?v=2" alt="VisionX"></a>
  <span class="badge-admin">Painel</span>
  <div class="sp"></div>
  <button class="hbtn" onclick="location.reload()">Atualizar</button>
  <a class="hbtn primary" href="/admin/logout">Sair</a>
</header>
<main><div id="app"></div></main>
<div class="toast" id="toast"></div>
<script>
window.__DATA__ = ${dataJson};
(function(){
  var D = window.__DATA__ || {leads:[],news:[]};
  var leads = D.leads || [], news = D.news || [], team = D.team || [], settings = D.settings || {}, depoimentos = D.depoimentos || [];
  var state = { tab:'leads', q:'', status:'todos', form:null, depform:null };
  var STATUS = { novo:{label:'Novo',cls:'st-novo'}, andamento:{label:'Em andamento',cls:'st-and'}, fechado:{label:'Fechado',cls:'st-fech'} };

  function esc(s){ s=(s==null?'':String(s)); return s.replace(/[&<>"']/g,function(c){return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c];}); }
  // remove chars que quebram um url() de CSS (aspas, parênteses, barra, quebras) e escapa o resto
  function csurl(s){ return esc(String(s==null?'':s).replace(/["'()\\\r\n]/g,'')); }
  function stOf(l){ return (l.status && STATUS[l.status]) ? l.status : 'novo'; }
  function fmtFull(d){ try{ return new Date(d).toLocaleString('pt-BR'); }catch(e){ return d; } }
  function fmtRel(d){
    var t=new Date(d).getTime(); if(isNaN(t)) return String(d||'');
    var s=Math.floor((Date.now()-t)/1000);
    if(s<60) return 'agora'; var m=Math.floor(s/60); if(m<60) return 'há '+m+' min';
    var h=Math.floor(m/60); if(h<24) return 'há '+h+'h'; var dd=Math.floor(h/24); if(dd<7) return 'há '+dd+'d';
    return new Date(d).toLocaleDateString('pt-BR');
  }
  function find(a,id){ for(var i=0;i<a.length;i++){ if(a[i].id===id) return a[i]; } return null; }
  function toast(msg){ var t=document.getElementById('toast'); t.textContent=msg; t.classList.add('show'); setTimeout(function(){ t.classList.remove('show'); },1600); }
  function err(){ toast('Algo deu errado. Tente novamente.'); }
  function post(u,b){ return fetch(u,{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify(b)}).then(function(r){ if(!r.ok) throw new Error('http '+r.status); return r.json(); }); }

  function stats(){
    var now=Date.now(), day=86400000, hoje=0, semana=0, novos=0;
    leads.forEach(function(l){ var t=new Date(l.data).getTime();
      if(!isNaN(t)){ if(now-t<day) hoje++; if(now-t<7*day) semana++; } if(stOf(l)==='novo') novos++; });
    return {total:leads.length, novos:novos, hoje:hoje, semana:semana, news:news.length};
  }
  function statCard(label,val,cls){ return '<div class="stat '+(cls||'')+'"><div class="v">'+val+'</div><div class="l">'+label+'</div></div>'; }

  function tabsHTML(){
    return '<div class="tabs">'
      + '<button class="tab '+(state.tab==='leads'?'on':'')+'" data-tab="leads">Leads ('+leads.length+')</button>'
      + '<button class="tab '+(state.tab==='news'?'on':'')+'" data-tab="news">Newsletter ('+news.length+')</button>'
      + '<button class="tab '+(state.tab==='team'?'on':'')+'" data-tab="team">Equipe ('+team.length+')</button>'
      + '<button class="tab '+(state.tab==='dep'?'on':'')+'" data-tab="dep">Depoimentos ('+depoimentos.length+')</button>'
      + '<button class="tab '+(state.tab==='content'?'on':'')+'" data-tab="content">Conteúdo do site</button></div>';
  }
  function toolbarHTML(){
    if(state.tab==='team'||state.tab==='content'||state.tab==='dep') return '';
    var chips='';
    if(state.tab==='leads'){
      var opts=[['todos','Todos'],['novo','Novos'],['andamento','Em andamento'],['fechado','Fechados']];
      chips='<div class="chips">'+opts.map(function(o){ return '<span class="chip '+(state.status===o[0]?'on':'')+'" data-chip="'+o[0]+'">'+o[1]+'</span>'; }).join('')+'</div>';
    }
    var exp = state.tab==='leads' ? '/admin/export/leads.csv' : '/admin/export/newsletter.csv';
    return '<div class="toolbar"><div class="search">'
      + '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#8ea0b3" stroke-width="2"><circle cx="11" cy="11" r="7"/><path d="M21 21l-4-4"/></svg>'
      + '<input id="search" type="text" placeholder="Buscar por nome, e-mail ou mensagem..." value="'+esc(state.q)+'"></div>'
      + chips + '<a class="exp" href="'+exp+'">⬇ Exportar CSV</a></div>';
  }

  function leadRows(){
    var q=state.q.toLowerCase();
    var list=leads.filter(function(l){
      if(state.status!=='todos' && stOf(l)!==state.status) return false;
      if(!q) return true;
      return ((l.nome||'')+' '+(l.email||'')+' '+(l.mensagem||'')).toLowerCase().indexOf(q)>=0;
    });
    var head='<div class="hint">Contatos do formulário do site. Os <b>novos</b> ficam destacados no topo — mude o status conforme for atendendo.</div><p class="count">'+list.length+' de '+leads.length+' leads</p>';
    if(!list.length){ var msg=(leads.length?'Nenhum lead com esse filtro ou busca.':'Ainda não chegou nenhum lead. Quando alguém enviar o formulário do site, aparece aqui na hora.'); return head+'<div class="empty2"><div class="ei">📭</div><div class="es">'+msg+'</div></div>'; }
    var rows=list.map(function(l){
      var st=stOf(l);
      var opts=['novo','andamento','fechado'].map(function(k){ return '<option value="'+k+'"'+(k===st?' selected':'')+'>'+STATUS[k].label+'</option>'; }).join('');
      var mailto='mailto:'+esc(l.email)+'?subject='+encodeURIComponent('VisionX');
      return '<tr class="'+(st==='novo'?'row-novo':'')+'">'
        +'<td><select class="stsel '+STATUS[st].cls+'" data-act="status" data-id="'+esc(l.id)+'">'+opts+'</select></td>'
        +'<td class="nowrap" title="'+esc(fmtFull(l.data))+'">'+esc(fmtRel(l.data))+'</td>'
        +'<td>'+(l.nome?esc(l.nome):'<span class="muted">—</span>')+'</td>'
        +'<td><a href="mailto:'+esc(l.email)+'">'+esc(l.email)+'</a></td>'
        +'<td><div class="msg" title="clique para expandir">'+(l.mensagem?esc(l.mensagem):'<span class="muted">—</span>')+'</div></td>'
        +'<td><div class="acts">'
          +'<a class="ic" title="Responder por e-mail" href="'+mailto+'">✉</a>'
          +'<button class="ic" title="Copiar e-mail" data-act="copy" data-email="'+esc(l.email)+'">⧉</button>'
          +'<button class="ic danger" title="Excluir" data-act="del" data-id="'+esc(l.id)+'">🗑</button>'
        +'</div></td></tr>';
    }).join('');
    return head+'<div class="tablewrap"><table><thead><tr><th>Status</th><th>Recebido</th><th>Nome</th><th>E-mail</th><th>Mensagem</th><th>Ações</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function newsRows(){
    var q=state.q.toLowerCase();
    var list=news.filter(function(n){ return !q || (n.email||'').toLowerCase().indexOf(q)>=0; });
    var head='<div class="hint">E-mails inscritos na newsletter (rodapé do site).</div><p class="count">'+list.length+' de '+news.length+' inscritos</p>';
    if(!list.length){ var msg=(news.length?'Nenhum inscrito com essa busca.':'Ninguém se inscreveu ainda. As inscrições da newsletter aparecem aqui.'); return head+'<div class="empty2"><div class="ei">✉️</div><div class="es">'+msg+'</div></div>'; }
    var rows=list.map(function(n){
      return '<tr>'
        +'<td class="nowrap" title="'+esc(fmtFull(n.data))+'">'+esc(fmtRel(n.data))+'</td>'
        +'<td><a href="mailto:'+esc(n.email)+'">'+esc(n.email)+'</a></td>'
        +'<td><div class="acts">'
          +'<button class="ic" title="Copiar e-mail" data-act="copy" data-email="'+esc(n.email)+'">⧉</button>'
          +'<button class="ic danger" title="Remover" data-act="ndel" data-id="'+esc(n.id)+'">🗑</button>'
        +'</div></td></tr>';
    }).join('');
    return head+'<div class="tablewrap"><table><thead><tr><th>Inscrito</th><th>E-mail</th><th>Ações</th></tr></thead><tbody>'+rows+'</tbody></table></div>';
  }

  function renderStats(){
    var s=stats();
    document.getElementById('vxstats').innerHTML =
      statCard('Leads no total', s.total, '')
      + statCard('Novos (não tratados)', s.novos, 'accent')
      + statCard('Hoje', s.hoje, '')
      + statCard('Últimos 7 dias', s.semana, '')
      + statCard('Newsletter', s.news, '');
  }
  function renderContent(){
    var v = state.tab==='leads' ? leadRows() : state.tab==='news' ? newsRows() : state.tab==='team' ? teamView() : state.tab==='dep' ? depView() : contentView();
    document.getElementById('vxcontent').innerHTML = v;
  }
  function depView(){
    var f=state.depform;
    var help='<div class="hint">Depoimentos de clientes — aparecem na página inicial. Adicione, edite, oculte ou remova.</div>';
    var addBtn=f?'':'<button class="tbtn" data-dact="new">+ Adicionar depoimento</button>';
    var formHtml=f?depForm(f):'';
    var list=depoimentos.slice().sort(function(a,b){return (a.ordem||0)-(b.ordem||0);}).map(function(d){
      var t=(d.texto||''); if(t.length>90) t=t.slice(0,90)+'…';
      return '<div class="tmember">'
        +'<div class="tavatar"'+(d.foto?' style="background-image:url(\\''+csurl(d.foto)+'\\')"':'')+'></div>'
        +'<div class="tinfo"><div class="tname" style="font-weight:500">“'+esc(t)+'”</div><div class="tcargo">'+esc(d.autor||'')+'</div></div>'
        +'<label class="tswitch" title="Mostrar no site"><input type="checkbox" data-dvis="'+esc(d.id)+'" '+(d.ativo===false?'':'checked')+'><span class="tslider"></span></label>'
        +'<button class="ic" title="Editar" data-dact="edit" data-id="'+esc(d.id)+'">✎</button>'
        +'<button class="ic danger" title="Remover" data-dact="del" data-id="'+esc(d.id)+'">🗑</button>'
        +'</div>';
    }).join('');
    var empty='<div class="empty2"><div class="ei">💬</div><div class="et">Nenhum depoimento ainda</div><div class="es">Adicione o que seus clientes falam — aparece na página inicial.</div></div>';
    return help+addBtn+formHtml+'<div class="tlist">'+(list||empty)+'</div>';
  }
  function depForm(f){
    var title=f.id?'Editar depoimento':'Novo depoimento';
    var prev=f.foto?'<img src="'+esc(f.foto)+'" alt="">':'<span class="tphoto-ph">📷<br>Foto (opcional)</span>';
    return '<div class="tform"><div class="tftitle">'+title+'</div>'
      +'<div class="trow"><label>Depoimento *</label><textarea id="df-texto" rows="3" placeholder="O que o cliente falou...">'+esc(f.texto||'')+'</textarea></div>'
      +'<div class="trow"><label>Autor</label><input id="df-autor" value="'+esc(f.autor||'')+'" placeholder="Ex.: Ana Souza, CEO da Loja X"></div>'
      +'<div class="trow"><label>Foto (opcional)</label>'
        +'<div class="tphoto-area" data-dact="pick">'+prev+'</div>'
        +'<input type="file" id="df-file" accept="image/*" style="display:none">'
        +'<input id="df-foto" value="'+esc(f.foto||'')+'" placeholder="ou cole uma URL"></div>'
      +'<label class="tchk"><input type="checkbox" id="df-ativo" '+(f.ativo===false?'':'checked')+'> Mostrar no site</label>'
      +'<div class="tformacts"><button class="tbtn" data-dact="save">Salvar</button><button class="tbtn ghost" data-dact="cancel">Cancelar</button></div></div>';
  }
  function handleDepAction(a,id){
    if(a==='new'){ state.depform={ativo:true}; renderContent(); setTimeout(function(){ var n=document.getElementById('df-texto'); if(n) n.focus(); },0); }
    else if(a==='edit'){ var d=find(depoimentos,id); if(d){ state.depform={id:d.id,texto:d.texto,autor:d.autor,foto:d.foto,ordem:d.ordem,ativo:d.ativo}; renderContent(); } }
    else if(a==='cancel'){ state.depform=null; renderContent(); }
    else if(a==='save'){ saveDep(); }
    else if(a==='pick'){ var fi=document.getElementById('df-file'); if(fi) fi.click(); }
    else if(a==='del'){ if(confirm('Remover este depoimento?')){ post('/admin/api/dep-delete',{id:id}).then(function(){ depoimentos=depoimentos.filter(function(x){return String(x.id)!==String(id);}); renderContent(); toast('Removido'); }).catch(err); } }
  }
  function saveDep(){
    var te=document.getElementById('df-texto'); var texto=te?te.value.trim():'';
    if(!texto){ toast('Escreva o depoimento'); if(te) te.focus(); return; }
    var m={ texto:texto, autor:val('df-autor'), foto:val('df-foto'), ativo:document.getElementById('df-ativo').checked };
    var editing=state.depform&&state.depform.id;
    if(editing){
      post('/admin/api/dep-update',{id:state.depform.id,texto:m.texto,autor:m.autor,foto:m.foto,ativo:m.ativo}).then(function(){
        var d=find(depoimentos,state.depform.id); if(d){ d.texto=m.texto;d.autor=m.autor;d.foto=m.foto;d.ativo=m.ativo; } state.depform=null; renderContent(); toast('Salvo ✓');
      }).catch(err);
    } else {
      m.ordem=depoimentos.length+1;
      post('/admin/api/dep-add',m).then(function(r){ if(r&&r.item) depoimentos.push(r.item); state.depform=null; renderContent(); toast('Adicionado ✓'); }).catch(err);
    }
  }
  function toggleDepVis(id,checked){ post('/admin/api/dep-update',{id:id,ativo:checked}).then(function(){ var d=find(depoimentos,id); if(d) d.ativo=checked; toast(checked?'Visível no site':'Oculto do site'); }).catch(err); }
  function uploadDepPhoto(file){
    toast('Enviando foto…');
    var r=new FileReader();
    r.onload=function(){
      post('/admin/api/upload',{dataUrl:r.result}).then(function(res){
        if(res&&res.path){ var inp=document.getElementById('df-foto'); if(inp) inp.value=res.path; var area=document.querySelector('.tphoto-area'); if(area) area.innerHTML='<img src="'+res.path+'" alt="">'; if(state.depform) state.depform.foto=res.path; toast('Foto enviada ✓'); }
        else toast('Falha no upload');
      }).catch(function(){ toast('Falha no upload'); });
    };
    r.readAsDataURL(file);
  }
  function contentView(){
    var s=settings;
    function cinp(key,label,ph){ return '<div class="crow"><label>'+label+'</label><input id="cf-'+key+'" value="'+esc(s[key]||'')+'" placeholder="'+esc(ph||'')+'"></div>'; }
    function csw(key,label,desc){ var on=!(String(s[key])==='0'); return '<div class="secrow"><div><div class="secname">'+label+'</div>'+(desc?'<div class="secdesc">'+desc+'</div>':'')+'</div><label class="tswitch"><input type="checkbox" data-sec="'+key+'" '+(on?'checked':'')+'><span class="tslider"></span></label></div>'; }
    function cimg(key,label,cur){ var v=s[key]||cur; return '<div class="cimg"><div class="cimg-prev"'+(v?' style="background-image:url(\\''+csurl(v)+'\\')"':'')+'></div><div class="cimg-body"><div class="cimg-name">'+label+'</div><input class="cimg-url" data-imgkey="'+key+'" value="'+esc(s[key]||'')+'" placeholder="'+esc(cur)+'"></div><button class="tbtn2" data-imgpick="'+key+'">Trocar</button><input type="file" class="cimg-file" data-imgkey="'+key+'" accept="image/*" style="display:none"></div>'; }
    return '<div class="hint">Edite o conteúdo do site aqui — muda na hora, sem tocar no código.</div>'
      +'<div class="cgroup"><div class="cgt">Contatos &amp; redes</div>'
        +cinp('contato_email','E-mail','voce@empresa.com')
        +cinp('contato_whatsapp','WhatsApp — só números com DDI','5599984680391')
        +cinp('rede_instagram','Instagram — usuário','visionx.dev')
        +cinp('rede_linkedin','LinkedIn — URL completa','https://www.linkedin.com/in/...')
        +cinp('rede_github','GitHub — usuário','visionxma')
        +'<div class="cformacts"><button class="tbtn" data-cact="save">Salvar contatos e textos</button></div></div>'
      +'<div class="cgroup"><div class="cgt">Hero — topo da página inicial</div>'
        +cinp('hero_titulo','Título','')
        +cinp('hero_subtitulo','Subtítulo','')
        +cinp('hero_botao','Texto do botão','Começar agora')
        +'<div class="cformacts"><button class="tbtn" data-cact="save">Salvar contatos e textos</button></div></div>'
      +'<div class="cgroup"><div class="cgt">Números — página inicial</div>'
        +'<div class="sechint">Edite os números de destaque e seus rótulos (o sinal + ou % continua fixo).</div>'
        +cinp('stat1_valor','Nº 1 — valor','120')+cinp('stat1_rotulo','Nº 1 — rótulo','Sites, sistemas e campanhas entregues…')
        +cinp('stat2_valor','Nº 2 — valor','100')+cinp('stat2_rotulo','Nº 2 — rótulo','Compromisso de verdade com prazos')
        +cinp('stat3_valor','Nº 3 — valor','40')+cinp('stat3_rotulo','Nº 3 — rótulo','Sites e sistemas no ar')
        +cinp('stat4_valor','Nº 4 — valor','100')+cinp('stat4_rotulo','Nº 4 — rótulo','Empresas atendidas')
        +'<div class="cformacts"><button class="tbtn" data-cact="save">Salvar números</button></div></div>'
      +'<div class="cgroup"><div class="cgt">Imagens do site</div>'
        +'<div class="sechint">Clique em “Trocar” pra enviar uma imagem (ou cole uma URL/caminho). Salva na hora. Dica: para os fundos com texto por cima (hero, serviços, CTA), use imagens mais escuras.</div>'
        +cimg('img_hero','Fundo do hero — página inicial','/images/hero-earth.webp?v=1')
        +cimg('img_logo','Logo (topo e rodapé)','/images/logo.png?v=2')
        +cimg('img_servicos_hero','Fundo — hero de Serviços','/images/h-service.avif?v=10')
        +cimg('img_sobre','Fundo — hero de Sobre','/images/h-abou-img.avif?v=10')
        +cimg('img_contato','Imagem — página de Contato','/images/contact-bg.avif?v=10')
        +cimg('img_cta','Fundo — chamada final (CTA)','/images/ai-ct-img.avif?v=10')
        +cimg('img_card_sites','Card de serviço — Sites','/images/cms/6961fe8f17d6448d5348850c_service-img.webp?v=1')
        +cimg('img_card_sistemas','Card de serviço — Sistemas','/images/cms/696202d02a0dce5f45a031fb_service-img-2.webp?v=1')
        +cimg('img_card_marketing','Card de serviço — Marketing','/images/cms/696202de6ed108d94012bd8e_service-img-3.webp?v=1')
      +'</div>'
      +'<div class="cgroup"><div class="cgt">Seções — Página inicial</div>'
        +'<div class="sechint">Desligue pra esconder a seção do site (sem apagar nada). Salva na hora.</div>'
        +csw('sec_logos','Logos de parceiros')
        +csw('sec_sobre','Sobre nós')
        +csw('sec_servicos','Serviços')
        +csw('sec_expertise','Especialidade')
        +csw('sec_depoimentos','Depoimentos')
        +csw('sec_blog','Blog e artigos')
        +csw('sec_cta','Chamada final (CTA)')
      +'</div>'
      +'<div class="cgroup"><div class="cgt">Seções — Página de Serviços</div>'
        +csw('sec_serv_marketing','Marketing &amp; performance')
        +csw('sec_serv_why','Por que a VisionX')
        +csw('sec_serv_depoimentos','Depoimentos')
        +csw('sec_serv_cta','Chamada final (CTA)')
      +'</div>'
      +'<div class="cgroup"><div class="cgt">Seções — Página Sobre</div>'
        +csw('sec_sobre_team','Equipe (nosso time)')
        +csw('sec_sobre_journey','Nossa jornada')
        +csw('sec_sobre_cta','Chamada final (CTA)')
      +'</div>';
  }
  function saveContent(){
    var obj={};
    document.querySelectorAll('[id^="cf-"]').forEach(function(el){ obj[el.id.slice(3)]=el.value.trim(); });
    Object.assign(settings,obj);
    post('/admin/api/settings',obj).then(function(){ toast('Conteúdo salvo ✓'); }).catch(err);
  }
  function saveSetting(k,v){ var o={}; o[k]=v; settings[k]=v; post('/admin/api/settings',o).then(function(){ toast('Salvo ✓'); }).catch(err); }
  function uploadImage(key,file,inputEl){
    toast('Enviando imagem…');
    var reader=new FileReader();
    reader.onload=function(){
      post('/admin/api/upload',{dataUrl:reader.result}).then(function(r){
        if(r&&r.path){ saveSetting(key,r.path); var row=inputEl.closest('.cimg'); if(row){ var u=row.querySelector('.cimg-url'); if(u) u.value=r.path; var pv=row.querySelector('.cimg-prev'); if(pv) pv.style.backgroundImage='url('+r.path+')'; } toast('Imagem trocada ✓'); }
        else toast('Falha no upload');
      }).catch(function(){ toast('Falha no upload'); });
    };
    reader.readAsDataURL(file);
  }

  function val(id){ var el=document.getElementById(id); return el?el.value.trim():''; }
  function teamView(){
    var f=state.form;
    var help='<div class="hint">Arraste os cartões pra <b>reordenar</b> — essa é a ordem que aparece no site. O interruptor mostra/oculta um membro sem apagar.</div>';
    var addBtn=f?'':'<button class="tbtn" data-tact="new">+ Adicionar membro</button>';
    var formHtml=f?teamForm(f):'';
    var sorted=team.slice().sort(function(a,b){return (a.ordem||0)-(b.ordem||0);});
    var list=sorted.map(function(m){
      return '<div class="tmember" draggable="true" data-id="'+esc(m.id)+'">'
        +'<span class="thandle" title="Arraste pra reordenar">\\u2807</span>'
        +'<div class="tavatar"'+(m.foto?' style="background-image:url(\\''+csurl(m.foto)+'\\')"':'')+'></div>'
        +'<div class="tinfo"><div class="tname">'+esc(m.nome||'—')+'</div><div class="tcargo">'+esc(m.cargo||'sem cargo')+'</div></div>'
        +'<label class="tswitch" title="Mostrar na página Sobre"><input type="checkbox" data-vis="'+esc(m.id)+'" '+(m.ativo===false?'':'checked')+'><span class="tslider"></span></label>'
        +'<button class="ic" title="Editar" data-tact="edit" data-id="'+esc(m.id)+'">✎</button>'
        +'<button class="ic danger" title="Remover" data-tact="del" data-id="'+esc(m.id)+'">🗑</button>'
        +'</div>';
    }).join('');
    var empty='<div class="empty2"><div class="ei">👥</div><div class="et">Sua equipe está vazia</div><div class="es">Clique em “Adicionar membro” — os cartões aparecem na página Sobre.</div></div>';
    return help+addBtn+formHtml+'<div class="tlist" id="tlist">'+(list||empty)+'</div>';
  }
  function teamForm(f){
    var title=f.id?'Editar membro':'Novo membro';
    var prev=f.foto?'<img src="'+esc(f.foto)+'" alt="">':'<span class="tphoto-ph">📷<br>Enviar foto</span>';
    return '<div class="tform"><div class="tftitle">'+title+'</div>'
      +'<div class="trow"><label>Nome *</label><input id="tf-nome" value="'+esc(f.nome||'')+'" placeholder="Ex.: Ana Souza"></div>'
      +'<div class="trow"><label>Cargo</label><input id="tf-cargo" value="'+esc(f.cargo||'')+'" placeholder="Ex.: CEO (Diretora Executiva)"></div>'
      +'<div class="trow"><label>Foto</label>'
        +'<div class="tphoto-area" data-tact="pick" title="Clique pra enviar uma imagem">'+prev+'</div>'
        +'<input type="file" id="tf-file" accept="image/*" style="display:none">'
        +'<input id="tf-foto" value="'+esc(f.foto||'')+'" placeholder="ou cole a URL / caminho da imagem"></div>'
      +'<label class="tchk"><input type="checkbox" id="tf-ativo" '+(f.ativo===false?'':'checked')+'> Mostrar na página Sobre</label>'
      +'<div class="tformacts"><button class="tbtn" data-tact="save">Salvar</button><button class="tbtn ghost" data-tact="cancel">Cancelar</button><span class="tkbd">Enter salva · Esc cancela</span></div></div>';
  }
  function handleTeamAction(a,id){
    if(a==='new'){ state.form={ativo:true}; renderContent(); setTimeout(function(){ var n=document.getElementById('tf-nome'); if(n) n.focus(); },0); }
    else if(a==='edit'){ var m=find(team,id); if(m){ state.form={id:m.id,nome:m.nome,cargo:m.cargo,foto:m.foto,ordem:m.ordem,ativo:m.ativo}; renderContent(); } }
    else if(a==='cancel'){ state.form=null; renderContent(); }
    else if(a==='save'){ saveTeam(); }
    else if(a==='pick'){ var fi=document.getElementById('tf-file'); if(fi) fi.click(); }
    else if(a==='del'){ if(confirm('Remover este membro da equipe?')){ post('/admin/api/team-delete',{id:id}).then(function(){ team=team.filter(function(x){return String(x.id)!==String(id);}); renderContent(); toast('Membro removido'); }).catch(err); } }
  }
  function saveTeam(){
    var nome=val('tf-nome');
    if(!nome){ toast('Informe o nome'); var n=document.getElementById('tf-nome'); if(n) n.focus(); return; }
    var m={ nome:nome, cargo:val('tf-cargo'), foto:val('tf-foto'), ativo:document.getElementById('tf-ativo').checked };
    var editing=state.form&&state.form.id;
    if(editing){
      post('/admin/api/team-update',{id:state.form.id,nome:m.nome,cargo:m.cargo,foto:m.foto,ativo:m.ativo}).then(function(){
        var t=find(team,state.form.id); if(t){ t.nome=m.nome;t.cargo=m.cargo;t.foto=m.foto;t.ativo=m.ativo; } state.form=null; renderContent(); toast('Salvo ✓');
      }).catch(err);
    } else {
      m.ordem=team.length+1;
      post('/admin/api/team-add',m).then(function(r){ if(r&&r.membro) team.push(r.membro); state.form=null; renderContent(); toast('Membro adicionado ✓'); }).catch(err);
    }
  }
  function toggleVisible(id,checked){
    post('/admin/api/team-update',{id:id,ativo:checked}).then(function(){ var m=find(team,id); if(m) m.ativo=checked; toast(checked?'Visível no site':'Oculto do site'); }).catch(err);
  }
  function uploadPhoto(file){
    toast('Enviando foto…');
    var reader=new FileReader();
    reader.onload=function(){
      post('/admin/api/team-photo',{dataUrl:reader.result}).then(function(r){
        if(r&&r.path){ var inp=document.getElementById('tf-foto'); if(inp) inp.value=r.path; var area=document.querySelector('.tphoto-area'); if(area) area.innerHTML='<img src="'+r.path+'" alt="">'; if(state.form) state.form.foto=r.path; toast('Foto enviada ✓'); }
        else toast('Falha no upload');
      }).catch(function(){ toast('Falha no upload'); });
    };
    reader.readAsDataURL(file);
  }
  var _dragId=null;
  function dragAfter(list,y){
    var els=[].slice.call(list.querySelectorAll('.tmember:not(.dragging)'));
    var best=null, bestOff=-Infinity;
    els.forEach(function(el){ var b=el.getBoundingClientRect(); var off=y-b.top-b.height/2; if(off<0 && off>bestOff){ bestOff=off; best=el; } });
    return best;
  }
  function commitOrder(list){
    var ids=[].slice.call(list.querySelectorAll('.tmember')).map(function(el){ return el.getAttribute('data-id'); });
    ids.forEach(function(id,i){ var m=find(team,id); if(m) m.ordem=i+1; });
    post('/admin/api/team-reorder',{ordem:ids}).then(function(){ toast('Ordem salva ✓'); }).catch(err);
  }
  function renderAll(){
    document.getElementById('app').innerHTML =
      '<div class="stats" id="vxstats"></div>' + tabsHTML() + toolbarHTML() + '<div id="vxcontent"></div>';
    renderStats(); renderContent();
  }

  function changeStatus(id,status){ post('/admin/api/lead-status',{id:id,status:status}).then(function(){ var l=find(leads,id); if(l) l.status=status; renderStats(); renderContent(); toast('Status atualizado'); }).catch(err); }
  function delLead(id){ if(!confirm('Excluir este lead? Esta ação não pode ser desfeita.')) return; post('/admin/api/lead-delete',{id:id}).then(function(){ leads=leads.filter(function(x){return x.id!==id;}); renderStats(); renderContent(); toast('Lead excluído'); }).catch(err); }
  function delNews(id){ if(!confirm('Remover este e-mail da newsletter?')) return; post('/admin/api/news-delete',{id:id}).then(function(){ news=news.filter(function(x){return x.id!==id;}); renderStats(); renderContent(); toast('Inscrição removida'); }).catch(err); }
  function copyEmail(em){ if(navigator.clipboard){ navigator.clipboard.writeText(em).then(function(){ toast('E-mail copiado'); }).catch(function(){ toast(em); }); } else { toast(em); } }

  document.addEventListener('click', function(e){
    var t=e.target; if(!t||!t.closest) return;
    var tab=t.closest('[data-tab]'); if(tab){ state.tab=tab.getAttribute('data-tab'); state.q=''; state.status='todos'; state.form=null; state.depform=null; renderAll(); return; }
    var chip=t.closest('[data-chip]'); if(chip){ state.status=chip.getAttribute('data-chip'); renderAll(); return; }
    var ta=t.closest('[data-tact]'); if(ta){ handleTeamAction(ta.getAttribute('data-tact'), ta.getAttribute('data-id')); return; }
    var da=t.closest('[data-dact]'); if(da){ handleDepAction(da.getAttribute('data-dact'), da.getAttribute('data-id')); return; }
    var ca=t.closest('[data-cact]'); if(ca){ if(ca.getAttribute('data-cact')==='save') saveContent(); return; }
    var ip=t.closest('[data-imgpick]'); if(ip){ var fk=ip.getAttribute('data-imgpick'); var fi=document.querySelector('.cimg-file[data-imgkey="'+fk+'"]'); if(fi) fi.click(); return; }
    var del=t.closest('[data-act="del"]'); if(del){ delLead(del.getAttribute('data-id')); return; }
    var nd=t.closest('[data-act="ndel"]'); if(nd){ delNews(nd.getAttribute('data-id')); return; }
    var cp=t.closest('[data-act="copy"]'); if(cp){ copyEmail(cp.getAttribute('data-email')); return; }
    var msg=t.closest('.msg'); if(msg){ msg.classList.toggle('open'); return; }
  });
  document.addEventListener('change', function(e){
    var s=e.target.closest && e.target.closest('[data-act="status"]'); if(s){ changeStatus(s.getAttribute('data-id'), s.value); return; }
    if(e.target.dataset && e.target.dataset.vis){ toggleVisible(e.target.dataset.vis, e.target.checked); return; }
    if(e.target.dataset && e.target.dataset.dvis){ toggleDepVis(e.target.dataset.dvis, e.target.checked); return; }
    if(e.target.id==='df-file' && e.target.files && e.target.files[0]){ uploadDepPhoto(e.target.files[0]); return; }
    if(e.target.dataset && e.target.dataset.sec){ saveSetting(e.target.dataset.sec, e.target.checked?'1':'0'); return; }
    if(e.target.classList && e.target.classList.contains('cimg-file') && e.target.files && e.target.files[0]){ uploadImage(e.target.getAttribute('data-imgkey'), e.target.files[0], e.target); return; }
    if(e.target.classList && e.target.classList.contains('cimg-url')){ var ik=e.target.getAttribute('data-imgkey'); var iv=e.target.value.trim(); saveSetting(ik,iv); var rw=e.target.closest('.cimg'); if(rw){ var pv=rw.querySelector('.cimg-prev'); if(pv) pv.style.backgroundImage=iv?'url('+iv+')':''; } return; }
    if(e.target.id==='tf-file' && e.target.files && e.target.files[0]){ uploadPhoto(e.target.files[0]); }
  });
  document.addEventListener('input', function(e){
    if(e.target.id==='search'){ state.q=e.target.value; renderContent(); return; }
    if(e.target.id==='tf-foto'){ var area=document.querySelector('.tphoto-area'); if(area){ var v=e.target.value.trim(); area.innerHTML=v?'<img src="'+v.replace(/"/g,'&quot;')+'" alt="">':'<span class="tphoto-ph">📷<br>Enviar foto</span>'; } }
  });
  document.addEventListener('keydown', function(e){
    if(state.form){
      if(e.key==='Escape'){ state.form=null; renderContent(); }
      else if(e.key==='Enter' && e.target.tagName==='INPUT' && e.target.type!=='file'){ e.preventDefault(); saveTeam(); }
    } else if(state.depform){
      if(e.key==='Escape'){ state.depform=null; renderContent(); }
      else if(e.key==='Enter' && e.target.tagName==='INPUT' && e.target.type!=='file'){ e.preventDefault(); saveDep(); }
    }
  });
  document.addEventListener('dragstart', function(e){ var m=e.target.closest && e.target.closest('.tmember'); if(m){ _dragId=m.getAttribute('data-id'); m.classList.add('dragging'); if(e.dataTransfer){ e.dataTransfer.effectAllowed='move'; try{ e.dataTransfer.setData('text/plain', _dragId); }catch(_){} } } });
  document.addEventListener('dragend', function(e){ var m=e.target.closest && e.target.closest('.tmember'); if(m) m.classList.remove('dragging'); });
  document.addEventListener('dragover', function(e){ var list=document.getElementById('tlist'); if(!list||!_dragId||!(e.target.closest && e.target.closest('#tlist'))) return; e.preventDefault(); var dragEl=list.querySelector('.tmember.dragging'); if(!dragEl) return; var after=dragAfter(list, e.clientY); if(after==null) list.appendChild(dragEl); else list.insertBefore(dragEl, after); });
  document.addEventListener('drop', function(e){ var list=document.getElementById('tlist'); if(!list||!_dragId||!(e.target.closest && e.target.closest('#tlist'))) return; e.preventDefault(); commitOrder(list); _dragId=null; });

  renderAll();
})();
</script>
</body></html>`);
});

// ---------- site estático ----------
app.use(express.static(SITE_DIR, { extensions: ['html'] }));

// ---------- sem página de 404: rota desconhecida -> Instagram ----------
var INSTAGRAM = 'https://www.instagram.com/visionx.dev/';
app.use(function (req, res) {
  res.redirect(302, INSTAGRAM);
});

app.listen(PORT, () => {
  console.log(`\n  VisionX no ar → http://localhost:${PORT}`);
  console.log(`  Painel admin  → http://localhost:${PORT}/admin  (senha via ADMIN_PASS)`);
  console.log(`  Banco de dados → ${db.mode === 'supabase' ? 'Supabase (Postgres) ✓' : 'JSON local — configure .env para ativar o Supabase'}\n`);
});
