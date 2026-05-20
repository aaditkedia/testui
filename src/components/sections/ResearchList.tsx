"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, stagger, viewport } from "@/lib/motion";

export default function ResearchList() {
  const { eyebrow, title, papers } = content.research;
  return (
    <section id="research" className="border-t border-border py-section">
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

        <motion.ul
          variants={stagger}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-10 border-t border-border"
        >
          {papers.map((p) => (
            <motion.li key={p.title} variants={fadeUp}>
              <a
                href={p.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex items-baseline justify-between gap-6 border-b border-border py-6 transition-colors hover:bg-text/[0.03]"
              >
                <span className="max-w-2xl text-base text-text transition-colors group-hover:text-accent sm:text-lg">
                  {p.title}
                </span>
                <span className="shrink-0 text-sm text-text-muted">{p.venue} &#8599;</span>
              </a>
            </motion.li>
          ))}
        </motion.ul>
      </div>
    </section>
  );
}
