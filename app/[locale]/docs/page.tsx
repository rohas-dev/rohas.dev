import Link from "next/link";
import MDXContent from "../../components/MDXContent";
import { loadMarkdown, compileMarkdown } from "../../lib/markdown";
import { getTranslations } from "next-intl/server";
import {
  Box,
  SimpleGrid,
  Heading,
  Text,
  Link as ChakraLink,
} from "@chakra-ui/react";

export default async function DocsPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const content = await loadMarkdown("index", locale);
  const compiledSource = await compileMarkdown(content);
  const t = await getTranslations("docs");

  return (
    <Box>
      <MDXContent compiledSource={compiledSource} />
      <SimpleGrid columns={{ base: 1, md: 2 }} gap={4} mt={12}>
        {[
          {
            href: `/${locale}/docs/getting-started`,
            title: t("gettingStarted"),
            description: "Set up your first Rohas project and build your first event-driven application.",
          },
          {
            href: `/${locale}/docs/installation`,
            title: t("installation"),
            description: "Install Rohas CLI and set up your development environment.",
          },
          {
            href: `/${locale}/docs/schemas`,
            title: t("schemas"),
            description: "Learn how to define APIs, events, models, and cron jobs using schema files.",
          },
          {
            href: `/${locale}/docs/handlers`,
            title: t("handlers"),
            description: "Implement handlers in Python, TypeScript, or Rust to process events and API requests.",
          },
          {
            href: `/${locale}/docs/adapters`,
            title: t("adapters"),
            description: "Connect to various message brokers: NATS, Kafka, RabbitMQ, SQS, and more.",
          },
          {
            href: `/${locale}/docs/cli`,
            title: t("cli"),
            description: "Complete reference for all Rohas CLI commands and options.",
          },
        ].map((item, index) => (
          <Link key={index} href={item.href} style={{ textDecoration: 'none' }}>
            <Box
              display="block"
              p={{ base: 4, md: 6 }}
              border="1px"
              borderColor="gray.200"
              bg="white"
              _dark={{ borderColor: "gray.800", bg: "gray.900" }}
              borderRadius="lg"
              _hover={{
                borderColor: "gray.300",
                _dark: { borderColor: "gray.700" },
                shadow: "sm",
              }}
              transition="all 0.2s"
            >
              <Heading
                as="h3"
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="semibold"
                color="gray.900"
                _dark={{ color: "gray.50" }}
                mb={2}
                _hover={{
                  color: "blue.600",
                  _dark: { color: "blue.400" },
                }}
                transition="colors 0.2s"
              >
                {item.title}
              </Heading>
              <Text
                fontSize={{ base: "xs", md: "sm" }}
                color="gray.600"
                _dark={{ color: "gray.400" }}
                lineHeight="relaxed"
              >
                {item.description}
              </Text>
            </Box>
          </Link>
        ))}
      </SimpleGrid>
    </Box>
  );
}
