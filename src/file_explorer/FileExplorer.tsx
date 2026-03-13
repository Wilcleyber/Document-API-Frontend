import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import FileEditor from "../file_editor/FileEditor"; // importa o editor
import { nodes_api } from "../nodes_api";
import "./FileExplorer.css";

interface NodeItem {
  id: string;
  name: string;
  type: "folder" | "file";
}

const FileExplorer: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [items, setItems] = useState<NodeItem[]>([]);
  const [pathNames, setPathNames] = useState<string[]>(["Home"]);
  const [selectedFile, setSelectedFile] = useState<string | null>(null);
  const [editingFile, setEditingFile] = useState<{ id: string; name: string } | null>(null);

  useEffect(() => {
    async function fetchChildren() {
      try {
        let data;
        if (currentFolderId === "root") {
          data = await nodes_api.getRoot();
        } else {
          data = await nodes_api.getChildren(currentFolderId);
        }
        setItems(data);
      } catch (error) {
        console.error("Erro ao carregar itens:", error);
        setItems([]);
      }
    }
    fetchChildren();
  }, [currentFolderId]);

  const enterFolder = (item: NodeItem) => {
    setCurrentFolderId(item.id);
    setPathNames((prev) => [...prev, item.name]);
    setSelectedFile(null);
    setEditingFile(null);
  };

  const navigateBreadcrumb = (index: number) => {
    if (index === 0) {
      setCurrentFolderId("root");
      setPathNames(["Home"]);
      setSelectedFile(null);
      setEditingFile(null);
    } else {
      console.warn("Navegação profunda via breadcrumb precisa de mapeamento de IDs.");
    }
  };

  return (
    <div className="explorer-container" style={{ padding: "20px" }}>
      <Breadcrumb path={pathNames} onNavigate={navigateBreadcrumb} />

      {editingFile ? (
        // Se tiver um arquivo sendo editado, mostra o Editor
        <FileEditor
          fileId={editingFile.id}
          fileName={editingFile.name}
          onClose={() => setEditingFile(null)}
        />
      ) : (
        // Se não, mostra a lista de arquivos
        <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
          {items.map((item) => {
            const itemType = item.type.toLowerCase();
            const isFolder = itemType === "folder";
            const isFile = itemType === "file";

            return (
              <li key={item.id} className="explorer-item">
                <div
                  onClick={() => {
                    if (isFolder) {
                      enterFolder(item);
                    } else {
                      setEditingFile({ id: item.id, name: item.name });
                      setSelectedFile(item.id);
                      console.log("Arquivo selecionado para edição:", item.name);
                    }
                  }}
                  className={`item-row ${isFolder ? "folder" : "file"} ${
                    selectedFile === item.id ? "selected" : ""
                  }`}
                >
                  <span className="icon">{isFolder ? "📁" : "📄"}</span>
                  <span className="name">{item.name}</span>
                  <span className="item-details">{isFolder ? "Pasta" : "Arquivo TXT"}</span>
                </div>
              </li>
            );
          })}
        </ul>
      )}

      {!editingFile && items.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", marginTop: "40px" }}>
          Esta pasta está vazia.
        </p>
      )}
    </div>
  );
};

export default FileExplorer;
