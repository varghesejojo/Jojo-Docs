import api from "../config/api";

//  DOCUMENTS
export const getDocuments = async () => {
  console.log("Fetching documents...");

  const response = await api.get(
    "docs/documents/"
  );

  return response.data;
};

export const createDocument = async () => {

  const response = await api.post(
    "docs/documents/",
    {}
  );

  return response.data;
};

//  DOCUMENT DETAILS

export const getDocument = async (documentId) => {

  const response = await api.get(
    `docs/documents/${documentId}/`
  );

  return response.data;
};

export const updateDocument = async (
  documentId,
  data
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    data
  );

  return response.data;
};

//  RENAME


export const renameDocument = async (
  documentId,
  title
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    {
      title,
    }
  );

  return response.data;
};

//  SOFT DELETE


export const moveToTrash = async (
  documentId
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    {
      is_deleted: true,
    }
  );

  return response.data;
};

//  RESTORE


export const restoreDocument = async (
  documentId
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    {
      is_deleted: false,
    }
  );

  return response.data;
};

//  STAR


export const starDocument = async (
  documentId
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    {
      is_starred: true,
    }
  );

  return response.data;
};

export const unstarDocument = async (
  documentId
) => {

  const response = await api.put(
    `docs/documents/${documentId}/`,
    {
      is_starred: false,
    }
  );

  return response.data;
};

//  PERMANENT DELETE


export const deleteForever = async (
  documentId
) => {

  const response = await api.delete(
    `docs/documents/${documentId}/`
  );

  return response.data;
};

//  TRASH DOCUMENTS


export const getTrashDocuments = async () => {

  const response = await api.get(
    "docs/trash/"
  );

  return response.data;
};

//  STARRED DOCUMENTS


export const getStarredDocuments =
  async () => {

    const response = await api.get(
      "docs/starred/"
    );

    return response.data;
  };

//  Recent DOCUMENTS
export const getRecentDocuments = async () => {

  const response = await api.get(
    "docs/recent/"
  );

  return response.data;
};