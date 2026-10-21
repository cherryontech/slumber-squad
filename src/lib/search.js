import { ALL_TASKS, POPULAR_TASKS } from "../data/workAreas.js";

// Link to the search page for a query: "#search?q=user%20interviews"
export function searchHref(query) {
  return `#search?q=${encodeURIComponent(query.trim())}`;
}

// Simple keyword search over every task, run in the browser (no backend).
// A task matches when a word from the search appears in its title, stage,
// work area, or tools. Title matches count most, so the best result is the
// task whose title shares the most words with the search.
//
// Words are compared by their stem, so "interviews" finds "interview" and
// "summary" finds "summarize". Filler words ("I need to...") are ignored.

const STOP_WORDS = new Set(
  "a an and are be can do does for from help how i in into is it me my need of on or our some that the this to want we what with you your".split(
    " "
  )
);

// Longest endings first, so "summarizes" -> "summar", not "summarize"
const ENDINGS = [
  "ations",
  "ation",
  "izing",
  "izes",
  "ized",
  "ize",
  "ing",
  "ies",
  "es",
  "ed",
  "s",
  "y",
];

function stem(word) {
  for (const ending of ENDINGS) {
    if (word.endsWith(ending) && word.length - ending.length >= 3) {
      return word.slice(0, -ending.length);
    }
  }
  return word;
}

function words(text) {
  return (
    text
      .toLowerCase()
      .replace(/\ba\/b\b/g, "ab") // keep "A/B" as one word
      .match(/[a-z0-9]+/g) ?? []
  );
}

// "debug" and "debugg(ing)" match; very short stems must match exactly
function stemsMatch(a, b, minPrefix = 4) {
  if (a === b) return true;
  const shorter = a.length < b.length ? a : b;
  const longer = a.length < b.length ? b : a;
  return shorter.length >= minPrefix && longer.startsWith(shorter);
}

// Search words, minus filler, each with its stem: [{ word, stem }]
export function searchTerms(query) {
  const seen = new Set();
  return (
    words(query)
      .filter((word) => !STOP_WORDS.has(word))
      // `word` is what the page shows in "matched on ..."; "A-B" (not "A/B")
      // so NVDA reads the letters instead of "uh slash B"
      .map((word) => ({ word: word === "ab" ? "A-B" : word, stem: stem(word) }))
      .filter(({ stem }) => !seen.has(stem) && seen.add(stem))
  );
}

const FIELDS = [
  { weight: 3, text: (task) => task.title },
  { weight: 1, text: (task) => task.stage },
  { weight: 1, text: (task) => task.area.name },
  { weight: 1, text: (task) => (task.tools ?? []).join(" ") },
];

// Pre-split every task's fields once
const INDEX = ALL_TASKS.map((task) => ({
  task,
  fields: FIELDS.map((field) => ({
    weight: field.weight,
    stems: words(field.text(task)).map(stem),
  })),
}));

function score(terms, minPrefix) {
  return INDEX.map(({ task, fields }) => {
    let total = 0;
    const matched = new Set();
    for (const term of terms) {
      const best = Math.max(
        0,
        ...fields
          .filter((field) =>
            field.stems.some((s) => stemsMatch(term.stem, s, minPrefix))
          )
          .map((field) => field.weight)
      );
      if (best > 0) {
        total += best;
        matched.add(term.word);
      }
    }
    return { task, score: total, matched };
  })
    .filter((result) => result.score > 0)
    .sort((a, b) => b.score - a.score); // stable: ties keep "popular" order
}

// Returns { terms, results, matchedWords } for the search page.
export function searchTasks(query) {
  const terms = searchTerms(query);
  const results = score(terms, 4);
  const matchedWords = terms
    .map((term) => term.word)
    .filter((word) => results.some((result) => result.matched.has(word)));
  return { terms, results, matchedWords };
}

// For "No exact matches": loosely related tasks (3-letter stems count),
// falling back to the homepage's popular tasks.
export function closestTasks(query, count = 3) {
  const loose = score(searchTerms(query), 3).map((result) => result.task);
  const popular = POPULAR_TASKS.map(({ href }) =>
    ALL_TASKS.find((task) => task.href === href)
  ).filter(Boolean);
  return [...new Set([...loose, ...popular])].slice(0, count);
}
