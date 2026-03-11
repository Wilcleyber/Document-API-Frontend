import React from "react";
import { useAuth } from "../auth_state/useAuth";
import "./Header.css"; // Vamos criar esse arquivo

const Header: React.FC = () => {
  const { isAuthenticated, role, logout } = useAuth();

  return (
    <header className="main-header">
      <div className="header-content">
        {/* Logo / Nome do App */}
        <div className="logo">
          <span className="logo-icon">📁</span>
          <h2 className="logo-text">Document<span>API</span></h2>
        </div>

        {/* Bloco de autenticação */}
        {isAuthenticated && (
          <div className="user-section">
            <div className="user-badge">
              <span className="role-tag">{role}</span>
            </div>
            <button className="logout-button" onClick={logout}>
              Sair
            </button>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;