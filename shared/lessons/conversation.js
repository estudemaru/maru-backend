import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const everydayLessons = [
  l("daily-order", "Um café, por favor", 6, "Pedir algo numa loja e perguntar o preço.", [
    s("Coisa + をください", "Para pedir algo, diga o nome da coisa + をください. Se precisar chamar alguém antes, comece com すみません.\nÉ simples e funciona em lojas, cafés e restaurantes.", [e("コーヒーをください。", "", "kōhī o kudasai", "Um café, por favor."), e("水をください。", "みずをください。", "mizu o kudasai", "Água, por favor.")]),
    s("Isto, isso e aquilo", "これ é algo perto de quem fala. それ, perto de quem ouve. あれ, longe dos dois.\nNão sabe o nome? Aponte e diga これをください.", [e("これをください。", "", "kore o kudasai", "Quero isto, por favor."), e("これはいくらですか。", "", "kore wa ikura desu ka", "Quanto custa isto?")], "ください não é um “por favor” que se cola em qualquer frase. Ele serve para pedir algo.")
  ], [
    q("Qual frase pede água?", ["水ですか。", "水をください。", "水にいます。"], 1, "水をください pede que lhe deem água."),
    q("Como perguntar o preço de algo perto de você?", ["これはいくらですか。", "これはだれですか。", "これはどこですか。"], 0, "いくら pergunta quanto custa."),
    q("Qual palavra aponta para algo perto de quem fala?", ["それ", "あれ", "これ"], 2, "これ é “isto”, perto de quem fala.")
  ], { route: "sentences", label: "Montar um pedido" }, {
    hook: "Uma frase de três palavras já garante o seu café no Japão.",
    recap: ["Coisa + をください: pedido.", "これ isto · それ isso · あれ aquilo.", "いくらですか: quanto custa?"]
  }),
  l("daily-find", "Onde fica?", 6, "Perguntar onde fica um lugar e entender respostas simples.", [
    s("Lugar + はどこですか", "どこ quer dizer onde. Para perguntar onde fica algo, diga o lugar + はどこですか.\nComece com すみません para chamar a pessoa com educação.", [e("駅はどこですか。", "えきはどこですか。", "eki wa doko desu ka", "Onde fica a estação?"), e("トイレはどこですか。", "", "toire wa doko desu ka", "Onde fica o banheiro?")]),
    s("Aqui, aí e ali", "ここ é aqui; そこ, aí; あそこ, ali. É a mesma lógica de これ, それ, あれ.\nVale aprender também direita (右, みぎ) e esquerda (左, ひだり).", [e("ここです。", "", "koko desu", "É aqui."), e("あそこです。", "", "asoko desu", "É ali."), e("右です。", "みぎです。", "migi desu", "É à direita.")], "Se a resposta vier rápida demais, aponte e pergunte あそこですか? (É ali?).")
  ], [
    q("Qual palavra pergunta “onde”?", ["だれ", "どこ", "いくら"], 1, "どこ pergunta o lugar."),
    q("O que significa ここ?", ["Aqui", "Ontem", "Esquerda"], 0, "ここ é aqui, perto de quem fala."),
    q("Qual palavra significa direita?", ["ひだり", "えき", "みぎ"], 2, "右 (みぎ) é direita; 左 (ひだり) é esquerda.")
  ], null, {
    hook: "Perdido numa estação? Uma pergunta resolve.",
    recap: ["Lugar + はどこですか: onde fica?", "ここ aqui · そこ aí · あそこ ali.", "右 (みぎ) direita · 左 (ひだり) esquerda."]
  }),
  l("daily-help", "Quando faltar uma palavra", 5, "Pedir para repetir, dizer o que você entende e manter a conversa.", [
    s("Pedir ajuda é normal", "Ninguém espera que você entenda tudo. Tenha na ponta da língua frases prontas para pedir que repitam ou falem mais devagar.", [e("もう一度お願いします。", "もういちどおねがいします。", "mō ichido onegai shimasu", "Mais uma vez, por favor."), e("ゆっくり話してください。", "ゆっくりはなしてください。", "yukkuri hanashite kudasai", "Fale devagar, por favor.")]),
    s("Mostre o que você entende", "わかりません quer dizer “não entendo” ou “não sei”. 少しだけ é “só um pouco”.\nCom essas frases, a outra pessoa ajusta o jeito de falar com você.", [e("すみません、わかりません。", "", "sumimasen, wakarimasen", "Desculpe, não entendi."), e("日本語は少しだけわかります。", "にほんごはすこしだけわかります。", "nihongo wa sukoshi dake wakarimasu", "Entendo só um pouco de japonês.")], "Aqui você aprende as frases inteiras. A forma 話して (hanashite) é explicada mais adiante, fora desta trilha introdutória.")
  ], [
    q("Como pedir para repetirem?", ["ありがとうございます。", "もう一度お願いします。", "おやすみなさい。"], 1, "もう一度 quer dizer mais uma vez."),
    q("O que significa ゆっくり?", ["Devagar", "Ontem", "Nunca"], 0, "ゆっくり pede um ritmo mais lento."),
    q("O que expressa わかりません?", ["Entendi tudo", "Vou à escola", "Não entendo / não sei"], 2, "わかりません é a negativa educada de わかります.")
  ], null, {
    hook: "Saber dizer “não entendi” é uma das frases mais úteis de qualquer língua.",
    recap: ["もう一度お願いします: mais uma vez.", "ゆっくり: devagar.", "わかりません: não entendo / não sei."]
  })
];

export const casualLessons = [
  l("casual-register", "Com quem você está falando?", 6, "Diferenciar o jeito educado do informal e escolher pelo contexto.", [
    s("A relação vem antes da frase", "Com desconhecidos, em lojas e no trabalho, comece pelo educado, com です e ます. Entre amigos e família, o informal é comum.\nA escolha depende da relação, do lugar e do que a outra pessoa espera.", [e("ありがとうございます。", "", "arigatō gozaimasu", "Obrigado(a). · educado"), e("ありがとう。", "", "arigatō", "Obrigado(a). · mais casual")]),
    s("Informal não é só cortar palavras", "O jeito informal tem regras próprias. いきますか vira いく？, com a voz subindo no final.\nE cuidado com falas de anime: muitos personagens falam de um jeito exagerado ou bruto de propósito.", [e("明日、行きますか。", "あした、いきますか。", "ashita, ikimasu ka", "Você vai amanhã? · educado"), e("明日、行く？", "あした、いく？", "ashita, iku?", "Vai amanhã? · informal")], "Na dúvida, use o educado. Ninguém se ofende com educação demais.")
  ], [
    q("Com um desconhecido, qual é um bom ponto de partida?", ["Gírias", "Frases com です e ます", "Ordens diretas"], 1, "O educado é o ponto de partida mais seguro."),
    q("Como deixar um verbo informal?", ["Aprendendo a forma simples de cada verbo", "Só apagando o ます", "Colocando ね no final"], 0, "A forma simples tem regras próprias."),
    q("Falas de anime servem para qualquer situação?", ["Sim", "Só se forem longas", "Não, dependem do personagem e do contexto"], 2, "O jeito de um personagem pode soar estranho fora daquele papel.")
  ], null, {
    hook: "O mesmo “obrigado” pode soar educado ou casual. Saber escolher é metade da conversa.",
    recap: ["Desconhecidos e trabalho: です e ます.", "Amigos e família: formas simples.", "Na dúvida, seja educado."]
  }),
  l("casual-slang", "Gírias com contexto", 6, "Entender マジ, やばい e めっちゃ sem tratá-las como traduções fixas.", [
    s("マジ: sério?", "マジ mostra surpresa ou pede confirmação. Entre amigos, マジ？ é um “Sério?!”.\nNuma situação educada, use 本当ですか, “É mesmo?”.", [e("マジ？", "", "maji?", "Sério? · informal"), e("本当ですか。", "ほんとうですか。", "hontō desu ka", "É mesmo? · educado")]),
    s("やばい muda com a situação", "やばい pode ser perigo, problema, algo incrível ou só uma reação forte. É parecido com o nosso “caramba!”.\nO rosto, o tom e a situação dizem se é bom ou ruim.", [e("やばい、遅れる！", "やばい、おくれる！", "yabai, okureru!", "Caramba, vou me atrasar!"), e("このケーキ、やばい！", "", "kono kēki, yabai!", "Esse bolo é incrível! (elogiando)")]),
    s("めっちゃ: muito", "めっちゃ é um “muito” ou “super” bem informal. とても diz o mesmo, de um jeito neutro.\nPrimeiro aprenda a entender; use com quem você já tem intimidade.", [e("めっちゃおいしい。", "", "meccha oishii", "Super gostoso. · informal"), e("とてもおいしいです。", "", "totemo oishii desu", "É muito gostoso. · educado")])
  ], [
    q("Entre amigos, マジ？ pode significar…", ["Bom dia", "Sério?", "Onde?"], 1, "マジ？ é uma reação de surpresa."),
    q("やばい é sempre um elogio?", ["Não, depende do contexto", "Sim", "Só quando escrito em kana"], 0, "Pode ser perigo, problema ou algo incrível."),
    q("Qual palavra é um “muito” mais neutro que めっちゃ?", ["マジ", "やばい", "とても"], 2, "とても quer dizer muito sem a marca de informalidade.")
  ], { route: "expressions", label: "Explorar expressões e gírias" }, {
    hook: "マジ, やばい, めっちゃ: as gírias que você mais vai ouvir em anime e vídeos.",
    recap: ["マジ？: sério?", "やばい: caramba! (bom ou ruim, depende).", "めっちゃ: super. とても: muito (neutro)."]
  }),
  l("casual-culture", "Expressões do dia a dia japonês", 7, "Reconhecer expressões ligadas a momentos do dia e palavras de fã.", [
    s("Antes e depois de comer", "いただきます se diz antes de comer; ごちそうさまでした, depois. São fórmulas de agradecimento pela comida, não traduções exatas de “bom apetite”.", [e("いただきます。", "", "itadakimasu", "Dita antes de comer."), e("ごちそうさまでした。", "", "gochisōsama deshita", "Agradecimento depois de comer.")]),
    s("Entre colegas", "お疲れさまです reconhece o esforço de alguém. Funciona como cumprimento no trabalho, na escola e em atividades em grupo.\nNem sempre quer dizer que a pessoa está cansada.", [e("お疲れさまです。", "おつかれさまです。", "otsukaresama desu", "Cumprimento que reconhece o esforço.")]),
    s("Palavras de fã", "推し (oshi) é o seu favorito: o artista ou personagem que você apoia. ネタバレ (netabare) é spoiler.", [e("ネタバレ注意", "ネタバレちゅうい", "netabare chūi", "Atenção: spoilers"), e("推し", "おし", "oshi", "seu favorito, de quem você é fã")], "Gírias mudam rápido. Isto é um começo para entender, não uma lista de como todo japonês fala.")
  ], [
    q("Quando se diz いただきます?", ["Ao se apresentar", "Antes de comer", "Ao pedir direções"], 1, "É dita antes de começar a refeição."),
    q("ネタバレ significa…", ["Spoiler", "Professor", "Despedida"], 0, "ネタバレ revela uma surpresa da história."),
    q("お疲れさまです pode funcionar como…", ["Uma ordem para dormir", "Uma crítica", "Um cumprimento que reconhece o esforço"], 2, "É muito usada entre colegas de trabalho e de atividades em grupo.")
  ], null, {
    hook: "Algumas frases japonesas não têm tradução exata. Elas têm um momento certo.",
    recap: ["いただきます antes de comer; ごちそうさまでした depois.", "お疲れさまです reconhece o esforço.", "推し é o seu favorito; ネタバレ é spoiler."]
  })
];
