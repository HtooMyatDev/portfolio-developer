"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger, useGSAP);
}

const FallingPixelsDivider = () => {
  const container = useRef<HTMLDivElement>(null);

  // We'll generate 40 pixels to stretch across most screens
  const pixels = Array.from({ length: 40 });

  useGSAP(
    () => {
      const blocks = gsap.utils.toArray(".pixel-block");

      (blocks as Element[]).forEach((block: Element) => {
        const startY = -50 - Math.random() * 100;

        gsap.fromTo(
          block,
          {
            y: startY,
            opacity: 0,
          },
          {
            y: 0,
            opacity: 1,
            ease: "none",
            scrollTrigger: {
              trigger: container.current,
              start: "top bottom%",
              end: "top 20%",
              scrub: 1,
            },
          },
        );
      });
    },
    { scope: container },
  );

  return (
    <div
      ref={container}
      className="w-full h-32 flex items-end justify-center overflow-hidden my-8 px-2 sm:px-8 gap-1"
    >
      <div className="w-full max-w-6xl flex justify-between items-end pb-1 gap-1">
        {pixels.map((_, i) => (
          <div
            key={i}
            className="pixel-block flex-1 max-w-6 h-4 sm:h-6 border-2 border-black dark:border-white"
            style={{
              backgroundColor:
                i % 5 === 0
                  ? "var(--accent)"
                  : i % 2 === 0
                    ? "var(--foreground)"
                    : "var(--card-bg)",
              opacity: 0, // Keep invisible before animation kicks in
            }}
          ></div>
        ))}
      </div>
    </div>
  );
};

export default FallingPixelsDivider;
