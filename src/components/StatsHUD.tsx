const stats = [
  { label: "LVL", value: "2", sub: "Years Exp" },
  { label: "QUESTS", value: "12+", sub: "Projects" },
  { label: "STATUS", value: "Open", sub: "To Work" },
  { label: "WEAPON", value: "Next.js", sub: "Main Stack" },
];

const StatsHUD = () => {
  return (
    <div
      className="w-full mt-16 mb-8 border-2 border-black dark:border-white shadow-[6px_6px_0_0_rgba(0,0,0,1)] dark:shadow-[6px_6px_0_0_rgba(255,255,255,1)] p-1 hover:-translate-y-1 hover:-translate-x-1 hover:shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[8px_8px_0_0_rgba(255,255,255,1)] transition-all duration-300"
      style={{ backgroundColor: "var(--foreground)" }}
    >
      <div
        className="w-full h-full border-2 border-dashed border-black dark:border-white p-4 sm:p-6 flex flex-wrap justify-around items-center gap-6 sm:gap-2"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        {stats.map((stat, idx) => (
          <div
            key={idx}
            className="flex flex-col items-center justify-center text-center flex-1 min-w-25 group cursor-default"
          >
            <span
              className="font-departure-mono uppercase tracking-widest text-[10px] sm:text-[11px] mb-2"
              style={{ color: "var(--accent)" }}
            >
              [{stat.label}]
            </span>
            <span className="font-departure-mono text-2xl sm:text-3xl font-black mb-1 drop-shadow-md group-hover:scale-110 transition-transform">
              {stat.value}
            </span>
            <span
              className="font-departure-mono text-[9px] sm:text-[10px] uppercase tracking-wider"
              style={{ color: "var(--muted)" }}
            >
              {stat.sub}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default StatsHUD;
