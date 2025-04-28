---
sidebar_position: 3
---

# API

This documentation covers the ethPandaOps Team operated mainnet and testnet nodes API access.

## API Access for Mainnet Nodes

Authentication to access the node's API is required. If you don't yet have an API key and you would like to make a query to the mainnet nodes, contact the [ethPandaOps Team](https://ethpandaops.io/team/). Authentication tokens have to be passed as a header. The current available URLs are as follows:

## Execution Layer Clients

Direct the API call to any EL clients (besu, erigon, geth or nethermind)
https://rpc.mainnet.ethpandaops.io

## Consensus Layer Clients

Direct the API call to any CL clients (lighthouse, lodestar, nimbus, prysm or teku)
https://beacon.mainnet.ethpandaops.io

## Region Specific Calls

We currently operate in 2 regions, Europe (Berlin) and North America (Boulder).

If you would like to target speicifc regions, you can do this by using the `na1` or `eu1` prefix.

**Example:**

* https://rpc.mainnet.eu1.ethpandaops.io
* https://beacon.mainnet.na1.ethpandaops.io

> **_NOTE_** If you do not specify the region, it will be targetting the `eu1` servers. 

## Available Endpoints

### Mainnet

#### Consensus layer calls

* https://teku.mainnet.ethpandaops.io (Teku-Geth, Teku-Nethermind)
* https://prysm.mainnet.ethpandaops.io (Prysm-Geth, Prysm-Nethermind)
* https://nimbus.mainnet.ethpandaops.io (Nimbus-Geth, Nimbus-Besu)
* https://lighthouse.mainnet.ethpandaops.io (Lighthouse-Erigon, Lighthouse-Geth, Lighthouse-Nethermind)
* https://lodestar.mainnet.ethpandaops.io (Lodestar-Geth, Lodestar-Besu)

#### Execution layer calls

* https://archive.mainnet.ethpandaops.io (Erigon-Lighthouse)
* https://geth.mainnet.ethpandaops.io (Geth-Teku, Geth-Prysm, Geth-Nimbus, Geth-Lighthouse, Geth-Lodestar)
* https://besu.mainnet.ethpandaops.io (Besu-Nimbus, Besu-Lodetar)
* https://nethermind.mainnet.ethpandaops.io (Nethermind-Lighthouse, Nethermind-Prysm, Nethermind-Teku)
* https://erigon.mainnet.ethpandaops.io (Erigon-Lighthouse)

### Goerli

#### Consensus layer calls

* https://teku.goerli.ethpandaops.io (Teku-Geth)
* https://lighthouse.goerli.ethpandaops.io (Lighthouse-Nethermind)

#### Execution layer calls

* https://geth.goerli.ethpandaops.io (Geth-Teku)
* https://nethermind.goerli.ethpandaops.io (Nethermind-Lighthouse)


## Examples

- Directs the API call to any geth-CL node (note CL will be round robin selected) - execution layer API endpoint, aimed at geth endpoint: https://geth.mainnet.ethpandaops.io
- Directs an API call to lighthouse-EL node (note EL will be round robin selected) - beacon API specific call aimed at lighthouse endpoint: https://lighthouse.mainnet.ethpandaops.io
- Directs an API call to geth-lighthouse node - execution layer API endpoint, aimed at geth endpoint: https://geth-lighthouse.mainnet.ethpandaops.io
- Directs an API call to lighthouse-geth node - beacon API specific call aimed at lighthouse endpoint: https://lighthouse-geth.mainnet.ethpandaops.io

#### EL Call

```bash
curl \
  --data '{"method":"web3_clientVersion","params":[],"id":1,"jsonrpc":"2.0"}' \
  -H "CF-Access-Client-Id: $client_id" \
  -H "CF-Access-Client-Secret: $client_secret" \
  -H "Content-Type: application/json" \
  -X POST https://geth-lighthouse.$network.ethpandaops.io
```

#### CL Call

```bash
curl \
  -H "CF-Access-Client-Id: $client_id" \
  -H "CF-Access-Client-Secret: $client_secret" \
  https://lighthouse.mainnet.ethpandaops.io/eth/v1/node/version
``` 