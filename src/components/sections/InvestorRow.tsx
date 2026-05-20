"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, viewport } from "@/lib/motion";

export default function InvestorRow() {
  const { eyebrow, logos } = content.investors;
  return (
    <section className="border-t border-border py-20">
      <div className="mx-auto max-w-container px-5 sm:px-8">
        <motion.p
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="eyebrow text-center text-text-muted"
        >
          {eyebrow}
        </motion.p>
        <motion.div
          variants={fadeUp}
          initial="hidden"
          whileInView="show"
          viewport={viewport}
          className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6"
        >
          {logos.map((logo) => (
            <span
              key={logo}
              className="font-display text-xl font-medium tracking-tightest text-text-muted/60 grayscale transition-all duration-300 hover:text-text hover:grayscale-0"
            >
              {logo}
            </span>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
