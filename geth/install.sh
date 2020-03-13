#!/bin/bash
sudo yum -y update
sudo yum -y install golang
sudo yum -y install gmp-devel
sudo yum -y install git
git clone https://github.com/ethereum/go-ethereum
cd go-ethereum/
make geth
ls -al build/bin/geth
