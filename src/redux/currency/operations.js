import { createAsyncThunk } from "@reduxjs/toolkit";
import { monoApi } from "../../config/monoApi";

export const monoThunk = createAsyncThunk("mono", async (_, thunkApi) => {
  try {
    const { data } = await monoApi.get();
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
