"use client";

import GovNav from "../components/GovNav";
import { PPIDSection, GovFooter } from "../components/GovSections";

export default function PPIDPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <PPIDSection />
      <GovFooter />
    </div>
  );
}
