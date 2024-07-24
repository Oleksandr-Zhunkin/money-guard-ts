
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { monoThunk } from "./operations";
import { MonoState, CurrencyRate } from "../../types/types";


const initialState: MonoState = {
  mono: [],
  data_mono: null,
  isLoading: false,
  isError: false,
};

const slice = createSlice({
  name: "mono",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(monoThunk.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
      })
      .addCase(
        monoThunk.fulfilled,
        (state, action: PayloadAction<CurrencyRate[]>) => {
          state.mono = action.payload;
          state.data_mono = Date.now();
          state.isLoading = false;
          state.isError = false;
        }
      )
      .addCase(monoThunk.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
      });
  },
});

export const monoReducer = slice.reducer;
