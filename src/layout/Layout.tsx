import React from "react";
import Header from "./Header";
import "./Layout.css";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="app-wrapper">
      <Header />
      <main className="main-content">
        <div className="content-container">
          {children}
        </div>
      </main>
      <footer className="main-footer">
        <p>© 2026 Document API • <span className="status-dot"></span> Sistema Ativo</p>
      </footer>
    </div>
  );
};

export default Layout;
