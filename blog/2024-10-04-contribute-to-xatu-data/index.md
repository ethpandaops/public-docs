---
slug: contribute-to-xatu-data
title: 'Contribute to Xatu: Join the Community Data Collection Effort'
description: "We're excited to announce that we are opening up the Xatu data collection pipeline to the Ethereum community! This initiative enables community members to contribute valuable data to the Xatu dataset."
authors: [samcm, savid]
tags: [xatu, consensus layer]
image: img/blog/contribute-to-xatu-data.jpg
githubRepos:
  - name: xatu
    url: https://github.com/ethpandaops/xatu
relatedLinks:
  - name: Contributoor Blog Post
    url: /posts/contributoor-beacon-node-companion
  - name: Xatu Lab Dashboard
    url: https://lab.ethpandaops.io/xatu
  - name: Working with Xatu Data
    url: /data/xatu/#working-with-the-data
  - name: Xatu Telegram Group
    url: https://t.me/+JanoQFu_nO8yNzQ1
---

import Alert from '@site/src/components/Alert';
import Mermaid from '@theme/Mermaid';
import { Details, Summary } from '@site/src/components/Collapsible';

<Alert>
We've since released a new tool called [contributoor](https://github.com/ethpandaops/contributoor) that makes it easier to contribute to the Xatu dataset. [Check out the post](/posts/contributoor-beacon-node-companion/) for more information.
</Alert>

We're excited to announce that we are opening up the Xatu data collection pipeline to the Ethereum community! This initiative enables community members to contribute valuable data to the Xatu dataset.

As discussions regarding the potential increase in maximum blob count continue **we hope to shed light on the perspective of Ethereum's most crucial participants - home stakers.**

**Summary:**

- Privacy focused. Multiple privacy levels that allow contributors to only disclose data they're comfortable with
- Initially restricted to known community members
- [Data is published daily by the EthPandaOps team](/data/xatu/#working-with-the-data)

## Data Collection
### Overview

Data is collected by running a Beacon node and the `xatu sentry` sidecar. The data is then sent to a pipeline that we run, which further anonymizes and redacts the data.

<Mermaid
  value={`graph TD
    A1[Home Staker 1] --> B1[Beacon Node]
    A2[You!] --> B2[Beacon Node]
    A3[Home Staker 3] --> B3[Beacon Node]
    B1 --> X1[Xatu Sentry]
    B2 --> X2[Xatu Sentry]
    B3 --> X3[Xatu Sentry]
    C[EthPandaOps]
    C --> D[Data Pipeline]
    
    D --> E[Public Parquet Files]
    
    X1 --> C
    X2 --> C
    X3 --> C

    subgraph "Data Collection"
        A1
        A2
        A3
        B1
        B2
        B3
        X1
        X2
        X3
    end
    
    subgraph " "
        C
        D
    end
    
    subgraph " "
        E
    end
    linkStyle 0 stroke:#f66,stroke-width:2px;
    linkStyle 1 stroke:#f66,stroke-width:2px;
    linkStyle 2 stroke:#f66,stroke-width:2px;
    linkStyle 3 stroke:#f66,stroke-width:2px;
    linkStyle 4 stroke:#f66,stroke-width:2px;
    linkStyle 5 stroke:#f66,stroke-width:2px;
    linkStyle 6 stroke:#f66,stroke-width:2px;
    linkStyle 7 stroke:#f66,stroke-width:2px;
    linkStyle 8 stroke:#f66,stroke-width:2px;
    linkStyle 9 stroke:#f66,stroke-width:2px;
    linkStyle 10 stroke:#f66,stroke-width:2px;`}
/>

### Events Collected

The following events will be collected:

- **[beacon_api_eth_v1_events_head](/data/xatu/schema/#beacon_api_eth_v1_events_head)**
    - When the beacon node has a new head block
<Details>
<Summary>Example payload</Summary>
```yaml
data:
  block: "0x43d85cfa70181f60971dbc59d60c0e82e2ff8aea995bc942dc9c27bb16a055ca"
  current_duty_dependent_root: "0xc59a164bf477f138363db57e34f5b0e561c8bb1d30a0526f195b5575b2137513"
  previous_duty_dependent_root: "0xbdbad239bcde3aa281edb7067a86ddba41f7f0a2e55b7ca61d628e57b6f1695f"
  slot: "10098904"
  state: "0xbcf7bbd9f5da8b88d09e3876834e93945edd98a258091339caedad2ec6764576"
event:
  date_time: "2024-10-04T03:01:13.245589039Z"
  id: "b6b13f23-6412-4e74-aa62-8639fc2fa04e"
  name: "BEACON_API_ETH_V1_EVENTS_HEAD_V2"
additional_data:
  epoch:
    number: "315590"
    start_date_time: "2024-10-04T02:56:23Z"
  propagation:
    slot_start_diff: "2245"
  slot:
    start_date_time: "2024-10-04T03:01:11Z"
```
</Details>
- **[beacon_api_eth_v1_events_block](/data/xatu/schema/#beacon_api_eth_v1_events_block)**
    - When the beacon node has a new block
<Details>
<Summary>Example payload</Summary>
```yaml
data:
  block: "0x7bb7f9e703896d516a0ee56d273dbe8fd71fd994a2f36cc489b8e1b825d74d44"
  slot: "10098966"
event:
  date_time: "2024-10-04T03:13:37.703055591Z"
  id: "58ccd540-81c2-44ce-820d-e73b5af0bea7"
  name: "BEACON_API_ETH_V1_EVENTS_BLOCK_V2"
additional_data:
  epoch:
    number: "315592"
    start_date_time: "2024-10-04T03:09:11Z"
  propagation:
    slot_start_diff: "2703"
  slot:
    number: "10098966"
    start_date_time: "2024-10-04T03:13:35Z"
```
</Details>

- **[beacon_api_eth_v1_events_blob_sidecar](/data/xatu/schema/#beacon_api_eth_v1_events_blob_sidecar)**
    - When the beacon node has recieved a blob sidecar that passes gossip validation.
<Details>
<Summary>Example payload</Summary>
```yaml
data:
  block_root: '0xc78adbc7ce7ab828bed85fedc6429989b4f4451d41aac8dc0c40b9f57839a3d7'
  index: '0'
  kzg_commitment: '0xa8de65da8d07703217d6879c75165a36973ff3ddace933907e7d400662b90e575812bb1302bfd4bb24691a550a0dc02a'
  slot: '10099003'
  versioned_hash: '0x0196e5bc26c289ff58a37c75f72b6824507d67ab0e43577495d1ad7b74716601'
event:
  date_time: '2024-10-04T03:21:00.752889196Z'
  id: adbf1ecb-4e52-404f-b3ba-6f83f6ffc4db
  name: BEACON_API_ETH_V1_EVENTS_BLOB_SIDECAR
additional_data:
  epoch:
    number: '315593'
    start_date_time: '2024-10-04T03:15:35Z'
  propagation:
    slot_start_diff: '1752'
  slot:
    number: '10099003'
    start_date_time: '2024-10-04T03:20:59Z'
```
</Details>
- **[beacon_api_eth_v1_events_chain_reorg](/data/xatu/schema/#beacon_api_eth_v1_events_chain_reorg)**
    - When the beacon node has reorganized its chain
<Details>
<Summary>Example payload</Summary>
```yaml
data:
  depth: '3'
  epoch: '83615'
  new_head_block: '0x4a99bc2dbb2c5640cf0798102588dcbc3c02d15989c7652bbcf4647e24a14881'
  new_head_state: '0x3e5af57c5c3bd8fa394c21edd8ac5b07378ef1e143ed18a9ff695090c970b23f'
  old_head_block: '0x28e85b3e33721ad20b86c671f35686c8c91b5a29c6fd0cb41698872048d1b8ed'
  old_head_state: '0x00f61794f1da3817bb8ae4591bbc0bc9cc0c72f4a422d5fdda5cd584ee147cd3'
  slot: '2675702'
event:
  date_time: '2024-10-04T03:00:36.161478913Z'
  id: b0db9607-a862-4dd2-b7e6-4faf77e3a949
  name: BEACON_API_ETH_V1_EVENTS_CHAIN_REORG_V2
additional_data:
  epoch:
    number: '83615'
    start_date_time: '2024-10-04T02:56:00Z'
  propagation:
    slot_start_diff: '12161'
  slot:
    start_date_time: '2024-10-04T03:00:24Z'
```
</Details>
- **[beacon_api_eth_v1_events_finalized_checkpoint](/data/xatu/schema/#beacon_api_eth_v1_events_finalized_checkpoint)**
    - When the beacon node's finalized checkpoint has been updated
<Details>
<Summary>Example payload</Summary>
```yaml
data:
  block: '0x418645de30f82a71b7470dfc9831602f750a3b8e14e507e112791d53b3d3842e'
  epoch: '188220'
  state: '0x195dcdf004596c7afd999c39ff6f718f5bb631f3c8838b445fe87ea8f4f6de52'
event:
  date_time: '2024-10-04T03:00:47.506914227Z'
  id: 57e595a9-c79a-458c-be83-0d6dd58ee81c
  name: BEACON_API_ETH_V1_EVENTS_FINALIZED_CHECKPOINT_V2
additional_data:
  epoch:
    number: '188220'
    start_date_time: '2024-10-04T02:48:00Z'
```
</Details>

### Metadata

The following additional metadata is sent with every event:
#### Client Metadata
```yaml
clock_drift: '2' # Clock drift of the host machine
ethereum:
    consensus:
        implementation: lighthouse # Beacon node implementation
        version: Lighthouse/v5.3.0-d6ba8c3/x86_64-linux # Beacon node version
    network:
        id: '11155111' # Ethereum network ID
        name: sepolia # Ethereum network name
id: 98df53c0-3de0-477c-a7c9-4ea9b17981c3 # Session ID. Resets on restart
implementation: Xatu
module_name: SENTRY
name: b538bfd92sdv3 # Name of the sentry. Hash of the Beacon Node's node ID.
os: linux # Operating system of the host running sentry
version: v0.0.202-3645eb8 # Xatu version
```

#### Server Metadata
Once we recieve the event, we do some additional processing to get the server metadata. The data that is added to the event is configurable per-user and allows users to only disclose data they're comfortable with. Geo location data is very useful for understanding how data is propagated through the network, but is not required.

```yaml
server:
  client:
    geo:
      # OPTIONAL FIELDS
      ## Data about ISP
      autonomous_system_number: 24940 # Autonomous system number of the client
      autonomous_system_organization: "Hetzner Online GmbH" # Organization associated with the autonomous system
      
      ## Data about location
      city: "Helsinki" # City where the client is located
      continent_code: "EU" # Continent code of the client's location
      country: "Finland" # Country where the client is located
      country_code: "FI" # Country code of the client's location
      
      ### ALWAYS REDACTED
      latitude: REDACTED # Latitude coordinate of the client's location
      longitude: REDACTED # Longitude coordinate of the client's location
    group: "asn-city" # Group the client belongs to
    user: "simplefrog47" # Pseudo username that sent the event
    # ALWAYS REDACTED
    ip: "REDACTED" # IP address of the client that sent the event
  event:
    received_date_time: "2024-10-04T03:00:48.533351629Z" # Timestamp when the event was received
```

**Note:** 
- The `client.name` field is re-hashed with a salt that only the EthPandaOps team has access to. This means that the original name of the client is not disclosed, and there is no way to map events back to a specific node id.
- The `client.ip`, `client.geo.latitude`, and `client.geo.longitude` fields are ALWAYS redacted.

## Privacy groups

Privacy is a top priority for us. We have created privacy groups to allow users to only disclose data they're comfortable with.

### No additional Geo/ASN data
<Details>
<Summary>No additional Geo/ASN data</Summary>
```yaml
autonomous_system_number: REDACTED # REDACTED
autonomous_system_organization: REDACTED # REDACTED
city: "REDACTED" # REDACTED
country: "REDACTED" # REDACTED
country_code: "REDACTED" # REDACTED
continent_code: "REDACTED"
```
</Details>

### With ASN data
<Details>
<Summary>Share geo location down to the city level</Summary>
```yaml
autonomous_system_number: 24940
autonomous_system_organization: "Hetzner Online GmbH"
city: "Helsinki"
continent_code: "EU"
country: "Finland"
country_code: "FI"
```
</Details>

<Details>
<Summary>Share geo location down to the country level</Summary>
```yaml
autonomous_system_number: 24940
autonomous_system_organization: "Hetzner Online GmbH"
continent_code: "EU"
country: "Finland"
country_code: "FI"
city: "REDACTED" # REDACTED
```
</Details>

<Details>
<Summary>Share geo location down to the continent level</Summary>
```yaml
autonomous_system_number: 24940
autonomous_system_organization: "Hetzner Online GmbH"
continent_code: "EU"
city: "REDACTED" # REDACTED
country: "REDACTED" # REDACTED
country_code: "REDACTED" # REDACTED
```
</Details>

<Details>
<Summary>Share no geo location data</Summary>
```yaml
autonomous_system_number: 24940
autonomous_system_organization: "Hetzner Online GmbH"
continent_code: "EU"
city: "REDACTED" # REDACTED
country: "REDACTED" # REDACTED
country_code: "REDACTED" # REDACTED
```
</Details>

### Without ASN data
<Details>
<Summary>Share geo location down to the city level without ASN</Summary>
```yaml
city: "Helsinki"
continent_code: "EU"
country: "Finland"
country_code: "FI"
autonomous_system_number: REDACTED # REDACTED
autonomous_system_organization: REDACTED # REDACTED
```
</Details>

<Details>
<Summary>Share geo location down to the country level without ASN</Summary>
```yaml
continent_code: "EU"
country: "Finland"
country_code: "FI"
autonomous_system_number: REDACTED # REDACTED
autonomous_system_organization: REDACTED # REDACTED
city: "REDACTED" # REDACTED
```
</Details>

<Details>
<Summary>Share geo location down to the continent level without ASN</Summary>
```yaml
continent_code: "EU"
autonomous_system_number: REDACTED # REDACTED
autonomous_system_organization: REDACTED # REDACTED
city: "REDACTED" # REDACTED
country: "REDACTED" # REDACTED
country_code: "REDACTED" # REDACTED
```
</Details>

## Get Started

If you're already running a beacon node, running `xatu sentry` is as simple as running a docker container on your node. For example:
```bash
docker run -d --name xatu-sentry ethpandaops/xatu:latest \
--preset ethpandaops \
--beacon-node-url=http://localhost:5052 \
--output-authorization=REDACTED
```

Contributing to the Xatu dataset is currently restricted to known community members. We have plans to open this up to the public in the future, but for now, we want to ensure that the data remains high quality and relevant to the home staker community (read: we need to make sure our pipeline can handle the increased load 😂)

If you'd like to contribute to the Xatu dataset, please
**[apply for access here](https://forms.gle/S7g5g8nB8aGG8aTX6)**

Once you've been granted access, you'll receive instructions on how exactly to run `xatu sentry` and start contributing to the dataset. Thank you!

## Wrapping Up

We believe that by opening up the Xatu data collection pipeline we can empower the community to gain valuable insights and drive meaningful improvements to the Ethereum network. If you have any questions or feedback, please reach out to us on [Twitter](https://twitter.com/ethpandaops) or join the [Xatu Telegram Group](https://t.me/+JanoQFu_nO8yNzQ1).

Love,

EthPandaOps Team ❤️