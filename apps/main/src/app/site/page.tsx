import Link from "next/link";
import { ArrowUpRight } from "lucide-react";
import { mockSites } from "@/lib/mock-sites";

export default function PortalPage() {
  return (
    <div className="min-h-screen bg-[#050505] text-white flex flex-col items-center justify-center p-6 selection:bg-indigo-500/30">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-[600px] w-[600px] rounded-full bg-indigo-600/5 blur-[120px]" />
      </div>

      <div className="relative w-full max-w-5xl">
        <header className="text-center mb-16 animate-fade-up">
          <h1 className="text-4xl font-extrabold tracking-tight sm:text-6xl mb-4 bg-linear-to-b from-white to-zinc-500 bg-clip-text text-transparent">
            Workspace
          </h1>
          <p className="text-zinc-500 text-lg sm:text-xl font-medium">
            Creative Management & Digital Ecosystem
          </p>
        </header>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {mockSites.map((app, idx) => (
            <Link
              key={app.slug}
              href={`/site/${app.slug}`}
              className="group relative flex flex-col items-center text-center rounded-3xl border border-white/5 bg-zinc-900/40 p-8 transition-all duration-500 hover:bg-zinc-900/60 hover:border-white/10 hover:-translate-y-2 hover:shadow-2xl backdrop-blur-md overflow-hidden animate-fade-up"
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <div
                className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${app.color} opacity-0 group-hover:opacity-10 blur-2xl transition-opacity duration-700`}
              />

              <div
                className={`mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br ${app.color} text-white shadow-lg ${app.shadow} transition-transform duration-500 group-hover:scale-110 group-hover:rotate-3`}
              >
                <app.icon className="h-8 w-8" />
              </div>

              <h3 className="text-xl font-bold text-white mb-2 transition-colors group-hover:text-white">
                {app.title}
              </h3>

              <p className="text-sm text-zinc-500 group-hover:text-zinc-400 transition-colors">
                {app.description}
              </p>

              <p className="mt-2 text-[11px] uppercase tracking-[0.18em] text-zinc-600">
                /site/{app.slug}
              </p>

              <div className="mt-8 flex items-center justify-center h-8 w-8 rounded-full bg-white/5 text-zinc-500 opacity-0 transition-all duration-300 group-hover:opacity-100 group-hover:bg-white/10 group-hover:text-white">
                <ArrowUpRight className="h-4 w-4" />
              </div>
            </Link>
          ))}
        </div>

        <footer className="mt-20 text-center animate-fade-in animation-delay-600">
          <div className="inline-flex items-center gap-2 rounded-full border border-white/5 bg-white/5 px-4 py-1.5 text-xs font-medium text-zinc-500 backdrop-blur-sm">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            Single Vercel Project / Multi Mock Sites
          </div>
        </footer>
      </div>
    </div>
  );
}
