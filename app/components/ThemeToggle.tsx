"use client";

import { IconButton } from "@chakra-ui/react";
import { useTheme } from "next-themes";
import { Moon, Sun } from "lucide-react";
import { useEffect, useState } from "react";

export default function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return (
      <IconButton
        aria-label="Toggle theme"
        size="sm"
        borderRadius="lg"
      />
    );
  }

  const isDark = theme === "dark";

  return (
    <IconButton
      aria-label="Toggle theme"
      onClick={() => setTheme(isDark ? "light" : "dark")}
      size="sm"
      bg="gray.100"
      _dark={{ bg: "gray.800" }}
      color="gray.600"
      _dark={{ color: "gray.400" }}
      _hover={{
        bg: "gray.200",
        _dark: { bg: "gray.700" },
      }}
      borderRadius="lg"
      transition="colors 0.2s"
    >
      {isDark ? <Sun size={16} /> : <Moon size={16} />}
    </IconButton>
  );
}
