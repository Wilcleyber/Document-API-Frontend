import React from "react";
import { Routes, Route } from "react-router-dom";
import LoginPage from "../pages/LoginPage";
import ExplorerPage from "../pages/ExplorerPage";
import FilePage from "../pages/FilePage";
import PrivateRoute from "./PrivateRoute";
import AdminRoute from "./AdminRoute";

const Router: React.FC = () => {
  return (
    <Routes>
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
    </Routes>
  );
};

export default Router;
