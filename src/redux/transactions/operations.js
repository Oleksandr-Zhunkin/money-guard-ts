import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import { guardApi } from "../../config/guardApi";
import { getBalanceThunk } from "../auth/operations";

export const getTransactionsThunk = createAsyncThunk(
  "getTransaction",
  async (_, thunkApi) => {
    try {
      const { data } = await guardApi.get("/api/transactions");
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addTransactionsThunk = createAsyncThunk(
  "addTransaction",
  async (transaction, thunkApi) => {
    try {
      const { data } = await guardApi.post("/api/transactions", transaction);
      thunkApi.dispatch(getBalanceThunk());
      toast.success(`Transaction: "${data.comment}" is added`);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);
export const updateTransactionsThunk = createAsyncThunk(
  "currentTransaction",
  async (transaction, thunkApi) => {
    try {
      const { data } = await guardApi.patch(
        `/api/transactions/${transaction.id}`,
        transaction.data
      );
      toast.success(`Transaction: "${data.comment}" is edited`);
      return data;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const deleteTransactionsThunk = createAsyncThunk(
  "deleteTransaction",
  async (id, thunkApi) => {
    try {
      const { data } = await guardApi.delete(`/api/transactions/${id}`);
      thunkApi.dispatch(getBalanceThunk());
      toast.success(`Transaction is deleted`);
      return data.id;
    } catch (error) {
      toast.error(error.message);
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const fetchPeriodThunk = createAsyncThunk(
  "transactions/fetchPeriod",
  async ({ year, month }, thunkAPI) => {
    try {
      const { data } = await guardApi.get(
        `/api/transactions-summary?year=${year}&month=${month}`
      );
      return data;
    } catch (error) {
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
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
