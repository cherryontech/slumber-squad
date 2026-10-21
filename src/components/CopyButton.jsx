import { useEffect, useRef, useState } from "react";

// Small copy icon button (top-right corner of the prompt box, like the
// mockup). Its name is "Copy prompt" (visually hidden text), so NVDA reads
// "Copy prompt, button". After copying, the icon turns into a check, a
// small "Copied" appears for sighted users, and a polite live region tells
// screen reader users "Prompt copied to clipboard".
//
// The live region is always on the page (empty until needed): NVDA only
// announces live regions that already existed before their text changed.

async function copyText(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    // Older browsers / blocked clipboard: the old textarea trick
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const ok = document.execCommand("copy");
    textarea.remove();
    return ok;
  }
}

function CopyButton({ text, label = "Copy prompt", what = "Prompt" }) {
  const [status, setStatus] = useState(""); // "", "copied", "failed"
  const timer = useRef(null);

  useEffect(() => () => clearTimeout(timer.current), []);

  async function handleClick() {
    const ok = await copyText(text);
    setStatus(ok ? "copied" : "failed");
    clearTimeout(timer.current);
    timer.current = setTimeout(() => setStatus(""), 4000);
  }

  return (
    <div className="flex flex-col items-end gap-1">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex h-8 w-8 items-center justify-center rounded-lg text-ink hover:bg-brand-line hover:text-brand focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
      >
        <svg
          aria-hidden="true"
          viewBox="0 0 24 24"
          className="h-4 w-4 fill-none stroke-current stroke-2"
        >
          {status === "copied" ? (
            <path d="m5 12 5 5 9-10" strokeLinecap="round" />
          ) : (
            <>
              <rect x="9" y="9" width="11" height="11" rx="2" />
              <path d="M5 15V6a2 2 0 0 1 2-2h8" strokeLinecap="round" />
            </>
          )}
        </svg>
        <span className="sr-only">{label}</span>
      </button>
      <p role="status" className="text-right text-xs text-ink-muted">
        {status === "copied" && (
          <>
            <span aria-hidden="true">Copied</span>
            <span className="sr-only">{what} copied to clipboard</span>
          </>
        )}
        {status === "failed" && "Couldn't copy"}
      </p>
    </div>
  );
}

export default CopyButton;
