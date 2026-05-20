"use client";

import { motion } from "framer-motion";
import type { FloatingCardData } from "@/config/content.config";

const variantStyles: Record<FloatingCardData["variant"], { dot: string; glow: string; text: string }> = {
  critical: {
    dot: "bg-critical",
    glow: "shadow-[0_0_40px_-12px_var(--critical)] border-critical/25",
    text: "text-critical",
  },
  advisory: {
    dot: "bg-advisory",
    glow: "shadow-[0_0_40px_-12px_var(--advisory)] border-advisory/25",
    text: "text-advisory",
  },
  normal: {
    dot: "bg-accent",
    glow: "shadow-[0_0_40px_-16px_var(--accent)] border-accent/20",
    text: "text-accent",
  },
};

/**
 * The signature hero detail (build plan §6): an absolutely-positioned alert
 * card with an entrance fade+scale and an infinite, restrained float loop.
 */
export default function FloatingCard({
  variant,
  badge,
  title,
  body,
  position,
  delay,
}: FloatingCardData) {
  const v = variantStyles[variant];
  return (
    <motion.div
      className="pointer-events-none absolute z-20 hidden w-[270px] sm:block"
      style={position}
      initial={{ opacity: 0, scale: 0.92, y: 8 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      transition={{ delay, duration: 0.7, ease: [0.25, 0.1, 0.25, 1] }}
    >
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay }}
        className={`rounded-2xl border bg-bg-elevated/80 p-4 backdrop-blur-md ${v.glow}`}
      >
        <div className="flex items-center gap-2">
          <span className={`relative flex h-2 w-2`}>
            <span className={`absolute inline-flex h-full w-full rounded-full ${v.dot} opacity-75 animate-pulse-ring`} />
            <span className={`relative inline-flex h-2 w-2 rounded-full ${v.dot}`} />
          </span>
          <span className={`text-xs font-semibold uppercase tracking-wider ${v.text}`}>
            {badge}
          </span>
        </div>
        <p className="mt-2 text-sm font-medium text-text">{title}</p>
        <p className="mt-1 text-xs leading-relaxed text-text-muted">{body}</p>
      </motion.div>
    </motion.div>
  );
}
