## General documenation about connecting EF VPNs

We use [wireguard](https://www.wireguard.com/) as our VPN of choice. Our wireguard setup allows you to get access to the EF Berlin
office as well as the EF Boulder office. If you need a third, private and secure VPN just for your teammates to access servers you host
on our infra then please reach out to the DevOps team.

The below guide assumes that you have `wireguard` installed (Run ` wg --help` to check).

Before you reach out to EF DevOps to get access, please generate a `wireguard public key` and share it with us:
1. Create a public-private key pair: `umask 077 && wg genkey | tee privatekey | wg pubkey > publickey`

Once we have the `pubkey`, we will assign an IP to you and a `preshared` key. Please place those values in the config files
and then follow the remainder of the steps defined in `Client Startup`.

### Client configuration
#### Client configuration for Boulder:#### 
1. Create a wireguard.conf file following the wireguard-client-config below
2. Provide the public key to Barnabas#1342/parithosh#0530 on discord or anyone from the [ethpandaops team](https://github.com/orgs/ethpandaops/people).

```
[Interface]
PrivateKey = [yourPrivateKey]
Address = X.X.X.X/32
DNS = 10.20.50.1

[Peer]
PublicKey = Gh7UqjaA2IzrcB9ZNiFco7zVpwHmCeFCHLuny/UETw0=
PresharedKey = [presharedKey]
AllowedIPs = 10.20.50.0/24, X.X.X.X/32
Endpoint = boulder.vpn.ethpandaops.io:51820
PersistentKeepalive = 15
```

Note:  `X` address and `presharedKey` will be provided to you in order to authenticate your device. `youPrivateKey` is the key generated in earlier step 1. (Related to the shared `pubkey`).

#### Client configuration for Berlin:#### 
1. Create a wireguard.conf file following the wireguard-client-config below
2. Provide the public key to Barnabas#1342/parithosh#0530 on discord or anyone from the [ethpandaops team](https://github.com/orgs/ethpandaops/people).

```
[Interface]
PrivateKey = [yourPrivateKey]
Address = X.X.X.X/32

[Peer]
PublicKey = Z4iicKvlim92Et+xxjYAD54rJ4DcYhdoeuZoxAfTCTA=
PresharedKey = [presharedKey]
AllowedIPs = 10.10.42.1/24,10.10.11.1/24, X.X.X.X/32
Endpoint = berlin.vpn.ethpandaops.io:51820
PersistentKeepalive = 15
```

Note:  `X` address and `presharedKey` will be provided to you in order to authenticate your device.

### Using the VPN
#### Client startup:#### 

Each client is a single device, if you would like to have multiple devices accessing the VPN network, please create another client for the other device and inform us of the same.

1. Run `wg-quick up ~/path-to-client-config/wireguard.conf`
2. Test connection with: `ping 10.20.50.1` for boulder and `ping 10.10.11.1` for berlin. Or with `ping domain.ef-boulder<or berlin>` (domain example: `smc-boulder-01.ef-boulder`).
3. Optionally add it as a systemD service or as a terminal shortcut.