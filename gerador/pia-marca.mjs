// Identidade visual de cada IA no bloco "Pergunte a uma IA" (regra do Victor, 13/11/2026: "sempre coloque a identidade
// visual de cada IA, em toda e qualquer LP, inclusive o ícone"). Molde: o `.pia` do site.froxbr.com (LP FROX/index.html):
// link `pia-b` com data-ia, ícone oficial da marca (OpenAI, "G" do Google em 4 cores, Perplexity) e a cor da marca em --c.
// Uma fonte só por site: quem gera o bloco chama piaBloco() e quem monta a página põe PIA_CSS uma vez.
// Casar com a identidade do site: as variáveis --pia-* (fundo do botão, texto, apoio, raio, fonte) e a cor do ícone
// que é monocromático (--pia-lg-chatgpt: branco no escuro, preto no claro; --pia-lg-perplexity: turquesa legível no fundo).
const ESCAPE = (s) => String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
const SAI = '<svg class="pia-sai" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" focusable="false"><path d="M7 17 17 7M8 7h9v9"/></svg>';
export const IAS = [
  { id: 'chatgpt', nome: 'ChatGPT', url: 'https://chatgpt.com/?q=', c: '16,163,127', extra: '--l:var(--pia-lg-chatgpt,#fff)',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.2819 9.8211a5.9847 5.9847 0 0 0-.5157-4.9108 6.0462 6.0462 0 0 0-6.5098-2.9A6.0651 6.0651 0 0 0 4.9807 4.1818a5.9847 5.9847 0 0 0-3.9977 2.9 6.0462 6.0462 0 0 0 .7427 7.0966 5.98 5.98 0 0 0 .511 4.9107 6.051 6.051 0 0 0 6.5146 2.9001A5.9847 5.9847 0 0 0 13.2599 24a6.0557 6.0557 0 0 0 5.7718-4.2058 5.9894 5.9894 0 0 0 3.9977-2.9001 6.0557 6.0557 0 0 0-.7475-7.0729zm-9.022 12.6081a4.4755 4.4755 0 0 1-2.8764-1.0408l.1419-.0804 4.7783-2.7582a.7948.7948 0 0 0 .3927-.6813v-6.7369l2.02 1.1686a.071.071 0 0 1 .038.052v5.5826a4.504 4.504 0 0 1-4.4945 4.4944zm-9.6607-4.1254a4.4708 4.4708 0 0 1-.5346-3.0137l.142.0852 4.783 2.7582a.7712.7712 0 0 0 .7806 0l5.8428-3.3685v2.3324a.0804.0804 0 0 1-.0332.0615L9.74 19.9502a4.4992 4.4992 0 0 1-6.1408-1.6464zM2.3408 7.8956a4.485 4.485 0 0 1 2.3655-1.9728V11.6a.7664.7664 0 0 0 .3879.6765l5.8144 3.3543-2.0201 1.1685a.0757.0757 0 0 1-.071 0l-4.8303-2.7865A4.504 4.504 0 0 1 2.3408 7.872zm16.5963 3.8558L13.1038 8.364 15.1192 7.2a.0757.0757 0 0 1 .071 0l4.8303 2.7913a4.4944 4.4944 0 0 1-.6765 8.1042v-5.6772a.79.79 0 0 0-.407-.667zm2.0107-3.0231l-.142-.0852-4.7735-2.7818a.7759.7759 0 0 0-.7854 0L9.409 9.2297V6.8974a.0662.0662 0 0 1 .0284-.0615l4.8303-2.7866a4.4992 4.4992 0 0 1 6.6802 4.66zM8.3065 12.863l-2.02-1.1638a.0804.0804 0 0 1-.038-.0567V6.0742a4.4992 4.4992 0 0 1 7.3757-3.4537l-.142.0805L8.704 5.459a.7948.7948 0 0 0-.3927.6813zm1.0976-2.3654l2.602-1.4998 2.6069 1.4998v2.9994l-2.5974 1.4997-2.6067-1.4997Z"/></svg>' },
  { id: 'google', nome: 'Google IA', url: 'https://www.google.com/search?udm=50&amp;q=', c: '66,133,244', extra: '--d:-1.4s',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path fill="#4285F4" d="M23.49 12.27c0-.79-.07-1.54-.19-2.27H12v4.51h6.47c-.29 1.48-1.14 2.73-2.4 3.58v3h3.86c2.26-2.09 3.56-5.17 3.56-8.82z"/><path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.86-3c-1.08.72-2.45 1.16-4.07 1.16-3.13 0-5.78-2.11-6.73-4.96H1.29v3.09C3.26 21.3 7.31 24 12 24z"/><path fill="#FBBC05" d="M5.27 14.29c-.25-.72-.38-1.49-.38-2.29s.14-1.57.38-2.29V6.62H1.29C.47 8.24 0 10.06 0 12s.47 3.76 1.29 5.38l3.98-3.09z"/><path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.31 0 3.26 2.7 1.29 6.62l3.98 3.09c.95-2.85 3.6-4.96 6.73-4.96z"/></svg>' },
  { id: 'perplexity', nome: 'Perplexity', url: 'https://www.perplexity.ai/search?q=', c: '32,184,205', extra: '--d:-2.8s;--l:var(--pia-lg-perplexity,#20b8cd)',
    svg: '<svg viewBox="0 0 24 24" aria-hidden="true" focusable="false"><path d="M22.3977 7.0896h-2.3106V.0676l-7.5094 6.3542V.1577h-1.1554v6.1966L4.4904 0v7.0896H1.6023v10.3976h2.8882V24l6.932-6.3591v6.2005h1.1554v-6.0469l6.9318 6.1807v-6.4879h2.8882V7.0896zm-3.4657-4.531v4.531h-5.355l5.355-4.531zm-13.2862.0676 4.8691 4.4634H5.6458V2.6262zM2.7576 16.332V8.245h7.8476l-6.1149 6.1147v1.9723H2.7576zm2.8882 5.0404v-3.8852h.0001v-2.6488l5.7763-5.7764v7.0111l-5.7764 5.2993zm12.7086.0248-5.7766-5.1509V9.0618l5.7766 5.7766v6.5588zm2.8882-5.0652h-1.733v-1.9723L13.3948 8.245h7.8478v8.087z"/></svg>' },
];
const logo = (svg) => svg.replace('<svg ', '<svg class="pia-logo" ');

// Os três botões. `objeto` = sobre o que se pergunta (vai no aria-label: "Perguntar ao ChatGPT sobre o FroX (abre em nova aba)").
export function piaBotoes(pergunta, objeto) {
  if (!String(pergunta).trim()) throw new Error('piaBotoes: pergunta vazia');
  const q = encodeURIComponent(pergunta);
  return `<ul class="pia-l">${IAS.map((ia) => `<li><a class="pia-b" href="${ia.url}${q}" target="_blank" rel="noopener nofollow" data-ia="${ia.id}" aria-label="${ESCAPE(`Perguntar ao ${ia.nome} sobre ${objeto} (abre em nova aba)`)}" style="--c:${ia.c};${ia.extra}"><span class="pia-in">${logo(ia.svg)}<span class="pia-nome">${ia.nome}</span>${SAI}</span></a></li>`).join('')}</ul>`;
}

// O bloco inteiro. titulo: 'p' (padrão da casa) ou 'h2'; apoio: linha opcional abaixo do título; extra: classe do contêiner.
export function piaBloco({ pergunta, objeto, titulo = 'Quer uma segunda opinião? Pergunte a uma IA.', apoio = '', tag = 'p', alinha = 'center', classe = '' }) {
  return `<div class="pia${classe ? ' ' + classe : ''}" data-alinha="${alinha}"><${tag} class="pia-t">${titulo}</${tag}>${apoio ? `<p class="pia-ap">${apoio}</p>` : ''}${piaBotoes(pergunta, objeto)}</div>`;
}

// CSS do bloco. `tema` troca só as variáveis (escuro ou claro); o resto é o molde do FroX.
export const PIA_TEMAS = {
  escuro: '--pia-fundo:#101319;--pia-texto:#fafafa;--pia-apoio:rgba(255,255,255,.82);--pia-linha:150,180,255;--pia-raio:12px;--pia-lg-chatgpt:#fff;--pia-lg-perplexity:#20b8cd',
  claro: '--pia-fundo:#fff;--pia-texto:#131313;--pia-apoio:#4a4a4a;--pia-linha:19,19,19;--pia-raio:12px;--pia-lg-chatgpt:#0d0d0d;--pia-lg-perplexity:#1a7f8c;--pia-sombra:0 14px 26px -18px rgba(0,0,0,.45)',
};
export const piaCss = (tema = 'escuro', escopo = '.pia') => `@property --pia-a{syntax:"<angle>";inherits:false;initial-value:0deg}
${escopo}{${PIA_TEMAS[tema]}}
.pia{position:relative;box-sizing:border-box;width:100%;max-width:760px;margin:clamp(28px,4vw,44px) auto 0;padding-top:clamp(24px,3.4vw,36px);display:grid;gap:12px;justify-items:center;text-align:center;font-family:var(--pia-fonte,inherit)}
.pia--solo{margin-top:0;padding-top:0}
.pia--solo::before{display:none}
.pia[data-alinha=start]{margin-inline:0;justify-items:start;text-align:start}
.pia::before{content:"";position:absolute;top:0;left:0;right:0;height:1px;background:linear-gradient(90deg,transparent,rgba(var(--pia-linha),.75) 50%,transparent);pointer-events:none}
.pia[data-alinha=start]::before{background:linear-gradient(90deg,rgba(var(--pia-linha),.75),transparent 85%)}
.pia *,.pia *::before,.pia *::after{box-sizing:border-box}
.pia-t{margin:0;color:var(--pia-texto);font-size:16px;line-height:1.4;font-weight:600;text-wrap:balance;text-align:inherit}
h2.pia-t{font-size:clamp(1.4rem,1.1rem + 1.2vw,2rem);line-height:1.2;letter-spacing:-.02em;font-weight:700}
.pia-ap{margin:0;color:var(--pia-apoio);font-size:16px;line-height:1.5;text-wrap:balance;text-align:inherit}
.pia-l{list-style:none;margin:0;padding:0;display:grid;grid-template-columns:repeat(3,minmax(0,1fr));gap:clamp(8px,1.4vw,14px);width:100%}
.pia-l li{margin:0;padding:0;min-width:0}
.pia-l li::before,.pia-l li::marker{content:none}
.pia-b{display:block;padding:1px;border-radius:var(--pia-raio);background:conic-gradient(from var(--pia-a),transparent 0 58%,rgba(var(--c),.95) 72%,rgba(var(--c),1) 77%,rgba(var(--c),.95) 82%,transparent 94%),rgba(var(--c),.4);box-shadow:var(--pia-sombra,0 16px 30px -18px rgba(0,0,0,.9));color:var(--pia-texto);text-decoration:none;-webkit-tap-highlight-color:transparent;animation:pia-gira 4.2s linear var(--d,0s) infinite;transition:transform .2s cubic-bezier(.22,1,.36,1),box-shadow .2s cubic-bezier(.22,1,.36,1)}
@keyframes pia-gira{to{--pia-a:360deg}}
.pia-in{position:relative;display:flex;align-items:center;justify-content:center;gap:10px;min-height:60px;padding:0 14px;border-radius:max(0px,calc(var(--pia-raio) - 1px));background:radial-gradient(120% 150% at 50% -40%,rgba(var(--c),.26),transparent 62%),radial-gradient(70% 90% at 50% 140%,rgba(var(--c),.14),transparent 70%),var(--pia-fundo);color:var(--pia-texto);font-size:16px;font-weight:600;line-height:1.2;letter-spacing:-.01em;white-space:nowrap}
.pia-logo{flex:none;width:22px;height:22px;fill:currentColor;color:var(--l,#fff)}
.pia-sai{flex:none;width:15px;height:15px;opacity:.6;transition:transform .2s cubic-bezier(.22,1,.36,1),opacity .2s}
.pia-b:active{transform:scale(.98)}
.pia-b:focus-visible{outline:2px solid var(--pia-texto);outline-offset:3px}
@media (hover:hover) and (pointer:fine){.pia-b:hover{transform:translateY(-2px)}.pia-b:hover .pia-sai{opacity:1;transform:translate(2px,-2px)}}
@media (max-width:599px){.pia-in{flex-direction:column;gap:7px;min-height:76px;padding:10px 6px;font-size:14px}.pia-logo{width:24px;height:24px}.pia-sai{position:absolute;top:8px;right:8px;width:12px;height:12px}}
@media (prefers-reduced-motion:reduce){.pia-b{animation:none;background:rgba(var(--c),.5);transition:none}}`;
