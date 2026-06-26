# APPZ HUB

Painel SaaS para criação de sites, geração de scripts, busca de clientes e gerenciamento de extensões.

Aplicação 100% front-end (React + Vite + Tailwind CSS), com dados salvos em `localStorage` no navegador. Não depende de backend/servidor.

## Rodar localmente

**Pré-requisito:** Node.js 18+

```bash
npm install
npm run dev
```

Abre em `http://localhost:5173`.

## Build de produção

```bash
npm run build
npm run preview   # para testar o build localmente
```

Os arquivos finais ficam em `dist/`.

## Deploy

### GitHub
1. Crie um repositório novo no GitHub.
2. Suba esta pasta inteira (não precisa subir `node_modules` nem `dist`, já estão no `.gitignore`).

### Vercel
1. Acesse vercel.com e clique em **Add New > Project**.
2. Importe o repositório do GitHub.
3. A Vercel detecta automaticamente o framework **Vite** (configuração já incluída em `vercel.json`).
4. Clique em **Deploy**. Pronto — sem variáveis de ambiente necessárias.

## Acesso ao painel

O login usa uma senha fixa definida em `src/components/Login.tsx` (constante `4080`). Altere esse valor antes de divulgar o link publicamente, se quiser trocar a chave de acesso.
