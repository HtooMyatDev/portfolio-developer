"use client";

import useCursorStore from "@/hooks/useCursorStore";
import { useGSAP } from "@gsap/react";
import { useOs } from "@mantine/hooks";
import gsap from "gsap";
import { useEffect, useRef } from "react";


const CustomCursor = () => {
  const os = useOs();
  const showCustomCursor =
    os !== "ios" && os !== "android" && os !== "undetermined";

  useEffect(() => {
    if (showCustomCursor) {
      document.body.classList.add("cursor-none");
    }
    return () => {
      document.body.classList.remove("cursor-none");
    };
  }, [showCustomCursor]);

  if (!showCustomCursor) {
    return null;
  }

  return (
    <div
      id="cursor-container"
      className="pointer-events-none fixed inset-0 z-500 select-none"
    >
      <Cursor />
    </div>
  );
};

export default CustomCursor;

const Cursor = () => {
  const pointer = useRef<HTMLDivElement>(null);
  const { type, label } = useCursorStore();

  useGSAP(() => {
    gsap.set(pointer.current, { xPercent: 0, yPercent: 0 });
  }, []);

  useGSAP(() => {
    const isHovered = type === "hover";
    gsap.to(pointer.current, {
      scale: isHovered ? 3 : 1,
      duration: 0.25,
      ease: "power2.out",
    });
  }, [type]);

  useEffect(() => {
    const setCursorX = gsap.quickTo(pointer.current, "x", {
      duration: 0.3,
      ease: "power3.out",
    });
    const setCursorY = gsap.quickTo(pointer.current, "y", {
      duration: 0.3,
      ease: "power3.out",
    });

    const onPointerMove = (e: PointerEvent) => {
      setCursorX(e.clientX);
      setCursorY(e.clientY);
    };

    window.addEventListener("pointermove", onPointerMove);
    return () => window.removeEventListener("pointermove", onPointerMove);
  }, []);

  return (
    <div
      ref={pointer}
      className="absolute pointer-events-none border-2 border-black dark:border-white"
    >
      {label && (
        <span className="font-departure-mono text-xl sm:text-2xl relative left-6 top-1 whitespace-nowrap">
          {label}
        </span>
      )}
    </div>
  );
};
