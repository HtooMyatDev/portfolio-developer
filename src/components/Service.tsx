import gsap from "gsap";
import { useEffect, useRef } from "react";

const Service = ({
  title,
  subtitle,
  description,
}: {
  title: string;
  description: string;
  subtitle: string;
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
      className="group border-2 w-full shadow-[5px_5px_0_0_rgba(0,0,0,1)] dark:shadow-[5px_5px_0_0_rgba(255,255,255,1)] hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition-all duration-200 cursor-pointer active:translate-x-0 active:translate-y-0 active:shadow-none flex flex-col"
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
          className="text-[10px] sm:text-xs font-departure-mono font-extrabold uppercase tracking-widest truncate flex-1 text-right"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </p>
      </div>

      {/* Body */}
      <div className="p-4 sm:p-5 flex flex-col gap-3 flex-1">
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
      </div>
    </div>
  );
};

export default Service;
