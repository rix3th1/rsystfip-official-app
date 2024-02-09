import { type QueryData } from "@/redux/features/statistics/statisticsSlice";
import api from ".";

export const getStatistics = async (
  scheduling_type: string,
  { start_time, end_time }: QueryData
) => {
  const { data } = await api(`/statistics/${scheduling_type}`, {
    params: { start_time, end_time },
  });
  return data;
};

export const getMostAgendatedOnRange = async (
  scheduling_type: string,
  { start_time, end_time }: QueryData
) => {
  const { data } = await api(`/statistics/onrange/${scheduling_type}`, {
    params: { start_time, end_time },
  });
  return data;
};

export const getMostAgendatedAllTime = async (scheduling_type: string) => {
  const { data } = await api(`/statistics/alltime/${scheduling_type}`);
  return data;
};
