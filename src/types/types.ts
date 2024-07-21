export interface PropChildren {
  children: React.ReactNode;
}

export interface UserCredentials {
  username: string;
  email: string;
  password: string;
}
export interface UserState {
  user: {
    id: string;
    username: string;
    email: string;
    balance: number;
  };
  token: string | null;
  balance?: number;
  isLoggedIn?: boolean;
  isLoading?: boolean;
  isRefresh?: boolean;
  isError?: boolean;
}
