export type AuthState = {
  accessToken: string;
};

export type AuthContextData = {
  auth: AuthState;
  setAuth: React.Dispatch<React.SetStateAction<AuthState>>;
};
