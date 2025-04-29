---
slug: network-limit-devnets
title: Understanding the Ethereum network limits using devnets
authors: [parithosh, barnabasbusa, skylenet, pk910]
description: 'The Dencun upgrade on Ethereum introduced the concept of blob. These blobs represent data that every node is required to store for a defined period of time. With the discussion about a blob increase in Pectra, lets review results from a network run with various edge cases.'
tags: [ansible, ethereum, devnets, L1, testnet]
image: img/blog/network-limit-devnets.png
---

# Network limit devnets

## Intent:
The [Dencun](https://ethereum.org/en/roadmap/dencun/) upgrade on Ethereum introduced the concept of blobs into Ethereum. These blobs represent data that every node is required to store for a defined period of time. With the discussion about a blob increase in [Pectra](https://eips.ethereum.org/EIPS/eip-7600), we wanted to run a network in various edge cases to find out potential problems we may face. Two scenarios that were deemed important to test is long range syncing after a non-finality period as well as a network with resource constrained nodes.

## General setup:
- 1M validators, 516 hosts (geodistributed across 10 regions)
- 8c/32GB RAM to ensure enough resources for the client
- Mainnet client distribution
- Healthy blob and transaction gossip (average blob/slot of 3)

## Experiments:
1. 5% Gigabit nodes, 95% nodes with 20mbps/10mbps download/upload connections.
2. 80% Gigabit nodes, 20% nodes with 100mbps/20mbps download/upload connections. Non-finality for ~1d and then nodes are started back up to sync.
3. A flat network with every node containing 100mbps/50mbps download/upload connections. Non-finality for ~12h and then nodes are started back up to sync.
4. A flat network with every node containing 50mbps/25mbps download/upload connections.
5. A flat network with every node containing 30mbps/15mbps download/upload connections. Some nodes were turned off for 2h to test syncing times.
6. A flat network with every node containing 20mbps/10mbps download/upload connections.

## Aggregated learning:
- Our mental model of the Ethereum p2p layer probably needs some reworking, our mental model of a flat network with equal low bandwidth nodes probably isn't true for our current DA setup. The analysis by [ProbeLabs](https://probelab.io/ethereum/discv5/2024-46/#cloud-hosting-rate) also indicate a hybrid network of faster and slower nodes. A flat network style test is probably still helpful to understand how to design upgrades for the worst case scenario.
- Long range sync times after a period of non-finality seem to be reasonable and the found problems potentially lie in peering bugs or range request optimisations.
- The bottleneck for the client at 20mbps/10mbps seems to be fetching data to validate DA within the slot time limits (perhaps due to peer rate limits or other limitations). At gigabit links however, the DA data fetching bottlenecks seems to be solved. But the node still takes ~20mins to sync to head (the theoretical line speed to download the data would take 20s). The bottleneck for long range sync doesn’t seem to be raw bandwidth related(Most nodes were peaking at 100mbps traffic, so they had a 10x bandwidth headroom), but instead seems to be batch verification/peering/rate limiting/peer download limit related and we might need to narrow this down in future tests.
- Even in a network with mostly gigabit nodes, no node was using more than ~160mbps of traffic. This meant the gigabit nodes still had a ~5x of bandwidth as headroom to serve data.
- In a network with 100mbps/50mbps rate limits applied, The nodes were all hitting the bandwidth usage of 50mbps (both up and down). This is despite the fact that the download bandwidth is capped at 100mbps and indicates a potential bottleneck in fetching data from various peers instead of a single peer.
- The network starts to only degrade meaningfully once we go below 30/15mbps download/upload speeds. The total vote might remain high, but we do observe a lower head vote percentage. The degradation is quite noticeable at a flat network of 20mbps/10mbps download/upload speeds, while the network is still able to finalize.
- There seem to be optimisations required in batch fetching, rate limits as well as potential bugs in peering that are triggered in these stressful scenarios.
- The devnet presents a "clean" EL state with no real EL load or limitation. A potential future experiment can try a mainnet shadowfork to find EL related bottlenecks. Estimations on mainnet indicate that average this would add about 20 seconds per batch, or an acceptable overhead of 300ms per block.

## Conclusion:
- The network indicates that clients are not purely bottlenecked by bandwidth, instead they can still apply some optimisations to help improve syncing and peering performance. These optimisations might come with other tradeoffs and we need to study potential paths forward.
- These optimisations could already help mainnet today and would be needed irrespective of our decision to increase the blob count from the current 3/6 limits.
- Long range syncing after a period of non-finality is able to be completed in a reasonable amount of time and would benefit from some optimisations/peering bug fixes.
- The analysis done does not assume any blob censorship or timing games.In events of high volatility, we might see more builder censorship. If we were to increase the max, we would likely see patterns similar to [0,0,max,max,0,0,0,max,max,max], etc., which is different from the common steady rate of target blobs per slot.
- We need more studies on the benefit the `get-blobs` optimisation has already provided and potentially could provide
- We need to have bandwidth contraints on more feature devnets as well, probably as a default on our stack based on mainnet measurements