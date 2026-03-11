import React from "react";
import Header from "./Header";

// Layout base da aplicação
// - Header sempre no topo
// - Área principal para conteúdo
// - Footer opcional
const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div style={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      {/* Barra superior */}
      <Header />

      {/* Área principal */}
      <main style={{ flex: 1, padding: "20px" }}>{children}</main>

      {/* Footer opcional */}
      <footer
        style={{
          textAlign: "center",
          padding: "10px",
          backgroundColor: "#f1f1f1",
        }}
      >
        <small>© 2026 Document API</small>
      </footer>
    </div>
  );
};

export default Layout;
