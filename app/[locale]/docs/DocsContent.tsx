"use client";

import { useState, useEffect } from "react";
import MDXContent from "../../components/MDXContent";
import TableOfContents from "../../components/TableOfContents";
import { Box, Flex } from "@chakra-ui/react";

interface DocsContentProps {
  compiledSource: string;
}

export default function DocsContent({ compiledSource }: DocsContentProps) {
  const [headings, setHeadings] = useState<Array<{ id: string; text: string; level: number }>>([]);

  useEffect(() => {
    // Extract headings from the page after it renders
    const headingElements = document.querySelectorAll('h1, h2, h3');
    const extractedHeadings = Array.from(headingElements).map((el) => {
      const id = el.id || el.textContent?.toLowerCase().replace(/\s+/g, '-').replace(/[^\w-]/g, '') || '';
      const level = parseInt(el.tagName.charAt(1));
      return {
        id,
        text: el.textContent || '',
        level,
      };
    });
    setHeadings(extractedHeadings);
  }, [compiledSource]);

  return (
    <Flex gap={{ base: 6, lg: 12 }}>
      <Box flex={1} minW={0} maxW="3xl">
        <MDXContent compiledSource={compiledSource} />
      </Box>
      <TableOfContents headings={headings} />
    </Flex>
  );
}
