# Bicho Feliz — Backend

API REST local desenvolvida para o projeto didático Bicho Feliz.

## Tecnologias

- Node.js
- Express
- SQLite nativo (`node:sqlite`)
- Node Test Runner

Não utiliza serviços externos ou APIs de terceiros.

## Pré-requisitos

- Node.js 24 ou superior
- npm

## Instalação

```bash
npm install
```

## Reinicialização do banco

```bash
npm run reset-db
```

O comando recria o arquivo `data/bicho-feliz.db` com dados de exemplo.

## Iniciar

```bash
npm start
```

API disponível em `http://localhost:3001/api`.

## Executar testes

```bash
npm test
```

## Endpoints

- `GET /api/pets`
- `GET /api/pets?search=termo`
- `GET /api/pets/:id`
- `POST /api/pets`
- `PUT /api/pets/:id`
- `DELETE /api/pets/:id`

## Estrutura de pastas

```text
backend/
├── src/
│   ├── app.js           # configuração da API
│   ├── database.js      # conexão SQLite
│   ├── petRepository.js # acesso aos dados
│   ├── petRules.js      # validações das regras
│   ├── resetDatabase.js # reinicialização do banco
│   ├── seed.js          # dados de exemplo
│   └── server.js        # inicialização do servidor
└── package.json
```
