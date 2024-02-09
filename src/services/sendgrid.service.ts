import api from ".";

export const sendEmail = async (sgPayload: any) => {
  const { data } = await api.post("/sendgrid", sgPayload);
  return data;
};
