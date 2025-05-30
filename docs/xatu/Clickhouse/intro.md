---
sidebar_position: 1
---

# Introduction

ClickHouse is an open-source column-oriented database that stores data for the Xatu platform and provides fast analytics.

## Accesss

Currently access is restricted. Please contact us if you need access.

**endpoint**: [https://clickhouse.xatu.ethpandaops.io](https://clickhouse.xatu.ethpandaops.io)

### Curl

*Replace `CLICKHOUSE_USER` and `CLICKHOUSE_PASSWORD` with your credentials.*

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

### Jupyter notebooks example

[Offical docs](https://clickhouse.com/docs/en/integrations/sql-clients/jupysql)

Install dependencies;
```bash
pip install --quiet jupysql clickhouse_sqlalchemy
```

Create a new notebook;
```python
# Import jupysql Jupyter extension to create SQL cells
%load_ext sql
%config SqlMagic.autocommit=False
# Replace CLICKHOUSE_USER and CLICKHOUSE_PASSWORD with your credentials (use a secret manager in jupyter if possible)
%sql clickhouse+http://CLICKHOUSE_USER:CLICKHOUSE_PASSWORD@clickhouse.xatu.ethpandaops.io:443/default?protocol=https
# select 10 rows from mempool transaction table
%sql SELECT * FROM mempool_transaction WHERE event_date_time > NOW() - INTERVAL '1 HOUR' LIMIT 10;
```
