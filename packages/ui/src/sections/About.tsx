"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import { Separator } from "@workspace/ui/ui/separator";
import {
  CursorArrowRaysIcon,
  EyeIcon,
  LightBulbIcon,
  UsersIcon,
} from "@heroicons/react/24/outline";

function AnimatedCounter({
  end,
  suffix = "",
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLDivElement>(null);
  const hasAnimated = useRef(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !hasAnimated.current) {
          hasAnimated.current = true;
          const startTime = performance.now();
          const animate = (currentTime: number) => {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3);
            setCount(Math.round(end * eased));
            if (progress < 1) requestAnimationFrame(animate);
          };
          requestAnimationFrame(animate);
        }
      },
      { threshold: 0.5 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [end, duration]);

  return (
    <div ref={ref} className="text-4xl font-bold text-indigo-600 sm:text-5xl">
      {count}
      {suffix}
    </div>
  );
}

export default function About() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section id="tentang" className="py-24 sm:py-32 bg-white" ref={sectionRef}>
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div
          className={`text-center max-w-3xl mx-auto ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <Badge
            variant="secondary"
            className="mb-4 rounded-full px-4 py-1.5 text-sm border border-indigo-200 bg-indigo-50 text-indigo-700"
          >
            Tentang Kami
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Lebih Dari Sekedar{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Perusahaan Teknologi
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
            Didirikan pada tahun 2018, NexaTech berkomitmen untuk menghadirkan
            solusi teknologi yang inovatif, efisien, dan berdampak nyata bagi
            bisnis klien kami di seluruh Indonesia.
          </p>
        </div>

        <Separator className="my-16 max-w-xs mx-auto" />

        {/* About */}
        <div
          className={`group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-1 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          <div className="grid gap-8 lg:grid-cols-5 lg:items-start">
            <div className="lg:col-span-3">
              <div className="mb-4 inline-flex rounded-xl bg-gradient-to-br from-purple-600 to-pink-500 p-3 text-white shadow-md">
                <LightBulbIcon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">About NexaTech</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                NexaTech adalah partner transformasi digital yang berfokus pada
                solusi yang relevan dengan kebutuhan bisnis, mudah digunakan,
                dan bisa bertumbuh bersama perusahaan klien.
              </p>
              <p className="mt-4 text-muted-foreground leading-relaxed">
                Kami membangun produk dan sistem digital dengan pendekatan yang
                kolaboratif, terukur, dan berorientasi hasil. Fokus kami adalah
                membantu perusahaan mempercepat proses bisnis, meningkatkan
                pengalaman pelanggan, dan menyiapkan fondasi teknologi yang siap
                berkembang untuk kebutuhan jangka panjang.
              </p>
            </div>

            <div className="flex items-end justify-center lg:col-span-2 lg:justify-end lg:self-end">
              <div
                className="w-full max-w-sm overflow-hidden rounded-2xl border border-border bg-background lg:max-w-[360px]"
                style={{ animationDelay: "150ms" }}
              >
                <img
                  src="/assets/company-profile/about/about.jpg"
                  alt="Visual company profile NexaTech"
                  loading="lazy"
                  className="h-56 w-full object-cover sm:h-60 lg:h-56"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Vision & Mission */}
        <div className="mt-8 grid gap-8 md:grid-cols-2">
          {[
            {
              icon: EyeIcon,
              title: "Visi",
              description:
                "Menjadi perusahaan teknologi terdepan di Asia Tenggara yang dikenal karena inovasi, kualitas, dan dampak positifnya terhadap transformasi digital.",
              gradient: "from-blue-500 to-indigo-600",
            },
            {
              icon: CursorArrowRaysIcon,
              title: "Misi",
              description:
                "Menyediakan solusi teknologi berkualitas tinggi yang membantu bisnis bertumbuh, meningkatkan efisiensi operasional, dan menciptakan pengalaman digital yang luar biasa.",
              gradient: "from-indigo-600 to-purple-600",
            },
          ].map((item, idx) => (
            <div
              key={item.title}
              className={`group relative rounded-2xl border border-border bg-card p-8 transition-all duration-300 hover:shadow-lg hover:shadow-indigo-100 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${(idx + 1) * 200}ms` }}
            >
              <div
                className={`mb-4 inline-flex rounded-xl bg-gradient-to-br ${item.gradient} p-3 text-white shadow-md`}
              >
                <item.icon className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-semibold">{item.title}</h3>
              <p className="mt-2 text-muted-foreground leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>

        {/* Why us */}
        <div className="mt-20 grid gap-12 lg:grid-cols-2 items-center">
          <div
            className={`${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            <h3 className="text-2xl font-bold sm:text-3xl">
              Mengapa Memilih NexaTech?
            </h3>
            <p className="mt-4 text-muted-foreground leading-relaxed">
              Kami menggabungkan keahlian teknis dengan pemahaman mendalam
              tentang bisnis untuk menghasilkan solusi yang tidak hanya canggih
              secara teknologi, tetapi juga memberikan nilai bisnis yang nyata.
            </p>
            <div className="mt-8 space-y-4">
              {[
                "Tim ahli bersertifikasi internasional",
                "Metodologi agile & transparan",
                "Support 24/7 dan maintenance berkelanjutan",
                "Harga kompetitif dengan kualitas premium",
              ].map((point) => (
                <div key={point} className="flex items-start gap-3">
                  <div className="mt-1 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-indigo-100">
                    <div className="h-2 w-2 rounded-full bg-indigo-600" />
                  </div>
                  <span className="text-muted-foreground">{point}</span>
                </div>
              ))}
            </div>
          </div>
          <div
            className={`grid grid-cols-2 gap-6 ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            {[
              {
                icon: UsersIcon,
                value: 50,
                suffix: "+",
                label: "Klien Puas",
              },
              {
                icon: CursorArrowRaysIcon,
                value: 150,
                suffix: "+",
                label: "Proyek Sukses",
              },
              {
                icon: LightBulbIcon,
                value: 8,
                suffix: "+",
                label: "Tahun Berpengalaman",
              },
              {
                icon: EyeIcon,
                value: 99,
                suffix: "%",
                label: "Tingkat Kepuasan",
              },
            ].map((stat) => (
              <div
                key={stat.label}
                className="rounded-2xl border border-border bg-card p-6 text-center transition-all hover:shadow-md hover:shadow-indigo-50"
              >
                <AnimatedCounter end={stat.value} suffix={stat.suffix} />
                <div className="mt-1 text-sm text-muted-foreground">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
