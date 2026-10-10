// A pill-shaped radio option. Used inside <ChipGroup>.
//
// Why a real <input type="radio"> instead of a <button>?
// Each group lets you pick only one option, which is exactly what radios
// are for. The browser then handles the keyboard for us (Tab into/out of
// the group, arrow keys to move + select), and screen readers like NVDA
// announce it properly: "Debugging code, radio button, not checked, 1 of 6".
//
// The real radio sits invisibly ON TOP of the pill (absolute inset-0,
// opacity-0), so it's exactly where the pill is: focusable, clickable,
// and in the right place for NVDA's browse mode. (A 1px sr-only radio
// confused Edge + NVDA, see issue #13.) The <span> after it is the pill
// you see; Tailwind's `peer` classes style it from the radio's state.
function TaskChip({ name, value, label, checked, onSelect }) {
  return (
    <label className="relative inline-flex">
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
        className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-full opacity-0"
      />
      <span className="inline-block rounded-full border border-brand bg-white px-3 py-1 text-xs text-brand transition-colors peer-checked:bg-brand peer-checked:text-white peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand hover:bg-brand-soft peer-checked:hover:bg-brand-hover">
        {label}
      </span>
    </label>
  );
}

export default TaskChip;