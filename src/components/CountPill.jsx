// Small outlined pill showing how many tasks an area has.
// Sighted users see just the number (like the mockup); screen readers
// hear "3 tasks" thanks to the visually hidden word.
function CountPill({ count }) {
  return (
    <span className="inline-block rounded-full border border-ink px-3 py-0.5 text-xs">
      {count}
      <span className="sr-only"> {count === 1 ? "task" : "tasks"}</span>
    </span>
  );
}

export default CountPill;