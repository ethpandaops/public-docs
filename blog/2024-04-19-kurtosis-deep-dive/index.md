---
slug: kurtosis-deep-dive
title: 'Kurtosis: A Deep Dive to Local Devnets'
authors: [savid, samcm]
tags: [kurtosis, ethereum-package, devnet, testnet, shadowfork]
image: img/blog/kurtosis-deep-dive.png
---

## Introduction to Kurtosis
[Kurtosis](https://www.kurtosis.com) is tool to run ephemeral packages that are defined in [Starlark](https://github.com/bazelbuild/starlark) which opens up a world of possibilities for developers to test their applications, quickly iterate and retest. It is built from the ground up to be a developer-friendly platform that allows developers to test their applications in a controlled environment without the need for complex setup or configuration.

The major focus of this blog post is going to be a deep dive into the Kurtosis platform, exploring its features, capabilities, and how it can be used to test applications in a controlled environment. Primary focus will be on a package that is built on top of Kurtosis, called [ethereum-package](https://github.com/ethpandaops/ethereum-package). This package is the brainchild between the [Kurtosis](https://www.kurtosis.com/company) and the [ethPandaOps](https://ethpandaops.io/team/) teams, and is designed to make it easy for developers to test their Ethereum clients and corresponding tooling.


## Why would you need Kurtosis in the first place?
You may have read that we've often referenced the kurtosis/ethereum-package in our past presentations, tweets and blogposts. The reason we referenced it in many different places is because our team has been relying on it for rapid testing of various client releases. It is being used as the primary testbed for testing all of our tools as well. As a result of its deep integration with tools and its simplicity, Kurtosis has become our go-to approach for rapid iterative local testing.

Kurtosis works on the basis of overrides, all the configurable values can be overriden, allowing devs to easily swap a stable image for on they wish to test. This means we can perform integration testing on a local environment and quickly know if it breaks.

Aside from being useful as a standalone tool, Kurtosis can also be run on the CI to ensure that clients or tools are able to test their pull requests and ensure healthy releases. We've packaged kurtosis along with our test assertion tool called assertoor into a github action called [kurtosis-assertoor-github-action](https://github.com/marketplace/actions/kurtosis-assertoor-github-action). Please do provide feedback on kurtosis and assertoor if we can help make it easier to run in your CI pipelines.

###  Local devnets for the masses
The standard way to launch devnets has traditionally been via bespoke scripts. These scripts often were tailor made for a specific client and did not include any tooling. Launching publicly accessible devnets took a lot more organization and collaboration, often requiring the help of a DevOps engineer. Kurtosis makes it possible to reduce this toil and has automated the process of setting up private devnets in a matter of minutes, it extends this devnet with tooling as well - enabling a whole new range of developers to perform local development.

## How to use Kurtosis (basic guide)

#### Pre-requisites
- [Docker](https://github.com/docker/docker-install?tab=readme-ov-file#usage)
- [Kurtosis](https://docs.kurtosis.com/install)

#### Concepts
Kurtosis is a CLI tool that connects to the Kurtosis engine, which is a server that can then interface with the system to launch a package. It is important that the kurtosis engine is always running before you run any package.

The Kurtosis engine utilizes the `docker` or `kubernetes` backend to execute the defined package. The `docker` mode would imply that the code is executed on a single instance, whereas the `kubernetes` mode would imply that the code is executed on a multi-node kubernetes cluster. This means Kurtosis packages can benefit from local execution as well as scalable remote execution.

Kurtosis is built around the concept of [enclaves](https://docs.kurtosis.com/advanced-concepts/enclaves/). These enclaves are a way to separate executions, similar to `namespace` in kubernetes. The participants of one enclave usually cannot interact in any way with the participants of another enclave.


#### Quick start guide
To get started with your first devnet on your local machine, you can run the following command:
```bash
kurtosis engine start
```

We can then use the `kurtosis run <package>` to start any package. This package is a collection of [starlark](https://github.com/bazelbuild/starlark) code that kurtosis can interpret. The package can be referenced via the Github URL or the local path of the git repository. You can explore all the flags by running:

```bash
kurtosis run --help
```

For our purposes, we will be using the ethereum-package. To run the ethereum-package, you can run the following command:
```
kurtosis run github.com/ethpandaops/ethereum-package
```

This will spin up the default Ethereum devnet with a single node (geth/lighthouse pair), kurtosis takes care of creating the genesis state, peering, validator keys and ensuring the nodes are spun up with the right flags. We will explore how to customize this to suit your needs later in the post.

The output of the run command will be a list of participants as well as the ports they have exposed. You can use these ports to interact with the devnet as you would on any other network.

In order to clean up all the resources that were instantiated by the `kurtosis run` command, you can run the following:
```bash
kurtosis enclave rm <enclave-name> -f
```

If no other enclaves are running, you can also run the following command to clean up all the resources:
```bash
kurtosis clean -a
```

#### Customizing the devnet
Kurtosis runs on the basis of overriding parameters, hence if the default run parameters are insufficient, you can run kurtosis with `--args-file <path-to-args-file>`. This flag allows you to pass in a YAML/JSON file with all the parameters you want to customize, when a parameter is not configured then its default value is utilized. An exhaustive list of all possible configuration parameters can be found [here](https://github.com/ethpandaops/ethereum-package?tab=readme-ov-file#configuration).

We maintain a non-exhaustive list of completed configuration files that can be found in the [tests folder of the ethereum-package repository](https://github.com/ethpandaops/ethereum-package/tree/main/.github/tests). We hope that these examples can showcase how powerful the package can be.

You can also reference yaml files that are hosted online by using the raw URL of the given file. Here is an example of how you can run a devnet with a custom configuration file:
```bash
kurtosis run github.com/ethpandaops/ethereum-package --args-file https://raw.githubusercontent.com/ethpandaops/ethereum-package/main/.github/tests/mix.yaml
```


#### Customizing the different participants
Participants in a network refer to the nodes that will partake in the devnet. You can specify multiple clients of the same configuration with `count` parameter. You can specify differing participants by using a new element. Here is an example:
```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
    count: 3
  - el_type: nethermind
    cl_type: teku
```
The above example would spin up 3x geth/lighthouse nodes and 1x nethermind/teku with their default parameters. They will all get an equal number of validators and would be provided the same genesis files as well as peering information.

#### Overriding the default configuration
You can specify a parameter in the config file in order to override it, the same applies for client images. Here is an example of a configuration file that uses a custom docker container for the nethermind node:
```yaml
participants:
  - el_type: nethermind
    el_image: ethpandaops/nethermind:best-image
  - el_type: besu
    cl_type: lighthouse
```
In this example, we will spin up a network with nethermind/lighthouse(default CL) and a besu/lighthouse node. Since the nethermind node has a custom image, it will be spun up with the specified image and the others will use the default image.


#### Run custom number of validators, with a different validator client
In order to run a client pair with a custom number of validators using a different validator client type you can use the following configuration file:
```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
    vc_type: lodestar
    validator_count: 100
```
In the above example you will spin up a devnet with 1 geth node, 1 lighthouse node, and 100 lodestar validator nodes, that are connected to the lighthouse node.

#### Extra parameters, environment variables, and additional labels
If you would like to pass additional flags, parameters, environment variables, or labels to the docker containers that are being spun up, you can use the following configuration file (also possible for `cl` and `vc`):
```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
    count: 3
    el_extra_params:
      - "--rpc"
    el_extra_env_vars: {"ETH_RPC_PORT": "8545"}
    el_extra_labels: {"com.example.label": "example"}
```

Using this information you should be able to have a basic understanding of what you can do with the ethereum-package and how you can customize the participants to your needs.

#### Deploying the entire MEV stack
Kurtosis supports the entire MEV as well as MEV testing stack. This includes spinning up mev-boost, mev-relays, builders and the frontend to showcase delivered payloads. Here is an example of how you can run a devnet with the entire MEV stack:
```yaml
participants:
- el_type: geth
  cl_type: lighthouse
  count: 3
mev_type: full
```

The `mev_type` full would deploy the entire MEV stack as seen on Mainnet ethereum. Each portion of the MEV stack can be customized for testing purposes as well. However, for easier client side protyping we also support `mev_type: mock`, which deploys a mock implementation of the relay stack and is managed by the tool [here](https://github.com/marioevz/mock-builder/). This `mock` mode can help iterate on builder API changes without needing to update many components.

By customizing the `mev_boost_image` config value, we can also utilize this workflow to test tools that operate at the layer of mev-boost.

## Customize the network parameters (basic)
The next step is to dive into the network parameters that you can customize. These parameters are defined in the `network_params` section of the configuration file.

The most commonly used parameters are `seconds_per_slot`, `genesis_delay` and `electra_fork_epoch`. These parameters help your network to produce slots faster or slower, and genesis_delay will help you to delay the genesis block of the network. The `electra_fork_epoch` parameter will help you to define when the electra fork should happen. This can help you test out feature branches by activating the next fork at any given epoch. Here is an example of how you can define these parameters in the configuration file:
```yaml
network_params:
  seconds_per_slot: 6
  genesis_delay: 120
  electra_fork_epoch: 5
```

More advanced configuration options such as `min_validator_withdrawability_delay` and `shard_committee_period` can also be adjusted.

## Customize the network parameters (advanced)

#### Minimal preset
If you would like to use a a [`minimal preset`](https://github.com/ethereum/consensus-specs/tree/dev/presets/minimal) for the network you can use the following configuration file:
```yaml
network_params:
  preset: minimal
```
However, keep in mind that this preset requires custom consensus layer clients to be defined in the configuration file, an example for these client pairs can be found [here](https://github.com/ethpandaops/ethereum-package/blob/main/.github/tests/minimal.yaml). `minimal` preset can also break some tooling, so please proceed with caution.

#### Shadowfork and bootstrapping (advanced)
The ethereum-package now supports bootstrapping and shadowforks by defining the `network` and `network_sync_base_url` parameters in the configuration file. This will help you to bootstrap the network from a specific snapshot, and to run a shadowfork of the network. Here is an example of how you can define these parameters in the configuration file:

```yaml
network_params:
  network: holesky-shadowfork
  network_sync_base_url: https://ethpandaops-ethereum-node-snapshots.ams3.digitaloceanspaces.com/
persistent: true
```
These parameters will pull a latest snapshot from holesky network as defined in the s3 bucket linked above. This snapshot was created with the tool [snapshotter](https://github.com/ethpandaops/snapshotter), and specifies the format to store the data in. Once the data has been imported, The genesis tools will create the requisite data for the clients to start a new beaconchain and perform shadowfork at the defined `electra_fork_epoch`.

Persistence is highly recommended when using shadowforks, as this requires multiple gigabytes of storage to store the chain data, and storing it all in RAM or SWAP is not recommended.

Note: `kurtosis clean -a` will wipe the chain data and nuke the enclave, and you will have to re-download the snapshot if you want to run the shadowfork again.

## How to use Kurtosis (advanced guide)
So at this point you should be fairly familiar with how the ethereum-package is used, and you should be fairly familiar with how to customize the devnet to your needs. In this section we are going to explore some of the more advanced features of the ethereum-package and how you can use them to your advantage.

#### Long running devnets using Kubernetes
If you are looking to run a devnet for a longer period of time, it is advisable to use Kubernetes as the backend engine of kurtosis. This requires a more verbose. A pre-requisite is that you have a Kubernetes cluster running, and that cluster is set as your current context. (The setup of a kubernetes cluster or how to set the context is out of the scope of this blog post, but you can find more information [here](https://kubernetes.io/docs/setup/)).

Adjust your `kurtosis-config.yaml` where you define the connection parameters of the kurtosis engine using the following [guide](https://docs.kurtosis.com/k8s/#iii-add-your-cluster-information-to-kurtosis-configyml).

After you have set up your kurtosis-config.yaml file, you can start the kurtosis engine with the following command:
```bash
kurtosis cluster set <cluster-name>
kurtosis engine restart
kurtosis gateway
```

Note: The `kurtosis gateway` command will start a local proxy that will allow you to connect to the kurtosis engine running on the Kubernetes cluster. This is necessary to run in the background whenever you are interacting with the kurtosis engine. If the `gateway` command is not running, then you will not be able to interact with the kurtosis engine but it will not affect any running enclaves.

Then from this point on you can use the same `kurtosis run` command to spin up your devnet, which will target the Kubernetes cluster instead of the local machine. This enables you to run devnets for a longer period of time, and you can even share the devnet with your team members. Also this enables you to run much larger devnets where your (automatically scaling - optionally) Kubernetes cluster can handle the load.

Complete guide on all the possible configurable parameters can be found on the very detailed documentation of the [ethereum-package](https://github.com/ethpandaops/ethereum-package?tab=readme-ov-file#configuration).

#### Kubernetes specific configuration flags
When running the devnet on Kubernetes, there are some additional flags that you can use to customize the devnet to your needs. A few of these flags are [tolerations](https://kubernetes.io/docs/concepts/scheduling-eviction/taint-and-toleration/) and [node selectors](https://kubernetes.io/docs/concepts/scheduling-eviction/assign-pod-node/#nodeselector). These flags can be used to define which nodes the devnet should run on, and which nodes the devnet should not run on. These flags are highly recommended to be defined when using a kubernetes cluster that is shared with other workloads. Node selectors and tolerations can help you ensure that the devnet is running on a node that is not being used by other workloads, and that the devnet is not interfering with other workloads.

These flags are:
```yaml
participants:
  - el_type: geth
    cl_type: lighthouse
    count: 3
    node_selectors:
      kubernetes.io/hostname: node1
    tolerations:  # tolerations for this participant
      - key: "key"
    cl_toleration: []  # tolerations for the consensus client
    el_toleration: []  # tolerations for the execution client
    vc_toleration: []  # tolerations for the validator client
  ```

Another important flag that can be defined are CPU and memory requests and limits. Each client type has a default value for these parameters, but you can override them by defining them in the configuration file. These flags are (also available for `cl` and `vc`):
```yaml
el_min_cpu: 0
el_max_cpu: 0
el_min_mem: 0
el_max_mem: 0
el_volume_size: 0
```
Customizing these values will help you ensure that the devnet is running on a node that has enough resources to handle the load, and assist you in avoiding any resource contention with other workloads that are running on the same node. As well as help your kubernetes cluster to automatically scale up/down based on the resource requirements of the devnet.


## Conclusion
In this blog post we have explored the basic and advanced features of the ethereum-package, and how you can use them to your advantage. We have explored how you can customize different participants, devnet network parameters to your needs, and how you can run the devnet on docker or Kubernetes. We hope that this blog post has given you a good understanding of how you can use the ethereum-package to test your Ethereum clients and tooling in a controlled environment.

A massive thanks goes out to the whole Kurtosis team for building such an amazing platform! 🚀

## References
### Ethereum-package clients and tooling
There is a wide range of ethereum clients that are supported out of the box by the ethereum-package. These clients are:
#### Execution layer clients:
- [Geth](https://geth.ethereum.org)
- [Nethermind](https://www.nethermind.io)
- [Besu](https://besu.hyperledger.org)
- [Erigon](https://github.com/ledgerwatch/erigon)
- [Reth](https://github.com/paradigmxyz/reth?tab=readme-ov-file)
- [Nimbus-eth1](https://github.com/status-im/nimbus-eth1)

#### Consensus layer clients:
- [Lighthouse](https://lighthouse-book.sigmaprime.io)
- [Teku](https://consensys.io/teku)
- [Nimbus-eth2](https://nimbus.guide)
- [Prysm](https://prysmaticlabs.com)
- [Lodestar](https://lodestar.chainsafe.io)
- [Grandine](https://github.com/grandinetech/grandine)

#### Tooling
Tooling that is supported out of the box by the ethereum-package:
- [assertoor](https://github.com/ethpandaops/assertoor) - (more details about assertoor can be found in the [assertoor blog post](https://ethpandaops.io/posts/assertoor-introduction/))
- [tx_spammer](https://github.com/MariusVanDerWijden/tx-fuzz) - Basic transaction spamming tool which can help you generate random transactions to test transaction inclusion in the blocks
- [blob_spammer](https://github.com/MariusVanDerWijden/tx-fuzz) - Basic blob spamming tool which can help you generate random blobs to test the network's ability to handle large amounts of data
- [goomy_blob](https://github.com/ethpandaops/goomy-blob) - A more advanced blob spamming tool which can help you generate blobs with a specific structure to test the network's ability to handle structured data
- [el_forkmon](https://github.com/ethereum/nodemonitor) - A fork monitor tool which can help you monitor the execution layter clients for forks and reorgs
- [blockscout](https://github.com/blockscout/blockscout) - A block explorer tool which can help you explore the blocks and transactions on the network
- [beacon_metrics_gazer](https://github.com/dapplion/beacon-metrics-gazer) - A validator metrics tool which can help you monitor the performance of the validators on the network - requires `prometheus_grafana` to be running
- [dora](https://github.com/ethpandaops/dora) - A ligthweight beaconchain explorer
- [full_beaconchain_explorer](https://github.com/gobitfly/eth2-beaconchain-explorer) - A full beaconchain explorer, monitoring conensus and execution layer data
- prometheus_grafana - An additional tool that spins up a grafana with prometheus to help you monitor the performance of the devnet
- [blobscan](https://github.com/Blobscan) - A tool that can help you scan the network for blobs and analyze the data that is being sent around
- [dugtrio](https://github.com/ethpandaops/dugtrio) - A consensus layer load balancer
- [blutgang](https://github.com/rainshowerLabs/blutgang) - An execution layer load balancer
- [rpc-snooper](https://github.com/ethpandaops/rpc-snooper) - A Man-in-The-Middle tool that can help you snoop on the RPC calls that are being made between consensus and execution layer clients, as well as between the consensus layer client and the validator client
- [blobber](https://github.com/marioevz/blobber/tree/main) - A tool that helps you generate malicious blobs to test the network's ability to handle malicious data
- [ethereum-metrics-exporter](https://github.com/ethpandaops/ethereum-metrics-exporter) - A tool that helps you export the metrics from the ethereum clients to prometheus - requires `prometheus_grafana` to be running
- [xatu](https://github.com/ethpandaops/xatu) - A centralized Ethereum network monitoirng tool for data pipelining - more details about xatu can be found in the [xatu blog post](https://ethpandaops.io/posts/open-source-xatu-data/#what-is-xatu)
- mev - MEV workflow tooling is fully supported using `mev_params`.

