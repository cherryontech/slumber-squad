import CountPill from "../components/CountPill.jsx";
import { WORK_AREAS } from "../data/workAreas.js";

function WorkAreasPage() {
  return (
    <main className="grid w-full flex-1 gap-6 px-6 py-14 sm:px-10 lg:grid-cols-4 lg:px-[5%]">
      <div className="lg:pt-10">
        <h1 className="text-5xl leading-tight">All work areas</h1>
        <p className="mt-6">Explore practical AI guidance by discipline</p>
      </div>

      <ul className="grid content-start gap-6 sm:grid-cols-2 lg:col-span-3 lg:grid-cols-3">
        {WORK_AREAS.map((area) => (
          <li key={area.slug}>
            <section
              aria-labelledby={`${area.slug}-heading`}
              className="rounded-2xl border border-brand-line bg-white p-4"
            >
              <div className="flex items-center justify-between gap-4 border-b border-line pb-2">
                <h2
                  id={`${area.slug}-heading`}
                  className="text-xl font-semibold"
                >
                  <a
                    href={`#work-areas/${area.slug}`}
                    className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    {area.name}
                  </a>
                </h2>
                <CountPill count={area.tasks.length} />
              </div>

              {/* TODO: make each task a link once task guide pages exist */}
              <ul>
                {area.tasks.map((task) => (
                  <li
                    key={task.title}
                    className="flex items-center gap-2 border-b border-line py-2 text-ink-muted last:border-b-0"
                  >
                    <svg
                      aria-hidden="true"
                      viewBox="0 0 24 24"
                      className="h-3.5 w-3.5 shrink-0 fill-none stroke-ink stroke-2"
                    >
                      <path d="m9 6 6 6-6 6" strokeLinecap="round" />
                    </svg>
                    {task.title}
                  </li>
                ))}
              </ul>
            </section>
          </li>
        ))}
      </ul>
    </main>
  );
}

export default WorkAreasPage;