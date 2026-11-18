const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001/api';

async function request(path, options = {}) {
  const response = await fetch(`${API_URL}${path}`, {
    ...options,
    headers: { 'Content-Type': 'application/json', ...options.headers }
  });

  if (response.status === 204) return null;

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || data.errors?.join(' ') || 'Erro na requisição.');
  }
  return data;
}

export const petsApi = {
  list: (search = '') => request(`/pets${search ? `?search=${encodeURIComponent(search)}` : ''}`),
  create: (pet) => request('/pets', { method: 'POST', body: JSON.stringify(pet) }),
  update: (id, pet) => request(`/pets/${id}`, { method: 'PUT', body: JSON.stringify(pet) }),
  remove: (id) => request(`/pets/${id}`, { method: 'DELETE' })
};
