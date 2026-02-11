import { useState } from "react";
import { authService } from "../services/authService";

export function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); // Limpa erros anteriores

    try {
      const result = await authService.login(username, password);
      
      if (result.token) {
        alert(`Bem-vindo, ${result.user.username}!`);
        window.location.href = "/dashboard"; // Redireciona
      } else {
        setError(result.message || "Falha no login");
      }
    } catch (err) {
      setError("Servidor offline ou erro de rede.");
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
        
        <button type="submit">Entrar</button>
      </form>
    </div>
  );
}