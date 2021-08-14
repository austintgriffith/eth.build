import Ceramic from '@ceramicnetwork/http-client'
import { IDX } from '@ceramicstudio/idx'
import { EthereumAuthProvider, ThreeIdConnect } from '3id-connect'

import { definitions } from './idx-config.json'

const CERAMIC_URL = 'https://ceramic-dev.3boxlabs.com'

const threeID = new ThreeIdConnect()

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

      setStatus("IDX instance Created");

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
