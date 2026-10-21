// Full tutorial content, keyed by "<work area slug>/<task slug>".
// A task with an entry here gets the tutorial pages:
//   #work-areas/ux-ui/prepare-interview-questions          overview
//   #work-areas/ux-ui/prepare-interview-questions/step-2   one step
//   #work-areas/ux-ui/prepare-interview-questions/done     finished
// Every other task shows a "guide coming soon" page instead, so adding a
// new tutorial is just adding an entry to this file.
//
// Fields:
//   level, topic     the tags under the title ("Beginner", "UX Research")
//   intro            paragraph under the title
//   howAiCanHelp     section 01, a list of paragraphs
//   beforeYouStart   section 02, cards: { title, text }
//   tools            section 03, cards: { name, use }
//   steps            section 04 + the step pages:
//                    { title, summary, worked, didnt, trippedUp }
//   prompt           section 05, the copyable prompt ([brackets] = fill in)
//   example          section 06: { prompt, result: [lines] }
//   checklist        section 07, questions to check the AI's answer
//
// TODO (content team): text marked "TODO: placeholder" below was written
// to fill the layout. Please replace it with the final copy from Figma.

export const TUTORIALS = {
  "ux-ui/prepare-interview-questions": {
    level: "Beginner",
    topic: "UX Research",
    // TODO: placeholder
    intro:
      "Good interview questions are open, neutral, and tied to what you want to learn. Use AI to get a strong first draft fast, then shape it with your own judgment.",
    // TODO: placeholder
    howAiCanHelp: [
      "AI can turn a research goal into a first set of interview questions in seconds, so you start by editing instead of facing a blank page.",
      "It can also spot leading or yes/no questions and suggest neutral rewrites. You still decide what to ask: you know your participants and your product.",
    ],
    beforeYouStart: [
      // TODO: placeholder text (titles are from the mockup)
      {
        title: "Know your goal",
        text: "Write one sentence about what you want to learn. The clearer the goal, the better the questions.",
      },
      {
        title: "Know your participants",
        text: "Note who you're talking to and what they do, so the questions fit their day-to-day.",
      },
      {
        title: "Protect your data",
        text: "Don't paste names, emails, or anything that identifies a person or your company's private plans.",
      },
    ],
    tools: [
      { name: "ChatGPT", use: "Summarize notes and find patterns" },
      { name: "Claude", use: "Analyze transcripts" },
      // Mockup says "Brainstrming"; fixed the typo here
      { name: "Copilot", use: "Research and brainstorming" },
    ],
    // NOTE: these 5 steps are from the mockup. They read like the steps for
    // "Summarize interview notes", so the design team may want to swap them.
    steps: [
      {
        title: "Collect your notes",
        // TODO: placeholder
        summary:
          "Gather everything you already know: your research goal, who the participants are, and any notes from past conversations.",
        worked:
          "Keeping everything in one plain text document, so it's easy to paste in one go.",
        didnt:
          "Copying in notes from several tools at once. Formatting got lost and the AI mixed up which note was which.",
        trippedUp:
          "Many people weren't sure how much background to include. A few sentences is plenty.",
      },
      {
        title: "Ask AI to find themes",
        // TODO: placeholder summary (worked / didn't / tripped up are from the mockup)
        summary:
          "Paste your notes and ask the AI to group them into themes. Themes tell you which topics your questions need to cover.",
        worked:
          "Pasting raw notes as they were. AI handles messy bullet points fine, so no cleanup is needed.",
        didnt:
          "Uploading full transcripts with participant names. Remove identifying details before you paste anything.",
        trippedUp: "Many people weren't sure what counts as sensitive.",
      },
      {
        title: "Check the themes",
        // TODO: placeholder
        summary:
          "Read each theme against your notes. Remove anything the AI made up, and merge themes that say the same thing.",
        worked:
          "Asking the AI to quote the note each theme came from, so it's easy to check.",
        didnt:
          "Trusting the first list as is. One theme wasn't in the notes at all.",
        trippedUp:
          "Many people weren't sure how many themes is too many. Three to five is a good range.",
      },
      {
        title: "Turn them into insights",
        // TODO: placeholder
        summary:
          "For each theme, write what it means for your research and the question you most need answered.",
        worked:
          "Using the prompt in this guide to turn each insight into open-ended questions.",
        didnt:
          "Asking for “good questions” with no goal. The questions came back generic.",
        trippedUp:
          "Many people weren't sure how an insight is different from a theme.",
      },
      {
        title: "Share your findings",
        // TODO: placeholder
        summary:
          "Share the final questions with your team before the interviews, and note which ones the AI helped write.",
        worked:
          "Sharing the questions with one teammate for a quick check on tone and order.",
        didnt:
          "Sending the AI's raw output. It still had a leading question in it.",
        trippedUp:
          "Many people weren't sure whether to say they used AI. Being open about it builds trust.",
      },
    ],
    prompt:
      "I'm preparing for user interviews about [topic]. My goal is to learn [what you want to understand]. The participants are [who they are and what they do]. Write 8 open-ended interview questions that start broad and get more specific. Avoid leading questions and yes/no questions. Don't assume the participant uses our product.",
    example: {
      prompt:
        "I'm preparing for user interviews about how freelancers track invoices. My goal is to learn where the process breaks down. The participants are freelance designers who bill 3 or more clients a month. Write 8 open-ended interview questions that start broad and get more specific. Avoid leading questions and yes/no questions. Don't assume the participant uses our product.",
      // TODO: placeholder (shortened example answer)
      result: [
        "Walk me through what happens after you finish a project for a client.",
        "How do you keep track of who owes you money right now?",
        "Tell me about the last time an invoice was paid late. What happened?",
        "What part of billing takes longer than you'd like?",
      ],
    },
    checklist: [
      "Is it open-ended?",
      "Is it neutral, with no hint of the “right” answer?",
      "Does it ask about one thing at a time?",
      "Does it connect to your goal?",
      "Can you get through them all in your interview time?",
    ],
  },
};

export function getTutorial(areaSlug, taskSlug) {
  return TUTORIALS[`${areaSlug}/${taskSlug}`];
}
