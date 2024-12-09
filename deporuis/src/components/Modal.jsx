import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, reloadSelections }) => {
  const [deporte, setDeporte] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault(); // Prevenir el comportamiento por defecto del formulario

    if (deporte) {
      fetch('http://localhost:3000/api/seleccion/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ deporte }),
      })
        .then((response) => {
          if (!response.ok) {
            return response.text().then((errorMessage) => {
              throw new Error(`Error al crear la selección: ${errorMessage}`);
            });
          }
          return response.text(); // Manejar la respuesta como texto
        })
        .then((data) => {
          console.log('Mensaje del servidor:', data);
          alert('Selección creada con éxito'); // Mostrar mensaje de éxito
          setDeporte(''); // Reiniciar el campo de entrada
          onClose(); // Cerrar el modal
          reloadSelections(); // Recargar la lista de selecciones
        })
        .catch((error) => {
          console.error('Error al crear la selección:', error.message);
          setErrorMessage(`Hubo un error al crear la selección: ${error.message}`);
        });
    } else {
      alert('Por favor, ingresa el nombre del deporte.');
    }
  };

  if (!isOpen) return null; // No renderizar si el modal no está abierto

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-lg p-6 relative">
        <button onClick={onClose} className="absolute top-4 right-4 text-gray-500 hover:text-gray-700">
          &times;
        </button>
        <h2 className="text-2xl font-semibold mb-4">Crear Nueva Selección</h2>
        <form onSubmit={handleSubmit}>
          <div className="space-y-6 overflow-y-auto max-h-60">
            <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
              <div className="sm:col-span-4">
                <label htmlFor="deporte" className="block text-sm font-medium leading-6 text-gray-900">
                  Deporte
                </label>
                <div className="mt-2">
                  <input
                    type="text"
                    id="deporte"
                    value={deporte}
                    onChange={(e) => setDeporte(e.target.value)}
                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                    placeholder="Fútbol, Baloncesto, etc."
                  />
                </div>
              </div>
            </div>
          </div>
          <div className="mt-6 flex justify-end">
            {errorMessage && (
              <div className="text-red-500 text-sm mr-4">{errorMessage}</div>
            )}
            <button
              onClick={onClose}
              type="button"
              className="mr-4 text-sm font-semibold leading-6 text-gray-900"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500"
            >
              Guardar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
