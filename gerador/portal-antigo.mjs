// Portal de produtos NO VISUAL ANTIGO da VisionX (céu estrelado, leque de cartões, ciano, rodapé escuro).
// Parte sempre do site/index.html do commit HEAD e troca só texto e seções de conteúdo, para o visual não mudar.
// Os dados vêm de gerador/produtos.mjs.  Uso: node gerador/portal-antigo.mjs
import { execFileSync } from 'node:child_process';
import { writeFileSync, mkdirSync, copyFileSync, existsSync, readFileSync, rmSync } from 'node:fs';
import { dirname, join } from 'node:path';
import { fileURLToPath } from 'node:url';
import { grupos, produtos } from './produtos.mjs';
import { gerarPaginas, versao, HOJE, HOJE_EXTENSO, OFERTAS } from './paginas-produto.mjs';

const RAIZ = join(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = join(RAIZ, 'site');
const URL = 'https://visionxma.com';
const ic = (f) => versao(SITE, '/img/produtos/p/' + (f.endsWith('.svg') ? f : f.replace(/\.[a-z]+$/, '.webp')));
const ORG_ID = URL + '/#organization';
const esc = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const noAr = produtos.filter((p) => p.estado === 'no-ar');
const g = (k) => produtos.filter((p) => p.grupo === k);

let h = execFileSync('git', ['show', 'HEAD:site/index.html'], { cwd: RAIZ, encoding: 'utf8', env: { ...process.env, DEVELOPER_DIR: '/Library/Developer/CommandLineTools' } });
// compacta o espaço em branco fora de <script>/<style>, para os trechos se acharem por texto
const guarda = [];
h = h.replace(/<(script|style)\b[\s\S]*?<\/\1>/g, (m) => { guarda.push(m); return `\u0000${guarda.length - 1}\u0000`; });
h = h.replace(/\s+/g, ' ');
const troca = (de, para, tudo = false) => {
  if (!h.includes(de)) throw new Error('trecho não achado: ' + de.slice(0, 70));
  h = tudo ? h.split(de).join(para) : h.replace(de, () => para);
};
const trocaRe = (re, para) => { if (!re.test(h)) throw new Error('padrão não achado: ' + re); h = h.replace(re, () => para); };

// ---------- cabeça ----------
const TIT = 'VisionX — sistemas de gestão para cada setor do mercado';
const DESC = 'Sistemas de gestão da VisionX para transporte, construção, comércio, hotelaria, agro, saúde, advocacia e marketing, mais ferramentas como PDF sem Cadastro.';
if (DESC.length < 150 || DESC.length > 160) throw new Error('DESC com ' + DESC.length + ' caracteres');
trocaRe(/<title>.*?<\/title>/s, `<title>${TIT}</title>`);
trocaRe(/<meta name="description" content="[^"]*">/, `<meta name="description" content="${esc(DESC)}">`);
trocaRe(/<meta name="keywords" content="[^"]*">/, '<meta name="keywords" content="sistema de gestão, software por setor, gestão de frotas, gestão de obras, PDV, sistema para hotel, gestão rural, VisionX">');
trocaRe(/<meta property="og:title" content="[^"]*">/, `<meta property="og:title" content="${esc(TIT)}">`);
trocaRe(/<meta property="og:description" content="[^"]*">/, `<meta property="og:description" content="${esc(DESC)}">`);
trocaRe(/<meta name="twitter:title" content="[^"]*">/, `<meta name="twitter:title" content="${esc(TIT)}">`);
trocaRe(/<meta name="twitter:description" content="[^"]*">/, `<meta name="twitter:description" content="${esc(DESC)}">`);
const ld = { '@context': 'https://schema.org', '@graph': [
  { '@type': 'Organization', '@id': ORG_ID, name: 'VisionX', url: URL + '/', logo: URL + '/images/brand/visionx-logo.png',
    description: 'Empresa brasileira de software com sistemas de gestão para diversos setores e ferramentas digitais.',
    sameAs: ['https://www.instagram.com/visionx.dev/', 'https://www.linkedin.com/in/visionx-desenvolvedora-de-software-9b23b1373/', 'https://github.com/visionxma'],
    address: { '@type': 'PostalAddress', addressLocality: 'Pedreiras', addressRegion: 'MA', addressCountry: 'BR' },
    contactPoint: { '@type': 'ContactPoint', telephone: '+55-99-98430-4630', contactType: 'customer service', availableLanguage: 'pt-BR' } },
  { '@type': 'WebSite', '@id': URL + '/#site', url: URL + '/', name: 'VisionX', inLanguage: 'pt-BR', publisher: { '@id': ORG_ID } },
  { '@type': 'WebPage', '@id': URL + '/#pagina', url: URL + '/', name: TIT, description: DESC, inLanguage: 'pt-BR', isPartOf: { '@id': URL + '/#site' }, dateModified: HOJE },
  { '@type': 'ItemList', name: 'Produtos da VisionX', itemListElement: produtos.filter((p) => p.grupo !== 'dev').map((p, i) => ({ '@type': 'ListItem', position: i + 1, name: p.nome, url: URL + '/produtos/' + p.slug + '/' })) }
] };
troca('<link rel="stylesheet" href="/custom.css?v=23">', '<link rel="stylesheet" href="/custom.css?v=23">\n<link rel="stylesheet" href="/portal.css?v=1">');

// ---------- navegação ----------
troca('<a href="/services" class="nav_links"> Serviços </a><a href="/about" class="nav_links"> Sobre nós </a><a href="/blog" class="nav_links"> Blog </a>',
  '<a href="/#sistemas" class="nav_links"> Sistemas </a><a href="/#ferramentas" class="nav_links"> Ferramentas </a><a href="/#sobre" class="nav_links"> Sobre </a>');
for (const [href, de, para, novoHref] of [['/services', 'Serviços', 'Sistemas', '/#sistemas'], ['/about', 'Sobre nós', 'Ferramentas', '/#ferramentas'], ['/blog', 'Blog', 'Sobre', '/#sobre']]) {
  troca(`<a href="${href}" class="hamburger-nav__a"> <p class="hamburger-nav__p">${de}</p>`, `<a href="${novoHref}" class="hamburger-nav__a"> <p class="hamburger-nav__p">${para}</p>`);
}

// ---------- hero ----------
trocaRe(/<h1 hero-text data-vx="hero_titulo2" class="text-align-center">.*?<\/h1>/s,
  '<h1 hero-text class="text-align-center">Um sistema de gestão para cada setor.<br><span class="opacity-73">E ferramentas para o dia a dia.</span></h1>');
trocaRe(/<div hero-text data-vx="hero_subtitulo2" class="text-base text-color-on-primary text-align-center">.*?<\/div>/s,
  '<div hero-text class="text-base text-color-on-primary text-align-center">A VisionX cria e opera produtos próprios para transporte, construção, comércio, hotelaria, agro, saúde, advocacia e marketing, além de ferramentas de uso direto e novos produtos a caminho.</div>');
troca('<a href="/services" class="button w-variant-3876fb3c-f589-169e-8f41-073b5a3f3902 w-inline-block">', '<a href="#sistemas" class="button w-variant-3876fb3c-f589-169e-8f41-073b5a3f3902 w-inline-block">');
troca('<div>Ver o que já fizemos</div>', '<div>Ver os produtos</div>');
troca('<div class="text_button">Quero aparecer primeiro</div>', '<div class="text_button">Falar conosco</div>');
// o leque de cartões passa a mostrar telas reais dos produtos
const saas = ['frox', 'construsoft', 'softpay', 'hotelgestao', 'finagro', 'seuplantao', 'advocacia', 'midiamente', 'cortex'];
const reserva = ['construsoft', 'hotelgestao', 'softpay', 'finagro', 'midiamente', 'pdf', 'brasilvisto', 'urnometro', 'seuplantao'];
const fan = ['card', 'card-1', 'card-2', 'card-3', 'card-4', 'card-5', 'card-6', 'card-7', 'card-8'];
fan.forEach((c, i) => {
  const cartao = `/img/cartoes/p/${saas[i]}.webp`;
  const src = existsSync(join(SITE, cartao)) ? versao(SITE, cartao) : `/img/capturas/p/${reserva[i]}.webp`;
  troca(`/images/${c}.avif?v=4`, src, true);
});
trocaRe(/<div class="rating">.*?<\/div> <div class="spacer-xsmall"><\/div> <div class="stars-wrap">.*?<\/div> <\/div>/s,
  `<div class="rating"><div class="text-color-on-primary">${noAr.length} produtos no ar</div></div>`);

// ---------- faixa de logos: ícones dos produtos ----------
const comIcone = produtos.filter((p) => p.icone);
const logos = comIcone.map((p) => `<img src="${ic(p.icone)}" loading="lazy" alt="${esc(p.nome)}" class="logo logo-produto" width="48" height="48">`).join('');
trocaRe(/<section class="section_loop">.*?<\/section>/s, `<section class="section_loop"> <div class="loop"> <div class="loop_logos">${logos}</div> <div class="loop_logos">${logos}</div> </div> </section>`);

// ---------- sobre ----------
const setores = g('gestao').length;
trocaRe(/<div class="title-wrap"> <h2>A<\/h2>.*?<\/div> <\/div> <\/div> <div class="spacer-section-large">/s,
  '<div class="title-wrap"> <h2>Software</h2> <h2>brasileiro</h2> <h2>feito</h2> <h2>para</h2> <h2>cada</h2> <h2>setor</h2> <h2 class="opacity-50">do mercado.</h2> </div> </div> </div> <div class="spacer-section-large">');
troca('<div class="vertical-center"> <div data-reveal class="tag"> <div class="dot-square"></div> <div>Sobre nós</div>', '<div class="vertical-center" id="sobre"> <div data-reveal class="tag"> <div class="dot-square"></div> <div>Sobre a VisionX</div>');
const cartaoNum = (n, rot) => `<div class="text-wrap"> <div fs-numbercount-duration="1100" fs-numbercount-element="number" fs-numbercount-comeca="0" fs-numbercount-end="${n}" class="text-5xl">${n}</div> </div> <div class="spacer-small"></div> <div class="text-weight-medium">${rot}</div>`;
trocaRe(/<div class="about_card-float"> <div class="text-wrap">.*?<\/div> <\/div> <\/div> <\/div> <div class="card_about bg-subtle">.*?<div class="card_about bg-black">.*?<\/div> <\/div> <\/div> <\/div> <\/div> <\/div> <div class="padding-section-large"><\/div> <\/section>/s,
  `<div class="about_card-float"> ${cartaoNum(noAr.length, 'produtos no ar, cada um com página, preço e teste próprios.')} </div> </div> </div>
  <div class="card_about bg-subtle"> <div> ${cartaoNum(setores, 'setores com sistema de gestão: transporte, construção, comércio, hotelaria, agro, saúde, advocacia, marketing e atendimento com IA.')} </div> </div>
  <div class="card_about bg-green height-100"> <div class="vertical-space-between"> <div> ${cartaoNum(g('ferramentas').length, 'ferramentas e plataformas')} </div> <div class="text-base text-weight-medium">Do PDF sem cadastro à apuração da eleição.</div> </div> </div>
  <div class="card_about bg-black"> <div class="card_4-content"> <div class="text-weight-medium text-color-on-primary">Em desenvolvimento</div> <div class="text-wrap text-color-on-primary"> <div fs-numbercount-duration="1000" fs-numbercount-element="number" fs-numbercount-comeca="0" fs-numbercount-end="${g('dev').length}" class="text-4xl">${g('dev').length}</div> </div> </div> </div>
  </div> </div> </div> <div class="padding-section-large"></div> </section>`);

// ---------- produtos (substitui serviços, especialidades, depoimentos, blog e FAQ) ----------
const cartao = (p) => {
  const ico = p.icone ? `<span class="vxp-ico${p.icone.endsWith('.svg') ? ' vxp-ico--svg' : ''}"><img src="${ic(p.icone)}" alt="" loading="lazy" width="48" height="48"></span>` : `<span class="vxp-ico vxp-ico--letra" aria-hidden="true">${esc(p.nome[0])}</span>`;
  const tag = p.estado === 'app' ? '<span class="vxp-et">Aplicativo</span>' : p.estado === 'dev' ? '<span class="vxp-et vxp-et--dev">Em desenvolvimento</span>' : '';
  const corpo = `${ico}<div class="vxp-nome"><h3 class="text-xl">${esc(p.nome)}</h3><span class="vxp-setor">${esc(p.setor)}</span></div>${tag}<p class="vxp-texto">${esc(p.resumo)}</p>`;
  return p.grupo !== 'dev'
    ? `<a class="vxp-card" href="/produtos/${p.slug}/">${corpo}<span class="vxp-ir">Saiba mais <span aria-hidden="true">→</span></span></a>`
    : `<div class="vxp-card is-off">${corpo}</div>`;
};
const bloco = (id, rotulo, titulo, frase, lista, classe = '') => `<section class="section_produtos ${classe}" id="${id}"> <div class="padding-section-large"></div> <div class="padding-global"> <div class="container-large">
  <div class="vertical-center"> <div data-reveal class="tag"> <div class="dot-square"></div> <div>${rotulo}</div> </div> <div class="spacer-large"></div>
  <div data-reveal class="max-width-medium is-41rem"> <h2 class="text-align-center">${titulo}</h2> </div> <div class="spacer-medium"></div>
  <div data-reveal class="max-width-medium"> <div class="text-base text-align-center text-color-secondary">${frase}</div> </div> </div>
  <div class="spacer-section-medium"></div> <div class="vxp-grade">${lista.map(cartao).join('')}</div> </div> </div> <div class="padding-section-large"></div> </section>`;
const novas = [
  bloco('sistemas', grupos.gestao.titulo, 'Cada setor trabalha de um jeito. O sistema acompanha.', grupos.gestao.frase, g('gestao')),
  bloco('ferramentas', grupos.ferramentas.titulo, 'Além da gestão: produtos para usar agora.', grupos.ferramentas.frase, g('ferramentas')),
  bloco('desenvolvimento', grupos.dev.titulo, 'No forno.', grupos.dev.frase, g('dev'), 'is-dev')
].join('\n');
trocaRe(/<section class="section_services">.*?<section class="section_faq" id="perguntas">.*?<\/section>/s, novas);

// ---------- chamada final ----------
trocaRe(/<div class="cta_top">.*?<\/div> <\/div> <div class="spacer-huge"><\/div> <h2 class="text-color-on-primary">/s,
  '<div class="cta_top"> <div class="cta_text"> <div class="text-color-on-primary">Fale com a VisionX</div> </div> </div> <div class="spacer-huge"></div> <h2 class="text-color-on-primary">');
trocaRe(/<h2 class="text-color-on-primary">Enquanto você decide,.*?<\/h2>/s, '<h2 class="text-color-on-primary">Quer conhecer ou usar<br>algum dos sistemas?</h2>');
trocaRe(/<div class="text-color-on-primary">Cada dia sem site e sem anúncio.*?<\/div>/s, '<div class="text-color-on-primary">Dúvida sobre um produto, parceria ou proposta: escreva e retornamos em breve.</div>');
troca('<div class="text_button">Quero aparecer primeiro</div>', '<div class="text_button">Falar com a VisionX</div>');

// ---------- rodapé ----------
troca('Site, sistema de gestão e anúncios no Google para quem cansou de perder cliente para o concorrente.', 'Sistemas de gestão para cada setor do mercado e ferramentas digitais, feitos em Pedreiras, Maranhão.');
troca('<a href="/services" class="footer_link w-inline-block"> <div>Serviços</div> </a><a href="/about" class="footer_link w-inline-block"> <div>Sobre nós</div> </a>',
  '<a href="/#sistemas" class="footer_link w-inline-block"> <div>Sistemas</div> </a><a href="/#ferramentas" class="footer_link w-inline-block"> <div>Ferramentas</div> </a>');
troca('<a href="/blog" class="footer_link w-inline-block"> <div>Blog</div> </a>', '<a href="/#sobre" class="footer_link w-inline-block"> <div>Sobre</div> </a>');

h = h.replaceAll(' class="image3d">', ' class="image3d" width="512" height="512">');
troca(' · CNPJ 61.427.918/0001-06', '');
troca('<div class="text-sm">Termos de serviço</div> </a>', '<div class="text-sm">Termos de serviço</div> </a> <a href="/llms.txt" class="footer_bottom-link w-inline-block"> <div class="text-sm">llms.txt</div> </a>');

// o conteúdo agora é fixo no HTML: os rótulos que o painel antigo sobrescrevia saem
h = h.replace(/ data-vx(-num|-img)?="[^"]*"/g, '');
h = h.replace(/\u0000(\d+)\u0000/g, (_, i) => guarda[+i]);
trocaRe(/<script type="application\/ld\+json">\{"@context": "https:\/\/schema\.org", "@graph".*?<\/script>/s, `<script type="application/ld+json">${JSON.stringify(ld)}</script>`);
trocaRe(/<script type="application\/ld\+json">\s*\{\s*"@context": "https:\/\/schema\.org",\s*"@type": "FAQPage".*?<\/script>/s, '');
troca('<script src="/assets/vx-offer.js?v=2" defer></script>', '');

mkdirSync(SITE, { recursive: true });

// ---------- estilo dos cartões, no tom do site antigo ----------
writeFileSync(join(SITE, 'portal.css'), `/* Cartões de produto: mesma linguagem do site antigo (branco, cantos 1rem, ciano var(--base--green), rótulos em fonte alternativa). */
.section_produtos { background: #f2f2f2; color: #131313; }
.section_produtos.is-dev { background: #fff; }
.vxp-grade { display: grid; grid-template-columns: minmax(0, 1fr); gap: .75rem; }
/* cartão na horizontal: logo à esquerda ocupando a altura do texto, texto à direita */
.vxp-card { position: relative; display: grid; grid-template-columns: 3.5rem minmax(0, 1fr); column-gap: .9rem; row-gap: .3rem; align-content: start; align-items: start; min-width: 0; height: 100%; padding: .9rem; border-radius: 1rem; background: #fff; color: #131313; text-decoration: none; border: 1px solid #ececec;
  transition: transform .3s cubic-bezier(.19, 1, .22, 1), box-shadow .3s cubic-bezier(.19, 1, .22, 1), border-color .2s; }
.vxp-card:active { transform: scale(.985); }
.vxp-card.is-off { background: transparent; border: 1px dashed #c7c7c7; }
.vxp-ico { display: grid; place-items: center; width: 3.5rem; height: 3.5rem; grid-row: 1 / span 4; border-radius: .75rem; background: #fff; overflow: clip; box-shadow: 0 0 0 1px rgba(0,0,0,.07); }
.vxp-ico img { width: 100%; height: 100%; object-fit: cover; }
.vxp-ico--svg img { width: 70%; height: 70%; object-fit: contain; }
.vxp-ico--letra { background: #131313; color: var(--base--green, #00d4ff); font-weight: 800; font-size: 1.4rem; box-shadow: none; }
.vxp-nome h3 { margin: 0; line-height: 1.15; }
.vxp-setor { display: block; margin-top: .25rem; font-family: var(--_typography---font-family--alternate); font-size: .6875rem; letter-spacing: .1em; text-transform: uppercase; color: #585858; line-height: 1.3; }
.vxp-texto { display: block; margin: 0; letter-spacing: normal; text-transform: none; font-size: .9375rem; line-height: 1.45; color: #585858; }
.vxp-et { display: inline-flex; align-items: center; width: fit-content; min-height: 1.5rem; padding: .1rem .6rem; border-radius: 5rem; background: #131313; color: var(--base--green, #00d4ff); font-family: var(--_typography---font-family--alternate); font-size: .6875rem; letter-spacing: .08em; text-transform: uppercase; }
.vxp-ir { margin-top: auto; display: inline-flex; align-items: center; gap: .3rem; min-height: 44px; font-family: var(--_typography---font-family--alternate); font-size: .75rem; letter-spacing: .1em; text-transform: uppercase; font-weight: 600; color: #131313; }
.vxp-ir::after { content: ""; flex: 1; }
.vxp-card > :not(.vxp-ico) { grid-column: 2; min-width: 0; }
.vxp-card.is-off { padding-bottom: 1rem; }
@media (hover: hover) and (pointer: fine) {
  a.vxp-card:hover { transform: translateY(-4px); border-color: var(--base--green, #00d4ff); box-shadow: 0 18px 30px -18px rgba(0,0,0,.3); }
}
.logo-produto { height: 3rem; width: 3rem; border-radius: .75rem; object-fit: cover; background: #fff; }
.rating { text-align: center; }
/* alvos de toque de 44px que o site antigo deixava menores (logo da barra e links legais do rodapé) */
.image3d { height: auto; } /* o atributo height das imagens do leque não pode desfazer o aspect-ratio:1 */
.navbar_logo-link, .footer_bottom-link { min-height: 44px; display: inline-flex; align-items: center; }
/* ---- páginas de produto com artigo ---- */
.vxp-trilha { display: flex; flex-wrap: wrap; align-items: center; gap: .4rem; margin-bottom: 1rem; font-family: var(--_typography---font-family--alternate); font-size: .6875rem; letter-spacing: .1em; text-transform: uppercase; color: #585858; }
.vxp-trilha a { color: inherit; text-decoration: none; min-height: 44px; display: inline-flex; align-items: center; }
.vxp-logo { background: #fff; box-shadow: 0 0 0 1px rgba(0,0,0,.08); overflow: clip; }
.vxp-logo img { width: 100%; height: 100%; object-fit: cover; }
.vxp-logo--letra { background: #131313; color: var(--base--green, #00d4ff); font-weight: 800; font-size: 1.6rem; box-shadow: none; }
.vxp-oferta { margin: 1rem 0 0; font-weight: 600; color: #131313; }
.hero-service_right { display: grid; place-items: center; padding: 1rem; }
.vxp-hero-img { width: auto; max-width: 100%; height: auto; max-height: min(78svh, 640px); aspect-ratio: 1 / 1; object-fit: contain; border-radius: 1.25rem; box-shadow: 0 30px 60px -30px rgba(0,0,0,.35); }
.vxp-sec { padding: 2.5rem 0; background: #fff; color: #131313; }
.vxp-sec--claro { background: #f2f2f2; }
.vxp-recursos { list-style: none; margin: 0; padding: 0; display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: .75rem; }
.vxp-recursos li { padding: .9rem; background: #fff; border: 1px solid #ececec; border-radius: 1rem; }
.vxp-recursos h3 { margin: 0 0 .35rem; font-size: 1.0625rem; line-height: 1.2; }
.vxp-recursos p { margin: 0; color: #585858; font-size: .9375rem; line-height: 1.45; display: none; }
.vxp-artigo-grade { display: grid; grid-template-columns: minmax(0, 1fr); gap: 2rem; }
.vxp-toc { display: none; }
.vxp-artigo { max-width: 46rem; }
.vxp-artigo h2 { margin: 1rem 0 .4rem; }
.vxp-artigo h3 { margin: 2rem 0 0; scroll-margin-top: 6rem; }
.vxp-artigo p { max-width: 66ch; margin: .9rem 0 0; line-height: 1.65; color: #2f2f2f; }
.vxp-artigo .vxp-meta { margin: 0 0 1rem; color: #585858; font-size: .875rem; }
.vxp-veja { padding-top: 1rem; border-top: 1px solid #ececec; }
.vxp-veja a { text-decoration: underline; }
.vxp-faq { max-width: 46rem; margin-inline: auto; }
.vxp-faq details { border-bottom: 1px solid #dcdcdc; }
.vxp-faq summary { display: flex; align-items: center; min-height: 48px; padding: .6rem 0; font-weight: 600; cursor: pointer; list-style: none; }
.vxp-faq summary::-webkit-details-marker { display: none; }
.vxp-faq summary::after { content: "+"; margin-left: auto; padding-left: 1rem; font-size: 1.4rem; transition: transform .2s; }
.vxp-faq details[open] summary::after { transform: rotate(45deg); }
.vxp-faq details p { margin: 0; padding-bottom: 1rem; color: #585858; line-height: 1.6; }
.vxp-ia { text-align: center; }
.vxp-ia h2 { font-size: clamp(1.4rem, 1.1rem + 1.2vw, 2rem); }
.vxp-ia p { margin: .75rem auto 1.25rem; color: #585858; }
.vxp-ia-botoes { display: flex; flex-wrap: wrap; justify-content: center; gap: .75rem; }
@media (min-width: 38rem) { .vxp-sec { padding: 3.5rem 0; } .vxp-recursos { grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 1rem; } .vxp-recursos p { display: block; } }
@media (min-width: 64rem) { .vxp-sec { padding: 4.5rem 0; } .vxp-artigo-grade { grid-template-columns: 15rem minmax(0, 1fr); gap: 3rem; } .vxp-toc { display: block; position: sticky; top: 6rem; align-self: start; font-size: .9375rem; } .vxp-toc strong { display: block; margin-bottom: .6rem; font-family: var(--_typography---font-family--alternate); font-size: .6875rem; letter-spacing: .1em; text-transform: uppercase; color: #585858; } .vxp-toc ol { margin: 0; padding-left: 1.1rem; display: grid; gap: .4rem; letter-spacing: normal; text-transform: none; font-family: inherit; line-height: 1.35; } .vxp-toc a { color: #2f2f2f; text-decoration: none; display: inline-block; padding-block: .15rem; } }
@media (min-width: 38rem) {
  .vxp-grade { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 1rem; }
}
@media (min-width: 64rem) { .vxp-grade { grid-template-columns: repeat(3, minmax(0, 1fr)); } .vxp-card { padding: 1.1rem; column-gap: 1rem; } }
`);

// ---------- tudo que depende do CSS pronto ----------
h = h.replace('/portal.css?v=1', versao(SITE, '/portal.css'));
writeFileSync(join(SITE, 'index.html'), h);

// páginas de produto com artigo (molde: topo e rodapé da própria home, para o visual ser o mesmo)
const iMain = h.indexOf('<main class="main-wrapper">'), fMain = h.indexOf('</main>') + 7;
const footerHtml = h.slice(h.indexOf('<footer'), h.indexOf('</footer>') + 9);
if (existsSync(join(SITE, 'produtos'))) rmSync(join(SITE, 'produtos'), { recursive: true });
const { paginas, avisos } = gerarPaginas({ topo: h.slice(0, iMain), rodape: h.slice(fMain), footerHtml, produtos, siteDir: SITE, gerDir: join(RAIZ, 'gerador'), ic, ORG_ID });
for (const pg of paginas) { mkdirSync(join(SITE, pg.caminho), { recursive: true }); writeFileSync(join(SITE, pg.caminho, 'index.html'), pg.html); }


// ---------- páginas estáticas herdadas (contato, privacidade, termos) ----------
for (const [caminho, desc] of [['/contact/', null], ['/privacidade/', null], ['/termos/', 'Termos de Serviço da VisionX: condições de uso do site e dos produtos de software da empresa.']]) {
  const f = join(SITE, caminho, 'index.html'); let t = readFileSync(f, 'utf8');
  if (desc) t = t.replace(/(<meta name="description" content=")[^"]*(")/, `$1${desc}$2`);
  const titulo = (t.match(/<title>(.*?)<\/title>/s) || [])[1]; const d = (t.match(/<meta name="description" content="([^"]*)"/) || [])[1];
  t = t.replace(/<meta property="og:image" content="[^"]*">/, `<meta property="og:image" content="${URL}/img/og/visionx.png">`).replace(/<meta name="twitter:image" content="[^"]*">/, `<meta name="twitter:image" content="${URL}/img/og/visionx.png">`);
  if (!t.includes('property="og:title"')) t = t.replace(/(<meta name="description"[^>]*>)/, `$1\n<meta property="og:type" content="website"><meta property="og:locale" content="pt_BR"><meta property="og:site_name" content="VisionX">\n<meta property="og:title" content="${esc(titulo)}"><meta property="og:description" content="${esc(d)}"><meta property="og:url" content="${URL}${caminho}"><meta property="og:image" content="${URL}/img/og/visionx.png">\n<meta name="twitter:card" content="summary_large_image"><meta name="twitter:title" content="${esc(titulo)}"><meta name="twitter:description" content="${esc(d)}"><meta name="twitter:image" content="${URL}/img/og/visionx.png">`);
  t = t.replace(/\s*·\s*CNPJ 61\.427\.918\/0001-06/, '');
  t = t.replace('uma empresa de soluções digitais que oferece serviços de <strong>Sistemas, Sites e Marketing</strong>.', 'uma empresa de software que desenvolve e opera <strong>sistemas de gestão e ferramentas digitais</strong>.');
  if (!t.includes('href="/llms.txt"') && t.includes('</footer>') && !t.includes('footer_bottom-links')) t = t.replace('</footer>', ' · <a href="/llms.txt">llms.txt</a></footer>');
  if (!t.includes('href="/llms.txt"')) t = t.replace(/(<div class="text-sm">Termos de serviço<\/div>\s*<\/a>)/, '$1 <a href="/llms.txt" class="footer_bottom-link w-inline-block"> <div class="text-sm">llms.txt</div> </a>');
  t = t.replaceAll('/services', '/#sistemas').replaceAll('href="/about"', 'href="/#sobre"').replaceAll('href="/blog"', 'href="/#sobre"');
  writeFileSync(f, t);
}

// ---------- sitemap, llms, robots, 404 ----------
const urls = ['/', '/contact/', '/privacidade/', '/termos/', ...paginas.map((p) => p.caminho)];
writeFileSync(join(SITE, 'sitemap.xml'), `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls.map((u) => `  <url><loc>${URL}${u}</loc><lastmod>${HOJE}</lastmod></url>`).join('\n')}\n</urlset>\n`);

const linhaProduto = (p) => `- [${p.nome}](${p.grupo === 'dev' ? URL + '/' : URL + '/produtos/' + p.slug + '/'}) (${p.setor}): ${p.resumo}${OFERTAS[p.slug] ? ' Preço: ' + OFERTAS[p.slug].texto + '.' : ''}${p.grupo === 'dev' ? ' Em desenvolvimento.' : ''}`;
writeFileSync(join(SITE, 'llms.txt'), `# VisionX — sistemas de gestão para cada setor
> A VisionX é uma empresa brasileira de software, com sede em Pedreiras, Maranhão. Desenvolve e opera produtos próprios: sistemas de gestão para diversos setores e ferramentas de uso direto. Cada produto tem página, artigo e teste próprios.

## O que a VisionX não é
- Não é agência nem revenda de site pronto: o portal apresenta produtos de software próprios.

## Sistemas de gestão
${g('gestao').map(linhaProduto).join('\n')}

## Ferramentas e plataformas
${g('ferramentas').map(linhaProduto).join('\n')}

## Em desenvolvimento
${g('dev').map(linhaProduto).join('\n')}

## Institucional
- [Contato](${URL}/contact/): formulário e WhatsApp (99) 98430-4630
- [Política de privacidade](${URL}/privacidade/)
- [Termos de serviço](${URL}/termos/)
- [Texto completo do site](${URL}/llms-full.txt)

Atualizado em ${HOJE_EXTENSO}.
`);
writeFileSync(join(SITE, 'llms-full.txt'), `# VisionX — texto completo do site\n\nAtualizado em ${HOJE_EXTENSO}.\n\n` + paginas.map((pg) => {
  const art = pg.art;
  return `## ${pg.nome}\nEndereço: ${URL}${pg.caminho}\n${art ? `\n${art.lede}\n\n${art.secoes.map((s) => `### ${s.h2}\n${s.paragrafos.join('\n\n')}`).join('\n\n')}\n\n### Perguntas frequentes\n${art.faq.map((f) => `**${f.p}**\n${f.r}`).join('\n\n')}\n` : ''}`;
}).join('\n---\n\n'));

const robotsAI = ['Googlebot', 'Bingbot', 'GPTBot', 'OAI-SearchBot', 'ChatGPT-User', 'PerplexityBot', 'ClaudeBot', 'Claude-SearchBot', 'Google-Extended', 'Applebot', 'DuckDuckBot', 'YandexBot', 'CCBot'];
writeFileSync(join(SITE, 'robots.txt'), `# Busca e assistentes de IA liberados: a resposta da IA é descoberta tão real quanto a busca.\n${robotsAI.map((b) => `User-agent: ${b}\nAllow: /\n`).join('\n')}\nUser-agent: *\nAllow: /\nDisallow: /api/\nDisallow: /admin\n\nSitemap: ${URL}/sitemap.xml\n`);

writeFileSync(join(SITE, '404.html'), h.slice(0, iMain).replace(/<title>.*?<\/title>/s, '<title>Página não encontrada | VisionX</title>').replace(/<link rel="canonical"[^>]*>/, '<meta name="robots" content="noindex, follow">') + `<main class="main-wrapper"><section class="vxp-sec" style="min-height:70svh;display:grid;align-items:center"><div class="padding-global"><div class="container-large vertical-center"><h1 class="text-4xl">Página não encontrada</h1><div class="spacer-medium"></div><p class="text-base text-color-secondary">O endereço não existe. Veja os produtos da VisionX.</p><div class="spacer-large"></div><a class="button" href="/"><div class="text-button-wrap"><div>Voltar ao início</div></div></a></div></div></section>` + footerHtml + `</main>` + h.slice(fMain));

console.log(`ok: home + ${paginas.length} páginas de produto, ${produtos.length} produtos`);
for (const a of avisos) console.log('AVISO ' + a);
