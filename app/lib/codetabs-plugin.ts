// @ts-expect-error - mdast types may not be available but work at runtime
import type { Root, Code } from 'mdast';

/**
 * Remark plugin to transform code blocks with different languages into CodeTabs
 * Detects code blocks with different languages (consecutive or separated by text labels)
 * and converts them to tabs
 */
export function remarkCodeTabs() {
  return (tree: Root) => {
    const nodes: Root['children'] = [];
    let i = 0;

    while (i < tree.children.length) {
      const node = tree.children[i];
      
      // Check if current node is a code block
      if (node.type === 'code') {
        const codeNode = node as Code;
        const lang = (codeNode.lang || '').toLowerCase();
        
        // Look ahead for another code block (up to 3 nodes ahead to allow for text labels)
        let foundPair = false;
        let skipCount = 1;
        
        for (let j = i + 1; j < Math.min(i + 4, tree.children.length); j++) {
          const nextNode = tree.children[j];
          
          if (nextNode.type === 'code') {
            const nextCodeNode = nextNode as Code;
            const nextLang = (nextCodeNode.lang || '').toLowerCase();
            
            // If languages are different and both are valid programming languages, create tabs
            if (lang && nextLang && lang !== nextLang) {
              // Normalize language names (e.g., 'ts' -> 'typescript')
              const normalizedLang1 = normalizeLanguage(lang);
              const normalizedLang2 = normalizeLanguage(nextLang);
              
              // Determine order: if first is typescript and second is python, keep order
              // Otherwise, check if we should swap based on common patterns
              let finalLang1 = normalizedLang1;
              let finalCode1 = codeNode.value;
              let finalLang2 = normalizedLang2;
              let finalCode2 = nextCodeNode.value;
              
              // Prefer Python first, then TypeScript (common pattern)
              if (normalizedLang1 === 'typescript' && normalizedLang2 === 'python') {
                finalLang1 = normalizedLang2;
                finalCode1 = nextCodeNode.value;
                finalLang2 = normalizedLang1;
                finalCode2 = codeNode.value;
              }
              
              // Create a CodeTabs node with generic props
              nodes.push({
                type: 'mdxJsxFlowElement',
                name: 'CodeTabs',
                attributes: [
                  {
                    type: 'mdxJsxAttribute',
                    name: 'lang1',
                    value: finalLang1,
                  },
                  {
                    type: 'mdxJsxAttribute',
                    name: 'code1',
                    value: finalCode1,
                  },
                  {
                    type: 'mdxJsxAttribute',
                    name: 'lang2',
                    value: finalLang2,
                  },
                  {
                    type: 'mdxJsxAttribute',
                    name: 'code2',
                    value: finalCode2,
                  },
                ],
                children: [],
              });
              
              // Skip both code blocks and any text nodes in between
              skipCount = j - i + 1;
              foundPair = true;
              break;
            }
          }
        }
        
        if (foundPair) {
          i += skipCount;
              continue;
        }
      }
      
      // Keep the node as is
      nodes.push(node);
      i++;
    }
    
    tree.children = nodes;
  };
}

/**
 * Normalize language identifiers to common names
 */
function normalizeLanguage(lang: string): string {
  const normalized = lang.toLowerCase();
  const mapping: Record<string, string> = {
    'ts': 'typescript',
    'js': 'javascript',
    'sh': 'bash',
    'shell': 'bash',
    'py': 'python',
    'rb': 'ruby',
    'rs': 'rust',
    'go': 'golang',
    'cpp': 'cpp',
    'c++': 'cpp',
    'c#': 'csharp',
    'cs': 'csharp',
  };
  
  return mapping[normalized] || normalized;
}

