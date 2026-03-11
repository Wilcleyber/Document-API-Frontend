import React, { useState, useEffect } from "react";
import Breadcrumb from "./Breadcrumb";
import { getChildren } from "../nodes_api";

// Tipo para representar um item (pasta ou arquivo)
interface NodeItem {
  id: string; // corrigido para string
  name: string;
  type: "folder" | "file";
}

const FileExplorer: React.FC = () => {
  const [currentFolderId, setCurrentFolderId] = useState<string>("root");
  const [items, setItems] = useState<NodeItem[]>([]);
  const [path, setPath] = useState<string[]>(["root"]);

  // Sempre que currentFolderId mudar → busca filhos via API
  useEffect(() => {
    async function fetchChildren() {
      try {
        const children = await getChildren(currentFolderId);
        setItems(children);
      } catch {
        setItems([]);
      }
    }
    fetchChildren();
  }, [currentFolderId]);

  // Entrar em uma pasta
  const enterFolder = (item: NodeItem) => {
    setCurrentFolderId(item.id);
    setPath((prev) => [...prev, item.name]);
  };

  // Voltar para uma pasta anterior via breadcrumb
  const navigateBreadcrumb = (index: number) => {
    const newPath = path.slice(0, index + 1);
    setPath(newPath);
    // Aqui usamos o último nome do caminho como ID simplificado
    setCurrentFolderId(newPath[newPath.length - 1]);
  };

  return (
    <div>
      <Breadcrumb path={path} onNavigate={navigateBreadcrumb} />

      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.type === "folder" ? (
              <button onClick={() => enterFolder(item)}>📁 {item.name}</button>
            ) : (
              <span>📄 {item.name}</span>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FileExplorer;
