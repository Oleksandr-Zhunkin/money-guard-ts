import { Transaction } from "./types";

export type SelectOptionType = {
  value: string;
  label: string;
};

export type onSubmitValuesProps = {
  type: "EXPENSE" | "INCOME";
  categoryId: SelectOptionType;
  sum: number;
  datepicker: Date;
  comment: string;
};

export type onSubmitEditTransaction = {
  id?: string;
  data: Transaction;
};
export type TransactionType = {
  id?: string;
  transactionDate: Date;
  type: "EXPENSE" | "INCOME";
  comment: string;
  amount: number;
  balanceAfter?: number;
  categoryId: string;
  userId?: string;
};

export type Category = {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
};
