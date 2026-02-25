"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@workspace/ui/ui/card";
import { Button } from "@workspace/ui/ui/button";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

const projects = [
  {
    title: "E-Commerce Platform",
    category: "Web",
    description:
      "Platform e-commerce full-stack dengan fitur real-time inventory, payment gateway, dan admin dashboard.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    color: "bg-gradient-to-br from-blue-500 to-indigo-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-01.jpg",
  },
  {
    title: "HealthTrack Mobile App",
    category: "Mobile",
    description:
      "Aplikasi kesehatan mobile dengan fitur tracking aktivitas, telemedicine, dan integrasi wearable device.",
    tech: ["React Native", "Firebase", "TensorFlow Lite"],
    color: "bg-gradient-to-br from-emerald-500 to-teal-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-02.jpg",
  },
  {
    title: "Smart Analytics Dashboard",
    category: "Web",
    description:
      "Dashboard business intelligence dengan real-time data visualization, predictive analytics, dan automated reporting.",
    tech: ["React", "Python", "Apache Kafka", "D3.js"],
    color: "bg-gradient-to-br from-purple-500 to-pink-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-03.jpg",
  },
  {
    title: "Cloud Migration Suite",
    category: "Cloud",
    description:
      "Migrasi infrastruktur enterprise ke multi-cloud dengan zero downtime, automated CI/CD, dan cost optimization.",
    tech: ["AWS", "Terraform", "Kubernetes", "Docker"],
    color: "bg-gradient-to-br from-orange-500 to-red-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-04.jpg",
  },
  {
    title: "Customer Support Portal",
    category: "Web",
    description:
      "Portal layanan pelanggan berbasis web dengan ticketing, live chat, knowledge base, dan dashboard SLA untuk tim support.",
    tech: ["Next.js", "Node.js", "PostgreSQL", "Socket.IO"],
    color: "bg-gradient-to-br from-indigo-500 to-purple-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-05.jpg",
  },
  {
    title: "Company Intranet Hub",
    category: "Web",
    description:
      "Intranet perusahaan untuk pengumuman internal, dokumen divisi, approval workflow, dan direktori karyawan terpusat.",
    tech: ["React", "NestJS", "PostgreSQL", "Redis"],
    color: "bg-gradient-to-br from-slate-600 to-slate-800",
    thumbnail: "/assets/company-profile/portfolio/portfolio-06.jpg",
  },
  {
    title: "Online Booking Website",
    category: "Web",
    description:
      "Website reservasi layanan dengan jadwal real-time, payment gateway, notifikasi email, dan panel admin manajemen slot.",
    tech: ["Next.js", "Prisma", "PostgreSQL", "Midtrans"],
    color: "bg-gradient-to-br from-amber-500 to-orange-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-07.jpg",
  },
  {
    title: "Learning Management Website",
    category: "Web",
    description:
      "Platform LMS berbasis web untuk course management, progress tracking, kuis online, dan sertifikat otomatis.",
    tech: ["Next.js", "Laravel", "MySQL", "Tailwind CSS"],
    color: "bg-gradient-to-br from-cyan-500 to-blue-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-08.jpg",
  },
  {
    title: "Retail POS Analytics",
    category: "Web",
    description:
      "Aplikasi web analytics retail untuk monitoring cabang, performa penjualan, stok produk, dan laporan operasional harian.",
    tech: ["Next.js", "NestJS", "PostgreSQL", "Redis"],
    color: "bg-gradient-to-br from-violet-500 to-indigo-600",
    thumbnail: "/assets/company-profile/portfolio/portfolio-09.jpg",
  },
];

const filterTabs = ["All", "Web", "Mobile", "Cloud"];

export default function Portfolio() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.05 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const filtered =
    activeFilter === "All"
      ? projects
      : projects.filter((p) => p.category === activeFilter);

  return (
    <section id="portfolio" className="py-24 sm:py-32 bg-white" ref={sectionRef}>
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
            Portfolio
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Proyek yang Telah{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Kami Selesaikan
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Setiap proyek adalah bukti dedikasi kami dalam menghadirkan solusi
            teknologi terbaik untuk klien kami.
          </p>
        </div>

        {/* Category Filter */}
        <div
          className={`mt-10 flex items-center justify-center gap-2 ${
            isVisible ? "animate-fade-up" : "opacity-0"
          }`}
        >
          {filterTabs.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveFilter(tab)}
              className={`rounded-full px-5 py-2 text-sm font-medium transition-all ${
                activeFilter === tab
                  ? "bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-md shadow-indigo-200"
                  : "bg-muted text-muted-foreground hover:bg-indigo-50 hover:text-indigo-700"
              }`}
            >
              {tab}
              {tab !== "All" && (
                <span className="ml-1.5 text-xs opacity-70">
                  ({projects.filter((p) => p.category === tab).length})
                </span>
              )}
            </button>
          ))}
        </div>

        <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((project, idx) => (
            <Card
              key={project.title}
              className={`group overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Thumbnail header */}
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.thumbnail}
                  alt={`Thumbnail ${project.title}`}
                  loading="lazy"
                  className="absolute inset-0 h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 opacity-20">
                  <div className="absolute top-4 right-4 h-20 w-20 rounded-full border-2 border-white/30" />
                  <div className="absolute bottom-4 left-4 h-16 w-16 rounded-lg border-2 border-white/20 rotate-12" />
                  <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-24 w-24 rounded-2xl border-2 border-white/25 rotate-45" />
                </div>
              </div>
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between">
                  <CardTitle className="text-lg">{project.title}</CardTitle>
                  <Button
                    variant="ghost"
                    size="icon"
                    aria-label={`Lihat detail ${project.title}`}
                    className="h-8 w-8 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <ArrowTopRightOnSquareIcon className="h-4 w-4" />
                  </Button>
                </div>
                <CardDescription className="leading-relaxed">
                  {project.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-1.5">
                  {project.tech.map((t) => (
                    <Badge
                      key={t}
                      variant="outline"
                      className="rounded-full text-xs"
                    >
                      {t}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
