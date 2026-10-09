// Single source of truth for work areas and their tasks.
// The homepage, the All work areas page, and every individual work area
// page read from here, so adding a task updates every list, count, and
// filter automatically. To add a new work area, copy an object below.
//
// Work area fields:
//   slug         used in the URL: #work-areas/<slug>
//   name         display name
//   description  short line for the homepage card
//   intro        longer paragraph at the top of the area's own page
//   featured     true = shows in the homepage "Browse by work area" grid
//   stages       optional filter pills on the area page (e.g. Research, Test)
//   tasks        list of tasks (fields below)
//
// Task fields (everything except `title` is optional, and the page
// only shows what's filled in):
//   title        task name
//   stage        which pill it appears under (must match one of `stages`)
//   tools        AI tools the guide covers, e.g. ["Claude", "ChatGPT"]
//   format       e.g. "Tutorial"
//   minutes      estimated time to complete
//   updated      last updated date, "YYYY-MM-DD"
//
// Tasks are listed most popular first; "Sort: Most popular" uses this order.
//
// TODO (content team): replace the placeholder tasks ("Task 1" etc.) and
// the placeholder tools/minutes/dates on the UX/UI tasks with real content,
// and add intros + stages for the other work areas.

export const WORK_AREAS = [
  {
    slug: "ux-ui",
    name: "UX/UI",
    description: "Research, design and test products.",
    intro:
      "Use AI to support your research, design and testing work. Find practical guides, real examples, and hands-on practice for common UX/UI tasks.",
    featured: true,
    stages: ["Research", "Define", "Ideate", "Design", "Test"],
    tasks: [
      {
        title: "Prepare interview questions",
        stage: "Research",
        tools: ["Claude", "ChatGPT", "Gemini"],
        format: "Tutorial",
        minutes: 15,
        updated: "2026-10-07",
      },
      {
        title: "Summarize interview notes",
        stage: "Research",
        tools: ["Claude", "ChatGPT", "Gemini"],
        format: "Tutorial",
        minutes: 15,
        updated: "2026-10-07",
      },
      {
        title: "Analyze open-ended feedback",
        stage: "Research",
        tools: ["Claude", "ChatGPT", "Gemini"],
        format: "Tutorial",
        minutes: 15,
        updated: "2026-10-07",
      },
    ],
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    description: "Clean, analyze and visualize data.",
    intro: "",
    featured: true,
    stages: [],
    tasks: [
      { title: "Analyze a dataset" },
      { title: "Task 2" },
      { title: "Task 3" },
    ],
  },
  {
    slug: "development",
    name: "Development",
    description: "Write, debug and document code.",
    intro: "",
    featured: true,
    stages: [],
    tasks: [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }],
  },
  {
    slug: "product-management",
    name: "Product Management",
    description: "",
    intro: "",
    featured: false,
    stages: [],
    tasks: [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }],
  },
  {
    slug: "project-management",
    name: "Project Management",
    description: "Research, plan and prioritize.",
    intro: "",
    featured: true,
    stages: [],
    tasks: [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }],
  },
  {
    slug: "qa-testing",
    name: "QA/Testing",
    description: "",
    intro: "",
    featured: false,
    stages: [],
    tasks: [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }],
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "",
    intro: "",
    featured: false,
    stages: [],
    tasks: [{ title: "Task 1" }, { title: "Task 2" }, { title: "Task 3" }],
  },
];

export function getWorkArea(slug) {
  return WORK_AREAS.find((area) => area.slug === slug);
}

// Homepage "Popular tasks" row: each entry points at an area + task above.
export const POPULAR_TASKS = [
  { area: "UX/UI", task: "Prepare interview questions" },
  { area: "UX/UI", task: "Summarize interview notes" },
  { area: "Data Analysis", task: "Analyze a dataset" },
];