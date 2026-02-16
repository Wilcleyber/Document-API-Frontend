import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { Login } from "./pages/Login";
import { Dashboard } from "./pages/Dashboard";
import { FolderDetail } from "./pages/FolderDetail";
import { AdminPanel } from "./pages/AdminPanel";
import { ProtectedRoute } from "./components/ProtectedRoute";

export default function App() {
  return (
    <BrowserRouter basename="/Document-API-Frontend/">
      <Navbar /> {/* A Navbar fica fora das Routes para ser fixa */}
      <main className="container">
        <Routes>
          <Route path="/login" element={<Login />} />
          
          <Route path="/dashboard" element={<Dashboard />} />
          
          <Route path="/folder/:folderName" element={<FolderDetail />} />
          
          {/* Rota Protegida: Só entra quem é Admin */}
          <Route path="/admin" element={
            <ProtectedRoute allowedRole="admin">
              <AdminPanel />
            </ProtectedRoute>
          } />

          {/* Redirecionamento padrão */}
          <Route path="*" element={<Navigate to="/dashboard" />} />
        </Routes>
      </main>
    </BrowserRouter>
  );
}