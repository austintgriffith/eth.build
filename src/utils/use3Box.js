import React, { useState, useEffect } from "react";
import Box from "3box";
import { BOX_SPACE } from "./Documents3BoxSpace";

let globalBox = null;
let globalSpace = null;

function use3Box(address, provider) {
  const [box, setBox] = useState(globalBox);
  const [space, setSpace] = useState(globalSpace);
  const [fetching, setFetching] = useState(false);

  // console.log({ connected, address, chainId, networkId, fetching, error });

  useEffect(() => {
    const openBox = async () => {
      if (
        !globalBox &&
        !globalSpace &&
        address &&
        (await Box.isLoggedIn(address)) &&
        !fetching
      ) {
        setFetching(true);
        globalBox = await Box.openBox(address, provider);
        globalSpace = await globalBox.openSpace(BOX_SPACE);
        setBox(globalBox);
        setSpace(globalSpace);
        setFetching(false);
      }
    };
    openBox();
  }, [provider, address]);

  const open3Box = async setStatus => {
    if (globalBox && globalSpace) {
      return { globalBox, globalSpace };
    }
    if (fetching) {
      throw new Error("trying to open 3Box while fetching...");
    }
    setFetching(true);
    try {
      if (typeof provider !== "undefined") {
        setStatus("Approve access to 3Box on your wallet");

        globalBox = await Box.openBox(address, provider, {
          consentCallback: () => {
            setStatus("Synchronizing with 3Box (it can take some time)");
          }
        });
        setBox(globalBox);
        // console.log({ box });
        setStatus("Finalizing synchronization with 3Box");
        await globalBox.syncDone;
        setStatus("Approve opening eth.build space on your wallet");
        globalSpace = await globalBox.openSpace(BOX_SPACE, {
          consentCallback: () => {
            setStatus("Synchronizing with your 3Box space");
          }
        });
        setSpace(globalSpace);
        // console.log({ space });
        setStatus("Finalizing synchronization with your 3Box space");
        await globalSpace.syncDone;
        setStatus("3Box space opened");
        return { box: globalBox, space: globalSpace };
      } else {
        throw new Error("No web3 provider available");
      }
    } catch (error) {
      throw error;
    } finally {
      setFetching(false);
    }
  };

  const logout3Box = async () => {
    if (box) {
      await box.logout();
    }
    globalBox = null;
    globalSpace = null;
    setBox(null);
    setSpace(null);
    setFetching(null);
  };

  return [box, space, open3Box, fetching, logout3Box];
}

export default use3Box;
