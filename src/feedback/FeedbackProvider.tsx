import React, { useState } from "react";
import { FeedbackContext, FeedbackState } from "./FeedbackContext";
import { useAuth } from "../auth_state/useAuth"; // para logout automático

interface Props {
  children: React.ReactNode;
}

const FeedbackProvider: React.FC<Props> = ({ children }) => {
  const [feedback, setFeedback] = useState<FeedbackState>({
    message: null,
    type: null,
    loading: false,
  });

  const { logout } = useAuth();

  // Define mensagem
  const setMessage = (msg: string, type: "success" | "error" | "info") => {
    setFeedback({ ...feedback, message: msg, type });
  };

  // Limpa mensagem
  const clearMessage = () => {
    setFeedback({ ...feedback, message: null, type: null });
  };

  // Define loading
  const setLoading = (loading: boolean) => {
    setFeedback({ ...feedback, loading });
  };

  // Interceptor de erros HTTP
  const handleHttpError = (status: number) => {
    if (status === 401) {
      logout(); // força logout
    } else if (status === 403) {
      setMessage("Permissão negada.", "error");
    } else if (status >= 500) {
      setMessage("Erro interno no servidor.", "error");
    }
  };

  return (
    <FeedbackContext.Provider
      value={{ ...feedback, setMessage, clearMessage, setLoading }}
    >
      {children}
      {/* Exibição simples de feedback */}
      {feedback.message && (
        <div
          style={{
            position: "fixed",
            bottom: "10px",
            right: "10px",
            padding: "10px",
            backgroundColor:
              feedback.type === "error"
                ? "#ff4d4f"
                : feedback.type === "success"
                ? "#52c41a"
                : "#1890ff",
            color: "white",
          }}
        >
          {feedback.message}
        </div>
      )}
      {feedback.loading && (
        <div
          style={{
            position: "fixed",
            bottom: "50px",
            right: "10px",
            padding: "10px",
            backgroundColor: "#555",
            color: "white",
          }}
        >
          Carregando...
        </div>
      )}
    </FeedbackContext.Provider>
  );
};

export default FeedbackProvider;
