"use client";

import { useState } from "react";
import React from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Box, Button, HStack, IconButton, Flex } from "@chakra-ui/react";
import { Copy, Check } from "lucide-react";

interface CodeTabsProps {
  python?: string;
  typescript?: string;
  // Generic support for any language pair
  lang1?: string;
  lang2?: string;
  code1?: string;
  code2?: string;
  label1?: string;
  label2?: string;
}

// Language name mapping for display
const languageNames: Record<string, string> = {
  python: "Python",
  typescript: "TypeScript",
  ts: "TypeScript",
  javascript: "JavaScript",
  js: "JavaScript",
  bash: "Bash",
  shell: "Shell",
  sh: "Shell",
  json: "JSON",
  yaml: "YAML",
  toml: "TOML",
  rust: "Rust",
  go: "Go",
  java: "Java",
  cpp: "C++",
  c: "C",
  csharp: "C#",
  php: "PHP",
  ruby: "Ruby",
  swift: "Swift",
  kotlin: "Kotlin",
  rohas: "Rohas",
};

function getLanguageName(lang: string): string {
  return languageNames[lang.toLowerCase()] || lang.charAt(0).toUpperCase() + lang.slice(1);
}

export default function CodeTabs({ 
  python, 
  typescript,
  lang1,
  lang2,
  code1,
  code2,
  label1,
  label2,
}: CodeTabsProps) {
  // Support legacy python/typescript props
  const firstLang = lang1 || (python ? "python" : undefined);
  const secondLang = lang2 || (typescript ? "typescript" : undefined);
  const firstCode = code1 || python;
  const secondCode = code2 || typescript;
  const firstLabel = label1 || (firstLang ? getLanguageName(firstLang) : "Code 1");
  const secondLabel = label2 || (secondLang ? getLanguageName(secondLang) : "Code 2");

  const [activeTab, setActiveTab] = useState<"first" | "second">("first");
  const [copiedFirst, setCopiedFirst] = useState(false);
  const [copiedSecond, setCopiedSecond] = useState(false);

  if (!firstCode || !secondCode || !firstLang || !secondLang) {
    return null;
  }

  const handleCopyFirst = async () => {
    try {
      await navigator.clipboard.writeText(firstCode.trim());
      setCopiedFirst(true);
      setTimeout(() => setCopiedFirst(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  const handleCopySecond = async () => {
    try {
      await navigator.clipboard.writeText(secondCode.trim());
      setCopiedSecond(true);
      setTimeout(() => setCopiedSecond(false), 2000);
    } catch (err) {
      console.error('Failed to copy:', err);
    }
  };

  return (
    <Box my={6}>
      <HStack gap={0} borderBottom="1px" borderColor="gray.200" _dark={{ borderColor: "gray.800" }} mb={4}>
        <Button
          onClick={() => setActiveTab("first")}
          variant="ghost"
          size="sm"
          px={4}
          py={2}
          fontSize="sm"
          fontWeight="medium"
          color={activeTab === "first" ? "gray.900" : "gray.600"}
          borderBottom="2px"
          borderColor={activeTab === "first" ? "blue.600" : "transparent"}
          _dark={{ 
            color: activeTab === "first" ? "gray.50" : "gray.400",
            borderColor: activeTab === "first" ? "blue.400" : "transparent" 
          }}
          borderRadius={0}
          _hover={{
            color: "gray.900",
            _dark: { color: "gray.50" },
          }}
          transition="colors 0.2s"
        >
          {firstLabel}
        </Button>
        <Button
          onClick={() => setActiveTab("second")}
          variant="ghost"
          size="sm"
          px={4}
          py={2}
          fontSize="sm"
          fontWeight="medium"
          color={activeTab === "second" ? "gray.900" : "gray.600"}
          borderBottom="2px"
          borderColor={activeTab === "second" ? "blue.600" : "transparent"}
          _dark={{ 
            color: activeTab === "second" ? "gray.50" : "gray.400",
            borderColor: activeTab === "second" ? "blue.400" : "transparent" 
          }}
          borderRadius={0}
          _hover={{
            color: "gray.900",
            _dark: { color: "gray.50" },
          }}
          transition="colors 0.2s"
        >
          {secondLabel}
        </Button>
      </HStack>
      <Box position="relative">
        {activeTab === "first" && (
          <>
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
                onClick={handleCopyFirst}
                color="gray.400"
                _dark={{ color: "gray.500" }}
                _hover={{ 
                  color: "gray.200", 
                  bg: "rgba(255, 255, 255, 0.1)",
                  _dark: { color: "gray.300", bg: "rgba(255, 255, 255, 0.05)" }
                }}
              >
                {copiedFirst ? <Check size={16} /> : <Copy size={16} />}
              </IconButton>
            </Flex>
          <SyntaxHighlighter
            style={oneDark as Record<string, React.CSSProperties>}
              language={firstLang}
            PreTag="div"
            customStyle={{
              borderRadius: "0.5rem",
                margin: 0,
                padding: "1.5rem",
                background: "#0a0a0a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              codeTagProps={{
                style: {
                  background: "transparent",
                  color: "#ffffff",
                }
            }}
          >
              {firstCode.trim()}
          </SyntaxHighlighter>
          </>
        )}
        {activeTab === "second" && (
          <>
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
                onClick={handleCopySecond}
                color="gray.400"
                _dark={{ color: "gray.500" }}
                _hover={{ 
                  color: "gray.200", 
                  bg: "rgba(255, 255, 255, 0.1)",
                  _dark: { color: "gray.300", bg: "rgba(255, 255, 255, 0.05)" }
                }}
              >
                {copiedSecond ? <Check size={16} /> : <Copy size={16} />}
              </IconButton>
            </Flex>
          <SyntaxHighlighter
            style={oneDark as Record<string, React.CSSProperties>}
              language={secondLang}
            PreTag="div"
            customStyle={{
              borderRadius: "0.5rem",
                margin: 0,
                padding: "1.5rem",
                background: "#0a0a0a",
                border: "1px solid rgba(255, 255, 255, 0.1)",
              }}
              codeTagProps={{
                style: {
                  background: "transparent",
                  color: "#ffffff",
                }
            }}
          >
              {secondCode.trim()}
          </SyntaxHighlighter>
          </>
        )}
      </Box>
    </Box>
  );
}
