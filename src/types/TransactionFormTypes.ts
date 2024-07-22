export type TransactionType = {
  id?: string;
  transactionDate: Date;
  type: "EXPENSE" | "INCOME";
  comment: string;
  amount: number;
  balanceAfter?: number;
  categoryId: string;
  userId?: string;
  category: string;
  sum: number;
};
export type Transaction = TransactionType;
export type Category = {
  id: string;
  name: string;
  type: "EXPENSE" | "INCOME";
};

export type SelectOptionType = {
  value: string;
  label: string;
};

export type onSubmitValuesProps = {
  type: "EXPENSE" | "INCOME";
  categoryId: SelectOptionType;
  incomeExpense?: boolean;
  sum: number;
  datepicker: Date;
  comment: string;
};

export type onSubmitEditTransacrion = {
  id?: string;
  data: TransactionType;
};
