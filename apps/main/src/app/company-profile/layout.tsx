import type { Metadata } from "next";
import "../../../../company-profile/src/app/globals.css";
import MockSiteShell from "@/components/mock-site-shell";

export const metadata: Metadata = {
  title: "Company Profile | Workspace Mockup",
  description: "NexaTech Business Solutions",
};

export default function CompanyProfileLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MockSiteShell slug="company-profile">{children}</MockSiteShell>;
}
