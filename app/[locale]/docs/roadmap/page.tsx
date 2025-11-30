import DocsContent from "../DocsContent";
import { loadMarkdown, compileMarkdown } from "../../../lib/markdown";
import { getRohasVersion } from "@/lib/version";

export default async function RoadmapPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  let content = await loadMarkdown("roadmap", locale);
  const version = await getRohasVersion();
  
  // Replace hardcoded version with dynamic version
  content = content.replace(/## Current Status \(v[\d.]+\)/g, `## Current Status (v${version})`);
  
  const compiledSource = await compileMarkdown(content);
  return <DocsContent compiledSource={compiledSource} />;
}

