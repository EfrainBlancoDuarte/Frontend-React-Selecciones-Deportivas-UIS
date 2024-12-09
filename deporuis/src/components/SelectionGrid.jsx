import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const SelectionGrid = ({ reloadFlag }) => {
  const [selections, setSelections] = useState([]);
  const navigate = useNavigate(); // Hook para redirigir a una nueva ruta

  useEffect(() => {
    fetch('http://localhost:3000/api/seleccion/listar')
      .then((response) => {
        if (!response.ok) {
          throw new Error('Error en la petición');
        }
        return response.json();
      })
      .then((data) => {
        setSelections(data);
      })
      .catch((error) => {
        console.error('Error al cargar las selecciones:', error);
      });
  }, [reloadFlag]); // Recarga cuando reloadFlag cambia

  return (
    <div className="mt-6 flex flex-wrap gap-6">
      {selections.map((seleccion) => (
        <div
          key={seleccion.id}
          className="bg-indigo-100 rounded-lg shadow-lg p-6 flex items-center justify-center cursor-pointer hover:bg-indigo-200 transition duration-200 flex-wrap"
          onClick={() => {
            const deporte = encodeURIComponent(seleccion.deporte);
            // Redirigir a la ruta correspondiente
            navigate(`/seleccion/${seleccion.id}/${deporte}`);
          }}
        >
          <p className="text-lg font-bold text-gray-900">{seleccion.deporte}</p>
        </div>
      ))}
    </div>
  );
};

export default SelectionGrid;
