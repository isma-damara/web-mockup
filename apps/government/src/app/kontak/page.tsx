"use client";

import GovNav from "../components/GovNav";
import { PengaduanSection, MapSocialSection, GovFooter } from "../components/GovSections";

export default function KontakPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <PengaduanSection />
      <MapSocialSection />
      <GovFooter />
    </div>
  );
}
