"use client";

import { useMemo } from 'react';
import { useMDXComponents } from '../../mdx-components';
import * as runtime from 'react/jsx-runtime';
import React from 'react';
import { Box, Text } from "@chakra-ui/react";

interface MDXContentProps {
  compiledSource: string;
}

function ErrorComponent({ error }: { error: string }) {
  return (
    <Box 
      p={4} 
      bg="red.50" 
      border="1px" 
      borderColor="red.200" 
      _dark={{ bg: "red.900", borderColor: "red.800" }}
      borderRadius="lg"
    >
      <Text color="red.800" _dark={{ color: "red.200" }}>Error loading content: {error}</Text>
    </Box>
  );
}
ErrorComponent.displayName = 'ErrorComponent';

export default function MDXContent({ compiledSource }: MDXContentProps) {
  const components = useMDXComponents();
  
  const Content = useMemo(() => {
    try {
      // The compiled source expects arguments[0] to be the runtime
      // and defines MDXContent as a function
      const createComponent = new Function(
        'runtime',
        'components',
        `
        ${compiledSource}
        return MDXContent;
      `
      );
      
      // Pass runtime as first argument (arguments[0])
      const Component = createComponent(runtime, components);
      
      // Ensure we return a valid React component
      if (typeof Component === 'function') {
        return Component;
      }
      
      // If Component is an object with a default export, use that
      if (Component && typeof Component === 'object' && 'default' in Component) {
        return Component.default;
      }
      
      console.error('MDX evaluation did not return a valid component:', Component);
      const InvalidComponent = () => <ErrorComponent error="Invalid MDX content" />;
      InvalidComponent.displayName = 'InvalidMDXComponent';
      return InvalidComponent;
    } catch (error) {
      console.error('Error evaluating MDX:', error);
      const ErrorComponentWrapper = () => (
        <ErrorComponent error={error instanceof Error ? error.message : String(error)} />
      );
      ErrorComponentWrapper.displayName = 'MDXErrorComponent';
      return ErrorComponentWrapper;
    }
  }, [compiledSource, components]);

  if (!Content || typeof Content !== 'function') {
    return <ErrorComponent error="Could not load content" />;
  }
  
  // Pass components as props to the MDX component
  return <Content components={components} />;
}
