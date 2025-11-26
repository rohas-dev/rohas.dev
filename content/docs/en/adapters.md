# Event Adapters

Event adapters connect Rohas to various message brokers and event systems. Adapters handle the pub/sub messaging layer that enables event-driven communication between components.

## Overview

Adapters abstract the underlying message broker implementation, allowing you to:
- Switch between different brokers without code changes
- Use in-memory adapter for development
- Use production-grade brokers (Kafka, RabbitMQ, etc.) in production
- Support multiple adapters for different use cases

## Available Adapters

### Memory Adapter (Default)

In-memory event bus using Rust's broadcast channels. Perfect for development, testing, and single-instance deployments.

**Features:**
- Zero external dependencies
- Fast in-memory messaging
- Automatic topic creation
- Configurable buffer size
- No persistence (messages lost on restart)

**Configuration:**
```toml
[adapter]
type = "memory"
buffer_size = 1000  # Maximum messages per topic
```

**Use cases:**
- Local development
- Testing
- Single-instance applications
- Prototyping

**Limitations:**
- No persistence
- Single process only
- No message durability

### NATS Adapter

Connect to NATS messaging system for high-performance, cloud-native event streaming.

**Features:**
- High throughput
- Low latency
- Clustering support
- Subject-based routing
- JetStream for persistence (optional)

**Configuration:**
```toml
[adapter]
type = "nats"
url = "nats://localhost:4222"
# Optional: JetStream configuration
jetstream = true
```

**Use cases:**
- Microservices architectures
- High-throughput systems
- Cloud-native applications
- Real-time event streaming

**Requirements:**
- NATS server running
- Network access to NATS server

### Kafka Adapter

Connect to Apache Kafka for distributed event streaming at enterprise scale.

**Features:**
- Distributed and scalable
- High durability
- Partitioning support
- Consumer groups
- Exactly-once semantics

**Configuration:**
```toml
[adapter]
type = "kafka"
brokers = ["localhost:9092"]
# Optional: Topic configuration
topic_prefix = "rohas"
```

**Use cases:**
- Large-scale event streaming
- Event sourcing
- Data pipelines
- Multi-consumer scenarios

**Requirements:**
- Kafka cluster running
- Network access to brokers

### RabbitMQ Adapter

Connect to RabbitMQ message broker for reliable message queuing with advanced routing.

**Features:**
- Reliable message delivery
- Advanced routing (exchanges, queues)
- Message acknowledgments
- Dead letter queues
- Management UI

**Configuration:**
```toml
[adapter]
type = "rabbitmq"
url = "amqp://guest:guest@localhost:5672"
# Optional: Exchange configuration
exchange = "rohas_events"
exchange_type = "topic"
```

**Use cases:**
- Reliable message delivery
- Complex routing requirements
- Traditional message queuing
- Enterprise integrations

**Requirements:**
- RabbitMQ server running
- Network access to RabbitMQ

### AWS SQS Adapter

Connect to Amazon Simple Queue Service for cloud-native message queuing on AWS.

**Features:**
- Fully managed service
- Auto-scaling
- Dead letter queues
- Long polling
- FIFO queues support

**Configuration:**
```toml
[adapter]
type = "sqs"
region = "us-east-1"
# Optional: Queue configuration
queue_prefix = "rohas-"
fifo = false
```

**Use cases:**
- AWS-native applications
- Serverless architectures
- Cloud deployments
- Managed message queuing

**Requirements:**
- AWS account
- IAM credentials configured
- Network access to AWS

### RocksDB Adapter

Persistent event storage using RocksDB. Useful for telemetry, event replay, and local persistence.

**Features:**
- Embedded database
- High write performance
- Compression support
- Key-value storage
- Local persistence

**Configuration:**
```toml
[adapter]
type = "rocksdb"
path = ".rohas/events"
# Optional: Performance tuning
write_buffer_size = 67108864  # 64MB
max_write_buffer_number = 3
```

**Use cases:**
- Event replay
- Telemetry storage
- Local persistence
- Development with persistence

**Note:** This adapter is primarily used for telemetry storage, not as the main event bus.

## Configuration

Configure adapters in `config/rohas.toml`:

```toml
[adapter]
type = "memory"  # or "nats", "kafka", "rabbitmq", "sqs", "rocksdb"
buffer_size = 1000  # For memory adapter
```

### Adapter-Specific Configuration

Each adapter may have additional configuration options:

**NATS:**
```toml
[adapter]
type = "nats"
url = "nats://localhost:4222"
jetstream = true
```

**Kafka:**
```toml
[adapter]
type = "kafka"
brokers = ["localhost:9092"]
topic_prefix = "rohas"
```

**RabbitMQ:**
```toml
[adapter]
type = "rabbitmq"
url = "amqp://user:pass@localhost:5672"
exchange = "rohas_events"
```

**SQS:**
```toml
[adapter]
type = "sqs"
region = "us-east-1"
queue_prefix = "rohas-"
```

## Choosing an Adapter

### Development
- **Memory**: Fastest, no setup required

### Production - Small Scale
- **Memory**: Single instance, no persistence needed
- **RocksDB**: Local persistence required

### Production - Medium Scale
- **RabbitMQ**: Reliable, feature-rich
- **NATS**: High performance, simple

### Production - Large Scale
- **Kafka**: Distributed, high throughput
- **NATS JetStream**: Cloud-native, scalable

### Cloud Deployments
- **AWS SQS**: AWS-native applications
- **Kafka**: Multi-cloud or on-premises

## Adapter Interface

All adapters implement the same interface:

```rust
pub trait MessageAdapter {
    async fn publish(&self, topic: &str, payload: Value) -> Result<()>;
    async fn subscribe(&self, topic: &str, handler: Handler) -> Result<()>;
}
```

This abstraction allows switching adapters without code changes.

## Message Format

All adapters use a consistent message format:

```json
{
  "topic": "UserCreated",
  "payload": { ... },
  "timestamp": "2024-01-01T00:00:00Z",
  "metadata": {
    "trace_id": "...",
    "source": "api"
  }
}
```

## Best Practices

1. **Development**: Use memory adapter for speed
2. **Testing**: Use memory adapter for isolation
3. **Production**: Choose based on scale and requirements
4. **Monitoring**: Monitor adapter health and message throughput
5. **Error Handling**: Configure dead letter queues where supported
6. **Scaling**: Consider adapter-specific scaling strategies

## Troubleshooting

### Memory Adapter
- **Issue**: Messages lost on restart
- **Solution**: Use persistent adapter for production

### NATS/Kafka/RabbitMQ
- **Issue**: Connection failures
- **Solution**: Check network connectivity and credentials

### SQS
- **Issue**: Authentication errors
- **Solution**: Verify AWS credentials and IAM permissions

## Next Steps

- Learn about [Event System](/docs/schemas#events)
- Explore [Configuration](/docs/configuration)
- Read [Architecture](/docs/architecture)

