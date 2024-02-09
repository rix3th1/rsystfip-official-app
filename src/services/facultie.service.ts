import api from ".";

export const getFaculties = async () => {
  const { data } = await api("/faculties");
  return data;
};
