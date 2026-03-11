import React from "react";
import Router from "./router"; // Ajuste o caminho conforme sua pasta
import Layout from "./layout/Layout"; 
import AuthProvider from "./auth_state/AuthProvider"; 
import FeedbackProvider from "./feedback/FeedbackProvider"; 

/**
 * O App agora é o ponto de entrada que configura o ambiente.
 * A lógica de redirecionamento que estava no useEffect antigo
 * agora é tratada automaticamente pelo Router e pelas rotas protegidas.
 */
const App: React.FC = () => {
  return (
    // 1. AuthProvider: Gerencia o Token e o estado do usuário (User_id, Role)
    <AuthProvider>
      {/* 2. FeedbackProvider: Controla Toasts (mensagens de erro/sucesso) e Spinners */}
      <FeedbackProvider>
        {/* 3. Layout: Define a moldura (Menu Lateral, Header, etc) */}
        <Layout>
          {/* 4. Router: Decide qual página mostrar baseado na URL */}
          <Router />
        </Layout>
      </FeedbackProvider>
    </AuthProvider>
  );
};

export default App;