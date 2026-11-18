import { DatabaseSync } from 'node:sqlite';
import path from 'node:path';

const databasePath = process.env.DB_FILE || path.resolve('data', 'bicho-feliz.db');

export const db = new DatabaseSync(databasePath);

export function initializeDatabase() {
  db.exec(`
    CREATE TABLE IF NOT EXISTS pets (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL,
      species TEXT NOT NULL,
      breed TEXT NOT NULL,
      age INTEGER NOT NULL,
      description TEXT NOT NULL
    )
  `);
}

export function closeDatabase() {
  db.close();
}
