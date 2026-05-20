"use client";

import { ReactNode } from "react";
import { motion } from "framer-motion";
import { fadeUp, viewport } from "@/lib/motion";

/** Drop-in scroll reveal using the shared fadeUp variant. */
export default function Reveal({
  children,
  className = "",
  as = "div",
}: {
  children: ReactNode;
  className?: string;
  as?: "div" | "li" | "section";
}) {
  const MotionTag = motion[as];
  return (
    <MotionTag
      variants={fadeUp}
      initial="hidden"
      whileInView="show"
      viewport={viewport}
      className={className}
    >
      {children}
    </MotionTag>
  );
}
