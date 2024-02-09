import api from ".";

export const getDocuments = async () => {
  const { data } = await api("/documents");
  return data;
};
