// A pill-shaped radio option. Used inside <ChipGroup>.
//
// Why a real <input type="radio"> instead of a <button>?
// Each group lets you pick only one option, which is exactly what radios
// are for. The browser then handles the keyboard for us (Tab into/out of
// the group, arrow keys to move + select), and screen readers like NVDA
// announce it properly: "Debugging code, radio button, not checked, 1 of 6".
//
// The input is visually hidden (sr-only) but still focusable and readable.
// The <span> next to it is the pill you see. Tailwind's `peer` classes
// style the pill based on the hidden input's state (checked, focused).
function TaskChip({ name, value, label, checked, onSelect }) {
  return (
    <label className="cursor-pointer">
      <input
        type="radio"
        name={name}
        value={value}
        checked={checked}
        // onClick (not onChange) so clicking the selected chip again can
        // clear it. Arrow keys also fire a click on the newly selected radio.
        onClick={onSelect}
        // React requires onChange for a controlled input; onClick does the work
        onChange={() => {}}
        className="peer sr-only"
      />
      <span className="inline-block rounded-full border border-brand bg-white px-3 py-1 text-xs text-brand transition-colors peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:bg-brand-soft peer-checked:hover:bg-brand-hover">
        {label}
      </span>
    </label>
  );
}

export default TaskChip;