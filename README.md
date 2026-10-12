# Year 11 Word Challenge

Tier 2 vocabulary practice for Year 11. Plain working prototype for the Weeks 2–9 word-of-the-day programme.

## Play

Open `index.html` in a modern browser, or visit the GitHub Pages address after publishing. No installation or build is needed.

Choose the students’ current week. The game tests all five current-week words in each of three rounds, with five earlier words added to each round from Week 3 onwards:

1. Match a definition to one of the five words.
2. Choose the word that completes a new sentence.
3. Type the word from its meaning, without a word bank.

Each current-week word appears once per round. The revision words are selected when a new game starts. Question order and word choices are shuffled. The first two rounds offer five choices per question, drawn from that round’s selected words. Each correct first answer earns one point. Feedback appears after each answer. The results show scores by round and missed answers for review.

| Selected week | Words tested in each round | Questions per round | Total questions / maximum score |
|---|---|---:|---:|
| 2 | All 5 Week 2 words | 5 | 15 |
| 3 | All 5 Week 3 words + all 5 Week 2 words | 10 | 30 |
| 4 | All 5 Week 4 words + 5 words from Weeks 2–3 | 10 | 30 |
| 5–9 | All 5 current-week words + 5 earlier words | 10 | 30 |

Week 4 balances its revision across Weeks 2 and 3: round 1 has three Week 2 words and two Week 3 words; round 2 uses the remaining two Week 2 and three Week 3 words; round 3 selects two Week 2 and three Week 3 words again. Thus all ten earlier words are covered in the first two rounds, with some necessary reuse in round 3. No word appears twice within a round.

From Week 5, fifteen different earlier words are selected, with five assigned to each round. No revision word repeats across rounds. The five current-week words still appear in every round. Revision selections are shuffled again on replay.

The home screen shows the question count before students start. Week 2 has 15 questions; Weeks 3–9 have 30.

Spelling answers ignore capitalisation and spaces at the beginning or end. The letters must be correct; Australian spelling is used. Browser spelling assistance is disabled where supported. Devices and third-party keyboards may still offer suggestions.

Students can play the same week again or choose another week. Results are not saved or sent anywhere. This prototype does not collect names or provide a teacher dashboard.

## Publish with GitHub Pages

1. In the repository’s **Settings → Pages**, choose **Deploy from a branch**.
2. Select **main** and **/(root)**, then save.
3. When GitHub shows the published address, use that address in Schoolbox.

The game files are in the repository root. Keep `index.html`, `styles.css`, `data.js`, `game.js` and `app.js` together. The `tests` folder and this README can stay in the repository.

Publishing reference: [GitHub’s official guide to configuring a Pages publishing source](https://docs.github.com/en/pages/getting-started-with-github-pages/configuring-a-publishing-source-for-your-github-pages-site).

## Edit the words

`data.js` contains all eight weeks. Each entry has a word, word class, definition and sentence. Keep five entries per week and one `______` gap in each sentence. The correct answer must be the exact word in the entry, without changing its grammatical form.

`game.js` handles questions, checking and scoring. `app.js` handles the screens. `styles.css` is deliberately simple so the game can be reviewed before visual styling is added.

## Check the game logic

With Node.js installed, run:

```sh
node --test tests/*.test.cjs
```

## Scope of this prototype

The content, round sequence, scoring and screen interactions have automated checks. A full browser preview was unavailable in the build environment. Test the downloaded `index.html` on the devices your students will use before the classroom launch.
