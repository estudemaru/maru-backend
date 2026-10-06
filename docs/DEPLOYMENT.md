# Supabase: API, login e progresso

O endereço principal é `https://estudemaru.com.br`. A Vercel encaminha `/api/*`
à Edge Function `maru-api` do projeto Supabase `qxtgaalmyzyldmcpwooo`. O endereço
alternativo atual é `https://maru-frontend-murex.vercel.app`. A produção usa
Postgres e Supabase Auth; o servidor Node/SQLite serve para desenvolvimento e
preservação de dados antigos.

## Estado verificado em 06/10/2026

O Supabase CLI está autenticado e vinculado ao projeto `qxtgaalmyzyldmcpwooo`.
A migração `20261006000000_maru_ai_quota.sql` foi aplicada e a função `maru-api`
foi publicada com tutor, correção de frases e quota compartilhada. Os secrets da
OpenAI estão configurados no servidor. Na API da função, `/api/health` respondeu
200 e `/api/ai/status` respondeu `enabled: true`; os recursos de IA exigiram
login e rejeitaram outra origem. As permissões da quota foram verificadas.

O frontend correspondente foi publicado na Vercel, com estado **Ready** e alias
`https://estudemaru.com.br`. Deploy:
`https://maru-frontend-d0kxqz3f1-toque-de-mulher.vercel.app`.

A primeira chamada real à OpenAI foi rejeitada por saldo esgotado
(`credit_balance_exhausted`). A responsável adicionará créditos depois;
respostas reais e o fluxo completo com login ainda precisam ser verificados.
As configurações administrativas de Auth, SMTP e Redirect URLs não foram
revalidadas nesta publicação.

## Google, Discord e e-mail

A função lê `/auth/v1/settings` do Supabase com a chave pública disponível no
servidor e informa à interface quais provedores estão habilitados. A consulta
é compartilhada e armazenada por cinco minutos; uma falha temporária é
reavaliada após quinze segundos. Não é necessário repetir os client secrets
Google/Discord no Maru nem manter uma segunda ativação no aplicativo.

Os botões apontam para `/api/auth/google` e `/api/auth/discord`. A autorização
passa pelo Supabase com PKCE. A troca do código e os tokens ficam no servidor,
em cookies `HttpOnly`, `SameSite=Lax` e `Secure`; o frontend recebe apenas a
identidade pública. Ambos os provedores preservam a mesma importação do
progresso visitante e a separação entre contas usadas pelo e-mail.

No Supabase **Authentication → URL Configuration**, o Site URL desejado é
`https://estudemaru.com.br`. A lista completa desejada de Redirect URLs está em
`supabase/config.toml`. Cada origem servida precisa da própria origem e dos
caminhos `/api/auth/google/callback` e `/api/auth/discord/callback`, sem wildcard.
O código só usa origens explícitas na lista permitida, inclusive para escrita
de progresso e e-mails de confirmação/recuperação.

Nos painéis Google/Discord, o callback do provedor deve continuar sendo o
endereço do Supabase: `https://qxtgaalmyzyldmcpwooo.supabase.co/auth/v1/callback`.
Esse endereço é diferente dos callbacks do aplicativo acima.

O cadastro por e-mail admite confirmação pendente ou sessão imediata, conforme
a política do Supabase. A configuração local desejada exige confirmação e
senha mínima de oito caracteres. Para cadastros públicos, conferir SMTP
próprio no painel; o serviço padrão tem restrições de destinatários. Senhas
SMTP e de provedores nunca devem ser colocadas no frontend nem no Git.

Links de confirmação/recuperação têm o fragmento removido da URL antes da troca
de sessão. A recuperação abre a alteração de senha. Falhas e limites do
serviço de e-mail não são apresentados como envio bem-sucedido.

## Edge Function

```bash
npm ci
npm run check
npm test
npm run build:edge
supabase functions deploy maru-api --project-ref qxtgaalmyzyldmcpwooo
```

Os comandos acima são o procedimento de publicação. Publique backend e
frontend correspondentes juntos após verificar o projeto e os
Redirect URLs; o arquivo `supabase/config.toml` não altera o painel sozinho.

A função prefere as chaves `default` de `SUPABASE_PUBLISHABLE_KEYS` e
`SUPABASE_SECRET_KEYS` fornecidas pelo Supabase, usando `SUPABASE_ANON_KEY` e
`SUPABASE_SERVICE_ROLE_KEY` como fallback. A chave secreta permanece no servidor.

| Variável | Uso |
| --- | --- |
| `MARU_PUBLIC_ORIGIN` | Origem HTTPS principal, sem caminho ou barra final; padrão `https://estudemaru.com.br`. Conferir se um valor remoto antigo está sobrescrevendo o padrão. |
| `MARU_ALLOWED_ORIGINS` | Origens adicionais separadas por vírgulas. Padrão: domínio principal, `www` e o endereço Vercel atual. |
| `MARU_GOOGLE_ENABLED`, `MARU_DISCORD_ENABLED` | Fallback opcional quando a consulta de provedores ao Supabase falha; não substituem as definições retornadas pelo Supabase. |
| `TTS_QUEST_API_KEY` | Chave opcional da API de pronúncia. |
| `OPENAI_API_KEY` | Secret da API OpenAI para tutor e correção de frases; somente no servidor. |
| `OPENAI_MODEL` | Modelo da IA; padrão `gpt-4.1-mini-2025-04-14`. |

`verify_jwt = false` é intencional: conteúdo e perfis de navegador são públicos.
A função valida contas no Supabase Auth e rejeita escritas quando a origem ou
a identidade da conta não correspondem à sessão.

## Banco e dados antigos

O schema local `supabase/migrations/20260922200355_maru_progress.sql` habilita
RLS em `public.maru_progress` e não concede acesso direto a `anon` nem
`authenticated`. A função usa a chave de serviço para ler e mesclar snapshots;
cada escrita compara a versão para proteger atualizações concorrentes. Uma
política de acesso direto abriria uma via paralela à validação da função.
Esses são os arquivos locais; a configuração remota não foi revalidada.

O campo `arcade` do snapshot guarda recordes pessoais e não exige nova tabela.
Normalização e mesclagem correspondentes precisam estar publicadas antes de
validar sincronização entre aparelhos.

`npm run migrate:sqlite -- --source=/caminho/maru.sqlite` mostra perfis visitantes
que podem ser importados. `--apply` envia dados usando a chave de serviço do
ambiente privado, preservando a origem. Não migre contas antigas sem conciliar
os IDs com Supabase Auth. O backup SQLite não protege Postgres: configure
backup/retenção e confira o histórico remoto antes de migrações futuras.

## Verificação após publicar

Confira `/api/health` e os três campos de provedores em `/api/account`. Em janela
privada, teste Google, Discord, cadastro e confirmação por e-mail, recuperação,
saída e troca de conta, além de progresso visitante importado uma vez e
sincronizado em outro aparelho. Não registre cookies, tokens ou dados privados.

Referências oficiais: [Google](https://supabase.com/docs/guides/auth/social-login/auth-google),
[Discord](https://supabase.com/docs/guides/auth/social-login/auth-discord),
[PKCE](https://supabase.com/docs/guides/auth/sessions/pkce-flow),
[redirecionamentos](https://supabase.com/docs/guides/auth/redirect-urls) e
[SMTP](https://supabase.com/docs/guides/auth/auth-smtp).
