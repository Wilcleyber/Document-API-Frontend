import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import api from "../services/api";
import { useNavigate } from "react-router-dom";

const LoginPage: React.FC = () => {
  const { login: setSession } = useAuth();
  const navigate = useNavigate();

  // Estados de controle
  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Estados do formulário
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // 1. Função de Login (versão robusta)
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      console.log("Resposta bruta do servidor:", data);

      // Pega o token em qualquer formato possível
      const tokenReal = data.token || data.access_token || data.accessToken;

      if (tokenReal) {
        localStorage.setItem("access_token", tokenReal);

        // Atualiza sessão no AuthProvider
        setSession(tokenReal, data.user_id || data.id, data.role || data.user_role);

        console.log("Token salvo com sucesso!");
        navigate("/explorer");
      } else {
        console.error("O servidor não enviou um token! Verifique o console.");
        alert("Erro crítico: Token não recebido.");
      }
    } catch (error: any) {
      console.error(error);
      alert("Credenciais inválidas ou erro de conexão com o servidor.");
    } finally {
      setIsLoading(false);
    }
  };

  // 2. Função de Registro
  const handleRegister = async () => {
    if (password.length < 8) {
      alert("A senha precisa ter pelo menos 8 caracteres.");
      return;
    }

    setIsLoading(true);
    try {
      await api.post("/users", { username, email, password });
      alert("Conta criada com sucesso! Você já pode entrar.");
      setIsRegistering(false);
      setPassword("");
    } catch (error: any) {
      const errorMsg = error.response?.data?.detail || "Erro ao criar conta.";
      alert(errorMsg);
    } finally {
      setIsLoading(false);
    }
  };

  // 3. Função Demo
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users/demo");
      setUsername(response.data.username);
      setPassword(response.data.password);
      alert("Credenciais Demo carregadas!");
    } catch {
      alert("Não foi possível carregar as credenciais demo agora.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div style={containerStyle}>
      <h2 style={{ textAlign: "center", color: "#333" }}>
        {isRegistering ? "Nova Conta" : "Login"}
      </h2>

      <div style={{ display: "flex", flexDirection: "column", gap: "15px" }}>
        <input
          style={inputStyle}
          type="text"
          placeholder="Nome de Usuário"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        {isRegistering && (
          <input
            style={inputStyle}
            type="email"
            placeholder="Seu melhor E-mail"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        )}

        <input
          style={inputStyle}
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          onClick={isRegistering ? handleRegister : handleLogin}
          disabled={isLoading}
          style={{
            ...buttonStyle,
            backgroundColor: isLoading ? "#ccc" : "#007bff",
            cursor: isLoading ? "not-allowed" : "pointer",
          }}
        >
          {isLoading
            ? "API despertando (Aguarde)"
            : isRegistering
            ? "Finalizar Cadastro"
            : "Entrar no Sistema"}
        </button>

        {!isRegistering && (
          <button
            onClick={handleDemoLogin}
            disabled={isLoading}
            style={{ ...buttonStyle, backgroundColor: "#6c757d" }}
          >
            Usar Usuário Demo
          </button>
        )}

        <div style={{ textAlign: "center", marginTop: "10px" }}>
          <button
            onClick={() => {
              setIsRegistering(!isRegistering);
              setEmail("");
            }}
            style={{
              background: "none",
              border: "none",
              color: "#007bff",
              cursor: "pointer",
              textDecoration: "underline",
            }}
          >
            {isRegistering
              ? "Já tem uma conta? Faça Login"
              : "Não tem conta? Crie uma aqui"}
          </button>
        </div>
      </div>
    </div>
  );
};

// Estilos
const containerStyle: React.CSSProperties = {
  maxWidth: "400px",
  margin: "60px auto",
  padding: "30px",
  border: "1px solid #ddd",
  borderRadius: "12px",
  boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  fontFamily: "sans-serif",
};

const inputStyle: React.CSSProperties = {
  padding: "12px",
  borderRadius: "6px",
  border: "1px solid #ccc",
  fontSize: "16px",
};

const buttonStyle: React.CSSProperties = {
  padding: "12px",
  color: "white",
  border: "none",
  borderRadius: "6px",
  fontSize: "16px",
  fontWeight: "bold",
  transition: "0.3s",
};

export default LoginPage;

