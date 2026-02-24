import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { notFound } from "next/navigation";
import { getMockSiteBySlug, mockSites } from "@/lib/mock-sites";
import { renderMockSitePage } from "@/lib/mock-site-pages";

type PageProps = {
  params: Promise<{ site: string }>;
};

export async function generateStaticParams() {
  return mockSites.map((site) => ({ site: site.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { site: slug } = await params;
  const site = getMockSiteBySlug(slug);

  if (!site) {
    return { title: "Mock Site Not Found" };
  }

  return {
    title: `${site.title} | Workspace Mockup`,
    description: site.description,
  };
}

export default async function MockSiteRoute({ params }: PageProps) {
  const { site: slug } = await params;
  const site = getMockSiteBySlug(slug);

  if (!site) notFound();

  const content = renderMockSitePage(slug);
  if (!content) notFound();

  return (
    <>
      <div className="fixed inset-x-0 bottom-0 z-50 pointer-events-none">
        <div className="mx-auto flex max-w-7xl items-end justify-between gap-3 px-4 pb-4">
          <div className="pointer-events-auto inline-flex items-center gap-2 rounded-full border border-white/10 bg-black/65 px-3 py-2 text-xs font-medium text-white shadow-xl backdrop-blur-md">
            <Link
              href="/"
              className="inline-flex items-center gap-1 rounded-full bg-white/10 px-3 py-1.5 hover:bg-white/15"
            >
              <ArrowLeft className="h-3.5 w-3.5" />
              Portal
            </Link>
            <span className="text-white/40">/</span>
            <span className="whitespace-nowrap text-white/80">{site.title}</span>
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
        </div>
      </div>

      {content}
    </>
  );
}
