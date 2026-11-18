# Bicho Feliz

Aplicação didática dividida em Backend e Frontend para praticar testes unitários e testes de componentes.

## Projetos

- `backend`: API REST em Node.js, Express e SQLite local.
- `frontend`: interface em React e Vite.

Os projetos não usam autenticação, pagamentos, agendamentos ou APIs externas. Não há testes implementados; os scripts `npm test` foram deixados prontos para uso didático.

## Como executar

### Backend

```bash
cd backend
npm install
npm run reset-db
npm start
```

API: `http://localhost:3001/api`

Endpoints principais:

- `GET /api/pets`
- `GET /api/pets?search=termo`
- `GET /api/pets/:id`
- `POST /api/pets`
- `PUT /api/pets/:id`
- `DELETE /api/pets/:id`

### Frontend

Em outro terminal:

```bash
cd frontend
npm install
npm run dev
```

Interface: `http://localhost:5173`

## Pré-requisitos

- Node.js 24 ou superior
- npm

## Reinicialização do banco

```bash
cd backend
npm run reset-db
```

## Testes

Execute separadamente em cada projeto:

```bash
npm test
```

## Estrutura

```text
bicho-feliz/
├── backend/
│   ├── src/
│   │   ├── app.js
│   │   ├── database.js
│   │   ├── petRepository.js
│   │   ├── petRules.js
│   │   ├── resetDatabase.js
│   │   ├── seed.js
│   │   └── server.js
│   └── package.json
├── frontend/
│   ├── src/
│   │   ├── api.js
│   │   ├── App.jsx
│   │   ├── mockData.js
│   │   ├── PetCard.jsx
│   │   ├── PetForm.jsx
│   │   └── main.jsx
│   ├── index.html
│   └── package.json
└── README.md
```
