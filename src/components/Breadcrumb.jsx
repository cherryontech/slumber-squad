// "‹ Home / All work areas" trail at the top of a page.
// <nav aria-label="Breadcrumb"> + an ordered list is the standard
// accessible breadcrumb pattern: NVDA announces "Breadcrumb, navigation
// landmark, list with 2 items". The chevron and slashes are decorative.
function Breadcrumb({ items }) {
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5">
        <li aria-hidden="true">
          <svg
            viewBox="0 0 24 24"
            className="h-4 w-4 fill-none stroke-ink stroke-2"
          >
            <path d="m15 6-6 6 6 6" strokeLinecap="round" />
          </svg>
        </li>
        {items.map((item, index) => (
          <li key={item.href} className="flex items-center gap-1.5">
            {index > 0 && <span aria-hidden="true">/</span>}
            <a
              href={item.href}
              className="underline-offset-4 hover:text-brand hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
            >
              {item.label}
            </a>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;