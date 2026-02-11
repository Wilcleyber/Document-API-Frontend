import { Navigate } from "react-router-dom";

export function ProtectedRoute({ children, allowedRole }) {
  const userRole = localStorage.getItem("userRole");

  // Se não for o papel permitido, manda de volta para o Dashboard
  if (userRole !== allowedRole) {
    return <Navigate to="/dashboard" replace />;
  }

  return children;
}