import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AddPlantelModal from './AddPlantelModal';
import PlantelTable from './PlantelTable';

const SeleccionPage = () => {
  const { id, deporte } = useParams(); // Captura los parámetros de la URL
  const navigate = useNavigate();
  const [isModalOpen, setModalOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false); // Estado para forzar la recarga de PlantelTable

  const handlePlantelUpdate = () => {
    setReloadFlag((prev) => !prev); // Cambiar el estado para forzar la recarga
  };

  return (
    <div className="min-h-full">
      {/* Navbar */}
      <nav className="bg-gray-800">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center">
              <div className="flex-shrink-0">
                <button onClick={() => navigate('/dashboard')} className="text-white text-lg font-bold">
                  &larr; Volver
                </button>
              </div>
            </div>
          </div>
        </div>
      </nav>

      {/* Header */}
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8 flex justify-between items-center">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">{deporte || 'Nombre del Deporte'}</h1>
          <button
            onClick={() => setModalOpen(true)}
            className="rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Añadir plantel
          </button>
        </div>
      </header>

      {/* Main Content */}
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <PlantelTable seleccionId={id} reloadFlag={reloadFlag} />
        </div>
      </main>

      {/* Modal */}
      <AddPlantelModal
        isOpen={isModalOpen}
        onClose={() => setModalOpen(false)}
        seleccionId={id}
        onPlantelUpdate={handlePlantelUpdate} // Notificar al padre
      />
    </div>
  );
};

export default SeleccionPage;
