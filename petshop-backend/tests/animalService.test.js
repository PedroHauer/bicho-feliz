// Testes unitários do cadastro de animais (regra de negócio: animalService + animalValidator).
// Nos testes 01 a 04 o repositório é falso (jest.fn), então eles não usam banco de dados.
// O complemento do Teste 01 usa um banco SQLite em memória para confirmar que o animal é salvo.

const { criarAnimalService } = require('../src/services/animalService');
const { criarAnimalRepository } = require('../src/repositories/animalRepository');
const { criarVacinacaoRepository } = require('../src/repositories/vacinacaoRepository');
const { criarBancoEmMemoria } = require('../src/database/connection');
const { ErroValidacao } = require('../src/utils/erros');
const MSG = require('../src/utils/mensagens');

// Data de referência fixa para os testes não dependerem do relógio.
const DATA_REFERENCIA = '2026-01-15';

// Cria dados válidos novos a cada chamada; cada teste altera só o que precisa.
function criarDadosValidos() {
  return {
    nome: 'Rex',
    especie: 'Cão',
    raca: 'Vira-lata',
    data_nascimento: '2020-05-10',
    nome_tutor: 'Maria Silva',
  };
}

// Cria um service novo com um repositório falso novo, para que um teste não interfira no outro.
function criarServiceComRepositorioFalso() {
  const animalRepository = {
    inserir: jest.fn((dados) => ({ id: 1, ...dados })),
  };
  const vacinacaoRepository = {};
  const service = criarAnimalService({ animalRepository, vacinacaoRepository });
  return { service, animalRepository };
}

// Executa a função e devolve o erro lançado (ou falha se nenhum erro for lançado).
function capturarErro(funcao) {
  try {
    funcao();
  } catch (erro) {
    return erro;
  }
  throw new Error('Era esperado que um erro fosse lançado, mas nenhum foi.');
}

describe('Cadastro de animais', () => {
  test('Teste 01 – cadastro com todos os dados válidos deve cadastrar o animal', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const dados = criarDadosValidos();

    const animal = service.cadastrarAnimal(dados, DATA_REFERENCIA);

    expect(animalRepository.inserir).toHaveBeenCalledTimes(1);
    expect(animalRepository.inserir).toHaveBeenCalledWith({
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Vira-lata',
      data_nascimento: '2020-05-10',
      nome_tutor: 'Maria Silva',
    });
    expect(animal).toEqual({ id: 1, ...dados });
  });

  test('Teste 02 – cadastro sem nome deve ser rejeitado', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const dados = { ...criarDadosValidos(), nome: '' };

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.erros).toContainEqual({ campo: 'nome', mensagem: MSG.ANIMAL_NOME_OBRIGATORIO });
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });

  test('Teste 03 – cadastro sem nome do tutor deve ser rejeitado', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const dados = { ...criarDadosValidos(), nome_tutor: '' };

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.erros).toContainEqual({ campo: 'nome_tutor', mensagem: MSG.ANIMAL_TUTOR_OBRIGATORIO });
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });

  test('Teste 04 – cadastro com espécie diferente de Cão, Gato ou Outro deve ser rejeitado', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const dados = { ...criarDadosValidos(), especie: 'Pássaro' };

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.erros).toContainEqual({ campo: 'especie', mensagem: MSG.ANIMAL_ESPECIE_INVALIDA });
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });
});

// Cenários complementares: reforçam os testes 01 a 04 com casos de borda.
describe('Cadastro de animais – cenários complementares', () => {
  test('Teste 01 (complemento) – animal válido deve ficar salvo no banco de dados', () => {
    // Banco SQLite novo e vazio, só em memória, criado para este teste.
    const db = criarBancoEmMemoria();
    const service = criarAnimalService({
      animalRepository: criarAnimalRepository(db),
      vacinacaoRepository: criarVacinacaoRepository(db),
    });

    const cadastrado = service.cadastrarAnimal(criarDadosValidos(), DATA_REFERENCIA);

    expect(cadastrado.id).toEqual(expect.any(Number));
    expect(service.consultarAnimal(cadastrado.id)).toEqual({
      id: cadastrado.id,
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Vira-lata',
      data_nascimento: '2020-05-10',
      nome_tutor: 'Maria Silva',
    });
    expect(service.listarAnimais()).toHaveLength(1);

    db.close();
  });

  test.each(['Cão', 'Gato', 'Outro'])(
    'Teste 04 (complemento) – cadastro com a espécie permitida "%s" deve ser aceito',
    (especie) => {
      const { service, animalRepository } = criarServiceComRepositorioFalso();
      const dados = { ...criarDadosValidos(), especie };

      service.cadastrarAnimal(dados, DATA_REFERENCIA);

      expect(animalRepository.inserir).toHaveBeenCalledWith(expect.objectContaining({ especie }));
    }
  );

  test('Teste 02 (complemento) – cadastro com nome contendo apenas espaços deve ser rejeitado', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const dados = { ...criarDadosValidos(), nome: '   ' };

    const erro = capturarErro(() => service.cadastrarAnimal(dados, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.erros).toContainEqual({ campo: 'nome', mensagem: MSG.ANIMAL_NOME_OBRIGATORIO });
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });

  test('Teste 03 (complemento) – cadastro sem o campo nome_tutor no objeto deve ser rejeitado', () => {
    const { service, animalRepository } = criarServiceComRepositorioFalso();
    const { nome_tutor, ...dadosSemTutor } = criarDadosValidos();

    const erro = capturarErro(() => service.cadastrarAnimal(dadosSemTutor, DATA_REFERENCIA));

    expect(erro).toBeInstanceOf(ErroValidacao);
    expect(erro.erros).toContainEqual({ campo: 'nome_tutor', mensagem: MSG.ANIMAL_TUTOR_OBRIGATORIO });
    expect(animalRepository.inserir).not.toHaveBeenCalled();
  });
});
