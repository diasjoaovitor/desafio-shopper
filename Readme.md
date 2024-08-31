# Teste Técnico - Full Stack Júnior - Shopper

Backend de um serviço que gerencia a leitura individualizada de consumo de água e gás. Este serviço utiliza IA para obter a medição através da foto de um medidor.

## Tecnologias

- Commit Linter
- Cors
- Docker
- Dotenv
- Dotenv Expand
- Express
- ESLint
- Husky
- Jest
- Knex
- Lint Staged
- Module Alias
- NodeJS
- Prettier
- PostgreSQL
- Supertest
- TS-Node-Dev
- TypeScript
- UUID
- Zod

## Como Executar

Renomeie o arquivo `.env.example` para `.env` e atribua sua chave `GEMINI_API_KEY`

```sh
chmod +x init-dev.sh
npm i
npm run dev
```

Caso ocorra o erro abaixo, basta executar o comando `npm run dev` novamente

```sh
> knex migrate:latest --knexfile src/database/knexfile.ts

Requiring external module ts-node/register
Working directory changed to ~/Dev/diasjoaovitor/desafio-shopper/src/database
Using environment: development
Connection terminated unexpectedly
Error: Connection terminated unexpectedly
    at Connection.<anonymous> (/home/vitor/Dev/diasjoaovitor/desafio-shopper/node_modules/pg/lib/client.js:132:73)
    at Object.onceWrapper (node:events:633:28)
    at Connection.emit (node:events:519:28)
    at Connection.emit (node:domain:488:12)
    at Socket.<anonymous> (/home/vitor/Dev/diasjoaovitor/desafio-shopper/node_modules/pg/lib/connection.js:63:12)
    at Socket.emit (node:events:519:28)
    at Socket.emit (node:domain:488:12)
    at TCP.<anonymous> (node:net:339:12)
```
