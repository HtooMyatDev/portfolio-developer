"use client";

import { useEffect, useState } from "react";

export default function ScrollToTop() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const resetScroll = () => {
      window.scrollTo(0, 0);
      document.documentElement.scrollTop = 0;
      document.body.scrollTop = 0;
    };

    const toggleVisibility = () => {
      setIsVisible(window.scrollY > 300);
    };

    const frame = window.requestAnimationFrame(() => {
      resetScroll();
      toggleVisibility();
    });

    window.addEventListener("load", resetScroll);
    window.addEventListener("scroll", toggleVisibility, { passive: true });

    return () => {
      window.cancelAnimationFrame(frame);
      window.removeEventListener("load", resetScroll);
      window.removeEventListener("scroll", toggleVisibility);
    };
  }, []);

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      aria-label="Scroll to top"
      className={`fixed bottom-5 right-5 z-50 flex h-12 w-12 items-center justify-center rounded-none border-2 shadow-[4px_4px_0_0_rgba(0,0,0,0.25)] transition-all duration-300 hover:-translate-y-1 hover:shadow-[6px_6px_0_0_rgba(0,0,0,0.3)] dark:shadow-[4px_4px_0_0_rgba(255,255,255,0.2)] dark:hover:shadow-[6px_6px_0_0_rgba(255,255,255,0.25)] ${
        isVisible ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
    >
      <span className="text-xl font-black leading-none">↑</span>
    </button>
  );
}
