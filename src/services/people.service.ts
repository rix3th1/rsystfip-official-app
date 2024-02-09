import api from ".";

export const getPeople = async () => {
  const { data } = await api("/people");
  return data;
};

export const getPeopleCancelled = async () => {
  const { data } = await api("/people/cancelled");
  return data;
};

export const getData = async (id: string) => {
  const { data } = await api(`/people/${id}`);
  return data;
};

export const editPeople = async (peopleData: any) => {
  const { data } = await api.put(`/people/${peopleData.id}`, peopleData);
  return data;
};

export const savePeople = async (peopleData: any) => {
  const { data } = await api.post("/people", peopleData);
  return data;
};
