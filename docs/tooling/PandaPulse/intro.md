---
sidebar_position: 1
---

# Usage

A monitoring tool for Ethereum networks that checks node health and reports issues to Discord. The checks are run against a Grafana instance, which is configured with a Prometheus datasource. It can be found [here](https://github.com/ethpandaops/panda-pulse).

## Commands

<details>
<summary>Trigger build of client image</summary>

- Run the `/build trigger {client} {optional:repository} {optional:ref} {optional:docker_tag}` command to trigger a build for a specific client.
- If you do not provide a repository, it will default to the client's standard repository.
- If you do not provide a ref, it will default to the client's standard branch.
- You can specify a custom Docker tag if needed.

**Note:**
- Users with any client team role or admin role can trigger builds for any client.

</details>

---

<details>
<summary>Register alerts for a new devnet</summary>

- Setup a new discord channel, under the `bots` category in the `EthR&D` Guild.
- Run the `/checks register {network} {channel} {optional:client} {optional:schedule}` command to register the alerts for all clients on the new devnet.
- If you do not provide a client, all clients will be registered for alerts.
- If you do not provide a schedule, it will default to 7am UTC.

**Note:**

- The channel in which alerts are registered must be a text channel and must be under the `bots` category.

</details>

<details>
<summary>Deregister alerts for a devnet</summary>

- Run the `/checks deregister {network}` command to deregister the alerts for all clients on the network.
- If you wish, you can also deregister alerts for a specific client on the network by running the `/checks deregister {network} {client}` command.

</details>

<details>
<summary>List all registered alerts</summary>

- Run the `/checks list` command to list all clients and networks for which alerts are registered.

</details>

<details>
<summary>Run a check manually</summary>

- Run the `/checks run {network} {client}` command to run a check manually for a client on a network.

</details>

<details>
<summary>Debug an alert</summary>

- Run the `/checks debug {id}` command to debug an alert.

</details>

---

<details>
<summary>Enable mentions for a network/client</summary>

- Run the `/mentions enable {network} {client}` command to enable mentions for a network/client.

**Note:**
- By default, mentions are disbaled for all clients/networks.
- Even if mentions are `enabled`, users/roles need to be configured (See 'Add mentions for a specific network/client/user')
- Users/roles configured for mentions will be tagged in every alert for the network/client.

</details>

<details>
<summary>Disable mentions for a network/client</summary>

- Run the `/mentions disable {network} {client}` command to disable mentions for a network/client.

</details>

<details>
<summary>Add mentions for a specific network/client/user</summary>

- Run the `/mentions add {network} {client} {user|role}` command to add a mention for a specific network/client/user.

</details>

<details>
<summary>Remove mentions for a specific network/client/user</summary>

- Run the `/mentions remove {network} {client} {user|role}` command to remove a mention for a specific network/client/user.

</details>

<details>
<summary>List all mentions configuredfor a network/client</summary>

- Run the `/mentions list {network} {client}` command to list all mentions for a network/client.

</details>

---

<details>
<summary>Register Hive summary for a new devnet</summary>

- Setup a new discord channel, under the `bots` category in the `EthR&D` Guild.
- Run the `/hive register {network} {channel} {optional:schedule}` command to register the hive summary for the new devnet.
- If you do not provide a schedule, it will default to 7am UTC.

**Note:**

- The channel in which alerts are registered must be a text channel.

</details>

<details>
<summary>Deregister alerts for a devnet</summary>

- Run the `/hive deregister {network}` command to deregister the hive summary for a network.

</details>

<details>
<summary>List all registered hive summaries</summary>

- Run the `/hive list` command to list all networks for which hive summaries are registered.

</details>

<details>
<summary>Run a hive summary manually</summary>

- Run the `/hive run {network}` command to run a manual hive summary.

</details>


## Permissions

Permissions are built in by default and are based around the `EthR&D` guild roles.

- `mod` - Has access to all commands.
- `admin` - Has access to all commands.
- `ef` - Has access to all commands.

Users assigned a client team role can only interact with the commands for the clients they are responsible for.

For example, a user assigned the `prysmatic` role can only interact with the commands for the `prysm` client.

