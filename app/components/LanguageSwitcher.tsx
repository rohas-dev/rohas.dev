"use client";

import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useLocale } from "next-intl";
import {
  Box,
  Button,
  Menu,
} from "@chakra-ui/react";
import { ChevronDown } from "lucide-react";

const languages = [
  { code: "en", label: "English", native: "English" },
  { code: "km", label: "Khmer", native: "ខ្មែរ" },
  { code: "ja", label: "Japanese", native: "日本語" },
];

export default function LanguageSwitcher() {
  const locale = useLocale();
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const currentLanguage = languages.find((lang) => lang.code === locale) || languages[0];

  const switchLocale = (newLocale: string) => {
    if (newLocale === locale) {
      return;
    }

    const currentPath = pathname;
    const localePattern = new RegExp(`^/(${languages.map(l => l.code).join('|')})(/.*)?$`);
    const match = currentPath.match(localePattern);
    
    let pathWithoutLocale = '/';
    if (match) {
      pathWithoutLocale = match[2] || '/';
    } else {
      pathWithoutLocale = currentPath.startsWith('/') ? currentPath : `/${currentPath}`;
    }

    if (!pathWithoutLocale.startsWith('/')) {
      pathWithoutLocale = '/' + pathWithoutLocale;
    }

    const search = searchParams.toString();
    const newPath = pathWithoutLocale === '/' 
      ? `/${newLocale}${search ? `?${search}` : ''}` 
      : `/${newLocale}${pathWithoutLocale}${search ? `?${search}` : ''}`;
    
    router.push(newPath);
  };

  return (
    <Menu.Root>
      <Menu.Trigger asChild>
        <Button
          variant="ghost"
          size="sm"
          color="gray.600"
          _dark={{ color: "gray.400" }}
          _hover={{
            color: "gray.900",
            bg: "gray.100",
            _dark: { color: "gray.50", bg: "gray.800" },
          }}
          fontSize="sm"
          fontWeight="medium"
          px={3}
          py={2}
          borderRadius="lg"
        >
          {currentLanguage.native}
          <ChevronDown size={16} style={{ marginLeft: "4px" }} />
        </Button>
      </Menu.Trigger>
      <Menu.Positioner>
        <Menu.Content
          bg="white"
          border="1px"
          borderColor="gray.200"
          _dark={{ bg: "gray.800", borderColor: "gray.700" }}
          borderRadius="xl"
          shadow="xl"
          minW={40}
          py={1}
        >
          {languages.map((lang) => (
            <Menu.Item
              key={lang.code}
              value={lang.code}
              onClick={() => {
                switchLocale(lang.code);
              }}
              bg={locale === lang.code ? "gray.100" : "transparent"}
              _dark={{ 
                bg: locale === lang.code ? "gray.700" : "transparent",
                color: locale === lang.code ? "gray.50" : "gray.300"
              }}
              _hover={{
                bg: "gray.100",
                _dark: { bg: "gray.700" },
              }}
              px={4}
              py={2.5}
              fontSize="sm"
              fontWeight="medium"
              color={locale === lang.code ? "gray.900" : "gray.600"}
            >
              <Box display="flex" alignItems="center" justifyContent="space-between" w="full">
                <Box as="span">{lang.native}</Box>
                <Box as="span" fontSize="xs" color="gray.400" _dark={{ color: "gray.500" }}>
                  {lang.label}
                </Box>
              </Box>
            </Menu.Item>
          ))}
        </Menu.Content>
      </Menu.Positioner>
    </Menu.Root>
  );
}
