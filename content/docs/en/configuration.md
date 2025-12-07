# Configuration

Configure your Rohas project using `config/rohas.toml`.

## Configuration File Structure

```toml
[project]
name = "my-app"
version = "0.1.0"
language = "typescript"  # or "python" or "rust"

[server]
host = "127.0.0.1"
port = 3000
enable_cors = true

[adapter]
type = "memory"  # memory, nats, kafka, rabbitmq, sqs
buffer_size = 1000

[telemetry]
type = "rocksdb"
path = ".rohas/telemetry"
retention_days = 30
max_cache_size = 1000
enable_metrics = true
enable_logs = true
enable_traces = true

[workbench]
allowed_origins = []
api_key = "your-api-key"
```

## Project Settings

### `name`

Project name identifier.

### `version`

Project version (semver format).

### `language`

Runtime language: `typescript`, `python`, or `rust`.

## Server Settings

### `host`

Server bind address (default: 127.0.0.1).

### `port`

Server port (default: 3000).

### `enable_cors`

Enable CORS headers (default: true).

## Adapter Settings

See the [Event Adapters](/docs/adapters) documentation for adapter-specific configuration options.

## Telemetry Settings

### `type`

Telemetry adapter: `rocksdb`, `prometheus`, `influxdb`, or `timescaledb`.

### `retention_days`

Number of days to retain traces (0 = keep forever).

