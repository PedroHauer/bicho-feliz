# Bicho Feliz — Frontend

Interface web didática do projeto Bicho Feliz.

## Tecnologias

- React
- Vite
- JavaScript
- CSS

Não utiliza serviços externos ou APIs de terceiros; a comunicação ocorre apenas com o backend local.

## Pré-requisitos

- Node.js 24 ou superior
- npm
- Backend disponível em `http://localhost:3001`

## Instalação

```bash
npm install
```

## Iniciar

```bash
npm run dev
```

Aplicação disponível em `http://localhost:5173`.

A URL da API pode ser alterada por `VITE_API_URL`.

## Executar testes

```bash
npm test
```

## Estrutura de pastas

```text
frontend/
├── src/
│   ├── api.js          # comunicação com a API
│   ├── App.jsx         # composição da aplicação
│   ├── mockData.js     # dados de exemplo para componentes isolados
│   ├── PetCard.jsx     # componente de cartão
│   ├── PetForm.jsx     # componente de formulário
│   ├── main.jsx        # ponto de entrada
│   └── styles.css
├── index.html
└── package.json
```
