import { useEffect, useId, useLayoutEffect, useRef, useState } from "react";
import WorkAreaCard from "./WorkAreaCard.jsx";
import { WORK_AREAS } from "../data/workAreas.js";

const FEATURED_AREAS = WORK_AREAS.filter((area) => area.featured);
const OTHER_AREAS = WORK_AREAS.filter((area) => !area.featured);
const ORDERED_AREAS = [...FEATURED_AREAS, ...OTHER_AREAS];
const INITIAL_AREA_COUNT = 3;
const REDUCED_MOTION = "(prefers-reduced-motion: reduce)";

export default function BrowseWorkAreas() {
  const [expanded, setExpanded] = useState(false);
  const gridId = useId();
  const frameRef = useRef(null);
  const firstAdditionalRef = useRef(null);
  const decorationRef = useRef(null);
  const previousHeight = useRef(null);
  const animationRef = useRef(null);

  // Animate the measured height rather than guessing a max-height. The cards
  // retain their natural grid layout even when text wraps or fonts resize.
  useLayoutEffect(() => {
    if (previousHeight.current === null) return;
    const from = previousHeight.current;
    previousHeight.current = null;
    if (window.matchMedia(REDUCED_MOTION).matches) return;
    const frame = frameRef.current;
    const animation = frame.animate(
      [
        { height: `${from}px`, overflow: "clip" },
        {
          height: `${frame.getBoundingClientRect().height}px`,
          overflow: "clip",
        },
      ],
      { duration: 280, easing: "cubic-bezier(0.2, 0, 0, 1)" }
    );
    animationRef.current = animation;
    return () => animation.cancel();
  }, [expanded]);

  useEffect(() => {
    if (!expanded) return;
    const target = firstAdditionalRef.current;
    const decoration = decorationRef.current;
    const media = window.matchMedia(REDUCED_MOTION);
    let observer;
    let animationFrame = 0;
    let listening = false;

    function update() {
      animationFrame = 0;
      const { top, height } = target.getBoundingClientRect();
      const progress = Math.max(
        0,
        Math.min(1, (innerHeight - top) / (innerHeight + height))
      );
      decoration.style.setProperty(
        "--work-area-parallax",
        `${(progress - 0.5) * 24}px`
      );
    }

    function onScroll() {
      if (!animationFrame) animationFrame = requestAnimationFrame(update);
    }

    function stop() {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      cancelAnimationFrame(animationFrame);
      animationFrame = 0;
      listening = false;
    }

    function configure() {
      observer?.disconnect();
      stop();
      decoration.style.removeProperty("--work-area-parallax");
      if (media.matches) {
        animationRef.current?.cancel();
        return;
      }
      observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting && !listening) {
          listening = true;
          window.addEventListener("scroll", onScroll, { passive: true });
          window.addEventListener("resize", onScroll);
          onScroll();
        } else if (!entry.isIntersecting) {
          stop();
        }
      });
      observer.observe(target);
    }

    configure();
    media.addEventListener("change", configure);
    return () => {
      observer?.disconnect();
      stop();
      media.removeEventListener("change", configure);
      decoration.style.removeProperty("--work-area-parallax");
    };
  }, [expanded]);

  function toggleAreas() {
    previousHeight.current = frameRef.current.getBoundingClientRect().height;
    animationRef.current?.cancel();
    setExpanded((value) => !value);
  }

  return (
    <section
      id="browse-work-areas"
      aria-labelledby="browse-heading"
      className="relative isolate mx-auto mt-6 max-w-[1296px] sm:mt-8"
    >
      <div
        aria-hidden="true"
        className={`pointer-events-none absolute inset-0 -z-10 overflow-hidden rounded-3xl ${expanded ? "" : "hidden"}`}
      >
        <svg
          ref={decorationRef}
          focusable="false"
          viewBox="0 0 1200 600"
          preserveAspectRatio="none"
          className="work-area-decoration absolute -inset-y-4 left-0 h-[calc(100%+2rem)] w-full fill-brand-line/25"
        >
          <path
            d="M700 620C540 540 800 380 960 400S1200 220 1240 280V620Z"
            transform="translate(0 200)"
          />
          <path
            d="M-30 570C10 465 100 470 210 490C145 555 70 590-30 570Z"
            className="fill-brand-line/20"
          />
          <path
            d="M0 570Q100 495 200 510"
            className="fill-none stroke-brand-line/40"
            strokeWidth="2"
          />
        </svg>
      </div>
      <div>
        <h2
          id="browse-heading"
          tabIndex={-1}
          className="text-2xl font-medium leading-tight tracking-tight sm:text-3xl"
        >
          Browse by work area
        </h2>
        <p className="mt-3 text-sm leading-relaxed text-ink-muted">
          Explore practical AI guidance by discipline
        </p>
      </div>
      <div ref={frameRef} className="mt-5">
        <ul
          id={gridId}
          className="grid auto-rows-fr gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          {ORDERED_AREAS.map((area, index) => {
            const additional = index >= INITIAL_AREA_COUNT;
            const collapsed = additional && !expanded;
            return (
              <li
                key={area.slug}
                ref={
                  index === INITIAL_AREA_COUNT ? firstAdditionalRef : undefined
                }
                hidden={collapsed}
                className={collapsed ? "hidden" : "grid"}
              >
                <WorkAreaCard
                  variant="homepage"
                  areaSlug={area.slug}
                  name={area.name}
                  description={area.description}
                  taskCount={area.tasks.length}
                  href={`#work-areas/${area.slug}`}
                />
              </li>
            );
          })}
        </ul>
      </div>
      <div className="mt-5 flex justify-center">
        <button
          type="button"
          aria-expanded={expanded}
          aria-controls={gridId}
          onClick={toggleAreas}
          className="inline-flex cursor-pointer items-center gap-2 rounded-full border border-brand px-4 py-2 text-sm font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          {expanded
            ? "Show fewer work areas"
            : `Explore all ${ORDERED_AREAS.length} work areas`}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-current"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d={expanded ? "m6 15 6-6 6 6" : "m6 9 6 6 6-6"} />
          </svg>
        </button>
      </div>
    </section>
  );
}
