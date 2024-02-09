import api from ".";

export const verifyJwtForRecoverPsw = async (resetToken: string) => {
  const { data } = await api.get("/account/verify-jwt-for-recover-password", {
    headers: { Authorization: resetToken },
  });
  return data;
};

export const sendJwtForRecoverPsw = async (email: string) => {
  const { data } = await api.post("/account/send-jwt-for-recover-password", {
    email,
  });
  return data;
};

export const changePassword = async (dataUser: any) => {
  const { data } = await api.patch(
    `/account/update-password/${dataUser.id}`,
    dataUser,
  );
  return data;
};

export const changePasswordWithJwt = async (dataUser: any) => {
  const { data } = await api.patch(`/account/update-password`, dataUser);
  return data;
};
