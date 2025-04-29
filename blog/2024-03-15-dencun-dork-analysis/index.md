---
slug: dencun-fork-analysis
title: Dencun Fork Analysis
description: "Dencun has finally shipped to mainnet! This post will give some initial insights on how the fork event unfolded, and how it's performing."
authors: [parithosh, samcm, savid]
tags: [mainnet, deneb, dencun, cancun, xatu]
image: img/blog/dencun-fork-analysis.png
---

import Alert from '@site/src/components/Alert';
import GitHubRepo from '@site/src/components/GitHubRepo';

<Alert>
The Ethereum Foundation is running a Data Challenge for EIP4844! If you'd like access to the data used in this analysis send an email to ethpandaops(at)ethereum.org

More info: https://esp.ethereum.foundation/data-challenge-4844
</Alert>

## Introduction
Dencun has finally shipped to mainnet! This post will give some initial insights on how the fork event unfolded, and how it's performing.
    
This analysis will cover roughly ~1d before the Dencun fork and ~1d after the fork. 

### Parameters
- Network: Ethereum Mainnet
- Fork: Dencun 
- Load: Free range, all organic blob and transaction load 🍃
    
## Data sources
Data was collected from 2 different sets of nodes. Each analysis section will note which data source used.

### Xatu

<GitHubRepo repo="ethpandaops/xatu" />

Data was collected with the use of our distributed monitoring tool called [Xatu](https://notes.ethereum.org/@ethpandaops/xatu-overview). Xatu has a low resource use component called a Sentry that can collect data from the consensus client event stream and forward it to the Xatu server for collection. 

We hosted 45 such sentries across 6 locations in the world, including: Santa Clara, San Francisco, Amsterdam, Helsinki, Bengaluru and Sydney. The consensus client side consisted of 9x each production ready consensus layer client. 

Data from Xatu is available for research purposes. Send an email to `ethpandaops(at)ethereum.org` if you'd like access!

### Self-Hosted NUCs
We run a large part of our mainnet stack in house on NUCs, this is akin to hardware that most solo stakers possess. This however should be taken with a grain of salt as the resource might vary depending on quite a lot of smaller factors. NUCs run from Europe and the 🦅USA🦅.

## Analysis
### Resource Usage

> Data Source: Self-Hosted NUCs

<img class="rounded" src="/img/blog/cpu.png" />

> [Link to CPU graph](https://grafana.observability.ethpandaops.io/d/MRfYwus7k/nodes?orgId=1&from=1710250242000&to=1710423042000&var-consensus_client=All&var-execution_client=All&var-network=mainnet&var-filter=instance%7C%21%3D%7Cmainnet-prysm-nethermind-001&var-filter=instance%7C%21%3D%7Cmainnet-lighthouse-geth-001&var-filter=instance%7C%21~%7C.%2Abootnode.%2A&var-filter=instance%7C%21%3D%7Cgballet-staking-1&viewPanel=2)

<img class="rounded" src="/img/blog/ram.png" />

> [Link to RAM graph](https://grafana.observability.ethpandaops.io/d/MRfYwus7k/nodes?orgId=1&from=1710250242000&to=1710423042000&var-consensus_client=All&var-execution_client=All&var-network=mainnet&var-filter=instance%7C%21%3D%7Cmainnet-prysm-nethermind-001&var-filter=instance%7C%21%3D%7Cmainnet-lighthouse-geth-001&var-filter=instance%7C%21~%7C.%2Abootnode.%2A&var-filter=instance%7C%21%3D%7Cgballet-staking-1&viewPanel=9)

CPU and RAM usage seems mostly unchanged across the clients over. This is likely due to the blob load being quite small throughout this period and the extensive optimisations made by the client teams 🔥


<img class="rounded" src="/img/blog/network-use.png" />

> [Link to network graph](https://grafana.observability.ethpandaops.io/d/MRfYwus7k/nodes?orgId=1&from=1710329155885&to=1710347786717&var-consensus_client=All&var-execution_client=All&var-network=mainnet&var-filter=instance%7C%21%3D%7Cmainnet-prysm-nethermind-001&var-filter=instance%7C%21%3D%7Cmainnet-lighthouse-geth-001&var-filter=instance%7C%21~%7C.%2Abootnode.%2A&var-filter=instance%7C%21%3D%7Cgballet-staking-1&viewPanel=17)

Network usage is also largely unchanged for these nodes, but will likely slightly increase as blob usage increases.


### Beacon Chain

> Data Source: Self-Hosted NUCs + Xatu

<img class="rounded" src="/img/blog/network-participation.png" />

> [Link to network participation](https://grafana.observability.ethpandaops.io/d/MRfYwus7k/nodes?orgId=1&from=1710250242000&to=1710423042000&var-consensus_client=All&var-execution_client=All&var-network=mainnet&var-filter=instance%7C%21%3D%7Cmainnet-prysm-nethermind-001&var-filter=instance%7C%21%3D%7Cmainnet-lighthouse-geth-001&var-filter=instance%7C%21~%7C.%2Abootnode.%2A&var-filter=instance%7C%21%3D%7Cgballet-staking-1&viewPanel=36)

<img class="rounded" src="/img/blog/offline-attesters.png" />

We see a 5% drop in participation immediately after the fork. Using a combination of [Blockprint](https://github.com/sigp/blockprint) and co-relating it with Xatu sentry data we are able to determine that there was an even spread of offline attesters across consensus layer clients. This indicates that there was no specific issue with a cleint but instead a general "forgot to update" situation.


In terms of network health the drop reduced participation but quickly picked up and we are currently seeing similar levels as pre-fork.

### Blobs
> Data Source: Xatu

<img class="rounded" src="/img/blog/blob-overall.png" />

<img class="rounded" src="/img/blog/blob-distr.png" />

> [Link to blob distribution graph](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253039599&to=1710425839599&viewPanel=345)
> 
Based on the blob metrics per block, we mostly see 0 blob blocks being built. This is likely due to most L2s not having their governance proposals to start using blobs. We can expect the blob usage to increase as more L2s start posting blobs. 


<img class="rounded" src="/img/blog/blob-arrival.png" />

> [Link to blob arrival graph](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253089666&to=1710425889666&viewPanel=184)

The small number of blobs on the network lead to them being on average propagated across all the sentries in < 2.5s, with the p95 case being ~4s. **This is close to the attestation boundary, one should probably keep a close eye on this information.**


<img class="rounded" src="/img/blog/blob-heatmap.png" />

> [Link to blob heatmap](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253186535&to=1710425986535&viewPanel=185)

The blob heatmap mirrors the above point as well. Once there is more regular blob usage, we should be able to narrow down latency impacts on proposals.


Both the above graphs indicate that we might need to narrow down if there is a certain region with far worse latency (like Australia).

<img class="rounded" src="/img/blog/blob-diffs.png" />

> [Link to blob time difference graph](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253703079&to=1710426503079&viewPanel=231)

The time difference from the first blob seen to the last blob seen in a slot is quite narrow. This is good news as a higher latency would indicate some routing issues on the p2p layer. 


<img class="rounded" src="/img/blog/blob-per-slot.png" />

> [Link to blob propagation per slot](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253759997&to=1710426559997&viewPanel=195)

The numbers indicate at this load level that slots including 6 blobs or 1 blob doesn't have any noticeable impact on the average arrival time. 

<img class="rounded" src="/img/blog/blob-fill-rate.png" />

> [Link to blob fill percentage](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253759997&to=1710426559997&viewPanel=627)

Majority of blobs contain little or no empty space.

#### Blob impact on Blocks
> Data Source: Xatu

<img class="rounded" src="/img/blog/block-per-blob.png" />

> [Link to block propagation vs number of blobs](https://grafana.observability.ethpandaops.io/d/be15cc56-e151-4268-8772-f4a9c6a4e246/blobs?orgId=1&from=1710253726629&to=1710426526629&viewPanel=217)

Block arrival time seems to be is ~10% worse when a slot has 6 blobs compared to 1 blob. This is still well under the 4s mark, but we are clearly getting closer to the attestation deadline and more analysis might be needed.

### Attestations
> Data Source: Xatu

<img class="rounded" src="/img/blog/attestation-heatmap.png" />

> [Link to attestation heatmap](https://grafana.observability.ethpandaops.io/d/MR_U64N4k/beacon-api-events?orgId=1&from=1710253872932&to=1710426672932&viewPanel=75)
> 
The attestation heatmap seems largely unchanged before and after the fork. Note the bright spot can be ignored - this is just a quirk of the data pipeline tool which ingested some duplicates through that period.

<img class="rounded" src="/img/blog/attestation-arrival.png" />

There is an increase in the floor of `min` arrival time as attesters wait for any blobs referenced in the block to arrive before creating their attestation.

<img class="rounded" src="/img/blog/attestation-arrival-p50.png" />

The 50th percentile of attestation arrivals remains the same as before the fork.

### Blocks
> Data Source: Xatu

<img class="rounded" src="/img/blog/block-arrival.png" />

> [Link to block arrival graph](https://grafana.observability.ethpandaops.io/d/MR_U64N4k/beacon-api-events?orgId=1&from=1710250242000&to=1710423042000&viewPanel=36)

There is no major change in block arrival times after the fork. This isn't particularly surprising since the blob parameters are fairly conservative, but the indirect effects of more bandwidth usage were a concern. This may indicate that we can safely bump the target blob count in a future fork, but will need further analysis over a larger time period.


## Conclusion
Uneventful forks are the best - a huge shoutout to all involved. This result comes off the back of 2+ years of R&D, and paints an extremely bright outlook for the Ethereum community.

Things we expected:
- ✅ Blobs arrive within an acceptable time
- ✅ Slight delay in attestation arrivals due to the addition of blobs
- ✅ No massively noticable increase in block arrival times

Some questions will be answered as Dencun matures over time:
- ❓ Is there a higher reorg rate from the increased bandwidth
- ❓ Is there an impact to attestation effectiveness
    - ❓ Does it impact geographically distributed validators more
- ❓ Can we safely bump the blob parameters

**Wen Pectra?**