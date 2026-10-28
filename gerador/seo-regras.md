# Roteiro de SEO e GEO para o portal de produtos da VisionX (site estático em HTML)

Fonte: "Métodos e inspiração para criar LP, site, front e SEO" (19/10/2026), seções 05 e 06 como núcleo, mais o anexo técnico (que só acrescenta; se divergirem, vale o principal). Os números abaixo estão copiados dos documentos. Onde o documento não dá número, está escrito "sem número no documento".

Premissas: o portal tem uma home, uma página por produto e um artigo por produto; é estático; domínio próprio já definido. SEO = aparecer na lista de resultados. GEO = ser CITADO na resposta de ChatGPT, Gemini, Perplexity, Claude, Copilot e Visão Geral do Google.

---

## 1. Regras aplicáveis (cada uma com o porquê e a verificação por script)

### A. Contrato e fonte única

1. **Nada inventado no dado estruturado e na página** (preço, nota, depoimento, número de clientes, prêmio só se verdadeiros). Porquê: dado falso derruba a confiança, gera penalização no Google e faz a IA deixar de citar. Script: o JSON-LD só pode ter `Offer.price`, `aggregateRating`, `review` se o mesmo valor estiver no texto visível; reprovar `aggregateRating`/`review` sem fonte declarada.
2. **Nenhuma técnica proibida**: texto escondido, robô vendo outra página, link comprado, página em massa sem revisão. Porquê: contrato da seção 05. Script: reprovar `display:none`/`visibility:hidden`/`hidden` em bloco de texto que aparece no JSON-LD ou no llms.txt; comparar o HTML servido a `curl` com o UA (identificação do robô) Googlebot e com UA comum (devem ser idênticos).
3. **Fonte única**: perguntas, preço e dados de cada produto num arquivo só (ex.: `produtos.json`), que gera a tela, o JSON-LD, o `llms.txt` e o `llms-full.txt`. Porquê: texto duplicado diverge e vira contradição na IA. Script: gerar tudo do JSON e, no portão, reler o HTML e conferir que nome, preço e perguntas do JSON-LD batem 1:1 com o texto visível e com o llms.txt.

### B. Camada técnica por página (title, description, canonical, lang, OG)

4. **`<title>` com no máximo 60 caracteres, termo principal à esquerda**. Porquê: corte na lista de resultados e peso do termo. Script: `len(title) <= 60`, único em todo o site, termo-chave nas primeiras palavras.
5. **`<meta name="description">` de 150 a 160 caracteres que já dá a resposta**. Porquê: é o texto que o buscador e a IA mostram. Script: `150 <= len(desc) <= 160`, única por página.
6. **`<link rel="canonical">` com URL absoluta (https://dominio/caminho)**, uma por página, apontando para a própria página (endereços limpos, sem `.html`). Porquê: endereço oficial; evita duplicata `.html` × limpo. Script: existe, é absoluta, `https`, sem `?v=`, bate com a URL do sitemap e responde 200.
7. **`<html lang="pt-BR">`** em toda página. Script: atributo presente e igual a `pt-BR`.
8. **Open Graph e cartão do X com imagem real de 1200×630**: `og:title`, `og:description`, `og:image`, `og:url`, `og:type`, `twitter:card`. Porquê: prévia ao compartilhar o link. Script: tags presentes; baixar a `og:image` e medir 1200×630; responde 200.
9. **Um só `<h1>` por página e títulos sem pular nível** (h1, depois h2, depois h3). Porquê: estrutura que buscador e IA leem. Script: `count(h1)==1`; sequência de níveis nunca salta (h1 para h3 reprova).
10. **`alt` em toda imagem que informa; `width` e `height` declarados em toda imagem; `loading="lazy"` fora da primeira tela**. Porquê: acessibilidade, CLS (salto de layout) e peso. Script: toda `<img>` tem `alt` (vazio só se decorativa), `width` e `height`; imagens abaixo da dobra com `loading=lazy`; a imagem do LCP sem lazy.
11. **Fonte com `display=swap`, script de terceiros adiado**. Script: procurar `display=swap` nas fontes; `<script src>` externo com `defer`/`async`.

### C. Desempenho

12. **LCP abaixo de 2,5 s no celular, CLS abaixo de 0,1, INP abaixo de 200 ms**. Porquê: metas do documento. Script: Lighthouse/PageSpeed em modo celular (ou navegador sem janela medindo LCP e CLS) em home, 1 produto e 1 artigo; medir no domínio próprio, nunca no `*.pages.dev`. Reprova se estourar. Peso em KB: sem número no documento (usar a meta de LCP como régua).
13. **Mídia pesada com pôster e WebP/AVIF; velocidade nunca vem de mídia pior.** Script: imagens `.webp`/`.avif`; reprovar PNG/JPG grandes sem alternativa; vídeo com `poster`.

### D. Rastreamento: sitemap, robots, llms, IndexNow

14. **`sitemap.xml` gerado pelo código, com `lastmod` verdadeiro**, listando todas as páginas indexáveis (home, produtos, artigos, páginas institucionais e legais). Porquê: descoberta. Script: toda `<loc>` responde 200 e é a própria canonical; `lastmod` igual à data de modificação real (e ao `dateModified` do JSON-LD); nenhuma página `noindex` no sitemap; toda página indexável do build está nele.
15. **`robots.txt` liberando busca E IA**: Googlebot, Bingbot, GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended, Applebot, e (anexo) DuckDuckBot, YandexBot, Claude-SearchBot, CCBot. Bloquear só `/api/`, `/admin`, `/login`, `/conta` (se existirem; num portal sem área logada, nada a bloquear). Declarar `Sitemap: https://dominio/sitemap.xml`. Porquê: a resposta da IA é descoberta tão real quanto a busca. Script: parsear o robots e reprovar `Disallow: /` em qualquer um desses UAs; exigir a linha `Sitemap:`.
16. **`/llms.txt`** (Markdown): resumo em uma frase, como funciona, o que NÃO é, preço e para quem é (anexo), e a lista de páginas com uma linha cada, por tema. **`/llms-full.txt`**: o site inteiro em texto puro. Os dois como texto simples (`text/plain`), ligados no rodapé e no sitemap. Script: ambos respondem 200; todos os links do llms.txt dão 200; cada produto do JSON aparece nele com o mesmo preço; `llms-full.txt` contém o texto de todas as páginas do sitemap.
17. **IndexNow**: chave (arquivo `<chave>.txt`) na raiz e aviso a cada publicação (avisa Bing, Copilot e Yandex). Script: o arquivo da chave responde 200 com o conteúdo da chave; o passo de deploy chama o endpoint com a lista de URLs alteradas. Search Console e Bing Webmaster com o sitemap enviado nos dois (ação manual, não é script; só registrar como pendência do dono).
18. **404 correta**: `404.html` com `noindex`; URL inexistente devolve 404 de verdade. Porquê: sem ela a Pages devolve a página inicial com 200 em qualquer endereço. Script: `curl -sI https://dominio/nao-existe-xyz` deve dar 404; `404.html` contém `noindex`.
19. **301 de endereço antigo**; endereços limpos (`.html` redireciona com 308). Script: cada URL antiga mapeada devolve 301/308 para a canonical; `/pagina.html` redireciona.
20. **Nenhum link quebrado e nenhum `noindex` esquecido.** Script: rastrear todos os links internos (200) e reprovar `noindex` em qualquer página do sitemap.

### E. Dados estruturados (JSON-LD) por tipo de página

21. **Home**: `Organization` (com `@id` estável e `sameAs` com os perfis oficiais: LinkedIn, YouTube etc.), `WebSite` e `WebPage`. Porquê: ficha da entidade para a máquina. Script: JSON válido; `@id` igual em todas as páginas; `sameAs` não vazio e cada URL responde 200.
22. **Página de produto**: `WebPage` + `BreadcrumbList` + `SoftwareApplication` (ou `Product`/`Service`) com `Offer` e preço real; `FAQPage` só se as perguntas estiverem visíveis; `HowTo` se houver passo a passo. Script: `Offer.price` bate com o texto visível e o JSON de fonte única; cada `Question` do `FAQPage` existe no HTML visível; `HowTo` tem os mesmos passos da tela.
23. **Artigo**: `WebPage` + `BreadcrumbList` + `Article` com autor, `datePublished` e `dateModified` (igual ao "Atualizado em" visível), mais `FAQPage` e `HowTo` quando houver. Script: `dateModified` == data exibida == `lastmod` do sitemap; autor presente.
24. **`BreadcrumbList` em todas as páginas internas.** Script: itens em ordem, último item = a própria página, URLs absolutas com 200.
25. **`LocalBusiness` no lugar de `Organization` só se houver atendimento local; `VideoObject` em vídeo.** Script: se usar, nome, telefone e endereço do JSON-LD batem com o texto visível.
26. **Validar no Rich Results Test e por script** (parse do JSON-LD de cada página, tipos esperados por tipo de página, sem campo vazio). Observação: a página-guia de exemplo do documento gera Organization, WebSite, WebPage, BreadcrumbList, Article, HowTo e FAQPage da mesma fonte da tela.

### F. Conteúdo, estrutura que IA e buscador citam

27. **Bloco citável**: a pergunta como subtítulo (h2) do jeito que a pessoa pergunta, e o primeiro parágrafo respondendo em **40 a 60 palavras**, completo sozinho. Script: para cada h2 em forma de pergunta (termina em "?"), contar as palavras do primeiro `<p>` seguinte: `40 <= n <= 60`.
28. **Cada página (artigo) nasce com**: resposta de **50 palavras** no topo, **800 a 1.500 palavras úteis**, **3 links internos** (no mínimo), JSON-LD, chamada (CTA) e data. Script: contar palavras do corpo do artigo (`800..1500`); contar links internos no corpo (`>= 3`); presença de JSON-LD, CTA e data. Página por cidade só com conteúdo próprio (não se aplica a este portal, ver seção 2); página clonada é conteúdo raso e derruba o site inteiro, portanto reprovar texto quase idêntico entre produtos (similaridade alta entre dois artigos).
29. **Números em vez de adjetivos** ("mínimo de R$ 20 por saque, 24 h de espera" é citável; "saque rápido" não é). Script (heurístico): listar adjetivos vazios ("rápido", "simples", "barato", "melhor", "incrível") sem número na mesma frase e marcar como aviso.
30. **Tabela comparativa honesta com uma linha em que o concorrente ganha, e seção "O que não fazemos"** por produto. Porquê: autoelogio puro é descartado como propaganda. Script: existe `<table>` comparativa e um bloco "O que não fazemos"/"O que não é".
31. **Glossário, página "Quem somos" completa e "Atualizado em <data>" visível**, igual ao `dateModified`. Porquê: estão entre as páginas mais lidas pelos robôs de IA. Script: as páginas existem e estão no sitemap; a data visível == `dateModified`.
32. **Bloco "Pergunte a uma IA" no fim de cada página**, título "Quer uma segunda opinião? Pergunte a uma IA.", botões em nova aba com `rel="noopener nofollow"` abrindo `chatgpt.com/?q=`, `google.com/search?udm=50&q=` e `perplexity.ai/search?q=` com a pergunta da página preenchida. Script: três links por página com esses prefixos, `target=_blank`, `rel` com `noopener` e `nofollow`, `q` não vazio e igual à pergunta da página.
33. **Pilar + cluster**: uma página-mãe por tema e uma página-filha por pergunta, interligadas. Aqui: home/produto como pilar e artigo como filho, com link nos dois sentidos. Script: cada artigo linka o seu produto e o produto linka o seu artigo; nenhuma página órfã (todas recebem ao menos 1 link interno); anchor text descritivo (não "clique aqui").
34. **Ficha da entidade** (nome e variações, o que é em **25 palavras** copiáveis, para quem é e para quem NÃO é, preço em número, concorrentes e diferença honesta) e **mapa de 40 a 60 perguntas reais** por intenção (o que é, "X vs Y", preço, objeção, cauda longa de IA). Script: contar palavras da definição (25); contar perguntas do arquivo-fonte (`40..60` para o site, a distribuir pelos produtos).
35. **Rodapé com a linha do produto e sem CNPJ** (CNPJ só nas páginas legais) e link para llms.txt. Porquê: regra de rodapé e GEO. Script: rodapé contém "© <ano> ... Todos os direitos reservados." com ano calculado; nenhum CNPJ fora de termos/privacidade.
36. **Páginas legais** (termos, privacidade, reembolso quando houver venda). Script: existem, no sitemap e linkadas no rodapé. Se a privacidade prometer "sem cookies", não instalar GA4/pixel: medir só por Search Console e Bing.

### G. Publicação (Cloudflare Pages, estático)

37. **Hospedagem na Cloudflare Pages** (estático; Vercel só para aplicação com servidor; o plano grátis da Vercel proíbe uso comercial). Medido de São Paulo: cache 171 ms × 267 ms.
38. **Pasta de publicação limpa** (sem fonte, backups nem arquivo de configuração de outra plataforma). Script: listar a pasta `dist` e reprovar `*.bak`, `*.orig`, `node_modules`, `.git`, `vercel.json`, fontes não usadas.
39. **`_headers`**: cache de um ano (`max-age=31536000, immutable`) em `css`, `js`, `fonts` e `assets`; `noindex` no `*.pages.dev`; cabeçalhos de segurança básicos. Script: `curl -sI` em cada tipo confere o `cache-control`; `curl -sI https://<projeto>.pages.dev/` traz `X-Robots-Tag: noindex`; o domínio próprio NÃO traz.
40. **Arquivo que muda de conteúdo muda de endereço**: `logo.webp?v=85b30e79` (8 letras do MD5 do arquivo), posto pelo gerador; vale também para CSS e JS. Script: todo recurso em cache longo referenciado no HTML tem `?v=` e o valor é igual às 8 primeiras letras do MD5 do arquivo atual.
41. **Prova no ar**: toda página do sitemap com 200, endereço inexistente com 404, nenhum arquivo em cache longo sem versão; depois IndexNow e sitemap reenviado. Domínio ligado ao projeto antes de mexer no DNS; CNAME com proxy ligado; guardar o registro antigo. Sondar de fora com `curl -sL` e cache-buster.

### H. Medição (processo, não script de HTML)

42. **Semanal**: impressões, cliques, posição e páginas no índice (Google e Bing); erros de dados estruturados; passagem dos robôs de IA no log (a Pages não dá log fácil; usar o que houver); aba de IA do Bing Webmaster para achar o padrão da página mais citada.
43. **Teste de citação**: 10 perguntas do mapa em ChatGPT, Perplexity, Gemini e Copilot, anotando citação e posição, **só em conta limpa e sem o nome do produto**; registrar a linha de base ANTES de mudar o site.

---

## 2. Regras que NÃO se aplicam (e por quê)

- **Biblioteca de Anúncios da Meta e "clonar a página que converte"** (passos 1 a 5 do método): é método de LP de venda/captação; o portal é institucional/produto e não clona concorrente.
- **Três direções, Verbalized Sampling, notas de Surpresa/Encaixe/Execução**: método de direção de arte, não de SEO.
- **Regras visuais** (hero `100svh`, navbar em cápsula, fontes proibidas, contraste 4,5:1, grão, lado a lado no celular, animação só com transform/opacity, plano do meio dominando, 5 perguntas + "Ver mais (+N)", pilha sticky, `contain: paint`): são de interface, outro portão. O que cruza com SEO e fica: `alt`, dimensões da imagem, lazy, performance, conteúdo não depender de JavaScript para aparecer, e a regra de perguntas (usar `<details name>`, desde que o texto esteja no HTML).
- **Página por cidade, LocalBusiness, Google Business Profile e Bing Places**: só com atendimento/endereço físico; o portal de produtos digitais não tem.
- **Programas de afiliados, referências de topo de página (ethena, mercury etc.)**: inspiração de LP, não de SEO.
- **Next.js/Vercel (função na região do banco, clique em 100 ms)**: o portal é estático na Cloudflare Pages.
- **Medidor de visitas (GA4/pixel)**: só se a política de privacidade permitir; se prometer "sem cookies", NÃO instalar (regra de proibição, não de aplicação).
- **Aviso de maioridade/não afiliação, oferta com reembolso de 7 dias**: só se o produto vender ou falar de plataforma de terceiro; checar caso a caso, não é regra de SEO.
- **Lista de 16 defeitos com "cara de IA"** (travessão, ponto colorido etc.): portão de design. Útil só como aviso editorial no texto dos artigos (travessão, palavras proibidas como "turma, aluno, aula, vaga", "simples", "barato", "pequeno", caixa alta com "!", escassez inventada, pendência interna visível).
- **Cota de pedido manual de indexação**: é limite do Search Console, não de código; priorizar home e produtos.

O que o documento manda EVITAR (resumo): dado inventado; texto escondido; robô vendo outra página; link comprado; página em massa/clonada sem revisão; bloquear robôs de IA; FAQPage com pergunta que não está visível; `noindex` esquecido; arquivo em cache longo sem `?v=`; página sem 404 real; pendência interna e objeção que o visitante não tem na página; autoelogio sem linha onde o concorrente ganha; adjetivos no lugar de números; instalar medidor que contradiga a política de privacidade; medir velocidade no `*.pages.dev`.

---

## 3. As 10 regras mais importantes, em ordem

1. Nada inventado: JSON-LD, preço e texto visível batem entre si, a partir de uma fonte única que gera tela, JSON-LD, llms.txt e llms-full.txt.
2. Title até 60 caracteres, description de 150 a 160, canonical absoluta, `lang="pt-BR"` e um só h1, em toda página.
3. robots.txt liberando busca e IA (GPTBot, OAI-SearchBot, ChatGPT-User, PerplexityBot, ClaudeBot, Google-Extended etc.) com `Sitemap:` declarado; sitemap.xml gerado, com `lastmod` verdadeiro e toda URL com 200.
4. JSON-LD por tipo de página: Organization (`@id` e `sameAs`) + WebSite + WebPage na home; BreadcrumbList nas internas; SoftwareApplication/Product com Offer de preço real no produto; Article com autor e datas, FAQPage só com pergunta visível.
5. Bloco citável: pergunta como subtítulo e primeiro parágrafo de 40 a 60 palavras que responde sozinho; números no lugar de adjetivos.
6. Artigo com resposta de 50 palavras no topo, 800 a 1.500 palavras úteis, no mínimo 3 links internos, JSON-LD, CTA e data; pilar (produto) e filho (artigo) linkados nos dois sentidos, sem página órfã.
7. `/llms.txt` (resumo, o que não é, preço, para quem é, páginas por tema) e `/llms-full.txt`, linkados no rodapé e no sitemap.
8. Publicação limpa na Cloudflare Pages: `404.html` com noindex e 404 real, `_headers` (cache de 1 ano, noindex no `*.pages.dev`, segurança), `?v=<8 letras do MD5>` em todo recurso de cache longo.
9. Desempenho: LCP < 2,5 s, CLS < 0,1, INP < 200 ms no celular, medidos no domínio próprio; `alt`, largura e altura em toda imagem, lazy fora da primeira tela; OG com imagem 1200×630.
10. Confiança e medição: "Atualizado em" visível == `dateModified`, tabela comparativa honesta e "o que não fazemos", bloco "Pergunte a uma IA", IndexNow a cada publicação, Search Console e Bing com sitemap, e linha de base do teste de citação registrada antes de mudar o site.
