import { createSlice } from "@reduxjs/toolkit";
import { categoriesThunk, summaryThunk } from "./operations";

const initialState = {
  categories: [],
  summary: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  extraReducers: (builder) => {
    builder
      .addCase(categoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload;
      })
      .addCase(summaryThunk.fulfilled, (state, action) => {
        state.summary = action.payload;
      });
  },
});
export const categoriesReducer = slice.reducer;
