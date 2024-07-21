import { UserCredentials, UserState } from "./../../types/types";
import { createAsyncThunk } from "@reduxjs/toolkit";
import toast from "react-hot-toast";

import {
  clearAuthHeader,
  guardApi,
  setAuthHeader,
} from "../../config/guardApi";

import { AxiosError } from "axios";

export const registerThunk = createAsyncThunk(
  "register",
  async (credentials: UserCredentials, thunkApi) => {
    try {
      const { data } = await guardApi.post("/api/auth/sign-up", credentials);
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message);
      }
      toast.error("Such a user exists");
    }
  }
);

export const loginThunk = createAsyncThunk(
  "login",
  async (credentials: Omit<UserCredentials, "username">, thunkApi) => {
    try {
      const { data } = await guardApi.post<UserState>(
        "/api/auth/sign-in",
        credentials
      );
      setAuthHeader(data.token);
      return data;
    } catch (error) {
      if (error instanceof AxiosError) {
        return thunkApi.rejectWithValue(error.message);
      } else {
        toast.error("Not a valid request");
      }
    }
  }
);

export const logoutThunk = createAsyncThunk("logout", async (_, thunkApi) => {
  const { token }: UserState = thunkApi.getState();
  if (!token) {
    return thunkApi.rejectWithValue("Not found token");
  }
  try {
    setAuthHeader(token);
    await guardApi.delete("/api/auth/sign-out");
    clearAuthHeader();
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});

export const refreshThunk = createAsyncThunk("refresh", async (_, thunkApi) => {
  const { auth } = thunkApi.getState();
  if (!auth.token) {
    return thunkApi.rejectWithValue("Not found token");
  }
  try {
    setAuthHeader(auth.token);
    const { data } = await guardApi.get("/api/users/current");
    return data;
  } catch (error) {
    return thunkApi.rejectWithValue(error.message);
  }
});
export const getBalanceThunk = createAsyncThunk(
  "auth/getBalance",
  async (_, thunkAPI) => {
    try {
      const { data } = await guardApi.get("/api/users/current");
      return data.balance;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);
