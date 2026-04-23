# Financial Assistant API

API de assistente financeiro inteligente desenvolvida com **Node.js**, **Fastify** e **TypeScript**, utilizando **LangGraph** para orquestração de agentes de IA.

## 🚀 Tecnologias

- **Runtime**: Node.js v24+
- **Framework**: [Fastify](https://www.fastify.io/)
- **AI Orchestration**: [LangGraph](https://langchain-ai.github.io/langgraphjs/) & [LangChain](https://js.langchain.com/)
- **Linguagem**: TypeScript
- **Validação**: [Zod](https://zod.dev/)
- **Documentação**: Swagger (OpenAPI 3.0)
- **Testes**: Node.js Native Test Runner + TSX
- **CI/CD**: GitHub Actions + Render

## 🏗️ Arquitetura de IA (LangGraph)

O núcleo da inteligência da aplicação é baseado em um Grafo de Estados, permitindo um fluxo de conversa dinâmico e extensível:

- **StateSchema**: Define o estado compartilhado entre os nós (`messages`, `output`, `command`).
- **Nós (Nodes)**:
  - `identifyIntent`: Analisa a mensagem do usuário para identificar a intenção (ex: registrar transação).
  - `registerTransaction`: Lógica para processar o registro de finanças.
  - `fallback`: Resposta padrão para comandos não identificados.
  - `chatResponse`: Formata e envia a resposta final da IA.
- **Arestas Condicionais**: Direcionam o fluxo com base na intenção identificada.

## 📁 Estrutura de Pastas

- `src/graph/`: Definição do grafo, estados e lógica do agente.
  - `src/graph/nodes/`: Implementação individual de cada passo do pensamento da IA.
- `src/routes/`: Endpoints da API.
- `src/controllers/`: Ponte entre as requisições HTTP e a execução do Grafo de IA.
- `tests/`: Testes E2E que validam o comportamento do agente.

## 🛠️ Como Executar

### Pré-requisitos

- Node.js v24 ou superior
- NPM

### Instalação

```bash
npm install
```

### Desenvolvimento (API)

```bash
npm run dev
```

A API estará disponível em `http://localhost:3333`.

### Desenvolvimento Visual (LangGraph Studio)

Para visualizar e testar o grafo interativamente:

```bash
npm run langgraph:serve
```

### Testes

```bash
npm run test
```

## 🔄 Fluxo de CI/CD

O projeto utiliza GitHub Actions para garantir a qualidade:

1. **Testes E2E**: Garante que o Agente de IA está respondendo corretamente às intenções.
2. **Deploy**: Deploy automático no Render após aprovação em `master`.
