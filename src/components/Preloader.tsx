"use client";

import React, { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrambleTextPlugin } from "gsap/ScrambleTextPlugin";

gsap.registerPlugin(ScrambleTextPlugin);

// Use a module-level flag to avoid calling setState in effect
let clientMounted = false;

const Preloader = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textRef = useRef<HTMLDivElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  const [isClient, setIsClient] = useState(clientMounted);

  useEffect(() => {
    clientMounted = true;
    if (!isClient) setIsClient(true); // eslint-disable-line react-hooks/set-state-in-effect
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    if (!isClient) return;

    // Prevent scrolling during preload
    document.body.style.overflow = "hidden";

    const tl = gsap.timeline({
      onComplete: () => {
        document.body.style.overflow = "";
      },
    });

    // Scramble text effect for loading percentage
    tl.to(textRef.current, {
      duration: 2,
      scrambleText: {
        text: "100%",
        chars: "0123456789",
        speed: 1,
      },
      delay: 0.2,
    })
      .to(statusRef.current, {
        duration: 0.5,
        scrambleText: {
          text: "Welcome",
        },
        delay: 0.2,
      })
      // Slide the whole preloader up and out
      .to(containerRef.current, {
        yPercent: -100,
        duration: 0.8,
        ease: "power4.inOut",
      });

    return () => {
      document.body.style.overflow = "";
      tl.kill();
    };
  }, [isClient]);

  if (!isClient) return null; // Avoid hydration mismatch

  return (
    <div
      ref={containerRef}
      className="fixed inset-0 z-9999 flex flex-col items-center justify-center gap-6"
      style={{
        backgroundColor: "var(--background)",
      }}
    >
      <div
        ref={textRef}
        className="font-departure-mono text-6xl sm:text-8xl md:text-9xl font-black tracking-widest uppercase"
        style={{ color: "var(--accent)" }}
      >
        0%
      </div>
      <div
        ref={statusRef}
        className="font-departure-mono text-xs tracking-[0.3em] uppercase animate-pulse"
        style={{ color: "var(--foreground)" }}
      >
        [ Initializing ]
      </div>
    </div>
  );
};

export default Preloader;
