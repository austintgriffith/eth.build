import moment from "moment";

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

export const loadDocuments = async space => {
  console.log("LOADING DOCUMENTS");
  let files = await space.private.all({ metadata: true });
  console.log(files);
  let documents = Object.values(files).map(file => ({
    timestamp: file.timestamp,
    timestampStr: moment.unix(file.timestamp).fromNow(),
    ...file.value
  }));
  documents.sort((fileA, fileB) => fileB.timestamp - fileA.timestamp);
  console.log(documents);
  return documents;
};
