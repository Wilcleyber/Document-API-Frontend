import React, { useState, useEffect } from "react";
import { getFileContent, saveFileContent } from "../nodes_api";

interface FileEditorProps {
  fileId: string;
}

const FileEditor: React.FC<FileEditorProps> = ({ fileId }) => {
  const [content, setContent] = useState<string>("");
  const [debouncedContent, setDebouncedContent] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    async function fetchFile() {
      try {
        const data = await getFileContent(fileId);
        // Se o seu backend retorna um objeto { content: "..." }, use data.content
        // Se retorna só a string, use data puro
        setContent(typeof data === 'string' ? data : data.content);
        setDebouncedContent(typeof data === 'string' ? data : data.content);
        setIsDirty(false);
      } catch {
        setMessage("Erro ao carregar arquivo.");
      }
    }
    fetchFile();
  }, [fileId]);

  // ... (o restante do código de debounce e auto-save que já tínhamos)

  return (
    <div>
      <div style={{ marginBottom: "5px", fontSize: "12px", color: "#666" }}>
        {message} {isDirty && " (Editando...)"}
      </div>
      <textarea
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsDirty(true);
        }}
        rows={20}
        style={{ width: "100%", fontFamily: "monospace", padding: "10px" }}
      />
    </div>
  );
};

export default FileEditor;