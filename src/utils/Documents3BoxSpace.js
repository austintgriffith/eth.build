const keccak256 = require("keccak256");

export const BOX_SPACE = "eth_build";

const convertFilename2Hash = fileName => {
  return keccak256(fileName).toString("hex");
};

export const getDocumentInfo = async (space, fileName) => {
  let key = convertFilename2Hash(fileName);
  let metadata = await space.private.getMetadata(key);
  console.log({ metadata });
  let document = await space.private.get(key);
  console.log({ document });
  let log = await space.private.log();
  let versions = log.filter(entry => entry.key === key);
  console.log({ log, versions });
  return { document, metadata, versions };
};

export const saveDocument = async (space, fileName, document, screenshot) => {
  let key = convertFilename2Hash(fileName);
  let documentStruct = {
    fileName,
    data: document,
    screenshot
  };

  await space.private.set(key, documentStruct);
};
