import { StateType } from "../redux/transactions/slice";

export interface PropChildren {
  children: React.ReactNode;
}

export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

export interface BalanceResponse {
  balance: number;
}

export interface TransactionResponse {
  balanceAfter: number;
}

export interface CurrencyRate {
  currencyCodeA: number;
  currencyCodeB: number;
  date: number;
  rateBuy: number;
  rateSell: number;
}

export interface MonoState {
  mono: CurrencyRate[];
  data_mono: number | null;
  isLoading: boolean;
  isError: boolean;
}

export interface SelectState {
  auth: UserState;
  mono: MonoState;
}
export interface User {
  id: string;
  username: string | null;
  email: string | null;
  balance: number | null;
}

export interface UserState {
  user: User;
  token: string | null;
  isLoggedIn: boolean;
  isRefresh: boolean;
  isError: boolean;
  isLoading: boolean;
}
