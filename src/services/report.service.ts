import { type QueryData } from "@/redux/features/reports/reportsSlice";
import api from ".";

export const getReports = async ({ start_time, end_time }: QueryData) => {
  const { data } = await api("/reports", {
    params: { start_time, end_time },
  });
  return data;
};

export const getReportsCountAlltime = async () => {
  const { data } = await api("/reports/counts");
  return data;
};

export const getReportsCountOnRange = async ({
  start_time,
  end_time,
}: QueryData) => {
  const { data } = await api("/reports/count", {
    params: { start_time, end_time },
  });
  return data;
};
