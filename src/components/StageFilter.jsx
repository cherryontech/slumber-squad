import { useId } from "react";

// Stage filter pills (Research, Define, Ideate...) on a work area page.
// Same accessible pattern as ChipGroup: a radio group inside a fieldset,
// so Tab enters the group, arrow keys move between stages, and NVDA reads
// "Filter by stage, grouping. Research, radio button, checked, 1 of 5".
// The legend is visually hidden because the mockup has no visible label.
// Clicking the selected stage again clears it and shows every task.
// The search page reuses it for work areas (legend="Filter by work area").
//
// The real radio sits invisibly ON TOP of each pill (absolute inset-0,
// opacity-0) instead of being shrunk to 1px with sr-only. That way the
// radio is exactly where the pill is, which keeps NVDA's browse mode,
// focus highlight, and arrow-key order lined up with what you see.
// (Issue #13: the 1px sr-only radios confused Edge + NVDA.)
function StageFilter({
  stages,
  selected,
  onSelect,
  legend = "Filter by stage",
}) {
  const name = useId();

  return (
    <fieldset>
      <legend className="sr-only">{legend}</legend>
      <div className="flex flex-wrap gap-3">
        {stages.map((stage) => (
          <label key={stage} className="relative inline-flex">
            <input
              type="radio"
              name={name}
              value={stage}
              checked={selected === stage}
              onClick={() => onSelect(selected === stage ? null : stage)}
              onChange={() => {}}
              className="peer absolute inset-0 m-0 cursor-pointer appearance-none rounded-full opacity-0"
            />
            <span className="inline-block rounded-full border border-ink bg-white px-4 py-2 text-sm transition-colors hover:bg-brand-soft peer-checked:border-brand-soft peer-checked:bg-brand-soft peer-checked:text-brand peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
              {stage}
            </span>
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export default StageFilter;
