// Molde rd-crm: o corpo da página de produto do RD Station CRM (www.rdstation.com/produtos/crm/), clonado pela captura
// renderizada em 02/11/2026. As mesmas peças montam as duas versões:
//   modo 'origem'  → textos, ícones e mídias da própria referência (origem.json): é o que a prova compara com a captura;
//   modo produto   → o conteúdo da página do produto da VisionX (ctx de gerador/paginas-produto.mjs), sem tirar nada.
// A marcação é a da referência (classes bsl-*/bsc-*), e o CSS escopado dela (molde.css) faz o tamanho, o espaço e a
// composição. A roupa da VisionX (cores, letra, hero de tela inteira, grades do celular) mora em acabamento.css.
import { icone } from '../_icones.mjs';
import { existsSync } from 'node:fs';
import { fileURLToPath } from 'node:url';

// print de 1600px ganha a versão de 800px (<nome>-800.webp, ao lado) quando ela existe: no celular a tela mostra
// 150 a 310px e o de audit acusava arquivo 2 a 4x maior que o preciso
const SITE = fileURLToPath(new URL('../../site', import.meta.url));
const fontes = (src, sizes) => {
  const menor = String(src || '').replace(/\.webp$/, '-800.webp');
  return menor !== src && src.startsWith('/') && existsSync(SITE + menor) ? ` srcset="${menor} 800w, ${src} 1600w" sizes="${sizes}"` : '';
};

export const meta = {
  id: 'rd-crm',
  referencia: 'https://www.rdstation.com/produtos/crm/',
  captura: '~/.jarvis/visionx/clones/capturas/rdstation-crm',
  // faixa de anúncio + menu da referência dentro da seção 0 (na página vestida o lugar é do cabeçalho do chassi)
  topoDoChassi: { 1440: 132, 390: 124 },
  secoes: [
    { idx: 0, tipo: 'hero' },
    { idx: 1, tipo: 'logos de clientes', omitida: 'logos de empresas reais clientes da referência; nada de cliente inventado' },
    { idx: 2, tipo: 'mídia + texto do módulo de IA da referência', omitida: 'produto da referência (IA para Negociações) sem equivalente; nada se inventa' },
    { idx: 3, tipo: 'abas com mídia' },
    { idx: 4, tipo: 'acordeão do ciclo de produtos da referência', omitida: 'fala de outros produtos da referência' },
    { idx: 5, tipo: 'mídia + tópicos', omitida: 'conteúdo da referência sem equivalente no produto' },
    { idx: 6, tipo: 'preços', omitida: 'preços da referência; o preço do produto está na oferta do topo' },
    { idx: 8, tipo: 'depoimento', omitida: 'depoimento de pessoa e empresa reais da referência' },
    { idx: 9, tipo: 'mídia + tópicos com foto de pessoa', omitida: 'foto de pessoa de banco de imagem da referência' },
    { idx: 10, tipo: 'lista de tópicos (título à esquerda)' },
    { idx: 11, tipo: 'logos de integrações', omitida: 'logos de marcas de terceiros' },
    { idx: 12, tipo: 'cartões de recursos com filtro' },
    { idx: 13, tipo: 'faixa com chamada' },
    { idx: 14, tipo: 'mídia + tópicos com foto de pessoa', omitida: 'foto de pessoa de banco de imagem da referência' },
    { idx: 15, tipo: 'lista de tópicos (centrada)' },
    { idx: 16, tipo: 'faixa de chamada final' },
    { idx: 17, tipo: 'perguntas frequentes' },
  ],
};

const SETA_BOTAO = '<svg class="arrow-icon" width="16" height="9" viewBox="0 0 16 9" fill="none" aria-hidden="true"><path d="M11.8851 0.143408L15.859 4.15616C16.047 4.34604 16.047 4.65392 15.859 4.84384L11.8851 8.85659C11.5818 9.16293 11.0631 8.94598 11.0631 8.51277V5.63457H0.481533C0.215606 5.63457 0 5.41685 0 5.14832V3.85164C0 3.58311 0.215606 3.36539 0.481533 3.36539H11.0631V0.487188C11.0631 0.0540187 11.5818 -0.162931 11.8851 0.143408Z" fill="currentColor"></path></svg>';
const SETA_LINK = '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M12.5744 10.3886L8.12395 14.839C7.90931 15.0537 7.56133 15.0537 7.34671 14.839L6.82765 14.32C6.61337 14.1057 6.61296 13.7584 6.82673 13.5436L10.3538 9.99999L6.82673 6.45637C6.61296 6.24159 6.61337 5.89432 6.82765 5.68005L7.34671 5.16098C7.56135 4.94634 7.90934 4.94634 8.12395 5.16098L12.5744 9.61138C12.789 9.826 12.789 10.174 12.5744 10.3886Z"></path></svg>';
const SETA_FAQ = '<svg class="mx-faq-seta" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="m6 9 6 6 6-6"/></svg>';

const e = (s) => String(s ?? '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const sec = (D, idx) => (D.origem ? ` data-mx-secao="${idx}"` : '');
const alvo = (l) => (l.externo ? ' target="_blank" rel="noopener"' : '') + (l.rel ? ` rel="${l.rel}"` : '') + (l.target ? ` target="${l.target}"` : '');

// botão: na referência é <button> (abre modal); no produto é link de verdade, com a mesma classe
const botao = (b, classe) => b.href
  ? `<a class="bsc-button ${classe}" href="${e(b.href)}"${alvo(b)}>${e(b.texto)}<span class="right-icon">${SETA_BOTAO}</span></a>`
  : `<button type="button" class="bsc-button ${classe}">${e(b.texto)}<span class="right-icon">${SETA_BOTAO}</span></button>`;
const linkSeta = (l, classe) => `<a class="bsc-link ${classe}"${l.href ? ` href="${e(l.href)}"` : ''}${alvo(l)}>${e(l.texto)}<span class="icon right">${SETA_LINK}</span></a>`;

function hero(D) {
  const h = D.hero;
  const fundo = h.fundo ? `<picture><source srcset="${h.fundo.desk}" width="2880" height="1220" media="(min-width: 1280px)"><source srcset="${h.fundo.tablet}" width="1536" height="1856" media="(min-width: 768px)"><img class="bg-hero" src="${h.fundo.mobile}" alt="" width="750" height="1572"></picture>` : '';
  return `<section class="bsl-hero hero bg-image solid right${D.origem ? '' : ' mx-hero'}"${D.origem ? ' style="color:#002233"' : ''}${sec(D, 0)}>${fundo}<div class="hero-container bg-image right  "><div class="bsc-grid hero-wrapper mobile-row-gap-48 tablet-row-gap-56 desktop-row-gap-80"><div class="bsc-grid-item hero-item desktop-column-span-6"><div class="bsc-grid hero-content mobile-row-gap-32 nested">`
    + (h.antes ? `<div class="bsc-grid-item mx-antes">${h.antes}</div>` : '')
    + `<div class="bsc-grid-item"><h1 class="bsc-text mobile-heading-sm tablet-heading-md desktop-heading-lg title">${e(h.h1)}</h1></div>`
    + `<div class="bsc-grid-item"><p class="bsc-text mobile-subtitle-xxs-regular tablet-subtitle-xs-regular description">${e(h.lede)}</p>${h.oferta ? `<p class="vxp-oferta mx-oferta">${e(h.oferta)}</p>` : ''}</div>`
    + `<div class="bsc-grid-item button-content">${botao(h.cta, 'highlight mobile-size-md mobile-fill-false')}${linkSeta(h.link2, 'secondary mobile-md bold')}</div>`
    + `</div></div><div class="bsc-grid-item desktop-column-span-6"><div class="image-wrapper   ">${h.midia}</div></div></div></div></section>`;
}

function abas(D) {
  const a = D.abas;
  const ativa = a.ativa || 0;
  const midia = (it, i) => it.video
    ? `<video src="${it.video}" playsinline="" autoplay="" muted="" loop=""></video>`
    : `<img src="${it.img.src}"${fontes(it.img.src, '(min-width: 80rem) 1000px, 92vw')} alt="${e(it.img.alt)}" width="${it.img.w || 1600}" height="${it.img.h || 1000}"${i === ativa ? '' : ' loading="lazy"'} decoding="async">`;
  return `<section class="bsl-slider-tabs"${a.id ? ` id="${a.id}"` : ''}${sec(D, 3)}><div class="bsc-grid mobile-row-gap-40"><div class="bsc-grid-item content-title"><h2 class="bsc-text mobile-heading-sm tablet-heading-md">${e(a.h2)}</h2>${a.texto ? `<p class="bsc-text mobile-body-xs-regular desktop-body-sm-regular description">${e(a.texto)}</p>` : ''}</div>`
    + `<div class="bsc-grid-item tabs"><nav class="tabs-wrapper" aria-label="${e(a.rotuloAbas || a.h2)}"><ul role="tablist">${a.itens.map((it, i) => `<li class="${it.classe || ''}" role="presentation"><button type="button" data-tab="tab-${i}" class="tab${i === ativa ? ' active' : ''}" role="tab" id="mx-aba-${i}" aria-controls="mx-tela-${i}" aria-selected="${i === ativa}"><span class="icon">${it.icone}</span>${e(it.rotulo)}</button></li>`).join('')}</ul></nav></div>`
    + `<div class="bsc-grid-item slider-wrapper desktop-start-2 desktop-end-12">${a.aviso ? `<div class="bsc-text mobile-caption-regular caption"><span class="ia-icon">${a.aviso.svg}</span>${e(a.aviso.texto)}</div>` : ''}<div class="slider-bg"><div class="splide media-wrapper splide--slide splide--ltr is-active is-overflow is-initialized"><div class="splide__track splide__track--slide splide__track--ltr" style="padding-left: 0px; padding-right: 0px;"><ul class="splide__list" style="transform: translateX(0px);">`
    + a.itens.map((it, i) => `<li class="splide__slide media-item${i === ativa ? ' is-active is-visible' : ''}" data-tab="tab-${i}" id="mx-tela-${i}" role="tabpanel" aria-labelledby="mx-aba-${i}"${i === ativa ? '' : ' hidden'} style="margin-right: 100px;">${midia(it, i)}${it.legenda ? `<p class="mx-legenda">${e(it.legenda)}</p>` : ''}</li>`).join('')
    + `</ul></div></div></div></div></div></section>`;
}

function cartao(c, D) {
  const T = D.origem ? 'span' : 'h3';
  const tagInterna = (c.classeTag || '').trim().split(/\s+/)[0] || '';
  const tag = c.tag ? `<div class="tag-container ${c.classeTag}" style="color:#000000"><div class="tag ${tagInterna}"${c.estiloTag ? ` style="${c.estiloTag}"` : ''}><span class="bsc-text mobile-caption-bold label">${e(c.tag)}</span>${c.extraTag || ''}</div></div>` : '';
  const comLink = /show-link/.test(c.classeCartao || '');
  return `<div class="bsc-card ${c.classeCartao || 'light align-left hover-shadow'}" data-category="${e(c.categoria || '')}"><div class="card-container${comLink ? ' show-link' : ''}"><div class=" content"><div class="top-wrapper"><div class="icon">${c.icone}</div>${tag}</div><${T} class="bsc-text mobile-subtitle-xxs-bold title light ">${e(c.titulo)}</${T}><div class="bsc-text mobile-subtitle-xxs-regular description light ">${e(c.texto)}</div>${c.link ? linkSeta({ texto: c.rotuloLink, href: c.link }, 'bsc-custom-link primary mobile-md bold') : ''}</div></div></div>`;
}

function cartoes(D) {
  const c = D.cartoes;
  const filtros = c.filtros?.length ? `<div class="bsc-grid-item"><div class="bsc-filter-overflow light styled-filter"><div class="filter"><div class="filter-wrapper" style="color:#fff"><div class="filter-buttons-wrapper">${c.filtros.map((f, i) => `<div class="bsc-chip light" data-category="${i + 1}"><input type="checkbox" aria-label="${e(f)}"><label><span>${e(f)}</span></label></div>`).join('')}</div></div></div></div></div>` : '';
  const setas = c.setas?.length ? `<div class="arrows">${c.setas.map((s) => `<button type="button" class="${s.lado} arrow" aria-label="${s.lado === 'back' ? 'Anterior' : 'Próximo'}">${s.svg}</button>`).join('')}</div>` : '';
  return `<section class="bsl-cards-collection-filter-large light"${c.id ? ` id="${c.id}"` : ''}${sec(D, 12)}><div class="bsc-grid cards-container mobile-row-gap-40"><div class="bsc-grid-item cards-title"><span class="bsc-text mobile-subtitle-xxs-bold-uppercase subtitle">${e(c.olho)}</span><h2 class="bsc-text mobile-heading-sm tablet-heading-md title">${e(c.h2)}</h2>${c.link?.texto ? `<div class="cards-link">${linkSeta(c.link, 'bsc-custom-link  primary mobile-md bold')}</div>` : ''}</div>`
    + filtros + `<div class="bsc-grid-item cards desktop-column-span-12">${setas}<div class="bsc-grid cards-wrapper nested">${c.itens.map((x) => cartao(x, D)).join('')}</div></div></div></section>`;
}

function topicos(D, t, idx) {
  const T = D.origem ? 'span' : 'h3';
  return `<section class="bsl-topics-list light${t.extra ? ' ' + t.extra : ''}" id="${t.id || ''}"${sec(D, idx)}><div class="topic-list-title ${t.centro ? 'text-center' : ''}"><div class="bsc-grid mobile-row-gap-16"><div class="bsc-grid-item"><span class="bsc-text mobile-subtitle-xxs-bold">${e(t.olho)}</span></div><div class="bsc-grid-item"><h2 class="bsc-text mobile-heading-sm desktop-heading-md">${e(t.h2)}</h2></div>${t.texto ? `<div class="bsc-grid-item"><p class="bsc-text mobile-subtitle-xxs-regular tablet-subtitle-xs-regular">${e(t.texto)}</p></div>` : ''}</div></div>`
    + `<div class="bsc-grid topics-wrapper mobile-row-gap-40 desktop-row-gap-64 mobile-column-gap-40">${t.itens.map((i) => `<div class="bsc-grid-item desktop-column-span-3 tablet-column-span-6 mobile-column-span-2"><div class="bsc-card light align-left hover-shadow"><div class="card-container "><div class="  content"><div class="top-wrapper"><div class="icon">${i.icone}</div></div><${T} class="bsc-text mobile-subtitle-xxs-bold title light ">${i.href ? `<a href="${i.href}">${e(i.titulo)}</a>` : e(i.titulo)}</${T}><div class="bsc-text mobile-subtitle-xxs-regular description light "><p>${e(i.texto)}</p>\n</div>${i.href ? linkSeta({ texto: i.rotuloLink || 'Conhecer', href: i.href }, 'bsc-custom-link primary mobile-md bold mx-ir') : ''}</div></div></div></div>`).join('')}</div></section>`;
}

function faixa(D) {
  const f = D.ia;
  return `<section class="rdl-banner-crm ${D.origem ? 'undefined' : 'mx-ia'}"${f.id ? ` id="${f.id}"` : ''}${sec(D, 13)}><div class="bsc-grid container"><div class="bsc-grid-item mobile-column-span-12"><h2 class="bsc-text mobile-heading-sm">${e(f.h2)}</h2>${f.texto ? `<p class="bsc-text mobile-body-sm-regular mx-ia-texto">${e(f.texto)}</p>` : ''}</div><div class="bsc-grid-item mobile-column-span-12${f.botoes.length > 1 ? ' mx-ia-botoes' : ''}">${f.botoes.map((b) => botao(b, 'primary mobile-size-md mobile-fill-false')).join('')}</div></div></section>`;
}

function chamada(D) {
  const c = D.cta;
  return `<section class="bsl-banner-cta"${sec(D, 16)}><div class="bsc-grid"><div class="bsc-grid-item banner grayscale"><div class="content-wrapper"><h2 class="bsc-text mobile-heading-xs-medium tablet-heading-md-semi-bold title"> ${e(c.h2)}</h2>${c.texto ? `<p class="bsc-text mobile-body-sm-regular mx-cta-texto">${e(c.texto)}</p>` : ''}<div class="ctas-wrapper"><div class="form-cta form-cta-us">${botao(c.botao, 'primary mobile-size-sm mobile-fill-false')}</div>${linkSeta(c.link, 'bsc-custom-link  primary mobile-md bold')}</div></div></div></div></section>`;
}

function faq(D) {
  const f = D.faq;
  const vis = D.origem ? f.itens.length : 5;
  const resto = f.itens.length - vis;
  return `<section class="bsl-faq light"${f.id ? ` id="${f.id}"` : ''}${sec(D, 17)}><div class="bsc-grid mobile-row-gap-80">${f.abrirTodos ? `<button type="button" class="bsc-button inverse mobile-size-sm mobile-fill-false button-toggle">${e(f.abrirTodos)}</button>` : ''}<div class="bsc-grid-item category-wrapper"><div class="bsc-grid category-grid nested"><div class="bsc-grid-item tablet-column-span-3"><h2 class="bsc-text mobile-heading-sm category-title">${e(f.h2)}</h2></div><div class="bsc-grid-item tablet-start-4"><div class="questions-wrapper">`
    + f.itens.map((q, i) => `<details class="question-wrapper${i >= vis ? ' mx-faq-extra' : ''}" name="faq"><summary class="question"><h3 class="bsc-text mobile-subtitle-xs-bold question-title">${e(q.p)}</h3>${f.seta}</summary><div class="bsc-text mobile-body-sm-regular answer"><p>${e(q.r)}</p>\n</div></details>`).join('')
    + `</div>${resto > 0 ? `<button type="button" class="bsc-button inverse mobile-size-sm mobile-fill-false mx-faq-mais" aria-expanded="false">Ver mais perguntas (+${resto})</button>` : ''}</div></div></div></div></section>`;
}

// artigo: seção nova (a referência não tem), na composição do FAQ dela (título e índice à esquerda, texto à direita)
function artigo(D) {
  const a = D.artigo;
  return `<section class="bsl-faq light mx-artigo" id="artigo"><div class="bsc-grid"><div class="bsc-grid-item category-wrapper"><div class="bsc-grid category-grid nested"><div class="bsc-grid-item tablet-column-span-3"><aside class="vxp-toc mx-toc" aria-label="Neste artigo"><strong class="bsc-text mobile-subtitle-xxs-bold-uppercase">Neste artigo</strong><ol>${a.indice}</ol></aside></div><div class="bsc-grid-item tablet-start-4"><article class="vxp-artigo">`
    + `<span class="bsc-text mobile-subtitle-xxs-bold-uppercase mx-olho">Artigo</span><h2 class="bsc-text mobile-heading-sm tablet-heading-md">${e(a.titulo)}</h2><p class="vxp-meta">Por VisionX · Atualizado em <time datetime="${a.data}">${a.dataExtenso}</time></p>${a.corpo}`
    + `</article></div></div></div></div></section>`;
}

// ---- produto → as mesmas peças ----
function dados(ctx) {
  const { p, esc, comLinks, tabelaHtml, slugId, midia = {} } = ctx;
  const ICO = (t) => icone(t, 28);
  const telas = midia.telas || [];
  const trilha = `<nav class="vxp-trilha mx-trilha" aria-label="Trilha"><a href="/">VisionX</a> <span aria-hidden="true">/</span> <a href="${ctx.grupoHref}">${esc(ctx.grupoNome)}</a> <span aria-hidden="true">/</span> <span>${esc(p.nome)}</span></nav>`;
  const logo = ctx.logo ? `<img class="mx-logo" src="${ctx.logo}" alt="Logo do ${esc(p.nome)}" width="56" height="56">` : '';
  const heroImg = midia.hero
    ? `<div class="mx-palco"><img class="hero-image mx-print" src="${midia.hero.src}"${fontes(midia.hero.src, '(min-width: 64rem) 46vw, 88vw')} alt="${esc(midia.hero.alt)}" width="1600" height="1000" fetchpriority="high" decoding="async">${midia.flutua ? `<img class="mx-flutua" src="${midia.flutua.src}"${fontes(midia.flutua.src, '(min-width: 64rem) 24vw, 46vw')} alt="${esc(midia.flutua.alt)}" width="1600" height="1000" loading="lazy" decoding="async">` : ''}</div>`
    : (ctx.imagem ? `<img class="hero-image" src="${ctx.imagem}" alt="${esc(ctx.imagemAlt)}" width="1024" height="1024">` : '');
  const acaoLink = { texto: ctx.acao.rotulo, href: ctx.acao.href, externo: ctx.acao.externo };
  const D = {
    origem: false,
    hero: { antes: trilha + logo, h1: ctx.h1, lede: ctx.lede, oferta: ctx.oferta?.texto, cta: acaoLink, link2: { texto: 'Ver os recursos', href: '#recursos' }, midia: heroImg },
    abas: telas.length ? {
      id: 'telas', h2: `Telas do ${p.nome}`, texto: midia.telasTexto || p.resumo, rotuloAbas: `Telas do ${p.nome}`,
      itens: telas.map((t) => ({ classe: '', icone: icone(t.icone || t.rotulo, 22), rotulo: t.rotulo, img: { src: t.src, alt: t.alt }, legenda: t.legenda })),
    } : null,
    cartoes: {
      id: 'recursos', olho: 'Recursos', h2: `O que o ${p.nome} faz`,
      itens: ctx.recursos.map((r) => ({ classeCartao: 'light align-left hover-shadow', icone: ICO(r.titulo), titulo: r.titulo, texto: r.texto })),
    },
    artigo: ctx.art ? {
      titulo: ctx.art.titulo_artigo, data: ctx.data, dataExtenso: ctx.dataExtenso,
      indice: ctx.secoes.map((s) => `<li><a href="#${slugId(s.h2)}">${esc(s.h2)}</a></li>`).join('') + (ctx.faq.length ? '<li><a href="#perguntas">Perguntas frequentes</a></li>' : ''),
      corpo: ctx.secoes.map((s) => `<h3 id="${slugId(s.h2)}">${esc(s.h2)}</h3>${s.paragrafos.map((t) => `<p>${comLinks(t)}</p>`).join('')}${s.tabela ? tabelaHtml(s.tabela) : ''}`).join('')
        + `<p class="vxp-veja">Veja também: ${ctx.relLinks}. <a href="/">Página inicial da VisionX</a>.</p>`,
    } : null,
    motivos: ctx.motivos.length ? { id: 'motivos', centro: true, olho: 'Diferenciais', h2: `Por que escolher o ${p.nome}`, extra: ctx.motivos.length === 5 ? 'mx-cinco' : '', itens: ctx.motivos.map((m) => ({ icone: ICO(m.titulo), titulo: m.titulo, texto: m.texto })) } : null,
    faq: ctx.faq.length ? { id: 'perguntas', h2: `Perguntas frequentes sobre o ${p.nome}`, seta: SETA_FAQ, itens: ctx.faq } : null,
    ia: {
      id: 'pergunte', h2: 'Quer uma segunda opinião? Pergunte a uma IA.', texto: `Faça a pergunta sobre o ${p.nome} direto no assistente que você já usa:`,
      botoes: [['ChatGPT', `https://chatgpt.com/?q=${ctx.q}`], ['Google IA', `https://www.google.com/search?udm=50&q=${ctx.q}`], ['Perplexity', `https://www.perplexity.ai/search?q=${ctx.q}`]]
        .map(([texto, href]) => ({ texto, href, rel: 'noopener nofollow', target: '_blank' })),
    },
    outros: ctx.outros.length ? {
      id: 'outros', centro: false, olho: ctx.grupoNome, h2: 'Outros produtos da VisionX', extra: 'mx-outros',
      itens: ctx.outros.map((o) => ({ icone: o.iconeSrc ? `<img src="${o.iconeSrc}" alt="" width="40" height="40" loading="lazy">` : `<span class="mx-letra">${esc(o.nome[0])}</span>`, titulo: o.nome, texto: o.resumo, href: `/produtos/${o.slug}/`, rotuloLink: `Conhecer o ${o.nome}` })),
    } : null,
    cta: { h2: `Conheça o ${p.nome}`, texto: p.resumo, botao: acaoLink, link: { texto: 'Falar com a VisionX', href: '/#contato' } },
  };
  return D;
}

function deOrigem(o) {
  return {
    origem: true,
    hero: { ...o.hero, cta: { texto: o.hero.cta }, link2: { texto: o.hero.link2 }, midia: `<picture><img class="hero-image" src="${o.hero.img}" alt="" width="2007" height="1260"></picture>` },
    abas: o.abas,
    cartoes: { ...o.cartoes, link: { ...o.cartoes.link, href: '#' } },
    outros: o.outros, motivos: o.motivos,
    ia: { h2: o.ia.h2, botoes: o.ia.botoes.map((texto) => ({ texto })) },
    cta: { h2: o.cta.h2, botao: { texto: o.cta.botao }, link: { texto: o.cta.link, href: '#' } },
    faq: o.faq,
  };
}

export function render(ctx) {
  if (ctx.modo === 'origem') {
    const D = deOrigem(ctx);
    return [hero(D), abas(D), topicos(D, D.outros, 10), cartoes(D), faixa(D), topicos(D, D.motivos, 15), chamada(D), faq(D)].join('\n');
  }
  const D = dados(ctx);
  return [hero(D), D.abas && abas(D), cartoes(D), D.artigo && artigo(D), D.motivos && topicos(D, D.motivos, 15), D.faq && faq(D), faixa(D), D.outros && topicos(D, D.outros, 10), chamada(D)].filter(Boolean).join('\n');
}
