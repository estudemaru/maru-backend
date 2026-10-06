import { lesson as l, section as s, example as e, question as q } from "./helpers.js";

// Etapa "Quanto, quando e qual": números, horas, datas, contadores e これ/それ/あれ.
// Cada lição leva ao jogo do Arcade (shared/kazu.js) já na categoria dela.
const practice = (category, label) => ({ route: "arcade/kazu", category, label });

export const numberLessons = [
  l("num-count", "Números até dez mil", 8, "Ler e dizer números de 1 a 10.000, inclusive preços em ienes.", [
    s("Do um ao dez, de novo", "Você já viu os kanji de 一 a 十. Na rua, os números quase sempre aparecem como 1, 2, 3, mas o som é o mesmo.\nTrês números têm dois jeitos de falar: 4 é よん ou し, 7 é なな ou しち, 9 é きゅう ou く. Para contar, use よん, なな e きゅう. As outras formas aparecem nas horas e nas datas.", [e("一　二　三　四　五", "いち　に　さん　よん　ご", "ichi · ni · san · yon · go", "um, dois, três, quatro, cinco"), e("六　七　八　九　十", "ろく　なな　はち　きゅう　じゅう", "roku · nana · hachi · kyū · jū", "seis, sete, oito, nove, dez")]),
    s("Dezenas e centenas: blocos de montar", "Depois do dez, é só montar: 十四 é dez + quatro, じゅうよん. 四十 é quatro dezes, よんじゅう. A ordem dos blocos muda o número!\n百 (ひゃく) é cem. Três centenas mudam de som: 300 é さんびゃく, 600 é ろっぴゃく e 800 é はっぴゃく.", [e("十四", "じゅうよん", "jūyon", "catorze"), e("四十", "よんじゅう", "yonjū", "quarenta"), e("三百", "さんびゃく", "sanbyaku", "trezentos"), e("八百", "はっぴゃく", "happyaku", "oitocentos")], "じゅうよん (14) e よんじゅう (40) usam os mesmos blocos, em ordem diferente."),
    s("Mil, dez mil e o preço", "千 (せん) é mil. Duas formas mudam: 3.000 é さんぜん e 8.000 é はっせん.\nO japonês conta de dez mil em dez mil: 万 (まん) é 10.000. Por isso 10.000 é いちまん, “um dez-mil”, e 20.000 é にまん.\nPreço é número + 円 (えん), o iene.", [e("三千", "さんぜん", "sanzen", "três mil"), e("一万", "いちまん", "ichiman", "dez mil"), e("千五百円です。", "せんごひゃくえんです。", "sen gohyaku en desu", "São 1.500 ienes."), e("これはいくらですか。", "", "kore wa ikura desu ka", "Quanto custa isto?")])
  ], [
    q("Como se diz 40?", ["じゅうよん", "よんじゅう", "よんひゃく"], 1, "四十 são quatro dezes: よんじゅう. じゅうよん é 14."),
    q("Como se lê 300?", ["さんびゃく", "さんひゃく", "さんぜん"], 0, "Depois do 3, ひゃく vira びゃく: さんびゃく. さんぜん é 3.000."),
    q("Como se diz 10.000?", ["じゅうせん", "まん", "いちまん"], 2, "O japonês tem uma palavra para dez mil, 万. Diga いちまん, com o いち.")
  ], practice("numbers", "Treinar números e preços"), {
    hook: "Preço no mercado, número do ônibus, andar do prédio: com poucos blocos você monta qualquer número até dez mil.",
    recap: ["Dezenas e centenas se montam como blocos: 十四 é 14; 四十 é 40.", "300 さんびゃく · 600 ろっぴゃく · 800 はっぴゃく · 3.000 さんぜん · 8.000 はっせん.", "万 (まん) é 10.000: diga いちまん."]
  }),
  l("num-time", "Que horas são?", 8, "Dizer e entender horas e minutos, de manhã e de tarde.", [
    s("Horas: número + 時", "Para dizer a hora, coloque 時 (じ) depois do número: 一時 é いちじ, uma hora.\nTrês horas têm som especial, e vale decorar: 4時 é よじ, 7時 é しちじ e 9時 é くじ.\n半 (はん) é “e meia”.", [e("一時", "いちじ", "ichiji", "uma hora"), e("四時　七時　九時", "よじ　しちじ　くじ", "yoji · shichiji · kuji", "quatro, sete e nove horas"), e("三時半", "さんじはん", "sanji han", "três e meia")], "Não existe よんじ nem きゅうじ: diga よじ e くじ."),
    s("Minutos: ふん ou ぷん", "Minuto é 分. O som muda conforme o número.\n• 1, 3, 4, 6 e 10 levam ぷん: いっぷん, さんぷん, よんぷん, ろっぷん, じゅっぷん.\n• 2, 5, 7 e 9 levam ふん: にふん, ごふん, ななふん, きゅうふん.\n• No 8, você ouve はっぷん ou はちふん.\nNo 15, quem manda é o 5: じゅうごふん.", [e("五分", "ごふん", "gofun", "cinco minutos"), e("十分", "じゅっぷん", "juppun", "dez minutos", "Também se diz じっぷん."), e("四時二十分です。", "よじにじゅっぷんです。", "yoji nijuppun desu", "São quatro e vinte."), e("六時十五分", "ろくじじゅうごふん", "rokuji jūgofun", "seis e quinze")]),
    s("Manhã, tarde e a pergunta", "午前 (ごぜん) vem antes da hora para dizer “da manhã”; 午後 (ごご), “da tarde” ou “da noite”.\nPara perguntar, use 何時 (なんじ), que horas. E com から e まで você diz “das… às…”.", [e("今、何時ですか。", "いま、なんじですか。", "ima, nanji desu ka", "Que horas são agora?"), e("午後三時です。", "ごごさんじです。", "gogo sanji desu", "São três da tarde."), e("九時から五時までです。", "くじからごじまでです。", "kuji kara goji made desu", "É das nove às cinco.")])
  ], [
    q("Como se lê 9時?", ["きゅうじ", "くじ", "くうじ"], 1, "Nove horas tem som especial: くじ. Não se diz きゅうじ."),
    q("Qual é “dez minutos”?", ["じゅうふん", "とおふん", "じゅっぷん"], 2, "Com 10, 分 vira ぷん e o じゅう encurta: じゅっぷん (ou じっぷん)."),
    q("午後三時 é…", ["Três da tarde", "Três e meia", "Três da manhã"], 0, "午後 (ごご) é depois do meio-dia: três da tarde. Três da manhã é 午前三時.")
  ], practice("time", "Treinar horas e minutos"), {
    hook: "Horário do trem, da aula ou do encontro: com 時 e 分 você chega na hora certa.",
    recap: ["Hora: número + 時. Especiais: よじ, しちじ, くじ.", "Minuto: ふん ou ぷん, conforme o número: いっぷん, さんぷん, じゅっぷん.", "午前 manhã · 午後 tarde · 何時ですか: que horas são?"]
  }),
  l("num-week", "Os dias da semana", 7, "Dizer os sete dias da semana e falar de hoje, amanhã e ontem.", [
    s("Sete dias, sete elementos", "Cada dia termina em 曜日 (ようび) e começa com um elemento da natureza: 月 lua, 火 fogo, 水 água, 木 árvore, 金 ouro, 土 terra e 日 sol.\nSegunda é o dia da lua; domingo, o dia do sol.", [e("月曜日", "げつようび", "getsuyōbi", "segunda-feira", "月 é lua."), e("火曜日", "かようび", "kayōbi", "terça-feira", "火 é fogo."), e("水曜日", "すいようび", "suiyōbi", "quarta-feira", "水 é água."), e("木曜日", "もくようび", "mokuyōbi", "quinta-feira", "木 é árvore.")]),
    s("Até o fim de semana", "Sexta é 金曜日, o dia do ouro. Depois vêm 土曜日 (sábado, terra) e 日曜日 (domingo, sol).\nRepare que, dentro de 曜日, os kanji mudam de leitura: 水 sozinho é みず, mas em 水曜日 é すい.", [e("金曜日", "きんようび", "kin'yōbi", "sexta-feira", "金 é ouro."), e("土曜日", "どようび", "doyōbi", "sábado", "土 é terra."), e("日曜日", "にちようび", "nichiyōbi", "domingo", "日 é sol."), e("週末", "しゅうまつ", "shūmatsu", "fim de semana")]),
    s("Hoje, amanhã e a pergunta", "今日 (きょう) é hoje, 明日 (あした) é amanhã e 昨日 (きのう) é ontem. As três têm leitura especial: aprenda a palavra inteira.\nPara perguntar o dia da semana, use 何曜日 (なんようび).", [e("今日は何曜日ですか。", "きょうはなんようびですか。", "kyō wa nan'yōbi desu ka", "Que dia da semana é hoje?"), e("今日は金曜日です。", "きょうはきんようびです。", "kyō wa kin'yōbi desu", "Hoje é sexta-feira."), e("明日は休みです。", "あしたはやすみです。", "ashita wa yasumi desu", "Amanhã é folga.")])
  ], [
    q("水曜日 é que dia?", ["Quarta-feira", "Segunda-feira", "Domingo"], 0, "水 é água: 水曜日 (すいようび) é quarta-feira."),
    q("Como se diz sábado?", ["日曜日", "土曜日", "月曜日"], 1, "土 é terra: 土曜日 (どようび). 日曜日 é domingo."),
    q("Como se lê 今日, hoje?", ["きのう", "いまび", "きょう"], 2, "今日 se lê きょう. きのう é ontem (昨日).")
  ], practice("week", "Treinar os dias da semana"), {
    hook: "Com sete elementos da natureza você aprende a semana inteira e ainda revisa kanji.",
    recap: ["Dia da semana = elemento + 曜日: 月 lua, 火 fogo, 水 água, 木 árvore, 金 ouro, 土 terra, 日 sol.", "今日 hoje · 明日 amanhã · 昨日 ontem.", "何曜日ですか: que dia da semana é?"]
  }),
  l("num-dates", "Meses e datas", 9, "Dizer meses e dias do mês, incluindo as leituras especiais.", [
    s("Meses: número + 月", "Os meses não têm nome: é só o número + 月 (がつ). 一月 é janeiro; 十二月, dezembro.\nTrês meses têm som especial: 四月 é しがつ, 七月 é しちがつ e 九月 é くがつ.", [e("一月", "いちがつ", "ichigatsu", "janeiro"), e("四月　七月　九月", "しがつ　しちがつ　くがつ", "shigatsu · shichigatsu · kugatsu", "abril, julho e setembro"), e("十二月", "じゅうにがつ", "jūnigatsu", "dezembro")], "Julho e setembro usam しち e く, como nas horas: しちじ, くじ."),
    s("Do dia 1 ao 10: nomes próprios", "Os dez primeiros dias do mês têm nomes próprios, parecidos com a contagem ひとつ, ふたつ, みっつ.\nO dia 1 é diferente de todos: ついたち.", [e("一日　二日　三日", "ついたち　ふつか　みっか", "tsuitachi · futsuka · mikka", "dias 1, 2 e 3"), e("四日　五日　六日", "よっか　いつか　むいか", "yokka · itsuka · muika", "dias 4, 5 e 6"), e("七日　八日", "なのか　ようか", "nanoka · yōka", "dias 7 e 8"), e("九日　十日", "ここのか　とおか", "kokonoka · tōka", "dias 9 e 10")], "Cuidado com よっか (dia 4) e ようか (dia 8): a diferença é a pausinha do っ."),
    s("Do 11 em diante e a pergunta", "Do 11 em diante, é número + 日 (にち): 十一日 é じゅういちにち. Só três fogem: 14 じゅうよっか, 20 はつか e 24 にじゅうよっか.\nNa data, o mês vem antes do dia. Para perguntar, use 何月何日 (なんがつなんにち). 誕生日 é aniversário.", [e("十五日", "じゅうごにち", "jūgonichi", "dia 15"), e("二十日", "はつか", "hatsuka", "dia 20"), e("誕生日は何月何日ですか。", "たんじょうびはなんがつなんにちですか。", "tanjōbi wa nangatsu nannichi desu ka", "Qual é a data do seu aniversário?"), e("四月八日です。", "しがつようかです。", "shigatsu yōka desu", "É 8 de abril.")])
  ], [
    q("Como se diz o dia 1 do mês?", ["いちにち", "ついたち", "ひとつ"], 1, "O primeiro dia do mês é ついたち. いちにち também existe, mas quer dizer “um dia” de duração."),
    q("ようか é…", ["Dia 4", "Dia 10", "Dia 8"], 2, "ようか é o dia 8. O dia 4 é よっか, com a pausinha do っ."),
    q("Como se lê 七月, julho?", ["しちがつ", "なながつ", "しがつ"], 0, "Julho é しちがつ. しがつ é abril.")
  ], practice("dates", "Treinar meses e datas"), {
    hook: "Aniversário, prazo, dia da viagem: datas aparecem em toda conversa e guardam as leituras mais curiosas do japonês.",
    recap: ["Mês = número + 月. Especiais: しがつ (4), しちがつ (7), くがつ (9).", "Dias 1 a 10 têm nomes próprios: ついたち, ふつか, みっか… とおか.", "Do 11 em diante: número + にち. Exceções: 14 じゅうよっか, 20 はつか, 24 にじゅうよっか."]
  }),
  l("num-counters", "Jeitos de contar", 9, "Escolher o contador certo para coisas, pessoas, objetos compridos, objetos finos e bichos pequenos.", [
    s("ひとつ, ふたつ: o contador coringa", "Para muitas coisas, como frutas, pedidos e doces, use a contagem japonesa: ひとつ, ふたつ, みっつ… até とお, dez.\nA quantidade vem depois da coisa e antes do verbo: りんごを三つください.", [e("一つ　二つ　三つ", "ひとつ　ふたつ　みっつ", "hitotsu · futatsu · mittsu", "um, dois, três (coisas)"), e("四つ　五つ　六つ", "よっつ　いつつ　むっつ", "yottsu · itsutsu · muttsu", "quatro, cinco, seis"), e("七つ　八つ　九つ", "ななつ　やっつ　ここのつ", "nanatsu · yattsu · kokonotsu", "sete, oito, nove", "E o dez é とお, sem つ."), e("りんごを三つください。", "りんごをみっつください。", "ringo o mittsu kudasai", "Três maçãs, por favor.", "", "apple")]),
    s("Pessoas: 人", "Para pessoas, use 人. Um e dois são especiais: ひとり e ふたり. Do três em diante, é número + にん: さんにん, よにん, ごにん.\nNo restaurante, é assim que você diz quantas pessoas são.", [e("一人　二人　三人", "ひとり　ふたり　さんにん", "hitori · futari · sannin", "uma, duas, três pessoas"), e("四人", "よにん", "yonin", "quatro pessoas", "Não se diz よんにん."), e("何人ですか。", "なんにんですか。", "nannin desu ka", "Quantas pessoas?"), e("三人です。", "さんにんです。", "sannin desu", "Somos três.")]),
    s("Compridos, finos e bichinhos", "本 (ほん) conta coisas compridas: lápis, garrafas, guarda-chuvas. 枚 (まい), coisas finas e planas: papel, selos, camisetas. 匹 (ひき), bichos pequenos: gatos, cachorros, peixes.\nCom 本 e 匹, o som muda em alguns números: いっぽん, さんぼん, ろっぽん; いっぴき, さんびき, ろっぴき. Com 枚, tudo é regular: いちまい, にまい, さんまい.", [e("傘が二本あります。", "かさがにほんあります。", "kasa ga nihon arimasu", "Tem dois guarda-chuvas.", "二本 soa igual a 日本, Japão.", "umbrella"), e("一本　三本　六本", "いっぽん　さんぼん　ろっぽん", "ippon · sanbon · roppon", "um, três, seis (coisas compridas)"), e("切手を二枚ください。", "きってをにまいください。", "kitte o nimai kudasai", "Dois selos, por favor."), e("猫が三匹います。", "ねこがさんびきいます。", "neko ga sanbiki imasu", "Tem três gatos.", "", "cat")], "Na dúvida com objetos, ひとつ, ふたつ costuma ser entendido. Com pessoas e bichos, use 人 e 匹.")
  ], [
    q("Como se diz “duas pessoas”?", ["ふたつ", "ににん", "ふたり"], 2, "Para pessoas, 1 e 2 são especiais: ひとり e ふたり. ふたつ conta coisas."),
    q("Qual contador usar para lápis?", ["本", "枚", "匹"], 0, "Lápis são compridos: 本 (ほん). 枚 é para coisas finas e 匹, para bichos pequenos."),
    q("Como se lê 三匹?", ["さんひき", "さんびき", "みっつ"], 1, "Depois do 3, ひき vira びき: さんびき. みっつ conta coisas, não bichos.")
  ], practice("counters", "Treinar os contadores"), {
    hook: "Em japonês, você não diz só “três”: diz três de quê. Parece estranho, mas no dia a dia são poucos contadores.",
    recap: ["ひとつ, ふたつ… とお: o contador coringa para coisas.", "Pessoas: ひとり, ふたり, さんにん, よにん.", "本 compridos · 枚 finos e planos · 匹 bichos pequenos. Fique de olho em いっぽん, さんぼん, さんびき."]
  }),
  l("num-pointing", "Isto, isso e aquilo", 9, "Apontar coisas e lugares perto de você, perto de quem ouve e longe dos dois, do jeito comum, específico e educado.", [
    s("こ, そ, あ, ど: quatro começos", "O japonês aponta com quatro começos:\n• こ: perto de quem fala;\n• そ: perto de quem ouve;\n• あ: longe dos dois;\n• ど: a pergunta (qual? onde?).\nCom れ no final, viram coisas: これ (isto), それ (isso), あれ (aquilo) e どれ (qual?).", [e("これ　それ　あれ　どれ", "", "kore · sore · are · dore", "isto, isso, aquilo, qual?"), e("これは何ですか。", "これはなんですか。", "kore wa nan desu ka", "O que é isto?"), e("あれは富士山です。", "あれはふじさんです。", "are wa Fujisan desu", "Aquilo é o monte Fuji.")]),
    s("Este livro, aquele lugar", "Para falar de uma coisa específica, troque れ por の e diga o nome logo depois: この本 (este livro), その本 (esse livro), あの本 (aquele livro), どの本 (qual livro?).\nSozinho, use これ; com o nome, この. この não fica sozinho.\nPara lugares, a série é ここ (aqui), そこ (aí), あそこ (ali) e どこ (onde?).", [e("この本　その本　あの本", "このほん　そのほん　あのほん", "kono hon · sono hon · ano hon", "este, esse e aquele livro"), e("どの本ですか。", "どのほんですか。", "dono hon desu ka", "Qual livro?"), e("トイレはあそこです。", "", "toire wa asoko desu", "O banheiro é ali.")]),
    s("O jeito educado e o casual", "Em lojas, hotéis e no trabalho, a série こちら, そちら, あちら, どちら soa mais educada. Ela serve para direção, lugar e até pessoas: こちらは田中さんです apresenta alguém com respeito.\nEntre amigos, a mesma ideia fica curtinha: こっち, そっち, あっち, どっち.", [e("こちらへどうぞ。", "", "kochira e dōzo", "Por aqui, por favor."), e("こちらは田中さんです。", "こちらはたなかさんです。", "kochira wa Tanaka-san desu", "Este é o Tanaka."), e("お手洗いはどちらですか。", "おてあらいはどちらですか。", "otearai wa dochira desu ka", "Onde fica o toalete?"), e("こっち、こっち！", "", "kocchi, kocchi!", "Aqui, aqui! (entre amigos)")])
  ], [
    q("Algo perto de quem ouve é…", ["これ", "それ", "あれ"], 1, "そ aponta para perto de quem ouve: それ, isso."),
    q("Como dizer “aquele livro”, lá longe?", ["あれ本", "あの本", "あそこ本"], 1, "Com o nome logo depois, use あの: あの本. あれ fica sozinho."),
    q("Qual é o jeito educado de perguntar “onde?” numa loja?", ["どっち", "どれ", "どちら"], 2, "どちら é a forma educada. どっち é casual, e どれ pergunta “qual?” entre coisas.")
  ], practice("pointing", "Treinar isto, isso e aquilo"), {
    hook: "Em japonês, apontar depende de quem está perto: você, a outra pessoa ou ninguém. Quatro começos dão conta de tudo.",
    recap: ["こ perto de mim · そ perto de você · あ longe dos dois · ど pergunta.", "これ sozinho; この + nome; ここ para lugar.", "こちら, そちら, あちら, どちら: o jeito educado. こっち, そっち…: o casual."]
  })
];
