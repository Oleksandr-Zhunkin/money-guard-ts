import { createSlice } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  getBalanceThunk,
} from "./operations";
import { addTransactionsThunk } from "../transactions/operations";
import { UserState } from "../../types/types";

// Define the initial state
const initialState: UserState = {
  user: {
    username: null,
    email: null,
    balance: null,
  },
  token: "",
  balance: null,
  isLoggedIn: false,
  isLoading: false,
  isRefresh: false,
  isError: false,
};

// Create the slice
const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(registerThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = false;
      })
      .addCase(loginThunk.fulfilled, (state, action) => {
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.isLoggedIn = true;
        state.isError = false;
      })
      .addCase(getBalanceThunk.fulfilled, (state, action) => {
        state.user.balance = action.payload ?? null; // Default to null if undefined
      })
      .addCase(addTransactionsThunk.fulfilled, (state, action) => {
        state.user.balance = action.payload.balanceAfter ?? null; // Default to null if undefined
      })
      .addCase(refreshThunk.fulfilled, (state, action) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefresh = false;
        state.isLoading = false;
        state.isError = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isLoading = false;
        state.isRefresh = false;
        state.isError = true;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isLoading = true;
        state.isRefresh = true;
        state.isError = false;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = slice.reducer;
