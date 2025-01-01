'use client';

import React, { useState } from 'react';
import Button from '../components/Button';

const HelpCenterPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = () => {
    alert(`Buscando: ${searchQuery}`);
    // Aquí puedes integrar lógica para buscar contenido en tus datos o API.
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    alert('Formulario enviado con éxito');
    // Puedes agregar lógica para manejar el envío, como un POST a tu backend.
  };


  return (
    <div className="bg-gray-50 text-gray-800 min-h-screen">
      {/* Encabezado */}
      <header className="text-blue py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl font-bold">Centro de Ayuda</h1>
          <p className="mt-2 text-lg text-gray2">
            Encuentra respuestas a las preguntas más frecuentes y accede a soporte personalizado.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-10">
        {/* Buscador */}
        <section className="mb-16">
          <div className="text-center mb-6">
            <h2 className="text-3xl font-semibold text-blue">¿En qué podemos ayudarte?</h2>
            <p className="text-lg text-gray2 mt-2">
              Escribe tu consulta en la barra de búsqueda para encontrar respuestas rápidamente.
            </p>
          </div>
          <div className="flex justify-center">
            <input
              type="text"
              placeholder="Buscar en el Centro de Ayuda..."
              className="w-full max-w-lg p-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
            <button
              className="ml-4 bg-blue text-white px-6 py-3 rounded-md hover:bg-blue-dark focus:ring-2 focus:ring-blue-dark"
              onClick={handleSearch}
            >
              Buscar
            </button>
          </div>
        </section>

        {/* Preguntas Frecuentes */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Preguntas Frecuentes</h2>
          <ul className="space-y-6">
            <li>
              <h3 className="text-xl font-bold">¿Cómo puedo crear una cuenta en Earthbnb?</h3>
              <p className="text-lg leading-relaxed">
                Crear una cuenta es muy sencillo. Solo haz clic en el botón "Registrarse" en la esquina superior derecha 
                de nuestra página de inicio, completa tus datos personales, y listo.
              </p>
            </li>
            <li>
              <h3 className="text-xl font-bold">¿Es seguro reservar a través de Earthbnb?</h3>
              <p className="text-lg leading-relaxed">
                Sí, trabajamos con protocolos de seguridad para proteger tus datos y pagos. Además, contamos con 
                reseñas verificadas de otros usuarios para que te sientas confiado al reservar.
              </p>
            </li>
          </ul>
        </section>

        {/* Formulario de Contacto */}
        <section className="mb-16">
          <h2 className="text-3xl font-semibold text-blue mb-4">Contáctanos</h2>
          <p className="text-lg leading-relaxed mb-6">
            Si no encuentras una solución, rellena el siguiente formulario y nuestro equipo de soporte se pondrá en 
            contacto contigo.
          </p>
          <form
            className="space-y-6 bg-white shadow p-6 rounded-lg max-w-lg mx-auto"
            onSubmit={handleFormSubmit}
          >
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                Nombre Completo
              </label>
              <input
                id="name"
                name="name"
                type="text"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                Correo Electrónico
              </label>
              <input
                id="email"
                name="email"
                type="email"
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>
            <div>
              <label htmlFor="message" className="block text-sm font-medium text-gray-700">
                Mensaje
              </label>
              <textarea
                id="message"
                name="message"
                rows={5}
                required
                className="mt-1 p-3 w-full border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue text-white py-3 rounded-md hover:bg-blue-dark focus:ring-2 focus:ring-blue-dark"
            >
              Enviar
            </button>
          </form>
        </section>

        
      </main>
    </div>
  );
};

export default HelpCenterPage;
