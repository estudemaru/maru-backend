# Maru Backend

API do [Maru](https://github.com/maru-japanese), uma plataforma gratuita em
português para aprender japonês. A interface está no repositório
[`maru-frontend`](https://github.com/maru-japanese/maru-frontend).

## Arquitetura

Em produção, a API roda como a Edge Function `maru-api` no projeto Supabase
`qxtgaalmyzyldmcpwooo`. O progresso fica em `public.maru_progress` no Postgres;
contas por e-mail usam Supabase Auth. O frontend estático fica na Vercel e encaminha
`/api/*` à função, preservando uma única origem para o navegador.

`shared/` contém o conteúdo e as regras de estudo. `backend/phraseService.js`,
`speechService.js` é reutilizado pela Edge Function.
O conteúdo de `shared/` deve ser mantido igual ao do `maru-frontend/shared/`;
`npm run check` compara as duas cópias quando os repositórios estão lado a lado.
`backend/server.js`, SQLite e o Dockerfile permanecem somente como adaptador
local e para testes legados; não são a infraestrutura de produção.

## Desenvolvimento

Requer Node.js 22 ou superior. Para usar o adaptador local:

```bash
npm ci
cp .env.example .env
npm run dev
```

Ele responde em `http://127.0.0.1:5173/api/health`. Em outro terminal, rode
`npm run dev` no `maru-frontend`, cujo proxy local usa essa API. O SQLite local
fica em `data/progress/maru.sqlite`; não é sincronizado automaticamente com o
Supabase.

Para gerar o arquivo único da Edge Function:

```bash
npm run build:edge
```

O resultado `supabase/functions/maru-api/bundle.js` é gerado e ignorado pelo Git.
Veja [publicação e configuração](docs/DEPLOYMENT.md).

## API

| Método | Caminho | Responsabilidade |
| --- | --- | --- |
| `GET` | `/api/health` | Estado da API. |
| `GET` | `/api/content` | Conteúdo e currículo. |
| `GET`, `PUT` | `/api/progress` | Leitura e sincronização do progresso. |
| `POST` | `/api/phrase/check` | Verificação de exercícios guiados. |
| `GET` | `/api/ai/status` | Disponibilidade dos recursos de IA. |
| `POST` | `/api/ai/phrase` | Correção com IA; exige login e quota disponível. |
| `POST` | `/api/ai/tutor` | Dúvidas sobre a lição com IA; exige login e quota disponível. |
| `POST` | `/api/audio` | Preparação de pronúncia. |
| `GET` | `/api/account` | Estado da sessão. |
| `POST` | `/api/auth/email/signup` | Cadastro por e-mail; requer confirmação. |
| `POST` | `/api/auth/email/login` | Entrada com e-mail e senha. |
| `POST` | `/api/auth/email/recover` | Envio do link de recuperação. |
| `POST` | `/api/auth/email/complete` | Troca do link confirmado por sessão em cookie. |
| `POST` | `/api/auth/email/password` | Alteração da senha após recuperação. |
| `POST` | `/api/auth/logout` | Encerramento da sessão. |

## IA

O tutor das lições e a correção opcional de frases usam a OpenAI Responses API.
A chave fica no secret `OPENAI_API_KEY` do Supabase; no adaptador local, em `.env`.
O modelo padrão é `gpt-4.1-mini-2025-04-14`. Em produção, os dois recursos
compartilham limites de 20 solicitações por conta e 500 no total por dia UTC.

Backend e frontend foram publicados em 06/10/2026. A chamada real de verificação
retornou `credit_balance_exhausted`: é necessário adicionar créditos à conta da
API antes de validar respostas reais. Veja [configuração e verificação da IA](docs/INTEGRATIONS.md#ia-openai-responses-api).

## Verificação e dados antigos

```bash
npm run check
npm test
```

Para inspecionar uma migração de progresso do SQLite antigo sem alterar nada:

```bash
npm run migrate:sqlite -- --source=/caminho/maru.sqlite
```

Acrescente `--apply` apenas após configurar `SUPABASE_URL` e
`SUPABASE_SERVICE_ROLE_KEY` no ambiente privado. Somente perfis anônimos
`browser-*` são enviados; contas legadas exigem revisão de identidade. O
SQLite original nunca é removido. Consulte [a operação](docs/DEPLOYMENT.md).
