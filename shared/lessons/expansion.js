import { lesson as l, section as s, example as e, question as q } from "./helpers.js";

export const additionalLessons = {
  start: [
    l("start-language", "Palavras de gramática, sem susto", 6, "Entender os poucos termos de gramática usados nas explicações.", [
      s("Substantivo: o nome das coisas", "Água, livro e estudante dão nome a coisas e pessoas. São substantivos.\nEm japonês, みず é água e ほん é livro. A escrita é nova, mas a ideia você já conhece.\nE repare em duas coisas diferentes: a leitura é como se fala (mizu); a tradução é o que significa (água).", [e("水", "みず", "mizu", "água"), e("本", "ほん", "hon", "livro")], "Leitura é o som. Tradução é o significado."),
      s("Verbo: a ação", "Beber, comer e ler são ações. As palavras de ação se chamam verbos.\nAquilo que recebe a ação, como a água que eu bebo, se chama objeto.\nE no japonês, lembra? O verbo fica no final.", [e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água.", "水 = água, o objeto; を = etiqueta do objeto; 飲みます = bebo.")]),
      s("Partícula: a etiqueta", "Partícula é uma palavrinha curta que vem depois de outra e mostra o papel dela.\nは marca o assunto; を marca o objeto. Ao longo da trilha você conhece outras.\nSe um termo parecer estranho, abra “Em outras palavras”, logo abaixo da explicação.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Eu sou estudante.", "わたし = eu; は = falando de mim; 学生 = estudante; です fecha a frase com educação.")])
    ], [
      q("O que é a “leitura” de uma palavra?", ["Como ela é pronunciada", "Quantos traços ela tem", "A tradução dela"], 0, "Leitura é o som. 水 se lê mizu e significa água."),
      q("Em 水を飲みます, o que é bebido?", ["飲みます", "水", "を"], 1, "水 é água. を vem logo depois e mostra que a água é o objeto da ação de beber."),
      q("Onde fica o verbo nas frases simples?", ["Sempre no começo", "Antes do objeto", "No final da frase"], 2, "Água + を + bebo: 水を飲みます. Aos poucos essa ordem fica natural.")
    ], { route: "glossary", label: "Abrir o glossário" }, {
      hook: "Esqueceu as aulas de português? Sem problema: você só precisa de quatro palavrinhas.",
      recap: ["Substantivo dá nome; verbo é a ação; objeto recebe a ação.", "Partícula é a etiqueta que vem depois da palavra.", "Leitura é o som; tradução é o significado."]
    }),
    l("start-study", "Como estudar sem se perder", 5, "Montar uma rotina curta com leitura, escuta, escrita e revisão.", [
      s("Pouco, mas de verdade", "Escolha cinco letras, não a tabela inteira. Olhe, ouça, diga em voz alta e tente lembrar sem olhar.\nÉ o esforço de lembrar sozinho que faz a memória crescer. Errar no caminho faz parte.\nSe o áudio parecer rápido, deixe mais lento em Meu ritmo.", [e("あいうえお", "", "a i u e o", "As cinco vogais: um ótimo primeiro grupo")]),
      s("Escrever ajuda a enxergar", "Um traço é cada movimento que você faz antes de levantar o lápis.\nNo Caderno de escrita, você vê a ordem dos traços e desenha por cima. Nas folhas para imprimir, cubra o modelo e tente sozinho.\nNão precisa de nada especial: lápis, papel e cinco minutos.", [], "Escreva e diga o som ao mesmo tempo. Mão e boca juntas lembram melhor."),
      s("Romaji é rodinha de bicicleta", "Use o romaji no começo e vá escondendo quando reconhecer as letras. Dá para desligar em Meu ritmo.\nPara digitar em japonês, ative o teclado japonês do celular ou do computador: ka vira か e kka vira っか. Nos jogos do Maru, você também pode digitar em romaji.\nE volte sempre: os jogos e a revisão trazem de volta o que você está quase esquecendo.", [e("か", "", "ka", "Digite ka e veja virar か."), e("がっこう", "", "gakkō", "escola", "Digite gakkou para escrever がっこう.")])
    ], [
      q("Qual é um bom começo?", ["Decorar todos os kanji hoje", "Praticar cinco letras e tentar lembrar sem olhar", "Ler só romaji para sempre"], 1, "Um grupo pequeno deixa espaço para ouvir, escrever e testar a memória."),
      q("O que é um traço?", ["Cada movimento antes de levantar o lápis", "Uma palavra inteira", "Um som longo"], 0, "Um caractere pode ter vários traços, cada um com direção e posição."),
      q("Para que serve voltar ao que você já estudou?", ["Para travar as próximas lições", "Para apagar os erros", "Para lembrar antes de esquecer"], 2, "Rever em intervalos ajuda a memória, principalmente nos itens difíceis.")
    ], { route: "worksheets", label: "Preparar uma folha de escrita" }, {
      hook: "O segredo não é estudar muito de uma vez: é voltar todo dia um pouquinho.",
      recap: ["Estude grupos pequenos e tente lembrar sem olhar.", "Escrever e falar ao mesmo tempo ajuda a memória.", "Use o romaji como apoio e vá tirando aos poucos."]
    })
  ],
  hiragana: [l("h-words", "Lendo palavras de verdade", 6, "Ler palavras do dia a dia em hiragana, prestando atenção às pausas e às vogais esticadas.", [
    s("Uma letra por vez, depois a palavra", "Em ねこ, leia ね (ne) e こ (ko), depois junte: neko, gato.\nEm português, às vezes colocamos um i que não existe, como em “adevogado”. Em japonês, cada letra já traz a sua vogal: さかな é sa-ka-na, e pronto.", [e("ねこ", "", "neko", "gato"), e("いぬ", "", "inu", "cachorro"), e("さかな", "", "sakana", "peixe")]),
    s("Letra pequena, palavra diferente", "Compare きや e きゃ. No primeiro, ki e ya têm uma batida cada. No segundo, o ゃ pequeno se junta ao き: kya, uma batida só.\nE o っ pequeno guarda uma pausinha: em きって, segure o t um instante.", [e("きって", "", "kitte", "selo"), e("きょう", "", "kyō", "hoje", "きょ é um som combinado; o う estica o o.")]),
    s("Conte as batidas", "おばさん é tia; おばあさん é avó. O あ a mais estica a vogal e muda a palavra.\nEm がっこう são quatro batidas: が・っ・こ・う. Bata palmas enquanto lê.", [e("おばさん", "", "obasan", "tia"), e("おばあさん", "", "obāsan", "avó")], "A duração faz parte da palavra. Não é só um jeito de falar mais devagar.")
  ], [
    q("Qual palavra significa gato?", ["ねこ", "いぬ", "さかな"], 0, "ね + こ = neko, gato. いぬ é cachorro e さかな é peixe."),
    q("Como ler o っ de きって?", ["Como um tsu completo", "Como uma pausinha antes do t", "Como uma vogal esticada"], 1, "O っ pequeno ocupa uma batida em silêncio e prepara a consoante seguinte: kit-te."),
    q("O que muda entre おばさん e おばあさん?", ["Só a letra latina", "Nada na pronúncia", "A duração da vogal e o significado"], 2, "O あ a mais estica a vogal: tia e avó são palavras diferentes.")
  ], { route: "vocabulary", label: "Ler mais palavras" }, {
    hook: "Hora de ver o hiragana funcionando em palavras que você vai encontrar de verdade.",
    recap: ["Leia letra por letra e depois junte a palavra.", "Letra pequena muda tudo: きゃ e っ.", "Vogal esticada muda o significado: おばさん e おばあさん."]
  }),
  l("h-dialogue", "Uma cena só em hiragana", 6, "Ler uma cena curta usando só hiragana, com apoio de imagens.", [
    s("Antes da cena", "Veja de novo duas palavras, agora com imagem. Cubra a leitura e tente lembrar antes de olhar.", [e("ねこ", "", "neko", "gato", "", "cat"), e("いぬ", "", "inu", "cachorro", "", "dog")]),
    s("A cena, uma fala por vez", "Duas pessoas encontram um gato na rua. Nenhuma fala usa kanji: é tudo hiragana, como num livro para quem está começando a ler.\nLeia devagar, ouça o áudio se precisar e use as imagens como apoio.", [e("すみません。ねこがいます。", "", "sumimasen. neko ga imasu.", "Com licença. Tem um gato aqui.", "", "cat"), e("かわいいですね。", "", "kawaii desu ne.", "Que fofo, né?"), e("みずをのみます。", "", "mizu o nomimasu.", "Ele bebe água.", "", "water")]),
    s("Você já lê mais do que imagina", "Se você entendeu a cena, seu hiragana já está funcionando. Se travou em alguma fala, volte e leia de novo: não há pressa.", [], "Cubra a tradução e tente entender cada fala só pelo japonês.")
  ], [
    q("O que すみません。ねこがいます。 informa?", ["Um pedido de silêncio", "Que tem um gato ali", "Que o gato bebeu água"], 1, "すみません chama a atenção; ねこがいます avisa que tem um gato."),
    q("Qual palavra combina com a imagem do copo de água?", ["みず", "ねこ", "いぬ"], 0, "みず (mizu) é água. ねこ é gato e いぬ é cachorro."),
    q("かわいいですね expressa…", ["Um pedido para repetir", "Uma pergunta sobre o preço", "Um comentário de que algo é fofo"], 2, "かわいい é fofo; ね chama a outra pessoa para concordar.")
  ], { route: "vocabulary", label: "Reconhecer mais palavras em hiragana" }, {
    hook: "Sua primeira cena inteira em japonês, sem nenhum kanji.",
    recap: ["ねこがいます: tem um gato.", "かわいいですね: que fofo, né?", "Você leu uma cena inteira só em hiragana."]
  })],
  katakana: [l("k-real-words", "Katakana no mundo real", 6, "Ler palavras emprestadas sem supor que têm o mesmo sentido do inglês.", [
    s("Reconheça, mas confira", "O katakana adapta palavras de fora aos sons do japonês. カメラ (kamera) é câmera e ホテル (hoteru) é hotel.\nMas cuidado: às vezes o sentido muda. マンション parece “mansão”, mas é um prédio de apartamentos.", [e("カメラ", "", "kamera", "câmera"), e("ホテル", "", "hoteru", "hotel"), e("マンション", "", "manshon", "apartamento / prédio de apartamentos")]),
    s("Palavras que encolhem", "O japonês adora encurtar palavras compridas. パソコン vem de “personal computer” e quer dizer computador. コンビニ vem de “convenience store”, a lojinha de conveniência.\nNão precisa reconstruir o inglês: aprenda a palavra japonesa junto com a situação.", [e("パソコン", "", "pasokon", "computador"), e("コンビニ", "", "konbini", "loja de conveniência")]),
    s("Letras pequenas, sons novos", "ティ junta テ com um ィ pequeno para fazer ti. カフェ se lê kafe, porque フェ é fe.\nE o ー estica a vogal anterior, como nos dois esticados de コーヒー.", [e("ティー", "", "tī", "chá, em nomes e cardápios"), e("カフェ", "", "kafe", "cafeteria"), e("コーヒー", "", "kōhī", "café, a bebida")])
  ], [
    q("O que significa コンビニ?", ["Convenção", "Loja de conveniência", "Biblioteca"], 1, "É a forma curta de “convenience store”, muito comum no Japão."),
    q("Como se lê ティ?", ["ti", "te-i, em duas batidas", "chi"], 0, "O ィ pequeno se junta ao テ para fazer ti."),
    q("Uma palavra em katakana tem sempre o sentido do inglês?", ["Sim", "Só se for curta", "Não, o sentido pode mudar"], 2, "Aprenda o uso japonês. マンション é um ótimo exemplo de como a tradução literal engana.")
  ], null, {
    hook: "Hotel, câmera, computador: o katakana está em todo lugar no Japão.",
    recap: ["Katakana adapta palavras de fora aos sons do japonês.", "O sentido pode mudar: マンション é prédio, não mansão.", "O japonês adora encurtar: パソコン, コンビニ."]
  }),
  l("k-dialogue", "Peça um café, com apoio de imagens", 6, "Ler um pedido curto numa cafeteria, reconhecendo palavras em katakana.", [
    s("Dois itens do cardápio", "コーヒー e ケーキ são escritos em katakana porque vieram de outras línguas. Veja a imagem antes e tente reconhecer o som.", [e("コーヒー", "", "kōhī", "café", "", "coffee"), e("ケーキ", "", "kēki", "bolo", "", "cake")]),
    s("O pedido, do começo ao fim", "A cena usa katakana para as palavras de fora e hiragana para o resto. Imagine uma cafeteria pequena e leia cada fala.", [e("コーヒーをください。", "", "kōhī o kudasai", "Um café, por favor.", "", "coffee"), e("ケーキもいかがですか。", "", "kēki mo ikaga desu ka", "Aceita um bolo também?", "", "cake"), e("はい、お願いします。", "はい、おねがいします。", "hai, onegai shimasu", "Sim, por favor.")]),
    s("Reconhecer vem antes de decorar", "Você não precisa decorar a cena. O objetivo é reconhecer コーヒー e ケーキ rapidinho, mesmo lendo o resto devagar.", [], "Procure outras palavras emprestadas no dia a dia e tente lê-las em voz alta.")
  ], [
    q("Qual palavra veio de outra língua e está em katakana?", ["コーヒー", "ください", "です"], 0, "コーヒー (café) veio de outra língua, por isso é escrita em katakana."),
    q("ケーキもいかがですか pergunta…", ["Se você tem trocado", "Se você quer um bolo também", "Se o café está bom"], 1, "も quer dizer também; いかがですか oferece algo com educação."),
    q("Como aceitar com educação?", ["いいえ、結構です。", "さようなら。", "はい、お願いします。"], 2, "はい、お願いします aceita o que foi oferecido com educação.")
  ], { route: "vocabulary", label: "Reconhecer mais palavras em katakana" }, {
    hook: "Você já consegue ler um pedido de café de verdade.",
    recap: ["コーヒーをください: um café, por favor.", "も quer dizer “também”.", "はい、お願いします aceita com educação."]
  })],
  kanji: [l("kanji-parts", "Peças que se repetem", 7, "Usar as partes de um kanji como pista para lembrar, sem adivinhar leituras.", [
    s("Um kanji pode ter peças conhecidas", "木 é árvore. Em 林 e 森, dá para ver o 木 repetido: duas árvores viram um bosque, três viram uma floresta.\nEnxergar as peças ajuda a dividir um desenho complicado em partes menores. É uma pista para lembrar, não uma regra que sempre funciona.", [e("木", "き", "ki", "árvore"), e("林", "はやし", "hayashi", "bosque"), e("森", "もり", "mori", "floresta")]),
    s("O radical organiza o dicionário", "Os dicionários agrupam os kanji por uma peça chamada radical.\nPor exemplo, os três pinguinhos 氵 do lado esquerdo costumam aparecer em palavras ligadas à água. É uma boa pista, mas não uma tradução automática.", [e("海", "うみ", "umi", "mar", "O lado esquerdo 氵 tem a ver com 水, água.")]),
    s("Aprenda a palavra inteira", "Em 日本, o 日 não se lê hi. A palavra inteira se lê Nihon, Japão. Em 日本語, o 語 acrescenta a ideia de língua: Nihongo, a língua japonesa.\nDecore a palavra junto com a leitura. Quem decora uma leitura só por kanji se confunde depois.", [e("日本", "にほん", "Nihon", "Japão"), e("日本語", "にほんご", "Nihongo", "língua japonesa")])
  ], [
    q("Reconhecer as peças de um kanji ajuda a…", ["Saber sempre a leitura", "Organizar e lembrar a forma", "Dispensar o vocabulário"], 1, "As peças ajudam a lembrar o desenho, mas não garantem leitura nem significado."),
    q("Como se lê 日本語?", ["hi hon go", "ki go", "Nihongo"], 2, "Aprenda a palavra inteira: 日本語, Nihongo, a língua japonesa."),
    q("Para que serve o radical?", ["Para organizar a busca no dicionário", "É um alfabeto separado", "É uma tradução para o português"], 0, "O radical organiza o dicionário. Nem toda peça que você reconhece é o radical.")
  ], null, {
    hook: "Kanji grandes são feitos de peças pequenas. Aprenda a enxergá-las.",
    recap: ["木 árvore, 林 bosque, 森 floresta: peças que se repetem.", "O radical organiza o dicionário e dá pistas.", "Aprenda a palavra inteira: 日本語 é Nihongo."]
  })],
  sentences: [
    l("sentence-time", "Ontem, hoje e amanhã", 8, "Reconhecer as quatro formas educadas dos verbos: faço, não faço, fiz e não fiz.", [
      s("Uma forma para agora e para depois", "食べます (tabemasu) pode ser “como” ou “vou comer”. Quem diz quando é o contexto, com palavras como “todo dia” ou “amanhã”.\nE o verbo não muda para eu, você ou nós. Bem mais simples que o português!", [e("毎日パンを食べます。", "まいにちパンをたべます。", "mainichi pan o tabemasu", "Como pão todos os dias."), e("明日パンを食べます。", "あしたパンをたべます。", "ashita pan o tabemasu", "Vou comer pão amanhã.")]),
      s("Troque o final", "Partindo de 食べます, é só trocar o final:\n• ません: não como / não vou comer\n• ました: comi\n• ませんでした: não comi", [e("肉を食べません。", "にくをたべません。", "niku o tabemasen", "Não como carne."), e("昨日パンを食べました。", "きのうパンをたべました。", "kinō pan o tabemashita", "Comi pão ontem."), e("昨日パンを食べませんでした。", "きのうパンをたべませんでした。", "kinō pan o tabemasen deshita", "Não comi pão ontem.")], "Isso vale para qualquer verbo que você já conheça na forma ます."),
      s("Pergunte com か", "昨日 (kinō) é ontem; 明日 (ashita) é amanhã. Leia a palavra de tempo e depois o final do verbo.\nPara perguntar, coloque か no fim. Na resposta, basta repetir o verbo.", [e("朝ご飯を食べましたか。", "あさごはんをたべましたか。", "asagohan o tabemashita ka", "Você tomou café da manhã?"), e("はい、食べました。", "はい、たべました。", "hai, tabemashita", "Sim, tomei.")])
    ], [
      q("Qual forma significa “não comi”?", ["食べます", "食べませんでした", "食べました"], 1, "ませんでした é o “não” no passado, na forma educada."),
      q("明日パンを食べます fala de…", ["Amanhã", "Ontem", "Sempre do passado"], 0, "明日 é amanhã. 食べます pode falar do futuro, dependendo do contexto."),
      q("Como perguntar “Você comeu?”?", ["食べますね", "食べませんよ", "食べましたか"], 2, "食べました é o passado; か no final transforma em pergunta.")
    ], { route: "exercises", label: "Praticar as formas" }, {
      hook: "Com quatro finais de verbo, você já fala do passado, do presente e do futuro.",
      recap: ["ます: faço / vou fazer. ません: não faço.", "ました: fiz. ませんでした: não fiz.", "か no final vira pergunta."]
    }),
    l("sentence-describe", "Descreva o que está à sua volta", 8, "Usar os dois grupos de adjetivos: os de い e os de な.", [
      s("Adjetivos dão características", "Grande, gostoso e tranquilo descrevem algo: são adjetivos. Em japonês, eles vêm em dois grupos: os de い e os de な.\nおいしい (gostoso) é do grupo い; 静か (tranquilo) é do grupo な. O grupo se aprende junto com a palavra.", [e("おいしいです。", "", "oishii desu", "É gostoso."), e("静かです。", "しずかです。", "shizuka desu", "É tranquilo.")]),
      s("Antes de um substantivo", "O grupo い vai direto: おいしいパン, pão gostoso.\nO grupo な precisa de um な no meio: 静かな町, cidade tranquila. É daí que vem o nome.\nNo fim da frase, com です, o な some: 静かです.", [e("おいしいパン", "", "oishii pan", "pão gostoso"), e("静かな町", "しずかなまち", "shizuka na machi", "cidade tranquila")]),
      s("Para dizer “não é”", "Grupo い: tire o い final e coloque くない: おいしくないです, não é gostoso.\nGrupo な: use じゃない: 静かじゃないです, não é tranquilo.\nいい (bom) é rebelde: a negativa é よくないです.", [e("このパンはおいしくないです。", "", "kono pan wa oishikunai desu", "Este pão não é gostoso."), e("ここは静かじゃないです。", "ここはしずかじゃないです。", "koko wa shizuka ja nai desu", "Aqui não é tranquilo.")])
    ], [
      q("Como dizer “cidade tranquila”?", ["静か町", "静かな町", "静かい町"], 1, "静か é do grupo な: use な para ligar ao substantivo 町."),
      q("Qual é a negativa de おいしいです?", ["おいしいじゃないです", "おいしいません", "おいしくないです"], 2, "No grupo い, o い final vira くない, seguido de です."),
      q("Como dizer “É tranquilo”?", ["静かです", "静かなです", "静かいます"], 0, "O な só aparece antes de um substantivo. Antes de です, fica 静かです.")
    ], null, {
      hook: "Gostoso, tranquilo, grande: hora de descrever o mundo à sua volta.",
      recap: ["Grupo い: おいしいパン. Grupo な: 静かな町.", "Negativa do grupo い: くない. Do grupo な: じゃない.", "いい é rebelde: よくない."]
    })
  ],
  particles: [l("particle-existence", "Tem? Onde está? Onde acontece?", 7, "Diferenciar “existir num lugar” (に) de “fazer algo num lugar” (で).", [
    s("Dizer que algo existe", "あります diz que uma coisa existe ou está ali. います faz o mesmo para pessoas e animais.\nEm 本があります, você avisa que tem um livro. Em 猫がいます, que tem um gato.", [e("本があります。", "ほんがあります。", "hon ga arimasu", "Tem um livro."), e("猫がいます。", "ねこがいます。", "neko ga imasu", "Tem um gato.")], "Coisa: あります. Ser vivo que se mexe: います."),
    s("に mostra onde algo está", "Para dizer onde a coisa está, coloque o lugar antes de に: ここに本があります, aqui tem um livro.\nO lugar ganha に porque você está dizendo onde algo existe.", [e("ここに本があります。", "ここにほんがあります。", "koko ni hon ga arimasu", "Tem um livro aqui."), e("公園に犬がいます。", "こうえんにいぬがいます。", "kōen ni inu ga imasu", "Tem um cachorro no parque.")]),
    s("で mostra onde a ação acontece", "Compare 図書館にいます (estou na biblioteca) com 図書館で読みます (leio na biblioteca).\nO lugar é o mesmo; o que muda é a ideia. Em português usamos “em” nos dois casos, mas o japonês separa: estar → に; fazer algo → で.", [e("図書館にいます。", "としょかんにいます。", "toshokan ni imasu", "Estou na biblioteca."), e("図書館で本を読みます。", "としょかんでほんをよみます。", "toshokan de hon o yomimasu", "Leio um livro na biblioteca.")])
  ], [
    q("Complete: 猫が… (tem um gato)", ["あります", "います", "読みます"], 1, "Para animais e pessoas, use います."),
    q("Qual partícula mostra onde a leitura acontece?", ["で", "を", "の"], 0, "Biblioteca + で + ler: で marca o lugar onde a ação acontece."),
    q("Por que não traduzir todo “em” como に?", ["Porque に não existe", "Porque só vale para pessoas", "Porque estar num lugar (に) é diferente de fazer algo num lugar (で)"], 2, "Existir num lugar usa に; uma ação num lugar usa で.")
  ], { route: "exercises", label: "Escolher as partículas" }, {
    hook: "“Em” vira duas partículas em japonês. Depois desta lição, você sabe qual usar.",
    recap: ["あります: coisas. います: pessoas e animais.", "Estar num lugar: に. Fazer algo num lugar: で.", "図書館にいます × 図書館で読みます."]
  })],
  everyday: [
    l("daily-numbers", "Preços, horas e quantidades", 8, "Ler preços e horas e entender que, para contar, o japonês usa palavras especiais.", [
      s("Números como blocos de montar", "Depois do dez, os números se montam como Lego: 十一 é dez + um, jūichi. 二十 é dois dezes, nijū.\n百 (hyaku) é cem e 円 (en) é iene, o dinheiro do Japão. Alguns números mudam de som ao se juntar: 三百 é sanbyaku.", [e("十一", "じゅういち", "jūichi", "onze"), e("二十", "にじゅう", "nijū", "vinte"), e("三百円です。", "さんびゃくえんです。", "sanbyaku en desu", "São trezentos ienes.")]),
      s("Que horas são?", "Para as horas, coloque 時 (ji) depois do número: 三時 é três horas. 半 (han) é “e meia”.\nTrês horas têm leitura especial: 四時 é yoji, 七時 é shichiji e 九時 é kuji.\nPara perguntar, use 何時 (nanji), que horas.", [e("今、何時ですか。", "いま、なんじですか。", "ima, nanji desu ka", "Que horas são agora?"), e("三時半です。", "さんじはんです。", "sanji han desu", "São três e meia."), e("四時です。", "よじです。", "yoji desu", "São quatro horas.")]),
      s("Contar depende do que se conta", "Para contar coisas, o japonês usa palavras especiais chamadas contadores.\nPara pedir objetos, ひとつ é um e ふたつ são dois. Para pessoas é outro: ひとり é uma pessoa, ふたり são duas.\nComece pelos que aparecem nas situações que você treina.", [e("コーヒーをひとつください。", "", "kōhī o hitotsu kudasai", "Um café, por favor."), e("ふたりです。", "", "futari desu", "Somos duas pessoas.")])
    ], [
      q("Como se lê 四時?", ["yonji", "yoji", "shiji"], 1, "Quatro horas tem leitura especial: yoji."),
      q("No restaurante, ふたりです quer dizer…", ["Dois cafés", "Duas horas", "Somos duas pessoas"], 2, "ふたり conta pessoas. ふたつ é para objetos."),
      q("Quanto é 二十?", ["Vinte", "Doze", "Duzentos"], 0, "二 antes do 十 multiplica: dois dezes, vinte. 十二, ao contrário, é doze.")
    ], null, {
      hook: "Preço da lojinha, horário do trem, mesa para dois: números aparecem o dia todo.",
      recap: ["Números se montam como blocos: 二十 é 2 × 10.", "Horas: número + 時. E meia: 半.", "Objetos: ひとつ, ふたつ. Pessoas: ひとり, ふたり."]
    }),
    l("daily-dialogue", "Uma conversa em pequenos turnos", 7, "Juntar cumprimentos, pedidos e respostas numa conversa curta.", [
      s("Abra espaço para perguntar", "Para pedir informação a um desconhecido, comece com すみません. Depois faça a pergunta.\nVocê não precisa dizer “você” em cada frase: a pessoa sabe que é com ela.", [e("すみません。駅はどこですか。", "すみません。えきはどこですか。", "sumimasen. eki wa doko desu ka", "Com licença. Onde fica a estação?"), e("あそこです。", "", "asoko desu", "É ali.")]),
      s("Não entendeu? Peça de novo", "Não precisa fingir que entendeu. もう一度お願いします pede para repetir; ゆっくりお願いします pede mais devagar.\nQuando fizer sentido, agradeça. Repita esses blocos até sair sem pensar.", [e("もう一度お願いします。", "もういちどおねがいします。", "mō ichido onegai shimasu", "Mais uma vez, por favor."), e("ゆっくりお願いします。", "ゆっくりおねがいします。", "yukkuri onegai shimasu", "Mais devagar, por favor."), e("ありがとうございます。", "", "arigatō gozaimasu", "Muito obrigado(a).")]),
      s("Faça os dois papéis", "Leia a pergunta, esconda a resposta e tente responder. Depois troque de papel.\nNo café: faça o pedido, imagine a atendente confirmando e responda はい.", [e("コーヒーをください。", "", "kōhī o kudasai", "Um café, por favor."), e("コーヒーですね。", "", "kōhī desu ne", "Um café, certo?"), e("はい、お願いします。", "はい、おねがいします。", "hai, onegai shimasu", "Sim, por favor.")])
    ], [
      q("Como chamar alguém antes de pedir informação?", ["すみません", "じゃあね", "いただきます"], 0, "すみません chama a atenção com educação."),
      q("O que dizer se você não entendeu?", ["Responder はい sempre", "もう一度お願いします", "Usar uma gíria"], 1, "Essa expressão pede para repetir e mantém a conversa andando."),
      q("Em コーヒーですね, o ね serve para…", ["Negar o café", "Falar do passado", "Confirmar o pedido com a outra pessoa"], 2, "A atendente confere: um café, certo?")
    ], { route: "exercises", label: "Praticar situações" }, {
      hook: "Juntando o que você já sabe, sai uma conversa inteira.",
      recap: ["すみません abre a conversa.", "もう一度お願いします pede para repetir.", "ね no final confere: “certo?”."]
    })
  ],
  casual: [
    l("casual-short", "Por que a fala parece tão diferente?", 7, "Reconhecer formas curtas da conversa sem misturar o casual e o educado por acaso.", [
      s("A forma curta dos verbos", "Entre amigos, 食べます vira 食べる (taberu). 飲みます vira 飲む (nomu). São as formas simples do verbo, as que aparecem no dicionário.\nAtenção: não basta cortar o ます. 食べ e 飲み sozinhos não são palavras completas.", [e("パンを食べる。", "パンをたべる。", "pan o taberu", "Como pão. (casual)"), e("水を飲む。", "みずをのむ。", "mizu o nomu", "Bebo água. (casual)")]),
      s("A conversa encurta o óbvio", "何をしている？ é “O que você está fazendo?”. Entre amigos, vira 何してる？: o を some e している vira してる.\nPor enquanto, reconheça como um bloco pronto de conversa.", [e("何をしている？", "なにをしている？", "nani o shite iru?", "O que você está fazendo? (casual)"), e("何してる？", "なにしてる？", "nani shiteru?", "Tá fazendo o quê? (casual)")]),
      s("Entender primeiro, usar depois", "すみません pode virar すいません na fala. ありがとうございます pode virar あざす, bem informal, em alguns grupos.\nReconhecer ajuda a entender, mas não quer dizer que serve com qualquer pessoa. Com desconhecidos, fique com as formas educadas.", [e("すみません", "", "sumimasen", "Com licença / desculpe, a forma padrão."), e("あざす", "", "azasu", "Valeu, bem informal.")])
    ], [
      q("A forma de dicionário de 飲みます é…", ["飲み", "飲む", "飲です"], 1, "É 飲む. Não dá para formar o verbo só cortando o ます."),
      q("何してる？ combina mais com…", ["Um comunicado formal", "Qualquer situação", "Uma conversa entre amigos"], 2, "É uma forma curta e informal. O contexto importa tanto quanto o significado."),
      q("Por que estudar uma forma curta antes de usá-la?", ["Para entender quando ela aparece", "Para trocar todas as formas educadas", "Para não ter que aprender verbos"], 0, "Você pode entender muito mais formas do que escolhe usar.")
    ], null, {
      hook: "Anime e conversas reais soam diferentes do livro. Aqui você descobre por quê.",
      recap: ["食べる, 飲む: formas simples, entre amigos.", "Na conversa, partes óbvias somem: 何してる？", "Entender não é o mesmo que usar com todo mundo."]
    }),
    l("casual-communities", "Internet, jogos e trabalho", 6, "Reconhecer jargões pelo lugar onde aparecem e escolher respostas adequadas.", [
      s("Cada comunidade tem suas palavras", "Jargão é o vocabulário de um grupo. Nos jogos, 初見 é jogar ou ver algo pela primeira vez; numa live, marca quem chegou agora. 攻略 é a estratégia ou o guia para passar de fase.\nAprenda o lugar junto com a palavra.", [e("初見", "しょけん", "shoken", "primeira vez / primeiro contato"), e("攻略", "こうりゃく", "kōryaku", "estratégia / detonado de um jogo")]),
      s("Na internet, a escrita brinca", "草 é grama, mas na internet vira risada: é o “kkkk” japonês. ネタバレ é spoiler e 配信 é transmissão.\nVocê pode entender uma reação escrita sem usá-la com o professor ou com um cliente.", [e("草", "くさ", "kusa", "risada, em certos contextos da internet"), e("配信", "はいしん", "haishin", "transmissão / live"), e("ネタバレ注意", "ネタバレちゅうい", "netabare chūi", "atenção: spoilers")]),
      s("No trabalho, a relação manda", "お疲れさまです reconhece o esforço de alguém e funciona como cumprimento entre colegas.\nPara confirmar uma instrução de um chefe ou cliente, 承知しました é um “entendido” educado.", [e("お疲れさまです。", "おつかれさまです。", "otsukaresama desu", "Cumprimento que reconhece o esforço entre colegas."), e("承知しました。", "しょうちしました。", "shōchi shimashita", "Entendido. (educado)")])
    ], [
      q("Jargão tem a ver principalmente com…", ["Uma atividade ou comunidade", "Uma escrita sem kana", "Qualquer palavrão"], 0, "Aparece em jogos, trabalho e outros grupos. Não é sinônimo de palavrão."),
      q("ネタバレ注意 avisa sobre…", ["Um atraso", "Uma refeição", "Spoilers"], 2, "ネタバレ é spoiler e 注意 pede atenção."),
      q("Qual resposta confirma uma instrução com educação?", ["草", "承知しました", "マジ？"], 1, "承知しました confirma com educação. As outras são de situações informais.")
    ], { route: "expressions", label: "Explorar expressões em contexto" }, {
      hook: "Lives, jogos, escritório: cada lugar tem o seu japonês.",
      recap: ["初見 e 攻略: palavras do mundo dos jogos.", "草 é o “kkkk” da internet japonesa.", "No trabalho: お疲れさまです e 承知しました."]
    })
  ]
};
