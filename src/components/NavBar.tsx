"use client";
import Link from "next/link";
import { gsap } from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";
import { useEffect, useRef, useState } from "react";
import { useTheme } from "@/components/ThemeProvider";
import useCursorStore from "@/hooks/useCursorStore";

gsap.registerPlugin(ScrambleTextPlugin);

export default function NavBar() {
  const setCursor = useCursorStore((s) => s.setCursor);
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggle } = useTheme();
  const titleRef = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (!titleRef.current) return;

    gsap.to(titleRef.current, {
      scrambleText: {
        text: "Rex",
        chars:
          "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+=-`~[]{}|;:'",
        revealDelay: 0.5,
        speed: 0.5,
      },
      duration: 2,
    });
  }, []);

  // Disable scrolling when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const onPointerEnter = () => {
    setCursor({ type: "hover" });
  };
  const onPointerLeave = () => setCursor({ type: "default", label: null });

  return (
    <>
      <nav
        className="sticky top-0 z-50 border-b-2 px-4 sm:px-10 lg:px-32 xl:px-60 py-5 mb-13 transition-colors duration-300"
        style={{
          backgroundColor: "var(--background)",
          borderColor: "var(--border)",
        }}
      >
        <div className="flex justify-between items-center gap-4">
          <Link
            href="/"
            className="font-departure-mono text-xl sm:text-2xl z-60 relative"
            onClick={() => setIsOpen(false)}
          >
            <span ref={titleRef} style={{ color: "var(--foreground)" }}>
              Rex
            </span>
            <span className="animate-pulse" style={{ color: "var(--accent)" }}>
              .
            </span>
          </Link>

          <div className="flex items-center gap-3">
            {/* Theme Toggle */}
            <button
              onClick={toggle}
              aria-label="Toggle theme"
              className="cursor-pointer z-60 relative w-9 h-9 flex items-center justify-center border-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.6)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.6)] transition-all"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
            >
              {theme === "dark" ? (
                /* Sun icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <circle cx="12" cy="12" r="5" />
                  <line x1="12" y1="1" x2="12" y2="3" />
                  <line x1="12" y1="21" x2="12" y2="23" />
                  <line x1="4.22" y1="4.22" x2="5.64" y2="5.64" />
                  <line x1="18.36" y1="18.36" x2="19.78" y2="19.78" />
                  <line x1="1" y1="12" x2="3" y2="12" />
                  <line x1="21" y1="12" x2="23" y2="12" />
                  <line x1="4.22" y1="19.78" x2="5.64" y2="18.36" />
                  <line x1="18.36" y1="5.64" x2="19.78" y2="4.22" />
                </svg>
              ) : (
                /* Moon icon */
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="15"
                  height="15"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="square"
                  strokeLinejoin="miter"
                >
                  <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z" />
                </svg>
              )}
            </button>

            {/* Menu Button */}
            <button
              className="cursor-pointer z-60 relative font-departure-mono font-bold uppercase text-sm border-2 px-4 py-2 shadow-[2px_2px_0_0_rgba(0,0,0,1)] dark:shadow-[2px_2px_0_0_rgba(255,255,255,1)] hover:translate-y-0.5 hover:translate-x-0.5 hover:shadow-[4px_4px_0_0_rgba(0,0,0,0.6)] dark:hover:shadow-[4px_4px_0_0_rgba(255,255,255,0.6)] transition-all"
              style={{
                backgroundColor: "var(--card-bg)",
                borderColor: "var(--border)",
                color: "var(--foreground)",
              }}
              onClick={() => setIsOpen(!isOpen)}
              onPointerEnter={onPointerEnter}
              onPointerLeave={onPointerLeave}
            >
              {isOpen ? "Close" : "Menu"}
            </button>
          </div>
        </div>
      </nav>

      {/* Fullscreen Overlay Menu */}
      <div
        className={`fixed left-0 top-0 z-40 flex h-dvh w-screen flex-col items-center justify-center p-6 overflow-y-auto transition-transform duration-500 ease-in-out ${
          isOpen ? "translate-y-0" : "-translate-y-full"
        }`}
        style={{
          backgroundColor: "var(--accent)",
          color: "var(--accent-contrast)",
        }}
      >
        {/* Subtle background grid pattern */}
        <div className="absolute inset-0 opacity-10 pointer-events-none bg-[radial-gradient(var(--accent-contrast)_1px,transparent_1px)] [background-size:24px_24px]" />

        <ul className="relative z-10 flex flex-col items-center gap-4 sm:gap-6 font-departure-mono text-4xl sm:text-6xl md:text-7xl uppercase text-center">
          {[
            { label: "About", href: "/#about", num: "01" },
            { label: "Tech", href: "/#tech", num: "02" },
            { label: "Works", href: "/#works", num: "03" },
            { label: "Exp & Edu", href: "/#exp", num: "04" },
            { label: "Blogs", href: "/blogs", num: "05" },
            { label: "Contact", href: "/#contact", num: "06" },
          ].map((item) => (
            <li key={item.label} className="group relative">
              <Link
                href={item.href}
                className="group/link flex items-center justify-center gap-3 sm:gap-5 transform-gpu transition-all duration-300 hover:-translate-y-1 hover:scale-105"
                onClick={() => setIsOpen(false)}
              >
                <span className="font-departure-mono text-xs sm:text-base opacity-50 group-hover/link:opacity-100 group-hover/link:text-white transition-opacity">
                  [{item.num}]
                </span>
                <span className="relative">
                  {item.label}
                  <span className="absolute bottom-0 left-0 w-0 h-1 bg-current transition-all duration-300 group-hover/link:w-full" />
                </span>
                <span className="opacity-0 -translate-x-2 group-hover/link:opacity-100 group-hover/link:translate-x-0 transition-all text-xs sm:text-sm font-bold border border-current px-1.5 py-0.5">
                  ↵
                </span>
              </Link>
            </li>
          ))}
        </ul>

        {/* Footer info in overlay */}
        <div className="absolute bottom-8 text-center font-departure-mono text-xs tracking-widest opacity-60">
          DESIGNED & BUILT BY REX // 2026
        </div>
      </div>
    </>
  );
}
