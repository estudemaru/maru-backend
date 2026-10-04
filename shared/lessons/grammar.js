import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const kanjiLessons = [
  l("kanji-meaning", "Kanji: desenhos com significado", 6, "Entender o kanji como parte de palavras, sem decorar uma leitura única.", [
    s("Um kanji, uma ideia", "Um kanji representa uma ideia, não só um som. 山 lembra o desenho de uma montanha; 日 tem a ver com sol e dia.\nO melhor jeito de aprender é sempre dentro de uma palavra de verdade.", [e("山", "やま", "yama", "montanha"), e("日本", "にほん", "Nihon", "Japão"), e("日曜日", "にちようび", "nichiyōbi", "domingo")]),
    s("Por que um kanji tem várias leituras", "Os kanji vieram da China. Por isso, muitos têm dois tipos de leitura:\n• uma de origem chinesa (on'yomi), comum em palavras compostas;\n• uma japonesa (kun'yomi), comum em palavras sozinhas.\nHá muitas exceções. Em vez de adivinhar, aprenda a palavra junto com a leitura.", [e("水", "みず", "mizu", "água · leitura japonesa"), e("水曜日", "すいようび", "suiyōbi", "quarta-feira · aqui 水 se lê sui")], "Não decore listas de leituras. Decore palavras: as leituras vêm junto."),
    s("O hiragana que vem colado", "Muitas palavras misturam kanji e hiragana. Em 食べる, o kanji 食 traz a ideia de comer e べる completa a palavra.\nEsse hiragana colado no kanji se chama okurigana.", [e("食べる", "たべる", "taberu", "comer"), e("食べます", "たべます", "tabemasu", "como / come · forma educada")])
  ], [
    q("Qual é um bom jeito de estudar kanji?", ["Uma leitura fixa para sempre", "Dentro de palavras com significado", "Só contando os traços"], 1, "A leitura depende da palavra; os exemplos dão o contexto."),
    q("Em 水曜日, como se lê o 水?", ["sui", "mizu, sempre", "yama"], 0, "水曜日 é suiyōbi, quarta-feira. Sozinho, 水 é mizu."),
    q("Em 食べる, o que é べる?", ["Outros kanji", "Katakana", "Okurigana"], 2, "É o hiragana que vem colado no kanji e completa a palavra.")
  ], { route: "kanji", label: "Explorar os primeiros kanji" }, {
    hook: "Kanji parecem difíceis, mas cada um é um desenho com significado. E você não precisa aprender todos.",
    recap: ["Kanji carregam ideias e aparecem dentro de palavras.", "Um kanji pode ter várias leituras: aprenda a palavra inteira.", "Okurigana é o hiragana colado no kanji, como em 食べる."]
  }),
  l("kanji-numbers", "一, 二, 三: contando com kanji", 7, "Ler os números de um a dez e conhecer as regras básicas da ordem dos traços.", [
    s("De um a dez", "一 é um traço; 二, dois; 三, três. Depois os desenhos mudam, mas são só dez para aprender.\nAs leituras podem mudar em datas e contagens. Aqui estão as mais comuns para contar.", [e("一　二　三　四　五", "いち　に　さん　よん　ご", "ichi · ni · san · yon · go", "1 · 2 · 3 · 4 · 5"), e("六　七　八　九　十", "ろく　なな　はち　きゅう　じゅう", "roku · nana · hachi · kyū · jū", "6 · 7 · 8 · 9 · 10")]),
    s("A ordem dos traços", "A maioria dos kanji se escreve de cima para baixo e da esquerda para a direita.\nQuando um traço deitado cruza um em pé, o deitado costuma vir primeiro, como em 十.\nSão regras gerais, não leis: siga sempre o modelo animado.", [e("十", "じゅう", "jū", "dez · deitado primeiro, depois em pé"), e("三", "さん", "san", "três · de cima para baixo")], "No Caderno de escrita você compara o seu desenho com o modelo. A comparação é sua: não há correção automática de caligrafia.")
  ], [
    q("Como se lê 三?", ["ni", "san", "ichi"], 1, "三 é três e se lê san."),
    q("Qual é uma leitura comum de 四 ao contar?", ["yon", "go", "roku"], 0, "Yon é a leitura mais comum ao contar. Shi também existe, em situações específicas."),
    q("Por onde começar a escrever 十?", ["Pelo traço em pé", "Por um círculo", "Pelo traço deitado"], 2, "Em 十, o traço deitado vem primeiro.")
  ], { route: "writing", char: "十", label: "Praticar os números" }, {
    hook: "Os primeiros kanji são os mais fáceis: um traço é um, dois traços são dois.",
    recap: ["一 ichi · 二 ni · 三 san … 十 jū.", "De cima para baixo, da esquerda para a direita.", "Em 十, o traço deitado vem primeiro."]
  }),
  l("kanji-nature", "Sol, lua, montanha e rio", 7, "Reconhecer 日, 月, 山, 川, 水 e 木 em palavras simples.", [
    s("A natureza no papel", "Alguns kanji ainda guardam um pouco do desenho original. 山 parece três picos. 川 são linhas de água correndo. 木 é uma árvore com galhos e raízes.\nUse o desenho para lembrar, mas aprenda também a leitura.", [e("山", "やま", "yama", "montanha"), e("川", "かわ", "kawa", "rio"), e("水", "みず", "mizu", "água"), e("木", "き", "ki", "árvore")]),
    s("Sol, lua e a semana", "日 é sol e dia; 月 é lua e mês. Os dias da semana usam esses kanji: 月曜日, segunda-feira, é o “dia da lua”.\nRepare que a leitura muda dentro das palavras.", [e("月", "つき", "tsuki", "lua"), e("月曜日", "げつようび", "getsuyōbi", "segunda-feira"), e("日曜日", "にちようび", "nichiyōbi", "domingo")], "É como no inglês: Monday é o dia da lua e Sunday, o dia do sol.")
  ], [
    q("Qual kanji é montanha?", ["水", "山", "月"], 1, "山 se lê yama e parece três picos de montanha."),
    q("Como se diz água?", ["みず · mizu", "かわ · kawa", "き · ki"], 0, "水 (みず) é água."),
    q("Qual palavra significa segunda-feira?", ["日曜日", "水", "月曜日"], 2, "月曜日 (getsuyōbi), o dia da lua.")
  ], { route: "writing", char: "山", label: "Escrever 山" }, {
    hook: "Estes kanji ainda lembram o desenho original. Dá para ver a montanha em 山!",
    recap: ["山 montanha · 川 rio · 水 água · 木 árvore.", "日 sol e dia · 月 lua e mês.", "月曜日 é segunda; 日曜日 é domingo."]
  })
];

export const sentenceLessons = [
  l("sentence-identity", "Diga quem você é", 6, "Usar A は B です para se apresentar com educação.", [
    s("Assunto + comentário", "わたしは学生です quer dizer “eu sou estudante”.\nわたし é o assunto; は é a etiqueta do assunto (e se lê wa!); 学生です é o que você diz sobre ele. O です fecha a frase com educação.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Eu sou estudante."), e("わたしはブラジル人です。", "わたしはブラジルじんです。", "watashi wa Burajiru-jin desu", "Eu sou brasileiro(a).")]),
    s("O óbvio pode sumir", "Se já está claro que você fala de si, 学生です basta. O japonês adora deixar de fora o que dá para entender pelo contexto.\nNão precisa repetir わたし em toda frase. Na verdade, repetir demais soa estranho.", [e("学生です。", "がくせいです。", "gakusei desu", "Sou estudante. (numa apresentação)")], "です não é igual a todo “ser” e “estar” do português. Aqui ele aparece depois de um substantivo."),
    s("Agora é você", "Monte a sua apresentação: わたしは + o que você é + です.\nNo construtor de frases, monte por blocos e repare na ordem. Depois tente de novo sem olhar.")
  ], [
    q("Como se lê は quando é a etiqueta do assunto?", ["ha", "wa", "ga"], 1, "Como partícula, は se lê wa."),
    q("Qual frase quer dizer “Eu sou estudante”?", ["わたしは学生です。", "学生は水です。", "わたしを学生。"], 0, "わたし + は + 学生 + です forma a apresentação."),
    q("É preciso repetir わたし em toda frase?", ["Sim, sempre", "Só na escrita", "Não, se o contexto deixar claro"], 2, "O japonês deixa de fora o que dá para entender pelo contexto.")
  ], { route: "sentences", label: "Montar minha primeira frase" }, {
    hook: "Sua primeira frase de verdade: dizer quem você é.",
    recap: ["A は B です: A é B.", "は como partícula se lê wa.", "Se está claro, わたし pode sumir."]
  }),
  l("sentence-question", "Pergunte e diga não", 6, "Fazer perguntas com か e negar com じゃないです.", [
    s("Pergunta = か no final", "Para perguntar, coloque か no fim da frase. Só isso! A ordem das palavras não muda.", [e("学生ですか。", "がくせいですか。", "gakusei desu ka", "Você é estudante?"), e("はい、学生です。", "はい、がくせいです。", "hai, gakusei desu", "Sim, sou estudante.")]),
    s("Dizer que não é", "Depois de um substantivo, じゃないです é o “não é” educado do dia a dia.\nではありません diz a mesma coisa, num tom mais formal.", [e("学生じゃないです。", "がくせいじゃないです。", "gakusei janai desu", "Não sou estudante."), e("学生ではありません。", "がくせいではありません。", "gakusei dewa arimasen", "Não sou estudante. (mais formal)")], "Responda com a frase inteira, não só com sim ou não. Assim você treina mais.")
  ], [
    q("Qual partícula transforma a frase em pergunta?", ["を", "か", "の"], 1, "か no final transforma a frase em pergunta."),
    q("Qual frase quer dizer “não sou estudante”?", ["学生じゃないです。", "学生ですか。", "はい、学生です。"], 0, "じゃないです nega a frase."),
    q("Para formar 学生ですか, é preciso…", ["Inverter as palavras", "Trocar para katakana", "Colocar か no final"], 2, "A ordem fica igual; か marca a pergunta.")
  ], { route: "sentences", label: "Praticar perguntas" }, {
    hook: "Uma sílaba transforma qualquer frase em pergunta. Sério, é só uma.",
    recap: ["か no final: pergunta.", "じゃないです: não é (dia a dia).", "ではありません: não é (formal)."]
  }),
  l("sentence-actions", "Conte o que você faz", 7, "Montar frases com objeto + を + verbo.", [
    s("O verbo fecha a frase", "A ordem básica é: quem + o quê + ação. を marca a coisa que recebe a ação e se lê o.\nÁgua + を + bebo. Livro + を + leio.", [e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água."), e("本を読みます。", "ほんをよみます。", "hon o yomimasu", "Leio um livro.")]),
    s("Hábitos e planos", "A forma ます serve para hábitos e para o futuro. ません nega; ました fala do passado.\nUma palavra de tempo, como “todo dia” ou “ontem”, deixa tudo claro.", [e("毎日、勉強します。", "まいにち、べんきょうします。", "mainichi, benkyō shimasu", "Estudo todos os dias."), e("昨日、勉強しました。", "きのう、べんきょうしました。", "kinō, benkyō shimashita", "Estudei ontem."), e("今日は勉強しません。", "きょうはべんきょうしません。", "kyō wa benkyō shimasen", "Hoje não vou estudar.")], "Aprenda os verbos em pares, como 飲む e 飲みます. O jeito de passar de um para o outro muda de verbo para verbo.")
  ], [
    q("Onde costuma ficar o verbo?", ["Sempre no começo", "No final", "Antes de cada substantivo"], 1, "Em 水を飲みます, o 飲みます fecha a frase."),
    q("Qual frase quer dizer “Bebo água”?", ["水を飲みます。", "水は学生です。", "水に読みます。"], 0, "水 é água e 飲みます é bebo."),
    q("O que indica ました?", ["Uma pergunta", "Uma negação no futuro", "O passado, com educação"], 2, "勉強しました conta que o estudo já aconteceu.")
  ], { route: "sentences", label: "Montar frases com ações" }, {
    hook: "Beber, ler, estudar: hora de contar o que você faz no dia a dia.",
    recap: ["Objeto + を + verbo: 本を読みます.", "ます: faço. ません: não faço. ました: fiz.", "Palavras de tempo deixam tudo claro."]
  })
];

export const particleLessons = [
  l("particle-topic", "は, が e も: quem está em foco?", 8, "Distinguir o assunto (は), quem faz (が) e o “também” (も).", [
    s("は apresenta o assunto", "Pense em は como um “falando de…”. O resto da frase comenta esse assunto.\nÀs vezes ele também faz um contraste, dependendo do contexto.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Falando de mim: sou estudante.")]),
    s("が aponta quem", "が marca quem faz ou quem é, principalmente quando isso é a novidade, como na resposta para “quem?”.\nA diferença entre は e が é sutil e vai ficando clara com o uso. Não se cobre por isso agora.", [e("だれが来ますか。", "だれがきますか。", "dare ga kimasu ka", "Quem vem?"), e("田中さんが来ます。", "たなかさんがきます。", "Tanaka-san ga kimasu", "O Tanaka vem. (respondendo quem)")]),
    s("も quer dizer “também”", "も entra no lugar de は ou が e acrescenta a ideia de “também”.", [e("わたしも学生です。", "わたしもがくせいです。", "watashi mo gakusei desu", "Eu também sou estudante.")], "Com 好き (gostar), a coisa de que se gosta costuma vir com が: 音楽が好きです (ongaku ga suki desu), gosto de música.")
  ], [
    q("Qual partícula apresenta o assunto?", ["を", "は", "に"], 1, "は apresenta aquilo de que se fala."),
    q("Como dizer “eu também”?", ["わたしも", "わたしを", "わたしへ"], 0, "も acrescenta o “também”."),
    q("Complete: だれ＿来ますか (Quem vem?)", ["を", "で", "が"], 2, "だれが pergunta quem faz a ação.")
  ], { route: "particles", label: "Consultar as partículas" }, {
    hook: "は, が e も parecem iguais, mas cada uma aponta para um lugar diferente da frase.",
    recap: ["は: “falando de…”.", "が: quem faz ou quem é (a novidade).", "も: também."]
  }),
  l("particle-place", "を, に, へ e で: ação e lugar", 8, "Escolher a partícula certa para objeto, destino, horário e lugar da ação.", [
    s("を: o que recebe a ação", "を marca o objeto: a coisa que você come, bebe ou lê. Ela se lê o, embora no teclado se digite wo.", [e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Como pão.")]),
    s("に e へ: para onde e quando", "に marca o destino: para onde você vai. へ (lida e!) também, com um foco maior na direção.\nに também marca um horário exato: às sete.", [e("学校に行きます。", "がっこうにいきます。", "gakkō ni ikimasu", "Vou para a escola."), e("学校へ行きます。", "がっこうへいきます。", "gakkō e ikimasu", "Vou em direção à escola."), e("七時に起きます。", "しちじにおきます。", "shichiji ni okimasu", "Acordo às sete.")]),
    s("で: onde a ação acontece", "で marca o lugar onde você faz algo, como estudar na biblioteca. Também marca o meio: de trem.\nJá para dizer onde você está, use に: 駅にいます.", [e("図書館で勉強します。", "としょかんでべんきょうします。", "toshokan de benkyō shimasu", "Estudo na biblioteca."), e("駅にいます。", "えきにいます。", "eki ni imasu", "Estou na estação."), e("電車で行きます。", "でんしゃでいきます。", "densha de ikimasu", "Vou de trem.")], "Não traduza todo “em” do mesmo jeito. Pergunte: é destino, é onde estou ou é onde faço algo?")
  ], [
    q("Complete: 水＿飲みます (Bebo água).", ["に", "を", "へ"], 1, "A água é o objeto da ação de beber: を."),
    q("Complete: 図書館＿勉強します (Estudo na biblioteca).", ["で", "を", "へ"], 0, "で marca o lugar onde a ação acontece."),
    q("Como se lê へ quando é partícula?", ["he", "wa", "e"], 2, "A partícula へ se lê e.")
  ], null, {
    hook: "Quatro partículas, quatro perguntas: o quê, para onde, quando e onde.",
    recap: ["を: o quê (objeto).", "に / へ: para onde. に também marca o horário.", "で: onde a ação acontece ou com o quê."]
  }),
  l("particle-connect", "の, と, ね e よ: ligações e jeito de falar", 7, "Expressar posse e companhia, e entender o tom de ね e よ.", [
    s("の liga substantivos", "の liga duas palavras, como o nosso “de”, só que na ordem inversa: わたしの本 é “livro de mim”, meu livro.\nQuem especifica vem antes.", [e("わたしの本", "わたしのほん", "watashi no hon", "meu livro"), e("日本語の先生", "にほんごのせんせい", "nihongo no sensei", "professor(a) de japonês")]),
    s("と: e, com", "と pode ligar uma lista (pão e água) ou mostrar companhia (com um amigo).", [e("パンと水", "パンとみず", "pan to mizu", "pão e água"), e("友達と話します。", "ともだちとはなします。", "tomodachi to hanashimasu", "Converso com um amigo.")]),
    s("ね e よ no final da frase", "ね pede concordância, como um “né?”. よ entrega uma informação nova, como um “viu?”.\nO tom de voz muda bastante o efeito.", [e("いい天気ですね。", "いいてんきですね。", "ii tenki desu ne", "Que tempo bom, né?"), e("おいしいですよ。", "", "oishii desu yo", "É gostoso, viu?")], "Não coloque よ em toda frase: dependendo do tom, soa insistente.")
  ], [
    q("Como dizer “meu livro”?", ["わたしを本", "わたしの本", "わたしで本"], 1, "の liga quem tem à coisa que é tida."),
    q("Em 友達と話します, と indica…", ["Companhia", "Destino", "Objeto"], 0, "A conversa acontece com um amigo."),
    q("Qual partícula pede concordância, como um “né?”?", ["を", "に", "ね"], 2, "ね compartilha uma impressão e convida a pessoa a concordar.")
  ], null, {
    hook: "の, と, ね e よ deixam suas frases mais completas e mais naturais.",
    recap: ["の: de (posse ou relação). わたしの本.", "と: e / com.", "ね: né? · よ: viu?"]
  })
];
