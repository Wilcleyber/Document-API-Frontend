import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores
    setIsLoading(true);

    try {
      const result = await authService.login(username, password);
      
      if (result.token) {
        // Token já foi salvo no authService
        onLoginSuccess();
        navigate("/dashboard", { replace: true });
      } else {
        setError(result.message || "Falha no login");
      }
    } catch (err) {
      setError("Servidor offline ou erro de rede.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={handleLogin}>
        <h2>Login - Document API</h2>
        {error && <p style={{ color: "red" }}>{error}</p>}
        
        <input 
          type="text" 
          placeholder="Usuário" 
          onChange={(e) => setUsername(e.target.value)} 
          required 
        />
        <input 
          type="password" 
          placeholder="Senha" 
          onChange={(e) => setPassword(e.target.value)} 
          required 
        />
        
        <button type="submit" disabled={isLoading}>{isLoading ? "Entrando..." : "Entrar"}</button>
      </form>
    </div>
  );
}