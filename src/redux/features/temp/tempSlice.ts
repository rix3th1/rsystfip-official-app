import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { IUserBase } from "@/interfaces";

export interface TempState {
  tempDataForChangePsw: IUserBase;
}

const initialState: TempState = {
  tempDataForChangePsw: {
    id: 0,
    email: "",
  },
};

const tempSlice = createSlice({
  name: "temp",
  initialState,
  reducers: {
    setTempDataForChangePsw(
      state,
      { payload }: PayloadAction<IUserBase>
    ): TempState {
      return { ...state, tempDataForChangePsw: payload };
    },
    destroyTemporals(): TempState {
      return initialState;
    },
  },
});

export const { setTempDataForChangePsw, destroyTemporals } = tempSlice.actions;

export default tempSlice.reducer;
