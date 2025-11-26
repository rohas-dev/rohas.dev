"use client";

import { useRef, useEffect } from "react";
import { Box, Heading, Text } from "@chakra-ui/react";
import Image from "next/image";
import { motion, useScroll, useTransform, MotionValue, useSpring } from "framer-motion";
import Lenis from "@studio-freight/lenis";

interface ShowcaseItem {
  title: string;
  description: string;
  image: string;
  gradientFrom: string;
  gradientTo: string;
  color: string;
}

const showcases: ShowcaseItem[] = [
  {
    title: "Schema Management",
    description:
      "Define, validate, and manage your event schemas with an intuitive interface. Create complex data structures with ease and ensure type safety across your entire application.",
    image: "/workbench-schemas.png",
    gradientFrom: "blue.500",
    gradientTo: "cyan.500",
    color: "blue",
  },
  {
    title: "API Endpoints",
    description:
      "Design and test your API endpoints visually. Generate endpoints automatically from your schemas and interact with them in real-time through the workbench interface.",
    image: "/workbench-api.png",
    gradientFrom: "purple.500",
    gradientTo: "pink.500",
    color: "purple",
  },
  {
    title: "Event Tracing",
    description:
      "Track events as they flow through your system. Visualize the complete lifecycle of each event, from creation to processing, with detailed timing and dependency information.",
    image: "/workbench-tracing.png",
    gradientFrom: "green.500",
    gradientTo: "emerald.500",
    color: "green",
  },
  {
    title: "Schema Graph",
    description:
      "Visualize the relationships between your schemas in an interactive graph. Understand dependencies, connections, and the flow of data through your event-driven architecture.",
    image: "/workbench-schema-graph.png",
    gradientFrom: "orange.500",
    gradientTo: "red.500",
    color: "orange",
  },
  {
    title: "Unified Workbench",
    description:
      "A comprehensive workspace that brings together all your development tools. Manage schemas, monitor events, trace execution, and visualize your entire system in one powerful interface.",
    image: "/workbench-full-page.png",
    gradientFrom: "indigo.500",
    gradientTo: "purple.500",
    color: "indigo",
  },
];

export default function ParallaxShowcase() {
  const containerRef = useRef<HTMLDivElement>(null);
  const lenisRef = useRef<Lenis | null>(null);

  // Initialize Lenis smooth scroll
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: "vertical",
      gestureOrientation: "vertical",
      smoothWheel: true,
      wheelMultiplier: 0.8,
      touchMultiplier: 1.5,
      infinite: false,
      syncTouch: true,
    });

    lenisRef.current = lenis;

    let rafId: number;
    function raf(time: number) {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }

    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, []);

  const { scrollYProgress: rawScrollProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Smooth the scroll progress for better animations
  const scrollYProgress = useSpring(rawScrollProgress, {
    stiffness: 100,
    damping: 30,
    mass: 0.5,
  });

  return (
    <Box
      as="section"
      position="relative"
      pt={{ base: 16, md: 24, lg: 32 }}
      pb={{ base: 8, md: 12, lg: 16 }}
      overflow="visible"
    >
      <Box
        position="relative"
        zIndex={2}
        maxW="90rem"
        mx="auto"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
      >
        <Box textAlign="center" mb={{ base: 12, md: 16, lg: 20 }}>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight="extrabold"
            color="gray.900"
            _dark={{ color: "gray.50" }}
            mb={4}
            letterSpacing="tight"
          >
            <Box
              as="span"
              backgroundImage="linear-gradient(to right, var(--chakra-colors-blue-600), var(--chakra-colors-purple-600), var(--chakra-colors-pink-600))"
              backgroundClip="text"
              color="transparent"
              backgroundSize="200% 200%"
              style={{
                animation: "gradient 8s ease infinite",
              }}
            >
              Powerful Workbench
            </Box>
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="3xl"
            mx="auto"
            fontWeight="medium"
          >
            Visualize, debug, and monitor your event-driven applications in
            real-time
          </Text>
        </Box>

        {/* Parallax Cards Container */}
        <Box
          ref={containerRef}
          position="relative"
          style={{
            minHeight: `${showcases.length * 150}vh`,
          }}
        >
          {showcases.map((showcase, index) => {
            // Each card gets a longer range - cards stay visible longer
            // Card 0: 0.0 - 0.2, Card 1: 0.2 - 0.4, etc.
            const cardRange = 0.2; // Each card takes 20% of scroll (longer)
            const start = index * cardRange;
            const end = start + cardRange;
            const range: [number, number] = [start, end];

            return (
              <ShowcaseCard
                key={index}
                showcase={showcase}
                index={index}
                scrollYProgress={scrollYProgress}
                range={range}
              />
            );
          })}
        </Box>
      </Box>
    </Box>
  );
}

interface ShowcaseCardProps {
  showcase: ShowcaseItem;
  index: number;
  scrollYProgress: MotionValue<number>;
  range: [number, number];
}

function ShowcaseCard({
  showcase,
  index,
  scrollYProgress,
  range,
}: ShowcaseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);

  // Smooth opacity transition - longer fade zones
  const opacity = useTransform(
    scrollYProgress,
    [range[0] - 0.05, range[0] + 0.05, range[1] - 0.05, range[1] + 0.05],
    [0, 1, 1, 0]
  );

  // Subtle scale effect - longer transition zones
  const scale = useTransform(
    scrollYProgress,
    [range[0] - 0.05, range[0] + 0.05, range[1] - 0.05, range[1] + 0.05],
    [0.95, 1, 1, 0.95]
  );


  return (
    <Box
      ref={cardRef}
      position="sticky"
      top="0"
      h="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <motion.div
        style={{
          opacity,
          scale,
          width: "100%",
          maxWidth: "1600px",
        }}
      >
        <Box
          position="relative"
          w="100%"
          borderRadius="xl"
          overflow="hidden"
          bg="white"
          shadow="xl"
          borderWidth="1px"
          borderColor="gray.200"
          _dark={{ bg: "gray.900", borderColor: "gray.700" }}
          h={{ base: "70vh", md: "80vh", lg: "85vh" }}
          minH={{ base: "500px", md: "600px", lg: "700px" }}
        >
          {/* Image */}
          <Box position="relative" w="100%" h="100%" overflow="hidden">
            <motion.div
              style={{
                width: "100%",
                height: "100%",
                position: "absolute",
                top: 0,
                left: 0,
              }}
            >
              <Image
                src={showcase.image}
                alt={showcase.title}
                fill
                style={{
                  objectFit: "cover",
                }}
                quality={95}
              />
            </motion.div>

            {/* Content with solid background */}
            <Box
              position="absolute"
              bottom={0}
              left={0}
              right={0}
              p={{ base: 8, md: 10, lg: 12 }}
              zIndex={2}
              bg="black"
              _dark={{ bg: "gray.950" }}
            >

              <Box maxW="4xl">
                {/* Simple number indicator */}
                <Text
                  fontSize="xs"
                  fontWeight="medium"
                  color="whiteAlpha.600"
                  mb={4}
                  letterSpacing="wider"
                  textTransform="uppercase"
                >
                  {String(index + 1).padStart(2, "0")} / {String(showcases.length).padStart(2, "0")}
                </Text>

                {/* Title */}
                <Heading
                  as="h2"
                  fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}
                  fontWeight="bold"
                  color="white"
                  mb={4}
                  lineHeight="1.2"
                >
                  {showcase.title}
                </Heading>

                {/* Description */}
                <Text
                  fontSize={{ base: "md", md: "lg", lg: "xl" }}
                  color="white"
                  lineHeight="relaxed"
                  maxW={{ base: "100%", md: "90%" }}
                  fontWeight="normal"
                >
                  {showcase.description}
                </Text>
              </Box>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </Box>
  );
}
