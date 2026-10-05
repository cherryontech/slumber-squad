import { useState } from "react";
import ChipGroup from "../components/ChipGroup.jsx";

// Kept as data (not hard-coded JSX) so the list is easy to change
// and the chips render from one source of truth.
const TASKS = [
  "Debugging code",
  "Analyzing data",
  "Writing documentation",
  "Summarizing research",
  "Designing a flow",
  "Creating content",
];

function HomePage() {
  const [query, setQuery] = useState("");
  const [selectedTask, setSelectedTask] = useState(null);

  function handleSearch(event) {
    event.preventDefault(); // stop the browser from reloading the page
    // TODO: send the query to the guides/results page once it exists
    console.log("search:", query);
  }

  function handleShowGuides() {
    // TODO: route to results filtered by selectedTask
    console.log("show guides for:", selectedTask);
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl">What are you working on?</h1>
        <p className="mt-2 max-w-md text-sm leading-relaxed">
          Tell us what you are trying to accomplish and we'll help you find
          relevant AI resources, tutorials and guides.
        </p>

        {/* role="search" makes this a search landmark for screen readers */}
        <form
          role="search"
          onSubmit={handleSearch}
          className="mt-4 flex w-full items-center gap-2 rounded-full border border-line py-1 pr-1 pl-3 focus-within:border-brand"
        >
          <svg
            aria-hidden="true"
            viewBox="0 0 24 24"
            className="h-4 w-4 shrink-0 fill-none stroke-brand stroke-2"
          >
            <circle cx="11" cy="11" r="7" />
            <path d="m20 20-4-4" strokeLinecap="round" />
          </svg>
          <label htmlFor="task-search" className="sr-only">
            Describe what you're working on
          </label>
          <input
            id="task-search"
            type="search"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder='e.g. "I need to turn user interviews into a readout"'
            className="min-w-0 flex-1 bg-transparent text-xs outline-none placeholder:text-ink-muted"
          />
          <button
            type="submit"
            className="rounded-full bg-brand px-4 py-1.5 text-xs font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            Search
          </button>
        </form>

        <ChipGroup
          legend="Or pick a task from the list"
          options={TASKS}
          selected={selectedTask}
          onSelect={setSelectedTask}
          className="mt-8"
          legendClassName="text-xs"
          listClassName="max-w-md"
        />

        <button
          type="button"
          onClick={handleShowGuides}
          className="mt-8 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Show my Guides
        </button>

        {/* Will link to the questions page (role + AI experience) */}
        <a
          href="#questions"
          className="mt-4 text-xs text-ink-muted underline hover:text-brand"
        >
          Not sure where to start? Answer a couple of questions
        </a>
      </div>
    </main>
  );
}

export default HomePage;