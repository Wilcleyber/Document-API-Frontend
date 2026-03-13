import React, { useState, useEffect } from "react";
import { nodes_api } from "../nodes_api";

interface FileEditorProps {
  fileId: string;
  fileName: string;
  onClose: () => void;
}

const FileEditor: React.FC<FileEditorProps> = ({ fileId, fileName, onClose }) => {
  const [content, setContent] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [saving, setSaving] = useState<boolean>(false);
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // 1. Busca o conteúdo ao abrir
  useEffect(() => {
    const loadContent = async () => {
      try {
        setMessage("Carregando...");
        const data = await nodes_api.getFileContent(fileId);
        const fileText = typeof data === "string" ? data : data.content;
        setContent(fileText || "");
        setIsDirty(false);
        setMessage("Arquivo carregado.");
      } catch (err) {
        console.error("Erro ao ler arquivo:", err);
        setMessage("Erro ao carregar arquivo.");
      } finally {
        setLoading(false);
      }
    };
    loadContent();
  }, [fileId]);

  // 2. Salva o conteúdo
  const handleSave = async () => {
    setSaving(true);
    try {
      setMessage("Salvando...");
      await nodes_api.saveFileContent(fileId, content);
      setIsDirty(false);
      setMessage("Salvo com sucesso!");
    } catch (err) {
      console.error("Erro ao salvar:", err);
      setMessage("Erro ao salvar.");
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <div className="editor-status">Carregando conteúdo...</div>;

  return (
    <div className="editor-container">
      {/* Cabeçalho */}
      <div className="editor-header">
        <span className="editor-filename">📄 {fileName}</span>
        <div className="editor-actions">
          {isDirty && (
            <button className="btn-save" onClick={handleSave} disabled={saving}>
              {saving ? "Salvando..." : "Salvar"}
            </button>
          )}
          <button className="btn-close" onClick={onClose}>Fechar</button>
        </div>
      </div>

      {/* Status */}
      <div className="editor-status">
        {message}{" "}
        {isDirty && <strong style={{ color: "orange" }}>• Alterações não salvas</strong>}
      </div>

      {/* Editor */}
      <textarea
        className="editor-textarea"
        value={content}
        onChange={(e) => {
          setContent(e.target.value);
          setIsDirty(true);
        }}
        spellCheck={false}
        rows={20}
      />
    </div>
  );
};

export default FileEditor;
