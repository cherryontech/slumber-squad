// A pill-shaped toggle button. Reused on the homepage task list and
// (later) on the role / experience questions page.
// aria-pressed tells screen readers whether the chip is currently selected.
function TaskChip({ label, selected, onClick }) {
  return (
    <button
      type="button"
      aria-pressed={selected}
      onClick={onClick}
      className={`rounded-full border border-brand px-3 py-1 text-xs transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand ${
        selected
          ? "bg-brand text-white"
          : "bg-white text-brand hover:bg-brand-soft"
      }`}
    >
      {label}
    </button>
  );
}

export default TaskChip;