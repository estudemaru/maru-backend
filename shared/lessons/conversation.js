import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const everydayLessons = [
  l("daily-order", "Um café, por favor", 6, "Fazer um pedido simples e perguntar o preço.", [
    s("Peça com um substantivo + をください", "Este padrão serve para pedir um item. Comece chamando a atenção com すみません, se necessário. Em situações mais formais há outras maneiras de pedir, mas este é um bom ponto de partida.", [e("コーヒーをください。", "", "kōhī o kudasai", "Um café, por favor."), e("水をください。", "みずをください。", "mizu o kudasai", "Água, por favor.")]),
    s("Isto, isso e aquilo", "これ aponta para algo perto de quem fala. それ, perto do interlocutor. あれ, longe dos dois. Para acompanhar um substantivo, use この・その・あの.", [e("これをください。", "", "kore o kudasai", "Quero isto, por favor."), e("これはいくらですか。", "", "kore wa ikura desu ka", "Quanto custa isto?")], "Em um pedido, ください não funciona como um “por favor” que pode ser colado em qualquer frase.")
  ], [
    q("Qual frase pede água?", ["水ですか。", "水をください。", "水にいます。"], 1, "水をください pede que lhe deem água."),
    q("Como perguntar o preço de algo perto de você?", ["これはいくらですか。", "これはだれですか。", "これはどこですか。"], 0, "いくら pergunta quanto custa."),
    q("Qual palavra aponta para algo perto de quem fala?", ["それ", "あれ", "これ"], 2, "これ aponta para algo próximo de quem fala.")
  ], { route: "sentences", label: "Montar um pedido" }),
  l("daily-find", "Encontre seu caminho", 6, "Perguntar onde fica um lugar e reconhecer respostas simples.", [
    s("Onde fica…?", "Use lugar + はどこですか para perguntar a localização. どこ significa onde. Acrescente すみません antes de abordar uma pessoa.", [e("駅はどこですか。", "えきはどこですか。", "eki wa doko desu ka", "Onde fica a estação?"), e("トイレはどこですか。", "", "toire wa doko desu ka", "Onde fica o banheiro?")]),
    s("Aqui, aí e ali", "ここ indica aqui; そこ, aí; あそこ, ali. Também vale aprender direita (右・みぎ) e esquerda (左・ひだり).", [e("ここです。", "", "koko desu", "É aqui."), e("あそこです。", "", "asoko desu", "É ali."), e("右です。", "みぎです。", "migi desu", "É à direita.")])
  ], [
    q("Qual palavra pergunta “onde”?", ["だれ", "どこ", "いくら"], 1, "どこ pergunta a localização."),
    q("O que significa ここ?", ["Aqui", "Ontem", "Esquerda"], 0, "ここ é aqui, perto de quem fala."),
    q("Qual palavra significa direita?", ["ひだり", "えき", "みぎ"], 2, "右 (みぎ) significa direita.")
  ]),
  l("daily-help", "Quando faltar uma palavra", 5, "Pedir repetição, falar sobre compreensão e manter a conversa.", [
    s("Tudo bem pedir ajuda", "Você não precisa fingir que entendeu. Aprenda blocos prontos para pedir repetição e ajustar o ritmo.", [e("もう一度お願いします。", "もういちどおねがいします。", "mō ichido onegai shimasu", "Mais uma vez, por favor."), e("ゆっくり話してください。", "ゆっくりはなしてください。", "yukkuri hanashite kudasai", "Fale devagar, por favor.")]),
    s("Mostre o que você entende", "わかりません expressa que você não entende ou não sabe naquele contexto. 少しだけ significa só um pouco. Essas expressões ajudam a pessoa a adaptar a conversa.", [e("すみません、わかりません。", "", "sumimasen, wakarimasen", "Desculpe, não entendi / não sei."), e("日本語は少しだけわかります。", "にほんごはすこしだけわかります。", "nihongo wa sukoshi dake wakarimasu", "Entendo só um pouco de japonês.")], "Aqui você aprende a expressão inteira. A forma て de 話して será aprofundada depois desta trilha introdutória.")
  ], [
    q("Como pedir que repitam?", ["ありがとうございます。", "もう一度お願いします。", "おやすみなさい。"], 1, "もう一度 significa mais uma vez."),
    q("O que significa ゆっくり?", ["Devagar", "Ontem", "Nunca"], 0, "ゆっくり pede um ritmo lento ou tranquilo."),
    q("O que expressa わかりません?", ["Entendi perfeitamente", "Vou à escola", "Não entendo / não sei, no contexto"], 2, "わかりません é a forma negativa educada de わかります.")
  ])
];

export const casualLessons = [
  l("casual-register", "Com quem você está falando?", 6, "Distinguir formas educadas de informais e escolher pelo contexto.", [
    s("Relação antes da expressão", "Com desconhecidos e em muitas situações de atendimento, comece com です e ます. Entre pessoas próximas, formas informais são comuns. A escolha depende da relação, do ambiente e do que a outra pessoa espera.", [e("ありがとうございます。", "", "arigatō gozaimasu", "Obrigado(a). · educado"), e("ありがとう。", "", "arigatō", "Obrigado(a). · mais casual")]),
    s("Informal não é só cortar palavras", "Formas simples têm regras próprias. 食べます pode virar 食べる na forma afirmativa não passada, mas não basta tirar ます de qualquer verbo. Depois de substantivos, だ pode corresponder a です em uma afirmação simples.", [e("明日、行きますか。", "あした、いきますか。", "ashita, ikimasu ka", "Você vai amanhã? · educado"), e("明日、行く？", "あした、いく？", "ashita, iku?", "Vai amanhã? · informal")], "Falas de personagens podem ser exageradas, bruscas ou marcadas por um papel. Use exemplos de conversa cotidiana como referência.")
  ], [
    q("Com um desconhecido, qual é um bom ponto de partida?", ["Sempre gírias", "Formas com です e ます", "Ordens diretas"], 1, "As formas educadas são um ponto de partida útil."),
    q("Como tornar todo verbo informal?", ["Aprender a forma simples de cada padrão", "Apenas apagar ます", "Acrescentar ね"], 0, "A forma simples exige conhecer as flexões."),
    q("Falas de anime podem ser usadas em qualquer situação?", ["Sim", "Só se forem longas", "Não; precisam de contexto"], 2, "A linguagem de um personagem pode soar inadequada fora daquele papel.")
  ]),
  l("casual-slang", "Gírias com contexto", 6, "Entender マジ, やばい e めっちゃ sem tratar traduções como equivalências fixas.", [
    s("マジ: sério?", "マジ expressa seriedade, surpresa ou confirmação em conversa informal. Entre amigos, マジ？ pode significar “Sério?”. Em uma situação educada, 本当ですか é uma alternativa.", [e("マジ？", "", "maji?", "Sério? · informal"), e("本当ですか。", "ほんとうですか。", "hontō desu ka", "É mesmo? · educado")]),
    s("やばい muda com a situação", "やばい pode descrever perigo, um problema, algo impressionante ou uma reação intensa. Observe a expressão facial, a entonação e o contexto para entender se é positivo ou negativo.", [e("やばい、遅れる！", "やばい、おくれる！", "yabai, okureru!", "Ih, vou me atrasar!"), e("このケーキ、やばい！", "", "kono kēki, yabai!", "Esse bolo é incrível! (num contexto de elogio)")]),
    s("めっちゃ intensifica", "めっちゃ funciona como “muito” ou “super” em conversas informais. とても é uma alternativa mais neutra. Priorize compreender antes de usar com pessoas que você ainda não conhece.", [e("めっちゃおいしい。", "", "meccha oishii", "Muito gostoso. · informal"), e("とてもおいしいです。", "", "totemo oishii desu", "É muito gostoso. · educado")])
  ], [
    q("Entre amigos, マジ？ pode significar…", ["Bom dia", "Sério?", "Onde?"], 1, "マジ？ é uma reação informal de surpresa ou confirmação."),
    q("やばい sempre é um elogio?", ["Não, depende do contexto", "Sim", "Só quando escrito em kana"], 0, "Pode indicar algo ruim, perigo ou uma reação positiva."),
    q("Qual alternativa é mais neutra que めっちゃ?", ["マジ", "やばい", "とても"], 2, "とても expressa muito sem a mesma marca de informalidade.")
  ], { route: "expressions", label: "Explorar expressões e gírias" }),
  l("casual-culture", "Expressões, internet e trabalho", 7, "Reconhecer expressões ligadas a situações e termos frequentes de comunidades.", [
    s("Expressões que acompanham uma ação", "いただきます costuma ser dito antes de comer; ごちそうさまでした, depois. São fórmulas ligadas à refeição, não traduções literais de “bom apetite”.", [e("いただきます。", "", "itadakimasu", "Expressão antes de comer."), e("ごちそうさまでした。", "", "gochisōsama deshita", "Agradecimento depois da refeição.")]),
    s("No trabalho e entre colegas", "お疲れさまです reconhece o esforço e funciona como saudação em contextos de trabalho e atividades compartilhadas. A tradução varia com a situação; nem sempre significa que a pessoa está cansada.", [e("お疲れさまです。", "おつかれさまです。", "otsukaresama desu", "Saudação / reconhecimento do trabalho.")]),
    s("Termos de comunidades", "推し (oshi) é a pessoa ou personagem que alguém apoia ou admira como fã. ネタバレ (netabare) é spoiler. Na internet, 草 (kusa, literalmente grama) pode marcar risada; seu uso depende da comunidade.", [e("ネタバレ注意", "ネタバレちゅうい", "netabare chūi", "Atenção: spoilers"), e("推し", "おし", "oshi", "favorito(a) que você apoia como fã")], "Jargões e gírias mudam. Este é um repertório inicial para entender situações, não uma lista universal de como todo japonês fala.")
  ], [
    q("Quando se costuma dizer いただきます?", ["Ao se apresentar", "Antes de comer", "Ao pedir direções"], 1, "É uma fórmula usada antes de iniciar uma refeição."),
    q("ネタバレ significa…", ["Spoiler", "Professor", "Despedida"], 0, "ネタバレ revela conteúdo que pode estragar uma surpresa narrativa."),
    q("お疲れさまです pode funcionar como…", ["Uma ordem para dormir", "Somente uma crítica", "Saudação e reconhecimento do esforço"], 2, "A expressão depende do contexto de trabalho ou atividade compartilhada.")
  ])
];
