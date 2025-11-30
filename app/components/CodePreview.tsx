"use client";

import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import React, { useState, useEffect } from "react";
import {
  Box,
  Flex,
  HStack,
  Text,
} from "@chakra-ui/react";

const codeExamples = [
  {
    file: "schema/models/user.ro",
    code: `// Models - Define your data structures
model User {
  id        Int      @id @auto
  name      String
  email     String   @unique
  age       Int?
  balance   Float    @default(0.0)
  active    Boolean  @default(true)
  metadata  Json?
  posts     Post[]
  createdAt DateTime @default(now)
}`,
  },
  {
    file: "schema/api/user_api.ro",
    code: `// Inputs - Data Transfer Objects for APIs
input CreateUserInput {
  name: String
  email: String
  age: Int?
}

// APIs - HTTP endpoints
api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated]
}

api GetUser {
  method: GET
  path: "/users/:id"
  response: User
}`,
  },
  {
    file: "schema/events/user_events.ro",
    code: `// Events - Async event handling
event UserCreated {
  payload: User
  handler: [send_welcome_email, update_analytics]
}

event OrderPlaced {
  payload: Order
  handler: [process_payment, send_notification]
  triggers: [OrderProcessed]
}`,
  },
  {
    file: "schema/cron/cleanup.ro",
    code: `// Cron - Scheduled jobs
cron DailyCleanup {
  schedule: "0 0 * * *"
  triggers: [CleanupCompleted]
}

cron HourlyBackup {
  schedule: "0 * * * *"
  triggers: [BackupCompleted]
}`,
  },
  {
    file: "schema/websockets/chat.ro",
    code: `// WebSockets - Real-time communication
ws ChatRoom {
  path: "/ws/chat"
  message: ChatMessage
  onConnect: [on_connect_handler]
  onMessage: [on_message_handler]
  onDisconnect: [on_disconnect_handler]
  triggers: [MessageReceived]
}`,
  },
];

export default function CodePreview() {
  const [currentExampleIndex, setCurrentExampleIndex] = useState(0);
  const [displayedCode, setDisplayedCode] = useState("");
  const [isTyping, setIsTyping] = useState(true);

  useEffect(() => {
    const currentExample = codeExamples[currentExampleIndex];
    let currentIndex = 0;
    let timeoutId: NodeJS.Timeout;

    const typeNextChar = () => {
      if (currentIndex < currentExample.code.length) {
        setDisplayedCode(currentExample.code.slice(0, currentIndex + 1));
        currentIndex++;
        timeoutId = setTimeout(typeNextChar, 30); // Typing speed
      } else {
        setIsTyping(false);
        // Wait before switching to next example
        timeoutId = setTimeout(() => {
          setCurrentExampleIndex((prev) => (prev + 1) % codeExamples.length);
          setDisplayedCode("");
          setIsTyping(true);
        }, 3000); // Display time before switching
      }
    };

    typeNextChar();

    return () => {
      if (timeoutId) clearTimeout(timeoutId);
    };
  }, [currentExampleIndex]);

  const currentExample = codeExamples[currentExampleIndex];

  return (
    <>
      <Box
        as="style"
        dangerouslySetInnerHTML={{
          __html: `
            @keyframes blink {
              0%, 50% { opacity: 1; }
              51%, 100% { opacity: 0; }
            }
            .code-preview pre code span:last-child {
              animation: blink 1s infinite;
              color: #60a5fa !important;
            }
          `,
        }}
      />
      <Box maxW="5xl" mx="auto" mt={{ base: 12, md: 20 }} className="code-preview">
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
          px={{ base: 3, md: 5 }}
          py={{ base: 3, md: 4 }}
          bg="gray.900"
          borderBottom="1px"
          borderColor="gray.800"
          _dark={{ bg: "gray.950", borderColor: "gray.700" }}
        >
          <HStack gap={2}>
            <Box
              w={{ base: "10px", md: "14px" }}
              h={{ base: "10px", md: "14px" }}
              borderRadius="full"
              bg="red.500"
              shadow="lg"
            />
            <Box
              w={{ base: "10px", md: "14px" }}
              h={{ base: "10px", md: "14px" }}
              borderRadius="full"
              bg="yellow.500"
              shadow="lg"
            />
            <Box
              w={{ base: "10px", md: "14px" }}
              h={{ base: "10px", md: "14px" }}
              borderRadius="full"
              bg="green.500"
              shadow="lg"
            />
          </HStack>
          <Text
            fontSize={{ base: "xs", md: "sm" }}
            color="gray.400"
            _dark={{ color: "gray.500" }}
            ml={{ base: 2, md: 3 }}
            fontFamily="mono"
            display={{ base: "none", sm: "block" }}
          >
            {currentExample.file}
          </Text>
        </Flex>
        <Box bg="gray.950" overflowX="auto" position="relative">
          <Box position="relative">
            <SyntaxHighlighter
              language="javascript"
              style={oneDark as Record<string, React.CSSProperties>}
              customStyle={{
                margin: 0,
                padding: "1rem",
                background: "#0a0a0a",
                fontSize: "clamp(0.75rem, 2vw, 0.9375rem)",
                lineHeight: "1.5rem",
                fontFamily: 'var(--font-mono), "Noto Sans Mono", monospace',
              }}
              PreTag="div"
              codeTagProps={{
                style: {
                  color: "#e4e4e7",
                }
              }}
              wrapLines
              wrapLongLines
            >
              {displayedCode + (isTyping ? "▊" : "")}
            </SyntaxHighlighter>
          </Box>
        </Box>
      </Box>
      </Box>
    </>
  );
}
