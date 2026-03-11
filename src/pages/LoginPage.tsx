import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import { api } from "../api"; // usa Axios

const LoginPage: React.FC = () => {
  const { login: setSession } = useAuth();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Login via API com Axios
  const handleLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      // Salva token no localStorage
      localStorage.setItem("access_token", data.token);

      // Atualiza sessão no AuthProvider
      setSession(data.token, data.userId, data.role);
    } catch (error) {
      alert(
        "Credenciais inválidas ou erro de conexão. (A API pode estar acordando, tente novamente em instantes)"
      );
    } finally {
      setIsLoading(false);
    }
  };

  // Login demo
  const handleDemoLogin = () => {
    setUsername("demo");
    setPassword("demo123");
    // Se quiser disparar login automático:
    // handleLogin();
  };

  return (
    <div className="login-container">
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

      <button onClick={handleLogin} disabled={isLoading}>
        {isLoading ? "Acordando o motor (aguarde)..." : "Entrar"}
      </button>

      <div style={{ marginTop: "15px" }}>
        <button onClick={handleDemoLogin} style={{ backgroundColor: "#ddd" }}>
          Usar Usuário Demo
        </button>

        <p style={{ fontSize: "12px", marginTop: "10px" }}>
          Não tem conta?{" "}
          <a href="#" onClick={() => alert("Função de cadastro em breve!")}>
            Criar agora
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
