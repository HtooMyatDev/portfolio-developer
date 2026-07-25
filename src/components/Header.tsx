"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrollTrigger, ScrambleTextPlugin);

const Header = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const titleRef = useRef<HTMLSpanElement>(null);
  
  useEffect(() => {
    if (!titleRef.current) return;
    
    // Store original text so it doesn't get lost
    const originalText = title;
    
    gsap.to(titleRef.current, {
      duration: 1,
      scrambleText: { text: originalText, chars: "0123456789!@#$%^&*", speed: 0.5 },
      ease: "none",
      scrollTrigger: {
        trigger: titleRef.current,
        start: "top 90%",
        toggleActions: "play none none none"
      }
    });
  }, [title]);

  return (
    <div className="flex justify-between items-baseline gap-2 flex-wrap">
      <div className="flex items-center gap-2">
        <div
          className="text-xl sm:text-2xl md:text-3xl font-departure-mono font-bold uppercase flex items-end"
          style={{ color: "var(--foreground)" }}
        >
          <span ref={titleRef}>{title}</span>
          <span
            className="text-md tracking-widest lowercase ml-2"
            style={{ color: "var(--muted)" }}
          >
            .md
          </span>
        </div>
      </div>
      <div
        className="text-xs sm:text-sm font-departure-mono font-semibold uppercase"
        style={{ color: "var(--accent)" }}
      >
        {subtitle}
      </div>
    </div>
  );
};

export default Header;
