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
export interface MonoState {
  mono: object | string;
  data_mono: number | null;
}

export interface Transaction {
  id?: string;
  transactionDate: string | Date;
  type: "INCOME" | "EXPENSE";
  comment: string;
  amount: number;
  balanceAfter?: number;
  categoryId: string;
  userId?: string;
}
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
