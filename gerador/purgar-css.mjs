#!/usr/bin/env node
// Purga do CSS escopado de um molde: fica só a regra cujo seletor (sem estado: hover, focus, ::before...) alcança algum
// elemento em pelo menos uma das páginas de amostra (a prova em modo origem E a página do produto vestida).
// Lógica da purga do provar-molde do clone (marcio-safirion), sem a parte de foto.
//
// uso: node gerador/purgar-css.mjs <cheio.css> --html a.html,b.html --saida <puro.css> [--manter classe,classe]
//   --manter  classes que o JS do molde liga e desliga (a regra delas fica mesmo sem alvo na amostra)
import { readFileSync, writeFileSync } from 'node:fs';
import { createRequire } from 'node:module';
import { homedir, tmpdir } from 'node:os';
import { join } from 'node:path';
import { pathToFileURL } from 'node:url';

const CLONE = join(homedir(), '.jarvis/marcio-safirion/clone');
const req = createRequire(join(CLONE, 'package.json'));
const postcss = req('postcss');
const sp = req('postcss-selector-parser');
const { comNavegador } = await import(pathToFileURL(join(CLONE, 'bin/pagina.mjs')).href);

const args = process.argv.slice(2);
const opc = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const cheio = args[0];
const htmls = (opc('--html', '') || '').split(',').filter(Boolean);
const saida = opc('--saida');
const manter = (opc('--manter', '') || '').split(',').filter(Boolean);
if (!cheio || !htmls.length || !saida) { console.error('uso: node gerador/purgar-css.mjs <cheio.css> --html a.html,b.html --saida <puro.css> [--manter c1,c2]'); process.exit(2); }

const ESTADO = /^:{1,2}(hover|focus|focus-visible|focus-within|active|visited|link|any-link|checked|disabled|enabled|target|target-within|placeholder-shown|invalid|valid|required|optional|read-only|read-write|indeterminate|default|autofill|open|closed|popover-open|modal|fullscreen|playing|paused|user-invalid|user-valid|in-range|out-of-range|before|after|first-line|first-letter|placeholder|selection|marker|backdrop|file-selector-button|cue|-[a-z]+-[\w-]+)$/i;
function testeDoSeletor(sel) {
  try {
    return sp((raiz) => {
      raiz.walkPseudos((p) => { if (p.value.startsWith('::') || ESTADO.test(p.value)) p.remove(); });
      raiz.each((s) => {
        const nos = s.nodes;
        for (let i = 0; i <= nos.length; i++) {
          const fim = i === nos.length || nos[i].type === 'combinator';
          const comecoVazio = (i === 0 || nos[i - 1].type === 'combinator');
          if (fim && comecoVazio && i < nos.length) { s.insertBefore(nos[i], sp.universal()); i++; }
        }
        if (s.last && s.last.type === 'combinator') s.append(sp.universal());
      });
    }).processSync(sel, { lossless: false }).trim() || '*';
  } catch { return null; }
}
const classesDe = (sel) => { const out = []; try { sp((r) => r.walkClasses((c) => { out.push(c.value); })).processSync(sel); } catch { /* seletor estranho */ } return out; };

const texto = readFileSync(cheio, 'utf8');
const arv = postcss.parse(texto);
const regras = [];
arv.walkRules((r) => { if (r.parent?.type === 'atrule' && /keyframes$/i.test(r.parent.name)) return; regras.push(r); });
const testes = regras.map((r) => r.selectors.map(testeDoSeletor));

// amostra: o corpo de cada página, sem script, escondido (a purga só pergunta "existe?")
const corpos = htmls.map((h) => { const t = readFileSync(h, 'utf8'); const m = t.match(/<body[^>]*>([\s\S]*)<\/body>/i); return (m ? m[1] : t).replace(/<script[\s\S]*?<\/script>/gi, ''); });
const arq = join(tmpdir(), `purga-${process.pid}.html`);
writeFileSync(arq, `<!doctype html><html><head><meta charset="utf-8"></head><body><div hidden>${corpos.join('\n')}</div></body></html>`);

const usados = await comNavegador('purgar-css', async (nav) => {
  const ctx = await nav.newContext({ viewport: { width: 1440, height: 900 } });
  try {
    const p = await ctx.newPage();
    await p.goto(pathToFileURL(arq).href, { waitUntil: 'load', timeout: 60000 });
    return await p.evaluate((ts) => ts.map((lista) => lista.some((s) => { if (s == null) return true; try { return !!document.querySelector(s); } catch { return true; } })), testes);
  } finally { await ctx.close().catch(() => {}); }
});

let tiradas = 0;
regras.forEach((r, i) => {
  if (usados[i]) return;
  if (manter.length && classesDe(r.selector).some((c) => manter.includes(c))) return;
  r.remove(); tiradas++;
});
let mudou = true;
while (mudou) { mudou = false; arv.walkAtRules((at) => { if (/^(media|supports|container|layer|document)$/i.test(at.name) && at.nodes && !at.nodes.length) { at.remove(); mudou = true; } }); }
const animadas = new Set();
arv.walkDecls(/^(-webkit-)?animation(-name)?$/i, (d) => { for (const t of d.value.split(/[\s,]+/)) animadas.add(t); });
arv.walkAtRules(/keyframes$/i, (at) => { if (!animadas.has(at.params.trim())) at.remove(); });
const out = arv.toString();
writeFileSync(saida, out);
console.log(`purga: ${tiradas} de ${regras.length} regras sem alvo saíram; ${texto.length} → ${out.length} bytes`);
