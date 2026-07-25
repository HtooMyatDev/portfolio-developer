import Link from "next/link";
import DashedAnimation from "@/animations/DashedAnimation";

const NotFound = () => {
  return (
    <div className="min-h-[70vh] flex flex-col items-center justify-center text-center gap-6 py-24">
      <p
        className="font-departure-mono font-black text-xs uppercase flex items-center gap-2"
        style={{ color: "var(--accent)" }}
      >
        <span
          className="inline-block w-2 h-2 animate-pulse"
          style={{ backgroundColor: "var(--accent)" }}
        ></span>
        Error
      </p>

      <h1 className="font-departure-mono text-6xl md:text-8xl">
        4
        <span
          className="p-2 -rotate-1 inline-block border-b-4 border-l-2 border-r-2 border-t-0 border-black mx-1"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          0
        </span>
        4
      </h1>

      <div className="w-40">
        <DashedAnimation />
      </div>

      <p className="font-departure-mono font-extrabold leading-7 max-w-md">
        This page doesn&apos;t exist — or it moved somewhere I haven&apos;t
        built a route for yet.
      </p>

      <div className="flex flex-wrap gap-5 justify-center mt-2">
        <Link
          href="/"
          className="px-6 py-3 border-2 cursor-pointer border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-departure-mono font-bold uppercase tracking-widest text-sm"
          style={{
            backgroundColor: "var(--accent)",
            color: "var(--accent-contrast)",
          }}
        >
          Take me home
        </Link>
        <Link
          href="/projects"
          className="bg-white text-black px-6 py-3 border-2 cursor-pointer border-black shadow-[4px_4px_0_0_rgba(0,0,0,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-departure-mono font-bold uppercase tracking-widest text-sm"
        >
          See the projects
        </Link>
      </div>
    </div>
  );
};

export default NotFound;
