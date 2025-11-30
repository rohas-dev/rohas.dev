import Link from "next/link";
import { getTranslations } from "next-intl/server";
import CodePreview from "../components/CodePreview";
import ParallaxShowcase from "../components/ParallaxShowcase";
import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Link as ChakraLink,
  SimpleGrid,
  VStack,
  HStack,
  Container,
} from "@chakra-ui/react";
import { ArrowRight, Github, Zap, Code, Database, Rocket, Shield, Sparkles, Users } from "lucide-react";

export default async function Home({
  params
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const t = await getTranslations("home");
  const tf = await getTranslations("features");

  return (
    <Box
      minH="100vh"
      position="relative"
      backgroundImage={{
        base: "linear-gradient(to bottom, white, var(--chakra-colors-gray-50), white)",
        _dark: "linear-gradient(to bottom, var(--chakra-colors-gray-950), var(--chakra-colors-gray-900), var(--chakra-colors-gray-950))",
      }}
    >
      {/* Animated background gradients */}
      <Box
        position="fixed"
        inset={0}
        zIndex={-1}
        overflow="hidden"
        pointerEvents="none"
      >
        {/* Subtle background orbs - minimal for depth */}
        <Box
          position="absolute"
          top="-10%"
          right="10%"
          w="600px"
          h="600px"
          backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-blue-500), var(--chakra-colors-purple-500))"
          opacity={0.08}
          borderRadius="full"
          filter="blur(120px)"
          _dark={{ opacity: 0.05 }}
          style={{ 
            animation: 'float 20s ease-in-out infinite',
            willChange: 'transform'
          }}
        />
        <Box
          position="absolute"
          bottom="-10%"
          left="10%"
          w="500px"
          h="500px"
          backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-purple-500), var(--chakra-colors-pink-500))"
          opacity={0.06}
          borderRadius="full"
          filter="blur(120px)"
          _dark={{ opacity: 0.04 }}
          style={{ 
            animation: 'floatReverse 25s ease-in-out infinite',
            animationDelay: '2s',
            willChange: 'transform'
          }}
        />

        {/* Network Animation near Navbar - Elegant Mesh Network */}
        <Box
          position="absolute"
          top={0}
          left={0}
          right={0}
          h="100px"
          opacity={0.6}
          _dark={{ opacity: 0.5 }}
          zIndex={0}
        >
          <svg
            width="100%"
            height="100%"
            style={{ 
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <defs>
              {/* Elegant neon gradients */}
              <linearGradient id="navbarNetworkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.8)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.8)" />
              </linearGradient>
              <filter id="softGlow">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="nodeGlow">
                <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Elegant flowing mesh network */}
            {/* Horizontal flowing connections */}
            {[
              { y: '20%', delay: 0 },
              { y: '50%', delay: 0.5 },
              { y: '80%', delay: 1 },
            ].map((row, rowIndex) => (
              <g key={`row-${rowIndex}`}>
                {/* Curved connections between nodes */}
                {[
                  { x1: '10%', x2: '30%' },
                  { x1: '30%', x2: '50%' },
                  { x1: '50%', x2: '70%' },
                  { x1: '70%', x2: '90%' },
                ].map((conn, i) => {
                  const midY = parseFloat(row.y) + (Math.sin(i * 0.5) * 3);
                  return (
                    <path
                      key={`conn-${rowIndex}-${i}`}
                      d={`M ${conn.x1} ${row.y} Q ${(parseFloat(conn.x1) + parseFloat(conn.x2)) / 2}% ${midY}% ${conn.x2} ${row.y}`}
                      fill="none"
                      stroke="url(#navbarNetworkGradient)"
                      strokeWidth="1.5"
                      opacity="0.4"
                      filter="url(#softGlow)"
                      style={{
                        strokeDasharray: '8,6',
                        animation: `networkFlow ${6 + i * 0.5}s linear infinite`,
                        animationDelay: `${rowIndex * 0.3 + i * 0.2}s`,
                      }}
                    />
                  );
                })}
                
                {/* Nodes */}
                {['10%', '30%', '50%', '70%', '90%'].map((x, i) => (
                  <g key={`node-${rowIndex}-${i}`}>
                    <circle
                      cx={x}
                      cy={row.y}
                      r="4"
                      fill="url(#navbarNetworkGradient)"
                      opacity="0.7"
                      filter="url(#nodeGlow)"
                      style={{
                        animation: `networkPulse ${3 + (i % 3) * 0.5}s ease-in-out infinite`,
                        animationDelay: `${rowIndex * 0.2 + i * 0.15}s`,
                      }}
                    />
                    <circle
                      cx={x}
                      cy={row.y}
                      r="7"
                      fill="none"
                      stroke="url(#navbarNetworkGradient)"
                      strokeWidth="0.5"
                      opacity="0.3"
                      style={{
                        animation: `networkPulse ${3 + (i % 3) * 0.5}s ease-in-out infinite`,
                        animationDelay: `${rowIndex * 0.2 + i * 0.15}s`,
                      }}
                    />
                  </g>
                ))}
              </g>
            ))}
            
            {/* Vertical connections for mesh effect */}
            {['10%', '30%', '50%', '70%', '90%'].map((x, colIndex) => (
              <g key={`col-${colIndex}`}>
                {[
                  { y1: '20%', y2: '50%' },
                  { y1: '50%', y2: '80%' },
                ].map((conn, i) => (
                  <line
                    key={`vert-${colIndex}-${i}`}
                    x1={x}
                    y1={conn.y1}
                    x2={x}
                    y2={conn.y2}
                    stroke="url(#navbarNetworkGradient)"
                    strokeWidth="1"
                    opacity="0.25"
                    filter="url(#softGlow)"
                    style={{
                      strokeDasharray: '6,8',
                      animation: `networkFlow ${8 + colIndex * 0.3}s linear infinite`,
                      animationDelay: `${colIndex * 0.2 + i * 0.4}s`,
                    }}
                  />
                ))}
              </g>
            ))}
          </svg>
        </Box>

        {/* Elegant Network Visualization - Organic Mesh Pattern */}
        <Box
          position="absolute"
          top="100px"
          left={0}
          right={0}
          bottom={0}
          opacity={0.4}
          _dark={{ opacity: 0.3 }}
        >
          <svg
            width="100%"
            height="100%"
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
            }}
          >
            <defs>
              {/* Elegant gradients */}
              <linearGradient id="networkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(59, 130, 246, 0.6)" />
                <stop offset="50%" stopColor="rgba(147, 51, 234, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
              </linearGradient>
              <filter id="glowMain">
                <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
              <filter id="nodeGlowMain">
                <feGaussianBlur stdDeviation="2.5" result="coloredBlur"/>
                <feMerge>
                  <feMergeNode in="coloredBlur"/>
                  <feMergeNode in="SourceGraphic"/>
                </feMerge>
              </filter>
            </defs>
            
            {/* Organic mesh network pattern */}
            {/* Horizontal flowing connections */}
            {[
              { y: '5%', nodes: ['8%', '25%', '42%', '58%', '75%', '92%'] },
              { y: '18%', nodes: ['10%', '28%', '45%', '55%', '72%', '90%'] },
              { y: '32%', nodes: ['8%', '25%', '42%', '58%', '75%', '92%'] },
              { y: '48%', nodes: ['10%', '28%', '45%', '55%', '72%', '90%'] },
              { y: '65%', nodes: ['8%', '25%', '42%', '58%', '75%', '92%'] },
            ].map((row, rowIndex) => (
              <g key={`row-${rowIndex}`}>
                {/* Curved connections between adjacent nodes */}
                {row.nodes.slice(0, -1).map((x, i) => {
                  const x1 = parseFloat(x);
                  const x2 = parseFloat(row.nodes[i + 1]);
                  const midX = (x1 + x2) / 2;
                  const curveY = parseFloat(row.y) + (Math.sin(i * 0.8) * 2);
                  return (
                    <path
                      key={`conn-${rowIndex}-${i}`}
                      d={`M ${x} ${row.y} Q ${midX}% ${curveY}% ${row.nodes[i + 1]} ${row.y}`}
                      fill="none"
                      stroke="url(#networkGradient)"
                      strokeWidth="1"
                      opacity="0.3"
                      filter="url(#glowMain)"
                      style={{
                        strokeDasharray: '10,8',
                        animation: `networkFlow ${8 + i * 0.4}s linear infinite`,
                        animationDelay: `${rowIndex * 0.3 + i * 0.15}s`,
                      }}
                    />
                  );
                })}
                
                {/* Nodes with elegant glow */}
                {row.nodes.map((x, i) => (
                  <g key={`node-${rowIndex}-${i}`}>
                    <circle
                      cx={x}
                      cy={row.y}
                      r="3.5"
                      fill="url(#networkGradient)"
                      opacity="0.8"
                      filter="url(#nodeGlowMain)"
                      style={{
                        animation: `networkPulse ${4 + (i % 4) * 0.6}s ease-in-out infinite`,
                        animationDelay: `${rowIndex * 0.2 + i * 0.1}s`,
                      }}
                    />
                    <circle
                      cx={x}
                      cy={row.y}
                      r="6"
                      fill="none"
                      stroke="url(#networkGradient)"
                      strokeWidth="0.5"
                      opacity="0.4"
                      style={{
                        animation: `networkPulse ${4 + (i % 4) * 0.6}s ease-in-out infinite`,
                        animationDelay: `${rowIndex * 0.2 + i * 0.1}s`,
                      }}
                    />
                  </g>
                ))}
              </g>
            ))}
            
            {/* Subtle vertical connections for depth */}
            {['8%', '25%', '42%', '58%', '75%', '92%'].map((x, colIndex) => (
              <g key={`col-${colIndex}`}>
                {[
                  { y1: '5%', y2: '18%' },
                  { y1: '18%', y2: '32%' },
                  { y1: '32%', y2: '48%' },
                  { y1: '48%', y2: '65%' },
                ].map((conn, i) => (
                  <line
                    key={`vert-${colIndex}-${i}`}
                    x1={x}
                    y1={conn.y1}
                    x2={x}
                    y2={conn.y2}
                    stroke="url(#networkGradient)"
                    strokeWidth="0.8"
                    opacity="0.2"
                    filter="url(#glowMain)"
                    style={{
                      strokeDasharray: '8,12',
                      animation: `networkFlow ${12 + colIndex * 0.5}s linear infinite`,
                      animationDelay: `${colIndex * 0.3 + i * 0.5}s`,
                    }}
                  />
                ))}
              </g>
            ))}
          </svg>
        </Box>
      </Box>
      
      {/* Hero Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        pt={{ base: 20, md: 28, lg: 32 }}
        pb={{ base: 16, md: 24 }}
      >
        {/* Hero section specific background effects */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          overflow="hidden"
          pointerEvents="none"
        >
          {/* Decorative geometric shapes */}
          <Box
            position="absolute"
            top="10%"
            right="15%"
            w="200px"
            h="200px"
            opacity={0.1}
            _dark={{ opacity: 0.05 }}
            style={{
              animation: 'float 15s ease-in-out infinite',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 200 200">
              <defs>
                <linearGradient id="shapeGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.8)" />
                  <stop offset="100%" stopColor="rgba(147, 51, 234, 0.8)" />
                </linearGradient>
              </defs>
              <polygon
                points="100,20 180,60 180,140 100,180 20,140 20,60"
                fill="url(#shapeGradient1)"
                style={{
                  animation: 'rotate 20s linear infinite',
                  transformOrigin: 'center',
                }}
              />
            </svg>
          </Box>
          
          <Box
            position="absolute"
            bottom="15%"
            left="10%"
            w="150px"
            h="150px"
            opacity={0.08}
            _dark={{ opacity: 0.04 }}
            style={{
              animation: 'floatReverse 18s ease-in-out infinite',
              animationDelay: '1s',
            }}
          >
            <svg width="100%" height="100%" viewBox="0 0 150 150">
              <defs>
                <linearGradient id="shapeGradient2" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(236, 72, 153, 0.8)" />
                  <stop offset="100%" stopColor="rgba(59, 130, 246, 0.8)" />
                </linearGradient>
              </defs>
              <circle
                cx="75"
                cy="75"
                r="60"
                fill="none"
                stroke="url(#shapeGradient2)"
                strokeWidth="3"
                strokeDasharray="10,5"
                style={{
                  animation: 'rotate 25s linear infinite reverse',
                  transformOrigin: 'center',
                }}
              />
            </svg>
          </Box>

          {/* Network nodes in hero section - Elegant Style */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.5}
            _dark={{ opacity: 0.4 }}
          >
            <svg
              width="100%"
              height="100%"
              style={{
                position: 'absolute',
                top: 0,
                left: 0,
              }}
            >
              <defs>
                {/* Elegant gradients */}
                <linearGradient id="heroNetworkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor="rgba(59, 130, 246, 0.7)" />
                  <stop offset="50%" stopColor="rgba(147, 51, 234, 0.7)" />
                  <stop offset="100%" stopColor="rgba(236, 72, 153, 0.7)" />
                </linearGradient>
                <filter id="glowHero">
                  <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
                <filter id="strongGlowHero">
                  <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
                  <feMerge>
                    <feMergeNode in="coloredBlur"/>
                    <feMergeNode in="SourceGraphic"/>
                  </feMerge>
                </filter>
              </defs>
              
              {/* Hero section: Elegant radial network */}
              <g>
                {/* Central hub */}
                <circle
                  cx="50%"
                  cy="50%"
                  r="8"
                  fill="url(#heroNetworkGradient)"
                  opacity="0.9"
                  filter="url(#strongGlowHero)"
                  style={{
                    animation: `networkPulse 3s ease-in-out infinite`,
                  }}
                />
                <circle
                  cx="50%"
                  cy="50%"
                  r="14"
                  fill="none"
                  stroke="url(#heroNetworkGradient)"
                  strokeWidth="1.5"
                  opacity="0.6"
                  filter="url(#glowHero)"
                  style={{
                    animation: `networkPulse 3s ease-in-out infinite`,
                  }}
                />
                
                {/* Elegant radial connections with curves */}
                {[
                  { angle: 0, distance: '22%' },
                  { angle: 45, distance: '24%' },
                  { angle: 90, distance: '22%' },
                  { angle: 135, distance: '24%' },
                  { angle: 180, distance: '22%' },
                  { angle: 225, distance: '24%' },
                  { angle: 270, distance: '22%' },
                  { angle: 315, distance: '24%' },
                ].map((conn, i) => {
                  const rad = (conn.angle * Math.PI) / 180;
                  const endX = 50 + Math.cos(rad) * 23;
                  const endY = 50 + Math.sin(rad) * 23;
                  const midX = 50 + Math.cos(rad) * 11.5;
                  const midY = 50 + Math.sin(rad) * 11.5;
                  const curveX = midX + Math.cos(rad + Math.PI / 2) * 3;
                  const curveY = midY + Math.sin(rad + Math.PI / 2) * 3;
                  return (
                    <g key={i}>
                      <path
                        d={`M 50% 50% Q ${curveX}% ${curveY}% ${endX}% ${endY}%`}
                        fill="none"
                        stroke="url(#heroNetworkGradient)"
                        strokeWidth="1.5"
                        opacity="0.5"
                        filter="url(#glowHero)"
                        style={{
                          strokeDasharray: '12,8',
                          animation: `networkFlow ${5 + i * 0.4}s linear infinite`,
                          animationDelay: `${i * 0.2}s`,
                        }}
                      />
                      <circle
                        cx={`${endX}%`}
                        cy={`${endY}%`}
                        r="5"
                        fill="url(#heroNetworkGradient)"
                        opacity="0.85"
                        filter="url(#glowHero)"
                        style={{
                          animation: `networkPulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                      <circle
                        cx={`${endX}%`}
                        cy={`${endY}%`}
                        r="8"
                        fill="none"
                        stroke="url(#heroNetworkGradient)"
                        strokeWidth="0.8"
                        opacity="0.4"
                        style={{
                          animation: `networkPulse ${2.5 + i * 0.3}s ease-in-out infinite`,
                          animationDelay: `${i * 0.15}s`,
                        }}
                      />
                    </g>
                  );
                })}
              </g>
            </svg>
          </Box>
        </Box>

        <Box textAlign="center" position="relative" zIndex={1}>
          <Flex
            display="inline-flex"
            alignItems="center"
            gap={3}
            px={6}
            py={3}
            borderRadius="full"
            mb={8}
            border="1px"
            borderColor="gray.200"
            bg="white"
            shadow="lg"
            position="relative"
            overflow="hidden"
            _dark={{ borderColor: "gray.800", bg: "gray.900" }}
            _hover={{
              shadow: "xl",
              transform: "translateY(-2px)",
              borderColor: "blue.300",
              _dark: { borderColor: "blue.700" },
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
          >
            {/* Animated background gradient */}
            <Box
              position="absolute"
              inset={0}
              bgGradient="to-r"
              gradientFrom="blue.50"
              gradientTo="purple.50"
              opacity={0}
              _dark={{ gradientFrom: "blue.950", gradientTo: "purple.950", opacity: 0 }}
              _hover={{ opacity: 1, _dark: { opacity: 0.3 } }}
              transition="opacity 0.3s"
            />
            <Box
              position="relative"
              display="flex"
              alignItems="center"
              gap={3}
            >
              <Box position="relative">
                <Box
                  w={3}
                  h={3}
                  bg="green.500"
                  borderRadius="full"
                  _dark={{ bg: "green.400" }}
                  style={{ 
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                  shadow="0 0 8px rgba(34, 197, 94, 0.5)"
                />
                <Box
                  position="absolute"
                  inset={0}
                  w={3}
                  h={3}
                  bg="green.500"
                  borderRadius="full"
                  opacity={0.5}
                  style={{ 
                    animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite'
                  }}
                />
              </Box>
              <Text 
                fontSize="sm" 
                fontWeight="bold" 
                color="gray.800" 
                _dark={{ color: "gray.200" }}
                position="relative"
                zIndex={1}
              >
                Events Made Simple
              </Text>
              <Box
                as="span"
                display="inline-block"
                color="blue.500"
                _dark={{ color: "blue.400" }}
                style={{
                  animation: 'rotate 3s linear infinite',
                }}
              >
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  style={{ display: 'block' }}
                >
                  <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
                </svg>
              </Box>
            </Box>
          </Flex>
          
          <Heading
            as="h1"
            fontSize={{ base: "4xl", sm: "5xl", lg: "6xl", xl: "7xl", "2xl": "8xl" }}
            fontWeight="extrabold"
            letterSpacing={{ base: "-0.02em", lg: "-0.03em" }}
            mb={6}
            lineHeight={1.1}
            maxW="6xl"
            mx="auto"
          >
            <Box
              as="span"
              display="block"
              backgroundImage="linear-gradient(to right, var(--chakra-colors-blue-600), var(--chakra-colors-purple-600), var(--chakra-colors-pink-600))"
              backgroundClip="text"
              color="transparent"
              backgroundSize="200% 200%"
              style={{
                animation: 'gradient 8s ease infinite'
              }}
          >
            {t("title")}
            </Box>
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="3xl"
            mx="auto"
            mb={12}
            lineHeight="relaxed"
            fontWeight="medium"
          >
            {t("description")}
          </Text>
          <Flex
            direction={{ base: "column", sm: "row" }}
            gap={4}
            justify="center"
            align="center"
            mb={20}
          >
            <HStack gap={4} justify="center" flexWrap="wrap">
              <Link href={`/${locale}/docs/getting-started`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                <Button
                  size="xl"
                  px={10}
                  py={7}
                  borderRadius="xl"
                  bgGradient="to-r"
                  gradientFrom="blue.600"
                  gradientTo="purple.600"
                  color="white"
                  fontWeight="bold"
                  fontSize="lg"
                  shadow="xl"
                  _hover={{
                    transform: "translateY(-2px)",
                    shadow: "2xl",
                    bgGradient: "to-r",
                    gradientFrom: "blue.700",
                    gradientTo: "purple.700",
                  }}
                  _dark={{ 
                    gradientFrom: "blue.500", 
                    gradientTo: "purple.500",
                    _hover: { 
                      gradientFrom: "blue.600", 
                      gradientTo: "purple.600" 
                    } 
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  w={{ base: "full", sm: "auto" }}
                  minW={{ base: "full", sm: "200px" }}
                >
                  <HStack gap={2}>
                    <Text>{t("getStarted")}</Text>
                    <ArrowRight size={20} />
                  </HStack>
                </Button>
              </Link>
              <Link href={`/${locale}/docs`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                <Button
                  size="xl"
                  px={10}
                  py={7}
                  borderRadius="xl"
                  variant="outline"
                  borderWidth="2px"
                  borderColor="gray.300"
                  color="gray.700"
                  fontWeight="semibold"
                  fontSize="lg"
                  bg="white"
                  _dark={{ borderColor: "gray.700", color: "gray.300", bg: "gray.900" }}
                  _hover={{
                    borderColor: "gray.400",
                    bg: "gray.50",
                    transform: "translateY(-2px)",
                    shadow: "lg",
                    _dark: { borderColor: "gray.600", bg: "gray.800" },
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  w={{ base: "full", sm: "auto" }}
                  minW={{ base: "full", sm: "200px" }}
                >
                  {t("documentation")}
                </Button>
              </Link>
            </HStack>
          </Flex>

          {/* Code Preview Section */}
          <CodePreview />
        </Box>
      </Container>

      {/* Parallax Workbench Showcase */}
      {/* <ParallaxShowcase /> */}

      {/* Visual Separator */}
      <Box
        position="relative"
        w="100%"
        h="1px"
        my={{ base: 8, md: 12 }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="blue.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "blue.600" }}
          opacity={0.5}
        />
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="purple.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "purple.600" }}
          opacity={0.3}
          style={{
            animation: 'gradient 3s ease infinite',
          }}
        />
      </Box>

      {/* Stats Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        py={{ base: 12, md: 20 }}
      >
        {/* Decorative background elements */}
        <Box
          position="absolute"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          w="600px"
          h="600px"
          bgGradient="radial"
          gradientFrom="blue.500"
          gradientTo="transparent"
          opacity={0.03}
          _dark={{ opacity: 0.02 }}
          borderRadius="full"
          filter="blur(100px)"
          pointerEvents="none"
        />
        
        <SimpleGrid columns={{ base: 2, md: 4 }} gap={{ base: 4, md: 6 }}>
          {[
            { value: "2+", label: "Runtimes", icon: Code, color: "blue" },
            { value: "5+", label: "Adapters", icon: Database, color: "purple" },
            { value: "100%", label: "Type Safe", icon: Shield, color: "green" },
            { value: "∞", label: "Scalable", icon: Rocket, color: "orange" },
          ].map((stat, index) => {
            const IconComponent = stat.icon;
            return (
            <Box
              key={index}
              textAlign="center"
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              border="1px"
              borderColor="gray.200"
              bg="white"
              shadow="sm"
              position="relative"
              overflow="hidden"
              _dark={{ borderColor: "gray.800", bg: "gray.900" }}
              _hover={{
                borderColor: `${stat.color}.300`,
                shadow: "xl",
                transform: "translateY(-6px) scale(1.02)",
                _dark: { borderColor: `${stat.color}.700` },
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            >
              {/* Animated background gradient on hover */}
              <Box
                position="absolute"
                top={0}
                right={0}
                w="200px"
                h="200px"
                bgGradient="radial"
                gradientFrom={`${stat.color}.200`}
                gradientTo="transparent"
                _dark={{ gradientFrom: `${stat.color}.900` }}
                opacity={0}
                borderRadius="full"
                filter="blur(60px)"
                transform="translate(30%, -30%)"
                _hover={{ opacity: 0.3, _dark: { opacity: 0.2 } }}
                transition="opacity 0.3s"
              />
              
              <Box
                position="relative"
                zIndex={1}
              >
                <Box
                  display="inline-flex"
                  p={4}
                  borderRadius="xl"
                  bgGradient="to-br"
                  gradientFrom={`${stat.color}.500`}
                  gradientTo={`${stat.color}.600`}
                  _dark={{ 
                    gradientFrom: `${stat.color}.600`, 
                    gradientTo: `${stat.color}.700` 
                  }}
                  mb={4}
                  shadow="lg"
                  _hover={{
                    transform: "scale(1.1) rotate(5deg)",
                    shadow: "xl",
                  }}
                  transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                >
                  <IconComponent size={28} color="white" />
                </Box>
              <Text
                  fontSize={{ base: "3xl", sm: "4xl", md: "5xl" }}
                  fontWeight="extrabold"
                  bgGradient="to-r"
                  gradientFrom={`${stat.color}.600`}
                  gradientTo={`${stat.color}.400`}
                  bgClip="text"
                  color="transparent"
                mb={2}
              >
                {stat.value}
              </Text>
              <Text
                fontSize={{ base: "sm", md: "md" }}
                color="gray.600"
                _dark={{ color: "gray.400" }}
                fontWeight="semibold"
              >
                {stat.label}
              </Text>
              </Box>
            </Box>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* Visual Separator */}
      <Box
        position="relative"
        w="100%"
        h="1px"
        my={{ base: 8, md: 12 }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="purple.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "purple.600" }}
          opacity={0.5}
        />
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="pink.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "pink.600" }}
          opacity={0.3}
          style={{
            animation: 'gradient 3s ease infinite',
          }}
        />
      </Box>

      {/* Features Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        py={{ base: 16, md: 24 }}
      >
        {/* Decorative background elements */}
        <Box
          position="absolute"
          top="20%"
          right="5%"
          w="300px"
          h="300px"
          opacity={0.05}
          _dark={{ opacity: 0.03 }}
          pointerEvents="none"
          style={{
            animation: 'float 20s ease-in-out infinite',
          }}
        >
          <svg width="100%" height="100%" viewBox="0 0 300 300">
            <defs>
              <linearGradient id="featureGradient1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="rgba(147, 51, 234, 0.6)" />
                <stop offset="100%" stopColor="rgba(236, 72, 153, 0.6)" />
              </linearGradient>
            </defs>
            <path
              d="M150,50 L250,150 L150,250 L50,150 Z"
              fill="url(#featureGradient1)"
              style={{
                animation: 'rotate 30s linear infinite',
                transformOrigin: 'center',
              }}
            />
          </svg>
        </Box>
        
        <Box textAlign="center" mb={{ base: 12, md: 20 }} position="relative" zIndex={1}>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight="extrabold"
            color="gray.900"
            _dark={{ color: "gray.50" }}
            mb={4}
            letterSpacing="tight"
          >
            {t("features")}
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="3xl"
            mx="auto"
            fontWeight="medium"
          >
            Everything you need to build modern event-driven applications
          </Text>
        </Box>
        <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} gap={{ base: 6, md: 8 }}>
          {[
            {
              title: tf("schemaDriven.title"),
              description: tf("schemaDriven.description"),
              icon: Code,
              color: "blue",
            },
            {
              title: tf("multiRuntime.title"),
              description: tf("multiRuntime.description"),
              icon: Zap,
              color: "purple",
            },
            {
              title: tf("adapters.title"),
              description: tf("adapters.description"),
              icon: Database,
              color: "pink",
            },
            {
              title: tf("hotReload.title"),
              description: tf("hotReload.description"),
              icon: Sparkles,
              color: "green",
            },
            {
              title: tf("codegen.title"),
              description: tf("codegen.description"),
              icon: Rocket,
              color: "orange",
            },
            {
              title: tf("telemetry.title"),
              description: tf("telemetry.description"),
              icon: Shield,
              color: "cyan",
            },
          ].map((feature, index) => {
            const IconComponent = feature.icon;
            return (
            <Box
              key={index}
              p={{ base: 6, md: 8 }}
              borderRadius="xl"
              border="1px"
              borderColor="gray.200"
              bg="white"
              shadow="sm"
              _dark={{ borderColor: "gray.800", bg: "gray.900" }}
              _hover={{
                borderColor: `${feature.color}.300`,
                shadow: "2xl",
                transform: "translateY(-6px) scale(1.02)",
                _dark: { borderColor: `${feature.color}.700` },
              }}
              transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              position="relative"
              overflow="hidden"
            >
              {/* Animated background gradient */}
              <Box
                position="absolute"
                top={0}
                right={0}
                w="250px"
                h="250px"
                bgGradient="radial"
                gradientFrom={`${feature.color}.200`}
                gradientTo="transparent"
                _dark={{ 
                  gradientFrom: `${feature.color}.900`,
                  gradientTo: "transparent"
                }}
                opacity={0}
                borderRadius="full"
                filter="blur(80px)"
                transform="translate(30%, -30%)"
                _hover={{ 
                  opacity: 0.4,
                  _dark: { opacity: 0.3 }
                }}
                transition="opacity 0.3s"
              />
              
              {/* Subtle border glow on hover */}
              <Box
                position="absolute"
                inset={0}
                borderRadius="xl"
                border="2px"
                borderColor={`${feature.color}.300`}
                opacity={0}
                _dark={{ borderColor: `${feature.color}.700` }}
                _hover={{ opacity: 0.3 }}
                transition="opacity 0.3s"
                pointerEvents="none"
              />
                <Box
                  position="relative"
                  zIndex={1}
                >
                  <Box
                    w={14}
                    h={14}
                    borderRadius="xl"
                    bgGradient="to-br"
                    gradientFrom={`${feature.color}.500`}
                    gradientTo={`${feature.color}.600`}
                display="flex"
                alignItems="center"
                justifyContent="center"
                    mb={5}
                    shadow="lg"
              >
                    <IconComponent size={28} color="white" />
              </Box>
              <Heading
                as="h3"
                    fontSize={{ base: "lg", md: "xl" }}
                    fontWeight="bold"
                color="gray.900"
                _dark={{ color: "gray.50" }}
                mb={3}
              >
                {feature.title}
              </Heading>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                lineHeight="relaxed"
                    fontSize={{ base: "sm", md: "md" }}
              >
                {feature.description}
              </Text>
            </Box>
              </Box>
            );
          })}
        </SimpleGrid>
      </Container>

      {/* Visual Separator */}
      <Box
        position="relative"
        w="100%"
        h="1px"
        my={{ base: 8, md: 12 }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="blue.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "blue.600" }}
          opacity={0.5}
        />
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="cyan.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "cyan.600" }}
          opacity={0.3}
          style={{
            animation: 'gradient 3s ease infinite',
          }}
        />
      </Box>

      {/* Quick Start Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        py={{ base: 16, md: 24 }}
      >
        <Box
          borderRadius="2xl"
          p={{ base: 8, sm: 10, lg: 12, xl: 16 }}
          border="1px"
          borderColor="gray.200"
          bg="white"
          _dark={{ borderColor: "gray.800", bg: "gray.900" }}
          shadow="xl"
          position="relative"
          overflow="hidden"
        >
          {/* Enhanced background gradients */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="500px"
            h="500px"
            bgGradient="radial"
            gradientFrom="blue.500"
            gradientTo="transparent"
            opacity={0.08}
            borderRadius="full"
            filter="blur(100px)"
            transform="translate(30%, -30%)"
            _dark={{ opacity: 0.05 }}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w="400px"
            h="400px"
            bgGradient="radial"
            gradientFrom="purple.500"
            gradientTo="transparent"
            opacity={0.06}
            borderRadius="full"
            filter="blur(90px)"
            transform="translate(-30%, 30%)"
            _dark={{ opacity: 0.04 }}
          />
          
          {/* Decorative grid pattern */}
          <Box
            position="absolute"
            inset={0}
            opacity={0.03}
            _dark={{ opacity: 0.02 }}
            pointerEvents="none"
          >
            <svg width="100%" height="100%" style={{ position: 'absolute' }}>
              <defs>
                <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                  <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1" />
                </pattern>
              </defs>
              <rect width="100%" height="100%" fill="url(#grid)" />
            </svg>
          </Box>
          <Box position="relative" zIndex={1}>
            <Heading
              as="h2"
              fontSize={{ base: "3xl", sm: "4xl", lg: "5xl", xl: "6xl" }}
              fontWeight="extrabold"
              color="gray.900"
              _dark={{ color: "gray.50" }}
              mb={4}
              letterSpacing="tight"
            >
              {t("quickStart")}
            </Heading>
            <Text
              fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
              color="gray.600"
              _dark={{ color: "gray.400" }}
              mb={12}
              fontWeight="medium"
            >
              Get started with Rohas in minutes
            </Text>
            <VStack align="stretch" gap={8}>
              {[
                {
                  step: "1",
                  title: "Install Rohas",
                  code: "curl -fsSL https://raw.githubusercontent.com/rohas-dev/rohas/main/scripts/build.sh | bash",
                  color: "blue",
                },
                {
                  step: "2",
                  title: "Initialize a Project",
                  code: "rohas init my-app --lang typescript",
                  color: "purple",
                },
                {
                  step: "3",
                  title: "Start Development",
                  code: "rohas dev --workbench",
                  color: "pink",
                },
              ].map((item, index) => (
                <Box 
                  key={index}
                  _hover={{
                    transform: "translateX(4px)",
                  }}
                  transition="all 0.2s"
                >
                  <HStack gap={4} mb={4}>
                    <Box
                      w={12}
                      h={12}
                      borderRadius="xl"
                      bgGradient="to-br"
                      gradientFrom={`${item.color}.600`}
                      gradientTo={`${item.color}.500`}
                      _dark={{ 
                        gradientFrom: `${item.color}.500`, 
                        gradientTo: `${item.color}.400` 
                      }}
                      display="flex"
                      alignItems="center"
                      justifyContent="center"
                      color="white"
                      fontWeight="bold"
                      fontSize="lg"
                      shadow="lg"
                    >
                      {item.step}
                    </Box>
                    <Heading
                      as="h3"
                      fontSize={{ base: "lg", md: "xl" }}
                      fontWeight="bold"
                      color="gray.900"
                      _dark={{ color: "gray.50" }}
                    >
                      {item.title}
                    </Heading>
                  </HStack>
                  <Box
                    as="pre"
                    bg="gray.950"
                    _dark={{ bg: "gray.950" }}
                    color="gray.50"
                    p={5}
                    borderRadius="xl"
                    overflowX="auto"
                    border="1px"
                    borderColor="gray.800"
                    shadow="inner"
                    position="relative"
                    _hover={{
                      borderColor: `${item.color}.500`,
                      shadow: `0 0 20px rgba(var(--chakra-colors-${item.color}-500-rgb), 0.2)`,
                      transform: "translateX(4px)",
                    }}
                    transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
                  >
                    {/* Subtle gradient overlay on hover */}
                    <Box
                      position="absolute"
                      top={0}
                      left={0}
                      right={0}
                      bottom={0}
                      bgGradient="to-r"
                      gradientFrom={`${item.color}.500`}
                      gradientTo="transparent"
                      opacity={0}
                      borderRadius="xl"
                      _hover={{ opacity: 0.05 }}
                      transition="opacity 0.3s"
                      pointerEvents="none"
                    />
                    <Box 
                      as="code" 
                      fontFamily="mono" 
                      fontSize={{ base: "sm", md: "md" }} 
                      color="gray.100"
                      position="relative"
                      zIndex={1}
                    >
                      {item.code}
                    </Box>
                  </Box>
                </Box>
              ))}
            </VStack>
            <Box mt={16}>
              <Link href={`/${locale}/docs/getting-started`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                <ChakraLink
                  as="span"
                  display="inline-flex"
                  alignItems="center"
                  gap={3}
                  color="blue.600"
                  fontWeight="bold"
                  fontSize="lg"
                  px={6}
                  py={3}
                  borderRadius="lg"
                  bg="blue.50"
                  _dark={{ color: "blue.400", bg: "blue.950" }}
                  _hover={{
                    gap: 4,
                    bg: "blue.100",
                    _dark: { bg: "blue.900" },
                    transform: "translateX(4px)",
                  }}
                  transition="all 0.3s"
                >
                  Read the full guide
                  <ArrowRight size={20} />
                </ChakraLink>
              </Link>
            </Box>
        </Box>
      </Box>
      </Container>

      {/* Visual Separator */}
      <Box
        position="relative"
        w="100%"
        h="1px"
        my={{ base: 8, md: 12 }}
        overflow="hidden"
      >
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="purple.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "purple.600" }}
          opacity={0.5}
        />
        <Box
          position="absolute"
          left="0"
          right="0"
          top="0"
          bottom="0"
          bgGradient="to-r"
          gradientFrom="transparent"
          gradientVia="pink.300"
          gradientTo="transparent"
          _dark={{ gradientVia: "pink.600" }}
          opacity={0.3}
          style={{
            animation: 'gradient 3s ease infinite',
          }}
        />
      </Box>

      {/* Community Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        py={{ base: 16, md: 24 }}
        overflow="hidden"
      >
        {/* Animated background elements */}
        <Box
          position="absolute"
          inset={0}
          zIndex={0}
          overflow="hidden"
          pointerEvents="none"
        >
          {/* Floating gradient orbs */}
          <Box
            position="absolute"
            top="10%"
            left="5%"
            w="300px"
            h="300px"
            backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-purple-500), var(--chakra-colors-pink-500))"
            opacity={0.1}
            borderRadius="full"
            filter="blur(80px)"
            _dark={{ opacity: 0.08 }}
            style={{ 
              animation: 'float 18s ease-in-out infinite',
              willChange: 'transform'
            }}
          />
          <Box
            position="absolute"
            bottom="10%"
            right="5%"
            w="350px"
            h="350px"
            backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-blue-500), var(--chakra-colors-purple-500))"
            opacity={0.1}
            borderRadius="full"
            filter="blur(80px)"
            _dark={{ opacity: 0.08 }}
            style={{ 
              animation: 'floatReverse 22s ease-in-out infinite',
              animationDelay: '1s',
              willChange: 'transform'
            }}
          />
          <Box
            position="absolute"
            top="50%"
            left="50%"
            w="250px"
            h="250px"
            backgroundImage="linear-gradient(to bottom right, var(--chakra-colors-cyan-500), var(--chakra-colors-blue-500))"
            opacity={0.08}
            borderRadius="full"
            filter="blur(70px)"
            _dark={{ opacity: 0.06 }}
            style={{ 
              animation: 'pulse 12s ease-in-out infinite',
              transform: 'translate(-50%, -50%)',
              willChange: 'opacity, transform'
            }}
          />
          {/* Floating particles */}
          {[...Array(6)].map((_, i) => (
            <Box
              key={i}
              position="absolute"
              w="4px"
              h="4px"
              bg="purple.400"
              borderRadius="full"
              opacity={0.4}
              _dark={{ opacity: 0.3 }}
              style={{
                left: `${15 + i * 15}%`,
                top: `${20 + (i % 3) * 30}%`,
                animation: `float ${15 + i * 2}s ease-in-out infinite`,
                animationDelay: `${i * 0.5}s`,
              }}
            />
          ))}
        </Box>

        <Box 
          textAlign="center" 
          position="relative" 
          zIndex={1}
          borderRadius="2xl"
          p={{ base: 8, md: 12, lg: 16 }}
          border="1px"
          borderColor="rgba(255, 255, 255, 0.2)"
          bg="rgba(255, 255, 255, 0.05)"
          _dark={{ 
            borderColor: "rgba(255, 255, 255, 0.1)",
            bg: "rgba(0, 0, 0, 0.2)"
          }}
          backdropFilter="blur(20px) saturate(180%)"
          style={{
            WebkitBackdropFilter: "blur(20px) saturate(180%)",
            boxShadow: "0 8px 32px 0 rgba(31, 38, 135, 0.37)",
          }}
        >
          <Box
            display="inline-flex"
            p={4}
            borderRadius="xl"
            bgGradient="to-br"
            gradientFrom="purple.500"
            gradientTo="pink.500"
            mb={6}
            shadow="xl"
            position="relative"
            _hover={{
              transform: "scale(1.05) rotate(5deg)",
            }}
            transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
            style={{
              animation: 'pulseScale 3s ease-in-out infinite',
            }}
          >
            <Users size={32} color="white" />
          </Box>
          <Heading
            as="h2"
            fontSize={{ base: "3xl", sm: "4xl", lg: "5xl", xl: "6xl" }}
            fontWeight="extrabold"
            color="gray.900"
            _dark={{ color: "gray.50" }}
            mb={4}
            letterSpacing="tight"
            position="relative"
          >
            <Box
              as="span"
              backgroundImage="linear-gradient(to right, var(--chakra-colors-purple-600), var(--chakra-colors-pink-600), var(--chakra-colors-blue-600))"
              backgroundClip="text"
              color="transparent"
              backgroundSize="200% 200%"
              style={{
                animation: 'gradient 8s ease infinite'
              }}
            >
              Nothing good is built alone
            </Box>
          </Heading>
          <Text
            fontSize={{ base: "lg", sm: "xl", md: "2xl" }}
            color="gray.600"
            _dark={{ color: "gray.400" }}
            maxW="2xl"
            mx="auto"
            fontWeight="medium"
          >
            Join our welcoming and fast growing community.
          </Text>
      </Box>
      </Container>

      {/* Roadmap CTA Section */}
      <Container
        as="section"
        position="relative"
        maxW="90rem"
        px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
        py={{ base: 16, md: 24 }}
      >
        <Box
          borderRadius="2xl"
          p={{ base: 8, md: 12, lg: 16 }}
          border="2px"
          borderColor="blue.200"
          bgGradient="to-br"
          gradientFrom="blue.50"
          gradientTo="purple.50"
          _dark={{ 
            borderColor: "blue.800",
            gradientFrom: "blue.950",
            gradientTo: "purple.950"
          }}
          shadow="2xl"
          position="relative"
          overflow="hidden"
        >
          {/* Animated background elements */}
          <Box
            position="absolute"
            top={0}
            right={0}
            w="400px"
            h="400px"
            bgGradient="radial"
            gradientFrom="blue.400"
            gradientTo="transparent"
            opacity={0.1}
            borderRadius="full"
            filter="blur(80px)"
            transform="translate(30%, -30%)"
            _dark={{ opacity: 0.05 }}
          />
          <Box
            position="absolute"
            bottom={0}
            left={0}
            w="350px"
            h="350px"
            bgGradient="radial"
            gradientFrom="purple.400"
            gradientTo="transparent"
            opacity={0.1}
            borderRadius="full"
            filter="blur(70px)"
            transform="translate(-30%, 30%)"
            _dark={{ opacity: 0.05 }}
          />
          
          <Box position="relative" zIndex={1} textAlign="center">
            <Box
              display="inline-flex"
              p={3}
              borderRadius="xl"
              bgGradient="to-br"
              gradientFrom="blue.500"
              gradientTo="purple.500"
              mb={6}
              shadow="lg"
              _hover={{
                transform: "scale(1.1) rotate(5deg)",
              }}
              transition="all 0.3s"
            >
              <Rocket size={24} color="white" />
            </Box>
            <Heading
              as="h2"
              fontSize={{ base: "2xl", sm: "3xl", lg: "4xl" }}
              fontWeight="extrabold"
              color="gray.900"
              _dark={{ color: "gray.50" }}
              mb={4}
            >
              <Box
                as="span"
                backgroundImage="linear-gradient(to right, var(--chakra-colors-blue-600), var(--chakra-colors-purple-600))"
                backgroundClip="text"
                color="transparent"
              >
                What&apos;s Next?
              </Box>
            </Heading>
            <Text
              fontSize={{ base: "lg", md: "xl" }}
              color="gray.700"
              _dark={{ color: "gray.300" }}
              maxW="2xl"
              mx="auto"
              mb={8}
              fontWeight="medium"
            >
              Check out our roadmap to see what we&apos;re building and what&apos;s coming next. 
              We&apos;re constantly improving Rohas based on community feedback.
            </Text>
            <Link href={`/${locale}/docs/roadmap`} style={{ textDecoration: 'none', display: 'inline-block' }}>
              <Button
                size="lg"
                px={8}
                py={6}
                borderRadius="xl"
                bgGradient="to-r"
                gradientFrom="blue.600"
                gradientTo="purple.600"
                color="white"
                fontWeight="bold"
                fontSize="lg"
                shadow="xl"
                _hover={{
                  transform: "translateY(-2px)",
                  shadow: "2xl",
                  bgGradient: "to-r",
                  gradientFrom: "blue.700",
                  gradientTo: "purple.700",
                }}
                _dark={{ 
                  gradientFrom: "blue.500", 
                  gradientTo: "purple.500",
                  _hover: { 
                    gradientFrom: "blue.600", 
                    gradientTo: "purple.600" 
                  } 
                }}
                transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
              >
                <HStack gap={2}>
                  <Text>View Roadmap</Text>
                  <ArrowRight size={20} />
                </HStack>
              </Button>
            </Link>
          </Box>
        </Box>
      </Container>

      {/* Footer */}
      <Box
        as="footer"
        position="relative"
        mt={{ base: 20, md: 32 }}
        borderTop="1px"
        borderColor="gray.200"
        bg="white"
        _dark={{ borderColor: "gray.800", bg: "gray.950" }}
      >
        <Container
          position="relative"
          maxW="90rem"
          px={{ base: 4, sm: 6, lg: 8, xl: 12 }}
          py={{ base: 8, md: 12 }}
        >
          <Flex
            direction={{ base: "column", md: "row" }}
            justify="space-between"
            align={{ base: "flex-start", md: "center" }}
            gap={6}
          >
            <HStack gap={3}>
              <Box
                w={8}
                h={8}
                borderRadius="xl"
                bgGradient="to-br"
                gradientFrom="blue.500"
                gradientTo="purple.600"
                shadow="lg"
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <Text color="white" fontWeight="bold" fontSize="sm">R</Text>
              </Box>
              <Text
                color="gray.600"
                _dark={{ color: "gray.400" }}
                fontSize="sm"
                fontWeight="medium"
              >
                {t("footer.copyright", { year: new Date().getFullYear() })}
              </Text>
            </HStack>
            <HStack gap={2} flexWrap="wrap">
              <ChakraLink
                href="https://github.com/rohas-dev/rohas"
                target="_blank"
                rel="noopener noreferrer"
                color="gray.600"
                fontSize="sm"
                fontWeight="semibold"
                transition="all 0.2s"
                display="flex"
                alignItems="center"
                gap={2}
                px={4}
                py={2.5}
                borderRadius="lg"
                _dark={{ color: "gray.400" }}
                _hover={{
                  color: "gray.900",
                  bg: "gray.100",
                  transform: "translateY(-1px)",
                  _dark: { color: "gray.50", bg: "gray.800" },
                }}
                aria-label="GitHub Repository"
              >
                <Github size={18} />
                {t("footer.github")}
              </ChakraLink>
              <Link href={`/${locale}/docs`} style={{ textDecoration: 'none', display: 'inline-block' }}>
                <ChakraLink
                  as="span"
                  color="gray.600"
                  fontSize="sm"
                  fontWeight="semibold"
                  transition="all 0.2s"
                  px={4}
                  py={2.5}
                  borderRadius="lg"
                  _dark={{ color: "gray.400" }}
                  _hover={{
                    color: "gray.900",
                    bg: "gray.100",
                    transform: "translateY(-1px)",
                    _dark: { color: "gray.50", bg: "gray.800" },
                  }}
                >
                  {t("footer.docs")}
                </ChakraLink>
              </Link>
            </HStack>
          </Flex>
        </Container>
      </Box>
    </Box>
  );
}
