import { useState } from "react";

// This site has no backend, so anything we remember (tutorial progress,
// "Same here" clicks) is saved in the browser with localStorage. That means:
//   - it's per device and per browser (nobody else sees it)
//   - it's cleared if the person clears their browsing data
//   - private windows or strict privacy settings can block it, so every
//     read and write is wrapped in try/catch and the site works without it
const PREFIX = "slumber-squad:";

// session = true uses sessionStorage instead: kept while this tab is open,
// forgotten when it's closed (used for page filters, so Back returns you
// to the same filtered list)
function store(session) {
  return session ? window.sessionStorage : window.localStorage;
}

export function readStored(key, fallback, session = false) {
  try {
    const value = store(session).getItem(PREFIX + key);
    return value === null ? fallback : JSON.parse(value);
  } catch {
    return fallback;
  }
}

export function writeStored(key, value, session = false) {
  try {
    store(session).setItem(PREFIX + key, JSON.stringify(value));
  } catch {
    // Storage blocked or full: the value just isn't remembered next time
  }
}

// useState that's also saved to localStorage under `key`
export function useStoredState(key, fallback, { session = false } = {}) {
  const [value, setValue] = useState(() => readStored(key, fallback, session));

  function update(next) {
    setValue(next);
    writeStored(key, next, session);
  }

  return [value, update];
}

// Tutorial progress: the furthest step reached, and whether it was finished.
// Saved so the overview can say "Continue tutorial" (mockup note:
// "Preserve scroll position and tutorial progress").
export function getProgress(tutorialKey) {
  return readStored(`progress:${tutorialKey}`, { step: 0, done: false });
}

export function saveProgress(tutorialKey, { step, done }) {
  const current = getProgress(tutorialKey);
  writeStored(`progress:${tutorialKey}`, {
    step: Math.max(current.step, step ?? 0),
    done: current.done || Boolean(done),
  });
}

// "Start tutorial again": forget how far you got
export function resetProgress(tutorialKey) {
  writeStored(`progress:${tutorialKey}`, { step: 0, done: false });
}