import Header from "@/components/Header";
import Link from "next/link";
import { projects } from "@/data/projects";
import { FaGithub } from "react-icons/fa";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description: "Explore web development projects, tools, and open-source software built by Rex.",
};

export default function ProjectsPage() {
  return (
    <div className="space-y-8 pb-10">
      {/* Intro block */}
      <div
        className="border-2 border-black dark:border-white p-8 shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] flex flex-col sm:flex-row sm:items-end justify-between gap-6"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <div>
          <p
            className="font-departure-mono text-[10px] uppercase tracking-widest mb-2"
            style={{ color: "var(--accent)" }}
          >
            [ Total Projects ]
          </p>
          <span
            className="font-doto text-[80px] sm:text-[120px] leading-none font-black"
            style={{ color: "var(--accent)" }}
          >
            0{projects.length}
          </span>
        </div>
        <p
          className="font-departure-mono text-sm leading-7 max-w-xs"
          style={{ color: "var(--muted)" }}
        >
          A mix of production apps, side projects, and experiments. Each one
          built around a real problem.
        </p>
      </div>

      <Header title="Projects" subtitle="selected work & experiments" />

      <div className="grid gap-5 lg:grid-cols-2">
        {projects.map((project) => (
          <div
            key={project.id}
            className="flex flex-col border-2 border-black dark:border-white bg-background p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]"
          >
            <div className="flex items-center justify-between gap-3">
              <h2 className="font-departure-mono text-2xl">{project.title}</h2>
              <span
                className="font-departure-mono text-[10px] uppercase tracking-[0.25em]"
                style={{ color: "var(--accent)" }}
              >
                {project.status}
              </span>
            </div>
            <p
              className="mt-4 font-departure-mono text-sm leading-7"
              style={{ color: "var(--muted)" }}
            >
              {project.description}
            </p>
            <div className="mt-5 flex flex-wrap gap-2">
              {project.stack.map((item) => (
                <span
                  key={item}
                  className="rounded-full border border-black/20 dark:border-white/20 px-3 py-1 text-[11px] font-departure-mono uppercase tracking-[0.2em]"
                  style={{ color: "var(--muted)" }}
                >
                  {item}
                </span>
              ))}
            </div>
            <div className="mt-auto pt-6  flex flex-wrap gap-3">
              <Link
                href={`/projects/${project.id}`}
                className="px-4 py-2 font-departure-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                }}
              >
                Details
              </Link>
              {project.link && project.link !== "#" && (
                <Link
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-departure-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--foreground)",
                  }}
                >
                  Demo
                </Link>
              )}
              {project.github && (
                <Link
                  href={project.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-4 py-2 font-departure-mono font-bold uppercase tracking-widest text-[10px] sm:text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[1px_1px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[1px_1px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                  style={{
                    backgroundColor: "var(--card-bg)",
                    color: "var(--foreground)",
                  }}
                >
                  <FaGithub className="text-lg" />
                </Link>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
