"use client";

import { useEffect, useRef, useState } from "react";

function useCountUp(target: number, duration = 1200) {
  const [value, setValue] = useState(0);
  const startRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    if (target === 0) return;

    const animate = (timestamp: number) => {
      if (startRef.current === null) startRef.current = timestamp;
      const elapsed = timestamp - startRef.current;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setValue(Math.floor(eased * target));
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        setValue(target);
      }
    };

    rafRef.current = requestAnimationFrame(animate);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [target, duration]);

  return value;
}

export default function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);
  const [hasIncremented, setHasIncremented] = useState(false);

  const displayCount = useCountUp(count ?? 0);

  useEffect(() => {
    if (hasIncremented) return;
    setHasIncremented(true);

    const SESSION_KEY = "portfolio_visited";
    const alreadyCounted = sessionStorage.getItem(SESSION_KEY);

    if (alreadyCounted) {
      // Already visited this session — just read the current count
      fetch("/api/views")
        .then((r) => r.json())
        .then((d) => typeof d.count === "number" && setCount(d.count))
        .catch(() => {});
    } else {
      // First visit this session — increment and mark as counted
      fetch("/api/views", { method: "POST" })
        .then((res) => res.json())
        .then((data) => {
          if (typeof data.count === "number") {
            setCount(data.count);
            sessionStorage.setItem(SESSION_KEY, "1");
          }
        })
        .catch(() => {
          // Fallback: just read without incrementing
          fetch("/api/views")
            .then((r) => r.json())
            .then((d) => typeof d.count === "number" && setCount(d.count))
            .catch(() => {});
        });
    }
  }, [hasIncremented]);

  if (count === null) {
    return (
      <span
        className="font-departure-mono font-bold uppercase tracking-widest text-[10px] inline-flex items-center gap-2"
        style={{ color: "var(--muted)" }}
      >
        <span
          className="inline-block w-1.5 h-1.5 rounded-full animate-pulse"
          style={{ backgroundColor: "var(--accent)" }}
        />
        Loading visitors...
      </span>
    );
  }

  return (
    <span
      id="visitor-counter"
      className="font-departure-mono font-bold uppercase tracking-widest text-[10px] inline-flex items-center gap-2"
      style={{ color: "var(--muted)" }}
    >
      <span
        className="inline-block w-1.5 h-1.5 rounded-full"
        style={{ backgroundColor: "var(--accent)" }}
      />
      <span style={{ color: "var(--accent)" }}>
        {displayCount.toLocaleString()}
      </span>
      &nbsp;visitors
    </span>
  );
}
