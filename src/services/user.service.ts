import api from ".";

export const getUsers = async () => {
  const { data } = await api("/users");
  return data;
};

export const getData = async (role: string) => {
  const { data } = await api(`/users/${role}`);
  return data;
};

export const saveUser = async (user: any) => {
  const { data } = await api.post("/users", user);
  return data;
};

export const deleteUser = async (roleId: number) => {
  const { data } = await api.delete(`/users/${roleId}`);
  return data;
};
