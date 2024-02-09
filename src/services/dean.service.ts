import api from ".";

export const getDeans = async () => {
  const { data } = await api("/deans");
  return data;
};

export const saveDean = async (deanData: any) => {
  const { data } = await api.post("/deans", deanData);
  return data;
};
