import { useContext } from "react";
import { FeedbackContext } from "./FeedbackContext";

// Hook para consumir feedback
export const useFeedback = () => {
  const context = useContext(FeedbackContext);
  if (!context) {
    throw new Error("useFeedback deve ser usado dentro de FeedbackProvider");
  }
  return context;
};
