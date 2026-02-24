import type { Metadata } from "next";
import "../../../../government/src/app/globals.css";
import MockSiteShell from "@/components/mock-site-shell";

export const metadata: Metadata = {
  title: "Government | Workspace Mockup",
  description: "City Service Portal",
};

export default function GovernmentLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return <MockSiteShell slug="government">{children}</MockSiteShell>;
}
