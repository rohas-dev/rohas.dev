# Documentation Content

This directory contains all documentation in Markdown format for easy editing and maintenance.

## Structure

```
content/
└── docs/
    ├── index.md              # Documentation overview
    ├── getting-started.md    # Getting started guide
    ├── installation.md       # Installation instructions
    ├── schemas.md            # Schema documentation
    ├── handlers.md           # Handler documentation
    ├── adapters.md           # Event adapters documentation
    ├── cli.md                # CLI reference
    └── configuration.md      # Configuration reference
```

## Editing Documentation

All documentation files are in Markdown format (`.md`). Simply edit the markdown files in this directory and the changes will be automatically reflected on the website.

### Markdown Features

- Standard Markdown syntax
- GitHub Flavored Markdown (GFM) support
- Code blocks with syntax highlighting
- Links to other documentation pages

### Code Blocks

Use fenced code blocks with language identifiers for syntax highlighting:

````markdown
```typescript
export function example() {
  return "Hello";
}
```
````

Supported languages include: `typescript`, `python`, `bash`, `toml`, `rohas`, etc.

### Internal Links

Link to other documentation pages using relative paths:

```markdown
[Getting Started](/docs/getting-started)
[Installation Guide](/docs/installation)
```

### External Links

Link to external resources:

```markdown
[GitHub](https://github.com/rohas-dev/rohas)
```

## Adding New Documentation

1. Create a new `.md` file in `content/docs/`
2. Add a corresponding page in `app/docs/[slug]/page.tsx` that loads the markdown file
3. Add the page to the navigation in `app/docs/layout.tsx`

Example page:

```typescript
import { readFile } from "fs/promises";
import { join } from "path";
import MarkdownContent from "../../components/MarkdownContent";

export default async function NewPage() {
  const filePath = join(process.cwd(), "content", "docs", "new-page.md");
  const content = await readFile(filePath, "utf-8");
  return <MarkdownContent content={content} />;
}
```

