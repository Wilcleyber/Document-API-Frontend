import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ExplorerPage from "../pages/ExplorerPage";
import FilePage from "../pages/FilePage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Router: React.FC = () => {
  return (
    <Routes>
      
      {/* 1. Rota Raiz: Redireciona quem entra no site direto para o login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Rota pública */}
      <Route path="/login" element={<LoginPage />} />

      {/* Rotas privadas */}
      <Route
        path="/explorer"
        element={
          <PrivateRoute>
            <ExplorerPage />
          </PrivateRoute>
        }
      />

      <Route
        path="/file/:id"
        element={
          <PrivateRoute>
            <FilePage />
          </PrivateRoute>
        }
      />

      {/* Exemplo de rota admin-only */}
      <Route
        path="/admin"
        element={
          <AdminRoute>
            <div>Painel Admin</div>
          </AdminRoute>
        }
      />
      {/* 2. Rota de Fuga: Se o usuário digitar qualquer coisa errada, volta pro login */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
};

export default Router;
