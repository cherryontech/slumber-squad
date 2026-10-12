// Site header: logo + app name on the left, nav links on the right.
// The logo is a placeholder square until the squad picks real branding.
// `page` lets us mark the current nav link with aria-current="page",
// so screen readers announce "Work areas, current page".
//
// "Skip to main content" is the first Tab stop on every page, so keyboard
// and screen reader users can jump past the header. It stays hidden until
// it's focused. Because the site uses #hash routing, a normal href="#main"
// would change the page, so the click handler moves focus to the page's
// <h1> instead.
function skipToMain(event) {
  event.preventDefault();
  const heading = document.querySelector("main h1");
  if (heading) {
    heading.setAttribute("tabindex", "-1");
    heading.focus();
  }
}

function Header({ page }) {
  return (
    <header className="border-b border-line bg-white">
      <a
        href="#main"
        onClick={skipToMain}
        className="sr-only rounded-full bg-brand px-4 py-2 font-semibold text-white focus:not-sr-only focus:absolute focus:px-4 focus:py-2 focus:top-3 focus:left-3 focus:z-50 focus:outline-2 focus:outline-offset-2 focus:outline-brand"
      >
        Skip to main content
      </a>
      <div className="flex items-center justify-between px-6 py-5 sm:px-10 lg:px-[5%]">
        <a href="/" className="flex items-center gap-2 text-sm font-semibold">
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