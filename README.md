# Year 11 Word Challenge

Tier 2 vocabulary practice for Year 11. Plain working prototype for the Weeks 2–9 word-of-the-day programme.

## Play

Open `index.html` in a modern browser, or visit the GitHub Pages address after publishing. No installation or build is needed.

Choose the week students have reached. The game includes every word from Week 2 through the selected week, in three rounds:

1. Match a definition to one of the five words.
2. Choose the word that completes a new sentence.
3. Type the word from its meaning, without a word bank.

Each included word appears once per round. Question order and word choices are shuffled. The first two rounds offer five choices per question, drawn from the included words. Each correct first answer earns one point. Feedback appears after each answer. The results show scores by round and missed answers for review.

| Selected week | Words included | Words / questions per round | Total questions / maximum score |
|---|---|---:|---:|
| 2 | Week 2 | 5 | 15 |
| 3 | Weeks 2–3 | 10 | 30 |
| 4 | Weeks 2–4 | 15 | 45 |
| 5 | Weeks 2–5 | 20 | 60 |
| 6 | Weeks 2–6 | 25 | 75 |
| 7 | Weeks 2–7 | 30 | 90 |
| 8 | Weeks 2–8 | 35 | 105 |
| 9 | Weeks 2–9 | 40 | 120 |

The home screen shows the question count before students start. Later weeks are longer cumulative revision sessions.

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
