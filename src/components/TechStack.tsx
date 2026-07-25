"use client";

import { useState, useEffect, useRef } from "react";
import gsap from "gsap";
import Header from "@/components/Header";

type ViewMode = "list" | "cards";
type CategoryFilter = "all" | "frontend" | "backend" | "data" | "exploring";

const techStack = [
  { language: "frontend", name: "Next.js", category: "Framework", percent: 85 },
  { language: "backend", name: "Laravel", category: "Framework", percent: 85 },
  {
    language: "frontend",
    name: "TypeScript",
    category: "Language",
    percent: 60,
  },
  { language: "frontend", name: "React", category: "Library", percent: 90 },
  {
    language: "frontend",
    name: "Tailwind CSS",
    category: "Styling",
    percent: 95,
  },
  { language: "data", name: "Prisma", category: "ORM", percent: 75 },
  { language: "data", name: "PostgreSQL", category: "Database", percent: 70 },
  { language: "backend", name: "Node.js", category: "Runtime", percent: 80 },
  { language: "backend", name: "Express.js", category: "Runtime", percent: 80 },
  { language: "frontend", name: "GSAP", category: "Animation", percent: 30 },
  { language: "data", name: "MongoDB", category: "Database", percent: 60 },
  // Exploring
  { language: "exploring", name: "Go", category: "Language", percent: 20 },
  { language: "exploring", name: "Docker", category: "DevOps", percent: 25 },
  {
    language: "exploring",
    name: "Web3/Solidity",
    category: "Blockchain",
    percent: 15,
  },
];

const ProgressBar = ({ percent }: { percent: number }) => (
  <div className="w-full h-2 border-2 border-black dark:border-white bg-background overflow-hidden">
    <div
      className="h-full transition-all duration-500"
      style={{ width: `${percent}%`, backgroundColor: "var(--accent)" }}
    />
  </div>
);

const filters = [
  { id: "all", label: "All Tech" },
  { id: "frontend", label: "Frontend" },
  { id: "backend", label: "Backend" },
  { id: "data", label: "Data & Infra" },
  { id: "exploring", label: "Exploring" },
];

const TechStack = () => {
  const [view, setView] = useState<ViewMode>("cards");
  const [activeFilter, setActiveFilter] = useState<CategoryFilter>("all");
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    // Hard stamping animation for neobrutalism
    gsap.fromTo(
      ".tech-item",
      { opacity: 0, scale: 1.1, y: 15 },
      {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.3,
        stagger: 0.05,
        ease: "power4.out",
        clearProps: "all"
      }
    );
  }, [view, activeFilter]);

  const displayedTech = techStack.filter(
    (tech) => activeFilter === "all" || tech.language === activeFilter,
  );

  return (
    <div ref={containerRef} className="mt-24 mb-24 pb-6 flex flex-col gap-8">
      <Header title="Tech Stack" subtitle="My Arsenal" />

      {/* Controls */}
      <div className="flex flex-col md:flex-row justify-between gap-4">
        {/* Category filters */}
        <div className="flex flex-wrap gap-2">
          {filters.map((filter) => (
            <button
              key={filter.id}
              onClick={() => setActiveFilter(filter.id as CategoryFilter)}
              className="px-4 py-2 font-departure-mono text-[10px] sm:text-xs uppercase tracking-widest border-2 border-black dark:border-white transition-all cursor-pointer shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:-translate-x-0.5 hover:shadow-[3px_3px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[3px_3px_0_0_rgba(255,255,255,1)]"
              style={{
                backgroundColor:
                  activeFilter === filter.id
                    ? "var(--accent)"
                    : "var(--card-bg)",
                color:
                  activeFilter === filter.id
                    ? "var(--accent-contrast)"
                    : "var(--foreground)",
              }}
            >
              {filter.label}
            </button>
          ))}
        </div>

        {/* View toggle */}
        <div className="relative grid grid-cols-2 w-40 border-2 border-black dark:border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] h-fit shrink-0 overflow-hidden">
          {/* Sliding indicator */}
          <div
            className="absolute top-0 bottom-0 w-1/2 transition-transform duration-300 ease-in-out"
            style={{
              backgroundColor: "var(--accent)",
              transform:
                view === "list" ? "translateX(0%)" : "translateX(100%)",
            }}
          />

          {/* Center Divider */}
          <div className="absolute top-0 bottom-0 left-1/2 w-0.5 -ml-px bg-black dark:bg-white z-20" />

          {(["list", "cards"] as const).map((tab) => (
            <button
              key={tab}
              onClick={() => setView(tab)}
              className="relative z-10 py-2 font-departure-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer duration-300 flex items-center justify-center w-full"
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

      {/* Content */}
      <div key={view} className="min-h-100 animate-fade-in">
        {view === "list" && (
          <div className="flex flex-col border-2 border-black dark:border-white">
            {displayedTech.map((tech, i) => (
              <div
                key={tech.name}
                className={`tech-item flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 px-5 py-3 ${
                  i !== displayedTech.length - 1
                    ? "border-b-2 border-black dark:border-white"
                    : ""
                } transition-colors hover:bg-(--accent-soft)`}
                style={{ backgroundColor: "var(--card-bg)" }}
              >
                <span className="font-departure-mono text-sm w-32 shrink-0">
                  {tech.name}
                </span>
                <span
                  className="font-departure-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs w-24 shrink-0"
                  style={{ color: "var(--accent)" }}
                >
                  {tech.category}
                </span>
                <div className="flex-1 min-w-50">
                  <ProgressBar percent={tech.percent} />
                </div>
              </div>
            ))}
            {displayedTech.length === 0 && (
              <div
                className="p-8 text-center font-departure-mono text-sm"
                style={{ color: "var(--muted)" }}
              >
                No technologies found.
              </div>
            )}
          </div>
        )}

        {view === "cards" && (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {displayedTech.map((tech) => (
              <div
                key={tech.name}
                className="tech-item bg-background text-foreground p-4 border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)] transition-all cursor-default flex flex-col gap-3 group"
              >
                <div className="flex flex-col gap-1">
                  <span className="font-departure-mono text-sm">{tech.name}</span>
                  <span
                    className="font-departure-mono font-bold uppercase tracking-widest text-[10px]"
                    style={{ color: "var(--accent)" }}
                  >
                    {tech.category}
                  </span>
                </div>
                <div className="mt-auto flex flex-col gap-1">
                  <ProgressBar percent={tech.percent} />
                  <span className="font-departure-mono font-bold text-[10px] self-end group-hover:animate-pulse">
                    {tech.percent}%
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default TechStack;
