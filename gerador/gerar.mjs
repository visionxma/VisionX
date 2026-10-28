// Gera o portal estático a partir de gerador/produtos.mjs.  Uso: node gerador/gerar.mjs
import { mkdirSync, writeFileSync, rmSync, existsSync, readFileSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { grupos, produtos } from './produtos.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..', 'site');
const SITE = 'https://visionxma.com';
const ZAP = '5599984304630';
const ZAP_TXT = '(99) 98430-4630';

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const noAr = produtos.filter((p) => p.estado === 'no-ar');
const porGrupo = (g) => produtos.filter((p) => p.grupo === g);
const href = (p) => `/produtos/${p.slug}/`;

function escreve(rel, conteudo) {
  const f = join(RAIZ, rel);
  mkdirSync(dirname(f), { recursive: true });
  writeFileSync(f, conteudo);
}

function icone(p, extra = '') {
  if (!p.icone) return `<span class="ico ico--letra ${extra}" aria-hidden="true">${esc(p.nome[0])}</span>`;
  const svg = p.icone.endsWith('.svg');
  return `<span class="ico${svg ? ' ico--svg' : ''} ${extra}"><img src="/img/produtos/${p.icone}" alt="" width="96" height="96" loading="lazy" decoding="async"></span>`;
}

function cabeca({ titulo, desc, caminho, jsonld }) {
  return `<!doctype html>
<html lang="pt-BR">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
<title>${esc(titulo)}</title>
<meta name="description" content="${esc(desc)}">
<link rel="canonical" href="${SITE}${caminho}">
<meta name="theme-color" content="#111214">
<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR">
<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:url" content="${SITE}${caminho}"><meta property="og:site_name" content="VisionX">
<meta name="twitter:card" content="summary">
<link rel="icon" href="/favicon.svg" type="image/svg+xml"><link rel="apple-touch-icon" href="/apple-touch-icon.png">
<link rel="manifest" href="/manifest.json">
<link rel="preload" href="/fonts/hubot-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="preload" href="/fonts/mona-sans.woff2" as="font" type="font/woff2" crossorigin>
<link rel="stylesheet" href="/estilo.css">
${jsonld ? `<script type="application/ld+json">${JSON.stringify(jsonld)}</script>` : ''}
</head>`;
}

const nav = `<header class="nav"><div class="nav__in">
  <a class="marca" href="/" aria-label="VisionX, início"><img src="/marca-x.svg" alt="" width="40" height="27"><span>VisionX</span></a>
  <nav class="nav__links" aria-label="Principal">
    <a href="/#sistemas">Sistemas</a><a href="/#ferramentas">Ferramentas</a><a href="/#desenvolvimento">Em desenvolvimento</a><a href="/#sobre">Sobre</a>
  </nav>
  <a class="btn btn--lime" href="/#contato">Falar com a VisionX</a>
</div></header>`;

const rodape = `<footer class="rodape grao"><div class="shell">
  <div class="rodape__links">
    <h4>Sistemas de gestão</h4>
    ${porGrupo('gestao').map((p) => `<a href="${href(p)}">${esc(p.nome)}</a>`).join('')}
    <h4>Ferramentas</h4>
    ${porGrupo('ferramentas').map((p) => `<a href="${href(p)}">${esc(p.nome)}</a>`).join('')}
    <h4>VisionX</h4>
    <a href="/#sobre">Sobre</a><a href="/#contato">Contato</a><a href="/privacidade/">Privacidade</a><a href="/termos/">Termos de uso</a>
  </div>
  <div class="rodape__fim">
    <span>© <span data-ano>${new Date().getFullYear()}</span> VisionX. Todos os direitos reservados. Pedreiras, Maranhão.</span>
    <a class="assina" href="/"><img src="/marca-x.svg" alt="" width="28" height="19">Feito pela VisionX</a>
  </div>
</div></footer>
<script src="/portal.js" defer></script>
<script>document.querySelectorAll('[data-ano]').forEach(function(e){e.textContent=new Date().getFullYear()})</script>
</body></html>`;

function cartao(p) {
  return `<a class="card rev" href="${href(p)}" style="--c:${p.cor}"><i class="cor"></i>
    ${icone(p)}
    <div><h3>${esc(p.nome)}</h3><div class="setor">${esc(p.setor)}</div></div>
    <p>${esc(p.resumo)}</p>
    <span class="ir">${p.estado === 'no-ar' ? 'Conhecer' : p.estado === 'app' ? 'Ver' : 'Ver detalhes'} <span aria-hidden="true">→</span></span>
  </a>`;
}

// ---------- home ----------
function home() {
  const comIcone = noAr.filter((p) => p.icone);
  const setores = porGrupo('gestao').length;
  const jsonld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${SITE}/#organization`, name: 'VisionX', url: SITE + '/', logo: `${SITE}/images/brand/visionx-logo.png`,
        description: 'Empresa brasileira de software com sistemas de gestão para diversos setores e ferramentas digitais.',
        address: { '@type': 'PostalAddress', addressLocality: 'Pedreiras', addressRegion: 'MA', addressCountry: 'BR' },
        contactPoint: { '@type': 'ContactPoint', telephone: '+55-99-98430-4630', contactType: 'customer service', availableLanguage: 'pt-BR' } },
      { '@type': 'ItemList', name: 'Produtos da VisionX', itemListElement: noAr.map((p, i) => ({ '@type': 'ListItem', position: i + 1, url: SITE + href(p), name: p.nome })) }
    ]
  };
  return `${cabeca({ titulo: 'VisionX — sistemas de gestão para cada setor', desc: 'A VisionX desenvolve sistemas de gestão para transporte, construção, comércio, hotelaria, agro, saúde, advocacia e marketing, além de ferramentas como PDF sem Cadastro e BrasilVisto.', caminho: '/', jsonld })}
<body>
${nav}
<main>
<section class="hero grao"><div class="shell hero__in">
  <div>
    <span class="hero__rotulo"><i></i>${noAr.length} produtos no ar</span>
    <h1>Um sistema de gestão para <em>cada setor</em> do mercado.</h1>
    <p class="hero__lede">A VisionX cria e opera produtos próprios para transporte, construção, comércio, hotelaria, agro, saúde, advocacia e marketing. Fora da gestão, ferramentas de uso direto e novos produtos a caminho.</p>
    <div class="hero__cta"><a class="btn btn--lime" href="#sistemas">Ver os sistemas</a><a class="btn btn--borda" href="#contato">Falar conosco</a></div>
    <div class="numeros">
      <div class="num"><b data-conta="${noAr.length}">${noAr.length}</b><span>produtos no ar</span></div>
      <div class="num"><b data-conta="${setores}">${setores}</b><span>setores com sistema de gestão</span></div>
      <div class="num"><b data-conta="${porGrupo('ferramentas').length}">${porGrupo('ferramentas').length}</b><span>ferramentas e plataformas</span></div>
      <div class="num"><b data-conta="${porGrupo('dev').length}">${porGrupo('dev').length}</b><span>em desenvolvimento</span></div>
    </div>
  </div>
  <div class="parede" aria-label="Produtos da VisionX">
    ${comIcone.map((p) => `<a href="${href(p)}" aria-label="${esc(p.nome)}">${icone(p)}</a>`).join('')}
  </div>
</div></section>

<section class="sec sec--claro" id="sistemas"><div class="shell">
  <div class="sec__cab rev"><span class="rotulo">${grupos.gestao.titulo}</span><h2>Cada setor trabalha de um jeito. O sistema acompanha.</h2><p>${grupos.gestao.frase}</p></div>
  <div class="grade">${porGrupo('gestao').map(cartao).join('')}</div>
</div></section>

<section class="sec sec--escuro grao" id="ferramentas"><div class="shell">
  <div class="sec__cab rev"><span class="rotulo">${grupos.ferramentas.titulo}</span><h2>Além da gestão: produtos para usar agora.</h2><p>${grupos.ferramentas.frase}</p></div>
  <div class="grade">${porGrupo('ferramentas').map(cartao).join('')}</div>
</div></section>

<section class="sec sec--claro" id="desenvolvimento"><div class="shell">
  <div class="sec__cab rev"><span class="rotulo">${grupos.dev.titulo}</span><h2>No forno.</h2><p>${grupos.dev.frase}</p></div>
  <div class="dev">${porGrupo('dev').map((p) => `<div class="rev"><span class="etiqueta etiqueta--dev">Em desenvolvimento</span><h3>${esc(p.nome)}</h3><span class="setor">${esc(p.setor)}</span><p>${esc(p.resumo)}</p></div>`).join('')}</div>
</div></section>

<section class="sec sec--escuro grao" id="sobre"><div class="shell sobre">
  <div class="rev"><span class="rotulo">Sobre a VisionX</span><h2 style="margin-top:.6rem;font-size:var(--fs-2)">Software brasileiro, feito em Pedreiras, Maranhão.</h2></div>
  <div class="rev"><p>A VisionX é uma empresa de software. <strong>Desenvolve e opera produtos próprios</strong>, cada um para um setor, e os mantém no ar, com suporte e evolução contínua.</p>
  <p style="margin-top:1rem">Cada produto tem página, preço e teste próprios. Aqui você encontra todos eles num lugar só.</p></div>
</div></section>

<section class="sec grao" id="contato"><div class="shell contato">
  <div class="contato__txt rev"><span class="rotulo" style="color:var(--lime)">Contato</span><h2 style="margin-top:.6rem">Fale com a VisionX.</h2>
    <p>Dúvida sobre um produto, parceria ou proposta: escreva e retornamos em breve.</p>
    <a class="zap" href="https://wa.me/${ZAP}" rel="noopener">WhatsApp ${ZAP_TXT} <span aria-hidden="true">→</span></a></div>
  <form class="f rev" id="form-contato" method="post" action="/api/contact">
    <div class="par"><label>Nome<input name="nome" aria-label="Nome" autocomplete="name" required></label><label>E-mail<input type="email" name="email" aria-label="E-mail" autocomplete="email" required></label></div>
    <label>Mensagem<textarea name="mensagem" aria-label="Mensagem" required></textarea></label>
    <button class="btn btn--lime" type="submit">Enviar mensagem</button>
    <p class="f__msg" role="status" aria-live="polite"></p>
  </form>
</div></section>
</main>
${rodape}`;
}

// ---------- página de produto ----------
function pagina(p) {
  const outros = produtos.filter((o) => o.slug !== p.slug && o.grupo === p.grupo && o.grupo !== 'dev').slice(0, 4);
  const jsonld = { '@context': 'https://schema.org', '@type': 'SoftwareApplication', name: p.nome, description: p.resumo, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: p.url || SITE + href(p), publisher: { '@id': `${SITE}/#organization` } };
  const acao = p.url
    ? `<a class="btn btn--lime" href="${p.url}" rel="noopener" target="_blank">Acessar ${esc(p.nome)} <span aria-hidden="true">↗</span></a>`
    : `<div class="aviso-dev"><strong>${p.estado === 'app' ? 'Aplicativo' : 'Em desenvolvimento'}.</strong> ${p.estado === 'app' ? 'Disponível pela loja do aparelho.' : 'Ainda sem endereço público.'} Para saber mais, <a href="/#contato" style="color:var(--lime)">fale com a VisionX</a>.</div>`;
  return `${cabeca({ titulo: `${p.nome} — ${p.setor} | VisionX`, desc: `${p.resumo} ${p.texto}`.slice(0, 300), caminho: href(p), jsonld })}
<body>
${nav}
<main>
<section class="p-hero grao" style="--c:${p.cor}"><div class="shell">
  <a class="volta" href="/#${p.grupo === 'gestao' ? 'sistemas' : 'ferramentas'}"><span aria-hidden="true">←</span> Todos os produtos</a>
  <div class="p-id">${icone(p)}<div><span class="etiqueta">${esc(p.setor)}</span></div></div>
  <h1>${esc(p.nome)}</h1>
  <p class="lede">${esc(p.resumo)}</p>
  <div class="p-grid">
    <div>
      <p style="color:var(--txt-esc-2)">${esc(p.texto)}</p>
      ${p.pontos.length ? `<ul class="pontos" style="margin-top:1.25rem">${p.pontos.map((t) => `<li>${esc(t)}</li>`).join('')}</ul>` : ''}
      <div style="margin-top:1.5rem;display:flex;flex-wrap:wrap;gap:.75rem">${acao}</div>
    </div>
    ${p.captura ? `<div class="captura"><img src="/img/capturas/${p.captura}" alt="Tela inicial de ${esc(p.nome)}" width="1200" height="750" loading="lazy" decoding="async"></div>` : ''}
  </div>
</div></section>
${outros.length ? `<section class="sec sec--claro"><div class="shell"><div class="sec__cab"><h2>Outros produtos</h2></div><div class="grade">${outros.map(cartao).join('')}</div></div></section>` : ''}
</main>
${rodape}`;
}

// ---------- escreve tudo ----------
if (existsSync(join(RAIZ, 'produtos'))) rmSync(join(RAIZ, 'produtos'), { recursive: true });
escreve('index.html', home());
produtos.filter((p) => p.grupo !== 'dev').forEach((p) => escreve(`produtos/${p.slug}/index.html`, pagina(p)));


// ---------- páginas legais (texto em gerador/legais/) ----------
function legal(slug, titulo) {
  const corpo = readFileSync(join(dirname(fileURLToPath(import.meta.url)), 'legais', `${slug}.html`), 'utf8');
  return `${cabeca({ titulo: `${titulo} | VisionX`, desc: `${titulo} da VisionX.`, caminho: `/${slug}/` })}
<body>
${nav}
<main><section class="sec" style="padding-top:calc(var(--nav-h) + 2.5rem)"><div class="shell texto-legal">${corpo}</div></section></main>
${rodape}`;
}
escreve('privacidade/index.html', legal('privacidade', 'Política de Privacidade'));
escreve('termos/index.html', legal('termos', 'Termos de Serviço'));

const urls = ['/', ...produtos.filter((p) => p.grupo !== 'dev').map(href), '/privacidade/', '/termos/'];
escreve('sitemap.xml', `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${SITE}${u}</loc></url>`).join('\n')}\n</urlset>\n`);

escreve('llms.txt', `# VisionX — sistemas de gestão para cada setor
> Empresa brasileira de software, com sede em Pedreiras, Maranhão. Desenvolve e opera produtos próprios: sistemas de gestão para diversos setores e ferramentas de uso direto.

## Sistemas de gestão
${porGrupo('gestao').map((p) => `- **${p.nome}** (${p.setor}) — ${p.resumo} ${p.url || SITE + href(p)}`).join('\n')}

## Ferramentas e plataformas
${porGrupo('ferramentas').map((p) => `- **${p.nome}** (${p.setor}) — ${p.resumo} ${p.url || SITE + href(p)}`).join('\n')}

## Em desenvolvimento
${porGrupo('dev').map((p) => `- ${p.nome} — ${p.resumo}`).join('\n')}

## Contato
- Site: ${SITE}/
- WhatsApp: ${ZAP_TXT}
- Privacidade: ${SITE}/privacidade/
- Termos de uso: ${SITE}/termos/
`);
console.log(`ok: home + ${produtos.filter((p) => p.grupo !== 'dev').length} páginas de produto`);
