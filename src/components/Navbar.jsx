import { useNavigate, Link, useLocation } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const userName = localStorage.getItem("userName");
  const role = localStorage.getItem("userRole");

  const handleLogout = () => {
    // Em ADS, logout em JWT é simples: destruímos a prova local
    localStorage.clear(); 
    navigate("/login");
  };

  // Não mostrar Navbar na página de login
  if (location.pathname === "/login") return null;

  return (
    <nav className="main-navbar">
      <div className="nav-logo">
        <Link to="/dashboard">📂 DocManager <span>API</span></Link>
      </div>

      <div className="nav-links">
        <Link to="/dashboard" className={location.pathname === "/dashboard" ? "active" : ""}>
          Dashboard
        </Link>
        
        {/* Link dinâmico: Se for Admin, ganha o atalho do Painel */}
        {role === "admin" && (
          <Link to="/admin" className={location.pathname === "/admin" ? "active" : ""}>
            Painel Admin
          </Link>
        )}
      </div>

      <div className="nav-user-info">
        <div className="user-badge">
          <span className="user-name">{userName}</span>
          <span className="user-role">{role}</span>
        </div>
        <button onClick={handleLogout} className="btn-logout">Sair</button>
      </div>
    </nav>
  );
}