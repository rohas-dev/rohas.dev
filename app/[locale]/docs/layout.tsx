import { getTranslations } from "next-intl/server";
import DocsNav from "../components/DocsNav";
import { Box, Flex, Alert, Text } from "@chakra-ui/react";
import { getRohasVersion } from "../../../lib/version";

export default async function DocsLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("docs");
  const version = await getRohasVersion();
  
  const navItems = [
    { href: `/${locale}/docs`, label: t("overview") },
    { href: `/${locale}/docs/getting-started`, label: t("gettingStarted") },
    { href: `/${locale}/docs/installation`, label: t("installation") },
    { href: `/${locale}/docs/architecture`, label: t("architecture") },
    { href: `/${locale}/docs/schemas`, label: t("schemas") },
    { href: `/${locale}/docs/handlers`, label: t("handlers"), highlighted: true },
    { href: `/${locale}/docs/runtime`, label: t("runtime") },
    { href: `/${locale}/docs/adapters`, label: t("adapters") },
    { href: `/${locale}/docs/telemetry`, label: t("telemetry") },
    { href: `/${locale}/docs/cli`, label: t("cli") },
    { href: `/${locale}/docs/configuration`, label: t("configuration") },
    { href: `/${locale}/docs/roadmap`, label: t("roadmap") },
  ];

  return (
    <Box maxW="90rem" mx="auto" px={{ base: 4, sm: 6, lg: 8, xl: 12 }}>
      <Flex
        direction={{ base: "column", lg: "row" }}
        gap={{ base: 6, lg: 12 }}
        py={8}
      >
        <Box as="aside" w={{ lg: 64 }} flexShrink={0}>
          <Box as="nav" position={{ base: "static", lg: "sticky" }} top={{ lg: 20 }}>
            <DocsNav items={navItems} />
            <Box mt={4} display={{ base: "none", lg: "block" }}>
              <Box
                mb={4}
                px={3}
                py={2}
                borderRadius="md"
                border="1px"
                borderColor="gray.200"
                _dark={{ borderColor: "gray.700", bg: "gray.900"}}
                bg="gray.50"
              >
                <Text fontSize="xs" fontWeight="medium" color="gray.600" _dark={{ color: "gray.400" }}>
                  Version
                </Text>
                <Text fontSize="sm" fontWeight="semibold" color="gray.900" _dark={{ color: "gray.50" }} mt={0.5}>
                  v{version}
                </Text>
              </Box>
              <Alert.Root status="warning" variant="subtle">
                <Alert.Indicator />
                <Alert.Content>
                  <Alert.Title fontSize="xs" fontWeight="semibold">
                    ⚠️ Experimental Runtime
                  </Alert.Title>
                  <Alert.Description fontSize="xs" mt={1} lineHeight="1.5">
                    <Text as="span">
                      <Text as="span" fontWeight="bold" color="orange.600" _dark={{ color: "orange.400" }}>
                        TypeScript
                      </Text>{" "}
                      runtime is still experimental. We strongly recommend using{" "}
                      <Text as="span" fontWeight="bold" color="blue.600" _dark={{ color: "blue.400" }}>
                        Python
                      </Text>{" "}
                      for production applications.
                    </Text>
                  </Alert.Description>
                </Alert.Content>
              </Alert.Root>
            </Box>
          </Box>
        </Box>
        <Box flex={1} minW={0}>
          {children}
        </Box>
      </Flex>
    </Box>
  );
}
