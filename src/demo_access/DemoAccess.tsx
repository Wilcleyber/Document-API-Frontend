import React from "react";
import { login } from "../auth_api"; // usa fluxo normal de login
import { useAuth } from "../auth_state/useAuth";

// Credenciais pré-definidas
const DEMO_ADMIN = { username: "admin_demo", password: "admin123" };
const DEMO_USER = { username: "user_demo", password: "user123" };

const DemoAccess: React.FC = () => {
  const { login: setSession } = useAuth();

  // Login como Admin Demo
  const handleAdminDemo = async () => {
    try {
      const data = await login(DEMO_ADMIN);
      setSession(data.token, data.userId, data.role);
    } catch {
      alert("Erro ao entrar como Admin Demo");
    }
  };

  // Login como User Demo
  const handleUserDemo = async () => {
    try {
      const data = await login(DEMO_USER);
      setSession(data.token, data.userId, data.role);
    } catch {
      alert("Erro ao entrar como User Demo");
    }
  };

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Acesso Demo</h3>
      <button onClick={handleAdminDemo}>Entrar como Admin Demo</button>
      <button onClick={handleUserDemo} style={{ marginLeft: "10px" }}>
        Entrar como User Demo
      </button>
    </div>
  );
};

export default DemoAccess;
