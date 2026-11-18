export function validatePet(pet) {
  const errors = [];

  if (!pet.name?.trim()) errors.push('O nome é obrigatório.');
  if (!pet.species?.trim()) errors.push('A espécie é obrigatória.');
  if (!pet.breed?.trim()) errors.push('A raça é obrigatória.');
  if (!Number.isInteger(Number(pet.age)) || Number(pet.age) < 0) {
    errors.push('A idade deve ser um número inteiro igual ou maior que zero.');
  }
  if (!pet.description?.trim()) errors.push('A descrição é obrigatória.');

  return errors;
}
