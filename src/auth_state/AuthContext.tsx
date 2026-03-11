import { createContext } from "react";

// No Frontend, tratamos IDs (mesmo UUIDs) como strings
export interface AuthState {
  isAuthenticated: boolean;
  token: string | null; // Adicionamos o token aqui para as rotas privadas usarem
  userid: string | null;
  role: "ADMIN" | "USER" | null;
}

export interface AuthContextType extends AuthState {
  login: (token: string, userid: string, role: "ADMIN" | "USER") => void;
  logout: () => void;
  restoreSession: () => void;
}

// O contexto começa como indefinido até o Provider carregar
export const AuthContext = createContext<AuthContextType | undefined>(undefined);
