import SearchForm from "../components/SearchForm.jsx";
import BrowseWorkAreas from "../components/BrowseWorkAreas.jsx";
import StartWithTask from "../components/StartWithTask.jsx";
import heroPhoto from "../assets/ai4u-hero.png";

function HomePage() {
  return (
    <div className="w-full flex-1 px-6 pt-10 pb-5 sm:px-10 lg:px-[5%]">
      <section
        aria-labelledby="hero-heading"
        className="relative isolate -mx-6 -mt-10 overflow-hidden bg-linear-to-r from-brand-soft to-brand-soft/60 sm:-mx-10 lg:-mx-[5.5556%]"
      >
        {/* Only the top-right office background is sampled; the SVG viewport
            excludes every person before the atmospheric blur is applied. */}
        <div aria-hidden="true" className="ai4u-hero-atmosphere">
          <svg
            focusable="false"
            viewBox="1400 0 272 180"
            preserveAspectRatio="xMidYMid slice"
          >
            <image href={heroPhoto} width="1672" height="940" />
          </svg>
        </div>
        <div className="relative isolate mx-auto w-full max-w-[1440px]">
          {/* Organic decoration stays outside the text and face areas. */}
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1440 440"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 -z-20 h-full w-full overflow-visible [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
          >
            <path
              d="M0 180C170 30 375 40 620 120C400 95 205 155 0 300Z"
              className="fill-brand-line/25"
            />
            <path
              d="M0 240C55 305 75 390 250 440H0Z"
              className="fill-purple-300/20"
            />
            <path
              d="M0 340C65 400 150 430 280 440"
              className="fill-none stroke-white/70"
              strokeWidth="2"
            />
          </svg>
          {/* The mask belongs to the image itself: its transparent edge reveals
            the same continuous background as the text side of the hero. */}
          {/* Cap the photo's scale so a wide viewport does not enlarge faces
            and push the laptop below the banner's visible area. */}
          <div className="pointer-events-none absolute inset-y-0 right-0 -z-10 hidden max-w-[900px] lg:block lg:w-[55%] xl:w-[80%]">
            <img
              src={heroPhoto}
              alt="Four professionals collaborating around a laptop in a bright workspace."
              width={1672}
              height={940}
              fetchPriority="high"
              className="h-full w-full object-cover object-top"
              style={{
                maskImage:
                  "linear-gradient(to right, transparent 0%, transparent 3%, rgba(0,0,0,.35) 15%, rgba(0,0,0,.78) 28%, black 45%, black 94%, transparent 100%)",
                WebkitMaskImage:
                  "linear-gradient(to right, transparent 0%, transparent 3%, rgba(0,0,0,.35) 15%, rgba(0,0,0,.78) 28%, black 45%, black 94%, transparent 100%)",
              }}
            />
          </div>
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 1440 440"
            preserveAspectRatio="none"
            className="pointer-events-none absolute inset-0 hidden h-full w-full lg:block"
          >
            <path
              d="M610 154Q760 10 910-15"
              className="fill-none stroke-brand/30"
              strokeWidth="1"
            />
            <path
              d="M1378 80Q1380 28 1438 12Q1440 70 1378 80Z"
              className="fill-purple-300/50"
            />
            <path
              d="M1350 142Q1354 107 1388 96Q1390 135 1350 142Z"
              className="fill-pink-200/60"
            />
          </svg>
          <div className="relative z-10 px-6 pt-10 pb-8 sm:px-10 sm:pt-12 lg:px-[5%] lg:py-12 xl:py-14">
            <div className="w-full min-w-0 max-w-[560px] lg:w-[45%] xl:w-full">
              <p className="flex flex-wrap items-center gap-x-2 gap-y-1 text-xs font-semibold tracking-widest text-brand sm:gap-x-3">
                <span>LEARN</span>
                <span aria-hidden="true">✦</span>
                <span>PRACTICE</span>
                <span aria-hidden="true">✦</span>
                <span>APPLY</span>
                <span aria-hidden="true">✦</span>
                <span>GROW</span>
              </p>
              <h1
                id="hero-heading"
                className="mt-5 max-w-2xl text-4xl font-semibold leading-[1.12] tracking-tight focus-visible:outline-none! sm:text-5xl xl:text-6xl"
              >
                Build real AI skills for your{" "}
                <span className="text-brand">real work.</span>
              </h1>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:text-lg">
                Practical guidance, examples, and templates to help you use AI
                confidently in the workplace — one step at a time.
              </p>
              {/* Goes to the search results page (#search?q=...) */}
              <SearchForm className="mt-5 shadow-sm sm:mt-6" />
            </div>
          </div>
          <div className="pointer-events-none relative -z-10 lg:hidden">
            <img
              src={heroPhoto}
              alt="Four professionals collaborating around a laptop in a bright workspace."
              width={1672}
              height={940}
              fetchPriority="high"
              className="aspect-video w-full object-cover object-center"
              style={{
                maskImage:
                  "linear-gradient(to bottom, transparent, black 18%, black 85%, transparent)",
                WebkitMaskImage:
                  "linear-gradient(to bottom, transparent, black 18%, black 85%, transparent)",
              }}
            />
          </div>
        </div>
        <svg
          aria-hidden="true"
          focusable="false"
          viewBox="0 0 1000 60"
          preserveAspectRatio="none"
          className="pointer-events-none absolute inset-x-0 bottom-0 h-6 w-full fill-page sm:h-10"
        >
          <path d="M0 0Q500 115 1000 0V60H0Z" />
        </svg>
      </section>

      <BrowseWorkAreas />

      <StartWithTask />
    </div>
  );
}

export default HomePage;
