---
sidebar_position: 3
---


import RelatedLinks from '@site/src/components/RelatedLinks';

# Metrics-exporter

<RelatedLinks 
  githubRepo="ethpandaops/ethereum-metrics-exporter"/>


Ethereum Metrics Exporter is a Prometheus exporter for Ethereum execution and consensus clients, providing comprehensive metrics for monitoring node performance and network health.

## What is Ethereum Metrics Exporter?

Ethereum Metrics Exporter bridges the gap between Ethereum clients and monitoring systems by collecting and exposing metrics in Prometheus format. It connects to both execution and consensus layer clients, extracts key operational data, and transforms it into metrics that can be collected by Prometheus and visualized in dashboards. This enables node operators to efficiently monitor their infrastructure and detect issues before they impact performance.

## Key Features

- **Dual-Layer Monitoring**: Collect metrics from both execution and consensus clients
- **Client Agnostic**: Support for all major Ethereum client implementations
- **Custom Metrics**: Derive higher-level metrics from raw client data
- **Low Overhead**: Minimal impact on client performance
- **Alert Integration**: Ready-to-use alerting rules for Prometheus Alertmanager
- **Dashboard Templates**: Pre-configured Grafana dashboards
- **Extensible**: Easy to add new metrics collection
- **Historical Data**: Track changes in metrics over time

## Available Metrics

The exporter provides metrics in several categories:

### Execution Client Metrics

- **Sync Status**: Block height, sync progress, sync peers
- **Transaction Pool**: Pending and queued transactions
- **Node Performance**: Block processing time, CPU and memory usage
- **Network**: Peer count, bandwidth usage, peer distribution
- **Gas**: Gas price statistics, block gas usage

### Consensus Client Metrics

- **Sync Status**: Slot height, sync progress, head distance
- **Validators**: Active validators, slashed validators, balance distribution
- **Consensus**: Participation rate, missed slots, orphaned blocks
- **Finality**: Time to finality, finalized epoch, justified epoch
- **Peer Network**: Peer count, subnet distribution, bandwidth usage

## Integration with Other Tools

Ethereum Metrics Exporter works well with other ethPandaOps tools:

- **Lab**: Visualize metrics alongside other network data
- **Assertoor**: Use metrics for test validation
- **Checkpointz**: Monitor checkpoint sync operations
- **Dugtrio**: Track load balancing efficiency with client metrics

## Use Cases

- **Node Operation**: Monitor the health and performance of Ethereum nodes
- **Staking Operation**: Track validator performance and rewards
- **Network Analysis**: Compare metrics across different client implementations
- **SLA Monitoring**: Ensure nodes meet service level agreements
- **Capacity Planning**: Identify resource constraints and plan upgrades

## Best Practices

- Monitor both execution and consensus clients for complete visibility
- Set up alerting for critical metrics
- Retain historical data to identify trends
- Compare with network averages to spot local issues
- Use dashboard templates as starting points, then customize

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/ethereum-metrics-exporter) 