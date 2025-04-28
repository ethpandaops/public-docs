---
sidebar_position: 5
---

# Assertoor

:::tip GitHub Repository
Visit the [Assertoor repository](https://github.com/ethpandaops/assertoor) for the latest code, documentation, and contribution guidelines.
:::

Assertoor is a robust and versatile tool designed for comprehensive testing of Ethereum networks. It orchestrates a series of tests from YAML-based configurations, with each test comprising a sequence of tasks executed in a defined order to assess various aspects of the Ethereum network.

## What is Assertoor?

Assertoor, drawing its name from its primary function—asserting conditions—simplifies everything from routine checks (e.g., whether all clients are proposing blocks and overall network health) to more intricate processes such as the handling of deposits, exits, and similar transactions.

Think of Assertoor as an end-to-end, cross-client integration testing tool that operates at a higher abstraction level than Hive, excelling as a test orchestrator that leverages YAML files to manage a series of tests.

## Key Features

- **Connection to Ethereum Clients**: Connects to multiple Consensus and Execution Clients via their HTTP RPC API, ensuring compatibility with all clients and providing a resilient view of the network status.

- **YAML-Based Test & Task Definition**: Tests, defined and executed through YAML, can include tasks specified in the test configuration or sideloaded from external URLs, offering flexible and organized test management.

- **Task Orchestrator**: Enables execution of tasks in a predefined order, supporting both parallelization and sequential steps with dependencies.

- **Versatile Task Capabilities**: Includes tasks ranging from simple shell scripts to complex built-in logic, such as:
  - **Generating Transactions**: Simulating transaction types to test network response and throughput.
  - **Generating Deposits & Exits**: Evaluating network handling of deposit and exit transactions.
  - **Generating BLS Changes**: Testing network capability to process BLS signature changes.
  - **Checking Network Stability**: Assessing network resilience under various conditions.
  - **Checking Forks & Reorgs**: Analyzing network behavior during forks and reorganizations.
  - **Checking Block Properties**: Testing for specific block properties.

- **Web Interface for Monitoring**: A user-friendly web interface displays real-time test and task status, logs, and results for easy monitoring and analysis.

- **Web API**: An API interface provides real-time test and task status, logs, and results for easy programmatic access, enabling simple integration with other systems and facilitating automated monitoring and analysis workflows.

## Integration with Kurtosis

Assertoor integrates seamlessly with the Ethereum Kurtosis package. This integration provides a robust environment for quickly spinning up ephemeral local Ethereum networks comprising multiple Ethereum clients of various types for testing purposes.

Within the Kurtosis environment, Assertoor benefits from automatic configuration. The package handles most setup requirements, including providing all client RPC URLs, validator name ranges, and a pre-funded wallet. This integration allows developers to focus primarily on defining the test scenarios that Assertoor should execute.

## Real-World Use Cases

- **Scheduled Tests with latest Client Releases**: Assertoor is used for scheduled tests with the latest release images of all possible execution layer & consensus layer client combinations.

- **Scheduled Tests on Public Ethereum Testnets**: Assertoor is used for testing public Ethereum testnets, such as Holesky.

- **Use in CI Pipelines**: Assertoor, in combination with Kurtosis, is integrated into the CI pipeline of some Ethereum client development teams to thoroughly test builds before release.

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/assertoor) 