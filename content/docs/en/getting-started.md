# Getting Started

Get up and running with Rohas in minutes. This guide will walk you through creating your first event-driven application.

## Prerequisites

- Rust 1.70 or higher (for installing Rohas CLI and Rust runtime)
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
rohas version
```

## Create Your First Project

Initialize a new Rohas project:

```bash
rohas init my-app --lang python
```

Or for TypeScript (experimental):

```bash
rohas init my-app --lang typescript
```

Or for Rust:

```bash
rohas init my-app --lang rust
```

> **Note:** Python and Rust runtimes are stable and production-ready, while TypeScript runtime is currently experimental.

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

## Generate Code

After initializing your project, generate type-safe code from the example schemas:

```bash
cd my-app
rohas codegen
```

This generates handler stubs and type definitions in `src/generated/` from the example schemas created by `rohas init`.

## Define Your First Schema

Create a simple API schema in `schema/api/Health.ro`:

```rohas
model HealthResponse {
  status  String
  timestamp String
}

api Health {
  method: GET
  path: "/health"
  response: HealthResponse
}
```

## Implement Your Handler

Implement the handler in `src/handlers/api/health.py` (Python), `src/handlers/api/health.ts` (TypeScript), or `src/handlers/api/health.rs` (Rust):

**Python:**
```python
from generated.api.health import HealthRequest, HealthResponse
from generated.state import State
from datetime import datetime

async def handle_health(req: HealthRequest, state: State) -> HealthResponse:
    return HealthResponse(status="ok", timestamp=datetime.now().isoformat())
```

**Rust:**
```rust
use crate::generated::api::health::{HealthRequest, HealthResponse};
use crate::generated::state::State;
use rohas_runtime::Result;

pub async fn handle_health(
    req: HealthRequest,
    state: &mut State,
) -> Result<HealthResponse> {
    Ok(HealthResponse {
        status: "ok".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    })
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

