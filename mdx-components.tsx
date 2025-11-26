"use client";

import type { MDXComponents } from 'mdx/types';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { oneDark } from 'react-syntax-highlighter/dist/esm/styles/prism';
import CodeTabs from './app/components/CodeTabs';
import React, { useState } from 'react';
import {
  Box,
  Heading,
  Text,
  Link,
  Code,
  IconButton,
  Flex,
} from '@chakra-ui/react';
import { Copy, Check } from 'lucide-react';

function slugify(text: string): string {
  return text
    .toLowerCase()
    .replace(/[^\w\s-]/g, '')
    .replace(/\s+/g, '-')
    .replace(/-+/g, '-')
    .trim();
}

function getTextFromChildren(children: React.ReactNode): string {
  if (typeof children === 'string') return children;
  if (typeof children === 'number') return String(children);
  if (Array.isArray(children)) return children.map(getTextFromChildren).join('');
  if (children && typeof children === 'object' && 'props' in children) {
    const node = children as { props?: { children?: React.ReactNode } };
    if (node.props?.children) return getTextFromChildren(node.props.children);
  }
  return '';
}

function CodeBlock({ code, language }: { code: string; language: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box position="relative" my={4}>
      <Flex
        position="absolute"
        top={2}
        right={2}
        zIndex={10}
      >
        <IconButton
          aria-label="Copy code"
          size="sm"
          variant="ghost"
          onClick={handleCopy}
          color="gray.400"
          _hover={{ color: "gray.200", bg: "rgba(255, 255, 255, 0.1)" }}
        >
          {copied ? <Check size={16} /> : <Copy size={16} />}
        </IconButton>
      </Flex>
      <SyntaxHighlighter
        style={oneDark as Record<string, React.CSSProperties>}
        language={language}
        PreTag="div"
        customStyle={{
          borderRadius: '0.5rem',
          margin: 0,
          padding: '1.5rem',
          background: '#0a0a0a',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        }}
        codeTagProps={{
          style: {
            background: 'transparent',
            color: '#ffffff',
          }
        }}
      >
        {code}
      </SyntaxHighlighter>
    </Box>
  );
}

export function useMDXComponents(components: MDXComponents = {}): MDXComponents {

  return {
    h1: ({ children, ...props }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <Heading
          as="h1"
          id={id}
          fontSize="4xl"
          fontWeight="semibold"
          mb={6}
          mt={0}
          color="gray.900"
          _dark={{ color: "gray.50" }}
          {...props}
        >
          {children}
        </Heading>
      );
    },
    h2: ({ children, ...props }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <Heading
          as="h2"
          id={id}
          fontSize="2xl"
          fontWeight="semibold"
          mt={10}
          mb={4}
          pb={2}
          borderBottom="1px"
          borderColor="gray.200"
          color="gray.900"
          _dark={{ borderColor: "gray.800", color: "gray.50" }}
          {...props}
        >
          {children}
        </Heading>
      );
    },
    h3: ({ children, ...props }) => {
      const text = getTextFromChildren(children);
      const id = slugify(text);
      return (
        <Heading
          as="h3"
          id={id}
          fontSize="xl"
          fontWeight="semibold"
          mt={6}
          mb={3}
          color="gray.900"
          _dark={{ color: "gray.50" }}
          {...props}
        >
          {children}
        </Heading>
      );
    },
    p: ({ children, ...props }) => (
      <Text color="gray.600" _dark={{ color: "gray.400" }} lineHeight="relaxed" mb={4} {...props}>
        {children}
      </Text>
    ),
    a: ({ children, ...props }) => (
      <Link
        color="blue.600"
        _dark={{ color: "blue.500" }}
        textDecoration="none"
        fontWeight="medium"
        _hover={{ textDecoration: 'underline' }}
        {...props}
      >
        {children}
      </Link>
    ),
    code: ({ children, className, ...props }) => {
      const match = /language-(\w+)/.exec(className || '');
      const language = match ? match[1] : '';
      const codeString = String(children).replace(/\n$/, '');
      // Check if it's a code block: has language class OR contains newlines (multi-line)
      const isCodeBlock = !!match || codeString.includes('\n');

      return isCodeBlock ? (
        <CodeBlock code={codeString} language={language || 'text'} />
      ) : (
        <Code
          bg="transparent"
          color="gray.900"
          _dark={{ color: "gray.100" }}
          px={1.5}
          py={0.5}
          borderRadius="md"
          fontSize="sm"
          fontFamily="mono"
          {...props}
        >
          {children}
        </Code>
      );
    },
    pre: ({ children, ...props }) => {
      // Check if this pre contains a code element with language class (code block)
      const childrenArray = React.Children.toArray(children);
      const hasCodeBlock = childrenArray.some(
        (child) => {
          if (React.isValidElement(child)) {
            const props = child.props as { className?: string };
            return props?.className?.includes('language-');
          }
          return false;
        }
      );
      
      // If it's a code block, make pre transparent (SyntaxHighlighter handles styling)
      if (hasCodeBlock) {
        return (
          <Box
            as="pre"
            bg="transparent"
            my={4}
            p={0}
            overflow="visible"
            {...props}
          >
            {children}
          </Box>
        );
      }
      
      // For regular pre blocks (without code blocks), add styling
      return (
      <Box
        as="pre"
        bg="gray.900"
        _dark={{ bg: 'gray.950' }}
        border="1px"
        borderColor="gray.800"
        borderRadius="lg"
        shadow="sm"
        overflow="auto"
          my={4}
          p={4}
        {...props}
      >
        {children}
      </Box>
      );
    },
    ul: ({ children, ...props }) => (
      <Box as="ul" pl={6} my={4} listStyleType="disc" gap={0} {...props}>
        {children}
      </Box>
    ),
    ol: ({ children, ...props }) => (
      <Box as="ol" pl={6} my={4} listStyleType="decimal" gap={0} {...props}>
        {children}
      </Box>
    ),
    li: ({ children, ...props }) => (
      <Box as="li" color="gray.600" _dark={{ color: "gray.400" }} mb={2} {...props}>
        {children}
      </Box>
    ),
    blockquote: ({ children, ...props }) => (
      <Box
        as="blockquote"
        borderLeft="4px"
        borderColor="gray.300"
        pl={4}
        py={2}
        my={4}
        fontStyle="italic"
        color="gray.600"
        bg="gray.50"
        _dark={{ borderColor: "gray.700", color: "gray.400", bg: "gray.900" }}
        {...props}
      >
        {children}
      </Box>
    ),
    strong: ({ children, ...props }) => (
      <Text as="strong" color="gray.900" _dark={{ color: "gray.50" }} fontWeight="semibold" {...props}>
        {children}
      </Text>
    ),
    CodeTabs,
    ...components,
  };
}
