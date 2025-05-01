---
sidebar_position: 3
---


import RelatedLinks from '@site/src/components/RelatedLinks';

# Dora

<RelatedLinks 
  githubRepo="ethpandaops/dora"
    links={[
    {
      name: "Dora Wiki",
      url: "https://github.com/ethpandaops/dora/wiki"
    }
  ]}
/>


Dora is an explorer and analysis tool for Ethereum beacon chain blocks and validators. It provides a user-friendly interface for examining beacon chain data and understanding validator performance.

## What is Dora?

Dora is designed to make Ethereum beacon chain data more accessible and understandable. It aggregates data from various sources and presents it in a clean, user-friendly interface that allows operators, developers, and researchers to:

- Track validator performance
- Analyze beacon chain blocks
- Monitor network health
- Visualize network participation

## Features

- **Validator Monitoring**: Track individual validator performance and status
- **Block Explorer**: Examine beacon chain blocks and their contents
- **Network Statistics**: View network-wide metrics and performance indicators
- **Historical Data**: Access historical data to analyze trends and patterns
- **Visualization**: Interactive charts and graphs for better data comprehension

## Usage

Dora can be accessed as a web application that allows users to:

- Enter validator indices or public keys to track specific validators
- Use the navigation to explore blocks, epochs, and network statistics
- Leverage filters and search functionality to find specific data points

## Architecture

Dora consists of several components:

- **Frontend**: A React web application for user interaction
- **Backend API**: A Go service that processes and serves data
- **Database**: Stores processed beacon chain data for quick access
- **Data Collectors**: Components that gather data from Ethereum nodes and other sources
