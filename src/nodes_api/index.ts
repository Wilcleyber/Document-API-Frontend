import api from "../services/api";

export const nodes_api = {
  // 1. Busca os itens da raiz (Baseado em GET /items/root)
  getRoot: async () => {
    const response = await api.get("/items/root");
    return response.data;
  },

  // 2. Busca os filhos de uma pasta (Baseado em GET /items/{node_id}/children)
  getChildren: async (nodeId: string) => {
    const response = await api.get(`/items/${nodeId}/children`);
    return response.data;
  },

  // 3. Busca um item específico (Baseado em GET /items/{node_id})
  getNode: async (nodeId: string) => {
    const response = await api.get(`/items/${nodeId}`);
    return response.data;
  },

  // 4. Busca a árvore completa (Baseado em GET /items/tree/full)
  getFullTree: async () => {
    const response = await api.get("/items/tree/full");
    return response.data;
  },

  // 5. Busca o caminho (Breadcrumbs) (Baseado em GET /navigation/{node_id}/path)
  // Note: O prefixo aqui depende de como o navigation_router foi registrado no main.py
  // Se ele não tiver prefixo no main.py, usamos apenas /navigation ou o que estiver no router dele.
  getPath: async (nodeId: string) => {
    const response = await api.get(`/navigation/${nodeId}/path`);
    return response.data;
  }
};