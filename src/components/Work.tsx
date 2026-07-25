import Image from "next/image";
import gsap from "gsap";
import { useEffect, useRef } from "react";
import Link from "next/link";

const Work = ({
  title,
  id,
  description,
  subtitle,
  stack,
  image,
  status,
}: {
  title: string;
  id: number;
  description: string;
  subtitle: string;
  stack: string[];
  image: string;
  status: string;
}) => {
  const pulseRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!pulseRef.current) return;
    gsap.to(pulseRef.current, {
      scale: 0.7,
      opacity: 0.5,
      duration: 0.9,
      repeat: -1,
      yoyo: true,
      ease: "steps(2)",
    });
  }, []);

  return (
    <div
      className="work-card group border-2 w-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] dark:shadow-[5px_5px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition-all duration-200 cursor-pointer active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-col"
      style={{
        backgroundColor: "var(--card-bg)",
        borderColor: "var(--border)",
      }}
    >
      {/* Top Bar */}
      <div
        className="flex justify-between items-center gap-2 px-3 py-1.5 border-b-2"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        <div className="flex gap-1.5 items-center shrink-0">
          <div
            className="h-2 w-2"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--foreground) 24%, transparent)",
            }}
          ></div>
          <div
            ref={pulseRef}
            className="h-2 w-2"
            style={{ backgroundColor: "var(--accent)" }}
          ></div>
          <div
            className="h-2 w-2"
            style={{
              backgroundColor:
                "color-mix(in srgb, var(--foreground) 24%, transparent)",
            }}
          ></div>
        </div>
        <p
          className="text-[10px] sm:text-xs font-doto font-extrabold uppercase tracking-widest truncate flex-1 text-right"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </p>
        <span
          className="shrink-0 border text-[9px] font-departure-mono uppercase px-1.5 py-0.5 tracking-wider"
          style={{ borderColor: "var(--accent)", color: "var(--accent)" }}
        >
          {status}
        </span>
      </div>

      {/* Image */}
      <div className="relative overflow-hidden border-b-2 border-black dark:border-white">
        <Image
          width={500}
          height={300}
          src={image}
          alt={subtitle}
          className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500"
        />
        {/* Hover overlay */}
        <Link
          href={`/projects/${id}`}
          className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-colors duration-300 flex items-center justify-center"
        >
          <span className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 border-2 border-white text-white text-xs font-departure-mono uppercase px-4 py-2 tracking-widest shadow-[2px_2px_0_0_rgba(255,255,255,0.4)]">
            View Project →
          </span>
        </Link>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
        {/* Stack Tags */}
        <ul className="flex gap-1.5 flex-wrap">
          {stack.map((item, index) => (
            <li
              key={index}
              className="border px-2 py-0.5 text-[9px] sm:text-[10px] font-departure-mono font-bold uppercase tracking-widest transition-colors"
              style={{ borderColor: "var(--border)", color: "var(--muted)" }}
            >
              {item}
            </li>
          ))}
        </ul>

        <div>
          <h3
            className="text-lg sm:text-xl font-departure-mono font-bold mb-1 transition-colors"
            style={{ color: "var(--foreground)" }}
          >
            {subtitle}
          </h3>
          <p
            className="font-departure-mono text-sm leading-relaxed line-clamp-3"
            style={{ color: "var(--muted)" }}
          >
            {description}
          </p>
        </div>

        {/* Footer */}
        <div className="mt-auto pt-3 border-t border-black/10 dark:border-white/10 flex items-center justify-between">
          <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-1 h-1 transition-colors duration-150"
                style={{
                  backgroundColor: "var(--muted)",
                  transitionDelay: `${i * 50}ms`,
                }}
              />
            ))}
          </div>
          <span
            className="text-[9px] font-doto font-bold uppercase tracking-widest transition-colors"
            style={{ color: "var(--accent)" }}
          >
            open →
          </span>
        </div>
      </div>
    </div>
  );
};

export default Work;
