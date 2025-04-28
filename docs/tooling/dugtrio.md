---
sidebar_position: 2
---

# Dugtrio

:::tip GitHub Repository
Visit the [Dugtrio repository](https://github.com/ethpandaops/dugtrio) for the latest code, documentation, and contribution guidelines.
:::

Dugtrio is a specialized load balancing proxy designed specifically for the Ethereum beacon chain, enabling efficient distribution of requests across multiple beacon nodes.

## What is Dugtrio?

Dugtrio serves as a high-performance load balancer and proxy for Ethereum consensus layer (beacon chain) nodes. It intelligently routes API requests to multiple upstream beacon nodes, providing enhanced reliability, load distribution, and improved response times. Named after the Pokémon that moves efficiently underground, Dugtrio helps beacon chain requests find the fastest path to their destination.

## Key Features

- **Smart Request Routing**: Intelligently direct requests to the most appropriate beacon node
- **Health Checking**: Continuously monitor upstream nodes and route around unhealthy instances
- **Request Caching**: Cache frequent requests to reduce load on upstream nodes
- **API Compatibility**: Full support for the Ethereum beacon API specification
- **Load Distribution**: Evenly distribute requests across multiple upstream nodes
- **Circuit Breaking**: Protect upstream nodes from excessive load
- **Metrics and Monitoring**: Comprehensive Prometheus metrics for monitoring
- **High Availability**: Designed for mission-critical beacon chain operations

## Routing Strategies

Dugtrio supports several routing strategies:

- **Round Robin**: Distribute requests evenly across all upstreams
- **Weighted**: Distribute based on assigned weights
- **Fastest Response**: Route to the node with the lowest recent latency
- **Cached**: Cache responses to reduce load on upstream nodes
- **Failover**: Use a priority order of upstreams, falling back as needed

## Integration with Other Tools

Dugtrio works well with other ethPandaOps tools:

- **Checkpointz**: Use Dugtrio to load balance checkpoint state requests
- **Metrics-exporter**: Monitor Dugtrio alongside other Ethereum services
- **Kurtosis**: Include Dugtrio in development environments for resilient API access

## Use Cases

- **Public API Services**: Provide reliable API access to multiple users
- **Validator Operations**: Ensure validator clients always have access to a healthy beacon node
- **Development Infrastructure**: Create resilient development environments
- **Node Operator Infrastructure**: Manage multiple beacon nodes efficiently
- **Staking Operations**: Ensure reliable beacon chain access for staking services

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/dugtrio) 