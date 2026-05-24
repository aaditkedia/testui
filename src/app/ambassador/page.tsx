import type { Metadata } from "next";
import ConceptTabs from "@/components/ambassador/ConceptTabs";

export const metadata: Metadata = {
  title: "Ambassador Program",
  description:
    "Design concepts and full landing-page rebuilds. Switch between directions with the A–H tabs.",
};

export default function AmbassadorPage() {
  return <ConceptTabs />;
}
