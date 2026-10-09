// A native <select> styled as a pill: "Tool: All ⌄", "Sort: Most popular ⌄".
// Using the real <select> keeps keyboard, mobile, and screen reader support
// built in. The visible "Tool:" text is the <label>, so NVDA reads
// "Tool:, combo box, All".
function SelectPill({ label, value, options, onChange }) {
  return (
    <label className="relative flex items-center gap-1 rounded-full border border-ink bg-white py-1.5 pr-8 pl-3 text-sm has-[select:focus-visible]:outline-2 has-[select:focus-visible]:outline-offset-2 has-[select:focus-visible]:outline-brand">
      <span>{label}:</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        // appearance-none hides the browser's arrow so we can draw our own.
        // field-sizing: content shrinks the select to fit the chosen option
        // (Chrome/Edge; other browsers just keep the normal width).
        className="cursor-pointer appearance-none bg-transparent font-semibold outline-none [field-sizing:content]"
      >
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      <svg
        aria-hidden="true"
        viewBox="0 0 24 24"
        className="pointer-events-none absolute right-3 h-4 w-4 fill-none stroke-ink stroke-2"
      >
        <path d="m6 9 6 6 6-6" strokeLinecap="round" />
      </svg>
    </label>
  );
}

export default SelectPill;