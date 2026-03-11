import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import {
  createFolder,
  createFile,
  renameNode,
  deleteNode,
} from "../nodes_api";

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
      await createFolder("Nova Pasta");
      onRefresh();
    } catch {
      alert("Erro ao criar pasta");
    }
  };

  // Criar arquivo
  const handleCreateFile = async () => {
    try {
      await createFile("Novo Arquivo.txt");
      onRefresh();
    } catch {
      alert("Erro ao criar arquivo");
    }
  };

  // Renomear item
  const handleRename = async () => {
    if (!targetId || !newName) return;
    try {
      await renameNode(targetId, newName);
      onRefresh();
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
        await deleteNode(targetId);
        onRefresh();
      } catch {
        alert("Erro ao excluir item");
      }
    }
  };

  // Só renderiza se usuário for ADMIN
  if (role !== "ADMIN") return null;

  return (
    <div style={{ marginTop: "20px" }}>
      <h3>Ações de Admin</h3>

      <button onClick={handleCreateFolder}>Criar Pasta</button>
      <button onClick={handleCreateFile} style={{ marginLeft: "10px" }}>
        Criar Arquivo
      </button>

      <div style={{ marginTop: "15px" }}>
        <input
          type="text"
          placeholder="ID do item"
          value={targetId}
          onChange={(e) => setTargetId(e.target.value)}
        />
        <input
          type="text"
          placeholder="Novo nome"
          value={newName}
          onChange={(e) => setNewName(e.target.value)}
        />

        <button onClick={handleRename} style={{ marginLeft: "10px" }}>
          Renomear
        </button>
        <button
          onClick={handleDelete}
          style={{ marginLeft: "10px", color: "red" }}
        >
          Excluir
        </button>
      </div>
    </div>
  );
};

export default AdminActions;
