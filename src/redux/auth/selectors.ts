import { SelectState } from "../../types/types";

export const selectUser = (state: SelectState) => state.auth.user;
export const selectIsLoggedIn = (state: SelectState) => state.auth.isLoggedIn;
export const selectIsRefresh = (state: SelectState) => state.auth.isRefresh;
export const selectIsLoading = (state: SelectState) => state.auth.isLoading;
export const selectUserBalance = (state: SelectState) =>
  state.auth.user?.balance ?? 0;
