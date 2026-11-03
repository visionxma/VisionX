#!/usr/bin/env node
// Foto da página VESTIDA de cada rota clonada (o par da ref-<L>.png da prova): lê rotas-clonadas.json, abre
// <base><rota> no Chrome sem janela e grava <pasta do molde>/clone-<L>.png (página inteira, corte nos 16.000 px).
// Antes da foto: espera as fontes, rola até o fim (imagem preguiçosa e revelar ao entrar) e volta ao topo.
//
// uso: node gerador/fotos-moldes.mjs <base-url> [--so <rota>] [--larguras 1440,390] [--saida <pasta>]
//   --saida  grava em <pasta>/<slug>-<L>.png em vez da pasta do molde (fotos de trabalho, que não entram no contrato)
import { readFileSync, mkdirSync } from 'node:fs';
import { join, dirname, resolve } from 'node:path';
import { homedir } from 'node:os';
import { pathToFileURL, fileURLToPath } from 'node:url';

const RAIZ = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opc = (n, d) => { const i = args.indexOf(n); return i >= 0 ? args[i + 1] : d; };
const base = (args[0] || '').replace(/\/$/, '');
if (!/^https?:\/\//.test(base)) { console.error('uso: node gerador/fotos-moldes.mjs <base-url> [--so <rota>] [--larguras 1440,390] [--saida <pasta>]'); process.exit(2); }
const so = opc('--so');
const larguras = opc('--larguras', '1440,390').split(',').map(Number).filter(Boolean);
const saida = opc('--saida');
const contrato = JSON.parse(readFileSync(join(RAIZ, 'rotas-clonadas.json'), 'utf8'));
const rotas = Object.entries(contrato.rotas).filter(([r]) => !so || r === so);
const { comNavegador, novoContexto, fotoInteira } = await import(pathToFileURL(join(homedir(), '.jarvis/marcio-safirion/clone/bin/pagina.mjs')).href);

await comNavegador('fotos-moldes visionx', async (nav) => {
  for (const [rota, e] of rotas) {
    for (const L of larguras) {
      const ctx = await novoContexto(nav, L, L < 600 ? 844 : 900);
      try {
        const p = await ctx.newPage();
        await p.goto(base + rota, { waitUntil: 'load', timeout: 60000 });
        await p.evaluate(async () => {
          await document.fonts.ready;
          for (let y = 0; y < document.documentElement.scrollHeight; y += 600) { scrollTo(0, y); await new Promise((r) => setTimeout(r, 60)); }
          scrollTo(0, 0);
        });
        await p.waitForTimeout(700);
        const slug = rota.replace(/^\/|\/$/g, '').split('/').pop();
        const arq = saida ? join(resolve(saida), `${slug}-${L}.png`) : join(RAIZ, e.pasta, `clone-${L}.png`);
        mkdirSync(dirname(arq), { recursive: true });
        const f = await fotoInteira(p, arq);
        console.log(`${rota} ${L}px: ${f.altura}px${f.cortada ? ' (cortada em 16.000)' : ''} → ${arq}`);
      } finally { await ctx.close().catch(() => {}); }
    }
  }
});
