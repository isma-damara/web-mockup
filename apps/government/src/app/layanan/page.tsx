"use client";

import GovNav from "../components/GovNav";
import { GovFooter } from "../components/GovSections";
import { services } from "../components/GovData";

export default function LayananPage() {
  return (
    <div className="min-h-screen bg-emerald-50/20 font-sans">
      <GovNav />
      <section className="py-16 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <span className="inline-flex items-center gap-1.5 rounded-full bg-emerald-100 px-4 py-1.5 text-sm font-medium text-emerald-700 mb-3">
              Layanan Publik
            </span>
            <h1 className="text-2xl font-bold text-slate-800 sm:text-3xl">
              Layanan untuk <span className="text-emerald-600">Masyarakat</span>
            </h1>
            <p className="mt-2 text-slate-500 max-w-lg mx-auto">Akses layanan pemerintahan secara online dengan cepat dan transparan.</p>
          </div>
          <div className="grid gap-4 grid-cols-2 sm:grid-cols-4">
            {services.map((svc) => (
              <div key={svc.name} className="group flex flex-col items-center gap-3 rounded-2xl border border-slate-200 bg-white p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100 hover:border-emerald-200">
                <div className={`flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br ${svc.color} text-white shadow-md transition-transform group-hover:scale-110`}>
                  <svc.icon className="h-6 w-6" />
                </div>
                <div className="text-center">
                  <div className="font-semibold text-sm text-slate-700">{svc.name}</div>
                  <div className="text-xs text-slate-400 mt-0.5">{svc.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
      <GovFooter />
    </div>
  );
}
