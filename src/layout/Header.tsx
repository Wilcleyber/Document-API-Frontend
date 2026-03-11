import React from "react";
import { useAuth } from "../auth_state/useAuth";

const Header: React.FC = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header
      style={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "10px",
        backgroundColor: "#282c34",
        color: "white",
      }}
    >
      {/* Nome do app sempre visível */}
      <h2>Document-API</h2>

      {/* Se autenticado → mostra role e botão logout */}
      {isAuthenticated && (
        <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
          {/* Indicador de role */}
          <span>Role: {role}</span>

          {/* Botão logout */}
          <button onClick={logout} style={{ cursor: "pointer" }}>
            Logout
          </button>
        </div>
      )}
    </header>
  );
};

export default Header;
