"use client";

import { ChakraProvider as BaseChakraProvider, createSystem, defaultConfig } from "@chakra-ui/react";

// Create system with Noto fonts
const system = createSystem(defaultConfig, {
  theme: {
    tokens: {
      fonts: {
        body: { value: 'var(--font-sans), "Noto Sans", sans-serif' },
        heading: { value: 'var(--font-sans), "Noto Sans", sans-serif' },
        mono: { value: 'var(--font-mono), "Noto Sans Mono", monospace' },
      },
    },
  },
});

export function ChakraProvider({ children }: { children: React.ReactNode }) {
  return <BaseChakraProvider value={system}>{children}</BaseChakraProvider>;
}
