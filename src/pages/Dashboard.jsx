import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { dataService } from "../services/dataService";
import { folderService } from "../services/folderService";
import { FolderActions } from "../components/FolderActions"; // Certifique-se de importar

export function Dashboard() {
  const navigate = useNavigate();
  const [folders, setFolders] = useState([]);
  const [systemStatus, setSystemStatus] = useState("checking...");
  const [userName] = useState(localStorage.getItem("userName"));
  const [role] = useState(localStorage.getItem("userRole"));

  // Executa assim que a página carrega
  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      const folderData = await dataService.getFolders();
      setFolders(folderData);

      const health = await dataService.getHealth();
      setSystemStatus(health.status === "ok" ? "Operacional ✅" : "Instável ⚠️");
    } catch (err) {
      setSystemStatus("Offline ❌");
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

  return (
    <div className="dashboard">
      <header>
        <h1>Olá, {userName}!</h1>
        <p>Status do Sistema: <strong>{systemStatus}</strong></p>
      </header>
      {/* ADIÇÃO AQUI: Só mostra a barra de criação se for admin */}
      {role === "admin" && (
        <FolderActions onFolderCreated={loadDashboardData} />
      )}

      <section className="folder-grid">
        {folders.map((folder) => (
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
        ))}
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