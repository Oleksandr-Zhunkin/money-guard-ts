import { StateType } from "./slice";

export const selectTransactions = (state: { transactions: StateType }) =>
  state.transactions.transactions;
export const selectIsLoading = (state: { transactions: StateType }) =>
  state.transactions.isLoading;
export const selectIsError = (state: { transactions: StateType }) =>
  state.transactions.isError;
export const selectPeriodTransaction = (state: { transactions: StateType }) =>
  state.transactions.periodTransaction;
