import React, { useState, useEffect } from "react";
import { AuthContext, AuthState } from "./AuthContext";
import { TOKEN_KEY } from "../app/config";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const AuthProvider: React.FC<Props> = ({ children }) => {
  const [authState, setAuthState] = useState<AuthState>({
    isAuthenticated: false,
    token: null,
    userid: null,
    role: null,
  });

  const navigate = useNavigate();

  // Corrigido: tipos TypeScript puros e nomes consistentes
  const login = (token: string, userid: string, role: "ADMIN" | "USER") => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("user_id", userid);
    localStorage.setItem("user_role", role);

    setAuthState({
      isAuthenticated: true,
      token,
      userid,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");

    setAuthState({
      isAuthenticated: false,
      token: null,
      userid: null,
      role: null,
    });

    navigate("/login");
  };

  const restoreSession = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userid = localStorage.getItem("user_id");
    const role = localStorage.getItem("user_role") as "ADMIN" | "USER" | null;

    if (token && userid && role) {
      setAuthState({
        isAuthenticated: true,
        token,
        userid,
        role,
      });
    }
    // Removi o logout automático aqui para evitar redirecionamentos infinitos no boot
  };

  useEffect(() => {
    restoreSession();
  }, []);

  return (
    <AuthContext.Provider value={{ ...authState, login, logout, restoreSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
