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

## Login do painel
Defina as credenciais por variável de ambiente — **nunca** deixe a senha no
código ou neste arquivo (o repositório é público):
```bash
ADMIN_USER=seu-usuario ADMIN_PASS='sua-senha-forte' node server.js
```
Sem `ADMIN_PASS`, o `server.js` cai num valor padrão que serve só para rodar na
sua máquina e avisa no console. Em produção o painel só liga com `ADMIN_PASS` e
`ADMIN_SECRET` definidos.

## Painel em produção (Cloudflare Pages)
O painel roda como Pages Function em `/admin`. Configure em
**Settings → Environment variables** do projeto Pages:

| Variável | Para quê |
|---|---|
| `ADMIN_PASS` | senha do painel — **obrigatória**, sem ela `/admin` responde 404 |
| `ADMIN_SECRET` | segredo que assina o cookie de sessão — obrigatória, string longa e aleatória |
| `ADMIN_USER` | opcional, padrão `admin` |
| `SUPABASE_URL` / `SUPABASE_SERVICE_ROLE_KEY` | já usadas pelas Functions públicas |

As imagens enviadas pelo painel vão para o bucket **`uploads`** do Supabase
Storage (público, só tipos de imagem). Workers não têm disco, por isso o upload
não grava mais em `site/images/`.

## Formulários → painel
- **Contato** (página /contact) → salvo em `data/leads.json`
- **Newsletter** (rodapé de todas as páginas) → salvo em `data/newsletter.json`
- O painel mostra os dois e permite **exportar CSV**.

## Publicar (deploy)
Precisa de um host Node (Render, Railway, Fly.io, VPS). Para hospedagem 100%
estática (Vercel/Netlify), os formulários precisariam de funções serverless
ou um serviço de formulário.
