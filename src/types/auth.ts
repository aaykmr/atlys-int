export interface User {
  id: string;
  email?: string;
  username?: string;
  password: string;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
}

export interface LoginFormData {
  identifier: string; // email or username
  password: string;
}

export interface SignupFormData {
  identifier: string; // email or username
  password: string;
  repeatPassword: string;
}
