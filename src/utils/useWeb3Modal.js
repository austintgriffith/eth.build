import { useState, useEffect } from "react"

import Web3 from "web3"
import Web3Modal from "web3modal"

import WalletConnectProvider from "@walletconnect/web3-provider"
// import Portis from "@portis/web3"
// import Fortmatic from "fortmatic"
// import Torus from "@toruslabs/torus-embed"
// import Authereum from "authereum"

import supportedChains from "./chains"
const INFURA_KEY = "32f4c2933abd4a74a383747ccf2d7003"

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
}

const web3modal = new Web3Modal({
  // network: "mainnet", // optional
  cacheProvider: true, // optional
  providerOptions // required
})

function useWeb3Modal() {
  const [provider, setProvider] = useState(null)
  const [web3, setWeb3] = useState(null)

  const [connected, setConnected] = useState(false)
  const [address, setAddress] = useState(null)
  const [chainId, setChainId] = useState(null)
  const [networkId, setNetworkId] = useState(null)
  const [network, setNetwork] = useState(null)
  const [fetching, setFetching] = useState(false)

  // console.log({ connected, address, chainId, networkId, fetching, error })
  const onConnect = async () => {
    const providerInited = await web3modal.connect()

    await subscribeProvider(providerInited)

    const web3Inited = new Web3(providerInited)

    await web3Inited.eth.extend({
      methods: [
        {
          name: "chainId",
          call: "eth_chainId",
          outputFormatter: web3Inited.utils.hexToNumber
        }
      ]
    })

    const accounts = await web3Inited.eth.getAccounts()

    const addressTemp = accounts[0]

    const networkIdTemp = await web3Inited.eth.net.getId()

    const chainIdTemp = await web3Inited.eth.chainId()

    setProvider(providerInited)
    setWeb3(web3Inited)
    setConnected(true)
    setAddress(addressTemp)
    setChainId(chainIdTemp)
    setNetworkId(networkIdTemp)
    setNetwork(getNetworkByChainId(networkIdTemp))
    setFetching(true)
  }

  useEffect(() => {
    if (web3modal.cachedProvider && !connected) {
      onConnect()
    }
  })

  const resetApp = async () => {
    if (web3 && web3.currentProvider && web3.currentProvider.close) {
      await web3.currentProvider.close()
    }
    await web3modal.clearCachedProvider()
    await setProvider(null)
    await setWeb3(null)
    await setConnected(false)
    await setAddress(null)
    await setChainId(null)
    await setNetworkId(null)
    await setFetching(false)
  }

  const getNetworkByChainId = chainIdTemp => {
    let networkTemp = supportedChains.filter(
      chain => chain.chain_id === chainIdTemp
    )
    return networkTemp ? networkTemp.network : null
  }
  const subscribeProvider = async provider => {
    provider.on("close", () => resetApp())

    provider.on("accountsChanged", async accounts => {
      setAddress(accounts[0])
    })

    provider.on("chainChanged", chainId => {
      setChainId(chainId)
    })

    provider.on("networkChanged", networkId => {
      setNetworkId(networkId)
      setNetwork(getNetworkByChainId(chainId))
    })

    provider.on("disconnect", error => {
      console.log(error)
    })
  }

  return {
    connected,
    address,
    chainId,
    networkId,
    network,
    fetching,
    triggerConnect: onConnect,
    web3,
    web3modal,
    resetApp,
    provider
  }
}

export default useWeb3Modal
