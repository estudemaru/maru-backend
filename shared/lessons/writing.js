import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const foundationLessons = [
  l("welcome", "Japonês começa aqui", 5, "Reconhecer os três sistemas de escrita e saber por onde começar.", [
    s("Você pode começar sem saber nada", "Não precisa conhecer um único caractere. Primeiro, entenda como o idioma funciona. Depois, pratique cinco sons por vez. Você vai encontrar a leitura em letras latinas (romaji) como apoio e poderá escondê-la quando se sentir confortável.", [e("こんにちは", "", "konnichiwa", "Olá / boa tarde", "Neste cumprimento, o は final é pronunciado wa.")], "Poucos minutos com atenção já são um começo. A constância conta mais que a pressa."),
    s("Três escritas, um idioma", "Hiragana registra sons e aparece em palavras e terminações gramaticais. Katakana representa os mesmos sons e é comum em nomes estrangeiros e empréstimos. Kanji são caracteres ligados a significados, com leituras que dependem da palavra.", [e("ねこ", "", "neko", "gato · hiragana"), e("コーヒー", "", "kōhī", "café · katakana"), e("山", "やま", "yama", "montanha · kanji")], "Os três sistemas convivem na mesma frase. Romaji é uma ajuda de leitura, não um quarto sistema japonês."),
    s("Seu caminho daqui para a frente", "Conheça os sons, aprenda hiragana e katakana e descubra kanji dentro de palavras. Pratique escrita junto com leitura. Aos poucos, use partículas para formar frases e escolha expressões adequadas à situação.", [e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Como pão.", "パン: katakana; を e べます: hiragana; 食: kanji.")])
  ], [
    q("Qual escrita você aprende primeiro na trilha?", ["Hiragana", "Todos os kanji", "Só romaji"], 0, "Hiragana apresenta os sons básicos e ajuda a ler as próximas lições."),
    q("Onde é comum encontrar katakana?", ["Só em verbos", "Em empréstimos como コーヒー", "Em traduções para português"], 1, "コーヒー (café) é um empréstimo escrito em katakana."),
    q("O que é romaji?", ["Outro nome para kanji", "A única escrita do Japão", "Japonês representado em letras latinas"], 2, "Romaji permite acompanhar a leitura enquanto você aprende os caracteres.")
  ]),
  l("how-it-works", "Como as palavras se encaixam", 6, "Perceber a ordem das palavras em japonês e como as partículas se colam a elas.", [
    s("O verbo fecha a frase", "Em português, “bebo água” começa pela ação. Em japonês, a ordem muda: primeiro vem aquilo de que se fala, depois vem a ação, no final. 水を飲みます não é “bebo água” palavra por palavra: é “água + を + bebo”, com o verbo por último. Quase toda frase simples segue esse mesmo formato.", [e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água.", "水 (água) vem primeiro; 飲みます (beber) fecha a frase."), e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Como pão.", "Mesmo formato: パン (pão) primeiro, 食べます (comer) por último.")], "Não tente montar a frase japonesa na mesma ordem do português. Encontre primeiro o verbo, no final, e depois monte o resto para trás."),
    s("Uma partícula é uma etiqueta colada", "Depois de cada palavra importante, uma partícula pequena se cola a ela e avisa qual é o seu papel na frase: se é do que se fala, o que sofre a ação, ou onde ela acontece. Em vez de decorar uma tradução fixa para cada partícula, pense nela como uma etiqueta: を cola no que é atingido pela ação; は cola no assunto da frase.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Eu sou estudante.", "わたし (eu) + は (etiqueta de assunto) + 学生です (sou estudante)."), e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água.", "水 (água) + を (etiqueta de objeto) + 飲みます (bebo).")]),
    s("Frases maiores são só mais blocos", "Uma frase mais longa não é mais difícil de montar: é a mesma ideia, com mais blocos de “palavra + etiqueta” enfileirados antes do verbo. 図書館で本を読みます tem dois desses blocos: o lugar da ação e o objeto lido, e só depois vem o verbo.", [e("図書館で本を読みます。", "としょかんでほんをよみます。", "toshokan de hon o yomimasu", "Leio um livro na biblioteca.", "図書館で (lugar da ação) + 本を (o que é lido) + 読みます (leio).")], "Quando uma frase parecer grande demais, procure primeiro o verbo no final e depois separe o resto em blocos de palavra + partícula.")
  ], [
    q("Em 水を飲みます, onde fica o verbo?", ["No início da frase", "Antes da palavra água", "No final da frase"], 2, "水 (água) vem primeiro; 飲みます (beber) fecha a frase, como na maioria das frases simples."),
    q("O que faz uma partícula como を ou は?", ["Muda o sentido do verbo", "Cola-se à palavra anterior e mostra seu papel na frase", "Substitui o verbo por completo"], 1, "A partícula funciona como uma etiqueta colada depois da palavra: mostra se ela é o assunto, o objeto, o lugar, e assim por diante."),
    q("Uma frase mais longa como 図書館で本を読みます é formada por…", ["Uma tradução direta, palavra por palavra, do português", "Blocos de palavra + partícula enfileirados antes do verbo", "Apenas kanji, sem partículas"], 1, "図書館で e 本を são dois blocos que se encaixam um atrás do outro, antes do verbo 読みます.")
  ]),
  l("sounds", "Ouça o ritmo do japonês", 5, "Identificar as cinco vogais e perceber que a duração dos sons importa.", [
    s("Cinco vogais para começar", "A sequência japonesa é a, i, u, e, o. As vogais costumam ser curtas e estáveis. O u japonês tem os lábios menos arredondados que o u português. Use o áudio como apoio e repita sem acrescentar sons. Depois tente reconhecer cada vogal sem olhar o romaji.", [e("あ　い　う　え　お", "", "a · i · u · e · o", "As cinco vogais")]),
    s("Dê tempo a cada unidade", "O japonês organiza o ritmo em unidades chamadas moras. Um kana simples costuma ocupar uma mora. O ん, o pequeno っ e o prolongamento de uma vogal também ocupam tempo. Em きゃ, os dois sinais formam uma única mora.", [e("おばさん", "", "obasan", "tia / mulher de meia-idade"), e("おばあさん", "", "obāsan", "avó / mulher idosa")], "Vogais longas mudam palavras. A barrinha em ā, ī, ū, ē, ō sinaliza uma vogal prolongada."),
    s("Apoio para a pronúncia", "Shi, chi e tsu representam し, ち e つ. O r de ra, ri, ru, re, ro é breve, próximo ao toque da língua em “caro”. Não acrescente uma vogal depois de ん.", [e("すし", "", "sushi", "sushi"), e("さくら", "", "sakura", "cerejeira")])
  ], [
    q("Qual é a ordem das cinco vogais?", ["a, e, i, o, u", "a, i, u, e, o", "i, a, o, e, u"], 1, "A tabela japonesa usa a ordem a, i, u, e, o."),
    q("Uma vogal longa pode mudar o significado?", ["Sim", "Nunca", "Só no português"], 0, "おばさん e おばあさん são palavras diferentes."),
    q("Como ler し?", ["si com som de ci em cidade", "ri", "shi"], 2, "Na romanização usada aqui, し é shi.")
  ], { route: "kana", label: "Conhecer as cinco vogais" }),
  l("greetings", "Seu primeiro olá", 5, "Cumprimentar, agradecer e chamar a atenção de alguém com educação.", [
    s("Uma expressão para cada momento", "Comece pelas formas educadas. おはようございます é usado pela manhã; こんにちは, durante o dia; こんばんは, à noite.", [e("おはようございます。", "", "ohayō gozaimasu", "Bom dia."), e("こんにちは。", "", "konnichiwa", "Olá / boa tarde."), e("こんばんは。", "", "konbanwa", "Boa noite (ao chegar).")]),
    s("Duas expressões que abrem portas", "ありがとうございます agradece com educação. すみません serve para pedir licença, chamar alguém ou se desculpar, dependendo do contexto.", [e("ありがとうございます。", "", "arigatō gozaimasu", "Muito obrigado(a)."), e("すみません。", "", "sumimasen", "Com licença / desculpe.")], "Para se despedir antes de dormir, use おやすみなさい (oyasuminasai), não こんばんは."),
    s("Comece pequeno", "Leia cada expressão, ouça e repita. Você não precisa analisar toda a gramática agora. Procure relacionar o som a uma situação real.")
  ], [
    q("Você vai chamar alguém para pedir informação. Qual expressão ajuda?", ["おやすみなさい", "すみません", "こんばんは"], 1, "すみません pode chamar a atenção de alguém educadamente."),
    q("Como agradecer com educação?", ["ありがとうございます", "こんにちは", "おはようございます"], 0, "ありがとうございます é um agradecimento educado."),
    q("こんばんは é usado…", ["Ao ir dormir", "Só pela manhã", "Ao cumprimentar alguém à noite"], 2, "Para antes de dormir, use おやすみなさい.")
  ])
];

export const hiraganaLessons = [
  l("h-vowels", "As primeiras cinco letras", 6, "Reconhecer あ, い, う, え, お e ler palavras pequenas.", [
    s("Conheça あ・い・う・え・お", "Cada um destes caracteres representa uma vogal. Olhe a forma, diga o som e só então tente lembrar sem olhar. Aprenda o formato manuscrito no caderno de escrita.", [e("あ", "", "a", "Primeira vogal"), e("い", "", "i", "Segunda vogal"), e("う", "", "u", "Terceira vogal"), e("え", "", "e", "Quarta vogal"), e("お", "", "o", "Quinta vogal")]),
    s("Você já consegue ler", "Junte os sons sem colocar força excessiva em uma sílaba. Leia いえ como i-e, mantendo as duas vogais.", [e("いえ", "", "ie", "casa"), e("うえ", "", "ue", "em cima"), e("あお", "", "ao", "azul")], "あ e お podem parecer próximos. Compare a forma e a ordem dos traços, não apenas a aparência geral.")
  ], [
    q("Qual é o som de あ?", ["o", "a", "e"], 1, "あ representa o som da vogal a."),
    q("Qual caractere representa i?", ["い", "う", "え"], 0, "い representa i."),
    q("Como se lê いえ?", ["ao", "ue", "ie"], 2, "い = i e え = e. いえ significa casa.")
  ], { route: "kana", rows: ["a"], label: "Praticar as cinco vogais" }),
  l("h-rows", "Das fileiras K às fileiras H", 8, "Ler as fileiras ka, sa, ta, na e ha, observando os sons especiais.", [
    s("Um padrão que se repete", "As fileiras seguem a ordem das vogais. か・き・く・け・こ são ka, ki, ku, ke, ko. Depois vêm sa, ta, na e ha. Não tente memorizar todas de uma vez: selecione uma fileira no treino.", [e("か　き　く　け　こ", "", "ka · ki · ku · ke · ko", "Fileira K"), e("さ　し　す　せ　そ", "", "sa · shi · su · se · so", "Fileira S"), e("た　ち　つ　て　と", "", "ta · chi · tsu · te · to", "Fileira T")]),
    s("Preste atenção às exceções", "し é shi; ち é chi; つ é tsu; ふ é fu, com um sopro suave pelos lábios. Nas demais posições, o padrão ajuda a lembrar.", [e("な　に　ぬ　ね　の", "", "na · ni · nu · ne · no", "Fileira N"), e("は　ひ　ふ　へ　ほ", "", "ha · hi · fu · he · ho", "Fileira H"), e("ねこ", "", "neko", "gato"), e("くつ", "", "kutsu", "sapatos")])
  ], [
    q("Como se lê ち?", ["ti com som de t", "chi", "shi"], 1, "ち é romanizado como chi aqui."),
    q("Como se lê ねこ?", ["neko", "nako", "neka"], 0, "ね = ne e こ = ko."),
    q("Qual caractere é fu?", ["は", "ほ", "ふ"], 2, "ふ representa fu.")
  ], { route: "kana", rows: ["ka", "sa", "ta", "na", "ha"], label: "Praticar estas fileiras" }),
  l("h-rest", "Complete os 46 hiragana básicos", 7, "Ler as fileiras restantes e reconhecer o papel de ん e を.", [
    s("M, Y e R", "ま・み・む・め・も seguem o padrão ma, mi, mu, me, mo. A fileira Y tem apenas や・ゆ・よ. A fileira R tem ら・り・る・れ・ろ.", [e("ま　み　む　め　も", "", "ma · mi · mu · me · mo", "Fileira M"), e("や　ゆ　よ", "", "ya · yu · yo", "Fileira Y"), e("ら　り　る　れ　ろ", "", "ra · ri · ru · re · ro", "Fileira R")]),
    s("Os últimos três", "わ se lê wa. を aparece principalmente como partícula, pronunciada o, embora muitas tabelas usem wo para identificá-la. ん é uma unidade nasal: seu som se adapta aos sons próximos.", [e("わ　を　ん", "", "wa · o (wo) · n", "Fim da tabela básica"), e("やま", "", "yama", "montanha"), e("ほん", "", "hon", "livro")], "São 46 caracteres básicos. Os sinais com marcas sonoras e as combinações entram depois; não são 71 básicos.")
  ], [
    q("Quantos hiragana básicos há na tabela moderna?", ["71", "46", "26"], 1, "São 46 básicos; as formas com marcas sonoras ampliam a tabela."),
    q("Qual a leitura usual da partícula を?", ["o", "wa", "ni"], 0, "を costuma ser pronunciado o."),
    q("Qual palavra significa montanha?", ["ほん", "ねこ", "やま"], 2, "やま (yama) significa montanha.")
  ], { route: "kana", rows: ["ma", "ya", "ra", "wa", "n"], label: "Completar o hiragana" }),
  l("h-combinations", "Marcas, combinações e pequenas pausas", 8, "Distinguir dakuten, handakuten, combinações com ゃゅょ e o pequeno っ.", [
    s("Pequenas marcas mudam o som", "O dakuten ゛ transforma k em g, s em z, t em d e h em b. O handakuten ゜ transforma h em p. じ e ぢ são normalmente pronunciados ji; ず e づ, zu, mas suas grafias não são intercambiáveis.", [e("か → が", "", "ka → ga", "Dakuten"), e("は → ば → ぱ", "", "ha → ba → pa", "Sem marca → dakuten → handakuten")]),
    s("Um pequeno や muda tudo", "Junte um kana da coluna i com ゃ, ゅ ou ょ pequenos: きゃ é kya. Com や grande, きや é ki-ya, em duas unidades. O tamanho importa.", [e("きゃ　きゅ　きょ", "", "kya · kyu · kyo", "Sons combinados"), e("しゃしん", "", "shashin", "fotografia")]),
    s("Pausa e vogais longas", "O pequeno っ prepara uma pausa antes da próxima consoante. Vogais longas em hiragana costumam usar outra vogal; おう e おお podem representar o longo. Memorize a grafia junto com a palavra.", [e("きって", "", "kitte", "selo"), e("がっこう", "", "gakkō", "escola"), e("おおきい", "", "ōkii", "grande")], "No campo de leitura, você também pode escrever gakkou, seguindo a grafia de がっこう.")
  ], [
    q("Como se lê ぱ?", ["ba", "pa", "ha"], 1, "O pequeno círculo transforma ha em pa."),
    q("Como se lê きゃ?", ["kya", "kiya", "kaya"], 0, "O ゃ pequeno combina com き para formar kya."),
    q("Qual leitura corresponde a きって?", ["kite", "kiyote", "kitte"], 2, "O っ marca o tempo de fechamento antes de t.")
  ], { route: "kana", group: "combined", label: "Praticar sons combinados" })
];

export const katakanaLessons = [
  l("k-basics", "Os mesmos sons, novas formas", 7, "Entender o uso do katakana e reconhecer suas primeiras fileiras.", [
    s("Você já conhece os sons", "Katakana tem 46 caracteres básicos e representa essencialmente os mesmos sons do hiragana. Muda a forma. Comece pelas vogais e pela fileira K; avance pela tabela em grupos pequenos.", [e("ア　イ　ウ　エ　オ", "", "a · i · u · e · o", "Vogais em katakana"), e("カ　キ　ク　ケ　コ", "", "ka · ki · ku · ke · ko", "Fileira K")]),
    s("Palavras que vieram de fora", "Empréstimos são adaptados aos sons do japonês. Não basta pronunciar a palavra como na língua de origem. Katakana também aparece em onomatopeias, nomes científicos e para dar destaque.", [e("カメラ", "", "kamera", "câmera"), e("アイス", "", "aisu", "sorvete / gelo, conforme o contexto"), e("ブラジル", "", "Burajiru", "Brasil")])
  ], [
    q("Katakana representa…", ["Somente significados", "Os mesmos sons básicos do hiragana", "Só palavras japonesas antigas"], 1, "Os dois silabários compartilham os sons básicos."),
    q("Como se lê カメラ?", ["kamera", "karame", "kamira"], 0, "カ・メ・ラ: ka-me-ra."),
    q("Como costuma ser escrito Brasil?", ["ぶらじる apenas", "Brasil apenas", "ブラジル"], 2, "Nomes estrangeiros costumam ser escritos em katakana.")
  ], { route: "kana", script: "katakana", rows: ["a", "ka"], label: "Começar katakana" }),
  l("k-lookalikes", "Parecidos, mas diferentes", 7, "Distinguir シ・ツ e ソ・ン e usar a ordem dos traços como apoio.", [
    s("シ e ツ", "シ é shi; ツ é tsu. Observe a posição dos dois traços pequenos e a direção do traço maior. Na escrita, o traço longo de シ sobe; o de ツ desce. Veja os modelos animados antes de copiar.", [e("シ", "", "shi", "Compare com し"), e("ツ", "", "tsu", "Compare com つ")]),
    s("ソ e ン", "ソ é so e ン é n. Também diferem pela inclinação e pelo sentido do traço longo. Evite adivinhar só por um ponto isolado.", [e("ソファ", "", "sofa", "sofá"), e("パン", "", "pan", "pão"), e("シャツ", "", "shatsu", "camisa")], "Fontes tipográficas podem variar. O caderno usa modelos próprios para estudar os traços.")
  ], [
    q("Qual caractere é shi?", ["ツ", "シ", "ソ"], 1, "シ é shi. ツ é tsu."),
    q("Como se lê パン?", ["pan", "paso", "ban"], 0, "パ é pa e ン é n."),
    q("O que ajuda a distinguir caracteres parecidos?", ["Só a cor", "Ignorar a direção", "Observar posição e ordem dos traços"], 2, "A escrita ajuda a reconhecer as diferenças de forma e direção.")
  ], { route: "writing", char: "シ", label: "Comparar os traços" }),
  l("k-long", "Vogais longas e sons adaptados", 6, "Ler o prolongamento ー e combinações comuns em empréstimos.", [
    s("Uma linha que prolonga", "Em katakana, ー normalmente prolonga a vogal anterior por mais uma mora. Em コーヒー, tanto o o como o i são longos.", [e("コーヒー", "", "kōhī", "café"), e("スーパー", "", "sūpā", "supermercado"), e("ケーキ", "", "kēki", "bolo")]),
    s("Combinações para outros sons", "Vogais pequenas ajudam a adaptar sons estrangeiros: ファ é fa, フィ é fi, ティ é ti. Nem toda combinação funciona como o padrão com ャ・ュ・ョ.", [e("テレビ", "", "terebi", "televisão"), e("パーティー", "", "pātī", "festa"), e("チケット", "", "chiketto", "ingresso / bilhete")], "O pequeno ッ funciona como o っ do hiragana: prepara uma pausa antes da consoante.")
  ], [
    q("O que faz o sinal ー?", ["Termina a frase", "Prolonga a vogal anterior", "Apaga a consoante"], 1, "ー acrescenta duração à vogal."),
    q("Qual leitura corresponde a コーヒー?", ["kōhī", "kohi curto", "kōhe"], 0, "As duas vogais marcadas por ー são longas."),
    q("Como se lê ファ?", ["fu-a em duas moras", "ha", "fa"], 2, "O ァ pequeno combina com フ para adaptar fa.")
  ], { route: "kana", script: "katakana", label: "Explorar a tabela" })
];
