---
sidebar_position: 1
---

# Caching

This quick start guide will help you get started with using our caching server with kurtosis.

## Prerequisites
Please make sure that you have all prerequisites installed before you come to the event.
* Have Docker [installed](https://github.com/docker/docker-install?tab=readme-ov-file#usage)
* Have a Kurtosis [installed](https://docs.kurtosis.com/install)
* Familirize yourself (at least a little bit) with [Kurtosis](https://ethpandaops.io/posts/kurtosis-deep-dive/)
* Run kurtosis run at least once to make sure everything is working as expected (`kurtosis run github.com/kurtosis-tech/ethereum-package`)
* Verify you have kurtosis verison 0.89.0 or higher (`kurtosis version`)

## Configuring the Caching Server
* Caching server will be hosted on `10.10.10.11` and will be listening on port `5000`
* Edit your docker daemon configuration to allow insecure registries. Add 
  ```json
  {
    "insecure-registries": [
      "10.10.10.11:5000"
    ]
  }
  ``` 
  to your `/etc/docker/daemon.json` (linux) | `~/.docker/daemon.json` (macos docker desktop) file | `~/.orbstack/config/docker.json` (orbstack) . If you don't have this file, create it.
* Restart your docker daemon (`sudo systemctl restart docker` on linux | Docker desktop restart on macos | Orbstack quit, restart on orbstack)
* Verify that the insecure registry is added by running `docker info` and looking for `Insecure Registries:
```shell
 Insecure Registries:
  10.10.10.11:5000
  ...
```
* Verify what images are available on the caching server:
```shell
curl -X GET  http://10.10.10.11:5000/v2/_catalog
```

## Pulling Images from the Caching Server
* Pull the image from the caching server:
```shell
docker pull 10.10.10.11:5000/ethpandaops/geth:latest
```

## Replace all images in your kurtosis config with the caching server's IP
* Replace all images in your kurtosis config with the caching server's IP. For example, if your kurtosis config looks like this:
```yaml
participants:
  - el_type: geth
    el_image: ethpandaops/geth:master
    cl_type: lighthouse
    cl_image: ethpandaops/lighthouse:master
```
Replace it with
```yaml
participants:
  - el_type: geth
    el_image: 10.10.10.11:5000/ethpandaops/geth:master
    cl_type: lighthouse
    cl_image: 10.10.10.11:5000/ethpandaops/lighthouse:master
```
