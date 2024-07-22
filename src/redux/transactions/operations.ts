import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { AxiosError } from "axios";
import { guardApi } from "../../config/guardApi";
import { getBalanceThunk } from "../auth/operations";
import {
  onSubmitEditTransacrion,
  TransactionType,
} from "../../types/TransactionFormTypes";

export const getTransactionsThunk = createAsyncThunk(
  "getTransaction",
  async (_, thunkApi) => {
    try {
      const { data } = await guardApi.get("/api/transactions");
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTransactionsThunk = createAsyncThunk(
  "addTransaction",
  async (transaction: TransactionType, thunkApi) => {
    try {
      const { data } = await guardApi.post("/api/transactions", transaction);
      thunkApi.dispatch(getBalanceThunk());
      toast.success(`Transaction: "${data.comment}" is added`);
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updateTransactionsThunk = createAsyncThunk(
  "currentTransaction",
  async (transaction: onSubmitEditTransacrion, thunkApi) => {
    try {
      const { data } = await guardApi.patch(
        `/api/transactions/${transaction.id}`,
        transaction.data
      );
      toast.success(`Transaction: "${data.comment}" is edited`);
      return data;
    } catch (error: any) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionsThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("deleteTransaction", async (id, thunkApi) => {
  try {
    const { data } = await guardApi.delete<{ id: string }>(
      `/api/transactions/${id}`
    );
    thunkApi.dispatch(getBalanceThunk());
    toast.success(`Transaction is deleted`);
    return data.id;
  } catch (error) {
    const err = error as AxiosError;
    toast.error(err.message);
    return thunkApi.rejectWithValue(err.message);
  }
});

export const fetchPeriodThunk = createAsyncThunk(
  "transactions/fetchPeriod",
  async ({ year, month }, thunkAPI) => {
    try {
      const { data } = await guardApi.get(
        `/api/transactions-summary?year=${year}&month=${month}`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
export const fetchYearThunk = createAsyncThunk(
  "transactions/fetchYear",
  async ({ year }, thunkAPI) => {
    try {
      const { data } = await guardApi.get(
        `/api/transactions-summary?year=${year}`
      );
      return data;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
