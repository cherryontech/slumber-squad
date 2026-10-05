# Contributing to slumber-squad

Thanks for helping build slumber-squad! ♡ This guide covers how we work together: branches, pull requests, testing, and bugs. For setup (installing and running the app), see the [README](./README.md).

## Table of Contents

- [The Big Picture](#the-big-picture)
- [Branches](#branches)
- [Making a Change (Dev Workflow)](#making-a-change-dev-workflow)
- [Pull Requests](#pull-requests)
- [Deploy Previews](#deploy-previews)
- [Reporting Bugs](#reporting-bugs)
- [Testing a Fix (QA Workflow)](#testing-a-fix-qa-workflow)
- [Code Style](#code-style)
- [Gotchas](#gotchas)

## The Big Picture

```
🐞 Bug logged (issue #12)
      ↓
🛠️ Dev fixes it on a branch → opens a PR with "Closes #12"
      ↓
🔍 QA tests on the PR's Deploy Preview
      ↓                         ↓
✅ Works: QA approves      🔁 Broken: QA comments on the PR
      ↓                         ↓
🎉 Dev merges            Dev pushes a fix to the same PR → QA retests
      ↓
🌐 Live site updates + issue #12 closes automatically
```

- `main` is always what's live at [slumber-squad.netlify.app](https://slumber-squad.netlify.app)
- Nobody pushes directly to `main`. Every change goes through a pull request.

## Branches

Always branch off the latest `main`. Name your branch with a prefix that says what kind of work it is:

| Prefix     | Use it for                          | Example                     |
| ---------- | ----------------------------------- | --------------------------- |
| `feature/` | New pages, components, or features  | `feature/questions-page`    |
| `fix/`     | Bug fixes                           | `fix/chip-radio-groups`     |
| `chore/`   | Repo setup, config, docs, templates | `chore/bug-report-template` |

Use lowercase words separated by dashes.

## Making a Change (Dev Workflow)

Paste **one command at a time** and read the output before running the next one.

**1. Start fresh from `main`**

```bash
git checkout main
git pull
git checkout -b fix/short-description
```

Check that your terminal prompt shows your new branch name, not `(main)`, before you edit anything.

**2. Make your changes and test locally**

```bash
npm run dev
```

Test in the browser, including keyboard-only navigation (Tab, Shift+Tab, arrow keys, Enter, Space). Stop the server with `Ctrl+C`.

Before you commit, run:

```bash
npm run lint
npm run build
```

If `build` fails locally, it will fail on Netlify too.

**3. Stage, commit, and push**

```bash
git status
git add <files you changed>
git commit -m "Describe what this commit does"
git push -u origin fix/short-description
```

- Read `git status` like a reviewer: is every file listed one you meant to change?
- Leave `package-lock.json` out of your commit unless you actually added or updated a package (`git restore --staged package-lock.json`)
- Write commit messages in the present tense: "Add questions page", not "Added questions page". A good test: "If applied, this commit will ___."

**4. Open the pull request**

Click the link git prints after pushing, then follow [Pull Requests](#pull-requests) below.

**5. If changes are requested**

Don't open a new PR. Make the fix on the **same branch**, then:

```bash
git add <files>
git commit -m "Describe the fix"
git push
```

The PR and its Deploy Preview update automatically.

**6. After your PR merges**

```bash
git checkout main
git pull
```

You can delete the branch on GitHub (there's a button on the merged PR).

## Pull Requests

- **Base branch:** `main`. Double-check the dropdown at the top of the PR page.
- **Title:** a short summary of the change, e.g. "Convert chips to radio groups for keyboard and screen reader support"
- **Description:** fill in every section of the PR template:
  - **Story Card:** link the issue with `Closes #12` (one line per issue). GitHub closes the issue automatically when the PR merges. If there's no issue, write "N/A" and why.
  - **Description of Work Done:** what you built or changed, and why
  - **Testing Instructions:** numbered steps a reviewer can follow, including keyboard and screen reader steps for UI changes
  - **Gotchas / What I Learned:** anything tricky or worth sharing with the squad
- **Reviewers:** CODEOWNERS requests squadmates automatically. Add QA for anything they need to test (bug fixes, UI changes).
- **Before asking for review:** open your own Deploy Preview and check your work there first.
- **Merging:** at least one approval is required. For bug fixes, wait for QA to approve before merging.

## Deploy Previews

Every PR gets its own temporary copy of the site, built by Netlify from that PR's branch.

|                  | Live site                 | Deploy Preview                                          |
| ---------------- | ------------------------- | ------------------------------------------------------- |
| **Link**         | slumber-squad.netlify.app | `deploy-preview-<PR number>--slumber-squad.netlify.app` |
| **Shows**        | what's on `main`          | what's on the PR's branch                               |
| **Updates when** | a PR merges into `main`   | a new commit is pushed to the PR's branch               |

**Finding the link:** on the PR page, scroll to the comment from the **Netlify bot** ("✅ Deploy Preview for slumber-squad ready!") and click the preview link.

Test fixes on the **Deploy Preview**, not the live site. The live site won't have the change until the PR merges.

## Reporting Bugs

Bugs live in [GitHub Issues](https://github.com/cherryontech/slumber-squad/issues).

1. Go to **Issues** > **New issue** > **Bug report**
2. Fill in every section of the template: steps to reproduce, expected vs actual behavior, the browser table, severity, and assistive tech if used
3. Add labels (the template adds `bug` automatically):
   - `accessibility` for keyboard, screen reader, contrast, or other a11y issues
4. Click **Create**. The issue gets a number (e.g. `#12`) that devs will reference in their PR.

Examples of well-written bug reports: [#7](https://github.com/cherryontech/slumber-squad/issues/7) and [#8](https://github.com/cherryontech/slumber-squad/issues/8).

**Tips**

- One bug per issue, so each can be fixed and closed on its own
- Test across browsers (Chrome, Edge, Firefox, Norton, Safari if possible) and mark each one in the table
- **Screen reader bugs:** open NVDA's Speech Viewer (NVDA menu > Tools > Speech Viewer) and copy exactly what NVDA said into the issue
- Visual bugs: drag screenshots or a short screen recording into the issue

**Finding bugs later**

- **Open** and **Closed** tabs at the top of the Issues list
- Search with filters, e.g. `is:issue is:closed` or `is:issue label:accessibility`
- A closed issue shows the PR that fixed it under **Development**

## Testing a Fix (QA Workflow)

1. Open the PR. It's linked from the issue under **Development**, or find it in the **Pull requests** tab.
2. Open the **Deploy Preview** link from the Netlify bot comment
3. Follow the PR's **Testing Instructions**, plus the original steps from the bug report
4. Then do one of these:
   - ✅ **Fixed:** on the PR, go to **Files changed** > **Review changes** > **Approve**, and note what you tested (browsers, NVDA, etc.)
   - 🔁 **Still broken:** leave a **comment on the PR**, with your browser, steps, and what you saw (or what NVDA said). The dev pushes a fix to the same PR, and you retest at the same preview link.

**Comment on the PR or log a new issue?**

| Situation                                              | Do this                                                   |
| ------------------------------------------------------ | --------------------------------------------------------- |
| The fix didn't work                                    | Comment on the PR                                         |
| The fix broke something else in the same feature       | Comment on the PR                                         |
| You found a different, unrelated problem while testing | Log a new issue                                           |
| A bug shows up on the live site after the PR merged    | Log a new issue and link the old one (e.g. "Related: #7") |

## Code Style

- **Formatting:** Prettier runs on `npm run format`. Settings live in `.prettierrc` (double quotes, semicolons, 2-space indent).
- **Linting:** `npm run lint` must pass before you open a PR.
- **Components:** one component per file in `src/components/`, pages in `src/pages/`. Name files in PascalCase to match the component: `TaskChip.jsx` for `function TaskChip`.
- **Styling:** Tailwind utility classes. Brand colors and fonts are tokens in `src/index.css` (`bg-brand`, `text-brand`, `text-ink-muted`, `border-line`). Use those instead of hard-coded hex values.
- **Accessibility:** use the right HTML element for the job (`<button>` for actions, `<a>` for navigation, radios for "pick one" choices), give every input a label, and keep visible focus styles. Every UI change should work with keyboard only.
- **Comments:** explain _why_ something is done, not _what_ the code does.

## Gotchas

- **File name casing matters.** Windows and macOS don't care about capital letters in file names, but Netlify's Linux build does. If an import works locally but Netlify says it "cannot resolve" a file, check the capitalization. To rename a file only by case, use `git mv OldName.jsx NewName.jsx`, not a rename in your file explorer.
- **VS Code shows a casing error after a rename:** press `Ctrl+Shift+P` > **TypeScript: Restart TS Server**.
- **Fonts:** load them with a `<link>` in `index.html`, not `@import` in CSS. Vite can drop an `@import` without telling you.
- **Pasting several git commands at once** can freeze the terminal in a pager. Run one command at a time. If you get stuck in a screen ending in `:` or `(END)`, press `q`.