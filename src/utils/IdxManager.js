import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'

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

// export type NoteItem = {
//   id: string
//   title: string
// }

// export type NotesList = { notes: Array<NoteItem> }

// export type IDXInit = NotesList & {
//   ceramic: Ceramic
//   idx: IDX
// }

let ceramic = null;
let idx = null;
let fetching = false;

export const connectIDX = async (
  address,
  provider,
  setStatus = console.log()
) => {
  if (ceramic && idx) {
    return { ceramic, idx };
  }
  if (fetching) {
    throw new Error("trying to connect IDX while fetching...");
  }
  fetching = true;
  try {
    if (typeof provider !== "undefined") {
      setStatus("Approve access to IDX on your wallet");

      // Authenticate using the Ethereum provider in 3ID Connect
      await threeID.connect(new EthereumAuthProvider(provider, address))

      // Create the Ceramic instance and inject provider
      setStatus("Creating Ceramic instance and inject provider");
      ceramic = new Ceramic(CERAMIC_URL)
      await ceramic.setDIDProvider(threeID.getDidProvider())

      // Create the IDX instance with the definitions aliases from the config
      setStatus("Creating IDX instance");
      idx = new IDX({ ceramic, aliases: definitions })

      return { ceramic, idx }
    } else {
      throw new Error("No web3 provider available");
    }
  } catch (error) {
    throw error;
  } finally {
    fetching = false;
  }
}

export const logoutIDX = async () => {
  ceramic = null;
  idx = null;
};

export const getCeramic = () => ceramic;
export const getIDX = () => idx;
export const isFetching = () => fetching;
