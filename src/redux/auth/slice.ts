import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import {
  loginThunk,
  logoutThunk,
  refreshThunk,
  registerThunk,
  getBalanceThunk,
} from "./operations";
import { addTransactionsThunk } from "../transactions/operations";
import { UserState } from "../../types/types";

const initialState: UserState = {
  user: {
    id: "",
    username: null,
    email: null,
    balance: null,
  },
  token: null,
  isLoggedIn: false,
  isRefresh: false,
  isError: false,
};

const slice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(
        registerThunk.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        loginThunk.fulfilled,
        (state, action: PayloadAction<{ user: User; token: string }>) => {
          state.user = action.payload.user;
          state.token = action.payload.token;
          state.isLoggedIn = true;
        }
      )
      .addCase(
        getBalanceThunk.fulfilled,
        (state, action: PayloadAction<number>) => {
          state.user.balance = action.payload;
        }
      )
      .addCase(
        addTransactionsThunk.fulfilled,
        (state, action: PayloadAction<{ balanceAfter: number }>) => {
          state.user.balance = action.payload.balanceAfter;
        }
      )
      .addCase(refreshThunk.fulfilled, (state, action: PayloadAction<User>) => {
        state.user = action.payload;
        state.isLoggedIn = true;
        state.isRefresh = false;
      })
      .addCase(refreshThunk.rejected, (state) => {
        state.isRefresh = false;
      })
      .addCase(refreshThunk.pending, (state) => {
        state.isRefresh = true;
      })
      .addCase(logoutThunk.fulfilled, () => {
        return initialState;
      });
  },
});

export const authReducer = slice.reducer;
