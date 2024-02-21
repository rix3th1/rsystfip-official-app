import type { IUserBase } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface TempState {
  tempDataForChangePsw: IUserBase;
}

const initialState: TempState = {
  tempDataForChangePsw: {
    id: "",
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
