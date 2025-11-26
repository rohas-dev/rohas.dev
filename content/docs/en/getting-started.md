# Getting Started

Get up and running with Rohas in minutes. This guide will walk you through creating your first event-driven application.

## Prerequisites

- Rust 1.70 or higher (for installing Rohas CLI)
- Node.js 18+ (for TypeScript runtime) or Python 3.9+ (for Python runtime)
- Cargo (Rust package manager)

## Installation

Install the Rohas CLI using the recommended installation script:

```bash
curl -fsSL https://raw.githubusercontent.com/rohas-dev/rohas/main/scripts/build.sh | bash
```

This will automatically install all dependencies and build Rohas CLI.

Alternatively, install via Cargo:

```bash
cargo install rohas-cli
```

Verify the installation:

```bash
rohas --version
```

## Create Your First Project

Initialize a new Rohas project:

```bash
rohas init my-app --lang typescript
```

Or for Python:

```bash
rohas init my-app --lang python
```

This creates a project structure:

```
my-app/
├── schema/          # Schema definitions (.ro files)
│   ├── api/        # API endpoint schemas
│   ├── events/     # Event schemas
│   ├── models/     # Data model schemas
│   └── cron/       # Cron job schemas
├── src/
│   ├── generated/  # Auto-generated types (DO NOT EDIT)
│   └── handlers/   # Your handler implementations
│       ├── api/    # API handlers
│       ├── events/ # Event handlers
│       └── cron/   # Cron job handlers
└── config/         # Configuration files
```

## Define Your First Schema

Create a simple API schema in `schema/api/Health.ro`:

```rohas
api Health {
  method = GET
  path = "/health"
  
  response {
    status: string
    timestamp: string
  }
}
```

## Generate Code

Generate type-safe code from your schemas:

```bash
rohas codegen
```

This generates handler stubs and type definitions in `src/generated/`.

## Implement Your Handler

Implement the handler in `src/handlers/api/Health.ts`:

```typescript
import { HealthResponse } from "../generated/api/Health";

export async function handler(): Promise<HealthResponse> {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
```

## Start Development Server

Start the development server with hot reload:

```bash
rohas dev
```

Or start with the workbench UI for a better development experience:

```bash
rohas dev --workbench
```

Your API will be available at `http://localhost:3000/health`

## Next Steps

- Learn about [defining schemas](/docs/schemas)
- Explore [handler implementation](/docs/handlers)
- Check out [examples](/examples)
- Read the [CLI reference](/docs/cli)

