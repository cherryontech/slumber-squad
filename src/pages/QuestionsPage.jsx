import { useState } from "react";
import ChipGroup from "../components/ChipGroup.jsx";

const ROLES = [
  "UX/UI Designer",
  "Data Analyst",
  "Developer",
  "Software Engineer",
  "Project Manager",
  "Marketing Coordinator",
  "Product Manager",
];

const EXPERIENCE_LEVELS = ["Beginner", "Use it occasionally", "Rockstar"];

function QuestionsPage() {
  const [role, setRole] = useState(null);
  const [experience, setExperience] = useState(null);

  function handleShowGuides() {
    // TODO: route to results filtered by role + experience
    console.log("show guides for:", { role, experience });
  }

  return (
    <main className="flex flex-1 items-center justify-center px-6 py-24">
      <div className="flex w-full max-w-xl flex-col items-center text-center">
        <h1 className="text-3xl sm:text-4xl">Answer these questions</h1>
        <p className="mt-2 text-sm">
          These answers will help us target the resources we show you.
        </p>

        <div className="mt-8 flex flex-col gap-8">
          <ChipGroup
            legend="Select your role"
            hint="Optional, helps us pick the right examples"
            options={ROLES}
            selected={role}
            onSelect={setRole}
          />
          <ChipGroup
            legend="Your experience with AI tools"
            options={EXPERIENCE_LEVELS}
            selected={experience}
            onSelect={setExperience}
          />
        </div>

        <button
          type="button"
          onClick={handleShowGuides}
          className="mt-8 rounded-full bg-brand px-5 py-2 text-sm font-semibold text-white hover:bg-brand-hover focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-brand"
        >
          Show my Guides
        </button>
      </div>
    </main>
  );
}

export default QuestionsPage;