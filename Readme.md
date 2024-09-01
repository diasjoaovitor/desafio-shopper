# Teste Técnico - Full Stack Júnior - Shopper

Backend de um serviço que gerencia a leitura individualizada de consumo de água e gás. Este serviço utiliza IA para obter a medição através da foto de um medidor.

A descrição do teste está escrita [neste pdf](./.github/assets/teste_técnico_desenvolvimento_web.pdf)

## Tecnologias

- [Commit Linter](https://www.npmjs.com/package/git-commit-msg-linter)
- [Cors](https://www.npmjs.com/package/cors)
- [Docker](https://www.docker.com/)
- [Dotenv](https://www.npmjs.com/package/dotenv)
- [Dotenv Expand](https://www.npmjs.com/package/dotenv-expand)
- [Express](https://expressjs.com/pt-br/)
- [ESLint](https://eslint.org/)
- [GitHub Actions](https://docs.github.com/pt/actions/writing-workflows/quickstart)
- [Husky](https://www.npmjs.com/package/husky)
- [Jest](https://jestjs.io/pt-BR/)
- [Knex](https://knexjs.org/)
- [Lint Staged](https://www.npmjs.com/package/lint-staged)
- [Module Alias](https://www.npmjs.com/package/module-alias)
- [NodeJS](https://nodejs.org/pt)
- [Prettier](https://prettier.io/)
- [PostgreSQL](https://www.postgresql.org/)
- [Swagger](https://swagger.io/)
- [Supertest](https://www.npmjs.com/package/supertest)
- [TS-Node-Dev](https://www.npmjs.com/package/ts-node-dev)
- [TypeScript](https://www.typescriptlang.org/)
- [UUID](https://www.npmjs.com/package/uuid)
- [Zod](https://zod.dev/)

## Como Executar

**Via Docker**

Crie o arquivo `.env` e atribua sua chave `GEMINI_API_KEY`

```sh
docker compose --profile prod up -d--build
```

**Localmente**

Renomeie o arquivo `.env.example` para `.env` e atribua sua chave `GEMINI_API_KEY`

A primeira vez que for executar é necessário rodar os seguintes comandos:

```sh
docker compose up -d
npm i
npm run migrate:latest
chmod +x init-dev.sh
npm run dev
```

Nas execuções seguintes, apenas o comando `npm run dev` é necessário

## Estrutura do projeto

```
├── .editorconfig
├── .env
├── .env.example
├── .eslintrc.cjs
├── .github
│   ├── assets
│   │   ├── base64.txt
│   │   ├── medidor.jpg
│   │   └── teste_técnico_desenvolvimento_web.pdf
│   └── workflows
│       └── ci.yml
├── .gitignore
├── .husky
│   └── pre-commit
├── .lintstagedrc.cjs
├── .nvmrc
├── .prettierrc.json
├── .vscode
│   └── settings.json
├── Dockerfile
├── Readme.md
├── compose.yml
├── init-dev.sh
├── jest.config.ts
├── jest.setup.ts
├── package-lock.json
├── package.json
├── src
│   ├── app.ts
│   ├── config
│   │   ├── alias-config.ts
│   │   ├── index.ts
│   │   └── swagger
│   │       ├── get-list.ts
│   │       ├── patch-confirm-doc.ts
│   │       ├── post-upload-doc.ts
│   │       └── swagger-config.ts
│   ├── controllers
│   │   ├── index.ts
│   │   └── measure-controller.ts
│   ├── database
│   │   ├── db.ts
│   │   ├── index.ts
│   │   ├── knexfile.ts
│   │   ├── migrations
│   │   │   └── 20240829015524_create_measures_table.ts
│   │   └── seeds
│   ├── errors
│   │   ├── base-error.ts
│   │   ├── index.ts
│   │   ├── internal-error.ts
│   │   ├── invalid-data.ts
│   │   ├── measure-already-confirmed.ts
│   │   ├── measure-already-exists.ts
│   │   ├── measure-not-found.ts
│   │   └── measures-not-found.ts
│   ├── interfaces
│   │   ├── index.ts
│   │   ├── llm-interface.ts
│   │   └── measure-interface.ts
│   ├── llm
│   │   ├── gen-ai-model.ts
│   │   └── index.ts
│   ├── middlewares
│   │   ├── confirm-validation.ts
│   │   ├── index.ts
│   │   ├── list-validation.ts
│   │   └── upload-validation.ts
│   ├── models
│   │   ├── index.ts
│   │   └── measure-model.ts
│   ├── routes.ts
│   ├── services
│   │   ├── index.ts
│   │   ├── llm-service.ts
│   │   └── measure-service.ts
│   ├── tests
│   │   ├── get.test.ts
│   │   ├── mocks
│   │   │   ├── index.ts
│   │   │   ├── measure-db.ts
│   │   │   └── measure-request-body.ts
│   │   ├── patch.test.ts
│   │   └── post.test.ts
│   └── utils
│       ├── files.ts
│       └── index.ts
└── tsconfig.json
```

## Testes de Integração

Para rodar os testes é necessário que o servidor esteja executando, depois use o comando `npm test` 

Foram implementados os seguintes casos:

**GET /\<customer code>/list**

- should return 200 and a valid response when data is correct and has no params
- should return 200 a valid response when data is correct and has param equal to "WaTeR" (case insensitive)
- should return 200 a valid response when data is correct and has param equal to "gAs" (case insensitive)
- should return 400 if type is invalid
- should return 404 if no measures exists

**PATCH /confirm**

- should return 200 and a valid response when data is correct
- should return 400 if uuid is invalid
- should return 400 if confirmed value is invalid
- should return 404 if measure does not exist
- should return 409 if measure is already confirmed

**POST /upload**

- should return 200 and a valid response when data is correct
- should return 400 if image base64 is invalid
- should return 400 if customer code is invalid
- should return 400 if datetime is invalid
- should return 400 if type is invalid
- should return 409 if reading already exists for the month
- should return 500 if for internal error

## Documentação

A documentação da **API** foi feita utilizando o [Swagger](https://swagger.io/) e é exibida quando o usuário acessa a rota `/`.
