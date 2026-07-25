"use client";

import { useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

gsap.registerPlugin(ScrollTrigger);

interface DashedAnimationProps {
  dashSize?: number;
  speed?: number;
  orientation?: "horizontal" | "vertical";
  className?: string;
}

const DashedAnimation = ({
  dashSize = 5,
  speed = 0.6,
  orientation = "horizontal",
  className = "",
}: DashedAnimationProps) => {
  const dashRef = useRef<HTMLDivElement>(null);
  const cycle = dashSize * 3;
  const isVertical = orientation === "vertical";
  const dim = isVertical ? "height" : "width";

  useGSAP(() => {
    if (!dashRef.current) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    // Draw from 0 → 100% on scroll
    gsap.fromTo(
      dashRef.current,
      { [dim]: "0%" },
      {
        [dim]: "100%",
        ease: "none",
        scrollTrigger: {
          trigger: dashRef.current,
          start: "bottom 80%",
          end: "top 55%",
          scrub: 1,
        },
      },
    );

    gsap.to(dashRef.current, {
      backgroundPosition: isVertical ? `0 ${cycle}px` : `${cycle}px 0`,
      duration: speed,
      ease: "none",
      repeat: -1,
    });
  }, [cycle, speed, isVertical]);

  return (
    <div
      ref={dashRef}
      className={className}
      style={{
        width: isVertical ? "3px" : "100%",
        height: isVertical ? "0%" : "3px",
        backgroundImage: `repeating-linear-gradient(${
          isVertical ? "180deg" : "90deg"
        }, var(--dash-color), var(--dash-color) ${dashSize}px, transparent ${dashSize}px, transparent ${cycle}px)`,
        backgroundRepeat: isVertical ? "repeat-y" : "repeat-x",
        backgroundSize: isVertical ? `100% ${cycle}px` : `${cycle}px 100%`,
      }}
    />
  );
};

export default DashedAnimation;
