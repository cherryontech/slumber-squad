import { useState } from "react";

// A tool's logo on the tutorial page ("Tools you can use").
// The logo images go in the public/ folder (e.g. public/logos/claude.svg);
// use each company's official logo file from their brand / press page.
// If the image is missing or fails to load, it shows the tool's first
// letter in a circle instead, so the card never looks broken.
//
// alt="": the tool's name is written right next to the logo, so the image
// is decorative and screen readers skip it instead of saying "Claude" twice.
function ToolLogo({ name, src }) {
  const [failed, setFailed] = useState(!src);

  if (failed) {
    return (
      <span
        aria-hidden="true"
        className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-brand-soft text-sm font-semibold text-brand"
      >
        {name.charAt(0)}
      </span>
    );
  }

  return (
    <img
      src={src}
      alt=""
      width="36"
      height="36"
      onError={() => setFailed(true)}
      className="h-9 w-9 shrink-0 rounded-lg object-contain"
    />
  );
}

export default ToolLogo;
