import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth_state/useAuth";

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { isAuthenticated } = useAuth();
  
  // Pegamos o token direto do localStorage para um "double check"
  const token = localStorage.getItem("access_token");

  // Se não estiver autenticado no estado E não tiver token no storage... Tchau!
  if (!isAuthenticated && !token) {
    return <Navigate to="/login" replace />;
  }

  return <>{children}</>;
};

export default PrivateRoute;