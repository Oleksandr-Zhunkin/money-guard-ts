import { RootState } from "../store";

export const selectTransactions = (state: RootState) =>
  state.rootReducer.transactions.transactions;
export const selectIsLoading = (state: RootState) =>
  state.rootReducer.transactions.isLoading;
export const selectIsError = (state: RootState) =>
  state.rootReducer.transactions.isError;
export const selectPeriodTransaction = (state: RootState) =>
  state.rootReducer.transactions.periodTransaction;
