# CLI Reference

Complete reference for all Rohas CLI commands and options.

## Installation

Install Rohas CLI using the recommended installation script:

```bash
curl -fsSL https://raw.githubusercontent.com/rohas-dev/rohas/main/scripts/build.sh | bash
```

This will automatically install all dependencies and build Rohas CLI.

Verify installation:

```bash
rohas version
```

## Commands

### `rohas init`

Initialize a new Rohas project with a complete project structure.

**Usage:**
```bash
rohas init <name> [--lang <lang>] [--example <name>]
```

**Arguments:**
- `name` (required) - Project name and directory

**Options:**
- `--lang, -l` - Runtime language: `typescript` or `python` (default: `typescript`)
- `--example, -e` - Initialize with example code (optional)

**Examples:**
```bash
# Create TypeScript project
rohas init my-app --lang typescript

# Create Python project
rohas init my-app --lang python

# Create with example
rohas init my-app --lang python --example hello-world
```

**What it creates:**
- Project directory structure
- Example schema files (models, APIs, events)
- Configuration file (`config/rohas.toml`)
- Handler directories
- Basic README

### `rohas codegen`

Generate type-safe code from schema definitions.

**Usage:**
```bash
rohas codegen [--schema <path>] [--output <path>] [--lang <lang>]
```

**Options:**
- `--schema, -s` - Schema directory path (default: `schema`)
- `--output, -o` - Output directory for generated code (default: `src`)
- `--lang, -l` - Target language: `typescript` or `python` (optional, uses config if not specified)

**Examples:**
```bash
# Generate from default schema directory
rohas codegen

# Generate from custom schema path
rohas codegen --schema ./schemas --output ./generated

# Generate for specific language
rohas codegen --lang python
```

**What it generates:**
- Type definitions for models, inputs, events
- Handler stub files
- API request/response types
- Event payload types
- DTO (Data Transfer Object) types

**Note:** Always run `rohas codegen` after modifying schema files.

### `rohas validate`

Validate schema files for syntax and semantic errors.

**Usage:**
```bash
rohas validate [<schema-path>]
```

**Arguments:**
- `schema-path` - Path to schema file or directory (default: `schema`)

**Examples:**
```bash
# Validate default schema directory
rohas validate

# Validate specific file
rohas validate schema/api/user.ro

# Validate custom directory
rohas validate ./my-schemas
```

**What it checks:**
- Syntax errors in `.ro` files
- Duplicate definitions
- Type consistency
- Missing references
- Invalid configurations

**Exit codes:**
- `0` - Validation successful
- `1` - Validation failed with errors

### `rohas dev`

Start the development server with hot reload and file watching.

**Usage:**
```bash
rohas dev [--schema <path>] [--port <port>] [--watch] [--workbench] [--workbench-dev]
```

**Options:**
- `--schema, -s` - Schema directory path (default: `schema`)
- `--port, -p` - Server port number (default: `3000`)
- `--watch` - Enable file watching for hot reload (default: `true`)
- `--workbench` - Enable workbench dashboard UI
- `--workbench-dev` - Enable workbench in development mode

**Examples:**
```bash
# Start on default port
rohas dev

# Start on custom port
rohas dev --port 4000

# Start with workbench
rohas dev --workbench

# Disable file watching
rohas dev --watch false
```

**Features:**
- Hot reload for handlers and schemas
- Automatic schema re-parsing
- Handler hot-reloading (TypeScript/Python)
- Development API server
- WebSocket support
- Telemetry collection

**Server endpoints:**
- `http://localhost:3000` - API server
- `http://localhost:3000/workbench` - Workbench UI (if enabled)
- `ws://localhost:3000/ws` - WebSocket connections

### `rohas list-handlers`

List all handlers (APIs, events, crons) defined in schemas.

**Usage:**
```bash
rohas list-handlers [<schema-path>]
```

**Arguments:**
- `schema-path` - Path to schema file or directory (default: `schema`)

**Examples:**
```bash
# List all handlers
rohas list-handlers

# List from specific directory
rohas list-handlers ./schemas
```

**Output format:**
```
API Handlers:
  - CreateUser (POST /users)
  - GetUser (GET /users/:id)
  - Health (GET /health)

Event Handlers:
  - UserCreated (handlers: ["send_welcome_email", "update_analytics"])
  - OrderPlaced (handlers: ["process_payment"])

Cron Jobs:
  - DailyCleanup (0 0 * * *)
  - WeeklyReport (0 0 * * 0)
```

### `rohas list-events`

List all events with their payloads and handlers.

**Usage:**
```bash
rohas list-events [<schema-path>]
```

**Arguments:**
- `schema-path` - Path to schema file or directory (default: `schema`)

**Examples:**
```bash
# List all events
rohas list-events

# List from specific file
rohas list-events schema/events/user_events.ro
```

**Output format:**
```
Events:

  UserCreated
    Payload: User
    Handlers: ["send_welcome_email", "update_analytics"]
    Triggers: []

  OrderPlaced
    Payload: Order
    Handlers: ["process_payment", "send_confirmation"]
    Triggers: ["OrderProcessed"]
```

### `rohas version`

Display version information.

**Usage:**
```bash
rohas version
```

**Output:**
```
rohas 0.1.0
```

## Global Options

All commands support these global options:

- `--help, -h` - Show help message
- `--verbose` - Enable verbose logging
- `--quiet` - Suppress non-error output

## Environment Variables

- `ROHAS_LOG_LEVEL` - Set log level: `trace`, `debug`, `info`, `warn`, `error`
- `ROHAS_CONFIG_PATH` - Override config file path
- `ROHAS_SCHEMA_PATH` - Override default schema path

## Tips

1. **Always validate** before committing: `rohas validate`
2. **Regenerate code** after schema changes: `rohas codegen`
3. **Use workbench** in development: `rohas dev --workbench`
4. **Check handlers** before deployment: `rohas list-handlers`

## Next Steps

- Learn about [Configuration](/docs/configuration)
- Explore [Schema Language](/docs/schemas)
- Read [Architecture Overview](/docs/architecture)

