"use client";

import GovNav from "../components/GovNav";
import { PengaduanSection, GovFooter } from "../components/GovSections";

export default function PengaduanPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <PengaduanSection />
      <GovFooter />
    </div>
  );
}
