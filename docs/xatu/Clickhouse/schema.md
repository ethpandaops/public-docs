---
sidebar_position: 1
---

# Schema

- [Recommended filters](#recommended-filters)
- [Common metadata fields](#common-metadata-fields)
- [Beacon API event stream](#beacon-api-event-stream)
    - [Head](#head)
    - [Block](#block)
    - [Attestation](#attestation)
    - [Voluntary exit](#voluntary-exit)
    - [Finalized checkpoint](#finalized-checkpoint)
    - [Chain reorg](#chain-reorg)
    - [Contribution and proof](#contribution-and-proof)
- [Slot](#slot)
- [Beacon API v2 beacon block](#beacon-api-v2-beacon-block)
- [Mempool transaction](#mempool-transaction)

## Recommended filters

- Most likely you will want to filter by network name. eg. `meta_network_name = 'mainnet'`
- Might want to filter by consensus client implementation. eg. `meta_consensus_implementation = 'lighthouse'`
- Always want to try to filter by the partition key. If you do not filter on large tables, there is a very high chance you're query will run out of memory and fail. eg. `slot_start_date_time BETWEEN '2023-06-01 00:00:00' AND '2023-06-02 00:00:00'`

## Common metadata fields

- `meta_client_name` - The name of the sentry client.
- `meta_client_id` - The identifier of the sentry client.
- `meta_client_version` - The version of the sentry client.
- `meta_client_implementation` - The sentry client's implementation details.
- `meta_client_os` - The operating system of the sentry client.
- `meta_client_ip` - The IP address of the sentry client.
- `meta_client_geo_city` - The sentry client's geographical location (city).
- `meta_client_geo_country` - The sentry client's geographical location (country).
- `meta_client_geo_country_code` - The sentry client's geographical location (country code).
- `meta_client_geo_continent_code` - The sentry client's geographical location (continent code).
- `meta_client_geo_longitude` - The sentry client's geographical location (longitude).
- `meta_client_geo_latitude` - The sentry client's geographical location (latitude).
- `meta_client_geo_autonomous_system_number` - The sentry client's autonomous system number.
- `meta_client_geo_autonomous_system_organization` - The sentry client's autonomous system organization.
- `meta_client_geo_isp` - The sentry client's Internet Service Provider.
- `meta_client_geo_organization` - The sentry client's geographical organization.
- `meta_network_id` - The etherum network identifier.
- `meta_network_name` - The name of the etherum network.
- `meta_consensus_version` - The consensus client version.
- `meta_consensus_version_major` - The major number of the consensus client version.
- `meta_consensus_version_minor` - The minor number of the consensus client version.
- `meta_consensus_version_patch` - The patch number of the consensus client version.
- `meta_consensus_implementation` - The implementation details of the client consensus.
- `meta_labels` - A map of key-value pairs for any additional metadata.

## Beacon API event stream

[Beacon API Event stream](https://ethereum.github.io/beacon-APIs/?urls.primaryName=dev#/Events/eventstream) related tables.

### Head

#### General

- `event_date_time` - The timestamp when sentry received the event from the event stream.
- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time.
- `block` - The block hash.
- `epoch` - The epoch number.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `epoch_transition` - A boolean flag indicating if there was an epoch transition.
- `execution_optimistic` - A boolean flag indicating if the execution was optimistic.
- `previous_duty_dependent_root` - The dependent root of the previous duty.
- `current_duty_dependent_root` - The dependent root of the current duty.

```sql
CREATE TABLE beacon_api_eth_v1_events_head (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  block FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  epoch_transition Bool,
  execution_optimistic Bool,
  previous_duty_dependent_root FixedString(66) Codec(ZSTD(1)),
  current_duty_dependent_root FixedString(66) Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, meta_network_name, meta_client_name);
```

### Block

#### General

- `event_date_time` - The timestamp when sentry received the event from the event stream.
- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time.
- `block` - The block hash.
- `epoch` - The epoch number.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `execution_optimistic` - A boolean flag indicating if the execution was optimistic.

```sql
CREATE TABLE beacon_api_eth_v1_events_block (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  block FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  execution_optimistic Bool,
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, meta_network_name, meta_client_name);
```

#### Aggregated propagation

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `block` - The block hash.
- `min_propagation_slot_start_diff` The minimum difference in propagation between the slot start and the event date time for the given `block`.
- `max_propagation_slot_start_diff` The maximum difference in propagation between the slot start and the event date time for the given `block`.

```sql
CREATE TABLE beacon_api_eth_v1_events_block_block_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  block FixedString(66) Codec(ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  min_propagation_slot_start_diff AggregateFunction(min, UInt32) Codec(ZSTD(1)),
  max_propagation_slot_start_diff AggregateFunction(max, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, block, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

### Attestation

#### General

- `event_date_time` - The timestamp when sentry received the event from the event stream.
- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time.
- `committee_index` The committee index as a string.
- `signature` The signature of the attestation event.
- `aggregation_bits` The aggregation bits of the attestation.
- `beacon_block_root` The root of the beacon block.
- `epoch` The epoch number.
- `epoch_start_date_time` The timestamp when the epoch started.
- `source_epoch` The source epoch number.
- `source_epoch_start_date_time` The timestamp when the source epoch started.
- `source_root` The source root hash.
- `target_epoch` The target epoch number.
- `target_epoch_start_date_time` The timestamp when the target epoch started.
- `target_root` The target root hash.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  committee_index LowCardinality(String),
  signature String Codec(ZSTD(1)),
  aggregation_bits String Codec(ZSTD(1)),
  beacon_block_root FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  source_epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  source_epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  source_root FixedString(66) Codec(ZSTD(1)),
  target_epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  target_epoch_start_date_time DateTime Codec(Dobeacon_api_eth_v1_events_attestation_localring) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, meta_network_name, meta_client_name);
```

#### Minimal

 Compressed signature using xxHash with omitted `committee_index` and `aggregation_bits` fields.

- `event_date_time` - The timestamp when sentry received the event from the event stream.
- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time.
- `signature` The signature of the attestation event.
- `beacon_block_root` The root of the beacon block.
- `epoch` The epoch number.
- `epoch_start_date_time` The timestamp when the epoch started.
- `source_epoch` The source epoch number.
- `source_epoch_start_date_time` The timestamp when the source epoch started.
- `source_root` The source root hash.
- `target_epoch` The target epoch number.
- `target_epoch_start_date_time` The timestamp when the target epoch started.
- `target_root` The target root hash.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_minimal_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  signature UInt32 Codec(ZSTD(1)),
  beacon_block_root FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  source_epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  source_epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  source_root FixedString(66) Codec(ZSTD(1)),
  target_epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  target_epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  target_root FixedString(66) Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, meta_network_name);
```

#### Aggregated sum of 100ms intervals for use in heatmaps

Used to sum the number of unique attestations in 100ms buckets.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time. (100ms buckets)
- `total` The total number of events in the 100ms bucket.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_heatmap_100ms_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt8 Codec(Gorilla, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  total AggregateFunction(sum, UInt16) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, propagation_slot_start_diff, meta_client_name, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### Aggregated sum of 250ms intervals for use in heatmaps

Used to sum the number of unique attestations in 250ms buckets.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference in propagation between the slot start and the event date time. (250ms buckets)
- `total` The total number of events in the 250ms bucket.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_heatmap_250ms_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt8 Codec(Gorilla, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  total AggregateFunction(sum, UInt16) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, propagation_slot_start_diff, meta_client_name, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### General aggregations

General aggregations are used to calculate the average, minimum, maximum, and percentiles of the propagation time between the slot start and the event date time.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `max_propagation_slot_start_diff` - The maximum difference in propagation between the slot start and the event date time.
- `avg_propagation_slot_start_diff` - The average difference in propagation between the slot start and the event date time.
- `min_propagation_slot_start_diff` - The minimum difference in propagation between the slot start and the event date time.
- `p99_propagation_slot_start_diff` - The 99th percentile difference in propagation between the slot start and the event date time.
- `p95_propagation_slot_start_diff` - The 95th percentile difference in propagation between the slot start and the event date time.
- `p90_propagation_slot_start_diff` - The 90th percentile difference in propagation between the slot start and the event date time.
- `p50_propagation_slot_start_diff` - The 50th percentile difference in propagation between the slot start and the event date time.
- `p10_propagation_slot_start_diff` - The 10th percentile difference in propagation between the slot start and the event date time.
- `p05_propagation_slot_start_diff` - The 5th percentile difference in propagation between the slot start and the event date time.
- `p01_propagation_slot_start_diff` - The 1st percentile difference in propagation between the slot start and the event date time.
- `stddev_pop_propagation_slot_start_diff` - The standard deviation of the difference in propagation between the slot start and the event date time.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_general_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  max_propagation_slot_start_diff AggregateFunction(max, UInt32) Codec(ZSTD(1)),
  avg_propagation_slot_start_diff AggregateFunction(avg, UInt32) Codec(ZSTD(1)),
  min_propagation_slot_start_diff AggregateFunction(min, UInt32) Codec(ZSTD(1)),
  p99_propagation_slot_start_diff AggregateFunction(quantile(0.99), UInt32) Codec(ZSTD(1)),
  p95_propagation_slot_start_diff AggregateFunction(quantile(0.95), UInt32) Codec(ZSTD(1)),
  p90_propagation_slot_start_diff AggregateFunction(quantile(0.90), UInt32) Codec(ZSTD(1)),
  p50_propagation_slot_start_diff AggregateFunction(quantile(0.50), UInt32) Codec(ZSTD(1)),
  p10_propagation_slot_start_diff AggregateFunction(quantile(0.10), UInt32) Codec(ZSTD(1)),
  p05_propagation_slot_start_diff AggregateFunction(quantile(0.05), UInt32) Codec(ZSTD(1)),
  p01_propagation_slot_start_diff AggregateFunction(quantile(0.01), UInt32) Codec(ZSTD(1)),
  stddev_pop_propagation_slot_start_diff AggregateFunction(stddevPop, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, meta_client_name, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### Agreement aggregations

Used to calculate the agreement between clients for a given beacon block root.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `beacon_block_root` - The root of the beacon block.
- `total` - The total number of attestations for the beacon block root.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_agreement_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  beacon_block_root FixedString(66) Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  total AggregateFunction(sum, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, beacon_block_root, meta_client_name, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### Inclusion aggregations

Used to determine the "seen" distance of an attestation. How far away from the attestation slot was the attestation seen.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `inclusion_distance` - The number of slots from the `slot_start_date_time` value. i.e. `toUInt8(floor(divide(propagation_slot_start_diff, 12000))) as inclusion_distance,`.
- `total` - The total number of unique attestations by signature.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_inclusion_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  inclusion_distance UInt8 Codec(Gorilla, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  total AggregateFunction(uniq, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, meta_client_name, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### Signature aggregations

Used to measure the min and max propagation of an attestation.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `signature` - The signature of the attestation.
- `min_propagation_slot_start_diff` - The minimum propagation of the attestation.
- `max_propagation_slot_start_diff` - The maximum propagation of the attestation.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_signature_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  signature UInt32 Codec(ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  min_propagation_slot_start_diff AggregateFunction(min, UInt32) Codec(ZSTD(1)),
  max_propagation_slot_start_diff AggregateFunction(max, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, signature, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

#### Unique signature aggregations

Used to calculate how many sentries captured the same attestation.

- `slot` - The slot number.
- `slot_start_date_time` - The timestamp when the slot started.
- `beacon_block_root` - The root of the beacon block.
- `total` - The total number of unique attestations by signature.

```sql
CREATE TABLE beacon_api_eth_v1_events_attestation_unique_signature_mv (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  beacon_block_root FixedString(66) Codec(ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  total AggregateFunction(uniq, UInt32) Codec(ZSTD(1))
) Engine = AggregatingMergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, beacon_block_root, meta_network_name, meta_client_geo_continent_code, meta_consensus_implementation, meta_consensus_version);
```

### Voluntary exit

#### General

- `event_date_time` - The timestamp of the event.
- `epoch` - The epoch number.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `validator_index` - The index of the validator who voluntarily exited.
- `signature` - The signature of the voluntary exit event.

```sql
CREATE TABLE beacon_api_eth_v1_events_voluntary_exit (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  validator_index UInt32 Codec(Gorilla, ZSTD(1)),
  signature String Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(epoch_start_date_time)
ORDER BY (epoch_start_date_time, meta_network_name, meta_client_name);
```

### Finalized checkpoint

#### General

- `event_date_time` - The timestamp of the event.
- `block` - The finalized block hash.
- `state` - The state root associated with the finalized checkpoint.
- `epoch` - The epoch number.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `execution_optimistic` - A boolean value indicating whether the execution is optimistic.

```sql
CREATE TABLE beacon_api_eth_v1_events_finalized_checkpoint (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  block FixedString(66) Codec(ZSTD(1)),
  state FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  execution_optimistic Bool,
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(epoch_start_date_time)
ORDER BY (epoch_start_date_time, meta_network_name, meta_client_name);
```

### Chain reorg

#### General

- `event_date_time` - The timestamp of the event.
- `slot` - The slot number in the blockchain where the event occurs.
- `slot_start_date_time` - The timestamp when the slot started.
- `propagation_slot_start_diff` - The difference between the propagation slot and the start slot.
- `depth` - The depth of the reorganization.
- `old_head_block` - The block hash of the old head.
- `new_head_block` - The block hash of the new head.
- `old_head_state` - The state root of the old head.
- `new_head_state` - The state root of the new head.
- `epoch` - The epoch number.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `execution_optimistic` - A boolean value indicating whether the execution is optimistic.

```sql
CREATE TABLE beacon_api_eth_v1_events_chain_reorg (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  depth UInt16 Codec(DoubleDelta, ZSTD(1)),
  old_head_block FixedString(66) Codec(ZSTD(1)),
  new_head_block FixedString(66) Codec(ZSTD(1)),
  old_head_state FixedString(66) Codec(ZSTD(1)),
  new_head_state FixedString(66) Codec(ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  execution_optimistic Bool,
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, meta_network_name, meta_client_name);
```

### Contribution and proof

#### General

- `event_date_time` - The timestamp of the event.
- `aggregator_index` - The index of the aggregator.
- `contribution_slot` - The slot number where the contribution was made.
- `contribution_slot_start_date_time` - The timestamp when the contribution slot started.
- `contribution_propagation_slot_start_diff` - The difference between the propagation slot and the contribution start slot.
- `contribution_beacon_block_root` - The root of the beacon block associated with the contribution.
- `contribution_subcommittee_index` - The index of the subcommittee associated with the contribution.
- `contribution_aggregation_bits` - The aggregation bits associated with the contribution.
- `contribution_signature` - The signature of the contribution.
- `contribution_epoch` - The epoch number.
- `contribution_epoch_start_date_time` - The timestamp when the contribution epoch started.
- `selection_proof` - The proof of selection for the contribution.
- `signature` - The signature of the event.

```sql
CREATE TABLE beacon_api_eth_v1_events_contribution_and_proof (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  aggregator_index UInt32 Codec(Gorilla, ZSTD(1)),
  contribution_slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  contribution_slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  contribution_propagation_slot_start_diff UInt32 Codec(Gorilla, ZSTD(1)),
  contribution_beacon_block_root FixedString(66) Codec(ZSTD(1)),
  contribution_subcommittee_index LowCardinality(String),
  contribution_aggregation_bits String Codec(ZSTD(1)),
  contribution_signature String Codec(ZSTD(1)),
  contribution_epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  contribution_epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  selection_proof String Codec(ZSTD(1)),
  signature String Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  meta_consensus_version_major LowCardinality(String),
  meta_consensus_version_minor LowCardinality(String),
  meta_consensus_version_patch LowCardinality(String),
  meta_consensus_implementation LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(contribution_slot_start_date_time)
ORDER BY (contribution_slot_start_date_time, meta_network_name, meta_client_name);
```

### Slot

#### General

- `slot` - The slot number in the Ethereum protocol.
- `slot_start_date_time` - The timestamp when the slot started.
- `epoch` - The epoch number, which is a logical time unit in the Ethereum protocol.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `blocks` - The aggregate function that calculates the sum of blocks seen for the slot.
- `attestations` - The aggregate function that calculates the sum of attestations seen for the slot.

```sql
CREATE TABLE beacon_api_slot (
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_network_name LowCardinality(String),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_consensus_implementation LowCardinality(String),
  meta_consensus_version LowCardinality(String),
  blocks AggregateFunction(sum, UInt16) Codec(ZSTD(1)),
  attestations AggregateFunction(sum, UInt32) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, slot, meta_network_name);
```

### Beacon API v2 beacon block

#### General

- `event_date_time` - The timestamp when the event was recorded.
- `slot` - The slot number in the Ethereum protocol.
- `slot_start_date_time` - The timestamp when the slot started.
- `epoch` - The epoch number, which is a logical time unit in the Ethereum protocol.
- `epoch_start_date_time` - The timestamp when the epoch started.
- `block_root` - The hash of the block root.
- `parent_root` - The hash of the parent block root.
- `state_root` - The hash of the state root.
- `proposer_index` - The index of the proposer of the block.
- `eth1_data_block_hash` - The block hash related to Ethereum 1 data.
- `eth1_data_deposit_root` - The deposit root related to Ethereum 1 data.
- `execution_payload_block_hash` - The block hash related to the execution payload.
- `execution_payload_block_number` - The block number related to the execution payload.
- `execution_payload_fee_recipient` - The address of the recipient of the fee for the execution payload.
- `execution_payload_state_root` - The state root related to the execution payload.
- `execution_payload_parent_hash` - The parent hash related to the execution payload.

```sql
CREATE TABLE beacon_api_eth_v2_beacon_block (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  slot UInt32 Codec(DoubleDelta, ZSTD(1)),
  slot_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  epoch UInt32 Codec(DoubleDelta, ZSTD(1)),
  epoch_start_date_time DateTime Codec(DoubleDelta, ZSTD(1)),
  block_root FixedString(66) Codec(ZSTD(1)),
  parent_root FixedString(66) Codec(ZSTD(1)),
  state_root FixedString(66) Codec(ZSTD(1)),
  proposer_index UInt32 Codec(Gorilla, ZSTD(1)),
  eth1_data_block_hash FixedString(66) Codec(ZSTD(1)),
  eth1_data_deposit_root FixedString(66) Codec(ZSTD(1)),
  execution_payload_block_hash FixedString(66) Codec(ZSTD(1)),
  execution_payload_block_number UInt32 Codec(DoubleDelta, ZSTD(1)),
  execution_payload_fee_recipient String Codec(ZSTD(1)),
  execution_payload_state_root FixedString(66) Codec(ZSTD(1)),
  execution_payload_parent_hash FixedString(66) Codec(ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_execution_fork_id_hash LowCardinality(String),
  meta_execution_fork_id_next LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(slot_start_date_time)
ORDER BY (slot_start_date_time, meta_network_name, meta_client_name);
```

### Mempool transaction

#### General

- `event_date_time` - The timestamp when the event was recorded.
- `hash` - The unique hash of the transaction.
- `from` - The Ethereum address from which the transaction originated.
- `to` - The Ethereum address to which the transaction is being sent.
- `nonce` - The nonce associated with the transaction, which represents the number of transactions sent from the sender's address.
- `gas_price` - The price of gas the transaction initiator is willing to pay.
- `gas` - The maximum amount of gas that can be used to process the transaction.
- `value` - The amount of Ether being transferred in the transaction.
- `size` - The size of the transaction data.
- `call_data_size` - The size of the call data in the transaction.

```sql
CREATE TABLE mempool_transaction (
  event_date_time DateTime64(3) Codec(DoubleDelta, ZSTD(1)),
  hash FixedString(66) Codec(ZSTD(1)),
  from FixedString(42) Codec(ZSTD(1)),
  to FixedString(42) Codec(ZSTD(1)),
  nonce UInt64 Codec(Gorilla, ZSTD(1)),
  gas_price UInt128 Codec(ZSTD(1)),
  gas UInt64 Codec(Gorilla, ZSTD(1)),
  value UInt128 Codec(ZSTD(1)),
  size UInt32 Codec(Gorilla, ZSTD(1)),
  call_data_size UInt32 Codec(Gorilla, ZSTD(1)),
  meta_client_name LowCardinality(String),
  meta_client_id String Codec(ZSTD(1)),
  meta_client_version LowCardinality(String),
  meta_client_implementation LowCardinality(String),
  meta_client_os LowCardinality(String),
  meta_client_ip Nullable(IPv6) Codec(ZSTD(1)),
  meta_client_geo_city LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_country_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_continent_code LowCardinality(String) Codec(ZSTD(1)),
  meta_client_geo_longitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_latitude Nullable(Float64) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_number Nullable(UInt32) Codec(ZSTD(1)),
  meta_client_geo_autonomous_system_organization Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_isp Nullable(String) Codec(ZSTD(1)),
  meta_client_geo_organization Nullable(String) Codec(ZSTD(1)),
  meta_network_id Int32 Codec(DoubleDelta, ZSTD(1)),
  meta_network_name LowCardinality(String),
  meta_execution_fork_id_hash LowCardinality(String),
  meta_execution_fork_id_next LowCardinality(String),
  meta_labels Map(String, String) Codec(ZSTD(1))
) Engine = MergeTree
PARTITION BY toStartOfMonth(event_date_time)
ORDER BY (event_date_time, meta_network_name, meta_client_name)
```