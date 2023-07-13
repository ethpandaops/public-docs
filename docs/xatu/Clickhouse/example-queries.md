# Example Queries

## List tables

```sql
SHOW tables FROM default WHERE name NOT LIKE '202%_%' AND name NOT LIKE '%_local' AND name NOT LIKE '%_test'
```

## Show all blocks seen by nimbus sentries for a given slot

```sql
SELECT
    *
FROM beacon_api_eth_v1_events_block
WHERE
    meta_network_name = 'mainnet'
    AND slot_start_date_time BETWEEN '2023-06-20 01:20:00' AND '2023-06-20 01:30:00' -- strongly recommend filtering by the partition key (slot_start_date_time) for query performance
    AND meta_consensus_implementation = 'nimbus'
    AND slot = 6700000
```

## Show attestations targeting a given beacon block root

```sql
SELECT
    *
FROM beacon_api_eth_v1_events_attestation
WHERE 
    meta_network_name = 'mainnet'
    AND slot_start_date_time BETWEEN '2023-06-20 01:20:00' AND '2023-06-20 01:30:00' -- strongly recommend filtering by the partition key (slot_start_date_time) for query performance
    AND beacon_block_root = '0x5da9ae052f42056e3e9957ce141a1c9ab28a95ed54de263317fe744c3a17ccb5' -- slot 6700000
LIMIT 100 -- limit to 100 rows for sanity
```
