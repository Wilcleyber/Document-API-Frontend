import React, { useState, useEffect } from "react";
import { getFileContent, saveFileContent } from "../nodes_api";

// Props: recebe o ID do arquivo que será aberto
interface FileEditorProps {
  fileId: string; // corrigido para string
}

const FileEditor: React.FC<FileEditorProps> = ({ fileId }) => {
  const [content, setContent] = useState<string>("");
  const [debouncedContent, setDebouncedContent] = useState<string>("");
  const [isDirty, setIsDirty] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");

  // 1️⃣ Carrega conteúdo do arquivo ao abrir / trocar fileId
  useEffect(() => {
    async function fetchFile() {
      try {
        const data = await getFileContent(fileId);
        setContent(data);
        setDebouncedContent(data);
        setIsDirty(false);
        setMessage("");
      } catch {
        setMessage("Erro ao carregar arquivo (permissão ou inexistente).");
      }
    }
    fetchFile();
  }, [fileId]);

  // 2️⃣ DEBOUNCE: espera o usuário parar de digitar
  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedContent(content);
    }, 800);
    return () => clearTimeout(timeout);
  }, [content]);

  // 3️⃣ Auto-save usando o conteúdo debounced
  useEffect(() => {
    if (!isDirty) return;
    if (debouncedContent === "") return;

    async function autoSave() {
      try {
        await saveFileContent(fileId, debouncedContent);
        setIsDirty(false);
        setMessage("Arquivo salvo automaticamente");
      } catch {
        setMessage("Erro ao salvar automaticamente");
      }
    }
    autoSave();
  }, [debouncedContent]);

  // Atualiza conteúdo ao digitar
  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setContent(e.target.value);
    setIsDirty(true);
  };

  // Salvamento manual
  const handleSave = async () => {
    try {
      await saveFileContent(fileId, content);
      setIsDirty(false);
      setDebouncedContent(content);
      setMessage("Arquivo salvo com sucesso!");
    } catch {
      setMessage("Erro ao salvar arquivo (sem permissão?).");
    }
  };

  return (
    <div>
      <textarea
        value={content}
        onChange={handleChange}
        rows={15}
        cols={