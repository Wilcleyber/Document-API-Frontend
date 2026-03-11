import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
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
    console.log("Entrando na pasta ID:", item.id);
    setCurrentFolderId(item.id);
    setPathNames((prev) => [...prev, item.name]);
    setSelectedFile(null); // limpa seleção ao entrar em nova pasta
  };

  const navigateBreadcrumb = (index: number) => {
    if (index === 0) {
      setCurrentFolderId("root");
      setPathNames(["Home"]);
      setSelectedFile(null);
    } else {
      console.warn("Navegação profunda via breadcrumb precisa de mapeamento de IDs.");
    }
  };

  return (
    <div className="explorer-container" style={{ padding: "20px" }}>
      <Breadcrumb path={pathNames} onNavigate={navigateBreadcrumb} />

      <ul style={{ listStyle: "none", padding: 0, marginTop: "20px" }}>
        {items.map((item) => (
          <li key={item.id} className="explorer-item">
            <div
              onClick={() =>
                item.type === "folder"
                  ? enterFolder(item)
                  : setSelectedFile(item.id)
              }
              className={`item-row ${item.type} ${
                selectedFile === item.id ? "selected" : ""
              }`}
            >
              <span className="icon">{item.type === "folder" ? "📁" : "📄"}</span>
              <span className="name">{item.name}</span>
              <span className="item-details">
                {item.type === "folder" ? "--" : "Arquivo"}
              </span>
            </div>
          </li>
        ))}
      </ul>

      {items.length === 0 && (
        <p style={{ color: "#999", textAlign: "center", marginTop: "40px" }}>
          Esta pasta está vazia.
        </p>
      )}
    </div>
  );
};

export default FileExplorer;

