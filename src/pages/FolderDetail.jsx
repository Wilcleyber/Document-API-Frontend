import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { fileService } from "../services/fileService";
import { subfolderService } from "../services/subfolderService";

export function FolderDetail() {
  const { folderName } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState([]);
  const [subfolders, setSubfolders] = useState([]);
  const [role] = useState(localStorage.getItem("userRole"));

  useEffect(() => {
    loadContent();
  }, [folderName]);

  const loadContent = async () => {
    const fileData = await fileService.getFiles(folderName);
    const subData = await subfolderService.getSubfolders(folderName);
    
    setFiles(Array.isArray(fileData) ? fileData : []);
    setSubfolders(Array.isArray(subData) ? subData : []);
  };

  const handleCreateSub = async () => {
    const name = prompt("Nome da subpasta:");
    if (name) {
      await subfolderService.createSubfolder(folderName, name);
      loadContent();
    }
  };

  return (
    <div className="folder-detail">
      <header>
        <button onClick={() => navigate("/dashboard")}>⬅️ Voltar ao Dashboard</button>
        <h1>Explorando: {folderName}</h1>
      </header>

      {/* SEÇÃO DE SUBPASTAS */}
      <section className="subfolders-section">
        <h3>Subpastas</h3>
        <div className="subfolder-grid">
          {subfolders.map(sub => (
            <div key={sub.name} className="subfolder-item" onClick={() => navigate(`/folder/${folderName}/${sub.name}`)}>
              <span>📁 {sub.name}</span>
            </div>
          ))}
          {role === "admin" && (
            <button className="btn-add-sub" onClick={handleCreateSub}>+ Nova Subpasta</button>
          )}
        </div>
      </section>

      <hr />

      {/* SEÇÃO DE ARQUIVOS */}
      <section className="files-section">
        <h3>Arquivos</h3>
        <ul className="file-list">
          {files.map(file => (
            <li key={file.name} className="file-row">
              <span>📄 {file.name}</span>
              <button onClick={() => alert(file.content)}>Abrir</button>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}