// Full tutorial content, keyed by "<work area slug>/<task slug>".
// A task with an entry here gets the tutorial pages:
//   #work-areas/ux-ui/prepare-interview-questions          overview
//   #work-areas/ux-ui/prepare-interview-questions/step-2   one step
//   #work-areas/ux-ui/prepare-interview-questions/done     finished
// Every other task shows a "guide coming soon" page instead, so adding a
// new tutorial is just adding an entry to this file.
//
// Fields:
//   level, topic     the pills above the title ("Beginner", "UX Research")
//   intro            line under the title in the purple banner
//   howAiCanHelp     section 01
//   beforeYouStart   section 02, cards: { title, text }
//   toolsIntro       section 03 intro line
//   tools            section 03 cards: { name, use, logo }
//                    logo = an image in the public/ folder, e.g.
//                    "/logos/chatgpt.svg". Until the file is added, the
//                    card shows the tool's first letter instead.
//   steps            section 04 + the step pages:
//                    title        step name
//                    description  short line (section 04 and the stepper)
//                    summary      paragraph under the title on the step page
//                    worked       "What worked"
//                    didnt        "What didn't work first"
//                    trippedUp    "This tripped others up too: ..."
//                    sameHere     starting number on the "Same here" button
//   prompt           section 05, the copyable prompt
//   example          section 06
//   checklistIntro   section 07 intro line
//   checklist        section 07 items
//
// TODO (content team): text marked "TODO: placeholder" wasn't in the
// mockups; please replace it with final copy.
//
// "Same here" counts: there's no backend to add up everyone's clicks, so
// each step starts from the number below (TODO: placeholder) and your own
// click adds 1, saved on your device.

export const TUTORIALS = {
  "ux-ui/prepare-interview-questions": {
    level: "Beginner",
    topic: "UX Research",
    intro:
      "Learn how AI can help you prepare clear, relevant and unbiased interview questions for UX research, and follow a simple workflow to get started.",
    howAiCanHelp:
      "AI can turn a research goal into a first draft of interview questions in minutes. It suggests angles you might miss and rewords questions that lead the participant. You still decide what to ask, so treat the draft as a starting point.",
    beforeYouStart: [
      {
        title: "Know your goal",
        text: "Write down what you want to learn in a sentence or two. The clearer the goal, the better the questions.",
      },
      {
        title: "Know your participants",
        text: "Note who you're talking to and what they do. A few lines of context is enough.",
      },
      {
        title: "Protect your data",
        text: "Leave out names, company details, and anything confidential. If you're unsure, check your team's AI policy.",
      },
    ],
    toolsIntro:
      "Any of these can draft questions. Use the one your team already has.",
    tools: [
      {
        name: "ChatGPT",
        use: "Summarize notes and find patterns",
        logo: "/logos/chatgpt.svg",
      },
      {
        name: "Claude",
        use: "Analyze transcripts",
        logo: "/logos/claude.svg",
      },
      {
        name: "Copilot",
        // Mockup says "Brainstrming"; typo fixed
        use: "Research and Brainstorming",
        logo: "/logos/copilot.svg",
      },
    ],
    // NOTE: these steps read like "Summarize interview notes"; built as
    // designed, flagged for the design team.
    steps: [
      {
        title: "Collect your notes",
        description:
          "Collect three to five interviews and remove sensitive details.",
        // TODO: placeholder (summary, worked, didnt, trippedUp, sameHere)
        summary:
          "Put your notes from three to five interviews in one document so you can paste them in one go.",
        worked:
          "Keeping everything in one plain text document, so it was easy to paste.",
        didnt:
          "Copying notes from several tools at once. Formatting got lost and notes got mixed up.",
        trippedUp: "Many people weren't sure how many interviews is enough.",
        sameHere: 5,
      },
      {
        title: "Ask AI to find themes",
        description:
          "Ask AI to find themes with the notes that support each one.",
        summary:
          "Collect notes from three to five interviews in one document and remove names or anything sensitive.",
        worked:
          "Pasting raw notes as they were. AI handles messy bullet points fine, so no cleanup is needed.",
        didnt:
          "Uploading full transcripts with participant names. Remove identifying details before you paste anything.",
        trippedUp: "Many people weren't sure what counts as sensitive.",
        sameHere: 8, // from the mockup
      },
      {
        title: "Check the themes",
        description: "Compare them with what participants actually said.",
        // TODO: placeholder (summary, worked, didnt, trippedUp, sameHere)
        summary:
          "Read each theme next to your notes. Remove anything the AI made up and merge themes that say the same thing.",
        worked:
          "Asking the AI to quote the note each theme came from, so it was easy to check.",
        didnt: "Trusting the first list as is. One theme wasn't in the notes.",
        trippedUp: "Many people weren't sure how many themes is too many.",
        sameHere: 6,
      },
      {
        title: "Turn them into insights",
        description: "Turn patterns into a few clear takeaways you can act on.",
        // TODO: placeholder (summary, worked, didnt, trippedUp, sameHere)
        summary:
          "For each theme, write one takeaway: what it means and what you'd do about it.",
        worked: "Keeping each insight to one sentence.",
        didnt: "Asking for insights with no goal. They came back generic.",
        trippedUp:
          "Many people weren't sure how an insight is different from a theme.",
        sameHere: 4,
      },
      {
        title: "Share your findings",
        description: "Generate a summary deck and share it",
        // TODO: placeholder (summary, worked, didnt, trippedUp, sameHere)
        summary:
          "Ask AI to turn your insights into a short summary deck, then check it before you share it with your team.",
        worked: "Asking for one slide per insight.",
        didnt: "Sharing the AI's draft without reading it first.",
        trippedUp: "Many people weren't sure whether to say they used AI.",
        sameHere: 3,
      },
    ],
    prompt:
      "I'm preparing for user interviews about [topic]. My goal is to learn [what you want to understand]. The participants are [who they are and what they do]. Write 8 open-ended interview questions that start broad and get more specific. Avoid leading questions and yes/no questions. Don't assume the participant uses our product.",
    example:
      "Prompt: I'm preparing for user interviews about how freelancers track invoices. My goal is to learn where the process breaks down. The participants are freelance designers who bill 3 or more clients a month. Write 8 open-ended questions...",
    checklistIntro:
      "Before you use the questions, check each one against this list.",
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
