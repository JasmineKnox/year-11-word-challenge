const test = require('node:test');
const assert = require('node:assert/strict');
const bank = require('../data.js');
const {createSession} = require('../game.js');

test('all eight weeks contain the agreed five words and usable prompts', () => {
  assert.deepEqual(Object.keys(bank), ['2','3','4','5','6','7','8','9']);
  const all = Object.values(bank).flat();
  assert.equal(all.length, 40);
  assert.equal(new Set(all.map(w => w.word)).size, 40);
  for (const words of Object.values(bank)) {
    assert.equal(words.length, 5);
    for (const item of words) {
      assert.equal((item.sentence.match(/______/g)||[]).length, 1);
      assert.ok(item.definition.length > 10);
      assert.ok(['adjective','adverb','noun','verb'].includes(item.partOfSpeech));
      assert.ok(!new RegExp(`\\b${item.word}\\b`, 'i').test(item.sentence), 'Sentence must not reveal '+item.word);
      assert.ok(!new RegExp(`\\b${item.word}\\b`, 'i').test(item.definition), 'Spelling clue must not reveal '+item.word);
    }
  }
});

for (const week of Object.keys(bank)) {
  test(`week ${week}: all words from weeks 2–${week} occur once per round`, () => {
    const session = createSession(bank, week);
    const expected = Object.entries(bank).filter(([w]) => Number(w) <= Number(week)).flatMap(([,words]) => words);
    const count = expected.length;
    assert.equal(count, (Number(week)-1)*5);
    assert.equal(session.wordCount, count);
    assert.equal(session.total, count*3);
    const seen = [[],[],[]];
    for (let i = 0; i < count*3; i++) {
      const q = session.current;
      assert.equal(q.round, Math.floor(i/count));
      assert.equal(q.position, i%count);
      seen[q.round].push(q.word);
      if (q.round < 2) {
        assert.equal(q.options.length,5);
        assert.equal(new Set(q.options).size,5);
        assert.ok(q.options.includes(q.word));
        q.options.forEach(word => assert.ok(expected.some(w => w.word===word), 'No future-week distractors'));
      }
      else assert.deepEqual(q.options, []);
      assert.equal(session.submit(` ${q.word.toUpperCase()} `).correct, true);
      session.next();
    }
    assert.equal(session.completed, true);
    assert.equal(session.current, undefined);
    const result = session.summary();
    assert.equal(result.score, count*3);
    assert.deepEqual(result.rounds.map(r => r.score), [count,count,count]);
    assert.deepEqual(result.rounds.map(r => r.total), [count,count,count]);
    assert.deepEqual(result.missed, []);
    seen.forEach(words => assert.deepEqual(words.sort(),expected.map(w => w.word).sort()));
  });
}

test('wrong answers remain wrong and cannot be changed or counted twice', () => {
  const session = createSession(bank, 2, () => 0.3);
  const q = session.current;
  const wrong = q.options.find(w => w !== q.word);
  const answer = session.submit(wrong);
  assert.equal(answer.correct, false);
  assert.equal(session.score, 0);
  assert.throws(() => session.submit(q.word), /already/);
  assert.equal(session.score, 0);
  session.next();
  while (!session.completed) { session.submit(session.current.word); session.next(); }
  const result = session.summary();
  assert.equal(result.score, 14);
  assert.equal(result.missed.length, 1);
  assert.equal(result.missed[0].submitted, wrong);
  assert.equal(result.missed[0].word, q.word);
});

test('empty answers, skipped questions and unknown weeks are rejected', () => {
  const session = createSession(bank, 2);
  assert.throws(() => createSession(bank, 10), /week/);
  assert.throws(() => session.next(), /Check/);
  assert.throws(() => session.summary(), /Finish/);
  assert.throws(() => session.submit('  '), /Enter/);
  assert.throws(() => session.submit('not an option'), /Choose/);
  assert.equal(session.index, 0);
  assert.equal(session.score, 0);
});

test('spelling requires exact letters and Australian spelling', () => {
  const session = createSession(bank, 4, () => 0.5);
  for (let i=0;i<session.wordCount*2;i++) { session.submit(session.current.word); session.next(); }
  const q = session.current;
  assert.equal(q.round, 2);
  assert.equal(session.submit(q.word+'x').correct, false);
  session.next();
  while (!session.completed) {
    const word=session.current.word;
    session.submit(word === 'Legitimise' ? 'Legitimize' : word === 'Marginalise' ? 'Marginalize' : word);
    session.next();
  }
  assert.ok(session.summary().score < session.total);
});

test('replaying creates a fresh score and independent question order', () => {
  const first = createSession(bank, 2, () => 0);
  first.submit(first.current.word);
  const replay = createSession(bank, 2, () => 0.99);
  assert.equal(replay.score, 0);
  assert.equal(replay.index, 0);
  assert.equal(replay.checked, false);
  assert.notEqual(first.current.word, replay.current.word);
});
