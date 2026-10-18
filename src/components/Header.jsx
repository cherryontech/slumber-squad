// Site header: logo + app name on the left, nav links on the right.
// The logo is a placeholder square until the squad picks real branding.
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
      <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-3 px-6 py-5 sm:px-10 lg:px-[5%]">
        {/* href="#" (not "/") navigates inside the app like every other link,
            instead of reloading the page and resetting focus */}
        <a href="#" className="flex items-center gap-2 text-sm font-semibold">
          <span
            aria-hidden="true"
            className="h-6 w-6 rounded-sm bg-ink-muted"
          />
          Name
        </a>

        <nav aria-label="Main">
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
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;