import Hero from "@/components/sections/Hero";
import ProblemGrid from "@/components/sections/ProblemGrid";
import Technology from "@/components/sections/Technology";
import DeploymentMap from "@/components/sections/DeploymentMap";
import ResearchList from "@/components/sections/ResearchList";
import InvestorRow from "@/components/sections/InvestorRow";
import FinalCTA from "@/components/sections/FinalCTA";
import Footer from "@/components/sections/Footer";

/**
 * The page just composes ordered sections. Section order and copy come from
 * src/config/content.config.ts, so the template re-skins from config alone.
 */
export default function Home() {
  return (
    <main>
      <Hero />
      <ProblemGrid />
      <Technology />
      <DeploymentMap />
      <ResearchList />
      <InvestorRow />
      <FinalCTA />
      <Footer />
    </main>
  );
}
