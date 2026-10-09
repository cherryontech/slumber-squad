// Site header: logo + app name on the left, nav links on the right.
// The logo is a placeholder square until the squad picks real branding.
// `page` lets us mark the current nav link with aria-current="page",
// so screen readers announce "Work areas, current page".
function Header({ page }) {
  return (
    <header className="border-b border-line bg-white">
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