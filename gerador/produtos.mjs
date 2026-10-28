// Fonte única do portal: a home, as páginas de produto, o sitemap e o llms.txt saem daqui.
// Para incluir ou mudar um produto, edite este arquivo e rode `node gerador/gerar.mjs`.
// Só entra afirmação que a página oficial do produto já faz; nada de número inventado.

export const grupos = {
  gestao: { titulo: 'Sistemas de gestão', frase: 'Um sistema para cada setor, feito para o jeito que o setor trabalha.' },
  ferramentas: { titulo: 'Ferramentas e plataformas', frase: 'Produtos de uso direto, do PDF à apuração da eleição.' },
  dev: { titulo: 'Em desenvolvimento', frase: 'O que a VisionX está construindo agora.' }
};

// estado: 'no-ar' | 'app' (sem site, só aplicativo) | 'dev' (em desenvolvimento)
export const produtos = [
  {
    slug: 'frox', nome: 'FroX', grupo: 'gestao', setor: 'Transporte e frotas', estado: 'no-ar',
    url: 'https://site.froxbr.com', icone: 'frox.png', captura: null, cor: '#d00a24',
    resumo: 'Gestão de frota de caminhões para transportadora e autônomo.',
    texto: 'Registro de viagens, receitas e despesas, custo por caminhão e relatório geral, sem rastreador. Começa com um plano grátis permanente para um caminhão e cresce para o Plano Frotas.',
    pontos: ['Plano Grátis permanente para 1 caminhão', 'Plano Frotas a partir de R$ 63,75/mês', 'Viagens, receitas e despesas no mesmo lugar', 'Funciona sem rastreador']
  },
  {
    slug: 'construsoft', nome: 'ConstruSoft', grupo: 'gestao', setor: 'Construção civil', estado: 'no-ar',
    url: 'https://construsoftbr.com', icone: 'construsoft.png', captura: 'construsoft.webp', cor: '#e08a00',
    resumo: 'Gestão de obras para construtoras.',
    texto: 'Obras, parcelas com recibo em PDF, despesas, estoque e equipe em um sistema só, com usuários ilimitados.',
    pontos: ['Parcelas com recibo em PDF', 'Despesas, estoque e equipe por obra', 'Usuários ilimitados', '14 dias grátis']
  },
  {
    slug: 'softpay', nome: 'SoftPay', grupo: 'gestao', setor: 'Comércio e varejo', estado: 'no-ar',
    url: 'https://www.softpaybr.com', icone: 'softpay.webp', captura: 'softpay.webp', cor: '#16a34a',
    resumo: 'PDV, estoque e vendas para o comércio.',
    texto: 'PDV moderno, controle de estoque, vendas no PIX e no cartão, fiado, relatórios e Curva ABC.',
    pontos: ['PDV com PIX e cartão', 'Controle de estoque e Curva ABC', 'Fiado e relatórios', '7 dias grátis, sem cartão']
  },
  {
    slug: 'hotelgestao', nome: 'HotelGestão', grupo: 'gestao', setor: 'Hotéis e pousadas', estado: 'no-ar',
    url: 'https://hotelgestao.com.br', icone: 'hotelgestao.svg', captura: 'hotelgestao.webp', cor: '#0e7490',
    resumo: 'Sistema para hotel e pousada na nuvem.',
    texto: 'Reservas, caixa, WhatsApp automático, pré-check-in, FNRH digital e motor de reservas sem comissão.',
    pontos: ['Reservas e caixa', 'WhatsApp automático e pré-check-in', 'FNRH digital', 'Motor de reservas sem comissão', '14 dias grátis']
  },
  {
    slug: 'finagro', nome: 'Finagro', grupo: 'gestao', setor: 'Agropecuária', estado: 'no-ar',
    url: 'https://finagro.app', icone: 'finagro.png', captura: 'finagro.webp', cor: '#2f7d32',
    resumo: 'Gestão rural para fazenda e sítio, no celular e no computador.',
    texto: 'Rebanho, vacinas, GTA, lavoura, contas e fluxo de caixa. Grátis até 1.000 animais com ficha, sem cartão.',
    pontos: ['Rebanho, vacinas e GTA', 'Lavoura, contas e fluxo de caixa', 'Celular e computador', 'Grátis até 1.000 animais com ficha']
  },
  {
    slug: 'seuplantao', nome: 'Seu Plantão', grupo: 'gestao', setor: 'Saúde', estado: 'no-ar',
    url: 'https://seuplantao.app', icone: 'seuplantao.png', captura: 'seuplantao.webp', cor: '#14b8a6',
    resumo: 'Agenda e faturamento para médicos plantonistas.',
    texto: 'Agenda mensal com uma cor por hospital, valores a receber, aviso antes do plantão e relatório em PDF ou Excel para o contador. Funciona offline e instala no celular.',
    pontos: ['Agenda com uma cor por hospital', 'Previsto, recebido e atrasado', 'Relatório em PDF ou Excel', 'Grátis, instala no celular']
  },
  {
    slug: 'meuescritorio', nome: 'MeuEscritório', grupo: 'gestao', setor: 'Advocacia', estado: 'no-ar',
    url: 'https://saasadvocacia.pages.dev', icone: 'advocacia.png', captura: 'advocacia.webp', cor: '#1e3a8a',
    resumo: 'Gestão jurídica para escritórios de advocacia.',
    texto: 'Processos, clientes, agenda, financeiro e comunicação interna em um só lugar.',
    pontos: ['Processos e clientes', 'Agenda e financeiro', 'Comunicação interna da equipe']
  },
  {
    slug: 'midiamente', nome: 'Mídiamente', grupo: 'gestao', setor: 'Agências de marketing', estado: 'no-ar',
    url: 'https://midiamente.app', icone: 'midiamente.png', captura: 'midiamente.webp', cor: '#7c3aed',
    resumo: 'Gestão com IA para agências de marketing.',
    texto: 'CRM, projetos, calendário editorial, financeiro, cobranças, equipe e aprovação do cliente num só lugar, com inteligência artificial que lê a operação e responde sobre ela.',
    pontos: ['CRM, projetos e calendário editorial', 'Financeiro e cobranças', 'Aprovação do cliente', 'IA que responde sobre a operação']
  },
  {
    slug: 'cortex', nome: 'CorteX', grupo: 'gestao', setor: 'Atendimento e vendas com IA', estado: 'no-ar',
    url: 'https://cortexvs.com', icone: 'cortex.png', captura: null, cor: '#111111',
    resumo: 'Operação de atendimento e vendas por inteligência artificial.',
    texto: 'Atendimento e vendas por inteligência artificial, da primeira mensagem à conversão.',
    pontos: ['Atendimento por IA', 'Da primeira mensagem à conversão']
  },
  {
    slug: 'pdf-sem-cadastro', nome: 'PDF sem Cadastro', grupo: 'ferramentas', setor: 'Ferramenta', estado: 'no-ar',
    url: 'https://pdfsemcadastro.com.br', icone: 'pdf.png', captura: 'pdf.webp', cor: '#e11d48',
    resumo: 'Comprima, junte, assine e converta PDF e imagem, grátis.',
    texto: 'Ferramentas de PDF e imagem sem cadastro. Os arquivos não saem do celular ou do computador: ninguém vê, nem a VisionX.',
    pontos: ['Comprimir, juntar, assinar e converter', 'Sem cadastro e grátis', 'O arquivo não sai do seu aparelho']
  },
  {
    slug: 'brasilvisto', nome: 'BrasilVisto', grupo: 'ferramentas', setor: 'Notícias e dados', estado: 'no-ar',
    url: 'https://brasilvisto.com.br', icone: 'brasilvisto.svg', captura: 'brasilvisto.webp', cor: '#0f766e',
    resumo: 'Política, economia e dados, com a fonte à vista.',
    texto: 'Portal de notícias, política, economia, negócios, finanças e indicadores. Agrega manchetes de fontes identificadas e publica análises próprias.',
    pontos: ['Manchetes de fontes identificadas', 'Análises próprias', 'Indicadores de economia e finanças']
  },
  {
    slug: 'urnometro', nome: 'Urnômetro', grupo: 'ferramentas', setor: 'Apuração eleitoral', estado: 'no-ar',
    url: 'https://urnometro.visionxma.com', icone: 'urnometro.svg', captura: 'urnometro.webp', cor: '#1d4ed8',
    resumo: 'A apuração do 2º turno contada pelo que falta apurar.',
    texto: 'A apuração do 2º turno de 2026 impressa como um boletim de urna: placar, quanto falta apurar, quanto cada candidato precisa e o Brasil em pontos. Dados lidos direto do TSE.',
    pontos: ['Placar e quanto falta apurar', 'Quanto cada candidato precisa', 'Presidente e governador', 'Dados lidos direto do TSE']
  },
  {
    slug: 'xmusic', nome: 'XMusic', grupo: 'ferramentas', setor: 'Música', estado: 'app',
    url: null, icone: 'xmusic.png', captura: null, cor: '#9333ea',
    resumo: 'Aplicativo de música.', texto: 'Aplicativo de música da VisionX, para celular.', pontos: ['Aplicativo para celular']
  },
  {
    slug: 'biblia', nome: 'Bíblia Sagrada: Dia e Noite', grupo: 'ferramentas', setor: 'Leitura e rotina', estado: 'app',
    url: null, icone: 'biblia.png', captura: null, cor: '#b45309',
    resumo: 'Aplicativo de iPhone com rituais de manhã e de noite.', texto: 'Aplicativo de iPhone, gratuito, com a leitura da Bíblia organizada em rituais de manhã e de noite. Aguardando aprovação da Apple.', pontos: ['Para iPhone', 'Grátis', 'Rituais de manhã e de noite']
  },
  {
    slug: 'api-nota-fiscal', nome: 'API de Nota Fiscal', grupo: 'ferramentas', setor: 'Fiscal para desenvolvedores', estado: 'dev',
    url: null, icone: 'api-nota-fiscal.svg', captura: null, cor: '#0369a1',
    resumo: 'API fiscal modular: NFC-e, NF-e, MDF-e, NFS-e e impostos.',
    texto: 'API fiscal em módulos que se ativam por cliente: NFC-e, NF-e, MDF-e, NFS-e, substituição tributária, IPI e romaneio de entrega.',
    pontos: ['NFC-e e NF-e', 'MDF-e e NFS-e', 'Substituição tributária e IPI', 'Módulos ativados por cliente']
  },
  { slug: 'agendador', nome: 'Agendador', grupo: 'dev', setor: 'Agendamento', estado: 'dev', url: null, icone: 'agendador.svg', captura: null, cor: '#475569',
    resumo: 'Sistema de agendamento.', texto: 'Sistema de agendamento da VisionX, em desenvolvimento.', pontos: [] },
  { slug: 'achegar', nome: 'Achegar', grupo: 'dev', setor: 'Hospedagem', estado: 'dev', url: null, icone: 'achegar.svg', captura: null, cor: '#475569',
    resumo: 'Rede de reservas de hospedagem.', texto: 'Rede de reservas de hospedagem, produto separado do HotelGestão, em desenvolvimento.', pontos: [] },
  { slug: 'remessa', nome: 'Remessa', grupo: 'dev', setor: 'E-mail', estado: 'dev', url: null, icone: 'remessa.svg', captura: null, cor: '#475569',
    resumo: 'API de e-mail transacional e campanhas.', texto: 'API de e-mail transacional e de campanhas, em desenvolvimento.', pontos: [] },
  { slug: 'elo', nome: 'Elo', grupo: 'dev', setor: 'Família', estado: 'dev', url: null, icone: 'elo.png', captura: null, cor: '#475569',
    resumo: 'Aplicativo de localização para a família.', texto: 'Aplicativo grátis de localização para a família, iPhone primeiro, em desenvolvimento.', pontos: [] },
  { slug: 'cabeceira', nome: 'Cabeceira', grupo: 'dev', setor: 'Leitura', estado: 'dev', url: null, icone: 'cabeceira.png', captura: null, cor: '#475569',
    resumo: 'Leitor de PDF para Windows.', texto: 'Leitor de PDF para Windows, em desenvolvimento.', pontos: [] },
  { slug: 'ciberatlas', nome: 'CiberAtlas', grupo: 'dev', setor: 'Cibersegurança', estado: 'dev', url: null, icone: 'ciberatlas.svg', captura: null, cor: '#475569',
    resumo: 'Atlas aberto de cibersegurança defensiva.', texto: 'Atlas aberto de cibersegurança defensiva, em português e inglês, em desenvolvimento.', pontos: [] },
  { slug: 'lelink', nome: 'LeLink', grupo: 'dev', setor: 'Ferramenta para IA', estado: 'dev', url: null, icone: null, captura: null, cor: '#475569',
    resumo: 'Lê links e responde só com evidência verificável.', texto: 'Ferramenta que lê links e responde só com evidência verificável, em desenvolvimento.', pontos: [] }
];
