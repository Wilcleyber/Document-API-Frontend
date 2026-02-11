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
    return res.json();
  },

  // GET /health (Público ou Privado, dependendo da sua escolha)
  async getHealth() {
    const res = await fetch(`${API_URL}/health`);
    return res.json();
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