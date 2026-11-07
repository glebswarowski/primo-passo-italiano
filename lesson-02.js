(() => {
  "use strict";

  const example = (it, ru) => ({ it, ru });
  const note = (title, body, examples) => ({ title, body, examples });
  const card = (id, it, ru, note, tag) => ({ id, it, ru, note, tag });

  const notes = [
    note("Mi piace — мне нравится",
      "Piacere — «нравиться». В конструкции mi piace слово mi значит «мне». Форма piace подходит, когда нравится один предмет или само действие. Кто или что нравится, обычно стоит после mi piace. Если предметов несколько, услышишь mi piacciono. В этом уроке тренируем главным образом mi piace.",
      [example("Mi piace l’italiano.", "Мне нравится итальянский язык."),
       example("Mi piace l’Italia.", "Мне нравится Италия."),
       example("Mi piace viaggiare.", "Мне нравится путешествовать. После piace можно поставить инфинитив.")]),
    note("Этот, эта, это — смотри на род по-итальянски",
      "Перед словом мужского рода ставь questo, перед словом женского — questa. Русский род может отличаться. Запомни сочетания целиком. Posto, hotel, paese, vestito и video здесь мужского рода. Città, musica, idea, cosa и lezione — женского. Окончания -o и -a часто подсказывают род. В словах вроде hotel и paese его нужно запомнить.",
      [example("Mi piace questo posto.", "Мне нравится это место."),
       example("Mi piace questa città.", "Мне нравится этот город."),
       example("Mi piace questo hotel. Mi piace questo paese.", "Мне нравится этот отель. Мне нравится эта страна."),
       example("Mi piace questa musica. Mi piace questa idea.", "Мне нравится эта музыка. Мне нравится эта идея."),
       example("Mi piace questo vestito.", "Мне нравится это платье.")]),
    note("Voglio + действие — я хочу что-то сделать",
      "Volere — «хотеть». Форму для «я» запоминаем целиком: voglio. После неё сразу ставим инфинитив, то есть словарную форму действия. У неё обычно конец -are, -ere или -ire. Слово io можно опустить. Сравни parlo («я говорю») и voglio parlare («я хочу говорить»).",
      [example("Voglio parlare italiano.", "Я хочу говорить по-итальянски."),
       example("Voglio viaggiare. Voglio viaggiare molto.", "Я хочу путешествовать. Я хочу много путешествовать."),
       example("Voglio mangiare. Voglio bere.", "Я хочу есть. Я хочу пить."),
       example("Voglio mangiare ora. Voglio bere ora.", "Я хочу есть сейчас. Я хочу пить сейчас. Вместо ora подходит adesso.")]),
    note("Говорить, знать и изучать язык",
      "В образцах урока используем parlare italiano, conoscere l’italiano и imparare l’italiano. С parlare запомни короткую модель без артикля. С conoscere и imparare в этих фразах стоит l’. В italiano строчная буква, а название страны Italia пишется с заглавной.",
      [example("Voglio parlare italiano.", "Я хочу говорить по-итальянски."),
       example("Voglio conoscere l’italiano.", "Я хочу знать итальянский."),
       example("Voglio imparare l’italiano.", "Я хочу изучать итальянский.")]),
    note("Поехать куда-то и посетить что-то",
      "Andare означает «идти» или «ехать». С направлениями qui и là сразу ставь это слово после andare. Перед названиями стран и в сочетаниях in questa città и in questo paese из урока используй in. После visitare в этих примерах сразу называем место. Обрати внимание на l’Italia после visitare и на in Italia после andare.",
      [example("Voglio andare là. Voglio andare qui.", "Я хочу поехать туда. Я хочу поехать сюда."),
       example("Voglio andare in Italia. Voglio visitare l’Italia.", "Я хочу поехать в Италию. Я хочу посетить Италию."),
       example("Voglio andare in questa città. Voglio visitare questa città.", "Я хочу поехать в этот город. Я хочу посетить этот город."),
       example("Voglio andare in questo paese. Voglio visitare questo paese.", "Я хочу поехать в эту страну. Я хочу посетить эту страну.")]),
    note("Купить, увидеть и посмотреть",
      "Comprare — «купить». Vedere — «видеть, увидеть», guardare — «смотреть, посмотреть», то есть направлять взгляд и внимание. С видео и уроком в реальной речи встречаются оба глагола. Здесь тренируем различие на примерах преподавателя.",
      [example("Voglio comprare questo vestito. Voglio comprare questa cosa.", "Я хочу купить это платье. Я хочу купить эту вещь."),
       example("Voglio vedere questa lezione.", "Я хочу увидеть этот урок."),
       example("Voglio guardare questo video. Voglio guardare questa lezione.", "Я хочу посмотреть это видео. Я хочу посмотреть этот урок.")]),
    note("Без ошибок и с другими людьми",
      "Senza значит «без». В сочетании senza errori у errori стоит множественное число. Altre persone — «другие люди». В итальянском persone женского рода во множественном числе, поэтому altre. Con — «с». В относительной части che передаёт «которые». Здесь parlano — форма для «они» от parlare. Ударение на par-.",
      [example("Voglio parlare italiano senza errori.", "Я хочу говорить по-итальянски без ошибок."),
       example("Voglio capire altre persone che parlano italiano.", "Я хочу понимать других людей, которые говорят по-итальянски."),
       example("Voglio comunicare con altre persone che parlano italiano.", "Я хочу общаться с другими людьми, которые говорят по-итальянски.")]),
    note("Mi chiamo — меня зовут",
      "Chiamarsi — «зваться». Когда представляешься, ставь mi перед chiamo и добавляй имя. В mi piace то же короткое mi передаёт «мне», а в mi chiamo относится к самому говорящему. Запомни фразы целиком.",
      [example("Mi chiamo Caterina.", "Меня зовут Катерина."),
       example("Mi chiamo Alessandro.", "Меня зовут Алессандро.")]),
    note("Звуки, ударение и написание",
      "В piace буква c перед e звучит близко к «ч», а в conoscere сочетание sc перед e — близко к «ш». В voglio сочетание gli перед гласной обозначает мягкий звук /ʎ/. Подними середину языка к твёрдому нёбу. В viaggiare и mangiare слышится звук, близкий к «дж», причём в viaggiare g удвоена. В chiamo сочетание ch перед i даёт звук «к». В visitare в образце урока s звучит близко к «з». В errori после первой e пишется rr. При произнесении volere, conoscere, comprare сохраняй o без русского аканья.",
      [example("voglio · volere · conoscere", "Ударные слоги: VO-glio · vo-LE-re · co-NO-sce-re."),
       example("viaggiare · mangiare · comprare", "Ударные слоги: viag-GIA-re · man-GIA-re · com-PRA-re."),
       example("parlano · guardare · piacere", "Ударные слоги: PAR-la-no · guar-DA-re · pia-CE-re."),
       example("chiamo · città · là · qui", "Chiamo начинается со звука «к». В città и là пишется à. В qui знака ударения нет.")]),
  ];

  const patterns = "Конструкции";
  const verbs = "Действия";
  const objects = "Предметы и места";
  const words = "Короткие слова";
  const phrases = "Фразы урока";

  const cards = [
    card("piacere", "piacere", "нравиться", "В pia-ce-re ударение на -ce-. Буква c перед e звучит близко к «ч».", verbs),
    card("piace", "piace", "нравится", "Форма для одного предмета или действия. Mi piace questo posto.", patterns),
    card("mi", "mi", "мне (в mi piace)", "В mi chiamo это возвратное местоимение для «я».", words),
    card("mi-piace", "mi piace", "мне нравится", "Дальше может идти один предмет или действие. Mi piace viaggiare.", patterns),
    card("volere", "volere", "хотеть", "Ударение на -le-. Форма для «я» — voglio.", verbs),
    card("voglio", "voglio", "я хочу", "Неправильная форма от volere. Дальше можно поставить инфинитив, например voglio bere.", patterns),
    card("parlare", "parlare", "говорить", "Voglio parlare italiano. Parlo — «я говорю», parlano — «они говорят».", verbs),
    card("conoscere", "conoscere", "знать, быть знакомым", "Voglio conoscere l’italiano. Ударение на -no-, а sc перед e близко к «ш».", verbs),
    card("viaggiare", "viaggiare", "путешествовать", "Две g. Voglio viaggiare molto — я хочу много путешествовать.", verbs),
    card("visitare", "visitare", "посетить", "В произношении из урока s близка к «з». Visitare l’Italia.", verbs),
    card("mangiare", "mangiare", "есть, кушать", "Сочетание gi в -giare даёт звук, близкий к «дж».", verbs),
    card("bere", "bere", "пить", "Voglio bere — я хочу пить.", verbs),
    card("comprare", "comprare", "купить, покупать", "Ударение на -pra-. Первое o звучит как o.", verbs),
    card("imparare", "imparare", "учить, изучать", "Voglio imparare l’italiano — я хочу изучать итальянский.", verbs),
    card("andare", "andare", "идти, ехать", "Andare in Italia — ехать в Италию.", verbs),
    card("vedere", "vedere", "видеть, увидеть", "Ударение в инфинитиве на -de-. Vedo — «я вижу».", verbs),
    card("guardare", "guardare", "смотреть, посмотреть", "Guardare questo video — посмотреть это видео.", verbs),
    card("capire", "capire", "понимать, понять", "После voglio используй capire. Capisco — отдельная форма «я понимаю».", verbs),
    card("comunicare", "comunicare", "общаться", "Comunicare con altre persone — общаться с другими людьми. Одно m.", verbs),
    card("chiamarsi", "chiamarsi", "зваться, называться", "В форме для «я» получается mi chiamo.", verbs),
    card("mi-chiamo", "mi chiamo", "меня зовут", "После chiamo идёт имя. Ch произносится как «к».", patterns),
    card("parlano", "parlano", "они говорят", "Форма от parlare. Ударение на PAR-.", patterns),
    card("posto", "posto", "место", "Мужской род. Questo posto.", objects),
    card("citta", "città", "город", "Женский род. Questa città. Две t и à в конце.", objects),
    card("hotel", "hotel", "отель", "Мужской род. Questo hotel. Начальная h не произносится.", objects),
    card("paese", "paese", "страна (в примерах урока)", "Мужской род. Questo paese. В другом контексте paese может означать населённый пункт.", objects),
    card("musica", "musica", "музыка", "Женский род. Questa musica. Ударение на mu-.", objects),
    card("vestito", "vestito", "платье (в примерах урока)", "Мужской род. Questo vestito. Может также означать костюм или одежду по контексту.", objects),
    card("idea", "idea", "идея", "Женский род. Questa idea или quest’idea.", objects),
    card("cosa", "cosa", "вещь", "Женский род. Questa cosa.", objects),
    card("lezione", "lezione", "урок", "Женский род. Questa lezione.", objects),
    card("video", "video", "видео", "Мужской род. Questo video. Ударение на vi-.", objects),
    card("italiano", "italiano", "по-итальянски (в parlare italiano)", "Название языка в conoscere l’italiano пишется со строчной.", words),
    card("italia", "Italia", "Италия", "Заглавная I. Сравни andare in Italia и visitare l’Italia.", objects),
    card("errore", "errore", "ошибка", "После первой e пишется rr. Во множественном числе errori.", objects),
    card("errori", "errori", "ошибки", "Множественное число от errore. Senza errori — «без ошибок».", objects),
    card("persone", "persone", "люди", "Множественное число от persona. Женский род.", objects),
    card("altre-persone", "altre persone", "другие люди", "Оба слова заканчиваются на -e. Con altre persone — с другими людьми.", patterns),
    card("che", "che", "которые (в altre persone che parlano)", "В других контекстах может означать «который», «что». Здесь связывает две части предложения.", words),
    card("senza", "senza", "без", "Senza errori — «без ошибок».", words),
    card("con", "con", "с", "Comunicare con altre persone — общаться с другими людьми.", words),
    card("ora", "ora", "сейчас (в voglio bere ora)", "В другом контексте ora означает «час». Синоним в значении «сейчас» — adesso.", words),
    card("adesso", "adesso", "сейчас, теперь", "Voglio mangiare adesso — я хочу есть сейчас. Две s.", words),
    card("la", "là", "там, туда", "Над à ставится знак ударения. Andare là — пойти или поехать туда.", words),
    card("qui", "qui", "здесь, сюда", "Пишется без знака ударения. Andare qui — пойти или поехать сюда.", words),
    card("molto", "molto", "много (в viaggiare molto)", "В примере Voglio viaggiare molto ставим molto после действия.", words),
    card("in", "in", "в (в andare in Italia)", "Сравни с visitare l’Italia, где in отсутствует.", words),
    card("questo", "questo", "этот, это (перед словом мужского рода)", "Questo posto, questo vestito, questo video.", words),
    card("questa", "questa", "эта, это (перед словом женского рода)", "Questa città, questa lezione, questa cosa.", words),
    card("piace-italiano", "Mi piace l’italiano.", "Мне нравится итальянский язык.", "L’ — артикль, italiano со строчной.", phrases),
    card("piace-italia", "Mi piace l’Italia.", "Мне нравится Италия.", "Italia — название страны с заглавной.", phrases),
    card("piace-citta", "Mi piace questa città.", "Мне нравится этот город.", "Città женского рода, поэтому questa.", phrases),
    card("piace-vestito", "Mi piace questo vestito.", "Мне нравится это платье.", "Vestito мужского рода, поэтому questo.", phrases),
    card("voglio-parlare", "Voglio parlare italiano.", "Я хочу говорить по-итальянски.", "После voglio идёт parlare. В образце italiano без артикля.", phrases),
    card("voglio-conoscere", "Voglio conoscere l’italiano.", "Я хочу знать итальянский.", "Здесь с l’ перед названием языка.", phrases),
    card("voglio-viaggiare", "Voglio viaggiare molto.", "Я хочу много путешествовать.", "Сначала viaggiare, затем molto.", phrases),
    card("voglio-mangiare", "Voglio mangiare ora.", "Я хочу есть сейчас.", "Можно заменить ora на adesso.", phrases),
    card("voglio-bere", "Voglio bere.", "Я хочу пить.", "Voglio + инфинитив bere.", phrases),
    card("voglio-comprare", "Voglio comprare questa cosa.", "Я хочу купить эту вещь.", "Cosa женского рода, поэтому questa.", phrases),
    card("voglio-andare", "Voglio andare in Italia.", "Я хочу поехать в Италию.", "Andare in Italia. У страны здесь нет артикля.", phrases),
    card("voglio-visitare", "Voglio visitare l’Italia.", "Я хочу посетить Италию.", "Visitare l’Italia. Название страны с l’.", phrases),
    card("voglio-video", "Voglio guardare questo video.", "Я хочу посмотреть это видео.", "Video мужского рода, поэтому questo.", phrases),
    card("senza-errori", "senza errori", "без ошибок", "Сохраняй двойную rr и окончание -i.", patterns),
    card("che-parlano", "che parlano italiano", "которые говорят по-итальянски", "Parlano — «они говорят». Che вводит описание людей.", patterns),
    card("voglio-capire", "Voglio capire altre persone che parlano italiano.", "Я хочу понимать других людей, которые говорят по-итальянски.", "Voglio capire + altre persone + che parlano italiano.", phrases),
    card("voglio-comunicare", "Voglio comunicare con altre persone che parlano italiano.", "Я хочу общаться с другими людьми, которые говорят по-итальянски.", "Comunicare con — «общаться с».", phrases),
  ];

  const choice = (id, section, prompt, answer, distractors, explanation) =>
    ({ id, section, type: "choice", prompt, answer, options: [answer, ...distractors], explanation });
  const build = (id, section, prompt, answer, distractors, explanation) =>
    ({ id, section, type: "build", prompt, answer, tiles: [...answer.split(" "), ...distractors], explanation });
  const write = (id, section, prompt, answer, explanation, alternatives = []) =>
    ({ id, section, type: "write", prompt, answer, explanation, alternatives });
  const want = (id, section, ru, action, explanation, variants = []) =>
    write(id, section, "Переведи с voglio. «Я хочу " + ru + "».", "Voglio " + action, explanation,
      ["Io voglio " + action, ...variants.flatMap(variant => ["Voglio " + variant, "Io voglio " + variant])]);
  const like = (id, section, ru, thing, explanation, variants = []) =>
    write(id, section, "Переведи с mi piace. «Мне нравится " + ru + "».", "Mi piace " + thing, explanation,
      [...variants.map(variant => "Mi piace " + variant), ...[thing, ...variants].map(value => value + " mi piace")]);

  const liking = "Мне нравится";
  const gender = "Этот, эта, это";
  const wanting = "Хочу сделать";
  const movement = "Еду и посещаю";
  const buying = "Купить и посмотреть";
  const people = "С другими людьми";
  const intro = "Имя и произношение";

  const drills = [
    choice("a01", liking, "Что означает mi в mi piace?", "мне", ["тебя", "это", "я хочу"], "Mi piace целиком означает «мне нравится»."),
    choice("a02", liking, "Что в mi piace означает «нравится»?", "piace", ["mi", "voglio", "chiamo"], "Piace — форма от piacere. Mi добавляет «мне»."),
    choice("a03", liking, "Как сказать «Мне нравится итальянский язык» по образцу урока?", "Mi piace l’italiano", ["Mi piace l’Italia", "Mi piacere l’italiano", "Voglio l’italiano"], "L’italiano — язык. L’Italia — страна."),
    build("a04", liking, "Собери «Мне нравится Италия».", "Mi piace l’Italia", ["l’italiano", "parlare"], "Страна — Italia с заглавной I. В этом примере ставим l’."),
    build("a05", liking, "Собери «Мне нравится путешествовать».", "Mi piace viaggiare", ["Voglio", "viaggio"], "Когда нравится действие, после mi piace используем инфинитив."),
    like("a06", liking, "это место", "questo posto", "Posto мужского рода. Ставим questo."),
    like("a07", liking, "итальянский язык", "l’italiano", "В этой фразе используем l’italiano со строчной буквы."),
    like("a08", liking, "эта музыка", "questa musica", "Musica женского рода. Ставим questa."),

    choice("g01", gender, "Что вставить? Mi piace ___ città.", "questa", ["questo", "altre", "senza"], "Città — женского рода. Поэтому questa città."),
    choice("g02", gender, "Что вставить? Mi piace ___ vestito.", "questo", ["questa", "altre", "con"], "Vestito — мужского рода. Поэтому questo vestito."),
    choice("g03", gender, "Что вставить? Mi piace ___ paese.", "questo", ["questa", "altre", "che"], "Paese — мужского рода. Поэтому questo paese."),
    choice("g04", gender, "Что вставить? Mi piace ___ hotel.", "questo", ["questa", "altre", "con"], "Hotel — мужского рода, хотя окончание род не подсказывает."),
    build("g05", gender, "Собери «Мне нравится этот город».", "Mi piace questa città", ["questo", "paese"], "Город по-итальянски женского рода. Пишем città с tt и à."),
    like("g06", gender, "эта идея", "questa idea", "Idea — женского рода. Перед гласной также встречается quest’idea.", ["quest’idea"]),
    like("g07", gender, "это платье", "questo vestito", "Ставим questo, потому что vestito мужского рода."),
    like("g08", gender, "этот отель", "questo hotel", "Hotel — мужского рода. В речи его начальная h не звучит.", ["quest’hotel"]),

    choice("v01", wanting, "Какая форма volere означает «я хочу»?", "voglio", ["volo", "volere", "voglia"], "Voglio — неправильная форма. Запомни её целиком."),
    choice("v02", wanting, "Какую форму поставить после voglio? Voglio ___ italiano.", "parlare", ["parlo", "parlano", "parla"], "После voglio ставим инфинитив parlare."),
    choice("v03", wanting, "Выбери модель урока для «Я хочу знать итальянский».", "Voglio conoscere l’italiano", ["Voglio conoscere l’Italia", "Voglio parlare italiano", "Voglio conosco l’italiano"], "Здесь нужен инфинитив conoscere и название языка с l’."),
    build("v04", wanting, "Собери «Я хочу путешествовать».", "Voglio viaggiare", ["viaggio", "mangiare"], "После voglio идёт инфинитив. Viaggiare пишем с двойной gg."),
    build("v05", wanting, "Собери «Я хочу много путешествовать».", "Voglio viaggiare molto", ["poco", "mangiare"], "В модели урока molto идёт после viaggiare."),
    want("v06", wanting, "есть", "mangiare", "Mangiare — есть. После voglio форма mangiare сохраняется."),
    want("v07", wanting, "пить сейчас", "bere ora", "Bere — пить. Сейчас — ora или adesso.", ["bere adesso", "ora bere", "adesso bere"]),
    want("v08", wanting, "изучать итальянский", "imparare l’italiano", "Используй словарную форму imparare и l’italiano.", ["studiare l’italiano", "studiare italiano"]),
    want("v09", wanting, "говорить по-итальянски", "parlare italiano", "В модели урока parlare italiano. В речи возможны также parlare l’italiano и parlare in italiano.", ["parlare l’italiano", "parlare in italiano"]),

    choice("m01", movement, "Как сказать «поехать в Италию»?", "andare in Italia", ["andare l’Italia", "visitare l’Italia", "andare questa Italia"], "В конструкции andare in Italia перед названием страны ставим in."),
    choice("m02", movement, "Как сказать «посетить Италию»?", "visitare l’Italia", ["visitare in Italia", "andare in Italia", "visitare l’italiano"], "После visitare сразу называем место. Здесь это l’Italia."),
    choice("m03", movement, "Как записать слово «туда» из урока?", "là", ["la", "l’a", "qui"], "Наречие là («там, туда») пишется с à. Qui означает «здесь, сюда»."),
    build("m04", movement, "Собери «Я хочу поехать сюда».", "Voglio andare qui", ["là", "visitare"], "Andare qui — ехать сюда. Между словами предлога нет."),
    build("m05", movement, "Собери «Я хочу поехать в этот город».", "Voglio andare in questa città", ["questo", "qui"], "Andare in + место. Перед città используем questa."),
    want("m06", movement, "посетить эту страну", "visitare questo paese", "С visitare сразу ставим место. Paese мужского рода."),
    want("m07", movement, "посетить этот город", "visitare questa città", "Перед città ставим questa. После visitare предлог in не нужен."),
    want("m08", movement, "поехать в эту страну", "andare in questo paese", "Andare in + место. Paese — мужского рода."),
    write("m09", movement, "Переведи «Я хочу поехать туда». Используй andare и слово с à из урока.", "Voglio andare là", "Наречие là с à ставится после andare.", ["Io voglio andare là"]),

    choice("b01", buying, "Какой инфинитив означает «купить»?", "comprare", ["conoscere", "visitare", "guardare"], "Comprare — покупать, купить. Ударение на -pra-."),
    choice("b02", buying, "Какой глагол преподаватель использует для «смотреть», когда внимание направлено на видео?", "guardare", ["comprare", "vedere", "visitare"], "В образце используется guardare. Vedere означает «видеть, увидеть»."),
    build("b03", buying, "Собери «Я хочу купить эту вещь».", "Voglio comprare questa cosa", ["questo", "vestito"], "Cosa женского рода, поэтому questa cosa."),
    build("b04", buying, "Собери «Я хочу посмотреть это видео».", "Voglio guardare questo video", ["questa", "lezione"], "Video мужского рода, поэтому questo video."),
    want("b05", buying, "купить это платье", "comprare questo vestito", "Ставим questo перед vestito, словом мужского рода."),
    write("b06", buying, "Исправь форму глагола в предложении Voglio vedo questa lezione.", "Voglio vedere questa lezione", "После voglio нужен инфинитив vedere. Vedo означает «я вижу».", ["Io voglio vedere questa lezione"]),
    want("b07", buying, "посмотреть этот урок", "guardare questa lezione", "Сочетание questa lezione сохраняется. Guardare передаёт действие «смотреть». С видеоуроком встречается и vedere.", ["vedere questa lezione"]),

    choice("p01", people, "Как сказать «без ошибок»?", "senza errori", ["senza errore", "senza erori", "con errori"], "Во множественном числе errore → errori. После первой e сохраняется удвоенная rr."),
    choice("p02", people, "Как сказать «другие люди»?", "altre persone", ["altri persone", "altre persona", "altro persone"], "Persone — женский род, множественное число. Прилагательное принимает форму altre."),
    choice("p03", people, "Что означает che в altre persone che parlano italiano?", "которые", ["с", "без", "сейчас"], "Che связывает людей с их описанием: которые говорят по-итальянски."),
    choice("p04", people, "Как сказать «они говорят»?", "parlano", ["parlo", "parlare", "parla"], "У формы parlano окончание -ano, ударение на PAR-."),
    build("p05", people, "Собери «Я хочу говорить по-итальянски без ошибок».", "Voglio parlare italiano senza errori", ["errore", "parlano"], "Parlare — инфинитив после voglio. Senza errori — «без ошибок»."),
    build("p06", people, "Собери «Я хочу понимать других людей, которые говорят по-итальянски».", "Voglio capire altre persone che parlano italiano", ["capisco", "con"], "После voglio — capire. Che вводит описание людей, поэтому дальше parlano."),
    build("p07", people, "Собери «Я хочу общаться с другими людьми».", "Voglio comunicare con altre persone", ["che", "capire"], "Comunicare con — «общаться с». Для persone выбираем altre."),
    want("p08", people, "общаться с другими людьми, которые говорят по-итальянски", "comunicare con altre persone che parlano italiano", "Сначала comunicare con altre persone, затем che parlano italiano.", ["comunicare con altre persone che parlano l’italiano", "comunicare con altre persone che parlano in italiano"]),

    choice("s01", intro, "Какая фраза значит «меня зовут»?", "mi chiamo", ["mi piace", "chiamo mi", "mi voglio"], "Mi chiamo — форма от chiamarsi. Mi стоит перед chiamo."),
    build("s02", intro, "Собери «Меня зовут Катерина».", "Mi chiamo Caterina", ["piace", "chiamarsi"], "Mi chiamo + имя. В итальянском примере используется Caterina."),
    write("s03", intro, "Напиши «Меня зовут Алессандро» с chiamarsi.", "Mi chiamo Alessandro", "Имя Alessandro пишется с двойной ss. В форме для «я» используем mi chiamo.", ["Io mi chiamo Alessandro"]),
    choice("s04", intro, "На какой слог падает ударение в conoscere?", "-no-", ["co-", "-sce-", "-re"], "Co-NO-sce-re. Sc перед e звучит близко к «ш»."),
    choice("s05", intro, "Как правильно написать «путешествовать»?", "viaggiare", ["viagiare", "viajjare", "viaggare"], "В viaggiare две g и есть i после них."),
    choice("s06", intro, "На какой слог падает ударение в parlano?", "par-", ["-la-", "-no"], "PAR-la-no — форма «они говорят»."),
    choice("s07", intro, "С какого звука начинается chiamo?", "Со звука, близкого к «к»", ["Со звука, близкого к «ч»", "Со звука, близкого к «ш»", "Со звука, близкого к «дж»"], "Ch перед i обозначает звук /k/. Сравни с c в piace."),
    choice("s08", intro, "Что помогает произнести gli в voglio?", "Поднять середину языка к твёрдому нёбу", ["Произнести g и l раздельно", "Произнести звук «дж»", "Произнести твёрдое «л» с кончиком языка за зубами"], "В voglio сочетание gli перед гласной обозначает мягкий звук /ʎ/."),
    choice("s09", intro, "Как звучит s в образце произношения visitare из урока?", "Близко к «з»", ["Близко к «ш»", "Близко к «ц»", "Близко к «ч»"], "В словарном образце visitare звучит с /z/. Сохрани букву s на письме."),
    write("s10", intro, "Запиши слово «общаться» в словарной форме из урока.", "comunicare", "Comunicare пишется с одной m. Ударение на -ca-."),
  ];

  const exam = [
    choice("x01", liking, "Когда подходит форма mi piace?", "Когда нравится один предмет или действие", ["Когда нравится несколько предметов", "Когда хочется что-то сделать", "Когда называют своё имя"], "Mi piace сочетается с одним предметом и с инфинитивом. Для нескольких предметов есть mi piacciono."),
    like("x02", liking, "Италия", "l’Italia", "Italia — название страны с заглавной. В этой фразе перед ним стоит l’."),
    like("x03", gender, "эта страна", "questo paese", "Paese мужского рода, поэтому questo."),
    like("x04", gender, "этот город", "questa città", "Città женского рода. Удвоение tt и знак à обязательны."),
    like("x05", gender, "это платье", "questo vestito", "Перед vestito ставим questo, потому что слово мужского рода."),
    write("x06", wanting, "Напиши форму volere для «я» одним словом.", "voglio", "Volere → voglio. Форму нужно запомнить."),
    write("x07", wanting, "Переведи «Я хочу знать итальянский». Используй conoscere.", "Voglio conoscere l’italiano", "После voglio ставим conoscere. В этой модели язык с l’.", ["Io voglio conoscere l’italiano"]),
    want("x08", wanting, "много путешествовать", "viaggiare molto", "В образце molto ставим после инфинитива. Viaggiare пишем с двумя g."),
    want("x09", wanting, "есть сейчас", "mangiare ora", "Mangiare — есть, ora или adesso — сейчас.", ["mangiare adesso", "ora mangiare", "adesso mangiare"]),
    want("x10", wanting, "пить", "bere", "После voglio используем инфинитив bere."),
    want("x11", movement, "поехать в Италию", "andare in Italia", "Andare in Italia — поехать в Италию. Название страны здесь без артикля."),
    want("x12", movement, "посетить Италию", "visitare l’Italia", "Visitare l’Italia — посетить Италию. После visitare сразу ставим название с l’."),
    want("x13", movement, "посетить этот город", "visitare questa città", "С visitare место идёт без in. Перед città нужна форма questa."),
    want("x14", movement, "поехать в эту страну", "andare in questo paese", "Andare in + место. Paese мужского рода."),
    write("x15", movement, "Переведи «Я хочу поехать сюда». Используй andare и qui.", "Voglio andare qui", "Qui пишется без знака ударения. После andare в этой фразе предлог не нужен.", ["Io voglio andare qui"]),
    want("x16", buying, "купить эту вещь", "comprare questa cosa", "С cosa используем questa. После voglio — comprare."),
    want("x17", buying, "купить это платье", "comprare questo vestito", "Vestito мужского рода, поэтому questo."),
    write("x18", buying, "Переведи «Я хочу посмотреть это видео». Используй guardare.", "Voglio guardare questo video", "После voglio — guardare. Перед video ставим questo.", ["Io voglio guardare questo video"]),
    write("x19", buying, "Переведи «Я хочу увидеть этот урок». Используй vedere.", "Voglio vedere questa lezione", "Lezione женского рода, поэтому questa.", ["Io voglio vedere questa lezione"]),
    want("x20", people, "говорить по-итальянски без ошибок", "parlare italiano senza errori", "Senza errori — «без ошибок». Errori — множественное число от errore.", ["parlare l’italiano senza errori", "parlare in italiano senza errori"]),
    want("x21", people, "понимать других людей, которые говорят по-итальянски", "capire altre persone che parlano italiano", "Altre согласуется с persone. Che передаёт «которые», а parlano — «они говорят».", ["capire altre persone che parlano l’italiano", "capire altre persone che parlano in italiano"]),
    write("x22", people, "Переведи «Я хочу общаться с другими людьми, которые говорят по-итальянски». Используй comunicare.", "Voglio comunicare con altre persone che parlano italiano", "Comunicare con altre persone — «общаться с другими людьми». С che присоединяем их описание.", ["Io voglio comunicare con altre persone che parlano italiano", "Voglio comunicare con altre persone che parlano l’italiano", "Voglio comunicare con altre persone che parlano in italiano", "Io voglio comunicare con altre persone che parlano l’italiano", "Io voglio comunicare con altre persone che parlano in italiano"]),
    write("x23", intro, "Переведи с chiamarsi. «Меня зовут Катерина».", "Mi chiamo Caterina", "Mi chiamo + имя. В итальянском образце имя Caterina.", ["Io mi chiamo Caterina"]),
    write("x24", intro, "Напиши слово из урока «туда» с нужным знаком ударения.", "là", "У наречия là знак ударения над à. Артикль la пишется иначе."),
    choice("x25", intro, "Какое слово из урока начинается со звука, близкого к «к»?", "chiamo", ["voglio", "viaggiare", "piace"], "Ch перед i в chiamo передаёт звук /k/."),
    choice("x26", intro, "Где ударение в conoscere и parlano соответственно?", "-no- и par-", ["-sce- и -la-", "co- и -no", "-re и par-"], "Conoscere — ударение на -no-. Parlano — на первом слоге."),
  ];

  window.LESSON = { notes, cards, drills, exam };
})();
