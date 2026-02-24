import type { CSSProperties, ReactNode } from "react";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { cookies } from "next/headers";
import { getMockSiteBySlug, mockSites } from "@/lib/mock-sites";
import {
  ADMIN_COOKIE_NAME,
  CLIENT_COOKIE_NAME,
  resolveViewerSessionFromCookies,
} from "@/lib/access-control";

type MockSiteShellProps = {
  slug: string;
  children: ReactNode;
};

const siteFontVars = {
  "--font-geist-sans":
    "system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
  "--font-geist-mono":
    "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
} as CSSProperties;

export default async function MockSiteShell({ slug, children }: MockSiteShellProps) {
  const cookieStore = await cookies();
  const viewer = resolveViewerSessionFromCookies({
    adminKey: cookieStore.get(ADMIN_COOKIE_NAME)?.value,
    clientShareToken: cookieStore.get(CLIENT_COOKIE_NAME)?.value,
  });
  const site = getMockSiteBySlug(slug);

  return (
    <div className="font-sans antialiased" style={siteFontVars}>
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-3 px-4 pb-4">
          {viewer.role === "admin" ? (
            <>
              <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md">
                <Link
                  href="/"
                  className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/15"
                >
                  <ArrowLeft className="h-3.5 w-3.5" />
                  Portal
                </Link>
                <span className="text-white/40">/</span>
                <span className="whitespace-nowrap text-white/80">
                  {site?.title ?? slug}
                </span>
              </div>

              <div className="pointer-events-auto hidden items-center gap-1 rounded-full border border-white/10 bg-black/65 p-1 text-xs shadow-xl backdrop-blur-md md:flex">
                {mockSites.map((item) => (
                  <Link
                    key={item.slug}
                    href={`/${item.slug}`}
                    className={`inline-flex items-center gap-1 rounded-full px-3 py-1.5 transition-colors ${
                      item.slug === slug
                        ? "bg-white text-black"
                        : "text-white/80 hover:bg-white/10 hover:text-white"
                    }`}
                  >
                    <item.icon className="h-3.5 w-3.5" />
                    <span>{item.title}</span>
                    {item.slug === slug ? <ChevronRight className="h-3 w-3" /> : null}
                  </Link>
                ))}
              </div>
            </>
          ) : (
            <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md">
              <span className="inline-flex h-2 w-2 rounded-full bg-emerald-400" />
              Client Preview
              <span className="text-white/40">/</span>
              <span className="whitespace-nowrap text-white/80">
                {site?.title ?? slug}
              </span>
            </div>
          )}
        </div>
      </div>

      {children}
    </div>
  );
}
