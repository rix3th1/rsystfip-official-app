import api from ".";

export const getCategories = async () => {
  const { data } = await api("/categories");
  return data;
};
