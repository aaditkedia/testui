"use client";

import { motion } from "framer-motion";
import type { ComponentType } from "react";
import type { VisionBlockData, VizKind } from "@/config/content.config";
import { fadeUp, viewport } from "@/lib/motion";
import ForecastChart from "@/components/viz/ForecastChart";
import GraphNetwork from "@/components/viz/GraphNetwork";
import AssetMapping from "@/components/viz/AssetMapping";
import RLTree from "@/components/viz/RLTree";

const VIZ: Record<VizKind, ComponentType> = {
  forecast: ForecastChart,
  graph: GraphNetwork,
  asset: AssetMapping,
  rltree: RLTree,
};

export default function VisionBlock({ block }: { block: VisionBlockData }) {
  const Viz = VIZ[block.viz];
  return (
    <div className="grid items-center gap-10 py-14 md:grid-cols-2 md:gap-16 md:py-20">
      {/* copy */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={block.reverse ? "md:order-2" : ""}
      >
        <p className="eyebrow">{block.eyebrow}</p>
        <h3 className="h-section mt-4 text-[1.9rem] leading-tight md:text-[2.4rem]">{block.title}</h3>
        <p className="mt-5 max-w-md text-base leading-relaxed text-text-muted">{block.body}</p>
      </motion.div>

      {/* viz slot */}
      <motion.div
        variants={fadeUp}
        initial="hidden"
        whileInView="show"
        viewport={viewport}
        className={`rounded-2xl border border-border bg-bg-elevated/30 p-5 ${block.reverse ? "md:order-1" : ""}`}
      >
        <Viz />
      </motion.div>
    </div>
  );
}
