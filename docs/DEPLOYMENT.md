> Domínio atualizado em 29/09/2026: `https://estudemaru.com.br`. Os endereços
> abaixo descrevem a configuração anterior. A aplicação remota continua pendente;
> usar o novo domínio em Site URL, Redirect URLs e `MARU_PUBLIC_ORIGIN` quando o
> DNS estiver ativo. O endereço Vercel real é `maru-frontend-murex.vercel.app`.
> Os valores locais desejados estão em `supabase/config.toml`.

# Supabase: API, Auth e progresso

O endereço previsto para o site é `https://maru-frontend.vercel.app` na Vercel.
Confirme a publicação do Maru nessa URL antes de considerá-la pronta: uma página
de outro projeto ou um `/api/health` com 404 não valida a integração. A API é a
Edge Function `maru-api` do projeto Supabase `qxtgaalmyzyldmcpwooo`; os dados ficam
no Postgres do mesmo projeto. Não há servidor Node ou volume SQLite em produção.

## Banco

O schema está em `supabase/migrations/20260922200355_maru_progress.sql`. A tabela
`public.maru_progress` usa RLS habilitada e não concede acesso direto a `anon`
nem `authenticated`. Só a função com chave de serviço lê e mescla snapshots.
Cada escrita compara a versão para evitar perder uma atualização concorrente.
O aviso do linter sobre RLS sem política é esperado: criar uma política de
acesso direto abriria uma via paralela à validação da função.

Antes de aplicar migrações futuras, confira o histórico remoto e faça backup
do banco no Supabase. Nunca exponha a chave de serviço no frontend, nos commits
ou nos logs.

## Edge Function

```bash
npm ci
npm run check
npm test
npm run build:edge
supabase functions deploy maru-api --project-ref qxtgaalmyzyldmcpwooo
```

O `supabase/config.toml` aponta para o bundle gerado. A função usa
`SUPABASE_URL` e prefere as chaves `default` de `SUPABASE_PUBLISHABLE_KEYS` e
`SUPABASE_SECRET_KEYS` fornecidas pelo Supabase. As chaves legadas
`SUPABASE_ANON_KEY` e `SUPABASE_SERVICE_ROLE_KEY` só são fallback. A chave
secreta fica exclusivamente no servidor. A origem permitida padrão é
`https://maru-frontend.vercel.app`; `MARU_PUBLIC_ORIGIN` pode substituí-la por
outra origem HTTPS exata. O frontend encaminha `/api/*` à função.

Variáveis opcionais da função:

| Variável | Uso |
| --- | --- |
| `MARU_PUBLIC_ORIGIN` | Origem HTTPS do site, sem caminho ou barra final. |
| `MARU_GOOGLE_ENABLED` | `true` somente depois de configurar e testar Google no Supabase Auth. |
| `TTS_QUEST_API_KEY` | Chave da API de pronúncia, se disponível. |

`verify_jwt = false` é intencional: conteúdo e perfis de navegador são públicos.
As contas são validadas com Supabase Auth dentro da função, e escritas verificam
origem e identidade.

## Login por e-mail

Na auditoria de 23/09/2026, Supabase Auth estava com Email habilitado,
cadastro aberto, confirmação de e-mail obrigatória e Google desativado. Antes
de liberar cadastro ao público:

1. Configure um SMTP próprio no painel Supabase Auth. O serviço padrão de e-mail
   do Supabase é restrito a destinatários autorizados e não serve para cadastro
   público. Não coloque a senha SMTP no frontend nem no Git.
2. Defina `https://maru-frontend.vercel.app` como Site URL e inclua a mesma
   origem nas Redirect URLs permitidas em Supabase Auth.
3. Publique a Edge Function desta branch e o frontend correspondente na Vercel.
4. Teste cadastro, confirmação, entrada, recuperação de senha, saída e troca de
   conta em uma janela privada, usando um e-mail externo real.

Os links de confirmação/recuperação entregam tokens no fragmento da URL; o
frontend apaga o fragmento imediatamente, troca o refresh token por uma sessão
e guarda os tokens de sessão em cookies `HttpOnly`, `SameSite=Lax` e `Secure`.
O fluxo de recuperação exige uma nova senha após abrir o link. Sem SMTP, os
formulários podem aparecer, mas e-mails públicos não serão entregues.

Google permanece desativado e não aparece na interface. O código OAuth legado
fica isolado, sem ativação por padrão.

## Dados SQLite antigos

`npm run migrate:sqlite -- --source=/caminho/maru.sqlite` mostra quantos perfis
anônimos podem ser importados. `--apply` os envia usando a chave de serviço do
ambiente privado; o arquivo de origem é preservado. Não migre perfis de contas
antigas automaticamente: primeiro concilie o ID delas com Supabase Auth.

O adaptador local `backend/server.js` e `npm run backup` ainda servem para
verificar ou preservar um SQLite legado. Eles não protegem o Postgres remoto;
configure backups e retenção no próprio projeto Supabase.

## Verificação após publicar

Confira `/api/health`, uma lição sem conta, a gravação de progresso e, se ativo,
login/logout. Falhas da função devem ser investigadas nos logs do Supabase sem
registrar cookies, tokens ou conteúdo privado do usuário.

## Atualização Arcade · 29/09/2026

A aplicação remota está pendente por solicitação da responsável. O CLI instalado
não tinha sessão nesta máquina. Nenhum deploy, mudança de Auth, SMTP ou banco
foi executado nesta alteração.

A política desejada de e-mail está declarada em `supabase/config.toml`, mantendo
confirmação obrigatória e senha mínima de 8 caracteres. Depois de autenticar o
CLI, conferir o projeto e configurar SMTP no painel, aplique a política de Auth
e publique o novo bundle em conjunto com o frontend. O novo campo `arcade` dos
snapshots guarda recordes pessoais; normalização e mesclagem do backend precisam
ser atualizadas antes de validar sincronização entre dispositivos. Não exige
alteração de tabelas.

O cadastro aceita tanto a resposta de confirmação pendente quanto a sessão
imediata retornada pelo Supabase. Recuperação não informa envio bem-sucedido
quando o serviço de e-mail falha ou limita requisições.

Referências oficiais: [autenticação por senha](https://supabase.com/docs/guides/auth/passwords)
e [SMTP próprio](https://supabase.com/docs/guides/auth/auth-smtp).
