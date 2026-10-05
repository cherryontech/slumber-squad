// Site header: logo + app name on the left, nav links on the right.
// The logo is a placeholder square until the squad picks real branding.
function Header() {
  return (
    <header className="border-b border-line">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
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
              <a href="#projects" className="hover:text-brand">
                Projects
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