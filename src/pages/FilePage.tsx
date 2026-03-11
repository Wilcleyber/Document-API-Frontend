import React from "react";
import { useParams } from "react-router-dom";
import FileEditor from "../file_editor/FileEditor";

// Página de Arquivo
const FilePage: React.FC = () => {
  const { id } = useParams<{ id: string }>();

  if (!id) return <p>Arquivo não encontrado</p>;

  return (
    <div>
      <h2>Editor de Arquivo</h2>
      <FileEditor fileId={id} />
    </div>
  );
};

export default FilePage;
