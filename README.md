# 📂 Document-API: Full Stack File Management System

![Demo do Projeto](./media/Demo.gif)

## 🚀 Teste online
https://teste-phi-eosin.vercel.app/

> **Status:** 🚀 Deploy realizado e funcional.
> **Alvo:** Sistema robusto para gestão hierárquica de arquivos e edição em tempo real.

---

## 🎯 O Projeto
Este projeto foi concebido como um degrau para consolidar o domínio de uma stack moderna. Ele resolve o desafio de gerenciar estruturas de dados complexas (árvores) no PostgreSQL e refletir essa hierarquia em uma interface React intuitiva e performática.

### ⚡ Principais Funcionalidades
* **Autenticação JWT:** Sistema de login seguro com controle de rotas.
* **Navegação Hierárquica:** Explorador de arquivos dinâmico (Árvore > Galho > Folha).
* **Editor de Texto Integrado:** Edição direta no navegador com persistência de dados.
* **State Management Inteligente:** Verificação de `isDirty` para evitar perda de dados não salvos.
* **Arquitetura Clean:** Separação clara entre lógica de negócio (Backend) e interface (Frontend).

---

## 🛠️ Stack Tecnológica

| Camada | Tecnologia | Motivo da Escolha |
| :--- | :--- | :--- |
| **Frontend** | React + TypeScript + Vite | Tipagem estática para evitar bugs e build ultra-rápido. |
| **Backend** | FastAPI (Python) | Alta performance e documentação automática (Swagger/OpenAPI). |
| **Banco de Dados** | PostgreSQL | Robustez para lidar com relações entre diretórios e arquivos. |
| **Estilização** | CSS3 Moderno | Layout responsivo e UI focada em UX (Glassmorphism sutil). |
| **Deploy** | Vercel | CI/CD automatizado para entrega contínua. |

---

## 🏗️ Desafios Técnicos Superados (O que eu aprendi)

1.  **Manipulação de Árvores no SQL:** Implementação da lógica de `parent_id` para navegação infinita entre pastas.
2.  **CORS & Segurança:** Configuração fina de middlewares para permitir comunicação segura entre domínios.
3.  **Normalização de Tipos:** Tratamento de inconsistências de dados (Case Sensitivity) entre Backend e Frontend usando `.toLowerCase()` para garantir navegação fluida.
4.  **UX de Edição:** Desenvolvimento de lógica de estado para monitorar alterações pendentes no editor de texto.

---

