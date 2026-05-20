import type { Metadata } from "next";
import ConceptTabs from "@/components/ambassador/ConceptTabs";

export const metadata: Metadata = {
  title: "Ambassador Program",
  description:
    "Three design concepts for the AI Valley Ambassador Program. Switch between Glass, Cinematic, and Editorial directions with the A / B / C tabs.",
};

export default function AmbassadorPage() {
  return <ConceptTabs />;
}
