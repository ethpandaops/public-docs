## General documenation about connecting to Boulder office's VPN

**Client configuration:**

1. Create a public-private key pair: `umask 077 && wg genkey | tee privatekey | wg pubkey > publickey`
2. Create a wireguard.conf file following the wireguard-client-config below
3. Provide the public key to Barnabas#1342/parithosh#0530 on discord or anyone from the [ethpandaops team](https://github.com/orgs/ethpandaops/people).

```
[Interface]
PrivateKey = [yourPrivateKey]
Address = X.X.X.X/32
DNS = 10.20.50.1

[Peer]
PublicKey = [VPNServerPublicKey]
PresharedKey = [presharedKey]
AllowedIPs = 10.20.50.0/24, X.X.X.X/32
Endpoint = boulder.vpn.ethpandaops.io:51820
PersistentKeepalive = 15
```

Note: `VPNServerPublicKey` and `presharedKey` and `X` address will be provided to you in order to authenticate your device.

Each client is a single device, if you would like to have multiple devices accessing the VPN network, please create another client for the other device. 


**Client startup:**

1. Run `wg-quick up ~/path-to-client-config/wireguard.conf`
2. Test connection with: `ping 10.20.50.1`. Or with `ping domain.ef-boulder` (domain example: `smc-boulder-01.ef-boulder`).
3. Optionally add it as a service or as a terminal shortcut.