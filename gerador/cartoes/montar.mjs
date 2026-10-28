// Cartões de produto montados em HTML (sem IA generativa): fonte real de cada app, título real do site, trecho real da tela e o Instagram escrito por código.
// Uso: node gerador/cartoes/montar.mjs <pasta-de-capturas-2x> <pasta-de-saida>      (gera <slug>.png de 1254x1254 com o Chrome sem janela)
import { writeFileSync, mkdirSync, existsSync, copyFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { dirname, join, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const AQUI = dirname(fileURLToPath(import.meta.url));
const CAP = resolve(process.argv[2] || join(AQUI, 'capturas2x'));
const SAIDA = resolve(process.argv[3] || join(AQUI, 'saida'));
const ICONES = resolve(AQUI, '..', '..', 'site', 'img', 'produtos');
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
mkdirSync(SAIDA, { recursive: true });

const IG = '<svg viewBox="0 0 24 24" width="1em" height="1em" fill="none" stroke="currentColor" stroke-width="2" aria-hidden="true"><rect x="3" y="3" width="18" height="18" rx="5.5"/><circle cx="12" cy="12" r="4.2"/><circle cx="17.3" cy="6.7" r="1.2" fill="currentColor" stroke="none"/></svg>';

// crop = [x, y, largura, altura] em pixels da captura de 1440 de largura (a captura real tem o dobro)
const cartoes = [
  { slug: 'frox', nome: 'FroX', icone: 'frox.png', fonte: 'Montserrat', pesoNome: 800, bg: '#ffffff', tinta: '#111111', suave: '#555555', cor: '#d00a24', insta: '@froxbr', dominio: 'froxbr.com',
    titulo: 'Seu primeiro caminhão organizado.', destaque: 'organizado.', sub: 'Registre viagens, receitas e despesas. Plano Grátis para 1 caminhão.', shot: { arq: 'frox', crop: [800, 320, 540, 400], larg: 470 } },
  { ink: '#06182f', slug: 'softpay', nome: 'SoftPay', icone: 'softpay.webp', fonte: 'Poppins', pesoNome: 700, bg: 'linear-gradient(160deg,#0d3b82 0%,#091f48 100%)', tinta: '#ffffff', suave: '#c7d6f0', cor: '#4cb6ff', insta: '@softpaybr', dominio: 'softpaybr.com',
    titulo: 'Mais vendas. Menos planilha. Tudo em um só lugar.', destaque: 'Tudo em um só lugar.', lista: ['PDV, estoque e financeiro no mesmo lugar', 'Vitrine online para vender pelo celular', 'Pix, maquininha e nota fiscal integrados'] },
  { ink: '#1a0f02', slug: 'construsoft', nome: 'ConstruSoft', icone: 'construsoft.png', fonte: 'Montserrat', pesoNome: 800, bg: 'linear-gradient(160deg,#1c1f26 0%,#0f1116 100%)', tinta: '#ffffff', suave: '#c4c8d0', cor: '#f08a24', insta: '@construsoft', dominio: 'construsoftbr.com',
    titulo: 'Toda a sua obra sob controle.', destaque: 'obra', sub: 'Orçado, gasto, recebido e lucro de cada obra, em tempo real. Parcelas com recibo em PDF e despesas com nota anexada.', lista: ['14 dias grátis, sem cartão de crédito', 'Cancela quando quiser'] },
  { ink: '#032320', slug: 'seuplantao', nome: 'Seu Plantão', icone: 'seuplantao.png', fonte: '-apple-system, "SF Pro Display", system-ui, sans-serif', pesoNome: 700, bg: 'linear-gradient(160deg,#0b2a28 0%,#061816 100%)', tinta: '#ffffff', suave: '#a8c3bf', cor: '#2dd4bf', insta: '@seuplantao.app', dominio: 'seuplantao.app',
    titulo: 'O controle dos seus plantões, sem planilha', destaque: 'sem planilha', shot: { arq: 'seuplantao', crop: [360, 400, 720, 380] } },
  { ink: '#2a1205', slug: 'hotelgestao', nome: 'HotelGestão', icone: 'hotelgestao.svg', fonte: '"Wix Madefor Display"', pesoNome: 800, bg: 'linear-gradient(160deg,#4a2a18 0%,#2b160b 100%)', tinta: '#ffffff', suave: '#e6cdb8', cor: '#f39a4a', dominio: 'hotelgestao.com.br',
    titulo: 'Seu hotel sem caderno, sem planilha e sem reserva em dobro.', destaque: 'sem reserva em dobro.', tam: 64, shot: { arq: 'hotelgestao', crop: [250, 560, 1000, 340] } },
  { ink: '#06200a', slug: 'finagro', nome: 'Finagro', icone: 'finagro.png', fonte: 'Outfit', pesoNome: 800, bg: 'linear-gradient(160deg,#0f2a14 0%,#07120a 100%)', tinta: '#ffffff', suave: '#b6d3b9', cor: '#46e046', insta: '@finagro.app', dominio: 'finagro.app',
    titulo: 'Sua fazenda na palma da mão', destaque: 'palma da mão', shot: { arq: 'finagro', crop: [900, 120, 360, 680], retrato: true } },
  { ink: '#231a05', slug: 'advocacia', nome: 'MeuEscritório', icone: 'advocacia.png', fonte: 'Montserrat', pesoNome: 800, bg: 'linear-gradient(160deg,#1d170c 0%,#100c06 100%)', tinta: '#ffffff', suave: '#d3c9b2', cor: '#d9b44f', dominio: 'saasadvocacia.pages.dev',
    titulo: 'Seu escritório inteiro, sem perder um prazo.', destaque: 'sem perder um prazo.', sub: 'Clientes, processos, agenda, protocolos, financeiro e documentos em um só lugar.', lista: ['7 dias grátis, sem cartão de crédito'] },
  { slug: 'midiamente', nome: 'Mídiamente', icone: 'midiamente.png', fonte: 'Montserrat', pesoNome: 800, bg: 'linear-gradient(160deg,#ffffff 0%,#fde8ea 100%)', tinta: '#111111', suave: '#555555', cor: '#d62324', dominio: 'midiamente.app',
    titulo: 'O cérebro da sua agência.', destaque: 'agência.', sub: 'CRM, projetos, clientes, financeiro e inteligência artificial trabalhando juntos.', shot: { arq: 'midiamente', crop: [730, 268, 560, 480] } },
  { slug: 'cortex', nome: 'CorteX', icone: 'cortex.png', fonte: 'Outfit', pesoNome: 800, bg: '#f4f4ef', tinta: '#111111', suave: '#555555', cor: '#111111', dominio: 'cortexvs.com',
    titulo: 'Atendimento e vendas por inteligência artificial.', destaque: 'inteligência artificial.', sub: 'Da primeira mensagem à conversão.', lista: ['Memória do cliente', 'Agentes especializados'] }
];

const FONTES = `
@font-face{font-family:Montserrat;font-weight:600;src:url(fontes/montserrat-600.woff2)}
@font-face{font-family:Montserrat;font-weight:800;src:url(fontes/montserrat-800.woff2)}
@font-face{font-family:Poppins;font-weight:600;src:url(fontes/poppins-600.woff2)}
@font-face{font-family:Poppins;font-weight:700;src:url(fontes/poppins-700.woff2)}
@font-face{font-family:Outfit;font-weight:600;src:url(fontes/outfit-600.woff2)}
@font-face{font-family:Outfit;font-weight:800;src:url(fontes/outfit-800.woff2)}
@font-face{font-family:"Wix Madefor Display";font-weight:700;src:url(fontes/wix-madefor-display-700.woff2)}
@font-face{font-family:"Wix Madefor Display";font-weight:800;src:url(fontes/wix-madefor-display-800.woff2)}
@font-face{font-family:"Wix Madefor Text";font-weight:500;src:url(fontes/wix-madefor-text-500.woff2)}`;

const esc = (s) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;');
for (const c of cartoes) {
  const peso = c.fonte.includes('apple') ? 700 : 600;
  const tam = c.tam || (c.titulo.length > 46 ? 66 : 80);
  const tituloHtml = esc(c.titulo).replace(esc(c.destaque), `<em>${esc(c.destaque)}</em>`);
  let shot = '';
  if (c.shot) {
    const [x, y, w, h] = c.shot.crop; const larg = c.shot.larg || (c.shot.retrato ? 372 : 872); const k = larg / w;
    shot = `<div class="shot${c.shot.retrato ? ' retrato' : ''}" style="width:${larg}px;height:${Math.round(h * k)}px;background-image:url('capturas/${c.shot.arq}.png');background-size:${Math.round(1440 * k)}px ${Math.round(900 * k)}px;background-position:-${Math.round(x * k)}px -${Math.round(y * k)}px"></div>`;
  }
  const lista = (c.lista || []).map((t) => `<li>${esc(t)}</li>`).join('');
  const rodape = c.insta ? `<span class="ig">${IG}<b>${c.insta}</b></span><span class="dom">${c.dominio}</span>` : `<span class="dom solo">${c.dominio}</span>`;
  const html = `<!doctype html><meta charset="utf-8"><style>${FONTES}
*{box-sizing:border-box;margin:0}html,body{width:1000px;height:1000px;overflow:hidden}
body{background:${c.bg};color:${c.tinta};font-family:${c.fonte},system-ui,sans-serif;position:relative;padding:60px 64px 0;display:flex;flex-direction:column}
.topo{display:flex;align-items:center;gap:20px}.topo img{width:84px;height:84px;border-radius:20px;background:#fff;object-fit:cover;box-shadow:0 0 0 1px rgba(0,0,0,.08)}
.topo b{font-size:40px;font-weight:${c.pesoNome};letter-spacing:-.01em}
h1{margin-top:38px;font-size:${tam}px;line-height:1.05;font-weight:800;letter-spacing:-.025em;max-width:880px}h1 em{font-style:normal;color:${c.cor}}
p.sub{margin-top:26px;font-size:30px;line-height:1.4;font-weight:${peso === 700 ? 500 : 600};color:${c.suave};max-width:820px}
ul{margin-top:26px;list-style:none;padding:0;display:grid;gap:12px}li{font-size:29px;font-weight:${peso};color:${c.tinta};display:flex;gap:14px;align-items:baseline}li:before{content:"";flex:none;width:14px;height:14px;border-radius:50%;background:${c.cor};transform:translateY(-2px)}
.meio{flex:1;display:flex;justify-content:center;align-items:flex-start;margin-top:40px;overflow:hidden}
.shot{border-radius:26px 26px 0 0;box-shadow:0 0 0 1px rgba(128,128,128,.25),0 30px 60px -20px rgba(0,0,0,.45);background-repeat:no-repeat;background-color:#fff}
.shot.retrato{border-radius:44px 44px 0 0}
.rodape{height:112px;margin:0 -64px;padding:0 64px;display:flex;align-items:center;justify-content:space-between;background:${c.cor};color:${c.ink || '#fff'};font-size:34px}
.rodape .ig{display:flex;align-items:center;gap:14px;font-size:40px}.rodape .ig b{font-size:34px;font-weight:${peso}}.rodape .dom{font-size:27px;font-weight:${peso};opacity:.92}
.rodape .solo{margin-left:auto}
</style>
<body><div class="topo"><img src="${ICONES}/${c.icone}" alt=""><b>${esc(c.nome)}</b></div>
<h1>${tituloHtml}</h1>${c.sub ? `<p class="sub">${esc(c.sub)}</p>` : ''}${lista ? `<ul>${lista}</ul>` : ''}
<div class="meio">${shot}</div>
<div class="rodape">${rodape}</div></body>`;
  writeFileSync(join(SAIDA, `${c.slug}.html`), html);
}
// pastas de apoio ao lado do HTML
for (const [de, para] of [[join(AQUI, 'fontes'), join(SAIDA, 'fontes')], [CAP, join(SAIDA, 'capturas')]]) {
  if (!existsSync(para)) execFileSync('ln', ['-s', de, para]);
}
for (const c of cartoes) {
  execFileSync('nice', ['-n', '10', CHROME, '--headless=new', '--disable-gpu', '--hide-scrollbars', '--no-first-run', '--allow-file-access-from-files', '--user-data-dir=/tmp/vx-cartoes', '--force-device-scale-factor=1.254', '--window-size=1000,1000', '--virtual-time-budget=8000', `--screenshot=${join(SAIDA, c.slug + '.png')}`, `file://${join(SAIDA, c.slug + '.html')}`], { stdio: 'ignore' });
  console.log('ok', c.slug);
}
