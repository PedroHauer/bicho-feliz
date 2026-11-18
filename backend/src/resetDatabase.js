import fs from 'node:fs';
import path from 'node:path';
import { DatabaseSync } from 'node:sqlite';
import { examplePets } from './seed.js';

const databasePath = process.env.DB_FILE || path.resolve('data', 'bicho-feliz.db');
fs.mkdirSync(path.dirname(databasePath), { recursive: true });

if (fs.existsSync(databasePath)) {
  fs.rmSync(databasePath);
}

const db = new DatabaseSync(databasePath);
db.exec(`
  CREATE TABLE pets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    name TEXT NOT NULL,
    species TEXT NOT NULL,
    breed TEXT NOT NULL,
    age INTEGER NOT NULL,
    description TEXT NOT NULL
  )
`);

const insert = db.prepare(`
  INSERT INTO pets (name, species, breed, age, description)
  VALUES (?, ?, ?, ?, ?)
`);

for (const pet of examplePets) {
  insert.run(pet.name, pet.species, pet.breed, pet.age, pet.description);
}

db.close();
console.log(`Banco reinicializado em ${databasePath}`);
