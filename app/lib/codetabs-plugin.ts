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
        
        if (!lang) {
          // No language specified, keep as is
          nodes.push(node);
          i++;
          continue;
        }
        
        // Look ahead for other code blocks (skip paragraphs and other non-code nodes)
        let foundTrio = false;
        let foundPair = false;
        let skipCount = 1;
        
        // First, try to find three consecutive code blocks with different languages
        let secondCodeNode: Code | null = null;
        let secondLang: string | null = null;
        let secondIndex = -1;
        let thirdCodeNode: Code | null = null;
        let thirdLang: string | null = null;
        let thirdIndex = -1;
        
        // Find second code block - look up to 10 nodes ahead, skipping non-code nodes
        for (let j = i + 1; j < Math.min(i + 15, tree.children.length); j++) {
          const nextNode = tree.children[j];
          if (nextNode.type === 'code') {
            const nextCode = nextNode as Code;
            const nextLang = (nextCode.lang || '').toLowerCase();
            // Only consider if it has a language and is different from first
            if (nextLang && nextLang !== lang) {
              secondCodeNode = nextCode;
              secondLang = nextLang;
              secondIndex = j;
              break;
            }
          }
        }
        
        // If second code block found, look for third
        if (secondCodeNode && secondLang) {
          for (let j = secondIndex + 1; j < Math.min(secondIndex + 15, tree.children.length); j++) {
            const nextNode = tree.children[j];
            if (nextNode.type === 'code') {
              const nextCode = nextNode as Code;
              const nextLang = (nextCode.lang || '').toLowerCase();
              // Only consider if it has a language and is different from both first and second
              if (nextLang && nextLang !== lang && nextLang !== secondLang) {
                thirdCodeNode = nextCode;
                thirdLang = nextLang;
                thirdIndex = j;
                break;
              }
            }
          }
        }
        
        // If we have three different languages, create three tabs
        if (secondCodeNode && thirdCodeNode && lang && secondLang && thirdLang &&
            lang !== secondLang && lang !== thirdLang && secondLang !== thirdLang &&
            codeNode.value.trim() && secondCodeNode.value.trim() && thirdCodeNode.value.trim()) {
          // Normalize language names
          const normalizedLang1 = normalizeLanguage(lang);
          const normalizedLang2 = normalizeLanguage(secondLang);
          const normalizedLang3 = normalizeLanguage(thirdLang);
          
          // Language priority: python (1) > rust (2) > typescript (3)
          const langPriority: Record<string, number> = {
            'python': 1,
            'rust': 2,
            'typescript': 3,
            'ts': 3, // Also handle 'ts' as typescript
          };
          
          // Create array with original code and normalized language, then sort by priority
          const langs = [
            { lang: normalizedLang1, code: codeNode.value, priority: langPriority[normalizedLang1] || 99 },
            { lang: normalizedLang2, code: secondCodeNode.value, priority: langPriority[normalizedLang2] || 99 },
            { lang: normalizedLang3, code: thirdCodeNode.value, priority: langPriority[normalizedLang3] || 99 },
          ];
          
          // Sort by priority to get: Python (1), Rust (2), TypeScript (3)
          langs.sort((a, b) => a.priority - b.priority);
          
          const encodeCode = (str: string): string => {
            const jsonStr = JSON.stringify(str);
            return Buffer.from(jsonStr, 'utf8')
              .toString('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=/g, '');
          };
          
          nodes.push({
            type: 'mdxJsxFlowElement',
            name: 'CodeTabs',
            attributes: [
              {
                type: 'mdxJsxAttribute',
                name: 'lang1',
                value: langs[0].lang,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'code1',
                value: encodeCode(langs[0].code),
              },
              {
                type: 'mdxJsxAttribute',
                name: 'encoded1',
                value: 'true',
              },
              {
                type: 'mdxJsxAttribute',
                name: 'lang2',
                value: langs[1].lang,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'code2',
                value: encodeCode(langs[1].code),
              },
              {
                type: 'mdxJsxAttribute',
                name: 'encoded2',
                value: 'true',
              },
              {
                type: 'mdxJsxAttribute',
                name: 'lang3',
                value: langs[2].lang,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'code3',
                value: encodeCode(langs[2].code),
              },
              {
                type: 'mdxJsxAttribute',
                name: 'encoded3',
                value: 'true',
              },
            ],
            children: [],
          });
          
          skipCount = thirdIndex - i + 1;
          foundTrio = true;
        }
        // Otherwise, try to find a pair (two code blocks)
        else if (secondCodeNode && secondLang && lang && lang !== secondLang) {
          const normalizedLang1 = normalizeLanguage(lang);
          const normalizedLang2 = normalizeLanguage(secondLang);
          
          // Language priority: python > rust > typescript
          const langPriority: Record<string, number> = {
            'python': 1,
            'rust': 2,
            'typescript': 3,
          };
          
          const priority1 = langPriority[normalizedLang1] || 99;
          const priority2 = langPriority[normalizedLang2] || 99;
          
          let finalLang1 = normalizedLang1;
          let finalCode1 = codeNode.value;
          let finalLang2 = normalizedLang2;
          let finalCode2 = secondCodeNode.value;
          
          // Swap if second language has higher priority (lower number)
          if (priority2 < priority1) {
            finalLang1 = normalizedLang2;
            finalCode1 = secondCodeNode.value;
            finalLang2 = normalizedLang1;
            finalCode2 = codeNode.value;
          }
          
          const encodeCode = (str: string): string => {
            const jsonStr = JSON.stringify(str);
            return Buffer.from(jsonStr, 'utf8')
              .toString('base64')
              .replace(/\+/g, '-')
              .replace(/\//g, '_')
              .replace(/=/g, '');
          };
          
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
                value: encodeCode(finalCode1),
              },
              {
                type: 'mdxJsxAttribute',
                name: 'encoded1',
                value: 'true',
              },
              {
                type: 'mdxJsxAttribute',
                name: 'lang2',
                value: finalLang2,
              },
              {
                type: 'mdxJsxAttribute',
                name: 'code2',
                value: encodeCode(finalCode2),
              },
              {
                type: 'mdxJsxAttribute',
                name: 'encoded2',
                value: 'true',
              },
            ],
            children: [],
          });
          
          skipCount = secondIndex - i + 1;
          foundPair = true;
        }
        
        if (foundTrio || foundPair) {
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

