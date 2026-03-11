import api from "../services/api";

// 1. Definimos as funções individualmente primeiro
export const getRoot = async () => {
  const response = await api.get("/items/root");
  return response.data;
};

export const getChildren = async (nodeId: string) => {
  const response = await api.get(`/items/${nodeId}/children`);
  return response.data;
};

export const createFolder = async (parentId: string, name: string) => {
  const response = await api.post("/items", { parent_id: parentId, name, type: "folder" });
  return response.data;
};

export const createFile = async (parentId: string, name: string) => {
  const response = await api.post("/items", { parent_id: parentId, name, type: "file" });
  return response.data;
};

export const renameNode = async (nodeId: string, newName: string) => {
  const response = await api.patch(`/items/${nodeId}`, { name: newName });
  return response.data;
};

export const deleteNode = async (nodeId: string) => {
    const response = await api.delete(`/items/${nodeId}`);
    return response.data;
  };

  export const getFileContent = async (fileId: string) => {
    const response = await api.get(`/files/${fileId}/content`);
    return response.data;
  };

  export const saveFileContent = async (fileId: string, content: string) => {
    const response = await api.put(`/files/${fileId}/content`, { content });
    return response.data;
  }

// 2. Exportamos o objeto nodes_api contendo todas elas (Para a Opção A que você escolheu)
export const nodes_api = {
  getRoot,
  getChildren,
  createFolder,
  createFile,
  renameNode,
  deleteNode,
  getFileContent,
  saveFileContent
};