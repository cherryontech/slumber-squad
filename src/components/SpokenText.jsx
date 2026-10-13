// Shows `text` on screen, but gives screen readers `spoken` instead, for
// words that NVDA mispronounces. Example: "A/B test" is read as
// "uh slash B test" because "A" sounds like the word "a"; with
// spoken="A-B test", NVDA spells the letters out instead.
//
// The visible text is hidden from screen readers (aria-hidden) and the
// spoken version is hidden from sight (sr-only), so each person gets
// exactly one version. When `spoken` is missing, it renders plain text.
function SpokenText({ text, spoken }) {
  if (!spoken) return text;

  return (
    <>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{spoken}</span>
    </>
  );
}

export default SpokenText;