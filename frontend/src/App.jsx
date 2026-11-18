import { useEffect, useState } from 'react';
import { petsApi } from './api.js';
import PetCard from './PetCard.jsx';
import PetForm from './PetForm.jsx';

export default function App() {
  const [pets, setPets] = useState([]);
  const [search, setSearch] = useState('');
  const [selected, setSelected] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const [error, setError] = useState('');

  async function loadPets(term = '') {
    try {
      setError('');
      setPets(await petsApi.list(term));
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  useEffect(() => { loadPets(); }, []);

  function edit(pet) {
    setSelected(pet);
    setShowForm(true);
  }

  async function save(pet) {
    try {
      setError('');
      if (selected) await petsApi.update(selected.id, pet);
      else await petsApi.create(pet);
      setShowForm(false);
      setSelected(null);
      await loadPets(search);
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  async function remove(id) {
    if (!window.confirm('Deseja excluir este animal?')) return;
    try {
      setError('');
      await petsApi.remove(id);
      await loadPets(search);
    } catch (caughtError) {
      setError(caughtError.message);
    }
  }

  function searchPets(event) {
    event.preventDefault();
    loadPets(search);
  }

  return (
    <main>
      <header>
        <div>
          <p className="eyebrow">Projeto didático</p>
          <h1>Bicho Feliz</h1>
        </div>
        <button type="button" onClick={() => { setSelected(null); setShowForm(true); }}>
          Adicionar animal
        </button>
      </header>

      <form className="search" onSubmit={searchPets}>
        <input
          aria-label="Buscar animais"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
          placeholder="Buscar por nome, espécie ou raça"
        />
        <button type="submit">Buscar</button>
      </form>

      {error && <p className="error" role="alert">{error}</p>}

      {showForm && (
        <PetForm
          pet={selected}
          onSave={save}
          onCancel={() => { setShowForm(false); setSelected(null); }}
        />
      )}

      <section className="pet-grid" aria-label="Lista de animais">
        {pets.map((pet) => (
          <PetCard key={pet.id} pet={pet} onEdit={edit} onDelete={remove} />
        ))}
        {!pets.length && !error && <p>Nenhum animal encontrado.</p>}
      </section>
    </main>
  );
}
