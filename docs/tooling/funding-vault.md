---
sidebar_position: 3
---


import RelatedLinks from '@site/src/components/RelatedLinks';

# Funding-vault

<RelatedLinks 
  githubRepo="ethpandaops/fundingvault"
  links={[
    {
      name: "Testnet Faucets Documentation",
      url: "https://ethereum.org/en/developers/docs/networks/#testnet-faucets"
    },
  ]}
/>


FundingVault is a smart contract designed to provide testnet funds to users and applications in a controlled and efficient manner.

## What is FundingVault?

FundingVault serves as a managed funding solution for Ethereum testnets. It provides a secure and gas-efficient way to distribute test ETH and other tokens to users, developers, and automated systems. By using rate limiting, allowlists, and other access controls, FundingVault allows testnet operators to distribute funds while preventing abuse.

## Key Features

- **Rate-Limited Withdrawals**: Prevent abuse with configurable time-based rate limits
- **Access Control**: Grant different access levels to different addresses
- **Multi-Token Support**: Distribute ETH and ERC-20 tokens from a single contract
- **Metadata Tracking**: Associate metadata with funding requests for analysis
- **Admin Controls**: Privileged functions for testnet administrators
- **Gas Optimization**: Efficient implementation to minimize gas costs
- **Event Logging**: Comprehensive event logs for monitoring fund distribution

## Integration with Other Tools

FundingVault works well with other ethPandaOps tools:

- **Kurtosis**: Provision test environments with pre-funded accounts
- **Assertoor**: Fund test accounts for transaction-based test cases
- **Spamoor**: Provide funds for transaction generation

## Use Cases

- **Testnet Faucets**: Public service for distributing testnet ETH
- **Automated Testing**: Provide funds for CI/CD testing pipelines
- **Development Environments**: Ensure developers have test funds available
- **Hackathons**: Easy distribution of funds to hackathon participants
- **Protocol Testing**: Fund accounts for protocol upgrade testing

## Admin Operations

For testnet operators, the FundingVault provides admin functionality:

- Configure withdrawal limits by user or group
- Add or remove addresses from allowlists
- Pause and resume funding operations
- Analyze usage patterns and prevent abuse
- Top up the vault with additional funds

## Further Resources

- [GitHub Repository](https://github.com/ethpandaops/fundingvault)
- [Testnet Faucets Documentation](https://ethereum.org/en/developers/docs/networks/#testnet-faucets) 