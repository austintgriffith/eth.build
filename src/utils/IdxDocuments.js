import moment from "moment";
import { schemas } from './idx-config.json'

const keccak256 = require("keccak256");

export const IDX_DEFINITION_NAME = "eth_build";

const convertFilename2Hash = fileName => {
  return keccak256(fileName).toString("hex");
};

// TODO: any approach to read a single document faster?
export const getDocumentInfo = async (auth, fileName) => {
  const { idx, ceramic } = auth;
  const key = convertFilename2Hash(fileName);
  const documents = await readDecrtypedDocuments(idx);
  console.log('documents', documents, idx.id);
  const docId = documents[key]
  const document = docId ? await readSingleDocument(idx, ceramic, docId) : null;
  console.log({ document });
  return { document };
};

export const saveDocument = async (auth, fileName, document, screenshot) => {
  const { ceramic, idx } = auth;
  try {
    const key = convertFilename2Hash(fileName);
    // save document
    const documentStruct = {
      fileName,
      data: document,
      screenshot,
      timestamp: parseInt(Date.now() / 1000),
    };
    const jwe = await idx.did.createDagJWE(documentStruct, [idx.did.id]);
    const doc = await ceramic.createDocument('tile', {
      content: jwe,
      metadata: { controllers: [idx.id], schema: schemas.EncryptedFile },
    })

    // update files
    let files = await readDecrtypedDocuments(idx);
    files[key] = doc.id.toString();
    const filesJwe = await idx.did.createDagJWE(files, [idx.did.id]);
    await idx.set(IDX_DEFINITION_NAME, filesJwe);
  } catch(e) {
    console.error('failed to save document', e);
  }
}

export const loadDocuments = async auth => {
  const { idx, ceramic } = auth;
  console.log("LOADING DOCUMENTS");
  // TODO: need read documents again?
  const files = await readDecrtypedDocuments(idx);
  let documents = await Promise.all(Object.values(files).map(docId => readSingleDocument(idx, ceramic, docId)));
  documents = documents.map(file => ({
    timestampStr: moment.unix(file.timestamp).fromNow(),
    ...file
  }));
  documents.sort((fileA, fileB) => fileB.timestamp - fileA.timestamp);
  console.log(documents);
  return documents;
}

const readDecrtypedDocuments = async (idx) => {
  const jwe = await idx.get(IDX_DEFINITION_NAME);
  return (jwe ? await idx.did.decryptDagJWE(jwe) : null) || {};
}

const readSingleDocument = async (idx, ceramic, docId) => {
  const doc = docId ? await ceramic.loadDocument(docId) : null;
  const jwe = doc ? doc.content : null;
  return (jwe ? await idx.did.decryptDagJWE(jwe) : null) || {};
}
