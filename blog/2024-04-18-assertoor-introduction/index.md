---
slug: assertor-introduction
title: 'Assertoor: Ethereum Testnet Testing Tool'
description: "Assertoor is a versatile tool designed to facilitate testing on Ethereum networks by evaluating specific conditions to determine their success."
authors: [pk910, parithosh]
tags: [testnet, tool, sepolia, holesky, kurtosis]
image: img/blog/assertor-introduction.png
githubRepos:
  - name: assertoor
    url: https://github.com/ethpandaops/assertoor
relatedLinks:
  - name: Assertoor Test Playbooks
    url: https://github.com/ethpandaops/assertoor-test/tree/master/assertoor-tests
  - name: Assertoor Wiki
    url: https://github.com/ethpandaops/assertoor/wiki#supported-tasks-in-assertoor
---

# Assertoor: Ethereum Testnet Testing Tool

## Introduction to Assertoor

[Assertoor](https://github.com/ethpandaops/assertoor) is a versatile tool designed to facilitate testing on Ethereum networks by evaluating specific conditions to determine their success. Drawing its name from its primary function—asserting conditions—Assertoor simplifies everything from routine checks (e.g., whether all clients are proposing blocks and overall network health) to more intricate processes such as the handling of deposits, exits, and similar transactions.

For those familiar with protocol testing, think of Assertoor as an end-to-end, cross-client integration testing tool that operates at a higher abstraction level than Hive.

Assertoor excels as a test orchestrator, leveraging a YAML file to manage a series of tests. Each test consists of a sequence of tasks executed in a specific order. Assertoor not only orchestrates these tests but also provides foundational tasks like "generate_deposit" built into the system. Users can customize the test playbook to perform particular actions or verify specific conditions, enhancing the flexibility and applicability of Assertoor in various testing scenarios.


## Key Components of Assertoor

Assertoor combines the functionalities of monitoring and task orchestration into a single tool, adeptly crafted in Go. Let's go through the key components that assertoor provides:

### Network Connection and Monitoring
Assertoor establishes connections to multiple Consensus and Execution Clients through their public HTTP RPC APIs, requiring no extra integration efforts from client teams. This method ensures Assertoor maintains a robust and comprehensive view of the network status. Designed to be resilient, it can adapt to individual client faults or unsupported RPC endpoints by switching to another client for the required information.

### Task Execution and Test Playbooks
Assertoor excels in executing a variety of tasks in a predefined order, which are specified in a test playbook. These playbooks can orchestrate both parallel and sequential steps, incorporating dependencies much like a GitHub workflow but specifically tailored for Ethereum network interactions. The tool's capabilities range from simple shell scripts to intricate built-in logic that performs various network interactions and checks. For a comprehensive list of all available tasks and their usage, visit the [Assertoor Project Wiki](https://github.com/ethpandaops/assertoor/wiki#supported-tasks-in-assertoor).

### Flexible Test Definitions
Tests are defined and executed via YAML files, allowing users to specify tasks within the test configuration or sideload them from external URLs. This flexibility facilitates organized test management and is illustrated in our test playbooks repository at [Assertoor Test Playbooks](https://github.com/ethpandaops/assertoor-test/tree/master/assertoor-tests).

### User Interface and API Integration
Assertoor also provides a user-friendly interface for real-time test management (start/cancel) and monitoring. The interface displays detailed test statuses and serves logs and configurations for all tasks defined in the test playbook, comparable to the GitHub workflow run details UI.
<img src="/img/blog/assertoor_overview.png" />

Additionally, Assertoor offers programmatic access through an API to trigger tests, fetch test results, and logs, making it ideal for integration with other systems and CI pipelines.


## Utilizing Assertoor

Assertoor is engineered as a standalone tool that seamlessly connects to externally managed nodes for executing tests on Ethereum testnets. A key application involves routinely running specified tests on public testnets to ensure consistent network behavior and stability.

Eg. One of these test is designed to thoroughly validate the entire validator lifecycle on holesky. This includes complex scenarios involving depositing, BLS key changes, exits, withdrawals, and slashings. The test performs 10 deposits and evaluates various scenarios like double deposits, BLS key changes both before and after activation or exit, as well as handling slashings and exits. This comprehensive testing is vital for ensuring that all aspects of the validator lifecycle are functioning correctly under different conditions. For those interested in the specifics of this testing approach, the test playbook is available on our GitHub repository at [Validator Lifecycle Test](https://github.com/ethpandaops/assertoor-test/blob/master/assertoor-tests/validator-lifecycle-test-v2.yaml).

### Integration with Kurtosis

To enhance flexibility and reduce the need for extensive manual configuration, Assertoor is integrated into our [Ethereum Kurtosis package](https://github.com/kurtosis-tech/ethereum-package). Kurtosis, along with the Ethereum Kurtosis package, provides a robust and extremely flexible environment for quickly spinning up ephemeral local Ethereum networks. These networks comprise multiple Ethereum clients of various types and include several additional tools, such as explorers and, crucially, Assertoor.

Within the Kurtosis environment, Assertoor benefits from automatic configuration. The package handles most setup requirements, including providing all client RPC URLs, validator name ranges, and a pre-funded wallet. This integration allows developers to focus primarily on defining the test playbooks that Assertoor should execute.

### Example Configuration and Execution

Below is an example of a Kurtosis args file (yaml) that configures a simple testnet with two client pairs and sets Assertoor to run two specific test playbooks:

```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
    count: 1
  - el_type: geth
    cl_type: lodestar
    count: 1
additional_services:
  - assertoor
  - dora
assertoor_params:
  run_stability_check: false
  run_block_proposal_check: false
  tests:
    - https://raw.githubusercontent.com/ethpandaops/assertoor-test/master/assertoor-tests/block-proposal-check.yaml
    - https://raw.githubusercontent.com/ethpandaops/assertoor-test/master/assertoor-tests/all-opcodes-test.yaml
```

To start the testnet, use the following command:

`kurtosis run --enclave my-testnet github.com/kurtosis-tech/ethereum-package --args-file ./args.yaml --image-download always`

Once Kurtosis has finished setting up the testnet, it provides a concise summary of the started services, including a link to the Assertoor web UI & API:

```
================================= User Services =================================
UUID           Name        Ports                                         Status
f3a69b405cdb   assertoor   http: 8080/tcp -> http://127.0.0.1:32839      RUNNING
```

The provided URL can be used to access the Web UI and API, where users can monitor the live test progress, and start or cancel additional tests as needed.
<img src="/img/blog/assertoor_test_details.png" />


## Understanding Test Playbooks in Assertoor

Assertoor utilizes test playbooks written in YAML format to run a series of tests on Ethereum networks. These playbooks are pivotal for orchestrating the testing process, providing both flexibility and precision in defining test scenarios.

We have a wide range of these test playbooks in our [GitHub repository](https://github.com/ethpandaops/assertoor-test/tree/master/assertoor-tests), which can be used as examples and reference points to get started with writing your own test playbooks.

Let's take a look at how these playbooks are structured and how they work:

### Structure of Test Playbooks

Test playbooks begin with a header that provides general information about the test, such as its ID, name, and any relevant configuration values. Here's what a typical playbook header looks like, including configuration options:

```yaml
id: block-proposal-check
name: "Every client pair proposed a block"
timeout: 20m
config:
  validatorPairNames: []
```

The header sets foundational parameters for the test, such as its timeout period and default configuration settings. These values can be overridden at the time of test invocation, either manually via API or through global configurations in the Assertoor config. 

In the example provided, the `validatorPairNames` setting is utilized, which, when run as part of the Ethereum package within Kurtosis, is automatically populated with the names of all client pairs that have validator keys. Additional values supplied by Kurtosis include `clientPairNames`, which lists all client pair names (regardless of validator keys), and `walletPrivkey`, which is the private key for a pre-funded wallet.

### Defining Tasks in Playbooks

Following the header, the playbook specifies a series of tasks. Each task corresponds to a built-in function within Assertoor, designed to perform specific actions or checks:

```yaml
tasks:
- name: check_clients_are_healthy
  title: "Check if at least one client is ready"
  timeout: 5m
  config:
    minClientCount: 1

- name: run_task_matrix
  title: "Check block proposals from all client pairs"
  configVars:
    matrixValues: "validatorPairNames"
  config:
    runConcurrent: true
    matrixVar: "validatorPairName"
    task:
      name: check_consensus_block_proposals
      title: "Wait for block proposal from ${validatorPairName}"
      configVars:
        validatorNamePattern: "validatorPairName"
```

Each task is clearly defined with a name, a title for clarity, and any necessary configurations, such as timeouts or specific conditions to check. Assertoor currently supports 28 distinct tasks, with the possibility of adding more as needed. A detailed list of available tasks can be found on the [Assertoor Wiki](https://github.com/ethpandaops/assertoor/wiki#supported-tasks-in-assertoor).

### Nested Tasks and Execution Flows

Playbooks can nest tasks within one another to control the execution flow more granularly. This nesting allows tasks to be organized in various execution flows like running tasks in the background, concurrently, or as a matrix of tasks.

In the provided example, the `run_task_matrix` task is used to execute the child task `check_consensus_block_proposals` multiple times in parallel, each instance triggered by a unique validator pair name. This approach enables simultaneous monitoring of block proposals from different validators, enhancing the efficiency and scope of testing. The `run_task_matrix` acts as a parent task, coordinating and waiting for all child tasks to complete before proceeding, ensuring that all necessary checks are performed thoroughly and concurrently.

This structure not only makes the playbook highly adaptable but also ensures that complex network behaviors are tested comprehensively, providing a reliable and scalable solution for network testing.

### Exploring Advanced Playbooks

While the example above provides a basic overview of playbook capabilities, for a deeper insight into more complex scenarios, we encourage exploring the advanced playbooks available in our test playbook repository. These playbooks can be accessed here: [Assertoor Test Playbooks](https://github.com/ethpandaops/assertoor-test/tree/master/assertoor-tests).

Some noteworthy playbooks include:

- **[EOA Transactions Test](https://github.com/ethpandaops/assertoor-test/blob/master/assertoor-tests/eoa-transactions-test.yaml):** This playbook checks whether transactions can be sent through each connected client and whether they can be included by each validator. It is crucial for verifying the robustness of transaction processing across different clients and validators.

- **[Validator Withdrawal Test](https://github.com/ethpandaops/assertoor-test/blob/master/assertoor-tests/validator-withdrawal-test.yaml):** This test verifies whether validators can change their withdrawal credentials. It ensures that each validator can propose blocks with BLS changes, and that these BLS changes can be sent through each client. Additionally, it checks that all clients can propose blocks with withdrawals, an essential aspect of validator lifecycle management.

- **[Validator Slashing Test](https://github.com/ethpandaops/assertoor-test/blob/master/assertoor-tests/validator-slashing-test.yaml):** This playbook tests if various types of slashings can be processed by the network. It confirms that each validator can propose blocks containing these slashings and that the slashings can be submitted through each client, ensuring the network's ability to handle penalizations correctly.

These advanced playbooks provide a comprehensive testing framework to evaluate different functionalities and scenarios within Ethereum networks, ensuring thorough validation and performance assessment.


## Integrating Assertoor and Kurtosis into Build Pipelines

To further streamline the usage of Assertoor, Kurtosis, and the Kurtosis Ethereum package in build pipelines, we've encapsulated all necessary setup and monitoring steps into two reusable GitHub Actions. These actions are designed to simplify the deployment and testing process, making it more accessible and efficient for continuous integration workflows.

### Assertoor GitHub Action

The first action we offer is the [`assertoor-github-action`](https://github.com/ethpandaops/assertoor-github-action). This action is utilized to continuously poll the test execution status from a running Assertoor instance. It queries the API at regular intervals and waits for all tests to successfully complete. The action also provides detailed outputs regarding the test status and information about any failed tests, which can be used by subsequent steps in the workflow for further processing or notifications.

### Kurtosis Assertoor GitHub Action

Our second offering is the [`kurtosis-assertoor-github-action`](https://github.com/ethpandaops/kurtosis-assertoor-github-action). This comprehensive action handles the entire process, including setting up Kurtosis, starting the testnet, and monitoring the Assertoor status. Designed for ease of use yet retaining high flexibility, it supports various backends and can be customized to fit specific testing needs.

#### Example Workflow

Setting up a full-scale Ethereum testnet with multiple client pairs and executing Assertoor tests is made straightforward with the following GitHub Actions workflow:

```yaml
on:
  workflow_dispatch:

name: run-assertoor-test
jobs:
  assertoor:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout Repository
        uses: actions/checkout@v4
      - name: Kurtosis Assertoor GitHub Action
        uses: ethpandaops/kurtosis-assertoor-github-action@v1
        with:
          ethereum_package_args: ./kurtosis-args.yaml
```

This example demonstrates how to integrate the Kurtosis Assertoor GitHub Action into a typical CI/CD pipeline, simplifying the process of deploying and testing Ethereum networks for developers. The only additional thing needed is a `kurtosis-args.yaml` file as described in the previous sections.


## Conclusion

Since its inception in November 2023, Assertoor has quickly proven to be an indispensable tool in the Ethereum testing landscape. Despite its relatively new status, it has already made significant impacts by detecting numerous issues across various client implementations. This efficiency is particularly evident in our recent focus on testing compatibility between Validator Clients and Beacon Nodes. Assertoor has drastically simplified the process of testing multiple client combinations, which would otherwise have been a daunting and time-consuming task.

By leveraging Assertoor alongside our reusable GitHub Actions, testing all possible client pair combinations becomes as straightforward as initiating a single workflow run. You can see this process in action and its results, including expected errors from incompatible client pairs, in our [recent workflow execution](https://github.com/ethpandaops/assertoor-test/actions/runs/8712937458). The job logs and Assertoor's summaries provide clear insights into which client pairs are currently facing compatibility issues.

### Real-World Use Cases

- **Scheduled Tests with latest Client Releases**:
Assertoor is used for scheduled tests in the [Assertoor Test Repository](https://github.com/ethpandaops/assertoor-test). A workflow runs daily, spinning up various testnets with the latest release images of all possible execution layer & consensus layer client combinations. Assertoor tests these networks for basic functionality, including beacon chain interactions (BLS changes, Exits, withdrawals, slashings) and execution chain interactions (opcode & precompiles testing). These tests have identified critical bugs in client releases, underlining the tool's value.

- **Scheduled Tests on Public Ethereum Testnets**:
Assertoor is used in a standalone instance for scheduled and recurring testing of public Ethereum testnets. For instance, we have a setup dedicated to the Holesky testnet, running through a full validator lifecycle test approximately every two weeks. This use case highlights Assertoor's capability to perform in-depth network functionality checks, contributing significantly to network stability and reliability.

- **Use in CI Pipelines**:
Assertoor, in combination with Kurtosis, is integrated into the CI pipeline of some Ethereum client development teams. This setup allows for the spinning up of testnets involving various client pairs to thoroughly test builds before release, ensuring compatibility and stability.
eg. [rETH workflow integration](https://github.com/paradigmxyz/reth/blob/main/.github/workflows/assertoor.yml) / [Kurtosis Ethereum Package integration](https://github.com/kurtosis-tech/ethereum-package/blob/main/.github/workflows/per-pr.yml#L70-L78)


As the Ethereum ecosystem continues to evolve, tools like Assertoor will be critical for ensuring that the network remains robust and secure. We look forward to further enhancing its features and expanding its use cases to meet the growing demands of blockchain technology.

