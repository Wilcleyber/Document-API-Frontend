import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import { api } from "../api"; // usa Axios

const LoginPage: React.FC = () => {
  const { login: setSession } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // Login via API com Axios
  const handleLogin = async () => {
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      // Salva token no localStorage
      localStorage.setItem("access_token", data.token);

      // Atualiza sessão no AuthProvider
      setSession(data.token, data.userId, data.role);
    } catch (error) {
      alert("Credenciais inválidas ou erro de conexão");
    }
  };

  return (
    <div>
      <h2>Login</h2>
      <input
        type="text"
        placeholder="Usuário"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="password"
        placeholder="Senha"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Entrar</button>
    </div>
  );
};

export default LoginPage;
