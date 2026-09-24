import { VOCABULARY } from "./vocabulary.js";
import { SENTENCES } from "./catalog.js";
import { PRINT_DIALOGUES } from "./printActivities.js";

const fill = (id, prompt, reading, answer, choices, context, explanation, speech) => ({ id: "particle-" + id, prompt, reading, answer, choices, context, explanation, speech, instruction: "QUAL PARTÍCULA COMPLETA ESTE MODELO?" });
export const PARTICLE_EXERCISES = [
  fill("topic", "わたし＿学生です。", "わたし＿がくせいです。", "は", ["は","を","で","に"], "Eu sou estudante. Apresente o tópico.", "は apresenta aquilo sobre o que se comenta e se pronuncia wa. 学生です informa que a pessoa é estudante.", "わたしは学生です。"),
  fill("water", "水＿飲みます。", "みず＿のみます。", "を", ["を","に","の","と"], "Bebo água.", "Água é o que se bebe, o objeto desta ação. を vem depois de 水 e se pronuncia o.", "水を飲みます。"),
  fill("bread", "パン＿食べます。", "パン＿たべます。", "を", ["を","が","に","で"], "Como pão. Marque o objeto direto.", "O pão recebe a ação de comer. Nos padrões iniciais, esse objeto é marcado com を.", "パンを食べます。"),
  fill("library", "図書館＿勉強します。", "としょかん＿べんきょうします。", "で", ["で","に","を","の"], "Estudo na biblioteca.", "A biblioteca é onde estudar acontece. Para o local desta ação, usamos で.", "図書館で勉強します。"),
  fill("school", "学校＿行きます。", "がっこう＿いきます。", "に", ["に","で","を","の"], "Vou para a escola. Escolha o destino entre as opções.", "に marca o destino. へ seria outra possibilidade, com foco em direção, mas não está entre as opções desta atividade.", "学校に行きます。"),
  fill("direction", "日本＿行きます。", "にほん＿いきます。", "へ", ["へ","を","で","の"], "Vou ao Japão. Marque a direção.", "へ indica a direção e se lê e como partícula. Fora desse uso, o kana se lê he.", "日本へ行きます。"),
  fill("book", "わたし＿本です。", "わたし＿ほんです。", "の", ["の","を","で","と"], "É meu livro.", "の liga quem possui à coisa possuída: わたしの本, meu livro.", "わたしの本です。"),
  fill("friend", "友達＿話します。", "ともだち＿はなします。", "と", ["と","を","の","で"], "Converso com um amigo.", "と marca a companhia: com quem você conversa. 友達 significa amigo.", "友達と話します。"),
  fill("also", "わたし＿学生です。", "わたし＿がくせいです。", "も", ["も","を","に","で"], "Eu também sou estudante.", "も acrescenta também e substitui は neste padrão. O contexto já mencionou outra pessoa estudante.", "わたしも学生です。"),
  fill("question", "学生です＿。", "がくせいです＿。", "か", ["か","を","に","の"], "Você é estudante? Faça uma pergunta educada.", "か no final marca a pergunta neste modelo. Não precisamos inverter as palavras.", "学生ですか。"),
  fill("like", "音楽＿好きです。", "おんがく＿すきです。", "が", ["が","を","で","に"], "Gosto de música. Use o padrão básico de 好き.", "好き é um adjetivo de preferência. O que você gosta é marcado com が neste padrão, diferente do objeto com を em ouvir música.", "音楽が好きです。"),
  fill("train", "電車＿行きます。", "でんしゃ＿いきます。", "で", ["で","の","を","と"], "Vou de trem.", "Aqui で mostra o meio usado para ir. Não indica o destino, mas o transporte.", "電車で行きます。"),
  fill("time", "三時＿行きます。", "さんじ＿いきます。", "に", ["に","を","と","の"], "Vou às três horas.", "三時 é um horário específico. に marca esse horário no modelo.", "三時に行きます。"),
  fill("cat", "ここに猫＿います。", "ここにねこ＿います。", "が", ["が","を","で","に"], "Há um gato aqui. Apresente o que existe.", "猫 é o sujeito cuja existência se informa. が apresenta essa informação; に já marca o lugar aqui.", "ここに猫がいます。"),
  fill("existence", "図書館＿います。", "としょかん＿います。", "に", ["に","で","を","と"], "Estou na biblioteca.", "Com います, に indica onde a pessoa está. Compare com estudar na biblioteca, que usa で.", "図書館にいます。"),
  fill("read", "図書館＿本を読みます。", "としょかん＿ほんをよみます。", "で", ["で","に","を","の"], "Leio um livro na biblioteca.", "本を já indica o que é lido. 図書館で acrescenta onde a leitura acontece.", "図書館で本を読みます。"),
  fill("list", "パン＿水を買います。", "パン＿みずをかいます。", "と", ["と","の","に","で"], "Compro pão e água.", "と liga os dois substantivos de uma lista: pão e água. を vem depois do conjunto que é comprado.", "パンと水を買います。"),
  fill("teacher", "日本語＿先生です。", "にほんご＿せんせいです。", "の", ["の","で","を","に"], "É professor(a) de japonês.", "の também especifica o tipo: professor de japonês. Não expressa apenas posse material.", "日本語の先生です。"),
  fill("request", "コーヒー＿ください。", "", "を", ["を","に","で","が"], "Um café, por favor.", "O item pedido recebe を antes de ください. É uma estrutura prática para pedir coisas.", "コーヒーをください。"),
  fill("where", "駅＿どこですか。", "えき＿どこですか。", "は", ["は","を","で","に"], "Onde fica a estação? Apresente o tópico.", "A estação é o assunto da pergunta. は apresenta 駅 e どこ pergunta sua localização.", "駅はどこですか。"),
  fill("agreement", "いい天気です＿。", "いいてんきです＿。", "ね", ["ね","を","に","で"], "O tempo está bom, né? Busque concordância.", "ね convida a compartilhar a percepção. A entonação também ajuda a expressar essa intenção.", "いい天気ですね。"),
  fill("information", "おいしいです＿。", "", "よ", ["よ","を","に","で"], "É gostoso, viu. Informe algo à outra pessoa.", "よ apresenta ou reforça informação para o interlocutor. Não marca pergunta como か.", "おいしいですよ。"),
  fill("write", "日本語＿書きます。", "にほんご＿かきます。", "で", ["で","に","と","の"], "Escrevo em japonês.", "で marca o meio ou idioma usado. 日本語で significa em japonês.", "日本語で書きます。"),
  fill("who", "田中さん＿来ます。", "たなかさん＿きます。", "が", ["が","を","で","の"], "Tanaka vem. Responda à pergunta “quem vem?”.", "が identifica quem vem, em resposta ao foco da pergunta. は e が não são intercambiáveis em todo contexto.", "田中さんが来ます。")
];
const situation = (id, context, answer, choices, explanation) => ({ id: "situation-" + id, prompt: context, context: "Leia a situação e escolha a resposta apropriada.", answer, choices, explanation, speech: answer, instruction: "O QUE VOCÊ DIRIA NESTA SITUAÇÃO?" });
export const SITUATION_EXERCISES = [
  situation("morning", "Você chega à aula pela manhã e cumprimenta o professor.", "おはようございます", ["おはようございます","おやすみなさい","じゃあね","いただきます"], "おはようございます é bom dia em tom educado. おやすみなさい é usado antes de dormir."),
  situation("thanks", "Uma pessoa desconhecida ajudou você a encontrar a estação.", "ありがとうございます", ["ありがとうございます","マジ？","草","ただいま"], "Agradeça com a forma educada ありがとうございます, arigatō gozaimasu."),
  situation("again", "Você não conseguiu acompanhar a frase e quer ouvi-la novamente.", "もう一度お願いします", ["もう一度お願いします","また明日","いただきます","いってきます"], "もう一度 é mais uma vez; お願いします torna o pedido educado."),
  situation("slow", "A pessoa está falando rápido demais para você acompanhar.", "ゆっくりお願いします", ["ゆっくりお願いします","すごい","こんにちは","ふたりです"], "ゆっくり significa devagar ou sem pressa. Este bloco pede um ritmo mais lento."),
  situation("food", "Você está prestes a começar uma refeição.", "いただきます", ["いただきます","ごちそうさまでした","おかえりなさい","失礼します"], "いただきます é a expressão anterior à refeição. ごちそうさまでした é usada depois."),
  situation("after", "Você terminou de comer e quer expressar gratidão pela refeição.", "ごちそうさまでした", ["ごちそうさまでした","いただきます","おはようございます","いってらっしゃい"], "ごちそうさまでした reconhece a refeição e quem a proporcionou."),
  situation("home", "Você chegou de volta em casa e avisa quem está lá.", "ただいま", ["ただいま","いってきます","おかえりなさい","こんにちは"], "Quem retorna diz ただいま. Quem recebe pode responder おかえりなさい."),
  situation("welcome", "Alguém da sua casa acabou de chegar e disse ただいま.", "おかえりなさい", ["おかえりなさい","ただいま","ごめん","おやすみなさい"], "おかえりなさい acolhe quem voltou. Essa troca ajuda a memorizar as duas expressões."),
  situation("leave", "Você está saindo de casa para estudar e pretende voltar depois.", "いってきます", ["いってきます","いってらっしゃい","ただいま","ごちそうさまでした"], "いってきます é dito por quem sai. いってらっしゃい é a resposta de quem fica."),
  situation("first", "É a primeira vez que você conhece um colega. Inicie a apresentação.", "はじめまして", ["はじめまして","おかえりなさい","また明日","草"], "はじめまして sinaliza o primeiro encontro. Depois você pode dizer seu nome."),
  situation("customer", "Um cliente passou uma instrução e você quer confirmar que entendeu.", "承知しました", ["承知しました","わかった","マジ？","いいよ"], "承知しました, shōchi shimashita, é uma confirmação educada. As outras opções são casuais."),
  situation("surprise", "Um amigo conta uma novidade surpreendente. Reaja de modo casual.", "マジ？", ["マジ？","失礼します","いただきます","おやすみなさい"], "マジ？ é um Sério? informal. Com alguém menos próximo, 本当ですか é uma opção educada."),
  situation("past", "Como dizer “Comi pão” em tom educado?", "パンを食べました。", ["パンを食べました。","パンを食べます。","パンを食べません。","パンを食べませんでした。"], "ました indica o passado afirmativo a partir da forma em ます. Compare as quatro terminações."),
  situation("negative", "Como dizer “Não como carne” em tom educado?", "肉を食べません。", ["肉を食べません。","肉を食べます。","肉を食べました。","肉を食べませんでした。"], "ません nega no não passado. Pode indicar hábito ou futuro, conforme o contexto."),
  situation("adjective", "Qual expressão significa “cidade tranquila”?", "静かな町", ["静かな町","静か町","静かい町","静かです町"], "静か precisa de な antes do substantivo 町, machi. É um adjetivo do grupo em な."),
  situation("exist", "Como informar que há um gato?", "猫がいます。", ["猫がいます。","猫があります。","猫をいます。","猫であります。"], "猫, neko, é gato. O padrão inicial para a existência de animais usa がいます.")
];
export const vocabularyPracticeItem = item => ({ id: item.id, prompt: item.jp, reading: item.reading, speech: item.jp, answer: item.pt, instruction: "O QUE ESTA PALAVRA SIGNIFICA?", explanation: item.reading + " · " + item.romaji + ". " + (item.note || item.translation) });
export const VOCABULARY_EXERCISES = VOCABULARY.map(vocabularyPracticeItem);
const imageWord = (image, wordId) => { const item = VOCABULARY.find(word => word.id === wordId); return { id: "image-" + item.id, image, prompt: item.jp, reading: item.reading, speech: item.jp, answer: item.jp, answerReading: item.reading, instruction: "QUAL PALAVRA COMBINA COM A IMAGEM?", explanation: item.reading + " · " + item.romaji + " · " + item.pt }; };
export const IMAGE_MATCH_EXERCISES = [
  imageWord("water", "word-water"), imageWord("bread", "word-bread"), imageWord("rice", "word-rice"),
  imageWord("apple", "word-apple"), imageWord("fish", "word-fish"), imageWord("egg", "word-egg"),
  imageWord("cat", "word-cat"), imageWord("dog", "word-dog"), imageWord("book", "word-book"),
  imageWord("tree", "word-tree"), imageWord("coffee", "word-coffee"), imageWord("cake", "word-cake"),
  imageWord("umbrella", "word-umbrella"), imageWord("train", "word-train")
];
const dialogueTurnItem = (dialogue, turn, index) => ({ id: "dialogue-" + dialogue.id + "-" + index, prompt: dialogue.setting + " " + turn.cue, context: "Complete a fala que falta neste diálogo.", answer: turn.answer, answerReading: turn.answerReading || "", speech: turn.answer, instruction: "O QUE VOCÊ DIRIA NESTA FALA?", explanation: dialogue.title + ": a fala é " + turn.answer + "." });
export const DIALOGUE_EXERCISES = PRINT_DIALOGUES.flatMap(dialogue => dialogue.turns.map((turn, index) => turn.cue && turn.answer ? dialogueTurnItem(dialogue, turn, index) : null).filter(Boolean));
export const LISTENING_EXERCISES = [
  ...VOCABULARY.map(item => ({ ...vocabularyPracticeItem(item), id: "listen-" + item.id, listening: true, instruction: "OUÇA E ESCOLHA O SIGNIFICADO" })),
  ...SENTENCES.map(item => ({ id: "listen-sentence-" + item.id, prompt: item.tokens.map(t => t[0]).join("") + "。", reading: item.tokens.map(t => t[3] || t[0]).join("") + "。", speech: item.tokens.map(t => t[0]).join("") + "。", answer: item.prompt.replace(/\s*\([^)]*\)/g,""), listening: true, instruction: "OUÇA E ESCOLHA A FRASE EM PORTUGUÊS", explanation: item.tokens.map(t => t[1]).join(" ") + ". " + item.hint }))
];
export const EXERCISE_GROUPS = [
  { id: "particles", title: "Partículas na prática", symbol: "は", description: "Complete a conexão que falta e entenda por que ela funciona nessa frase.", items: PARTICLE_EXERCISES },
  { id: "situations", title: "O que você diria?", symbol: "話", description: "Escolha respostas para situações reais e pratique as primeiras formas da língua.", items: SITUATION_EXERCISES },
  { id: "words", title: "Palavras que ficam", symbol: "本", description: "Reconheça palavras do dia a dia. Cada resposta traz leitura e significado.", items: VOCABULARY_EXERCISES },
  { id: "images", title: "Imagem e palavra", symbol: "絵", description: "Veja a ilustração e escolha a palavra em japonês que combina com ela.", items: IMAGE_MATCH_EXERCISES },
  { id: "dialogues", title: "Complete o diálogo", symbol: "会", description: "Entre em uma conversa curta e escolha a fala que continua o diálogo.", items: DIALOGUE_EXERCISES },
  { id: "listening", title: "Treine seu ouvido", symbol: "聞", description: "Ouça palavras e frases sem ver o japonês. A transcrição aparece depois da resposta.", items: LISTENING_EXERCISES }
];
