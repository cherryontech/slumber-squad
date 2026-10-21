import { useEffect } from "react";
import Breadcrumb from "../components/Breadcrumb.jsx";
import SpokenText from "../components/SpokenText.jsx";
import { getProgress, saveProgress, useStoredState } from "../lib/storage.js";

// One tutorial step, e.g. #work-areas/ux-ui/prepare-interview-questions/step-2
//
// Accessibility:
// - The stepper is a <nav> with an ordered list. The current step has
//   aria-current="step" (NVDA: "current step"), finished steps say
//   "completed". On phones the step names are visually hidden to save
//   space (just the numbered circles show), but screen readers still get them.
// - After Next / Previous, focus moves to the step's title (data-focus-heading,
//   see App.jsx), so screen readers announce "Ask AI to find themes" instead
//   of repeating the tutorial name.
// - "Same here" is a toggle button (aria-pressed), so NVDA says
//   "Same here, 8 people, toggle button, not pressed".
//
// No backend: progress and your "Same here" click are saved in this
// browser only (lib/storage.js). The count starts from the number in
// data/tutorials.js, and your own click adds 1.

const outlineButton =
  "rounded-full border-2 border-brand bg-white px-5 py-1.5 font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";
const primaryButton =
  "rounded-full border-2 border-brand bg-brand px-5 py-1.5 font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand";

function CheckMark({ className = "" }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className={`fill-none stroke-current ${className}`}
    >
      <path d="m6 12 4 4 8-9" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Outline "raised hand" icon (decorative)
function HandIcon() {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 24 24"
      className="h-4 w-4 shrink-0 fill-none stroke-ink stroke-[1.75]"
    >
      <path
        d="M8 11V5.5a1.5 1.5 0 0 1 3 0V10m0-5.5V4a1.5 1.5 0 0 1 3 0v6m0-4.5a1.5 1.5 0 0 1 3 0V12m0-3.5a1.5 1.5 0 0 1 3 0V15a7 7 0 0 1-7 7h-1a6 6 0 0 1-5-2.7l-2.6-4a1.5 1.5 0 0 1 2.4-1.8L8 15"
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
  const sameHereCount = (step.sameHere ?? 0) + (sameHere ? 1 : 0);

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
    <div className="flex flex-1 flex-col">
      {/* Light blue title band */}
      <div className="px-6 pt-14 pb-12 sm:px-10 lg:px-[5%]">
        <Breadcrumb
          items={[
            { label: "Home", href: "#" },
            { label: "All work areas", href: "#work-areas" },
            { label: area.name, href: `#work-areas/${area.slug}` },
          ]}
        />
        <h1 className="mt-8 text-4xl break-words sm:text-5xl">
          <SpokenText text={task.title} spoken={task.spoken} />
        </h1>
      </div>

      {/* Light gray content area, full width */}
      <div className="grid flex-1 gap-8 bg-surface px-6 py-10 sm:px-10 lg:grid-cols-[18rem_1fr] lg:gap-8 lg:px-[5%]">
        {/* Stepper */}
        <nav aria-label="Tutorial steps" className="lg:self-start">
          <ol className="flex flex-wrap gap-3 lg:flex-col lg:gap-0">
            {steps.map((item, index) => {
              const number = index + 1;
              const isCurrent = number === stepNumber;
              const isDone = !isCurrent && number <= reached;
              // Line below this circle: solid purple once you're past it
              const lineDone = number < stepNumber || number < reached;
              return (
                <li
                  key={item.title}
                  className="lg:relative lg:pb-8 lg:last:pb-0"
                >
                  {number < total && (
                    <span
                      aria-hidden="true"
                      className={`absolute top-6 bottom-0 left-[11px] hidden w-0.5 lg:block ${
                        lineDone ? "bg-brand" : "bg-brand-line"
                      }`}
                    />
                  )}
                  <a
                    href={`${task.href}/step-${number}`}
                    aria-current={isCurrent ? "step" : undefined}
                    className="group flex items-start gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
                  >
                    <span
                      aria-hidden="true"
                      className={`relative flex h-6 w-6 shrink-0 items-center justify-center rounded-full text-xs font-semibold max-lg:h-9 max-lg:w-9 max-lg:text-sm ${
                        isCurrent || isDone
                          ? "bg-brand text-white"
                          : "bg-brand-soft text-brand group-hover:bg-brand-line"
                      }`}
                    >
                      {isDone ? (
                        <CheckMark className="h-3.5 w-3.5 stroke-[3]" />
                      ) : (
                        number
                      )}
                    </span>
                    <span className="sr-only text-sm lg:not-sr-only">
                      <span className="block font-semibold group-hover:underline">
                        {item.title}
                      </span>
                      <span className="block">
                        {item.description}
                        {isDone && (
                          <span className="sr-only"> (completed)</span>
                        )}
                      </span>
                    </span>
                  </a>
                </li>
              );
            })}
          </ol>
        </nav>

        <div className="min-w-0">
          <p className="text-sm">
            Step {stepNumber} of {total}
          </p>
          <h2 data-focus-heading className="mt-3 text-2xl font-semibold">
            {step.title}
          </h2>
          <p className="mt-4">{step.summary}</p>

          {/* Image placeholder (decorative until real screenshots exist).
              TODO: swap for a real image with alt text describing it. */}
          <svg
            aria-hidden="true"
            preserveAspectRatio="none"
            viewBox="0 0 100 25"
            className="mt-6 h-60 w-full rounded-2xl border border-line bg-white"
          >
            <path
              d="M0 0 100 25M100 0 0 25"
              className="stroke-line"
              strokeWidth="1"
              vectorEffect="non-scaling-stroke"
            />
          </svg>

          {/* What worked / What didn't work first */}
          <div className="mt-6 grid border-y border-ink py-4 sm:grid-cols-2">
            <section
              aria-labelledby="worked-heading"
              className="pb-4 sm:pr-6 sm:pb-0"
            >
              <h3 id="worked-heading" className="text-sm font-semibold">
                What worked
              </h3>
              <p className="mt-3 text-sm">{step.worked}</p>
            </section>
            <section
              aria-labelledby="didnt-heading"
              className="border-t border-line pt-4 sm:border-t-0 sm:border-l sm:border-ink sm:pt-0 sm:pl-4"
            >
              <h3 id="didnt-heading" className="text-sm font-semibold">
                What didn't work first
              </h3>
              <p className="mt-3 text-sm">{step.didnt}</p>
            </section>
          </div>

          {/* This tripped others up too */}
          <div className="mt-6 flex flex-wrap items-center justify-between gap-3">
            <p className="flex min-w-0 flex-1 basis-72 items-start gap-1.5 text-sm">
              <HandIcon />
              <span>
                <strong className="font-semibold">
                  This tripped others up too:
                </strong>{" "}
                {step.trippedUp}
              </span>
            </p>
            <button
              type="button"
              aria-pressed={sameHere}
              onClick={() => setSameHere(!sameHere)}
              className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-ink bg-white px-3 py-1 text-sm hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand aria-pressed:border-brand aria-pressed:bg-brand-soft aria-pressed:font-semibold aria-pressed:text-brand"
            >
              {sameHere && <CheckMark className="h-3.5 w-3.5 stroke-[3]" />}
              Same here
              <span aria-hidden="true">({sameHereCount})</span>
              <span className="sr-only">
                , {sameHereCount} {sameHereCount === 1 ? "person" : "people"}
              </span>
            </button>
          </div>

          <div className="mt-8 flex flex-wrap justify-between gap-4">
            <a href={previousHref} className={outlineButton}>
              {stepNumber > 1 ? "Previous" : "Back to overview"}
            </a>
            <a href={nextHref} className={primaryButton}>
              {stepNumber < total ? "Next" : "Finish tutorial"}
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TutorialStepPage;
