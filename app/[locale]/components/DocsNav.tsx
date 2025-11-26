"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  Box,
  VStack,
  Link as ChakraLink,
  HStack,
} from "@chakra-ui/react";
import { Star } from "lucide-react";

interface DocsNavProps {
  items: Array<{ href: string; label: string; highlighted?: boolean }>;
}

export default function DocsNav({ items }: DocsNavProps) {
  const pathname = usePathname();

  return (
    <Box as="nav">
      <VStack align="stretch" gap={1}>
        {items.map((item) => {
          const baseDocsPath = pathname.split('/').slice(0, 3).join('/') + '/docs';
          const isActive = pathname === item.href || 
            (item.href !== baseDocsPath && pathname.startsWith(item.href + '/'));
          return (
            <Box key={item.href}>
              <ChakraLink
                asChild
              >
                <Link
                  href={item.href}
                  style={{ display: "block", textDecoration: "none" }}
                >
                  <HStack
                    px={3}
                    py={2}
                    fontSize="sm"
                    transition="colors 0.2s"
                    color={isActive ? "gray.900" : "gray.600"}
                    _dark={{ 
                      color: isActive ? "gray.50" : "gray.500" 
                    }}
                    fontWeight={isActive ? "semibold" : "normal"}
                    _hover={{
                      color: "gray.900",
                      _dark: { color: "gray.50" },
                    }}
                    gap={1.5}
                  >
                    <Box as="span">{item.label}</Box>
                    {item.highlighted && (
                      <Box
                        as="span"
                        display="inline-flex"
                        color="yellow.500"
                        _dark={{ color: "yellow.400" }}
                      >
                        <Star 
                          size={14} 
                          fill="currentColor"
                          style={{ opacity: 0.9 }}
                        />
                  </Box>
                    )}
                  </HStack>
                </Link>
              </ChakraLink>
            </Box>
          );
        })}
      </VStack>
    </Box>
  );
}
