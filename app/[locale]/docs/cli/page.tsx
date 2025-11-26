import DocsContent from "../DocsContent";
import { loadMarkdown, compileMarkdown } from "../../../lib/markdown";

export default async function CLIPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await loadMarkdown("cli", locale);
  const compiledSource = await compileMarkdown(content);
  return <DocsContent compiledSource={compiledSource} />;
}
