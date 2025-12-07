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

    // Use scroll-based detection for more reliable tracking
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 150; // Offset for header/navigation
      
      // Find the current section based on scroll position
      let currentId = "";
      
      for (let i = headings.length - 1; i >= 0; i--) {
        const element = document.getElementById(headings[i].id);
        if (element) {
          const elementTop = element.offsetTop;
          
          if (elementTop <= scrollPosition) {
            currentId = headings[i].id;
            break;
          }
        }
      }
      
      // If we're at the top, select the first heading
      if (scrollPosition < 200 && headings.length > 0) {
        currentId = headings[0].id;
      }
      
      if (currentId) {
        setActiveId(currentId);
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Also use IntersectionObserver as a backup
    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries.filter((entry) => entry.isIntersecting);
        
        if (visibleEntries.length > 0) {
          // Find the entry closest to the top of the viewport
          visibleEntries.sort((a, b) => {
            return a.boundingClientRect.top - b.boundingClientRect.top;
          });
          
          const topEntry = visibleEntries[0];
          if (topEntry.boundingClientRect.top < 200) {
            setActiveId(topEntry.target.id);
          }
        }
      },
      {
        rootMargin: "-150px 0% -60%",
        threshold: [0, 0.25, 0.5, 0.75, 1],
      }
    );

    const elements: Element[] = [];
    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) {
        observer.observe(element);
        elements.push(element);
      }
    });

    window.addEventListener('scroll', throttledScroll, { passive: true });
    window.addEventListener('resize', throttledScroll, { passive: true });
    handleScroll(); // Initial check

    return () => {
      elements.forEach((element) => {
        observer.unobserve(element);
      });
      observer.disconnect();
      window.removeEventListener('scroll', throttledScroll);
      window.removeEventListener('resize', throttledScroll);
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
