---
sidebar_position: 2
---

# Setting Up Contributoor

This guide walks you through setting up Contributoor, a tool for contributing Ethereum node metrics to community dashboards.

## Overview

Contributoor allows node operators to securely share metrics with the ethPandaOps community, helping build a comprehensive view of network health. By contributing your node metrics, you help improve understanding of the Ethereum network and assist in identifying issues.

## How It Works

Contributoor runs as a sidecar process to your beacon node, collecting important metrics and events without impacting your node’s performance. It:

- Connects to your beacon node’s API
- Monitors key events and metrics
- Securely forwards data to our collection endpoints

This data helps researchers and developers:

- Optimize network performance
- Identify potential issues early
- Improve client implementations
- Understand network behavior during upgrades

## 🔒 Installation

Download and inspect the installation script before running:

```bash
# Download the script.
curl -O https://raw.githubusercontent.com/ethpandaops/contributoor-installer/refs/heads/master/install.sh

# Inspect the script contents.
less install.sh

# Make it executable and run if you're satisfied with the contents.
chmod +x install.sh && ./install.sh
```

## ⚡ Quick Installation

If you trust the source, you can run this one-liner:

```baseh
curl -O https://raw.githubusercontent.com/ethpandaops/contributoor-installer/refs/heads/master/install.sh && chmod +x install.sh && ./install.sh
```

## Alternate Installation Methods

### eth-docker

  If you're using [eth-docker](https://ethdocker.com), setup is as follows:

  - Run `./ethd update`
  - Then edit your .env file:
    - add `:contributoor.yml` to the end of `COMPOSE_FILE` variable
    - add `CONTRIBUTOOR_USERNAME` variable and set it to your username
    - add `CONTRIBUTOOR_PASSWORD` variable and set it to your password
  - Run `./ethd update`
  - Run `./ethd up`
  
  You can read more about configuring eth-docker [here](https://ethdocker.com/Usage/Advanced#specialty-yml-files).

### Rocketpool Smart Node
  
  - Install `contributoor` via the [Install Script](#-installation)
  - During the Contributoor setup:
    - Set `Beacon Node Address` to `http://eth2:5052`
    - Set `Optional Docker Network` to `rocketpool_net`
   
    Note: These can also be set later `contributoor config`
  - Run `contributoor start`

### Dappnode

  Contributoor is available as a Dappnode package for `mainnet`, `holesky` and `hoodi` networks.
  
   For more information, and to install, see the [contributoor Dappnode package repository](https://github.com/ethpandaops/contributoor-dappnode).

### Kubernetes (Helm)

  Contributoor can be deployed on Kubernetes using the Helm chart from the [ethereum-helm-charts](https://github.com/ethpandaops/ethereum-helm-charts) repository.

  ```bash
  # Add the Helm repository
  helm repo add ethereum-helm-charts https://ethpandaops.github.io/ethereum-helm-charts

  # Update your repositories
  helm repo update

  # Install contributoor
  helm install contributoor ethereum-helm-charts/contributoor
  ```

  For more details and configuration options, see the [contributoor chart documentation](https://github.com/ethpandaops/ethereum-helm-charts/tree/master/charts/contributoor).

## Usage

Contributoor can be managed using these commands:

```bash
contributoor start    # Start the service
contributoor stop     # Stop the service
contributoor status   # Check service status
contributoor restart  # Restart the service
contributoor config   # View/edit configuration
contributoor update   # Update to latest version
contributoor logs     # Show logs
```

If you chose to install contributoor under a custom directory, you will need to specify the directory when running the commands, for example:

```
contributoor --config-path /path/to/contributoor start
```

## Updating

It's a good idea to periodically check contributoor to ensure you’re on the latest version!

Keeping up to date is simple - just run:

```bash
contributoor update
```

## Uninstalling

We'll be sad to see you go, but if you wish to uninstall, it can be done by running the installer with the `-u` flag:

```bash
curl -O https://raw.githubusercontent.com/ethpandaops/contributoor-installer/refs/heads/master/install.sh && chmod +x install.sh && ./install.sh -u
```
