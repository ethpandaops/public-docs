---
sidebar_position: 1
---


import RelatedLinks from '@site/src/components/RelatedLinks';

# Checkpointz

<RelatedLinks 
  githubRepo="ethpandaops/checkpointz"/>


Checkpointz is an Ethereum beacon chain checkpoint sync provider that facilitates fast synchronization of new consensus clients by providing recent finalized state checkpoints.

## What is Checkpointz?

Checkpointz solves the problem of slow initial synchronization for Ethereum consensus clients by providing recent finalized state checkpoints. Instead of processing the entire beacon chain from genesis, clients can start from a trusted checkpoint, dramatically reducing sync time from days to minutes.

## Key Features

- **Fast Checkpoint Sync**: Provide recent finalized state checkpoints for consensus clients
- **Multiple Network Support**: Works with mainnet, testnets, and custom networks
- **Client Compatibility**: Compatible with major Ethereum consensus clients
- **Caching**: Efficient caching of checkpoint data for fast retrieval
- **Load Balancing**: Distribute checkpoint requests across multiple beacon nodes
- **Metrics and Monitoring**: Prometheus metrics for monitoring service health
- **API Access**: RESTful API for programmatic access to checkpoint data

## Integration with Other Tools

Checkpointz works well with other ethPandaOps tools:

- **Dugtrio**: Use alongside Checkpointz for complete node connectivity solutions
- **Kurtosis**: Include Checkpointz in local development networks
- **Metrics-exporter**: Monitor Checkpointz alongside other Ethereum services

## Use Cases

- **Node Operators**: Fast bootstrap of new consensus clients
- **Development Environments**: Quickly setup synced development nodes
- **Disaster Recovery**: Rapidly recover nodes after failures
- **Network Scaling**: Efficiently onboard new nodes during network growth
- **Public Service**: Provide a public checkpoint sync service for the community

## Performance Considerations

- Ensure sufficient bandwidth for serving checkpoint states (100MB+ per request)
- Consider implementing a CDN for high-traffic deployments
- Use multiple upstream beacon nodes for redundancy
- Enable caching to reduce load on beacon nodes

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/checkpointz) 