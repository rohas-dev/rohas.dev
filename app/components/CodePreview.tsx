"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

export default function CodePreview() {
  const code = `api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated]
}`;

  return (
    <Box maxW="5xl" mx="auto" mt={{ base: 12, md: 20 }}>
      <Box
        position="relative"
        borderRadius="2xl"
        overflow="hidden"
        border="1px"
        borderColor="gray.200"
        _dark={{ borderColor: "gray.800" }}
        shadow="xl"
        _hover={{
          shadow: "2xl",
          transform: "translateY(-4px)",
          borderColor: "blue.300",
          _dark: { borderColor: "blue.700" },
        }}
        transition="all 0.3s cubic-bezier(0.4, 0, 0.2, 1)"
      >
        <Flex
          align="center"
          gap={3}
          px={5}
          py={4}
          bg="gray.900"
          borderBottom="1px"
          borderColor="gray.800"
          _dark={{ bg: "gray.950", borderColor: "gray.700" }}
        >
          <HStack gap={2}>
            <Box
              w="14px"
              h="14px"
              borderRadius="full"
              bg="red.500"
              shadow="lg"
            />
            <Box
              w="14px"
              h="14px"
              borderRadius="full"
              bg="yellow.500"
              shadow="lg"
            />
            <Box
              w="14px"
              h="14px"
              borderRadius="full"
              bg="green.500"
              shadow="lg"
            />
          </HStack>
          <Text
            fontSize="sm"
            color="gray.400"
            _dark={{ color: "gray.500" }}
            ml={3}
            fontFamily="mono"
          >
            schema/api/user.ro
          </Text>
        </Flex>
        <Box bg="gray.950">
          <SyntaxHighlighter
            language="javascript"
            style={oneDark as Record<string, React.CSSProperties>}
            customStyle={{
              margin: 0,
              padding: "1.75rem",
              background: "#0a0a0a",
              fontSize: "0.9375rem",
              lineHeight: "1.875rem",
              fontFamily: 'var(--font-mono), "Noto Sans Mono", monospace',
            }}
            PreTag="div"
            codeTagProps={{
              style: {
                color: "#e4e4e7",
              }
            }}
          >
            {code}
          </SyntaxHighlighter>
        </Box>
      </Box>
    </Box>
  );
}
