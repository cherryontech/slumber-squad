// Site header: logo + app name on the left, nav links on the right.
// `page` lets us mark the current nav link with aria-current="page",
// so screen readers announce "Work areas, current page".
//
// "Skip to main content" is the first Tab stop on every page, so keyboard
// and screen reader users can jump past the header. It stays hidden until
// it's focused. Its href points at the real <main id="main-content"> in
// App.jsx (so checkers see a valid target), but because the site uses
// #hash routing, following that href would change the page. The click
// handler moves focus to <main> instead, and the next Tab goes to the
// first link or control inside the page.
function skipToMain(event) {
  event.preventDefault();
  document.getElementById("main-content")?.focus();
}

function Header({ page }) {
  return (
    <header className="border-b border-line bg-white">
      <a
        href="#main-content"
        onClick={skipToMain}
        className="sr-only rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:px-4 focus:py-2 focus:top-3 focus:left-3 focus:z-50 focus:outline-2 focus:outline-offset-2 focus:outline-brand"
      >
        Skip to main content
      </a>
      <div className="mx-auto flex w-full max-w-[1440px] flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 sm:px-10 lg:px-[min(5vw,72px)]">
        {/* href="#" (not "/") navigates inside the app like every other link,
            instead of reloading the page and resetting focus */}
        <a
          href="#"
          className="flex items-center gap-3 rounded-lg focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand"
        >
          <svg
            aria-hidden="true"
            focusable="false"
            viewBox="0 0 64 64"
            className="h-12 w-12 shrink-0"
          >
            <path
              d="M31 56C13 52 5 37 12 21c16 1 24 15 19 35Z"
              className="fill-pink-200"
            />
            <path
              d="M33 53C20 39 22 15 35 4c15 12 16 35-2 49Z"
              className="fill-brand"
            />
            <path
              d="M34 59c-1-22 11-35 28-34-1 18-12 31-28 34Z"
              className="fill-purple-300"
            />
            <path
              d="M30 60C12 60 3 48 2 34c17-3 28 8 28 26Z"
              className="fill-purple-600"
            />
          </svg>
          <span className="flex flex-col gap-0.5">
            <span className="text-3xl font-semibold leading-none tracking-tight">
              AI<span className="text-brand">4U</span>
            </span>
            <span className="text-xs font-medium tracking-wide text-ink-muted">
              AI Skills for You
            </span>
          </span>
        </a>

        <nav aria-label="Main" className="ml-auto">
          <ul className="flex gap-6 text-sm font-medium">
            <li>
              <a
                href="#work-areas"
                aria-current={page === "work-areas" ? "page" : undefined}
                className="hover:text-brand aria-[current=page]:text-brand aria-[current=page]:underline"
              >
                Work areas
              </a>
            </li>
            <li>
              <a href="#about" className="hover:text-brand">
                About
              </a>
            </li>
            <li>
              <a
                href="#contact"
                aria-current={page === "contact" ? "page" : undefined}
                className="hover:text-brand aria-[current=page]:text-brand aria-[current=page]:underline"
              >
                Contact
              </a>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;
