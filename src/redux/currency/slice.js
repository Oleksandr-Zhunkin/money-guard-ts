import { createSlice } from "@reduxjs/toolkit";
import { monoThunk } from "./operations";

const initialState = {
  mono: [],
  data_mono: null,
};
const slice = createSlice({
  name: "mono",
  initialState,
  extraReducers: (builder) => {
    builder.addCase(monoThunk.fulfilled, (state, action) => {
      state.mono = action.payload;
      state.data_mono = Date.now();
    });
  },
});
export const monoReducer = slice.reducer;
