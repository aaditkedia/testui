"use client";

import { motion } from "framer-motion";
import { content } from "@/config/content.config";
import FloatingCard from "@/components/ui/FloatingCard";
import Button from "@/components/ui/Button";

const ease = [0.25, 0.1, 0.25, 1] as const;

export default function Hero() {
  const { lines, sub, cta, cards } = content.hero;
  return (
    <section className="relative flex min-h-[92vh] items-center overflow-hidden pt-16">
      <div className="grid-backdrop pointer-events-none absolute inset-0 opacity-60" />

      <div className="relative mx-auto w-full max-w-container px-5 sm:px-8">
        <div className="max-w-3xl">
          <h1 className="h-display">
            {lines.map((line, i) => (
              <motion.span
                key={i}
                className="block"
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 + i * 0.12, duration: 0.9, ease }}
              >
                {i === lines.length - 1 ? <span className="text-text-muted">{line}</span> : line}
              </motion.span>
            ))}
          </h1>

          <motion.p
            className="mt-6 max-w-xl text-base leading-relaxed text-text-muted sm:text-lg"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.8, ease }}
          >
            {sub}
          </motion.p>

          <motion.div
            className="mt-9"
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8, ease }}
          >
            <Button href={cta.href}>{cta.label}</Button>
          </motion.div>
        </div>

        {cards.map((c, i) => (
          <FloatingCard key={i} {...c} />
        ))}
      </div>
    </section>
  );
}
