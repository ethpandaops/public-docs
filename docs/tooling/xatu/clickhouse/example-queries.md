---
sidebar_position: 2
---

# Example Queries

This page provides a collection of example queries for exploring and analyzing Ethereum network data in the Xatu ClickHouse database.

## Mempool Transactions

### Recent Transactions

Get the 10 most recent transactions from the mempool:

```sql
SELECT
    hex(transaction_hash) as tx_hash,
    from_address,
    to_address,
    value,
    gas_limit,
    max_fee_per_gas,
    max_priority_fee_per_gas,
    event_date_time
FROM
    mempool_transaction
WHERE
    meta_network_name = 'mainnet'
ORDER BY
    event_date_time DESC
LIMIT 10
```

### Gas Price Analysis

Calculate average gas prices over the last 24 hours, grouped by hour:

```sql
SELECT
    toStartOfHour(event_date_time) as hour,
    avg(max_fee_per_gas) as avg_max_fee,
    avg(max_priority_fee_per_gas) as avg_priority_fee,
    count() as tx_count
FROM
    mempool_transaction
WHERE
    event_date_time > NOW() - INTERVAL 1 DAY
    AND meta_network_name = 'mainnet'
GROUP BY
    hour
ORDER BY
    hour
```

### High Value Transactions

Find transactions with value over 10 ETH in the last hour:

```sql
SELECT
    hex(transaction_hash) as tx_hash,
    from_address,
    to_address,
    value / 1e18 as eth_value,
    event_date_time
FROM
    mempool_transaction
WHERE
    event_date_time > NOW() - INTERVAL 1 HOUR
    AND meta_network_name = 'mainnet'
    AND value > 10e18
ORDER BY
    value DESC
```

## Beacon Chain Events

### Recent Attestations

Get the most recent attestations:

```sql
SELECT
    event_type,
    meta_client_implementation,
    meta_client_version,
    meta_network_name,
    event_date_time
FROM
    beacon_api_event
WHERE
    event_type = 'attestation'
    AND meta_network_name = 'mainnet'
ORDER BY
    event_date_time DESC
LIMIT 10
```

### Block Proposals By Client

Count block proposals by client implementation over the last 24 hours:

```sql
SELECT
    meta_client_implementation,
    count() as block_count
FROM
    beacon_api_event
WHERE
    event_type = 'block'
    AND meta_network_name = 'mainnet'
    AND event_date_time > NOW() - INTERVAL 1 DAY
GROUP BY
    meta_client_implementation
ORDER BY
    block_count DESC
```

## Network Discovery

### Node Distribution by Client

Count the number of nodes by client implementation:

```sql
SELECT
    execution_client_name,
    count() as node_count
FROM
    network_discovery
WHERE
    meta_network_name = 'mainnet'
    AND event_date_time > NOW() - INTERVAL 1 DAY
GROUP BY
    execution_client_name
ORDER BY
    node_count DESC
```

### Geographic Distribution

Count nodes by country:

```sql
SELECT
    meta_geo_country,
    count() as node_count
FROM
    network_discovery
WHERE
    meta_network_name = 'mainnet'
    AND event_date_time > NOW() - INTERVAL 1 DAY
GROUP BY
    meta_geo_country
ORDER BY
    node_count DESC
```

## Advanced Examples

### Transaction Propagation Time

Calculate average time for transactions to propagate across the network:

```sql
WITH first_seen AS (
    SELECT
        transaction_hash,
        min(event_date_time) as first_time
    FROM
        mempool_transaction
    WHERE
        event_date_time > NOW() - INTERVAL 1 HOUR
        AND meta_network_name = 'mainnet'
    GROUP BY
        transaction_hash
)

SELECT
    avg(dateDiff('millisecond', f.first_time, m.event_date_time)) as avg_propagation_ms,
    count(DISTINCT m.transaction_hash) as tx_count
FROM
    mempool_transaction m
JOIN
    first_seen f
ON
    m.transaction_hash = f.transaction_hash
WHERE
    m.event_date_time > f.first_time
    AND m.event_date_time < f.first_time + INTERVAL 10 SECOND
```

### Client Version Distribution Over Time

Track client version distribution changes over the last week:

```sql
SELECT
    toStartOfDay(event_date_time) as day,
    meta_client_implementation,
    meta_client_version,
    count(DISTINCT meta_node_id) as node_count
FROM
    beacon_api_event
WHERE
    event_date_time > NOW() - INTERVAL 7 DAY
    AND meta_network_name = 'mainnet'
GROUP BY
    day,
    meta_client_implementation,
    meta_client_version
ORDER BY
    day DESC,
    node_count DESC
``` 