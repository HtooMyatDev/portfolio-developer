import Header from "@/components/Header";

const inlineTag =
  "inline-block px-2 py-0.5 mx-1 border-2 border-black dark:border-white shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:-translate-y-0.5 hover:shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,1)] transition-all";

const InfoRow = ({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) => (
  <div
    className="flex flex-col gap-1 border-b-2 border-black dark:border-white pb-3 last:border-0 last:pb-0"
    style={{ borderColor: "var(--border)" }}
  >
    <span
      className="font-departure-mono uppercase text-xs tracking-widest"
      style={{ color: "var(--accent)" }}
    >
      {label}
    </span>
    {children}
  </div>
);

const AboutSection = () => (
  <div id="about" className="mt-24 mb-24 pb-6 flex flex-col gap-8 scroll-mt-32">
    <Header title="About Rex" subtitle="it's me!" />

    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
      {/* Bio text */}
      <div
        className="flex flex-col gap-4 font-departure-mono text-[15px] sm:text-[16px] leading-7"
        style={{ color: "var(--muted)" }}
      >
        <p>
          Hey there! I&apos;m a fullstack developer currently based in{" "}
          <span
            className={`${inlineTag} cursor-default`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            Chiang Rai
          </span>
          , passionate about building robust web applications that solve
          real-world problems.
        </p>
        <p>
          Beyond just writing code, I enjoy architecting scalable systems and
          designing intuitive user interfaces that bring ideas to life.
          Currently majoring in Software Engineering at{" "}
          <a
            href="https://en.mfu.ac.th/home.html"
            target="_blank"
            rel="noopener noreferrer"
            className={`${inlineTag} cursor-pointer`}
            style={{
              backgroundColor: "var(--accent)",
              color: "var(--accent-contrast)",
            }}
          >
            Mae Fah Luang
          </a>{" "}
          University.
        </p>
      </div>

      {/* Info card */}
      <div
        className="flex flex-col gap-4 border-2 border-black dark:border-white p-6 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]"
        style={{ backgroundColor: "var(--card-bg)" }}
      >
        <InfoRow label="Location">
          <span className="font-departure-mono text-sm">Chiang Rai, Thailand</span>
        </InfoRow>

        <InfoRow label="Current Focus">
          <span className="font-departure-mono text-sm">
            Fullstack Next.js Architecture
          </span>
        </InfoRow>

        <InfoRow label="When away from keyboard">
          <p
            className="font-departure-mono text-[15px] sm:text-[16px]"
            style={{ color: "var(--muted)" }}
          >
            When I&apos;m not at my keyboard, I&apos;m usually out capturing
            moments. Check out my{" "}
            <a
              href="https://portfolio-photography-nine.vercel.app/"
              target="_blank"
              rel="noreferrer"
              className={`${inlineTag} cursor-pointer`}
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
              }}
            >
              Photographer Portfolio
            </a>
            .
          </p>
        </InfoRow>
      </div>
    </div>
  </div>
);

export default AboutSection;
