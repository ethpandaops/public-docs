---
slug: kurtosis-l2
title: Reusing the Kurtosis Ethereum-package as a base for your L2 devnet
authors: [parithosh, barnabasbusa]
description: "Learn how to utilise the ethereum-package for the foundation of sophisticated tooling and L2 devnets."
tags: [kurtosis, ethereum-package, optimism-package, L1, L2, testnet, devnet]
image: img/blog/kurtosis-l2.png
---

## Introduction
In our latest series, which started with a [deep dive into Kurtosis](https://ethpandaops.io/posts/kurtosis-deep-dive/), we've explored the utility of creating localized Ethereum devnets. Today, we expand on this by demonstrating how the [ethereum-package](https://github.com/ethpandaops/ethereum-package) can serve as the foundation for sophisticated tooling as well as L2 devnets.
 
The advantage of a package based approach on Kurtosis, is that packages can be imported and linked in other packages. This means that one can create a new package that imports the ethereum-package and expect that a base layer Ethereum will always be spun up with any minimal maintenance effort. This feature would be especially useful for anyone creating tooling that isn't strictly focussed on the Ethereum base layer, but still relies on it for data or state access. In order to expand on how this feature could be used, we decided on building an example that runs a L2 devnet but with the base layer being Ethereum, imported as a package. For this example, we will use the [Optimism](https://optimism.io) stack and create the [optimism-package](https://github.com/ethpandaops/optimism-package) purely due to the fact that it reuses many base layer components we already had definitions for. There is however no reason that the example could not apply to any other L2 or tool that relies on Ethereum as a base layer.

## Interacting with imported packages in Kurtosis
Kurtosis employs [Starlark](https://github.com/bazelbuild/starlark) for its scripting needs, allowing you to treat each folder as a module that can be conveniently imported into other modules, enhancing modularity and reuse. Let's take an example of two modules, one that defines the constants (defined in `constants.star`) and another that uses these constants (defined in `main.star`).

The `main.star` file can then import the constants defined in `constants.star` as follows:
```python
constants = import_module("../constants/constants.star")
```

In the same way that we imported a file from a module into another module, we can also import an entire package from github into any arbitrary module. This would look like this:
```python
ethereum_package = import_module("github.com/ethpandaops/ethereum-package/main.star")
```

The `ethereum-package` contains a `run` function that needs to be called with the arguments used to start up the Ethereum devnet. The response is stored in a variable called `l1`, this variable contains the context of the Ethereum devnet. We can then reference any variable stored in this context, for e.g we can obtain the RPC URL of an Ethereum node in order to interact with the underlying chain. The code to do so would look like this: 
```python
# Run the Ethereum devnet and store the context in a variable called l1
l1 = ethereum_package.run(plan, ethereum_args)
# Read the RPC URL of the first participant in the Ethereum devnet and store it in a variable called l1_rpc
l1_rpc = l1.all_participants[0].el_context.rpc_http_url
```

We additionally contain prefunded accounts in the `ethereum-package` that can be used for transactions on the base chain. These funds can be accessed by calling the `pre_funded_accounts` in the `ethereum-package` context. We do reserve certain accounts for specific purposes, for example, the 12th account is reserved for the L2 contract deployer. A full list of pre-allocations can be found [here](https://github.com/ethpandaops/ethereum-package?tab=readme-ov-file#pre-funded-accounts-at-genesis). The code to access the private key of the 12th account would look like this:
```python
l1_priv_key = l1.pre_funded_accounts[12].private_key  # reserved for L2 contract deployer
```
The Ethereum RPC as well as a private key with funds would be integral components for building any tooling that interacts with the Ethereum base layer, in the case of the `optimism-package`, we pass these values on to the optimism contract deployer as well as the op-nodes that are spun up later in the process. A full example of how we've interacted with the base `ethereum-package` can be found in this [main.star file](https://github.com/ethpandaops/optimism-package/blob/main/main.star). 

## Optimism package overview
The optimism docs contain a page on all the requirements to create a L2 rollup testnet, the docs can be found [here](https://docs.optimism.io/builders/chain-operators/tutorials/create-l2-rollup). At a high level, the `optimism-package` deploys the following:
- Smart contracts
- Sequencer node (consensus and execution client)
- Batcher
- Proposer

Once we imported the `ethereum-package` and possess the L1 context, we pass on the required variables such as a prefunded privatekey, RPC, chainID and a few other values to the `contract_deployer.star` module. This module contains all the logic for deploying and configuring the optimism contracts. The `contract_deployer` module waits until the L1 in finalized to avoid issues and then proceeds with using `cast` and `forge` to deploy the contracts and using the `op-node genesis` command to create the L2 genesis files. 

The L2 chain genesis files are then available in the `contract_deployer` context, accessible via `op_genesis.files_artifacts[0]` for use by the nodes. The package then continues on to launching the L2 network participants, this logic is encapsulated in the module `participant_network.star`.  The module launches all the participants in the L2 network, including the sequencer, batcher, proposer and the op-nodes. If there are already setup nodes on the L2 network, then the module will connect the new nodes to the existing nodes.  

Once the nodes, batcher and proposer are setup, the `optimism-package` will then turn to setting up tooling. This tooling currently includes just `op-blockscout`, but can be expanded to include any other tooling that is required. The `op-blockscout` is a fork of the original blockscout that is configured to work with the L2 network. The `op-blockscout` is another example of how extensible the module approach is, it references the L1 RPC from the `ethereum-package` as well as the L2 RPC from the `optimism-package` to provide a seamless experience for the developer. 

The result of the `optimism-package` execution is a fully functional L2 devnet as well as a list of services and URLs to access them by.

## Configuration examples
As the `optimism-package` is designed to fully encompass the ethereum-package, its configuration file seamlessly integrates all parameters from the `ethereum-package` alongside its own unique settings. To differentiate from using the original `ethereum-package` a new field is introduced in the configuration file called `optimism_package`. This field will contain all the new configuration parameters that are specific to the L2 devnet.

```yaml
optimism_package: # parameters specific to the optimism package
  participants:
    - el_type: op-geth
      cl_type: op-node
  additional_services:
    - blockscout
ethereum_package: # inherited from the ethereum package
  participants:
    - el_type: geth
    - el_type: reth
  network_params:
    preset: minimal
  additional_services:
    - dora
    - blockscout
```

## What are the benefits of using Kurtosis for tooling and L2 devnets?
The current way of creating any L2 devnet/tooling is to use an existing L1 testnet and deploy the L2 package/tooling on top of it or to use custom bash scripts to perform local testing. This is a cumbersome process and still requires a considerable amount of maintenance effort to ensure the L1 works as expected through upgrades. The Kurtosis approach allows you to create a local L1 devnet in a few minutes with relatively little maintenance effort and allows you to spend more time on the L2 devnet/tooling - enabling faster and safer prototyping. Kurtosis also works under the concept of [enclaves](https://docs.kurtosis.com/advanced-concepts/enclaves/), these enclaves are fully isolated from each other - allowing multiple tests to run in parallel without interference or networking issues.

## What are the disadvantages of using Kurtosis for L2 devnets?
The main disadvantage of using Kurtosis is the local nature of the devnet. This means that providing devnet access to other developers is not as easy as using a public testnet, this is a fundamental bottleneck in how kurtosis works today. Additionally, the lack of default persistent storage in Kurtosis implies that you lose all your data when you stop the devnet(unless saved ahead of time). This is not a problem for testing purposes, but it is something to keep in mind.

## Conclusion
To fully appreciate the power and flexibility of using Kurtosis with `ethereum-package`, we encourage you to initiate your own projects reusing it for tooling or to define your own L2. Explore the detailed documentation, experiment with the configurations, and join the discord to share your experiences!
