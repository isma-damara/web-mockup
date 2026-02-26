"use client";

import Link from "next/link";
import { cn } from "@workspace/lib/utils";
import { useSiteBase, withSiteBase } from "./useSiteBase";

type Crumb = { label: string; href?: string };

export function ContentWrap({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <div className={cn("mx-auto w-full max-w-[1280px] px-5 sm:px-8", className)}>{children}</div>;
}

export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const siteBase = useSiteBase();
  return (
    <div className="bg-[var(--gov-white)] border-b border-[var(--gov-border)] py-2.5">
      <ContentWrap>
        <div className="flex flex-wrap items-center gap-1.5 text-[12.5px] text-[var(--gov-slate)]">
          {items.map((item, index) => (
            <span key={`${item.label}-${index}`} className="flex items-center gap-1.5">
              {item.href ? (
                <Link
                  href={withSiteBase(item.href, siteBase)}
                  className="text-[var(--gov-blue)] hover:underline"
                >
                  {item.label}
                </Link>
              ) : (
                <span>{item.label}</span>
              )}
              {index < items.length - 1 && (
                <span className="text-[var(--gov-slate-light)]">/</span>
              )}
            </span>
          ))}
        </div>
      </ContentWrap>
    </div>
  );
}

export function PageHero({
  badge,
  title,
  description,
  className,
  badgeClassName,
}: {
  badge: string;
  title: string;
  description: string;
  className?: string;
  badgeClassName?: string;
}) {
  return (
    <section
      className={cn(
        "relative overflow-hidden bg-gradient-to-br from-[var(--gov-navy)] via-[var(--gov-navy-mid)] to-[var(--gov-blue)] py-16 sm:py-20",
        className,
      )}
    >
      <div className="pointer-events-none absolute -top-16 right-[-80px] h-[320px] w-[320px] rounded-full border border-white/10 bg-white/5" />
      <div className="pointer-events-none absolute bottom-[-80px] right-[60px] h-[220px] w-[220px] rounded-full bg-[rgba(201,151,43,0.08)]" />
      <ContentWrap className="relative">
        <div
          className={cn(
            "mb-4 inline-flex items-center gap-1.5 rounded-full border border-[rgba(201,151,43,0.35)] bg-[rgba(201,151,43,0.18)] px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--gov-gold-light)]",
            badgeClassName,
          )}
        >
          {badge}
        </div>
        <h1 className="font-display text-4xl font-bold leading-tight text-white md:text-5xl">{title}</h1>
        <p className="mt-3 max-w-2xl text-[15px] leading-7 text-white/75">{description}</p>
      </ContentWrap>
    </section>
  );
}

export function SectionHeader({
  label,
  title,
  description,
  align = "left",
}: {
  label: string;
  title: string;
  description?: string;
  align?: "left" | "center";
}) {
  return (
    <div className={cn("mb-7 sm:mb-8", align === "center" && "text-center")}>
      <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[var(--gov-gold)]">
        {label}
      </div>
      <div className="font-display text-2xl font-bold text-[var(--gov-navy)] md:text-[28px]">
        {title}
      </div>
      {description && (
        <p className="mt-2 max-w-2xl text-[14.5px] leading-6 text-[var(--gov-text-muted)]">
          {description}
        </p>
      )}
    </div>
  );
}

export function SidebarMenu({
  title,
  items,
}: {
  title: string;
  items: { label: string; href: string; active?: boolean }[];
}) {
  const siteBase = useSiteBase();
  return (
    <div className="h-fit overflow-hidden rounded-2xl border border-[var(--gov-border)] bg-white shadow-sm">
      <div className="border-b border-[var(--gov-border)] bg-[var(--gov-cream)] px-4 py-3 text-[11px] font-bold uppercase tracking-[0.08em] text-[var(--gov-slate)]">
        {title}
      </div>
      <div className="flex flex-col">
        {items.map((item) => (
          <Link
            key={item.label}
            href={withSiteBase(item.href, siteBase)}
            className={cn(
              "flex items-center gap-2 border-b border-[var(--gov-border)] px-4 py-3 text-[13.5px] text-[var(--gov-text)] transition-all hover:bg-[rgba(26,86,219,0.05)] hover:text-[var(--gov-blue)]",
              item.active &&
                "border-l-4 border-[var(--gov-blue)] bg-[rgba(26,86,219,0.05)] text-[var(--gov-blue)]",
            )}
          >
            {item.label}
          </Link>
        ))}
      </div>
    </div>
  );
}
