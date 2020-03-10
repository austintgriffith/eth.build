import Box from "3box";
import { BOX_SPACE } from "./Documents3BoxSpace";

let box = null;
let space = null;
let fetching = false;

export const open3Box = async (
  address,
  provider,
  setStatus = console.log()
) => {
  if (box && space) {
    return { box, space };
  }
  if (fetching) {
    throw new Error("trying to open 3Box while fetching...");
  }
  fetching = true;
  try {
    if (typeof provider !== "undefined") {
      setStatus("Approve access to 3Box on your wallet");

      box = await Box.openBox(address, provider, {
        consentCallback: () => {
          setStatus("Synchronizing with 3Box");
        }
      });

      setStatus("Finalizing synchronization with 3Box");
      await box.syncDone;
      setStatus("Approve opening eth.build space on your wallet");
      space = await box.openSpace(BOX_SPACE, {
        consentCallback: () => {
          setStatus("Synchronizing with your 3Box space");
        }
      });
      // console.log({ space });
      setStatus("Finalizing synchronization with your 3Box space");
      await space.syncDone;
      setStatus("3Box space opened");
      return { box, space };
    } else {
      throw new Error("No web3 provider available");
    }
  } catch (error) {
    throw error;
  } finally {
    fetching = false;
  }
};

export const logout3Box = async () => {
  if (box) {
    await box.logout();
  }
  box = null;
  space = null;
};

export const getBox = () => box;
export const getSpace = () => space;
export const isFetching = () => fetching;
