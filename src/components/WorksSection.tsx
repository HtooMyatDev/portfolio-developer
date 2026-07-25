"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Link from "next/link";
import Header from "@/components/Header";
import Work from "@/components/Work";
import { projects } from "@/data/projects";

const WorksSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;
    
    gsap.fromTo(
      ".work-card",
      { opacity: 0, y: -30, scale: 0.95 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.4,
        stagger: 0.15,
        ease: "power4.out",
        scrollTrigger: {
          trigger: containerRef.current,
          start: "top 80%",
        }
      }
    );
  }, []);

  return (
    <div ref={containerRef} id="works" className="mt-24 pb-6 flex flex-col gap-8 scroll-mt-32">
    <Header title="Featured Works" subtitle="02 projects / in progress" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
      {projects.slice(0, 2).map((work) => (
        <Work
          key={work.id}
          id={work.id}
          title={work.title}
          status={work.status}
          stack={work.stack}
          subtitle={work.category}
          description={work.longDescription}
          image={work.image}
        />
      ))}
    </div>

    <Link
      href="/projects"
      className="w-full block text-center mt-6 px-4 py-3 font-departure-mono font-bold uppercase tracking-widest text-xs cursor-pointer transition-all border-2 border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none"
      style={{
        backgroundColor: "var(--accent)",
        color: "var(--accent-contrast)",
      }}
    >
      View All Projects
    </Link>
    </div>
  );
};

export default WorksSection;
