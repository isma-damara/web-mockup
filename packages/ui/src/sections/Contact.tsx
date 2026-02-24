"use client";

import { useEffect, useRef, useState, FormEvent } from "react";
import { Badge } from "@workspace/ui/ui/badge";
import { Button } from "@workspace/ui/ui/button";
import { Input } from "@workspace/ui/ui/input";
import { Textarea } from "@workspace/ui/ui/textarea";
import { Card, CardContent } from "@workspace/ui/ui/card";
import {
  MapPin,
  Phone,
  Mail,
  Clock,
  Send,
  CheckCircle,
} from "lucide-react";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [submitted, setSubmitted] = useState(false);

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

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => setSubmitted(false), 3000);
  };

  const contactInfo = [
    {
      icon: MapPin,
      title: "Alamat",
      detail: "Jl. Sudirman No. 123, Jakarta Selatan 12190",
    },
    {
      icon: Phone,
      title: "Telepon",
      detail: "+62 21 1234 5678",
    },
    {
      icon: Mail,
      title: "Email",
      detail: "hello@nexatech.id",
    },
    {
      icon: Clock,
      title: "Jam Kerja",
      detail: "Senin - Jumat, 09:00 - 18:00 WIB",
    },
  ];

  return (
    <section
      id="kontak"
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
            Kontak
          </Badge>
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl lg:text-5xl">
            Mari{" "}
            <span className="bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Diskusikan Proyek Anda
            </span>
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Punya ide atau kebutuhan teknologi? Hubungi kami dan mari wujudkan
            bersama.
          </p>
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-5">
          {/* Contact Info */}
          <div
            className={`lg:col-span-2 space-y-4 ${
              isVisible ? "animate-slide-in-left" : "opacity-0"
            }`}
          >
            {contactInfo.map((info) => (
              <Card
                key={info.title}
                className="border-border bg-card transition-all hover:shadow-md hover:shadow-indigo-50"
              >
                <CardContent className="flex items-start gap-4 p-5">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
                    <info.icon className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-semibold text-sm">{info.title}</div>
                    <div className="text-sm text-muted-foreground">
                      {info.detail}
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}

            {/* Map placeholder */}
            <Card className="border-border bg-card overflow-hidden">
              <div className="h-48 bg-gradient-to-br from-indigo-100 to-purple-100 flex items-center justify-center">
                <div className="text-center">
                  <MapPin className="h-8 w-8 text-indigo-400 mx-auto mb-2" />
                  <p className="text-sm text-indigo-600 font-medium">
                    Jakarta Selatan, Indonesia
                  </p>
                </div>
              </div>
            </Card>
          </div>

          {/* Contact Form */}
          <Card
            className={`lg:col-span-3 border-border bg-card shadow-lg ${
              isVisible ? "animate-slide-in-right" : "opacity-0"
            }`}
          >
            <CardContent className="p-6 sm:p-8">
              {submitted ? (
                <div className="flex flex-col items-center justify-center py-16 text-center">
                  <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100">
                    <CheckCircle className="h-8 w-8 text-emerald-600" />
                  </div>
                  <h3 className="text-xl font-semibold">Pesan Terkirim!</h3>
                  <p className="mt-2 text-muted-foreground">
                    Terima kasih! Kami akan segera menghubungi Anda.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-5">
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Nama Lengkap
                      </label>
                      <Input
                        placeholder="John Doe"
                        required
                        className="rounded-lg border-border focus-visible:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Email
                      </label>
                      <Input
                        type="email"
                        placeholder="john@contoh.com"
                        required
                        className="rounded-lg border-border focus-visible:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        Perusahaan
                      </label>
                      <Input
                        placeholder="Nama perusahaan"
                        className="rounded-lg border-border focus-visible:ring-indigo-500"
                      />
                    </div>
                    <div>
                      <label className="mb-2 block text-sm font-medium">
                        No. Telepon
                      </label>
                      <Input
                        type="tel"
                        placeholder="+62 812 3456 7890"
                        className="rounded-lg border-border focus-visible:ring-indigo-500"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Layanan yang Dibutuhkan
                    </label>
                    <select className="flex h-10 w-full rounded-lg border border-border bg-background px-3 py-2 text-sm text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500">
                      <option value="">Pilih layanan...</option>
                      <option value="web">Web Development</option>
                      <option value="mobile">Mobile App</option>
                      <option value="cloud">Cloud Solutions</option>
                      <option value="ai">AI & Machine Learning</option>
                      <option value="security">Cybersecurity</option>
                      <option value="data">Data Analytics</option>
                      <option value="other">Lainnya</option>
                    </select>
                  </div>
                  <div>
                    <label className="mb-2 block text-sm font-medium">
                      Pesan
                    </label>
                    <Textarea
                      placeholder="Ceritakan tentang proyek Anda..."
                      rows={4}
                      required
                      className="rounded-lg border-border focus-visible:ring-indigo-500 resize-none"
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    className="w-full rounded-lg bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-200"
                  >
                    <Send className="mr-2 h-4 w-4" />
                    Kirim Pesan
                  </Button>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
