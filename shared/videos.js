// Aulas públicas no YouTube ligadas às lições da trilha. Cada ID foi conferido em
// 01/10/2026 pelo oEmbed do YouTube (existe, aceita incorporação e pertence ao canal
// indicado); a duração vem da página do vídeo. Os vídeos são de professores e canais
// independentes, sem afiliação com o Maru. O player só carrega depois do clique.
export const CHANNELS = {
  "123": { name: "123 Japonês", url: "https://www.youtube.com/@123japones9", lang: "pt" },
  nanda: { name: "Nihongando com Nanda", url: "https://www.youtube.com/@NihongandocomNanda", lang: "pt" },
  pjo: { name: "Programa Japonês Online", url: "https://www.youtube.com/@aulasjapones", lang: "pt" },
  jp101: { name: "JapanesePod101", url: "https://www.youtube.com/@JapanesePod101", lang: "en" }
};

const v = (id, channel, minutes, title, lessons) => ({ id, channel, minutes, title, lessons });

export const VIDEOS = [
  v("A0AodhG0a7A", "pjo", 7, "Introdução ao hiragana", ["welcome"]),
  v("1SiE2SZJ_fM", "123", 9, "Os principais erros de pronúncia", ["sounds"]),
  v("mhXRPOQjxTA", "123", 2, "Como se cumprimenta em japonês?", ["greetings"]),
  v("7ry37d_rkWk", "nanda", 12, "Cumprimentos: bom dia, boa tarde, boa noite", ["greetings"]),
  v("fpAQH7T1FYc", "123", 5, "O que são as partículas?", ["how-it-works", "start-language"]),
  v("ZSTmv6U7jr4", "123", 12, "Erros comuns de estudantes de japonês", ["start-study"]),

  v("igBvVgH9nko", "123", 16, "Hiragana: あ e い", ["h-vowels"]),
  v("3nwgGebfBSI", "123", 10, "Hiragana: as vogais (parte 2)", ["h-vowels"]),
  v("iQHcUsckwN8", "nanda", 10, "Hiragana do zero, aula 1: あいうえお", ["h-vowels"]),
  v("1AMfCY8sm0E", "jp101", 7, "Desafio de 10 dias, dia 1: あいうえお", ["h-vowels"]),
  v("Jy7YDgtb4Xg", "123", 16, "Hiragana: conheça a família KA", ["h-ka"]),
  v("aRaZaZ0EZ-Y", "nanda", 10, "Hiragana do zero, aula 2: かきくけこ", ["h-ka"]),
  v("TJJvnCpPK2w", "jp101", 7, "Desafio de 10 dias, dia 2: かきくけこ", ["h-ka"]),
  v("n3sZgqlWCHk", "123", 21, "Hiragana: conheça a família SA", ["h-sa"]),
  v("dAYP6O4iHqc", "nanda", 9, "Hiragana do zero, aula 3: さしすせそ", ["h-sa"]),
  v("vJc9AZ5rSAs", "jp101", 7, "Desafio de 10 dias, dia 3: さしすせそ", ["h-sa"]),
  v("e6AX401S_5g", "123", 21, "Hiragana: a família TA", ["h-ta"]),
  v("TwDWbb3eKAA", "nanda", 11, "Hiragana do zero, aula 4: たちつてと", ["h-ta"]),
  v("Rt9MNGWCjJs", "jp101", 8, "Desafio de 10 dias, dia 4: たちつてと", ["h-ta"]),
  v("V4wTNyeHBCI", "123", 21, "Hiragana: a família NA", ["h-na"]),
  v("ZGUDgxqt7iY", "nanda", 9, "Hiragana do zero, aula 5: なにぬねの", ["h-na"]),
  v("hIEspeJAq-w", "jp101", 6, "Desafio de 10 dias, dia 5: なにぬねの", ["h-na"]),
  v("-BS_DRnoDug", "nanda", 9, "Hiragana do zero, aula 6: はひふへほ", ["h-ha"]),
  v("amB7_hBWHaA", "jp101", 11, "Desafio de 10 dias, dia 6: はひふへほ", ["h-ha"]),
  v("5rd0i4yW3hE", "pjo", 7, "Vamos ler hiragana #1", ["h-rows", "h-words"]),
  v("89qiybH3Yqc", "nanda", 8, "Hiragana do zero, aula 7: まみむめも", ["h-ma"]),
  v("nojeFhIIcJ4", "jp101", 6, "Desafio de 10 dias, dia 7: まみむめも", ["h-ma"]),
  v("9DH0tsSfdf0", "nanda", 6, "Hiragana do zero, aula 8: やゆよ", ["h-yara"]),
  v("VE685Dng5ng", "nanda", 11, "Hiragana do zero, aula 9: らりるれろ", ["h-yara"]),
  v("7GqdGmkyHSg", "jp101", 7, "Desafio de 10 dias, dia 9: やゆよ", ["h-yara"]),
  v("Qmrf9AHvI08", "jp101", 6, "Desafio de 10 dias, dia 8: らりるれろ", ["h-yara"]),
  v("mbQWVT-lpXY", "nanda", 9, "Hiragana do zero, aula 10: わをん", ["h-rest"]),
  v("FL1P7jVdi5o", "jp101", 8, "Desafio de 10 dias, dia 10: わをん", ["h-rest"]),
  v("6p9Il_j0zjc", "jp101", 62, "Todo o hiragana em uma hora (revisão)", ["h-rest"]),
  v("mpDHs1r56ec", "nanda", 8, "Hiragana do zero, aula 11: がぎぐげご", ["h-dakuten"]),
  v("cYPwNb7Oyro", "nanda", 7, "Hiragana do zero, aula 12: ざじずぜぞ", ["h-dakuten"]),
  v("HG7h7DXbJE4", "nanda", 11, "Hiragana do zero, aula 13: だぢづでど", ["h-dakuten"]),
  v("cAQJRvZ9Qwk", "nanda", 10, "Hiragana do zero, aula 14: ばびぶべぼ", ["h-dakuten"]),
  v("0LXRimtqgRM", "nanda", 9, "Hiragana do zero, aula 15: ぱぴぷぺぽ", ["h-dakuten"]),
  v("qrCGdFMBC5A", "nanda", 8, "Hiragana do zero, aula 16: combinações", ["h-combinations"]),

  v("H5vTNnpeKFg", "123", 10, "8 situações para usar o katakana", ["k-basics"]),
  v("vAJHhtulHsE", "nanda", 11, "Katakana do zero, aula 1: アイウエオ", ["k-basics"]),
  v("J4j3e6ewKpc", "nanda", 10, "Katakana do zero, aula 2: カキクケコ", ["k-basics"]),
  v("AIJhOR8fPkE", "jp101", 9, "Desafio de 10 dias de katakana, dia 1: アイウエオ", ["k-basics"]),
  v("Fmn22yFOKDU", "jp101", 6, "Desafio de 10 dias de katakana, dia 2: カキクケコ", ["k-basics"]),
  v("vi9BXWExW-k", "nanda", 8, "Katakana do zero, aula 3: サシスセソ", ["k-sata"]),
  v("AebsJgb0VN0", "nanda", 12, "Katakana do zero, aula 4: タチツテト", ["k-sata"]),
  v("MVW-hRHyBmU", "jp101", 7, "Desafio de 10 dias de katakana, dia 3: サシスセソ", ["k-sata"]),
  v("zWU_k7LlZ9c", "jp101", 9, "Desafio de 10 dias de katakana, dia 4: タチツテト", ["k-sata"]),
  v("fougnHEbv00", "nanda", 7, "Katakana do zero, aula 5: ナニヌネノ", ["k-naha"]),
  v("xwevt-cGMMM", "nanda", 9, "Katakana do zero, aula 6: ハヒフヘホ", ["k-naha"]),
  v("iefOFgci_Xc", "jp101", 5, "Desafio de 10 dias de katakana, dia 5: ナニヌネノ", ["k-naha"]),
  v("ENp9n1wx3jA", "jp101", 8, "Desafio de 10 dias de katakana, dia 6: ハヒフヘホ", ["k-naha"]),
  v("OMRew4zyLwk", "nanda", 10, "Katakana do zero, aula 7: マミムメモ", ["k-mawa"]),
  v("Da4FjesN2D4", "nanda", 6, "Katakana do zero, aula 8: ヤユヨ", ["k-mawa"]),
  v("TIoezRp_V5E", "nanda", 6, "Katakana do zero, aula 9: ラリルレロ", ["k-mawa"]),
  v("-iXSk65Bur4", "nanda", 6, "Katakana do zero, aula 10: ワヲン", ["k-mawa"]),
  v("9AQQwW8wVHA", "jp101", 5, "Desafio de 10 dias de katakana, dia 7: マミムメモ", ["k-mawa"]),
  v("3BwH69ll40g", "jp101", 5, "Desafio de 10 dias de katakana, dia 9: ヤユヨ", ["k-mawa"]),
  v("6tRdJOCzr0c", "jp101", 5, "Desafio de 10 dias de katakana, dia 8: ラリルレロ", ["k-mawa"]),
  v("k7zqRkJJJgo", "jp101", 6, "Desafio de 10 dias de katakana, dia 10: ワヲン", ["k-mawa"]),
  v("s6DKRgtVLGA", "jp101", 62, "Todo o katakana em uma hora (revisão)", ["k-long"]),
  v("qTbyJeRH3s4", "123", 48, "Aprenda a escrever seu nome em japonês", ["k-real-words"]),

  v("yogaN4ey61I", "123", 11, "Kanji: os ideogramas japoneses", ["kanji-meaning"]),
  v("pj3Xr6hsSxU", "nanda", 11, "Números de 0 até 99", ["kanji-numbers"]),
  v("viKGLhnLTTA", "123", 5, "Os dias da semana em japonês (com kanji)", ["kanji-nature"]),

  v("DUR64jYpCbQ", "123", 7, "Autoapresentação em japonês", ["sentence-identity"]),
  v("7J-9wbrLaKc", "123", 6, "Gramática: o auxiliar です (desu)", ["sentence-identity"]),
  v("9HbzSR4mSHo", "nanda", 13, "Apresentações", ["sentence-identity"]),
  v("BdaAOQUD7I4", "123", 4, "Como perguntar “o que é isso?”", ["sentence-question"]),
  v("_bG8RWRAaJM", "jp101", 5, "Guia das partículas: か (ka)", ["sentence-question"]),
  v("cBI1mz8s4sU", "nanda", 11, "Atividades do dia a dia: 8 verbos com します", ["sentence-actions"]),
  v("3b29dqY8pMY", "jp101", 5, "Guia das partículas: を (o)", ["sentence-actions"]),
  v("56tIuM7sxzg", "jp101", 12, "Como usar adjetivos", ["sentence-describe"]),

  v("eB1jsqufXq8", "nanda", 16, "Descomplicando as partículas I", ["particle-topic"]),
  v("mTws1GwXcx8", "jp101", 6, "Guia das partículas: は (wa)", ["particle-topic"]),
  v("quTMJXgcxN0", "jp101", 6, "Guia das partículas: が (ga)", ["particle-topic"]),
  v("W68QomjbzUY", "jp101", 5, "Guia das partículas: も (mo)", ["particle-topic"]),
  v("uHokO9Zqbxs", "123", 6, "Partículas de lugar: を e で", ["particle-place"]),
  v("NLPq6pTT_FU", "123", 4, "Partículas de lugar: に e へ", ["particle-place"]),
  v("_KnXTtaRgXY", "jp101", 5, "Guia das partículas: に (ni)", ["particle-place"]),
  v("bqsZxKOPXIE", "jp101", 5, "Guia das partículas: で (de)", ["particle-place"]),
  v("AxPdlAPdv2o", "123", 10, "Gramática: as partículas finais ね e よ", ["particle-connect"]),
  v("9J4FL1CbXTg", "jp101", 4, "Guia das partículas: の (no)", ["particle-connect"]),
  v("eUYs2QRkoXg", "jp101", 4, "Guia das partículas: と (to)", ["particle-connect"]),
  v("ODScjHPvqE8", "123", 5, "Partículas de lugar: に e で", ["particle-existence"]),
  v("l2kLI7Z0FHQ", "nanda", 3, "Não confunda で e に", ["particle-existence"]),

  v("9Fvwr_HcW5c", "nanda", 10, "これ, それ, あれ", ["daily-order"]),
  v("JcaZt6cb54w", "nanda", 12, "Perguntar o preço das coisas", ["daily-order"]),
  v("eyKBmYgS3uc", "nanda", 11, "Onde é?", ["daily-find"]),
  v("9s-R2DW6MRU", "123", 6, "Aizuchi: como mostrar que você está ouvindo", ["daily-help"]),
  v("1lt0l78MZSY", "123", 9, "As horas em japonês", ["daily-numbers"]),
  v("y-x67OdacpI", "123", 9, "As formas de contar em japonês", ["daily-numbers"]),
  v("2H1bqGTuwKk", "nanda", 10, "Horas", ["daily-numbers"]),
  v("fSGRNDlaYtA", "123", 11, "Japonês básico para viagem", ["daily-dialogue"]),

  v("IOdnKPdT6hk", "123", 5, "A importância da polidez na língua japonesa", ["casual-register"]),
  v("y6nClAbmmJk", "123", 6, "Os significados de san, kun, chan e sama", ["casual-register"]),
  v("_pZdl5x6mv0", "123", 7, "Gíria japonesa: yabai", ["casual-slang"]),
  v("GKRCFV982Cw", "jp101", 6, "Quando dizer gochisōsama", ["casual-culture"]),
  v("RfH-KACUj6s", "123", 12, "Os japoneses adoram abreviar palavras", ["casual-short"]),
  v("wqWdcCV46ws", "123", 12, "Dá para aprender japonês com anime e mangá?", ["casual-communities"])
];

const byLanguage = video => (CHANNELS[video.channel].lang === "pt" ? 0 : 1);
// Aulas em português primeiro; as em inglês ficam como alternativa.
export const videosFor = lessonId => VIDEOS.filter(video => video.lessons.includes(lessonId)).sort((a, b) => byLanguage(a) - byLanguage(b));
export const videoURL = video => `https://www.youtube.com/watch?v=${video.id}`;
export const videoEmbedURL = video => `https://www.youtube-nocookie.com/embed/${video.id}?autoplay=1&rel=0&hl=pt-BR&cc_lang_pref=pt&modestbranding=1`;
export const videoThumbnail = video => `https://i.ytimg.com/vi/${video.id}/mqdefault.jpg`;
