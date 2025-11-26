"use client";

import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useMemo } from "react";
import { Box } from "@chakra-ui/react";

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

  return (
    <Box
      sx={{
        "& h1": {
          fontSize: "4xl",
          fontWeight: "semibold",
          letterSpacing: "tight",
          color: "gray.900",
          _dark: { color: "gray.50" },
          mb: 6,
          mt: 0,
        },
        "& h2": {
          fontSize: "2xl",
          fontWeight: "semibold",
          letterSpacing: "tight",
          color: "gray.900",
          _dark: { color: "gray.50" },
          mt: 12,
          mb: 4,
          borderBottom: "1px",
          borderColor: "gray.200",
          _dark: { borderColor: "gray.800" },
          pb: 2,
        },
        "& h3": {
          fontSize: "xl",
          fontWeight: "semibold",
          letterSpacing: "tight",
          color: "gray.900",
          _dark: { color: "gray.50" },
          mt: 8,
          mb: 3,
        },
        "& h4, & h5, & h6": {
          fontWeight: "semibold",
          letterSpacing: "tight",
          color: "gray.900",
          _dark: { color: "gray.50" },
        },
        "& p": {
          color: "gray.600",
          _dark: { color: "gray.400" },
          lineHeight: 7,
          mb: 4,
        },
        "& a": {
          color: "blue.600",
          _dark: { color: "blue.500" },
          textDecoration: "none",
          fontWeight: "medium",
          _hover: {
            textDecoration: "underline",
          },
        },
        "& code": {
          fontSize: "sm",
          fontFamily: "mono",
          bg: "gray.100",
          _dark: { bg: "gray.800" },
          color: "gray.900",
          _dark: { color: "gray.100" },
          px: 1.5,
          py: 0.5,
          borderRadius: "md",
        },
        "& pre": {
          bg: "gray.900",
          _dark: { bg: "gray.950" },
          border: "1px",
          borderColor: "gray.800",
          borderRadius: "lg",
          shadow: "sm",
          overflow: "auto",
          "& code": {
            bg: "transparent",
            color: "inherit",
            px: 0,
            py: 0,
          },
        },
        "& ul, & ol": {
          my: 4,
          pl: 6,
        },
        "& li": {
          color: "gray.600",
          _dark: { color: "gray.400" },
          my: 2,
        },
        "& blockquote": {
          borderLeft: "4px",
          borderColor: "gray.300",
          _dark: { borderColor: "gray.700" },
          pl: 4,
          fontStyle: "italic",
          color: "gray.600",
          _dark: { color: "gray.400" },
        },
        "& strong": {
          color: "gray.900",
          _dark: { color: "gray.50" },
          fontWeight: "semibold",
        },
      }}
    >
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
