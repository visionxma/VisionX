// Portão de SEO/GEO do portal: lê o HTML gerado em site/ e sai 1 se achar defeito das regras do roteiro (gerador/seo-regras.md).
// Uso: node gerador/conferir-seo.mjs      (rode depois de node gerador/portal-antigo.mjs)
import { readFileSync, existsSync, readdirSync, statSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';

const SITE = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const URL_BASE = 'https://visionxma.com';
const falhas = []; const avisos = [];
const F = (pg, msg) => falhas.push(`${pg}: ${msg}`);
const A = (pg, msg) => avisos.push(`${pg}: ${msg}`);
const palavras = (t) => t.trim().split(/\s+/).filter(Boolean).length;
const semTag = (h) => h.replace(/<script[\s\S]*?<\/script>/g, '').replace(/<style[\s\S]*?<\/style>/g, '').replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ');

const sitemap = readFileSync(join(SITE, 'sitemap.xml'), 'utf8');
const locs = [...sitemap.matchAll(/<loc>([^<]+)<\/loc><lastmod>([^<]+)<\/lastmod>/g)].map((m) => ({ url: m[1], lastmod: m[2] }));
if (!locs.length) F('sitemap.xml', 'sem <loc> com <lastmod>');
const titulos = new Set(), descs = new Set();
// Produto com domínio próprio: o artigo do hub leva ≥3 links SEGUIDOS (sem nofollow) para o site do produto,
// no corpo do texto e com a busca que queremos ganhar como âncora (pedido de 02/11/2026: 1º a 3º lugar no Google e no Bing).
const SITE_PRODUTO = { frox: 'https://site.froxbr.com', construsoft: 'https://construsoftbr.com', softpay: 'https://site.softpaybr.com', hotelgestao: 'https://hotelgestao.com.br', finagro: 'https://finagro.app', tarrafa: 'https://tarrafa.app' };

for (const { url, lastmod } of locs) {
  const caminho = url.replace(URL_BASE, '');
  const arq = join(SITE, caminho, 'index.html');
  const pg = caminho || '/';
  if (!existsSync(arq)) { F(pg, 'no sitemap mas sem arquivo'); continue; }
  const h = readFileSync(arq, 'utf8');
  const get = (re) => (h.match(re) || [])[1];
  const title = get(/<title>(.*?)<\/title>/s) || '';
  const desc = get(/<meta name="description" content="([^"]*)"/) || '';
  const canon = get(/<link rel="canonical" href="([^"]*)"/) || '';
  if (!title || title.length > 60) F(pg, `title com ${title.length} caracteres (máx. 60)`);
  if (titulos.has(title)) F(pg, 'title repetido'); titulos.add(title);
  if (pg !== '/contact/' && pg !== '/privacidade/' && pg !== '/termos/' && (desc.length < 150 || desc.length > 160)) F(pg, `description com ${desc.length} caracteres (150 a 160)`);
  if (descs.has(desc)) F(pg, 'description repetida'); descs.add(desc);
  if (canon !== url) F(pg, `canonical ${canon} diferente da URL do sitemap ${url}`);
  if (!/<html lang="pt-BR"/.test(h)) F(pg, 'html sem lang="pt-BR"');
  if (/noindex/.test(h)) F(pg, 'noindex em página do sitemap');
  for (const t of ['og:title', 'og:description', 'og:image', 'og:url']) if (!new RegExp(`property="${t}"`).test(h)) F(pg, `falta ${t}`);
  const ogimg = get(/property="og:image" content="([^"]*)"/);
  if (ogimg && ogimg.startsWith(URL_BASE) && !existsSync(join(SITE, ogimg.replace(URL_BASE, '').split('?')[0]))) F(pg, `og:image não existe: ${ogimg}`);
  const corpo = h.slice(h.indexOf('<body'));
  const h1 = (corpo.match(/<h1[\s>]/g) || []).length;
  if (h1 !== 1) F(pg, `${h1} <h1> (precisa de 1)`);
  let ultimo = 0;
  for (const m of corpo.matchAll(/<h([1-6])[\s>]/g)) { const n = +m[1]; if (ultimo && n > ultimo + 1) { F(pg, `título pula nível (h${ultimo} para h${n})`); break; } ultimo = n; }
  for (const m of corpo.matchAll(/<img\b[^>]*>/g)) {
    const t = m[0];
    if (!/\balt=/.test(t)) F(pg, 'img sem alt: ' + t.slice(0, 80));
    if (/\/img\//.test(t) && (!/\bwidth=/.test(t) || !/\bheight=/.test(t))) F(pg, 'img sem width/height: ' + t.slice(0, 80));
  }
  // JSON-LD
  const lds = [...h.matchAll(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/g)].map((m) => m[1]);
  let grafo = [];
  for (const j of lds) { try { const o = JSON.parse(j); grafo = grafo.concat(o['@graph'] || [o]); } catch { F(pg, 'JSON-LD inválido'); } }
  const tipos = grafo.map((n) => n['@type']);
  if (pg === '/') for (const t of ['Organization', 'WebSite', 'WebPage']) if (!tipos.includes(t)) F(pg, `JSON-LD sem ${t}`);
  if (pg.startsWith('/produtos/')) {
    for (const t of ['WebPage', 'BreadcrumbList', 'SoftwareApplication']) if (!tipos.includes(t)) F(pg, `JSON-LD sem ${t}`);
    const art = grafo.find((n) => n['@type'] === 'Article');
    const visivel = semTag(corpo);
    if (art) {
      if (!/Atualizado em/.test(visivel)) F(pg, 'sem "Atualizado em" visível');
      if (art.dateModified !== lastmod) F(pg, `dateModified ${art.dateModified} diferente do lastmod ${lastmod}`);
      const miolo = (corpo.match(/<article class="vxp-artigo">([\s\S]*?)<\/article>/) || [])[1] || '';
      const n = palavras(semTag(miolo)); if (n < 800) A(pg, `artigo com ${n} palavras (meta 800 a 1.500)`);
      const links = (miolo.match(/<a href="\//g) || []).length; if (links < 3) F(pg, `artigo com ${links} links internos (mínimo 3)`);
      const dom = SITE_PRODUTO[caminho.split('/')[2]];
      if (dom) {
        const noTexto = [...miolo.matchAll(/<p>([\s\S]*?)<\/p>/g)].map((m) => m[1]).join(' ');
        const seguidos = [...noTexto.matchAll(/<a\b[^>]*>/g)].map((m) => m[0]).filter((a) => a.includes(`href="${dom}`) && !/nofollow/.test(a));
        if (seguidos.length < 3) F(pg, `artigo com ${seguidos.length} links seguidos para ${dom} no texto (mínimo 3, âncora = a busca)`);
      }
    } else A(pg, 'sem artigo');
    const faq = grafo.find((n) => n['@type'] === 'FAQPage');
    if (faq) for (const q of faq.mainEntity) if (!visivel.includes(q.name)) F(pg, `pergunta do FAQPage não está visível: ${q.name}`);
    const off = grafo.find((n) => n['@type'] === 'SoftwareApplication')?.offers;
    if (off) { const preco = String(off.price).replace('.', ','); if (!visivel.includes(preco)) F(pg, `Offer.price ${off.price} não aparece no texto visível`); }
    if (!/chatgpt\.com\/\?q=/.test(corpo) || !/perplexity\.ai\/search\?q=/.test(corpo)) F(pg, 'sem bloco "Pergunte a uma IA"');
    if (/\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(visivel)) F(pg, 'número de CNPJ fora das páginas legais');
  }
  if (!['/privacidade/', '/termos/'].includes(pg) && /\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/.test(semTag(corpo))) F(pg, 'número de CNPJ fora das páginas legais');
  if (!/href="\/llms\.txt"/.test(h)) F(pg, 'rodapé sem link do llms.txt');
  // texto escondido com JSON-LD: não pode haver hidden em bloco de FAQ
  if (/<details[^>]*hidden/.test(h)) F(pg, 'details escondido');
}

// robots, llms, 404, headers
const robots = readFileSync(join(SITE, 'robots.txt'), 'utf8');
if (!/^Sitemap: https:\/\/visionxma\.com\/sitemap\.xml/m.test(robots)) F('robots.txt', 'sem linha Sitemap');
for (const b of ['GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Google-Extended']) if (!new RegExp(`User-agent: ${b}\\nAllow: /`).test(robots)) F('robots.txt', `${b} não liberado`);
if (/Disallow: \/\s*$/m.test(robots)) F('robots.txt', 'Disallow: / encontrado');
const llms = readFileSync(join(SITE, 'llms.txt'), 'utf8');
for (const [, u] of llms.matchAll(/\]\((https:\/\/visionxma\.com[^)]*)\)/g)) {
  const c = u.replace(URL_BASE, '');
  const ok = c === '/llms-full.txt' ? existsSync(join(SITE, 'llms-full.txt')) : existsSync(join(SITE, c, 'index.html')) || existsSync(join(SITE, c));
  if (!ok) F('llms.txt', `link sem arquivo: ${u}`);
}
if (!existsSync(join(SITE, 'llms-full.txt'))) F('llms-full.txt', 'não existe');
if (!/noindex/.test(readFileSync(join(SITE, '404.html'), 'utf8'))) F('404.html', 'sem noindex');
const hdr = readFileSync(join(SITE, '_headers'), 'utf8');
if (!/X-Robots-Tag: noindex/.test(hdr)) F('_headers', 'sem noindex no *.pages.dev');
if (!/max-age=31536000, immutable/.test(hdr)) F('_headers', 'sem cache de um ano');
// pasta limpa
const lixo = [];
(function varre(d) { for (const n of readdirSync(d)) { const f = join(d, n); if (statSync(f).isDirectory()) varre(f); else if (/\.(bak|orig)$|^vercel\.json$/.test(n)) lixo.push(f); } })(SITE);
for (const l of lixo) F('publicação', 'arquivo de lixo: ' + l);

for (const a of avisos) console.log('AVISO  ' + a);
for (const f of falhas) console.log('FALHA  ' + f);
console.log(`\n${locs.length} páginas conferidas · ${falhas.length} falha(s) · ${avisos.length} aviso(s)`);
process.exit(falhas.length ? 1 : 0);
