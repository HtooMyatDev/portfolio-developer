"use client";
import { useIntersection } from "@mantine/hooks";

const Education = ({
  status,
  title,
  subtitle,
  description,
}: {
  status: string;
  title: string;
  subtitle: string;
  description: string;
}) => {
  const { ref, entry } = useIntersection({
    threshold: 0.5,
  });

  const isVisible = entry?.isIntersecting;

  return (
    <div
      ref={ref}
      className="mt-8 flex items-start gap-6 group relative w-full"
    >
      {/* Bullet */}
      <div
        className={`mt-1 border-2 p-0.5 z-10 group-hover:scale-125 transition-all duration-500 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-0"
        }`}
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        <div
          className="w-2 h-2 transition-colors duration-300"
          style={{ backgroundColor: "var(--accent)" }}
        ></div>
      </div>

      {/* Card */}
      <div
        className="flex-1 border-2 p-5 transition-all duration-300 relative shadow-[4px_4px_0_0_rgba(0,0,0,0.08)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.08)] group-hover:-translate-y-1 group-hover:-translate-x-1 group-hover:shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:group-hover:shadow-[6px_6px_0_0_rgba(255,255,255,1)]"
        style={{
          borderColor: "var(--border)",
          backgroundColor: "var(--card-bg)",
        }}
      >
        {/* Status Badge */}
        <div
          className="absolute top-4 right-4 border px-2 py-1 text-[10px] uppercase font-departure-mono tracking-widest transition-colors"
          style={{
            borderColor: "var(--border)",
            color: "var(--muted)",
            backgroundColor: "var(--background)",
          }}
        >
          {status}
        </div>

        <h3
          className="text-xl md:text-2xl font-departure-mono font-bold mb-2 transition-colors pr-20"
          style={{ color: "var(--foreground)" }}
        >
          {title}
        </h3>
        <p
          className="text-md md:text-lg font-departure-mono font-bold mb-3 flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <span
            className="w-3 h-0.5 inline-block"
            style={{ backgroundColor: "var(--accent)" }}
          ></span>
          {subtitle}
        </p>
        <p
          className="text-sm md:text-base font-departure-mono leading-relaxed"
          style={{ color: "var(--muted)" }}
        >
          {description}
        </p>
      </div>
    </div>
  );
};

export default Education;
