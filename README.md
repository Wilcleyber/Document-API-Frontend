# 📂 Document Management - Frontend

Interface reativa construída com **React.js** para gerenciamento de diretórios e arquivos, integrada a uma API Node.js com persistência em JSON.

[🔗 Clique aqui para acessar a aplicação ao vivo]()

---

## 🚀 Funcionalidades Principais

* **Autenticação Segura:** Sistema de login com persistência de token JWT e controle de níveis de acesso (Admin/User).
* **Gestão de Pastas:** Visualização dinâmica de diretórios, criação e exclusão de pastas (exclusivo para administradores).
* **Manipulação de Arquivos:** Listagem de arquivos com ordenação por nome e data, além de visualização de conteúdo em tempo real.
* **Busca Global Inteligente:** Pesquisa recursiva que varre pastas e subpastas com técnica de *Debouncing* para otimização de performance.
* **Monitoramento de Saúde:** Indicador visual de status da API (Health Check).

---

## 🛠️ Tecnologias Utilizadas

* **React.js:** Biblioteca principal para construção da interface.
* **React Router:** Gestão de rotas dinâmicas e proteção de acessos.
* **Hooks (useState/useEffect):** Gerenciamento de estado e ciclo de vida.
* **Fetch API:** Comunicação assíncrona com o Backend no Render.
* **CSS3:** Estilização modular e responsiva.

---

## 💻 Como rodar este projeto localmente

1. Clone o repositório:
   ```bash
   git clone [https://github.com/Wilcleyber/Document-API-Frontend.git]

   Bash
   npm install

   Bash
   npm run dev

   🧠 Aprendizados em ADS neste projeto
Este projeto foi fundamental para consolidar conceitos de Consumo de APIs REST, Segurança no Client-side (armazenamento de tokens) e o uso de JSX para criar interfaces modulares. A integração com o Backend exigiu um alinhamento rigoroso de contratos de dados (JSON) para evitar falhas de comunicação.

⭐ Desenvolvido por Wilcleyber