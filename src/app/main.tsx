import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { API_BASE_URL } from "./config";

// Aqui inicializamos a aplicação React
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    {/* BrowserRouter controla as rotas principais */}
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
