import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const kanjiLessons = [
  l("kanji-meaning", "Um caractere, mais de uma leitura", 6, "Entender kanji como parte de palavras, sem decorar uma leitura única.", [
    s("Significado e leitura trabalham juntos", "Kanji ajudam a representar palavras e ideias. 日 se relaciona a sol e dia; 山, a montanha. Um caractere pode ter várias leituras. Aprenda uma palavra concreta com ele antes de tentar memorizar uma lista.", [e("山", "やま", "yama", "montanha"), e("日本", "にほん", "Nihon", "Japão"), e("日曜日", "にちようび", "nichiyōbi", "domingo")]),
    s("On e kun, sem complicação", "On'yomi são leituras de origem chinesa adaptadas ao japonês; kun'yomi são leituras associadas a palavras japonesas. É comum ver on em compostos e kun em palavras isoladas, mas há muitas exceções.", [e("水", "みず", "mizu", "água · uma leitura kun"), e("水曜日", "すいようび", "suiyōbi", "quarta-feira · 水 se lê sui")], "Não tente adivinhar toda palavra pela regra. Memorize significado, leitura e um exemplo juntos."),
    s("Os kana que acompanham", "Em 食べる, o kanji 食 se liga ao sentido de comer e べる completa a palavra. Esses kana que acompanham a flexão são chamados de okurigana.", [e("食べる", "たべる", "taberu", "comer"), e("食べます", "たべます", "tabemasu", "como / come · forma educada")])
  ], [
    q("Qual é uma boa forma de estudar kanji?", ["Uma leitura fixa para sempre", "Dentro de palavras com significado", "Somente contando traços"], 1, "A leitura depende da palavra; exemplos dão contexto."),
    q("水 em 水曜日 se lê…", ["sui", "mizu sempre", "yama"], 0, "水曜日 é suiyōbi, quarta-feira."),
    q("Em 食べる, o que são べる?", ["Outros kanji", "Katakana", "Okurigana"], 2, "São kana que acompanham o kanji na palavra.")
  ], { route: "kanji", label: "Explorar os primeiros kanji" }),
  l("kanji-nature", "Kanji que você encontra por aí", 7, "Reconhecer 日・月・山・川・水・木 em palavras simples.", [
    s("Olhe para a natureza", "Associações visuais podem ajudar a lembrar, mas não substituem a leitura. Aprenda 山 (montanha), 川 (rio), 水 (água) e 木 (árvore).", [e("山", "やま", "yama", "montanha"), e("川", "かわ", "kawa", "rio"), e("水", "みず", "mizu", "água"), e("木", "き", "ki", "árvore")]),
    s("Sol, lua e calendário", "日 pode se relacionar a dia e sol; 月, a lua e mês. A leitura muda em palavras do calendário, por isso veja os exemplos como unidades completas.", [e("月", "つき", "tsuki", "lua"), e("月曜日", "げつようび", "getsuyōbi", "segunda-feira"), e("日曜日", "にちようび", "nichiyōbi", "domingo")], "Use as fichas para revisar palavras; use o caderno para praticar a forma.")
  ], [
    q("Qual kanji representa montanha?", ["水", "山", "月"], 1, "山 se lê yama na palavra montanha."),
    q("Como se diz água?", ["みず · mizu", "かわ · kawa", "き · ki"], 0, "水 (みず) é água."),
    q("Qual palavra significa segunda-feira?", ["日曜日", "水", "月曜日"], 2, "月曜日 se lê getsuyōbi.")
  ], { route: "writing", char: "山", label: "Escrever 山" }),
  l("kanji-numbers", "Números e ordem dos traços", 7, "Ler números de um a dez e observar princípios de escrita.", [
    s("De um a dez", "Comece com 一・二・三: um, dois, três. Depois, 四・五・六・七・八・九・十. As leituras de números podem mudar com datas e contadores; aqui usamos formas comuns para contar.", [e("一　二　三　四　五", "いち　に　さん　よん　ご", "ichi · ni · san · yon · go", "1 · 2 · 3 · 4 · 5"), e("六　七　八　九　十", "ろく　なな　はち　きゅう　じゅう", "roku · nana · hachi · kyū · jū", "6 · 7 · 8 · 9 · 10")]),
    s("Escreva com intenção", "Muitos caracteres seguem de cima para baixo e da esquerda para a direita. Em cruzamentos simples, o horizontal costuma vir antes do vertical. São princípios gerais, não uma regra sem exceções. Siga o modelo específico.", [e("十", "じゅう", "jū", "dez · horizontal, depois vertical"), e("三", "さん", "san", "três · de cima para baixo")], "O caderno permite comparar seu desenho com os traços. A comparação é sua; não há reconhecimento automático de caligrafia.")
  ], [
    q("Como ler 三?", ["ni", "san", "ichi"], 1, "三 significa três e se lê san."),
    q("Qual é uma leitura comum de 四 ao contar?", ["yon", "go", "roku"], 0, "Yon é uma leitura comum de quatro; shi também existe em contextos específicos."),
    q("Como começar a escrever 十?", ["Traço vertical", "Um círculo", "Traço horizontal"], 2, "No modelo de 十, o horizontal vem primeiro.")
  ], { route: "writing", char: "十", label: "Praticar os números" })
];

export const sentenceLessons = [
  l("sentence-identity", "Diga quem você é", 6, "Usar A は B です para se apresentar com educação.", [
    s("Um assunto e um comentário", "Em わたしは学生です, わたし é o assunto e 学生です é o que se diz sobre ele. A partícula は marca o tópico e se pronuncia wa. です encerra esta frase de maneira educada.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Eu sou estudante."), e("わたしはブラジル人です。", "わたしはブラジルじんです。", "watashi wa Burajiru-jin desu", "Eu sou brasileiro(a).")]),
    s("O contexto permite omitir", "Quando já está claro que você fala de si, 学生です pode bastar. Japonês costuma omitir informações recuperáveis pelo contexto; não é necessário repetir わたし em toda frase.", [e("学生です。", "がくせいです。", "gakusei desu", "Sou estudante. (no contexto de uma apresentação)")], "です não corresponde a todo uso de “ser” e “estar” em português. Aqui ele aparece depois de um substantivo."),
    s("Tente se apresentar", "No construtor de frases, monte uma apresentação por blocos e observe a ordem. Depois, tente reconstruí-la sem olhar.")
  ], [
    q("Como se pronuncia は quando marca o tópico?", ["ha", "wa", "ga"], 1, "Como partícula de tópico, は se pronuncia wa."),
    q("Qual frase significa “Eu sou estudante”?", ["わたしは学生です。", "学生は水です。", "わたしを学生。"], 0, "わたし + は + 学生 + です forma a apresentação."),
    q("É preciso repetir わたし em toda frase?", ["Sim, sempre", "Só na escrita", "Não, se o contexto deixar claro"], 2, "O japonês permite omitir o que é recuperável pelo contexto.")
  ], { route: "sentences", label: "Montar minha primeira frase" }),
  l("sentence-question", "Pergunte e negue", 6, "Formar perguntas com か e negar frases nominais com じゃないです.", [
    s("Uma pergunta com か", "Nas perguntas educadas introdutórias, acrescente か ao final. Não é preciso inverter a ordem das palavras.", [e("学生ですか。", "がくせいですか。", "gakusei desu ka", "Você é estudante?"), e("はい、学生です。", "はい、がくせいです。", "hai, gakusei desu", "Sim, sou estudante.")]),
    s("Dizer que não é", "Depois de um substantivo, じゃないです é uma negação educada comum na conversa. ではありません é uma alternativa mais formal.", [e("学生じゃないです。", "がくせいじゃないです。", "gakusei janai desu", "Não sou estudante."), e("学生ではありません。", "がくせいではありません。", "gakusei dewa arimasen", "Não sou estudante. (mais formal)")], "Evite responder só com uma tradução literal de sim/não; pratique também a frase que esclarece sua resposta.")
  ], [
    q("Que partícula pode encerrar uma pergunta educada?", ["を", "か", "の"], 1, "か no final sinaliza uma pergunta nesse padrão."),
    q("Qual frase nega “sou estudante”?", ["学生じゃないです。", "学生ですか。", "はい、学生です。"], 0, "じゃないです nega a frase nominal."),
    q("Para formar 学生ですか, precisamos…", ["Inverter estudante e pessoa", "Trocar por katakana", "Acrescentar か ao final"], 2, "A ordem permanece; か marca a pergunta.")
  ], { route: "sentences", label: "Praticar perguntas" }),
  l("sentence-actions", "Conte o que você faz", 7, "Construir frases com objeto + を + verbo e reconhecer formas educadas.", [
    s("O verbo vem no final", "Uma ordem comum é tópico, objeto e verbo. を marca o objeto direto em exemplos como água + beber ou livro + ler. A partícula costuma ser pronunciada o.", [e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água."), e("本を読みます。", "ほんをよみます。", "hon o yomimasu", "Leio um livro.")]),
    s("Presente e futuro dependem do contexto", "A forma ます pode expressar hábito ou uma ação futura. ません nega; ました apresenta uma ação passada; ませんでした nega no passado.", [e("毎日、勉強します。", "まいにち、べんきょうします。", "mainichi, benkyō shimasu", "Estudo todos os dias."), e("昨日、勉強しました。", "きのう、べんきょうしました。", "kinō, benkyō shimashita", "Estudei ontem."), e("今日は勉強しません。", "きょうはべんきょうしません。", "kyō wa benkyō shimasen", "Hoje não vou estudar.")], "A forma de dicionário e a base antes de ます variam conforme o grupo verbal. Aprenda pares como 飲む → 飲みます.")
  ], [
    q("Onde costuma ficar o verbo nesta ordem básica?", ["No começo sempre", "No final", "Antes de cada substantivo"], 1, "Em 水を飲みます, 飲みます fecha a frase."),
    q("Qual frase significa “Bebo água”?", ["水を飲みます。", "水は学生です。", "水に読みます。"], 0, "水 é água e 飲みます é beber na forma educada."),
    q("O que indica ました?", ["Uma pergunta", "Uma negação futura", "Passado educado"], 2, "勉強しました apresenta o estudo como uma ação passada.")
  ], { route: "sentences", label: "Construir frases com ações" })
];

export const particleLessons = [
  l("particle-topic", "は, が e も: o que está em foco?", 8, "Distinguir tópico, identificação e adição em exemplos concretos.", [
    s("は apresenta o tópico", "Pense em は como “quanto a…”. O restante da frase comenta esse tópico. Ele também pode introduzir contraste, conforme o contexto.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Quanto a mim, sou estudante.")]),
    s("が identifica o sujeito", "が marca o sujeito e aparece ao identificar quem ou o que atende a uma pergunta. A diferença entre は e が depende do contexto e vai além de “conhecido versus novo”.", [e("だれが来ますか。", "だれがきますか。", "dare ga kimasu ka", "Quem vem?"), e("田中さんが来ます。", "たなかさんがきます。", "Tanaka-san ga kimasu", "Tanaka vem. (respondendo quem)")]),
    s("も acrescenta “também”", "も pode ocupar o lugar de は ou が nestes exemplos e acrescenta a ideia de também.", [e("わたしも学生です。", "わたしもがくせいです。", "watashi mo gakusei desu", "Eu também sou estudante.")], "Com 好き (gostar), o que se gosta costuma vir com が: 音楽が好きです (ongaku ga suki desu).")
  ], [
    q("Qual partícula apresenta o tópico?", ["を", "は", "に"], 1, "は apresenta aquilo sobre o que se comenta."),
    q("Como dizer “eu também” neste padrão?", ["わたしも", "わたしを", "わたしへ"], 0, "も adiciona o sentido de também."),
    q("Complete: だれ＿来ますか (Quem vem?)", ["を", "で", "が"], 2, "だれが pergunta quem é o sujeito da ação.")
  ], { route: "particles", label: "Consultar as partículas" }),
  l("particle-place", "を, に, へ e で: ação e lugar", 8, "Escolher partículas para objeto, destino, horário e local da ação.", [
    s("を marca o objeto", "Use を para o objeto direto nos exemplos introdutórios. A partícula se pronuncia o, embora seja digitada como wo em muitos teclados.", [e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Como pão.")]),
    s("に e へ: destino e direção", "に marca o destino com verbos de movimento. へ, pronunciado e, destaca a direção. Nestas frases, os dois podem apontar para a escola. に também marca horários específicos.", [e("学校に行きます。", "がっこうにいきます。", "gakkō ni ikimasu", "Vou para a escola."), e("学校へ行きます。", "がっこうへいきます。", "gakkō e ikimasu", "Vou em direção à escola."), e("七時に起きます。", "しちじにおきます。", "shichiji ni okimasu", "Acordo às sete.")]),
    s("で: onde a ação acontece", "Use で para o local de uma ação, como estudar na biblioteca. に aparece com existência e localização em padrões com います ou あります. で também pode marcar um meio, como trem.", [e("図書館で勉強します。", "としょかんでべんきょうします。", "toshokan de benkyō shimasu", "Estudo na biblioteca."), e("駅にいます。", "えきにいます。", "eki ni imasu", "Estou na estação."), e("電車で行きます。", "でんしゃでいきます。", "densha de ikimasu", "Vou de trem.")], "Não traduza toda ocorrência de “em” como a mesma partícula. Observe o papel do lugar.")
  ], [
    q("Complete: 水＿飲みます (Bebo água).", ["に", "を", "へ"], 1, "Água é o objeto direto de beber."),
    q("Complete: 図書館＿勉強します (Estudo na biblioteca).", ["で", "を", "へ"], 0, "で indica onde a ação de estudar acontece."),
    q("Como se pronuncia へ como partícula?", ["he", "wa", "e"], 2, "A partícula へ se pronuncia e.")
  ]),
  l("particle-connect", "の, と, ね e よ: relações e intenção", 7, "Expressar posse, companhia e nuances simples no final da frase.", [
    s("の liga substantivos", "の pode indicar posse ou outra relação entre substantivos. O termo que especifica vem antes.", [e("わたしの本", "わたしのほん", "watashi no hon", "meu livro"), e("日本語の先生", "にほんごのせんせい", "nihongo no sensei", "professor(a) de japonês")]),
    s("と: companhia e enumeração", "と pode ligar substantivos numa lista ou marcar companhia. O contexto e o verbo mostram o papel.", [e("パンと水", "パンとみず", "pan to mizu", "pão e água"), e("友達と話します。", "ともだちとはなします。", "tomodachi to hanashimasu", "Converso com um amigo.")]),
    s("ね e よ no final", "ね costuma buscar acordo ou compartilhar uma percepção. よ pode apresentar informação ao interlocutor ou dar ênfase. Entonação e contexto mudam o efeito.", [e("いい天気ですね。", "いいてんきですね。", "ii tenki desu ne", "O tempo está bom, né?"), e("おいしいですよ。", "", "oishii desu yo", "É gostoso, viu.")], "Evite acrescentar よ mecanicamente a toda frase: dependendo da entonação, pode soar insistente.")
  ], [
    q("Como dizer “meu livro”?", ["わたしを本", "わたしの本", "わたしで本"], 1, "の liga quem possui ao objeto possuído."),
    q("Em 友達と話します, と indica…", ["Companhia", "Destino", "Objeto direto"], 0, "A conversa acontece com um amigo."),
    q("Qual partícula costuma buscar acordo?", ["を", "に", "ね"], 2, "ね pode compartilhar uma percepção ou pedir concordância.")
  ])
];
