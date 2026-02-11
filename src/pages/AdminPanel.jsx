import { dataService } from "../services/dataService";
import { SearchBar } from "../components/SearchBar"; // Reutilizando!

export function AdminPanel() {
  const handleReset = async () => {
    if (window.confirm("⚠️ AÇÃO CRÍTICA: Deseja resetar todo o sistema de demonstração?")) {
      await dataService.resetSystem();
      alert("Sistema restaurado com sucesso!");
    }
  };

  return (
    <div className="admin-panel">
      <h1>🛠️ Painel de Controle (Admin Only)</h1>
      
      <div className="admin-grid">
        {/* Card de Reset - Ação de Segurança */}
        <section className="admin-card danger-zone">
          <h2>Zona de Perigo</h2>
          <p>Restaura todas as pastas, subpastas e arquivos originais.</p>
          <button onClick={handleReset} className="btn-reset-large">
            Resetar Banco de Dados JSON
          </button>
        </section>

        {/* Card de Auditoria Rápida */}
        <section className="admin-card">
          <h2>Busca de Auditoria</h2>
          <p>Encontre qualquer documento para edição rápida.</p>
          <SearchBar />
        </section>

        {/* Card de Info do Sistema */}
        <section className="admin-card">
          <h2>Estatísticas</h2>
          <ul>
            <li>Sessão: Ativa</li>
            <li>Nível de Acesso: Super Admin</li>
            <li>Conexão Render: Estável</li>
          </ul>
        </section>
      </div>
    </div>
  );
}