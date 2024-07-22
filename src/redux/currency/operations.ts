import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoApi";
import { CurrencyRate } from "../../types/types";
import axios from "axios";
export const fetchCurrencyRatesThunk = createAsyncThunk<
  CurrencyRate[],
  void,
  { rejectValue: string }
>("currency/fetchRates", async (_, thunkApi) => {
  try {
    const { data } = await monoApi.get<CurrencyRate[]>();
    return data;
  } catch (error: any) {
    return thunkApi.rejectWithValue(error.message);
  }
});
