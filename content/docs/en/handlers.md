# Handlers

Handlers are where you implement the business logic for your APIs, events, and cron jobs.

## Handler Naming Convention

Handler files must be named exactly as the API/Event/Cron name in the schema:

- API `Health` → `src/handlers/api/Health.ts` or `Health.py`
- Event `UserCreated` → Handler defined in event schema
- Cron `DailyCleanup` → `src/handlers/cron/DailyCleanup.ts` or `DailyCleanup.py`

## Handler Signatures

### API Handlers

API handlers receive a request object and optionally a `State` object:

```python
from generated.api.GetUser import GetUserRequest, GetUserResponse
from generated.state import State

async def handle_get_user(req: GetUserRequest, state: State) -> GetUserResponse:
    # Access path parameters
    user_id = req.id  # From path: /users/:id
    
    # Access query parameters
    include_posts = req.query_params.get("include_posts", "false")
    
    # Access request body (if present)
    if hasattr(req, 'body'):
        body_data = req.body
    
    # Use state for logging and events
    state.logger.info(f"Fetching user {user_id}")
    
    return GetUserResponse(data=user)
```

```typescript
import { GetUserRequest, GetUserResponse } from "../generated/api/GetUser";
import { State } from "../generated/state";

export async function handler(
  req: GetUserRequest,
  state: State
): Promise<GetUserResponse> {
  // Access path parameters
  const userId = req.id; // From path: /users/:id
  
  // Access query parameters
  const includePosts = req.queryParams?.include_posts || "false";
  
  // Access request body (if present)
  const bodyData = req.body;
  
  // Use state for logging and events
  state.logger.info(`Fetching user ${userId}`);
  
  return { data: user };
}
```

### Event Handlers

Event handlers receive an event object and optionally a `State` object:

```python
from generated.events.UserCreated import UserCreated
from generated.state import State

async def handle_user_created(event: UserCreated, state: State) -> None:
    # Access event payload
    user_id = event.payload.id
    email = event.payload.email
    
    # Log and trigger additional events
    state.logger.info(f"Processing user created: {user_id}")
    state.trigger_event("WelcomeEmailSent", {"email": email})
```

```typescript
import { UserCreated } from "../generated/events/UserCreated";
import { State } from "../generated/state";

export async function handler(
  event: UserCreated,
  state: State
): Promise<void> {
  // Access event payload
  const userId = event.payload.id;
  const email = event.payload.email;
  
  // Log and trigger additional events
  state.logger.info(`Processing user created: ${userId}`);
  state.triggerEvent("WelcomeEmailSent", { email });
}
```

### Cron Handlers

Cron handlers receive a request object (usually empty) and optionally a `State` object:

```python
from generated.state import State

async def handle_daily_cleanup(req, state: State) -> None:
    state.logger.info("Starting daily cleanup")
    # Cleanup logic
    state.trigger_event("CleanupCompleted", {"timestamp": datetime.now().isoformat()})
```

```typescript
import { State } from "../generated/state";

export async function handler(req: any, state: State): Promise<void> {
  state.logger.info("Starting daily cleanup");
  // Cleanup logic
  state.triggerEvent("CleanupCompleted", { timestamp: new Date().toISOString() });
}
```

## Request Object Structure

### API Request Properties

The request object (`*Request`) contains:

- **Path Parameters**: Extracted from route patterns (e.g., `:id` in `/users/:id`)
  - Accessible as properties: `req.id`, `req.userId`, etc.
  
- **Query Parameters**: URL query string parameters
  - Python: `req.query_params` (Dict[str, str])
  - TypeScript: `req.queryParams` (Record of string to string)
  
- **Body**: Request body (if specified in schema)
  - Python: `req.body` (typed object)
  - TypeScript: `req.body` (typed object)

**Example with path and query parameters:**

```rohas
api GetUser {
  method: GET
  path: "/users/:id"
  response: User
}
```

```python
from generated.api.GetUser import GetUserRequest, GetUserResponse

async def handle_get_user(req: GetUserRequest, state: State) -> GetUserResponse:
    # Path parameter from /users/:id
    user_id = req.id  # e.g., "123" from /users/123
    
    # Query parameters from ?include_posts=true&format=json
    include_posts = req.query_params.get("include_posts", "false")
    format_type = req.query_params.get("format", "json")
    
    # Use parameters
    user = fetch_user(user_id, include_posts=include_posts == "true")
    return GetUserResponse(data=user)
```

```typescript
import { GetUserRequest, GetUserResponse } from "../generated/api/GetUser";

export async function handler(
  req: GetUserRequest,
  state: State
): Promise<GetUserResponse> {
  // Path parameter from /users/:id
  const userId = req.id; // e.g., "123" from /users/123
  
  // Query parameters from ?include_posts=true&format=json
  const includePosts = req.queryParams?.include_posts || "false";
  const formatType = req.queryParams?.format || "json";
  
  // Use parameters
  const user = fetchUser(userId, { includePosts: includePosts === "true" });
  return { data: user };
}
```

## State Object

The `State` object provides access to runtime features:

### Logging

Use `state.logger` for structured logging:

```python
from generated.state import State

async def handler(req, state: State):
    # Log levels
    state.logger.info("Information message")
    state.logger.error("Error message")
    state.logger.warning("Warning message")
    state.logger.warn("Warning message (alias)")
    state.logger.debug("Debug message")
    state.logger.trace("Trace message")
    
    # With additional fields
    state.logger.info("User action", user_id=123, action="login")
```

```typescript
import { State } from "../generated/state";

export async function handler(req: any, state: State) {
  // Log levels
  state.logger.info("Information message");
  state.logger.error("Error message");
  state.logger.warning("Warning message");
  state.logger.warn("Warning message (alias)");
  state.logger.debug("Debug message");
  state.logger.trace("Trace message");
  
  // With additional fields
  state.logger.info("User action", { userId: 123, action: "login" });
}
```

### Event Triggering

#### Manual Event Triggering

Use `trigger_event()` for events **NOT** defined in the schema's `triggers` list:

```python
from generated.state import State

async def handler(req, state: State):
    # Trigger an event manually
    state.trigger_event("CustomEvent", {
        "data": "value",
        "timestamp": datetime.now().isoformat()
    })
```

```typescript
import { State } from "../generated/state";

export async function handler(req: any, state: State) {
  // Trigger an event manually
  state.triggerEvent("CustomEvent", {
    data: "value",
    timestamp: new Date().toISOString()
  });
}
```

#### Auto-Triggered Events

Use `set_payload()` for events **defined** in the schema's `triggers` list:

```rohas
api CreateUser {
  method: POST
  path: "/users"
  body: CreateUserInput
  response: User
  triggers: [UserCreated, WelcomeEmailSent]
}
```

```python
from generated.api.CreateUser import CreateUserRequest, CreateUserResponse
from generated.state import State

async def handle_create_user(req: CreateUserRequest, state: State) -> CreateUserResponse:
    user = create_user(req.body)
    
    # Set payload for auto-triggered events (defined in schema)
    state.set_payload("UserCreated", {
        "id": user.id,
        "name": user.name,
        "email": user.email
    })
    
    # Can also manually trigger other events
    state.trigger_event("AnalyticsEvent", {"action": "user_created"})
    
    return CreateUserResponse(data=user)
```

```typescript
import { CreateUserRequest, CreateUserResponse } from "../generated/api/CreateUser";
import { State } from "../generated/state";

export async function handler(
  req: CreateUserRequest,
  state: State
): Promise<CreateUserResponse> {
  const user = createUser(req.body);
  
  // Set payload for auto-triggered events (defined in schema)
  state.setPayload("UserCreated", {
    id: user.id,
    name: user.name,
    email: user.email
  });
  
  // Can also manually trigger other events
  state.triggerEvent("AnalyticsEvent", { action: "user_created" });
  
  return { data: user };
}
```

## Complete Examples

### API Handler with All Features

```python
from generated.api.GetUserPosts import GetUserPostsRequest, GetUserPostsResponse
from generated.state import State

async def handle_get_user_posts(
    req: GetUserPostsRequest,
    state: State
) -> GetUserPostsResponse:
    # Path parameter: /users/:userId/posts
    user_id = req.userId
    
    # Query parameters: ?limit=10&offset=0&sort=created_at
    limit = int(req.query_params.get("limit", "10"))
    offset = int(req.query_params.get("offset", "0"))
    sort_by = req.query_params.get("sort", "created_at")
    
    # Logging
    state.logger.info(f"Fetching posts for user {user_id}", {
        "limit": limit,
        "offset": offset
    })
    
    # Business logic
    posts = fetch_user_posts(user_id, limit=limit, offset=offset, sort_by=sort_by)
    
    # Trigger analytics event
    state.trigger_event("PostsViewed", {
        "user_id": user_id,
        "count": len(posts)
    })
    
    return GetUserPostsResponse(data=posts)
```

```typescript
import { GetUserPostsRequest, GetUserPostsResponse } from "../generated/api/GetUserPosts";
import { State } from "../generated/state";

export async function handler(
  req: GetUserPostsRequest,
  state: State
): Promise<GetUserPostsResponse> {
  // Path parameter: /users/:userId/posts
  const userId = req.userId;
  
  // Query parameters: ?limit=10&offset=0&sort=created_at
  const limit = parseInt(req.queryParams?.limit || "10");
  const offset = parseInt(req.queryParams?.offset || "0");
  const sortBy = req.queryParams?.sort || "created_at";
  
  // Logging
  state.logger.info(`Fetching posts for user ${userId}`, {
    limit,
    offset
  });
  
  // Business logic
  const posts = fetchUserPosts(userId, { limit, offset, sortBy });
  
  // Trigger analytics event
  state.triggerEvent("PostsViewed", {
    userId,
    count: posts.length
  });
  
  return { data: posts };
}
```

## Generated Types

All types are auto-generated in `src/generated/` when you run `rohas codegen`. **Do not edit these files manually.**

The generated types include:
- Request/Response types for APIs
- Event payload types
- State and Logger classes
- Handler function signatures

