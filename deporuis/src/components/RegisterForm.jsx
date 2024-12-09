import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegisterForm = () => {
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
    password: '',
    validarPassword: '',
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showValidatePassword, setShowValidatePassword] = useState(false);
  const navigate = useNavigate();

  // Manejar cambios en los inputs
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'password' || name === 'validarPassword') {
      if (name === 'validarPassword' && formData.password === value) {
        setError('');
        setSuccess('Las contraseñas coinciden');
      } else if (name === 'password' && value === formData.validarPassword) {
        setError('');
        setSuccess('Las contraseñas coinciden');
      } else if (formData.validarPassword || formData.password) {
        setSuccess('');
        setError('Las contraseñas no coinciden');
      }
    }
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.validarPassword) {
      setError('Las contraseñas no coinciden');
      return;
    }

    try {
      const personaResponse = await fetch('http://localhost:3000/api/persona/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          nombre: formData.nombre,
          apellidos: formData.apellidos,
          correoInstitucional: formData.correoInstitucional,
          fechaDeNacimiento: formData.fechaDeNacimiento,
          peso: parseFloat(formData.peso),
          altura: parseFloat(formData.altura),
          posicion: formData.posicion,
          dorsal: parseInt(formData.dorsal),
          idRol: parseInt(formData.idRol),
        }),
      });

      if (!personaResponse.ok) throw new Error('Error al crear la persona');

      const persona = await personaResponse.json();
      const idPersona = persona.idPersona;

      await fetch('http://localhost:3000/api/login/crear', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          password: formData.password,
          idPersona,
        }),
      });

      alert('Cuenta creada con éxito. Será redirigido al login.');
      navigate('/');
    } catch (error) {
      console.error('Error al crear la cuenta:', error);
      setError('Hubo un error al crear la cuenta. Intenta de nuevo.');
    }
  };

  return (
    <div className="flex min-h-full flex-col justify-center py-12 sm:px-6 lg:px-8">
      {/* Flecha para volver */}
      <div className="absolute top-4 left-4">
        <button
          onClick={() => navigate('/')}
          className="text-indigo-600 hover:text-indigo-500 font-bold text-sm flex items-center"
        >
          <span className="mr-2">&larr;</span> Volver al login
        </button>
      </div>

      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-gray-900">
          Crear cuenta
        </h2>
      </div>
      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
        <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Campos de entrada */}
            {Object.keys(formData).map((key) =>
              key !== 'validarPassword' && key !== 'password' ? (
                <div key={key}>
                  <label
                    htmlFor={key}
                    className="block text-sm font-medium text-gray-700"
                  >
                    {key.charAt(0).toUpperCase() + key.slice(1)}
                  </label>
                  <input
                    id={key}
                    name={key}
                    type={key === 'fechaDeNacimiento' ? 'date' : 'text'}
                    value={formData[key]}
                    onChange={handleChange}
                    required
                    className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                  />
                </div>
              ) : null
            )}

            {/* Contraseña */}
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={formData.password}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer"
                >
                  {showPassword ? '🙈' : '👁️'}
                </span>
              </div>
            </div>

            {/* Validar contraseña */}
            <div>
              <label
                htmlFor="validarPassword"
                className="block text-sm font-medium text-gray-700"
              >
                Validar Contraseña
              </label>
              <div className="relative mt-1">
                <input
                  id="validarPassword"
                  name="validarPassword"
                  type={showValidatePassword ? 'text' : 'password'}
                  value={formData.validarPassword}
                  onChange={handleChange}
                  required
                  className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm py-2"
                />
                <span
                  onClick={() => setShowValidatePassword(!showValidatePassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-sm cursor-pointer"
                >
                  {showValidatePassword ? '🙈' : '👁️'}
                </span>
              </div>
              {/* Mensajes de validación */}
              {error && <p className="text-red-500 text-sm mt-2">{error}</p>}
              {success && <p className="text-green-500 text-sm mt-2">{success}</p>}
            </div>

            {/* Botón de envío */}
            <button
              type="submit"
              className="w-full flex justify-center rounded-md bg-indigo-600 py-2 px-4 text-sm font-medium text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
            >
              Crear cuenta
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
