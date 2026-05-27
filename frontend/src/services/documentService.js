import api from "../config/api";

export const getDocuments = async () => {

  const token = localStorage.getItem("access");

  const response = await api.get(
    "docs/documents/",
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};

export const createDocument = async () => {

  const token = localStorage.getItem("access");

  const response = await api.post(
    "docs/documents/",
    {},
    {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }
  );

  return response.data;
};