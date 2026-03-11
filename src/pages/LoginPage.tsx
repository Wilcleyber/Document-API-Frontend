import React, { useState } from "react";
import { useAuth } from "../auth_state/useAuth";
import api from "../services/api";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

const LoginPage: React.FC = () => {
  const { login: setSession } = useAuth();
  const navigate = useNavigate();

  const [isRegistering, setIsRegistering] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  // Login
  const handleLogin = async () => {
    if (!username || !password) {
      alert("Preencha usuário e senha.");
      return;
    }

    setIsLoading(true);
    try {
      const response = await api.post("/auth/login", { username, password });
      const data = response.data;

      const tokenReal = data.token || data.access_token || data.accessToken;
      if (tokenReal) {
        localStorage.setItem("access_token", tokenReal);
        setSession(tokenReal, data.user_id || data.id, data.role || data.user_role);
        navigate("/explorer");
      } else {
        alert("Erro crítico: Token não recebido.");
      }
    } catch (error: any) {
      alert("Credenciais inválidas ou erro de conexão.");
    } finally {
      setIsLoading(false);
    }
  };

  // Registro
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

  // Demo
  const handleDemoLogin = async () => {
    setIsLoading(true);
    try {
      const response = await api.get("/users/demo");
      setUsername(response.data.username);
      setPassword(response.data.password);
      alert("Credenciais Demo carregadas!");
    } catch {
      alert("Não foi possível carregar as credenciais demo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <h2>{isRegistering ? "Nova Conta" : "Bem-vindo de volta"}</h2>
        <p>{isRegistering ? "Crie sua conta para começar." : "Acesse seus documentos com segurança."}</p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            isRegistering ? handleRegister() : handleLogin();
          }}
        >
          <div className="input-group">
            <label>Usuário</label>
            <input
              type="text"
              placeholder="Digite seu usuário"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          {isRegistering && (
            <div className="input-group">
              <label>Email</label>
              <input
                type="email"
                placeholder="Digite seu e-mail"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
          )}

          <div className="input-group">
            <label>Senha</label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button className="login-button" type="submit" disabled={isLoading}>
            {isLoading
              ? "Processando..."
              : isRegistering
              ? "Finalizar Cadastro"
              : "Entrar no Sistema"}
          </button>

          {!isRegistering && (
            <button
              type="button"
              className="demo-button"
              onClick={handleDemoLogin}
              disabled={isLoading}
            >
              Usar Usuário Demo
            </button>
          )}

          <div className="toggle-register">
            <button
              type="button"
              onClick={() => {
                setIsRegistering(!isRegistering);
                setEmail("");
              }}
            >
              {isRegistering
                ? "Já tem uma conta? Faça Login"
                : "Não tem conta? Crie uma aqui"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
