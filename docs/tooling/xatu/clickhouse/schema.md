---
sidebar_position: 3
---

# Schema Documentation

This page provides detailed information about the schema of the main tables available in the Xatu ClickHouse instance.

## Common Fields

Most tables include these common metadata fields:

- `meta_client_implementation` - The client implementation name (e.g., "lighthouse", "teku")
- `meta_client_version` - Version of the client
- `meta_network_name` - Network name (e.g., "mainnet", "goerli")
- `meta_node_id` - Unique identifier for the node
- `meta_node_name` - Human-readable node name
- `event_date_time` - Timestamp when the event was recorded

## Mempool Transaction

The `mempool_transaction` table stores transactions observed in the Ethereum mempool.

| Column | Type | Description |
|--------|------|-------------|
| `transaction_hash` | FixedString(32) | Transaction hash in binary |
| `from_address` | String | Sender address |
| `to_address` | String | Recipient address |
| `value` | UInt256 | Transaction value in wei |
| `gas_limit` | UInt64 | Gas limit for the transaction |
| `max_fee_per_gas` | UInt64 | Maximum fee per gas (EIP-1559) |
| `max_priority_fee_per_gas` | UInt64 | Maximum priority fee per gas (EIP-1559) |
| `nonce` | UInt64 | Transaction nonce |
| `data` | String | Transaction data (hex encoded) |
| `type` | UInt8 | Transaction type (legacy, access list, or EIP-1559) |
| `first_seen` | DateTime64 | When the transaction was first seen |

## Beacon API Event

The `beacon_api_event` table stores events from the Beacon Chain API.

| Column | Type | Description |
|--------|------|-------------|
| `event_type` | String | Type of event (attestation, block, etc.) |
| `slot` | UInt64 | Slot number |
| `epoch` | UInt64 | Epoch number |
| `block_root` | FixedString(32) | Block root hash in binary |
| `parent_root` | FixedString(32) | Parent block root hash in binary |
| `proposer_index` | UInt64 | Validator index of the proposer |
| `state_root` | FixedString(32) | State root hash in binary |
| `finalized` | Boolean | Whether the block is finalized |
| `justified` | Boolean | Whether the block is justified |

## Block Execution

The `block_execution` table stores metrics about block execution.

| Column | Type | Description |
|--------|------|-------------|
| `block_hash` | FixedString(32) | Block hash in binary |
| `block_number` | UInt64 | Block number |
| `gas_used` | UInt64 | Amount of gas used by transactions in the block |
| `gas_limit` | UInt64 | Block gas limit |
| `parent_hash` | FixedString(32) | Parent block hash in binary |
| `timestamp` | DateTime64 | Block timestamp |
| `transaction_count` | UInt32 | Number of transactions in the block |
| `base_fee_per_gas` | UInt64 | Base fee per gas (EIP-1559) |

## Network Discovery

The `network_discovery` table stores information about nodes discovered on the network.

| Column | Type | Description |
|--------|------|-------------|
| `node_id` | FixedString(32) | Node ID in binary |
| `enr` | String | Ethereum Node Record |
| `last_seen` | DateTime64 | When the node was last seen |
| `execution_client_name` | String | Name of the execution client |
| `execution_client_version` | String | Version of the execution client |
| `consensus_client_name` | String | Name of the consensus client |
| `consensus_client_version` | String | Version of the consensus client |
| `ip_address` | IPv6 | Node IP address |
| `tcp_port` | UInt16 | TCP port |
| `udp_port` | UInt16 | UDP port |
| `meta_geo_country` | String | Geographic country location |
| `meta_geo_city` | String | Geographic city location |

## P2P Message

The `p2p_message` table stores P2P network messages.

| Column | Type | Description |
|--------|------|-------------|
| `message_type` | String | Type of P2P message |
| `message_id` | FixedString(32) | Message ID in binary |
| `source_node_id` | FixedString(32) | Source node ID in binary |
| `target_node_id` | FixedString(32) | Target node ID in binary |
| `payload_size` | UInt64 | Size of the message payload in bytes |
| `propagation_time` | UInt64 | Propagation time in milliseconds |

## Notes

- Binary fields like hashes are stored in binary format but can be converted to readable hex strings using the `hex()` function
- Timestamps are stored in UTC
- Some fields may be null if the information was not available when the event was recorded
- This schema documentation is not exhaustive and may not cover all available fields or tables 