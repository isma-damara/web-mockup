"use client";

import GovNav from "../components/GovNav";
import { PariwisataSection, GovFooter } from "../components/GovSections";

export default function PariwisataPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <PariwisataSection />
      <GovFooter />
    </div>
  );
}
