import { templateEntries } from "@/config/template-gallery";
import TemplateViewer from "@/components/templates/TemplateViewer";

// Bare, non-interactive render of each template. Used only as the source for
// the live <iframe> thumbnails on the gallery index — never linked to directly.
export const dynamicParams = false;

export function generateStaticParams() {
  return templateEntries.map((t) => ({ slug: t.id }));
}

export const metadata = {
  robots: { index: false, follow: false },
};

export default async function TemplatePreviewPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  return <TemplateViewer slug={slug} preview />;
}
