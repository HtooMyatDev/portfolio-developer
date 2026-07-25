import Image from "next/image";
import Link from "next/link";
const Hero = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-4">
      <div className="flex flex-col gap-4">
        <p
          className="font-departure-mono font-light text-xs uppercase flex items-center gap-2"
          style={{ color: "var(--accent)" }}
        >
          <span
            className="inline-block w-2 h-2 animate-pulse"
            style={{ backgroundColor: "var(--accent)" }}
          ></span>
          Fullstack Developer - Chiang Rai
        </p>
        <h1 className="font-departure-mono text-4xl md:text-5xl">
          I build
          <span
            className="p-2 -rotate-1 inline-block border-b-4 border-l-2 border-r-2 border-t-0 border-black dark:border-white mx-2"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            web apps
          </span>
          for real workflows.
        </h1>
        <p
          className="font-departure-mono text-[15px] sm:text-[16px] leading-7"
          style={{ color: "var(--muted)" }}
        >
          Specializing in Next.js, TypeScript, and Prisma. I focus on building
          scalable, fullstack systems designed for real-world complexity and
          robust functionality.
        </p>

        <div className="flex flex-wrap gap-5">
          <Link
            href="/projects"
            className="px-6 py-3 border-2 cursor-pointer border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-departure-mono font-light uppercase tracking-widest text-sm"
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
              borderColor: "var(--foreground)",
            }}
          >
            See the projects
          </Link>
          <a
            target="_blank"
            href="https://drive.google.com/file/d/1q6F1HQtgrDu32WTUmzpJsrEHOcl9VzOy/view?usp=sharing"
            className="px-6 py-3 border-2 cursor-pointer border-black dark:border-white shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)] active:translate-y-1 active:translate-x-1 active:shadow-none transition-all font-departure-mono font-light uppercase tracking-widest text-sm"
            style={{
              backgroundColor: "var(--card-bg)",
              color: "var(--foreground)",
              borderColor: "var(--border)",
            }}
          >
            Resume
          </a>
        </div>
      </div>
      <div className="flex items-center">
        <Image
          src="/hero_pixel_art.jpg"
          alt="Pixel art developer workstation"
          width={400}
          height={400}
          loading="eager"
          className="w-full h-full object-cover border-2 shadow-[8px_8px_0_0_rgba(0,0,0,1)] dark:shadow-[8px_8px_0_0_rgba(255,255,255,1)] p-2 flex items-center justify-center transform hover:scale-[1.02] transition-transform duration-300"
          style={{
            borderColor: "var(--border)",
            backgroundColor: "var(--accent-soft)",
          }}
        />
      </div>
    </div>
  );
};

export default Hero;
