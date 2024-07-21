import { createAsyncThunk } from "@reduxjs/toolkit";
import { guardApi } from "../../config/guardApi";
import { AxiosError } from "axios";
import toast from "react-hot-toast";

export const categoriesThunk = createAsyncThunk(
  "categories",
  async (_, thunkApi) => {
    try {
      const { data } = await guardApi.get("/api/transaction-categories");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message);
      } else {
        toast("Unexpected error");
      }
    }
  }
);
export const summaryThunk = createAsyncThunk("summary", async (_, thunkApi) => {
  try {
    const { data } = await guardApi.get("/api/transactions-summary");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    } else {
      toast("Unexpected error");
    }
  }
});
