"use client";

import { useEffect, useState } from "react";
import {
  Box,
  VStack,
  Link,
  Text,
} from "@chakra-ui/react";

interface Heading {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: Heading[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");

  useEffect(() => {
    if (headings.length === 0) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        });
      },
      {
        rootMargin: "-100px 0% -66%",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      headings.forEach((heading) => {
        const element = document.getElementById(heading.id);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, [headings]);

  if (headings.length === 0) {
    return null;
  }

  return (
    <Box
      as="aside"
      display={{ base: "none", xl: "block" }}
      w={64}
      flexShrink={0}
    >
      <Box as="nav" position="sticky" top={20}>
        <Box borderLeft="1px" borderColor="gray.200" _dark={{ borderColor: "gray.800" }} pl={4}>
          <Text
            fontSize="xs"
            fontWeight="semibold"
            color="gray.900"
            _dark={{ color: "gray.50" }}
            textTransform="uppercase"
            letterSpacing="wider"
            mb={4}
          >
            On this page
          </Text>
          <VStack align="stretch" gap={2}>
            {headings.map((heading) => (
              <Box key={heading.id}>
                <Link
                  href={`#${heading.id}`}
                  display="block"
                  fontSize="sm"
                  transition="colors 0.2s"
                  pl={heading.level === 3 ? 4 : 0}
                  fontWeight={
                    heading.level === 1
                      ? "semibold"
                      : activeId === heading.id
                      ? "medium"
                      : "normal"
                  }
                  color={
                    heading.level === 1
                      ? activeId === heading.id
                        ? "gray.900"
                        : "gray.700"
                      : activeId === heading.id
                      ? "gray.900"
                      : "gray.600"
                  }
                  _dark={{
                    color: heading.level === 1
                      ? activeId === heading.id
                        ? "gray.50"
                        : "gray.300"
                      : activeId === heading.id
                      ? "gray.50"
                      : "gray.500"
                  }}
                  _hover={{
                    color: "gray.900",
                    _dark: { color: "gray.50" },
                  }}
                >
                  {heading.text}
                </Link>
              </Box>
            ))}
          </VStack>
        </Box>
      </Box>
    </Box>
  );
}
