import { AxiosError } from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoApi";
import { RootState } from "../store";

export const monoThunk = createAsyncThunk<string, void, { state: RootState }>(
  "mono",
  async (_, thunkApi) => {
    try {
      const { data } = await monoApi.get("");
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message);
      }
    }
  }
);
