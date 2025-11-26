import DocsContent from "../DocsContent";
import { loadMarkdown, compileMarkdown } from "../../../lib/markdown";

export default async function SchemasPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await loadMarkdown("schemas", locale);
  const compiledSource = await compileMarkdown(content);
  return <DocsContent compiledSource={compiledSource} />;
}
