# Telemetry

Rohas provides comprehensive observability through telemetry, including traces, metrics, and logs. This enables you to monitor, debug, and optimize your event-driven applications.

## Overview

Telemetry in Rohas collects:
- **Traces**: Distributed tracing across handlers and events
- **Metrics**: Performance metrics (latency, throughput, errors)
- **Logs**: Structured logging from handlers and the engine

## Configuration

Configure telemetry in `config/rohas.toml`:

```toml
[telemetry]
# Adapter type: rocksdb (default), prometheus, influxdb, timescaledb
type = "rocksdb"
# Path to telemetry storage (relative to project root or absolute)
path = ".rohas/telemetry"
# Retention period for traces in days (0 = keep forever)
retention_days = 30
# Maximum number of traces to keep in memory cache
max_cache_size = 1000
# Enable metrics collection
enable_metrics = true
# Enable logs collection
enable_logs = true
# Enable traces collection
enable_traces = true
```

## Storage Adapters

### RocksDB (Default)

Embedded key-value database for local telemetry storage.

**Features:**
- High write performance
- Compression support
- Local persistence
- No external dependencies

**Configuration:**
```toml
[telemetry]
type = "rocksdb"
path = ".rohas/telemetry"
retention_days = 30
```

**Use cases:**
- Development
- Single-instance deployments
- Local persistence

### Prometheus

Export metrics to Prometheus for monitoring and alerting.

**Features:**
- Standard Prometheus format
- Pull-based metrics
- Integration with Grafana
- Rich query language

**Configuration:**
```toml
[telemetry]
type = "prometheus"
endpoint = "http://localhost:9090"
```

**Note:** Prometheus adapter is planned but not yet implemented.

### InfluxDB

Store telemetry data in InfluxDB time-series database.

**Features:**
- Time-series optimized
- High write throughput
- Retention policies
- Downsampling support

**Configuration:**
```toml
[telemetry]
type = "influxdb"
url = "http://localhost:8086"
database = "rohas"
retention_policy = "30d"
```

**Note:** InfluxDB adapter is planned but not yet implemented.

### TimescaleDB

Store telemetry in TimescaleDB (PostgreSQL extension).

**Features:**
- SQL interface
- Time-series optimization
- Full PostgreSQL features
- Easy querying

**Configuration:**
```toml
[telemetry]
type = "timescaledb"
connection_string = "postgresql://user:pass@localhost/rohas"
```

**Note:** TimescaleDB adapter is planned but not yet implemented.

## Traces

Distributed tracing tracks requests and events across the system.

### Trace Structure

Each trace contains:
- **Trace ID**: Unique identifier
- **Span ID**: Individual operation identifier
- **Parent Span ID**: Parent operation (for nesting)
- **Operation Name**: Handler or event name
- **Start/End Time**: Execution timing
- **Tags**: Metadata (handler type, language, etc.)
- **Logs**: Structured log entries

### Trace Collection

Traces are automatically collected for:
- API handler executions
- Event handler executions
- Cron job executions
- WebSocket operations

### Accessing Traces

Traces are stored and can be queried via:
- Workbench UI (development)
- Telemetry API endpoints
- Direct database queries (RocksDB)

## Metrics

Performance metrics provide insights into system behavior.

### Collected Metrics

**Handler Metrics:**
- `handler.execution.count` - Total executions
- `handler.execution.duration` - Execution time (ms)
- `handler.execution.errors` - Error count
- `handler.execution.success` - Success count

**Event Metrics:**
- `event.published.count` - Events published
- `event.handled.count` - Events handled
- `event.handled.duration` - Handling time (ms)

**System Metrics:**
- `system.memory.usage` - Memory usage
- `system.cpu.usage` - CPU usage
- `system.active.handlers` - Active handler count

### Metric Labels

Metrics include labels for filtering:
- `handler_name` - Handler identifier
- `handler_type` - api, event, cron, websocket
- `language` - typescript, python, rust
- `status` - success, error

## Logs

Structured logging captures events and errors.

### Log Levels

- **TRACE**: Detailed debugging information
- **DEBUG**: Debug information
- **INFO**: General information
- **WARN**: Warning messages
- **ERROR**: Error messages

### Log Format

Logs are stored as structured JSON:

```json
{
  "timestamp": "2024-01-01T00:00:00Z",
  "level": "INFO",
  "message": "Handler executed",
  "handler": "CreateUser",
  "trace_id": "...",
  "metadata": {
    "execution_time_ms": 45,
    "status": "success"
  }
}
```

## Workbench Integration

The Workbench UI provides:
- Real-time trace visualization
- Metric dashboards
- Log viewer
- Performance analysis
- Error tracking

Access via: `http://localhost:3000/workbench`

## Retention Policies

Configure data retention to manage storage:

```toml
[telemetry]
retention_days = 30  # Keep data for 30 days
```

- `0` = Keep forever
- `> 0` = Delete after N days

## Performance Considerations

### RocksDB

- High write performance
- Compression reduces storage
- Tune buffer sizes for your workload

### Memory Cache

```toml
[telemetry]
max_cache_size = 1000  # Keep 1000 traces in memory
```

Larger cache improves query performance but uses more memory.

## Querying Telemetry

### Via Workbench

Use the Workbench UI to:
- View recent traces
- Search logs
- Analyze metrics
- Debug issues

### Via API

Telemetry endpoints (when enabled):
- `GET /telemetry/traces` - List traces
- `GET /telemetry/traces/:id` - Get trace details
- `GET /telemetry/metrics` - Get metrics
- `GET /telemetry/logs` - Query logs

## Best Practices

1. **Enable in Production**: Always enable telemetry in production
2. **Set Retention**: Configure appropriate retention policies
3. **Monitor Storage**: Monitor telemetry storage usage
4. **Use Labels**: Add meaningful labels to metrics
5. **Structured Logs**: Use structured logging for better querying
6. **Trace Sampling**: Consider sampling for high-volume systems
7. **Alerting**: Set up alerts based on metrics

## Troubleshooting

### High Storage Usage

**Issue**: Telemetry storage growing too large

**Solutions:**
- Reduce `retention_days`
- Enable compression (RocksDB)
- Use external storage (Prometheus, InfluxDB)
- Implement data archival

### Performance Impact

**Issue**: Telemetry affecting application performance

**Solutions:**
- Reduce `max_cache_size`
- Use async telemetry collection
- Disable unnecessary telemetry types
- Use external storage adapters

### Missing Traces

**Issue**: Traces not appearing

**Solutions:**
- Verify telemetry is enabled
- Check storage path permissions
- Review retention settings
- Check for errors in logs

## Next Steps

- Explore [Workbench](/docs/workbench)
- Learn about [Configuration](/docs/configuration)
- Read [Architecture](/docs/architecture)

