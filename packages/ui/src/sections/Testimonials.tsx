"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import { Card, CardContent } from "@workspace/ui/ui/card";
import { Button } from "@workspace/ui/ui/button";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChatBubbleLeftRightIcon,
} from "@heroicons/react/24/outline";
import { StarIcon } from "@heroicons/react/24/solid";

const testimonials = [
  {
    name: "Andi Pratama",
    company: "PT Maju Bersama",
    role: "CEO",
    content:
      "NexaTech benar-benar mengubah cara kami berbisnis. Sistem yang mereka bangun meningkatkan efisiensi operasional kami hingga 40%. Tim yang sangat profesional dan responsif!",
    rating: 5,
    gradient: "from-blue-500 to-indigo-500",
    photo: "/assets/company-profile/testimonials/client-01.jpg",
  },
  {
    name: "Siti Rahayu",
    company: "Tokoku Digital",
    role: "Founder",
    content:
      "Aplikasi e-commerce yang dikembangkan NexaTech luar biasa. Performa cepat, desain menarik, dan konversi meningkat 60%. Sangat recommended!",
    rating: 5,
    gradient: "from-indigo-500 to-purple-500",
    photo: "/assets/company-profile/testimonials/client-02.jpg",
  },
  {
    name: "Hendra Gunawan",
    company: "Bank Nusantara",
    role: "CIO",
    content:
      "Migrasi cloud yang dilakukan NexaTech berjalan mulus tanpa downtime. Biaya infrastruktur kami turun 35% dengan performa yang justru meningkat. Partner terpercaya.",
    rating: 5,
    gradient: "from-purple-500 to-pink-500",
    photo: "/assets/company-profile/testimonials/client-03.jpg",
  },
  {
    name: "Lisa Wijayanti",
    company: "HealthFirst",
    role: "COO",
    content:
      "Chatbot AI dari NexaTech menangani 70% inquiry pelanggan kami secara otomatis. Respon cepat dan akurat. Customer satisfaction meningkat signifikan.",
    rating: 5,
    gradient: "from-emerald-500 to-teal-500",
    photo: "/assets/company-profile/testimonials/client-04.jpg",
  },
  {
    name: "Rudi Hartono",
    company: "Logistik Express",
    role: "CTO",
    content:
      "Dashboard analytics dari NexaTech memberikan visibility yang luar biasa terhadap operasi kami. Keputusan bisnis menjadi lebih data-driven dan tepat sasaran.",
    rating: 5,
    gradient: "from-orange-500 to-red-500",
    photo: "/assets/company-profile/testimonials/client-05.jpg",
  },
];

export default function Testimonials() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

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

  const next = useCallback(() => {
    setCurrent((prev) => (prev + 1) % testimonials.length);
  }, []);

  const prev = useCallback(() => {
    setCurrent(
      (prev) => (prev - 1 + testimonials.length) % testimonials.length
    );
  }, []);

  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(next, 5000);
    return () => clearInterval(interval);
  }, [isPaused, next]);

  return (
    <section
      id="testimoni"
      className="py-24 sm:py-32 bg-white"
      ref={sectionRef}
    >
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
            Testimoni
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Apa Kata{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Klien Kami
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Kepuasan klien adalah prioritas utama kami. Dengarkan langsung dari
            mereka yang telah merasakan dampak positif solusi kami.
          </p>
        </div>

        <div
          className={`mt-16 relative max-w-4xl mx-auto ${
            isVisible ? "animate-fade-up animation-delay-200" : "opacity-0"
          }`}
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
        >
          {/* Main testimonial card */}
          <Card className="overflow-hidden border-border bg-card shadow-lg">
            <CardContent className="p-8 sm:p-12 relative">
              <ChatBubbleLeftRightIcon className="absolute top-6 right-6 h-12 w-12 text-indigo-100" />
              
              {/* Stars */}
              <div className="flex gap-1 mb-6">
                {Array.from({ length: testimonials[current].rating }).map(
                  (_, i) => (
                    <StarIcon
                      key={i}
                      className="h-5 w-5 fill-amber-400 text-amber-400"
                    />
                  )
                )}
              </div>

              {/* Content */}
              <blockquote className="text-lg sm:text-xl text-foreground leading-relaxed font-medium">
                &ldquo;{testimonials[current].content}&rdquo;
              </blockquote>

              {/* Author */}
              <div className="mt-8 flex items-center gap-4">
                <div
                  className={`h-12 w-12 overflow-hidden rounded-full bg-gradient-to-br p-[2px] ${testimonials[current].gradient}`}
                >
                  <img
                    src={testimonials[current].photo}
                    alt={`Foto ${testimonials[current].name}`}
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover bg-white"
                  />
                </div>
                <div>
                  <div className="font-semibold">
                    {testimonials[current].name}
                  </div>
                  <div className="text-sm text-muted-foreground">
                    {testimonials[current].role},{" "}
                    {testimonials[current].company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Navigation */}
          <div className="mt-8 flex items-center justify-center gap-4">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              className="rounded-full h-10 w-10 border-indigo-200 hover:bg-indigo-50"
            >
              <ChevronLeftIcon className="h-4 w-4" />
            </Button>

            {/* Dots */}
            <div className="flex gap-2">
              {testimonials.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrent(idx)}
                  className={`h-2.5 rounded-full transition-all duration-300 ${
                    idx === current
                      ? "w-8 bg-indigo-600"
                      : "w-2.5 bg-indigo-200 hover:bg-indigo-300"
                  }`}
                />
              ))}
            </div>

            <Button
              variant="outline"
              size="icon"
              onClick={next}
              className="rounded-full h-10 w-10 border-indigo-200 hover:bg-indigo-50"
            >
              <ChevronRightIcon className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
