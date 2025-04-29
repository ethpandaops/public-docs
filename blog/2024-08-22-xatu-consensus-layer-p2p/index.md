---
slug: xatu-consensus-layer-p2p
title: Xatu Consensus Layer P2P tables now available
authors: [savid, samcm]
tags: [xatu, consensus layer, p2p]
image: img/blog/xatu-consensus-layer-p2p.png
githubRepos:
  - name: xatu-data
    url: https://github.com/ethpandaops/xatu-data
  - name: probe-lab/hermes
    url: https://github.com/probe-lab/hermes
relatedLinks:
  - name: Apache Parquet
    url: https://parquet.apache.org
  - name: Xatu Telegram Group
    url: https://t.me/+JanoQFu_nO8yNzQ1
---

import Alert from '@site/src/components/Alert';
import Mermaid from '@theme/Mermaid';

We're excited to announce that a handful of the Xatu Consensus Layer P2P tables are now publicly available in Parquet format!

All data is captured directly from the Consensus Layer P2P network by utilising [Probelab's](https://probelab.io) [Hermes](https://github.com/probe-lab/hermes) project and [Xatu](https://github.com/ethpandaops/xatu). Instances are run by the EthPandaOps team in 2 regions.

Summary:

- The data is dedicated to the public domain under the CC BY 4.0 license
- Data is partitioned by hour or day in [Apache Parquet](https://parquet.apache.org) files
- We've been collecting this data for the last few months!

By providing this data we hope to enable more in-depth analysis and research into the Ethereum network's behavior at the P2P level.

## Tables

- [libp2p_gossipsub_beacon_attestation](/data/xatu/schema/libp2p_%23libp2p_gossipsub_beacon_attestation)
- [libp2p_gossipsub_beacon_block](/data/xatu/schema/libp2p_%23libp2p_gossipsub_beacon_block)
- [libp2p_gossipsub_blob_sidecar](/data/xatu/schema/libp2p_%23libp2p_gossipsub_blob_sidecar)

<Alert>
**Note:** Data in these tables is only captured from a small subset of nodes and does not provide a complete picture of the network.
</Alert>

## About this data

This data is captured closer to the wire in comparison to the those collected via the beacon api event stream. It is therefore not verified in any way. This means that messages with invalid signatures or other issues are **not** filtered out. **This allows for a more comprehensive view of the network, including potential malicious or faulty behavior that might be filtered out at higher levels, but sacrifices some data quality.**

Here's a simplified diagram that shows how a block proposal would land in both the beacon api and the libp2p tables:

<Mermaid
  value={`graph TD
    A[Beacon Node A] -->|Block Proposal| B[P2P Network]
    B --> C[Beacon Node B]
    C --> D[Block Processing]
    D --> E[Beacon API Event Stream]
    E --> F[Xatu]
    F -->|Timestamped| I[beacon_api_eth_v1_events_block]
    B --> G[Xatu w/ Hermes]
    G -->|Timestamped| H[libp2p_gossipsub_beacon_block]
    
    style H fill:#FFFACD,stroke:#333,stroke-width:2px
    style I fill:#FFFACD,stroke:#333,stroke-width:2px`}
/>

## Getting started

The easiest way to get started is to install the Clickhouse client and use `clickhouse local` to query the data. [Working with the data](/data/xatu/#working-with-the-data) has more details.

### Examples

The following examples demonstrate how these newly available tables can be utilized both independently and in conjunction with our existing Xatu tables to address intriguing questions about the Ethereum network.

#### Example 1

Which 3 slots had the fastest arriving block proposals on 15th of August on Mainnet?

**Answer**: We can use the `libp2p_gossipsub_beacon_block` table to find the first seen time for each slot and then order by that value.

```sql
clickhouse local -q "
    SELECT
        min(propagation_slot_start_diff) as slot_time_ms,
        slot 
    FROM 
        url('https://data.ethpandaops.io/xatu/mainnet/databases/default/libp2p_gossipsub_beacon_block/2024/8/15.parquet', 'Parquet') 
    GROUP BY
        slot 
    ORDER BY
        slot_time_ms
    LIMIT 3
    FORMAT PrettyCompact
"
┌─slot_time_ms─┬────slot─┐
│          209 │ 9738557 │
│          229 │ 9742293 │
│          233 │ 9745006 │
└──────────────┴─────────┘
```

#### Example 2

Which blocks were seen before the deadline but still didn't make it in to the finalized chain on Mainnet?

**Answer**: We can check the `libp2p_gossipsub_beacon_block` table for blocks that were seen before the deadline on the p2p network, and then check the `canonical_beacon_block` table for blocks that were finalized.

```sql
clickhouse local -q "
    WITH p2p_blocks AS (
        SELECT 
            block AS block_hash,
            min(propagation_slot_start_diff) as first_seen_ms,
            slot_start_date_time,
            slot
        FROM 
            url('https://data.ethpandaops.io/xatu/mainnet/databases/default/libp2p_gossipsub_beacon_block/2024/8/15.parquet', 'Parquet')
        GROUP BY
            block, slot_start_date_time, slot
        HAVING
            first_seen_ms < 4000
    ),
    canonical_counts AS (
        SELECT 
            block_root AS block_hash, 
            COUNT(*) AS count
        FROM 
            url('https://data.ethpandaops.io/xatu/mainnet/databases/default/canonical_beacon_block/2024/8/{14..16}.parquet', 'Parquet')
        GROUP BY 
            block_root
    ),
    blocks_with_zero_count AS (
        SELECT block_hash
        FROM canonical_counts
        WHERE count = 0
    )

    SELECT 
        p2p.slot as slot,
        p2p.first_seen_ms
    FROM p2p_blocks p2p
    LEFT JOIN canonical_counts c ON p2p.block_hash = c.block_hash
    LEFT JOIN blocks_with_zero_count b ON p2p.block_hash = b.block_hash
    WHERE COALESCE(c.count, 0) = 0
    ORDER BY p2p.first_seen_ms ASC
    LIMIT 10
    FORMAT PrettyCompact
"
┌────slot─┬─p2p.first_seen_ms─┐
│ 9743140 │               924 │
│ 9743136 │              3053 │
│ 9738789 │              3476 │
│ 9738302 │              3725 │
│ 9743407 │              3837 │
└─────────┴───────────────────┘
```

#### Example 3

How long did it take for attestations from validator 0 to be included on chain in the Sepolia network, and when were they first seen on the p2p network?

**Answer:** We can compare the time attestations were seen on the Sepolia p2p network with the time they were included on chain. We'll use the `libp2p_gossipsub_beacon_attestation` table for p2p data and the `canonical_beacon_elaborated_attestation` table for when they were included on chain, joining them based on the block root.

Note: Attestation files can be large so we're only looking at an hour of attestation data.

```sql
clickhouse local -q "
    WITH attestations AS (
        SELECT
            slot,
            min(propagation_slot_start_diff) as first_seen_ms
        FROM
            url('https://data.ethpandaops.io/xatu/sepolia/databases/default/libp2p_gossipsub_beacon_attestation/2024/8/8/0.parquet', 'Parquet')
        WHERE attesting_validator_index = 0
        GROUP BY slot
    ),
    on_chain_attestations AS (
        SELECT
            slot,
            min(block_slot) as first_seen_slot
        FROM
            url('https://data.ethpandaops.io/xatu/sepolia/databases/default/canonical_beacon_elaborated_attestation/2024/8/8.parquet', 'Parquet')
        WHERE has(validators, 0)
        GROUP BY slot
    )
    SELECT 
        a.slot,
        a.first_seen_ms as p2p_first_seen_ms,
        o.first_seen_slot - a.slot AS inclusion_delay_slots
    FROM attestations a
    LEFT JOIN on_chain_attestations o ON a.slot = o.slot
    ORDER BY a.slot ASC
    FORMAT PrettyCompact
"
┌────slot─┬─p2p_first_seen_ms─┬─inclusion_delay_slots─┐
│ 5611821 │              1036 │                     1 │
│ 5611852 │               885 │                     1 │
│ 5611890 │              4188 │                     1 │
│ 5611920 │               701 │                     1 │
│ 5611960 │              4145 │                     2 │
│ 5611985 │               580 │                     1 │
│ 5612027 │              4153 │                     2 │
│ 5612037 │               764 │                     1 │
│ 5612067 │               534 │                     1 │
└─────────┴───────────────────┴───────────────────────┘
```

## Wrapping up

We hope you find this data useful and look forward to seeing what you build with it! If you have any questions or feedback please reach out to us on [Twitter](https://twitter.com/ethpandaops) or join the [Xatu Telegram Group](https://t.me/+JanoQFu_nO8yNzQ1)

Happy querying!

Love,

EthPandaOps Team ❤️
