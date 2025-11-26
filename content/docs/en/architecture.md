# Architecture

Rohas is a modern event-driven application framework built with Rust. It provides a schema-driven development approach with support for multiple runtimes and event adapters.

## System Overview

Rohas consists of several core components that work together to provide a complete event-driven application framework:

TODO Drawing

## Core Components

### 1. Parser (`rohas-parser`)

The parser is responsible for parsing Rohas schema files (`.ro` files) into an Abstract Syntax Tree (AST). It uses a Pest-based grammar to parse:

- **Models**: Data structures and entities
- **APIs**: HTTP endpoint definitions
- **Events**: Event definitions with payloads
- **Crons**: Scheduled job definitions
- **Inputs**: Data Transfer Objects (DTOs)
- **WebSockets**: WebSocket endpoint definitions

**Key Features:**
- Validates schema syntax and semantics
- Checks for duplicate definitions
- Ensures type consistency
- Supports directory-based schema organization

### 2. Engine (`rohas-engine`)

The engine is the core orchestration component that:

- **Initializes** the system from schema files
- **Routes** HTTP requests to appropriate handlers
- **Manages** the event bus for event-driven communication
- **Coordinates** between adapters, runtimes, and handlers
- **Provides** telemetry and observability
- **Handles** WebSocket connections
- **Schedules** and executes cron jobs

**Key Modules:**
- `api.rs`: HTTP API routing and request handling
- `event.rs`: Event bus implementation
- `router.rs`: Request routing logic
- `engine.rs`: Main engine orchestration
- `telemetry.rs`: Observability and tracing
- `workbench.rs`: Development tools and UI

### 3. Runtime (`rohas-runtime`)

The runtime executes handlers in different programming languages:

**TypeScript Runtime:**
- Uses V8 JavaScript engine (via `deno_core`)
- Supports ES modules and modern JavaScript features
- Hot-reload support for development
- Type-safe handler execution

**Python Runtime:**
- Uses PyO3 for Python integration
- Supports async/await handlers
- Module hot-reloading
- Full Python standard library access

**Features:**
- Automatic handler discovery
- Context passing (payload, query params, etc.)
- Error handling and reporting
- Execution time tracking

### 4. Code Generator (`rohas-codegen`)

Generates type-safe code from schemas:

- **Type Definitions**: Models, inputs, events
- **Handler Stubs**: Template implementations
- **API Types**: Request/response types
- **Event Types**: Event payload types

**Supported Languages:**
- TypeScript/JavaScript
- Python

### 5. Adapters (`rohas-adapters`)

Event adapters provide different message broker backends:

**Memory Adapter** (Default):
- In-memory broadcast channels
- Perfect for development
- No external dependencies
- Fast and lightweight

**Production Adapters:**
- **Kafka**: Apache Kafka integration
- **RabbitMQ**: AMQP message broker
- **NATS**: High-performance messaging
- **SQS**: AWS Simple Queue Service
- **RocksDB**: Persistent storage adapter

### 6. CLI (`rohas-cli`)

Command-line interface for development:

**Commands:**
- `init`: Create new project
- `codegen`: Generate code from schemas
- `validate`: Validate schema files
- `dev`: Start development server
- `list`: List handlers and events

### 7. Cron Scheduler (`rohas-cron`)

Scheduled job execution:

- Cron expression parsing
- Timezone support
- Event triggering from cron jobs
- Reliable scheduling

### 8. Telemetry (`rohas-telemetry`)

Observability and monitoring:

- **Traces**: Distributed tracing
- **Metrics**: Performance metrics
- **Logs**: Structured logging
- **Storage**: Multiple backend adapters (RocksDB, Prometheus, InfluxDB, TimescaleDB)

## Data Flow

### API Request Flow

```
1. HTTP Request → Engine Router
2. Router → Executor
3. Executor → Runtime (TypeScript/Python)
4. Runtime → Handler Execution
5. Handler → Response
6. Response → HTTP Response
7. (Optional) Trigger Events
```

### Event Flow

```
1. Event Triggered (API/Cron/Manual)
2. Event Bus → Adapter
3. Adapter → Publish to Topic
4. Subscribers → Event Handlers
5. Handlers → Execute Business Logic
6. (Optional) Trigger More Events
```

### Code Generation Flow

```
1. Schema Files (.ro)
2. Parser → AST
3. Codegen → Templates
4. Generated Code → src/generated/
5. Developer → Implements Handlers
```

## Project Structure

A typical Rohas project follows this structure:

```
project/
├── schema/              # Schema definitions
│   ├── models/         # Data models
│   ├── api/            # API endpoints
│   ├── events/         # Event definitions
│   ├── cron/           # Cron jobs
│   └── websockets/     # WebSocket endpoints
├── src/
│   ├── generated/      # Auto-generated code (DO NOT EDIT)
│   │   ├── api/        # API types
│   │   ├── events/     # Event types
│   │   ├── models/     # Model types
│   │   └── dto/        # DTO types
│   └── handlers/       # Your implementations
│       ├── api/        # API handlers
│       ├── events/     # Event handlers
│       ├── cron/       # Cron handlers
│       └── websockets/ # WebSocket handlers
├── config/
│   └── rohas.toml      # Configuration
└── .rohas/             # Runtime data
    └── telemetry/      # Telemetry storage
```

## Configuration

The `config/rohas.toml` file configures:

- **Project**: Name, version, language
- **Server**: Host, port, CORS
- **Adapter**: Type and settings
- **Telemetry**: Storage and retention
- **Workbench**: Development tools

## Development Workflow

1. **Define Schemas**: Write `.ro` schema files
2. **Generate Code**: Run `rohas codegen`
3. **Implement Handlers**: Write business logic
4. **Validate**: Run `rohas validate`
5. **Develop**: Run `rohas dev` or `rohas dev --workbench` with hot reload
6. **Deploy**: Build and deploy your application

## Production Considerations

- Use production adapters (Kafka, RabbitMQ, etc.)
- Configure telemetry storage (RocksDB, Prometheus, etc.)
- Set up monitoring and alerting
- Configure proper retention policies
- Use environment-specific configurations
- Enable workbench only in development

## Next Steps

- Learn about [Schema Language](/docs/schemas)
- Explore [Handlers](/docs/handlers)
- Check [Adapters](/docs/adapters)
- Read [Runtime Details](/docs/runtime)

