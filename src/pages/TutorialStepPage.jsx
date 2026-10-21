import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import { getProgress, saveProgress, useStoredState } from "../lib/storage.js";

// One tutorial step, e.g. #work-areas/ux-ui/prepare-interview-questions/step-2
//
// Accessibility:
// - The stepper is a <nav> with an ordered list. The current step has
//   aria-current="step" (NVDA: "current step"), finished steps say
//   "completed". On phones the step names are visually hidden to save
//   space (just the numbered circles show), but screen readers still get them.
// - "Same here" is a toggle button (aria-pressed), so NVDA says
//   "Same here, toggle button, not pressed / pressed".
// - Previous / Next are plain links in the order you'd expect.
//
// No backend: progress and "Same here" are saved in this browser only
// (see lib/storage.js). That's why there's no shared "(8)" count like the
// mockup: there's nowhere to add up everyone's clicks yet.

const outlineButton =
  "inline-flex items-center gap-2 rounded-full border-2 border-brand bg-white px-5 py-2 font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const primaryButton =
  "inline-flex items-center gap-2 rounded-full border-2 border-brand bg-brand px-5 py-2 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function Arrow({ left = false }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 fill-none stroke-current stroke-2"
    >
      <path
        d={left ? "M19 12H5m6-6-6 6 6 6" : "M5 12h14m-6-6 6 6-6 6"}
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function TutorialStepPage({ area, task, tutorial, stepNumber }) {
  const key = `${area.slug}/${task.slug}`;
  const { steps } = tutorial;
  const step = steps[stepNumber - 1];
  const total = steps.length;
  // Steps you reached before this one count as completed. (Read before
  // this visit is saved, so opening step 5 from a link doesn't tick 1-4.)
  const reached = getProgress(key).step;

  const [sameHere, setSameHere] = useStoredState(
    `same-here:${key}/step-${stepNumber}`,
    false
  );

  // Remember how far you got, so the overview can offer "Continue"
  useEffect(() => {
    saveProgress(key, { step: stepNumber });
  }, [key, stepNumber]);

  const previousHref =
    stepNumber > 1 ? `${task.href}/step-${stepNumber - 1}` : task.href;
  const nextHref =
    stepNumber < total
      ? `${task.href}/step-${stepNumber + 1}`
      : `${task.href}/done`;

  return (
    <div className="flex-1 px-6 py-10 sm:px-10 lg:px-[5%]">
      <Breadcrumb
        items={[
          { label: "Home", href: "#" },
          { label: area.name, href: `#work-areas/${area.slug}` },
          { label: task.title, href: task.href },
        ]}
      />

      <div className="mt-8 grid gap-8 lg:grid-cols-[16rem_1fr] lg:gap-16">
        {/* Stepper */}
        <nav aria-label="Tutorial steps" className="lg:self-start">
          <ol className="flex flex-wrap gap-3 lg:flex-col lg:gap-0">
            {steps.map((item, index) => {
              const number = index + 1;
              const isCurrent = number === stepNumber;
              const isDone = !isCurrent && number <= reached;
              return (
                <li
                  key={item.title}
                  className="lg:relative lg:pb-6 lg:last:pb-0"
                >
                  {/* Connecting line between circles (desktop, decorative) */}
                  {number < total && (
                    <span
                      aria-hidden="true"
                      className="absolute top-9 bottom-0 left-[17px] hidden w-0.5 bg-brand-line lg:block"
                    />
                  )}
                  <a
                    href={`${task.href}/step-${number}`}
                    aria-current={isCurrent ? "step" : undefined}
                    className="group flex items-center gap-3 rounded-full focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 text-sm font-semibold ${
                        isCurrent
                          ? "border-brand bg-brand text-white"
                          : isDone
                            ? "border-brand bg-brand-soft text-brand"
                            : "border-line bg-white text-ink-muted group-hover:border-brand"
                      }`}
                    >
                      {isDone ? (
                        <svg
                          viewBox="0 0 24 24"
                          className="h-4 w-4 fill-none stroke-current stroke-[3]"
                        >
                          <path d="m5 12 5 5 9-10" strokeLinecap="round" />
                        </svg>
                      ) : (
                        number
                      )}
                    </span>
                    <span
                      className={`sr-only lg:not-sr-only ${
                        isCurrent ? "font-semibold text-brand" : ""
                      } group-hover:underline`}
                    >
                      {item.title}
                      {isDone && <span className="sr-only"> (completed)</span>}
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0 max-w-3xl">
          <p className="text-sm font-semibold text-brand">
            Step {stepNumber} of {total}
          </p>
          <h1 className="mt-2 text-3xl break-words sm:text-4xl">
            {step.title}
          </h1>
          <p className="mt-4">{step.summary}</p>

          {/* Image placeholder (decorative until real screenshots exist).
              TODO: swap for a real image with alt text describing it. */}
          <div
            aria-hidden="true"
            className="mt-6 flex aspect-[2/1] max-h-80 w-full items-center justify-center rounded-2xl border border-dashed border-brand-line bg-white"
          >
            <svg
              viewBox="0 0 24 24"
              className="h-10 w-10 fill-none stroke-brand-line stroke-2"
            >
              <rect x="3" y="5" width="18" height="14" rx="2" />
              <circle cx="9" cy="10" r="1.5" />
              <path d="m21 16-5-5-8 8" strokeLinejoin="round" />
            </svg>
          </div>

          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <section
              aria-labelledby="worked-heading"
              className="rounded-2xl border border-brand-line bg-white p-4"
            >
              <h2
                id="worked-heading"
                className="flex items-center gap-2 font-semibold"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-brand stroke-2"
                >
                  <path d="m5 12 5 5 9-10" strokeLinecap="round" />
                </svg>
                What worked
              </h2>
              <p className="mt-2 text-sm">{step.worked}</p>
            </section>
            <section
              aria-labelledby="didnt-heading"
              className="rounded-2xl border border-brand-line bg-white p-4"
            >
              <h2
                id="didnt-heading"
                className="flex items-center gap-2 font-semibold"
              >
                <svg
                  aria-hidden="true"
                  viewBox="0 0 24 24"
                  className="h-5 w-5 fill-none stroke-ink stroke-2"
                >
                  <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
                </svg>
                What didn't work first
              </h2>
              <p className="mt-2 text-sm">{step.didnt}</p>
            </section>
          </div>

          <section
            aria-labelledby="tripped-heading"
            className="mt-4 flex flex-wrap items-center justify-between gap-4 rounded-2xl bg-brand-soft p-4"
          >
            <div className="min-w-0 flex-1 basis-64">
              <h2 id="tripped-heading" className="font-semibold">
                <span aria-hidden="true">✋ </span>This tripped others up too
              </h2>
              <p className="mt-1 text-sm">{step.trippedUp}</p>
            </div>
            <div className="flex flex-col items-start gap-1">
              <button
                type="button"
                aria-pressed={sameHere}
                aria-describedby="same-here-note"
                onClick={() => setSameHere(!sameHere)}
                className="inline-flex items-center gap-2 rounded-full border-2 border-brand bg-white px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand-line focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-pressed:bg-brand aria-pressed:text-white aria-pressed:hover:bg-brand-hover"
              >
                {sameHere && (
                  <svg
                    aria-hidden="true"
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-none stroke-current stroke-[3]"
                  >
                    <path d="m5 12 5 5 9-10" strokeLinecap="round" />
                  </svg>
                )}
                Same here
              </button>
              <p id="same-here-note" className="text-xs text-ink-muted">
                Saved on this device only
              </p>
            </div>
          </section>

          <div className="mt-10 flex flex-wrap justify-between gap-4">
            <a href={previousHref} className={outlineButton}>
              <Arrow left />
              {stepNumber > 1 ? "Previous" : "Back to overview"}
            </a>
            <a href={nextHref} className={primaryButton}>
              {stepNumber < total ? "Next" : "Finish tutorial"}
              <Arrow />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialStepPage;
