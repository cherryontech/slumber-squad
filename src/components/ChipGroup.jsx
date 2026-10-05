import { useId } from "react";
import TaskChip from "./TaskChip.jsx";

// One labeled, single-select group of chips (a radio group).
// Shared by the homepage task list and both questions-page groups.
//
// <fieldset> + <legend> gives the group its name, so NVDA says
// "Select your role, grouping" before reading the options.
// aria-describedby links the optional hint so it's read too.
// legendClassName / listClassName let each page match its mockup sizing.
function ChipGroup({
  legend,
  hint,
  options,
  selected,
  onSelect,
  className = "",
  legendClassName = "text-sm",
  listClassName = "max-w-lg",
}) {
  // useId makes a unique id per group, so each group's radios share
  // one `name` (that's what links them into a single arrow-key group)
  // and two groups never collide.
  const id = useId();
  const hintId = `${id}-hint`;

  return (
    <fieldset
      className={`flex flex-col items-center ${className}`}
      aria-describedby={hint ? hintId : undefined}
    >
      <legend className={`mx-auto font-medium ${legendClassName}`}>
        {legend}
      </legend>
      {hint && (
        <p id={hintId} className="mt-1 text-sm text-ink-muted">
          {hint}
        </p>
      )}
      <div
        className={`mt-3 flex flex-wrap justify-center gap-2 ${listClassName}`}
      >
        {options.map((option) => (
          <TaskChip
            key={option}
            name={id}
            value={option}
            label={option}
            checked={selected === option}
            // Clicking the selected chip again clears it
            onSelect={() => onSelect(selected === option ? null : option)}
          />
        ))}
      </div>
    </fieldset>
  );
}

export default ChipGroup;