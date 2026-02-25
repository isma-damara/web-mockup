"use client";

import type { SimpleIcon } from "simple-icons";
import {
  siGoogle,
  siGojek,
  siAstra,
  siUnilever,
  siSamsung,
  siShopee,
} from "simple-icons";

type ClientItem = {
  name: string;
  icon?: SimpleIcon;
  mono?: string;
  monoBg?: string;
  monoFg?: string;
};

const clients: ClientItem[] = [
  { name: "Google", icon: siGoogle },
  {
    name: "Microsoft",
    mono: "MS",
    monoBg: "#F3F4F6",
    monoFg: "#2563EB",
  },
  {
    name: "Amazon",
    mono: "AMZ",
    monoBg: "#FFF7ED",
    monoFg: "#EA580C",
  },
  {
    name: "Tokopedia",
    mono: "T",
    monoBg: "#ECFDF5",
    monoFg: "#16A34A",
  },
  { name: "Gojek", icon: siGojek },
  {
    name: "Telkom",
    mono: "TLK",
    monoBg: "#FEF2F2",
    monoFg: "#DC2626",
  },
  {
    name: "Bank BCA",
    mono: "BCA",
    monoBg: "#EFF6FF",
    monoFg: "#1D4ED8",
  },
  {
    name: "Pertamina",
    mono: "P",
    monoBg: "#ECFEFF",
    monoFg: "#0891B2",
  },
  { name: "Astra", icon: siAstra },
  { name: "Unilever", icon: siUnilever },
  { name: "Samsung", icon: siSamsung },
  { name: "Shopee", icon: siShopee },
];

function BrandLogo({ client }: { client: ClientItem }) {
  if (client.icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-5 w-5 shrink-0"
        style={{ color: `#${client.icon.hex}` }}
      >
        <path fill="currentColor" d={client.icon.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-6 min-w-6 items-center justify-center rounded-md px-1.5 text-[10px] font-bold tracking-wide"
      style={{
        backgroundColor: client.monoBg ?? "#EEF2FF",
        color: client.monoFg ?? "#4338CA",
      }}
    >
      {client.mono ?? client.name.slice(0, 2).toUpperCase()}
    </span>
  );
}

export default function ClientMarquee() {
  return (
    <section id="klien" className="py-16 sm:py-20 bg-white border-y border-border">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center mb-10">
        <p className="text-sm font-medium text-muted-foreground uppercase tracking-wider">
          Dipercaya oleh brand ternama
        </p>
      </div>
      <div className="relative overflow-hidden">
        {/* Fade edges */}
        <div className="pointer-events-none absolute left-0 top-0 z-10 h-full w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute right-0 top-0 z-10 h-full w-24 bg-gradient-to-l from-white to-transparent" />

        {/* Marquee track */}
        <div className="flex animate-marquee gap-12 items-center">
          {[...clients, ...clients].map((client, idx) => (
            <div
              key={`${client.name}-${idx}`}
              className="group flex h-14 shrink-0 items-center justify-center gap-2.5 rounded-xl border border-border bg-slate-50/50 px-6 text-sm font-semibold text-muted-foreground transition-colors hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50"
            >
              <BrandLogo client={client} />
              <span>{client.name}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
