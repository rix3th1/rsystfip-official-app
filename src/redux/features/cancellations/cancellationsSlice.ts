import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IPeopleBase } from "@/interfaces";

export interface PeopleCancellation extends IPeopleBase {
  cancellation_subject: string;
}

const initialState: Array<PeopleCancellation> = [];

const cancellationsSlice = createSlice({
  name: "cancellations",
  initialState,
  reducers: {
    setCancelledPeople(
      _state,
      { payload }: PayloadAction<Array<PeopleCancellation>>
    ): Array<PeopleCancellation> {
      return payload;
    },
  },
});

export const { setCancelledPeople } = cancellationsSlice.actions;

export default cancellationsSlice.reducer;
