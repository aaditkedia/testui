"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, stagger, viewport } from "@/lib/motion";
import WorldMap from "@/components/viz/WorldMap";

const toneClass: Record<string, string> = {
  normal: "text-accent",
  advisory: "text-advisory",
  critical: "text-critical",
};

export default function DeploymentMap() {
  const { eyebrow, title, body, markers, stats } = content.deployments;
  return (
    <section id="deployments" className="border-t border-border py-section">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="max-w-2xl"
        >
          <p className="eyebrow">{eyebrow}</p>
          <h2 className="h-section mt-4">{title}</h2>
          <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">{body}</p>
        </motion.div>

        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10"
        >
          <WorldMap markers={markers} />
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-3"
        >
          {stats.map((s) => (
            <motion.div
              key={s.label}
              variants={fadeUp}
              className="rounded-2xl border border-border bg-bg-elevated/40 p-6"
            >
              <div className={`font-display text-4xl font-semibold tracking-tightest ${toneClass[s.tone]}`}>
                {s.value}
              </div>
              <div className="mt-1 text-sm text-text-muted">{s.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
