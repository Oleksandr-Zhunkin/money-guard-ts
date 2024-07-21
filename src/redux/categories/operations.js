import { createAsyncThunk } from "@reduxjs/toolkit";
import { guardApi } from "../../config/guardApi";

export const categoriesThunk = createAsyncThunk(
  "categories",
  async (_, thunkApi) => {
    try {
      const { data } = await guardApi.get("/api/transaction-categories");
      return data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const summaryThunk = createAsyncThunk("summary", async (_, thunkApi) => {
  try {
    const { data } = await guardApi.get("/api/transactions-summary");
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
