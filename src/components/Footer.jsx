// Site footer. `page` marks the current link with aria-current="page",
// so screen readers announce "Contact, current page".
// TODO: About doesn't have a page yet (it goes to the homepage for now).
function Footer({ page }) {
  return (
    <footer className="border-t border-line bg-white">
      <nav aria-label="Footer">
        <ul className="flex items-center justify-between px-6 py-6 text-sm font-medium sm:px-10 lg:px-[5%]">
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
    </footer>
  );
}

export default Footer;
