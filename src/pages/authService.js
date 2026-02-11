// A URL que o Render te forneceu (ex: https://document-api-abc.onrender.com)
const API_URL = "https://document-api-backend.onrender.com/auth";

export const authService = {
  // Envia os dados para o /register
  async register(userData) {
    const response = await fetch(`${API_URL}/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(userData),
    });
    return response.json();
  },

  // Envia os dados para o /login e gerencia o Token
  async login(username, password) {
    const response = await fetch(`${API_URL}/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();

    // Se o login for sucesso, "hidratamos" o navegador com o token e o papel (role)
    if (response.ok && data.token) {
      localStorage.setItem("userToken", data.token);
      localStorage.setItem("userRole", data.user.role);
      localStorage.setItem("userName", data.user.username);
    }

    return data;
  }
};