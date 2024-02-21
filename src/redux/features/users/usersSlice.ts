import type { IUserBase } from "@/interfaces";
import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export interface User extends IUserBase {
  first_name: string;
  last_name: string;
  phone_number: string;
  role_name: string;
}

export interface FormData {
  role_id: string;
  first_name: string;
  last_name: string;
  document_id: string;
  document_number: string;
  email: string;
  phone_number: string;
  password: string;
  password2: string;
}

export interface Temps {
  passwordVisible: boolean;
}

interface AdminState {
  users: Array<User>;
  formData: FormData;
  temps: Temps;
}

const initialState: AdminState = {
  users: [],
  formData: {
    role_id: "",
    first_name: "",
    last_name: "",
    document_id: "",
    document_number: "",
    email: "",
    phone_number: "",
    password: "",
    password2: "",
  },
  temps: {
    passwordVisible: false,
  },
};

const adminSlice = createSlice({
  name: "admin",
  initialState,
  reducers: {
    setUsers(state, { payload }: PayloadAction<Array<User>>): AdminState {
      return { ...state, users: payload };
    },
    setFormData(state, { payload }: PayloadAction<FormData>): AdminState {
      return { ...state, formData: payload };
    },
    setTemps(state, { payload }: PayloadAction<Temps>): AdminState {
      return { ...state, temps: payload };
    },
    resetFormDataAdmin(state) {
      return { ...state, formData: initialState.formData };
    },
  },
});

export const { setUsers, setFormData, setTemps, resetFormDataAdmin } =
  adminSlice.actions;

export default adminSlice.reducer;
