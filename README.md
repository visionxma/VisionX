# VisionX — Site + Painel de Leads

Site institucional da VisionX (Sistemas · Sites · Marketing) com backend Node
que captura os formulários (contato e newsletter) e um painel admin.

## Estrutura
- `site/` — o site (HTML/CSS/JS estáticos, imagens, fontes)
- `server.js` — servidor Node/Express (serve o site + API + painel admin)
- `data/` — leads salvos (`leads.json`, `newsletter.json`) — **não versionar**
- `package.json` — dependências (express)

## Rodar localmente
```bash
cd VisionX
npm install          # (só na primeira vez)
node server.js       # ou: npm start
```
- **Site:** http://localhost:8099
- **Painel admin:** http://localhost:8099/admin

## Login do painel (TROQUE a senha)
Padrão: usuário `admin`, senha `visionx2025`. Rode com variáveis de ambiente:
```bash
ADMIN_USER=alexandre ADMIN_PASS=umaSenhaForte node server.js
```

## Formulários → painel
- **Contato** (página /contact) → salvo em `data/leads.json`
- **Newsletter** (rodapé de todas as páginas) → salvo em `data/newsletter.json`
- O painel mostra os dois e permite **exportar CSV**.

## Publicar (deploy)
Precisa de um host Node (Render, Railway, Fly.io, VPS). Para hospedagem 100%
estática (Vercel/Netlify), os formulários precisariam de funções serverless
ou um serviço de formulário.
