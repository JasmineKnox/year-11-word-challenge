(function(root){
  'use strict';
  const bank = {
  "2": [
    {
      "word": "Nuanced",
      "partOfSpeech": "adjective",
      "definition": "Recognising subtle differences and complexity.",
      "sentence": "A ______ explanation of the issue recognises that the answer changes with the circumstances."
    },
    {
      "word": "Ambiguous",
      "partOfSpeech": "adjective",
      "definition": "Open to more than one interpretation.",
      "sentence": "The instruction was ______: it could be understood in two different ways."
    },
    {
      "word": "Implicit",
      "partOfSpeech": "adjective",
      "definition": "Suggested without being directly stated.",
      "sentence": "The film’s message is ______: it is suggested through images rather than stated directly."
    },
    {
      "word": "Explicit",
      "partOfSpeech": "adjective",
      "definition": "Stated clearly and directly.",
      "sentence": "The safety advice is ______: it states exactly what everyone must do."
    },
    {
      "word": "Tentative",
      "partOfSpeech": "adjective",
      "definition": "Provisional; not yet certain or settled.",
      "sentence": "Our conclusion is ______ and may change when the remaining evidence arrives."
    }
  ],
  "3": [
    {
      "word": "Credible",
      "partOfSpeech": "adjective",
      "definition": "Believable and worthy of trust.",
      "sentence": "We chose a ______ source: an expert whose information we could verify."
    },
    {
      "word": "Plausible",
      "partOfSpeech": "adjective",
      "definition": "Seeming reasonable or possible.",
      "sentence": "The explanation is ______: it could reasonably be true, although it has not been proved."
    },
    {
      "word": "Compelling",
      "partOfSpeech": "adjective",
      "definition": "Strong enough to persuade or hold attention.",
      "sentence": "Her speech was ______: it held our attention and persuaded us to support her proposal."
    },
    {
      "word": "Coherent",
      "partOfSpeech": "adjective",
      "definition": "Clear, logical and connected.",
      "sentence": "His explanation follows a ______ sequence, with each idea connected logically to the next."
    },
    {
      "word": "Substantiate",
      "partOfSpeech": "verb",
      "definition": "Support a claim with evidence.",
      "sentence": "You need evidence to ______ your claim that the new policy has improved attendance."
    }
  ],
  "4": [
    {
      "word": "Reinforce",
      "partOfSpeech": "verb",
      "definition": "Strengthen an idea, belief or behaviour.",
      "sentence": "Extra practice can ______ skills that students have already begun to develop."
    },
    {
      "word": "Undermine",
      "partOfSpeech": "verb",
      "definition": "Weaken someone or something.",
      "sentence": "The discovery that several statistics were invented could ______ confidence in the report."
    },
    {
      "word": "Perpetuate",
      "partOfSpeech": "verb",
      "definition": "Cause something to continue.",
      "sentence": "Repeating the same harmful stereotype can ______ it, keeping it alive for another generation."
    },
    {
      "word": "Legitimise",
      "partOfSpeech": "verb",
      "definition": "Make something seem acceptable, justified or valid.",
      "sentence": "The official endorsement seemed to ______ the practice, making it appear acceptable."
    },
    {
      "word": "Marginalise",
      "partOfSpeech": "verb",
      "definition": "Push people or ideas aside, reducing their influence.",
      "sentence": "Ignoring their views can ______ young people, pushing them out of the decision-making process."
    }
  ],
  "5": [
    {
      "word": "Pervasive",
      "partOfSpeech": "adjective",
      "definition": "Present throughout many parts of something.",
      "sentence": "The influence of advertising is ______: it reaches almost every part of our online lives."
    },
    {
      "word": "Exacerbate",
      "partOfSpeech": "verb",
      "definition": "Make a problem worse.",
      "sentence": "Adding more rumours could ______ the conflict, making an already serious problem worse."
    },
    {
      "word": "Mitigate",
      "partOfSpeech": "verb",
      "definition": "Reduce the harm or seriousness of something.",
      "sentence": "Providing shade can ______ the effects of extreme heat by reducing some of the harm."
    },
    {
      "word": "Disparity",
      "partOfSpeech": "noun",
      "definition": "A noticeable difference, often involving inequality.",
      "sentence": "There is a clear ______ between the funding available to the two schools."
    },
    {
      "word": "Disproportionate",
      "partOfSpeech": "adjective",
      "definition": "Too large or small in relation to something else.",
      "sentence": "A month-long suspension for a minor first offence would be ______ to the mistake."
    }
  ],
  "6": [
    {
      "word": "Autonomy",
      "partOfSpeech": "noun",
      "definition": "The ability to make your own decisions.",
      "sentence": "Choosing their own project gives students greater ______ over their learning."
    },
    {
      "word": "Integrity",
      "partOfSpeech": "noun",
      "definition": "Honesty and commitment to your principles.",
      "sentence": "She showed ______ by telling the truth even when dishonesty would have benefited her."
    },
    {
      "word": "Accountability",
      "partOfSpeech": "noun",
      "definition": "Responsibility for actions and a duty to explain them.",
      "sentence": "The requirement to explain their decisions increases the leaders’ ______ to the community."
    },
    {
      "word": "Ambivalent",
      "partOfSpeech": "adjective",
      "definition": "Having mixed or conflicting feelings.",
      "sentence": "He felt ______ about the move: he wanted the opportunity but dreaded leaving his friends."
    },
    {
      "word": "Complacent",
      "partOfSpeech": "adjective",
      "definition": "Too satisfied to notice problems or take action.",
      "sentence": "The team became ______ after repeated victories and stopped noticing weaknesses in its defence."
    }
  ],
  "7": [
    {
      "word": "Contentious",
      "partOfSpeech": "adjective",
      "definition": "Likely to cause disagreement or argument.",
      "sentence": "The policy was ______, provoking heated disagreement across the community."
    },
    {
      "word": "Concession",
      "partOfSpeech": "noun",
      "definition": "An acknowledgement that an opposing point has merit.",
      "sentence": "Her admission that the opposing side had one valid point was a useful ______ in the debate."
    },
    {
      "word": "Reconcile",
      "partOfSpeech": "verb",
      "definition": "Bring conflicting ideas or positions into agreement.",
      "sentence": "We need to ______ the two conflicting plans by finding an approach both sides can accept."
    },
    {
      "word": "Refute",
      "partOfSpeech": "verb",
      "definition": "Show that a claim or argument is wrong.",
      "sentence": "The new findings ______ the claim that the treatment helped every participant."
    },
    {
      "word": "Scrutinise",
      "partOfSpeech": "verb",
      "definition": "Examine closely and carefully.",
      "sentence": "Before accepting the figures, we should ______ them closely for errors."
    }
  ],
  "8": [
    {
      "word": "Subjective",
      "partOfSpeech": "adjective",
      "definition": "Influenced by personal feelings, experiences or opinions.",
      "sentence": "Our opinions about the most enjoyable film are ______ because they depend on personal taste."
    },
    {
      "word": "Arbitrary",
      "partOfSpeech": "adjective",
      "definition": "Chosen without a clear, consistent reason.",
      "sentence": "The order was ______: names were selected by a coin toss, with no reason to prefer one over another."
    },
    {
      "word": "Pragmatic",
      "partOfSpeech": "adjective",
      "definition": "Focused on what is practical and workable.",
      "sentence": "The solution is ______ because it can be carried out with our existing time and resources."
    },
    {
      "word": "Inherent",
      "partOfSpeech": "adjective",
      "definition": "Existing as a basic part or characteristic of something.",
      "sentence": "Some uncertainty is ______ in prediction; it is a basic part of trying to describe the future."
    },
    {
      "word": "Salient",
      "partOfSpeech": "adjective",
      "definition": "Particularly noticeable or relevant.",
      "sentence": "The most ______ detail stood out immediately and directly affected our judgement."
    }
  ],
  "9": [
    {
      "word": "Discern",
      "partOfSpeech": "verb",
      "definition": "Recognise something that is not immediately obvious.",
      "sentence": "Careful readers can ______ the difference between a supported claim and an unsupported guess."
    },
    {
      "word": "Ostensibly",
      "partOfSpeech": "adverb",
      "definition": "Apparently or as claimed, though this may be doubtful.",
      "sentence": "The scheme was ______ intended to help customers, although its real purpose seemed to be increasing sales."
    },
    {
      "word": "Implication",
      "partOfSpeech": "noun",
      "definition": "A possible consequence, or an indirectly suggested meaning.",
      "sentence": "One possible ______ of closing the library is that students lose a quiet place to study."
    },
    {
      "word": "Adversity",
      "partOfSpeech": "noun",
      "definition": "Difficult or unfavourable circumstances.",
      "sentence": "Despite considerable ______, including illness and financial hardship, she continued working towards her goal."
    },
    {
      "word": "Resilience",
      "partOfSpeech": "noun",
      "definition": "The ability to adapt or recover after difficulty.",
      "sentence": "He showed ______ by adapting to the setback, seeking support and trying again."
    }
  ]
};
  if(typeof module === 'object' && module.exports) module.exports = bank;
  else root.WORD_WEEKS = bank;
}(typeof globalThis !== 'undefined' ? globalThis : this));
