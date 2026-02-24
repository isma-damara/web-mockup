"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { Button } from "@workspace/ui/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
  SheetTitle,
} from "@workspace/ui/ui/sheet";
import { Menu, ChevronDown } from "lucide-react";

interface SubItem {
  label: string;
  href: string;
}

interface NavItem {
  href: string;
  label: string;
  sectionId: string;
  sub?: SubItem[];
}

const navItems: NavItem[] = [
  {
    href: "#tentang",
    label: "About Us",
    sectionId: "tentang",
    sub: [
      { label: "Our Story", href: "#tentang" },
      { label: "Vision & Mission", href: "#tentang" },
      { label: "Team", href: "#tim" },
      { label: "Awards & Certifications", href: "#tentang" },
    ],
  },
  {
    href: "#layanan",
    label: "Services",
    sectionId: "layanan",
    sub: [
      { label: "Web Development", href: "#layanan" },
      { label: "Mobile App", href: "#layanan" },
      { label: "Cloud Solutions", href: "#layanan" },
      { label: "IT Consulting", href: "#layanan" },
      { label: "Cybersecurity", href: "#layanan" },
    ],
  },
  {
    href: "#portfolio",
    label: "Portfolio",
    sectionId: "portfolio",
    sub: [
      { label: "All Projects", href: "#portfolio" },
      { label: "Case Studies", href: "#portfolio" },
      { label: "Client Testimonials", href: "#testimoni" },
    ],
  },
  {
    href: "#kontak",
    label: "Contact Us",
    sectionId: "kontak",
  },
];

const sectionIds = [
  "beranda",
  "tentang",
  "layanan",
  "portfolio",
  "tim",
  "testimoni",
  "klien",
  "faq",
  "kontak",
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState("beranda");
  const [open, setOpen] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [mobileExpanded, setMobileExpanded] = useState<string | null>(null);
  const observerRef = useRef<IntersectionObserver | null>(null);
  const dropdownTimeout = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleIntersection = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) setActiveSection(entry.target.id);
      });
    },
    []
  );

  useEffect(() => {
    observerRef.current = new IntersectionObserver(handleIntersection, {
      rootMargin: "-40% 0px -60% 0px",
    });
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });
    return () => observerRef.current?.disconnect();
  }, [handleIntersection]);

  const handleDropdownEnter = (label: string) => {
    if (dropdownTimeout.current) clearTimeout(dropdownTimeout.current);
    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    dropdownTimeout.current = setTimeout(() => setOpenDropdown(null), 150);
  };

  const isActive = (item: NavItem) => {
    if (activeSection === item.sectionId) return true;
    return item.sub?.some((s) => s.href.replace("#", "") === activeSection) ?? false;
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/80 backdrop-blur-lg shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <nav className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Logo */}
        <Link href="#beranda" className="flex items-center gap-2">
          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-600 to-purple-600">
            <span className="text-lg font-bold text-white">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight text-foreground">
            Nexa<span className="text-indigo-600">Tech</span>
          </span>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden items-center gap-0.5 lg:flex">
          {navItems.map((item) => (
            <div
              key={item.label}
              className="relative"
              onMouseEnter={() => item.sub && handleDropdownEnter(item.label)}
              onMouseLeave={handleDropdownLeave}
            >
              <Link
                href={item.href}
                className={`flex items-center gap-1 rounded-full px-3 py-2 text-sm font-medium transition-colors ${
                  isActive(item)
                    ? "bg-indigo-50 text-indigo-700"
                    : "text-muted-foreground hover:text-foreground hover:bg-muted"
                }`}
              >
                {item.label}
                {item.sub && (
                  <ChevronDown
                    className={`h-3.5 w-3.5 transition-transform ${
                      openDropdown === item.label ? "rotate-180" : ""
                    }`}
                  />
                )}
              </Link>

              {/* Dropdown */}
              {item.sub && openDropdown === item.label && (
                <div className="absolute top-full left-0 pt-1 z-50">
                  <div className="min-w-[200px] rounded-xl border border-border bg-white/95 backdrop-blur-lg shadow-xl shadow-indigo-100/30 p-1.5 animate-fade-up">
                    {item.sub.map((sub) => (
                      <Link
                        key={sub.label}
                        href={sub.href}
                        className="block rounded-lg px-3.5 py-2 text-sm text-muted-foreground transition-colors hover:bg-indigo-50 hover:text-indigo-700"
                        onClick={() => setOpenDropdown(null)}
                      >
                        {sub.label}
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Desktop CTA */}
        <div className="hidden lg:block">
          <Button
            asChild
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white shadow-md shadow-indigo-200"
          >
            <Link href="#kontak">Get Free Consultation</Link>
          </Button>
        </div>

        {/* Mobile Menu */}
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild className="lg:hidden">
            <Button variant="ghost" size="icon">
              <Menu className="h-5 w-5" />
            </Button>
          </SheetTrigger>
          <SheetContent side="right" className="w-80 overflow-y-auto">
            <SheetTitle className="sr-only">Menu Navigasi</SheetTitle>
            <div className="flex flex-col gap-1 pt-8">
              {navItems.map((item) => (
                <div key={item.label}>
                  <div className="flex items-center">
                    <Link
                      href={item.href}
                      onClick={() => {
                        if (!item.sub) setOpen(false);
                      }}
                      className={`flex-1 rounded-lg px-4 py-3 text-sm font-medium transition-colors ${
                        isActive(item)
                          ? "bg-indigo-50 text-indigo-700"
                          : "text-muted-foreground hover:text-foreground hover:bg-muted"
                      }`}
                    >
                      {item.label}
                    </Link>
                    {item.sub && (
                      <button
                        onClick={() =>
                          setMobileExpanded(
                            mobileExpanded === item.label ? null : item.label
                          )
                        }
                        className="rounded-lg p-3 text-muted-foreground hover:bg-muted"
                      >
                        <ChevronDown
                          className={`h-4 w-4 transition-transform ${
                            mobileExpanded === item.label ? "rotate-180" : ""
                          }`}
                        />
                      </button>
                    )}
                  </div>
                  {item.sub && mobileExpanded === item.label && (
                    <div className="ml-4 mt-1 space-y-0.5 border-l-2 border-indigo-100 pl-3 pb-2">
                      {item.sub.map((sub) => (
                        <Link
                          key={sub.label}
                          href={sub.href}
                          onClick={() => setOpen(false)}
                          className="block rounded-lg px-3 py-2 text-sm text-muted-foreground hover:text-indigo-700 hover:bg-indigo-50"
                        >
                          {sub.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
              <Button
                asChild
                className="mt-4 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white"
              >
                <Link href="#kontak" onClick={() => setOpen(false)}>
                  Get Free Consultation
                </Link>
              </Button>
            </div>
          </SheetContent>
        </Sheet>
      </nav>
    </header>
  );
}
