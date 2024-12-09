import React, { useState, useEffect } from 'react';
import Navbar from './Navbar';
import SelectionGrid from './SelectionGrid';
import Modal from './Modal';

const Dashboard = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [reloadFlag, setReloadFlag] = useState(false);

  const reloadSelections = () => {
    setReloadFlag(!reloadFlag); // Cambia el flag para forzar la recarga de las selecciones
  };

  return (
    <div className="min-h-full">
      <Navbar />
      <header className="bg-white shadow">
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Selecciones</h1>
        </div>
      </header>
      <main>
        <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
          <p>
            Aquí se pueden crear selecciones y visualizar una lista de las selecciones deportivas de nuestra universidad.
          </p>
          <button
            onClick={() => setModalOpen(true)}
            className="mt-6 inline-block rounded-md bg-indigo-600 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-500"
          >
            Crear Selección
          </button>
          <SelectionGrid reloadFlag={reloadFlag} />
        </div>
      </main>
      <Modal isOpen={isModalOpen} onClose={() => setModalOpen(false)} reloadSelections={reloadSelections} />
    </div>
  );
};

export default Dashboard;
