"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useTranslations, useLocale } from "next-intl";
import { useState } from "react";
import {
  Box,
  Flex,
  HStack,
  VStack,
  Link as ChakraLink,
  IconButton,
  DrawerRoot,
  DrawerTrigger,
  DrawerContent,
  DrawerBody,
  DrawerHeader,
  DrawerBackdrop,
  Separator,
} from "@chakra-ui/react";
import { Menu, X, Home, BookOpen, Code, Map } from "lucide-react";
import LanguageSwitcher from "./LanguageSwitcher";
import ThemeToggle from "./ThemeToggle";

export default function Navigation() {
  const pathname = usePathname();
  const locale = useLocale();
  const t = useTranslations("nav");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const navItems = [
    { href: `/${locale}`, key: "home", icon: Home },
    { href: `/${locale}/docs`, key: "docs", icon: BookOpen },
    { href: `/${locale}/examples`, key: "examples", icon: Code },
    { href: `/${locale}/docs/roadmap`, key: "roadmap", icon: Map },
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
                display={{ base: "none", sm: "block" }}
              >
                Rohas
              </Box>
            </Link>
          </ChakraLink>
          {/* Desktop Navigation */}
          <HStack gap={1} display={{ base: "none", md: "flex" }}>
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

          {/* Mobile Menu Button */}
          <HStack gap={2} display={{ base: "flex", md: "none" }}>
            <ThemeToggle />
            <LanguageSwitcher />
            <DrawerRoot 
              open={isMobileMenuOpen} 
              onOpenChange={(details) => setIsMobileMenuOpen(details.open)}
              placement="end"
              size="sm"
            >
              <DrawerBackdrop />
              <DrawerTrigger asChild>
                <IconButton
                  aria-label="Open menu"
                  variant="ghost"
                  size="sm"
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  _hover={{
                    bg: "gray.100",
                    _dark: { bg: "gray.800" },
                  }}
                >
                  <Menu size={20} />
                </IconButton>
              </DrawerTrigger>
              <DrawerContent
                bg="white"
                borderLeft="1px"
                borderColor="gray.200"
                _dark={{ bg: "gray.950", borderColor: "gray.800" }}
              >
                <DrawerHeader
                  borderBottom="1px"
                  borderColor="gray.200"
                  _dark={{ borderColor: "gray.800" }}
                  pb={4}
                >
                  <Flex justify="space-between" align="center">
                    <ChakraLink asChild>
                      <Link
                        href={`/${locale}`}
                        style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none" }}
                        onClick={() => setIsMobileMenuOpen(false)}
                      >
                        <Box
                          position="relative"
                          w={8}
                          h={8}
                          borderRadius="xl"
                          overflow="hidden"
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
                          fontSize="lg"
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
                    <IconButton
                      aria-label="Close menu"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsMobileMenuOpen(false)}
                      color="gray.600"
                      _dark={{ color: "gray.400" }}
                      _hover={{
                        bg: "gray.100",
                        _dark: { bg: "gray.800" },
                      }}
                    >
                      <X size={20} />
                    </IconButton>
                  </Flex>
                </DrawerHeader>
                <DrawerBody px={0} py={0} overflowY="auto">
                  <VStack align="stretch" gap={0}>
                    {navItems.map((item) => {
                      const isActive =
                        pathname.includes(item.href) &&
                        (item.href === `/${locale}`
                          ? pathname === `/${locale}` || pathname === `/${locale}/`
                          : pathname.startsWith(item.href));
                      const IconComponent = item.icon;
                      return (
                        <ChakraLink
                          key={item.href}
                          asChild
                        >
                          <Link
                            href={item.href}
                            style={{ textDecoration: "none" }}
                            onClick={() => setIsMobileMenuOpen(false)}
                          >
                            <HStack
                              px={6}
                              py={4}
                              borderBottom="1px"
                              borderColor="gray.100"
                              color={isActive ? "blue.600" : "gray.700"}
                              bg={isActive ? "blue.50" : "transparent"}
                              _dark={{ 
                                borderColor: "gray.800",
                                color: isActive ? "blue.400" : "gray.300",
                                bg: isActive ? "blue.950" : "transparent"
                              }}
                              _hover={{
                                bg: "gray.50",
                                _dark: { 
                                  bg: "gray.900"
                                },
                              }}
                              transition="all 0.2s"
                              gap={3}
                            >
                              <IconComponent 
                                size={20} 
                                style={{ 
                                  flexShrink: 0,
                                  opacity: isActive ? 1 : 0.7 
                                }} 
                              />
                              <Box
                                fontSize="md"
                                fontWeight={isActive ? "semibold" : "medium"}
                                flex={1}
                              >
                                {t(item.key)}
                              </Box>
                            </HStack>
                          </Link>
                        </ChakraLink>
                      );
                    })}
                    <Box
                      px={6}
                      py={4}
                      borderTop="1px"
                      borderBottom="1px"
                      borderColor="gray.200"
                      mt={2}
                      bg="gray.50"
                      _dark={{ borderColor: "gray.800", bg: "gray.900" }}
                    >
                      <HStack gap={3} justify="space-between">
                        <Box fontSize="sm" fontWeight="medium" color="gray.600" _dark={{ color: "gray.400" }}>
                          Settings
                        </Box>
                        <HStack gap={2}>
                          <ThemeToggle />
                          <LanguageSwitcher />
                        </HStack>
                      </HStack>
                    </Box>
                    <ChakraLink
                      href="https://github.com/rohas-dev/rohas"
                      target="_blank"
                      rel="noopener noreferrer"
                      fontSize="md"
                      fontWeight="medium"
                      color="gray.700"
                      px={6}
                      py={4}
                      display="block"
                      borderBottom="1px"
                      borderColor="gray.100"
                      _dark={{ color: "gray.300", borderColor: "gray.800" }}
                      _hover={{
                        bg: "gray.50",
                        _dark: { 
                          bg: "gray.900"
                        },
                      }}
                      transition="all 0.2s"
                    >
                      {t("github")}
                    </ChakraLink>
                  </VStack>
                </DrawerBody>
              </DrawerContent>
            </DrawerRoot>
          </HStack>
        </Flex>
      </Box>
    </Box>
  );
}
