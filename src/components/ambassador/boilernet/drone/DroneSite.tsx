"use client";

import DroneChaseScene from "./DroneChaseScene";

// Ported from BoilerNet's /boilerline route — a cinematic FPV drone-chase
// flythrough (R3F) with an HID-style overlay. Auth + router links dropped for
// the gallery; CTAs are inert.
export default function DroneSite() {
  return (
    <div className="bn-scope">
      <main className="boilerline-page boilerline-page--cinematic">
        <DroneChaseScene />
        <div className="boilerline-cinematic-overlay">
          <div className="boilerline-cinematic-header">
            <p className="section-label">BoilerLine // FPV</p>
            <h1>The line that ships founders.</h1>
            <p>
              Tracking the express through the startup corridor. Mentors,
              builders, and capital — all on the same rails.
            </p>
          </div>
          <div className="boilerline-cinematic-actions">
            <button type="button" className="btn btn-primary">
              Board the Network
            </button>
            <button type="button" className="btn btn-sm">
              Back to Landing
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}
