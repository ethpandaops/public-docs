---
slug: xatu-execution-layer
title: Xatu Execution Layer data now available
authors: [savid, samcm]
tags: [xatu, execution layer, cryo]
image: img/blog/xatu-execution-layer.png
---

We're excited to announce that Execution layer data, extracted via [cryo](https://github.com/paradigmxyz/cryo), is now available in the Xatu dataset.

GitHub repo: [paradigmxyz/cryo](https://github.com/paradigmxyz/cryo)

Summary:

- The data is dedicated to the public domain under the CC BY 4.0 license
- Data is partitioned in 1000 block chunks in [Apache Parquet](https://parquet.apache.org) files
- We've extracted data all the way back to genesis

By providing this data we hope to enable more in-depth analysis and research into the Ethereum ecosystem and compliment the rest of the dataset.

## Tables

- [canonical_execution_block](/data/xatu/schema/canonical_execution_#canonical_execution_block)
- [canonical_execution_transaction](/data/xatu/schema/canonical_execution_#canonical_execution_transaction)
- [canonical_execution_traces](/data/xatu/schema/canonical_execution_#canonical_execution_traces)
- [canonical_execution_logs](/data/xatu/schema/canonical_execution_#canonical_execution_logs)
- [canonical_execution_contracts](/data/xatu/schema/canonical_execution_#canonical_execution_contracts)
- [canonical_execution_four_byte_counts](/data/xatu/schema/canonical_execution_#canonical_execution_four_byte_counts)
- [canonical_execution_address_appearances](/data/xatu/schema/canonical_execution_#canonical_execution_address_appearances)
- [canonical_execution_balance_diffs](/data/xatu/schema/canonical_execution_#canonical_execution_balance_diffs)
- [canonical_execution_balance_reads](/data/xatu/schema/canonical_execution_#canonical_execution_balance_reads)
- [canonical_execution_erc20_transfers](/data/xatu/schema/canonical_execution_#canonical_execution_erc20_transfers)
- [canonical_execution_erc721_transfers](/data/xatu/schema/canonical_execution_#canonical_execution_erc721_transfers)
- [canonical_execution_native_transfers](/data/xatu/schema/canonical_execution_#canonical_execution_native_transfers)
- [canonical_execution_nonce_diffs](/data/xatu/schema/canonical_execution_#canonical_execution_nonce_diffs)
- [canonical_execution_nonce_reads](/data/xatu/schema/canonical_execution_#canonical_execution_nonce_reads)
- [canonical_execution_storage_diffs](/data/xatu/schema/canonical_execution_#canonical_execution_storage_diffs)
- [canonical_execution_storage_reads](/data/xatu/schema/canonical_execution_#canonical_execution_storage_reads)

## About this data

- Data is extracted via [cryo](https://github.com/paradigmxyz/cryo) only when the block is finalized on the beacon chain
- There is a delay before the [Apache Parquet](https://parquet.apache.org) files are available for public access of approximately ~6-24 hours
- Data is stored in chunks of **1000** blocks eg;
    - `0.parquet` (block numbers **0** - **999**)
    - `1000.parquet` (block numbers **1000** - **1999**)
    - `2000.parquet` (block numbers **2000** - **2999**)
    - `1000000.parquet` (block numbers **1000000** - **1000999**)
- All hex strings are lowercased, so remember to use the [`lower`](https://clickhouse.com/docs/en/sql-reference/functions/string-functions#lower) function eg. `WHERE transaction_hash = lower('0xABcd1234')`
- For integer columns with a bit width greater than 64 (`Int128`/`UInt128`/`Int256`/`UInt256`) in parquet files, use the ClickHouse function [`reinterpretAsUIntX`](https://clickhouse.com/docs/en/sql-reference/functions/type-conversion-functions#reinterpretasuint256). For example, in the [canonical_execution_transaction](/data/xatu/schema/canonical_execution_#canonical_execution_transaction) table, the `value` column should be queried as `reinterpretAsUInt256(value)`.

## Getting started

The easiest way to get started is to install the Clickhouse CLI and use `clickhouse local` to query the data. [Working with the data](/data/xatu/#working-with-the-data) has more details.

### Examples

The following examples demonstrate some trivial queries you can run on the data.

#### Example 1

What are the top 5 block producers between block **20000000** and **20010999** on Mainnet?

**Answer**: We can use the `canonical_execution_block` table to group on extra data column.

```sql
clickhouse local -q "
    SELECT
        count(*) as count,
        author,
        extra_data_string
    FROM
        url('https://data.ethpandaops.io/xatu/mainnet/databases/default/canonical_execution_block/1000/{20000..20010}000.parquet', 'Parquet') 
    GROUP BY
        author, extra_data_string
    ORDER BY
        count DESC
    LIMIT 5
    FORMAT PrettyCompact
"

┌─count─┬─author─────────────────────────────────────┬─extra_data_string───────────────┐
│  5591 │ 0x95222290dd7278aa3ddd389cc1e1d165cc4bafe5 │ beaverbuild.org                 │
│  3389 │ 0x4838b106fce9647bdf1e7877bf73ce8b0bad5f97 │ Titan (titanbuilder.xyz)        │
│   441 │ 0x1f9090aae28b8a3dceadf281b0f12828e676c326 │ rsync-builder.xyz               │
│   325 │ 0x1f9090aae28b8a3dceadf281b0f12828e676c326 │ @rsyncbuilder                   │
│   220 │ 0xdf99a0839818b3f120ebac9b73f82b617dc6a555 │ Illuminate Dmocratize Dstribute │
└───────┴────────────────────────────────────────────┴─────────────────────────────────┘
```

#### Example 2

Top 5 transfers by value between blocks **20900000** and **20905999** on Mainnet?

**Answer**: We can use the `canonical_execution_transaction` table to filter out transactions with no calldata and order by value.

```sql
clickhouse local -q "
    SELECT
        block_number,
        transaction_hash,
        reinterpretAsUInt256(value) / 1e18 AS ether_value
    FROM 
        url('https://data.ethpandaops.io/xatu/mainnet/databases/default/canonical_execution_transaction/1000/{20900..20905}000.parquet', 'Parquet') 
    WHERE 
        input IS NULL
    ORDER BY 
        ether_value DESC
    LIMIT 5
    FORMAT PrettyCompact
"

┌─block_number─┬─transaction_hash───────────────────────────────────────────────────┬────────ether_value─┐
│     20902203 │ 0x62927f22026352b0af12fa844e588b999089849b98c50a89641cd19d69dfac35 │ 14008.381015295294 │
│     20903687 │ 0x39882cafc4195eee7b63444be4e9d16aad57e9465c2c4ef565758fa559a4e9f8 │  8444.154971169999 │
│     20900096 │ 0x55a8950dc6e205bb1397bfe17a93767fb4ce026402b25ff9104476108b5d8807 │  8357.538338940001 │
│     20902260 │ 0xbee9e1fcbc8405f6ef6620c08f47f568e8df0bb80feb5d77362aaf0e38e123a5 │  7572.340613229151 │
│     20902737 │ 0x586f91964ed8a2adaab4f1c26a011b934a978c03e91303e9f74b206541fe9e21 │               6800 │
└──────────────┴────────────────────────────────────────────────────────────────────┴────────────────────┘
```

#### Example 3

What was the volume of USDT transferred between block **20900000** and **20905999** on Mainnet?

**Answer**: We can use the `canonical_execution_erc20_transfers` table to sum the value of the USDT erc20 contract address.

```sql
clickhouse local -q "
    SELECT
        sum(reinterpretAsUInt256(value)) / 1000000 as USDT
    FROM
        url('https://data.ethpandaops.io/xatu/mainnet/databases/default/canonical_execution_erc20_transfers/1000/{20900..20905}000.parquet', 'Parquet')
    WHERE 
        erc20 = lower('0xdAC17F958D2ee523a2206206994597C13D831ec7') -- USDT erc20 contract address
    FORMAT PrettyCompact
"

┌──────────────USDT─┐
│ 1585831125.724754 │ -- 1.59 billion
└───────────────────┘
```

#### Example 4

How can I debug the transaction `0xe1cf349a8e55309cfab9d8d3dd8a8094765f99d65b20864c265bcd234abfe570` in block **20875205** that failed to execute?

**Answer**: We can use the `canonical_execution_traces` table to get the full trace details. We know the transaction occured in block **20875205** so we can request the parquet chunk `20875000.parquet`.

```sql
clickhouse local -q "
    SELECT
        trace_address,
        action_from,
        action_to,
        action_value,
        action_gas,
        error
    FROM
        url('https://data.ethpandaops.io/xatu/mainnet/databases/default/canonical_execution_traces/1000/20875000.parquet', 'Parquet')
    WHERE 
        transaction_hash =  lower('0xe1cf349a8e55309cfab9d8d3dd8a8094765f99d65b20864c265bcd234abfe570')
    ORDER BY internal_index
    FORMAT PrettyCompact
"

┌─trace_address─┬─action_from────────────────────────────────┬─action_to──────────────────────────────────┬─action_value─┬─action_gas─┬─error──────┐
│ ᴺᵁᴸᴸ          │ 0x1FCCC097DB89A86BFC474A1028F93958295B1FB7 │ 0xEEFBA1E63905EF1D7ACBA5A8513C70307C1CE441 │ 0            │   29587220 │ Reverted   │
│ 0             │ 0xEEFBA1E63905EF1D7ACBA5A8513C70307C1CE441 │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0            │   28883047 │ ᴺᵁᴸᴸ       │
│ 0_0           │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x065347C1DD7A23AA043E3844B4D0746FF7715246 │ 0            │   28421311 │ ᴺᵁᴸᴸ       │
│ 0_1           │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x065347C1DD7A23AA043E3844B4D0746FF7715246 │ 0            │   28405020 │ ᴺᵁᴸᴸ       │
│ 0_2           │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x35A338522A435D46F77BE32C70E215B813D0E3AC │ 0            │   28394712 │ ᴺᵁᴸᴸ       │
│ 0_3           │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x35A338522A435D46F77BE32C70E215B813D0E3AC │ 0            │   28391907 │ ᴺᵁᴸᴸ       │
│ 0_4           │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x74C5A0D5DFCC6D4527C849F09ECC360C5345D986 │ 0            │   28384423 │ ᴺᵁᴸᴸ       │
│ 0_4_0         │ 0x74C5A0D5DFCC6D4527C849F09ECC360C5345D986 │ 0xEFF8E65AC06D7FE70842A4D54959E8692D6AE064 │ 0            │   27898562 │ ᴺᵁᴸᴸ       │
│ 0_4_0_0       │ 0xEFF8E65AC06D7FE70842A4D54959E8692D6AE064 │ 0x78910E1DFE6DF94EA7EEC54B25921673DB0E2A06 │ 0            │   27457785 │ ᴺᵁᴸᴸ       │
...
│ 221           │ 0xEEFBA1E63905EF1D7ACBA5A8513C70307C1CE441 │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0            │      67576 │ Out of gas │
│ 221_0         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x065347C1DD7A23AA043E3844B4D0746FF7715246 │ 0            │      62480 │ ᴺᵁᴸᴸ       │
│ 221_1         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x065347C1DD7A23AA043E3844B4D0746FF7715246 │ 0            │      48158 │ ᴺᵁᴸᴸ       │
│ 221_2         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x35A338522A435D46F77BE32C70E215B813D0E3AC │ 0            │      45036 │ ᴺᵁᴸᴸ       │
│ 221_3         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x35A338522A435D46F77BE32C70E215B813D0E3AC │ 0            │      44200 │ ᴺᵁᴸᴸ       │
│ 221_4         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x74C5A0D5DFCC6D4527C849F09ECC360C5345D986 │ 0            │      41145 │ ᴺᵁᴸᴸ       │
│ 221_4_0       │ 0x74C5A0D5DFCC6D4527C849F09ECC360C5345D986 │ 0xEFF8E65AC06D7FE70842A4D54959E8692D6AE064 │ 0            │      13996 │ ᴺᵁᴸᴸ       │
│ 221_4_0_0     │ 0xEFF8E65AC06D7FE70842A4D54959E8692D6AE064 │ 0x78910E1DFE6DF94EA7EEC54B25921673DB0E2A06 │ 0            │      13345 │ ᴺᵁᴸᴸ       │
│ 221_5         │ 0x9500F306CD233BF2BCFF1CC90D565C64626A162C │ 0x74C5A0D5DFCC6D4527C849F09ECC360C5345D986 │ 0            │       6184 │ Out of gas │
└───────────────┴────────────────────────────────────────────┴────────────────────────────────────────────┴──────────────┴────────────┴────────────┘
```

## Wrapping up

We hope you find this data useful and look forward to seeing what you build with it! If you have any questions or feedback please reach out to us on [Twitter](https://twitter.com/ethpandaops) or join the [Xatu Telegram Group](https://t.me/+JanoQFu_nO8yNzQ1)

Happy querying!

Love,

EthPandaOps Team ❤️
