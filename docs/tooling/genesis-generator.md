---
sidebar_position: 3
---

# Ethereum Genesis Generator

:::tip GitHub Repository
Visit the [Ethereum Genesis Generator repository](https://github.com/ethpandaops/ethereum-genesis-generator) for the latest code, documentation, and contribution guidelines.
:::

The Ethereum Genesis Generator is a tool for creating customized genesis states for Ethereum networks, enabling developers to easily configure and launch test networks with specific parameters.

## What is the Ethereum Genesis Generator?

The Ethereum Genesis Generator simplifies the process of creating the initial state (genesis) for Ethereum networks. This is particularly useful for setting up test networks, development environments, and simulation scenarios with customized parameters. The tool automates the complex process of generating valid genesis files for both the execution layer and consensus layer.

## Key Features

- **Customizable Genesis State**: Configure key parameters like chain ID, gas limit, and initial allocations
- **Consensus Layer Configuration**: Generate beacon state with customized validator sets
- **Multi-client Support**: Output formats compatible with various Ethereum clients
- **Validator Generation**: Create validator keystores for testing
- **Network Presets**: Built-in presets for common test network configurations
- **Reproducible Results**: Deterministic generation for consistent test environments

## Configuration Options

### Execution Layer Parameters

- **Chain ID**: Unique identifier for the blockchain
- **Gas Limit**: Block gas limit
- **Base Fee**: Initial base fee for EIP-1559
- **Initial Allocations**: Accounts and their starting balances
- **Fork Configurations**: Timestamps for various protocol upgrades

### Consensus Layer Parameters

- **Validator Count**: Number of initial validators
- **Genesis Time**: Unix timestamp for the genesis block
- **Consensus Preset**: Configuration preset (mainnet, minimal, etc.)
- **Fork Versions**: Custom fork version bytes

## Integration with Other Tools

The Ethereum Genesis Generator works well with other ethPandaOps tools:

- **Kurtosis**: Use generated genesis files with Kurtosis for local development networks
- **Assertoor**: Test networks initialized with custom genesis states
- **Protocol-devnets**: Launch custom devnets for protocol testing

## Use Cases

- **Local Development**: Create custom networks for dApp development
- **Protocol Testing**: Test protocol changes with controlled genesis parameters
- **Client Testing**: Verify client compatibility with specific genesis configurations
- **Research**: Study network behavior with different initial conditions

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/ethereum-genesis-generator) 