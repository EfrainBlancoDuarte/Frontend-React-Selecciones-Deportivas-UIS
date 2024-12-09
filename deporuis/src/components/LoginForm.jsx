import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

const LoginForm = () => {
  const [idPersona, setIdPersona] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate(); // Hook para redirigir

  // Alternar visibilidad de la contraseña
  const handleTogglePassword = () => {
    setShowPassword(!showPassword);
  };

  // Manejar el envío del formulario
  const handleSubmit = (e) => {
    e.preventDefault();

    fetch('http://localhost:3000/api/login/validar', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ idPersona, password }),
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error('Usuario o contraseña incorrectos');
        }
        return response.json();
      })
      .then(() => {
        navigate('/dashboard'); // Redirige al Dashboard
      })
      .catch((error) => {
        setErrorMessage(error.message); // Mostrar mensaje de error
      });
  };

  return (
    <div className="flex min-h-full flex-col justify-center px-6 py-12 lg:px-8">
      {/* Header */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <img
          className="mx-auto h-40 w-auto"
          src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
          alt="Your Company"
        />
        <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
          Inicio de sesión DeporUIS
        </h2>
      </div>

      {/* Formulario */}
      <div className="sm:mx-auto sm:w-full sm:max-w-sm mt-8">
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              ID Persona
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="number"
                value={idPersona}
                onChange={(e) => setIdPersona(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
              Contraseña
            </label>
            <div className="mt-2 relative">
              <input
                id="password"
                name="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
              <span
                onClick={handleTogglePassword}
                className="absolute inset-y-0 right-0 pr-3 flex items-center cursor-pointer"
              >
                {showPassword ? '🙈' : '👁️'}
              </span>
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              Iniciar sesión
            </button>
          </div>
          {/* Vínculo para crear cuenta */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              ¿Aún no tienes una cuenta?{' '}
              <Link to="/registrar" className="font-medium text-indigo-600 hover:text-indigo-500">
                Crear cuenta
              </Link>
            </p>
          </div>
        </form>

        {/* Mensaje de error */}
        {errorMessage && <div className="text-red-600 text-sm mt-4">{errorMessage}</div>}
      </div>
    </div>
  );
};

export default LoginForm;
