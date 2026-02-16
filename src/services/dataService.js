const API_URL = "https://document-api-backend.onrender.com";

// Função auxiliar para pegar o token
const getAuthHeader = () => ({
  "Authorization": `Bearer ${localStorage.getItem("userToken")}`,
  "Content-Type": "application/json"
});

export const dataService = {
  // GET /folders
  async getFolders() {
    const res = await fetch(`${API_URL}/folders`, { headers: getAuthHeader() });
    const data = await res.json();
    
    // Se não for autenticado (401), retorna erro
    if (!res.ok) {
      console.error("Erro ao buscar pastas:", res.status, data);
      return { statusCode: res.status, error: data };
    }
    
    return data;
  },

  // GET /health (Público ou Privado, dependendo da sua escolha)
  async getHealth() {
    try {
      const res = await fetch(`${API_URL}/health`);
      return await res.json();
    } catch (err) {
      console.error("Erro ao verificar saúde:", err);
      return { status: "error" };
    }
  },

  // POST /reset (Apenas Admin)
  async resetSystem() {
    const res = await fetch(`${API_URL}/reset`, { 
      method: "POST", 
      headers: getAuthHeader() 
    });
    return res.json();
  }
};