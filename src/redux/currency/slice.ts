import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { CurrencyData } from "../../types/types";
import { monoThunk } from "./operations";

interface MonoState {
  mono: CurrencyData[];
  data_mono: number | null;
}

const initialState: MonoState = {
  mono: [],
  data_mono: null,
};

const slice = createSlice({
  name: "mono",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(
      monoThunk.fulfilled,
      (state, action: PayloadAction<CurrencyData[]>) => {
        state.mono = action.payload;
        state.data_mono = Date.now();
      }
    );
  },
});

export const monoReducer = slice.reducer;
