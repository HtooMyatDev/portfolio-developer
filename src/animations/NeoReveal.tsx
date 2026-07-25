"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function NeoReveal({
  children,
  className = "",
  direction = "right",
}: {
  children: React.ReactNode;
  className?: string;
  direction?: "up" | "down" | "left" | "right";
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const blockRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current || !blockRef.current || !contentRef.current)
      return;

    // Hide content initially
    gsap.set(contentRef.current, { opacity: 0 });

    let transformOrigin = "right";
    let scaleProp = "scaleX";

    if (direction === "right") {
      transformOrigin = "right";
      scaleProp = "scaleX";
    } else if (direction === "left") {
      transformOrigin = "left";
      scaleProp = "scaleX";
    } else if (direction === "up") {
      transformOrigin = "top";
      scaleProp = "scaleY";
    } else if (direction === "down") {
      transformOrigin = "bottom";
      scaleProp = "scaleY";
    }

    // Block covers the content
    gsap.set(blockRef.current, { [scaleProp]: 1, transformOrigin });

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: containerRef.current,
        start: "top 85%",
        toggleActions: "play none none none",
      },
    });

    tl.to(contentRef.current, { opacity: 1, duration: 0 }).to(
      blockRef.current,
      {
        [scaleProp]: 0,
        duration: 0.5,
        ease: "power4.inOut",
      },
    );

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
    };
  }, [direction]);

  return (
    <div ref={containerRef} className={`relative ${className}`}>
      <div
        ref={blockRef}
        className="absolute -inset-2 z-20 pointer-events-none"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <div ref={contentRef} className="opacity-0">
        {children}
      </div>
    </div>
  );
}
