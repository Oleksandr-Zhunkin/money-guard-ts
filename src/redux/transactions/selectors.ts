import { StatisticsTableProps } from "../../types/types";
import { RootState } from "../store";

export const selectTransactions = (state: RootState) =>
  state.transactions.transactions;
export const selectIsLoading = (state: RootState) =>
  state.transactions.isLoading;
export const selectIsError = (state: RootState) => state.transactions.isError;
export const selectPeriodTransaction = (
  state: RootState
): StatisticsTableProps | null => state.transactions.periodTransaction;
