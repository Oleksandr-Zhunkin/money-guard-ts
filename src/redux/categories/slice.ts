import { createSlice } from "@reduxjs/toolkit";
import { categoriesThunk, summaryThunk } from "./operations";
import { object } from "prop-types";

export interface ObjectCategory {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
}

interface Summary {
  name: string;
  type: "EXPENSE" | "INCOME";
  total: number;
}

export interface SummaryObject {
  categoriesSummary: Summary[] | null;
  incomeSummary: number;
  expenseSummary: number;
  periodTotal: number;
}

export interface CategoriesState {
  categories: ObjectCategory[];
  summary: SummaryObject | null;
}

const initialState: CategoriesState = {
  categories: [],
  summary: null,
};

const slice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
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
