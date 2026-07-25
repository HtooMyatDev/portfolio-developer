"use client";

import { useRouter } from "next/navigation";
import Header from "@/components/Header";
import Image from "next/image";
import { use } from "react";
import { projects } from "@/data/projects";
import Link from "next/link";

export default function ProjectDetail({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = use(params);
  const project = projects.find((p) => p.id === Number(id));
  const router = useRouter();

  if (!project) {
    return (
      <div className="min-h-screen pb-10 flex flex-col items-center gap-3">
        <Header title="Project not found" subtitle="404 Error" />
        <p className="text-center font-departure-mono text-lg mt-3">
          The project you are looking for doesn&apos;t exist.
        </p>
        <Link href="/projects">
          <button className="px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none">
            Back to projects
          </button>
        </Link>
      </div>
    );
  }

  return (
    <div className=" pb-10">
      {/* Hero Section for Project */}
      <div className="flex flex-col gap-8 justify-center items-center mb-12">
        <div className="flex flex-col items-center gap-4 text-center">
          <div
            className="inline-flex items-center gap-3 border-2 border-black dark:border-white px-4 py-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)]"
            style={{ backgroundColor: "var(--accent)" }}
          >
            <span
              className="font-departure-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--accent-contrast)" }}
            >
              {project.category}
            </span>
            <span
              className="font-departure-mono text-[10px] uppercase tracking-widest"
              style={{ color: "var(--accent-contrast)" }}
            >
              {project.status === "active" ? "live" : "in-progress"}
            </span>
          </div>

          <h1 className="font-departure-mono text-4xl sm:text-5xl md:text-6xl max-w-4xl">
            {project.title}
          </h1>

          <div className="flex flex-wrap justify-center gap-3">
            {project.stack.map((tech) => (
              <span
                key={tech}
                className="font-departure-mono text-[10px] uppercase tracking-widest border-2 border-black dark:border-white px-2 py-1 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)]"
                style={{
                  color: "var(--muted)",
                  backgroundColor: "var(--card-bg)",
                }}
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Visual Preview Section */}
      <div className="mb-12">
        <div className="border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
          <Image
            src={project.image}
            alt={project.title}
            width={1200}
            height={600}
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Content Section */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2">
          <div className="flex flex-col gap-6">
            <div>
              <p className="font-departure-mono text-[15px] sm:text-[16px] leading-7">
                {project.longDescription}
              </p>
            </div>

            <div className="flex flex-wrap gap-3">
              <button
                onClick={() => window.open(project.link, "_blank")}
                className="px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                style={{
                  backgroundColor: "var(--accent)",
                  color: "var(--accent-contrast)",
                  borderColor: "var(--foreground)",
                }}
              >
                Visit {project.status === "active" ? "Site" : "Demo"}
              </button>
              <button
                onClick={() => router.back()}
                className="px-5 py-2.5 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
                style={{
                  backgroundColor: "var(--card-bg)",
                  color: "var(--foreground)",
                  borderColor: "var(--border)",
                }}
              >
                ← Back
              </button>
            </div>
          </div>
        </div>

        {/* Sidebar / Quick Info */}
        <div className="lg:col-span-1">
          <div className="border-2 border-black dark:border-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] flex flex-col gap-6">
            <div>
              <h4
                className="font-departure-mono text-sm uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                Year
              </h4>
              <p className="font-departure-mono text-lg">{project.year}</p>
            </div>
            <div>
              <h4
                className="font-departure-mono text-sm uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                Status
              </h4>
              <p className="font-departure-mono text-lg">
                {project.status === "active" ? "Live" : "In Progress"}
              </p>
            </div>
            <div>
              <h4
                className="font-departure-mono text-sm uppercase tracking-widest mb-2"
                style={{ color: "var(--accent)" }}
              >
                Type
              </h4>
              <p className="font-departure-mono text-lg">{project.category}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
