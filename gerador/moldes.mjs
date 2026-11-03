// Molde por rota (02/11/2026): página de produto que tem molde veste o corpo clonado, pela captura RENDERIZADA, de uma
// LP de referência DIFERENTE (regra `rota-de-seo-e-clone-de-lp-diferente`). Produto sem molde continua no corpo antigo.
//
// Cada molde mora em moldes/<id>/ na raiz do projeto:
//   molde.mjs   export const meta = { id, referencia, secoes: [...] } e export function render(ctx) → HTML do corpo
//   molde.css   CSS escopado em `.mx-<id>`, com as cores e as fontes em variáveis de papel (--m-*) — o tamanho, o espaço,
//               a composição e o efeito são os da referência
//   molde.js    o JS próprio que refaz o comportamento da referência (abas, FAQ, revelar)
//   origem.json textos e paleta da PRÓPRIA referência (a prova monta o molde com eles e compara com a captura)
//   ref-*.png, clone-*.png, prova.json: a prova (gerador/provar-molde.mjs)
// O contrato que o portão `portao-rotas-clonadas.mjs` lê é rotas-clonadas.json, na raiz.
//
// O que NÃO muda com o molde (protege a posição no Google): URL, <title>, description, canonical, H1, a resposta direta do
// topo, recursos, o artigo inteiro (com os links seguidos para o site do produto), tabelas, FAQ (o visível = o JSON-LD),
// "pergunte a uma IA", outros produtos e a chamada final. O ctx entrega tudo isso pronto; o molde só escolhe a roupa.
import { existsSync, readFileSync, mkdirSync, writeFileSync } from 'node:fs';
import { createHash } from 'node:crypto';
import { join, dirname } from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';

export const RAIZ_MOLDES = join(dirname(fileURLToPath(import.meta.url)), '..', 'moldes');

// produto → molde. Uma referência por página, nenhuma repetida no domínio (o portão confere).
export const MOLDE_POR_PRODUTO = {
  frox: 'rd-crm',
  softpay: 'stripe-pagamentos',
  hotelgestao: 'nuvem-loja',
};

// prints REAIS de cada produto (sistema rodando com dados de demonstração), em site/img/moldes/<slug>/
const telasFrox = [
  ['Caminhões', 'caminhoes', 'Tela Caminhões do FroX: placa, modelo, quilometragem e manutenção de cada caminhão da frota'],
  ['Viagens e lucro', 'viagens-lucro', 'Tela Viagens do FroX: origem, destino, receitas, despesas e saldo de cada viagem'],
  ['Motoristas', 'motoristas', 'Tela Motoristas do FroX: equipe, CNH, telefone e comissão de cada motorista'],
  ['Detalhe da viagem', 'viagem-detalhe', 'Detalhe de uma viagem no FroX: carga, peso, quilômetros, consumo médio e abastecimentos'],
  ['Custo por km', 'custo-por-km', 'Tela Custo por km do FroX: valor cobrado na tabela contra o custo real de cada caminhão'],
  ['Simulador de frete', 'simulador', 'Simulador de frete do FroX: descobre se o frete dá lucro antes de aceitar'],
  ['Financeiro', 'financeiro', 'Tela Financeiro do FroX: saldo em caixa, entradas, saídas, contas a pagar e a receber'],
  ['Nota fiscal por XML', 'importar-xml', 'Importar XML no FroX: a nota fiscal ou o CT-e vira uma viagem preenchida'],
  ['Relatórios', 'relatorios', 'Tela Relatórios do FroX: relatório geral, viagens, financeiro e comissões em PDF'],
];
export const MIDIA_POR_PRODUTO = {
  frox: {
    hero: { src: '/img/moldes/frox/dashboard.webp', alt: 'Painel do FroX com o resumo da frota: viagens, receitas, despesas e lucro do mês' },
    flutua: { src: '/img/moldes/frox/custo-por-km.webp', alt: 'Custo por km do FroX comparando a tabela de frete com o custo real' },
    telasTexto: 'Cada tela abaixo é o FroX de verdade, com dados de demonstração: da frota e das viagens ao financeiro e aos relatórios.',
    telas: telasFrox.map(([rotulo, arq, alt]) => ({ rotulo, src: `/img/moldes/frox/${arq}.webp`, alt })),
  },
};

const cache = new Map();
export async function carregarMolde(id) {
  if (cache.has(id)) return cache.get(id);
  const pasta = join(RAIZ_MOLDES, id);
  const mod = await import(pathToFileURL(join(pasta, 'molde.mjs')).href);
  const ler = (f) => (existsSync(join(pasta, f)) ? readFileSync(join(pasta, f), 'utf8') : '');
  // o CSS publicado = o da referência (escopado e vestido) + o acabamento da VisionX, que só vale em .mx-vestido
  const m = { id, pasta, mod, css: [ler('molde.css'), ler('acabamento.css')].filter(Boolean).join('\n'), js: ler('molde.js') };
  cache.set(id, m);
  return m;
}

export async function moldeDoProduto(slug) {
  const id = MOLDE_POR_PRODUTO[slug];
  if (!id || !existsSync(join(RAIZ_MOLDES, id, 'molde.mjs'))) return null;
  return carregarMolde(id);
}

// grava site/moldes/<id>.css e .js e devolve os endereços com ?v= (arquivo que muda de conteúdo muda de endereço)
export function publicarAtivos(m, siteDir) {
  const dir = join(siteDir, 'moldes');
  mkdirSync(dir, { recursive: true });
  const out = {};
  for (const [ext, txt] of [['css', m.css], ['js', m.js]]) {
    if (!txt) continue;
    writeFileSync(join(dir, `${m.id}.${ext}`), txt);
    out[ext] = `/moldes/${m.id}.${ext}?v=${createHash('md5').update(txt).digest('hex').slice(0, 8)}`;
  }
  return out;
}

// corpo da página com o molde: o elemento raiz do corpo leva data-molde (o portão confere na página servida)
export function corpoComMolde(m, ctx) {
  const midia = MIDIA_POR_PRODUTO[ctx.p.slug] || {};
  return `<main class="main-wrapper mx-pagina" data-molde="${m.id}"><div class="mx-${m.id} mx-vestido" data-molde="${m.id}">${m.mod.render({ ...ctx, midia })}</div>`;
}
