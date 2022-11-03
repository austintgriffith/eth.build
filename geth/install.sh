#!/bin/bash

if [  -n "$(uname -a | grep Ubuntu)" ]; then
    sudo apt-get update && sudo apt-upgrade -y
    sudo apt install build-essential -y
    sudo apt install golang-go git -y
    git clone https://github.com/ethereum/go-ethereum
    cd go-ethereum/
    make geth
    ls -al build/bin/geth
else
   sudo yum -y update
   sudo yum -y install golang
   sudo yum -y install gmp-devel
   sudo yum -y install git
   git clone https://github.com/ethereum/go-ethereum
   cd go-ethereum/
   make geth
   ls -al build/bin/geth
fi
