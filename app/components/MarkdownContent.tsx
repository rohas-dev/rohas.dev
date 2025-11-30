"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMemo } from "react";
import { Box } from "@chakra-ui/react";
import { css } from "@emotion/react";

interface MarkdownContentProps {
  content: string;
  onHeadingsChange?: (
    headings: Array<{ id: string; text: string; level: number }>
  ) => void;
}

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .trim();
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === "string") return children;
  if (typeof children === "number") return String(children);
  if (Array.isArray(children))
    return children.map(getTextFromChildren).join("");
  if (children && typeof children === "object" && "props" in children) {
    const node = children as { props?: { children?: React.ReactNode } };
    if (node.props?.children) return getTextFromChildren(node.props.children);
  }
  return "";
}

export default function MarkdownContent({
  content,
  onHeadingsChange,
}: MarkdownContentProps) {
  const headings = useMemo(() => {
    const headingRegex = /^(#{1,3})\s+(.+)$/gm;
    const matches = Array.from(content.matchAll(headingRegex));
    return matches.map((match) => {
      const level = match[1].length;
      const text = match[2];
      const id = slugify(text);
      return { id, text, level };
    });
  }, [content]);

  // Notify parent component of headings
  useMemo(() => {
    if (onHeadingsChange) {
      onHeadingsChange(headings);
    }
  }, [headings, onHeadingsChange]);

  const markdownStyles = css`
    & h1 {
      font-size: 2.25rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--chakra-colors-gray-900);
      margin-bottom: 1.5rem;
      margin-top: 0;
    }
    [data-theme="dark"] & h1 {
      color: var(--chakra-colors-gray-50);
    }
    & h2 {
      font-size: 1.5rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--chakra-colors-gray-900);
      margin-top: 3rem;
      margin-bottom: 1rem;
      border-bottom: 1px solid var(--chakra-colors-gray-200);
      padding-bottom: 0.5rem;
    }
    [data-theme="dark"] & h2 {
      color: var(--chakra-colors-gray-50);
      border-bottom-color: var(--chakra-colors-gray-800);
    }
    & h3 {
      font-size: 1.25rem;
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--chakra-colors-gray-900);
      margin-top: 2rem;
      margin-bottom: 0.75rem;
    }
    [data-theme="dark"] & h3 {
      color: var(--chakra-colors-gray-50);
    }
    & h4, & h5, & h6 {
      font-weight: 600;
      letter-spacing: -0.025em;
      color: var(--chakra-colors-gray-900);
    }
    [data-theme="dark"] & h4,
    [data-theme="dark"] & h5,
    [data-theme="dark"] & h6 {
      color: var(--chakra-colors-gray-50);
    }
    & p {
      color: var(--chakra-colors-gray-600);
      line-height: 1.75rem;
      margin-bottom: 1rem;
    }
    [data-theme="dark"] & p {
      color: var(--chakra-colors-gray-400);
    }
    & a {
      color: var(--chakra-colors-blue-600);
      text-decoration: none;
      font-weight: 500;
    }
    [data-theme="dark"] & a {
      color: var(--chakra-colors-blue-500);
    }
    & a:hover {
      text-decoration: underline;
    }
    & code {
      font-size: 0.875rem;
      font-family: var(--chakra-fonts-mono);
      background-color: var(--chakra-colors-gray-100);
      color: var(--chakra-colors-gray-900);
      padding: 0.125rem 0.375rem;
      border-radius: 0.375rem;
    }
    [data-theme="dark"] & code {
      background-color: var(--chakra-colors-gray-800);
      color: var(--chakra-colors-gray-100);
    }
    & pre {
      background-color: var(--chakra-colors-gray-900);
      border: 1px solid var(--chakra-colors-gray-800);
      border-radius: 0.5rem;
      box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
      overflow: auto;
    }
    [data-theme="dark"] & pre {
      background-color: var(--chakra-colors-gray-950);
    }
    & pre code {
      background-color: transparent;
      color: inherit;
      padding: 0;
    }
    & ul, & ol {
      margin-top: 1rem;
      margin-bottom: 1rem;
      padding-left: 1.5rem;
    }
    & li {
      color: var(--chakra-colors-gray-600);
      margin-top: 0.5rem;
      margin-bottom: 0.5rem;
    }
    [data-theme="dark"] & li {
      color: var(--chakra-colors-gray-400);
    }
    & blockquote {
      border-left: 4px solid var(--chakra-colors-gray-300);
      padding-left: 1rem;
      font-style: italic;
      color: var(--chakra-colors-gray-600);
    }
    [data-theme="dark"] & blockquote {
      border-left-color: var(--chakra-colors-gray-700);
      color: var(--chakra-colors-gray-400);
    }
    & strong {
      color: var(--chakra-colors-gray-900);
      font-weight: 600;
    }
    [data-theme="dark"] & strong {
      color: var(--chakra-colors-gray-50);
    }
  `;

  return (
    <Box css={markdownStyles}>
      <ReactMarkdown
        remarkPlugins={[remarkGfm]}
        components={{
          h1({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h1" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          h2({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h2" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          h3({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h3" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          h4({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h4" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          h5({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h5" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          h6({ children, ...props }) {
            const text = getTextFromChildren(children);
            const id = slugify(text);
            return (
              <Box as="h6" id={id} fontWeight="semibold" {...props}>
                {children}
              </Box>
            );
          },
          code(props) {
            const { children, className, ...rest } = props;
            const match = /language-(\w+)/.exec(className || "");
            const language = match ? match[1] : "";
            const isInline = !match;

            return isInline ? (
              <Box as="code" className={className} {...rest}>
                {children}
              </Box>
            ) : (
              <SyntaxHighlighter
                style={
                  oneDark as {
                    [key: string]: React.CSSProperties;
                  }
                }
                language={language}
                PreTag="div"
                customStyle={{
                  borderRadius: "0.5rem",
                }}
              >
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            );
          },
        }}
      >
        {content}
      </ReactMarkdown>
    </Box>
  );
}
