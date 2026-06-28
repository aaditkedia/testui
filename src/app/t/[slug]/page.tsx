import { templateEntries } from "@/config/template-gallery";
import TemplateViewer from "@/components/templates/TemplateViewer";

export const dynamicParams = false;

export function generateStaticParams() {
  return templateEntries.map((t) => ({ slug: t.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const entry = templateEntries.find((t) => t.id === slug);
  return {
    title: entry?.name ?? slug,
    description: entry?.summary ?? "",
  };
}

export default async function TemplatePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TemplateViewer slug={slug} />;
}
