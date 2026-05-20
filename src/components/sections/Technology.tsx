"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, viewport } from "@/lib/motion";
import VisionBlock from "./VisionBlock";

export default function Technology() {
  const { eyebrow, title, blocks } = content.technology;
  return (
    <section id="technology" className="border-t border-border py-section">
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

        <div className="mt-8 divide-y divide-border">
          {blocks.map((b) => (
            <VisionBlock key={b.eyebrow} block={b} />
          ))}
        </div>
      </div>
    </section>
  );
}
