import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

// Uma família de kana por lição, cada caractere com som de referência em português e uma
// dica de memória autoral. As dicas fixam a forma; não explicam a origem dos caracteres.
export const hiraganaRowLessons = [
  l("h-ka", "かきくけこ: a família K", 6, "Ler か, き, く, け, こ e juntar com as vogais.", [
    s("Uma família = consoante + vogais", "Agora vem um truque que vale para quase toda a tabela: cada família junta uma consoante com as cinco vogais, sempre na mesma ordem.\nK + a, i, u, e, o = ka, ki, ku, ke, ko.", [
      e("か", "", "ka", "ka, como em “casa”", "Um golpe de caratê: a mão corta o ar e o tracinho ao lado é o grito, “KA!”."),
      e("き", "", "ki", "ki, como em “quilo”", "Dois traços deitados, um inclinado e uma curva embaixo: uma chave antiga, a chave do “qui”osque."),
      e("く", "", "ku", "ku, como em “cuca”", "Um bico aberto, como o de um cuco cantando “ku-ku”."),
      e("け", "", "ke", "ke, como em “queijo”", "Um poste à esquerda e uma placa à direita: a placa do “quei”jo na quitanda."),
      e("こ", "", "ko", "ko, como em “coco”", "Dois tracinhos deitados, como as duas metades de um coco aberto.")
    ]),
    s("Leia com as vogais", "Junte a família K com as vogais que você já conhece. Leia devagar e depois tente reconhecer a palavra inteira.", [e("かお", "", "kao", "rosto"), e("あき", "", "aki", "outono"), e("いけ", "", "ike", "lago"), e("えき", "", "eki", "estação")], "き tem dois traços deitados. Na próxima lição aparece さ, que é parecida, mas tem só um.")
  ], [
    q("Como se lê か?", ["ki", "ka", "ko"], 1, "か é ka. Lembre do golpe de caratê."),
    q("Qual palavra significa estação?", ["えき", "いけ", "かお"], 0, "え + き = eki, estação de trem."),
    q("Qual letra parece um bico aberto?", ["こ", "け", "く"], 2, "く (ku) parece o bico de um cuco cantando.")
  ], { route: "kana", rows: ["ka"], label: "Praticar a família K" }, {
    hook: "Com a família K, já aparecem palavras como “rosto”, “outono” e “estação”.",
    recap: ["か ka · き ki · く ku · け ke · こ ko.", "Cada família junta uma consoante com a, i, u, e, o.", "Você já lê かお (rosto) e えき (estação)."]
  }),
  l("h-sa", "さしすせそ: a família S", 6, "Ler さ, し, す, せ, そ e lembrar que し é shi.", [
    s("Conheça a família S", "A família S segue o mesmo padrão: sa, shi, su, se, so.\nSó uma letra foge da regra: し não é “si”, é shi, como o “xi” de “xícara”.", [
      e("さ", "", "sa", "sa, como em “sapo”", "Um traço cruzado em cima e uma curva embaixo, como um sapo agachado pronto para pular."),
      e("し", "", "shi", "shi, como em “xícara”", "Um anzol. Quando o peixe morde, você diz: “Xi!”."),
      e("す", "", "su", "su, como em “suco”", "Um canudinho com um nó no meio, mergulhado no suco."),
      e("せ", "", "se", "se, como em “selo”", "Parece uma cadeira desenhada de lado. Sente-se!"),
      e("そ", "", "so", "so, como em “sopa”", "Um zigue-zague e uma curva descendo, como o fio da sopa caindo da colher.")
    ]),
    s("Palavras com S", "Agora você conhece 15 letras. Repare como as palavras já ficam familiares.", [e("すし", "", "sushi", "sushi"), e("かさ", "", "kasa", "guarda-chuva"), e("あさ", "", "asa", "manhã"), e("いす", "", "isu", "cadeira")], "Cuidado com さ e き: き tem dois traços deitados; さ, só um.")
  ], [
    q("Como se lê し?", ["si", "shi", "chi"], 1, "し é shi, como o xi de “xícara”."),
    q("Qual palavra significa guarda-chuva?", ["かさ", "あさ", "いす"], 0, "か + さ = kasa, guarda-chuva. あさ é manhã e いす é cadeira."),
    q("Qual letra parece um canudinho com um nó?", ["そ", "せ", "す"], 2, "す (su) parece um canudinho com um nó, mergulhado no suco.")
  ], { route: "kana", rows: ["sa"], label: "Praticar a família S" }, {
    hook: "Família S: a que deixa você ler “sushi”.",
    recap: ["さ sa · し shi · す su · せ se · そ so.", "し é shi, como o xi de “xícara”.", "Já dá para ler すし, かさ e いす."]
  }),
  l("h-ta", "たちつてと: a família T", 6, "Ler た, ち, つ, て, と, incluindo os sons chi e tsu.", [
    s("Duas surpresas na família T", "Ta, chi, tsu, te, to. Aqui são duas surpresas: ち é chi, quase “tchi”, e つ é tsu, como em “tsunami”.\nO resto segue a regra: ta, te, to.", [
      e("た", "", "ta", "ta, como em “tatu”", "À esquerda, um “t” inclinado; à direita, um こ. Juntos parecem as letras “ta”."),
      e("ち", "", "chi", "chi, quase “tchi”", "Parece um 5 espelhado. Diga “tchi” e mostre os cinco dedos."),
      e("つ", "", "tsu", "tsu, como em “tsunami”", "Uma onda só. É a primeira letra de つなみ, tsunami!"),
      e("て", "", "te", "te, como em “teto”", "Um gancho pendurado no teto."),
      e("と", "", "to", "to, como em “tomate”", "Um tracinho espetado numa curva, como um palito num tomate.")
    ]),
    s("Palavras com T", "Vinte letras! Leia estas palavras e repare no tsu e no chi.", [e("たこ", "", "tako", "polvo"), e("くつ", "", "kutsu", "sapato"), e("とけい", "", "tokei", "relógio"), e("ちかてつ", "", "chikatetsu", "metrô")], "No fim de uma palavra, o u de つ quase some: くつ soa perto de “kuts”.")
  ], [
    q("Como se lê つ?", ["tu", "chi", "tsu"], 2, "つ é tsu, como em “tsunami”."),
    q("Qual palavra significa polvo?", ["たこ", "くつ", "とけい"], 0, "た + こ = tako, polvo."),
    q("Como se lê ち?", ["ti, bem seco", "chi, quase “tchi”", "shi"], 1, "ち é chi. Lembre do 5 espelhado: “tchi” com os cinco dedos.")
  ], { route: "kana", rows: ["ta"], label: "Praticar a família T" }, {
    hook: "Família T: a do “tsunami”, palavra que o português pegou emprestada do japonês.",
    recap: ["た ta · ち chi · つ tsu · て te · と to.", "ち é chi e つ é tsu.", "Já dá para ler たこ (polvo) e くつ (sapato)."]
  }),
  l("h-na", "なにぬねの: a família N", 6, "Ler な, に, ぬ, ね, の e as primeiras palavras de bichos.", [
    s("Conheça a família N", "Na, ni, nu, ne, no. Nenhuma surpresa de som: todas seguem a regra.\nA dificuldade aqui é visual: ぬ e ね têm laços parecidos. As dicas ajudam.", [
      e("な", "", "na", "na, como em “nata”", "Uma cruz à esquerda e um laço à direita, como alguém nadando com uma boia."),
      e("に", "", "ni", "ni, como em “ninho”", "Um traço em pé e dois deitados ao lado, como um ninho entre dois galhos."),
      e("ぬ", "", "nu", "nu, como em “nuvem”", "Um novelo enrolado que termina num nó."),
      e("ね", "", "ne", "ne, como em “neve”", "Um traço em pé e uma linha que termina num laço: o rabo enrolado de um gato. É o ね de ねこ!"),
      e("の", "", "no", "no, como em “nota”", "Parece um sinal de proibido: “Não!”.")
    ]),
    s("Palavras com N", "Agora você conhece 25 letras, mais da metade do hiragana básico!", [e("ねこ", "", "neko", "gato"), e("いぬ", "", "inu", "cachorro"), e("なつ", "", "natsu", "verão"), e("にく", "", "niku", "carne")], "ぬ e ね terminam em laço, mas só ね começa com um traço em pé separado.")
  ], [
    q("Qual palavra significa gato?", ["いぬ", "ねこ", "なつ"], 1, "ね + こ = neko, gato. いぬ é cachorro."),
    q("Qual letra parece um sinal de proibido?", ["の", "ね", "な"], 0, "の (no) parece um sinal de proibido: “Não!”."),
    q("Como se lê いぬ?", ["ine", "ina", "inu"], 2, "い + ぬ = inu, cachorro.")
  ], { route: "kana", rows: ["na"], label: "Praticar a família N" }, {
    hook: "Família N: chegou a hora de ler “gato” e “cachorro”.",
    recap: ["な na · に ni · ぬ nu · ね ne · の no.", "ぬ e ね têm laços: procure o traço em pé do ね.", "Já dá para ler ねこ (gato) e いぬ (cachorro)."]
  }),
  l("h-ha", "はひふへほ: a família H", 6, "Ler は, ひ, ふ, へ, ほ e o som soprado de fu.", [
    s("Um h que é sopro", "Ha, hi, fu, he, ho. O h japonês é um sopro leve, parecido com o r de “rato” em muitos sotaques do Brasil.\nA exceção é ふ: um fu bem suave, soprado entre os lábios, quase um “hu”.", [
      e("は", "", "ha", "ha, como o “rá” de “rato” em muitos sotaques", "Um traço em pé e, ao lado, alguém rindo de boca aberta: “Ha ha!”."),
      e("ひ", "", "hi", "hi, um “ri” soprado", "Um sorriso bem largo: “Hi hi hi!”."),
      e("ふ", "", "fu", "fu, soprado entre os lábios", "O monte Fuji visto de longe, com nuvens dos lados."),
      e("へ", "", "he", "he, um “rê” soprado", "Uma montanha baixinha. E ela é igual no katakana!"),
      e("ほ", "", "ho", "ho, um “rô” soprado", "Parece は com um chapéu a mais. Papai Noel: “Ho ho ho!”.")
    ]),
    s("Palavras com H", "Trinta letras! Leia devagar, soprando o h.", [e("はな", "", "hana", "flor"), e("ひと", "", "hito", "pessoa"), e("ふね", "", "fune", "barco"), e("ほし", "", "hoshi", "estrela")], "Mais à frente, は também aparece como partícula. Aí ela se lê wa, como em こんにちは.")
  ], [
    q("Como se lê ふ?", ["hu, bem forte", "fu, soprado", "bu"], 1, "ふ é fu, um sopro suave entre os lábios."),
    q("Qual letra parece は com um chapéu a mais?", ["ほ", "ひ", "へ"], 0, "ほ (ho) é は com um traço a mais em cima. Ho ho ho!"),
    q("Qual palavra significa estrela?", ["はな", "ひと", "ほし"], 2, "ほ + し = hoshi, estrela.")
  ], { route: "kana", rows: ["ha"], label: "Praticar a família H" }, {
    hook: "Família H: a mais fácil de lembrar, porque parece gente rindo.",
    recap: ["は ha · ひ hi · ふ fu · へ he · ほ ho.", "O h é um sopro leve; ふ é um fu soprado.", "Já dá para ler はな (flor) e ほし (estrela)."]
  }),
  l("h-ma", "まみむめも: a família M", 6, "Ler ま, み, む, め, も.", [
    s("Conheça a família M", "Ma, mi, mu, me, mo. Sem surpresas de som!\nRepare em め e ぬ: são parecidas, mas ぬ termina num laço e め não.", [
      e("ま", "", "ma", "ma, como em “mala”", "Um mastro com dois traços cruzados e uma bandeira enrolada embaixo."),
      e("み", "", "mi", "mi, como em “mico”", "Uma linha que dá uma volta e corta um traço, como uma minhoca dando cambalhota."),
      e("む", "", "mu", "mu, como o “muuu” da vaca", "Uma vaca de perfil fazendo “muuu”, com o rabinho ao lado."),
      e("め", "", "me", "me, como em “mesa”", "め também é a palavra “olho” em japonês. Parece um olho com um cílio."),
      e("も", "", "mo", "mo, como em “mola”", "Um anzol com duas iscas: “Mordeu!”.")
    ]),
    s("Palavras com M", "Trinta e cinco letras. Falta pouco!", [e("うみ", "", "umi", "mar"), e("みみ", "", "mimi", "orelha"), e("むし", "", "mushi", "inseto"), e("もも", "", "momo", "pêssego")], "め não tem laço no fim; ぬ tem.")
  ], [
    q("Como se lê む?", ["mo", "mu", "me"], 1, "む é mu, como o “muuu” da vaca."),
    q("Qual palavra significa mar?", ["うみ", "みみ", "もも"], 0, "う + み = umi, mar. みみ é orelha."),
    q("Qual palavra significa orelha?", ["もも", "むし", "みみ"], 2, "み + み = mimi, orelha.")
  ], { route: "kana", rows: ["ma"], label: "Praticar a família M" }, {
    hook: "Família M: mar, orelha e pêssego, tudo com duas letras.",
    recap: ["ま ma · み mi · む mu · め me · も mo.", "め não tem laço no final; ぬ tem.", "Já dá para ler うみ (mar) e みみ (orelha)."]
  }),
  l("h-yara", "やゆよ e らりるれろ: famílias Y e R", 7, "Ler a família Y, que tem só três letras, e a família R.", [
    s("Y: só três letras", "A família Y tem só ya, yu, yo. Os sons “yi” e “ye” não existem no japonês de hoje.\nLeia como “iá”, “iú”, “iô”.", [
      e("や", "", "ya", "ya, como “iá”", "Um iaque com os chifres para cima."),
      e("ゆ", "", "yu", "yu, como “iú”", "Um peixe dando a volta e gritando “iu-hu!”."),
      e("よ", "", "yo", "yo, como “iô”", "Um ioiô pendurado no dedo.")
    ]),
    s("R: sempre fraquinho", "Ra, ri, ru, re, ro. O r japonês é sempre leve, como o r de “caro”, nunca como o de “rato”.\nIsso vale até no começo da palavra: ら é um ra de “arara”.", [
      e("ら", "", "ra", "ra, como em “arara”", "Uma rã sentada, com um tracinho na cabeça."),
      e("り", "", "ri", "ri, como em “arisco”", "Dois traços em pé, como um rio correndo entre duas margens."),
      e("る", "", "ru", "ru, como em “Peru”", "Uma estrada que termina numa rotatória, que é o laço."),
      e("れ", "", "re", "re, como em “careta”", "Uma pessoa dançando, com a perna chutando para o lado."),
      e("ろ", "", "ro", "ro, como em “caroço”", "É る sem o laço: a rotatória ficou aberta.")
    ]),
    s("Palavras com Y e R", "Leia devagar e mantenha o r fraquinho.", [e("やま", "", "yama", "montanha"), e("ゆき", "", "yuki", "neve"), e("よる", "", "yoru", "noite"), e("さくら", "", "sakura", "cerejeira"), e("くるま", "", "kuruma", "carro")], "る tem um laço no fim; ろ não.")
  ], [
    q("Quantas letras tem a família Y?", ["Cinco", "Três", "Duas"], 1, "Só や, ゆ, よ: ya, yu, yo."),
    q("Como é o r japonês?", ["Fraquinho, como em “caro”", "Forte, como em “rato”", "Mudo"], 0, "O r japonês é sempre um toque leve da língua, como em “caro”."),
    q("Qual palavra significa neve?", ["やま", "よる", "ゆき"], 2, "ゆ + き = yuki, neve.")
  ], { route: "kana", rows: ["ya", "ra"], label: "Praticar as famílias Y e R" }, {
    hook: "Duas famílias de uma vez: uma é curtinha e a outra tem o r mais leve do mundo.",
    recap: ["や ya · ゆ yu · よ yo.", "ら ra · り ri · る ru · れ re · ろ ro, sempre com o r fraquinho.", "Já dá para ler やま (montanha) e さくら (cerejeira)."]
  }),
  l("h-dakuten", "Risquinhos que mudam o som: ゛ e ゜", 7, "Ler as letras com dakuten (゛) e handakuten (゜).", [
    s("Dois risquinhos: o dakuten", "Os dois risquinhos no canto se chamam dakuten. Eles deixam o som mais “vibrado”:\n• K vira G: か → が\n• S vira Z: さ → ざ\n• T vira D: た → だ", [e("か → が", "", "ka → ga", "Família K → família G"), e("さ → ざ", "", "sa → za", "Família S → família Z"), e("た → だ", "", "ta → da", "Família T → família D")]),
    s("A família H tem duas versões", "Com os dois risquinhos, o H vira B: は → ば.\nCom uma bolinha, chamada handakuten, o H vira P: は → ぱ. A bolinha só aparece na família H.", [e("は → ば → ぱ", "", "ha → ba → pa", "Sem marca → dakuten → handakuten")]),
    s("Duas pegadinhas e algumas palavras", "じ e ぢ têm o mesmo som, ji. ず e づ também, zu. No dia a dia, quase sempre se usa じ e ず.\nAgora leia palavras com as letras novas.", [e("ごはん", "", "gohan", "arroz cozido / refeição"), e("かぜ", "", "kaze", "vento"), e("ぶた", "", "buta", "porco"), e("てんぷら", "", "tenpura", "tempurá")], "O risquinho só deixa o som mais “vibrado”. A letra de baixo continua a mesma, e você já a conhece.")
  ], [
    q("O que o dakuten faz com か?", ["Vira ga", "Vira pa", "Não muda nada"], 0, "Os dois risquinhos transformam K em G: か → が."),
    q("Como se lê ぱ?", ["ba", "pa", "ha"], 1, "A bolinha (handakuten) transforma H em P: ぱ é pa."),
    q("Qual palavra significa porco?", ["かぜ", "ごはん", "ぶた"], 2, "ぶ + た = buta, porco.")
  ], { route: "kana", group: "dakuten", label: "Praticar as letras com ゛" }, {
    hook: "Dois risquinhos transformam letras que você já conhece em 25 sons novos, sem decorar nada do zero.",
    recap: ["゛ (dakuten): K vira G, S vira Z, T vira D, H vira B.", "゜ (handakuten): H vira P.", "じ e ぢ soam iguais; no dia a dia, use じ."]
  })
];

export const katakanaRowLessons = [
  l("k-sata", "サシスセソ e タチツテト", 7, "Ler as famílias S e T do katakana.", [
    s("Família S", "Os sons você já conhece: sa, shi, su, se, so. Agora é só o desenho.", [
      e("サ", "", "sa", "sa", "Um traço deitado com duas perninhas, como さ simplificado."),
      e("シ", "", "shi", "shi", "Dois pingos à esquerda e um traço que sobe. Cuidado: parece ツ!"),
      e("ス", "", "su", "su", "Alguém correndo de lado, com as pernas abertas."),
      e("セ", "", "se", "se", "Parece せ sem a curva de baixo."),
      e("ソ", "", "so", "so", "Um pingo e um traço longo que desce da direita. Cuidado: parece ン!")
    ]),
    s("Família T", "Ta, chi, tsu, te, to. Mesmos sons do hiragana, inclusive o chi e o tsu.", [
      e("タ", "", "ta", "ta", "Parece ク com um tracinho dentro, como uma mochila."),
      e("チ", "", "chi", "chi", "Um tracinho em cima de uma cruz."),
      e("ツ", "", "tsu", "tsu", "Dois pingos em cima e um traço que desce da direita. Cuidado: parece シ!"),
      e("テ", "", "te", "te", "Uma antena no telhado: dois traços e um gancho."),
      e("ト", "", "to", "to", "Um poste com um galhinho, como um totem.")
    ]),
    s("Leia", "Agora palavras que vieram de outras línguas.", [e("テスト", "", "tesuto", "teste / prova"), e("タコス", "", "takosu", "tacos"), e("スイス", "", "Suisu", "Suíça")], "シ e ツ, ソ e ン confundem todo mundo. Mais à frente há uma lição só para elas.")
  ], [
    q("Como se lê ス?", ["su", "so", "shi"], 0, "ス é su: alguém correndo de lado."),
    q("Qual palavra significa teste?", ["タコス", "テスト", "スイス"], 1, "テ + ス + ト = tesuto, teste ou prova."),
    q("Qual destas é o tsu?", ["シ", "ソ", "ツ"], 2, "ツ é tsu: pingos em cima e traço descendo.")
  ], { route: "kana", script: "katakana", rows: ["sa", "ta"], label: "Praticar S e T em katakana" }, {
    hook: "Mais duas famílias e você já lê “teste”, “tacos” e “Suíça”.",
    recap: ["サ sa · シ shi · ス su · セ se · ソ so.", "タ ta · チ chi · ツ tsu · テ te · ト to.", "シ e ツ são parecidas: olhe de onde sai o traço longo."]
  }),
  l("k-naha", "ナニヌネノ e ハヒフヘホ", 7, "Ler as famílias N e H do katakana.", [
    s("Família N", "Na, ni, nu, ne, no. Repare na ノ: a letra mais simples do japonês.", [
      e("ナ", "", "na", "na", "Uma cruz meio torta, como uma faca cortando um naco."),
      e("ニ", "", "ni", "ni", "Dois traços deitados, como に sem o traço em pé."),
      e("ヌ", "", "nu", "nu", "Um 7 cortado por um tracinho, como macarrão pego com hashi."),
      e("ネ", "", "ne", "ne", "Um poste com braços, todo enfeitado."),
      e("ノ", "", "no", "no", "Um traço só, inclinado.")
    ]),
    s("Família H", "Ha, hi, fu, he, ho. E um presente: ヘ é igual ao へ do hiragana.", [
      e("ハ", "", "ha", "ha", "Duas linhas abertas, como uma risada: “Ha!”."),
      e("ヒ", "", "hi", "hi", "Alguém sentado no chão rindo: “hi hi”."),
      e("フ", "", "fu", "fu", "Só a parte de cima do ふ, como um gancho."),
      e("ヘ", "", "he", "he", "Igualzinho ao へ do hiragana!"),
      e("ホ", "", "ho", "ho", "Uma cruz com duas perninhas: uma árvore de Natal. “Ho ho ho!”.")
    ]),
    s("Leia", "Palavras com as famílias que você já conhece.", [e("ネクタイ", "", "nekutai", "gravata"), e("ナイフ", "", "naifu", "faca"), e("テニス", "", "tenisu", "tênis (o esporte)")], "ヘ é igual no hiragana e no katakana. Uma letra a menos para decorar!")
  ], [
    q("Qual letra é igual no hiragana e no katakana?", ["ホ", "ヘ", "ハ"], 1, "へ e ヘ são praticamente iguais."),
    q("Como se lê ナイフ?", ["naifu", "naiho", "neifu"], 0, "ナ + イ + フ = naifu, faca."),
    q("Qual palavra significa gravata?", ["テニス", "ナイフ", "ネクタイ"], 2, "ネ + ク + タ + イ = nekutai, gravata.")
  ], { route: "kana", script: "katakana", rows: ["na", "ha"], label: "Praticar N e H em katakana" }, {
    hook: "Duas famílias e um bônus: uma letra é igualzinha ao hiragana.",
    recap: ["ナ na · ニ ni · ヌ nu · ネ ne · ノ no.", "ハ ha · ヒ hi · フ fu · ヘ he · ホ ho.", "ヘ é igual nas duas escritas."]
  }),
  l("k-mawa", "Do マ ao ン: o katakana completo", 8, "Ler as famílias M, Y, R e W e o ン, fechando os 46 do katakana.", [
    s("M e Y", "Mais oito letras, todas com sons que você já conhece.", [
      e("マ", "", "ma", "ma", "Um triângulo com uma perninha, como uma bandeira no mastro."),
      e("ミ", "", "mi", "mi", "Três traços inclinados, como três minhocas."),
      e("ム", "", "mu", "mu", "Um triângulo com um tracinho: o focinho da vaca fazendo “muuu”."),
      e("メ", "", "me", "me", "Um X: marque o X bem no meio."),
      e("モ", "", "mo", "mo", "Igual a も, sem o anzol."),
      e("ヤ", "", "ya", "ya", "Parece や, só que mais reto."),
      e("ユ", "", "yu", "yu", "Um U deitado, como uma pá de lixo."),
      e("ヨ", "", "yo", "yo", "Um E de costas.")
    ]),
    s("R, W e ン", "As últimas! Duas delas são velhas conhecidas: リ é quase igual a り.", [
      e("ラ", "", "ra", "ra", "Um tracinho em cima de um 7, como ら sem a curva."),
      e("リ", "", "ri", "ri", "Quase igual a り!"),
      e("ル", "", "ru", "ru", "Duas pernas, uma delas chutando para o lado."),
      e("レ", "", "re", "re", "Um L inclinado."),
      e("ロ", "", "ro", "ro", "Um quadrado, como uma roda quadrada."),
      e("ワ", "", "wa", "wa", "Parece ウ sem o tracinho de cima."),
      e("ヲ", "", "o", "o (a tabela chama de wo)", "ワ com um tracinho a mais. Quase nunca aparece."),
      e("ン", "", "n", "n", "Um pingo e um traço que sobe. Compare com ソ, que desce.")
    ]),
    s("Leia", "O katakana básico está completo. Leia estas palavras do mercado.", [e("メロン", "", "meron", "melão"), e("ワイン", "", "wain", "vinho"), e("トマト", "", "tomato", "tomate"), e("ミルク", "", "miruku", "leite")], "Os risquinhos ゛ e ゜ funcionam igualzinho no katakana: カ vira ガ, ハ vira パ.")
  ], [
    q("Como se lê メロン?", ["meron", "merin", "moron"], 0, "メ + ロ + ン = meron, melão."),
    q("Qual palavra significa vinho?", ["ミルク", "ワイン", "トマト"], 1, "ワ + イ + ン = wain, vinho."),
    q("O que os risquinhos ゛ fazem no katakana?", ["Nada, só enfeitam", "Mudam o sentido da palavra inteira", "O mesmo que no hiragana: カ vira ガ"], 2, "゛ e ゜ funcionam do mesmo jeito nas duas escritas.")
  ], { route: "kana", script: "katakana", rows: ["ma", "ya", "ra", "wa", "n"], label: "Completar o katakana" }, {
    hook: "Últimas famílias! No fim desta lição, você conhece o katakana básico inteiro.",
    recap: ["マ ミ ム メ モ · ヤ ユ ヨ · ラ リ ル レ ロ · ワ ヲ ン.", "リ e ヘ são quase iguais ao hiragana.", "゛ e ゜ funcionam do mesmo jeito: ハ, バ, パ."]
  })
];
