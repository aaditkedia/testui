"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useInView } from "framer-motion";

/**
 * Animates the numeric part of a display string (e.g. "2,000+", "$5M+", "120")
 * from 0 to its target when scrolled into view. Prefix/suffix are preserved.
 */
export default function CountUp({ value, className = "" }: { value: string; className?: string }) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  // Parse "$5M+" -> { prefix:"$", target:5, suffix:"M+" }. Memoized on `value`
  // so the result is referentially stable: the animation effect below depends on
  // it, and an unstable parse would restart the count every frame (the numbers
  // would jitter forever and never reach their target).
  const parsed = useMemo(() => {
    const m = value.match(/^([^\d]*)([\d,]+)(.*)$/);
    if (!m) return null;
    return { prefix: m[1], target: parseInt(m[2].replace(/,/g, ""), 10), suffix: m[3] };
  }, [value]);

  const [display, setDisplay] = useState("0");

  useEffect(() => {
    if (!parsed || !inView) return;
    const { target } = parsed;
    const duration = 1100;
    const start = performance.now();
    let raf = 0;
    const tick = (now: number) => {
      const t = Math.min(1, (now - start) / duration);
      const eased = 1 - Math.pow(1 - t, 3);
      setDisplay(Math.round(eased * target).toLocaleString());
      if (t < 1) raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [inView, parsed]);

  return (
    // tabular-nums keeps every digit the same width so the value doesn't shift
    // horizontally while it counts up.
    <span ref={ref} className={className} style={{ fontVariantNumeric: "tabular-nums" }}>
      {parsed ? `${parsed.prefix}${display}${parsed.suffix}` : value}
    </span>
  );
}
