import { useId, useRef, useState } from "react";
import { searchHref } from "../lib/search.js";

// The task search box, used in the homepage hero and on the search page.
// Submitting goes to #search?q=..., which shows the results page.
//
// Accessibility:
// - role="search" makes it a search landmark (NVDA: D key / landmarks list)
// - the <label> is visually hidden but read by screen readers
// - `required`: searching with an empty box shows the browser's own
//   "Please fill out this field" message, which screen readers announce
// - the X button ("Clear search") only shows when there's text; it empties
//   the box and puts focus back in it. The browser's built-in X for
//   type="search" is hidden so there aren't two.

function SearchForm({
  initialQuery = "",
  label = "Describe what you're working on",
  placeholder = 'e.g. "I need to turn user interviews into a readout"',
  className = "",
}) {
  const [query, setQuery] = useState(initialQuery);
  const inputRef = useRef(null);
  const id = useId();

  function handleSubmit(event) {
    event.preventDefault(); // stop the browser from reloading the page
    const href = searchHref(query);
    if (window.location.hash === href) {
      // Same search again: no page change, so just re-announce the results
      document.querySelector("main h1")?.focus();
    } else {
      window.location.hash = href;
    }
  }

  function handleClear() {
    setQuery("");
    inputRef.current?.focus();
  }

  return (
    <form
      role="search"
      onSubmit={handleSubmit}
      className={`flex w-full items-center gap-2 rounded-full border-2 border-brand-line bg-white py-1 pr-1 pl-4 focus-within:border-brand focus-within:outline-2 focus-within:outline-offset-2 focus-within:outline-brand ${className}`}
    >
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="h-4 w-4 shrink-0 fill-none stroke-brand stroke-2"
      >
        <circle cx="11" cy="11" r="7" />
        <path d="m20 20-4-4" strokeLinecap="round" />
      </svg>
      <label htmlFor={id} className="sr-only">
        {label}
      </label>
      <input
        ref={inputRef}
        id={id}
        type="search"
        required
        value={query}
        onChange={(event) => setQuery(event.target.value)}
        placeholder={placeholder}
        className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ink-muted [&::-webkit-search-cancel-button]:appearance-none"
      />
      {query && (
        <button
          type="button"
          onClick={handleClear}
          className="inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-ink stroke-2"
          >
            <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
          </svg>
          <span className="sr-only">Clear search</span>
        </button>
      )}
      <button
        type="submit"
        className="shrink-0 rounded-full bg-brand px-4 py-2 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand sm:px-5 sm:text-base"
      >
        Search
      </button>
    </form>
  );
}

export default SearchForm;
