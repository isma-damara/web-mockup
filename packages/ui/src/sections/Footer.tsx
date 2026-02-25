import Link from "next/link";
import { Separator } from "@workspace/ui/ui/separator";
import {
  BriefcaseIcon,
  HashtagIcon,
  CodeBracketIcon,
  CameraIcon,
  PlayCircleIcon,
  MapPinIcon,
  PhoneIcon,
  EnvelopeIcon,
} from "@heroicons/react/24/outline";

const footerLinks = {
  Perusahaan: [
    { label: "About Us", href: "#tentang" },
    { label: "Our Team", href: "#tim" },
    { label: "Portfolio", href: "#portfolio" },
    { label: "Awards", href: "#tentang" },
  ],
  Layanan: [
    { label: "Web Development", href: "#layanan" },
    { label: "Mobile App", href: "#layanan" },
    { label: "Cloud Solutions", href: "#layanan" },
    { label: "IT Consulting", href: "#layanan" },
    { label: "Cybersecurity", href: "#layanan" },
  ],
  Dukungan: [
    { label: "FAQ", href: "#faq" },
    { label: "Dokumentasi", href: "#" },
    { label: "Status", href: "#" },
    { label: "Contact Us", href: "#kontak" },
  ],
  Legal: [
    { label: "Kebijakan Privasi", href: "#" },
    { label: "Syarat & Ketentuan", href: "#" },
    { label: "Lisensi", href: "#" },
  ],
};

const socialLinks = [
  { icon: BriefcaseIcon, href: "#", label: "LinkedIn" },
  { icon: HashtagIcon, href: "#", label: "Twitter" },
  { icon: CodeBracketIcon, href: "#", label: "GitHub" },
  { icon: CameraIcon, href: "#", label: "Instagram" },
  { icon: PlayCircleIcon, href: "#", label: "YouTube" },
];

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        {/* Main footer content */}
        <div className="py-16 grid gap-12 sm:grid-cols-2 lg:grid-cols-6">
          {/* Brand */}
          <div className="lg:col-span-2">
            <Link href="#beranda" className="flex items-center gap-2 mb-4">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-purple-600">
                <span className="text-lg font-bold text-white">N</span>
              </div>
              <span className="text-xl font-bold text-white tracking-tight">
                Nexa<span className="text-indigo-400">Tech</span>
              </span>
            </Link>
            <p className="text-sm text-slate-400 leading-relaxed max-w-xs">
              Membangun solusi teknologi inovatif untuk mentransformasi bisnis
              Anda menuju masa depan digital.
            </p>

            {/* Contact Info */}
            <div className="mt-5 space-y-2.5">
              <div className="flex items-start gap-2 text-sm text-slate-400">
                <MapPinIcon className="h-4 w-4 mt-0.5 shrink-0 text-indigo-400" />
                <span>Jl. Sudirman No. 123, Jakarta Selatan 12190</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <EnvelopeIcon className="h-4 w-4 shrink-0 text-indigo-400" />
                <span>hello@nexatech.id</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-slate-400">
                <PhoneIcon className="h-4 w-4 shrink-0 text-indigo-400" />
                <span>+62 21 1234 5678</span>
              </div>
            </div>

            {/* Social links */}
            <div className="mt-6 flex gap-3">
              {socialLinks.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  aria-label={social.label}
                  className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-800 text-slate-400 transition-all hover:bg-indigo-600 hover:text-white"
                >
                  <social.icon className="h-4 w-4" />
                </a>
              ))}
            </div>

            <div className="mt-6 overflow-hidden rounded-xl border border-slate-800 bg-slate-950">
              <div className="px-3 py-2 text-xs font-medium uppercase tracking-wide text-slate-400">
                Peta Lokasi
              </div>
              <iframe
                title="Peta lokasi kantor NexaTech"
                src="https://www.google.com/maps?q=Jl.%20Sudirman%20No.%20123%2C%20Jakarta%20Selatan&output=embed"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-40 w-full border-0"
              />
            </div>
          </div>

          {/* Links */}
          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {title}
              </h3>
              <ul className="space-y-3">
                {links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-slate-400 transition-colors hover:text-indigo-400"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <Separator className="bg-slate-800" />

        {/* Bottom bar */}
        <div className="py-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-slate-500">
          <p>&copy; {new Date().getFullYear()} NexaTech. All rights reserved.</p>
          <p>
            Dibuat dengan ❤️ di Indonesia
          </p>
        </div>
      </div>
    </footer>
  );
}
