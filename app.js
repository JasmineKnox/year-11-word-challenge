(function () {
  'use strict';
  const $ = id => document.getElementById(id);
  let session;
  const directions = [
    'Choose the word that matches this definition.',
    'Choose the word that best completes this sentence.',
    'Read the meaning and type the word from memory. Use Australian spelling.',
  ];
  function element(tag, text, className) {
    const node = document.createElement(tag);
    if (text !== undefined) node.textContent = text;
    if (className) node.className = className;
    return node;
  }
  function show(view) {
    ['home', 'play', 'results'].forEach(id => { $(id).hidden = id !== view; });
  }
  function start() {
    session = WordGame.createSession(WORD_WEEKS, $('week-select').value);
    show('play');
    renderQuestion();
  }
  function updateWeekSummary() {
    const week = Number($('week-select').value);
    const count = WordGame.wordsThroughWeek(WORD_WEEKS, week).length;
    const range = week === 2 ? 'Week 2' : `Weeks 2–${week}`;
    $('week-summary').textContent = `${range}: ${count} words · ${count} questions per round · ${count * 3} questions in total.`;
  }
  function renderQuestion() {
    const question = session.current;
    $('progress').textContent = `Week ${session.week} · Score ${session.score} / ${session.total}`;
    $('round-title').textContent = `Round ${question.round + 1}: ${WordGame.roundNames[question.round]}`;
    $('instructions').textContent = directions[question.round];
    $('question-count').textContent = `Question ${question.position + 1} of ${session.wordCount} · Overall ${session.index + 1} of ${session.total}`;
    $('prompt').textContent = question.round === 1 ? question.sentence : question.definition;
    $('choices').replaceChildren();
    $('choices').hidden = question.round === 2;
    $('spelling-box').hidden = question.round !== 2;
    $('word-class').hidden = question.round !== 2;
    $('word-class').textContent = `Word class: ${question.partOfSpeech}`;
    $('spelling').value = '';
    $('spelling').disabled = false;
    $('check').disabled = true;
    $('feedback').hidden = true;
    $('feedback').replaceChildren();
    $('next').hidden = true;
    if (question.round < 2) {
      question.options.forEach((word, i) => {
        const label = element('label', undefined, 'choice');
        const input = element('input');
        input.type = 'radio'; input.name = 'word'; input.value = word;
        input.id = `choice-${i}`;
        input.addEventListener('change', () => { $('check').disabled = false; });
        label.append(input, element('span', word));
        $('choices').append(label);
      });
      $('round-title').focus();
    } else $('spelling').focus();
  }
  function submit(event) {
    event.preventDefault();
    if (!session || session.checked || session.completed) return;
    const question = session.current;
    const selected = document.querySelector('input[name="word"]:checked');
    const value = question.round === 2 ? $('spelling').value : selected?.value;
    if (!value || !value.trim()) return;
    const answer = session.submit(value);
    $('check').disabled = true;
    $('spelling').disabled = true;
    document.querySelectorAll('input[name="word"]').forEach(input => { input.disabled = true; });
    const heading = element('p');
    heading.append(element('strong', answer.correct ? 'Correct.' : 'Not quite.'));
    $('feedback').append(heading);
    if (!answer.correct) $('feedback').append(element('p', `Your answer: ${answer.submitted}`));
    $('feedback').append(element('p', `The word is ${answer.word.toLowerCase()}. ${answer.definition}`));
    if (question.round === 1) $('feedback').append(element('p', answer.sentence.replace('______', answer.word.toLowerCase())));
    $('feedback').hidden = false;
    $('progress').textContent = `Week ${session.week} · Score ${session.score} / ${session.total}`;
    $('next').textContent = session.index === session.total - 1 ? 'See results' : question.position === session.wordCount - 1 ? `Start round ${question.round + 2}` : 'Next question';
    $('next').hidden = false;
    $('next').focus();
  }
  function next() {
    if (!session || !session.checked) return;
    session.next();
    if (session.completed) renderResults();
    else renderQuestion();
  }
  function renderResults() {
    const result = session.summary();
    show('results');
    $('total-score').textContent = `Week ${result.week}: ${result.score} / ${result.total} (${Math.round(result.score / result.total * 100)}%)`;
    $('round-scores').replaceChildren();
    result.rounds.forEach(round => {
      const row = element('tr');
      row.append(element('td', round.name), element('td', `${round.score} / ${round.total}`));
      $('round-scores').append(row);
    });
    $('review').replaceChildren();
    if (!result.missed.length) $('review').append(element('p', `You matched, used and spelled all ${result.wordCount} words correctly.`));
    else {
      $('review').append(element('h3', 'Review your missed answers'));
      result.missed.forEach(answer => {
        const item = element('div', undefined, 'review-item');
        const heading = element('p');
        heading.append(element('strong', answer.word), document.createTextNode(` · ${WordGame.roundNames[answer.round]}`));
        item.append(heading, element('p', `Your answer: ${answer.submitted}`), element('p', answer.definition));
        if (answer.round === 1) item.append(element('p', answer.sentence.replace('______', answer.word.toLowerCase())));
        $('review').append(item);
      });
    }
    $('results-title').focus();
  }
  function home() { session = undefined; show('home'); $('week-select').focus(); }
  $('start').addEventListener('click', start);
  $('week-select').addEventListener('change', updateWeekSummary);
  $('answer-form').addEventListener('submit', submit);
  $('spelling').addEventListener('input', () => { $('check').disabled = !$('spelling').value.trim() || session.checked; });
  $('next').addEventListener('click', next);
  $('change-week').addEventListener('click', home);
  $('back-home').addEventListener('click', home);
  $('play-again').addEventListener('click', start);
  updateWeekSummary();
}());
