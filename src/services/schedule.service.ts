import api from ".";

export const getEvents = async () => {
  const { data } = await api("/schedule");
  return data;
};

export const cancellSchedule = async (id: number) => {
  const { data } = await api.patch(`/schedule/${id}`, {});
  return data;
};

export const saveSchedule = async (scheduleData: any) => {
  const { data } = await api.post("/schedule", scheduleData);
  return data;
};
