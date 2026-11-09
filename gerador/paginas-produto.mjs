// Páginas de produto no visual antigo: hero de serviço, recursos, artigo, motivos, FAQ, "pergunte a uma IA", outros produtos e chamada final.
// Cada página nasce de gerador/produtos.mjs + gerador/artigos/<slug>.json (texto lido do site oficial do produto).
// Regras de SEO e GEO vêm do roteiro tirado do documento "Métodos LP/SEO" (19/10/2026): ver gerador/seo-regras.md.
import { createHash } from 'node:crypto';
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { join } from 'node:path';
import { moldeDoProduto, publicarAtivos, corpoComMolde } from './moldes.mjs';

// HOJE: data da home, do llms.txt e do sitemap da home. Página de produto usa a data do PRÓPRIO artigo
// ("atualizado" no JSON) e cai em DATA_BASE se o artigo não mudou: assim o "Atualizado em" não mente nas outras.
export const HOJE = '2026-11-02';
const MESES = ['janeiro', 'fevereiro', 'março', 'abril', 'maio', 'junho', 'julho', 'agosto', 'setembro', 'outubro', 'novembro', 'dezembro'];
export const extenso = (d) => { const [a, m, dia] = d.split('-').map(Number); return `${dia} de ${MESES[m - 1]} de ${a}`; };
export const HOJE_EXTENSO = extenso(HOJE);
export const DATA_BASE = '2026-10-28';
const SITE_URL = 'https://visionxma.com';

// Bloco "Pergunte a uma IA" (regra 32 do seo-regras.md): título fixo, 3 botões em nova aba com a pergunta DA PÁGINA em q (nunca vazio),
// rel="noopener nofollow" e aria-label "Perguntar ao <IA> sobre <objeto> (abre em nova aba)". Uma fonte só: produto, home, contato e legais.
// `autonomo` = para página sem o portal.css nem as classes do Webflow (contato e legais): leva o próprio CSS.
const IAS = [['ChatGPT', 'https://chatgpt.com/?q='], ['Google IA', 'https://www.google.com/search?udm=50&amp;q='], ['Perplexity', 'https://www.perplexity.ai/search?q=']];
export function blocoIA({ pergunta, objeto, apoio, autonomo = false }) {
  if (!pergunta.trim()) throw new Error('blocoIA: pergunta vazia');
  const q = encodeURIComponent(pergunta);
  const lbl = (n) => `Perguntar ao ${n} sobre ${objeto} (abre em nova aba)`;
  if (!autonomo) return `<section class="vxp-sec vxp-sec--claro vxp-ia"><div class="padding-global"><div class="container-large">
  <h2>Quer uma segunda opinião? Pergunte a uma IA.</h2>
  <p>${apoio}</p>
  <div class="vxp-ia-botoes">
${IAS.map(([n, u]) => `    <a class="button" rel="noopener nofollow" target="_blank" href="${u}${q}" aria-label="${lbl(n)}"><div class="text-button-wrap"><div>${n}</div></div></a>`).join('\n')}
  </div>
</div></div></section>`;
  return `<section class="vxia" aria-label="Pergunte a uma IA"><style>.vxia{box-sizing:border-box;background:#f2f2f2;color:#131313;text-align:center;padding:2.5rem 1rem;font-family:"Plus Jakarta Sans",system-ui,-apple-system,Segoe UI,Roboto,sans-serif}.vxia *{box-sizing:border-box}.vxia-in{max-width:46rem;margin:0 auto}.vxia h2{margin:0;font-size:clamp(1.4rem,1.1rem + 1.2vw,2rem);line-height:1.2;letter-spacing:-.02em;font-weight:700;color:#131313}.vxia p{margin:.75rem auto 1.25rem;color:#585858;font-size:1rem;line-height:1.5}.vxia-b{display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:.75rem;margin:0;padding:0;list-style:none}.vxia-b li{display:contents}.vxia-b a{display:flex;align-items:center;justify-content:center;min-height:48px;min-width:0;padding:.5rem .75rem;border-radius:999px;background:#00d4ff;color:#04202a;font-weight:700;font-size:.9375rem;line-height:1.1;text-decoration:none;text-transform:uppercase;letter-spacing:.04em;transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s}.vxia-b a:active{transform:scale(.98)}.vxia-b a:focus-visible{outline:2px solid #04202a;outline-offset:3px}@media (hover:hover) and (pointer:fine){.vxia-b a:hover{transform:translateY(-2px);box-shadow:0 10px 20px -12px rgba(0,60,80,.6)}}@media (max-width:599px){.vxia{padding:2rem 1rem}.vxia-b{gap:.5rem}.vxia-b a{padding:.5rem .25rem;font-size:.6875rem;letter-spacing:0}}</style><div class="vxia-in">
<h2>Quer uma segunda opinião? Pergunte a uma IA.</h2>
<p>${apoio}</p>
<ul class="vxia-b">
${IAS.map(([n, u]) => `<li><a rel="noopener nofollow" target="_blank" href="${u}${q}" aria-label="${lbl(n)}">${n}</a></li>`).join('\n')}
</ul>
</div></section>`;
}

// Apps na App Store (conta VisionX CO; conferido na API pública da Apple em 09/11/2026): botão "Baixar para iPhone" na página do produto,
// junto da chamada principal. Produto sem app publicado não entra aqui (HotelGestão, ConstruSoft, AdvoGestão, Seu Plantão...).
const IOS = {
  frox: 'https://apps.apple.com/br/app/frox-motorista/id6823243616',
  finagro: 'https://apps.apple.com/br/app/finagro/id6827268381',
  softpay: 'https://apps.apple.com/br/app/softpay-pdv/id6829463542',
  biblia: 'https://apps.apple.com/br/app/b%C3%ADblia-sagrada-dia-e-noite/id6826437031',
  xmusic: 'https://apps.apple.com/br/app/xmusic/id6825472943',
};
const FONE = '<svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true" focusable="false"><rect x="7" y="2.5" width="10" height="19" rx="2.4" fill="none" stroke="currentColor" stroke-width="2"/><path d="M10.5 18.5h3" stroke="currentColor" stroke-width="2" stroke-linecap="round"/></svg>';
// Põe o botão logo depois do 1º botão "Acessar <produto>" da página (serve ao corpo padrão e ao vestido num molde).
export function comBotaoIos(html, p) {
  const href = IOS[p.slug];
  if (!href) return html;
  const i = [`>Acessar ${esc(p.nome)}<`, '>Falar sobre o aplicativo<'].map((m) => html.indexOf(m)).find((k) => k >= 0) ?? -1;
  if (i < 0) throw new Error(`botão iPhone: não achei o botão principal de ${p.slug}`);
  const j = html.indexOf('</a>', i) + 4;
  const ios = `<a class="vxp-ios" href="${href}" target="_blank" rel="noopener" aria-label="Baixar o ${esc(p.nome)} para iPhone na App Store (abre em nova aba)">${FONE}<span>Baixar para iPhone</span></a>`;
  return html.slice(0, j) + ios + html.slice(j);
}

const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const palavras = (t) => String(t).trim().split(/\s+/).filter(Boolean).length;
// No texto do artigo, [âncora](https://site-do-produto/caminho) vira link de verdade, seguido (sem nofollow): é o link
// com a palavra da busca que dá autoridade ao site do produto. Caminho interno (/produtos/x/) também vale.
const LINK_MD = /\[([^\]]+)\]\((https:\/\/[^)\s]+|\/[^)\s]*)\)/g;
export const semLinks = (t) => String(t).replace(LINK_MD, '$1');
const comLinks = (t) => esc(t).replace(/\[([^\]]+)\]\((https:\/\/[^)\s]+|\/[^)\s]*)\)/g, (_, a, u) => `<a href="${u}">${a}</a>`);
// Tabela comparativa do artigo (regra 30 do seo-regras.md): { legenda, colunas: [...], linhas: [[...]], fonte }.
// No celular cada linha vira cartão, com o nome da coluna em cada valor (data-rotulo), nunca quadro com rolagem lateral.
const tabelaHtml = (t) => `<div class="vxp-tabela" style="--n:${t.colunas.length - 1}"><table><caption>${esc(t.legenda)}</caption>
<thead><tr>${t.colunas.map((c) => `<th scope="col">${esc(c)}</th>`).join('')}</tr></thead>
<tbody>${t.linhas.map((l) => `<tr>${l.map((v, i) => i === 0 ? `<th scope="row">${esc(v)}</th>` : `<td data-rotulo="${esc(t.colunas[i])}">${esc(v)}</td>`).join('')}</tr>`).join('')}</tbody></table>${t.fonte ? `<p class="vxp-tabela-fonte">${esc(t.fonte)}</p>` : ''}</div>`;

// preço só entra se estiver escrito na página oficial do produto (fonte: texto lido em 28/10/2026)
export const OFERTAS = {
  frox: { texto: 'Plano Grátis para 1 caminhão; Plano Frotas a partir de R$ 63,75/mês', preco: '63.75', moeda: 'BRL' },
  construsoft: { texto: 'R$ 479,99/mês ou a partir de R$ 305,99/mês, usuários ilimitados', preco: '305.99', moeda: 'BRL' },
  // tarrafa.app/#planos, lido em 02/11/2026: Entrada R$ 0; Jangada R$ 29, Traineira R$ 99 e Porto R$ 249 por mês, por marca
  tarrafa: { texto: 'Entrada por R$ 0 (1 marca, até 3 redes); Jangada R$ 29, Traineira R$ 99 e Porto R$ 249 por mês, por marca', preco: '0', moeda: 'BRL' }
};

export function versao(siteDir, caminho) {
  const f = join(siteDir, caminho.replace(/^\//, '').split('?')[0]);
  if (!existsSync(f)) return caminho;
  return `${caminho}?v=${createHash('md5').update(readFileSync(f)).digest('hex').slice(0, 8)}`;
}

function trocaMeta(topo, { titulo, desc, caminho, imagem, ld }) {
  const url = SITE_URL + caminho;
  const r = (re, para) => { if (!re.test(topo)) throw new Error('meta não achada: ' + re); topo = topo.replace(re, () => para); };
  r(/<title>.*?<\/title>/s, `<title>${esc(titulo)}</title>`);
  r(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(desc)}">`);
  r(/<link rel="canonical" href="[^"]*">/, `<link rel="canonical" href="${url}">`);
  r(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(titulo)}">`);
  r(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(desc)}">`);
  r(/<meta property="og:url" content="[^"]*">/, `<meta property="og:url" content="${url}">`);
  r(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${imagem}">`);
  r(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(titulo)}">`);
  r(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(desc)}">`);
  r(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${imagem}">`);
  r(/<script type="application\/ld\+json">.*?<\/script>/s, `<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
  return topo;
}

export async function gerarPaginas({ topo, rodape, footerHtml, produtos, siteDir, gerDir, ic, ORG_ID }) {
  const avisos = [];
  const naoDev = produtos.filter((p) => p.grupo !== 'dev');
  const arquivoCartao = (p) => ({ meuescritorio: 'advocacia' }[p.slug] || p.slug);
  const lerArtigo = (p) => {
    const f = join(gerDir, 'artigos', p.slug + '.json');
    return existsSync(f) ? JSON.parse(readFileSync(f, 'utf8').replace(/,?\s*CNPJ\s*\d{2}\.\d{3}\.\d{3}\/\d{4}-\d{2}/g, '')) : null;
  };
  const imagemDe = (p) => {
    const c = `/img/cartoes/${arquivoCartao(p)}.webp`;
    if (existsSync(join(siteDir, c))) return c;
    if (p.captura && existsSync(join(siteDir, `/img/capturas/${p.captura}`))) return `/img/capturas/${p.captura}`;
    return null;
  };
  const ogDe = (p) => {
    const o = `/img/og/${p.slug}.png`;
    return existsSync(join(siteDir, o)) ? SITE_URL + o : SITE_URL + '/img/og/visionx.png';
  };

  const cartaoRelacionado = (o) => {
    const ico = o.icone ? `<span class="vxp-ico${o.icone.endsWith('.svg') ? ' vxp-ico--svg' : ''}"><img src="${ic(o.icone)}" alt="" loading="lazy" width="48" height="48"></span>` : `<span class="vxp-ico vxp-ico--letra" aria-hidden="true">${esc(o.nome[0])}</span>`;
    return `<a class="vxp-card" href="/produtos/${o.slug}/">${ico}<div class="vxp-nome"><h3 class="text-xl">${esc(o.nome)}</h3><span class="vxp-setor">${esc(o.setor)}</span></div><p class="vxp-texto">${esc(o.resumo)}</p><span class="vxp-ir">Saiba mais <span aria-hidden="true">→</span></span></a>`;
  };

  const paginas = [];
  for (const p of naoDev) {
    const art = lerArtigo(p);
    const caminho = `/produtos/${p.slug}/`;
    const grupoNome = p.grupo === 'gestao' ? 'Sistemas de gestão' : 'Ferramentas e plataformas';
    const h1 = `${p.nome}: ${p.resumo.replace(/\.$/, '')}`;
    const titulo = `${p.nome} — ${p.setor} | VisionX`.slice(0, 60);
    const limpa = (t) => t.replace(/\s+/g, ' ').trim();
    let desc = limpa(art?.resumo || p.resumo);
    if (desc.length < 150) {
      const extra = limpa(`${p.texto} ${p.resumo}`).split(' ');
      desc = desc.replace(/[.\s]+$/, '') + '.';
      for (const w of extra) { if (desc.length >= 150) break; desc += ' ' + w; }
      desc = desc.replace(/[ ,;:]+$/, '');
    }
    if (desc.length > 160) desc = desc.slice(0, 160).replace(/\s+\S*$/, '').replace(/[ ,;:]+$/, '');
    if (!/[.!?]$/.test(desc) && desc.length < 160) desc += '.';
    if (desc.length < 150 || desc.length > 160) avisos.push(`${p.slug}: description com ${desc.length} caracteres (meta 150 a 160)`);
    if (titulo.length > 60) avisos.push(`${p.slug}: title com ${titulo.length} caracteres`);
    const imagem = imagemDe(p);
    const outros = naoDev.filter((o) => o.slug !== p.slug && o.grupo === p.grupo).slice(0, 4);
    const oferta = OFERTAS[p.slug];

    const recursos = art?.recursos?.length ? art.recursos : p.pontos.map((t) => ({ titulo: t, texto: '' }));
    const secoes = art?.secoes || [];
    const faq = art?.faq || [];
    const motivos = art?.motivos || [];
    const ledeBase = art?.lede || p.texto;
    const frases = (`${ledeBase} ${p.texto}`).replace(/\s+/g, ' ').match(/[^.!?]+[.!?]+/g) || [ledeBase];
    let lede = ''; for (const f of frases) { if (palavras(lede + ' ' + f) > 60) break; lede = (lede + ' ' + f).trim(); }
    if (palavras(lede) < 40) lede = ledeBase;
    if (!art) avisos.push(`${p.slug}: sem artigo (gerador/artigos/${p.slug}.json); página sai só com resumo e pontos`);
    else if (palavras(lede) < 40 || palavras(lede) > 60) avisos.push(`${p.slug}: lede com ${palavras(lede)} palavras (bloco citável pede 40 a 60)`);
    const corpoArtigo = semLinks(secoes.flatMap((s) => s.paragrafos).join(' '));
    const nPal = palavras(corpoArtigo);
    const data = art?.atualizado || DATA_BASE;

    const ld = { '@context': 'https://schema.org', '@graph': [
      { '@type': 'WebPage', '@id': SITE_URL + caminho + '#pagina', url: SITE_URL + caminho, name: titulo, description: desc, inLanguage: 'pt-BR', isPartOf: { '@id': SITE_URL + '/#site' }, dateModified: data },
      { '@type': 'BreadcrumbList', itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'VisionX', item: SITE_URL + '/' },
        { '@type': 'ListItem', position: 2, name: grupoNome, item: SITE_URL + (p.grupo === 'gestao' ? '/#sistemas' : '/#ferramentas') },
        { '@type': 'ListItem', position: 3, name: p.nome, item: SITE_URL + caminho } ] },
      { '@type': 'SoftwareApplication', name: p.nome, description: p.resumo, applicationCategory: 'BusinessApplication', operatingSystem: 'Web', url: p.url || SITE_URL + caminho, publisher: { '@id': ORG_ID },
        ...(oferta ? { offers: { '@type': 'Offer', price: oferta.preco, priceCurrency: oferta.moeda } } : {}) },
      ...(art ? [{ '@type': 'Article', headline: art.titulo_artigo, description: desc, inLanguage: 'pt-BR', author: { '@id': ORG_ID }, publisher: { '@id': ORG_ID }, datePublished: art.publicado || DATA_BASE, dateModified: data, mainEntityOfPage: SITE_URL + caminho, image: ogDe(p) }] : []),
      ...(faq.length ? [{ '@type': 'FAQPage', mainEntity: faq.map((q) => ({ '@type': 'Question', name: q.p, acceptedAnswer: { '@type': 'Answer', text: q.r } })) }] : [])
    ] };

    const logo = p.icone ? `<div class="container-icon vxp-logo"><img src="${ic(p.icone)}" alt="Logo do ${esc(p.nome)}" width="64" height="64" class="icon-1x1-medium"></div>` : `<div class="container-icon vxp-logo vxp-logo--letra" aria-hidden="true">${esc(p.nome[0])}</div>`;
    const botao = p.url
      ? `<a href="${p.url}" target="_blank" rel="noopener" class="button-arrow w-inline-block"><div class="button-arrow_wrap"><div class="button-arrow_text"><div class="text_button">Acessar ${esc(p.nome)}</div></div><div class="button_container-arrow"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></div><div class="button-arrow_bg"></div></div></a>`
      : `<a href="/#contato" class="button-arrow w-inline-block"><div class="button-arrow_wrap"><div class="button-arrow_text"><div class="text_button">${p.estado === 'app' ? 'Falar sobre o aplicativo' : 'Falar com a VisionX'}</div></div><div class="button_container-arrow"><svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><path d="M7 17L17 7M9 7h8v8"/></svg></div><div class="button-arrow_bg"></div></div></a>`;

    const slugId = (t) => t.toLowerCase().normalize('NFD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '').slice(0, 48);
    const relLinks = outros.slice(0, 3).map((o) => `<a href="/produtos/${o.slug}/">${esc(o.nome)}</a>`).join(', ');
    const pergunta = `O que é o ${p.nome} e para quem serve?`;
    const q = encodeURIComponent(pergunta + ' ' + p.resumo); // os moldes (gerador/moldes.mjs) montam o próprio bloco com este q

    const main = `<main class="main-wrapper">
<section class="sec_hero-service"><div class="container-full height-100"><div class="hero-service_layout">
  <div class="hero-service_left">
    <nav class="vxp-trilha" aria-label="Trilha"><a href="/">VisionX</a> <span aria-hidden="true">/</span> <a href="${p.grupo === 'gestao' ? '/#sistemas' : '/#ferramentas'}">${grupoNome}</a> <span aria-hidden="true">/</span> <span>${esc(p.nome)}</span></nav>
    ${logo}
    <div class="spacer-medium"></div>
    <h1 class="text-4xl text-color-primary">${esc(h1)}</h1>
    <div class="spacer-medium"></div>
    <div class="text-base text-color-secondary w-richtext"><p>${esc(lede)}</p></div>
    ${oferta ? `<p class="vxp-oferta">${esc(oferta.texto)}</p>` : ''}
    <div class="spacer-huge"></div>
    ${botao}
  </div>
  ${imagem ? `<div class="hero-service_right"><img class="img vxp-hero-img" src="${versao(siteDir, imagem)}" alt="Tela e recursos do ${esc(p.nome)}, ${esc(p.setor.toLowerCase())}" width="1024" height="1024"></div>` : ''}
</div></div></section>

<section class="vxp-sec vxp-sec--claro" id="recursos"><div class="padding-global"><div class="container-large">
  <div class="vertical-center"><div data-reveal class="tag"><div class="dot-square"></div><div>Recursos</div></div><div class="spacer-large"></div>
  <h2 class="text-align-center">O que o ${esc(p.nome)} faz</h2></div><div class="spacer-large"></div>
  <ul class="vxp-recursos">${recursos.map((r) => `<li><h3>${esc(r.titulo)}</h3>${r.texto ? `<p>${esc(r.texto)}</p>` : ''}</li>`).join('')}</ul>
</div></div></section>

${art ? `<section class="vxp-sec" id="artigo"><div class="padding-global"><div class="container-large"><div class="vxp-artigo-grade">
  <aside class="vxp-toc" aria-label="Neste artigo"><strong>Neste artigo</strong><ol>${secoes.map((s) => `<li><a href="#${slugId(s.h2)}">${esc(s.h2)}</a></li>`).join('')}${faq.length ? '<li><a href="#perguntas">Perguntas frequentes</a></li>' : ''}</ol></aside>
  <article class="vxp-artigo">
    <div class="tag"><div class="dot-square"></div><div>Artigo</div></div>
    <h2>${esc(art.titulo_artigo)}</h2>
    <p class="vxp-meta">Por VisionX · Atualizado em <time datetime="${data}">${extenso(data)}</time></p>
    ${secoes.map((s) => `<h3 id="${slugId(s.h2)}">${esc(s.h2)}</h3>${s.paragrafos.map((t) => `<p>${comLinks(t)}</p>`).join('')}${s.tabela ? tabelaHtml(s.tabela) : ''}`).join('')}
    <p class="vxp-veja">Veja também: ${relLinks}. <a href="/">Página inicial da VisionX</a>.</p>
  </article>
</div></div></div></section>` : ''}

${motivos.length ? `<section class="vxp-sec vxp-sec--claro" id="motivos"><div class="padding-global"><div class="container-large">
  <div class="vertical-center"><div data-reveal class="tag"><div class="dot-square"></div><div>Por que escolher</div></div><div class="spacer-large"></div><h2 class="text-align-center">Por que escolher o ${esc(p.nome)}</h2></div><div class="spacer-large"></div>
  <ul class="vxp-recursos">${motivos.map((m) => `<li><h3>${esc(m.titulo)}</h3><p>${esc(m.texto)}</p></li>`).join('')}</ul>
</div></div></section>` : ''}

${faq.length ? `<section class="vxp-sec" id="perguntas"><div class="padding-global"><div class="container-large"><div class="vxp-faq">
  <div class="vertical-center"><div data-reveal class="tag"><div class="dot-square"></div><div>Perguntas</div></div><div class="spacer-large"></div><h2 class="text-align-center">Perguntas frequentes sobre o ${esc(p.nome)}</h2></div><div class="spacer-large"></div>
  ${faq.map((f) => `<details name="faq"><summary>${esc(f.p)}</summary><p>${esc(f.r)}</p></details>`).join('')}
</div></div></div></section>` : ''}

${blocoIA({ pergunta: pergunta + ' ' + p.resumo, objeto: `o ${p.nome}`, apoio: `Faça a pergunta sobre o ${esc(p.nome)} direto no assistente que você já usa:` })}

${outros.length ? `<section class="vxp-sec" id="outros"><div class="padding-global"><div class="container-large">
  <div class="vertical-center"><div class="tag"><div class="dot-square"></div><div>${grupoNome}</div></div><div class="spacer-large"></div><h2 class="text-align-center">Outros produtos da VisionX</h2></div><div class="spacer-large"></div>
  <div class="vxp-grade">${outros.map(cartaoRelacionado).join('')}</div>
</div></div></section>` : ''}

<section class="section_cta"><div class="padding-global is-cta"><div class="cta-wrap"><div class="container-large">
  <div class="cta_top"><div class="cta_text"><div class="text-color-on-primary">${esc(p.setor)}</div></div></div><div class="spacer-huge"></div>
  <h2 class="text-color-on-primary">Conheça o ${esc(p.nome)}</h2><div class="spacer-medium"></div>
  <div class="max-width-medium is-33rem"><div class="text-color-on-primary">${esc(p.resumo)}</div></div><div class="spacer-huge"></div>
  <div class="button_wrapper">${botao}</div>
</div><div class="overlay"></div></div></div></section>
</main>`;

    // ---- molde por rota: o mesmo conteúdo, vestido no corpo clonado de uma LP de referência (gerador/moldes.mjs) ----
    const molde = await moldeDoProduto(p.slug);
    let corpo = main;
    let ativosMolde = null;
    if (molde) {
      ativosMolde = publicarAtivos(molde, siteDir);
      const ctx = {
        p, esc, comLinks, tabelaHtml, slugId, ic, siteDir, versao: (c) => versao(siteDir, c),
        h1, lede, titulo, grupoNome, grupoHref: p.grupo === 'gestao' ? '/#sistemas' : '/#ferramentas',
        oferta, imagem: imagem ? versao(siteDir, imagem) : null, imagemAlt: `Tela e recursos do ${p.nome}, ${p.setor.toLowerCase()}`,
        logo: p.icone ? ic(p.icone) : null,
        acao: p.url ? { href: p.url, rotulo: `Acessar ${p.nome}`, externo: true } : { href: '/#contato', rotulo: p.estado === 'app' ? 'Falar sobre o aplicativo' : 'Falar com a VisionX', externo: false },
        recursos, secoes, faq, motivos, art, data, dataExtenso: extenso(data),
        relLinks, pergunta, q, outros: outros.map((o) => ({ ...o, iconeSrc: o.icone ? ic(o.icone) : null })),
      };
      corpo = corpoComMolde(molde, ctx) + '</main>';
    }

    const V = ' w-variant-b70328b2-1dfd-ba7a-c1d1-5c2a5b388d0d';
    let topoPagina = trocaMeta(topo, { titulo, desc, caminho, imagem: ogDe(p), ld });
    if (ativosMolde) topoPagina = topoPagina.replace('</head>', `${ativosMolde.css ? `<link rel="stylesheet" href="${ativosMolde.css}">\n` : ''}${ativosMolde.js ? `<script src="${ativosMolde.js}" defer></script>\n` : ''}</head>`);
    for (const [de, para] of [['class="navbar"', `class="navbar${V}"`], ['class="padding-global is-navbar"', `class="padding-global is-navbar${V}"`], ['class="navbar_logo-link w-inline-block"', `class="navbar_logo-link w-inline-block${V}"`], ['class="navbar_logo"', `class="navbar_logo${V}"`], ['class="nav_mobile"', `class="nav_mobile${V}"`], ['class="navbar_list"', `class="navbar_list${V}"`]]) {
      if (!topoPagina.includes(de)) throw new Error('barra: não achei ' + de);
      topoPagina = topoPagina.replace(de, para);
    }
    paginas.push({ caminho, slug: p.slug, molde: molde?.id || null, html: comBotaoIos(topoPagina + corpo.replace(/<\/main>$/, footerHtml + '</main>') + rodape, p), titulo, desc, art, faq, nPal, recursos, nome: p.nome, data });
    if (art && (nPal < 800 || nPal > 1500)) avisos.push(`${p.slug}: artigo com ${nPal} palavras (meta 800 a 1.500)`);
  }
  return { paginas, avisos };
}
