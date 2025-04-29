---
slug: open-source-xatu-data
title: Open Sourcing Xatu Data 
authors: [savid, samcm]
tags: [xatu, data, mainnet, sepolia, holesky]
image: img/blog/open-source-xatu-data.png
---

import Alert from '@site/src/components/Alert';
import GitHubRepo from '@site/src/components/GitHubRepo';
import { Details, Summary } from '@site/src/components/Collapsible';

<Alert>
The Ethereum Foundation is running a Data Challenge for EIP4844! [Click here](https://esp.ethereum.foundation/data-challenge-4844) for more info.
</Alert>

## Introduction

We're thrilled to share that the EthPandaOps Xatu dataset is now open source!

The dataset contains a wealth of information about the Ethereum network, including detailed data on beacon chain events, mempool activity, and canonical chain events.

<GitHubRepo repo="ethpandaops/xatu-data" />

Summary:

- The data is dedicated to the public domain under the CC BY 4.0 license
- The entire schema is available [here](/data/xatu#schema)
- Data is partitioned by hour or day in [Apache Parquet](https://parquet.apache.org) files
- We've already published the last 60 days of data for Mainnet, Holesky & Sepolia
  - We'll publish everything we have for Mainnet over the following weeks -- it's just a lot of data!
  - Testnets will have the last 90 days of data published
  - Check [here](/data/xatu) for detailed data availability
- We'll continue to update tables with new data, as well as add new tables

## Why are we open sourcing the data?

We aim to empower researchers, developers, and enthusiasts to explore the Ethereum network in depth and contribute to its ongoing evolution. We believe that open access to high-quality data is essential for the success of the Ethereum ecosystem.

By making this data publicly available we hope to foster greater understanding of the Ethereum network and drive advancements in areas such as protocol development, monitoring and performance optimization.

## What is Xatu?

[Xatu](https://github.com/ethpandaops/xatu) is a tool for collecting data from different components of the Ethereum network that we've been building for a while now. Since it's initial release in December 2022 we've been running Xatu internally to monitor the Ethereum network by storing data in [Clickhouse](https://clickhouse.com/).

In-house we're using it for monitoring, analysis and incident response. Notably it was used for the [Big Blocks Test](https://notes.ethereum.org/@samcm/big-blocks) on Goerli/Mainnet in 2023 to help decide the EIP4844 blob parameters. It has also been the first port of call for analysing how Dencun performed through the fork lifecycle of [Devnets](https://notes.ethereum.org/@ethpandaops/dencun-devnet-10-analysis) -> [Testnets](https://notes.ethereum.org/@ethpandaops/goerli-sf-0-analysis) -> [Mainnet](../dencun-fork-analysis).

## What's in the dataset?

Xatu has it's fingers in a lot of pies so we categorize the data into a few different types. Check [here](/data/xatu#schema) for the complete schema and data availability date ranges.

### Beacon API Events

<Alert>
Last 60 days published
</Alert>

Events that are derived from the [Beacon API Event Stream](https://ethereum.github.io/beacon-APIs/#/Events/eventstream) via Xatu Sentry from all consensus clients in multiple regions and networks. All events are annotated with additional data to help with analysis. For example, the `attestation` events have information about *when* the attestation was seen, and even the `validator_index` of the attestation. **Mainnet data exists from June 2023.**

- 650+ billion `attestation` events
  - 6TiB compressed, 300TiB uncompressed 😲
- 50+ million `block` events
- 50+ million `blob_sidecar` events
- Plus more!

### Mempool Events

<Alert>
Publishing soon <sup>tm</sup>
</Alert>

Events that are derived from Xatu Mimicry which connects to the execution p2p network. We'll be publishing these events in the next few days. **Mainnet data exists from March 2023.**

- 3+ billion `transaction` events

### Canonical Events

<Alert>
Publishing soon <sup>tm</sup>
</Alert>

We also derive events from the finalized chain which we call `canonical` events. **Mainnet data exists from Beacon Chain genesis in December 2020.**

These events are especially useful for analysis when compared to `Beacon API Events` and `Mempool Events`. For example, comparing when an attestation was seen on the network against when it was included in a beacon block, or comparing when a transaction was first seen in the mempool to when it was included in a block. We'll be publishing these events in the coming weeks.


## How do I use the data?

The data is stored in Apache Parquet files which are a columnar storage format that is highly optimized for analytics. You can read these files using a variety of tools including Python & Clickhouse. Check out the [repo](https://github.com/ethpandaops/xatu-data) for more information on how to get started.

### Clickhouse

Using Clickhouse is the simplest way to get started. You can use the `clickhouse client` to query the data directly from the Parquet files. Check out the [Clickhouse documentation](https://clickhouse.com/docs/en/install) to get setup.

#### Querying directly
To query all attestations events in Sepolia on the 20th of March 2024 in the 13th hour you can use the following query:
<Details>
<Summary>Query</Summary>
```sql
SELECT COUNT(*)
FROM
    url('https://data.ethpandaops.io/xatu/sepolia/databases/default/beacon_api_eth_v1_events_attestation/2024/2/20/13.parquet', 'Parquet')
```
</Details>

<img alt="Querying Parquet directly from Clickhouse" class="rounded" src="/img/blog/example-1.png" />

#### Inserting data
You can also insert the data into a Clickhouse database to query it more easily. This is highly recommended for larger queries.
<Details>
<Summary>Query</Summary>
```sql
INSERT INTO default.beacon_api_eth_v1_events_attestation
SELECT *
FROM url('https://data.ethpandaops.io/xatu/sepolia/databases/default/beacon_api_eth_v1_events_attestation/2024/2/20/13.parquet', 'Parquet')
```
</Details>

<img alt="Inserting directly in to Clickhouse" class="rounded" src="/img/blog/example-3.png" />

#### Globbing
Clickhouse supports globbing so you can query multiple Parquet files at once. For example, to count the entire days worth of attestation events in Sepolia on the 20th of March 2024 you can use the following query:
<Details>
<Summary>Query</Summary>
```sql
SELECT COUNT(*)
FROM
    url('https://data.ethpandaops.io/xatu/sepolia/databases/default/beacon_api_eth_v1_events_attestation/2024/2/20/{0..23}.parquet', 'Parquet')
```
</Details>

<img alt="Querying Parquet directly from Clickhouse with globbing" class="rounded" src="/img/blog/example-2.png" />

## Conclusion

We cannot wait to see what the community does with the data! If you cook something up please let us know! We'd love to hear about it. If you have any questions feel free to reach out to us on [Twitter](https://twitter.com/ethpandaops). If you notice any issues please make an issue on the [repo](https://github.com/ethpandaops/xatu-data/issues).

Happy querying and don't forget the [Data Challenge](https://esp.ethereum.foundation/data-challenge-4844) run by the Ethereum Foundation!

Love,

EthPandaOps Team ❤️
