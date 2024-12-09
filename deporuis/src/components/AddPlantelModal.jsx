import React, { useState } from 'react';

const AddPlantelModal = ({ isOpen, onClose, seleccionId, onPlantelUpdate }) => {
  const [formData, setFormData] = useState({
    nombre: '',
    apellidos: '',
    correoInstitucional: '',
    fechaDeNacimiento: '',
    peso: '',
    altura: '',
    posicion: '',
    dorsal: '',
    idRol: '2',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    fetch('http://localhost:3000/api/persona/crear', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    })
      .then((response) => response.json())
      .then((data) => {
        const idPersona = data.idPersona;

        return fetch('http://localhost:3000/api/plantel/crear', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            idPersona,
            idSeleccion: seleccionId,
          }),
        });
      })
      .then(() => {
        alert('Persona añadida exitosamente al plantel');
        setFormData({
          nombre: '',
          apellidos: '',
          correoInstitucional: '',
          fechaDeNacimiento: '',
          peso: '',
          altura: '',
          posicion: '',
          dorsal: '',
          idRol: '2',
        });
        if (onPlantelUpdate) onPlantelUpdate();
        onClose();
      })
      .catch((error) => {
        console.error('Error al añadir al plantel:', error);
        alert('Error al añadir al plantel');
      });
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Añadir al Plantel</h2>
        <form
          onSubmit={handleSubmit}
          className="overflow-y-auto max-h-[80vh]"
        >
          <div className="grid grid-cols-1 gap-4">
            {Object.keys(formData).map((key) => (
              <div key={key}>
                <label htmlFor={key} className="block text-sm font-medium text-gray-700">
                  {key.charAt(0).toUpperCase() + key.slice(1)}
                </label>
                <input
                  id={key}
                  name={key}
                  type="text"
                  value={formData[key]}
                  onChange={handleChange}
                  className="w-full border-gray-300 rounded-md shadow-sm py-2"
                />
              </div>
            ))}
          </div>
          <div className="mt-6">
            <button type="submit" className="w-full rounded-md bg-indigo-600 text-white py-2">
              Añadir al Plantel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AddPlantelModal;
