import { example as e, section as s, question as q, lesson as l } from "./helpers.js";

export const foundationLessons = [
  l("welcome", "Japonês do zero: por onde começar", 5, "Entender como o japonês é escrito e saber qual é o primeiro passo.", [
    s("Você pode começar sem saber nada", "Tudo bem se o japonês parece um monte de desenhos agora. Todo mundo começou assim.\nAqui você aprende aos pouquinhos: um grupo de letras por vez, sempre com som, exemplo e um joguinho no final.\nEnquanto os caracteres ainda são novidade, a leitura aparece embaixo, em letras do nosso alfabeto. Isso se chama romaji.", [e("こんにちは", "", "konnichiwa", "Olá / Boa tarde", "Seu primeiro japonês! Neste cumprimento, o は do final se lê wa.")], "Cinco minutos por dia valem mais do que duas horas uma vez por mês."),
    s("Três jeitos de escrever", "O japonês usa três escritas ao mesmo tempo, e cada uma tem um trabalho:\n• Hiragana: as letras do dia a dia. Cada uma vale um som.\n• Katakana: os mesmos sons, com outro desenho. Aparece em palavras que vieram de outras línguas, como café e Brasil.\n• Kanji: desenhos que carregam um significado. O último exemplo abaixo, montanha, é um kanji.", [e("ねこ", "", "neko", "gato · hiragana"), e("コーヒー", "", "kōhī", "café · katakana"), e("山", "やま", "yama", "montanha · kanji")], "O romaji é uma rodinha de bicicleta: ajuda no começo, e depois você tira."),
    s("O seu caminho na trilha", "Primeiro, os sons. Depois, o hiragana, uma família de letras por vez. Com ele, você já se apresenta e faz as primeiras perguntas. Em seguida vem o katakana e, então, os primeiros kanji, sempre dentro de palavras: números, horas e dias.\nCada unidade termina num checkpoint curto, que abre a seguinte. Aos poucos, você conta sua rotina e treina conversas do dia a dia.", [e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Eu como pão.", "パン está em katakana, を e べます em hiragana, e 食 é um kanji. As três escritas numa frase só!")])
  ], [
    q("Por qual escrita a trilha começa?", ["Hiragana", "Todos os kanji de uma vez", "Só romaji"], 0, "O hiragana mostra os sons básicos do japonês. Com ele, todo o resto fica mais fácil."),
    q("Onde é comum encontrar katakana?", ["Só em verbos", "Em palavras de outras línguas, como コーヒー (café)", "Nas traduções para o português"], 1, "コーヒー veio de outra língua, por isso é escrita em katakana."),
    q("O que é romaji?", ["Um tipo de kanji", "A escrita oficial do Japão", "Japonês escrito com as letras do nosso alfabeto"], 2, "Romaji é a leitura em letras latinas. Ajuda no começo, mas a meta é ler sem ele.")
  ], null, {
    hook: "Você não precisa saber nada. Em cinco minutos, o japonês deixa de parecer um muro de desenhos.",
    recap: ["O japonês mistura três escritas: hiragana, katakana e kanji.", "Hiragana e katakana representam sons; kanji carregam significados.", "A trilha começa pelos sons e pelo hiragana."]
  }),
  l("how-it-works", "Como uma frase japonesa se monta", 6, "Perceber que o verbo vem no final e que palavrinhas mostram o papel de cada parte da frase.", [
    s("O verbo fica no final", "Em português dizemos “bebo água”. Em japonês, a ordem é outra: primeiro vem a água, e a ação fica por último.\nAo pé da letra, みずをのみます é “água + bebo”.\nQuase toda frase simples segue esse formato.", [e("水を飲みます。", "みずをのみます。", "mizu o nomimasu", "Bebo água.", "水 (água) vem primeiro; 飲みます (bebo) fecha a frase."), e("パンを食べます。", "パンをたべます。", "pan o tabemasu", "Como pão.", "Mesmo formato: パン (pão) primeiro, 食べます (como) por último.")], "Não monte a frase na ordem do português. Ache o verbo no final e leia o resto de trás para a frente."),
    s("Partículas são etiquetas", "Depois de cada palavra importante vem uma palavrinha que mostra qual é o papel dela na frase. Ela se chama partícula.\nPense numa etiqueta colada: を marca a coisa que recebe a ação, como a água que eu bebo. は marca o assunto da frase, como um “falando de mim…”.", [e("わたしは学生です。", "わたしはがくせいです。", "watashi wa gakusei desu", "Eu sou estudante.", "わたし (eu) + は (assunto) + 学生です (sou estudante)."), e("本を読みます。", "ほんをよみます。", "hon o yomimasu", "Leio um livro.", "本 (livro) + を (o que é lido) + 読みます (leio).")]),
    s("Frase longa é só mais vagão", "Imagine um trem: os vagões vêm na frente e a locomotiva, o verbo, fica no fim.\nUma frase maior não é mais difícil. É a mesma ideia, com mais vagões de “palavra + partícula” antes do verbo.", [e("図書館で本を読みます。", "としょかんでほんをよみます。", "toshokan de hon o yomimasu", "Leio um livro na biblioteca.", "図書館で (onde) + 本を (o quê) + 読みます (leio).")], "Frase grande? Ache o verbo no final e separe o resto em blocos.")
  ], [
    q("Em 水を飲みます, onde fica o verbo?", ["No começo da frase", "Antes da palavra água", "No final da frase"], 2, "水 (água) vem primeiro; 飲みます (bebo) fecha a frase, como na maioria das frases simples."),
    q("O que faz uma partícula como を ou は?", ["Muda o sentido do verbo", "Cola na palavra anterior e mostra o papel dela", "Substitui o verbo"], 1, "A partícula é uma etiqueta colada depois da palavra: mostra se ela é o assunto, o objeto, o lugar…"),
    q("Uma frase longa como 図書館で本を読みます é feita de…", ["Blocos de palavra + partícula antes do verbo", "Uma tradução palavra por palavra do português", "Só kanji, sem partículas"], 0, "図書館で e 本を são dois blocos, um atrás do outro, antes do verbo 読みます.")
  ], null, {
    hook: "Uma frase japonesa é como um trem: os vagões vêm primeiro e a locomotiva, o verbo, fica no fim.",
    recap: ["O verbo fica no final da frase.", "Partículas são etiquetas que mostram o papel de cada palavra.", "Frase longa é só mais blocos antes do verbo."]
  }),
  l("sounds", "Os sons do japonês", 5, "Conhecer as cinco vogais e perceber que, em japonês, a duração do som muda a palavra.", [
    s("Só cinco vogais", "O japonês tem só cinco vogais, sempre nesta ordem: a, i, u, e, o.\nElas são curtas e não mudam: o a é sempre a, nunca vira ã. O u sai com os lábios quase sem arredondar.\nToque no alto-falante, ouça e repita em voz alta.", [e("あ　い　う　え　お", "", "a · i · u · e · o", "As cinco vogais, na ordem da tabela")]),
    s("Cada som tem o seu tempo", "Imagine que cada sílaba japonesa ocupa uma batida de palma. Essa batida se chama mora.\nUma vogal esticada ganha uma batida a mais, e isso muda a palavra! おばさん é tia; おばあさん, com o あ esticado, é avó.\nNo romaji, a vogal esticada aparece com um tracinho em cima: ā, ī, ū, ē, ō.", [e("おばさん", "", "obasan", "tia"), e("おばあさん", "", "obāsan", "avó")], "Bata palmas: o-ba-sa-n são quatro batidas; o-ba-a-sa-n são cinco."),
    s("Três sons para prestar atenção", "し se lê shi, como o xi de “xícara”. ち se lê chi, quase “tchi”. つ se lê tsu, como em “tsunami”, que é uma palavra japonesa!\nO r japonês é sempre fraquinho, como o r de “caro”, mesmo no começo da palavra.", [e("すし", "", "sushi", "sushi"), e("さくら", "", "sakura", "cerejeira"), e("つなみ", "", "tsunami", "tsunami")])
  ], [
    q("Qual é a ordem das vogais japonesas?", ["a, e, i, o, u", "a, i, u, e, o", "i, a, o, e, u"], 1, "A tabela japonesa sempre segue a, i, u, e, o."),
    q("O que muda entre おばさん e おばあさん?", ["Nada, é a mesma palavra", "Só a letra do romaji", "A duração do som e o significado"], 2, "O あ a mais estica a vogal: おばさん é tia e おばあさん é avó."),
    q("Como se lê し?", ["shi, como o xi de “xícara”", "ri", "si, como em “cidade”"], 0, "し é shi. Pense no começo de “xícara”.")
  ], { route: "kana", label: "Ouvir as cinco vogais" }, {
    hook: "Boa notícia: o japonês tem poucos sons, e quase todos já existem no português.",
    recap: ["São só cinco vogais: a, i, u, e, o.", "Esticar uma vogal muda a palavra: おばさん (tia) e おばあさん (avó).", "し é shi, ち é chi, つ é tsu, e o r é sempre fraquinho."]
  }),
  l("greetings", "Seu primeiro olá", 5, "Cumprimentar, agradecer e chamar alguém com educação.", [
    s("Um olá para cada hora do dia", "De manhã, diga おはようございます. Durante o dia, こんにちは. À noite, ao encontrar alguém, こんばんは.\nNão precisa entender cada pedacinho agora. Pense em cada uma como uma fórmula pronta, igual ao nosso “bom dia”.", [e("おはようございます。", "", "ohayō gozaimasu", "Bom dia."), e("こんにちは。", "", "konnichiwa", "Olá / Boa tarde.", "O は do final se lê wa."), e("こんばんは。", "", "konbanwa", "Boa noite (ao chegar).")]),
    s("Obrigado e com licença", "ありがとうございます é um “muito obrigado” educado.\nすみません é um curinga: serve para pedir licença, chamar alguém, como um “moço!”, ou pedir desculpas.\nE na hora de dormir o boa-noite muda: おやすみなさい.", [e("ありがとうございます。", "", "arigatō gozaimasu", "Muito obrigado(a)."), e("すみません。", "", "sumimasen", "Com licença / desculpe."), e("おやすみなさい。", "", "oyasuminasai", "Boa noite (antes de dormir).")], "こんばんは é para quem chega; おやすみなさい é para quem vai dormir."),
    s("Treine em voz alta", "Toque no alto-falante, ouça e repita cada expressão. Depois, tente dizer sem olhar.\nImagine a cena: você entra numa loja à tarde (こんにちは), chama o atendente (すみません) e agradece no fim (ありがとうございます).")
  ], [
    q("Você quer chamar um atendente numa loja. O que dizer?", ["おやすみなさい", "すみません", "こんばんは"], 1, "すみません chama a atenção de alguém com educação, como um “com licença”."),
    q("Como agradecer com educação?", ["ありがとうございます", "こんにちは", "おはようございます"], 0, "ありがとうございます é um agradecimento educado."),
    q("Quando se usa こんばんは?", ["Na hora de dormir", "Só de manhã", "Ao encontrar alguém à noite"], 2, "こんばんは cumprimenta à noite. Para ir dormir, use おやすみなさい.")
  ], null, {
    hook: "Com cinco expressões, você já consegue ser educado em japonês.",
    recap: ["Manhã: おはようございます. Dia: こんにちは. Noite: こんばんは.", "ありがとうございます agradece; すみません pede licença ou desculpas.", "おやすみなさい é o boa-noite de quem vai dormir."]
  })
];

// As dicas de memória são autorais; servem para fixar a forma, não explicam a origem dos caracteres.
export const hiraganaLessons = [
  l("h-vowels", "あいうえお: as cinco vogais", 6, "Ler あ, い, う, え, お e as primeiras palavras.", [
    s("Conheça as vogais", "Cada letra do hiragana vale um som. Estas cinco são as vogais, e todas as outras famílias se apoiam nelas.\nPara cada uma: olhe a forma, ouça, diga em voz alta e leia a dica de memória.", [
      e("あ", "", "a", "a, como em “água”", "Uma cruz com um laço enrolado embaixo. Imagine alguém amarrando o laço e dizendo “Ah, pronto!”."),
      e("い", "", "i", "i, como em “ilha”", "Dois tracinhos em pé, lado a lado, como dois “i” sem pingo."),
      e("う", "", "u", "u, com os lábios quase sem arredondar", "Um tracinho em cima e uma curva que lembra uma orelha. Mão na orelha: “Uh? Não ouvi!”."),
      e("え", "", "e", "e, como em “ele”", "Um tracinho e um zigue-zague com a perna esticada, como alguém dançando: “Ê!”."),
      e("お", "", "o", "o, como em “ovo”", "Parece あ, mas com um tracinho solto no alto, à direita. Esse tracinho é o “olhinho” do お.")
    ]),
    s("Você já consegue ler", "Agora junte os sons, sem pressa: い + え = ie. Cada letra ganha a mesma batida, sem engolir nenhuma.\nTente ler antes de olhar o romaji.", [e("いえ", "", "ie", "casa"), e("あい", "", "ai", "amor"), e("うえ", "", "ue", "em cima"), e("あお", "", "ao", "azul")], "あ e お são parecidos. Procure o tracinho solto do お.")
  ], [
    q("Qual é o som de あ?", ["o", "a", "e"], 1, "あ é a. O お é parecido, mas tem um tracinho a mais no alto, à direita."),
    q("Qual letra é o i?", ["い", "う", "え"], 0, "い são dois tracinhos em pé, como dois “i” sem pingo."),
    q("Como se lê いえ, que significa casa?", ["ao", "ue", "ie"], 2, "い = i e え = e. いえ é casa.")
  ], { route: "kana", rows: ["a"], label: "Praticar as cinco vogais" }, {
    hook: "Cinco letras e você já lê “casa”, “amor” e “azul” em japonês.",
    recap: ["あ a · い i · う u · え e · お o.", "Cada letra é uma batida: いえ é i-e.", "Já dá para ler いえ (casa), あい (amor) e あお (azul)."]
  }),
  l("h-rows", "Revisão: de K até H", 6, "Ler palavras que misturam as famílias K, S, T, N e H.", [
    s("Todas juntas", "Aqui estão as cinco famílias que você aprendeu, lado a lado.\nLeia cada linha em voz alta, sem olhar o romaji. Se alguma letra travar, volte na lição da família dela.", [e("か　き　く　け　こ", "", "ka · ki · ku · ke · ko", "Família K"), e("さ　し　す　せ　そ", "", "sa · shi · su · se · so", "Família S"), e("た　ち　つ　て　と", "", "ta · chi · tsu · te · to", "Família T"), e("な　に　ぬ　ね　の", "", "na · ni · nu · ne · no", "Família N"), e("は　ひ　ふ　へ　ほ", "", "ha · hi · fu · he · ho", "Família H")]),
    s("Palavras maiores", "Agora palavras de três ou quatro letras. Leia uma letra por vez e depois a palavra inteira.", [e("さかな", "", "sakana", "peixe"), e("おかし", "", "okashi", "doce, guloseima"), e("あなた", "", "anata", "você"), e("ちいさい", "", "chiisai", "pequeno")], "Travou numa letra? Tudo bem. Volte na família dela e jogue de novo.")
  ], [
    q("Como se lê さかな?", ["sakana", "sakina", "sokana"], 0, "さ + か + な = sakana, peixe."),
    q("Qual é a ordem da família T?", ["た つ ち て と", "た ち つ て と", "と て つ ち た"], 1, "Ta, chi, tsu, te, to: a mesma ordem das vogais a, i, u, e, o."),
    q("O que significa あなた?", ["Peixe", "Doce", "Você"], 2, "あなた (anata) é você. Na conversa, os japoneses costumam usar o nome da pessoa em vez de あなた.")
  ], { route: "kana", rows: ["ka", "sa", "ta", "na", "ha"], label: "Praticar as cinco famílias" }, {
    hook: "Pausa para respirar: você já sabe 30 letras. Hora de ver isso funcionando em palavras maiores.",
    recap: ["K, S, T, N e H seguem a ordem a, i, u, e, o.", "Leia letra por letra e depois a palavra inteira.", "さかな (peixe), おかし (doce), あなた (você)."]
  }),
  l("h-rest", "わ, を e ん: a tabela completa", 6, "Ler わ, を e ん e fechar os 46 hiragana básicos.", [
    s("As últimas três", "わ é wa, como “uá”.\nを aparece como wo nas tabelas, mas se lê o. Ela quase só aparece como partícula, aquela etiqueta que marca o objeto da frase.\nん é a única letra que é só consoante: um n nasal, que nunca começa palavra.", [
      e("わ", "", "wa", "wa, como “uá”", "Parece ね sem o laço, com uma barriga redonda: “Uá, que barriga!”."),
      e("を", "", "o", "o (a tabela chama de wo)", "Alguém de braços abertos erguendo um peso: “Ô, que pesado!”."),
      e("ん", "", "n", "n, um som nasal", "Parece um “n” escrito à mão. É só o som de n, sem vogal.")
    ]),
    s("Os 46 básicos", "Pronto: são 46 letras básicas. E repare que você não decorou 46 coisas soltas, e sim 10 famílias que seguem a mesma regra.\nAgora leia palavras com as letras novas.", [e("わたし", "", "watashi", "eu"), e("ほん", "", "hon", "livro"), e("みかん", "", "mikan", "tangerina"), e("にほん", "", "Nihon", "Japão")], "Letras com risquinhos, como が, e combinações, como きゃ, vêm a seguir. Elas ampliam a tabela, mas os básicos são 46.")
  ], [
    q("Quantos hiragana básicos existem?", ["71", "46", "26"], 1, "São 46 básicos. As formas com risquinhos e as combinações ampliam a tabela."),
    q("Como se lê a partícula を?", ["o", "wa", "n"], 0, "を se pronuncia o, mesmo aparecendo como wo nas tabelas."),
    q("Qual palavra significa Japão?", ["ほん", "みかん", "にほん"], 2, "にほん (Nihon) é Japão. ほん sozinho é livro.")
  ], { route: "kana", rows: ["wa", "n"], label: "Completar o hiragana" }, {
    hook: "Mais três letras e pronto: você conhece todo o hiragana básico!",
    recap: ["わ wa · を o (partícula) · ん n.", "São 46 letras básicas, organizadas em 10 famílias.", "Já dá para ler わたし (eu) e にほん (Japão)."]
  }),
  l("h-combinations", "Letrinhas pequenas: きゃ, っ e sons longos", 8, "Ler combinações com ゃゅょ, a pausa do っ e as vogais esticadas.", [
    s("や, ゆ, よ pequenininhos", "Junte uma letra que termina em i (き, し, ち…) com um ゃ, ゅ ou ょ pequeno, e as duas viram um som só: き + ゃ = kya.\nO tamanho importa: きゃ, com o や pequeno, é kya, uma batida; きや, com o や grande, é ki-ya, duas batidas.", [e("きゃ　きゅ　きょ", "", "kya · kyu · kyo", "Sons combinados"), e("しゃしん", "", "shashin", "foto"), e("おちゃ", "", "ocha", "chá")]),
    s("っ pequeno: uma pausinha", "O つ pequeno (っ) não tem som próprio. Ele é uma pausinha, como se você segurasse a próxima consoante.\nEm きって, segure o t por um instante: kit-te. Sem a pausa, a palavra muda.", [e("きって", "", "kitte", "selo"), e("がっこう", "", "gakkō", "escola")]),
    s("Vogais esticadas", "Para esticar uma vogal no hiragana, escreve-se mais uma vogal depois: おかあさん tem o あ esticado.\nNo som do o, o esticado quase sempre aparece como う: がっこう se lê gakkō.\nNo romaji, o esticado ganha um tracinho em cima: ō.", [e("おかあさん", "", "okāsan", "mãe"), e("おおきい", "", "ōkii", "grande"), e("きょう", "", "kyō", "hoje", "きょ é um som combinado, e o う estica o o.")], "Para digitar がっこう num teclado japonês, escreva gakkou.")
  ], [
    q("Como se lê きゃ?", ["kiya, em duas batidas", "kya, numa batida só", "kaya"], 1, "O ゃ pequeno se junta ao き: kya, um som só."),
    q("O que o っ pequeno faz em きって?", ["Faz uma pausinha antes do t", "Vira um tsu completo", "Estica a vogal"], 0, "O っ guarda uma batida em silêncio antes da consoante seguinte: kit-te."),
    q("Como se lê おかあさん?", ["okasan", "okaisan", "okāsan, com o a esticado"], 2, "かあ estica o a: o-ka-a-sa-n, okāsan, mãe.")
  ], { route: "kana", group: "combined", label: "Praticar as combinações" }, {
    hook: "Letra pequena, efeito grande: é ela que faz “foto”, “escola” e “selo” soarem certinho.",
    recap: ["き + ゃ pequeno = kya, um som só.", "っ pequeno é uma pausinha: きって é kit-te.", "Vogal escrita duas vezes é som esticado: おかあさん."]
  })
];

export const katakanaLessons = [
  l("k-basics", "Katakana: os mesmos sons, outro desenho", 7, "Entender para que serve o katakana e ler as vogais e a família K.", [
    s("Para que serve o katakana", "O katakana tem as mesmas 46 letras básicas e os mesmos sons do hiragana. Muda só o desenho, que é mais reto e cheio de cantos.\nEle aparece em palavras que vieram de outras línguas, em nomes estrangeiros, marcas e onomatopeias.", [e("カメラ", "", "kamera", "câmera"), e("ブラジル", "", "Burajiru", "Brasil")]),
    s("As vogais", "Compare cada uma com o hiragana que você já conhece. Algumas são primas bem próximas.", [
      e("ア", "", "a", "a", "Parece um machado, ou um A sem a perna da direita."),
      e("イ", "", "i", "i", "Uma pessoa encostada num poste."),
      e("ウ", "", "u", "u", "É う com um chapéu: tracinho em cima e uma casinha."),
      e("エ", "", "e", "e", "Uma viga de elevador. E de elevador."),
      e("オ", "", "o", "o", "Uma cruz com um traço na diagonal: alguém de braços abertos gritando “Ô!”.")
    ]),
    s("A família K", "Repare como カ e キ são quase iguais a か e き.", [
      e("カ", "", "ka", "ka", "Igual a か, só que sem o tracinho."),
      e("キ", "", "ki", "ki", "Igual a き, sem a curva de baixo."),
      e("ク", "", "ku", "ku", "Um 7 baixinho, com o canto virado para a esquerda."),
      e("ケ", "", "ke", "ke", "Parece um K torto."),
      e("コ", "", "ko", "ko", "A quina de uma caixa. É こ com os cantos ligados.")
    ], "Muitas letras do katakana lembram o hiragana. Procure a semelhança!")
  ], [
    q("O katakana representa…", ["Só significados", "Os mesmos sons do hiragana", "Só palavras antigas"], 1, "Hiragana e katakana têm os mesmos sons. Muda o desenho e o uso."),
    q("Como se lê カメラ?", ["kamera", "karame", "kamira"], 0, "カ・メ・ラ: ka-me-ra, câmera."),
    q("Como Brasil costuma ser escrito em japonês?", ["ぶらじる", "Brasil", "ブラジル"], 2, "Nomes estrangeiros costumam ser escritos em katakana.")
  ], { route: "kana", script: "katakana", rows: ["a", "ka"], label: "Começar o katakana" }, {
    hook: "Boa notícia: você já sabe todos os sons do katakana. Só falta conhecer o desenho novo.",
    recap: ["Katakana: os mesmos sons do hiragana, com desenho mais reto.", "Aparece em palavras estrangeiras, nomes e marcas.", "ア イ ウ エ オ · カ キ ク ケ コ."]
  }),
  l("k-lookalikes", "シ ou ツ? ソ ou ン?", 6, "Distinguir シ, ツ, ソ e ン pela direção do traço longo.", [
    s("シ e ツ", "シ é shi; ツ é tsu. O truque está nos pingos e no traço longo.\nEm シ, os pingos ficam um embaixo do outro, à esquerda, e o traço longo sobe de baixo para cima. Em ツ, os pingos ficam lado a lado, em cima, e o traço longo desce.", [e("シ", "", "shi", "shi", "Pingos à esquerda, traço subindo. Compare com し."), e("ツ", "", "tsu", "tsu", "Pingos em cima, traço descendo. Compare com つ.")]),
    s("ソ e ン", "ソ é so; ン é n. A lógica é a mesma: em ソ, o traço longo desce de cima; em ン, ele sobe de baixo, como em シ.", [e("ソファ", "", "sofa", "sofá"), e("パン", "", "pan", "pão"), e("シャツ", "", "shatsu", "camisa")], "Na dúvida, olhe a direção do traço longo: subindo é シ ou ン; descendo é ツ ou ソ.")
  ], [
    q("Qual letra é shi?", ["ツ", "シ", "ソ"], 1, "シ é shi: pingos à esquerda e traço longo subindo. ツ é tsu."),
    q("Como se lê パン?", ["pan", "paso", "ban"], 0, "パ é pa e ン é n: pan, pão."),
    q("O que ajuda a separar letras parecidas?", ["Só a cor", "Ignorar a direção", "Olhar a posição dos pingos e a direção do traço"], 2, "A direção do traço longo e a posição dos pingos resolvem a dúvida.")
  ], { route: "writing", char: "シ", label: "Comparar os traços" }, {
    hook: "As quatro letras que mais confundem quem aprende katakana. Com um truque, a confusão acaba.",
    recap: ["シ (shi) e ン (n): o traço longo sobe.", "ツ (tsu) e ソ (so): o traço longo desce.", "Pingos lado a lado, em cima: ツ. Um embaixo do outro: シ."]
  }),
  l("k-long", "ー e letras pequenas: sons de fora", 6, "Ler o tracinho ー e as combinações que adaptam sons estrangeiros.", [
    s("ー estica o som", "No katakana, a vogal esticada vira um tracinho: ー. Ele repete a vogal anterior por mais uma batida.\nEm コーヒー (café), tanto o o quanto o i são esticados: kō-hī.", [e("コーヒー", "", "kōhī", "café"), e("スーパー", "", "sūpā", "supermercado"), e("ケーキ", "", "kēki", "bolo")]),
    s("Letras pequenas para sons novos", "Para escrever sons que não existem no japonês, o katakana usa vogais pequenas: フ + ァ = fa; テ + ィ = ti.\nE o ッ pequeno é a mesma pausinha do っ do hiragana.", [e("テレビ", "", "terebi", "televisão"), e("パーティー", "", "pātī", "festa"), e("チケット", "", "chiketto", "ingresso / bilhete")], "Nem toda combinação segue o padrão de ャ, ュ, ョ. Aprenda junto com a palavra.")
  ], [
    q("O que faz o sinal ー?", ["Termina a frase", "Estica a vogal anterior", "Apaga a consoante"], 1, "ー acrescenta uma batida à vogal anterior."),
    q("Qual leitura corresponde a コーヒー?", ["kōhī", "kohi, tudo curto", "kōhe"], 0, "As duas vogais marcadas por ー são esticadas: kō-hī."),
    q("Como se lê ファ?", ["fu-a, em duas batidas", "ha", "fa"], 2, "O ァ pequeno se junta ao フ para formar fa.")
  ], { route: "kana", script: "katakana", label: "Explorar a tabela" }, {
    hook: "Café, bolo, festa: quase todo cardápio japonês usa estes truques.",
    recap: ["ー estica a vogal anterior: コーヒー.", "Vogais pequenas criam sons novos: ファ é fa, ティ é ti.", "ッ pequeno é uma pausinha, igual ao っ do hiragana."]
  })
];
