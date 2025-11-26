import { readFile } from "fs/promises";
import { join } from "path";
import { compile } from '@mdx-js/mdx';
import remarkGfm from 'remark-gfm';
import { remarkCodeTabs } from './codetabs-plugin';

export async function loadMarkdown(slug: string, locale: string): Promise<string> {
  // Try locale-specific file first
  let filePath = join(process.cwd(), "content", "docs", locale, `${slug}.md`);
  
  let content: string;
  try {
    content = await readFile(filePath, "utf-8");
  } catch {
    // Fallback to English
    filePath = join(process.cwd(), "content", "docs", "en", `${slug}.md`);
    try {
      content = await readFile(filePath, "utf-8");
    } catch {
      // Final fallback to root docs folder
      filePath = join(process.cwd(), "content", "docs", `${slug}.md`);
      content = await readFile(filePath, "utf-8");
    }
  }

  return content;
}

export async function compileMarkdown(content: string): Promise<string> {
  const compiled = await compile(content, {
    remarkPlugins: [remarkGfm, remarkCodeTabs],
    outputFormat: 'function-body',
    jsxImportSource: 'react',
  });
  // Return the compiled code as string
  return String(compiled.value);
}


