---
sidebar_position: 2
---


import RelatedLinks from '@site/src/components/RelatedLinks';

# Mempool-bridge

<RelatedLinks 
  githubRepo="ethpandaops/mempool-bridge"
  links={[
    {
      name: "Ethereum Transaction Pool",
      url: "https://ethereum.org/en/developers/docs/gas/#mempool"
    },
  ]}
/>


Mempool Bridge is a specialized tool that forwards transactions between Ethereum execution layer nodes, enabling cross-node mempool synchronization and transaction propagation analysis.

## What is Mempool Bridge?

Mempool Bridge acts as a connector between Ethereum execution layer nodes, facilitating the sharing of pending transactions between mempools. This tool is particularly valuable for network analysis, transaction propagation studies, and ensuring consistency across nodes in testing environments. By providing a controlled way to forward transactions between otherwise isolated nodes, Mempool Bridge helps researchers and developers better understand and optimize transaction handling in Ethereum networks.

## Key Features

- **Bidirectional Transaction Forwarding**: Send transactions between node mempools in both directions
- **Selective Filtering**: Forward only transactions matching specific criteria
- **Rate Limiting**: Control the flow of transactions to prevent node overloading
- **Transaction Transformation**: Optionally modify transaction parameters during forwarding
- **Monitoring**: Track statistics on transaction forwarding and propagation
- **Multiple Node Support**: Connect multiple nodes in various topologies
- **Custom Rules**: Define complex forwarding logic with scriptable rules

## Bridge Topologies

Mempool Bridge supports various network topologies:

### One-way Bridge
Forward transactions from one node to another

### Bidirectional Bridge
Exchange transactions between two nodes

### Star Topology
Forward transactions from a central node to multiple edge nodes

### Mesh Network
Connect multiple nodes in a complex mesh

## Transaction Filtering

Mempool Bridge allows filtering transactions based on various criteria:

- **Gas Price**: Only forward transactions within a specific gas price range
- **Gas Limit**: Filter based on transaction gas limit
- **Sender Address**: Only forward transactions from specific senders
- **Recipient Address**: Only forward transactions to specific recipients
- **Transaction Type**: Filter by transaction type (legacy, EIP-1559, etc.)
- **Contract Interaction**: Identify and filter contract interaction transactions

## Integration with Other Tools

Mempool Bridge works well with other ethPandaOps tools:

- **Spamoor**: Generate transactions on one node and observe propagation through Mempool Bridge
- **Assertoor**: Test transaction propagation behavior with validation
- **Kurtosis**: Include Mempool Bridge in test network topologies

## Use Cases

- **Transaction Propagation Research**: Study how transactions spread through the network
- **MEV Analysis**: Track transaction ordering and inclusion
- **Client Testing**: Compare transaction handling between different client implementations
- **Network Simulation**: Create realistic network conditions for testing
- **Testnet Operations**: Ensure transaction distribution across testnet nodes

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/mempool-bridge)
- [Ethereum Transaction Pool](https://ethereum.org/en/developers/docs/gas/#mempool) 