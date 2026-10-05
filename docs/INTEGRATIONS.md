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
