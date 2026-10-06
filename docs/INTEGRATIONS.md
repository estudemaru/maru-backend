# APIs e créditos

## Pronúncia: TTS Quest / VOICEVOX

O Maru solicita a pronúncia quando o aluno toca no botão. O backend consulta
`https://api.tts.quest/v3/voicevox/synthesis`, com a leitura ensinada e `speaker=30`
(No.7, estilo アナウンス: voz adulta de locução, escolhida por soar neutra).
A resposta contém uma URL remota de streaming, reproduzida pelo navegador.
Nenhum modelo de voz, MP3 ou gerador local faz parte do projeto.

- Crédito da voz: **VOICEVOX:No.7**, obrigatório pelos termos do VOICEVOX.
- [Documentação do provedor](https://github.com/ts-klassen/ttsQuestV3Voicevox).
- [Modalidade pública sem chave](https://voicevox.su-shiki.com/su-shikiapis/ttsquest/).
- [Termos VOICEVOX](https://voicevox.hiroshiba.jp/term/).
- [Termos da voz No.7](https://voiceseven.com/#j0400): uso não comercial livre e
  sem pedido prévio, como o Maru gratuito e sem anúncios. Uso comercial (anúncios,
  assinatura, venda) exige licença paga; consulte os termos antes de mudar o modelo.

É necessário acesso à internet. A modalidade pública pode impor espera entre
consultas. O serviço respeita `retryAfter`, informa o intervalo e reutiliza URLs
válidas por dez minutos. A disponibilidade da API não é controlada pelo Maru.

Opcionalmente, defina `TTS_QUEST_API_KEY` no ambiente antes de iniciar o servidor.
A chave permanece no backend. Só trechos do conteúdo de estudo são aceitos;
frases livres digitadas pelo aluno não são enviadas ao provedor de voz.

Os efeitos de acerto e conclusão do Arcade usam osciladores Web Audio no navegador.
São opcionais, independentes da pronúncia e não criam arquivos.

## Identidade: Supabase Auth

O login atual usa e-mail e senha. A API chama Supabase Auth e guarda a sessão
em cookies `HttpOnly`, sem expor a chave de serviço ou os tokens a outras
páginas. Cadastro e recuperação dependem de SMTP próprio e das URLs permitidas
no painel Supabase. Google OAuth existe somente como integração desativada.

- [Senhas e login por e-mail](https://supabase.com/docs/guides/auth/passwords).
- [SMTP próprio para produção](https://supabase.com/docs/guides/auth/auth-smtp).
- [URLs de retorno](https://supabase.com/docs/guides/auth/redirect-urls).

KanjiAPI, KanjiVG e outros recursos usados diretamente pela experiência de
estudo são documentados no repositório `maru-frontend`.

## IA: OpenAI Responses API

A branch inclui correção opcional de frases (`POST /api/ai/phrase`) e dúvidas
sobre a lição (`POST /api/ai/tutor`). Ambos exigem sessão autenticada e origem
permitida. A comparação determinística continua em `/api/phrase/check`.
`GET /api/ai/status` permite ocultar os controles quando não há chave.

O serviço envia apenas a frase com o exercício, ou a pergunta com o conteúdo da
lição. Não envia identidade, progresso ou quiz. Usa saída JSON estruturada,
`store: false`, até 900 tokens de saída e timeout de 25 segundos. `store: false`
não equivale a retenção zero; consulte as políticas de dados da OpenAI.
A resposta da IA pode estar errada; não substitui a revisão pedagógica.

### Ativar no Supabase

1. Aplicar `supabase/migrations/20261006000000_maru_ai_quota.sql`.
2. Configurar `OPENAI_API_KEY` como secret da Edge Function. Nunca guardar a
   chave no Git, no frontend ou em variáveis públicas da Vercel.
3. Opcionalmente configurar `OPENAI_MODEL`; padrão: `gpt-4.1-mini-2025-04-14`.
4. Executar `npm run build:edge` e publicar a função pelo fluxo existente.
5. Publicar o frontend correspondente e testar com uma conta autenticada.

A quota SQL é atômica entre instâncias: 20 solicitações por conta e 500 no total
por dia UTC, somando os dois recursos. Tentativas que chegam ao provedor também
consomem quota, mesmo se falharem. A tabela deve receber limpeza periódica de
linhas antigas. Falhas na quota bloqueiam chamadas ao provedor. No servidor Node,
a quota é apenas em memória e reinicia com o processo; para múltiplas instâncias,
injetar `createSupabaseQuota` ou outra quota persistente. Os limites de solicitações
não constituem um teto financeiro; configurar também limites no projeto OpenAI.

Sem chave, os recursos ficam desativados. Não foi realizado teste pago com uma
chave real: os testes automatizados usam respostas simuladas do provedor.

- https://developers.openai.com/api/reference/overview
- https://developers.openai.com/api/docs/guides/structured-outputs
- https://developers.openai.com/api/docs/models/gpt-4.1-mini
