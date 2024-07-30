import { createSlice } from "@reduxjs/toolkit";
import { monoThunk } from "./operations";
import { MonoState } from "../../types/types";

const initialState: MonoState = {
  mono: [],
  data_mono: null,
};
const slice = createSlice({
  name: "mono",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(monoThunk.fulfilled, (state, action) => {
      state.mono = action.payload;
      state.data_mono = Date.now();
    });
  },
});
export const monoReducer = slice.reducer;
