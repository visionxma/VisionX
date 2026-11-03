#!/usr/bin/env node
// Prova de um molde de página de produto (02/11/2026, regra `rota-de-seo-e-clone-de-lp-diferente`).
//
// O molde é a LP de referência com os lugares marcados. Montado com os textos, as imagens e a paleta da PRÓPRIA
// referência (`origem.json` + `origem.css`), ele tem de reproduzir a captura renderizada, seção por seção: cada
// `[data-mx-secao="<idx>"]` do molde é recortado e comparado (`comparar-com-referencia.mjs`) com o bloco de mesmo
// idx da captura (`secoes-<L>.json` + `ref-<L>.png`). Seção da referência que o molde não traz precisa de motivo
// em `meta.secoes[].omitida` (logo de cliente, depoimento de pessoa real, preço da referência...).
//
// uso: node gerador/provar-molde.mjs moldes/<id> [--larguras 1440,390] [--limiar 0.12] [--so-html]
//
// Grava em moldes/<id>/: ref-<L>.png (as seções da referência que o molde reproduz, empilhadas), prova/prova.html,
// prova/origem-<L>.png, prova/secoes/<L>-<idx>-{ref,clone,mapa,lado}.png e prova.json:
//   { referencia, molde, quando, larguras: { "1440": { total, secoes: [...] }, "390": ... }, omitidas, passou }
// (clone-<L>.png é a foto da página VESTIDA, tirada do site gerado: `gerador/fotos-moldes.mjs`).
// Sai 1 se faltar seção sem motivo ou se alguma seção divergir acima do limiar.
import { readFileSync, writeFileSync, existsSync, mkdirSync } from 'node:fs';
import { join, resolve, basename } from 'node:path';
import { pathToFileURL } from 'node:url';
import { spawnSync } from 'node:child_process';
import { homedir } from 'node:os';

const CLONE_BIN = join(homedir(), '.jarvis/marcio-safirion/clone/bin');
const FFMPEG = join(homedir(), '.local/bin/ffmpeg');
const COMPARAR = join(homedir(), '.jarvis/design-engine/ferramentas/comparar-com-referencia.mjs');

const args = process.argv.slice(2);
const COM_VALOR = new Set(['--larguras', '--limiar', '--limiar-faixa', '--tolerancia']);
const valorDe = (n, d) => { const i = args.indexOf(n); return i >= 0 && args[i + 1] != null ? args[i + 1] : d; };
const pos = args.filter((a, i) => !a.startsWith('--') && !COM_VALOR.has(args[i - 1]));
const pasta = pos[0] ? resolve(pos[0]) : '';
if (!pasta || !existsSync(join(pasta, 'molde.mjs'))) {
  console.error('uso: node gerador/provar-molde.mjs moldes/<id> [--larguras 1440,390] [--limiar 0.12] [--so-html]');
  process.exit(2);
}
const larguras = valorDe('--larguras', '1440,390').split(',').map(Number).filter(Boolean);
const LIMIAR = valorDe('--limiar', '0.12');
const LIMIAR_FAIXA = valorDe('--limiar-faixa', String(Number(LIMIAR) * 2));
const TOLERANCIA = valorDe('--tolerancia', '0.10');
const soHtml = args.includes('--so-html');

const ler = (n) => (existsSync(join(pasta, n)) ? readFileSync(join(pasta, n), 'utf8') : '');
const lerJson = (arq, d) => { try { return JSON.parse(readFileSync(arq, 'utf8')); } catch { return d; } };
const mod = await import(pathToFileURL(join(pasta, 'molde.mjs')).href + '?t=' + Date.now());
const meta = mod.meta || {};
const id = meta.id || basename(pasta);
const capDir = meta.captura ? resolve(meta.captura.replace(/^~/, homedir())) : '';
if (!capDir || !existsSync(join(capDir, 'captura.json'))) { console.error(`molde ${id}: meta.captura sem captura (${capDir})`); process.exit(2); }
const origem = lerJson(join(pasta, 'origem.json'), null);
if (!origem) { console.error(`molde ${id}: falta origem.json`); process.exit(2); }
const htmlOrigem = mod.render({ ...origem, modo: 'origem' });

// @font-face da captura: a prova precisa da letra da referência para medir igual
function fontesDaCaptura(dir) {
  const lista = lerJson(join(dir, 'estilos.json'), []);
  const pagina = lerJson(join(dir, 'captura.json'), {}).url || '';
  const saida = [];
  for (const f of lista) {
    let css = '';
    try { css = readFileSync(join(dir, f.arquivo), 'utf8'); } catch { continue; }
    for (const m of css.matchAll(/@font-face\s*\{[^}]*\}/gi)) {
      saida.push(m[0].replace(/url\(\s*(['"]?)([^'")]+)\1\s*\)/g, (tudo, q, u) => {
        if (/^(data:|#)/i.test(u)) return tudo;
        try { return `url("${new URL(u, f.href || pagina).href}")`; } catch { return tudo; }
      }));
    }
  }
  return saida.join('\n');
}

const pastaProva = join(pasta, 'prova');
mkdirSync(join(pastaProva, 'secoes'), { recursive: true });
const arqProva = join(pastaProva, 'prova.html');
writeFileSync(arqProva, `<!doctype html>\n<html lang="${origem.lang || 'en'}"><head><meta charset="utf-8">\n` +
  `<meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">\n<title>prova ${id}</title>\n` +
  `<style>html,body{margin:0;padding:0}</style>\n<style>\n${fontesDaCaptura(capDir)}\n</style>\n` +
  `<style>\n${ler('origem.css')}\n${ler('molde.css')}\n</style>\n</head>\n<body>\n` +
  `<main class="mx-pagina"><div class="mx-${id}" data-molde="${id}">${htmlOrigem}</div></main>\n` +
  (ler('molde.js') ? `<script>\n${ler('molde.js')}\n</script>\n` : '') + '</body></html>\n');
if (soHtml) { console.log('prova: ' + arqProva); process.exit(0); }

function ffmpeg(a) {
  const r = spawnSync(FFMPEG, ['-y', '-loglevel', 'error', ...a]);
  if (r.status !== 0) throw new Error('ffmpeg: ' + String(r.stderr).slice(0, 200));
}
const recortar = (src, y, h, w, saida) => ffmpeg(['-i', src, '-vf', `crop=${w}:${h}:0:${y}`, '-frames:v', '1', saida]);
function empilhar(lista, saida) {
  if (lista.length === 1) { ffmpeg(['-i', lista[0], '-frames:v', '1', saida]); return; }
  ffmpeg([...lista.flatMap((a) => ['-i', a]), '-filter_complex', `vstack=inputs=${lista.length}`, '-frames:v', '1', saida]);
}
function ladoALado(a, ha, b, hb, w, saida) {
  const H = Math.max(ha, hb);
  ffmpeg(['-i', a, '-i', b, '-filter_complex', `[0]pad=iw:${H}:0:0:color=white[a];[1]pad=iw:${H}:0:0:color=white[b];[a][b]hstack=inputs=2${w * 2 > 1600 ? ',scale=1600:-2' : ''}`, '-frames:v', '1', saida]);
}
function comparar(ref, clo, mapa) {
  const r = spawnSync(process.execPath, [COMPARAR, ref, clo, '--json', '--mapa', mapa, '--limiar', LIMIAR, '--limiar-faixa', LIMIAR_FAIXA, '--tolerancia', TOLERANCIA], { maxBuffer: 64 * 1024 * 1024 });
  try { return JSON.parse(String(r.stdout)); } catch { return { passou: false, motivos: ['comparar não respondeu: ' + String(r.stderr).slice(0, 200)] }; }
}

const falhas = [];
const relatorio = { referencia: meta.referencia, molde: id, captura: capDir, quando: new Date().toISOString(), limiar: Number(LIMIAR), larguras: {}, omitidas: [], faltando: [] };
const secoesMeta = new Map((meta.secoes || []).map((s) => [Number(s.idx), s]));
for (const s of meta.secoes || []) if (s.omitida) relatorio.omitidas.push({ secao: s.idx, tipo: s.tipo || '', motivo: s.omitida });

const { comNavegador, novoContexto, prepararPagina, fotoInteira } = await import(join(CLONE_BIN, 'pagina.mjs'));
await comNavegador('provar-molde visionx ' + id, async (nav) => {
  for (const L of larguras) {
    const refPng = join(capDir, `ref-${L}.png`);
    const refSecoes = lerJson(join(capDir, `secoes-${L}.json`), null);
    if (!existsSync(refPng) || !refSecoes) { falhas.push(`captura sem ref-${L}.png ou secoes-${L}.json`); continue; }
    const ctx = await novoContexto(nav, L);
    const p = await ctx.newPage();
    // letra da referência numa página file:// precisa de CORS: a prova repassa com o cabeçalho
    await p.route(/\.(woff2?|ttf|otf)(\?|#|$)/i, async (route) => {
      try {
        const resp = await route.fetch();
        await route.fulfill({ response: resp, headers: { ...resp.headers(), 'access-control-allow-origin': '*' } });
      } catch { await route.continue().catch(() => {}); }
    });
    try {
      await prepararPagina(p, pathToFileURL(arqProva).href, { bloquear: false });
      const medida = await p.evaluate(() => ({
        secoes: [...document.querySelectorAll('[data-mx-secao]')].map((e) => {
          const r = e.getBoundingClientRect();
          return { idx: Number(e.getAttribute('data-mx-secao')), y: Math.round(r.top + scrollY), altura: Math.round(r.height) };
        }),
        rolagemLateral: document.documentElement.scrollWidth - document.documentElement.clientWidth,
      }));
      const fotoOrigem = join(pastaProva, `origem-${L}.png`);
      const fc = await fotoInteira(p, fotoOrigem);
      const larg = { altura_molde_origem: fc.altura, rolagem_lateral: medida.rolagemLateral, secoes: [] };
      if (medida.rolagemLateral > 0) falhas.push(`${L}px: ${medida.rolagemLateral}px de rolagem lateral`);
      const cabecalhos = refSecoes.filter((s) => s.papel === 'cabecalho');
      const refsUsadas = [];
      for (const rs of refSecoes.filter((s) => s.papel === 'conteudo')) {
        const m = secoesMeta.get(rs.idx);
        const noClone = medida.secoes.find((s) => s.idx === rs.idx);
        if (!noClone) {
          if (!(m && m.omitida) && !relatorio.faltando.includes(rs.idx)) relatorio.faltando.push(rs.idx);
          continue;
        }
        // cabeçalho fixo da referência pintado por cima da seção: a faixa sobreposta não entra
        const sobra = Math.max(0, ...cabecalhos.map((c) => Math.min(c.y + c.altura, rs.y + rs.altura) - rs.y).filter((v) => v > 0));
        // menu e faixa de anúncio da referência DENTRO da 1ª seção (meta.topoDoChassi[L]): na página vestida esse lugar
        // é do cabeçalho do chassi, então a faixa sai só do lado da referência
        const topo = rs.idx === refSecoes.filter((s) => s.papel === 'conteudo')[0].idx ? Number((meta.topoDoChassi || {})[L] || 0) : 0;
        const sobraRef = Math.max(sobra, topo);
        // seção que passa dos 16.000 px da foto inteira: foto própria (referência: gerador/cauda-da-captura.mjs; clone: recorte direto)
        const refCauda = join(capDir, 'secoes-png', `${L}-${rs.idx}.png`);
        const usaCaudaRef = rs.y + rs.altura > 16000 && existsSync(refCauda);
        const usaCaudaClo = noClone.y + noClone.altura > 16000;
        const alturaRef = usaCaudaRef ? rs.altura - sobraRef : Math.min(rs.altura - sobraRef, 16000 - rs.y - sobraRef);
        const alturaClo = usaCaudaClo ? noClone.altura - sobra : Math.min(noClone.altura - sobra, 16000 - noClone.y - sobra);
        const item = { secao: rs.idx, tipo: m ? m.tipo : '', ref: { y: rs.y, altura: rs.altura }, molde: { y: noClone.y, altura: noClone.altura } };
        if (alturaRef < 8 || alturaClo < 8) { item.passou = false; item.motivos = ['seção sem altura para comparar']; larg.secoes.push(item); falhas.push(`${L}px seção ${rs.idx}: sem altura`); continue; }
        const base = join(pastaProva, 'secoes', `${L}-${String(rs.idx).padStart(2, '0')}`);
        if (usaCaudaRef) recortar(refCauda, sobraRef, alturaRef, L, base + '-ref.png');
        else recortar(refPng, rs.y + sobraRef, alturaRef, L, base + '-ref.png');
        if (usaCaudaClo) await p.screenshot({ path: base + '-clone.png', fullPage: true, clip: { x: 0, y: noClone.y + sobra, width: L, height: alturaClo }, type: 'png' });
        else recortar(fotoOrigem, noClone.y + sobra, alturaClo, L, base + '-clone.png');
        refsUsadas.push(base + '-ref.png');
        const c = comparar(base + '-ref.png', base + '-clone.png', base + '-mapa.png');
        ladoALado(base + '-ref.png', alturaRef, base + '-clone.png', alturaClo, L, base + '-lado.png');
        Object.assign(item, { total: c.total, altura_dif: c.altura && c.altura.diferenca, passou: !!c.passou, motivos: c.motivos || [], altura: alturaRef });
        if (!c.passou) falhas.push(`${L}px seção ${rs.idx}${m && m.tipo ? ' (' + m.tipo + ')' : ''}: ${(c.motivos || []).join('; ')}`);
        larg.secoes.push(item);
      }
      // a régua do portão: as seções da referência que o molde reproduz, empilhadas na ordem da página
      if (refsUsadas.length) empilhar(refsUsadas, join(pasta, `ref-${L}.png`));
      const pesos = larg.secoes.filter((s) => s.total != null);
      const somaAlt = pesos.reduce((a, s) => a + s.altura, 0) || 1;
      larg.total = Number((pesos.reduce((a, s) => a + s.total * s.altura, 0) / somaAlt).toFixed(4));
      larg.pior = pesos.length ? Number(Math.max(...pesos.map((s) => s.total)).toFixed(4)) : null;
      larg.passou = larg.secoes.every((s) => s.passou);
      relatorio.larguras[L] = larg;
      console.log(`${L}px: ${larg.secoes.filter((s) => s.passou).length}/${larg.secoes.length} seção(ões) dentro do limiar · média ${(larg.total * 100).toFixed(1)}% · pior ${larg.pior != null ? (larg.pior * 100).toFixed(1) + '%' : '-'}`);
      for (const s of larg.secoes) console.log(`  ${s.passou ? 'ok' : 'XX'} ${String(s.secao).padStart(2)} ${(s.tipo || '').padEnd(12)} ${s.total != null ? (s.total * 100).toFixed(1).padStart(5) + '%' : '   - '}  ${s.passou ? '' : (s.motivos || []).join('; ')}`);
    } finally {
      await ctx.close().catch(() => {});
    }
  }
});
if (relatorio.faltando.length) falhas.push(`seção(ões) da referência sem clone e sem motivo: ${relatorio.faltando.join(', ')}`);
relatorio.passou = falhas.length === 0;
relatorio.falhas = falhas;
writeFileSync(join(pasta, 'prova.json'), JSON.stringify(relatorio, null, 2));
console.log(falhas.length ? `\nREPROVOU: ${falhas.join(' | ')}` : '\nPASSOU: o molde reproduz a referência seção por seção');
process.exit(falhas.length ? 1 : 0);
