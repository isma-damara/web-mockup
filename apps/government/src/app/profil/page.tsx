"use client";

import { Building, Eye, TrendingUp } from "lucide-react";
import GovNav from "../components/GovNav";
import { GovFooter } from "../components/GovSections";

export default function ProfilPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <section className="py-16 sm:py-20 bg-gradient-to-br from-emerald-50 to-teal-50">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
              <Building className="h-3.5 w-3.5" /> Profil Kota
            </span>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">Visi & Misi <span className="text-emerald-600">Kota Nusantara</span></h1>
          </div>
          <div className="grid gap-6 lg:grid-cols-2">
            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2"><Eye className="h-5 w-5 text-emerald-600" /><h2 className="font-semibold text-slate-800">Visi</h2></div>
              <p className="text-sm text-slate-600 leading-relaxed">Mewujudkan Kota Nusantara sebagai kota modern, inklusif, dan berkelanjutan yang menjadi kebanggaan masyarakat Indonesia.</p>
            </div>
            <div className="rounded-xl border border-emerald-200 bg-white p-5">
              <div className="flex items-center gap-2 mb-2"><TrendingUp className="h-5 w-5 text-emerald-600" /><h2 className="font-semibold text-slate-800">Misi</h2></div>
              <ul className="text-sm text-slate-600 space-y-1.5">
                {[
                  "Meningkatkan kualitas pelayanan publik berbasis digital",
                  "Membangun infrastruktur hijau dan berkelanjutan",
                  "Mendorong pertumbuhan ekonomi inklusif",
                  "Memperkuat budaya dan pariwisata lokal",
                ].map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <div className="mt-1.5 h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0" />{m}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
      <GovFooter />
    </div>
  );
}
