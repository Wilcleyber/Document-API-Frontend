import { createContext } from "react";

export interface FeedbackState {
  message: string | null;
  type: "success" | "error" | "info" | null;
  loading: boolean;
}

export interface FeedbackContextType extends FeedbackState {
  setMessage: (msg: string, type: "success" | "error" | "info") => void;
  clearMessage: () => void;
  setLoading: (loading: boolean) => void;
}

export const FeedbackContext = createContext<FeedbackContextType | undefined>(undefined);
