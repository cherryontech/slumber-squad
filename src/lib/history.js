// Back button + scroll memory for the hash router in App.jsx.
//
// Mockup note: "Go back: Return to the previous meaningful page, not merely
// browser history, when opened from a deep link. Preserve scroll position."
//
// How it works: every history entry the site creates gets a small label in
// history.state: { idx, key }.
//   idx  how many pages deep into this visit we are (0 = the first page).
//        If idx is 0, the page was opened from a link, bookmark or new tab,
//        so "Back" goes to the page's parent (e.g. Home) instead of leaving
//        the site.
//   key  identifies the entry, so we can remember its scroll position and
//        put you back in the same spot when you return with Back or the
//        browser's back/forward buttons.

let lastIdx = 0;
let started = false;
const scrollPositions = new Map();

function newKey() {
  return Math.random().toString(36).slice(2);
}

// Call once when the app starts
export function startHistory() {
  if (started) return; // React dev mode runs effects twice
  started = true;
  // We restore scroll ourselves; stop the browser from also trying
  if ("scrollRestoration" in window.history) {
    window.history.scrollRestoration = "manual";
  }
  const state = window.history.state;
  if (typeof state?.idx !== "number") {
    window.history.replaceState({ idx: 0, key: newKey() }, "");
  }
  lastIdx = window.history.state.idx;

  window.addEventListener(
    "scroll",
    () => scrollPositions.set(window.history.state?.key, window.scrollY),
    { passive: true }
  );
}

// Call on every "hashchange". Returns the scroll position to restore:
// the saved one when you came back to a page (back/forward), otherwise 0.
export function trackNavigation() {
  const state = window.history.state;
  if (typeof state?.idx === "number") {
    // An entry we labeled before = back or forward
    lastIdx = state.idx;
    return scrollPositions.get(state.key) ?? 0;
  }
  // A brand new entry (a link was followed): label it
  lastIdx += 1;
  window.history.replaceState({ idx: lastIdx, key: newKey() }, "");
  return 0;
}

// onClick for a "Back" link whose href is the fallback (parent) page.
// If there's an earlier page from this visit, go back to it (scroll position
// included); otherwise let the link take you to the fallback.
export function goBack(event) {
  if ((window.history.state?.idx ?? 0) > 0) {
    event.preventDefault();
    window.history.back();
  }
}
