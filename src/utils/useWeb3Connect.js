import { useState, useEffect } from "react";

import Web3 from "web3";
import Web3Connect from "web3connect";

import WalletConnectProvider from "@walletconnect/web3-provider";
// import Portis from "@portis/web3";
// import Fortmatic from "fortmatic";
// import Torus from "@toruslabs/torus-embed";
// import Authereum from "authereum";

import supportedChains from "./chains";
const INFURA_KEY = "32f4c2933abd4a74a383747ccf2d7003";

const providerOptions = {
  // portis: {
  //   package: Portis, // required
  //   options: {
  //     id: "PORTIS_ID" // required
  //   }
  // },
  walletconnect: {
    package: WalletConnectProvider,
    options: {
      infuraId: INFURA_KEY
    }
  }
  // portis: {
  //   package: Portis,
  //   options: {
  //     id: process.env.REACT_APP_PORTIS_ID
  //   }
  // },
  // fortmatic: {
  //   package: Fortmatic,
  //   options: {
  //     key: process.env.REACT_APP_FORTMATIC_KEY
  //   }
  // },
  // torus: {
  //   package: Torus,
  //   options: {}
  // },
  // authereum: {
  //   package: Authereum,
  //   options: {}
  // }
};

const web3Connect = new Web3Connect.Core({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
});

function useWeb3Connect() {
  const [provider, setProvider] = useState(null);
  const [web3, setWeb3] = useState(null);

  const [connected, setConnected] = useState(false);
  const [address, setAddress] = useState(null);
  const [chainId, setChainId] = useState(null);
  const [networkId, setNetworkId] = useState(null);
  const [network, setNetwork] = useState(null);
  const [fetching, setFetching] = useState(false);

  // console.log({ connected, address, chainId, networkId, fetching, error });
  const onConnect = async () => {
    const providerInited = await web3Connect.connect();

    await subscribeProvider(providerInited);

    const web3Inited = new Web3(providerInited);

    await web3Inited.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3Inited.utils.hexToNumber
        }
      ]
    });

    const accounts = await web3Inited.eth.getAccounts();

    const addressTemp = accounts[0];

    const networkIdTemp = await web3Inited.eth.net.getId();

    const chainIdTemp = await web3Inited.eth.chainId();

    setProvider(providerInited);
    setWeb3(web3Inited);
    setConnected(true);
    setAddress(addressTemp);
    setChainId(chainIdTemp);
    setNetworkId(networkIdTemp);
    setNetwork(getNetworkByChainId(networkIdTemp));
    setFetching(true);
  };

  useEffect(() => {
    if (web3Connect.cachedProvider && !connected) {
      onConnect();
    }
  });

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close();
    }
    await web3Connect.clearCachedProvider();
    await setProvider(null);
    await setWeb3(null);
    await setConnected(false);
    await setAddress(null);
    await setChainId(null);
    await setNetworkId(null);
    await setFetching(false);
  };

  const getNetworkByChainId = chainIdTemp => {
    let networkTemp = supportedChains.filter(
      chain => chain.chain_id === chainIdTemp
    );
    return networkTemp ? networkTemp.network : null;
  };
  const subscribeProvider = async provider => {
    provider.on("close", () => resetApp());

    provider.on("accountsChanged", async accounts => {
      setAddress(accounts[0]);
    });

    provider.on("chainChanged", async chainId => {
      const networkId = await web3.eth.net.getId();
      setChainId(networkId);
      setNetwork(getNetworkByChainId(networkId));
    });

    provider.on("networkChanged", async networkId => {
      const chainId = await web3.eth.chainId();
      setChainId(chainId);
      setNetworkId(networkId);
      setNetwork(getNetworkByChainId(networkId));
    });
  };

  return {
    connected,
    address,
    chainId,
    networkId,
    network,
    fetching,
    triggerConnect: onConnect,
    web3,
    web3Connect,
    resetApp,
    provider
  };
}

export default useWeb3Connect;
