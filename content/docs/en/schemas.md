# Schema Language

Rohas uses a declarative schema language (`.ro` files) to define your application's structure. Schemas define models, APIs, events, cron jobs, and inputs in a type-safe, code-generatable format.

## Schema File Structure

Schema files use the `.ro` extension and are organized by type:

```
schema/
├── models/      # Data models
├── api/         # API endpoints
├── events/       # Event definitions
├── cron/         # Scheduled jobs
└── websockets/   # WebSocket endpoints
```

## Models

Models define reusable data structures used throughout your application.

**Location:** `schema/models/`

**Syntax:**
```rohas
model User {
  id        Int      @id @auto
  name      String
  email     String   @unique
  createdAt DateTime @default(now)
  posts     Post[]
}
```

**Field Types:**
- `String` - Text data
- `Int` - Integer numbers
- `Float` - Floating-point numbers
- `Boolean` - True/false values
- `DateTime` - Date and time
- `Json` - JSON data
- `Model[]` - Arrays of models

**Attributes:**
- `@id` - Primary key
- `@auto` - Auto-increment
- `@unique` - Unique constraint
- `@default(value)` - Default value
- `@optional` - Optional field

**Example:**
```rohas
model Post {
  id        Int      @id @auto
  title     String
  content   String
  authorId  Int
  author    User
  createdAt DateTime @default(now)
  published Boolean  @default(false)
}
```

## Inputs (DTOs)

Inputs define Data Transfer Objects for API requests.

**Location:** `schema/api/` (alongside API definitions)

**Syntax:**
```rohas
input CreateUserInput {
  name: String
  email: String
  password: String
}
```

**Usage:**
```rohas
api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
}
```

## APIs

APIs define HTTP endpoints with request/response types.

**Location:** `schema/api/`

**Syntax:**
```rohas
api GetUser {
  method: GET
  path: "/users/:id"
  response: User
}

api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated]
}
```

**HTTP Methods:**
- `GET` - Retrieve data
- `POST` - Create data
- `PUT` - Update data (full)
- `PATCH` - Update data (partial)
- `DELETE` - Delete data

**Path Parameters:**
Use `:param` syntax for path parameters:
```rohas
api GetUser {
  method: GET
  path: "/users/:id"
  response: User
}
```

**Query Parameters:**
Query parameters are automatically extracted and passed to handlers.

**Request Body:**
Use `body` to specify the request body type:
```rohas
api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
}
```

**Response Types:**
- Reference a model: `response: User`
- Inline definition: `response: { id: Int, name: String }`

**Event Triggers:**
APIs can trigger events after execution:
```rohas
api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated, WelcomeEmailSent]
}
```

**Middlewares:**
Specify middleware functions:
```rohas
api ProtectedAPI {
  method: GET
  path: "/protected"
  response: Data
  middlewares: ["auth", "rateLimit"]
}
```

## Events

Events define event types that can be published and consumed.

**Location:** `schema/events/`

**Syntax:**
```rohas
event UserCreated {
  payload: User
  handler: [send_welcome_email, update_analytics]
  triggers: [UserRegistered]
}
```

**Payload Types:**
- Reference a model: `payload: User`
- Inline definition: `payload: { userId: Int, name: String }`

**Handlers:**
Specify handler functions that process the event:
```rohas
event UserCreated {
  payload: User
  handler: [send_welcome_email, update_analytics, log_event]
}
```

**Event Chaining:**
Events can trigger other events:
```rohas
event UserCreated {
  payload: User
  handler: [send_welcome_email]
  triggers: [UserRegistered, WelcomeEmailSent]
}
```

**Example:**
```rohas
event OrderPlaced {
  payload: Order
  handler: [process_payment, send_confirmation, update_inventory]
  triggers: [PaymentProcessed]
}

event PaymentProcessed {
  payload: Payment
  handler: [fulfill_order]
}
```

## Cron Jobs

Cron jobs define scheduled tasks that run on a schedule.

**Location:** `schema/cron/`

**Syntax:**
```rohas
cron DailyCleanup {
  schedule: "0 0 * * *"
  triggers: [CleanupStarted]
}
```

**Schedule Format:**
Cron expressions use standard format:
```
┌───────────── minute (0 - 59)
│ ┌───────────── hour (0 - 23)
│ │ ┌───────────── day of month (1 - 31)
│ │ │ ┌───────────── month (1 - 12)
│ │ │ │ ┌───────────── day of week (0 - 6) (Sunday to Saturday)
│ │ │ │ │
* * * * *
```

**Examples:**
- `"0 0 * * *"` - Daily at midnight
- `"0 */6 * * *"` - Every 6 hours
- `"0 0 * * 0"` - Weekly on Sunday
- `"0 0 1 * *"` - Monthly on the 1st
- `"*/5 * * * *"` - Every 5 minutes

**Event Triggers:**
Cron jobs can trigger events:
```rohas
cron DailyReport {
  schedule: "0 9 * * *"
  triggers: [ReportGenerated]
}
```

## WebSockets

WebSockets define real-time communication endpoints.

**Location:** `schema/websockets/`

**Syntax:**
```rohas
ws Chat {
  path: "/ws/chat"
  message: ChatMessage
  onConnect: [on_connect_handler]
  onMessage: [on_message_handler]
  onDisconnect: [on_disconnect_handler]
}
```

**Message Types:**
Define the message structure:
```rohas
input ChatMessage {
  type: String
  content: String
  userId: Int
  timestamp: DateTime
}
```

**Handlers:**
- `onConnect` - Called when client connects
- `onMessage` - Called when message received
- `onDisconnect` - Called when client disconnects

## Data Types

### Primitive Types

- `String` - Text data
- `Int` - 32-bit integers
- `Float` - Floating-point numbers
- `Boolean` - True/false
- `DateTime` - Date and time
- `Json` - JSON data

### Complex Types

- `Model[]` - Arrays of models
- `String[]` - Arrays of strings
- Custom models - Reference other models

### Optional Fields

Use `?` to mark optional fields:
```rohas
model User {
  id: Int
  name: String
  email: String?
  phone: String?
}
```

## Schema Organization

### File Naming

Schema files should be named descriptively:
- `schema/api/user_api.ro`
- `schema/events/user_events.ro`
- `schema/models/user.ro`

### Directory Structure

Organize schemas logically:
```
schema/
├── models/
│   ├── user.ro
│   ├── post.ro
│   └── comment.ro
├── api/
│   ├── user_api.ro
│   └── post_api.ro
├── events/
│   ├── user_events.ro
│   └── post_events.ro
└── cron/
    └── cleanup.ro
```

## Validation

Validate schemas before generating code:

```bash
rohas validate
```

**What's validated:**
- Syntax correctness
- Type consistency
- Duplicate definitions
- Missing references
- Invalid configurations

## Code Generation

After defining schemas, generate code:

```bash
rohas codegen
```

This generates:
- Type definitions
- Handler stubs
- API types
- Event types

## Best Practices

1. **Organize by Domain**: Group related schemas together
2. **Use Models**: Reuse models across APIs and events
3. **Name Clearly**: Use descriptive names
4. **Validate Early**: Run `rohas validate` frequently
5. **Document Schemas**: Add comments for complex schemas
6. **Version Control**: Track schema changes in git
7. **Type Safety**: Leverage generated types

## Examples

### Complete Example

```rohas
// schema/models/user.ro
model User {
  id        Int      @id @auto
  name      String
  email     String   @unique
  createdAt DateTime @default(now)
}

// schema/api/user_api.ro
input CreateUserInput {
  name: String
  email: String
}

api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated]
}

api GetUser {
  method: GET
  path: "/users/:id"
  response: User
}

// schema/events/user_events.ro
event UserCreated {
  payload: User
  handler: [send_welcome_email]
}
```

## Next Steps

- Learn about [Handlers](/docs/handlers)
- Explore [Code Generation](/docs/cli#codegen)
- Read [Architecture](/docs/architecture)

