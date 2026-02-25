"use client";

import { useEffect, useRef, useState } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import { Card, CardContent } from "@workspace/ui/ui/card";
import { EnvelopeIcon } from "@heroicons/react/24/outline";
import type { SimpleIcon } from "simple-icons";
import { siInstagram } from "simple-icons";

type SocialItem = {
  label: string;
  href: string;
  icon?: SimpleIcon;
  kind?: "email" | "linkedin";
};

const socialItems: SocialItem[] = [
  { label: "Email", href: "mailto:hello@nexatech.id", kind: "email" },
  { label: "Instagram", href: "#", icon: siInstagram },
  { label: "LinkedIn", href: "#", kind: "linkedin" },
];

function SocialBrandIcon({ item }: { item: SocialItem }) {
  if (item.kind === "email") {
    return <EnvelopeIcon className="h-[18px] w-[18px]" />;
  }

  if (item.icon) {
    return (
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-[18px] w-[18px]"
      >
        <path fill="currentColor" d={item.icon.path} />
      </svg>
    );
  }

  return (
    <span
      aria-hidden="true"
      className="inline-flex h-[18px] w-[18px] items-center justify-center text-[12px] font-semibold leading-none text-current"
    >
      in
    </span>
  );
}

const team = [
  {
    name: "Arya Wijaya",
    role: "CEO & Founder",
    bio: "Berpengalaman 15 tahun di industri teknologi. Ex-Google, Ex-Tokopedia.",
    avatar: "AW",
    gradient: "from-indigo-500 to-blue-600",
    photo: "/assets/company-profile/team/team-01.jpg",
  },
  {
    name: "Sarah Putri",
    role: "CTO",
    bio: "Full-stack architect dengan keahlian di cloud infrastructure dan system design.",
    avatar: "SP",
    gradient: "from-purple-500 to-pink-600",
    photo: "/assets/company-profile/team/team-02.jpg",
  },
  {
    name: "Budi Santoso",
    role: "Head of AI",
    bio: "Ph.D in Machine Learning dari ITB. Spesialis NLP dan computer vision.",
    avatar: "BS",
    gradient: "from-emerald-500 to-teal-600",
    photo: "/assets/company-profile/team/team-03.jpg",
  },
  {
    name: "Diana Kusuma",
    role: "Head of Design",
    bio: "UI/UX designer dengan passion menciptakan pengalaman digital yang indah.",
    avatar: "DK",
    gradient: "from-orange-500 to-red-500",
    photo: "/assets/company-profile/team/team-04.jpg",
  },
  {
    name: "Reza Ahmad",
    role: "Lead Engineer",
    bio: "Backend specialist dengan expertise di microservices, Kubernetes, dan DevOps.",
    avatar: "RA",
    gradient: "from-blue-500 to-cyan-500",
    photo: "/assets/company-profile/team/team-05.jpg",
  },
  {
    name: "Maya Anggraini",
    role: "Product Manager",
    bio: "Berpengalaman mengelola produk digital berskala besar dengan 1M+ pengguna.",
    avatar: "MA",
    gradient: "from-pink-500 to-purple-500",
    photo: "/assets/company-profile/team/team-06.jpg",
  },
];

export default function Team() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

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

  return (
    <section
      id="tim"
      className="py-24 sm:py-32 bg-slate-50/50"
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
            Tim Kami
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Digerakkan Oleh{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Talenta Terbaik
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Para profesional berpengalaman yang berdedikasi untuk menghadirkan
            solusi teknologi terbaik.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {team.map((member, idx) => (
            <Card
              key={member.name}
              className={`group overflow-hidden border-border bg-card text-center transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              <CardContent className="pt-8 pb-6">
                {/* Avatar */}
                <div
                  className={`mx-auto mb-4 h-24 w-24 overflow-hidden rounded-full bg-gradient-to-br p-1 ${member.gradient} shadow-lg transition-transform group-hover:scale-105`}
                >
                  <img
                    src={member.photo}
                    alt={`Foto ${member.name}`}
                    loading="lazy"
                    className="h-full w-full rounded-full object-cover bg-white"
                  />
                </div>
                <h3 className="text-lg font-semibold">{member.name}</h3>
                <Badge
                  variant="secondary"
                  className="mt-1 rounded-full text-xs bg-indigo-50 text-indigo-600 border-indigo-200"
                >
                  {member.role}
                </Badge>
                <p className="mt-3 text-sm text-muted-foreground leading-relaxed px-2">
                  {member.bio}
                </p>
                {/* Social Links */}
                <div className="mt-4 flex items-center justify-center gap-2">
                  {socialItems.map((item) => (
                    <a
                      key={item.label}
                      href={item.href}
                      aria-label={`${item.label} ${member.name}`}
                      className="inline-flex h-6 w-6 items-center justify-center text-black transition-opacity hover:opacity-70"
                    >
                      <SocialBrandIcon item={item} />
                    </a>
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
