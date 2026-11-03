#!/usr/bin/env node
// Seções da referência que caem depois dos 16.000 px da foto inteira (limite do Chrome numa captura só) ficavam
// "sem altura para comparar" na prova. Este script abre o RETRATO do DOM que a captura guardou (pagina.html, com
// <base> apontando para a referência), acha os blocos do mesmo jeito que o capturar.mjs, e fotografa cada bloco
// que passa dos 16.000 px numa foto própria: <captura>/secoes-png/<L>-<idx>.png. O provar-molde usa essa foto
// quando a seção não cabe em ref-<L>.png.
//
// uso: node gerador/cauda-da-captura.mjs <pasta-da-captura> [--larguras 390]
// Confere antes de gravar: a altura do bloco no retrato tem de bater com secoes-<L>.json (tolerância de 2%).
import { readFileSync, mkdirSync, existsSync } from 'node:fs';
import { join, resolve } from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL } from 'node:url';

const CLONE_BIN = join(homedir(), '.jarvis/marcio-safirion/clone/bin');
const args = process.argv.slice(2);
const cap = args[0] ? resolve(args[0].replace(/^~/, homedir())) : '';
const iL = args.indexOf('--larguras');
const larguras = (iL >= 0 ? args[iL + 1] : '390').split(',').map(Number).filter(Boolean);
if (!cap || !existsSync(join(cap, 'pagina.html'))) { console.error('uso: node gerador/cauda-da-captura.mjs <pasta-da-captura> [--larguras 390]'); process.exit(2); }
const TETO = 16000;
const { comNavegador, novoContexto, prepararPagina } = await import(pathToFileURL(join(CLONE_BIN, 'pagina.mjs')).href);
mkdirSync(join(cap, 'secoes-png'), { recursive: true });
let erro = 0;
await comNavegador('cauda-da-captura', async (nav) => {
  for (const L of larguras) {
    const esperadas = JSON.parse(readFileSync(join(cap, `secoes-${L}.json`), 'utf8')).filter((s) => s.y + s.altura > TETO);
    if (!esperadas.length) { console.log(`${L}px: nenhuma seção passa de ${TETO}px`); continue; }
    const ctx = await novoContexto(nav, L);
    try {
      const p = await ctx.newPage();
      await p.route(/\.(woff2?|ttf|otf)(\?|#|$)/i, async (route) => {
        try { const r = await route.fetch(); await route.fulfill({ response: r, headers: { ...r.headers(), 'access-control-allow-origin': '*' } }); }
        catch { await route.continue().catch(() => {}); }
      });
      await prepararPagina(p, pathToFileURL(join(cap, 'pagina.html')).href, { bloquear: false });
      const blocos = await p.evaluate(() => {
        const raiz = document.querySelector('main') || document.body;
        let b = [...raiz.children];
        while (b.length === 1 && b[0].children.length >= 2) b = [...b[0].children];
        b = b.filter((x) => !/^(SCRIPT|STYLE|NOSCRIPT|TEMPLATE|LINK|META)$/.test(x.tagName));
        return b.map((x, idx) => { const r = x.getBoundingClientRect(); return { idx, y: Math.round(r.top + scrollY), altura: Math.round(r.height) }; });
      });
      for (const s of esperadas) {
        const b = blocos.find((x) => x.idx === s.idx);
        if (!b || Math.abs(b.altura - s.altura) > s.altura * 0.02) { console.log(`${L}px seção ${s.idx}: no retrato ${b ? b.altura : 'sem bloco'}px × captura ${s.altura}px — não gravei`); erro = 1; continue; }
        const saida = join(cap, 'secoes-png', `${L}-${s.idx}.png`);
        await p.screenshot({ path: saida, fullPage: true, clip: { x: 0, y: b.y, width: L, height: b.altura }, type: 'png' });
        console.log(`${L}px seção ${s.idx}: ${b.altura}px (captura ${s.altura}px) → ${saida}`);
      }
    } finally { await ctx.close().catch(() => {}); }
  }
});
process.exit(erro);
