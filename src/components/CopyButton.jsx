import { useEffect, useRef, useState } from "react";

// "Copy prompt" button. After copying, the button's visible text changes to
// "Copied!" for a few seconds, and a polite live region tells screen reader
// users "Prompt copied to clipboard" (a button's name changing isn't always
// announced, so the live region makes sure they hear it).
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
    <div className="flex flex-wrap items-center gap-3">
      <button
        type="button"
        onClick={handleClick}
        className="inline-flex items-center gap-2 rounded-full border-2 border-brand bg-white px-4 py-1.5 text-sm font-semibold text-brand hover:bg-brand-soft focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
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
        {status === "copied" ? "Copied!" : label}
      </button>
      <p role="status" className="text-sm text-ink-muted">
        {status === "copied" && (
          <span className="sr-only">{what} copied to clipboard</span>
        )}
        {status === "failed" &&
          "Couldn't copy automatically. Select the text and copy it instead."}
      </p>
    </div>
  );
}

export default CopyButton;
