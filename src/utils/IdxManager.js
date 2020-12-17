import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'
import Web3Modal from 'web3modal'

import { definitions } from './file-config.json'

// import { ThreeIdConnect, EthereumAuthProvider } from '3id-connect'
// import Ceramic from '@ceramicnetwork/ceramic-core'
// import IPFS from 'ipfs'

// async function connectIdx() {
//   const threeIdConnect = new ThreeIdConnect()
//   // Usually the following three steps are taken when
//   // a user choose to connect their wallet
//   const addresses = await window.ethereum.enable()
//   // Create 3id connect instance
//   const authProvider = new EthereumAuthProvider(window.ethereum, addresses[0])
//   await threeIdConnect.connect(authProvider)
//   // create a Ceramic instance
//   const didProvider = await threeIdConnect.getDidProvider()
//   const ipfs = await IPFS.create()
//   const ceramic = await Ceramic.create(ipfs, { didProvider })
//   return ceramic
// }

const CERAMIC_URL = 'https://ceramic-dev.3boxlabs.com'

const threeID = new ThreeIdConnect()
const web3modal = new Web3Modal({ network: 'mainnet', cacheProvider: true })

// export type NoteItem = {
//   id: string
//   title: string
// }

// export type NotesList = { notes: Array<NoteItem> }

// export type IDXInit = NotesList & {
//   ceramic: Ceramic
//   idx: IDX
// }

export async function getIDX() {
  // Connect an Ethereum provider
  const ethereumProvider = await web3modal.connect()
  const { result } = await ethereumProvider.send('eth_requestAccounts')

  // Authenticate using the Ethereum provider in 3ID Connect
  await threeID.connect(new EthereumAuthProvider(ethereumProvider, result[0]))

  // Create the Ceramic instance and inject provider
  const ceramic = new Ceramic(CERAMIC_URL)
  await ceramic.setDIDProvider(threeID.getDidProvider())

  // Create the IDX instance with the definitions aliases from the config
  const idx = new IDX({ ceramic, aliases: definitions })

  // Load the existing notes
  const notesList = await idx.get('notes')
  return { ceramic, idx, notes: notesList.notes || [] }
}
