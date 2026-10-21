import { useMemo } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SearchForm from "../components/SearchForm.jsx";
import SelectPill from "../components/SelectPill.jsx";
import StageFilter from "../components/StageFilter.jsx";
import TaskCard from "../components/TaskCard.jsx";
import { WORK_AREAS } from "../data/workAreas.js";
import { closestTasks, searchHref, searchTasks } from "../lib/search.js";
import { useStoredState } from "../lib/storage.js";

// Search results, e.g. #search?q=user%20interviews
// The homepage search box sends people here. Matching happens in the
// browser (lib/search.js), no backend needed.
//
// Accessibility:
// - After searching, focus moves to the h1 ("6 results for ...") so screen
//   readers announce how many results there are right away.
// - The work area pills are a radio group (same as the stage filter),
//   and the "6 tasks" count is a live region, so changing a filter
//   announces the new count.
// - Suggestions on the no-results page are links that run that search.

const SORT_OPTIONS = [
  { value: "best", label: "Best match" },
  { value: "newest", label: "Newest" },
  { value: "shortest", label: "Shortest" },
];

// TODO (content team): swap in the most useful suggestions
const SUGGESTIONS = [
  "write a database query",
  "explain what this code does",
  "document code changes",
];

const ALL = "All";

function cardLabel(task) {
  return `${task.area.name} · ${task.stage}`;
}

function ResultsGrid({ tasks, headingLevel = 3, className = "mt-4" }) {
  return (
    <ul
      className={`grid auto-rows-fr gap-6 sm:grid-cols-2 lg:grid-cols-3 ${className}`}
    >
      {tasks.map((task) => (
        <li key={task.href} className="grid">
          <TaskCard
            {...task}
            label={cardLabel(task)}
            headingLevel={headingLevel}
          />
        </li>
      ))}
    </ul>
  );
}

function NoResults({ query }) {
  const closest = closestTasks(query);

  return (
    <>
      <h1 className="mt-8 text-3xl break-words sm:text-4xl">
        No exact matches for “{query}”
      </h1>
      <p className="mt-2 text-ink-muted">
        Showing the closest tasks we have instead
      </p>

      <section
        aria-labelledby="no-match-heading"
        className="mt-8 max-w-3xl rounded-3xl bg-brand-soft p-6 sm:p-8"
      >
        <h2 id="no-match-heading" className="text-2xl font-semibold">
          We couldn't find a match. What were you trying to do?
        </h2>
        <p className="mt-2 break-words">
          We don't have a task for “{query}” yet.
        </p>
        <h3 id="try-heading" className="mt-6 text-sm font-semibold">
          You can try these
        </h3>
        <ul aria-labelledby="try-heading" className="mt-3 flex flex-wrap gap-2">
          {SUGGESTIONS.map((suggestion) => (
            <li key={suggestion}>
              <a
                href={searchHref(suggestion)}
                className="inline-block rounded-full border border-brand bg-white px-3 py-1 text-sm font-semibold text-brand hover:bg-brand-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="sr-only">Search for: </span>
                {suggestion}
              </a>
            </li>
          ))}
        </ul>
        <a
          href="#work-areas"
          className="mt-6 inline-block rounded-full border-2 border-brand bg-white px-4 py-1.5 font-semibold text-brand hover:bg-brand-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Browse all work areas instead
        </a>
      </section>

      <section aria-labelledby="closest-heading" className="mt-12">
        <h2 id="closest-heading" className="text-2xl font-semibold sm:text-3xl">
          Closest matches
        </h2>
        <ResultsGrid tasks={closest} />
      </section>
    </>
  );
}

function Results({ query, results, matchedWords }) {
  // Kept for this browser tab (per search), so Back from a result returns
  // you to the same filtered list
  const session = { session: true };
  const [area, setArea] = useStoredState(`search:${query}:area`, null, session); // null = All
  const [tool, setTool] = useStoredState(
    `search:${query}:tool`,
    "all",
    session
  );
  const [sort, setSort] = useStoredState(
    `search:${query}:sort`,
    "best",
    session
  );

  const tasks = results.map((result) => result.task);

  // Only the work areas that actually have results, in the usual order
  const areaNames = WORK_AREAS.map((a) => a.name).filter((name) =>
    tasks.some((task) => task.area.name === name)
  );

  // (Small lists, so no useMemo needed: this is fast on every render)
  const tools = [...new Set(tasks.flatMap((task) => task.tools ?? []))];
  const toolOptions = [
    { value: "all", label: "All" },
    ...tools.map((t) => ({ value: t, label: t })),
  ];

  const visible = (() => {
    const filtered = tasks.filter(
      (task) =>
        (!area || task.area.name === area) &&
        (tool === "all" || task.tools?.includes(tool))
    );
    if (sort === "newest") {
      return [...filtered].sort((a, b) =>
        (b.updated ?? "").localeCompare(a.updated ?? "")
      );
    }
    if (sort === "shortest") {
      return [...filtered].sort(
        (a, b) => (a.minutes ?? Infinity) - (b.minutes ?? Infinity)
      );
    }
    return filtered; // "best" = search score order
  })();

  const count = visible.length;
  const [best, ...rest] = visible;
  const showBest = sort === "best" && count > 1;

  return (
    <>
      <h1 className="mt-8 text-3xl break-words sm:text-4xl">
        {results.length} {results.length === 1 ? "result" : "results"} for “
        {query}”
      </h1>
      <p className="mt-2 text-ink-muted">
        Across {areaNames.length}{" "}
        {areaNames.length === 1 ? "work area" : "work areas"}
        {matchedWords.length > 0 && (
          <>
            <span aria-hidden="true"> · </span>
            <span className="sr-only">, </span>
            matched on {matchedWords.join(", ")}
          </>
        )}
      </p>

      <section aria-labelledby="results-heading" className="mt-8">
        <h2 id="results-heading" className="sr-only">
          Results
        </h2>

        {areaNames.length > 1 && (
          <StageFilter
            legend="Filter by work area"
            stages={[ALL, ...areaNames]}
            selected={area ?? ALL}
            onSelect={(value) => setArea(value === ALL ? null : value)}
          />
        )}

        <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
          {/* aria-live announces the new count when a filter changes */}
          <p aria-live="polite" className="text-sm font-semibold">
            {count} {count === 1 ? "task" : "tasks"}
          </p>
          <div className="flex flex-wrap gap-3">
            {toolOptions.length > 2 && (
              <SelectPill
                label="Tool"
                value={tool}
                options={toolOptions}
                onChange={setTool}
              />
            )}
            <SelectPill
              label="Sort"
              value={sort}
              options={SORT_OPTIONS}
              onChange={setSort}
            />
          </div>
        </div>

        {count === 0 && (
          <p className="mt-6 rounded-2xl border border-dashed border-brand-line bg-white p-6 text-ink-muted">
            No results with these filters. Try another work area or tool.
          </p>
        )}

        {showBest ? (
          <>
            <h3 className="mt-6 text-sm font-semibold text-brand">
              Best result
            </h3>
            <ul className="mt-2 grid">
              <li className="grid">
                <TaskCard
                  {...best}
                  label={cardLabel(best)}
                  headingLevel={4}
                  className="border-2 border-brand!"
                />
              </li>
            </ul>
            <h3 className="mt-8 text-sm font-semibold">More results</h3>
            <ResultsGrid tasks={rest} headingLevel={4} className="mt-2" />
          </>
        ) : (
          count > 0 && <ResultsGrid tasks={visible} />
        )}
      </section>
    </>
  );
}

function SearchPage({ query }) {
  const { results, matchedWords } = useMemo(() => searchTasks(query), [query]);

  return (
    <div className="flex-1 px-6 py-10 sm:px-10 lg:px-[5%]">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: "Search results", current: true },
        ]}
      />
      {/* key: start fresh when a suggestion link changes the search */}
      <SearchForm
        key={query}
        initialQuery={query}
        label="Search tasks"
        className="mt-6 max-w-3xl"
      />

      {!query ? (
        <>
          <h1 className="mt-8 text-3xl sm:text-4xl">Search tasks</h1>
          <p className="mt-2 text-ink-muted">
            Describe what you're working on, like “summarize interview notes”.
          </p>
        </>
      ) : results.length === 0 ? (
        <NoResults query={query} />
      ) : (
        // key resets the filters for each new search
        <Results
          key={query}
          query={query}
          results={results}
          matchedWords={matchedWords}
        />
      )}
    </div>
  );
}

export default SearchPage;
