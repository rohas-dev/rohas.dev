# Roadmap

This roadmap outlines the planned features and improvements for Rohas. We're committed to building a robust, production-ready event-driven application framework.

## Current Status (v0.1.0)

Rohas currently provides:

- ✅ Schema-driven development with `.ro` files
- ✅ Multi-runtime support (Python, TypeScript)
- ✅ Event adapters (Memory, NATS, Kafka, RabbitMQ, SQS, RocksDB)
- ✅ Code generation for type-safe handlers
- ✅ HTTP API routing and WebSocket support
- ✅ Cron job scheduling
- ✅ Basic telemetry (RocksDB backend)
- ✅ Development server with hot reload
- ✅ CLI tooling
- ✅ Workbench UI for development

## Q1 2025 - Core Stability

### Runtime Improvements

**TypeScript Runtime**
- [ ] Stabilize TypeScript runtime for production use
- [ ] Improve error handling and debugging
- [ ] Better module resolution and dependency management
- [ ] Enhanced type safety in generated code
- [ ] Performance optimizations

**Python Runtime**
- [ ] Async handler improvements
- [ ] Better error messages and stack traces
- [ ] Module caching optimizations
- [ ] Support for Python 3.12+ features

### Schema Enhancements

- [ ] Support for nested models and complex types
- [ ] Schema validation improvements
- [ ] Better error messages for schema errors
- [ ] Schema versioning support
- [ ] Import/include directives for schema organization

### Code Generation

- [ ] Improved code generation templates
- [ ] Better TypeScript type definitions
- [ ] Python type hints improvements
- [ ] Support for additional languages (Go, Rust)
- [ ] Custom code generation templates

## Q2 2025 - Production Features

### Telemetry & Observability

**Storage Adapters**
- [ ] Prometheus adapter for metrics
- [ ] InfluxDB adapter for time-series data
- [ ] TimescaleDB adapter for SQL-based storage
- [ ] OpenTelemetry integration
- [ ] Distributed tracing improvements

**Monitoring**
- [ ] Real-time metrics dashboard
- [ ] Alerting system
- [ ] Performance profiling tools
- [ ] Better log aggregation
- [ ] Trace sampling for high-volume systems

### Event Adapters

**New Adapters**
- [ ] Redis Streams adapter
- [ ] PostgreSQL LISTEN/NOTIFY adapter
- [ ] Google Cloud Pub/Sub adapter
- [ ] Azure Service Bus adapter
- [ ] Apache Pulsar adapter

**Adapter Improvements**
- [ ] Better error handling and retry logic
- [ ] Connection pooling
- [ ] Message ordering guarantees
- [ ] Dead letter queue support
- [ ] At-least-once delivery semantics

### Deployment & Operations

- [ ] Docker images and containerization
- [ ] Kubernetes deployment guides
- [ ] Production configuration best practices
- [ ] Health check endpoints
- [ ] Graceful shutdown handling
- [ ] Resource limits and quotas

## Q3 2025 - Advanced Features

### Workflow Engine

- [ ] Visual workflow builder in Workbench
- [ ] Workflow orchestration
- [ ] State management for workflows
- [ ] Workflow versioning
- [ ] Workflow testing tools
- [ ] Conditional branching in workflows

### Testing Framework

- [ ] Unit testing utilities
- [ ] Integration testing framework
- [ ] Mock event adapters for testing
- [ ] Test fixtures and helpers
- [ ] Coverage reporting
- [ ] Performance benchmarking tools

### Security

- [ ] Authentication and authorization
- [ ] API key management
- [ ] Rate limiting
- [ ] Input validation and sanitization
- [ ] Secrets management
- [ ] Audit logging

### Performance

- [ ] Handler execution optimization
- [ ] Event batching
- [ ] Connection pooling improvements
- [ ] Memory usage optimization
- [ ] CPU profiling tools
- [ ] Benchmark suite

## Q4 2025 - Ecosystem & Community

### Developer Experience

- [ ] VS Code extension
- [ ] Language server protocol (LSP)
- [ ] Better CLI commands
- [ ] Project templates and examples
- [ ] Migration tools
- [ ] Interactive tutorials

### Documentation

- [ ] Comprehensive API reference
- [ ] Video tutorials
- [ ] Best practices guide
- [ ] Architecture decision records (ADRs)
- [ ] Performance tuning guide
- [ ] Troubleshooting guide

### Community

- [ ] Plugin system for extensions
- [ ] Community adapter registry
- [ ] Example gallery
- [ ] Community templates
- [ ] Contributing guidelines improvements
- [ ] Community forums or Discord

## Future Considerations

### Long-term Vision

**Multi-language Support**
- [ ] Go runtime
- [ ] Rust runtime
- [ ] Java runtime
- [ ] Ruby runtime

**Advanced Features**
- [ ] GraphQL API generation
- [ ] gRPC support
- [ ] Event sourcing patterns
- [ ] CQRS support
- [ ] Saga pattern implementation
- [ ] Distributed transactions

**Cloud & Infrastructure**
- [ ] Serverless deployment
- [ ] Cloud-native features
- [ ] Auto-scaling
- [ ] Multi-region support
- [ ] Edge computing support

**AI & ML Integration**
- [ ] AI-powered code suggestions
- [ ] Automated testing with AI
- [ ] Performance optimization suggestions
- [ ] Anomaly detection in telemetry

## Contributing

We welcome contributions! If you're interested in working on any of these features:

1. Check our [Contributing Guide](https://github.com/rohas-dev/rohas/blob/main/CONTRIBUTING.md)
2. Join our community discussions
3. Open an issue to discuss your ideas
4. Submit a pull request

## Feedback

Have ideas or suggestions? We'd love to hear from you:

- Open an issue on [GitHub](https://github.com/rohas-dev/rohas)
- Join community discussions
- Reach out to the maintainers

---

**Note:** This roadmap is subject to change based on community feedback and priorities. Dates are estimates and may shift.

