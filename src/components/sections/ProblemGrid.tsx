"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export default function ProblemGrid() {
  const { eyebrow, title, cards } = content.problem;
  return (
    <section id="problem" className="py-section">
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
        </motion.div>

        <motion.div
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-12 grid gap-4 sm:grid-cols-2"
        >
          {cards.map((c) => (
            <motion.div
              key={c.heading}
              variants={fadeUp}
              className="group rounded-2xl border border-border bg-bg-elevated/40 p-7 transition-all duration-300 ease-smooth hover:-translate-y-1 hover:border-text/20 hover:bg-bg-elevated/70"
            >
              <h3 className="font-display text-xl font-semibold tracking-tightest">{c.heading}</h3>
              <p className="mt-3 text-sm leading-relaxed text-text-muted">{c.body}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
