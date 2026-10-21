import { goBack } from "../lib/history.js";

// "‹ Home / All work areas" trail at the top of a page.
// <nav aria-label="Breadcrumb"> + an ordered list is the standard
// accessible breadcrumb pattern: NVDA announces "Breadcrumb, navigation
// landmark, list with 2 items". The slashes are decorative.
//
// The ‹ chevron is a real "Back" link (mockup note: "Go back: return to the
// previous meaningful page, not merely browser history, when opened from a
// deep link"). If you got here from another page on the site, it goes back
// there, scroll position included. If you opened this page straight from a
// link or bookmark, it goes to the last breadcrumb (the parent page) instead
// of leaving the site.
//
// An item with `current: true` is the page you're on: it isn't a link and
// gets aria-current="page" (NVDA: "Search results, current page").
function Breadcrumb({ items }) {
  const parent = items.filter((item) => !item.current).at(-1);

  return (
    <nav aria-label="Breadcrumb" className="flex items-center gap-1.5">
      <a
        href={parent.href}
        onClick={goBack}
        className="-m-2 inline-flex rounded-full p-2 hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-0 focus-visible:outline-brand"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-ink stroke-2"
        >
          <path d="m15 6-6 6 6 6" strokeLinecap="round" />
        </svg>
        <span className="sr-only">Back</span>
      </a>
      <ol className="flex flex-wrap items-center gap-1.5">
        {items.map((item, index) => (
          <li key={item.label} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            {item.current ? (
              <span aria-current="page" className="text-ink-muted">
                {item.label}
              </span>
            ) : (
              <a
                href={item.href}
                className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
              >
                {item.label}
              </a>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
