import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { FolderDetail } from "./pages/FolderDetail";
import { AdminPanel } from "./pages/AdminPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Verifica se há token salvo ao carregar o app
  useEffect(() => {
    const token = localStorage.getItem("userToken");
    if (token) {
      setIsAuthenticated(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = () => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("userRole");
    localStorage.removeItem("userName");
    setIsAuthenticated(false);
  };

  if (isLoading) {
    return <div>Carregando...</div>;
  }

  return (
    <BrowserRouter basename="/Document-API-Frontend/">
      {isAuthenticated && <Navbar onLogout={handleLogout} />}
      <main className="container">
        <Routes>
          {/* Login é sempre acessível */}
          <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />

          {/* Rotas protegidas: só se autenticado */}
          <Route 
            path="/dashboard" 
            element={isAuthenticated ? <Dashboard /> : <Navigate to="/login" replace />} 
          />

          <Route 
            path="/folder/:folderName" 
            element={isAuthenticated ? <FolderDetail /> : <Navigate to="/login" replace />} 
          />

          {/* Rota Protegida: Só entra quem é Admin */}
          <Route 
            path="/admin" 
            element={isAuthenticated ? (
              <ProtectedRoute allowedRole="admin">
                <AdminPanel />
              </ProtectedRoute>
            ) : <Navigate to="/login" replace />} 
          />

          {/* Redirecionamento padrão: vai para login se não autenticado */}
          <Route path="*" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}