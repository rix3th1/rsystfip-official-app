import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { endOfMonth, format } from "date-fns";
import type { ICounts } from "@/interfaces";

export interface Reports {
  category_id: number;
  first_name: string;
  last_name: string;
  created_at: string;
  updated_at: string;
  start_time: string;
  end_time: string;
  scheduling_count: string;
  daily_count: string;
  category_name: string;
}

export interface QueryData {
  start_time: string;
  end_time: string;
  category_id: string;
}

interface ReportsState {
  pngBase64: string;
  reports: Array<Reports>;
  reportsOrigen: Array<Reports>;
  reportsCountOnRange: Array<ICounts>;
  reportsCountAllTime: Array<ICounts>;
  queryData: QueryData;
}

const initialState: ReportsState = {
  pngBase64: "",
  reports: [],
  reportsOrigen: [],
  reportsCountOnRange: [],
  reportsCountAllTime: [],
  queryData: {
    start_time: format(new Date(), "yyyy-MM-01"),
    end_time: format(endOfMonth(new Date()), "yyyy-MM-dd"),
    category_id: "",
  },
};

const reportsSlice = createSlice({
  name: "reports",
  initialState,
  reducers: {
    setPngBase64(
      state,
      { payload }: PayloadAction<ReportsState["pngBase64"]>
    ): ReportsState {
      return { ...state, pngBase64: payload };
    },
    setReports(
      state,
      { payload }: PayloadAction<Array<Reports>>
    ): ReportsState {
      return { ...state, reports: payload };
    },
    setReportsOrigen(
      state,
      { payload }: PayloadAction<Array<Reports>>
    ): ReportsState {
      return { ...state, reportsOrigen: payload };
    },
    setReportsCountOnRange(
      state,
      { payload }: PayloadAction<Array<ICounts>>
    ): ReportsState {
      return { ...state, reportsCountOnRange: payload };
    },
    setReportsCountAllTime(
      state,
      { payload }: PayloadAction<Array<ICounts>>
    ): ReportsState {
      return { ...state, reportsCountAllTime: payload };
    },
    setQueryData(state, { payload }: PayloadAction<QueryData>): ReportsState {
      return { ...state, queryData: payload };
    },
    resetQueryDataReports(state): ReportsState {
      return { ...state, queryData: initialState.queryData };
    },
  },
});

export const {
  setPngBase64,
  setReports,
  setReportsOrigen,
  setReportsCountOnRange,
  setReportsCountAllTime,
  setQueryData,
  resetQueryDataReports,
} = reportsSlice.actions;

export default reportsSlice.reducer;
