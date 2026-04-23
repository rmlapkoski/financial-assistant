# Financial Assistant API

API de controle financeiro desenvolvida com **Node.js**, **Fastify** e **TypeScript**, focada em validação de dados e processamento de interações.

## 🚀 Tecnologias

- **Runtime**: Node.js v24+
- **Framework**: [Fastify](https://www.fastify.io/)
- **Linguagem**: TypeScript
- **Validação**: [Zod](https://zod.dev/)
- **Documentação**: Swagger (OpenAPI 3.0)
- **Testes**: Node.js Native Test Runner + TSX
- **CI/CD**: GitHub Actions + Render

## 🏗️ Arquitetura

O projeto segue princípios de Separation of Concerns para facilitar a futura integração com persistência:

- `src/app.ts`: Fábrica da aplicação e configuração de plugins.
- `src/server.ts`: Ponto de entrada e inicialização do servidor.
- `src/routes/`: Definição das rotas e endpoints.
- `src/controllers/`: Lógica de orquestração das requisições.
- `src/schemas/`: Validação de dados e contratos da API com Zod.
- `src/config/`: Configurações globais (Swagger, etc).
- `tests/`: Testes de Ponta a Ponta (E2E) com o runner nativo do Node.

## 🛠️ Como Executar

### Pré-requisitos
- Node.js v24 ou superior
- NPM

### Instalação
```bash
npm install
```

### Desenvolvimento
```bash
npm run dev
```
A API estará disponível em `http://localhost:3333`. A documentação Swagger pode ser acessada em `/docs`.

### Testes
```bash
# Executa todos os testes E2E
npm run test
```

### Produção (Build & Start)
```bash
npm run build
npm run start
```

## 🔄 Fluxo de CI/CD

O projeto possui uma esteira automatizada no GitHub Actions (`.github/workflows/ci-cd.yml`):

1. **Lint & Build**: Verifica a sintaxe e tipos do código.
2. **Testes E2E**: Roda a suíte de testes completa.
3. **Deploy Automático**: Se os testes passarem na branch `master`, um sinal é enviado ao **Render** para iniciar o deploy. O GitHub aguarda a confirmação de sucesso do Render para finalizar o pipeline.
