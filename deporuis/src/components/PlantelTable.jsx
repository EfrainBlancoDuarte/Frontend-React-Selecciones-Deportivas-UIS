import React, { useState, useEffect } from 'react';

const PlantelTable = ({ seleccionId, reloadFlag }) => {
  const [plantel, setPlantel] = useState([]);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    posicion: '',
    dorsal: '',
  });

  const handleError = (error, message = 'Ocurrió un error') => {
    console.error(message, error);
    alert(message);
  };

  useEffect(() => {
    const fetchPlantel = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/plantel/listarPorSeleccion/${seleccionId}`);
        if (!response.ok) throw new Error('Error al obtener el plantel');

        const data = await response.json();
        const personas = await Promise.all(
          data.map(async (item) => {
            const personaResponse = await fetch(`http://localhost:3000/api/persona/${item.idPersona}`);
            if (!personaResponse.ok) throw new Error('Error al obtener los datos de una persona');
            const persona = await personaResponse.json();
            return { idPersona: item.idPersona, ...persona };
          })
        );

        setPlantel(personas);
      } catch (error) {
        handleError(error, 'Error al cargar el plantel');
      }
    };

    if (seleccionId) fetchPlantel();
  }, [seleccionId, reloadFlag]); // Recargar cuando cambie reloadFlag

  const handleEdit = (persona) => {
    setEditingId(persona.idPersona);
    setFormData({
      nombre: persona.nombre || '',
      apellidos: persona.apellidos || '',
      posicion: persona.posicion || '',
      dorsal: persona.dorsal || '',
    });
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setFormData({
      nombre: '',
      apellidos: '',
      posicion: '',
      dorsal: '',
    });
  };

  const handleSaveEdit = async () => {
    if (!editingId) {
      handleError(null, 'No se puede guardar porque editingId es nulo.');
      return;
    }

    try {
      const response = await fetch(`http://localhost:3000/api/persona/${editingId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Error al guardar los cambios');
      const text = await response.text();

      setPlantel((prev) =>
        prev.map((p) => (p.idPersona === editingId ? { ...p, ...formData } : p))
      );

      setEditingId(null);
      setFormData({
        nombre: '',
        apellidos: '',
        posicion: '',
        dorsal: '',
      });
      alert('Cambios guardados correctamente.');
    } catch (error) {
      handleError(error, 'Hubo un error al guardar los cambios.');
    }
  };

  const handleDelete = async (idPersona) => {
    if (window.confirm('¿Estás seguro de que deseas eliminar esta persona?')) {
      try {
        const response = await fetch(`http://localhost:3000/api/persona/${idPersona}`, {
          method: 'DELETE',
        });

        if (!response.ok) throw new Error('Error al eliminar la persona');
        setPlantel((prev) => prev.filter((p) => p.idPersona !== idPersona));
        alert('Persona eliminada correctamente.');
      } catch (error) {
        handleError(error, 'Hubo un error al eliminar la persona.');
      }
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  return (
    <table className="min-w-full divide-y divide-gray-200 bg-white shadow-lg rounded-lg">
      <thead className="bg-gray-50">
        <tr>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Nombre</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Apellido</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Posición</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Dorsal</th>
          <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Acciones</th>
        </tr>
      </thead>
      <tbody className="bg-white divide-y divide-gray-200">
        {plantel.map((persona) => (
          <tr key={persona.idPersona}>
            <td className="px-6 py-4">
              {editingId === persona.idPersona ? (
                <input
                  type="text"
                  name="nombre"
                  value={formData.nombre || ''}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                persona.nombre
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === persona.idPersona ? (
                <input
                  type="text"
                  name="apellidos"
                  value={formData.apellidos || ''}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                persona.apellidos
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === persona.idPersona ? (
                <input
                  type="text"
                  name="posicion"
                  value={formData.posicion || ''}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                persona.posicion
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === persona.idPersona ? (
                <input
                  type="text"
                  name="dorsal"
                  value={formData.dorsal || ''}
                  onChange={handleInputChange}
                  className="px-2 py-1 border border-gray-300 rounded"
                />
              ) : (
                persona.dorsal
              )}
            </td>
            <td className="px-6 py-4">
              {editingId === persona.idPersona ? (
                <>
                  <button
                    onClick={handleSaveEdit}
                    className="text-green-500 hover:text-green-700 mr-2"
                  >
                    💾
                  </button>
                  <button
                    onClick={handleCancelEdit}
                    className="text-red-500 hover:text-red-700"
                  >
                    ❌
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() => handleEdit(persona)}
                    className="text-yellow-500 hover:text-yellow-700 mr-2"
                  >
                    ✏️
                  </button>
                  <button
                    onClick={() => handleDelete(persona.idPersona)}
                    className="text-red-500 hover:text-red-700"
                  >
                    🗑️
                  </button>
                </>
              )}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default PlantelTable;
