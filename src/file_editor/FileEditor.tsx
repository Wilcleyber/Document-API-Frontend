import React, { useState, useEffect } from "react";
import { nodes_api } from "../nodes_api"; // Padronizado!

interface FileEditorProps {
  fileId: string;
}

const FileEditor: React.FC<FileEditorProps> = ({ fileId }) => {
  const [content, setContent] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchFile() {
      if (!fileId) return;
      try {
        setMessage("Carregando...");
        // Usando o novo padrão nodes_api.getFileContent
        const data = await nodes_api.getFileContent(fileId);
        
        // Lógica de tratamento de conteúdo conforme o seu backend
        const fileText = typeof data === 'string' ? data : data.content;
        setContent(fileText || "");
        setIsDirty(false);
        setMessage("Arquivo carregado.");
      } catch (error) {
        setMessage("Erro ao carregar arquivo.");
        console.error(error);
      }
    }
    fetchFile();
  }, [fileId]);

  // Função para salvar (Pode ser chamada por um botão ou debounce)
  const handleSave = async () => {
    try {
      setMessage("Salvando...");
      await nodes_api.saveFileContent(fileId, content);
      setIsDirty(false);
      setMessage("Salvo com sucesso!");
    } catch (error) {
      setMessage("Erro ao salvar.");
    }
  };

  return (
    <div style={{ padding: "10px", border: "1px solid #ddd", borderRadius: "8px" }}>
      <div style={{ marginBottom: "10px", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <span style={{ fontSize: "12px", color: "#666" }}>
          {message} {isDirty && <strong style={{ color: "orange" }}>• Alterações não salvas</strong>}
        </span>
        {isDirty && (
          <button onClick={handleSave} style={{ padding: "2px 10px", cursor: "pointer" }}>
            Salvar Agora
          </button>
        )}
      </div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsDirty(true);
        }}
        rows={20}
        style={{ 
          width: "100%", 
          fontFamily: "monospace", 
          padding: "10px", 
          boxSizing: "border-box",
          borderRadius: "4px",
          border: "1px solid #ccc"
        }}
      />
    </div>
  );
};

export default FileEditor;