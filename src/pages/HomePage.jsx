import { useState } from "react";
import WorkAreaCard from "../components/WorkAreaCard.jsx";
import { WORK_AREAS, POPULAR_TASKS } from "../data/workAreas.js";

const FEATURED_AREAS = WORK_AREAS.filter((area) => area.featured);

function HomePage() {
  const [query, setQuery] = useState("");

  function handleSearch(event) {
    event.preventDefault(); // stop the browser from reloading the page
    // TODO: send the query to the guides/results page once it exists
    console.log("search:", query);
  }

  return (
    <main className="w-full flex-1 px-6 py-10 sm:px-10 lg:px-[5%]">
      {/* Hero */}
      <section className="grid items-center gap-8 rounded-3xl bg-brand-soft px-6 py-12 sm:px-12 lg:grid-cols-2 lg:px-24 lg:py-14">
        <h1 className="text-4xl leading-tight sm:text-5xl">
          What are you working on?
        </h1>

        {/* min-w-0 lets this grid column shrink on phones instead of overflowing */}
        <div className="min-w-0">
          <p className="leading-relaxed">
            Tell us what you're working on, and we'll point you to relevant AI
            resources, tutorials, and guides.
          </p>

          {/* role="search" makes this a search landmark for screen readers */}
          <form
            role="search"
            onSubmit={handleSearch}
            className="mt-6 flex w-full items-center gap-2 rounded-full border-2 border-brand-line bg-white py-1 pr-1 pl-4 focus-within:border-brand"
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
              className="min-w-0 flex-1 bg-transparent py-2 text-sm outline-none placeholder:text-ink-muted"
            />
            <button
              type="submit"
              className="rounded-full bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              Search
            </button>
          </form>
        </div>
      </section>

      {/* Browse by work area */}
      <section
        aria-labelledby="browse-heading"
        className="mt-10 grid gap-6 lg:grid-cols-4"
      >
        <div>
          <h2 id="browse-heading" className="text-4xl leading-tight">
            Browse by work area
          </h2>
          <p className="mt-6 text-sm">
            Explore practical AI guidance by discipline
          </p>
          <a
            href="#work-areas"
            className="mt-6 inline-block rounded-full border-2 border-brand px-4 py-1.5 font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
          >
            See all work areas
          </a>
        </div>

        <ul className="grid gap-6 sm:grid-cols-2 lg:col-span-3">
          {FEATURED_AREAS.map((area) => (
            <li key={area.slug} className="grid">
              <WorkAreaCard
                name={area.name}
                description={area.description}
                taskCount={area.tasks.length}
                href={`#work-areas/${area.slug}`}
              />
            </li>
          ))}
        </ul>
      </section>

      {/* Popular tasks */}
      <section aria-labelledby="popular-heading" className="mt-12">
        <h2 id="popular-heading" className="text-4xl leading-tight">
          Popular tasks
        </h2>
        <p className="mt-4 text-sm">
          Get started with common tasks across different work areas
        </p>
        {/* TODO: make these links once task guide pages exist */}
        <ul className="mt-4 flex flex-wrap gap-2">
          {POPULAR_TASKS.map(({ area, task }) => (
            <li
              key={`${area}-${task}`}
              className="rounded-full border border-brand bg-white px-3 py-1 text-sm"
            >
              <span className="text-ink-muted">{area}</span>
              {/* The dot is visual only; screen readers hear "UX/UI: ..." */}
              <span aria-hidden="true" className="mx-1.5 text-ink-muted">
                ·
              </span>
              <span className="sr-only">: </span>
              <span className="font-semibold text-brand">{task}</span>
            </li>
          ))}
        </ul>
      </section>
    </main>
  );
}

export default HomePage;