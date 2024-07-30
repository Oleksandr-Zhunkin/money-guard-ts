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
