"use client";

import { useState } from "react";
import Header from "@/components/Header";
import Education from "@/components/Education";
import DashedAnimation from "@/animations/DashedAnimation";

const educationItems = [
  {
    status: "2025 - Current",
    title: "Bachelor of Engineering Programme in Software Engineering",
    subtitle: "Mae Fah Luang University",
    description:
      "Coursework spanning programming fundamentals through applied mathematics, alongside self-directed full-stack projects.",
  },
  {
    status: "2024",
    title: "High School Diploma",
    subtitle: "General Educational Development (GED)",
    description:
      "Focus on math, science, and general academics. Supplemented with self-taught programming fundamentals and early web projects.",
  },
  {
    status: "2023",
    title: "Secondary 2 Education",
    subtitle: "ConceptX Learning Center",
    description:
      "Intensive program focused on bridging the academic gap to prepare for high school and university-level studies.",
  },
];

const experienceItems = [
  {
    status: "Current",
    title: "DMWL — Doing More With Less",
    subtitle: "Software Developer",
    description:
      "I help small teams and organizations streamline work through intentional technology design. My focus is on building full-stack applications that handle real-world workflows—approval chains, role-based permissions, and validation that supports how people actually work—rather than just polished demos.",
  },
];

const ExpEduSection = () => {
  const [view, setView] = useState<"Education" | "Experience">("Experience");
  const items = view === "Education" ? educationItems : experienceItems;

  return (
    <div id="exp" className="mt-24 mb-24 pb-6 scroll-mt-32">
      <Header
        title={view}
        subtitle={view === "Education" ? "ongoing" : "project-based"}
      />

      {/* Toggle */}
      <div className="flex mt-9">
        <div className="relative grid grid-cols-2 border-2 border-black dark:border-white shadow-[3px_3px_0_0_rgba(0,0,0,1)] dark:shadow-[3px_3px_0_0_rgba(255,255,255,1)] overflow-hidden">
          {/* Sliding indicator */}
          <div
            className="absolute top-0 bottom-0 w-1/2 transition-transform duration-300 ease-in-out"
            style={{
              backgroundColor: "var(--accent)",
              transform:
                view === "Experience" ? "translateX(0%)" : "translateX(100%)",
            }}
          />

          {/* Center Divider */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -ml-px bg-black dark:bg-white z-20" />

          {(["Experience", "Education"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className="relative z-10 px-4 sm:px-6 py-2 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-colors duration-300"
              style={{
                color:
                  view === tab ? "var(--accent-contrast)" : "var(--foreground)",
              }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div key={view} className="relative mt-2 animate-fade-in">
        <div className="absolute left-1.75 top-2 bottom-2">
          <DashedAnimation orientation="vertical" />
        </div>
        {items.map((item) => (
          <Education key={item.title} {...item} />
        ))}
      </div>
    </div>
  );
};

export default ExpEduSection;
