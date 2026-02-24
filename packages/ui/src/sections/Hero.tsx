"use client";

import { useEffect, useRef, useState } from "react";
import { Button } from "@workspace/ui/ui/button";
import { Badge } from "@workspace/ui/ui/badge";
import Link from "next/link";
import { ArrowRight, Sparkles, MessageCircle } from "lucide-react";

const headlines = [
  "Digital Bersama Kami",
  "dengan Solusi Inovatif",
  "Melalui Teknologi AI",
  "& Transformasi Digital",
];

export default function Hero() {
  const heroRef = useRef<HTMLDivElement>(null);
  const [headlineIdx, setHeadlineIdx] = useState(0);
  const [animating, setAnimating] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setAnimating(true);
      setTimeout(() => {
        setHeadlineIdx((prev) => (prev + 1) % headlines.length);
        setAnimating(false);
      }, 400);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!heroRef.current) return;
      const { clientX, clientY } = e;
      const { width, height } = heroRef.current.getBoundingClientRect();
      const x = (clientX / width - 0.5) * 20;
      const y = (clientY / height - 0.5) * 20;
      heroRef.current.style.setProperty("--mouse-x", `${x}px`);
      heroRef.current.style.setProperty("--mouse-y", `${y}px`);
    };
    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <section
      id="beranda"
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden"
    >
      {/* Background gradient blobs */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-96 w-96 rounded-full bg-indigo-200/40 blur-3xl animate-float" />
        <div className="absolute top-1/3 right-1/4 h-80 w-80 rounded-full bg-purple-200/40 blur-3xl animate-float animation-delay-400" />
        <div className="absolute bottom-1/4 left-1/3 h-72 w-72 rounded-full bg-blue-200/30 blur-3xl animate-float animation-delay-800" />
        {/* Grid pattern */}
        <div
          className="absolute inset-0 opacity-[0.03]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 text-center">
        <div className="animate-fade-up">
          <Badge
            variant="secondary"
            className="mb-6 rounded-full px-4 py-1.5 text-sm font-medium border border-indigo-200 bg-indigo-50 text-indigo-700"
          >
            <Sparkles className="mr-1.5 h-3.5 w-3.5" />
            Inovasi Teknologi 2026
          </Badge>
        </div>

        <h1 className="animate-fade-up animation-delay-200 text-4xl font-extrabold tracking-tight sm:text-5xl md:text-6xl lg:text-7xl">
          <span className="block text-foreground">Bangun Masa Depan</span>
          <span
            className={`mt-2 block bg-gradient-to-r from-indigo-600 via-purple-600 to-indigo-600 bg-clip-text text-transparent transition-all duration-400 ${
              animating
                ? "opacity-0 translate-y-4"
                : "opacity-100 translate-y-0"
            }`}
          >
            {headlines[headlineIdx]}
          </span>
        </h1>

        <p className="animate-fade-up animation-delay-400 mx-auto mt-6 max-w-2xl text-lg text-muted-foreground sm:text-xl leading-relaxed">
          NexaTech menghadirkan solusi teknologi inovatif untuk mentransformasi
          bisnis Anda. Dari pengembangan web hingga kecerdasan buatan, kami
          siap menjadi partner digital Anda.
        </p>

        <div className="animate-fade-up animation-delay-600 mt-10 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
          >
            <Link href="#kontak">
              <MessageCircle className="mr-2 h-4 w-4" />
              Get Free Consultation
            </Link>
          </Button>
          <Button
            asChild
            size="lg"
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white px-8 shadow-lg shadow-indigo-200 transition-all hover:shadow-xl hover:shadow-indigo-300 hover:-translate-y-0.5"
          >
            <Link href="#layanan">
              Lihat Layanan
              <ArrowRight className="ml-2 h-4 w-4" />
            </Link>
          </Button>
          <Button
            asChild
            variant="outline"
            size="lg"
            className="rounded-full px-8 border-indigo-200 text-indigo-700 hover:bg-indigo-50"
          >
            <Link href="#tentang">Tentang Kami</Link>
          </Button>
        </div>

        {/* Stats row */}
        <div className="animate-fade-up animation-delay-800 mt-20 grid grid-cols-2 gap-8 sm:grid-cols-4 max-w-3xl mx-auto">
          {[
            { value: "200+", label: "Projects Completed" },
            { value: "50+", label: "Happy Clients" },
            { value: "8+", label: "Years Experience" },
            { value: "25+", label: "Expert Team" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <div className="text-3xl font-bold text-indigo-600 sm:text-4xl">
                {stat.value}
              </div>
              <div className="mt-1 text-sm text-muted-foreground">
                {stat.label}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
