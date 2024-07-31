export interface PropChildren {
  children: React.ReactNode;
}

export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}
export interface User {
  id?: string | null;
  username: string | null;
  email: string | null;
  balance: number | null;
}

export interface UserState {
  user: User;
  token: string | null;
  balance?: number | null;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  isRefresh?: boolean;
  isError?: boolean;
}


export type Transaction = {
  id?: string;
  transactionDate: Date;  // Consistent use of Date type
  type: "EXPENSE" | "INCOME";
  comment: string;
  amount: number;
  balanceAfter?: number;
  categoryId: string;
  userId?: string;
};

export interface EditTransaction {
  id: string;
  data: {
    transactionDate: string;
    type: "INCOME" | "EXPENSE";
    categoryId: string;
    comment: string;
    amount: number;
  };
}
export interface TransactionsState {
  transactions: Transaction[];
  periodTransaction: null | Transaction[];
  isError: boolean | string;
  isLoading: boolean;
}
export interface PeriodDate {
  year: string | number;
  month?: string;
}

interface Category {
  name: string;
  total: number;
  type: "EXPENSE" | "INCOME";
}

export interface StatisticsTableProps {
  category?: {
    categoriesSummary: Category[];
    expenseSummary: number;
    incomeSummary: number;
  };
}
// types.ts
export interface CurrencyData {
  rateBuy: number;
  rateSell: number;
}

export interface MonoState {
  mono: CurrencyData[]; // Ensure this matches the expected type
  data_mono: number | null;
}
