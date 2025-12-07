# Runtime

Rohas supports multiple runtime environments for executing handlers. Currently, TypeScript, Python, and Rust are supported, with each runtime providing full access to the language's ecosystem.

## Supported Runtimes

### TypeScript Runtime

The TypeScript runtime uses V8 JavaScript engine (via `deno_core`) to execute handlers.

**Features:**
- Full ES module support
- Modern JavaScript features (async/await, destructuring, etc.)
- Type-safe execution with generated types
- Hot-reload in development mode
- Access to Node.js-compatible APIs

**Handler Execution:**
- Handlers are executed in isolated V8 contexts
- Each handler gets its own module scope
- Automatic dependency resolution
- Type checking via generated types

**Example Handler:**

```python
from generated.api.Health import HealthResponse
from datetime import datetime

async def handler() -> HealthResponse:
    return HealthResponse(
        status="ok",
        timestamp=datetime.now().isoformat()
    )
```

```typescript
import { HealthResponse } from "../generated/api/Health";

export async function handler(): Promise<HealthResponse> {
  return {
    status: "ok",
    timestamp: new Date().toISOString(),
  };
}
```

### Python Runtime

The Python runtime uses PyO3 for seamless Python integration.

**Features:**
- Full Python 3.9+ support
- Async/await handlers
- Standard library access
- Third-party package support
- Hot-reload in development mode

**Handler Execution:**
- Handlers run in Python's async context
- Module-level imports and caching
- Automatic sys.path configuration
- Type hints via generated types

### Rust Runtime

The Rust runtime provides native performance and zero-cost abstractions for handler execution.

**Features:**
- Native Rust performance
- Full async/await support with Tokio
- Type-safe handler execution
- Direct access to Rust ecosystem
- Hot-reload in development mode via dynamic libraries

**Handler Execution:**
- Handlers are compiled as dynamic libraries
- Automatic handler registration at runtime
- Zero-copy data handling
- Full access to Rust standard library and crates

**Example Handler:**

```rust
use crate::generated::api::Health::{HealthRequest, HealthResponse};
use crate::generated::state::State;
use rohas_runtime::Result;

pub async fn handle_health(
    req: HealthRequest,
    state: &mut State,
) -> Result<HealthResponse> {
    state.logger().info("Health check requested");
    Ok(HealthResponse {
        status: "ok".to_string(),
        timestamp: chrono::Utc::now().to_rfc3339(),
    })
}
```

## Handler Context

All handlers receive a `HandlerContext` object containing:

- **handler_name**: Name of the handler being executed
- **payload**: Request body or event payload (as JSON)
- **query_params**: URL query parameters (for API handlers)
- **metadata**: Additional execution metadata

### Handler Context Examples

```python
from generated.runtime import HandlerContext

async def handler(context: HandlerContext) -> Response:
    payload = context.payload
    query_params = context.query_params
    # Use context data
```

```typescript
import { HandlerContext } from "../generated/runtime";

export async function handler(context: HandlerContext): Promise<Response> {
  const { payload, query_params } = context;
  // Use context data
}
```

```rust
use crate::generated::runtime::HandlerContext;
use rohas_runtime::Result;

pub async fn handler(context: HandlerContext) -> Result<Response> {
    let payload = context.payload;
    let query_params = context.query_params;
    // Use context data
    Ok(Response::default())
}
```

## Handler Types

### API Handlers

API handlers process HTTP requests and return responses.

**TypeScript:**
```typescript
import { CreateUserInput, User } from "../generated/api/CreateUser";

export async function handler(input: CreateUserInput): Promise<User> {
  // Process input
  return {
    id: 1,
    name: input.name,
    email: input.email,
    createdAt: new Date(),
  };
}
```

**Python:**
```python
from generated.api.CreateUser import CreateUserInput, User
from datetime import datetime

async def handler(input: CreateUserInput) -> User:
    # Process input
    return User(
        id=1,
        name=input.name,
        email=input.email,
        created_at=datetime.now()
    )
```

**Rust:**
```rust
use crate::generated::api::CreateUser::{CreateUserInput, User};
use crate::generated::state::State;
use rohas_runtime::Result;

pub async fn handler(
    input: CreateUserInput,
    state: &mut State,
) -> Result<User> {
    // Process input
    Ok(User {
        id: 1,
        name: input.name.clone(),
        email: input.email.clone(),
        created_at: chrono::Utc::now(),
    })
}
```

### Event Handlers

Event handlers process events asynchronously.

**TypeScript:**
```typescript
import { UserCreated } from "../generated/events/UserCreated";

export async function handler(event: UserCreated): Promise<void> {
  console.log(`User created: ${event.userId}`);
  // Process event
}
```

**Python:**
```python
from generated.events.UserCreated import UserCreated

async def handler(event: UserCreated) -> None:
    print(f"User created: {event.user_id}")
    # Process event
```

**Rust:**
```rust
use crate::generated::events::UserCreated::UserCreated;
use crate::generated::state::State;
use rohas_runtime::Result;

pub async fn handler(
    event: UserCreated,
    state: &mut State,
) -> Result<()> {
    state.logger().info(&format!("User created: {}", event.user_id));
    // Process event
    Ok(())
}
```

### Cron Handlers

Cron handlers execute on a schedule.

**TypeScript:**
```typescript
export async function handler(): Promise<void> {
  // Scheduled task logic
  console.log("Running scheduled cleanup");
}
```

**Python:**
```python
async def handler() -> None:
    # Scheduled task logic
    print("Running scheduled cleanup")
```

**Rust:**
```rust
use crate::generated::state::State;
use rohas_runtime::Result;

pub async fn handler(state: &mut State) -> Result<()> {
    // Scheduled task logic
    state.logger().info("Running scheduled cleanup");
    Ok(())
}
```

### WebSocket Handlers

WebSocket handlers manage real-time connections.

**TypeScript:**
```typescript
import { WebSocketMessage } from "../generated/websockets/Chat";

export async function onConnect(context: HandlerContext): Promise<void> {
  console.log("Client connected");
}

export async function onMessage(
  message: WebSocketMessage,
  context: HandlerContext
): Promise<void> {
  // Handle message
}

export async function onDisconnect(context: HandlerContext): Promise<void> {
  console.log("Client disconnected");
}
```

**Python:**
```python
from generated.websockets.Chat import WebSocketMessage

async def on_connect(context: HandlerContext) -> None:
    print("Client connected")

async def on_message(message: WebSocketMessage, context: HandlerContext) -> None:
    # Handle message
    pass

async def on_disconnect(context: HandlerContext) -> None:
    print("Client disconnected")
```

**Rust:**
```rust
use crate::generated::websockets::Chat::WebSocketMessage;
use crate::generated::runtime::HandlerContext;
use rohas_runtime::Result;

pub async fn on_connect(context: HandlerContext) -> Result<()> {
    println!("Client connected");
    Ok(())
}

pub async fn on_message(
    message: WebSocketMessage,
    context: HandlerContext,
) -> Result<()> {
    // Handle message
    Ok(())
}

pub async fn on_disconnect(context: HandlerContext) -> Result<()> {
    println!("Client disconnected");
    Ok(())
}
```

## Error Handling

Handlers can return errors that are automatically handled by the runtime.

### TypeScript

```typescript
export async function handler(): Promise<Response> {
  try {
    // Your logic
    return { success: true };
  } catch (error) {
    throw new Error(`Handler failed: ${error.message}`);
  }
}
```

### Python

```python
async def handler() -> Response:
    try:
        # Your logic
        return {"success": True}
    except Exception as e:
        raise Exception(f"Handler failed: {str(e)}")
```

### Rust

```rust
use rohas_runtime::Result;

pub async fn handler() -> Result<Response> {
    match some_operation() {
        Ok(data) => Ok(Response { success: true }),
        Err(e) => Err(rohas_runtime::RuntimeError::ExecutionFailed(
            format!("Handler failed: {}", e)
        )),
    }
}
```

## Execution Timeout

Handlers have a default timeout of 30 seconds. Timeouts are configurable per handler type.

## Hot Reload

In development mode (`rohas dev` or `rohas dev --workbench`), handlers are automatically reloaded when files change:

- **TypeScript**: Module cache invalidation
- **Python**: Import cache clearing and module reloading
- **Rust**: Dynamic library reloading

## Dependencies

### TypeScript

Install dependencies using npm/yarn/pnpm:

```bash
npm install <package>
```

Import in handlers:

```typescript
import axios from "axios";

export async function handler() {
  const response = await axios.get("https://api.example.com");
  return response.data;
}
```

### Python

Install dependencies using pip:

```bash
pip install <package>
```

Add to `requirements.txt`:

```
requests==2.31.0
```

Import in handlers:

```python
import requests

async def handler():
    response = requests.get("https://api.example.com")
    return response.json()
```

### Rust

Add dependencies to `Cargo.toml`:

```toml
[dependencies]
reqwest = { version = "0.11", features = ["json"] }
tokio = { version = "1", features = ["full"] }
```

Import in handlers:

```rust
use reqwest;

pub async fn handler() -> Result<Response> {
    let response = reqwest::get("https://api.example.com")
        .await?
        .json::<serde_json::Value>()
        .await?;
    Ok(response)
}
```

## Performance Considerations

### TypeScript

- V8 isolates provide good performance
- Module caching reduces startup time
- Use async/await for I/O operations

### Python

- Async handlers are more efficient
- Avoid blocking operations
- Use async libraries (aiohttp, asyncpg, etc.)

### Rust

- Native performance with zero-cost abstractions
- Excellent async performance with Tokio
- Use async libraries (reqwest, tokio-postgres, etc.)
- Leverage Rust's type system for safety

## Debugging

### TypeScript

Use `console.log` for debugging:

```typescript
export async function handler() {
  console.log("Debug info:", data);
  // Handler logic
}
```

### Python

Use `print` or logging:

```python
import logging

logger = logging.getLogger(__name__)

async def handler():
    logger.info("Debug info: %s", data)
    # Handler logic
```

### Rust

Use the state logger or `println!`:

```rust
use crate::generated::state::State;

pub async fn handler(state: &mut State) -> Result<()> {
    state.logger().info("Debug info");
    // Or use println! for quick debugging
    println!("Debug info: {:?}", data);
    // Handler logic
    Ok(())
}
```

## Best Practices

1. **Keep handlers focused**: One handler, one responsibility
2. **Use generated types**: Always import from `generated/`
3. **Handle errors gracefully**: Use try/catch blocks
4. **Use async/await**: For all I/O operations
5. **Avoid blocking operations**: Especially in Python and TypeScript
6. **Test handlers independently**: Unit test your logic
7. **Use type hints**: For better IDE support

## Next Steps

- Learn about [Handlers](/docs/handlers)
- Explore [Schema Language](/docs/schemas)
- Check [Configuration](/docs/configuration)

