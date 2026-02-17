import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataService } from "../services/dataService";
import { folderService } from "../services/folderService";
import { FolderActions } from "../components/FolderActions"; // Certifique-se de importar

export function Dashboard() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [systemStatus, setSystemStatus] = useState("checking...");
  const [authError, setAuthError] = useState(null);
  const [userName] = useState(localStorage.getItem("userName"));
  const [role] = useState(localStorage.getItem("userRole"));
  const token = localStorage.getItem("userToken");

  // Verifica autenticação e carrega dados
  useEffect(() => {
    if (!token) {
      setAuthError("Você precisa fazer login para acessar essa página.");
      navigate("/login", { replace: true });
      return;
    }
    loadDashboardData();
  }, [token, navigate]);

  const loadDashboardData = async () => {
    try {
      const folderData = await dataService.getFolders();

      // Normaliza possíveis formatos: array direto ou { folders: [...] }
      const foldersArray = Array.isArray(folderData)
        ? folderData
        : (folderData && Array.isArray(folderData.folders) ? folderData.folders : null);

      if (foldersArray !== null) {
        setFolders(foldersArray);
      } else if (folderData?.statusCode === 401) {
        setAuthError("Sua sessão expirou. Faça login novamente.");
        localStorage.removeItem("userToken");
        localStorage.removeItem("userRole");
        localStorage.removeItem("userName");
        navigate("/login", { replace: true });
        return;
      } else {
        console.error("Resposta inválida de folders:", folderData);
        setFolders([]);
      }

      const health = await dataService.getHealth();
      setSystemStatus(health?.status === "ok" ? "Operacional ✅" : "Instável ⚠️");
    } catch (err) {
      console.error("Erro ao carregar dashboard:", err);
      setSystemStatus("Offline ❌");
      setFolders([]);
    }
  };

  const handleReset = async () => {
    if (window.confirm("Isso restaurará todos os dados padrão. Continuar?")) {
      await dataService.resetSystem();
      loadDashboardData(); // Recarrega as pastas após o reset
    }
  };

  const handleDelete = async (name) => {
    if (window.confirm(`Tem certeza que deseja excluir a pasta "${name}"?`)) {
      const result = await folderService.deleteFolder(name);
      if (result.message.includes("sucesso")) {
        loadDashboardData(); // Recarrega a lista
      } else {
        alert(result.message); // Exibe erro se for pasta padrão
      }
    }
  };

  // Se houver erro de autenticação, mostrar mensagem
  if (authError) {
    return (
      <div className="dashboard" style={{ textAlign: "center", padding: "2rem" }}>
        <h2>❌ Erro de Autenticação</h2>
        <p>{authError}</p>
        <button onClick={() => navigate("/login", { replace: true })}>Voltar para Login</button>
      </div>
    );
  }

  return (
    <div className="dashboard">
      <header>
        <h1>Olá, {userName || "Usuário"}!</h1>
        <p>Status do Sistema: <strong>{systemStatus}</strong></p>
      </header>
      {/* ADIÇÃO AQUI: Só mostra a barra de criação se for admin */}
      {role === "admin" && (
        <FolderActions onFolderCreated={loadDashboardData} />
      )}

      <section className="folder-grid">
        {Array.isArray(folders) && folders.length > 0 ? (
          folders.map((folder) => (
          <div key={folder.name} className="folder-card-wrapper">
            <div className="folder-card" onClick={() => navigate(`/folder/${folder.name}`)}>
              <h3>{folder.name}</h3>
              <p>{folder.files.length} arquivos</p>
            </div>
            
            {/* Botão de excluir só para Admin */}
            {role === "admin" && (
              <button 
                className="btn-delete-small" 
                onClick={() => handleDelete(folder.name)}
              >
                🗑️
              </button>
            )}
          </div>
        ))
        ) : (
          <p style={{ gridColumn: "1 / -1", textAlign: "center" }}>
            {Array.isArray(folders) ? "Nenhuma pasta encontrada." : "Erro ao carregar pastas."}
          </p>
        )}
      </section>

      {/* LÓGICA DE OURO: Só aparece se for admin */}
      {role === "admin" && (
        <footer className="admin-actions">
          <button onClick={handleReset} className="btn-reset">
            Resetar Sistema (Modo Demo)
          </button>
        </footer>
      )}
    </div>
  );
}