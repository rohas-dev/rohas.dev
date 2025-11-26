import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';
import createMDX from '@next/mdx';

const withNextIntl = createNextIntlPlugin('./i18n.ts');

const nextConfig: NextConfig = {
  // Configure `pageExtensions` to include markdown and MDX files
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
  experimental: {
    optimizePackageImports: ['@chakra-ui/react'],
  },
};

const withMDX = createMDX({
  // Add markdown plugins here, as desired
  // Using string names for Turbopack compatibility
  options: {
    remarkPlugins: ['remark-gfm'],
    rehypePlugins: [],
  },
  extension: /\.(md|mdx)$/,
});

// Merge MDX config with Next.js config
export default withNextIntl(withMDX(nextConfig));
