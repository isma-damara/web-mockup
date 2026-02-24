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
import {
  Globe,
  Smartphone,
  Cloud,
  Brain,
  Shield,
  BarChart3,
} from "lucide-react";

const services = [
  {
    icon: Globe,
    title: "Web Development",
    description:
      "Website modern dan aplikasi web yang responsif, cepat, dan SEO-friendly menggunakan teknologi terkini seperti React, Next.js, dan Node.js.",
    features: ["Responsive Design", "SEO Optimized", "High Performance"],
    gradient: "from-blue-500 to-cyan-500",
  },
  {
    icon: Smartphone,
    title: "Mobile App",
    description:
      "Aplikasi mobile native dan cross-platform untuk iOS & Android dengan pengalaman pengguna yang intuitif dan performa optimal.",
    features: ["iOS & Android", "Cross-Platform", "UI/UX Design"],
    gradient: "from-indigo-500 to-blue-500",
  },
  {
    icon: Cloud,
    title: "Cloud Solutions",
    description:
      "Infrastruktur cloud yang scalable, aman, dan cost-effective. Migrasi, deployment, serta manajemen cloud dengan AWS, GCP, dan Azure.",
    features: ["AWS / GCP / Azure", "Auto Scaling", "Cost Optimization"],
    gradient: "from-purple-500 to-indigo-500",
  },
  {
    icon: Brain,
    title: "AI & Machine Learning",
    description:
      "Solusi kecerdasan buatan untuk otomasi bisnis, analisis prediktif, chatbot cerdas, dan computer vision sesuai kebutuhan Anda.",
    features: ["Predictive Analytics", "NLP & Chatbot", "Computer Vision"],
    gradient: "from-pink-500 to-purple-500",
  },
  {
    icon: Shield,
    title: "Cybersecurity",
    description:
      "Proteksi menyeluruh untuk infrastruktur digital Anda. Penetration testing, security audit, dan implementasi keamanan berlapis.",
    features: ["Penetration Testing", "Security Audit", "Compliance"],
    gradient: "from-orange-500 to-pink-500",
  },
  {
    icon: BarChart3,
    title: "Data Analytics",
    description:
      "Transformasi data mentah menjadi insight bisnis yang actionable. Dashboard interaktif, reporting otomatis, dan business intelligence.",
    features: ["BI Dashboard", "ETL Pipeline", "Real-time Analytics"],
    gradient: "from-emerald-500 to-teal-500",
  },
];

export default function Services() {
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
      id="layanan"
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
            Layanan Kami
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Solusi Lengkap untuk{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Kebutuhan Digital
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Dari ide hingga implementasi, kami menyediakan layanan teknologi
            end-to-end yang disesuaikan dengan kebutuhan bisnis Anda.
          </p>
        </div>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, idx) => (
            <Card
              key={service.title}
              className={`group relative overflow-hidden border-border bg-card transition-all duration-300 hover:shadow-xl hover:shadow-indigo-100 hover:-translate-y-1 ${
                isVisible ? "animate-fade-up" : "opacity-0"
              }`}
              style={{ animationDelay: `${idx * 100}ms` }}
            >
              {/* Top gradient line */}
              <div
                className={`absolute top-0 left-0 right-0 h-1 bg-gradient-to-r ${service.gradient} opacity-0 group-hover:opacity-100 transition-opacity`}
              />
              <CardHeader className="pb-4">
                <div
                  className={`mb-3 inline-flex rounded-xl bg-gradient-to-br ${service.gradient} p-3 text-white shadow-md w-fit`}
                >
                  <service.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-xl">{service.title}</CardTitle>
                <CardDescription className="leading-relaxed">
                  {service.description}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-wrap gap-2">
                  {service.features.map((feature) => (
                    <Badge
                      key={feature}
                      variant="secondary"
                      className="rounded-full text-xs bg-slate-100 text-slate-600"
                    >
                      {feature}
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
