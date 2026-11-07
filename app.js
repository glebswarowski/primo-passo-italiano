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
  if (current.description) document.querySelector("#lesson-description").textContent = current.description;
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
  const blank = { cards: {}, cardSession: null, drills: {}, errors: {}, exam: { index: 0, correct: 0 }, best: null };
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
  const cardsById = new Map(lesson.cards.map(card => [card.id, card]));
  if (saved.cardSession?.queue.some(id => !cardsById.has(id))) saved.cardSession = null;
  let showCardSetup = !saved.cardSession;
  let cardTag = saved.cardSession?.tag || "";
  let reverse = saved.cardSession?.reverse || false;
  let mixCards = saved.cardSession?.mix || false;
  let flipped = false;
  let drag = null;
  let leaving = null;
  let suppressCardClick = null;
  let audioPlayback = null;
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
  const speaker = key => `<span class="audio-control">
    ${button(`${icons.speaker} <span data-audio-label>Слушать</span>`, "speak", "secondary audio-button",
      `data-audio="${esc(key)}"`)}
    <span class="audio-feedback" role="status"></span>
  </span>`;
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
    stopAudio();
    drag = null;
    leaving = null;
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
          ${note.examples.map((example, j) => `<div class="example">
            <div><strong lang="it">${esc(example.it)}</strong><span>${esc(example.ru)}</span></div>
            ${example.it.includes("→") ? "" : speaker(`note-${i + 1}-${j + 1}`)}
          </div>`).join("")}
        </div>
      </details>`).join("")}</div>
      <div class="question-actions">${button("Открыть карточки →", "to-cards", "primary")}</div>`;
  }

  const cardDeck = () => lesson.cards.filter(card => !cardTag || card.tag === cardTag);

  function renderCardSetup(session) {
    const count = cardDeck().length;
    const inProgress = session && (session.index < session.queue.length || session.repeat.length);
    return `<div class="results card-setup">
      <h3>Настрой серию</h3>
      <p>Вспомни перевод и нажми на карточку, чтобы свериться. Смахни вправо, если вспомнил, или влево, чтобы повторить в следующем круге.</p>
      <div class="toolbar">
        <div class="segmented" aria-label="Направление перевода">
          ${button("IT → RU", "it-first", "secondary", `aria-pressed="${!reverse}"`)}
          ${button("RU → IT", "ru-first", "secondary", `aria-pressed="${reverse}"`)}
        </div>
        <label class="select-wrap">Тема
          <select id="card-tag"><option value="">Все темы</option>
            ${tags.map(tag => `<option ${tag === cardTag ? "selected" : ""}>${esc(tag)}</option>`).join("")}
          </select>
        </label>
        ${button("Перемешать", "shuffle", "secondary", `aria-pressed="${mixCards}"`)}
      </div>
      <div class="question-actions">
        ${button("Начать серию →", "start-cards", "primary")}
        ${inProgress ? button("Продолжить текущую", "resume-cards") : ""}
        <span class="muted">Карточек в подборке: ${count}</span>
      </div>
    </div>`;
  }

  function renderCards() {
    const session = saved.cardSession;
    const title = heading("02 / Карточки", "Слова и фразы", "С каждым кругом остаются только карточки, которые ещё хочется повторить.");
    if (showCardSetup || !session) return title + renderCardSetup(session);

    const { queue, index, repeat, number, total } = session;
    const known = total - (queue.length - index + repeat.length);
    const card = cardsById.get(queue[index]);
    if (!card) {
      const finished = repeat.length === 0;
      return title + `<div class="results card-round-end">
        <p class="eyebrow">${finished ? "Серия завершена" : `Круг ${number} завершён`}</p>
        <h3 tabindex="-1" data-card-focus>${finished ? "Вспомнил все карточки!" : "Пора повторить трудные"}</h3>
        <div class="round-score"><span>Знаю: <b>${known} из ${total}</b></span><span>На повторение: <b>${repeat.length}</b></span></div>
        <p>${finished ? "Можешь запустить новую серию или переходить к заданиям." : "В следующий круг попадут только карточки со свайпом влево или отметкой «Повторить»."}</p>
        <div class="question-actions">
          ${finished ? button("Новая серия", "new-cards", "primary") : button(`Начать круг ${number + 1} →`, "next-card-round", "primary")}
          ${finished ? button("К практике →", "to-drills") : button("Новая серия", "new-cards", "quiet-link")}
        </div>
      </div>`;
    }

    const italianSide = flipped === session.reverse;
    return title + `<div class="card-study">
      <div class="card-round-bar">
        <span class="card-round-label">Круг ${number}</span>
        <span class="card-round-count">Карточка ${index + 1} из ${queue.length}</span>
        ${progress(index, queue.length, "Прогресс текущего круга")}
      </div>
      <div class="swipe-stage">
        <button class="flashcard${flipped ? " is-flipped" : ""}" type="button" data-action="flip" aria-keyshortcuts="ArrowLeft ArrowRight">
          <span class="swipe-badge swipe-repeat" aria-hidden="true">Повторить</span>
          <span class="swipe-badge swipe-known" aria-hidden="true">Знаю</span>
          <span class="card-kicker">${esc(card.tag)} · ${italianSide ? "IT" : "RU"}</span>
          <span class="card-term" lang="${italianSide ? "it" : "ru"}">${esc(italianSide ? card.it : card.ru)}</span>
          ${flipped && card.note ? `<span class="card-note">${esc(card.note)}</span>` : ""}
          <span class="card-hint">${flipped ? "Вернуть лицевую сторону" : "Коснись, чтобы увидеть ответ"} ↻</span>
        </button>
      </div>
      <div class="card-grade">
        ${button("← Повторить", "mark-repeat", "card-grade-button grade-repeat")}
        ${button("Знаю →", "mark-known", "card-grade-button grade-known")}
      </div>
      <div class="card-session-foot">
        <span>Знаю <b>${known}/${total}</b> · В следующем круге <b>${repeat.length}</b></span>
        ${button("Новая серия", "new-cards", "quiet-link")}
      </div>
      ${italianSide || flipped ? `<div class="card-audio">${speaker(`card-${card.id}`)}</div>` : ""}
    </div>`;
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

  function stopAudio() {
    if (!audioPlayback) return;
    const { clip, label } = audioPlayback;
    audioPlayback = null;
    clip.onended = null;
    clip.onerror = null;
    clip.pause();
    clip.removeAttribute("src");
    clip.load();
    label.textContent = "Слушать";
  }

  async function speak(control) {
    const wasPlaying = audioPlayback?.control === control;
    stopAudio();
    if (wasPlaying) return;

    const label = control.querySelector("[data-audio-label]");
    const feedback = control.parentElement.querySelector(".audio-feedback");
    feedback.textContent = "";
    const clip = new Audio(`./audio/${current.id}/${control.dataset.audio}.mp3`);
    const playback = { clip, control, label };
    audioPlayback = playback;
    label.textContent = "Остановить";
    const finish = message => {
      if (audioPlayback !== playback) return;
      stopAudio();
      feedback.textContent = message;
    };
    const fail = () => finish("Звук не загрузился. Попробуй ещё раз.");
    clip.onended = () => finish("");
    clip.onerror = fail;
    try {
      await clip.play();
    } catch {
      fail();
    }
  }

  function renderCardState() {
    render();
    panel.querySelector(".flashcard, [data-card-focus], [data-action='start-cards']")?.focus({ preventScroll: true });
  }

  function startCards() {
    const ids = cardDeck().map(card => card.id);
    if (!ids.length) return;
    saved.cardSession = { queue: mixCards ? shuffled(ids) : ids, index: 0, repeat: [],
      number: 1, total: ids.length, reverse, tag: cardTag, mix: mixCards };
    showCardSetup = false;
    flipped = false;
    persist();
    renderCardState();
  }

  function nextCardRound() {
    const session = saved.cardSession;
    if (!session || session.index !== session.queue.length || !session.repeat.length) return;
    session.queue = session.repeat;
    session.repeat = [];
    session.index = 0;
    session.number++;
    flipped = false;
    persist();
    renderCardState();
  }

  function positionCard(element, delta) {
    element.style.setProperty("--swipe-x", `${delta}px`);
    element.style.setProperty("--swipe-angle", `${Math.max(-13, Math.min(13, delta / 13))}deg`);
    element.style.setProperty("--swipe-strength", Math.min(1, Math.abs(delta) / 90));
    element.classList.toggle("toward-repeat", delta < 0);
    element.classList.toggle("toward-known", delta > 0);
  }

  function markCard(known) {
    const session = saved.cardSession;
    const id = session?.queue[session.index];
    if (!id || showCardSetup || leaving) return;
    if (!known) session.repeat.push(id);
    saved.cards[id] = known ? "known" : "repeat";
    session.index++;
    flipped = false;
    persist();

    const element = panel.querySelector(".flashcard");
    if (!element || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      renderCardState();
      return;
    }
    leaving = element;
    element.classList.remove("is-dragging");
    element.classList.add("is-leaving");
    positionCard(element, (known ? 1 : -1) * (element.clientWidth + 25));
    setTimeout(() => {
      if (leaving === element) renderCardState();
    }, 170);
  }

  function endDrag(event, cancelled) {
    if (drag?.id !== event.pointerId) return;
    const { element, x, moved } = drag;
    drag = null;
    if (!moved) return;
    const delta = event.clientX - x;
    suppressCardClick = element;
    const threshold = Math.min(110, Math.max(56, element.clientWidth * 0.21));
    if (!cancelled && Math.abs(delta) >= threshold) {
      markCard(delta > 0);
      return;
    }
    element.classList.remove("is-dragging");
    positionCard(element, 0);
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
    "speak": speak,
    "flip": () => {
      if (leaving) return;
      flipped = !flipped;
      renderCardState();
    },
    "it-first": () => { reverse = false; render(); panel.querySelector("[data-action='it-first']").focus(); },
    "ru-first": () => { reverse = true; render(); panel.querySelector("[data-action='ru-first']").focus(); },
    "shuffle": () => { mixCards = !mixCards; render(); panel.querySelector("[data-action='shuffle']").focus(); },
    "new-cards": () => { showCardSetup = true; flipped = false; renderCardState(); },
    "start-cards": startCards,
    "resume-cards": () => { showCardSetup = false; renderCardState(); },
    "next-card-round": nextCardRound,
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
    if (suppressCardClick === element && event.detail !== 0) {
      suppressCardClick = null;
      return;
    }
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
    render();
    panel.querySelector("#card-tag").focus({ preventScroll: true });
  });
  panel.addEventListener("pointerdown", event => {
    const element = event.target.closest(".flashcard");
    if (!element || !event.isPrimary || event.button !== 0 || leaving) return;
    suppressCardClick = null;
    drag = { element, id: event.pointerId, x: event.clientX, y: event.clientY, moved: false };
  });
  panel.addEventListener("pointermove", event => {
    if (drag?.id !== event.pointerId) return;
    const { element, x, y } = drag;
    const delta = event.clientX - x;
    if (!drag.moved) {
      const vertical = Math.abs(event.clientY - y);
      if (vertical > 12 && vertical > Math.abs(delta)) {
        suppressCardClick = element;
        drag = null;
        return;
      }
      if (Math.abs(delta) < 9 || Math.abs(delta) < vertical * 1.25) return;
      drag.moved = true;
      element.setPointerCapture(event.pointerId);
      element.classList.add("is-dragging");
    }
    positionCard(element, delta);
  });
  panel.addEventListener("pointerup", event => endDrag(event, false));
  panel.addEventListener("pointercancel", event => endDrag(event, true));
  panel.addEventListener("lostpointercapture", event => endDrag(event, true));
  panel.addEventListener("keydown", event => {
    if (!event.target.matches(".flashcard") || !["ArrowLeft", "ArrowRight"].includes(event.key)) return;
    event.preventDefault();
    if (!event.repeat) markCard(event.key === "ArrowRight");
  });
  panel.addEventListener("submit", event => {
    if (!event.target.matches(".answer-form")) return;
    event.preventDefault();
    check();
  });
  window.addEventListener("pagehide", stopAudio);
  render();
  if (tab !== "notes") panel.scrollIntoView({ block: "start" });
})();
