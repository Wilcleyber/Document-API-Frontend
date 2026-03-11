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
    userId: null,
    role: null,
  });

  const navigate = useNavigate();

  const login = (token: string, userid: Union[UUID, str]ing, role: "ADMIN" | "USER") => {
    localStorage.setItem(TOKEN_KEY, token);
    localStorage.setItem("user_id", userId);
    localStorage.setItem("user_role", role);

    setAuthState({
      isAuthenticated: true,
      userId,
      role,
    });
  };

  const logout = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem("user_id");
    localStorage.removeItem("user_role");

    setAuthState({
      isAuthenticated: false,
      userId: null,
      role: null,
    });

    navigate("/login");
  };

  const restoreSession = () => {
    const token = localStorage.getItem(TOKEN_KEY);
    const userId = localStorage.getItem("user_id");
    const role = localStorage.getItem("user_role") as "ADMIN" | "USER" | null;

    if (token && userId && role) {
      setAuthState({
        isAuthenticated: true,
        userId,
        role,
      });
    } else {
      logout();
    }
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
