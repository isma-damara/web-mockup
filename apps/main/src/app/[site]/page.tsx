import { redirect } from "next/navigation";

type PageProps = {
  params: Promise<{ site: string }>;
};

export default async function LegacySiteRedirect({ params }: PageProps) {
  const { site } = await params;
  redirect(`/site/${site}`);
}
