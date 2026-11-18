export const examplePets = [
  {
    name: 'Luna',
    species: 'Cachorro',
    breed: 'Vira-lata',
    age: 2,
    description: 'Muito dócil, brincalhona e sociável com crianças.'
  },
  {
    name: 'Milo',
    species: 'Gato',
    breed: 'SRD',
    age: 1,
    description: 'Curioso e tranquilo, ideal para apartamentos.'
  },
  {
    name: 'Bella',
    species: 'Cachorro',
    breed: 'Beagle',
    age: 3,
    description: 'Cheia de energia e apaixonada por passeios.'
  }
];

export function seedDatabase(database) {
  const insert = database.prepare(`
    INSERT INTO pets (name, species, breed, age, description)
    VALUES (?, ?, ?, ?, ?)
  `);

  for (const pet of examplePets) {
    insert.run(pet.name, pet.species, pet.breed, pet.age, pet.description);
  }
}
