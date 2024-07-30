import { User } from "../../types/types";
import { RootState } from "../store";

export const selectUser = (state: RootState): User =>
  state.rootReducer.auth.user;
export const selectIsLoggedIn = (state: RootState) =>
  state.rootReducer.auth.isLoggedIn;
export const selectIsRefresh = (state: RootState): boolean | undefined =>
  state.rootReducer.auth.isRefresh;
export const selectIsLoading = (state: RootState) =>
  state.rootReducer.auth.isLoading;
export const selectUserBalance = (state: RootState) =>
  state.rootReducer.auth.user.balance;
