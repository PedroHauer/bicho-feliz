# Petshop Frontend – Gerenciamento de Vacinas

Interface em React (português brasileiro) que consome a API do **petshop-backend**.
Projeto **didático**: foi organizado para que os alunos escrevam **testes de componentes** (Jest + React Testing Library). Os testes do formulário de animais estão em `tests/AnimalForm.test.jsx`.

## Tecnologias

- React 18 (componentes funcionais e Hooks)
- Vite
- JavaScript
- Fetch API (comunicação com o Backend)
- Jest, React Testing Library e Jest DOM

## Pré-requisitos

- Node.js 18+ e npm.
- Backend (`petshop-backend`) em execução em `http://localhost:3001` (veja o README dele).

## Instalação

```bash
npm install
```

## Iniciar a aplicação

```bash
npm run dev
```

Acesse **http://localhost:5173**. O Vite encaminha as chamadas `/api/...` para `http://localhost:3001` (configurado em `vite.config.js`), então não há problemas de CORS.

## Executar os testes

```bash
npm test
```

Testes implementados (`tests/AnimalForm.test.jsx`):

| Teste | Cenário | Resultado esperado |
|---|---|---|
| 11a | Formulário no modo de cadastro | Campos Nome do animal, Espécie, Raça, Data de nascimento e Nome do tutor, e botão "Cadastrar animal" |
| 11b | Formulário no modo de edição (animal com `id` nas props) | Botão "Salvar alterações" |
| 11 (interação) | Clicar em "Cadastrar animal" com o formulário vazio | Mensagens de validação aparecem e `onSalvar` não é chamado |
| 11 (interação) | Preencher os campos e clicar em "Cadastrar animal" | `onSalvar` é chamado com os dados digitados |

Observação: o botão de salvar do `AnimalForm` se chama "Cadastrar animal" no modo de cadastro e "Salvar alterações" no modo de edição. Por isso o Teste 11 verifica os dois modos. As interações usam `@testing-library/user-event`.
Modo interativo: `npm run test:watch`.

## Estrutura de pastas

```
petshop-frontend/
├── src/
│   ├── components/   # formulários, listagens e peças de interface (recebem dados por props)
│   ├── pages/        # telas: Dashboard, Animais, Vacinas, HistoricoVacinacao
│   ├── services/     # chamadas HTTP ao Backend (fáceis de simular com jest.mock)
│   ├── hooks/        # useCarregarDados
│   ├── utils/        # funções puras: validações de formulário, datas, dashboard, status
│   ├── App.jsx       # navegação entre as telas
│   ├── main.jsx
│   └── styles.css
├── tests/
│   └── config/       # setupTests.js (jest-dom) e styleMock.js
├── babel.config.cjs / jest.config.cjs / vite.config.js
└── package.json
```

## Telas

1. **Dashboard** – quantidade de animais, vacinas, vacinações vencidas, em dia e que vencem hoje.
2. **Animais** – formulário, listagem, editar e excluir (o Backend bloqueia a exclusão se houver vacinações).
3. **Vacinas** – formulário, listagem, editar e excluir.
4. **Histórico de vacinação** – seleciona o animal, mostra vacina, data da aplicação, próxima dose e status; permite registrar nova vacinação.

## Dicas para os testes

- **Componentes isolados**: `AnimalForm`, `AnimalList`, `VacinaForm`, `VacinaList`, `VacinacaoForm`, `VacinacaoList`, `StatusVacinacao`, `ResumoDashboard` e `Mensagem` não dependem da API; basta passar props de exemplo.
- **Localizando elementos**: campos têm `<label>` associado (`getByLabelText('Nome do animal')`), botões têm nomes claros (`getByRole('button', { name: 'Cadastrar animal' })`) e mensagens usam `role="alert"` (erros) ou `role="status"` (sucesso).
- **Páginas**: simule os services com `jest.mock('../src/services/animalService')` para não chamar a API.
- **Funções puras** em `src/utils/` (`validarFormularioAnimal`, `calcularResumoDashboard`, `obterIndicadorStatus`, `formatarDataBR`...) podem ser testadas sem renderizar nada.
- O **status** da vacinação (`Vencida`, `Em dia`, `Vence Hoje`) vem pronto do Backend; o Frontend apenas o apresenta.

| Elemento | Texto esperado |
|---|---|
| Lista de animais vazia | "Nenhum animal cadastrado." |
| Lista de vacinas vazia | "Nenhuma vacina cadastrada." |
| Histórico vazio | "Este animal ainda não possui vacinações registradas." |
| Sucesso ao cadastrar | "Animal cadastrado com sucesso.", "Vacina cadastrada com sucesso.", "Vacinação registrada com sucesso." |
