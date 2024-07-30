import { User } from "../../types/types";
import { RootState } from "../store";

export const selectUser = (state: RootState): User => state.auth.user;
export const selectIsLoggedIn = (state: RootState) => state.auth.isLoggedIn;
export const selectIsRefresh = (state: RootState): boolean | undefined =>
  state.auth.isRefresh;
export const selectIsLoading = (state: RootState) => state.auth.isLoading;
export const selectUserBalance = (state: RootState) => state.auth.user.balance;
