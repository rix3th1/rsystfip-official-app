import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface ICalendarState {
  loading: boolean;
  changes: boolean;
  calendarEvents: Array<ICalendarEvents>;
}

export interface ICalendarEvents {
  id: number;
  title: string;
  start: string;
  end: string;
  color: string;
}

const initialState: ICalendarState = {
  loading: false,
  changes: false,
  calendarEvents: [],
};

const calendarSlice = createSlice({
  name: "calendar",
  initialState,
  reducers: {
    setCalendarEvents(
      state,
      { payload }: PayloadAction<Array<ICalendarEvents>>
    ): ICalendarState {
      return { ...state, calendarEvents: [...payload] };
    },
    registerAChange(state): ICalendarState {
      return { ...state, changes: !state.changes };
    },
    setLoading(state, { payload }: PayloadAction<boolean>): ICalendarState {
      return { ...state, loading: payload };
    },
  },
});

export const { setCalendarEvents, registerAChange, setLoading } =
  calendarSlice.actions;

export default calendarSlice.reducer;
