# Guia de Imagens do Portfólio

## Estrutura de Pastas

Todas as imagens do portfólio devem ser colocadas nesta pasta (`assets/portfolio/`).

## Imagens Necessárias

### Sites
1. **sempregestao-preview.png** - Preview do site Sempre Gestão
2. **finagro-site-preview.png** - Preview do site Finagro
3. **lacerda-preview.png** - Preview do site Lacerda e Lacerda
4. **naldobebidas-preview.png** - Preview do site Naldo Bebidas

### Aplicativos
1. **finagro-app-preview.png** - Preview do app Finagro
2. **frotas-app-preview.png** - Preview do app Controle de Frotas
3. **controle-app-preview.png** - Preview do app Controle App
4. **fideliza-app-preview.png** - Preview do app Fideliza
5. **gestao-interna-preview.png** - Preview do app Gestão Interna

## Especificações Recomendadas

### Dimensões
- **Largura:** 800px - 1200px
- **Altura:** 500px - 700px
- **Proporção:** 16:9 ou 4:3

### Formato
- **Preferencial:** PNG (com transparência se necessário)
- **Alternativo:** JPG (para imagens sem transparência)
- **WebP:** Para melhor performance

### Tamanho do Arquivo
- Mantenha o tamanho abaixo de 500KB por imagem
- Otimize as imagens usando ferramentas como:
  - TinyPNG (https://tinypng.com/)
  - Squoosh (https://squoosh.app/)
  - ImageOptim (para Mac)

## Como Adicionar Imagens

1. Tire screenshots dos sites/apps em alta resolução
2. Edite as imagens para mostrar as melhores partes (pode usar mockups)
3. Otimize o tamanho do arquivo
4. Salve com os nomes exatos listados acima
5. Coloque nesta pasta: `assets/portfolio/`

## Dicas para Melhores Previews

### Para Sites:
- Capture a página inicial completa
- Certifique-se de que o conteúdo esteja visível
- Inclua cabeçalho e seções principais
- Use ferramenta de screenshot de página inteira (ex: Awesome Screenshot)

### Para Aplicativos:
- Use mockups de celular para apresentação profissional
- Capture telas principais do app
- Mostre a interface e funcionalidades chave
- Ferramentas recomendadas:
  - Mockuphone (https://mockuphone.com/)
  - Smartmockups (https://smartmockups.com/)
  - Figma (para criar composições)

## Exemplo de Código HTML

Se precisar alterar os caminhos das imagens no código, localize no arquivo `index.html`:

```html
<!-- Exemplo para site -->
<img src="assets/portfolio/sempregestao-preview.png" alt="Sempre Gestão" />

<!-- Exemplo para app -->
<img src="assets/portfolio/finagro-app-preview.png" alt="Finagro App" />
```

## Fallback

Caso não tenha uma imagem específica, você pode:
1. Usar uma imagem placeholder temporária
2. Usar um gradiente com o ícone do projeto
3. Gerar um preview automaticamente com ferramentas online

## Otimização Final

Após adicionar todas as imagens, execute um build para verificar:

```bash
npm run build
```

Verifique o tamanho total da pasta `dist/assets/` para garantir performance otimizada.
