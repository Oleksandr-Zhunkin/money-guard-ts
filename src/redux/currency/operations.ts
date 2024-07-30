import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoApi";
import { CurrencyData } from "../../types/types";
import { RootState } from "../store";
import { AxiosError } from "axios";

export const monoThunk = createAsyncThunk<
  CurrencyData[],
  void,
  { state: RootState }
>("mono/fetchCurrency", async (_, thunkApi) => {
  try {
    const { data } = await monoApi.get<CurrencyData[]>("");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("An unknown error occurred");
  }
});
