import moment from "moment";
import { schemas } from './file-config.json'

const keccak256 = require("keccak256");

export const IDX_DEFINITION_NAME = "notes" // "eth_build";

const convertFilename2Hash = fileName => {
  return keccak256(fileName).toString("hex");
};

// TODO: any approach to read a single document faster?
export const getDocumentInfo = async (auth, fileName) => {
  const key = convertFilename2Hash(fileName);
  const metadata = null
  // let metadata = await space.private.getMetadata(key);
  // console.log({ metadata });
  let documents = await loadDocuments(auth);
  documents = documents && documents.filter(d => d.key === key)
  const document = documents && documents.length > 0 && documents[0]
  console.log({ document });
  const versions = []
  // let log = await space.private.log();
  // let versions = log.filter(entry => entry.key === key);
  // console.log({ log, versions });
  return { document, metadata, versions };
};

export const saveDocument = async (auth, fileName, document, screenshot) => {
  const { ceramic, idx } = auth;
  try {
    const key = convertFilename2Hash(fileName);
    const documentStruct = {
      fileName,
      data: document,
      screenshot
    };
    const [doc, fileList] = Promise.all([
      ceramic.createDocument('tile', {
        content: documentStruct,
        metadata: { controllers: [idx.id], schema: schemas.Note },
      }),
      idx.get(IDX_DEFINITION_NAME),
    ])
    const files = fileList || []
    await idx.set(IDX_DEFINITION_NAME, {
      files: [{ id: doc.id.toUrl(), key }, ...files],
    })
  } catch(e) {
    console.error('failed to save document', e)
  }
}

export const loadDocuments = async auth => {
  const { idx } = auth
  console.log("LOADING DOCUMENTS");
  // TODO: need read documents again?
  let files = await idx.get(IDX_DEFINITION_NAME)
  console.log(files);
  let documents = Object.values(files).map(file => ({
    timestamp: file.timestamp,
    timestampStr: moment.unix(file.timestamp).fromNow(),
    ...file.value
  }));
  documents.sort((fileA, fileB) => fileB.timestamp - fileA.timestamp);
  console.log(documents);
  return documents;
}
