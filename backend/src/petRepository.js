import { db } from './database.js';

export const petRepository = {
  findAll() {
    return db.prepare('SELECT * FROM pets ORDER BY id').all();
  },

  findById(id) {
    return db.prepare('SELECT * FROM pets WHERE id = ?').get(id);
  },

  search(term) {
    const query = `%${term.toLowerCase()}%`;
    return db.prepare(`
      SELECT * FROM pets
      WHERE lower(name) LIKE ? OR lower(species) LIKE ? OR lower(breed) LIKE ?
      ORDER BY id
    `).all(query, query, query);
  },

  create(pet) {
    const result = db.prepare(`
      INSERT INTO pets (name, species, breed, age, description)
      VALUES (?, ?, ?, ?, ?)
    `).run(pet.name.trim(), pet.species.trim(), pet.breed.trim(), Number(pet.age), pet.description.trim());

    return this.findById(Number(result.lastInsertRowid));
  },

  update(id, pet) {
    db.prepare(`
      UPDATE pets
      SET name = ?, species = ?, breed = ?, age = ?, description = ?
      WHERE id = ?
    `).run(pet.name.trim(), pet.species.trim(), pet.breed.trim(), Number(pet.age), pet.description.trim(), id);

    return this.findById(id);
  },

  delete(id) {
    return db.prepare('DELETE FROM pets WHERE id = ?').run(id).changes > 0;
  }
};
