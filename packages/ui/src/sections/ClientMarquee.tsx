"use client";

const clients = [
  "Google",
  "Microsoft",
  "Amazon",
  "Tokopedia",
  "Gojek",
  "Telkom",
  "Bank BCA",
  "Pertamina",
  "Astra",
  "Unilever",
  "Samsung",
  "Shopee",
];

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
              key={`${client}-${idx}`}
              className="flex h-14 shrink-0 items-center justify-center rounded-xl border border-border bg-slate-50/50 px-8 text-sm font-semibold text-muted-foreground transition-colors hover:border-indigo-200 hover:text-indigo-600 hover:bg-indigo-50/50"
            >
              {client}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
