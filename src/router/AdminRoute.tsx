import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../auth_state/useAuth";

interface Props {
  children: React.ReactNode;
}

const AdminRoute: React.FC<Props> = ({ children }) => {
  const { token, role } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  if (role !== "ADMIN") {
    return <Navigate to="/explorer" replace />;
  }

  return <>{children}</>;
};

export default AdminRoute;
