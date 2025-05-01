---
sidebar_position: 1
---

import RelatedLinks from '@site/src/components/RelatedLinks';

# Intro

<RelatedLinks 
  links={[
    {
      name: "Clickhouse",
      url: "https://clickhouse.com/"
    }, 
    {
      name: "Schema Documentation",
      url: "/data/xatu/schema"
    },  
    {
      name: "Example Queries",
      url: "/docs/guides/data-analysts/xatu-stack/clickhouse/example-queries"
    }
  ]}
/>


ClickHouse is an open-source column-oriented database that stores data for the Xatu platform and provides fast analytics capabilities.

## Overview

Xatu uses ClickHouse as a primary storage and analytics engine for the large volumes of data collected from the Ethereum network. ClickHouse's columnar storage format and query optimization make it ideal for the time-series and event data that Xatu processes.

Key benefits of using ClickHouse with Xatu include:

- **High Query Performance**: Optimized for analytical queries over large datasets
- **Efficient Storage**: Columnar storage with compression for network data
- **Real-time Analytics**: Process incoming Ethereum network data in real-time
- **Scalability**: Ability to handle petabytes of Ethereum network data

## Access

Currently access is restricted. Please contact us if you need access.

**Endpoint**: https://clickhouse.xatu.ethpandaops.io

### Using Curl

> _Replace `CLICKHOUSE_USER` and `CLICKHOUSE_PASSWORD` with your credentials._

```bash
echo """
    SELECT
        *
    FROM mempool_transaction
    WHERE
        event_date_time > NOW() - INTERVAL '1 day'
        AND meta_network_name = 'mainnet'
    LIMIT 5
    FORMAT JSON
""" | curl "https://clickhouse.xatu.ethpandaops.io" -u "$CLICKHOUSE_USER:$CLICKHOUSE_PASSWORD" --data-binary @- | jq
```

### Using Jupyter Notebooks

Install dependencies:

```bash
pip install --quiet jupysql clickhouse_sqlalchemy
```

Create a new notebook:

```python
# Import jupysql Jupyter extension to create SQL cells
%load_ext sql
%config SqlMagic.autocommit=False
# Replace CLICKHOUSE_USER and CLICKHOUSE_PASSWORD with your credentials (use a secret manager in jupyter if possible)
%sql clickhouse+http://CLICKHOUSE_USER:CLICKHOUSE_PASSWORD@clickhouse.xatu.ethpandaops.io:443/default?protocol=https
# select 10 rows from mempool transaction table
%sql SELECT * FROM mempool_transaction WHERE event_date_time > NOW() - INTERVAL '1 HOUR' LIMIT 10;
```

## Available Tables

The Xatu ClickHouse instance provides several tables for different types of Ethereum network data:

- `mempool_transaction` - All mempool transactions observed
- `block_execution` - Block execution metrics
- `beacon_api_event` - Events from beacon chain API
- `network_discovery` - Node discovery information
- `p2p_message` - P2P network messages

For a complete list of tables and their schemas, please see the [Schema Documentation](/data/xatu).