// Single source of truth for work areas, their stages, and their tasks.
// The homepage, the All work areas page, and every individual work area
// page read from here, so editing this file updates every list, count,
// and filter automatically.
//
// It's laid out like an outline:  work area -> stages -> tasks
//
// Work area fields:
//   slug         used in the URL: #work-areas/<slug>
//   name         display name
//   description  short line for the homepage card
//   intro        longer paragraph at the top of the area's own page
//   featured     true = shows in the homepage "Browse by work area" grid
//   stages       the filter pills on the area's page, in order, each with
//                its own list of tasks
//
// Task fields (everything except `title` is optional, and the cards only
// show what's filled in):
//   title        task name (must be unique within its work area)
//   tools        AI tools the guide covers, e.g. ["Claude", "ChatGPT"]
//   format       e.g. "Tutorial"
//   minutes      estimated time to complete
//   updated      last updated date, "YYYY-MM-DD"
//   href         link to the task's guide page (turns on the card's link + arrow)
//
// Within a stage, list tasks most popular first: "Sort: Most popular"
// and the All work areas preview (first 3 tasks) use this order.
//
// TODO (content team): intros for every area except UX/UI, and homepage
// descriptions for Product Management, QA/Testing, and Marketing.

const AREAS = [
  {
    slug: "ux-ui",
    name: "UX/UI",
    description: "Research, design and test products.",
    intro:
      "Use AI to support your research, design and testing work. Find practical guides, real examples, and hands-on practice for common UX/UI tasks.",
    featured: true,
    stages: [
      {
        name: "Research",
        tasks: [
          { title: "Prepare interview questions" },
          { title: "Summarize interview notes" },
          { title: "Find candidate themes" },
          { title: "Analyze open-ended feedback" },
          { title: "Organize research findings" },
        ],
      },
      {
        name: "Define",
        tasks: [
          { title: "Turn findings into problem statements" },
          { title: "Organize user pain points" },
          { title: "Create HMW questions" },
          { title: "Structure research-backed personas" },
          { title: "Turn findings into design opportunities" },
        ],
      },
      {
        name: "Ideate",
        tasks: [
          { title: "Brainstorm feature ideas" },
          { title: "Explore alternative user flows" },
          { title: "Generate design directions" },
          { title: "Identify edge cases" },
          { title: "Challenge an existing solution" },
        ],
      },
      {
        name: "Design",
        tasks: [
          { title: "Draft UX copy" },
          { title: "Improve empty / error / success states" },
          { title: "Review a user flow" },
          { title: "Generate content hierarchy ideas" },
          { title: "Check accessibility considerations" },
        ],
      },
      {
        name: "Test",
        tasks: [
          { title: "Create usability-test tasks" },
          { title: "Draft usability-test scripts" },
          { title: "Prepare follow-up questions" },
          { title: "Summarize usability findings" },
          { title: "Identify recurring usability issues" },
        ],
      },
    ],
  },
  {
    slug: "data-analysis",
    name: "Data Analysis",
    description: "Clean, analyze and visualize data.",
    intro: "",
    featured: true,
    stages: [
      {
        name: "Prepare",
        tasks: [
          { title: "Understand an unfamiliar dataset" },
          { title: "Clean messy data" },
          { title: "Identify missing values" },
          { title: "Standardize categories" },
          { title: "Prepare data for analysis" },
        ],
      },
      {
        name: "Explore",
        tasks: [
          { title: "Generate exploratory questions" },
          { title: "Find patterns and anomalies" },
          { title: "Compare groups" },
          { title: "Identify possible relationships" },
          { title: "Decide which metrics to examine" },
        ],
      },
      {
        name: "Analyze",
        tasks: [
          { title: "Write SQL queries" },
          { title: "Explain statistical concepts" },
          { title: "Interpret analysis outputs" },
          { title: "Debug formulas or queries" },
          { title: "Suggest analysis methods" },
        ],
      },
      {
        name: "Visualize",
        tasks: [
          { title: "Choose the right chart" },
          { title: "Generate visualization code" },
          { title: "Improve chart labels" },
          { title: "Explain a visualization" },
          { title: "Create dashboard ideas" },
        ],
      },
      {
        name: "Communicate",
        tasks: [
          { title: "Summarize findings" },
          { title: "Turn analysis into business insights" },
          { title: "Prepare an executive summary" },
          { title: "Explain findings to non-technical teams" },
          { title: "Draft a data presentation" },
        ],
      },
    ],
  },
  {
    slug: "development",
    name: "Development",
    description: "Write, debug and document code.",
    intro: "",
    featured: true,
    stages: [
      {
        name: "Understand",
        tasks: [
          { title: "Explain unfamiliar code" },
          { title: "Explain an error message" },
          { title: "Understand an API" },
          { title: "Understand a codebase section" },
          { title: "Explain a technical concept" },
        ],
      },
      {
        name: "Build",
        tasks: [
          { title: "Generate starter code" },
          { title: "Create a function" },
          { title: "Work with an API" },
          { title: "Generate sample data" },
          { title: "Draft a small component" },
        ],
      },
      {
        name: "Debug",
        tasks: [
          { title: "Debug code" },
          { title: "Analyze stack traces" },
          { title: "Find possible causes of an error" },
          { title: "Compare possible fixes" },
          { title: "Troubleshoot unexpected behaviour" },
        ],
      },
      {
        name: "Improve",
        tasks: [
          { title: "Refactor code" },
          { title: "Improve readability" },
          { title: "Improve performance" },
          { title: "Review code" },
          { title: "Identify security concerns" },
        ],
      },
      {
        name: "Test & Document",
        tasks: [
          { title: "Generate unit tests" },
          { title: "Identify edge cases" },
          { title: "Write technical documentation" },
          { title: "Generate code comments" },
          { title: "Draft README content" },
        ],
      },
    ],
  },
  {
    slug: "product-management",
    name: "Product Management",
    description: "",
    intro: "",
    featured: false,
    stages: [
      {
        name: "Discover",
        tasks: [
          { title: "Summarize customer interviews" },
          { title: "Analyze customer feedback" },
          { title: "Identify recurring pain points" },
          { title: "Analyze competitors" },
          { title: "Prepare discovery questions" },
        ],
      },
      {
        name: "Define",
        tasks: [
          { title: "Write problem statements" },
          { title: "Define product opportunities" },
          { title: "Draft product requirements" },
          { title: "Write user stories" },
          { title: "Create acceptance criteria" },
        ],
      },
      {
        name: "Prioritize",
        tasks: [
          { title: "Compare feature ideas" },
          { title: "Organize feature requests" },
          { title: "Prepare prioritization criteria" },
          { title: "Identify assumptions" },
          { title: "Identify product risks" },
        ],
      },
      {
        name: "Plan",
        tasks: [
          { title: "Break an MVP into features" },
          { title: "Define MVP scope" },
          { title: "Create a roadmap draft" },
          { title: "Prepare sprint priorities" },
          { title: "Identify dependencies" },
        ],
      },
      {
        name: "Communicate",
        tasks: [
          { title: "Draft stakeholder updates" },
          { title: "Prepare product presentations" },
          { title: "Summarize decisions" },
          { title: "Draft release notes" },
          { title: "Translate technical information" },
        ],
      },
    ],
  },
  {
    slug: "project-management",
    name: "Project Management",
    description: "Research, plan and prioritize.",
    intro: "",
    featured: true,
    stages: [
      {
        name: "Initiate",
        tasks: [
          { title: "Define project goals" },
          { title: "Identify stakeholders" },
          { title: "Clarify scope" },
          { title: "Draft a project brief" },
          { title: "Identify assumptions" },
        ],
      },
      {
        name: "Plan",
        tasks: [
          { title: "Create a project plan" },
          { title: "Break work into tasks" },
          { title: "Identify dependencies" },
          { title: "Estimate project phases" },
          { title: "Prepare milestones" },
        ],
      },
      {
        name: "Manage",
        tasks: [
          { title: "Identify project risks" },
          { title: "Prepare mitigation ideas" },
          { title: "Organize action items" },
          { title: "Track blockers" },
          { title: "Prepare meeting agendas" },
        ],
      },
      {
        name: "Meetings",
        tasks: [
          { title: "Summarize meeting notes" },
          { title: "Extract action items" },
          { title: "Identify decisions" },
          { title: "Prepare follow-up questions" },
          { title: "Draft meeting recaps" },
        ],
      },
      {
        name: "Report",
        tasks: [
          { title: "Write status updates" },
          { title: "Prepare stakeholder updates" },
          { title: "Summarize progress" },
          { title: "Explain delays" },
          { title: "Draft project retrospectives" },
        ],
      },
    ],
  },
  {
    slug: "qa-testing",
    name: "QA/Testing",
    description: "",
    intro: "",
    featured: false,
    stages: [
      {
        name: "Understand Requirements",
        tasks: [
          { title: "Review acceptance criteria" },
          { title: "Find unclear requirements" },
          { title: "Identify missing scenarios" },
          { title: "Turn requirements into testable conditions" },
        ],
      },
      {
        name: "Plan Testing",
        tasks: [
          { title: "Create a test plan" },
          { title: "Identify test scenarios" },
          { title: "Prioritize testing areas" },
          { title: "Plan regression testing" },
        ],
      },
      {
        name: "Create Tests",
        tasks: [
          { title: "Write test cases" },
          { title: "Generate edge cases" },
          { title: "Create negative test cases" },
          { title: "Generate sample test data" },
          { title: "Draft accessibility test cases" },
        ],
      },
      {
        name: "Investigate Issues",
        tasks: [
          { title: "Analyze bug symptoms" },
          { title: "Improve bug reports" },
          { title: "Suggest reproduction steps" },
          { title: "Group similar bugs" },
          { title: "Identify possible root causes" },
        ],
      },
      {
        name: "Report",
        tasks: [
          { title: "Summarize testing results" },
          { title: "Draft QA status updates" },
          { title: "Organize defects by severity" },
          { title: "Prepare release-readiness notes" },
        ],
      },
    ],
  },
  {
    slug: "marketing",
    name: "Marketing",
    description: "",
    intro: "",
    featured: false,
    stages: [
      {
        name: "Research",
        tasks: [
          { title: "Analyze competitors" },
          { title: "Summarize customer feedback" },
          { title: "Research audience questions" },
          { title: "Identify content themes" },
          { title: "Organize market research" },
        ],
      },
      {
        name: "Strategy",
        tasks: [
          { title: "Brainstorm campaign ideas" },
          { title: "Define campaign messaging" },
          { title: "Create content pillars" },
          { title: "Generate positioning ideas" },
          { title: "Develop channel ideas" },
        ],
      },
      {
        name: "Content",
        tasks: [
          { title: "Draft social posts" },
          { title: "Draft email copy" },
          { title: "Draft landing-page copy" },
          { title: "Create blog outlines" },
          { title: "Rewrite content for different audiences" },
        ],
      },
      {
        name: "Optimize",
        tasks: [
          { title: "Improve headlines" },
          { title: "Generate CTA variations" },
          { title: "Adapt content for different channels" },
          { title: "Improve clarity and tone" },
          { title: "Generate A/B test ideas" },
        ],
      },
      {
        name: "Report",
        tasks: [
          { title: "Summarize campaign performance" },
          { title: "Explain marketing metrics" },
          { title: "Turn results into insights" },
          { title: "Prepare campaign reports" },
          { title: "Draft stakeholder updates" },
        ],
      },
    ],
  },
];

// The pages work with a flat task list where each task knows its stage,
// so we flatten the outline above once here:
//   stages: [{ name, tasks }]  ->  stages: ["Research", ...]
//                                  tasks:  [{ title, stage: "Research" }, ...]
export const WORK_AREAS = AREAS.map((area) => ({
  ...area,
  stages: area.stages.map((stage) => stage.name),
  tasks: area.stages.flatMap((stage) =>
    stage.tasks.map((task) => ({ ...task, stage: stage.name }))
  ),
}));

export function getWorkArea(slug) {
  return WORK_AREAS.find((area) => area.slug === slug);
}

// Homepage "Popular tasks" row: each entry points at an area + task above.
export const POPULAR_TASKS = [
  { area: "UX/UI", task: "Prepare interview questions" },
  { area: "UX/UI", task: "Summarize interview notes" },
  { area: "Data Analysis", task: "Clean messy data" },
];