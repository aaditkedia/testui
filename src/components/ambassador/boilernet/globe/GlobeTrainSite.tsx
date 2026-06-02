"use client";

import { memo, useRef, useState, type FormEvent } from "react";
import GlobeCanvas from "./GlobeCanvas";
import TrainGuide from "./TrainGuide";

// Ported from BoilerNet's /v1 landing — a custom-shader night-Earth globe hero
// with a scroll-linked SVG train riding a spline down the page. Router/auth/API
// couplings were stripped for the gallery; the newsletter form is inert and the
// CTAs are static buttons.

const FEATURES = [
  { title: "Mentor Agreement", desc: "Every founder ↔ mentor pairing runs on a contracted template. 7-day notification, capped participation, confidentiality, all in writing.", icon: "shield" },
  { title: "Public Scorecard", desc: "Reputational enforcement of the agreement. Green / yellow / red flags per category, with a 14-day right to respond before publication.", icon: "compass" },
  { title: "Async-First Mentorship", desc: "Loom + written feedback by default. Live sessions only when both sides want them. Respect for everyone's time, built in.", icon: "chat" },
  { title: "Behavioral Signal", desc: "GitHub commit cadence, shipping velocity, mentor repeat-bookings, response SLA. Profiles are receipts, not résumés.", icon: "calendar" },
  { title: "Cofounder Matching", desc: "Opt-in availability flag on founder profiles. Mutual match required. Inside the network, not a public board.", icon: "team" },
  { title: "Persistent Context", desc: "Transcripts and meeting history stay with the relationship — every conversation builds on the last, on the private tier of the founder profile.", icon: "book" },
];

const PILLARS = [
  { num: "01", title: "Curation is the floor", desc: "Manual vetting on every applicant, both sides. Public criteria, named admins, no anonymous data access." },
  { num: "02", title: "Data is the moat", desc: "Meeting transcripts, mentor repeat-bookings, shipping cadence, founder-employment graph. Longitudinal signal nobody else has." },
  { num: "03", title: "Product surfaces compound", desc: "Demo Candidate Pages, Scorecard, cofounder matching — every surface is designed to capture data that feeds the moat." },
  { num: "04", title: "Monetization on top", desc: "Indianapolis enterprise seats and Midwest VC scout retainers fund Year 1. SF accelerator partnerships are a feature, not the headline." },
  { num: "05", title: "Indianapolis-first", desc: "Lilly, Salesforce, Cummins, Anthem, High Alpha sign $25K seats faster than any SF Series B. That's where Year 1 ARR comes from." },
];

const FLOW_STEPS = [
  {
    role: "Founder",
    accent: "gold",
    steps: [
      "Apply — public criteria, transparent vetting",
      "Two-tier profile: public signal, private artifacts",
      "Get paired with an alumni mentor under the Agreement",
      "Async-first sessions, transcripts stay with you",
      "Notify your mentor 7 days before any raise (Clause A)",
    ],
  },
  {
    role: "Mentor",
    accent: "cobalt",
    steps: [
      "Invited or referred by an existing mentor",
      "Sign the Agreement — capped participation, confidentiality",
      "Receive admin-routed pairings (no spam)",
      "Mentor async-first; escalate to live by mutual agreement",
      "Activate first-look rights when the founder raises",
    ],
  },
  {
    role: "Admin",
    accent: "marigold",
    steps: [
      "Review founder + mentor applications by hand",
      "Match pairings manually (automation is earned)",
      "Monitor Scorecard; mediate disputes within 14 days",
      "Enforce no-show and no-solicitation policies",
      "Keep the network's signal-to-noise high",
    ],
  },
  {
    role: "Recruiter",
    accent: "marigold",
    steps: [
      "Apply for access; admin vets the company",
      "Pilot: free 3-month access for 3 companies / cohort",
      "Search job-seeking-track candidates with behavioral filters",
      "Request intros via admin; founder consents",
      "Convert to paid; 90-day placement guarantee",
    ],
  },
  {
    role: "VC Scout",
    accent: "cobalt",
    steps: [
      "Sign a retainer — $30K – $50K / year / fund",
      "Receive early dealflow 12+ months pre-demo-day",
      "View behavioral signal: shipping, repeat-bookings, graph density",
      "Request founder intro via admin",
      "Optionally mentor and pick up first-call rights on raises",
    ],
  },
];

function FeatureIcon({ type }: { type: string }) {
  switch (type) {
    case "person": return <svg viewBox="0 0 24 24"><circle cx="12" cy="8" r="4"/><path d="M4 20c0-4 3.6-7 8-7s8 3 8 7"/></svg>;
    case "grid": return <svg viewBox="0 0 24 24"><rect x="3" y="3" width="7" height="7" rx="1"/><rect x="14" y="3" width="7" height="7" rx="1"/><rect x="3" y="14" width="7" height="7" rx="1"/><rect x="14" y="14" width="7" height="7" rx="1"/></svg>;
    case "team": return <svg viewBox="0 0 24 24"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75"/></svg>;
    case "chat": return <svg viewBox="0 0 24 24"><path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/></svg>;
    case "money": return <svg viewBox="0 0 24 24"><line x1="12" y1="1" x2="12" y2="23"/><path d="M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/></svg>;
    case "edit": return <svg viewBox="0 0 24 24"><path d="M12 20h9"/><path d="M16.5 3.5a2.121 2.121 0 0 1 3 3L7 19l-4 1 1-4Z"/></svg>;
    case "shield": return <svg viewBox="0 0 24 24"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/><path d="M9 12l2 2 4-4"/></svg>;
    case "compass": return <svg viewBox="0 0 24 24"><circle cx="12" cy="12" r="10"/><polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76"/></svg>;
    case "calendar": return <svg viewBox="0 0 24 24"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>;
    case "book": return <svg viewBox="0 0 24 24"><path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/><path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/></svg>;
    default: return null;
  }
}

const FeatureCard = memo(function FeatureCard({ feature }: { feature: typeof FEATURES[number] }) {
  return (
    <div className="feature">
      <div className="feature-icon"><FeatureIcon type={feature.icon} /></div>
      <h3>{feature.title}</h3>
      <p>{feature.desc}</p>
    </div>
  );
});

function StaticNewsletter() {
  const [email, setEmail] = useState("");
  const [done, setDone] = useState(false);
  const submit = (e: FormEvent) => {
    e.preventDefault();
    if (email.trim()) setDone(true);
  };
  return (
    <form className="newsletter-form" onSubmit={submit}>
      <p className="newsletter-label">Get the weekly digest</p>
      <div className="newsletter-row">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="you@purdue.edu"
          required
        />
        <button type="submit" className="btn btn-primary">Subscribe</button>
      </div>
      {done && <p className="newsletter-msg success">You're in!</p>}
    </form>
  );
}

export default function GlobeTrainSite() {
  const globeRotRef = useRef(86.9);

  return (
    <div className="bn-scope">
      <div id="page-wrap">

        {/* ── HERO ── */}
        <section className="hero" id="sec-hero">
          <div className="hero-globe-glow" />
          <GlobeCanvas rotRef={globeRotRef} />
          <div className="hero-overlay" />
          <div className="hero-content">
            <div className="hero-text">
              <p className="hero-eyebrow">For Purdue founders &amp; Midwest capital</p>
              <h1>The <span className="gold">Midwest</span><br />founder-talent graph.</h1>
              <p className="hero-sub">
                Curated Purdue student founders, paired with vetted alumni
                founder-mentors under a contracted agreement and a public
                Scorecard. Indianapolis enterprise and Midwest VCs fund the work;
                the data we capture is the moat.
              </p>
              <div className="hero-actions">
                <button type="button" className="btn btn-primary btn-lg">Apply to Join</button>
                <button type="button" className="btn btn-lg">About</button>
              </div>
            </div>
          </div>
        </section>

        {/* ── STATS ── */}
        <div className="stats-band" id="sec-stats">
          <div className="stat"><span className="stat-n">34</span><span className="stat-l">Members</span></div>
          <div className="stat"><span className="stat-n">6</span><span className="stat-l">Projects</span></div>
          <div className="stat"><span className="stat-n">10</span><span className="stat-l">Open Roles</span></div>
          <div className="stat"><span className="stat-n">4</span><span className="stat-l">Investors</span></div>
          <div className="stat"><span className="stat-n">8</span><span className="stat-l">Countries</span></div>
        </div>

        {/* ── NETWORK ── */}
        <div className="network-bg" id="sec-network">
          <div className="section">
            <div className="network-grid">
              <div>
                <p className="section-label">The Graph</p>
                <h2>Purdue, Indianapolis,<br />and the Midwest</h2>
                <p className="section-sub">
                  Year 1 is depth, not breadth. The network is intentionally
                  small: a hand-vetted cohort of founders, alumni mentors, and the
                  regional enterprise + VC buyers who pay for access to them.
                </p>
                <div className="conn-list">
                  <div className="conn-item"><div className="conn-dot dot-gold" /><span className="conn-from">Vetted Founder</span><span className="conn-arr">&rarr;</span><span className="conn-to">Alumni Mentor · Lilly / High Alpha</span><span className="conn-role">Pairing</span></div>
                  <div className="conn-item"><div className="conn-dot dot-blue" /><span className="conn-from">Founder Pairing</span><span className="conn-arr">&rarr;</span><span className="conn-to">Drive Capital scout retainer</span><span className="conn-role">Scout</span></div>
                  <div className="conn-item"><div className="conn-dot dot-green" /><span className="conn-from">Job-seeking Track</span><span className="conn-arr">&rarr;</span><span className="conn-to">Indianapolis enterprise seat (Cummins)</span><span className="conn-role">Recruiter</span></div>
                  <div className="conn-item"><div className="conn-dot dot-gold" /><span className="conn-from">Pre-founder Talent</span><span className="conn-arr">&rarr;</span><span className="conn-to">SF startup summer internship</span><span className="conn-role">Placement</span></div>
                  <div className="conn-item"><div className="conn-dot dot-blue" /><span className="conn-from">YC Alumnus</span><span className="conn-arr">&rarr;</span><span className="conn-to">Mentor with first-look rights</span><span className="conn-role">Inbound</span></div>
                </div>
                <div className="globe-legend">
                  <div className="legend-row"><div className="legend-line" style={{ background: "var(--gold)" }} />Founder ↔ mentor pairings</div>
                  <div className="legend-row"><div className="legend-line" style={{ background: "#7ab4e8" }} />VC scout retainers</div>
                  <div className="legend-row"><div className="legend-line" style={{ background: "#7ee89a" }} />Recruiter seats &amp; placements</div>
                </div>
              </div>
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "3px", padding: "2rem", textAlign: "center" }}>
                  <p style={{ fontSize: ".78rem", color: "var(--text-muted)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".5rem" }}>Year 1 revenue lines</p>
                  <p style={{ fontSize: ".82rem", color: "var(--text-muted)", lineHeight: "1.6" }}>
                    Indianapolis enterprise seats at $25K / yr · Midwest VC scout
                    retainers at $30–50K / yr · hardware/deep-tech YC seats at
                    $7.5K + per-hire · SF internship placements at $5–15K each.
                  </p>
                </div>
                <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "3px", padding: "1.5rem" }}>
                  <p style={{ fontSize: ".72rem", color: "var(--gold)", letterSpacing: ".1em", textTransform: "uppercase", marginBottom: ".75rem" }}>Target customers</p>
                  <div style={{ display: "flex", flexWrap: "wrap", gap: ".4rem" }}>
                    {["Lilly", "Salesforce", "Cummins", "Anthem", "Allison", "Roche", "Rolls-Royce", "High Alpha", "Drive Capital", "M25", "Elevate Ventures", "Hyde Park Angels"].map(name => (
                      <span key={name} style={{ fontSize: ".78rem", padding: ".2rem .6rem", border: "1px solid var(--border)", borderRadius: "2px", color: "var(--text-muted)" }}>{name}</span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* ── FEATURES ── */}
        <div id="sec-features">
          <div className="section">
            <p className="section-label">What's in the platform</p>
            <h2 style={{ marginBottom: "2.5rem" }}>Mentorship as a contract,<br />not a calendar tool</h2>
            <div className="features-grid">
              {FEATURES.map((f) => (
                <FeatureCard key={f.title} feature={f} />
              ))}
            </div>
          </div>
        </div>

        {/* ── PILLARS ── */}
        <div className="pillars-bg" id="sec-pillars">
          <div className="section">
            <p className="section-label section-label-cobalt">Strategic stack</p>
            <h2 style={{ marginBottom: "1rem" }}>Curation, then data,<br />then product, then revenue</h2>
            <p className="section-sub">
              The thing that compounds is owning the structured relationship data —
              every pairing, fundraise, and hire — across a curated chapter.
            </p>
            <div className="pillars-grid">
              {PILLARS.map((p) => (
                <div key={p.num} className="pillar-card">
                  <span className="pillar-num">{p.num}</span>
                  <h3>{p.title}</h3>
                  <p>{p.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── HOW IT WORKS ── */}
        <div id="sec-how">
          <div className="section">
            <p className="section-label">How It Works</p>
            <h2 style={{ marginBottom: "1rem" }}>Five personas,<br />one curated loop</h2>
            <p className="section-sub">
              Founders, mentors, admins, recruiters, and VC scouts each plug in
              through their own door. Every cross-persona interaction is
              admin-mediated.
            </p>
            <div className="flow-grid">
              {FLOW_STEPS.map((col) => (
                <div key={col.role} className={`flow-col flow-col-${col.accent}`}>
                  <div className="flow-col-header">
                    <span className="flow-role-tag">{col.role}</span>
                  </div>
                  <ol className="flow-steps">
                    {col.steps.map((step, i) => (
                      <li key={i}>
                        <span className="flow-step-num">{String(i + 1).padStart(2, "0")}</span>
                        <span className="flow-step-text">{step}</span>
                      </li>
                    ))}
                  </ol>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── DESIGN PRINCIPLES ── */}
        <div className="principles-bg" id="sec-principles">
          <div className="section">
            <p className="section-label">Three insights</p>
            <h2 style={{ marginBottom: "2.5rem" }}>Indianapolis pays.<br />The data compounds.<br />SF is a feature.</h2>
            <div className="principles-grid">
              <div className="principle-card">
                <span className="principle-tag tag-wheat">Indianapolis pays the bills</span>
                <p>Regional enterprise will sign a $25K seat faster than any SF Series B. That's Year 1 ARR.</p>
              </div>
              <div className="principle-card">
                <span className="principle-tag tag-marigold">Data is the moat</span>
                <p>Meeting transcripts, mentor repeat-bookings, shipping cadence, founder-employment graph. The data is the asset.</p>
              </div>
              <div className="principle-card">
                <span className="principle-tag tag-cobalt">SF is a feature, not a market</span>
                <p>Not a feeder to YC. YC alumni come back to mentor, recruit, and source dealflow. The arrow flips.</p>
              </div>
            </div>
          </div>
        </div>

        {/* ── COMMUNITY ── */}
        <div className="community-section-bg" id="sec-community">
          <div className="section">
            <p className="section-label">Three ways in</p>
            <h2 style={{ marginBottom: "2.5rem" }}>Apply to the network,<br />or use the free entry points</h2>
            <div className="community-grid">
              <div className="community-card">
                <h3>Apply to the network</h3>
                <p>Vetted track. Two-tier profile, mentor pairing under the Agreement, behavioral signal on your profile.</p>
                <button type="button" className="btn">Apply now</button>
              </div>
              <div className="community-card">
                <h3>Book Open Office Hours</h3>
                <p>Free 15-minute slots, one per week, for any Purdue student. No application gate.</p>
                <button type="button" className="btn">Book a slot</button>
              </div>
              <div className="community-card">
                <h3>Get the newsletter</h3>
                <p>Free weekly digest for every Purdue student — new projects, open roles, featured founders.</p>
                <StaticNewsletter />
              </div>
            </div>
          </div>
        </div>

        {/* ── FOOTER ── */}
        <footer className="landing-footer">
          <div className="footer-links">
            <span>About</span>
            <span>Vetting</span>
            <span>Mentor agreement</span>
            <span>Scorecard</span>
            <span>Governance</span>
            <span>Office hours</span>
          </div>
          <p>&copy; {new Date().getFullYear()} BoilerNet &middot; Purdue University</p>
          <p className="footer-tagline">Boiler Up.</p>
        </footer>

        {/* ── TRAIN GUIDE (absolute overlay) ── */}
        <TrainGuide />

      </div>
    </div>
  );
}
