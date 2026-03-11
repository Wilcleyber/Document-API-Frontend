import { api } from "../api"; // instância global do Axios

// Busca raiz da árvore
export async function getRoot() {
  const response = await api.get("/nodes/root");
  return response.data;
}

// Busca filhos de um node
export async function getChildren(nodeId: string) {
  const response = await api.get(`/nodes/${nodeId}/children`);
  return response.data;
}

// Criação de pasta
export async function createFolder(name: string) {
  const response = await api.post("/nodes/folder", { name });
  return response.data;
}

// Criação de arquivo
export async function createFile(name: string) {
  const response = await api.post("/nodes/file", { name });
  return response.data;
}

// Renomear node
export async function renameNode(nodeId: string, newName: string) {
  const response = await api.put(`/nodes/${nodeId}/rename`, { newName });
  return response.data;
}

// Excluir node
export async function deleteNode(nodeId: string) {
  const response = await api.delete(`/nodes/${nodeId}`);
  return response.data;
}

// Obter conteúdo de arquivo
export async function getFileContent(fileId: string) {
  const response = await api.get(`/files/${fileId}`);
  return response.data; // conteúdo do arquivo
}

// Salvar conteúdo de arquivo
export async function saveFileContent(fileId: string, content: string) {
  const response = await api.put(`/files/${fileId}`, { content });
  return response.data;
}
