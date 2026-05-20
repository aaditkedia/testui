"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates the numeric part of a display string (e.g. "2,000+", "$5M+", "120")
 * from 0 to its target when scrolled into view. Prefix/suffix are preserved.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const [display, setDisplay] = useState("0");

  // Split "$5M+" -> prefix "$", digits "5", suffix "M+"
  const match = value.match(/^([^\d]*)([\d,]+)(.*)$/);
  const prefix = match?.[1] ?? "";
  const target = match ? parseInt(match[2].replace(/,/g, ""), 10) : 0;
  const suffix = match?.[3] ?? "";

  useEffect(() => {
    if (!inView || !match) {
      if (!match) setDisplay(value);
      return;
    }
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * target);
      setDisplay(current.toLocaleString());
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, target, match, value]);

  return (
    <span ref={ref} className={className}>
      {match ? `${prefix}${display}${suffix}` : value}
    </span>
  );
}
