(async () => {
  "use strict";

  const panel = document.querySelector("#panel");
  const catalog = window.COURSE;
  const requested = new URLSearchParams(location.search).get("lesson");
  const current = catalog.find(item => item.id === requested) || catalog[0];
  const lessonName = `Урок ${current.id}`;
  document.querySelector("#lesson-label").textContent = `${current.id} / ${current.title}`;
  document.querySelector("#lesson-number").textContent = current.id;
  document.querySelector("#lesson-phrase").textContent = current.phrase;
  document.querySelector("#footer-lesson").textContent = lessonName;
  document.title = `Primo passo · ${lessonName}`;

  const menu = document.querySelector("#course-menu");
  const title = document.createElement("p");
  title.className = "course-menu-title";
  title.textContent = "Уроки курса";
  menu.append(title);
  for (const entry of catalog) {
    const link = document.createElement("a");
    link.className = "course-menu-link";
    link.href = `?lesson=${encodeURIComponent(entry.id)}`;
    if (entry === current) link.setAttribute("aria-current", "page");
    const label = document.createElement("span");
    label.className = "course-menu-meta";
    label.textContent = `Урок ${entry.id}`;
    const name = document.createElement("strong");
    name.textContent = entry.title;
    link.append(label, name);
    menu.append(link);
  }
  const picker = menu.closest("details");
  document.addEventListener("click", event => {
    if (!picker.contains(event.target)) picker.open = false;
  });
  picker.addEventListener("keydown", event => {
    if (event.key !== "Escape" || !picker.open) return;
    picker.open = false;
    picker.querySelector("summary").focus();
  });

  try {
    if (!window.LESSON) await new Promise((resolve, reject) => {
      const script = document.createElement("script");
      script.src = current.source;
      script.onload = resolve;
      script.onerror = reject;
      document.head.append(script);
    });
  } catch {
    panel.textContent = "Не удалось загрузить урок. Обнови страницу.";
    return;
  }
  const lesson = window.LESSON;
  if (!lesson) {
    panel.textContent = "Не удалось загрузить урок. Обнови страницу.";
    return;
  }

  const storageKey = `primo-passo.lesson-${current.id}.v1`;
  const sections = [...new Set(lesson.drills.map(question => question.section))];
  const tags = [...new Set(lesson.cards.map(card => card.tag))];
  const questions = new Map([...lesson.drills, ...lesson.exam].map(question => [question.id, question]));
  const blank = { cards: {}, drills: {}, errors: {}, exam: { index: 0, correct: 0 }, best: null };
  let saved;
  let durable = true;
  try {
    saved = { ...blank, ...JSON.parse(localStorage.getItem(storageKey) || "{}") };
  } catch {
    saved = structuredClone(blank);
    durable = false;
  }

  const modes = ["notes", "cards", "drills", "exam", "errors"];
  let tab = modes.includes(location.hash.slice(1)) ? location.hash.slice(1) : "notes";
  let section = sections.find(name => lesson.drills.some(question => question.section === name && !saved.drills[question.id])) || sections[0];
  let cardTag = "";
  let unknownOnly = false;
  let reverse = false;
  let cardIndex = 0;
  let order = null;
  let flipped = false;
  let round = null;
  let retry = null;

  const icons = {
    speaker: '<svg viewBox="0 0 24 24" width="19" height="19" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="M3 9v6h4l5 4V5L7 9H3zm13 0a4 4 0 0 1 0 6m3-9a8 8 0 0 1 0 12"/></svg>',
  };
  const esc = value => String(value ?? "").replace(/[&<>"']/g, character =>
    ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
  const normalize = value => value.normalize("NFC").toLowerCase().trim()
    .replace(/[’‘`´ʼ]/g, "'")
    .replace(/\s*'\s*/g, "'")
    .replace(/\s*[,.;!?]+\s*/g, " ")
    .replace(/\s+/g, " ").trim();
  const loose = value => normalize(value).normalize("NFD").replace(/\p{M}/gu, "").replace(/'/g, "");
  const heading = (kicker, title, description) =>
    `<header class="section-heading"><p class="eyebrow">${kicker}</p><h2>${title}</h2><p>${description}</p></header>`;
  const button = (label, action, style = "secondary", extra = "") =>
    `<button type="button" class="${style}" data-action="${action}" ${extra}>${label}</button>`;
  const speaker = value => button(`${icons.speaker} Слушать`, "speak", "secondary audio-button",
    `data-say="${esc(value)}" aria-label="Прослушать итальянский пример"`);
  const progress = (value, total, label) =>
    `<progress class="meter" value="${value}" max="${total || 1}" aria-label="${esc(label)}"></progress>`;
  const errors = () => Object.keys(saved.errors).filter(id => questions.has(id));
  const shuffled = list => {
    const result = [...list];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  };

  function persist() {
    try {
      localStorage.setItem(storageKey, JSON.stringify(saved));
    } catch {
      durable = false;
    }
  }

  function navigate(next, scroll = true) {
    if (next !== tab) round = null;
    tab = next;
    history.replaceState(null, "", `#${next}`);
    render();
    if (scroll) {
      panel.focus({ preventScroll: true });
      panel.scrollIntoView({ block: "start" });
    }
  }

  function render() {
    document.querySelectorAll("[data-tab]").forEach(item => {
      if (item.dataset.tab === tab) item.setAttribute("aria-current", "page");
      else item.removeAttribute("aria-current");
    });
    panel.innerHTML = ({ notes: renderNotes, cards: renderCards, drills: renderDrills,
      exam: renderExam, errors: renderErrors })[tab]() +
      (durable ? "" : '<p class="muted">Браузер ограничил сохранение. Прогресс доступен до закрытия страницы.</p>') +
      '<p id="app-status" class="app-status" role="status" hidden></p>';
  }

  function renderNotes() {
    const known = lesson.cards.filter(card => saved.cards[card.id] === "known").length;
    const solved = lesson.drills.filter(question => saved.drills[question.id]).length;
    return heading("01 / Разбор", "Вспомним урок", "Открой темы по порядку. Прочитай пример вслух и попробуй повторить его по-итальянски, глядя только на перевод.") +
      `<div class="overview-grid">
        <div class="panel-card"><strong>${known} / ${lesson.cards.length}</strong><span>карточек отмечено «Знаю»</span></div>
        <div class="panel-card"><strong>${solved} / ${lesson.drills.length}</strong><span>заданий практики решено</span></div>
        <div class="panel-card"><strong>${saved.best === null ? "—" : `${saved.best} / ${lesson.exam.length}`}</strong><span>лучший результат теста</span></div>
      </div>
      <div class="note-list">${lesson.notes.map((note, i) => `<details class="note" ${i === 0 ? "open" : ""}>
        <summary><span class="note-index">${String(i + 1).padStart(2, "0")}</span>${esc(note.title)}</summary>
        <div class="note-body"><p>${esc(note.body)}</p>
          ${note.examples.map(example => `<div class="example">
            <div><strong lang="it">${esc(example.it)}</strong><span>${esc(example.ru)}</span></div>
            ${example.it.includes("→") ? "" : speaker(example.it)}
          </div>`).join("")}
        </div>
      </details>`).join("")}</div>
      <div class="question-actions">${button("Открыть карточки →", "to-cards", "primary")}</div>`;
  }

  function deck() {
    return (order || lesson.cards).filter(card =>
      (!cardTag || card.tag === cardTag) && (!unknownOnly || saved.cards[card.id] !== "known"));
  }

  function renderCards() {
    const cards = deck();
    cardIndex = Math.min(cardIndex, Math.max(0, cards.length - 1));
    const card = cards[cardIndex];
    const itFirst = !reverse;
    const italianSide = flipped ? !itFirst : itFirst;
    const known = lesson.cards.filter(item => saved.cards[item.id] === "known").length;
    const copy = `<div class="toolbar">
      <div class="segmented" aria-label="Направление перевода">
        ${button("IT → RU", "it-first", "secondary", `aria-pressed="${!reverse}"`)}
        ${button("RU → IT", "ru-first", "secondary", `aria-pressed="${reverse}"`)}
      </div>
      <label class="select-wrap">Тема
        <select id="card-tag"><option value="">Все темы</option>
          ${tags.map(tag => `<option ${tag === cardTag ? "selected" : ""}>${esc(tag)}</option>`).join("")}
        </select>
      </label>
      ${button("Ещё учу", "filter-cards", "secondary", `aria-pressed="${unknownOnly}"`)}
      ${button("Перемешать", "shuffle", "secondary")}
    </div>
    <p class="muted deck-progress">Знаю ${known} из ${lesson.cards.length}</p>
    ${progress(known, lesson.cards.length, "Выученные карточки")}`;
    return heading("02 / Карточки", "Слова и фразы", "Назови перевод, затем нажми на карточку. Отмечай «Знаю», когда можешь вспомнить ответ без подсказки.") + copy +
      (card ? `<button class="flashcard${flipped ? " is-flipped" : ""}" type="button" data-action="flip">
        <span class="card-kicker">${esc(card.tag)} · ${cardIndex + 1} / ${cards.length} · ${italianSide ? "IT" : "RU"}</span>
        <span class="card-term" lang="${italianSide ? "it" : "ru"}">${esc(italianSide ? card.it : card.ru)}</span>
        ${flipped && card.note ? `<span class="card-note">${esc(card.note)}</span>` : ""}
        <span class="card-hint">${flipped ? "Вернуть лицевую сторону" : "Нажми, чтобы увидеть ответ"} ↻</span>
      </button>
      <div class="card-actions">
        ${button("←", "prev-card", "secondary", 'aria-label="Предыдущая карточка"')}
        ${italianSide ? speaker(card.it) : ""}
        ${button("→", "next-card", "secondary", 'aria-label="Следующая карточка"')}
      </div>
      <div class="card-footer">
        ${button("Повторить", "mark-repeat", "secondary")}
        ${button("Знаю ✓", "mark-known", "primary")}
        <span class="muted">${saved.cards[card.id] === "known" ? "Уже в выученных" : saved.cards[card.id] === "repeat" ? "В списке на повторение" : "Новая карточка"}</span>
      </div>` : `<div class="panel-card"><h3>В этой подборке всё выучено</h3>
        ${button("Показать все карточки темы", "show-all-cards", "primary")}</div>`);
  }

  function renderDrills() {
    const all = lesson.drills.filter(item => item.section === section);
    const solved = all.filter(item => saved.drills[item.id]).length;
    const queue = all.filter(item => !saved.drills[item.id]);
    const active = round?.question || queue[0];
    return heading("03 / Практика", "Собираем фразы", "Начни с первой темы или открой ту, которую хочешь повторить. После каждого задания увидишь ответ и правило.") +
      `<div class="study-grid">
        <aside class="study-sidebar" aria-label="Темы практики"><div class="section-list">${sections.map((name, i) => {
          const list = lesson.drills.filter(item => item.section === name);
          const done = list.filter(item => saved.drills[item.id]).length;
          return `<button class="section-button" type="button" data-action="pick-section" data-section="${esc(name)}" aria-pressed="${name === section}">
            <span class="step-num">${String(i + 1).padStart(2, "0")}</span><span>${esc(name)}</span><small>${done}/${list.length}</small>
          </button>`;
        }).join("")}</div></aside>
        <div class="study-content">
          ${progress(solved, all.length, "Решено в теме")}
          ${active ? questionCard(active, `${all.indexOf(active) + 1} / ${all.length}`) : `<div class="results">
            <p class="eyebrow">Тема пройдена</p><h3>${esc(section)}</h3>
            <p>Решено ${solved} из ${all.length}.</p>
            <div class="question-actions">
              ${sections.indexOf(section) < sections.length - 1 ? button("Следующая тема →", "next-section", "primary") : button("К итоговому тесту →", "to-exam", "primary")}
              ${button("Пройти тему заново", "reset-section")}
            </div>
          </div>`}
        </div>
      </div>`;
  }

  function renderExam() {
    const { index, correct } = saved.exam;
    const active = round?.question || lesson.exam[index];
    const copy = heading("04 / Тест", "Проверка без конспекта", "Результат зависит от первой попытки в каждом задании. После ответа появится объяснение.");
    if (active) {
      const n = lesson.exam.indexOf(active);
      return copy + `<p class="muted deck-progress">Верно ${correct} · Проверено ${index} из ${lesson.exam.length}</p>` +
        progress(index, lesson.exam.length, "Прогресс теста") + questionCard(active, `${n + 1} / ${lesson.exam.length}`);
    }
    return copy + `<div class="results">
      <p class="eyebrow">Тест завершён</p><h3>${correct} из ${lesson.exam.length}</h3>
      <p>${correct === lesson.exam.length ? "Все ответы верны." : "Открой ошибки, чтобы отработать задания, где ты споткнулся."}</p>
      <div class="question-actions">${button("К работе над ошибками", "to-errors", "primary")}
        ${button("Пройти тест заново", "reset-exam")}</div>
    </div>`;
  }

  function renderErrors() {
    const ids = errors();
    const copy = heading("05 / Ошибки", "Повторяем трудное", "Сюда попадают задания с ошибками из практики и теста. Когда ответишь верно, задание уйдёт из списка.");
    if (retry) {
      const active = round?.question || questions.get(retry.ids[retry.index]);
      return copy + (active ? progress(retry.index, retry.ids.length, "Прогресс повторения") +
        questionCard(active, `${retry.index + 1} / ${retry.ids.length}`) :
        `<div class="results"><h3>Круг повторения завершён</h3><p>Осталось в списке: ${ids.length}.</p>
          ${button("К списку ошибок", "stop-retry", "primary")}</div>`);
    }
    return copy + `<div class="results">
      <p class="eyebrow">На повторение</p><h3>${ids.length ? `Заданий в списке: ${ids.length}` : "Пока всё чисто"}</h3>
      <div class="question-actions">
        ${ids.length ? button("Повторить ошибки →", "start-retry", "primary") : button("Открыть практику →", "to-drills", "primary")}
        ${button("Скопировать отчёт для чата", "copy-report")}
      </div>
    </div>
    ${ids.length ? `<ul class="error-list">${ids.map(id => `<li><span>${esc(questions.get(id).prompt)}</span>
      <small>Твой ответ: ${esc(saved.errors[id])}</small></li>`).join("")}</ul>` : ""}`;
  }

  function questionCard(question, count) {
    if (round?.question !== question) {
      round = { question, options: shuffled(question.options || []), tiles: shuffled(question.tiles || []),
        selected: null, built: [], typed: "", feedback: null };
    }
    const { type, prompt } = question;
    const instructions = { choice: "Выбери ответ", build: "Собери фразу из слов", write: "Введи ответ" };
    const feedback = round.feedback;
    let body;
    if (type === "choice") {
      body = `<div class="option-grid">${round.options.map((option, index) => button(esc(option), "option", "option",
        `data-index="${index}" aria-pressed="${round.selected === index}" ${feedback ? "disabled" : ""}`)).join("")}</div>`;
    } else if (type === "build") {
      body = `<div class="phrase-builder" aria-label="Собранная фраза">${round.built.length ? round.built.map(index =>
        button(esc(round.tiles[index]), "remove-tile", "tile", `data-index="${index}" lang="it" ${feedback ? "disabled" : ""}`)).join("") :
        '<span class="muted">Слова появятся здесь</span>'}</div>
      <div class="word-bank" aria-label="Слова на выбор">${round.tiles.map((tile, index) =>
        button(esc(tile), "tile", "tile", `data-index="${index}" lang="it" ${feedback || round.built.includes(index) ? "disabled" : ""}`)).join("")}</div>`;
    } else {
      body = `<label for="answer" class="answer-label">Твой ответ</label>
        <input id="answer" type="text" lang="it" name="answer" placeholder="Напиши по-итальянски" value="${esc(round.typed)}"
          autocomplete="off" autocorrect="off" autocapitalize="off" spellcheck="false" ${feedback ? "readonly" : ""}>
        <div class="accent-row" aria-label="Буквы и апостроф">${["à", "è", "é", "ì", "ò", "ù", "'"].map(character =>
          button(esc(character), "accent", "secondary", `data-char="${esc(character)}" aria-label="${character === "'" ? "Апостроф" : character}" ${feedback ? "disabled" : ""}`)).join("")}</div>`;
    }
    const canCheck = type === "choice" ? round.selected !== null : type === "build" ? round.built.length > 0 : round.typed.trim().length > 0;
    return `<section class="question-card">
      <p class="question-kicker">${instructions[type]} · ${count}</p>
      <h3 id="question-title" tabindex="-1">${esc(prompt)}</h3>
      <form class="answer-form" aria-labelledby="question-title">${body}
        ${feedback ? "" : `<div class="question-actions">
          <button id="check-answer" class="primary" type="submit" ${canCheck ? "" : "disabled"}>Проверить</button>
          ${button("Показать ответ", "reveal", "quiet-link")}
        </div>`}
      </form>
      ${feedback ? `<div class="feedback ${feedback.ok ? "good" : "retry"}" tabindex="-1" id="feedback">
        <strong>${feedback.ok ? "Верно!" : feedback.revealed ? "Разберём ответ" : feedback.spelling ? "Почти. Проверь написание" : "Есть ошибка"}</strong>
        ${feedback.ok || feedback.revealed ? "" : `<p>Твой ответ: <span>${esc(feedback.input)}</span></p>`}
        <p class="correct-answer">${feedback.ok ? "Ответ" : "Правильный ответ"} · <b lang="${/\p{Script=Cyrillic}/u.test(question.answer) ? "ru" : "it"}">${esc(question.answer)}</b></p>
        <p>${esc(question.explanation)}</p>
        <div class="question-actions">
          ${button(feedback.ok || tab !== "drills" ? "Дальше →" : "Попробовать ещё", "advance", "primary")}
          ${feedback.ok || tab !== "drills" ? "" : button("Пропустить →", "skip-drill", "quiet-link")}
        </div>
      </div>` : ""}
    </section>`;
  }

  function check(revealed = false) {
    if (!round || round.feedback) return;
    const { question, tiles, options, selected, built, typed } = round;
    const input = (question.type === "choice" ? options[selected] : question.type === "build" ? built.map(i => tiles[i]).join(" ") : typed)?.trim();
    if (!input && !revealed) return;
    const accepted = [question.answer, ...(question.alternatives || [])];
    const ok = !revealed && accepted.some(answer => normalize(answer) === normalize(input));
    const spelling = !ok && input && accepted.some(answer => loose(answer) === loose(input));
    round.feedback = { ok, input, spelling, revealed };

    if (ok) {
      delete saved.errors[question.id];
      if (tab === "drills" || tab === "errors" && lesson.drills.includes(question)) saved.drills[question.id] = true;
    } else {
      saved.errors[question.id] = revealed ? "Посмотрел ответ" : input;
    }

    if (tab === "exam") {
      saved.exam.index++;
      if (ok) saved.exam.correct++;
      if (saved.exam.index === lesson.exam.length) saved.best = Math.max(saved.best ?? 0, saved.exam.correct);
    }
    persist();
    render();
    focusQuestion("#feedback");
  }

  // Keep passed-over practice questions reachable after their first pass.
  const skipped = new Set();
  function advance(skip = false) {
    if (!round?.feedback) return;
    if (tab === "drills") {
      const active = round.question;
      const retrySame = !round.feedback.ok && !skip;
      if (skip) skipped.add(active.id);
      round = null;
      const available = lesson.drills.filter(item => item.section === section && !saved.drills[item.id]);
      const next = retrySame ? active : available.find(item => !skipped.has(item.id)) || available[0];
      if (next) {
        if (!retrySame && !available.some(item => !skipped.has(item.id))) skipped.clear();
        questionCard(next, "");
      }
    } else {
      if (tab === "errors") retry.index++;
      round = null;
    }
    render();
    focusQuestion();
  }

  function focusQuestion(selector = "#question-title") {
    const target = panel.querySelector(selector) || panel;
    target.focus({ preventScroll: true });
    target.scrollIntoView({ block: "nearest" });
  }

  function status(message) {
    const line = panel.querySelector("#app-status");
    line.hidden = false;
    line.textContent = message;
  }

  async function copyReport() {
    const lines = [
      `Primo passo · Итальянский · ${lessonName}`,
      `Карточки «Знаю»: ${lesson.cards.filter(item => saved.cards[item.id] === "known").length} из ${lesson.cards.length}`,
      ...sections.map(name => {
        const group = lesson.drills.filter(item => item.section === name);
        return `${name}: ${group.filter(item => saved.drills[item.id]).length} из ${group.length}`;
      }),
      saved.best === null ? "Итоговый тест пока не завершён." : `Лучший результат теста: ${saved.best} из ${lesson.exam.length}`,
      ...errors().map(id => `Нужно повторить: ${questions.get(id).prompt} | Мой ответ: ${saved.errors[id]}`),
    ];
    try {
      await navigator.clipboard.writeText(lines.join("\n"));
      status("Отчёт скопирован. Вставь его в чат.");
    } catch {
      const box = document.createElement("textarea");
      box.setAttribute("aria-label", "Отчёт о прохождении");
      box.readOnly = true;
      box.value = lines.join("\n");
      panel.append(box);
      box.focus();
      box.select();
      status("Отчёт выделен. Скопируй его вручную.");
    }
  }

  function speak(text) {
    if (!("speechSynthesis" in window)) {
      status("Озвучка недоступна в этом браузере.");
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = "it-IT";
    utterance.rate = 0.84;
    const voices = speechSynthesis.getVoices();
    const voice = voices.find(item => item.lang.toLowerCase().startsWith("it"));
    if (voices.length && !voice) {
      status("Для озвучки добавь итальянский голос в настройках устройства.");
      return;
    }
    if (voice) utterance.voice = voice;
    utterance.onerror = event => {
      if (!["interrupted", "canceled"].includes(event.error)) status("Итальянский голос недоступен на этом устройстве.");
    };
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  }

  function moveCard(delta) {
    const size = deck().length;
    if (size) cardIndex = (cardIndex + delta + size) % size;
    flipped = false;
    render();
    panel.querySelector(".flashcard")?.focus({ preventScroll: true });
  }

  function markCard(known) {
    const card = deck()[cardIndex];
    if (!card) return;
    saved.cards[card.id] = known ? "known" : "repeat";
    persist();
    moveCard(known && unknownOnly ? 0 : 1);
  }

  function chooseSection(next) {
    section = next;
    skipped.clear();
    round = null;
    render();
    if (window.matchMedia("(max-width: 760px)").matches) focusQuestion();
  }

  const actions = {
    "to-cards": () => navigate("cards"),
    "to-drills": () => navigate("drills"),
    "to-exam": () => navigate("exam"),
    "to-errors": () => navigate("errors"),
    "speak": element => speak(element.dataset.say),
    "flip": () => {
      flipped = !flipped;
      render();
      panel.querySelector(".flashcard").focus({ preventScroll: true });
    },
    "it-first": () => { reverse = false; flipped = false; render(); },
    "ru-first": () => { reverse = true; flipped = false; render(); },
    "filter-cards": () => { unknownOnly = !unknownOnly; cardIndex = 0; flipped = false; render(); },
    "show-all-cards": () => { unknownOnly = false; render(); },
    "shuffle": () => { order = shuffled(lesson.cards); cardIndex = 0; flipped = false; render(); },
    "prev-card": () => moveCard(-1),
    "next-card": () => moveCard(1),
    "mark-known": () => markCard(true),
    "mark-repeat": () => markCard(false),
    "pick-section": element => chooseSection(element.dataset.section),
    "next-section": () => chooseSection(sections[sections.indexOf(section) + 1]),
    "reset-section": () => {
      lesson.drills.filter(item => item.section === section).forEach(item => delete saved.drills[item.id]);
      persist();
      chooseSection(section);
    },
    "reset-exam": () => {
      saved.exam = { index: 0, correct: 0 };
      round = null;
      persist();
      render();
      focusQuestion();
    },
    "start-retry": () => { retry = { ids: errors(), index: 0 }; round = null; render(); focusQuestion(); },
    "stop-retry": () => { retry = null; round = null; render(); },
    "copy-report": copyReport,
    "option": element => {
      round.selected = Number(element.dataset.index);
      panel.querySelectorAll(".option").forEach(option => option.setAttribute("aria-pressed", String(option === element)));
      panel.querySelector("#check-answer").disabled = false;
    },
    "tile": element => {
      const index = Number(element.dataset.index);
      round.built.push(index);
      render();
      panel.querySelector(`[data-action="remove-tile"][data-index="${index}"]`).focus({ preventScroll: true });
    },
    "remove-tile": element => {
      const index = Number(element.dataset.index);
      round.built = round.built.filter(item => item !== index);
      render();
      panel.querySelector(`[data-action="tile"][data-index="${index}"]`).focus({ preventScroll: true });
    },
    "accent": element => {
      const input = panel.querySelector("#answer");
      input.setRangeText(element.dataset.char, input.selectionStart, input.selectionEnd, "end");
      round.typed = input.value;
      panel.querySelector("#check-answer").disabled = !input.value.trim();
      input.focus({ preventScroll: true });
    },
    "reveal": () => check(true),
    "advance": () => advance(),
    "skip-drill": () => advance(true),
  };

  document.addEventListener("click", event => {
    const element = event.target.closest("button");
    if (!element || element.disabled) return;
    const next = element.dataset.tab || element.dataset.jump;
    if (next) navigate(next);
    else actions[element.dataset.action]?.(element);
  });
  panel.addEventListener("input", event => {
    if (event.target.id !== "answer" || !round) return;
    round.typed = event.target.value;
    panel.querySelector("#check-answer").disabled = !round.typed.trim();
  });
  panel.addEventListener("change", event => {
    if (event.target.id !== "card-tag") return;
    cardTag = event.target.value;
    cardIndex = 0;
    flipped = false;
    render();
    panel.querySelector("#card-tag").focus({ preventScroll: true });
  });
  panel.addEventListener("submit", event => {
    if (!event.target.matches(".answer-form")) return;
    event.preventDefault();
    check();
  });
  render();
  if (tab !== "notes") panel.scrollIntoView({ block: "start" });
})();
