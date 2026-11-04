(() => {
  "use strict";

  const example = (it, ru) => ({ it, ru });
  const note = (title, body, examples) => ({ title, body, examples });
  const card = (id, it, ru, note, tag) => ({ id, it, ru, note, tag });

  const notes = [
    note("Сначала попробуй узнать знакомые слова",
      "В первом тесте урока было семь существительных. Угадай значения по сходству с русским, а потом сравни написание. Во второй пятёрке — прилагательные, которые легче узнать, если знаешь английский. На карточках есть обе группы. Прилагательные здесь даны как словарные формы.",
      [example("aeroporto · biblioteca · idea", "аэропорт · библиотека · идея"),
       example("teatro · foto · taxi · problema", "театр · фото · такси · проблема"),
       example("importante · interessante · difficile", "важный · интересный · трудный"),
       example("possibile · impossibile", "возможный · невозможный")]),
    note("О себе говорим формой глагола",
      "Io — «я». В обычном предложении io часто опускают, потому что форма глагола уже показывает, кто говорит. У глаголов урока отбрось окончание инфинитива -are или -ere и добавь -o. У capire запомни форму capisco целиком с -isc-. Это правило для изученных форм настоящего времени. У других глаголов встречаются исключения.",
      [example("lavorare → lavoro · studiare → studio", "работать → я работаю · учиться → я учусь"),
       example("imparare → imparo · parlare → parlo", "изучать → я изучаю · говорить → я говорю"),
       example("vivere → vivo · vedere → vedo", "жить → я живу · видеть → я вижу"),
       example("amare → amo · capire → capisco", "любить → я люблю · понимать → я понимаю")]),
    note("Добавляем «где», «сколько» и «и»",
      "В образцах урока qui («здесь»), molto («много») и poco («мало») идут после глагола. Molto в Lavoro molto относится к действию, поэтому здесь его форма сохраняется. Союз e — «и». В двух частях вроде Lavoro e studio по форме каждого глагола понятно, что говорящий имеет в виду себя.",
      [example("Lavoro qui. Lavoro molto. Lavoro poco.", "Я работаю здесь. Я много работаю. Я мало работаю."),
       example("Studio qui. Studio molto. Studio poco.", "Я учусь здесь. Я много занимаюсь. Я мало занимаюсь."),
       example("Lavoro e studio. Studio e lavoro.", "Я работаю и учусь. Я учусь и работаю.")]),
    note("«Говорю» и «изучаю» — разные конструкции",
      "Запомни две модели урока. Parlo italiano — говорю по-итальянски, Imparo l’italiano — изучаю итальянский. В модели с imparare поставь l’ перед каждым из двух названий языка. Названия языков здесь пишутся со строчной. В других контекстах с parlare встречается и артикль. Тренируем прежде всего примеры урока.",
      [example("Parlo italiano e inglese.", "Я говорю по-итальянски и по-английски."),
       example("Imparo l’italiano e l’inglese.", "Я изучаю итальянский и английский."),
       example("Imparo l’italiano qui. Imparo l’italiano online.", "Я изучаю итальянский здесь. Я изучаю итальянский онлайн."),
       example("Parlo un po’ italiano. Parlo un po’ di italiano.", "Я немного говорю по-итальянски. Обе фразы передают эту мысль.")]),
    note("Где я живу и какой род у «этот»",
      "С названиями стран в примерах урока употребляем in. Questo ставим перед существительным мужского рода, questa — женского. Запоминай род вместе со словом. Città, lezione, casa и musica — женского рода. Paese, hotel и problema — мужского. У problema окончание -a, поэтому по одной последней букве здесь легко ошибиться.",
      [example("Vivo qui. Vivo in Italia. Vivo in Russia.", "Я живу здесь. Я живу в Италии. Я живу в России."),
       example("Vivo in questa città. Vivo in questo paese.", "Я живу в этом городе. Я живу в этой стране."),
       example("Vedo questa casa. Vedo questo hotel. Vedo questo problema.", "Я вижу этот дом. Я вижу этот отель. Я вижу эту проблему."),
       example("Capisco questa lezione. Amo questa musica.", "Я понимаю этот урок. Я люблю эту музыку.")]),
    note("Короткие ti и lo ставим перед глаголом",
      "В изученных предложениях ti означает «тебя», а lo может передавать «это» или «его». Поставь их перед личной формой глагола. Если дополнение названо полностью, порядок другой: Capisco questa lezione. В примерах Capisco tutto и Capisco questa lezione дополнение идёт после глагола. Molto bene означает «очень хорошо».",
      [example("Ti capisco. Lo capisco.", "Я понимаю тебя. Я это понимаю."),
       example("Ti capisco molto bene. Lo capisco molto bene.", "Я тебя очень хорошо понимаю. Я это очень хорошо понимаю."),
       example("Lo vedo. Ti amo.", "Я это вижу. Я люблю тебя."),
       example("Capisco tutto. Capisco questa lezione.", "Я понимаю всё. Я понимаю этот урок.")]),
    note("Отрицание с non",
      "Non ставим перед глаголом. Если в этой фразе есть короткое ti или lo, порядок такой: non, затем местоимение, затем глагол. Последние два примера — новые комбинации слов и моделей урока.",
      [example("Non capisco. Non parlo italiano.", "Я не понимаю. Я не говорю по-итальянски."),
       example("Non parlo inglese, parlo italiano.", "Я не говорю по-английски, я говорю по-итальянски."),
       example("Non lo vedo. Non ti capisco.", "Я этого не вижу. Я тебя не понимаю.")]),
    note("Произнеси и проверь написание",
      "В транскрипции знак ˈ показывает, что следующий слог ударный. В обычной записи этих глаголов знак не пишут. Безударное o сохраняет качество гласного, поэтому тренируй lavoro без русского «аканья». Для l в lavoro, molto и lo подними кончик языка к бугоркам за верхними зубами и повтори за итальянским голосом. В ti произноси t и i без сильного смягчения, привычного для русского «ти». В un po’ звук n перед p в потоке речи может звучать близко к m. На письме остаётся un. В po’ апостроф обозначает сокращение poco, а в città значок над à — письменное ударение. В hotel буква h не произносится. В città начальное ci звучит близко к «чи», в lezione и grazie z близка к «ц». В capisco сочетание sc перед o звучит как «ск». Сначала произнеси каждую фразу медленно, затем ещё раз целиком.",
      [example("la-vo-RA-re → la-VO-ro · VI-ve-re → VI-vo", "Ударный слог показан заглавными буквами."),
       example("ve-DE-re → VE-do · ca-PI-re → ca-PI-sco", "Ударный слог показан заглавными буквами."),
       example("città · lezione · grazie", "Ударение падает на -tà, -zio- и gra- соответственно."),
       example("paese · musica · problema", "Ударение падает на -e- в pa-e-se, mu- и -ble- соответственно.")]),
  ];

  const cognates = "Знакомые слова";
  const verbs = "Глаголы";
  const basics = "Частые слова";
  const nouns = "Места и предметы";
  const phrases = "Готовые фразы";

  const cards = [
    card("aeroporto", "aeroporto", "аэропорт", "Мужской род. Обрати внимание на ae в начале.", cognates),
    card("biblioteca", "biblioteca", "библиотека", "Женский род. Ударение на -te-.", cognates),
    card("idea", "idea", "идея", "Женский род. Раздели на слоги i-de-a.", cognates),
    card("teatro", "teatro", "театр", "Мужской род. Ударение на -a-.", cognates),
    card("foto", "foto", "фото, фотография", "Женский род. Это сокращение fotografia.", cognates),
    card("taxi", "taxi", "такси", "Мужской род. Написание с x.", cognates),
    card("problema", "problema", "проблема", "Мужской род. Questo problema — эта проблема.", cognates),
    card("importante", "importante", "важный", "Ударение на -tan-.", cognates),
    card("interessante", "interessante", "интересный", "Пишется с двойной ss.", cognates),
    card("difficile", "difficile", "трудный, сложный", "Пишется с двойной ff. Ударение на -fi-.", cognates),
    card("possibile", "possibile", "возможный", "Пишется с двойной ss. Ударение на -si-.", cognates),
    card("impossibile", "impossibile", "невозможный", "Сравни с possibile. Пишется с двойной ss.", cognates),
    card("io", "io", "я", "Lavoro само по себе уже значит «я работаю».", basics),
    card("qui", "qui", "здесь, тут", "Vivo qui — я живу здесь.", basics),
    card("molto", "molto", "много, очень", "Lavoro molto — много работаю. Molto bene — очень хорошо.", basics),
    card("poco", "poco", "мало", "Studio poco — я мало занимаюсь.", basics),
    card("un-po", "un po’", "немного, чуть-чуть", "Сокращение un poco. После po ставится апостроф.", basics),
    card("e", "e", "и", "Studio e lavoro — я учусь и работаю.", basics),
    card("in", "in", "в", "Vivo in Italia — я живу в Италии.", basics),
    card("ti", "ti", "тебя", "Ti capisco — я понимаю тебя.", basics),
    card("lo", "lo", "это, его", "Короткое местоимение в Lo vedo — «я это вижу».", basics),
    card("bene", "bene", "хорошо", "Molto bene — очень хорошо.", basics),
    card("tutto", "tutto", "всё", "Capisco tutto — я понимаю всё. Двойная tt.", basics),
    card("non", "non", "не", "Non capisco — я не понимаю.", basics),
    card("grazie", "grazie", "спасибо", "Ударение на gra-. В конце -ie.", basics),
    card("lavorare", "lavorare", "работать", "Форма для «я» — lavoro. Ударение в lavorare на -ra-.", verbs),
    card("lavoro", "lavoro", "я работаю", "В форме lavoro ударение на -vo-.", verbs),
    card("studiare", "studiare", "учиться, заниматься", "Форма для «я» — studio.", verbs),
    card("studio", "studio", "я учусь, я занимаюсь", "Studiare → studio. Studio qui — я учусь здесь.", verbs),
    card("imparare", "imparare", "учить, осваивать, изучать", "Imparare l’italiano — изучать итальянский.", verbs),
    card("imparo", "imparo", "я учу, я осваиваю", "Форма для «я» от imparare.", verbs),
    card("parlare", "parlare", "говорить", "Parlare inglese — говорить по-английски.", verbs),
    card("parlo", "parlo", "я говорю", "Форма для «я» от parlare.", verbs),
    card("vivere", "vivere", "жить", "Ударение на vi-. Форма для «я» — vivo.", verbs),
    card("vivo", "vivo", "я живу", "Vivo qui — я живу здесь.", verbs),
    card("capire", "capire", "понимать", "Форма для «я» — capisco. Запомни -isc-.", verbs),
    card("capisco", "capisco", "я понимаю", "В середине слышится сочетание /sk/.", verbs),
    card("vedere", "vedere", "видеть", "Ударение на -de-. Форма для «я» — vedo.", verbs),
    card("vedo", "vedo", "я вижу", "Ударение на ve-. Lo vedo — я это вижу.", verbs),
    card("amare", "amare", "любить", "Форма для «я» — amo.", verbs),
    card("amo", "amo", "я люблю", "Ti amo — я люблю тебя.", verbs),
    card("italiano", "italiano", "итальянский язык, по-итальянски", "Parlo italiano. Imparo l’italiano.", nouns),
    card("inglese", "inglese", "английский язык, по-английски", "Parlo inglese. Imparo l’inglese.", nouns),
    card("online", "online", "онлайн", "Imparo l’italiano online — я изучаю итальянский онлайн.", basics),
    card("italia", "Italia", "Италия", "С заглавной буквы. In Italia — в Италии.", nouns),
    card("russia", "Russia", "Россия", "С заглавной буквы и с двойной ss. In Russia — в России.", nouns),
    card("citta", "città", "город", "Женский род. Questa città. Пишем tt и à.", nouns),
    card("paese", "paese", "страна", "Мужской род. Questo paese. В другом контексте paese может означать населённый пункт.", nouns),
    card("lezione", "lezione", "урок", "Женский род. Questa lezione.", nouns),
    card("hotel", "hotel", "отель", "Мужской род. Questo hotel. Буква h не произносится.", nouns),
    card("casa", "casa", "дом", "Женский род. Questa casa.", nouns),
    card("musica", "musica", "музыка", "Женский род. Questa musica. Ударение на mu-.", nouns),
    card("questo", "questo", "этот, это (перед словом мужского рода)", "Questo paese, questo hotel, questo problema.", basics),
    card("questa", "questa", "эта, эта самая (перед словом женского рода)", "Questa città, questa lezione, questa casa, questa musica.", basics),
    card("phrase-learn", "Imparo l’italiano.", "Я изучаю итальянский.", "Здесь перед italiano ставим l’.", phrases),
    card("phrase-speak", "Parlo italiano.", "Я говорю по-итальянски.", "В модели урока с parlo язык идёт без артикля.", phrases),
    card("phrase-bit", "Parlo un po’ italiano.", "Я немного говорю по-итальянски.", "Также можно сказать Parlo un po’ di italiano.", phrases),
    card("phrase-city", "Vivo in questa città.", "Я живу в этом городе.", "Перед città нужно questa, потому что род женский.", phrases),
    card("phrase-lesson", "Capisco questa lezione.", "Я понимаю этот урок.", "Lezione — слово женского рода.", phrases),
    card("phrase-understand", "Ti capisco.", "Я понимаю тебя.", "Ti идёт перед capisco.", phrases),
    card("phrase-see", "Lo vedo.", "Я это вижу.", "Lo идёт перед vedo.", phrases),
    card("phrase-love", "Ti amo.", "Я люблю тебя.", "В этой фразе ti идёт первым.", phrases),
    card("phrase-negation", "Non capisco.", "Я не понимаю.", "Non ставим перед capisco.", phrases),
  ];

  const choice = (id, section, prompt, answer, distractors, explanation) =>
    ({ id, section, type: "choice", prompt, answer, options: [answer, ...distractors], explanation });
  const build = (id, section, prompt, answer, distractors, explanation) =>
    ({ id, section, type: "build", prompt, answer, tiles: [...answer.replace(/[.,!?]/g, "").split(" "), ...distractors], explanation });
  const write = (id, section, prompt, answer, explanation, alternatives = []) =>
    ({ id, section, type: "write", prompt, answer, explanation, alternatives });
  const translate = (id, section, ru, answer, explanation, variants = []) =>
    write(id, section, `Переведи на итальянский: «${ru}»`, answer, explanation,
      [...variants, ...[answer, ...variants].map(it => `Io ${it[0].toLowerCase()}${it.slice(1)}`)]);

  const warmup = "Слова из урока";
  const forms = "Говорю о себе";
  const languages = "Языки и артикль";
  const place = "Место и согласование";
  const order = "Порядок слов";
  const sound = "Ударение и написание";
  const negative = "Отрицание";

  const drills = [
    choice("w1", warmup, "Что означает aeroporto?", "аэропорт", ["театр", "библиотека", "такси"], "Aeroporto — аэропорт. Сохрани ae в начале слова."),
    choice("w2", warmup, "Что означает biblioteca?", "библиотека", ["фотография", "город", "страна"], "Biblioteca — библиотека. Ударение на -te-."),
    choice("w3", warmup, "Найди итальянское слово для «театр».", "teatro", ["taxi", "idea", "foto"], "Teatro — театр. Ударение на -a-."),
    choice("w4", warmup, "Какое слово означает «трудный»?", "difficile", ["interessante", "possibile", "importante"], "Difficile — трудный, сложный. Пишется с двойной ff."),
    choice("w5", warmup, "Как сказать «невозможный»?", "impossibile", ["possibile", "interessante", "importante"], "Possibile — возможный. С добавлением im- получается противоположное значение."),
    write("w6", warmup, "Напиши по-итальянски слово «идея» без артикля.", "idea", "Idea — идея. В середине слова пишем -de-."),
    write("w7", warmup, "Напиши по-итальянски слово «проблема» без артикля.", "problema", "Problema — слово мужского рода. Дальше встретится questo problema."),
    choice("w8", warmup, "Что означает interessante?", "интересный", ["важный", "возможный", "трудный"], "Interes-sante пишется с двойной ss."),

    choice("f1", forms, "Выбери форму «я работаю».", "lavoro", ["lavorare", "lavora", "lavaro"], "У lavorare убираем -are и прибавляем -o. Ударение в lavoro на -vo-."),
    choice("f2", forms, "Какой инфинитив даёт форму studio?", "studiare", ["imparare", "parlare", "vivere"], "Studiare → studio. Обрати внимание на i перед окончанием."),
    choice("f3", forms, "Как сказать «я понимаю»?", "capisco", ["capo", "capire", "capisca"], "Форма от capire содержит -isc-. Запомни capisco целиком."),
    build("f4", forms, "Собери «Я работаю здесь».", "Lavoro qui", ["molto", "Lavorare"], "Lavoro уже передаёт «я работаю». Qui добавляет «здесь»."),
    build("f5", forms, "Собери «Я мало занимаюсь».", "Studio poco", ["molto", "Studiare"], "Studio — «я занимаюсь». Poco — «мало»."),
    build("f6", forms, "Собери «Я учусь и работаю».", "Studio e lavoro", ["in", "lavorare"], "Два действия соединяем через e. Оба глагола в форме для «я»."),
    translate("f7", forms, "Я много работаю", "Lavoro molto", "В модели урока сначала lavoro, затем molto."),
    translate("f8", forms, "Я много занимаюсь", "Studio molto", "Studio — форма для «я» от studiare. Molto относится к действию."),
    write("f9", forms, "Напиши одним словом «я вижу».", "vedo", "Vedere → vedo. Ударение переходит на ve-."),
    write("f10", forms, "Напиши одним словом «я люблю».", "amo", "Amare → amo. Убираем -are и прибавляем -o."),

    choice("l1", languages, "Выбери модель урока для «Я говорю по-итальянски».", "Parlo italiano", ["Parlare italiano", "Imparo l’italiano", "Parlo in Italia"], "Parlo — «я говорю», а italiano в этом образце идёт без артикля."),
    choice("l2", languages, "Как в уроке сказано «Я изучаю итальянский»?", "Imparo l’italiano", ["Imparare l’italiano", "Imparo l’inglese", "Parlo italiano"], "Imparo — форма для «я». Название языка в этом примере с l’."),
    build("l3", languages, "Собери «Я говорю по-итальянски и по-английски».", "Parlo italiano e inglese", ["Imparo", "in"], "Союз e соединяет italiano и inglese. Это модель урока с parlo."),
    build("l4", languages, "Собери «Я изучаю итальянский и английский».", "Imparo l’italiano e l’inglese", ["italiano", "inglese"], "В модели урока перед каждым названием языка после imparo есть l’."),
    build("l5", languages, "Собери фразу урока «Я немного говорю по-итальянски».", "Parlo un po’ italiano", ["molti", "l’italiano"], "Un po’ — «немного». Пишем un с n и ставим апостроф после po."),
    translate("l6", languages, "Я изучаю итальянский онлайн", "Imparo l’italiano online", "Запомни сочетание imparo l’italiano. Online добавляет «онлайн»."),
    translate("l7", languages, "Я говорю по-английски", "Parlo inglese", "Parlo inglese — модель урока. В этом значении также возможны Parlo l’inglese и Parlo in inglese.", ["Parlo l’inglese", "Parlo in inglese"]),
    translate("l8", languages, "Я изучаю итальянский здесь", "Imparo l’italiano qui", "Qui означает «здесь». В образце оно стоит в конце.", ["Qui imparo l’italiano"]),

    choice("p1", place, "Что вставить? Vivo ___ Italia.", "in", ["e", "qui", "questa"], "В образце с названием страны ставим in. Italia пишем с заглавной."),
    choice("p2", place, "Что вставить? Vivo in ___ città.", "questa", ["questo", "molto", "lo"], "Città — женского рода. Поэтому questa."),
    choice("p3", place, "Что вставить? Vivo in ___ paese.", "questo", ["questa", "qui", "ti"], "Paese в итальянском мужского рода. Поэтому questo."),
    choice("p4", place, "Что вставить? Vedo ___ problema.", "questo", ["questa", "qui", "ti"], "Problema — исключение с окончанием -a. Слово мужского рода."),
    build("p5", place, "Собери «Я вижу этот отель».", "Vedo questo hotel", ["questa", "Vivo"], "Hotel — мужского рода. Выбираем questo."),
    build("p6", place, "Собери «Я вижу этот дом».", "Vedo questa casa", ["questo", "Capisco"], "Casa — женского рода. Выбираем questa, хотя русский «дом» мужского рода."),
    translate("p7", place, "Я живу в России", "Vivo in Russia", "Vivo — форма от vivere. Перед Russia ставим in."),
    translate("p8", place, "Я живу здесь", "Vivo qui", "Vivo — «я живу». Qui — «здесь».", ["Qui vivo"]),
    translate("p9", place, "Я люблю эту музыку", "Amo questa musica", "Musica — женского рода. Выбираем questa."),
    translate("p10", place, "Я понимаю этот урок", "Capisco questa lezione", "Lezione — женского рода. Названный предмет ставим после глагола."),

    choice("o1", order, "Как сказать «Я понимаю тебя» с ti?", "Ti capisco", ["Capisco ti", "Lo capisco", "Ti capire"], "Короткое ti ставим перед формой capisco."),
    choice("o2", order, "Как сказать «Я это вижу» с lo?", "Lo vedo", ["Vedo lo", "Ti vedo", "Lo vedere"], "Lo в этом образце — «это». Оно идёт перед vedo."),
    build("o3", order, "Собери «Я это очень хорошо понимаю» с lo.", "Lo capisco molto bene", ["Ti", "poco"], "Сначала lo, затем capisco, в конце molto bene."),
    build("o4", order, "Собери «Я очень хорошо понимаю тебя» с ti.", "Ti capisco molto bene", ["Lo", "poco"], "Ti означает «тебя» и идёт перед capisco. Molto bene — «очень хорошо»."),
    build("o5", order, "Собери фразу урока «Я понимаю всё».", "Capisco tutto", ["Lo", "capire"], "В этом образце tutto («всё») идёт после capisco."),
    translate("o6", order, "Я люблю тебя", "Ti amo", "В этом образце короткое ti идёт перед amo.", ["Amo te"]),
    translate("o7", order, "Я понимаю тебя", "Ti capisco", "В образце урока ti ставим перед capisco.", ["Capisco te"]),

    choice("n1", negative, "Как сказать «Я не понимаю»?", "Non capisco", ["Capisco non", "No capisco", "Non capire"], "Частицу non ставим перед личной формой capisco."),
    build("n2", negative, "Собери «Я не говорю по-итальянски».", "Non parlo italiano", ["No", "inglese"], "Non идёт перед parlo. Название языка в этом образце без артикля."),
    build("n3", negative, "Собери «Я не говорю по-английски, я говорю по-итальянски».", "Non parlo inglese, parlo italiano", ["Imparo"], "Non относится к первому parlo. Второе parlo утвердительное."),
    translate("n4", negative, "Я не говорю по-английски", "Non parlo inglese", "Non идёт перед parlo. Образец урока — без артикля.", ["Non parlo l’inglese", "Non parlo in inglese"]),
    build("n5", negative, "Собери «Я тебя не понимаю» с ti.", "Non ti capisco", ["Lo", "capire"], "С non порядок такой: non, ti, capisco. Это новая комбинация моделей урока."),
    translate("n6", negative, "Я этого не вижу", "Non lo vedo", "В этой комбинации порядок non + lo + vedo.", ["Non vedo questo", "Non vedo ciò"]),

    choice("s1", sound, "На какой слог падает ударение в lavorare?", "-ra-", ["la-", "-vo-", "-re"], "La-vo-RA-re. В форме lavoro ударение перемещается на -vo-."),
    choice("s2", sound, "На какой слог падает ударение в vivere?", "vi-", ["-ve-", "-re-"], "VI-ve-re. В форме vivo ударение также на первом слоге."),
    choice("s3", sound, "Где ударение в vedere?", "-de-", ["ve-", "-re"], "Ve-DE-re. У формы vedo ударение на первом слоге, VE-do."),
    choice("s4", sound, "Что показывает знак ˈ в словарной транскрипции?", "Следующий слог ударный", ["Предыдущий слог ударный", "Дальше идёт пауза", "Следующая буква не произносится"], "В транскрипции ˈ ставится перед ударным слогом. В обычном написании глаголов его нет."),
    choice("s5", sound, "Как правильно записать «немного» в краткой форме?", "un po’", ["un pò", "un po", "um po’"], "Po’ — сокращение от poco. Пишем апостроф после o, а un сохраняем с n."),
    choice("s6", sound, "Как правильно пишется слово «город»?", "città", ["citta", "cità", "citta’"], "В città две t, а над последней a ставится знак ударения à."),
    choice("s7", sound, "Какая буква в hotel не произносится по-итальянски?", "h", ["o", "t", "l"], "Начальное h немое. Ориентируйся на итальянское произношение."),
    write("s8", sound, "Напиши по-итальянски «спасибо».", "grazie", "Grazie пишется с -ie в конце. Ударение на gra-."),
  ];

  const exam = [
    choice("x01", warmup, "Что означает foto?", "фото", ["театр", "идея", "библиотека"], "Foto — фото, фотография. В итальянском это слово женского рода."),
    write("x02", warmup, "Напиши по-итальянски «такси» без артикля.", "taxi", "Taxi пишется с x."),
    write("x03", warmup, "Напиши по-итальянски «важный».", "importante", "Importante — важный. В конце -e."),
    write("x04", warmup, "Напиши по-итальянски «возможный».", "possibile", "Possibile пишется с двойной ss."),
    translate("x05", forms, "Я мало работаю", "Lavoro poco", "Lavorare даёт форму lavoro. Poco — «мало»."),
    translate("x06", forms, "Я работаю и учусь", "Lavoro e studio", "Соединяем формы lavoro и studio через e."),
    translate("x07", forms, "Я учусь здесь", "Studio qui", "Studio — форма от studiare. Qui — «здесь».", ["Qui studio"]),
    write("x08", forms, "Напиши форму capire для «я», одним словом.", "capisco", "У capire форма capisco с -isc-."),
    translate("x09", languages, "Я изучаю итальянский и английский", "Imparo l’italiano e l’inglese", "В конструкции из урока ставим l’ перед обоими языками."),
    translate("x10", languages, "Я говорю по-итальянски и по-английски", "Parlo italiano e inglese", "Короткая модель урока использует parlo и два языка, соединённые e.", ["Parlo l’italiano e l’inglese", "Parlo in italiano e in inglese", "Parlo in italiano e inglese"]),
    translate("x11", languages, "Я немного говорю по-итальянски", "Parlo un po’ italiano", "В un po’ ставим апостроф после po. Возможна также конструкция un po’ di italiano.", ["Parlo un po’ di italiano", "Parlo un po’ d’italiano", "Parlo un poco italiano", "Parlo un poco di italiano"]),
    translate("x12", place, "Я живу в Италии", "Vivo in Italia", "С названием страны в этой фразе употребляем in."),
    translate("x13", place, "Я живу в этом городе", "Vivo in questa città", "Città — женского рода. На письме сохраняем двойную tt и à."),
    translate("x14", place, "Я живу в этой стране", "Vivo in questo paese", "Paese — мужского рода, поэтому questo."),
    translate("x15", place, "Я вижу эту проблему", "Vedo questo problema", "Problema — мужского рода, несмотря на -a в конце."),
    translate("x16", order, "Я очень хорошо это понимаю", "Lo capisco molto bene", "Lo идёт перед capisco. Molto bene — «очень хорошо».", ["Capisco molto bene questo", "Capisco questo molto bene"]),
    translate("x17", order, "Я понимаю всё", "Capisco tutto", "Tutto в этом образце идёт после capisco.", ["Tutto capisco"]),
    translate("x18", order, "Я это вижу", "Lo vedo", "Короткое lo идёт перед vedo.", ["Vedo questo", "Vedo ciò"]),
    translate("x19", order, "Я тебя очень хорошо понимаю", "Ti capisco molto bene", "Ставим ti перед capisco, а molto bene после него.", ["Capisco molto bene te", "Capisco te molto bene"]),
    translate("x20", negative, "Я не понимаю", "Non capisco", "Отрицание non ставим перед capisco."),
    translate("x21", negative, "Я не говорю по-английски, я говорю по-итальянски", "Non parlo inglese, parlo italiano", "Non ставим перед первым parlo. Второе предложение утвердительное.", ["Non parlo l’inglese, parlo l’italiano", "Non parlo in inglese, parlo in italiano", "Non parlo inglese, io parlo italiano"]),
    write("x22", sound, "Напиши итальянское слово «город» без артикля. Проверь удвоение и ударение.", "città", "Città пишется с двумя t и ударением на последней гласной."),
    choice("x23", sound, "Где ударение в vedo?", "На ve-", ["На -do", "На обоих слогах"], "VE-do. Сравни с инфинитивом ve-DE-re."),
    write("x24", sound, "Напиши слово, которым в конце урока преподаватель сказал «спасибо».", "grazie", "Grazie — спасибо. Обрати внимание на -zie."),
  ];

  window.LESSON = { notes, cards, drills, exam };
})();