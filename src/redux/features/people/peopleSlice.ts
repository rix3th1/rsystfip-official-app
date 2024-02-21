import type { IPeopleBase } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface People extends IPeopleBase {
  visit_subject: string;
}

interface PeopleState {
  people: Array<People>;
}

const initialState: PeopleState = {
  people: [],
};

const peopleSlice = createSlice({
  name: "people",
  initialState,
  reducers: {
    setPeople(state, { payload }: PayloadAction<Array<People>>): PeopleState {
      return { ...state, people: payload };
    },
  },
});

export const { setPeople } = peopleSlice.actions;

export default peopleSlice.reducer;
