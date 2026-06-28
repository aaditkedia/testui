"use client";

import { useEffect } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { templateEntries } from "@/config/template-gallery";

const loadingFallback = (
  <div
    className="fixed inset-0 flex items-center justify-center"
    style={{ background: "#0a0a0a" }}
  >
    <span className="text-sm font-mono" style={{ color: "#a3a3a3" }}>
      Loading template…
    </span>
  </div>
);

// All dynamic imports declared at module level (never inside render)
const PravahTemplate = dynamic(
  () => import("@/components/templates/PravahTemplate"),
  { ssr: false, loading: () => loadingFallback }
);
const ConceptA = dynamic(
  () => import("@/components/ambassador/ConceptA"),
  { ssr: false, loading: () => loadingFallback }
);
const ConceptB = dynamic(
  () => import("@/components/ambassador/ConceptB"),
  { ssr: false, loading: () => loadingFallback }
);
const ConceptC = dynamic(
  () => import("@/components/ambassador/ConceptC"),
  { ssr: false, loading: () => loadingFallback }
);
const CornSite = dynamic(
  () => import("@/components/ambassador/cornsite/CornSite"),
  { ssr: false, loading: () => loadingFallback }
);
const MainConcept = dynamic(
  () => import("@/components/ambassador/main/MainConcept"),
  { ssr: false, loading: () => loadingFallback }
);
const HeliosSite = dynamic(
  () => import("@/components/ambassador/heliossite/HeliosSite"),
  { ssr: false, loading: () => loadingFallback }
);
const NgpesSite = dynamic(
  () => import("@/components/ambassador/ngpessite/NgpesSite"),
  { ssr: false, loading: () => loadingFallback }
);
const BercoSite = dynamic(
  () => import("@/components/ambassador/bercosite/BercoSite"),
  { ssr: false, loading: () => loadingFallback }
);
const CinematicSite = dynamic(
  () => import("@/components/ambassador/boilernet/cinematic/CinematicSite"),
  { ssr: false, loading: () => loadingFallback }
);
const GlobeTrainSite = dynamic(
  () => import("@/components/ambassador/boilernet/globe/GlobeTrainSite"),
  { ssr: false, loading: () => loadingFallback }
);
const DroneSite = dynamic(
  () => import("@/components/ambassador/boilernet/drone/DroneSite"),
  { ssr: false, loading: () => loadingFallback }
);
const RestaurantTemplate = dynamic(
  () => import("@/components/templates/RestaurantTemplate"),
  { ssr: false, loading: () => loadingFallback }
);

export default function TemplateViewer({
  slug,
  preview = false,
}: {
  slug: string;
  /**
   * Preview mode is used by the gallery's live <iframe> thumbnails: it hides the
   * floating "← Gallery" pill and makes the whole render non-interactive so the
   * scaled-down embed reads as a static-looking poster of the template.
   */
  preview?: boolean;
}) {
  const entry = templateEntries.find((t) => t.id === slug);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (!entry) return null;

  let template: React.ReactNode;
  switch (entry.kind) {
    case "pravah":
      template = <PravahTemplate />;
      break;
    case "glass":
      template = <ConceptA />;
      break;
    case "cinematic":
      template = <ConceptB />;
      break;
    case "editorial":
      template = <ConceptC />;
      break;
    case "corn":
      template = <CornSite />;
      break;
    case "dark-3d":
      template = <MainConcept variant="dark" />;
      break;
    case "helios":
      template = <HeliosSite />;
      break;
    case "ngpes":
      template = <NgpesSite />;
      break;
    case "berco":
      template = <BercoSite />;
      break;
    case "boiler-cinematic":
      template = <CinematicSite />;
      break;
    case "boiler-globe":
      template = <GlobeTrainSite />;
      break;
    case "boiler-drone":
      template = <DroneSite />;
      break;
    case "restaurant":
      template = <RestaurantTemplate data={entry.data} />;
      break;
    default:
      return null;
  }

  // Preview embeds render the template bare and non-interactive so the scaled
  // <iframe> in the gallery card reads as a poster, not a clickable page.
  if (preview) {
    return (
      <div className="relative" style={{ pointerEvents: "none" }} aria-hidden>
        {template}
      </div>
    );
  }

  return (
    <div className="relative">
      {/* Floating back pill */}
      <div className="fixed top-4 left-5 z-[90]">
        <Link
          href="/"
          className="flex items-center gap-2 rounded-full px-4 py-2 text-xs font-semibold text-white"
          style={{
            background: "rgba(0,0,0,0.60)",
            backdropFilter: "blur(8px)",
            WebkitBackdropFilter: "blur(8px)",
            border: "1px solid rgba(255,255,255,0.15)",
          }}
        >
          <span>← Gallery</span>
          <span className="hidden sm:inline" style={{ color: "rgba(255,255,255,0.60)" }}>
            {entry.label}
          </span>
        </Link>
      </div>

      {/* Full-bleed template */}
      {template}
    </div>
  );
}
