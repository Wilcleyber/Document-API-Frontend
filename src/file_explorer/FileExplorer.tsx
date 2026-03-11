import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import { nodes_api } from "../nodes_api";

interface NodeItem {
  id: string;
  name: string;
  type: "folder" | "file";
}

const FileExplorer: React.FC = () => {
  // Começamos com "root" que é o ID especial que o seu backend aceita
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [items, setItems] = useState<NodeItem[]>([]);
  const [pathNames, setPathNames] = useState<string[]>(["Home"]);

  useEffect(() => {
    async function fetchChildren() {
      try {
        let data;
        // Se for root, usamos getRoot, se não, usamos getChildren
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
  };

  const navigateBreadcrumb = (index: number) => {
    // Se clicar no primeiro (Home/Raiz)
    if (index === 0) {
      setCurrentFolderId("root");
      setPathNames(["Home"]);
    } else {
      // NOTA: Para um breadcrumb funcional com IDs reais, 
      // o ideal seria guardar um array de objetos [{id, name}] no path.
      // Por enquanto, vamos resetar para a raiz se houver confusão.
      console.warn("Navegação profunda via breadcrumb precisa de mapeamento de IDs.");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <Breadcrumb path={pathNames} onNavigate={navigateBreadcrumb} />

      <ul style={{ listStyle: "none", padding: 0 }}>
        {items.map((item) => (
          <li key={item.id} style={{ margin: "10px 0" }}>
            {item.type === "folder" ? (
              <button 
                onClick={() => enterFolder(item)}
                style={{ cursor: "pointer", background: "none", border: "none", color: "#007bff", fontSize: "16px" }}
              >
                📁 <strong>{item.name}</strong>
              </button>
            ) : (
              <span style={{ fontSize: "16px" }}>📄 {item.name}</span>
            )}
          </li>
        ))}
        {items.length === 0 && <p>Esta pasta está vazia.</p>}
      </ul>
    </div>
  );
};

export default FileExplorer;
