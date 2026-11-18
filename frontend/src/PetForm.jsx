import { useEffect, useState } from 'react';

const emptyPet = { name: '', species: '', breed: '', age: 0, description: '' };

export default function PetForm({ pet, onSave, onCancel }) {
  const [form, setForm] = useState(emptyPet);

  useEffect(() => {
    setForm(pet ? { ...pet } : emptyPet);
  }, [pet]);

  function update(event) {
    const { name, value } = event.target;
    setForm((current) => ({ ...current, [name]: name === 'age' ? Number(value) : value }));
  }

  function submit(event) {
    event.preventDefault();
    onSave(form);
  }

  return (
    <form className="pet-form" onSubmit={submit}>
      <h2>{pet ? 'Editar animal' : 'Novo animal'}</h2>
      <label>Nome<input name="name" value={form.name} onChange={update} required /></label>
      <label>Espécie<input name="species" value={form.species} onChange={update} required /></label>
      <label>Raça<input name="breed" value={form.breed} onChange={update} required /></label>
      <label>Idade<input name="age" type="number" min="0" step="1" value={form.age} onChange={update} required /></label>
      <label>Descrição<textarea name="description" value={form.description} onChange={update} required /></label>
      <div className="form-actions">
        <button type="submit">Salvar</button>
        {onCancel && <button type="button" className="secondary" onClick={onCancel}>Cancelar</button>}
      </div>
    </form>
  );
}
