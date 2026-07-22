# VisionX — Site (rebrand do template Eagle)

Site estático e offline, originado do template `https://pagina-8-eagle.vercel.app/`
e **rebrandeado para a VisionX**.

## Rebrand aplicado (VisionX)

- **Nome**: "Eagle" → **VisionX** em todo o site (títulos, alt, footer, schema.org).
- **Logo**: `images/logo.png` = marca "VISIONX" (preta); favicon = "X" branco.
- **Cor de destaque**: verde-limão `#d6fd70` → **ciano `#00d4ff`** (variável
  `--base--green` do tema + `theme-color`). Ajuste central no `custom.css`.
- **Descritor**: "Software House" → "Desenvolvedora de Software".
- **Contato**: e-mail `visionxma@gmail.com`, WhatsApp `+55 (99) 98468-0391`
  (`wa.me/5599984680391`), localização "Maranhão — Brasil".
- **Redes**: Instagram `@visionx.dev`, LinkedIn (perfil VisionX). O slot antigo
  do X/Twitter virou LinkedIn.
- **Rodapé**: © 2026 VisionX + CNPJ 61.427.918/0001-06.

> O layout do template (claro) foi mantido — o logo da VisionX é preto e fica
> perfeito sobre a navbar branca. Não foi feita conversão para tema escuro.

## Tradução e copy (PT-BR)

- **Site 100% em português**, com **acentuação restaurada** em todo o texto
  (o template vinha sem acentos: "voce", "codigo", "solucao"...).
- Traduzidos os trechos que ainda estavam em inglês: hero, página de contato,
  artigo do blog "5 formas de a IA otimizar as operações", datas, cargos,
  rótulos de UI ("Assine nossa newsletter", "/mês", etc.) e placeholders de
  formulário.
- Corrigidas corrupções da tradução automática do template original:
  `flex-comeca` → `flex-start` (137×, consertando alinhamentos quebrados),
  `grid-column-comeca` → `grid-column-start`, além de `comecaup` → `startup`,
  `Mensagems` → `Mensagem` e `enviarting` → `enviar`.

## Faixa de parceiros ("Parcerias de Sucesso")

Substituídas as logos genéricas do template pelas **logos reais de parceiros da
VisionX** (Finagro, IFMA, JP Advocacia, Lacerda, Mentor, SOS Malhas, Sernandes,
iHub, Lok Fácil, Sempre, Genesis, FroX). Como as originais eram brancas (feitas
para o site escuro da VisionX), foram **convertidas para preto e branco** para
aparecerem no fundo claro, com opacidade suave (realçam no hover). Arquivos em
`images/empresas/`.

## O que NÃO foi trocado (copy genérica do template)

Alguns nomes de pessoas em depoimentos/time ainda são placeholders (John Doe,
etc.) e as imagens ilustrativas (cards, avatares) continuam as do template.
Troque conforme o conteúdo/time real da VisionX.

---

Cópia estática e offline do site `https://pagina-8-eagle.vercel.app/`.
Todas as páginas, imagens, fontes, CSS e JS foram baixados e o site funciona
sem depender de nenhum servidor externo (o único recurso de CDN — o checkbox
da CloudFront — foi baixado localmente em `assets/cf/`).

## Conteúdo

- **12 páginas HTML**: home, `/about`, `/blog` (+ 3 posts), `/contact`,
  `/pricing`, `/services` (+ 3 serviços)
- **81 imagens** (`images/`, incluindo `images/cms/`)
- **58 arquivos de fonte** (Inter, Plus Jakarta Sans, Geist Mono) em `_astro/`
- **CSS/JS** bundlados do Astro em `_astro/`
- Favicons e `apple-touch-icon.png`

## Editando o código

Todos os arquivos foram **formatados (beautify)** para ficarem legíveis:

- **HTML** (14 páginas): indentado, uma tag por linha.
- **CSS** (`_astro/*.css`): reindentado (o bundle grande ficou ~12.000 linhas legíveis).
- **JS** (`_astro/*.js`): reformatado (~7.000 linhas). Obs.: é um bundle
  (GSAP + animações); os nomes de variável seguem minificados porque não temos
  o código-fonte original — mas raramente é preciso tocar nele.

### custom.css — mexa aqui, não no bundle

Foi criado o arquivo **`custom.css`** na raiz, carregado por último em todas as
páginas. É o lugar seguro para personalizar (cores, fontes, logo, espaçamentos)
**sem tocar** no CSS gigante. Ele vem vazio (só com exemplos comentados), então
o visual continua idêntico até você editar. Para descobrir a classe de um
elemento, use o inspetor do navegador (botão direito → Inspecionar).

> Backup do estado antes da formatação: `../eagle-clone-backup-preformat.tgz`

## Como visualizar

As páginas usam rotas em diretório (`/about/` → `about/index.html`), então
precisa ser servido a partir da raiz desta pasta (abrir o `index.html` direto
pelo `file://` quebra os caminhos absolutos `/images/...`).

```bash
cd eagle-clone
python3 -m http.server 8099
# abra http://127.0.0.1:8099
```

## Como publicar (Vercel / Netlify / qualquer host estático)

Basta subir o conteúdo desta pasta como um site estático (a raiz do deploy é
esta pasta). Nenhum build é necessário.

## Independência total

- **Zero assets carregados de fora.** Todo `<img>`, CSS, JS, fonte, favicon e a
  imagem `og:image` (`images/og-default.webp`) são servidos localmente.
- O checkbox de formulário da CloudFront foi baixado para `assets/cf/`.
- Todas as URLs que apontavam para o domínio original
  (`temlis-eagle.james-71d.workers.dev`) foram trocadas por caminhos
  **root-relative** (`/images/...`, `/about/`, etc.) — o site adota
  automaticamente o domínio onde for publicado.
- As únicas URLs externas que sobraram são links de navegação (Instagram, X,
  Google Maps do rodapé) e namespaces de XML/JSON-LD (`w3.org`, `schema.org`),
  que nunca são baixados.

## Observações

- `canonical` e `og:url` ficaram como caminhos relativos (`/about/`). Ao publicar
  num domínio final, se quiser SEO/preview de compartilhamento perfeitos, é só
  prefixar o domínio nessas meta tags e no `og:image`.
- 2 imagens (`images/depoimentos-img-1*.avif`) retornam 404 no próprio site
  original — são referências quebradas na origem, não faltam por erro da cópia.
- A página `/404` foi salva (`404.html` e `404/index.html`).
