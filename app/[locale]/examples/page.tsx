import Link from "next/link";
import {
  Box,
  Container,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Link as ChakraLink,
  Icon,
} from "@chakra-ui/react";

const ArrowForwardIcon = ({ ...props }: { w?: number; h?: number }) => (
  <Icon viewBox="0 0 24 24" w={4} h={4} {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={2.5}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M13 7l5 5m0 0l-5 5m5-5H6"
    />
  </Icon>
);

const ExternalLinkIcon = ({ ...props }: { w?: number; h?: number; color?: string }) => (
  <Icon viewBox="0 0 24 24" w={5} h={5} {...props}>
    <path
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
    />
  </Icon>
);

export default async function ExamplesPage({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const examples = [
    {
      title: "Hello World",
      description: "A simple example demonstrating basic API and event handling.",
      features: ["API endpoints", "Event publishing", "Basic handlers"],
      link: "https://github.com/rohas-dev/rohas/tree/main/examples/hello-world",
    },
    {
      title: "Web Crawler Service",
      description: "Distributed web crawler with event-driven job scheduling and result processing.",
      features: ["Crawler engine", "Job scheduling", "Data processing", "Rate limiting"],
      link: "#",
    },
    {
      title: "AI Content Generator",
      description: "Generate content using AI with event-driven workflows for batch processing and notifications.",
      features: ["AI models", "Batch processing", "Notification system", "Queue management"],
      link: "#",
    },
    {
      title: "Smart Crawler with AI",
      description: "Intelligent web crawler that uses AI to analyze and categorize scraped content automatically.",
      features: ["AI classification", "Content analysis", "Smart crawling", "Data enrichment"],
      link: "#",
    },
    {
      title: "File Processing Pipeline",
      description: "Process files asynchronously with event-driven workflows for upload, transformation, and storage.",
      features: ["File uploads", "Async processing", "Transformations", "Storage integration"],
      link: "#",
    }
  ];

  return (
    <Box
      minH="100vh"
      bgGradient={{
        base: "linear(to-b, white, gray.50, white)",
        _dark: "linear(to-b, gray.950, gray.900, gray.950)",
      }}
    >
      <Container maxW="90rem" px={{ base: 4, sm: 6, lg: 8, xl: 12 }} py={24}>
        <Box textAlign="center" mb={20}>
          <Heading
            as="h1"
            fontSize={{ base: "5xl", sm: "6xl", lg: "7xl" }}
            fontWeight="bold"
            color="gray.900"
            _dark={{ color: "gray.50" }}
            mb={6}
            letterSpacing="tight"
          >
            Examples
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="2xl"
            mx="auto"
            fontWeight="light"
          >
            Explore example projects to learn how to build event-driven applications with Rohas.
          </Text>
        </Box>

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, lg: 8 }} mb={20}>
          {examples.map((example, index) => (
            <Box
              key={index}
              position="relative"
              p={8}
              borderRadius="2xl"
              overflow="hidden"
              border="1px"
              borderColor="gray.200"
              bg="white"
              _dark={{ borderColor: "gray.800", bg: "gray.900" }}
              backdropFilter="blur(20px)"
              shadow="sm"
              _hover={{
                transform: "translateY(-4px)",
                shadow: "md",
                borderColor: "gray.300",
                _dark: { borderColor: "gray.700" }
              }}
              transition="all 0.3s ease"
            >
              <Box
                position="absolute"
                inset={0}
                bgGradient="to-br"
                gradientFrom="blue.500"
                gradientTo="purple.500"
                opacity={0}
                _hover={{ opacity: 0.05 }}
                transition="opacity 0.5s"
              />
              <Box position="relative" zIndex={10}>
                <Flex align="flex-start" justify="space-between" mb={5}>
                  <Heading
                    as="h2"
                    fontSize="xl"
                    fontWeight="bold"
                    color="gray.900"
                    _dark={{ color: "gray.50" }}
                    letterSpacing="tight"
                    pr={2}
                  >
                    {example.title}
                  </Heading>
                  <Box
                    w={10}
                    h={10}
                    borderRadius="xl"
                    bgGradient="to-br"
                    gradientFrom="blue.500"
                    gradientTo="purple.600"
                    opacity={0}
                    _groupHover={{ opacity: 1 }}
                    transition="opacity 0.3s"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    shadow="lg"
                    flexShrink={0}
                  >
                    <ExternalLinkIcon color="white" />
                  </Box>
                </Flex>
                <Text
                  color="gray.600"
                  _dark={{ color: "gray.400" }}
                  mb={6}
                  lineHeight="relaxed"
                  fontSize="15px"
                >
                  {example.description}
                </Text>
                <Box mb={6}>
                  <Heading
                    as="h3"
                    fontSize="sm"
                    fontWeight="semibold"
                    color="gray.900"
                    _dark={{ color: "gray.50" }}
                    mb={3}
                    letterSpacing="tight"
                  >
                    Features:
                  </Heading>
                  <Flex wrap="wrap" gap={2}>
                    {example.features.map((feature, i) => (
                      <Box
                        key={i}
                        as="span"
                        px={3}
                        py={1.5}
                        fontSize="xs"
                        fontWeight="medium"
                        borderRadius="lg"
                        bg="gray.100"
                        border="1px"
                        borderColor="gray.200"
                        color="gray.700"
                        _dark={{ 
                          bg: "gray.700",
                          borderColor: "gray.600",
                          color: "gray.200"
                        }}
                      >
                        {feature}
                      </Box>
                    ))}
                  </Flex>
                </Box>
                {example.link !== "#" ? (
                  <ChakraLink
                    href={example.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    display="inline-flex"
                    alignItems="center"
                    gap={2}
                    color="blue.600"
                    _dark={{ color: "blue.400" }}
                    fontWeight="semibold"
                    _hover={{
                      gap: 3,
                    }}
                    transition="all 0.3s"
                  >
                    View on GitHub
                    <ArrowForwardIcon />
                  </ChakraLink>
                ) : (
                  <Text
                    as="span"
                    display="inline-flex"
                    alignItems="center"
                    color="gray.400"
                    _dark={{ color: "gray.500" }}
                    fontSize="sm"
                  >
                    Coming soon
                  </Text>
                )}
              </Box>
            </Box>
          ))}
        </SimpleGrid>

        <Box
          position="relative"
          borderRadius="2xl"
          p={{ base: 8, sm: 12, lg: 16 }}
          overflow="hidden"
          border="1px"
          borderColor="gray.200"
          bg="whiteAlpha.700"
          _dark={{ borderColor: "gray.800", bg: "blackAlpha.300" }}
          backdropFilter="blur(20px)"
        >
          <Box
            position="absolute"
            inset={0}
            backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-blue-500), var(--chakra-colors-purple-500), var(--chakra-colors-pink-500))"
            opacity={0.03}
          />
          <Box position="relative" zIndex={10}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl" }}
              fontWeight="bold"
              color="gray.900"
              _dark={{ color: "gray.50" }}
              mb={4}
              letterSpacing="tight"
            >
              Running Examples
            </Heading>
            <Text
              fontSize="lg"
              color="gray.600"
              _dark={{ color: "gray.400" }}
              mb={8}
              fontWeight="light"
            >
              To run an example project:
            </Text>
            <Box
              as="pre"
              position="relative"
              bg="gray.900"
              _dark={{ bg: "gray.950" }}
              color="gray.50"
              p={6}
              borderRadius="xl"
              overflowX="auto"
              mb={8}
              border="1px"
              borderColor="gray.800"
              shadow="xl"
            >
              <Box as="code" fontFamily="mono" fontSize="sm">
                {`# Clone the repository
git clone https://github.com/rohas-dev/rohas.git
cd rohas/examples/hello-world

# Install dependencies
npm install  # or pip install -r requirements.txt

# Generate code
rohas codegen

# Start development server
rohas dev

# Or start with workbench UI
rohas dev --workbench`}
              </Box>
            </Box>
            <Text color="gray.600" _dark={{ color: "gray.400" }}>
              For more details, see the{" "}
              <Link href={`/${locale}/docs/getting-started`} style={{ textDecoration: 'none', display: 'inline' }}>
                <ChakraLink
                  color="blue.600"
                  _dark={{ color: "blue.400" }}
                  fontWeight="semibold"
                  _hover={{ textDecoration: "underline" }}
                  transition="colors 0.2s"
                >
                  Getting Started
                </ChakraLink>
              </Link>{" "}
              guide.
            </Text>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
