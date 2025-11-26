"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import {
  Box,
  Flex,
  HStack,
  Link as ChakraLink,
} from "@chakra-ui/react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");

  const navItems = [
    { href: `/${locale}`, key: "home" },
    { href: `/${locale}/docs`, key: "docs" },
    { href: `/${locale}/examples`, key: "examples" },
    { href: `/${locale}/docs/roadmap`, key: "roadmap" },
  ];

  return (
    <Box
      as="nav"
      position="sticky"
      top={0}
      zIndex={50}
      borderBottom="1px"
      borderColor="gray.200"
      _dark={{ borderColor: "gray.800" }}
    >
      <Box
        position="absolute"
        inset={0}
        bg="whiteAlpha.800"
        _dark={{ bg: "gray.950" }}
        backdropFilter="blur(12px)"
        backdropSaturate="150%"
      />
      <Box
        position="relative"
        maxW="90rem"
        mx="auto"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
      >
        <Flex justify="space-between" align="center" h={16}>
          <ChakraLink
            asChild
          >
            <Link
              href={`/${locale}`}
              style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
              aria-label="Rohas Home"
            >
              <Box
                position="relative"
                w={9}
                h={9}
                borderRadius="xl"
                overflow="hidden"
                _hover={{ transform: "scale(1.05)" }}
                transition="all 0.3s"
              >
                <Image
                  src="/dark_logo.png"
                  alt="Rohas Logo"
                  fill
                  style={{
                    objectFit: "contain",
                  }}
                />
              </Box>
              <Box
                as="span"
                fontSize="xl"
                fontWeight="bold"
                backgroundImage="linear-gradient(to right, var(--chakra-colors-gray-900), var(--chakra-colors-gray-800), var(--chakra-colors-gray-900))"
                backgroundClip="text"
                color="transparent"
                _dark={{
                  backgroundImage: "linear-gradient(to right, var(--chakra-colors-gray-50), var(--chakra-colors-gray-100), var(--chakra-colors-gray-50))",
                }}
              >
                Rohas
              </Box>
            </Link>
          </ChakraLink>
          <HStack gap={1}>
            {navItems.map((item) => {
              const isActive =
                pathname.includes(item.href) &&
                (item.href === `/${locale}`
                  ? pathname === `/${locale}` || pathname === `/${locale}/`
                  : pathname.startsWith(item.href));
              return (
                <ChakraLink
                  key={item.href}
                  asChild
                >
                  <Link
                    href={item.href}
                    style={{ textDecoration: "none" }}
                  >
                    <Box
                      fontSize="sm"
                      fontWeight={isActive ? "semibold" : "medium"}
                      px={4}
                      py={2}
                      borderRadius="lg"
                      color={isActive ? "gray.900" : "gray.600"}
                      _dark={{ 
                        color: isActive ? "gray.50" : "gray.400" 
                      }}
                      _hover={{
                        color: "gray.900",
                        bg: "gray.100",
                        _dark: { 
                          color: "gray.50",
                          bg: "gray.800"
                        },
                      }}
                      transition="all 0.2s"
                    >
                      {t(item.key)}
                    </Box>
                  </Link>
                </ChakraLink>
              );
            })}
            <ChakraLink
              href="https://github.com/rohas-dev/rohas"
              target="_blank"
              rel="noopener noreferrer"
              fontSize="sm"
              fontWeight="medium"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              px={4}
              py={2}
              borderRadius="lg"
              _hover={{
                color: "gray.900",
                bg: "gray.100",
                _dark: { 
                  color: "gray.50",
                  bg: "gray.800"
                },
              }}
              transition="all 0.2s"
              aria-label="GitHub Repository"
            >
              {t("github")}
            </ChakraLink>
            <ThemeToggle />
            <LanguageSwitcher />
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
