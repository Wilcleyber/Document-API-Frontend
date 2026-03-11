import { api } from "../api"; // instância global do Axios
import { TOKEN_KEY } from "../app/config";

// Tipo das credenciais
interface Credentials {
  username: string;
  password: string;
}

// Tipo da resposta esperada
interface LoginResponse {
  token: string;
  userId: string; // simplificado para string (UUID ou string)
  role: "ADMIN" | "USER";
}

// Login
export async function login(credentials: Credentials): Promise<LoginResponse> {
  try {
    const response = await api.post("/auth/login", credentials);
    const data = response.data;

    // Salva token no localStorage
    localStorage.setItem(TOKEN_KEY, data.token);

    return {
      token: data.token,
      userId: data.userId,
      role: data.role,
    };
  } catch (error) {
    throw new Error("Erro ao tentar login");
  }
}

// Validação de token
export async function validateToken(): Promise<boolean> {
  const token = localStorage.getItem(TOKEN_KEY);

  if (!token) {
    return false;
  }

  try {
    const response = await api.get("/auth/validate", {
      headers: { Authorization: `Bearer ${token}` },
    });

    return response.status === 200;
  } catch {
    return false;
  }
}

