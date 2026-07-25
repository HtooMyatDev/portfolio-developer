"use client";
import Link from "next/link";
import Header from "@/components/Header";
import useCursorStore from "@/hooks/useCursorStore";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";
const contactLinks = [
  {
    label: "Email",
    value: "itshtunyk@gmail.com",
    href: "mailto:itshtunyk@gmail.com",
    icon: FaEnvelope,
  },
  {
    label: "GitHub",
    value: "github.com/htoomyatdev",
    href: "https://github.com/htoomyatdev",
    icon: FaGithub,
  },
  {
    label: "LinkedIn",
    value: "linkedin.com/in/htoo-myat-aung",
    href: "https://www.linkedin.com/in/htoo-myat-aung-609997310/",
    icon: FaLinkedin,
  },
];

export default function Contact() {
  const setCursor = useCursorStore((s) => s.setCursor);

  const onPointerEnter = () => {
    setCursor({ type: "hover" });
  };
  const onPointerLeave = () => setCursor({ type: "default", label: null });

  return (
    <div className="space-y-8 pb-10">
      <Header title="Contact" subtitle="let's build something useful" />

      <div className="flex flex-col gap-6x">
        <div className="border-2 border-black dark:border-white bg-background p-6 sm:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
          <p
            className="font-departure-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Reach out
          </p>
          <h2 className="mt-3 font-departure-mono text-3xl leading-tight">
            I&apos;m available for freelance work, product builds, and
            thoughtful collaborations.
          </h2>
          <p
            className="mt-4 font-departure-mono text-sm leading-7"
            style={{ color: "var(--muted)" }}
          >
            If you have a project idea, a workflow that needs improving, or a
            product that needs a better experience, I&apos;d love to hear about
            it.
          </p>
        </div>
        <div className="mt-6 flex flex-wrap items-center justify-center gap-4 sm:gap-5">
          {contactLinks.map((link) => (
            <Link
              key={link.label}
              href={link.href}
              target={link.href.startsWith("http") ? "_blank" : undefined}
              rel={
                link.href.startsWith("http") ? "noopener noreferrer" : undefined
              }
              className="flex h-14 w-14 items-center justify-center border-2 border-black/80 bg-background shadow-[3px_3px_0_0_rgba(0,0,0,1)] transition duration-200 hover:-translate-y-1 hover:translate-x-1 hover:shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:border-white/80 dark:shadow-[3px_3px_0_0_rgba(255,255,255,1)] dark:hover:shadow-[2px_2px_0_0_rgba(255,255,255,1)]"
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
              style={{ borderColor: "var(--border)" }}
              aria-label={link.label}
            >
              <span className="text-lg" style={{ color: "var(--foreground)" }}>
                {link.icon && <link.icon size={18} />}
              </span>
            </Link>
          ))}
        </div>

        {/* <div className="border-2 border-black dark:border-white bg-background p-6 sm:p-8 shadow-[4px_4px_0_0_rgba(0,0,0,1)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,1)]">
          <p
            className="font-departure-mono text-xs uppercase tracking-[0.3em]"
            style={{ color: "var(--accent)" }}
          >
            Quick message
          </p>
          <form
            className="mt-5 space-y-4"
            action="mailto:itshtunyk@gmail.com"
            method="post"
            encType="text/plain"
          >
            <input
              className="w-full border border-black/20 dark:border-white/20 bg-background px-4 py-3 font-departure-mono text-sm outline-none"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
              type="text"
              name="name"
              placeholder="Your name"
              required
            />
            <input
              className="w-full border border-black/20 dark:border-white/20 bg-background px-4 py-3 font-departure-mono text-sm outline-none"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
              type="email"
              name="email"
              placeholder="Your email"
              required
            />
            <textarea
              className="min-h-36 w-full border border-black/20 dark:border-white/20 bg-background px-4 py-3 font-departure-mono text-sm outline-none"
              style={{
                backgroundColor: "var(--card-bg)",
                color: "var(--foreground)",
                borderColor: "var(--border)",
              }}
              name="message"
              placeholder="Tell me about the project"
              required
            />
            <button
              type="submit"
              className="border-2 border-black dark:border-white px-5 py-3 font-departure-mono text-xs uppercase tracking-[0.25em] transition hover:-translate-y-0.5"
              style={{
                backgroundColor: "var(--accent)",
                color: "var(--accent-contrast)",
                borderColor: "var(--border)",
              }}
            >
              Send message
            </button>
          </form>
        </div> */}
      </div>
    </div>
  );
}
