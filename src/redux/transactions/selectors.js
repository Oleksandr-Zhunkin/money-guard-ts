export const selectTransactions = (state) => state.transactions.transactions;
export const selectIsLoading = (state) => state.transactions.isLoading;
export const selectIsError = (state) => state.transactions.isError;
export const selectPeriodTransaction = (state) =>
  state.transactions.periodTransaction;
