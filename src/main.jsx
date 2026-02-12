import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx' // Corrigido: App é export default

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)