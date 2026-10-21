import SearchForm from "../components/SearchForm.jsx";
import WorkAreaCard from "../components/WorkAreaCard.jsx";
import { WORK_AREAS, POPULAR_TASKS } from "../data/workAreas.js";

const FEATURED_AREAS = WORK_AREAS.filter((area) => area.featured);

function HomePage() {
  return (
    <div className="w-full flex-1 px-6 py-10 sm:px-10 lg:px-[5%]">
      {/* Hero */}
      {/* Phones: smaller headline + tighter padding so the hero has room to
          breathe; it scales up at sm (640px) and lg (1024px). */}
      <section className="grid items-center gap-5 rounded-3xl bg-brand-soft px-5 py-8 sm:gap-8 sm:px-12 sm:py-12 lg:grid-cols-2 lg:px-24 lg:py-14">
        <h1 className="text-3xl leading-tight sm:text-4xl lg:text-5xl">
          What are you working on?
        </h1>

        {/* min-w-0 lets this grid column shrink on phones instead of overflowing */}
        <div className="min-w-0">
          <p className="leading-relaxed text-sm sm:text-base">
            Tell us what you're working on, and we'll point you to relevant AI
            resources, tutorials, and guides.
          </p>

          {/* Goes to the search results page (#search?q=...) */}
          <SearchForm className="mt-5 sm:mt-6" />
        </div>
      </section>

      {/* Browse by work area */}
      <section
        aria-labelledby="browse-heading"
        className="mt-10 grid gap-6 lg:grid-cols-4"
      >
        <div>
          <h2
            id="browse-heading"
            className="text-3xl leading-tight sm:text-4xl"
          >
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
        <h2 id="popular-heading" className="text-3xl leading-tight sm:text-4xl">
          Popular tasks
        </h2>
        <p className="mt-4 text-sm">
          Get started with common tasks across different work areas
        </p>
        <ul className="mt-4 flex flex-wrap gap-2">
          {POPULAR_TASKS.map(({ area, task, href }) => (
            <li key={href}>
              <a
                href={href}
                className="inline-block rounded-full border border-brand bg-white px-3 py-1 text-sm hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                <span className="text-ink-muted">{area}</span>
                {/* The dot is visual only; screen readers hear "UX/UI: ..." */}
                <span aria-hidden="true" className="mx-1.5 text-ink-muted">
                  ·
                </span>
                <span className="sr-only">: </span>
                <span className="font-semibold text-brand">{task}</span>
              </a>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

export default HomePage;
