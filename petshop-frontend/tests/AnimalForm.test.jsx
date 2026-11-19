// Testes do componente AnimalForm (formulário de cadastro/edição de animais).

import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import AnimalForm from '../src/components/AnimalForm';

// Observação: no componente, o botão de salvar muda de nome conforme o modo:
// - no cadastro (sem animal nas props) ele se chama "Cadastrar animal";
// - na edição (animal com id em valoresIniciais) ele se chama "Salvar alterações".
// Por isso o Teste 11 foi separado em dois: um para cada modo.

describe('Formulário de cadastro de animais', () => {
  test('Teste 11a – no modo de cadastro deve exibir os campos Nome, Espécie, Raça, Data de Nascimento, Tutor e o botão "Cadastrar animal"', () => {
    render(<AnimalForm onSalvar={jest.fn()} onCancelar={jest.fn()} />);

    // Campos do formulário, encontrados pelo texto do <label> associado.
    expect(screen.getByLabelText('Nome do animal')).toBeInTheDocument();
    expect(screen.getByLabelText('Espécie')).toBeInTheDocument();
    expect(screen.getByLabelText('Raça')).toBeInTheDocument();
    expect(screen.getByLabelText('Data de nascimento')).toBeInTheDocument();
    expect(screen.getByLabelText('Nome do tutor')).toBeInTheDocument();

    // Botão de salvar no modo de cadastro.
    expect(screen.getByRole('button', { name: 'Cadastrar animal' })).toBeInTheDocument();
  });

  test('Teste 11b – no modo de edição deve exibir o botão "Salvar alterações"', () => {
    const animal = {
      id: 1,
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Vira-lata',
      data_nascimento: '2020-05-10',
      nome_tutor: 'Maria Silva',
    };

    render(<AnimalForm valoresIniciais={animal} onSalvar={jest.fn()} onCancelar={jest.fn()} />);

    expect(screen.getByRole('button', { name: 'Salvar alterações' })).toBeInTheDocument();
  });

  test('clicar em "Cadastrar animal" com o formulário vazio deve mostrar as mensagens de validação e não chamar onSalvar', async () => {
    const usuario = userEvent.setup();
    const onSalvar = jest.fn();
    render(<AnimalForm onSalvar={onSalvar} onCancelar={jest.fn()} />);

    await usuario.click(screen.getByRole('button', { name: 'Cadastrar animal' }));

    expect(screen.getByText('Informe o nome do animal.')).toBeInTheDocument();
    expect(screen.getByText('Selecione a espécie: Cão, Gato ou Outro.')).toBeInTheDocument();
    expect(screen.getByText('Informe o nome do tutor.')).toBeInTheDocument();
    expect(onSalvar).not.toHaveBeenCalled();
  });

  test('preencher os campos e clicar em "Cadastrar animal" deve chamar onSalvar com os dados informados', async () => {
    const usuario = userEvent.setup();
    const onSalvar = jest.fn().mockResolvedValue(true);
    render(<AnimalForm onSalvar={onSalvar} onCancelar={jest.fn()} />);

    await usuario.type(screen.getByLabelText('Nome do animal'), 'Rex');
    await usuario.selectOptions(screen.getByLabelText('Espécie'), 'Cão');
    await usuario.type(screen.getByLabelText('Raça'), 'Vira-lata');
    await usuario.type(screen.getByLabelText('Data de nascimento'), '2020-05-10');
    await usuario.type(screen.getByLabelText('Nome do tutor'), 'Maria Silva');
    await usuario.click(screen.getByRole('button', { name: 'Cadastrar animal' }));

    expect(onSalvar).toHaveBeenCalledTimes(1);
    expect(onSalvar).toHaveBeenCalledWith({
      nome: 'Rex',
      especie: 'Cão',
      raca: 'Vira-lata',
      data_nascimento: '2020-05-10',
      nome_tutor: 'Maria Silva',
    });
  });
});
