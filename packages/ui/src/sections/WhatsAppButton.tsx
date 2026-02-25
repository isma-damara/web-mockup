"use client";

import { useState, useEffect } from "react";
import { ChatBubbleLeftRightIcon } from "@heroicons/react/24/outline";

export default function WhatsAppButton() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setVisible(true), 2000);
    return () => clearTimeout(timer);
  }, []);

  if (!visible) return null;

  return (
    <a
      href="https://wa.me/6282112345678?text=Halo%20NexaTech%2C%20saya%20tertarik%20untuk%20konsultasi."
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-40 flex items-center gap-2 rounded-full bg-[#25D366] px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-green-500/30 transition-all hover:shadow-xl hover:shadow-green-500/40 hover:-translate-y-0.5 animate-fade-up"
      aria-label="Chat via WhatsApp"
    >
      <ChatBubbleLeftRightIcon className="h-5 w-5" />
      <span className="hidden sm:inline">Chat WhatsApp</span>
    </a>
  );
}
