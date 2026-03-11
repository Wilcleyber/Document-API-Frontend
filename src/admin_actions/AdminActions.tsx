import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import { nodes_api } from "../nodes_api"; // Importe padronizado

interface AdminActionsProps {
  onRefresh: () => void;
}

const AdminActions: React.FC<AdminActionsProps> = ({ onRefresh }) => {
  const { role } = useAuth();

  const [targetId, setTargetId] = useState<string>("");
  const [newName, setNewName] = useState<string>("");

  // Criar pasta
  const handleCreateFolder = async () => {
    try {
      // Nota: getChildren costuma precisar de um parentId. 
      // Se for na raiz, passamos "root".
      await nodes_api.createFolder("root", "Nova Pasta");
      onRefresh();
    } catch {
      alert("Erro ao criar pasta");
    }
  };

  // Criar arquivo
  const handleCreateFile = async () => {
    try {
      await nodes_api.createFile("root", "Novo Arquivo.txt");
      onRefresh();
    } catch {
      alert("Erro ao criar arquivo");
    }
  };

  // Renomear item
  const handleRename = async () => {
    if (!targetId || !newName) return;
    try {
      await nodes_api.renameNode(targetId, newName);
      onRefresh();
      setNewName(""); // Limpa o campo após sucesso
    } catch {
      alert("Erro ao renomear item");
    }
  };

  // Excluir item
  const handleDelete = async () => {
    if (!targetId) return;
    const confirm = window.confirm("Tem certeza que deseja excluir?");
    if (confirm) {
      try {
        // Garantindo que deleteNode existe no seu nodes_api/index.ts
        await nodes_api.deleteNode(targetId);
        onRefresh();
        setTargetId(""); // Limpa o campo
      } catch {
        alert("Erro ao excluir item");
      }
    }
  };

  // Só renderiza se usuário for ADMIN
  if (role !== "ADMIN") return null;

  return (
    <div style={{ marginTop: "20px", padding: "15px", border: "1px solid #eee", borderRadius: "8px" }}>
      <h3 style={{ marginTop: 0 }}>Ações de Admin</h3>

      <div style={{ marginBottom: "10px" }}>
        <button onClick={handleCreateFolder}>Criar Pasta na Raiz</button>
        <button onClick={handleCreateFile} style={{ marginLeft: "10px" }}>
          Criar Arquivo na Raiz
        </button>
      </div>

      <div style={{ display: "flex", flexDirection: "column", gap: "10px", maxWidth: "300px" }}>
        <input
          type="text"
          placeholder="ID do item (UUID)"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
          style={inputStyle}
        />
        <input
          type="text"
          placeholder="Novo nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
          style={inputStyle}
        />

        <div style={{ display: "flex", gap: "10px" }}>
          <button onClick={handleRename} style={{ flex: 1 }}>
            Renomear
          </button>
          <button
            onClick={handleDelete}
            style={{ flex: 1, color: "red", border: "1px solid red", background: "none", cursor: "pointer" }}
          >
            Excluir
          </button>
        </div>
      </div>
    </div>
  );
};

const inputStyle = {
  padding: "8px",
  borderRadius: "4px",
  border: "1px solid #ccc"
};

export default AdminActions;
