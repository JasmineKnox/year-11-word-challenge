(function (root, factory) {
  const api = factory();
  if (typeof module === 'object' && module.exports) module.exports = api;
  else root.WordGame = api;
}(typeof globalThis !== 'undefined' ? globalThis : this, function () {
  'use strict';
  const roundNames = ['Definition match', 'Sentence choice', 'Spelling'];
  const normalise = value => String(value).trim().toLowerCase();
  function shuffle(items, random = Math.random) {
    const result = [...items];
    for (let i = result.length - 1; i > 0; i--) {
      const j = Math.floor(random() * (i + 1));
      [result[i], result[j]] = [result[j], result[i]];
    }
    return result;
  }
  function wordsThroughWeek(bank, week) {
    const selectedWeek = Number(week);
    if (!Number.isInteger(selectedWeek) || selectedWeek < 2 || selectedWeek > 9) throw new Error('Choose a week from 2 to 9.');
    const words = [];
    for (let currentWeek = 2; currentWeek <= selectedWeek; currentWeek++) {
      if (!bank[currentWeek] || bank[currentWeek].length !== 5) throw new Error('Each included week needs five words.');
      words.push(...bank[currentWeek]);
    }
    return words;
  }
  function createSession(bank, week, random = Math.random) {
    const selectedWeek = Number(week);
    const words = wordsThroughWeek(bank, selectedWeek);
    const questions = [];
    for (let round = 0; round < 3; round++) {
      shuffle(words, random).forEach((entry, position) => {
        const distractors = shuffle(words.filter(w => w.word !== entry.word), random).slice(0, 4).map(w => w.word);
        questions.push({ ...entry, round, position, options: round < 2 ? shuffle([entry.word, ...distractors], random) : [] });
      });
    }
    let index = 0;
    let checked = false;
    const answers = [];
    return {
      week: selectedWeek,
      wordCount: words.length,
      total: questions.length,
      get index() { return index; },
      get checked() { return checked; },
      get completed() { return index === questions.length; },
      get score() { return answers.filter(a => a.correct).length; },
      get current() { return questions[index]; },
      submit(value) {
        if (index === questions.length) throw new Error('This challenge is complete.');
        if (checked) throw new Error('This answer has already been checked.');
        if (!normalise(value)) throw new Error('Enter an answer first.');
        const question = questions[index];
        if (question.round < 2 && !question.options.some(w => normalise(w) === normalise(value))) throw new Error('Choose one of the listed words.');
        const answer = { ...question, submitted: String(value).trim(), correct: normalise(value) === normalise(question.word) };
        answers.push(answer);
        checked = true;
        return answer;
      },
      next() {
        if (!checked) throw new Error('Check your answer before continuing.');
        index++;
        checked = false;
      },
      summary() {
        if (index !== questions.length) throw new Error('Finish all three rounds first.');
        return {
          week: selectedWeek,
          wordCount: words.length,
          total: questions.length,
          score: answers.filter(a => a.correct).length,
          rounds: roundNames.map((name, round) => ({ name, score: answers.filter(a => a.round === round && a.correct).length, total: words.length })),
          missed: answers.filter(a => !a.correct),
        };
      },
    };
  }
  return { createSession, wordsThroughWeek, normalise, shuffle, roundNames };
}));
