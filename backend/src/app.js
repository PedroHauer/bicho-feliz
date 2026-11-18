import express from 'express';
import { petRepository } from './petRepository.js';
import { validatePet } from './petRules.js';

export function createApp() {
  const app = express();

  app.use(express.json());
  app.use((request, response, next) => {
    response.header('Access-Control-Allow-Origin', '*');
    response.header('Access-Control-Allow-Headers', 'Content-Type');
    response.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
    if (request.method === 'OPTIONS') return response.sendStatus(204);
    next();
  });

  app.get('/api/pets', (request, response) => {
    const pets = request.query.search
      ? petRepository.search(String(request.query.search))
      : petRepository.findAll();
    response.json(pets);
  });

  app.get('/api/pets/:id', (request, response) => {
    const pet = petRepository.findById(Number(request.params.id));
    if (!pet) return response.status(404).json({ message: 'Animal não encontrado.' });
    response.json(pet);
  });

  app.post('/api/pets', (request, response) => {
    const errors = validatePet(request.body);
    if (errors.length) return response.status(400).json({ errors });

    const pet = petRepository.create(request.body);
    response.status(201).json(pet);
  });

  app.put('/api/pets/:id', (request, response) => {
    const id = Number(request.params.id);
    if (!petRepository.findById(id)) {
      return response.status(404).json({ message: 'Animal não encontrado.' });
    }

    const errors = validatePet(request.body);
    if (errors.length) return response.status(400).json({ errors });

    response.json(petRepository.update(id, request.body));
  });

  app.delete('/api/pets/:id', (request, response) => {
    const removed = petRepository.delete(Number(request.params.id));
    if (!removed) return response.status(404).json({ message: 'Animal não encontrado.' });
    response.status(204).send();
  });

  return app;
}
