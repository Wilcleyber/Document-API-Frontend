import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { authService } from "./authService";

export function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showRegister, setShowRegister] = useState(false);
  const [role, setRole] = useState("user");
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

  const quickLogin = async (preset) => {
    setError("");
    setIsLoading(true);
    try {
      const data = await authService.login(preset.username, preset.password);
      if (data.token) {
        onLoginSuccess();
        navigate("/dashboard", { replace: true });
      } else {
        setError(data.message || "Falha no login");
      }
    } catch (err) {
      setError("Servidor offline ou erro de rede.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    if (!username || !password) return setError('Preencha todos os campos.');
    try {
      const result = await authService.register({ username, password, role });
      if (result.user) {
        // Após registro, faz login automático para facilitar testes
        const data = await authService.login(username, password);
        if (data.token) {
          onLoginSuccess();
          navigate('/dashboard', { replace: true });
        }
      } else {
        setError(result.message || 'Erro ao criar conta.');
      }
    } catch (err) {
      setError('Erro ao criar conta.');
    }
  };

  return (
    <div className="login-container">
      <form onSubmit={showRegister ? handleRegister : handleLogin}>
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
        
        <button type="submit" disabled={isLoading}>{isLoading ? "Entrando..." : (showRegister ? 'Criar Conta' : 'Entrar')}</button>

        <div style={{ marginTop: '0.75rem', display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
          <button type="button" onClick={() => quickLogin({ username: 'admin', password: '123456' })} className="btn-ghost">Acesso Rápido Admin</button>
          <button type="button" onClick={() => quickLogin({ username: 'visitante', password: '123456' })} className="btn-ghost">Acesso Rápido Visitante</button>
        </div>

        <div style={{ marginTop: '0.5rem' }}>
          <label style={{ cursor: 'pointer' }}>
            <input type="checkbox" checked={showRegister} onChange={() => setShowRegister(!showRegister)} /> Mostrar formulário de criação de conta
          </label>
        </div>

        {showRegister && (
          <div style={{ marginTop: '0.5rem' }}>
            <div style={{ marginTop: '0.5rem' }}>
              <label>Tipo de usuário: </label>
              <select value={role} onChange={(e) => setRole(e.target.value)}>
                <option value="user">Visitante</option>
                <option value="admin">Admin</option>
              </select>
            </div>
          </div>
        )}
      </form>
    </div>
  );
}