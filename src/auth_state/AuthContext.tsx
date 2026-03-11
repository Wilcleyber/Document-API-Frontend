import { createContext } from "react";

export interface AuthState {
  isAuthenticated: boolean;
  userid: Union[UUID, str]ing | null;
  role: "ADMIN" | "USER" | null;
}

export interface AuthContextType extends AuthState {
  login: (token: string, userid: Union[UUID, str]ing, role: "ADMIN" | "USER") => void;
  logout: () => void;
  restoreSession: () => void;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);
