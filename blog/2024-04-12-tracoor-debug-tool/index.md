---
slug: tracoor-debug-tool
title: 'Tracoor: Ethereum beacon data and execution trace explorer'
authors: [savid, samcm]
tags: [debug, tracoor, mainnet, sepolia, holeksy]
image: img/blog/tracoor-debug-tool.png
---

import Alert from '@site/src/components/Alert';
import GitHubRepo from '@site/src/components/GitHubRepo';

[**Tracoor**](https://tracoor.mainnet.ethpandaops.io) is a tool that **captures**, **stores** and **makes available** critical data about the Ethereum network, including:

- [**Beacon States**](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Debug/getStateV2)
- [**Beacon Blocks**](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Beacon/getBlockV2)
- [**Execution Debug Traces**](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-debug#debugtraceblock)
- [**Execution Bad Blocks**](https://geth.ethereum.org/docs/interacting-with-geth/rpc/ns-debug#debuggetbadblocks)
- Invalid gossiped verified **Blocks** and **Blobs**

This data can be invaluable when issues arise, allowing developers, researchers and hobbyists to quickly identify and address network problems.

<GitHubRepo repo="ethpandaops/tracoor" />

<img alt="Tracoor homepage" class="rounded" src="/img/blog/homepage.png" />

Check out our **live** versions:

- [**Mainnet**](https://tracoor.mainnet.ethpandaops.io)
- [**Sepolia**](https://tracoor.sepolia.ethpandaops.io)
- [**Holesky**](https://tracoor.holesky.ethpandaops.io)

We run the following clients:

- Consensus layer: [nimbus](https://github.com/status-im/nimbus-eth2), [lighthouse](https://github.com/sigp/lighthouse), [prysm](https://github.com/prysmaticlabs/prysm), [lodestar](https://github.com/ChainSafe/lodestar) and [teku](https://github.com/Consensys/teku)
- Execution layer: [geth](https://github.com/ethereum/go-ethereum), [erigon](https://github.com/ledgerwatch/erigon), [besu](https://github.com/hyperledger/besu), [nethermind](https://github.com/NethermindEth/nethermind) and [reth](https://github.com/paradigmxyz/reth)

We store the data on mainnet for ~3 days to save storage costs and less for the testnets. `beacon bad blocks`, `beacon bad blobs` and `execution bad blocks` are stored for ~2 weeks.


<Alert>
We strongly encourage anyone to run Tracoor and capture data for themselves and the wider community. Check out our [GitHub repo](https://github.com/ethpandaops/tracoor) for instructions.
</Alert>


## Tool helpers

We also provide an easy way to help consume our data with open source tools.

If you have any tools that could be used with the data we capture, please let us know in our [GitHub](https://github.com/ethpandaops/tracoor/issues) or [Twitter](https://twitter.com/ethpandaops).

### GoEVMLab tracediff

[GoEVMLab tracediff](https://github.com/holiman/goevmlab/tree/master/cmd/tracediff) allows you to load evm traces and find differences between transactions. [Tracoor](https://tracoor.mainnet.ethpandaops.io/go_evm_lab_diff) helper allows you select two blocks that were captured from different execution layer clients, select the transaction index in the block and then generate the commands required to diff the two transactions with the [GoEVMLab tracediff](https://github.com/holiman/goevmlab/tree/master/cmd/tracediff) tool.

<img alt="GoEVMLab tracediffe" class="rounded" src="/img/blog/goevmlab.png" />

### lcli state transition

[lcli state transition](https://github.com/sigp/lighthouse/tree/stable/lcli) allows for replaying state transitions from SSZ files to assist in fault-finding. [Tracoor](https://tracoor.mainnet.ethpandaops.io/lcli_state_transition) helper allows you select a beacon state and beacon block and then generate the commands required to replay the state transition with the [lcli state transition](https://github.com/sigp/lighthouse/tree/stable/lcli) tool.

<img alt="lcli state transition" class="rounded" src="/img/blog/lcli.png" />

### ncli state transition

[ncli state transition](https://github.com/status-im/nimbus-eth2/tree/stable/ncli) allows you to perform state transition given a pre-state and a block to apply. [Tracoor](https://tracoor.mainnet.ethpandaops.io/ncli_state_transition) helper allows you select a beacon state and beacon block and then generate the commands required to perform the state transition with the [ncli state transition](https://github.com/status-im/nimbus-eth2/tree/stable/ncli) tool.

<img alt="ncli state transition" class="rounded" src="/img/blog/ncli.png" />

### zcli state diff

[zcli state diff](https://github.com/protolambda/zcli) allows you to diff spec data, especially beacon states. [Tracoor](https://tracoor.mainnet.ethpandaops.io/zcli_state_diff) helper builds off [lcli state transition](#lcli-state-transition) or [ncli state transition](#ncli-state-transition) helpers by taking the state transition of those tools and comparing it to another beacon state we have captured with the [zcli state diff](https://github.com/protolambda/zcli) tool.

<img alt="zcli state diff" class="rounded" src="/img/blog/zcli.png" />

## Conclusion

Capturing and storing key Ethereum network data is vital for a healthy ecosystem. [**Tracoor**](https://github.com/ethpandaops/tracoor) provides quick access to beacon states, blocks, execution traces and more - empowering our community to quickly identify issues and develop solutions. 

While we hope to never need it, this proactive approach allows for swift and effective incident response.

Love,

EthPandaOps Team ❤️

<Alert>
While we normally don't host any mainnet data that isn't for research purposes, we're doing so in this case to help debug the network in an emergency.

Ideally if a healthy ecosystem develops similar to [checkpointz](https://eth-clients.github.io/checkpoint-sync-endpoints/), we'd like to hand over hosting responsibility to the community.

If you can, please consider hosting your own instance of [Tracoor](https://github.com/ethpandaops/tracoor). If you're interested and need help, reach out to us on [Twitter](https://twitter.com/ethpandaops).
</Alert>
