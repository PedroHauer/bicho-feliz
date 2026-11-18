export default function PetCard({ pet, onEdit, onDelete }) {
  return (
    <article className="pet-card">
      <div className="pet-avatar" aria-hidden="true">{pet.name.charAt(0).toUpperCase()}</div>
      <h2>{pet.name}</h2>
      <p className="pet-meta">{pet.species} · {pet.breed}</p>
      <p>{pet.age} {pet.age === 1 ? 'ano' : 'anos'} · {pet.description}</p>
      <div className="card-actions">
        {onEdit && <button type="button" onClick={() => onEdit(pet)}>Editar</button>}
        {onDelete && <button type="button" className="danger" onClick={() => onDelete(pet.id)}>Excluir</button>}
      </div>
    </article>
  );
}
