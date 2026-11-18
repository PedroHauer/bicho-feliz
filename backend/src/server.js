import fs from 'node:fs';
import path from 'node:path';
import { initializeDatabase, closeDatabase } from './database.js';
import { createApp } from './app.js';
import { seedDatabase } from './seed.js';

const dataDirectory = path.resolve('data');
fs.mkdirSync(dataDirectory, { recursive: true });
initializeDatabase();

const count = (await import('./petRepository.js')).petRepository.findAll().length;
if (count === 0) {
  seedDatabase((await import('./database.js')).db);
}

const port = Number(process.env.PORT) || 3001;
const server = createApp().listen(port, () => {
  console.log(`API Bicho Feliz disponível em http://localhost:${port}`);
});

function shutdown() {
  server.close();
  closeDatabase();
}

process.on('SIGINT', shutdown);
process.on('SIGTERM', shutdown);
