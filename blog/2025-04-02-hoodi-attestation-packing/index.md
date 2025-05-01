---
slug: hoodi-attestation-packing
title: 'Electra on Hoodi: Attestation Packing'
authors: [samcm]
description: 'Analysis of the Hoodi Electra fork and its impact on attestation packing.'
tags: [xatu, consensus-layer]
image: img/blog/hoodi-attestations.png
relatedLinks:
  - name: EIP-7549
    url: https://eips.ethereum.org/EIPS/eip-7549
  - name: Prysm Analysis
    url: https://hackmd.io/@ttsao/attestation-packing-pectra
  - name: Jupyter Notebook
    url: https://github.com/ethpandaops/xatu-data/blob/e9b7ef41ada2cbbb44d790994614a9aa302512fc/analysis/attestations/packing.ipynb
---

import Alert from '@site/src/components/Alert';

Last week, the newly established Hoodi network successfully activated its Electra fork, significantly changing how attestations are packed into beacon blocks, as detailed in [EIP-7549](https://eips.ethereum.org/EIPS/eip-7549). This post recaps how attestation aggregation worked previously and how the recent fork changes things, before diving into some analysis.

<Alert>
Check out Prysm's Terence's post for another detailed analysis of [Attestation performance in Hoodi](https://hackmd.io/@ttsao/attestation-packing-pectra).
</Alert>

## Background

### Before Electra

Previously, attestations included the `committee_index` within the signed data.

- Attestations could only be aggregated within their specific committee, limiting overall aggregation efficiency.
- Identical votes from different committees produced distinct signatures.

### After Electra

With EIP-7549, the attestation structure was changed by moving the `committee_index` field **outside** the signed data.

- Identical votes across different committees can now be aggregated, drastically cutting down on unique attestations.
- Significant efficiency improvements in signature verification e.g., in a network with 262,144 validators, attestations required for a two-thirds majority fell dramatically from approximately 1,366 to just around 22.

While these changes offer great potential, there is also a risk that the changes will negatively impact performance. With these changes outlined, let’s explore how Electra unfolded on Hoodi.

## Analysis

<Alert>
The raw Jupyter notebook used to generate the analysis below is available [here](https://github.com/ethpandaops/xatu-data/blob/e9b7ef41ada2cbbb44d790994614a9aa302512fc/analysis/attestations/packing.ipynb).
</Alert>

### Methodology

The following parameters were used for the analysis:

- 2x 6 hour time periods:
  - Pre-Electra: `2025-03-25T12:10:00Z` to `2025-03-25T18:10:00Z`
  - Post-Electra: `2025-03-27T12:10:00Z` to `2025-03-27T18:10:00Z`
- Data was collected from the Hoodi network using [Xatu](/data/xatu/) (keep an eye out for public Hoodi data soon!).
- The analysis looks at canonical beacon blocks and inspected the attestations that were included in them.
  - This analysis examines attestation packing efficiency (and by proxy aggregation performance), rather than evaluating the correctness of attestation votes.
- We naively assume that client teams are running the client they develop.
  - Nimbus keys, managed by the ethPandaOps team during the analysis period, exclusively utilized the Nimbus beacon node client.
- The ethPandaOps validator keys use multiple beacon node clients.

### Results

#### Unique Validators Per Block

Our first metric examines the **unique count of validators** included per block aggregated across all blocks during the two time periods.

With the Electra fork, we're expecting to see a much higher number of unique validators per block as older attestations can now be included. Note that this metric includes stale attestations by design.

![Unique Validators Per Block](/img/blog/all-unique-validators-per-block.png)

Our analysis confirms a notable increase in unique validator indices per block, with some blocks including as many as 200,000 unique validators.

#### Fresh Attestations

The second metric assesses the number of fresh attestations per block. A fresh attestation is defined as a validator vote that has not been seen in any previous block. As attestations land in beacon blocks _aggregated_, it's inevitable that some stale attestations will be included as overlaps can occur. However, we want to include as many fresh attestations as possible.

![Fresh Attestations](/img/blog/all-first-seen-attestations.png)

The analysis confirms a clear and substantial increase in capacity due to EIP-7549. With 1.08 million validators on Hoodi, approximately 33.7k attestations can occur per slot. The 80th percentile of Electra blocks aligns closely with this number, while a notable jump to approximately 60k attestations at the 90th percentile occurs--presumably after a missed slot.

Surprisingly, a few blocks included as many as 120k fresh attestations. While this increased capacity is great, it's also a sign that the network may be experiencing issues. Statistically, the chance of observing four consecutive missed slots at 90% participation is around 1 in 10,000. Given our analysis covers only 3,276 blocks, it is unlikely we observed such an event.

![Missed Slots](/img/blog/missed-slots.png)

Confirming that we didn't see any blocks with 4 missed slots in a row, we can now ask the question: **why are block proposers ever given the chance to include fresh attestions older than 1, 2 or 3 missed slots?**

#### Inclusion Distance

Inclusion distance measures the number of slots between the attestation’s creation and its inclusion in a block. In a perfect world, the inclusion distance should be one slot.

![Inclusion Distance](/img/blog/all-inclusion-delay.png)

The analysis reveals Nimbus client blocks experienced notably increased inclusion distances post-Electra, suggesting potential improvements in packing strategies.

#### Optimal Inclusion Distance

The Optimal Inclusion Distance metric counts the number of attestations in the block with an inclusion distance of just one slot, highlighting the ability of block proposers to capture the most recent attestations.

> Note: this is slightly different to [ethdo's](https://github.com/wealdtech/ethdo/blob/25a5bd917f55c1802a5bd924cba98bc56bf82c9b/cmd/epoch/summary/process.go#L381) _head timely_ metric which additionally looks at the correctness of the vote.

![Optimal Inclusion Distance](/img/blog/head-timely-validators.png)

It appears that Nimbus experienced a larger regression than other clients - warranting further investigation. Grandine is also seemingly performing worse that others, although the change before/after the fork is not as large.

![Head Timely Nimbus](/img/blog/head-timely-nimbus.png)

Diving in to just Nimbus produced blocks, we can see that around 40% of them failed to include any of the most recent attestations. This outlier hints that there may be room for improvement with the Nimbus attestation packing strategy.

![Head Timely Excluding Nimbus](/img/blog/head-timely-no-nimbus.png)

Looking at the same metric at the network level while excluding Nimbus, we see that peformance is still around 6% worse.

This is somewhat concerning. It's hard to attribute this to a drop in network participation, which remained around 90% [before](https://dora.hoodi.ethpandaops.io/epoch/1800) and [after](https://dora.hoodi.ethpandaops.io/epoch/2250) the fork. This may hint at underlying inefficiencies with attestation aggregation across the network before they get to the block proposer, but is out of scope for this analysis. It's also very likely that clients are still fine tuning their attestation packing strategies, and we expect to see this metric improve over time, particularly before Electra hits mainnet.

### Conclusion

The Electra fork has enhanced the capacity of attestations being included into beacon blocks. However, these advancements highlight the increased importance of efficient aggregation and proactive packing strategies.

While we observed some mixed results, the changes introduced in [EIP-7549](https://eips.ethereum.org/EIPS/eip-7549) are promising, and we expect the changes to be a net positive for the beacon chain in the long term, especially in times of turbulence.
