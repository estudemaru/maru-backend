import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

// Exemplos e atividades próprios do Maru. Referências gramaticais: Irodori,
// Japan Foundation (Starter, lições 5, 14 e 17; Elementary 1, lições 1, 6 e 14).
export const likesLessons = [
  l("likes-preferences", "Diga do que você gosta", 7, "Dizer do que gosta, do que não gosta e perguntar preferências.", [
    s("A coisa de que você gosta vem com が", "Você já conhece が. Com すき, ela marca a coisa de que você gosta: coisa + が + すきです. Para dizer quem gosta, use は: わたしはねこがすきです. Se estiver claro que você fala de si, basta ねこがすきです.\nすき funciona como um adjetivo な, mesmo que em português a tradução use o verbo gostar.", [e("ねこがすきです。", "ねこがすきです。", "neko ga suki desu", "Gosto de gatos."), e("コーヒーがすきです。", "コーヒーがすきです。", "kōhī ga suki desu", "Gosto de café.")]),
    s("Pergunte e responda", "なにがすきですか pergunta “Do que você gosta?”. A resposta pode reaproveitar a mesma estrutura.\nきらいです expressa uma aversão: não gosto, tenho antipatia. É mais forte que すきじゃないです, que apenas nega o gosto.", [e("なにがすきですか。", "なにがすきですか。", "nani ga suki desu ka", "Do que você gosta?"), e("さかながすきじゃないです。", "さかながすきじゃないです。", "sakana ga suki ja nai desu", "Não gosto de peixe."), e("さかながきらいです。", "さかながきらいです。", "sakana ga kirai desu", "Tenho aversão a peixe.")], "Ao falar do gosto de outra pessoa, prefira uma resposta mais suave. Na próxima lição você aprende “não gosto muito”.")
  ], [
    q("Complete: ねこ＿すきです (Gosto de gatos).", ["を", "が", "で"], 1, "Com すき, o que você gosta vem marcado com が: ねこがすきです."),
    q("Como perguntar do que alguém gosta?", ["なにがすきですか。", "どこにいますか。", "いくらですか。"], 0, "なに pergunta o quê; がすきですか pergunta pela preferência."),
    q("Você quer dizer apenas que não gosta de peixe, sem expressar aversão. Qual frase usa?", ["さかながすきです。", "さかながきらいです。", "さかながすきじゃないです。"], 2, "すきじゃないです nega o gosto. きらいです expressa uma aversão mais forte.")
  ], null, { hook: "O que você escolheria: gatos, café ou peixe? Agora conte isso em japonês.", recap: ["Coisa + が + すきです: gosto de…", "なにがすきですか: do que você gosta?", "すきじゃないです nega o gosto; きらいです é mais forte."] }),
  l("likes-degree", "Gosto muito, não gosto tanto", 6, "Usar とても e あまり para falar da intensidade de uma preferência.", [
    s("とても: muito", "Coloque とても antes de すきです para dizer que gosta muito. Ele também acompanha os adjetivos que você já aprendeu: とてもおいしいです, muito gostoso.", [e("ねこがとてもすきです。", "ねこがとてもすきです。", "neko ga totemo suki desu", "Gosto muito de gatos."), e("このパンはとてもおいしいです。", "このパンはとてもおいしいです。", "kono pan wa totemo oishii desu", "Este pão é muito gostoso.")]),
    s("あまり combina com o negativo", "あまり + forma negativa quer dizer “não muito”. コーヒーがあまりすきじゃないです é “não gosto muito de café”.\nCom um adjetivo い, use o negativo que você já conhece: あまりたかくないです, não é muito caro.", [e("コーヒーがあまりすきじゃないです。", "コーヒーがあまりすきじゃないです。", "kōhī ga amari suki ja nai desu", "Não gosto muito de café."), e("この本はあまりたかくないです。", "このほんはあまりたかくないです。", "kono hon wa amari takaku nai desu", "Este livro não é muito caro.")], "Neste uso, あまり pede uma frase negativa. Evite traduzir “gosto muito” como あまりすきです.")
  ], [
    q("Como dizer “Gosto muito de gatos”?", ["ねこがあまりすきです。", "ねこがとてもすきです。", "ねこがすきじゃないです。"], 1, "とても intensifica: ねこがとてもすきです."),
    q("Um amigo oferece café, mas você não gosta muito. O que diz?", ["コーヒーがあまりすきじゃないです。", "コーヒーがとてもすきです。", "コーヒーがすきです。"], 0, "あまり com すきじゃないです expressa “não gosto muito”."),
    q("O que significa この本はあまりたかくないです?", ["Este livro é muito caro.", "Este livro não é meu.", "Este livro não é muito caro."], 2, "あまり com たかくないです suaviza a negação: não é muito caro.")
  ], null, { hook: "Você pode gostar muito de algo ou não gostar tanto, sem falar tudo do mesmo jeito.", recap: ["とても + adjetivo: muito.", "あまり + negativo: não muito.", "あまりすきじゃないです é uma resposta mais suave."] }),
  l("likes-reactions", "Converse com ね e よ", 6, "Compartilhar uma impressão e oferecer uma informação numa conversa.", [
    s("ね: vamos compartilhar esta impressão", "Você já viu ね na unidade de apresentação. Agora use para reagir ao que vocês estão vendo ou provando. É parecido com “né?”: convida a outra pessoa a concordar.", [e("このパンはおいしいですね。", "このパンはおいしいですね。", "kono pan wa oishii desu ne", "Este pão é gostoso, né?"), e("このねこはかわいいですね。", "このねこはかわいいですね。", "kono neko wa kawaii desu ne", "Este gato é fofo, né?")]),
    s("よ: tenho uma informação para você", "よ apresenta uma informação que você oferece ao outro. Pode aparecer numa recomendação: このコーヒーはおいしいですよ, este café é gostoso, viu?\nO tom muda com a situação. Não precisa acrescentar よ a toda frase.", [e("このコーヒーはおいしいですよ。", "このコーヒーはおいしいですよ。", "kono kōhī wa oishii desu yo", "Este café é gostoso, viu?"), e("この本はおもしろいですよ。", "このほんはおもしろいですよ。", "kono hon wa omoshiroi desu yo", "Este livro é interessante, viu?")], "Uma pessoa comenta おいしいですね. Você pode responder そうですね, “é mesmo”, para compartilhar a impressão.")
  ], [
    q("Vocês provam o mesmo pão. Como convidar a pessoa a concordar que ele é gostoso?", ["このパンをおいしいです。", "このパンはおいしいですね。", "このパンはおいしくないです。"], 1, "ね compartilha a impressão e convida a pessoa a concordar."),
    q("Você recomenda um livro que a outra pessoa ainda não leu. Qual final oferece a informação?", ["この本はおもしろいですよ。", "この本はおもしろいですか。", "この本はおもしろくないです。"], 0, "よ oferece uma informação ao outro; か transformaria a frase numa pergunta."),
    q("Alguém diz このねこはかわいいですね. Como concordar?", ["いくらですか。", "なにがすきですか。", "そうですね。"], 2, "そうですね compartilha a opinião: é mesmo, né.")
  ], null, { hook: "Uma preferência pode virar conversa: compartilhe o que achou e recomende algo.", recap: ["ね compartilha uma impressão: né?", "よ oferece uma informação: viu?", "そうですね é uma maneira de concordar."] })
];

export const pastLessons = [
  l("past-nouns", "Era, foi, não era", 7, "Usar でした e じゃありませんでした para falar do passado com substantivos.", [
    s("です vira でした", "Para dizer o que alguém era ou o que uma ocasião foi, troque です por でした. A estrutura com は continua igual.\nきのう quer dizer ontem; きょう, hoje. Essas palavras mostram quando aconteceu.", [e("わたしは学生でした。", "わたしはがくせいでした。", "watashi wa gakusei deshita", "Eu era estudante."), e("きのうは日曜日でした。", "きのうはにちようびでした。", "kinō wa nichiyōbi deshita", "Ontem foi domingo.")]),
    s("No negativo: じゃありませんでした", "Substantivo + じゃありませんでした quer dizer “não era” ou “não foi”. Não acrescente です depois: o final já está completo.\nじゃなかったです também é usado, mas vamos praticar primeiro uma forma só.", [e("わたしは先生じゃありませんでした。", "わたしはせんせいじゃありませんでした。", "watashi wa sensei ja arimasen deshita", "Eu não era professor(a)."), e("きのうは月曜日じゃありませんでした。", "きのうはげつようびじゃありませんでした。", "kinō wa getsuyōbi ja arimasen deshita", "Ontem não foi segunda-feira.")])
  ], [
    q("Qual frase diz “Eu era estudante”?", ["わたしは学生です。", "わたしは学生でした。", "わたしは学生じゃありませんでした。"], 1, "でした é o passado de です depois de um substantivo."),
    q("Como dizer “Ontem não foi segunda-feira”?", ["きのうは月曜日じゃありませんでした。", "きのうは月曜日でした。", "きょうは月曜日です。"], 0, "きのう marca ontem; じゃありませんでした nega no passado."),
    q("O que quer dizer きのうは日曜日でした?", ["Hoje é domingo.", "Ontem não foi domingo.", "Ontem foi domingo."], 2, "きのう é ontem; 日曜日でした diz que foi domingo.")
  ], null, { hook: "Quem você era? Que dia foi ontem? O final da frase agora conta o passado.", recap: ["Substantivo + でした: era / foi.", "Substantivo + じゃありませんでした: não era / não foi.", "きのう é ontem; きょう é hoje."] }),
  l("past-actions", "Conte o que você fez", 7, "Dizer o que fez e o que não fez com ました e ませんでした.", [
    s("ます vira ました", "Na unidade de rotina você conheceu a forma educada dos verbos e viu o passado. Agora pratique: troque ます por ました. たべます vira たべました; のみます vira のみました.\nAs partículas continuam iguais: o objeto com を, o lugar da ação com で.", [e("きのう、パンを食べました。", "きのう、パンをたべました。", "kinō, pan o tabemashita", "Ontem comi pão."), e("きのう、水を飲みました。", "きのう、みずをのみました。", "kinō, mizu o nomimashita", "Ontem bebi água.")]),
    s("O que você não fez", "Para negar uma ação no passado, use ませんでした no lugar de ます. いきます vira いきませんでした.\nNão basta colocar ません: isso é o negativo do presente ou futuro.", [e("きのう、本を読みました。", "きのう、ほんをよみました。", "kinō, hon o yomimashita", "Ontem li um livro."), e("きのう、学校に行きませんでした。", "きのう、がっこうにいきませんでした。", "kinō, gakkō ni ikimasen deshita", "Ontem não fui à escola.")])
  ], [
    q("Como dizer “Ontem bebi água”?", ["きのう、水を飲みます。", "きのう、水を飲みました。", "きのう、水を飲みませんでした。"], 1, "のみます vira のみました para afirmar no passado."),
    q("Ontem você não foi à escola. Qual frase conta isso?", ["きのう、学校に行きませんでした。", "きのう、学校に行きました。", "あした、学校に行きます。"], 0, "いきませんでした é o negativo no passado; あした é amanhã."),
    q("Qual é o passado de 読みます (よみます, leio)?", ["読みません", "読むです", "読みました"], 2, "Na forma educada, troque ます por ました: よみました.")
  ], null, { hook: "Ontem você comeu, bebeu ou leu alguma coisa? Conte o que aconteceu.", recap: ["ます → ました: ação afirmativa no passado.", "ます → ませんでした: ação negativa no passado.", "を, に e で continuam marcando seus papéis na frase."] }),
  l("past-adjectives", "Como estava? Como foi?", 8, "Descrever algo no passado com adjetivos い e な, no afirmativo e no negativo.", [
    s("Adjetivos い: い vira かったです", "たかい vira たかかったです: era caro. おいしい vira おいしかったです: estava gostoso. Retire só o último い.\nいい é uma exceção: no passado, use よかったです, foi bom.", [e("この本はたかかったです。", "このほんはたかかったです。", "kono hon wa takakatta desu", "Este livro era caro."), e("パンはおいしかったです。", "パンはおいしかったです。", "pan wa oishikatta desu", "O pão estava gostoso."), e("よかったです。", "よかったです。", "yokatta desu", "Foi bom.")]),
    s("Adjetivos な: use でした", "Com しずか, basta trocar です por でした: しずかでした, estava tranquilo. きれい também é adjetivo な, apesar de terminar na letra い: きれいでした.", [e("学校はしずかでした。", "がっこうはしずかでした。", "gakkō wa shizuka deshita", "A escola estava tranquila."), e("このまちはきれいでした。", "このまちはきれいでした。", "kono machi wa kirei deshita", "Esta cidade era bonita.")]),
    s("Negue no passado", "No adjetivo い, い vira くなかったです: たかくなかったです, não era caro. No adjetivo な, use じゃありませんでした: しずかじゃありませんでした, não estava tranquilo.", [e("この本はたかくなかったです。", "このほんはたかくなかったです。", "kono hon wa takaku nakatta desu", "Este livro não era caro."), e("学校はしずかじゃありませんでした。", "がっこうはしずかじゃありませんでした。", "gakkō wa shizuka ja arimasen deshita", "A escola não estava tranquila.")])
  ], [
    q("Como dizer que o pão estava gostoso?", ["パンはおいしいでした。", "パンはおいしかったです。", "パンはおいしくないです。"], 1, "おいしい é adjetivo い: retire o último い e acrescente かったです."),
    q("A escola estava tranquila. Qual frase usa?", ["学校はしずかでした。", "学校はしずかったです。", "学校はしずかじゃありませんでした。"], 0, "しずか é adjetivo な: no afirmativo passado, use でした."),
    q("O livro não era caro. Complete: この本は＿＿。", ["たかいでした", "たかかったです", "たかくなかったです"], 2, "O negativo passado de たかい é たかくなかったです."),
    q("Qual é o passado de いいです (é bom)?", ["よかったです", "いかったです", "いいでした"], 0, "いい é uma exceção: a base é よい, por isso o passado é よかったです.")
  ], null, { hook: "O pão estava gostoso? A escola estava tranquila? Conte como as coisas estavam.", recap: ["Adjetivo い: い → かったです; negativo → くなかったです.", "Adjetivo な: でした; negativo じゃありませんでした.", "いい → よかったです; きれい é adjetivo な."] })
];

export const teLessons = [
  l("te-group-two", "A forma て: comece pelo grupo 2", 8, "Reconhecer a forma de dicionário e formar a て dos verbos do grupo 2.", [
    s("Uma forma que liga o verbo a outras ideias", "Você já usa verbos com ます. A forma de dicionário é a forma que aparece ao procurar uma palavra: たべる é comer, みる é ver.\nA forma て vai ligar o verbo a pedidos, sequências e outras expressões. Sozinha, ela não diz se a ação acontece agora ou aconteceu antes.", [e("たべて", "たべて", "tabete", "comer · forma て", "たべる → たべて"), e("みて", "みて", "mite", "ver · forma て", "みる → みて")]),
    s("Grupo 2: retire る e acrescente て", "Nestes verbos, a mudança é simples: たべる → たべて; みる → みて; おきる (acordar) → おきて; ねる (dormir) → ねて.\nVocê também pode partir do ます de um verbo que sabe ser do grupo 2: たべます → たべて.", [e("おきて", "おきて", "okite", "acordar · forma て", "おきる → おきて"), e("ねて", "ねて", "nete", "dormir · forma て", "ねる → ねて")], "Nem todo verbo que termina em る é do grupo 2. Aprenda o grupo junto com o verbo: かえる, voltar, é do grupo 1.")
  ], [
    q("Qual é a forma て de たべる (comer, grupo 2)?", ["たべるて", "たべて", "たべって"], 1, "No grupo 2, retire る e acrescente て: たべる → たべて."),
    q("Qual é a forma て de みる (ver, grupo 2)?", ["みて", "みって", "みるて"], 0, "みる é do grupo 2: retire る, acrescente て."),
    q("O que a forma て sozinha informa sobre o tempo da ação?", ["Sempre indica o passado.", "Sempre indica o futuro.", "Não fixa o tempo; depende da expressão e do contexto."], 2, "A forma て liga ideias. O tempo aparece no final da frase ou no contexto.")
  ], null, { hook: "Uma mudança pequena abre várias maneiras de usar o verbo: たべる vira たべて.", recap: ["Forma de dicionário: たべる, みる, おきる, ねる.", "Grupo 2: retire る e acrescente て.", "O grupo importa: nem todo verbo com る é do grupo 2."] }),
  l("te-group-one", "Grupo 1: escute a mudança", 10, "Formar て ou で a partir da terminação de verbos do grupo 1.", [
    s("う, つ e る viram って", "No grupo 1, olhe o último som da forma de dicionário. う, つ e る viram って:\nかう (comprar) → かって; まつ (esperar) → まって; かえる (voltar) → かえって.\nO っ pequeno marca a pausa antes de te.", [e("かって", "かって", "katte", "comprar · forma て", "かう → かって"), e("まって", "まって", "matte", "esperar · forma て", "まつ → まって"), e("かえって", "かえって", "kaette", "voltar · forma て", "かえる → かえって")]),
    s("む, ぶ e ぬ viram んで", "む, ぶ e ぬ viram んで. のむ (beber) → のんで; よむ (ler) → よんで; よぶ (chamar) → よんで.\nO verbo しぬ (morrer) segue a mesma regra: しんで.\nA forma pode terminar em で: ela funciona como a forma て nas expressões que vamos estudar.", [e("のんで", "のんで", "nonde", "beber · forma て", "のむ → のんで"), e("よんで", "よんで", "yonde", "ler · forma て", "よむ → よんで; よぶ também vira よんで")]),
    s("く, ぐ e す: três caminhos", "く vira いて: かく (escrever) → かいて.\nぐ vira いで: およぐ (nadar) → およいで.\nす vira して: はなす (conversar) → はなして.\nNa próxima lição você conhece a exceção de いく (ir).", [e("かいて", "かいて", "kaite", "escrever · forma て", "かく → かいて"), e("およいで", "およいで", "oyoide", "nadar · forma て", "およぐ → およいで"), e("はなして", "はなして", "hanashite", "conversar · forma て", "はなす → はなして")])
  ], [
    q("Qual é a forma て de まつ (esperar)?", ["まつて", "まって", "まいて"], 1, "No grupo 1, つ vira って: まつ → まって."),
    q("Qual é a forma て de のむ (beber)?", ["のんで", "のむて", "のみて"], 0, "む vira んで: のむ → のんで."),
    q("Qual é a forma て de かく (escrever)?", ["かって", "かくて", "かいて"], 2, "く normalmente vira いて: かく → かいて."),
    q("Complete a dupla: およぐ → ＿＿; はなす → ＿＿。", ["およいで; はなして", "およいて; はなんで", "およって; はなすて"], 0, "ぐ vira いで e す vira して: およいで, はなして.")
  ], null, { hook: "かって, のんで, かいて: o último som mostra qual caminho seguir.", recap: ["う・つ・る → って; む・ぶ・ぬ → んで.", "く → いて; ぐ → いで; す → して.", "A forma terminada em で também entra nas expressões com forma て."] }),
  l("te-irregular", "する, くる e a exceção いく", 7, "Formar して, きて e いって sem aplicar a regra errada.", [
    s("Os dois verbos do grupo 3", "する (fazer) vira して. Ele aparece também em べんきょうする (estudar): べんきょうして.\nくる (vir) vira きて. O som muda: não é くて nem くるて.", [e("して", "して", "shite", "fazer · forma て", "する → して"), e("べんきょうして", "べんきょうして", "benkyō shite", "estudar · forma て", "べんきょうする → べんきょうして"), e("きて", "きて", "kite", "vir · forma て", "くる → きて")]),
    s("いく é do grupo 1, mas vira いって", "Você aprendeu que く normalmente vira いて. O verbo いく (ir) foge dessa regra: sua forma て é いって.\nCompare: かく → かいて, mas いく → いって. O grupo continua sendo 1; é a conjugação deste verbo que é excepcional.", [e("いって", "いって", "itte", "ir · forma て", "いく → いって")])
  ], [
    q("Qual é a forma て de する (fazer)?", ["するて", "して", "すって"], 1, "する é irregular e vira して."),
    q("Qual é a forma て de くる (vir)?", ["きて", "くて", "くるて"], 0, "くる muda para きて. Aprenda essa dupla junto."),
    q("Você vai usar いく (ir) numa expressão com て. Qual forma escolhe?", ["いいて", "いくて", "いって"], 2, "いく é uma exceção do grupo 1: vira いって, com っ pequeno.")
  ], null, { hook: "Três formas aparecem o tempo todo: して, きて e いって.", recap: ["する → して; べんきょうする → べんきょうして.", "くる → きて.", "いく é do grupo 1, mas sua forma て é いって."] }),
  l("te-requests", "Peça uma ação com てください", 7, "Fazer pedidos educados usando a forma て seguida de ください.", [
    s("Forma て + ください", "Você já usa ください ao pedir um café. Para pedir que alguém faça uma ação, coloque o verbo na forma て antes de ください.\nまつ → まって → まってください: espere, por favor. のむ → のんで → のんでください: beba, por favor. Se a forma termina em で, mantenha esse で.", [e("まってください。", "まってください。", "matte kudasai", "Espere, por favor."), e("水をのんでください。", "みずをのんでください。", "mizu o nonde kudasai", "Beba água, por favor.")]),
    s("O resto da frase continua no lugar", "O objeto ainda vem com を: この本をよんでください, leia este livro, por favor.\nVocê pode começar com すみません ao abordar alguém: すみません、ここにきてください. てください é educado, mas o tom e a situação também importam.", [e("この本をよんでください。", "このほんをよんでください。", "kono hon o yonde kudasai", "Leia este livro, por favor."), e("ここにきてください。", "ここにきてください。", "koko ni kite kudasai", "Venha aqui, por favor.")])
  ], [
    q("Como pedir que alguém espere?", ["まつください。", "まってください。", "まちますください。"], 1, "Use a forma て antes de ください: まつ → まってください."),
    q("Você oferece água. Como dizer “Beba água, por favor”?", ["水をのんでください。", "水をのみますください。", "水をのむください。"], 0, "のむ vira のんで; mantenha o で antes de ください."),
    q("O que significa ここにきてください?", ["Eu vim aqui.", "Posso vir aqui?", "Venha aqui, por favor."], 2, "くる vira きて; きてください pede que a outra pessoa venha.")
  ], null, { hook: "Espere, leia, venha: transforme um verbo num pedido que alguém pode atender.", recap: ["Forma て + ください: faça…, por favor.", "まってください; のんでください; きてください.", "O objeto continua com を e o destino com に."] }),
  l("te-sequence", "Uma ação depois da outra", 7, "Usar a forma て para contar uma sequência de ações.", [
    s("A primeira ação liga à próxima", "Coloque a primeira ação na forma て e termine a última com ます ou ました. Nesta lição, a ordem das ações na frase acompanha a ordem em que elas acontecem.\nパンをたべて、学校にいきます: como pão e depois vou à escola.", [e("パンをたべて、学校にいきます。", "パンをたべて、がっこうにいきます。", "pan o tabete, gakkō ni ikimasu", "Como pão e depois vou à escola."), e("水をのんで、本をよみます。", "みずをのんで、ほんをよみます。", "mizu o nonde, hon o yomimasu", "Bebo água e depois leio um livro.")]),
    s("O final mostra o tempo", "A forma て não muda para o passado. É o final da última ação que indica o tempo da sequência. Compare たべて、いきます com たべて、いきました.\nVocê pode ligar mais de duas ações, mantendo só a última no final educado.", [e("パンをたべて、学校にいきました。", "パンをたべて、がっこうにいきました。", "pan o tabete, gakkō ni ikimashita", "Comi pão e depois fui à escola."), e("家にかえって、べんきょうしました。", "いえにかえって、べんきょうしました。", "ie ni kaette, benkyō shimashita", "Voltei para casa e depois estudei.")], "A forma て tem outros usos. Aqui estamos praticando uma sequência de ações, sem tentar traduzir todo “e” do português.")
  ], [
    q("Na frase パンをたべて、学校にいきます, o que acontece primeiro?", ["Ir à escola.", "Comer pão.", "As duas ações acontecem necessariamente juntas."], 1, "Nesta sequência, a ação com て vem primeiro: comer pão, depois ir à escola."),
    q("Você voltou para casa e depois estudou. Qual frase conta isso?", ["家にかえって、べんきょうしました。", "家にかえるて、べんきょうします。", "家にかえって、べんきょうします。"], 0, "かえる vira かえって; しました coloca a sequência no passado."),
    q("Qual parte indica o passado em パンをたべて、学校にいきました?", ["たべて", "を", "いきました"], 2, "A última ação, いきました, fecha a sequência no passado.")
  ], null, { hook: "Sua rotina tem uma ordem. Conte uma ação e ligue à próxima.", recap: ["Primeira ação na forma て, última com ます ou ました.", "O final da frase indica o tempo da sequência.", "のんで e かえって também ligam ações."] }),
  l("te-ongoing", "O que você está fazendo agora?", 8, "Descrever ações em andamento com a forma て seguida de います.", [
    s("Forma て + います", "いま quer dizer agora. Com verbos de ação como comer, beber e ler, a forma て + います descreve o que está acontecendo.\nたべる → たべて → たべています: estou comendo. のむ → のんで → のんでいます: estou bebendo.", [e("いま、パンをたべています。", "いま、パンをたべています。", "ima, pan o tabete imasu", "Agora estou comendo pão."), e("いま、水をのんでいます。", "いま、みずをのんでいます。", "ima, mizu o nonde imasu", "Agora estou bebendo água.")]),
    s("Pergunte o que está acontecendo", "なにをしていますか pergunta “O que você está fazendo?”. Responda com a atividade: べんきょうしています, estou estudando.\nCompare 本をよみます, leio / vou ler um livro, com いま、本をよんでいます, agora estou lendo um livro.", [e("いま、なにをしていますか。", "いま、なにをしていますか。", "ima, nani o shite imasu ka", "O que você está fazendo agora?"), e("本をよんでいます。", "ほんをよんでいます。", "hon o yonde imasu", "Estou lendo um livro."), e("べんきょうしています。", "べんきょうしています。", "benkyō shite imasu", "Estou estudando.")], "ています também pode expressar um estado ou hábito, dependendo do verbo. Aqui praticamos ações em andamento; não traduza toda ocorrência como “estar fazendo”.")
  ], [
    q("Como dizer que você está comendo pão agora?", ["いま、パンをたべました。", "いま、パンをたべています。", "いま、パンをたべてください。"], 1, "たべて + います descreve a ação de comer em andamento."),
    q("Como perguntar o que alguém está fazendo agora?", ["いま、なにをしていますか。", "いま、なにがすきですか。", "きのう、なにをしましたか。"], 0, "なにをしていますか pergunta pela ação em andamento; きのう é ontem."),
    q("Você está lendo. Complete: 本を＿＿。", ["よむいます", "よみています", "よんでいます"], 2, "よむ é do grupo 1: む vira んで. Depois acrescente います.")
  ], null, { hook: "Agora mesmo: você está lendo, comendo ou estudando?", recap: ["Forma て + います pode descrever uma ação em andamento.", "のむ → のんでいます; よむ → よんでいます.", "いま、なにをしていますか: o que você está fazendo agora?"] }),
  l("te-permission", "Posso? Pode? Não pode?", 8, "Pedir permissão e compreender permissões e proibições.", [
    s("Forma て + もいいですか", "Para perguntar se você pode fazer algo, use a forma て + もいいですか. この本をよんでもいいですか: posso ler este livro?\nSem か, てもいいです afirma que a ação é permitida. Com uma forma que termina em で, mantenha esse som: のんでもいいですか.", [e("この本をよんでもいいですか。", "このほんをよんでもいいですか。", "kono hon o yonde mo ii desu ka", "Posso ler este livro?"), e("ここで水をのんでもいいです。", "ここでみずをのんでもいいです。", "koko de mizu o nonde mo ii desu", "Pode beber água aqui.")]),
    s("Forma て + はいけません", "てはいけません indica que uma ação é proibida. Com のんで, fica のんではいけません. O は desta expressão se lê wa.\nVocê pode encontrar esse tipo de frase em regras de um lugar. Ao responder numa conversa, はい、どうぞ é uma maneira simples de permitir: sim, fique à vontade.", [e("ここでたべてはいけません。", "ここでたべてはいけません。", "koko de tabete wa ikemasen", "Não pode comer aqui."), e("ここで水をのんではいけません。", "ここでみずをのんではいけません。", "koko de mizu o nonde wa ikemasen", "Não pode beber água aqui.")], "Não confunda pedidos e permissão: よんでください pede que a outra pessoa leia; よんでもいいですか pergunta se você pode ler.")
  ], [
    q("Você quer ler um livro emprestado. Como pede permissão?", ["この本をよんでください。", "この本をよんでもいいですか。", "この本をよんではいけません。"], 1, "てもいいですか pergunta se você pode fazer a ação; てください pede a ação ao outro."),
    q("Uma placa diz ここでたべてはいけません. O que significa?", ["Não pode comer aqui.", "Pode comer aqui.", "Coma aqui, por favor."], 0, "てはいけません expressa uma proibição."),
    q("Qual frase permite beber água aqui?", ["ここで水をのんではいけません。", "ここで水をのみませんでした。", "ここで水をのんでもいいです。"], 2, "てもいいです permite; como のむ vira のんで, a frase usa のんでもいいです.")
  ], null, { hook: "Ler um livro, beber água, comer: descubra como perguntar o que pode fazer.", recap: ["てもいいですか: posso fazer…?", "てもいいです: pode fazer…", "てはいけません: não pode fazer…; は se lê wa."] })
];
