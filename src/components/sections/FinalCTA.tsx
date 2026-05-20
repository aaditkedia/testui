"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import { fadeUp, viewport } from "@/lib/motion";
import Button from "@/components/ui/Button";

export default function FinalCTA() {
  const { title, cta } = content.finalCta;
  return (
    <section className="relative overflow-hidden border-t border-border py-section">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-40" />
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className="relative mx-auto max-w-3xl px-5 text-center sm:px-8"
      >
        <h2 className="h-section mx-auto max-w-2xl">{title}</h2>
        <div className="mt-9 flex justify-center">
          <Button href={cta.href}>{cta.label}</Button>
        </div>
      </motion.div>
    </section>
  );
}
