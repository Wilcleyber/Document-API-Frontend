import React from "react";
import FileExplorer from "../file_explorer/FileExplorer";
import AdminActions from "../admin_actions/AdminActions";

// Página Explorer
const ExplorerPage: React.FC = () => {
  // Refresh simples para atualizar Explorer após ação admin
  const refreshExplorer = () => window.location.reload();

  return (
    <div>
      <h2>Explorer</h2>
      <FileExplorer />
      <AdminActions onRefresh={refreshExplorer} />
    </div>
  );
};

export default ExplorerPage;
