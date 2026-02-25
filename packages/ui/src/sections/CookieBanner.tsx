"use client";

import { useState, useEffect } from "react";
import {
  ShieldCheckIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const dismissed = localStorage.getItem("cookie-consent");
    if (!dismissed) {
      const timer = setTimeout(() => setVisible(true), 1500);
      return () => clearTimeout(timer);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("cookie-consent", "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 animate-fade-up">
      <div className="mx-auto max-w-4xl rounded-2xl border border-border bg-white/95 backdrop-blur-lg shadow-xl shadow-slate-200/50 p-5 flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <div className="flex items-start gap-3 flex-1">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-indigo-50 text-indigo-600">
            <ShieldCheckIcon className="h-5 w-5" />
          </div>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Kami menggunakan cookies untuk meningkatkan pengalaman Anda di
            website kami. Dengan melanjutkan, Anda menyetujui penggunaan cookies
            sesuai{" "}
            <span className="text-indigo-600 font-medium cursor-pointer hover:underline">
              Kebijakan Privasi
            </span>{" "}
            kami.
          </p>
        </div>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={accept}
            className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-5 py-2 text-sm font-semibold text-white hover:from-indigo-700 hover:to-purple-700 transition-all shadow-md shadow-indigo-200"
          >
            Terima Semua
          </button>
          <button
            onClick={accept}
            className="rounded-full p-2 text-muted-foreground hover:bg-muted transition-colors"
            aria-label="Tutup"
          >
            <XMarkIcon className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
