import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { ICategory, IDocument, IResourceFacultie } from "@/interfaces";

interface ResourcesState {
  categories: Array<ICategory>;
  documents: Array<IDocument>;
  faculties: Array<IResourceFacultie>;
}

const initialState: ResourcesState = {
  categories: [],
  documents: [],
  faculties: [],
};

const resourcesSlice = createSlice({
  name: "resources",
  initialState,
  reducers: {
    setCategories(
      state,
      { payload }: PayloadAction<Array<ICategory>>
    ): ResourcesState {
      return { ...state, categories: payload };
    },
    setDocuments(
      state,
      { payload }: PayloadAction<Array<IDocument>>
    ): ResourcesState {
      return { ...state, documents: payload };
    },
    setFaculties(
      state,
      { payload }: PayloadAction<Array<IResourceFacultie>>
    ): ResourcesState {
      return { ...state, faculties: payload };
    },
  },
});

export const { setCategories, setDocuments, setFaculties } =
  resourcesSlice.actions;

export default resourcesSlice.reducer;
