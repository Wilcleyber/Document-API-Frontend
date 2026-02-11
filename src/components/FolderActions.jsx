import { useState } from "react";
import { folderService } from "../services/folderService";

export function FolderActions({ onFolderCreated }) {
  const [newFolderName, setNewFolderName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async (e) => {
    e.preventDefault();
    if (!newFolderName.trim()) return;

    setLoading(true);
    const result = await folderService.createFolder(newFolderName);
    
    if (result.message.includes("sucesso")) {
      setNewFolderName(""); // Limpa o input
      onFolderCreated(); // Avisa o Dashboard para atualizar a lista
    } else {
      alert(result.message); // Exibe erro de validação do backend
    }
    setLoading(false);
  };

  return (
    <div className="admin-tool-bar">
      <form onSubmit={handleCreate}>
        <input 
          type="text" 
          placeholder="Nome da nova pasta..." 
          value={newFolderName}
          onChange={(e) => setNewFolderName(e.target.value)}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Criando..." : "➕ Criar Pasta"}
        </button>
      </form>
    </div>
  );
}