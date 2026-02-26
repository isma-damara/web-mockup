"use client";

import GovNav from "../components/GovNav";
import { GaleriSection, GovFooter } from "../components/GovSections";

export default function GaleriPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <GaleriSection />
      <GovFooter />
    </div>
  );
}
