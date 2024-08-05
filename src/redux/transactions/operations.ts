import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";
import { guardApi } from "../../config/guardApi";
import { getBalanceThunk } from "../auth/operations";
import { AxiosError } from "axios";
import {
  EditTransaction,
  PeriodDate,
  StatisticsTableProps,
  Transaction,
} from "../../types/types";

export const getTransactionsThunk = createAsyncThunk<
  Transaction[],
  void,
  { rejectValue: string }
>("getTransaction", async (_, thunkApi) => {
  try {
    const { data } = await guardApi.get("/api/transactions");
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    toast.error("Failed request");
    return thunkApi.rejectWithValue("Failed request");
  }
});

export const addTransactionsThunk = createAsyncThunk<
  Transaction,
  Transaction,
  { rejectValue: string }
>("addTransaction", async (transaction, thunkApi) => {
  try {
    const { data } = await guardApi.post("/api/transactions", transaction);
    thunkApi.dispatch(getBalanceThunk());

    toast.success(`Transaction: "${data.comment}" is added`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    toast.error("Incorrect data");
    return thunkApi.rejectWithValue("Incorrect data");
  }
});

export const updateTransactionsThunk = createAsyncThunk<
  Transaction,
  EditTransaction,
  { rejectValue: string }
>("currentTransaction", async (transaction, thunkApi) => {
  try {
    const { data } = await guardApi.patch(
      `/api/transactions/${transaction.id}`,
      transaction.data
    );
    toast.success(`Transaction: "${data.comment}" is edited`);
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    toast.error("Incorrect data");
    return thunkApi.rejectWithValue("Incorrect data");
  }
});

export const deleteTransactionsThunk = createAsyncThunk<
  string,
  string,
  { rejectValue: string }
>("transactions/delete", async (id, thunkApi) => {
  try {
    const { data } = await guardApi.delete(`/api/transactions/${id}`);

    thunkApi.dispatch(getBalanceThunk());
    thunkApi.dispatch(getTransactionsThunk());

    toast.success("Transaction is deleted");

    return data.id;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }

    toast.error("Incorrect data");

    return thunkApi.rejectWithValue("Incorrect data");
  }
});
export const fetchPeriodThunk = createAsyncThunk<
  StatisticsTableProps,
  PeriodDate,
  { rejectValue: string }
>("transactions/fetchPeriod", async ({ year, month }, thunkApi) => {
  try {
    const { data } = await guardApi.get(
      `/api/transactions-summary?year=${year}&month=${month}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Failed request");
  }
});

export const fetchYearThunk = createAsyncThunk<
  StatisticsTableProps,
  PeriodDate,
  { rejectValue: string }
>("transactions/fetchYear", async ({ year }, thunkApi) => {
  try {
    const { data } = await guardApi.get(
      `/api/transactions-summary?year=${year}`
    );
    return data;
  } catch (error) {
    if (error instanceof AxiosError) {
      return thunkApi.rejectWithValue(error.message);
    }
    return thunkApi.rejectWithValue("Failed request");
  }
});
