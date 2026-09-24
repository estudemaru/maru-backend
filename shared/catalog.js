import { MORE_SENTENCES, MORE_EXPRESSIONS } from "./extraCatalog.js";
import { KANA, KANA_ROWS } from "./content.js";

const prefixes = { ka: "ky", sa: "sh", ta: "ch", na: "ny", ha: "hy", ma: "my", ra: "ry", ga: "gy", za: "j", ba: "by", pa: "py" };
export const COMBINATIONS = KANA_ROWS.filter(row => prefixes[row.id]).flatMap(row =>
  ["hiragana", "katakana"].flatMap(script => {
    const small = script === "hiragana" ? ["ゃ", "ゅ", "ょ"] : ["ャ", "ュ", "ョ"];
    const base = row[script === "hiragana" ? "h" : "k"][1];
    return small.map((suffix, index) => ({
      id: (script === "hiragana" ? "h" : "k") + "-" + row.id + "-y" + index,
      script, row: row.id, group: "combined", char: base + suffix,
      romaji: prefixes[row.id] + ["a", "u", "o"][index]
    }));
  })
);
export const ALL_KANA = [...KANA, ...COMBINATIONS];

export const BEGINNER_KANJI = [
  ["一", "いち", "ichi", "um", "一つ", "ひとつ", "hitotsu", "uma coisa"],
  ["二", "に", "ni", "dois", "二つ", "ふたつ", "futatsu", "duas coisas"],
  ["三", "さん", "san", "três", "三つ", "みっつ", "mittsu", "três coisas"],
  ["四", "よん", "yon", "quatro", "四つ", "よっつ", "yottsu", "quatro coisas"],
  ["五", "ご", "go", "cinco", "五つ", "いつつ", "itsutsu", "cinco coisas"],
  ["六", "ろく", "roku", "seis", "六つ", "むっつ", "muttsu", "seis coisas"],
  ["七", "なな", "nana", "sete", "七つ", "ななつ", "nanatsu", "sete coisas"],
  ["八", "はち", "hachi", "oito", "八つ", "やっつ", "yattsu", "oito coisas"],
  ["九", "きゅう", "kyū", "nove", "九つ", "ここのつ", "kokonotsu", "nove coisas"],
  ["十", "じゅう", "jū", "dez", "十日", "とおか", "tōka", "dia 10 / dez dias"],
  ["日", "ひ", "hi", "dia / sol", "日本", "にほん", "Nihon", "Japão"],
  ["月", "つき", "tsuki", "lua / mês", "月曜日", "げつようび", "getsuyōbi", "segunda-feira"],
  ["山", "やま", "yama", "montanha", "火山", "かざん", "kazan", "vulcão"],
  ["川", "かわ", "kawa", "rio", "小川", "おがわ", "ogawa", "riacho"],
  ["水", "みず", "mizu", "água", "水曜日", "すいようび", "suiyōbi", "quarta-feira"],
  ["木", "き", "ki", "árvore", "木曜日", "もくようび", "mokuyōbi", "quinta-feira"],
  ["人", "ひと", "hito", "pessoa", "日本人", "にほんじん", "Nihon-jin", "japonês / pessoa japonesa"],
  ["本", "ほん", "hon", "livro / origem", "本屋", "ほんや", "hon'ya", "livraria"],
  ["火", "ひ", "hi", "fogo", "火曜日", "かようび", "kayōbi", "terça-feira"],
  ["口", "くち", "kuchi", "boca", "入口", "いりぐち", "iriguchi", "entrada"]
].map(([char, reading, romaji, meaning, word, wordReading, wordRomaji, wordMeaning]) => ({
  id: "kanji-" + char, char, term: char, reading, romaji, meaning, word, wordReading, wordRomaji, wordMeaning
}));

export const PARTICLES = [
  { char: "は", sound: "wa", name: "Tópico", meaning: "Apresenta aquilo sobre o que você vai comentar.", jp: "わたしは学生です。", reading: "わたしはがくせいです。", romaji: "watashi wa gakusei desu", pt: "Eu sou estudante.", note: "Como partícula, は se pronuncia wa. Também pode marcar contraste." },
  { char: "が", sound: "ga", name: "Sujeito", meaning: "Identifica o sujeito; pode destacar quem ou o que.", jp: "田中さんが来ます。", reading: "たなかさんがきます。", romaji: "Tanaka-san ga kimasu", pt: "Tanaka vem. (respondendo a “quem vem?”)", note: "は e が dependem do contexto. Não são substitutos universais." },
  { char: "を", sound: "o", name: "Objeto da ação", meaning: "Marca o objeto direto nestes padrões iniciais.", jp: "水を飲みます。", reading: "みずをのみます。", romaji: "mizu o nomimasu", pt: "Bebo água.", note: "A grafia também é identificada como wo. A pronúncia usual é o." },
  { char: "に", sound: "ni", name: "Destino, tempo e localização", meaning: "Marca destino, horário específico ou lugar de existência.", jp: "学校に行きます。", reading: "がっこうにいきます。", romaji: "gakkō ni ikimasu", pt: "Vou para a escola.", note: "Com います e あります, pode marcar onde alguém ou algo está." },
  { char: "で", sound: "de", name: "Local da ação ou meio", meaning: "Diz onde uma ação acontece ou qual meio é usado.", jp: "図書館で勉強します。", reading: "としょかんでべんきょうします。", romaji: "toshokan de benkyō shimasu", pt: "Estudo na biblioteca.", note: "電車で行きます (densha de ikimasu) significa “Vou de trem”." },
  { char: "へ", sound: "e", name: "Direção", meaning: "Indica a direção de um movimento.", jp: "日本へ行きます。", reading: "にほんへいきます。", romaji: "Nihon e ikimasu", pt: "Vou ao Japão.", note: "Como partícula, へ se pronuncia e." },
  { char: "の", sound: "no", name: "Relação entre nomes", meaning: "Liga substantivos, expressando posse ou especificação.", jp: "わたしの本です。", reading: "わたしのほんです。", romaji: "watashi no hon desu", pt: "É meu livro.", note: "O substantivo que especifica vem antes: 日本語の先生, professor de japonês." },
  { char: "と", sound: "to", name: "Companhia ou lista", meaning: "Expressa com quem ou liga substantivos.", jp: "友達と話します。", reading: "ともだちとはなします。", romaji: "tomodachi to hanashimasu", pt: "Converso com um amigo.", note: "パンと水 é “pão e água”. と não liga quaisquer frases como “e” em português." },
  { char: "も", sound: "mo", name: "Também", meaning: "Acrescenta algo ao que já foi mencionado.", jp: "わたしも学生です。", reading: "わたしもがくせいです。", romaji: "watashi mo gakusei desu", pt: "Eu também sou estudante.", note: "Neste padrão, も toma o lugar de は." },
  { char: "か", sound: "ka", name: "Pergunta", meaning: "Encerra uma pergunta nos padrões educados iniciais.", jp: "学生ですか。", reading: "がくせいですか。", romaji: "gakusei desu ka", pt: "Você é estudante?", note: "Não é preciso inverter a ordem das palavras." },
  { char: "ね", sound: "ne", name: "Acordo e percepção compartilhada", meaning: "Busca concordância ou compartilha uma observação.", jp: "いい天気ですね。", reading: "いいてんきですね。", romaji: "ii tenki desu ne", pt: "O tempo está bom, né?", note: "A entonação e a situação definem a nuance." },
  { char: "よ", sound: "yo", name: "Informação e ênfase", meaning: "Apresenta informação ou reforça o que se diz.", jp: "おいしいですよ。", reading: "おいしいですよ。", romaji: "oishii desu yo", pt: "É gostoso, viu.", note: "Pode soar enfático. Observe como a outra pessoa reage e a relação entre vocês." }
];

const BASE_EXPRESSIONS = [
  ["hello", "こんにちは", "こんにちは", "konnichiwa", "Olá / boa tarde", "everyday", "Cumprimento durante o dia. O は final é pronunciado wa.", "Ao encontrar alguém durante o dia."],
  ["thanks", "ありがとうございます", "ありがとうございます", "arigatō gozaimasu", "Muito obrigado(a)", "everyday", "Agradecimento educado, útil com desconhecidos.", "Depois de receber ajuda."],
  ["excuse", "すみません", "すみません", "sumimasen", "Com licença / desculpe", "everyday", "O sentido depende da situação.", "Para chamar alguém antes de pedir informação."],
  ["meal", "いただきます", "いただきます", "itadakimasu", "Expressão antes de comer", "culture", "Não é uma tradução literal de “bom apetite”.", "Antes de iniciar uma refeição."],
  ["after-meal", "ごちそうさまでした", "ごちそうさまでした", "gochisōsama deshita", "Agradecimento após a refeição", "culture", "Reconhece a refeição e quem a proporcionou.", "Ao terminar de comer."],
  ["work", "お疲れさまです", "おつかれさまです", "otsukaresama desu", "Reconhecimento do esforço", "work", "Saudação comum entre colegas; não se limita a “você está cansado”.", "Ao encontrar um colega ou encerrar uma atividade."],
  ["first-meeting", "よろしくお願いします", "よろしくおねがいします", "yoroshiku onegai shimasu", "Conto com você / prazer", "culture", "Fórmula de boa vontade; a tradução muda muito com o contexto.", "Ao terminar uma apresentação ou iniciar uma colaboração."],
  ["seriously", "マジ？", "マジ？", "maji?", "Sério?", "slang", "Informal. Em contexto educado: 本当ですか (hontō desu ka).", "Surpresa numa conversa entre amigos."],
  ["yabai", "やばい", "やばい", "yabai", "Caramba / complicado / incrível", "slang", "Pode ser positivo ou negativo. Depende da entonação e da situação.", "やばい、遅れる！ — Ih, vou me atrasar!"],
  ["meccha", "めっちゃ", "めっちゃ", "meccha", "Muito / super", "slang", "Intensificador informal. とても é uma alternativa mais neutra.", "めっちゃおいしい。 — Muito gostoso."],
  ["understood", "なるほど", "なるほど", "naruhodo", "Ah, entendi / faz sentido", "everyday", "Mostra que você acompanhou uma explicação.", "Ao entender o motivo de alguma coisa."],
  ["see-you", "じゃあね", "じゃあね", "jā ne", "Até mais", "slang", "Despedida casual entre pessoas próximas.", "Ao se despedir de um amigo."],
  ["spoiler", "ネタバレ", "ネタバレ", "netabare", "Spoiler", "internet", "Revelação de detalhes de uma história.", "ネタバレ注意 — Atenção: spoilers."],
  ["oshi", "推し", "おし", "oshi", "Seu favorito / quem você apoia como fã", "internet", "Termo de comunidades de fãs; pode ser pessoa ou personagem.", "Ao falar de um artista ou personagem favorito."],
  ["kusa", "草", "くさ", "kusa", "Risada na internet", "internet", "Literalmente grama. Uso escrito informal, dependente da comunidade.", "Uma reação a uma mensagem engraçada."],
  ["ryokai", "了解です", "りょうかいです", "ryōkai desu", "Entendido", "work", "Com superiores e clientes, 承知しました (shōchi shimashita) pode ser mais apropriado.", "Ao confirmar uma informação entre colegas."]
].map(([id, jp, reading, romaji, pt, category, note, context]) => ({ id: "exp-" + id, jp, reading, romaji, pt, category, note, context }));

const BASE_SENTENCES = [
  { id: "identity", title: "Uma apresentação", prompt: "Eu sou estudante.", pattern: "tópico + は + informação + です", hint: "は marca o tópico e se lê wa.", tokens: [["わたし", "watashi", "eu"], ["は", "wa", "tópico"], ["学生", "gakusei", "estudante", "がくせい"], ["です", "desu", "final educado"]], distractors: [["を", "o", "objeto"], ["に", "ni", "destino"]] },
  { id: "origin", title: "De onde você é", prompt: "Eu sou brasileiro(a).", pattern: "tópico + は + nacionalidade + です", hint: "ブラジル人 significa pessoa brasileira.", tokens: [["わたし", "watashi", "eu"], ["は", "wa", "tópico"], ["ブラジル人", "Burajiru-jin", "brasileiro(a)", "ブラジルじん"], ["です", "desu", "final educado"]], distractors: [["で", "de", "local da ação"], ["を", "o", "objeto"]] },
  { id: "question", title: "Uma pergunta", prompt: "Você é estudante? (sem pronome)", pattern: "informação + です + か", hint: "か encerra a pergunta; o contexto indica a pessoa.", tokens: [["学生", "gakusei", "estudante", "がくせい"], ["です", "desu", "final educado"], ["か", "ka", "pergunta"]], distractors: [["を", "o", "objeto"], ["も", "mo", "também"]] },
  { id: "water", title: "Uma ação cotidiana", prompt: "Bebo água.", pattern: "objeto + を + verbo", hint: "O objeto vem antes de を e o verbo encerra a frase.", tokens: [["水", "mizu", "água", "みず"], ["を", "o", "objeto"], ["飲みます", "nomimasu", "bebo", "のみます"]], distractors: [["に", "ni", "destino"], ["で", "de", "local da ação"]] },
  { id: "reading", title: "Um livro por vez", prompt: "Leio um livro.", pattern: "objeto + を + verbo", hint: "本 é livro e 読みます é ler na forma educada.", tokens: [["本", "hon", "livro", "ほん"], ["を", "o", "objeto"], ["読みます", "yomimasu", "leio", "よみます"]], distractors: [["へ", "e", "direção"], ["飲みます", "nomimasu", "bebo"]] },
  { id: "school", title: "Um destino", prompt: "Vou para a escola. (use に)", pattern: "destino + に + verbo de movimento", hint: "に marca o destino. へ também seria possível em outro exercício.", tokens: [["学校", "gakkō", "escola", "がっこう"], ["に", "ni", "destino"], ["行きます", "ikimasu", "vou", "いきます"]], distractors: [["を", "o", "objeto"], ["で", "de", "local da ação"]] },
  { id: "library", title: "O lugar da ação", prompt: "Estudo na biblioteca.", pattern: "local da ação + で + verbo", hint: "A biblioteca é onde a ação acontece: use で.", tokens: [["図書館", "toshokan", "biblioteca", "としょかん"], ["で", "de", "local da ação"], ["勉強します", "benkyō shimasu", "estudo", "べんきょうします"]], distractors: [["に", "ni", "destino"], ["を", "o", "objeto"]] },
  { id: "like", title: "Algo de que você gosta", prompt: "Gosto de música.", pattern: "preferência + が + 好きです", hint: "Neste padrão com 好き, o que você gosta vem com が.", tokens: [["音楽", "ongaku", "música", "おんがく"], ["が", "ga", "marca a preferência"], ["好きです", "suki desu", "gosto", "すきです"]], distractors: [["を", "o", "objeto"], ["に", "ni", "destino"]] },
  { id: "coffee", title: "No café", prompt: "Um café, por favor.", pattern: "item + を + ください", hint: "ください pede que lhe deem o item.", tokens: [["コーヒー", "kōhī", "café"], ["を", "o", "objeto"], ["ください", "kudasai", "por favor"]], distractors: [["は", "wa", "tópico"], ["です", "desu", "final educado"]] },
  { id: "station", title: "Pedir uma informação", prompt: "Onde fica a estação?", pattern: "lugar + は + どこ + です + か", hint: "どこ significa onde. A frase termina com ですか.", tokens: [["駅", "eki", "estação", "えき"], ["は", "wa", "tópico"], ["どこ", "doko", "onde"], ["です", "desu", "final educado"], ["か", "ka", "pergunta"]], distractors: [["を", "o", "objeto"], ["だれ", "dare", "quem"]] }
];

export const EXPRESSIONS = [...BASE_EXPRESSIONS, ...MORE_EXPRESSIONS];
export const SENTENCES = [...BASE_SENTENCES, ...MORE_SENTENCES];
